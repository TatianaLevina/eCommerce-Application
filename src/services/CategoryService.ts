import { createAuthFlow } from '@services/ClientBuilder.ts';
import type { Category } from '@commercetools/platform-sdk';
import { invalidateToken } from '@services/TokenCache.ts';

export const getCategoriesService = async (): Promise<Category[] | null> => {
  try {
    const responseCategory = await createAuthFlow().categories().get().execute();
    if (responseCategory.statusCode === 200) {
      return responseCategory.body.results;
    }
    return null;
  } catch (e) {
    console.error('getCategoriesService', e);
    // If error is related to authorization, invalidate the token and retry once
    const error = e as { statusCode?: number };
    if (error.statusCode === 401 || error.statusCode === 403) {
      invalidateToken();
      try {
        const responseCategoryRetry = await createAuthFlow().categories().get().execute();
        if (responseCategoryRetry.statusCode === 200) {
          return responseCategoryRetry.body.results;
        }
      } catch (retryError) {
        console.error('getCategoriesService retry failed', retryError);
      }
    }
    return null;
  }
};
