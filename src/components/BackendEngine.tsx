import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import EngineVisual from "./EngineVisual";

const features = [
  {
    tag: "AI Research",
    title: "AI-Powered Research",
    desc: "Leverage advanced AI to analyze vast amounts of financial data and generate insights in seconds.",
  },
  {
    tag: "Vector-KB/RAG",
    title: "Knowledge Management",
    desc: "Centralize and organize your firm's collective intelligence with smart tagging and search.",
  },
  {
    tag: "NLP/LLM",
    title: "Natural Language Agent",
    desc: "Ask questions in plain English and receive accurate, contextual responses with source citations.",
  },
  {
    tag: "Multi-Agents",
    title: "Automated Analysis",
    desc: "Generate comprehensive reports, financial models, and presentations with AI assistance.",
  },
];

const tabs = [
  {
    label: "Intelligent Data Processing",
    content: {
      description:
        "Process and analyze complex financial documents with advanced machine learning algorithms",
      items: [
        {
          title: "Multi-format Support",
          desc: "Process PDFs, Excel files, presentations, and unstructured text with equal efficiency.",
        },
        {
          title: "Semantic Understanding",
          desc: "Extract meaningful insights from complex financial documents using context-aware AI.",
        },
        {
          title: "Data Extraction",
          desc: "Automatically identify and extract key financial metrics, trends, and relationships.",
        },
      ],
    },
  },
  {
    label: "Advanced Analytics",
    content: {
      description:
        "Unlock deep insights with powerful analytical tools built for financial professionals",
      items: [
        {
          title: "Predictive Modeling",
          desc: "Build and deploy predictive models using historical data and market trends.",
        },
        {
          title: "Trend Analysis",
          desc: "Identify emerging patterns and market signals before they become mainstream.",
        },
        {
          title: "Risk Assessment",
          desc: "Comprehensive risk analysis powered by machine learning algorithms.",
        },
      ],
    },
  },
  {
    label: "Workflow Integration",
    content: {
      description:
        "Seamlessly integrate AI capabilities into your existing workflows and tools",
      items: [
        {
          title: "API Access",
          desc: "Connect to any data source or tool through our comprehensive REST API.",
        },
        {
          title: "Custom Pipelines",
          desc: "Build automated data processing pipelines tailored to your needs.",
        },
        {
          title: "Team Collaboration",
          desc: "Share insights and workflows across your organization seamlessly.",
        },
      ],
    },
  },
];

export default function BackendEngine() {
  const [activeTab, setActiveTab] = useState(0);
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <section id="platform-features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold italic gradient-text mb-4">
            Powerful Backend Engine
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Robust Backend Infrastructure Powers Comprehensive AI Analysis in
            Real-Time
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((f, i) => (
            <motion.div
              key={f.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card rounded-xl p-6"
            >
              <span className="text-xs gradient-text font-medium uppercase tracking-wider">
                {f.tag}
              </span>
              <h3 className="text-base font-bold italic mt-3 mb-2">
                {f.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex gap-6 mb-10 border-b border-white/10">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => {
                  setActiveTab(i);
                  setOpenItem(null);
                }}
                className={`pb-3 text-sm font-medium transition-all border-b-2 ${
                  activeTab === i
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-sm text-gray-400 mb-6">
                › {tabs[activeTab].content.description}
              </p>
              <div className="space-y-3">
                {tabs[activeTab].content.items.map((item, i) => (
                  <div
                    key={item.title}
                    className="card rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenItem(openItem === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left text-sm font-medium hover:bg-white/[0.02] transition-colors"
                    >
                      {item.title}
                      <span className="text-gray-500">
                        {openItem === i ? (
                          <Minus size={14} />
                        ) : (
                          <Plus size={14} />
                        )}
                      </span>
                    </button>
                    <AnimatePresence>
                      {openItem === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 text-xs text-gray-500">
                            {item.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            <EngineVisual activeTab={activeTab} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
