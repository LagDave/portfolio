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
  Terminal,
} from "lucide-react";

interface ContactProps {
  isDark: boolean;
}

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/rustine-dave-235a51237/" },
  { icon: Github, label: "GitHub", href: "https://github.com/lagdave/" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61585996447935" },
  { icon: Mail, label: "Email", href: "mailto:hi@rustinedave.com" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/+639505425118" },
];

function Particle({ x, y, isDark }: { x: number; y: number; isDark: boolean }) {
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
      className={`absolute w-1.5 h-1.5 rounded-full ${isDark ? "bg-dark-ink" : "bg-black"}`}
      style={{ left: x, top: y }}
    />
  );
}

export default function Contact({ isDark }: ContactProps) {
  const [formData, setFormData] = useState({ name: "", email: "", body: "" });
  const [humanCheck, setHumanCheck] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
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
          body: JSON.stringify(formData),
        },
      );
      if (!res.ok) throw new Error("Failed");
      const rect = formRef.current?.getBoundingClientRect();
      if (rect) {
        setParticles(
          Array.from({ length: 12 }, (_, i) => ({
            id: Date.now() + i,
            x: rect.width / 2,
            y: rect.height / 2,
          })),
        );
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

  const inkText = isDark ? "text-dark-ink" : "text-black";
  const mutedText = isDark ? "text-dark-muted" : "text-muted";

  const inputClasses = `w-full px-5 py-3.5 rounded-md text-sm font-body transition-colors duration-300 ${
    isDark
      ? "bg-carbon text-dark-ink placeholder-dark-muted border border-dark-line focus:border-dark-ink"
      : "bg-paper text-ink placeholder-muted border border-line focus:border-black"
  }`;

  return (
    <section
      id="contact"
      className={`relative py-28 md:py-36 ${isDark ? "bg-carbon" : "bg-paper"}`}
    >
      <div className="section-divider" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-start">
          {/* Left */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2
                className={`font-display font-semibold tracking-[-0.015em] leading-[1.05] ${inkText}`}
                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
              >
                Let's build something
                <br />
                worth maintaining<span className={mutedText}>.</span>
              </h2>
              <p className={`mt-6 text-lg leading-relaxed max-w-md ${mutedText}`}>
                If you're aiming for "ship it yesterday" and "it still works next
                quarter," we'll get along.
              </p>
              <p className={`mt-3 text-lg leading-relaxed max-w-md font-medium ${inkText}`}>
                Bring the idea. I'll bring the speed and the structure.
              </p>
            </motion.div>

            {/* Social pills */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-2.5"
            >
              {SOCIALS.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-md text-sm font-medium border transition-colors duration-300 ${
                    isDark
                      ? "border-dark-hairline text-dark-muted hover:border-dark-ink hover:text-dark-ink"
                      : "border-hairline text-muted hover:border-black hover:text-black"
                  }`}
                >
                  <social.icon size={16} className="transition-transform duration-300 group-hover:scale-110" />
                  {social.label}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right – Form */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div
              className={`relative rounded-xl p-7 sm:p-8 border overflow-hidden ${
                isDark
                  ? "bg-dark-surface border-dark-line"
                  : "bg-surface border-hairline"
              }`}
            >
              <AnimatePresence>
                {particles.map((p) => (
                  <Particle key={p.id} x={p.x} y={p.y} isDark={isDark} />
                ))}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 16 }}
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                        isDark ? "bg-dark-ink" : "bg-black"
                      }`}
                    >
                      <Check className={isDark ? "text-carbon" : "text-paper"} size={28} />
                    </motion.div>
                    <h3 className={`font-display text-2xl font-semibold mb-2 ${inkText}`}>
                      Message sent<span className={mutedText}>.</span>
                    </h3>
                    <p className={`text-sm ${mutedText}`}>
                      I'll get back to you soon. Thanks for reaching out.
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
                    className="space-y-4"
                  >
                    <div className={`font-mono text-[0.7rem] tracking-[0.04em] uppercase mb-2 ${mutedText}`}>
                      // new_message
                    </div>
                    <input
                      type="text"
                      placeholder="John Doe"
                      aria-label="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className={inputClasses}
                    />
                    <input
                      type="email"
                      placeholder="john@example.com"
                      aria-label="Your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className={inputClasses}
                    />
                    <textarea
                      placeholder="Tell me about your project..."
                      aria-label="Your message"
                      rows={4}
                      value={formData.body}
                      onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                      required
                      className={`${inputClasses} resize-none`}
                    />

                    {/* Human check */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onMouseDown={startHold}
                        onMouseUp={stopHold}
                        onMouseLeave={stopHold}
                        onTouchStart={startHold}
                        onTouchEnd={stopHold}
                        className={`relative w-full py-3.5 rounded-md text-sm font-mono flex items-center justify-center gap-2 overflow-hidden cursor-pointer border transition-colors duration-300 ${
                          isDark
                            ? humanCheck
                              ? "border-dark-ink text-dark-ink"
                              : "border-dark-line text-dark-muted"
                            : humanCheck
                              ? "border-black text-black"
                              : "border-line text-muted"
                        }`}
                      >
                        <div
                          className={`absolute left-0 top-0 h-full transition-all duration-75 ${
                            isDark ? "bg-dark-ink/12" : "bg-black/8"
                          }`}
                          style={{ width: `${holdProgress}%` }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                          <Terminal size={14} />
                          {humanCheck
                            ? "human presence confirmed"
                            : "hold to confirm you're human"}
                        </span>
                      </button>
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className={`font-mono text-xs text-center ${inkText}`}
                        >
                          ! something went wrong — please try again
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={!humanCheck || sending}
                      whileHover={humanCheck && !sending ? { y: -2 } : {}}
                      whileTap={humanCheck && !sending ? { scale: 0.98 } : {}}
                      className={`relative w-full py-4 rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-300 overflow-hidden ${
                        humanCheck && !sending
                          ? isDark
                            ? "bg-dark-ink text-carbon cursor-pointer hover:bg-white"
                            : "bg-black text-paper cursor-pointer hover:bg-ink"
                          : isDark
                            ? "bg-dark-elevated text-dark-muted cursor-not-allowed"
                            : "bg-elevated text-muted cursor-not-allowed"
                      }`}
                    >
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
      <div className={`mt-28 border-t ${isDark ? "border-dark-hairline" : "border-hairline"}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className={`text-sm ${mutedText}`}>
            &copy; {new Date().getFullYear()} Rustine Dave. AI-Augmented Software Engineer
          </p>
          <p className={`font-mono text-[0.7rem] tracking-[0.04em] uppercase ${mutedText}`}>
            speed × structure
          </p>
        </div>
      </div>
    </section>
  );
}
