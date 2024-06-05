import type React from 'react';
import { Button, Form, InputNumber } from 'antd';
// import { useNavigate } from 'react-router-dom';
import type { LineItem } from '@commercetools/platform-sdk';
import '@components/ProductCard/ProductCard.scss';
import ImageCustom from '../ImageCustom/ImageCustom';
import { DeleteOutlined } from '@ant-design/icons';
import { formatPrice } from '@utils/Utilities';
// import { useState } from 'react';
import '@components/CartItem/CartItem.scss';

interface CartItemProps {
  product: LineItem;
  removeClickHandler: (id: string) => void;
  inputChangeHandler: (id: string, value: 1 | 99 | null) => void;
}

const CartItem: React.FC<CartItemProps> = ({ product, removeClickHandler, inputChangeHandler }) => {
  // const navigate = useNavigate();
  // const [total, setTotal] = useState<number>(0);
  // const [count, setCount] = useState<number>(0);
  const price = product.variant.prices?.find((x) => x.value.currencyCode === 'USD');
  const discountedPrice = price?.discounted?.value.centAmount;
  const imageUrl = product.variant.images?.[0]?.url || 'default-image-url';

  return (
    <div className="cart-item" id={product.id}>
      <div key={product.id} className="cart-item__left">
        <h4
          className="subtitle-text cart-item__header no-margin-block"
          style={{ marginBlockStart: '0', marginBlockEnd: '0' }}
        >
          {product.name['en-US']}
        </h4>
        <div className="cart-item__img-box">
          <ImageCustom className="cart-item__img" src={imageUrl} alt={product.name['en-US']}></ImageCustom>
        </div>
      </div>
      <div className="cart-item__right">
        <Form.Item label="Count" htmlFor="count" className="cart-item__input no-margin-block">
          <InputNumber
            defaultValue={1}
            name="count"
            min={1}
            max={99}
            onChange={(value) => inputChangeHandler(product.id, value)}
          />
        </Form.Item>
        <div className="cart-item__price-box">
          <p
            className={`cart-item__price ${discountedPrice ? 'cart-item__price_invalid' : 'cart-item__price_actual'} base-text no-margin-block`}
          >
            Price: {formatPrice(price?.value.centAmount || 0)} {price?.value.currencyCode}
          </p>
          {discountedPrice && (
            <p className="cart-item__price_actual base-text no-margin-block">
              Discounted price: {formatPrice(discountedPrice)} {price?.discounted?.value.currencyCode}
            </p>
          )}
        </div>

        <p className="cart-item__total base-text no-margin-block">
          Total for rpoduct: {formatPrice(100)} {price?.value.currencyCode}
        </p>
        <Button danger type="text" onClick={() => removeClickHandler(product.id)}>
          <DeleteOutlined />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
