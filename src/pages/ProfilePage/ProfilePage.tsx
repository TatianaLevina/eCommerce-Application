import type React from 'react';
import { Button, Checkbox, DatePicker, Flex, Form, Input, Select, Typography } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import validateConstant from '@data/validateConstants';
import moment from 'moment';
import { useState } from 'react';
import { options } from '../RegisterPage/RegisterPage';

const { Title } = Typography;

interface UserGeneralInfo {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
}
interface UserAddress {
  country: string;
  streetName?: string;
  city?: string;
  postalCode?: string;
  isDefault?: boolean;
}

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const { user } = useAuth();
  const onFinish = () => {};
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setEditMode(disabled);
  };

  const initValuesGeneralInfo: UserGeneralInfo = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    birthDate: user?.dateOfBirth,
  };
  const initBillingAddress: UserAddress = {
    country: '',
    streetName: '',
    city: '',
    postalCode: '',
    isDefault: true,
  };
  const initShippingAddress: UserAddress = {
    country: '',
    streetName: '',
    city: '',
    postalCode: '',
    isDefault: false,
  };

  if (user?.addresses[0].streetName) {
    initBillingAddress.streetName = user?.addresses[0].streetName;
  }
  if (user?.addresses[0].city) {
    initBillingAddress.city = user?.addresses[0].city;
  }
  if (user?.addresses[0].country) {
    initBillingAddress.country = user?.addresses[0].country;
  }
  if (user?.addresses[0].postalCode) {
    initBillingAddress.postalCode = user?.addresses[0].postalCode;
  }
  if (user?.defaultBillingAddressId) {
    initBillingAddress.isDefault = true;
  } else {
    initBillingAddress.isDefault = false;
  }
  if (user?.defaultShippingAddressId) {
    initShippingAddress.isDefault = true;
  } else {
    initShippingAddress.isDefault = false;
  }
  if (user?.addresses.length === 1) {
    initShippingAddress.streetName = initBillingAddress.streetName;
    initShippingAddress.city = initBillingAddress.city;
    initShippingAddress.country = initBillingAddress.country;
    initShippingAddress.postalCode = initBillingAddress.postalCode;
  } else {
    if (user?.addresses[1].streetName) {
      initShippingAddress.streetName = user?.addresses[1].streetName;
    }
    if (user?.addresses[1].city) {
      initShippingAddress.city = user?.addresses[1].city;
    }
    if (user?.addresses[1].country) {
      initShippingAddress.country = user?.addresses[1].country;
    }
    if (user?.addresses[1].postalCode) {
      initShippingAddress.postalCode = user?.addresses[1].postalCode;
    }
  }

  return (
    <>
      <h1 className="custom-title">Profile</h1>
      <Flex justify="center" style={{ width: '100%' }}>
        <Form
          form={form}
          name="profile"
          onFinish={onFinish}
          initialValues={{
            firstName: initValuesGeneralInfo.firstName,
            lastName: initValuesGeneralInfo.lastName,
            billingStreet: initBillingAddress.streetName,
            billingCity: initBillingAddress.city,
            billingPostalCode: initBillingAddress.postalCode,
            shippingStreet: initShippingAddress.streetName,
            shippingCity: initShippingAddress.city,
            shippingPostalCode: initShippingAddress.postalCode,
          }}
          onValuesChange={onFormLayoutChange}
          disabled={!editMode}
        >
          <div className="profile__general-info">
            <Title
              level={4}
              color="#376a4f"
              style={{
                color: '#376a4f',
                textAlign: 'left',
                marginTop: 10,
              }}
            >
              General Information
            </Title>
            <Form.Item name="firstName" label="First Name">
              <Input />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name">
              <Input />
            </Form.Item>
            <Form.Item name="birthDate" label="Birth date">
              <DatePicker
                defaultValue={moment(initValuesGeneralInfo.birthDate, validateConstant.dateFormat)}
                format={validateConstant.dateFormat}
              />
            </Form.Item>
          </div>
          <div className="profile__addresses">
            <Title
              level={4}
              style={{
                color: '#376a4f',
                textAlign: 'left',
                marginTop: 10,
              }}
            >
              Addresses
            </Title>
            <Flex gap="large" wrap>
              <div>
                <Title
                  level={5}
                  style={{
                    color: '#376a4f',
                    textAlign: 'left',
                    marginTop: 10,
                  }}
                >
                  Billing Address
                </Title>
                <Form.Item name="billingStreet" label="Street">
                  <Input />
                </Form.Item>
                <Form.Item name="billingCity" label="City">
                  <Input />
                </Form.Item>
                <Form.Item name="billingCountry" label="Country">
                  <Select defaultValue={initBillingAddress.country} options={options} placeholder="Select country" />
                </Form.Item>
                <Form.Item name="billingPostalCode" label="Postal Code">
                  <Input />
                </Form.Item>
                <Checkbox checked={initBillingAddress.isDefault}> Billing address as default</Checkbox>
              </div>
              <div>
                <Title
                  level={5}
                  style={{
                    color: '#376a4f',
                    textAlign: 'left',
                    marginTop: 10,
                  }}
                >
                  Shipping Address
                </Title>
                <Form.Item name="shippingStreet" label="Street">
                  <Input />
                </Form.Item>
                <Form.Item name="shippingCity" label="City">
                  <Input />
                </Form.Item>
                <Form.Item name="shippingCountry" label="Country">
                  <Select defaultValue={initShippingAddress.country} options={options} placeholder="Select country" />
                </Form.Item>
                <Form.Item name="shippingPostalCode" label="Postal Code">
                  <Input />
                </Form.Item>
                <Checkbox checked={initShippingAddress.isDefault}> Shipping address as default</Checkbox>
              </div>
            </Flex>
          </div>
          {editMode ? (
            <>
              <Button type="primary" className={'primary-custom-color'} htmlType="submit">
                Update
              </Button>{' '}
            </>
          ) : (
            <> </>
          )}
        </Form>
        {editMode ? (
          <>
            <Button
              style={{ alignSelf: 'flex-start' }}
              type="primary"
              className={' primary-custom-color'}
              onClick={() => setEditMode(!editMode)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            {' '}
            <Button
              style={{ alignSelf: 'flex-start' }}
              type="primary"
              className={' primary-custom-color'}
              onClick={() => setEditMode(!editMode)}
            >
              Edit
            </Button>{' '}
          </>
        )}
      </Flex>
    </>
  );
};
export default ProfilePage;
