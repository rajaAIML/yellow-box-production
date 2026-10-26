import gsap from 'gsap';
import { useEffect, useRef } from 'react';

interface FounderPortraitOverlayProps {
  open: boolean;
  onClose: () => void;
  reducedMotion: boolean;
}

const founderPortrait = '/images/founder.jpg';

export function FounderPortraitOverlay({ open, onClose, reducedMotion }: FounderPortraitOverlayProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab' && contentRef.current) {
        const focusable = contentRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !contentRef.current || reducedMotion) return;
    gsap.fromTo(contentRef.current, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.48, ease: 'power3.out' });
  }, [open, reducedMotion]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-5 md:p-10 bg-background/90 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="founder-portrait-title" onMouseDown={(event) => { if (!contentRef.current?.contains(event.target as Node)) onClose(); }}>
      <div ref={contentRef} className="relative w-full max-w-4xl max-h-full">
        <img src={founderPortrait} alt="CEO of Yellow Box Production" className="w-full max-h-[82vh] object-cover object-center shadow-2xl" />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
          <p className="font-display text-xs tracking-[0.3em] uppercase text-primary">Yellow Box Production</p>
          <h2 id="founder-portrait-title" className="mt-2 font-display text-2xl md:text-3xl">CEO</h2>
          <p className="mt-2 text-sm text-white/75">The vision behind every frame and every story.</p>
        </div>
        <button ref={closeRef} type="button" onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-background text-foreground text-xl shadow-lg focus-visible:outline-primary" aria-label="Close founder portrait">×</button>
      </div>
    </div>
  );
}
