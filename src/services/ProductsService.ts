import { createAuthFlow } from '@services/ClientBuilder.ts';
import type { ClientResponse, Product, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';

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

// //Do we need this? Basically, we can use getProductsByParamsService() to get all products
// export const getAllProductsService = async (): Promise<Product[] | null> => {
//   try {
//     const responseProduct = await createAuthFlow().products().get().execute();
//     if (responseProduct.statusCode === 200) {
//       return responseProduct.body.results;
//     }
//     return null;
//   } catch (e) {
//     console.error('getProductsService', e);
//     return null;
//   }
// };
type queryArgs = {
  staged?: boolean;
  fuzzy?: boolean; //if we search
  'text.en-US'?: string; //search
  sort: string[];
  filter: string[];
  offset: number; //for pagination
  limit: number;
};

export const getProductsByParamsService = async (
  queryArgs?: queryArgs,
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
