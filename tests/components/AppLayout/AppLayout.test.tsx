import AppLayout from '@components/AppLayout/AppLayout';
import { AuthProvider } from '@contexts/AuthContext';
import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('AppLayaut component tests', () => {
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

    test('Should render header', () => {
      act(() => {
        render(
          <AuthProvider>
            <AppLayout>
              <div></div>
            </AppLayout>
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const headerEl = container?.querySelector('header');
      expect(headerEl).toBeDefined();
    });

    test('Should render footer', () => {
      act(() => {
        render(
          <AuthProvider>
            <AppLayout>
              <div></div>
            </AppLayout>
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const footerEl = container?.querySelector('footer');
      expect(footerEl).toBeDefined();
    });

    test('Should render main', () => {
      act(() => {
        render(
          <AuthProvider>
            <AppLayout>
              <div></div>
            </AppLayout>
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const mainEl = container?.querySelector('main');
      expect(mainEl).toBeDefined();
    });

    test('Contains test div element', () => {
      act(() => {
        render(
          <AuthProvider>
            <AppLayout>
              <div className="test">test</div>
            </AppLayout>
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const els = container?.querySelector('.test');
      expect(els?.textContent).toBe('test');
    });
  });
});
