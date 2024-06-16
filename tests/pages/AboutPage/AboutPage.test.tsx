import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '@contexts/AuthContext';
import AboutPage from '@pages/AboutPage/AboutPage';

describe('AboutPage tests', () => {
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

    test('Should AboutPage be defined', () => {
      act(() => {
        render(
          <AuthProvider>
            <AboutPage />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const el = container?.querySelector('div');
      expect(el).toBeDefined();
    });

    test('Contains HTMLElement', () => {
      act(() => {
        render(
          <AuthProvider>
            <AboutPage />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const el = container?.querySelector('div');
      expect(el).toBeInstanceOf(HTMLElement);
    });

    // test('contains inputs', () => {
    //   act(() => {
    //     render(
    //       <AuthProvider>
    //         <AboutPage />
    //       </AuthProvider>,
    //       {
    //         wrapper: BrowserRouter,
    //         container: container!,
    //       },
    //     );
    //   });

    //   const els = container?.querySelectorAll('input');
    //   expect(els?.length).toBe(11);
    // });
  });
});
