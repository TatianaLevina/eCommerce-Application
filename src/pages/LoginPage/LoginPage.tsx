import type React from 'react';
import { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Modal, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpError, useAuth } from '@contexts/AuthContext';
import validateConstant from '@data/validateConstants';

export type FieldType = {
  email?: string;
  password?: string;
};

const LoginPage: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);

  const onFinish = (values: FieldType): void => {
    if (values.email && values.password) {
      setSpinning(true);
      signIn(values.email, values.password)
        .then(() => {
          setSpinning(false);
          navigate('/');
        })
        .catch((error) => {
          if (error instanceof SignUpError) {
            setSpinning(false);
            showError(error.message);
          } else {
            console.error(error);
            throw error;
          }
        });
    }
  };

  const showError = (msg: string): void => {
    Modal.error({
      title: 'Error!',
      content: msg,
    });
  };

  const onFinishFailed = (): void => {};

  return (
    <>
      <Spin spinning={spinning} fullscreen />
      <Flex justify="center" vertical align="center" className="login_wrapper">
        <h1 className="custom-title">Sign In</h1>

        <Form
          name="normal_login"
          className="login-form"
          requiredMark="optional"
          layout="vertical"
          style={{ width: 340 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Form.Item
            label="E-mail"
            name="email"
            tooltip="Enter email. The email must contain the characters '@' and '.', for example test@mail."
            rules={[
              { required: true, message: 'Please input your email to login!' },
              {
                pattern: validateConstant.emailPattern,
                message: 'Email is wrong. Example: test@mail.com',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              autoComplete="email"
              maxLength={50}
            />
          </Form.Item>

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

          <Form.Item>
            <Flex gap="small" align="center">
              <Button type="primary" className={'login-form-button primary-custom-color'} htmlType="submit">
                Sign in
              </Button>
              <span>or</span>
              <Link className={'custom-link'} to="/register">
                Sign up now!
              </Link>
            </Flex>
          </Form.Item>
        </Form>
      </Flex>
    </>
  );
};

export default LoginPage;
