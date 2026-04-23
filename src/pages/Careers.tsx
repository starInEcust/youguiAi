import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  CAREERS_EMAIL,
  CAREERS_MAILTO,
  createCareerApplicationMailto,
} from "../constants/contact";

interface Position {
  num: string;
  title: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

interface Department {
  name: string;
  positions: Position[];
}

const departments: Department[] = [
  {
    name: "Sales",
    positions: [
      {
        num: "01",
        title: "Sales Development Representative",
        description:
          "Drive new business opportunities and build relationships with potential clients in the financial services sector. You'll be the first point of contact for our future customers, understanding their needs and demonstrating how our AI solutions can transform their business.",
        responsibilities: [
          "Identify and qualify new business opportunities through outbound prospecting",
          "Conduct initial discovery calls with potential clients",
          "Work closely with Account Executives to drive deals forward",
          "Maintain accurate records in our CRM system",
          "Research target accounts and create personalized outreach strategies",
          "Meet or exceed monthly qualified opportunity quotas",
          "Participate in sales team meetings and strategy sessions",
        ],
        requirements: [
          "1-3 years of sales experience in B2B SaaS",
          "Strong communication and interpersonal skills",
          "Experience with financial services is a plus",
          "Proficiency with CRM systems (preferably Salesforce)",
          "Self-motivated with a proven track record of exceeding targets",
          "Bachelor's degree in Business, Finance, or related field",
          "Ability to quickly learn and articulate complex technical concepts",
        ],
      },
      {
        num: "02",
        title: "Account Executive",
        description:
          "Lead the sales process for our AI-powered financial analysis. You'll work with senior decision-makers at financial institutions to understand their needs and demonstrate the value of our solutions.",
        responsibilities: [
          "Drive the full sales cycle from prospect to close",
          "Build and maintain relationships with key stakeholders",
          "Develop and execute account strategies",
          "Collaborate with product and engineering teams",
          "Create and present compelling business cases",
          "Meet or exceed quarterly sales targets",
          "Mentor junior sales team members",
        ],
        requirements: [
          "5+ years of enterprise sales experience in fintech or SaaS",
          "Proven track record of closing deals $250K+",
          "Deep understanding of financial services industry",
          "Strong presentation and negotiation skills",
          "Experience with complex, multi-stakeholder sales",
          "Bachelor's degree required, MBA preferred",
          "Willingness to travel up to 30%",
        ],
      },
    ],
  },
  {
    name: "Engineering",
    positions: [
      {
        num: "01",
        title: "Staff Engineer - Distributed Systems",
        description:
          "Lead the design and implementation of our distributed systems architecture. You'll be working on complex problems at scale, building systems that process massive amounts of financial data in real-time.",
        responsibilities: [
          "Design and implement scalable distributed systems",
          "Lead technical decisions for critical infrastructure",
          "Mentor other engineers and promote best practices",
          "Drive system architecture discussions and decisions",
          "Collaborate with product teams on technical feasibility",
          "Implement high-performance data processing pipelines",
          "Ensure system reliability and scalability",
        ],
        requirements: [
          "4+ years of software engineering experience",
          "Deep expertise in distributed systems",
          "Experience with cloud platforms (AWS/Azure)",
          "Strong knowledge of Kubernetes and containerization",
          "Proficiency in Python, Go, or similar languages",
          "Experience with real-time data processing",
          "Track record of leading complex technical projects",
        ],
      },
      {
        num: "02",
        title: "Software Engineer - Full-Stack",
        description:
          "Build and maintain our web applications and internal tools. You'll work on both frontend and backend systems, creating intuitive interfaces for complex financial data analysis.",
        responsibilities: [
          "Develop responsive web applications using React",
          "Build and maintain RESTful APIs",
          "Implement data visualization features",
          "Write clean, maintainable, and tested code",
          "Collaborate with UX designers and product managers",
          "Optimize application performance",
          "Participate in code reviews and technical discussions",
        ],
        requirements: [
          "4+ years of full-stack development experience",
          "Expertise in React, TypeScript, and Node.js",
          "Experience with SQL and NoSQL databases",
          "Knowledge of modern web technologies and best practices",
          "Understanding of CI/CD pipelines",
          "Strong problem-solving abilities",
          "Experience with financial data is a plus",
        ],
      },
      {
        num: "03",
        title: "Software Engineer - FrontEnd - AI/ML Platform",
        description:
          "Build and maintain our web applications and internal tools. You'll work on frontend system, creating intuitive interfaces for complex financial data analysis.",
        responsibilities: [
          "Design and develop scalable frontend applications using React.js, TypeScript, and modern web technologies",
          "Build and maintain responsive user interfaces that deliver complex financial data in an intuitive way",
          "Collaborate with AI/ML teams to integrate natural language processing capabilities",
          "Implement real-time data visualization and interactive analytics features",
          "Write clean, maintainable code with comprehensive test coverage",
          "Participate in code reviews and contribute to technical architecture decisions",
          "Optimize application performance and ensure cross-browser compatibility",
        ],
        requirements: [
          "3+ years of experience in frontend development with React.js",
          "Strong proficiency in TypeScript, JavaScript, HTML5, and CSS3",
          "Experience with modern frontend tools and frameworks (Redux, Webpack, etc.)",
          "Familiarity with RESTful APIs and GraphQL",
          "Understanding of responsive design principles and cross-browser compatibility",
          "Experience with version control systems (Git)",
          "Strong problem-solving skills and attention to detail",
        ],
      },
      {
        num: "04",
        title: "Software Engineer - Backend Infrastructure",
        description:
          "Design and implement high-performance backend services that power our AI Solutions. Focus on building scalable APIs and efficient data processing systems.",
        responsibilities: [
          "Design and implement scalable backend infrastructure for high-performance data querying",
          "Build and maintain robust data pipelines for processing and storing financial data",
          "Develop efficient APIs for data retrieval and real-time data streaming",
          "Design and optimize database schemas for complex financial data structures",
          "Implement caching strategies and query optimization for fast data access",
          "Ensure system security, data privacy, and regulatory compliance",
          "Monitor system performance and implement scalability solutions",
          "Collaborate with AI teams to support model deployment and data access needs",
        ],
        requirements: [
          "4+ years of experience in backend development (Python, Java, or similar)",
          "Strong experience with database systems (PostgreSQL, MongoDB)",
          "Proficiency in API development and microservices architecture",
          "Experience with caching systems (Redis, Memcached)",
          "Knowledge of cloud infrastructure (AWS, GCP, or Azure)",
          "Strong understanding of system design and performance optimization",
          "Experience with containerization (Docker) and orchestration (Kubernetes)",
          "Solid knowledge of security best practices and data protection",
        ],
      },
      {
        num: "05",
        title: "Data Engineer - Financial Intelligence Systems",
        description:
          "Build and maintain our data infrastructure, ensuring efficient processing and storage of financial data from various sources.",
        responsibilities: [
          "Design and implement data pipelines for processing financial data from multiple sources",
          "Build and maintain ETL processes for structured and unstructured financial data",
          "Develop data quality monitoring systems and validation frameworks",
          "Create and optimize data models for efficient storage and retrieval",
          "Implement data transformation and normalization processes",
          "Ensure data consistency and integrity across different systems",
          "Develop automated data cleaning and enrichment processes",
          "Collaborate with backend teams to optimize data access patterns",
        ],
        requirements: [
          "3+ years of experience in data engineering",
          "Strong SQL skills and experience with database optimization",
          "Proficiency in Python and data processing libraries (Pandas, NumPy)",
          "Experience with ETL tools and frameworks",
          "Knowledge of data warehousing concepts and best practices",
          "Experience with cloud data services (AWS Redshift, GCP BigQuery, or similar)",
          "Strong understanding of data modeling and schema design",
          "Experience with data quality assurance and validation methods",
        ],
      },
      {
        num: "06",
        title: "Machine Learning Engineer - Financial Intelligence Systems",
        description:
          "Design, implement, and manage our financial intelligence systems. You'll be responsible for building and optimizing our AI models for financial data analysis.",
        responsibilities: [
          "Design and optimize RAG systems for financial domain knowledge retrieval",
          "Fine-tune and deploy LLMs for financial analysis and insights generation",
          "Develop and maintain AI agents for automated financial analysis",
          "Optimize prompt engineering for financial use cases",
          "Build evaluation frameworks for LLM response quality",
          "Implement efficient vector embeddings for financial documents",
          "Monitor and optimize model performance and resource usage",
          "Collaborate with backend team on model deployment and scaling",
        ],
        requirements: [
          "2+ years of experience in machine learning engineering",
          "Strong expertise in LLMs and RAG architectures",
          "Experience with vector databases (Pinecone, Weaviate)",
          "Proficiency in prompt engineering and LLM fine-tuning",
          "Knowledge of ML deployment tools (KubeFlow, MLflow)",
          "Experience with GPU optimization and resource management",
          "Strong Python and ML framework skills (PyTorch, Transformers)",
          "Understanding of containerization and orchestration",
        ],
      },
      {
        num: "07",
        title: "Data Scientist - Financial Intelligence",
        description:
          "Analyze financial data to extract insights and patterns. You'll be working on building and optimizing our AI models for financial data analysis.",
        responsibilities: [
          "Develop metrics and evaluation frameworks for LLM responses",
          "Design experiments to improve AI agent performance",
          "Analyze user interaction patterns and model behavior",
          "Create anomaly detection systems for financial data",
          "Build statistical models for response quality assessment",
          "Develop automated testing frameworks for AI responses",
          "Collaborate with ML team on training data quality",
          "Generate insights for model performance improvement",
        ],
        requirements: [
          "3+ years of experience in data science",
          "Strong background in statistical analysis and hypothesis testing",
          "Experience with A/B testing and experimental design",
          "Proficiency in Python and data analysis libraries",
          "Knowledge of NLP evaluation metrics",
          "Experience with time series analysis",
          "Strong skills in data visualization",
          "Understanding of financial domain metrics",
        ],
      },
      {
        num: "08",
        title: "Business Analyst",
        description:
          "Utilize statistical software and programming languages (e.g., Python, R) to manipulate and analyze datasets",
        responsibilities: [
          "Conduct comprehensive industry and market research to identify trends, opportunities, and potential threats in the financial markets.",
          "Perform competitive analysis to benchmark our strategies against those of other leading quantitative hedge funds and fintech companies.",
          "Gather and analyze business intelligence from various sources to support strategic decision-making.",
          "Collaborate with data scientists and quantitative analysts to interpret data findings and translate them into actionable business recommendations.",
          "Utilize statistical software and programming languages (e.g., Python, R) to manipulate and analyze datasets",
        ],
        requirements: [
          "2+ years of relevant experience.",
          "Background in finance, economics, data science, or a related field.",
          "Strong analytical and quantitative skills.",
          "Proficiency in statistical software and programming languages (e.g., Python, R) is a plus.",
          "Excellent research and report-writing skills.",
          "Strong organizational and multitasking abilities.",
          "Effective communication and interpersonal skills.",
        ],
      },
      {
        num: "09",
        title: "Data Analyst",
        description:
          "Analyze and process large-scale datasets to extract valuable business insights. You'll be responsible for building data visualization solutions and supporting AI-driven decision systems.",
        responsibilities: [
          "Support in the processing, cleaning, and analytical examination of large datasets.",
          "Offer insights that aid in the development of investment strategies.",
          "Work on database management tasks and employ SQL for data manipulation.",
          "Interpret complex financial datasets to generate actionable insights.",
        ],
        requirements: [
          "2+ years of relevant experience.",
          "Pursuing a degree in Data Science, Statistics, Economics, or related field.",
          "Strong analytical skills and proficiency in data and statistical analysis skills, especially in Python.",
          "Experience with database management and SQL is preferred.",
          "Ability to interpret complex financial datasets and provide actionable insights.",
          "Detail-oriented with excellent communication skills.",
        ],
      },
      {
        num: "10",
        title: "Financial Analyst",
        description:
          "Analyze complex financial data to support investment strategies and business decisions. You'll develop financial models and forecasts while identifying market trends and opportunities for our AI-powered platform.",
        responsibilities: [
          "Assist with financial modeling, investment analysis, and portfolio management.",
          "Analyze financial statements, market trends, and economic indicators.",
          "Use Excel and financial databases for data analysis and valuation.",
          "Develop a deep understanding of financial markets and investment strategies.",
        ],
        requirements: [
          "3+ years of relevant experience.",
          "Currently pursuing a degree in Finance, Accounting, Economics, Business or related field.",
          "Strong analytical and quantitative skills, especially in Excel, preferably with Python experience.",
          "Familiarity with financial modeling and valuation techniques.",
          "Proficiency in Excel and public financial databases, including Morningstar, Yahoo Finance, Quandl, etc.",
          "Keen interest in financial markets and investment strategies.",
        ],
      },
      {
        num: "11",
        title: "Quantitative Researcher",
        description:
          "Develop sophisticated mathematical models and algorithms to identify trading opportunities and optimize investment strategies. You'll apply advanced statistical methods to analyze financial markets and enhance our AI-driven trading systems.",
        responsibilities: [
          "Work alongside the research team to innovate and refine research algorithms and financial models.",
          "Engage in data analysis to uncover patterns, trends, and signals for strategic quantitative investments.",
          "Apply statistical analysis, linear algebra, and calculus in financial modeling.",
          "Utilize Python for programming and algorithm development.",
        ],
        requirements: [
          "Currently pursuing or recently graduated with a degree in Financial Engineering, Mathematics, Physics, Computer Science, or a related field.",
          "Strong quantitative skills, with a solid foundation in statistical analysis, linear algebra, and calculus.",
          "Proficiency in programming languages such as Python, R, or MATLAB, especially in Python.",
          "Excellent analytical and problem-solving skills.",
          "Ability to work independently and in a team environment.",
          "Previous experience in a quantitative role or research position is a plus.",
        ],
      },
      {
        num: "12",
        title: "Risk Analyst",
        description:
          "Identify, assess, and mitigate financial and operational risks across our investment strategies and platforms. You'll develop robust risk management frameworks and use advanced analytics to ensure portfolio resilience in various market conditions.",
        responsibilities: [
          "Identify, analyze, and mitigate various financial risks using quantitative techniques.",
          "Evaluate market, leverage, credit, and operational risks associated with underlying analysis companies.",
          "Apply statistical analysis and modeling to risk management practices.",
          "Work towards understanding and implementing risk management principles and tools.",
        ],
        requirements: [
          "Pursuing a degree in Risk Management, Finance, Economics, Mathematics, or a related field.",
          "Strong quantitative and analytical skills, past experience with Python is a plus.",
          "Knowledge of risk management principles and financial instruments.",
          "Proficiency in statistical analysis and modeling.",
          "Excellent attention to detail and problem-solving abilities.",
        ],
      },
    ],
  },
  {
    name: "Ops",
    positions: [
      {
        num: "01",
        title: "Strategic Engagement Manager",
        description:
          "Drive strategic initiatives and manage key client relationships to ensure successful adoption and expansion of our AI Products.",
        responsibilities: [
          "Develop and execute client engagement strategies",
          "Lead complex implementation projects",
          "Build strong relationships with key stakeholders",
          "Monitor and report on client success metrics",
          "Identify expansion opportunities",
          "Coordinate cross-functional team efforts",
          "Drive client satisfaction and retention",
        ],
        requirements: [
          "5+ years in strategic consulting or client success",
          "Experience in financial services industry",
          "Strong project management skills",
          "Excellent communication abilities",
          "Data analysis and presentation skills",
          "MBA or relevant advanced degree preferred",
          "Knowledge of AI/ML concepts",
        ],
      },
      {
        num: "02",
        title: "Generalist",
        description:
          "Support multiple aspects of our operations, from client success to internal processes, helping scale our rapidly growing organization.",
        responsibilities: [
          "Manage diverse operational projects",
          "Support client onboarding and success",
          "Analyze and optimize internal processes",
          "Create and maintain documentation",
          "Coordinate with various departments",
          "Handle data analysis and reporting",
          "Support strategic initiatives",
        ],
        requirements: [
          "3+ years of operations experience",
          "Strong analytical and problem-solving skills",
          "Excellent organizational abilities",
          "Proficiency with data analysis tools",
          "Experience in fast-paced environments",
          "Strong written and verbal communication",
          "Adaptability and quick learning ability",
        ],
      },
      {
        num: "03",
        title: "Financial AI Strategist",
        description:
          "Bridge the gap between AI technology and financial applications, helping shape our product strategy and client solutions.",
        responsibilities: [
          "Develop AI implementation strategies",
          "Analyze financial use cases for AI",
          "Create solution frameworks",
          "Consult with clients on AI adoption",
          "Guide product development priorities",
          "Lead AI education initiatives",
          "Evaluate emerging AI technologies",
        ],
        requirements: [
          "Advanced degree in Finance or Computer Science",
          "5+ years in financial services",
          "Strong understanding of AI/ML concepts",
          "Experience with financial analysis",
          "Excellent presentation skills",
          "Strategic thinking and problem solving",
          "Leadership experience",
        ],
      },
    ],
  },
  {
    name: "Product",
    positions: [
      {
        num: "01",
        title: "Product Manager",
        description:
          "Lead the development of our AI-powered financial analysis products, from conception to launch and beyond.",
        responsibilities: [
          "Define product vision and strategy",
          "Gather and prioritize requirements",
          "Work with engineering on implementation",
          "Conduct market and user research",
          "Create product roadmaps",
          "Analyze product metrics",
          "Coordinate cross-functional teams",
        ],
        requirements: [
          "5+ years of product management experience",
          "Background in fintech or financial services",
          "Strong technical understanding",
          "Experience with AI/ML products",
          "Excellent analytical skills",
          "Strong leadership abilities",
          "MBA or relevant advanced degree preferred",
        ],
      },
      {
        num: "02",
        title: "Product Designer",
        description:
          "Create intuitive and powerful user experiences for complex financial data analysis tools.",
        responsibilities: [
          "Design user interfaces and experiences",
          "Create wireframes and prototypes",
          "Conduct user research and testing",
          "Develop design systems",
          "Collaborate with engineering teams",
          "Ensure design consistency",
          "Present design solutions",
        ],
        requirements: [
          "4+ years of product design experience",
          "Strong portfolio of complex applications",
          "Experience with financial products",
          "Expertise in modern design tools",
          "Knowledge of design systems",
          "Understanding of user research",
          "Strong communication skills",
        ],
      },
    ],
  },
];

const sectionAnim = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.7 },
};

interface SelectedPosition extends Position {
  department: string;
}

export default function CareersPage() {
  const [selectedPosition, setSelectedPosition] =
    useState<SelectedPosition | null>(null);

  useEffect(() => {
    if (!selectedPosition) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPosition(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPosition]);

  return (
    <>
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
                what&apos;s possible and want to accelerate your career
                trajectory exponentially.
              </p>
              <div className="card rounded-lg p-4 inline-block">
                <span className="text-xs text-gray-500">
                  Send your resume to
                </span>
                <br />
                <a
                  href={CAREERS_MAILTO}
                  className="text-sm text-blue-400 hover:underline"
                >
                  {CAREERS_EMAIL}
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
                    {dept.positions.map((pos) => {
                      const isActive =
                        selectedPosition?.department === dept.name &&
                        selectedPosition?.num === pos.num;

                      return (
                        <button
                          key={`${dept.name}-${pos.num}`}
                          type="button"
                          onClick={() =>
                            setSelectedPosition({
                              ...pos,
                              department: dept.name,
                            })
                          }
                          className={`group flex w-full items-center gap-4 rounded-lg border p-3 text-left transition-all ${
                            isActive
                              ? "border-purple-500/40 bg-white/[0.04]"
                              : "border-transparent hover:border-white/8 hover:bg-white/[0.02]"
                          }`}
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
                        </button>
                      );
                    })}
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

      <AnimatePresence>
        {selectedPosition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm"
            onClick={() => setSelectedPosition(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="position-dialog-title"
              onClick={(event) => event.stopPropagation()}
              className="card relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#050505] shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
            >
              <div className="border-b border-white/8 px-6 py-5 md:px-8">
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                      <span>{selectedPosition.department}</span>
                      <span className="h-1 w-1 rounded-full bg-gray-700" />
                      <span>Position {selectedPosition.num}</span>
                    </div>
                    <h3
                      id="position-dialog-title"
                      className="text-2xl font-bold italic text-white md:text-3xl"
                    >
                      {selectedPosition.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedPosition(null)}
                    aria-label="Close position details"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-colors hover:border-white/20 hover:text-white"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="max-h-[calc(85vh-104px)] overflow-y-auto px-6 py-6 md:px-8">
                <p className="max-w-2xl text-sm leading-7 text-gray-300">
                  {selectedPosition.description}
                </p>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <section className="card rounded-2xl p-5">
                    <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-purple-300">
                      Responsibilities
                    </h4>
                    <ul className="space-y-3 text-sm leading-6 text-gray-300">
                      {selectedPosition.responsibilities.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="card rounded-2xl p-5">
                    <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-purple-300">
                      Requirements
                    </h4>
                    <ul className="space-y-3 text-sm leading-6 text-gray-300">
                      {selectedPosition.requirements.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <div className="mt-8 flex flex-col gap-3 border-t border-white/8 pt-6 sm:flex-row">
                  <a
                    href={createCareerApplicationMailto(selectedPosition.title)}
                    className="inline-flex items-center justify-center rounded-full border border-purple-500/40 bg-purple-500/10 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-purple-400/60 hover:bg-purple-500/20"
                  >
                    Apply for this role
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedPosition(null)}
                    className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 transition-colors hover:border-white/20 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
