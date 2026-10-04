import { cp, mkdir, readFile, readdir, rm, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(projectRoot, 'dist/client');
const target = resolve(projectRoot, 'wwwroot');

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });

// Keep the complete browser output, including public images, fonts, downloads,
// and the client chunks needed by the interactive menu and sticker studio.
await cp(source, target, {
  recursive: true,
  filter: (path) => !path.split(/[\\\\/]/).includes('.vite'),
});
await writeFile(resolve(target, '.nojekyll'), '');

// Directory indexes make extensionless links such as /menu work on simple
// static hosts, including hosts that do not implement clean-URL rewrites.
for (const route of ['menu', 'review', 'sticker']) {
  const routeDir = resolve(target, route);
  await mkdir(routeDir, { recursive: true });
  await rename(resolve(target, `${route}.html`), resolve(routeDir, 'index.html'));
}

// GitHub Pages serves this repository below /donmama. Prefix the browser
// paths in the exported document and client chunks so links and assets keep
// working from that project-site URL.
const textExtensions = new Set(['.html', '.js', '.css', '.json', '.rsc']);
const prefix = (text) =>
  text
    // Vite's preload dependency table omits the leading slash, while its
    // browser helper adds one. These entries also need the project prefix.
    .replaceAll('"_next/static/', '"donmama/_next/static/')
    .replaceAll("'_next/static/", "'donmama/_next/static/")
    .replaceAll('`_next/static/', '`donmama/_next/static/')
    // Minified CSS removes quotes around local font and image URLs.
    .replace(/url\(\/(fonts|images)\//g, 'url(/donmama/$1/')
    .replaceAll('"/_next', '"/donmama/_next')
    .replaceAll("'/_next", "'/donmama/_next")
    .replaceAll('`/_next', '`/donmama/_next')
    .replaceAll('"/images', '"/donmama/images')
    .replaceAll("'/images", "'/donmama/images")
    .replaceAll('`/images', '`/donmama/images')
    .replaceAll('"/fonts', '"/donmama/fonts')
    .replaceAll("'/fonts", "'/donmama/fonts")
    .replaceAll('`/fonts', '`/donmama/fonts')
    .replaceAll('"/downloads', '"/donmama/downloads')
    .replaceAll("'/downloads", "'/donmama/downloads")
    .replaceAll('`/downloads', '`/donmama/downloads')
    .replaceAll('"/favicon', '"/donmama/favicon')
    .replaceAll("'/favicon", "'/donmama/favicon")
    .replaceAll('`/favicon', '`/donmama/favicon')
    .replaceAll('"/menu', '"/donmama/menu')
    .replaceAll("'/menu", "'/donmama/menu")
    .replaceAll('`/menu', '`/donmama/menu')
    .replaceAll('"/review', '"/donmama/review')
    .replaceAll("'/review", "'/donmama/review")
    .replaceAll('`/review', '`/donmama/review')
    .replaceAll('"/sticker', '"/donmama/sticker')
    .replaceAll("'/sticker", "'/donmama/sticker")
    .replaceAll('`/sticker', '`/donmama/sticker')
    .replaceAll('href="/"', 'href="/donmama/"')
    .replaceAll("href='/'", "href='/donmama/'");

async function rewrite(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      await rewrite(path);
      continue;
    }
    if (!textExtensions.has(path.slice(path.lastIndexOf('.')))) continue;
    const contents = await readFile(path, 'utf8');
    const next = prefix(contents);
    if (next !== contents) await writeFile(path, next);
  }
}

await rewrite(target);

console.log(`Static site exported to ${target}`);


