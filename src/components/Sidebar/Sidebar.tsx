import { Avatar, Button, Drawer } from 'antd';
import type React from 'react';

import { SidebarMenuStateContext } from '@/contexts/SidebarMenuStateContext';
import { UserOutlined } from '@ant-design/icons';
import useMobile from '@/utils/useMobile';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const SidebarMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const handleLogout = () => {
    signOut();
  };

  const isMobile = useMobile();

  return (
    isMobile && (
      <SidebarMenuStateContext.Consumer>
        {(sidebarMenuState) => (
          <Drawer
            placement="right"
            closable={false}
            open={!sidebarMenuState.isCollapsed}
            onClose={() => sidebarMenuState.setCollapsed(true)}
            getContainer={false}
          >
            {user ? (
              <>
                <Link to="/profile">
                  <Avatar shape="square" className={'custom-color'} icon={<UserOutlined />} />
                </Link>
                <Button type="primary" className={'custom-color'} ghost onClick={handleLogout}>
                  Logout
                </Button>{' '}
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button className={'custom-color'} ghost>
                    Sign in
                  </Button>
                </Link>

                <Link to="/register">
                  <Button className={'custom-color'} ghost>
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </Drawer>
        )}
      </SidebarMenuStateContext.Consumer>
    )
  );
};

export default SidebarMenu;
