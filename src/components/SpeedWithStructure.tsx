import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, Shield, Eye } from "lucide-react";

interface SpeedWithStructureProps {
  isDark: boolean;
}

const FEATURES = [
  {
    icon: Zap,
    title: "Speed",
    desc: "AI-compressed delivery without shortcuts on architecture.",
  },
  {
    icon: Shield,
    title: "Structure",
    desc: "Intentional design that survives beyond the first sprint.",
  },
  {
    icon: Eye,
    title: "Accountability",
    desc: "Observable systems with clear ownership and traceability.",
  },
];

export default function SpeedWithStructure({ isDark }: SpeedWithStructureProps) {
  const slabRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: slabRef,
    offset: ["start end", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [-36, 36]);

  return (
    <section className={`relative py-16 md:py-24 ${isDark ? "bg-carbon" : "bg-paper"}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={slabRef}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`relative rounded-xl overflow-hidden p-10 md:p-16 border ${
            isDark
              ? "bg-dark-surface border-dark-line"
              : "bg-black border-black"
          }`}
        >
          {/* Blueprint grid inside the slab — parallax on scroll */}
          <motion.div
            style={{ y: gridY }}
            className="absolute -top-20 -bottom-20 inset-x-0 blueprint-grid text-white pointer-events-none"
          />

          <div className="relative text-center max-w-3xl mx-auto">
            <span className="font-mono text-[0.7rem] tracking-[0.04em] uppercase text-white/40">
              Speed with structure
            </span>
            <h2 className="mt-4 font-display font-semibold tracking-[-0.015em] leading-[1.08] text-white"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.75rem)" }}
            >
              Fast prototypes are easy.
              <br />
              Sustainable systems are engineered.
            </h2>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/65 max-w-2xl mx-auto">
              When code is produced without structure, teams pay later: fragile
              behavior, slow changes, unclear ownership. I use AI to compress
              time on repetitive work, while keeping design intentional and
              observable.
            </p>
          </div>

          {/* Feature tiles */}
          <div className="relative mt-12 grid md:grid-cols-3 gap-4">
            {FEATURES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="p-6 rounded-lg bg-white/[0.04] border border-white/12 text-left transition-colors duration-300 hover:border-white/30"
              >
                <div className="w-9 h-9 rounded-md border border-white/15 flex items-center justify-center mb-4">
                  <item.icon size={17} className="text-white" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="relative mt-12 text-center">
            <p className="font-mono text-sm text-white/70">
              Output with accountability.
            </p>
            <motion.button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md text-sm font-semibold bg-white text-black hover:bg-white/90 transition-colors duration-300 cursor-pointer group"
            >
              Let's build it right
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
