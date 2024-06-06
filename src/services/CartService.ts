import { createAuthFlow } from '@services/ClientBuilder.ts';
import type { Cart } from '@commercetools/platform-sdk';

export const createCartService = async (currency: string): Promise<Cart | null> => {
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
};

export const getCartService = async (): Promise<Cart | null> => {
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
};

export const deleteCartService = async (cartId: string, version: number): Promise<Cart | null> => {
  try {
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
  } catch (e) {
    console.error('deleteCartService', e);
    return null;
  }
};
