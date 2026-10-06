// createKernel — the façade the stages see (M0-a-16; §14 `interface Kernel`: plat, view, resolve, geom, index, tx;
// §3.4's complete list on `geom`; §3.3 *Two op forms*; §3.4 *Arenas, keys and services*; §6.1 / §14 `Rng.stream`;
// C-0041, C-0078, C-0089, C-0112; readings C-0219).
//
// Doc-less at M0: the kernel is handed a map of PlatKey → Plat (the document that owns the arenas is M1's, §4b) and the
// services a transaction is injected with (`TxEnv`: class floors, checks, stage ranks, the repairer, the invariant
// suite, the digest listener), plus the spines' width declarations `kerb` and `corridorUnion` read (C-0212 (1): the
// kernel holds no entity record). Every façade member maps its key to its arena and calls the one module that builds it
// — no member re-implements an op. In the debug build every result is stamped with its arena's key and version
// (./stamp.ts). The services §3.4 says "read the open transaction's arena and are called only inside one" (`kerb`,
// `offsetFace`, `insetRing`, and `sideRuns` / `sampleBoundary` handed a face) read the innermost transaction this
// kernel has open; called outside one they are a programming error.
import {
  compareFaces,
  idOf,
  isFaceLive,
  isPlatKey,
  resolve as resolveOn,
  sameKey,
  signature as signatureOn,
  vertexSignature,
  vertexAt,
  type FaceId,
  type Plat,
  type Resolved,
} from '../arena/index.js';
import { bandUnion, booleans, buffer, corridorUnion, insetRing, kerb, offsetFace, tileRings, type SpineWidths } from '../arr/index.js';
import { absorbSliver, claimSubFace, connectHole, mergeFaces, pinVertices, radialSplit, ringBand, splitFace } from '../faces/index.js';
import { faceNeighbours, faceRings, hexLattice, hull, lir, obb, regularFit, sampleBoundary, sideRuns, type FaceRings } from '../geom/index.js';
import { pointLocate as locateOn, query as queryOn, rebuildAtStageEnd as rebuildOn } from '../index/index.js';
import { insertChain, splitThrough } from '../insert/index.js';
import { debugMode } from '../invariants/index.js';
import { area2, area2Big, orient, type KernelResult } from '../num/index.js';
import { createRng } from '../rng/index.js';
import { skeleton } from '../skeleton/index.js';
import { clearFiner, removeEdges, resolveStretch, retypeEdges, sampleProfile, setOwner, tx as txOn, type Committed, type KernelOp, type KernelTx, type Overlay, type TxEnv } from '../tx/index.js';
import type { GeomRef, Level, PlatKey, StretchRef } from '../types/index.js';
import { simplify, warp } from '../warp/index.js';
import { notBuilt, refuseNotBuilt } from './notBuilt.js';
import { assertStamped, stamp, stampOf, stampWith } from './stamp.js';
import type { ArenaKey, GeomOps, IndexOps, Kernel, LevelView, TransientKey } from './types.js';

/** What `createKernel` is handed besides the arenas. */
export interface KernelOptions {
  /** The services every transaction is injected with (M0-a-06's `TxEnv`). */
  readonly env?: TxEnv;
  /**
   * The spines' width declarations (§3.7; C-0212 (1)) `kerb` and `corridorUnion` read. Absent: those two members are a
   * programming error, never a kerb read as if no spine declared a width.
   */
  readonly spineWidths?: SpineWidths;
}

function keyText(k: PlatKey): string {
  return `${k.layer}/${String(k.part)}`;
}

function fail(message: string): never {
  throw new Error(`kernel: ${message}`);
}

/** Is the key a transient arena's (§3.4)? */
export function isTransientKey(k: ArenaKey): k is TransientKey {
  return typeof k === 'object' && k !== null && 'transient' in k && k.transient === true;
}

function isStretchRef(ref: GeomRef): ref is StretchRef {
  return 'chain' in ref;
}

/**
 * §14's Kernel over the arenas a map names (doc-less at M0): `plats` maps each PlatKey to its arena, whose own key must
 * be that key; two entries naming one arena are a programming error.
 */
export function createKernel(plats: ReadonlyMap<PlatKey, Plat>, options: KernelOptions = {}): Kernel {
  const arenas = new Map<string, Plat>();
  for (const [key, p] of plats) {
    if (!isPlatKey(key) || !sameKey(key, p.key)) fail(`the map names the arena ${keyText(p.key)} under the key ${isPlatKey(key) ? keyText(key) : 'that is no PlatKey'}`);
    const k = keyText(key);
    if (arenas.has(k)) fail(`two entries name the arena ${k}`);
    arenas.set(k, p);
  }
  const env: TxEnv = options.env ?? {};
  const widths = options.spineWidths;
  /**
   * The transactions this kernel has open, innermost last: each its overlay (set when its first op or its callback
   * runs) and the values its ops returned, which the commit re-stamps (C-0219 (3)).
   */
  const frames: { o: Overlay | null; readonly stamped: object[] }[] = [];

  const platOf = (key: ArenaKey): Plat => {
    if (isTransientKey(key)) refuseNotBuilt('M6-P', 'a transient arena (§3.4; C-0041)');
    if (!isPlatKey(key)) fail('the key is no PlatKey');
    const p = arenas.get(keyText(key));
    if (p === undefined) fail(`no arena ${keyText(key)} in this kernel`);
    return p;
  };

  /** The debug build's check that an overlay handed to a writer is a transaction on one of this kernel's arenas. */
  const onArena = (o: Overlay): Plat => {
    const p = o.plat;
    if (debugMode() && arenas.get(keyText(p.key)) !== p) fail(`the transaction acts on the arena ${keyText(p.key)}, which this kernel does not hold (§3.4)`);
    return p;
  };

  /** The innermost open transaction, for the services that read it. */
  const current = (what: string): Overlay => {
    for (let i = frames.length - 1; i >= 0; i -= 1) {
      const o = frames[i].o;
      if (o !== null) return o;
    }
    return fail(`${what} reads the open transaction's arena and is called only inside one (§3.4)`);
  };

  /** Runs `f` as the innermost frame's transaction, its overlay `o`. */
  const within = <R>(o: Overlay, f: () => R): R => {
    const frame = frames[frames.length - 1];
    const before = frame.o;
    frame.o = o;
    try {
      return f();
    } finally {
      frame.o = before;
    }
  };

  /**
   * A value an op on overlay `o` returned: stamped at the arena's version now (current inside the batch) and, in the
   * debug build, kept by the frame of `o`'s transaction so its commit re-stamps it.
   */
  const batchValue = <R>(o: Overlay, value: R): R => {
    stamp(o.plat, value);
    if (debugMode() && typeof value === 'object' && value !== null) {
      for (let i = frames.length - 1; i >= 0; i -= 1) {
        if (frames[i].o === o) {
          frames[i].stamped.push(value);
          break;
        }
      }
    }
    return value;
  };

  /** A writer: the overlay checked, the module's op called, its result stamped. */
  const writer = <A extends unknown[], R>(op: (o: Overlay, ...args: A) => R) => (o: Overlay, ...args: A): R => {
    onArena(o);
    return batchValue(o, op(o, ...args));
  };

  const needWidths = (what: string): SpineWidths => {
    if (widths === undefined) fail(`${what} reads the spines' width declarations: create the kernel with spineWidths (§3.7; C-0212 (1))`);
    return widths;
  };

  const ringsOf = (face: FaceRings | FaceId, what: string): FaceRings => {
    if (typeof face !== 'number') return face;
    const o = current(what);
    return faceRings(o.plat, o.level, face);
  };

  const resolve = (ref: GeomRef, key: PlatKey): Resolved => {
    const p = platOf(key);
    if (!isStretchRef(ref)) return resolveOn(p, ref, key);
    // A StretchRef (batch-local, §2.2 rule 5) resolves to its one run of half-edges; one that finds no stretch, empty.
    const s = resolveStretch(p, key, ref);
    return { key: { layer: p.key.layer, part: p.key.part }, version: p.version, view: 'edges', runs: s.ok ? [s.value.half] : [] };
  };

  const geom: GeomOps = {
    // writers (§3.4's order)
    insertChain: writer(insertChain),
    splitThrough: writer(splitThrough),
    removeEdges: writer(removeEdges),
    clearFiner: writer(clearFiner),
    retypeEdges: writer(retypeEdges),
    setOwner: writer(setOwner),
    splitFace: writer(splitFace),
    connectHole: writer(connectHole),
    mergeFaces: writer(mergeFaces),
    absorbSliver: writer(absorbSliver),
    claimSubFace: writer(claimSubFace),
    radialSplit: writer(radialSplit),
    ringBand: writer(ringBand),
    corridorUnion: writer((o: Overlay, l1Faces: Parameters<typeof corridorUnion>[1]) => corridorUnion(o, l1Faces, needWidths('corridorUnion'))),
    bandUnion: writer(bandUnion),
    warp: writer(warp),
    pinVertices: writer(pinVertices),
    // services
    resolve,
    resolveVertexAt: notBuilt('M2a', 'resolveVertexAt', 'the edit log\'s replay of a moveVertex is its first reader (§7.1; C-0089)'),
    signature: (key, v) => {
      const p = platOf(key);
      if ('role' in v) return signatureOn(p, v, key);
      // A lattice point finds its vertex through the index (C-0146 (6) hands the routing here), or a scan where the
      // arena has no index attached.
      if (p.index === undefined) {
        const w = vertexAt(p, v);
        return w === -1 ? { v: [], e: [] } : vertexSignature(p, w);
      }
      const at = locateOn(p, key, 4, v);
      return at.on === 'vertex' ? vertexSignature(p, at.vertex) : { v: [], e: [] };
    },
    sampleProfile: (profile, owner, key, atCm) => sampleProfile(platOf(key), profile, owner, key, atCm),
    kerb: (face) => {
      const o = current('kerb');
      return batchValue(o, kerb(o, face, needWidths('kerb')));
    },
    booleans,
    tileRings,
    buffer,
    offsetFace: (face, perEdgeCm) => {
      const o = current('offsetFace');
      return batchValue(o, offsetFace(o, face, perEdgeCm));
    },
    insetRing: (face, dCm) => {
      const o = current('insetRing');
      return batchValue(o, insetRing(o, face, dCm));
    },
    skeleton,
    simplify,
    hexLattice,
    obb,
    hull,
    lir,
    sideRuns: (face, turnTolCdeg, opts) => sideRuns(ringsOf(face, 'sideRuns'), turnTolCdeg, opts),
    sampleBoundary: (face, stepCm) => sampleBoundary(ringsOf(face, 'sampleBoundary'), stepCm),
    pointLocate: (key, level, at) => {
      const p = platOf(key);
      return locateOn(p, p.key, level, at);
    },
    faceNeighbours: (key, face, level) => {
      const p = platOf(key);
      return faceNeighbours(p, p.key, face, level);
    },
    area2,
    area2Big,
    orient,
    regularFit,
    // the transient arena (§3.4)
    transientArena: notBuilt('M6-P', 'transientArena', 'the plan rung is its first reader (§2.6; C-0041)'),
    readBack: notBuilt('M6-P', 'readBack', 'the plan rung is its first reader (§2.6; C-0041)'),
    release: notBuilt('M6-P', 'release', 'the plan rung is its first reader (§2.6; C-0041)'),
  };
  Object.freeze(geom);

  const index: IndexOps = {
    query: (key, level, box, kinds) => queryOn(platOf(key), key, level, box, kinds),
    pointLocate: geom.pointLocate,
    rebuildAtStageEnd: (key, district) => rebuildOn(platOf(key), district),
  };
  Object.freeze(index);

  const view = (key: ArenaKey, level: Level): LevelView => {
    const p = platOf(key);
    const k = { layer: p.key.layer, part: p.key.part };
    if (!(level === 0 || level === 1 || level === 2 || level === 3 || level === 4)) fail('a view level is 0 … 4');
    const v: LevelView = {
      key: k,
      version: p.version,
      level,
      faces: (): FaceId[] => {
        assertStamped(p, v);
        const out: FaceId[] = [];
        const top = p.slots.face[level].top;
        for (let f = 0; f < top; f += 1) if (isFaceLive(p, level, f)) out.push(f);
        return out.sort((a, b) => compareFaces(p, level, a, b));
      },
      rings: (face: FaceId) => {
        assertStamped(p, v);
        if (!isFaceLive(p, level, face)) fail(`face ${String(face)} is not live at L${String(level)}`);
        return faceRings(p, level, face);
      },
      owner: (face: FaceId) => {
        assertStamped(p, v);
        if (!isFaceLive(p, level, face)) fail(`face ${String(face)} is not live at L${String(level)}`);
        const h = p.faces[level].owner[face];
        return h < 0 ? null : idOf(p, h);
      },
      query: (box, kinds) => {
        assertStamped(p, v);
        return queryOn(p, k, level, box, kinds);
      },
      pointLocate: (at) => {
        assertStamped(p, v);
        return locateOn(p, k, level, at);
      },
      neighbours: (face) => {
        assertStamped(p, v);
        return faceNeighbours(p, k, face, level);
      },
    };
    return Object.freeze(v);
  };

  const runTx = <T>(spec: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>): KernelResult<Committed<T | KernelResult<unknown>[]>> => {
    if (fn !== undefined && spec.ops.length > 0) fail('a transaction supplies its ops or a callback, never both (§3.3 *Two op forms*)');
    const p = platOf(spec.key as ArenaKey);
    // Each declared op and the callback run with their overlay as this kernel's open transaction.
    const ops: KernelOp[] = spec.ops.map((op) => {
      const prepare = op.prepare;
      const wrapped: KernelOp = { kind: op.kind, lineage: op.lineage, index: op.index, apply: (o) => within(o, () => op.apply(o)) };
      return prepare === undefined ? wrapped : { ...wrapped, prepare: (o: Overlay) => within(o, () => prepare(o)) };
    });
    const call = fn === undefined ? undefined : (o: Overlay): KernelResult<T> => within(o, () => fn(o));
    const frame = { o: null as Overlay | null, stamped: [] as object[] };
    frames.push(frame);
    let r: KernelResult<Committed<T | KernelResult<unknown>[]>> | undefined;
    try {
      r = txOn(p, ops.length === 0 ? spec : { ...spec, ops }, call, env);
    } finally {
      frames.pop();
      // The batch's values: current at the version it committed (or kept, when it wrote nothing); never current when
      // it was rejected or threw — the arena is back at its prior version and those slots name nothing (C-0219 (3)).
      const at = r !== undefined && r.ok ? { key: p.key, version: p.version } : { key: p.key, version: -1 };
      for (const v of frame.stamped) stampWith(at, v);
    }
    if (r.ok) stamp(p, r.value);
    return stamp(p, r);
  };

  const kernel: Kernel = {
    plat: (key: PlatKey) => platOf(key),
    view,
    resolve,
    geom,
    index,
    tx: runTx,
    rng: createRng,
    pool: notBuilt('M1', 'pool', 'the derivation pool\'s overlays and merge are M1\'s; pool size 0 runs in the generation worker (§3.3; §4b)'),
    assertCurrent: (value: unknown, key?: PlatKey) => {
      if (!debugMode()) return;
      if (key !== undefined) {
        assertStamped(platOf(key), value);
        return;
      }
      for (const p of arenas.values()) {
        if (stampedFor(value, p)) {
          assertStamped(p, value);
          return;
        }
      }
      fail('the value is stamped for no arena of this kernel (§3.4)');
    },
  };
  return Object.freeze(kernel);
}

/** Does the value's stamp name arena `p`? */
function stampedFor(value: unknown, p: Plat): boolean {
  const s = stampOf(value);
  return s !== undefined && sameKey(s.key, p.key);
}
