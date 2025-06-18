// src/state/initialState.ts
import type { GameState } from '../@types/Types.tsx';
import gameConfig from '../data/initialStateData.json'

export const initialState: GameState = {
    currency: gameConfig.currency,
    clickers: gameConfig.clickerConfigs,
    autoClickers: gameConfig.autoClickerConfigs
};