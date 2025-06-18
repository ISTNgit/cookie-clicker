// src/utils/currencyConverter.ts
export const convertCurrency = (
    bronze: number,
    silver: number,
    gold: number
): { bronze: number; silver: number; gold: number } => {
    let totalBronze = bronze;
    let totalSilver = silver;
    let totalGold = gold;

    // Convert bronze to silver
    if (totalBronze >= 10) {
        const newSilver = Math.floor(totalBronze / 10);
        totalBronze = totalBronze % 10;
        totalSilver += newSilver;
    }

    // Convert silver to gold
    if (totalSilver >= 10) {
        const newGold = Math.floor(totalSilver / 10);
        totalSilver = totalSilver % 10;
        totalGold += newGold;
    }

    return {
        bronze: totalBronze,
        silver: totalSilver,
        gold: totalGold
    };
};