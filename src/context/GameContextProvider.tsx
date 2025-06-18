// src/context/GameContextProvider.tsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { GameState, GameAction } from '../@types/Types.tsx';
import { initialState } from '../state/InitialState';
import { gameReducer } from '../state/GameReducer';
import type {Currency} from "../@types/ClickerAutoClickerTypes.ts";

const SAVE_KEY = 'clicker_game_save';
const AUTO_CLICK_INTERVAL = 1000; // 1 second

// Helper functions for save/load
const saveGameState = (state: GameState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(SAVE_KEY, serializedState);
    } catch (error) {
        console.error('Failed to save game state:', error);
    }
};

const loadGameState = (): GameState | null => {
    try {
        const serializedState = localStorage.getItem(SAVE_KEY);
        if (!serializedState) return null;
        return JSON.parse(serializedState);
    } catch (error) {
        console.error('Failed to load game state:', error);
        return null;
    }
};

const GameContext = createContext<{
    state: GameState;
    dispatch: React.Dispatch<GameAction>;
}>({ state: initialState, dispatch: () => null });

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Load saved state or use initial state
    const [state, dispatch] = useReducer(gameReducer, loadGameState() || initialState);

    // Save state on tab close or navigation away
    useEffect(() => {
        const handleBeforeUnload = () => {
            saveGameState(state);
        };

        // Save on tab close or navigation away
        window.addEventListener('beforeunload', handleBeforeUnload);
        
        // Save on visibility change (when tab is hidden)
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                saveGameState(state);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            // Final save on component unmount
            saveGameState(state);
        };
    }, [state]);

    // Auto-clicker effect
    useEffect(() => {
        // Calculate total currency per second from all unlocked auto-clickers
        const calculateTotalCurrencyPerSecond = (): Currency => {
            return state.autoClickers.reduce((total, autoClicker) => {
                if (!autoClicker.isUnlocked) return total;
                
                // Multiply by quantity for total contribution from this auto-clicker
                return {
                    gold: total.gold + (autoClicker.currencyPerSecond.gold * autoClicker.quantity),
                    silver: total.silver + (autoClicker.currencyPerSecond.silver * autoClicker.quantity),
                    bronze: total.bronze + (autoClicker.currencyPerSecond.bronze * autoClicker.quantity)
                };
            }, { gold: 0, silver: 0, bronze: 0 });
        };

        // Set up the interval
        const intervalId = setInterval(() => {
            const currencyToAdd = calculateTotalCurrencyPerSecond();
            
            // Only dispatch if there's any currency to add
            if (currencyToAdd.gold > 0 || currencyToAdd.silver > 0 || currencyToAdd.bronze > 0) {
                dispatch({
                    type: 'ADD_CURRENCY',
                    payload: currencyToAdd
                });
            }
        }, AUTO_CLICK_INTERVAL);

        return () => clearInterval(intervalId);
    }, [state.autoClickers]);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);