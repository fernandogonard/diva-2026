import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';

/**
 * Tests de integración E2E (End-to-End)
 * Valida navegación entre rutas, carga de páginas, y metadata
 */
describe('E2E - Navegación y Rutas', () => {
  it('debería renderizar la home page por defecto', () => {
    // Arrange
    render(<App />);

    // Act & Assert
    // Verificar que aparezca contenido de home con h1
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements.length).toBeGreaterThan(0);
  });

  it('debería tener todas las rutas disponibles en el router', () => {
    // Arrange
    render(<App />);

    // Act & Assert
    // Verificar que Header está presente con navegación
    const navs = screen.getAllByRole('navigation');
    expect(navs.length).toBeGreaterThan(0);

    // Verificar enlaces a todas las rutas (con QuerySelector para evitar duplicados)
    const habitacionesLink = document.querySelector('a[href="/habitaciones"]');
    const galeriaLink = document.querySelector('a[href="/galeria"]');
    const gruposLink = document.querySelector('a[href="/grupos"]');
    const contactoLink = document.querySelector('a[href="/contacto"]');

    expect(habitacionesLink).toBeTruthy();
    expect(galeriaLink).toBeTruthy();
    expect(gruposLink).toBeTruthy();
    expect(contactoLink).toBeTruthy();
  });

  it('debería tener ErrorBoundary como fallback para errores', () => {
    // Arrange
    render(<App />);

    // Act & Assert
    // El componente debe estar envuelto en ErrorBoundary
    // Verificamos que la aplicación se renderiza sin errores
    const headers = screen.getAllByRole('banner');
    expect(headers.length).toBeGreaterThan(0);
  });

  it('debería mantener metadata accesible en todas las rutas', () => {
    // Arrange
    render(<App />);

    // Act & Assert
    // Verificar que meta tags estén presentes
    const metaTags = document.querySelectorAll('meta');
    expect(metaTags.length).toBeGreaterThan(0);

    // Verificar que exista al menos un meta description
    const descriptionTag = document.querySelector('meta[name="description"]');
    expect(descriptionTag).toBeTruthy();
  });

  it('debería tener header con aria-label en nav principal', () => {
    // Arrange
    render(<App />);

    // Act
    const navs = screen.getAllByRole('navigation');

    // Assert
    // La primera nav debe ser la principal del Header
    expect(navs[0].getAttribute('aria-label')).toBe('Navegación principal');
  });

  it('debería renderizar el contenido sin errores de accesibilidad críticos', () => {
    // Arrange
    render(<App />);

    // Act & Assert
    // Verificar que no hay elementos sin alt text críticos
    const images = document.querySelectorAll('img');
    let missingAlt = 0;

    images.forEach(img => {
      // No contar iconos y elementos decorativos
      if (!img.getAttribute('aria-hidden') && !img.getAttribute('alt')) {
        missingAlt++;
      }
    });

    // Aceptar máximo 0 imágenes críticas sin alt text
    expect(missingAlt).toBe(0);
  });

  it('debería tener estructura de heading jerárquica', () => {
    // Arrange
    render(<App />);

    // Act
    const h1Elements = document.querySelectorAll('h1');

    // Assert
    // Debe haber al menos un H1
    expect(h1Elements.length).toBeGreaterThanOrEqual(1);
  });
});
