import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

/**
 * Tests para Header component
 * Valida: navegación por teclado, accesibilidad WCAG, smooth scroll
 */
describe('Header', () => {
  beforeEach(() => {
    // Mock del smooth scroll
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  it('debería renderizar el header con logo', () => {
    // Arrange
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Act & Assert
    const logo = screen.getByAltText(/Hotel Diva/i);
    expect(logo).toBeInTheDocument();
  });

  it('debería renderizar todos los links de navegación', () => {
    // Arrange
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Act & Assert
    expect(screen.getByRole('link', { name: /habitaciones/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /galería/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /grupos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contacto/i })).toBeInTheDocument();
  });

  it('debería permitir navegación por teclado', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Act - Tab debería enfocarse en algún elemento
    await user.tab();

    // Assert - Algún elemento debe tener foco
    const focusedElement = document.activeElement;
    expect(focusedElement?.tagName.toLowerCase()).not.toBe('body');
  });

  it('debería tener estructura semántica correcta (nav)', () => {
    // Arrange
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Act
    const nav = screen.getByRole('navigation');

    // Assert
    expect(nav).toBeTruthy();
    expect(nav.getAttribute('aria-label')).toBe('Navegación principal');
  });

  it('debería tener header con role banner', () => {
    // Arrange
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Act
    const header = screen.getByRole('banner');

    // Assert
    expect(header).toBeTruthy();
    expect(header.tagName).toBe('HEADER');
  });

  it('debería renderizar botón de llamada en header', () => {
    // Arrange
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Act & Assert
    const callBtn = screen.getByRole('link', { name: /llamar/i });
    expect(callBtn).toBeTruthy();
    expect(callBtn.getAttribute('href')).toContain('tel:');
  });

  it('debería renderizar botón de menú en mobile', () => {
    // Arrange
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Act & Assert
    const menuBtn = screen.getByRole('button', { name: /menú/i });
    expect(menuBtn).toBeTruthy();
  });
});
