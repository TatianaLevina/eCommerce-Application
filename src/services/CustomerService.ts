import { createAuthFlow } from '@services/ClientBuilder.ts';
import type { BaseAddress, CustomerDraft, CustomerUpdateAction, MyCustomerSignin } from '@commercetools/platform-sdk';
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

export const changeUserPassword = async (
  userID: string,
  userVersion: number,
  currentPassword: string,
  newPassword: string,
) => {
  return createAuthFlow()
    .customers()
    .password()
    .post({ body: { id: userID, version: userVersion, currentPassword, newPassword } })
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
    if (info.birthDate !== null) {
      actions.push({
        action: 'setDateOfBirth',
        dateOfBirth: info.birthDate.format(validateConstant.dateFormat),
      });
    } else {
      actions.push({
        action: 'setDateOfBirth',
      });
    }
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

export interface AddressInfo {
  address?: BaseAddress;
  isBillingAddress?: boolean;
  isShippingAddress?: boolean;
  isDefaultBillingAddress?: boolean;
  isDefaultShippingAddress?: boolean;
}

export const addAddress = async (userID: string, userVersion: number, addressInfo: AddressInfo) => {
  const request = createAuthFlow().customers().withId({ ID: userID });
  const response = await request
    .post({
      body: {
        version: userVersion,
        actions: [{ action: 'addAddress', address: addressInfo.address! }],
      },
    })
    .execute();

  const customer = response.body;

  const address = customer.addresses[customer.addresses.length - 1];

  const actions: CustomerUpdateAction[] = [];
  if (addressInfo.isDefaultBillingAddress) {
    actions.push({
      action: 'setDefaultBillingAddress',
      addressId: address.id,
    });
  } else if (addressInfo.isBillingAddress) {
    actions.push({
      action: 'addBillingAddressId',
      addressId: address.id,
    });
  }
  if (addressInfo.isDefaultShippingAddress) {
    actions.push({
      action: 'setDefaultShippingAddress',
      addressId: address.id,
    });
  } else if (addressInfo.isShippingAddress) {
    actions.push({
      action: 'addShippingAddressId',
      addressId: address.id,
    });
  }

  return request
    .post({
      body: {
        version: customer.version,
        actions,
      },
    })
    .execute();
};
export const removeAddress = (userID: string, userVersion: number, addressID: string) => {
  return createAuthFlow()
    .customers()
    .withId({ ID: userID })
    .post({
      body: {
        version: userVersion,
        actions: [{ action: 'removeAddress', addressId: addressID }],
      },
    })
    .execute();
};
