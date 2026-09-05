import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../wwwroot', import.meta.url)));
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
};

const server = createServer((request, response) => {
  const requestPath = decodeURIComponent((request.url ?? '/').split('?')[0]);
  const publicPath = requestPath.replace(/^\/donmama(?=\/|$)/, '') || '/';
  const relativePath = publicPath === '/' ? 'index.html' : publicPath.replace(/^\/+/, '');
  const candidate = resolve(root, normalize(relativePath));
  if (!candidate.startsWith(root) || !existsSync(candidate)) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }

  const file = statSync(candidate).isDirectory() ? join(candidate, 'index.html') : candidate;
  if (!existsSync(file)) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }
  response.writeHead(200, {
    'Content-Type': types[extname(file)] ?? 'application/octet-stream',
  });
  createReadStream(file).pipe(response);
});

server.listen(4173, '127.0.0.1', () => {
  console.log('돈마마 정적 웹앱 미리보기: http://127.0.0.1:4173/');
});
