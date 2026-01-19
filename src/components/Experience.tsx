import React, { useState } from "react";
import AnimatedSection from "./ui/AnimatedSection";
import { EXPERIENCE_DATA } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";

const Experience: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(EXPERIENCE_DATA[0].id);

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div
      id="experience"
      className="scroll-mt-24 w-full bg-slate-50 dark:bg-[#0a0a0a] py-12 md:py-24 border-y border-slate-200 dark:border-white/5"
    >
      <AnimatedSection className="py-0">
        <div className="mb-8 md:mb-16">
          {/* 5+ Years - First on mobile, smaller */}
          <div className="flex flex-col items-start mb-4 md:hidden">
            <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white">
              5+
            </span>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-600 uppercase tracking-widest">
              Years Active
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 lg:gap-16 items-start">
            <div>
              <h2
                className="text-3xl md:text-6xl text-slate-900 dark:text-white mb-2 md:mb-4"
                style={{
                  fontFamily: '"Polysans Bulky", sans-serif',
                  fontWeight: 400,
                }}
              >
                Experience<span className="text-blue-600">.</span>
              </h2>
              <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-xl">
                My professional journey through various companies and tech
                stacks.
              </p>
            </div>
            {/* 5+ Years - Desktop only */}
            <div className="hidden md:flex flex-col items-end">
              <span className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white">
                5+
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-600 uppercase tracking-widest">
                Years Active
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {EXPERIENCE_DATA.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`
                  overflow-hidden rounded-2xl transition-all duration-300 border relative
                  ${
                    openId === job.id
                      ? "bg-white dark:bg-white/5 border-blue-500/20 shadow-xl shadow-blue-500/5"
                      : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 hover:border-blue-400/50"
                  }
                `}
              style={{
                backgroundImage: `radial-gradient(circle at 100% 0%, var(--tw-gradient-stops))`,
                backgroundSize: "200% 200%",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                  background: (() => {
                    const colorMap: { [key: string]: string } = {
                      alloro:
                        "radial-gradient(circle at 100% 0%, #18181b 0%, transparent 75%)",
                      puzzlehr:
                        "radial-gradient(circle at 0% 100%, #22c55e 0%, transparent 75%)",
                      asm: "radial-gradient(circle at 100% 50%, #06b6d4 0%, transparent 75%)",
                      cimplico:
                        "radial-gradient(circle at 100% 0%, #4f46e5 0%, transparent 75%)",
                      fgs: "radial-gradient(circle at 100% 100%, #f97316 0%, transparent 75%)",
                      roidna:
                        "radial-gradient(circle at 0% 100%, #10b981 0%, transparent 75%)",
                      wes: "radial-gradient(circle at 0% 0%, #4f46e5 0%, transparent 75%)",
                      "2f": "radial-gradient(circle at 100% 50%, #a855f7 0%, transparent 75%)",
                      webpropellers:
                        "radial-gradient(circle at 50% 100%, #ef4444 0%, transparent 75%)",
                    };
                    return colorMap[job.id] || colorMap.cimplico;
                  })(),
                }}
              />
              <button
                onClick={() => toggleOpen(job.id)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none relative z-10"
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`
                        w-14 h-14 rounded-xl flex items-center justify-center p-2 transition-colors border
                        ${openId === job.id ? "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800" : "bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10"}
                    `}
                  >
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-full h-full object-contain filter dark:invert"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement?.classList.add(
                          "text-slate-400",
                        );
                        e.currentTarget.parentElement!.innerHTML =
                          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>';
                      }}
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-xl md:text-2xl ${openId === job.id ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}
                      style={{
                        fontFamily: '"Polysans Bulky", sans-serif',
                        fontWeight: 400,
                      }}
                    >
                      {job.company}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-500 dark:text-slate-400 mt-1">
                      <span className="font-semibold">{job.title}</span>
                      <span className="hidden sm:inline text-slate-300 dark:text-slate-700">
                        •
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {job.location}
                      </span>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: openId === job.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-2 rounded-full ${openId === job.id ? "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white" : "text-slate-400"}`}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openId === job.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <div className="relative px-6 md:px-8 pb-8 pt-0 border-t border-slate-100 dark:border-white/5 mx-6 md:mx-8 mt-2 overflow-hidden">
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="absolute bottom-0 right-0 w-40 h-40 object-contain opacity-10 pointer-events-none filter dark:invert"
                      />
                      <ul className="space-y-4 mt-6 relative z-10">
                        {job.details.map((detail, i) => (
                          <motion.li
                            key={i}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="text-slate-600 dark:text-slate-300 text-base leading-relaxed flex items-start group"
                          >
                            <span className="mr-3 text-blue-500 mt-2.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 group-hover:scale-150 transition-transform"></span>
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Experience;
