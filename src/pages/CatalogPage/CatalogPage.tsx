import { Spin } from 'antd';
import { useCategory } from '@contexts/CategoriesContext.tsx';
import { getSingleProductService } from '@services/ProductsServise.ts';

export default function CatalogPage() {
  const { categories, loading } = useCategory();
  // f2b931a3-3ff1-4505-8fec-e67a719125b5 is a test id of a product
  console.log(getSingleProductService('f2b931a3-3ff1-4505-8fec-e67a719125b5'));
  return (
    <div>
      <h1 className="custom-title">Catalog Page</h1>
      <Spin spinning={loading}>
        <ul>{categories?.map((category) => <li key={category.id}>{category.name['en-US']}</li>)}</ul>
      </Spin>
    </div>
  );
}
