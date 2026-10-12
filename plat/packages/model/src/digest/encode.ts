// The digest's value rule (§6.2: "integers enter as 32-bit lanes, doubles as their IEEE-754 bit patterns (−0 normalised
// to +0; NaN refused by the schema), strings as UTF-8 — no text serialisation on the digest path, and no dependence on
// byte order"; M0-d-04, C-0194 (4)). A record's top-level attributes enter in schema order (schema/order.ts); every
// nested value — a sub-record, a list, a reference, a profile — enters by this one rule, each value behind a type tag so
// no two shapes share a lane stream:
//   absent (undefined)  ABSENT                          null      NULL
//   false / true        FALSE / TRUE                    string    STRING, then its UTF-8 (LaneWriter.utf8)
//   an integer in −2³¹ … 2³¹ − 1 (−0 included, as 0)   INT, one i32 lane
//   any other number    F64, two lanes: its bit pattern (−0 → +0; NaN refused, naming the path)
//   an array            ARRAY, its length, its elements
//   a typed array       TYPED, its element type's code, its length, its elements (integers as one lane, floats as F64)
//   a plain object      OBJECT, the count of its present keys, then each key (UTF-8) and value in `sortedKeys` order —
//                       a key whose value is undefined is absent
// Anything else (a Map, a Set, a function, a bigint, a symbol, a class instance) is refused: no record holds one.
// The geometry references a value holds — the FaceRef, ChainRef, EdgeSetRef and VertexRef forms (§2.2 rule 5) — are
// collected as they are met, so the leaf can append the digests of the faces and chains they resolve to.
// A digest written into another digest — a geometry digest in a leaf, a leaf or node in its parent — enters as its four
// u32 lanes in order (`writeHash128`); `sameHash` is the one equality of two digests. Both are file-level exports the
// digest modules share, not part of the package's API.
import { sortedKeys, type ChainRef, type EdgeSetRef, type FaceRef, type Hash128, type LaneWriter, type VertexRef } from '@plat/kernel';

/** A stored geometry reference (§2.2 rule 5; a StretchRef is never stored). */
export type GeomRefLike = FaceRef | ChainRef | EdgeSetRef | VertexRef;

const ABSENT = 0;
const NULL = 1;
const FALSE = 2;
const TRUE = 3;
const INT = 4;
const F64 = 5;
const STRING = 6;
const ARRAY = 7;
const OBJECT = 8;
const TYPED = 9;

/** The typed-array element types, by code: the integer kinds, then the two float kinds. */
const TYPED_KINDS = [
  Int8Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
] as const;
const UINT32 = 6;
const FIRST_FLOAT = 7;

function isPlainObject(v: object): boolean {
  const proto = Object.getPrototypeOf(v) as unknown;
  return proto === Object.prototype || proto === null;
}

/** The geometry reference a plain object is, by its exact key set, or null (§2.2 rule 5's four stored forms). */
export function geomRefOf(v: object): GeomRefLike | null {
  const keys = sortedKeys(v);
  const o = v as Record<string, unknown>;
  if (keys.length === 2 && keys[0] === 'level' && keys[1] === 'owner') {
    const level = o.level;
    if (typeof o.owner === 'string' && (level === 0 || level === 1 || level === 2 || level === 3 || level === 4)) return { owner: o.owner, level };
    return null;
  }
  if ((keys.length === 2 && keys[0] === 'entity' && keys[1] === 'role') || (keys.length === 3 && keys[0] === 'entity' && keys[1] === 'ordinal' && keys[2] === 'role')) {
    if (typeof o.role !== 'string' || typeof o.entity !== 'string') return null;
    if (keys.length === 2) return { role: o.role, entity: o.entity };
    const ordinal = o.ordinal;
    if (ordinal === undefined) return { role: o.role, entity: o.entity };
    if (typeof ordinal !== 'number' || !Number.isInteger(ordinal) || ordinal < 0) return null;
    return { role: o.role, entity: o.entity, ordinal };
  }
  return null;
}

/**
 * Writes `v` by the digest's value rule; every geometry reference met is pushed to `refs` (when given). `path` names
 * the value in a refusal.
 */
export function writeValue(w: LaneWriter, v: unknown, path: string, refs: GeomRefLike[] | null): void {
  if (v === undefined) {
    w.u32(ABSENT);
    return;
  }
  if (v === null) {
    w.u32(NULL);
    return;
  }
  switch (typeof v) {
    case 'boolean':
      w.u32(v ? TRUE : FALSE);
      return;
    case 'number':
      if (Number.isNaN(v)) throw new RangeError(`digest: NaN at ${path} is refused (§6.2)`);
      if (Number.isInteger(v) && (v | 0) === v) w.u32(INT).i32(v);
      else w.u32(F64).f64(v);
      return;
    case 'string':
      w.u32(STRING).utf8(v);
      return;
    case 'object':
      break;
    default:
      throw new RangeError(`digest: a ${typeof v} at ${path} has no digest encoding`);
  }
  const o = v as object;
  if (Array.isArray(o)) {
    w.u32(ARRAY).u32(o.length);
    for (let i = 0; i < o.length; i++) writeValue(w, o[i] as unknown, `${path}[${i}]`, refs);
    return;
  }
  if (ArrayBuffer.isView(o)) {
    const code = TYPED_KINDS.findIndex((T) => o instanceof T);
    if (code < 0) throw new RangeError(`digest: the typed array at ${path} has no digest encoding (a bigint or DataView)`);
    const a = o as unknown as ArrayLike<number>;
    w.u32(TYPED).u32(code).u32(a.length);
    if (code >= FIRST_FLOAT) {
      for (let i = 0; i < a.length; i++) {
        if (Number.isNaN(a[i])) throw new RangeError(`digest: NaN at ${path}[${i}] is refused (§6.2)`);
        w.f64(a[i]);
      }
    } else if (code === UINT32) for (let i = 0; i < a.length; i++) w.u32(a[i]);
    else for (let i = 0; i < a.length; i++) w.i32(a[i]);
    return;
  }
  if (!isPlainObject(o)) throw new RangeError(`digest: the ${String((o as { constructor?: { name?: string } }).constructor?.name)} at ${path} has no digest encoding`);
  const keys = sortedKeys(o);
  const rec = o as Record<string, unknown>;
  const present = keys.filter((k) => rec[k] !== undefined);
  w.u32(OBJECT).u32(present.length);
  for (const k of present) {
    w.utf8(k);
    writeValue(w, rec[k], `${path}.${k}`, refs);
  }
  if (refs !== null) {
    const ref = geomRefOf(o);
    if (ref !== null) refs.push(ref);
  }
}

/** Writes a digest as its four u32 lanes, in order (a lane that is not a u32 is refused by `LaneWriter.u32`). */
export function writeHash128(w: LaneWriter, h: Readonly<Hash128>): void {
  w.u32(h[0]).u32(h[1]).u32(h[2]).u32(h[3]);
}

/** Two digests are equal: all four lanes. */
export function sameHash(a: Readonly<Hash128>, b: Readonly<Hash128>): boolean {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/** A reference's text form, for de-duplication and dependency keys (not on the digest path). */
export function refText(ref: GeomRefLike): string {
  if ('owner' in ref) return `face|${ref.owner}|${ref.level}`;
  const ordinal = (ref as EdgeSetRef).ordinal;
  return `chain|${ref.role}|${ref.entity}|${ordinal === undefined ? '*' : ordinal}`;
}

/** The entity a reference names (a FaceRef's owner, a role reference's entity). */
export function refEntity(ref: GeomRefLike): string {
  return 'owner' in ref ? ref.owner : ref.entity;
}
