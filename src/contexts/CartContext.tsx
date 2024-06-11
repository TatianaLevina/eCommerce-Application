import type React from 'react';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import type { Cart } from '@commercetools/platform-sdk';
import {
  getCartService,
  createCartService,
  addLineItemsService,
  removeLineItemsService,
  setQuantityService,
  clearCartService,
  addDiscountCodeService,
} from '@services/CartService';
import { useAuth } from '@contexts/AuthContext';

interface CartState {
  cart: Cart | null;
  error: string | null;
  loading: boolean;
}

interface CartContextType {
  state: CartState;
  addToCart: (sku: string, quantity: number) => Promise<void>;
  removeFromCart: (lineItemId: string) => Promise<void>;
  updateCartItemQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  addDiscountCode: (code: string) => Promise<void>;
  getCartItemCount: () => number;
}

interface SetCartAction {
  type: 'SET_CART';
  payload: Cart | null;
}

interface SetLoadingAction {
  type: 'SET_LOADING';
  payload: boolean;
}

interface SetErrorAction {
  type: 'SET_ERROR';
  payload: string;
}

interface ClearCartAction {
  type: 'CLEAR_CART';
}

type CartAction = SetCartAction | SetLoadingAction | SetErrorAction | ClearCartAction;

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, cart: action.payload, loading: false, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_CART':
      return { ...state, cart: null, loading: false, error: null };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, {
    cart: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const fetchCart = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        let cart = await getCartService();
        if (!cart) {
          cart = await createCartService('USD');
        }
        dispatch({ type: 'SET_CART', payload: cart });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load cart' });
      }
    };

    fetchCart();
  }, [user]);

  const addToCart = useCallback(
    async (sku: string, quantity: number) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        let cart = state.cart;
        if (!cart) {
          cart = await createCartService('USD'); // Create a new cart if none exists
          dispatch({ type: 'SET_CART', payload: cart });
        }
        if (cart) {
          const updatedCart = await addLineItemsService(sku, quantity, cart);
          dispatch({ type: 'SET_CART', payload: updatedCart });
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to add item to cart' });
      }
    },
    [state.cart],
  );

  const removeFromCart = useCallback(
    async (lineItemId: string) => {
      if (!state.cart) return;
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const updatedCart = await removeLineItemsService(lineItemId, state.cart);
        dispatch({ type: 'SET_CART', payload: updatedCart });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to remove item from cart' });
      }
    },
    [state.cart],
  );

  const updateCartItemQuantity = useCallback(
    async (lineItemId: string, quantity: number) => {
      if (!state.cart) return;
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const updatedCart = await setQuantityService(lineItemId, quantity, state.cart);
        dispatch({ type: 'SET_CART', payload: updatedCart });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to update item quantity' });
      }
    },
    [state.cart],
  );

  const clearCart = useCallback(async () => {
    if (!state.cart) return;
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await clearCartService(state.cart.id, state.cart.version);
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to clear cart' });
    }
  }, [state.cart]);

  const addDiscountCode = useCallback(
    async (code: string) => {
      if (!state.cart) return;
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const updatedCart = await addDiscountCodeService({ code }, state.cart);
        dispatch({ type: 'SET_CART', payload: updatedCart });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to apply discount code' });
      }
    },
    [state.cart],
  );

  const getCartItemCount = () => {
    return state.cart?.lineItems.reduce((count, item) => count + item.quantity, 0) || 0;
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        addDiscountCode,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
