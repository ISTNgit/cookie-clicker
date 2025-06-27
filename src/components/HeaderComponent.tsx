// src/components/Header.tsx
import React from 'react';
import { useGame } from '../context/GameContextProvider';

export const Header: React.FC = () => {
    const {state, dispatch} = useGame();

    const clearGameState = () => {
        localStorage.removeItem("clicker_game_save");
        dispatch({type: 'RESET_STATE'});
    };

    return (
        <header className="bg-amber-900 text-[#FDF6ED] p-4 shadow-md max-w-screen z-50">
            <div className="max-w-full mx-auto flex justify-end gap-6 pr-5">
                <div className="flex items-center gap-2">
                    <span className="font-bold">Stonks 📈:</span>
                    <span className="text-lg">{Math.floor(state.currency.gold)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-bold">Loaf ✨:</span>
                    <span className="text-lg">{Math.floor(state.currency.silver)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-bold">Dough 🍞:</span>
                    <span className="text-lg">{Math.floor(state.currency.bronze)}</span>
                </div>
                {import.meta.env.VITE_ENV_NAME === 'DEV' && (
                    <button
                        onClick={clearGameState}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                    >
                        Clear Data
                    </button>
                )}
            </div>
        </header>
    );
};