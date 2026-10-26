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
    id: 'food-001',
    title: 'Culinary Detail',
    category: 'Food',
    description: 'A study of colour, texture, and craft.',
    year: 2026,
    location: 'Studio',
    image: '/images/food/764540274_18112245263065825_3710743571396973317_n.jpg',
    thumbnail: '/images/food/764540274_18112245263065825_3710743571396973317_n.jpg',
    featured: true,
  },
  {
    id: 'portrait-001',
    title: 'Quiet Confidence',
    category: 'Portraits',
    description: 'Natural light portrait in soft shadow.',
    year: 2026,
    location: 'Studio',
    image: '/images/portraits/yellowboxproduction_1629913915_2648232324208393865_31970441824.jpg',
    thumbnail: '/images/portraits/yellowboxproduction_1629913915_2648232324208393865_31970441824.jpg',
    featured: true,
  },
  {
    id: 'wedding-001',
    title: 'Golden Vows',
    category: 'Weddings',
    description: 'An intimate ceremony at golden hour.',
    year: 2026,
    location: 'Jaipur',
    image: '/images/weddings/yellowboxproduction_1633623667_2679351975782155880_31970441824.webp',
    thumbnail: '/images/weddings/yellowboxproduction_1633623667_2679351975782155880_31970441824.webp',
    featured: true,
  },
  {
    id: 'fashion-001',
    title: 'Monochrome Motion',
    category: 'Fashion',
    description: 'Editorial movement in structured light.',
    year: 2026,
    location: 'Mumbai',
    image: '/images/fashion/manyabeautybar_1693409333_3180870492612525580_61253658907.jpg',
    thumbnail: '/images/fashion/manyabeautybar_1693409333_3180870492612525580_61253658907.jpg',
    featured: true,
  },
  {
    id: 'events-001',
    title: 'Neon Pulse',
    category: 'Events',
    description: 'Energy captured in a single frame.',
    year: 2026,
    location: 'Delhi',
    image: '/images/events/491457209_18497180752015137_7013180747025443633_n.jpg',
    thumbnail: '/images/events/491457209_18497180752015137_7013180747025443633_n.jpg',
    featured: true,
  },
  {
    id: 'sports-001',
    title: 'Peak Performance',
    category: 'Sports',
    description: 'Movement and intensity in a single frame.',
    year: 2026,
    location: 'Bangalore',
    image: '/images/sports/iamvinaybhargav_1704291951_3272160510086864789_1687504298.jpg',
    thumbnail: '/images/sports/iamvinaybhargav_1704291951_3272160510086864789_1687504298.jpg',
    featured: true,
  },
  {
    id: 'food-002',
    title: 'Table Story',
    category: 'Food',
    year: 2026,
    location: 'Studio',
    image: '/images/food/773850494_18112926851065825_5539637568550659779_n.jpg',
    thumbnail: '/images/food/773850494_18112926851065825_5539637568550659779_n.jpg',
  },
  {
    id: 'portrait-002',
    title: 'Soft Gaze',
    category: 'Portraits',
    year: 2026,
    location: 'Studio',
    image: '/images/portraits/yellowboxproduction_1697723221_3217058009568822099_31970441824.jpg',
    thumbnail: '/images/portraits/yellowboxproduction_1697723221_3217058009568822099_31970441824.jpg',
  },
  {
    id: 'wedding-002',
    title: 'First Dance',
    category: 'Weddings',
    year: 2025,
    location: 'Udaipur',
    image: '/images/weddings/yellowboxproduction_1586185757_2281413944851650380_31970441824.jpg',
    thumbnail: '/images/weddings/yellowboxproduction_1586185757_2281413944851650380_31970441824.jpg',
  },
  {
    id: 'fashion-002',
    title: 'Velvet Shadow',
    category: 'Fashion',
    year: 2025,
    location: 'Mumbai',
    image: '/images/fashion/manyabeautybar_1695993616_3202549027579320799_61253658907.jpg',
    thumbnail: '/images/fashion/manyabeautybar_1695993616_3202549027579320799_61253658907.jpg',
  },
  {
    id: 'events-002',
    title: 'Stage Light',
    category: 'Events',
    year: 2025,
    location: 'Bangalore',
    image: '/images/events/491457209_18497180752015137_7013180747025443633_n.jpg',
    thumbnail: '/images/events/491457209_18497180752015137_7013180747025443633_n.jpg',
  },
  {
    id: 'sports-002',
    title: 'In Motion',
    category: 'Sports',
    year: 2025,
    location: 'Bangalore',
    image: '/images/sports/iamvinaybhargav_1704535417_3274202851761184849_1687504298.jpg',
    thumbnail: '/images/sports/iamvinaybhargav_1704535417_3274202851761184849_1687504298.jpg',
  },
].map((photo) => ({
  ...photo,
  image: assetUrl(photo.image),
  thumbnail: photo.thumbnail ? assetUrl(photo.thumbnail) : undefined,
}));

export const featuredPhotos = photos.filter((p) => p.featured);

export function getPhotoById(id: string): Photo | undefined {
  return photos.find((p) => p.id === id);
}

export function getPhotosByCategory(category: string): Photo[] {
  return photos.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}
import { assetUrl } from '../utils/assets';
