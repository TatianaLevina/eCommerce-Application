import type React from 'react';
import { Button, Flex, Form, Input, Modal, Spin, Typography } from 'antd';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { EditOutlined, LockOutlined } from '@ant-design/icons';
import validateConstant from '@/data/validateConstants';

const { Title } = Typography;

const AccountSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const { user } = useAuth();
  const [updateInProgress, setUpdateInProgress] = useState(false);

  const showError = (msg: string): void => {
    Modal.error({
      title: 'Error!',
      content: msg,
    });
  };

  interface Passwords {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

  const onFinish = (values: Passwords) => {
    setEditMode(false);
    if (values.newPassword === values.currentPassword) {
      setEditMode(true);
      showError('New password is the same with Current password. Please enter another one.');
      return;
    }
    if (values.newPassword !== values.confirmPassword) {
      setEditMode(true);
      showError('Confirm password is NOT the same with New password. Please check!');
      return;
    }
    setUpdateInProgress(true);
    setTimeout(() => {
      setUpdateInProgress(false);
    }, 5000);
  };

  const onFinishFailed = (): void => {
    showError('Fill in required fields!');
  };

  return (
    <>
      <Spin spinning={updateInProgress} fullscreen />
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
              onClick={() => setEditMode(!editMode)}
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
              onClick={() => setEditMode(!editMode)}
            >
              <EditOutlined />
              Change
            </Button>{' '}
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
        <Form.Item
          name="currentPassword"
          label="Current Password"
          tooltip="This is a required field. Enter password in English. Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (!@#$%^&*.)"
          rules={validateConstant.passwordRules}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            // placeholder="Current Password"
            className="login-password"
            // autoComplete="current-password"
            maxLength={50}
          />
        </Form.Item>
        {editMode ? (
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
            <Button type="primary" className={'primary-custom-color'} htmlType="submit">
              Update
            </Button>{' '}
          </>
        ) : (
          <> </>
        )}
      </Form>
    </>
  );
};
export default AccountSettings;
