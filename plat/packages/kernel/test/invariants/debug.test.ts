// The debug-build assertion mode (§3.4 *Arenas, keys and services*; §3.10's arena-isolation row; M0-a-14's listed test:
// "the debug assertion fires on a stale slot stamp and on a foreign arena's slot"): `debugAssertSlot` throws on a slot
// stamped at an older version or for another arena, and on a slot not live there; it is silent when the arena's runtime
// switch is off and in a build whose flag `PLAT_DEBUG_BUILD` is defined false — the production bundle, built here with
// esbuild's `define` and run.
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createPlat, setDebugAssertions, type Plat } from '../../src/arena/index.js';
import { attachIndex, query } from '../../src/index/index.js';
import { insertChain } from '../../src/insert/index.js';
import { DEBUG_BUILD, debugAssertSlot, debugMode } from '../../src/invariants/index.js';
import { FRAME } from '../arena/support.js';
import { commit, framed, pt } from './support.js';

afterEach(() => {
  setDebugAssertions(true);
});

function lane(p: Plat): void {
  commit(p, 1, (o) => insertChain(o, [pt(500, 500), pt(1500, 1500)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
}

describe('debugAssertSlot in a debug build (every source run)', () => {
  it('the flag reads as a debug build here', () => {
    expect(DEBUG_BUILD).toBe(true);
    expect(debugMode()).toBe(true);
  });
  it('a current slot of this arena passes; after the next commit the same stamp is stale and asserts', () => {
    const p = framed();
    const q = query(p, p.key, 0, { minX: -10, minY: -10, maxX: 10, maxY: 10 }, { vertices: true });
    const v = q.vertices[0];
    expect(() => debugAssertSlot(p, q, { kind: 'vertex', slot: v })).not.toThrow();
    lane(p);
    expect(p.version).toBe(q.version + 1);
    expect(() => debugAssertSlot(p, q, { kind: 'vertex', slot: v })).toThrow(`a stale slot: stamped at version ${q.version}, arena ground/0 is at version ${p.version}`);
  });
  it('a slot stamped for another arena asserts', () => {
    const p = framed();
    const other = createPlat({ layer: 'underground', part: 1 }, FRAME);
    attachIndex(other, { gridCellCm: [800, 400, 200, 100, 50] });
    const q = query(p, p.key, 0, { minX: -10, minY: -10, maxX: 10, maxY: 10 }, { vertices: true });
    expect(() => debugAssertSlot(other, q, { kind: 'vertex', slot: q.vertices[0] })).toThrow(/stamped for arena ground\/0 was passed to arena underground\/1/);
    // A stamp alone (a service handed a stamped result) asserts the same way.
    expect(() => debugAssertSlot(other, q)).toThrow(/stamped for arena ground\/0/);
  });
  it('a current stamp with a slot that is not live asserts', () => {
    const p = framed();
    const stamp = { key: p.key, version: p.version };
    expect(() => debugAssertSlot(p, stamp, { kind: 'vertex', slot: p.slots.vertex.top + 2 })).toThrow(/not live/);
    expect(() => debugAssertSlot(p, stamp, { kind: 'halfEdge', slot: 2 * p.slots.pair.top + 4 })).toThrow(/not live/);
    expect(() => debugAssertSlot(p, stamp, { kind: 'face', level: 0, slot: 0 })).not.toThrow();
    expect(() => debugAssertSlot(p, stamp, { kind: 'face', level: 3, slot: 0 })).toThrow(/not live/);
  });
  it('with the arena\'s runtime switch off, nothing asserts', () => {
    const p = framed();
    const stale = { key: { layer: 'sky' as const, part: 4 }, version: 99 };
    setDebugAssertions(false);
    expect(debugMode()).toBe(false);
    expect(() => debugAssertSlot(p, stale, { kind: 'vertex', slot: 10_000 })).not.toThrow();
  });
});

describe('the build flag: off in a production bundle', () => {
  it('a module graph loaded with PLAT_DEBUG_BUILD = false asserts nothing and turns the arena\'s switch off', async () => {
    vi.stubGlobal('PLAT_DEBUG_BUILD', false);
    vi.resetModules();
    try {
      const dbg = await import('../../src/invariants/debug.js');
      const arena = await import('../../src/arena/index.js');
      expect(dbg.DEBUG_BUILD).toBe(false);
      expect(arena.debugAssertions()).toBe(false);
      const p = framed();
      expect(() => dbg.debugAssertSlot(p, { key: { layer: 'sky', part: 4 }, version: 99 }, { kind: 'vertex', slot: 10_000 })).not.toThrow();
    } finally {
      vi.unstubAllGlobals();
      vi.resetModules();
    }
  });

  it('esbuild\'s define PLAT_DEBUG_BUILD=false gives a bundle whose assertion is silent; without it the bundle asserts', async () => {
    const entry = fileURLToPath(new URL('../../src/invariants/debug.ts', import.meta.url));
    const dir = mkdtempSync(join(tmpdir(), 'plat-a14-debug-'));
    try {
      const run = async (define: Record<string, string>, name: string): Promise<{ build: boolean; threw: boolean }> => {
        const out = await build({ entryPoints: [entry], bundle: true, format: 'esm', platform: 'neutral', write: false, define, logLevel: 'silent', mainFields: ['module', 'main'] });
        const file = join(dir, name);
        writeFileSync(file, out.outputFiles[0].text);
        const mod = (await import(pathToFileURL(file).href)) as typeof import('../../src/invariants/debug.js');
        const p = framed();
        let threw = false;
        try {
          mod.debugAssertSlot(p, { key: { layer: 'sky', part: 4 }, version: 99 });
        } catch {
          threw = true;
        }
        return { build: mod.DEBUG_BUILD, threw };
      };
      expect(await run({ PLAT_DEBUG_BUILD: 'false' }, 'production.mjs')).toEqual({ build: false, threw: false });
      expect(await run({}, 'debug.mjs')).toEqual({ build: true, threw: true });
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }, 60_000);
});
