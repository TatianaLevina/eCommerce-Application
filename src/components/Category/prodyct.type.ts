export type Products = {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Product[];
};

export type Product = {
  id: string;
  name: {
    'en-us': string;
  };
  description: {
    'en-us': string;
  };
  masterVariant: {
    images: ImadeInfo[];
    prices: PriceInfo[];
    attributes: AttributeType[];
  };
};

export type ImadeInfo = {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
};

export type AttributeType = {
  name: string;
  value: string;
};

export type PriceInfo = {
  id: string;
  value: PriceValue;
  country: string;
  discounted?: {
    value: PriceValue;
    discount: {
      typeId: string;
      id: string;
    };
  };
};

export type PriceValue = {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
};
