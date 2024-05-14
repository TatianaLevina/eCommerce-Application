import { AuthProvider } from '@contexts/AuthContext';
import RegisterPage from '@pages/RegisterPage/RegisterPage';
import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('RegisterPage tests', () => {
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
        render(
          <AuthProvider>
            <RegisterPage />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const el = container?.querySelector('form');
      expect(el).toBeDefined();
    });

    test('Contains HTMLFormElement', () => {
      act(() => {
        render(
          <AuthProvider>
            <RegisterPage />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const el = container?.querySelector('form');
      expect(el).toBeInstanceOf(HTMLFormElement);
    });

    test('Contains inputs', () => {
      act(() => {
        render(
          <AuthProvider>
            <RegisterPage />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const els = container?.querySelectorAll('input');
      expect(els?.length).toBe(11);
    });
  });
});
