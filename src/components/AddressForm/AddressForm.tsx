import { Button, Cascader, Form, Input, Radio, Switch } from 'antd';
import countries from '@data/flat-ui__data-Thu May 09 2024.json';

export type RequiredMark = 'shipping' | 'billing';

export type BaseAddress = {
  street?: string;
  city?: string;
  country?: string;
  postalcode?: string;
  type?: RequiredMark;
  isdefault?: boolean;
};

type Address = {
  street?: string;
  city?: string;
  country?: string[];
  postalcode?: string;
  type?: RequiredMark;
  isdefault?: boolean;
};

export type AddressFormProps = {
  callbackFn: (values: BaseAddress) => void;
};

interface Option {
  value: string;
  label: string;
}

const options: Option[] = countries.map((c) => {
  return { value: c.Code, label: c.Name };
});

const addAddress = (value: Address, callbackFn: (values: BaseAddress) => void) => {
  if (value.city || value.country || value.street || value.postalcode) {
    const addr: BaseAddress = {
      street: value.street,
      city: value.city,
      country: value.country ? value.country[0] : undefined,
      postalcode: value.postalcode,
      type: value.type,
      isdefault: value.isdefault,
    };
    callbackFn(addr);

    // useEffect(() => {
    //   form.resetFields();
    // });
  }
};

export default function AddressForm(props: AddressFormProps): JSX.Element {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="address"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true, type: 'shipping' }}
      style={{ maxWidth: 600 }}
      onFinish={(val) => {
        addAddress(val, props.callbackFn);
        form.resetFields();
      }}
      autoComplete="off"
    >
      <Form.Item<Address> name="type">
        <Radio.Group>
          <Radio.Button value="shipping">Shipping</Radio.Button>
          <Radio.Button value="billing">Billing</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item<Address> label="Set default" name="isdefault">
        <Switch />
      </Form.Item>

      <Form.Item<Address>
        label="Street"
        name="street"
        rules={[{ pattern: /^(?!\s+).+(?!\s+)$/, message: 'Must contain at least one character.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<Address>
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

      <Form.Item<Address> label="Country" name="country" rules={[]}>
        <Cascader options={options} placeholder="Select country" />
      </Form.Item>

      <Form.Item<Address>
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
