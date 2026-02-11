import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useMousePosition } from "../hooks/useMousePosition";

const HERO_PHRASES = [
  "10x speed. 10x clarity. 10x craft.",
  "AI accelerated. Engineer led. Built to last.",
  "Fast output. Clear systems. Real craft.",
  "Ship quickly. Keep it maintainable.",
  "Prototype fast. Engineer for production.",
  "Automation for pace. Architecture for peace.",
  "Velocity with stability.",
  "AI for speed. Human judgment for structure.",
  "Smart delivery. Solid foundations.",
  "Rapid builds. Clean boundaries. Reliable releases.",
  "Less chaos. More coherence. Faster iteration.",
];

interface HeroProps {
  isDark: boolean;
}

export default function Hero({ isDark }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const mouse = useMousePosition();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityOut = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const spotX = mouse.x;
  const spotY = mouse.y;

  // Typewriter state
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const phrase = HERO_PHRASES[phraseIdx];

    if (!isDeleting && charCount === phrase.length) {
      // Pause at full phrase before deleting
      return setTimeout(() => setIsDeleting(true), 1500);
    }

    if (isDeleting && charCount === 0) {
      // Move to next phrase
      setIsDeleting(false);
      setPhraseIdx((i) => (i + 1) % HERO_PHRASES.length);
      return undefined;
    }

    const speed = isDeleting ? 30 : 22;
    return setTimeout(
      () => setCharCount((c) => c + (isDeleting ? -1 : 1)),
      speed
    );
  }, [charCount, isDeleting, phraseIdx]);

  useEffect(() => {
    const id = tick();
    return () => { if (id) clearTimeout(id); };
  }, [tick]);

  return (
    <section
      ref={ref}
      id="hero"
      className={`relative min-h-screen flex items-center ${
        isDark ? "bg-surface-dark" : "bg-surface-light"
      }`}
    >
      {/* Background container — clips the hero image overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Spinning orb constellation */}
        <img
          src="/spin.svg"
          alt=""
          className="absolute md:hidden w-44 h-44 sm:w-56 sm:h-56"
          style={{
            right: "-3%",
            top: "9%",
          }}
        />
        <img
          src="/spin.svg"
          alt=""
          className="absolute hidden md:block w-170 h-170"
          style={{
            right: "7%",
            top: "2%",
          }}
        />

        {/* Right banner image — offset top-right on mobile, extends beyond on desktop */}
        <img
          src="/right-banner.png"
          alt=""
          className="absolute md:hidden w-48 sm:w-56 h-auto rounded-2xl"
          style={{
            right: "-21%",
            top: "8%",
            transform: "rotate(-43deg)",
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: "url(/right-banner.png)",
            backgroundPosition: "calc(113% + 4vw) calc(101% + 32.5vh)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "56%",
          }}
        />

        {/* Dot grid */}
        <div
          className={`absolute inset-0 dot-grid ${
            isDark ? "text-white" : "text-black"
          }`}
        />

        {/* Gradient orbs */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20 hidden md:block"
            style={{
              background:
                "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <motion.div
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 30, -20, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-15 hidden md:block"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </motion.div>
      </div>

      {/* Cursor spotlight — desktop only (no hover cursor on touch) */}
      <div
        className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${spotX}px ${spotY}px, rgba(59,130,246,0.04), transparent 60%)`,
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity: opacityOut }}
        className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 w-full pt-37.5 md:pt-24 pb-16"
      >
        <div className="max-w-2xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              <span className={`relative inline-block text-xs sm:text-sm lg:text-base font-medium ${isDark ? "text-white/30" : "text-gray-900/30"}`}>
                AI Engineer
                <div className={`absolute left-0 right-0 top-1/2 h-0.5 ${isDark ? "bg-white" : "bg-black"}`} />
              </span>
              {" "}
              <span className={`relative inline-block text-xs sm:text-sm lg:text-base font-medium ${isDark ? "text-white/30" : "text-gray-900/30"}`}>
                Vibe Coder
                <div className={`absolute left-0 right-0 top-1/2 h-0.5 ${isDark ? "bg-white" : "bg-black"}`} />
              </span>
              {" "}
              <span className={`relative inline-block text-xs sm:text-sm lg:text-base font-medium ${isDark ? "text-white/30" : "text-gray-900/30"}`}>
                Guesswork
                <div className={`absolute left-0 right-0 top-1/2 h-0.5 ${isDark ? "bg-white" : "bg-black"}`} />
              </span>
              <br />
              <span>AI-Augmented</span>
              <br />
              <span>Software Engineer</span>
              <span className="text-electric">.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h2 className="font-display text-xs sm:text-lg lg:text-xl font-medium leading-snug flex items-center gap-2">
              <img
                src="/loading.svg"
                alt=""
                className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 shrink-0"
              />
              <span className="gradient-text">
                {HERO_PHRASES[phraseIdx].slice(0, charCount)}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.25,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="inline-block w-0.5 h-[1em] bg-electric ml-0.5 align-middle"
                />
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`text-sm sm:text-lg lg:text-xl leading-relaxed max-w-xl ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            I started engineering in the pre-AI era, where debugging meant
            understanding, not guessing. Now I use AI like a power tool: to
            accelerate output without outsourcing thinking.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-sm font-medium tracking-wide gradient-text"
          >
            AI-driven delivery, human-grade architecture.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <motion.a
              href="/files/Resume.pdf"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-semibold bg-electric text-white shadow-xl shadow-electric/25 hover:shadow-electric/40 transition-shadow duration-300"
            >
              View Resume
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.a>
            <motion.button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-semibold border cursor-pointer transition-colors duration-300 ${
                isDark
                  ? "border-white/10 text-white/80 hover:border-electric/30 hover:bg-white/5"
                  : "border-black/10 text-gray-700 hover:border-electric/30 hover:bg-electric/5"
              }`}
            >
              <Mail size={16} />
              Let's Build Something Real
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`w-5 h-8 rounded-full border-2 flex items-start justify-center p-1 ${
            isDark ? "border-white/20" : "border-black/20"
          }`}
        >
          <motion.div
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-electric"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
