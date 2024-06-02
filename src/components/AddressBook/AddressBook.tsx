import type React from 'react';
import type { FormInstance } from 'antd';
import { Button, Flex, List, Modal, Spin, Typography, notification } from 'antd';
import AddressCard from '../AddressCard/AddressCard';
import { useAuth } from '@/contexts/AuthContext';
import type { BaseAddress } from '@commercetools/platform-sdk';
import { useState } from 'react';
import AddressForm from '../AddressForm/AddressForm';
import type { AddressInfo } from '@/services/CustomerService';
import { addAddress } from '@/services/CustomerService';
const { Title } = Typography;

const AddressBook: React.FC = () => {
  const { user, updateUser } = useAuth();
  const addressCardsData: AddressInfo[] = user!.addresses.map((address: BaseAddress) => {
    return {
      address,
      isBillingAddress: user!.billingAddressIds?.includes(address.id!),
      isShippingAddress: user!.shippingAddressIds?.includes(address.id!),
      isDefaultBillingAddress: user!.defaultBillingAddressId === address.id!,
      isDefaultShippingAddress: user!.defaultShippingAddressId === address.id!,
    };
  });
  const [open, setOpen] = useState(false);
  const [saveInProgress, setSaveInProgress] = useState(false);
  const [newAddressFormInstance, setFormInstance] = useState<FormInstance>();
  const showAddAddressModal = () => {
    setOpen(true);
  };
  const [api, contextHolder] = notification.useNotification();
  const showSuccess = () => {
    api.success({
      message: 'All changes are saved',
      duration: 3,
    });
  };
  const showError = (message: string) => {
    api.error({
      message,
      duration: 5,
    });
  };

  const handleCancel = () => {
    newAddressFormInstance?.resetFields();
    setOpen(false);
  };
  const addNewAddress = async () => {
    setSaveInProgress(true);
    try {
      const values = (await newAddressFormInstance?.validateFields()) as AddressInfo;

      const response = await addAddress(user!.id, user!.version, values);
      updateUser(response.body);
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      }
      console.log('Failed:', error);
      return;
    } finally {
      newAddressFormInstance?.resetFields();
      setOpen(false);
      setSaveInProgress(false);
    }
    showSuccess();
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={saveInProgress} fullscreen />
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
          onOk={addNewAddress}
          onCancel={handleCancel}
          forceRender={true}
          footer={[
            <Button key="back" onClick={handleCancel} className={' primary-custom-color'}>
              Cancel
            </Button>,
            <Button
              key="save"
              type="primary"
              // loading={loading}
              onClick={addNewAddress}
              className={' primary-custom-color'}
            >
              Save
            </Button>,
          ]}
        >
          <AddressForm
            addressInfo={{
              isBillingAddress: true,
              isShippingAddress: true,
              isDefaultBillingAddress: false,
              isDefaultShippingAddress: false,
            }}
            onFormInstanceReady={(instance: FormInstance) => {
              setFormInstance(instance);
            }}
          />
        </Modal>
      </Flex>

      <List
        // grid={{ gutter: 16, column: 4 }}
        dataSource={addressCardsData}
        rowKey={(item) => item.address!.id!}
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
