import React, { useState, useEffect, useRef } from 'react';
import { resolveProductImage } from '@/lib/productImages';

const LazyImage: React.FC<{
  src: string;
  alt?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  fit?: 'cover' | 'contain';
}> = ({ src, alt = '', className = '', width, height, fit = 'cover' }) => {
  const resolvedSrc = resolveProductImage(src);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setLoaded(false);
    setHasError(false);
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setLoaded(true);
      }
    }
  }, [resolvedSrc]);

  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ width: width || '100%', height: height || '100%' }}
    >
      {!loaded && !hasError && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={hasError ? '/placeholder.svg' : resolvedSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setHasError(true);
          setLoaded(true);
        }}
        className={`w-full h-full ${fitClass} transition-all duration-300 ease-out ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        style={{ transformOrigin: 'center center' }}
      />
    </div>
  );
};

export default LazyImage;
