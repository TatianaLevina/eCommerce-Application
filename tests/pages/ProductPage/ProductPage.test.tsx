import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@contexts/AuthContext';
import ProductPage from '@pages/ProductPage/ProductPage';
import { CategoryProvider } from '@contexts/CategoriesContext';
import { BreadcrumbsProvider } from '@contexts/BreadcrumbsContext';

describe('ProductPage tests', () => {
  describe('Render element', () => {
    // const formTestId = 'qwueyque8723hq8w';
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
                <ProductPage />
              </BreadcrumbsProvider>
            </CategoryProvider>
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });
      const el = container?.querySelector('.category-page');
      expect(el).toBeDefined();
    });
  });
});
