import { render, act } from '@testing-library/react';
import Login from '@pages/LoginPage/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@contexts/AuthContext';

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
    // const formTestId = 'qwueyque8723hq8w';
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
            <Login />
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
            <Login />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });
      const el = container?.querySelector('form');
      expect(el).toBeInstanceOf(HTMLElement);
    });

    test('contains inputs', () => {
      act(() => {
        render(
          <AuthProvider>
            <Login />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });
      const els = container?.querySelectorAll('input');
      expect(els?.length).toBe(2);
    });
  });
});