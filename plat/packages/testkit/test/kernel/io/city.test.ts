// M0-a-15's bar on the CITY-shaped synthetic arena (§13.1: "save → load → save byte-identical and the loaded arena
// passing every hard invariant"; the item's tests: "… and on a CITY-shaped synthetic arena"), with §3.9's chunking read
// on it: one routes chunk and one chunk per L2–L4 district partition (§3.3), a vertex on a district boundary written in
// the partition with the smaller key, and an edit inside one district rewriting that district's chunk alone.
import { describe, expect, it } from 'vitest';
import { describeChunk, encodeArena, insertChain, type Overlay } from '@plat/kernel';
import { determinismPoint as lp, fixtureSpec, runBatch } from '../../../src/determinism/index.js';
import { cityArena, roundTrip, sameBlock } from './support.js';

describe('the CITY-shaped synthetic arena (§13.1, §3.9, §3.3)', () => {
  const { plat, tally } = cityArena();

  it('builds what it claims (the fixture\'s precondition)', () => {
    expect(tally.ways).toBe(12);
    expect(tally.pins).toBe(1);
    expect(tally.lanes).toBe(35);
    expect(tally.courts).toBeGreaterThanOrEqual(17);
    expect(tally.plotLines).toBe(105);
    expect(tally.frontages).toBe(36);
    expect(tally.footprints).toBeGreaterThanOrEqual(100);
    expect(tally.owners).toBeGreaterThanOrEqual(200);
    expect(tally.refused).toBe(0);
  });

  it('save → load → save byte-identical; the loaded arena equal, its digests equal, every hard invariant', () => {
    const { chunks } = roundTrip(plat);
    const parts = chunks.slice(1).map((c) => describeChunk(c.bytes));
    // Four districts at each of L2, L3 and L4.
    for (const level of [2, 3, 4] as const) {
      expect(parts.filter((s) => s.level === level).map((s) => s.key).sort()).toEqual(['district:ne', 'district:nw', 'district:se', 'district:sw']);
    }
    const routes = describeChunk(chunks[0].bytes);
    expect(routes.kind).toBe('routes');
    expect(routes.splits).toBe(0);
    expect(parts.reduce((n, s) => n + s.splits, 0)).toBeGreaterThan(100);
    expect(parts.reduce((n, s) => n + s.holes, 0)).toBeGreaterThan(10);
    expect(parts.reduce((n, s) => n + s.foreignRefs, 0)).toBeGreaterThan(100);
  });

  it('a finer row on a coarser route edge goes to the partition of the faces beside it (C-0207 (4))', () => {
    const chunks = encodeArena(plat);
    // The frontages' L3 rows lie on the L2 lanes' route: written in the L3 district chunks, so no L3 OUTSIDE chunk exists
    // and every district's L3 chunk carries its own blocks' frontages (35 rows, plot lines and frontages alike).
    const l3 = chunks.slice(1).map((c) => describeChunk(c.bytes)).filter((s) => s.level === 3);
    expect(l3.map((s) => s.key).sort()).toEqual(['district:ne', 'district:nw', 'district:se', 'district:sw']);
    expect(l3.reduce((n, s) => n + s.edgeRows, 0)).toBe(105 + 36);
    // Per district: three plot lines and a frontage per block (ne has eight blocks beside the lake's), and the boundary
    // frontage on the middle way in ne, the smaller of its faces' keys (nw's faces are on its other side).
    const rows = Object.fromEntries(l3.map((s) => [s.key, s.edgeRows]));
    expect(rows).toEqual({ 'district:ne': 8 * 4 + 1, 'district:nw': 9 * 4, 'district:se': 9 * 4, 'district:sw': 9 * 4 });
  });

  it('a vertex on a shared L1 edge goes to the partition with the smaller key (§3.3, §3.9)', () => {
    const chunks = encodeArena(plat);
    const parts = chunks.slice(1).map((c) => describeChunk(c.bytes));
    const onBoundary = (s: (typeof parts)[number]): number => s.points.filter(([x, y]) => x === 0 || y === 0).length;
    // The lanes of the blocks beside the middle north–south way end on it: L2 vertices at x = 0.
    const ne = parts.find((s) => s.level === 2 && s.key === 'district:ne');
    const nw = parts.find((s) => s.level === 2 && s.key === 'district:nw');
    const se = parts.find((s) => s.level === 2 && s.key === 'district:se');
    const sw = parts.find((s) => s.level === 2 && s.key === 'district:sw');
    expect(ne !== undefined && nw !== undefined && se !== undefined && sw !== undefined).toBe(true);
    // ne < nw and se < sw: the shared x = 0 vertices go east; nw and sw hold none on it.
    expect(onBoundary(ne as (typeof parts)[number])).toBeGreaterThan(0);
    expect(onBoundary(se as (typeof parts)[number])).toBeGreaterThan(0);
    expect(onBoundary(nw as (typeof parts)[number])).toBe(0);
    expect(onBoundary(sw as (typeof parts)[number])).toBe(0);
  });

  it('an edit inside one district rewrites that district\'s chunk alone (§3.9)', () => {
    const before = encodeArena(plat);
    const { plat: p } = cityArena();
    expect(sameBlock(encodeArena(p), before)).toBe(true);
    // A footprint added in a south-west plot (L4).
    const r = runBatch(p, {
      spec: fixtureSpec(4),
      fn: (o: Overlay) => insertChain(o, [lp(-205_000, -195_000), lp(-203_000, -195_000), lp(-203_000, -193_000), lp(-205_000, -193_000)], [{ role: 'yard_part', entity: 'building:new' }], 'mandatory', { closed: true }),
    });
    expect(r.ok).toBe(true);
    const after = encodeArena(p);
    expect(after.length).toBe(before.length);
    const changed = after.map((c, i) => (sameBlock([c], [before[i]]) ? null : describeChunk(c.bytes))).filter((x) => x !== null);
    expect(changed.map((s) => `${s.level}/${s.key}`)).toEqual(['4/district:sw']);
  });
});
