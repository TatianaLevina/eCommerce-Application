import { createAuthFlow } from '@services/ClientBuilder.ts';
import type { Product } from '@commercetools/platform-sdk';

export const getSingleProductService = async (id: string): Promise<Product | null> => {
  try {
    const responseProduct = await createAuthFlow().products().withId({ ID: id }).get().execute();
    if (responseProduct.statusCode === 200) {
      return responseProduct.body;
    }
    return null;
  } catch (e) {
    console.error('getSingleProductService', e);
    return null;
  }
};
