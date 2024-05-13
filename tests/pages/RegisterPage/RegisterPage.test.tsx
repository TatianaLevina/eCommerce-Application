import { AuthProvider } from '@/contexts/AuthContext';
import RegisterPage from '@/pages/RegisterPage/RegisterPage';
import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('Login tests', () => {
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

    test('should render Login', () => {
      act(() => {
        render(
          <AuthProvider>
            <RegisterPage />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const el = container?.getElementsByTagName('form');
      expect(el).toBeDefined();
    });

    test('contains HTMLFormElement', () => {
      act(() => {
        render(
          <AuthProvider>
            <RegisterPage />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const el = container?.querySelector('form');
      expect(el).toBeInstanceOf(HTMLFormElement);
    });

    test('contains inputs', () => {
      act(() => {
        render(
          <AuthProvider>
            <RegisterPage />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const els = container?.querySelectorAll('input');
      expect(els?.length).toBe(11);
    });
  });
});