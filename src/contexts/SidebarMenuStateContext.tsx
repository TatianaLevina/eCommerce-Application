import type React from 'react';
import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface SidebarMenuState {
  isCollapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const SidebarMenuStateContext = createContext<SidebarMenuState>({
  isCollapsed: true,
  setCollapsed: () => {},
});

export const SidebarMenuStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCollapsed, setCollapsed] = useState(true);

  return (
    <SidebarMenuStateContext.Provider value={{ isCollapsed, setCollapsed }}>
      {children}
    </SidebarMenuStateContext.Provider>
  );
};

export const useSidebarMenuState = (): SidebarMenuState => {
  const state = useContext(SidebarMenuStateContext);
  if (!state) {
    throw new Error('useSidebarMenuState must be used within an SidebarMenuStateProvider');
  }
  return state;
};
