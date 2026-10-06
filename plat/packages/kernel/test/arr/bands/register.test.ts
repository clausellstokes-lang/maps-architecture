// M0-a-09's refusal register (N-44 (4)): every refused case found at PR or nightly size kept as a fixture — its seed,
// its input and its refusal code — with a test that it refuses cleanly: no throw, a typed KernelResult refusal, the
// arena as it was (§2.2 rule 8). Each refusal still met is classed by replay (replay.ts; C-0212 (10) as amended): one
// that replays on insertChain alone is insertChain's (counted against its measured cap — M0-a-05's round S5 sets it —
// never gated here); the register asserts every registered case it still meets is of that class, so a refusal caused in
// the item's own code cannot hide here. A case a later routing round turns into a commit passes too, as a commit
// within the bars the other tests check (N-44: better routing is insertChain's); its row then leaves the register.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { idOf } from '../../../src/arena/index.js';
import { tx } from '../../../src/tx/index.js';
import { kerb } from '../../../src/arr/kerb.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { tileRings } from '../../../src/arr/tileRings.js';
import { bandUnion } from '../../../src/arr/bandUnion.js';
import { insertChain } from '../../../src/insert/index.js';
import { setOwner } from '../../../src/tx/index.js';
import { AT_S9, commit, firstBand, framed, network, P, profile, pt, spec, state, widthsOf, type Chord, type ChordWidth } from './support.js';
import { classify, replayCommit, replayKerb, replayTile, type RefusalClass } from './replay.js';

const K = { knots: [{ index: 0, role: 'width_knot', ordinal: 0 }, { index: 1, role: 'width_knot', ordinal: 1 }] };

/** The register's street networks: chords across the frame [0, 4000]², each with its half-width declaration. */
const NETWORKS: { id: string; seed: string; chords: [[number, number], [number, number], number[] | number][] }[] = [
  // bfuzz.test.ts B-FUZZ bands, PR size, seed −1876657629 (shrunk): kerb refuses E_INVARIANT 'insert: no route from
  // (0, 228) to (43, 231) keeps clearance (§3.10) within the fidelity bound (N-43)'; replays on insertChain alone
  // (the overlay's segment 37 of 55)
  { id: 'R1', seed: '-1876657629', chords: [[[0, 3022], [35, 0], [76, 15]], [[4000, 3017], [0, 552], [5, 325]]] },
];

/** The register's seed clips. */
const CLIPS: { id: string; seed: string; rings: [number, number][][] }[] = [
  // bfuzz.test.ts B-FUZZ tileRings, PR size (shrunk): E_INVARIANT 'insert: no route from (1790, 2311) to (210, 2311) …'
  { id: 'R2', seed: 'B-FUZZ tileRings PR run 2026-10-05 21:0x', rings: [[[2267, 0], [797, 3800], [0, 5704]], [[-342, 241], [2342, -863], [1790, 2311], [210, 2311]], [[900, 900], [1100, 900], [1100, 1100], [900, 1100]]] },
];

/** R1's network: its two chords as given (points, not arc positions). */
function r1(chords: (typeof NETWORKS)[number]['chords']): ReturnType<typeof network> {
  const p = framed();
  const table: Record<string, ChordWidth> = {};
  chords.forEach(([a, b, w], i) => {
    const r = tx(p, spec(1), (o) => insertChain(o, [pt(a[0], a[1]), pt(b[0], b[1])], [{ role: 'way', entity: `way:${String(i)}` }], 'mandatory', Array.isArray(w) ? K : {}));
    expect(r.ok).toBe(true);
    table[`way:${String(i)}`] = Array.isArray(w) ? profile(w) : { halfWidthCm: w, ends: 'round' };
  });
  const faces: number[] = [];
  for (let f = 0; f < p.slots.face[1].top; f += 1) if (p.faces[1].kind[f] !== 0xffff) faces.push(f);
  commit(p, 1, (o) => setOwner(o, faces, 'district:1'));
  return { p, faces, table };
}

/**
 * Runs one registered network through the operation it refused (kerb on every face, corridorUnion at L2, bandUnion at
 * L3 after it) and returns the refusals met with their class; every refusal typed and the arena as it was.
 */
function rerun(op: string, build: () => ReturnType<typeof network>): RefusalClass[] {
  const { p, faces, table } = build();
  const ws = widthsOf(table);
  const before = state(p);
  const out: RefusalClass[] = [];
  if (op === 'kerb') {
    for (const f of faces) {
      const r = tx(p, spec(1), (o) => kerb(o, f, ws));
      if (!r.ok) out.push(classify(r, replayKerb(p, f, ws)));
      expect(state(p)).toBe(before);
    }
    return out;
  }
  const c = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws));
  if (!c.ok) {
    expect(state(p)).toBe(before);
    if (op === 'corridorUnion') out.push(classify(c, replayCommit({ build, level: 2, over: AT_S9, widths: ws, edgeRole: 'kerb', entityOf: (q, f) => idOf(q, q.faces[1].owner[f]) })));
    return out;
  }
  if (op !== 'bandUnion') return out;
  const chain = firstBand(table);
  if (chain.length === 0) return out;
  const b0 = state(p);
  const b = tx(p, spec(3, AT_S9), (o) => bandUnion(o, chain, faces, 'band', 'band:1'));
  if (!b.ok) {
    expect(state(p)).toBe(b0);
    const bw = widthsOf({ [chain[0].ref.entity]: { halfWidthCm: chain[0].halfWidthCm, ends: chain[0].ends } });
    const rebuilt = (): ReturnType<typeof network> => {
      const n = build();
      commit(n.p, 2, (o) => corridorUnion(o, n.faces, ws), AT_S9);
      return n;
    };
    out.push(classify(b, replayCommit({ build: rebuilt, level: 3, over: AT_S9, widths: bw, edgeRole: 'band', entityOf: () => 'band:1' })));
  }
  return out;
}

describe('the refusal register (N-44 (4)): each case refuses cleanly, and every refusal still met replays on insertChain alone', () => {
  for (const n of NETWORKS) {
    it(`${n.id} (seed ${n.seed}): kerb and corridorUnion — typed, no throw, nothing written, insertChain's`, () => {
      const k = rerun('kerb', () => r1(n.chords));
      const c = rerun('corridorUnion', () => r1(n.chords));
      for (const cls of [...k, ...c]) expect(cls).toBe('insertChain');
      console.info(`register ${n.id}: kerb refused on ${String(k.length)} faces; corridorUnion ${c.length === 0 ? 'committed' : 'refused'}`);
    });
  }
  for (const c of CLIPS) {
    it(`${c.id} (seed ${c.seed}): tileRings — typed, no throw, insertChain's`, () => {
      const rings = c.rings.map((ring) => ring.map(([x, y]) => P(x, y)));
      const r = tileRings(rings);
      if (!r.ok) expect(classify(r, replayTile(rings))).toBe('insertChain');
      console.info(`register ${c.id}: tileRings ${r.ok ? 'committed' : r.code}`);
    });
  }

  it('every case refused in a PR-size B-FUZZ run (refusals.json): typed, no throw, nothing written, insertChain\'s', { timeout: 1_800_000 }, () => {
    const reg = JSON.parse(readFileSync(new URL('./refusals.json', import.meta.url), 'utf8')) as { cases: { op: string; code: string; input: unknown }[] };
    const still: Record<string, Record<RefusalClass, number>> = {};
    for (const c of reg.cases) {
      expect(c.code).toBe('E_INVARIANT');
      let met: RefusalClass[] = [];
      if (c.op === 'tileRings') {
        const rings = (c.input as { x: number; y: number }[][]).map((ring) => ring.map((q) => P(q.x, q.y)));
        const r = tileRings(rings);
        if (!r.ok) met = [classify(r, replayTile(rings))];
      } else met = rerun(c.op, () => network(c.input as Chord[]));
      // a kerb refusal is counted once per case, as B-FUZZ counts it
      for (const cls of c.op === 'kerb' ? met.slice(0, 1) : met) {
        still[c.op] ??= { insertChain: 0, own: 0 };
        still[c.op][cls] += 1;
      }
    }
    console.info(`register refusals.json: ${String(reg.cases.length)} cases; still refused per operation and class ${JSON.stringify(still)}`);
    for (const op of Object.keys(still)) expect(still[op].own).toBe(0);
  });
});
