// Merchandise data file - update inventory here
// Add new items by copying the structure and updating the details

// Import images
import hillsideSunsetSymbol from "../img/HillsideSunsetSongSymbol.png";
import hillsideSunsetArt from "../img/HillsideSunsetArtBackground.jpg";
import funkNJump from "../img/FunkNJump.gif";
import freshSpudsCover from "../img/FreshSpudsCover.jpg";
import spuddieMax from "../img/spuddie-max.PNG";
import spuddieMarty from "../img/spuddie-marty.PNG";
import spuddieThomas from "../img/spuddie-thomas.PNG";
import spuddieJustin from "../img/spuddie-justin2.PNG";
import spuddieChristian from "../img/spuddie-christian.PNG";
import spuddieKrystal from "../img/spuddie-krystal.PNG";
import spuddieNick from "../img/spuddie-nick.PNG";
import spuddieKeys from "../img/spuddie-keys.PNG";
import harmonizeSymbol from "../img/HarmonizeSongSymbol.png";
import mountainSongSymbol from "../img/MountainSongSymbol.png";
import mangoJamSymbol from "../img/MangoJamSongSymbol.png";
import intoFocus3 from "../img/into focus 3.jpg";
import ramseyAdventureCabin from "../img/RamseyAdventureCabin.jpg";
import harmonizeAlbumArt from "../img/HarmonizeAlbumArt.jpeg";
import spudsTour25 from "../img/spudsTour25.png";
import worldTourShirts from "../img/WorldTourShirts.JPEG";
import worldTourPatch from "../img/WorldTourPatch.JPG";
import handwrittenLyrics from "../img/HandwrittenLyrics.jpeg";

export const MERCH_CATEGORIES = {
    shirts: "Shirts",
    cds: "CDs",
    stickers: "Stickers",
    lyrics: "Handwritten Lyrics"
};

export const MERCH_ITEMS = {
    // World Tour Shirts - Each color is a separate item
    worldTourShirtLightBlue: {
        id: "worldTourShirt-lightBlue",
        name: "World Tour Shirt 2025 - Light Blue",
        category: MERCH_CATEGORIES.shirts,
        price: 25,
        description: "Comfortable cotton t-shirt featuring the 2025 World Tour design in light blue. Perfect for showing your spud love on the road!",
        sizes: ["S", "M", "L", "XL", "XXL"],
        color: "Light Blue",
        images: [
            {
                src: worldTourShirts,
                alt: "World Tour Shirt Light Blue",
                isPrimary: true
            }
        ],
        featured: false,
        comingSoon: true
    },
    
    worldTourShirtChinaBlue: {
        id: "worldTourShirt-chinaBlue",
        name: "World Tour Shirt 2025 - China Blue",
        category: MERCH_CATEGORIES.shirts,
        price: 25,
        description: "Comfortable cotton t-shirt featuring the 2025 World Tour design in china blue. Perfect for showing your spud love on the road!",
        sizes: ["S", "M", "L", "XL", "XXL"],
        color: "China Blue",
        images: [
            {
                src: worldTourShirts,
                alt: "World Tour Shirt China Blue",
                isPrimary: true
            }
        ],
        featured: false,
        comingSoon: true
    },
    
    worldTourShirtIvory: {
        id: "worldTourShirt-ivory",
        name: "World Tour Shirt 2025 - Ivory",
        category: MERCH_CATEGORIES.shirts,
        price: 25,
        description: "Comfortable cotton t-shirt featuring the 2025 World Tour design in ivory. Perfect for showing your spud love on the road!",
        sizes: ["S", "M", "L", "XL", "XXL"],
        color: "Ivory",
        images: [
            {
                src: worldTourShirts,
                alt: "World Tour Shirt Ivory",
                isPrimary: true
            }
        ],
        featured: false,
        comingSoon: true
    },
    

    
    worldTourShirtTerracotta: {
        id: "worldTourShirt-terracotta",
        name: "World Tour Shirt 2025 - Terracotta",
        category: MERCH_CATEGORIES.shirts,
        price: 25,
        description: "Comfortable cotton t-shirt featuring the 2025 World Tour design in terracotta. Perfect for showing your spud love on the road!",
        sizes: ["S", "M", "L", "XL", "XXL"],
        color: "Terracotta",
        images: [
            {
                src: worldTourShirts,
                alt: "World Tour Shirt Terracotta",
                isPrimary: true
            }
        ],
        featured: false,
        comingSoon: true
    },

    // CDs
    intoFocusCD: {
        id: "intoFocusCD",
        name: "Into Focus CD",
        category: MERCH_CATEGORIES.cds,
        price: 15,
        description: "Our latest album 'Into Focus' featuring the newest of your favorite spud tunes. Includes digital download code.",
        images: [
            {
                src: intoFocus3,
                alt: "Into Focus CD",
                isPrimary: true
            }
        ],
        featured: true
    },

    ramseyAdventureCabinCD: {
        id: "ramseyAdventureCabinCD",
        name: "Ramsey Adventure Cabin CD",
        category: MERCH_CATEGORIES.cds,
        price: 12,
        description: "Limited edition CD featuring the Ramsey Adventure Cabin sessions.",
        images: [
            {
                src: ramseyAdventureCabin,
                alt: "Ramsey Adventure Cabin CD",
                isPrimary: true
            }
        ],
        featured: false
    },

    harmonizeCD: {
        id: "harmonizeCD",
        name: "Harmonize CD",
        category: MERCH_CATEGORIES.cds,
        price: 10,
        description: "Originally released in 2018 and again in 2020 after additions to the band and musicial revisions, this is where it all started.",
        images: [
            {
                src: harmonizeAlbumArt,
                alt: "Harmonize CD",
                isPrimary: true
            }
        ],
        featured: false
    },

    // Stickers
    worldTourSticker: {
        id: "worldTourSticker",
        name: "World Tour Sticker",
        category: MERCH_CATEGORIES.stickers,
        price: 3,
        description: "Vinyl sticker featuring the 2025 World Tour design. Show your spud spirit everywhere!",
        images: [
            {
                src: spudsTour25,
                alt: "World Tour Sticker",
                isPrimary: true
            }
        ],
        featured: true
    },

    harmonizeSticker: {
        id: "harmonizeSticker",
        name: "Harmonize Sticker",
        category: MERCH_CATEGORIES.stickers,
        price: 3,
        description: "Vinyl sticker featuring the Harmonize design. Perfect for laptops, water bottles, and more!",
        images: [
            {
                src: harmonizeAlbumArt,
                alt: "Harmonize Sticker",
                isPrimary: true
            }
        ],
        featured: false
    },

    ramseyAdventureCabinSticker: {
        id: "ramseyAdventureCabinSticker",
        name: "Ramsey Adventure Cabin Sticker",
        category: MERCH_CATEGORIES.stickers,
        price: 3,
        description: "Vinyl sticker featuring the Ramsey Adventure Cabin design. Perfect for laptops, water bottles, and more!",
        images: [
            {
                src: ramseyAdventureCabin,
                alt: "Ramsey Adventure Cabin Sticker",
                isPrimary: true
            }
        ],
        featured: false
    },

    // Spuddie Stickers - One for each spud
    spuddieStickerMax: {
        id: "spuddieSticker-max",
        name: "Max Spuddie Sticker",
        category: MERCH_CATEGORIES.stickers,
        price: 3,
        description: "Vinyl sticker featuring Max's spuddie design. Collect all the spuddies!",
        images: [
            {
                src: spuddieMax,
                alt: "Max Spuddie Sticker",
                isPrimary: true
            }
        ],
        featured: false
    },

    spuddieStickerMartin: {
        id: "spuddieSticker-martin",
        name: "Martin Spuddie Sticker",
        category: MERCH_CATEGORIES.stickers,
        price: 3,
        description: "Vinyl sticker featuring Martin's spuddie design. Collect all the spuddies!",
        images: [
            {
                src: spuddieMarty,
                alt: "Martin Spuddie Sticker",
                isPrimary: true
            }
        ],
        featured: false
    },

    spuddieStickerThomas: {
        id: "spuddieSticker-thomas",
        name: "Thomas Spuddie Sticker",
        category: MERCH_CATEGORIES.stickers,
        price: 3,
        description: "Vinyl sticker featuring Thomas's spuddie design. Collect all the spuddies!",
        images: [
            {
                src: spuddieThomas,
                alt: "Thomas Spuddie Sticker",
                isPrimary: true
            }
        ],
        featured: false
    },

    spuddieStickerJustin: {
        id: "spuddieSticker-justin",
        name: "Justin Spuddie Sticker",
        category: MERCH_CATEGORIES.stickers,
        price: 3,
        description: "Vinyl sticker featuring Justin's spuddie design. Collect all the spuddies!",
        images: [
            {
                src: spuddieJustin,
                alt: "Justin Spuddie Sticker",
                isPrimary: true
            }
        ],
        featured: false
    },

    spuddieStickerChristian: {
        id: "spuddieSticker-christian",
        name: "Christian Spuddie Sticker",
        category: MERCH_CATEGORIES.stickers,
        price: 3,
        description: "Vinyl sticker featuring Christian's spuddie design. Collect all the spuddies!",
        images: [
            {
                src: spuddieChristian,
                alt: "Christian Spuddie Sticker",
                isPrimary: true
            }
        ],
        featured: false
    },

    spuddieStickerKrystal: {
        id: "spuddieSticker-krystal",
        name: "Krystal Spuddie Sticker",
        category: MERCH_CATEGORIES.stickers,
        price: 3,
        description: "Vinyl sticker featuring Krystal's spuddie design. Collect all the spuddies!",
        images: [
            {
                src: spuddieKrystal,
                alt: "Krystal Spuddie Sticker",
                isPrimary: true
            }
        ],
        featured: false
    },

    spuddieStickerNick: {
        id: "spuddieSticker-nick",
        name: "Nick Spuddie Sticker",
        category: MERCH_CATEGORIES.stickers,
        price: 3,
        description: "Vinyl sticker featuring Nick's spuddie design. Collect all the spuddies!",
        images: [
            {
                src: spuddieNick,
                alt: "Nick Spuddie Sticker",
                isPrimary: true
            }
        ],
        featured: false
    },

    spuddieStickerKeys: {
        id: "spuddieSticker-keys",
        name: "Keys Spuddie Sticker",
        category: MERCH_CATEGORIES.stickers,
        price: 3,
        description: "Vinyl sticker featuring Keys's spuddie design. Collect all the spuddies!",
        images: [
            {
                src: spuddieKeys,
                alt: "Keys Spuddie Sticker",
                isPrimary: true
            }
        ],
        featured: false
    },

    // Patches
    worldTourPatch: {
        id: "worldTourPatch",
        name: "World Tour Patch",
        category: MERCH_CATEGORIES.stickers,
        price: 10,
        description: "Embroidered patch featuring the 2025 World Tour design. Perfect for jackets, backpacks, or anywhere you want to show your spud pride! Non-adhesive backing.",
        images: [
            {
                src: worldTourPatch,
                alt: "World Tour Patch",
                isPrimary: true
            }
        ],
        featured: true
    },

    // Handwritten Lyrics
    handwrittenLyrics: {
        id: "handwrittenLyrics",
        name: "Handwritten Lyrics",
        category: MERCH_CATEGORIES.lyrics,
        price: 25,
        description: "Get your favorite Funk N Spuds song lyrics handwritten by the band. Specify your song choice in the cart. A unique piece of spud memorabilia!",
        images: [
            {
                src: handwrittenLyrics,
                alt: "Handwritten Lyrics",
                isPrimary: true
            }
        ],
        featured: true
    }
};

// Helper functions
export const getItemsByCategory = (category) => {
    return Object.values(MERCH_ITEMS).filter(item => item.category === category);
};

export const getFeaturedItems = () => {
    return Object.values(MERCH_ITEMS).filter(item => item.featured);
};

export const getInStockItems = () => {
    return Object.values(MERCH_ITEMS).filter(item => {
        // For shirts, check if any size is in stock
        if (item.sizes) {
            return item.sizes.some(size => {
                const { isInStock } = require('./inventory');
                return isInStock(item.id, size);
            });
        }
        // For other items, check default stock
        const { isInStock } = require('./inventory');
        return isInStock(item.id);
    });
}; 