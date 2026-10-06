// The pipeline order (M0-x-02; §4.1 *Registration and order*, §4.12 *The pipeline order*, §17.1 (8): Kahn's topological
// sort (1962) with the stage id as tie-break; C-0077, C-0224).
//
// The pipeline is the directed acyclic graph the registered stages' declared inputs and outputs induce: an edge P → C
// for every data key C reads (its own `inputs`, and its product's `extraInputs` for it, §4.1) that P writes, P ≠ C — a
// stage that reads a key it also writes (S5's network at stage k) waits on that key's other writers, never on itself.
// Kahn's sort takes, at every step, the ready stage (no unsorted writer of any key it reads) with the smallest u16 stage
// id (the registry's id, which C-0020 appended in §4.1's drawn order): the order is a function of the declared set
// alone, never of the registration order. A key no registered stage writes (the blueprint before S0 lands, a stage M0
// does not build) adds no edge. A cycle leaves stages unsorted: it is a registration error, named by one cycle's stage
// names in order (C-0224 (2)).
import { stageText, type StageId } from '@plat/kernel';
import type { DataKey } from '@plat/model';
import type { StrategyRegistry } from './registry.js';

/** A refused registration or an unorderable stage set (§4.1: "a cycle is a registration error caught at load"). */
export class RegistrationError extends Error {
  /** The stages of the cycle found, in cycle order, starting at the smallest id ([] for any other refusal). */
  readonly cycle: readonly string[];
  constructor(message: string, cycle: readonly string[] = []) {
    super(message);
    this.name = 'RegistrationError';
    this.cycle = Object.freeze([...cycle]);
  }
}

/** What the order reads of a stage declaration. */
export interface OrderNode {
  readonly id: StageId;
  readonly inputs: readonly DataKey[];
  readonly outputs: readonly DataKey[];
}

/** Kahn's result: the order, or one cycle's stage ids (in cycle order, from its smallest id). */
export type OrderResult = { readonly ok: true; readonly order: StageId[] } | { readonly ok: false; readonly cycle: StageId[] };

function byId(a: StageId, b: StageId): number {
  return (a as number) - (b as number);
}

/** Inserts `id` into the ascending `ready` list. */
function insertReady(ready: StageId[], id: StageId): void {
  let lo = 0;
  let hi = ready.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (byId(ready[mid], id) < 0) lo = mid + 1;
    else hi = mid;
  }
  ready.splice(lo, 0, id);
}

/**
 * The edges P → C of the declared I/O (each once), keyed by P, each successor list in ascending id; `extraInputs` adds
 * keys to a stage's inputs (§4.1's `ProductDecl.extraInputs`).
 */
export function stageEdges(nodes: readonly OrderNode[], extraInputs: ReadonlyMap<StageId, readonly DataKey[]> = new Map()): Map<StageId, StageId[]> {
  const writers = new Map<DataKey, StageId[]>();
  const edges = new Map<StageId, StageId[]>();
  for (const n of nodes) {
    if (edges.has(n.id)) throw new RegistrationError(`stage ${stageText(n.id)} is declared twice`);
    edges.set(n.id, []);
    for (const k of n.outputs) {
      const ws = writers.get(k);
      if (ws === undefined) writers.set(k, [n.id]);
      else if (!ws.includes(n.id)) ws.push(n.id);
    }
  }
  for (const c of nodes) {
    const reads = [...c.inputs, ...(extraInputs.get(c.id) ?? [])];
    for (const k of reads) {
      for (const p of writers.get(k) ?? []) {
        if (p === c.id) continue;
        const succ = edges.get(p) as StageId[];
        if (!succ.includes(c.id)) succ.push(c.id);
      }
    }
  }
  for (const succ of edges.values()) succ.sort(byId);
  return edges;
}

/** One cycle among the unsorted stages (each has an unsorted predecessor), in cycle order from its smallest id. */
function findCycle(edges: ReadonlyMap<StageId, readonly StageId[]>, left: ReadonlySet<StageId>): StageId[] {
  // Walk predecessors backwards from the smallest unsorted id: every unsorted stage has one, so the walk repeats a stage.
  const preds = new Map<StageId, StageId[]>();
  for (const id of left) preds.set(id, []);
  for (const [p, succ] of edges) {
    if (!left.has(p)) continue;
    for (const c of succ) if (left.has(c)) (preds.get(c) as StageId[]).push(p);
  }
  for (const ps of preds.values()) ps.sort(byId);
  const start = [...left].sort(byId)[0];
  const seen = new Map<StageId, number>();
  const path: StageId[] = [];
  let at = start;
  while (!seen.has(at)) {
    seen.set(at, path.length);
    path.push(at);
    at = (preds.get(at) as StageId[])[0];
  }
  // path[seen(at)…] walked predecessors: reversed, it is the cycle in edge order.
  const cycle = path.slice(seen.get(at)).reverse();
  let low = 0;
  for (let i = 1; i < cycle.length; i++) if (byId(cycle[i], cycle[low]) < 0) low = i;
  return [...cycle.slice(low), ...cycle.slice(0, low)];
}

/**
 * Kahn's topological sort of the stages' declared I/O with the stage id as the deterministic tie-break (§4.1, §17.1 (8)):
 * at every step the ready stage with the smallest id is taken. A cycle returns one cycle's ids.
 */
export function kahn(nodes: readonly OrderNode[], extraInputs?: ReadonlyMap<StageId, readonly DataKey[]>): OrderResult {
  const edges = stageEdges(nodes, extraInputs);
  const indegree = new Map<StageId, number>();
  for (const n of nodes) indegree.set(n.id, 0);
  for (const succ of edges.values()) for (const c of succ) indegree.set(c, (indegree.get(c) as number) + 1);
  const ready: StageId[] = [];
  for (const n of nodes) if (indegree.get(n.id) === 0) insertReady(ready, n.id);
  const order: StageId[] = [];
  while (ready.length > 0) {
    const id = ready.shift() as StageId;
    order.push(id);
    for (const c of edges.get(id) as StageId[]) {
      const d = (indegree.get(c) as number) - 1;
      indegree.set(c, d);
      if (d === 0) insertReady(ready, c);
    }
  }
  if (order.length === nodes.length) return { ok: true, order };
  const left = new Set<StageId>();
  for (const n of nodes) if (!order.includes(n.id)) left.add(n.id);
  return { ok: false, cycle: findCycle(edges, left) };
}

/** A cycle as text: `S3 → S4 → S3`. */
export function cycleText(cycle: readonly StageId[]): string {
  return [...cycle, cycle[0]].map((id) => stageText(id)).join(' → ');
}

/**
 * The pipeline order of a product's registered stage set (§4.12: the base's own set for `base`): Kahn's order with the
 * id tie-break. Refuses a set with a cycle (a registry changed past `register`'s check) and a registry holding a hook
 * registration — hooks join their host's I/O and are M2b's (§4.12; M0.md §2's defers), so an order that ignored one
 * would be wrong (C-0224 (4)).
 */
export function stageOrder(registry: StrategyRegistry, product: 'base' | 'village' = 'base'): StageId[] {
  for (const [host, hooks] of registry.hooks) {
    if (hooks.length > 0) throw new RegistrationError(`notBuilt('M2b'): a hook registration on ${host} — hooks join their host's declared I/O at M2b (§4.12)`);
  }
  const decl = registry.products.get(product);
  if (decl === undefined) throw new RegistrationError(`no product '${product}' is registered (§4.12's StrategyRegistry.products)`);
  const r = kahn(decl.stages, decl.extraInputs);
  if (!r.ok) throw new RegistrationError(`the stages' declared inputs and outputs form a cycle: ${cycleText(r.cycle)} (§4.1)`, r.cycle.map((id) => stageText(id)));
  return r.order;
}
