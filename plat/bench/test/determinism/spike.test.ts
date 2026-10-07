// M0-d-09: one spike derivation and its switches (C-0268 (1), (5), (6)) — un-instrumented it is M0-x-04's `runBase`
// byte for byte; §6.2's CI oracle runs after every committed batch and misses exactly where the arena was changed behind
// the digest's back; the op-order switches apply M0-d-08's functions and leave every root as it was, while a switch that
// really changes the batches is seen; C-0090's reroll moves S5 on and leaves S1 – S4.
import { describe, expect, it } from 'vitest';
import { isVertexLive } from '@plat/kernel';
import { runBase, type BaseBatch } from '@plat/layout';
import { canonicalText } from '@plat/model';
import { permuteOps, renumberSlots } from '@plat/testkit';
import { CITY_SIZE, hex128, spikeBlueprint, spikeRun, SPIKES, textDigest, type SpikeRun } from '../../src/determinism/index.js';
import { SLOW, TEST_SIZE } from './support.js';

const runs = new Map<string, SpikeRun>();
function cached(key: string, f: () => SpikeRun): SpikeRun {
  let r = runs.get(key);
  if (r === undefined) {
    r = f();
    runs.set(key, r);
  }
  return r;
}
const plain = (): SpikeRun => cached('plain', () => spikeRun('fusion', 1, { size: TEST_SIZE }));

describe('the spike city', () => {
  it('is the fusion spike (the flat fixture) and the site spike (the river fixture), at CITY unless a size is named', () => {
    expect(SPIKES).toEqual(['fusion', 'site']);
    expect(spikeBlueprint('fusion').terrain).toBe('flat');
    expect(spikeBlueprint('fusion').site.river).toBeNull();
    expect(spikeBlueprint('site').terrain).toBe('base');
    expect(spikeBlueprint('site').site.river).toMatchObject({ inflowBearingCdeg: 27_000, mouth: 'none' });
    expect(spikeBlueprint('site', CITY_SIZE).size).toEqual({ rung: 'CITY', aspect: 1 });
    expect(spikeBlueprint('site', CITY_SIZE).walledHa).toBeUndefined();
    expect(spikeBlueprint('fusion', TEST_SIZE)).toMatchObject({ size: { rung: 'CITY', areaHa: 400 }, walledHa: 12 });
    expect(hex128([0, 1, 0xffffffff, 0x10])).toBe('0000000000000001ffffffff00000010');
    expect(textDigest('a')).toMatch(/^[0-9a-f]{32}$/);
    expect(textDigest('a')).not.toBe(textDigest('b'));
  });
});

describe('an un-instrumented run', () => {
  it('is runBase: the same roots at every stage, the same root and report', { timeout: SLOW }, () => {
    const r = plain();
    const batches: BaseBatch[] = [];
    const b = runBase(spikeBlueprint('fusion', TEST_SIZE), 1, { kind: 'all' }, { onBatch: (x) => batches.push(x) });
    expect(r.root).toBe(hex128(b.model.root));
    expect(r.stageRoots).toEqual([...b.model.stageRoots].map(([n, h]) => [n, hex128(h)]));
    expect(r.stageRoots.map(([n]) => n)).toEqual(['S1', 'S3', 'S4', 'S5', 'S6', 'S8']);
    expect(r.reportDigest).toBe(textDigest(canonicalText(b.report)));
    expect(r.commits).toBe(batches.filter((x) => x.committed).length);
    expect(r.commits).toBeGreaterThan(5);
    expect(r.bugs).toEqual([]);
    expect(r.oracle).toBeNull();
    expect(r.permuted).toBe(0);
    // another seed is another city
    expect(spikeRun('fusion', 2, { size: TEST_SIZE }).root).not.toBe(r.root);
  });
});

describe('the oracle after every batch', () => {
  it('compares every committed batch and finds the maintained root equal to the recomputed one; the run is unchanged', { timeout: SLOW }, () => {
    const r = spikeRun('fusion', 1, { size: TEST_SIZE, oracle: true });
    expect(r.oracle).toEqual({ batches: r.commits, mismatches: 0, first: null, end: true });
    expect(r.root).toBe(plain().root);
  });
  it('misses at the batch after which a vertex was moved behind the digest\'s back (a negative control)', { timeout: SLOW }, () => {
    let moved = false;
    const r = spikeRun('fusion', 1, {
      size: TEST_SIZE,
      oracle: true,
      afterBatch: (p, batch) => {
        if (batch !== 3 || moved) return;
        // the first live vertex past the frame's, one centimetre east, with no transaction: the maintained level digests
        // keep the old geometry, the recomputation reads the new
        for (let v = 4; v < p.slots.vertex.top; v += 1) {
          if (!isVertexLive(p, v)) continue;
          p.vertices.x[v] = (p.vertices.x[v] as number) + 1;
          moved = true;
          break;
        }
      },
    });
    expect(moved).toBe(true);
    expect(r.oracle?.first?.batch).toBe(3);
    expect(r.oracle?.mismatches).toBeGreaterThanOrEqual(1);
  });
});

describe('op order', () => {
  it('permutes every declared batch of two ops or more and gives the same roots at every stage', { timeout: SLOW }, () => {
    const r = spikeRun('fusion', 1, { size: TEST_SIZE, permute: { seed: 7, apply: (tx, s) => permuteOps(tx, s) } });
    expect(r.permuted).toBeGreaterThan(0);
    expect(r.stageRoots).toEqual(plain().stageRoots);
    expect(r.root).toBe(plain().root);
  });
  it('is seen when a switch really changes a batch (an op dropped: a negative control)', { timeout: SLOW }, () => {
    let r: SpikeRun | null = null;
    let threw = false;
    try {
      r = spikeRun('fusion', 1, { size: TEST_SIZE, permute: { seed: 7, apply: (tx) => ({ ...tx, ops: tx.ops.slice(1) }) } });
    } catch {
      threw = true;
    }
    expect(threw || (r as SpikeRun | null)?.root !== plain().root).toBe(true);
  });
  it('renumbers the arena\'s slots before S1 and gives the same roots', { timeout: SLOW }, () => {
    let applied = 0;
    const r = spikeRun('fusion', 1, {
      size: TEST_SIZE,
      renumber: {
        seed: 11,
        apply: (p, s) => {
          applied += 1;
          return renumberSlots(p, s, { mode: 'reverse' });
        },
      },
    });
    expect(applied).toBe(1);
    expect(r.root).toBe(plain().root);
    expect(r.stageRoots).toEqual(plain().stageRoots);
  });
});
