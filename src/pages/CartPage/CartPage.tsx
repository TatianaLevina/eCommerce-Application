import type React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useCart } from '@contexts/CartContext';
import CartItem from '@components/CartItem/CartItem';
import '@pages/CartPage/CartPage.scss';
import { formatPrice } from '@/utils/Utilities';
import PromoCode from '@/components/PromoCode/PromoCode';

const CartPage: React.FC = () => {
  const {
    state: { cart },
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const removeClickHandler = (id: string): void => {
    removeFromCart(id);
  };

  const inputChangeHandler = (id: string, value: number): Promise<number | undefined> => {
    return updateCartItemQuantity(id, value);
  };

  const calculateTotalPrice = (): number => {
    return (
      cart?.lineItems.reduce((total, item) => {
        const price = item.price.value.centAmount;
        const discountedPrice = item.price.discounted?.value.centAmount;
        return total + item.quantity * (discountedPrice || price);
      }, 0) || 0
    );
  };

  const toCatalogClickHandler = (): void => {
    navigate('/catalog');
  };

  const clearCartHandler = (): void => {
    clearCart();
  };

  const totalPrice = calculateTotalPrice();
  const discount = cart?.discountOnTotalPrice?.discountedAmount.centAmount || 0;
  const discountedPrice = totalPrice - discount;

  return (
    <div className="cart">
      <div className="cart__wrapper">
        <h1 className="custom-title">Cart</h1>
        <div className="cart__products-box">
          {cart && cart.lineItems.length > 0 ? (
            cart.lineItems.map((item) => (
              <CartItem
                key={item.id}
                product={item}
                removeClickHandler={removeClickHandler}
                inputChangeHandler={inputChangeHandler}
              />
            ))
          ) : (
            <div className="cart__empty">
              <p>Cart is empty</p>
              <Button className="primary-custom-color" onClick={toCatalogClickHandler}>
                To Catalog
              </Button>
            </div>
          )}
        </div>
        {cart && cart.lineItems.length > 0 && (
          <>
            <PromoCode />
            <div className="cart__bottom-box">
              <div className="cart__bottom-part">
                <p className="cart__total base-text">
                  Total Price: {formatPrice(totalPrice)} {cart?.totalPrice.currencyCode}
                </p>
                {discount > 0 && (
                  <>
                    <p className="cart__discount base-text">
                      Discount: {formatPrice(discount)} {cart?.totalPrice.currencyCode}
                    </p>
                    <p className="cart__discounted base-text">
                      Discounted Price: {formatPrice(discountedPrice)} {cart?.totalPrice.currencyCode}
                    </p>
                  </>
                )}
                <Button className="primary-custom-color" onClick={() => alert('Proceed to checkout')}>
                  Buy!
                </Button>
              </div>
            </div>
            <Button className="danger-custom-color" onClick={clearCartHandler}>
              Clear Shopping Cart
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
