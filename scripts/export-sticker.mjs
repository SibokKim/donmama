import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createStickerSvg } from '../lib/sticker.ts';
import { restaurant } from '../lib/restaurant.ts';
const url = process.argv[2] || restaurant.siteUrl;
const font = (
  await readFile(
    new URL('../public/fonts/NotoSansKR-Regular.ttf', import.meta.url),
  )
).toString('base64');
const medium = (
  await readFile(
    new URL('../public/fonts/NotoSansKR-Medium.ttf', import.meta.url),
  )
).toString('base64');
const svg = createStickerSvg(url, font, medium);
await mkdir(new URL('../public/downloads/', import.meta.url), {
  recursive: true,
});
await writeFile(
  new URL(
    '../public/downloads/donmama-table-sticker-90x120mm.svg',
    import.meta.url,
  ),
  svg,
);
console.log('Exported editable 90 × 120 mm SVG with embedded Korean font.');
