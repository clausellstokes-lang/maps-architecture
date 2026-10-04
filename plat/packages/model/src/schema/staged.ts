// The record fields M0 stages (J156 (2); §4b; M0-m-01, C-0142 (2)): every field the design declares on an M0 record
// that the record does not carry at M0, with the milestone that declares it and the reason. A required field whose
// writer is a later milestone's stage is staged rather than filled with a stand-in value, so the record a later
// milestone completes forces every writer to fill it. test/schema/ holds the list against the design's field lists.

/** One staged field: the record (its design name), the field, the milestone that declares it, and why. */
export interface StagedField {
  record: string;
  field: string;
  milestone: string;
  reason: string;
}

const S7 = 'S7 fortification furniture (§4.8): the band, towers and gatehouses are M1’s (C-0033; §4b)';

/** Every staged field of an M0 record, by record in §2's order. */
export const STAGED: readonly StagedField[] = Object.freeze([
  { record: 'Terrain', field: 'geology', milestone: 'M1', reason: 'the geology flag (§4b; C-0048); its reader is II.7.6’s cavern rule' },
  { record: 'Terrain', field: 'mining', milestone: 'M1', reason: '`Terrain.mining` (§4b; C-0048): written by S1 (10) with the resources' },
  { record: 'Way', field: 'surface', milestone: 'M2b', reason: 'derived at S10a’s end by the way-surface rule, built at M2b (§4.1; V01 §3.7.3)' },
  { record: 'Way', field: 'slopeP95', milestone: 'M1', reason: 'written by S9 for every way (§2.4); S9 is M1’s (§4b)' },
  { record: 'District', field: 'boundary', milestone: 'M1', reason: 'a derived view over `seams`, never serialised (§2.5); its readers are V01 §2.3’s and II.5’s' },
  { record: 'District', field: 'character', milestone: 'M1', reason: 'written by S12c and each epoch’s character step (§4.5 (2)); derived, outside the model digest' },
  { record: 'District', field: 'venueMix', milestone: 'M1', reason: 'the district’s content mix: S7b’s allocation (§4.5 S7b) is M1’s (§4b)' },
  { record: 'District', field: 'prosperity', milestone: 'M1', reason: 'the district’s field mean and band: read from field pass 2 and S12c (§4.5), M1’s' },
  { record: 'District', field: 'bandRange', milestone: 'M1', reason: 'derived by S10a (§4.5 (5)); outside the model digest' },
  { record: 'District', field: 'pressure', milestone: 'M1', reason: 'model data written only by epochs (§4.5 (8)); declared with the district record’s completion' },
  { record: 'District', field: 'buildingScale', milestone: 'M1', reason: 'FTG’s footprint knob, read by S11 (§4.7 S11)' },
  { record: 'District', field: 'materialOverride', milestone: 'M1', reason: '§2.6’s MaterialRow, read by S11’s buildings (§4b: S11)' },
  { record: 'District', field: 'allocation', milestone: 'M1', reason: 'the district’s Allocation record, written by S7b (§4.5 S7b)' },
  { record: 'District', field: 'subDistricts', milestone: 'M1', reason: 'written by S10a’s block allocation (§4.7 S10a)' },
  { record: 'Block', field: 'frontages', milestone: 'M1', reason: 'the Frontage records S9 writes with the kerb edges (§2.5); S9 is M1’s (§4b)' },
  { record: 'Enceinte', field: 'kind', milestone: 'M1', reason: S7 },
  { record: 'Enceinte', field: 'closure', milestone: 'M1', reason: 'S5a’s barrier classification beyond the ring (§4.4; §4b: S1 (2) coast)' },
  { record: 'Enceinte', field: 'anchors', milestone: 'M1', reason: 'open chains anchored on a barrier (§4b)' },
  { record: 'Enceinte', field: 'arcs', milestone: 'M1', reason: 'the closing arcs of a shore or barrier closure (§4b)' },
  { record: 'Enceinte', field: 'waterfront', milestone: 'M1', reason: 'the waterfront policy (§4b)' },
  { record: 'Enceinte', field: 'placement', milestone: 'M1', reason: 'aroundStage walls with the later stages’ rings (§4.4); the M0 trace is stage 1’s' },
  { record: 'Enceinte', field: 'band', milestone: 'M1', reason: 'L3 half-bands built by bandUnion at S10’s step (0) (§4.7; §4b)' },
  { record: 'Enceinte', field: 'glacis', milestone: 'M1', reason: S7 },
  { record: 'Enceinte', field: 'walkCm', milestone: 'M1', reason: S7 },
  { record: 'Enceinte', field: 'heightCm', milestone: 'M1', reason: S7 },
  { record: 'Enceinte', field: 'stretchClass', milestone: 'M1', reason: 'g item 106 (c)’s graded stretches, V11’s walls.barriers rows' },
  { record: 'Enceinte', field: 'base', milestone: 'M1', reason: 'the base_knot profile S7 places (§2.7)' },
  { record: 'Enceinte', field: 'intervallum', milestone: 'M1', reason: S7 },
  { record: 'Enceinte', field: 'material', milestone: 'M1', reason: S7 },
  { record: 'Enceinte', field: 'supersededBy', milestone: 'M1', reason: 'item 8’s contraction (§4.11); declared with the record’s completion' },
  { record: 'Enceinte', field: 'pathway', milestone: 'M1', reason: 'volume 6’s fortification phase; declared with the record’s completion' },
  { record: 'Enceinte', field: 'underuseSince', milestone: 'M1', reason: 'volume 6’s fortification phase; declared with the record’s completion' },
  { record: 'Enceinte', field: 'condition', milestone: 'M2b', reason: 'a stretch-state profile: the Write protocol lands at M2b with its first writer (C-0045)' },
  { record: 'Enceinte', field: 'conditionMaterial', milestone: 'M2b', reason: 'written with `condition` (C-0045)' },
  { record: 'Enceinte', field: 'conditionEpoch', milestone: 'M2b', reason: 'written with `condition` (C-0045)' },
  { record: 'Enceinte', field: 'laidAt', milestone: 'M3a', reason: 'outside the model digest; read by §5.3’s law-1 row, which lands with the raised ways (§4b)' },
  { record: 'Enceinte', field: 'towers', milestone: 'M1', reason: S7 },
  { record: 'Enceinte', field: 'moat', milestone: 'M1', reason: 'the moats carved at S3 and S5a (§4.2, §4.4); outer moats are M1’s (§4b)' },
  { record: 'Gate', field: 'heights', milestone: 'M1', reason: 'the gatehouse’s Heights (§2.6), S7’s (C-0033)' },
  { record: 'Gate', field: 'footprint', milestone: 'M1', reason: 'the gatehouse’s faces, S7’s (C-0033)' },
  { record: 'Seam', field: 'amendments', milestone: 'M1', reason: 'SeamAmendment is M1’s (C-0046, C-0145); S8’s lane ends are `baseLane` portals at M0' },
  { record: 'Seam', field: 'boundarySamples', milestone: 'M1', reason: 'the field samples of the full SeamContract (C-0046; II.1)' },
  { record: 'SeamEdge', field: 'frontageSide', milestone: 'M1', reason: 'II.1 names it without a type; its reader is the close-up (II.4)' },
]);
