import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import { featuredPhotos } from '../data/photos';
import { getDeviceProfile } from '../utils/device';
import { CameraRig } from './CameraRig';
import { FloatingPhoto } from './FloatingPhoto';
import { Particles } from './Particles';
import { SceneEnvironment } from './SceneEnvironment';
import { YellowBox } from './YellowBox';

interface HeroSceneProps {
  mouseX?: number;
  mouseY?: number;
  scrollProgress?: number;
  openAmount?: number;
  reducedMotion?: boolean;
}

function HeroSceneContent({
  mouseX = 0,
  mouseY = 0,
  scrollProgress = 0,
  openAmount = 0,
  reducedMotion = false,
}: HeroSceneProps) {
  const profile = useMemo(() => getDeviceProfile(), []);
  const floatingImages = featuredPhotos.slice(0, profile.floatingPhotoCount);

  const floatPositions: [number, number, number][] = useMemo(
    () => [
      [-2.2, 0.8, -0.5],
      [2.4, 0.3, 0.2],
      [-1.8, -0.6, 0.8],
      [2.0, -0.4, -0.3],
      [-2.5, 0.1, 0.5],
      [1.6, 1.0, -0.8],
    ],
    []
  );

  return (
    <>
      <SceneEnvironment />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-3, 2, 2]} intensity={0.4} color="#ffc700" />

      <CameraRig
        mouseX={mouseX}
        mouseY={mouseY}
        scrollProgress={scrollProgress}
        mode="hero"
        reducedMotion={reducedMotion}
      />

      <YellowBox
        openAmount={openAmount}
        reducedMotion={reducedMotion}
        rotation={[0.1, 0.3, 0]}
        autoRotate={openAmount < 0.5}
      />

      {floatingImages.map((photo, i) => (
        <FloatingPhoto
          key={photo.id}
          image={photo.image}
          position={floatPositions[i] ?? [0, 0, 0]}
          rotation={[0, (i % 2 === 0 ? 1 : -1) * 0.3, 0]}
          scale={0.9 + (i % 3) * 0.1}
          floatSpeed={0.8 + i * 0.1}
          floatOffset={i * 1.5}
          scrollProgress={scrollProgress}
          reducedMotion={reducedMotion}
        />
      ))}

      <Particles count={profile.particleCount} reducedMotion={reducedMotion} />
    </>
  );
}

export function HeroScene(props: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <HeroSceneContent {...props} />
      </Suspense>
    </Canvas>
  );
}
