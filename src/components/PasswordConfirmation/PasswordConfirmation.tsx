import type React from 'react';
import { useState } from 'react';
import { Modal, Button, Form, Input, Spin } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import { changeUserPassword } from '@services/CustomerService';
import validateConstant from '@/data/validateConstants';
import { invalidateToken } from '@/services/TokenCache';
import type { PasswordConfirmModalProps } from './PasswordConfirmModalProps.interface';

const PasswordConfirmationModal: React.FC<PasswordConfirmModalProps> = ({
  open,
  onPasswordModalCancel,
  onPasswordModalConfirm,
  newPassword,
}) => {
  const [form] = Form.useForm();
  const { user, signIn } = useAuth();
  const [confirmInProgress, setConfirmInProgress] = useState(false);

  const passwordConfirm = async (): Promise<void> => {
    setConfirmInProgress(true);
    try {
      const value = await form.validateFields();
      const response = await changeUserPassword(user!.id, user!.version, value.password, newPassword);
      invalidateToken();
      await signIn(response.body.email, newPassword);
      onPasswordModalConfirm();
    } catch (error) {
      if (error instanceof Error) {
        form.setFields([
          {
            name: ['password'],
            errors: [error.message],
          },
        ]);
      }

      console.log('Failed:', error);
    } finally {
      setConfirmInProgress(false);
    }
  };

  return (
    <>
      <Spin spinning={confirmInProgress} fullscreen />
      <Modal
        open={open}
        afterClose={form.resetFields}
        title="Enter you current password"
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
