// M0-a-09's differential agreement for corridorUnion with both oracles (§3.7 (i) "Oracles, not fallbacks"; §13.1; the
// exit bar B-FUZZ's oracle part): the committed L2 kerb geometry — the built blocks — against each oracle's
// F − ⋃ buffer(spine, half-width), and the union of the bands against each oracle's F ∩ ⋃ buffer, split by
// attraction as M0-k-03's compareSplit judges, drawn from M0-k-01's face set and M0-k-02's tunnel fixture. The
// placement is C-0122's; the vacuity guard N-14's (support.ts).
import fc from 'fast-check';
import { beforeAll, describe, expect, it } from 'vitest';
import { loadOracles } from '../../../src/oracles/index.js';
import { dedupe, ringProblems } from '../../../src/oracles/rings.js';
import { corridorCaseArb, deadEndCaseArb, judgeCorridor, loopsOf, newHarness, oracleBands, oursCorridor, RUNS, TIMEOUT, verdict, widenedCaseArb, type CorridorCase } from './support.js';

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

  it('the polygon+chord cases whose kerb bridged two of its own vertices across a face: the bridge removed, no edge dangling, the blocks and the bands agree (round S14, notes rows 1 and 79)', () => {
    // the agreement's corridor family at seed 20261011 (10⁴ draws), draws 1567 and 1756: the commit left an edge of the
    // kerb alone with the one face on both sides and both its ends reached — a bridge bounding no block (counted as
    // 'dangling-attracted', 4 per 10⁴ before round S14); bandUnion.ts `dropSpurs` now strips it with the spurs
    const P = (x: number, y: number): CorridorCase['ring'][number] => ({ x, y }) as CorridorCase['ring'][number];
    const cases: CorridorCase[] = [
      { ring: [P(-46558, 11807), P(-47068, 12118), P(-45810, 10259)], chord: [P(-47959, 11096), P(-44919, 11281)], hw: 77, role: 'way', key: { layer: 'ground', part: 0 }, source: 'polygon+chord' },
      { ring: [P(13805, -22696), P(10945, -22769), P(13506, -22916)], chord: [P(13013, -24526), P(11737, -21086)], hw: 50, role: 'way', key: { layer: 'ground', part: 0 }, source: 'polygon+chord' },
    ];
    for (const c of cases) {
      const ours = oursCorridor(c);
      expect(ours !== null && !('refused' in ours)).toBe(true);
      if (ours === null || 'refused' in ours) return;
      const bandRings = new Set(ours.bands);
      const loose: string[] = [];
      for (const r of [...ours.blocks, ...ours.bands]) {
        for (const loop of loopsOf(dedupe(r))) {
          if (loop.length >= 3) continue;
          const key = `${String(loop[0].x)},${String(loop[0].y)}-${String(loop[1]?.x)},${String(loop[1]?.y)}`;
          if (!(bandRings.has(r) && ours.splitEdges.has(key))) loose.push(key);
        }
      }
      expect(loose).toEqual([]);
      const h = newHarness();
      judgeCorridor(h, c);
      expect(h.failures).toEqual([]);
      expect(h.notes['dangling-attracted']).toBeUndefined();
    }
  });

  it('a faceSet-concave+chord case whose wedge split the insertion laid along a kerb spur: that split left out, no split between two blocks, the blocks and the bands agree (round S13, C-0422)', () => {
    // round S13's second NEAR at the PR size (unseeded, 2026-10-21): the chord crosses the concave ring way near its
    // corner (188364, -216690); face 0's kerb has a spur at the junction, K (188175, -216383) – (188246, -216458) –
    // (188201, -216369), and the wedge split's leg K → (188364, -216690) passes 21 cm from the spur's tip, so the
    // insertion laid it along the spur's far side (W_ATTRACTED, W_STRETCH_SHARED): the spur was committed as a block of
    // its own, the split edge (188175, -216383) – (188201, -216369) between it and the rest of the block (N-52 (2): a
    // split never cuts a block) — identical on round S9's engine. The op now judges its splits on the faces the arena
    // holds and runs again with such a split left out (bandUnion.ts `cutSplits`): the spur stays in the one block
    const P = (x: number, y: number): CorridorCase['ring'][number] => ({ x, y }) as CorridorCase['ring'][number];
    const c: CorridorCase = {
      ring: [P(187644, -207506), P(186265, -205525), P(184508, -201880), P(178912, -205948), P(173823, -204236), P(170370, -205094), P(173944, -209754), P(172807, -213926), P(176443, -216102), P(180025, -215373), P(183049, -219961), P(188364, -216690), P(192125, -214782)],
      chord: [P(202977, -229651), P(159518, -192190)],
      hw: 360,
      role: 'way',
      key: { layer: 'ground', part: 0 },
      source: 'faceSet-concave+chord',
    };
    const ours = oursCorridor(c);
    expect(ours !== null && !('refused' in ours)).toBe(true);
    if (ours === null || 'refused' in ours) return;
    expect(ours.splitsInBlocks).toEqual([]);
    expect(ours.splitEdges.has('188175,-216383-188201,-216369')).toBe(false);
    const h = newHarness();
    judgeCorridor(h, c);
    expect(h.failures).toEqual([]);
    expect(h.settled).toEqual({});
    for (const op of ['corridorUnion', 'corridorUnion-bands']) {
      const line = h.report.line(op);
      expect(line.failures).toEqual({});
      expect(line.draws).toBe(1);
      expect(line.unattractedPass + line.attractedPass).toBe(1);
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

  it('the generators widened (hardening round S14, notes row 13): dead-end lanes with square ends, ways across with a half-width profile', { timeout: TIMEOUT }, () => {
    // a tenth of the run's size, as the dead-end property; most cases are attracted (a cap's corner or a profile strip's
    // crossing places a vertex within attractCm of the ring), so every judged case is held and at least half are drawn
    const runs = Math.max(100, Math.ceil(RUNS / 10));
    const h = newHarness();
    let cases = 0;
    fc.assert(
      fc.property(widenedCaseArb, (c) => {
        if (c === null) return;
        cases += 1;
        judgeCorridor(h, c, 'widened');
      }),
      { numRuns: runs },
    );
    for (const op of ['widened', 'widened-bands']) {
      const line = h.report.line(op);
      console.info(`arr-bands/${op}: ${String(cases)} of ${String(runs)} cases — drawn ${String(line.draws)} (unattracted ${String(line.unattracted)}; attracted ${String(line.attracted)}); passed ${String(line.unattractedPass)} + ${String(line.attractedPass)}; refusals ${JSON.stringify(line.refusals)}; unjudged ${String(line.unjudged)}; settled ${JSON.stringify(h.settled)}; notes ${JSON.stringify(h.notes)}; sources ${JSON.stringify(h.sources)}`);
      expect(line.failures).toEqual({});
      expect(line.unattractedPass + line.attractedPass).toBe(line.draws);
      expect(line.unjudged).toBeLessThanOrEqual(Math.ceil(0.01 * runs));
      expect(line.draws).toBeGreaterThanOrEqual(Math.ceil(cases / 2));
    }
    // both widenings reached
    expect(h.sources['dead-end-square'] ?? 0).toBeGreaterThan(0);
    expect(h.sources['polygon+profile'] ?? 0).toBeGreaterThan(0);
    expect(h.failures).toEqual([]);
    expect(h.settled['refused-own'] ?? 0).toBeLessThanOrEqual(Math.ceil(runs / 10_000));
  });
});
