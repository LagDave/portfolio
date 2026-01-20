import React, { useState, useRef } from "react";
import AnimatedSection from "./ui/AnimatedSection";
import { SOCIAL_LINKS } from "../constants";
import { Send, ArrowUpRight, Loader2, Check } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", body: "" });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "captcha_error"
  >("idle");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const captchaTokenRef = useRef<string | null>(null);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaLoading(false);
    if (token) {
      captchaTokenRef.current = token;
      setCaptchaVerified(true);
    } else {
      captchaTokenRef.current = null;
      setCaptchaVerified(false);
    }
  };

  const handleCaptchaClick = () => {
    if (captchaVerified) return;
    setCaptchaLoading(true);
    recaptchaRef.current?.execute();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified || !captchaTokenRef.current) {
      setStatus("captcha_error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("loading");
    try {
      await axios.post(
        "https://hook.eu1.make.com/1vxq2sl9wckyzdehj94mrciu5w4daddn",
        { ...formData, recaptchaToken: captchaTokenRef.current },
      );
      setStatus("success");
      setFormData({ name: "", email: "", body: "" });
      recaptchaRef.current?.reset();
      captchaTokenRef.current = null;
      setCaptchaVerified(false);
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      recaptchaRef.current?.reset();
      captchaTokenRef.current = null;
      setCaptchaVerified(false);
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div
      id="contact"
      className="scroll-mt-24 w-full bg-slate-50 dark:bg-[#0a0a0a] py-12 md:py-24 border-t border-slate-200 dark:border-white/5"
    >
      <AnimatedSection className="py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-12 md:mb-24">
          {/* Contact Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h2
                className="text-3xl md:text-7xl mb-4 md:mb-8 text-slate-900 dark:text-white tracking-tight"
                style={{
                  fontFamily: '"Polysans Bulky", sans-serif',
                  fontWeight: 400,
                }}
              >
                Let's build something fun
                <span className="text-blue-600">.</span>
              </h2>
              <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 mb-6 md:mb-12 max-w-md leading-relaxed">
                Always open to product ideas, AI-driven builds, and meaningful
                partnerships. If you want to create something functional, fun,
                and never boring, let's do it.
              </p>

              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center space-x-2 bg-white dark:bg-white/5 hover:bg-slate-900 hover:text-white dark:hover:bg-white text-slate-900 dark:text-white dark:hover:text-black px-5 py-3 rounded-full transition-all duration-300 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-lg"
                  >
                    {link.icon && <span className="w-5 h-5">{link.icon}</span>}
                    <span className="font-semibold">{link.platform}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-white/5 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none">
            <h3
              className="text-2xl mb-8 text-slate-900 dark:text-white"
              style={{
                fontFamily: '"Polysans Bulky", sans-serif',
                fontWeight: 400,
              }}
            >
              Get in Touch<span className="text-blue-600">.</span>
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-slate-50 dark:bg-black/50 border border-slate-900 dark:border-white/20 rounded-xl px-4 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white/40 focus:bg-white dark:focus:bg-black transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-slate-50 dark:bg-black/50 border border-slate-900 dark:border-white/20 rounded-xl px-4 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white/40 focus:bg-white dark:focus:bg-black transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.body}
                  onChange={(e) =>
                    setFormData({ ...formData, body: e.target.value })
                  }
                  className="w-full bg-slate-50 dark:bg-black/50 border border-slate-900 dark:border-white/20 rounded-xl px-4 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white/40 focus:bg-white dark:focus:bg-black transition-all resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              {/* Custom reCAPTCHA Checkbox */}
              <div
                onClick={handleCaptchaClick}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  captchaVerified
                    ? "bg-slate-100 dark:bg-white/10 border-slate-900 dark:border-white"
                    : "bg-slate-50 dark:bg-black/50 border-slate-200 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/40"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                    captchaVerified
                      ? "bg-slate-900 border-slate-900 dark:bg-white dark:border-white"
                      : "border-slate-400 dark:border-white/40"
                  }`}
                >
                  {captchaLoading ? (
                    <Loader2
                      size={14}
                      className="text-slate-600 dark:text-white animate-spin"
                    />
                  ) : captchaVerified ? (
                    <Check size={14} className="text-white dark:text-black" />
                  ) : null}
                </div>
                <span
                  className={`text-sm font-medium ${
                    captchaVerified
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {captchaLoading
                    ? "Verifying..."
                    : captchaVerified
                      ? "A human presence has been confirmed."
                      : "Touch so I can sense your human spark"}
                </span>
              </div>

              {/* Invisible reCAPTCHA - hidden badge */}
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={handleCaptchaChange}
                size="invisible"
                badge="bottomright"
              />

              <button
                type="submit"
                disabled={status === "loading" || !captchaVerified}
                className="group relative w-full bg-slate-900 dark:bg-white text-white dark:text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-xl shadow-slate-900/10 active:scale-[0.98] transform duration-100 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="relative z-10 animate-spin" />
                    <span className="relative z-10">Sending...</span>
                  </>
                ) : status === "success" ? (
                  <>
                    <Check size={18} className="relative z-10" />
                    <span className="relative z-10">Sent!</span>
                  </>
                ) : status === "error" ? (
                  <span className="relative z-10">Error - Try Again</span>
                ) : status === "captcha_error" ? (
                  <span className="relative z-10">
                    Please verify you're not a robot
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">Send Message</span>
                    <Send size={18} className="relative z-10" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-400 dark:text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} Rustine Dave. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with React & Tailwind</p>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Contact;
