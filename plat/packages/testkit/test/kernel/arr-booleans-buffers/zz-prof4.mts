// SCRATCH (M0-a-08 seat debugging; deleted before landing): shrinks a throwing overlay to a minimal ring set.
import { readFileSync, writeFileSync } from 'node:fs';
import { buildOverlay, bufferParts, windingLabels, type LatticePoint } from '@plat/kernel';
type R = LatticePoint[];
const t = JSON.parse(readFileSync(process.env.IN as string, 'utf8'));
const c = t[Number(process.env.K ?? 0)].case;
const parts = bufferParts(c.chains, c.w, c.joins, c.ends);
if (!parts.ok) throw new Error('parts');
const throws = (rings: R[]): boolean => { try { const o = buildOverlay([rings]); if (o.ok) windingLabels(o.value); return false; } catch { return true; } };
// find the throwing level-0 group or use all
let set: R[] = parts.value as R[];
console.log('parts', set.length, 'all throws', throws(set));
for (let i = 0; i < set.length; i += 8) { const g = set.slice(i, i + 8); if (throws(g)) { console.log('group', i, 'throws'); set = g; break; } }
if (!throws(set)) { console.log('no level-0 group throws; using all'); set = parts.value as R[]; }
// ring-level delta debugging
let changed = true;
while (changed) { changed = false; for (let i = 0; i < set.length; i++) { const s2 = set.filter((_, j) => j !== i); if (s2.length && throws(s2)) { set = s2; changed = true; break; } } }
// vertex-level: try dropping single vertices of rings
changed = true;
while (changed) { changed = false; outer: for (let r = 0; r < set.length; r++) { if (set[r].length <= 3) continue; for (let v = 0; v < set[r].length; v++) { const s2 = set.map((x, j) => j === r ? x.filter((_, k) => k !== v) : x); if (throws(s2)) { set = s2; changed = true; break outer; } } } }
console.log('minimal rings', set.length, 'vertices', set.map((r) => r.length).join(','));
writeFileSync(process.env.OUT as string, JSON.stringify(set));
