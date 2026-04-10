import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Position {
  num: string;
  title: string;
}

interface Department {
  name: string;
  positions: Position[];
}

const departments: Department[] = [
  {
    name: "Sales",
    positions: [
      { num: "01", title: "Sales Development Representative" },
      { num: "02", title: "Account Executive" },
    ],
  },
  {
    name: "Engineering",
    positions: [
      { num: "01", title: "Staff Engineer - Distributed Systems" },
      { num: "02", title: "Software Engineer - Full-Stack" },
      { num: "03", title: "Software Engineer - FrontEnd - AI/ML Platform" },
      { num: "04", title: "Software Engineer - Backend Infrastructure" },
      { num: "05", title: "Data Engineer - Financial Intelligence Systems" },
      { num: "06", title: "Machine Learning Engineer - Financial Intelligence" },
      { num: "07", title: "Data Scientist - Financial Intelligence" },
      { num: "08", title: "Business Analyst" },
      { num: "09", title: "Data Analyst" },
      { num: "10", title: "Financial Analyst" },
      { num: "11", title: "Quantitative Researcher" },
      { num: "12", title: "Risk Analyst" },
    ],
  },
  {
    name: "Ops",
    positions: [
      { num: "01", title: "Strategic Engagement Manager" },
      { num: "02", title: "Generalist" },
      { num: "03", title: "Financial AI Strategist" },
    ],
  },
  {
    name: "Product",
    positions: [
      { num: "01", title: "Product Manager" },
      { num: "02", title: "Product Designer" },
    ],
  },
];

const sectionAnim = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.7 },
};

export default function CareersPage() {
  return (
    <main className="pt-24">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 section-gradient" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div {...sectionAnim}>
            <h1 className="text-3xl md:text-5xl font-bold italic gradient-text mb-6">
              Engineer the Evolution of Financial Intelligence
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div {...sectionAnim}>
            <h2 className="text-xl font-bold italic mb-4">
              Pioneer the Next Generation of Financial AI
            </h2>
            <p className="text-sm text-gray-400 mb-6 max-w-lg">
              If you&apos;re passionate about pushing the boundaries of
              what&apos;s possible and want to accelerate your career trajectory
              exponentially.
            </p>
            <div className="card rounded-lg p-4 inline-block">
              <span className="text-xs text-gray-500">Send your resume to</span>
              <br />
              <a
                href="mailto:career@neurovaai.com"
                className="text-sm text-blue-400 hover:underline"
              >
                career@neurovaai.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <motion.h2
            {...sectionAnim}
            className="text-2xl font-bold italic text-center mb-12"
          >
            Open Positions
          </motion.h2>

          <div className="space-y-12">
            {departments.map((dept) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-4">
                  {dept.name}
                </h3>
                <div className="space-y-2">
                  {dept.positions.map((pos) => (
                    <Link
                      key={`${dept.name}-${pos.num}`}
                      to="#"
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/[0.02] transition-colors group"
                    >
                      <span className="text-xs text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded shrink-0">
                        {pos.num}
                      </span>
                      <span className="text-sm font-medium flex-1">
                        {pos.title}
                      </span>
                      <span className="text-gray-600 group-hover:text-white transition-colors">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div {...sectionAnim}>
            <h2 className="text-2xl font-bold italic gradient-text mb-4">
              Ready to Make an Impact
            </h2>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">
              We&apos;re assembling a team of visionaries, innovators, and
              industry pioneers across engineering, product, and business
              domains. Whether your expertise aligns perfectly with our listed
              roles or you bring unique capabilities that could reshape our
              future - we want to hear from you.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
