// The session's counting probe for the RQ2 round's leg 3 (J775): on the END STATE of M0's pipeline arenas, how many
// vertices are in the class the `shape` row guards — live, VERTEX_SPLIT set, not pinned, degree 2, both edges of one
// level with identical edge rows, and those rows of TWO OR MORE keys (the coincident class `dissolvableProblems` skips)?
// An upper-bound estimate of the rows leg 3 would write (the end state cannot tell an own point from a leftover).
// Run from <worktree>/plat: corepack pnpm exec tsx --conditions=plat-source <this> <out.json> <fixture> <config> <seed…>
import { writeFileSync } from 'node:fs';
const W = process.cwd();
const A = await import(`${W}/packages/kernel/src/arena/index.ts`);
const { deriveSpike } = await import(`${W}/bench/src/site/compose.ts`);
const { fixtureNamed } = await import(`${W}/bench/src/site/fixtures.ts`);
const [out, fixture, config, ...seeds] = process.argv.slice(2);
function scan(p) {
  const R = p.roles;
  const rowsE = (h) => A.rowsOn(p, 'edge', h);
  const text = (h) => rowsE(h).map((r) => `${R.kind[r]}/${A.idOf(p, R.entity[r])}/${R.ordinal[r]}/${R.level[r]}`).sort().join(';');
  let live = 0, split = 0, cls = 0, clsWithVertexRows = 0, oneKey = 0;
  const byLevel = {}; const sample = [];
  for (let v = 0; v < p.slots.vertex.top; v += 1) {
    if (!A.isVertexLive(p, v)) continue;
    live += 1;
    const f = p.vertices.flags[v];
    if ((f & A.VERTEX_SPLIT) === 0) continue;
    split += 1;
    if ((f & A.VERTEX_PINNED) !== 0) continue;
    const at = A.outgoing(p, v);
    if (at.length !== 2 || p.halfEdges.level[at[0] >> 1] !== p.halfEdges.level[at[1] >> 1] || text(at[0]) !== text(at[1])) continue;
    const keys = new Set(rowsE(at[0]).map((r) => `${R.kind[r]}/${A.idOf(p, R.entity[r])}/${R.ordinal[r]}`));
    if (keys.size <= 1) { oneKey += 1; continue; }
    const vrows = A.rowsOn(p, 'vertex', v).length;
    if (vrows > 0) clsWithVertexRows += 1; else cls += 1;
    const lv = `L${String(p.halfEdges.level[at[0] >> 1])}`;
    byLevel[lv] = (byLevel[lv] ?? 0) + 1;
    if (sample.length < 6) sample.push({ x: p.vertices.x[v], y: p.vertices.y[v], level: lv, rows: text(at[0]), vertexRows: vrows });
  }
  return { live, split, coincidentClass: cls, coincidentClassWithVertexRows: clsWithVertexRows, oneKeyOrNone: oneKey, byLevel, sample };
}
const result = [];
const fx = fixtureNamed(fixture);
for (const seed of seeds.map(Number)) {
  const d = deriveSpike(fx, seed, config, 'city');
  const plats = {};
  for (const [name, p] of d.model.plats) plats[name] = scan(p);
  result.push({ fixture, config, seed, plats });
  console.log(`${fixture}/${config} seed ${String(seed)}: ${Object.entries(plats).map(([n, s]) => `${n}: live ${String(s.live)}, split ${String(s.split)}, coincident class ${String(s.coincidentClass)} (+${String(s.coincidentClassWithVertexRows)} with vertex rows), one-key ${String(s.oneKeyOrNone)}`).join(' | ')}`);
}
writeFileSync(out, `${JSON.stringify(result, null, 1)}\n`);
