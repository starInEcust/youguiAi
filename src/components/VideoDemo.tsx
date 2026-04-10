import { motion } from "framer-motion";
import { Send } from "lucide-react";

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
            See It in Action - Ask Anything ↓
          </h2>
          <p className="text-gray-400 text-sm">
            Neurova AI Agents Respond to Financial Queries With Instant Insights
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]"
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          <div className="p-6 space-y-6 min-h-[360px]">
            <div className="flex justify-end">
              <div className="bg-blue-600/80 rounded-2xl rounded-br-sm px-4 py-3 max-w-md">
                <p className="text-xs text-blue-200 mb-1">Neurova</p>
                <p className="text-sm">
                  Can you analyze the suspicious trading pattern in our system?
                </p>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="bg-white/5 rounded-2xl rounded-bl-sm px-5 py-4 max-w-lg">
                <p className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/30 flex items-center justify-center text-[10px]">
                    AI
                  </span>
                  analytics agent
                </p>
                <p className="text-sm text-gray-300 mb-3">
                  Analyzing trading patterns and detecting anomalies...
                </p>
                <div className="text-xs text-gray-400 space-y-3 bg-white/[0.03] rounded-lg p-4">
                  <p className="font-medium text-gray-300">
                    Based on the analysis, I&apos;ve identified several patterns
                    that require immediate attention:
                  </p>
                  <div>
                    <p className="font-medium text-gray-300">
                      1. Unusual Volume Spikes:
                    </p>
                    <p>- 3.5x increase in trading volume during off-peak hours</p>
                    <p>
                      - Concentrated activity in typically low-liquidity periods
                    </p>
                    <p>- Pattern suggests potential market manipulation</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-300">
                      2. Price Movement Anomalies:
                    </p>
                    <p>
                      - Multiple instances of price movements against market
                      trends
                    </p>
                    <p>
                      - Coordinated trading activities across related securities
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-300">
                      3. Account Behavior:
                    </p>
                    <p>
                      - Multiple accounts showing synchronized trading patterns
                    </p>
                    <p>
                      - High frequency of cancelled orders before execution
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-5">
            <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 border border-white/5">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-transparent text-sm text-gray-400 outline-none placeholder:text-gray-600"
                disabled
              />
              <button className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Send size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
