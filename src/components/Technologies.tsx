import { motion } from "framer-motion";

interface TechnologiesProps {
  isDark: boolean;
}

interface TechItem {
  name: string;
  icon: string;
  description: string;
  size: "hero" | "large" | "medium" | "small";
}

const FEATURED_TECH: TechItem[] = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", description: "UI Architecture", size: "hero" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", description: "Type-Safe Code", size: "hero" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", description: "Backend APIs", size: "large" },
  { name: "AI / LLMs", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/claude.svg", description: "Claude · Gemini · GPT", size: "large" },
  { name: "GCP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", description: "Cloud Services", size: "medium" },
  { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", description: "Enterprise Cloud", size: "medium" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", description: "Cloud Infrastructure", size: "large" },
  { name: "n8n", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/n8n.svg", description: "Automation", size: "medium" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", description: "Realtime & Auth", size: "medium" },
  { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", description: "BaaS Platform", size: "medium" },
  { name: "WordPress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg", description: "CMS Solutions", size: "large" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", description: "Server-Side Logic", size: "medium" },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", description: "PHP Framework", size: "medium" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", description: "Relational Database", size: "medium" },
];

// Logos that are inherently single-color/dark — they have no color to reveal,
// so they stay ink (light) / white (dark) and never colorize.
const MONO = new Set(["Express", "AI / LLMs", "n8n", "AWS"]);

const sizeStyles: Record<TechItem["size"], string> = {
  hero: "p-7 md:p-9",
  large: "p-6 md:p-7",
  medium: "p-5 md:p-6",
  small: "p-4 md:p-5",
};
const iconSizes: Record<TechItem["size"], string> = {
  hero: "w-16 h-16 md:w-24 md:h-24",
  large: "w-12 h-12 md:w-16 md:h-16",
  medium: "w-11 h-11 md:w-12 md:h-12",
  small: "w-9 h-9 md:w-11 md:h-11",
};
const titleSizes: Record<TechItem["size"], string> = {
  hero: "text-2xl md:text-3xl",
  large: "text-lg md:text-xl",
  medium: "text-base md:text-lg",
  small: "text-sm md:text-base",
};

function iconClass(name: string, isDark: boolean) {
  const base = "w-full h-full object-contain transition-all duration-500";
  if (MONO.has(name)) {
    return `${base} opacity-70 group-hover:opacity-100 ${
      isDark ? "invert" : ""
    }`;
  }
  // Colorful logos: grey at rest, full color on hover.
  return `${base} grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100`;
}

function TechCard({
  tech,
  index,
  sizeClass,
  isDark,
}: {
  tech: TechItem;
  index: number;
  sizeClass: string;
  isDark: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className={`${sizeStyles[tech.size]} ${sizeClass} relative group cursor-default rounded-lg border overflow-hidden transition-[border-color,box-shadow] duration-500 ${
        isDark
          ? "bg-dark-surface border-dark-hairline hover:border-dark-line"
          : "bg-paper border-hairline hover:border-line hover:shadow-[0_1px_2px_rgba(10,10,10,0.05),0_10px_30px_rgba(10,10,10,0.07)]"
      }`}
    >
      <div className="relative z-10 h-full flex flex-col justify-between gap-4">
        <div className={`${iconSizes[tech.size]} flex items-center justify-start`}>
          <img src={tech.icon} alt={tech.name} className={iconClass(tech.name, isDark)} />
        </div>
        <div>
          <h3
            className={`font-display ${titleSizes[tech.size]} font-semibold tracking-[-0.01em] mb-1 ${
              isDark ? "text-dark-ink" : "text-black"
            }`}
          >
            {tech.name}
          </h3>
          <p
            className={`font-mono text-[0.7rem] tracking-[0.02em] ${
              isDark ? "text-dark-muted" : "text-muted"
            }`}
          >
            {tech.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function MobileTechItem({
  tech,
  index,
  isDark,
}: {
  tech: TechItem;
  index: number;
  isDark: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      viewport={{ once: true }}
      className={`group flex items-center gap-4 p-4 rounded-lg border ${
        isDark ? "bg-dark-surface border-dark-hairline" : "bg-paper border-hairline"
      }`}
    >
      <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center">
        <img src={tech.icon} alt={tech.name} className={iconClass(tech.name, isDark)} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`font-display text-base font-semibold ${isDark ? "text-dark-ink" : "text-black"}`}>
          {tech.name}
        </h3>
        <p className={`font-mono text-[0.7rem] truncate ${isDark ? "text-dark-muted" : "text-muted"}`}>
          {tech.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Technologies({ isDark }: TechnologiesProps) {
  const heroTech = FEATURED_TECH.filter((t) => t.size === "hero");
  const largeTech = FEATURED_TECH.filter((t) => t.size === "large");
  const mediumTech = FEATURED_TECH.filter((t) => t.size === "medium");

  return (
    <section
      id="technologies"
      className={`relative py-28 md:py-36 ${isDark ? "bg-carbon" : "bg-paper"}`}
    >
      <div className="section-divider" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-16 max-w-2xl"
        >
          <h2
            className={`font-display font-semibold tracking-[-0.015em] leading-[1.05] ${
              isDark ? "text-dark-ink" : "text-black"
            }`}
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            The Stack<span className={isDark ? "text-dark-muted" : "text-muted"}>.</span>
          </h2>
          <p
            className={`mt-4 text-base md:text-lg leading-relaxed ${
              isDark ? "text-dark-muted" : "text-muted"
            }`}
          >
            Tools change. Principles don't. Modern stacks, used to build products
            that are fast to ship, easy to reason about, and built to evolve.
            <span className="hidden md:block mt-2 font-mono text-xs tracking-[0.02em] opacity-70">
              Hover to bring the tools to life.
            </span>
          </p>
        </motion.div>

        {/* Mobile list */}
        <div className="md:hidden flex flex-col gap-3">
          {FEATURED_TECH.map((tech, index) => (
            <MobileTechItem key={tech.name} tech={tech} index={index} isDark={isDark} />
          ))}
        </div>

        {/* Desktop bento */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-fr">
          {heroTech.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index} sizeClass="col-span-2 lg:col-span-2 row-span-2" isDark={isDark} />
          ))}
          {largeTech.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index + heroTech.length} sizeClass="col-span-2 lg:col-span-2" isDark={isDark} />
          ))}
          {mediumTech.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index + heroTech.length + largeTech.length} sizeClass="col-span-1 lg:col-span-1" isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}
