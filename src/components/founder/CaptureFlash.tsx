import gsap from 'gsap';
import { useEffect, useRef } from 'react';

interface CaptureFlashProps {
  active: boolean;
  reducedMotion: boolean;
}

export function CaptureFlash({ active, reducedMotion }: CaptureFlashProps) {
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !flashRef.current) return;
    gsap.fromTo(
      flashRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: reducedMotion ? 0 : 0.06, yoyo: true, repeat: 1, repeatDelay: reducedMotion ? 0 : 0.04 }
    );
  }, [active, reducedMotion]);

  return <div ref={flashRef} className="fixed inset-0 z-[10001] bg-white pointer-events-none invisible" aria-hidden="true" />;
}
