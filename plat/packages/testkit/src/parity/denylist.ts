// The `denylist.json` kind of `baselines:check` (M0-k-05; N-22; attachment C of `checks/M0-handoff-M1.md`, format
// `plat.denylist/1` at `normalisationVersion: 1`): C1 by attachment C's patterns — the constant schema, ISO 8601 `date`
// and `corpusCut`, a 64-hex `salt`, every digest exactly `digestHexDigits` lower-case hex digits, each digest array
// sorted ascending with no repeat — refusing any other member, naming the field. The list's normalisation and digests
// are M0-k-06's scanner's to apply; this check reads only the file's form.
import { DATE_TIME_RE } from './patterns.js';

export const DENYLIST_SCHEMA = 'plat.denylist/1';
const TOP = ['schema', 'normalisationVersion', 'digestHexDigits', 'date', 'corpusCut', 'salt', 'counts', 'tokens', 'trigrams', 'colours', 'files', 'lists', 'spell'];
const ARRAYS = ['tokens', 'trigrams', 'colours', 'files', 'spell'];

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Checks one digest array: each exactly `d` lower-case hex digits, ascending, no repeat; the first fault named. */
function digestArray(v: unknown, d: number, at: string, out: string[]): number {
  if (!Array.isArray(v)) {
    out.push(`${at}: not a list`);
    return 0;
  }
  const re = new RegExp(`^[0-9a-f]{${d}}$`);
  for (let i = 0; i < v.length; i += 1) {
    const x = v[i];
    if (typeof x !== 'string' || !re.test(x)) {
      out.push(`${at}[${i}]: not a digest of ${d} lower-case hex digits`);
      return v.length;
    }
    if (i > 0 && !((v[i - 1] as string) < x)) {
      out.push(`${at}[${i}]: ${(v[i - 1] as string) === x ? 'repeats the digest before it' : 'out of ascending order'}`);
      return v.length;
    }
  }
  return v.length;
}

/** The refusals of a parsed `denylist.json` (attachment C), and its digest count (the crossing record's `rows`). */
export function denylistProblems(v: unknown): { problems: string[]; digests: number } {
  const out: string[] = [];
  if (!isObj(v)) return { problems: ['top: not an object'], digests: 0 };
  for (const m of TOP) if (!(m in v)) out.push(`top: ${m} missing`);
  for (const m of Object.keys(v)) if (!TOP.includes(m)) out.push(`top: unknown member ${m}`);
  if ('schema' in v && v['schema'] !== DENYLIST_SCHEMA) out.push(`schema: not ${DENYLIST_SCHEMA}`);
  if ('normalisationVersion' in v && v['normalisationVersion'] !== 1) out.push('normalisationVersion: not 1');
  const d = v['digestHexDigits'];
  const digits = Number.isInteger(d) && (d as number) >= 8 && (d as number) <= 64 ? (d as number) : null;
  if ('digestHexDigits' in v && digits === null) out.push('digestHexDigits: not an integer from 8 to 64');
  for (const f of ['date', 'corpusCut']) if (f in v && (typeof v[f] !== 'string' || !DATE_TIME_RE.test(v[f] as string))) out.push(`${f}: not an ISO 8601 date-time`);
  if ('salt' in v && (typeof v['salt'] !== 'string' || !/^[0-9a-f]{64}$/.test(v['salt']))) out.push('salt: not 64 lower-case hex digits');
  const counts = v['counts'];
  if ('counts' in v) {
    if (!isObj(counts)) out.push('counts: not an object');
    else
      for (const [k, c] of Object.entries(counts)) {
        if (!/^[A-Za-z][A-Za-z0-9]{0,40}$/.test(k)) out.push(`counts: key ${JSON.stringify(k.slice(0, 40))} outside its pattern`);
        if (!(Number.isInteger(c) && (c as number) >= 0)) out.push(`counts.${k}: not a count`);
      }
  }
  let digests = 0;
  if (digits !== null) {
    for (const f of ARRAYS) if (f in v) digests += digestArray(v[f], digits, f, out);
    const lists = v['lists'];
    if ('lists' in v) {
      if (!Array.isArray(lists)) out.push('lists: not a list');
      else {
        const ids = new Set<number>();
        lists.forEach((l, i) => {
          const at = `lists[${i}]`;
          if (!isObj(l)) {
            out.push(`${at}: not an object`);
            return;
          }
          for (const m of ['id', 'words']) if (!(m in l)) out.push(`${at}: ${m} missing`);
          for (const m of Object.keys(l)) if (m !== 'id' && m !== 'words') out.push(`${at}: unknown member ${m}`);
          if (!Number.isSafeInteger(l['id'])) out.push(`${at}: id is not an integer`);
          else if (ids.has(l['id'] as number)) out.push(`${at}: id repeats an earlier list`);
          else ids.add(l['id'] as number);
          if ('words' in l) digests += digestArray(l['words'], digits, `${at}.words`, out);
        });
      }
    }
  }
  return { problems: out, digests };
}
