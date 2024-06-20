import type React from 'react';
import { useState } from 'react';
import type { FormInstance } from 'antd';
import { Button, Flex, List, Modal, Spin, Typography, notification } from 'antd';
import type { BaseAddress } from '@commercetools/platform-sdk';

import { useAuth } from '@contexts/AuthContext';
import { addAddress } from '@services/CustomerService';
import AddressForm from '@components/AddressForm/AddressForm';
import AddressCard from '@components/AddressCard/AddressCard';
import type { AddressInfo } from '@/services/Service.interface';

const AddressBook: React.FC = () => {
  const { Title } = Typography;
  const { user, updateUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [saveInProgress, setSaveInProgress] = useState(false);
  const [newAddressFormInstance, setFormInstance] = useState<FormInstance>();
  const [api, contextHolder] = notification.useNotification();
  const addressCardsData: AddressInfo[] = user!.addresses.map((address: BaseAddress) => {
    return {
      address,
      isBillingAddress: user!.billingAddressIds?.includes(address.id!),
      isShippingAddress: user!.shippingAddressIds?.includes(address.id!),
      isDefaultBillingAddress: user!.defaultBillingAddressId === address.id!,
      isDefaultShippingAddress: user!.defaultShippingAddressId === address.id!,
    };
  });

  const showAddAddressModal = (): void => {
    setOpen(true);
  };

  const showSuccess = (): void => {
    api.success({
      message: 'All changes are saved',
      duration: 3,
    });
  };

  const showError = (message: string): void => {
    api.error({
      message,
      duration: 5,
    });
  };

  const handleCancel = (): void => {
    newAddressFormInstance?.resetFields();
    setOpen(false);
  };

  const addNewAddress = async (): Promise<void> => {
    setSaveInProgress(true);
    try {
      let values: AddressInfo | null = null;
      try {
        values = (await newAddressFormInstance?.validateFields()) as AddressInfo;
      } catch {
        setSaveInProgress(false);
        return;
      }

      const response = await addAddress(user!.id, user!.version, values);
      updateUser(response.body);
      newAddressFormInstance?.resetFields();
      setOpen(false);
      setSaveInProgress(false);
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      }

      newAddressFormInstance?.resetFields();
      setOpen(false);
      setSaveInProgress(false);
      return;
    }
    showSuccess();
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={saveInProgress} fullscreen />
      <h1 className="custom-title">My Profile</h1>
      <Flex justify="space-between" style={{ width: '100%' }} wrap>
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
