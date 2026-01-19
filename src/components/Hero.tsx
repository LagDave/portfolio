import React from "react";
import { motion } from "framer-motion";
import { HERO_CONTENT } from "../constants";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 bg-white dark:bg-black">
      {/* Background Container - prevents overflow without blocking scroll */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background Image - Hidden on mobile */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: "url(/right-banner.png)",
            backgroundPosition: "calc(113% + 4vw) calc(101% + 32.5vh)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "56%",
          }}
        />

        {/* Subtle Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-[120px] opacity-60 -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-full blur-[100px] opacity-40 -z-10 -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl space-y-6 md:space-y-8 relative z-10">
          {/* Mobile Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:hidden w-40 h-40 rounded-2xl overflow-hidden shadow-xl bg-black"
          >
            <img
              src="/right-banner.png"
              alt="Rustine Dave"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1
              className="text-4xl md:text-7xl lg:text-8xl tracking-tight mb-4 md:mb-6 text-slate-900 dark:text-white leading-[1.1]"
              style={{
                fontFamily: '"Polysans Bulky", sans-serif',
                fontWeight: 400,
              }}
            >
              {HERO_CONTENT.name}
              <span className="text-blue-600">.</span>
            </h1>

            <h2
              className="text-xl md:text-4xl mb-4 md:mb-6 leading-snug"
              style={{
                fontFamily: '"Polysans Bulky", sans-serif',
                fontWeight: 400,
              }}
            >
              {HERO_CONTENT.tagline}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white">
                {HERO_CONTENT.taglineGradientPart}
              </span>
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-base md:text-xl max-w-xl leading-relaxed">
              {HERO_CONTENT.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap gap-3 md:gap-4"
          >
            <a
              href={HERO_CONTENT.resumePdf}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center space-x-2 md:space-x-3 bg-slate-900 dark:bg-white text-white dark:text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-blue-900/20 dark:hover:shadow-white/20 transition-all transform hover:-translate-y-1"
            >
              <span>{HERO_CONTENT.cta}</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center space-x-2 md:space-x-3 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <span>Contact Me</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
