import type React from 'react';
import { render, act } from '@testing-library/react';

import { AuthProvider } from '@/contexts/AuthContext';
import CountInput from '@/components/CountInput/CountInput';
import type { ReactNode } from 'react';

const AuthProviderWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

describe('CountInput tests', () => {
  describe('Render element', () => {
    let container: HTMLElement | null = null;

    const mockPromiseFm = (): Promise<void> => {
      return new Promise((res) => {
        res();
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
        render(<CountInput onChange={mockPromiseFm} maxValue={99} minValue={1} initialValue={1} />, {
          container: container!,
          wrapper: AuthProviderWrapper,
        });
      });

      const el = container?.querySelector('div');
      expect(el).toBeDefined();
    });

    test('Contains HTMLElement button', () => {
      act(() => {
        render(<CountInput onChange={mockPromiseFm} maxValue={99} minValue={1} initialValue={1} />, {
          container: container!,
          wrapper: AuthProviderWrapper,
        });
      });

      const el = container?.querySelector('button');
      expect(el).toBeInstanceOf(HTMLElement);
    });

    test('Contains all buttons', () => {
      act(() => {
        render(<CountInput onChange={mockPromiseFm} maxValue={99} minValue={1} initialValue={1} />, {
          container: container!,
          wrapper: AuthProviderWrapper,
        });
      });

      const els = container?.querySelectorAll('button');
      expect(els?.length).toBe(2);
    });
  });
});
