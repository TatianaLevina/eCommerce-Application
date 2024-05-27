import { createAuthFlow } from '@services/ClientBuilder.ts';
import type { CustomerDraft, CustomerUpdateAction, MyCustomerSignin } from '@commercetools/platform-sdk';
import type dayjs from 'dayjs';
import validateConstant from '@/data/validateConstants';

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

export interface UserGeneralInfo {
  firstName?: string;
  lastName?: string;
  birthDate?: dayjs.Dayjs;
  email?: string;
}

export const updateUserInfo = (userID: string, userVersion: number, info: UserGeneralInfo) => {
  const actions: CustomerUpdateAction[] = [];
  if (info.firstName !== undefined) {
    actions.push({
      action: 'setFirstName',
      firstName: info.firstName,
    });
  }
  if (info.lastName !== undefined) {
    actions.push({
      action: 'setLastName',
      lastName: info.lastName,
    });
  }
  if (info.birthDate !== undefined) {
    actions.push({
      action: 'setDateOfBirth',
      dateOfBirth: info.birthDate.format(validateConstant.dateFormat),
    });
  }
  if (info.email !== undefined) {
    actions.push({
      action: 'changeEmail',
      email: info.email,
    });
  }

  return createAuthFlow()
    .customers()
    .withId({ ID: userID })
    .post({
      body: {
        version: userVersion,
        actions,
      },
    })
    .execute();
};
