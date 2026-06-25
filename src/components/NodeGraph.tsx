import { motion, useReducedMotion } from "framer-motion";

/* ───────────────────────────────────────────────
   A small monochrome network graph — nodes wired by
   dotted edges. Edges fade/stagger in on view; a few
   "live" nodes pulse. Color follows currentColor.
   ─────────────────────────────────────────────── */

type Pt = { x: number; y: number };

const LAYOUTS: Record<
  string,
  { vb: string; nodes: Pt[]; edges: [number, number][]; pulse: number[] }
> = {
  cluster: {
    vb: "0 0 120 92",
    nodes: [
      { x: 12, y: 66 }, { x: 28, y: 30 }, { x: 44, y: 58 }, { x: 42, y: 16 },
      { x: 64, y: 40 }, { x: 60, y: 74 }, { x: 82, y: 24 }, { x: 88, y: 58 },
      { x: 106, y: 38 }, { x: 104, y: 72 }, { x: 24, y: 48 },
    ],
    edges: [
      [0, 10], [10, 1], [1, 3], [1, 2], [2, 4], [3, 4], [4, 5],
      [4, 6], [6, 8], [5, 7], [7, 8], [8, 9], [7, 9], [2, 5],
    ],
    pulse: [3, 4, 8],
  },
  wide: {
    vb: "0 0 200 56",
    nodes: [
      { x: 8, y: 40 }, { x: 26, y: 18 }, { x: 44, y: 44 }, { x: 62, y: 14 },
      { x: 80, y: 38 }, { x: 98, y: 22 }, { x: 116, y: 46 }, { x: 134, y: 16 },
      { x: 152, y: 42 }, { x: 170, y: 24 }, { x: 190, y: 44 },
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
      [8, 9], [9, 10], [1, 3], [3, 5], [5, 7], [2, 4], [7, 9],
    ],
    pulse: [3, 5, 9],
  },
};

export function NodeGraph({
  variant = "cluster",
  className,
}: {
  variant?: "cluster" | "wide";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { vb, nodes, edges, pulse } = LAYOUTS[variant];

  return (
    <svg viewBox={vb} className={className} fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {edges.map(([a, b], i) => (
        <motion.line
          key={`e${i}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="1.4 2.4"
          vectorEffect="non-scaling-stroke"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.55 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      {nodes.map((n, i) => {
        const isPulse = pulse.includes(i);
        return (
          <motion.circle
            key={`n${i}`}
            cx={n.x}
            cy={n.y}
            r={isPulse ? 1.7 : 1.1}
            fill="currentColor"
            initial={{ opacity: 0 }}
            whileInView={
              isPulse && !reduce ? { opacity: [1, 0.3, 1] } : { opacity: isPulse ? 1 : 0.8 }
            }
            viewport={{ once: true }}
            transition={
              isPulse && !reduce
                ? { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }
                : { duration: 0.5, delay: 0.3 + i * 0.05 }
            }
          />
        );
      })}
    </svg>
  );
}
