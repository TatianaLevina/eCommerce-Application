import { useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { DiscountCodeReference, Cart } from '@commercetools/platform-sdk';
import CartItem from '@components/CartItem/CartItem';
import '@pages/CartPage/CartPage.scss';
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
// import { divide, result } from 'lodash';
// import ProductCard from '@/components/ProductCard/ProductCard';
/*
const cart: Cart = {
  id: 'string',
  version: 1,
  key: 'string',
  customerId: 'string',
  customerEmail: 'string',
  anonymousId: 'string',
  lineItems: [
    {
      id: '00000000-5b3c-487e-8ba0-1305ad7d0da0',
      productId: '5d9577f9-5b3c-487e-8ba0-1305ad7d0da0',
      name: {
        'en-US': 'Portoy',
      },
      productSlug: {
        'en-US': 'armchair-portoy',
      },
      productType: {
        typeId: 'product-type',
        id: 'string',
      },
      variant: {
        attributes: [
          {
            name: 'designer',
            value: 'Middle Earth Chemical Plant',
          },
          {
            name: 'material',
            value: {
              key: 'plastic',
              label: {
                'en-US': 'Plastic',
              },
            },
          },
          {
            name: 'arrangement',
            value: {
              key: 'house',
              label: {
                'en-US': 'house',
              },
            },
          },
        ],
        assets: [],
        images: [
          {
            url: 'https://images.cdn.europe-west1.gcp.commercetools.com/ff91879f-f4a7-436e-bc45-97970b384e8e/photo_2024-05-24_15--r-Q3wjA0.jpg',
            dimensions: {
              w: 0,
              h: 0,
            },
          },
          {
            url: 'https://images.cdn.europe-west1.gcp.commercetools.com/ff91879f-f4a7-436e-bc45-97970b384e8e/photo_2024-05-24_15--RlxEMgWo.jpg',
            dimensions: {
              w: 0,
              h: 0,
            },
          },
          {
            url: 'https://images.cdn.europe-west1.gcp.commercetools.com/ff91879f-f4a7-436e-bc45-97970b384e8e/photo_2024-05-24_15--hCwt9BRg.jpg',
            dimensions: {
              w: 0,
              h: 0,
            },
          },
        ],
        prices: [
          {
            id: '12cdf84b-640c-4088-9880-9f840d7f692c',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 9999,
              fractionDigits: 2,
            },
          },
        ],
        key: '17',
        sku: '17',
        id: 1,
      },
      price: {
        id: 'string',
        value: {
          type: 'centPrecision',
          centAmount: 100,
          currencyCode: 'USD',
          fractionDigits: 1,
        },
      },
      quantity: 5,
      totalPrice: {
        type: 'centPrecision',
        centAmount: 100,
        currencyCode: 'USD',
        fractionDigits: 1,
      },
      discountedPricePerQuantity: [],
      taxedPricePortions: [],
      state: [],
      perMethodTaxRate: [],
      priceMode: 'LineItemPriceMode',
      lineItemMode: 'LineItemMode',
    },
    {
      id: '11111111-5b3c-487e-8ba0-1305ad7d0da0',
      productId: '5d9577f9-5b3c-487e-8ba0-1305ad7d0da0',
      name: {
        'en-US': 'Portoy',
      },
      productSlug: {
        'en-US': 'armchair-portoy',
      },
      productType: {
        typeId: 'product-type',
        id: 'string',
      },
      variant: {
        attributes: [
          {
            name: 'designer',
            value: 'Middle Earth Chemical Plant',
          },
          {
            name: 'material',
            value: {
              key: 'plastic',
              label: {
                'en-US': 'Plastic',
              },
            },
          },
          {
            name: 'arrangement',
            value: {
              key: 'house',
              label: {
                'en-US': 'house',
              },
            },
          },
        ],
        assets: [],
        images: [
          {
            url: 'https://images.cdn.europe-west1.gcp.commercetools.com/ff91879f-f4a7-436e-bc45-97970b384e8e/photo_2024-05-24_15--r-Q3wjA0.jpg',
            dimensions: {
              w: 0,
              h: 0,
            },
          },
          {
            url: 'https://images.cdn.europe-west1.gcp.commercetools.com/ff91879f-f4a7-436e-bc45-97970b384e8e/photo_2024-05-24_15--RlxEMgWo.jpg',
            dimensions: {
              w: 0,
              h: 0,
            },
          },
          {
            url: 'https://images.cdn.europe-west1.gcp.commercetools.com/ff91879f-f4a7-436e-bc45-97970b384e8e/photo_2024-05-24_15--hCwt9BRg.jpg',
            dimensions: {
              w: 0,
              h: 0,
            },
          },
        ],
        prices: [
          {
            id: '12cdf84b-640c-4088-9880-9f840d7f692c',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 9999,
              fractionDigits: 2,
            },
          },
        ],
        key: '17',
        sku: '17',
        id: 1,
      },
      price: {
        id: 'string',
        value: {
          type: 'centPrecision',
          centAmount: 100,
          currencyCode: 'USD',
          fractionDigits: 1,
        },
      },
      quantity: 5,
      totalPrice: {
        type: 'centPrecision',
        centAmount: 100,
        currencyCode: 'USD',
        fractionDigits: 1,
      },
      discountedPricePerQuantity: [],
      taxedPricePortions: [],
      state: [],
      perMethodTaxRate: [],
      priceMode: 'LineItemPriceMode',
      lineItemMode: 'LineItemMode',
    },
  ],
  customLineItems: [],
  totalLineItemQuantity: 4,
  totalPrice: {
    type: 'centPrecision',
    centAmount: 100,
    currencyCode: 'USD',
    fractionDigits: 1,
  },
  discountOnTotalPrice: {
    discountedAmount: {
      type: 'centPrecision',
      centAmount: 100,
      currencyCode: 'USD',
      fractionDigits: 1,
    },
    includedDiscounts: [],
    discountedNetAmount: {
      type: 'centPrecision',
      centAmount: 100,
      currencyCode: 'USD',
      fractionDigits: 1,
    },
    discountedGrossAmount: {
      type: 'centPrecision',
      centAmount: 100,
      currencyCode: 'USD',
      fractionDigits: 1,
    },
  },
  taxMode: 'TaxMode',
  taxRoundingMode: 'RoundingMode',
  taxCalculationMode: 'TaxCalculationMode',
  inventoryMode: 'InventoryMode',
  cartState: 'CartState',
  shippingMode: 'ShippingMode',
  shipping: [],
  itemShippingAddresses: [],
  discountCodes: [],
  directDiscounts: [],
  refusedGifts: [],
  origin: 'CartOrigin',
  createdAt: 'string',
  lastModifiedAt: 'string',
};
*/
function CartPage() {
  const [text, setText] = useState<string>('');

  const navigate = useNavigate();
  const [promocode, setPromocode] = useState<string | null>(null);
  // const [prod, setProd] = useState<ProductProjection>(product);

  const changeHandler = (value: React.ChangeEvent<HTMLInputElement>) => {
    setText(value.target.value);
  };

  const enterPromoClickHandler = () => {
    console.log('EnterPromo');
    setPromocode('PromocodeIsActive');
  };

  const cleanClickHandler = () => {
    console.log('cleanClickHandler');
  };

  const toCatalogClickHandler = () => {
    navigate(`/catalog/`);
  };

  const buyClickHandler = () => {
    console.log('buyClickHandler');
  };

  const removeClickHandler = (id: string) => {
    console.log('REMOVE ITEM: ', id);
  };

  const inputChangeHandler = (id: string, value: 1 | 99 | null) => {
    if (!value) {
      console.log('value is null, return');
      return;
    }
    console.log(value, ' >>> ', id);
  };

  {
    /**
     * FOR TEST
     */
  }

  const [cartTest, setCartTest] = useState<Cart | null>(null);

  const createHandler = () => {
    createCartService(cartTest, 'USD')
      .then((result) => {
        setCartTest(result);
        console.log('create: ', result);
      })
      .catch((e) => console.error(e));
  };
  const getHandler = () => {
    getCartService().then((result) => {
      setCartTest(result);
      console.log('get: ', result);
    });
  };
  const deleteHandler = () => {
    deleteCartService(cartTest).then((result) => {
      if (result) {
        setCartTest(null);
      }
      console.log('delete: ', result);
    });
  };

  const ceckIsProdInCartHandler = (/*id: string*/) => {
    // Params: product, cart
    // Return: boolean
    const testId = '30217184-de16-42aa-a7c5-9ea1e345b743';
    const result: boolean = cartTest?.lineItems.find((x) => x.productId === testId) ? true : false;
    console.log(result);
  };

  const getProductsCountHandler = () => {
    // Params: none
    // Return: number
    console.log(cartTest?.lineItems.length);
  };

  const addItemHandler = (/*productId: string*/) => {
    if (cartTest) {
      //? We take it from the product card
      const testId = '30217184-de16-42aa-a7c5-9ea1e345b743';
      addLineItemsService({ productId: testId }, cartTest!).then((result) => {
        setCartTest(result ? result : null);
        console.log(result);
      });
    }
  };

  const remItemdHandler = async () => {
    if (cartTest) {
      //? Take from the card you clicked on
      const testLineItemId = cartTest.lineItems[0].id;
      removeLineItemsService({ lineItemId: testLineItemId }, cartTest!).then((result) => {
        setCartTest(result ? result : null);
        console.log(result);
      });
    }
  };

  const addCodeHandler = (/*code: string*/) => {
    if (cartTest) {
      //? User enters ?
      const testLineItemId = 'BOGO';
      addDiscountCodeService({ code: testLineItemId }, cartTest!).then((result) => {
        setCartTest(result ? result : null);
        console.log(result);
      });
    }
  };

  const remCodeHandler = async (/*discountCode: DiscountCodeReference*/) => {
    if (cartTest) {
      //? We take it from the storage
      const testDiscountCode: DiscountCodeReference = cartTest.discountCodes[0].discountCode;
      removeDiscountCodeService({ discountCode: testDiscountCode }, cartTest!).then((result) => {
        setCartTest(result ? result : null);
        console.log(result);
      });
    }
  };

  const setQuantityHandler = async (/* itemId: string */) => {
    if (cartTest) {
      //? User enters
      const testquantity: number = 27;
      const testId = cartTest.lineItems[0].id;
      setQuantityService({ quantity: testquantity, lineItemId: testId }, cartTest!).then((result) => {
        setCartTest(result ? result : null);
        console.log(result);
      });
    }
  };

  {
    /**
     * FOR TEST
     */
  }

  return (
    <div className="cart">
      <div className="cart__wrapper">
        <h1 className="custom-title">Cart</h1>
        <div className="cart__products-box">
          {/*>>>>>*/}

          {cartTest && cartTest.lineItems.length > 0 ? (
            cartTest.lineItems.map((item) => (
              <CartItem
                key={item.id}
                product={item}
                removeClickHandler={removeClickHandler}
                inputChangeHandler={inputChangeHandler}
                text={text}
                textHandler={changeHandler}
              ></CartItem>
            ))
          ) : (
            <div>cart is empty</div>
          )}

          {/*<<<<<*/}
        </div>
        <div className="cart__bottom-box">
          {promocode ? (
            <p className="base-text cart__promocode">Promo info</p>
          ) : (
            <p className="base-text cart__promocode">Enter promocode here</p>
          )}
          {promocode ? (
            <p className="cart__total base-text">Total price with Promocode: 10.00 USD</p>
          ) : (
            <Button className="custom-color cart__promocode" onClick={enterPromoClickHandler}>
              Enter Promo
            </Button>
          )}
        </div>
        {/**
         * FOR TEST
         */}
        <div className="cart__bottom-box" style={{ flexFlow: 'wrap' }}>
          <Button type="primary" onClick={createHandler}>
            Create Cart
          </Button>
          <Button type="primary" onClick={getHandler}>
            Get Cart
          </Button>
          <Button type="primary" onClick={ceckIsProdInCartHandler}>
            Is Proguct in cart?
          </Button>
          <Button type="primary" onClick={getProductsCountHandler}>
            Get Count
          </Button>
          <Button type="primary" onClick={addItemHandler}>
            add item
          </Button>
          <Button type="primary" onClick={remItemdHandler}>
            remove item
          </Button>
          <Button type="primary" onClick={addCodeHandler}>
            add disc code
          </Button>
          <Button type="primary" onClick={remCodeHandler}>
            remove disc code
          </Button>
          <Button type="primary" onClick={setQuantityHandler}>
            set quantity
          </Button>
          <Button danger onClick={deleteHandler}>
            Delete Cart
          </Button>
        </div>
        {/**
         * FOR TEST
         */}
        <div className="cart__bottom-box">
          <div className="cart__bottom-part">
            <Button danger onClick={cleanClickHandler}>
              Clean Cart
            </Button>
            <Button className="primary-custom-color" onClick={toCatalogClickHandler}>
              To Catalog
            </Button>
          </div>
          <div className="cart__bottom-part">
            <p className="cart__total base-text">Total Price: 100 000.00 USD</p>
            <Button className="primary-custom-color" onClick={buyClickHandler}>
              Buy!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
