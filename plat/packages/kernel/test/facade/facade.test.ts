// M0-a-16's façade tests (§14 `interface Kernel`: plat, view, resolve, geom, index, tx; §3.3 *Two op forms*: "a
// transaction that supplies both `ops` and a callback is a programming error caught by an assertion"; §3.4 *Arenas,
// keys and services*: every service that reads an arena takes it by key, and `kerb`, `offsetFace`, `insetRing`,
// `sideRuns`, `sampleBoundary` "read the open transaction's arena and are called only inside one"; readings C-0220).
// Every writer and every keyed service is judged against the module that builds it on a twin arena: the façade adds no
// geometry of its own.
import { describe, expect, it } from 'vitest';
import { faceWalk, resolve as resolveOn, signature as signatureOn, type FaceId, type Plat } from '../../src/arena/index.js';
import { bandUnion, corridorUnion, insetRing, kerb, offsetFace } from '../../src/arr/index.js';
import { absorbSliver, claimSubFace, connectHole, mergeFaces, pinVertices, radialSplit, ringBand, splitFace } from '../../src/faces/index.js';
import { createKernel, type Kernel } from '../../src/facade/index.js';
import { faceNeighbours, faceRings, sampleBoundary, sideRuns } from '../../src/geom/index.js';
import { pointLocate, query } from '../../src/index/index.js';
import { insertChain, splitThrough } from '../../src/insert/index.js';
import type { KernelResult } from '../../src/num/index.js';
import { clearFiner, removeEdges, resolveStretch, retypeEdges, sampleProfile, setOwner, tx, type Overlay } from '../../src/tx/index.js';
import type { Level, PlatKey } from '../../src/types/index.js';
import { warp } from '../../src/warp/index.js';
import { AT_S9 } from '../arr/bands/support.js';
import { faceAt } from '../faces/support.js';
import { halfEdgeBetween } from '../tx/support.js';
import { createPlat } from '../../src/arena/index.js';
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
