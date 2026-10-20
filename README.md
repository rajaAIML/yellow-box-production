# Yellow Box Production

An immersive 3D photography portfolio for **Yellow Box Production** — a premium visual storytelling experience built with React, Three.js, and cinematic scroll-driven animations.

## Project Overview

Yellow Box Production is a single-page portfolio website featuring:

- Cinematic loading experience with rotating 3D box motif
- Full-screen Three.js hero with floating photographs and interactive yellow box
- GSAP scroll-driven storytelling with Lenis smooth scrolling
- Featured work carousel with custom GSAP transitions
- Category exploration grid
- Scroll-driven 3D photo gallery
- Full-screen lightbox with keyboard and touch navigation
- About, contact, and footer sections
- Custom cursor (desktop), reduced motion support, and WebGL fallback
- SEO metadata, sitemap, and robots.txt

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + Vite 6 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS variables |
| 3D | Three.js, React Three Fiber, Drei |
| Animation | GSAP + ScrollTrigger |
| Scroll | Lenis |
| Icons | Lucide React |
| Fonts | Space Grotesk, Inter |

## Local Development

### Prerequisites

- Node.js 18+ and npm

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Other Scripts

```bash
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

## Image Replacement

All gallery content is driven by `src/data/photos.ts` and `src/data/categories.ts`.

### Replace placeholder images

1. Add your images to the appropriate folder under `public/images/`:

```text
public/images/
  hero/
  portraits/
  weddings/
  travel/
  fashion/
  events/
  street/
```

2. Update paths in `src/data/photos.ts`:

```typescript
{
  id: "travel-001",
  title: "Himalayan Silence",
  category: "Travel",
  image: "/images/travel/himalayan-silence.webp",
  thumbnail: "/images/travel/himalayan-silence-thumb.webp",
  featured: true,
}
```

### Regenerate SVG placeholders

```bash
./scripts/generate-placeholders.sh
```

### Cloudinary (future)

The image layer uses simple string paths. To switch to Cloudinary, update `image` and `thumbnail` fields to full URLs — no UI changes required.

Recommended formats: **WebP** or **AVIF** with responsive sizes (thumbnail, medium, large).

## Build Instructions

```bash
npm run build
```

Output is written to `dist/` — a static site ready for deployment.

Verify zero errors:

```bash
npm run build
```

## Deployment

### Cloudflare Pages (recommended)

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 18+ |

No environment variables required for the initial portfolio.

### Vercel (alternative)

Same build command and output directory.

### Custom Domain

The site uses relative URLs throughout. Connect `yellowboxproduction.com` via your hosting provider's DNS settings without code changes.

## Environment Variables

None required for the initial version.

Optional future variables:

| Variable | Purpose |
|----------|---------|
| `VITE_CONTACT_ENDPOINT` | Form submission API URL |
| `VITE_ANALYTICS_ID` | Analytics provider ID |

Configure providers in:

- `src/utils/contact.ts` — `setContactProvider()`
- `src/utils/analytics.ts` — `setAnalyticsProvider()`

## Project Structure

```text
src/
  components/     # UI sections (nav, hero, gallery, etc.)
  three/          # Three.js scenes and 3D components
  animations/     # GSAP animation utilities
  data/           # Photos, categories, site config
  hooks/          # Shared React hooks
  providers/      # Lenis smooth scroll provider
  utils/          # Contact form, analytics abstractions
  styles/         # Global CSS and design tokens
```

## Future Improvements

- [ ] Connect contact form to Formspree / Web3Forms
- [ ] Cloudinary integration for optimized image delivery
- [ ] Category filtering in 3D gallery
- [ ] Cloudflare Web Analytics via `trackEvent()` abstraction
- [ ] AVIF/WebP responsive srcset component
- [ ] Subtle post-processing (bloom/vignette) on capable devices
- [ ] CMS integration for photo management

## License

See [LICENSE](LICENSE).

---

**Yellow Box Production** — *More than photography — a perspective.*
