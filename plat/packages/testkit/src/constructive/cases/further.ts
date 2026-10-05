// §13.1 (2) *the kernel's further limits*: `buffer` with miter and square joins and flat ends (§3.7); `insetRing` at
// 0, below 0 and on a non-convex face (E_NON_CONVEX; §3.7 Insets); an arena holding only its outer ring saved and
// loaded (one face, §3.9) — M0's (M0-a-08, M0-a-15), run by M0-k-04. Frame growth (§3.2 (9)) is M4's and the raised
// way's part-0 cases M3a's: their generators are stubs (C-0038).
import { dmath } from '@plat/kernel';
import { deferredCase, lp, m0Case, makeInput, place, rect, step, type Draw, type P } from '../draw.js';
import type { ConstructiveCase, ConstructiveExpect, ConstructiveInput } from '../types.js';

const SOURCE = '§13.1 the kernel’s further limits';
const TAU = 2 * Math.PI;

/** A polyline of 2–5 vertices whose turns range from shallow to sharp (30°–150°), every leg ≥ 2 m. */
function bentChain(d: Draw): P[] {
  const n = d.int(2, 5);
  const out: P[] = [{ x: 0, y: 0 }];
  let heading = (TAU * d.int(0, 65_535)) / 65_536;
  for (let i = 1; i < n; i += 1) {
    const len = d.log(200, 1 << 14);
    const prev = out[out.length - 1];
    const q = lp(prev.x + len * dmath.cos(heading), prev.y + len * dmath.sin(heading), d.id);
    out.push({ x: q.x, y: q.y });
    heading += d.sign() * ((Math.PI / 180) * d.int(30, 150));
  }
  return out;
}

function buildBuffer(id: string, joins: 'miter' | 'square' | 'round', ends: 'round' | 'flat' | 'square') {
  return (d: Draw): ConstructiveInput =>
    makeInput(id, d.seed, place(d, { chains: { chain: bentChain(d) } }), { halfWidthCm: d.int(50, 1000), joins, ends }, [
      step('buffer', { chains: 'chain', halfWidthCm: 'halfWidthCm', joins, ends }),
    ]);
}

/** A convex face: a rectangle, or a snapped regular n-gon (n = 3 … 12). */
function convexFace(d: Draw): P[] {
  if (d.bool()) return rect(0, 0, d.log(400, 1 << 18), d.log(400, 1 << 18));
  const n = d.int(3, 12);
  const R = d.log(500, 1 << 18);
  const phi = (TAU * d.int(0, 65_535)) / 65_536;
  return Array.from({ length: n }, (_, j) => {
    const q = lp(R * dmath.cos(phi + (TAU * j) / n), R * dmath.sin(phi + (TAU * j) / n), d.id);
    return { x: q.x, y: q.y };
  });
}

function buildInset(id: string, d: Draw, dCm: number, nonConvex: boolean): ConstructiveInput {
  let f: P[];
  if (nonConvex) {
    const W = d.int(1000, 1 << 16);
    const H = d.int(1000, 1 << 16);
    const w = d.int(300, W - 300);
    const h = d.int(300, H - 300);
    f = [{ x: 0, y: 0 }, { x: W, y: 0 }, { x: W, y: h }, { x: w, y: h }, { x: w, y: H }, { x: 0, y: H }];
  } else f = convexFace(d);
  return makeInput(id, d.seed, place(d, { rings: { face: f } }), { dCm }, [
    step('insertChain', { ring: 'face', level: 1, cls: 'mandatory', role: 'way' }),
    step('insetRing', { face: 'face', dCm: 'dCm' }),
  ]);
}

function buildOuterRingOnly(d: Draw): ConstructiveInput {
  const hx = d.log(1000, 1 << 21);
  const hy = d.log(1000, 1 << 21);
  return makeInput('further/outer-ring-only', d.seed, place(d, { rings: { outer: rect(-hx, -hy, 2 * hx, 2 * hy) } }), {}, [
    step('insertChain', { ring: 'outer', level: 0, cls: 'mandatory', role: 'margin' }),
    step('encodeArena', {}),
    step('decodeArena', {}),
    step('encodeArena', { compare: 'first' }),
  ]);
}

const deferred = (id: string, milestone: 'M3a' | 'M4', clause: string, holds: ConstructiveExpect['holds'] = ['hard-invariants']) =>
  deferredCase({ id, class: 'further-limits', milestone, source: SOURCE, ops: milestone === 'M4' ? ['frameGrowth'] : ['warp', 'insertChain'], expect: { outcome: 'ok', holds, clause } });

export const FURTHER_CASES: readonly ConstructiveCase[] = Object.freeze([
  ...([
    ['further/buffer-miter-joins', 'miter', 'round', '`buffer` with miter joins'],
    ['further/buffer-square-joins', 'square', 'round', '`buffer` with square joins'],
    ['further/buffer-flat-ends', 'round', 'flat', '`buffer` with flat ends'],
  ] as const).map(([id, joins, ends, clause]) =>
    m0Case({
      id,
      class: 'further-limits',
      source: SOURCE,
      ops: ['buffer'],
      expect: { outcome: 'ok', holds: ['oracle-agreement'], clause: `${clause} (§3.7)` },
      build: buildBuffer(id, joins, ends),
    }),
  ),
  m0Case({
    id: 'further/inset-zero',
    class: 'further-limits',
    source: SOURCE,
    ops: ['insetRing'],
    expect: { outcome: 'ok', holds: ['ring-equals-face'], clause: "`insetRing` at 0 (the face's ring)" },
    build: (d) => buildInset('further/inset-zero', d, 0, false),
  }),
  m0Case({
    id: 'further/inset-negative',
    class: 'further-limits',
    source: SOURCE,
    ops: ['insetRing'],
    expect: { outcome: 'ok', holds: ['outward-not-collapsing'], clause: '`insetRing` below 0 (outward, never collapsing)' },
    build: (d) => buildInset('further/inset-negative', d, -d.int(1, 2000), false),
  }),
  m0Case({
    id: 'further/inset-non-convex',
    class: 'further-limits',
    source: SOURCE,
    ops: ['insetRing'],
    expect: { outcome: 'refused', code: 'E_NON_CONVEX', tier: 1, holds: [], clause: '`insetRing` on a non-convex face (E_NON_CONVEX, the caller taking offsetFace or a buffer union; §3.7 Insets)' },
    build: (d) => buildInset('further/inset-non-convex', d, d.int(1, 200), true),
  }),
  m0Case({
    id: 'further/outer-ring-only',
    class: 'further-limits',
    source: SOURCE,
    ops: ['encodeArena', 'decodeArena'],
    expect: { outcome: 'ok', holds: ['one-face', 'round-trip'], clause: 'an arena holding only its outer ring saved and loaded (one face, §3.9)' },
    build: buildOuterRingOnly,
  }),
  deferred('further/frame-growth-none', 'M4', 'a frame growth whose frame and arena would be no larger (nothing runs)'),
  deferred(
    'further/frame-growth-kept',
    'M4',
    'a frame growth whose law would move a side out by at most attractCm — a CITY frame kept through a decline below 10 000 people, re-crossing two people above its peak (frame and arena kept, nothing runs, no chain stripped; §3.2 (9))',
  ),
  deferred('further/fold-village-town', 'M4', 'a village → town fold (the frame kept, the arena by the new law’s margin, neither shrinking; §3.2 (9))'),
  deferred(
    'further/fold-town-village',
    'M4',
    "its reverse — a TOWN made at 9 000 people handed down to the village product, falling below 400 and re-crossing it (the frame grown to the territory law's 3 373 m square, the arena kept at 4 293 m: (a) and (c) only; the hand-off up at 1 575 then growing the arena by (b) to 5 397 m; §3.2 (9))",
  ),
  deferred('further/raised-part0-warp', 'M3a', 'a part-0 warp under a raised way (its feet held, §3.6)', ['held-unmoved']),
  deferred('further/raised-crossing', 'M3a', 'a raised way crossing part-0 ways (no junction, the two parts sharing no topology; §3.4, §3.10)'),
]);
