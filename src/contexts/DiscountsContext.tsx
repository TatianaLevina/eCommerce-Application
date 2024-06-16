import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { DiscountCode } from '@commercetools/platform-sdk';

import { getDiscountCodes } from '@/services/DiscountsService';
import type { DiscountsContextType } from './Context.interface';

const DiscountsContext = createContext<DiscountsContextType>({
  discountCodes: [],
});

export const DiscountsProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  useEffect(() => {
    let ignore = false;
    getDiscountCodes()
      .then((codes) => {
        if (!ignore) {
          setDiscountCodes(codes);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch discount codes:', error);
        ignore = true;
      });
    return () => {
      ignore = true;
    };
  }, []);
  return <DiscountsContext.Provider value={{ discountCodes }}>{children}</DiscountsContext.Provider>;
};

export const useDiscounts = (): DiscountsContextType => {
  return useContext(DiscountsContext);
};
