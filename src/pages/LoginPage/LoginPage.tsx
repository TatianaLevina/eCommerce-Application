import type React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export type FieldType = {
  email?: string;
  password?: string;
};

const LoginPage: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: FieldType) => {
    if (values.email && values.password) {
      try {
        await signIn(values.email, values.password);
        navigate('/');
      } catch (error) {
        console.error('Login failed:', error);
        // TODO: Handle login failure (e.g., display an error message)
      }
    }
  };

  return (
    <Flex justify="center" align="center" className="login_wrapper" style={{ width: '100vw' }}>
      <Form
        name="normal_login"
        className="login-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, minWidth: 350 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            { required: true, message: 'Please input your email to login!' },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Email is wrong. Example: test@mail.com',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" maxLength={50} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            {
              pattern: /^(?!\s+)(?=.*[0-9])(?=.*[!@#$%^&*.@])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*.@]{8,}(?!\s+)$/,
              message: 'Ensure password meets complexity requirements.',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            maxLength={50}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Flex gap="small">
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            <span>Or</span>
            <Link to="/register">register now!</Link>
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default LoginPage;
