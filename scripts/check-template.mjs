import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { Script } from 'node:vm';

const root = new URL('../', import.meta.url);
const manifest = JSON.parse((await readFile(new URL('docs/template-original.sha256.json', root), 'utf8')).replace(/^\uFEFF/, ''));
for (const [path, expected] of Object.entries(manifest)) {
  const preservedPath = path === 'README.md' ? 'docs/template-original/README.md' : path;
  const actual = createHash('sha256').update(await readFile(new URL(preservedPath, root))).digest('hex');
  if (actual !== expected) throw new Error(`Original template changed: ${path}. Review intentionally before updating the baseline.`);
}
const html = await readFile(new URL('standalone/dev-id-dashboard.html', root), 'utf8');
if (!html.includes('id="root"') || !html.includes('createRoot')) throw new Error('Dashboard entry point missing.');
let scriptCount = 0;
for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
  if (/application\/json/.test(match[1])) continue;
  // This original bundle has no ESM imports/exports; parse without executing it.
  new Script(match[2], { filename: `template-script-${++scriptCount}.js` });
}
console.log(`OK: ${Object.keys(manifest).length} original files preserved; ${scriptCount} scripts parse.`);
console.log('Source placeholders remain empty. This check does not verify browser rendering or backend behavior.');
