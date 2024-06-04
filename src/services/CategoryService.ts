import { createAuthFlow } from '@services/ClientBuilder.ts';
import type { Category } from '@commercetools/platform-sdk';

export const getCategoriesService = async (): Promise<Category[] | null> => {
  try {
    const responseCategory = await createAuthFlow().categories().get().execute();
    if (responseCategory.statusCode === 200) {
      return responseCategory.body.results;
    }
    return null;
  } catch (e) {
    console.error('getCategoriesService', e);
    return null;
  }
};
