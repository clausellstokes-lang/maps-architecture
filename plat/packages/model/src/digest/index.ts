// @plat/model's digest module (M0-d-04; §6.2, §3.3, §2.8): the model digest's leaves, layer nodes and root —
// maintained along the commit record, finalised on read, recomputed from nothing as the CI oracle — the records digest,
// the canonical text serialisation (goldens only, never the digest path), the synthetic CITY workload and the bars'
// harness. The scaffold created this index empty (M0-s-01, C-0013). It also carries @plat/model's re-export of the
// kernel's hash functions under their design names beside the digest (§14; C-0004, C-0066). Readings: C-0194.
export { fmix32, H128, H32 } from '@plat/kernel';
export { canonicalText } from './canonical.js';
export { geomRefOf, writeValue, type GeomRefLike } from './encode.js';
export {
  DIGEST_LAYERS,
  digestLeaf,
  LAYER_OF,
  leafRefs,
  type DigestEntry,
  type DigestLayer,
  type GeometryOf,
  type LeafIdentity,
} from './leaf.js';
export { ModelDigest, type DigestSwitches, type OracleResult } from './model.js';
export {
  RECORDS_OUTSIDE,
  RECORDS_SCHEMA_ORDER,
  RECORDS_TOWN,
  RecordsDigest,
  recordsLeaf,
  type RecordsEntry,
  type RecordsKind,
} from './records.js';
export { buildDigests, DIGEST_BUDGETS, timeDigest, type DigestTimingRecord } from './timing.js';
export { CITY_COUNTS, rederiveDistrict, syntheticCity, type SyntheticCity } from './workload.js';
