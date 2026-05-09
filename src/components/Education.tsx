import { motion } from 'framer-motion'

const education = [
  {
    code: 'FIAP',
    school: 'FIAP',
    degree: 'B.Sc. Computer Information Systems',
    focus: 'Software Engineering & DevOps',
    period: 'Aug 2023 — Aug 2027 (Expected)',
    location: 'SÃO PAULO / BRASIL',
    grade: '8.96 / 10',
    details:
      'Focus on backend engineering, distributed systems, and DevOps. Coursework covers API gateways, load balancing, CQRS, event sourcing, Redis caching, networking fundamentals, and Function Point Analysis.',
    tracks: [
      'Backend (Java, Spring Boot, Microservices)',
      'Frontend (React, Next.js, TypeScript)',
      'Mobile (Flutter, Kotlin / Jetpack Compose)',
      'Data Science & Analysis',
      'Computer & Systems Architecture',
    ],
  },
  {
    code: 'CBS',
    school: 'Coimbra Business School — ISCAC',
    degree: 'Executive MBA — Neoliderança e Disrupção Organizacional',
    focus:
      'Pilot cohort of an executive program by ISCAC, FIAP and DeRose Method, integrating Neuroscience, Biomimetics, Positive Psychology and AI applications to leadership.',
    period: 'Jun 2024 — Present',
    location: 'COIMBRA / PORTUGAL',
    grade: null,
    details: null,
    tracks: [
      'Neoleadership in the Tech & Digital World',
      'Neuroscience Applied to Leadership',
      'Biomimetic Leadership',
      'Behavioral Innovation',
      'High-Performance Leadership',
    ],
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Education() {
  return (
    <section id="education" className="section-padding bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Background</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          EDUCATION
        </motion.h2>

        <div className="space-y-0">
          {education.map((edu, index) => (
            <motion.article
              key={edu.school}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="border-t border-gray-800 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              <div className="lg:col-span-5 flex items-start gap-5">
                <div className="shrink-0 w-14 h-14 lg:w-16 lg:h-16 border border-gray-700 flex items-center justify-center font-display text-xs tracking-widest text-gray-300">
                  {edu.code}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white">
                    {edu.school}
                  </h3>
                  <p className="text-xs text-gray-600 tracking-widest uppercase mt-2">
                    {edu.location}
                  </p>
                  {edu.grade && (
                    <p className="mt-4 inline-block px-3 py-1 text-xs text-gray-300 border border-gray-700 rounded-full">
                      Grade · {edu.grade}
                    </p>
                  )}
                </div>
              </div>
              <div className="lg:col-span-2">
                <p className="text-sm text-gray-500 tracking-widest uppercase">
                  {edu.period}
                </p>
              </div>
              <div className="lg:col-span-5">
                <p className="text-base lg:text-lg text-gray-300">{edu.degree}</p>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{edu.focus}</p>
                {edu.details && (
                  <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                    {edu.details}
                  </p>
                )}
                {edu.tracks && (
                  <ul className="mt-5 space-y-1.5">
                    {edu.tracks.map((t) => (
                      <li
                        key={t}
                        className="text-xs text-gray-500 tracking-wide pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-gray-700"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.article>
          ))}
          <div className="border-t border-gray-800" />
        </div>
      </div>
    </section>
  )
}
