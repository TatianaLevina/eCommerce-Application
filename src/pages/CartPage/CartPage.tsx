// import { useState } from 'react';
// import { Button } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { type Cart } from '@commercetools/platform-sdk';
// import CartItem from '@components/CartItem/CartItem';
import '@pages/CartPage/CartPage.scss';
import { createCartService, deleteCartService, getCartService } from '@/services/CartService';

// const cart: Cart = {
//   id: 'string',
//   version: 1,
//   key: 'string',
//   customerId: 'string',
//   customerEmail: 'string',
//   anonymousId: 'string',
//   lineItems: [
//     {
//       id: '00000000-5b3c-487e-8ba0-1305ad7d0da0',
//       productId: '5d9577f9-5b3c-487e-8ba0-1305ad7d0da0',
//       name: {
//         'en-US': 'Portoy',
//       },
//       productSlug: {
//         'en-US': 'armchair-portoy',
//       },
//       productType: {
//         typeId: 'product-type',
//         id: 'string',
//       },
//       variant: {
//         attributes: [
//           {
//             name: 'designer',
//             value: 'Middle Earth Chemical Plant',
//           },
//           {
//             name: 'material',
//             value: {
//               key: 'plastic',
//               label: {
//                 'en-US': 'Plastic',
//               },
//             },
//           },
//           {
//             name: 'arrangement',
//             value: {
//               key: 'house',
//               label: {
//                 'en-US': 'house',
//               },
//             },
//           },
//         ],
//         assets: [],
//         images: [
//           {
//             url: 'https://images.cdn.europe-west1.gcp.commercetools.com/ff91879f-f4a7-436e-bc45-97970b384e8e/photo_2024-05-24_15--r-Q3wjA0.jpg',
//             dimensions: {
//               w: 0,
//               h: 0,
//             },
//           },
//           {
//             url: 'https://images.cdn.europe-west1.gcp.commercetools.com/ff91879f-f4a7-436e-bc45-97970b384e8e/photo_2024-05-24_15--RlxEMgWo.jpg',
//             dimensions: {
//               w: 0,
//               h: 0,
//             },
//           },
//           {
//             url: 'https://images.cdn.europe-west1.gcp.commercetools.com/ff91879f-f4a7-436e-bc45-97970b384e8e/photo_2024-05-24_15--hCwt9BRg.jpg',
//             dimensions: {
//               w: 0,
//               h: 0,
//             },
//           },
//         ],
//         prices: [
//           {
//             id: '12cdf84b-640c-4088-9880-9f840d7f692c',
//             value: {
//               type: 'centPrecision',
//               currencyCode: 'USD',
//               centAmount: 9999,
//               fractionDigits: 2,
//             },
//           },
//         ],
//         key: '17',
//         sku: '17',
//         id: 1,
//       },
//       price: {
//         id: 'string',
//         value: {
//           type: 'centPrecision',
//           centAmount: 100,
//           currencyCode: 'USD',
//           fractionDigits: 1,
//         },
//       },
//       quantity: 5,
//       totalPrice: {
//         type: 'centPrecision',
//         centAmount: 100,
//         currencyCode: 'USD',
//         fractionDigits: 1,
//       },
//       discountedPricePerQuantity: [],
//       taxedPricePortions: [],
//       state: [],
//       perMethodTaxRate: [],
//       priceMode: 'LineItemPriceMode',
//       lineItemMode: 'LineItemMode',
//     },
//     {
//       id: '11111111-5b3c-487e-8ba0-1305ad7d0da0',
//       productId: '5d9577f9-5b3c-487e-8ba0-1305ad7d0da0',
//       name: {
//         'en-US': 'Portoy',
//       },
//       productSlug: {
//         'en-US': 'armchair-portoy',
//       },
//       productType: {
//         typeId: 'product-type',
//         id: 'string',
//       },
//       variant: {
//         attributes: [
//           {
//             name: 'designer',
//             value: 'Middle Earth Chemical Plant',
//           },
//           {
//             name: 'material',
//             value: {
//               key: 'plastic',
//               label: {
//                 'en-US': 'Plastic',
//               },
//             },
//           },
//           {
//             name: 'arrangement',
//             value: {
//               key: 'house',
//               label: {
//                 'en-US': 'house',
//               },
//             },
//           },
//         ],
//         assets: [],
//         images: [
//           {
//             url: 'https://images.cdn.europe-west1.gcp.commercetools.com/ff91879f-f4a7-436e-bc45-97970b384e8e/photo_2024-05-24_15--r-Q3wjA0.jpg',
//             dimensions: {
//               w: 0,
//               h: 0,
//             },
//           },
//           {
//             url: 'https://images.cdn.europe-west1.gcp.commercetools.com/ff91879f-f4a7-436e-bc45-97970b384e8e/photo_2024-05-24_15--RlxEMgWo.jpg',
//             dimensions: {
//               w: 0,
//               h: 0,
//             },
//           },
//           {
//             url: 'https://images.cdn.europe-west1.gcp.commercetools.com/ff91879f-f4a7-436e-bc45-97970b384e8e/photo_2024-05-24_15--hCwt9BRg.jpg',
//             dimensions: {
//               w: 0,
//               h: 0,
//             },
//           },
//         ],
//         prices: [
//           {
//             id: '12cdf84b-640c-4088-9880-9f840d7f692c',
//             value: {
//               type: 'centPrecision',
//               currencyCode: 'USD',
//               centAmount: 9999,
//               fractionDigits: 2,
//             },
//           },
//         ],
//         key: '17',
//         sku: '17',
//         id: 1,
//       },
//       price: {
//         id: 'string',
//         value: {
//           type: 'centPrecision',
//           centAmount: 100,
//           currencyCode: 'USD',
//           fractionDigits: 1,
//         },
//       },
//       quantity: 5,
//       totalPrice: {
//         type: 'centPrecision',
//         centAmount: 100,
//         currencyCode: 'USD',
//         fractionDigits: 1,
//       },
//       discountedPricePerQuantity: [],
//       taxedPricePortions: [],
//       state: [],
//       perMethodTaxRate: [],
//       priceMode: 'LineItemPriceMode',
//       lineItemMode: 'LineItemMode',
//     },
//   ],
//   customLineItems: [],
//   totalLineItemQuantity: 4,
//   totalPrice: {
//     type: 'centPrecision',
//     centAmount: 100,
//     currencyCode: 'USD',
//     fractionDigits: 1,
//   },
//   discountOnTotalPrice: {
//     discountedAmount: {
//       type: 'centPrecision',
//       centAmount: 100,
//       currencyCode: 'USD',
//       fractionDigits: 1,
//     },
//     includedDiscounts: [],
//     discountedNetAmount: {
//       type: 'centPrecision',
//       centAmount: 100,
//       currencyCode: 'USD',
//       fractionDigits: 1,
//     },
//     discountedGrossAmount: {
//       type: 'centPrecision',
//       centAmount: 100,
//       currencyCode: 'USD',
//       fractionDigits: 1,
//     },
//   },
//   taxMode: 'TaxMode',
//   taxRoundingMode: 'RoundingMode',
//   taxCalculationMode: 'TaxCalculationMode',
//   inventoryMode: 'InventoryMode',
//   cartState: 'CartState',
//   shippingMode: 'ShippingMode',
//   shipping: [],
//   itemShippingAddresses: [],
//   discountCodes: [],
//   directDiscounts: [],
//   refusedGifts: [],
//   origin: 'CartOrigin',
//   createdAt: 'string',
//   lastModifiedAt: 'string',
// };

function CartPage() {
  //FOR TEST:
  createCartService('USD');
  getCartService().then((res) => {
    console.log(res);
    const cartID = res?.id || '';
    const cartVersion = res?.version || 1;
    console.log(cartID);
    deleteCartService(cartID, cartVersion);
  });

  // const navigate = useNavigate();
  // const [promocode, setPromocode] = useState<string | null>(null);
  // // const [prod, setProd] = useState<ProductProjection>(product);
  //
  // const enterPromoClickHandler = () => {
  //   console.log('EnterPromo');
  //   setPromocode('PromocodeIsActive');
  // };
  //
  // const cleanClickHandler = () => {
  //   console.log('cleanClickHandler');
  // };
  //
  // const toCatalogClickHandler = () => {
  //   navigate(`/catalog/`);
  // };
  //
  // const buyClickHandler = () => {
  //   console.log('buyClickHandler');
  // };

  // const removeClickHandler = (id: string) => {
  //   console.log('REMOVE ITEM: ', id);
  //   createCartService(id, 'USD');
  // };

  // const inputChangeHandler = (id: string, value: 1 | 99 | null) => {
  //   if (!value) {
  //     console.log('value is null, return');
  //     return;
  //   }
  //   getCartService(id).then((res) => console.log(res));
  //   console.log(value, ' >>> ', id);
  // };

  //

  return (
    <div>
      <h1 className="custom-title">CART</h1>
    </div>
  );
}

export default CartPage;
