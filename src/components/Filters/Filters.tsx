import type React from 'react';
import { useEffect, useState } from 'react';
import { Input, Select, Button, Drawer, Typography } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

const { Option } = Select;

interface FiltersProps {
  searchText: string;
  setSearchText: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
  priceFrom: number | undefined;
  setPriceFrom: (value: number | undefined) => void;
  priceTo: number | undefined;
  setPriceTo: (value: number | undefined) => void;
  resetFilters: () => void;
  drawerOpen: boolean;
  toggleDrawer: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  searchText,
  setSearchText,
  sortOrder,
  setSortOrder,
  priceFrom,
  setPriceFrom,
  priceTo,
  setPriceTo,
  resetFilters,
  drawerOpen,
  toggleDrawer,
}) => {
  const [tempPriceFrom, setTempPriceFrom] = useState<number | undefined>(priceFrom);
  const [tempPriceTo, setTempPriceTo] = useState<number | undefined>(priceTo);

  useEffect(() => {
    setTempPriceFrom(priceFrom);
  }, [priceFrom]);

  useEffect(() => {
    setTempPriceTo(priceTo);
  }, [priceTo]);

  const debouncedSetPriceFrom = debounce((value: number | undefined) => setPriceFrom(value), 500);
  const debouncedSetPriceTo = debounce((value: number | undefined) => setPriceTo(value), 500);

  const handlePriceFromChange = (value: number | undefined) => {
    setTempPriceFrom(value);
    debouncedSetPriceFrom(value);
  };

  const handlePriceToChange = (value: number | undefined) => {
    setTempPriceTo(value);
    debouncedSetPriceTo(value);
  };

  return (
    <>
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
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div style={{ marginTop: 16 }}>
          <Typography.Text>Sort</Typography.Text>
          <Select value={sortOrder} onChange={setSortOrder} style={{ width: '100%', marginTop: 8 }}>
            <Option value="" disabled>
              Sort
            </Option>
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
              value={tempPriceFrom}
              onChange={(e) => handlePriceFromChange(parseFloat(e.target.value))}
              style={{ marginTop: 8, width: '50%' }}
            />
            <Input
              placeholder="To"
              type="number"
              min={0}
              value={tempPriceTo}
              onChange={(e) => handlePriceToChange(parseFloat(e.target.value))}
              style={{ marginTop: 8, width: '50%' }}
            />
          </div>
        </div>
        <Button type="primary" onClick={resetFilters} style={{ marginTop: 16, backgroundColor: '#2f7c69' }}>
          Reset
        </Button>
      </Drawer>
      <div className="filters-inline">
        <div className="filters-inline__row">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ flex: 1, marginRight: '16px' }}
          />
          <div style={{ flex: 1 }}>
            <Select
              placeholder="Sort"
              value={sortOrder}
              onChange={setSortOrder}
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
        <div className="filters-inline__row">
          <Typography.Text>Price</Typography.Text>
          <div className="price-inputs">
            <Input
              placeholder="From"
              type="number"
              min={0}
              value={tempPriceFrom}
              onChange={(e) => handlePriceFromChange(parseFloat(e.target.value))}
              style={{ width: '50%' }}
            />
            <Input
              placeholder="To"
              type="number"
              min={0}
              value={tempPriceTo}
              onChange={(e) => handlePriceToChange(parseFloat(e.target.value))}
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
    </>
  );
};

export default Filters;
