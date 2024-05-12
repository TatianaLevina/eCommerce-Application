import { Layout } from 'antd';
const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: 'center', backgroundColor: '#fff', fontSize: '16px' }}>
      Home Sweet Home © {new Date().getFullYear()} Created by CodeCrafters
    </Footer>
  );
};

export default AppFooter;
