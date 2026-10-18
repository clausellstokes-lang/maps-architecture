# M0 close gate — the world, sites and hydrology rows (build spec; 2026-10-17)

This spec is an implementer-side input: it restates, in the build's own words and with pointers only into
`docs/ARCHITECTURE.md` and `plat/`, the gate the session ruled on 2026-10-16 under the owner's delegation (vetoable). It
asks M0 to prove that the kernel and the model do not foreclose the world, site, encounter and hydrology work designed
after M0. **No row adds a feature.** A kernel row (K) must be resolved before M0 commits, or carried to M1's API pass
with its reason; a model row (M) is recorded now and is M1's to change. Where a row can be a test, the test joins M0's
exit suite. The checker's report is `plat/docs/build/checks/M0-world-sites-gate.md`: every row CONFIRMED or PLAUSIBLE
with its evidence (file and line, or the test), each failure marked fixed-in-M0 or carried-to-M1, the seat signed in
`plat/CLEAN-ROOM.md`. M0 does not close without it. No row is closed by changing the design to match the code without a
row of `plat/docs/build/choices.md`.

## Kernel rows (K1–K14)

| # | the row | verification |
|---|---|---|
| K1 | The `Layer` type's codes are append-only in the level digest and the block format; no code path assumes `'ground'` is the root of every document | append a fourth value in a test registry; every golden digest byte-identical; grep every switch on `Layer` |
| K2 | `PlatKey.part` round-trips through encode and decode with independent frames and lattice specs per part; nothing assumes parts are dense from 0 | encode and decode a two-part arena; resolve every reference form against each part |
| K3 | `Frame` is purely local (origin and extents); no digest hashes an absolute position outside the frame | read `num/` (Frame) and `digest/` |
| K4 | Every persistent reference form (`FaceRef`, `ChainRef`, `EdgeSetRef`, `VertexRef`) resolves against a separately supplied `PlatKey`; none embeds one | read `types/refs.ts`, the façade's `resolve` |
| K5 | The role registry is append-only without changing any existing document's digest; `LINEAR_PARTS` is extensible per transaction through `TxEnv.chainParts` | append a role in a test; goldens unchanged |
| K6 | The concern and stage registries are append-only without renumbering; a stream keyed by a new concern and stage is independent of every existing stream | append; existing stream outputs unchanged |
| K7 | A rank function (`TxEnv.rankOf`) can order stages from two registries without ambiguity | read `tx/`, the façade |
| K8 | Encode then decode is digest-equal for every arena kind including parts ≥ 1; `compactSlots` is deterministic | the `reattach` golden extended to a part ≥ 1 |
| K9 | The transient-arena stub's designed contract (§3.4) admits an arena whose owner is a view id, not a document | read §3.4, `facade/notBuilt.ts`; no type change needed if `owner: Id` admits `view:<hash>` |
| K10 | Every persisted block names every version it depends on (`ARENA_BLOCK_FORMAT`, `ROLE_REGISTRY_VERSION`, registry versions, `ENGINE_VERSION`) | read `io/`, `digest/` |
| K11 | No kernel algorithm branches on a domain role beyond the documented defaults (`plot_line`, `claim`, `corridor_split`, `kerb`, `invisible`) | grep `kernel/src/` for role-name literals |
| K12 | The commit journal records the stage, the concern and the inputs a stage read, so a reason record can be reconstructed for every kernel-transaction stage | read `tx/`, `CommitRecord`; if absent, carry to M1 with the smallest addition named |
| K13 | No digest, reference form, invariant or kernel operation reads or assumes an elevation; `Frame` and the lattice are two-dimensional only | grep for any z-like field in `kernel/src/`; read `num/`, `digest/`, `types/refs.ts` |
| K14 | An arena's block loads under a caller-named `PlatKey` with an entity-id map (`DecodeOptions.from?: PlatKey`, `DecodeOptions.ids?: (id) => id`; `io/decode.ts:274` today refuses a chunk of another arena), printing and digesting equal to the same content built under the new key — adoption's arena re-key (V14 §3.9 (e), §2.8; J395 C8); carried to M1's API pass with K10, K12, M1, M2, M4; first reader M-SITE-F's SE6 | at M0: read `io/decode.ts` and `io/types.ts` (`DecodeOptions`), the row recorded carried-to-M1 (nothing built at M0); at M1's API pass: K2's two-part arena encoded under one key, its block decoded under a new `PlatKey` with an id map, its printing and digests equal to the same content built under the new key |

**Carried to M1's API pass.** The 2026-10-17 check carried K10, K12, M1, M2 and M4 (`checks/M0-world-sites-gate.md`);
K14 joins them as written (the M0 coverage verdict's C8, J395; file u item 953): the carried set is K10, K12, K14,
M1, M2, M4.

## Model rows (M1–M13)

| # | the row | verification |
|---|---|---|
| M1 | The address form (`model/src/identity/address.ts`) has, or can take by append, a document or world namespace segment, so addresses from two documents cannot collide | read `address.ts`, `lineage.ts`, `mint.ts`; if not, an M1 item |
| M2 | The river carve keeps its delta or the pre-carve heightfield recoverable; water surfaces are separable from the heightfield | read `site/src/hydro/carve.ts`, `surface.ts`, `terrain/types.ts` |
| M3 | The terrain datum is read through one accessor | read `site/src/terrain/` and every reader of `datumCm` |
| M4 | The water table is read through one function | the readers §2.6 names (basements, crypts) |
| M5 | S1's terrain and water parameters are one input record with one entry point | read S1's entry in `site/` |
| M6 | A placement record (origin, bearing) can be reserved per arena set without touching any arena digest | model |
| M7 | An anchor record (address, document reference, knowledge flag) can be reserved | model |
| M8 | A reason record can be reserved per generated fact | model |
| M9 | Every drawable record kind declares a base elevation and a top, or a surface, or is listed flat with a reason; the gap list is the finding | read the model's record types against §8.4 |
| M10 | Every vertical-link record (stair, shaft, ramp, trapdoor, access) carries an elevation at both ends | model, the records of §2.6–§2.7 |
| M11 | The projection and the vertical exaggeration are view state outside the document hash; the style store's schema admits a projection family | §2.9 view state, §8.2 styles |
| M12 | The hinterland unit's L3 access faces (an outside plot's `driveway`, a decoration's `path`) can begin at a point on a reservation's boundary — the face's origin a point, not a plot or a decoration id — without a new role, layer or digest change (V14 §3.9 (g), BCR-V14-26; J393) | read the hinterland unit's face types and S12's operator; if the origin is typed to a plot or a decoration, an M1 item |
| M13 | S4's router admits a way between two given points — a charter road's point on a frame's ring and an entrance point (a gate where the enclosure has one) (M0-c-03's deferred two-point road) — and a way's end at the frame ring carries its external bearing, so V14 §3.6 (f)'s way from a world site's charter road to its gate is not foreclosed (J393); nothing is built at M0 | read M0-c-03's `defers` (the two-point road named with its milestone) and `Way.to`'s external `bearing` form (§2.4; C-0236 (18)); if a way's end cannot be given as a point, an M1 item with the smallest addition named |
