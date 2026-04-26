#!/usr/bin/env python3
"""
Sync the public LinkedIn profile + recent posts into public/data.js.

Reads credentials from env (set by the GitHub Action from Secrets):
    LINKEDIN_EMAIL, LINKEDIN_PASSWORD, LINKEDIN_PROFILE_PUBLIC_ID

Updates the LinkedIn-sourced fields (name, headline, location, experience,
education, updates) and preserves the manually-edited fields (tagline,
email, about, projects, techStack, stats).

Writes only if there's a real diff, so the workflow doesn't spam commits.
"""

from __future__ import annotations
import json
import os
import re
import sys
from datetime import datetime
from pathlib import Path

DATA_JS = Path(__file__).resolve().parent.parent / "public" / "data.js"

LINKEDIN_FIELDS = ("name", "headline", "location", "experience", "education", "updates")


def load_existing() -> dict:
    raw = DATA_JS.read_text(encoding="utf-8")
    m = re.search(r"window\.PROFILE_DATA\s*=\s*(\{.*\})\s*;", raw, re.DOTALL)
    if not m:
        sys.exit("Could not parse window.PROFILE_DATA from data.js")
    return json.loads(m.group(1))


def write_data_js(profile: dict) -> None:
    body = json.dumps(profile, indent=2, ensure_ascii=False)
    header = (
        "// AUTO-MAINTAINED by scripts/sync_linkedin.py.\n"
        "// LinkedIn-sourced fields (name, headline, location, experience,\n"
        "// education, updates) are overwritten on every sync.\n"
        "// Manually-edited fields (tagline, email, about, projects,\n"
        "// techStack, stats) are preserved between syncs — edit them here\n"
        "// directly and your changes will survive.\n"
        f"// Last sync: {datetime.utcnow().isoformat(timespec='seconds')}Z\n\n"
    )
    DATA_JS.write_text(header + "window.PROFILE_DATA = " + body + ";\n", encoding="utf-8")


def fmt_period(tp: dict | None) -> str:
    if not tp:
        return ""
    start = tp.get("startDate") or {}
    end = tp.get("endDate")
    s = str(start.get("year", "")) if start.get("year") else ""
    e = str(end.get("year", "")) if end and end.get("year") else "Present"
    return f"{s} — {e}" if s else e


def split_bullets(desc: str | None, limit: int = 4) -> list[str]:
    if not desc:
        return []
    lines = [ln.strip().lstrip("•·-* ").strip() for ln in desc.splitlines()]
    return [ln for ln in lines if ln][:limit]


def domain_guess(company: str) -> str:
    slug = re.sub(r"[^a-z0-9]", "", (company or "").lower())
    return f"{slug}.com" if slug else ""


def initials(s: str, n: int = 3) -> str:
    return (s or "?")[:n].upper()


def time_ago_iso(ts_ms: int | None) -> str:
    if not ts_ms:
        return ""
    seconds = max(1, int((datetime.utcnow().timestamp() * 1000 - ts_ms) / 1000))
    days = seconds // 86400
    if days < 1:
        hours = max(1, seconds // 3600)
        return f"{hours}h"
    if days < 7:
        return f"{days}d"
    if days < 30:
        return f"{days // 7}w"
    if days < 365:
        return f"{days // 30}mo"
    return f"{days // 365}y"


def map_experience(raw: list[dict]) -> list[dict]:
    out = []
    for e in raw or []:
        company = e.get("companyName") or ""
        out.append({
            "role": e.get("title") or "",
            "company": company,
            "period": fmt_period(e.get("timePeriod")),
            "location": e.get("locationName") or "",
            "bullets": split_bullets(e.get("description")),
            "logoUrl": (
                f"https://www.google.com/s2/favicons?domain={domain_guess(company)}&sz=128"
                if company else None
            ),
            "logoFallback": initials(company),
        })
    return out


def map_education(raw: list[dict]) -> list[dict]:
    out = []
    for ed in raw or []:
        school = ed.get("schoolName") or ""
        out.append({
            "school": school,
            "degree": ed.get("degreeName") or "",
            "focus": ed.get("fieldOfStudy") or "",
            "period": fmt_period(ed.get("timePeriod")),
            "logo": (school[:1] or "?").upper(),
        })
    return out


def map_posts(raw: list[dict]) -> list[dict]:
    out = []
    for p in raw or []:
        # The schema returned by linkedin-api varies a bit between endpoints;
        # try a few well-known shapes.
        text = (
            (p.get("commentary") or {}).get("text")
            or p.get("text")
            or p.get("commentaryText")
            or ""
        )
        text = (text or "").strip()
        if not text:
            continue
        social = (p.get("socialDetail") or {}).get("totalSocialActivityCounts") or {}
        out.append({
            "timeAgo": time_ago_iso(p.get("publishedAt") or p.get("createdAt")),
            "visibility": "Public",
            "content": text,
            "reactions": social.get("numLikes") or p.get("numLikes") or 0,
            "comments": social.get("numComments") or p.get("numComments") or 0,
            "reposts": social.get("numShares") or p.get("numShares") or 0,
            "hasImage": bool((p.get("content") or {}).get("image")),
            "imageLabel": "LinkedIn post" if (p.get("content") or {}).get("image") else "",
        })
    return out[:8]


def fetch_from_linkedin() -> dict:
    """Returns a dict containing only the LinkedIn-sourced fields."""
    try:
        from linkedin_api import Linkedin
    except ImportError:
        sys.exit("linkedin-api not installed — run: pip install linkedin-api")

    email = os.environ.get("LINKEDIN_EMAIL")
    password = os.environ.get("LINKEDIN_PASSWORD")
    public_id = os.environ.get("LINKEDIN_PROFILE_PUBLIC_ID")
    if not (email and password and public_id):
        sys.exit("Missing LINKEDIN_EMAIL / LINKEDIN_PASSWORD / LINKEDIN_PROFILE_PUBLIC_ID env vars")

    api = Linkedin(email, password)
    p = api.get_profile(public_id) or {}

    try:
        raw_posts = api.get_profile_posts(public_id, post_count=8) or []
    except Exception as exc:
        print(f"WARN: posts fetch failed: {exc}", file=sys.stderr)
        raw_posts = []

    name = " ".join(filter(None, [p.get("firstName"), p.get("lastName")])).strip() or p.get("fullName") or ""
    location = p.get("locationName") or p.get("geoLocationName") or ""

    return {
        "name": name,
        "headline": p.get("headline") or "",
        "location": location,
        "experience": map_experience(p.get("experience") or []),
        "education": map_education(p.get("education") or []),
        "updates": map_posts(raw_posts),
    }


def main() -> int:
    existing = load_existing()
    fresh = fetch_from_linkedin()

    # Only overwrite LinkedIn-sourced fields, and only if non-empty.
    next_profile = dict(existing)
    for k in LINKEDIN_FIELDS:
        v = fresh.get(k)
        if v in (None, "", []):
            continue
        next_profile[k] = v

    if next_profile == existing:
        print("No changes — skipping write.")
        return 0

    write_data_js(next_profile)
    print("Updated public/data.js")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
