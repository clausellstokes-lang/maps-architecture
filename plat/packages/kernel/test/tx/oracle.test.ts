// M0-a-06 hardening round S8, line 4 (c): THE ORACLE FUZZ — the frame observer (support.ts `installFrameObserver`) over
// random batches that open every frame the kernel opens today: the batch's (tx.ts), the op frames of opSave (splitFace's
// own, claimSubFace's, radialSplit's and ringBand's, the oracle's own at random depth — rolled back, or dropped into
// their parent) and the kerb read's dry run (kerb.ts dryInsert). Besides fuzzgen.ts's six ops (ways, lanes, finer
// chains along ways, removals, stretches, re-owns and clears) the generator draws splitFace, connectHole, claimSubFace,
// radialSplit, ringBand, mergeFaces (a split's two children), absorbSliver (its residue path among them), pinVertices, a
// kerb read on a live L1 face bounded by ways with widths, a warp step (warp.ts commitStep), and hole-making — an isolated
// closed ring inserted inside a face (the re-walk's setFaceHoles), which connectHole then opens — so the tiny-tables
// mode compacts and grows the hole pools inside frames. Every op runs first inside an op frame that is rolled back, then
// again to commit (or, drawn, in a frame dropped into its parent; and with a share of batches wrapping all their ops in
// an outer frame rolled back first — frames at random depth, siblings writing shared slots); every batch is first
// rejected, then re-run to commit. At every put-back of a marked image the observer undoes the door's log to the mark and
// compares the arena (CHECK B: the log is complete), then compares the arena and its index after the put-back (CHECK A).
// PLAT_FUZZ_RUNS batches in all (10⁴ at the PR size); in the kernel and kernel-tiny projects. Never takeSavepoint /
// restoreSavepoint inside a batch (S9 refuses that use).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { faceKey, faceWalk, isFaceLive, type FaceId, type Plat } from '../../src/arena/index.js';
import { kerb } from '../../src/arr/kerb.js';
import { absorbSliver, claimSubFace, connectHole, mergeFaces, pinVertices, radialSplit, ringBand, splitFace } from '../../src/faces/index.js';
import { opSave, rollback } from '../../src/faces/common.js';
import { insertChain } from '../../src/insert/index.js';
import { err, type KernelResult } from '../../src/num/index.js';
import { setOwner, tx, type Overlay } from '../../src/tx/index.js';
import type { OpenTx } from '../../src/tx/state.js';
import type { Cm, Level } from '../../src/types/index.js';
import { warp } from '../../src/warp/index.js';
import { TINY_TABLES } from '../arena/tiny.js';
import { ALONG_MIX, randomBatch, rng, type Live } from './fuzzgen.js';
import { FRAME_KINDS, frameStats, framed, installFrameObserver, pt, resetFrameStats, spec, state } from './support.js';

installFrameObserver();

const RUNS = fc.readConfigureGlobal().numRuns ?? 10_000;
/** Batches per sequence (a fresh framed arena each). */
const STEPS = 12;
const DB = [{ role: 'district_bound', entity: 'd:oracle' }];
/** Every way's half-width for the kerb reads (cm). */
const HW = 60;

interface OracleLive extends Live {
  /** The closed rings inserted (their entities carry a `junction` knot pinVertices pins). */
  rings: string[];
  /** Pairs of faces a committed split made (mergeFaces' operands). */
  pairs: [FaceId, FaceId][];
  ringNext: number;
}

function copyLive(l: OracleLive): OracleLive {
  return { ways: l.ways.slice(), kerbs: l.kerbs.slice(), next: l.next, rings: l.rings.slice(), pairs: l.pairs.slice(), ringNext: l.ringNext };
}

function restoreLive(l: OracleLive, s: OracleLive): void {
  l.ways = s.ways.slice();
  l.kerbs = s.kerbs.slice();
  l.next = s.next;
  l.rings = s.rings.slice();
  l.pairs = s.pairs.slice();
  l.ringNext = s.ringNext;
}

/** A recorded draw stream: the first run of an op records its draws, every re-run replays them (the arena is the same). */
function tape(r: () => number): { draw: () => number; rewind: () => void } {
  const seen: number[] = [];
  let i = 0;
  return {
    draw: () => {
      if (i < seen.length) return seen[i++];
      const x = r();
      seen.push(x);
      i++;
      return x;
    },
    rewind: () => {
      i = 0;
    },
  };
}

/** The live L1 faces in canonical key order (slot-free, as fuzzgen sorts them). */
function l1Faces(p: Plat): FaceId[] {
  const out: FaceId[] = [];
  for (let f = 0; f < p.slots.face[1].top; f++) if (isFaceLive(p, 1, f)) out.push(f);
  return out.sort((a, b) => {
    const ka = faceKey(p, 1, a);
    const kb = faceKey(p, 1, b);
    const X = p.vertices.x;
    const Y = p.vertices.y;
    return Y[ka[0]] - Y[kb[0]] || X[ka[0]] - X[kb[0]] || Y[ka[1]] - Y[kb[1]] || X[ka[1]] - X[kb[1]];
  });
}

/** The lattice points of a face's outer ring. */
function outerPoints(p: Plat, f: FaceId): [number, number][] {
  const O = p.halfEdges.origin;
  return faceWalk(p, 1, f)[0].map((h) => [p.vertices.x[O[h]], p.vertices.y[O[h]]] as [number, number]);
}

type OpFn = (o: Overlay) => KernelResult<unknown>;

/** One op of an L1 batch: its kind and its body (its parameters drawn when it first runs, replayed after). */
interface Op {
  readonly kind: string;
  readonly run: OpFn;
}

const done = (): KernelResult<null> => ({ ok: true, value: null, warnings: [] });

/** A random L1 op on the arena as it stands when the op runs (its draws on the op's tape). */
function l1Op(p: Plat, live: OracleLive, d: () => number, counts: Map<string, number>): Op {
  const k = d();
  const pick = <T>(xs: readonly T[]): T => xs[Math.floor(d() * xs.length)];
  const face = (): FaceId | null => {
    const fs = l1Faces(p);
    return fs.length === 0 ? null : pick(fs);
  };
  const note = (kind: string, r: KernelResult<unknown>): KernelResult<unknown> => {
    if (r.ok) counts.set(kind, (counts.get(kind) ?? 0) + 1);
    return r;
  };
  if (k < 0.16) {
    return { kind: 'splitFace', run: (o) => {
      const f = face();
      if (f === null) return done();
      const ring = outerPoints(p, f);
      const a = pick(ring);
      const b = pick(ring);
      const bend = d() < 0.4;
      const cx = Math.round((a[0] + b[0]) / 2 + (d() - 0.5) * 300);
      const cy = Math.round((a[1] + b[1]) / 2 + (d() - 0.5) * 300);
      const cut = bend ? [a, [cx, cy] as [number, number], b] : [a, b];
      const r = splitFace(o, f, cut.map(([x, y]) => pt(x, y)), { rows: DB });
      if (r.ok) live.pairs.push([r.value[0], r.value[1]]);
      return note('splitFace', r);
    } };
  }
  if (k < 0.26) {
    return { kind: 'ring', run: (o) => {
      // An isolated closed ring inside a face: the re-walk's setFaceHoles (hole-making).
      const f = face();
      if (f === null) return done();
      const ring = outerPoints(p, f);
      const cx = Math.round(ring.reduce((s, q) => s + q[0], 0) / ring.length + (d() - 0.5) * 200);
      const cy = Math.round(ring.reduce((s, q) => s + q[1], 0) / ring.length + (d() - 0.5) * 200);
      const rad = 40 + Math.floor(d() * 120);
      const pts = [pt(cx - rad, cy - rad), pt(cx + rad, cy - rad), pt(cx + rad, cy + rad), pt(cx - rad, cy + rad)];
      const id = `ring:${live.ringNext++}`;
      const r = insertChain(o, pts, [{ role: 'district_bound', entity: id }], 'mandatory', { closed: true, knots: [{ index: 0, role: 'junction', ordinal: 0 }] });
      if (r.ok) live.rings.push(id);
      return note('ring', r);
    } };
  }
  if (k < 0.34) {
    return { kind: 'connectHole', run: (o) => {
      const fs = l1Faces(p).filter((f) => faceWalk(p, 1, f).length > 1);
      if (fs.length === 0) return done();
      const f = pick(fs);
      const rings = faceWalk(p, 1, f);
      const O = p.halfEdges.origin;
      const at = (h: number): [number, number] => [p.vertices.x[O[h]], p.vertices.y[O[h]]];
      const a = at(pick(rings[0]));
      const b = at(pick(rings[1 + Math.floor(d() * (rings.length - 1))]));
      return note('connectHole', connectHole(o, f, [pt(a[0], a[1]), pt(b[0], b[1])], { rows: DB }));
    } };
  }
  if (k < 0.42) {
    return { kind: 'mergeFaces', run: (o) => {
      const pairs = live.pairs.filter(([a, b]) => isFaceLive(p, 1, a) && isFaceLive(p, 1, b));
      if (pairs.length === 0) return done();
      const [a, b] = pick(pairs);
      return note('mergeFaces', mergeFaces(o, a, b));
    } };
  }
  if (k < 0.48) {
    return { kind: 'absorbSliver', run: (o) => {
      const f = face();
      if (f === null) return done();
      const floor = { minWidthCm: Math.floor(d() * 1500), minAreaCm2: Math.floor(d() * 2_000_000) };
      return note('absorbSliver', absorbSliver(o, f, floor));
    } };
  }
  if (k < 0.53) {
    return { kind: 'pinVertices', run: (o) => {
      if (live.rings.length === 0) return done();
      return note('pinVertices', pinVertices(o, [{ role: 'junction', entity: pick(live.rings) }]));
    } };
  }
  if (k < 0.6) {
    return { kind: 'claimSubFace', run: (o) => {
      const f = face();
      if (f === null) return done();
      const ring = outerPoints(p, f);
      const xs = ring.map((q) => q[0]);
      const ys = ring.map((q) => q[1]);
      const x0 = Math.min(...xs);
      const y0 = Math.min(...ys);
      const w = Math.max(...xs) - x0;
      const h = Math.max(...ys) - y0;
      const a = [x0 + Math.floor(d() * w * 0.5), y0 + Math.floor(d() * h * 0.5)];
      const b = [a[0] + 60 + Math.floor(d() * w * 0.5), a[1] + 60 + Math.floor(d() * h * 0.5)];
      return note('claimSubFace', claimSubFace(o, { ring: [pt(a[0], a[1]), pt(b[0], a[1]), pt(b[0], b[1]), pt(a[0], b[1])] }, `claim:${live.next++}`));
    } };
  }
  if (k < 0.66) {
    return { kind: 'radialSplit', run: (o) => {
      const f = face();
      if (f === null) return done();
      const ring = outerPoints(p, f);
      const cx = Math.round(ring.reduce((s, q) => s + q[0], 0) / ring.length);
      const cy = Math.round(ring.reduce((s, q) => s + q[1], 0) / ring.length);
      const n = 2 + Math.floor(d() * 3);
      const rays = Array.from({ length: n }, () => Math.floor(d() * 36_000));
      return note('radialSplit', radialSplit(o, f, pt(cx, cy), rays, { rows: DB }));
    } };
  }
  if (k < 0.72) {
    return { kind: 'ringBand', run: (o) => {
      const f = face();
      if (f === null) return done();
      return note('ringBand', ringBand(o, f, 20 + Math.floor(d() * 280), { rows: DB }));
    } };
  }
  if (k < 0.84) {
    return { kind: 'kerb', run: (o) => {
      // A kerb read (the dry-run frame) on a live L1 face bounded by ways with widths.
      const fs = l1Faces(p);
      if (fs.length === 0 || live.ways.length === 0) return done();
      const f = pick(fs);
      const r = kerb(o, f, (c) => (c.role === 'way' ? { halfWidthCm: HW } : null));
      counts.set(r.ok ? 'kerb' : 'kerb refused', (counts.get(r.ok ? 'kerb' : 'kerb refused') ?? 0) + 1);
      return done();
    } };
  }
  if (k < 0.93) {
    return { kind: 'warp', run: (o) => {
      const fs = l1Faces(p);
      if (fs.length === 0) return done();
      const ring = outerPoints(p, pick(fs));
      const c = pick(ring);
      const dx = Math.round((d() - 0.5) * 120);
      const dy = Math.round((d() - 0.5) * 120);
      const rad = 150 + Math.floor(d() * 600);
      const region = [{ x: (c[0] - rad) as Cm, y: (c[1] - rad) as Cm }, { x: (c[0] + rad) as Cm, y: (c[1] - rad) as Cm }, { x: (c[0] + rad) as Cm, y: (c[1] + rad) as Cm }, { x: (c[0] - rad) as Cm, y: (c[1] + rad) as Cm }];
      const r = warp(o, { displacement: () => ({ x: dx, y: dy }) }, 1, region);
      if (r.ok && r.value.applied && r.value.moves.length > 0) counts.set('warp moved', (counts.get('warp moved') ?? 0) + 1);
      return r.ok ? done() : r;
    } };
  }
  return { kind: 'reown', run: (o) => {
    // Two re-owns of one face in sibling frames (the second writes the slots the first wrote).
    const f = face();
    if (f === null) return done();
    return note('reown', setOwner(o, [f], `block:${live.next++}`));
  } };
}

/** How an op runs inside its batch: plain, first in a frame rolled back then again, or inside a frame dropped. */
type Mode = 'plain' | 'rollback' | 'drop';

interface Batch {
  readonly level: Level;
  readonly kinds: string[];
  /** Runs the batch's ops (each by its mode, under an optional outer frame rolled back first). */
  readonly fn: (o: Overlay) => KernelResult<null>;
}

/** One random batch: an L1 batch of 1 – 3 ops of the face pool, or one of fuzzgen.ts's six ops. */
function oracleBatch(p: Plat, live: OracleLive, r: () => number, counts: Map<string, number>): Batch {
  const fuzz = r() < 0.4;
  const modes: Mode[] = [];
  const tapes: ReturnType<typeof tape>[] = [];
  let level: Level = 1;
  let bodies: ((o: Overlay) => KernelResult<unknown>)[];
  const kinds: string[] = [];
  if (fuzz) {
    const t = tape(r);
    tapes.push(t);
    // fuzzgen's batch (its own draws on the tape: a stretch draws inside its callback), built again for every run on
    // the same tape and the same entity numbers, so a re-run builds the same op on the same arena
    const base = live.next;
    const b = randomBatch(p, live, t.draw, ALONG_MIX);
    level = b.level;
    kinds.push(b.kind);
    bodies = [(o) => {
      t.rewind();
      live.next = base;
      return randomBatch(p, live, t.draw, ALONG_MIX).fn(o);
    }];
    modes.push(r() < 0.6 ? 'rollback' : r() < 0.5 ? 'drop' : 'plain');
  } else {
    const n = 1 + Math.floor(r() * 3);
    bodies = [];
    for (let i = 0; i < n; i++) {
      const t = tape(r);
      tapes.push(t);
      bodies.push((o) => {
        t.rewind();
        const op = l1Op(p, live, t.draw, counts);
        if (kinds.length < n) kinds.push(op.kind);
        return op.run(o);
      });
      modes.push(r() < 0.6 ? 'rollback' : r() < 0.5 ? 'drop' : 'plain');
    }
  }
  const outer = r() < 0.3;
  const fn = (o: Overlay): KernelResult<null> => {
    const t = o as unknown as OpenTx;
    const runAll = (): KernelResult<null> => {
      for (let i = 0; i < bodies.length; i++) {
        if (modes[i] === 'rollback') {
          const s = opSave(t);
          const snap = copyLive(live);
          bodies[i](o);
          rollback(t, s, err('E_INVARIANT', 'oracle: the op frame rolled back'));
          restoreLive(live, snap);
        }
        if (modes[i] === 'drop') opSave(t); // a frame its caller drops: committed into the parent implicitly
        const x = bodies[i](o);
        if (!x.ok) return { ok: false, code: x.code, detail: x.detail };
      }
      return done();
    };
    if (outer) {
      const s = opSave(t);
      const snap = copyLive(live);
      runAll();
      rollback(t, s, err('E_INVARIANT', 'oracle: the outer frame rolled back'));
      restoreLive(live, snap);
    }
    return runAll();
  };
  return { level, kinds, fn };
}

/** The sequences: each a fresh framed arena and STEPS batches, each batch rejected first, then re-run to commit. */
function runSequences(batches: number, seed0: number): { counts: Map<string, number>; committed: number; refused: number; throws: string[] } {
  const counts = new Map<string, number>();
  let committed = 0;
  let refused = 0;
  const throws: string[] = [];
  const sequences = Math.max(1, Math.ceil(batches / STEPS));
  for (let s = 0; s < sequences; s++) {
    const r = rng((seed0 + s) * 7919);
    const p = framed();
    const live: OracleLive = { ways: [], kerbs: [], next: 0, rings: [], pairs: [], ringNext: 0 };
    for (let step = 0; step < STEPS && s * STEPS + step < batches; step++) {
      const snap = copyLive(live);
      const b = oracleBatch(p, live, r, counts);
      const before = state(p);
      const sp = spec(b.level, { rederivesFrom: 0 as never });
      try {
        // first rejected: every frame inside it undone, the batch's image put back
        const rej = tx(p, sp, (o) => {
          const x = b.fn(o);
          return x.ok ? err('E_INVARIANT', 'oracle: the batch rejected') : x;
        });
        expect(rej.ok).toBe(false);
        expect(state(p), `sequence ${s} step ${step}: a rejected batch wrote`).toBe(before);
        restoreLive(live, snap);
        // then re-run to commit
        const res = tx(p, sp, b.fn);
        if (res.ok) committed++;
        else {
          refused++;
          restoreLive(live, snap);
        }
      } catch (e) {
        throws.push(`sequence ${s} step ${step} (${b.kinds.join(', ')}): ${(e as Error).message.slice(0, 200)}`);
        restoreLive(live, snap);
      }
    }
  }
  return { counts, committed, refused, throws };
}

/**
 * The growths, rehashes and pool compactions the tiny mode must see undone inside frames, at the levels the generator
 * writes: faces at L1 – L3 (ways, lanes and splits at L1, kerbs at L2, plot lines at L3; L0 holds the frame alone), owners
 * at L1 and L2 (re-owns and claims; the own children a finer record materialises), hole pools at L1 and L2.
 */
const TINY_UNDONE = [
  'grow vertices', 'grow pairs', 'grow role rows', 'grow faces[1]', 'grow faces[2]', 'grow faces[3]',
  'rehash roles.head', 'rehash faces[1].ownerHead', 'rehash faces[2].ownerHead', 'rehash handles.slots',
  'compact faces[1].holes', 'compact faces[2].holes',
];

describe('the oracle fuzz (S8 line 4 (c)): the door\'s log undoes every frame the kernel opens, and every put-back is exact', () => {
  it(`PLAT_FUZZ_RUNS batches (${RUNS}) with the frame observer on${TINY_TABLES ? ' — tiny tables' : ''}`, () => {
    resetFrameStats();
    const t0 = Date.now();
    const { counts, committed, refused, throws } = runSequences(RUNS, TINY_TABLES ? 50_000 : 1);
    const st = frameStats();
    const undone = [...st.undone].sort((a, b) => (a[0] < b[0] ? -1 : 1));
    console.log(`oracle${TINY_TABLES ? ' (tiny)' : ''}: ${RUNS} batches, ${committed} committed, ${refused} refused, ${throws.length} thrown, ${Math.round((Date.now() - t0) / 1000)} s; marks ${JSON.stringify(st.marks)} compared ${JSON.stringify(st.compared)}; ops ${JSON.stringify([...counts].sort((a, b) => (a[0] < b[0] ? -1 : 1)))}; undone ${JSON.stringify(undone)}`);
    if (throws.length > 0) console.log(`oracle: throws (informative; a throw rolls the batch back through the observer too):\n${throws.slice(0, 20).join('\n')}`);
    expect(st.failures.slice(0, 10)).toEqual([]);
    for (const k of FRAME_KINDS) expect(st.compared[k], `marks compared for ${k} frames`).toBeGreaterThan(0);
    if (TINY_TABLES) for (const k of TINY_UNDONE) expect(st.undone.get(k) ?? 0, `undone inside frames: ${k}`).toBeGreaterThan(0);
  }, 3_600_000);
});
