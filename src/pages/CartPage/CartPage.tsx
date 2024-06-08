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

function CartPage() {
  const [text, setText] = useState<string>('');

  const navigate = useNavigate();
  const [promocode, setPromocode] = useState<string | null>(null);

  const changeHandler = (value: React.ChangeEvent<HTMLInputElement>) => {
    setText(value.target.value);
  };

  // const navigate = useNavigate();
  // const [promocode, setPromocode] = useState<string | null>(null);
  // // const [prod, setProd] = useState<ProductProjection>(product);
  //
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

  const enterPromoClickHandler = () => {
    console.log('EnterPromo');
    setPromocode('PromocodeIsActive');
  };

  const cleanClickHandler = () => {
    console.log('cleanClickHandler');
  };

  const buyClickHandler = () => {
    console.log('buyClickHandler');
  };

  const removeClickHandler = (id: string) => {
    console.log('REMOVE ITEM: ', id);
  };

  const toCatalogClickHandler = () => {
    navigate('/catalog/');
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
    const testId = '30217184-de16-42aa-a7c5-9ea1e345b743';
    const result: boolean = cartTest?.lineItems.find((x) => x.productId === testId) ? true : false;
    console.log(result);
  };

  const getProductsCountHandler = () => {
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
         * FOR TEST >>>>>>>>>>>>>>
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
         * FOR TEST >>>>>>>>>>>>>>
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
