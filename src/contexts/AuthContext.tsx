import type { ReactNode } from 'react';
import type React from 'react';
import { createContext, useContext, useState } from 'react';
import { signInCustomer, signUpCustomer } from '@services/CustomerService';
import type { CustomerDraft, MyCustomerSignin } from '@commercetools/platform-sdk';
import { createPasswordAuthFlow } from '@services/ClientBuilder.ts';

interface AuthContextType {
  user: CustomerDraft | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (customerData: CustomerDraft) => Promise<void>;
  signOut: () => void;
}

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
  const [user, setUser] = useState<CustomerDraft | null>(null);

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const userData: MyCustomerSignin = { email, password };
      const result = await signInCustomer(userData);
      if (result.body.customer) {
        setUser(result.body.customer);
        await createPasswordAuthFlow({ username: email, password: password }).me().get().execute();
        localStorage.setItem('user', JSON.stringify(result.body.customer));
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
        setUser(result.body.customer);
        await createPasswordAuthFlow({ username: customerData.email, password: customerData.password! })
          .me()
          .get()
          .execute();
        localStorage.setItem('user', JSON.stringify(result.body.customer));
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new SignUpError(error.message, error);
      }
    }
  };

  const signOut = (): void => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
