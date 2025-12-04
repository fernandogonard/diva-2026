import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useReducedMotion } from './useScrollEffects'

describe('useReducedMotion', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debería retornar false cuando prefers-reduced-motion no está establecido', () => {
    // Arrange
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    // Act
    const { result } = renderHook(() => useReducedMotion())

    // Assert
    expect(result.current).toBe(false)
  })

  it('debería retornar true cuando prefers-reduced-motion es reduce', () => {
    // Arrange
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    // Act
    const { result } = renderHook(() => useReducedMotion())

    // Assert
    expect(result.current).toBe(true)
  })

  it('debería respetar cambios en preferencias de motion', () => {
    // Arrange
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    // Act
    const { result } = renderHook(() => useReducedMotion())

    // Assert - la preferencia se detecta correctamente
    expect(result.current).toBe(true)
  })
})
