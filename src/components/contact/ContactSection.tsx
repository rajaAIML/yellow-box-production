import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Mail, MapPin, Youtube } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { siteConfig } from '../../data/site';
import { submitContactForm, type ContactFormData } from '../../utils/contact';
import { trackEvent } from '../../utils/analytics';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll('[data-contact-animate]'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    );
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const result = await submitContactForm(formData);

    if (result.success) {
      setStatus('success');
      setFeedback(result.message);
      trackEvent('contact_form_submit', { success: true });
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
      setFeedback(result.message);
      trackEvent('contact_form_submit', { success: false });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding py-24 md:py-32 lg:py-40 bg-surface/30"
      aria-label="Contact"
    >
      <div className="max-w-container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div data-contact-animate>
          <p className="section-label mb-4">Contact</p>
          <h2 className="section-heading mb-8">
            Let&apos;s create
            <br />
            something
            <br />
            <span className="text-primary">amazing.</span>
          </h2>

          <div className="space-y-4 text-muted">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-primary transition-colors"
            >
              <Instagram size={18} />
              <span className="text-sm tracking-wide">Instagram</span>
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-primary transition-colors"
            >
              <Youtube size={18} />
              <span className="text-sm tracking-wide">YouTube</span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 hover:text-primary transition-colors"
            >
              <Mail size={18} />
              <span className="text-sm tracking-wide">{siteConfig.email}</span>
            </a>
            <p className="flex items-center gap-3">
              <MapPin size={18} />
              <span className="text-sm tracking-wide">{siteConfig.location}</span>
            </p>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} data-contact-animate className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-xs tracking-[0.2em] uppercase text-muted mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full bg-transparent border-b border-border py-3 text-foreground focus:border-primary outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs tracking-[0.2em] uppercase text-muted mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full bg-transparent border-b border-border py-3 text-foreground focus:border-primary outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-xs tracking-[0.2em] uppercase text-muted mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="w-full bg-transparent border-b border-border py-3 text-foreground focus:border-primary outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>

          {feedback && (
            <p
              className={`text-sm ${status === 'success' ? 'text-primary' : 'text-red-400'}`}
              role="status"
            >
              {feedback}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
