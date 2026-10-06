// M0-a-09's refusal register (N-44 (4)): every refused case found at PR or nightly size kept as a fixture — its seed,
// its input and its refusal code — with a test that it refuses cleanly: no throw, a typed KernelResult refusal, the
// arena as it was (§2.2 rule 8). Each is the scratch overlay's insertion refusing a route (N-43's fidelity bound) and
// replays on insertChain alone (C-0212): insertChain's PENDING-S4 (M0-a-05's round S4). A case a later routing round
// turns into a commit passes here too, as a commit within the bars the other tests check (N-44: better routing is the
// post-M0 item's); its row then leaves the register.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { insertChain } from '../../../src/insert/index.js';
import { setOwner, tx } from '../../../src/tx/index.js';
import { kerb } from '../../../src/arr/kerb.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { tileRings } from '../../../src/arr/tileRings.js';
import { bandUnion } from '../../../src/arr/bandUnion.js';
import { AT_S9, commit, framed, P, profile, pt, spec, state, widthsOf } from './support.js';

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

describe('the refusal register (N-44 (4)): each case refuses cleanly', () => {
  for (const n of NETWORKS) {
    it(`${n.id} (seed ${n.seed}): kerb and corridorUnion — typed, no throw, nothing written`, () => {
      const p = framed();
      const table: Record<string, ReturnType<typeof profile> | number> = {};
      n.chords.forEach(([a, b, w], i) => {
        const r = tx(p, spec(1), (o) => insertChain(o, [pt(a[0], a[1]), pt(b[0], b[1])], [{ role: 'way', entity: `way:${String(i)}` }], 'mandatory', Array.isArray(w) ? K : {}));
        expect(r.ok).toBe(true);
        table[`way:${String(i)}`] = Array.isArray(w) ? profile(w) : w;
      });
      const faces: number[] = [];
      for (let f = 0; f < p.slots.face[1].top; f += 1) if (p.faces[1].kind[f] !== 0xffff) faces.push(f);
      commit(p, 1, (o) => setOwner(o, faces, 'district:1'));
      const ws = widthsOf(table);
      let refused = 0;
      const before = state(p);
      for (const f of faces) {
        const r = tx(p, spec(1), (o) => kerb(o, f, ws));
        if (!r.ok) {
          expect(r.code).toBe('E_INVARIANT');
          expect(r.detail.startsWith('insert:')).toBe(true);
          refused += 1;
        }
        expect(state(p)).toBe(before);
      }
      const c = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws));
      if (!c.ok) {
        expect(c.code).toBe('E_INVARIANT');
        expect(state(p)).toBe(before);
      }
      console.info(`register ${n.id}: kerb refused on ${String(refused)} of ${String(faces.length)} faces; corridorUnion ${c.ok ? 'committed' : c.code}`);
    });
  }
  for (const c of CLIPS) {
    it(`${c.id} (seed ${c.seed}): tileRings — typed, no throw`, () => {
      const r = tileRings(c.rings.map((ring) => ring.map(([x, y]) => P(x, y))));
      if (!r.ok) {
        expect(r.code).toBe('E_INVARIANT');
        expect(r.detail.startsWith('insert:')).toBe(true);
      }
      console.info(`register ${c.id}: tileRings ${r.ok ? 'committed' : r.code}`);
    });
  }

  it('every case refused in the PR-size B-FUZZ run (refusals.json): typed, no throw, nothing written', { timeout: 600_000 }, () => {
    const reg = JSON.parse(readFileSync(new URL('./refusals.json', import.meta.url), 'utf8')) as { cases: { op: string; code: string; input: unknown }[] };
    const still: Record<string, number> = {};
    for (const c of reg.cases) {
      expect(c.code).toBe('E_INVARIANT');
      let refused = false;
      if (c.op === 'tileRings') {
        const r = tileRings((c.input as { x: number; y: number }[][]).map((ring) => ring.map((q) => P(q.x, q.y))));
        if (!r.ok) {
          expect(r.code).toBe('E_INVARIANT');
          refused = true;
        }
      } else {
        const { p, faces, table } = network(c.input as Chord[]);
        const ws = widthsOf(table);
        const before = state(p);
        if (c.op === 'kerb') {
          for (const f of faces) {
            const r = tx(p, spec(1), (o) => kerb(o, f, ws));
            if (!r.ok) {
              expect(r.code).toBe('E_INVARIANT');
              refused = true;
            }
            expect(state(p)).toBe(before);
          }
        } else {
          const r = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws));
          if (!r.ok) {
            expect(r.code).toBe('E_INVARIANT');
            expect(state(p)).toBe(before);
            refused = c.op === 'corridorUnion';
          } else if (c.op === 'bandUnion') {
            const first = Object.keys(table).sort()[0];
            const w = table[first];
            const b0 = state(p);
            const b = tx(p, spec(3, AT_S9), (o) => bandUnion(o, [{ ref: { role: 'way', entity: first }, halfWidthCm: typeof w === 'number' ? w : 'knotRole' in w ? w : Math.max(1, Math.floor(w.halfWidthCm / 2)), ends: typeof w === 'number' || 'knotRole' in w ? 'round' : w.ends }], faces, 'band', 'band:1'));
            if (!b.ok) {
              expect(b.code).toBe('E_INVARIANT');
              expect(state(p)).toBe(b0);
              refused = true;
            }
          }
        }
      }
      if (refused) still[c.op] = (still[c.op] ?? 0) + 1;
    }
    console.info(`register refusals.json: ${String(reg.cases.length)} cases; still refused per operation ${JSON.stringify(still)}`);
  });
});

/** A B-FUZZ chord: arc positions on the frame [0, 4000]², a half-width or a two-knot profile, the ends. */
interface Chord {
  a: number;
  b: number;
  hw: number;
  knots: [number, number] | null;
  ends: 'round' | 'square';
}

function onFrame(s: number): [number, number] {
  if (s < 4000) return [s, 0];
  if (s < 8000) return [4000, s - 4000];
  if (s < 12_000) return [12_000 - s, 4000];
  return [0, 16_000 - s];
}

/** B-FUZZ's street network from its chords (bfuzz.test.ts's construction, step for step). */
function network(chords: readonly Chord[]): { p: ReturnType<typeof framed>; faces: number[]; table: Record<string, ReturnType<typeof profile> | { halfWidthCm: number; ends: 'round' | 'square' }> } {
  const p = framed();
  const table: Record<string, ReturnType<typeof profile> | { halfWidthCm: number; ends: 'round' | 'square' }> = {};
  chords.forEach((c, i) => {
    const a = onFrame(c.a);
    const b = onFrame(c.b);
    if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 300 || (a[0] === b[0] && (a[0] === 0 || a[0] === 4000)) || (a[1] === b[1] && (a[1] === 0 || a[1] === 4000))) return;
    const r = tx(p, spec(1), (o) => insertChain(o, [pt(a[0], a[1]), pt(b[0], b[1])], [{ role: 'way', entity: `way:${String(i)}` }], 'mandatory', c.knots === null ? {} : K));
    if (!r.ok) return;
    table[`way:${String(i)}`] = c.knots === null ? { halfWidthCm: c.hw, ends: c.ends } : profile([c.knots[0], c.knots[1]]);
  });
  const faces: number[] = [];
  for (let f = 0; f < p.slots.face[1].top; f += 1) if (p.faces[1].kind[f] !== 0xffff) faces.push(f);
  commit(p, 1, (o) => setOwner(o, faces, 'district:1'));
  return { p, faces, table };
}
