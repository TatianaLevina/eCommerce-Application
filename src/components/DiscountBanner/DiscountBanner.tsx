import type React from 'react';
import type { DiscountCode } from '@commercetools/platform-sdk';
import { Flex, Typography } from 'antd';
import './DiscountBanner.scss';

const { Title } = Typography;

export interface DiscountBannerProps {
  discountCode: DiscountCode;
  image: string;
}

const DiscountBanner: React.FC<DiscountBannerProps> = ({ discountCode, image }) => {
  let fromDay = null;
  let untilDay = null;
  if (discountCode.validFrom) {
    fromDay = new Date(discountCode.validFrom).toLocaleDateString();
    console.log(fromDay);
  }
  if (discountCode.validUntil) {
    untilDay = new Date(discountCode.validUntil).toLocaleDateString();
    console.log(untilDay);
  }
  const description = discountCode.description!['en-US'];
  console.log(discountCode.description!['en-US']);

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
