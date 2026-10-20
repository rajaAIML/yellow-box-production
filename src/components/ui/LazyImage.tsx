import { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export function LazyImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`bg-surface border border-border flex items-center justify-center text-muted text-sm ${className}`}
        role="img"
        aria-label={alt}
      >
        {alt}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
      className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  );
}
