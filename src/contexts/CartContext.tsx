import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { Cart, DiscountCodeReference } from '@commercetools/platform-sdk';
import {
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
    setLoading(true);
    createCartService(cart, 'USD')
      .then((result) => {
        setCart(result);
        console.log('create: ', result);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  const getCart = () => {
    setLoading(true);
    getCartService()
      .then((result) => {
        setCart(result);
        console.log('get: ', result);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
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
        console.log('delete: ', result);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const checkIsProdInCart = (productId: string) => {
    const result: boolean = cart?.lineItems.find((x) => x.productId === productId) ? true : false;
    console.log(result);
    return result;
  };

  const getProductsCount = () => {
    console.log(cart?.lineItems.length);
    return cart?.lineItems.length;
  };

  const addItemToCart = (productId: string) => {
    if (cart) {
      setLoading(true);
      addLineItemsService({ productId: productId }, cart)
        .then((result) => {
          setCart(result ? result : null);
          setLoading(false);
          console.log(result);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
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
          console.log(result);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    }
  };

  const addCodeToCart = (code: string) => {
    if (cart) {
      addDiscountCodeService({ code: code }, cart)
        .then((result) => {
          setCart(result ? result : null);
          setLoading(false);
          console.log(result);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    }
  };

  const removeCodeFromCart = (discountCode: DiscountCodeReference) => {
    if (cart) {
      removeDiscountCodeService({ discountCode: discountCode }, cart)
        .then((result) => {
          setCart(result ? result : null);
          setLoading(false);
          console.log(result);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
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
          console.log(result);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    }
  };

  const getItemQuantity = (lineItemId: string) => {
    return cart?.lineItems.find((item) => item.id === lineItemId)?.quantity;
  };

  useEffect(() => {
    const fetchCart = async () => {
      const cartData = await getCartService();
      setCart(cartData);
      setLoading(false);
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
