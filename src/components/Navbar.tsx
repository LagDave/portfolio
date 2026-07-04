import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, ArrowUpRight, File } from "lucide-react";
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

  // Lock body scroll while the full-screen menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 ${mobileOpen ? "z-[70]" : "z-50"} border-b transition-colors duration-500 ${
          scrolled && !mobileOpen
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
              <span className={`font-display text-lg font-semibold tracking-tight ${isDark ? "text-dark-ink" : "text-black"}`}>
                Rustine Dave
              </span>
              <span className={`font-mono text-[0.625rem] tracking-tight ${isDark ? "text-dark-muted" : "text-muted"}`}>
                /ai-augmented-swe
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
                      ? isDark ? "text-dark-ink" : "text-black"
                      : isDark ? "text-dark-muted hover:text-dark-ink" : "text-muted hover:text-black"
                  }`}
                >
                  {link.label}
                  {active === link.id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className={`absolute bottom-1 left-4 right-4 h-px ${isDark ? "bg-dark-ink" : "bg-black"}`}
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
                  isDark ? "border-dark-line text-dark-muted hover:text-dark-ink hover:border-dark-ink" : "border-line text-muted hover:text-black hover:border-black"
                }`}
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Sun size={15} />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
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
                  isDark ? "bg-dark-ink text-carbon hover:bg-white" : "bg-black text-paper hover:bg-ink"
                }`}
              >
                <File size={15} className="mr-2"/>
                Resume
              </motion.a>

              <button
                onClick={() => setMobileOpen((o) => !o)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className={`md:hidden relative z-[70] w-9 h-9 rounded-md border flex items-center justify-center cursor-pointer transition-colors ${
                  isDark ? "border-dark-line text-dark-ink" : "border-line text-black"
                }`}
              >
                <span className="relative block w-[18px] h-4">
                  <motion.span
                    aria-hidden
                    className={`absolute left-0 right-0 h-[1.5px] rounded-full ${isDark ? "bg-dark-ink" : "bg-black"}`}
                    style={{ top: "calc(50% - 0.75px)" }}
                    initial={false}
                    animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 0 : -3.5 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.span
                    aria-hidden
                    className={`absolute left-0 right-0 h-[1.5px] rounded-full ${isDark ? "bg-dark-ink" : "bg-black"}`}
                    style={{ top: "calc(50% - 0.75px)" }}
                    initial={false}
                    animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? 0 : 3.5 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 z-[60] md:hidden ${isDark ? "bg-carbon" : "bg-paper"}`}
          >
            <div className={`absolute inset-0 blueprint-grid pointer-events-none ${isDark ? "text-white" : "text-black"}`} />

            {/* spacer — the fixed nav bar (wordmark + morphing close button) sits on top */}
            <div className="h-16" />

            {/* links */}
            <nav className="relative px-6 mt-10 flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`group flex items-center gap-4 py-5 border-t ${isDark ? "border-dark-hairline" : "border-hairline"} ${
                    i === NAV_LINKS.length - 1 ? (isDark ? "border-b border-dark-hairline" : "border-b border-hairline") : ""
                  }`}
                >
                  <span className={`font-mono text-xs ${isDark ? "text-dark-muted" : "text-muted"}`}>0{i + 1}</span>
                  <span className={`font-display text-4xl font-semibold tracking-[-0.01em] ${active === link.id ? (isDark ? "text-dark-ink" : "text-black") : (isDark ? "text-dark-ink/80" : "text-ink")}`}>
                    {link.label}
                  </span>
                  <ArrowUpRight
                    size={22}
                    className={`ml-auto -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${isDark ? "text-dark-ink" : "text-black"}`}
                  />
                </motion.button>
              ))}
            </nav>

            {/* bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.46, duration: 0.5 }}
              className="absolute bottom-0 inset-x-0 px-6 pb-10 space-y-5"
            >
              <a
                href="/files/Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-center gap-2.5 w-full py-4 rounded-md text-sm font-semibold ${isDark ? "bg-dark-ink text-carbon" : "bg-black text-paper"}`}
              >
                View Resume
                <ArrowUpRight size={16} />
              </a>
              <div className="flex items-center justify-between">
                <button
                  onClick={toggleTheme}
                  className={`flex items-center gap-2 font-mono text-xs uppercase tracking-[0.04em] ${isDark ? "text-dark-muted" : "text-muted"}`}
                >
                  {isDark ? <Sun size={14} /> : <Moon size={14} />}
                  {isDark ? "Light" : "Dark"}
                </button>
                <span className={`font-mono text-[0.65rem] tracking-[0.04em] uppercase ${isDark ? "text-dark-muted" : "text-muted"}`}>
                  Speed × Structure
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
