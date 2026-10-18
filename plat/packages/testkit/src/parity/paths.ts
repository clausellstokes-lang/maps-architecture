// The input-path rule of the two CLIs (M0-k-05; §17.1 (3), C-0067, §13.5: the parity CLI "never opens captures/,
// research/ or reference/"): a path names a file inside plat/ — lexically and, when it exists, with its symbolic links
// resolved — or the CLI refuses it before opening anything.
import { existsSync, realpathSync } from 'node:fs';
import { isAbsolute, relative, resolve, sep } from 'node:path';

/** The path resolved against plat/ (an absolute path stays as it is). */
export function resolveInPlat(platRoot: string, p: string): string {
  return isAbsolute(p) ? resolve(p) : resolve(platRoot, p);
}

const within = (root: string, p: string): boolean => p === root || p.startsWith(root.endsWith(sep) ? root : root + sep);

/** Does the path lie inside plat/ (lexically, and through its links when it exists)? */
export function insidePlat(platRoot: string, p: string): boolean {
  const root = resolve(platRoot);
  const abs = resolveInPlat(root, p);
  if (!within(root, abs)) return false;
  if (!existsSync(abs)) return true;
  const realRoot = realpathSync(root);
  return within(realRoot, realpathSync(abs));
}

/** The path relative to plat/, with forward slashes (a crossing record's `file`, C-0120). */
export function platRelative(platRoot: string, p: string): string {
  return relative(resolve(platRoot), resolveInPlat(platRoot, p)).split(sep).join('/');
}
