import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Magnetic } from "./Magnetic";

// Code-split the WebGL scene: hero text paints first, Three.js streams in after.
const BlueprintScene = lazy(() => import("./BlueprintScene"));

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

const STRUCK = ["AI Engineer", "Vibe Coder", "Guesswork"];

interface HeroProps {
  isDark: boolean;
}

export default function Hero({ isDark }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const canvasWrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacityOut = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Typewriter
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = HERO_PHRASES[phraseIdx];
    const atFull = !isDeleting && charCount === phrase.length;
    const atEmpty = isDeleting && charCount === 0;
    const delay = atFull ? 1600 : isDeleting ? 28 : 24;

    const id = setTimeout(() => {
      if (atFull) {
        setIsDeleting(true);
      } else if (atEmpty) {
        setIsDeleting(false);
        setPhraseIdx((i) => (i + 1) % HERO_PHRASES.length);
      } else {
        setCharCount((c) => c + (isDeleting ? -1 : 1));
      }
    }, delay);

    return () => clearTimeout(id);
  }, [charCount, isDeleting, phraseIdx]);

  // GSAP: headline line reveal + scene scroll-parallax
  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return;

      gsap.from(".hero-line-inner", {
        yPercent: 120,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.12,
        delay: 0.15,
      });

      if (canvasWrap.current) {
        gsap.to(canvasWrap.current, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: ref },
  );

  const inkText = isDark ? "text-dark-ink" : "text-black";
  const mutedText = isDark ? "text-dark-muted" : "text-muted";

  return (
    <section
      ref={ref}
      id="hero"
      className={`relative min-h-screen flex items-center overflow-hidden ${
        isDark ? "bg-carbon" : "bg-paper"
      }`}
    >
      {/* Background field */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute inset-0 blueprint-grid ${
            isDark ? "text-white" : "text-black"
          }`}
        />
        <div ref={canvasWrap} className="absolute inset-0 opacity-40 md:opacity-100">
          <Suspense fallback={null}>
            <BlueprintScene isDark={isDark} />
          </Suspense>
        </div>
        {/* Edge fades so text stays legible over the scene */}
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-r from-carbon via-carbon/40 to-transparent"
              : "bg-gradient-to-r from-paper via-paper/40 to-transparent"
          }`}
        />
      </div>

      {/* Corner coordinate label — signature, used once */}
      <div
        className={`absolute top-24 right-6 lg:right-10 hidden sm:flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.04em] uppercase ${mutedText}`}
      >
        <span className="w-5 h-px bg-current opacity-40" />
        Engineering Blueprint · v2
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity: opacityOut }}
        className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 w-full pt-32 md:pt-24 pb-20"
      >
        <div className="max-w-3xl">
          {/* Struck eyebrow */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-7">
            {STRUCK.map((w) => (
              <span
                key={w}
                className={`relative font-mono text-[0.7rem] sm:text-xs tracking-[0.04em] uppercase ${mutedText}`}
              >
                {w}
                <span className="absolute left-0 right-0 top-1/2 h-px bg-current" />
              </span>
            ))}
          </div>

          {/* Headline */}
          <h1
            className={`font-display font-semibold tracking-[-0.02em] leading-[0.98] ${inkText}`}
            style={{ fontSize: "clamp(2.75rem, 7vw, 5rem)" }}
          >
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="hero-line-inner block">AI-Augmented</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="hero-line-inner block">
                Software Engineer
                <span className={mutedText}>.</span>
              </span>
            </span>
          </h1>

          {/* Mono typewriter line */}
          <div className="mt-7 flex items-center gap-3 min-h-[1.75rem]">
            <span
              className={`font-mono text-[0.7rem] tracking-[0.04em] uppercase ${mutedText} shrink-0`}
            >
              {">"}
            </span>
            <span className={`font-mono text-sm sm:text-base ${inkText}`}>
              {HERO_PHRASES[phraseIdx].slice(0, charCount)}
              <motion.span
                aria-hidden
                className={`inline-block w-[2px] h-[1.05em] ml-[1px] -mb-[2px] align-middle ${
                  isDark ? "bg-dark-ink" : "bg-black"
                }`}
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </span>
          </div>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`mt-7 text-base sm:text-lg leading-relaxed max-w-xl ${
              isDark ? "text-dark-muted" : "text-muted"
            }`}
          >
            I started engineering in the pre-AI era, where debugging meant
            understanding, not guessing. Now I use AI like a power tool: to
            accelerate output without outsourcing thinking.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-3 pt-9"
          >
            <Magnetic className="inline-flex">
              <motion.a
                href="/files/Resume.pdf"
                target="_blank"
                rel="noreferrer"
                whileTap={{ scale: 0.97 }}
                className={`group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md text-sm font-semibold transition-colors duration-300 ${
                  isDark
                    ? "bg-dark-ink text-carbon hover:bg-white"
                    : "bg-black text-paper hover:bg-ink"
                }`}
              >
                View Resume
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.a>
            </Magnetic>
            <Magnetic className="inline-flex">
              <motion.button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                whileTap={{ scale: 0.97 }}
                className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md text-sm font-semibold border cursor-pointer transition-colors duration-300 ${
                  isDark
                    ? "border-dark-line text-dark-ink hover:bg-dark-surface hover:border-dark-ink"
                    : "border-line text-ink hover:bg-surface hover:border-black"
                }`}
              >
                <Mail size={16} />
                Let's Build Something Real
              </motion.button>
            </Magnetic>
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
          className={`w-5 h-8 rounded-full border flex items-start justify-center p-1 ${
            isDark ? "border-dark-line" : "border-line"
          }`}
        >
          <div className={`w-1 h-2 rounded-full ${isDark ? "bg-dark-muted" : "bg-muted"}`} />
        </motion.div>
      </motion.div>
    </section>
  );
}
