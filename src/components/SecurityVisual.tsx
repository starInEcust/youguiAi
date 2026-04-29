import { motion } from "framer-motion";

export default function SecurityVisual() {
  return (
    <div className="hidden md:flex items-center justify-center">
      <div className="relative w-full aspect-square max-w-md rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/25 via-blue-900/15 to-purple-900/25 border border-white/5">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
          <defs>
            <radialGradient id="secShieldGradient" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#6366f1" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="secShieldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="1" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="1" />
            </linearGradient>
            <filter id="secGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="shieldClip">
              <path d="M 200 70 L 310 115 L 310 215 Q 310 290 200 340 Q 90 290 90 215 L 90 115 Z" />
            </clipPath>
          </defs>

          <circle cx={200} cy={210} r={170} fill="url(#secShieldGradient)" />

          {[150, 165, 180].map((r, i) => (
            <motion.circle
              key={r}
              cx={200}
              cy={210}
              r={r}
              fill="none"
              stroke="#a78bfa"
              strokeOpacity={0.15}
              strokeWidth="1"
              strokeDasharray={i === 1 ? "6 8" : "2 5"}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 25 + i * 8, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "200px 210px" }}
            />
          ))}

          {[
            { x: 60, y: 60, delay: 0 },
            { x: 340, y: 70, delay: 0.6 },
            { x: 50, y: 340, delay: 1.2 },
            { x: 350, y: 330, delay: 1.8 },
            { x: 200, y: 30, delay: 2.4 },
          ].map((p, i) => {
            const path = `M ${p.x} ${p.y} Q ${(p.x + 200) / 2} ${
              (p.y + 210) / 2
            }, 200 210`;
            return (
              <g key={i}>
                <motion.circle
                  r="3"
                  fill="#ef4444"
                  filter="url(#secGlow)"
                  animate={{
                    offsetDistance: ["0%", "70%"],
                    opacity: [0, 1, 1, 0],
                    scale: [1, 1, 0.5],
                  }}
                  transition={{
                    duration: 2.2,
                    delay: p.delay,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeIn",
                  }}
                  style={{ offsetPath: `path("${path}")` }}
                />
              </g>
            );
          })}

          <g clipPath="url(#shieldClip)">
            <motion.line
              x1="90"
              y1="0"
              x2="90"
              y2="400"
              stroke="#60a5fa"
              strokeOpacity="0.6"
              strokeWidth="2"
              animate={{ x1: [90, 310], x2: [90, 310] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>

          <motion.path
            d="M 200 70 L 310 115 L 310 215 Q 310 290 200 340 Q 90 290 90 215 L 90 115 Z"
            fill="rgba(15, 23, 42, 0.7)"
            stroke="url(#secShieldStroke)"
            strokeWidth="2.5"
            filter="url(#secGlow)"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />

          <path
            d="M 200 90 L 290 130 L 290 215 Q 290 280 200 320 Q 110 280 110 215 L 110 130 Z"
            fill="none"
            stroke="#a78bfa"
            strokeOpacity="0.3"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x = 200 + 65 * Math.cos(rad);
            const y = 210 + 65 * Math.sin(rad);
            return (
              <motion.circle
                key={deg}
                cx={x}
                cy={y}
                r="2"
                fill="#60a5fa"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.6,
                  delay: deg / 200,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          <g transform="translate(200, 210)">
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            >
              <circle
                r="48"
                fill="none"
                stroke="#a78bfa"
                strokeOpacity="0.4"
                strokeWidth="1"
                strokeDasharray="6 4"
              />
            </motion.g>
            <motion.g
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
              <circle
                r="38"
                fill="none"
                stroke="#60a5fa"
                strokeOpacity="0.4"
                strokeWidth="1"
                strokeDasharray="3 6"
              />
            </motion.g>

            <rect
              x="-18"
              y="-6"
              width="36"
              height="30"
              rx="4"
              fill="#0f172a"
              stroke="url(#secShieldStroke)"
              strokeWidth="1.5"
              filter="url(#secGlow)"
            />
            <path
              d="M -10 -6 L -10 -16 Q -10 -26 0 -26 Q 10 -26 10 -16 L 10 -6"
              fill="none"
              stroke="url(#secShieldStroke)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <motion.circle
              r="3"
              cx="0"
              cy="6"
              fill="#a78bfa"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <line
              x1="0"
              y1="9"
              x2="0"
              y2="16"
              stroke="#a78bfa"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          <g>
            <rect
              x="20"
              y="20"
              width="86"
              height="22"
              rx="11"
              fill="#0f172a"
              stroke="#34d399"
              strokeOpacity="0.4"
            />
            <motion.circle
              cx="32"
              cy="31"
              r="3"
              fill="#34d399"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <text x="42" y="35" fontSize="9" fontWeight="600" fill="#34d399">
              SOC 2
            </text>
            <text x="76" y="35" fontSize="9" fill="#94a3b8">
              ✓
            </text>
          </g>
          <g>
            <rect
              x="294"
              y="20"
              width="86"
              height="22"
              rx="11"
              fill="#0f172a"
              stroke="#60a5fa"
              strokeOpacity="0.4"
            />
            <motion.circle
              cx="306"
              cy="31"
              r="3"
              fill="#60a5fa"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.4, delay: 0.5, repeat: Infinity }}
            />
            <text x="316" y="35" fontSize="9" fontWeight="600" fill="#60a5fa">
              AES-256
            </text>
          </g>

          <g>
            <rect
              x="140"
              y="360"
              width="120"
              height="22"
              rx="11"
              fill="#0f172a"
              stroke="#a78bfa"
              strokeOpacity="0.4"
            />
            <motion.circle
              cx="152"
              cy="371"
              r="3"
              fill="#a78bfa"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.4, delay: 1, repeat: Infinity }}
            />
            <text
              x="200"
              y="375"
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill="#a78bfa"
            >
              END-TO-END ENCRYPTED
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
