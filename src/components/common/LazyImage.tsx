import { useState } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
}

/**
 * Componente LazyImage optimizado para SEO y Performance
 * - Lazy loading automático
 * - Skeleton loading
 * - Error handling
 * - Alt text estratégico
 * - Fetchpriority para recursos críticos
 */
export function LazyImage({
  src,
  alt,
  title,
  className = '',
  priority = false,
  onLoad,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <motion.div
      className={`overflow-hidden bg-gray-100 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Skeleton Loading */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
      )}

      {/* Imagen Principal */}
      {!error ? (
        <img
          src={src}
          alt={alt}
          title={title || alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'low'}
          onLoad={handleLoad}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        /* Fallback Error State */
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <span className="text-gray-400 text-sm">Imagen no disponible</span>
        </div>
      )}
    </motion.div>
  );
}
