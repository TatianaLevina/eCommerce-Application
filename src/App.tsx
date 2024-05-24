import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '@components/AppLayout/AppLayout.tsx';
import { AuthProvider } from '@contexts/AuthContext';
import routes from '@router/routerConfig';
import ProtectedRoute from '@router/ProtectedRoute';
import { CategoryProvider } from '@contexts/CategoriesContext.tsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CategoryProvider>
          <Routes>
            {routes.map(({ path, element: Element, protected: protectionType }) => (
              <Route
                key={path}
                path={path}
                element={
                  <AppLayout>
                    <ProtectedRoute element={Element} protected={protectionType as 'auth' | 'guest' | undefined} />
                  </AppLayout>
                }
              />
            ))}
          </Routes>
        </CategoryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
