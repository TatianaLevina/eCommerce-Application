import type React from 'react';
import { Typography } from 'antd';
import { Carousel, Flex } from 'antd';
import IMAGES from '@/images/Images';

const HomePage: React.FC = () => {
  const { Title } = Typography;
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <>
      <Flex vertical align="center">
        <Title level={2} className="custom-title">
          Welcome to our Sweet Home
        </Title>
      </Flex>
      <Carousel autoplay afterChange={onChange}>
        <div>
          <img src={IMAGES.image1} className="carousel__img" alt="Sweet Home" />
        </div>
        <div>
          <img src={IMAGES.image2} className="carousel__img" alt="Sweet Home" />
        </div>
        <div>
          <img src={IMAGES.image3} className="carousel__img" alt="Sweet Home" />
        </div>
        <div>
          <img src={IMAGES.image3} className="carousel__img" alt="Sweet Home" />
        </div>
      </Carousel>
    </>
  );
};
export default HomePage;
