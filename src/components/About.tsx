import { useRef } from "react";
import { motion } from "framer-motion";

interface AboutProps {
  isDark: boolean;
}

const TAGS = ["AI", "Cloud", "DX", "Performance", "Motion", "Design", "Scale"];

const IMAGES = ["/img1.webp", "/img2.webp", "/img3.webp", "/img4.webp"];

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
    ref.current.style.transform = `perspective(700px) rotateY(${
      x * 8
    }deg) rotateX(${-y * 8}deg) scale(1.015)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform =
      "perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative overflow-hidden rounded-md border transition-[transform,box-shadow,border-color] duration-500 cursor-pointer ${
          isDark
            ? "border-dark-hairline hover:border-dark-line"
            : "border-hairline hover:border-line"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src={src}
          alt={`Rustine Dave at work — frame ${index + 1}`}
          loading="lazy"
          className="w-full aspect-square object-cover grayscale contrast-[1.05]"
        />
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            isDark
              ? "bg-gradient-to-t from-carbon/30 to-transparent"
              : "bg-gradient-to-t from-paper/20 to-transparent"
          }`}
        />
      </div>
    </motion.div>
  );
}

export default function About({ isDark }: AboutProps) {
  const inkText = isDark ? "text-dark-ink" : "text-black";
  const bodyText = isDark ? "text-dark-muted" : "text-muted";

  return (
    <section
      id="about"
      className={`relative py-28 md:py-36 ${isDark ? "bg-carbon" : "bg-paper"}`}
    >
      <div className="section-divider" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20 max-w-2xl"
        >
          <h2
            className={`font-display font-semibold tracking-[-0.015em] leading-[1.05] ${inkText}`}
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            The Dave Standard<span className={bodyText}>.</span>
          </h2>
          <p
            className={`mt-5 text-lg font-medium ${
              isDark ? "text-dark-ink/80" : "text-ink"
            }`}
          >
            Software that moves fast and makes sense.
          </p>
          <p className={`mt-3 text-base leading-relaxed ${bodyText}`}>
            I'm pro-AI, and just as pro-understanding. I don't ship "looks good
            in the demo" code. I ship systems that survive week 12.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-start">
          {/* Image grid */}
          <div className="grid grid-cols-2 gap-4">
            {IMAGES.map((src, i) => (
              <TiltImage key={i} src={src} index={i} isDark={isDark} />
            ))}
          </div>

          {/* Copy */}
          <div className="space-y-6">
            {[
              "Hey, I'm Rustine. Full-stack engineer, product-minded builder, and someone who still enjoys solving the hard parts.",
              "I've been doing this since before AI was the default copilot, when you earned progress by learning the system, not prompting it. That foundation never left. It's why I can move quickly without turning code into a mystery novel.",
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08 + i * 0.06 }}
                className={`text-lg leading-relaxed ${bodyText}`}
              >
                {para}
              </motion.p>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-lg leading-relaxed ${bodyText}`}
            >
              Today, I build{" "}
              <span className={`font-semibold ${inkText}`}>
                AI-driven experiences with real engineering underneath
              </span>
              :
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className={`text-lg leading-relaxed space-y-3 ${bodyText}`}
            >
              {[
                "AI features that feel magical because the plumbing is solid",
                "Workflow automation that reduces busywork without creating future chaos",
                "Systems that scale because they were designed to, not because we hoped",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className={`mt-2.5 w-3 h-px shrink-0 ${
                      isDark ? "bg-dark-line" : "bg-line"
                    }`}
                  />
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className={`text-lg leading-relaxed font-medium ${inkText}`}
            >
              AI makes shipping faster. Understanding makes shipping sustainable.
              <br />
              That combination is the whole point.
            </motion.p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {TAGS.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className={`px-3.5 py-1.5 font-mono text-xs tracking-[0.02em] rounded-full border transition-colors duration-300 ${
                    isDark
                      ? "border-dark-hairline text-dark-muted hover:border-dark-ink hover:text-dark-ink"
                      : "border-hairline text-muted hover:border-black hover:text-black"
                  }`}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
