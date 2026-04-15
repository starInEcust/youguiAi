import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rotatingFeatures = [
  "Automated Insights to Actions",
  "Real-Time Market Intelligence",
  "AI-Powered Due Diligence",
  "Predictive Financial Analytics",
];

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

const metricCards = [
  {
    label: "Portfolio ROI",
    value: "+24.7%",
    sub: "vs last quarter",
    color: "green" as const,
    bars: [40, 55, 35, 65, 50, 80, 72],
  },
  {
    label: "Risk Score",
    value: "Low",
    sub: "across 12 funds",
    color: "cyan" as const,
    bars: [20, 15, 25, 18, 22, 12, 16],
  },
  {
    label: "Signals Found",
    value: "1,247",
    sub: "today",
    color: "purple" as const,
    bars: [30, 50, 45, 70, 60, 85, 90],
  },
  {
    label: "Time Saved",
    value: "86%",
    sub: "per analysis cycle",
    color: "green" as const,
    bars: [45, 55, 60, 70, 75, 80, 86],
  },
  {
    label: "Data Sources",
    value: "340+",
    sub: "connected live",
    color: "cyan" as const,
    bars: [60, 50, 70, 65, 80, 75, 90],
  },
  {
    label: "Accuracy",
    value: "99.2%",
    sub: "prediction rate",
    color: "purple" as const,
    bars: [88, 90, 85, 92, 95, 93, 99],
  },
];

type MetricColor = "green" | "cyan" | "purple";

const colorMap: Record<MetricColor, { border: string; bg: string; text: string; bar: string }> = {
  green: {
    border: "border-green-500/25",
    bg: "bg-green-500/[0.03]",
    text: "text-green-400",
    bar: "bg-green-400",
  },
  cyan: {
    border: "border-cyan-500/25",
    bg: "bg-cyan-500/[0.03]",
    text: "text-cyan-400",
    bar: "bg-cyan-400",
  },
  purple: {
    border: "border-purple-500/25",
    bg: "bg-purple-500/[0.03]",
    text: "text-purple-400",
    bar: "bg-purple-400",
  },
};

function MiniChart({ bars, color }: { bars: number[]; color: MetricColor }) {
  const c = colorMap[color];
  return (
    <div className="flex items-end gap-[3px] h-8">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className={`w-[4px] rounded-sm ${c.bar} opacity-40`}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 0.5, delay: 1.2 + i * 0.06 }}
        />
      ))}
    </div>
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
  const [featureIdx, setFeatureIdx] = useState(0);
  const [titleReady, setTitleReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeatureIdx((prev) => (prev + 1) % rotatingFeatures.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
              <motion.a
                href="/contact"
                className="group relative text-sm px-8 py-3.5 rounded-lg font-medium overflow-hidden"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-cyan-500 opacity-90 group-hover:opacity-100 transition-opacity" />
                <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                <span className="relative z-10 text-black font-semibold">
                  Get Started
                </span>
              </motion.a>
              <motion.a
                href="#solutions"
                className="text-sm px-8 py-3.5 rounded-lg border border-white/10 hover:border-white/25 transition-all font-medium text-gray-300 hover:text-white"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </div>

          <div className="relative hidden md:block">
            <div className="grid grid-cols-2 gap-3">
              {metricCards.map((card, i) => {
                const c = colorMap[card.color];
                return (
                  <motion.div
                    key={card.label}
                    className={`relative backdrop-blur-md ${c.border} ${c.bg} border rounded-xl p-4 overflow-hidden group hover:border-opacity-60 transition-colors`}
                    initial={{ opacity: 0, y: 24, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + i * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                          {card.label}
                        </p>
                        <p className={`text-2xl font-bold ${c.text} leading-none`}>
                          {card.value}
                        </p>
                      </div>
                      <MiniChart bars={card.bars} color={card.color} />
                    </div>
                    <p className="text-[10px] text-gray-600">{card.sub}</p>

                    <motion.div
                      className="absolute top-0 left-0 w-full h-px"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${
                          card.color === "green"
                            ? "rgba(74,222,128,0.4)"
                            : card.color === "cyan"
                              ? "rgba(34,211,238,0.4)"
                              : "rgba(139,92,246,0.4)"
                        }, transparent)`,
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                    />
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mt-3"
            >
              <div className="card-purple rounded-xl p-4 flex items-center backdrop-blur-sm">
                <div className="flex items-center gap-3 w-full">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-400 shrink-0"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={rotatingFeatures[featureIdx]}
                      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                      transition={{ duration: 0.4 }}
                      className="text-lg md:text-xl font-bold text-white/90"
                    >
                      {rotatingFeatures[featureIdx]}
                    </motion.h3>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="md:hidden space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {metricCards.slice(0, 4).map((card, i) => {
                const c = colorMap[card.color];
                return (
                  <motion.div
                    key={card.label}
                    className={`${c.border} ${c.bg} border rounded-lg p-3`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  >
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider">{card.label}</p>
                    <p className={`text-xl font-bold ${c.text}`}>{card.value}</p>
                  </motion.div>
                );
              })}
            </div>
            <div className="card-purple rounded-xl p-4 flex items-center">
              <div className="flex items-center gap-3 w-full">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400 shrink-0"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={`m-${rotatingFeatures[featureIdx]}`}
                    initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                    transition={{ duration: 0.4 }}
                    className="text-lg font-bold text-white/90"
                  >
                    {rotatingFeatures[featureIdx]}
                  </motion.h3>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
