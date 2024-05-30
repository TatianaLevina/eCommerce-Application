import type React from 'react';
import { EditOutlined, DeleteOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Card } from 'antd';
// import { Spin } from 'antd';
import type { BaseAddress } from '@commercetools/platform-sdk';

import { useState } from 'react';

import AddressForm from '../AddressForm/AddressForm';

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
  const [editMode, setEditMode] = useState(false);
  const [addressFormInstance, setFormInstance] = useState<FormInstance>();
  // const [updateInProgress, setUpdateInProgress] = useState(false);

  const handleSave = async () => {
    setEditMode(!editMode);
    try {
      const values = await addressFormInstance?.validateFields();
      console.log('Form values:', values);
    } catch (error) {
      console.log('Failed:', error);
    }
  };

  return (
    <>
      {/* <Spin spinning={updateInProgress} fullscreen />{' '} */}
      <Card
        style={{ width: '100%' }}
        actions={[
          <DeleteOutlined key="deleting" />,
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
