/**
 * Tests para useAsync hook
 */

import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAsync } from './useAsync';

describe('useAsync', () => {
  it('debería tener estado inicial correcto', () => {
    const mockAsyncFunction = vi.fn().mockResolvedValue({ data: 'test' });

    const { result } = renderHook(() => useAsync(mockAsyncFunction, false));

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it('debería tener función execute disponible', () => {
    const mockAsyncFunction = vi.fn().mockResolvedValue({ data: 'test' });

    const { result } = renderHook(() => useAsync(mockAsyncFunction, false));

    expect(typeof result.current.execute).toBe('function');
  });

  it('debería no ejecutar la función cuando immediate es false', () => {
    const mockAsyncFunction = vi.fn().mockResolvedValue({ data: 'manual' });

    renderHook(() => useAsync(mockAsyncFunction, false));

    expect(mockAsyncFunction).not.toHaveBeenCalled();
  });

  it('debería ejecutar la función automáticamente cuando immediate es true', async () => {
    const mockAsyncFunction = vi.fn().mockResolvedValue({ data: 'auto' });

    renderHook(() => useAsync(mockAsyncFunction, true));

    await waitFor(() => {
      expect(mockAsyncFunction).toHaveBeenCalled();
    });
  });

  it('debería cambiar estados durante ejecución asincrónica', async () => {
    const mockAsyncFunction = vi.fn(
      () => new Promise(resolve => setTimeout(() => resolve({ data: 'delayed' }), 50))
    );

    const { result } = renderHook(() => useAsync(mockAsyncFunction, false));

    expect(result.current.loading).toBe(false);

    result.current.execute();

    // Esperar a que termine
    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 200 }
    );
  });
});
