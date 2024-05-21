import { Spin } from 'antd';
import { useCategory } from '@contexts/CategoriesContext.tsx';

export default function CatalogPage() {
  const { categories, loading } = useCategory();

  return (
    <div>
      <h1 className="custom-title">Catalog Page</h1>
      <Spin spinning={loading}>
        <ul>{categories?.map((category) => <li key={category.id}>{category.name['en-US']}</li>)}</ul>
      </Spin>
    </div>
  );
}
