// M0-a-16's mixer test (M0-work.json: "Rng.stream is the one mixer call site (a lint test counts the call sites)";
// §14 `interface Rng` and "StageContext.stream is rng.stream …"; §6.1 "Paint programs and furniture pass the reserved
// stage id STAGE_VIEW (0xffff) to the one mixer (§14 `Rng.stream`)"). The lint reads every TypeScript source of the
// workspace's packages and the bench with TypeScript's parser and counts the calls of the mixer's entry points — `mixInto`
// (the finaliser round over an entity key and the packed components) and `streamKey` (its pure, timed form) — and every
// import of them: the one call outside the mixer's own file is `Rng.stream`'s, in kernel/src/rng/rng.ts.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { CONCERNS, STAGE_VIEW, STAGES } from '../../src/registry/index.js';
import { streamKey } from '../../src/rng/mixer.js';
import { streamFromKey } from '../../src/rng/index.js';
import type { Hash128 } from '../../src/hash/index.js';
import type { StreamOpts } from '../../src/types/index.js';
import { framed, kernelOver } from './support.js';

const PLAT = fileURLToPath(new URL('../../../../', import.meta.url));
const MIXER = 'packages/kernel/src/rng/mixer.ts';
const ENTRY = new Set(['mixInto', 'streamKey']);

/** Every .ts source under `dir` (relative to plat/), skipping node_modules and dist. */
function sources(dir: string): string[] {
  const out: string[] = [];
  let names: string[];
  try {
    names = readdirSync(`${PLAT}${dir}`).sort();
  } catch {
    return out;
  }
  for (const name of names) {
    if (name === 'node_modules' || name === 'dist') continue;
    const rel = `${dir}/${name}`;
    if (statSync(`${PLAT}${rel}`).isDirectory()) out.push(...sources(rel));
    else if (name.endsWith('.ts') && !name.endsWith('.d.ts')) out.push(rel);
  }
  return out;
}

/** The workspace's source folders: every package's src/ and the bench's src/. */
function sourceFiles(): string[] {
  const out: string[] = [];
  for (const pkg of readdirSync(`${PLAT}packages`).sort()) out.push(...sources(`packages/${pkg}/src`));
  out.push(...sources('bench/src'));
  return out;
}

interface Site {
  readonly file: string;
  readonly line: number;
  readonly what: string;
  /** The enclosing function's or method's name, '' at the top level. */
  readonly inside: string;
}

/** Calls of the mixer's entry points and imports of them in one source file (aliases followed). */
function mixerSites(file: string, text: string): Site[] {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS);
  const out: Site[] = [];
  const local = new Map<string, string>();
  const line = (n: ts.Node): number => sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1;
  const enclosing = (n: ts.Node): string => {
    for (let p: ts.Node | undefined = n.parent; p !== undefined; p = p.parent) {
      if ((ts.isFunctionDeclaration(p) || ts.isMethodDeclaration(p)) && p.name !== undefined) return p.name.getText(sf);
    }
    return '';
  };
  const visit = (n: ts.Node): void => {
    if (ts.isImportDeclaration(n) && n.importClause?.namedBindings !== undefined && ts.isNamedImports(n.importClause.namedBindings)) {
      for (const el of n.importClause.namedBindings.elements) {
        const imported = (el.propertyName ?? el.name).text;
        if (ENTRY.has(imported) && !el.isTypeOnly) {
          local.set(el.name.text, imported);
          out.push({ file, line: line(el), what: `import ${imported}`, inside: '' });
        }
      }
    }
    if (ts.isExportDeclaration(n) && n.exportClause !== undefined && ts.isNamedExports(n.exportClause)) {
      for (const el of n.exportClause.elements) {
        const name = (el.propertyName ?? el.name).text;
        if (ENTRY.has(name)) out.push({ file, line: line(el), what: `re-export ${name}`, inside: '' });
      }
    }
    if (ts.isCallExpression(n)) {
      const c = n.expression;
      const name = ts.isIdentifier(c) ? c.text : ts.isPropertyAccessExpression(c) ? c.name.text : '';
      const target = local.get(name) ?? (ENTRY.has(name) ? name : undefined);
      if (target !== undefined) out.push({ file, line: line(n), what: `call ${target}`, inside: enclosing(n) });
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
  return out;
}

describe('Rng.stream is the one mixer call site (the lint test)', () => {
  it('outside the mixer\'s own file, the workspace calls mixInto or streamKey once: in Rng.stream (kernel/src/rng/rng.ts)', () => {
    const files = sourceFiles();
    expect(files).toContain(MIXER);
    expect(files.length).toBeGreaterThan(100);
    const sites = files.filter((f) => f !== MIXER).flatMap((f) => mixerSites(f, readFileSync(`${PLAT}${f}`, 'utf8')));
    const calls = sites.filter((s) => s.what.startsWith('call '));
    expect(calls.map((s) => `${s.file} ${s.what} in ${s.inside}`)).toEqual(['packages/kernel/src/rng/rng.ts call mixInto in stream']);
    // the only other references are the rng module's own: its import in rng.ts and the module index's re-export
    expect(sites.filter((s) => !s.what.startsWith('call ')).map((s) => `${s.file} ${s.what}`).sort()).toEqual([
      'packages/kernel/src/rng/index.ts re-export mixInto',
      'packages/kernel/src/rng/index.ts re-export streamKey',
      'packages/kernel/src/rng/rng.ts import mixInto',
    ]);
  });

  it('the census finds a planted call, an aliased import and a call through a namespace (the lint\'s own check)', () => {
    const planted = [
      "import { mixInto as m } from '../rng/mixer.js';",
      'export function a(out: Uint32Array, k: number[], p: number[]): void { m(out, k as never, p); }',
      "import * as rng from '../rng/index.js';",
      'export function b(): unknown { return rng.streamKey([1, 2, 3, 4] as never, 0 as never, 0 as never, {} as never); }',
    ].join('\n');
    const s = mixerSites('planted.ts', planted);
    expect(s.map((x) => `${x.what} in ${x.inside}`)).toEqual(['import mixInto in ', 'call mixInto in a', 'call streamKey in b']);
  });

  it('within the mixer\'s own file, streamKey is the pure form: it calls mixInto once and nothing else calls it there', () => {
    const s = mixerSites(MIXER, readFileSync(`${PLAT}${MIXER}`, 'utf8')).filter((x) => x.what.startsWith('call '));
    expect(s.map((x) => `${x.what} in ${x.inside}`)).toEqual(['call mixInto in streamKey']);
  });
});

describe('the façade wires M0-d-01\'s Rng (§14, §6.1)', () => {
  const EK: Hash128 = [0x01234567, 0x89abcdef, 0x0badf00d, 0x5eed5eed];
  const O: StreamOpts = { reroll: 1, attempt: 0, epoch: 0, salt: 0 };

  it('kernel.rng().stream draws the mixer\'s stream key: the same first words as streamKey seeded directly', () => {
    const k = kernelOver([framed()]);
    const r = k.rng();
    const s = r.stream(EK, STAGES.S8, CONCERNS['cut.stop'], O);
    const direct = streamFromKey(streamKey(EK, STAGES.S8, CONCERNS['cut.stop'], O));
    for (let i = 0; i < 8; i += 1) expect(s.u32()).toBe(direct.u32());
    expect(r.streams).toBe(1);
  });

  it('one derivation continues its stream; a fresh rng() is a fresh derivation; STAGE_VIEW reaches the mixer', () => {
    const k = kernelOver([framed()]);
    const r = k.rng();
    const a = r.stream(EK, STAGES.S8, CONCERNS['cut.stop'], O);
    const first = a.u32();
    expect(r.stream(EK, STAGES.S8, CONCERNS['cut.stop'], O)).toBe(a);
    const b = k.rng().stream(EK, STAGES.S8, CONCERNS['cut.stop'], O);
    expect(b).not.toBe(a);
    expect(b.u32()).toBe(first);
    const v = r.stream(EK, STAGE_VIEW, CONCERNS['style.jitter'], O);
    expect(v.key).toEqual(streamKey(EK, STAGE_VIEW, CONCERNS['style.jitter'], O));
    expect(r.streams).toBe(2);
  });
});
