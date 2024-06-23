import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '@contexts/AuthContext';
import CatalogMainPage from '@pages/CatalogPage/CatalogMainPage.tsx';
import { CategoryProvider } from '@contexts/CategoriesContext.tsx';
import { BreadcrumbsProvider } from '@contexts/BreadcrumbsContext.tsx';

describe('CatalogMainPage tests', () => {
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
            <CategoryProvider>
              <BreadcrumbsProvider>
                <CatalogMainPage />
              </BreadcrumbsProvider>
            </CategoryProvider>
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
            <CategoryProvider>
              <BreadcrumbsProvider>
                <CatalogMainPage />
              </BreadcrumbsProvider>
            </CategoryProvider>
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
  });
});
