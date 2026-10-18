// The kernel's per-level route digests (M0-d-04; §6.2, §3.3). The scaffold's fix round created this index empty
// (M0-s-01, build/m0-scaffold-fix1; C-0064); it belongs to M0-d-04. Readings: C-0194.
export {
  attachLevelDigests,
  changedEntities,
  DIGEST_BUCKETS,
  freshLevelDigests,
  hasLevelDigests,
  levelDigest,
  levelDigestBuilds,
  levelDigests,
  recomputeLevelDigest,
  updateLevelDigests,
  type LevelDigestView,
} from './levelDigest.js';
