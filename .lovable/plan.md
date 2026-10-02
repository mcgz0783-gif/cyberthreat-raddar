# CyberHawk UG Lightweight 3D Upgrade

## Goal
Add a premium, restrained cybersecurity 3D layer without changing the site's content, routes, backend, SEO structure, or PWA behavior.

## What will change
- Replace only the homepage's existing decorative globe area with a modular, lazy-loaded interactive network globe.
- Keep the headline, search, calls to action, statistics, and all semantic HTML above the visual layer.
- Add a CSS-based globe fallback for unsupported WebGL, reduced-motion preferences, offline mode, and constrained devices.
- Add subtle pointer/touch depth to service/tool cards and book covers, with reduced-motion and coarse-pointer safeguards.
- Add reusable device-capability and 3D-boundary components so the 3D scene can be independently disabled or replaced.

## Performance and accessibility
- Load the 3D bundle only after the hero is visible and the browser is idle.
- Use procedural geometry only: no model or texture downloads.
- Cap pixel density, avoid shadows and post-processing, reuse geometries/materials, and reduce nodes on mobile.
- Pause animation when the tab or hero is not visible.
- Preserve text contrast, keyboard behavior, touch scrolling, semantic headings, links, and screen-reader content.

## Technical details
- Add pinned React 18-compatible dependencies: `three`, `@react-three/fiber@^8.18`, and `@types/three`.
- Build the globe from a low-segment wireframe sphere, instanced nodes, a small fixed set of connection arcs, and restrained particles.
- Keep Three.js isolated in a lazy module with an error boundary and a non-canvas fallback.
- Extend existing semantic design tokens and card classes rather than introducing a separate visual system.
- Record the modular 3D/fallback architecture rule in the project architecture notes.

## Verification
- Confirm the production build and tests pass.
- Exercise every existing route and check for runtime/console errors.
- Capture desktop and Android-sized screenshots of the homepage and book grid.
- Force the 2D fallback and reduced-motion path.
- Confirm the service worker, manifest, robots, sitemap, canonical metadata, headings, and structured data remain available.
- Scan changed client code for environment variables, credentials, or accidental secret exposure.
