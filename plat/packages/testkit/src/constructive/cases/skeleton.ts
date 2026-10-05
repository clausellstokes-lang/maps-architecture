// §13.1 (2) *straight-skeleton fixtures (M0)*: squares and rectangles at every centidegree 0°–90°, regular n-gons
// n = 3 … 64, equal-width strips, rotated L, T and U shapes, the notched near-rectangle (20 × 10 m with a 3 × 2 m
// notch: no roof line outside), 1 000 holed polygons and snapped rotated squares (§3.8; M0-a-11); B-CITY-lite's faces
// are M1's (C-0038). And the skeleton's inputs of §13.1's ladder coverage — one degenerate input of each kind for
// F-SKELETON (zero-length, zero-area, self-touching, collinear, coincident), which M0-x-06 names by these ids. The
// sweeps enumerate: seed i takes centidegree i mod 9 001, n = 3 + i mod 62, holed polygon i mod 1 000.
import fc from 'fast-check';
import { dmath } from '@plat/kernel';
import { arb } from '../../fuzz/index.js';
import { ATTRACT, cw, deferredCase, lp, m0Case, makeInput, place, rect, step, turned, type Draw, type P } from '../draw.js';
import { refArea2 } from '../numeric.js';
import type { ConstructiveCase, ConstructiveExpect, ConstructiveInput } from '../types.js';

const SOURCE = '§13.1 straight-skeleton fixtures (M0)';
const LADDER = '§13.1 ladder coverage (F-SKELETON)';
const TAU = 2 * Math.PI;

/** Every skeleton fixture's outcome: a validated skeleton or the reader's reported downgrade, no roof line outside. */
const VALID_OR_DOWNGRADE = (clause: string): ConstructiveExpect => ({ outcome: 'ok', holds: ['skeleton-valid-or-downgrade', 'roof-inside'], clause });

const roof = (rings: string) => [step('skeleton', { rings, use: 'roof' })];

/** A ring through local points turned by `angle` about the origin, snapped, then translated. */
function turnedRing(d: Draw, id: string, ring: P[], angle: number, params: Record<string, number | string> = {}): ConstructiveInput {
  const r = turned(ring, angle, { x: 0, y: 0 }, id);
  return makeInput(id, d.seed, place(d, { rings: { outer: r } }, { translateOnly: true }), params, roof('outer'));
}

/** A rectangle w × h centred on the origin. */
const centred = (w: number, h: number): P[] => rect(-Math.floor(w / 2), -Math.floor(h / 2), w, h);

function buildEveryCdeg(id: string, square: boolean) {
  return (d: Draw): ConstructiveInput => {
    const cdeg = d.seed % 9001;
    const w = d.log(200, 1 << 20);
    const h = square ? w : Math.max(200, Math.round(w / (1 + d.int(1, 7000) / 1000)));
    return turnedRing(d, id, centred(w, h), (cdeg * Math.PI) / 18_000, { cdeg });
  };
}

function buildRegularNgon(d: Draw): ConstructiveInput {
  const n = 3 + (d.seed % 62);
  const R = d.log(500, 1 << 20); // a side of 2R·sin(π/n) ≥ 49 cm at n = 64
  const phi = (TAU * d.int(0, 65_535)) / 65_536;
  const ring: P[] = [];
  for (let j = 0; j < n; j += 1) {
    const q = lp(R * dmath.cos(phi + (TAU * j) / n), R * dmath.sin(phi + (TAU * j) / n), 'skel/regular-ngon');
    ring.push({ x: q.x, y: q.y });
  }
  return makeInput('skel/regular-ngon', d.seed, place(d, { rings: { outer: ring } }, { translateOnly: true }), { n }, roof('outer'));
}

/** Equal-width strips: straight, L and U, every arm w wide. */
function buildStrip(d: Draw): ConstructiveInput {
  const kind = (['straight', 'L', 'U'] as const)[d.seed % 3];
  const w = d.int(200, 2000);
  const A = 3 * w + d.log(0, 1 << 16);
  const B = 3 * w + d.log(0, 1 << 16);
  const ring: P[] =
    kind === 'straight'
      ? rect(0, 0, A + 2 * w, w)
      : kind === 'L'
        ? [{ x: 0, y: 0 }, { x: A, y: 0 }, { x: A, y: B }, { x: A - w, y: B }, { x: A - w, y: w }, { x: 0, y: w }]
        : [{ x: 0, y: 0 }, { x: A, y: 0 }, { x: A, y: B }, { x: A - w, y: B }, { x: A - w, y: w }, { x: w, y: w }, { x: w, y: B }, { x: 0, y: B }];
  return makeInput('skel/equal-width-strip', d.seed, place(d, { rings: { outer: ring } }), { kind, widthCm: w }, roof('outer'));
}

/** Rotated L, T and U shapes, every feature ≥ 2 m, turned by a random angle and snapped. */
function buildRotatedShape(id: string, kind: 'L' | 'T' | 'U') {
  return (d: Draw): ConstructiveInput => {
    const s = () => d.int(200, 1 << 14);
    let ring: P[];
    if (kind === 'L') {
      const c = s();
      const b = s();
      const a = c + s();
      const e = b + s();
      ring = [{ x: 0, y: 0 }, { x: a, y: 0 }, { x: a, y: b }, { x: c, y: b }, { x: c, y: e }, { x: 0, y: e }];
    } else if (kind === 'T') {
      const c1 = s();
      const c2 = c1 + s();
      const W = c2 + s();
      const h = s();
      const H = h + s();
      ring = [{ x: c1, y: 0 }, { x: c2, y: 0 }, { x: c2, y: h }, { x: W, y: h }, { x: W, y: H }, { x: 0, y: H }, { x: 0, y: h }, { x: c1, y: h }];
    } else {
      const w1 = s();
      const gap = s();
      const w2 = s();
      const A = w1 + gap + w2;
      const t = s();
      const B = t + s();
      ring = [{ x: 0, y: 0 }, { x: A, y: 0 }, { x: A, y: B }, { x: A - w2, y: B }, { x: A - w2, y: t }, { x: w1, y: t }, { x: w1, y: B }, { x: 0, y: B }];
    }
    return turnedRing(d, id, ring, (TAU * d.int(0, 65_535)) / 65_536, { kind });
  };
}

function buildNotched(d: Draw): ConstructiveInput {
  // §13.1's fixture: a 20 × 10 m rectangle with a 3 × 2 m notch on a long side, the notch anywhere along it.
  const x0 = d.int(2 * ATTRACT, 2000 - 300 - 2 * ATTRACT);
  const ring = [
    { x: 0, y: 0 },
    { x: 2000, y: 0 },
    { x: 2000, y: 1000 },
    { x: x0 + 300, y: 1000 },
    { x: x0 + 300, y: 800 },
    { x: x0, y: 800 },
    { x: x0, y: 1000 },
    { x: 0, y: 1000 },
  ];
  return makeInput('skel/notched-rectangle', d.seed, place(d, { rings: { outer: ring } }), { notchAtCm: x0 }, roof('outer'));
}

const HOLED = arb.holedPolygon();

function buildHoled(d: Draw): ConstructiveInput {
  const i = d.seed % 1000;
  // M0-k-01's holed polygons, sample i of the family: the same polygon for the same i on every host.
  const [h] = fc.sample(HOLED, { seed: 0x5eed0000 + i, numRuns: 1 });
  const rings: Record<string, P[]> = { outer: h.polygon[0].map((p) => ({ x: p.x, y: p.y })) };
  h.polygon.slice(1).forEach((r, j) => {
    rings[`hole${String(j)}`] = r.map((p) => ({ x: p.x, y: p.y }));
  });
  return makeInput('skel/holed-polygons', d.seed, place(d, { rings }, { fixed: true }), { index: i, contacts: h.contacts }, roof(Object.keys(rings).join(',')));
}

function buildSnappedSquare(d: Draw): ConstructiveInput {
  const w = d.log(200, 1 << 20);
  return turnedRing(d, 'skel/snapped-rotated-square', centred(w, w), (TAU * d.int(0, 65_535)) / 65_536);
}

// ── F-SKELETON's degenerate kinds (§13.1 ladder coverage; §5.1 (9)) ──

function buildZeroLength(d: Draw): ConstructiveInput {
  const r = rect(0, 0, d.log(200, 1 << 18), d.log(200, 1 << 18));
  const i = d.int(0, 3);
  r.splice(i + 1, 0, { ...r[i] }); // a zero-length edge: a vertex repeated
  return makeInput('skel/degenerate-zero-length', d.seed, place(d, { rings: { outer: r } }), {}, roof('outer'));
}

function buildZeroArea(d: Draw): ConstructiveInput {
  const L = d.log(200, 1 << 18);
  const m = d.int(1, L - 1);
  return makeInput('skel/degenerate-zero-area', d.seed, place(d, { rings: { outer: [{ x: 0, y: 0 }, { x: L, y: 0 }, { x: m, y: 0 }] } }), {}, roof('outer'));
}

function buildSelfTouching(d: Draw): ConstructiveInput {
  const s = d.log(200, 1 << 18);
  const t = d.log(200, 1 << 18);
  // Two squares meeting at one corner (s, s), traversed as one ring that visits it twice.
  const ring = [{ x: 0, y: 0 }, { x: s, y: 0 }, { x: s, y: s }, { x: s + t, y: s }, { x: s + t, y: s + t }, { x: s, y: s + t }, { x: s, y: s }, { x: 0, y: s }];
  return makeInput('skel/degenerate-self-touching', d.seed, place(d, { rings: { outer: ring } }), {}, roof('outer'));
}

function buildCollinear(d: Draw): ConstructiveInput {
  const w = 2 * d.log(200, 1 << 17);
  const h = 2 * d.log(200, 1 << 17);
  const ring = [{ x: 0, y: 0 }, { x: w / 2, y: 0 }, { x: w, y: 0 }, { x: w, y: h / 2 }, { x: w, y: h }, { x: 0, y: h }];
  return makeInput('skel/degenerate-collinear', d.seed, place(d, { rings: { outer: ring } }), {}, roof('outer'));
}

function buildCoincident(d: Draw): ConstructiveInput {
  const W = d.log(2000, 1 << 18);
  const H = d.log(2000, 1 << 18);
  const hole = cw(rect(d.int(200, W - 800), d.int(200, H - 800), 400, 400));
  return makeInput('skel/degenerate-coincident', d.seed, place(d, { rings: { outer: rect(0, 0, W, H), hole0: hole, hole1: [...hole] } }), {}, roof('outer,hole0,hole1'));
}

const ccw = (input: ConstructiveInput) => (refArea2(input.rings.outer) > 0n ? null : 'the outline is not counter-clockwise');

export const SKELETON_CASES: readonly ConstructiveCase[] = Object.freeze([
  m0Case({
    id: 'skel/square-every-cdeg',
    class: 'skeleton-fixtures',
    source: SOURCE,
    ops: ['skeleton'],
    sweep: 9001,
    expect: VALID_OR_DOWNGRADE('squares at every centidegree 0°–90°'),
    build: buildEveryCdeg('skel/square-every-cdeg', true),
    witness: ccw,
  }),
  m0Case({
    id: 'skel/rectangle-every-cdeg',
    class: 'skeleton-fixtures',
    source: SOURCE,
    ops: ['skeleton'],
    sweep: 9001,
    expect: VALID_OR_DOWNGRADE('rectangles at every centidegree 0°–90°'),
    build: buildEveryCdeg('skel/rectangle-every-cdeg', false),
    witness: ccw,
  }),
  m0Case({
    id: 'skel/regular-ngon',
    class: 'skeleton-fixtures',
    source: SOURCE,
    ops: ['skeleton'],
    sweep: 62,
    expect: VALID_OR_DOWNGRADE('regular n-gons n = 3 … 64'),
    build: buildRegularNgon,
    witness: ccw,
  }),
  m0Case({
    id: 'skel/equal-width-strip',
    class: 'skeleton-fixtures',
    source: SOURCE,
    ops: ['skeleton'],
    sweep: 3,
    expect: VALID_OR_DOWNGRADE('equal-width strips'),
    build: buildStrip,
    witness: ccw,
  }),
  ...(['L', 'T', 'U'] as const).map((k) =>
    m0Case({
      id: `skel/rotated-${k.toLowerCase()}`,
      class: 'skeleton-fixtures',
      source: SOURCE,
      ops: ['skeleton'],
      expect: VALID_OR_DOWNGRADE(`rotated ${k} shapes`),
      build: buildRotatedShape(`skel/rotated-${k.toLowerCase()}`, k),
      witness: ccw,
    }),
  ),
  m0Case({
    id: 'skel/notched-rectangle',
    class: 'skeleton-fixtures',
    source: SOURCE,
    ops: ['skeleton'],
    expect: {
      outcome: 'ok',
      holds: ['skeleton-valid', 'roof-inside'],
      clause: 'near-rectangles with a notch on a long side, which take the skeleton path and pass the validator (a 20 × 10 m rectangle with a 3 × 2 m notch: no roof line outside)',
    },
    build: buildNotched,
    witness: ccw,
  }),
  m0Case({
    id: 'skel/holed-polygons',
    class: 'skeleton-fixtures',
    source: SOURCE,
    ops: ['skeleton'],
    sweep: 1000,
    expect: VALID_OR_DOWNGRADE('1 000 holed polygons (0 crashes on the 1 000 holed polygons)'),
    build: buildHoled,
    witness: ccw,
  }),
  m0Case({
    id: 'skel/snapped-rotated-square',
    class: 'skeleton-fixtures',
    source: SOURCE,
    ops: ['skeleton'],
    expect: VALID_OR_DOWNGRADE('snapped rotated squares'),
    build: buildSnappedSquare,
    witness: ccw,
  }),
  deferredCase({
    id: 'skel/bcity-lite-faces',
    class: 'skeleton-fixtures',
    milestone: 'M1',
    source: SOURCE,
    ops: ['skeleton'],
    expect: VALID_OR_DOWNGRADE("B-CITY-lite's irregular footprints and district and water faces (M0's stand-in corpus is M0-a-12's, C-0015)"),
  }),
  m0Case({
    id: 'skel/degenerate-zero-length',
    class: 'skeleton-fixtures',
    source: LADDER,
    ops: ['skeleton'],
    ladder: { failureClass: 'F-SKELETON', kind: 'zero-length' },
    expect: { outcome: 'ok', holds: ['skeleton-valid-or-downgrade'], clause: 'F-SKELETON, zero-length: a footprint with a repeated vertex' },
    build: buildZeroLength,
  }),
  m0Case({
    id: 'skel/degenerate-zero-area',
    class: 'skeleton-fixtures',
    source: LADDER,
    ops: ['skeleton'],
    ladder: { failureClass: 'F-SKELETON', kind: 'zero-area' },
    expect: { outcome: 'typed', codes: ['E_DEGENERATE'], holds: ['skeleton-valid-or-downgrade'], clause: 'F-SKELETON, zero-area: a ring of collinear vertices' },
    build: buildZeroArea,
  }),
  m0Case({
    id: 'skel/degenerate-self-touching',
    class: 'skeleton-fixtures',
    source: LADDER,
    ops: ['skeleton'],
    ladder: { failureClass: 'F-SKELETON', kind: 'self-touching' },
    expect: { outcome: 'typed', codes: ['E_DEGENERATE'], holds: ['skeleton-valid-or-downgrade'], clause: 'F-SKELETON, self-touching: a ring visiting one corner twice' },
    build: buildSelfTouching,
  }),
  m0Case({
    id: 'skel/degenerate-collinear',
    class: 'skeleton-fixtures',
    source: LADDER,
    ops: ['skeleton'],
    ladder: { failureClass: 'F-SKELETON', kind: 'collinear' },
    expect: { outcome: 'ok', holds: ['skeleton-valid-or-downgrade', 'roof-inside'], clause: 'F-SKELETON, collinear: a rectangle with collinear vertices on its sides (the pre-clean merges them)' },
    build: buildCollinear,
    witness: ccw,
  }),
  m0Case({
    id: 'skel/degenerate-coincident',
    class: 'skeleton-fixtures',
    source: LADDER,
    ops: ['skeleton'],
    ladder: { failureClass: 'F-SKELETON', kind: 'coincident' },
    expect: { outcome: 'typed', codes: ['E_DEGENERATE'], holds: ['skeleton-valid-or-downgrade'], clause: 'F-SKELETON, coincident: two coincident holes' },
    build: buildCoincident,
  }),
]);
