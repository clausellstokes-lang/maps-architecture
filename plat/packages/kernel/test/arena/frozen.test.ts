// M0-a-02's exit bar: typed-array tables only — no Map or Set reachable from a Plat (§13.1's frozen-copy property, the
// copy a pool worker receives, §3.3 pool step 1). The test walks the whole reachable graph and serialises it (V8's
// structured serialisation, what postMessage uses), and the copy resolves exactly as the original.
import { deserialize, serialize } from 'node:v8';
import { describe, expect, it } from 'vitest';
import { addRole, createPlat, intern, resolve, setFaceOwner, type Plat } from '../../src/arena/index.js';
import { buildArena, faceAt, FRAME, GROUND, LAKE, pt, QUARTERS } from './support.js';

const TYPED = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float64Array];

/** Every value reachable from `root`, classified; anything but a primitive, a plain object, an array or a typed array is reported with its path. */
function census(root: unknown): { typed: number; bytes: number; foreign: string[] } {
  const seen = new Set<unknown>();
  const out = { typed: 0, bytes: 0, foreign: [] as string[] };
  const visit = (v: unknown, path: string): void => {
    if (v === null || typeof v !== 'object') {
      if (typeof v === 'function' || typeof v === 'symbol' || typeof v === 'bigint') out.foreign.push(`${path}: ${typeof v}`);
      return;
    }
    if (seen.has(v)) return;
    seen.add(v);
    if (TYPED.some((T) => v instanceof T)) {
      out.typed++;
      out.bytes += (v as Uint8Array).byteLength;
      return;
    }
    const proto: unknown = Object.getPrototypeOf(v);
    if (Array.isArray(v)) {
      v.forEach((x, i) => visit(x, `${path}[${i}]`));
      return;
    }
    if (proto !== Object.prototype && proto !== null) {
      out.foreign.push(`${path}: ${(v as object).constructor.name}`);
      return;
    }
    for (const k of Reflect.ownKeys(v)) visit((v as Record<string | symbol, unknown>)[k], `${path}.${String(k)}`);
  };
  visit(root, 'plat');
  return out;
}

function dressed(): Plat {
  const b = buildArena(QUARTERS);
  const p = b.plat;
  for (const i of [11, 13, 14]) addRole(p, b.he[i], { role: 'way', entity: 'way:ns' }, 1);
  addRole(p, b.v[8], { role: 'junction', entity: 'junction:c' }, 1);
  addRole(p, b.v[7], { role: 'gate_end', entity: 'gate:1', ordinal: 0 }, 1);
  setFaceOwner(p, 2, faceAt(b, 2, pt(100, 400)), intern(p, 'block:sw'));
  return p;
}

describe('the frozen-copy property (exit bar: no Map or Set reachable from a Plat)', () => {
  it('reaches only primitives, plain objects, arrays and typed arrays — on an empty, a dressed and a holed arena', () => {
    for (const p of [createPlat(GROUND, FRAME), dressed(), buildArena(LAKE).plat]) {
      const c = census(p);
      expect(c.foreign).toEqual([]);
      expect(c.typed).toBeGreaterThan(40);
    }
  });

  it('the census catches a planted Map, Set, function or class instance (negative control)', () => {
    const p = dressed() as unknown as Record<string, unknown>;
    (p.roles as Record<string, unknown>).extra = new Map();
    (p.faces as Record<string, unknown>[])[2].cache = new Set([1]);
    p.hook = () => 1;
    p.when = new Date(0);
    expect(census(p).foreign.sort()).toEqual(['plat.faces[2].cache: Set', 'plat.hook: function', 'plat.roles.extra: Map', 'plat.when: Date']);
  });

  it('serialises and deserialises whole (V8 structured clone): every table equal, and the copy resolves exactly as the original', () => {
    const p = dressed();
    const copy = deserialize(serialize(p)) as Plat;
    expect(copy).toEqual(p);
    expect(structuredClone(p)).toEqual(p);
    for (const ref of [{ role: 'way', entity: 'way:ns' }, { role: 'junction', entity: 'junction:c' }, { owner: 'block:sw', level: 2 as const }]) {
      expect(resolve(copy, ref, GROUND)).toEqual(resolve(p, ref, GROUND));
    }
  });
});
