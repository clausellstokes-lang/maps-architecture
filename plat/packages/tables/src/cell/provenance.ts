// Honest provenance (§17.1 (6); §7.6; M0-s-02): every cell names where its number came from, in one of §17.1 (6)'s
// forms, and the cell check refuses any other text. Three further forms are the build's own, which M0-work.json's
// items write into tables this check reads (C-0021: M0-f-03a's 'architecture ⟨date⟩ placeholder' laws; M0-b-05a,
// M0-b-05b, M0-c-07a, M0-c-07b: 'M-1 ⟨date⟩'; M0-f-03b: 'M0 spike ⟨date⟩') — admitted here so a hand-over never
// writes a cell its loader refuses (C-0154).

/** Which of the admitted forms a provenance string takes. */
export type ProvenanceForm =
  | 'own'
  | 'owner'
  | 'owner-eye'
  | 'architecture'
  | 'corpus'
  | 'host'
  | 'general'
  | 'sf'
  | 'ref'
  | 'ref-code'
  | 'M-1'
  | 'M0-spike';

/**
 * The references a `ref:` source may name (§17.1 (1)'s captured references, Dwellings among them) — a list of its own,
 * apart from §7.6's `extension.over` words and parity presets (cell.ts), which name what a cell extends or reproduces.
 */
export const REFERENCES: readonly string[] = Object.freeze(['MFCG', 'FTG', 'NG', 'VG', 'FM', 'Dwellings']);

const REF = `(?:${REFERENCES.join('|')})`;
/** A behaviour: one or more words, no parenthesis (a `(code)` suffix belongs to the code form only). */
const BEHAVIOUR = '[^()\\s](?:[^()]*[^()\\s])?';
/** A build: a token starting with a digit (`1.2.2`, `12710731`, `1.6.9`). */
const BUILD = '\\d[\\w.\\-]*';
const DATE = '(\\d{4})-(\\d{2})-(\\d{2})';

const EXACT: ReadonlyMap<string, ProvenanceForm> = new Map<string, ProvenanceForm>([
  ['own', 'own'],
  ['owner', 'owner'],
  ['corpus', 'corpus'],
  ['host', 'host'],
]);

const PATTERNS: readonly (readonly [RegExp, ProvenanceForm])[] = [
  [new RegExp(`^ref:${REF} ${BUILD} ${BEHAVIOUR} \\(code\\),? [PD][1-9]\\d*$`), 'ref-code'],
  [new RegExp(`^ref:${REF}(?: ${BUILD})? ${BEHAVIOUR}$`), 'ref'],
  [/^owner-eye (?:V-)?M[-A-Za-z0-9]*$/, 'owner-eye'],
  [/^general [^\s](?:.*[^\s])?$/, 'general'],
  [/^sf:[^\s@]+@[^\s@]+$/, 'sf'],
];

const DATED: readonly (readonly [RegExp, ProvenanceForm])[] = [
  [new RegExp(`^architecture ${DATE}(?: placeholder)?$`), 'architecture'],
  [new RegExp(`^M-1 ${DATE}$`), 'M-1'],
  [new RegExp(`^M0 spike ${DATE}$`), 'M0-spike'],
];

const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/** Is YYYY-MM-DD a calendar date? */
function calendarDate(y: string, m: string, d: string): boolean {
  const year = Number(y);
  const month = Number(m);
  const day = Number(d);
  if (!(month >= 1 && month <= 12 && day >= 1)) return false;
  const leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const max = month === 2 && leap ? 29 : DAYS[month - 1];
  return day <= max;
}

/** The form a provenance string takes, or null when it is outside §17.1 (6)'s forms (and the build's two). */
export function provenanceForm(p: unknown): ProvenanceForm | null {
  if (typeof p !== 'string') return null;
  const exact = EXACT.get(p);
  if (exact !== undefined) return exact;
  for (const [re, form] of PATTERNS) if (re.test(p)) return form;
  for (const [re, form] of DATED) {
    const m = re.exec(p);
    if (m !== null) return calendarDate(m[1], m[2], m[3]) ? form : null;
  }
  return null;
}
