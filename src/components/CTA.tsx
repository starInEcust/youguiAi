import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold italic mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-sm text-gray-400 mb-8 max-w-md">
              Join leading financial institutions using our AI Services to
              streamline their operations and make better decisions.
            </p>
            <div className="flex gap-4">
              <Link
                to="#"
                className="text-sm px-6 py-3 rounded-lg border border-white/20 hover:bg-white/5 transition-all font-medium"
              >
                Get Started
              </Link>
              <Link
                to="/contact"
                className="text-sm px-6 py-3 rounded-lg border border-white/20 hover:bg-white/5 transition-all font-medium"
              >
                Request Demo
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="relative aspect-square max-w-md ml-auto rounded-2xl overflow-hidden bg-gradient-to-br from-orange-200/10 via-pink-200/10 to-purple-200/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {[...Array(6)].map((_, i) => {
                    const angle = (i * 60 * Math.PI) / 180;
                    const x = Math.cos(angle) * 60;
                    const y = Math.sin(angle) * 60;
                    return (
                      <div
                        key={i}
                        className="absolute w-6 h-6 rounded-full bg-gray-300/20 border border-gray-300/30"
                        style={{
                          left: `calc(50% + ${x}px - 12px)`,
                          top: `calc(50% + ${y}px - 12px)`,
                        }}
                      />
                    );
                  })}
                  <div className="w-10 h-10 rounded-full bg-gray-300/30 border border-gray-300/40 mx-auto" />
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={`line-${i}`}
                      className="absolute w-px bg-gray-400/20"
                      style={{
                        height: "60px",
                        left: "50%",
                        top: "50%",
                        transformOrigin: "top center",
                        transform: `rotate(${i * 60}deg)`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-orange-400/10 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
