import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../../data/site';
import { createHeroScrollAnimation } from '../../animations/heroAnimations';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useWebGLSupport } from '../../hooks/useWebGLSupport';
import { HeroScene } from '../../three/HeroScene';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { LazyImage } from '../ui/LazyImage';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { normalizedX, normalizedY } = useMousePosition();
  const [scrollProgress, setScrollProgress] = useState(0);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const webglSupported = useWebGLSupport();

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const trigger = createHeroScrollAnimation(
      sectionRef.current,
      contentRef.current,
      setScrollProgress
    );

    gsap.from(contentRef.current.children, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.3,
    });

    return () => trigger.kill();
  }, []);

  const openAmount = Math.min(scrollProgress * 2, 1);

  const handleExplore = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-[200vh]"
      aria-label="Hero"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {webglSupported ? (
          <ErrorBoundary
            fallback={
              <div className="absolute inset-0">
                <LazyImage
                  src="/images/hero/hero-01.svg"
                  alt="Yellow Box Production hero photograph"
                  className="w-full h-full object-cover opacity-60"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
              </div>
            }
          >
            <HeroScene
              mouseX={normalizedX}
              mouseY={normalizedY}
              scrollProgress={scrollProgress}
              openAmount={openAmount}
              reducedMotion={reducedMotion}
            />
          </ErrorBoundary>
        ) : (
          <div className="absolute inset-0">
            <LazyImage
              src="/images/hero/hero-01.svg"
              alt="Yellow Box Production hero photograph"
              className="w-full h-full object-cover opacity-60"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
          </div>
        )}

        <div
          ref={contentRef}
          className="relative z-10 h-full flex flex-col justify-center section-padding max-w-container mx-auto pointer-events-none"
        >
          <div className="pointer-events-auto max-w-2xl">
            <p className="section-label mb-4">Yellow Box</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-none mb-6">
              YELLOW BOX
              <br />
              <span className="text-muted">PRODUCTION</span>
            </h1>
            <p className="section-subheading mb-10">{siteConfig.tagline}</p>
            <button
              onClick={handleExplore}
              className="btn-primary"
              data-cursor="link"
            >
              Explore Work
            </button>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted pointer-events-none">
            <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
            <ChevronDown size={16} className="animate-bounce" />
          </div>
        </div>

        {!isMobile && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
        )}
      </div>
    </section>
  );
}
