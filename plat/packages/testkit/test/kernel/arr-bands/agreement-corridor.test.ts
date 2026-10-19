// M0-a-09's differential agreement for corridorUnion with both oracles (§3.7 (i) "Oracles, not fallbacks"; §13.1; the
// exit bar B-FUZZ's oracle part): the committed L2 kerb geometry — the built blocks — against each oracle's
// F − ⋃ buffer(spine, half-width), and the union of the bands against each oracle's F ∩ ⋃ buffer, split by
// attraction as M0-k-03's compareSplit judges, drawn from M0-k-01's face set and M0-k-02's tunnel fixture. The
// placement is C-0122's; the vacuity guard N-14's (support.ts).
import fc from 'fast-check';
import { beforeAll, describe, expect, it } from 'vitest';
import { loadOracles } from '../../../src/oracles/index.js';
import { dedupe, ringProblems } from '../../../src/oracles/rings.js';
import { corridorCaseArb, deadEndCaseArb, judgeCorridor, newHarness, oracleBands, oursCorridor, RUNS, TIMEOUT, verdict, type CorridorCase } from './support.js';

beforeAll(async () => {
  await loadOracles();
});

describe('corridorUnion agrees with the oracles’ F − ⋃ buffer(spine, half-width) and their union of the bands (§3.7 (i))', () => {
  it('the built blocks and the bands, by attraction', { timeout: TIMEOUT }, () => {
    const h = newHarness();
    fc.assert(
      fc.property(corridorCaseArb, (c) => {
        judgeCorridor(h, c);
      }),
      { numRuns: RUNS },
    );
    verdict(h, 'corridorUnion');
    verdict(h, 'corridorUnion-bands');
  });

  it('the dead-end cases whose kerb piece lost its closing chord before N-57 (2): the blocks and the bands agree', () => {
    // two draws of `deadEndCaseArb` the pre-round engine committed with a piece dangling — its contact attracted onto the
    // piece's vertex beside it, the strip one face with the block (the area comparison failed on both oracles): a thin
    // triangle crossed by a lane meeting its edges at 11.6° / 16.8° (an unseeded PR-size run, 2026-10-11), and one at
    // PLAT_FUZZ_SEED 7 (40 000 runs)
    const P = (x: number, y: number): CorridorCase['ring'][number] => ({ x, y }) as CorridorCase['ring'][number];
    const cases: CorridorCase[] = [
      { ring: [P(-6611, -39999), P(-20897, -42939), P(-22556, -44801)], chord: [P(-18313, -42407), P(-14583, -42400)], hw: 188.4, role: 'way', key: { layer: 'ground', part: 0 }, source: 'dead-end', deadEnd: true },
      { ring: [P(-2870, 38651), P(-9322, 35937), P(1869, 33852)], chord: [P(638, 35098), P(-6704, 37038)], hw: 199.84, role: 'way', key: { layer: 'ground', part: 0 }, source: 'dead-end', deadEnd: true },
    ];
    const h = newHarness();
    for (const c of cases) judgeCorridor(h, c, 'deadEnd');
    expect(h.failures).toEqual([]);
    for (const op of ['deadEnd', 'deadEnd-bands']) {
      const line = h.report.line(op);
      expect(line.failures).toEqual({});
      expect(line.draws).toBe(cases.length);
      expect(line.unattractedPass + line.attractedPass).toBe(cases.length);
    }
    expect(h.settled).toEqual({});
  });

  it('an unattracted polygon+chord case whose band sliver the dry-run once labelled at a point on its boundary: the blocks and the bands agree (round S9, notes row 55)', () => {
    // a PR-size run of round S9 (unseeded, 2026-10-19): the chord is attracted through the triangle's corner (35600,
    // 55196); the strip of the triangle's lower edge pokes above the chord there, and the sliver face between it, the
    // chord's arena edge and the left edge's strip was labelled at a point 0.5 cm above the chord's edge — under the chord
    // strip's cycle, whose window stretch joins its points by a straight chord the arena's edge runs a hot pixel off — so
    // a 120 cm band sliver was kept as a third block (the faces comparison failed on both oracles); the dry-run now labels
    // a face at its candidate deepest from its boundary (kerb.ts `labelPoint`)
    const P = (x: number, y: number): CorridorCase['ring'][number] => ({ x, y }) as CorridorCase['ring'][number];
    const c: CorridorCase = { ring: [P(41107, 58683), P(35600, 55196), P(45395, 51745)], chord: [P(28094, 55223), P(52901, 55205)], hw: 459, role: 'way', key: { layer: 'ground', part: 0 }, source: 'polygon+chord' };
    const h = newHarness();
    judgeCorridor(h, c);
    expect(h.failures).toEqual([]);
    for (const op of ['corridorUnion', 'corridorUnion-bands']) {
      const line = h.report.line(op);
      expect(line.failures).toEqual({});
      expect(line.draws).toBe(1);
      expect(line.unattractedPass).toBe(1);
    }
    expect(h.settled).toEqual({});
  });

  it('an unattracted needle-tip polygon whose band polygon-clipping returns crossing itself: that oracle refuses the case, clipper2 judges it (round S9, notes row 56)', () => {
    // a PR-size run of round S9 (unseeded, 2026-10-19): a ring way (hw 412) with a 9° tip at (11768, 34568); before
    // round S9 the scratch overlay's attraction near the tip made the case attracted, and the dry-run lays nothing there
    // (F's ring is the arena's), so the case is unattracted and its face count compared: polygon-clipping's band ends its
    // outer ring (31501, 37854) → (11770, 34568) → (11768, 34568), the first edge crossing F's edge 0.012 cm short of the
    // tip — an output crossing itself, counted two faces — while clipper2's band and ours are one face, |Δ| within bound
    const P = (x: number, y: number): CorridorCase['ring'][number] => ({ x, y }) as CorridorCase['ring'][number];
    const c: CorridorCase = { ring: [P(38660, 36553), P(39458, 48996), P(31501, 37854), P(11768, 34568), P(36477, 34717), P(54182, 24244)], chord: null, hw: 412, role: 'way', key: { layer: 'ground', part: 0 }, source: 'polygon' };
    const ours = oursCorridor(c);
    expect(ours !== null && !('refused' in ours)).toBe(true);
    if (ours === null || 'refused' in ours) return;
    expect(ours.warnings).toEqual([]);
    const pc = oracleBands(ours, c.hw, 'polygon-clipping');
    expect(pc.ok && ringProblems(pc.rings.map(dedupe)).includes('crossing edges')).toBe(true);
    const cl = oracleBands(ours, c.hw, 'clipper2');
    expect(cl.ok && !ringProblems(cl.rings.map(dedupe)).includes('crossing edges')).toBe(true);
    const h = newHarness();
    judgeCorridor(h, c);
    expect(h.failures).toEqual([]);
    expect(h.settled).toEqual({ 'oracle-invalid': 1 });
    const line = h.report.line('corridorUnion-bands');
    expect(line.failures).toEqual({});
    expect(line.unattractedPass).toBe(1);
    expect(line.refusals).toEqual({ 'polygon-clipping': 1 });
    expect(h.report.line('corridorUnion').unattractedPass).toBe(1);
  });

  it('an unattracted polygon+chord case whose one corner split bridges the band to the block (its partner beyond reach): a legal antenna, the blocks and the bands agree (round S9, notes row 57)', () => {
    // a PR-size run of round S9 (unseeded, 2026-10-19): the chord meets the ring way at J = (-41910, 62634) and at
    // (-44970, 62632); the face above it keeps one corner split, J to the kerb corner (-42454, 63082) — the other
    // junction's kerb corner (-43877, 63081) stands 1 182 cm away, beyond its reach (2·448 + 26 cm) — so the band face
    // runs the split twice; before round S9 the case was judged attracted (the scratch overlay's attraction 3 000 cm away,
    // at (-46192, 62198)), under the dry-run it is unattracted, and the same commit must keep its verdict (Q19 (d))
    const P = (x: number, y: number): CorridorCase['ring'][number] => ({ x, y }) as CorridorCase['ring'][number];
    const c: CorridorCase = { ring: [P(-41862, 62959), P(-43225, 65281), P(-44364, 63116), P(-45814, 61958), P(-45290, 59985), P(-42130, 61136)], chord: [P(-50846, 62629), P(-36830, 62637)], hw: 448, role: 'way', key: { layer: 'ground', part: 0 }, source: 'polygon+chord' };
    const ours = oursCorridor(c);
    expect(ours !== null && !('refused' in ours)).toBe(true);
    if (ours === null || 'refused' in ours) return;
    expect(ours.warnings).toEqual([]);
    expect(ours.splitEdges.has('-41910,62634--42454,63082')).toBe(true);
    const h = newHarness();
    judgeCorridor(h, c);
    expect(h.failures).toEqual([]);
    expect(h.notes).toEqual({ 'split-antenna': 1 });
    for (const op of ['corridorUnion', 'corridorUnion-bands']) {
      const line = h.report.line(op);
      expect(line.failures).toEqual({});
      expect(line.unattractedPass).toBe(1);
    }
  });

  it('a dead-end spine on a spine-less boundary: the lane’s round caps meet the ring, its kerb pieces close on it (N-57 (2))', { timeout: TIMEOUT }, () => {
    // a tenth of the run's size (the PR size: 1 000 cases); most cases are attracted (the caps place kerb vertices
    // within attractCm of the ring), so §13.1's unattracted guard is the main property's — this one holds every
    // judged case and draws at least half the cases
    const runs = Math.max(100, Math.ceil(RUNS / 10));
    const h = newHarness();
    let cases = 0;
    fc.assert(
      fc.property(deadEndCaseArb, (c) => {
        if (c === null) return;
        cases += 1;
        judgeCorridor(h, c, 'deadEnd');
      }),
      { numRuns: runs },
    );
    for (const op of ['deadEnd', 'deadEnd-bands']) {
      const line = h.report.line(op);
      console.info(`arr-bands/${op}: ${String(cases)} of ${String(runs)} cases — drawn ${String(line.draws)} (unattracted ${String(line.unattracted)}; attracted ${String(line.attracted)}); passed ${String(line.unattractedPass)} + ${String(line.attractedPass)}; refusals ${JSON.stringify(line.refusals)}; unjudged ${String(line.unjudged)}; settled ${JSON.stringify(h.settled)}; notes ${JSON.stringify(h.notes)}`);
      expect(line.failures).toEqual({});
      expect(line.unattractedPass + line.attractedPass).toBe(line.draws);
      expect(line.unjudged).toBeLessThanOrEqual(Math.ceil(0.01 * runs));
      expect(line.draws).toBeGreaterThanOrEqual(Math.ceil(runs / 2));
    }
    expect(h.failures).toEqual([]);
    // N-44 (3): the item's own refusals at most 1 per 10⁴ cases
    expect(h.settled['refused-own'] ?? 0).toBeLessThanOrEqual(Math.ceil(runs / 10_000));
  });
});
