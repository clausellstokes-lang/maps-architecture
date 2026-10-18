// The Node legs' plans (M0-d-06; C-0028, C-0228 (1)): which Node each leg starts on each kind of machine — the reference
// Mac runs both through `arch` (the universal binary's two slices), a host of one architecture runs its own leg
// natively and blocks the other with the reason; and the thread check that fails a run whose stages ran on the wrong
// thread.
import { describe, expect, it } from 'vitest';
import { crossHostThreadProblem, planCrossHostNodeLeg } from '@plat/testkit';

const NODE = '/usr/local/bin/node';

describe('the Node legs on each machine', () => {
  it('the reference Mac (darwin arm64): arm64 through arch -arm64, x86-64 through arch -x86_64, the same binary', () => {
    const m = { platform: 'darwin', arch: 'arm64', execPath: NODE };
    expect(planCrossHostNodeLeg('node-arm64', m)).toEqual({ leg: 'node-arm64', runnable: true, kind: 'node', command: 'arch', args: ['-arm64', NODE] });
    expect(planCrossHostNodeLeg('node-x64-rosetta', m)).toEqual({ leg: 'node-x64-rosetta', runnable: true, kind: 'node', command: 'arch', args: ['-x86_64', NODE] });
  });
  it('a native x86-64 host (this WSL2 machine, an Intel Mac): the x86-64 leg natively, the arm64 leg blocked — a Mac step', () => {
    for (const platform of ['linux', 'darwin', 'win32']) {
      const m = { platform, arch: 'x64', execPath: NODE };
      expect(planCrossHostNodeLeg('node-x64-rosetta', m)).toEqual({ leg: 'node-x64-rosetta', runnable: true, kind: 'node', command: NODE, args: [] });
      const a = planCrossHostNodeLeg('node-arm64', m);
      expect(a.runnable).toBe(false);
      if (!a.runnable) expect(a.reason).toBe(`needs an arm64 Node and this host is ${platform} x64 — the reference Mac's leg (C-0028), a Mac step`);
    }
  });
  it('an arm64 host of another OS: the arm64 leg natively, the x86-64 leg blocked', () => {
    const m = { platform: 'linux', arch: 'arm64', execPath: NODE };
    expect(planCrossHostNodeLeg('node-arm64', m)).toEqual({ leg: 'node-arm64', runnable: true, kind: 'node', command: NODE, args: [] });
    const x = planCrossHostNodeLeg('node-x64-rosetta', m);
    expect(x.runnable).toBe(false);
    if (!x.runnable) expect(x.reason).toContain('needs an x86-64 Node');
  });
  it('another architecture runs neither', () => {
    const m = { platform: 'linux', arch: 'ia32', execPath: NODE };
    expect(planCrossHostNodeLeg('node-arm64', m).runnable).toBe(false);
    expect(planCrossHostNodeLeg('node-x64-rosetta', m).runnable).toBe(false);
  });
});

describe('the thread check', () => {
  it('passes the main thread with workers off and a worker with workers on, and names any other pairing', () => {
    expect(crossHostThreadProblem('node-arm64', 'off', 'main')).toBeNull();
    expect(crossHostThreadProblem('chromium', 'on', 'worker')).toBeNull();
    expect(crossHostThreadProblem('chromium', 'on', 'main')).toBe('chromium workers on: the stages ran on the main thread, not the worker');
    expect(crossHostThreadProblem('webkit', 'off', 'worker')).toBe('webkit workers off: the stages ran on the worker thread, not the main');
  });
});

describe("the leg's host kind", () => {
  it('arm64 is native-arm64; x64 on macOS is rosetta exactly when sysctl.proc_translated is 1; x64 elsewhere native-x64', async () => {
    const { crossHostNodeKind } = await import('@plat/testkit');
    expect(crossHostNodeKind('arm64', 'darwin', () => '0')).toBe('native-arm64');
    expect(crossHostNodeKind('x64', 'darwin', () => '1')).toBe('rosetta');
    expect(crossHostNodeKind('x64', 'darwin', () => '0')).toBe('native-x64');
    expect(crossHostNodeKind('x64', 'darwin', () => null)).toBe('native-x64');
    expect(crossHostNodeKind('x64', 'linux', () => '1')).toBe('native-x64');
    expect(() => crossHostNodeKind('ia32', 'linux', () => null)).toThrow(/unsupported architecture/);
  });
});
