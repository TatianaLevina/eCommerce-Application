import type React from 'react';
import type { DiscountCode } from '@commercetools/platform-sdk';
import { Carousel } from 'antd';
import DiscountBanner from '@/components/DiscountBanner/DiscountBanner';
import { useDiscounts } from '@/contexts/DiscountsContext';
import IMAGES from '@/images/Images';
import './HomePage.scss';

const HomePage: React.FC = () => {
  const { discountCodes } = useDiscounts();

  return (
    <>
      <h1 className="custom-title">Welcome to our Sweet Home</h1>
      <Carousel className="home-page__carousel" draggable autoplay>
        {discountCodes.map((code: DiscountCode, idx: number) => (
          <DiscountBanner key={code.id} discountCode={code} image={IMAGES[idx]} />
        ))}
      </Carousel>
    </>
  );
};
export default HomePage;
