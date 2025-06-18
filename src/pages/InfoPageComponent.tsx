// src/pages/InfoPage.tsx
import React from 'react';

export const InfoPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-900/20 px-4">
            <div className="max-w-2xl w-full bg-amber-900/50 rounded-lg shadow-xl p-8 m-4 text-[#FDF6ED]">
                <h2 className="text-3xl font-bold mb-6 text-center">About The Developer</h2>
                
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">PumpLabs Inc.</h3>
                    <p className="text-lg mb-4">
                        We specialize in creating engaging web3 experiences and innovative DeFi solutions. 
                        Our mission is to make blockchain technology accessible and fun through gamification.
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                    
                    <a 
                        href="https://t.me/pumplabs" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-amber-800/50 rounded-lg hover:bg-amber-800/70 transition-colors"
                    >
                        <svg 
                            className="w-6 h-6"
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                        >
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.48-.428-.009-1.252-.241-1.865-.44-.756-.244-1.359-.374-1.307-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.119.098.152.228.164.336.014.123.027.387.016.597z"/>
                        </svg>
                        <span>Join our Telegram Community</span>
                    </a>

                    <a 
                        href="https://twitter.com/pumplabsinc" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-amber-800/50 rounded-lg hover:bg-amber-800/70 transition-colors"
                    >
                        <svg 
                            className="w-6 h-6"
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                        >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        <span>Follow us on X (Twitter)</span>
                    </a>
                </div>

                <div className="mt-8 pt-6 border-t border-amber-800/30 text-sm text-center text-[#FDF6ED]/70">
                    <p>© 2024 PumpLabs Inc. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};