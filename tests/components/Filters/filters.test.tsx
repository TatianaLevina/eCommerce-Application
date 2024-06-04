import { AuthProvider } from '@contexts/AuthContext';
import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Filters from '@components/Filters/Filters';

describe('Filters component tests', () => {
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
        const fnStr = (x: string): void => {
          console.log(x);
        };
        const fnArr = (x: string[]): void => {
          x.forEach((y) => console.log(y));
        };
        const fnUnNum = (x: number | undefined): void => {
          console.log(x);
        };
        render(
          <AuthProvider>
            <Filters
              allFilters={{ manufacturerFilters: [], materialFilters: [] }}
              setManufacturer={fnArr}
              manufacturer={['']}
              setMaterial={fnArr}
              material={['']}
              searchText={'test'}
              setSearchText={fnStr}
              sortOrder={'test'}
              setSortOrder={fnStr}
              priceFrom={4}
              setPriceFrom={fnUnNum}
              priceTo={5}
              setPriceTo={fnUnNum}
              resetFilters={() => {}}
              drawerOpen={true}
              toggleDrawer={() => {}}
            />
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

    test('Contains HTMLElements', () => {
      act(() => {
        const fnStr = (x: string): void => {
          console.log(x);
        };
        const fnArr = (x: string[]): void => {
          x.forEach((y) => console.log(y));
        };
        const fnUnNum = (x: number | undefined): void => {
          console.log(x);
        };
        render(
          <AuthProvider>
            <Filters
              allFilters={{ manufacturerFilters: [], materialFilters: [] }}
              setManufacturer={fnArr}
              manufacturer={['']}
              setMaterial={fnArr}
              material={['']}
              searchText={'test'}
              setSearchText={fnStr}
              sortOrder={'test'}
              setSortOrder={fnStr}
              priceFrom={4}
              setPriceFrom={fnUnNum}
              priceTo={5}
              setPriceTo={fnUnNum}
              resetFilters={() => {}}
              drawerOpen={true}
              toggleDrawer={() => {}}
            />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const inputEl = container?.querySelector('input');
      const buttonEl = container?.querySelector('button');
      expect(inputEl).toBeInstanceOf(HTMLInputElement);
      expect(buttonEl).toBeInstanceOf(HTMLButtonElement);
    });

    test('Contains inputs and buttons', () => {
      act(() => {
        const fnStr = (x: string): void => {
          console.log(x);
        };
        const fnArr = (x: string[]): void => {
          x.forEach((y) => console.log(y));
        };
        const fnUnNum = (x: number | undefined): void => {
          console.log(x);
        };
        render(
          <AuthProvider>
            <Filters
              allFilters={{ manufacturerFilters: [], materialFilters: [] }}
              setManufacturer={fnArr}
              manufacturer={['']}
              setMaterial={fnArr}
              material={['']}
              searchText={'test'}
              setSearchText={fnStr}
              sortOrder={'test'}
              setSortOrder={fnStr}
              priceFrom={4}
              setPriceFrom={fnUnNum}
              priceTo={5}
              setPriceTo={fnUnNum}
              resetFilters={() => {}}
              drawerOpen={true}
              toggleDrawer={() => {}}
            />
          </AuthProvider>,
          {
            wrapper: BrowserRouter,
            container: container!,
          },
        );
      });

      const inputEls = container?.querySelectorAll('input');
      const buttonEls = container?.querySelectorAll('button');
      expect(inputEls?.length).toBe(6);
      expect(buttonEls?.length).toBe(2);
    });
  });
});
