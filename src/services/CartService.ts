import type {
  Cart,
  MyCartUpdateAction,
  MyCartAddLineItemAction,
  MyCartRemoveLineItemAction,
  MyCartChangeLineItemQuantityAction,
} from '@commercetools/platform-sdk';

import { createAuthFlow } from '@services/ClientBuilder';

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
  try {
    const responseCart = await createAuthFlow().me().activeCart().get().execute();
    if (responseCart.statusCode === 200) {
      return responseCart.body;
    }
  } catch (error) {
    console.info('No active cart exists.');
  }
  return null;
};

const changeCartService = async (actions: MyCartUpdateAction[], cart: Cart): Promise<Cart> => {
  const responseCart = await createAuthFlow()
    .me()
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions,
      },
    })
    .execute();

  if (responseCart.statusCode === 200) {
    return responseCart.body;
  }
  throw new Error('Failed to update cart');
};

export const addLineItemsService = async (sku: string, quantity: number, cart: Cart): Promise<Cart> => {
  const action: MyCartAddLineItemAction = {
    action: 'addLineItem',
    sku,
    quantity,
  };
  return await changeCartService([action], cart);
};

export const removeLineItemsService = async (lineItemId: string, cart: Cart): Promise<Cart> => {
  const action: MyCartRemoveLineItemAction = {
    action: 'removeLineItem',
    lineItemId,
  };
  return await changeCartService([action], cart);
};

export const setQuantityService = async (lineItemId: string, quantity: number, cart: Cart): Promise<Cart> => {
  const action: MyCartChangeLineItemQuantityAction = {
    action: 'changeLineItemQuantity',
    quantity,
    lineItemId,
  };
  return await changeCartService([action], cart);
};

export const clearCartService = async (cartId: string, version: number): Promise<void> => {
  await createAuthFlow().me().carts().withId({ ID: cartId }).delete({ queryArgs: { version } }).execute();
};

export const addDiscountCodeService = async ({ code }: { code: string }, cart: Cart): Promise<Cart> => {
  const actions: MyCartUpdateAction[] = [
    {
      action: 'addDiscountCode',
      code: code,
    },
  ];
  return await changeCartService(actions, cart);
};
