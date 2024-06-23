import type React from 'react';
import { Flex, Typography } from 'antd';

import './DiscountBanner.scss';
import type { DiscountBannerProps } from './DiscountBannerProps.interface';

const DiscountBanner: React.FC<DiscountBannerProps> = ({ discountCode, image }) => {
  const { Title } = Typography;

  const fromDay = discountCode.validFrom ? new Date(discountCode.validFrom).toLocaleDateString() : 'N/A';
  const untilDay = discountCode.validUntil ? new Date(discountCode.validUntil).toLocaleDateString() : 'N/A';
  const description = discountCode.description?.['en-US'] || 'No description available';

  return (
    <>
      <div className="home__img-wrapper">
        <img src={image} className="custom-img" alt="Sweet Home" />
        <div className="promo__wrapper">
          <Flex vertical className="promo__description" style={{ maxWidth: '30%' }}>
            <Title level={3} className="promo__title">
              {fromDay} - {untilDay}
            </Title>
            <Title level={3} className="promo__title">
              {description}
            </Title>
          </Flex>
          <Flex vertical className="promo__code">
            <Title level={4} className="promo__title">
              PROMO CODE
            </Title>
            <Title level={3} className="promo__title" style={{ textAlign: 'right' }}>
              {discountCode.code}
            </Title>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default DiscountBanner;
