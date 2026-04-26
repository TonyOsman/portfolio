/* global React */
const { useState, useEffect, useRef } = React;

// ============================================================
// REVEAL HOOK — fade + translate on enter viewport
// ============================================================
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true);
        });
      },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ============================================================
// HERO IMAGE SOURCES — Unsplash, by mood
// Selected for SpaceX-like cinematic, abstract tech / architecture
// feel. Each is a real photograph, not an SVG.
// ============================================================
const HERO_IMAGES = {
  cosmic: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2400&q=80",
  // Aurora / abstract atmosphere
  aurora: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=2400&q=80",
  // Server / infrastructure architecture
  infrastructure: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=80",
  // City / sao paulo brasil — long exposure cityscape
  city: "https://images.unsplash.com/photo-1543059080-f9b1272213d5?auto=format&fit=crop&w=2400&q=80"
};

// ============================================================
// NAV
// ============================================================
function Nav({ name }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);
  return (
    <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#top" className="nav-mark">{name.split(' ').map((w) => w[0]).join('')}</a>
        <div className="nav-links">
          <a href="#experience">Experience</a>
          <a href="#tech">Stack</a>
          <a href="#projects">Projects</a>
          <a href="#updates">Updates</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>);

}

// ============================================================
// HERO — SpaceX-style: full-bleed photo, sparse type, bottom-anchored
// ============================================================
function Hero({ data, heroMood }) {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handle, { passive: true });
    const t = setTimeout(() => setMounted(true), 80);
    return () => {window.removeEventListener('scroll', handle);clearTimeout(t);};
  }, []);

  const imgSrc = HERO_IMAGES[heroMood] || HERO_IMAGES.cosmic;
  const bgTransform = `translate3d(0, ${scrollY * 0.4}px, 0) scale(${1.1 + scrollY * 0.0002})`;
  const opacity = Math.max(0, 1 - scrollY / 800);

  // Mission codename — SpaceX uses internal codenames as eyebrow text
  const missionCodename = data.headline.split('|')[0].trim().toUpperCase();

  return (
    <section className="hero" id="top">
      <div className="hero-bg" style={{ transform: bgTransform }}>
        <img src={imgSrc} alt="" className="hero-photo" />
        <div className="hero-gradient" />
      </div>

      {/* Top-left mission tag — SpaceX style */}
      <div className={`hero-mission ${mounted ? 'in' : ''}`} style={{ opacity }}>
        <span className="mission-dot"></span>
        <span>{missionCodename}</span>
      </div>

      {/* Bottom-anchored content block */}
      <div className="hero-content" style={{ opacity }}>
        <h1 className={`hero-title ${mounted ? 'in' : ''}`}>{data.tagline}</h1>
        <div className={`hero-meta ${mounted ? 'in' : ''}`}>
          <a href="#projects" className="hero-link">
            <span className="hero-link-arrow">→</span>
            <span>EXPLORE WORK</span>
          </a>
          <a href={data.linkedinUrl} target="_blank" rel="noopener" className="hero-link">
            <span className="hero-link-arrow">→</span>
            <span>VIEW ON LINKEDIN</span>
          </a>
        </div>
      </div>

      {/* Side label — name vertical */}
      <div className={`hero-side-label ${mounted ? 'in' : ''}`}>
        <span>{data.name}</span>
        <span className="side-divider"></span>
        <span>PORTFOLIO 2026</span>
      </div>
    </section>);

}

// ============================================================
// SECTION HEADER — with word-by-word title reveal
// ============================================================
function SectionHeader({ eyebrow, title, kicker }) {
  const [ref, visible] = useReveal(0.2);
  const words = title.split(' ');
  return (
    <header ref={ref} className={`section-header ${visible ? 'in' : ''}`}>
      <div className="section-eyebrow">{eyebrow}</div>
      <h2 className="section-title">
        {words.map((w, i) =>
        <span key={i} className="word-reveal" style={{ transitionDelay: `${0.15 + i * 0.08}s` }}>
            <span className="word-inner">{w}</span>
          </span>
        )}
      </h2>
      {kicker && <p className="section-kicker">{kicker}</p>}
    </header>);

}

// ============================================================
// COUNTER — animated number that counts up on reveal
// ============================================================
function Counter({ to, duration = 1400 }) {
  const [ref, visible] = useReveal(0.3);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, to, duration]);
  return <span ref={ref}>{val}</span>;
}

// ============================================================
// STATS STRIP — between hero and experience
// ============================================================
function StatsStrip({ stats }) {
  const [ref, visible] = useReveal(0.2);
  return (
    <section ref={ref} className={`stats-strip dark-section ${visible ? 'in' : ''}`}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) =>
          <div key={i} className="stat-item" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="stat-value">
                <Counter to={s.value} />+
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ============================================================
// TECH STACK — Apple-style pinned horizontal scroll
// As you scroll vertically, the section pins and the cards
// translate horizontally.
// ============================================================
function TechStack({ stack }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const allItems = stack.flatMap((cat) => cat.items.map((it) => ({ ...it, category: cat.category })));

  useEffect(() => {
    const handle = () => {
      if (!sectionRef.current || !trackRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const total = sectionRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);
    return () => {
      window.removeEventListener('scroll', handle);
      window.removeEventListener('resize', handle);
    };
  }, []);

  // Total horizontal travel — scale by item count
  const trackTravel = `calc(${100 - 100 / Math.max(allItems.length, 1) * 1.5}vw)`;

  return (
    <section ref={sectionRef} className="tech-section" id="tech">
      <div className="tech-pin">
        <div className="container">
          <div className="tech-header">
            <div className="section-eyebrow">02 / TECH STACK</div>
            <h2 className="tech-title">Tools of the trade.</h2>
            <p className="tech-kicker">A working set — what I reach for in client engagements and side projects.</p>
            <div className="tech-progress">
              <div className="tech-progress-fill" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        </div>
        <div className="tech-track-wrap">
          <div
            ref={trackRef}
            className="tech-track"
            style={{ transform: `translate3d(calc(-${progress} * ${trackTravel}), 0, 0)` }}>
            
            {allItems.map((item, i) =>
            <TechCard key={i} item={item} index={i} />
            )}
          </div>
        </div>
      </div>
    </section>);

}

function TechCard({ item, index }) {
  const levelClass = {
    'Expert': 'lvl-expert',
    'Advanced': 'lvl-advanced',
    'Intermediate': 'lvl-intermediate'
  }[item.level] || '';
  return (
    <div className="tech-card">
      <div className="tech-card-num">{String(index + 1).padStart(2, '0')}</div>
      <div className="tech-card-cat">{item.category}</div>
      <div className="tech-card-name">{item.name}</div>
      <div className="tech-card-meta">
        <span className={`tech-level ${levelClass}`}>{item.level}</span>
        <span className="tech-years">{item.years}y</span>
      </div>
      <div className="tech-bar">
        <div
          className={`tech-bar-fill ${levelClass}`}
          style={{
            width: item.level === 'Expert' ? '100%' : item.level === 'Advanced' ? '75%' : '50%'
          }} />
        
      </div>
    </div>);

}

// ============================================================
// EXPERIENCE
// ============================================================
function Experience({ items }) {
  return (
    <section className="experience-section dark-section" id="experience">
      <div className="container">
        <SectionHeader eyebrow="01 / EXPERIENCE" title="Where I've built." />
        <div className="exp-list">
          {items.map((item, i) => <ExpItem key={i} item={item} index={i} />)}
        </div>
      </div>
    </section>);

}

function ExpItem({ item, index }) {
  const [ref, visible] = useReveal(0.2);
  const [logoFailed, setLogoFailed] = useState(false);
  return (
    <article ref={ref} className={`exp-item ${visible ? 'in' : ''}`} style={{ transitionDelay: `${index * 80}ms` }}>
      <div className="exp-meta">
        <div className="exp-logo">
          {item.logoUrl && !logoFailed ?
          <img
            src={item.logoUrl}
            alt={`${item.company} logo`}
            onError={() => setLogoFailed(true)} /> :


          <span>{item.logoFallback}</span>
          }
        </div>
        <div className="exp-period">{item.period}</div>
      </div>
      <div className="exp-body">
        <div className="exp-company">{item.company}</div>
        <h3 className="exp-role">{item.role}</h3>
        <div className="exp-location">{item.location}</div>
        <ul className="exp-bullets">
          {item.bullets.map((b, j) => <li key={j}>{b}</li>)}
        </ul>
      </div>
    </article>);

}

// ============================================================
// PROJECTS — clickable tiles linking to GitHub
// ============================================================
function Projects({ items }) {
  return (
    <section className="projects-section light-section" id="projects">
      <div className="container">
        <SectionHeader eyebrow="03 / SELECTED WORK" title="Projects." kicker="Open repositories — click any project to view the code on GitHub." />
        <div className="projects-grid">
          {items.map((p, i) => <ProjectTile key={i} project={p} index={i} />)}
        </div>
      </div>
    </section>);

}

function ProjectTile({ project, index }) {
  const [ref, visible] = useReveal(0.15);
  const variants = ['a', 'b', 'c'];
  const variant = variants[index % 3];
  const colors = {
    a: { bg: '#0d1228', stripe: '#1a2348' },
    b: { bg: '#1a1a1a', stripe: '#2a2a2a' },
    c: { bg: '#0a1a1a', stripe: '#1a2a2a' }
  }[variant];
  return (
    <a
      ref={ref}
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`project-tile ${visible ? 'in' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}>
      
      <div className="tile-imagery" style={{ background: colors.bg }}>
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
          <defs>
            <pattern id={`stripe-${variant}-${index}`} width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="20" stroke={colors.stripe} strokeWidth="8" />
            </pattern>
          </defs>
          <rect width="800" height="500" fill={`url(#stripe-${variant}-${index})`} />
          <rect width="800" height="500" fill={colors.bg} opacity="0.7" />
        </svg>
        <span className="tile-imagery-label">{project.title.toUpperCase()}</span>
        <div className="tile-github-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
          </svg>
          <span>View on GitHub</span>
        </div>
      </div>
      <div className="project-info">
        <div className="project-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="project-title">
          {project.title}
          <span className="project-arrow">↗</span>
        </h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}
        </div>
      </div>
    </a>);

}

// ============================================================
// UPDATES — horizontal scrollable LinkedIn feed
// ============================================================
function Updates({ items, name, headline }) {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector('.update-card');
    const cardWidth = card ? card.offsetWidth + 18 : 500;
    trackRef.current.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
  };

  return (
    <section className="updates-section dark-section" id="updates">
      <div className="container">
        <div className="updates-header-row">
          <SectionHeader
            eyebrow="04 / FEED"
            title="Updates."
            kicker="Synced from LinkedIn — scroll horizontally to browse recent posts." />
          
          <div className="updates-controls">
            <button className="up-arrow" onClick={() => scroll(-1)} aria-label="Previous">←</button>
            <button className="up-arrow" onClick={() => scroll(1)} aria-label="Next">→</button>
          </div>
        </div>
      </div>
      <div className="updates-track-wrap">
        <div className="updates-track" ref={trackRef}>
          <div className="updates-track-spacer-left" />
          {items.map((post, i) =>
          <UpdateCard key={i} post={post} name={name} headline={headline} index={i} />
          )}
          <a href="https://www.linkedin.com/in/tony-osman" target="_blank" rel="noopener" className="update-card update-card-cta">
            <div className="up-cta-arrow">→</div>
            <div className="up-cta-label">View all<br />on LinkedIn</div>
          </a>
          <div className="updates-track-spacer-right" />
        </div>
      </div>
    </section>);

}

function UpdateCard({ post, name, headline, index }) {
  const [ref, visible] = useReveal(0.05);
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2);
  const isLong = post.content.length > 280;

  return (
    <article ref={ref} className={`update-card ${visible ? 'in' : ''}`} style={{ transitionDelay: `${index * 60}ms` }}>
      {/* Header */}
      <header className="uc-header">
        <div className="uc-avatar">{initials}</div>
        <div className="uc-author">
          <div className="uc-name">{name} <span className="uc-pill">• 1st</span></div>
          <div className="uc-headline">{headline}</div>
          <div className="uc-time">{post.timeAgo} • <span className="uc-globe">🌐</span> {post.visibility}</div>
        </div>
        <button className="uc-more" aria-label="More">···</button>
      </header>

      {/* Body */}
      <div className="uc-body">
        {(isLong && !expanded ? post.content.slice(0, 240) + '... ' : post.content).split('\n').map((line, i) =>
        <p key={i}>{line}</p>
        )}
        {isLong && !expanded &&
        <button className="uc-seemore" onClick={() => setExpanded(true)}>see more</button>
        }
      </div>

      {/* Image placeholder */}
      {post.hasImage &&
      <div className="uc-image">
          <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
            <defs>
              <pattern id={`uc-stripe-${index}`} width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="16" stroke="#2a2a2a" strokeWidth="6" />
              </pattern>
            </defs>
            <rect width="800" height="450" fill="#1a1a1a" />
            <rect width="800" height="450" fill={`url(#uc-stripe-${index})`} opacity="0.5" />
          </svg>
          <span className="uc-image-label">{post.imageLabel}</span>
        </div>
      }

      {/* Stats */}
      <div className="uc-stats">
        <div className="uc-reactions-icons">
          <span className="rxn rxn-like">👍</span>
          <span className="rxn rxn-celebrate">🎉</span>
          <span className="rxn rxn-insight">💡</span>
        </div>
        <span className="uc-count">{post.reactions.toLocaleString()}</span>
        <span className="uc-sep">•</span>
        <span className="uc-meta">{post.comments} comments</span>
        <span className="uc-sep">•</span>
        <span className="uc-meta">{post.reposts} reposts</span>
      </div>

      {/* Actions */}
      <div className="uc-actions">
        <button className={`uc-action ${liked ? 'liked' : ''}`} onClick={() => setLiked(!liked)}>
          <span className="uc-icon">👍</span> Like
        </button>
        <button className="uc-action"><span className="uc-icon">💬</span> Comment</button>
        <button className="uc-action"><span className="uc-icon">↻</span> Repost</button>
        <button className="uc-action"><span className="uc-icon">➤</span> Send</button>
      </div>
    </article>);

}

// ============================================================
// EDUCATION
// ============================================================
function Education({ items }) {
  return (
    <section className="education-section light-section" id="education">
      <div className="container">
        <SectionHeader eyebrow="05 / EDUCATION" title="Foundation." />
        <div className="edu-list">
          {items.map((e, i) => <EduItem key={i} edu={e} index={i} />)}
        </div>
      </div>
    </section>);

}

function EduItem({ edu, index }) {
  const [ref, visible] = useReveal(0.2);
  return (
    <article ref={ref} className={`edu-item ${visible ? 'in' : ''}`} style={{ transitionDelay: `${index * 80}ms` }}>
      <div className="edu-logo">{edu.logo}</div>
      <div className="edu-body">
        <h3 className="edu-school">{edu.school}</h3>
        <div className="edu-degree">{edu.degree}</div>
        <div className="edu-focus">{edu.focus}</div>
        <div className="edu-period">{edu.period}</div>
      </div>
    </article>);

}

// ============================================================
// CONTACT
// ============================================================
function Contact({ data }) {
  const [ref, visible] = useReveal(0.2);
  return (
    <section ref={ref} className={`contact-section dark-section ${visible ? 'in' : ''}`} id="contact">
      <div className="container narrow center">
        <div className="contact-eyebrow">06 / CONTACT</div>
        <h2 className="contact-headline">Let's build<br />something useful.</h2>
        <p className="contact-sub">Open to engineering roles, collaborations, and conversations about distributed systems, cloud platforms, or anything backend.</p>
        <div className="contact-links">
          <a href={`mailto:${data.email}`} className="contact-link">
            <span className="cl-label">Email</span>
            <span className="cl-value">{data.email} →</span>
          </a>
          <a href={data.linkedinUrl} target="_blank" rel="noopener" className="contact-link">
            <span className="cl-label">LinkedIn</span>
            <span className="cl-value">{data.linkedinUrl.replace(/^https?:\/\//, '')} →</span>
          </a>
          {data.githubUrl &&
          <a href={data.githubUrl} target="_blank" rel="noopener" className="contact-link">
            <span className="cl-label">GitHub</span>
            <span className="cl-value">{data.githubUrl.replace(/^https?:\/\//, '')} →</span>
          </a>
          }
          <div className="contact-link">
            <span className="cl-label">Location</span>
            <span className="cl-value">{data.location}</span>
          </div>
        </div>
        <footer className="site-footer">
          <span>© 2026 {data.name}</span>
          <span>Updated automatically from LinkedIn</span>
        </footer>
      </div>
    </section>);

}

// ============================================================
// EXPORT
// ============================================================
Object.assign(window, {
  Nav, Hero, StatsStrip, TechStack, Experience, Projects, Updates, Education, Contact, useReveal
});