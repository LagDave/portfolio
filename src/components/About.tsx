import React from "react";
import AnimatedSection from "./ui/AnimatedSection";
import { ABOUT_CONTENT } from "../constants";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <div
      id="about"
      className="scroll-mt-24 w-full bg-white dark:bg-black py-12 md:py-24 relative"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>

      <AnimatedSection className="py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Image Grid Collage - First on mobile */}
          <div className="relative order-1 md:order-1">
            <div className="relative z-10 grid grid-cols-2 gap-3 md:gap-6">
              <motion.div
                whileHover={{ y: -10 }}
                className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 dark:shadow-none md:mb-16 md:-mt-16"
              >
                <img
                  src="/img1.png"
                  alt="Profile 1"
                  className="w-full h-full aspect-square object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
              <motion.div
                whileHover={{ y: -10 }}
                className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 dark:shadow-none md:mt-20"
              >
                <img
                  src="/img2.png"
                  alt="Profile 2"
                  className="w-full h-full aspect-square object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
              <motion.div
                whileHover={{ y: -10 }}
                className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 dark:shadow-none"
              >
                <img
                  src="/img3.png"
                  alt="Profile 3"
                  className="w-full h-full aspect-square object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
              <motion.div
                whileHover={{ y: -10 }}
                className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 dark:shadow-none md:-mb-16 md:mt-16"
              >
                <img
                  src="/img4.png"
                  alt="Profile 4"
                  className="w-full h-full aspect-square object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
            </div>
            {/* Decorative shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-slate-50 dark:bg-slate-900 rounded-full blur-3xl -z-10" />
          </div>

          {/* Text Content */}
          <div className="space-y-6 md:space-y-10 order-2 md:order-2">
            <div>
              <h2
                className="text-3xl md:text-5xl lg:text-6xl leading-tight text-slate-900 dark:text-white mb-4 md:mb-6"
                style={{
                  fontFamily: '"Polysans Bulky", sans-serif',
                  fontWeight: 400,
                }}
              >
                The Dave Standard<span className="text-blue-600">.</span>
              </h2>
              <h3 className="text-lg md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white font-medium">
                Engineering enjoyable software since forever.
              </h3>
            </div>

            <div className="space-y-4 md:space-y-6 text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
              {ABOUT_CONTENT.paragraphs.map((para, index) => (
                <p key={index} className="transition-colors">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default About;
