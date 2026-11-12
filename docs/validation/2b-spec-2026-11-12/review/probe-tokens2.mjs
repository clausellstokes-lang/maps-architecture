// Review probe 2 (read-only): the lint's scanText on the design head's bandUnion.ts, and on the one-line imports a P′ wiring would add to kerb.ts.
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
const root = '/home/user/maps-architecture/plat';
const kb = await import(pathToFileURL(root + '/tools/lint/kernel-boundary.mjs').href);
const tally = (rel, text) => { const m = {}; for (const h of kb.scanText(rel, text)) { const k = `${h.kind} ${h.noun}`; m[k] = (m[k] ?? 0) + 1; } return m; };
console.log('bandUnion.ts (head):', JSON.stringify(tally('packages/kernel/src/arr/bandUnion.ts', readFileSync(root + '/packages/kernel/src/arr/bandUnion.ts', 'utf8'))));
for (const line of [
  "import { bandCore, type BandResult } from './bandUnion.js';",
  "import { layFace } from './bandUnion.js';",
  "const r = layFace(t, face, { widths, edgeRole: 'kerb', vertexContacts: true });",
]) console.log(JSON.stringify(line), '→', JSON.stringify(tally('packages/kernel/src/arr/kerb.ts', line)));
