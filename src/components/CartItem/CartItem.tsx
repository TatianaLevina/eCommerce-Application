import React, { useState, useCallback } from 'react';
import { Button, Form /*, InputNumber*/ } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { LineItem } from '@commercetools/platform-sdk';
import ImageCustom from '@components/ImageCustom/ImageCustom';
import { formatPrice } from '@/utils/Utilities';
import '@components/CartItem/CartItem.scss';
import CountInput from '../CountInput/CountInput';
// import { values } from 'lodash';

interface CartItemProps {
  product: LineItem;
  removeClickHandler: (id: string) => void;
  inputChangeHandler: (id: string, value: number) => Promise<number | undefined>;
}

const CartItem: React.FC<CartItemProps> = ({ product, removeClickHandler, inputChangeHandler }) => {
  const [loading, setLoading] = useState(false);

  const price = product.price.value.centAmount;
  const discountedPrice = product.price.discounted?.value.centAmount;
  const imageUrl = product.variant.images?.[0]?.url || 'default-image-url';

  // const handleInputChange = useCallback(
  //   (value: number | null) => {
  //     if (value !== null) {
  //       setLoading(true);
  //       inputChangeHandler(product.id, value);
  //       setLoading(false);
  //     }
  //   },
  //   [inputChangeHandler, product.id],
  // );

  const handleRemoveClick = useCallback(() => {
    setLoading(true);
    removeClickHandler(product.id);
    setLoading(false);
  }, [removeClickHandler, product.id]);

  const handleInputChange =
    //  useCallback(
    (value: number) => {
      setLoading(true);
      return inputChangeHandler(product.id, value).then((res) => {
        setLoading(false);
        return res;
      });
    };
  // [inputChangeHandler, product.id],
  // );

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
          <CountInput onChange={handleInputChange} minValue={1} maxValue={99}></CountInput>
          {/* <InputNumber defaultValue={product.quantity} min={1} max={99} onChange={handleInputChange} /> */}
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
        </div>

        <p className="cart-item__total base-text no-margin-block">
          Total for product: {formatPrice(product.quantity * (discountedPrice || price))}{' '}
          {product.price.value.currencyCode}
        </p>
        <Button danger type="text" onClick={handleRemoveClick} loading={loading}>
          <DeleteOutlined />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(CartItem);
