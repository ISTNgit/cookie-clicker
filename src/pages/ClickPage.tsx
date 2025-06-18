// src/pages/ClickPage.tsx
import React from 'react';
import { useGame } from '../context/GameContextProvider';
import type { Clicker } from "../@types/ClickerAutoClickerTypes.ts";
import {ChatComponent} from "../components/Chat.tsx";
import {COIN_ID} from "../data/config.tsx";

export const ClickPage: React.FC = () => {
    const { state, dispatch } = useGame();

    const handleClick = (clicker: Clicker) => {
        if (clicker.isUnlocked) {
            // Add currency based on clicker's amount
            dispatch({ 
                type: 'ADD_CURRENCY', 
                payload: {
                    gold: clicker.currencyPerClick.gold,
                    silver: clicker.currencyPerClick.silver,
                    bronze: clicker.currencyPerClick.bronze
                } 
            });
        } else if (state.currency.gold >= clicker.unlockCost) {
            dispatch({ type: 'UNLOCK_CLICKER', payload: clicker.id });
        }
    };

    return (
        <div className="p-5 m-15">
            <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto">
                {state.clickers.map(clicker => (
                    <div 
                        key={clicker.id} 
                        className={` rounded-lg p-4 flex flex-col items-center gap-3 
                            shadow-md transition-transform duration-200 hover:-translate-y-1
                            ${clicker.isUnlocked ? 'bg-[#F5E1C1]' : 'bg-amber-400'}`}
                    >
                        <div className="w-24 h-24 bg-green-500 rounded-lg"></div>
                        <h3 className="text-lg font-semibold text-gray-800 m-0">
                            {clicker.name}
                        </h3>
                        <div className="flex flex-col items-center gap-1">
                            {clicker.currencyPerClick.gold > 0 && (
                                <p className="text-sm text-gray-600 m-0">
                                    Stonks: +{clicker.currencyPerClick.gold}/click
                                </p>
                            )}
                            {clicker.currencyPerClick.silver > 0 && (
                                <p className="text-sm text-gray-600 m-0">
                                    Loaf: +{clicker.currencyPerClick.silver}/click
                                </p>
                            )}
                            {clicker.currencyPerClick.bronze > 0 && (
                                <p className="text-sm text-gray-600 m-0">
                                    Dough: +{clicker.currencyPerClick.bronze}/click
                                </p>
                            )}
                        </div>
                        <button 
                            onClick={() => handleClick(clicker)}
                            disabled={state.currency.gold < clicker.unlockCost && !clicker.isUnlocked}
                            className={`w-full py-2 px-4 rounded font-semibold transform transition-all duration-100 active:scale-95
        ${clicker.isUnlocked 
            ? 'bg-green-500 hover:bg-green-600 text-white active:bg-green-700 shadow-lg hover:shadow-xl active:shadow-md' 
            : 'bg-blue-500 hover:bg-blue-600 text-white active:bg-blue-700 shadow-lg hover:shadow-xl active:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none '}`}
                        >
                            {clicker.isUnlocked 
                                ? 'Click!' 
                                : `Unlock (${clicker.unlockCost} stonks)`}
                        </button>
                    </div>
                ))}
            </div>
            <ChatComponent coinId={COIN_ID} />
        </div>
    );
};