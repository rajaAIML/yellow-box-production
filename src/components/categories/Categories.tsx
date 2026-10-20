import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { categories } from '../../data/categories';
import { LazyImage } from '../ui/LazyImage';

gsap.registerPlugin(ScrollTrigger);

export function Categories() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('[data-category-card]');
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  const handleCategoryClick = (slug: string) => {
    document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' });
    // Future: filter gallery by category slug
    void slug;
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding py-24 md:py-32 bg-surface/30"
      aria-label="Photography categories"
    >
      <div className="max-w-container mx-auto">
        <div className="mb-12 md:mb-16">
          <p className="section-label mb-4">Explore</p>
          <h2 className="section-heading">Categories</h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              data-category-card
              onClick={() => handleCategoryClick(category.slug)}
              className="group relative overflow-hidden aspect-[4/5] text-left"
              data-cursor="explore"
              aria-label={`Explore ${category.name} photography`}
            >
              <LazyImage
                src={category.image}
                alt={`${category.name} category`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="w-0 group-hover:w-12 h-px bg-primary transition-all duration-500 mb-4" />
                <h3 className="font-display text-2xl md:text-3xl tracking-wide uppercase">
                  {category.name}
                </h3>
                <p className="text-muted text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {category.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
