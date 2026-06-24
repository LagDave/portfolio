import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

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
      // Distribute on a spherical shell with jitter.
      const r = 3.4 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
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
  const [reduced, setReduced] = useState(false);
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);

    const cores = navigator.hardwareConcurrency ?? 8;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setLowPower(cores <= 4 || coarse);

    return () => mq.removeEventListener("change", set);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      dpr={lowPower ? [1, 1.25] : [1, 1.8]}
      frameloop={reduced ? "demand" : "always"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Scene isDark={isDark} reduced={reduced} lowPower={lowPower} />
      </Suspense>
    </Canvas>
  );
}
