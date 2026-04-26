# Tony K. Osman — Portfolio

SpaceX-inspired hero, Apple-style transitions, LinkedIn-faithful update feed. **100% free to operate** — static frontend, no servers to pay for, auto-syncs from LinkedIn via a daily GitHub Action.

## Architecture

```
public/                    Static site — pushed to Vercel
  index.html               React via CDN, mounts components.jsx
  styles.css               All styling
  components.jsx           All sections
  app.jsx                  Root component
  tweaks-panel.jsx         Dev-only theme/mood toggles (Shift+T to open)
  data.js                  Profile data — auto-rewritten by the sync workflow

scripts/sync_linkedin.py   Logs into LinkedIn, rewrites public/data.js
.github/workflows/         GitHub Action that runs the sync daily
  sync-linkedin.yml

vercel.json                Security headers
```

**No serverless functions, no databases, no third-party paid APIs.** The entire backend is one GitHub Action that runs once a day, regenerates `data.js`, and pushes the change. Vercel sees the push and redeploys.

## Cost breakdown

| Item | Cost |
|---|---|
| Vercel Hobby (hosting + SSL + auto-deploys) | $0 |
| GitHub Actions (sync uses ~1 min/day, 30 min/month) | $0 (well under the 2,000 min/month free limit) |
| Vercel Web Analytics (Hobby tier) | $0 (2.5K events/mo) |
| LinkedIn data | $0 (uses the open-source `linkedin-api` Python lib) |
| Custom domain (optional) | ~$10/yr from Cloudflare or Porkbun |

## Local preview

```bash
npm run preview     # serves public/ at http://localhost:3000
```

No build step — everything is static. Edits to `public/*` show up on refresh.

## Deploying to Vercel

1. Push this repo to GitHub.
2. [vercel.com](https://vercel.com) → **New Project** → import the repo.
   - Framework preset: **Other**
   - Build command: *(leave empty)*
   - Output directory: `public`
3. Click **Deploy**. Site is live at `https://<repo>.vercel.app`.
4. **Settings → Analytics → enable Web Analytics**. Done — no code change needed (the script tag is already in `index.html`).

## Setting up the daily LinkedIn sync

In your GitHub repo:

**Settings → Secrets and variables → Actions → New repository secret** — add three secrets:

| Name | Value |
|---|---|
| `LINKEDIN_EMAIL` | the email you log into LinkedIn with |
| `LINKEDIN_PASSWORD` | your LinkedIn password |
| `LINKEDIN_PROFILE_PUBLIC_ID` | the slug from your profile URL — e.g. `tony-osman` for `linkedin.com/in/tony-osman` |

That's it. The workflow runs nightly at 06:00 UTC. To trigger it manually: **Actions tab → Sync LinkedIn → Run workflow**.

**About credentials safety:** the `linkedin-api` library has no choice but to log in with your real password (LinkedIn doesn't expose a public API for personal profiles). The recommended pattern is to create a *separate* low-info LinkedIn account dedicated to this sync — it follows your real account, and if LinkedIn ever flags it for automation, your real account is fine. Same setup, different credentials.

If you keep using your main account, you'll need 2FA off (LinkedIn refuses headless logins with 2FA on).

## What gets auto-updated vs. preserved

The sync script splits `data.js` into two zones:

**Auto-updated from LinkedIn** (overwritten on every sync):
- `name`, `headline`, `location`
- `experience` (roles, companies, periods, bullets, logo URLs)
- `education`
- `updates` (last 8 LinkedIn posts)

**Preserved between syncs** (edit by hand, your changes stick):
- `tagline`, `email`
- `about`
- `projects` (LinkedIn doesn't surface these reliably — easier to manage by hand)
- `techStack`
- `stats`

To edit the preserved fields: open [public/data.js](public/data.js), edit the JSON, push. Vercel redeploys.

## Custom domain (optional)

1. Buy a domain from Cloudflare Registrar (~$10/yr, no markup) or Porkbun.
2. In Vercel: **Settings → Domains → Add** → enter the domain.
3. Vercel shows you 1-2 DNS records to add. Add them in your registrar. Wait ~5 minutes.
4. SSL is automatic.

## Privacy

- No cookies set anywhere on the site.
- No third-party scripts beyond React (unpkg), Google Fonts, and Unsplash photographs.
- Vercel Web Analytics uses no cookies and stores no IPs — see [vercel.com/docs/analytics](https://vercel.com/docs/analytics/privacy-policy).

## Development tips

- Toggle the dev panel with **Shift+T** or `?dev=1` — change hero mood, light/dark theme, motion on/off.
- Editing copy: just change `data.js` and push.
- Editing layout: components are in `components.jsx`, styles in `styles.css`. No build step, just refresh.
