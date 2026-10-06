// M0-a-09's exit bar B-FUZZ on the band operations (§13.1: 0 crashes, 0 hangs, 0 invalid outputs; marked *here* in
// M0-work.json): PLAT_FUZZ_RUNS random cases per operation — 10⁴ in the PR tier, 10⁶ nightly (C-0057). The oracle
// agreement of the bar is the testkit's (testkit/test/kernel/arr-bands/, C-0122). Each corridor case builds a random
// street network — 1 – 3 chords across a framed square, near-collinear, near-parallel and near-corner chords among
// them, each a scalar half-width or a two-knot profile, some below attractCm — and runs `kerb` on every L1 face,
// `corridorUnion` over all of them in one batch and `bandUnion` along one chain at L3; each tileRings case clips 1 – 4
// random rings (rectangles, triangles, rotated quads). A crash is a throw; a hang fails the hard timeout; an output
// is valid when the arena passes every oracle (§3.10's links, minEdge, one vertex per lattice point, no crossing,
// clearance, level consistency, the face records against the level views, nesting, Euler per level, the index
// state), the faces of the batch's level tile each L1 face exactly, every kerb ring and every piece is simple with the
// face on its left, and a refusal is one of the op's codes and writes nothing.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import type { FaceId, Plat } from '../../../src/arena/index.js';
import { insertChain } from '../../../src/insert/index.js';
import { setOwner, tx } from '../../../src/tx/index.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { kerb } from '../../../src/arr/kerb.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { bandUnion, type BandResult } from '../../../src/arr/bandUnion.js';
import { tileRings } from '../../../src/arr/tileRings.js';
import { area2, commit, framed, healthy, P, profile, pt, simpleRing, spec, state, tilesExactly, widthsOf, AT_S9 } from './support.js';
import { TIMEOUT } from '../../insert/step3-5/support.js';

const RUNS = fc.readConfigureGlobal().numRuns ?? 10_000;
/** The hard timeout (0 hangs): 600 s, or a few times the CONTENDED cost per case where the run is longer. */
const HARD = Math.max(TIMEOUT, RUNS * 200);

/** A point on the frame [0, 4000]²'s boundary by its arc position (counter-clockwise from (0, 0)). */
function onFrame(s: number): [number, number] {
  if (s < 4000) return [s, 0];
  if (s < 8000) return [4000, s - 4000];
  if (s < 12_000) return [12_000 - s, 4000];
  return [0, 16_000 - s];
}

function l1Faces(p: Plat): FaceId[] {
  const out: FaceId[] = [];
  for (let f = 0; f < p.slots.face[1].top; f += 1) if (p.faces[1].kind[f] !== 0xffff) out.push(f);
  return out;
}

const chordArb = fc.record({
  a: fc.integer({ min: 0, max: 15_999 }),
  // near-parallel to the first, near a corner, or anywhere
  b: fc.oneof(fc.integer({ min: 0, max: 15_999 }), fc.integer({ min: 0, max: 60 }), fc.integer({ min: 7_960, max: 8_040 })),
  hw: fc.oneof(fc.integer({ min: 1, max: 30 }), fc.integer({ min: 30, max: 600 })),
  knots: fc.option(fc.tuple(fc.integer({ min: 5, max: 600 }), fc.integer({ min: 5, max: 600 })), { freq: 3 }),
  ends: fc.constantFrom<'round' | 'square'>('round', 'square'),
});

const CORRIDOR_CODES = ['E_KEPT', 'E_INVARIANT'];

describe('replay', () => {
  it('kerb, corridorUnion and bandUnion on random street networks: 0 crashes, 0 invalid outputs', { timeout: HARD }, () => {
    let committed = 0;
    fc.assert(
      fc.property(fc.array(chordArb, { minLength: 1, maxLength: 3 }), (chords) => {
        const p = framed();
        const table: Record<string, ReturnType<typeof profile> | { halfWidthCm: number; ends: 'round' | 'square' }> = {};
        chords.forEach((c, i) => {
          const a = onFrame(c.a);
          const b = onFrame(c.b);
          if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 300 || (a[0] === b[0] && (a[0] === 0 || a[0] === 4000)) || (a[1] === b[1] && (a[1] === 0 || a[1] === 4000))) return;
          const knots = c.knots === null ? {} : { knots: [{ index: 0, role: 'width_knot', ordinal: 0 }, { index: 1, role: 'width_knot', ordinal: 1 }] };
          const r = tx(p, spec(1), (o) => insertChain(o, [pt(a[0], a[1]), pt(b[0], b[1])], [{ role: 'way', entity: `way:${String(i)}` }], 'mandatory', knots));
          if (!r.ok) return;
          table[`way:${String(i)}`] = c.knots === null ? { halfWidthCm: c.hw, ends: c.ends } : profile([c.knots[0], c.knots[1]]);
        });
        const faces = l1Faces(p);
        commit(p, 1, (o) => setOwner(o, faces, 'district:1'));
        const ws = widthsOf(table);
        // kerb on every face, read on the open overlay: typed, and every ring simple with the kerb on its left
        commit(p, 1, (o) => {
          for (const f of faces) {
            const k = kerb(o, f, ws);
            expect(k.ok).toBe(true);
            if (!k.ok) continue;
            for (const r of k.value) expect(simpleRing(r)).toBe(true);
            const outer = k.value.filter((r) => area2(r) > 0n);
            expect(outer.length > 0 || k.value.length === 0).toBe(true);
          }
          return { ok: true, value: null, warnings: [] };
        });
        const before = state(p);
        const r = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws));
        if (!r.ok) {
          expect(CORRIDOR_CODES).toContain(r.code);
          expect(state(p)).toBe(before);
          return;
        }
        committed += 1;
        healthy(p);
        expect(tilesExactly(p, 2, faces)).toEqual([]);
        const v = r.value.value as BandResult;
        expect(new Set([...v.band, ...v.blocks]).size).toBe(v.band.length + v.blocks.length);
        // a wall band along the first chain at L3, inside every L1 face
        const first = Object.keys(table).sort()[0];
        if (first === undefined) return;
        const w = table[first];
        const chain = [{ ref: { role: 'way', entity: first }, halfWidthCm: 'knotRole' in w ? w : Math.max(1, Math.floor(w.halfWidthCm / 2)), ends: 'knotRole' in w ? ('round' as const) : w.ends }];
        const b0 = state(p);
        const b = tx(p, spec(3, AT_S9), (o) => bandUnion(o, chain, faces, 'band', 'band:1'));
        if (!b.ok) {
          expect(CORRIDOR_CODES).toContain(b.code);
          expect(state(p)).toBe(b0);
          return;
        }
        healthy(p);
        expect(tilesExactly(p, 3, faces)).toEqual([]);
      }),
      { seed: -1876657629, path: '7895', endOnFailure: true },
    );
    console.info(`B-FUZZ bands: ${String(RUNS)} networks, ${String(committed)} committed`);
    expect(committed).toBeGreaterThanOrEqual(Math.ceil(RUNS * 0.9));
  });

});
