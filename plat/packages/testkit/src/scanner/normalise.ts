// Normalisation 1 of the clean-room content scan (M0-k-06; §17.1 (5); C-0101; attachment C of
// `docs/build/checks/M0-handoff-M1.md`, which pins it to code-point classes): NFKD, then every code point of Unicode
// general category M removed, then Unicode default lower-casing. A token is a maximal run of code points of general
// categories L and N; anything else — the underscore included — separates tokens. A list word (N-35) is a maximal run
// of category-L code points, four or more long, taken from the normalised text itself, so a letter run that a digit
// bounds inside a token is still a candidate. A colour candidate (N-34) is `#` or `0x` (lower-case x) followed by
// exactly six hex digits in either case and then a non-hex character or the text's end; its item is the six digits
// lower-cased, without the prefix.

/** The scanner's normalisation version (C-0101); a deny-list carrying another is refused naming both. */
export const NORMALISATION_VERSION = 1;

/** The shortest list word, in code points (§17.1 (5): "words of four or more letters"). */
export const LIST_WORD_MIN = 4;

const MARKS = /\p{M}/gu;
const TOKEN = /[\p{L}\p{N}]+/gu;
const LETTERS = /\p{L}+/gu;
const COLOUR = /(?:#|0x)([0-9A-Fa-f]{6})(?![0-9A-Fa-f])/g;

/** Normalisation 1 of a text: NFKD, category M removed, default lower-casing. */
export function normalise(text: string): string {
  return text.normalize('NFKD').replace(MARKS, '').toLowerCase();
}

/** The tokens of a text under normalisation 1, in order. */
export function tokensOf(text: string): string[] {
  return normalise(text).match(TOKEN) ?? [];
}

/** The tokens of an already normalised text. */
export function tokensOfNormalised(norm: string): string[] {
  return norm.match(TOKEN) ?? [];
}

/** The list-word candidates of an already normalised text: category-L runs of four or more code points (N-35). */
export function listWordsOfNormalised(norm: string): string[] {
  const out: string[] = [];
  for (const m of norm.matchAll(LETTERS)) if ([...m[0]].length >= LIST_WORD_MIN) out.push(m[0]);
  return out;
}

/** The list-word candidates of a text (normalised first). */
export function listWordsOf(text: string): string[] {
  return listWordsOfNormalised(normalise(text));
}

/** The 3-gram item of three consecutive tokens: joined by one U+0020 (attachment C). */
export function trigramItem(a: string, b: string, c: string): string {
  return `${a} ${b} ${c}`;
}

/** The colour items of a RAW text (before normalisation; `0X` is not a prefix): six lower-case hex digits each (N-34). */
export function coloursOf(raw: string): string[] {
  const out: string[] = [];
  for (const m of raw.matchAll(COLOUR)) out.push((m[1] as string).toLowerCase());
  return out;
}
