import type React from 'react';
import { EditOutlined, DeleteOutlined, CloseOutlined, SaveOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Card, Flex, Form, Input, Modal, Select, Spin, Switch, Typography } from 'antd';
import type { BaseAddress } from '@commercetools/platform-sdk';
import { options } from '@/pages/RegisterPage/RegisterPage';
import { useState } from 'react';
import validateConstant from '@/data/validateConstants';

const { Text } = Typography;

export interface AddressCardProps {
  address: BaseAddress;
  isBillingAddress?: boolean;
  isShippingAddress?: boolean;
  isDefaultBillingAddress?: boolean;
  isDefaultShippingAddress?: boolean;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isBillingAddress,
  isShippingAddress,
  isDefaultBillingAddress,
  isDefaultShippingAddress,
}) => {
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [isBilling, setBilling] = useState(isBillingAddress);
  const [isShipping, setShipping] = useState(isShippingAddress);
  const [isDefaultBilling, setDefaultBilling] = useState(isDefaultBillingAddress);
  const [isDefaultShipping, setDefaultShipping] = useState(isDefaultShippingAddress);
  const [updateInProgress, setUpdateInProgress] = useState(false);

  function showError(msg: string): void {
    Modal.error({
      title: 'Error!',
      content: msg,
    });
  }
  const onFinishFailed = (): void => {
    showError('Fill in required fields!');
  };

  const onFinish = (): void => {
    setUpdateInProgress(true);
    setTimeout(() => {
      setUpdateInProgress(false);
    }, 3000);
    console.log('Submit');
  };

  return (
    <>
      <Spin spinning={updateInProgress} fullscreen />{' '}
      <Card
        style={{ width: '100%' }}
        actions={[
          <DeleteOutlined key="deleting" />,
          editMode ? <SaveOutlined key="save" onClick={() => setEditMode(!editMode)} /> : <> </>,
          editMode ? (
            <CloseOutlined key="cancel" onClick={() => setEditMode(!editMode)} />
          ) : (
            <EditOutlined key="edit" onClick={() => setEditMode(!editMode)} />
          ),
        ]}
      >
        <Form
          style={{ width: '70%' }}
          form={form}
          disabled={!editMode}
          requiredMark="optional"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          initialValues={{
            street: address.streetName,
            city: address.city,
            country: address.country,
            postalCode: address.postalCode,
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
      </Card>
    </>
  );
};
export default AddressCard;
