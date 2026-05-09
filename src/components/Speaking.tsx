import { motion } from 'framer-motion'

const certifications = [
  {
    title: 'Oracle Fusion AI Agent Studio Certified Foundations Associate — Rel 1',
    issuer: 'Oracle University',
    year: '2026',
  },
  {
    title: 'Oracle Order Management Cloud Order to Cash 2025 Certified Implementation Professional',
    issuer: 'Oracle University',
    year: '2025',
  },
  {
    title: 'Oracle Fusion Transportation & Global Trade Management Cloud 2025 Certified Implementation Professional',
    issuer: 'Oracle University',
    year: '2025',
  },
  {
    title: 'Oracle Fusion Cloud Applications ERP Process Essentials Certified — Rel 1',
    issuer: 'Oracle University',
    year: '2025',
  },
  {
    title: 'Oracle Fusion Cloud Applications SCM Process Essentials Certified — Rel 1',
    issuer: 'Oracle University',
    year: '2025',
  },
  {
    title: 'Cybersecurity',
    issuer: 'FIAP',
    year: '2024',
  },
]

const languages = [
  { lang: 'Portuguese', level: 'Native' },
  { lang: 'Arabic', level: 'Native' },
  { lang: 'English', level: 'Full Professional' },
  { lang: 'French', level: 'Full Professional' },
  { lang: 'Spanish', level: 'Limited Working' },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Speaking() {
  return (
    <section id="speaking" className="section-padding bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Honors & Credentials</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          AWARDS &<br />CERTIFICATIONS
        </motion.h2>

        <motion.div
          {...fadeInUp}
          className="mb-20 lg:mb-28 border border-gray-700 p-8 md:p-12 lg:p-16 relative overflow-hidden"
        >
          <div className="absolute top-6 right-6 md:top-8 md:right-8 font-display text-5xl md:text-6xl lg:text-7xl text-gray-800 leading-none">
            01
          </div>
          <p className="text-xs text-gray-500 tracking-[0.3em] uppercase mb-6">
            ★ Honor & Award
          </p>
          <h3 className="font-display text-4xl md:text-5xl lg:text-7xl text-white leading-none mb-6">
            1ST PLACE
          </h3>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light max-w-3xl mb-4">
            Oracle AI Agent Studio Hackathon — Latin America
          </p>
          <p className="text-sm text-gray-500 max-w-3xl leading-relaxed mb-6">
            CORA (Close Orchestration & Reporting Agent) was selected as the winning
            project at Oracle's AI Agent Studio Hackathon — LATAM region. A multi-agent
            system orchestrating the monthly financial period-end close process across
            Oracle Fusion Cloud ERP.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-gray-600 tracking-widest uppercase">
            <span>Issued by Oracle</span>
            <span>·</span>
            <span>May 2026</span>
          </div>
        </motion.div>

        <motion.div {...fadeInUp} className="mb-10">
          <span className="text-sm text-gray-500 tracking-widest uppercase">
            Licenses & Certifications
          </span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <div className="space-y-0">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="block border-t border-gray-800 py-6 md:py-8 px-4 -mx-4"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 border border-gray-700 flex items-center justify-center font-display text-xs tracking-widest text-gray-400 mt-1">
                    {cert.issuer.startsWith('Oracle') ? 'ORC' : 'FIAP'}
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg lg:text-xl text-white font-light leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 md:mt-2">
                      Certificate — {cert.issuer}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-600 md:pl-4 shrink-0">{cert.year}</span>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-gray-800" />
        </div>

        <motion.div {...fadeInUp} className="mt-24 lg:mt-32">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Languages</span>
          <div className="w-6 h-px bg-gray-600 mt-2 mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {languages.map((l) => (
              <div key={l.lang} className="border-t border-gray-800 pt-4">
                <p className="text-base lg:text-lg text-white font-light">{l.lang}</p>
                <p className="text-xs text-gray-500 tracking-widest uppercase mt-2">
                  {l.level}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
