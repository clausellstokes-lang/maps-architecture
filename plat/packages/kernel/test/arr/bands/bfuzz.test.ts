// M0-a-09's exit bar B-FUZZ on the band operations (§13.1: 0 crashes, 0 hangs, 0 invalid outputs; marked *here* in
// M0-work.json): PLAT_FUZZ_RUNS random cases per operation — 10⁴ in the PR tier, 10⁶ nightly (C-0057). The oracle
// agreement of the bar is the testkit's (testkit/test/kernel/arr-bands/, C-0122). Each corridor case builds a random
// street network — 1 – 3 chords across a framed square, near-collinear, near-parallel and near-corner chords among
// them, each a scalar half-width or a two-knot profile, some below attractCm — and runs `kerb` on every L1 face,
// `corridorUnion` over all of them in one batch and `bandUnion` along one chain at L3; each tileRings case clips 1 – 4
// random rings (rectangles, triangles, rotated quads). A crash is a throw; a hang fails the hard timeout; an output
// is valid when the arena passes every oracle (§3.10's links, minEdge, one vertex per lattice point, no crossing,
// clearance, level consistency, the face records against the level views, nesting, Euler per level, the index
// state), the faces of the batch's level tile each L1 face exactly, every split chain the kerb reading draws lies within
// its junction's reach (N-52 (2), C-0277 (1)), every kerb ring and every piece is simple with the face on its left, and
// a refusal is typed and writes nothing. Refusals are counted per operation and classed by
// replay (replay.ts; N-44 as amended by J203/J207/J208, C-0212 (10) as amended): one that replays on insertChain alone
// is insertChain's — counted, logged for the register (a REFUSAL line), never gated here; any other is the item's own
// and is held to ⌈runs / 10⁴⌉ per operation (PR size 1, nightly 100). N-57 (2) (round S4): every closing a committed
// corridorUnion or bandUnion made (`bandClosings`) stays by kerb(F) — a closing chord at most attractCm + 1 cm, its
// pin within the contact's 1 cm plus the hot pixel; a tip closed along the kerb's run on F's boundary within
// 2·√2·attractCm of its contact (where the insertion left it), the run's vertex on kerb(F); a contact pinned first
// within attractCm, the vertices it dropped within attractCm of it; a sliver piece folded within attractCm of F's
// boundary — never a chord off kerb(F) to a far vertex (the round S3 defect: chords of 76 – 1 404 cm, blocks up to
// 343 cm beyond kerb(F)).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { idOf } from '../../../src/arena/index.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { kerb, readKerb } from '../../../src/arr/kerb.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { bandClosings, bandUnion, type Closing, type BandResult } from '../../../src/arr/bandUnion.js';
import { tileRings } from '../../../src/arr/tileRings.js';
import { area2, closingsBeyond, commit, firstBand, healthy, network, P, simpleRing, spec, splitsBeyondReach, state, tilesExactly, widthsOf, AT_S9, type Chord } from './support.js';
import { tx } from '../../../src/tx/index.js';
import { classify, replayCommit, replayKerb, replayTile, type RefusalClass } from './replay.js';
import { TIMEOUT } from '../../insert/step3-5/support.js';

const RUNS = fc.readConfigureGlobal().numRuns ?? 10_000;
/** The hard timeout (0 hangs): 600 s, or a few times the CONTENDED cost per case where the run is longer. */
const HARD = Math.max(TIMEOUT, RUNS * 200);

const chordArb: fc.Arbitrary<Chord> = fc.record({
  a: fc.integer({ min: 0, max: 15_999 }),
  // near-parallel to the first, near a corner, or anywhere
  b: fc.oneof(fc.integer({ min: 0, max: 15_999 }), fc.integer({ min: 0, max: 60 }), fc.integer({ min: 7_960, max: 8_040 })),
  hw: fc.oneof(fc.integer({ min: 1, max: 30 }), fc.integer({ min: 30, max: 600 })),
  knots: fc.option(fc.tuple(fc.integer({ min: 5, max: 600 }), fc.integer({ min: 5, max: 600 })), { freq: 3 }),
  ends: fc.constantFrom<'round' | 'square'>('round', 'square'),
});

/**
 * N-44 (3) for a refusal caused in the item's own code: at most 1 per 10⁴ cases per operation (PR size 10⁴: 1; nightly
 * 10⁶: 100). Never raised without the owner.
 */
const OWN_CAP = Math.ceil(RUNS / 10_000);

type Tally = Record<RefusalClass, number>;
const tally = (): Tally => ({ insertChain: 0, own: 0 });

/** A refused case's line for the refusal register (N-44 (4)): the operation, its class, code and detail, the input. */
function registerLine(op: string, cls: RefusalClass, code: string, detail: string, input: unknown): void {
  console.info(`REFUSAL ${op} ${cls} ${code} ${detail.slice(0, 120)} INPUT ${JSON.stringify(input)}`);
}

describe('B-FUZZ (§13.1): the band operations on PLAT_FUZZ_RUNS random cases each', () => {
  it('kerb, corridorUnion and bandUnion on random street networks: 0 crashes, 0 invalid outputs', { timeout: HARD }, () => {
    let committed = 0;
    const refusals = { kerb: tally(), corridorUnion: tally(), bandUnion: tally() };
    const closings = { chord: 0, along: 0, pinned: 0, folded: 0, longestChordCm: 0 };
    const count = (cs: readonly Closing[]): void => {
      for (const c of cs) {
        closings[c.kind] += 1;
        if (c.kind === 'chord') closings.longestChordCm = Math.max(closings.longestChordCm, Math.round(c.chordCm * 100) / 100);
      }
    };
    fc.assert(
      fc.property(fc.array(chordArb, { minLength: 1, maxLength: 3 }), (chords) => {
        const { p, faces, table } = network(chords);
        const ws = widthsOf(table);
        // kerb on every face, read on the open overlay: typed, and every ring simple with the kerb on its left
        const read: { cls: RefusalClass | null } = { cls: null };
        const b0 = state(p);
        commit(p, 1, (o) => {
          for (const f of faces) {
            const k = kerb(o, f, ws);
            if (!k.ok) {
              // a typed refusal, never a crash (N-44 (1)); classed by replay, counted once per case
              const cls = classify(k, replayKerb(p, f, ws));
              if (read.cls === null) registerLine('kerb', cls, k.code, k.detail, chords);
              if (read.cls !== 'own') read.cls = cls;
              continue;
            }
            for (const r of k.value) expect(simpleRing(r)).toBe(true);
            const outer = k.value.filter((r) => area2(r) > 0n);
            expect(outer.length > 0 || k.value.length === 0).toBe(true);
            // N-52 (2), C-0277 (1): every split chain the kerb reading draws lies within its junction's reach
            const rk = readKerb(o.plat, f, ws);
            if (rk.ok) expect(splitsBeyondReach(o.plat, rk.value)).toEqual([]);
          }
          return { ok: true, value: null, warnings: [] };
        });
        // the read-only service writes nothing
        expect(state(p)).toBe(b0);
        if (read.cls !== null) refusals.kerb[read.cls] += 1;
        const before = state(p);
        const r = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws));
        if (!r.ok) {
          expect(state(p)).toBe(before);
          const cls = classify(r, replayCommit({ build: () => network(chords), level: 2, over: AT_S9, widths: ws, edgeRole: 'kerb', entityOf: (q, f) => idOf(q, q.faces[1].owner[f]) }));
          refusals.corridorUnion[cls] += 1;
          registerLine('corridorUnion', cls, r.code, r.detail, chords);
          return;
        }
        committed += 1;
        healthy(p);
        expect(tilesExactly(p, 2, faces)).toEqual([]);
        // N-57 (2): every closing by kerb(F) — no chord to a far vertex
        const kerbOf = (w: typeof ws) => (f: number) => {
          const k = readKerb(p, f, w);
          return k.ok ? k.value.kerb : null;
        };
        expect(closingsBeyond(bandClosings(p), kerbOf(ws)), JSON.stringify(chords)).toEqual([]);
        count(bandClosings(p));
        const v = r.value.value as BandResult;
        expect(new Set([...v.band, ...v.blocks]).size).toBe(v.band.length + v.blocks.length);
        // a wall band along the first chain at L3, inside every L1 face
        const chain = firstBand(table);
        if (chain.length === 0) return;
        const b1 = state(p);
        const b = tx(p, spec(3, AT_S9), (o) => bandUnion(o, chain, faces, 'band', 'band:1'));
        if (!b.ok) {
          expect(state(p)).toBe(b1);
          const bw = widthsOf({ [chain[0].ref.entity]: { halfWidthCm: chain[0].halfWidthCm, ends: chain[0].ends } });
          const cls = classify(
            b,
            replayCommit({
              build: () => {
                const n = network(chords);
                commit(n.p, 2, (o) => corridorUnion(o, n.faces, ws), AT_S9);
                return n;
              },
              level: 3,
              over: AT_S9,
              widths: bw,
              edgeRole: 'band',
              entityOf: () => 'band:1',
            }),
          );
          refusals.bandUnion[cls] += 1;
          registerLine('bandUnion', cls, b.code, b.detail, chords);
          return;
        }
        healthy(p);
        expect(tilesExactly(p, 3, faces)).toEqual([]);
        expect(closingsBeyond(bandClosings(p), kerbOf(widthsOf({ [chain[0].ref.entity]: { halfWidthCm: chain[0].halfWidthCm, ends: chain[0].ends } }))), JSON.stringify(chords)).toEqual([]);
        count(bandClosings(p));
      }),
      { numRuns: RUNS },
    );
    console.info(`B-FUZZ bands: ${String(RUNS)} networks, ${String(committed)} committed; refusals per operation ${JSON.stringify(refusals)} (insertChain's counted against its measured cap; own capped at ${String(OWN_CAP)}); closings ${JSON.stringify(closings)}`);
    expect(refusals.kerb.own).toBeLessThanOrEqual(OWN_CAP);
    expect(refusals.corridorUnion.own).toBeLessThanOrEqual(OWN_CAP);
    expect(refusals.bandUnion.own).toBeLessThanOrEqual(OWN_CAP);
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
    let overlap = 0;
    const refusals = tally();
    fc.assert(
      fc.property(fc.array(ringArb, { minLength: 1, maxLength: 4 }), (rings) => {
        const r = tileRings(rings);
        if (!r.ok) {
          // the overlap refusal is the design's answer to a holed piece (§3.4), a correct result, not an N-44 refusal
          if (r.code === 'E_DEGENERATE' && r.detail === 'overlap') {
            overlap += 1;
            return;
          }
          const cls = classify(r, replayTile(rings));
          refusals[cls] += 1;
          registerLine('tileRings', cls, r.code, r.detail, rings);
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
    console.info(`B-FUZZ tileRings: ${String(RUNS)} cases, ${String(overlap)} overlap results; refusals ${JSON.stringify(refusals)} (insertChain's counted against its measured cap; own capped at ${String(OWN_CAP)})`);
    expect(refusals.own).toBeLessThanOrEqual(OWN_CAP);
  });
});
