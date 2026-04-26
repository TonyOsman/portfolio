// AUTO-MAINTAINED by scripts/sync_linkedin.py (after first sync).
// LinkedIn-sourced fields are: name, headline, location, experience, education, updates.
// Manually-edited fields (preserved across syncs): tagline, email, linkedinUrl, githubUrl,
// about, projects, techStack, stats. Edit those here directly.

window.PROFILE_DATA = {
  "name": "Tony K. Osman",
  "headline": "Backend Engineer | Distributed Systems | Cloud & Data Platforms",
  "tagline": "Backend systems. Built for scale.",
  "location": "São Paulo, Brasil",
  "linkedinUrl": "https://www.linkedin.com/in/tony-osman",
  "githubUrl": "https://github.com/TonyOsman",
  "email": "osmanetoni@gmail.com",
  "about": "Backend-focused software engineer working with large-scale enterprise platforms at Oracle. I build backend integrations, data workflows, and cloud-native services — from SQL pipelines and REST APIs to containerized infrastructure. Strong exposure to distributed logistics systems, large operational datasets, and high-reliability enterprise environments. Currently pursuing a B.Sc. in Computer Information Systems with focus on software engineering and DevOps.",
  "experience": [
    {
      "role": "GenO FY26 — ERP Consultant",
      "company": "Oracle",
      "period": "Jul 2025 — Present",
      "location": "São Paulo, Brasil",
      "bullets": [
        "Developed SQL-driven data pipelines and service integrations within Oracle Fusion Cloud environments",
        "Built automation workflows and AI-agent tooling interacting with enterprise ERP systems",
        "Designed backend integrations between logistics platforms and cloud infrastructure on OCI",
        "Supported enterprise-scale supply chain platforms handling high-volume operational data"
      ],
      "logoUrl": "https://www.google.com/s2/favicons?domain=oracle.com&sz=128",
      "logoFallback": "ORC"
    },
    {
      "role": "SAP TM Consultant — Supply Chain",
      "company": "Exed Consulting",
      "period": "Mar — Jul 2025",
      "location": "São Paulo, Brasil",
      "bullets": [
        "Implemented backend integrations and data flows within SAP Transportation Management environments",
        "Modeled logistics and routing workflows for enterprise transportation systems",
        "Collaborated with engineering and infrastructure teams to deploy and configure supply chain platforms"
      ],
      "logoUrl": "https://www.google.com/s2/favicons?domain=exedconsulting.com&sz=128",
      "logoFallback": "EXD"
    },
    {
      "role": "Ecommerce Manager",
      "company": "MasterMix Distribuidora",
      "period": "Oct 2023 — Jan 2025",
      "location": "São Paulo, Brasil",
      "bullets": [
        "Built the company's first B2C digital commerce channel integrating marketplaces and backend systems",
        "Designed pricing automation and inventory synchronization workflows",
        "Implemented API integrations between e-commerce platforms and internal ERP systems"
      ],
      "logoUrl": "https://www.google.com/s2/favicons?domain=mastermix.com.br&sz=128",
      "logoFallback": "MMX"
    }
  ],
  "projects": [
    {
      "title": "Spotify Analytics Platform",
      "category": "Distributed Systems",
      "year": "2026",
      "description": "Enterprise-style full-stack analytics platform: Java 21 / Spring Boot 3 core API, Fastify/TypeScript BFF edge layer, Next.js frontend, fully containerized via Docker Compose. OIDC + Spotify OAuth, background sync jobs with real-time status, PostgreSQL (Flyway) + Redis, OpenTelemetry instrumentation across the stack.",
      "tags": ["Java", "Spring Boot", "TypeScript", "PostgreSQL", "Docker"],
      "githubUrl": "https://github.com/TonyOsman/Spotify-Analytics-Platform"
    },
    {
      "title": "Goal Tracker",
      "category": "Productivity Tooling",
      "year": "2026",
      "description": "Personal goal tracker with a Year → Quarter → Month → Week → Day hierarchy. Three goal types (outcome, metric, habit), AI-powered weekly reviews and daily nudges via Groq, Telegram bot for quick check-ins, Vercel-cron scheduling. Next.js 16 + Prisma 7 + Supabase + NextAuth v5.",
      "tags": ["Next.js", "TypeScript", "Prisma", "Supabase", "AI"],
      "githubUrl": "https://github.com/TonyOsman/Goal-Tracker-app"
    },
    {
      "title": "genOsis — Oracle GenO Hackathon",
      "category": "Hackathon",
      "year": "2026",
      "description": "Web prototype built during an Oracle GenO hackathon — exploring tooling at the intersection of AI agents and ERP workflows.",
      "tags": ["Hackathon", "Oracle", "AI Agents"],
      "githubUrl": "https://github.com/TonyOsman/genOsis-hackathon"
    }
  ],
  "education": [
    {
      "school": "FIAP",
      "degree": "B.Sc. Computer Information Systems",
      "focus": "Software Engineering & DevOps",
      "period": "Aug 2023 — Aug 2027 (Expected)",
      "logo": "F"
    },
    {
      "school": "Coimbra Business School — ISCAC",
      "degree": "Executive MBA — Neoliderança e Disrupção Organizacional",
      "focus": "",
      "period": "Jun 2024",
      "logo": "C"
    },
    {
      "school": "Oracle University",
      "degree": "Oracle Fusion TM & GTM Cloud — 2025 Certified Implementation Professional",
      "focus": "Also: Oracle ERP Process Essentials Certified (Rel 1)",
      "period": "2025",
      "logo": "O"
    }
  ],
  "techStack": [
    {
      "category": "Backend & Systems",
      "items": [
        { "name": "Java", "level": "Advanced", "years": 3 },
        { "name": "Spring Boot", "level": "Advanced", "years": 2 },
        { "name": "Node.js", "level": "Advanced", "years": 2 },
        { "name": "Python", "level": "Intermediate", "years": 2 },
        { "name": "REST APIs", "level": "Advanced", "years": 3 }
      ]
    },
    {
      "category": "Data & Databases",
      "items": [
        { "name": "SQL", "level": "Expert", "years": 3 },
        { "name": "PostgreSQL", "level": "Advanced", "years": 2 },
        { "name": "Redis", "level": "Intermediate", "years": 1 },
        { "name": "Data Modeling", "level": "Advanced", "years": 2 }
      ]
    },
    {
      "category": "Cloud & Infrastructure",
      "items": [
        { "name": "OCI", "level": "Advanced", "years": 1 },
        { "name": "Docker", "level": "Advanced", "years": 2 },
        { "name": "Kubernetes", "level": "Intermediate", "years": 1 },
        { "name": "CI/CD", "level": "Advanced", "years": 2 },
        { "name": "Git", "level": "Expert", "years": 4 }
      ]
    },
    {
      "category": "Enterprise Systems",
      "items": [
        { "name": "Oracle Fusion Cloud", "level": "Advanced", "years": 1 },
        { "name": "SAP TM", "level": "Intermediate", "years": 1 },
        { "name": "Supply Chain Platforms", "level": "Advanced", "years": 2 }
      ]
    }
  ],
  "stats": [
    { "label": "Languages spoken", "value": 5 },
    { "label": "Industry certifications", "value": 3 },
    { "label": "Companies worked with", "value": 3 }
  ],
  "updates": [
    {
      "timeAgo": "2w",
      "visibility": "Public",
      "content": "Six months into Oracle's GenO FY26 program. The depth of Oracle Fusion Cloud surprises me weekly — every module is a system within a system, and the real engineering happens at the seams between them.\n\nThe most underrated skill in ERP isn't knowing the modules — it's seeing how a change in procurement ripples into financials, into reporting, into the way leadership makes decisions on Monday morning.",
      "reactions": 87,
      "comments": 12,
      "reposts": 3,
      "hasImage": false
    },
    {
      "timeAgo": "1mo",
      "visibility": "Public",
      "content": "Shipped the Spotify Analytics Platform — a side project I've been chipping away at on weekends.\n\nJava 21 / Spring Boot 3 core, a Fastify TypeScript BFF, Next.js frontend, fully containerized. Background job system for data sync, OpenTelemetry across the stack, OIDC + Spotify OAuth.\n\nStarted as a way to learn the BFF pattern properly and turned into the cleanest backend I've shipped. Repo open on my GitHub.",
      "reactions": 124,
      "comments": 18,
      "reposts": 8,
      "hasImage": false
    }
  ]
};
