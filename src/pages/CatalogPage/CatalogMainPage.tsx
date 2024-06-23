import type React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Spin, Flex } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useCategory } from '@contexts/CategoriesContext.tsx';
import { useBreadcrumbs } from '@contexts/BreadcrumbsContext.tsx';
import { getProductsByParamsService } from '@services/ProductsService.ts';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.tsx';
import ImageCustom from '@components/ImageCustom/ImageCustom';
import '@pages/CatalogPage/CatalogMainPage.scss';
import type { CategoryWithImage } from './CategoryWithImage.interface';

const CatalogMainPage: React.FC = () => {
  const { categories, loading } = useCategory();
  const [categoriesWithImages, setCategoriesWithImages] = useState<CategoryWithImage[]>([]);
  const navigate = useNavigate();
  const { setItems } = useBreadcrumbs();

  useEffect(() => {
    const fetchCategoryImages = async () => {
      if (categories) {
        const updatedCategories = await Promise.all(
          categories.map(async (category) => {
            const response = await getProductsByParamsService({
              filter: [`categories.id:"${category.id}"`],
              limit: 1,
              offset: 0,
              sort: ['id asc'],
            });

            const imageUrl =
              response && response.body.results.length > 0
                ? response.body.results[0].masterVariant?.images?.[0]?.url || 'default-image-url'
                : 'default-image-url';

            return {
              id: category.id,
              name: category.name['en-US'],
              slug: category.slug['en-US'],
              imageUrl,
            };
          }),
        );
        setCategoriesWithImages(updatedCategories);
      }
    };

    fetchCategoryImages();
    setItems([{ href: '/', title: <HomeOutlined /> }, { title: 'Catalog' }]);
  }, [categories, setItems]);

  const clickCardHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const el: HTMLElement = e.target as HTMLElement;
    const target: HTMLElement | null = el.closest('.category-card');

    if (target) {
      const categorySlug = target.getAttribute('data-slug');
      const category = categoriesWithImages.find((x) => x.slug === categorySlug);

      if (category) {
        navigate(`/catalog/${category.slug}`, { state: { payload: category.name } });
      }
    }
  };

  if (loading) {
    return <Spin spinning={loading} />;
  }

  return (
    <>
      <Breadcrumbs />
      <Flex vertical justify="center" align="center" gap={'large'}>
        <h1 className="custom-title">Product Categories</h1>
        <div className="flex-container" onClick={(e) => clickCardHandler(e)}>
          {categoriesWithImages.length > 0 ? (
            categoriesWithImages.map((cat) => (
              <Card
                title={cat.name}
                data-id={cat.id}
                data-slug={cat.slug}
                key={cat.id}
                bordered={false}
                className="category-card zooming"
              >
                <div className="category-card__custom-image">
                  <ImageCustom className="category-card__img" src={cat.imageUrl} alt={cat.name}></ImageCustom>
                </div>
              </Card>
            ))
          ) : (
            <p>Product categories are not available on the server</p>
          )}
        </div>
      </Flex>
    </>
  );
};

export default CatalogMainPage;
