import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { featuredPhotos } from '../../data/photos';
import { sectionReveal } from '../../animations/transitions';
import { LazyImage } from '../ui/LazyImage';

gsap.registerPlugin(ScrollTrigger);

export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const photo = featuredPhotos[current];
  const total = featuredPhotos.length;

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;
    sectionReveal(sectionRef.current, headerRef.current);
  }, []);

  const animateTransition = useCallback(
    (nextIndex: number) => {
      if (isAnimating || !imageRef.current || !captionRef.current) return;
      setIsAnimating(true);

      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      tl.to([imageRef.current, captionRef.current], {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power2.in',
      })
        .call(() => setCurrent(nextIndex))
        .set([imageRef.current, captionRef.current], { y: -20 })
        .to([imageRef.current, captionRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        });

      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: (nextIndex + 1) / total,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    },
    [isAnimating, total]
  );

  const goNext = () => animateTransition(current === total - 1 ? 0 : current + 1);
  const goPrev = () => animateTransition(current === 0 ? total - 1 : current - 1);

  useEffect(() => {
    if (progressRef.current) {
      gsap.set(progressRef.current, { scaleX: (current + 1) / total });
    }
  }, [current, total]);

  if (!photo) return null;

  const indexLabel = String(current + 1).padStart(2, '0');
  const totalLabel = String(total).padStart(2, '0');

  return (
    <section
      id="work"
      ref={sectionRef}
      className="section-padding py-24 md:py-32 lg:py-40 max-w-container mx-auto"
      aria-label="Featured work"
    >
      <div ref={headerRef} className="mb-12 md:mb-16">
        <p className="section-label mb-4">Featured Work</p>
        <h2 className="section-heading text-balance">
          A glimpse into the world
          <br />
          <span className="text-muted">through our lens.</span>
        </h2>
      </div>

      <div className="relative">
        <div
          ref={imageRef}
          className="relative overflow-hidden aspect-[16/10] md:aspect-[16/9] bg-surface"
          data-cursor="view"
        >
          <LazyImage
            key={photo.id}
            src={photo.image}
            alt={photo.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
          />
        </div>

        <div ref={captionRef} className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-sm text-muted tracking-widest mb-2">
              {indexLabel} / {totalLabel}
            </p>
            <h3 className="font-display text-2xl md:text-3xl">{photo.title}</h3>
            <p className="text-muted mt-1 text-sm uppercase tracking-[0.15em]">
              {photo.category}
              {photo.location ? ` — ${photo.location}` : ''}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={goPrev}
              className="p-3 border border-border hover:border-primary transition-colors"
              aria-label="Previous featured photograph"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goNext}
              className="p-3 border border-border hover:border-primary transition-colors"
              aria-label="Next featured photograph"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="mt-6 h-px bg-border overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-primary origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </section>
  );
}
