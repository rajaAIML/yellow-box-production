import { Instagram, Youtube } from 'lucide-react';
import { siteConfig } from '../../data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-padding py-16 border-t border-border" aria-label="Footer">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <p className="font-display text-sm tracking-[0.25em] uppercase mb-2">Yellow Box</p>
            <p className="font-display text-sm tracking-[0.25em] uppercase text-muted mb-4">
              Production
            </p>
            <p className="text-muted text-sm">Stories. Frames. Moments.</p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="space-y-3">
              {siteConfig.footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors tracking-wide uppercase"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-6">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted hover:text-primary transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-muted hover:text-primary transition-colors"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>

        <p className="text-xs text-muted tracking-wide">
          © {year} Yellow Box Production
        </p>
      </div>
    </footer>
  );
}
