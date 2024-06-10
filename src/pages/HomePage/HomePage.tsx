import type React from 'react';
// import { Typography } from 'antd';
import { Carousel } from 'antd';
import IMAGES from '@/images/Images';
import DiscountBanner from '@/components/DiscountBanner/DiscountBanner';
import { useDiscounts } from '@/contexts/DiscountsContext';
import type { DiscountCode } from '@commercetools/platform-sdk';
import type { ReactElement } from 'react';

const HomePage: React.FC = () => {
  const { discountCodes } = useDiscounts();

  const banners: ReactElement[] = [];
  discountCodes.forEach((code: DiscountCode, idx: number) => {
    banners.push(
      <>
        <DiscountBanner discountCode={code} image={IMAGES[idx]} />
      </>,
    );
  });
  return (
    <>
      <h1 className="custom-title">Welcome to our Sweet Home</h1>
      <Carousel draggable autoplay>
        {...banners}
        <>
          <div className="home__img-wrapper">
            <img src={IMAGES[3]} className="custom-img" alt="Sweet Home" />
          </div>
        </>
      </Carousel>
    </>
  );
};
export default HomePage;
