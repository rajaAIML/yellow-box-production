import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { assetUrl } from '../../utils/assets';

interface FounderCursorProps {
  active: boolean;
  target: HTMLElement | null;
  reducedMotion: boolean;
}

const founderPortrait = assetUrl('/images/founder.jpg');

export function FounderCursor({ active, target, reducedMotion }: FounderCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!target || !cursorRef.current) return;

    const cursor = cursorRef.current;
    const moveX = gsap.quickTo(cursor, 'x', { duration: reducedMotion ? 0 : 0.18, ease: 'power3.out' });
    const moveY = gsap.quickTo(cursor, 'y', { duration: reducedMotion ? 0 : 0.18, ease: 'power3.out' });
    let previousX = 0;

    const handleMove = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
      const rotation = Math.max(-4, Math.min(4, (event.clientX - previousX) * 0.18));
      previousX = event.clientX;
      gsap.to(cursor, { rotate: reducedMotion ? 0 : rotation, duration: 0.28, overwrite: 'auto' });
    };

    target.addEventListener('pointermove', handleMove, { passive: true });
    return () => target.removeEventListener('pointermove', handleMove);
  }, [target, reducedMotion]);

  useEffect(() => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      autoAlpha: active ? 1 : 0,
      scale: active ? 1 : 0.86,
      duration: reducedMotion ? 0 : 0.18,
      ease: 'power2.out',
    });
  }, [active, reducedMotion]);

  return (
    <div ref={cursorRef} className="fixed top-0 left-0 z-[9999] pointer-events-none invisible" aria-hidden="true">
      <div className="relative w-16 h-16 -translate-x-1/2 -translate-y-1/2">
        <img src={founderPortrait} alt="" className="w-full h-full rounded-full object-cover border border-primary shadow-[0_12px_32px_rgba(26,25,21,0.24)]" />
        <span className="absolute -top-1 -left-1 w-4 h-4 border-l border-t border-foreground" />
        <span className="absolute -top-1 -right-1 w-4 h-4 border-r border-t border-foreground" />
        <span className="absolute -bottom-1 -left-1 w-4 h-4 border-l border-b border-foreground" />
        <span className="absolute -bottom-1 -right-1 w-4 h-4 border-r border-b border-foreground" />
      </div>
    </div>
  );
}
