// M0-k-03: Clipper2's WebAssembly module loads once through `loadOracles()` (C-0144 (1)). This file runs in a module
// graph of its own (vitest isolates test files), so its first tests see the module unloaded — the one state in which
// a library refuses a measurement on its own, which the cross-check must report (C-0144 (6), C-0148 (2)).
import { describe, expect, it } from 'vitest';
import { compareSplit, loadOracles, oracleBoolean, oracleBuffer, symDiffArea } from '../../src/oracles/index.js';
import { clipper2Loaded } from '../../src/oracles/clipper2.js';
import type { OracleResult } from '../../src/oracles/types.js';
import { rect } from './support.js';

describe('loading the oracles', () => {
  it('refuses a Clipper2 call before loadOracles(), and serves polygon-clipping without it', () => {
    expect(clipper2Loaded()).toBe(false);
    expect(() => oracleBoolean('union', [rect(0, 0, 10, 10)], [], 'nonzero', 'clipper2')).toThrow(/loadOracles/);
    expect(() => oracleBuffer([[rect(0, 0, 10, 10)[0], rect(0, 0, 10, 10)[1]]], 5, 'round', 'flat', 'clipper2')).toThrow(/loadOracles/);
    expect(oracleBoolean('union', [rect(0, 0, 100, 100)], [], 'nonzero', 'polygon-clipping').ok).toBe(true);
  });

  it('measures through the engine it names: Clipper2 refuses before loading, polygon-clipping answers', () => {
    expect(clipper2Loaded()).toBe(false);
    expect(() => symDiffArea([rect(0, 0, 100, 100)], [], 'clipper2')).toThrow(/loadOracles/);
    expect(symDiffArea([rect(0, 0, 100, 100)], [], 'polygon-clipping')).toBe(10_000);
  });

  it('fails the cross-check, never throws, when one oracle cannot measure the case', () => {
    expect(clipper2Loaded()).toBe(false);
    const square = rect(0, 0, 100, 100);
    const pc = oracleBoolean('union', [square], [], 'nonzero', 'polygon-clipping');
    // against polygon-clipping: its own area 0, Clipper2's cross-check refused
    const v = compareSplit([square], pc, []);
    expect([v.symDiffCm2, v.crossChecked, v.pass]).toEqual([0, false, false]);
    expect(v.crossCheckCm2).toBeNaN();
    expect(v.failures).toEqual(['cross-check']);
    // against a Clipper2 result (planted: Clipper2 cannot answer yet): its own area refused, polygon-clipping's 0
    if (!pc.ok) throw new Error(pc.error);
    const planted: OracleResult = { ok: true, engine: 'clipper2', rings: pc.rings, perimeterCm: pc.perimeterCm };
    const w = compareSplit([square], planted, []);
    expect(w.symDiffCm2).toBeNaN();
    expect(w.crossCheckCm2).toBe(0);
    expect(w.crossChecked).toBe(false);
    expect(w.failures).toHaveLength(3);
    expect(w.failures[0]).toMatch(/^area: clipper2 could not measure it \(oracles: await loadOracles\(\)/);
    expect(w.failures.slice(1)).toEqual(['cross-check', 'area']);
  });

  it('loads once, concurrently or in turn, and then answers', async () => {
    await Promise.all([loadOracles(), loadOracles()]);
    await loadOracles();
    expect(clipper2Loaded()).toBe(true);
    const r = oracleBoolean('union', [rect(0, 0, 100, 100)], [], 'nonzero', 'clipper2');
    expect(r.ok && r.rings.length).toBe(1);
    expect(symDiffArea([rect(0, 0, 100, 100)], [], 'clipper2')).toBe(10_000);
  });
});
