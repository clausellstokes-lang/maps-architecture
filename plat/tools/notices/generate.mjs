#!/usr/bin/env node
// Generates THIRD-PARTY-NOTICES.txt from the production closure (§17.4; M0-s-01):
//   node tools/notices/generate.mjs           write the file and run the licence check
//   node tools/notices/generate.mjs --check   fail when the committed file differs from the generated text
// Per third-party package of the production closure, sorted by name: name, version, licence, its copyright lines and
// its licence text; then Sun's fdlibm notice (vendor/fdlibm-5.3/NOTICE.txt). The notice has landed, so a missing or
// empty NOTICE.txt throws and the placeholder is never written again (C-0095's either-state reading closed, L15); the
// placeholder's text stays only so that a notices file still holding it is told apart (fdlibmState). Fonts' OFL text
// joins at M1 with the fonts (§17.2).
// Then the public-domain algorithms the kernel ports or implements, credited though they bind no licence (CLEAN-ROOM.md
// rule 7; C-0259 (3)): xoshiro128** 1.1 with the authors' dedication read from the vendored C, and
// MurmurHash3 (no file vendored: our own implementation of the published algorithm). A credit whose source is missing
// throws, so `notices` and `notices:check` fail rather than drop it.
// Exit 1 on a production licence failure or a --check diff.
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { byCodeUnit, isMain } from '../vendor/common.mjs';
import { PLAT_ROOT, checkLicences, devClosure, productionClosure } from './closure.mjs';

export const NOTICES_FILE = 'THIRD-PARTY-NOTICES.txt';
export const FDLIBM_NOTICE = 'vendor/fdlibm-5.3/NOTICE.txt';
export const FDLIBM_HEADING = 'fdlibm 5.3 (Sun Microsystems), ported to TypeScript as dmath';
export const FDLIBM_PLACEHOLDER = `PLACEHOLDER: Sun's fdlibm notice is entered by M0-d-03 in ${FDLIBM_NOTICE} when dmath's port lands.`;
const RULE = '='.repeat(78);

/** A notice file's text as the notices file carries it: LF line ends, trailing white space trimmed. */
export function normaliseNotice(raw) {
  return raw.replace(/\r\n/g, '\n').trimEnd();
}

/** Sun's notice from vendor/fdlibm-5.3/NOTICE.txt under `root`, normalised, or null while the file is absent. */
export function fdlibmNotice(root = PLAT_ROOT) {
  const file = join(root, FDLIBM_NOTICE);
  return existsSync(file) ? normaliseNotice(readFileSync(file, 'utf8')) : null;
}

/**
 * Which fdlibm text a notices file holds: 'placeholder', 'notice', 'both', 'neither' or 'repeated'. A valid file holds
 * exactly one of the placeholder and Sun's notice, once (C-0095); `notice` is fdlibmNotice()'s value, null while the
 * file is absent (an empty notice counts as none).
 */
export function fdlibmState(text, notice) {
  const count = (needle) => (needle ? text.split(needle).length - 1 : 0);
  const p = count(FDLIBM_PLACEHOLDER);
  const n = notice === null ? 0 : count(notice);
  if (p > 0 && n > 0) return 'both';
  if (p === 0 && n === 0) return 'neither';
  if (p + n > 1) return 'repeated';
  return p === 1 ? 'placeholder' : 'notice';
}

export const XOSHIRO_SOURCE = 'vendor/xoshiro/xoshiro128starstar.c';
export const XOSHIRO_HEADING = 'xoshiro128** 1.1 (David Blackman and Sebastiano Vigna), ported to TypeScript as the kernel stream';
export const MURMUR3_HEADING = 'MurmurHash3 (Austin Appleby), implemented in TypeScript as the kernel hash';

/** The first block comment of a C source, without its delimiters, normalised; null when the text opens with none. */
export function leadingComment(raw) {
  const m = /^\s*\/\*([\s\S]*?)\*\//.exec(raw.replace(/\r\n/g, '\n'));
  return m ? m[1].split('\n').map((l) => l.trimEnd()).join('\n').trim() : null;
}

/**
 * The credited public-domain algorithms, in order: [{ heading, body }]. xoshiro's body carries the authors' dedication
 * as the vendored C states it; a missing or comment-less source throws (a credit is never silently dropped).
 */
export function publicDomainCredits(root = PLAT_ROOT) {
  const file = join(root, XOSHIRO_SOURCE);
  const dedication = existsSync(file) ? leadingComment(readFileSync(file, 'utf8')) : null;
  if (!dedication) throw new Error(`notices: ${XOSHIRO_SOURCE} is missing or opens with no dedication comment`);
  return [
    {
      heading: XOSHIRO_HEADING,
      body: [
        'xoshiro128** 1.1, by David Blackman and Sebastiano Vigna, public domain.',
        'Source: https://prng.di.unimi.it/ (read 2026-10-03; vendored unmodified in vendor/xoshiro/, each file\'s URL and',
        'SHA-256 in plat/CLEAN-ROOM.md section 5). packages/kernel/src/rng/stream.ts ports the generator\'s next().',
        `The authors' dedication, from ${XOSHIRO_SOURCE}:`,
        '',
        dedication,
      ].join('\n'),
    },
    {
      heading: MURMUR3_HEADING,
      body: [
        'MurmurHash3 (x86 128-bit variant and its 32-bit finaliser), by Austin Appleby, published with the SMHasher',
        'project and placed in the public domain by its author. packages/kernel/src/hash/murmur3.ts is our own',
        'implementation of the published algorithm (plat/CLEAN-ROOM.md section 5, P-0001); no source file of it is',
        'vendored or copied.',
      ].join('\n'),
    },
  ];
}

function licenceText(dir) {
  const name = readdirSync(dir).sort().find((n) => /^(licen[cs]e|copying)(\.(md|txt))?$/i.test(n));
  return name ? readFileSync(join(dir, name), 'utf8').replace(/\r\n/g, '\n').trimEnd() : null;
}

/**
 * The notices text for the workspace at `root` (deterministic: sorted, LF line ends). `notice` is Sun's fdlibm notice
 * (read from `root` by default; a test may pass a text in memory); a null or empty notice throws, naming the file.
 */
export function noticesText(
  root = PLAT_ROOT,
  production = productionClosure(root),
  notice = fdlibmNotice(root),
  credits = publicDomainCredits(root),
) {
  const parts = [
    'THIRD-PARTY NOTICES — PLAT',
    '',
    'PLAT is proprietary: Copyright © the owner. All rights reserved. (LICENSE, §17.3.)',
    'PLAT ships the third-party code below, each under its own licence. This file is generated by',
    'tools/notices/generate.mjs from the production closure of the shipped packages; do not edit it by hand.',
    '',
  ];
  const libs = [...production.values()]
    .filter((p) => !p.name.startsWith('@plat/'))
    .sort((a, b) => byCodeUnit(a.name, b.name));
  for (const p of libs) {
    const text = licenceText(p.dir);
    const copyright = (text ?? '').split('\n').filter((l) => /copyright/i.test(l)).map((l) => l.trim());
    parts.push(RULE, `${p.name} ${p.version}`, `Licence: ${p.licence}`);
    for (const c of copyright) parts.push(c);
    parts.push('', text ?? '(the package ships no licence file; its package.json declares the licence above)', '');
  }
  if (!notice) throw new Error(`notices: ${FDLIBM_NOTICE} is missing or empty; Sun's notice is never replaced by the placeholder`);
  parts.push(RULE, FDLIBM_HEADING, '', notice, '');
  for (const c of credits) parts.push(RULE, c.heading, '', c.body, '');
  return parts.join('\n') + '\n';
}

if (isMain(import.meta.url)) {
  const production = productionClosure();
  const exceptionsTable = JSON.parse(readFileSync(new URL('./dev-exceptions.json', import.meta.url), 'utf8'));
  const r = checkLicences(production, devClosure(PLAT_ROOT, production), exceptionsTable);
  for (const f of r.failures) process.stderr.write(`licences FAIL ${f.name}@${f.version} ${f.licence} (via ${f.via}): ${f.reason}\n`);
  for (const e of r.exceptions) {
    const why = e.reason ?? 'UNLISTED — add a reason to tools/notices/dev-exceptions.json';
    process.stdout.write(`licences dev exception ${e.name}@${e.version} ${e.licence}: ${why}\n`);
  }
  const text = noticesText(PLAT_ROOT, production);
  const target = join(PLAT_ROOT, NOTICES_FILE);
  if (process.argv.includes('--check')) {
    const committed = existsSync(target) ? readFileSync(target, 'utf8') : '';
    if (committed !== text) {
      process.stderr.write(`notices FAIL ${NOTICES_FILE} differs from the generated text; run corepack pnpm notices\n`);
      process.exit(1);
    }
    process.stdout.write(`notices ok — ${NOTICES_FILE} is current\n`);
  } else {
    writeFileSync(target, text);
    process.stdout.write(`notices written — ${NOTICES_FILE}\n`);
  }
  if (!r.ok) process.exit(1);
  process.stdout.write(`licences ok — ${production.size} production packages, ${r.exceptions.length} dev exceptions\n`);
}
