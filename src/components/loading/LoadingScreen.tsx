import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const duration = reducedMotion ? 0.8 : 2.2;
    const obj = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    if (boxRef.current && !reducedMotion) {
      gsap.to(boxRef.current, {
        rotationY: 360,
        duration: 3,
        repeat: -1,
        ease: 'none',
      });
    }

    tl.to(obj, {
      value: 100,
      duration,
      ease: 'power2.inOut',
      onUpdate: () => setProgress(Math.round(obj.value)),
    });

    if (progressRef.current) {
      tl.to(
        progressRef.current,
        { scaleX: 1, duration, ease: 'power2.inOut' },
        0
      );
    }

    return () => {
      tl.kill();
    };
  }, [onComplete, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="relative mb-12" style={{ perspective: '700px' }}>
        <div
          ref={boxRef}
          className="relative w-[72px] h-[72px]"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="absolute inset-0 border border-[#ffd84d] bg-primary"
            style={{ transform: 'translateZ(36px)', boxShadow: 'inset 0 0 20px rgba(255,255,255,.28)' }}
          />
          <div className="absolute inset-0 border border-[#b78700] bg-[#d9a900]"
            style={{ transform: 'rotateY(90deg) translateZ(36px)' }}
          />
          <div className="absolute inset-0 border border-[#8f6c00] bg-[#b88c00]"
            style={{ transform: 'rotateX(90deg) translateZ(36px)' }}
          />
          <div className="absolute left-2 right-2 top-[34px] h-px bg-[#8f6c00]"
            style={{ transform: 'translateZ(37px)' }}
          />
          <div className="absolute left-2 right-2 top-[35px] text-center text-[7px] font-bold tracking-[.35em] text-[#15120a]"
            style={{ transform: 'translateZ(38px)' }}
          >
            YB
          </div>
        </div>
        <div className="absolute inset-x-0 -bottom-5 mx-auto h-3 w-24 rounded-[100%] bg-primary/20 blur-md" />
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-primary text-xs">◇</span>
      </div>

      <div className="text-center mb-8">
        <p className="font-display text-sm tracking-[0.5em] text-primary mb-1">YELLOW</p>
        <p className="font-display text-sm tracking-[0.5em] text-primary mb-6">BOX</p>
        <p className="font-display text-xs tracking-[0.6em] text-muted mb-1">YELLOW BOX</p>
        <p className="font-display text-xs tracking-[0.4em] text-muted">P R O D U C T I O N</p>
      </div>

      <div className="w-48 h-px bg-border relative overflow-hidden mb-4">
        <div
          ref={progressRef}
          className="absolute inset-y-0 left-0 bg-primary origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      <p className="text-xs tracking-[0.3em] text-muted uppercase">
        Loading {progress}%
      </p>
    </div>
  );
}
