import { useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { DiscountCodeReference } from '@commercetools/platform-sdk';
import CartItem from '@components/CartItem/CartItem';
import '@pages/CartPage/CartPage.scss';
import { useCart } from '@/contexts/CartContext';

function CartPage() {
  const navigate = useNavigate();
  const [promocode, setPromocode] = useState<string | null>(null);

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
    if (cart) {
      //? Take from the card you clicked on
      removeItemFromCart(id);
    }
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

  const {
    cart,
    createCart,
    getCart,
    deleteCart,
    checkIsProdInCart,
    addItemToCart,
    removeItemFromCart,
    addCodeToCart,
    removeCodeFromCart,
    setItemQuantity,
    getProductsCount,
    getItemQuantity,
  } = useCart();

  const createHandler = () => {
    createCart();
  };
  const getHandler = () => {
    getCart();
  };
  const deleteHandler = () => {
    deleteCart();
  };

  const ceckIsProdInCartHandler = (/*id: string*/) => {
    const testId = '30217184-de16-42aa-a7c5-9ea1e345b743';
    const result: boolean = checkIsProdInCart(testId);
    console.log(result);
  };

  const getProductsCountHandler = () => {
    getProductsCount();
  };

  const addItemHandler = (/*productId: string*/) => {
    //? We take it from the product card
    const testId = '30217184-de16-42aa-a7c5-9ea1e345b743';
    addItemToCart(testId);
  };

  const remItemdHandler = async () => {
    if (cart) {
      //? Take from the card you clicked on
      const testLineItemId = cart.lineItems[0].id;
      removeItemFromCart(testLineItemId);
    }
  };

  const addCodeHandler = (/*code: string*/) => {
    if (cart) {
      //? User enters ?
      const testLineItemId = 'BOGO';
      addCodeToCart(testLineItemId);
    }
  };

  const remCodeHandler = async (/*discountCode: DiscountCodeReference*/) => {
    if (cart) {
      //? We take it from the storage
      const testDiscountCode: DiscountCodeReference = cart.discountCodes[0].discountCode;
      removeCodeFromCart(testDiscountCode);
    }
  };

  const setQuantityHandler = async (/* itemId: string */) => {
    if (cart) {
      //? User enters
      const testquantity: number = 27;
      const testId = cart.lineItems[0].id;
      setItemQuantity(testId, testquantity);
    }
  };

  const getQuantityHandler = async (/* itemId: string */) => {
    if (cart) {
      //? User enters
      const testId = cart.lineItems[0].id;
      console.log(getItemQuantity(testId));
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

          {cart && cart.lineItems.length > 0 ? (
            cart.lineItems.map((item) => (
              <CartItem
                key={item.id}
                product={item}
                removeClickHandler={removeClickHandler}
                inputChangeHandler={inputChangeHandler}
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
          <Button type="primary" onClick={getQuantityHandler}>
            get quantity
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
