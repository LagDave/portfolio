import {
  useRef,
  useState,
  useEffect,
  lazy,
  Suspense,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type PanInfo,
} from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Mail,
  Sparkles,
} from "lucide-react";
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

type DeckSlide = "photo" | "projects";

const DECK_SLIDES: DeckSlide[] = ["photo", "projects"];

const LAB_PROJECTS = [
  {
    id: "kuyadb",
    name: "KuyaDB",
    description: "Database tools for durable AI workflows.",
    image: "/lab/kuyadb.png",
    className: "left-[14%] top-[14%]",
    float: { y: [0, -8, 0], rotate: [-5, 3, -5], scale: [1, 1.04, 1] },
    transition: { duration: 7.5, repeat: Infinity, ease: "easeInOut" as const },
  },
  {
    id: "deveasy",
    name: "Deveasy",
    description: "Fast app scaffolds for everyday builders.",
    image: "/lab/deveasy.png",
    className: "right-[12%] bottom-[11%]",
    float: { y: [0, 8, 0], rotate: [5, -3, 5], scale: [1.03, 1, 1.03] },
    transition: { duration: 8.4, repeat: Infinity, ease: "easeInOut" as const },
  },
];

function LomoPhotoSlide() {
  return (
    <div className="relative h-full overflow-hidden rounded-[1.35rem] border border-white/15 bg-black">
      <img
        src="/lab/person-lomo.jpg"
        alt="Rustine Dave leaning on a car in a black and white photo"
        className="h-full w-full object-cover object-[54%_34%]"
      />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_54%_34%,transparent_0%,rgba(0,0,0,0.08)_34%,rgba(0,0,0,0.78)_100%)]" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_42%,rgba(255,255,255,0.06)_72%,transparent)] mix-blend-screen" />
      <div aria-hidden className="absolute inset-x-6 top-6 h-px bg-white/20" />
      <div aria-hidden className="absolute inset-x-6 bottom-6 h-px bg-white/14" />
    </div>
  );
}

function LabProjectsSlide() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.04em] text-white/78 backdrop-blur-sm">
          <FlaskConical size={14} />
          Dave&apos;s Lab
        </span>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/[0.07] text-white/80">
          <Sparkles size={15} />
        </span>
      </div>

      <p className="mt-5 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-white/48">
        Projects?
      </p>
      <h2 className="mt-2 max-w-[17rem] font-display text-[1.5rem] font-semibold leading-[0.96] text-white sm:text-[1.5rem]">
        See what I&apos;m working on
      </h2>
      <p className="mt-3 max-w-[19rem] text-sm leading-6 text-white/64">
        Side-built apps Dave uses to supercharge his workflows and share with
        the community. Built with sustainability in mind.
      </p>

      <div className="relative mt-auto h-40 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.045] sm:h-44">
        <div aria-hidden className="absolute inset-0 text-white dot-grid opacity-70" />
        {LAB_PROJECTS.map((project) => {
          const isActive = hoveredProject === project.id;
          const isDimmed = hoveredProject !== null && !isActive;

          return (
            <motion.button
              key={project.id}
              type="button"
              aria-label={`${project.name}: ${project.description}`}
              onClick={(event) => {
                event.preventDefault();
                setHoveredProject((current) =>
                  current === project.id ? null : project.id,
                );
              }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              onFocus={() => setHoveredProject(project.id)}
              onBlur={() => setHoveredProject(null)}
              animate={isActive ? { y: 0, rotate: 0, scale: 1 } : project.float}
              transition={
                isActive
                  ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                  : project.transition
              }
              className={`group/logo absolute cursor-pointer overflow-hidden rounded-2xl border border-white/12 text-left shadow-[0_20px_50px_rgba(255,255,255,0.14)] outline-none backdrop-blur-xl transition-[background-color,filter,height,opacity,width] duration-500 focus-visible:ring-2 focus-visible:ring-white/80 ${project.className} ${
                isActive ? "h-28 w-[16rem] sm:w-[16.5rem]" : "h-24 w-24 sm:h-28 sm:w-28"
              } ${
                isActive ? "z-40" : isDimmed ? "z-10" : "z-20"
              } ${
                isDimmed ? "opacity-20 blur-[1px]" : "opacity-95"
              } ${isActive ? "bg-black/92" : "bg-black/82"}`}
            >
              <span
                aria-hidden
                className={`absolute inset-0 rounded-2xl bg-black/90 backdrop-blur-2xl transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
              <span
                aria-hidden
                style={{ backgroundImage: `url('${project.image}')` }}
                className={`absolute z-10 bg-black bg-cover bg-center shadow-[0_18px_40px_rgba(0,0,0,0.34)] transition-all duration-500 ${
                  isActive
                    ? "left-3 top-1/2 h-16 w-16 -translate-y-1/2 rounded-xl opacity-70"
                    : "inset-0 rounded-2xl opacity-100"
                }`}
              />
              <span
                className={`absolute bottom-3 left-[5.6rem] right-3 top-3 z-20 rounded-xl border border-white/14 bg-black px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_34px_rgba(0,0,0,0.42)] transition-opacity duration-300 ${
                  isActive
                    ? "opacity-100"
                    : "opacity-0 group-hover/logo:opacity-100 group-focus-visible/logo:opacity-100"
                }`}
              >
                <span className="block font-mono text-[0.58rem] font-semibold uppercase tracking-[0.04em] text-white">
                  {project.name}
                </span>
                <span className="mt-1.5 block text-[0.68rem] leading-snug text-white/72 [text-wrap:balance]">
                  {project.description}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function DaveLabFeatureCard({ isDark }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState<DeckSlide>("photo");
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);
  const shineOpacityRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 260, damping: 26 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 260, damping: 26 });
  const shineOpacity = useSpring(shineOpacityRaw, { stiffness: 320, damping: 34 });
  const shine = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.36) 16%, rgba(255,255,255,0.08) 34%, transparent 58%)`;

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    rotateXRaw.set((0.5 - y) * 14);
    rotateYRaw.set((x - 0.5) * 14);
    shineX.set(x * 100);
    shineY.set(y * 100);
    shineOpacityRaw.set(0.46);
  };

  const resetTilt = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    shineOpacityRaw.set(0);
  };

  const showNextSlide = () => {
    setActiveSlide((slide) => (slide === "photo" ? "projects" : "photo"));
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 42 || Math.abs(info.velocity.x) > 450) {
      showNextSlide();
    }
  };

  return (
    <article
      aria-label="Dave's feature deck"
      onPointerEnter={handlePointerMove}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      className="group relative isolate h-[29rem] w-full max-w-[22.5rem] overflow-visible [perspective:900px] sm:h-[29.5rem]"
    >
      {DECK_SLIDES.map((slide) => {
        const isActive = slide === activeSlide;
        const tuckDirection = activeSlide === "photo" ? 1 : -1;

        return (
          <motion.div
            key={slide}
            aria-hidden={!isActive}
            style={
              isActive
                ? {
                    rotateX,
                    rotateY,
                    transformPerspective: 900,
                    transformStyle: "preserve-3d",
                  }
                : { transformPerspective: 900, transformStyle: "preserve-3d" }
            }
            animate={
              isActive
                ? {
                    x: 0,
                    y: 0,
                    rotateZ: 0,
                    scale: 1,
                    opacity: 1,
                    zIndex: 20,
                    filter: "blur(0px)",
                  }
                : {
                    x: tuckDirection * 34,
                    y: 18,
                    rotateZ: tuckDirection * 2,
                    scale: 0.94,
                    opacity: 0.9,
                    zIndex: 5,
                    filter: "blur(0px)",
                  }
            }
            drag={isActive ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragDirectionLock
            dragElastic={0.18}
            onDragEnd={isActive ? handleDragEnd : undefined}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 overflow-hidden rounded-3xl border p-4 shadow-2xl transition-[border-color,box-shadow] duration-300 sm:p-5 ${
              isActive ? "pointer-events-auto" : "pointer-events-none"
            } ${
              isDark
                ? "border-white/15 bg-dark-surface text-dark-ink shadow-black/45"
                : "border-black/15 bg-black text-paper shadow-black/20"
            }`}
          >
            <div aria-hidden className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_38%,rgba(255,255,255,0.08)_72%,transparent)] opacity-70" />
              <div className="absolute inset-0 text-white blueprint-grid opacity-80" />
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/15" />
              <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full border border-white/10" />
            </div>
            <div className="relative z-20 h-full" style={{ transform: isActive ? "translateZ(42px)" : "translateZ(8px)" }}>
              {slide === "photo" ? <LomoPhotoSlide /> : <LabProjectsSlide />}
            </div>
            {isActive && (
              <motion.div
                aria-hidden
                style={{ background: shine, opacity: shineOpacity }}
                className="pointer-events-none absolute inset-0 z-30 rounded-3xl mix-blend-screen"
              />
            )}
          </motion.div>
        );
      })}

      <div className="pointer-events-none absolute inset-y-0 -left-3 -right-3 z-40 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
        <button
          type="button"
          aria-label={activeSlide === "photo" ? "Show projects card" : "Show photo card"}
          onClick={showNextSlide}
          className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/72 text-white shadow-[0_14px_32px_rgba(0,0,0,0.38)] backdrop-blur-md transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          aria-label={activeSlide === "photo" ? "Show projects card" : "Show photo card"}
          onClick={showNextSlide}
          className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/72 text-white shadow-[0_14px_32px_rgba(0,0,0,0.38)] backdrop-blur-md transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </article>
  );
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
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 xl:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.72fr)] xl:gap-20">
          <div className="min-w-0 max-w-3xl">
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
              style={{ fontSize: "clamp(2.75rem, 5.4vw, 5rem)" }}
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="hero-line-inner block whitespace-nowrap">
                  AI-Augmented
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="hero-line-inner block whitespace-nowrap">
                  Software Engineer
                  <span className={mutedText}>.</span>
                </span>
              </span>
            </h1>

            {/* Mono typewriter line */}
            <div className="mt-7 flex min-h-[1.75rem] max-w-xl items-center gap-3 overflow-hidden">
              <span
                className={`font-mono text-[0.7rem] tracking-[0.04em] uppercase ${mutedText} shrink-0`}
              >
                {">"}
              </span>
              <span className={`min-w-0 truncate font-mono text-sm sm:text-base ${inkText}`}>
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
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
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
              transition={{
                duration: 0.8,
                delay: 0.62,
                ease: [0.16, 1, 0.3, 1],
              }}
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

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-[22.5rem] lg:mx-0 lg:max-w-[20rem] lg:justify-self-end xl:max-w-[25rem]"
          >
            <DaveLabFeatureCard isDark={isDark} />
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
