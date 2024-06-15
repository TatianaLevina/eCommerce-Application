import { render, act } from '@testing-library/react';
import type { DiscountCode } from '@commercetools/platform-sdk';
import DiscountBanner from '@/components/DiscountBanner/DiscountBanner';

describe('DiscountBanner tests', () => {
  describe('Render element', () => {
    let container: HTMLElement | null = null;

    const mockImage = 'test';

    const mockdiscountCode: DiscountCode = {
      id: 'test',
      version: 4,
      createdAt: Date.now().toLocaleString(),
      lastModifiedAt: new Date(2031, 0, 1, 0, 0, 0, 0).toLocaleString(),
      code: 'TESTCODE',
      cartDiscounts: [],
      isActive: true,
      references: [],
      groups: [],
      description: { 'en-US': 'test description' },
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
        render(<DiscountBanner discountCode={mockdiscountCode} image={mockImage} />, {
          container: container!,
        });
      });

      const el = container?.querySelector('div');
      expect(el).toBeDefined();
    });

    test('Contains HTMLElement .promo__title', () => {
      act(() => {
        render(<DiscountBanner discountCode={mockdiscountCode} image={mockImage} />, {
          container: container!,
        });
      });

      const el = container?.querySelector('.promo__title ');
      expect(el).toBeInstanceOf(HTMLElement);
    });

    test('Contains promocode', () => {
      act(() => {
        render(<DiscountBanner discountCode={mockdiscountCode} image={mockImage} />, {
          container: container!,
        });
      });

      const els = Array.from(container!.querySelectorAll('.promo__title '));
      expect(els?.find((x) => x.textContent === 'TESTCODE')).toBeDefined();
    });
  });
});
