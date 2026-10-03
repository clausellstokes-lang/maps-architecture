// The whole-tree check `inline-directives` (C-0128): model code — the five model packages' sources and the digest
// closure beyond them, the files the model rule set lints — silences no rule of the lint but by C-0125 (6)'s vetted
// division. ESLint honours inline configuration (`/* eslint-disable */`, `// eslint-disable-next-line <rules>`,
// `/* eslint <rule>: off */`, `/* global … */`, `/* exported … */`, `/* eslint-env … */`), and one such comment would
// switch the determinism rules off for a file; so in model code the only directive allowed is
//   // eslint-disable-next-line plat/ratio-division -- <the reason>      (or `eslint-disable-line`)
// naming that one rule and carrying its reason after `--`, which the review reads (C-0125 (6)). The directives are the
// ones ESLint itself recognises (SourceCode#getInlineConfigNodes), read with inline configuration off, so no directive
// can hide another from this check; every other plat/ file keeps ESLint's directives (the tree lint's
// reportUnusedDisableDirectives still refuses an unused one everywhere). The closure's `files` are its code files only:
// the JSON data it reaches (C-0005's registries) carries no directive and is not read here (C-0131).
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { Linter } from 'eslint';
import tseslint from 'typescript-eslint';
import { digestClosure } from './digest-closure.mjs';
import { isDirectiveNote } from './paths.mjs';
import { CODE_GLOB, PLAT_ROOT, TS_FILE } from './rules/shared.mjs';

/** The one directive model code may carry: a vetted division, on its own line or the next, with its reason. */
export const ALLOWED_DIRECTIVE = /^eslint-disable-(?:next-)?line\s+plat\/ratio-division\s+-{2,}\s+\S/;

/** A plugin whose one rule records the file's inline-configuration comments into `sink`. */
function collector(sink) {
  return {
    rules: {
      directives: {
        meta: { type: 'problem', schema: [] },
        create(context) {
          return {
            Program() {
              for (const c of context.sourceCode.getInlineConfigNodes()) sink.push(c);
            },
          };
        },
      },
    },
  };
}

/**
 * The inline-configuration comments of one file (plat/-relative), as { line, text, allowed }, or { fatal } when it
 * cannot be parsed.
 */
export function directivesOf(linter, root, rel) {
  const abs = join(root, ...rel.split('/'));
  const code = readFileSync(abs, 'utf8');
  const ts = TS_FILE.test(rel);
  const jsx = rel.endsWith('.tsx') || rel.endsWith('.jsx');
  const sink = [];
  const messages = linter.verify(code, [{
    files: [`**/*.${CODE_GLOB}`],
    languageOptions: ts
      ? { parser: tseslint.parser, parserOptions: { sourceType: 'module', ecmaFeatures: { jsx } } }
      : { ecmaVersion: 'latest', sourceType: rel.endsWith('.cjs') ? 'commonjs' : 'module', parserOptions: { ecmaFeatures: { jsx } } },
    linterOptions: { noInlineConfig: true, reportUnusedDisableDirectives: 'off' },
    plugins: { plat: collector(sink) },
    rules: { 'plat/directives': 'error' },
  }], { filename: abs });
  // A parse failure, or a message without a rule that is not ESLint's note on a directive (a configuration that does
  // not reach the file), fails closed.
  const fatal = messages.find((m) => m.fatal || (m.ruleId === null && !isDirectiveNote(m)));
  if (fatal) return { fatal: `${rel}:${fatal.line ?? 0}: cannot be read (${fatal.message})` };
  return {
    directives: sink.map((c) => {
      const body = c.value.trim();
      return { line: c.loc.start.line, text: c.type === 'Line' ? `// ${body}` : `/* ${body} */`, allowed: ALLOWED_DIRECTIVE.test(body) };
    }),
  };
}

/** The whole-tree check: { ok, problems, counts }. */
export function checkInlineDirectives(root = PLAT_ROOT) {
  const { files } = digestClosure(root);
  const linter = new Linter({ cwd: root });
  const problems = [];
  let directives = 0;
  for (const rel of files) {
    const r = directivesOf(linter, root, rel);
    if (r.fatal) {
      problems.push(r.fatal);
      continue;
    }
    for (const d of r.directives) {
      directives += 1;
      if (!d.allowed) {
        problems.push(`${rel}:${d.line}: the inline directive ${JSON.stringify(d.text)} is not allowed in model code — only "eslint-disable-next-line plat/ratio-division -- <reason>" (or -line), a vetted division (C-0125 (6), C-0128)`);
      }
    }
  }
  return { ok: problems.length === 0, problems, counts: { files: files.length, directives } };
}

export const check = {
  name: 'inline-directives',
  run(root) {
    return checkInlineDirectives(resolve(root));
  },
};
