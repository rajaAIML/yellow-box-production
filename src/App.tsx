import { useCallback, useState } from 'react';
import { AboutSection } from './components/about/AboutSection';
import { Categories } from './components/categories/Categories';
import { ContactSection } from './components/contact/ContactSection';
import { FeaturedWork } from './components/featured/FeaturedWork';
import { Footer } from './components/footer/Footer';
import { GallerySection } from './components/gallery/GallerySection';
import { HeroSection } from './components/hero/HeroSection';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { Navigation } from './components/navigation/Navigation';
import { CustomCursor } from './components/ui/CustomCursor';
import { SmoothScrollProvider } from './providers/SmoothScrollProvider';

export default function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <SmoothScrollProvider>
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedWork />
        <Categories />
        <GallerySection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
