import { createAuthFlow } from '@services/ClientBuilder.ts';
import type { Cart } from '@commercetools/platform-sdk';

export const getCartService = async (id: string): Promise<Cart | null> => {
  try {
    const responseCart = await createAuthFlow().carts().withCustomerId({ customerId: id }).get().execute();
    if (responseCart.statusCode === 200) {
      return responseCart.body;
    }
    return null;
  } catch (e) {
    console.error('getCartService', e);
    return null;
  }
};

export const createCartService = async (id: string, currency: string): Promise<void> => {
  try {
    const responseCart = await createAuthFlow()
      .carts()
      .post({
        body: {
          key: id,
          currency: currency,
          customerId: id,
        },
      })
      .execute();
    if (responseCart.statusCode === 201) {
      console.log('Yes!');
    }
  } catch (e) {
    console.error('createCartService', e);
  }
};
