import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rotatingFeatures = [
  "Automated Insights to Actions",
  "Real-Time Market Intelligence",
  "AI-Powered Due Diligence",
  "Predictive Financial Analytics",
];

export default function Hero() {
  const [featureIdx, setFeatureIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeatureIdx((prev) => (prev + 1) % rotatingFeatures.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold italic leading-tight">
              <span className="text-white">Your Financial</span>
              <br />
              <span className="gradient-green">AI Agents</span>
              <br />
              <span className="text-white">All-in-One View</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="card-purple rounded-xl p-6 min-h-[80px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={rotatingFeatures[featureIdx]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-xl md:text-2xl font-bold"
                >
                  {rotatingFeatures[featureIdx]}
                </motion.h3>
              </AnimatePresence>
            </div>

            <div className="border-l-2 border-blue-500 pl-6">
              <p className="text-sm text-gray-400 leading-relaxed">
                Conduct research, make data-driven decisions, and produce
                smarter materials in minutes — not days.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
