export type QueryArgs = {
  staged?: boolean;
  fuzzy?: boolean;
  'text.en-US'?: string;
  sort: string[];
  filter: string[];
  offset: number;
  limit: number;
};
