import type { ProductProjection } from '@commercetools/platform-sdk';

export interface ProductCardProps {
  product: ProductProjection;
  categorySlug: string;
  formatPrice: (centAmount: number) => string;
}
