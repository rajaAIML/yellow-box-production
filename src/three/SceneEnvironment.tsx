import { Environment } from '@react-three/drei';

export function SceneEnvironment() {
  return (
    <>
      <color attach="background" args={['#0a0a0a']} />
      <fog attach="fog" args={['#0a0a0a', 8, 24]} />
      <Environment preset="city" environmentIntensity={0.15} />
    </>
  );
}
