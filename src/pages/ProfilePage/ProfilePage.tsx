import type React from 'react';
import { DatePicker, Form, Input, Typography } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import validateConstant from '@data/validateConstants';
import moment from 'moment';

const { Title } = Typography;

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const onFinish = () => {};
  return (
    <div>
      {/* <h1 className="custom-title">Profile</h1> */}
      <Form
        form={form}
        name="profile"
        onFinish={onFinish}
        initialValues={{
          firstName: user?.firstName,
          lastName: user?.lastName,
          // birthDate: user?.dateOfBirth,
        }}
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
      </Form>
    </div>
  );
};
export default ProfilePage;
