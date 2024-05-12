// import type { BaseAddress } from '@/components/AddressForm/AddressForm';
// import AddressForm from '@/components/AddressForm/AddressForm';
// import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import { Button, DatePicker, Form, Flex, Input, Divider } from 'antd';
// import dayjs from 'dayjs';
//
// const addr: Addresses = {
//   adresses: [],
//   defaultShippingAddress: null,
//   defaultBillingAddress: null,
//   shippingAddresses: [],
//   billingAddresses: [],
// };
//
// export type Addresses = {
//   adresses: BaseAddress[];
//   defaultShippingAddress: number | null;
//   shippingAddresses: number[];
//   defaultBillingAddress: number | null;
//   billingAddresses: number[];
// };
//
// type FieldType = {
//   username?: string;
//   email?: string;
//   password?: string;
//   birdth?: dayjs.Dayjs;
// };
//
// export type UserInfo = {
//   username: string;
//   email: string;
//   password: string;
//   birdth?: Date;
//   addresses?: Addresses;
// };
//
// // export type RegisterProps = {
// //   onLogin: (values: UserInfo) => void;
// // };
//
// // const onFinish = (values: FieldType, callbackfn: (values: UserInfo) => void) => {
// //   const userInfo = { ...values, addresses: { ...addr } };
// //   callbackfn(userInfo);
// //   console.log(userInfo);
// // };
//
// const onFinish = (values: FieldType) => {
//   const userInfo = {
//     username: values.username,
//     email: values.email,
//     password: values.password,
//     birdth: dayjs(values.birdth).toDate(),
//     addresses: { ...addr },
//   };
//   console.log(userInfo);
// };
//
// const addAddress = (value: BaseAddress) => {
//   addr.defaultBillingAddress =
//     value.type === 'billing' && value.isdefault ? addr.adresses.length : addr.defaultBillingAddress;
//   addr.defaultShippingAddress =
//     value.type === 'shipping' && value.isdefault ? addr.adresses.length : addr.defaultShippingAddress;
//   if (value.type === 'billing') {
//     addr.billingAddresses.push(addr.adresses.length);
//   } else {
//     addr.shippingAddresses.push(addr.adresses.length);
//   }
//   addr.adresses.push(value);
// };
//
// export default function RegisterPage() {
//   return (
//     <Flex justify="center" vertical align="center" className="register_wrapper" style={{ width: '100vw' }}>
//       <Form
//         name="basic"
//         labelCol={{ span: 8 }}
//         wrapperCol={{ span: 16 }}
//         style={{ maxWidth: 600 }}
//         initialValues={{ remember: true }}
//         onFinish={(val) => onFinish(val)}
//         autoComplete="off"
//       >
//         <Form.Item<FieldType>
//           label="First Name"
//           name="username"
//           rules={[{ required: true, message: 'Please input your username!' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item<FieldType>
//           label="Last Name"
//           name="username"
//           rules={[{ required: true, message: 'Please input your username!' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item<FieldType>
//           label="E-mail"
//           name="email"
//           rules={[
//             { required: true, message: 'Please input your email to login!' },
//             {
//               pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//               message: 'Email is wrong. Example: test@mail.com',
//             },
//           ]}
//         >
//           <Input
//             prefix={<UserOutlined className="site-form-item-icon" />}
//             className="login-email"
//             placeholder="Email"
//             maxLength={50}
//           />
//         </Form.Item>
//         <Form.Item<FieldType>
//           label="Password"
//           name="password"
//           rules={[
//             { required: true, message: 'Please input your password!' },
//             {
//               pattern: /^(?!\s+)(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}(?!\s+)$/,
//               message:
//                 'Password is too easy. The password must be at least 8 characters. Password must contain at least one uppercase and at least one lowercase letters. Password must contain at least one digit. Password must contain at least one special character. Password must not contain leading or trailing whitespace.',
//             },
//           ]}
//         >
//           <Input.Password
//             prefix={<LockOutlined className="site-form-item-icon" />}
//             placeholder="Password"
//             className="login-password"
//             maxLength={50}
//           />
//         </Form.Item>
//         <Form.Item<FieldType> label="Date of birth" name="birdth">
//           <DatePicker />
//         </Form.Item>
//
//         <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//       <Divider>Address</Divider>
//       <AddressForm callbackFn={addAddress} />
//     </Flex>
//   );
// }

import type React from 'react';
import { useState } from 'react';
import { Form, Button, Input, DatePicker, Checkbox, Typography, Flex } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.tsx';
import type { BaseAddress } from '@commercetools/platform-sdk';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Address {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth?: string;
  addresses: BaseAddress[];
  billingAddresses: number[];
  shippingAddresses: number[];
  defaultShippingAddress: number | undefined;
  defaultBillingAddress: number | undefined;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthdate?: string;
  billingStreet: string;
  billingCity: string;
  billingPostalCode: string;
  billingCountry: string;
  billingAsDefault?: boolean;
  shippingStreet?: string;
  shippingCity?: string;
  shippingPostalCode?: string;
  shippingCountry?: string;
  shippingAsDefault?: boolean;
}

export const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const [shareAddress, setShareAddress] = useState(true);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: FormValues) => {
    const billingAddress: Address = {
      streetName: values.billingStreet,
      city: values.billingCity,
      postalCode: values.billingPostalCode,
      country: values.billingCountry,
    };

    const shippingAddress: Address = shareAddress
      ? billingAddress
      : {
          streetName: values.shippingStreet!,
          city: values.shippingCity!,
          postalCode: values.shippingPostalCode!,
          country: values.shippingCountry!,
        };

    const addresses = [billingAddress];
    if (!shareAddress) {
      addresses.push(shippingAddress);
    }

    const userInfo: UserInfo = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      dateOfBirth: values.birthdate ? dayjs(values.birthdate).format('YYYY-MM-DD') : undefined,
      addresses: addresses,
      billingAddresses: [0],
      shippingAddresses: [shareAddress ? 0 : 1],
      defaultShippingAddress: shareAddress || values.shippingAsDefault ? 0 : undefined,
      defaultBillingAddress: values.billingAsDefault ? 0 : undefined,
    };

    try {
      await signUp(userInfo);
      navigate('/');
    } catch (error) {
      console.error('Sign up failed:', error);
      //TODO: Handle errors
    }
  };

  return (
    <Flex justify="center" align="center" className="register_wrapper" style={{ width: '100vw' }}>
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 600 }}
        autoComplete="on"
      >
        <Title level={3}>Register</Title>
        {/* Registration fields */}
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please input your First Name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please input your First Name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Email format is wrong. Example: test@mail.com',
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
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please input your password!' },
            {
              pattern: /^(?!\s+)(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*.]{8,}(?!\s+)$/,
              message:
                'The password must be at least 8 characters and contain at least one uppercase and one lowercase letters, one digit, one special character. No leading or trailing whitespaces are allowed.',
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
        <Form.Item name="birthdate" label="Birthdate">
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Checkbox checked={shareAddress} onChange={(e) => setShareAddress(e.target.checked)}>
          Billing and Shipping addresses are the same
        </Checkbox>

        {/* Billing Address */}
        <Title level={4}>Billing Address</Title>
        <Form.Item
          name="billingStreet"
          label="Street"
          rules={[{ required: true, pattern: /^(?!\s+).+(?!\s+)$/, message: 'Must contain at least one character.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="billingCity"
          label="City"
          rules={[
            {
              required: true,
              pattern: /^(?!\s+)[[A-Za-z\s]+(?!\s+)$/,
              message: 'Must contain at least one character and no special characters or numbers',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="billingPostalCode"
          label="Postal Code"
          rules={[
            {
              pattern: /^(?!\s+)([A-Z0-9]{5}-[A-Z0-9]{4})|([A-Z0-9]{4}\s[A-Z0-9]{3})|([0-9]{6})(?!\s+)$/,
              message: 'Must follow the format for the country (000000 or XXXXX-YYYY or XXXX YYY)',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="billingCountry"
          label="Country"
          rules={[{ required: true, pattern: /^[A-Z]{2}$/, message: 'Country must be a two-letter ISO code.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="billingAsDefault" valuePropName="checked">
          <Checkbox>
            {shareAddress ? 'Set as default shipping and billing address' : 'Set as default billing address'}
          </Checkbox>
        </Form.Item>

        {/* Conditional Shipping Address */}
        {!shareAddress && (
          <>
            <Title level={4}>Shipping Address</Title>
            <Form.Item
              name="shippingStreet"
              label="Street"
              rules={[{ pattern: /^(?!\s+).+(?!\s+)$/, message: 'Must contain at least one character.' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="shippingCity"
              label="City"
              rules={[
                {
                  pattern: /^(?!\s+)[[A-Za-z\s]+(?!\s+)$/,
                  message: 'Must contain at least one character and no special characters or numbers',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="shippingPostalCode"
              label="Postal Code"
              rules={[
                {
                  pattern: /^(?!\s+)([A-Z0-9]{5}-[A-Z0-9]{4})|([A-Z0-9]{4}\s[A-Z0-9]{3})|([0-9]{6})(?!\s+)$/,
                  message: 'Must follow the format for the country (000000 or XXXXX-YYYY or XXXX YYY)',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="shippingCountry"
              label="Country"
              rules={[{ required: true, pattern: /^[A-Z]{2}$/, message: 'Country must be a two-letter ISO code.' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="shippingAsDefault" valuePropName="checked">
              <Checkbox>Set as default shipping address</Checkbox>
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default RegisterPage;
