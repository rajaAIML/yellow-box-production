import { useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import type { Photo } from '../data/photos';
import { photos } from '../data/photos';
import { CameraRig } from './CameraRig';
import { SceneEnvironment } from './SceneEnvironment';

interface GallerySceneProps {
  mouseX?: number;
  mouseY?: number;
  scrollProgress?: number;
  reducedMotion?: boolean;
  onPhotoClick?: (photo: Photo, index: number) => void;
  isMobile?: boolean;
}

interface PhotoPlaneProps {
  photo: Photo;
  position: [number, number, number];
  rotation: [number, number, number];
  onClick: () => void;
}

function PhotoPlaneItem({ photo, position, rotation, onClick }: PhotoPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(photo.thumbnail ?? photo.image);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetScale = hovered ? 1.08 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), delta * 5);
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[2.2, 1.5]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={hovered ? 1 : 0.85}
        roughness={0.35}
        metalness={0.05}
      />
    </mesh>
  );
}

function GalleryContent({
  mouseX = 0,
  mouseY = 0,
  scrollProgress = 0,
  reducedMotion = false,
  onPhotoClick,
}: GallerySceneProps) {
  const galleryPhotos = photos.slice(0, 12);

  const positions = useMemo(() => {
    const layout: [number, number, number][] = [];
    const rows = 4;
    for (let i = 0; i < galleryPhotos.length; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      layout.push([(col - 1) * 3.2, (rows - row) * 2.5 - 5, -row * 4 - col * 0.5]);
    }
    return layout;
  }, [galleryPhotos.length]);

  const rotations = useMemo(
    () =>
      galleryPhotos.map(
        (_, i) => [0, (i % 2 === 0 ? 1 : -1) * 0.12, 0] as [number, number, number]
      ),
    [galleryPhotos.length]
  );

  return (
    <>
      <SceneEnvironment />
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 2]} intensity={0.45} />
      <pointLight position={[0, 0, 3]} intensity={0.3} color="#ffc700" />

      <CameraRig
        mouseX={mouseX}
        mouseY={mouseY}
        scrollProgress={scrollProgress}
        mode="gallery"
        reducedMotion={reducedMotion}
      />

      {galleryPhotos.map((photo, i) => (
        <PhotoPlaneItem
          key={photo.id}
          photo={photo}
          position={positions[i] ?? [0, 0, 0]}
          rotation={rotations[i] ?? [0, 0, 0]}
          onClick={() => onPhotoClick?.(photo, i)}
        />
      ))}
    </>
  );
}

export function GalleryCanvas({
  isMobile = false,
  ...props
}: GallerySceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ height: isMobile ? '70vh' : '100vh', width: '100%' }}
    >
      <Suspense fallback={null}>
        <GalleryContent {...props} />
      </Suspense>
    </Canvas>
  );
}
