// A resumable chunk of the session's 1 000-seed fusion run (N-52 (6)): runs seeds [from, from+n) of the CITY fixture,
// both runs, through the harness's own task pool, and writes the SeedRecords as JSON. The records are plain data and
// the pool returns them in task order for any worker count (pool.ts), so a concatenation of chunks folded once by
// fold.mts is the monolithic run's report and summary, byte for byte.
import { mkdirSync, writeFileSync, renameSync } from 'node:fs';
import { join } from 'node:path';
import { tasksOf, runTasks, RUN_KINDS } from '../plat/bench/src/fusion/index.ts';
const [fromS, nS, workersS, dir, frameS, walledS] = process.argv.slice(2);
const from = Number(fromS), n = Number(nS), workers = Number(workersS ?? '4');
const frameHa = frameS === undefined ? null : Number(frameS);
const walledHa = walledS === undefined ? null : Number(walledS);
if (!Number.isInteger(from) || !Number.isInteger(n) || from < 1 || n < 1 || !dir) throw new Error('usage: chunk.mts <from> <n> <workers> <dir> [frameHa walledHa]');
mkdirSync(dir, { recursive: true });
const sizes = { from, seeds: n, runs: [...RUN_KINDS], frameHa, walledHa } as const;
const t0 = Date.now();
const records = await runTasks(tasksOf(sizes), workers, (d, t) => { if (d % 4 === 0 || d === t) console.log(`chunk ${from}+${n}: ${d}/${t} runs, ${((Date.now() - t0) / 60000).toFixed(1)} min`); });
const name = `chunk-${String(from).padStart(4, '0')}-${String(n).padStart(4, '0')}.json`;
writeFileSync(join(dir, name + '.tmp'), JSON.stringify({ from, seeds: n, runs: sizes.runs, frameHa, walledHa, records }));
renameSync(join(dir, name + '.tmp'), join(dir, name));
console.log(`chunk ${from}+${n}: written ${name} (${records.length} records, ${((Date.now() - t0) / 60000).toFixed(1)} min)`);
