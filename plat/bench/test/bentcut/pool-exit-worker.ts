// A planted pool worker that dies without an `error` event (hardening round S3, N-8): run by pool-exit-probe.ts in
// place of worker.ts. PLAT_TEST_POOL_EXIT names how it dies: `first` exits (code 3) on its first chunk, `zero` exits
// with code 0 on its first chunk, `second` answers its first chunk with placeholder records and exits (code 3) on the
// next. It runs no task and reads no file (M0-b-05's pool-exit-worker.ts, the same shape).
import { parentPort } from 'node:worker_threads';

const mode = process.env['PLAT_TEST_POOL_EXIT'] ?? 'first';
let seen = 0;
parentPort?.on('message', (c: { at: number; tasks: { kind: string; i: number }[] }) => {
  seen += 1;
  if (mode === 'zero') process.exit(0);
  if (mode === 'first' || seen > 1) process.exit(3);
  parentPort?.postMessage({ at: c.at, records: c.tasks.map((t) => ({ phase: 'fcut', kind: t.kind, i: t.i })) });
});
