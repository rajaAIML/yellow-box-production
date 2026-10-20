import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function createHeroScrollAnimation(
  heroRef: HTMLElement,
  contentRef: HTMLElement,
  onProgress?: (progress: number) => void
): ScrollTrigger {
  return ScrollTrigger.create({
    trigger: heroRef,
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    onUpdate: (self) => {
      onProgress?.(self.progress);
      gsap.to(contentRef, {
        opacity: 1 - self.progress * 1.5,
        y: self.progress * -80,
        duration: 0.1,
        overwrite: true,
      });
    },
  });
}
