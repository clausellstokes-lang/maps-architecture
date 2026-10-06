// The content scan (M0-k-06; §17.1 (5); C-0101; N-23, N-26, N-33 – N-36; C-0247): every file in scope is digested
// whole for the file check, and its texts — by its read mode (scope.ts) — for the token, 3-gram, colour and list checks,
// each item as SHA-256(salt ‖ item) cut to the list's digest length.
//   * token: a token whose digest is in `tokens` and not in `spell` (the spell-check exclusion, §17.1 (5));
//   * 3-gram (N-33): 3-grams at every token position of one text (overlapping); a hit is a run of three or more
//     adjacent listed positions — five or more tokens in a row whose every window of three is listed — reported once;
//     a lone listed 3-gram or two adjacent ones is no hit; no run crosses a line break or (in the crossing files) two
//     strings;
//   * colour (N-34): a `#rrggbb` or `0xrrggbb` candidate whose six digits, lower-cased, are listed;
//   * file: the file's bytes as stored;
//   * list (N-35): a line, or a column of a table, holding five or more distinct candidate words of one list's set.
// A hit is silenced only by a reviewed allow entry (allow.ts). The report names the file and line of each hit and its
// check, never the matched content.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Allow } from './allow.js';
import type { DenyList } from './denylist.js';
import { readJson } from './json.js';
import { readSource } from './lexer.js';
import { coloursOf, listWordsOfNormalised, NORMALISATION_VERSION, normalise, tokensOfNormalised, trigramItem } from './normalise.js';
import { scanFiles } from './scope.js';
import { ScanStop, type ReadMode, type ScanCheck, type ScanHit, type ScanReport } from './types.js';

/** A list hit needs this many distinct words of one list's set (§17.1 (5)). */
export const LIST_HIT_WORDS = 5;
/** A 3-gram hit needs this many adjacent listed 3-grams (N-33; §17.1 (2) (iii)). */
export const TRIGRAM_RUN = 3;
/** A column needs this many cells (§17.1 (2) (vi): "one field's string values across three or more records"). */
export const COLUMN_CELLS = 3;

/** One file's texts, ready to check: per line its texts (each a chain of tokens), its colour texts, its columns. */
export interface FileTexts {
  /** line → the texts on it; no 3-gram spans two texts. */
  lines: Map<number, string[]>;
  /** line → raw texts searched for colour candidates. */
  colours: Map<number, string[]>;
  columns: { line: number; cells: string[] }[];
}

interface Found {
  hit: ScanHit;
  /** What an allow entry matches: never reported. */
  key: string;
  words?: readonly string[];
}

const push = (m: Map<number, string[]>, line: number, text: string): void => {
  const a = m.get(line);
  if (a === undefined) m.set(line, [text]);
  else a.push(text);
};

/** Splits a text into lines; `\r\n`, `\r` and `\n` each end a line. */
export function splitLines(text: string): string[] {
  return text.split(/\r\n|\r|\n/);
}

const SEPARATOR_ROW = /^\s*\|?(?:\s*:?-+:?\s*\|)+\s*:?-*:?\s*$/;

/** The columns of the Markdown tables of a text: every run of lines starting with `|`, cells split at unescaped pipes. */
export function markdownColumns(lines: readonly string[]): { line: number; cells: string[] }[] {
  const out: { line: number; cells: string[] }[] = [];
  let i = 0;
  while (i < lines.length) {
    if (!(lines[i] as string).trimStart().startsWith('|')) {
      i += 1;
      continue;
    }
    const start = i;
    const cols: { line: number; cells: string[] }[] = [];
    while (i < lines.length && (lines[i] as string).trimStart().startsWith('|')) {
      const row = lines[i] as string;
      if (!SEPARATOR_ROW.test(row)) {
        const cells = row
          .trim()
          .replace(/^\|/, '')
          .replace(/(?<!\\)\|$/, '')
          .split(/(?<!\\)\|/);
        cells.forEach((c, j) => {
          const col = cols[j] ?? (cols[j] = { line: i + 1, cells: [] });
          col.cells.push(c);
        });
      }
      i += 1;
    }
    if (i - start > 1) out.push(...cols.filter((c) => c !== undefined));
  }
  return out;
}

/** A file's texts by its read mode; null when the file has no text to read (bytes only, or not UTF-8 text). */
export function fileTexts(rel: string, mode: ReadMode, bytes: Uint8Array): FileTexts | null {
  if (mode === 'bytes') return null;
  let text: string;
  try {
    text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
  if (text.includes('\u0000')) return null;
  const lines = new Map<number, string[]>();
  const colours = new Map<number, string[]>();
  const whole = (): FileTexts => {
    const ls = splitLines(text);
    ls.forEach((l, k) => {
      if (l.trim() === '') return;
      push(lines, k + 1, l);
      push(colours, k + 1, l);
    });
    let columns: { line: number; cells: string[] }[] = [];
    if (rel.endsWith('.json')) columns = readJson(text)?.columns ?? [];
    else if (rel.endsWith('.md')) columns = markdownColumns(ls);
    return { lines, colours, columns };
  };
  if (mode === 'whole') return whole();
  if (mode === 'strings') {
    const j = readJson(text);
    if (j === null) return whole(); // not JSON: read whole, never skipped
    for (const s of j.strings) {
      push(lines, s.line, s.text);
      push(colours, s.line, s.text);
    }
    return { lines, colours, columns: j.columns };
  }
  // source: literals and comments for the tokens, 3-grams and lists; the whole text for colours (C-0247)
  const src = readSource(text);
  for (const l of src.lines) push(lines, l.line, l.text);
  splitLines(text).forEach((l, k) => {
    if (l.includes('#') || l.includes('0x')) push(colours, k + 1, l);
  });
  return { lines, colours, columns: src.columns };
}

/** Checks one file's texts against the list; returns its hits with their match keys. */
export function checkTexts(rel: string, t: FileTexts, list: DenyList): Found[] {
  const out: Found[] = [];
  const seen = new Set<string>();
  const add = (line: number, check: ScanCheck, key: string, extra: Partial<ScanHit> = {}, words?: readonly string[]): void => {
    const id = `${line}\u0000${check}\u0000${String(extra.list ?? '')}\u0000${extra.where ?? ''}\u0000${key}`;
    if (seen.has(id)) return;
    seen.add(id);
    out.push({ hit: { file: rel, line, check, ...extra }, key, ...(words === undefined ? {} : { words }) });
  };
  const dg = list.digester;
  const listCheck = (line: number, where: 'line' | 'column', words: Iterable<string>): void => {
    const byList = new Map<number, string[]>();
    for (const w of new Set(words)) {
      const ids = list.listWords.get(dg.text(w));
      if (ids === undefined) continue;
      for (const id of new Set(ids)) {
        const a = byList.get(id);
        if (a === undefined) byList.set(id, [w]);
        else a.push(w);
      }
    }
    const ids = [...byList.keys()].sort((a, b) => a - b);
    for (const id of ids) {
      const ws = byList.get(id) as string[];
      if (ws.length >= LIST_HIT_WORDS) add(line, 'list', [...ws].sort().join(' '), { where, list: id }, ws);
    }
  };
  const lineNums = [...t.lines.keys()].sort((a, b) => a - b);
  for (const line of lineNums) {
    const words: string[] = [];
    for (const raw of t.lines.get(line) as string[]) {
      for (const part of raw.split('\n')) {
        const norm = normalise(part);
        const toks = tokensOfNormalised(norm);
        for (const w of listWordsOfNormalised(norm)) words.push(w);
        const listed: boolean[] = [];
        for (const tok of toks) {
          const d = dg.text(tok);
          if (list.tokens.has(d) && !list.spell.has(d)) add(line, 'token', tok);
        }
        for (let p = 0; p + 2 < toks.length; p += 1) listed.push(list.trigrams.has(dg.text(trigramItem(toks[p] as string, toks[p + 1] as string, toks[p + 2] as string))));
        let p = 0;
        while (p < listed.length) {
          if (!listed[p]) {
            p += 1;
            continue;
          }
          let q = p;
          while (q < listed.length && listed[q]) q += 1;
          if (q - p >= TRIGRAM_RUN) add(line, 'trigram', toks.slice(p, q + 2).join(' '));
          p = q;
        }
      }
    }
    listCheck(line, 'line', words);
  }
  const colourLines = [...t.colours.keys()].sort((a, b) => a - b);
  for (const line of colourLines) {
    for (const raw of t.colours.get(line) as string[]) {
      for (const c of coloursOf(raw)) if (list.colours.has(dg.text(c))) add(line, 'colour', c);
    }
  }
  for (const col of t.columns) {
    if (col.cells.length < COLUMN_CELLS) continue;
    listCheck(col.line, 'column', col.cells.flatMap((c) => listWordsOfNormalised(normalise(c))));
  }
  return out;
}

/** Does an allow entry silence this hit? */
export function allows(a: Allow, f: Found): boolean {
  if (a.check !== f.hit.check) return false;
  if (a.file !== undefined && a.file !== f.hit.file) return false;
  if (a.check === 'list') return (f.words ?? []).every((w) => a.words.has(w));
  return a.key === f.key;
}

export interface ScanOptions {
  /** plat/ (or a test's tree of the same shape). */
  root: string;
  list: DenyList;
  allows: readonly Allow[];
  /** Files never scanned, relative to root: the deny-list and the allow file. */
  skip: ReadonlySet<string>;
  /** The deny-list's path relative to root, for the report. */
  listFile: string;
}

/** Scans the tree; a tree with no file to scan stops (never a vacuous pass, §13.8 Edges). */
export function scanTree(o: ScanOptions): ScanReport {
  const files = scanFiles(o.root, o.skip);
  if (files.length === 0) throw new ScanStop(o.root, 'no file to scan — a scan of nothing never passes (§13.8 Edges)');
  const byMode: Record<ReadMode, number> = { whole: 0, source: 0, strings: 0, bytes: 0 };
  const found: Found[] = [];
  for (const { rel, mode } of files) {
    const bytes = readFileSync(join(o.root, rel));
    if (o.list.files.has(o.list.digester.bytes(bytes))) found.push({ hit: { file: rel, line: 0, check: 'file' }, key: rel });
    const t = fileTexts(rel, mode, bytes);
    byMode[t === null ? 'bytes' : mode] += 1;
    if (t !== null) found.push(...checkTexts(rel, t, o.list));
  }
  const used = new Set<number>();
  const counts = { token: 0, trigram: 0, colour: 0, file: 0, list: 0, hits: 0, allowed: 0, unreviewed: 0 };
  const hits: ScanHit[] = [];
  for (const f of found) {
    const a = o.allows.find((x) => allows(x, f));
    counts[f.hit.check] += 1;
    counts.hits += 1;
    if (a !== undefined) {
      used.add(a.index);
      counts.allowed += 1;
      hits.push({ ...f.hit, allowedBy: a.index });
    } else {
      counts.unreviewed += 1;
      hits.push(f.hit);
    }
  }
  return {
    schema: 'plat.scan-report/1',
    normalisationVersion: NORMALISATION_VERSION,
    list: { file: o.listFile, digestHexDigits: o.list.digestHexDigits },
    files: { scanned: files.length, byMode },
    counts,
    unusedAllow: o.allows.map((a) => a.index).filter((k) => !used.has(k)),
    hits,
  };
}
