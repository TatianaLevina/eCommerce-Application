import type { ClientResponse, Product, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';

import { createAuthFlow } from '@services/ClientBuilder.ts';
import type { QueryArgs } from './Service.type';

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

export const getProductsByParamsService = async (
  queryArgs?: QueryArgs,
): Promise<ClientResponse<ProductProjectionPagedSearchResponse> | null> => {
  try {
    const responseProduct = await createAuthFlow().productProjections().search().get({ queryArgs }).execute();
    if (responseProduct.statusCode === 200) {
      return responseProduct;
    }

    return null;
  } catch (e) {
    console.error('getProductsByParamsService', e);
    return null;
  }
};
