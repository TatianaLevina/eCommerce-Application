import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from 'antd';
import { Button, Flex } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
// import { Input } from 'antd';
// import type { SearchProps } from 'antd/es/input/Search';
import LOGO from '../../images/logo.svg';
import useMobile from '@/hooks/useMobile';
import { useSidebarMenuState } from '@/contexts/SidebarMenuStateContext';

const { Header } = Layout;
// const { Search } = Input;

const AppHeader = () => {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
  };

  const { isCollapsed, setCollapsed } = useSidebarMenuState();

  const isMobile = useMobile();
  const justifyOptions = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'];

  const alignOptions = ['flex-start', 'center', 'flex-end'];

  // const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  return (
    <Header style={{ height: '100px', display: 'flex', background: '#fff' }}>
      <Flex gap="small" style={{ width: '100%' }} justify={justifyOptions[3]} align={alignOptions[1]}>
        <Link to="/" style={{ lineHeight: '0px' }}>
          <img src={LOGO} alt="Sweet Home" />
        </Link>
        <Link to="/" style={{ lineHeight: '0px' }}></Link>

        {isMobile ? (
          <Button
            type="text"
            icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!isCollapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        ) : (
          <>
            {/* <Search size="middle" placeholder="Product search" onSearch={onSearch} /> */}
            <Flex gap="small" style={{ width: '100%' }} justify={justifyOptions[2]} align={alignOptions[1]}>
              <Link to="/about">
                <Button className={'custom-color'} ghost>
                  About us
                </Button>
              </Link>
              <Link to="/">
                <Button className={'custom-color'} ghost>
                  <UnorderedListOutlined /> Products
                </Button>
              </Link>
              <Link to="/cart">
                <Space size="middle">
                  <Badge count={5}>
                    <Avatar shape="square" className={'custom-color'} icon={<ShoppingCartOutlined />} />
                  </Badge>
                </Space>
              </Link>
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
            </Flex>
          </>
        )}
      </Flex>
    </Header>
  );
};

export default AppHeader;
