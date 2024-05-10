import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/Layout/Layout.tsx';
import { AuthProvider } from './contexts/AuthContext';
import routes from './router/routerConfig';
import ProtectedRoute from './router/ProtectedRoute';

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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
