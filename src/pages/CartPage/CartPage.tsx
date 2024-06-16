import type React from 'react';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useCart } from '@contexts/CartContext';
import CartItem from '@components/CartItem/CartItem';
import '@pages/CartPage/CartPage.scss';
import PromoCode from '@/components/PromoCode/PromoCode';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { formatPrice } from '@utils/formatPrice.ts';
import { useState } from 'react';

const CartPage: React.FC = () => {
  const {
    state: { cart },
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
  } = useCart();

  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const clearCartHandler = () => {
    Modal.confirm({
      title: 'Clear Shopping Cart',
      content: 'Are you sure you want to clear your shopping cart?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        clearCart();
      },
    });
  };

  const showCheckoutModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
              <ShoppingCartOutlined style={{ fontSize: '64px', color: '#2f7c69' }} />
              <p className="cart__empty-message">Your shopping cart is currently empty</p>
              <p className="cart__empty-submessage">Looks like you have not added anything to your cart yet.</p>
              <p className="cart__empty-suggestion">Start browsing our collection!</p>
              <Button className="primary-custom-color" onClick={toCatalogClickHandler}>
                Start Shopping
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
                  Price: {formatPrice(totalPrice)} {cart?.totalPrice.currencyCode}
                </p>
                {discount > 0 && (
                  <>
                    <p className="cart__discount base-text">
                      Promocode: - {formatPrice(discount)} {cart?.totalPrice.currencyCode}
                    </p>
                    <p className="cart__discounted base-text">
                      Total Price: {formatPrice(discountedPrice)} {cart?.totalPrice.currencyCode}
                    </p>
                  </>
                )}
                <Button className="primary-custom-color" onClick={showCheckoutModal}>
                  Buy!
                </Button>
              </div>
            </div>
            <Button className="danger-custom-color" onClick={clearCartHandler}>
              Clear Shopping Cart
            </Button>
          </>
        )}
        <Modal title="Proceed to checkout" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>Checkout functionality will be implemented later</p>
        </Modal>
      </div>
    </div>
  );
};

export default CartPage;
