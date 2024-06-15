import type React from 'react';
import { useState } from 'react';
import { Button, DatePicker, Flex, Form, Input, Modal, Spin, Typography, notification } from 'antd';
import { EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useAuth } from '@/contexts/AuthContext';
import validateConstant from '@/data/validateConstants';
import { updateUserInfo, type UserGeneralInfo } from '@/services/CustomerService';

const PersonalInfo: React.FC = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [updateInProgress, setUpdateInProgress] = useState(false);
  const { user, updateUser } = useAuth();
  const [api, contextHolder] = notification.useNotification();
  const initValuesGeneralInfo: UserGeneralInfo = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    birthDate: user?.dateOfBirth !== undefined ? dayjs(user!.dateOfBirth, validateConstant.dateFormat) : undefined,
    email: user?.email,
  };

  const showError = (msg: string): void => {
    Modal.error({
      title: 'Error!',
      content: msg,
    });
  };

  const showSuccess = (): void => {
    api.success({
      message: 'All changes are saved',
      duration: 3,
    });
  };

  const validateAge = (val: dayjs.Dayjs | undefined): boolean => {
    return +new Date(Date.now() - dayjs(val).toDate().getTime()).getFullYear() - 1970 >= validateConstant.AgeLimit;
  };

  const onFinish = async (values: UserGeneralInfo): Promise<void> => {
    setEditMode(false);
    if (values.birthDate && !validateAge(values.birthDate)) {
      setEditMode(true);
      showError('You must be over 13 years old.');
      return;
    }

    const updateValues: UserGeneralInfo = {
      firstName: initValuesGeneralInfo.firstName !== values.firstName ? values.firstName : undefined,
      lastName: initValuesGeneralInfo.lastName !== values.lastName ? values.lastName : undefined,
      birthDate: !initValuesGeneralInfo.birthDate?.isSame(values.birthDate) ? values.birthDate : undefined,
      email: initValuesGeneralInfo.email !== values.email ? values.email : undefined,
    };
    const shouldUpdate = !Object.values(updateValues).every((el) => el === undefined);
    if (!shouldUpdate) {
      showSuccess();
      return;
    }

    setUpdateInProgress(true);
    try {
      const response = await updateUserInfo(user!.id, user!.version, updateValues);
      updateUser(response.body);
      showSuccess();
    } catch (error) {
      setEditMode(true);
      showError(`${error}`);
    } finally {
      setUpdateInProgress(false);
    }
  };

  const onFinishFailed = (): void => {
    showError('Fill in required fields!');
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={updateInProgress} fullscreen />
      <h1 className="custom-title">My Profile</h1>
      <Flex justify="space-between" style={{ width: '100%' }}>
        <Title
          level={4}
          color="#376a4f"
          style={{
            color: '#376a4f',
            textAlign: 'left',
            marginTop: '10px',
          }}
        >
          Personal Information
        </Title>
        {editMode ? (
          <>
            <Button
              style={{ alignSelf: 'center' }}
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
              style={{ alignSelf: 'center' }}
              type="primary"
              className={' primary-custom-color'}
              onClick={() => setEditMode(!editMode)}
            >
              <EditOutlined />
              Edit
            </Button>{' '}
          </>
        )}
      </Flex>
      <Form
        form={form}
        name="profile"
        requiredMark="optional"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        initialValues={{
          firstName: initValuesGeneralInfo.firstName,
          lastName: initValuesGeneralInfo.lastName,
          email: initValuesGeneralInfo.email,
          birthDate: initValuesGeneralInfo.birthDate,
        }}
        disabled={!editMode}
      >
        <div className="profile__general-info">
          <Form.Item
            name="firstName"
            label="First Name"
            tooltip={{
              title: `The First Name must contain at least one character and must not contain special characters.`,
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                required: false,
                message: 'The First Name must contain at least one character and must not contain special characters.',
                pattern: validateConstant.namePattern,
                max: 50,
                min: 1,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            tooltip={{
              title: `The Last Name must contain at least one character and must not contain special characters.`,
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                message: 'The Last Name must contain at least one character and must not contain special characters.',
                pattern: validateConstant.namePattern,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="birthDate"
            label="Birth date"
            tooltip={{
              title: `You must be over 13 years old.`,
              icon: <InfoCircleOutlined />,
            }}
          >
            <DatePicker
              onChange={(val) => {
                if (val && !validateAge(val)) {
                  showError('You must be over 13 years old.');
                }
              }}
              format={validateConstant.dateFormat}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            tooltip="This is a required field. The email must contain the characters '@' and '.', for example test@mail.com"
            rules={[
              { message: 'Please input your email!' },
              {
                required: true,
                pattern: validateConstant.emailPattern,
                message: 'Email format is wrong. Example: test@mail.com',
              },
            ]}
          >
            <Input placeholder="Email" autoComplete="email" maxLength={50} />
          </Form.Item>
        </div>

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
    </>
  );
};

export default PersonalInfo;
