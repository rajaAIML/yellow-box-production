export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: 'portraits',
    name: 'Portraits',
    slug: 'portraits',
    image: '/images/portraits/quiet-confidence.svg',
    description: 'Character, light, and presence.',
  },
  {
    id: 'weddings',
    name: 'Weddings',
    slug: 'weddings',
    image: '/images/weddings/golden-vows.svg',
    description: 'Love stories in motion.',
  },
  {
    id: 'travel',
    name: 'Travel',
    slug: 'travel',
    image: '/images/travel/himalayan-silence.svg',
    description: 'Places that stay with you.',
  },
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    image: '/images/fashion/monochrome-motion.svg',
    description: 'Editorial vision and form.',
  },
  {
    id: 'events',
    name: 'Events',
    slug: 'events',
    image: '/images/events/neon-pulse.svg',
    description: 'Energy captured in real time.',
  },
  {
    id: 'street',
    name: 'Street',
    slug: 'street',
    image: '/images/street/urban-rhythm.svg',
    description: 'The pulse of everyday life.',
  },
];
