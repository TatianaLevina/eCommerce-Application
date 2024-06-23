import type React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import type { ProtectedRouteProps } from './ProtectedRouteProps.interface';

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Component, protected: protectionType }) => {
  const { user } = useAuth();
  if (protectionType === 'auth' && !user) {
    return <Navigate to="/login" replace />;
  } else if (protectionType === 'guest' && user) {
    return <Navigate to="/" replace />;
  }

  return <Component />;
};

export default ProtectedRoute;
