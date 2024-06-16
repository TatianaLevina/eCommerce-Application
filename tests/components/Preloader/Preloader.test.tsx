import { render, act } from '@testing-library/react';

import { AuthProvider } from '@/contexts/AuthContext';
import Preloader from '@/components/Preloader/Preloader';

describe('Preloader tests', () => {
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
        render(<Preloader isHide={false} style={{}} />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const el = container?.querySelector('.preloader');
      expect(el).toBeDefined();
    });

    test('Contains HTMLElement .preloader__mesage', () => {
      act(() => {
        render(<Preloader isHide={false} style={{}} />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const el = container?.querySelector('.preloader__mesage');
      expect(el).toBeInstanceOf(HTMLElement);
    });

    test('.preloader__mesage textContent is correct', () => {
      act(() => {
        render(<Preloader isHide={false} style={{}} />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const el = container?.querySelector('.preloader__mesage');
      expect(el?.textContent).toBe('Loading...');
    });
  });
});
