import type { BaseAddress } from '@commercetools/platform-sdk';
import type dayjs from 'dayjs';

export interface Address {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth?: string;
  addresses: BaseAddress[];
  billingAddresses: number[];
  shippingAddresses: number[];
  defaultShippingAddress: number | undefined;
  defaultBillingAddress: number | undefined;
}

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthdate?: dayjs.Dayjs;
  billingStreet: string;
  billingCity: string;
  billingPostalCode: string;
  billingCountry: string;
  billingAsDefault?: boolean;
  shippingStreet?: string;
  shippingCity?: string;
  shippingPostalCode?: string;
  shippingCountry?: string;
  shippingAsDefault?: boolean;
}

export interface Option {
  value: string;
  label: string;
}
