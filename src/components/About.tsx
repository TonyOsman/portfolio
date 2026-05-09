import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">About</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
          <motion.div {...fadeInUp}>
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              Backend-focused software engineer and cloud systems specialist, currently
              working with large-scale enterprise platforms at Oracle. I build backend
              integrations, data workflows, and cloud-native services using SQL, APIs,
              and containerized infrastructure.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="flex items-center"
          >
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              Strong exposure to distributed logistics systems, large operational
              datasets, and high-reliability enterprise environments. Currently pursuing
              a B.Sc. in Computer Information Systems with a focus on software
              engineering and DevOps at FIAP, São Paulo.
            </p>
          </motion.div>
        </div>

        <motion.div {...fadeInUp} className="mb-24 lg:mb-32">
          <h2 className="font-display text-[8vw] lg:text-section leading-none tracking-tight text-gray-300">
            "BACKEND SYSTEMS.<br />
            <span className="text-white underline underline-offset-8">BUILT FOR SCALE.</span><br />
            FROM ERP SEAMS TO<br />
            DISTRIBUTED PIPELINES."
          </h2>
          <p className="mt-6 text-sm text-gray-500 tracking-widest uppercase">
            ORACLE GENO FY26<br />
            SÃO PAULO, BRASIL
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {[
            { value: '5', label: 'Languages spoken (PT · AR · EN · FR · ES)' },
            { value: '6+', label: 'Industry certifications' },
            { value: '1st', label: 'Oracle AI Agent Studio Hackathon · LATAM' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              {...fadeInUp}
              className="border-t border-gray-800 pt-6"
            >
              <p className="font-display text-6xl lg:text-7xl text-white leading-none">
                {stat.value}
              </p>
              <p className="mt-3 text-sm text-gray-500 tracking-widest uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
