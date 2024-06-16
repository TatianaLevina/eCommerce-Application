import type React from 'react';
import { Layout } from 'antd';

import AppHeader from '@components/AppHeader/AppHeader';
import AppFooter from '@components/AppFooter/AppFooter';
import { DrawerStateProvider } from '@contexts/DrawerStateContext';
import SidebarMenu from '@components/AppDrawer/AppDrawer';
import '@components/AppLayout/AppLayout.scss';
import type { LayoutProps } from './LayoutProps.interface';

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  const { Content } = Layout;

  return (
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
};

export default AppLayout;
