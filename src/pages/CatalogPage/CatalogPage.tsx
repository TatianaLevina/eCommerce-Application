import { Route, Routes } from 'react-router-dom';
import CatalogMain from '@components/CatalogMain/CatalogMain';
import Category from '@/components/Category/Category';
import ProductComponent from '@/components/Product/Product';

const CatalogPage: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CatalogMain />} />
        <Route path="/chairs" element={<Category />} />
        <Route path="/tables" element={<Category />} />
        <Route path="/product/*" element={<ProductComponent />} />
      </Routes>
    </>
  );
};

export default CatalogPage;
