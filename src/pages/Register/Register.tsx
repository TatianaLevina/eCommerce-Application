// import type { FormProps } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Flex, Input, Divider } from 'antd';
import type dayjs from 'dayjs';

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
  birdth?: dayjs.Dayjs;
  shipping: string;
};

type AddressType = {
  street?: string;
  city?: string;
};

export type LoginProps = {
  onLogin: (values: FieldType) => void;
};

const onFinish = (values: FieldType, callbackfn: (values: FieldType) => void) => {
  callbackfn(values);
};

const addAddress = (value: AddressType) => {
  console.log(value);
};

export default function Register(props: LoginProps) {
  return (
    <Flex justify="center" vertical align="center" className="register_wrapper" style={{ width: '100vw' }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={(val) => onFinish(val, props.onLogin)}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="First Name"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

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
                'Password is too easy. The password must be at least 8 characters. Password must contain at least one uppercase and at least one lowercase letters. Password must contain at least one digit. Password must contain at least one special character. Password must not contain leading or trailing whitespace.',
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

        <Form.Item<FieldType> label="DatePicker" name="birdth">
          <DatePicker />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Divider>Addresses</Divider>

      <Form
        name="address"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        style={{ maxWidth: 600 }}
        onFinish={(val) => addAddress(val)}
        autoComplete="off"
      >
        <Form.Item<AddressType> label="City" name="city" rules={[]}>
          <Input />
        </Form.Item>

        <Form.Item<AddressType> label="City" name="city" rules={[]}>
          <Input />
        </Form.Item>

        <Form.Item<AddressType> label="City" name="city" rules={[]}>
          <Input />
        </Form.Item>

        <Form.Item<AddressType> label="City" name="city" rules={[]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit">Add</Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}
