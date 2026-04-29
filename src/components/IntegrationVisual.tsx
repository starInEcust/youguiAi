import { motion } from "framer-motion";

const apps = [
  { label: "API", color: "#34d399", angle: -90 },
  { label: "DB", color: "#60a5fa", angle: -30 },
  { label: "ML", color: "#a78bfa", angle: 30 },
  { label: "BI", color: "#f59e0b", angle: 90 },
  { label: "CRM", color: "#f472b6", angle: 150 },
  { label: "ERP", color: "#22d3ee", angle: 210 },
];

const CENTER = 200;
const RADIUS = 120;

export default function IntegrationVisual() {
  return (
    <div className="hidden md:flex items-center justify-center">
      <div className="relative w-full aspect-square max-w-md rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/20 via-purple-900/15 to-blue-900/20 border border-white/5">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
          <defs>
            <radialGradient id="integHubGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="integLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
            </linearGradient>
            <filter id="integGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {[RADIUS - 30, RADIUS, RADIUS + 25].map((r, i) => (
            <motion.circle
              key={r}
              cx={CENTER}
              cy={CENTER}
              r={r}
              fill="none"
              stroke="#a78bfa"
              strokeOpacity={0.12}
              strokeWidth="1"
              strokeDasharray={i === 1 ? "4 6" : "2 4"}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
            />
          ))}

          {apps.map((app, i) => {
            const rad = (app.angle * Math.PI) / 180;
            const x = CENTER + RADIUS * Math.cos(rad);
            const y = CENTER + RADIUS * Math.sin(rad);
            const path = `M ${CENTER} ${CENTER} L ${x} ${y}`;
            return (
              <g key={app.label}>
                <line
                  x1={CENTER}
                  y1={CENTER}
                  x2={x}
                  y2={y}
                  stroke="url(#integLineGradient)"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
                <motion.circle
                  r="3"
                  fill={app.color}
                  filter="url(#integGlow)"
                  animate={{
                    offsetDistance: ["0%", "100%"],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.4,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ offsetPath: `path("${path}")` }}
                />
                <motion.circle
                  r="2.5"
                  fill="#a78bfa"
                  filter="url(#integGlow)"
                  animate={{
                    offsetDistance: ["100%", "0%"],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.4,
                    delay: i * 0.3 + 1.2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ offsetPath: `path("${path}")` }}
                />
              </g>
            );
          })}

          {apps.map((app) => {
            const rad = (app.angle * Math.PI) / 180;
            const x = CENTER + RADIUS * Math.cos(rad);
            const y = CENTER + RADIUS * Math.sin(rad);
            return (
              <g key={`node-${app.label}`}>
                <motion.circle
                  cx={x}
                  cy={y}
                  r="22"
                  fill="none"
                  stroke={app.color}
                  strokeOpacity="0.4"
                  strokeWidth="1"
                  animate={{ r: [22, 30, 22], opacity: [0.5, 0, 0.5] }}
                  transition={{
                    duration: 2.5,
                    delay: app.angle / 60,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                <circle
                  cx={x}
                  cy={y}
                  r="20"
                  fill="#0f172a"
                  stroke={app.color}
                  strokeOpacity="0.7"
                  strokeWidth="1.5"
                />
                <text
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill={app.color}
                >
                  {app.label}
                </text>
              </g>
            );
          })}

          <circle cx={CENTER} cy={CENTER} r="60" fill="url(#integHubGradient)" />

          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          >
            <circle
              cx={CENTER}
              cy={CENTER}
              r="38"
              fill="none"
              stroke="#a78bfa"
              strokeOpacity="0.6"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
          </motion.g>

          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r="28"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="1.5"
            animate={{ r: [28, 36, 28] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />

          <circle
            cx={CENTER}
            cy={CENTER}
            r="22"
            fill="#0f172a"
            stroke="#a78bfa"
            strokeWidth="1.5"
          />

          <g transform={`translate(${CENTER}, ${CENTER})`}>
            <motion.g
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              {[0, 60, 120, 180, 240, 300].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                return (
                  <line
                    key={deg}
                    x1={Math.cos(rad) * 8}
                    y1={Math.sin(rad) * 8}
                    x2={Math.cos(rad) * 14}
                    y2={Math.sin(rad) * 14}
                    stroke="#a78bfa"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                );
              })}
            </motion.g>
            <circle r="5" fill="#a78bfa" filter="url(#integGlow)" />
          </g>
        </svg>
      </div>
    </div>
  );
}
