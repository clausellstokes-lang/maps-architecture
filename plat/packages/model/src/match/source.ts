// The overlap-anchored kinds' candidate source over the kernel's spatial index (item M0-d-05b; §6.3 "take their
// candidates from the kernel's spatial index (§3.3) and compute the overlap on those candidates only"; M0-a-03's
// `query`): the fresh arena's level-n view answers a box with its faces and route edges, each list in its canonical
// order; the source reads the owners of those faces (a water body's L0 faces, an enceinte's), or the entities of one
// role's rows on those edges (a way's 'way' rows on L1), each id once in the order first met.
import { idOf, query, roleIdOf, rowKey, rowsOn, type Box, type Level, type Plat, type RoleName } from '@plat/kernel';
import type { Id } from '../types/index.js';
import type { CandidateSource } from './types.js';

/**
 * A candidate source reading M0-a-03's index of `p` at `level`: without `role`, the owners of the level's faces that
 * meet the box; with `role`, the entities of the role's rows on the level's route edges that meet it. The box is the
 * routine's (whole centimetres, as §3.3's query asks).
 */
export function indexCandidates(p: Plat, level: Level, role?: RoleName): CandidateSource {
  const roleId = role === undefined ? -1 : roleIdOf(role);
  if (role !== undefined && roleId < 0) throw new RangeError(`match: no role named ${role}`);
  return (box: Readonly<Box>): readonly Id[] => {
    const q = { minX: box.minX, minY: box.minY, maxX: box.maxX, maxY: box.maxY };
    const out: Id[] = [];
    const seen = new Set<Id>();
    const add = (id: Id): void => {
      if (seen.has(id)) return;
      seen.add(id);
      out.push(id);
    };
    if (role === undefined) {
      const owner = p.faces[level].owner;
      for (const f of query(p, p.key, level, q, { faces: true }).faces) {
        const h = owner[f];
        if (h >= 0) add(idOf(p, h));
      }
    } else {
      for (const h of query(p, p.key, level, q, { edges: true }).edges) {
        for (const r of rowsOn(p, 'edge', h)) {
          if (p.roles.kind[r] === roleId) add(rowKey(p, r).entity);
        }
      }
    }
    return out;
  };
}
