import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { Client, PasswordAuthMiddlewareOptions, UserAuthOptions } from '@commercetools/sdk-client-v2';
import { type AuthMiddlewareOptions, ClientBuilder, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

import { getExistingToken, tokenCache, invalidateToken } from './TokenCache';

export const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY || '';
const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET || '';
const clientId = import.meta.env.VITE_CTP_CLIENT_ID || '';
const scopes: string[] = [import.meta.env.VITE_CTP_SCOPES];

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

let ctpClientInstance: Client | null = null;

const createClient = () => {
  if (ctpClientInstance) return ctpClientInstance;

  const currentToken = getExistingToken();

  ctpClientInstance = currentToken
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

  return ctpClientInstance;
};

export const createAuthFlow = () => {
  const client = createClient();
  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKey,
  });
};

export const createPasswordAuthFlow = (user: UserAuthOptions) => {
  invalidateToken();
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

  ctpClientInstance = newCtpClient;

  return createApiBuilderFromCtpClient(newCtpClient).withProjectKey({
    projectKey: projectKey,
  });
};
