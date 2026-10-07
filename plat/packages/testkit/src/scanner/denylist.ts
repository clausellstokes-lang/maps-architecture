// Reading the deny-list (M0-k-06; §17.1 (5); C-0101; N-23, N-36; attachment C, format `plat.denylist/1`): one load per
// run, every class kept as a digest-keyed set. The scan never passes vacuously: a missing file, unreadable JSON, a
// `normalisationVersion` that is not the scanner's (naming both versions), a `digestHexDigits` that is not 16 (naming
// the field and its value) or a file that fails attachment C's form (M0-k-05's `denylistProblems`, the same C1 that
// `baselines:check` applies) stops the scan, naming the file.
import { existsSync, readFileSync } from 'node:fs';
import { denylistProblems } from '../parity/denylist.js';
import { Digester, saltBytes } from './digest.js';
import { NORMALISATION_VERSION } from './normalise.js';
import { ScanStop } from './types.js';

/** The digest length M-1's list carries (N-23); any other value stops the scan. */
export const DIGEST_HEX_DIGITS = 16;

/** A loaded deny-list: the digester bound to its salt, and one set per class. */
export interface DenyList {
  /** The path as given (relative to plat/ in the report). */
  file: string;
  normalisationVersion: number;
  digestHexDigits: number;
  digester: Digester;
  tokens: ReadonlySet<string>;
  trigrams: ReadonlySet<string>;
  colours: ReadonlySet<string>;
  files: ReadonlySet<string>;
  spell: ReadonlySet<string>;
  /** Each list word's digest → the ids of the lists holding it. */
  listWords: ReadonlyMap<string, readonly number[]>;
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const show = (v: unknown): string => (v === undefined ? 'absent' : JSON.stringify(v)?.slice(0, 40) ?? String(v));

/** Builds the sets of a parsed deny-list, refusing it (ScanStop, naming `file`) by the rules above. */
export function denyListFrom(v: unknown, file: string): DenyList {
  if (!isObj(v)) throw new ScanStop(file, 'not a deny-list object (attachment C)');
  const version = v['normalisationVersion'];
  if (version !== NORMALISATION_VERSION) {
    throw new ScanStop(file, `normalisationVersion ${show(version)} is not the scanner's normalisationVersion ${NORMALISATION_VERSION} (C-0101)`);
  }
  const digits = v['digestHexDigits'];
  if (digits !== DIGEST_HEX_DIGITS) {
    throw new ScanStop(file, `digestHexDigits ${show(digits)} is not ${DIGEST_HEX_DIGITS} (N-23)`);
  }
  const { problems } = denylistProblems(v);
  if (problems.length > 0) {
    const more = problems.length > 1 ? ` (and ${problems.length - 1} more)` : '';
    throw new ScanStop(file, `not a plat.denylist/1 file: ${problems[0] as string}${more}`);
  }
  const salt = saltBytes(v['salt'] as string);
  if (salt === null) throw new ScanStop(file, 'salt: not 64 lower-case hex digits');
  const set = (k: string): Set<string> => new Set(v[k] as string[]);
  const listWords = new Map<string, number[]>();
  for (const l of v['lists'] as { id: number; words: string[] }[]) {
    for (const w of l.words) {
      const ids = listWords.get(w);
      if (ids === undefined) listWords.set(w, [l.id]);
      else ids.push(l.id);
    }
  }
  return {
    file,
    normalisationVersion: version,
    digestHexDigits: digits,
    digester: new Digester(salt, digits),
    tokens: set('tokens'),
    trigrams: set('trigrams'),
    colours: set('colours'),
    files: set('files'),
    spell: set('spell'),
    listWords,
  };
}

/** Reads and loads the deny-list at `abs`; `file` names it in a stop. */
export function loadDenyList(abs: string, file: string): DenyList {
  if (!existsSync(abs)) throw new ScanStop(file, 'missing file — the scan never passes without its deny-list (C-0101)');
  let v: unknown;
  try {
    v = JSON.parse(readFileSync(abs, 'utf8'));
  } catch {
    throw new ScanStop(file, 'not readable JSON');
  }
  return denyListFrom(v, file);
}
