# Asset Audit — build/static/media

Date: 2026-06-16

This file lists the largest media assets included in the production build and recommended next steps to reduce payload and improve LCP.

## Largest files (from `build/static/media`, sorted by size)
- into focus 3.f2e63077f025d80d8221.jpg — 14 MB
- IMGP1954.d784fd67a9e8f8b2246b.JPG — 11 MB
- A7S06001.d306b0354b219614bb06.jpeg — 11 MB
- DayBlockShowPosterv6.44e6aa4f9797bc9940f2.jpg — 9.5 MB
- ComoPorchfest.3251629ff30356e74490.jpg — 9.5 MB
- A7S04769.3cc789ebc55a56190490.jpeg — 8.9 MB
- FunkNFalltasticVBS.f59a9d704bf456f8e73c.jpg — 7.1 MB
- LBSotSPoster.499693af6de0b889b18f.JPG — 6.8 MB
- A7S06448.73ad18301673c70e67de.jpeg — 6.8 MB
- VARBSFNSPoster.2352848f893a3c0e82ad.jpg — 6.6 MB

## Recommendations (priority)
1. Convert top JPG/PNG files to WebP and AVIF. For hero/above-the-fold images keep both WebP and AVIF with fallbacks.
2. Resize images to sensible display sizes (e.g. max 1600px width for hero, 800px for inline images) before bundling.
3. Generate a `srcset` with multiple sizes and use `sizes` to allow the browser to pick the best candidate.
4. For decorative or offscreen images, ensure `loading="lazy"` and consider `decoding="async"`.
5. Offload very large images (>2MB after conversion) to a CDN or cloud storage and serve via optimized URLs.
6. Add an automated script (Node or npm script) to batch-convert and output optimized images into `src/assets/optimized/` and update imports or use a naming convention.

## Suggested quick wins (this sprint)
- Convert the top 10 largest images to WebP at 80% quality (lossy) and add WebP imports; use `srcset` for responsive sizing.
- Replace direct imports of extremely large files with runtime `import()` or host externally and reference via URL.

## Next steps for me
1. Produce a small script (Node) to convert images to WebP/AVIF and generate `srcset` entries. (requires confirmation)
2. Implement example `srcset` for one hero image (`into focus 3.jpg`) and update `Home.js` to use picture element.
3. Optionally, add a GitHub Action to run image optimization on commit.

If you approve, I will: (a) create the conversion script and (b) implement the `picture`/`srcset` example for the hero image in `Home.js`.
