# Component Organization

This directory contains all React components organized by functionality for better navigation and maintainability.

## Folder Structure

### `/merch/` - Merchandise Components
All components and data related to the merchandise system:
- `Merch.js` - Main merchandise page component
- `MerchCard.js` - Individual merchandise card component
- `Merch.css` - Styles for merchandise page
- `MerchCard.css` - Styles for merchandise cards
- `inventory.js` - Inventory management utilities
- `merchData.js` - Merchandise data and categories

### `/games/` - Game Components
All interactive game components and their dependencies:
- `Games.js` - Main games page component
- `MApp.js` - 3D Minecraft-style game component
- `GTVenue.js` - Game board component
- `MApp.css` - Styles for MApp game
- `/GTVenue/` - Game board sub-components and utilities
- `/MApp-components/` - 3D game sub-components and hooks

### `/pages/` - Main Page Components
All main page-level components:
- `Home.js` - Homepage component
- `Shows.js` - Shows/events page component
- `Music.js` - Music page component
- `Spuds.js` - Band members page component
- `Contact.js` - Contact page component
- `WanderingSpuddie.js` - Interactive spuddie component
- `PhotoGallery.js` - Photo gallery component
- Associated CSS files for each component

### `/ui/` - Reusable UI Components
Shared UI components used across multiple pages:
- `NavBar.js` - Navigation bar component
- `FooterLinks.js` - Footer links component
- `SongSymbol.js` - Song symbol wrapper component
- `MemberPanel.js` - Band member panel component
- `Chatbox.js` - Chat interface component
- `NotFound.js` - 404 page component

### `/shared/` - Shared Resources
Shared utilities, hooks, and assets:
- `/hooks/` - Custom React hooks
- `/images/` - Shared image assets and textures

## Benefits of This Organization

1. **Logical Grouping**: Components are grouped by functionality rather than scattered randomly
2. **Easy Navigation**: Related components are co-located for easier development
3. **Clear Dependencies**: Import paths clearly show component relationships
4. **Scalability**: New components can be easily added to appropriate folders
5. **Maintainability**: Related code changes are likely to be in the same folder

## Import Paths

After reorganization, import paths follow this pattern:
- `../ui/ComponentName` - For UI components
- `../pages/ComponentName` - For page components
- `../merch/ComponentName` - For merchandise components
- `../games/ComponentName` - For game components
- `../shared/hooks/useHookName` - For shared hooks
- `../shared/images/imageName` - For shared images 