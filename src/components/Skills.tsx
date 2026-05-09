import { motion } from 'framer-motion'

const skillGroups = [
  {
    category: 'Backend & Systems',
    items: ['Java', 'Spring Boot', 'Node.js', 'Python', 'REST APIs'],
  },
  {
    category: 'Data & Databases',
    items: ['SQL', 'PostgreSQL', 'Redis', 'Data Modeling', 'NoSQL'],
  },
  {
    category: 'Cloud & Infrastructure',
    items: ['OCI', 'Docker', 'Kubernetes', 'CI/CD', 'Git'],
  },
  {
    category: 'Enterprise Systems',
    items: ['Oracle Fusion Cloud', 'SAP TM', 'Supply Chain Platforms'],
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Skills() {
  return (
    <section id="skills" className="section-padding bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Tech Stack</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-12 lg:mb-20"
        >
          TOOLS OF<br />THE TRADE
        </motion.h2>

        <div className="space-y-12 lg:space-y-16">
          {skillGroups.map((group, gIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gIdx * 0.1 }}
              className="border-t border-gray-800 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              <p className="lg:col-span-3 text-sm text-gray-500 tracking-widest uppercase">
                0{gIdx + 1} — {group.category}
              </p>
              <div className="lg:col-span-9 flex flex-wrap gap-x-6 gap-y-3">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
          <div className="border-t border-gray-800" />
        </div>
      </div>
    </section>
  )
}
