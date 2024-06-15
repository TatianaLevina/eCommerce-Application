import type { AddressInfo } from '@/services/CustomerService';
import type { FormInstance } from 'antd';

export interface AddressFormProps {
  addressInfo: AddressInfo;
  onFormInstanceReady: (instance: FormInstance<AddressInfo>) => void;
  disabled?: boolean;
}
