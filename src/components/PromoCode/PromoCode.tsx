import { useCart } from '@/contexts/CartContext';
import { checkDiscountCodeExists } from '@/services/DiscountsService';
import { Button, Form, Input, notification } from 'antd';
import type React from 'react';
import { useState } from 'react';

interface PromoCodeFormValues {
  promoCode: string;
}

const PromoCode: React.FC = () => {
  const [isDisabled, setDisabled] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const showError = (message: string) => {
    api.error({
      message,
      duration: 5,
    });
  };
  const { addDiscountCode } = useCart();

  const onFinish = async ({ promoCode }: PromoCodeFormValues) => {
    if (!promoCode) {
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
    await addDiscountCode(promoCode);
  };

  const onFinishFailed = (): void => {
    showError('Fill in required fields!');
  };
  return (
    <>
      {contextHolder}
      <Form
        form={form}
        className="cart__bottom-box"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        disabled={isDisabled}
      >
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
