import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from 'antd';
import { Button, Flex } from 'antd';
import { UserOutlined, ShoppingCartOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space, Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import LOGO from '../../images/logo.svg';

const { Header } = Layout;
const { Search } = Input;

const AppHeader = () => {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
  };
  const justifyOptions = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'];

  const alignOptions = ['flex-start', 'center', 'flex-end'];

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
  return (
    <Header style={{ height: '100px', display: 'flex', background: '#fff' }}>
      <Flex gap="middle" style={{ width: '100%' }} justify={justifyOptions[3]} align={alignOptions[1]}>
        <Link to="/" style={{ lineHeight: '0px' }}>
          <img src={LOGO} alt="Sweet Home" />
        </Link>

        <Search size="large" placeholder="Product search" onSearch={onSearch} />
        {/* <Menu mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1, minWidth: 0 }}>
          <Menu.Item>
            <Link to="/about">About</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/">
              <Flex gap="small">
                <UnorderedListOutlined /> Products
              </Flex>
            </Link>
          </Menu.Item>
        </Menu> */}
        <Flex gap="middle" style={{ width: '100%' }} justify={justifyOptions[2]} align={alignOptions[1]}>
          <Link to="/cart">
            <Button size="large" className={'custom-color'} ghost>
              <UnorderedListOutlined /> Products
            </Button>
          </Link>
          <Link to="/">
            <Space size="middle">
              <Badge count={5}>
                <Avatar shape="square" size="large" className={'custom-color'} icon={<ShoppingCartOutlined />} />
              </Badge>
            </Space>
          </Link>
          {user ? (
            <>
              <Link to="/profile">
                <Avatar shape="square" size="large" className={'custom-color'} icon={<UserOutlined />} />
              </Link>
              <Button type="primary" size="large" className={'custom-color'} ghost onClick={handleLogout}>
                Logout
              </Button>{' '}
              {/* Logout button */}
            </>
          ) : (
            <>
              <Link to="/login">
                <Button size="large" className={'custom-color'} ghost>
                  Sign in
                </Button>
              </Link>

              <Link to="/register">
                <Button size="large" className={'custom-color'} ghost>
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </Header>
  );
};

export default AppHeader;
