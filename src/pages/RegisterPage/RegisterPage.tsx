import type { BaseAddress } from '@/components/AddressForm/AddressForm';
import AddressForm from '@/components/AddressForm/AddressForm';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Flex, Input, Divider } from 'antd';
import dayjs from 'dayjs';

const addr: Addresses = {
  adresses: [],
  defaultShippingAddress: null,
  defaultBillingAddress: null,
  shippingAddresses: [],
  billingAddresses: [],
};

export type Addresses = {
  adresses: BaseAddress[];
  defaultShippingAddress: number | null;
  shippingAddresses: number[];
  defaultBillingAddress: number | null;
  billingAddresses: number[];
};

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
  birdth?: dayjs.Dayjs;
};

export type UserInfo = {
  username: string;
  email: string;
  password: string;
  birdth?: Date;
  addresses?: Addresses;
};

// export type RegisterProps = {
//   onLogin: (values: UserInfo) => void;
// };

// const onFinish = (values: FieldType, callbackfn: (values: UserInfo) => void) => {
//   const userInfo = { ...values, addresses: { ...addr } };
//   callbackfn(userInfo);
//   console.log(userInfo);
// };

const onFinish = (values: FieldType) => {
  const userInfo = {
    username: values.username,
    email: values.email,
    password: values.password,
    birdth: dayjs(values.birdth).toDate(),
    addresses: { ...addr },
  };
  console.log(userInfo);
};

const addAddress = (value: BaseAddress) => {
  addr.defaultBillingAddress =
    value.type === 'billing' && value.isdefault ? addr.adresses.length : addr.defaultBillingAddress;
  addr.defaultShippingAddress =
    value.type === 'shipping' && value.isdefault ? addr.adresses.length : addr.defaultShippingAddress;
  if (value.type === 'billing') {
    addr.billingAddresses.push(addr.adresses.length);
  } else {
    addr.shippingAddresses.push(addr.adresses.length);
  }
  addr.adresses.push(value);
};

export default function RegisterPage() {
  return (
    <Flex justify="center" vertical align="center" className="register_wrapper" style={{ width: '100vw' }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={(val) => onFinish(val)}
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

        <Form.Item<FieldType> label="Date of birth" name="birdth">
          <DatePicker />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Divider>Address</Divider>
      <AddressForm callbackFn={addAddress} />
    </Flex>
  );
}
