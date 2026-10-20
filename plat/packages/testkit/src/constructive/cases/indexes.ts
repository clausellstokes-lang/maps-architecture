// §13.1 (2) *indexes, slots and the pool* (§3.3's spatial indexes, tombstones, rebuilds and canonical keys; J-K34):
// a slot freed and reused inside a stage and across two districts, a block regrouped between districts, and the L3
// order before and after L4 is derived — M0's (M0-a-03, M0-a-06), run by M0-k-04. The pool's overlays and freeze are
// M1's, the logged `moveVertex` replay M2a's (`resolveVertexAt`, §4b) and the neighbour step's index case M5's: their
// generators are stubs (C-0038).
import { deferredCase, m0Case, makeInput, place, rect, step, type Draw } from '../draw.js';
import type { ConstructiveCase, ConstructiveInput } from '../types.js';

const SOURCE = '§13.1 indexes, slots and the pool';

function buildSlotReuseStage(d: Draw): ConstructiveInput {
  const L = d.log(500, 1 << 16);
  // The case promises the query returns the new item and never the freed one: its last query over boxOld (local
  // x ∈ [−50, L + 50]) must be able to return 'none', so `fresh` (from x = gap) is drawn clear of it by ≥ 50 cm —
  // gap ≥ L + 100 (N-49: seed 2 drew gap 7 624 < L + 50 and put fresh's first vertex inside boxOld). The upper bound
  // stays 2¹⁸, so the construction's extent is unchanged; the draw count is too (Draw.log draws twice either way).
  const gap = d.log(L + 100, 1 << 18);
  const placed = place(d, {
    chains: { old: [{ x: 0, y: 0 }, { x: L, y: 0 }], fresh: [{ x: gap, y: 0 }, { x: gap + L, y: d.int(-200, 200) }] },
    rings: { boxOld: rect(-50, -50, L + 100, 100), boxFresh: rect(gap - 50, -300, L + 100, 600) },
  });
  return makeInput('index/slot-reuse-stage', d.seed, placed, {}, [
    step('insertChain', { chain: 'old', level: 2, cls: 'mandatory', role: 'plot_line' }),
    step('rebuildPartitions', { level: 2 }),
    step('removeEdges', { chain: 'old' }),
    step('insertChain', { chain: 'fresh', level: 2, cls: 'mandatory', role: 'plot_line' }),
    step('query', { box: 'boxFresh', level: 2, expect: 'fresh' }),
    step('query', { box: 'boxOld', level: 2, expect: 'none' }),
  ]);
}

/** Two L1 district faces side by side, A west of B, and an L3 chain in each. */
function twoDistricts(d: Draw): { W: number; H: number } {
  return { W: d.int(2000, 20_000), H: d.int(2000, 20_000) };
}

function buildSlotReuseDistricts(d: Draw): ConstructiveInput {
  const { W, H } = twoDistricts(d);
  const yA = d.int(300, H - 300);
  const yB = d.int(300, H - 300);
  const placed = place(d, {
    rings: { districtA: rect(0, 0, W, H), districtB: rect(W, 0, W, H), boxA: rect(100, yA - 50, W - 200, 100), boxB: rect(W + 100, yB - 50, W - 200, 100) },
    chains: { inA: [{ x: 0, y: yA }, { x: W, y: yA }], inB: [{ x: W, y: yB }, { x: 2 * W, y: yB }] },
  });
  return makeInput('index/slot-reuse-districts', d.seed, placed, {}, [
    step('insertChain', { ring: 'districtA', level: 1, cls: 'mandatory', role: 'district_bound', owner: 'A' }),
    step('insertChain', { ring: 'districtB', level: 1, cls: 'mandatory', role: 'district_bound', owner: 'B' }),
    step('insertChain', { chain: 'inA', level: 3, cls: 'mandatory', role: 'plot_line' }),
    step('rebuildPartitions', { level: 3 }),
    step('removeEdges', { chain: 'inA' }),
    step('insertChain', { chain: 'inB', level: 3, cls: 'mandatory', role: 'plot_line' }),
    step('rebuildPartitions', { level: 3, district: 'B' }),
    step('query', { box: 'boxB', level: 3, expect: 'inB' }),
    step('query', { box: 'boxA', level: 3, expect: 'none' }),
    step('rebuildPartitions', { level: 3, district: 'A' }),
    step('query', { box: 'boxA', level: 3, expect: 'none' }),
  ]);
}

function buildRegroupBlock(d: Draw): ConstructiveInput {
  const { W, H } = twoDistricts(d);
  const n = d.int(1, 4);
  const lines: Record<string, { x: number; y: number }[]> = {};
  const ys = new Set<number>();
  while (ys.size < n) ys.add(d.int(1, 2 * n + 1));
  [...ys].sort((u, v) => u - v).forEach((k, i) => {
    const y = Math.round((k * H) / (2 * n + 2));
    lines[`plotLine${String(i)}`] = [{ x: 0, y }, { x: W, y }];
  });
  const placed = place(d, { rings: { block: rect(0, 0, W, H), districtB: rect(W, 0, W, H), box: rect(-10, -10, W + 20, H + 20) }, chains: lines });
  const steps = [
    step('insertChain', { ring: 'block', level: 1, cls: 'mandatory', role: 'district_bound', owner: 'A' }),
    step('insertChain', { ring: 'districtB', level: 1, cls: 'mandatory', role: 'district_bound', owner: 'B' }),
    ...Object.keys(lines).map((c) => step('insertChain', { chain: c, level: 3, cls: 'mandatory', role: 'plot_line' })),
    step('rebuildPartitions', { level: 3 }),
    step('setOwner', { face: 'block', owner: 'B' }),
    step('rebuildPartitions', { level: 3, district: 'B' }),
    step('query', { box: 'box', level: 3, expect: 'eachPlotOnce' }),
    step('rebuildPartitions', { level: 3, district: 'A' }),
    step('query', { box: 'box', level: 3, expect: 'eachPlotOnce' }),
  ];
  return makeInput('index/regroup-block', d.seed, placed, { plots: n + 1 }, steps);
}

function buildL3OrderAfterL4(d: Draw): ConstructiveInput {
  const W = d.int(1000, 10_000);
  const H = d.int(1000, 10_000);
  // A plot line from the block's lowest-leftmost corner (0, 0) to the far side: both plots have that corner as their
  // lowest-leftmost vertex; an L4 line ends on the plot line, so S11's derivation puts an L4 vertex on the shared edge.
  const far = d.bool() ? { x: W, y: d.int(Math.floor(H / 4), H - 200) } : { x: d.int(Math.floor(W / 4), W - 200), y: H };
  const t = d.int(300, 700) / 1000;
  const foot = { x: Math.round(far.x * t), y: Math.round(far.y * t) };
  // The L4 line arrives at the foot from 60 cm inside the lower-right plot (perpendicular to the plot line).
  const len = Math.hypot(far.x, far.y);
  const start = { x: foot.x + Math.round((60 * far.y) / len), y: foot.y - Math.round((60 * far.x) / len) };
  const placed = place(d, {
    rings: { block: rect(0, 0, W, H), box: rect(-10, -10, W + 20, H + 20) },
    chains: { shared: [{ x: 0, y: 0 }, far], l4: [start, foot] },
  });
  return makeInput('index/l3-order-after-l4', d.seed, placed, {}, [
    step('insertChain', { ring: 'block', level: 2, cls: 'mandatory', role: 'kerb' }),
    step('insertChain', { chain: 'shared', level: 3, cls: 'mandatory', role: 'plot_line' }),
    step('query', { box: 'box', level: 3, record: 'before' }),
    step('insertChain', { chain: 'l4', level: 4, cls: 'mandatory', role: 'party_wall' }),
    step('query', { box: 'box', level: 3, record: 'after' }),
  ]);
}

const deferred = (id: string, milestone: 'M1' | 'M2a' | 'M5', clause: string, outcome: 'ok' | 'refused' = 'ok') =>
  deferredCase({
    id,
    class: 'indexes-slots-pool',
    milestone,
    source: SOURCE,
    ops: ['query'],
    expect: outcome === 'ok' ? { outcome, holds: ['hard-invariants'], clause } : { outcome, code: 'E_SCOPE', holds: ['version-kept'], clause },
  });

export const INDEX_CASES: readonly ConstructiveCase[] = Object.freeze([
  deferred('index/pool-overlay-scope', 'M1', 'a pool overlay writing outside its district (E_SCOPE)', 'refused'),
  deferred(
    'index/replay-move-vertex',
    'M2a',
    'a logged moveVertex replayed after an upgrade that puts an unrelated vertex 20 cm from its position — bound to the signature-matching vertex or orphaned, never to the unrelated one (resolveVertexAt, §4b)',
  ),
  m0Case({
    id: 'index/slot-reuse-stage',
    class: 'indexes-slots-pool',
    source: SOURCE,
    ops: ['removeEdges', 'insertChain', 'query'],
    // slot-reused (N-12, the hardening round S2): the fresh insertion takes the slots the removal freed — the case is a
    // test of a reused slot only while the removal runs before the insertion, which the hold now checks.
    expect: { outcome: 'ok', holds: ['query-returns-new-item', 'slot-reused'], clause: 'a slot freed and reused inside a stage — the query returns the new item' },
    build: buildSlotReuseStage,
  }),
  m0Case({
    id: 'index/slot-reuse-districts',
    class: 'indexes-slots-pool',
    source: SOURCE,
    ops: ['removeEdges', 'insertChain', 'query'],
    expect: {
      outcome: 'ok',
      holds: ['query-returns-new-item', 'query-equals-rebuild', 'slot-reused'],
      clause: "a slot freed in one district and reused in another, the second district's partition rebuilt before the first's — returned as its new item, never as its old one",
    },
    build: buildSlotReuseDistricts,
  }),
  deferred(
    'index/neighbour-step-queries',
    'M5',
    'after a neighbour step and its removal by a reroll with no partition rebuilt in between, level-2 and level-3 queries over the kerb return exactly what they return after a rebuild',
  ),
  m0Case({
    id: 'index/regroup-block',
    class: 'indexes-slots-pool',
    source: SOURCE,
    ops: ['setOwner', 'query'],
    expect: {
      outcome: 'ok',
      holds: ['query-each-once'],
      clause:
        "a drawBoundary that moves a kept block from district A to district B, B's partitions rebuilt before A's — every L3 query over the block returns each plot once, before and after A's rebuild (the kernel half: setOwner re-owning the block's L1 face; the edit is M2a's)",
    },
    build: buildRegroupBlock,
  }),
  m0Case({
    id: 'index/l3-order-after-l4',
    class: 'indexes-slots-pool',
    source: SOURCE,
    ops: ['insertChain', 'query'],
    expect: {
      outcome: 'ok',
      holds: ['query-order-stable'],
      clause: 'an L3 query in a block before and after S11 derives L4 there (two plots sharing their lowest-leftmost vertex with an L4 vertex on their shared edge) returns its results in the same order',
    },
    build: buildL3OrderAfterL4,
  }),
  deferred(
    'index/pool-backland',
    'M1',
    "a pooled district beside the settlement perimeter commits plot lines ending on the backland part's inner edge with 0 unresolved crossings at pool sizes 0 and 3, and every freeze finds every dynamic grid and tombstone set empty after its rebuild",
  ),
  deferred('index/pool-frozen-copy', 'M1', 'the frozen copy sent to a pool worker holds typed arrays only — no Map or Set reachable from the message'),
]);
