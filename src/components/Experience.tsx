import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";

import alloroLogo from "../images/alloro-logo.png";
import puzzleLogo from "../images/puzzle-logo.png";
import asmLogo from "../images/asm-logo.png";
import cimplicoLogo from "../images/cimplico-logo.png";
import fgsLogo from "../images/fgs-logo.png";
import roidnaLogo from "../images/roidna-logo.png";
import wesLogo from "../images/wes-logo.png";
import twofLogo from "../images/2f-logo.png";
import webpropellersLogo from "../images/webpropellers-logo.png";

interface ExperienceProps {
  isDark: boolean;
}

interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location: string;
  logoSrc: string;
  bullets: string[];
}

const EXPERIENCES: ExperienceEntry[] = [
  {
    id: "alloro",
    company: "Alloro (HamiltonWise & Associates)",
    role: "AI Software Engineer",
    location: "Chicago, USA",
    logoSrc: alloroLogo,
    bullets: [
      "Spearheaded the development of a comprehensive AI-powered Dental Practice Management Software that delivers actionable insights and strategic action plans to help healthcare providers make data-driven decisions",
      "Architected and managed AWS cloud infrastructure including EC2, S3, Lambda, and RDS to ensure scalable and reliable application performance",
      "Implemented robust CI/CD pipelines to streamline deployment workflows and maintain code quality across environments",
      "Leveraged multiple LLM platforms including Claude, GPT, and Gemini to build intelligent features and automate complex workflows",
      "Managed WordPress and Squarespace websites for clients, handling creation, customization, and ongoing maintenance",
    ],
  },
  {
    id: "puzzlehr",
    company: "PuzzleHR",
    role: "Software Engineer",
    location: "Tampa, FL",
    logoSrc: puzzleLogo,
    bullets: [
      "Spearheaded the development of 3 AI-driven products—both internal tools and client-facing applications—focused on streamlining human resource management processes",
      "Bridged the gap between technical teams and business stakeholders by effectively communicating complex technical concepts and project progress",
      "Maintained and optimized server infrastructure using Microsoft Azure cloud services, ensuring high availability and performance",
      "Managed version control and deployment workflows through Azure Repos and CI/CD Pipelines, enabling efficient and reliable releases",
      "Integrated LLM capabilities using ChatGPT and Claude APIs to build intelligent automation features and enhance product functionality",
    ],
  },
  {
    id: "actualseo",
    company: "ActualSEO Media",
    role: "Web Specialist",
    location: "Houston, TX",
    logoSrc: asmLogo,
    bullets: [
      "Implemented technical SEO optimizations including meta tags, schema markup, site speed improvements, and crawlability fixes to boost search engine rankings",
      "Designed and developed responsive, conversion-focused web pages aligned with client branding and marketing objectives",
      "Diagnosed and resolved issues on existing WordPress websites, including plugin conflicts, theme errors, and performance bottlenecks",
      "Provisioned and configured new WordPress installations from scratch, including hosting setup, theme customization, and plugin integration",
      "Collaborated with the SEO team to ensure all web development work aligned with search engine best practices and content strategies",
    ],
  },
  {
    id: "cimplico",
    company: "Cimplico",
    role: "Full-stack Web Developer",
    location: "Brisbane, Australia",
    logoSrc: cimplicoLogo,
    bullets: [
      "Contributed to the development of an accounting software built with technologies like React, Typescript, Express, among others",
      "Developed business logic for complex features with JavaScript",
      "Translated Figma mockups to React TS components with precision and accuracy",
    ],
  },
  {
    id: "fgs",
    company: "FGS Advisory",
    role: "Full-stack Web Developer",
    location: "Sydney, Australia",
    logoSrc: fgsLogo,
    bullets: [
      "Contributed to the development of a web-based PDF editor targeted for accounting firms with Laravel and JavaScript",
      "Implemented complex, calculation-dense features like page rotation logic (algebra and geometry), and undo-redo (sorting algorithms) among others",
      "Designed and presented quick mockups for features and additional pages",
    ],
  },
  {
    id: "roidna",
    company: "ROI·DNA",
    role: "Engineering Dep. Consultant",
    location: "San Francisco, California, USA",
    logoSrc: roidnaLogo,
    bullets: [
      "Added features to existing medium to large-scaled WordPress and Laravel + React projects",
      "Handled multiple client projects simultaneously on different tech-stacks",
      "Reported, and formulated solutions for bugs on numerous projects",
    ],
  },
  {
    id: "wes",
    company: "wesmcdowell.com",
    role: "Web Development Consultant",
    location: "Chicago, USA",
    logoSrc: wesLogo,
    bullets: [
      "Employer is a YouTuber/digital strategy expert with a quarter of a million subscribers and thousands of students",
      "Maintained website and fixed urgent bugs",
      "Helped on the technical side — ie, opening and closing campaign pages — during course campaigns in a time-sensitive environment",
      "Created new pages and updated existing ones with Elementor + WordPress",
    ],
  },
  {
    id: "2f",
    company: "2fsolutions.com",
    role: "Web Development Consultant",
    location: "Italy",
    logoSrc: twofLogo,
    bullets: [
      "Developed websites with Vue + Laravel or WordPress, depending on client requirements",
      "Troubleshot, optimized, and formulated solutions for faulty, existing websites",
    ],
  },
  {
    id: "webpropellers",
    company: "Web Propellers",
    role: "WordPress Developer",
    location: "Davao, Philippines",
    logoSrc: webpropellersLogo,
    bullets: [
      "Developed and handled different types of websites for an array of industries",
      "Engineered web solutions to accommodate brilliant business ideas and provided outstanding technical support for English and non-English clients",
      "Spun up and maintained virtual compute machines from scratch for different types of projects",
      "Exposed to bash terminal and operated virtual machines remotely",
      "Utilized AWS services like S3, Route 53, Lambda, RDS, etc. for different business requirements",
      "Migrated websites to different hosting services",
    ],
  },
];

function AccordionCard({
  entry,
  isOpen,
  onToggle,
  isDark,
  index,
}: {
  entry: ExperienceEntry;
  isOpen: boolean;
  onToggle: () => void;
  isDark: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl border transition-all duration-500 ${
        isOpen
          ? isDark
            ? "bg-white/[0.03] border-electric/20 shadow-xl shadow-electric/5"
            : "bg-white border-electric/20 shadow-xl shadow-electric/5"
          : isDark
          ? "bg-white/[0.02] border-white/[0.05] hover:border-white/10"
          : "bg-white border-gray-100 hover:border-gray-200"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left cursor-pointer relative z-10"
      >
        <div className="flex items-center gap-5">
          {/* Logo */}
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center p-2 border transition-colors bg-white ${
              isOpen
                ? "border-electric/20"
                : isDark
                ? "border-white/10"
                : "border-gray-100"
            }`}
          >
            <img
              src={entry.logoSrc}
              alt={entry.company}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Info */}
          <div>
            <h3
              className={`font-display text-lg md:text-xl ${
                isOpen
                  ? isDark
                    ? "text-white"
                    : "text-gray-900"
                  : isDark
                  ? "text-white/80"
                  : "text-gray-700"
              }`}
            >
              {entry.company}
            </h3>
            <div
              className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm mt-1 ${
                isDark ? "text-white/40" : "text-gray-500"
              }`}
            >
              <span className="font-medium">{entry.role}</span>
              <span className="hidden sm:inline opacity-40">·</span>
              <span className="flex items-center gap-1">
                <MapPin size={12} /> {entry.location}
              </span>
            </div>
          </div>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`p-2 rounded-full transition-colors ${
            isOpen
              ? isDark
                ? "bg-white/10 text-white"
                : "bg-gray-100 text-gray-900"
              : isDark
              ? "text-white/30"
              : "text-gray-300"
          }`}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden relative z-10"
          >
            <div
              className={`relative px-6 md:px-8 pb-8 pt-0 border-t mx-6 md:mx-8 mt-2 overflow-hidden ${
                isDark ? "border-white/5" : "border-gray-100"
              }`}
            >
              {/* Watermark logo */}
              <img
                src={entry.logoSrc}
                alt=""
                className="absolute bottom-0 right-0 w-40 h-40 object-contain opacity-[0.04] pointer-events-none"
              />

              <ul className="space-y-4 mt-6 relative z-10">
                {entry.bullets.map((bullet, i) => (
                  <motion.li
                    key={i}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="flex items-start gap-3 group"
                  >
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-electric flex-shrink-0 group-hover:scale-150 transition-transform" />
                    <span
                      className={`text-sm leading-relaxed ${
                        isDark ? "text-white/60" : "text-gray-600"
                      }`}
                    >
                      {bullet}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Experience({ isDark }: ExperienceProps) {
  const [openRow, setOpenRow] = useState<number | null>(0);

  const getRow = (index: number) => Math.floor(index / 2);

  return (
    <section
      id="experience"
      className={`relative py-32 ${
        isDark ? "bg-surface-dark-elevated" : "bg-surface-light-elevated"
      }`}
    >
      <div className="section-divider" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 lg:gap-16 items-start">
            <div>
              <h2
                className={`font-display text-4xl sm:text-5xl md:text-6xl tracking-tight ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Experience
                <span className="text-electric">.</span>
              </h2>
              <p
                className={`mt-3 text-base md:text-lg max-w-xl ${
                  isDark ? "text-white/40" : "text-gray-500"
                }`}
              >
                I've worked across agencies, startups, and product teams, shipping under pressure, integrating AI/ML APIs, and building systems that don't collapse when traffic (or expectations) spike.
              </p>
            </div>
            {/* 5+ Years counter */}
            <div className="hidden md:flex flex-col items-end">
              <span className="text-7xl lg:text-8xl font-bold gradient-text">
                5+
              </span>
              <p
                className={`text-sm font-bold uppercase tracking-widest ${
                  isDark ? "text-white/30" : "text-gray-400"
                }`}
              >
                Years of building
              </p>
            </div>
          </div>
        </motion.div>

        {/* Two-column card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {EXPERIENCES.map((entry, i) => (
            <AccordionCard
              key={entry.id}
              entry={entry}
              isOpen={openRow === getRow(i)}
              onToggle={() =>
                setOpenRow(openRow === getRow(i) ? null : getRow(i))
              }
              isDark={isDark}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
