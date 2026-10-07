// The plant (M0-x-06; §4.13 EP-01, §5.1 (9), §13.1's ladder coverage; C-EDGE (3)): a stage's own geometry made
// degenerate on its way into the kernel. `plantKernel(kernel, plant)` is the façade the stage is handed — every member
// the kernel's own — whose `geom.insertChain` turns ONE call the plant selects (the stage's own chain: its roles, its
// class, inside its own batch at its level and stage id) into the plant's kind (./kinds.ts), and whose `tx` records the
// batch that call ran in and how that batch ended. Nothing else changes: the kernel decides — refuses with its §3.1 code
// or takes the kind by §3.11's rule (attraction, one shared stretch, simple runs) — and the stage's own code receives
// the result, so what the stage does next is its failure class's ladder (§4.1's transactions table).
//
// A plant fires once (one-shot): the stage's retry or simpler rung re-derives its geometry and meets the kernel unplanted,
// as a degenerate result meets a ladder that moves on from it.
import type { Committed, Kernel, KernelResult, KernelTx, Overlay, Warning } from '@plat/kernel';
import { collinearChain, doubledPoints, selfTouchingChain, selfTouchingRing, zeroAreaRing, zeroLengthChain, type DegenerateKind } from './kinds.js';

/** One insertChain call as the plant sees it: the batch it runs in and the chain's own fields. */
export interface PlantCall {
  /** The batch's stage id, level and op form ('none' outside a batch). */
  readonly txStage: number;
  readonly level: number;
  readonly form: 'declared' | 'callback' | 'none';
  /** The chain's first role row, its class and whether it is closed. */
  readonly role: string;
  readonly entity: string;
  readonly cls: string;
  readonly closed: boolean;
  /** The chain's points as the stage gave them. */
  readonly points: number;
  /** The call's position among every insertChain call this façade saw (0-based). */
  readonly n: number;
}

/** What to plant: the kind, and which call (the first the selector accepts). */
export interface Plant {
  readonly kind: DegenerateKind;
  readonly select: (call: PlantCall) => boolean;
}

/** The plant's log: the call it fired on, the kernel's answer to the planted chain, and the batch's end. */
export interface PlantLog {
  fired: PlantCall | null;
  /** The planted insert's result: ok (with its warnings' codes) or the §3.1 code. */
  insert: { readonly ok: boolean; readonly code?: string; readonly warnings: readonly string[] } | null;
  /** The batch the plant fired in: committed, or refused with its code. */
  batch: { readonly committed: boolean; readonly code?: string } | null;
  /** Every batch the façade ran after the plant fired, in order: committed or refused (its code). */
  after: { readonly committed: boolean; readonly code?: string; readonly level: number }[];
  /** insertChain calls seen. */
  calls: number;
  /** Is the plant armed (a switch a driver may hold off while other sub-stages run)? */
  armed: boolean;
}

/** A fresh log, armed. */
export function plantLog(armed = true): PlantLog {
  return { fired: null, insert: null, batch: null, after: [], calls: 0, armed };
}

type InsertArgs = Parameters<Kernel['geom']['insertChain']>;

function codes(ws: readonly Warning[]): string[] {
  return ws.filter((w) => w.count > 0).map((w) => w.code);
}

/**
 * The façade with the plant (see the header). `log` records what fired; `plant` null passes every call through (the
 * same façade, unplanted — the fixtures' control).
 */
export function plantKernel(kernel: Kernel, plant: Plant | null, log: PlantLog): Kernel {
  let current: { stage: number; level: number; form: 'declared' | 'callback' } | null = null;
  let firedHere = false;
  const insertChain = (...args: InsertArgs): ReturnType<Kernel['geom']['insertChain']> => {
    const [o, points, roles, cls, opts] = args;
    const call: PlantCall = {
      txStage: current?.stage ?? -1,
      level: current?.level ?? -1,
      form: current?.form ?? 'none',
      role: roles[0]?.role ?? '',
      entity: roles[0]?.entity ?? '',
      cls,
      closed: opts?.closed === true,
      points: points.length,
      n: log.calls,
    };
    log.calls += 1;
    if (plant === null || !log.armed || log.fired !== null || !plant.select(call)) return kernel.geom.insertChain(...args);
    log.fired = call;
    firedHere = true;
    let r: ReturnType<Kernel['geom']['insertChain']>;
    switch (plant.kind) {
      case 'zero-length':
        r = kernel.geom.insertChain(o, zeroLengthChain(points), roles, cls, {});
        break;
      case 'zero-area':
        r = kernel.geom.insertChain(o, zeroAreaRing(points), roles, cls, { closed: true });
        break;
      case 'self-touching':
        r = call.closed ? kernel.geom.insertChain(o, selfTouchingRing(points), roles, cls, { closed: true }) : kernel.geom.insertChain(o, selfTouchingChain(points), roles, cls, {});
        break;
      case 'collinear':
        r = kernel.geom.insertChain(o, collinearChain(points), roles, cls, {});
        break;
      case 'coincident': {
        // the chain where it stands, then again on itself: every point of the second coincident with a standing vertex
        const first = kernel.geom.insertChain(...args);
        r = first.ok ? kernel.geom.insertChain(o, doubledPoints(points), roles, cls, opts?.closed === true ? { closed: true } : {}) : first;
        break;
      }
    }
    log.insert = r.ok ? { ok: true, warnings: codes(r.warnings) } : { ok: false, code: r.code, warnings: [] };
    return r;
  };
  const tx = <T>(spec: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>): KernelResult<Committed<T | KernelResult<unknown>[]>> => {
    const outer = current;
    current = { stage: spec.stage as number, level: spec.level, form: fn === undefined ? 'declared' : 'callback' };
    const before = firedHere;
    firedHere = false;
    let r: KernelResult<Committed<T | KernelResult<unknown>[]>>;
    try {
      r = kernel.tx(spec, fn);
    } finally {
      current = outer;
    }
    const end = r.ok ? { committed: r.value.record !== null } : { committed: false, code: r.code };
    if (firedHere) log.batch = end;
    else if (log.fired !== null) log.after.push({ ...end, level: spec.level });
    firedHere = before;
    return r;
  };
  return Object.freeze({ ...kernel, tx, geom: Object.freeze({ ...kernel.geom, insertChain }) }) as Kernel;
}
