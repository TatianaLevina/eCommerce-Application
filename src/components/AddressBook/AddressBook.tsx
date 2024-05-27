import type React from 'react';
import type { FormInstance } from 'antd';
import { Button, Flex, List, Modal, Typography } from 'antd';
import type { AddressCardProps } from '../AddressCard/AddressCard';
import AddressCard from '../AddressCard/AddressCard';
import { useAuth } from '@/contexts/AuthContext';
import type { BaseAddress } from '@commercetools/platform-sdk';
import { useState } from 'react';
import AddressForm from '../AddressForm/AddressForm';
const { Title } = Typography;

const AddressBook: React.FC = () => {
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
  // const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [newAddressFormInstance, setFormInstance] = useState<FormInstance>();
  const showAddAddressModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleSave = async () => {
    try {
      const values = await newAddressFormInstance?.validateFields();
      console.log('Form values:', values);
    } catch (error) {
      console.log('Failed:', error);
    }
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
              // loading={loading}
              onClick={handleSave}
              className={' primary-custom-color'}
            >
              Save
            </Button>,
          ]}
        >
          <AddressForm
            initialValues={{ isBillingAddress: true, isShippingAddress: true }}
            onFormInstanceReady={(instance) => {
              setFormInstance(instance);
            }}
          />
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
