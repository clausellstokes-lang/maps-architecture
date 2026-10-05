// M0-a-15's bar over M0-k-01's fuzz arenas (§13.1: "save → load → save byte-identical and the loaded arena passing
// every hard invariant"; §16 M0 (a)): each run draws a polygon, a holed polygon, a chain, a thin chain, a near-collinear
// ring, a self-touching ring and one face of the M0 (b) set from M0-k-01's arbitraries, inserts them into a framed arena
// at L1 … L4 (a refused insertion leaves the arena as it was, §2.2 rule 8), and round-trips the result. PLAT_FUZZ_RUNS
// sets the run count (C-0057; the PR size by default).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { describeChunk, insertChain, type Level, type Overlay, type Plat } from '@plat/kernel';
import { arb, fuzzParams, fuzzRuns, FUZZ_FACE_KINDS } from '../../../src/fuzz/index.js';
import { determinismPoint as lp, fixtureSpec, framedArena, runBatch } from '../../../src/determinism/index.js';
import { roundTrip } from './support.js';

const RUNS = fuzzRuns();
/** The run may take this long at the nightly size (the PR's 10⁴ takes minutes), as the sibling bar folders allow. */
const TIMEOUT = 3_600_000;
const LIMIT = 200_000;
const FRAME = 250_000;

type Pt = { readonly x: number; readonly y: number };

function put(p: Plat, level: Level, pts: readonly Pt[], role: string, entity: string, closed: boolean): boolean {
  return runBatch(p, {
    spec: fixtureSpec(level),
    fn: (o: Overlay) => insertChain(o, pts.map((q) => lp(q.x, q.y)), [{ role, entity }], 'mandatory', closed ? { closed: true } : {}),
  }).ok;
}

describe('the round trip over the fuzz arenas (§13.1, M0-k-01)', () => {
  it(`${RUNS} fuzz arenas: save → load → save byte-identical, equal, every hard invariant`, { timeout: TIMEOUT }, () => {
    const seen = { inserted: 0, partitions: 0, levels: new Set<number>() };
    fc.assert(
      fc.property(
        arb.polygon({ limitCm: LIMIT, vertices: [3, 24] }),
        arb.holedPolygon({ limitCm: LIMIT }),
        arb.chain({ limitCm: LIMIT, vertices: [2, 12] }),
        arb.thin({ limitCm: LIMIT, shape: 'chain' }),
        arb.nearCollinear({ limitCm: LIMIT }),
        arb.selfTouching({ limitCm: LIMIT }),
        fc.constantFrom(...FUZZ_FACE_KINDS).chain((k) => arb.faceSet(k, { halfSideCm: LIMIT, scale: 'plot' })),
        (ring, holed, ch, thin, near, touching, face) => {
          const p = framedArena(-FRAME, -FRAME, FRAME, FRAME);
          const ok = [
            put(p, 1, ring, 'way', 'way:ring', true),
            put(p, 1, near, 'district_bound', 'district:near', true),
            ...holed.polygon.map((r, i) => put(p, 2, r, 'kerb', `court:${i}`, true)),
            put(p, 2, ch, 'kerb', 'lane:chain', false),
            put(p, 3, thin, 'plot_line', 'plot:thin', false),
            put(p, 3, touching, 'plot_line', 'plot:touching', true),
            ...face.polygon.map((r, i) => put(p, 4, r, 'yard_part', `building:${i}`, true)),
          ];
          seen.inserted += ok.filter((x) => x).length;
          const { chunks } = roundTrip(p);
          seen.partitions += chunks.length - 1;
          for (const c of chunks.slice(1)) seen.levels.add(describeChunk(c.bytes).level);
        },
      ),
      { ...fuzzParams('m0-a-15/round-trip'), numRuns: RUNS },
    );
    // The arenas carried finer content: every partition level was written and read.
    expect(seen.inserted).toBeGreaterThan(RUNS);
    expect([...seen.levels].sort()).toEqual([2, 3, 4]);
  });
});
