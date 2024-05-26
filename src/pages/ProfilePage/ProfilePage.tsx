import type React from 'react';
import { HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import PersonalInfo from '@/components/PersonalInfo/PersonalInfo';
import AddressBook from '@/components/AddressBook/AddressBook';
import AccountSettings from '@/components/AccountSettings/AccountSettings';

const { Content, Sider } = Layout;

const subMenuItems: MenuProps['items'] = [
  {
    key: 'info',
    icon: <UserOutlined />,
    label: 'Personal Info',
  },
  {
    key: 'addresses',
    icon: <HomeOutlined />,
    label: 'Address Book',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Account Settings',
  },
];

const getItemComponent = (key: string) => {
  switch (key) {
    case 'info':
      return <PersonalInfo />;
    case 'addresses':
      return <AddressBook />;
    case 'settings':
      return <AccountSettings />;
    default:
      break;
  }
};

const ProfilePage: React.FC = () => {
  const [item, setItem] = useState('info');
  return (
    <>
      <Layout style={{ padding: '24px 0', background: '#fff', borderRadius: '8px' }}>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['info']}
            defaultOpenKeys={['info']}
            style={{ height: '100%' }}
            items={subMenuItems}
            onSelect={(info) => {
              setItem(info.key);
            }}
          />
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>{getItemComponent(item)}</Content>
      </Layout>
    </>
  );
};
export default ProfilePage;
