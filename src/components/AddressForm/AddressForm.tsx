import { useEffect } from 'react';
import type React from 'react';
import { Flex, Form, Input, Select, Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import validateConstant from '@data/validateConstants';
import { options } from '@pages/RegisterPage/RegisterPage';
import type { AddressFormProps } from './AddressFormProps.interface';
import SwitchItem from '@components/SwitchItem/SwitchItem';

const AddressForm: React.FC<AddressFormProps> = ({ addressInfo: initialValues, onFormInstanceReady, disabled }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    onFormInstanceReady(form);
  }, []);

  return (
    <Form form={form} requiredMark="optional" disabled={disabled} layout="vertical" initialValues={initialValues}>
      <Flex gap="small" wrap>
        <Form.Item name="isBillingAddress" valuePropName="checked" className="address__form-item">
          <SwitchItem
            className="address__form-switch"
            text={'Billing Address'}
            checkedChildren="yes"
            unCheckedChildren="no"
            onChange={(checked: boolean) => {
              if (!checked) {
                form.setFieldValue('isDefaultBillingAddress', false);
              }
            }}
          />
        </Form.Item>
        <Form.Item name="isDefaultBillingAddress" valuePropName="checked" className="address__form-item">
          <Switch
            checkedChildren="default"
            unCheckedChildren="make default"
            onChange={(checked: boolean) => {
              if (checked) {
                form.setFieldValue('isBillingAddress', checked);
              }
            }}
          ></Switch>
        </Form.Item>
      </Flex>
      <Flex gap="small" wrap>
        <Form.Item name="isShippingAddress" valuePropName="checked" className="address__form-item">
          <SwitchItem
            className="address__form-switch"
            text="Shipping Address"
            checkedChildren="yes"
            unCheckedChildren="no"
            onChange={(checked: boolean) => {
              if (!checked) {
                form.setFieldValue('isDefaultShippingAddress', false);
              }
            }}
          ></SwitchItem>
        </Form.Item>

        <Form.Item name="isDefaultShippingAddress" valuePropName="checked">
          <Switch
            checkedChildren="default"
            unCheckedChildren="make default"
            onChange={(checked: boolean) => {
              if (checked) {
                form.setFieldValue('isShippingAddress', true);
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
