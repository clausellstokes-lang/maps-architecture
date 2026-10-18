// The in-memory file system the harness's tests run under (M0-b-05; the checker's line: "every test input is synthetic
// and in memory (no path outside plat/; a file-open log)"). A test file mocks `node:fs` with `memFs(real, mem)`:
// every path under `mem.root` — a folder inside plat/ that never exists on disk — is served from `mem.files` alone
// (exists, read, write, remove, realpath; mkdir does nothing), so the synthetic `baselines.json`, `ng-faces.json`,
// cells files, tables, reports and summaries live in memory; any other path goes to the real file system. Every call
// is appended to `mem.log` with its path and whether it was virtual, so a test can show what the run opened.
import { resolve, sep } from 'node:path';

/** The memory and its log. */
export interface Mem {
  root: string;
  files: Map<string, Uint8Array>;
  log: { op: string; path: string; virtual: boolean }[];
}

type Fs = typeof import('node:fs');

const enoent = (p: string): Error => Object.assign(new Error(`ENOENT: no such file or directory, open '${p}'`), { code: 'ENOENT' });

/** The mocked module (see the module comment). */
export function memFs(real: Fs, mem: Mem): Fs {
  const virt = (p: unknown): string | null => {
    if (typeof p !== 'string' || mem.root === '') return null;
    const abs = resolve(p);
    return abs === mem.root || abs.startsWith(mem.root + sep) ? abs : null;
  };
  const note = (op: string, p: unknown, virtual: boolean): void => {
    mem.log.push({ op, path: typeof p === 'string' ? resolve(p) : String(p), virtual });
  };
  const encodingOf = (o: unknown): string | undefined => (typeof o === 'string' ? o : typeof o === 'object' && o !== null ? ((o as { encoding?: string }).encoding ?? undefined) : undefined);
  const mocked = {
    ...real,
    existsSync: (p: Parameters<Fs['existsSync']>[0]): boolean => {
      const v = virt(p);
      note('exists', p, v !== null);
      if (v !== null) return mem.files.has(v) || [...mem.files.keys()].some((k) => k.startsWith(v + sep)) || v === mem.root;
      return real.existsSync(p);
    },
    readFileSync: ((p: Parameters<Fs['readFileSync']>[0], o?: unknown) => {
      const v = virt(p);
      note('read', p, v !== null);
      if (v === null) return (real.readFileSync as (a: unknown, b?: unknown) => unknown)(p, o);
      const b = mem.files.get(v);
      if (b === undefined) throw enoent(v);
      const enc = encodingOf(o);
      return enc === undefined ? Buffer.from(b) : Buffer.from(b).toString(enc as BufferEncoding);
    }) as Fs['readFileSync'],
    writeFileSync: ((p: Parameters<Fs['writeFileSync']>[0], data: unknown, o?: unknown) => {
      const v = virt(p);
      note('write', p, v !== null);
      if (v === null) return (real.writeFileSync as (a: unknown, b: unknown, c?: unknown) => void)(p, data, o);
      mem.files.set(v, typeof data === 'string' ? Buffer.from(data, 'utf8') : Buffer.from(data as Uint8Array));
      return undefined;
    }) as Fs['writeFileSync'],
    mkdirSync: ((p: Parameters<Fs['mkdirSync']>[0], o?: unknown) => {
      const v = virt(p);
      note('mkdir', p, v !== null);
      if (v === null) return (real.mkdirSync as (a: unknown, b?: unknown) => unknown)(p, o);
      return undefined;
    }) as Fs['mkdirSync'],
    rmSync: ((p: Parameters<Fs['rmSync']>[0], o?: unknown) => {
      const v = virt(p);
      note('rm', p, v !== null);
      if (v === null) return (real.rmSync as (a: unknown, b?: unknown) => void)(p, o);
      mem.files.delete(v);
      return undefined;
    }) as Fs['rmSync'],
    realpathSync: ((p: Parameters<Fs['realpathSync']>[0], o?: unknown) => {
      const v = virt(p);
      note('realpath', p, v !== null);
      if (v === null) return (real.realpathSync as (a: unknown, b?: unknown) => unknown)(p, o);
      return v;
    }) as Fs['realpathSync'],
  };
  return { ...mocked, default: mocked } as unknown as Fs;
}
