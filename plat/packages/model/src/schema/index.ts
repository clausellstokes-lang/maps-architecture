// @plat/model's schema module (M0-m-01): the M0 record kinds, the schema order per kind the digest hashes (§6.2) and
// the fields M0 stages (J156 (2)).
export { M0_KINDS, type RecordKind, type RecordOf } from './kinds.js';
export { DIGEST_EXCLUDED, SCHEMA_ORDER, schemaOrder, type AttrOf } from './order.js';
export { STAGED, type StagedField } from './staged.js';
