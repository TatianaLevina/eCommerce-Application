import type React from 'react';
import { Button, Flex, Form, Input, Modal, Typography, notification } from 'antd';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { EditOutlined, LockOutlined } from '@ant-design/icons';
import validateConstant from '@/data/validateConstants';
import PasswordConfirmationModal from '../PasswordConfirmation/PasswordConfirmation';

const { Title } = Typography;

const AccountSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const { user } = useAuth();
  const [openPasswordConfirmationModal, setOpenPasswordConfirmationModal] = useState(false);
  const [userNewPassword, setUserNewPassword] = useState('');

  const [api, contextHolder] = notification.useNotification();
  function showSuccess(): void {
    api.success({
      message: 'All changes are saved',
      duration: 3,
    });
  }

  const showError = (msg: string): void => {
    Modal.error({
      title: 'Error!',
      content: msg,
    });
  };

  interface Passwords {
    newPassword: string;
    confirmPassword: string;
  }

  const onFinish = (values: Passwords) => {
    setEditMode(false);
    form.resetFields();

    if (values.newPassword !== values.confirmPassword) {
      setEditMode(true);
      showError('Confirm password is NOT the same with New password. Please check!');
      return;
    }
    setUserNewPassword(values.newPassword);
    setOpenPasswordConfirmationModal(true);
  };

  const onFinishFailed = (): void => {
    showError('Fill in required fields!');
  };

  return (
    <>
      {contextHolder}
      <h1 className="custom-title">My Profile</h1>
      <Flex justify="space-between" style={{ width: '100%' }}>
        <Title
          level={4}
          style={{
            color: '#376a4f',
            textAlign: 'left',
            marginTop: 10,
          }}
        >
          Change Password
        </Title>
        {editMode ? (
          <>
            <Button
              style={{ alignSelf: 'center' }}
              type="primary"
              className={' primary-custom-color'}
              onClick={() => {
                setEditMode(!editMode);
                form.resetFields();
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            {' '}
            <Button
              style={{ alignSelf: 'center' }}
              type="primary"
              className={' primary-custom-color'}
              onClick={() => {
                setEditMode(!editMode);
              }}
            >
              <EditOutlined />
              Change
            </Button>{' '}
            <PasswordConfirmationModal
              open={openPasswordConfirmationModal}
              onPasswordModalCancel={() => setOpenPasswordConfirmationModal(false)}
              onPasswordModalConfirm={() => {
                showSuccess();
                setOpenPasswordConfirmationModal(false);
              }}
              newPassword={userNewPassword}
            />
          </>
        )}
      </Flex>
      <Form
        form={form}
        layout="vertical"
        disabled={!editMode}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ currentPassword: user?.password }}
      >
        <>
          <Form.Item
            name="newPassword"
            label="New Password"
            tooltip="This is a required field. Enter password in English. Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (!@#$%^&*.)"
            rules={validateConstant.passwordRules}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="New Password"
              className="login-password"
              // autoComplete="current-password"
              maxLength={50}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            tooltip="Confirm password must be the same with New password."
            rules={validateConstant.passwordRules}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm Password"
              className="login-password"
              // autoComplete="current-password"
              maxLength={50}
            />
          </Form.Item>
          {editMode ? (
            <>
              <Button type="primary" className={'primary-custom-color'} htmlType="submit">
                Update
              </Button>{' '}
            </>
          ) : (
            <> </>
          )}
        </>
      </Form>
    </>
  );
};
export default AccountSettings;
