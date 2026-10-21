// M0-d-05a: the mint — §6.3's one collision rule (the `~k` address suffix, the smallest free `dup`, both resolved in
// the batch's canonical order of lineage hashes), the entity-key cache (C-0147), the town root (§6.1) — and the exit
// bar's "0 duplicate ids on the minting fixtures" (C-0179 (4), (7)). The permutation property checks every result
// against a plain restatement of the rule (its oracle) and against the same batch in another input order. The input
// checks (C-0184): a handed-on address's kind and arena, every record's kind, the live lineages' u32 lanes
// (a signed-lane survivor), the ids and the seed key's lanes on an empty batch.
import fc from 'fast-check';
import { entityKey, seedKey, STAGES, type Hash128, type LineageHash, type PlatKey, type StageId } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import {
  addressOf,
  compareLineage,
  GROUND,
  lineageHash,
  lineageLanes,
  mint,
  mintTownRoot,
  sameLineage,
  TOWN_KIND,
  TOWN_ROOT,
  tokenOf,
  userAddressOf,
  type BatchRecord,
  type LineageKey,
  type LiveEntry,
  type Minted,
} from '../../src/index.js';

const SK = seedKey(11);
const U: LineageHash = [0x1234_5678, 0x9abc_def0];

function key(index: number, o: Partial<LineageKey> = {}): LineageKey {
  return { arena: GROUND, unit: U, stage: STAGES.S10, epoch: 0, index, reroll: 0, ...o };
}

function plot(index: number, o: Partial<BatchRecord> = {}, k: Partial<LineageKey> = {}): BatchRecord {
  return { kind: 'plot', key: key(index, k), ...o };
}

const lanesText = (k: LineageKey): string => Array.from(lineageLanes(k)).join(',');

function compareLanes(a: LineageKey, b: LineageKey): number {
  const x = lineageLanes(a);
  const y = lineageLanes(b);
  for (let i = 0; i < x.length; i += 1) if (x[i] !== y[i]) return x[i] < y[i] ? -1 : 1;
  return 0;
}

/** Two creation indices whose lineage hashes order opposite to their indices (so index order is not hash order). */
function inverted(): [number, number] {
  for (let i = 0; ; i += 1) if (compareLineage(lineageHash(key(i)), lineageHash(key(i + 1))) > 0) return [i, i + 1];
}

describe('§6.3 addresses: a fresh address equal to a live one takes ~1, the next ~2', () => {
  it('gives the natural address when it is free', () => {
    const [m] = mint([plot(0)], [], [], SK);
    expect(m.identity.id).toBe(addressOf('plot', lineageHash(key(0))));
    expect(m.natural).toBe(m.identity.id);
    expect(m.suffix).toBe(0);
    expect(m.dup).toBe(0);
  });

  it('suffixes against a live address, then the next against both', () => {
    const x = addressOf('plot', lineageHash(key(0)));
    // The recycling case: a successor holds x with its own fresh lineage; the original derivation runs again.
    const holder: LiveEntry = { id: x, lineage: [1, 1] };
    const [first] = mint([plot(0)], [holder], [], SK);
    expect(first.identity.id).toBe(`${x}~1`);
    expect(first.natural).toBe(x);
    expect(first.suffix).toBe(1);
    expect(first.dup).toBe(0); // the address collided, the lineage did not
    expect(sameLineage(first.identity.lineage, lineageHash(key(0)))).toBe(true);
    const [next] = mint([plot(0)], [holder, { id: first.identity.id, lineage: [2, 2] }], [], SK);
    expect(next.identity.id).toBe(`${x}~2`);
    expect(next.suffix).toBe(2);
  });

  it('takes the smallest free k, against tombstones and the batch’s own retired addresses too', () => {
    const x = addressOf('plot', lineageHash(key(0)));
    expect(mint([plot(0)], [{ id: x, lineage: [1, 1] }, { id: `${x}~2`, lineage: [3, 3] }], [], SK)[0].identity.id).toBe(`${x}~1`);
    expect(mint([plot(0)], [], [{ id: x }, { id: `${x}~1` }], SK)[0].identity.id).toBe(`${x}~2`);
    expect(mint([plot(0)], [{ id: x, lineage: [1, 1], retired: true }], [], SK)[0].identity.id).toBe(`${x}~1`);
    expect(mint([plot(0)], [{ id: x, lineage: [1, 1] }], [{ id: `${x}~1` }], SK)[0].identity.id).toBe(`${x}~2`);
  });

  it('suffixes a user-created entity’s address from (seq, ordinal) the same way', () => {
    const x = userAddressOf('plot', 9, 0);
    const [m] = mint([plot(0, { origin: { seq: 9, ordinal: 0 } })], [{ id: x, lineage: [5, 5] }], [], SK);
    expect(m.natural).toBe(x);
    expect(m.identity.id).toBe(`${x}~1`);
  });

  it('resolves two fresh records contending for one address by lineage hash — never by arrival order or creation index', () => {
    const [i, j] = inverted(); // index i < j, but lineageHash(key(i)) > lineageHash(key(j))
    const x = userAddressOf('plot', 7, 0);
    const a = plot(i, { origin: { seq: 7, ordinal: 0 } });
    const b = plot(j, { origin: { seq: 7, ordinal: 0 } });
    for (const live of [[], [{ id: x, lineage: [1, 1] }]] as LiveEntry[][]) {
      const base = live.length; // 0: the smaller hash takes x itself; 1: it takes ~1
      const ab = mint([a, b], live, [], SK);
      const ba = mint([b, a], live, [], SK);
      const want = (k: number): string => (k === 0 ? x : `${x}~${String(k)}`);
      expect(ab[1].identity.id).toBe(want(base)); // b: the smaller lineage hash, minted first
      expect(ab[0].identity.id).toBe(want(base + 1));
      expect(ba[0].identity.id).toBe(want(base));
      expect(ba[1].identity.id).toBe(want(base + 1));
    }
  });

  it('keeps a handed-on address as it is and suffixes a fresh natural address equal to it', () => {
    const x = addressOf('plot', lineageHash(key(0)));
    const old: LiveEntry = { id: x, lineage: [4, 4], retired: true };
    // key(1) succeeds the retired entity at x (M0-d-05b's matching hands x on); key(0)'s natural address is x.
    const out = mint([plot(0), plot(1, { address: x })], [old], [], SK);
    expect(out[1].identity.id).toBe(x);
    expect(out[1].suffix).toBe(0);
    expect(sameLineage(out[1].identity.lineage, lineageHash(key(1)))).toBe(true); // its own fresh lineage
    expect(out[0].identity.id).toBe(`${x}~1`);
  });

  it('refuses a handed-on address that is no retired entity’s — a survivor’s, nobody’s — or that two records share', () => {
    const x = 'plot:0000000000001';
    const retired: LiveEntry = { id: x, lineage: [1, 1], retired: true };
    expect(() => mint([plot(0, { address: x })], [{ id: x, lineage: [1, 1] }], [], SK)).toThrow(RangeError);
    expect(() => mint([plot(0, { address: x })], [], [], SK)).toThrow(RangeError);
    expect(() => mint([plot(0, { address: x })], [], [{ id: x }], SK)).toThrow(RangeError);
    expect(() => mint([plot(0, { address: x }), plot(1, { address: x })], [retired], [], SK)).toThrow(RangeError);
    expect(() => mint([plot(0, { address: x })], [retired], [], SK)).not.toThrow();
  });

  // §6.3 EntityKind ("as Identity.kind and an address's kind: prefix spell it") and §2.1 Ids (an address is prefixed with
  // its arena) on the successor path: a handed-on address must spell the record's kind and name its arena (C-0184).
  it('checks a handed-on record’s kind by the kind rule and refuses an address of another kind or another arena', () => {
    const x = addressOf('plot', lineageHash(key(0)));
    const old: LiveEntry = { id: x, lineage: [4, 4], retired: true };
    // A malformed kind is refused with an address handed on, as without one.
    expect(() => mint([{ kind: 'pl ot', key: key(1), address: x }], [old], [], SK)).toThrow(/not an entity kind: pl ot/);
    expect(() => mint([{ kind: 'pl ot', key: key(1) }], [], [], SK)).toThrow(/not an entity kind: pl ot/);
    expect(() => mint([{ kind: 'pl ot', key: key(1), origin: { seq: 1, ordinal: 0 } }], [], [], SK)).toThrow(/not an entity kind: pl ot/);
    // A building handed a plot's address.
    expect(() => mint([{ kind: 'building', key: key(1), address: x }], [old], [], SK)).toThrow(/is of kind plot, the record's kind is building/);
    // Kinds are compared exactly: C-0179 (3)'s kind rule [A-Za-z][A-Za-z0-9._-]* makes `Plot` and `plot` two kinds
    // (note N-1): a record of kind Plot handed a plot: address is refused, and a plot record handed a Plot: address.
    expect(() => mint([{ kind: 'Plot', key: key(1), address: x }], [old], [], SK)).toThrow(
      `mint: the handed-on address ${x} is of kind plot, the record's kind is Plot`,
    );
    const upper = `Plot:${x.slice('plot:'.length)}`;
    expect(() => mint([plot(1, { address: upper })], [{ id: upper, lineage: [4, 4], retired: true }], [], SK)).toThrow(
      `mint: the handed-on address ${upper} is of kind Plot, the record's kind is plot`,
    );
    // A sky-2 record handed a bare ground address.
    expect(() => mint([plot(1, { address: x }, { arena: { layer: 'sky', part: 2 } })], [old], [], SK)).toThrow(/does not name the record's arena/);
    // A handed-on string that is no address at all, even when a retired entry holds it.
    expect(() => mint([plot(1, { address: 'plot' })], [{ id: 'plot', lineage: [4, 4], retired: true }], [], SK)).toThrow(/not an address/);
    // The same kind and arena is kept as it is, a suffixed address too.
    const [m] = mint([plot(1, { address: `${x}~1` })], [{ id: `${x}~1`, lineage: [4, 4], retired: true }], [], SK);
    expect(m.identity.id).toBe(`${x}~1`);
    expect(m.identity.kind).toBe('plot');
  });

  it('accepts a handed-on address exactly when its prefix names the record’s arena: the layer always, the part off the ground', () => {
    const arenas: PlatKey[] = [
      GROUND,
      { layer: 'ground', part: 1 },
      { layer: 'ground', part: 3 },
      { layer: 'underground', part: 0 },
      { layer: 'underground', part: 1 },
      { layer: 'underground', part: 3 },
      { layer: 'sky', part: 0 },
      { layer: 'sky', part: 2 },
      { layer: 'sky', part: 3 },
    ];
    for (const from of arenas) {
      const address = addressOf('plot', lineageHash(key(0, { arena: from })), from);
      const old: LiveEntry = { id: address, lineage: [4, 4], retired: true };
      for (const to of arenas) {
        const same = from.layer === to.layer && (from.layer === 'ground' || from.part === to.part); // every ground part is bare
        const run = (): Minted[] => mint([plot(1, { address }, { arena: to })], [old], [], SK);
        if (same) {
          const [m] = run();
          expect(m.identity.id).toBe(address);
          expect(m.identity.key).toEqual(to);
        } else {
          expect(run).toThrow(/does not name the record's arena/);
        }
      }
    }
  });
});

describe('§6.3 lineage: a lineage equal to a survivor’s takes the smallest free dup', () => {
  it('takes dup 1 against a survivor and mints its address from the new lineage', () => {
    const survivor: LiveEntry = { id: 'plot:locked', lineage: lineageHash(key(0)) };
    const [m] = mint([plot(0)], [survivor], [], SK);
    expect(m.dup).toBe(1);
    expect(m.key.dup).toBe(1);
    expect(m.identity.lineage).toEqual(lineageHash(key(0, { dup: 1 })));
    expect(m.identity.id).toBe(addressOf('plot', lineageHash(key(0, { dup: 1 }))));
    expect(m.suffix).toBe(0);
  });

  it('takes the smallest free dup: 2 past dup 0 and 1, 1 past dup 0 and 2', () => {
    const at = (d: number): LiveEntry => ({ id: `plot:d${String(d)}`, lineage: lineageHash(d === 0 ? key(0) : key(0, { dup: d })) });
    expect(mint([plot(0)], [at(0), at(1)], [], SK)[0].dup).toBe(2);
    expect(mint([plot(0)], [at(0), at(2)], [], SK)[0].dup).toBe(1);
    expect(mint([plot(0)], [at(1)], [], SK)[0].dup).toBe(0);
  });

  it('re-mints the key of an entity the batch itself replaces (a faithful Regenerate): no collision', () => {
    const replaced: LiveEntry = { id: addressOf('plot', lineageHash(key(0))), lineage: lineageHash(key(0)), retired: true };
    const [m] = mint([plot(0, { address: replaced.id })], [replaced], [], SK);
    expect(m.dup).toBe(0);
    expect(m.identity.lineage).toEqual(replaced.lineage);
    expect(m.identity.id).toBe(replaced.id);
  });

  it('reads a tombstone’s address only: an archived lineage is no collision', () => {
    const [m] = mint([plot(0)], [], [{ id: 'plot:gone' }], SK);
    expect(m.dup).toBe(0);
  });

  it('refuses a fresh key that carries dup, two records with one key and a malformed seed key', () => {
    expect(() => mint([plot(0, {}, { dup: 1 })], [], [], SK)).toThrow(RangeError);
    expect(() => mint([plot(0), plot(0)], [], [], SK)).toThrow(RangeError);
    expect(() => mint([plot(0)], [], [], [1, 2, 3] as unknown as Hash128)).toThrow(RangeError);
    expect(() => mint([], [], [], [1, 2, 3] as unknown as Hash128)).toThrow(RangeError); // even with nothing to key
    expect(() => mint([plot(0, { reroll: 0x10000 })], [], [], SK)).toThrow(RangeError);
    expect(() => mint([{ kind: 'pl ot', key: key(0) }], [], [], SK)).toThrow(RangeError);
  });

  // C-0179 (4)'s "a malformed field", held for the live set (C-0184): §6.3's dup rule exists "so no two live entities
  // share draws", and a survivor's hash read through an Int32Array would compare unequal to the fresh u32 hash.
  it('refuses a survivor’s lineage given as signed lanes, which would share the survivor’s draws', () => {
    const h = lineageHash(key(0));
    const signed = new Int32Array(Uint32Array.from(h).buffer); // the same 64 bits, read as two signed lanes
    expect(signed[0] < 0 || signed[1] < 0).toBe(true); // the fixture differs from h as numbers
    expect(mint([plot(0)], [{ id: 'plot:s', lineage: h }], [], SK)[0].dup).toBe(1); // the u32 form: dup 1
    expect(mint([plot(0)], [{ id: 'plot:s', lineage: Uint32Array.from(h) as unknown as LineageHash }], [], SK)[0].dup).toBe(1);
    expect(() => mint([plot(0)], [{ id: 'plot:s', lineage: signed as unknown as LineageHash }], [], SK)).toThrow(/lineage is not two u32 lanes/);
    expect(() => mint([plot(0)], [{ id: 'plot:s', lineage: [h[0] | 0, h[1] | 0] }], [], SK)).toThrow(/lineage is not two u32 lanes/);
    expect(() => mint([plot(0)], [{ id: 'plot:s', lineage: [h[0] | 0, h[1] | 0], retired: true }], [], SK)).toThrow(/lineage is not two u32 lanes/);
  });

  it('refuses a live lineage that is not two u32 lanes, an id that is not a string and a malformed retired flag', () => {
    const bad: unknown[] = [[1], [1, 2, 3], [1, 1.5], [1, -1], [1, 2 ** 32], [1, Number.NaN], ['1', 2], [], null, undefined, 7];
    for (const lineage of bad) {
      expect(() => mint([plot(0)], [{ id: 'plot:s', lineage: lineage as LineageHash }], [], SK)).toThrow(/lineage is not two u32 lanes/);
      expect(() => mint([], [{ id: 'plot:s', lineage: lineage as LineageHash }], [], SK)).toThrow(/lineage is not two u32 lanes/); // nothing to mint
    }
    expect(mint([plot(0)], [{ id: 'plot:s', lineage: [0, 0xffff_ffff] }], [], SK)[0].dup).toBe(0); // the widths' edges pass
    for (const id of [5, undefined, null, ['plot:s']] as unknown[]) {
      expect(() => mint([plot(0)], [{ id: id as string, lineage: [1, 1] }], [], SK)).toThrow(/live entry's id is not a string/);
      expect(() => mint([plot(0)], [], [{ id: id as string }], SK)).toThrow(/tombstone's id is not a string/);
    }
    expect(() => mint([plot(0)], [null as unknown as LiveEntry], [], SK)).toThrow(RangeError);
    expect(() => mint([plot(0)], [], [null as unknown as { id: string }], SK)).toThrow(RangeError);
    for (const retired of [1, 'true', null] as unknown[]) {
      expect(() => mint([plot(0)], [{ id: 'plot:s', lineage: [1, 1], retired: retired as boolean }], [], SK)).toThrow(/retired flag is not a boolean/);
    }
    expect(mint([plot(0)], [{ id: 'plot:s', lineage: [1, 1], retired: false }], [], SK)[0].dup).toBe(0);
  });

  it('refuses a seed key whose lanes are not four u32s before it reads the batch, an empty batch too', () => {
    const bad: unknown[] = [[1, 2, 3, 1.5], [1, 2, 3, -1], [1, 2, 3, 2 ** 32], [1, 2, 3, '4'], [1, 2, 3, 4, 5], [Number.NaN, 2, 3, 4], null, undefined];
    for (const k of bad) {
      expect(() => mint([], [], [], k as Hash128)).toThrow(/seed key is not four u32 lanes/);
      expect(() => mint([plot(0)], [], [], k as Hash128)).toThrow(/seed key is not four u32 lanes/);
      expect(() => mintTownRoot(k as Hash128)).toThrow(/seed key is not four u32 lanes/);
    }
    expect(mint([], [], [], [0, 0, 0, 0xffff_ffff])).toEqual([]);
  });

  it('refuses a malformed record field on either path: the record, its key, parent, reroll and origin', () => {
    const x = addressOf('plot', lineageHash(key(0)));
    const old: LiveEntry = { id: x, lineage: [4, 4], retired: true };
    const cases: [unknown, RegExp][] = [
      [null, /batch record is not an object/],
      [{ kind: 'plot', key: null }, /lineage key is not an object/],
      [plot(1, { parent: 'not an address' }), /not an address/],
      [plot(1, { parent: 5 as unknown as string }), /not an address/],
      [plot(1, { reroll: 1.5 }), /reroll is not a u16/],
      [plot(1, { reroll: '1' as unknown as number }), /reroll is not a u16/],
      [plot(1, { origin: null as unknown as { seq: number; ordinal: number } }), /origin is not/],
      [plot(1, { origin: { seq: 1.5, ordinal: 0 } }), /origin is not/],
      [plot(1, { origin: { seq: 1, ordinal: -1 } }), /origin is not/],
      [plot(1, { address: x, origin: { seq: 1.5, ordinal: 0 } }), /origin is not/], // unused on the handed-on path, still checked
      [plot(1, { address: x, reroll: 0x10000 }), /reroll is not a u16/],
      [plot(1, { address: x }, { stage: 0x10000 as StageId }), /stage is not valid/],
    ];
    for (const [rec, msg] of cases) expect(() => mint([rec as BatchRecord], [old], [], SK)).toThrow(msg);
    expect(mint([plot(1, { parent: 'sky2/block:x', address: x, origin: { seq: 1, ordinal: 0 } })], [old], [], SK)[0].identity.id).toBe(x);
  });

  it('writes the persisted Identity: id, kind, parent, arena key, lineage, reroll', () => {
    const sky: PlatKey = { layer: 'sky', part: 2 };
    const [m] = mint([plot(3, { parent: 'block:x', reroll: 4 }, { arena: sky })], [], [], SK);
    expect(m.identity).toEqual({ id: addressOf('plot', lineageHash(key(3, { arena: sky })), sky), kind: 'plot', parent: 'block:x', key: sky, lineage: lineageHash(key(3, { arena: sky })), reroll: 4 });
    expect(m.identity.id.startsWith('sky2/plot:')).toBe(true);
    expect(Object.isFrozen(m.identity)).toBe(true);
    const [n] = mint([plot(3)], [], [], SK);
    expect('parent' in n.identity).toBe(false);
    expect(n.identity.reroll).toBe(0);
  });
});

// ---- the permutation property and its oracle ---------------------------------------------------------------------

const UNITS: LineageHash[] = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const ARENAS: PlatKey[] = [GROUND, { layer: 'sky', part: 2 }, { layer: 'underground', part: 0 }];

const arbSpec = fc.record({
  kind: fc.constantFrom('plot', 'building'),
  arena: fc.nat(2),
  unit: fc.nat(2),
  stage: fc.constantFrom<StageId>(STAGES.S10, STAGES.S11),
  epoch: fc.nat(1),
  index: fc.nat(5),
  reroll: fc.nat(1),
  user: fc.option(fc.record({ seq: fc.nat(1), ordinal: fc.nat(1) }), { nil: undefined }),
  survivor: fc.nat(3), // 0 none · 1 a survivor at its lineage · 2 survivors at dup 0 and dup 1 · 3 a retired entity at it
  holder: fc.nat(3), // 0 none · 1 a live entity at its natural address · 2 a retired one · 3 tombstones at it and ~1
});

/** A seeded Fisher–Yates shuffle (an LCG), so a permutation is part of the property's counterexample. */
function shuffled<T>(xs: readonly T[], seed: number): T[] {
  const out = xs.slice();
  let s = seed >>> 0;
  for (let i = out.length - 1; i > 0; i -= 1) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = s % (i + 1);
    const t = out[i];
    out[i] = out[j];
    out[j] = t;
  }
  return out;
}

const withDup = (k: LineageKey, d: number): LineageKey => (d === 0 ? k : { ...k, dup: d });
const suffixed = (natural: string, k: number): string => (k === 0 ? natural : `${natural}~${String(k)}`);

/** §6.3's rule stated plainly: in the order of fresh lineage hashes, the smallest free dup, then the smallest free k. */
function oracle(records: readonly BatchRecord[], live: readonly LiveEntry[], tombs: readonly { id: string }[]): Map<string, { id: string; dup: number; suffix: number }> {
  const ids = new Set<string>([...live.map((e) => e.id), ...tombs.map((t) => t.id)]);
  const lineages = live.filter((e) => e.retired !== true).map((e) => e.lineage);
  const order = records.slice().sort((a, b) => compareLineage(lineageHash(a.key), lineageHash(b.key)) || compareLanes(a.key, b.key));
  const out = new Map<string, { id: string; dup: number; suffix: number }>();
  for (const r of order) {
    let dup = 0;
    while (lineages.some((l) => sameLineage(l, lineageHash(withDup(r.key, dup))))) dup += 1;
    const lineage = lineageHash(withDup(r.key, dup));
    lineages.push(lineage);
    const natural = r.origin === undefined ? addressOf(r.kind, lineage, r.key.arena) : userAddressOf(r.kind, r.origin.seq, r.origin.ordinal, r.key.arena);
    let suffix = 0;
    while (ids.has(suffixed(natural, suffix))) suffix += 1;
    ids.add(suffixed(natural, suffix));
    out.set(lanesText(r.key), { id: suffixed(natural, suffix), dup, suffix });
  }
  return out;
}

describe('§6.3: collisions resolved identically under any input order, by the batch’s lineage hashes', () => {
  it('equals the oracle and is unmoved by any permutation of the records, the live set and the tombstones', () => {
    fc.assert(
      fc.property(fc.array(arbSpec, { minLength: 1, maxLength: 12 }), fc.integer(), fc.integer(), fc.integer(), (specs, s1, s2, s3) => {
        const records: BatchRecord[] = [];
        const live: LiveEntry[] = [];
        const tombs: { id: string }[] = [];
        const seen = new Set<string>();
        for (const sp of specs) {
          const k: LineageKey = { arena: ARENAS[sp.arena], unit: UNITS[sp.unit], stage: sp.stage, epoch: sp.epoch, index: sp.index, reroll: sp.reroll };
          if (seen.has(lanesText(k))) continue;
          seen.add(lanesText(k));
          records.push(sp.user === undefined ? { kind: sp.kind, key: k } : { kind: sp.kind, key: k, origin: sp.user });
          const h = lineageHash(k);
          const n = live.length;
          if (sp.survivor === 1) live.push({ id: `plot:s${String(n)}`, lineage: h });
          if (sp.survivor === 2) live.push({ id: `plot:s${String(n)}`, lineage: h }, { id: `plot:t${String(n)}`, lineage: lineageHash(withDup(k, 1)) });
          if (sp.survivor === 3) live.push({ id: `plot:r${String(n)}`, lineage: h, retired: true });
          const natural = sp.user === undefined ? addressOf(sp.kind, h, k.arena) : userAddressOf(sp.kind, sp.user.seq, sp.user.ordinal, k.arena);
          if (sp.holder === 1) live.push({ id: natural, lineage: [n, 0xfeed] });
          if (sp.holder === 2) live.push({ id: natural, lineage: [n, 0xbeef], retired: true });
          if (sp.holder === 3) tombs.push({ id: natural }, { id: `${natural}~1` });
        }
        const a = mint(records, live, tombs, SK);
        const perm = shuffled(records, s1);
        const b = mint(perm, shuffled(live, s2), shuffled(tombs, s3), SK);
        const want = oracle(records, live, tombs);
        const byKey = new Map<string, Minted>(b.map((m, i) => [lanesText(perm[i].key), m]));
        const ids = new Set<string>();
        const taken = new Set<string>([...live.map((e) => e.id), ...tombs.map((t) => t.id)]);
        const survivors = live.filter((e) => e.retired !== true);
        a.forEach((m, i) => {
          const w = want.get(lanesText(records[i].key));
          expect(m.identity.id).toBe(w?.id);
          expect(m.dup).toBe(w?.dup);
          expect(m.suffix).toBe(w?.suffix);
          expect(byKey.get(lanesText(records[i].key))).toEqual(m);
          // 0 duplicate ids; no id given twice, none a live or archived one; no lineage shared with a survivor.
          expect(ids.has(m.identity.id)).toBe(false);
          expect(taken.has(m.identity.id)).toBe(false);
          ids.add(m.identity.id);
          expect(survivors.some((e) => sameLineage(e.lineage, m.identity.lineage))).toBe(false);
          expect(m.identity.lineage).toEqual(lineageHash(m.key));
        });
        expect(new Set(a.map((m) => m.identity.lineage.join())).size).toBe(a.length);
      }),
    );
  }, 300_000); // PLAT_FUZZ_RUNS runs (10⁴ by default): a generous limit on a shared machine, no timing taken
});

describe('the entity-key cache (§6.1, C-0147): computed once at mint, beside the lineage hash, never persisted', () => {
  const batch: BatchRecord[] = [plot(0), plot(1, { parent: 'block:a' }, { arena: { layer: 'sky', part: 2 } }), plot(2, {}, { arena: { layer: 'underground', part: 3 } })];

  it('carries entityKey(seedKey, its lineage hash, its arena key) for every minted entity', () => {
    for (const m of mint(batch, [{ id: 'plot:x', lineage: lineageHash(key(0)) }], [], SK)) {
      expect(m.entityKey).toEqual(entityKey(SK, m.identity.lineage, m.identity.key));
      // A cached value, not a getter: one computation at mint, the same array on every read.
      const d = Object.getOwnPropertyDescriptor(m, 'entityKey');
      expect(d?.get).toBeUndefined();
      expect(Array.isArray(d?.value)).toBe(true);
      expect(m.entityKey).toBe(m.entityKey);
      expect(Object.isFrozen(m.entityKey)).toBe(true);
    }
  });

  it('leaves the persisted identity unchanged: no key field, and equal under another seed key', () => {
    const a = mint(batch, [], [], SK);
    const b = mint(batch, [], [], seedKey(12));
    a.forEach((m, i) => {
      expect(Object.getOwnPropertyNames(m.identity).sort()).toEqual(i === 1 ? ['id', 'key', 'kind', 'lineage', 'parent', 'reroll'] : ['id', 'key', 'kind', 'lineage', 'reroll']);
      expect(b[i].identity).toEqual(m.identity);
      expect(b[i].entityKey).not.toEqual(m.entityKey);
    });
  });

  it('caches the town root’s key over the fixed town lineage on ground part 0', () => {
    const root = mintTownRoot(SK);
    expect(root.entityKey).toEqual(entityKey(SK, lineageHash(TOWN_ROOT), GROUND));
    expect(Object.getOwnPropertyDescriptor(root, 'entityKey')?.get).toBeUndefined();
  });
});

describe('the town root (§6.1, §6.3: ground arena, no parent, creation epoch 0, index 0)', () => {
  it('mints the town lineage at its address, with no parent', () => {
    const root = mintTownRoot(SK);
    expect(root.key).toBe(TOWN_ROOT);
    expect(root.identity).toEqual({ id: `${TOWN_KIND}:${tokenOf(lineageHash(TOWN_ROOT))}`, kind: 'town', key: GROUND, lineage: lineageHash(TOWN_ROOT), reroll: 0 });
    expect('parent' in root.identity).toBe(false);
    expect(root.identity.id).toBe('town:' + tokenOf([0x99c01090, 0x102eece6]));
    // The same root whatever the seed: only its entity key depends on the seed (§6.1: "on the recipe alone").
    expect(mintTownRoot(seedKey(99)).identity).toEqual(root.identity);
    expect(() => mintTownRoot([1, 2] as unknown as Hash128)).toThrow(RangeError);
  });
});
