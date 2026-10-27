// M0-a-09's fix round S17 (lane build/M0-a-09-fix-s17): the S16 closing check's two failing lines (checks/M0-a-09-s16.md;
// notes rows 142, 143). (a) B-GUARD — round S16's guard `RING_CROSSES` counted F's own walk out and back along a dangling
// chain of two or more edges as a crossing, so kerb(F), corridorUnion and bandUnion refused LAWFUL faces round S15
// committed (kerb(F) = F, one whole block; bandUnion band 4 / blocks 4): the check's probes ANT and BU, each red on round
// S16's engine and green on this tree, read exactly as round S15 read them. (b) The guard pinned on rings that truly
// cross — round S15's row-127 outline and rings running along one another off F's bridges as recorded regions
// (`splitsOn`, the read's last step), and outlines whose pieces cross through bandCore's `pieces` seam (the engine's
// write) — and the faithful read's acceptance clauses pinned by the check's own networks: "no vertex deeper than the
// first's deepest" (MA2) and `spineDepthOf`'s junction-end reading (MQ2).
import { describe, expect, it } from 'vitest';
import { idOf, type FaceId, type Plat } from '../../../src/arena/index.js';
import { bridgesOf, chainCrosses, kerbCensus, outlineCrosses, readFace, readKerb, RING_CROSSES, ringCrosses, splitsOn, type KerbRead, type Seg, type SpineWidths } from '../../../src/arr/kerb.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { bandCore, bandUnion, outlinePieces, type BandResult } from '../../../src/arr/bandUnion.js';
import { LATTICE } from '../../../src/num/index.js';
import { tx } from '../../../src/tx/index.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { AT_S9, commit, framed, healthy, network, own, P, readIn, spec, spineDepth, state, tilesExactly, way, wideNetwork, widthsOf, type Chord, type WideWay } from './support.js';

/** Rings from their "x,y x,y …" text. */
const rings = (rs: readonly string[]): LatticePoint[][] => rs.map((r) => r.split(' ').map((q) => P(Number(q.split(',')[0]), Number(q.split(',')[1]))));

/** Rings to their "x,y x,y …" text. */
const text = (rs: readonly (readonly LatticePoint[])[]): string[] => rs.map((r) => r.map((q) => `${String(q.x)},${String(q.y)}`).join(' '));

/** kerb(F) read in an L1 batch (S8's read): the read, or its refusal as "code detail". */
function readL1(p: Plat, f: FaceId, ws: SpineWidths): KerbRead | string {
  const k = readIn(p, 1, (o) => readKerb(o, f, ws));
  return k.ok ? k.value : `${k.code} ${k.detail}`;
}

/** The deepest vertex of the rings in any of the read's spines' buffers (support.ts `spineDepth`, the junction-end rule). */
function deepest(k: KerbRead): number {
  let d = -Infinity;
  for (const s of k.spines.values()) d = Math.max(d, spineDepth(k.kerb, s).depth);
  return d;
}

/** Row 127's network (hardening-s16.test.ts) with ring 1 at half-width 1: round S15's read of face 0 crossed itself. */
const ROW127: WideWay[] = [
  { kind: 'dead', a: 8307, b: 0, x: 805, y: 400, w: 300, h: 300, hw: 54, knots: [54, 7], ends: 'round' },
  { kind: 'ring', a: 0, b: 0, x: 1214, y: 2466, w: 1302, h: 300, hw: 1, knots: null, ends: 'round' },
  { kind: 'ring', a: 0, b: 0, x: 400, y: 400, w: 688, h: 304, hw: 31, knots: null, ends: 'round' },
];

/** Round S15's kerb(F) of row 127's face 0 (hardening-s16.test.ts): `… 2462,2466 1066,726` crosses `1049,704 2435,2466` properly. */
const R127 = '0,0 4000,0 4000,4000 3746,4000 3735,3966 2543,2511 2516,2466 2462,2466 1066,726 1049,704 2435,2466 1214,2466 1214,2766 2516,2766 2516,2589 3624,4000 0,4000';

describe('B-GUARD (the S16 closing check’s blocker): F’s walk out and back along a dangling chain is no crossing — kerb(F) = F and the ops commit as round S15 did', () => {
  // the check's probe ANT: the frame [0, 4000]², the faces owned by district:1, a widthless dangling chain (no width
  // entry: a way with none, a wall, a district bound) — straight or bent from the frame, or T'd off a widthless chord;
  // kerb(F) is F's walk as round S15 read it (the chain's tip edge dropped as a spike, its other edges out and back)
  const cases: { tag: string; chains: [number, number][][]; kerbs: Record<number, string[]>; whole: number[] }[] = [
    { tag: 'a one-edge chain (accepted by round S16 too: its two walk edges are neighbours)', chains: [[[2000, 0], [2000, 1500]]], kerbs: { 0: ['0,0 2000,0 2000,0 4000,0 4000,4000 0,4000'] }, whole: [0] },
    { tag: 'a two-edge straight chain', chains: [[[2000, 0], [2000, 800], [2000, 1500]]], kerbs: { 0: ['0,0 2000,0 2000,800 2000,800 2000,0 4000,0 4000,4000 0,4000'] }, whole: [0] },
    { tag: 'a two-edge bent chain', chains: [[[2000, 0], [2000, 800], [2600, 1500]]], kerbs: { 0: ['0,0 2000,0 2000,800 2000,800 2000,0 4000,0 4000,4000 0,4000'] }, whole: [0] },
    {
      tag: 'a bent chain T’d off a chord',
      chains: [[[0, 2000], [4000, 2000]], [[2000, 2000], [2000, 2800], [2500, 3300]]],
      kerbs: { 0: ['0,2000 2000,2000 2000,2800 2000,2800 2000,2000 4000,2000 4000,4000 0,4000'], 1: ['0,0 4000,0 4000,2000 2000,2000 0,2000'] },
      whole: [1, 0],
    },
  ];
  for (const role of ['way', 'wall', 'district_bound']) {
    for (const c of cases) {
      it(`${c.tag}, role ${role}: kerb(F) is F’s walk, corridorUnion commits every face whole`, () => {
        const p = framed();
        c.chains.forEach((ch, i) => way(p, `${role}:${String(i)}`, ch, [], role));
        const faces = [...new Set(own(p, 'district:1', c.chains.length > 1 ? [[100, 100], [100, 3900]] : [[100, 100]]))];
        const ws = widthsOf({});
        for (const f of faces) {
          const k = readL1(p, f, ws);
          expect(typeof k, `face ${String(f)}: ${String(k)}`).toBe('object');
          const read = k as KerbRead;
          expect(read.spines.size).toBe(0);
          expect(text(read.kerb), `face ${String(f)}`).toEqual(c.kerbs[f]);
          // the walk runs out and back along the chain: no crossing on F's bridges, a crossing without them
          const along = bridgesOf(p, read.edges);
          for (const r of read.rings) expect(ringCrosses(r, along)).toBe(false);
          if (f === 0 && c.chains[c.chains.length - 1].length > 2) expect(read.rings.some((r) => ringCrosses(r))).toBe(true);
        }
        const r = commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9);
        healthy(p);
        expect(tilesExactly(p, 2, faces)).toEqual([]);
        const v = r.value as BandResult;
        expect(v.whole).toEqual(c.whole);
        expect(v.blocks).toEqual([]);
      });
    }
  }

  for (const dead of [
    [[1000, 0], [1000, 800], [1500, 1400]],
    [[1000, 0], [1000, 700], [1000, 1400]],
  ] as [number, number][][]) {
    it(`the check’s probe BU: bandUnion of a wall over faces one of which holds a two-segment cul-de-sac way ${JSON.stringify(dead)} at hw 20 commits band 4 / blocks 4`, () => {
      const p = framed();
      way(p, 'way:0', [[0, 2000], [4000, 2000]]);
      way(p, 'way:1', dead);
      way(p, 'wall:1', [[3000, 2000], [3000, 4000]], [], 'wall');
      const faces = [...new Set(own(p, 'district:1', [[100, 100], [100, 3900], [3900, 3900]]))];
      const ws = widthsOf({ 'way:0': 30, 'way:1': 20 });
      const cu = commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9);
      healthy(p);
      expect((cu.value as BandResult).blocks.length).toBe(3);
      // the cul-de-sac's face is spine-less for the band's read (way:1 carries no wall width): its read is F's walk,
      // out and back along the cul-de-sac
      const bw = widthsOf({ 'wall:1': 50 }, ['wall']);
      for (const f of faces) {
        const k = readIn(p, 3, (o) => readKerb(o, f, bw, undefined, false));
        expect(k.ok, k.ok ? '' : `face ${String(f)}: ${k.code} ${k.detail}`).toBe(true);
      }
      const b = commit(p, 3, (o) => bandUnion(o, [{ ref: { role: 'wall', entity: 'wall:1' }, halfWidthCm: 50, ends: 'square' }], faces, 'band', 'band:1'), AT_S9);
      healthy(p);
      const v = b.value as BandResult;
      expect(v.band.length).toBe(4);
      expect(v.blocks.length).toBe(4);
      expect(v.whole).toEqual([1]);
    });
  }
});

describe('the guard on rings that truly cross (round S17): a proper crossing, or a run along one another off F’s bridges, refused RING_CROSSES', () => {
  const ring = (xs: readonly (readonly [number, number])[]): LatticePoint[] => xs.map(([x, y]) => P(x, y));
  const bridge: Seg = [P(2000, 0), P(2000, 800)];
  // runs along one another in opposite directions, the common stretch (x = 2000, y 1500 – 3000) off the bridge
  const offBridge = ring([[0, 0], [4000, 0], [4000, 4000], [2000, 4000], [2000, 1000], [2500, 1000], [2000, 1500], [2000, 3000], [1000, 3000], [0, 4000]]);
  // opposite directions, the common stretch (y 400 – 1000) running past the bridge's end (800)
  const pastBridge = ring([[0, 0], [2000, 0], [2000, 1200], [2500, 1500], [2000, 1000], [2000, 400], [1000, 1000], [0, 4000]]);
  // the SAME direction along the bridge (y 100 – 700)
  const sameWay = ring([[0, 0], [2000, 0], [2000, 800], [2300, 400], [2000, 100], [2000, 700], [1000, 1000], [0, 4000]]);
  // opposite directions along the frame's bottom edge (x 1500 – 2500): a route edge with F on one side only
  const alongFrame = ring([[0, 0], [3000, 0], [3500, 500], [2500, 0], [1500, 0], [1000, 1000], [0, 4000]]);

  it('chainCrosses / ringCrosses: a proper crossing, a run along one another off a bridge, past its end, the same way along it, along a one-sided route edge — each a crossing; out and back on a bridge none', () => {
    expect(ringCrosses(rings([R127])[0])).toBe(true);
    expect(ringCrosses(rings([R127])[0], [[P(2462, 2466), P(1066, 726)]])).toBe(true);
    for (const r of [offBridge, pastBridge, sameWay, alongFrame]) {
      expect(ringCrosses(r, [bridge])).toBe(true);
      // the same chains open (an outline piece) cross too
      expect(chainCrosses(r, false, [bridge])).toBe(true);
    }
    const walk = ring([[0, 0], [2000, 0], [2000, 800], [2600, 1500], [2000, 800], [2000, 0], [4000, 0], [4000, 4000], [0, 4000]]);
    expect(ringCrosses(walk)).toBe(true);
    expect(ringCrosses(walk, [bridge, [P(2000, 800), P(2600, 1500)]])).toBe(false);
    expect(chainCrosses(walk.slice(1, 6), false, [bridge, [P(2600, 1500), P(2000, 800)]])).toBe(false);
  });

  it('outlineCrosses: a piece crossing itself, or two pieces crossing properly, crosses; pieces meeting at a contact or running along one another do not', () => {
    const piece = (xs: readonly (readonly [number, number])[], closed = false) => ({ points: ring(xs), closed });
    expect(outlineCrosses([piece([[0, 0], [100, 100]]), piece([[0, 100], [100, 0]])])).toBe(true);
    expect(outlineCrosses([piece([[0, 0], [50, 50], [100, 0]]), piece([[100, 0], [50, -50], [0, 0]])])).toBe(false);
    expect(outlineCrosses([piece([[0, 0], [100, 0]]), piece([[100, 0], [50, 0]])])).toBe(false);
    expect(outlineCrosses([piece([[0, 0], [100, 0]]), piece([[50, 0], [50, 50]])])).toBe(false);
    expect(outlineCrosses([piece(offBridge.map((q) => [q.x, q.y] as [number, number]), true)], [bridge])).toBe(true);
    expect(outlineCrosses([piece([[0, 0], [100, 0], [100, 100], [0, 100]], true), piece([[200, 0], [300, 0], [250, 50]], true)])).toBe(false);
    // round S15's row-127 outline cut as the engine cuts it (`outlinePieces`): it crosses where (2462, 2466) → (1066, 726)
    // meets (1049, 704) → (2435, 2466), and the first of these (with (1066, 726) → (1049, 704) after it) lies within the
    // hot pixel of F's bridge — the lane's centreline between the two rings, which face 0's walk runs out and back along —
    // so it is F's boundary to the engine and the pieces it would write carry no crossing: the outline is refused where it
    // is met whole, as a recorded region (`splitsOn`, below), and the write's guard is pinned on outlines whose pieces
    // cross (the `pieces` seam, below)
    const n = wideNetwork(ROW127);
    const f = readFace(n.p, 0, widthsOf(n.table));
    const pieces = outlinePieces({ rings: f.rings, kerb: rings([R127]) } as unknown as KerbRead);
    expect(text(pieces.map((q) => q.points))).toEqual(['3746,4000 3735,3966 2543,2511 2516,2466', '1049,704 2435,2466', '2516,2589 3624,4000']);
    expect(outlineCrosses(pieces, bridgesOf(n.p, f.edges))).toBe(false);
  });

  it('bridgesOf: the route edges F walks both ways — a dangling chain’s, never the frame’s or a chord’s', () => {
    const p = framed();
    way(p, 'way:0', [[0, 2000], [4000, 2000]]);
    way(p, 'way:1', [[2000, 2000], [2000, 2800], [2500, 3300]]);
    const [upper] = own(p, 'district:1', [[100, 3900]]);
    const f = readFace(p, upper, widthsOf({}));
    const key = ([a, b]: Seg) => `${String(a.x)},${String(a.y)}>${String(b.x)},${String(b.y)}`;
    expect(bridgesOf(p, f.edges).map(key).sort()).toEqual(['2000,2000>2000,2800', '2000,2800>2000,2000', '2000,2800>2500,3300', '2500,3300>2000,2800']);
  });

  it('splitsOn (the read’s last step) on a recorded region: round S15’s row-127 outline and the rings running along one another off F’s bridges refused RING_CROSSES; F’s walk round its chain returned', () => {
    const n = wideNetwork(ROW127);
    const ws = widthsOf(n.table);
    const f = readFace(n.p, 0, ws);
    const r = splitsOn(n.p, f.edges, f.spines, rings([R127]));
    expect(r.ok ? 'ok' : `${r.code} ${r.detail}`).toBe(`E_INVARIANT ${RING_CROSSES}`);
    // a widthless bent chain from the frame (bridges (2000, 0) – (2000, 800) – (2600, 1500)): a ring running along it
    // past its end, the same way along it, or off it, crosses; F's own walk out and back along it does not
    const p = framed();
    way(p, 'way:0', [[2000, 0], [2000, 800], [2600, 1500]]);
    const [face] = own(p, 'district:1', [[100, 100]]);
    const g = readFace(p, face, widthsOf({}));
    for (const q of [offBridge, pastBridge, sameWay, alongFrame]) {
      const s = splitsOn(p, g.edges, g.spines, [q]);
      expect(s.ok ? 'ok' : `${s.code} ${s.detail}`, text([q])[0]).toBe(`E_INVARIANT ${RING_CROSSES}`);
    }
    const own0 = splitsOn(p, g.edges, g.spines, g.rings);
    expect(own0.ok, own0.ok ? '' : own0.detail).toBe(true);
  });

  /** bandCore over the network's faces with face `at`'s outline planted (its pieces cut from `kerb`), in an S9 batch. */
  function planted(p: Plat, faces: readonly FaceId[], ws: SpineWidths, at: FaceId, kerb: readonly (readonly LatticePoint[])[]) {
    return tx(p, spec(2, AT_S9), (o) =>
      bandCore(o as Parameters<typeof bandCore>[0], faces, {
        widths: ws,
        edgeRole: 'kerb',
        entityOf: (f) => idOf(p, p.faces[1].owner[f]),
        owner: null,
        vertexContacts: true,
        pieces: (read) => outlinePieces(read.face === at ? { ...read, kerb: kerb.map((r) => r.slice()) } : read),
      }),
    );
  }

  // row 127's network, face 0 (the frame's right edge x = 4000 is F's boundary): outlines planted through bandCore's
  // `pieces` seam that cross — each refused before anything is written, the arena put back; the network's own reads commit
  const crossing: { tag: string; kerb: [number, number][][] }[] = [
    {
      tag: 'a fold: down x = 3000 from the frame and later up it again (y 1500 – 3000), no proper crossing',
      kerb: [[[0, 0], [4000, 0], [4000, 4000], [3000, 4000], [3000, 1000], [3500, 1000], [3000, 1500], [3000, 3000], [2900, 3000], [0, 4000]]],
    },
    {
      tag: 'two pieces crossing each other properly (each simple, the frame between them)',
      kerb: [[[0, 0], [4000, 0], [4000, 500], [3000, 1200], [4000, 1000], [4000, 1500], [3400, 600], [4000, 3000], [4000, 4000], [0, 4000]]],
    },
    {
      tag: 'an island crossing itself (a bow-tie)',
      kerb: [
        [[0, 0], [4000, 0], [4000, 4000], [0, 4000]],
        [[2000, 3000], [2400, 3400], [2400, 3000], [2000, 3400]],
      ],
    },
  ];
  for (const c of crossing) {
    it(`bandCore’s \`pieces\` seam (the engine’s write): ${c.tag} — refused RING_CROSSES, the arena put back`, () => {
      const n = wideNetwork(ROW127);
      const ws = widthsOf(n.table);
      const b0 = state(n.p);
      const r = planted(n.p, n.faces, ws, 0, c.kerb.map((q) => ring(q)));
      expect(r.ok ? 'ok' : `${r.code} ${r.detail}`).toBe(`E_INVARIANT ${RING_CROSSES}`);
      expect(state(n.p)).toBe(b0);
      const again = tx(n.p, spec(2, AT_S9), (o) =>
        bandCore(o as Parameters<typeof bandCore>[0], n.faces, { widths: ws, edgeRole: 'kerb', entityOf: (f) => idOf(n.p, n.p.faces[1].owner[f]), owner: null, vertexContacts: true }),
      );
      expect(again.ok, again.ok ? '' : `${again.code} ${again.detail}`).toBe(true);
      healthy(n.p);
    });
  }
});

describe('the faithful read’s acceptance pinned on the S16 check’s networks (notes row 143)', () => {
  // MA2: "no vertex of the faithful read deeper than the first's deepest" — on these two widened networks the faithful
  // read has less excess but a deeper vertex than the first (26.77 → 26.84 cm, 29.00 → 30.82 cm): it is tried, not taken
  const ma2: { ways: WideWay[]; face: FaceId; depth: number }[] = [
    {
      ways: [
        { kind: 'dead', a: 12499, b: 14958, x: 2619, y: 1175, w: 836, h: 1165, hw: 173, knots: null, ends: 'round' },
        { kind: 'bent', a: 9939, b: 1192, x: 1717, y: 2100, w: 455, h: 2000, hw: 27, knots: null, ends: 'square' },
      ],
      face: 0,
      depth: 26.77,
    },
    {
      ways: [
        { kind: 'ring', a: 2943, b: 11209, x: 690, y: 1331, w: 1075, h: 1924, hw: 29, knots: null, ends: 'round' },
        { kind: 'dead', a: 10580, b: 3525, x: 2566, y: 3647, w: 1063, h: 1443, hw: 219, knots: null, ends: 'square' },
        { kind: 'dead', a: 11638, b: 8673, x: 1604, y: 1122, w: 756, h: 470, hw: 136, knots: null, ends: 'round' },
      ],
      face: 1,
      depth: 29.0,
    },
  ];
  for (const [i, c] of ma2.entries()) {
    it(`widened network ${String(i + 1)} face ${String(c.face)}: the faithful read, deeper than the first, is not taken — the first read stands (${c.depth.toFixed(2)} cm)`, () => {
      const n = wideNetwork(c.ways);
      const k = readL1(n.p, c.face, widthsOf(n.table));
      expect(typeof k, String(k)).toBe('object');
      expect(kerbCensus(n.p)?.faithful).toBe('tried');
      expect(deepest(k as KerbRead)).toBeCloseTo(c.depth, 2);
    });
  }

  // MQ2: `spineDepthOf`'s junction-end reading (a vertex within attractCm of a junction end's line, or beyond it in the
  // end's reach, is no depth) — on this chord network face 3's read is taken faithfully and holds no vertex deeper than
  // 17 cm by that reading; read without it (the mutant), the faithful read is judged by depths at the T-junction and a
  // read 29.64 cm deep stands
  it('chord network [{11837 → 7983 hw 17}, {10067 → 44 profile 213 → 216}, {13877 → 1400 hw 30 square}] face 3: the faithful read taken, no vertex deeper than attractCm', () => {
    const chords: Chord[] = [
      { a: 11_837, b: 7983, hw: 17, knots: null, ends: 'round' },
      { a: 10_067, b: 44, hw: 369, knots: [213, 216], ends: 'round' },
      { a: 13_877, b: 1400, hw: 30, knots: null, ends: 'square' },
    ];
    const n = network(chords);
    const k = readL1(n.p, 3, widthsOf(n.table));
    expect(typeof k, String(k)).toBe('object');
    expect(kerbCensus(n.p)?.faithful).toBe('taken');
    expect(deepest(k as KerbRead)).toBeLessThanOrEqual(LATTICE.attractCm);
    expect(deepest(k as KerbRead)).toBeCloseTo(17, 2);
  });
});
