// The derivation unit (§6.3: "the growth stage for S5 ways (in acceptance order)"; §3.3 *Two op forms*: a callback's issue
// order is a function of its inputs, its streams and canonically sorted query results — never of slot numbers; §13.2's
// issue-order clause; C-0122): S5c's batch for a growth stage, built afresh on its arena, through M0-d-08's harness —
// fresh, again, its slots reversed, its slots randomly renumbered — commits bit for bit alike, and its record (the
// streets' ways, their lineage keys in acceptance order, their points) is the same on every slot assignment.
import { attachIndex, createKernel, createPlat, decodeArena, encodeArena, type Plat } from '@plat/kernel';
import { commitS3Slice, flatFixture, growthArea, growthBatch, growthStart, growthStreams, runS4, s3Slice, type GrowthArea, type S3Slice, type S5cRecord } from '@plat/layout';
import { describe, expect, it } from 'vitest';
import { renumberSlots, runBatch, runTwiceCompare, type DeterminismSequence } from '../../../src/determinism/index.js';
import { GROUND } from './support.js';

/** The small town's arena before S5c of stage 1 (as chunks), its area and its slice. */
function before(seed: number): { chunks: ReturnType<typeof encodeArena>; area: GrowthArea; slice: S3Slice } {
  const site = flatFixture(seed, { frameAreaHa: 400, walledHa: 60 });
  const slice = s3Slice(site);
  const plat = createPlat(GROUND, site.frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const k = createKernel(new Map([[GROUND, plat]]), { spineWidths: () => null });
  const c = commitS3Slice(slice, k);
  if (!c.ok) throw new Error(c.detail);
  const s4 = runS4({ slice, commit: c.value, kernel: k });
  if (!s4.ok) throw new Error(s4.detail);
  const state = growthStart({ slice, commit: c.value, s4: s4.value, kernel: k });
  return { chunks: encodeArena(plat), area: growthArea(state, 1), slice };
}

function load(chunks: ReturnType<typeof encodeArena>): Plat {
  const r = decodeArena(chunks, GROUND, { index: { gridCellCm: 5000 } });
  if (!r.ok) throw new Error(`load: ${r.code} ${r.detail}`);
  return r.value;
}

function batchOn(p: Plat, area: GrowthArea, slice: S3Slice) {
  const k = createKernel(new Map([[GROUND, p]]), { spineWidths: () => null });
  return growthBatch(k, area, growthStreams(slice));
}

/** The callback's record: the commit's value is the callback's result (or its value). */
function recordOf(v: unknown): S5cRecord {
  const x = v as { ok?: boolean; value?: S5cRecord } & Partial<S5cRecord>;
  if (x.ok === true && x.value !== undefined) return x.value;
  if (x.streets !== undefined) return x as S5cRecord;
  throw new Error('the batch returned no record');
}

describe('S5c’s batch through the issue-order harness (M0-d-08)', () => {
  it('commits bit for bit alike: fresh, again, slots reversed, slots renumbered', { timeout: 300_000 }, () => {
    const b = before(2);
    expect(b.area.seeds.length).toBeGreaterThan(0);
    const seq: DeterminismSequence = {
      name: 'S5c stage 1',
      arena: (): Plat => load(b.chunks),
      batches: [{ name: 'S5c growth, stage 1', build: (p: Plat) => batchOn(p, b.area, b.slice) }],
    };
    const report = runTwiceCompare(seq);
    expect(report.divergence).toBeNull();
    expect(report.identical).toBe(true);
    expect(report.outcomes).toEqual(['commit']);
    expect(report.runs).toEqual(['fresh', 'again', 'reversed', 'renumbered']);
  });

  it('its record — ways keyed by the growth stage in acceptance order — is the same on every slot assignment', { timeout: 300_000 }, () => {
    const b = before(3);
    const once = (p: Plat): S5cRecord => {
      const r = runBatch(p, batchOn(p, b.area, b.slice));
      if (!r.ok) throw new Error(`refused: ${r.code} ${r.detail}`);
      return recordOf(r.value.value);
    };
    const ref = once(load(b.chunks));
    expect(ref.streets.length).toBeGreaterThan(3);
    ref.streets.forEach((s, i) => expect(s.index).toBe(i));
    for (const [mode, seed] of [
      ['reverse', 1],
      ['random', 5],
      ['random', 9],
    ] as const) {
      const got = once(renumberSlots(load(b.chunks), seed, { mode }));
      expect(JSON.stringify(got)).toBe(JSON.stringify(ref));
    }
  });
});
