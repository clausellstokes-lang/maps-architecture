// The reviewed allow entries (M0-k-06; §17.1 (5): "a hit fails the build unless an allow entry with a written reason is
// reviewed and added"; C-0101, C-0247). `plat/packages/testkit/baselines/denylist-allow.json` is a JSON array, `[]`
// at M0-k-06's landing and filled by M0-k-07's review: each entry `{ check, text, reason, file? }` — the hit's check,
// its exact text, a written reason, and optionally the one file (relative to plat/) it applies to. An entry silences a
// hit of its check whose content its text gives exactly: a token hit whose one token its text is; a 3-gram run whose
// tokens its text is, in order (N-33: "an allow entry's exact text is the run"); a colour whose six digits its text is
// (`#` or `0x` allowed); a file whose path its text is; a list hit whose listed words all stand in its text. A missing
// file, unreadable JSON or a malformed entry stops the scan naming the file and the entry, never silently drops it.
import { existsSync, readFileSync } from 'node:fs';
import { listWordsOf, tokensOf } from './normalise.js';
import { SCAN_CHECKS, ScanStop, type ScanCheck } from './types.js';

export interface AllowEntry {
  check: ScanCheck;
  text: string;
  reason: string;
  file?: string;
}

/** An allow entry ready to match: its check, file and the normalised content its text gives. */
export interface Allow {
  index: number;
  check: ScanCheck;
  file?: string;
  /** token: the one token; trigram: the tokens joined by U+0020; colour: six lower-case hex digits; file: the path. */
  key: string;
  /** list: the text's candidate words. */
  words: ReadonlySet<string>;
}

const COLOUR_TEXT = /^(?:#|0x)?([0-9A-Fa-f]{6})$/;

/** Checks and prepares the parsed allow file; a malformed entry stops the scan naming `file` and the entry. */
export function allowsFrom(v: unknown, file: string): Allow[] {
  if (!Array.isArray(v)) throw new ScanStop(file, 'not a JSON array of allow entries');
  return v.map((e: unknown, index): Allow => {
    const at = `entry ${index}`;
    if (typeof e !== 'object' || e === null || Array.isArray(e)) throw new ScanStop(file, `${at}: not an object`);
    const o = e as Record<string, unknown>;
    for (const k of Object.keys(o)) if (!['check', 'text', 'reason', 'file'].includes(k)) throw new ScanStop(file, `${at}: unknown member ${k}`);
    const check = o['check'];
    if (typeof check !== 'string' || !(SCAN_CHECKS as readonly string[]).includes(check)) throw new ScanStop(file, `${at}: check is not one of ${SCAN_CHECKS.join(', ')}`);
    const text = o['text'];
    if (typeof text !== 'string' || text.trim() === '') throw new ScanStop(file, `${at}: text is missing or empty`);
    const reason = o['reason'];
    if (typeof reason !== 'string' || reason.trim() === '') throw new ScanStop(file, `${at}: a written reason is required`);
    const f = o['file'];
    if (f !== undefined && (typeof f !== 'string' || f === '')) throw new ScanStop(file, `${at}: file is not a path relative to plat/`);
    const c = check as ScanCheck;
    let key = '';
    let words: ReadonlySet<string> = new Set();
    if (c === 'token') {
      const t = tokensOf(text);
      if (t.length !== 1) throw new ScanStop(file, `${at}: a token entry's text is one token`);
      key = t[0] as string;
    } else if (c === 'trigram') {
      const t = tokensOf(text);
      if (t.length < 5) throw new ScanStop(file, `${at}: a 3-gram entry's text is the run, five or more tokens (N-33)`);
      key = t.join(' ');
    } else if (c === 'colour') {
      const m = COLOUR_TEXT.exec(text.trim());
      if (m === null) throw new ScanStop(file, `${at}: a colour entry's text is six hex digits`);
      key = (m[1] as string).toLowerCase();
    } else if (c === 'file') {
      key = text.trim();
    } else {
      words = new Set(listWordsOf(text));
      if (words.size < 5) throw new ScanStop(file, `${at}: a list entry's text holds five or more words`);
    }
    return { index, check: c, key, words, ...(typeof f === 'string' ? { file: f } : {}) };
  });
}

/** Reads the allow file at `abs`; `file` names it in a stop. */
export function loadAllows(abs: string, file: string): Allow[] {
  if (!existsSync(abs)) throw new ScanStop(file, 'missing file — the allow entries file exists, [] when it holds none (C-0101)');
  let v: unknown;
  try {
    v = JSON.parse(readFileSync(abs, 'utf8'));
  } catch {
    throw new ScanStop(file, 'not readable JSON');
  }
  return allowsFrom(v, file);
}
