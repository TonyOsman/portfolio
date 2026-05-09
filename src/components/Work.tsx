import { motion } from 'framer-motion'

const experiences = [
  {
    code: 'ORC',
    title: 'GenO FY26 — ERP Consultant',
    company: 'Oracle',
    location: 'São Paulo, Brasil',
    period: 'Jul 2025 — Present',
    description:
      'Building enterprise integrations and AI-agent tooling on top of Oracle Fusion Cloud and OCI, supporting supply chain platforms that handle high-volume operational data. Won 1st place at the internal Oracle AI Agent Studio Hackathon (LATAM).',
    skills: ['SQL Pipelines', 'Oracle Fusion Cloud', 'OCI', 'AI Agents', 'Supply Chain'],
  },
  {
    code: 'EXD',
    title: 'SAP TM Consultant — Supply Chain',
    company: 'Exed Consulting',
    location: 'São Paulo, Brasil',
    period: 'Mar — Jul 2025',
    description:
      'Implemented backend integrations and data flows within SAP Transportation Management. Modeled logistics and routing workflows and collaborated with engineering teams to deploy supply chain platforms.',
    skills: ['SAP TM', 'Logistics Modeling', 'System Integration', 'Deployment'],
  },
  {
    code: 'MMX',
    title: 'Ecommerce Manager',
    company: 'MasterMix Distribuidora',
    location: 'São Paulo, Brasil',
    period: 'Oct 2023 — Jan 2025',
    description:
      "Built the company's first B2C digital commerce channel, integrating marketplaces with internal ERP systems. Designed pricing automation and inventory synchronization workflows.",
    skills: ['ERP Integration', 'Marketplaces', 'Pricing Automation', 'API Design'],
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 1, ease: 'easeOut' }
}

export function Work() {
  return (
    <section id="work" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Career</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          WORK<br />EXPERIENCE
        </motion.h2>

        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.company + exp.period}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
              className="border-t border-gray-800 py-8 md:py-12 lg:py-16 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                <div className="lg:col-span-5 flex items-start gap-5">
                  <div className="shrink-0 w-14 h-14 lg:w-16 lg:h-16 border border-gray-700 flex items-center justify-center font-display text-sm tracking-widest text-gray-300">
                    {exp.code}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-base lg:text-lg text-gray-400">{exp.company}</p>
                    <p className="text-sm text-gray-600 mt-2">{exp.location}</p>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <p className="text-sm text-gray-500 tracking-widest uppercase">
                    {exp.period}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <p className="text-gray-400 leading-relaxed mb-6 text-sm lg:text-base">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs text-gray-500 border border-gray-800 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
          <div className="border-t border-gray-800" />
        </div>
      </div>
    </section>
  )
}
