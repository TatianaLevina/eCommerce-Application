import type { FormInstance } from 'antd';

import type { AddressInfo } from '@/services/Service.interface';

export interface AddressFormProps {
  addressInfo: AddressInfo;
  onFormInstanceReady: (instance: FormInstance<AddressInfo>) => void;
  disabled?: boolean;
}
