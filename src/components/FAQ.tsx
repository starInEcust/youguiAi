import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const faqs = [
  {
    q: "How is Neurova different from other large language models?",
    a: "Neurova is purpose-built for financial services, with proprietary models trained on financial data and specialized features for financial analysis. We also provide enterprise-grade security and compliance.",
  },
  {
    q: "What data sources does Neurova support?",
    a: "Neurova indexes hundreds of millions of public and private data files including SEC filings, earnings transcripts, market data, news articles, and alternative data sources.",
  },
  {
    q: "How secure is my data?",
    a: "We are SOC 2 Type II certified with bank-level encryption for all data in transit and at rest. Your data belongs to you — we never share or sell your information.",
  },
  {
    q: "Can Neurova integrate with our existing systems?",
    a: "Yes, Neurova offers secure integrations with major enterprise systems, document management solutions, and custom APIs for specific needs.",
  },
];

export default function FAQ() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? faqs.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === faqs.length - 1 ? 0 : c + 1));

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="card-purple rounded-xl p-8 md:p-10 min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold mb-4">{faqs[current].q}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {faqs[current].a}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {faqs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-blue-500 w-4" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
