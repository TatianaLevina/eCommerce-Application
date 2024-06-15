import { render, act } from '@testing-library/react';
import type { LineItem } from '@commercetools/platform-sdk';
import CartItem from '@/components/CartItem/CartItem';
import { AuthProvider } from '@/contexts/AuthContext';

describe('CartItem tests', () => {
  describe('Render element', () => {
    let container: HTMLElement | null = null;
    const mockProduct: LineItem = {
      id: 'test',
      productId: 'test',
      name: { 'en-US': 'test' },
      variant: { id: 1 },
      productType: { typeId: 'product-type', id: 'test' },
      price: {
        id: 'test',
        value: { type: 'centPrecision', centAmount: 100, currencyCode: 'USD', fractionDigits: 2 },
      },
      quantity: 4,
      totalPrice: {
        type: 'centPrecision',
        centAmount: 100,
        currencyCode: 'USD',
        fractionDigits: 2,
      },
      discountedPricePerQuantity: [],
      taxedPricePortions: [],
      state: [],
      perMethodTaxRate: [],
      priceMode: 'USD',
      lineItemMode: 'test',
    };

    const mockEmptyFn = () => {};
    const mockPromiseFm = (id: string, value: number): Promise<number | undefined> => {
      return new Promise((res) => {
        res(+id ? +id : value);
      });
    };

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
        render(<CartItem product={mockProduct} removeClickHandler={mockEmptyFn} inputChangeHandler={mockPromiseFm} />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const el = container?.querySelector('div');
      expect(el).toBeDefined();
    });

    test('Contains HTMLElement button', () => {
      act(() => {
        render(<CartItem product={mockProduct} removeClickHandler={mockEmptyFn} inputChangeHandler={mockPromiseFm} />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const el = container?.querySelector('button');
      expect(el).toBeInstanceOf(HTMLElement);
    });

    test('Contains all buttons', () => {
      act(() => {
        render(<CartItem product={mockProduct} removeClickHandler={mockEmptyFn} inputChangeHandler={mockPromiseFm} />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const els = container?.querySelectorAll('button');
      expect(els?.length).toBe(3);
    });
  });
});
