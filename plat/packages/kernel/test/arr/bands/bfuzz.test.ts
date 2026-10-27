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
// and is held to ⌈runs / 10⁴⌉ per operation (PR size 1, nightly 100). RULING J433: a refusal of the dry-run's own
// post-conditions (KEPT_DEEP, CENSUS_DEEP, UNLAID_DEEP) follows its cause — insertChain's where the replay of the same
// parts through insertChain alone shows the insertion changed the part at the refusing place (a run end displaced, a
// merge under minEdge, a run with no route; `classify`), its cause printed in the REFUSAL line and tallied per operation. N-57 (2) (round S4): every closing a committed
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
import { area2, closingsBeyond, commit, firstBand, healthy, nestingProblems, network, P, readIn, ringsOf, simpleRing, spec, splitsBeyondReach, spursOf, state, tilesExactly, wideNetwork, widthsOf, AT_S9, type Chord, type WideWay } from './support.js';
import { tx } from '../../../src/tx/index.js';
import { causeOf, classify, replayCommit, replayKerb, replayTile, type RefusalClass, type Replay } from './replay.js';
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

/** A refused case's line for the refusal register (N-44 (4)): the operation, its class, code and detail, its cause (J433), the input. */
function registerLine(op: string, cls: RefusalClass, code: string, detail: string, input: unknown, replay: Replay | null = null): void {
  console.info(`REFUSAL ${op} ${cls} ${code} ${detail.slice(0, 120)} CAUSE ${causeOf(replay)} INPUT ${JSON.stringify(input)}`);
}

/** The cause tally of insertChain's refusals per operation (J433 (4)): the replay's reading, or 'replays' (the same refusal met). */
const causes: Record<string, Record<string, number>> = {};
function tallyCause(into: Record<string, Record<string, number>>, op: string, cls: RefusalClass, replay: Replay | null): void {
  const k = cls === 'own' ? 'own' : replay?.held === undefined ? 'replays' : replay.held.reading;
  into[op] ??= {};
  into[op][k] = (into[op][k] ?? 0) + 1;
}


/** What one run of the network property accumulates. */
interface Acc {
  committed: number;
  readonly refusals: { kerb: Tally; corridorUnion: Tally; bandUnion: Tally };
  readonly causes: Record<string, Record<string, number>>;
  readonly count: (cs: readonly Closing[]) => void;
}

/**
 * One network of the property (B-FUZZ's chords, or the widened family's ways): `build` makes it on a fresh arena each
 * call (the replays build it again), `input` is what a refusal's register line carries.
 */
function checkNetwork(build: () => ReturnType<typeof network>, input: unknown, acc: Acc): void {
  const { p, faces, table } = build();
  const ws = widthsOf(table);
  // kerb on every face, read on the open overlay: typed, and every ring simple with the kerb on its left
  const read: { cls: RefusalClass | null; replay: Replay | null } = { cls: null, replay: null };
  const b0 = state(p);
  commit(p, 1, (o) => {
    for (const f of faces) {
      // the read-only service writes nothing — the arena, and the batch's work, warnings and journals (C-0417:
      // the dry-run lays its parts on a shell of the batch's arena and puts them back)
      const before = { work: o.work.total, warnings: JSON.stringify(o.warnings), journal: JSON.stringify(o.journal) };
      const k = kerb(o, f, ws);
      expect({ work: o.work.total, warnings: JSON.stringify(o.warnings), journal: JSON.stringify(o.journal) }).toEqual(before);
      if (!k.ok) {
        // a typed refusal, never a crash (N-44 (1)); classed by replay on its dry-run, counted once per case
        const rp = replayKerb(o, f, ws);
        const cls = classify(k, rp);
        if (read.cls === null) {
          registerLine('kerb', cls, k.code, k.detail, input, rp);
          read.replay = rp;
        }
        if (read.cls !== 'own') read.cls = cls;
        continue;
      }
      for (const r of k.value) expect(simpleRing(r)).toBe(true);
      // holes clockwise inside an outer ring, no outer ring inside another (notes row 13)
      expect(nestingProblems(k.value)).toEqual([]);
      const outer = k.value.filter((r) => area2(r) > 0n);
      expect(outer.length > 0 || k.value.length === 0).toBe(true);
      // N-52 (2), C-0277 (1): every split chain the kerb reading draws lies within its junction's reach
      const rk = readKerb(o, f, ws);
      if (rk.ok) expect(splitsBeyondReach(o.plat, rk.value)).toEqual([]);
    }
    return { ok: true, value: null, warnings: [] };
  });
  // the read-only service writes nothing
  expect(state(p)).toBe(b0);
  if (read.cls !== null) {
    acc.refusals.kerb[read.cls] += 1;
    tallyCause(acc.causes, 'kerb', read.cls, read.replay);
  }
  const before = state(p);
  const r = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws));
  if (!r.ok) {
    expect(state(p)).toBe(before);
    const rp = replayCommit({ build, level: 2, over: AT_S9, widths: ws, edgeRole: 'kerb', entityOf: (q, f) => idOf(q, q.faces[1].owner[f]) });
    const cls = classify(r, rp);
    acc.refusals.corridorUnion[cls] += 1;
    tallyCause(acc.causes, 'corridorUnion', cls, rp);
    registerLine('corridorUnion', cls, r.code, r.detail, input, rp);
    return;
  }
  acc.committed += 1;
  healthy(p);
  expect(tilesExactly(p, 2, faces)).toEqual([]);
  // KI-1 (notes row 1): no spur of the commit's own in any face — the count pinned at 0
  expect(spursOf(p, 2, faces), JSON.stringify(input)).toEqual([]);
  // N-57 (2): every closing by kerb(F) — no chord to a far vertex
  // bandUnion's kerb reads the chain's edge spines only (C-0380); corridorUnion's its vertex contacts too
  // read after the commit in an L1 batch, as S8 reads it (the dry-run lays its parts at L2, kerb.ts `dryLevel`, so
  // it meets the committed kerb: an along closing is committed only where this read holds its run vertex, C-0421)
  const kerbOf = (w: typeof ws, vertexContacts = true) => (f: number) => {
    const k = readIn(p, 1, (o) => readKerb(o, f, w, undefined, vertexContacts));
    return k.ok ? k.value.kerb : null;
  };
  expect(closingsBeyond(bandClosings(p), kerbOf(ws)), JSON.stringify(input)).toEqual([]);
  acc.count(bandClosings(p));
  const v = r.value.value as BandResult;
  expect(new Set([...v.band, ...v.blocks]).size).toBe(v.band.length + v.blocks.length);
  // a wall band along the first chain at L3, inside every L1 face
  const chain = firstBand(table);
  if (chain.length === 0) return;
  const bw = widthsOf({ [chain[0].ref.entity]: { halfWidthCm: chain[0].halfWidthCm, ends: chain[0].ends } });
  // bandUnion's closings are judged against its own reading: kerb(F) read in an L3 batch before it commits, beside
  // S9's committed kerb (the dry-run's attractors are the content an L3 insertion meets; notes row 42)
  const bandKerb = new Map<number, ReturnType<ReturnType<typeof kerbOf>>>();
  readIn(p, 3, (o) => {
    for (const f of faces) {
      const k = readKerb(o, f, bw, undefined, false);
      bandKerb.set(f, k.ok ? k.value.kerb : null);
    }
    return null;
  });
  const b1 = state(p);
  const b = tx(p, spec(3, AT_S9), (o) => bandUnion(o, chain, faces, 'band', 'band:1'));
  if (!b.ok) {
    expect(state(p)).toBe(b1);
    const rp = replayCommit({
      build: () => {
        const n = build();
        commit(n.p, 2, (o) => corridorUnion(o, n.faces, ws), AT_S9);
        return n;
      },
      level: 3,
      over: AT_S9,
      widths: bw,
      edgeRole: 'band',
      vertexContacts: false,
      entityOf: () => 'band:1',
    });
    const cls = classify(b, rp);
    acc.refusals.bandUnion[cls] += 1;
    tallyCause(acc.causes, 'bandUnion', cls, rp);
    registerLine('bandUnion', cls, b.code, b.detail, input, rp);
    return;
  }
  healthy(p);
  expect(tilesExactly(p, 3, faces)).toEqual([]);
  expect(spursOf(p, 3, faces), JSON.stringify(input)).toEqual([]);
  expect(closingsBeyond(bandClosings(p), (f: number) => bandKerb.get(f) ?? null), JSON.stringify(input)).toEqual([]);
  acc.count(bandClosings(p));
}

/** A fresh accumulator and its closing tally. */
function newAcc(into: Record<string, Record<string, number>>): { acc: Acc; closings: { chord: number; along: number; pinned: number; folded: number; longestChordCm: number } } {
  const closings = { chord: 0, along: 0, pinned: 0, folded: 0, longestChordCm: 0 };
  const acc: Acc = {
    committed: 0,
    refusals: { kerb: tally(), corridorUnion: tally(), bandUnion: tally() },
    causes: into,
    count: (cs) => {
      for (const c of cs) {
        closings[c.kind] += 1;
        if (c.kind === 'chord') closings.longestChordCm = Math.max(closings.longestChordCm, Math.round(c.chordCm * 100) / 100);
      }
    },
  };
  return { acc, closings };
}

describe('B-FUZZ (§13.1): the band operations on PLAT_FUZZ_RUNS random cases each', () => {
  it('kerb, corridorUnion and bandUnion on random street networks: 0 crashes, 0 invalid outputs', { timeout: HARD }, () => {
    const { acc, closings } = newAcc(causes);
    const refusals = acc.refusals;
    fc.assert(
      fc.property(fc.array(chordArb, { minLength: 1, maxLength: 3 }), (chords) => {
        checkNetwork(() => network(chords), chords, acc);
      }),
      { numRuns: RUNS },
    );
    console.info(`B-FUZZ bands: ${String(RUNS)} networks, ${String(acc.committed)} committed; refusals per operation ${JSON.stringify(refusals)} (insertChain's counted against its measured cap; own capped at ${String(OWN_CAP)}); by cause ${JSON.stringify(causes)}; closings ${JSON.stringify(closings)}`);
    expect(refusals.kerb.own).toBeLessThanOrEqual(OWN_CAP);
    expect(refusals.corridorUnion.own).toBeLessThanOrEqual(OWN_CAP);
    expect(refusals.bandUnion.own).toBeLessThanOrEqual(OWN_CAP);
  });

  it('the widened family (notes row 13): bent chords, dead-end antennae and ring ways (islands: faces with holes) — 0 crashes, 0 invalid outputs', { timeout: HARD }, () => {
    // a fifth of the run's size: each network 1 – 3 ways, each a bent chord (frame → an interior bend → frame: a spine's
    // own bend, the faces either side turning at it), a dead end (frame → an interior point: an antenna, its round or
    // square end inside the face), or a closed ring way well inside the frame (an island: the face round it has a hole,
    // its kerb a ring set with a hole); scalar half-widths or two-knot profiles on the open ways, round or square ends
    const runs = Math.max(100, Math.ceil(RUNS / 5));
    const wayArb: fc.Arbitrary<WideWay> = fc.record({
      kind: fc.constantFrom<'bent' | 'dead' | 'ring'>('bent', 'dead', 'ring'),
      a: fc.integer({ min: 0, max: 15_999 }),
      b: fc.integer({ min: 0, max: 15_999 }),
      x: fc.integer({ min: 400, max: 3600 }),
      y: fc.integer({ min: 400, max: 3600 }),
      w: fc.integer({ min: 300, max: 1600 }),
      h: fc.integer({ min: 300, max: 1600 }),
      hw: fc.oneof(fc.integer({ min: 1, max: 30 }), fc.integer({ min: 30, max: 300 })),
      knots: fc.option(fc.tuple(fc.integer({ min: 5, max: 300 }), fc.integer({ min: 5, max: 300 })), { freq: 3 }),
      ends: fc.constantFrom<'round' | 'square'>('round', 'square'),
    }).map((c) => (c.kind === 'ring' ? { ...c, x: Math.min(c.x, 3700 - c.w), y: Math.min(c.y, 3700 - c.h) } : c));
    const into: Record<string, Record<string, number>> = {};
    const { acc, closings } = newAcc(into);
    let holes = 0;
    fc.assert(
      fc.property(fc.array(wayArb, { minLength: 1, maxLength: 3 }), (ways) => {
        const n = wideNetwork(ways);
        for (const f of n.faces) if (ringsOf(n.p, 1, f).length > 1) holes += 1;
        checkNetwork(() => wideNetwork(ways), ways, acc);
      }),
      { numRuns: runs },
    );
    console.info(`B-FUZZ bands (widened): ${String(runs)} networks, ${String(acc.committed)} committed, ${String(holes)} faces with a hole; refusals per operation ${JSON.stringify(acc.refusals)} (counted and logged, uncapped: the session's ruling, notes row 13 of round S14); by cause ${JSON.stringify(into)}; closings ${JSON.stringify(closings)}`);
    // the family reaches what it was widened for: faces with holes
    expect(holes).toBeGreaterThan(0);
    // every output valid (checkNetwork), every refusal typed and writing nothing; the item's own refusals of this family
    // — KEPT_DEEP on faces round crossing ring ways, a dangling tip at a dead end's antenna (REFUSAL lines, seeds in the
    // round's notes) — are lawful-input refusals routed to the session (ZERO REFUSALS, J264; N-58: MAKE-IT-SUCCEED): N-44
    // (3)'s cap is the registered family's above, never widened, and this family's count is reported, not gated
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
