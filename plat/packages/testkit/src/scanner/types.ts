// The content scan's types (M0-k-06; §17.1 (5); C-0101, C-0113). A report names each hit by file, line and check —
// never the matched token, 3-gram, colour, word or file content (the item's test "the scanner never prints a matched
// token, only its location and check").

/** The five checks of §17.1 (5). */
export type ScanCheck = 'token' | 'trigram' | 'colour' | 'file' | 'list';

export const SCAN_CHECKS: readonly ScanCheck[] = ['token', 'trigram', 'colour', 'file', 'list'];

/** How a file's content is read (C-0246): the whole text, its string literals and comments, or its JSON strings. */
export type ReadMode = 'whole' | 'source' | 'strings' | 'bytes';

/** One hit: where and which check. `allowed` when a reviewed allow entry silences it. Never the matched text. */
export interface ScanHit {
  /** The file, relative to plat/, with forward slashes. */
  file: string;
  /** 1-based line; for a column hit, the line of the column's first cell; 0 for a file hit. */
  line: number;
  check: ScanCheck;
  /** A list hit: the line itself or a column of a table (a Markdown table, a JSON table or list, a source list). */
  where?: 'line' | 'column';
  /** A list hit: the deny-list's list id (M-1's number, never a word). */
  list?: number;
  /** Silenced by the allow entry at this index of denylist-allow.json. */
  allowedBy?: number;
}

/** The report written to PLAT_BENCH_OUT (counts, and each hit's location and check). */
export interface ScanReport {
  schema: 'plat.scan-report/1';
  normalisationVersion: number;
  /** The deny-list read: its path relative to plat/ and its digest length; never its salt. */
  list: { file: string; digestHexDigits: number };
  files: { scanned: number; byMode: Record<ReadMode, number> };
  counts: Record<ScanCheck, number> & { hits: number; allowed: number; unreviewed: number };
  /** Allow entries that silenced nothing in this run (stale entries for the reviewer), by index. */
  unusedAllow: number[];
  hits: ScanHit[];
}

/** A stop: the scan cannot run (a missing or unreadable file, a version mismatch). Exit 2, naming the file. */
export class ScanStop extends Error {
  constructor(
    readonly file: string,
    readonly reason: string,
  ) {
    super(`scan stopped: ${file}: ${reason}`);
    this.name = 'ScanStop';
  }
}
