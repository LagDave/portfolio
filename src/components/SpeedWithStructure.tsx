import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Eye } from "lucide-react";

interface SpeedWithStructureProps {
  isDark: boolean;
}

export default function SpeedWithStructure({ isDark }: SpeedWithStructureProps) {
  return (
    <section
      className={`relative py-20 ${
        isDark ? "bg-surface-dark" : "bg-surface-light"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`relative rounded-3xl overflow-hidden p-10 md:p-16 ${
            isDark
              ? "bg-gradient-to-br from-blue-600/50 via-blue-500/50 to-indigo-600/50"
              : "bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600"
          }`}
        >
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Fast prototypes are easy.
              <br />
              Sustainable systems are engineered.
            </h2>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
              When code is produced without structure, teams pay later: fragile behavior, slow changes, unclear ownership. I use AI to compress time on repetitive work, while keeping design intentional and observable.
            </p>
          </div>

          {/* Feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid md:grid-cols-3 gap-5"
          >
            {[
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
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mx-auto mb-3">
                  <item.icon size={20} className="text-white" />
                </div>
                <h3 className="font-display text-base font-bold text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Tagline + CTA */}
          <div className="mt-12 text-center">
            <p className="text-lg font-display font-bold text-white">
              Speed with structure. Output with accountability.
            </p>
            <motion.button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-semibold bg-white text-blue-600 shadow-xl shadow-black/15 hover:shadow-black/25 transition-shadow duration-300 cursor-pointer group"
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
