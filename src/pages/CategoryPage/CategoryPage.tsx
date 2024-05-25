import type React from 'react';
import { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import { useLocation } from 'react-router-dom';
import { getProductsByParamsService } from '@services/ProductsService.ts';
import { useCategory } from '@contexts/CategoriesContext.tsx';
import type { ProductProjection } from '@commercetools/platform-sdk';
import '@pages/CategoryPage/CategoryPage.scss';

// interface ProductCard {
//   id: string;
//   name: Record<string, string>;
//   masterVariant: {
//     prices: Array<{
//       value: {
//         currencyCode: string;
//         centAmount: number;
//       };
//       discounted?: {
//         value: {
//           currencyCode: string;
//           centAmount: number;
//         };
//       };
//     }>;
//     images?: Array<{
//       url: string;
//     }>;
//   };
// }

const CategoryPage: React.FC = () => {
  const { categories, loading: categoryLoading } = useCategory();
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const location = useLocation();
  const categorySlug = location.pathname.split('/').pop();

  useEffect(() => {
    const fetchProducts = async () => {
      if (categories && categorySlug) {
        const category = categories.find((cat) => cat.slug['en-US'] === categorySlug);
        if (category) {
          setCategoryName(category.name['en-US']);
          const response = await getProductsByParamsService({
            filter: [`categories.id:"${category.id}"`],
            limit: 100, // Adjust the limit as needed
            offset: 0,
            sort: ['name.en-US asc'],
          });
          if (response) {
            setProducts(response.body.results);
          }
        }
      }
      setLoading(false);
    };

    fetchProducts();
  }, [categories, categorySlug]);

  const formatPrice = (centAmount: number) => (centAmount / 100).toFixed(2);

  if (categoryLoading || loading) {
    return <Spin spinning={categoryLoading || loading} />;
  }

  return (
    <div>
      <h1 className="custom-title">{categoryName ? categoryName : 'Category Page'}</h1>
      <div className="product-cards-container">
        {products.length > 0 ? (
          products.map((product) => {
            const price = product.masterVariant.prices?.find((x) => x.value.currencyCode === 'USD'); // Adjust currency as needed
            const discountedPrice = price?.discounted?.value.centAmount;
            const imageUrl = product.masterVariant.images?.[0]?.url || 'default-image-url'; // Use default image if none are available

            return (
              <Card key={product.id} title={product.name['en-US']} bordered={false} className="product-card">
                <div className="product-card__custom-image">
                  <img src={imageUrl} alt={product.name['en-US']} />
                </div>
                <div className="product-card__details">
                  <p className={`product-card__price ${discountedPrice ? 'product-card__price_discounted' : ''}`}>
                    Price: {formatPrice(price?.value.centAmount || 0)} {price?.value.currencyCode}
                  </p>
                  {discountedPrice && (
                    <p className="product-card__price">
                      Discounted price: {formatPrice(discountedPrice)} {price?.discounted?.value.currencyCode}
                    </p>
                  )}
                </div>
              </Card>
            );
          })
        ) : (
          <p>No products found for this category</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
