import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Linkedin,
  Github,
  Facebook,
  Mail,
  MessageCircle,
  Send,
  Check,
  Sparkles,
} from "lucide-react";

interface ContactProps {
  isDark: boolean;
}

const SOCIALS = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rustine-dave-235a51237/",
    color: "#0A66C2",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/lagdave/",
    color: "#333",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61585996447935",
    color: "#1877F2",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:hi@rustinedave.com",
    color: "#EA4335",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/+639505425118",
    color: "#25D366",
  },
];

function Particle({ x, y }: { x: number; y: number }) {
  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: 0,
        scale: 0,
      }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="absolute w-1.5 h-1.5 rounded-full bg-electric"
      style={{ left: x, top: y }}
    />
  );
}

export default function Contact({ isDark }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    body: "",
  });
  const [humanCheck, setHumanCheck] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const holdTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const startHold = () => {
    if (humanCheck) return;
    holdTimer.current = setInterval(() => {
      setHoldProgress((p) => {
        if (p >= 100) {
          if (holdTimer.current) clearInterval(holdTimer.current);
          setHumanCheck(true);
          return 100;
        }
        return p + 4;
      });
    }, 30);
  };

  const stopHold = () => {
    if (holdTimer.current) clearInterval(holdTimer.current);
    if (!humanCheck) setHoldProgress(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!humanCheck || sending) return;

    setSending(true);
    setError(false);

    try {
      const res = await fetch(
        "https://hook.eu1.make.com/1vxq2sl9wckyzdehj94mrciu5w4daddn",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            body: formData.body,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed");

      // Particle burst
      const rect = formRef.current?.getBoundingClientRect();
      if (rect) {
        const newParticles = Array.from({ length: 12 }, (_, i) => ({
          id: Date.now() + i,
          x: rect.width / 2,
          y: rect.height / 2,
        }));
        setParticles(newParticles);
      }

      setSent(true);
      setTimeout(() => {
        setSent(false);
        setFormData({ name: "", email: "", body: "" });
        setHumanCheck(false);
        setHoldProgress(0);
        setParticles([]);
      }, 4000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setSending(false);
    }
  };

  const inputClasses =
    "w-full px-5 py-3.5 rounded-2xl text-sm transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 border border-white/20 focus:border-electric/40";

  return (
    <section
      id="contact"
      className={`relative py-32 ${
        isDark ? "bg-surface-dark-elevated" : "bg-surface-light-elevated"
      }`}
    >
      <div className="section-divider" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2
                className={`font-display text-4xl sm:text-5xl font-bold tracking-tight ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Let's build something
                <br />
                worth maintaining
                <span className="text-electric">.</span>
              </h2>
              <p
                className={`mt-6 text-lg leading-relaxed max-w-md ${
                  isDark ? "text-white/50" : "text-gray-500"
                }`}
              >
                If you're aiming for "ship it yesterday" and "it still works
                next quarter," we'll get along.
              </p>
              <p
                className={`mt-3 text-lg leading-relaxed max-w-md font-medium ${
                  isDark ? "text-white/60" : "text-gray-600"
                }`}
              >
                Bring the idea. I'll bring the speed and the structure.
              </p>
            </motion.div>

            {/* Social pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              {SOCIALS.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-medium border transition-all duration-300 ${
                    isDark
                      ? "border-white/[0.06] text-white/60 bg-white/[0.03] hover:border-electric/30 hover:text-electric hover:bg-electric/5 hover:shadow-lg hover:shadow-electric/10"
                      : "border-black/[0.06] text-gray-500 bg-white hover:border-electric/30 hover:text-electric hover:bg-electric/5 hover:shadow-lg hover:shadow-electric/10"
                  }`}
                >
                  <social.icon
                    size={16}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  {social.label}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right – Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              className={`relative rounded-3xl p-8 border overflow-hidden shadow-xl shadow-electric/15 hover:shadow-2xl hover:shadow-electric/20 transition-shadow duration-500 ${
                isDark
                  ? "bg-gradient-to-br from-blue-600/50 via-blue-500/50 to-indigo-600/50 border-white/10"
                  : "bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 border-blue-400"
              }`}
            >
              {/* Particles */}
              <AnimatePresence>
                {particles.map((p) => (
                  <Particle key={p.id} x={p.x} y={p.y} />
                ))}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-6"
                    >
                      <Check className="text-white" size={28} />
                    </motion.div>
                    <h3 className="font-display text-2xl font-bold mb-2 text-white">
                      Message sent
                      <span className="text-white/60">.</span>
                    </h3>
                    <p className="text-sm text-white/60">
                      I'll get back to you soon. Thanks for reaching out!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Tell me about your project..."
                        rows={4}
                        value={formData.body}
                        onChange={(e) =>
                          setFormData({ ...formData, body: e.target.value })
                        }
                        required
                        className={`${inputClasses} resize-none`}
                      />
                    </div>

                    {/* Human check */}
                    <div className="pt-1">
                      <motion.button
                        type="button"
                        onMouseDown={startHold}
                        onMouseUp={stopHold}
                        onMouseLeave={stopHold}
                        onTouchStart={startHold}
                        onTouchEnd={stopHold}
                        className={`relative w-full py-3.5 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 overflow-hidden cursor-pointer border transition-all duration-300 ${
                          humanCheck
                            ? "border-white text-white"
                            : "border-white/40 text-white/70"
                        }`}
                      >
                        {/* Fill bar */}
                        <div
                          className="absolute left-0 top-0 h-full bg-white/20 transition-all duration-75"
                          style={{ width: `${holdProgress}%` }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                          {humanCheck ? (
                            <>
                              <Sparkles size={14} className="text-blue-600" />A
                              human presence has been confirmed
                            </>
                          ) : (
                            <>
                              <Sparkles size={14} />
                              Touch and hold so I can sense your human spark
                            </>
                          )}
                        </span>
                      </motion.button>
                    </div>

                    {/* Error message */}
                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-sm text-red-300 text-center"
                        >
                          Something went wrong. Please try again.
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={!humanCheck || sending}
                      whileHover={humanCheck && !sending ? { scale: 1.02 } : {}}
                      whileTap={humanCheck && !sending ? { scale: 0.98 } : {}}
                      className={`relative w-full py-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                        humanCheck && !sending
                          ? "bg-white text-blue-600 shadow-xl shadow-white/25 hover:shadow-white/40"
                          : isDark
                            ? "bg-white/5 text-white/20 cursor-not-allowed"
                            : "bg-gray-100 text-gray-300 cursor-not-allowed"
                      }`}
                    >
                      {/* Gradient sheen */}
                      {humanCheck && !sending && (
                        <motion.div
                          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                          style={{
                            background:
                              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                          }}
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        />
                      )}
                      <Send size={16} />
                      {sending ? "Sending..." : "Send Message"}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-32 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className={`text-sm ${isDark ? "text-white/30" : "text-gray-400"}`}
          >
            &copy; {new Date().getFullYear()} Rustine Dave. All rights reserved.
          </p>
          <p
            className={`text-xs ${isDark ? "text-white/20" : "text-gray-300"}`}
          >
            Made with{" "}
            <span className="gradient-text font-medium">React & Tailwind</span>
          </p>
        </div>
      </div>
    </section>
  );
}
