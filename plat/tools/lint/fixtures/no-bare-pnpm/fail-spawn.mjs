// lint-as: tools/zz-fixture/fail.mjs
// A bare pnpm passed to spawn / spawnSync / execFile / exec / execSync (C-0093 (b)).
import * as cp from 'node:child_process';
import { exec, execSync, spawn, spawnSync } from 'node:child_process';
spawn('pnpm', ['test']); // planted: barePnpm
spawnSync('pnpm'); // planted: barePnpm
cp.execFileSync('pnpm', ['-v']); // planted: barePnpm
execSync('pnpm install'); // planted: barePnpm
exec('cd plat && pnpm test'); // planted: barePnpm
