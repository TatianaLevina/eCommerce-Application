import type { DiscountCode } from '@commercetools/platform-sdk';

import { createAuthFlow } from './ClientBuilder';

export const getDiscountCodes = async (): Promise<DiscountCode[]> => {
  const response = await createAuthFlow().discountCodes().get().execute();
  return response.body.results;
};

export const checkDiscountCodeExists = async (code: string) => {
  try {
    const response = await createAuthFlow()
      .discountCodes()
      .head({
        queryArgs: {
          where: `code="${code}"`,
        },
      })
      .execute();
    return response.statusCode == 200;
  } catch {
    return false;
  }
};
