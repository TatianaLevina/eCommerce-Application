import type React from 'react';
import { useState } from 'react';
import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@contexts/CartContext';
import CartItem from '@components/CartItem/CartItem';
import '@pages/CartPage/CartPage.scss';
import { formatPrice } from '@/utils/Utilities';

const CartPage: React.FC = () => {
  const {
    state: { cart },
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    addDiscountCode,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();

  const removeClickHandler = (id: string) => {
    removeFromCart(id);
  };

  const inputChangeHandler = (id: string, value: number) => {
    updateCartItemQuantity(id, value);
  };

  const calculateTotalPrice = () => {
    return (
      cart?.lineItems.reduce((total, item) => {
        const price = item.price.value.centAmount;
        const discountedPrice = item.price.discounted?.value.centAmount;
        return total + item.quantity * (discountedPrice || price);
      }, 0) || 0
    );
  };

  const toCatalogClickHandler = () => {
    navigate('/catalog');
  };

  const clearCartHandler = () => {
    clearCart();
  };

  const applyPromoCodeHandler = () => {
    if (promoCode) {
      addDiscountCode(promoCode);
    }
  };

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
            <div className="cart__bottom-box">
              <div className="cart__bottom-part">
                <p className="cart__total base-text">
                  Total Price: {formatPrice(calculateTotalPrice())} {cart?.totalPrice.currencyCode}
                </p>
                <Button className="primary-custom-color" onClick={() => alert('Proceed to checkout')}>
                  Buy!
                </Button>
              </div>
            </div>
            <div className="cart__promo-box">
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{ width: '200px', marginRight: '10px' }}
              />
              <Button className="primary-custom-color" onClick={applyPromoCodeHandler}>
                Apply Promo Code
              </Button>
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
