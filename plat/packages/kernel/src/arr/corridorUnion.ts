// corridorUnion(tx, l1Faces) (§3.4: "the corridor use of bandUnion: L2 half-corridor strips, junction wedges and built
// blocks for those L1 faces only (§3.7); a kept face inside them stays kept content nested in the L2 face that contains
// it (§3.3)"; §3.7 *The kerb, defined once*, *The same functions on every arena* (J-A12.31); §2.2 rule 1's L2 view).
// M0-a-09.
//
// §3.7: "`corridorUnion` commits exactly this geometry at L2: the kerb rings as `kerb` edges; the spine inside the band,
// already an L1 edge, splits it into the two half-corridor strips; a `corridor_split` edge from each junction vertex to
// the kerb corner separates the junction wedge; … the faces outside the band are the built blocks (a spine-less face is
// one built block, with no kerb or `corridor_split` edge)." The geometry is `kerb`'s — the one function, the same
// inputs, read on the same arena — so the block S8 cut on kerb(F) and the block S9 keeps are one face (§4.6, §13.2).
// The engine is bandUnion.ts's (`bandCore`); this file binds its corridor use.
//
// Readings (C-0212): `corridorUnion(tx, l1Faces, widths)` — the spines' half-widths reach it through the caller's
// `SpineWidths` (the kernel holds no entity record, §14); a batch of L2 only (E_LEVEL otherwise: §2.2 rule 1's L2 is
// the corridors' level); the kerb and corridor_split rows name the L1 face's owner (each kerb edge lies inside one L1
// face; a face with no owner is the caller's error); the strips, wedges and blocks keep the owner they inherit from F
// (§2.2 rule 4) until the stage re-owns them by `setOwner` — the Corridor and Junction entities are the stage's
// (S9, M1) — and `BandResult` names which is which. On any arena by its key: a tunnel's or a gallery's chain is a spine
// like a way's (J-A12.31); the underground parts' and raised parts' use is M6-U's and M3a's.
import { idOf, type FaceId } from '../arena/index.js';
import { enter, refuse } from '../faces/common.js';
import type { LineageHash } from '../hash/index.js';
import type { KernelResult } from '../num/index.js';
import { check } from '../tx/state.js';
import { kernelOp, type KernelOp, type Overlay } from '../tx/index.js';
import type { FaceRef } from '../types/index.js';
import { bandCore, l1FacesOf, type BandResult } from './bandUnion.js';
import type { SpineWidths } from './kerb.js';

/**
 * §3.4's `corridorUnion`: for those L1 faces only, kerb(F) committed at L2 — the kerb edges, the corridor_split edges
 * at the junctions, the half-corridor strips, junction wedges and built blocks (`BandResult`). Refuses E_LEVEL off L2,
 * and as the insertion refuses (E_KEPT beside kept content, §3.3), the batch put back as the op found it.
 */
export function corridorUnion(o: Overlay, l1Faces: FaceRef | readonly FaceId[], widths: SpineWidths): KernelResult<BandResult> {
  const { t, refused } = enter<BandResult>(o);
  if (refused !== null) return refused;
  if (t.level !== 2) return refuse('E_LEVEL', `corridorUnion commits the corridors at L2 (§2.2 rule 1), not in a batch of L${String(t.level)}`);
  const p = t.plat;
  const faces = l1FacesOf(p, l1Faces);
  return bandCore(t, faces, {
    widths,
    edgeRole: 'kerb',
    entityOf: (f) => {
      const h = p.faces[1].owner[f];
      check(h >= 0, `corridorUnion: the L1 face ${String(f)} has no owner for its kerb and corridor_split rows to name`);
      return idOf(p, h);
    },
    owner: null,
    vertexContacts: true,
  });
}

/** corridorUnion as a declared op (§3.3 *Two op forms*). */
export function opCorridorUnion(lineage: LineageHash, index: number, l1Faces: FaceRef | readonly FaceId[], widths: SpineWidths): KernelOp<BandResult> {
  return kernelOp('corridorUnion', lineage, index, (o) => corridorUnion(o, l1Faces, widths));
}
