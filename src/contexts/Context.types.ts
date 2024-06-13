import type { ClearCartAction, SetCartAction, SetErrorAction, SetLoadingAction } from './Context.interface';

export type CartAction = SetCartAction | SetLoadingAction | SetErrorAction | ClearCartAction;
