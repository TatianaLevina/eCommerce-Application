import { Link } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { Layout } from 'antd';
import { Button, Flex } from 'antd';
import { UserOutlined, ShoppingCartOutlined, UnorderedListOutlined, MenuOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
// import { Input } from 'antd';
// import type { SearchProps } from 'antd/es/input/Search';
import LOGO from '../../images/logo.svg';
import useMobile from '@/hooks/useMobile';
import { useDrawerState } from '@/contexts/DrawerStateContext';

const { Header } = Layout;
// const { Search } = Input;

const AppHeader = () => {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
  };

  const { isCollapsed, setCollapsed } = useDrawerState();

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

        {isMobile ? (
          <Flex gap="middle" style={{ width: '100%' }} justify={justifyOptions[2]} align={alignOptions[1]}>
            <Link to="/profile">
              <Avatar shape="square" className={'custom-color'} icon={<UserOutlined />} />
            </Link>
            <Link to="/cart">
              <Space size="middle">
                <Badge count={5}>
                  <Avatar shape="square" className={'custom-color'} icon={<ShoppingCartOutlined />} />
                </Badge>
              </Space>
            </Link>
            <Space className={'box_primary'} onClick={() => setCollapsed(!isCollapsed)}>
              {' '}
              <MenuOutlined />{' '}
            </Space>
            {/* <Button
              type="text"
              icon={isCollapsed ? <MenuOutlined /> : <MenuOutlined />}
              onClick={() => setCollapsed(!isCollapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            /> */}
          </Flex>
        ) : (
          <>
            {/* <Search size="middle" placeholder="Product search" onSearch={onSearch} /> */}
            <Flex gap="small" style={{ width: '100%' }} justify={justifyOptions[2]} align={alignOptions[1]}>
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
