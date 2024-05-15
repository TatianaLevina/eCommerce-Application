import { Avatar, Button, Drawer, Flex } from 'antd';
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

  return (
    isMobile && (
      <DrawerStateContext.Consumer>
        {(drawerState) => (
          <Drawer
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
                    <p>OR</p>
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
                  <p>OR</p>
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
              {user ? (
                <>
                  <Link
                    className={'custom-link'}
                    onClick={() => {
                      drawerState.setCollapsed(true);
                    }}
                    to="/catalog"
                  >
                    Catalog
                  </Link>
                  <Link
                    className={'custom-link'}
                    onClick={() => {
                      drawerState.setCollapsed(true);
                    }}
                    to="/about"
                  >
                    About us
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className={'custom-link'}
                    onClick={() => {
                      drawerState.setCollapsed(true);
                    }}
                    to="/catalog"
                  >
                    Catalog
                  </Link>
                  <Link
                    className={'custom-link'}
                    onClick={() => {
                      drawerState.setCollapsed(true);
                    }}
                    to="/about"
                  >
                    About us
                  </Link>
                </>
              )}
            </Flex>
          </Drawer>
        )}
      </DrawerStateContext.Consumer>
    )
  );
};

export default AppDrawer;
