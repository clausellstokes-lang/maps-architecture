// Test support for the M0 close gate's kernel rows (check/M0-world-sites-gate; docs/build/M0-world-sites-gate.md
// K1, K2, K5, K6, K8, K13): a small dressed arena under any PlatKey — its outer ring, one L1 way across it, one L2
// lane beside the way and one junction vertex row on the way's west end — so the block's routes chunk and one L2
// partition chunk, a face owner, an edge role and a vertex role all exist under a key whose layer and part the test
// chooses. The entity ids carry the key's name, so two arenas never share an entity. Readers: the arena's own
// `createPlat`, M0-a-03's index, M0-a-06's transaction through tx/support's `commit` (its spec takes the key).
import { addRoleRow, createPlat, intern, LEVELS, roleIdOf, type Plat } from '../../src/arena/index.js';
import { keyName } from '../../src/arena/resolve.js';
import { recomputeLevelDigest } from '../../src/digest/index.js';
import { attachIndex } from '../../src/index/index.js';
import { insertChain } from '../../src/insert/index.js';
import type { Frame } from '../../src/num/index.js';
import { setOwner } from '../../src/tx/index.js';
import type { PlatKey } from '../../src/types/index.js';
import { FRAME } from '../arena/support.js';
import { faceAt } from '../faces/support.js';
import { CELLS } from '../insert/step1-2/support.js';
import { commit, pt, vertexAtPoint } from '../tx/support.js';

export { CELLS, FRAME, keyName };

/** The entity ids of the dressed arena under `key` (one set per key; a tag the key's name with `/` written `-`). */
export function idsOf(key: PlatKey): { terrain: string; way: string; lane: string; junction: string } {
  const tag = keyName(key).replace('/', '-');
  return { terrain: `terrain:${tag}`, way: `way:${tag}`, lane: `lane:${tag}`, junction: `junction:${tag}` };
}

/** An empty indexed arena under `key` over `frame` (the kernel tests' frame by default). */
export function emptyOn(key: PlatKey, frame: Frame = FRAME): Plat {
  const p = createPlat(key, frame);
  attachIndex(p, { gridCellCm: CELLS });
  return p;
}

/**
 * The dressed arena under `key`: the 4000 × 4000 outer ring (L0, `margin` of its terrain), the way across it at
 * y = 2000 (L1, owner of nothing — its faces keep no owner), the lane from (1000, 500) to (1000, 1500) (L2, `kerb`),
 * the north face owned by `terrain` at L1 (an owner for a FaceRef), and the junction row on the way's west end (L1).
 */
export function dressedOn(key: PlatKey, frame: Frame = FRAME, ids = idsOf(key)): Plat {
  const p = emptyOn(key, frame);
  const over = { key };
  commit(p, 0, (o) => insertChain(o, [pt(0, 0), pt(4000, 0), pt(4000, 4000), pt(0, 4000)], [{ role: 'margin', entity: ids.terrain }], 'mandatory', { closed: true }), over);
  commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: ids.way }], 'mandatory'), over);
  commit(p, 2, (o) => insertChain(o, [pt(1000, 500), pt(1000, 1500)], [{ role: 'kerb', entity: ids.lane }], 'mandatory'), over);
  commit(p, 1, (o) => setOwner(o, [faceAt(p, 1, 2000, 3000)], ids.terrain), over);
  addRoleRow(p, vertexAtPoint(p, 0, 2000), roleIdOf('junction'), intern(p, ids.junction), 1, 0);
  return p;
}

/** The five per-level digests recomputed from nothing, as hex words. */
export function digestsOf(p: Plat): string[] {
  return LEVELS.map((l) => recomputeLevelDigest(p, l).map((w) => (w >>> 0).toString(16).padStart(8, '0')).join(''));
}

/** Two byte arrays, equal? */
export function sameBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}
