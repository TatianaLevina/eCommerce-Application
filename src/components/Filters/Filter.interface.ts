import type { AllFilters } from './Filter.type';

export interface FiltersProps {
  searchText: string;
  setSearchText: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
  priceFrom: number | undefined;
  setPriceFrom: (value: number | undefined) => void;
  priceTo: number | undefined;
  setPriceTo: (value: number | undefined) => void;
  resetFilters: () => void;
  manufacturer: string[];
  setManufacturer: (value: string[]) => void;
  material: string[];
  setMaterial: (value: string[]) => void;
  allFilters: AllFilters;
  drawerOpen: boolean;
  toggleDrawer: () => void;
}
