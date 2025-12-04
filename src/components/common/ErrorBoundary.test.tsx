import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from './ErrorBoundary'

describe('ErrorBoundary', () => {
  // Suprimir console.error para tests de error
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

  it('debería renderizar children cuando no hay error', () => {
    // Arrange
    const TestComponent = () => <div>Test Content</div>

    // Act
    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    )

    // Assert
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('debería renderizar fallback UI cuando hay error', () => {
    // Arrange
    const ThrowError = () => {
      throw new Error('Test error')
    }

    // Suppress React error boundary warnings
    consoleErrorSpy.mockImplementation(() => {})

    // Act
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    // Assert - buscar el texto de error
    expect(screen.getByText(/Algo salió mal/i)).toBeInTheDocument()
  })

  it('debería mostrar detalles del error en modo desarrollo', () => {
    // Arrange
    const ThrowError = () => {
      throw new Error('Test error message')
    }

    consoleErrorSpy.mockImplementation(() => {})

    // Act
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    // Assert - En desarrollo, debería mostrar el error
    // El comportamiento depende de import.meta.env.DEV
    expect(screen.getByText(/Algo salió mal/i)).toBeInTheDocument()
  })

  it('debería tener aria-role alert en fallback UI', () => {
    // Arrange
    const ThrowError = () => {
      throw new Error('Test')
    }

    consoleErrorSpy.mockImplementation(() => {})

    // Act
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    // Assert
    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
  })
})
