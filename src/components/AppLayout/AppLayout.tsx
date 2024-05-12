import type React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';
import { Layout } from 'antd';
import { SidebarMenuStateProvider } from '@/contexts/SidebarMenuStateContext';
import SidebarMenu from '../Sidebar/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}
const { Content } = Layout;

const AppLayout: React.FC<LayoutProps> = ({ children }) => (
  <SidebarMenuStateProvider>
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
  </SidebarMenuStateProvider>
);

export default AppLayout;
