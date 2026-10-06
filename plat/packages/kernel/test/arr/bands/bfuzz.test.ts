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

/** N-44 (3): at most 1 refusal per 10⁴ cases per operation (PR size 10⁴: 1; nightly 10⁶: 100). Never raised without the owner. */
const REFUSAL_CAP = Math.ceil(RUNS / 10_000);

/** A refused case's line for the refusal register (N-44 (4)): the operation, its code and detail, the input. */
function registerLine(op: string, code: string, detail: string, input: unknown): void {
  console.info(`REFUSAL ${op} ${code} ${detail.slice(0, 120)} INPUT ${JSON.stringify(input)}`);
}

describe('B-FUZZ (§13.1): the band operations on PLAT_FUZZ_RUNS random cases each', () => {
  it('kerb, corridorUnion and bandUnion on random street networks: 0 crashes, 0 invalid outputs', { timeout: HARD }, () => {
    let committed = 0;
    const refusals = { kerb: 0, corridorUnion: 0, bandUnion: 0 };
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
        let refusedRead = false;
        commit(p, 1, (o) => {
          for (const f of faces) {
            const k = kerb(o, f, ws);
            if (!k.ok) {
              // the scratch overlay's insertion refusing a route (N-43; N-44 (1)): a typed refusal, never a crash —
              // counted per operation under N-44's cap and logged for the register
              expect(k.code).toBe('E_INVARIANT');
              expect(k.detail.startsWith('insert:')).toBe(true);
              if (!refusedRead) registerLine('kerb', k.code, k.detail, chords);
              refusedRead = true;
              continue;
            }
            for (const r of k.value) expect(simpleRing(r)).toBe(true);
            const outer = k.value.filter((r) => area2(r) > 0n);
            expect(outer.length > 0 || k.value.length === 0).toBe(true);
          }
          return { ok: true, value: null, warnings: [] };
        });
        if (refusedRead) refusals.kerb += 1;
        const before = state(p);
        const r = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws));
        if (!r.ok) {
          expect(CORRIDOR_CODES).toContain(r.code);
          expect(state(p)).toBe(before);
          refusals.corridorUnion += 1;
          registerLine('corridorUnion', r.code, r.detail, chords);
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
          refusals.bandUnion += 1;
          registerLine('bandUnion', b.code, b.detail, chords);
          return;
        }
        healthy(p);
        expect(tilesExactly(p, 3, faces)).toEqual([]);
      }),
      { numRuns: RUNS },
    );
    console.info(`B-FUZZ bands: ${String(RUNS)} networks, ${String(committed)} committed; refusals per operation ${JSON.stringify(refusals)} (N-44 cap ${String(REFUSAL_CAP)})`);
    expect(refusals.kerb).toBeLessThanOrEqual(REFUSAL_CAP);
    expect(refusals.corridorUnion).toBeLessThanOrEqual(REFUSAL_CAP);
    expect(refusals.bandUnion).toBeLessThanOrEqual(REFUSAL_CAP);
  });

  it('tileRings on random ring lists: 0 crashes, every piece simple and counter-clockwise, or the overlap refusal', { timeout: HARD }, () => {
    const ringArb: fc.Arbitrary<LatticePoint[]> = fc.oneof(
      fc.tuple(fc.integer({ min: 0, max: 5000 }), fc.integer({ min: 0, max: 5000 }), fc.integer({ min: 30, max: 4000 }), fc.integer({ min: 30, max: 4000 })).map(([x, y, w, h]) => [P(x, y), P(x + w, y), P(x + w, y + h), P(x, y + h)]),
      fc.tuple(fc.integer({ min: 0, max: 8000 }), fc.integer({ min: 0, max: 8000 }), fc.integer({ min: 0, max: 8000 }), fc.integer({ min: 0, max: 8000 }), fc.integer({ min: 0, max: 8000 }), fc.integer({ min: 0, max: 8000 })).map(([a, b, c, d, e, f]) => {
        const t = [P(a, b), P(c, d), P(e, f)];
        return area2(t) < 0n ? t.reverse() : t;
      }),
      fc.tuple(fc.integer({ min: 1000, max: 7000 }), fc.integer({ min: 1000, max: 7000 }), fc.integer({ min: 100, max: 3000 }), fc.integer({ min: 100, max: 3000 }), fc.integer({ min: -1000, max: 1000 })).map(([cx, cy, w, h, s]) => [P(cx - w, cy - h + s), P(cx + w, cy - h - s), P(cx + w - s, cy + h), P(cx - w + s, cy + h)]),
    );
    let refused = 0;
    let pending = 0;
    fc.assert(
      fc.property(fc.array(ringArb, { minLength: 1, maxLength: 4 }), (rings) => {
        const r = tileRings(rings);
        if (!r.ok) {
          if (r.code === 'E_INVARIANT') {
            // the overlay's insertion refusing a route (N-43; N-44 (1)): typed, counted under N-44's cap
            expect(r.detail.startsWith('insert:')).toBe(true);
            pending += 1;
            registerLine('tileRings', r.code, r.detail, rings);
            return;
          }
          expect(r.code).toBe('E_DEGENERATE');
          expect(r.detail).toBe('overlap');
          refused += 1;
          return;
        }
        expect(r.value.length).toBe(rings.length);
        for (const pieces of r.value) {
          for (const q of pieces) {
            expect(area2(q) > 0n).toBe(true);
            expect(simpleRing(q)).toBe(true);
          }
        }
      }),
      { numRuns: RUNS },
    );
    // the overlap refusal is the design's answer to a holed piece (§3.4), a correct result, not an N-44 refusal
    console.info(`B-FUZZ tileRings: ${String(RUNS)} cases, ${String(refused)} overlap results; N-44 refusals ${String(pending)} (cap ${String(REFUSAL_CAP)})`);
    expect(pending).toBeLessThanOrEqual(REFUSAL_CAP);
  });
});
