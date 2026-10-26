import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { siteConfig } from '../../data/site';
import { LazyImage } from '../ui/LazyImage';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current || !textRef.current) return;

    gsap.fromTo(
      imageRef.current,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      }
    );

    gsap.fromTo(
      textRef.current,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding py-24 md:py-32 lg:py-40 max-w-container mx-auto"
      aria-label="About Yellow Box Production"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden">
          <LazyImage
            src="/images/portraits/yellowboxproduction_1629913915_2648232324208393865_31970441824.jpg"
            alt="Yellow Box Production team portrait"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-16 h-px bg-primary" />
        </div>

        <div ref={textRef}>
          <p className="section-label mb-4">About Us</p>
          <h2 className="section-heading mb-8">
            Creative minds.
            <br />
            <span className="text-muted">Visual storytellers.</span>
          </h2>
          <p className="text-muted text-base md:text-lg leading-relaxed mb-8 max-w-md">
            {siteConfig.description}
          </p>
          <p className="text-sm text-muted tracking-[0.15em] uppercase">
            More than photography — a perspective.
          </p>
        </div>
      </div>
    </section>
  );
}
