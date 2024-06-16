import type React from 'react';
import type { ReactElement } from 'react';
import type { DiscountCode } from '@commercetools/platform-sdk';
import { Carousel } from 'antd';

import IMAGES from '@/images/Images';
import DiscountBanner from '@/components/DiscountBanner/DiscountBanner';
import { useDiscounts } from '@/contexts/DiscountsContext';

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
      </Carousel>
    </>
  );
};
export default HomePage;
