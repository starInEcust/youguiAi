import { motion } from "framer-motion";
import IntegrationVisual from "./IntegrationVisual";

const integrations = [
  {
    title: "API Integration",
    badge: "Core",
    badgeColor: "text-green-400 bg-green-500/10 border-green-500/20",
    desc: "Seamlessly connect with external services and data sources through our robust API infrastructure.",
  },
  {
    title: "Custom Workflows",
    badge: "Pro",
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    desc: "Build and automate custom workflows that match your unique business processes.",
  },
  {
    title: "Data Pipeline",
    badge: "Enterprise",
    badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    desc: "Create efficient data pipelines for real-time processing and analytics.",
  },
  {
    title: "Third-party Apps",
    badge: "Beta",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    desc: "Connect with your favorite tools and extend functionality through our app marketplace.",
  },
];

export default function Integration() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold italic gradient-text mb-4">
              Seamless Integration
            </h2>
            <p className="text-sm text-gray-400 mb-8">
              Extend your capabilities with our powerful integration ecosystem
            </p>
            <IntegrationVisual />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            {integrations.map((item) => (
              <div
                key={item.title}
                className="card rounded-lg p-5 hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold">{item.title}</h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
