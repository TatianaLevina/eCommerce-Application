import { createAuthFlow } from '@/services/ClientBuilder.ts';
import type { CustomerDraft, MyCustomerSignin } from '@commercetools/platform-sdk';

export const signUpCustomer = ({
  email,
  password,
  firstName,
  lastName,
  dateOfBirth,
  addresses,
  defaultShippingAddress,
  shippingAddresses,
  defaultBillingAddress,
  billingAddresses,
}: CustomerDraft) =>
  createAuthFlow()
    .customers()
    .post({
      body: {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        addresses,
        defaultShippingAddress,
        shippingAddresses,
        defaultBillingAddress,
        billingAddresses,
      },
    })
    .execute();

export const signInCustomer = ({ email, password }: MyCustomerSignin) => {
  return createAuthFlow()
    .me()
    .login()
    .post({
      body: {
        email,
        password,
        activeCartSignInMode: 'MergeWithExistingCustomerCart',
      },
    })
    .execute();
};
