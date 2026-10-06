// The JSON reader of the content scan (M0-k-06; §17.1 (5); N-26; C-0247): every string value and every key of a JSON
// text with its line, decoded, and the text's tables. A number, boolean or null forms no text. A table column is one
// key's string values across three or more objects of one array (a JSON table, §17.1 (5)'s "a column of a table"), or
// an array holding three or more strings (a list, which a one-item-per-line layout would otherwise hide from the line
// rule). Returns null for a text that is not JSON.

/** One string of a JSON text: its decoded text and the line it starts on. */
export interface JsonString {
  line: number;
  text: string;
}

export interface JsonText {
  strings: JsonString[];
  columns: { line: number; cells: string[] }[];
}

/** The fewest records (or list items) a column needs (§17.1 (2) (vi): "one field's string values across three or more records"). */
export const COLUMN_MIN_CELLS = 3;

type Value = { kind: 'string'; s: JsonString } | { kind: 'object'; entries: [JsonString, Value][] } | { kind: 'array'; items: Value[] } | { kind: 'other' };

class JsonError extends Error {}

/** Reads a JSON text; null when it is not JSON. */
export function readJson(src: string): JsonText | null {
  let i = 0;
  let line = 1;
  const n = src.length;
  const strings: JsonString[] = [];
  const columns: { line: number; cells: string[] }[] = [];

  const ws = (): void => {
    while (i < n) {
      const c = src[i];
      if (c === '\n') line += 1;
      else if (c !== ' ' && c !== '\t' && c !== '\r') break;
      i += 1;
    }
  };
  const str = (): JsonString => {
    const start = line;
    i += 1; // the opening quote
    let out = '';
    for (;;) {
      if (i >= n) throw new JsonError();
      const c = src[i] as string;
      if (c === '"') {
        i += 1;
        break;
      }
      if (c === '\n') throw new JsonError();
      if (c === '\\') {
        const e = src[i + 1];
        if (e === 'u') {
          const h = src.slice(i + 2, i + 6);
          if (!/^[0-9A-Fa-f]{4}$/.test(h)) throw new JsonError();
          out += String.fromCharCode(parseInt(h, 16));
          i += 6;
          continue;
        }
        const map: Record<string, string> = { '"': '"', '\\': '\\', '/': '/', b: ' ', f: ' ', n: '\n', r: '\n', t: ' ' };
        const m = e === undefined ? undefined : map[e];
        if (m === undefined) throw new JsonError();
        out += m;
        i += 2;
        continue;
      }
      out += c;
      i += 1;
    }
    const s = { line: start, text: out };
    strings.push(s);
    return s;
  };
  const value = (): Value => {
    ws();
    const c = src[i];
    if (c === '"') return { kind: 'string', s: str() };
    if (c === '{') {
      i += 1;
      const entries: [JsonString, Value][] = [];
      ws();
      if (src[i] === '}') {
        i += 1;
        return { kind: 'object', entries };
      }
      for (;;) {
        ws();
        if (src[i] !== '"') throw new JsonError();
        const k = str();
        ws();
        if (src[i] !== ':') throw new JsonError();
        i += 1;
        entries.push([k, value()]);
        ws();
        if (src[i] === ',') {
          i += 1;
          continue;
        }
        if (src[i] === '}') {
          i += 1;
          return { kind: 'object', entries };
        }
        throw new JsonError();
      }
    }
    if (c === '[') {
      i += 1;
      const items: Value[] = [];
      ws();
      if (src[i] === ']') {
        i += 1;
        return { kind: 'array', items };
      }
      for (;;) {
        items.push(value());
        ws();
        if (src[i] === ',') {
          i += 1;
          continue;
        }
        if (src[i] === ']') {
          i += 1;
          tableOf(items);
          return { kind: 'array', items };
        }
        throw new JsonError();
      }
    }
    const m = /^(?:-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?|true|false|null)/.exec(src.slice(i, i + 400));
    if (m === null) throw new JsonError();
    i += m[0].length;
    return { kind: 'other' };
  };
  const tableOf = (items: Value[]): void => {
    const strs = items.flatMap((v) => (v.kind === 'string' ? [v.s] : []));
    if (strs.length >= COLUMN_MIN_CELLS) columns.push({ line: (strs[0] as JsonString).line, cells: strs.map((s) => s.text) });
    const byKey = new Map<string, JsonString[]>();
    for (const v of items) {
      if (v.kind !== 'object') continue;
      for (const [k, x] of v.entries) {
        if (x.kind !== 'string') continue;
        const cells = byKey.get(k.text);
        if (cells === undefined) byKey.set(k.text, [x.s]);
        else cells.push(x.s);
      }
    }
    for (const cells of byKey.values()) {
      if (cells.length >= COLUMN_MIN_CELLS) columns.push({ line: (cells[0] as JsonString).line, cells: cells.map((s) => s.text) });
    }
  };

  try {
    if (src.charCodeAt(0) === 0xfeff) i = 1;
    value();
    ws();
    if (i !== n) return null;
  } catch (e) {
    if (e instanceof JsonError || e instanceof RangeError) return null;
    throw e;
  }
  return { strings, columns };
}
