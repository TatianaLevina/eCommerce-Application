import type React from 'react';
import AppHeader from '@components/AppHeader/AppHeader';
import AppFooter from '@components/AppFooter/AppFooter';
import { Layout } from 'antd';
import { DrawerStateProvider } from '@contexts/DrawerStateContext';
import SidebarMenu from '@components/AppDrawer/AppDrawer';

interface LayoutProps {
  children: React.ReactNode;
}
const { Content } = Layout;

const AppLayout: React.FC<LayoutProps> = ({ children }) => (
  <DrawerStateProvider>
    <Layout
      style={{
        background: 'none',
      }}
    >
      <AppHeader />
      <main>
        <Layout
          style={{
            background: 'none',
          }}
        >
          <Content style={{ padding: '0 48px', background: 'none', minHeight: 500 }}>
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.05)',
                minHeight: '70vh',
                padding: 24,
                borderRadius: '10px',
              }}
            >
              {children}
            </div>
          </Content>
          <SidebarMenu />
        </Layout>
      </main>
      <AppFooter />
    </Layout>
  </DrawerStateProvider>
);

export default AppLayout;
