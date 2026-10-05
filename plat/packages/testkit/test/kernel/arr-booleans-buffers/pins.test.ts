// M0-a-08's pinned agreement cases (§3.7 (i); C-0202 (5), C-0206): inputs that once broke the split agreement, judged
// against both oracles through the same judge as the fuzzed runs, so each stays fixed whatever the run's seed draws.
// * the offsetFace face of N-38's README (C-0202 (5): "the README offsetFace pin … is M0-a-08's to hold"): a strip side
//   was wedge-routed through a sliver corner 11 km away before M0-a-05's wedge cap (|Δ| 62.7 × 10⁶ cm² against a bound
//   of 5.27 × 10⁶); now an attracted pass against both oracles with no wedge route;
// * the PR run's xor whose hole touches its outline inside an outline edge (C-0206 (1)): the face count compared 3 to 2
//   at |Δ| 0 while the touch point was no vertex of the outline;
// * the seven-chain ring of M0-a-05's router repro (N-37, N-41 (3)), whose seventh segment walks a retraced spur: its
//   region under either fill rule against both oracles.
import { faceEdges, offsetFace, type Cm, type LatticePoint } from '@plat/kernel';
import { beforeAll, describe, expect, it } from 'vitest';
import { loadOracles } from '../../../src/oracles/index.js';
import { arenaFace, judgeBoolean, judgeOffset, newHarness, warningsOf, type Harness } from './support.js';

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
});
