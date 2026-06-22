import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, normalize, resolve } from 'node:path';

const directory = process.argv[2] === 'dist' ? 'dist' : '.';
const root = resolve(directory);
const publicRoot = resolve('public');
const port = Number(process.env.PORT) || 4173;
const types = { '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.js': 'text/javascript; charset=utf-8', '.pdf': 'application/pdf', '.png': 'image/png', '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8', '.webp': 'image/webp', '.xml': 'application/xml; charset=utf-8' };

const resolveFile = (candidate) => {
  if (!existsSync(candidate)) return candidate;
  return statSync(candidate).isDirectory() ? resolve(candidate, 'index.html') : candidate;
};

createServer((request, response) => {
  const requestPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const relativePath = requestPath === '/' ? 'index.html' : normalize(requestPath).replace(/^([/\\])+/, '');
  const sourceFile = resolveFile(resolve(root, relativePath));
  const publicFile = resolveFile(resolve(publicRoot, relativePath));
  const file = existsSync(sourceFile) ? sourceFile : publicFile;

  if ((!file.startsWith(root) && !file.startsWith(publicRoot)) || !existsSync(file) || statSync(file).isDirectory()) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('404 — Archivo no encontrado');
    return;
  }

  response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
  createReadStream(file).pipe(response);
}).listen(port, () => console.log(`Portfolio disponible en http://localhost:${port}`));
