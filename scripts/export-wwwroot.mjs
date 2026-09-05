import { cp, mkdir, rm, rename } from 'node:fs/promises';
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

// Directory indexes make extensionless links such as /menu work on simple
// static hosts, including hosts that do not implement clean-URL rewrites.
for (const route of ['menu', 'review', 'sticker']) {
  const routeDir = resolve(target, route);
  await mkdir(routeDir, { recursive: true });
  await rename(resolve(target, `${route}.html`), resolve(routeDir, 'index.html'));
}

console.log(`Static site exported to ${target}`);


