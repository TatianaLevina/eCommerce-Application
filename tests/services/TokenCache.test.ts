import { getExistingToken, tokenCache } from '@services/TokenCache';
import type { TokenStore } from '@commercetools/sdk-client-v2';

describe('TokenCache tests', () => {
  describe('tokenCache object tests', () => {
    afterEach(() => {
      localStorage.removeItem('token');
    });

    test(`Should be 'token' field in LocalStorage`, () => {
      const fakeToken: TokenStore = {
        token: 'testToken',
        expirationTime: 777,
      };
      tokenCache.set(fakeToken);
      const tokenStr = localStorage.getItem('token');
      assert.exists(tokenStr, 'LocalStorage must contain token');
    });

    test('Token from LocalStorage must contain expected keys', () => {
      const fakeToken: TokenStore = {
        token: 'testToken',
        expirationTime: 777,
        refreshToken: 'test',
      };
      tokenCache.set(fakeToken);
      const tokenStr = localStorage.getItem('token');
      const expextedToken = JSON.parse(tokenStr!);
      assert.containsAllDeepKeys(
        expextedToken,
        ['token', 'expirationTime', 'refreshToken'],
        'The token does not contain the required keys',
      );
    });

    test('Token from LocalStorage must contain expected values', () => {
      const fakeToken: TokenStore = {
        token: 'testToken',
        expirationTime: 777,
        refreshToken: 'test',
      };
      tokenCache.set(fakeToken);
      const tokenStr = localStorage.getItem('token');
      const expextedToken = JSON.parse(tokenStr!);
      assert.deepEqual<TokenStore>(fakeToken, expextedToken, 'The token from the vault must match the original token');
    });

    test('Token from LocalStorage must contain expected values', () => {
      const fakeToken: TokenStore = {
        token: 'testToken',
        expirationTime: 777,
        refreshToken: 'test',
      };

      const strFakeToken = JSON.stringify(fakeToken);
      localStorage.setItem('token', strFakeToken);

      const expextedToken = tokenCache.get();

      assert.equal(
        fakeToken.expirationTime,
        expextedToken.expirationTime,
        'The token from the vault must match the original token',
      );
      assert.equal(fakeToken.token, expextedToken.token, 'The token from the vault must match the original token');
      assert.equal(
        fakeToken.refreshToken,
        expextedToken.refreshToken,
        'The token from the vault must match the original token',
      );
    });
  });

  describe('getExistingToken tests', () => {
    afterEach(() => {
      localStorage.removeItem('token');
    });

    test('Result string must contain refreshToken', () => {
      const fakeToken: TokenStore = {
        token: 'testToken',
        expirationTime: 777,
        refreshToken: 'test',
      };
      const assertToken = `Bearer ${fakeToken.refreshToken}`;

      const strFakeToken = JSON.stringify(fakeToken);
      localStorage.setItem('token', strFakeToken);

      const expextedToken = getExistingToken();

      assert.strictEqual(assertToken, expextedToken, 'The token from the vault must match the original token');
    });

    test(`Result string must contain empty string`, () => {
      const assertToken = ``;

      const expextedToken = getExistingToken();

      assert.equal(assertToken, expextedToken, 'The token from the vault must match the original token');
    });

    test(`Result string must contain 'Bearer undefinded'`, () => {
      const fakeToken: TokenStore = {
        token: 'testToken',
        expirationTime: 777,
      };
      const assertToken = `Bearer ${fakeToken.refreshToken}`;

      const strFakeToken = JSON.stringify(fakeToken);
      localStorage.setItem('token', strFakeToken);

      const expextedToken = getExistingToken();

      assert.strictEqual(assertToken, expextedToken, 'The token from the vault must match the original token');
    });
  });
});
