import type { DiscountCode } from '@commercetools/platform-sdk';
import { createAuthFlow } from './ClientBuilder';

export const getDiscountCodes = async (): Promise<DiscountCode[]> => {
  const response = await createAuthFlow().discountCodes().get().execute();
  return response.body.results;
};
