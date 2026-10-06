// Negative controls for every judge the B-FUZZ runner states (M0-k-04 fix round 1; §13.1 *Properties (checked after
// every operation)*; C-0238): for each property a primitive checks, a fault the property exists to catch is planted
// into a run of the real runner — a write behind a writer's commit, a writer's result replaced, a service's ok value
// replaced, a sampled harness's report replaced — and the run must count every reached input invalid, for that
// property's reason. Each judge also has its clean run elsewhere (primitives.test.ts: 0 invalid on every primitive).
// The splitFace tiling reading (C-0238 (1)) is tested directly on an arena: the children against the parent's rings.
import { beforeAll, describe, expect, it } from 'vitest';
import { faceRings, faceWalk, isVertexLive, outgoing, pointLocate, type FaceId, type KernelResult, type LatticePoint, type Plat } from '@plat/kernel';
import { childrenTileParent, fuzzTouchMergedRelaxed, loadOracles, runFuzz, runnerFramedAround, runnerKernelOn, runnerSpec, type FuzzPlant, type FuzzReport } from '@plat/testkit';
import { lp } from './support.js';

beforeAll(async () => {
  await loadOracles();
});

type Rings = LatticePoint[][];

/** A line of the whole-arena sweep (`checkCI`'s hard rows, by name) among the reason's lines (never `after merge: …`). */
const SWEEP = /(^|; )[a-z][a-z-]*: /;

/**
 * Every failing input of a run is invalid for the reason `why`, and the run had inputs to judge. With `crashes`, an
 * arena the plant corrupted may also make a later operation throw (a crash — counted, never a pass).
 */
function allInvalidFor(r: FuzzReport, why: RegExp, judged: number, least = 4, crashes = false): void {
  expect(judged, `${r.primitive}: inputs judged`).toBeGreaterThanOrEqual(least);
  if (crashes) {
    expect(r.invalid + r.crashes, `${r.primitive}: invalid + crashes`).toBe(judged);
    expect(r.invalid, `${r.primitive}: invalid`).toBeGreaterThanOrEqual(least);
    expect(r.hangs).toBe(0);
    const off = r.failures.filter((f) => f.kind === 'invalid' && !why.test(f.reason));
    expect(off.slice(0, 2), `${r.primitive}: failures for another reason`).toEqual([]);
    return;
  }
  expect(r.invalid, `${r.primitive}: invalid`).toBe(judged);
  expect(r.crashes + r.hangs).toBe(0);
  const off = r.failures.filter((f) => f.kind !== 'invalid' || !why.test(f.reason));
  expect(off.slice(0, 2), `${r.primitive}: failures for another reason`).toEqual([]);
}

/** A vertex the operation made (level ≥ 1) jumps 5 m beyond the frame's west side: its edges cross the frame's rings. */
function pullOut(p: Plat): boolean {
  let west = Infinity;
  for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v) && p.vertices.level[v] === 0) west = Math.min(west, p.vertices.x[v]);
  for (let v = p.slots.vertex.top - 1; v >= 0; v--) {
    if (!isVertexLive(p, v) || p.vertices.level[v] === 0) continue;
    if (!outgoing(p, v).some((h) => p.vertices.x[p.halfEdges.origin[h ^ 1]] > west)) continue;
    p.vertices.x[v] = west - 500;
    return true;
  }
  return false;
}

/**
 * A child shrunk behind the split: the lowest vertex (by y, then x) of the children's joint boundary — the lowest point
 * of the parent, one of its ring's vertices — moved 1 cm up. The children come from the split's own result.
 */
function shrinkPlant(): FuzzPlant {
  let children: [FaceId, FaceId] | null = null;
  return {
    tx: (op, commit) => {
      const r = commit();
      if (op === 'splitFace' && r.ok) children = (r.value as { value: [FaceId, FaceId] }).value;
      return r;
    },
    afterCommit: (op, p) => {
      if (op !== 'splitFace' || children === null) return;
      const all = new Set<number>([...faceWalk(p, 1, children[0]).flat(), ...faceWalk(p, 1, children[1]).flat()]);
      let best = -1;
      for (const h of all) {
        if (all.has(h ^ 1)) continue;
        const v = p.halfEdges.origin[h];
        if (best < 0 || p.vertices.y[v] < p.vertices.y[best] || (p.vertices.y[v] === p.vertices.y[best] && p.vertices.x[v] < p.vertices.x[best])) best = v;
      }
      if (best >= 0) p.vertices.y[best] += 1;
      children = null;
    },
  };
}

/** A pin flag set on an L0 vertex behind the batch's back: the arena's print changes, no row reads it. */
function pinFrameVertex(p: Plat): void {
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (isVertexLive(p, v) && p.vertices.level[v] === 0) {
      p.vertices.flags[v] |= 1;
      return;
    }
  }
}

const shift = (rings: Rings, dx: number): Rings => rings.map((r) => r.map((q) => lp(q.x + dx, q.y)));
const N = 25;

describe('splitFace: the children tile the PARENT (C-0238 (1); §13.1 integer area2 equality)', () => {
  /** A framed arena with an L1 square face and a second, unrelated square; the square's face split by a straight cut. */
  function splitSquare(cut: LatticePoint[]) {
    const face = [lp(0, 0), lp(4000, 0), lp(4000, 4000), lp(0, 4000)];
    const other = [lp(6000, 0), lp(8000, 0), lp(8000, 2000), lp(6000, 2000)];
    const p = runnerFramedAround([...face, ...other]) as Plat;
    const k = runnerKernelOn([p]);
    for (const [ring, e] of [[face, 'way:face'], [other, 'way:other']] as const) expect(k.tx(runnerSpec(1), (o) => k.geom.insertChain(o, ring, [{ role: 'way', entity: e }], 'mandatory', { closed: true })).ok).toBe(true);
    const at = (q: LatticePoint) => {
      const l = pointLocate(p, p.key, 1, q);
      if (l.on !== 'face') throw new Error('no face');
      return l.face;
    };
    const f = at(lp(1000, 1000));
    const g = at(lp(7000, 1000));
    const parent = faceRings(p, 1, f);
    const r = k.tx(runnerSpec(1), (o) => k.geom.splitFace(o, f, cut, { rows: [{ role: 'plot_line', entity: 'plot_line:cut' }] }));
    if (!r.ok) throw new Error(`the split refused ${r.code} ${r.detail}`);
    const [c1, c2] = r.value.value as [FaceId, FaceId];
    return { p, parent, c1, c2, g };
  }

  it('a split square: its children tile it exactly; a child and an unrelated face do not; the parent with itself does not', () => {
    const { p, parent, c1, c2, g } = splitSquare([lp(1500, 0), lp(2500, 4000)]);
    expect(childrenTileParent(parent, p, 1, c1, c2)).toBeNull();
    expect(childrenTileParent(parent, p, 1, c2, c1)).toBeNull();
    expect(childrenTileParent(parent, p, 1, c1, g)).toMatch(/not on the children's joint boundary|area2/);
    expect(childrenTileParent(parent, p, 1, c2, g)).toMatch(/not on the children's joint boundary|area2/);
    // a parent taken from elsewhere (the unrelated face's rings) is not tiled by these children
    expect(childrenTileParent(faceRings(p, 1, g), p, 1, c1, c2)).not.toBeNull();
  });

  it('a child shrunk behind the transaction (a parent corner moved 1 cm, then 300 cm) is caught', () => {
    for (const dy of [1, 300]) {
      const { p, parent, c1, c2 } = splitSquare([lp(1500, 0), lp(2500, 4000)]);
      for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v) && p.vertices.x[v] === 4000 && p.vertices.y[v] === 0) p.vertices.y[v] += dy;
      expect(childrenTileParent(parent, p, 1, c1, c2), `dy ${String(dy)}`).toMatch(/parent vertex \(4000, 0\) is not on the children's joint boundary/);
    }
  });

  it('a cut landing on a slanted edge off the lattice: tiled within the landing bound, every parent vertex kept', () => {
    // The slanted side (4000, 0)–(3001, 3999) is crossed at a point no lattice point lies on; the landing bends it.
    const face = [lp(0, 0), lp(4000, 0), lp(3001, 3999), lp(0, 4000)];
    const p = runnerFramedAround(face) as Plat;
    const k = runnerKernelOn([p]);
    expect(k.tx(runnerSpec(1), (o) => k.geom.insertChain(o, face, [{ role: 'way', entity: 'way:face' }], 'mandatory', { closed: true })).ok).toBe(true);
    const l = pointLocate(p, p.key, 1, lp(1000, 1000));
    if (l.on !== 'face') throw new Error('no face');
    const parent = faceRings(p, 1, l.face);
    const r = k.tx(runnerSpec(1), (o) => k.geom.splitFace(o, l.face, [lp(0, 1777), lp(3556, 1777)], { rows: [{ role: 'plot_line', entity: 'plot_line:cut' }] }));
    if (!r.ok) throw new Error(`the split refused ${r.code} ${r.detail}`);
    const [c1, c2] = r.value.value as [FaceId, FaceId];
    expect(childrenTileParent(parent, p, 1, c1, c2)).toBeNull();
  });

  it('the fuzz primitive: a child shrunk behind the split is invalid on every split, for the tiling', () => {
    const r = runFuzz('splitFace', 40, { plant: shrinkPlant() });
    allInvalidFor(r, /^splitFace children do not tile the parent: a parent vertex \(-?\d+, -?\d+\) is not on the children's joint boundary/, r.ok, 4, true);
  }, 120_000);
});

describe('mergeFaces ∘ splitFace restores the id and the arena (§13.1; C-0238 (2))', () => {
  it('a merge result naming another face is caught', () => {
    const tx: FuzzPlant['tx'] = (op, commit) => {
      const r = commit();
      if (op !== 'mergeFaces' || !r.ok) return r;
      const c = r.value as { value: number };
      return { ...r, value: { ...c, value: c.value + 1000 } } as KernelResult<unknown>;
    };
    const r = runFuzz('splitFace', N, { plant: { tx } });
    allInvalidFor(r, /mergeFaces ∘ splitFace gave face \d+, not \d+/, r.ok);
  }, 120_000);

  it('a merge that writes nothing (the split arena left standing) is caught — the split arena is no restored arena', () => {
    const tx: FuzzPlant['tx'] = (op, commit) => (op === 'mergeFaces' ? ({ ok: true, value: { value: -1 }, warnings: [] } as KernelResult<unknown>) : commit());
    const r = runFuzz('splitFace', N, { plant: { tx } });
    allInvalidFor(r, /mergeFaces ∘ splitFace did not restore the arena/, r.ok);
  }, 120_000);

  it('a write left behind the merge is caught as "did not restore the arena"', () => {
    const r = runFuzz('splitFace', N, { plant: { afterMerge: pinFrameVertex } });
    allInvalidFor(r, /mergeFaces ∘ splitFace did not restore the arena/, r.ok);
  }, 120_000);
});

describe('the whole-arena sweep after every writer (§13.1 "checked after every operation")', () => {
  it.each(['warp', 'corridorUnion'])('%s: a write behind the commit (an edge pulled across the frame) is caught by the sweep', (name) => {
    let pulled = 0;
    const r = runFuzz(name, N, { plant: { afterCommit: (op, p) => (op === name && pullOut(p) ? pulled++ : undefined) } });
    expect(pulled).toBe(r.ok);
    allInvalidFor(r, SWEEP, pulled);
  }, 300_000);

  it('splitFace: a write behind the commit is caught by the sweep first (a later merge on that arena may throw: a crash, never a pass)', () => {
    let pulled = 0;
    const r = runFuzz('splitFace', N, { plant: { afterCommit: (op, p) => (op === 'splitFace' && pullOut(p) ? pulled++ : undefined) } });
    allInvalidFor(r, SWEEP, pulled, 3, true);
  }, 120_000);
});

describe("a writer's typed result: a refusal must keep the arena, a mandatory chain is never refused for precision", () => {
  it('insertChain: a mandatory chain refused E_BELOW_MIN_EDGE (planted, nothing committed) is invalid; an optional one is not', () => {
    const r = runFuzz('insertChain', 60, { plant: { tx: (op, commit) => (op === 'insertChain' ? { ok: false, code: 'E_BELOW_MIN_EDGE', detail: 'planted' } as never : commit()) } });
    const refused = r.refused.E_BELOW_MIN_EDGE ?? 0;
    expect(r.invalid).toBeGreaterThan(5);
    expect(r.invalid).toBeLessThan(refused); // the optional chains' refusals are valid
    expect(r.failures.every((f) => /a mandatory chain rejected for precision: E_BELOW_MIN_EDGE planted/.test(f.reason))).toBe(true);
  }, 120_000);

  it.each([
    ['insertChain', /^the refused batch changed the arena$/],
    ['splitFace', /^the refused split changed the arena$/],
    ['corridorUnion', /^the refused corridorUnion changed the arena$/],
  ] as const)('%s: a refusal returned after the batch committed (a refused batch that writes) is caught', (name, why) => {
    const r = runFuzz(name, N, { plant: { tx: (op, commit) => {
      const c = commit();
      return op === name && c.ok ? ({ ok: false, code: 'E_DEGENERATE', detail: 'planted after a commit' } as never) : c;
    } } });
    const clean = runFuzz(name, N);
    // every input whose commit wrote is now a refusal that wrote (a commit that wrote nothing changed nothing)
    expect(r.invalid).toBeLessThanOrEqual(clean.ok);
    allInvalidFor(r, why, r.invalid);
  }, 300_000);
});

describe('the sampled determinism harnesses (M0-d-08, one input in 97)', () => {
  it.each(['renumbering', 'permutation'] as const)('a %s divergence is caught on every sampled input', (harness) => {
    const r = runFuzz('insertChain', 2 * 97 + 1, { plant: { sampled: (h, rep) => (h === harness ? { identical: false, divergence: 'planted' } : rep) } });
    expect(r.sampled.renumbering).toBeGreaterThanOrEqual(2);
    allInvalidFor(r, harness === 'renumbering' ? /^renumbering: "planted"$/ : /^op permutation: "planted"$/, r.sampled.renumbering, 2);
  }, 300_000);
});

describe("the services' judges catch a planted wrong value", () => {
  const cases: [string, string, (v: unknown) => unknown, RegExp][] = [
    ['offsetFace', 'offsetFace', (v) => shift(v as Rings, 1_000_000), /offset\(−d\): a vertex .* lies outside the face/],
    ['kerb', 'kerb', (v) => shift(v as Rings, 1_000_000), /the kerb: a vertex .* lies outside the face/],
    ['insetRing', 'insetRing@d2', () => [[lp(-2_000_000, -2_000_000), lp(2_000_000, -2_000_000), lp(2_000_000, 2_000_000), lp(-2_000_000, 2_000_000)]], /does not empty monotonically|collapsed but insetRing/],
    ['query', 'query', (v) => {
      const q = v as { vertices: number[]; edges: number[]; faces: number[] };
      return { ...q, vertices: [...q.vertices, 999_999] };
    }, /a query's answer changed across a rebuild/],
    ['encodeArena', 'encodeArena', (v) => {
      const chunks = v as { ref: unknown; bytes: Uint8Array }[];
      const last = chunks.length - 1;
      const bytes = chunks[last].bytes.slice();
      bytes[bytes.length >> 1] ^= 0x41;
      return [...chunks.slice(0, last), { ...chunks[last], bytes }];
    }, /save → load → save is not byte-identical/],
    ['tileRings', 'tileRings', (v) => (v as Rings[]).map((pieces, i) => (i === 0 ? shift(pieces, 1_000_000) : pieces)), /ring 0: (clipper2|polygon-clipping): /],
  ];
  it.each(cases)('%s (%s planted)', (prim, name, wrong, why) => {
    const clean = runFuzz(prim, N);
    expect([prim, clean.invalid]).toEqual([prim, 0]);
    const r = runFuzz(prim, N, { plant: { result: (n, v) => (n === name ? wrong(v) : v) } });
    expect(r.invalid, prim).toBeGreaterThan(3);
    expect(r.failures.filter((f) => !why.test(f.reason)).slice(0, 2), prim).toEqual([]);
    // where every ok value has a vertex to move, every ok input is caught (an empty kerb or tileRings piece set moves nowhere)
    if (['offsetFace', 'query', 'encodeArena'].includes(prim)) expect(r.invalid, prim).toBe(clean.ok);
    else expect(r.invalid, prim).toBeLessThanOrEqual(clean.ok);
  }, 300_000);
});

describe("the oracle comparison's touch-merged relaxation (C-0206 (8); C-0227 (2)) is bounded", () => {
  const T = (x: number) => [lp(x, 0), lp(x + 100, 0), lp(x + 50, 80)];
  const verdict = (failures: string[], split: 'unattracted' | 'attracted' = 'unattracted') =>
    ({ split, pass: false, refused: false, engine: 'clipper2', faces: { ours: 2, oracle: 1 }, symDiffCm2: 0, crossCheckCm2: 0, crossChecked: true, perimeterCm: 0, boundCm2: 0, failures }) as never;
  it('a faces-only failure passes only when the touch-merged counts agree', () => {
    // ours: two triangles touching at (100, 0); the oracle: one region — equal once touching faces count as one
    expect((fuzzTouchMergedRelaxed(verdict(['faces']), [T(0), T(100)], [T(0)]) as { pass: boolean }).pass).toBe(true);
    // ours: two separate triangles; the oracle: one — unequal touch-merged counts: still failing
    const v = fuzzTouchMergedRelaxed(verdict(['faces']), [T(0), T(300)], [T(0)]) as { pass: boolean; failures: string[] };
    expect([v.pass, v.failures]).toEqual([false, ['faces']]);
  });
  it('another failure beside faces, an attracted split, or no oracle rings: never relaxed', () => {
    expect((fuzzTouchMergedRelaxed(verdict(['faces', 'area']), [T(0), T(100)], [T(0)]) as { pass: boolean }).pass).toBe(false);
    expect((fuzzTouchMergedRelaxed(verdict(['faces'], 'attracted'), [T(0), T(100)], [T(0)]) as { pass: boolean }).pass).toBe(false);
    expect((fuzzTouchMergedRelaxed(verdict(['faces']), [T(0)], null) as { pass: boolean }).pass).toBe(false);
  });
});
