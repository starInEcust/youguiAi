import { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PARTICLE_COUNT = 60;
const CONNECTION_DISTANCE = 120;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      if (particlesRef.current.length === 0) {
        initParticles(canvas.offsetWidth, canvas.offsetHeight);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const dxM = mouse.x - p.x;
        const dyM = mouse.y - p.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < 150) {
          p.vx += (dxM / distM) * 0.02;
          p.vy += (dyM / distM) * 0.02;
        }

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) {
          p.vx *= 0.98;
          p.vy *= 0.98;
        }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(74, 222, 128, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        const dxM = mouse.x - p.x;
        const dyM = mouse.y - p.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        const glow = distM < 150 ? 0.8 : p.opacity;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 222, 128, ${glow})`;
        ctx.fill();

        if (distM < 150) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(74, 222, 128, ${glow * 0.15})`;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}

function polar(angle: number, radius: number, cx = 200, cy = 200) {
  const rad = (angle * Math.PI) / 180;
  return { x: cx + Math.cos(rad) * radius, y: cy + Math.sin(rad) * radius };
}

const satellites = [
  { angle: 25, radius: 168, color: "#4ade80", size: 3, delay: 0 },
  { angle: 95, radius: 168, color: "#22d3ee", size: 2.5, delay: 0.4 },
  { angle: 200, radius: 168, color: "#8b5cf6", size: 3, delay: 0.8 },
  { angle: 305, radius: 168, color: "#22d3ee", size: 2.5, delay: 1.2 },
];

const klineBars = [
  28, 36, 30, 42, 38, 50, 46, 58, 52, 64, 60, 72, 68, 80, 74, 66, 70, 62, 56,
  64, 58, 50, 56, 48, 54, 60, 68, 76, 70, 64,
];

function IntelligenceOrb() {
  const cx = 200;
  const cy = 200;
  const sphereR = 130;

  const meridians = [-60, -30, 0, 30, 60];
  const parallels = [-50, -25, 0, 25, 50];

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-auto max-w-[460px] mx-auto"
    >
      <defs>
        <radialGradient id="sphereGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(34,211,238,0.10)" />
          <stop offset="55%" stopColor="rgba(16,40,60,0.25)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
        </radialGradient>
        <radialGradient id="sphereInner" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="rgba(74,222,128,0.18)" />
          <stop offset="60%" stopColor="rgba(74,222,128,0)" />
        </radialGradient>
        <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(74,222,128,0.18)" />
          <stop offset="60%" stopColor="rgba(34,211,238,0.06)" />
          <stop offset="100%" stopColor="rgba(74,222,128,0)" />
        </radialGradient>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(74,222,128,0)" />
          <stop offset="50%" stopColor="rgba(74,222,128,0.7)" />
          <stop offset="100%" stopColor="rgba(34,211,238,0)" />
        </linearGradient>
        <linearGradient id="ringGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(139,92,246,0)" />
          <stop offset="50%" stopColor="rgba(139,92,246,0.55)" />
          <stop offset="100%" stopColor="rgba(34,211,238,0)" />
        </linearGradient>
        <linearGradient id="klineGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(74,222,128,0.05)" />
          <stop offset="100%" stopColor="rgba(74,222,128,0.55)" />
        </linearGradient>
        <clipPath id="sphereClip">
          <circle cx={cx} cy={cy} r={sphereR} />
        </clipPath>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      <motion.circle
        cx={cx}
        cy={cy}
        r="190"
        fill="url(#haloGrad)"
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.04, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      <circle cx={cx} cy={cy} r={sphereR} fill="url(#sphereGrad)" />
      <circle cx={cx} cy={cy} r={sphereR} fill="url(#sphereInner)" />
      <circle
        cx={cx}
        cy={cy}
        r={sphereR}
        fill="none"
        stroke="rgba(74,222,128,0.35)"
        strokeWidth="1"
      />

      <g clipPath="url(#sphereClip)" opacity="0.5">
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          {meridians.map((tilt) => (
            <ellipse
              key={`m-${tilt}`}
              cx={cx}
              cy={cy}
              rx={Math.abs(Math.sin((tilt * Math.PI) / 180)) * sphereR}
              ry={sphereR}
              fill="none"
              stroke="rgba(34,211,238,0.35)"
              strokeWidth="0.6"
            />
          ))}
        </motion.g>
        {parallels.map((p) => {
          const ry = (Math.abs(p) / 90) * sphereR;
          const offsetY = (p / 90) * sphereR * 0.95;
          return (
            <ellipse
              key={`p-${p}`}
              cx={cx}
              cy={cy + offsetY}
              rx={Math.sqrt(Math.max(sphereR * sphereR - offsetY * offsetY, 0))}
              ry={ry * 0.18 + 1}
              fill="none"
              stroke="rgba(74,222,128,0.25)"
              strokeWidth="0.5"
            />
          );
        })}
      </g>

      <ellipse
        cx={cx}
        cy={cy}
        rx="170"
        ry="48"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        strokeDasharray="2 5"
        transform={`rotate(-18 ${cx} ${cy})`}
      />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <ellipse
          cx={cx}
          cy={cy}
          rx="170"
          ry="48"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="1.2"
          transform={`rotate(-18 ${cx} ${cy})`}
        />
      </motion.g>

      <ellipse
        cx={cx}
        cy={cy}
        rx="180"
        ry="62"
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="1"
        strokeDasharray="2 5"
        transform={`rotate(28 ${cx} ${cy})`}
      />
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <ellipse
          cx={cx}
          cy={cy}
          rx="180"
          ry="62"
          fill="none"
          stroke="url(#ringGrad2)"
          strokeWidth="1"
          transform={`rotate(28 ${cx} ${cy})`}
        />
      </motion.g>

      <g clipPath="url(#sphereClip)">
        <motion.path
          d={`M ${cx - sphereR} ${cy + 60}
              C ${cx - 60} ${cy + 30}, ${cx - 30} ${cy + 90}, ${cx + 20} ${cy + 50}
              S ${cx + 100} ${cy + 80}, ${cx + sphereR} ${cy + 40}`}
          fill="none"
          stroke="rgba(74,222,128,0.5)"
          strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.6, 0.4] }}
          transition={{
            pathLength: { duration: 2, delay: 0.6 },
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.path
          d={`M ${cx - sphereR} ${cy - 20}
              C ${cx - 80} ${cy - 50}, ${cx - 20} ${cy + 10}, ${cx + 40} ${cy - 30}
              S ${cx + 110} ${cy - 10}, ${cx + sphereR} ${cy - 40}`}
          fill="none"
          stroke="rgba(34,211,238,0.45)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.5, 0.3] }}
          transition={{
            pathLength: { duration: 2, delay: 1 },
            opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </g>

      <g transform={`translate(${cx - 60}, ${cy + 78})`} clipPath="url(#sphereClip)">
        {klineBars.map((h, i) => {
          const barW = 3.2;
          const x = i * (barW + 0.8);
          return (
            <motion.rect
              key={`k-${i}`}
              x={x}
              y={40 - h * 0.4}
              width={barW}
              height={h * 0.4}
              fill="url(#klineGrad)"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 0.85 }}
              transition={{
                duration: 0.5,
                delay: 1 + i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: `${x}px 40px` }}
            />
          );
        })}
      </g>

      {[0, 1].map((i) => (
        <motion.circle
          key={`pulse-${i}`}
          cx={cx}
          cy={cy}
          r={sphereR}
          fill="none"
          stroke="rgba(74,222,128,0.35)"
          strokeWidth="1"
          initial={{ scale: 0.85, opacity: 0.5 }}
          animate={{ scale: 1.25, opacity: 0 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeOut",
          }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}

      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        {satellites.map((s, i) => {
          const p = polar(s.angle, s.radius, cx, cy);
          return (
            <g key={`sat-${i}`}>
              <circle
                cx={p.x}
                cy={p.y}
                r={s.size + 4}
                fill={s.color}
                opacity="0.12"
                filter="url(#softGlow)"
              />
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={s.size}
                fill={s.color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: [0.7, 1, 0.7] }}
                transition={{
                  scale: { duration: 0.5, delay: 0.6 + s.delay },
                  opacity: {
                    duration: 2.5,
                    repeat: Infinity,
                    delay: s.delay,
                  },
                }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              />
            </g>
          );
        })}
      </motion.g>

      <motion.circle
        cx={cx}
        cy={cy}
        r="6"
        fill="rgba(74,222,128,0.9)"
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.4, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        filter="url(#softGlow)"
      />
      <circle cx={cx} cy={cy} r="2.5" fill="rgba(220,255,235,0.95)" />
    </svg>
  );
}

function GlowOrb() {
  return (
    <>
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(74,222,128,0.08) 0%, rgba(34,211,238,0.04) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}

function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(74,222,128,0.15), rgba(34,211,238,0.1), transparent)",
      }}
      initial={{ top: "0%" }}
      animate={{ top: "100%" }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

export default function Hero() {
  const [titleReady, setTitleReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setTitleReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const titleLines = [
    { text: "Your Financial", className: "text-white" },
    { text: "AI Agents", className: "gradient-green" },
    { text: "All-in-One View", className: "text-white" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <ParticleCanvas />

      <ScanLine />

      <div className="absolute inset-0 pointer-events-none">
        <GlowOrb />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-xs tracking-wider uppercase"
                animate={{
                  borderColor: [
                    "rgba(74,222,128,0.2)",
                    "rgba(74,222,128,0.5)",
                    "rgba(74,222,128,0.2)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                AI-Powered Platform
              </motion.div>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold italic leading-tight">
              {titleLines.map((line, lineIdx) => (
                <span key={lineIdx} className="block overflow-hidden">
                  <motion.span
                    className={`inline-block ${line.className}`}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={
                      titleReady
                        ? { y: "0%", opacity: 1 }
                        : {}
                    }
                    transition={{
                      duration: 0.7,
                      delay: lineIdx * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 border-l-2 border-green-500/40 pl-6 max-w-md"
            >
              <p className="text-sm text-gray-400 leading-relaxed">
                Conduct research, make data-driven decisions, and produce
                smarter materials in minutes — not days.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-8 flex gap-4"
            >
              <motion.button
                type="button"
                onClick={() => navigate("/contact")}
                className="group relative text-sm px-8 py-3.5 rounded-lg font-medium overflow-hidden"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-cyan-500 opacity-90 group-hover:opacity-100 transition-opacity" />
                <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                <span className="relative z-10 text-black font-semibold">
                  Get Started
                </span>
              </motion.button>
              <motion.button
                type="button"
                onClick={() => navigate("/?section=solutions")}
                className="text-sm px-8 py-3.5 rounded-lg border border-white/10 hover:border-white/25 transition-all font-medium text-gray-300 hover:text-white"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <IntelligenceOrb />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
