const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Simple image conversion script: converts the given source image into AVIF and WebP
// at multiple widths and writes to public/optimized/. Run: `npm run optimize-images`

const src = path.resolve(__dirname, '../src/img/into focus 3.jpg');
const outDir = path.resolve(__dirname, '../public/optimized');

const widths = [1600, 1024, 480];

async function ensureOutDir() {
  await fs.promises.mkdir(outDir, { recursive: true });
}

async function convert() {
  await ensureOutDir();
  for (const w of widths) {
    const webpOut = path.join(outDir, `into-focus-${w}.webp`);
    const avifOut = path.join(outDir, `into-focus-${w}.avif`);
    await sharp(src).resize(w).webp({ quality: 80 }).toFile(webpOut);
    await sharp(src).resize(w).avif({ quality: 50 }).toFile(avifOut);
    console.log(`Wrote: ${webpOut}`);
    console.log(`Wrote: ${avifOut}`);
  }
  // copy a reasonably sized jpg fallback
  const jpgFallback = path.join(outDir, `into-focus-800.jpg`);
  await sharp(src).resize(800).jpeg({ quality: 85 }).toFile(jpgFallback);
  console.log(`Wrote fallback JPG: ${jpgFallback}`);
}

convert().catch(err => {
  console.error(err);
  process.exit(1);
});
