import { AuthProvider } from '@contexts/AuthContext';
import { CartProvider } from '@contexts/CartContext';
import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '@components/ProductCard/ProductCard';

describe('ProductCard component tests', () => {
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
            <CartProvider>
              <ProductCard
                product={{
                  id: 'string',
                  version: 5,
                  createdAt: 'string',
                  lastModifiedAt: 'string',
                  productType: {
                    typeId: 'product-type',
                    id: 'string',
                  },
                  name: { 'en-US': 'TestProduct' },
                  slug: { 'en-US': 'Test' },
                  categories: [
                    {
                      typeId: 'category',
                      id: 'string',
                    },
                  ],
                  masterVariant: {
                    id: 2,
                  },
                  variants: [
                    {
                      id: 2,
                    },
                  ],
                }}
                categorySlug={'test'}
                formatPrice={(x) => x.toFixed(2)}
              />
            </CartProvider>
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const el = container?.querySelector('.product-card');
      expect(el).toBeDefined();
    });
  });
});
