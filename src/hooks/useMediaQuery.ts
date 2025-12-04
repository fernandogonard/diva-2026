/**
 * useMediaQuery - Hook para detectar cambios en media queries
 * Útil para responsive design y detección de viewport
 */

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Establecer estado inicial
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Handler para cambios de media query
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Suscribirse al cambio
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}
