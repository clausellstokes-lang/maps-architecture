// What the content scan reads, and how (M0-k-06; §17.1 (5); N-26; C-0247). Every file under plat/ outside build
// output and installed packages is digested whole for the file check; its content is read by its place:
//   * `packages/tables/data/`, `docs/digest/` and `assets/` — the whole text (every token, §17.1 (5)), a file that is
//     not UTF-8 text by its bytes only;
//   * `packages/testkit/baselines/*.json` — the crossing files, by their string values and keys only (N-26);
//   * TypeScript and JavaScript under `packages/`, `bench/`, `tools/`, `scripts/` and plat/'s own root — their string
//     literals and comments (and, for the colour check, their whole text, C-0247);
//   * JSON there — its string values and keys (a JSON file's literals);
//   * everything else (vendor/'s third-party code, the build records under docs/, Markdown, lock files) — bytes only.
// The deny-list itself and the allow file are never scanned (the allow file holds the allowed texts by design). The
// walk never follows a symbolic link (§17.1 (3)) and visits entries in code-unit order, so a report is reproducible.
import { lstatSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { ReadMode } from './types.js';

/** Folders never entered, at any depth: installed packages and build or test output. */
export const SKIP_DIRS: ReadonlySet<string> = new Set(['node_modules', 'dist', 'coverage', '.git']);

/** The deny-list's and the allow file's places, relative to plat/ (§17.1 (5); C-0101). */
export const DENYLIST_FILE = 'packages/testkit/baselines/denylist.json';
export const ALLOW_FILE = 'packages/testkit/baselines/denylist-allow.json';

const SOURCE_EXT = /\.(?:ts|tsx|mts|cts|js|mjs|cjs)$/;
const SOURCE_ROOTS = ['packages/', 'bench/', 'tools/', 'scripts/'];

/** How a file (path relative to plat/, forward slashes) is read. */
export function readModeOf(rel: string): ReadMode {
  if (rel.startsWith('packages/tables/data/') || rel.startsWith('docs/digest/') || rel.startsWith('assets/')) return 'whole';
  if (/^packages\/testkit\/baselines\/[^/]+\.json$/.test(rel)) return 'strings';
  if (rel.startsWith('vendor/') || rel.startsWith('docs/')) return 'bytes';
  const inSources = SOURCE_ROOTS.some((r) => rel.startsWith(r)) || !rel.includes('/');
  if (inSources && SOURCE_EXT.test(rel)) return 'source';
  if (inSources && rel.endsWith('.json')) return 'strings';
  return 'bytes';
}

/** Every file to scan under `root`, relative and sorted, with its read mode; `skip` names files never scanned. */
export function scanFiles(root: string, skip: ReadonlySet<string>): { rel: string; mode: ReadMode }[] {
  const out: { rel: string; mode: ReadMode }[] = [];
  const walk = (dir: string, prefix: string): void => {
    const names = readdirSync(dir).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    for (const name of names) {
      const abs = join(dir, name);
      const rel = prefix + name;
      const st = lstatSync(abs);
      if (st.isSymbolicLink()) continue;
      if (st.isDirectory()) {
        if (!SKIP_DIRS.has(name)) walk(abs, `${rel}/`);
        continue;
      }
      if (!st.isFile() || name.endsWith('.tsbuildinfo') || skip.has(rel)) continue;
      out.push({ rel, mode: readModeOf(rel) });
    }
  };
  walk(root, '');
  return out;
}
