import { createContext, Context } from 'react';

export interface SidebarContextState {
  getActive?: () => number;
  setActive?: (value: string | number) => void;
}

const SidebarContext: Context<SidebarContextState> = createContext({});

export default SidebarContext;
