// The host record of §12.1 (M0-f-01; C-0025): every calibrate score and every timing names its machine — the CPU model,
// the core counts, the memory size, the OS version, the Node version and architecture, and the host kind (native arm64,
// Rosetta 2, or native x86-64). The browser fields are M1's (the browser parts of calibrate — M0-f-01's defers in
// M0-work.json), so `browser` is null.
//
// This file is SELF-CONTAINED on purpose (node: built-ins only, erasable TypeScript only): the host test runs it under
// `arch -x86_64 node` with Node's own type stripping, since tsx's esbuild binary is arm64-only on this machine
// (C-0138). Keep it free of relative imports.
import { execFileSync } from 'node:child_process';
import { cpus, release, totalmem } from 'node:os';

export type HostKind = 'native-arm64' | 'rosetta' | 'native-x64';

export interface HostRecord {
  /** `sysctl -n machdep.cpu.brand_string` on macOS (`os.cpus()[0].model` elsewhere). */
  cpu: string;
  /** `hw.ncpu`, every logical core. */
  cores: number;
  /** `hw.perflevel0.physicalcpu` (performance cores; null where the host has no performance levels). */
  performanceCores: number | null;
  /** `hw.perflevel1.physicalcpu` (efficiency cores; null where the host has no second level). */
  efficiencyCores: number | null;
  /** `hw.memsize` in bytes (`os.totalmem()` elsewhere). */
  memoryBytes: number;
  /** `sw_vers` (product name, version, build) on macOS; the platform and kernel release elsewhere. */
  os: { name: string; version: string; build: string };
  /** `process.version`. */
  node: string;
  /** `process.arch` — `x64` under Rosetta 2. */
  arch: string;
  kind: HostKind;
  /** The browser name and version (user-agent client hints) — the browser parts of calibrate are M1's (M0-f-01's defers). */
  browser: null;
}

/** The macOS tools the record reads, by absolute path (no PATH lookup). */
const SYSCTL = '/usr/sbin/sysctl';
const SW_VERS = '/usr/bin/sw_vers';

function readTool(file: string, args: string[]): string | null {
  try {
    return execFileSync(file, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], env: { ...process.env, LC_ALL: 'C' } }).trim();
  } catch {
    return null;
  }
}

/** One sysctl value as text, or null when the host has no such name. */
export function sysctl(name: string): string | null {
  const v = readTool(SYSCTL, ['-n', name]);
  return v === null || v === '' ? null : v;
}

function sysctlInt(name: string): number | null {
  const v = sysctl(name);
  if (v === null) return null;
  const n = Number(v);
  return Number.isInteger(n) ? n : null;
}

/**
 * The host kind: `native-arm64` for an arm64 process; `rosetta` for an x64 process the kernel translates
 * (`sysctl.proc_translated` = 1 — the child sysctl inherits the translated architecture, CONFIRMED on this machine);
 * `native-x64` for an x64 process on an x86-64 machine.
 */
export function hostKind(arch: string = process.arch, platform: string = process.platform, translated: () => string | null = () => sysctl('sysctl.proc_translated')): HostKind {
  if (arch === 'arm64') return 'native-arm64';
  if (arch === 'x64') return platform === 'darwin' && translated() === '1' ? 'rosetta' : 'native-x64';
  throw new Error(`host: unsupported architecture ${JSON.stringify(arch)} (§12.1 names arm64 and x86-64 hosts)`);
}

/** The host record of the running process (§12.1). */
export function hostRecord(): HostRecord {
  const kind = hostKind();
  if (process.platform === 'darwin') {
    const cpu = sysctl('machdep.cpu.brand_string');
    const cores = sysctlInt('hw.ncpu');
    const mem = sysctlInt('hw.memsize');
    if (cpu === null || cores === null || mem === null) throw new Error('host: sysctl gave no machdep.cpu.brand_string, hw.ncpu or hw.memsize');
    return {
      cpu,
      cores,
      performanceCores: sysctlInt('hw.perflevel0.physicalcpu'),
      efficiencyCores: sysctlInt('hw.perflevel1.physicalcpu'),
      memoryBytes: mem,
      os: {
        name: readTool(SW_VERS, ['-productName']) ?? 'macOS',
        version: readTool(SW_VERS, ['-productVersion']) ?? release(),
        build: readTool(SW_VERS, ['-buildVersion']) ?? '',
      },
      node: process.version,
      arch: process.arch,
      kind,
      browser: null,
    };
  }
  const list = cpus();
  return {
    cpu: list[0]?.model ?? 'unknown',
    cores: list.length,
    performanceCores: null,
    efficiencyCores: null,
    memoryBytes: totalmem(),
    os: { name: process.platform, version: release(), build: '' },
    node: process.version,
    arch: process.arch,
    kind,
    browser: null,
  };
}

/** One line naming the machine, for the harness's printed summary. */
export function describeHost(h: HostRecord): string {
  const gib = h.memoryBytes / 1024 / 1024 / 1024;
  const split = h.performanceCores !== null && h.efficiencyCores !== null ? ` (${h.performanceCores}P + ${h.efficiencyCores}E)` : '';
  return `${h.cpu}, ${h.cores} cores${split}, ${gib.toFixed(gib >= 10 ? 0 : 1)} GiB, ${h.os.name} ${h.os.version}${h.os.build ? ` (${h.os.build})` : ''}, node ${h.node} ${h.arch} ${h.kind}`;
}
