import { Button, Form, Input, notification } from 'antd';
import type React from 'react';
const PromoCode: React.FC = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const showError = (message: string) => {
    api.error({
      message,
      duration: 5,
    });
  };

  const onFinish = () => {};

  const onFinishFailed = (): void => {
    showError('Fill in required fields!');
  };
  return (
    <>
      {contextHolder}
      <Form form={form} className="cart__bottom-box" onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
