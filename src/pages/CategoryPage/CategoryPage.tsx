import type React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { Card, Spin, Typography, Input, Select, Button, Drawer } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { getProductsByParamsService } from '@services/ProductsService.ts';
import { useCategory } from '@contexts/CategoriesContext.tsx';
import type { ProductProjection } from '@commercetools/platform-sdk';
import { debounce } from 'lodash';
import '@pages/CategoryPage/CategoryPage.scss';

const { Title } = Typography;
const { Option } = Select;

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

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  const resetFilters = () => {
    setSearchText('');
    setSortOrder('');
    setPriceFrom(undefined);
    setPriceTo(undefined);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const debouncedSetPriceFrom = useCallback(
    debounce((value: number | undefined) => setPriceFrom(value), 500),
    [],
  );

  const debouncedSetPriceTo = useCallback(
    debounce((value: number | undefined) => setPriceTo(value), 500),
    [],
  );

  if (categoryLoading || loading) {
    return <Spin spinning={categoryLoading || loading} />;
  }

  return (
    <div className="category-page">
      <div className="filters-toggle">
        <Button type="primary" shape="circle" className="filters-toggle__button" onClick={toggleDrawer}>
          <SearchOutlined className="custom-search-icon" />
        </Button>
      </div>
      <Drawer
        title="Filters"
        placement="left"
        closable={true}
        onClose={toggleDrawer}
        open={drawerOpen}
        closeIcon={<CloseOutlined style={{ color: '#2f7c69' }} />}
      >
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div style={{ marginTop: 16 }}>
          <Typography.Text>Sort</Typography.Text>
          <Select value={sortOrder} onChange={handleSortChange} style={{ width: '100%', marginTop: 8 }}>
            <Option value="name.en-US asc">Name (A-Z)</Option>
            <Option value="name.en-US desc">Name (Z-A)</Option>
            <Option value="price asc">Price (Low-High)</Option>
            <Option value="price desc">Price (High-Low)</Option>
          </Select>
        </div>
        <div style={{ marginTop: 16 }}>
          <Typography.Text>Price</Typography.Text>
          <div className="price-inputs">
            <Input
              placeholder="From"
              type="number"
              min={0}
              value={priceFrom}
              onChange={(e) => debouncedSetPriceFrom(parseFloat(e.target.value))}
              style={{ marginTop: 8, width: '50%' }}
            />
            <Input
              placeholder="To"
              type="number"
              min={0}
              value={priceTo}
              onChange={(e) => debouncedSetPriceTo(parseFloat(e.target.value))}
              style={{ marginTop: 8, width: '50%' }}
            />
          </div>
        </div>
        <Button type="primary" onClick={resetFilters} style={{ marginTop: 16, backgroundColor: '#2f7c69' }}>
          Reset
        </Button>
      </Drawer>
      <div className="content">
        <Title className="custom-title">{categoryName ? categoryName : 'Category Page'}</Title>
        <div className="filters-inline">
          <div className="filters-inline__row">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ flex: 1, marginRight: '16px' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ flex: 1 }}>
                <Select
                  placeholder="Sort"
                  value={sortOrder}
                  onChange={handleSortChange}
                  style={{ width: '100%', marginTop: '8px' }}
                >
                  <Option value="" disabled>
                    Sort
                  </Option>
                  <Option value="name.en-US asc">Name (A-Z)</Option>
                  <Option value="name.en-US desc">Name (Z-A)</Option>
                  <Option value="price asc">Price (Low-High)</Option>
                  <Option value="price desc">Price (High-Low)</Option>
                </Select>
              </div>
            </div>
          </div>
          <div className="filters-inline__row">
            <Typography.Text>Price</Typography.Text>
            <div className="price-inputs">
              <Input
                placeholder="From"
                type="number"
                min={0}
                value={priceFrom}
                onChange={(e) => debouncedSetPriceFrom(parseFloat(e.target.value))}
                style={{ width: '50%' }}
              />
              <Input
                placeholder="To"
                type="number"
                min={0}
                value={priceTo}
                onChange={(e) => debouncedSetPriceTo(parseFloat(e.target.value))}
                style={{ width: '50%' }}
              />
            </div>
          </div>
          <Button
            type="primary"
            onClick={resetFilters}
            style={{ marginTop: '16px', backgroundColor: '#2f7c69', width: '100px' }}
          >
            Reset
          </Button>
        </div>
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
    </div>
  );
};

export default CategoryPage;
