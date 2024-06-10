import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { Cart, DiscountCodeReference } from '@commercetools/platform-sdk';
import {
  CartError,
  addDiscountCodeService,
  addLineItemsService,
  createCartService,
  deleteCartService,
  getCartService,
  removeDiscountCodeService,
  removeLineItemsService,
  setQuantityService,
} from '@/services/CartService';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  createCart: () => void;
  getCart: () => void;
  deleteCart: () => void;
  checkIsProdInCart: (productId: string) => boolean;
  addItemToCart: (productId: string) => void;
  removeItemFromCart: (lineItemId: string) => void;
  removeItemFromCartByProductId: (productId: string) => void;
  addCodeToCart: (code: string) => void;
  removeCodeFromCart: (discountCode: DiscountCodeReference) => void;
  setItemQuantity: (lineItemId: string, quantity: number) => void;
  getItemQuantity: (lineItemId: string) => number | undefined;
  getProductsCount: () => number | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const createCart = () => {
    console.log('Creating the cart...');
    setLoading(true);
    createCartService(cart, 'USD')
      .then((result) => {
        setCart(result);
        setLoading(false);
      })
      .catch((e) => {
        if (e instanceof CartError) {
          console.error(e.message);
          setLoading(false);
        }
      });
  };

  const getCart = () => {
    setLoading(true);
    getCartService()
      .then((result) => {
        setCart(result);
      })
      .catch((e) => {
        if (e instanceof CartError) {
          console.error(e.message);
          setLoading(false);
        }
      });
    setLoading(false);
  };

  const deleteCart = () => {
    setLoading(true);
    deleteCartService(cart)
      .then((result) => {
        if (result) {
          setCart(null);
        }
        setLoading(false);
      })
      .catch((e) => {
        if (e instanceof CartError) {
          console.error(e.message);
          setLoading(false);
        }
      });
  };

  const checkIsProdInCart = (productId: string) => {
    const result: boolean = cart?.lineItems.find((x) => x.productId === productId) ? true : false;
    return result;
  };

  const getProductsCount = () => cart?.lineItems.length;

  const addItemToCart = (productId: string) => {
    if (cart) {
      setLoading(true);
      addLineItemsService({ productId: productId }, cart)
        .then((result) => {
          setCart(result ? result : null);
          setLoading(false);
        })
        .catch((e) => {
          if (e instanceof CartError) {
            console.error(e.message);
            setLoading(false);
          }
        });
    }
  };

  const removeItemFromCart = (lineItemId: string) => {
    if (cart) {
      setLoading(true);
      removeLineItemsService({ lineItemId: lineItemId }, cart)
        .then((result) => {
          setCart(result ? result : null);
          setLoading(false);
        })
        .catch((e) => {
          if (e instanceof CartError) {
            console.error(e.message);
            setLoading(false);
          }
        });
    }
  };

  const removeItemFromCartByProductId = (productId: string) => {
    const lineItemId = _getItemLineIdByProductId(productId);
    if (lineItemId) {
      removeItemFromCart(lineItemId);
    }
  };

  const addCodeToCart = (code: string) => {
    if (cart) {
      addDiscountCodeService({ code: code }, cart)
        .then((result) => {
          setCart(result ? result : null);
          setLoading(false);
        })
        .catch((e) => {
          if (e instanceof CartError) {
            console.error(e.message);
            setLoading(false);
          }
        });
    }
  };

  const removeCodeFromCart = (discountCode: DiscountCodeReference) => {
    if (cart) {
      removeDiscountCodeService({ discountCode: discountCode }, cart)
        .then((result) => {
          setCart(result ? result : null);
          setLoading(false);
        })
        .catch((e) => {
          if (e instanceof CartError) {
            console.error(e.message);
            setLoading(false);
          }
        });
    }
  };

  const setItemQuantity = (lineItemId: string, quantity: number) => {
    if (cart) {
      //? User enters
      setQuantityService({ quantity: quantity, lineItemId: lineItemId }, cart)
        .then((result) => {
          setCart(result ? result : null);
          setLoading(false);
        })
        .catch((e) => {
          if (e instanceof CartError) {
            console.error(e.message);
            setLoading(false);
          }
        });
    }
  };

  const getItemQuantity = (lineItemId: string) => {
    return cart?.lineItems.find((item) => item.id === lineItemId)?.quantity;
  };

  const _getItemLineIdByProductId = (productId: string) => cart?.lineItems.find((x) => x.productId === productId)?.id;

  useEffect(() => {
    const fetchCart = () => {
      getCartService()
        .then((cartData) => {
          setCart(cartData);
          setLoading(false);
        })
        .catch((e) => {
          if (e instanceof CartError) {
            console.error(e.message);
            setLoading(false);
          }
        });
    };

    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        loading,
        createCart,
        getCart,
        deleteCart,
        checkIsProdInCart,
        addItemToCart,
        removeItemFromCart,
        removeItemFromCartByProductId,
        addCodeToCart,
        removeCodeFromCart,
        setItemQuantity,
        getItemQuantity,
        getProductsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
