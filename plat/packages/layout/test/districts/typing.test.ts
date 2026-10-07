// The typing stand-in (M0-e-04; §4.5 *Typing*; C-0035): the data-driven scorer over the synthetic demand table —
// remaining demand, the relation rows (require / prefer) and a random term from `district.type` — greedy from the
// largest, the mixed-use floor (R5), feature-named kinds only.
import { type Stream } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { typeDistricts, typingCells, type TypingCells, type TypingDistrict } from '../../src/index.js';

const HA = 100_000_000;
const d = (id: string, ha: number, rel: string[]): TypingDistrict => ({ id, areaCm2: ha * HA, relations: new Set(rel) });
/** A stream whose uniforms are `u` (per district id, a list consumed in turn; 0 when absent). */
function streams(u: Record<string, number[]> = {}): (id: string) => Stream {
  return (id) => {
    const list = (u[id] ?? []).slice();
    return { float01: () => list.shift() ?? 0 } as unknown as Stream;
  };
}

describe('typing (§4.5; C-0035)', () => {
  const cells = typingCells();
  const town = [
    d('district:m', 8, ['seed.market', 'plaza']),
    d('district:g1', 2, ['seed.gate']),
    d('district:g2', 3, ['seed.gate', 'extramural']),
    d('district:r1', 20, ['seed.remainder', 'plaza']),
    d('district:r2', 18, ['seed.remainder']),
    d('district:r3', 15, ['seed.remainder', 'extramural']),
    d('district:r4', 12, ['seed.remainder']),
  ];

  it('one market district per market reservation: only the district seeded at it is `market`', () => {
    const t = typeDistricts(town, cells, streams());
    expect(t.filter((x) => x.kind === 'market').map((x) => x.district)).toEqual(['district:m']);
    // without the seed relation no district may be market (the require row fails: −∞)
    const t2 = typeDistricts(town.filter((x) => x.id !== 'district:m'), cells, streams());
    expect(t2.some((x) => x.kind === 'market')).toBe(false);
    for (const x of t2) expect(x.scores.find(([k]) => k === 'market')?.[1]).toBe(-Infinity);
  });

  it('gate wards at gates: every district seeded at a gate is `gate`, and no other is', () => {
    const t = typeDistricts(town, cells, streams({ 'district:r4': [0.99, 0.99, 0.99, 0.99, 0.99, 0.99] }));
    expect(t.filter((x) => x.kind === 'gate').map((x) => x.district).sort()).toEqual(['district:g1', 'district:g2']);
  });

  it('the riverbank kind requires water; a riverbank or bridgehead seed takes it', () => {
    const t = typeDistricts([d('district:a', 10, ['seed.riverbank', 'water']), d('district:b', 10, ['seed.remainder']), d('district:c', 10, ['seed.bridgehead', 'water'])], cells, streams());
    expect(t.map((x) => x.kind)).toEqual(['riverbank', 'craft', 'riverbank']);
  });

  it('greedy from the largest: the largest district scores first and its kind’s remaining demand falls', () => {
    // demand and random terms only (no relation): the largest takes the kind of largest share (craft, then sprawl by
    // order of the scores: craft 0.3 ties sprawl 0.3 — the table order breaks the tie), the next the other.
    const plain = [d('district:x', 30, []), d('district:y', 20, []), d('district:z', 10, [])];
    const t = typeDistricts(plain, cells, streams());
    expect(t.map((x) => x.kind)).toEqual(['craft', 'sprawl', 'central']);
    // in input order, whatever the scoring order
    expect(t.map((x) => x.district)).toEqual(['district:x', 'district:y', 'district:z']);
  });

  it('the random term (district.type) moves a close call: randomWeight · u in table order', () => {
    const plain = [d('district:x', 30, [])];
    // u for central … sprawl: give sprawl the largest draw
    const t = typeDistricts(plain, cells, streams({ 'district:x': [0, 0, 0, 0, 0, 0.9] }));
    expect(t[0].kind).toBe('sprawl');
    const zero: TypingCells = { ...cells, randomWeight: 0 };
    expect(typeDistricts(plain, zero, streams({ 'district:x': [0, 0, 0, 0, 0, 0.9] }))[0].kind).toBe('craft');
  });

  it('the mixed-use floor: no single-use district unless requested', () => {
    const t = typeDistricts(town, cells, streams());
    for (const x of t) {
      expect(x.mix[0][0]).toBe(x.kind);
      expect(x.mix[0][1]).toBeCloseTo(1 - cells.mixedUseFloor, 12);
      const rest = x.mix.slice(1).reduce((s, [, v]) => s + v, 0);
      expect(rest).toBeCloseTo(cells.mixedUseFloor, 12);
      expect(x.mix.length).toBeGreaterThan(1);
    }
    const one = typeDistricts(town, cells, streams(), { singleUse: new Set(['district:r1']) });
    expect(one.find((x) => x.district === 'district:r1')?.mix).toEqual([[one.find((x) => x.district === 'district:r1')?.kind, 1]]);
    const floor0 = typeDistricts(town, { ...cells, mixedUseFloor: 0.35 }, streams());
    for (const x of floor0) expect(x.mix[0][1]).toBeCloseTo(0.65, 12);
  });

  it('kinds are feature-named: every kind is the demand table’s, none a wealth or class word', () => {
    const kinds = new Set(cells.kinds.map((k) => k.kind));
    for (const x of typeDistricts(town, cells, streams())) expect(kinds.has(x.kind)).toBe(true);
    for (const k of kinds) expect(['rich', 'poor', 'residential', 'wealthy', 'slum', 'upper', 'lower']).not.toContain(k);
  });

  it('a district no kind admits is refused (every kind requiring a relation it lacks)', () => {
    const strict: TypingCells = { ...cells, kinds: cells.kinds.map((k) => ({ ...k, relations: [{ to: 'seed.market', mode: 'require' as const, weight: 1 }] })) };
    expect(() => typeDistricts([d('district:x', 5, [])], strict, streams())).toThrow(RangeError);
  });
});
