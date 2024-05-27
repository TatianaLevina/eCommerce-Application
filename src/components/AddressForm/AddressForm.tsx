import type React from 'react';
import validateConstant from '@/data/validateConstants';
import { options } from '@/pages/RegisterPage/RegisterPage';
import type { BaseAddress } from '@commercetools/platform-sdk';
import { Flex, Form, Input, Select, Switch, Typography, type FormInstance } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Text } = Typography;

export interface AddressFormValues {
  address?: BaseAddress;
  isBillingAddress?: boolean;
  isShippingAddress?: boolean;
  isDefaultBillingAddress?: boolean;
  isDefaultShippingAddress?: boolean;
}
export interface AddressFormProps {
  initialValues: AddressFormValues;
  onFormInstanceReady: (instance: FormInstance<AddressFormValues>) => void;
  disabled?: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({ initialValues, onFormInstanceReady, disabled }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    onFormInstanceReady(form);
  }, []);
  const [isBilling, setBilling] = useState(initialValues.isBillingAddress);
  const [isShipping, setShipping] = useState(initialValues.isShippingAddress);
  const [isDefaultBilling, setDefaultBilling] = useState(initialValues.isDefaultBillingAddress);
  const [isDefaultShipping, setDefaultShipping] = useState(initialValues.isDefaultShippingAddress);
  return (
    <Form
      form={form}
      requiredMark="optional"
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      disabled={disabled}
      layout="vertical"
      initialValues={{
        street: initialValues.address?.streetName,
        city: initialValues.address?.city,
        country: initialValues.address?.country,
        postalCode: initialValues.address?.postalCode,
      }}
    >
      <Form.Item name="billingAddress">
        <Flex gap="small">
          {' '}
          <Text>Billing Address</Text>
          <Switch
            checkedChildren="yes"
            unCheckedChildren="no"
            disabled={!isShipping}
            checked={isBilling}
            onChange={(checked: boolean) => {
              if (!checked) {
                setDefaultBilling(false);
              }
              setBilling(checked);
            }}
          ></Switch>
          <Switch
            checkedChildren="default"
            unCheckedChildren="make default"
            checked={isDefaultBilling}
            onChange={(checked: boolean) => {
              setDefaultBilling(checked);
              if (checked) {
                setBilling(checked);
              }
            }}
          ></Switch>
        </Flex>
      </Form.Item>
      <Form.Item name="shippingAddress">
        <Flex gap="small">
          <Text>Shipping Address</Text>
          <Switch
            checkedChildren="yes"
            unCheckedChildren="no"
            disabled={!isBilling}
            checked={isShipping}
            onChange={(checked: boolean) => {
              if (!checked) {
                setDefaultShipping(false);
              }
              setShipping(checked);
            }}
          ></Switch>
          <Switch
            checkedChildren="default"
            unCheckedChildren="make default"
            checked={isDefaultShipping}
            onChange={(checked: boolean) => {
              setDefaultShipping(checked);
              if (checked) {
                setShipping(checked);
              }
            }}
          ></Switch>
        </Flex>
      </Form.Item>
      <Form.Item
        name="street"
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
        name="city"
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
        name="country"
        label="Country"
        tooltip="This is a required field. Select a country from the list"
        rules={[{ required: true }]}
      >
        <Select options={options} placeholder="Select country" />
      </Form.Item>
      <Form.Item
        name="postalCode"
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
    </Form>
  );
};

export default AddressForm;
