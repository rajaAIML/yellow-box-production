import { ChevronDown } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { siteConfig } from '../../data/site';
import { usePrefersFinePointer } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { CaptureFlash } from '../founder/CaptureFlash';
import { FounderCursor } from '../founder/FounderCursor';
import { FounderPortraitOverlay } from '../founder/FounderPortraitOverlay';

export function HeroSection() {
  const captureAreaRef = useRef<HTMLDivElement>(null);
  const [cursorActive, setCursorActive] = useState(false);
  const [portraitOpen, setPortraitOpen] = useState(false);
  const [flashKey, setFlashKey] = useState(0);
  const reducedMotion = useReducedMotion();
  const finePointer = usePrefersFinePointer();

  const handleExplore = () => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });

  const handleCapture = useCallback(() => {
    if (portraitOpen) return;
    setFlashKey((key) => key + 1);
    window.setTimeout(() => setPortraitOpen(true), reducedMotion ? 0 : 130);
  }, [portraitOpen, reducedMotion]);

  return (
    <section id="home" className="relative h-[140vh] bg-background" aria-label="Hero">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={captureAreaRef}
          className="founder-capture-area absolute inset-0 hidden md:block"
          onPointerEnter={() => finePointer && setCursorActive(true)}
          onPointerLeave={() => setCursorActive(false)}
          onClick={handleCapture}
          aria-hidden="true"
        />
        <div className="absolute right-0 top-0 h-full w-[48%] hidden md:block pointer-events-none">
          <div className="absolute inset-y-[8%] left-[12%] right-0 overflow-hidden bg-surface">
            <img src="/images/founder.jpg" alt="" className="w-full h-full object-cover object-center grayscale-[15%]" />
          </div>
          <div className="absolute inset-y-[8%] left-[12%] right-0 border border-foreground/15" />
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-transparent via-background/15 to-background pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col justify-center section-padding max-w-container mx-auto pointer-events-none text-foreground">
          <div className="pointer-events-auto max-w-2xl">
            <p className="section-label mb-4">Yellow Box Production</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-none mb-6">
              Life happens.
              <br />
              <span className="text-muted">We capture it.</span>
            </h1>
            <p className="section-subheading mb-10 text-foreground/80">{siteConfig.tagline} Photography, film, and visual stories made with intent.</p>
            <button onClick={handleExplore} className="btn-primary">Explore Work</button>
            <button type="button" onClick={handleCapture} className="mt-5 flex md:hidden items-center gap-3 text-left text-xs tracking-[0.2em] uppercase text-muted hover:text-primary transition-colors" aria-label="Capture founder portrait">
              <span className="w-9 h-9 rounded-full overflow-hidden border border-primary/70"><img src="/images/founder.jpg" alt="" className="w-full h-full object-cover" /></span>
              Capture the founder portrait
            </button>
          </div>
          <p className="hidden md:block absolute bottom-12 right-12 lg:right-16 font-display text-[10px] tracking-[0.3em] uppercase text-muted pointer-events-none">Move to focus · click to capture</p>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted pointer-events-none">
            <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
            <ChevronDown size={16} className="animate-bounce" />
          </div>
        </div>
      </div>
      <FounderCursor active={cursorActive && !portraitOpen} target={captureAreaRef.current} reducedMotion={reducedMotion} />
      <CaptureFlash key={flashKey} active={flashKey > 0} reducedMotion={reducedMotion} />
      <FounderPortraitOverlay open={portraitOpen} onClose={() => setPortraitOpen(false)} reducedMotion={reducedMotion} />
    </section>
  );
}
