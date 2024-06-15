import AppDrawer from '@/components/AppDrawer/AppDrawer';
import { AuthProvider } from '@/contexts/AuthContext';
import { render, act } from '@testing-library/react';

describe('AppDrawer tests', () => {
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
        render(<AppDrawer />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const el = container?.querySelector('div');
      expect(el).toBeDefined();
    });
  });
});
