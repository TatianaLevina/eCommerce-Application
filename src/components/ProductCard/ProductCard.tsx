import type React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { ProductProjection } from '@commercetools/platform-sdk';
import '@components/ProductCard/ProductCard.scss';
import ImageCustom from '../ImageCustom/ImageCustom';

interface ProductCardProps {
  product: ProductProjection;
  categorySlug: string; // Pass category slug as prop
  formatPrice: (centAmount: number) => string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, categorySlug, formatPrice }) => {
  const navigate = useNavigate();
  const price = product.masterVariant.prices?.find((x) => x.value.currencyCode === 'USD');
  const discountedPrice = price?.discounted?.value.centAmount;
  const imageUrl = product.masterVariant.images?.[0]?.url || 'default-image-url';

  const handleCardClick = () => {
    navigate(`/catalog/${categorySlug}/product/${product.id}`);
  };

  return (
    <Card
      key={product.id}
      title={product.name['en-US']}
      bordered={false}
      className="product-card zooming"
      onClick={handleCardClick}
    >
      {discountedPrice && (
        <div className="product-card__discount-msg">
          <p>
            Benefit: {formatPrice(price?.value.centAmount - discountedPrice)} ${price?.discounted?.value.currencyCode}
          </p>
        </div>
      )}
      <div className="product-card__custom-image">
        <ImageCustom className="product-card__img" src={imageUrl} alt={product.name['en-US']}></ImageCustom>
      </div>
      <div className="product-card__details">
        <p className={`product-card__price ${discountedPrice ? 'product-card__price_discounted' : ''}`}>
          Price: {formatPrice(price?.value.centAmount || 0)} {price?.value.currencyCode}
        </p>
        {discountedPrice && (
          <p className="product-card__price glow">
            <span>Discounted</span> price<span>:</span> {formatPrice(discountedPrice)}{' '}
            {price?.discounted?.value.currencyCode}
          </p>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
