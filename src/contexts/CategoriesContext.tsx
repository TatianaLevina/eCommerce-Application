import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { getCategoriesService } from '@services/CategoryService.ts';
import type { Category } from '@commercetools/platform-sdk';

interface CategoryContextType {
  categories: Category[] | null;
  loading: boolean;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryData = await getCategoriesService();
      setCategories(categoryData);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return <CategoryContext.Provider value={{ categories, loading }}>{children}</CategoryContext.Provider>;
};

export const useCategory = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};
