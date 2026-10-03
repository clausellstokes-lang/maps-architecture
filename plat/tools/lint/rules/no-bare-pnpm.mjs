// plat/no-bare-pnpm (C-0030, C-0093): pnpm runs only as `corepack pnpm …` — never a bare `pnpm`. C-0093's scope:
//   (a) every `scripts` value of a package.json in plat/ outside vendor/ — each command of it (split at `&&`, `||`,
//       `;`, `|` and new lines, its leading VAR=value assignments skipped) whose first word is `pnpm`;
//   (b) in scripts/**/*.mjs and tools/**/*.{mjs,ts}, a `pnpm` command passed to spawn, spawnSync, exec, execSync,
//       execFile or execFileSync — as the file of spawn / execFile, or as the first word of exec's shell command;
//   (c) in the Markdown files outside the records, a line of a fenced code block or an inline code span whose first
//       word (after a `$ ` prompt and VAR=value assignments) is `pnpm`.
// Never scanned or flagged: plat/docs/build/** and plat/CLEAN-ROOM.md (append-only records), a vendored library's own
// files (vendor/<name>@<version>/, third-party bytes the lock pins; C-0127), the lint's own fixtures, a
// `packageManager` field, and prose (`pnpm 10.28`, "pnpm through corepack").
// (b) is this ESLint rule; (a) and (c) are the whole-tree check `no-bare-pnpm` (checkNoBarePnpm below), since ESLint
// parses neither JSON manifests nor Markdown.
import { existsSync, lstatSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { PLAT_ROOT, byCodeUnit, relPath, staticMemberName, stringValue } from './shared.mjs';

const SPAWNERS = new Set(['spawn', 'spawnSync', 'execFile', 'execFileSync']);
const SHELLS = new Set(['exec', 'execSync']);

/** The commands of a shell line: split at &&, ||, ;, | and new lines; each command's words. */
export function commandsOf(line) {
  return line
    .split(/&&|\|\||;|\||\n/)
    .map((c) => c.trim().split(/\s+/).filter((w) => w !== ''))
    .filter((words) => words.length > 0);
}

/** The first word of a command once a `$` prompt and VAR=value assignments are skipped. */
export function commandWord(words) {
  let i = 0;
  if (words[i] === '$') i += 1;
  while (i < words.length && /^[A-Za-z_][A-Za-z0-9_]*=/.test(words[i])) i += 1;
  return words[i] ?? null;
}

/** Does a shell line run a bare pnpm (one of its commands starting with the word `pnpm`)? */
export function runsBarePnpm(line) {
  return commandsOf(line).some((words) => commandWord(words) === 'pnpm');
}

/** (a) The scripts of one package.json text that run a bare pnpm: [{ script, command }]. */
export function scanPackageJson(text) {
  const json = JSON.parse(text);
  const out = [];
  for (const [script, command] of Object.entries(json.scripts ?? {})) {
    if (typeof command === 'string' && runsBarePnpm(command)) out.push({ script, command });
  }
  return out;
}

/**
 * (c) The lines of one Markdown text that hold a bare pnpm command: in a fenced code block (``` or ~~~, indented or
 * not), a line whose command runs pnpm; outside fences, an inline code span whose content's command runs pnpm.
 * Returns [{ line, kind: 'fenced' | 'inline', text }], 1-based lines.
 */
export function scanMarkdown(text) {
  const out = [];
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  let fence = null;
  lines.forEach((raw, i) => {
    const m = /^\s*(`{3,}|~{3,})/.exec(raw);
    if (fence === null && m) {
      fence = m[1];
      return;
    }
    if (fence !== null) {
      if (m && m[1][0] === fence[0] && m[1].length >= fence.length && raw.trim() === m[1]) fence = null;
      else if (runsBarePnpm(raw)) out.push({ line: i + 1, kind: 'fenced', text: raw.trim() });
      return;
    }
    const span = /(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/g;
    let s;
    while ((s = span.exec(raw)) !== null) {
      if (runsBarePnpm(s[2].trim())) {
        out.push({ line: i + 1, kind: 'inline', text: s[2].trim() });
        break;
      }
    }
  });
  return out;
}

/** Is a plat/-relative path a record (never scanned) or a third-party / fixture file outside the rule's scope? */
export function outsideScope(rel) {
  return (
    rel === 'CLEAN-ROOM.md' ||
    rel.startsWith('docs/build/') ||
    /^vendor\/[^/]+@[^/]+\//.test(rel) ||
    rel.startsWith('tools/lint/fixtures/') ||
    rel.split('/').includes('node_modules')
  );
}

/** Every package.json and .md file under root in the rule's scope, plat/-relative, sorted. */
function scopeFiles(root) {
  const out = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir).sort(byCodeUnit)) {
      const abs = join(dir, name);
      const rel = relPath(root, abs);
      const st = lstatSync(abs);
      if (st.isDirectory()) {
        if (name === 'node_modules' || name === 'dist' || name === 'coverage' || outsideScope(`${rel}/`)) continue;
        walk(abs);
      } else if (st.isFile() && (name === 'package.json' || name.endsWith('.md')) && !outsideScope(rel)) {
        out.push(rel);
      }
    }
  };
  if (existsSync(root)) walk(root);
  return out;
}

/** The whole-tree part of the rule, (a) and (c): { ok, problems, scanned }. */
export function checkNoBarePnpm(root = PLAT_ROOT) {
  const problems = [];
  const files = scopeFiles(root);
  for (const rel of files) {
    const text = readFileSync(join(root, ...rel.split('/')), 'utf8');
    if (rel.endsWith('package.json')) {
      for (const p of scanPackageJson(text)) {
        problems.push(`${rel}: scripts.${p.script} runs a bare pnpm (${JSON.stringify(p.command)}); write corepack pnpm (C-0030, C-0093)`);
      }
    } else {
      for (const p of scanMarkdown(text)) {
        problems.push(`${rel}:${p.line}: ${p.kind === 'fenced' ? 'a fenced command line' : 'an inline command'} runs a bare pnpm (${JSON.stringify(p.text)}); write corepack pnpm (C-0030, C-0093)`);
      }
    }
  }
  return { ok: problems.length === 0, problems, scanned: files.length };
}

export const check = { name: 'no-bare-pnpm', run: (root) => checkNoBarePnpm(root) };

/** The command string a spawn / exec call runs, as its first word or shell line, else null. */
function commandOf(name, node) {
  const first = node.arguments[0];
  const value = stringValue(first);
  if (value === null) return null;
  if (SPAWNERS.has(name)) return value.trim();
  return SHELLS.has(name) ? value : null;
}

export default {
  meta: {
    type: 'problem',
    docs: { description: 'pnpm runs only as corepack pnpm (C-0030, C-0093)' },
    schema: [],
    messages: {
      barePnpm: '{{name}} runs a bare pnpm; run `corepack pnpm …` (C-0030, C-0093).',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee;
        if (callee.type === 'MemberExpression' && callee.object.type === 'Literal' && callee.object.regex) return; // /re/.exec(…)
        const name = callee.type === 'Identifier' ? callee.name : staticMemberName(callee);
        if (name === null || (!SPAWNERS.has(name) && !SHELLS.has(name))) return;
        const command = commandOf(name, node);
        if (command === null) return;
        const bare = SPAWNERS.has(name) ? command === 'pnpm' : runsBarePnpm(command);
        if (bare) context.report({ node: node.arguments[0], messageId: 'barePnpm', data: { name } });
      },
    };
  },
};
