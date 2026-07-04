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
  ArrowRight,
  ArrowUp,
} from "lucide-react";
import { Magnetic } from "./Magnetic";
import { NodeGraph } from "./NodeGraph";

interface ContactProps {
  isDark: boolean;
}

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn", handle: "/in/rustine-dave", href: "https://www.linkedin.com/in/rustine-dave-235a51237/" },
  { icon: Github, label: "GitHub", handle: "/lagdave", href: "https://github.com/lagdave/" },
  { icon: Mail, label: "Email", handle: "hi@rustinedave.com", href: "mailto:hi@rustinedave.com" },
  { icon: MessageCircle, label: "WhatsApp", handle: "+63 950 542 5118", href: "https://wa.me/+639505425118" },
  { icon: Facebook, label: "Facebook", handle: "/rustine.dave", href: "https://www.facebook.com/profile.php?id=61585996447935" },
];

const NAV = [
  { id: "about", label: "Standard" },
  { id: "technologies", label: "Stack" },
  { id: "contact", label: "Contact" },
];

interface Burst {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

function Particle({ p, isDark }: { p: Burst; isDark: boolean }) {
  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`absolute w-1.5 h-1.5 rounded-full ${isDark ? "bg-dark-ink" : "bg-black"}`}
      style={{ left: p.x, top: p.y }}
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
  const [particles, setParticles] = useState<Burst[]>([]);
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
      const res = await fetch("https://hook.eu1.make.com/1vxq2sl9wckyzdehj94mrciu5w4daddn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");
      const rect = formRef.current?.getBoundingClientRect();
      if (rect) {
        setParticles(
          Array.from({ length: 12 }, (_, i) => ({
            id: Date.now() + i,
            x: rect.width / 2,
            y: rect.height / 2,
            dx: (Math.random() - 0.5) * 200,
            dy: (Math.random() - 0.5) * 200,
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
  const lineText = isDark ? "text-dark-line" : "text-line";
  const hairBorder = isDark ? "border-dark-hairline" : "border-hairline";
  // Full literal classes so Tailwind can statically detect them.
  const groupHoverInk = isDark ? "group-hover:text-dark-ink" : "group-hover:text-black";
  const hoverInk = isDark ? "hover:text-dark-ink" : "hover:text-black";

  const fieldWrap = (label: string, node: React.ReactNode) => (
    <label className="block">
      <span className={`block mb-1.5 font-mono text-[0.65rem] tracking-[0.06em] uppercase ${mutedText}`}>
        {label}
      </span>
      {node}
    </label>
  );

  const inputClasses = `w-full px-4 py-3 rounded-md text-sm font-body transition-colors duration-300 ${
    isDark
      ? "bg-carbon text-dark-ink placeholder-dark-muted/60 border border-dark-line focus:border-dark-ink"
      : "bg-paper text-ink placeholder-muted/70 border border-line focus:border-black"
  }`;

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="contact"
      className={`relative pt-28 md:pt-36 ${isDark ? "bg-carbon" : "bg-paper"}`}
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-2xl"
        >
          <div className={`flex items-center gap-3 mb-5 font-mono text-[0.7rem] tracking-[0.04em] uppercase ${mutedText}`}>
            <span>Fig. 04</span>
            <span className={`flex-1 h-px dotted-x ${lineText}`} style={{ maxWidth: "120px" }} />
            <span>Open a line</span>
          </div>
          <h2
            className={`font-display font-semibold tracking-[-0.015em] leading-[1.05] ${inkText}`}
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Let's build something
            <br />
            worth maintaining<span className={mutedText}>.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left — copy + channels */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className={`text-lg leading-relaxed max-w-md ${mutedText}`}>
                If you're aiming for "ship it yesterday" and "it still works next
                quarter," we'll get along.
              </p>
              <p className={`mt-3 text-lg leading-relaxed max-w-md font-medium ${inkText}`}>
                Bring the idea. I'll bring the speed and the structure.
              </p>
            </motion.div>

            {/* Channels — dotted-leader rows */}
            <div className="mt-10">
              <div className={`mb-2 font-mono text-[0.7rem] tracking-[0.04em] uppercase ${mutedText}`}>
                // channels
              </div>
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className={`group flex items-center gap-4 py-3.5 border-t ${hairBorder} ${
                    i === SOCIALS.length - 1 ? `border-b ${hairBorder}` : ""
                  }`}
                >
                  <s.icon size={16} className={`shrink-0 transition-colors ${mutedText} ${groupHoverInk}`} />
                  <span className={`font-mono text-xs tracking-[0.02em] ${inkText}`}>
                    {s.label}
                  </span>
                  <span className={`flex-1 h-px dotted-x self-center opacity-60 ${lineText}`} />
                  <span className={`font-mono text-xs ${mutedText} ${groupHoverInk} transition-colors`}>
                    {s.handle}
                  </span>
                  <ArrowRight
                    size={13}
                    className={`shrink-0 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${inkText}`}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right — console form */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className={`relative rounded-xl p-6 sm:p-8 border overflow-hidden ${isDark ? "bg-dark-surface border-dark-line" : "bg-surface border-hairline"}`}>
              {/* console header */}
              <div className={`flex items-center justify-between pb-5 mb-6 border-b ${hairBorder}`}>
                <span className={`font-mono text-[0.7rem] tracking-[0.04em] uppercase ${mutedText}`}>
                  // transmission
                </span>
                <span className="flex items-center gap-2">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-dark-ink" : "bg-black"}`}
                  />
                  <span className={`font-mono text-[0.65rem] uppercase ${mutedText}`}>ready</span>
                </span>
              </div>

              <AnimatePresence>
                {particles.map((p) => (
                  <Particle key={p.id} p={p} isDark={isDark} />
                ))}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-14 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 16 }}
                      className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 ${isDark ? "bg-dark-ink" : "bg-black"}`}
                    >
                      <Check className={isDark ? "text-carbon" : "text-paper"} size={26} />
                    </motion.div>
                    <h3 className={`font-display text-2xl font-semibold mb-2 ${inkText}`}>
                      Message sent<span className={mutedText}>.</span>
                    </h3>
                    <p className={`text-sm ${mutedText}`}>I'll get back to you soon. Thanks for reaching out.</p>
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
                    {fieldWrap(
                      "Name",
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className={inputClasses}
                      />,
                    )}
                    {fieldWrap(
                      "Email",
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className={inputClasses}
                      />,
                    )}
                    {fieldWrap(
                      "Message",
                      <textarea
                        placeholder="Tell me about your project..."
                        rows={4}
                        value={formData.body}
                        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                        required
                        className={`${inputClasses} resize-none`}
                      />,
                    )}

                    {/* Human check */}
                    <button
                      type="button"
                      onMouseDown={startHold}
                      onMouseUp={stopHold}
                      onMouseLeave={stopHold}
                      onTouchStart={startHold}
                      onTouchEnd={stopHold}
                      className={`relative w-full py-3 rounded-md text-xs font-mono tracking-[0.02em] flex items-center justify-center gap-2 overflow-hidden cursor-pointer border transition-colors duration-300 ${
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
                        className={`absolute left-0 top-0 h-full transition-all duration-75 ${isDark ? "bg-dark-ink/12" : "bg-black/8"}`}
                        style={{ width: `${holdProgress}%` }}
                      />
                      <span className="relative z-10">
                        {humanCheck ? "[✓] human presence confirmed" : "[ ] hold to confirm you're human"}
                      </span>
                    </button>

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
                      className={`relative w-full py-3.5 rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-300 ${
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
                      {sending ? "Transmitting..." : "Send Message"}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="relative mt-28 md:mt-36">
        <div className={`border-t border-dotted ${isDark ? "border-dark-line" : "border-line"}`}>
          <div className="relative overflow-hidden mx-auto max-w-7xl px-6 lg:px-8 py-14">
            {/* graph accent */}
            <div className={`pointer-events-none absolute top-8 right-6 lg:right-10 hidden md:block w-[380px] lg:w-[460px] z-0 ${isDark ? "text-dark-muted" : "text-muted"}`}>
              <NodeGraph variant="wide" className="w-full h-auto" />
            </div>

            <div className="relative z-10">
            {/* top row */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
              <div>
                <button onClick={() => scrollTo("hero")} className="cursor-pointer text-left">
                  <h3
                    className={`font-display font-semibold tracking-[-0.02em] leading-none ${inkText}`}
                    style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
                  >
                    Rustine Dave<span className={mutedText}>.</span>
                  </h3>
                </button>
                <p className={`mt-4 font-mono text-[0.7rem] tracking-[0.04em] uppercase ${mutedText}`}>
                  AI-Augmented Software Engineer · /ai-augmented-swe
                </p>
              </div>

              <Magnetic className="inline-flex self-start md:self-auto">
                <motion.button
                  onClick={scrollTop}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Back to top"
                  className={`group inline-flex items-center gap-3 px-5 py-3 rounded-md border text-sm font-mono transition-colors duration-300 ${
                    isDark
                      ? "bg-dark-elevated border-dark-line text-dark-muted hover:text-dark-ink hover:border-dark-ink"
                      : "bg-paper border-line text-muted hover:text-black hover:border-black"
                  }`}
                >
                  back to top
                  <ArrowUp size={15} className="group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </Magnetic>
            </div>

            {/* nav + socials */}
            <div className={`mt-12 pt-8 border-t border-dotted ${isDark ? "border-dark-line" : "border-line"} flex flex-col sm:flex-row sm:items-center justify-between gap-6`}>
              <nav className="flex items-center gap-6">
                {NAV.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => scrollTo(n.id)}
                    className={`font-mono text-xs tracking-[0.02em] uppercase cursor-pointer transition-colors ${mutedText} ${hoverInk}`}
                  >
                    {n.label}
                  </button>
                ))}
              </nav>
              <div className="flex items-center gap-4">
                {SOCIALS.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    whileHover={{ y: -3 }}
                    className={`${mutedText} ${hoverInk} transition-colors`}
                  >
                    <s.icon size={17} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* baseline */}
            <div className={`mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[0.65rem] tracking-[0.04em] uppercase ${mutedText}`}>
              <span>&copy; {new Date().getFullYear()} Rustine Dave</span>
              <span>speed × structure</span>
              <span>X0 Y0 · EOF</span>
            </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
