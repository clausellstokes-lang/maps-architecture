// M0-k-06's test support: a synthetic deny-list built by the test with its OWN salt and normalisationVersion 1
// (C-0101: "tested entirely on a synthetic deny-list the test builds with its own salt"), its digests computed here
// with node:crypto directly — never through the scanner's own digest code — and fixture trees under the OS temporary
// folder (never inside plat/: baselines/README.md). Every planted word is invented.
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

/** The test's own salt (never the list's, never attachment C's KAT salt): bytes a0, a1, …, bf. */
export const TEST_SALT = Uint8Array.from({ length: 32 }, (_, i) => 0xa0 + i);
export const TEST_SALT_HEX = Buffer.from(TEST_SALT).toString('hex');

/** SHA-256(salt ‖ item) cut to `digits` hex digits, computed independently of the scanner. */
export function dig(item: string | Uint8Array, digits = 16, salt: Uint8Array = TEST_SALT): string {
  const h = createHash('sha256');
  h.update(salt);
  h.update(typeof item === 'string' ? Buffer.from(item, 'utf8') : item);
  return h.digest('hex').slice(0, digits);
}

export interface ListSpec {
  tokens?: string[];
  /** 3-gram items, three tokens joined by one space. */
  trigrams?: string[];
  /** six lower-case hex digits */
  colours?: string[];
  files?: (string | Uint8Array)[];
  lists?: { id: number; words: string[] }[];
  spell?: string[];
}

const sorted = (a: string[]): string[] => [...new Set(a)].sort();

/** A synthetic `plat.denylist/1` object (attachment C's form) over the items given. */
export function syntheticList(s: ListSpec, over: Record<string, unknown> = {}): Record<string, unknown> {
  const tokens = sorted((s.tokens ?? []).map((t) => dig(t)));
  const trigrams = sorted((s.trigrams ?? []).map((t) => dig(t)));
  const colours = sorted((s.colours ?? []).map((t) => dig(t)));
  const files = sorted((s.files ?? []).map((t) => dig(t)));
  const spell = sorted((s.spell ?? []).map((t) => dig(t)));
  const lists = (s.lists ?? []).map((l) => ({ id: l.id, words: sorted(l.words.map((w) => dig(w))) }));
  return {
    schema: 'plat.denylist/1',
    normalisationVersion: 1,
    digestHexDigits: 16,
    date: '2026-10-06T12:00:00Z',
    corpusCut: '2026-10-06T11:00:00Z',
    salt: TEST_SALT_HEX,
    counts: { tokens: tokens.length, trigrams: trigrams.length, colours: colours.length, files: files.length, lists: lists.length, spell: spell.length },
    tokens,
    trigrams,
    colours,
    files,
    lists,
    spell,
    ...over,
  };
}

const temps: string[] = [];
export function cleanTemps(): void {
  for (const t of temps.splice(0)) rmSync(t, { recursive: true, force: true });
}

/** A fixture tree of plat/'s shape under the OS temporary folder: files by path; the list and the allow file ([] by default, none when null). */
export function tree(files: Record<string, string | Uint8Array>, list?: Record<string, unknown> | string, allow: unknown = []): string {
  const root = mkdtempSync(join(tmpdir(), 'plat-k06-scan-'));
  temps.push(root);
  const put = (rel: string, body: string | Uint8Array): void => {
    mkdirSync(dirname(join(root, rel)), { recursive: true });
    writeFileSync(join(root, rel), body);
  };
  for (const [rel, body] of Object.entries(files)) put(rel, body);
  if (list !== undefined) put('packages/testkit/baselines/denylist.json', typeof list === 'string' ? list : JSON.stringify(list));
  if (allow !== null) put('packages/testkit/baselines/denylist-allow.json', JSON.stringify(allow));
  return root;
}
