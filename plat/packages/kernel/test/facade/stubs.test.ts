// M0-a-16's stub tests (M0-work.json: "notBuilt stubs are not callable (a type test) and are enumerated in the stub
// table"; the exit bar "the stub table equals M0.md §4b's kernel entries"; M0.md §3: "a stub is a `notBuilt('<milestone>')`
// with a choices row or a §4b entry"; C-0041, C-0089). The type test is the `@ts-expect-error` lines below: `corepack
// pnpm build` (tsc -b compiles this file) fails if a stub ever becomes callable.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { isNotBuilt, notBuilt, STUB_TABLE, type NotBuiltStub } from '../../src/facade/index.js';
import { claimSubFace } from '../../src/faces/index.js';
import { tx } from '../../src/tx/index.js';
import { framed, GROUND, kernelOver, pt, spec } from './support.js';

const PLAT = fileURLToPath(new URL('../../../../', import.meta.url));
const SRC = fileURLToPath(new URL('../../src/', import.meta.url));

/** M0.md §4b's rows: [deferred, to, hook]. */
function section4b(): string[][] {
  const md = readFileSync(`${PLAT}docs/build/M0.md`, 'utf8');
  const start = md.indexOf('## 4b Deferred');
  const end = md.indexOf('\n## 5 ', start);
  expect(start).toBeGreaterThan(0);
  expect(end).toBeGreaterThan(start);
  const rows: string[][] = [];
  for (const line of md.slice(start, end).split('\n')) {
    if (!line.startsWith('| ') || line.startsWith('| deferred |') || line.startsWith('|---')) continue;
    const cells = line.slice(2, -2).split(' | ');
    expect(cells, line).toHaveLength(3);
    rows.push(cells);
  }
  return rows;
}

/**
 * The kernel entries of §4b: the rows whose hook cell names a kernel mechanism — a `notBuilt` stub, a `KernelTx` field,
 * the transient key, the pool's `E_SCOPE`, the replaceable `Plat.frame`, the multi-part `PlatKey`, the kernel's
 * `sampleProfile`, or S9's kernel op (whose row holds `claimSubFace`'s score form, S7b's).
 */
const KERNEL_MARKS = ['notBuilt', 'KernelTx', 'TransientKey', 'E_SCOPE', 'Plat.frame', 'PlatKey', 'sampleProfile', 'S9\'s kernel op'];

function kernelRows(): string[][] {
  return section4b().filter((r) => KERNEL_MARKS.some((m) => r[2].includes(m)));
}

/** Every .ts file under a directory. */
function sources(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir).sort()) {
    const path = `${dir}${name}`;
    if (statSync(path).isDirectory()) out.push(...sources(`${path}/`));
    else if (name.endsWith('.ts')) out.push(path);
  }
  return out;
}

describe('the notBuilt stubs are not callable (the type test)', () => {
  it('calling a stub is a type error and, through a cast, a TypeError; a stub is a frozen object', () => {
    const k = kernelOver([framed()]);
    // @ts-expect-error a notBuilt stub is not callable (M2a, C-0089)
    expect(() => k.geom.resolveVertexAt(GROUND, pt(0, 0), { v: [], e: [] }, new Map())).toThrow(TypeError);
    // @ts-expect-error a notBuilt stub is not callable (M6-P, C-0041)
    expect(() => k.geom.transientArena('building:1', [], [], 1000)).toThrow(TypeError);
    // @ts-expect-error a notBuilt stub is not callable (M6-P, C-0041)
    expect(() => k.geom.readBack({ transient: true, owner: 'building:1', n: 0 })).toThrow(TypeError);
    // @ts-expect-error a notBuilt stub is not callable (M6-P, C-0041)
    expect(() => k.geom.release({ transient: true, owner: 'building:1', n: 0 })).toThrow(TypeError);
    // @ts-expect-error the pool is M1's (§4b)
    expect(() => k.pool()).toThrow(TypeError);
    for (const s of [k.geom.resolveVertexAt, k.geom.transientArena, k.geom.readBack, k.geom.release, k.pool]) {
      expect(typeof s).toBe('object');
      expect(Object.isFrozen(s)).toBe(true);
      expect(isNotBuilt(s)).toBe(true);
    }
  });

  it('claimSubFace\'s score form is unreachable on the façade (a type error) and refused notBuilt(\'M1\') by its module', () => {
    const p = framed();
    const k = kernelOver([p]);
    const score = { areaCm2: 1e6, within: [0], score: null };
    expect(() =>
      k.tx(spec(1), (o) =>
        // @ts-expect-error the façade's claim is the ring form only; the score form is S7b's (M1)
        k.geom.claimSubFace(o, score, 'reservation:1'),
      ),
    ).toThrow(/notBuilt\('M1'\)/);
    // the module itself refuses it the same way (the stub table's `sites`)
    expect(() => tx(p, spec(1), (o) => claimSubFace(o, score, 'reservation:1'))).toThrow(/notBuilt\('M1'\)/);
  });

  it('notBuilt(milestone, member) makes a frozen, non-callable stub; isNotBuilt tells it from a function', () => {
    const s: NotBuiltStub<'M4'> = notBuilt('M4', 'frameGrowth', 'an epoch\'s frame growth');
    expect(s).toEqual({ notBuilt: 'M4', member: 'frameGrowth', why: 'an epoch\'s frame growth' });
    expect(Object.isFrozen(s)).toBe(true);
    expect(isNotBuilt(s)).toBe(true);
    expect(isNotBuilt(() => 0)).toBe(false);
    expect(isNotBuilt(null)).toBe(false);
    expect(isNotBuilt({ notBuilt: 'M1' })).toBe(false);
    expect(notBuilt('M1', 'x').why).toBe('');
  });
});

describe('the stub table equals M0.md §4b\'s kernel entries (the exit bar)', () => {
  it('every row answers a §4b row by its first cell, verbatim, whose milestone cell names the row\'s milestone', () => {
    const rows = section4b();
    for (const s of STUB_TABLE) {
      const r = rows.find((x) => x[0] === s.deferred);
      expect(r, `${s.member}: ${s.deferred}`).toBeDefined();
      expect(r?.[1], s.member).toContain(s.milestone);
    }
  });

  it('the §4b rows the table answers are exactly §4b\'s kernel entries', () => {
    const cited = [...new Set(STUB_TABLE.map((s) => s.deferred))].sort();
    const kernel = kernelRows().map((r) => r[0]).sort();
    expect(cited).toEqual(kernel);
    expect(kernel).toHaveLength(8);
  });

  it('a stub row\'s member is a façade stub of its milestone; a refused row names the sites that refuse it; a hook refuses nothing', () => {
    const k = kernelOver([framed()]);
    const geom = k.geom as unknown as Record<string, unknown>;
    for (const s of STUB_TABLE) {
      if (s.form === 'stub') {
        const m = s.member.startsWith('geom.') ? geom[s.member.slice(5)] : (k as unknown as Record<string, unknown>)[s.member];
        expect(isNotBuilt(m), s.member).toBe(true);
        expect((m as NotBuiltStub).notBuilt).toBe(s.milestone);
        expect(s.sites).toEqual([]);
      } else if (s.form === 'refused') {
        expect(s.sites.length, s.member).toBeGreaterThan(0);
      } else {
        expect(s.sites).toEqual([]);
      }
      expect(Object.isFrozen(s)).toBe(true);
      for (const c of s.choices) expect(c).toMatch(/^C-\d{4}$/);
    }
    expect(Object.isFrozen(STUB_TABLE)).toBe(true);
    expect(STUB_TABLE.map((s) => s.member)).toEqual([
      'geom.transientArena', 'geom.readBack', 'geom.release', 'KernelTx.key (a TransientKey)', 'geom.resolveVertexAt', 'pool',
      'geom.claimSubFace (the score form)', 'KernelTx.clearRegion', 'KernelTx.prepared',
      'geom.sampleProfile (an Order-valued stretch-state profile)', 'Plat.frame (replaceable)', 'PlatKey.part (multi-part arenas)',
    ]);
  });

  it('every notBuilt(\'…\') the kernel\'s sources throw is a refused row\'s site with its milestone, and every site throws it', () => {
    const thrown = new Set<string>();
    for (const file of sources(SRC)) {
      const rel = file.slice(SRC.length);
      if (rel.startsWith('facade/')) continue;
      const text = readFileSync(file, 'utf8');
      for (const m of text.matchAll(/notBuilt\('(M[0-9A-Za-z-]+)',/g)) thrown.add(`${rel} ${m[1]}`);
    }
    const listed = new Set<string>();
    for (const s of STUB_TABLE) for (const site of s.sites) listed.add(`${site} ${s.milestone}`);
    expect([...thrown].sort()).toEqual([...listed].sort());
    expect(thrown.size).toBeGreaterThanOrEqual(5);
  });
});

describe('the refused branches refuse through the façade (notBuilt at run time)', () => {
  it('a transient arena\'s key: tx, view, pointLocate, faceNeighbours and plat refuse notBuilt(\'M6-P\'); the arena is untouched', () => {
    const p = framed();
    const k = kernelOver([p]);
    const tk = { transient: true as const, owner: 'building:1', n: 0 };
    const before = p.version;
    expect(() => k.tx(spec(0, { key: tk }), () => ({ ok: true, value: 0, warnings: [] }))).toThrow(/notBuilt\('M6-P'\)/);
    expect(() => k.view(tk, 0)).toThrow(/notBuilt\('M6-P'\)/);
    expect(() => k.geom.pointLocate(tk, 0, pt(10, 10))).toThrow(/notBuilt\('M6-P'\)/);
    expect(() => k.geom.faceNeighbours(tk, 0, 0)).toThrow(/notBuilt\('M6-P'\)/);
    expect(() => k.index.pointLocate(tk, 0, pt(10, 10))).toThrow(/notBuilt\('M6-P'\)/);
    // @ts-expect-error plat(key) takes a PlatKey
    expect(() => k.plat(tk)).toThrow(/notBuilt\('M6-P'\)/);
    expect(p.version).toBe(before);
  });

  it('a clear-region batch and prepared contacts refuse notBuilt(\'M3a\') through kernel.tx; the arena is untouched', () => {
    const p = framed();
    const k = kernelOver([p]);
    const ring = [pt(100, 100), pt(900, 100), pt(900, 900)];
    const v = p.version;
    expect(() => k.tx(spec(1, { clearRegion: [ring] }), () => ({ ok: true, value: 0, warnings: [] }))).toThrow(/notBuilt\('M3a'\)/);
    expect(() => k.tx(spec(1, { prepared: [] }), () => ({ ok: true, value: 0, warnings: [] }))).toThrow(/notBuilt\('M3a'\)/);
    expect(p.version).toBe(v);
  });
});
