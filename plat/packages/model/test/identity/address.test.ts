// M0-d-05a: address ids (§6.3 *Address id*, §2.1 *Ids*; C-0179 (2), (3)). The token is checked against an
// independent BigInt base-32 oracle; tokens are 13 characters; a prefix round-trips for under/, under<n>/, sky<n>/;
// and the address is opaque: the parent is never parsed from it — a test mutates the token and resolves by the field.
import fc from 'fast-check';
import { H128, STAGES, seedKey, type Layer, type PlatKey } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import {
  addressOf,
  arenaPrefix,
  lineageHash,
  mint,
  mintTownRoot,
  parseAddress,
  TOKEN_ALPHABET,
  TOKEN_LENGTH,
  tokenOf,
  userAddressOf,
  userTokenHash,
  type BatchRecord,
  type Identity,
} from '../../src/index.js';

const u32 = fc.integer({ min: 0, max: 0xffffffff });

/** The oracle: the 64-bit value as a BigInt, written in base 32 most significant first, left-padded to 13. */
function oracleToken(lo: number, hi: number): string {
  let v = (BigInt(hi) << 32n) | BigInt(lo);
  let s = '';
  for (let i = 0; i < 13; i += 1) {
    s = TOKEN_ALPHABET[Number(v & 31n)] + s;
    v >>= 5n;
  }
  expect(v).toBe(0n);
  return s;
}

describe('the base-32 token (§6.3: 13 characters)', () => {
  it('is 13 characters of the alphabet and equals the BigInt oracle', () => {
    expect(TOKEN_LENGTH).toBe(13);
    expect(new Set(TOKEN_ALPHABET).size).toBe(32);
    expect(TOKEN_ALPHABET).not.toMatch(/[ilou]/);
    fc.assert(
      fc.property(u32, u32, (lo, hi) => {
        const t = tokenOf([lo, hi]);
        expect(t).toHaveLength(13);
        expect(t).toMatch(/^[0-9abcdefghjkmnpqrstvwxyz]{13}$/);
        expect(t).toBe(oracleToken(lo, hi));
      }),
    );
  });

  it('gives the edge values', () => {
    expect(tokenOf([0, 0])).toBe('0000000000000');
    expect(tokenOf([0xffffffff, 0xffffffff])).toBe('fzzzzzzzzzzzz');
    expect(tokenOf([1, 0])).toBe('0000000000001');
    expect(tokenOf([0, 0x80000000])).toBe('8000000000000');
    expect(tokenOf([0, 1])).toBe('0000004000000'); // 2³² = 4 · 32⁶
  });

  it('is injective over the 64-bit hash (distinct hashes, distinct tokens)', () => {
    fc.assert(
      fc.property(u32, u32, u32, u32, (a, b, c, d) => {
        expect(tokenOf([a, b]) === tokenOf([c, d])).toBe(a === c && b === d);
      }),
    );
  });

  it('refuses a hash that is not two u32 lanes', () => {
    expect(() => tokenOf([1, -1])).toThrow(RangeError);
    expect(() => tokenOf([1, -1])).toThrow(/^token: not a 64-bit hash of two u32 lanes: 1,-1$/);
    expect(() => tokenOf([1.5, 0])).toThrow(RangeError);
    expect(() => tokenOf([1.5, 0])).toThrow(/^token: not a 64-bit hash of two u32 lanes: 1\.5,0$/);
    expect(() => tokenOf([0, 2 ** 32])).toThrow(RangeError);
    expect(() => tokenOf([0, 2 ** 32])).toThrow(/^token: not a 64-bit hash of two u32 lanes: 0,4294967296$/);
  });

  it('writes a user-created entity’s token from (seq, ordinal), distinct over a grid and apart from the lineage form', () => {
    const seen = new Set<string>();
    for (let seq = 1; seq <= 60; seq += 1) for (let ordinal = 0; ordinal < 60; ordinal += 1) seen.add(tokenOf(userTokenHash(seq, ordinal)));
    expect(seen.size).toBe(3600);
    // The exact form (C-0179 (2)): H128's words 0 and 1 over the little-endian lanes (0x75736572, seq, ordinal).
    const bytes = new Uint8Array(12);
    const view = new DataView(bytes.buffer);
    [0x75736572, 5, 2].forEach((v, i) => view.setUint32(i * 4, v, true));
    const h = H128(bytes);
    expect(userTokenHash(5, 2)).toEqual([h[0], h[1]]);
    expect(userTokenHash(2, 5)).not.toEqual(userTokenHash(5, 2));
    expect(userAddressOf('plot', 5, 2)).toBe(`plot:${tokenOf(userTokenHash(5, 2))}`);
    expect(userAddressOf('tunnel', 5, 2, { layer: 'underground', part: 3 })).toBe(`under3/tunnel:${tokenOf(userTokenHash(5, 2))}`);
    expect(() => userTokenHash(-1, 0)).toThrow(RangeError);
    expect(() => userTokenHash(-1, 0)).toThrow(/^user token: seq is not a u32: -1$/);
    expect(() => userTokenHash(0, 1.5)).toThrow(RangeError);
    expect(() => userTokenHash(0, 1.5)).toThrow(/^user token: ordinal is not a u32: 1\.5$/);
  });
});

describe('the arena prefix (§2.1)', () => {
  it('writes ground bare, under/, under<n>/ and sky<n>/', () => {
    const h = lineageHash({ arena: { layer: 'ground', part: 0 }, unit: null, stage: STAGES.S0, epoch: 0, index: 5, reroll: 0 });
    const t = tokenOf(h);
    expect(addressOf('plot', h)).toBe(`plot:${t}`);
    expect(addressOf('way', h, { layer: 'ground', part: 4 })).toBe(`way:${t}`);
    expect(addressOf('tunnel', h, { layer: 'underground', part: 0 })).toBe(`under/tunnel:${t}`);
    expect(addressOf('chamber', h, { layer: 'underground', part: 3 })).toBe(`under3/chamber:${t}`);
    expect(addressOf('plot', h, { layer: 'sky', part: 2 })).toBe(`sky2/plot:${t}`);
    expect(arenaPrefix({ layer: 'sky', part: 0 })).toBe('sky0/');
  });

  it('round-trips the prefix for under/, under<n>/, sky<n>/ and the bare ground', () => {
    const arena = fc.record({ layer: fc.constantFrom<Layer>('ground', 'underground', 'sky'), part: u32 });
    const kind = fc.stringMatching(/^[a-z][A-Za-z0-9.]{0,11}$/);
    fc.assert(
      fc.property(arena, kind, u32, u32, (a: PlatKey, k, lo, hi) => {
        const p = parseAddress(addressOf(k, [lo, hi], a));
        expect(p.kind).toBe(k);
        expect(p.layer).toBe(a.layer);
        expect(p.part).toBe(a.layer === 'ground' ? null : a.part);
      }),
    );
    expect(parseAddress('under/tunnel:abc')).toEqual({ kind: 'tunnel', layer: 'underground', part: 0 });
    expect(parseAddress('under3/gallery:abc')).toEqual({ kind: 'gallery', layer: 'underground', part: 3 });
    expect(parseAddress('sky2/plot:abc~1')).toEqual({ kind: 'plot', layer: 'sky', part: 2 });
    expect(parseAddress('plot:abc')).toEqual({ kind: 'plot', layer: 'ground', part: null });
  });

  it('refuses what is not an address', () => {
    for (const bad of ['plot', ':abc', 'plot:', 'under0/plot:abc', 'sky/plot:abc', 'sky02/plot:abc', 'air1/plot:abc', 'plot:a/b', 'plot:a:b', 'under/plot:a b', '1plot:abc', 'sky4294967296/plot:abc']) {
      expect(() => parseAddress(bad), bad).toThrow(RangeError);
    }
    expect(() => addressOf('pl:ot', [0, 0])).toThrow(RangeError);
    expect(() => addressOf('', [0, 0])).toThrow(RangeError);
    expect(() => addressOf('plot', [0, 0], { layer: 'air' as Layer, part: 0 })).toThrow(RangeError);
    expect(() => addressOf('plot', [0, 0], { layer: 'sky', part: -1 })).toThrow(RangeError);
  });
});

describe('the address is opaque (§6.3, J-DET-1): the parent is a field, never parsed from the id', () => {
  it('reads kind and prefix only — a mutated token resolves its parent by the field, unchanged', () => {
    const sk = seedKey(11);
    const root = mintTownRoot(sk);
    const block: BatchRecord = { kind: 'block', key: { arena: { layer: 'ground', part: 0 }, unit: root.identity.lineage, stage: STAGES.S8, epoch: 0, index: 0, reroll: 0 }, parent: root.identity.id };
    const [b] = mint([block], [], [], sk);
    const plots: BatchRecord[] = [0, 1, 2].map((i) => ({
      kind: 'plot',
      key: { arena: { layer: 'sky', part: 2 }, unit: b.identity.lineage, stage: STAGES.S10, epoch: 0, index: i, reroll: 0 },
      parent: b.identity.id,
    }));
    const minted = mint(plots, [{ id: b.identity.id, lineage: b.identity.lineage }], [], sk);
    // The document's records by address; the parent is resolved by the `parent` field only.
    const records = new Map<string, Identity>([[b.identity.id, b.identity], ...minted.map((m) => [m.identity.id, m.identity] as [string, Identity])]);
    const parentOf = (id: string): string | undefined => records.get(id)?.parent;
    for (const m of minted) {
      const id = m.identity.id;
      const parsed = parseAddress(id);
      expect(Object.keys(parsed).sort()).toEqual(['kind', 'layer', 'part']);
      expect(parsed).not.toHaveProperty('parent');
      // Mutate the token: replace it with the parent's own token, then with a random one. The parse is unmoved and
      // names no parent; the record found under the mutated id (re-keyed) still resolves its parent by the field.
      const colon = id.indexOf(':');
      for (const token of [b.identity.id.slice(b.identity.id.indexOf(':') + 1), tokenOf([0x1234, 0x5678]), 'zzzzzzzzzzzzz']) {
        const mutated = id.slice(0, colon + 1) + token;
        expect(parseAddress(mutated)).toEqual(parsed);
        const moved = new Map(records);
        moved.delete(id);
        moved.set(mutated, { ...m.identity, id: mutated });
        expect(moved.get(mutated)?.parent).toBe(b.identity.id);
        expect(parentOf(id)).toBe(b.identity.id);
      }
    }
    // Two children of one parent share no token text with it: nothing of the parent is in the id.
    for (const m of minted) expect(m.identity.id.includes(b.identity.id.slice(b.identity.id.indexOf(':') + 1))).toBe(false);
  });
});
