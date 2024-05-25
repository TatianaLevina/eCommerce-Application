import type React from 'react';
import { Card } from 'antd';
import type { ProductProjection } from '@commercetools/platform-sdk';

interface ProductCardProps {
  product: ProductProjection;
  formatPrice: (centAmount: number) => string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, formatPrice }) => {
  const price = product.masterVariant.prices?.find((x) => x.value.currencyCode === 'USD');
  const discountedPrice = price?.discounted?.value.centAmount;
  const imageUrl = product.masterVariant.images?.[0]?.url || 'default-image-url';

  return (
    <Card key={product.id} title={product.name['en-US']} bordered={false} className="product-card">
      <div className="product-card__custom-image">
        <img src={imageUrl} alt={product.name['en-US']} />
      </div>
      <div className="product-card__details">
        <p className={`product-card__price ${discountedPrice ? 'product-card__price_discounted' : ''}`}>
          Price: {formatPrice(price?.value.centAmount || 0)} {price?.value.currencyCode}
        </p>
        {discountedPrice && (
          <p className="product-card__price">
            Discounted price: {formatPrice(discountedPrice)} {price?.discounted?.value.currencyCode}
          </p>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
