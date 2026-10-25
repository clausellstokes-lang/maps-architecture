// The kernel's shared types, re-exported by @plat/model under their design names (C-0112 (4); M0-m-01). Declared once,
// in @plat/kernel — M0-a-01's kernel/src/types (the unit brands, ids, keys, points, the ref forms, the profile, the
// invariant row, the two registry ids, the stream options) and M0-d-02's kernel/src/hash (Hash64, Hash128,
// LineageHash) — and never redeclared here, so every reader above the kernel imports them from @plat/model as §2.8,
// §2.9 and §14 place them. Layer, RoleName, RoleKey and Order are the prerequisites C-0134 (9) declares beside them.
export type {
  // units (§2.1, §2.8)
  Cm,
  M,
  Cdeg,
  CmArray,
  // ids, keys and the two registry ids (§2.1, §2.2, §2.9, §6.1, §14)
  Id,
  Handle,
  Level,
  Layer,
  PlatKey,
  Seed,
  ConcernId,
  StageId,
  // points (§2.2, §2.8)
  LatticePoint,
  PointCm,
  Point,
  VecCm,
  Polygon,
  PolygonCm,
  // the ref forms, the vertex signature and the chain profile (§2.2 rule 5, rule 7; §2.7's Order)
  RoleName,
  RoleKey,
  FaceRef,
  ChainRef,
  EdgeSetRef,
  VertexRef,
  StretchRef,
  GeomRef,
  VertexSig,
  Order,
  ChainProfile,
  // the invariant row and the stream options (§5.3, §6.1, §14)
  Invariant,
  StreamOpts,
  // the hash types (§2.8)
  Hash64,
  Hash128,
  LineageHash,
} from '@plat/kernel';
