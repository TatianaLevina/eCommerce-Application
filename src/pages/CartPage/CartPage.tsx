import { useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { type Cart } from '@commercetools/platform-sdk';
import CartItem from '@components/CartItem/CartItem';
import '@pages/CartPage/CartPage.scss';

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

function CartPage() {
  const navigate = useNavigate();
  const [promocode, setPromocode] = useState<string | null>(null);
  // const [prod, setProd] = useState<ProductProjection>(product);

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

  return (
    <div className="cart">
      <div className="cart__wrapper">
        <h1 className="custom-title">Cart</h1>
        <div className="cart__products-box">
          {/*>>>>>*/}

          {cart.lineItems.map((item) => (
            <CartItem
              key={item.id}
              product={item}
              removeClickHandler={removeClickHandler}
              inputChangeHandler={inputChangeHandler}
            ></CartItem>
          ))}

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
