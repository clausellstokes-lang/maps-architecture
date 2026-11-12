// Review probe (read-only): the kernel-boundary lint's own scanner on S20's kerb.ts / kerbExact.ts and on two
// simulated wirings. W2: kerbExact.ts's X code folded into kerb.ts (imports and the shadow section dropped, the one
// kerbParts call replaced by spineParts(s, boxOf(f.rings), true)); the served readKerb/kerb are not yet rewritten, so
// this counts the FOLD alone. W5: readKerb + kerb() cut out of kerb.ts and appended to kerbExact.ts.
// Usage: node probe-tokens.mjs <dir holding src/arr/kerb.ts and kerbExact.ts> <plat root>
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const [dir, root] = process.argv.slice(2);
const kb = await import(pathToFileURL(join(root, 'tools/lint/kernel-boundary.mjs')).href);
const kerb = readFileSync(join(dir, 'src/arr/kerb.ts'), 'utf8');
const exact = readFileSync(join(dir, 'src/arr/kerbExact.ts'), 'utf8');

function count(label, rel, text) {
  const hits = kb.scanText(rel, text);
  const by = new Map();
  for (const h of hits) {
    const k = `${h.kind} ${h.noun}`;
    by.set(k, (by.get(k) ?? 0) + 1);
  }
  console.log(`${label}: ${JSON.stringify(Object.fromEntries([...by.entries()].sort()))}`);
  return hits;
}

const hk = count('S20 kerb.ts', 'packages/kernel/src/arr/kerb.ts', kerb);
for (const h of hk.filter((x) => x.noun === 'kerb')) console.log(`   ${h.kind} :${h.line} ${h.text}`);
const he = count('S20 kerbExact.ts', 'packages/kernel/src/arr/kerbExact.ts', exact);
for (const h of he) console.log(`   ${h.kind} :${h.line} ${h.noun} ${h.text}`);

// W2: the X code (from the first '// ---- exactRegion' line to the shadow section) folded into kerb.ts
const start = exact.indexOf('// ---- exactRegion');
const end = exact.indexOf('// ---- the shadow');
let body = exact.slice(start, end);
const before = body.length;
body = body.replace('kerbParts(f.rings, new Map([[s.key, s]]), true)', 'spineParts(s, boxOf(f.rings), true)');
if (body.length === before) throw new Error('the kerbParts call was not found');
const w2 = `${kerb}\n${body}`;
count('W2 kerb.ts (fold only, readKerb not yet rewritten)', 'packages/kernel/src/arr/kerb.ts', w2);

// W5: readKerb and kerb() out of kerb.ts into kerbExact.ts
const rk0 = kerb.indexOf('/**\n * The face read and its kerb (`corridorUnion`');
const rk1 = kerb.indexOf('/**\n * The junctions\' corridor_split chains');
const k0 = kerb.indexOf('/**\n * §3.4\'s `kerb(face)`');
const k1 = kerb.indexOf('// ---- the junctions and their corridor_split chains');
if (rk0 < 0 || rk1 < 0 || k0 < 0 || k1 < 0) throw new Error('W5 cut points not found');
const served = kerb.slice(rk0, rk1) + kerb.slice(k0, k1);
const kerbW5 = kerb.slice(0, rk0) + kerb.slice(rk1, k0) + kerb.slice(k1);
count('W5 kerb.ts (served read cut out)', 'packages/kernel/src/arr/kerb.ts', kerbW5);
count('W5 kerbExact.ts (served read appended)', 'packages/kernel/src/arr/kerbExact.ts', `${exact}\n${served}`);
