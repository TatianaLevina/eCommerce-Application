import { Avatar, Button, Drawer, Flex, Divider } from 'antd';
import type { DrawerStyles } from 'antd/es/drawer/DrawerPanel';
import type React from 'react';
import { DrawerStateContext } from '@contexts/DrawerStateContext';
import { UserOutlined } from '@ant-design/icons';
import useMobile from '@hooks/useMobile';
import { Link } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';

const AppDrawer: React.FC = () => {
  const { user, signOut } = useAuth();
  const handleLogout = () => {
    signOut();
  };

  const isMobile = useMobile();

  const justifyOptions = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'];

  const alignOptions = ['flex-start', 'center', 'flex-end'];

  const drawerStyles: DrawerStyles = {
    mask: {
      // backdropFilter: 'blur(10px)',
    },
    content: {
      fontSize: '20px',
      boxShadow: '-10px 0 10px #666',
    },
    header: {},
    body: {},
    footer: {},
  };

  return (
    isMobile && (
      <DrawerStateContext.Consumer>
        {(drawerState) => (
          <Drawer
            styles={drawerStyles}
            title="Sweet Home"
            placement="right"
            open={!drawerState.isCollapsed}
            onClose={() => drawerState.setCollapsed(true)}
            getContainer={false}
            footer={
              user ? (
                <>
                  <Flex gap="small" justify={justifyOptions[1]} align={alignOptions[1]}>
                    <Link
                      onClick={() => {
                        drawerState.setCollapsed(true);
                      }}
                      to="/profile"
                    >
                      <Avatar shape="square" className={'custom-color'} icon={<UserOutlined />} />
                    </Link>
                    <p>or</p>
                    <Button type="primary" className={'custom-color'} ghost onClick={handleLogout}>
                      Logout
                    </Button>{' '}
                  </Flex>
                </>
              ) : (
                <Flex gap="small" justify={justifyOptions[1]} align={alignOptions[1]}>
                  <Link
                    className={'custom-link'}
                    onClick={() => {
                      drawerState.setCollapsed(true);
                    }}
                    to="/login"
                  >
                    Sign in
                  </Link>
                  <p className={'drawer_text'}>or</p>
                  <Link
                    className={'custom-link'}
                    onClick={() => {
                      drawerState.setCollapsed(true);
                    }}
                    to="/register"
                  >
                    Sign up
                  </Link>
                </Flex>
              )
            }
          >
            <Flex gap="large" vertical justify={justifyOptions[0]} align={alignOptions[1]}>
              <>
                <Link
                  className={'custom-link'}
                  onClick={() => {
                    drawerState.setCollapsed(true);
                  }}
                  to="/"
                >
                  Home
                </Link>
                <Divider style={{ margin: '0' }} />
                <Link
                  className={'custom-link'}
                  onClick={() => {
                    drawerState.setCollapsed(true);
                  }}
                  to="/catalog"
                >
                  Catalog
                </Link>
                <Divider style={{ margin: '0' }} />
                <Link
                  className={'custom-link'}
                  onClick={() => {
                    drawerState.setCollapsed(true);
                  }}
                  to="/about"
                >
                  About us
                </Link>
                <Divider style={{ margin: '0' }} />
              </>
            </Flex>
          </Drawer>
        )}
      </DrawerStateContext.Consumer>
    )
  );
};

export default AppDrawer;
