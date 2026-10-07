// The scan command (M0-k-06; §17.1 (5); C-0101, C-0113): at M0 `corepack pnpm scan` (= `corepack pnpm bench -- scan`),
// the design's scan of the `plat` bin (M1). It reads `packages/testkit/baselines/denylist.json` and
// `denylist-allow.json` relative to the plat/ it runs in — never an absolute path, so a scratch copy scans itself
// (N-23's planted-hit control) — and returns the report with its exit code: 0 no unreviewed hit, 1 an unreviewed hit,
// 2 stopped naming the file (a missing deny-list or allow file, unreadable JSON, a normalisationVersion that is not 1
// naming both versions, a digestHexDigits that is not 16, a malformed allow entry, a tree with no file), 64 usage.
// Printed lines and the report name each hit's file, line and check — never the matched content.
import { isAbsolute, join, relative, sep } from 'node:path';
import { loadAllows } from './allow.js';
import { loadDenyList } from './denylist.js';
import { scanTree } from './scan.js';
import { ALLOW_FILE, DENYLIST_FILE } from './scope.js';
import { ScanStop, type ScanHit, type ScanReport } from './types.js';

export const SCAN_USAGE = 'usage: corepack pnpm scan (no arguments at M0: it scans the plat/ it runs in with packages/testkit/baselines/denylist.json)';

/** The most hits printed one per line; the report holds them all. */
export const PRINTED_HITS = 50;

export interface ScanRun {
  code: 0 | 1 | 2 | 64;
  lines: string[];
  report?: ScanReport;
  /** The report as written (JSON, two-space indented, a final newline). */
  text?: string;
}

/** The command's arguments: none at M0. */
export function scanArgs(args: readonly string[]): { ok: true } | { usage: string } {
  return args.length === 0 ? { ok: true } : { usage: `scan: unknown arguments ${JSON.stringify(args)}; ${SCAN_USAGE}` };
}

/** One hit's printed line: its check and place, never its content. */
export function hitLine(h: ScanHit): string {
  const where = h.check === 'list' ? ` (list ${String(h.list)}, ${h.where === 'column' ? 'a column from this line' : 'this line'})` : '';
  return `scan: unreviewed ${h.check} hit at ${h.file}${h.line > 0 ? `:${h.line}` : ''}${where}`;
}

const relTo = (root: string, p: string): string => relative(root, isAbsolute(p) ? p : join(root, p)).split(sep).join('/');

/**
 * Runs the scan over `platRoot` with the deny-list and allow file at their places (or a test's `listPath` and
 * `allowPath`, relative to `platRoot` or absolute).
 */
export function runScan(opts: { platRoot: string; listPath?: string; allowPath?: string }): ScanRun {
  const root = opts.platRoot;
  const listPath = opts.listPath ?? DENYLIST_FILE;
  const allowPath = opts.allowPath ?? ALLOW_FILE;
  const abs = (p: string): string => (isAbsolute(p) ? p : join(root, p));
  try {
    const list = loadDenyList(abs(listPath), relTo(root, listPath));
    const allows = loadAllows(abs(allowPath), relTo(root, allowPath));
    const skip = new Set([relTo(root, listPath), relTo(root, allowPath)]);
    const report = scanTree({ root, list, allows, skip, listFile: relTo(root, listPath) });
    const c = report.counts;
    const m = report.files.byMode;
    const lines = [
      `scan: ${report.files.scanned} files (whole text ${m.whole}, sources ${m.source}, JSON strings ${m.strings}, bytes only ${m.bytes}); normalisationVersion ${report.normalisationVersion}`,
      `scan: ${c.hits} hits (token ${c.token}, 3-gram ${c.trigram}, colour ${c.colour}, file ${c.file}, list ${c.list}); ${c.allowed} allowed, ${c.unreviewed} unreviewed${report.unusedAllow.length > 0 ? `; ${report.unusedAllow.length} allow entries matched nothing` : ''}`,
    ];
    const open = report.hits.filter((h) => h.allowedBy === undefined);
    for (const h of open.slice(0, PRINTED_HITS)) lines.push(hitLine(h));
    if (open.length > PRINTED_HITS) lines.push(`scan: … ${open.length - PRINTED_HITS} more unreviewed hits in the report`);
    return { code: c.unreviewed > 0 ? 1 : 0, lines, report, text: `${JSON.stringify(report, null, 2)}\n` };
  } catch (e) {
    if (e instanceof ScanStop) return { code: 2, lines: [e.message] };
    throw e;
  }
}
