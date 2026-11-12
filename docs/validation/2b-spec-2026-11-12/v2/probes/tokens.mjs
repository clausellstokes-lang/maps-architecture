// Read-only probe: the lint's own scanText on the named files (repository head and S20's kerb.ts / kerbExact.ts).
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
const root = '/home/user/maps-architecture/plat';
const kb = await import(pathToFileURL(root + '/tools/lint/kernel-boundary.mjs').href);
const files = process.argv.slice(2);
for (const spec of files) {
  const [rel, src] = spec.split('=');
  const text = readFileSync(src ?? root + '/' + rel, 'utf8');
  const hits = kb.scanText(rel, text);
  const m = {};
  for (const h of hits) { const k = `${h.kind} ${h.noun}`; m[k] = (m[k] ?? 0) + 1; }
  console.log(rel, JSON.stringify(m));
  if (process.env.LIST) for (const h of hits) console.log('   ', h.kind, h.noun, ':' + h.line, JSON.stringify(h.text ?? h.token ?? ''));
}
