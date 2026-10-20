import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function fadeInUp(
  element: HTMLElement | HTMLElement[],
  options?: { delay?: number; duration?: number; y?: number }
): gsap.core.Tween {
  return gsap.from(element, {
    y: options?.y ?? 40,
    opacity: 0,
    duration: options?.duration ?? 1,
    delay: options?.delay ?? 0,
    ease: 'power3.out',
  });
}

export function sectionReveal(
  trigger: HTMLElement,
  elements: HTMLElement | HTMLElement[]
): ScrollTrigger {
  gsap.set(elements, { opacity: 0, y: 50 });

  const tween = gsap.to(elements, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  return tween.scrollTrigger!;
}
