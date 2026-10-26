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
    image: '/images/portraits/yellowboxproduction_1629913915_2648232324208393865_31970441824.jpg',
    description: 'Character, light, and presence.',
  },
  {
    id: 'weddings',
    name: 'Weddings',
    slug: 'weddings',
    image: '/images/weddings/yellowboxproduction_1633623667_2679351975782155880_31970441824.webp',
    description: 'Love stories in motion.',
  },
  {
    id: 'food',
    name: 'Food',
    slug: 'food',
    image: '/images/food/773850494_18112926851065825_5539637568550659779_n.jpg',
    description: 'Flavour, texture, and craft in focus.',
  },
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    image: '/images/fashion/manyabeautybar_1693409333_3180870492612525580_61253658907.jpg',
    description: 'Editorial vision and form.',
  },
  {
    id: 'events',
    name: 'Events',
    slug: 'events',
    image: '/images/events/491457209_18497180752015137_7013180747025443633_n.jpg',
    description: 'Energy captured in real time.',
  },
  {
    id: 'sports',
    name: 'Sports',
    slug: 'sports',
    image: '/images/sports/iamvinaybhargav_1704291951_3272160510086864789_1687504298.jpg',
    description: 'The power and precision of movement.',
  },
].map((category) => ({ ...category, image: assetUrl(category.image) }));
import { assetUrl } from '../utils/assets';
