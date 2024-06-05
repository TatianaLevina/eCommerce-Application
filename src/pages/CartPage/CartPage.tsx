import CartItem from '@/components/CartItem/CartItem';
import { type ProductProjection } from '@commercetools/platform-sdk';
import '@pages/CartPage/CartPage.scss';
import { Button } from 'antd';
import { useState } from 'react';

const product: ProductProjection = {
  id: '5d9577f9-5b3c-487e-8ba0-1305ad7d0da0',
  version: 1,
  productType: {
    typeId: 'product-type',
    id: '4136dfc8-51e0-4099-874d-dd224b3c2e6b',
  },
  name: {
    'en-US': 'Portoy',
  },
  categories: [
    {
      typeId: 'category',
      id: 'ade97a3e-e9d2-42cc-a7ed-1cb32cbc442e',
    },
  ],
  categoryOrderHints: {},
  slug: {
    'en-US': 'armchair-portoy',
  },
  metaTitle: {
    'en-US': 'Portoy',
  },
  metaKeywords: {
    'en-US': 'basic;',
  },
  metaDescription: {
    'en-US':
      'The ergonomic design provides ample support for your back and neck, while the contoured seat ensures a comfortable sitting experience.',
  },
  variants: [],
  masterVariant: {
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
  searchKeywords: {},
  hasStagedChanges: false,
  published: true,
  taxCategory: {
    typeId: 'tax-category',
    id: '6c2e290e-8b0a-42db-ae78-9e5db9b25473',
  },
  createdAt: '2024-06-02T13:06:07.099Z',
  lastModifiedAt: '2024-06-02T13:06:07.099Z',
};

export default function CartPage() {
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
    console.log('toCatalogClickHandler');
  };

  const buyClickHandler = () => {
    console.log('buyClickHandler');
  };

  const removeClickHandler = (id: string) => {
    console.log(id);
    console.log('removeClickHandler');
  };

  const inputChangeHandler = (value: 1 | 99 | null) => {
    console.log(value);
  };

  //!

  //!

  return (
    <div className="cart">
      <div className="cart__wrapper">
        <h1 className="custom-title">Cart</h1>
        <div className="cart__products-box">
          {/*>>>>>*/}
          <CartItem
            product={product}
            removeClickHandler={removeClickHandler}
            inputChangeHandler={inputChangeHandler}
          ></CartItem>
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
