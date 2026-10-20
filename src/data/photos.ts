export interface Photo {
  id: string;
  title: string;
  category: string;
  description?: string;
  year?: number;
  location?: string;
  image: string;
  thumbnail?: string;
  featured?: boolean;
}

export const photos: Photo[] = [
  {
    id: 'travel-001',
    title: 'Himalayan Silence',
    category: 'Travel',
    description: 'Morning light over snow-capped peaks.',
    year: 2026,
    location: 'Himalayas',
    image: '/images/travel/himalayan-silence.svg',
    thumbnail: '/images/travel/himalayan-silence.svg',
    featured: true,
  },
  {
    id: 'portrait-001',
    title: 'Quiet Confidence',
    category: 'Portraits',
    description: 'Natural light portrait in soft shadow.',
    year: 2026,
    location: 'Studio',
    image: '/images/portraits/quiet-confidence.svg',
    thumbnail: '/images/portraits/quiet-confidence.svg',
    featured: true,
  },
  {
    id: 'wedding-001',
    title: 'Golden Vows',
    category: 'Weddings',
    description: 'An intimate ceremony at golden hour.',
    year: 2026,
    location: 'Jaipur',
    image: '/images/weddings/golden-vows.svg',
    thumbnail: '/images/weddings/golden-vows.svg',
    featured: true,
  },
  {
    id: 'fashion-001',
    title: 'Monochrome Motion',
    category: 'Fashion',
    description: 'Editorial movement in structured light.',
    year: 2026,
    location: 'Mumbai',
    image: '/images/fashion/monochrome-motion.svg',
    thumbnail: '/images/fashion/monochrome-motion.svg',
    featured: true,
  },
  {
    id: 'events-001',
    title: 'Neon Pulse',
    category: 'Events',
    description: 'Energy captured in a single frame.',
    year: 2026,
    location: 'Delhi',
    image: '/images/events/neon-pulse.svg',
    thumbnail: '/images/events/neon-pulse.svg',
    featured: true,
  },
  {
    id: 'street-001',
    title: 'Urban Rhythm',
    category: 'Street',
    description: 'City life in fleeting geometry.',
    year: 2026,
    location: 'Kolkata',
    image: '/images/street/urban-rhythm.svg',
    thumbnail: '/images/street/urban-rhythm.svg',
    featured: true,
  },
  {
    id: 'travel-002',
    title: 'Coastal Drift',
    category: 'Travel',
    year: 2026,
    location: 'Goa',
    image: '/images/travel/coastal-drift.svg',
    thumbnail: '/images/travel/coastal-drift.svg',
  },
  {
    id: 'portrait-002',
    title: 'Soft Gaze',
    category: 'Portraits',
    year: 2026,
    location: 'Studio',
    image: '/images/portraits/soft-gaze.svg',
    thumbnail: '/images/portraits/soft-gaze.svg',
  },
  {
    id: 'wedding-002',
    title: 'First Dance',
    category: 'Weddings',
    year: 2025,
    location: 'Udaipur',
    image: '/images/weddings/first-dance.svg',
    thumbnail: '/images/weddings/first-dance.svg',
  },
  {
    id: 'fashion-002',
    title: 'Velvet Shadow',
    category: 'Fashion',
    year: 2025,
    location: 'Mumbai',
    image: '/images/fashion/velvet-shadow.svg',
    thumbnail: '/images/fashion/velvet-shadow.svg',
  },
  {
    id: 'events-002',
    title: 'Stage Light',
    category: 'Events',
    year: 2025,
    location: 'Bangalore',
    image: '/images/events/stage-light.svg',
    thumbnail: '/images/events/stage-light.svg',
  },
  {
    id: 'street-002',
    title: 'Rain Reflection',
    category: 'Street',
    year: 2025,
    location: 'Mumbai',
    image: '/images/street/rain-reflection.svg',
    thumbnail: '/images/street/rain-reflection.svg',
  },
];

export const featuredPhotos = photos.filter((p) => p.featured);

export function getPhotoById(id: string): Photo | undefined {
  return photos.find((p) => p.id === id);
}

export function getPhotosByCategory(category: string): Photo[] {
  return photos.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}
