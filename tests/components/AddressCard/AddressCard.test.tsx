import { render, act } from '@testing-library/react';

import AddressCard from '@/components/AddressCard/AddressCard';
import { AuthProvider } from '@/contexts/AuthContext';

describe('AddressCard tests', () => {
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
        render(<AddressCard />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const el = container?.querySelector('div');
      expect(el).toBeDefined();
    });

    test('Contains HTMLElement input', () => {
      act(() => {
        render(<AddressCard />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const el = container?.querySelector('input');
      expect(el).toBeInstanceOf(HTMLElement);
    });

    test('Contains all inputs', () => {
      act(() => {
        render(<AddressCard />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const els = container?.querySelectorAll('input');
      expect(els?.length).toBe(4);
    });
  });
});
