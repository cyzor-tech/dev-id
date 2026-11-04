import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { Script } from 'node:vm';

const root = new URL('../', import.meta.url);
const original = await readFile(new URL('standalone/dev-id-dashboard.html', root), 'utf8');
const translations = JSON.parse(await readFile(new URL('src/pt-BR.json', root), 'utf8'));
const start = original.indexOf('var wc=');
const end = original.indexOf('</script>', start);
if (start < 0 || end < 0) throw new Error('Estrutura do template alterada: revise a tradução.');

// Change complete UI string literals only, leaving CSS, React internals and API keys intact.
const used = new Set();
let app = original.slice(start, end).replace(/"(?:[^"\\]|\\.)*"/g, (literal) => {
  const value = JSON.parse(literal);
  if (!Object.hasOwn(translations, value)) return literal;
  used.add(value);
  return JSON.stringify(translations[value]);
});
const templateTranslations = new Map([
  ['${o.label} • Coming soon', '${o.label} • Em breve'],
  ['${o.name} • Coming soon', '${o.name} • Em breve'],
  ['Downloading ${o.name}', 'Baixando ${o.name}'],
  ['${o.company} experience', 'Experiência na ${o.company}'],
  ['${o.role} • 94% match', '${o.role} • ${o.match}% de afinidade'],
]);
for (const [source, target] of templateTranslations) {
  if (!app.includes(source)) throw new Error(`Texto dinâmico não encontrado: ${source}`);
  app = app.replaceAll(source, target);
}
// Format decimal experience years using the Brazilian decimal separator.
if (!app.includes('children:[o.years,')) throw new Error('Campo de experiência não encontrado.');
app = app.replaceAll('children:[o.years,', 'children:[o.years.toLocaleString("pt-BR"),');
app = app.replaceAll('onClick:()=>v(`${o.label} • Em breve`),className:',
  '"aria-label":o.label,title:o.label,onClick:()=>v(`${o.label} • Em breve`),className:');
const unused = Object.keys(translations).filter((key) => !used.has(key));
if (unused.length) throw new Error(`Traduções não aplicadas: ${unused.join(', ')}`);
let html = (original.slice(0, start) + app + original.slice(end))
  .replace('<html lang="en">', '<html lang="pt-BR">')
  .replace('<title>React Artifact</title>', '<title>DEV ID — Painel do desenvolvedor</title>');
const localizedStyles = await readFile(new URL('src/pt-BR.css', root), 'utf8');
html = html.replace('</head>', `<style>${localizedStyles}</style></head>`);
for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
  if (!/application\/json/.test(match[1])) new Script(match[2]);
}
await mkdir(new URL('build/', root), { recursive: true });
await writeFile(new URL('build/index.html', root), html);
console.log(`Painel pt-BR gerado: ${used.size} traduções. Template original preservado.`);
