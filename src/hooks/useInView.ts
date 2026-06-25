import { useEffect, useRef, useState } from "react";

/**
 * Reports whether the referenced element is near/within the viewport.
 * Used to pause offscreen WebGL canvases (frameloop gating) so multiple
 * Three.js scenes don't all render at once.
 */
export function useInView<T extends HTMLElement>(rootMargin = "250px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
