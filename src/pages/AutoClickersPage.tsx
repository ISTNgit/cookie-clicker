// src/pages/AutoClickersPage.tsx
import React from 'react';
import { useGame } from '../context/GameContextProvider';
import type { AutoClicker } from "../@types/ClickerAutoClickerTypes.ts";

export const AutoClickersPage: React.FC = () => {
    const { state, dispatch } = useGame();

    const handleUnlock = (autoClicker: AutoClicker) => {
        if (!autoClicker.isUnlocked && state.currency.gold >= autoClicker.unlockCost) {
            dispatch({ type: 'UNLOCK_AUTO_CLICKER', payload: autoClicker.id });
        }
    };

    const handleBuy = (autoClicker: AutoClicker) => {
        if (autoClicker.isUnlocked && state.currency.gold >= autoClicker.unlockCost) {
            dispatch({ type: 'BUY_AUTO_CLICKER', payload: autoClicker.id });
        }
    };

    return (
        <div className="p-5 m-15">
            {/* top section*/}
            <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Total <b>Bredd🍞</b> Per Second</h2>
                <div className="flex flex-col flex-wrap gap-4">
                    {state.autoClickers.reduce((total, clicker) => ({
                        gold: total.gold + (clicker.currencyPerSecond.gold * clicker.quantity),
                        silver: total.silver + (clicker.currencyPerSecond.silver * clicker.quantity),
                        bronze: total.bronze + (clicker.currencyPerSecond.bronze * clicker.quantity)
                    }), {gold: 0, silver: 0, bronze: 0}).gold > 0 && (
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-600 font-bold">Stonks:</span>
                            <span className="text-black">+{state.autoClickers.reduce((total, clicker) =>
                                total + (clicker.currencyPerSecond.gold * clicker.quantity), 0)}/s</span>
                        </div>
                    )}
                    {state.autoClickers.reduce((total, clicker) => ({
                        gold: total.gold + (clicker.currencyPerSecond.gold * clicker.quantity),
                        silver: total.silver + (clicker.currencyPerSecond.silver * clicker.quantity),
                        bronze: total.bronze + (clicker.currencyPerSecond.bronze * clicker.quantity)
                    }), {gold: 0, silver: 0, bronze: 0}).silver > 0 && (
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 font-bold">Loaf:</span>
                            <span className="text-black">+{state.autoClickers.reduce((total, clicker) =>
                                total + (clicker.currencyPerSecond.silver * clicker.quantity), 0)}/s</span>
                        </div>
                    )}
                    {state.autoClickers.reduce((total, clicker) => ({
                        gold: total.gold + (clicker.currencyPerSecond.gold * clicker.quantity),
                        silver: total.silver + (clicker.currencyPerSecond.silver * clicker.quantity),
                        bronze: total.bronze + (clicker.currencyPerSecond.bronze * clicker.quantity)
                    }), {gold: 0, silver: 0, bronze: 0}).bronze > 0 && (
                        <div className="flex items-center gap-2">
                            <span className="text-amber-700 font-bold">Dough:</span>
                            <span className="text-black">+{state.autoClickers.reduce((total, clicker) =>
                                total + (clicker.currencyPerSecond.bronze * clicker.quantity), 0)}/s</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-full mx-auto">
                {state.autoClickers.map(autoClicker => (
                    <div 
                        key={autoClicker.id} 
                        className={`rounded-lg p-4 flex flex-col items-center gap-3 
                            shadow-md transition-transform duration-200 hover:-translate-y-1
                            relative ${autoClicker.isUnlocked ? 'bg-white' : 'bg-amber-400'}`}
                    >
                        {/* Quantity Badge */}
                        {autoClicker.isUnlocked && autoClicker.quantity > 0 && (
                            <div className="absolute top-2 right-2 bg-blue-500 text-white 
                                rounded-full w-8 h-8 flex items-center justify-center 
                                font-bold shadow-md">
                                {autoClicker.quantity}
                            </div>
                        )}

                        <div className="w-24 h-24 bg-green-500 rounded-lg"></div>
                        <h3 className="text-lg font-semibold text-gray-800 m-0">
                            {autoClicker.name}
                        </h3>

                        <div className="flex flex-col items-center gap-1">
                            <p className="text-sm font-medium text-gray-700">Per Second:</p>
                            {autoClicker.currencyPerSecond.gold > 0 && (
                                <p className="text-sm text-gray-600 m-0">
                                    Stonks: +{autoClicker.currencyPerSecond.gold}
                                </p>
                            )}
                            {autoClicker.currencyPerSecond.silver > 0 && (
                                <p className="text-sm text-gray-600 m-0">
                                    Loaf: +{autoClicker.currencyPerSecond.silver}
                                </p>
                            )}
                            {autoClicker.currencyPerSecond.bronze > 0 && (
                                <p className="text-sm text-gray-600 m-0">
                                    Dough: +{autoClicker.currencyPerSecond.bronze}
                                </p>
                            )}
                        </div>

                        {/* Show different buttons based on unlock status */}
                        {!autoClicker.isUnlocked ? (
                            <button
                                onClick={() => handleUnlock(autoClicker)}
                                disabled={state.currency.gold < autoClicker.unlockCost}
                                className={`w-full py-2 px-4 rounded font-semibold
                                    transform transition-all duration-100 active:scale-95
                                    bg-blue-500 hover:bg-blue-600 text-white 
                                    active:bg-blue-700 shadow-lg hover:shadow-xl 
                                    active:shadow-md disabled:opacity-50 
                                    disabled:cursor-not-allowed disabled:transform-none 
                                    disabled:hover:bg-blue-500`}
                            >
                                Unlock ({autoClicker.unlockCost} stonks)
                            </button>
                        ) : (
                            <button
                                onClick={() => handleBuy(autoClicker)}
                                disabled={state.currency.gold < autoClicker.unlockCost}
                                className={`w-full py-2 px-4 rounded font-semibold
                                    transform transition-all duration-100 active:scale-95
                                    bg-green-500 hover:bg-green-600 text-white 
                                    active:bg-green-700 shadow-lg hover:shadow-xl 
                                    active:shadow-md disabled:opacity-50 
                                    disabled:cursor-not-allowed disabled:transform-none 
                                    disabled:hover:bg-green-500`}
                            >
                                Buy More ({autoClicker.unlockCost} stonks)
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
