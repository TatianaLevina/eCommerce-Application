import type React from 'react';
import { Button, Flex, Form, Input, List, Modal, Select, Switch, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import type { AddressCardProps } from '../AddressCard/AddressCard';
import AddressCard from '../AddressCard/AddressCard';
import { useAuth } from '@/contexts/AuthContext';
import type { BaseAddress } from '@commercetools/platform-sdk';
import { useState } from 'react';
import validateConstant from '@/data/validateConstants';
import { options } from '@/pages/RegisterPage/RegisterPage';
const { Title, Text } = Typography;

const AddressBook: React.FC = () => {
  const [form] = Form.useForm();
  const [isBilling, setBilling] = useState(true);
  const [isShipping, setShipping] = useState(false);
  const [isDefaultBilling, setDefaultBilling] = useState(false);
  const [isDefaultShipping, setDefaultShipping] = useState(false);

  const { user } = useAuth();
  const data: AddressCardProps[] = user!.addresses.map((address: BaseAddress) => {
    return {
      address,
      isBillingAddress: user!.billingAddressIds?.includes(address.id!),
      isShippingAddress: user!.shippingAddressIds?.includes(address.id!),
      isDefaultBillingAddress: user!.defaultBillingAddressId === address.id!,
      isDefaultShippingAddress: user!.defaultShippingAddressId === address.id!,
    };
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showAddAddressModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
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
    console.log('Submit');
  };

  return (
    <>
      <h1 className="custom-title">My Profile</h1>
      <Flex justify="space-between" style={{ width: '100%' }}>
        <Title
          level={4}
          color="#376a4f"
          style={{
            color: '#376a4f',
            textAlign: 'left',
            marginTop: 10,
          }}
        >
          Address Book
        </Title>
        <Button
          style={{ alignSelf: 'center' }}
          type="primary"
          className={' primary-custom-color'}
          onClick={showAddAddressModal}
        >
          Add new address
        </Button>
        <Modal
          open={open}
          title="Add new address"
          onOk={handleSave}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel} className={' primary-custom-color'}>
              Cancel
            </Button>,
            <Button
              key="save"
              type="primary"
              loading={loading}
              onClick={handleSave}
              className={' primary-custom-color'}
            >
              Save
            </Button>,
          ]}
        >
          <Form
            style={{ width: '70%' }}
            form={form}
            requiredMark="optional"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            initialValues={{ remember: true }}
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
        </Modal>
      </Flex>
      <List
        // grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <AddressCard {...item} />
          </List.Item>
        )}
      />
    </>
  );
};
export default AddressBook;
