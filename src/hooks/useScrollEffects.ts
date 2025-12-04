import { useCallback, useEffect, useState } from 'react';

/**
 * Hook para manejar smooth scroll a secciones
 * Valida que el elemento existe antes de hacer scroll
 * 
 * @example
 * const scroll = useSmoothScroll();
 * scroll('#rooms');
 */
export function useSmoothScroll() {
  return useCallback((selector: string) => {
    if (!selector.startsWith('#')) {
      console.warn('❌ Selector debe empezar con #');
      return;
    }

    const element = document.querySelector(selector);
    if (!element) {
      console.warn(`❌ Elemento no encontrado: ${selector}`);
      return;
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);
}

/**
 * Hook para detectar si elemento está en viewport
 * Útil para animaciones trigger
 */
export function useInViewport(ref: React.RefObject<HTMLElement>) {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref]);

  return isInViewport;
}

/**
 * Hook para respetar prefers-reduced-motion
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
