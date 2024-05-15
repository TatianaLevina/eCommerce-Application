import type React from 'react';
import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface DrawerState {
  isCollapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const DrawerStateContext = createContext<DrawerState>({
  isCollapsed: true,
  setCollapsed: () => {},
});

export const DrawerStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCollapsed, setCollapsed] = useState(true);

  return <DrawerStateContext.Provider value={{ isCollapsed, setCollapsed }}>{children}</DrawerStateContext.Provider>;
};

export const useDrawerState = (): DrawerState => {
  const state = useContext(DrawerStateContext);
  if (!state) {
    throw new Error('useSidebarMenuState must be used within an SidebarMenuStateProvider');
  }
  return state;
};
