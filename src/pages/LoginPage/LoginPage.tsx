import type React from 'react';
import { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Modal, Spin, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import validateConstant from '@/data/validateConstants';

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
          setSpinning(false);
          showError(error.message);
        });
    }
  };
  const { Title } = Typography;

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
        <Title // Form's Title
          level={3}
          style={{
            paddingBottom: 15,
            color: '#376a4f',
          }}
        >
          Sign In
        </Title>

        <Form
          name="normal_login"
          className="login-form"
          requiredMark="optional"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 350 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
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
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" maxLength={50} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            tooltip="Enter password. Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (!@#$%^&*.)"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password length must be minimum 8 characters.' },
              {
                pattern: validateConstant.passwordPattern,
                message:
                  'Must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (!@#$%^&*.)',
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
                Sign in
              </Button>
              <span>Or</span>
              <Link to="/register">register now!</Link>
            </Flex>
          </Form.Item>
        </Form>
      </Flex>
    </>
  );
};

export default LoginPage;
