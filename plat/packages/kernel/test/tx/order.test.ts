// M0-a-06: op-order determinism of the declared form (§3.3 *Two op forms*; §13.1: "a declared batch's result identical
// under any permutation of its ops — attraction included"; "a permuted preparation batch placing two contact names on
// one entity — identical ordinals (the allocation rule)"). This item's own harness over its fixtures — the exit bar's
// first half; the callback form's issue-order and slot-renumbering identities are M0-d-08's (wave 9) over the fixtures in
// fixtures/. A control shows attraction is order-sensitive, so the permutation test can see an order leak.
import { describe, expect, it } from 'vitest';
import { insertChain, splitThrough } from '../../src/insert/index.js';
import { canonicalOrder, opInsertChain, opSplitThrough, tx, type KernelOp } from '../../src/tx/index.js';
import type { Plat } from '../../src/arena/index.js';
import { between, contentPrint, declared, edgeRows, framed, healthy, lin, must, pointOfKey, pt, spec } from './support.js';

/** A seeded generator (mulberry32) for the fixtures and the permutations. */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(xs: readonly T[], r: () => number): T[] {
  const a = xs.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * A fixture of `n` L1 chains inside the 4000 cm frame whose ends crowd each other: every chain starts 5 – 25 cm from an
 * earlier chain's end (attraction's reach is 26 cm), so which lands first decides where the other goes.
 */
function crowded(seed: number, n: number): { a: [number, number]; b: [number, number] }[] {
  const r = rng(seed);
  const out: { a: [number, number]; b: [number, number] }[] = [];
  const at = (): number => 300 + Math.floor(r() * 3400);
  for (let i = 0; i < n; i++) {
    let a: [number, number];
    if (i > 0 && r() < 0.8) {
      const prev = out[Math.floor(r() * out.length)].b;
      const ang = r() * 6.283;
      const d = 5 + r() * 20;
      a = [Math.round(prev[0] + d * Math.cos(ang)), Math.round(prev[1] + d * Math.sin(ang))];
    } else {
      a = [at(), at()];
    }
    const b: [number, number] = [at(), at()];
    out.push({ a, b });
  }
  return out;
}

function opsOf(fx: { a: [number, number]; b: [number, number] }[]): KernelOp[] {
  return fx.map((c, i) => opInsertChain(lin(0x9e3779b1 * (i + 1), i), 0, [pt(c.a[0], c.a[1]), pt(c.b[0], c.b[1])], [{ role: 'way', entity: `way:${i}` }], 'mandatory'));
}

/** A batch's committed state and record (the record's slots read as lattice positions), or its refusal. */
function outcome(p: Plat, r: ReturnType<typeof declared>): string {
  if (!r.ok) return `refused ${r.code}`;
  const rec = r.value.record;
  if (rec === null) return 'nothing';
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const vs = (l: readonly number[]): string => l.map((v) => `${X[v]},${Y[v]}`).join(' ');
  return [contentPrint(p), `work ${rec.work} +${rec.edgesAdded} -${rec.edgesRemoved} s+${rec.steinerAdded} s-${rec.steinerDissolved}`,
    `promoted ${vs(rec.promoted)}`, `owners ${rec.owners.join(' ')}`, `roles ${rec.roles.map((k) => `${k.role}/${k.entity}/${k.ordinal}`).join(' ')}`,
    `faces ${rec.faces.map((d) => `${d.level}:${d.created.length}/${d.changed.length}/${d.removed.length}`).join(' ')}`,
    `warnings ${rec.warnings.map((w) => `${w.code}×${w.count}`).join(' ')}`].join('\n');
}

describe('§13.1: a declared batch\'s result identical under any permutation of its ops (attraction included)', () => {
  it('the control: the two crowded ends\' order decides where the second lands (callback form, issue order)', () => {
    const ends = (first: 'a' | 'b'): string => {
      const p = framed();
      tx(p, spec(1), (o) => {
        const A = (): void => void must(insertChain(o, [pt(1000, 1000), pt(2000, 1000)], [{ role: 'way', entity: 'way:a' }], 'mandatory'));
        const B = (): void => void must(insertChain(o, [pt(2000, 1020), pt(3000, 1020)], [{ role: 'way', entity: 'way:b' }], 'mandatory'));
        if (first === 'a') {
          A();
          B();
        } else {
          B();
          A();
        }
        return { ok: true as const, value: null, warnings: [] };
      });
      return contentPrint(p);
    };
    expect(ends('a')).not.toBe(ends('b'));
  });

  it('the two crowded ends as a declared batch, in both issue orders: one result', () => {
    const A = opInsertChain(lin(1), 0, [pt(1000, 1000), pt(2000, 1000)], [{ role: 'way', entity: 'way:a' }], 'mandatory');
    const B = opInsertChain(lin(2), 0, [pt(2000, 1020), pt(3000, 1020)], [{ role: 'way', entity: 'way:b' }], 'mandatory');
    const p1 = framed();
    const p2 = framed();
    const r1 = declared(p1, 1, [A, B]);
    const r2 = declared(p2, 1, [B, A]);
    expect(outcome(p1, r1)).toBe(outcome(p2, r2));
    healthy(p1);
  });

  for (const seed of [1, 2, 3, 4, 5, 6]) {
    it(`crowded fixture ${seed}: 12 chains, 6 permutations — one committed arena, one record`, () => {
      const fx = crowded(seed, 12);
      const ops = opsOf(fx);
      const r = rng(1000 + seed);
      const p0 = framed();
      const want = outcome(p0, declared(p0, 1, ops));
      for (let k = 0; k < 6; k++) {
        const p = framed();
        expect(outcome(p, declared(p, 1, shuffle(ops, r)))).toBe(want);
      }
      expect(want.startsWith('refused')).toBe(false);
      expect(want).toContain('W_ATTRACTED'); // the crowded ends did attract
      healthy(p0);
    }, 60_000);
  }

  it('the canonical key: op-kind rank (§3.4\'s order), then the lineage key (high word first), then the index', () => {
    const f = (): { ok: true; value: null; warnings: [] } => ({ ok: true, value: null, warnings: [] });
    const ops: KernelOp[] = [
      { kind: 'setOwner', lineage: [0, 0], index: 0, apply: f },
      { kind: 'insertChain', lineage: [5, 1], index: 0, apply: f },
      { kind: 'insertChain', lineage: [9, 0], index: 3, apply: f },
      { kind: 'insertChain', lineage: [9, 0], index: 1, apply: f },
      { kind: 'removeEdges', lineage: [0, 0], index: 0, apply: f },
    ];
    expect(canonicalOrder(ops)).toEqual([3, 2, 1, 4, 0]);
    expect(() => canonicalOrder([ops[1], { ...ops[1] }])).toThrow(/share one sort key/);
  });
});

describe('§13.1: a permuted preparation batch placing two contact names on one entity — identical ordinals', () => {
  /** A frame with an L1 district boundary across it, and the two batches' ops: an anchor on each of its two edges. */
  function prepared(): { p: Plat; ops: KernelOp[] } {
    const p = framed();
    tx(p, spec(1), (o) => insertChain(o, [pt(0, 2000), pt(2000, 2100), pt(4000, 2000)], [{ role: 'district_bound', entity: 'district:1' }], 'mandatory'));
    const e1 = between(p, [0, 2000], [2000, 2100]);
    const e2 = between(p, [2000, 2100], [4000, 2000]);
    return {
      p,
      ops: [
        opSplitThrough(lin(7), 0, e1, pt(1000, 2050), { role: 'anchor', entity: 'district:1' }),
        opSplitThrough(lin(7), 1, e2, pt(3000, 2050), { role: 'anchor', entity: 'district:1' }),
      ],
    };
  }

  it('in both issue orders the contact names take ordinals by the canonical op order: identical', () => {
    const a = prepared();
    const b = prepared();
    expect(declared(a.p, 1, a.ops).ok).toBe(true);
    expect(declared(b.p, 1, [b.ops[1], b.ops[0]]).ok).toBe(true);
    expect(pointOfKey(a.p, 'anchor', 'district:1', 0)).toBe('1000,2050');
    expect(pointOfKey(a.p, 'anchor', 'district:1', 1)).toBe('3000,2050');
    expect(contentPrint(b.p)).toBe(contentPrint(a.p));
    healthy(a.p);
  });

  it('two contact names on ONE edge (§3.3 rule 2\'s two bank points), both index orders × both issue orders: each at its own point', () => {
    // Both ops name the one edge (0,2000)–(4000,2000) as the batch found it; the first applied splits it, and the second
    // still lands at its own point on the part that now holds it (C-0189), never attracted onto the first's vertex.
    const one = (): { p: Plat; e: number } => {
      const p = framed();
      tx(p, spec(1), (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'district_bound', entity: 'district:1' }], 'mandatory'));
      return { p, e: between(p, [0, 2000], [4000, 2000]) };
    };
    const results: string[] = [];
    for (const lowFirst of [true, false]) {
      // lowFirst: the op at x = 1000 has index 0 (its contact name takes ordinal 0); otherwise the op at x = 3000 does.
      const prints: string[] = [];
      for (const issueSwapped of [false, true]) {
        const { p, e } = one();
        const at1000 = opSplitThrough(lin(7), lowFirst ? 0 : 1, e, pt(1000, 2000), { role: 'anchor', entity: 'district:1' });
        const at3000 = opSplitThrough(lin(7), lowFirst ? 1 : 0, e, pt(3000, 2000), { role: 'anchor', entity: 'district:1' });
        const r = declared(p, 1, issueSwapped ? [at3000, at1000] : [at1000, at3000]);
        expect(r.ok).toBe(true);
        expect(r.ok ? r.value.record?.warnings.map((w) => w.code) : null).toEqual([]);
        expect(pointOfKey(p, 'anchor', 'district:1', 0)).toBe(lowFirst ? '1000,2000' : '3000,2000');
        expect(pointOfKey(p, 'anchor', 'district:1', 1)).toBe(lowFirst ? '3000,2000' : '1000,2000');
        expect(edgeRows(p, [1000, 2000], [3000, 2000])).toEqual(['district_bound/district:1']);
        healthy(p);
        prints.push(contentPrint(p));
      }
      expect(prints[1]).toBe(prints[0]);
      results.push(prints[0]);
    }
    // The two index orders differ only in which point carries which ordinal.
    expect(results[0]).not.toBe(results[1]);
  });

  it('three contact names on one edge, every issue order: one arena, ordinals by index', () => {
    const xs = [3000, 1000, 2000];
    const want = new Map<string, string>();
    const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
    let first = '';
    for (const perm of perms) {
      const p = framed();
      tx(p, spec(1), (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'district_bound', entity: 'district:1' }], 'mandatory'));
      const e = between(p, [0, 2000], [4000, 2000]);
      const ops = xs.map((x, i) => opSplitThrough(lin(7), i, e, pt(x, 2000), { role: 'anchor', entity: 'district:1' }));
      expect(declared(p, 1, perm.map((k) => ops[k])).ok).toBe(true);
      xs.forEach((x, i) => want.set(String(i), `${x},2000`));
      for (const [k, v] of want) expect(pointOfKey(p, 'anchor', 'district:1', Number(k))).toBe(v);
      if (first === '') first = contentPrint(p);
      else expect(contentPrint(p)).toBe(first);
    }
  });

  it('the control: issued one by one in the other order, the ordinals swap', () => {
    const c = prepared();
    const e1 = between(c.p, [0, 2000], [2000, 2100]);
    const e2 = between(c.p, [2000, 2100], [4000, 2000]);
    tx(c.p, spec(1), (o) => {
      must(splitThrough(o, e2, pt(3000, 2050), { role: 'anchor', entity: 'district:1' }));
      return splitThrough(o, e1, pt(1000, 2050), { role: 'anchor', entity: 'district:1' });
    });
    expect(pointOfKey(c.p, 'anchor', 'district:1', 0)).toBe('3000,2050');
  });
});
