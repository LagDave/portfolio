import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useScrollSpy } from "../hooks/useScrollSpy";

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "technologies", label: "Technologies" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useScrollSpy();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? isDark
            ? "bg-surface-dark/80 glass border-white/5 shadow-lg shadow-black/20"
            : "bg-white/80 glass border-black/5 shadow-lg shadow-black/5"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo("hero")}
            className="font-display text-lg font-bold tracking-tight cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className={isDark ? "text-white" : "text-gray-900"}>
              Rustine Dave
            </span>
            <span className="text-electric">.</span>
          </motion.button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer rounded-lg ${
                  active === link.id
                    ? "text-electric"
                    : isDark
                      ? "text-white/60 hover:text-white"
                      : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-electric to-indigo rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`relative w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
                isDark
                  ? "bg-white/5 hover:bg-white/10 text-white/70"
                  : "bg-black/5 hover:bg-black/10 text-gray-600"
              }`}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={16} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Resume button */}
            <motion.a
              href="/files/Resume.pdf"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-electric text-white shadow-lg shadow-electric/25 hover:shadow-electric/40 transition-shadow duration-300"
            >
              Resume
            </motion.a>

            {/* Mobile menu toggle */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer ${
                isDark ? "text-white/70" : "text-gray-600"
              }`}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden overflow-hidden border-t ${
              isDark
                ? "bg-surface-dark/95 border-white/5"
                : "bg-white/95 border-black/5"
            } glass`}
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    active === link.id
                      ? "text-electric bg-electric/10"
                      : isDark
                        ? "text-white/60 hover:text-white"
                        : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="/files/Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="mt-2 text-center py-2.5 px-5 rounded-full text-sm font-semibold bg-electric text-white"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
