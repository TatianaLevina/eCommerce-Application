import { render, act } from '@testing-library/react';
import { AuthProvider } from '@/contexts/AuthContext';
import PromoCode from '@/components/PromoCode/PromoCode';

describe('PromoCode tests', () => {
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
        render(<PromoCode />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const el = container?.querySelector('div');
      expect(el).toBeDefined();
    });

    test('Contains form', () => {
      act(() => {
        render(<PromoCode />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const el = container?.querySelector('.cart__bottom-box');
      expect(el?.tagName).toBe('FORM');
    });

    test('Contains button', () => {
      act(() => {
        render(<PromoCode />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const el = container?.querySelector('.cart__promocode');
      expect(el?.textContent).toBeDefined();
    });

    test('Contains button Apply', () => {
      act(() => {
        render(<PromoCode />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const el = container?.querySelector('.cart__promocode');
      expect(el?.textContent).toBe('Apply');
    });
  });
});
