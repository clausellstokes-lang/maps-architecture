// M0-k-02's listed test "every M0-tagged case states its expected outcome (§3.11's row / §13.1's bullet) as data and
// its generator yields only coordinates snap accepts (10³ draws per case)": the expected outcome's shape per case, then
// 10³ draws of every M0 case — an input of its own id and seed, every coordinate one `snap` accepts unchanged, every
// geometry a step names present, the generator's own witness of its degeneracy holding, the same draw for the same seed.
import { describe, expect, it } from 'vitest';
import {
  CONSTRUCTIVE_CLASSES,
  CONSTRUCTIVE_MILESTONES,
  CONSTRUCTIVE_PROPERTY_KEYS,
  CONSTRUCTIVE_SET,
  casesAt,
  constructiveCoords,
  type ConstructiveCase,
  type ConstructiveInput,
} from '@plat/testkit';
import type { Cm } from '@plat/kernel';
import { DRAWS, firstRefused, unknownNames } from './support.js';

const PREFIX: Readonly<Record<string, string>> = {
  geometry: 'geom',
  quantisation: 'quant',
  'attraction-moves': 'move',
  'kept-carves-water': 'kept',
  'removals-profiles-neighbours': 'remove|neighbour',
  'stretch-state-writes': 'stretch',
  'indexes-slots-pool': 'index',
  'skeleton-fixtures': 'skel',
  'kernel-limits': 'limit',
  expectations: 'expect',
  'further-limits': 'further',
  'fixtures-items-12-28': 'fix',
  'fixtures-items-45-53-65': 'fix',
};

const M0 = casesAt('M0');

/** The draw as plain data (frozen records and all), for the determinism comparison. */
const plain = (v: ConstructiveInput) => JSON.parse(JSON.stringify(v, (_k, x: unknown) => (typeof x === 'number' && !Number.isFinite(x) ? String(x) : x))) as unknown;

describe('every case states its expected outcome as data', () => {
  it('carries a unique id of its class’s prefix, a known class and milestone, its source and its ops', () => {
    const ids = CONSTRUCTIVE_SET.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const c of CONSTRUCTIVE_SET) {
      expect(CONSTRUCTIVE_CLASSES, c.id).toContain(c.class);
      expect(CONSTRUCTIVE_MILESTONES, c.id).toContain(c.milestone);
      expect(c.id, c.id).toMatch(new RegExp(`^(${PREFIX[c.class]})/[a-z0-9-]+$`));
      expect(c.source, c.id).toMatch(/^§(13\.1|3\.11|3\.3) /);
      expect(Array.isArray(c.ops), c.id).toBe(true);
      expect(Object.isFrozen(c) && Object.isFrozen(c.expect), c.id).toBe(true);
    }
  });

  it.each(CONSTRUCTIVE_SET.map((c) => [c.id, c] as const))('%s: an outcome, its code, its tier and its properties', (_id, c: ConstructiveCase) => {
    const e = c.expect;
    expect(['ok', 'refused', 'typed', 'downgrade', 'assertion', 'static']).toContain(e.outcome);
    expect(e.clause.length).toBeGreaterThan(8);
    for (const h of e.holds) expect(CONSTRUCTIVE_PROPERTY_KEYS).toContain(h);
    expect(new Set(e.holds).size).toBe(e.holds.length);
    if (e.outcome === 'refused') expect(e.code !== undefined || e.holds.includes('corrupt-cache')).toBe(true);
    else expect(e.code).toBeUndefined();
    if (e.outcome === 'typed') expect(Array.isArray(e.codes)).toBe(true);
    else expect(e.codes).toBeUndefined();
    if (e.outcome === 'ok' || e.outcome === 'typed') expect(e.holds.length).toBeGreaterThan(0);
    if (e.outcome === 'static') {
      expect(c.class).toBe('kernel-limits');
      expect(e.holds).toEqual(['kernel-reads-no-model']);
    }
    if (e.outcome === 'downgrade') expect(e.tier).toBe(4);
    if (e.tier === 2) expect(e.outcome).toBe('ok');
    if (e.code === 'E_DEGENERATE') expect(e.detail).toMatch(/^(ratio|collinear|fit|empty|collapsed|stretch|seed|fixed|overlap)$/);
    expect(c.numericCore).toBe(c.run !== undefined);
    if (c.numericCore) expect(c.milestone).toBe('M0');
    if (c.milestone !== 'M0') expect(c.witness === undefined && c.run === undefined).toBe(true);
  });

  it('runs the numeric core on exactly the quantisation cases, the gcd-stepped collinear class and the star rings (C-0110)', () => {
    expect(CONSTRUCTIVE_SET.filter((c) => c.numericCore).map((c) => c.id).sort()).toEqual(
      ['geom/collinear-triple', 'geom/on-segment-gcd', 'geom/star-ring-max-radius', 'quant/half-ties', 'quant/range-edge', 'quant/refuse-non-finite', 'quant/refuse-out-of-range'].sort(),
    );
  });
});

describe(`every M0 case's generator, ${String(DRAWS)} draws`, () => {
  it.each(M0.map((c) => [c.id, c] as const))('%s yields lattice input snap accepts, its witness holding', (_id, c: ConstructiveCase) => {
    const sweep = c.sweep ?? DRAWS;
    for (let seed = 0; seed < DRAWS; seed += 1) {
      const g = c.generate(seed);
      expect(g.kind).toBe('input');
      if (g.kind !== 'input') return;
      expect(g.id).toBe(c.id);
      expect(g.seed).toBe(seed);
      const bad = firstRefused(g);
      if (bad !== null) expect.fail(`${c.id} seed ${String(seed)}: (${String(bad.x)}, ${String(bad.y)}) is not a coordinate snap accepts`);
      const unknown = unknownNames(g);
      if (unknown.length > 0) expect.fail(`${c.id} seed ${String(seed)}: steps name missing geometry ${unknown.join('; ')}`);
      if (c.witness !== undefined) {
        const w = c.witness(g);
        if (w !== null) expect.fail(`${c.id} seed ${String(seed)}: ${w}`);
      }
      if (seed < 20 || seed % 97 === 0) expect(plain(c.generate(seed) as ConstructiveInput)).toEqual(plain(g));
      if (c.expect.outcome !== 'static' && seed < sweep && g.steps.length === 0) expect.fail(`${c.id}: a draw with no step`);
    }
  }, 120_000);

  it('draws differently on different seeds (the seed reaches the stream)', () => {
    for (const c of M0) {
      if (c.expect.outcome === 'static' || c.id === 'limit/no-input-tilerings') continue;
      const draws = new Set<string>();
      for (let seed = 0; seed < 8; seed += 1) draws.add(JSON.stringify(plain(c.generate(seed) as ConstructiveInput)));
      expect(draws.size, c.id).toBeGreaterThan(1);
    }
  });

  it('enumerates its sweep: seeds 0 … sweep − 1 reach every centidegree, every n, every variant', () => {
    const param = (id: string, key: string, n: number) => {
      const c = M0.find((x) => x.id === id);
      if (c === undefined) throw new Error(id);
      return new Set(Array.from({ length: n }, (_, i) => String((c.generate(i) as ConstructiveInput).params[key])));
    };
    expect(param('skel/square-every-cdeg', 'cdeg', 9001).size).toBe(9001);
    expect(param('skel/rectangle-every-cdeg', 'cdeg', 9001).size).toBe(9001);
    expect([...param('skel/regular-ngon', 'n', 62)].map(Number).sort((a, b) => a - b)).toEqual(Array.from({ length: 62 }, (_, i) => i + 3));
    expect(param('skel/holed-polygons', 'index', 1000).size).toBe(1000);
    expect(param('geom/coincident-typed-chains', 'pair', 4).size).toBe(4);
    expect(param('geom/skeleton-simultaneous-events', 'variant', 4).size).toBe(4);
    expect(param('skel/equal-width-strip', 'kind', 3).size).toBe(3);
    expect(param('limit/no-input-delaunay', 'variant', 3).size).toBe(3);
    expect(param('fix/regularfit-degenerate', 'variant', 3).size).toBe(3);
    expect(param('move/warp-spine-tjunction', 'variant', 2).size).toBe(2);
    for (const c of M0) if (c.sweep !== undefined) expect(c.sweep, c.id).toBeGreaterThan(1);
  }, 120_000);

  it('has witnesses that refuse a draw which is not the degeneracy it claims (negative controls)', () => {
    const c = (id: string) => {
      const x = M0.find((k) => k.id === id);
      if (x === undefined || x.witness === undefined) throw new Error(`${id} has no witness`);
      return { w: x.witness, g: x.generate(11) as ConstructiveInput };
    };
    const refuses = (id: string, patch: (g: ConstructiveInput) => Partial<ConstructiveInput>) => {
      const { w, g } = c(id);
      expect(w(g), id).toBeNull();
      expect(w({ ...g, ...patch(g) }), id).not.toBeNull();
    };
    const nudge = <T extends { x: number; y: number }>(p: T, dx: number, dy: number): T => ({ ...p, x: p.x + dx, y: p.y + dy });
    refuses('geom/on-segment-gcd', (g) => ({ pointSets: { ...g.pointSets, on: [nudge(g.pointSets.on[0], 1, 0), ...g.pointSets.on.slice(1)] } }));
    refuses('geom/collinear-triple', (g) => ({ points: { ...g.points, c: nudge(g.points.c, 0, 1) } }));
    refuses('geom/star-ring-max-radius', (g) => ({ rings: { star: g.rings.star.map((p) => nudge(p, Math.sign(p.x) * -3, Math.sign(p.y) * -3)) } }));
    refuses('geom/cut-graze-reflex', (g) => ({ params: { ...g.params, offset: 1 } }));
    refuses('geom/cut-graze-reflex-plus1', (g) => ({ params: { ...g.params, offset: 0 } }));
    refuses('geom/coincident-typed-chains', (g) => ({ chains: { ...g.chains, B: [nudge(g.chains.B[0], 1, 1), ...g.chains.B.slice(1)] } }));
    // The crossing case (C-0187 (3)): the vertex on the edge's line, the split moved off its placement point, the
    // crossing through the vertex's foot (it would be routed through the vertex), the vertex as the edge's own end.
    refuses('move/crossing-near-vertex', (g) => ({ points: { ...g.points, vertex: g.chains.edge[0] } }));
    refuses('move/crossing-near-vertex', (g) => ({ points: { ...g.points, split: g.chains.edge[1] } }));
    refuses('move/crossing-near-vertex', (g) => ({ chains: { ...g.chains, crossing: [g.chains.crossing[0], g.points.vertex] } }));
    refuses('move/crossing-near-vertex', (g) => ({ chains: { ...g.chains, lane: [g.chains.lane[0], g.points.split] } }));
    // The kerb case (C-0187 (1)): the kerb inserted where the warp takes it (the vertex would be attracted), a drag
    // that misses (0, 0)–(1 000, 9), the plot-line end a centimetre off the kerb's placement point, the vertex moved.
    refuses('move/warp-kerb-near-vertex', (g) => ({ chains: { ...g.chains, kerb: g.chains.kerbAfter } }));
    refuses('move/warp-kerb-near-vertex', (g) => ({ params: { ...g.params, dragY: (g.params.dragY as number) + 1 } }));
    refuses('move/warp-kerb-near-vertex', (g) => ({ points: { ...g.points, end: nudge(g.points.end, 1, 1) } }));
    refuses('move/warp-kerb-near-vertex', (g) => ({ points: { ...g.points, vertex: nudge(g.points.vertex, 3, 3) } }));
    // The Steiner pair (C-0187 (2)): no drag (the projections stand as inserted), the pair inserted within attractCm.
    refuses('move/warp-steiner-pair-renumbering', (g) => ({ params: { ...g.params, dragX: 0, dragY: 0 } }));
    refuses('move/warp-steiner-pair-renumbering', (g) => ({ params: { ...g.params, dragX: 2 * (g.params.dragX as number), dragY: 2 * (g.params.dragY as number) } }));
    refuses('move/pinch-halves', (g) => ({ points: { ...g.points, target: g.points.moved } }));
    refuses('move/vertex-near-endpoint', (g) => ({ points: { ...g.points, vertex: nudge(g.points.vertex, 1, 0) } }));
    // The promotion (C-0187 (4)): the other finer vertex moved, the promoted one swapped for the route's end.
    refuses('remove/promotion-near-finer-vertex', (g) => ({ points: { ...g.points, vertex: nudge(g.points.vertex, 1, 1) } }));
    refuses('remove/promotion-near-finer-vertex', (g) => ({ chains: { ...g.chains, plotQ: [g.chains.plotQ[0], g.points.promoted] }, points: { ...g.points, vertex: g.points.promoted } }));
    // The pinched cut (C-0187 (5)): one end moved beyond minEdge of the corner, or its interior vertex out of the face.
    refuses('limit/degen-pinched-face', (g) => ({ chains: { cut: [g.chains.cut[0], g.chains.cut[1], g.rings.face[2]] } }));
    refuses('limit/degen-pinched-face', (g) => {
      const [v, m] = [g.points.vertex, g.chains.cut[1]];
      return { chains: { cut: [g.chains.cut[0], { x: (2 * v.x - m.x) as Cm, y: (2 * v.y - m.y) as Cm }, g.chains.cut[2]] } };
    });
    refuses('limit/degen-skeleton-sharp-corner', (g) => ({ rings: { outer: [g.rings.outer[0], g.rings.outer[1], nudge(g.rings.outer[1], -(g.rings.outer[1].y - g.rings.outer[0].y), g.rings.outer[1].x - g.rings.outer[0].x)] } }));
    refuses('expect/reject-min-width', (g) => ({ params: { ...g.params, minWidthCm: 1 } }));
    refuses('quant/half-ties', () => ({ params: { raw: [1.25, -7] } }));
  });

  it('refuses a seed that is not a u32, on every case', () => {
    for (const c of CONSTRUCTIVE_SET) {
      for (const bad of [-1, 0.5, 2 ** 32, Number.NaN]) expect(() => c.generate(bad), `${c.id} ${String(bad)}`).toThrow(RangeError);
    }
  });

  it('yields no coordinate on the static cases and some coordinate on every other draw', () => {
    for (const c of M0) {
      const g = c.generate(1) as ConstructiveInput;
      const n = constructiveCoords(g).length;
      if (c.expect.outcome === 'static') expect(n, c.id).toBe(0);
      // The empty inputs of §3.11's no-input row, and the refusals whose only input is the raw doubles snap is fed.
      else if (!['limit/no-input-hexlattice', 'limit/no-input-tilerings', 'limit/no-input-buffer-empty', 'quant/refuse-out-of-range', 'quant/refuse-non-finite'].includes(c.id)) expect(n, c.id).toBeGreaterThan(0);
    }
  });
});
