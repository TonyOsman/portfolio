import { motion } from 'framer-motion'

const projects = [
  {
    title: 'CORA — Close Orchestration & Reporting Agent',
    tag: 'Hackathon Winner · 1st Place LATAM',
    year: 'May 2026',
    description:
      'AI agent built with Oracle AI Agent Studio to orchestrate the monthly financial period-end close process in Oracle Fusion Cloud ERP. Multi-agent architecture with a conversational interface, integrated with live Oracle Fusion ERP REST APIs, automating journal entries, reconciliations, sub-ledger sweeps, and reporting — with full task sequencing, status tracking, and exception escalation.',
    stack: ['Oracle AI Agent Studio', 'Fusion ERP REST', 'Multi-Agent', 'Financial Close'],
    link: '#',
    featured: true,
  },
  {
    title: 'Spotify Analytics Platform',
    tag: 'Distributed Systems',
    year: '2026',
    description:
      'Full-stack music analytics platform around the Spotify API. Java 21 / Spring Boot 3 microservice core, Fastify/TypeScript BFF, Next.js frontend — fully containerized via Docker Compose. OAuth 2.0 / OIDC, background sync jobs with real-time status, PostgreSQL (Flyway) + Redis, OpenTelemetry instrumentation across the stack.',
    stack: ['Java', 'Spring Boot', 'TypeScript', 'PostgreSQL', 'Docker', 'OpenTelemetry'],
    link: 'https://github.com/TonyOsman/Spotify-Analytics-Platform',
  },
  {
    title: 'Goal Tracker',
    tag: 'Productivity Tooling',
    year: '2026',
    description:
      'Personal goal tracker with a Year → Quarter → Month → Week → Day hierarchy. Three goal types (outcome, metric, habit), AI-powered weekly reviews and daily nudges via Groq, Telegram bot for quick check-ins, Vercel-cron scheduling.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'Supabase', 'AI'],
    link: 'https://github.com/TonyOsman/Goal-Tracker-app',
  },
  {
    title: 'genOsis — Oracle GenO Hackathon',
    tag: 'Hackathon',
    year: '2026',
    description:
      'Web prototype built during an Oracle GenO hackathon — exploring tooling at the intersection of AI agents and ERP workflows.',
    stack: ['Hackathon', 'Oracle', 'AI Agents'],
    link: 'https://github.com/TonyOsman/genOsis-hackathon',
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Writing() {
  return (
    <section id="writing" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Engineering Projects</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          PROJECTS
        </motion.h2>

        <div className="space-y-0">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target={project.link.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`block border-t border-gray-800 py-8 md:py-12 group hover:bg-gray-900/30 transition-colors px-4 -mx-4 ${
                project.featured ? 'bg-gray-900/20' : ''
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-3">
                  {project.featured && (
                    <div className="inline-flex items-center gap-2 mb-3">
                      <span className="font-display text-base text-white">★</span>
                      <span className="text-xs text-white tracking-widest uppercase">
                        Featured
                      </span>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 tracking-widest uppercase">
                    {project.tag}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{project.year}</p>
                </div>
                <div className="lg:col-span-9">
                  <h3 className="text-xl md:text-2xl lg:text-3xl text-white font-light group-hover:text-gray-300 transition-colors mb-3">
                    {project.title}{' '}
                    {project.link.startsWith('http') && (
                      <span className="text-gray-600">↗</span>
                    )}
                  </h3>
                  <p className="text-gray-400 text-sm lg:text-base leading-relaxed mb-5 max-w-3xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 text-xs text-gray-500 border border-gray-800 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
          <div className="border-t border-gray-800" />
        </div>
      </div>
    </section>
  )
}
