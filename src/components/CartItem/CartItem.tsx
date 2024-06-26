import React, { useState, useCallback } from 'react';
import { Button, Form } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import ImageCustom from '@components/ImageCustom/ImageCustom';
import '@components/CartItem/CartItem.scss';
import CountInput from '@components/CountInput/CountInput';
import type CartItemProps from '@components/CartItem/cartItem.interface';
import { formatPrice } from '@utils/formatPrice.ts';

const CartItem: React.FC<CartItemProps> = ({ product, removeClickHandler, inputChangeHandler }) => {
  const [loading, setLoading] = useState(false);
  const price = product.price.value.centAmount;
  const discountedPrice = product.price.discounted?.value.centAmount;
  const imageUrl = product.variant.images?.[0]?.url || 'default-image-url';

  const handleInputChange = useCallback(
    async (value: number): Promise<void> => {
      setLoading(true);
      await inputChangeHandler(product.id, value);
      setLoading(false);
    },
    [inputChangeHandler, product.id],
  );

  const handleRemoveClick: () => void = useCallback(() => {
    setLoading(true);
    removeClickHandler(product.id);
    setLoading(false);
  }, [removeClickHandler, product.id]);

  return (
    <div className="cart-item" id={product.id}>
      <div className="cart-item__left">
        <h4 className="subtitle-text cart-item__header no-margin-block">{product.name['en-US']}</h4>
        <div className="cart-item__img-box">
          <ImageCustom className="cart-item__img" src={imageUrl} alt={product.name['en-US']} />
        </div>
      </div>
      <div className="cart-item__right">
        <Form.Item label="Count" className="cart-item__input no-margin-block">
          <CountInput onChange={handleInputChange} minValue={1} maxValue={99} initialValue={product.quantity} />
        </Form.Item>
        <div className="cart-item__price-box">
          <p
            className={`cart-item__price ${discountedPrice ? 'cart-item__price_invalid' : 'cart-item__price_actual'} base-text no-margin-block`}
          >
            Price: {formatPrice(price)} {product.price.value.currencyCode}
          </p>
          {discountedPrice && (
            <p className="cart-item__price_actual base-text no-margin-block">
              Discounted price: {formatPrice(discountedPrice)} {product.price.discounted?.value.currencyCode}
            </p>
          )}
          <p className="cart-item__total base-text no-margin-block">
            Total for product: {formatPrice(product.quantity * (discountedPrice || price))}{' '}
            {product.price.value.currencyCode}
          </p>
        </div>
        <Button danger type="text" onClick={handleRemoveClick} loading={loading}>
          <DeleteOutlined />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(CartItem);
