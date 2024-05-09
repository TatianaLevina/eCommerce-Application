import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { PasswordAuthMiddlewareOptions, UserAuthOptions } from '@commercetools/sdk-client-v2';
import { type AuthMiddlewareOptions, ClientBuilder, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

import { getExistingToken, tokenCache } from './TokenCache.ts';

export const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY || '';
const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET || '';
const clientId = import.meta.env.VITE_CTP_CLIENT_ID || '';
const scopes: string[] = [import.meta.env.VITE_CTP_SCOPES]; //check needed scopes

const anonymousAuthMiddlewareOptions: AuthMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_AUTH_URL,
  projectKey: projectKey,
  credentials: {
    clientId: clientId,
    clientSecret: clientSecret,
  },
  scopes,
  fetch,
  tokenCache,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_API_URL,
  fetch,
};

export const createAuthFlow = () => {
  const currentToken = getExistingToken();

  const ctpClient = currentToken
    ? new ClientBuilder()
        .withRefreshTokenFlow({
          ...anonymousAuthMiddlewareOptions,
          refreshToken: currentToken,
        })
        .withHttpMiddleware(httpMiddlewareOptions)
        .build()
    : new ClientBuilder()
        .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: projectKey,
  });
};

//needed to be called after succesful login
export const createPasswordAuthFlow = (user: UserAuthOptions) => {
  localStorage.clear();
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey: projectKey,
    credentials: {
      clientId: clientId,
      clientSecret: clientSecret,
      user: user,
    },
    scopes,
    fetch,
    tokenCache,
  };

  const newCtpClient = new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(newCtpClient).withProjectKey({
    projectKey: projectKey,
  });
};
