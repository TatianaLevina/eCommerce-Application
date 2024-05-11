import type React from 'react';
import { useState } from 'react';
import { Form, Button, Input, DatePicker, Checkbox, Typography, Flex, Select, Spin, Modal } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.tsx';
import type { BaseAddress } from '@commercetools/platform-sdk';
import { LockOutlined, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import countries from '../../data/countries.json';

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

interface Option {
  value: string;
  label: string;
}

const options: Option[] = countries.map((c) => {
  return { value: c.Code, label: c.Name };
});

export const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const [shareAddress, setShareAddress] = useState(true);
  const [spinning, setSpinning] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  function showError(msg: string): void {
    Modal.error({
      title: 'Error!',
      content: msg,
    });
  }

  const onFinish = (values: FormValues): void => {
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

    console.log(values.billingCountry);

    // try {
    //   // setTimeout(() => {
    //   //   setSpinning(true);
    //   //   console.error('Sign up failed:');
    //   //   //TODO: Handle errors;
    //   //   setSpinning(false);
    //   //   showError('Something wrong. User is not registered.');
    //   // }, 2000);
    //   // setSpinning(true);
    //   // console.log(userInfo);

    //   setSpinning(true);
    //   await signUp(userInfo);
    //   setSpinning(false);
    //   navigate('/');
    // } catch (error) {
    //   setSpinning(false);
    //   showError('Something wrong. User is not registered.');
    //   //TODO: Handle errors
    // }

    signUp(userInfo)
      .then(() => {
        setSpinning(false);
        navigate('/');
      })
      .catch(() => {
        setSpinning(false);
        showError('Something wrong. User is not registered.');
      });
  };

  const onFinishFailed = (): void => {
    showError('Fill in required fields!');
  };

  return (
    <>
      <Spin spinning={spinning} fullscreen />
      <Flex justify="center" align="center" className="register_wrapper" style={{ width: '100vw' }}>
        <Form
          form={form}
          initialValues={{ remember: true }}
          requiredMark="optional"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          style={{ maxWidth: 600 }}
          autoComplete="on"
        >
          <Title level={3}>Register</Title>
          {/* Registration fields */}
          <Form.Item
            name="firstName"
            label="First Name"
            tooltip={{
              title: `Please input your First Name. The First Name must contain at least one character and must not contain special characters.`,
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                message: 'The First Name must contain at least one character and must not contain special characters.',
                pattern: /(?!\s+)$/,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            tooltip={{
              title: `Please input your Last Name. The First Name must contain at least one character and must not contain special characters.`,
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                message: 'The First Name must contain at least one character and must not contain special characters.',
                pattern: /(?!\s+)$/,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            tooltip="This is a required field. The email must contain the characters '@' and '.', for example test@mail.com"
            rules={[
              { message: 'Please input your email!' },
              {
                required: true,
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
            tooltip="This is a required field. Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (!@#$%^&*.)"
            rules={[
              { message: 'Please input your password!' },
              {
                required: true,
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
          <Form.Item
            name="birthdate"
            label="Birthdate"
            tooltip={{
              title: `Please enter your date of birth. You must be over 13 years old.`,
              icon: <InfoCircleOutlined />,
            }}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Checkbox checked={shareAddress} onChange={(e) => setShareAddress(e.target.checked)}>
            Billing and Shipping addresses are the same
          </Checkbox>

          {/* Billing Address */}
          <>
            <Title level={4}>Billing Address</Title>
            <Form.Item
              name="billingStreet"
              label="Street"
              tooltip={{
                title: `Enter street. Must contain at least one character`,
                icon: <InfoCircleOutlined />,
              }}
              rules={[{ pattern: /^(?!\s+).+(?!\s+)$/, message: 'Must contain at least one character.' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="billingCity"
              label="City"
              tooltip={{
                title: `Enter city. Must contain at least one character and no special characters or numbers`,
                icon: <InfoCircleOutlined />,
              }}
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
              label="Country"
              name="billingCountry"
              tooltip="This is a required field. Select a country from the list"
              rules={[{ required: true }]}
            >
              <Select options={options} placeholder="Select country" />
            </Form.Item>
            <Form.Item
              name="billingPostalCode"
              label="Postal Code"
              tooltip={{
                title: `Enter Postal Code. Must follow the format for the country (000000 or XXXXX-YYYY or XXXX YYY)`,
                icon: <InfoCircleOutlined />,
              }}
              rules={[
                {
                  pattern: /^(?!\s+)([A-Z0-9]{5}-[A-Z0-9]{4})|([A-Z0-9]{4}\s[A-Z0-9]{3})|([0-9]{6})(?!\s+)$/,
                  message: 'Must follow the format for the country (000000 or XXXXX-YYYY or XXXX YYY)',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="billingAsDefault" valuePropName="checked">
              <Checkbox>
                {shareAddress ? 'Set as default shipping and billing address' : 'Set as default billing address'}
              </Checkbox>
            </Form.Item>
          </>
          {/* Conditional Shipping Address */}
          {!shareAddress && (
            <>
              <Title level={4}>Shipping Address</Title>
              <Form.Item
                name="shippingStreet"
                label="Street"
                tooltip={{
                  title: `Enter street. Must contain at least one character`,
                  icon: <InfoCircleOutlined />,
                }}
                rules={[{ pattern: /^(?!\s+).+(?!\s+)$/, message: 'Must contain at least one character.' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="shippingCity"
                label="City"
                tooltip={{
                  title: `Enter city. Must contain at least one character and no special characters or numbers`,
                  icon: <InfoCircleOutlined />,
                }}
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
                label="Country"
                name="shippingCountry"
                tooltip="This is a required field. Select a country from the list"
                rules={[{ required: true }]}
              >
                <Select options={options} placeholder="Select country" />
              </Form.Item>

              <Form.Item
                name="shippingPostalCode"
                label="Postal Code"
                tooltip={{
                  title: `Enter Postal Code. Must follow the format for the country (000000 or XXXXX-YYYY or XXXX YYY)`,
                  icon: <InfoCircleOutlined />,
                }}
                rules={[
                  {
                    pattern: /^(?!\s+)([A-Z0-9]{5}-[A-Z0-9]{4})|([A-Z0-9]{4}\s[A-Z0-9]{3})|([0-9]{6})(?!\s+)$/,
                    message: 'Must follow the format for the country (000000 or XXXXX-YYYY or XXXX YYY)',
                  },
                ]}
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
    </>
  );
};

export default RegisterPage;
