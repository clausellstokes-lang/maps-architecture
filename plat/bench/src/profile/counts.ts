// bench/src/profile/counts.ts — R7's counts.mjs as a module: a count run's stage window (V8 precise coverage with call
// counts, taken and reset at the stage's boundaries — the exact invocation count of every function the stage ran), each
// function mapped to its TypeScript file:line through the generated source's inline source map. The named functions'
// counts (every definition of the name, a bundle's collision suffixes — run4, attempt3 — included), their ratio to the
// cuts (splitFace + connectHole calls), and the top N by count.
import { lineColumnOf, lineStarts, SourceMap } from './sourcemap.js';
import type { Coverage, Sources } from './types.js';

/** R7's named functions (counts.mjs's --fns default): the dry-runs, the insertion, the index's queries, the box tests. */
export const COUNT_FNS: readonly string[] = 'splitFace,connectHole,ladderOn,kerb,readKerb,readOn,censusRead,restagedRead,dryRun,dryClose,dryInsert,dryRegion,insertTx,insertChain,rewalk,reparent,query,collect,gridCandidates,boxesMeet,orient2d,faceWalk,takeSavepoint,restoreSavepoint,opSave,rollback,createPlat,buildOverlay,overlayRegion,mint,mintOne,relevant,planCut,judge,tryCandidate,makeBlock,pointLocate,labelPoint,clipWindow'.split(',');

export interface CountRow {
  readonly name: string;
  /** The definition's TypeScript file:line (or the generated script's, marked (gen)). */
  readonly at: string;
  readonly count: number;
}

export interface Counts {
  /** splitFace + connectHole calls. */
  readonly cuts: number;
  readonly named: Record<string, { readonly total: number; readonly perCut: number | null; readonly defs: readonly CountRow[] }>;
  /** Every function that ran, by count descending (then name, then place). */
  readonly rows: readonly CountRow[];
}

const escape = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function counts(cov: Coverage, sources: Sources, fns: readonly string[] = COUNT_FNS): Counts {
  const rows: CountRow[] = [];
  for (const s of cov) {
    const src = sources[s.scriptId];
    const starts = src === undefined ? null : lineStarts(src.source);
    const map = src === undefined ? null : SourceMap.fromInline(src.source);
    const gen = (src?.url ?? s.url).split('/').pop() ?? s.url;
    for (const f of s.functions) {
      let at = `${s.url}@${String(f.start)}`;
      if (starts !== null) {
        const p = lineColumnOf(starts, f.start);
        const o = map === null ? null : map.originalFor(p.line, p.column);
        if (o === null) at = `${gen}:${String(p.line)}(gen)`;
        else {
          const m = /packages\/([^/]+)\/src\/(.*)$/.exec(o.source) ?? /(bench\/src\/.*)$/.exec(o.source);
          at = `${m === null ? o.source.replace(/^.*node_modules\//, '') : m.length > 2 ? `${m[1]}/${m[2]}` : m[1]}:${String(o.line)}`;
        }
      }
      rows.push({ name: f.functionName === '' ? '(anonymous)' : f.functionName, at, count: f.count });
    }
  }
  rows.sort((a, b) => b.count - a.count || (a.name < b.name ? -1 : a.name > b.name ? 1 : a.at < b.at ? -1 : a.at > b.at ? 1 : 0));
  const defsOf = (f: string): CountRow[] => {
    const re = new RegExp(`^${escape(f)}\\d*$`);
    return rows.filter((r) => re.test(r.name));
  };
  const sum = (rs: readonly CountRow[]): number => rs.reduce((a, r) => a + r.count, 0);
  const cuts = sum(defsOf('splitFace')) + sum(defsOf('connectHole'));
  const named: Counts['named'] = Object.fromEntries(
    fns.map((f) => {
      const defs = defsOf(f);
      const total = sum(defs);
      return [f, { total, perCut: cuts > 0 ? total / cuts : null, defs }];
    }),
  );
  return { cuts, named, rows };
}

export function formatCounts(c: Counts, top: number): string[] {
  return [
    `## named functions (calls in the stage, from precise coverage; every definition of the name; calls a cut)`,
    ...Object.entries(c.named).map(([f, v]) => `${f}\t${String(v.total)} calls\t${v.perCut === null ? '-' : v.perCut.toFixed(1)} a cut\t${v.defs.map((r) => `${r.name}@${r.at}=${String(r.count)}`).join(' ')}`),
    `## top ${String(top)} by calls`,
    ...c.rows.slice(0, top).map((r, i) => `${String(i + 1)}\t${r.name}\t${r.at}\t${String(r.count)} calls\t${c.cuts > 0 ? (r.count / c.cuts).toFixed(0) : '-'} a cut`),
  ];
}
