// S1's declared stage-end hard row `references-resolve` (§3.10's stored-reference row; §5.3; §5.4's
// `ReportSink.invariant`; C-0310): the row is EVALUATED at S1's end — every reference the water batch committed (the
// margin, each body's face and shore, each bridge's two deck_end vertices, each land component's face) resolving in the
// committed arena, and no geometry carrying an entity the stage does not hold — and its evaluation is reported through
// the context's sink, so a report line that says pass with count 0 can never mean the row never ran. A planted breach (the test's own hook on the façade's stage-end index rebuild, which runs
// after the water batch commits and before the row: a deck_end row removed — a dangling VertexRef — or a shore row
// naming an entity no output holds) refuses the stage E_INVARIANT with the row named first, its evaluation counted and
// failed; the honest twin reports one evaluation, passing, with zero problems. Run under a hand-built StageContext
// (C-0123), the sink a stand-in for the runner's (its count and pass rule, and its refusal of an undeclared row name).
import { addRole, checkStageEnd, handleOf, isFaceLive, isHalfEdgeLive, removeRoleRow, roleIdOf, rowKey, rowsOfKey, rowsOn, setFaceOwner, type Kernel, type Plat } from '@plat/kernel';
import type { Bridge, StageContext } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { GROUND_KEY, type SiteEnv } from '../../src/terrain/index.js';
import { REFERENCES_ROW, runS1, s1Stage, type S1Input } from '../../src/water/index.js';
import { ground, heldRefs, riverFixture, type RiverFixture } from './support.js';

/** A 100 ha CITY frame with a river, a tributary and the basic estuary (stage.test.ts's fixture: four or more sites). */
function fixture(seed = 2): RiverFixture {
  return riverFixture(seed, { relief: 'rolling' }, { tributaries: [{}], mouth: 'estuary' }, { areaHa: 100 });
}

/**
 * A planted breach of the committed arena: a bridge's deck_end row removed, or a shore row naming a ghost body; and
 * (note 16) the terrain's margin rows removed, or a land component's or the river's faces left with no owner.
 */
type Breach = 'dangling' | 'dead' | 'margin' | 'land' | 'river';

/** The runner's line for one declared row (§5.4): every evaluation counted, pass while none failed. */
interface Line {
  name: string;
  pass: boolean;
  count: number;
}

/**
 * A context whose report sink keeps the runner's line per declared row of s1Stage (count and pass as the runner's
 * `GenerationReport.stages[].invariants`; an undeclared name refused as the runner refuses it) and the raw calls.
 */
function recording(fx: RiverFixture): { ctx: StageContext<SiteEnv>; lines: Line[]; calls: [string, boolean][] } {
  const lines: Line[] = s1Stage().invariants.map((r) => ({ name: r.name, pass: true, count: 0 }));
  const calls: [string, boolean][] = [];
  const report = {
    invariant(name: string, pass: boolean): void {
      calls.push([name, pass]);
      const line = lines.find((l) => l.name === name);
      if (line === undefined) throw new RangeError(`report: stage S1 declares no invariant '${name}'`);
      line.count += 1;
      if (!pass) line.pass = false;
    },
    warning(): void {},
  };
  return { ctx: { ...fx.ctx, report }, lines, calls };
}

/** Plants the breach in the arena S1 just committed. */
function plant(p: Plat, how: Breach): void {
  if (how === 'dangling') {
    const rows = rowsOfKey(p, roleIdOf('deck_end'), handleOf(p, 'bridge:0'), 1);
    expect(rows).toHaveLength(1);
    removeRoleRow(p, rows[0]);
    return;
  }
  if (how === 'margin') {
    const rows = rowsOfKey(p, roleIdOf('margin'), handleOf(p, 'terrain:ground'), 0);
    expect(rows.length).toBeGreaterThan(3);
    for (const r of rows) removeRoleRow(p, r);
    return;
  }
  if (how === 'land' || how === 'river') {
    const owner = handleOf(p, how === 'land' ? 'land:0' : 'water:river:0');
    let n = 0;
    for (let f = 0; f < p.slots.face[0].top; f += 1) {
      if (!isFaceLive(p, 0, f) || p.faces[0].owner[f] !== owner) continue;
      setFaceOwner(p, 0, f, -1);
      n += 1;
    }
    expect(n).toBeGreaterThan(0);
    return;
  }
  for (let h = 0; h < 2 * p.slots.pair.top; h += 1) {
    if (isHalfEdgeLive(p, h) && rowsOn(p, 'edge', h).some((r) => rowKey(p, r).role === 'shore')) {
      addRole(p, h, { role: 'shore', entity: 'water:ghost' }, 0);
      return;
    }
  }
  throw new Error('no shore edge to plant on');
}

/** S1 on the fixture over a fresh arena; with `how`, the façade's stage-end rebuild plants that breach after the commit. */
function runOn(fx: RiverFixture, ctx: StageContext<SiteEnv>, how?: Breach): { r: ReturnType<typeof runS1>; plat: Plat; planted: number } {
  const g = ground(fx.frame);
  let planted = 0;
  const index = {
    ...g.kernel.index,
    rebuildAtStageEnd: ((key, district) => {
      const n = g.kernel.index.rebuildAtStageEnd(key, district);
      if (how !== undefined) {
        plant(g.plat, how);
        planted += 1;
      }
      return n;
    }) as Kernel['index']['rebuildAtStageEnd'],
  };
  const kernel: Kernel = { ...g.kernel, index };
  const input: S1Input = { terrain: fx.terrain, water: fx.water, kernel, mouth: 'estuary' };
  return { r: runS1(input, ctx), plat: g.plat, planted };
}

describe('Q31: S1 evaluates and reports its declared stage-end row references-resolve', () => {
  it('the honest twin: one evaluation reported, passing (the line reads pass with count 1); the row finds zero problems over the committed references', { timeout: 300_000 }, () => {
    const fx = fixture();
    const { ctx, lines, calls } = recording(fx);
    const { r, plat, planted } = runOn(fx, ctx);
    expect(planted).toBe(0);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(calls).toEqual([['references-resolve', true]]);
    expect(lines).toEqual([{ name: 'references-resolve', pass: true, count: 1 }]);
    expect(r.value.water.bridges.length).toBeGreaterThan(1);
    const { refs, live } = heldRefs(fx.terrain.id, r.value);
    const row = checkStageEnd(plat, { refs, isLive: (id) => live.has(id) }).find((x) => x.name === 'references-resolve');
    expect(row?.problems).toEqual([]);
    expect(row?.subjects).toBeGreaterThan(refs.length);
    expect(r.value.report.stageEnd.find((x) => x.name === 'references-resolve')).toMatchObject({ holds: true });
  });

  for (const how of ['dangling', 'dead'] as const) {
    it(`a planted breach (${how}): the row is evaluated once and fails, and S1 is refused E_INVARIANT naming the row first`, { timeout: 300_000 }, () => {
      const fx = fixture();
      const outfallsBefore = fx.terrain.outfalls.length;
      const { ctx, lines, calls } = recording(fx);
      const { r, planted } = runOn(fx, ctx, how);
      expect(planted).toBe(1);
      expect(r.ok).toBe(false);
      if (r.ok) return;
      expect(r.code).toBe('E_INVARIANT');
      expect(r.detail.startsWith('references-resolve: ')).toBe(true);
      expect(r.detail).toContain(how === 'dangling' ? 'the stored reference {"role":"deck_end","entity":"bridge:0","ordinal":1} finds no geometry' : 'geometry carries the dead entity water:ghost');
      expect(calls).toEqual([['references-resolve', false]]);
      expect(lines).toEqual([{ name: 'references-resolve', pass: false, count: 1 }]);
      // the refused stage writes no outfalls (S1 (9) follows the row)
      expect(fx.terrain.outfalls.length).toBe(outfallsBefore);
    });
  }

  // note 16: the row's other subject classes, each planted alone — the terrain's margin, a land component's face, the
  // river's face — each refused row-first, naming the reference that finds no geometry
  for (const [how, ref] of [
    ['margin', '{"role":"margin","entity":"terrain:ground"}'],
    ['land', '{"owner":"land:0","level":0}'],
    ['river', '{"owner":"water:river:0","level":0}'],
  ] as const) {
    it(`note 16: a planted breach (${how}): S1 is refused E_INVARIANT naming the row first and the reference ${ref}`, { timeout: 300_000 }, () => {
      const fx = fixture();
      const { ctx, lines } = recording(fx);
      const { r, planted } = runOn(fx, ctx, how);
      expect(planted).toBe(1);
      expect(r.ok).toBe(false);
      if (r.ok) return;
      expect(r.code).toBe('E_INVARIANT');
      expect(r.detail.startsWith('references-resolve: ')).toBe(true);
      expect(r.detail).toContain(`the stored reference ${ref} finds no geometry`);
      expect(lines).toEqual([{ name: 'references-resolve', pass: false, count: 1 }]);
    });
  }

  it('notes 2 and 6: an input Bridge whose deck_end vertices resolve to nothing refuses S1 E_INVARIANT at the stage\'s end, and the stage\'s own sites are numbered after the input\'s bridges (bridge:1 first)', { timeout: 300_000 }, () => {
    const fx = fixture();
    const ghost: Bridge = {
      id: 'bridge:0',
      state: 'site',
      way: null,
      deck: [
        { role: 'deck_end', entity: 'bridge:0', ordinal: 0 },
        { role: 'deck_end', entity: 'bridge:0', ordinal: 1 },
      ],
      over: 'river',
      spanCm: 2000 as Bridge['spanCm'],
      lifecycle: { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } },
    };
    const { ctx, lines } = recording(fx);
    const g = ground(fx.frame);
    const r = runS1({ terrain: fx.terrain, water: { bodies: fx.water.bodies, bridges: [ghost] }, kernel: g.kernel, mouth: 'estuary' }, ctx);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    expect(r.detail.startsWith('references-resolve: ')).toBe(true);
    expect(r.detail).toContain('the stored reference {"role":"deck_end","entity":"bridge:0","ordinal":0} finds no geometry');
    expect(lines).toEqual([{ name: 'references-resolve', pass: false, count: 1 }]);
    // the water batch committed its sites from bridge:1 on: no deck_end of bridge:0 in the arena, bridge:1's two resolving
    expect(rowsOfKey(g.plat, roleIdOf('deck_end'), handleOf(g.plat, 'bridge:0'), 0)).toEqual([]);
    for (const e of [0, 1]) {
      const res = g.kernel.resolve({ role: 'deck_end', entity: 'bridge:1', ordinal: e }, GROUND_KEY);
      expect(res.view === 'vertices' && res.vertices.length).toBe(1);
    }
  });

  it('a context with no sink still evaluates the row: the breach is refused all the same, the honest run commits', { timeout: 300_000 }, () => {
    const fx = fixture();
    const bare = { ...fx.ctx, report: undefined };
    const bad = runOn(fx, bare, 'dangling').r;
    expect(bad.ok).toBe(false);
    if (!bad.ok) expect(bad.detail.startsWith('references-resolve: ')).toBe(true);
    expect(runOn(fixture(), { ...fixture().ctx, report: null }).r.ok).toBe(true);
  });

  it('the Stage form: the declared row is REFERENCES_ROW, and s1Stage().run reports exactly the rows it declares, once each', { timeout: 300_000 }, () => {
    const st = s1Stage();
    expect(st.invariants).toEqual([REFERENCES_ROW]);
    expect(REFERENCES_ROW).toEqual({ name: 'references-resolve', scope: 'stage', class: 'hard', kind: 'check', check: 'references-resolve' });
    expect(Object.isFrozen(REFERENCES_ROW)).toBe(true);
    const fx = fixture();
    const { ctx, lines } = recording(fx);
    const g = ground(fx.frame);
    const r = st.run(st.inputsOf({ terrain: fx.terrain, water: fx.water, kernel: g.kernel, mouth: 'estuary' }, { kind: 'all' }), ctx);
    expect(r.ok).toBe(true);
    expect(lines.map((l) => [l.name, l.count, l.pass])).toEqual(st.invariants.map((i) => [i.name, 1, true]));
  });
});
