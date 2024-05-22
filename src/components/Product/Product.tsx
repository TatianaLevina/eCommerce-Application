import { Carousel, Flex, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import '@components/Product/Product.scss';
import type { Product } from '../Category/Category';

const ProductComponent: React.FC = () => {
  const { Title, Text } = Typography;
  const { state } = useLocation();
  const { payload } = state;
  const product = payload as Product;
  const { name, description, masterVariant } = product;
  const { images, prices } = masterVariant;
  const discounted = prices.find((x) => x.discounted?.value.currencyCode === 'EUR')?.discounted;

  return (
    <>
      <Flex vertical justify="center" align="center" gap={'large'}>
        <Title>{name['en-us']}</Title>
        <Carousel autoplay>
          {images.map((img, idx) => {
            return (
              <div key={idx} style={{ maxWidth: 480 }}>
                <img style={{ display: 'block', width: 320 }} src={img.url} alt={name['en-us']} />
              </div>
            );
          })}
        </Carousel>
        <Text>{description['en-us']}</Text>
        <Text>Price: {prices.find((x) => x.value.currencyCode === 'EUR')?.value.centAmount}</Text>
        <Text>{discounted ? `Discount price: ${discounted.value.centAmount}` : ''}</Text>
      </Flex>
    </>
  );
};

export default ProductComponent;
