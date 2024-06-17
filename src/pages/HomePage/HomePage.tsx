import type React from 'react';
import type { DiscountCode } from '@commercetools/platform-sdk';
import { Carousel } from 'antd';
import DiscountBanner from '@/components/DiscountBanner/DiscountBanner';
import { useDiscounts } from '@/contexts/DiscountsContext';
import IMAGES from '@/images/Images';
import './HomePage.scss';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { discountCodes } = useDiscounts();
  const navigate = useNavigate();

  const handleCarouselClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('slick-dots') && !target.closest('.slick-dots')) {
      navigate('/catalog');
    }
  };

  return (
    <>
      <h1 className="custom-title">Welcome to our Sweet Home</h1>
      <div onClick={handleCarouselClick} className="carousel-wrapper">
        <Carousel className="home-page__carousel" draggable autoplay>
          {discountCodes.map((code: DiscountCode, idx: number) => (
            <DiscountBanner key={code.id} discountCode={code} image={IMAGES[idx]} />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default HomePage;
