import { useEffect, useRef, useState } from "react";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Technologies from "./components/Technologies";
import SpeedWithStructure from "./components/SpeedWithStructure";
import Contact from "./components/Contact";

// Konami code Easter egg
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function App() {
  const { isDark, toggle } = useTheme();
  const [devMode, setDevMode] = useState(false);
  const konamiIndex = useRef(0);
  const frameCount = useRef(0);
  const [fps, setFps] = useState(0);

  // Konami code detection
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[konamiIndex.current]) {
        konamiIndex.current++;
        if (konamiIndex.current === KONAMI.length) {
          setDevMode((d) => !d);
          konamiIndex.current = 0;
        }
      } else {
        konamiIndex.current = 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // FPS counter for dev mode
  useEffect(() => {
    if (!devMode) return;
    let animId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      frameCount.current++;
      if (now - lastTime >= 1000) {
        setFps(frameCount.current);
        frameCount.current = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [devMode]);

  return (
    <div
      className={`noise-overlay relative ${
        isDark ? "bg-surface-dark text-white" : "bg-surface-light text-gray-900"
      }`}
    >
      {/* Dev mode overlay */}
      {devMode && (
        <div className="fixed top-20 right-4 z-[9999] font-mono text-xs text-electric bg-black/80 border border-electric/30 rounded-xl p-4 space-y-1 backdrop-blur-sm">
          <div className="text-electric font-bold mb-2">// DEV MODE</div>
          <div>FPS: {fps}</div>
          <div>Theme: {isDark ? "dark" : "light"}</div>
          <div>Viewport: {typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : ""}</div>
          <div className="text-white/30 mt-2">Konami to toggle</div>
        </div>
      )}

      <Navbar isDark={isDark} toggleTheme={toggle} />
      <Hero isDark={isDark} />
      <About isDark={isDark} />
      <SpeedWithStructure isDark={isDark} />
      <Experience isDark={isDark} />
      <Technologies isDark={isDark} />
      <Contact isDark={isDark} />
    </div>
  );
}
