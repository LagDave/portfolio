import React from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { motion } from 'framer-motion';

interface TechItem {
  name: string;
  icon: string | string[];
  description: string;
  size: 'hero' | 'large' | 'medium' | 'small';
  gradient?: string;
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
    name: "AI/LLMs",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg",
    description: "Claude • Gemini • GPT",
    size: "large",
    gradient: "from-emerald-500/20 to-teal-500/20",
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
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    description: "Workflow Automation",
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
    name: "WordPress",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg",
    description: "CMS Solutions",
    size: "small",
    gradient: "from-blue-500/20 to-slate-500/20",
  },
];

const Technologies: React.FC = () => {
  // Mobile list item component
  const MobileTechItem = ({ tech, index }: { tech: TechItem; index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 p-4 bg-white dark:bg-white/[0.03] rounded-xl border border-slate-100 dark:border-white/5"
    >
      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
        {Array.isArray(tech.icon) ? (
          <div className="flex items-center gap-1">
            {tech.icon.slice(0, 3).map((iconUrl, i) => (
              <img
                key={i}
                src={iconUrl}
                alt={`${tech.name} ${i + 1}`}
                className="w-6 h-6 object-contain dark:invert"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ))}
          </div>
        ) : (
          <img
            src={tech.icon}
            alt={tech.name}
            className={`w-full h-full object-contain ${tech.name === 'Express' ? 'dark:invert' : ''}`}
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3
          className="text-base text-slate-900 dark:text-white"
          style={{ fontFamily: '"Polysans Bulky", sans-serif', fontWeight: 400 }}
        >
          {tech.name}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-500 truncate">
          {tech.description}
        </p>
      </div>
    </motion.div>
  );

  // Desktop bento grid
  const heroTech = FEATURED_TECH.filter(t => t.size === 'hero');
  const largeTech = FEATURED_TECH.filter(t => t.size === 'large');
  const mediumTech = FEATURED_TECH.filter(t => t.size === 'medium');
  const smallTech = FEATURED_TECH.filter(t => t.size === 'small');

  const TechCard = ({ tech, index, sizeClass }: { tech: TechItem; index: number; sizeClass: string }) => {
    const sizeStyles = {
      hero: "col-span-1 row-span-2 p-8 md:p-10",
      large: "col-span-1 row-span-1 p-6 md:p-8",
      medium: "col-span-1 row-span-1 p-5 md:p-6",
      small: "col-span-1 row-span-1 p-4 md:p-5",
    };

    const iconSizes = {
      hero: "w-20 h-20 md:w-28 md:h-28",
      large: "w-14 h-14 md:w-20 md:h-20",
      medium: "w-12 h-12 md:w-14 md:h-14",
      small: "w-10 h-10 md:w-12 md:h-12",
    };

    const titleSizes = {
      hero: "text-2xl md:text-3xl",
      large: "text-xl md:text-2xl",
      medium: "text-lg md:text-xl",
      small: "text-base md:text-lg",
    };

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
          bg-white dark:bg-white/[0.03]
          rounded-3xl border border-slate-100 dark:border-white/5
          shadow-xl shadow-slate-200/50 dark:shadow-none
          hover:shadow-2xl hover:shadow-slate-300/50 dark:hover:shadow-blue-500/5
          hover:border-slate-200 dark:hover:border-white/10
          transition-all duration-500
          overflow-hidden
        `}
      >
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Subtle Corner Glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Icon */}
          <div className={`${iconSizes[tech.size]} mb-4 flex items-center justify-center`}>
            {Array.isArray(tech.icon) ? (
              <div className="flex items-center gap-3 md:gap-4">
                {tech.icon.map((iconUrl, i) => (
                  <img
                    key={i}
                    src={iconUrl}
                    alt={`${tech.name} ${i + 1}`}
                    className={`w-10 h-10 md:w-14 md:h-14 object-contain transition-all duration-500
                      opacity-50 group-hover:opacity-100
                      dark:invert dark:group-hover:invert-0
                    `}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ))}
              </div>
            ) : (
              <img
                src={tech.icon}
                alt={tech.name}
                className={`w-full h-full object-contain transition-all duration-500
                  filter grayscale group-hover:grayscale-0
                  opacity-60 group-hover:opacity-100
                  dark:invert-[0.85] dark:group-hover:invert-0
                  ${tech.name === 'Express' ? 'dark:invert' : ''}
                `}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `<span class="text-4xl font-bold text-slate-300 dark:text-slate-700">${tech.name.charAt(0)}</span>`;
                }}
              />
            )}
          </div>

          {/* Text */}
          <div>
            <h3
              className={`${titleSizes[tech.size]} text-slate-900 dark:text-white mb-1 transition-colors`}
              style={{ fontFamily: '"Polysans Bulky", sans-serif', fontWeight: 400 }}
            >
              {tech.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
              {tech.description}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div id="technologies" className="scroll-mt-24 w-full bg-white dark:bg-black py-12 md:py-24 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <AnimatedSection className="py-0 relative z-10">
        {/* Header */}
        <div className="mb-8 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-6xl mb-2 md:mb-4 text-slate-900 dark:text-white"
              style={{ fontFamily: '"Polysans Bulky", sans-serif', fontWeight: 400 }}
            >
              Technologies<span className="text-blue-600">.</span>
            </h2>
            <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              The core technologies I use to build intelligent, scalable applications.
            </p>
          </motion.div>
        </div>

        {/* Mobile: Single column list */}
        <div className="md:hidden flex flex-col gap-3">
          {FEATURED_TECH.map((tech, index) => (
            <MobileTechItem key={tech.name} tech={tech} index={index} />
          ))}
        </div>

        {/* Desktop: Bento Grid Layout */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 auto-rows-fr">
          {/* Hero Items - React & TypeScript (Large prominence) */}
          {heroTech.map((tech, index) => (
            <TechCard
              key={tech.name}
              tech={tech}
              index={index}
              sizeClass="col-span-2 lg:col-span-2 row-span-2"
            />
          ))}

          {/* Large Items - Express, AWS, AI */}
          {largeTech.map((tech, index) => (
            <TechCard
              key={tech.name}
              tech={tech}
              index={index + heroTech.length}
              sizeClass="col-span-2 lg:col-span-2"
            />
          ))}

          {/* Medium Items - GCP, Azure, n8n, Firebase */}
          {mediumTech.map((tech, index) => (
            <TechCard
              key={tech.name}
              tech={tech}
              index={index + heroTech.length + largeTech.length}
              sizeClass="col-span-1 lg:col-span-1"
            />
          ))}

          {/* Small Items - WordPress */}
          {smallTech.map((tech, index) => (
            <TechCard
              key={tech.name}
              tech={tech}
              index={index + heroTech.length + largeTech.length + mediumTech.length}
              sizeClass="col-span-2 lg:col-span-2"
            />
          ))}
        </div>

      </AnimatedSection>
    </div>
  );
};

export default Technologies;
