import { createAuthFlow } from '@services/ClientBuilder.ts';
import type {
  Cart,
  DiscountCodeReference,
  ErrorResponse,
  MyCartAddDiscountCodeAction,
  MyCartAddLineItemAction,
  MyCartChangeLineItemQuantityAction,
  MyCartRemoveDiscountCodeAction,
  MyCartRemoveLineItemAction,
  MyCartUpdateAction,
} from '@commercetools/platform-sdk';

export class CartError extends Error {
  statusCode: number | undefined;
  errorObj: ErrorResponse;

  constructor(errorObj: ErrorResponse) {
    super(errorObj.message);
    this.errorObj = errorObj;
  }
}

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

/**
 * Creating cart.
 * @param cart cart from storage
 * @param currency set surrency. Default is 'USD'
 * @returns new cart wrapped in Promise | null if something wrong
 */
export const createCartService = async (cart: Cart | null, currency: string = 'USD'): Promise<Cart> => {
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
      } else {
        throw new Error('Something is bad in createCartService');
      }
    } catch (e) {
      throw new CartError(e as ErrorResponse);
    }
  } else {
    return cart;
  }
};

/**
 * gets the basket from the database
 * @returns new cart wrapped in Promise | null if something wrong
 */
export const getCartService = async (): Promise<Cart> => {
  try {
    const responseCart = await createAuthFlow().me().activeCart().get().execute();
    if (responseCart.statusCode === 200) {
      return responseCart.body;
    } else {
      throw new Error('Something is bad in getCartService');
    }
  } catch (e) {
    throw new CartError(e as ErrorResponse);
  }
};

/**
 * Deletes the cart
 * @param cart cart from storage
 * @returns deleted basket, if there is no basket in the database, then null. Wrapped in Promise
 */
export const deleteCartService = async (cart: Cart | null): Promise<Cart> => {
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
      } else {
        throw new Error('Something is bad in getCartService');
      }
    } catch (e) {
      throw new CartError(e as ErrorResponse);
    }
  } else {
    throw new Error('Cart is null!');
  }
};

/**
 * General method that changes the basket in the database
 * @param actions MyCartUpdateAction array to change cart
 * @param cart cart from storage
 * @returns new cart wrapped in Promise | null if something wrong
 */
const changeCartService = async (actions: MyCartUpdateAction[], cart: Cart): Promise<Cart> => {
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
      } else {
        throw new Error('No changes to the shopping cart occurred');
      }
    } catch (e) {
      throw new CartError(e as ErrorResponse);
    }
  } else {
    throw new Error('Cart is null!');
  }
};

/**
 * creates a cart change object with the addition of an item and calls the main change method.
 * @param param0 a ChangeCartServiceParams object containing the product ID
 * @param cart cart from storage
 * @returns new cart wrapped in Promise | null if something wrong
 */
export const addLineItemsService = async (
  { productId /*, sku*/ }: ChangeCartServiceParams,
  cart: Cart,
): Promise<Cart> => {
  const actions: MyCartUpdateAction[] = [];
  const action: MyCartAddLineItemAction = {
    action: CartUpdateActions.addItem,
    productId: productId,
    // sku: sku,
  };
  actions.push(action);

  return await changeCartService(actions, cart);
};

/**
 * creates a cart change object to remove the item and calls the main change method
 * @param param0 a ChangeCartServiceParams object containing the lineItemId (from cart)
 * @param cart cart from storage
 * @returns new cart wrapped in Promise | null if something wrong
 */
export const removeLineItemsService = async ({ lineItemId }: ChangeCartServiceParams, cart: Cart): Promise<Cart> => {
  const actions: MyCartUpdateAction[] = [];
  const action: MyCartRemoveLineItemAction = {
    action: CartUpdateActions.removeItem,
    lineItemId: lineItemId,
  };
  actions.push(action);

  return await changeCartService(actions, cart);
};

/**
 * creates a cart change object with a change in the quantity of the item and calls the main change method
 * @param param0 a ChangeCartServiceParams object containing the lineItemId (from cart) and new quantity
 * @param cart cart from storage
 * @returns new cart wrapped in Promise | null if something wrong
 */
export const setQuantityService = async (
  { lineItemId, quantity }: ChangeCartServiceParams,
  cart: Cart,
): Promise<Cart> => {
  const actions: MyCartUpdateAction[] = [];
  const action: MyCartChangeLineItemQuantityAction = {
    action: CartUpdateActions.changeQuantity,
    quantity: quantity!,
    lineItemId: lineItemId,
  };
  actions.push(action);

  return await changeCartService(actions, cart);
};

/**
 * creates a cart change object with the addition of a promo code and calls the main change method
 * @param param0 a ChangeCartServiceParams object containing the promocode
 * @param cart cart from storage
 * @returns new cart wrapped in Promise | null if something wrong
 */
export const addDiscountCodeService = async ({ code }: ChangeCartServiceParams, cart: Cart): Promise<Cart> => {
  const actions: MyCartUpdateAction[] = [];
  const action: MyCartAddDiscountCodeAction = {
    action: CartUpdateActions.addDiscount,
    code: code!,
  };
  actions.push(action);

  return await changeCartService(actions, cart);
};

/**
 * creates a cart change object with the deletion of the promo code and calls the main change method
 * @param param0 a ChangeCartServiceParams object containing the link to promocode (from cart)
 * @param cart cart from storage
 * @returns new cart wrapped in Promise | null if something wrong
 */
export const removeDiscountCodeService = async (
  { discountCode }: ChangeCartServiceParams,
  cart: Cart,
): Promise<Cart> => {
  const actions: MyCartUpdateAction[] = [];
  const action: MyCartRemoveDiscountCodeAction = {
    action: CartUpdateActions.removeDiscount,
    discountCode: discountCode!,
  };
  actions.push(action);

  return await changeCartService(actions, cart);
};
