// bench/src/profile/sourcemap.ts — a generated source's inline source map read back to TypeScript file:line. R7's
// analysers used plat's transitive source-map-js 1.2.2 by an absolute path into node_modules/.pnpm; the bench declares
// no such dependency (and the lockfile is frozen), so this is the decoder they need and no more: base64 VLQ mappings,
// `originalPositionFor` with source-map-js's two biases (least upper bound first, then greatest lower bound, both on the
// generated line only, as source-map-js's lookup does).

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const DIGIT = new Map([...B64].map((c, i) => [c, i]));

/** One segment's base64 VLQ values, decoded. */
export function decodeVlq(segment: string): number[] {
  const out: number[] = [];
  let value = 0;
  let shift = 0;
  for (const c of segment) {
    const d = DIGIT.get(c);
    if (d === undefined) throw new Error(`sourcemap: ${JSON.stringify(c)} is not a base64 digit`);
    value += (d & 31) * 2 ** shift;
    if ((d & 32) !== 0) {
      shift += 5;
      continue;
    }
    out.push(value % 2 === 1 ? -Math.floor(value / 2) : value / 2);
    value = 0;
    shift = 0;
  }
  if (shift !== 0) throw new Error(`sourcemap: ${JSON.stringify(segment)} ends inside a value`);
  return out;
}

/** One mapping of a generated line: its column and, when it has one, the original position (0-based line and column). */
interface Segment {
  readonly col: number;
  readonly src: number | null;
  readonly line: number;
  readonly column: number;
  readonly name: number | null;
}

/** An original position: the source path as the map names it, the 1-based line, the 0-based column, the name if any. */
export interface Original {
  readonly source: string;
  readonly line: number;
  readonly column: number;
  readonly name: string | null;
}

/** A decoded source map (version 3, no sections). */
export class SourceMap {
  private constructor(
    private readonly lines: readonly (readonly Segment[])[],
    private readonly sources: readonly string[],
    private readonly names: readonly string[],
  ) {}

  /** The map of a raw version-3 JSON object. */
  static fromJson(map: { readonly sources?: readonly string[]; readonly sourceRoot?: string; readonly names?: readonly string[]; readonly mappings?: string }): SourceMap {
    const root = map.sourceRoot ?? '';
    const sources = (map.sources ?? []).map((s) => (root === '' ? s : `${root.replace(/\/$/, '')}/${s}`));
    const lines: Segment[][] = [];
    let src = 0;
    let line = 0;
    let column = 0;
    let name = 0;
    for (const text of (map.mappings ?? '').split(';')) {
      const segs: Segment[] = [];
      let col = 0;
      for (const raw of text.split(',')) {
        if (raw === '') continue;
        const v = decodeVlq(raw);
        col += v[0];
        if (v.length >= 4) {
          src += v[1];
          line += v[2];
          column += v[3];
          if (v.length >= 5) name += v[4];
          segs.push({ col, src, line, column, name: v.length >= 5 ? name : null });
        } else {
          segs.push({ col, src: null, line: 0, column: 0, name: null });
        }
      }
      segs.sort((a, b) => a.col - b.col);
      lines.push(segs);
    }
    return new SourceMap(lines, sources, map.names ?? []);
  }

  /** The inline map at the end of a generated source (`//# sourceMappingURL=data:application/json…;base64,…`), or null. */
  static fromInline(source: string): SourceMap | null {
    const at = source.lastIndexOf('//# sourceMappingURL=data:application/json');
    if (at < 0) return null;
    const b = source.indexOf('base64,', at);
    if (b < 0) return null;
    const b64 = source.slice(b + 7).split('\n')[0].trim();
    try {
      return SourceMap.fromJson(JSON.parse(Buffer.from(b64, 'base64').toString('utf8')) as Parameters<typeof SourceMap.fromJson>[0]);
    } catch {
      return null;
    }
  }

  /**
   * The original position of a generated one (line 1-based, column 0-based): the first mapping at or after the column on
   * that line, else the last one before it; null when neither carries a source.
   */
  originalFor(line: number, column: number): Original | null {
    const segs = this.lines[line - 1];
    if (segs === undefined || segs.length === 0) return null;
    const lub = segs.find((s) => s.col >= column);
    const hit = lub !== undefined && lub.src !== null ? lub : [...segs].reverse().find((s) => s.col <= column);
    if (hit === undefined || hit.src === null) return null;
    return { source: this.sources[hit.src] ?? '?', line: hit.line + 1, column: hit.column, name: hit.name === null ? null : (this.names[hit.name] ?? null) };
  }
}

/** A plat path cut to the package and its file (`kernel/tx/savepoint.ts`, `bench/src/fusion/runs.ts`), as R7's shortPath. */
export function shortPath(p: string | null | undefined): string {
  if (p === null || p === undefined) return '?';
  const m = /(?:packages\/)([^/]+\/src\/.*)$/.exec(p) ?? /(bench\/src\/.*)$/.exec(p) ?? /([^/]+\/[^/]+)$/.exec(p);
  return (m ? m[1] : p).replace(/^([a-z]+)\/src\//, '$1/');
}

/** Line starts of a text (0-based offsets), for offset → line:column. */
export function lineStarts(text: string): number[] {
  const out = [0];
  for (let i = 0; i < text.length; i += 1) if (text.charCodeAt(i) === 10) out.push(i + 1);
  return out;
}

/** A 0-based offset as a 1-based line and 0-based column, given the text's line starts. */
export function lineColumnOf(starts: readonly number[], offset: number): { line: number; column: number } {
  let lo = 0;
  let hi = starts.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (starts[mid] <= offset) lo = mid;
    else hi = mid - 1;
  }
  return { line: lo + 1, column: offset - starts[lo] };
}
