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

  const banners: ReactElement[] = [
    //   <>
    //     <div className="home__img-wrapper">
    //       <img src={IMAGES.image1} className="custom-img" alt="Sweet Home" />
    //     </div>
    //   </>,
    //   <>
    //     <div className="home__img-wrapper">
    //       <img src={IMAGES.image2} className="custom-img" alt="Sweet Home" />
    //     </div>
    //   </>,
    //   <>
    //     <div className="home__img-wrapper">
    //       <img src={IMAGES.image3} className="custom-img" alt="Sweet Home" />
    //     </div>
    //   </>,
    //   <>
    //     <div className="home__img-wrapper">
    //       <img src={IMAGES.image3} className="custom-img" alt="Sweet Home" />
    //     </div>
    //   </>,
  ];
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
      <Carousel draggable arrows>
        {...banners}
      </Carousel>
    </>
  );
};
export default HomePage;
