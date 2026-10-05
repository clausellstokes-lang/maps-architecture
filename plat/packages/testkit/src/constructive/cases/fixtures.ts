// §13.1's fixture paragraphs after the constructive list. *Items 12 and 28*: the underground arena's corridorUnion
// over tunnel chains (run at M0 as plain chains, M0-a-09's defers), `tileRings`' seed clip on a rotated T's wings and
// its three ring cases (M0-a-09) — and the transient arena's acceptance and the re-cut, M6-P's (C-0038, C-0041).
// *Items 45, 53 and 65*: the regular fit's fixtures (M0-a-10), the Poisson sampler's annulus (M1, §8.10) and the
// underground parts (M6-U). The M0 cases are run by M0-k-04 (C-0110); the others' generators are stubs.
import { dmath } from '@plat/kernel';
import { deferredCase, gcd, lp, m0Case, makeInput, place, rect, step, turned, type Draw, type P } from '../draw.js';
import { refArea2 } from '../numeric.js';
import type { ConstructiveCase, ConstructiveExpect, ConstructiveInput } from '../types.js';

const ITEMS_12_28 = '§13.1 fixtures of items 12 and 28';
const ITEMS_45_53_65 = '§13.1 fixtures of items 45, 53 and 65';
const TAU = 2 * Math.PI;

function buildTunnel(d: Draw): ConstructiveInput {
  const W = d.int(8000, 40_000);
  const H = d.int(4000, 40_000);
  const ym = d.int(Math.floor(H / 4), Math.floor((3 * H) / 4));
  const xm = d.int(Math.floor(W / 4), Math.floor((3 * W) / 4));
  const half = d.int(100, 600);
  const xp = d.int(Math.floor(W / 8), xm - half - 400);
  // A plot line in the block below the trunk, ending 1–25 cm short of the kerb: it lands on the kerb by attraction.
  const short = d.int(1, 25);
  const placed = place(d, {
    rings: { face: rect(0, 0, W, H) },
    chains: { trunk: [{ x: 0, y: ym }, { x: W, y: ym }], branch: [{ x: xm, y: ym }, { x: xm, y: H }], plotLine: [{ x: xp, y: 100 }, { x: xp, y: ym - half - short }] },
  });
  return makeInput('fix/tunnel-corridor', d.seed, placed, { halfWidthCm: half, endShortCm: short }, [
    step('insertChain', { ring: 'face', level: 1, cls: 'mandatory', role: 'district_bound' }),
    step('insertChain', { chain: 'trunk', level: 1, cls: 'mandatory', role: 'tunnel' }),
    step('insertChain', { chain: 'branch', level: 1, cls: 'mandatory', role: 'tunnel' }),
    step('corridorUnion', { faces: 'face', halfWidthCm: 'halfWidthCm' }),
    step('insertChain', { chain: 'plotLine', level: 3, cls: 'mandatory', role: 'plot_line' }),
  ]);
}

function buildSeedClipT(d: Draw): ConstructiveInput {
  // The bar, then the stem: the stem's two long sides cross the bar's lower side, its top inside the bar.
  const Wb = d.int(1000, 1 << 14);
  const hb = d.int(300, 1 << 12);
  const ws = d.int(200, Math.floor(Wb / 2));
  const xs = d.int(100, Wb - ws - 100);
  const Ls = d.int(300, 1 << 14);
  const top = d.int(50, hb - 50);
  const angle = (TAU * d.int(0, 65_535)) / 65_536;
  const bar = turned(rect(0, 0, Wb, hb), angle, { x: 0, y: 0 }, 'fix/seed-clip-rotated-t');
  const stem = turned(rect(xs, -Ls, ws, Ls + top), angle, { x: 0, y: 0 }, 'fix/seed-clip-rotated-t');
  return makeInput('fix/seed-clip-rotated-t', d.seed, place(d, { rings: { bar, stem } }, { translateOnly: true }), { order: ['bar', 'stem'], pieces: [1, 1] }, [
    step('tileRings', { rings: 'bar,stem' }),
  ]);
}

function buildTileCovered(d: Draw): ConstructiveInput {
  const W = d.int(1000, 1 << 16);
  const H = d.int(1000, 1 << 16);
  const same = d.bool();
  const inner = same ? rect(0, 0, W, H) : rect(d.int(100, Math.floor(W / 3)), 0, d.int(200, Math.floor(W / 3)), d.int(200, H));
  return makeInput('fix/tilerings-covered', d.seed, place(d, { rings: { first: rect(0, 0, W, H), covered: inner } }), { order: ['first', 'covered'], pieces: [1, 0] }, [
    step('tileRings', { rings: 'first,covered' }),
  ]);
}

function buildTileCutInTwo(d: Draw): ConstructiveInput {
  const W = d.int(2000, 1 << 16);
  const H = d.int(300, 1 << 12);
  const bw = d.int(200, Math.floor(W / 3));
  const bx = d.int(300, W - bw - 300);
  const over = d.int(100, 2000);
  return makeInput(
    'fix/tilerings-cut-in-two',
    d.seed,
    place(d, { rings: { cutter: rect(bx, -over, bw, H + 2 * over), cut: rect(0, 0, W, H) } }),
    { order: ['cutter', 'cut'], pieces: [1, 2] },
    [step('tileRings', { rings: 'cutter,cut' })],
  );
}

function buildTileHole(d: Draw): ConstructiveInput {
  const W = d.int(2000, 1 << 16);
  const H = d.int(2000, 1 << 16);
  const w = d.int(200, Math.floor(W / 3));
  const h = d.int(200, Math.floor(H / 3));
  const inner = rect(d.int(100, W - w - 100), d.int(100, H - h - 100), w, h);
  return makeInput('fix/tilerings-hole-refused', d.seed, place(d, { rings: { inner, outer: rect(0, 0, W, H) } }), { order: ['inner', 'outer'] }, [step('tileRings', { rings: 'inner,outer' })]);
}

/** A regular n-gon of circumradius R about the origin, turned by φ, snapped. */
function ngon(n: number, R: number, phi: number, step0 = 1): P[] {
  return Array.from({ length: n }, (_, j) => {
    const t = phi + (TAU * ((j * step0) % n)) / n;
    const q = lp(R * dmath.cos(t), R * dmath.sin(t), 'fix/regularfit');
    return { x: q.x, y: q.y };
  });
}

function buildFitNgon(id: string) {
  return (d: Draw): ConstructiveInput => {
    const n = d.int(3, 12);
    const ring = ngon(n, d.log(500, 1 << 20), (TAU * d.int(0, 65_535)) / 65_536);
    return makeInput(id, d.seed, place(d, { rings: { ring } }, { translateOnly: true }), { n }, [step('regularFit', { ring: 'ring', rotations: 'all', reversed: true })]);
  };
}

function buildThinRect(d: Draw): ConstructiveInput {
  const short = d.int(100, 1 << 12);
  const long = short * 3 + d.int(0, 20 * short);
  const ring = turned(rect(0, 0, long, short), (TAU * d.int(0, 65_535)) / 65_536, { x: 0, y: 0 }, 'fix/regularfit-thin-rectangle');
  return makeInput('fix/regularfit-thin-rectangle', d.seed, place(d, { rings: { ring } }, { translateOnly: true }), { aspect: long / short }, [step('regularFit', { ring: 'ring' })]);
}

function buildSplitSide(d: Draw): ConstructiveInput {
  const W = 2 * d.int(500, 1 << 12);
  const H = 2 * d.int(500, 1 << 12);
  const plain = rect(0, 0, W, H);
  // The bottom side split into many short edges: lattice points every `step` cm along it.
  const stepCm = d.int(1, 30);
  const bottom: P[] = [];
  for (let x = 0; x < W; x += stepCm) bottom.push({ x, y: 0 });
  const split = [...bottom, { x: W, y: 0 }, { x: W, y: H }, { x: 0, y: H }];
  return makeInput('fix/regularfit-split-side', d.seed, place(d, { rings: { plain, split } }), { stepCm }, [step('regularFit', { ring: 'plain' }), step('regularFit', { ring: 'split', compare: 'plain' })]);
}

function buildFitDegenerate(d: Draw): ConstructiveInput {
  const variant = (['fewer-than-three', 'zero-area', 'vanishing-first-component'] as const)[d.seed % 3];
  let ring: P[];
  if (variant === 'fewer-than-three') ring = d.bool() ? [{ x: 0, y: 0 }] : [{ x: 0, y: 0 }, { x: d.log(1, 1 << 16), y: d.int(-(1 << 16), 1 << 16) }];
  else if (variant === 'zero-area') {
    const L = d.log(10, 1 << 16);
    ring = [{ x: 0, y: 0 }, { x: L, y: 0 }, { x: d.int(1, L - 1), y: 0 }, { x: d.int(1, L - 1), y: 0 }];
  } else {
    // A star polygon {n/k}, k ≥ 2 coprime to n: its first Fourier component in ring order is 0 (rounding aside).
    const n = d.pick([5, 7, 8, 9, 11, 12]);
    let k = d.int(2, Math.floor(n / 2));
    while (gcd(n, k) !== 1) k = d.int(2, Math.floor(n / 2));
    ring = ngon(n, d.log(500, 1 << 20), (TAU * d.int(0, 65_535)) / 65_536, k);
  }
  return makeInput('fix/regularfit-degenerate', d.seed, place(d, { rings: { ring } }, { translateOnly: true }), { variant }, [step('regularFit', { ring: 'ring' })]);
}

/**
 * The draw is its variant: fewer than three vertices; three or more distinct collinear ones; or a star polygon whose
 * vertex order winds two or more times round its centroid (so its first component vanishes).
 */
function witnessFitDegenerate(input: ConstructiveInput): string | null {
  const r = input.rings.ring;
  const variant = input.params.variant;
  if (variant === 'fewer-than-three') return r.length < 3 ? null : 'three or more vertices';
  if (variant === 'zero-area') return r.length >= 3 && refArea2(r) === 0n && new Set(r.map((p) => `${String(p.x)},${String(p.y)}`)).size >= 3 ? null : 'not a ring of three or more collinear points';
  let cx = 0;
  let cy = 0;
  for (const p of r) {
    cx += p.x / r.length;
    cy += p.y / r.length;
  }
  let turn = 0;
  for (let i = 0; i < r.length; i += 1) {
    const a = Math.atan2(r[i].y - cy, r[i].x - cx);
    const b = Math.atan2(r[(i + 1) % r.length].y - cy, r[(i + 1) % r.length].x - cx);
    let t = b - a;
    while (t <= -Math.PI) t += TAU;
    while (t > Math.PI) t -= TAU;
    turn += t;
  }
  return Math.round(turn / TAU) >= 2 ? null : `the ring winds ${String(Math.round(turn / TAU))} time(s) round its centroid`;
}

const deferred = (id: string, milestone: 'M1' | 'M6-P' | 'M6-U', source: string, ops: string[], expect: ConstructiveExpect) =>
  deferredCase({ id, class: source === ITEMS_12_28 ? 'fixtures-items-12-28' : 'fixtures-items-45-53-65', milestone, source, ops, expect });

const ok = (clause: string, holds: ConstructiveExpect['holds'] = ['hard-invariants']): ConstructiveExpect => ({ outcome: 'ok', holds, clause });

export const FIXTURE_CASES: readonly ConstructiveCase[] = Object.freeze([
  m0Case({
    id: 'fix/tunnel-corridor',
    class: 'fixtures-items-12-28',
    source: ITEMS_12_28,
    ops: ['corridorUnion', 'insertChain'],
    expect: ok(
      "the underground arena (II.7): corridorUnion over a fixture of tunnel chains, where the kerb is the tunnel's external wall — a plot line ending on it lands by attraction, and a tunnel junction yields wedges like a street junction (a plain chain at M0)",
      ['kerb-wedges', 'hard-invariants'],
    ),
    build: buildTunnel,
  }),
  m0Case({
    id: 'fix/seed-clip-rotated-t',
    class: 'fixtures-items-12-28',
    source: ITEMS_12_28,
    ops: ['tileRings'],
    expect: ok("a rotated T's two wings, its stem crossing one side of the bar twice, clipped to tile as the faces of one overlay (§3.4's seed clip) — every crossing vertex a vertex of both rings, the joint shared vertex for vertex", ['pieces-tile']),
    build: buildSeedClipT,
    witness: (input) => (refArea2(input.rings.bar) > 0n && refArea2(input.rings.stem) > 0n ? null : 'a wing is not counter-clockwise'),
  }),
  deferred('fix/transient-seed-tiling', 'M6-P', ITEMS_12_28, ['transientArena'], ok('the seed-tiling area2 identity after random partitions of rect, L, T and curved-quad rings … and the seeds accepted (the transient arena, M6-P)')),
  m0Case({
    id: 'fix/tilerings-covered',
    class: 'fixtures-items-12-28',
    source: ITEMS_12_28,
    ops: ['tileRings'],
    expect: ok('tileRings on a ring the earlier rings cover (no piece)', ['pieces-tile']),
    build: buildTileCovered,
  }),
  m0Case({
    id: 'fix/tilerings-cut-in-two',
    class: 'fixtures-items-12-28',
    source: ITEMS_12_28,
    ops: ['tileRings'],
    expect: ok('tileRings on a ring the earlier rings cut in two (two pieces, each simple and counter-clockwise)', ['pieces-tile']),
    build: buildTileCutInTwo,
  }),
  m0Case({
    id: 'fix/tilerings-hole-refused',
    class: 'fixtures-items-12-28',
    source: ITEMS_12_28,
    ops: ['tileRings'],
    expect: { outcome: 'refused', code: 'E_DEGENERATE', detail: 'overlap', tier: 1, holds: ['names-hole-vertex'], clause: 'tileRings on an earlier ring wholly inside a later one (refused, E_DEGENERATE, detail overlap, naming a vertex of the hole)' },
    build: buildTileHole,
  }),
  deferred('fix/transient-shared-side', 'M6-P', ITEMS_12_28, ['transientArena'], ok('a side two seed rings share becoming one edge')),
  deferred(
    'fix/transient-seed-hot-pixel',
    'M6-P',
    ITEMS_12_28,
    ['transientArena'],
    ok("a seed vertex within the hot pixel of another ring's side splitting that side, and one 20 cm from it refused with E_DEGENERATE (detail seed), the construction moving nothing"),
  ),
  deferred('fix/transient-overlap', 'M6-P', ITEMS_12_28, ['transientArena'], ok("overlapping seed rings, and a fixed ring outside the seeds or across a seed ring's side, refused with E_DEGENERATE (detail overlap)")),
  deferred('fix/transient-fixed-bay', 'M6-P', ITEMS_12_28, ['transientArena'], ok('a fixed bay with a slit and a cut')),
  deferred('fix/transient-merge-seed-edge', 'M6-P', ITEMS_12_28, ['mergeFaces'], ok('mergeFaces across a seed edge refused with E_STRUCTURAL')),
  deferred('fix/transient-readback-order', 'M6-P', ITEMS_12_28, ['readBack'], ok('the readBack order identical after a slot renumbering', ['renumbering-identity'])),
  deferred(
    'fix/recut',
    'M6-P',
    ITEMS_12_28,
    ['transientArena'],
    ok('the re-cut (item 28 (f)): the arena opened from the same seed rings with three kept rooms and a chimney-stack ring passed as fixed — the kept rings come back as the same polygons; a second call with no kept rooms reproduces the first cut'),
  ),
  m0Case({
    id: 'fix/regularfit-ngon',
    class: 'fixtures-items-45-53-65',
    source: ITEMS_45_53_65,
    ops: ['regularFit'],
    expect: ok("the regular fit: regular n-gons (n = 3 … 12, radius ≥ 5 m), rotated and snapped, return every target within 1 cm of its vertex and a compactness within 10⁻³ of that n-gon's own; the doubles identical under §6.5 (10)'s cross-implementation test", ['targets-within-1cm', 'cross-host-identical']),
    build: buildFitNgon('fix/regularfit-ngon'),
  }),
  m0Case({
    id: 'fix/regularfit-rotation-reversal',
    class: 'fixtures-items-45-53-65',
    source: ITEMS_45_53_65,
    ops: ['regularFit'],
    expect: ok("every rotation of a ring's vertex order and its reversal (clockwise input) return identical targets bit for bit", ['targets-identical']),
    build: buildFitNgon('fix/regularfit-rotation-reversal'),
  }),
  m0Case({
    id: 'fix/regularfit-thin-rectangle',
    class: 'fixtures-items-45-53-65',
    source: ITEMS_45_53_65,
    ops: ['regularFit'],
    expect: ok('a thin rectangle (sides 1 : 3 or thinner) falls below compactness 0.75, its targets lying on a square', ['compactness-below-075']),
    build: buildThinRect,
  }),
  m0Case({
    id: 'fix/regularfit-split-side',
    class: 'fixtures-items-45-53-65',
    source: ITEMS_45_53_65,
    ops: ['regularFit'],
    expect: ok('a side split into many short edges leaves the centre unchanged', ['centre-unchanged']),
    build: buildSplitSide,
  }),
  m0Case({
    id: 'fix/regularfit-degenerate',
    class: 'fixtures-items-45-53-65',
    source: ITEMS_45_53_65,
    ops: ['regularFit'],
    sweep: 3,
    expect: { outcome: 'refused', code: 'E_DEGENERATE', detail: 'fit', tier: 1, holds: [], clause: 'fewer than three vertices, a zero-area ring and a vanishing first component return E_DEGENERATE (detail fit)' },
    build: buildFitDegenerate,
    witness: witnessFitDegenerate,
  }),
  deferred('fix/poisson-annulus', 'M1', ITEMS_45_53_65, ['poisson'], ok('the sampler (item 53): every accepted point lies within [r₀, (1 + a) r₀] of the active point it was drawn from, beside the Poisson minimum distance ≥ r (§8.10, M1)')),
  deferred('fix/underground-two-parts', 'M6-U', ITEMS_45_53_65, ['insertChain'], ok('the underground parts (item 65): two systems crossing in plan without meeting commit in two parts with no vertex at the crossing in either, each part passing every hard invariant')),
  deferred('fix/underground-link', 'M6-U', ITEMS_45_53_65, ['resolve'], ok('a link record resolves one vertex in each part')),
  deferred('fix/underground-foreign-slot', 'M6-U', ITEMS_45_53_65, ['tx'], { outcome: 'assertion', holds: [], clause: 'a transaction on one part handed a slot of another asserts in a debug build' }),
  deferred('fix/underground-gallery', 'M6-U', ITEMS_45_53_65, ['corridorUnion'], ok('corridorUnion over a gallery chain gives its kerb at widthCm ÷ 2 + wallCm')),
  deferred('fix/underground-chamber', 'M6-U', ITEMS_45_53_65, ['insertChain'], ok("a chamber outline at L1 separates floor from rock, and S10's frontage cut lands on the floor")),
]);
