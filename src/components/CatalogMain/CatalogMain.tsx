import { Card, Flex, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import '@components/CatalogMain/CatalogMain.scss';

type Category = {
  id: string;
  category: string;
  url: string;
};

const categories: Category[] = [
  {
    id: '1',
    category: 'Chairs',
    url: 'https://www.at-home.co.in/cdn/shop/products/FIACCARLESONSFACBW.jpg?v=1653041232',
  },
  {
    id: '2',
    category: 'Tables',
    url: 'https://habitt.com/cdn/shop/files/2_2_51e1b37c-8035-4abd-8e93-331f145525f5.jpg?v=1697278017',
  },
];

const CatalogMain: React.FC = () => {
  const { Title, Text } = Typography;
  const navigate = useNavigate();

  const clickCardHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const el: HTMLElement = e.target as HTMLElement;
    const target: HTMLElement | null = el.closest('.category-card');

    if (target) {
      categories.forEach((x) => {
        if (x.id === target.id) {
          //? Navigate to concrete category and send category name as payload
          navigate(`/catalog/${x.category.toLowerCase()}`, { state: { payload: x.category } });
        }
      });
    }
  };

  return (
    <>
      <Flex vertical justify="center" align="center" gap={'large'}>
        <Title>Catalog</Title>
        <Text>Select product category</Text>
        <Flex onClick={(e) => clickCardHandler(e)} wrap justify="center" align="center" gap={'middle'}>
          {categories.length === 0 ? (
            <Text>Product categories are not available on the server</Text>
          ) : (
            categories.map((cat) => {
              return (
                <Card
                  style={{ width: 240 }}
                  title={cat.category}
                  id={cat.id}
                  key={cat.id}
                  bordered={false}
                  className="category-card"
                >
                  <div className="category-card__custom-image">
                    <img src={cat.url} alt="" />
                  </div>
                </Card>
              );
            })
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default CatalogMain;
