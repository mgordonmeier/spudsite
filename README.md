# Spudsite

A playful React site for the **Spud band** featuring games, merch, music, shows, and band member info. Built with [Create React App](https://github.com/facebook/create-react-app) and React Router for navigation.

## Quick Start

### Prerequisites
- Node.js 16+ and npm (or yarn)

### Install and develop

```bash
npm install
npm start
```

The app opens at `http://localhost:3000` and hot-reloads when you save changes.

### Build for production

```bash
npm run build
```

The optimized build is output to the `build/` folder. Filenames include content hashes for cache-busting.

### Serve production build locally (optional)

```bash
npm install -g serve
serve -s build
```

## Project Structure

```
spudsite/
├── public/              # Static HTML, meta tags, favicons
├── src/
│   ├── components/      # Organized React components by feature
│   │   ├── games/       # 🎮 Game components (Spudcraft, Get To The Venue)
│   │   │   ├── MApp.js
│   │   │   ├── GTVenue.js
│   │   │   ├── Games.js
│   │   │   ├── MApp-components/    # 3D MApp sub-components & hooks
│   │   │   │   ├── Cube.js
│   │   │   │   ├── Cubes.js
│   │   │   │   ├── FPV.js (first-person view)
│   │   │   │   ├── Ground.js
│   │   │   │   ├── Menu.js
│   │   │   │   ├── Player.js
│   │   │   │   ├── TextureSelector.js
│   │   │   │   └── hooks/
│   │   │   │       ├── useKeyboard.js
│   │   │   │       └── useStore.js
│   │   │   ├── GTVenue/            # Game board utilities and notifications
│   │   │   │   ├── constants.js
│   │   │   │   ├── gameUtils.js
│   │   │   │   ├── pathfinding.js
│   │   │   │   ├── Notification.js
│   │   │   │   ├── Gameboard.css
│   │   │   │   └── Notification.css
│   │   │   └── MApp.css
│   │   ├── merch/       # 🛍️ Merchandise shop
│   │   │   ├── Merch.js
│   │   │   ├── MerchCard.js
│   │   │   ├── merchData.js
│   │   │   ├── inventory.js
│   │   │   ├── Merch.css
│   │   │   └── MerchCard.css
│   │   ├── pages/       # 📄 Main page-level components
│   │   │   ├── Home.js
│   │   │   ├── Shows.js
│   │   │   ├── Music.js
│   │   │   ├── Spuds.js (band members)
│   │   │   ├── Contact.js
│   │   │   ├── PhotoGallery.js
│   │   │   ├── WanderingSpuddie.js
│   │   │   ├── Home.css
│   │   │   ├── Music.css
│   │   │   ├── Shows.css
│   │   │   ├── Spuds.css
│   │   │   ├── Contact.css
│   │   │   ├── PhotoGallery.css
│   │   │   └── WanderingSpuddie.css
│   │   ├── ui/          # 🎨 Shared UI components
│   │   │   ├── NavBar.js
│   │   │   ├── FooterLinks.js
│   │   │   ├── SongSymbol.js
│   │   │   ├── MemberPanel.js
│   │   │   ├── Chatbox.js
│   │   │   └── NotFound.js
│   │   └── shared/      # 🔧 Shared hooks and resources
│   │       ├── hooks/
│   │       │   ├── useVenue.js
│   │       │   └── useObstacles.js
│   │       └── images/
│   │           ├── images.js (imports)
│   │           ├── textures.js (Three.js textures)
│   │           ├── dirt.jpg
│   │           ├── grass.jpg
│   │           ├── glass.jpg
│   │           ├── log.jpg
│   │           └── wood.png
│   ├── styles/          # Global styles
│   │   └── Contact.css
│   ├── img/             # Media assets (photos, logos, GIFs)
│   │   ├── band_pix/
│   │   ├── old_show_posters/
│   │   └── Orbz/
│   ├── App.js           # Router setup, main layout
│   ├── App.css
│   ├── index.js         # React entry point
│   ├── index.css
│   └── styles.css
├── build/               # Production build output (generated)
├── package.json
└── buildspec.yml        # AWS CodeBuild configuration
```

## Key Features

- **🎮 Games**
  - **Spudcraft**: 3D Minecraft-style game using Three.js with first-person movement
  - **Get To The Venue**: A roguelike-style game where you navigate obstacles to reach random venues
- **🛍️ Merch Shop**: Browse and manage merchandise inventory with cart functionality
- **🎵 Music**: Showcase songs with embedded YouTube players
- **🎭 Pages**: Home, band members (Spuds), shows, contact, photo gallery
- **🎨 UI**: Responsive nav, footer, member panels, custom song symbols

## Tech Stack

- **React 18** with React Router for navigation
- **Three.js & @react-three/fiber** for 3D graphics
- **Shader Gradient** for animated background
- **Bootstrap** for UI components and grid
- **CSS** for component-level styles

## Development

### Running the dev server

```bash
npm start
```

Hot module reloading is enabled — changes reflect instantly in the browser.

### Linting & build checks

```bash
npm run build
```

This runs ESLint and produces a production-optimized bundle. Build succeeds with minor lint warnings (unused variables, accessibility hints) that are non-blocking.

### Project conventions

- **Component files**: Pascal case (e.g., `NavBar.js`)
- **Utility files**: camelCase (e.g., `gameUtils.js`, `useVenue.js`)
- **Styles**: Co-located with components (`ComponentName.css`)
- **Imports**: Use relative paths within feature folders; absolute imports from `src/` are preferred for cross-feature imports
- **Custom hooks**: Placed in `shared/hooks/` when used across multiple features

## Component Import Patterns

```javascript
// Same feature
import { Player } from './MApp-components/Player';

// Cross-feature (shared)
import { useVenue } from '../shared/hooks/useVenue';
import FooterLinks from '../ui/FooterLinks';

// Root-level
import App from './App';
```

## Deployment

The app is configured for AWS CodeBuild (see `buildspec.yml`). To deploy:

1. Push to the target branch (usually `main`)
2. CodeBuild triggers a build, runs `npm run build`, and uploads to S3

For local testing before deployment:

```bash
npm run build
serve -s build
```

## Common Tasks

### Add a new page
1. Create `src/components/pages/NewPage.js`
2. Add a corresponding `NewPage.css`
3. Import in `App.js` and add a route:
   ```javascript
   import NewPage from './components/pages/NewPage';
   // ...
   <Route path="/newpage" element={<NewPage />} />
   ```

### Add a new game component
1. Create `src/components/games/NewGame.js` and `NewGame.css`
2. If it has sub-components, create a folder: `src/components/games/NewGame/`
3. Import and register in `Games.js`

### Add a shared utility or hook
1. Create in `src/components/shared/` (hooks or images)
2. Import where needed: `import { useMyHook } from '../shared/hooks/useMyHook'`

## Troubleshooting

**Build fails or app doesn't start**
- Delete `node_modules` and lock files, then run `npm install`
- Check Node.js version: `node --version` (needs 16+)

**Port 3000 already in use**
- Kill the process: `lsof -i :3000`, then `kill -9 <PID>`
- Or run on a different port: `PORT=3001 npm start`

**Styles not applying**
- Ensure CSS is imported in the component file
- Check class names match between JSX and CSS
- Clear browser cache or do a hard refresh (Cmd+Shift+R)

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make small, focused commits
3. Test locally: `npm start` and `npm run build`
4. Open a pull request with a clear description

## Notes

- The app uses a fixed shader gradient background for a modern visual effect
- Game components use React Three Fiber for 3D rendering
- Merch inventory is stored locally (no persistent backend)
- Media assets are organized by type in `src/img/`

---

**Last updated**: June 2026  
Structure organized for scalability and maintainability. Build verified with zero errors.
