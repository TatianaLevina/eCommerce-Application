import type React from 'react';
import { useState } from 'react';
import { Form, Button, Input, DatePicker, Checkbox, Typography, Flex, Select, Spin, Modal } from 'antd';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';

import { SignUpError, useAuth } from '@contexts/AuthContext.tsx';
import countries from '@data/countries.json';
import type { Option, Address, FormValues, UserInfo } from './RegisterPage.interface';
import validateConstant from '@utils/validateConstant.ts';

const { Title } = Typography;

export const options: Option[] = countries.map((c) => {
  return { value: c.Code, label: c.Name };
});

export const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const [shareAddress, setShareAddress] = useState(true);
  const [spinning, setSpinning] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const showError = (msg: string): void => {
    Modal.error({
      title: 'Error!',
      content: msg,
    });
  };

  const validateAge = (val: dayjs.Dayjs | undefined): boolean => {
    return +new Date(Date.now() - dayjs(val).toDate().getTime()).getFullYear() - 1970 >= validateConstant.AgeLimit;
  };

  const onFinish = (values: FormValues): void => {
    if (values.birthdate && !validateAge(values.birthdate)) {
      showError('You must be over 13 years old.');
      return;
    }

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
      dateOfBirth: values.birthdate ? dayjs(values.birthdate).format(validateConstant.dateFormat) : undefined,
      addresses: addresses,
      billingAddresses: [0],
      shippingAddresses: [shareAddress ? 0 : 1],
      defaultShippingAddress: values.shippingAsDefault ? 0 : undefined,
      defaultBillingAddress: values.billingAsDefault ? 0 : undefined,
    };

    setSpinning(true);

    signUp(userInfo)
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
  };

  const onFinishFailed = (): void => {
    showError('Fill in required fields!');
  };

  return (
    <>
      <Spin spinning={spinning} fullscreen />
      <Flex justify="center" align="center" className="register_wrapper">
        <Form
          form={form}
          initialValues={{ remember: true }}
          requiredMark="optional"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          style={{ width: 360 }}
          autoComplete="on"
        >
          <Title
            level={3}
            color="#376a4f"
            style={{
              color: '#376a4f',
              textAlign: 'center',
              marginTop: 10,
            }}
          >
            Sign Up
          </Title>

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
                required: false,
                message: 'The First Name must contain at least one character and must not contain special characters.',
                pattern: validateConstant.namePattern,
                max: 50,
                min: 1,
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
                pattern: validateConstant.namePattern,
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
                pattern: validateConstant.emailPattern,
                message: 'Email format is wrong. Example: test@mail.com',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              className="login-email"
              placeholder="Email"
              autoComplete="email"
              maxLength={50}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            tooltip="This is a required field. Enter password in English. Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (!@#$%^&*.)"
            rules={validateConstant.passwordRules}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              className="login-password"
              autoComplete="current-password"
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
            <DatePicker
              onChange={(val) => {
                if (val && !validateAge(val)) {
                  showError('You must be over 13 years old.');
                }
              }}
              format={validateConstant.dateFormat}
            />
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
              rules={[{ pattern: validateConstant.streetPattern, message: 'Must contain at least one character.' }]}
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
                  pattern: validateConstant.cityPattern,
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
                  pattern: validateConstant.postalCodePattern,
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
                rules={[{ pattern: validateConstant.streetPattern, message: 'Must contain at least one character.' }]}
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
                    pattern: validateConstant.cityPattern,
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
                    pattern: validateConstant.postalCodePattern,
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
            <Flex gap="small">
              <Button type="primary" className={'login-form-button primary-custom-color'} htmlType="submit">
                Sign up
              </Button>
              <span>Or</span>
              <Link className={'custom-link'} to="/login">
                Sign in now!
              </Link>
            </Flex>
          </Form.Item>
        </Form>
      </Flex>
    </>
  );
};

export default RegisterPage;
