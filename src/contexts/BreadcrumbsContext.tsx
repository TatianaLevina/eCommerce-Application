import type React from 'react';
import { createContext, useContext, useState } from 'react';

interface BreadcrumbItem {
  href?: string;
  title: React.ReactNode;
  menu?: boolean;
}

interface BreadcrumbsContextType {
  items: BreadcrumbItem[];
  setItems: (items: BreadcrumbItem[]) => void;
}

const BreadcrumbsContext = createContext<BreadcrumbsContextType | undefined>(undefined);

export const BreadcrumbsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<BreadcrumbItem[]>([]);

  return <BreadcrumbsContext.Provider value={{ items, setItems }}>{children}</BreadcrumbsContext.Provider>;
};

export const useBreadcrumbs = (): BreadcrumbsContextType => {
  const context = useContext(BreadcrumbsContext);
  if (context === undefined) {
    throw new Error('useBreadcrumbs must be used within a BreadcrumbsProvider');
  }
  return context;
};
