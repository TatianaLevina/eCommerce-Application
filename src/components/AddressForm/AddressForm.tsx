import { Button, Form, Input, Radio, Switch } from 'antd';

export type RequiredMark = 'shipping' | 'billing';

export type BaseAddress = {
  street?: string;
  city?: string;
  country?: string;
  postalcode?: string;
  type?: RequiredMark;
  isdefault?: boolean;
};

export type AddressFormProps = {
  callbackFn: (values: BaseAddress) => void;
};

const addAddress = (value: BaseAddress, callbackFn: (values: BaseAddress) => void) => {
  if (value.city || value.country || value.street || value.postalcode) {
    callbackFn(value);
  }
};

export default function AddressForm(props: AddressFormProps): JSX.Element {
  return (
    <Form
      name="address"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true, type: 'shipping' }}
      style={{ maxWidth: 600 }}
      onFinish={(val) => addAddress(val, props.callbackFn)}
      autoComplete="off"
    >
      <Form.Item<BaseAddress> name="type">
        <Radio.Group>
          <Radio.Button value="shipping">Shipping</Radio.Button>
          <Radio.Button value="billing">Billing</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item<BaseAddress> label="Set default" name="isdefault">
        <Switch />
      </Form.Item>

      <Form.Item<BaseAddress>
        label="Street"
        name="street"
        rules={[{ pattern: /^(?!\s+).+(?!\s+)$/, message: 'Must contain at least one character.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<BaseAddress>
        label="City"
        name="city"
        rules={[
          {
            pattern: /^(?!\s+)[[A-Za-z\s]+(?!\s+)$/,
            message: 'Must contain at least one character and no special characters or numbers',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<BaseAddress> label="Country" name="country" rules={[]}>
        <Input />
      </Form.Item>

      <Form.Item<BaseAddress>
        label="Postal Code"
        name="postalcode"
        rules={[
          {
            pattern: /^(?!\s+)([A-Z0-9]{5}-[A-Z0-9]{4})|([A-Z0-9]{4}\s[A-Z0-9]{3})|([0-9]{6})(?!\s+)$/,
            message: 'Must follow the format for the country (000000 or XXXXX-YYYY or XXXX YYY)',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button htmlType="submit">Add to address list</Button>
      </Form.Item>
    </Form>
  );
}
