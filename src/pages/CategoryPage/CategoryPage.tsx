import type React from 'react';
import { useEffect, useState } from 'react';
import { Spin, Breadcrumb, Dropdown } from 'antd';
import { HomeOutlined, DownOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ProductProjection } from '@commercetools/platform-sdk';
import { getProductsByParamsService } from '@services/ProductsService.ts';
import { useCategory } from '@contexts/CategoriesContext.tsx';
import Filters from '@components/Filters/Filters.tsx';
import ProductCard from '@components/ProductCard/ProductCard.tsx';
import '@pages/CategoryPage/CategoryPage.scss';

const CategoryPage: React.FC = () => {
  const { categories, loading: categoryLoading } = useCategory();
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [priceFrom, setPriceFrom] = useState<number | undefined>(undefined);
  const [priceTo, setPriceTo] = useState<number | undefined>(undefined);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const categorySlug = location.pathname.split('/').pop();

  useEffect(() => {
    const fetchProducts = async () => {
      if (categories && categorySlug) {
        const category = categories.find((cat) => cat.slug['en-US'] === categorySlug);
        if (category) {
          setCategoryName(category.name['en-US']);

          let priceFilter = '';
          if (priceFrom !== undefined && priceTo !== undefined) {
            priceFilter = `variants.price.centAmount:range (${priceFrom * 100} to ${priceTo * 100})`;
          } else if (priceFrom !== undefined) {
            priceFilter = `variants.price.centAmount:range (${priceFrom * 100} to *)`;
          } else if (priceTo !== undefined) {
            priceFilter = `variants.price.centAmount:range (* to ${priceTo * 100})`;
          }

          const filters = [`categories.id:"${category.id}"`];
          if (priceFilter) {
            filters.push(priceFilter);
          }

          const response = await getProductsByParamsService({
            filter: filters,
            limit: 12, // Adjust the limit as needed
            offset: 0,
            sort: sortOrder ? [sortOrder] : [],
            fuzzy: !!searchText,
            [`text.en-US`]: searchText,
          });
          if (response) {
            setProducts(response.body.results);
          }
        }
      }
      setLoading(false);
    };

    fetchProducts();
  }, [categories, categorySlug, searchText, sortOrder, priceFrom, priceTo]);

  const formatPrice = (centAmount: number) => (centAmount / 100).toFixed(2);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(`/catalog/${key}`);
  };

  const categoriesMenuItems = categories?.map((category) => ({
    key: category.slug['en-US'],
    label: category.name['en-US'],
  }));

  const categoriesMenu = {
    items: categoriesMenuItems,
    onClick: handleMenuClick,
  };

  const breadcrumbItems = [
    {
      href: '/',
      title: <HomeOutlined />,
    },
    {
      href: '/catalog',
      title: 'Catalog',
    },
    {
      title: (
        <Dropdown menu={categoriesMenu} trigger={['click']}>
          <span>
            {categoryName} <DownOutlined />
          </span>
        </Dropdown>
      ),
    },
  ];

  if (categoryLoading || loading) {
    return <Spin spinning={categoryLoading || loading} />;
  }

  return (
    <div className="category-page">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="custom-title">{categoryName ? categoryName : 'Category Page'}</h1>
      <Filters
        searchText={searchText}
        setSearchText={setSearchText}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        priceFrom={priceFrom}
        setPriceFrom={setPriceFrom}
        priceTo={priceTo}
        setPriceTo={setPriceTo}
        resetFilters={() => {
          setSearchText('');
          setSortOrder('');
          setPriceFrom(undefined);
          setPriceTo(undefined);
        }}
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
      />
      <div className="content">
        <div className="product-cards-container">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} formatPrice={formatPrice} />)
          ) : (
            <p>No products found for this category</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
