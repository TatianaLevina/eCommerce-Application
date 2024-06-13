import { type LineItem } from '@commercetools/platform-sdk';

interface CartItemProps {
  product: LineItem;
  removeClickHandler: (id: string) => void;
  inputChangeHandler: (id: string, value: number) => Promise<number | undefined>;
}

export default CartItemProps;
