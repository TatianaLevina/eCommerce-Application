import { useCart } from '@/contexts/CartContext';
import { useDiscounts } from '@/contexts/DiscountsContext';
import { checkDiscountCodeExists } from '@/services/DiscountsService';
import type { DiscountCode, DiscountCodeInfo } from '@commercetools/platform-sdk';
import { Button, Form, Input, notification } from 'antd';
import type React from 'react';
import { useState } from 'react';
import type { PromoCodeFormValues } from './PromoCodeFormValues';

const PromoCode: React.FC = () => {
  const [isDisabled, setDisabled] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const { discountCodes } = useDiscounts();
  const { state, addDiscountCode } = useCart();

  const showError = (message: string): void => {
    api.error({
      message,
      duration: 5,
    });
  };

  const onFinish = async ({ promoCode }: PromoCodeFormValues): Promise<void> => {
    if (!promoCode || state.cart === null) {
      return;
    }

    setDisabled(true);
    const isExist = await checkDiscountCodeExists(promoCode);
    form.resetFields();
    setDisabled(false);
    if (!isExist) {
      showError(`Unknown PROMO CODE: ${promoCode}`);
      return;
    }

    const { id: discountCodeId } = discountCodes.find((code: DiscountCode) => {
      return code.code === promoCode;
    }) as DiscountCode;

    if (
      state.cart.discountCodes.findIndex(
        (codeInfo: DiscountCodeInfo) => codeInfo.discountCode.id === discountCodeId,
      ) !== -1
    ) {
      showError(`PROMO CODE: ${promoCode} is already applied`);
      return;
    }

    await addDiscountCode(promoCode);
  };

  return (
    <>
      {contextHolder}
      <Form form={form} className="cart__bottom-box" onFinish={onFinish} disabled={isDisabled}>
        <Form.Item name="promoCode" style={{ marginBottom: '0' }}>
          <Input placeholder="Enter PROMO CODE here" />
        </Form.Item>
        <Button className="custom-color cart__promocode" htmlType="submit">
          Apply
        </Button>
      </Form>
    </>
  );
};

export default PromoCode;
