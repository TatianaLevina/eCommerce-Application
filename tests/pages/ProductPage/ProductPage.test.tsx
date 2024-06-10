import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@contexts/AuthContext';
import ProductPage from '@pages/ProductPage/ProductPage';
import { CategoryProvider } from '@contexts/CategoriesContext';
import { BreadcrumbsProvider } from '@contexts/BreadcrumbsContext';
import { CartProvider } from '@/contexts/CartContext';

describe('ProductPage tests', () => {
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
            <CategoryProvider>
              <CartProvider>
                <BreadcrumbsProvider>
                  <ProductPage />
                </BreadcrumbsProvider>
              </CartProvider>
            </CategoryProvider>
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });
      const el = container?.querySelector('.category-page');
      expect(el).toBeDefined();
    });
  });
});
