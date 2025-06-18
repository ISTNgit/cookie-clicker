// src/types/index.ts
export interface Currency {
    gold: number;
    silver: number;
    bronze: number;
}

export interface Clicker {
    id: number;
    name: string;
    imageUrl: string;
    currencyPerClick: Currency;
    isUnlocked: boolean;
    unlockCost: number;
}

export interface AutoClicker {
    id: number;
    name: string;
    imageUrl: string;
    currencyPerSecond: Currency;
    quantity: number;
    unlockCost: number;
    isUnlocked: boolean;
}