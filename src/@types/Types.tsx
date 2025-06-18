// src/state/types.ts
import type { Currency, Clicker, AutoClicker } from './ClickerAutoClickerTypes.ts';

export interface GameState {
    currency: Currency;
    clickers: Clicker[];
    autoClickers: AutoClicker[];
}

export type GameAction =
    | { type: 'ADD_CURRENCY'; payload: Currency }
    | { type: 'UNLOCK_CLICKER'; payload: number }
    | { type: 'UNLOCK_AUTO_CLICKER'; payload: number }
    | { type: 'BUY_AUTO_CLICKER'; payload: number }
    | { type: 'RESET_STATE' };