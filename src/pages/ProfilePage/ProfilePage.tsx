import type React from 'react';
import { Button, DatePicker, Flex, Form, Input, Typography } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import validateConstant from '@data/validateConstants';
import moment from 'moment';
import { useState } from 'react';

const { Title } = Typography;

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const { user } = useAuth();
  const onFinish = () => {};
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setEditMode(disabled);
  };
  return (
    <Flex vertical align="flex-start">
      {/* <h1 className="custom-title">Profile</h1> */}
      {editMode ? (
        <>
          <Button
            style={{ alignSelf: 'flex-end' }}
            type="primary"
            className={' primary-custom-color'}
            onClick={() => setEditMode(!editMode)}
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          {' '}
          <Button
            style={{ alignSelf: 'flex-end' }}
            type="primary"
            className={' primary-custom-color'}
            onClick={() => setEditMode(!editMode)}
          >
            Edit
          </Button>{' '}
        </>
      )}

      <Form
        form={form}
        name="profile"
        onFinish={onFinish}
        initialValues={{
          firstName: user?.firstName,
          lastName: user?.lastName,
        }}
        onValuesChange={onFormLayoutChange}
        disabled={!editMode}
      >
        <Title
          level={4}
          color="#376a4f"
          style={{
            color: '#376a4f',
            textAlign: 'left',
            marginTop: 10,
          }}
        >
          General Information
        </Title>
        <Form.Item name="firstName" label="First Name">
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name">
          <Input />
        </Form.Item>
        <Form.Item name="birthDate" label="Birth date">
          <DatePicker
            defaultValue={moment(user?.dateOfBirth, validateConstant.dateFormat)}
            format={validateConstant.dateFormat}
          />
        </Form.Item>
        <Title
          level={4}
          color="#376a4f"
          style={{
            color: '#376a4f',
            textAlign: 'left',
            marginTop: 10,
          }}
        >
          Addresses
        </Title>
        {editMode ? (
          <>
            <Button type="primary" className={'primary-custom-color'} htmlType="submit">
              Update
            </Button>{' '}
          </>
        ) : (
          <> </>
        )}
      </Form>
    </Flex>
  );
};
export default ProfilePage;
