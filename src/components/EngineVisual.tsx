import { motion, AnimatePresence } from "framer-motion";

interface EngineVisualProps {
  activeTab: number;
}

export default function EngineVisual({ activeTab }: EngineVisualProps) {
  return (
    <div className="hidden md:flex items-center justify-center">
      <div className="relative w-full aspect-square max-w-sm rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-blue-900/30 border border-white/5">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            {activeTab === 0 && <DataProcessingVisual />}
            {activeTab === 1 && <AnalyticsVisual />}
            {activeTab === 2 && <WorkflowVisual />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function CoreDefs() {
  return (
    <defs>
      <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
        <stop offset="50%" stopColor="#a78bfa" stopOpacity="1" />
        <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
        <stop offset="100%" stopColor="#a78bfa" stopOpacity="1" />
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

function AICore({ x = 200, y = 200, r = 28 }: { x?: number; y?: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r * 2.5} fill="url(#coreGradient)" />
      <motion.circle
        cx={x}
        cy={y}
        r={r}
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.5"
        animate={{ r: [r, r + 6, r] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx={x}
        cy={y}
        r={r - 8}
        fill="none"
        stroke="#a78bfa"
        strokeWidth="1"
        opacity="0.7"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${x}px ${y}px` }}
        strokeDasharray="4 4"
      />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fontStyle="italic"
        fill="#dbeafe"
        filter="url(#glow)"
      >
        AI
      </text>
    </g>
  );
}

function DataProcessingVisual() {
  const sources = [
    { label: "PDF", x: 50, y: 70 },
    { label: "XLS", x: 50, y: 200 },
    { label: "DOC", x: 50, y: 330 },
  ];
  const outputs = [
    { y: 90 },
    { y: 200 },
    { y: 310 },
  ];

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <CoreDefs />

      {sources.map((s, i) => (
        <g key={s.label}>
          <rect
            x={s.x - 24}
            y={s.y - 18}
            width="48"
            height="36"
            rx="6"
            fill="#0f172a"
            stroke="#3b82f6"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
          <text
            x={s.x}
            y={s.y + 5}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="#93c5fd"
          >
            {s.label}
          </text>
          <motion.path
            d={`M ${s.x + 24} ${s.y} Q ${120} ${s.y}, ${172} ${200}`}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="1.2"
            strokeOpacity="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, repeatDelay: 1 }}
          />
          <motion.circle
            r="3"
            fill="#60a5fa"
            filter="url(#glow)"
            animate={{
              offsetDistance: ["0%", "100%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              offsetPath: `path("M ${s.x + 24} ${s.y} Q ${120} ${s.y}, ${172} ${200}")`,
            }}
          />
        </g>
      ))}

      <AICore />

      {outputs.map((o, i) => (
        <g key={i}>
          <motion.path
            d={`M ${228} ${200} Q ${280} ${o.y}, ${340} ${o.y}`}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="1.2"
            strokeOpacity="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.8 + i * 0.2, repeat: Infinity, repeatDelay: 1 }}
          />
          <motion.circle
            r="2.5"
            fill="#a78bfa"
            filter="url(#glow)"
            animate={{
              offsetDistance: ["0%", "100%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: 1 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              offsetPath: `path("M ${228} ${200} Q ${280} ${o.y}, ${340} ${o.y}")`,
            }}
          />
          <rect
            x="338"
            y={o.y - 14}
            width="32"
            height="28"
            rx="4"
            fill="#0f172a"
            stroke="#a78bfa"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
          {[0, 1, 2].map((k) => (
            <rect
              key={k}
              x="343"
              y={o.y - 9 + k * 6}
              width={20 - k * 4}
              height="2"
              rx="1"
              fill="#a78bfa"
              opacity={0.7 - k * 0.15}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

function AnalyticsVisual() {
  const bars = [60, 90, 50, 110, 75, 130, 95, 150, 120, 170];
  const points = bars.map((h, i) => ({
    x: 40 + i * 32,
    y: 320 - h,
  }));
  const linePath = points.reduce(
    (acc, p, i) => acc + (i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`),
    "",
  );

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <CoreDefs />

      {[80, 160, 240, 320].map((y) => (
        <line
          key={y}
          x1="30"
          x2="370"
          y1={y}
          y2={y}
          stroke="#ffffff"
          strokeOpacity="0.05"
          strokeDasharray="2 4"
        />
      ))}

      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={32 + i * 32}
          y={320 - h}
          width="16"
          height={h}
          rx="2"
          fill="url(#trendGradient)"
          opacity="0.35"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
          style={{ transformOrigin: `${40 + i * 32}px 320px` }}
        />
      ))}

      <motion.path
        d={linePath}
        fill="none"
        stroke="url(#trendGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.2 }}
      />

      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3"
          fill="#a78bfa"
          filter="url(#glow)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.4, 1] }}
          transition={{
            duration: 0.5,
            delay: 0.15 + i * 0.18,
            repeat: Infinity,
            repeatDelay: 2.5,
          }}
        />
      ))}

      <motion.circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r="6"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="1.5"
        animate={{ r: [6, 14, 6], opacity: [1, 0, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
      />

      <g>
        <rect x="30" y="30" width="90" height="36" rx="6" fill="#0f172a" stroke="#3b82f6" strokeOpacity="0.4" />
        <text x="42" y="48" fontSize="9" fill="#94a3b8">FORECAST</text>
        <text x="42" y="60" fontSize="11" fontWeight="700" fill="#60a5fa">+24.7%</text>
      </g>
      <g>
        <rect x="280" y="30" width="90" height="36" rx="6" fill="#0f172a" stroke="#a78bfa" strokeOpacity="0.4" />
        <text x="292" y="48" fontSize="9" fill="#94a3b8">CONFIDENCE</text>
        <text x="292" y="60" fontSize="11" fontWeight="700" fill="#a78bfa">98.2%</text>
      </g>

      {[2, 5, 8].map((i) => (
        <motion.circle
          key={`pulse-${i}`}
          cx={points[i].x}
          cy={points[i].y}
          r="2"
          fill="#60a5fa"
          animate={{ r: [2, 8, 2], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
        />
      ))}
    </svg>
  );
}

function WorkflowVisual() {
  const nodes = [
    { id: "api", label: "API", x: 60, y: 100, color: "#60a5fa" },
    { id: "db", label: "DB", x: 60, y: 300, color: "#60a5fa" },
    { id: "p1", label: "ETL", x: 180, y: 100, color: "#a78bfa" },
    { id: "p2", label: "ML", x: 180, y: 300, color: "#a78bfa" },
    { id: "out", label: "OUT", x: 320, y: 200, color: "#34d399" },
  ];

  const links = [
    { from: "api", to: "p1" },
    { from: "db", to: "p2" },
    { from: "p1", to: "out" },
    { from: "p2", to: "out" },
    { from: "p1", to: "p2" },
  ];

  const getNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <CoreDefs />

      <AICore x={200} y={200} r={22} />

      {links.map((l, i) => {
        const from = getNode(l.from);
        const to = getNode(l.to);
        const path = `M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${
          (from.y + to.y) / 2 + (i % 2 === 0 ? -20 : 20)
        }, ${to.x} ${to.y}`;
        return (
          <g key={`${l.from}-${l.to}`}>
            <path
              d={path}
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.08"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <motion.circle
              r="3"
              fill="#60a5fa"
              filter="url(#glow)"
              animate={{
                offsetDistance: ["0%", "100%"],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.4,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ offsetPath: `path("${path}")` }}
            />
            <motion.circle
              r="2"
              fill="#a78bfa"
              filter="url(#glow)"
              animate={{
                offsetDistance: ["0%", "100%"],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.4,
                delay: i * 0.5 + 1.2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ offsetPath: `path("${path}")` }}
            />
          </g>
        );
      })}

      {nodes.map((n) => (
        <g key={n.id}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r="22"
            fill="none"
            stroke={n.color}
            strokeOpacity="0.3"
            strokeWidth="1"
            animate={{ r: [22, 28, 22], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          />
          <circle
            cx={n.x}
            cy={n.y}
            r="18"
            fill="#0f172a"
            stroke={n.color}
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />
          <text
            x={n.x}
            y={n.y + 4}
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill={n.color}
          >
            {n.label}
          </text>
        </g>
      ))}

      <g opacity="0.4">
        {[0, 1, 2].map((i) => (
          <motion.rect
            key={i}
            x={350}
            y={50 + i * 14}
            width="36"
            height="3"
            rx="1.5"
            fill="#34d399"
            animate={{ width: [10, 36, 10], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </g>
    </svg>
  );
}
