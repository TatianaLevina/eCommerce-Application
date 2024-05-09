import type React from 'react';
import AppHeader from '../Header/Header';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <AppHeader />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
