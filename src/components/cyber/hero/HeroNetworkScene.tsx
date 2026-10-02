import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const NODE_COORDINATES = [
  [0.2, 1.82, 0.8], [-1.35, 0.95, 1.03], [1.45, 0.7, 1.02], [-1.72, -0.18, 0.56],
  [1.68, -0.38, 0.45], [-0.82, -1.42, 0.92], [0.84, -1.53, 0.62], [0.05, 0.22, 1.94],
  [-0.58, 1.26, -1.42], [1.18, 1.04, -1.18], [-1.28, -0.92, -1.18], [1.34, -1.02, -0.94],
] as const;

const CONNECTIONS = [[0, 1], [0, 2], [1, 3], [1, 7], [2, 4], [2, 7], [3, 5], [4, 6], [5, 6], [7, 8], [8, 9], [9, 11], [10, 11]] as const;

function cssToken(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!value) return fallback;
  const [h, s, l] = value.split(/\s+/);
  return `hsl(${h}, ${s}, ${l})`;
}

function NetworkGlobe({ compact }: { compact: boolean }) {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.InstancedMesh>(null);
  const pointer = useRef(new THREE.Vector2());
  const { gl } = useThree();
  const colors = useMemo(() => ({
    primary: cssToken("--primary", "hsl(187, 100%, 50%)"),
    glow: cssToken("--primary-glow", "hsl(187, 100%, 65%)"),
    surface: cssToken("--surface", "hsl(215, 50%, 9%)"),
  }), []);

  const linePositions = useMemo(() => {
    const values: number[] = [];
    CONNECTIONS.forEach(([a, b]) => {
      values.push(...NODE_COORDINATES[a], ...NODE_COORDINATES[b]);
    });
    return new Float32Array(values);
  }, []);

  const particles = useMemo(() => {
    const count = compact ? 28 : 52;
    const values = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const angle = index * 2.39996;
      const radius = 2.65 + (index % 5) * 0.16;
      values[index * 3] = Math.cos(angle) * radius;
      values[index * 3 + 1] = ((index % 11) - 5) * 0.42;
      values[index * 3 + 2] = Math.sin(angle) * radius;
    }
    return values;
  }, [compact]);

  useEffect(() => {
    const mesh = nodes.current;
    if (!mesh) return;
    const matrix = new THREE.Matrix4();
    NODE_COORDINATES.forEach((position, index) => {
      matrix.setPosition(position[0], position[1], position[2]);
      mesh.setMatrixAt(index, matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  useEffect(() => {
    const element = gl.domElement;
    const onPointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      pointer.current.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    };
    element.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => element.removeEventListener("pointermove", onPointerMove);
  }, [gl]);

  useFrame((state, rawDelta) => {
    const target = group.current;
    if (!target) return;
    const delta = Math.min(rawDelta, 0.05);
    target.rotation.y += delta * 0.12;
    target.rotation.x += (pointer.current.y * 0.1 - target.rotation.x) * (1 - Math.exp(-2.8 * delta));
    target.rotation.z += (-pointer.current.x * 0.08 - target.rotation.z) * (1 - Math.exp(-2.8 * delta));
    state.camera.position.x += (pointer.current.x * 0.18 - state.camera.position.x) * (1 - Math.exp(-2 * delta));
  });

  return (
    <group ref={group} rotation={[0.18, -0.35, 0]}>
      <mesh>
        <icosahedronGeometry args={[2, compact ? 2 : 3]} />
        <meshBasicMaterial color={colors.surface} wireframe transparent opacity={0.32} />
      </mesh>
      <mesh scale={1.012}>
        <sphereGeometry args={[2, compact ? 20 : 28, compact ? 12 : 18]} />
        <meshBasicMaterial color={colors.primary} wireframe transparent opacity={0.14} />
      </mesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={colors.primary} transparent opacity={0.72} />
      </lineSegments>
      <instancedMesh ref={nodes} args={[undefined, undefined, NODE_COORDINATES.length]}>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshBasicMaterial color={colors.glow} />
      </instancedMesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial color={colors.primary} size={compact ? 0.025 : 0.035} transparent opacity={0.55} sizeAttenuation />
      </points>
      <mesh rotation={[Math.PI / 2.4, 0, Math.PI / 7]}>
        <torusGeometry args={[2.55, 0.012, 4, 96]} />
        <meshBasicMaterial color={colors.primary} transparent opacity={0.38} />
      </mesh>
    </group>
  );
}

export default function HeroNetworkScene({ compact }: { compact: boolean }) {
  return (
    <Canvas
      aria-hidden="true"
      dpr={compact ? 1 : [1, 1.35]}
      camera={{ position: [0, 0, 6.2], fov: 44 }}
      gl={{ antialias: !compact, alpha: true, powerPreference: compact ? "low-power" : "high-performance" }}
    >
      <NetworkGlobe compact={compact} />
    </Canvas>
  );
}
