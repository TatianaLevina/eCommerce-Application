import type React from 'react';
import { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Spin, notification } from 'antd';
import type { FormInstance } from 'antd';
import type { AddressInfo } from '@services/CustomerService';
import { removeAddress, updateAddress } from '@services/CustomerService';
import { useAuth } from '@contexts/AuthContext';
import AddressForm from '@components/AddressForm/AddressForm';

const AddressCard: React.FC<AddressInfo> = (addressInfo: AddressInfo) => {
  const [editMode, setEditMode] = useState(false);
  const [addressFormInstance, setFormInstance] = useState<FormInstance>();
  const { user, updateUser } = useAuth();
  const [updateInProgress, setUpdateInProgress] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    addressFormInstance?.setFieldsValue(addressInfo);
  }, [addressFormInstance, addressInfo]);

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

  const handleSave = async (): Promise<void> => {
    setEditMode(!editMode);
    setUpdateInProgress(true);
    try {
      const values = (await addressFormInstance?.validateFields()) as AddressInfo;
      const response = await updateAddress(user!.id, user!.version, addressInfo, values);
      updateUser(response.body);
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      }
      console.log('Failed:', error);
      addressFormInstance?.resetFields();
      return;
    } finally {
      setUpdateInProgress(false);
    }
    showSuccess();
  };

  const handleRemove = async (): Promise<void> => {
    setUpdateInProgress(true);
    try {
      const response = await removeAddress(user!.id, user!.version, addressInfo.address!.id!);
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

  const handleCancelEdit = (): void => {
    addressFormInstance?.resetFields();
    setEditMode(!editMode);
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
            <CloseOutlined key="cancel" onClick={handleCancelEdit} />
          ) : (
            <EditOutlined key="edit" onClick={() => setEditMode(!editMode)} />
          ),
        ]}
      >
        <AddressForm
          addressInfo={addressInfo}
          onFormInstanceReady={(instance: FormInstance) => {
            setFormInstance(instance);
          }}
          disabled={!editMode}
        />
      </Card>
    </>
  );
};

export default AddressCard;
