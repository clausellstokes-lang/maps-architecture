// The canonical text serialisation (§6.2: "sorted keys, integer coordinates, floats as shortest round-trip strings —
// used only for golden files and exports"; M0-d-04). It is NOT on the digest path: no leaf, node or root reads it
// (C-0194 (10)); `test/digest/leaf.test.ts` scans the digest sources for it. The goldens' canonical text form is M1's
// (M0-work.json's defers): at M0 it exists for the tests.
import { sortedKeys } from '@plat/kernel';

function text(v: unknown, path: string): string {
  if (v === null) return 'null';
  switch (typeof v) {
    case 'boolean':
      return v ? 'true' : 'false';
    case 'number':
      if (!Number.isFinite(v)) throw new RangeError(`canonical text: ${String(v)} at ${path} has no text form`);
      // ECMAScript's Number-to-String is the shortest string that round-trips; −0 is written 0.
      return v === 0 ? '0' : String(v);
    case 'string':
      return JSON.stringify(v);
    case 'object':
      break;
    default:
      throw new RangeError(`canonical text: a ${typeof v} at ${path} has no text form`);
  }
  const o = v as object;
  if (Array.isArray(o)) return `[${o.map((x, i) => (x === undefined ? 'null' : text(x as unknown, `${path}[${i}]`))).join(',')}]`;
  if (ArrayBuffer.isView(o)) {
    const a = o as unknown as ArrayLike<number>;
    const out: string[] = [];
    for (let i = 0; i < a.length; i++) out.push(text(a[i], `${path}[${i}]`));
    return `[${out.join(',')}]`;
  }
  const rec = o as Record<string, unknown>;
  const parts: string[] = [];
  for (const k of sortedKeys(o)) if (rec[k] !== undefined) parts.push(`${JSON.stringify(k)}:${text(rec[k], `${path}.${k}`)}`);
  return `{${parts.join(',')}}`;
}

/** A value's canonical text: keys sorted, absent keys left out, numbers in their shortest round-trip form. */
export function canonicalText(v: unknown): string {
  return text(v, '$');
}
