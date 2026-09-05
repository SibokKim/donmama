import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import jsQR from 'jsqr';
import { validateQrUrl, createStickerSvg } from '../lib/sticker.ts';
import { restaurant } from '../lib/restaurant.ts';
const require = createRequire(import.meta.url);
const sharp = require(process.argv[3] || 'sharp');
const file = resolve(process.argv[2]);
const { data, info } = await sharp(file)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const result = jsQR(new Uint8ClampedArray(data), info.width, info.height);
assert.ok(result, 'Printed QR must decode');
assert.equal(result.data, restaurant.siteUrl);
assert.ok(validateQrUrl('javascript:alert(1)'));
assert.ok(validateQrUrl('https://user:password@example.com'));
assert.ok(validateQrUrl('this is not a URL'));
assert.equal(validateQrUrl('https://example.com/menu?table=1'), null);
assert.throws(() =>
  createStickerSvg('data:text/html,<script>alert(1)</script>'),
);
console.log(
  'Printed QR decodes to the correct website. URL validation checks passed.',
);
