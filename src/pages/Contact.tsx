import { motion } from "framer-motion";
import type { FormEvent } from "react";
import { INFO_EMAIL, INFO_MAILTO, createInfoMailto } from "../constants/contact";

const sectionAnim = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.7 },
};

export default function ContactPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const company = formData.get("company")?.toString().trim() ?? "";
    const message = formData.get("message")?.toString().trim() ?? "";

    if (!name || !email || !message) {
      return;
    }

    window.location.href = createInfoMailto({
      name,
      email,
      company,
      message,
    });
  }

  return (
    <main className="pt-24">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 section-gradient" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div {...sectionAnim}>
            <h1 className="text-3xl md:text-5xl font-bold italic gradient-text mb-6">
              Let&apos;s Build the Future Together
            </h1>
            <p className="text-sm text-gray-400">
              Ready to transform your financial operations with AI? Neurova is
              here to help you get started.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div {...sectionAnim}>
              <h2 className="text-lg font-bold gradient-text italic mb-2">
                Contact
              </h2>
              <a
                href={INFO_MAILTO}
                className="text-sm text-blue-400 hover:underline"
              >
                {INFO_EMAIL}
              </a>

              <h2 className="text-lg font-bold gradient-text italic mt-8 mb-3">
                Global Offices
              </h2>
              <div className="card rounded-lg p-4">
                <h3 className="text-sm font-bold mb-1">New York</h3>
                <p className="text-xs text-gray-500">
                  30 Wall Street FL 8, New York, NY 10005
                </p>
                <p className="text-xs text-gray-500">United States</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500/50 transition-colors placeholder:text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    autoComplete="email"
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500/50 transition-colors placeholder:text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">
                    Company
                  </label>
                  <input
                    name="company"
                    type="text"
                    placeholder="Your company"
                    autoComplete="organization"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500/50 transition-colors placeholder:text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="How can we help you?"
                    rows={4}
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500/50 transition-colors placeholder:text-gray-600 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  Send message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
