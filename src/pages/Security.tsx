import { motion, type Variants } from "framer-motion";

function CloudSecuritySvg() {
  const nodeVariants: Variants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.12, duration: 0.5, type: "spring" },
    }),
  };

  const pulseVariants: Variants = {
    animate: (i: number) => ({
      r: [4, 7, 4],
      opacity: [0.6, 1, 0.6],
      transition: {
        repeat: Infinity,
        duration: 2.5,
        delay: i * 0.3,
        ease: "easeInOut",
      },
    }),
  };

  const lineVariants: Variants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: (i: number) => ({
      pathLength: 1,
      opacity: 0.5,
      transition: { delay: 0.6 + i * 0.1, duration: 0.8, ease: "easeOut" },
    }),
  };

  const nodes = [
    { x: 200, y: 60, label: "Cloud" },
    { x: 80, y: 150, label: "Auth" },
    { x: 320, y: 150, label: "Encrypt" },
    { x: 120, y: 260, label: "Monitor" },
    { x: 280, y: 260, label: "Firewall" },
    { x: 200, y: 180, label: "Core" },
  ];

  const connections = [
    [0, 1], [0, 2], [0, 5], [1, 3], [1, 5],
    [2, 4], [2, 5], [3, 5], [4, 5],
  ];

  return (
    <svg viewBox="0 0 400 320" className="w-full h-full">
      <defs>
        <radialGradient id="cs-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
        </radialGradient>
        <filter id="cs-blur">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <linearGradient id="cs-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      <circle cx="200" cy="160" r="120" fill="url(#cs-glow)" filter="url(#cs-blur)" />

      {connections.map(([a, b], i) => (
        <motion.line
          key={`line-${i}`}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="url(#cs-line)" strokeWidth="1"
          variants={lineVariants} custom={i}
          initial="initial" whileInView="animate" viewport={{ once: true }}
        />
      ))}

      {connections.map(([a, b], i) => {
        const mx = (nodes[a].x + nodes[b].x) / 2;
        const my = (nodes[a].y + nodes[b].y) / 2;
        return (
          <motion.circle
            key={`flow-${i}`}
            r="2" fill="#a78bfa"
            custom={i}
            animate={{
              cx: [nodes[a].x, mx, nodes[b].x],
              cy: [nodes[a].y, my, nodes[b].y],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              delay: i * 0.35,
              ease: "linear",
            }}
          />
        );
      })}

      {nodes.map((node, i) => (
        <motion.g key={`node-${i}`} variants={nodeVariants} custom={i}
          initial="initial" whileInView="animate" viewport={{ once: true }}>
          <motion.circle
            cx={node.x} cy={node.y}
            variants={pulseVariants} custom={i}
            animate="animate"
            fill={i === 5 ? "#7c3aed" : "#3b82f6"}
            opacity="0.6"
          />
          <circle cx={node.x} cy={node.y} r="3"
            fill={i === 5 ? "#a78bfa" : "#60a5fa"}
            stroke={i === 5 ? "#7c3aed" : "#3b82f6"} strokeWidth="1" />
          <text x={node.x} y={node.y + 18} textAnchor="middle"
            fill="#94a3b8" fontSize="8" fontWeight="500">
            {node.label}
          </text>
        </motion.g>
      ))}

      {/* Shield icon at center */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
      >
        <motion.path
          d="M200 158 L200 148 L192 151 L192 160 Q192 167 200 172 Q208 167 208 160 L208 151 Z"
          fill="none" stroke="#a78bfa" strokeWidth="1.2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.path
          d="M197 160 L199 162 L203 157"
          fill="none" stroke="#c4b5fd" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
        />
      </motion.g>

      {/* Orbiting ring */}
      <motion.ellipse
        cx="200" cy="180" rx="140" ry="30"
        fill="none" stroke="#7c3aed" strokeWidth="0.5" strokeDasharray="4 4"
        animate={{ strokeDashoffset: [0, -80] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        opacity="0.3"
      />
    </svg>
  );
}

function DataProtectionSvg() {
  const hexPoints = (cx: number, cy: number, r: number) => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(" ");
  };

  const hexGrid = [
    { x: 200, y: 100, delay: 0 },
    { x: 160, y: 125, delay: 0.1 },
    { x: 240, y: 125, delay: 0.1 },
    { x: 120, y: 150, delay: 0.2 },
    { x: 200, y: 150, delay: 0.15 },
    { x: 280, y: 150, delay: 0.2 },
    { x: 160, y: 175, delay: 0.25 },
    { x: 240, y: 175, delay: 0.25 },
    { x: 200, y: 200, delay: 0.3 },
    { x: 140, y: 200, delay: 0.3 },
    { x: 260, y: 200, delay: 0.3 },
    { x: 200, y: 250, delay: 0.35 },
  ];

  const scanLineVariants: Variants = {
    animate: {
      y1: [60, 280],
      y2: [60, 280],
      opacity: [0, 0.8, 0],
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
    },
  };

  return (
    <svg viewBox="0 0 400 320" className="w-full h-full">
      <defs>
        <radialGradient id="dp-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dp-hex" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="dp-scan" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </linearGradient>
        <filter id="dp-glow-filter">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <circle cx="200" cy="170" r="130" fill="url(#dp-glow)" />

      {hexGrid.map((hex, i) => (
        <motion.g key={`hex-${i}`}>
          <motion.polygon
            points={hexPoints(hex.x, hex.y, 22)}
            fill="none" stroke="url(#dp-hex)" strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: hex.delay + 0.3, duration: 0.5, type: "spring" }}
            style={{ transformOrigin: `${hex.x}px ${hex.y}px` }}
          />
          <motion.polygon
            points={hexPoints(hex.x, hex.y, 22)}
            fill="#7c3aed" strokeWidth="0" opacity="0"
            animate={{
              opacity: [0, 0.15, 0],
              fill: ["#7c3aed", "#3b82f6", "#7c3aed"],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: i * 0.25,
              ease: "easeInOut",
            }}
          />
        </motion.g>
      ))}

      {/* Lock icon at center */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
      >
        <motion.rect
          x="190" y="147" width="20" height="16" rx="2"
          fill="none" stroke="#a78bfa" strokeWidth="1.5"
          animate={{ stroke: ["#a78bfa", "#60a5fa", "#a78bfa"] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
        <motion.path
          d="M194 147 L194 141 Q194 135 200 135 Q206 135 206 141 L206 147"
          fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"
          animate={{ stroke: ["#a78bfa", "#60a5fa", "#a78bfa"] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
        <motion.circle
          cx="200" cy="155" r="2" fill="#c4b5fd"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </motion.g>

      {/* Scanning line */}
      <motion.line
        x1="80" x2="320"
        stroke="url(#dp-scan)" strokeWidth="2"
        variants={scanLineVariants} animate="animate"
      />

      {/* Data streams */}
      {[0, 1, 2, 3].map((i) => {
        const startX = 100 + i * 80;
        return (
          <motion.g key={`stream-${i}`}>
            {[0, 1, 2, 3, 4].map((j) => (
              <motion.rect
                key={`bit-${i}-${j}`}
                x={startX} width="3" height="3" rx="0.5"
                fill="#60a5fa"
                animate={{
                  y: [60 + j * 20, 280],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  delay: i * 0.3 + j * 0.15,
                  ease: "linear",
                }}
              />
            ))}
          </motion.g>
        );
      })}

      {/* Concentric protection rings */}
      {[50, 80, 110].map((r, i) => (
        <motion.circle
          key={`ring-${i}`}
          cx="200" cy="155" r={r}
          fill="none" stroke="#7c3aed" strokeWidth="0.5"
          strokeDasharray={`${4 + i * 2} ${6 + i * 2}`}
          opacity="0.2"
          animate={{ strokeDashoffset: [0, i % 2 === 0 ? -60 : 60] }}
          transition={{ repeat: Infinity, duration: 10 + i * 3, ease: "linear" }}
        />
      ))}
    </svg>
  );
}

const layers = [
  {
    title: "Zero-Trust Architecture",
    desc: "Built on modern zero-trust principles, ensuring every access request is fully verified regardless of source.",
  },
  {
    title: "Data Sovereignty",
    desc: "Your data remains exclusively yours, with complete isolation and dedicated infrastructure for enterprise clients.",
  },
  {
    title: "Full Transparency",
    desc: "Comprehensive audit trails and real-time monitoring provide complete visibility into all system interactions.",
  },
];

const infra = [
  {
    title: "Enterprise-Grade Security",
    desc: "Leveraging bank-level encryption, advanced access controls, and continuous security monitoring to protect your sensitive data.",
  },
  {
    title: "End-to-End Encryption",
    desc: "Enterprise-grade encryption for all data - in transit, at rest, and during processing - ensuring maximum security at every step.",
  },
  {
    title: "Continuous Compliance",
    desc: "Regular security audits, penetration testing, and compliance updates maintain the highest security standards.",
  },
];

const faqItems = [
  {
    num: "01",
    q: "What security certifications does Neurova maintain?",
    a: "Neurova maintains SOC 2 Type II certification and complies with industry-leading security standards.",
  },
  {
    num: "02",
    q: "How does Neurova protect sensitive data?",
    a: "We implement multiple layers of security including encryption, access controls, and continuous monitoring.",
  },
  {
    num: "03",
    q: "Can Neurova integrate with our existing security infrastructure?",
    a: "Yes, Neurova seamlessly integrates with enterprise security systems while maintaining strict security protocols.",
  },
  {
    num: "04",
    q: "How does Neurova ensure data privacy?",
    a: "We maintain complete data isolation, implement strict access controls, and never use client data for training.",
  },
];

const sectionAnim = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.7 },
};

export default function SecurityPage() {
  return (
    <main className="pt-24">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 section-gradient" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div {...sectionAnim}>
            <h1 className="text-3xl md:text-5xl font-bold italic gradient-text mb-6">
              Enterprise-Grade Security for Financial Intelligence
            </h1>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">
              Neurova combines cutting-edge AI capabilities with enterprise-grade
              security, ensuring your sensitive financial data remains protected
              while delivering powerful insights.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            {...sectionAnim}
            className="text-2xl md:text-3xl font-bold italic gradient-text text-center mb-12"
          >
            Uncompromising Security at Every Layer
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {layers.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card rounded-xl p-6"
              >
                <h3 className="text-sm font-bold italic mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...sectionAnim} className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold italic gradient-text mb-3">
              Advanced Security Infrastructure
            </h2>
            <p className="text-sm text-gray-400 max-w-lg">
              Our comprehensive security framework protects your data with
              multiple layers of enterprise-grade security measures.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {infra.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card rounded-xl p-6"
              >
                <h3 className="text-sm font-bold italic mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...sectionAnim}>
              <h2 className="text-2xl font-bold italic mb-3">
                State-of-the-Art Cloud Security
              </h2>
              <p className="text-sm text-gray-400">
                Built on secure cloud infrastructure with comprehensive security
                controls, continuous monitoring, and industry-leading compliance
                certifications.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="aspect-video rounded-xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/5 grid-bg flex items-center justify-center overflow-hidden"
            >
              <CloudSecuritySvg />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="aspect-video rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/5 grid-bg order-2 md:order-1 flex items-center justify-center overflow-hidden"
            >
              <DataProtectionSvg />
            </motion.div>
            <motion.div {...sectionAnim} className="order-1 md:order-2">
              <h2 className="text-2xl font-bold italic mb-3">
                Advanced Data Protection
              </h2>
              <p className="text-sm text-gray-400">
                Our multi-layered security approach ensures your data is
                protected at every point - from encryption at rest to secure
                transmission protocols and rigorous access controls.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <motion.h2
            {...sectionAnim}
            className="text-2xl font-bold italic gradient-text text-center mb-12"
          >
            Security FAQ
          </motion.h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <h3 className="text-sm font-bold mb-1 flex items-center gap-2">
                  <span className="text-xs text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                    {item.num}
                  </span>
                  {item.q}
                </h3>
                <p className="text-xs text-gray-500 pl-8">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
