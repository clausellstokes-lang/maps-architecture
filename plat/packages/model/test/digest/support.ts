// Test support for M0-d-04's model digest: a framed ground arena built through @plat/kernel's public surface, a
// transaction spec, a small random batch generator (ways, lanes, plot lines, removals, re-owns), record builders and a
// digest's hex form. Not a test file.
import {
  attachIndex,
  createPlat,
  idOf,
  insertChain,
  isFaceLive,
  removeEdges,
  setOwner,
  tx,
  type Cm,
  type Frame,
  type Hash128,
  type KernelResult,
  type KernelTx,
  type Level,
  type LineageHash,
  type Overlay,
  type Plat,
  type StageId,
  type TxEnv,
} from '@plat/kernel';
import type { Block, District, Plot } from '../../src/records/districts.js';
import type { Way } from '../../src/records/network.js';
import type { Lifecycle } from '../../src/types/identity.js';
import type { DigestEntry } from '../../src/digest/index.js';

export const GROUND = { layer: 'ground' as const, part: 0 };
const FRAME: Frame = { widthCm: 2_000_00 as Cm, heightCm: 2_000_00 as Cm, aspect: 1, marginShare: 0.3 };
const CELLS: [number, number, number, number, number] = [800, 400, 200, 100, 50];

export const pt = (x: number, y: number): { x: Cm; y: Cm } => ({ x: x as Cm, y: y as Cm });

export function spec(level: Level, over: Partial<KernelTx> = {}): KernelTx {
  return {
    key: GROUND,
    level,
    ops: [],
    expect: [],
    onFail: 'reject',
    batch: { kind: 'stage', stage: 8 as StageId },
    stage: 8 as StageId,
    rederivesFrom: 0 as StageId,
    workLimit: 1_000_000,
    ...over,
  };
}

/** A ground arena whose outer ring is the square [0, side]² (an L0 `margin` chain), the index attached. */
export function framed(side = 4000, env: TxEnv = {}): Plat {
  const p = createPlat(GROUND, FRAME);
  attachIndex(p, { gridCellCm: CELLS });
  const r = tx(p, spec(0), (o) => insertChain(o, [pt(0, 0), pt(side, 0), pt(side, side), pt(0, side)], [{ role: 'margin', entity: 'terrain:1' }], 'mandatory', { closed: true }), env);
  if (!r.ok) throw new Error(`support: the frame was refused: ${r.code} ${r.detail}`);
  return p;
}

/** A callback batch; throws on a refusal. */
export function commit(p: Plat, level: Level, fn: (o: Overlay) => KernelResult<unknown>, env: TxEnv, over: Partial<KernelTx> = {}): void {
  const r = tx(p, spec(level, over), fn, env);
  if (!r.ok) throw new Error(`support: the batch was refused: ${r.code} ${r.detail}`);
}

/** A digest as 32 hex digits (lane 0 first), for comparisons and messages; null and undefined as their names. */
export function hex(h: Readonly<Hash128> | null | undefined): string {
  return h == null ? String(h) : h.map((w) => w.toString(16).padStart(8, '0')).join('');
}

export const LIFE: Lifecycle = { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } };

/** A lineage hash derived from the address id (the tests' stand-in for M0-d-05a's mint). */
export function lineage(id: string): LineageHash {
  let h = 0x811c9dc5;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 0x01000193) >>> 0;
  return [h, Math.imul(h ^ 0x9e3779b9, 0x85ebca6b) >>> 0];
}

export function wayEntry(id: string, name = id): DigestEntry<'way'> {
  const rec: Way = {
    id,
    class: 'primary',
    spine: { role: 'way', entity: id },
    width: 600 as Cm,
    name,
    from: { kind: 'junction', id: 'junction:0' },
    to: { kind: 'junction', id: 'junction:1' },
    growthStage: 0,
    epoch: 0,
    provisional: false,
    lifecycle: LIFE,
  };
  return { kind: 'way', id, identity: { lineage: lineage(id), key: GROUND }, record: rec };
}

export function districtEntry(id: string): DigestEntry<'district'> {
  const rec: District = { id, kind: 'riverside', quarter: 'quarter:0', faces: { owner: id, level: 1 }, seams: [], growthStage: 0, fabric: 'bent-cut', fabricParams: { depthM: 30 }, lifecycle: LIFE };
  return { kind: 'district', id, identity: { lineage: lineage(id), key: GROUND }, record: rec };
}

export function blockEntry(id: string, district: string): DigestEntry<'block'> {
  const rec: Block = { id, face: { owner: id, level: 2 }, district, depthClass: 'standard', interior: 'plots', reach: 'open', content: 'ordinary', lifecycle: LIFE };
  return { kind: 'block', id, identity: { lineage: lineage(id), parent: district, key: GROUND }, record: rec };
}

/** A plot record (the synthetic workload's shape is the full one; this is the leaf tests' small one). */
export function plotEntry(id: string, block: string, district: string, prosperity = 0.5): DigestEntry<'plot'> {
  const rec = {
    id,
    face: { owner: id, level: 3 as Level },
    block,
    district,
    frontage: { role: 'frontage', entity: id },
    access: { role: 'access', entity: id },
    depthCm: 2000 as Cm,
    frontageCm: 600 as Cm,
    exposure: 'street',
    knownTo: 'public',
    tenure: 'owned',
    partyWalls: { role: 'party_wall', entity: id },
    bounds: [],
    use: 'house',
    sitePlan: { arrangement: 'row', coverage: 0.6, slots: [], frontJitterCm: 0 as Cm, ruleRow: 'site.0' },
    buildings: [],
    yard: [],
    builtBand: 'b2',
    builtProsperity: prosperity,
    fieldBand: 'b2',
    ctx: {} as Plot['ctx'],
    derivedFrom: { ctx: [1, 2], epoch: 0, params: [3, 4], slices: [] },
    lifecycle: LIFE,
  } as Plot;
  return { kind: 'plot', id, identity: { lineage: lineage(id), parent: block, key: GROUND }, record: rec };
}

/** mulberry32 in [0, 1). */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The state a random sequence keeps: live ways, lanes and plot lines by id. */
export interface Live {
  ways: string[];
  lanes: string[];
  next: number;
}

/** One random batch (an L1 way, an L2 lane, an L3 plot line, a whole-chain removal or a re-own of L1 faces). */
export function randomBatch(p: Plat, live: Live, r: () => number): { level: Level; kind: string; fn: (o: Overlay) => KernelResult<unknown>; over: Partial<KernelTx> } {
  const at = (): number => Math.floor(r() * 4001);
  const inner = (): number => 200 + Math.floor(r() * 3601);
  const k = r();
  if (k < 0.3 || live.ways.length === 0) {
    const id = `way:${live.next++}`;
    const pts = r() < 0.5 ? [pt(0, at()), pt(inner(), inner()), pt(4000, at())] : [pt(at(), 0), pt(inner(), inner()), pt(at(), 4000)];
    return { level: 1, kind: 'way', over: {}, fn: (o) => { const x = insertChain(o, pts, [{ role: 'way', entity: id }], 'mandatory'); if (x.ok) live.ways.push(id); return x; } };
  }
  if (k < 0.5) {
    const id = `lane:${live.next++}`;
    const pts = [pt(inner(), inner()), pt(inner(), inner())];
    return { level: 2, kind: 'lane', over: {}, fn: (o) => { const x = insertChain(o, pts, [{ role: 'kerb', entity: id }], 'mandatory'); if (x.ok) live.lanes.push(id); return x; } };
  }
  if (k < 0.6) {
    const id = `plotline:${live.next++}`;
    const pts = [pt(inner(), inner()), pt(inner(), inner())];
    return { level: 3, kind: 'plot line', over: {}, fn: (o) => insertChain(o, pts, [{ role: 'plot_line', entity: id }], 'mandatory') };
  }
  if (k < 0.75) {
    const i = Math.floor(r() * live.ways.length);
    const id = live.ways[i];
    return { level: 1, kind: 'remove way', over: {}, fn: (o) => { const x = removeEdges(o, { role: 'way', entity: id }); if (x.ok) live.ways.splice(i, 1); return x; } };
  }
  // A re-own of one or two live L1 faces to one of four districts (S6's regroup at M0's scale).
  const district = `district:${Math.floor(r() * 4)}`;
  const pickA = r();
  const pickB = r();
  return {
    level: 1,
    kind: 're-own',
    over: { stage: 6 as StageId, rederivesFrom: 6 as StageId },
    fn: (o) => {
      const faces: number[] = [];
      for (let f = 0; f < p.slots.face[1].top; f++) if (isFaceLive(p, 1, f)) faces.push(f);
      if (faces.length === 0) return { ok: true, value: null, warnings: [] };
      const chosen = [...new Set([faces[Math.floor(pickA * faces.length)], faces[Math.floor(pickB * faces.length)]])];
      return setOwner(o, chosen, district);
    },
  };
}

export { idOf };
