// M0-d-04: the model digest's leaf (§6.2: "leaf(record) = H128(kind ‖ id ‖ lineage ‖ parent ‖ existence ‖ flags ‖
// attributes in schema order ‖ digests of the faces and chains it owns)"; C-0194 (3)–(5)) and the value rule (§6.2:
// integers as 32-bit lanes, doubles as their bit patterns with −0 normalised and NaN refused, strings as UTF-8, no text
// serialisation on the digest path). Schema-order coverage: every M0 kind has its order, and a changed order changes
// the leaf (snapshot, leaf-snapshot.json). The re-export of H128 / H32 / fmix32 (C-0066).
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as kernel from '@plat/kernel';
import { LaneWriter, type Hash128, type PlatKey } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import {
  DIGEST_LAYERS,
  digestLeaf,
  fmix32,
  geomRefOf,
  H128,
  H32,
  LAYER_OF,
  leafRefs,
  M0_KINDS,
  RecordsDigest,
  schemaOrder,
  writeValue,
  type DigestEntry,
  type GeomRefLike,
  type RecordKind,
} from '../../src/index.js';
import { GROUND, hex, LIFE, lineage, plotEntry, wayEntry } from './support.js';
import { sameHash, writeHash128 } from '../../src/digest/encode.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const NO_GEOMETRY = (): Hash128 => [0, 0, 0, 0];

/** A record of `kind` whose every schema attribute holds a value naming it (the leaf reads any value by the rule). */
function shaped(kind: RecordKind, order: readonly string[] = schemaOrder(kind)): DigestEntry {
  const record: Record<string, unknown> = { id: `${kind}:1`, lifecycle: LIFE };
  for (const a of order) record[a] = `${kind}.${a}`;
  return { kind, id: `${kind}:1`, identity: { lineage: lineage(`${kind}:1`), key: GROUND }, record: record as never };
}

/** The leaf written from §6.2's form directly, over a given attribute order (the reference the leaf is held to). */
function reference(e: DigestEntry, order: readonly string[], geometry: readonly Hash128[] = []): Hash128 {
  const w = new LaneWriter().u32(0x4641454c).utf8(e.kind).utf8(e.id).u32(e.identity.lineage[0]).u32(e.identity.lineage[1]);
  if (e.identity.parent === undefined) w.u32(0);
  else w.u32(1).utf8(e.identity.parent);
  const rec = e.record as unknown as Record<string, unknown>;
  w.u32(1).utf8('generated').u32(0).u32(0).u32(0); // existence, flags, lockedPaths and editedPaths absent
  w.u32(order.length);
  for (const a of order) writeValue(w, rec[a], a, null);
  w.u32(geometry.length);
  for (const g of geometry) for (const x of g) w.u32(x);
  return w.digest();
}

describe('the re-export (C-0066)', () => {
  it('@plat/model\'s H128, H32 and fmix32 are @plat/kernel\'s', () => {
    expect(H128).toBe(kernel.H128);
    expect(H32).toBe(kernel.H32);
    expect(fmix32).toBe(kernel.fmix32);
    expect(H32('')).toBe(0);
  });
});

describe('schema-order coverage', () => {
  it('every M0 kind has its order and its layer; the leaf is §6.2\'s form over that order', () => {
    for (const kind of M0_KINDS) {
      const order = schemaOrder(kind);
      expect(order.length, kind).toBeGreaterThan(0);
      expect(DIGEST_LAYERS).toContain(LAYER_OF[kind]);
      const e = shaped(kind);
      expect(hex(digestLeaf(e, NO_GEOMETRY)), kind).toBe(hex(reference(e, order)));
    }
  });

  it('a changed order changes the leaf: each kind\'s first two attributes swapped, its last moved first', () => {
    for (const kind of M0_KINDS) {
      const order = schemaOrder(kind);
      const e = shaped(kind);
      const leaf = hex(digestLeaf(e, NO_GEOMETRY));
      if (order.length >= 2) {
        const swapped = [order[1], order[0], ...order.slice(2)];
        expect(hex(reference(e, swapped)), kind).not.toBe(leaf);
      }
      expect(hex(reference(e, [order[order.length - 1], ...order.slice(0, -1)])) === leaf, kind).toBe(order.length === 1);
    }
  });

  it('the leaves of the shaped records are the snapshot\'s (a changed order or encoding moves a leaf of its kind)', () => {
    const snap = JSON.parse(readFileSync(join(HERE, 'leaf-snapshot.json'), 'utf8')) as Record<string, string>;
    const now: Record<string, string> = {};
    for (const kind of M0_KINDS) now[kind] = hex(digestLeaf(shaped(kind), NO_GEOMETRY));
    now['plot (full)'] = hex(digestLeaf(plotEntry('plot:1', 'block:1', 'district:1'), NO_GEOMETRY));
    expect(now).toEqual(snap);
  });

  it('the header: kind, id, lineage, parent, existence and every flag move the leaf; `since` does not', () => {
    const base = plotEntry('plot:1', 'block:1', 'district:1');
    const leaf = hex(digestLeaf(base, NO_GEOMETRY));
    const life = base.record.lifecycle;
    const variants: DigestEntry[] = [
      { ...base, identity: { ...base.identity, lineage: [base.identity.lineage[0] ^ 1, base.identity.lineage[1]] } },
      { ...base, identity: { lineage: base.identity.lineage, key: GROUND } },
      { ...base, record: { ...base.record, lifecycle: { ...life, existence: 'altered' } } },
      { ...base, record: { ...base.record, lifecycle: { ...life, flags: { ...life.flags, pinned: true } } } },
      { ...base, record: { ...base.record, lifecycle: { ...life, flags: { ...life.flags, editedPaths: ['use'] } } } },
    ];
    const seen = new Set([leaf]);
    for (const v of variants) {
      const h = hex(digestLeaf(v, NO_GEOMETRY));
      expect(seen.has(h)).toBe(false);
      seen.add(h);
    }
    const since = { ...base, record: { ...base.record, lifecycle: { ...life, since: { epoch: 3, seq: 9 } } } };
    expect(hex(digestLeaf(since, NO_GEOMETRY))).toBe(leaf);
  });

  it('refuses an entry holding another record, a malformed lineage or a dossier ref (M1)', () => {
    const w = wayEntry('way:1');
    expect(() => digestLeaf({ ...w, id: 'way:2' }, NO_GEOMETRY)).toThrow(RangeError);
    expect(() => digestLeaf({ ...w, identity: { ...w.identity, lineage: [1.5, 0] } }, NO_GEOMETRY)).toThrow(RangeError);
    // The lineage check is the leaf's own (each lane a u32, exactly two lanes), before any lane is written.
    for (const lineage of [[1.5, 0], [0, 1.5], [-1, 0], [1, 2, 3]]) {
      expect(() => digestLeaf({ ...w, identity: { ...w.identity, lineage: lineage as never } }, NO_GEOMETRY)).toThrow("digest: way:1's lineage is not two u32 lanes");
    }
    expect(() => digestLeaf({ ...w, identity: { ...w.identity, dossier: { element: 'x' } } as never }, NO_GEOMETRY)).toThrow(/M1/);
    expect(() => digestLeaf({ ...w, kind: 'building' as never }, NO_GEOMETRY)).toThrow(RangeError);
  });
});

describe('excluded fields (§6.2: provenance, derivation records, naming records)', () => {
  it('a plot\'s derivation record moves no model leaf; it moves the records digest', () => {
    const a = plotEntry('plot:1', 'block:1', 'district:1');
    const b: DigestEntry<'plot'> = { ...a, record: { ...a.record, derivedFrom: { ...a.record.derivedFrom, band: 'b4', epoch: 2 } } };
    expect(hex(digestLeaf(b, NO_GEOMETRY))).toBe(hex(digestLeaf(a, NO_GEOMETRY)));
    expect(schemaOrder('plot')).not.toContain('derivedFrom');
    const ra = new RecordsDigest();
    const rb = new RecordsDigest();
    ra.put({ entity: 'plot:1', kind: 'derivation', partition: 'district:1', record: a.record.derivedFrom });
    rb.put({ entity: 'plot:1', kind: 'derivation', partition: 'district:1', record: b.record.derivedFrom });
    expect(hex(rb.finaliseRoot())).not.toBe(hex(ra.finaliseRoot()));
  });

  it('a field outside the schema order (a provenance column, say) moves no leaf', () => {
    const a = wayEntry('way:1');
    const b = { ...a, record: { ...a.record, provenance: { run: 3, attempt: 1 } } as never };
    expect(hex(digestLeaf(b, NO_GEOMETRY))).toBe(hex(digestLeaf(a, NO_GEOMETRY)));
  });
});

describe('the value rule', () => {
  const enc = (v: unknown): string => {
    const w = new LaneWriter();
    writeValue(w, v, '$', null);
    return hex(w.digest());
  };

  it('doubles enter as bit patterns, −0 normalised to +0; NaN is refused', () => {
    expect(enc(-0)).toBe(enc(0));
    expect(enc(0.1 + 0.2)).not.toBe(enc(0.3));
    expect(enc(1.5)).not.toBe(enc(1.5000000000000002));
    expect(enc(new Float64Array([-0]))).toBe(enc(new Float64Array([0])));
    expect(() => enc(Number.NaN)).toThrow(/NaN/);
    expect(() => enc({ a: [1, Number.NaN] })).toThrow(/\$\.a\[1\]/);
    expect(() => enc(new Float32Array([Number.NaN]))).toThrow(/NaN/);
  });

  it('an integer is one lane and a non-integer two; one value has one encoding whichever its source', () => {
    expect(enc(3)).toBe(enc(3.0));
    expect(enc(3)).not.toBe(enc(3.5));
    expect(enc(2 ** 31)).not.toBe(enc(-(2 ** 31)));
    expect(enc(Infinity)).not.toBe(enc(-Infinity));
  });

  it('types are tagged: no two shapes share a stream', () => {
    const values: unknown[] = [undefined, null, false, true, 0, '0', '', [], [0], ['0'], {}, { 0: 0 }, new Int32Array([0]), new Uint32Array([0]), new Float64Array([0]), [[]], [null]];
    const seen = new Set(values.map(enc));
    expect(seen.size).toBe(values.length);
    expect(enc(['ab', 'c'])).not.toBe(enc(['a', 'bc']));
  });

  it('a nested object\'s keys enter sorted, whatever their insertion order; an undefined key is absent', () => {
    expect(enc({ b: 1, a: 2 })).toBe(enc({ a: 2, b: 1 }));
    expect(enc({ a: 1, b: undefined })).toBe(enc({ a: 1 }));
    expect(enc({ 10: 1, 9: 2 })).toBe(enc({ 9: 2, 10: 1 }));
  });

  it('refuses what no record holds: a Map, a Set, a function, a bigint, a class instance', () => {
    for (const v of [new Map(), new Set(), () => 1, 1n, new Date(0), new BigInt64Array(1)]) expect(() => enc(v)).toThrow(RangeError);
  });

  it('recognises the four stored reference forms by their key sets, and nothing else', () => {
    expect(geomRefOf({ owner: 'block:1', level: 2 })).toEqual({ owner: 'block:1', level: 2 });
    expect(geomRefOf({ role: 'way', entity: 'way:1' })).toEqual({ role: 'way', entity: 'way:1' });
    expect(geomRefOf({ role: 'deck_end', entity: 'bridge:1', ordinal: 1 })).toEqual({ role: 'deck_end', entity: 'bridge:1', ordinal: 1 });
    expect(geomRefOf({ owner: 'block:1', level: 7 })).toBeNull();
    expect(geomRefOf({ kind: 'junction', id: 'junction:1' })).toBeNull();
    expect(geomRefOf({ role: 'way', entity: 'way:1', extra: 1 })).toBeNull();
  });
});

describe('the digests of the faces and chains a record owns', () => {
  it('follow the attributes, one per reference in the order met, each resolved in the entity\'s arena', () => {
    const p = plotEntry('plot:1', 'block:1', 'district:1');
    const refs = leafRefs(p);
    expect(refs).toEqual([
      { owner: 'plot:1', level: 3 },
      { role: 'frontage', entity: 'plot:1' },
      { role: 'access', entity: 'plot:1' },
      { role: 'party_wall', entity: 'plot:1' },
    ]);
    const asked: string[] = [];
    const geo = (ref: GeomRefLike, key: PlatKey): Hash128 => {
      asked.push(`${key.layer}${key.part}:${JSON.stringify(ref)}`);
      return [asked.length, 0, 0, 0];
    };
    const leaf = digestLeaf(p, geo);
    expect(asked).toHaveLength(4);
    expect(hex(leaf)).toBe(hex(reference(p, schemaOrder('plot'), [[1, 0, 0, 0], [2, 0, 0, 0], [3, 0, 0, 0], [4, 0, 0, 0]])));
    // A different face digest moves the leaf (the geometry is in the leaf through the kernel's digests).
    expect(hex(digestLeaf(p, (r) => ('owner' in r ? [9, 9, 9, 9] : [0, 0, 0, 0])))).not.toBe(hex(digestLeaf(p, NO_GEOMETRY)));
  });
});

describe('no text serialisation on the digest path (§6.2)', () => {
  it('the digest path\'s sources neither import the canonical text form nor stringify', () => {
    const dir = join(HERE, '../../src/digest');
    const kernelDigest = join(HERE, '../../../kernel/src/digest');
    const files = [
      ...readdirSync(dir).filter((f) => f.endsWith('.ts') && f !== 'canonical.ts' && f !== 'index.ts').map((f) => join(dir, f)),
      ...readdirSync(kernelDigest).filter((f) => f.endsWith('.ts')).map((f) => join(kernelDigest, f)),
    ];
    expect(files.length).toBeGreaterThanOrEqual(8);
    for (const f of files) {
      const src = readFileSync(f, 'utf8');
      expect(src, f).not.toMatch(/canonical(\.js|Text)/);
      expect(src, f).not.toMatch(/JSON\.stringify|toFixed|toPrecision|toString\(/);
    }
  });
});

describe('a digest inside a digest, and the digest equality (encode.ts; C-0412)', () => {
  const H: Hash128 = [0x01234567, 0x89abcdef, 0xdeadbeef, 0x00c0ffee];
  const lanes = (order: readonly number[]): string => {
    const w = new LaneWriter();
    for (const i of order) w.u32(H[i]);
    return hex(w.digest());
  };

  it('writeHash128 writes the four lanes in order, lane 0 first: every other order of the four is another stream', () => {
    const w = new LaneWriter();
    writeHash128(w, H);
    const written = hex(w.digest());
    expect(written).toBe(lanes([0, 1, 2, 3]));
    const perms: number[][] = [];
    const permute = (rest: number[], acc: number[]): void => {
      if (rest.length === 0) perms.push(acc);
      for (let i = 0; i < rest.length; i++) permute([...rest.slice(0, i), ...rest.slice(i + 1)], [...acc, rest[i]]);
    };
    permute([0, 1, 2, 3], []);
    expect(perms).toHaveLength(24);
    for (const q of perms) expect(lanes(q) === written, q.join('')).toBe(q.join('') === '0123');
    // Three lanes, or five, are other streams too.
    expect(lanes([0, 1, 2])).not.toBe(written);
    expect(lanes([0, 1, 2, 3, 3])).not.toBe(written);
  });

  it('sameHash compares all four lanes: a digest differing in any one lane is another digest', () => {
    expect(sameHash(H, [...H] as Hash128)).toBe(true);
    for (let i = 0; i < 4; i++) {
      const g = [...H] as Hash128;
      g[i] = (g[i] ^ 1) >>> 0;
      expect(sameHash(H, g), `lane ${i}`).toBe(false);
      expect(sameHash(g, H), `lane ${i}`).toBe(false);
    }
  });
});
