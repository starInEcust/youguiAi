import { motion } from "framer-motion";

const items = [
  {
    num: "01",
    title: "SOC 2 Type II Certified",
    desc: "Independently audited security controls and processes",
  },
  {
    num: "02",
    title: "Enterprise-Grade Security",
    desc: "Bank-level encryption for all data in transit and at rest",
  },
  {
    num: "03",
    title: "Data Privacy",
    desc: "Your data belongs to you. We never share or sell your information",
  },
];

export default function SecuritySection() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 section-gradient" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold italic gradient-text mb-4">
            Enterprise Grade Security
          </h2>
          <p className="text-sm text-gray-400 max-w-lg">
            Your security is our top priority. We implement the highest
            standards of data protection.
          </p>
        </motion.div>

        <div className="max-w-2xl space-y-6">
          {items.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-4 items-start"
            >
              <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded shrink-0 mt-0.5">
                {item.num}
              </span>
              <div>
                <h3 className="text-sm font-bold mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
