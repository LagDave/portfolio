import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useInView } from "../hooks/useInView";

/* ───────────────────────────────────────────────
   The Engineering Blueprint — monochrome WebGL scene.
   A slowly rotating wireframe geode + a sparse point
   field, ink-on-paper (inverts in dark). Pointer-reactive.
   Degrades to a single static frame under reduced motion.
   ─────────────────────────────────────────────── */

interface SceneProps {
  isDark: boolean;
  reduced: boolean;
  lowPower: boolean;
}

// Deterministic pseudo-random in [0,1) — keeps the particle layout stable
// across renders and avoids impure Math.random() calls during render.
const hash = (n: number) => {
  const s = Math.sin(n) * 43758.5453;
  return s - Math.floor(s);
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isLowPowerDevice = () => {
  if (typeof window === "undefined") return false;
  const cores = navigator.hardwareConcurrency ?? 8;
  return cores <= 4 || window.matchMedia("(pointer: coarse)").matches;
};

function Geode({ isDark, reduced }: { isDark: boolean; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const lineColor = isDark ? "#e0e0e0" : "#141414";

  // Two nested icosahedra rendered as clean wireframe.
  const inner = useMemo(() => new THREE.IcosahedronGeometry(1.45, 1), []);
  const outer = useMemo(() => new THREE.IcosahedronGeometry(2.15, 1), []);

  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    // Slow, confident rotation.
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x += delta * 0.02;
    // Pointer parallax — eases toward the cursor.
    const px = state.pointer.x * 0.35;
    const py = state.pointer.y * 0.25;
    group.current.position.x += (px - group.current.position.x) * 0.04;
    group.current.position.y += (py - group.current.position.y) * 0.04;
  });

  return (
    <group ref={group}>
      <lineSegments>
        <wireframeGeometry args={[inner]} />
        <lineBasicMaterial color={lineColor} transparent opacity={0.55} />
      </lineSegments>
      <lineSegments rotation={[0.4, 0.2, 0.1]}>
        <wireframeGeometry args={[outer]} />
        <lineBasicMaterial color={lineColor} transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

function ParticleField({
  isDark,
  reduced,
  count,
}: {
  isDark: boolean;
  reduced: boolean;
  count: number;
}) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute on a spherical shell with jitter (deterministic).
      const r = 3.4 + hash(i * 1.13 + 0.5) * 2.6;
      const theta = hash(i * 2.39 + 1.7) * Math.PI * 2;
      const phi = Math.acos(2 * hash(i * 3.71 + 2.3) - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current || reduced) return;
    points.current.rotation.y -= delta * 0.015;
    points.current.rotation.x = state.pointer.y * 0.06;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={isDark ? "#7a7a7a" : "#a8a8a8"}
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.85}
      />
    </points>
  );
}

function Scene({ isDark, reduced, lowPower }: SceneProps) {
  return (
    <>
      <Geode isDark={isDark} reduced={reduced} />
      <ParticleField
        isDark={isDark}
        reduced={reduced}
        count={lowPower ? 120 : 300}
      />
    </>
  );
}

export default function BlueprintScene({ isDark }: { isDark: boolean }) {
  const [reduced, setReduced] = useState(prefersReducedMotion);
  const [lowPower] = useState(isLowPowerDevice);
  const { ref, inView } = useInView<HTMLDivElement>("250px");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        dpr={lowPower ? [1, 1.25] : [1, 1.8]}
        frameloop={reduced || !inView ? "demand" : "always"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
        aria-hidden="true"
      >
        <Suspense fallback={null}>
          <Scene isDark={isDark} reduced={reduced} lowPower={lowPower} />
        </Suspense>
      </Canvas>
    </div>
  );
}
