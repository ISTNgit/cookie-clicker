// src/state/gameReducer.ts
import type { GameState, GameAction } from '../@types/Types.tsx';
import { convertCurrency } from '../hooks/CurrencyConversionHook.ts';
import {initialState} from "./InitialState.tsx";

export const gameReducer = (state: GameState, action: GameAction): GameState => {

    switch (action.type) {
        case 'ADD_CURRENCY': {
            const newCurrency = convertCurrency(
                state.currency.bronze + action.payload.bronze,
                state.currency.silver + action.payload.silver,
                state.currency.gold + action.payload.gold
            );

            return {
                ...state,
                currency: newCurrency
            };
        }

        case 'UNLOCK_CLICKER': {
            const clickerToUnlock = state.clickers.find(c => c.id === action.payload);
            if (!clickerToUnlock || clickerToUnlock.isUnlocked || state.currency.gold < clickerToUnlock.unlockCost) {
                return state;
            }

            const newCurrency = convertCurrency(
                state.currency.bronze,
                state.currency.silver,
                state.currency.gold - clickerToUnlock.unlockCost
            );

            return {
                ...state,
                currency: newCurrency,
                clickers: state.clickers.map(clicker =>
                    clicker.id === action.payload
                        ? { ...clicker, isUnlocked: true }
                        : clicker
                )
            };
        }

        case 'UNLOCK_AUTO_CLICKER': {
            const autoClickerToUnlock = state.autoClickers.find(c => c.id === action.payload);
            if (!autoClickerToUnlock || autoClickerToUnlock.isUnlocked || state.currency.gold < autoClickerToUnlock.unlockCost) {
                return state;
            }

            const newCurrency = convertCurrency(
                state.currency.bronze,
                state.currency.silver,
                state.currency.gold - autoClickerToUnlock.unlockCost
            );

            return {
                ...state,
                currency: newCurrency,
                autoClickers: state.autoClickers.map(autoClicker =>
                    autoClicker.id === action.payload
                        ? { ...autoClicker, isUnlocked: true, quantity: 1 }
                        : autoClicker
                )
            };
        }

        case 'BUY_AUTO_CLICKER': {
            const autoClickerToBuy = state.autoClickers.find(c => c.id === action.payload);
            if (!autoClickerToBuy || !autoClickerToBuy.isUnlocked || state.currency.gold < autoClickerToBuy.unlockCost) {
                return state;
            }

            const newCurrency = convertCurrency(
                state.currency.bronze,
                state.currency.silver,
                state.currency.gold - autoClickerToBuy.unlockCost
            );

            return {
                ...state,
                currency: newCurrency,
                autoClickers: state.autoClickers.map(autoClicker =>
                    autoClicker.id === action.payload
                        ? { ...autoClicker, quantity: autoClicker.quantity + 1 }
                        : autoClicker
                )
            };
        }

        case 'RESET_STATE' : {
            return {
                ...initialState
            };
        }

        default:
            return state;
    }
};