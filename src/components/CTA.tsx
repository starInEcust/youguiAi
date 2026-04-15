import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { SALES_MAILTO } from "../constants/contact";

interface Node {
  cx: number;
  cy: number;
  r: number;
  phase: number;
  speed: number;
  orbitR: number;
  orbitPhase: number;
  layer: number;
}

interface Edge {
  from: number;
  to: number;
}

const W = 420;
const H = 420;
const CX = W / 2;
const CY = H / 2;

const LAYERS = [
  { count: 1, radius: 0 },
  { count: 6, radius: 60 },
  { count: 10, radius: 130 },
  { count: 14, radius: 195 },
];

function buildGraph() {
  const nodes: Node[] = [];
  LAYERS.forEach((layer, li) => {
    for (let i = 0; i < layer.count; i++) {
      const angle =
        (i / layer.count) * Math.PI * 2 +
        (li % 2 === 0 ? 0 : Math.PI / layer.count);
      nodes.push({
        cx: CX + Math.cos(angle) * layer.radius,
        cy: CY + Math.sin(angle) * layer.radius,
        r: li === 0 ? 5 : li === 1 ? 3.5 : li === 2 ? 2.5 : 2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
        orbitR: li === 0 ? 0 : 2 + Math.random() * 4,
        orbitPhase: Math.random() * Math.PI * 2,
        layer: li,
      });
    }
  });

  const edges: Edge[] = [];
  let idx = 0;
  for (let li = 0; li < LAYERS.length - 1; li++) {
    const startA = idx;
    const countA = LAYERS[li].count;
    const startB = startA + countA;
    const countB = LAYERS[li + 1].count;
    for (let a = 0; a < countA; a++) {
      const connectCount = li === 0 ? countB : Math.min(3, countB);
      const step = Math.floor(countB / connectCount);
      for (let k = 0; k < connectCount; k++) {
        const b = (a * step + k) % countB;
        edges.push({ from: startA + a, to: startB + b });
      }
    }
    idx += countA;
  }

  return { nodes, edges };
}

function NeuralSVG() {
  const svgRef = useRef<SVGSVGElement>(null);
  const animRef = useRef(0);
  const { nodes, edges } = useMemo(() => buildGraph(), []);

  useEffect(() => {
    const pulses: { edge: number; t: number; speed: number }[] = [];
    const spawnPulse = () => {
      pulses.push({
        edge: Math.floor(Math.random() * edges.length),
        t: 0,
        speed: 0.003 + Math.random() * 0.005,
      });
    };
    for (let i = 0; i < 12; i++) spawnPulse();

    let lastSpawn = 0;

    const animate = (time: number) => {
      const svg = svgRef.current;
      if (!svg) return;
      const t = time * 0.001;

      const linesGroup = svg.getElementById("cta-edges") as SVGGElement | null;
      const nodesGroup = svg.getElementById("cta-nodes") as SVGGElement | null;
      const pulsesGroup = svg.getElementById(
        "cta-pulses"
      ) as SVGGElement | null;

      if (!linesGroup || !nodesGroup || !pulsesGroup) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      const positions = nodes.map((n) => ({
        x: n.cx + Math.sin(t * n.speed + n.phase) * n.orbitR,
        y: n.cy + Math.cos(t * n.speed * 0.7 + n.orbitPhase) * n.orbitR,
      }));

      const lineEls = linesGroup.children;
      for (let i = 0; i < edges.length; i++) {
        const el = lineEls[i] as SVGLineElement;
        if (!el) break;
        const pf = positions[edges[i].from];
        const pt = positions[edges[i].to];
        el.setAttribute("x1", String(pf.x));
        el.setAttribute("y1", String(pf.y));
        el.setAttribute("x2", String(pt.x));
        el.setAttribute("y2", String(pt.y));
      }

      const nodeEls = nodesGroup.children;
      for (let i = 0; i < nodes.length; i++) {
        const el = nodeEls[i] as SVGCircleElement;
        if (!el) break;
        el.setAttribute("cx", String(positions[i].x));
        el.setAttribute("cy", String(positions[i].y));
        const glow = 0.5 + 0.5 * Math.sin(t * 2 + nodes[i].phase);
        el.setAttribute("opacity", String(0.4 + glow * 0.6));
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed;
        if (p.t > 1) {
          pulses.splice(i, 1);
          continue;
        }
        const edge = edges[p.edge];
        const from = positions[edge.from];
        const to = positions[edge.to];
        const x = from.x + (to.x - from.x) * p.t;
        const y = from.y + (to.y - from.y) * p.t;
        const el = pulsesGroup.children[i] as SVGCircleElement;
        if (el) {
          el.setAttribute("cx", String(x));
          el.setAttribute("cy", String(y));
          el.setAttribute("opacity", String(1 - Math.abs(p.t - 0.5) * 2));
        }
      }

      while (pulsesGroup.children.length > pulses.length) {
        pulsesGroup.removeChild(pulsesGroup.lastChild!);
      }
      while (pulsesGroup.children.length < pulses.length) {
        const c = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );
        c.setAttribute("r", "3");
        c.setAttribute("fill", "url(#cta-pulse-grad)");
        pulsesGroup.appendChild(c);
      }

      if (time - lastSpawn > 300) {
        lastSpawn = time;
        if (pulses.length < 20) spawnPulse();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [nodes, edges]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 420 420"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 40px rgba(74,222,128,0.08))" }}
    >
      <defs>
        <radialGradient id="cta-center-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(74,222,128,0.15)" />
          <stop offset="60%" stopColor="rgba(34,211,238,0.05)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cta-pulse-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="cta-line-grad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="rgba(74,222,128,0.25)" />
          <stop offset="100%" stopColor="rgba(34,211,238,0.12)" />
        </linearGradient>
        <filter id="cta-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="210" cy="210" r="200" fill="url(#cta-center-glow)" />

      {[70, 135, 195].map((r, i) => (
        <circle
          key={r}
          cx="210"
          cy="210"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="1"
          strokeDasharray={i % 2 === 0 ? "4 8" : "2 6"}
        />
      ))}

      <g id="cta-edges">
        {edges.map((_, i) => (
          <line
            key={i}
            stroke="url(#cta-line-grad)"
            strokeWidth="0.6"
            opacity="0.4"
          />
        ))}
      </g>

      <g id="cta-nodes" filter="url(#cta-glow)">
        {nodes.map((n, i) => (
          <circle
            key={i}
            r={n.r}
            fill={
              n.layer === 0
                ? "#4ade80"
                : n.layer === 1
                  ? "#4ade80"
                  : n.layer === 2
                    ? "#22d3ee"
                    : "#a78bfa"
            }
          />
        ))}
      </g>

      <g id="cta-pulses" />
    </svg>
  );
}

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-green-500/5 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-xs tracking-wider uppercase mb-6"
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
              Get Started
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-bold italic mb-6 leading-tight">
              <span className="text-white">Ready to </span>
              <span className="gradient-green">Transform</span>
              <br />
              <span className="text-white">Your Business?</span>
            </h2>
            <p className="text-sm text-gray-400 mb-8 max-w-md leading-relaxed">
              Join leading financial institutions using our AI Services to
              streamline their operations and make better decisions.
            </p>
            <div className="flex gap-4">
              <motion.a
                href={SALES_MAILTO}
                className="group relative text-sm px-8 py-3.5 rounded-lg font-medium overflow-hidden"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-cyan-500 opacity-90 group-hover:opacity-100 transition-opacity" />
                <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                <span className="relative z-10 text-black font-semibold">
                  Request Demo
                </span>
              </motion.a>
              <motion.a
                href="/contact"
                className="text-sm px-8 py-3.5 rounded-lg border border-white/10 hover:border-white/25 transition-all font-medium text-gray-300 hover:text-white"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="relative aspect-square max-w-md ml-auto">
              <NeuralSVG />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
