import type React from 'react';
import validateConstant from '@/data/validateConstants';
import { options } from '@/pages/RegisterPage/RegisterPage';
import { Flex, Form, Input, Select, Switch, Typography, type FormInstance } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import type { AddressInfo } from '@/services/CustomerService';

const { Text } = Typography;

export interface AddressFormProps {
  initialValues: AddressInfo;
  onFormInstanceReady: (instance: FormInstance<AddressInfo>) => void;
  disabled?: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({ initialValues, onFormInstanceReady, disabled }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    onFormInstanceReady(form);
  }, []);
  const [isBillingAddress, setBilling] = useState(initialValues.isBillingAddress);
  const [isShippingAddress, setShipping] = useState(initialValues.isShippingAddress);
  const [isDefaultBillingAddress, setDefaultBilling] = useState(initialValues.isDefaultBillingAddress);
  const [isDefaultShippingAddress, setDefaultShipping] = useState(initialValues.isDefaultShippingAddress);
  return (
    <Form
      form={form}
      requiredMark="optional"
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      disabled={disabled}
      layout="vertical"
      initialValues={initialValues}
    >
      <Flex gap="small">
        <Form.Item name="isBillingAddress" valuePropName="checked">
          <Flex gap="small">
            <Text>Billing Address</Text>
            <Switch
              checkedChildren="yes"
              unCheckedChildren="no"
              disabled={!isShippingAddress}
              checked={isBillingAddress}
              onChange={(checked: boolean) => {
                if (!checked) {
                  setDefaultBilling(false);
                }
                setBilling(checked);
              }}
            ></Switch>
          </Flex>
        </Form.Item>
        <Form.Item name="isDefaultBillingAddress" valuePropName="checked">
          <Switch
            checkedChildren="default"
            unCheckedChildren="make default"
            checked={isDefaultBillingAddress}
            onChange={(checked: boolean) => {
              setDefaultBilling(checked);
              if (checked) {
                setBilling(checked);
              }
            }}
          ></Switch>
        </Form.Item>
      </Flex>
      <Flex gap="small">
        <Form.Item name="isShippingAddress" valuePropName="checked">
          <Flex gap="small">
            <Text>Shipping Address</Text>
            <Switch
              checkedChildren="yes"
              unCheckedChildren="no"
              disabled={!isBillingAddress}
              checked={isShippingAddress}
              onChange={(checked: boolean) => {
                if (!checked) {
                  setDefaultShipping(false);
                }
                setShipping(checked);
              }}
            ></Switch>
          </Flex>
        </Form.Item>

        <Form.Item name="isDefaultShippingAddress" valuePropName="checked">
          <Switch
            checkedChildren="default"
            unCheckedChildren="make default"
            checked={isDefaultShippingAddress}
            onChange={(checked: boolean) => {
              setDefaultShipping(checked);
              if (checked) {
                setShipping(checked);
              }
            }}
          ></Switch>
        </Form.Item>
      </Flex>
      <Form.Item
        name={['address', 'streetName']}
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
        name={['address', 'city']}
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
        name={['address', 'country']}
        label="Country"
        tooltip="This is a required field. Select a country from the list"
        rules={[{ required: true }]}
      >
        <Select options={options} placeholder="Select country" />
      </Form.Item>
      <Form.Item
        name={['address', 'postalCode']}
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
