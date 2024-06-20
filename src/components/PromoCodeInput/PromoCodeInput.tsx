import type React from 'react';
import { useState } from 'react';
import { Input, Button } from 'antd';

import { useCart } from '@contexts/CartContext';
import './PromoCodeInput.scss';

const PromoCodeInput: React.FC = () => {
  const [promoCode, setPromoCode] = useState('');
  const { addDiscountCode } = useCart();

  const applyPromoCodeHandler = (): void => {
    if (promoCode) {
      addDiscountCode(promoCode);
    }
  };

  return (
    <div className="promo-code-input">
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
  );
};

export default PromoCodeInput;
