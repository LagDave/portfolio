import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useScrollSpy } from "../hooks/useScrollSpy";

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const NAV_LINKS = [
  { id: "about", label: "Standard" },
  { id: "technologies", label: "Stack" },
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
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-500 ${
        scrolled
          ? isDark
            ? "bg-carbon/85 backdrop-blur-md border-dark-hairline"
            : "bg-paper/85 backdrop-blur-md border-hairline shadow-[0_1px_2px_rgba(10,10,10,0.04),0_8px_24px_rgba(10,10,10,0.05)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Wordmark */}
          <motion.button
            onClick={() => scrollTo("hero")}
            className="flex items-baseline gap-2 cursor-pointer"
            whileHover={{ x: 1 }}
            whileTap={{ scale: 0.98 }}
          >
            <span
              className={`font-display text-lg font-semibold tracking-tight ${
                isDark ? "text-dark-ink" : "text-black"
              }`}
            >
              Rustine Dave
            </span>
            <span
              className={`font-mono text-[0.625rem] tracking-tight ${
                isDark ? "text-dark-muted" : "text-muted"
              }`}
            >
              /eng
            </span>
          </motion.button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer ${
                  active === link.id
                    ? isDark
                      ? "text-dark-ink"
                      : "text-black"
                    : isDark
                      ? "text-dark-muted hover:text-dark-ink"
                      : "text-muted hover:text-black"
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className={`absolute bottom-1 left-4 right-4 h-px ${
                      isDark ? "bg-dark-ink" : "bg-black"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Toggle color theme"
              className={`relative w-9 h-9 rounded-md border flex items-center justify-center cursor-pointer transition-colors ${
                isDark
                  ? "border-dark-line text-dark-muted hover:text-dark-ink hover:border-dark-ink"
                  : "border-line text-muted hover:text-black hover:border-black"
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
                    <Sun size={15} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={15} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.a
              href="/files/Resume.pdf"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={`hidden md:inline-flex items-center px-5 py-2 rounded-md text-sm font-semibold transition-colors duration-300 ${
                isDark
                  ? "bg-dark-ink text-carbon hover:bg-white"
                  : "bg-black text-paper hover:bg-ink"
              }`}
            >
              Resume
            </motion.a>

            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
              className={`md:hidden w-9 h-9 rounded-md border flex items-center justify-center cursor-pointer ${
                isDark ? "border-dark-line text-dark-ink" : "border-line text-black"
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
                ? "bg-carbon/95 border-dark-hairline"
                : "bg-paper/95 border-hairline"
            } backdrop-blur-md`}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-left py-2.5 px-3 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    active === link.id
                      ? isDark
                        ? "text-dark-ink bg-dark-surface"
                        : "text-black bg-surface"
                      : isDark
                        ? "text-dark-muted hover:text-dark-ink"
                        : "text-muted hover:text-black"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="/files/Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className={`mt-2 text-center py-2.5 px-5 rounded-md text-sm font-semibold ${
                  isDark ? "bg-dark-ink text-carbon" : "bg-black text-paper"
                }`}
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
