// The edge suite's hardening round S1 (M0-x-06; lane build/M0-x-06-fix-s1): the round's unit pins, each red without its
// fix — on fabricated or synthetic input, so each branch is held whatever the stages do today:
//   * Q87: the fixtures' generated records carry @plat/model's one lifecycle builder's stamp (`generatedLifecycle`), and
//     no hand-written copy of it stands in the folder's sources;
//   * note 4: cliff × frame judges the hydrology grid S1 STORED with the terrain (`terrain.hydro`), never one it derives;
//   * note 5: bridge × frame's judge holds "every built span inside the frame" on fabricated sites (the committed stages
//     build spans inside only; repins.test.ts replays seeds where S4 builds one);
//   * note 12: S6's cell checks the kind's SHAPE on the boundary it degrades, not its vertex count alone;
//   * c2-2: S8's cell rollback — a refused S8 restored by the kernel's savepoint and judged on the print — held on a
//     fabricated refusal (S8 refuses on no seed of the committed stage).
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { err, ok, STAGES, type KernelResult, type KernelTx, type LatticePoint } from '@plat/kernel';
import { generatedLifecycle, type Terrain } from '@plat/model';
import { bridgeFrameJudge, frameRasterProblems } from '../../src/edge/cells.js';
import { s8CellRun, type S8StageLike } from '../../src/edge/ep01.js';
import { DEGENERATE_KINDS, degenerateRing, kindLaidProblem, ringKindProblem, type DegenerateKind } from '../../src/edge/kinds.js';
import { s8State } from '../../src/edge/s8.js';

const SRC = fileURLToPath(new URL('../../src/edge/', import.meta.url));

describe("Q87: the generated lifecycle is @plat/model's builder's", () => {
  it("s8State's ways and districts carry generatedLifecycle(0), value for value", () => {
    for (const kind of [null, ...DEGENERATE_KINDS] as const) {
      const st = s8State(5, kind);
      expect(st.input.ways.length).toBeGreaterThan(0);
      for (const w of st.input.ways) expect(w.lifecycle, w.id).toEqual(generatedLifecycle(0));
      for (const d of st.input.districts) expect(d.district.lifecycle, d.district.id).toEqual(generatedLifecycle(0));
    }
  });
  it('no source file of the folder spells the generated stamp by hand; s8.ts and rows.ts call the builder', () => {
    const files = readdirSync(SRC).filter((f) => f.endsWith('.ts'));
    expect(files.length).toBeGreaterThan(10);
    for (const f of files) {
      const text = readFileSync(`${SRC}${f}`, 'utf8');
      expect(/existence\s*:\s*['"]generated['"]/.test(text), f).toBe(false);
    }
    for (const f of ['s8.ts', 'rows.ts']) expect(readFileSync(`${SRC}${f}`, 'utf8'), f).toMatch(/generatedLifecycle\(0\)/);
  });
});

describe("note 4: cliff × frame reads the hydrology grid S1 stored (terrain.hydro)", () => {
  // a synthetic terrain: a 100 m raster over [−5 000, 5 000]² m and its stored 200 m hydrology grid, both covering a
  // frame + margin box of [−4 950, 4 950]² m (less than one cell past it on each side)
  const box = { x0: -495_000, y0: -495_000, x1: 495_000, y1: 495_000 };
  const terrain = (hydro: { originX: number; originY: number; cellCm: number; cols: number; rows: number }): Terrain =>
    ({ cellCm: 10_000, cols: 100, rows: 100, originX: -500_000, originY: -500_000, hydro }) as unknown as Terrain;
  const stored = { originX: -500_000, originY: -500_000, cellCm: 20_000, cols: 50, rows: 50 };
  it('a stored grid over frame + margin and nothing beyond: no problem', () => {
    expect(frameRasterProblems(terrain(stored), box)).toEqual([]);
  });
  it('a stored grid reaching a cell beyond the ring is seen (the raster unchanged)', () => {
    const p = frameRasterProblems(terrain({ ...stored, originX: -520_000, cols: 51 }), box);
    expect(p).toEqual(['the hydrology grid stores a cell beyond the outer ring']);
  });
  it('a stored grid short of the margin is seen (the raster unchanged)', () => {
    const p = frameRasterProblems(terrain({ ...stored, cols: 49 }), box);
    expect(p).toEqual(['the hydrology grid [-500000, 480000] × [-500000, 500000] does not cover frame + margin']);
  });
});

describe("note 5: bridge × frame's judge on fabricated sites", () => {
  const frame = { x0: -1_000, y0: -1_000, x1: 1_000, y1: 1_000 };
  const inside = [{ x: -100, y: 0 }, { x: 100, y: 0 }];
  const across = [{ x: 900, y: 0 }, { x: 1_100, y: 0 }];
  it('a built span inside the frame passes and is counted; a site beyond it, unbuilt and unspannable, is the precondition', () => {
    const j = bridgeFrameJudge([{ id: 'bridge:0', state: 'built', ends: inside }, { id: 'bridge:1', state: 'site', ends: across }], [{ id: 'bridge:0', a: inside[0], b: inside[1] }], new Set(['bridge:0']), frame);
    expect(j).toEqual({ problems: [], beyond: 1, built: 1, builtInside: 1 });
  });
  it('a built span with a deck end beyond the frame is named; so is a spannable one, and a site with no deck ends', () => {
    const j = bridgeFrameJudge([{ id: 'bridge:1', state: 'built', ends: across }, { id: 'bridge:2', state: 'site', ends: null }], [{ id: 'bridge:1', a: across[0], b: across[1] }], new Set(['bridge:1']), frame);
    expect(j.problems).toEqual(['the deck bridge:1, which S4 can span, has an end outside the frame', 'bridge:1 (built): a deck end lies outside the frame', 'bridge:1: a deck end lies outside the frame, yet S4 can span it', "bridge:2's deck ends resolve to no two vertices"]);
    expect(j.built).toBe(1);
    expect(j.builtInside).toBe(0);
    // built alone (not spannable): still named
    expect(bridgeFrameJudge([{ id: 'bridge:1', state: 'built', ends: across }], [], new Set(), frame).problems).toEqual(['bridge:1 (built): a deck end lies outside the frame']);
  });
});

describe("note 12: S6's cell checks the kind's shape on the boundary", () => {
  const sq = [{ x: 0, y: 0 }, { x: 4_000, y: 0 }, { x: 4_000, y: 4_000 }, { x: 0, y: 4_000 }] as LatticePoint[];
  it("every kind's degraded ring carries its kind's shape, and the plain ring none", () => {
    for (const k of DEGENERATE_KINDS) {
      expect(ringKindProblem(degenerateRing(sq, k), k), k).toBeNull();
      expect(kindLaidProblem(sq, degenerateRing(sq, k), k), k).toBeNull();
      expect(ringKindProblem(sq, k), k).not.toBeNull();
    }
  });
  it("a vertex added that is not the kind's shape is not the kind laid (the vertex count alone is never enough)", () => {
    // the square with a vertex added off its line: one more vertex, no degenerate shape
    const notch = [sq[0], { x: 2_000, y: 500 }, ...sq.slice(1)] as LatticePoint[];
    for (const k of DEGENERATE_KINDS) expect(kindLaidProblem(sq, notch, k), k).toMatch(new RegExp(`^the boundary was not made ${k}: `));
    // another kind's shape is not this kind's
    expect(kindLaidProblem(sq, degenerateRing(sq, 'zero-area'), 'self-touching')).toMatch(/no pinch/);
    expect(kindLaidProblem(sq, degenerateRing(sq, 'self-touching'), 'zero-area')).toMatch(/no antenna/);
    expect(kindLaidProblem(sq, degenerateRing(sq, 'collinear'), 'coincident')).toMatch(/given twice round/);
    expect(kindLaidProblem(sq, degenerateRing(sq, 'zero-length'), 'collinear')).toMatch(/strictly between/);
    // no vertex added: not laid
    for (const k of DEGENERATE_KINDS) expect(kindLaidProblem(sq, sq, k), k).toMatch(/no vertex added/);
  });
});

describe("c2-2: S8's cell rollback on a fabricated refusal", () => {
  const spec: KernelTx = { key: { layer: 'ground', part: 0 }, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S8 as never }, stage: STAGES.S8 as never, rederivesFrom: STAGES.S8 as never, workLimit: 100_000_000 };
  /** A stage that commits one way of its own inside the east district, then refuses (`poke` instead moves a vertex
   * behind the kernel, the version untouched, then refuses). */
  const fabricated = (st: ReturnType<typeof s8State>, mode: 'commit' | 'poke'): S8StageLike => ({
    inputsOf: (m) => m,
    run: (): KernelResult<unknown> => {
      if (mode === 'commit') {
        const x = st.arterialX + 300;
        const r = st.kernel.tx(spec, (o) => st.kernel.geom.insertChain(o, [{ x, y: 300 }, { x: x + 400, y: 300 }] as LatticePoint[], [{ role: 'way', entity: 'way:fab' }], 'mandatory'));
        expect(r.ok).toBe(true);
      } else {
        st.plat.vertices.x[0] += 1;
      }
      return err('E_INVARIANT', 'a fabricated refusal');
    },
  });
  it('a refusal after a committed batch is rolled back to the bit (refused-safe for an unlawful kind, refused-lawful for a lawful one)', () => {
    for (const [kind, handling] of [['zero-area', 'refused-safe'], ['zero-length', 'refused-lawful']] as const) {
      const st = s8State(7, kind as DegenerateKind);
      const version = st.plat.version;
      const o = s8CellRun(st, fabricated(st, 'commit'), st.input, kind, 7, null);
      expect(o.problems).toEqual([]);
      expect(o.handling).toBe(handling);
      expect(o.rung).toBe('E_INVARIANT');
      expect(o.facts.arenaRestored).toBe(true);
      expect(st.plat.version).toBe(version);
      if (handling === 'refused-lawful') expect(o.lawful?.map((l) => [l.stage, l.code, l.where])).toEqual([['S8', 'E_INVARIANT', 'home']]);
      else expect(o.lawful).toBeUndefined();
    }
  });
  it("a refusal that leaves the print changed is off, the rollback named as not holding (never a pass)", () => {
    const st = s8State(7, 'zero-area');
    const o = s8CellRun(st, fabricated(st, 'poke'), st.input, 'zero-area', 7, null);
    expect(o.handling).toBe('off');
    expect(o.facts.arenaRestored).toBe(false);
    expect(o.problems.some((p) => /^S8 refused E_INVARIANT and its arena is not bit-identical to its start after the runner's rollback/.test(p))).toBe(true);
  });
  it('an S8 that runs ok is judged on its output, not on the rollback', () => {
    const st = s8State(7, null);
    const o = s8CellRun(st, { inputsOf: (m) => m, run: () => ok({ blocks: [], infill: { report: { districts: [], refused: [] } } }) }, st.input, 'zero-area', 7, null);
    expect(o.problems).toContain('S8 made no block');
  });
});
