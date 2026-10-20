import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { usePrefersFinePointer } from '../../hooks/useMediaQuery';
import { useMousePosition } from '../../hooks/useMousePosition';

type CursorMode = 'default' | 'view' | 'explore' | 'link';

export function CustomCursor() {
  const finePointer = usePrefersFinePointer();
  const { x, y } = useMousePosition();
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<CursorMode>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!finePointer) return;

    document.body.classList.add('custom-cursor-active');

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="view"]')) setMode('view');
      else if (target.closest('[data-cursor="explore"]')) setMode('explore');
      else if (target.closest('a, button, [role="button"]')) setMode('link');
      else setMode('default');
    };

    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);

    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseenter', handleEnter);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [finePointer]);

  useEffect(() => {
    if (!finePointer || !cursorRef.current) return;

    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.15,
      ease: 'power3.out',
    });
  }, [x, y, finePointer]);

  useEffect(() => {
    if (!finePointer || !cursorRef.current) return;

    const scale = mode === 'link' ? 2.5 : mode === 'view' || mode === 'explore' ? 3 : 1;
    gsap.to(cursorRef.current, {
      scale,
      duration: 0.3,
      ease: 'power2.out',
    });

    if (labelRef.current) {
      const label = mode === 'view' ? 'VIEW' : mode === 'explore' ? 'EXPLORE' : '';
      labelRef.current.textContent = label;
    }
  }, [mode, finePointer]);

  if (!finePointer) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
      style={{
        transform: 'translate(-50%, -50%)',
        opacity: visible ? 1 : 0,
      }}
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center">
        <div
          className={`rounded-full bg-primary transition-all duration-300 ${
            mode === 'default' ? 'w-2 h-2' : 'w-12 h-12 bg-transparent border border-primary'
          }`}
        />
        {(mode === 'view' || mode === 'explore') && (
          <span
            ref={labelRef}
            className="absolute text-[9px] tracking-[0.25em] font-display text-primary whitespace-nowrap"
          />
        )}
      </div>
    </div>
  );
}
