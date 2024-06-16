import type React from 'react';
import { useMemo, useState } from 'react';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import '@components/ProductCard/ProductCard.scss';
import ImageCustom from '../ImageCustom/ImageCustom';
import { useCart } from '@contexts/CartContext';
import type { ProductCardProps } from './ProductCardProps.interface';

const ProductCard: React.FC<ProductCardProps> = ({ product, categorySlug, formatPrice }) => {
  const navigate = useNavigate();
  const { state, addToCart, removeFromCart } = useCart();
  const price = product.masterVariant.prices?.find((x) => x.value.currencyCode === 'USD');
  const discountedPrice = price?.discounted?.value.centAmount;
  const imageUrl = product.masterVariant.images?.[0]?.url || 'default-image-url';
  const isInCart = useMemo(
    () => state?.cart?.lineItems.some((item) => item.productId === product.id),
    [state?.cart?.lineItems],
  );

  const [loading, setLoading] = useState(false);

  const handleCardClick = (): void => {
    navigate(`/catalog/${categorySlug}/product/${product.id}`);
  };

  const handleCartAction = async (e: React.MouseEvent): Promise<void> => {
    e.stopPropagation();
    setLoading(true);
    if (isInCart) {
      const lineItemId = state?.cart?.lineItems.find((item) => item.productId === product.id)?.id;
      if (lineItemId) {
        await removeFromCart(lineItemId);
      }
    } else {
      if (product.masterVariant.sku) {
        await addToCart(product.masterVariant.sku, 1);
      }
    }
    setLoading(false);
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
            Benefit: {formatPrice((price?.value.centAmount || 0) - discountedPrice)}{' '}
            {price?.discounted?.value.currencyCode}
          </p>
        </div>
      )}
      <div className="product-card__custom-image">
        <ImageCustom className="product-card__img" src={imageUrl} alt={product.name['en-US']} />
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
      <Button onClick={handleCartAction} loading={loading} disabled={isInCart}>
        {isInCart ? 'In Cart' : 'Add to Cart'}
      </Button>
    </Card>
  );
};

export default ProductCard;
