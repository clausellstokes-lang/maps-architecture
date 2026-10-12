// M0-d-04: the records digest (§6.2 *The records digest*; §2.8; C-0194 (9)) and the synthetic schema-shaped CITY
// workload of the digest bars (C-0015): ≈ 10 900 derivation and 3 500 naming records — it exists and runs; the maintained
// roots equal the recomputed ones; a move between partitions re-hashes both nodes; the bars' harness emits its record,
// stamped contended (the bars are the timing phase's, never this run's).
import { describe, expect, it } from 'vitest';
import {
  buildDigests,
  CITY_COUNTS,
  DIGEST_BUDGETS,
  RECORDS_OUTSIDE,
  RECORDS_SCHEMA_ORDER,
  RECORDS_TOWN,
  RecordsDigest,
  recordsLeaf,
  rederiveDistrict,
  syntheticCity,
  timeDigest,
  type RecordsEntry,
} from '../../src/index.js';
import { hex } from './support.js';

const CITY = syntheticCity(1);

describe('the synthetic schema-shaped CITY workload (C-0015)', () => {
  it('exists, at §6.2\'s CITY counts: 10 900 derivation and 3 500 naming records, every M0 record shaped', () => {
    const derivation = CITY.records.filter((e) => e.kind === 'derivation');
    const naming = CITY.records.filter((e) => e.kind === 'naming');
    expect(derivation).toHaveLength(CITY_COUNTS.derivation);
    expect(naming).toHaveLength(CITY_COUNTS.naming);
    expect(derivation).toHaveLength(10_900);
    expect(naming).toHaveLength(3500);
    expect(CITY.model).toHaveLength(CITY_COUNTS.districts + CITY_COUNTS.ways + CITY_COUNTS.junctions + CITY_COUNTS.blocks + CITY_COUNTS.plots);
    // Deterministic from its seed.
    expect(hex(recordsLeaf(syntheticCity(1).records[777]))).toBe(hex(recordsLeaf(CITY.records[777])));
    expect(hex(recordsLeaf(syntheticCity(2).records[777]))).not.toBe(hex(recordsLeaf(CITY.records[777])));
  });

  it('runs: both trees built, finalised and recomputed, equal', () => {
    const { model, records } = buildDigests(CITY);
    expect(records.size).toBe(14_400);
    expect(model.size).toBe(CITY.model.length);
    expect(hex(records.finaliseRoot())).toBe(hex(records.recomputeRoot()));
    expect(model.oracle().ok).toBe(true);
    // A district re-derived (the timing harness's batch): both trees maintained, still equal to their recomputation.
    const batch = rederiveDistrict(CITY, CITY.districts[3], 99);
    expect(batch.model.length).toBeGreaterThan(100);
    const before = hex(records.finaliseRoot());
    model.batch(() => batch.model.forEach((e) => model.put(e)));
    records.batch(() => batch.records.forEach((e) => records.put(e)));
    expect(hex(records.finaliseRoot())).not.toBe(before);
    expect(hex(records.finaliseRoot())).toBe(hex(records.recomputeRoot()));
    expect(model.oracle().ok).toBe(true);
  }, 120_000);
});

describe('the records tree', () => {
  const some = CITY.records.filter((_, i) => i % 24 === 0);

  it('the root is a function of the records, not of their order; one node per partition plus the town node', () => {
    const a = new RecordsDigest();
    const b = new RecordsDigest();
    a.batch(() => some.forEach((e) => a.put(e)));
    for (const e of some.slice().reverse()) b.put(e);
    expect(hex(b.finaliseRoot())).toBe(hex(a.finaliseRoot()));
    expect(a.node(RECORDS_TOWN)).toBeDefined();
    expect(a.node(CITY.districts[0])).toBeDefined();
    expect(a.node('district:none')).toBeUndefined();
  });

  it('a move across partitions moves the leaves and re-hashes both nodes, though no record changed; moving back restores', () => {
    const r = new RecordsDigest();
    r.batch(() => CITY.records.slice(0, 2000).forEach((e) => r.put(e)));
    const plot = CITY.records.find((e) => e.entity.startsWith('plot:') && e.partition === CITY.districts[1]) as RecordsEntry;
    const root = hex(r.finaliseRoot());
    const from = hex(r.node(CITY.districts[1]));
    const to = hex(r.node(CITY.districts[2]));
    r.move(plot.entity, CITY.districts[2]);
    expect(hex(r.node(CITY.districts[1]))).not.toBe(from);
    expect(hex(r.node(CITY.districts[2]))).not.toBe(to);
    expect(hex(r.finaliseRoot())).not.toBe(root);
    expect(hex(r.finaliseRoot())).toBe(hex(r.recomputeRoot()));
    r.move(plot.entity, CITY.districts[1]);
    expect(hex(r.finaliseRoot())).toBe(root);
    // To the partition outside districts and back.
    r.move(plot.entity, RECORDS_OUTSIDE);
    expect(hex(r.finaliseRoot())).toBe(hex(r.recomputeRoot()));
    r.move(plot.entity, CITY.districts[1]);
    expect(hex(r.finaliseRoot())).toBe(root);
  });

  it('the leaf: id ‖ record kind ‖ fields in schema order ‖ each cited slice; every part moves it', () => {
    expect(RECORDS_SCHEMA_ORDER.derivation).toEqual(['ctx', 'fields', 'band', 'allocationRow', 'epoch', 'params', 'placements']);
    expect(RECORDS_SCHEMA_ORDER.naming).toEqual(['salt', 'epoch']);
    const e = CITY.records.find((x) => x.kind === 'derivation' && x.record.slices.length > 1) as Extract<RecordsEntry, { kind: 'derivation' }>;
    const leaf = hex(recordsLeaf(e));
    const s0 = e.record.slices[0];
    const variants: RecordsEntry[] = [
      { ...e, entity: 'plot:other' },
      { ...e, record: { ...e.record, band: 'b9' } },
      { ...e, record: { ...e.record, epoch: e.record.epoch + 1 } },
      { ...e, record: { ...e.record, slices: [{ ...s0, hash: [s0.hash[0] ^ 1, s0.hash[1]] }, ...e.record.slices.slice(1)] } },
      { ...e, record: { ...e.record, slices: e.record.slices.slice().reverse() } },
    ];
    for (const v of variants) expect(hex(recordsLeaf(v))).not.toBe(leaf);
    // The partition is the node's, not the leaf's.
    expect(hex(recordsLeaf({ ...e, partition: RECORDS_TOWN }))).toBe(leaf);
    const n = CITY.records.find((x) => x.kind === 'naming') as RecordsEntry;
    expect(hex(recordsLeaf(n))).not.toBe(hex(recordsLeaf({ ...e, entity: n.entity })));
  });

  it('refuses the order record (no writer before M3a), a missing partition, a malformed slice hash', () => {
    const e = CITY.records[0];
    expect(() => recordsLeaf({ ...e, kind: 'order' } as never)).toThrow(/M3a/);
    expect(() => recordsLeaf({ ...e, partition: '' })).toThrow(RangeError);
    const d = CITY.records.find((x) => x.kind === 'derivation') as Extract<RecordsEntry, { kind: 'derivation' }>;
    expect(() => recordsLeaf({ ...d, record: { ...d.record, slices: [{ ...d.record.slices[0], hash: [1.5, 0] }] } })).toThrow(RangeError);
  });
});

describe('the bars\' harness and record shape (timing phase only)', () => {
  it('emits its record, stamped contended here, with the oracle run alongside', () => {
    let t = 0;
    const clock = (): number => (t += 2);
    const rec = timeDigest(CITY, clock, 1);
    expect(rec.item).toBe('M0-d-04');
    expect(rec.status).toBe('contended');
    expect(rec.bars).toHaveLength(3);
    expect(rec.workload).toEqual({ model: CITY.model.length, derivation: 10_900, naming: 3500 });
    expect(rec.maintenance.budgetPct).toBe(DIGEST_BUDGETS.maintenancePct);
    expect(rec.finalise.budgetMs).toBe(5);
    expect(rec.recompute.budgetMs).toBe(150);
    expect(rec.maintenance.sharePct).toEqual([100]); // the fake clock: 2 ms each span
    expect(rec.oracle).toBe(true);
    expect(() => timeDigest(CITY, clock, 0)).toThrow(RangeError);
  }, 120_000);
});
