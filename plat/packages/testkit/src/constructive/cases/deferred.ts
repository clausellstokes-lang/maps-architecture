// The two §13.1 (2) bullets whose every fixture lands after M0 (C-0038): *kept content, carves and water edits*
// (§3.3's clear regions, §4.11's footprints — M3a, where the carve fixtures "confirm these rules", §3.3) and
// *stretch-state writes* (§2.2 rule 5's Write — M2b, with their writers, C-0045). One stub per fixture of the
// bullet, each returning `deferred` with its tag, so the runner counts them and the bar is re-run whole there.
import { deferredCase } from '../draw.js';
import type { ConstructiveCase, ConstructiveExpect } from '../types.js';

const KEPT = '§13.1 kept content, carves and water edits';
const STRETCH = '§13.1 stretch-state writes';

const kept = (id: string, clause: string, expect: Partial<ConstructiveExpect> = {}): ConstructiveCase =>
  deferredCase({
    id,
    class: 'kept-carves-water',
    milestone: 'M3a',
    source: KEPT,
    ops: ['tx', 'clearFiner', 'insertChain'],
    expect: { outcome: 'ok', holds: ['hard-invariants'], clause, ...expect },
  });

const stretch = (id: string, clause: string): ConstructiveCase =>
  deferredCase({ id, class: 'stretch-state-writes', milestone: 'M2b', source: STRETCH, ops: ['retypeEdges', 'sampleProfile'], expect: { outcome: 'ok', holds: ['hard-invariants', 'round-trip'], clause } });

export const DEFERRED_BULLET_CASES: readonly ConstructiveCase[] = Object.freeze([
  kept('kept/lane-into-kept-content', 'an L1 lane into a face holding kept L3 content of an earlier stage (E_KEPT)', { outcome: 'refused', code: 'E_KEPT', holds: ['version-kept'] }),
  kept(
    'kept/canal-across-district',
    'a canal across a CITY district that cuts a lane whose remainder is pruned and re-routes a primary — every face outside its footprint byte-identical except the seam exception, its L0 channel attracting onto exactly its prepared vertices, each deck carrying deck beside way',
  ),
  kept('kept/course-knot-and-river-move', 'a course-knot move and a river move across a street grid, with the same footprint and contact assertions (§7.3 (b))'),
  kept(
    'kept/canal-across-wall',
    "a canal crossing a walled CITY's wall between two towers — no E_KEPT, no E_LEVEL, every face outside the footprint byte-identical less the seam exception, the water gate's Gate.banks on its two gate_end vertices",
  ),
  kept('kept/outer-moat-s5a', 'an outer moat carved at S5a (§4.4) — every face outside its footprint byte-identical less the seam exception, attraction onto exactly its prepared vertices, every indexed role unique per ordinal'),
  kept('kept/carve-touches-finer-edge', 'a carve chain that touches a finer edge away from its prepared vertices (E_LEVEL inside the clear region, E_KEPT outside)', { outcome: 'refused', code: 'E_LEVEL', holds: ['version-kept'] }),
  kept(
    'kept/canal-glacis-and-river-walled-town',
    "a canal across an open enceinte's glacis line and a river moved through a walled town — every indexed role unique per ordinal, Gate.banks resolving to its two gate_end vertices, no anchor contact name left",
  ),
  kept('kept/river-moved-from-quay-and-wall', 'a river moved away from a quay-lined and a walled bank — the quay and wall edges back at L1, the L0 view land and water only, the deck left over land at the way’s level after F-REDERIVE'),
  kept('kept/deck-bank-width-knot', 'a deck whose bank vertex also carries a width knot, removed by F-REDERIVE — the vertex ends unpinned, its knot kept'),
  kept('kept/new-water-frame-corner', "new water across a corner of the frame — the border's stretch between its two contact points, the corner included, unchanged and closed"),
  kept('kept/preparation-permuted-ops', 'a declared preparation batch placing two contact names on one entity, its ops permuted — identical ordinals (the allocation rule, §3.3 rule 2)'),
  stretch(
    'stretch/retaining-wall-writes',
    'random writes on open and closed chains that already carry a profile — each StretchRef inside an existing run, across one or more existing knots, ending on an existing knot’s vertex, and over the whole chain — for RetainingWall.state; the undo restores every profile byte for byte',
  ),
  stretch('stretch/enceinte-three-profiles', "an enceinte's three parallel profiles (condition, conditionMaterial, conditionEpoch) written in one batch: knot rows in ordinal order from 0, no ordinal held twice, no knot vertex dissolving"),
  stretch('stretch/negative-control', 'a negative control — the dropped knots stripped last — fails the bar'),
]);
