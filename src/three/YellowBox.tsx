import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface YellowBoxProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  opacity?: number;
  openAmount?: number;
  autoRotate?: boolean;
  reducedMotion?: boolean;
}

export function YellowBox({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  opacity = 1,
  openAmount = 0,
  autoRotate = true,
  reducedMotion = false,
}: YellowBoxProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate && !reducedMotion) {
      groupRef.current.rotation.y += delta * 0.15;
    }
    if (lidRef.current) {
      const targetRotation = -openAmount * Math.PI * 0.55;
      lidRef.current.rotation.x = THREE.MathUtils.lerp(
        lidRef.current.rotation.x,
        targetRotation,
        0.08
      );
    }
  });

  const size = 1.55 * scale;
  const height = 0.98 * scale;
  const lidThickness = 0.13 * scale;
  const boxMaterial = {
    color: '#f5ba00',
    roughness: 0.5,
    metalness: 0.06,
    transparent: opacity < 1,
    opacity,
  };

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Solid cardboard body: bright enough to read clearly against the dark scene. */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[size, height, size]} />
        <meshStandardMaterial {...boxMaterial} />
      </mesh>
      <lineSegments position={[0, height / 2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(size, height, size)]} />
        <lineBasicMaterial color="#6c5000" transparent opacity={0.72 * opacity} />
      </lineSegments>

      {/* Packing-tape seams give the box a recognizable, physical construction. */}
      <mesh position={[0, height + 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.16 * scale, size]} />
        <meshStandardMaterial color="#9c7300" roughness={0.72} transparent opacity={0.9 * opacity} />
      </mesh>
      <mesh position={[0, height * 0.54, size / 2 + 0.008]}>
        <planeGeometry args={[0.025 * scale, height * 0.78]} />
        <meshBasicMaterial color="#6c5000" transparent opacity={0.65 * opacity} />
      </mesh>

      {/* The lid pivots from the rear edge as the hero is scrolled. */}
      <group ref={lidRef} position={[0, height, -size / 2]}>
        <mesh position={[0, lidThickness / 2, size / 2]} castShadow>
          <boxGeometry args={[size + 0.06 * scale, lidThickness, size + 0.06 * scale]} />
          <meshStandardMaterial color="#ffca18" roughness={0.42} metalness={0.04} transparent={opacity < 1} opacity={opacity} />
        </mesh>
        <lineSegments position={[0, lidThickness / 2, size / 2]}>
          <edgesGeometry args={[new THREE.BoxGeometry(size + 0.06 * scale, lidThickness, size + 0.06 * scale)]} />
          <lineBasicMaterial color="#6c5000" transparent opacity={0.68 * opacity} />
        </lineSegments>
      </group>

      <pointLight color="#ffc700" intensity={1.4 * opacity} distance={5} position={[-1.5, 2.5, 2]} />
    </group>
  );
}
