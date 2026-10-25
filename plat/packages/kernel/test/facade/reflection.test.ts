// M0-a-16's reflection tests (M0-work.json: "every §3.4 op and service is present on the façade under its design name (a
// reflection test over §3.4's list) — a notBuilt stub counts as present and must appear in the stub table (C-0089)";
// the exit bar "the façade exposes §3.4's complete list by name"; §14's `interface Kernel`; C-0078: the arena block and
// the medial axis are no façade members). The lists are §3.4's and §14's as the design writes them (./support.ts).
import { describe, expect, it } from 'vitest';
import { resolve, sortedKeys, type Plat } from '../../src/arena/index.js';
import { booleans, buffer, tileRings } from '../../src/arr/index.js';
import { ENGINE_ID, ENGINE_VERSION, isNotBuilt, STUB_TABLE, type ArenaKey, type CarryMap, type TransientKey } from '../../src/facade/index.js';
import * as facade from '../../src/facade/index.js';
import { hexLattice, hull, lir, obb, regularFit } from '../../src/geom/index.js';
import * as kernelIndex from '../../src/index.js';
import { area2, area2Big, orient } from '../../src/num/index.js';
import { createRng } from '../../src/rng/index.js';
import { skeleton } from '../../src/skeleton/index.js';
import { OP_KINDS, type TxKey } from '../../src/tx/index.js';
import type { Id, PlatKey } from '../../src/types/index.js';
import { simplify } from '../../src/warp/index.js';
import { framed, GROUND, KERNEL_MEMBERS, kernelOver, SECTION_3_4, SERVICES, TRANSIENT, WRITERS } from './support.js';

function kernel(): { p: Plat; k: ReturnType<typeof kernelOver> } {
  const p = framed();
  return { p, k: kernelOver([p]) };
}

describe('the façade exposes §3.4\'s complete list by name (the exit bar)', () => {
  it('every §3.4 op and service is a member of Kernel.geom, and geom holds nothing else', () => {
    const { k } = kernel();
    const names = sortedKeys(k.geom);
    for (const n of SECTION_3_4) expect(names, n).toContain(n);
    expect(names).toEqual([...SECTION_3_4].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)));
    expect(SECTION_3_4).toHaveLength(17 + 24 + 3);
  });

  it('a member is callable unless it is a notBuilt stub, and every stub is a row of the stub table (C-0089)', () => {
    const { k } = kernel();
    const geom = k.geom as unknown as Record<string, unknown>;
    const stubs: string[] = [];
    for (const n of SECTION_3_4) {
      const m = geom[n];
      if (isNotBuilt(m)) {
        stubs.push(n);
        expect(m.member).toBe(n);
        const row = STUB_TABLE.find((r) => r.member === `geom.${n}`);
        expect(row, n).toBeDefined();
        expect(row?.form).toBe('stub');
        expect(row?.milestone).toBe(m.notBuilt);
      } else {
        expect(typeof m, n).toBe('function');
      }
    }
    expect(stubs.sort()).toEqual(['readBack', 'release', 'resolveVertexAt', 'transientArena']);
    expect(geom.resolveVertexAt).toMatchObject({ notBuilt: 'M2a' });
    for (const n of TRANSIENT) expect(geom[n]).toMatchObject({ notBuilt: 'M6-P' });
  });

  it('the writers are M0-a-06\'s OP_KINDS in §3.4\'s order (a declared batch\'s op-kind rank)', () => {
    expect([...OP_KINDS]).toEqual([...WRITERS]);
  });

  it('§14\'s members are on the Kernel — plat, view, resolve, geom, index, tx — beside rng, pool and assertCurrent', () => {
    const { k } = kernel();
    const names = sortedKeys(k);
    for (const n of KERNEL_MEMBERS) expect(names, n).toContain(n);
    expect(names).toEqual(['assertCurrent', 'geom', 'index', 'plat', 'pool', 'resolve', 'rng', 'tx', 'view']);
    expect(sortedKeys(k.index)).toEqual(['pointLocate', 'query', 'rebuildAtStageEnd']);
    expect(k.pool).toMatchObject({ notBuilt: 'M1', member: 'pool' });
    expect(STUB_TABLE.find((r) => r.member === 'pool')).toMatchObject({ milestone: 'M1', form: 'stub' });
  });

  it('the services that read no arena are the modules\' own functions (one implementation, no copy)', () => {
    const { k } = kernel();
    const g = k.geom;
    expect(g.booleans).toBe(booleans);
    expect(g.tileRings).toBe(tileRings);
    expect(g.buffer).toBe(buffer);
    expect(g.skeleton).toBe(skeleton);
    expect(g.simplify).toBe(simplify);
    expect(g.hexLattice).toBe(hexLattice);
    expect(g.obb).toBe(obb);
    expect(g.hull).toBe(hull);
    expect(g.lir).toBe(lir);
    expect(g.area2).toBe(area2);
    expect(g.area2Big).toBe(area2Big);
    expect(g.orient).toBe(orient);
    expect(g.regularFit).toBe(regularFit);
    expect(k.rng).toBe(createRng);
    expect(k.index.pointLocate).toBe(g.pointLocate);
    // the façade's resolve and geom.resolve are one function, reading as the module's
    expect(k.resolve).toBe(g.resolve);
  });

  it('the façade is frozen: no member can be replaced at run time', () => {
    const { k } = kernel();
    expect(Object.isFrozen(k)).toBe(true);
    expect(Object.isFrozen(k.geom)).toBe(true);
    expect(Object.isFrozen(k.index)).toBe(true);
    for (const n of [...TRANSIENT, 'resolveVertexAt']) expect(Object.isFrozen((k.geom as unknown as Record<string, unknown>)[n])).toBe(true);
  });

  it('every §3.4 service is reachable from the package index too, and SERVICES ∪ WRITERS hold no duplicate', () => {
    expect(new Set(SECTION_3_4).size).toBe(SECTION_3_4.length);
    const pkg = kernelIndex as unknown as Record<string, unknown>;
    for (const n of [...WRITERS, ...SERVICES]) {
      if (n === 'resolveVertexAt') continue;
      expect(typeof pkg[n], n).toBe('function');
    }
    for (const n of ['createKernel', 'notBuilt', 'isNotBuilt', 'stampOf', 'isTransientKey']) expect(typeof pkg[n], n).toBe('function');
    for (const n of ['STUB_TABLE', 'ENGINE_ID']) expect(pkg[n], n).toBeDefined();
  });
});

describe('C-0078: the arena block and the medial axis are no façade members', () => {
  it('encodeArena, decodeArena and medialAxis are on neither the Kernel nor geom', () => {
    const { k } = kernel();
    for (const n of ['encodeArena', 'decodeArena', 'medialAxis', 'compactSlots']) {
      expect(n in k, n).toBe(false);
      expect(n in k.geom, n).toBe(false);
    }
    const fa = facade as unknown as Record<string, unknown>;
    for (const n of ['encodeArena', 'decodeArena', 'medialAxis']) expect(fa[n], n).toBeUndefined();
  });
});

describe('the keys and the carry map this item declares (C-0041, C-0089, C-0112 (3))', () => {
  it('TransientKey and ArenaKey are §3.4\'s, the transaction\'s key shape both ways; CarryMap is ReadonlyMap<Id, Id>', () => {
    const t: TransientKey = { transient: true, owner: 'building:1', n: 0 };
    const asTx: TxKey = t;
    const a: ArenaKey = asTx;
    const g: ArenaKey = GROUND;
    const back: PlatKey | TransientKey = a;
    expect(back).toEqual(t);
    expect(g).toEqual({ layer: 'ground', part: 0 });
    const carry: CarryMap = new Map<Id, Id>([['plot:7', 'plot:9']]);
    // @ts-expect-error a carry map is read-only
    expect(() => carry.set('a', 'b')).not.toThrow(); // a Map at run time; the type forbids the write
    expect(carry.get('plot:7')).toBe('plot:9');
  });

  it('the engine id of the report is plat-arrangement@<version> (§3.7, §5.4)', () => {
    expect(ENGINE_ID).toBe(`plat-arrangement@${String(ENGINE_VERSION)}`);
    expect(ENGINE_ID).toMatch(/^plat-arrangement@[1-9]\d*$/);
    expect(ENGINE_VERSION).toBe(1);
  });

  it('the façade resolve reads as M0-a-02\'s resolve on the arena the key names', () => {
    const { p, k } = kernel();
    const ref = { role: 'margin', entity: 'terrain:1' };
    expect(k.resolve(ref, GROUND)).toEqual(resolve(p, ref, GROUND));
    expect(k.resolve(ref, GROUND)).toMatchObject({ view: 'edges' });
  });
});
