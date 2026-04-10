import { motion } from "framer-motion";
import { BarChart3, Newspaper, FileSpreadsheet, Layers } from "lucide-react";

const sources = [
  {
    icon: BarChart3,
    title: "Market Data",
    desc: "Real-time market data from major exchanges worldwide",
    color: "text-blue-400",
  },
  {
    icon: Newspaper,
    title: "News & Media",
    desc: "Comprehensive news coverage from trusted sources",
    color: "text-green-400",
  },
  {
    icon: FileSpreadsheet,
    title: "Financial Reports",
    desc: "Annual reports, SEC filings, and earnings statements",
    color: "text-red-400",
  },
  {
    icon: Layers,
    title: "Alternative Data",
    desc: "Satellite imagery, social sentiment, and web scraping",
    color: "text-yellow-400",
  },
];

export default function DataSources() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold italic gradient-text mb-4">
            Comprehensive Data Sources
          </h2>
          <div className="border-l-2 border-blue-500 pl-4 max-w-lg">
            <p className="text-sm text-gray-400">
              Neurova indexes hundreds of millions of public and private data
              files and ingests them into our proprietary enterprise knowledge
              graph.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sources.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card rounded-xl p-6 text-center"
            >
              <s.icon size={28} className={`${s.color} mx-auto mb-4`} />
              <h3 className="text-sm font-bold mb-2">{s.title}</h3>
              <p className="text-xs text-gray-500">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
