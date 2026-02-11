import { motion } from "framer-motion";

interface TechnologiesProps {
  isDark: boolean;
}

interface TechItem {
  name: string;
  icon: string;
  description: string;
  size: "hero" | "large" | "medium" | "small";
  gradient: string;
}

const FEATURED_TECH: TechItem[] = [
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    description: "UI Architecture",
    size: "hero",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    description: "Type-Safe Code",
    size: "hero",
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  {
    name: "Express",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    description: "Backend APIs",
    size: "large",
    gradient: "from-slate-500/20 to-zinc-500/20",
  },
  {
    name: "AI / LLMs",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/claude.svg",
    description: "Claude · Gemini · GPT",
    size: "large",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    name: "GCP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    description: "Cloud Services",
    size: "medium",
    gradient: "from-blue-500/20 to-green-500/20",
  },
  {
    name: "Azure",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    description: "Enterprise Cloud",
    size: "medium",
    gradient: "from-blue-600/20 to-cyan-500/20",
  },
  {
    name: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    description: "Cloud Infrastructure",
    size: "large",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    name: "n8n",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/n8n.svg",
    description: "Automation",
    size: "medium",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    description: "Realtime & Auth",
    size: "medium",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    name: "Supabase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    description: "BaaS Platform",
    size: "medium",
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    name: "WordPress",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg",
    description: "CMS Solutions",
    size: "large",
    gradient: "from-blue-500/20 to-slate-500/20",
  },
  {
    name: "PHP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    description: "Server-Side Logic",
    size: "medium",
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  {
    name: "Laravel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    description: "PHP Framework",
    size: "medium",
    gradient: "from-red-500/20 to-rose-500/20",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    description: "Relational Database",
    size: "medium",
    gradient: "from-blue-600/20 to-sky-500/20",
  },
];

const sizeStyles: Record<TechItem["size"], string> = {
  hero: "p-8 md:p-10",
  large: "p-6 md:p-8",
  medium: "p-5 md:p-6",
  small: "p-4 md:p-5",
};

const iconSizes: Record<TechItem["size"], string> = {
  hero: "w-20 h-20 md:w-28 md:h-28",
  large: "w-14 h-14 md:w-20 md:h-20",
  medium: "w-12 h-12 md:w-14 md:h-14",
  small: "w-10 h-10 md:w-12 md:h-12",
};

const titleSizes: Record<TechItem["size"], string> = {
  hero: "text-2xl md:text-3xl",
  large: "text-xl md:text-2xl",
  medium: "text-lg md:text-xl",
  small: "text-base md:text-lg",
};

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
  const needsInvert = tech.name === "Express";
  const needsOrange = tech.name === "AI / LLMs";
  const needsDarken = tech.name === "n8n";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`
        ${sizeStyles[tech.size]} ${sizeClass}
        relative group cursor-default
        rounded-3xl border overflow-hidden
        transition-all duration-500
        ${
          isDark
            ? "bg-white/[0.03] border-white/5 hover:border-white/10 hover:shadow-lg hover:shadow-electric/5"
            : "bg-white border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-300/50 hover:border-gray-200"
        }
      `}
    >
      {/* Gradient background on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Corner glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-electric/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Icon */}
        <div
          className={`${iconSizes[tech.size]} mb-4 flex items-center justify-center`}
        >
          <img
            src={tech.icon}
            alt={tech.name}
            className={`w-full h-full object-contain transition-all duration-500
              opacity-60 group-hover:opacity-100
              ${
                needsOrange
                  ? "grayscale group-hover:filter-[brightness(0)_saturate(100%)_invert(50%)_sepia(98%)_saturate(1500%)_hue-rotate(3deg)_brightness(92%)]"
                  : needsDarken
                    ? `brightness-0 ${isDark ? "invert group-hover:invert" : ""}`
                    : `grayscale group-hover:grayscale-0 ${isDark ? "invert-[0.85] group-hover:invert-0" : ""}`
              }
              ${needsInvert && isDark ? "invert" : ""}
            `}
          />
        </div>

        {/* Text */}
        <div>
          <h3
            className={`font-display ${titleSizes[tech.size]} mb-1 transition-colors ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {tech.name}
          </h3>
          <p
            className={`text-sm transition-colors ${
              isDark
                ? "text-white/30 group-hover:text-white/50"
                : "text-gray-400 group-hover:text-gray-600"
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
  const needsInvert = tech.name === "Express";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      viewport={{ once: true }}
      className={`flex items-center gap-4 p-4 rounded-xl border ${
        isDark ? "bg-white/[0.03] border-white/5" : "bg-white border-gray-100"
      }`}
    >
      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
        <img
          src={tech.icon}
          alt={tech.name}
          className={`w-full h-full object-contain ${
            isDark ? "invert-[0.85]" : ""
          } ${needsInvert && isDark ? "invert" : ""}`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3
          className={`font-display text-base ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {tech.name}
        </h3>
        <p
          className={`text-xs truncate ${
            isDark ? "text-white/30" : "text-gray-400"
          }`}
        >
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
          className="mb-8 md:mb-20"
        >
          <h2
            className={`font-display text-4xl sm:text-5xl md:text-6xl tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Technologies
            <span className="text-electric">.</span>
          </h2>
          <p
            className={`mt-3 text-base md:text-xl max-w-2xl leading-relaxed ${
              isDark ? "text-white/40" : "text-gray-500"
            }`}
          >
            Tools change. Principles don't. I use modern stacks to build
            products that are fast to ship, easy to reason about, and built to
            evolve.
          </p>
        </motion.div>

        {/* Mobile: Single column list */}
        <div className="md:hidden flex flex-col gap-3">
          {FEATURED_TECH.map((tech, index) => (
            <MobileTechItem
              key={tech.name}
              tech={tech}
              index={index}
              isDark={isDark}
            />
          ))}
        </div>

        {/* Desktop: Bento Grid */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 auto-rows-fr">
          {/* Hero — React & TypeScript (2x2 each) */}
          {heroTech.map((tech, index) => (
            <TechCard
              key={tech.name}
              tech={tech}
              index={index}
              sizeClass="col-span-2 lg:col-span-2 row-span-2"
              isDark={isDark}
            />
          ))}

          {/* Large — Express, AI/LLMs, AWS, WordPress (2-col span) */}
          {largeTech.map((tech, index) => (
            <TechCard
              key={tech.name}
              tech={tech}
              index={index + heroTech.length}
              sizeClass="col-span-2 lg:col-span-2"
              isDark={isDark}
            />
          ))}

          {/* Medium — GCP, Azure, n8n, Firebase (1-col) */}
          {mediumTech.map((tech, index) => (
            <TechCard
              key={tech.name}
              tech={tech}
              index={index + heroTech.length + largeTech.length}
              sizeClass="col-span-1 lg:col-span-1"
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
