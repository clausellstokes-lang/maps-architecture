// lint-as: tools/zz-fixture/pass.mjs
// pnpm through corepack; a regular expression's exec; a string that mentions pnpm without running it.
import { execSync, spawnSync } from 'node:child_process';
spawnSync('corepack', ['pnpm', 'test']);
execSync('corepack pnpm install --frozen-lockfile');
export const version = /^pnpm (\S+)/.exec('pnpm 10.28')?.[1];
export const note = 'pnpm through corepack';
