import { createAuthFlow } from '@services/ClientBuilder.ts';
import type { Cart, MyCartUpdateAction } from '@commercetools/platform-sdk';

export const createCartService = async (currency: string): Promise<Cart | null> => {
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
};

export const getCartService = async (): Promise<Cart | null> => {
  const responseCart = await createAuthFlow().me().activeCart().get().execute();
  if (responseCart.statusCode === 200) {
    return responseCart.body;
  }
  return null;
};

export const deleteCartService = async (cartId: string, version: number): Promise<Cart | null> => {
  const responseCart = await createAuthFlow()
    .me()
    .carts()
    .withId({ ID: cartId })
    .delete({ queryArgs: { version } })
    .execute();
  if (responseCart.statusCode === 200) {
    return responseCart.body;
  }
  return null;
};

type cartUpdateActions = 'addLineItem' | 'removeLineItem' | 'addDiscountCode' | 'removeDiscountCode'; // DO WE NEED SMTH ELSE?

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
