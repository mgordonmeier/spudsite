# Wandering Spuddie Gap Analysis & Action Plan

Date: 2026-06-16

Purpose: track the work needed to turn the existing `WanderingSpuddie` prototype into a site-wide, desktop-first, Clippy-like companion for Funk N Spuds.

## Product Direction

Spuddie should feel like a living site companion:
- Present across all pages, not only the home page.
- Desktop-first for the first implementation pass.
- Wanders around the page on its own.
- Pauses near interesting page elements.
- Avoids covering important controls and content, while allowing slight playful edge overlap during movement.
- Can be disabled and re-enabled by visitors, likely from a button near the navbar.
- Uses the existing directional assets for now:
  - `src/img/SpudFront.png`
  - `src/img/SpudBack.png`
  - `src/img/SpudLeft.png`
  - `src/img/SpudRight.png`
- Later, clicking Spuddie should open a chat box styled like the existing song cards.

## Current State

| Area | Status | Notes |
|------|--------|-------|
| Existing component | PARTIAL | `src/components/spuddie/WanderingSpuddie.js` exists but is not mounted. |
| Existing styles | PARTIAL | `src/components/spuddie/WanderingSpuddie.css` exists but needs cleanup for site-wide behavior. |
| App integration | DONE | `WanderingSpuddie` is mounted once in `App.js` and receives the enabled state. |
| Asset imports | DONE | Directional image imports now resolve through `../../img/...`. |
| Site-wide enable/disable | DONE | Navbar-adjacent toggle persists the visitor preference in `localStorage`. |
| Desktop movement | PARTIAL | Random wandering, pauses, visible-page bounds, and basic avoidance are implemented; still needs user review/tuning. |
| Interesting-element behavior | MISSING | No target system exists for song symbols, cards, nav items, media, or other points of interest. |
| Song card reaction | PARTIAL | Song cards emit open/close events and Spuddie moves near the opened card edge. |
| Cursor chase/avoid mode | MISSING | Prototype has mouse-follow logic, but it is not attached to events or a trigger mode. |
| Chat behavior | PLACEHOLDER | `Chatbox.js` is mock-only and not styled like song cards yet. |
| Accessibility | PARTIAL | Reduced-motion handling and keyboard-accessible toggle are implemented; future chat needs focus management. |
| Mobile strategy | DEFERRED | Initial pass should focus on desktop; mobile behavior can be designed after desktop feels right. |

## Known Technical Gaps

1. Component placement
   - Move from page-local concept to app-shell companion.
   - Preferred integration point: render once inside `App.js`, after `NavBar` and routes or as an overlay sibling within `BrowserRouter`.
   - Keep it independent from individual pages where possible.

2. Asset path fixes
   - Fix directional PNG imports before enabling the component.
   - Keep using existing assets until behavior is proven.

3. Movement model
   - Replace interval-only random stepping with a small movement state machine:
     - idle
     - wandering
     - pausing
     - inspecting
     - cursor-attracted or cursor-avoidant
   - Use document-relative coordinates for desktop so Spuddie scrolls with page content.
   - Clamp to visible viewport bounds with a real measured character size.
   - Account for sticky navbar and route content.

4. Collision and content avoidance
   - Current collision sizing is unreliable because `15vw` gets parsed as `15`.
   - Use `getBoundingClientRect()` from the actual character element.
   - Avoid strong overlap with:
     - links
     - buttons
     - inputs
     - open modal/card surfaces
     - navbar controls
     - iframe/media areas
   - Allow minor edge overlap only while passing, not while paused.

5. Interesting element registry
   - Define a class/data-attribute convention for points of interest, for example:
     - song symbol triggers
     - open song cards
     - nav brand/logo
     - merch items
     - media embeds
   - Let Spuddie occasionally choose a target, wander nearby, face it, and pause.

6. Song symbol/card reaction
   - When a song card opens, Spuddie should move near the edge of the card and face it.
   - Spuddie should avoid covering the card body, close button, and media.
   - This likely needs a shared event or custom DOM event from `SongSymbol`.

7. Cursor interaction mode
   - Add a user-triggered mode later, not always-on cursor tracking.
   - Candidate trigger: a navbar Spuddie toggle/menu action or a special page element.
   - Modes:
     - attract: Spuddie wants the cursor.
     - avoid: Spuddie runs away from the cursor.
   - Keep this opt-in to prevent annoying default behavior.

8. Enable/disable control
   - Add a compact control near the navbar.
   - Persist preference in `localStorage`.
   - States:
     - enabled
     - disabled
     - possibly "sleeping" later
   - Button must be keyboard accessible and screen-reader labeled.

9. Chat box future work
   - Clicking Spuddie eventually opens a chat box.
   - Style should align with existing song card modal patterns:
     - centered overlay/card behavior
     - same visual tone
     - accessible close button
     - responsive sizing
   - First pass can keep click behavior simple or disabled while movement is built.

10. Reduced motion and performance
   - Respect `prefers-reduced-motion`.
   - In reduced-motion mode, Spuddie should either stay docked or use minimal non-animated position changes.
   - Use timers and requestAnimationFrame carefully.
   - Clean up listeners on unmount and route changes.

## Implementation Plan

### Phase 1: Baseline Site-Wide Desktop Spuddie

| Task | Status |
|------|--------|
| Fix directional image imports. | DONE |
| Mount Spuddie once at app level. | DONE |
| Convert overlay positioning to document-safe absolute positioning. | DONE |
| Use real measured character dimensions for bounds. | DONE |
| Implement stable random wandering and idle pauses. | DONE |
| Face direction based on movement vector. | DONE |
| Keep pointer events limited to Spuddie itself. | DONE |
| Respect reduced-motion preferences. | DONE |

### Phase 2: Enable/Disable Control

| Task | Status |
|------|--------|
| Add navbar-adjacent Spuddie control. | DONE |
| Persist enabled/disabled preference in `localStorage`. | DONE |
| Restore preference on load. | DONE |
| Make control keyboard and screen-reader accessible. | DONE |
| Confirm disabled state removes timers/listeners. | DONE |

### Phase 3: Content Avoidance

| Task | Status |
|------|--------|
| Define avoid selectors for buttons, links, inputs, nav, cards, modals, iframes. | DONE |
| Measure Spuddie and candidate collision boxes using DOM rects. | DONE |
| Prevent pauses over important content. | PARTIAL |
| Allow light edge overlap while moving. | DONE |
| Recalculate after route changes and resize. | DONE |

### Phase 4: Interesting Element Behavior

| Task | Status |
|------|--------|
| Define point-of-interest selector or data attribute convention. | DONE |
| Mark song symbols as points of interest. | DONE |
| Add occasional target selection. | DONE |
| Move Spuddie near target edge and pause. | DONE |
| Face the target while paused. | DONE |
| Ignore a song symbol after the visitor clicks it until reload. | DONE |

### Phase 5: Song Card Reaction

| Task | Status |
|------|--------|
| Emit an event when a song card opens. | DONE |
| Move Spuddie to the edge of the open card. | DONE |
| Face the open card. | DONE |
| Keep Spuddie clear of the card content and close button. | PARTIAL |
| Return to wandering when the card closes. | DONE |

### Phase 6: Cursor Chase/Avoid Experiments

| Task | Status |
|------|--------|
| Choose trigger UI or page element for cursor mode. | TODO |
| Implement attract mode. | TODO |
| Implement avoid mode. | TODO |
| Add timeout/exit condition so it does not run forever. | TODO |
| Confirm no interference with clicking page controls. | TODO |

### Phase 7: Chat Box

| Task | Status |
|------|--------|
| Decide chat scope: canned helper, site FAQ, or actual AI integration. | TODO |
| Replace/mock `Chatbox.js` as needed. | TODO |
| Style chat like song cards. | TODO |
| Add open/close animation and focus management. | TODO |
| Add starter prompts relevant to the site. | TODO |

### Phase 8: Mobile Strategy

| Task | Status |
|------|--------|
| Review desktop behavior first. | TODO |
| Decide mobile behavior: disabled, docked, or simplified wandering. | TODO |
| Ensure navbar control works on mobile. | TODO |
| Test small viewport overlap and touch targets. | TODO |

## Acceptance Criteria For First Build

The first implementation is complete when:
- Spuddie appears on every desktop page. (DONE)
- Spuddie wanders without leaving the viewport. (DONE)
- Spuddie pauses naturally between movements. (DONE)
- Spuddie faces the direction it is moving. (DONE)
- Spuddie does not sit directly over primary buttons, links, inputs, navbar controls, or open cards. (PARTIAL - needs visual tuning)
- A visitor can disable and re-enable Spuddie from a navbar-adjacent control. (DONE)
- The enabled/disabled choice persists across reloads. (DONE)
- Reduced-motion users are not forced into constant animation. (DONE)
- Existing route navigation, song cards, and page interactions still work. (BUILD VERIFIED)

## Implementation Log

### 2026-06-16

- Rebuilt `WanderingSpuddie` as a focused site-wide desktop companion.
- Mounted Spuddie in `App.js`.
- Added a persisted `spuddie-enabled` preference in `localStorage`.
- Added a navbar-adjacent Spuddie toggle button.
- Added page overlay positioning, visible-page clamping, random wandering, idle pauses, and directional facing.
- Added basic DOM-rect avoidance for controls, nav, cards, modals, and media.
- Added point-of-interest selection for song symbols and other interesting page elements.
- Marked song symbols with `data-spuddie-interest="song-symbol"` for future behavior.
- Verified with `npm run build`; build completed with only pre-existing warnings.
- Tuned wandering behavior to move much more slowly, take shorter nearby steps, inspect nearby elements less often, and avoid long viewport-wide jumps.
- Added resize safety nudging so Spuddie can move off important content after layout changes, while still allowing playful overlap during movement.
- Changed Spuddie from fixed viewport positioning to absolute document positioning so it scrolls naturally with page content.
- Moved Spuddie under the navbar in the app shell so the sticky navbar layers above it.
- Kept Spuddie facing the overall movement direction for each step instead of changing direction after inspection moves.
- Added custom song-card open/close events from `SongSymbol`.
- Wired Spuddie to move to a safe point near the opened song card edge when a song card opens.
- Paused scheduled wandering while a song card is open, then resumed wandering when the card closes.
- Added a dedicated song-card reading state: Spuddie parks on the left or right card edge, faces the card with the side-facing sprite, and renders above the blur backdrop so it stays sharp.
- Updated song-card reading placement to choose the closest left/right card edge from Spuddie's previous position.
- Updated initial site-load placement so Spuddie starts in the upper-left area near the navbar instead of choosing a random starting point.
- Preserved the same Spuddie DOM node when song cards open so the CSS transform transition animates from the previous position to the card edge.
- Triggered an immediate nearby safe movement when a song card closes instead of waiting for the next wandering timer.
- Varied song-card reading placement along the selected side so Spuddie can stop near the top, middle, or bottom of the card.
- Replaced scroll-delta song-card anchoring with immediate fixed-mode reading: Spuddie converts its current document position to viewport coordinates, animates to the fixed song-card edge, and stays pinned there during scroll without extra correction animations or direction changes.
- Limited song-card reading placement to the lower 60% of the card side so Spuddie appears to read the text area.
- Removed the close-button double-movement glitch by making the fixed-to-document coordinate handoff transitionless, then triggering a single animated move away from the card with the direction set from that movement.
- Fixed duplicate song-card close events so Spuddie only receives one close signal on the actual open-to-closed transition.
- Added scroll-idle edge docking: during normal wandering, Spuddie moves more quickly to the nearest visible screen edge shortly after the user stops scrolling.
- Fixed song-card open movement to start from Spuddie's actual rendered screen position before switching to fixed card-reading mode.
- Changed song-card close movement to a small outward step from the card edge instead of a general nearby/random movement.
- Preserved Spuddie's current position, movement state, and facing direction across route/page navigation after the initial site-load placement.
- Added direct Spuddie interaction: clicking Spuddie, or pressing Enter/Space while focused, sends it to another nearby safe spot with a faster transition.
- Added a subtle hover/focus lift using an inner hover shell so it does not conflict with the idle breathing animation.
- Added occasional cross-page wandering from one side of the visible page to the opposite side.
- Randomized initial site-load spawn between the top-left and top-right near the navbar.
- Reduced cross-page side switching frequency so it happens rarely as a shake-up behavior.
- Added nearest-song-symbol inspection: when Spuddie chooses to inspect, it prefers the nearest visible song symbol, moves beside it on the closest left/right side, and faces the symbol.
- Added stale-target guarding for scroll: song-symbol inspection stores the target element, clears it if scrolling moves that target out of view, and redirects Spuddie to a visible edge instead of continuing toward stale coordinates.
- Tuned baseline wandering toward continuous drift by reducing wait time between steps and using linear transform movement.
- Added held song-symbol targeting: once Spuddie reaches a song symbol, it stays beside that symbol until it is clicked, and then ignores that symbol until the page is reloaded.
- Tightened scroll behavior while targeted so visible song symbols keep Spuddie parked beside them, while offscreen or detached targets are cleared safely.
- Mellowed baseline wandering by spacing movement decisions farther apart and using larger step ranges, while keeping the same linear travel animation.
- Changed clicked song-symbol ignores to reset once that symbol scrolls out of the viewport, so Spuddie can revisit it later in the same page session.
- Promoted song symbols above random inspection: Spuddie now always chooses the nearest visible unopened song symbol before wandering or inspecting other elements.
- Removed the song-symbol proximity radius so newly visible song symbols can pull Spuddie from anywhere in the viewport.
- Added a faster song-card approach transition so Spuddie reaches the side of an opened song card more quickly than normal wandering.
- Changed song-symbol pursuit from a single full move to incremental approach steps; Spuddie only locks beside the symbol after it reaches the side position.
- Added obstacle-aware movement paths: Spuddie samples each proposed route against avoid rectangles and tries angled detours so buttons, links, cards, media, and nav elements act more like obstacles.
- Locked song-symbol approach side at pursuit start so Spuddie keeps going to the side closest to its original position instead of flipping sides during detours.
- Added a rare attention wiggle where Spuddie faces forward, wiggles in place, then resumes movement.
- Removed the accessibility conflict where a keyboard-focusable Spuddie button lived inside an `aria-hidden` layer.
- Centralized Spuddie custom event names and dispatch helpers in `spuddieEvents.js`.
- Extracted reusable geometry helpers into `spuddieGeometry.js`.
- Cached avoid-rect DOM measurements per movement decision so path and pause checks do not repeatedly query the page.
- Consolidated repeated active-target and quick-move cleanup logic inside `WanderingSpuddie`.
- Moved the site companion files out of `pages/` and into `src/components/spuddie/` so `pages/` contains only route-level page components.
- Tightened obstacle routing by treating major page content blocks/images as avoid rectangles and preventing fallback moves from crossing blocked paths.
- Added a curiosity beat when Spuddie notices a fresh song symbol: it pauses, faces the target direction, performs a subtle notice animation, then resumes the existing step-by-step approach.
- Reduced Spuddie's rendered size by 10% and updated fallback measurements so initial placement and bounds stay aligned before browser measurement.
- Fixed stuck states after notice pauses, route changes, and song-card navigation by letting notice/attention timers complete independently of the movement scheduler, resetting transient card/target state on page changes, and emitting a song-card close event if an open card unmounts.
- Changed the song-symbol notice beat into a non-blocking one-time wiggle per target approach: Spuddie keeps moving immediately, the wiggle no longer adds pauses before or after movement, and the animation is more vigorous.
- Removed the occasional reload-side-swap by reusing the already chosen initial spawn point instead of rerolling left/right after first render, suppressed cross-page shake-up moves until after an initial local wander, and guarded direction updates so zero-distance moves do not flip Spuddie forward.
- Changed Spuddie clicks while parked beside a song symbol to replay the notice wiggle in place instead of moving away from the symbol.
- Changed Spuddie clicks while parked beside an open song card to replay the notice wiggle in place instead of doing nothing or moving away.
- Added post-card-close stuck recovery: clicked/ignored song symbols can no longer keep Spuddie in an active-target hold, and repeated no-op pathfinding moves now trigger an escape move using the same obstacle-aware safety checks.
- Improved song-symbol retargeting and navigation: approach moves now use distance-based transition timing with a quick final settle, obstacle routing now generates waypoints around blocking rectangles, and broad layout-section avoid selectors were narrowed so Spuddie can move between real page elements instead of treating whole page bands as walls.
- Made Spuddie park beside song symbols sooner by increasing the arrival threshold, and added a seamless portal navigation fallback for long blocked song-symbol routes: Spuddie walks off one horizontal edge, transitionlessly appears off the opposite edge, then walks back onto the visible page.
- Fixed portal direction so Spuddie exits through its nearest horizontal edge and re-enters from the opposite edge, instead of crossing the whole page first and appearing back where it started.
- Split click behavior into target/approach mode versus random-wander mode: while any visible unclicked song symbol exists, clicking Spuddie wiggles in place; only after all visible song symbols have been clicked does clicking Spuddie move it to another random safe position.
- Replaced the old random cross-page walk with the same edge-portal behavior used for difficult target routes, removed the redundant opposite-side movement helper, and renamed the random cross-page chance to `portalChance` so the behavior matches the implementation.
- Fixed a song-card-open race by entering a pending song-card mode immediately when a song symbol is clicked, stopping timers and lifting Spuddie above the backdrop before the measured card-open event moves it to the card edge.
- Changed initial page load/reload so Spuddie starts off-screen and walks in from the left or right edge using the portal-entry style, while route changes still preserve its current position.
- Tightened song-card reading placement so Spuddie's bottom stays at least 15% above the bottom of the song card while keeping the existing lower-half reading behavior away from the top.

## Open Decisions

| Decision | Current Lean |
|----------|--------------|
| Where to mount Spuddie | `App.js`, once, as a site-wide overlay. |
| Where to put the toggle | Near the navbar, likely inside or adjacent to `NavBar`. |
| Whether click opens chat in first pass | Defer until movement feels good. |
| Whether cursor chase/avoid is default | No, make it triggered. |
| Mobile behavior | Defer until desktop pass is reviewed. |
| Chat implementation depth | Defer; start with UI/styling before API decisions. |

## Notes

- The existing worktree contains many unrelated modified files. Spuddie changes should stay tightly scoped and avoid reverting unrelated edits.
- `GAP_ANALYSIS.md` tracks a separate performance/accessibility effort. This document is intentionally separate.
- The current `Chatbox.js` is useful as a placeholder reference, but the eventual chat should likely be redesigned around the existing song-card modal visual system.
