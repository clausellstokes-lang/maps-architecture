// M0-d-09: the spike city's records tree (C-0015's schema-shaped synthetic records; §6.2 *The records digest*): the
// same roots at a seed every time, other roots at another seed, and §6.2's CI oracle after the build and every batch —
// which a tampered record makes miss at exactly that batch.
import { describe, expect, it } from 'vitest';
import { buildDigests, syntheticCity } from '@plat/model';
import { hex128, RECORDS_BATCHES, recordsRun, type RecordsRun } from '../../src/determinism/index.js';
import { SLOW } from './support.js';

let five: RecordsRun | null = null;
const at5 = (): RecordsRun => (five ??= recordsRun(5));

describe('the records tree', () => {
  it('gives one pair of roots per seed, and the batches move them', { timeout: SLOW }, () => {
    const a = at5();
    const b = recordsRun(5);
    expect(a).toEqual(b);
    expect(a.model).toMatch(/^[0-9a-f]{32}$/);
    expect(a.records).toMatch(/^[0-9a-f]{32}$/);
    expect(recordsRun(6).records).not.toBe(a.records);
    const built = buildDigests(syntheticCity(5));
    // with no batch the roots are the built workload's own
    const none = recordsRun(5, { batches: 0 });
    expect(none.model).toBe(hex128(built.model.finaliseRoot()));
    expect(none.records).toBe(hex128(built.records.finaliseRoot()));
    expect(a.records).not.toBe(none.records);
    expect(a.model).not.toBe(none.model);
    expect(a.batches).toBe(RECORDS_BATCHES);
    expect(a.oracle).toBeNull();
  });
  it('runs the oracle after the build and every batch; the roots are the same with it on', { timeout: SLOW }, () => {
    const r = recordsRun(5, { oracle: true });
    expect(r.oracle).toEqual({ batches: RECORDS_BATCHES + 1, mismatches: 0, first: null });
    expect(r.model).toBe(at5().model);
    expect(r.records).toBe(at5().records);
  });
  it('misses at the batch whose record was changed behind the digest\'s back (a negative control, model and records trees)', { timeout: SLOW }, () => {
    for (const tree of ['model', 'records'] as const) {
      const r = recordsRun(5, {
        oracle: true,
        afterBatch: (city, _m, _r, batch) => {
          if (batch !== 2) return;
          // a record rewritten in place, no put: the maintained leaf keeps the old hash, the recomputation reads the new
          if (tree === 'model') {
            const e = city.model.find((x) => x.kind === 'way') as { record: { width: number } };
            e.record.width += 1;
          } else {
            const e = city.records.find((x) => x.kind === 'naming') as unknown as { record: Record<string, unknown> };
            e.record['salt'] = ((e.record['salt'] as number) + 1) >>> 0;
          }
        },
      });
      expect(r.oracle?.first, tree).toEqual({ stage: 'records', batch: 2 });
      expect(r.oracle?.mismatches, tree).toBeGreaterThanOrEqual(1);
    }
  });
});
