import type { ElementType } from 'react';

export interface ProtectedRouteProps {
  element: ElementType;
  protected?: 'auth' | 'guest';
}
