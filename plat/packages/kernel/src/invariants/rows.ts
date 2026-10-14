// §3.10's rows, one declaration each, at their scopes (§5.3: "every invariant declares a scope"). The table is the
// suite's index: `checkBatch`, `checkStageEnd`, `checkSave`, `checkCI` and `checkFreeze` evaluate exactly the rows
// declared here for their scope, and a test maps every §3.10 row to its name. M0-a-14. Readings: C-0200.
import type { Invariant } from '../types/index.js';
import type { RowDecl } from './types.js';

function row(name: string, scope: Invariant['scope'], cls: 'hard' | 'soft', when: string, clause: string, deferredTo?: string): RowDecl {
  const r: RowDecl = { name, scope, class: cls, kind: 'check', check: name, when, clause };
  return Object.freeze(deferredTo === undefined ? r : { ...r, deferredTo });
}

/** §3.10's rows in the design's order (the corner row is two declarations: its soft and its hard class, C-0200 (9)). */
export const KERNEL_ROWS: readonly RowDecl[] = Object.freeze([
  row('lattice-range', 'batch', 'hard', 'at snap (by construction); re-read on the batch\'s vertices', 'every coordinate is a lattice point inside the range invariant'),
  row('min-edge', 'batch', 'hard', 'batch-local', 'no edge shorter than minEdge, whichever writer made or moved it'),
  row('clearance', 'batch', 'hard', 'batch-local', 'every vertex at least minEdge from every edge outside its one-ring'),
  row('one-vertex-per-point', 'batch', 'hard', 'batch-local', 'no two vertices share a lattice point'),
  row('simple-faces', 'batch', 'hard', 'batch-local', 'faces simple except declared antennae; no two edges cross'),
  row('nesting', 'batch', 'hard', 'batch-local', 'every face of level n + 1 has exactly one parent at level n, its boundary edges of level n + 1 or sub-edges of a level-≤ n edge'),
  row('placement-bound', 'batch', 'hard', 'batch-local', 'every vertex a batch places, re-seats or slides onto a coarser edge lies within 0.71 cm of that edge\'s route'),
  // The run clause read at every level between (N-s6-2, checks/M0-a-06-notes.md; C-0359): the encoder's constancy.
  row('level-consistency', 'batch', 'hard', 'batch-local', 'an edge\'s birth level is the lowest among its rows; no vertex coarser than everything at it; a finer vertex inside one run at every level between: its coarser edges exactly two, of one level, with identical rows of each level r from theirs to its own − 1 (of level ≤ 1 at r = 1)'),
  row('held-vertices', 'batch', 'hard', 'batch-local', 'no vertex of a warp or smoothing step\'s held set moved'),
  row('prepared-contacts', 'batch', 'hard', 'batch-local', 'a clear-region batch met finer geometry only at its prepared vertices, promoted exactly those and stripped their anchor names', 'M3a'),
  row('kept-content', 'batch', 'hard', 'batch-local', 'no finer face made by a stage before rederivesFrom was cleared, crossed, split or re-owned'),
  row('role-consistency', 'batch', 'hard', 'batch-local', 'every linear role forms its declared simple chains or rings; no structural role lost by an absorption or merge'),
  row('references-resolve', 'stage', 'hard', 'stage end, save', 'every stored reference resolves; every indexed role finds one vertex or edge set per ordinal; profiles\' knots on their chains in order; no geometry carries a dead entity'),
  row('frozen-base', 'stage', 'hard', 'at the freeze, at every pool size', 'every level\'s dynamic grid and every partition\'s tombstone set empty after the freeze\'s rebuild', 'M1'),
  row('index-freshness', 'batch', 'hard', 'batch-local', 'no index coarser than the batch written but its promotions and demotions; every changed static item tombstoned, its successor in its level\'s grid'),
  row('pool-scope', 'stage', 'hard', 'at the pool merge', 'no overlay wrote outside its scope; no two overlays, and no concurrent eager write, touched one base record', 'M1'),
  row('arena-isolation', 'batch', 'hard', 'by construction; debug-build assertion', 'a batch wrote only the arena its key names; no slot of one arena references another (the one-arena case now; across parts M3a / M6-U)', 'M3a'),
  row('seed-tiling', 'batch', 'hard', 'at the open; batch-local; at readBack; at a stored plan\'s carry', 'a transient arena\'s faces tile its seed rings and every fixed edge survives', 'M6-P'),
  row('face-corners', 'batch', 'soft', 'batch-local', 'face corners ≥ minFaceAngle: soft for mandatory chains (W_ACUTE_CORNER)'),
  row('face-corners-optional', 'batch', 'hard', 'batch-local', 'face corners ≥ minFaceAngle: hard for optional chains'),
  row('euler', 'ci', 'hard', 'CI (B-FUZZ, B-EDIT)', 'V − E + F = 1 + components per level'),
]);

/** A row's declaration by name; an unknown name is a programming error. */
export function rowNamed(name: string): RowDecl {
  for (const r of KERNEL_ROWS) if (r.name === name) return r;
  throw new Error(`invariants: no §3.10 row named ${name}`);
}

/** The rows of one scope, in table order. */
export function rowsOfScope(scope: Invariant['scope']): RowDecl[] {
  return KERNEL_ROWS.filter((r) => r.scope === scope);
}
