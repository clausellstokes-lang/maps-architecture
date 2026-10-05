// The random batch generator of this item's fuzz runs (fuzz.test.ts) and cost-model check (cost.test.ts): ways and
// finer chains inserted, whole chains and stretches removed (a stretch's far part rekeyed first, or not), faces re-owned,
// finer content cleared — each as a callback batch at its level. Not a test file: shared by the two.
import { faceKey, idOf, isFaceLive, type Plat } from '../../src/arena/index.js';
import { insertChain } from '../../src/insert/index.js';
import type { KernelError, KernelResult } from '../../src/num/index.js';
import { clearFiner, removeEdges, retypeEdges, routeLines, setOwner, type Overlay } from '../../src/tx/index.js';
import type { Level } from '../../src/types/index.js';
import { pt } from './support.js';

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

export interface Live {
  ways: string[];
  kerbs: string[];
  next: number;
}

/** One random batch; returns its level and the callback. */
/** The batch mix: the share of way insertions, and of way plus lane insertions (the rest removals, re-owns, clears). */
export interface Mix {
  readonly way: number;
  readonly lane: number;
  /**
   * The share, after `lane`, of finer chains drawn ALONG a live way's route — an L2 kerb or an L3 plot line sharing 1 – 3
   * of its route edges, so removing or retyping the way later demotes them to the finer level (rule 3 (a); C-0185 (3),
   * checks/M0-a-06.md F-1). Absent in DEFAULT_MIX, whose draws the regression seeds replay unchanged.
   */
  readonly along?: number;
}

export const DEFAULT_MIX: Mix = { way: 0.3, lane: 0.45 };

/** A mix with finer chains along the ways (F-1's case reached by B-FUZZ): ways, lanes, alongs, then the rest. */
export const ALONG_MIX: Mix = { way: 0.25, lane: 0.35, along: 0.15 };

export function randomBatch(p: Plat, live: Live, r: () => number, mix: Mix = DEFAULT_MIX): { level: Level; kind: string; fn: (o: Overlay) => KernelResult<null> } {
  const at = (): number => Math.floor(r() * 4001);
  const inner = (): number => 200 + Math.floor(r() * 3601);
  const k = r();
  const done = (): KernelResult<null> => ({ ok: true, value: null, warnings: [] });
  const fail = (x: { readonly code: KernelError; readonly detail: string }): KernelResult<null> => ({ ok: false, code: x.code, detail: x.detail });
  if (k < mix.way || live.ways.length === 0) {
    const id = `way:${live.next++}`;
    const pts = r() < 0.5 ? [pt(0, at()), pt(inner(), inner()), pt(4000, at())] : [pt(at(), 0), pt(inner(), inner()), pt(at(), 4000)];
    return { level: 1, kind: 'insert way', fn: (o) => { const x = insertChain(o, pts, [{ role: 'way', entity: id }], 'mandatory'); if (x.ok) live.ways.push(id); return x.ok ? done() : fail(x); } };
  }
  if (k < mix.lane) {
    const id = `lane:${live.next++}`;
    const pts = [pt(inner(), inner()), pt(inner(), inner())];
    return { level: 2, kind: 'insert lane', fn: (o) => { const x = insertChain(o, pts, [{ role: 'kerb', entity: id }], 'mandatory'); if (x.ok) live.kerbs.push(id); return x.ok ? done() : fail(x); } };
  }
  if (mix.along !== undefined && k < mix.lane + mix.along) {
    const id = live.ways[Math.floor(r() * live.ways.length)];
    const fine = r() < 0.5;
    const fid = `${fine ? 'lane' : 'plot'}:${live.next++}`;
    const startU = r();
    const lenU = r();
    return {
      level: fine ? 2 : 3,
      kind: 'insert along',
      fn: (o) => {
        const res = tx2routes(p, id);
        if (res.length < 2) return done();
        const i = Math.floor(startU * (res.length - 1));
        const j = Math.min(res.length - 1, i + 1 + Math.floor(lenU * 3));
        const x = insertChain(o, res.slice(i, j + 1), [{ role: fine ? 'kerb' : 'plot_line', entity: fid }], 'mandatory');
        if (x.ok && fine) live.kerbs.push(fid);
        return x.ok ? done() : fail(x);
      },
    };
  }
  if (k < 0.6) {
    const i = Math.floor(r() * live.ways.length);
    const id = live.ways[i];
    return { level: 1, kind: 'remove way', fn: (o) => { const x = removeEdges(o, { role: 'way', entity: id }); if (x.ok) live.ways.splice(i, 1); return x.ok ? done() : fail(x); } };
  }
  if (k < 0.7 && live.kerbs.length > 0) {
    const i = Math.floor(r() * live.kerbs.length);
    const id = live.kerbs[i];
    return { level: 2, kind: 'remove lane', fn: (o) => { const x = removeEdges(o, { role: 'kerb', entity: id }); if (x.ok) live.kerbs.splice(i, 1); return x.ok ? done() : fail(x); } };
  }
  if (k < 0.85) {
    // A stretch of a way between two of its route vertices removed, its far part handed to a new way first (or not).
    const id = live.ways[Math.floor(r() * live.ways.length)];
    const rekeyFirst = r() < 0.7;
    const fresh = `way:${live.next++}`;
    return {
      level: 1,
      kind: rekeyFirst ? 'stretch (rekeyed)' : 'stretch',
      fn: (o) => {
        const res = tx2routes(p, id);
        if (res.length < 3) return done();
        const i = 1 + Math.floor(r() * (res.length - 2));
        const j = Math.min(res.length - 1, i + 1 + Math.floor(r() * 2));
        if (rekeyFirst && j < res.length - 1) {
          const x = retypeEdges(o, { chain: { role: 'way', entity: id }, from: res[j], to: res[res.length - 1] }, [], [], { from: id, to: fresh });
          if (!x.ok) return fail(x);
          live.ways.push(fresh);
        }
        const y = removeEdges(o, { chain: { role: 'way', entity: id }, from: res[i], to: res[j] });
        return y.ok ? done() : fail(y);
      },
    };
  }
  if (k < 0.93) {
    const faces: number[] = [];
    for (let f = 0; f < p.slots.face[1].top; f++) if (isFaceLive(p, 1, f)) faces.push(f);
    if (faces.length === 0) return { level: 1, kind: 'empty', fn: () => done() };
    faces.sort((a, b) => {
      const ka = faceKey(p, 1, a);
      const kb = faceKey(p, 1, b);
      return p.vertices.y[ka[0]] - p.vertices.y[kb[0]] || p.vertices.x[ka[0]] - p.vertices.x[kb[0]] || p.vertices.y[ka[1]] - p.vertices.y[kb[1]] || p.vertices.x[ka[1]] - p.vertices.x[kb[1]];
    });
    const f = faces[Math.floor(r() * faces.length)];
    const owner = `block:${live.next++}`;
    return { level: 1, kind: 'setOwner', fn: (o) => { const x = setOwner(o, [f], owner); return x.ok ? done() : fail(x); } };
  }
  // Clear the L2 content of an owned L1 face.
  const owners: string[] = [];
  for (let f = 0; f < p.slots.face[1].top; f++) if (isFaceLive(p, 1, f) && p.faces[1].owner[f] >= 0) owners.push(String(p.faces[1].owner[f]));
  return {
    level: 1,
    kind: 'clear',
    fn: (o) => {
      for (let f = 0; f < p.slots.face[1].top; f++) {
        if (!isFaceLive(p, 1, f) || p.faces[1].owner[f] < 0) continue;
        const x = clearFiner(o, { owner: idOfFace(p, f), level: 1 }, 1);
        return x.ok ? done() : fail(x);
      }
      void owners;
      return done();
    },
  };
}

function idOfFace(p: Plat, f: number): string {
  return idOf(p, p.faces[1].owner[f]);
}

/** The route vertices of a way as lattice points, in chain order (one run). */
function tx2routes(p: Plat, id: string): ReturnType<typeof pt>[] {
  const lines = routeLines(p, { role: 'way', entity: id }, { layer: 'ground', part: 0 });
  if (lines.length !== 1) return [];
  return lines[0].vertices.map((v) => pt(p.vertices.x[v], p.vertices.y[v]));
}
