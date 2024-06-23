import type React from 'react';
import { HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import { useState } from 'react';

import PersonalInfo from '@/components/PersonalInfo/PersonalInfo';
import AddressBook from '@/components/AddressBook/AddressBook';
import AccountSettings from '@/components/AccountSettings/AccountSettings';
import useMobile from '@/hooks/useMobile';
import './ProfilePage.scss';

const { Content, Sider } = Layout;

const subMenuItemsDesktop: MenuProps['items'] = [
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

const subMenuItemsMobile: MenuProps['items'] = [
  {
    key: 'info',
    icon: <UserOutlined />,
  },
  {
    key: 'addresses',
    icon: <HomeOutlined />,
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
  },
];

const getItemComponent = (key: string): JSX.Element | undefined => {
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
  const isMobile = useMobile();
  const [item, setItem] = useState('info');

  const itemsChange = (): ItemType[] => {
    if (isMobile) {
      return subMenuItemsMobile;
    }
    return subMenuItemsDesktop;
  };

  return (
    <>
      <Layout style={{ padding: '24px 0', background: '#fff', borderRadius: '8px' }}>
        <Sider className="profile__sider">
          <Menu
            mode="inline"
            defaultSelectedKeys={['info']}
            defaultOpenKeys={['info']}
            style={{ height: '100%' }}
            items={itemsChange()}
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
