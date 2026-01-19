import React, { useState, useCallback } from "react";
import AnimatedSection from "./ui/AnimatedSection";
import { SOCIAL_LINKS } from "../constants";
import { Send, ArrowUpRight, Loader2, Check } from "lucide-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", body: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.error("reCAPTCHA not available");
      return;
    }

    setStatus("loading");

    try {
      const token = await executeRecaptcha("contact_form");

      await axios.post(
        "https://hook.eu1.make.com/1vxq2sl9wckyzdehj94mrciu5w4daddn",
        { ...formData, recaptchaToken: token }
      );
      setStatus("success");
      setFormData({ name: "", email: "", body: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }, [executeRecaptcha, formData]);

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
                Let's build something fun<span className="text-blue-600">.</span>
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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-black/50 border border-slate-900 dark:border-white/20 rounded-xl px-4 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white/40 focus:bg-white dark:focus:bg-black transition-all resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
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
