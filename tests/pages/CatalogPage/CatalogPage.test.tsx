import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '@contexts/AuthContext';
import { CategoryProvider } from '@contexts/CategoriesContext.tsx';
import { BreadcrumbsProvider } from '@contexts/BreadcrumbsContext.tsx';
import CatalogPage from '@pages/CatalogPage/CatalogPage';

describe('CatalogPage tests', () => {
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
                <CatalogPage />
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
  });
});
