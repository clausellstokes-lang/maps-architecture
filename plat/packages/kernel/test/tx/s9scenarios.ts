// Hardening round S9's scenarios whose outcome the image path fixed (line 3; line 5 (b)'s warnings pin): each builds its
// arena, runs one batch and returns the batch's outcome as text — the commit record (JSON) or the refusal (code and
// detail). The same module ran on the RESUME head (the base mirror, the before-image path) to record the fixtures
// savepoint.test.ts compares against (`S9_IMAGE_PATH`); it reads no frame API, so it runs on either.
import { addRole, allocVertex, handleOf, removeRoleRow, roleIdOf, rowElement, rowsOfKey, type Plat } from '../../src/arena/index.js';
import { opSave, rollback } from '../../src/faces/common.js';
import { insertChain } from '../../src/insert/index.js';
import { err, type KernelResult } from '../../src/num/index.js';
import { removeEdges, setOwner, tx, type Overlay } from '../../src/tx/index.js';
import type { OpenTx } from '../../src/tx/state.js';
import { faceAt } from '../faces/support.js';
import { commit, framed, pt, spec } from './support.js';

type Pts = readonly (readonly [number, number])[];

function chain(o: Overlay, id: string, pts: Pts, knots: readonly number[] = []): KernelResult<unknown> {
  return insertChain(o, pts.map(([x, y]) => pt(x, y)), [{ role: 'way', entity: id }], 'mandatory', knots.length === 0 ? undefined : { knots: knots.map((index) => ({ index, role: 'junction', ordinal: 0 })) });
}

function must(r: KernelResult<unknown>, what: string): void {
  if (!r.ok) throw new Error(`s9scenarios: ${what} refused: ${r.code} ${r.detail}`);
}

/** The base arena: a frame, way:0 across it with two junction knots, way:1 across it, way:x splitting the lower-left block, an owner. */
export function base(): Plat {
  const p = framed();
  commit(p, 1, (o) => chain(o, 'way:0', [[0, 2000], [1000, 2000], [3000, 2000], [4000, 2000]], [1, 2]));
  commit(p, 1, (o) => chain(o, 'way:1', [[2000, 0], [2000, 4000]]));
  commit(p, 1, (o) => chain(o, 'way:x', [[0, 1000], [2000, 1000]]));
  commit(p, 1, (o) => setOwner(o, [faceAt(p, 1, 3000, 3000)], 'block:1'));
  return p;
}

/** The two junction rows of way:0, in row order. */
export function knotRows(p: Plat): number[] {
  return rowsOfKey(p, roleIdOf('junction'), handleOf(p, 'way:0'), 0).slice().sort((a, b) => a - b);
}

/** The outcome of a batch as text: the record's JSON, or the refusal's code and detail. */
function outcome(r: ReturnType<typeof tx>): string {
  if (!r.ok) return `refused ${r.code}: ${r.detail}`;
  return JSON.stringify(r.value.record);
}

/**
 * R1, a committed batch: an owner changed and changed back; a junction row removed and written back to its old values
 * (the same slot, from the free list); way:x removed (its block merged: a face slot freed) and inserted again (the slot
 * re-used); a fresh tower row on a frame vertex.
 */
export function r1(): string {
  const p = base();
  const f3 = faceAt(p, 1, 3000, 3000);
  const r = tx(p, spec(1), (o) => {
    must(setOwner(o, [f3], 'block:9'), 'setOwner block:9');
    must(setOwner(o, [f3], 'block:1'), 'setOwner block:1');
    const [r0] = knotRows(p);
    const v = rowElement(p, r0);
    const level = p.roles.level[r0] as 0 | 1 | 2 | 3 | 4;
    removeRoleRow(p, r0);
    addRole(p, v, { role: 'junction', entity: 'way:0' }, level);
    must(removeEdges(o, { role: 'way', entity: 'way:x' }), 'removeEdges way:x');
    must(chain(o, 'way:x', [[0, 1000], [2000, 1000]]), 'way:x again');
    const corner = rowElement(p, knotRows(p)[1]);
    addRole(p, corner, { role: 'tower', entity: 'tower:1' }, 1);
    return { ok: true as const, value: null, warnings: [] };
  });
  return outcome(r);
}

/**
 * R2, a refused batch: way:0's two junction rows freed, the higher first (so the batch's log names the higher row
 * first), then taken again — the lower by a junction row on a fresh isolated vertex A, the higher by one on B — each row
 * at L2 on an L1 vertex, so each vertex is coarser than every row at it: two level problems, the refusal naming the
 * first vertex the sweep logged.
 */
export function r2(): string {
  const p = base();
  const r = tx(p, spec(1), () => {
    const [lo, hi] = knotRows(p);
    removeRoleRow(p, hi);
    removeRoleRow(p, lo);
    const a = allocVertex(p, pt(500, 500), 1);
    const b = allocVertex(p, pt(3500, 3500), 1);
    const ra = addRole(p, a, { role: 'junction', entity: 'j:A' }, 2);
    const rb = addRole(p, b, { role: 'junction', entity: 'j:B' }, 2);
    if (!(ra === lo && rb === hi)) throw new Error(`s9scenarios: the free list gave rows ${ra}, ${rb}, not ${lo}, ${hi}`);
    return { ok: true as const, value: null, warnings: [] };
  });
  return outcome(r);
}

/**
 * W, a committed batch whose op frame rolled back an attracted insertion: one attracted insertion before the frame
 * (W_ATTRACTED counted once), a second inside the frame (counted twice), the frame rolled back, the batch committed.
 */
export function w(): string {
  const p = framed();
  const r = tx(p, spec(1), (o) => {
    must(insertChain(o, [pt(1000, 1000), pt(1000, 1010), pt(2000, 1000)], [{ role: 'way', entity: 'way:a' }], 'mandatory', { pinned: [0, 1] }), 'way:a');
    const t = o as unknown as OpenTx;
    const s = opSave(t);
    must(insertChain(o, [pt(1000, 3000), pt(1000, 3010), pt(2000, 3000)], [{ role: 'way', entity: 'way:b' }], 'mandatory', { pinned: [0, 1] }), 'way:b');
    rollback(t, s, err('E_INVARIANT', 'scenario: rolled back'));
    return { ok: true as const, value: null, warnings: [] };
  });
  return outcome(r);
}

/** The scenarios by name. */
export const SCENARIOS = { r1, r2, w } as const;
