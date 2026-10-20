import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function createGalleryScrollAnimation(
  sectionRef: HTMLElement,
  onProgress: (progress: number) => void
): ScrollTrigger {
  return ScrollTrigger.create({
    trigger: sectionRef,
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
    onUpdate: (self) => onProgress(self.progress),
  });
}
