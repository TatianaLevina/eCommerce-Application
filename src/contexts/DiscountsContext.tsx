import { getDiscountCodes } from '@/services/DiscountsService';
import type { DiscountCode } from '@commercetools/platform-sdk';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

interface DiscountsContextType {
  discountCodes: DiscountCode[];
}

const DiscountsContext = createContext<DiscountsContextType>({
  discountCodes: [],
});

export const DiscountsProvider = ({ children }: { children: ReactNode }) => {
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  useEffect(() => {
    let ignore = false;
    getDiscountCodes()
      .then((codes) => {
        console.log('codes:', codes);
        if (!ignore) {
          setDiscountCodes(codes);
        }
      })
      .catch((error) => {
        console.log('Failed to fetch discount codes:', error);
        ignore = true;
      });
    return () => {
      ignore = true;
    };
  }, []);
  return <DiscountsContext.Provider value={{ discountCodes }}>{children}</DiscountsContext.Provider>;
};

export const useDiscounts = (): DiscountsContextType => {
  const context = useContext(DiscountsContext);
  return context;
};
