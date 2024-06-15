import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Button, Flex } from 'antd';
import { UserOutlined, ShoppingCartOutlined, UnorderedListOutlined, MenuOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
import useMobile from '@/hooks/useMobile';
import { useDrawerState } from '@/contexts/DrawerStateContext';
import { useAuth } from '@contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import '@components/AppHeader/AppHeader.scss';
import LOGO from '../../images/logo.svg';

const AppHeader = () => {
  const { Header } = Layout;
  const {
    state: { cart },
    getCartItemCount,
  } = useCart();
  const { user, signOut } = useAuth();
  const { isCollapsed, setCollapsed } = useDrawerState();
  const isMobile = useMobile();
  const justifyOptions = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'];
  const alignOptions = ['flex-start', 'center', 'flex-end'];

  const handleLogout = (): void => {
    signOut();
  };

  return (
    <Header className="header">
      <Flex gap="small" className="flex-wrapper" justify={justifyOptions[3]} align={alignOptions[1]}>
        <Link to="/" style={{ lineHeight: '0px' }}>
          <img src={LOGO} alt="Sweet Home" />
        </Link>

        {isMobile ? (
          <Flex gap="middle" className="flex-wrapper" justify={justifyOptions[2]} align={alignOptions[1]}>
            <Link to="/profile">
              <Avatar shape="square" className={'custom-color'} icon={<UserOutlined />} />
            </Link>
            <Link to="/cart">
              <Space size="middle">
                {cart && getCartItemCount() ? (
                  <Badge count={getCartItemCount()}>
                    <Avatar shape="square" className={'custom-color'} icon={<ShoppingCartOutlined />} />
                  </Badge>
                ) : (
                  <Avatar shape="square" className={'custom-color'} icon={<ShoppingCartOutlined />} />
                )}
              </Space>
            </Link>
            <Space className="box_primary" onClick={() => setCollapsed(!isCollapsed)}>
              <MenuOutlined />
            </Space>
          </Flex>
        ) : (
          <>
            <Flex gap="small" className="flex-wrapper" justify={justifyOptions[2]} align={alignOptions[1]}>
              <Link to="/about">
                <Button className={'custom-color'} ghost>
                  About us
                </Button>
              </Link>
              <Link to="/catalog">
                <Button className={'custom-color'} ghost>
                  <UnorderedListOutlined /> Catalog
                </Button>
              </Link>
              <Link to="/cart">
                <Space size="middle">
                  {cart && getCartItemCount() ? (
                    <Badge count={getCartItemCount()}>
                      <Avatar shape="square" className={'custom-color'} icon={<ShoppingCartOutlined />} />
                    </Badge>
                  ) : (
                    <Avatar shape="square" className={'custom-color'} icon={<ShoppingCartOutlined />} />
                  )}
                </Space>
              </Link>
              {user ? (
                <>
                  <Link to="/profile">
                    <Avatar shape="square" className={'custom-color'} icon={<UserOutlined />} />
                  </Link>
                  <Button type="primary" className={'custom-color'} ghost onClick={handleLogout}>
                    Logout
                  </Button>
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
            </Flex>
          </>
        )}
      </Flex>
    </Header>
  );
};

export default AppHeader;
