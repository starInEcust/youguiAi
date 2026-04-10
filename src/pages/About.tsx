import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const values = [
  {
    title: "Innovation First",
    desc: "Pushing boundaries in AI-driven financial analysis",
  },
  {
    title: "Client Success",
    desc: "Empowering our clients with transformative technology",
  },
  {
    title: "Excellence",
    desc: "Delivering unparalleled quality in everything we do",
  },
];

const sectionAnim = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.7 },
};

export default function AboutPage() {
  return (
    <main className="pt-24">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 section-gradient" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div {...sectionAnim}>
            <h1 className="text-3xl md:text-5xl font-bold italic gradient-text mb-6">
              Pioneering the Future of Financial Intelligence
            </h1>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
              At Neurova, we&apos;re revolutionizing how financial professionals
              interact with data. Our cutting-edge AI Agents transforms complex
              financial analysis into actionable insights, empowering
              professionals to make smarter decisions faster.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div {...sectionAnim}>
            <h2 className="text-2xl md:text-3xl font-bold italic mb-4">
              Our Vision & Mission
            </h2>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">
              We envision a future where financial analysis is seamlessly
              augmented by artificial intelligence, enabling professionals to
              focus on strategic decision-making rather than routine data
              processing.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card rounded-xl p-6"
              >
                <h3 className="text-sm font-bold italic mb-2">{v.title}</h3>
                <p className="text-xs text-gray-500">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div {...sectionAnim}>
            <h2 className="text-2xl md:text-3xl font-bold italic mb-2">
              Join Our Journey
            </h2>
            <h3 className="text-lg gradient-text font-bold italic mb-4">
              Shape the Future of Financial Technology
            </h3>
            <p className="text-sm text-gray-400 max-w-xl mx-auto mb-8">
              We&apos;re building a team of exceptional individuals who are
              passionate about revolutionizing the financial industry through
              innovative technology.
            </p>
            <Link
              to="/careers"
              className="inline-block text-sm px-6 py-3 rounded-lg border border-white/20 hover:bg-white/5 transition-all font-medium"
            >
              Explore Opportunities
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
