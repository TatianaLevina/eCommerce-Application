import type { BaseAddress } from '@commercetools/platform-sdk';
import type dayjs from 'dayjs';

export interface UserGeneralInfo {
  firstName?: string;
  lastName?: string;
  birthDate?: dayjs.Dayjs;
  email?: string;
}

export interface AddressInfo {
  address?: BaseAddress;
  isBillingAddress?: boolean;
  isShippingAddress?: boolean;
  isDefaultBillingAddress?: boolean;
  isDefaultShippingAddress?: boolean;
}
