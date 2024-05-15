import type React from 'react';
// import { Typography } from 'antd';
import { Carousel } from 'antd';
import IMAGES from '@/images/Images';

const HomePage: React.FC = () => {
  // const { Title } = Typography;
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <>
      <h1 className="custom-title">Welcome to our Sweet Home</h1>
      <Carousel autoplay afterChange={onChange}>
        <div>
          <img src={IMAGES.image1} className="custom-img" alt="Sweet Home" />
        </div>
        <div>
          <img src={IMAGES.image2} className="custom-img" alt="Sweet Home" />
        </div>
        <div>
          <img src={IMAGES.image3} className="custom-img" alt="Sweet Home" />
        </div>
        <div>
          <img src={IMAGES.image3} className="custom-img" alt="Sweet Home" />
        </div>
      </Carousel>
    </>
  );
};
export default HomePage;
