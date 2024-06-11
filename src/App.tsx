import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '@components/AppLayout/AppLayout.tsx';
import { AuthProvider } from '@contexts/AuthContext';
import routes from '@router/routerConfig';
import ProtectedRoute from '@router/ProtectedRoute';
import { CategoryProvider } from '@contexts/CategoriesContext.tsx';
import { BreadcrumbsProvider } from '@contexts/BreadcrumbsContext.tsx';
import { CartProvider } from './contexts/CartContext';
import { DiscountsProvider } from './contexts/DiscountsContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CategoryProvider>
          <CartProvider>
            <DiscountsProvider>
              <BreadcrumbsProvider>
                <Routes>
                  {routes.map(({ path, element: Element, protected: protectionType, children }) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        <AppLayout>
                          <ProtectedRoute
                            element={Element}
                            protected={protectionType as 'auth' | 'guest' | undefined}
                          />
                        </AppLayout>
                      }
                    >
                      {children &&
                        children.map(({ path: childPath, element: ChildElement }) => (
                          <Route key={childPath} path={childPath} element={<ChildElement />} />
                        ))}
                    </Route>
                  ))}
                </Routes>
              </BreadcrumbsProvider>
            </DiscountsProvider>
          </CartProvider>
        </CategoryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
