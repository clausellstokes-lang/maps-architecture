// M0-e-06's receipts on hand-built arenas (the session's hardening round S2; checks/M0-e-06-notes.md notes 6, 15 and 16):
// cases no derivation of the spike's fixtures holds today, each laid through the kernel's own writers on a fresh arena
// and read back by the harness's receipt beside an independent reading through the façade's views — never a verdict
// of the code under test alone:
// * note 15 — the chord half of the strict reading: a wet wall side carrying exactly one `wall_gate` row of its gate,
//   whose two `gate_end` refs both resolve, but which does not join them (the gate's line split in the water, one end of
//   each wet edge off the gate's bank pins) reads ungated, while the same crossing laid as one chord reads gated;
// * note 16 — a wet wall side two enceintes share (two `wall` rows) gated by one enceinte's water gate is that
//   enceinte's alone; with no gate naming it, it stays in both enceintes' rows, ungated (fail-closed);
// * note 6 — a holed district face reaches the skeleton corpus whole: the outer ring and its hole, the corpus's counts
//   those of the face's every ring.
import { attachIndex, createKernel, createPlat, dest, err, isHalfEdgeLive, rowKey, rowsOn, STAGES, type Kernel, type KernelTx, type LatticePoint, type Plat, type PlatKey, type StageId } from '@plat/kernel';
import type { Gate, WaterSet } from '@plat/model';
import type { S3Commit, S3Slice, S6Output } from '@plat/layout';
import { describe, expect, it } from 'vitest';
import { skeletonCorpus } from '../../src/skeleton/runner.js';
import { corpusReceipt, foldGroup, spikeFaces, waterGateReceipt, type RunRecord, type S5Walls, type WaterGateReceipt } from '../../src/site/index.js';

const GROUND: PlatKey = { layer: 'ground', part: 0 } as PlatKey;
const P = (x: number, y: number): LatticePoint => ({ x, y }) as LatticePoint;

/** A fresh 1 km² arena (no margin) and its kernel. */
function arena(): { p: Plat; k: Kernel } {
  const p = createPlat(GROUND, { widthCm: 100_000, heightCm: 100_000, aspect: 1, marginShare: 0 } as never);
  attachIndex(p, { gridCellCm: 5000 });
  const k = createKernel(new Map([[GROUND, p]]), { spineWidths: () => null });
  // the L0 outer ring (S1's first write, as `commitOuterRing` lays it): every later face lies inside it
  const outer = [P(-45_000, -45_000), P(45_000, -45_000), P(45_000, 45_000), P(-45_000, 45_000)];
  const r = k.tx(batch(0, STAGES.S1), (o) => k.geom.insertChain(o, outer, [{ role: 'margin', entity: 'terrain:hand' }], 'mandatory', { closed: true }));
  if (!r.ok) throw new Error(`hand.test: the outer ring was refused: ${r.code} ${r.detail}`);
  return { p, k };
}

function batch(level: 0 | 1, stage: number): KernelTx {
  return { key: GROUND, level, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: stage as StageId }, stage: stage as StageId, rederivesFrom: stage as StageId, workLimit: 10_000_000 };
}

/** A 40 m river band x −20 … 20 m, y −400 … 400 m, with shore vertices at A (−20, 0) m and B (20, 0) m. */
const A = P(-2000, 0);
const B = P(2000, 0);
const RIVER = [P(-2000, -40000), P(2000, -40000), B, P(2000, 40000), P(-2000, 40000), A];

function river(k: Kernel): WaterSet {
  const id = 'water:river:0';
  const r = k.tx(batch(0, STAGES.S1), (o) => {
    const a = k.geom.insertChain(o, RIVER, [{ role: 'shore', entity: id }, { role: 'bank', entity: id }], 'mandatory', { closed: true, pinned: RIVER.map((_, i) => i) });
    if (!a.ok) return err(a.code, a.detail);
    const loc = k.geom.pointLocate(GROUND, 0, P(0, 10_000));
    if (loc.on !== 'face') throw new Error('hand.test: no water face');
    return k.geom.setOwner(o, [loc.face], id);
  });
  if (!r.ok) throw new Error(`hand.test: the river was refused: ${r.code} ${r.detail}`);
  return { bodies: [{ id, kind: 'river', face: { owner: id, level: 0 }, shore: { role: 'shore', entity: id } }], bridges: [] } as unknown as WaterSet;
}

/** An open wall chain of `enceinte` at L1; with `gate`, its gate_end knots at A (0) and B (1) and its wall_gate from A to B. */
function wall(k: Kernel, enceinte: string, line: readonly LatticePoint[], gate?: string): void {
  const at = (q: LatticePoint): number => line.findIndex((x) => x.x === q.x && x.y === q.y);
  const knots = gate === undefined ? [] : [{ index: at(A), role: 'gate_end', ordinal: 0, entity: gate }, { index: at(B), role: 'gate_end', ordinal: 1, entity: gate }];
  const chain = { role: 'wall', entity: enceinte };
  const r = k.tx(batch(1, STAGES.S5), (o) => {
    const ins = k.geom.insertChain(o, line, [chain], 'mandatory', { pinned: line.map((_, i) => i), knots });
    if (!ins.ok) return err(ins.code, ins.detail);
    if (gate !== undefined) {
      const g = k.geom.retypeEdges(o, { chain, from: { role: 'gate_end', entity: gate, ordinal: 0 }, to: { role: 'gate_end', entity: gate, ordinal: 1 } }, [{ role: 'wall_gate', entity: gate }], []);
      if (!g.ok) return err(g.code, g.detail);
    }
    return { ok: true as const, value: undefined, warnings: [] };
  });
  if (!r.ok) throw new Error(`hand.test: the wall of ${enceinte} was refused: ${r.code} ${r.detail}`);
}

function waterGate(id: string, enceinte: string): Gate {
  return { id, kind: 'water', enceinte, way: null, banks: [{ role: 'gate_end', entity: id, ordinal: 0 }, { role: 'gate_end', entity: id, ordinal: 1 }], bankAt: [A, B] } as unknown as Gate;
}

function enceinte(id: string, stage: number): S3Commit['enceinte'] {
  return { id, stage, strips: { inner: { owner: `strip:${id}:inner`, level: 1 }, outer: { owner: `strip:${id}:outer`, level: 1 } } } as unknown as S3Commit['enceinte'];
}

/** Stage 1's commit with its water gates, and a slice with no gate site (N unchanged at 0). */
function commitOf(gates: readonly Gate[]): { commit: S3Commit; slice: S3Slice } {
  return { commit: { enceinte: enceinte('enceinte:1', 1), waterGates: [...gates], gates: [] } as unknown as S3Commit, slice: { gateSites: [] } as unknown as S3Slice };
}

/** A record carrying only the water-gate receipt (every other receipt absent), for the fold's verdict. */
function recordOf(w: WaterGateReceipt): RunRecord {
  return { fixture: 'hand', config: 'default', seed: 1, stages: {}, bugs: [], hydro: null, rivers: [], riverRequested: [], relief: null, waterGates: w, bridges: null, districts: null, fields: null, corpus: null, work: {}, batches: {} };
}
const verdict = (w: WaterGateReceipt): string => foldGroup('hand', 'default', [recordOf(w)]).bars.waterGates.verdict;

interface E {
  a: LatticePoint;
  b: LatticePoint;
  rows: { role: string; entity: string; ordinal?: number }[];
}
/** The arena's live edges with their rows, read through the kernel's half-edge tables. */
function edgesOf(p: Plat): E[] {
  const out: E[] = [];
  for (let h = 0; h < 2 * p.slots.pair.top; h += 2) {
    if (!isHalfEdgeLive(p, h)) continue;
    const o = p.halfEdges.origin[h];
    const t = dest(p, h);
    out.push({ a: P(p.vertices.x[o], p.vertices.y[o]), b: P(p.vertices.x[t], p.vertices.y[t]), rows: rowsOn(p, 'edge', h).map((r) => rowKey(p, r) as E['rows'][number]) });
  }
  return out;
}
const same = (a: LatticePoint, b: LatticePoint): boolean => a.x === b.x && a.y === b.y;
const wet = (e: E): boolean => Math.abs((e.a.x + e.b.x) / 2) < 2000 - 2 && Math.abs((e.a.y + e.b.y) / 2) < 40000 - 2;

describe('the strict span reading\'s chord half on a hand-built crossing (note 15): a gate\'s wet edge is gated only as its chord between its two bank pins', () => {
  it('one chord A → B: gated; the line split in the water at M (each wet edge carrying the gate\'s one wall_gate row, both gate_end refs resolving, one end of each off the pins): ungated, and the bar fails', () => {
    // the control: the crossing laid as one chord
    const one = arena();
    const w1 = river(one.k);
    wall(one.k, 'enceinte:1', [P(-10_000, 0), A, B, P(10_000, 0)], 'gate:w0');
    const c1 = commitOf([waterGate('gate:w0', 'enceinte:1')]);
    const r1 = waterGateReceipt(one.k, one.p, w1, c1.commit, c1.slice);
    expect([r1.enceintes.length, r1.sharedWallOverWater]).toEqual([1, 0]);
    expect(r1.enceintes[0]).toMatchObject({ enceinte: 'enceinte:1', gates: 1, wallOverWater: 1, wallOverWaterGated: 1, gatesWithOneEdge: 1, endsResolved: 2, endsOnShore: 2, endsAtRecordedBank: 2 });
    expect(verdict(r1)).toBe('pass');

    // the gate's line split at M, 3 m off the chord, mid-river
    const two = arena();
    const w2 = river(two.k);
    const M = P(0, 300);
    wall(two.k, 'enceinte:1', [P(-10_000, 0), A, M, B, P(10_000, 0)], 'gate:w0');
    // read independently: two wet wall edges, each carrying exactly one wall_gate row (gate:w0's), each with one end at a
    // bank pin and the other at M; the gate's two gate_end refs each resolve to one vertex, at A and at B
    const wets = edgesOf(two.p).filter((e) => e.rows.some((r) => r.role === 'wall') && wet(e));
    expect(wets).toHaveLength(2);
    for (const e of wets) {
      expect(e.rows.filter((r) => r.role === 'wall_gate').map((r) => r.entity)).toEqual(['gate:w0']);
      expect([same(e.a, M) || same(e.b, M), same(e.a, A) || same(e.b, A) || same(e.a, B) || same(e.b, B)]).toEqual([true, true]);
    }
    for (const end of [0, 1] as const) {
      const r = two.k.resolve({ role: 'gate_end', entity: 'gate:w0', ordinal: end }, GROUND);
      expect(r.view === 'vertices' && r.vertices.length === 1 ? P(two.p.vertices.x[r.vertices[0]], two.p.vertices.y[r.vertices[0]]) : null).toEqual(end === 0 ? A : B);
    }
    const c2 = commitOf([waterGate('gate:w0', 'enceinte:1')]);
    const r2 = waterGateReceipt(two.k, two.p, w2, c2.commit, c2.slice);
    expect(r2.enceintes[0]).toMatchObject({ enceinte: 'enceinte:1', gates: 1, wallOverWater: 2, wallOverWaterGated: 0, gatesWithOneEdge: 0, endsResolved: 2, endsOnShore: 2 });
    expect(verdict(r2)).toBe('fail');
  });
});

describe('a wet wall side two enceintes share (note 16): attributed by its water gate\'s enceinte', () => {
  // stage 1's wall crosses the river along its gate's chord A → B; stage 2's wall runs along the same side (C-0244's
  // union lets stage k's wall follow stage k − 1's), so the one wet edge carries both `wall` rows
  function shared(gates: readonly Gate[]): { r: WaterGateReceipt; edge: E } {
    const { p, k } = arena();
    const water = river(k);
    wall(k, 'enceinte:1', [P(-10_000, 0), A, B, P(10_000, 0)], 'gate:w0');
    wall(k, 'enceinte:2', [P(-10_000, -8000), A, B, P(10_000, -8000)]);
    const wets = edgesOf(p).filter((e) => e.rows.some((r) => r.role === 'wall') && wet(e));
    expect(wets).toHaveLength(1);
    const c = commitOf(gates.filter((g) => g.enceinte === 'enceinte:1'));
    const s5: S5Walls = { enceintes: [enceinte('enceinte:1', 1), enceinte('enceinte:2', 2)], gates: gates.filter((g) => g.enceinte !== 'enceinte:1') };
    return { r: waterGateReceipt(k, p, water, c.commit, c.slice, s5), edge: wets[0] };
  }

  it('gated by stage 1\'s water gate: stage 1\'s row holds the side, gated; stage 2\'s row holds no wet side; the bar passes', () => {
    const { r, edge } = shared([waterGate('gate:w0', 'enceinte:1')]);
    expect(edge.rows.filter((x) => x.role === 'wall').map((x) => x.entity).sort()).toEqual(['enceinte:1', 'enceinte:2']);
    expect(edge.rows.filter((x) => x.role === 'wall_gate').map((x) => x.entity)).toEqual(['gate:w0']);
    expect(r.enceintes.map((e) => [e.enceinte, e.gates, e.wallOverWater, e.wallOverWaterGated, e.gatesWithOneEdge])).toEqual([
      ['enceinte:1', 1, 1, 1, 1],
      ['enceinte:2', 0, 0, 0, 0],
    ]);
    expect([r.wallOverWater, r.wallOverWaterGated, r.sharedWallOverWater]).toEqual([1, 1, 1]);
    expect(foldGroup('hand', 'default', [recordOf(r)]).bars.waterGates.numbers['sharedWallOverWater']).toBe(1);
    expect(verdict(r)).toBe('pass');
  });

  it('with no water gate recorded for it: the shared side stays in both enceintes\' rows, ungated, and the bar fails (fail-closed)', () => {
    const { r } = shared([]);
    expect(r.enceintes.map((e) => [e.enceinte, e.gates, e.wallOverWater, e.wallOverWaterGated])).toEqual([
      ['enceinte:1', 0, 1, 0],
      ['enceinte:2', 0, 1, 0],
    ]);
    expect(r.sharedWallOverWater).toBe(1);
    expect(verdict(r)).toBe('fail');
  });
});

describe('a holed district face reaches the skeleton corpus whole (note 6)', () => {
  it('a district face with a hole (a sharp triangular reservation inside it): spikeFaces passes both rings, and the corpus counts are those of the whole face, not of its outer ring', () => {
    const { p, k } = arena();
    const OUTER = [P(-20_000, -20_000), P(20_000, -20_000), P(20_000, 20_000), P(-20_000, 20_000)];
    // a 60 m sliver of a triangle, 4 m at its base: its apex 3.8°, under the contract's 5° (a sharp corner of the hole)
    const HOLE = [P(-3000, -200), P(3000, 0), P(-3000, 200)];
    const r = k.tx(batch(1, STAGES.S6), (o) => {
      const a = k.geom.insertChain(o, OUTER, [{ role: 'district_bound', entity: 'district:0' }], 'mandatory', { closed: true, pinned: OUTER.map((_, i) => i) });
      if (!a.ok) return err(a.code, a.detail);
      const h = k.geom.insertChain(o, HOLE, [{ role: 'reserved', entity: 'reservation:0' }], 'mandatory', { closed: true, pinned: HOLE.map((_, i) => i) });
      if (!h.ok) return err(h.code, h.detail);
      const ring = k.geom.pointLocate(GROUND, 1, P(0, 15_000));
      const hole = k.geom.pointLocate(GROUND, 1, P(-2000, 0));
      if (ring.on !== 'face' || hole.on !== 'face') throw new Error('hand.test: no district or hole face');
      const s = k.geom.setOwner(o, [ring.face], 'district:0');
      if (!s.ok) return s;
      return k.geom.setOwner(o, [hole.face], 'reservation:0');
    });
    if (!r.ok) throw new Error(`hand.test: the district was refused: ${r.code} ${r.detail}`);
    // read independently: the district's one L1 face and its rings through the façade's view
    const v = k.view(GROUND, 1);
    const faces = v.faces().filter((f) => v.owner(f) === 'district:0');
    expect(faces).toHaveLength(1);
    const rings = v.rings(faces[0]).map((q) => q.map((x) => ({ x: x.x as number, y: x.y as number })));
    expect(rings).toHaveLength(2);
    const s6 = { districts: [{ id: 'district:0' }] } as unknown as S6Output;
    const water: WaterSet = { bodies: [], bridges: [] } as unknown as WaterSet;
    const f = spikeFaces(p, s6, water);
    expect(f.district).toHaveLength(1);
    expect(f.district[0].map((q) => q.map((x) => ({ x: x.x as number, y: x.y as number })))).toEqual(rings);
    // the corpus over the whole face, against its outer ring alone: the hole's sharp corner downgrades the whole face
    const whole = skeletonCorpus([rings as never], 'roof');
    const outerOnly = skeletonCorpus([[rings[0]] as never], 'roof');
    expect([whole.downgrades, outerOnly.downgrades]).toEqual([1, 0]);
    const c = corpusReceipt(p, s6, water);
    expect(c?.district.roof).toMatchObject({ faces: 1, skeletons: whole.skeletons, downgrades: whole.downgrades, failures: whole.failures });
    expect(c?.district.roof.causes).toEqual(whole.causes);
    expect(c?.district.spine.downgrades).toBe(skeletonCorpus([rings as never], 'spine').downgrades);
  });
});
