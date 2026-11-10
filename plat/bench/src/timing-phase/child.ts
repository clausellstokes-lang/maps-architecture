// The timing phase's MEASURING process (M0-t-00 hardening round S1, RL10 (a) (iii); Q72): the entry of the production
// bundle bundle.ts builds and index.ts's launcher (`run`, the dispatcher's entry) runs as ONE child process. Before it
// measures anything it reads what it is: @plat/kernel's DEBUG_BUILD (the build flag, kernel/src/invariants/debug.ts) and
// the arena's assertion switch (`debugAssertions()`; checks/M0-a-14-notes.md note 7: a bundle whose debug.ts was dropped
// leaves the switch ON). Either still on means a debug build — a source run, or a bundle without the production define —
// and the child measures nothing (exit 64, naming bench:timing-phase, the one command that builds and launches the
// production bundle). Otherwise it reads its own bundle (bytes, sha256, the `__name` count, the flag left) into the
// record's build block (RL10 (iv)) and runs the script in-process (`runPhase`), its output to PLAT_BENCH_OUT as the
// dispatcher's (C-0067).
import { readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEBUG_BUILD, debugAssertions } from '@plat/kernel';
import { say } from '../timing/output.js';
import { bundleFacts, RECIPE } from './bundle.js';
import { runPhase, type BuildBlock, type PhaseContext } from './index.js';

/** What the child is: the build flag and the arena's switch (the tests' debug seam plants them). */
export interface ChildBuild {
  readonly debugBuild: boolean;
  readonly arenaAssertions: boolean;
}

/** The child's options: its bundle's URL (the entry hands it in), and the tests' seams. */
export interface ChildOptions {
  readonly bundle?: URL | null;
  readonly build?: ChildBuild;
  /** The script's context beyond `out` (a test's fixture seams); `out` defaults to PLAT_BENCH_OUT as the dispatcher's. */
  readonly ctx?: Partial<PhaseContext>;
}

/** The refusal line of a debug child (verbatim; the exit is 64, a usage-class outcome of the wrong launch). */
export function debugChildMessage(b: ChildBuild): string {
  return `timing-phase: this process is a debug build (DEBUG_BUILD ${String(b.debugBuild)}, the arena's assertion switch ${b.arenaAssertions ? 'on' : 'off'}): the timing phase times only the production bundle, which corepack pnpm bench:timing-phase builds and launches (RL10, Q72); nothing measured`;
}

/** The child's main: refuses a debug build (64), else runs the script in-process with its build block. */
export async function childMain(args: readonly string[], o: ChildOptions = {}): Promise<number> {
  const b: ChildBuild = o.build ?? { debugBuild: DEBUG_BUILD, arenaAssertions: debugAssertions() };
  const log = o.ctx?.log ?? say;
  if (b.debugBuild || b.arenaAssertions) {
    log(debugChildMessage(b));
    return 64;
  }
  let facts: ReturnType<typeof bundleFacts> | null = null;
  if (o.bundle !== undefined && o.bundle !== null) {
    try {
      facts = bundleFacts(readFileSync(fileURLToPath(o.bundle), 'utf8'));
    } catch {
      facts = null;
    }
  }
  const build: BuildBlock = {
    kind: 'production-bundle',
    recipe: RECIPE,
    rule: 'J622 (the profile tool\'s recipe), RL10 / Q72 (the timing phase times the product)',
    debugBuild: b.debugBuild,
    arenaAssertions: b.arenaAssertions,
    keepNames: facts?.keepNames ?? null,
    debugFlagLeft: facts?.debugFlagLeft ?? null,
    bytes: facts?.bytes ?? null,
    sha256: facts?.sha256 ?? null,
    bundle: o.bundle === undefined || o.bundle === null ? null : fileURLToPath(o.bundle),
    node: process.version,
  };
  const out = o.ctx?.out ?? (process.env['PLAT_BENCH_OUT'] || join(tmpdir(), 'plat-bench'));
  return runPhase([...args], { ...o.ctx, out, build });
}
