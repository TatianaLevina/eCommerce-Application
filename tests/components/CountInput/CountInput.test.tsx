import { render, act } from '@testing-library/react';
import { AuthProvider } from '@/contexts/AuthContext';
import CountInput from '@/components/CountInput/CountInput';

describe('CountInput tests', () => {
  describe('Render element', () => {
    let container: HTMLElement | null = null;

    const mockPromiseFm = (value: number): Promise<number | undefined> => {
      return new Promise((res) => {
        res(value);
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
        render(<CountInput onChange={mockPromiseFm} maxValue={1} minValue={9} />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const el = container?.querySelector('div');
      expect(el).toBeDefined();
    });

    test('Contains HTMLElement button', () => {
      act(() => {
        render(<CountInput onChange={mockPromiseFm} maxValue={1} minValue={9} />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const el = container?.querySelector('button');
      expect(el).toBeInstanceOf(HTMLElement);
    });

    test('Contains all buttons', () => {
      act(() => {
        render(<CountInput onChange={mockPromiseFm} maxValue={1} minValue={9} />, {
          container: container!,
          wrapper: AuthProvider,
        });
      });

      const els = container?.querySelectorAll('button');
      expect(els?.length).toBe(2);
    });
  });
});
