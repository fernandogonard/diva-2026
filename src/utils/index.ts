// Utilidades para fechas
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-AR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

export const getTodayDate = (): string => {
  return formatDate(new Date());
};

export const getTomorrowDate = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatDate(tomorrow);
};

// Utilidades para validación
/**
 * Valida email con regex RFC 5322 simplificado
 * @param email - Email a validar
 * @returns true si el email es válido
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  if (email.length > 254) return false; // RFC 5321
  
  const emailRegex = /^[a-zA-Z0-9._%-+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

/**
 * Valida número de teléfono (Argentina formato)
 * @param phone - Teléfono a validar
 * @returns true si el teléfono es válido
 */
export const isValidPhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false;
  
  // Aceptar solo números y algunos símbolos
  const sanitized = phone.replace(/[\s-+()]/g, '');
  const phoneRegex = /^[1-9]\d{7,14}$/; // 8-15 dígitos, sin +
  return phoneRegex.test(sanitized);
};

/**
 * Sanitiza y valida texto para evitar inyección
 * @param text - Texto a sanitizar
 * @returns Texto sanitizado
 */
export const sanitizeText = (text: string): string => {
  if (!text || typeof text !== 'string') return '';
  
  // Remover caracteres potencialmente peligrosos
  return text
    .trim()
    .replace(/[<>"'`]/g, '') // Remover caracteres de etiquetas HTML
    .substring(0, 500); // Limitar longitud
};

/**
 * Valida URL
 * @param url - URL a validar
 * @returns true si la URL es válida
 */
export const isValidURL = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valida que el input no contiene scripts o payloads XSS
 * @param input - Input a validar
 * @returns true si el input es seguro
 */
export const isSafeInput = (input: string): boolean => {
  if (!input || typeof input !== 'string') return false;
  
  // Patrones peligrosos comunes
  const xssPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<embed/gi,
    /<object/gi,
  ];
  
  return !xssPatterns.some(pattern => pattern.test(input));
};

// Utilidades para scroll suave
export const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId.replace('#', ''));
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

// Utilidades para WhatsApp
export const openWhatsApp = (url: string): void => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

// Utilidades para imágenes
export const getImageUrl = (path: string): string => {
  // En desarrollo, las imágenes estarán en public/
  // En producción, podrían estar en un CDN
  return path.startsWith('/') ? path : `/${path}`;
};

// Utilidad para números de teléfono
export const formatPhoneDisplay = (phone: string): string => {
  // Convierte +5492235033585 a +54 9 223 503-3585
  if (phone.startsWith('+549')) {
    const number = phone.slice(4); // Remueve +549
    return `+54 9 ${number.slice(0, 3)} ${number.slice(3, 6)}-${number.slice(6)}`;
  }
  return phone;
};

// Re-exportar utilidades de performance y SEO
export * from './performance';
export * from './schema';
export * from './seo-audit';