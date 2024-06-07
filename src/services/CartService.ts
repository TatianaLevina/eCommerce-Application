import { createAuthFlow } from '@services/ClientBuilder.ts';
import type {
  Cart,
  DiscountCodeReference,
  MyCartAddDiscountCodeAction,
  MyCartAddLineItemAction,
  MyCartChangeLineItemQuantityAction,
  MyCartRemoveDiscountCodeAction,
  MyCartRemoveLineItemAction,
  MyCartUpdateAction,
} from '@commercetools/platform-sdk';

export const createCartService = async (cart: Cart | null, currency: string = 'USD'): Promise<Cart | null> => {
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

export enum CartUpdateActions {
  addItem = 'addLineItem',
  removeItem = 'removeLineItem',
  addDiscount = 'addDiscountCode',
  removeDiscount = 'removeDiscountCode',
  changeQuantity = 'changeLineItemQuantity',
} // DO WE NEED SMTH ELSE?

interface ChangeCartServiceParams {
  sku?: string;
  productId?: string;
  lineItemId?: string;
  code?: string;
  discountCode?: DiscountCodeReference;
  quantity?: number;
}

export const changeCartService = async (actions: MyCartUpdateAction[], cart: Cart) => {
  if (cart) {
    try {
      const responseCart = await createAuthFlow()
        .me()
        .carts()
        .withId({ ID: cart.id })
        .post({
          body: {
            version: cart.version,
            actions: actions,
          },
        })
        .execute();
      if (responseCart.statusCode === 200) {
        return responseCart.body; // ? Here we receive an updated basket object, which we write to the storage
      }
      return null;
    } catch (e) {
      console.error('deleteCartService', e);
      return null;
    }
  } else {
    createCartService(cart);
  }
};

export const addLineItemsService = async ({ productId /*, sku*/ }: ChangeCartServiceParams, cart: Cart) => {
  const actions: MyCartUpdateAction[] = [];
  actions.push({
    action: CartUpdateActions.addItem,
    productId: productId,
    // sku: sku,
  } as MyCartAddLineItemAction);

  return await changeCartService(actions, cart);
};

export const removeLineItemsService = async ({ lineItemId }: ChangeCartServiceParams, cart: Cart) => {
  const actions: MyCartUpdateAction[] = [];
  actions.push({
    action: CartUpdateActions.removeItem,
    lineItemId: lineItemId,
  } as MyCartRemoveLineItemAction);

  return await changeCartService(actions, cart);
};

export const setQuantityService = async ({ lineItemId, quantity }: ChangeCartServiceParams, cart: Cart) => {
  const actions: MyCartUpdateAction[] = [];
  actions.push({
    action: CartUpdateActions.changeQuantity,
    quantity: quantity,
    lineItemId: lineItemId,
  } as MyCartChangeLineItemQuantityAction);

  return await changeCartService(actions, cart);
};

export const addDiscountCodeService = async ({ code }: ChangeCartServiceParams, cart: Cart) => {
  const actions: MyCartUpdateAction[] = [];
  actions.push({
    action: CartUpdateActions.addDiscount,
    code: code,
  } as MyCartAddDiscountCodeAction);

  return await changeCartService(actions, cart);
};

export const removeDiscountCodeService = async ({ discountCode }: ChangeCartServiceParams, cart: Cart) => {
  const actions: MyCartUpdateAction[] = [];
  actions.push({
    action: CartUpdateActions.removeDiscount,
    discountCode: discountCode,
  } as MyCartRemoveDiscountCodeAction);

  return await changeCartService(actions, cart);
};
