import { BrowserRouter } from 'react-router-dom';
import { render, act } from '@testing-library/react';

import { AuthProvider } from '@contexts/AuthContext';
import CartPage from '@pages/CartPage/CartPage';

describe('CartPage tests', () => {
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

    test('Should CardPage be defined', () => {
      act(() => {
        render(
          <AuthProvider>
            <CartPage />
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
            <CartPage />
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

    test('Contains h1 tag with Cart text', () => {
      act(() => {
        render(
          <AuthProvider>
            <CartPage />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const el = container?.querySelector('.custom-title');
      expect(el?.textContent).toBe('Cart');
    });
  });
});
