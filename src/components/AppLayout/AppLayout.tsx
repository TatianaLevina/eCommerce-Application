import type React from 'react';
import AppHeader from '@components/AppHeader/AppHeader';
import AppFooter from '@components/AppFooter/AppFooter';
import { Layout } from 'antd';
import { DrawerStateProvider } from '@contexts/DrawerStateContext';
import SidebarMenu from '@components/AppDrawer/AppDrawer';
import '@components/AppLayout/AppLayout.scss';

interface LayoutProps {
  children: React.ReactNode;
}
const { Content } = Layout;

const AppLayout: React.FC<LayoutProps> = ({ children }) => (
  <DrawerStateProvider>
    <Layout className="layout">
      <AppHeader />
      <main>
        <Layout
          style={{
            background: 'none',
          }}
        >
          <Content className="layout__content">
            <div className="layout__wrapper">{children}</div>
          </Content>
          <SidebarMenu />
        </Layout>
      </main>
      <AppFooter />
    </Layout>
  </DrawerStateProvider>
);

export default AppLayout;
