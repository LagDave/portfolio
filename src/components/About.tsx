import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { NodeGraph } from "./NodeGraph";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface AboutProps {
  isDark: boolean;
}

const PLATES = [
  { src: "/img1.webp", label: "Build" },
  { src: "/img2.webp", label: "Ship" },
  { src: "/img3.webp", label: "Scale" },
  { src: "/img4.webp", label: "Maintain" },
];

const PRINCIPLES = [
  { n: "01", label: "Magical AI", desc: "AI features that feel magical because the plumbing is solid." },
  { n: "02", label: "Clean Automation", desc: "Workflow automation that reduces busywork without creating future chaos." },
  { n: "03", label: "Designed Scale", desc: "Systems that scale because they were designed to, not because we hoped." },
];

const CAPABILITIES = ["FE", "BE", "Infrastructure", "Performance", "Design"];

function Plate({ plate, isDark }: { plate: (typeof PLATES)[number]; isDark: boolean }) {
  const [tapped, setTapped] = useState(false);
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setTapped((t) => !t)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setTapped((t) => !t);
        }
      }}
      className={`plate-reveal group relative overflow-hidden rounded-lg border cursor-pointer transition-[border-color] duration-500 ${
        isDark ? "border-dark-hairline hover:border-dark-line" : "border-hairline hover:border-line"
      }`}
    >
      <img
        src={plate.src}
        alt={`Rustine Dave at work — ${plate.label}`}
        loading="lazy"
        className="w-full aspect-[4/5] object-cover grayscale contrast-[1.05] transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? "from-carbon/55" : "from-black/40"} via-transparent to-transparent opacity-60`} />
      <div
        className={`absolute inset-x-3 bottom-3 flex items-center justify-between font-mono text-[0.62rem] tracking-[0.06em] uppercase text-white transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 ${
          tapped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
        }`}
      >
        <span>{plate.label}</span>
        <span className="w-7 h-px bg-white/60" />
      </div>
    </div>
  );
}

export default function About({ isDark }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const inkText = isDark ? "text-dark-ink" : "text-black";
  const bodyText = isDark ? "text-dark-muted" : "text-muted";
  const lineText = isDark ? "text-dark-line" : "text-line";

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".plate-reveal", {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.05,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gallery-grid", start: "top 80%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="about" className={`relative py-28 md:py-36 ${isDark ? "bg-carbon" : "bg-paper"}`}>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* polygonic accent — bigger than the footer's */}
        <div className={`pointer-events-none absolute -top-6 right-2 lg:right-6 hidden lg:block w-[480px] xl:w-[580px] z-0 ${isDark ? "text-dark-muted" : "text-muted"}`}>
          <NodeGraph variant="cluster" className="w-full h-auto" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mb-14 md:mb-20 max-w-3xl"
        >
          <div className={`flex items-center gap-3 mb-5 font-mono text-[0.7rem] tracking-[0.04em] uppercase ${bodyText}`}>
            <span>Fig. 01</span>
            <span className={`h-px dotted-x ${lineText}`} style={{ width: "100px" }} />
            <span>The Operating Standard</span>
          </div>
          <h2
            className={`font-display font-semibold tracking-[-0.015em] leading-[1.04] ${inkText}`}
            style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}
          >
            The Dave Standard<span className={bodyText}>.</span>
          </h2>
          <p className={`mt-5 text-lg font-medium ${isDark ? "text-dark-ink/80" : "text-ink"}`}>
            Software that moves fast and makes sense.
          </p>
          <p className={`mt-3 text-base leading-relaxed ${bodyText}`}>
            I'm pro-AI, and just as pro-understanding. I don't ship "looks good in the
            demo" code. I ship systems that survive week 12.
          </p>
        </motion.div>

        {/* Body */}
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="gallery-grid grid grid-cols-2 gap-4 sm:gap-5">
              {PLATES.map((plate) => (
                <Plate key={plate.label} plate={plate} isDark={isDark} />
              ))}
            </div>
          </div>

          {/* Specs */}
          <div className="lg:col-span-5 relative">
            {/* white wash so the graph dots don't fight the text */}
            <div
              className="pointer-events-none absolute -inset-x-6 -top-10 h-[460px] hidden lg:block"
              style={{
                background: isDark
                  ? "radial-gradient(75% 80% at 55% 32%, #0a0a0a 52%, rgba(10,10,10,0) 100%)"
                  : "radial-gradient(75% 80% at 55% 32%, #ffffff 52%, rgba(255,255,255,0) 100%)",
              }}
            />
            <div className="relative">
            <div className="space-y-5">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`text-lg leading-relaxed ${bodyText}`}
              >
                Hey, I'm Rustine. Full-stack engineer, product-minded builder, and someone
                who still enjoys solving the hard parts.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className={`text-lg leading-relaxed ${bodyText}`}
              >
                I've been doing this since before AI was the default copilot, when you earned
                progress by learning the system, not prompting it. That foundation never left.
              </motion.p>
            </div>

            {/* Principles */}
            <div className="mt-10">
              <div className={`mb-2 font-mono text-[0.7rem] tracking-[0.04em] uppercase ${bodyText}`}>
                // what I build
              </div>
              {PRINCIPLES.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`flex items-start gap-5 py-5 border-t ${isDark ? "border-dark-hairline" : "border-hairline"}`}
                >
                  <span className={`font-mono text-xs pt-1 ${bodyText}`}>{p.n}</span>
                  <div>
                    <h3 className={`font-display text-lg font-semibold ${inkText}`}>{p.label}</h3>
                    <p className={`mt-1.5 text-base leading-relaxed ${bodyText}`}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`mt-8 text-lg leading-relaxed font-medium ${inkText}`}
            >
              AI makes shipping faster. Understanding makes shipping sustainable. That
              combination is the whole point.
            </motion.p>

            {/* Capability tags */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              {CAPABILITIES.map((cap, i) => (
                <motion.span
                  key={cap}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{ y: -3 }}
                  className={`px-3.5 py-1.5 font-mono text-xs tracking-[0.02em] rounded-full border cursor-default transition-colors duration-300 ${
                    isDark
                      ? "border-dark-hairline text-dark-muted hover:border-dark-ink hover:text-dark-ink"
                      : "border-hairline text-muted hover:border-black hover:text-black"
                  }`}
                >
                  {cap}
                </motion.span>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
