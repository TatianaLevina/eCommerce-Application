import { Layout } from 'antd';
const { Footer } = Layout;
import '@components/AppFooter/AppFooter.scss';

const AppFooter = () => {
  return <Footer className="footer">Home Sweet Home © {new Date().getFullYear()} Created by CodeCrafters</Footer>;
};

export default AppFooter;
