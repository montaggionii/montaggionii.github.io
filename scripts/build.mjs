import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const files = ['index.html', 'styles.css', 'deployment.css', 'profile.css', 'audit.css', 'script.js', 'src', 'assets', 'projects', 'engineering', 'automation', 'cybersecurity'];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await Promise.all(files.map((file) => cp(resolve(root, file), resolve(dist, file), { recursive: true })));
await cp(resolve(root, 'public'), dist, { recursive: true });
await writeFile(resolve(dist, '.nojekyll'), '');

console.log('Build listo en dist/.');
