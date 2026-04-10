import { motion } from "framer-motion";

const layers = [
  {
    title: "Zero-Trust Architecture",
    desc: "Built on modern zero-trust principles, ensuring every access request is fully verified regardless of source.",
  },
  {
    title: "Data Sovereignty",
    desc: "Your data remains exclusively yours, with complete isolation and dedicated infrastructure for enterprise clients.",
  },
  {
    title: "Full Transparency",
    desc: "Comprehensive audit trails and real-time monitoring provide complete visibility into all system interactions.",
  },
];

const infra = [
  {
    title: "Enterprise-Grade Security",
    desc: "Leveraging bank-level encryption, advanced access controls, and continuous security monitoring to protect your sensitive data.",
  },
  {
    title: "End-to-End Encryption",
    desc: "Military-grade encryption for all data - in transit, at rest, and during processing - ensuring maximum security at every step.",
  },
  {
    title: "Continuous Compliance",
    desc: "Regular security audits, penetration testing, and compliance updates maintain the highest security standards.",
  },
];

const faqItems = [
  {
    num: "01",
    q: "What security certifications does Neurova maintain?",
    a: "Neurova maintains SOC 2 Type II certification and complies with industry-leading security standards.",
  },
  {
    num: "02",
    q: "How does Neurova protect sensitive data?",
    a: "We implement multiple layers of security including encryption, access controls, and continuous monitoring.",
  },
  {
    num: "03",
    q: "Can Neurova integrate with our existing security infrastructure?",
    a: "Yes, Neurova seamlessly integrates with enterprise security systems while maintaining strict security protocols.",
  },
  {
    num: "04",
    q: "How does Neurova ensure data privacy?",
    a: "We maintain complete data isolation, implement strict access controls, and never use client data for training.",
  },
];

const sectionAnim = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.7 },
};

export default function SecurityPage() {
  return (
    <main className="pt-24">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 section-gradient" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div {...sectionAnim}>
            <h1 className="text-3xl md:text-5xl font-bold italic gradient-text mb-6">
              Enterprise-Grade Security for Financial Intelligence
            </h1>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">
              Neurova combines cutting-edge AI capabilities with military-grade
              security, ensuring your sensitive financial data remains protected
              while delivering powerful insights.
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
            Uncompromising Security at Every Layer
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {layers.map((item, i) => (
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
              Advanced Security Infrastructure
            </h2>
            <p className="text-sm text-gray-400 max-w-lg">
              Our comprehensive security framework protects your data with
              multiple layers of enterprise-grade security measures.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {infra.map((item, i) => (
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...sectionAnim}>
              <h2 className="text-2xl font-bold italic mb-3">
                State-of-the-Art Cloud Security
              </h2>
              <p className="text-sm text-gray-400">
                Built on secure cloud infrastructure with comprehensive security
                controls, continuous monitoring, and industry-leading compliance
                certifications.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="aspect-video rounded-xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/5 grid-bg"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="aspect-video rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/5 grid-bg order-2 md:order-1"
            />
            <motion.div {...sectionAnim} className="order-1 md:order-2">
              <h2 className="text-2xl font-bold italic mb-3">
                Advanced Data Protection
              </h2>
              <p className="text-sm text-gray-400">
                Our multi-layered security approach ensures your data is
                protected at every point - from encryption at rest to secure
                transmission protocols and rigorous access controls.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <motion.h2
            {...sectionAnim}
            className="text-2xl font-bold italic gradient-text text-center mb-12"
          >
            Security FAQ
          </motion.h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
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
                  {item.q}
                </h3>
                <p className="text-xs text-gray-500 pl-8">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
