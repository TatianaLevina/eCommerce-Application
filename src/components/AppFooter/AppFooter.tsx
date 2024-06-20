import { Layout } from 'antd';

import '@components/AppFooter/AppFooter.scss';

const AppFooter = () => {
  const { Footer } = Layout;
  return <Footer className="footer">Home Sweet Home © {new Date().getFullYear()} Created by CodeCrafters</Footer>;
};

export default AppFooter;
