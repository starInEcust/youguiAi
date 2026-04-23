import { Link } from "react-router-dom";

function LinkedinIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const footerCols = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#platform-features" },
      { label: "Solutions", href: "/?section=solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Security", href: "/security" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col md:flex-row gap-12 md:gap-8 items-start">
          <div className="md:w-1/4">
            <div className="mb-4">
              <Link to="/" className="inline-block max-w-[200px] md:max-w-[240px]">
                <img
                  src="/Neurova-02.png"
                  alt="Neurova"
                  className="w-full h-auto object-contain"
                />
              </Link>
            </div>
          </div>

          <div className="md:w-1/4">
            <p className="text-sm text-gray-500">
              Empowering financial institutions with advanced AI solutions
            </p>
          </div>

          <div className="flex gap-12 md:gap-16 md:ml-auto">
            {footerCols.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Neurova. All rights reserved.
          </p>
          <a
            href="https://www.linkedin.com/company/neurova-ai-com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
          >
            <LinkedinIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
