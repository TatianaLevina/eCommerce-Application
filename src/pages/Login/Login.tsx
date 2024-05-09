import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

export type FieldType = {
  email?: string;
  password?: string;
};

export type LoginProps = {
  onLogin: (values: FieldType) => void;
};

const onFinish = (values: FieldType, callbackfn: (values: FieldType) => void) => {
  callbackfn(values);
};

export default function Login(props: LoginProps) {
  return (
    <Flex justify="center" align="center" className="login_wrapper" style={{ width: '100vw' }}>
      <Form
        name="normal_login"
        className="login-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, minWidth: 350 }}
        initialValues={{ remember: true }}
        onFinish={(val) => onFinish!(val, props.onLogin)}
        autoComplete="off"
      >
        <Form.Item<FieldType>
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
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            className="login-email"
            placeholder="Email"
            maxLength={50}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            {
              pattern: /^(?!\s+)(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}(?!\s+)$/,
              message:
                'Password is too easy. It must contain at least one uppercase, lowercase letters, digit and special character. Password must NOT contain leading or trailing whitespace.',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            className="login-password"
            maxLength={50}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Flex gap="small">
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            <span>Or</span>
            <Link to="/">register now!</Link>
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );
}
