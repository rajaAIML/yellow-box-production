import gsap from 'gsap';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import type { Photo } from '../../data/photos';
import { LazyImage } from './LazyImage';

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ photos, currentIndex, onClose, onNavigate }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const photo = photos[currentIndex];

  const goPrev = useCallback(() => {
    onNavigate(currentIndex === 0 ? photos.length - 1 : currentIndex - 1);
  }, [currentIndex, onNavigate, photos.length]);

  const goNext = useCallback(() => {
    onNavigate(currentIndex === photos.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, onNavigate, photos.length]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    if (overlayRef.current && contentRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.fromTo(
        contentRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev, onClose]);

  useEffect(() => {
    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0]?.clientX ?? 0;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = (e.changedTouches[0]?.clientX ?? 0) - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goPrev();
        else goNext();
      }
    };
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goNext, goPrev]);

  if (!photo) return null;

  const indexLabel = String(currentIndex + 1).padStart(2, '0');
  const totalLabel = String(photos.length).padStart(2, '0');

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.title} — full size photograph`}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-muted hover:text-foreground transition-colors z-10"
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      <button
        onClick={goPrev}
        className="absolute left-4 md:left-8 p-3 text-muted hover:text-primary transition-colors z-10"
        aria-label="Previous photograph"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={goNext}
        className="absolute right-4 md:right-8 p-3 text-muted hover:text-primary transition-colors z-10"
        aria-label="Next photograph"
      >
        <ChevronRight size={32} />
      </button>

      <div ref={contentRef} className="w-full max-w-5xl px-8 md:px-16">
        <LazyImage
          src={photo.image}
          alt={photo.title}
          className="w-full max-h-[70vh] object-contain mx-auto"
          loading="eager"
        />
        <div className="mt-8 text-center">
          <p className="text-sm text-muted tracking-widest mb-2">
            {indexLabel} / {totalLabel}
          </p>
          <h3 className="font-display text-2xl md:text-3xl tracking-wide mb-2">{photo.title}</h3>
          <p className="text-sm text-muted uppercase tracking-[0.2em]">
            {photo.category}
            {photo.year ? ` | ${photo.year}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
