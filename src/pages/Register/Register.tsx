// import type { FormProps } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Flex, Input, Divider, Radio, Switch } from 'antd';
import type dayjs from 'dayjs';

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
  birdth?: dayjs.Dayjs;
};

type Addresses = {
  adresses: BaseAddress[];
  defaultShippingAddress: number | null;
  shippingAddresses: number[];
  defaultBillingAddress: number | null;
  billingAddresses: number[];
};

const addr: Addresses = {
  adresses: [],
  defaultShippingAddress: null,
  defaultBillingAddress: null,
  shippingAddresses: [],
  billingAddresses: [],
};

type RequiredMark = 'shipping' | 'billing';

type BaseAddress = {
  street?: string;
  city?: string;
  country?: string;
  postalcode?: string;
  type?: RequiredMark;
  isdefault?: boolean;
};

export type UserInfo = {
  street?: string;
  city?: string;
  country?: string;
  postalcode?: string;
  type?: RequiredMark;
  isdefault?: boolean;
  addresses?: Addresses;
};

export type LoginProps = {
  onLogin: (values: UserInfo) => void;
};

const onFinish = (values: FieldType, callbackfn: (values: UserInfo) => void) => {
  const userInfo = { ...values, addresses: { ...addr } };
  callbackfn(userInfo);
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

      <Form
        name="address"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true, type: 'shipping' }}
        style={{ maxWidth: 600 }}
        onFinish={(val) => addAddress(val)}
        autoComplete="off"
      >
        <Form.Item<BaseAddress> name="type">
          <Radio.Group>
            <Radio.Button value="shipping">Shipping</Radio.Button>
            <Radio.Button value="billing">Billing</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item<BaseAddress> label="Set default" name="isdefault">
          <Switch />
        </Form.Item>

        <Form.Item<BaseAddress>
          label="Street"
          name="street"
          rules={[{ pattern: /^(?!\s+).+(?!\s+)$/, message: 'Must contain at least one character.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<BaseAddress>
          label="City"
          name="city"
          rules={[
            {
              pattern: /^(?!\s+)[[A-Za-z\s]+(?!\s+)$/,
              message: 'Must contain at least one character and no special characters or numbers',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<BaseAddress> label="Country" name="country" rules={[]}>
          <Input />
        </Form.Item>

        <Form.Item<BaseAddress>
          label="Postal Code"
          name="postalcode"
          rules={[
            {
              pattern: /^(?!\s+)([A-Z0-9]{5}-[A-Z0-9]{4})|([A-Z0-9]{4}\s[A-Z0-9]{3})|([0-9]{6})(?!\s+)$/,
              message: 'Must follow the format for the country (000000 or XXXXX-YYYY or XXXX YYY)',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit">Add to address list</Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}
