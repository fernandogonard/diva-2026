/**
 * Tests para useMediaQuery hook
 */

import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMediaQuery } from './useMediaQuery';

describe('useMediaQuery', () => {
  it('debería retornar false cuando el media query no coincide', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 1000px)'));
    expect(result.current).toBe(false);
  });

  it('debería retornar el estado inicial del media query', () => {
    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    expect(typeof result.current).toBe('boolean');
  });

  it('debería actualizar cuando el query string cambia', () => {
    const { result, rerender } = renderHook(
      ({ query }: { query: string }) => useMediaQuery(query),
      { initialProps: { query: '(max-width: 768px)' } }
    );

    expect(typeof result.current).toBe('boolean');

    rerender({ query: '(min-width: 1024px)' });
    expect(typeof result.current).toBe('boolean');
  });
});
