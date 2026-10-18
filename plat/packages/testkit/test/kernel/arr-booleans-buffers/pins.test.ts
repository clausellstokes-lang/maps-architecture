// M0-a-08's pinned agreement cases (§3.7 (i); C-0202 (5), C-0206): inputs that once broke the split agreement, judged
// against both oracles through the same judge as the fuzzed runs, so each stays fixed whatever the run's seed draws.
// * the offsetFace face of N-38's README (C-0202 (5): "the README offsetFace pin … is M0-a-08's to hold"): without §3.6
//   step 4's wedge cap a strip side is wedge-routed through a sliver corner 11 km away (|Δ| 62.7 × 10⁶ cm² against a
//   bound of 5.27 × 10⁶); with it, an attracted pass against both oracles with no wedge route;
// * the xor whose hole touches its outline inside an outline edge (C-0206 (1)): the face count compared 3 to 2
//   at |Δ| 0 while the touch point was no vertex of the outline;
// * the seven-chain ring of M0-a-05's router repro (N-37, N-41 (3)), whose seventh segment walks a retraced spur: its
//   region under either fill rule against both oracles;
// * the gate run's union of a holed quadrilateral and its translate, where b's vertex lies 0.48 cm inside a's edge
//   (C-0206 (8)): our engine routes a's edge through that vertex (a move inside the hot pixel), so the two faces touch
//   there, while the oracle's exact union joins them through a sliver 0.5 cm wide that its snap rounding keeps — equal
//   once faces touching at a point count as one;
// * the gate run's outward inset of a face at the lattice's edge (C-0206 (9)): E_OUT_OF_RANGE, settled because the
//   exact answer leaves the lattice;
// * the regular octagon inset outward by 2 866 cm (C-0261): our answer is the exact mitred inset
//   rounded once (every vertex its nearest lattice point), but the unscaled oracle construction rounded twice and put
//   clipper2's vertices 0.6 cm off, all outward — |Δ| 23 328 against the unattracted bound 22 843.7 on a correct answer.
import { faceEdges, insetRing, offsetFace, type Cm, type LatticePoint } from '@plat/kernel';
import { beforeAll, describe, expect, it } from 'vitest';
import { compareSplit, loadOracles } from '../../../src/oracles/index.js';
import { arenaFace, judgeBoolean, judgeInset, judgeOffset, newHarness, oracleInset, ringsOfEdges, warningsOf, type Harness } from './support.js';

const P = (xy: [number, number][]): LatticePoint[] => xy.map(([x, y]) => ({ x: x as Cm, y: y as Cm }));

beforeAll(async () => {
  await loadOracles();
});

/** The harness after its cases: every case judged and passed, nothing invalid, no refusal counted. */
function clean(h: Harness, op: string, n: number): void {
  expect(h.failures).toEqual([]);
  expect(h.invalid).toEqual([]);
  expect(h.refusalsCounted).toBe(0);
  const line = h.report.line(op);
  expect(line.draws).toBe(n);
  expect(line.unattractedPass + line.attractedPass).toBe(n);
}

describe('pinned agreement cases (§3.7 (i))', () => {
  it('N-38’s README offsetFace face: an attracted pass against both oracles, no wedge route (C-0202 (5))', () => {
    const h = newHarness();
    const rings = [P([[-18327, 3439], [-19626, 11462], [-4459, 10754], [-8250, 22632], [-21510, 20011], [-27735, 22460], [-25092, 15177], [-24231, 13419], [-25846, 9356], [-22453, 11000]])];
    // the README's distances follow faceEdges' order; one case, its distances given whole (cycled over the ten edges)
    judgeOffset(h, { rings, dists: [1825, 26, 1825, 26, 1825, 26, 1825, 26, 1825, 26], source: 'pin/n38-readme' });
    clean(h, 'offsetFace', 1);
    expect(h.report.line('offsetFace').attracted).toBe(1);
    const af = arenaFace(rings);
    expect(af).not.toBeNull();
    if (af === null) return;
    const d = faceEdges(af.tx, af.face).map((_, i) => [1825, 26][i % 2]);
    const ours = offsetFace(af.tx, af.face, d);
    expect(ours.ok).toBe(true);
    expect(warningsOf(ours).filter((w) => w.code === 'W_WEDGE_ROUTED')).toEqual([]);
  });

  it('the xor whose hole touches its outline inside an edge: equal face counts and no area apart (C-0206 (1))', () => {
    const h = newHarness();
    const a = [
      P([[4943, -2326], [-4457, 2334], [-9920, 1893], [-13586, -4727], [-17800, -11712], [-8407, -16825], [-1636, -14164], [1813, -10947]]),
      P([[-2426, -2515], [-3897, -1832], [-1984, -670], [-227, 237], [-864, -752]]),
    ];
    const b = [P([[8315, 36111], [7858, 36301], [7685, 36300], [7508, 36299], [7653, 36074], [7671, 36007], [7736, 35765], [8063, 35798], [8253, 36034]])];
    judgeBoolean(h, { op: 'xor', fill: 'evenodd', a, b, source: 'pin/pr-xor-touch' });
    clean(h, 'xor', 1);
    expect(h.report.line('xor').unattracted).toBe(1);
  });

  it('the seven-chain ring with its retraced spur, under either fill rule (N-41 (3))', () => {
    const h = newHarness();
    const ring = P([[-48863, 44833], [-48080, 46354], [-48522, 45607], [-48031, 46325], [-48468, 45739], [-47267, 47616], [-48140, 46382]]);
    for (const fill of ['nonzero', 'evenodd'] as const) judgeBoolean(h, { op: 'union', fill, a: [ring], b: [], source: 'pin/n41-spur' });
    clean(h, 'union', 2);
    expect(h.report.line('union').attracted).toBe(2);
    expect(h.placed.cases).toBe(2);
  });

  it('the union whose faces touch after snapping: equal once faces touching at a point count as one (C-0206 (8))', () => {
    const h = newHarness();
    const a = [
      P([[28747, 48699], [26991, 48908], [27122, 46646], [29459, 46403]]),
      P([[27748, 47375], [27496, 47328], [27227, 47472], [27245, 47648], [27458, 47733], [27558, 47720], [27696, 47663]]),
    ];
    const b = [
      P([[31005, 48709], [29249, 48918], [29380, 46656], [31717, 46413]]),
      P([[30006, 47385], [29754, 47338], [29485, 47482], [29503, 47658], [29716, 47743], [29816, 47730], [29954, 47673]]),
    ];
    judgeBoolean(h, { op: 'union', fill: 'nonzero', a, b, source: 'pin/gate-union-touch' });
    clean(h, 'union', 1);
    expect(h.report.line('union').unattracted).toBe(1);
    expect(h.snapRounded['clipper2/touch']).toBe(1);
  });

  it('the octagon inset outward by 2 866 cm: an unattracted pass against both oracles, the oracle built in a scaled frame (C-0261)', () => {
    const ring = P([[-14207, 9163], [-13985, 9255], [-13893, 9477], [-13985, 9699], [-14207, 9791], [-14429, 9699], [-14521, 9477], [-14429, 9255]]);
    const h = newHarness();
    judgeInset(h, { rings: [ring], dists: [-2866], source: 'pin/s2-octagon' });
    clean(h, 'insetRing', 1);
    expect(h.report.line('insetRing').unattracted).toBe(1);
    // the oracles' constructions now carry one rounding, as ours does: each lies well inside the bound (it stood at
    // 1.021 × the bound before the scaled frame)
    const af = arenaFace([ring]);
    expect(af).not.toBeNull();
    if (af === null) return;
    const ours = insetRing(af.tx, af.face, -2866);
    expect(ours.ok).toBe(true);
    const [face] = ringsOfEdges(faceEdges(af.tx, af.face));
    for (const e of ['clipper2', 'polygon-clipping'] as const) {
      const v = compareSplit(ours, oracleInset(face, -2866, e), warningsOf(ours));
      expect(v.pass, e).toBe(true);
      expect(v.symDiffCm2 / v.boundCm2, e).toBeLessThan(0.5);
    }
  });

  it('an outward inset leaving the lattice is E_OUT_OF_RANGE, settled (C-0206 (9))', () => {
    const h = newHarness();
    const ring = P([[8222703, 1266939], [8388126, 1419952], [8371635, 1644687], [8185648, 1771914], [7970217, 1705829], [7887566, 1496194], [7999933, 1300870]]);
    judgeInset(h, { rings: [ring], dists: [-634], source: 'pin/gate-inset-edge' });
    expect(h.failures).toEqual([]);
    expect(h.settled).toEqual({ 'E_OUT_OF_RANGE: the outward inset leaves the lattice': 1 });
    // a step inward of the lattice's edge the same face is judged, not settled
    const h2 = newHarness();
    judgeInset(h2, { rings: [ring.map((p) => ({ x: (p.x - 10_000) as Cm, y: p.y }))], dists: [-634], source: 'pin/gate-inset-edge' });
    expect(h2.settled).toEqual({});
    clean(h2, 'insetRing', 1);
  });
});
