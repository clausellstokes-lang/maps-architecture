// limit/cap-move-halvings' case data (M0-k-02; M0-k-04's N-2, KI-2; the hardening round S2): §3.11 the caps — "≤ 8
// halvings of a move step, then a reported no-op (§3.6)". The case drew the moved vertex p exactly minEdge (25 cm) from
// its neighbour q, inside attractCm (26 cm), so insertion attracted p onto q and the warp had nothing to halve (KI-2,
// 'the step was halved 0 times'). It now draws p D ∈ (attractCm, 32] cm from q and a drag δ ≥ 2⁸ · (D − minEdge + 1)
// toward q: the eighth halving's step still puts p at most 24 cm from q, so every strength fails §3.6's whole-step
// validation and the step is a no-op after 8 halvings, on every draw. KI-2 is gone from M0-k-04's known list.
import { describe, expect, it } from 'vitest';
import { casesAt, CONSTRUCTIVE_KNOWN, constructiveKernelJudge, type ConstructiveCase, type ConstructiveInput } from '@plat/testkit';

const ATTRACT = 26;
const MIN_EDGE = 25;
const KERNEL_DRAWS = 40;

const C = casesAt('M0').find((c) => c.id === 'limit/cap-move-halvings') as ConstructiveCase;

function input(seed: number): ConstructiveInput {
  const g = C.generate(seed);
  if (g.kind !== 'input') throw new Error(`limit/cap-move-halvings seed ${String(seed)} drew no input`);
  return g;
}

describe('limit/cap-move-halvings: p beyond attractCm, every halving failing (N-2)', () => {
  it('draws p more than attractCm from q, and a drag whose eighth halving still leaves the edge below minEdge', () => {
    for (let seed = 0; seed < 1000; seed += 1) {
      const g = input(seed);
      const [q, p] = g.chains.chain;
      const D = Math.abs(p.x - q.x) + Math.abs(p.y - q.y);
      const delta = Math.abs(Number(g.params.dragX)) + Math.abs(Number(g.params.dragY));
      expect(p.x === q.x || p.y === q.y, `seed ${String(seed)}`).toBe(true);
      if (!(D > ATTRACT)) expect.fail(`seed ${String(seed)}: p stands ${String(D)} cm from q (attractCm ${String(ATTRACT)})`);
      if (!(D - delta / 256 < MIN_EDGE - 0.5)) expect.fail(`seed ${String(seed)}: the eighth halving leaves p ${String(D - delta / 256)} cm from q`);
    }
  });

  it(`is green on the kernel: a no-op after exactly 8 halvings, on seeds 0 … ${String(KERNEL_DRAWS - 1)}`, () => {
    for (let seed = 0; seed < KERNEL_DRAWS; seed += 1) {
      let report: { applied: boolean; halvings: number } | null = null;
      const v = constructiveKernelJudge(C, input(seed), undefined, {
        step: (op, _i, run) => {
          const r = run();
          if (op === 'warp' && r.kind === 'ok') report = r.value as { applied: boolean; halvings: number };
          return r;
        },
      });
      if (!v.ok) expect.fail(`seed ${String(seed)}: ${v.reason}`);
      expect(report, `seed ${String(seed)}`).toMatchObject({ applied: false, halvings: 8 });
    }
  }, 120_000);

  it('is no known finding: the known list names no case of M0-k-02’s data (KI-2 dropped)', () => {
    expect(CONSTRUCTIVE_KNOWN.map((k) => k.id)).not.toContain('limit/cap-move-halvings');
    expect(CONSTRUCTIVE_KNOWN.filter((k) => k.owner.startsWith('M0-k-02'))).toEqual([]);
  });
});
