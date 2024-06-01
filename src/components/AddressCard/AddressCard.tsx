import type React from 'react';
import { EditOutlined, DeleteOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Card, Spin, notification } from 'antd';
// import { Spin } from 'antd';
import type { BaseAddress } from '@commercetools/platform-sdk';

import { useState } from 'react';

import AddressForm from '../AddressForm/AddressForm';
import type { AddressInfo } from '@/services/CustomerService';
import { removeAddress } from '@/services/CustomerService';
import { useAuth } from '@/contexts/AuthContext';

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
}: AddressInfo) => {
  const [editMode, setEditMode] = useState(false);
  const [addressFormInstance, setFormInstance] = useState<FormInstance>();
  const { user, updateUser } = useAuth();
  const [updateInProgress, setUpdateInProgress] = useState(false);
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

  const handleSave = async () => {
    setEditMode(!editMode);
    try {
      const values = await addressFormInstance?.validateFields();
      console.log('Form values:', values);
    } catch (error) {
      console.log('Failed:', error);
    }
  };
  const handleRemove = async () => {
    setUpdateInProgress(true);
    try {
      const response = await removeAddress(user!.id, user!.version, address!.id!);
      updateUser(response.body);
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
        return;
      }
    } finally {
      setUpdateInProgress(false);
    }
    showSuccess();
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={updateInProgress} fullscreen />{' '}
      <Card
        style={{ width: '100%' }}
        actions={[
          <DeleteOutlined key="deleting" onClick={handleRemove} />,
          editMode ? <SaveOutlined key="save" onClick={handleSave} /> : <> </>,
          editMode ? (
            <CloseOutlined key="cancel" onClick={() => setEditMode(!editMode)} />
          ) : (
            <EditOutlined key="edit" onClick={() => setEditMode(!editMode)} />
          ),
        ]}
      >
        <AddressForm
          initialValues={{
            address,
            isBillingAddress,
            isShippingAddress,
            isDefaultBillingAddress,
            isDefaultShippingAddress,
          }}
          onFormInstanceReady={(instance) => {
            setFormInstance(instance);
          }}
          disabled={!editMode}
        />
      </Card>
    </>
  );
};
export default AddressCard;
