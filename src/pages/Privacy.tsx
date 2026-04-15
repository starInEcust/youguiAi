import { motion } from "framer-motion";

const principles = [
  {
    title: "Data Minimization",
    desc: "We only collect data that is strictly necessary for providing our services. No unnecessary personal information is ever requested or stored.",
  },
  {
    title: "Purpose Limitation",
    desc: "Your data is used exclusively for the services you requested. We never repurpose your data for unrelated activities or sell it to third parties.",
  },
  {
    title: "User Control",
    desc: "You maintain full control over your data at all times, including the right to access, correct, export, or delete your information.",
  },
];

const practices = [
  {
    title: "Data Collection",
    items: [
      "Account registration details (name, email, organization)",
      "Usage analytics to improve service quality",
      "Financial data you provide for analysis (processed in isolation)",
    ],
  },
  {
    title: "Data Protection",
    items: [
      "End-to-end encryption for all data in transit and at rest",
      "Complete data isolation between client environments",
      "Regular security audits and penetration testing",
    ],
  },
  {
    title: "Data Retention",
    items: [
      "Data retained only for the duration of your subscription",
      "Immediate deletion upon account termination request",
      "No backup retention beyond 30 days after deletion",
    ],
  },
];

const rights = [
  {
    num: "01",
    title: "Right to Access",
    desc: "Request a complete copy of all personal data we hold about you at any time.",
  },
  {
    num: "02",
    title: "Right to Rectification",
    desc: "Correct any inaccurate or incomplete personal data in your account.",
  },
  {
    num: "03",
    title: "Right to Erasure",
    desc: "Request permanent deletion of your personal data from our systems.",
  },
  {
    num: "04",
    title: "Right to Data Portability",
    desc: "Export your data in a structured, machine-readable format at any time.",
  },
];

const sectionAnim = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.7 },
};

export default function PrivacyPage() {
  return (
    <main className="pt-24">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 section-gradient" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div {...sectionAnim}>
            <h1 className="text-3xl md:text-5xl font-bold italic gradient-text mb-6">
              Your Privacy, Our Priority
            </h1>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">
              At Neurova, we believe privacy is a fundamental right. Our
              commitment to protecting your data is built into every layer of our
              platform.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            {...sectionAnim}
            className="text-2xl md:text-3xl font-bold italic gradient-text text-center mb-12"
          >
            Privacy Principles
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card rounded-xl p-6"
              >
                <h3 className="text-sm font-bold italic mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...sectionAnim} className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold italic gradient-text mb-3">
              How We Handle Your Data
            </h2>
            <p className="text-sm text-gray-400 max-w-lg">
              Transparency is key. Here&apos;s exactly how we collect, protect,
              and manage your information.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {practices.map((practice, i) => (
              <motion.div
                key={practice.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card rounded-xl p-6"
              >
                <h3 className="text-sm font-bold italic mb-3">
                  {practice.title}
                </h3>
                <ul className="space-y-2">
                  {practice.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs text-gray-500 flex items-start gap-2"
                    >
                      <span className="text-purple-400 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <motion.h2
            {...sectionAnim}
            className="text-2xl font-bold italic gradient-text text-center mb-12"
          >
            Your Rights
          </motion.h2>
          <div className="space-y-6">
            {rights.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <h3 className="text-sm font-bold mb-1 flex items-center gap-2">
                  <span className="text-xs text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                    {item.num}
                  </span>
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 pl-8">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div {...sectionAnim}>
            <h2 className="text-2xl font-bold italic gradient-text mb-4">
              Questions About Privacy?
            </h2>
            <p className="text-sm text-gray-400">
              If you have any questions about our privacy practices or wish to
              exercise your data rights, please reach out to our team via the{" "}
              <a
                href="/#/contact"
                className="text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-2"
              >
                Contact page
              </a>
              .
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
