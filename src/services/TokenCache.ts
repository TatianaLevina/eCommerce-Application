import type { TokenStore } from '@commercetools/sdk-client-v2';

export const tokenCache = {
  set: (cache: TokenStore): void => {
    localStorage.setItem('token', JSON.stringify(cache));
    return;
  },
  get: () => {
    const cache = localStorage.getItem('token');
    if (!cache) return null;

    const parsedCache = JSON.parse(cache);
    const currentTime = Date.now();

    if (parsedCache.expirationTime < currentTime) {
      localStorage.removeItem('token');
      return null;
    }

    return parsedCache;
  },
};

export const getExistingToken = () => {
  const cache = tokenCache.get();
  return cache ? `Bearer ${cache.refreshToken}` : '';
};

export const invalidateToken = () => {
  localStorage.removeItem('token');
};
