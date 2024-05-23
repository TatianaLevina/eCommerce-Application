import { Card, Cascader, Flex, Input, Pagination, Select, Typography } from 'antd';
import type { CascaderProps } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { useLocation, useNavigate } from 'react-router-dom';
import '@components/Category/Category.scss';

const { Search } = Input;

const checkedCurrency: string = 'EUR';

interface Option {
  value: string;
  label: string;
}

// Server response type
type Products = {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Product[];
};

export type Product = {
  id: string;
  name: {
    'en-us': string;
  };
  description: {
    'en-us': string;
  };
  masterVariant: {
    images: ImadeInfo[];
    prices: PriceInfo[];
  };
};
export type ImadeInfo = {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
};

export type PriceInfo = {
  id: string;
  value: PriceValue;
  country: string;
  discounted?: {
    value: PriceValue;
    discount: {
      typeId: string;
      id: string;
    };
  };
};

export type PriceValue = {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
};

// object to request
type RequestObject = {
  sortFieldName: string | null;
  filterProductProperties: string[];
  serchProduct: string | null;
  sortDirection: 'asc' | 'desc';
};

//! FOR DEV MOCK OBJECT
const products: Products = {
  limit: 4,
  offset: 0,
  count: 4,
  total: 14,
  results: [
    {
      id: '1',
      name: {
        'en-us': 'Rumi Chair',
      },
      description: {
        'en-us':
          'A lilac velvet chair with a brass frame is an elegant and luxurious piece of furniture. The soft, plush velvet material of the chair provides a comfortable and cozy seating experience. The lilac color of the velvet fabric is soft and delicate, adding a touch of femininity to the overall look of the chair.  The brass frame of the chair is sturdy and durable, providing a solid foundation for the seating area. The brass color of the frame adds a touch of warmth and sophistication to the overall look of the chair. The combination of the lilac velvet and brass frame creates a striking contrast, making this chair a statement piece in any room.  The chair features a high backrest with a curved design, providing support for the back and shoulders. The chair is designed for both style and comfort, making it a great addition to any living room, bedroom, or office space.',
      },
      masterVariant: {
        images: [
          {
            url: 'https://www.officewarehouse.com.ph/__resources/_web_data_/products/products/images/6299.jpg',
            dimensions: {
              w: 2400,
              h: 3200,
            },
          },
          {
            url: 'https://www.flexlux.com/admin/public/getimage.ashx?Image=/Files/Images/mood/Design_Scopello_frontpage.jpg&Width=640&Height=480&Format=jpg&Quality=75&Crop=0',
            dimensions: {
              w: 2400,
              h: 3200,
            },
          },
        ],
        prices: [
          {
            id: 'f06682e0-88e4-4bf0-af16-ceaeaccd5b60',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 12999,
              fractionDigits: 2,
            },
            country: 'string',
            discounted: {
              value: {
                type: 'centPrecision',
                currencyCode: 'EUR',
                centAmount: 11049,
                fractionDigits: 2,
              },
              discount: {
                typeId: 'string',
                id: 'string',
              },
            },
          },
        ],
      },
    },
    {
      id: '2',
      name: {
        'en-us': 'Braided Rug',
      },
      description: {
        'en-us':
          'A lilac velvet chair with a brass frame is an elegant and luxurious piece of furniture. The soft, plush velvet material of the chair provides a comfortable and cozy seating experience. The lilac color of the velvet fabric is soft and delicate, adding a touch of femininity to the overall look of the chair.  The brass frame of the chair is sturdy and durable, providing a solid foundation for the seating area. The brass color of the frame adds a touch of warmth and sophistication to the overall look of the chair. The combination of the lilac velvet and brass frame creates a striking contrast, making this chair a statement piece in any room.  The chair features a high backrest with a curved design, providing support for the back and shoulders. The chair is designed for both style and comfort, making it a great addition to any living room, bedroom, or office space.',
      },
      masterVariant: {
        images: [
          {
            url: 'https://i.pinimg.com/736x/dc/c9/82/dcc98280bb73470a5d536d5825e81c5e.jpg',
            dimensions: {
              w: 2400,
              h: 3200,
            },
          },
          {
            url: 'https://i.etsystatic.com/5798104/r/il/3194c3/305063826/il_fullxfull.305063826.jpg',
            dimensions: {
              w: 2400,
              h: 3200,
            },
          },
          {
            url: 'https://dreamnewengland.wordpress.com/wp-content/uploads/2016/08/img_8875.jpg?w=640',
            dimensions: {
              w: 2400,
              h: 3200,
            },
          },
        ],
        prices: [
          {
            id: 'f06682e0-88e4-4bf0-af16-ceaeaccd5b60',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 9999,
              fractionDigits: 2,
            },
            country: 'string',
          },
        ],
      },
    },
    {
      id: '3',
      name: {
        'en-us': 'Modern Landscape Painting',
      },
      description: {
        'en-us':
          'A lilac velvet chair with a brass frame is an elegant and luxurious piece of furniture. The soft, plush velvet material of the chair provides a comfortable and cozy seating experience. The lilac color of the velvet fabric is soft and delicate, adding a touch of femininity to the overall look of the chair.  The brass frame of the chair is sturdy and durable, providing a solid foundation for the seating area. The brass color of the frame adds a touch of warmth and sophistication to the overall look of the chair. The combination of the lilac velvet and brass frame creates a striking contrast, making this chair a statement piece in any room.  The chair features a high backrest with a curved design, providing support for the back and shoulders. The chair is designed for both style and comfort, making it a great addition to any living room, bedroom, or office space.',
      },
      masterVariant: {
        images: [
          {
            url: 'https://i.ytimg.com/vi/Kjmwng8bYrM/sddefault.jpg',
            dimensions: {
              w: 5313,
              h: 5355,
            },
          },
          {
            url: 'https://static.wixstatic.com/media/bb7129_ef24642844574f19995a9d5c648f36ba~mv2.jpg/v1/fill/w_640,h_480,fp_0.32_0.31,q_80,usm_0.66_1.00_0.01,enc_auto/bb7129_ef24642844574f19995a9d5c648f36ba~mv2.jpg',
            dimensions: {
              w: 5313,
              h: 5355,
            },
          },
          {
            url: 'https://i.pinimg.com/736x/68/05/f3/6805f3f5133ec8636003da27d2809c54.jpg',
            dimensions: {
              w: 5313,
              h: 5355,
            },
          },
        ],
        prices: [
          {
            id: 'f06682e0-88e4-4bf0-af16-ceaeaccd5b60',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 5299,
              fractionDigits: 2,
            },
            country: 'string',
          },
        ],
      },
    },
    {
      id: '4',
      name: {
        'en-us': 'Cocktail Stirring Spoon',
      },
      description: {
        'en-us':
          'A lilac velvet chair with a brass frame is an elegant and luxurious piece of furniture. The soft, plush velvet material of the chair provides a comfortable and cozy seating experience. The lilac color of the velvet fabric is soft and delicate, adding a touch of femininity to the overall look of the chair.  The brass frame of the chair is sturdy and durable, providing a solid foundation for the seating area. The brass color of the frame adds a touch of warmth and sophistication to the overall look of the chair. The combination of the lilac velvet and brass frame creates a striking contrast, making this chair a statement piece in any room.  The chair features a high backrest with a curved design, providing support for the back and shoulders. The chair is designed for both style and comfort, making it a great addition to any living room, bedroom, or office space.',
      },
      masterVariant: {
        images: [
          {
            url: 'https://static.baza.farpost.ru/v/1527487322960_bulletin',
            dimensions: {
              w: 5757,
              h: 4555,
            },
          },
          {
            url: 'https://www.bartender.com.ua/wp-content/uploads/2015/11/barspoons.jpg',
            dimensions: {
              w: 5757,
              h: 4555,
            },
          },
          {
            url: 'https://fhd.multiurok.ru/b/7/4/b74fdddf137f7f11789ad7febe558044f69591b7/img20.jpg',
            dimensions: {
              w: 5757,
              h: 4555,
            },
          },
        ],
        prices: [
          {
            id: 'f06682e0-88e4-4bf0-af16-ceaeaccd5b60',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 199,
              fractionDigits: 2,
            },
            country: 'string',
          },
        ],
      },
    },
  ],
};

//! temp options MOCK
const filterOptions: Option[] = [
  {
    value: 'metal',
    label: 'Metal',
  },
  { value: 'wood', label: 'Wood' },
  { value: 'stone', label: 'Stone' },
  { value: 'cloth', label: 'Cloth' },
];

//! temp options MOCK
const sortOptions: Option[] = [
  {
    value: 'name',
    label: 'Name',
  },
  { value: 'price', label: 'Price' },
];

//! object with search, sort and filter keys
const sortFilterSerchObject: RequestObject = {
  sortFieldName: null,
  filterProductProperties: [],
  serchProduct: null,
  sortDirection: 'asc',
};

const Category: React.FC = () => {
  const { Title } = Typography;
  const { state } = useLocation();
  const { payload } = state;
  const navigate = useNavigate();

  const changePageHandler = (page: number) => {
    // TODO: Add change page logic by page number
    console.log('I change page to ', page);
  };

  const onChangeFilter: CascaderProps<Option, 'value', true>['onChange'] = (value) => {
    sortFilterSerchObject.filterProductProperties = value.flat();
    sendRequestToServer(sortFilterSerchObject);
  };

  const onChangeSort: CascaderProps<Option>['onChange'] = (value) => {
    sortFilterSerchObject.sortFieldName = value[0];
    sendRequestToServer(sortFilterSerchObject);
  };

  const onSearch: SearchProps['onSearch'] = (value) => {
    sortFilterSerchObject.serchProduct = value ? value : null;
    sendRequestToServer(sortFilterSerchObject);
  };

  const onChangeSortDirection = (value: string) => {
    if (value === 'asc' || value === 'desc') {
      sortFilterSerchObject.sortDirection = value;
      sendRequestToServer(sortFilterSerchObject);
    }
  };

  const sendRequestToServer = (requestObject: RequestObject) => {
    // TODO: Send request to the server with sorting, searching and filtering parameters to obtain a list of products
    console.log(requestObject);
  };

  const clickCardHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const el: HTMLElement = e.target as HTMLElement;
    const target: HTMLElement | null = el.closest('.product-card');

    if (target) {
      products.results.forEach((x) => {
        if (x.id === target.id) {
          //? Navigate to concrete product and send product model to component
          navigate(`/catalog/product/${x.id}`, { state: { payload: x } });
        }
      });
    }
  };

  return (
    <>
      <Flex vertical justify="center" align="center" gap={'large'}>
        <Title>{payload}</Title>
        <Flex wrap>
          <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
          <Cascader
            className="filter"
            style={{ width: 200 }}
            options={filterOptions}
            onChange={onChangeFilter}
            multiple
            maxTagCount="responsive"
            showCheckedStrategy={'SHOW_CHILD'}
            placeholder="Select filter parameter"
          />
          <Cascader
            className="sort"
            style={{ width: 200 }}
            options={sortOptions}
            onChange={onChangeSort}
            placeholder="Select sort parameter"
          />
          <Select
            className="sort-direction"
            defaultValue="ASC"
            style={{ width: 120 }}
            onChange={onChangeSortDirection}
            options={[
              { value: 'asc', label: 'ASC' },
              { value: 'desc', label: 'DESC' },
            ]}
          />
        </Flex>

        <Flex onClick={(e) => clickCardHandler(e)} wrap justify="center" align="center" gap={'middle'}>
          {products.results.map((product) => {
            const price = product.masterVariant.prices.find((x) => x.value.currencyCode === checkedCurrency);
            return (
              <Card
                style={{ width: 240 }}
                styles={{ body: { padding: 0 } }}
                key={product.id}
                title={product.name['en-us']}
                id={product.id}
                bordered={false}
                className="product-card"
              >
                <div className="product-card__custom-image">
                  <img alt="example" width="100%" src={product.masterVariant.images[0].url} />
                </div>
                <div className="product-card__custom-card">
                  <p className="product-card__price">
                    Price: {price?.value.centAmount} {price?.value.currencyCode}
                  </p>
                  <p className="product-card__price_discounted">
                    {price?.discounted
                      ? `Discounted price: ${price?.discounted?.value.centAmount} ${price?.discounted?.value.currencyCode}`
                      : ''}
                  </p>
                </div>
              </Card>
            );
          })}
        </Flex>
        <Pagination
          className="pagination"
          onChange={(p) => changePageHandler(p)}
          total={products.total}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          pageSize={products.limit}
          defaultCurrent={1}
        />
      </Flex>
    </>
  );
};

export default Category;
