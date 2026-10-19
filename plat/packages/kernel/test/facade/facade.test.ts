// M0-a-16's façade tests (§14 `interface Kernel`: plat, view, resolve, geom, index, tx; §3.3 *Two op forms*: "a
// transaction that supplies both `ops` and a callback is a programming error caught by an assertion"; §3.4 *Arenas,
// keys and services*: every service that reads an arena takes it by key, and `kerb`, `offsetFace`, `insetRing`,
// `sideRuns`, `sampleBoundary` "read the open transaction's arena and are called only inside one"; readings C-0220).
// Every writer and every keyed service is judged against the module that builds it on a twin arena: the façade adds no
// geometry of its own.
import { describe, expect, it } from 'vitest';
import { compareVertices, faceKey, faceWalk, isFaceLive, resolve as resolveOn, signature as signatureOn, type FaceId, type Plat } from '../../src/arena/index.js';
import { bandUnion, corridorUnion, insetRing, kerb, offsetFace } from '../../src/arr/index.js';
import { absorbSliver, claimSubFace, connectHole, mergeFaces, pinVertices, radialSplit, ringBand, splitFace } from '../../src/faces/index.js';
import { createKernel, type Kernel } from '../../src/facade/index.js';
import { faceNeighbours, faceRings, sampleBoundary, sideRuns } from '../../src/geom/index.js';
import { OUTSIDE, pointLocate, query, rebuildAtStageEnd } from '../../src/index/index.js';
import { insertChain, splitThrough } from '../../src/insert/index.js';
import type { KernelResult } from '../../src/num/index.js';
import { clearFiner, removeEdges, resolveStretch, retypeEdges, sampleProfile, setOwner, tx, type Overlay } from '../../src/tx/index.js';
import type { Cm, Level, PlatKey } from '../../src/types/index.js';
import { warp } from '../../src/warp/index.js';
import { AT_S9 } from '../arr/bands/support.js';
import { faceAt } from '../faces/support.js';
import { halfEdgeBetween } from '../tx/support.js';
import { createPlat, setDebugAssertions } from '../../src/arena/index.js';
import { FRAME } from '../arena/support.js';
import { commit, crossing, emptyOn, framed, GROUND, healthy, kernelOver, pt, RAISED, spec, state, W300 } from './support.js';

const DB = [{ role: 'district_bound', entity: 'd:9' }];
const okv = <T>(value: T): KernelResult<T> => ({ ok: true, value, warnings: [] });
const rect = (x0: number, y0: number, x1: number, y1: number) => [pt(x0, y0), pt(x1, y0), pt(x1, y1), pt(x0, y1)];

/** A batch's outcome as text: its result (stamps live in a side table, not in the value) or the error it threw. */
function outcome(run: () => unknown): string {
  try {
    return `ok ${JSON.stringify(run())}`;
  } catch (e) {
    return `threw ${(e as Error).message}`;
  }
}

interface Twin {
  readonly level: Level;
  readonly over?: Parameters<typeof spec>[1];
  /** Through the façade (`g` = kernel.geom; faces read on the arena). */
  readonly facade: (k: Kernel, o: Overlay, p: Plat) => KernelResult<unknown>;
  /** Through the module, on the twin arena. */
  readonly module: (o: Overlay, p: Plat) => KernelResult<unknown>;
}

/** Runs one batch through the façade on one crossing and through the module on its twin; returns both outcomes and prints. */
function twin(t: Twin): { a: string; b: string; pa: string; pb: string } {
  const A = crossing().p;
  const B = crossing().p;
  const k = kernelOver([A]);
  const a = outcome(() => k.tx(spec(t.level, t.over), (o) => t.facade(k, o, A)));
  const b = outcome(() => tx(B, spec(t.level, t.over), (o) => t.module(o, B)));
  return { a, b, pa: state(A), pb: state(B) };
}

const LL = (p: Plat): FaceId => faceAt(p, 1, 1000, 1000);
const LR = (p: Plat): FaceId => faceAt(p, 1, 3000, 1000);
const QUADS = (p: Plat): FaceId[] => [faceAt(p, 1, 1000, 1000), faceAt(p, 1, 3000, 1000), faceAt(p, 1, 1000, 3000), faceAt(p, 1, 3000, 3000)];

const WRITER_TWINS: Record<string, Twin> = {
  insertChain: { level: 1, facade: (k, o) => k.geom.insertChain(o, [pt(500, 500), pt(1500, 500)], DB, 'mandatory'), module: (o) => insertChain(o, [pt(500, 500), pt(1500, 500)], DB, 'mandatory') },
  splitThrough: {
    level: 1,
    facade: (k, o, p) => k.geom.splitThrough(o, halfEdgeBetween(p, [0, 2000], [2000, 2000]), pt(1000, 2000)),
    module: (o, p) => splitThrough(o, halfEdgeBetween(p, [0, 2000], [2000, 2000]), pt(1000, 2000)),
  },
  removeEdges: { level: 1, facade: (k, o) => k.geom.removeEdges(o, { role: 'way', entity: 'way:2' }), module: (o) => removeEdges(o, { role: 'way', entity: 'way:2' }) },
  clearFiner: { level: 1, facade: (k, o) => k.geom.clearFiner(o, { owner: 'district:1', level: 1 }, 1), module: (o) => clearFiner(o, { owner: 'district:1', level: 1 }, 1) },
  retypeEdges: { level: 1, facade: (k, o) => k.geom.retypeEdges(o, { role: 'way', entity: 'way:1' }, DB, []), module: (o) => retypeEdges(o, { role: 'way', entity: 'way:1' }, DB, []) },
  setOwner: { level: 1, facade: (k, o, p) => k.geom.setOwner(o, [LL(p)], 'x:1'), module: (o, p) => setOwner(o, [LL(p)], 'x:1') },
  splitFace: { level: 1, facade: (k, o, p) => k.geom.splitFace(o, LL(p), [pt(0, 1000), pt(2000, 1000)], { rows: DB }), module: (o, p) => splitFace(o, LL(p), [pt(0, 1000), pt(2000, 1000)], { rows: DB }) },
  connectHole: { level: 1, facade: (k, o, p) => k.geom.connectHole(o, LL(p), [pt(0, 1000), pt(1000, 1000)], { rows: DB }), module: (o, p) => connectHole(o, LL(p), [pt(0, 1000), pt(1000, 1000)], { rows: DB }) },
  mergeFaces: { level: 1, facade: (k, o, p) => k.geom.mergeFaces(o, LL(p), LR(p)), module: (o, p) => mergeFaces(o, LL(p), LR(p)) },
  absorbSliver: { level: 1, facade: (k, o, p) => k.geom.absorbSliver(o, LL(p), { minWidthCm: 3000, minAreaCm2: 1e8 }), module: (o, p) => absorbSliver(o, LL(p), { minWidthCm: 3000, minAreaCm2: 1e8 }) },
  claimSubFace: { level: 1, facade: (k, o) => k.geom.claimSubFace(o, { ring: rect(500, 500, 1500, 1500) }, 'res:1'), module: (o) => claimSubFace(o, { ring: rect(500, 500, 1500, 1500) }, 'res:1') },
  radialSplit: { level: 2, facade: (k, o, p) => k.geom.radialSplit(o, LL(p), pt(1000, 1000), [0, 9000, 18000, 27000], { faceLevel: 1 }), module: (o, p) => radialSplit(o, LL(p), pt(1000, 1000), [0, 9000, 18000, 27000], { faceLevel: 1 }) },
  ringBand: { level: 2, facade: (k, o, p) => k.geom.ringBand(o, LL(p), 200, { faceLevel: 1 }), module: (o, p) => ringBand(o, LL(p), 200, { faceLevel: 1 }) },
  corridorUnion: { level: 2, over: AT_S9, facade: (k, o, p) => k.geom.corridorUnion(o, QUADS(p)), module: (o, p) => corridorUnion(o, QUADS(p), W300) },
  bandUnion: {
    level: 2,
    over: AT_S9,
    facade: (k, o, p) => k.geom.bandUnion(o, [{ ref: { role: 'way', entity: 'way:1' }, halfWidthCm: 300, ends: 'round' }], [LL(p), LR(p)], 'band', 'band:1'),
    module: (o, p) => bandUnion(o, [{ ref: { role: 'way', entity: 'way:1' }, halfWidthCm: 300, ends: 'round' }], [LL(p), LR(p)], 'band', 'band:1'),
  },
  warp: {
    level: 1,
    facade: (k, o) => k.geom.warp(o, { displacement: (x) => ({ x: x > 1500 && x < 2500 ? 60 : 0, y: 0 }) }, 1, rect(1500, 1500, 2500, 2500)),
    module: (o) => warp(o, { displacement: (x) => ({ x: x > 1500 && x < 2500 ? 60 : 0, y: 0 }) }, 1, rect(1500, 1500, 2500, 2500)),
  },
  pinVertices: {
    level: 1,
    facade: (k, o) => {
      insertChain(o, [pt(500, 500), pt(1500, 500)], DB, 'mandatory', { knots: [{ index: 0, role: 'entrance', ordinal: 0 }] });
      return k.geom.pinVertices(o, [{ role: 'entrance', entity: 'd:9', ordinal: 0 }]);
    },
    module: (o) => {
      insertChain(o, [pt(500, 500), pt(1500, 500)], DB, 'mandatory', { knots: [{ index: 0, role: 'entrance', ordinal: 0 }] });
      return pinVertices(o, [{ role: 'entrance', entity: 'd:9', ordinal: 0 }]);
    },
  },
};

describe('every writer on the façade is its module\'s writer (a twin arena each)', () => {
  for (const [name, t] of Object.entries(WRITER_TWINS)) {
    it(`${name}: the same result and the same arena through the façade as through the module`, () => {
      const r = twin(t);
      expect(r.a).toBe(r.b);
      expect(r.pa).toBe(r.pb);
    });
  }

  it('the twins cover §3.4\'s seventeen writers, and they tell the writers apart (no two give one outcome)', () => {
    expect(Object.keys(WRITER_TWINS).sort()).toEqual(
      ['absorbSliver', 'bandUnion', 'claimSubFace', 'clearFiner', 'connectHole', 'corridorUnion', 'insertChain', 'mergeFaces', 'pinVertices', 'radialSplit', 'removeEdges', 'retypeEdges', 'ringBand', 'setOwner', 'splitFace', 'splitThrough', 'warp'].sort(),
    );
    const prints = Object.entries(WRITER_TWINS).map(([n, t]) => {
      const r = twin(t);
      return `${r.a}\n${r.pa}#${n.length > 0 ? '' : n}`;
    });
    expect(new Set(prints).size).toBe(prints.length);
  });
});

describe('§3.3: exactly one op form', () => {
  it('a transaction with both ops and a callback is refused by the façade\'s assertion; the arena is untouched', () => {
    const p = framed();
    const k = kernelOver([p]);
    const before = state(p);
    const op = { kind: 'insertChain' as const, lineage: [1, 0] as [number, number], index: 0, apply: (o: Overlay) => k.geom.insertChain(o, [pt(0, 2000), pt(4000, 2000)], DB, 'mandatory') };
    expect(() => k.tx(spec(1, { ops: [op] }), () => okv(0))).toThrow(/^kernel: a transaction supplies its ops or a callback, never both/);
    expect(state(p)).toBe(before);
    // each form alone commits
    const d = k.tx(spec(1, { ops: [op] }));
    expect(d.ok && d.value.record !== null).toBe(true);
    const c = k.tx(spec(1), (o) => k.geom.insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
    expect(c.ok && c.value.record !== null).toBe(true);
    healthy(p);
  });

  it('the façade\'s transaction is the module\'s: the same commit on a twin arena (both forms)', () => {
    const A = framed();
    const B = framed();
    const k = kernelOver([A]);
    const ra = k.tx(spec(1), (o) => k.geom.insertChain(o, [pt(0, 2000), pt(4000, 2000)], DB, 'mandatory'));
    const rb = tx(B, spec(1), (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], DB, 'mandatory'));
    expect(JSON.stringify(ra)).toBe(JSON.stringify(rb));
    expect(state(A)).toBe(state(B));
  });

  it('the injected TxEnv reaches every transaction (its digest listener sees each commit)', () => {
    const p = framed();
    const seen: number[] = [];
    const k = createKernel(new Map([[p.key, p]]), { env: { onCommit: (_q, d) => seen.push(d.version) } });
    k.tx(spec(1), (o) => k.geom.insertChain(o, [pt(0, 2000), pt(4000, 2000)], DB, 'mandatory'));
    k.tx(spec(1), () => okv(0));
    expect(seen).toEqual([1]);
  });
});

describe('the services that read the open transaction (§3.4)', () => {
  it('kerb, offsetFace and insetRing read the innermost open transaction; outside one they are a programming error', () => {
    const { p } = crossing();
    const k = kernelOver([p]);
    const f = LL(p);
    let got: unknown[] = [];
    let want: unknown[] = [];
    k.tx(spec(1), (o) => {
      got = [k.geom.kerb(f), k.geom.offsetFace(f, faceRings(p, 1, f)[0].map(() => 100)), k.geom.insetRing(f, 100)];
      want = [kerb(o, f, W300), offsetFace(o, f, faceRings(p, 1, f)[0].map(() => 100)), insetRing(o, f, 100)];
      return okv(0);
    });
    expect(JSON.stringify(got)).toBe(JSON.stringify(want));
    expect((got[0] as KernelResult<unknown>).ok).toBe(true);
    for (const run of [() => k.geom.kerb(f), () => k.geom.offsetFace(f, [100]), () => k.geom.insetRing(f, 100), () => k.geom.sideRuns(f, 500), () => k.geom.sampleBoundary(f, 100)]) {
      expect(run).toThrow(/reads the open transaction's arena and is called only inside one/);
    }
  });

  it('sideRuns and sampleBoundary take a face of the open transaction at its level, or rings anywhere', () => {
    const { p } = crossing();
    const k = kernelOver([p]);
    const f = LL(p);
    const rings = faceRings(p, 1, f);
    let inTx: unknown[] = [];
    k.tx(spec(1), () => {
      inTx = [k.geom.sideRuns(f, 500), k.geom.sampleBoundary(f, 100)];
      return okv(0);
    });
    expect(inTx).toEqual([sideRuns(rings, 500), sampleBoundary(rings, 100)]);
    expect(k.geom.sideRuns(rings, 500)).toEqual(sideRuns(rings, 500));
    expect(k.geom.sampleBoundary(rings, 100)).toEqual(sampleBoundary(rings, 100));
  });

  it('a declared op reads the open transaction too; a nested transaction on another arena is innermost while it runs', () => {
    const { p } = crossing();
    const q = emptyOn(RAISED);
    const k = kernelOver([p, q]);
    const f = LL(p);
    const reads: string[] = [];
    const op = {
      kind: 'setOwner' as const,
      lineage: [1, 0] as [number, number],
      index: 0,
      apply: (o: Overlay) => {
        const kb = k.geom.kerb(f);
        reads.push(`declared ${kb.ok ? kb.value.length : kb.code}`);
        return k.geom.setOwner(o, [f], 'x:1');
      },
    };
    expect(k.tx(spec(1, { ops: [op] })).ok).toBe(true);
    k.tx(spec(1), (o) => {
      k.tx({ ...spec(1), key: RAISED }, (inner) => {
        reads.push(`inner ${inner.plat === q ? 'raised' : 'ground'}`);
        expect(() => k.geom.kerb(f)).toThrow(/kerb: face/); // the inner arena has no such face
        return okv(0);
      });
      const kb = k.geom.kerb(f);
      reads.push(`outer ${kb.ok ? 'ok' : kb.code} ${o.plat === p ? 'ground' : 'raised'}`);
      return okv(0);
    });
    expect(reads).toEqual(['declared 1', 'inner raised', 'outer ok ground']);
  });

  it('a kernel created without spineWidths refuses kerb and corridorUnion (never a kerb read as if no spine had a width)', () => {
    const { p } = crossing();
    const k = kernelOver([p], null);
    const f = LL(p);
    expect(() => k.tx(spec(1), () => k.geom.kerb(f))).toThrow(/create the kernel with spineWidths/);
    expect(() => k.tx(spec(2, AT_S9), (o) => k.geom.corridorUnion(o, [f]))).toThrow(/create the kernel with spineWidths/);
  });
});

describe('the keyed doors map the key to its arena', () => {
  it('plat(key) is the arena; an unknown key, a map entry under another arena\'s key, and two entries for one arena are refused', () => {
    const p = framed();
    const q = emptyOn(RAISED);
    const k = kernelOver([p, q]);
    expect(k.plat(GROUND)).toBe(p);
    expect(k.plat({ layer: 'ground', part: 1 })).toBe(q);
    expect(() => k.plat({ layer: 'sky', part: 0 })).toThrow(/no arena sky\/0 in this kernel/);
    expect(() => createKernel(new Map([[RAISED, p]]))).toThrow(/names the arena ground\/0 under the key ground\/1/);
    expect(() => createKernel(new Map([[GROUND, p], [{ layer: 'ground', part: 0 } as PlatKey, p]]))).toThrow(/two entries name the arena ground\/0/);
    expect(() => createKernel(new Map([[{ layer: 'nowhere', part: 0 } as unknown as PlatKey, p]]))).toThrow(/no PlatKey/);
    // a writer handed another kernel's transaction is refused in the debug build
    const other = kernelOver([q]);
    expect(() => k.tx(spec(1), (o) => other.geom.insertChain(o, [pt(0, 2000), pt(4000, 2000)], DB, 'mandatory'))).toThrow(/which this kernel does not hold/);
  });

  it('resolve, signature, sampleProfile, pointLocate, faceNeighbours and query read the arena the key names, as their modules do', () => {
    const { p } = crossing();
    const q = emptyOn(RAISED);
    const k = kernelOver([q, p]);
    const ref = { role: 'way', entity: 'way:1' };
    expect(k.resolve(ref, GROUND)).toEqual(resolveOn(p, ref, GROUND));
    expect(k.resolve({ owner: 'district:1', level: 1 }, GROUND)).toEqual(resolveOn(p, { owner: 'district:1', level: 1 }, GROUND));
    expect(k.resolve(ref, RAISED)).toMatchObject({ view: 'edges', runs: [], key: RAISED });
    for (const [x, y] of [[0, 0], [2000, 2000], [0, 2000], [4000, 4000], [1000, 1000], [2000, 7]] as const) {
      expect(k.geom.signature(GROUND, pt(x, y)), `${x},${y}`).toEqual(signatureOn(p, pt(x, y), GROUND));
    }
    expect(k.geom.signature(GROUND, pt(2000, 2000)).e.length).toBeGreaterThan(0);
    expect(k.geom.signature(GROUND, { role: 'entrance', entity: 'none:1' })).toEqual({ v: [], e: [] });
    const prof = { knotRole: 'width_knot', values: [300, 500], interp: 'linear' as const };
    expect(k.geom.sampleProfile(prof, 'way:1', GROUND, 'perVertex')).toEqual(sampleProfile(p, prof, 'way:1', GROUND, 'perVertex'));
    for (const level of [0, 1, 2] as const) {
      for (const [x, y] of [[1000, 1000], [2000, 2000], [1000, 2000], [9000, 9000]] as const) {
        expect(k.geom.pointLocate(GROUND, level, pt(x, y))).toEqual(pointLocate(p, GROUND, level, pt(x, y)));
      }
    }
    const f = LL(p);
    expect(k.geom.faceNeighbours(GROUND, f, 1)).toEqual(faceNeighbours(p, GROUND, f, 1));
    expect(k.geom.faceNeighbours(GROUND, f, 1).faces).toHaveLength(2);
    const box = { minX: 500, minY: 500, maxX: 2500, maxY: 2500 };
    expect(k.index.query(GROUND, 1, box)).toEqual(query(p, GROUND, 1, box));
    expect(k.index.query(GROUND, 1, box, { vertices: true })).toEqual(query(p, GROUND, 1, box, { vertices: true }));
    expect(k.index.rebuildAtStageEnd(GROUND)).toBeGreaterThanOrEqual(0);
    expect(k.index.query(GROUND, 1, box)).toEqual(query(p, GROUND, 1, box));
  });

  it('signature routes a lattice point through pointLocate on an indexed arena and scans one without an index', () => {
    const bare = createPlat(GROUND, FRAME);
    const k = kernelOver([bare]);
    expect(k.geom.signature(GROUND, pt(5, 5))).toEqual({ v: [], e: [] });
    expect(bare.index).toBeUndefined();
  });

  it('a StretchRef resolves to its one run of half-edges (resolveStretch); one that finds no stretch resolves empty', () => {
    const { p } = crossing();
    const k = kernelOver([p]);
    const s = { chain: { role: 'way', entity: 'way:1' }, from: pt(0, 2000), to: pt(2000, 2000) };
    const want = resolveStretch(p, GROUND, s);
    expect(want.ok).toBe(true);
    if (!want.ok) return;
    expect(k.resolve(s, GROUND)).toEqual({ key: GROUND, version: p.version, view: 'edges', runs: [want.value.half] });
    expect(want.value.half.length).toBeGreaterThan(0);
    expect(k.resolve({ ...s, to: pt(2000, 3000) }, GROUND)).toEqual({ key: GROUND, version: p.version, view: 'edges', runs: [] });
  });

  it('view(key, level) lists the level\'s records canonically and reads rings, owners, queries, locations and neighbours', () => {
    const { p } = crossing();
    const k = kernelOver([p]);
    const v = k.view(GROUND, 1);
    expect(v.key).toEqual(GROUND);
    expect(v.version).toBe(p.version);
    expect(v.level).toBe(1);
    const fs = v.faces();
    expect([...fs].sort((a, b) => a - b)).toEqual(QUADS(p).sort((a, b) => a - b));
    // canonical order: by each face's lowest-leftmost vertex (y, then x)
    const corner = (f: FaceId): [number, number] => {
      const r = faceRings(p, 1, f)[0].map((q) => [q.y, q.x] as [number, number]);
      return r.sort((a, b) => a[0] - b[0] || a[1] - b[1])[0];
    };
    const keys = fs.map(corner);
    expect(keys).toEqual([...keys].sort((a, b) => a[0] - b[0] || a[1] - b[1]));
    expect(keys).toEqual([[0, 0], [0, 2000], [2000, 0], [2000, 2000]]);
    for (const f of fs) {
      expect(v.rings(f)).toEqual(faceRings(p, 1, f));
      expect(v.owner(f)).toBe('district:1');
      expect(v.neighbours(f)).toEqual(faceNeighbours(p, GROUND, f, 1));
    }
    expect(v.query({ minX: 0, minY: 0, maxX: 100, maxY: 100 })).toEqual(query(p, GROUND, 1, { minX: 0, minY: 0, maxX: 100, maxY: 100 }));
    expect(v.pointLocate(pt(1000, 1000))).toEqual(pointLocate(p, GROUND, 1, pt(1000, 1000)));
    expect(faceWalk(p, 1, fs[0]).length).toBe(1);
    expect(() => v.rings(9999)).toThrow(/not live at L1/);
    expect(() => v.owner(9999)).toThrow(/not live at L1/);
    expect(() => k.view(GROUND, 5 as Level)).toThrow(/a view level is 0 … 4/);
    const v0 = k.view(GROUND, 0);
    expect(v0.faces()).toHaveLength(1);
    expect(v0.owner(v0.faces()[0])).toBeNull();
  });
});

describe('the view and the lattice-point signature on finer and reordered arenas', () => {
  it('signature finds a vertex finer than L1 (an L3 knot) as the scan does: pointLocate reads the L4 view', () => {
    const { p } = crossing();
    commit(p, 3, (o) => insertChain(o, [pt(500, 500), pt(1500, 500)], [{ role: 'plot_line', entity: 'block:1' }], 'mandatory', { knots: [{ index: 0, role: 'entrance', ordinal: 0 }] }));
    const k = kernelOver([p]);
    const s = k.geom.signature(GROUND, pt(500, 500));
    expect(s).toEqual(signatureOn(p, pt(500, 500), GROUND));
    expect(s.v.length).toBeGreaterThan(0);
    expect(s.v[0]).toMatchObject({ role: 'entrance', entity: 'block:1' });
  });

  it('faces() is canonical where slot order is not (slots freed and reused by a removal and a re-insertion)', () => {
    const corner = (p: Plat, f: FaceId): string => {
      const r = faceRings(p, 1, f)[0].map((q) => [q.y, q.x] as [number, number]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
      return `${r[0][0]},${r[0][1]}`;
    };
    const builds: (() => Plat)[] = [
      () => crossing().p,
      () => {
        const { p } = crossing();
        commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:1' }));
        commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
        return p;
      },
      () => {
        const { p } = crossing();
        commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:2' }));
        commit(p, 1, (o) => insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
        return p;
      },
    ];
    let reordered = 0;
    for (const build of builds) {
      const p = build();
      const fs = kernelOver([p]).view(GROUND, 1).faces();
      expect(fs.map((f) => corner(p, f))).toEqual(['0,0', '0,2000', '2000,0', '2000,2000']);
      const slots = [...fs].sort((a, b) => a - b);
      if (slots.map((f) => corner(p, f)).join(' ') !== fs.map((f) => corner(p, f)).join(' ')) reordered += 1;
    }
    // the fixtures' precondition: at least one arena's slot order differs from the canonical order
    expect(reordered).toBeGreaterThan(0);
  });

  it('owner() names the entity whose interned handle is 0', () => {
    const q = emptyOn(RAISED);
    commit(q, 0, (o) => insertChain(o, rect(0, 0, 4000, 4000), [{ role: 'district_bound', entity: 'd:0' }], 'mandatory', { closed: true }), { key: RAISED });
    const k = kernelOver([q]);
    const f = k.view(RAISED, 0).faces()[0];
    commit(q, 0, (o) => k.geom.setOwner(o, [f], 'd:0'), { key: RAISED });
    expect(q.faces[0].owner[f]).toBe(0);
    expect(k.view(RAISED, 0).owner(f)).toBe('d:0');
  });
});

// ---- argument forwarding off L1 and off the default arguments (fix round 1 of check/M0-a-16, B-1) -------------------
// §3.4's `faceNeighbours(key, face, level)`, `sampleProfile(p, owner, key, atCm)`, `sampleBoundary(face, stepCm)`,
// `sideRuns(face, turnTolCdeg, opts)`, §14's `view(key, level)` and the index's `query` / `rebuildAtStageEnd(key,
// district)`: each door hands its module the level and the arguments it was given. The fixture has content at L2, L3
// and L4, and each test first shows that the values it compares differ from L1's and from the level below's (or from
// the default argument's), so a door that read L1, clamped a level to a coarser one or dropped an argument fails.
// Fix round 2 (check/M0-a-16-close-r1): L4 content and level-below preconditions; an arena whose L2 face slots run past
// L1's top (liveness checked at the view's own level); `sideRuns`' turnTolCdeg, `offsetFace`'s per-edge distances and
// `insetRing`'s dCm at values that change the answer.

const LEVELS: readonly Level[] = [0, 1, 2, 3, 4];
const BOXES = [
  { minX: 0, minY: 0, maxX: 2500, maxY: 2500 },
  { minX: 400, minY: 400, maxX: 1200, maxY: 900 },
  { minX: 0, minY: 2500, maxX: 4000, maxY: 4000 },
];
const POINTS = [pt(400, 400), pt(200, 400), pt(500, 500), pt(1500, 500), pt(1000, 500), pt(500, 1500), pt(1000, 1000), pt(1000, 3000), pt(3000, 3000)];
const KNOTTED = { knotRole: 'width_knot', values: [300, 500], interp: 'linear' as const };

/**
 * The crossing (four L1 faces of district:1) plus an L2 district line across the lower-left quad (y = 1000), an L3
 * plot line in its lower half (x = 1000), an L1 way:5 along y = 3000 with two width knots, owners set at L2
 * ('blk:2') and L3 ('lot:3') that no L1 face has, and an L4 closed party wall (200 … 600 square) inside the L3 lot.
 */
function layered(): Plat {
  const { p } = crossing();
  commit(p, 2, (o) => insertChain(o, [pt(0, 1000), pt(2000, 1000)], [{ role: 'district_bound', entity: 'd:2' }], 'mandatory'));
  commit(p, 3, (o) => insertChain(o, [pt(1000, 0), pt(1000, 1000)], [{ role: 'plot_line', entity: 'b:3' }], 'mandatory'));
  commit(p, 1, (o) =>
    insertChain(o, [pt(0, 3000), pt(2000, 3000)], [{ role: 'way', entity: 'way:5' }], 'mandatory', {
      knots: [{ index: 0, role: 'width_knot', ordinal: 0 }, { index: 1, role: 'width_knot', ordinal: 1 }],
    }),
  );
  commit(p, 2, (o) => setOwner(o, [faceAt(p, 2, 1000, 500)], 'blk:2'));
  commit(p, 3, (o) => setOwner(o, [faceAt(p, 3, 500, 500)], 'lot:3'));
  commit(p, 4, (o) => insertChain(o, rect(200, 200, 600, 600), [{ role: 'party_wall', entity: 'bldg:1' }], 'mandatory', { closed: true }));
  return p;
}

/** The live face slots of `level`, ascending. */
function liveAt(p: Plat, level: Level): FaceId[] {
  const out: FaceId[] = [];
  for (let f = 0; f < p.slots.face[level].top; f += 1) if (isFaceLive(p, level, f)) out.push(f);
  return out;
}

/** Do two reads give different outcomes (a value or a throw)? */
const differs = (a: () => unknown, b: () => unknown): boolean => outcome(a) !== outcome(b);

describe('the keyed and levelled doors forward their level and arguments (L0 … L4, non-default arguments)', () => {
  it('view(key, level) reads rings, owner, neighbours, query and pointLocate at its level; geom.faceNeighbours, geom/index pointLocate and index.query at the level handed', () => {
    const p = layered();
    healthy(p);
    const k = kernelOver([p]);
    // how often a level's answer differs from L1's for the same arguments (the fixture's precondition, below)
    const off = { rings: 0, neighbours: 0, query: 0, locate: 0 };
    // and how often it differs from the level below's (L2 vs L1, L3 vs L2, L4 vs L3), so a door that clamps a level to
    // a coarser one fails at every level
    const below = new Map<Level, { rings: number; neighbours: number; query: number; locate: number }>();
    const owners = new Map<Level, Set<string>>();
    for (const l of LEVELS) {
      const v = k.view(GROUND, l);
      expect(v.level).toBe(l);
      const lb = (l - 1) as Level;
      const down = { rings: 0, neighbours: 0, query: 0, locate: 0 };
      if (l >= 2) below.set(l, down);
      const fs = v.faces();
      expect([...fs].sort((a, b) => a - b)).toEqual(liveAt(p, l));
      for (const box of BOXES) {
        const want = query(p, GROUND, l, box);
        expect(v.query(box), `L${l} view.query`).toEqual(want);
        expect(k.index.query(GROUND, l, box), `L${l} index.query`).toEqual(want);
        expect(v.query(box, { vertices: true })).toEqual(query(p, GROUND, l, box, { vertices: true }));
        expect(k.index.query(GROUND, l, box, { vertices: true })).toEqual(query(p, GROUND, l, box, { vertices: true }));
        if (l !== 1 && differs(() => want, () => query(p, GROUND, 1, box))) off.query += 1;
        if (l >= 2 && differs(() => want, () => query(p, GROUND, lb, box))) down.query += 1;
      }
      for (const at of POINTS) {
        const want = pointLocate(p, GROUND, l, at);
        expect(v.pointLocate(at), `L${l} view.pointLocate ${at.x},${at.y}`).toEqual(want);
        expect(k.geom.pointLocate(GROUND, l, at)).toEqual(want);
        expect(k.index.pointLocate(GROUND, l, at)).toEqual(want);
        if (l !== 1 && differs(() => want, () => pointLocate(p, GROUND, 1, at))) off.locate += 1;
        if (l >= 2 && differs(() => want, () => pointLocate(p, GROUND, lb, at))) down.locate += 1;
      }
      const named = new Set<string>();
      for (const f of fs) {
        const rings = faceRings(p, l, f);
        expect(v.rings(f), `L${l} view.rings ${f}`).toEqual(rings);
        const nb = faceNeighbours(p, GROUND, f, l);
        expect(v.neighbours(f), `L${l} view.neighbours ${f}`).toEqual(nb);
        expect(k.geom.faceNeighbours(GROUND, f, l), `L${l} geom.faceNeighbours ${f}`).toEqual(nb);
        // the owner as the level's own record names it: resolve({ owner, level }) lists the face at that level
        const o = v.owner(f);
        if (o !== null) {
          named.add(o);
          const r = resolveOn(p, { owner: o, level: l }, GROUND);
          expect(r.view === 'faces' ? r.faces : [], `L${l} owner ${o} of ${f}`).toContain(f);
        }
        if (l !== 1 && differs(() => rings, () => faceRings(p, 1, f))) off.rings += 1;
        if (l !== 1 && differs(() => nb, () => faceNeighbours(p, GROUND, f, 1))) off.neighbours += 1;
        if (l >= 2 && differs(() => rings, () => faceRings(p, lb, f))) down.rings += 1;
        if (l >= 2 && differs(() => nb, () => faceNeighbours(p, GROUND, f, lb))) down.neighbours += 1;
      }
      owners.set(l, named);
    }
    // the fixture's precondition: every compared read has a level whose answer is not L1's
    expect(off.rings).toBeGreaterThan(0);
    expect(off.neighbours).toBeGreaterThan(0);
    expect(off.query).toBeGreaterThan(0);
    expect(off.locate).toBeGreaterThan(0);
    for (const l of [2, 3, 4] as const) {
      const d = below.get(l);
      expect(d, `L${l} vs L${l - 1}`).toBeDefined();
      for (const [what, n] of Object.entries(d ?? {})) expect(n, `L${l} ${what} differs from L${l - 1}'s`).toBeGreaterThan(0);
    }
    // the owners are each level's own: L2's and L3's are not L1's
    expect([...(owners.get(1) ?? [])]).toEqual(['district:1']);
    expect(owners.get(2)?.has('blk:2')).toBe(true);
    expect(owners.get(3)?.has('lot:3')).toBe(true);
    expect(owners.get(1)?.has('blk:2')).toBe(false);
    expect(k.view(GROUND, 2).owner(faceAt(p, 2, 1000, 500))).toBe('blk:2');
    expect(k.view(GROUND, 3).owner(faceAt(p, 3, 500, 500))).toBe('lot:3');
  });

  it('sideRuns and sampleBoundary handed a face read it at the open transaction\'s level (L2, L3, L4), with the stepCm and opts given', () => {
    const p = layered();
    const k = kernelOver([p]);
    let offLevel = 0;
    let offStep = 0;
    const offBelow = new Map<Level, number>();
    for (const l of [2, 3, 4] as const) {
      const fs = liveAt(p, l);
      let got: unknown[] = [];
      k.tx(spec(l), () => {
        got = fs.map((f) => [k.geom.sideRuns(f, 500), k.geom.sideRuns(f, 500, { arcMaxCm: 400 }), k.geom.sampleBoundary(f, 250), k.geom.sampleBoundary(f, 100)]);
        return okv(0);
      });
      const want = fs.map((f) => {
        const rings = faceRings(p, l, f);
        if (differs(() => rings, () => faceRings(p, 1, f))) offLevel += 1;
        if (differs(() => rings, () => faceRings(p, (l - 1) as Level, f))) offBelow.set(l, (offBelow.get(l) ?? 0) + 1);
        if (differs(() => sampleBoundary(rings, 250), () => sampleBoundary(rings, 100))) offStep += 1;
        return [sideRuns(rings, 500), sideRuns(rings, 500, { arcMaxCm: 400 }), sampleBoundary(rings, 250), sampleBoundary(rings, 100)];
      });
      expect(got, `L${l}`).toEqual(want);
    }
    expect(offLevel).toBeGreaterThan(0);
    expect(offStep).toBeGreaterThan(0);
    for (const l of [2, 3, 4] as const) expect(offBelow.get(l) ?? 0, `L${l} rings differ from L${l - 1}'s`).toBeGreaterThan(0);
  });

  it('sideRuns forwards its opts and sampleBoundary its stepCm (rings as values, and a face inside a transaction)', () => {
    // a square with its top-right corner filleted by six chords of about 261 cm turning 15° each
    const arc = [0, 15, 30, 45, 60, 75, 90].map((d) => pt(3000 + Math.round(1000 * Math.cos((d * Math.PI) / 180)), 3000 + Math.round(1000 * Math.sin((d * Math.PI) / 180))));
    const filleted = [[pt(0, 0), pt(4000, 0), ...arc, pt(0, 4000)]];
    const k = kernelOver([layered()]);
    const opts = { arcMaxCm: 300 };
    expect(k.geom.sideRuns(filleted, 500, opts)).toEqual(sideRuns(filleted, 500, opts));
    expect(k.geom.sideRuns(filleted, 500)).toEqual(sideRuns(filleted, 500));
    // the precondition: the opts change the answer
    expect(differs(() => sideRuns(filleted, 500, opts), () => sideRuns(filleted, 500))).toBe(true);
    // turnTolCdeg is forwarded: 2000 (the fillet's 15° turns read as one side) is not 500's answer
    for (const tol of [0, 2000, 9000]) {
      expect(k.geom.sideRuns(filleted, tol), `turnTol ${tol}`).toEqual(sideRuns(filleted, tol));
      expect(k.geom.sideRuns(filleted, tol, opts), `turnTol ${tol} opts`).toEqual(sideRuns(filleted, tol, opts));
    }
    expect(differs(() => sideRuns(filleted, 2000), () => sideRuns(filleted, 500))).toBe(true);
    expect(() => k.geom.sideRuns(filleted, 9001)).toThrow(RangeError);
    // an opts the module refuses is refused through the façade
    expect(() => k.geom.sideRuns(filleted, 500, { arcMaxCm: -1 })).toThrow(RangeError);
    for (const step of [1, 250, 777]) expect(k.geom.sampleBoundary(filleted, step)).toEqual(sampleBoundary(filleted, step));
    expect(differs(() => sampleBoundary(filleted, 777), () => sampleBoundary(filleted, 100))).toBe(true);
    expect(() => k.geom.sampleBoundary(filleted, 0)).toThrow(RangeError);
  });

  it('sampleProfile forwards a numeric atCm (as its module samples it; not the per-vertex answer)', () => {
    const p = layered();
    const k = kernelOver([p]);
    const per = sampleProfile(p, KNOTTED, 'way:5', GROUND, 'perVertex');
    expect(k.geom.sampleProfile(KNOTTED, 'way:5', GROUND, 'perVertex')).toEqual(per);
    for (const at of [100, 250, 700] as const) {
      const want = sampleProfile(p, KNOTTED, 'way:5', GROUND, at as Cm);
      expect(k.geom.sampleProfile(KNOTTED, 'way:5', GROUND, at as Cm), `atCm ${at}`).toEqual(want);
      expect(differs(() => want, () => per), `atCm ${at} differs from perVertex`).toBe(true);
    }
  });

  it('index.rebuildAtStageEnd forwards its district: only that district\'s L2–L4 partitions are rebuilt, as the module does on a twin', () => {
    const A = layered();
    const B = layered();
    const C = layered();
    const k = kernelOver([A]);
    const all = rebuildAtStageEnd(C);
    const district = rebuildAtStageEnd(B, OUTSIDE);
    // the precondition: the district's rebuild is a proper, non-empty part of the whole one
    expect(district).toBeGreaterThan(0);
    expect(all).toBeGreaterThan(district);
    expect(k.index.rebuildAtStageEnd(GROUND, OUTSIDE)).toBe(district);
    expect(state(A)).toBe(state(B));
    expect(k.index.rebuildAtStageEnd(GROUND, 'district:none')).toBe(rebuildAtStageEnd(B, 'district:none'));
    // the coarse partitions the district's rebuild left dirty are rebuilt by the stage's whole rebuild
    const rest = rebuildAtStageEnd(B);
    expect(rest).toBe(all - district);
    expect(k.index.rebuildAtStageEnd(GROUND)).toBe(rest);
    expect(state(A)).toBe(state(B));
    healthy(A);
  });
  it('sideRuns handed a face inside a transaction forwards its turnTolCdeg (a filleted L2 face at 2000, not 500)', () => {
    // the upper-right quad gets an L2 district ring whose top-right corner is filleted by six 15° chords (radius 600)
    const arc = [0, 15, 30, 45, 60, 75, 90].map((d) => pt(3200 + Math.round(600 * Math.cos((d * Math.PI) / 180)), 3200 + Math.round(600 * Math.sin((d * Math.PI) / 180))));
    const ring = [pt(2200, 2200), pt(3800, 2200), ...arc, pt(2200, 3800)];
    const { p } = crossing();
    commit(p, 2, (o) => insertChain(o, ring, [{ role: 'district_bound', entity: 'd:fil' }], 'mandatory', { closed: true }));
    healthy(p);
    const k = kernelOver([p]);
    const f = faceAt(p, 2, 2600, 2600);
    const rings = faceRings(p, 2, f);
    // the precondition: the face is the filleted ring, and its tolerance changes the answer
    expect(rings[0]).toHaveLength(ring.length);
    expect(differs(() => sideRuns(rings, 2000), () => sideRuns(rings, 500))).toBe(true);
    let got: unknown[] = [];
    k.tx(spec(2), () => {
      got = [k.geom.sideRuns(f, 2000), k.geom.sideRuns(f, 2000, { arcMaxCm: 300 }), k.geom.sideRuns(f, 0)];
      return okv(0);
    });
    expect(got).toEqual([sideRuns(rings, 2000), sideRuns(rings, 2000, { arcMaxCm: 300 }), sideRuns(rings, 0)]);
  });

  it('offsetFace forwards non-uniform per-edge distances and insetRing its dCm (values that change the answer)', () => {
    const { p } = crossing();
    const k = kernelOver([p]);
    const f = LL(p);
    const n = faceRings(p, 1, f)[0].length;
    const per = Array.from({ length: n }, (_q, i) => (i % 2 === 0 ? 50 : 250));
    const uniform = per.map(() => 100);
    let got: string[] = [];
    let want: string[] = [];
    let pre: boolean[] = [];
    k.tx(spec(1), (o) => {
      got = [k.geom.offsetFace(f, per), k.geom.offsetFace(f, per.map((d) => d * 2)), k.geom.insetRing(f, 250), k.geom.insetRing(f, 37)].map((r) => JSON.stringify(r));
      want = [offsetFace(o, f, per), offsetFace(o, f, per.map((d) => d * 2)), insetRing(o, f, 250), insetRing(o, f, 37)].map((r) => JSON.stringify(r));
      // the precondition: these values are not the uniform 100 cm answer
      pre = [
        differs(() => offsetFace(o, f, per), () => offsetFace(o, f, uniform)),
        differs(() => offsetFace(o, f, per), () => offsetFace(o, f, per.map((d) => d * 2))),
        differs(() => insetRing(o, f, 250), () => insetRing(o, f, 100)),
        differs(() => insetRing(o, f, 37), () => insetRing(o, f, 100)),
      ];
      return okv(0);
    });
    expect(pre).toEqual([true, true, true, true]);
    expect(got).toEqual(want);
    expect(got.every((r) => r.startsWith('{"ok":true'))).toBe(true);
  });

  it('view(key, level) checks liveness at its own level: L2 face slots past L1\'s top are read; an L1-live slot dead at the level is refused', () => {
    // seven L2 district lines across the lower-left quad: L2 holds more face slots than L1
    const { p } = crossing();
    for (const y of [250, 500, 750, 1000, 1250, 1500, 1750]) {
      commit(p, 2, (o) => insertChain(o, [pt(0, y), pt(2000, y)], [{ role: 'district_bound', entity: `d:${y}` }], 'mandatory'));
    }
    healthy(p);
    const deadAtL1 = liveAt(p, 2).filter((f) => !isFaceLive(p, 1, f));
    // the precondition: some live L2 slots lie past L1's top
    expect(p.slots.face[2].top).toBeGreaterThan(p.slots.face[1].top);
    expect(deadAtL1.length).toBeGreaterThan(0);
    commit(p, 2, (o) => setOwner(o, deadAtL1, 'blk:hi'));
    const k = kernelOver([p]);
    const v2 = k.view(GROUND, 2);
    for (const f of liveAt(p, 2)) expect(v2.rings(f), `L2 rings ${f}`).toEqual(faceRings(p, 2, f));
    for (const f of deadAtL1) expect(v2.owner(f), `L2 owner ${f}`).toBe('blk:hi');
    // and the reverse: a slot live at L1 but dead at the view's level is refused there (here and on the layered arena)
    let refused = 0;
    for (const q of [p, layered()]) {
      const kq = kernelOver([q]);
      for (const l of [2, 3, 4] as const) {
        for (const f of liveAt(q, 1).filter((g) => !isFaceLive(q, l, g))) {
          refused += 1;
          expect(() => kq.view(GROUND, l).rings(f)).toThrow(new RegExp(`not live at L${l}`));
          expect(() => kq.view(GROUND, l).owner(f)).toThrow(new RegExp(`not live at L${l}`));
        }
      }
    }
    expect(refused).toBeGreaterThan(0);
  });
});

// ---- fix round 3 (check/M0-a-16-close-r2: R03, R10, R06) --------------------------------------------------------------
// §14 `view(key, level).faces()` lists the live faces of ITS level in that level's canonical order (§3.4 canonical face
// key), and §3.4 `signature(key, v)` locates a lattice point at the finest level (L4). Each test first shows that the
// level below (or L1, or slot order) would give another answer, so a door that read a coarser level fails.

/** The level's canonical face order (§3.4: by each face's key, its lowest and next vertex), spelled out from faceKey. */
const canonAt = (p: Plat, l: Level) => (a: FaceId, b: FaceId): number => {
  const ka = faceKey(p, l, a);
  const kb = faceKey(p, l, b);
  return compareVertices(p, ka[0], kb[0]) || compareVertices(p, ka[1], kb[1]);
};

/** layered() plus two more closed L4 party walls: L4's live face slots are a strict superset of L3's. */
function walled(): Plat {
  const p = layered();
  commit(p, 4, (o) => insertChain(o, rect(1200, 1200, 1600, 1600), [{ role: 'party_wall', entity: 'bldg:2' }], 'mandatory', { closed: true }));
  commit(p, 4, (o) => insertChain(o, rect(2400, 2400, 2800, 2800), [{ role: 'party_wall', entity: 'bldg:3' }], 'mandatory', { closed: true }));
  return p;
}

/**
 * A seven-line arena at `level`: seven lines across the lower-left quad, inserted top-down, so the level's face slots
 * run past L1's top and its canonical order (bottom-up) reverses its slot order.
 */
function sevenLines(level: 2 | 3 | 4): Plat {
  const { p } = crossing();
  const role = level === 2 ? 'district_bound' : level === 3 ? 'plot_line' : 'party_wall';
  for (const y of [1750, 1500, 1250, 1000, 750, 500, 250]) {
    commit(p, level, (o) => insertChain(o, [pt(0, y), pt(2000, y)], [{ role, entity: `d:${y}` }], 'mandatory'));
  }
  return p;
}

describe('view(key, level).faces() and the lattice-point signature at their own level (fix round 3)', () => {
  it('view(GROUND, 4).faces() lists exactly L4\'s live faces where L4\'s differ from L3\'s', () => {
    const p = walled();
    healthy(p);
    const k = kernelOver([p]);
    const l3 = liveAt(p, 3);
    const l4 = liveAt(p, 4);
    // the precondition: L4's live slots are not L3's (nor L2's)
    expect(l4).not.toEqual(l3);
    expect(l4).not.toEqual(liveAt(p, 2));
    expect(l4.length).toBeGreaterThan(l3.length);
    const fs = k.view(GROUND, 4).faces();
    expect([...fs].sort((a, b) => a - b)).toEqual(l4);
    expect(fs).toEqual([...l4].sort(canonAt(p, 4)));
    // and each level's view lists its own level's faces
    for (const l of LEVELS) expect([...k.view(GROUND, l).faces()].sort((a, b) => a - b), `L${l}`).toEqual(liveAt(p, l));
  });

  it('faces() at L2, L3 and L4 is the level\'s canonical order, compared unsorted (arenas whose order is not slot order)', () => {
    // per level, how many arenas list their faces in a canonical order that is not slot order (the precondition)
    const reordered = new Map<Level, number>();
    let pastL1Top = 0;
    for (const p of [sevenLines(2), sevenLines(3), sevenLines(4), layered(), walled()]) {
      healthy(p);
      const k = kernelOver([p]);
      for (const l of [2, 3, 4] as const) {
        const live = liveAt(p, l);
        const want = [...live].sort(canonAt(p, l));
        if (want.join(',') !== live.join(',')) reordered.set(l, (reordered.get(l) ?? 0) + 1);
        if (live.some((f) => !isFaceLive(p, 1, f))) pastL1Top += 1;
        expect(k.view(GROUND, l).faces(), `L${l} faces in canonical order`).toEqual(want);
      }
    }
    for (const l of [2, 3, 4] as const) expect(reordered.get(l) ?? 0, `L${l}: some arena's canonical order is not slot order`).toBeGreaterThan(0);
    // and some level lists faces that are not live at L1 (an order read at L1 cannot sort them)
    expect(pastL1Top).toBeGreaterThan(0);
  });

  it('signature of a lattice point finds an L4-only vertex (an L4 party-wall entrance knot) as the scan does', () => {
    const p = layered();
    commit(p, 4, (o) => insertChain(o, [pt(1200, 1200), pt(1600, 1200)], [{ role: 'party_wall', entity: 'bldg:9' }], 'mandatory', { knots: [{ index: 0, role: 'entrance', ordinal: 0 }] }));
    healthy(p);
    expect(p.index).toBeDefined();
    const at = pt(1200, 1200);
    // the precondition: the vertex is L4's alone; L3 (and coarser) locates the point inside a face
    for (const l of [1, 2, 3] as const) expect(pointLocate(p, GROUND, l, at).on, `L${l} locate`).not.toBe('vertex');
    expect(pointLocate(p, GROUND, 4, at).on).toBe('vertex');
    const k = kernelOver([p]);
    const s = k.geom.signature(GROUND, at);
    expect(s).toEqual(signatureOn(p, at, GROUND));
    expect(s.v.length + s.e.length).toBeGreaterThan(0);
    expect(s.v).toContainEqual({ role: 'entrance', entity: 'bldg:9', ordinal: 0 });
  });
});

// ---- session fix round s1 (N-55 (5), Q13 of docs/M0-FIX-QUEUE.md; C-0290) -------------------------------------------
// §3.3: the kernel applies a batch's ops to a scratch overlay and commits or rejects atomically; once the batch has
// committed, been rejected or thrown, its overlay is no transaction and a writer handed it is a programming error — a
// throw in every build, before the module's op runs, never a write outside a transaction with the version unchanged
// (N-45 (a); the check's probe P6: "returned ok=true state same: false version 0"). An overlay whose transaction is
// still open is accepted however it was opened (C-0290: testkit's B-FUZZ writer harness and M0-d-08's issue-order
// harness write through a kernel that did not open the batch).

const NO_OPEN = /^kernel: the overlay is no open transaction/;

/** Each writer through the façade with overlay `o` (the twins' arguments; pinVertices without its module pre-insert). */
const FACADE_WRITERS: Record<string, (k: Kernel, o: Overlay, p: Plat) => unknown> = {
  ...Object.fromEntries(Object.entries(WRITER_TWINS).map(([n, t]) => [n, t.facade])),
  pinVertices: (k, o) => k.geom.pinVertices(o, [{ role: 'entrance', entity: 'd:9', ordinal: 0 }]),
};

/** Hands `o` to every writer through `k`: each throws NO_OPEN, and the arena stays bit for bit as it was, its version too. */
function refusedByEveryWriter(k: Kernel, o: Overlay, p: Plat): void {
  const before = structuredClone(p);
  const v = p.version;
  expect(Object.keys(FACADE_WRITERS).sort()).toEqual(Object.keys(WRITER_TWINS).sort());
  for (const [name, w] of Object.entries(FACADE_WRITERS)) {
    expect(() => w(k, o, p), name).toThrow(NO_OPEN);
    expect(p.version, name).toBe(v);
  }
  expect(p).toEqual(before);
  healthy(p);
}

describe('a façade writer refuses an overlay that is no open transaction (N-55 (5): never a silent write)', () => {
  it('a committed batch\'s overlay: insertChain, removeEdges and every other writer throw; the arena bit for bit and its version as committed', () => {
    const { p } = crossing();
    const k = kernelOver([p]);
    const v0 = p.version;
    let stale: Overlay | null = null;
    const r = k.tx(spec(1), (o) => {
      stale = o;
      return k.geom.insertChain(o, [pt(500, 500), pt(1500, 500)], DB, 'mandatory');
    });
    // the precondition: the batch committed and moved the version
    expect(r.ok && r.value.record !== null).toBe(true);
    expect(p.version).toBe(v0 + 1);
    if (stale === null) throw new Error('the callback never ran');
    const o: Overlay = stale;
    // the two the probe named, then all seventeen
    const before = structuredClone(p);
    expect(() => k.geom.insertChain(o, [pt(600, 3000), pt(3000, 3200)], [{ role: 'way', entity: 'w:1' }], 'mandatory')).toThrow(NO_OPEN);
    expect(() => k.geom.removeEdges(o, { role: 'district_bound', entity: 'd:9' })).toThrow(NO_OPEN);
    expect(p).toEqual(before);
    refusedByEveryWriter(k, o, p);
    expect(p.version).toBe(v0 + 1);
  });

  it('a rejected batch\'s overlay and a thrown batch\'s overlay: every writer throws; the arena as before the batch', () => {
    const { p } = crossing();
    const k = kernelOver([p]);
    const before = structuredClone(p);
    const v0 = p.version;
    let rejected: Overlay | null = null;
    const r = k.tx(spec(1), (o): KernelResult<number> => {
      rejected = o;
      expect(k.geom.insertChain(o, [pt(500, 500), pt(1500, 500)], DB, 'mandatory').ok).toBe(true);
      return { ok: false, code: 'E_INVARIANT', detail: 'planted refusal (N-55 (5))' };
    });
    // the precondition: the batch wrote, then was rejected; the arena is back
    expect(r.ok).toBe(false);
    expect(p.version).toBe(v0);
    expect(p).toEqual(before);
    if (rejected === null) throw new Error('the callback never ran');
    refusedByEveryWriter(k, rejected, p);
    let threw: Overlay | null = null;
    expect(() =>
      k.tx(spec(1), (o) => {
        threw = o;
        k.geom.insertChain(o, [pt(500, 500), pt(1500, 500)], DB, 'mandatory');
        throw new Error('planted throw');
      }),
    ).toThrow(/planted throw/);
    expect(p.version).toBe(v0);
    if (threw === null) throw new Error('the callback never ran');
    refusedByEveryWriter(k, threw, p);
  });

  it('refused in every build: with the debug assertions off, a committed batch\'s overlay still throws and writes nothing', () => {
    const { p } = crossing();
    const k = kernelOver([p]);
    let stale: Overlay | null = null;
    expect(
      k.tx(spec(1), (o) => {
        stale = o;
        return okv(0);
      }).ok,
    ).toBe(true);
    if (stale === null) throw new Error('the callback never ran');
    const o: Overlay = stale;
    setDebugAssertions(false);
    try {
      const before = structuredClone(p);
      expect(() => k.geom.insertChain(o, [pt(600, 3000), pt(3000, 3200)], [{ role: 'way', entity: 'w:1' }], 'mandatory')).toThrow(NO_OPEN);
      expect(p).toEqual(before);
    } finally {
      setDebugAssertions(true);
    }
  });

  it('a module tx() overlay is accepted while its batch is open (M0-d-08\'s issue-order harness) and refused once it committed', () => {
    const A = crossing().p;
    const B = crossing().p;
    const k = kernelOver([A]);
    let o0: Overlay | null = null;
    const ra = tx(A, spec(1), (o) => {
      o0 = o;
      return k.geom.insertChain(o, [pt(500, 500), pt(1500, 500)], DB, 'mandatory');
    });
    // the same batch as the module writes it on a twin arena
    const rb = tx(B, spec(1), (o) => insertChain(o, [pt(500, 500), pt(1500, 500)], DB, 'mandatory'));
    expect(ra.ok && ra.value.record !== null).toBe(true);
    expect(JSON.stringify(ra)).toBe(JSON.stringify(rb));
    expect(state(A)).toBe(state(B));
    if (o0 === null) throw new Error('the callback never ran');
    refusedByEveryWriter(k, o0, A);
  });

  it('the control: a nested k.tx on another arena — its overlay, and the outer one while it is open, are accepted; both commit', () => {
    const { p } = crossing();
    const q = emptyOn(RAISED);
    const k = kernelOver([p, q]);
    const [vp, vq] = [p.version, q.version];
    const r = k.tx(spec(1), (o) => {
      const inner = k.tx(spec(0, { key: RAISED }), (i) => {
        expect(k.geom.insertChain(i, rect(0, 0, 4000, 4000), [{ role: 'district_bound', entity: 'd:0' }], 'mandatory', { closed: true }).ok).toBe(true);
        // the outer transaction is open while the inner one runs
        return k.geom.insertChain(o, [pt(500, 500), pt(1500, 500)], DB, 'mandatory');
      });
      expect(inner.ok).toBe(true);
      return k.geom.insertChain(o, [pt(500, 3000), pt(1500, 3000)], [{ role: 'way', entity: 'way:7' }], 'mandatory');
    });
    expect(r.ok).toBe(true);
    expect([p.version, q.version]).toEqual([vp + 1, vq + 1]);
    expect(k.resolve({ role: 'way', entity: 'way:7' }, GROUND)).toMatchObject({ view: 'edges' });
    expect(k.view(RAISED, 0).faces().length).toBeGreaterThan(0);
    healthy(p);
    healthy(q);
  });

  it('another kernel\'s open transaction on the same arena is accepted (testkit\'s B-FUZZ writer harness) and refused once it closed', () => {
    const { p } = crossing();
    const outer = kernelOver([p]);
    const fresh = kernelOver([p]);
    const v0 = p.version;
    let o0: Overlay | null = null;
    const r = fresh.tx(spec(1), (o) => {
      o0 = o;
      return outer.geom.insertChain(o, [pt(500, 500), pt(1500, 500)], DB, 'mandatory');
    });
    expect(r.ok && r.value.record !== null).toBe(true);
    expect(p.version).toBe(v0 + 1);
    if (o0 === null) throw new Error('the callback never ran');
    refusedByEveryWriter(outer, o0, p);
    refusedByEveryWriter(fresh, o0, p);
  });
});
