import { render, act } from '@testing-library/react';
import Login from '@pages/LoginPage/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@contexts/AuthContext';

describe('LoginPage tests', () => {
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
            <Login />
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

    test('contains HTMLFormElement', () => {
      act(() => {
        render(
          <AuthProvider>
            <Login />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });
      const el = container?.querySelector('form');
      expect(el).toBeInstanceOf(HTMLElement);
    });

    test('contains inputs', () => {
      act(() => {
        render(
          <AuthProvider>
            <Login />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });
      const els = container?.querySelectorAll('input');
      expect(els?.length).toBe(2);
    });
  });
});
