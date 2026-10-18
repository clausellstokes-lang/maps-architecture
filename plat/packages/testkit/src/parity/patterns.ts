// The string patterns the crossing files are read by (M0-k-05; §17.1 (4)'s `plat baselines check` in its M0 form,
// C-0092 (2); the hand-off's attachments B and C and rows N-22, N-24, N-32 of `checks/M0-spec-notes.md`; C-0180 (12)).

/** `id`, `metric`, `supersedes` and the other id-like strings (N-24: upper case admitted, matched case-sensitively). */
export const ID_RE = /^[A-Za-z0-9.:/@+_-]{1,120}$/;
/** A reference build (attachment B's `referenceBuild`). */
export const BUILD_RE = /^[A-Za-z0-9._:+-]{1,64}$/;
/** A research-side path as an opaque label (§17.1 (4) C5; attachment B's `capture` form). */
export const RESEARCH_LABEL_RE = /^research:[a-z0-9_./-]{1,160}$/;
/** A capture folder stamp (attachment B's `capture`). */
export const CAPTURE_STAMP_RE = /^\d{4}-\d{2}-\d{2}T[\d-]{8}$/;
/** A calendar date or an ISO 8601 date-time. */
export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
export const DATE_TIME_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?(?:Z|[+-]\d{2}:\d{2})?$/;
/** A version `1.0.0`. */
export const SEMVER_RE = /^\d+\.\d+\.\d+$/;
/** A note (N-32): at most 200 characters of letters, digits, spaces and `.,;:()-/%±≤≥×`. */
export const NOTE_RE = /^[\p{L}\p{N} .,;:()\-/%±≤≥×]{0,200}$/u;
/** A crossing record's statement: the note's characters, at most 400 (C-0180 (13)). */
export const STATEMENT_RE = /^[\p{L}\p{N} .,;:()\-/%±≤≥×]{1,400}$/u;
/** A colour (N-22): a run of exactly six hex digits bounded by non-hex characters or the string's ends. */
export const COLOUR_RE = /(?<![0-9A-Fa-f])[0-9A-Fa-f]{6}(?![0-9A-Fa-f])/;
/** A salted corpus id (§17.1 (4) C6): the corpus kind and a hex digest of 16 to 64 digits. */
export const CORPUS_ID_RE = /^corpus:(?:frame|map):[0-9a-f]{16,64}$/;
/** A bare salted digest. */
export const DIGEST_RE = /^[0-9a-f]{16,64}$/;
/** A CLEAN-ROOM.md ledger row id (the countersigner's, C-0120). */
export const LEDGER_ID_RE = /^L-\d{4,}$/;
/** A lower-case SHA-256. */
export const SHA256_RE = /^[0-9a-f]{64}$/;

/** Our preset keys (§7.6, §4.4; §13.5's `PresetArm` and the layout presets): the only corpus-row strings C7 admits. */
export const PRESET_KEYS: readonly string[] = Object.freeze(['default', 'MFCG', 'FTG', 'VG', 'FM', 'NG', 'ringed', 'american']);

/**
 * A string that looks like a path into a research-side tree or a file (§17.1 (4) C5: research-side paths only as
 * opaque `research:` labels): a leading research-side folder, an absolute, home or dot path, a backslash, a drive
 * letter, or a file extension — unless it is a `research:` label.
 */
export function looksLikePath(s: string): boolean {
  if (s.startsWith('research:')) return false;
  return (
    /^(?:research|captures|reference|partitioned|profiler|docs|plat)\//.test(s) ||
    /^[/~]/.test(s) ||
    /^\.\.?\//.test(s) ||
    s.includes('\\') ||
    /^[A-Za-z]:\//.test(s) ||
    /\.(?:py|md|json|jsonl|js|mjs|cjs|ts|csv|tsv|txt|html|png|jpe?g|svg|pdf|xlsx)$/i.test(s)
  );
}
