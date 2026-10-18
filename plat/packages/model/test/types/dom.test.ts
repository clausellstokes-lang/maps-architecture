// M0-m-01: no DOM lib in @plat/model's tsconfig — a compile test. A probe that references `document`, `window` and
// `HTMLElement` (and Node's `process` and `Buffer`) is compiled under the package's own options, read from
// packages/model/tsconfig.json: every reference fails to resolve. The same probe under the same options with the DOM
// lib added resolves the DOM names, so the probe can tell the two apart.
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

const CONFIG = fileURLToPath(new URL('../../tsconfig.json', import.meta.url));
const PROBE = fileURLToPath(new URL('../../src/__dom_probe__.ts', import.meta.url)); // a virtual file, never written
const PROBE_TEXT = [
  'export const title: string = document.title;',
  'export const w = window;',
  'export type E = HTMLElement;',
  'export const env = process.env;',
  'export const b = Buffer.from([]);',
].join('\n');

function packageOptions(): ts.CompilerOptions {
  const parsed = ts.getParsedCommandLineOfConfigFile(CONFIG, {}, {
    ...ts.sys,
    onUnRecoverableConfigFileDiagnostic: (d) => {
      throw new Error(ts.flattenDiagnosticMessageText(d.messageText, '\n'));
    },
  });
  if (!parsed) throw new Error('model/tsconfig.json did not parse');
  return parsed.options;
}

/** The diagnostics of the probe compiled alone under `options` (the probe file served from memory). */
function probeDiagnostics(options: ts.CompilerOptions): { code: number; text: string }[] {
  const opts: ts.CompilerOptions = { ...options, composite: false, declaration: false, declarationMap: false, emitDeclarationOnly: false, noEmit: true };
  const host = ts.createCompilerHost(opts);
  const getSourceFile = host.getSourceFile.bind(host);
  host.getSourceFile = (fileName, languageVersion, onError, shouldCreate) =>
    fileName === PROBE ? ts.createSourceFile(fileName, PROBE_TEXT, languageVersion, true) : getSourceFile(fileName, languageVersion, onError, shouldCreate);
  const fileExists = host.fileExists.bind(host);
  host.fileExists = (f) => f === PROBE || fileExists(f);
  const program = ts.createProgram({ rootNames: [PROBE], options: opts, host });
  return ts
    .getPreEmitDiagnostics(program)
    .filter((d) => d.file?.fileName === PROBE)
    .map((d) => ({ code: d.code, text: ts.flattenDiagnosticMessageText(d.messageText, '\n') }));
}

describe('@plat/model compiles without the DOM lib and without Node globals', () => {
  it('the package tsconfig carries lib ES2022 only and no global types', () => {
    const options = packageOptions();
    expect(options.lib).toEqual(['lib.es2022.d.ts']);
    expect(options.types).toEqual([]);
    expect(options.strict).toBe(true);
  });

  it('a probe referencing document, window, HTMLElement, process and Buffer fails to compile under it', () => {
    const diagnostics = probeDiagnostics(packageOptions());
    for (const name of ['document', 'window', 'HTMLElement', 'process', 'Buffer']) {
      const hit = diagnostics.find((d) => d.text.includes(`Cannot find name '${name}'`));
      expect(hit, `${name}: ${JSON.stringify(diagnostics)}`).toBeDefined();
      // 2304: cannot find name; 2580 / 2584 / 2591: the same with a hint to add Node types or the DOM lib
      expect([2304, 2580, 2584, 2591]).toContain(hit?.code);
    }
  });

  it('the control: with the DOM lib added the DOM names resolve (the probe tells the configurations apart)', () => {
    const options = packageOptions();
    const diagnostics = probeDiagnostics({ ...options, lib: [...(options.lib ?? []), 'lib.dom.d.ts'] });
    for (const name of ['document', 'window', 'HTMLElement']) {
      expect(diagnostics.some((d) => d.text.includes(`Cannot find name '${name}'`)), name).toBe(false);
    }
  });
});
