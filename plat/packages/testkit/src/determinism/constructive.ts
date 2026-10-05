// The constructive arenas as determinism sequences (M0-d-08; §13.1 "renumbering the arena's slots gives identical
// output"; the item's test "renumbering + next op: identical output on every constructive arena"). Every M0 case of the
// constructive set (M0-k-02) whose scenario inserts chains is read as a sequence on an L0 frame around its geometry:
// its leading insertChain steps, each one callback batch at its level, then its **next op** — the step that follows
// them when it is a writer this harness interprets (insertChain, removeEdges, splitFace), else a probe chain across the
// arena at the deepest level the case used. `runTwiceCompare` then renumbers the arena's slots before every batch, so
// the next op meets the constructive arena under other slot numbers. A case's other steps (warp, queries, the save
// round trip …) are their own items' (C-0199 (3)).
import { insertChain, removeEdges, splitFace, type Level, type Overlay } from '@plat/kernel';
import type { ConstructiveCase, ConstructiveInput, ConstructiveStep } from '../constructive/types.js';
import { faceHolding, fixtureSpec, framedArena, lp } from './fixtures.js';
import type { DeterminismBatch, DeterminismSequence } from './issue.js';

/** The frame's padding around a case's geometry (cm). */
export const CONSTRUCTIVE_FRAME_PAD = 5_000;
/** The lattice's bound (§3.2 (1): coordinates within ± (2²³ − 1)). */
const LATTICE_MAX = 0x7fffff;

type Pt = { readonly x: number; readonly y: number };

function geometryOf(input: ConstructiveInput, name: string): { pts: readonly Pt[]; closed: boolean } | null {
  if (Object.hasOwn(input.chains, name)) return { pts: input.chains[name], closed: false };
  if (Object.hasOwn(input.rings, name)) return { pts: input.rings[name], closed: true };
  return null;
}

function levelOf(s: ConstructiveStep): Level {
  const l = s.args.level;
  return (typeof l === 'number' && l >= 0 && l <= 4 ? l : 1) as Level;
}

/** The entity a case's chain is inserted under: its role and its name (one entity per named chain). */
function entityOf(s: ConstructiveStep): string {
  const name = String(s.args.chain ?? s.args.ring);
  return `${String(s.args.role ?? 'way')}:${name}`;
}

function insertBatch(input: ConstructiveInput, s: ConstructiveStep, i: number): DeterminismBatch | null {
  const g = geometryOf(input, String(s.args.chain ?? s.args.ring));
  if (g === null) return null;
  const level = levelOf(s);
  const role = String(s.args.role ?? 'way');
  const cls = s.args.cls === 'optional' ? 'optional' : 'mandatory';
  return {
    name: `${i} insertChain ${String(s.args.chain ?? s.args.ring)} L${level}`,
    build: () => ({
      spec: fixtureSpec(level),
      fn: (o: Overlay) => insertChain(o, g.pts.map((q) => lp(q.x, q.y)), [{ role, entity: entityOf(s) }], cls, g.closed ? { closed: true } : {}),
    }),
  };
}

/** The steps that build the arena (the leading insertChain steps) and the step after them. */
function prefixOf(input: ConstructiveInput): { inserts: ConstructiveStep[]; next: ConstructiveStep | null } {
  const inserts: ConstructiveStep[] = [];
  let k = 0;
  while (k < input.steps.length && input.steps[k].op === 'insertChain') inserts.push(input.steps[k++]);
  return { inserts, next: k < input.steps.length ? input.steps[k] : null };
}

/** The bounding box of every named coordinate of the input. */
function bbox(input: ConstructiveInput): [number, number, number, number] {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  const take = (q: Pt): void => {
    x0 = Math.min(x0, q.x);
    y0 = Math.min(y0, q.y);
    x1 = Math.max(x1, q.x);
    y1 = Math.max(y1, q.y);
  };
  for (const c of Object.values(input.chains)) c.forEach(take);
  for (const r of Object.values(input.rings)) r.forEach(take);
  for (const q of Object.values(input.points)) take(q);
  return [x0, y0, x1, y1];
}

/** The next op: the case's own following writer step where interpreted, else a probe chain across the box. */
function nextBatch(input: ConstructiveInput, next: ConstructiveStep | null, inserts: readonly ConstructiveStep[], box: readonly number[]): DeterminismBatch {
  const deepest = inserts.reduce((m, s) => (levelOf(s) > m ? levelOf(s) : m), 1 as Level);
  if (next !== null && next.op === 'removeEdges' && typeof next.args.chain === 'string') {
    const ins = inserts.find((s) => s.args.chain === next.args.chain);
    if (ins !== undefined) {
      return {
        name: `next removeEdges ${next.args.chain}`,
        build: () => ({ spec: fixtureSpec(levelOf(ins)), fn: (o: Overlay) => removeEdges(o, { role: String(ins.args.role ?? 'way'), entity: entityOf(ins) }) }),
      };
    }
  }
  if (next !== null && next.op === 'splitFace' && typeof next.args.cut === 'string' && Object.hasOwn(input.chains, next.args.cut)) {
    const ring = inserts.find((s) => s.args.ring === next.args.face);
    const cut = input.chains[next.args.cut];
    if (ring !== undefined && cut.length >= 2) {
      // A point strictly inside the face: the lattice point nearest the middle of the cut's interior (its second
      // point when it has one, the rounded midpoint of a two-point cut).
      const inner: Pt = cut.length > 2 ? cut[1] : { x: Math.round((cut[0].x + cut[1].x) / 2), y: Math.round((cut[0].y + cut[1].y) / 2) };
      return {
        name: `next splitFace ${next.args.face} by ${next.args.cut}`,
        build: () => ({
          spec: fixtureSpec(levelOf(ring)),
          fn: (o: Overlay) => splitFace(o, faceHolding(o, [inner.x, inner.y]), cut, { rows: [{ role: 'plot_line', entity: 'probe:cut' }] }),
        }),
      };
    }
  }
  // The probe: a chain across the box's interior, corner to corner, a little inside it.
  const [x0, y0, x1, y1] = box;
  const dx = Math.max(1, Math.floor((x1 - x0) / 7));
  const dy = Math.max(1, Math.floor((y1 - y0) / 11));
  const a = lp(x0 + dx, y0 + dy);
  const b = lp(x1 - dx, y1 - 2 * dy);
  return {
    name: `next probe chain L${deepest}`,
    build: () => ({ spec: fixtureSpec(deepest), fn: (o: Overlay) => insertChain(o, [a, b], [{ role: 'way', entity: 'way:probe' }], 'mandatory') }),
  };
}

/**
 * A constructive case's draw as a determinism sequence (null for a case whose scenario inserts no chain, a deferred
 * case's stub, or one whose geometry leaves no room for a frame inside the lattice).
 */
export function constructiveSequence(c: ConstructiveCase, seed: number): DeterminismSequence | null {
  const input = c.generate(seed as never);
  if (input.kind !== 'input') return null;
  const { inserts, next } = prefixOf(input);
  if (inserts.length === 0) return null;
  const box = bbox(input);
  const f0 = box[0] - CONSTRUCTIVE_FRAME_PAD;
  const g0 = box[1] - CONSTRUCTIVE_FRAME_PAD;
  const f1 = box[2] + CONSTRUCTIVE_FRAME_PAD;
  const g1 = box[3] + CONSTRUCTIVE_FRAME_PAD;
  if (f0 < -LATTICE_MAX || g0 < -LATTICE_MAX || f1 > LATTICE_MAX || g1 > LATTICE_MAX) return null;
  const batches: DeterminismBatch[] = [];
  inserts.forEach((s, i) => {
    const b = insertBatch(input, s, i);
    if (b !== null) batches.push(b);
  });
  batches.push(nextBatch(input, next, inserts, box));
  return { name: `${c.id} #${seed}`, arena: () => framedArena(f0, g0, f1, g1), batches };
}
