import { render, act } from '@testing-library/react';
import { AuthProvider } from '@/contexts/AuthContext';
import PersonalInfo from '@/components/PersonalInfo/PersonalInfo';

describe('PersonalInfo tests', () => {
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
        render(<PersonalInfo />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const el = container?.querySelector('div');
      expect(el).toBeDefined();
    });

    test('Contains HTMLElement button', () => {
      act(() => {
        render(<PersonalInfo />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const el = container?.querySelector('button');
      expect(el).toBeInstanceOf(HTMLElement);
    });

    test('Contains all buttons', () => {
      act(() => {
        render(<PersonalInfo />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const els = container?.querySelectorAll('button');
      expect(els?.length).toBe(1);
    });
  });
});
