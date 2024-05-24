export type Categories = {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Category[];
};

export type Category = {
  id: string;
  version: number;
  name: LocalizedString;
  slug: LocalizedString;
  ancestors: CategoryReference[];
  orderHint: string;
  createdAt: string;
  lastModifiedAt: string;
};

export type LocalizedString = {
  en: string;
};

export type CategoryReference = {
  typeId: string;
  id: string;
};
