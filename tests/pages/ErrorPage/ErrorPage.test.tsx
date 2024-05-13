import { render, act } from '@testing-library/react';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';

describe('ErrorPage tests', () => {
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

    test('Should ErrorPage be defined', () => {
      act(() => {
        render(
          <AuthProvider>
            <ErrorPage />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const el = container?.querySelector('div');
      expect(el).toBeDefined();
    });

    test('Contains HTMLElement', () => {
      act(() => {
        render(
          <AuthProvider>
            <ErrorPage />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const el = container?.querySelector('div');
      expect(el).toBeInstanceOf(HTMLElement);
    });
  });
});
