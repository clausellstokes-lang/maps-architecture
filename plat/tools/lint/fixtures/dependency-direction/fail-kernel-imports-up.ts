// lint-as: packages/kernel/src/zz-fixture/fail.ts
// The kernel imports nothing above it, no Node module, no third-party library but through an adapter.
import * as model from '@plat/model'; // planted: direction
import * as testkit from '@plat/testkit'; // planted: direction
import * as modelByPath from '../../../model/src/index.js'; // planted: direction
import { readFileSync } from 'node:fs'; // planted: nodeBuiltin
import fc from 'fast-check'; // planted: thirdPartyInModel
import * as lint from '../../../../tools/lint/index.mjs'; // planted: outsideGraph
import * as render from '@plat/render'; // planted: unknownPackage
export * from '@plat/site'; // planted: direction
export const later = (): Promise<unknown> => import('@plat/layout'); // planted: direction
export { model, testkit, modelByPath, readFileSync, fc, lint, render };
