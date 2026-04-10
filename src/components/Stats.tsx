import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  sublabel: string;
}

const stats: StatItem[] = [
  {
    value: 10,
    suffix: "x",
    label: "Faster Research",
    sublabel: "Speed up your research process with AI assistance",
  },
  {
    value: 65,
    suffix: "M+",
    label: "Data Sources",
    sublabel: "Access to millions of high-quality financial documents",
  },
  {
    value: 99.9,
    suffix: "%",
    label: "Accuracy",
    sublabel: "Enterprise-grade precision in data processing",
  },
  {
    value: 500,
    prefix: "$",
    suffix: "+",
    label: "Cost Savings",
    sublabel: "Average monthly savings per analyst",
  },
];

function Counter({
  value,
  prefix = "",
  suffix,
  inView,
}: {
  value: number;
  prefix?: string;
  suffix: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = Date.now();
    const isDecimal = value % 1 !== 0;

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplay(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span className="text-3xl md:text-4xl font-bold">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card rounded-xl p-6 text-center"
            >
              <Counter
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                inView={inView}
              />
              <h3 className="text-sm font-bold mt-2">{s.label}</h3>
              <p className="text-xs text-gray-500 mt-1">{s.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
