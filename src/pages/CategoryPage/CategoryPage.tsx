import type React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spin, Pagination } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import type { ProductProjection } from '@commercetools/platform-sdk';
import { getProductsByParamsService } from '@services/ProductsService.ts';
import { useCategory } from '@contexts/CategoriesContext.tsx';
import { useBreadcrumbs } from '@contexts/BreadcrumbsContext.tsx';
import Filters from '@components/Filters/Filters.tsx';
import ProductCard from '@components/ProductCard/ProductCard.tsx';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.tsx';
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();
  const categorySlug = location.pathname.split('/').pop() || '';
  const { setItems } = useBreadcrumbs();

  // Number of items per page
  const itemsPerPage = () => {
    if (window.innerWidth > 1200) {
      return 8;
    }

    switch (true) {
      case window.innerWidth > 1200:
        return 8;
      case window.innerWidth <= 1200 && window.innerWidth > 591:
        return 6;
      case window.innerWidth <= 591:
        return 4;
      default:
        return 8;
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page') || '1', 10);
    setCurrentPage(page);
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async (page: number) => {
      if (categories && categorySlug) {
        const category = categories.find((cat) => cat.slug['en-US'] === categorySlug);
        if (category) {
          setCategoryName(category.name['en-US']);
          setItems([
            { href: '/', title: <HomeOutlined /> },
            { href: '/catalog', title: 'Catalog' },
            {
              title: category.name['en-US'],
              menu: true,
            },
          ]);

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
            limit: itemsPerPage(),
            offset: (page - 1) * itemsPerPage(),
            sort: sortOrder ? [sortOrder] : [],
            fuzzy: !!searchText,
            [`text.en-US`]: searchText,
          });

          if (response) {
            setProducts(response.body.results);
            setTotal(response.body.total || 0);
          }
        }
      }
      setLoading(false);
    };

    fetchProducts(currentPage);
  }, [categories, categorySlug, searchText, sortOrder, priceFrom, priceTo, currentPage, setItems]);

  const handlePageChange = (page: number) => {
    navigate(`${location.pathname}?page=${page}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const formatPrice = (centAmount: number) => (centAmount / 100).toFixed(2);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  if (categoryLoading || loading) {
    return <Spin spinning={categoryLoading || loading} />;
  }

  return (
    <div className="category-page">
      <Breadcrumbs />
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
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categorySlug={categorySlug} // Pass category slug to ProductCard
                formatPrice={formatPrice}
              />
            ))
          ) : (
            <p>No products found for this category</p>
          )}
        </div>
        <div className="pagination-container">
          <Pagination current={currentPage} pageSize={itemsPerPage()} total={total} onChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
