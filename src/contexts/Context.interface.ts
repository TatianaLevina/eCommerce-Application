import type { Cart, Category, Customer, CustomerDraft, DiscountCode } from '@commercetools/platform-sdk';

export interface CartState {
  cart: Cart | null;
  error: string | null;
  loading: boolean;
}

export interface CartContextType {
  state: CartState;
  addToCart: (sku: string, quantity: number) => Promise<void>;
  removeFromCart: (lineItemId: string) => Promise<void>;
  updateCartItemQuantity: (lineItemId: string, quantity: number) => Promise<number | undefined>;
  clearCart: () => Promise<void>;
  addDiscountCode: (code: string) => Promise<void>;
  getCartItemCount: () => number;
  setCart: (cart: Cart | null) => void;
}

export interface SetCartAction {
  type: 'SET_CART';
  payload: Cart | null;
}

export interface SetLoadingAction {
  type: 'SET_LOADING';
  payload: boolean;
}

export interface SetErrorAction {
  type: 'SET_ERROR';
  payload: string;
}

export interface ClearCartAction {
  type: 'CLEAR_CART';
}

export interface AuthContextType {
  user: Customer | null;
  updateUser: (user: Customer) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (customerData: CustomerDraft) => Promise<void>;
  signOut: () => void;
}

export interface BreadcrumbItem {
  href?: string;
  title: React.ReactNode;
  menu?: boolean;
}

export interface BreadcrumbsContextType {
  items: BreadcrumbItem[];
  setItems: (items: BreadcrumbItem[]) => void;
}

export interface CategoryContextType {
  categories: Category[] | null;
  loading: boolean;
}

export interface DiscountsContextType {
  discountCodes: DiscountCode[];
}

export interface DrawerState {
  isCollapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
