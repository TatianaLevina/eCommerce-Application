import type React from 'react';
import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import type { Customer, CustomerDraft, MyCustomerSignin, Cart } from '@commercetools/platform-sdk';

import { signInCustomer, signUpCustomer } from '@services/CustomerService';
import { createAuthFlow, createPasswordAuthFlow, resetClientInstance } from '@services/ClientBuilder';
import { getCartService, createCartService } from '@services/CartService';
import { CartProvider } from '@contexts/CartContext';
import { invalidateToken } from '@services/TokenCache';
import type { AuthContextType } from './Context.interface';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export class SignUpError extends Error {
  public cause: Error;
  constructor(message: string, cause: Error) {
    super(message);
    this.stack = cause.stack;
    this.name = 'SignUpError';
    this.cause = cause;
  }
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Customer | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [initialCart, setInitialCart] = useState<Cart | null>(null);

  const updateUser = (user: Customer) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  useEffect(() => {
    const fetchCartOnInit = async () => {
      const cartExists = localStorage.getItem('cartExists') === 'true';
      if (cartExists) {
        const cart = await getCartService();
        setInitialCart(cart);
      }
    };
    fetchCartOnInit();
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const userData: MyCustomerSignin = { email, password };
      const result = await signInCustomer(userData);
      if (result.body.customer) {
        setUser(result.body.customer);
        await createPasswordAuthFlow({ username: email, password: password }).me().get().execute();
        localStorage.setItem('user', JSON.stringify(result.body.customer));

        if (!initialCart) {
          let cart = await getCartService();
          if (!cart) {
            cart = await createCartService('USD');
            localStorage.setItem('cartExists', 'true');
          }
          setInitialCart(cart);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new SignUpError(error.message, error);
      }
    }
  };

  const signUp = async (customerData: CustomerDraft): Promise<void> => {
    try {
      const result = await signUpCustomer(customerData);
      if (result.body.customer) {
        await signIn(customerData.email, customerData.password!);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new SignUpError(error.message, error);
      }
    }
  };

  const signOut = async (): Promise<void> => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cartExists');
    setInitialCart(null);
    invalidateToken();
    resetClientInstance();
    await createAuthFlow().categories().get().execute();
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, signIn, signUp, signOut }}>
      <CartProvider initialCart={initialCart}>{children}</CartProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
