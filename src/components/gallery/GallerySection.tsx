import { useState } from 'react';
import { photos } from '../../data/photos';
import { Lightbox } from '../ui/Lightbox';
import { LazyImage } from '../ui/LazyImage';

export function GallerySection() {
  const galleryPhotos = photos.slice(0, 12);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-padding py-24 md:py-32 max-w-container mx-auto" aria-label="Photography gallery">
      <div className="mb-12 md:mb-16">
        <p className="section-label mb-4">Gallery</p>
        <h2 className="section-heading mb-4">Selected frames</h2>
        <p className="section-subheading">A considered collection of stills from Yellow Box Production.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {galleryPhotos.map((photo, index) => (
          <button key={photo.id} type="button" onClick={() => setLightboxIndex(index)} className={`group relative overflow-hidden bg-surface text-left focus-visible:outline-primary ${index % 5 === 0 ? 'md:col-span-2 md:aspect-[16/9]' : 'aspect-[3/4]'}`} aria-label={`View ${photo.title}`}>
            <LazyImage src={photo.thumbnail ?? photo.image} alt={photo.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-black/70 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-display text-xs tracking-[0.18em] uppercase">{photo.category}</p>
              <p className="mt-1 text-sm">{photo.title}</p>
            </div>
          </button>
        ))}
      </div>
      {lightboxIndex !== null && <Lightbox photos={galleryPhotos} currentIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />}
    </section>
  );
}
