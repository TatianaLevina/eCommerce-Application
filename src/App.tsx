import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '@components/AppLayout/AppLayout.tsx';
import { AuthProvider } from '@contexts/AuthContext';
import routes from '@router/routerConfig';
import ProtectedRoute from '@router/ProtectedRoute';
import ErrorPage from './pages/ErrorPage/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
          <Route
            path="*"
            element={
              <AppLayout>
                <ErrorPage />
              </AppLayout>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
