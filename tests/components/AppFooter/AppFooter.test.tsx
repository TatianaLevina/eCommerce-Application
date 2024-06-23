import { render, act } from '@testing-library/react';

import AppFooter from '@components/AppFooter/AppFooter';

describe('AppFooter tests', () => {
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

    test('Should footer be defined', () => {
      act(() => {
        render(<AppFooter />, {
          container: container!,
        });
      });

      const el = container?.querySelector('footer');
      expect(el).toBeDefined();
    });

    test('Contains HTMLElement footer', () => {
      act(() => {
        render(<AppFooter />, {
          container: container!,
        });
      });

      const el = container?.querySelector('footer');
      expect(el).toBeInstanceOf(HTMLElement);
    });

    test('Contains footer text content', () => {
      act(() => {
        render(<AppFooter />, {
          container: container!,
        });
      });

      const els = container?.querySelector('footer');
      expect(els?.textContent).toBe('Home Sweet Home © 2024 Created by CodeCrafters');
    });
  });
});
