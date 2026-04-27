import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { SALES_MAILTO } from "../constants/contact";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Security", href: "/security" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="/Neurova-03.png"
            alt="Neurova"
            className="h-16 w-auto object-contain md:h-20"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href={SALES_MAILTO}
            className="text-sm px-5 py-2 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
          >
            Request Demo
          </a>
        </div>

        <button
          className="md:hidden text-gray-400"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={SALES_MAILTO}
              className="text-center px-5 py-2 rounded-full border border-white/20"
              onClick={() => setMobileOpen(false)}
            >
              Request Demo
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
