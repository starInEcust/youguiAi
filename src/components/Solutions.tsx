import { motion } from "framer-motion";

const solutions = [
  {
    title: "Investment Banking",
    desc: "Accelerate deal execution with AI-powered company research, market analysis, and pitch deck creation.",
    features: [
      "Automated company research",
      "Market analysis",
      "Pitch deck automation",
      "Deal comparables",
    ],
  },
  {
    title: "Private Equity",
    desc: "Make better investment decisions with comprehensive due diligence and portfolio monitoring.",
    features: [
      "Due diligence automation",
      "Portfolio monitoring",
      "Investment thesis generation",
      "Market research",
    ],
  },
  {
    title: "Asset Management",
    desc: "Stay ahead of the market with real-time insights and automated investment research.",
    features: [
      "Investment research",
      "Portfolio analysis",
      "Risk assessment",
      "Market intelligence",
    ],
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="gradient-line mb-10" />
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold italic gradient-text">
              Solutions for Every Team
            </h2>
            <p className="text-sm text-gray-400 md:pt-2">
              Tailored AI solutions for financial services professionals
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="card-purple rounded-xl p-7"
            >
              <h3 className="text-lg font-bold italic mb-3">{s.title}</h3>
              <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                {s.desc}
              </p>
              <ul className="space-y-2">
                {s.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-xs text-gray-300"
                  >
                    <span className="text-gray-500">•</span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
