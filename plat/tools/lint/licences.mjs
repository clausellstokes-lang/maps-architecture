// The licence check of §17.4 in the PR-tier lint: the allowlist (MIT, ISC, BSD-2 / 3, Apache-2.0, BSL-1.0, CC0,
// Unlicense, OFL; closure.mjs's `ALLOWED`) over the transitive production closure of the shipped packages, and every dev-only dependency
// outside it a listed exception with its reason (tools/notices/dev-exceptions.json). It wraps the scaffold's
// tools/notices/closure.mjs (C-0058), which the notices generator shares, so the lint and THIRD-PARTY-NOTICES.txt read
// one closure. A production package outside the allowlist fails; so does an unlisted dev exception (§17.4: "listed
// exceptions, each with its reason").
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { checkLicences, devClosure, productionClosure } from '../notices/closure.mjs';
import { PLAT_ROOT, byCodeUnit, printReport } from './rules/shared.mjs';

export const DEV_EXCEPTIONS_FILE = 'tools/notices/dev-exceptions.json';

/** { ok, problems, report } for the workspace at root; `exceptions` overrides the dev-exception table (tests). */
export function checkLicencesOf(root = PLAT_ROOT, exceptions = null) {
  const table = exceptions ?? JSON.parse(readFileSync(join(root, ...DEV_EXCEPTIONS_FILE.split('/')), 'utf8'));
  const production = productionClosure(root);
  const r = checkLicences(production, devClosure(root, production), table);
  const problems = [];
  for (const f of r.failures) problems.push(`${f.name}@${f.version} (${f.licence}, via ${f.via}): ${f.reason}`);
  for (const e of r.exceptions) {
    if (e.reason === null) problems.push(`${e.name}@${e.version} (${e.licence}): a dev dependency outside the allowlist with no reason in ${DEV_EXCEPTIONS_FILE}`);
  }
  const third = [...production.values()].filter((p) => !p.name.startsWith('@plat/'));
  const report = [
    `production closure: ${third.map((p) => `${p.name}@${p.version} ${p.licence}`).sort(byCodeUnit).join(', ')}`,
    `dev exceptions: ${r.exceptions.map((e) => `${e.name}@${e.version} ${e.licence}`).join(', ') || 'none'}`,
  ];
  return { ok: problems.length === 0, problems, report };
}

export const check = {
  name: 'licences',
  run(root) {
    const r = checkLicencesOf(resolve(root));
    printReport('licences', r.report);
    return { ok: r.ok, problems: r.problems };
  },
};
