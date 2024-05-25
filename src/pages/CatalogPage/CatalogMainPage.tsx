// import { Spin } from 'antd';
// import { useCategory } from '@contexts/CategoriesContext.tsx';
// import { getProductsByParamsService, getSingleProductService } from '@services/ProductsService.ts';
//
// export default function CatalogPage() {
//   const { categories, loading } = useCategory();
//
//   // f2b931a3-3ff1-4505-8fec-e67a719125b5 is a test id of a product
//
//   getSingleProductService('f2b931a3-3ff1-4505-8fec-e67a719125b5').then((response) =>
//     console.log('getSingleProductService test response', response),
//   );
//
//   // getAllProductsService().then((response) => console.log('getAllProductsService test response', response));
//
//   // Test getProductsByParamsService with queryArgs
//   const queryArgs = {
//     // staged: false,
//     fuzzy: true,
//     'text.en-US': 'Pillow', // Search
//     filter: [
//       'variants.price.centAmount:range (1 to 20000)', // Price range in cents
//       // 'categories.id:"969382e3-fe66-4a64-a571-584d291cc196"', // Category id
//       // 'variants.attributes.color:"red","blue"',
//       // 'variants.attributes.material:"wood","metal"',
//     ],
//     sort: ['name.en-us desc'], // Sort by name in ascending(A->W)/descending(W->A) order (asc/desc)
//     offset: 0,
//     limit: 8, // Adjust the limit as needed
//   };
//
//   getProductsByParamsService(queryArgs)
//     .then((response) => {
//       console.log('getProductsByParamsService test response:', response);
//     })
//     .catch((error) => {
//       console.error('getProductsByParamsService test error', error);
//     });
//
//   return (
//     <div>
//       <h1 className="custom-title">Catalog Page</h1>
//       <Spin spinning={loading}>
//         <ul>{categories?.map((category) => <li key={category.id}>{category.name['en-US']}</li>)}</ul>
//       </Spin>
//     </div>
//   );
// }

import type React from 'react';
import { useEffect, useState } from 'react';
import { Card, Typography, Spin, Breadcrumb, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCategory } from '@contexts/CategoriesContext.tsx';
import { getProductsByParamsService } from '@services/ProductsService.ts';
import '@pages/CatalogPage/CatalogMainPage.scss';
import { HomeOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface CategoryWithImage {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
}

const CatalogMainPage: React.FC = () => {
  const { categories, loading } = useCategory();
  const [categoriesWithImages, setCategoriesWithImages] = useState<CategoryWithImage[]>([]);
  const navigate = useNavigate();

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
  }, [categories]);

  const clickCardHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
      <Flex vertical justify="center" align="center" gap={'large'}>
        <Breadcrumb
          items={[
            {
              href: '/',
              title: <HomeOutlined />,
            },
            {
              title: 'Catalog',
            },
          ]}
        />
        <h1 className="custom-title">Catalog</h1>
        <Text className="custom-text">Product Categories</Text>
        <div className="flex-container" onClick={(e) => clickCardHandler(e)}>
          {categoriesWithImages.length > 0 ? (
            categoriesWithImages.map((cat) => (
              <Card
                style={{ width: 200 }}
                title={cat.name}
                data-id={cat.id}
                data-slug={cat.slug}
                key={cat.id}
                bordered={false}
                className="category-card"
              >
                <div className="category-card__custom-image">
                  <img src={cat.imageUrl} alt={cat.name} />
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
