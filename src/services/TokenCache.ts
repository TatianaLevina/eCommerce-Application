import type { TokenStore } from '@commercetools/sdk-client-v2';

export const tokenCache = {
  set: (cache: TokenStore) => {
    localStorage.setItem('token', JSON.stringify(cache));
    return;
  },
  get: () => {
    const cache = localStorage.getItem('token');
    return cache ? JSON.parse(cache) : null;
  },
};

export const getExistingToken = () => {
  const cache = localStorage.getItem('token');
  const token = cache ? `Bearer ${JSON.parse(cache)?.refreshToken}` : '';
  return token;
};
