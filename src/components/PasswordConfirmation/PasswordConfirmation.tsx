import validateConstant from '@/data/validateConstants';
import { Modal, Button, Form, Input, Spin } from 'antd';
import type React from 'react';
import { LockOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import { verifyPassword } from '@/services/CustomerService';
import { useState } from 'react';

export interface PasswordConfirmModalProps {
  open: boolean;
  onPasswordModalCancel: () => void;
  onPasswordModalConfirm: () => void;
}

const PasswordConfirmationModal: React.FC<PasswordConfirmModalProps> = ({
  open,
  onPasswordModalCancel,
  onPasswordModalConfirm,
}) => {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const [confirmInProgress, setConfirmInProgress] = useState(false);

  const passwordConfirm = async () => {
    setConfirmInProgress(true);
    try {
      const value = await form.validateFields();

      const isCorrect = await verifyPassword(user!, value.password);
      if (isCorrect) {
        console.log('Password correct');
        setConfirmInProgress(false);
        onPasswordModalConfirm();
      } else {
        setConfirmInProgress(false);
        console.log('Password wrong');
        form.setFields([
          {
            name: ['password'],
            errors: ['Wrong password'],
          },
        ]);
      }
      console.log('Form value:', value);
    } catch (error) {
      console.log('Failed:', error);
    }
  };
  return (
    <>
      <Spin spinning={confirmInProgress} fullscreen />
      <Modal
        open={open}
        afterClose={form.resetFields}
        title="Enter you password"
        onOk={passwordConfirm}
        onCancel={onPasswordModalCancel}
        footer={[
          <Button key="back" onClick={onPasswordModalCancel} className={' primary-custom-color'}>
            Cancel
          </Button>,
          <Button
            key="confirm"
            type="primary"
            // loading={loading}
            onClick={passwordConfirm}
            className={' primary-custom-color'}
          >
            Confirm
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            label="Password"
            name="password"
            validateFirst="parallel"
            tooltip="Enter password in English. Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (!@#$%^&*.)"
            rules={validateConstant.passwordRules}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              autoComplete="current-password"
              maxLength={50}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PasswordConfirmationModal;
