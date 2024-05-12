import { AuthProvider } from '@/contexts/AuthContext';
import AppHeader from '@components/AppHeader/AppHeader';
import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('AppHeader component tests', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vitest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vitest.fn(),
        removeListener: vitest.fn(),
        addEventListener: vitest.fn(),
        removeEventListener: vitest.fn(),
        dispatchEvent: vitest.fn(),
      })),
    });
  });

  describe('Render element', () => {
    let container: HTMLElement | null = null;

    beforeEach(() => {
      container = document.createElement('div');
      container.id = 'div_root';
      document.body.append(container);
    });

    afterEach(() => {
      container?.remove();
      container = null;
    });

    test('Should be defined', () => {
      act(() => {
        render(
          <AuthProvider>
            <AppHeader />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const el = container?.querySelector('header');
      expect(el).toBeDefined();
    });

    test('Contains HTMLElement header', () => {
      act(() => {
        render(
          <AuthProvider>
            <AppHeader />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const el = container?.querySelector('header');
      expect(el).toBeInstanceOf(HTMLElement);
    });

    test('Contains anchor', () => {
      act(() => {
        render(
          <AuthProvider>
            <AppHeader />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const els = container?.querySelectorAll('a');
      expect(els?.length).toBe(7);
    });
  });
});
