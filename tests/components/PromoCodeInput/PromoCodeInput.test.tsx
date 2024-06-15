import { render, act } from '@testing-library/react';
import { AuthProvider } from '@/contexts/AuthContext';
import PromoCodeInput from '@/components/PromoCodeInput/PromoCodeInput';

describe('PromoCodeInput tests', () => {
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
        render(<PromoCodeInput />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const el = container?.querySelector('.promo-code-input');
      expect(el).toBeDefined();
    });

    test('Contains HTMLElement button', () => {
      act(() => {
        render(<PromoCodeInput />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const el = container?.querySelector('.primary-custom-color');
      expect(el?.tagName).toBe('BUTTON');
    });

    test('Contains HTMLElement input', () => {
      act(() => {
        render(<PromoCodeInput />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const el = container?.querySelector('input');
      expect(el?.tagName).toBe('INPUT');
    });

    test('Contains all buttons', () => {
      act(() => {
        render(<PromoCodeInput />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const els = container?.querySelectorAll('button');
      expect(els?.length).toBe(1);
    });
  });
});
