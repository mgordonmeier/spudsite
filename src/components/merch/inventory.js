// Inventory tracking file - update stock levels here
// This file tracks the actual inventory for each item variant

export const INVENTORY = {
    // World Tour Shirt 2025 - Light Blue
    "worldTourShirt-lightBlue": {
        S: 8,
        M: 12,
        L: 10,
        XL: 6,
        XXL: 3
    },
    
    // World Tour Shirt 2025 - China Blue
    "worldTourShirt-chinaBlue": {
        S: 6,
        M: 10,
        L: 8,
        XL: 5,
        XXL: 2
    },
    
    // World Tour Shirt 2025 - Ivory
    "worldTourShirt-ivory": {
        S: 7,
        M: 11,
        L: 9,
        XL: 5,
        XXL: 3
    },
    

    
    // World Tour Shirt 2025 - Terracotta
    "worldTourShirt-terracotta": {
        S: 6,
        M: 9,
        L: 8,
        XL: 4,
        XXL: 2
    },
    
    // CDs
    "intoFocusCD": {
        default: 50
    },
    
    "ramseyAdventureCabinCD": {
        default: 20
    },
    
    "harmonizeCD": {
        default: 20
    },
    
    // Stickers
    "worldTourSticker": {
        default: 75
    },
    
    "harmonizeSticker": {
        default: 40
    },
    
    "ramseyAdventureCabinSticker": {
        default: 1
    },
    
    "spuddieSticker-max": {
        default: 100
    },
    
    "spuddieSticker-martin": {
        default: 100
    },
    
    "spuddieSticker-thomas": {
        default: 100
    },
    
    "spuddieSticker-justin": {
        default: 100
    },
    
    "spuddieSticker-christian": {
        default: 100
    },
    
    "spuddieSticker-krystal": {
        default: 100
    },
    
    "spuddieSticker-nick": {
        default: 100
    },
    
    "spuddieSticker-keys": {
        default: 100
    },
    
    "worldTourPatch": {
        default: 10
    },
    
    "handwrittenLyrics": {
        default: 50
    }
};

// Helper functions
export const getStockLevel = (itemId, size = 'default') => {
    const item = INVENTORY[itemId];
    if (!item) return 0;
    return item[size] || 0;
};

export const isInStock = (itemId, size = 'default') => {
    return getStockLevel(itemId, size) > 0;
};

export const getAvailableSizes = (itemId) => {
    const item = INVENTORY[itemId];
    if (!item) return [];
    return Object.keys(item).filter(size => item[size] > 0);
};

export const getAvailabilityStatus = (itemId, size = 'default') => {
    const stockLevel = getStockLevel(itemId, size);
    if (stockLevel === 0) return 'out';
    if (stockLevel <= 3) return 'low';
    return 'available';
};

export const updateStock = (itemId, size, quantity) => {
    if (INVENTORY[itemId]) {
        if (INVENTORY[itemId][size] !== undefined) {
            INVENTORY[itemId][size] = Math.max(0, quantity);
        }
    }
};

export const decrementStock = (itemId, size) => {
    if (INVENTORY[itemId] && INVENTORY[itemId][size] !== undefined) {
        INVENTORY[itemId][size] = Math.max(0, INVENTORY[itemId][size] - 1);
    }
}; 