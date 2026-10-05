// The canonical form of the parity report and the crossing records (M0-k-05; §13.5: "the report is written in V12
// §3.13's canonical form, so the same inputs give the same bytes on every host"; C-0180 (11)). M0 reads no volume, so
// its form is the one `tools/landed` already hashes records by: JSON with every object's keys in code-unit order, no
// white space, arrays in their order, numbers in JavaScript's shortest round-trip form; a non-finite number or a value
// JSON cannot hold is refused, never written as null.

const byCodeUnit = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);

/** The canonical JSON text of a value (C-0180 (11)). */
export function canonicalJson(v: unknown): string {
  if (v === null) return 'null';
  switch (typeof v) {
    case 'number':
      if (!Number.isFinite(v)) throw new Error(`canonical JSON: a non-finite number (${String(v)})`);
      return JSON.stringify(v);
    case 'string':
    case 'boolean':
      return JSON.stringify(v);
    case 'object': {
      if (Array.isArray(v)) return `[${v.map(canonicalJson).join(',')}]`;
      const o = v as Record<string, unknown>;
      const keys = Object.keys(o)
        .filter((k) => o[k] !== undefined)
        .sort(byCodeUnit);
      return `{${keys.map((k) => `${JSON.stringify(k)}:${canonicalJson(o[k])}`).join(',')}}`;
    }
    default:
      throw new Error(`canonical JSON: a ${typeof v} cannot be written`);
  }
}

/** A Hash128's four u32 lanes as 32 lower-case hex digits, low word first. */
export function hash128Hex(h: readonly number[]): string {
  return h.map((w) => (w >>> 0).toString(16).padStart(8, '0')).join('');
}
