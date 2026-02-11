import { useRef } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "../hooks/useMousePosition";

interface AboutProps {
  isDark: boolean;
}

const TAGS = ["AI", "Cloud", "DX", "Performance", "Motion", "Design", "Scale"];

const IMAGES = [
  "/img1.webp",
  "/img2.webp",
  "/img3.webp",
  "/img4.webp",
];

function TiltImage({
  src,
  index,
  isDark,
}: {
  src: string;
  index: number;
  isDark: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(600px) rotateY(${
      x * 10
    }deg) rotateX(${-y * 10}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform =
      "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src={src}
          alt={`About ${index + 1}`}
          loading="lazy"
          className="w-full aspect-square object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            isDark
              ? "shadow-[inset_0_0_60px_rgba(59,130,246,0.15)]"
              : "shadow-[inset_0_0_60px_rgba(59,130,246,0.08)]"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

function FloatingTags({ isDark }: { isDark: boolean }) {
  const mouse = useMousePosition();

  return (
    <div className="flex flex-wrap gap-3 mt-8">
      {TAGS.map((tag, i) => {
        const offsetX = Math.sin((mouse.x * 0.002 + i) * 0.5) * 3;
        const offsetY = Math.cos((mouse.y * 0.002 + i) * 0.7) * 3;
        return (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.08 }}
            animate={{ x: offsetX, y: offsetY }}
            className={`px-4 py-1.5 text-xs font-medium rounded-full border transition-colors duration-300 ${
              isDark
                ? "border-white/10 text-white/50 bg-white/[0.03] hover:border-electric/30 hover:text-electric"
                : "border-black/8 text-gray-400 bg-black/[0.02] hover:border-electric/30 hover:text-electric"
            }`}
          >
            {tag}
          </motion.span>
        );
      })}
    </div>
  );
}

export default function About({ isDark }: AboutProps) {
  const ref = useRef<HTMLElement>(null);
  return (
    <section
      ref={ref}
      id="about"
      className={`relative py-32 ${
        isDark ? "bg-surface-dark" : "bg-surface-light"
      }`}
    >
      <div className="section-divider" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            The Dave Standard
            <span className="text-electric">.</span>
          </h2>
          <p
            className={`mt-4 text-lg font-medium ${
              isDark ? "text-white/60" : "text-gray-600"
            }`}
          >
            Software that moves fast and makes sense.
          </p>
          <p
            className={`mt-2 text-base ${
              isDark ? "text-white/40" : "text-gray-400"
            }`}
          >
            I'm pro-AI, and just as pro-understanding.
            I don't ship "looks good in the demo" code. I ship systems that survive week 12.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left – Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            {IMAGES.map((src, i) => (
              <TiltImage key={i} src={src} index={i} isDark={isDark} />
            ))}
          </div>

          {/* Right – About Copy */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-lg leading-relaxed ${
                isDark ? "text-white/60" : "text-gray-600"
              }`}
            >
              Hey, I'm Rustine. Full-stack engineer, product-minded builder, and someone who still enjoys solving the hard parts.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className={`text-lg leading-relaxed ${
                isDark ? "text-white/60" : "text-gray-600"
              }`}
            >
              I've been doing this since before AI was the default copilot, when you earned progress by learning the system, not prompting it. That foundation never left. It's why I can move quickly without turning code into a mystery novel.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-lg leading-relaxed ${
                isDark ? "text-white/60" : "text-gray-600"
              }`}
            >
              Today, I build{" "}
              <span className="gradient-text font-semibold">
                AI-driven experiences with real engineering underneath
              </span>
              :
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className={`text-lg leading-relaxed space-y-3 ${
                isDark ? "text-white/60" : "text-gray-600"
              }`}
            >
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-electric flex-shrink-0" />
                AI features that feel magical because the plumbing is solid
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-electric flex-shrink-0" />
                Workflow automation that reduces busywork without creating future chaos
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-electric flex-shrink-0" />
                Systems that scale because they were designed to, not because we hoped
              </li>
            </motion.ul>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-lg leading-relaxed font-medium ${
                isDark ? "text-white/70" : "text-gray-700"
              }`}
            >
              AI makes shipping faster. Understanding makes shipping sustainable.
              <br />
              That combination is the whole point.
            </motion.p>

            {/* Floating tags */}
            <FloatingTags isDark={isDark} />
          </div>
        </div>
      </div>
    </section>
  );
}
