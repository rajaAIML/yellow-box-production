import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { Photo } from '../../data/photos';
import { photos } from '../../data/photos';
import { createGalleryScrollAnimation } from '../../animations/galleryAnimations';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useWebGLSupport } from '../../hooks/useWebGLSupport';
import { Lightbox } from '../ui/Lightbox';
import { LazyImage } from '../ui/LazyImage';

const GalleryCanvas = lazy(() =>
  import('../../three/GalleryScene').then((m) => ({ default: m.GalleryCanvas }))
);

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { normalizedX, normalizedY } = useMousePosition();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const webglSupported = useWebGLSupport();
  const galleryPhotos = photos.slice(0, 12);

  useEffect(() => {
    if (!sectionRef.current) return;
    const trigger = createGalleryScrollAnimation(sectionRef.current, setScrollProgress);
    return () => trigger.kill();
  }, []);

  const handlePhotoClick = (photo: Photo) => {
    const index = galleryPhotos.findIndex((p) => p.id === photo.id);
    setLightboxIndex(index >= 0 ? index : 0);
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative min-h-[150vh]"
      aria-label="3D photo gallery"
    >
      <div className="section-padding pt-24 md:pt-32 pb-8 max-w-container mx-auto">
        <p className="section-label mb-4">Gallery</p>
        <h2 className="section-heading mb-4">Immersive Collection</h2>
        <p className="section-subheading">
          Scroll through our visual stories in three dimensions.
        </p>
      </div>

      <div className="sticky top-0">
        {webglSupported ? (
          <Suspense
            fallback={
              <div className="h-[70vh] md:h-screen flex items-center justify-center text-muted">
                Loading gallery...
              </div>
            }
          >
            <GalleryCanvas
              mouseX={normalizedX}
              mouseY={normalizedY}
              scrollProgress={scrollProgress}
              reducedMotion={reducedMotion}
              isMobile={isMobile}
              onPhotoClick={(photo) => handlePhotoClick(photo)}
            />
          </Suspense>
        ) : (
          <div className="section-padding max-w-container mx-auto pb-24">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryPhotos.map((photo, i) => (
                <button
                  key={photo.id}
                  onClick={() => setLightboxIndex(i)}
                  className="aspect-[3/4] overflow-hidden bg-surface group"
                  data-cursor="view"
                  aria-label={`View ${photo.title}`}
                >
                  <LazyImage
                    src={photo.thumbnail ?? photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={galleryPhotos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
