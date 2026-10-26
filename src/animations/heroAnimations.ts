import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function createHeroScrollAnimation(
  heroRef: HTMLElement,
  contentRef: HTMLElement,
  onProgress?: (progress: number) => void
): ScrollTrigger {
  // Reset any inline opacity left by a previous animation/HMR update. The hero
  // must never fade below readable contrast on the Electric Cinema background.
  gsap.set(contentRef, { opacity: 1 });

  return ScrollTrigger.create({
    trigger: heroRef,
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    onUpdate: (self) => {
      onProgress?.(self.progress);
      gsap.to(contentRef, {
        y: self.progress * -80,
        duration: 0.1,
        overwrite: true,
      });
    },
  });
}
