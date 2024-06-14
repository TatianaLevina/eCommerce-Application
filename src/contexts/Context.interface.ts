import type { Cart } from '@commercetools/platform-sdk';

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
