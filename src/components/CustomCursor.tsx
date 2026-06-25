import { useEffect, useRef } from "react";

/* ───────────────────────────────────────────────
   A custom cursor: a head dot that eases to the pointer,
   trailed by a chain of dots wired with a dotted polyline
   (a little polygon trail). Grows over interactive targets.
   Pointer-fine + non-reduced-motion only; otherwise the
   native cursor is left untouched.
   ─────────────────────────────────────────────── */

const COUNT = 7;

export default function CustomCursor() {
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGPolylineElement>(null);
  const headRef = useRef<SVGCircleElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const root = document.documentElement;
    root.classList.add("cursor-custom");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pts = Array.from({ length: COUNT }, () => ({ x: mouse.x, y: mouse.y }));
    let hovering = false;
    let visible = false;
    let raf = 0;

    const show = (v: boolean) => {
      visible = v;
      if (svgRef.current) svgRef.current.style.opacity = v ? "1" : "0";
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!visible) show(true);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      hovering = !!t?.closest("a, button, [role='button'], summary, .cursor-pointer");
    };
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) show(false);
    };

    // Click burst — small polygons pop around the cursor and fade immediately.
    const NS = "http://www.w3.org/2000/svg";
    const makeShape = (kind: number): SVGElement => {
      if (kind === 0) {
        const p = document.createElementNS(NS, "polygon");
        p.setAttribute("points", "0,-5 4.6,3.4 -4.6,3.4"); // triangle
        return p;
      }
      if (kind === 1) {
        const r = document.createElementNS(NS, "rect");
        r.setAttribute("x", "-3.4");
        r.setAttribute("y", "-3.4");
        r.setAttribute("width", "6.8");
        r.setAttribute("height", "6.8");
        return r;
      }
      if (kind === 2) {
        const p = document.createElementNS(NS, "polygon");
        p.setAttribute("points", "0,-5 5,0 0,5 -5,0"); // diamond
        return p;
      }
      if (kind === 3) {
        const l = document.createElementNS(NS, "line");
        l.setAttribute("x1", "-5");
        l.setAttribute("y1", "0");
        l.setAttribute("x2", "5");
        l.setAttribute("y2", "0");
        l.setAttribute("stroke", "#ffffff");
        l.setAttribute("stroke-width", "1.4");
        return l;
      }
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("r", "2.4");
      return c;
    };

    const burst = (x: number, y: number) => {
      const svg = svgRef.current;
      if (!svg) return;
      const N = 8;
      for (let k = 0; k < N; k++) {
        const kind = k % 5;
        const el = makeShape(kind);
        if (kind !== 3) el.setAttribute("fill", "#ffffff");
        el.style.transformBox = "fill-box";
        el.style.transformOrigin = "center";
        svg.appendChild(el);
        const ang = (k / N) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
        const dist = 24 + Math.random() * 26;
        const dx = Math.cos(ang) * dist;
        const dy = Math.sin(ang) * dist;
        const rot = Math.random() * 220 - 110;
        const anim = el.animate(
          [
            { transform: `translate(${x}px, ${y}px) rotate(0deg) scale(1)`, opacity: 0.95 },
            { transform: `translate(${x + dx}px, ${y + dy}px) rotate(${rot}deg) scale(0.25)`, opacity: 0 },
          ],
          { duration: 380 + Math.random() * 160, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
        );
        anim.onfinish = () => el.remove();
        anim.oncancel = () => el.remove();
      }
    };

    const onDown = (e: MouseEvent) => {
      if (!visible) show(true);
      burst(e.clientX, e.clientY);
    };

    const tick = () => {
      pts[0].x += (mouse.x - pts[0].x) * 0.4;
      pts[0].y += (mouse.y - pts[0].y) * 0.4;
      for (let i = 1; i < pts.length; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.34;
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.34;
      }
      if (lineRef.current) {
        lineRef.current.setAttribute("points", pts.map((p) => `${p.x},${p.y}`).join(" "));
      }
      for (let i = 0; i < pts.length; i++) {
        const c = dotRefs.current[i];
        if (c) {
          c.setAttribute("cx", String(pts[i].x));
          c.setAttribute("cy", String(pts[i].y));
        }
      }
      if (headRef.current) {
        headRef.current.setAttribute("cx", String(pts[0].x));
        headRef.current.setAttribute("cy", String(pts[0].y));
        headRef.current.setAttribute("r", hovering ? "18" : "8");
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      root.classList.remove("cursor-custom");
    };
  }, []);

  return (
    <svg ref={svgRef} className="custom-cursor" aria-hidden="true" style={{ opacity: 0 }}>
      <polyline ref={lineRef} />
      {Array.from({ length: COUNT }).map((_, i) => (
        <circle
          key={i}
          ref={(el) => {
            dotRefs.current[i] = el;
          }}
          r={Math.max(1.5, 5 - i * 0.5)}
          style={{ opacity: 1 - i * 0.11 }}
        />
      ))}
      <circle ref={headRef} className="cc-head" r="8" />
    </svg>
  );
}
