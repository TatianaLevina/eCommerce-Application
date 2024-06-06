import { createAuthFlow } from '@services/ClientBuilder.ts';
import type { Cart, MyCartUpdateAction } from '@commercetools/platform-sdk';

export const createCartService = async (cart: Cart | null, currency: string): Promise<Cart | null> => {
  if (!cart) {
    try {
      const responseCart = await createAuthFlow()
        .me()
        .carts()
        .post({
          body: {
            currency: currency,
          },
        })
        .execute();
      if (responseCart.statusCode === 201) {
        return responseCart.body;
      }
      return null;
    } catch (e) {
      console.error('createCartService', e);
      return null;
    }
  } else {
    return cart;
  }
};

export const getCartService = async (cart: Cart | null): Promise<Cart | null> => {
  if (!cart) {
    try {
      const responseCart = await createAuthFlow().me().activeCart().get().execute();
      if (responseCart.statusCode === 200) {
        return responseCart.body;
      }
      return null;
    } catch (e) {
      console.error('getCartService', e);
      return null;
    }
  } else {
    return cart;
  }
};

export const deleteCartService = async (cart: Cart | null): Promise<Cart | null> => {
  if (cart) {
    try {
      const responseCart = await createAuthFlow()
        .me()
        .carts()
        .withId({ ID: cart.id })
        .delete({ queryArgs: { version: cart.version } })
        .execute();
      if (responseCart.statusCode === 200) {
        return responseCart.body;
      }
      return null;
    } catch (e) {
      console.error('deleteCartService', e);
      return null;
    }
  } else {
    return null;
  }
};

type cartUpdateActions =
  | 'addLineItem'
  | 'removeLineItem'
  | 'addDiscountCode'
  | 'removeDiscountCode'
  | 'changeLineItemQuantity'; // DO WE NEED SMTH ELSE?

interface changeCartServiceParams {
  sku?: string;
  cartItemId?: string | string[];
  cartVersion: number;
  cartId: string;
  action: string;
  quantity: number | number[];
}

export const changeCartService = ({
  sku,
  cartVersion,
  cartId,
  cartItemId,
  action,
  quantity,
}: changeCartServiceParams) => {
  const actions = [];
  if (Array.isArray(cartItemId) && Array.isArray(quantity)) {
    cartItemId.map((item, i) => {
      actions.push({
        action: action as cartUpdateActions,
        sku,
        lineItemId: item,
        quantity: quantity[i],
      });
    });
  } else
    actions.push({
      action: action as cartUpdateActions,
      sku,
      lineItemId: cartItemId,
      quantity,
    });

  return createAuthFlow()
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: actions as MyCartUpdateAction[],
      },
    })
    .execute();
};
