import { motion } from "framer-motion";

export default function VideoDemo() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold italic gradient-text mb-3">
            See Quant Agent in Action
          </h2>
          <p className="text-base text-gray-300 font-medium mb-2">
            Natural Language In. Validated Strategies Out.
          </p>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            Turn any market hypothesis into a reproducible research workflow — no
            code required. Research → Backtest → Chat in one interface.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]"
        >
          <video
            className="w-full"
            controls
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/demo.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
}
