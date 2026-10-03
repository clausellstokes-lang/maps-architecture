# Repair round 1 — kernel (§3 geometry kernel)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-kernel-r1; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/repair-kernel-r1`): VK0-04 — block written and closed; parse and dry apply checked. Done.

Issues given: VK0-04 (blocker, NUANCE-LOST, kernel; `verify-kernel-r0s.md`). Under J130 this round restores only what the
rewrite cut or changed. The archive's §3.5 row (`docs/archive/ARCHITECTURE-pre-coherence-2026-09-28.md` l. 3168) answered the
2017 cut routine's "unbounded recursion" with "recursion bounded by the class band and a depth cap, every rejection logged
(§4.6)", and its no-op with "`E_NOT_TWO_CROSSINGS` under exact contact rules — vertex grazes, overlaps and antennae defined,
slits are `connectHole` (§3.6)". The block below brings both back in E-14's pointer form and in the current terms. The class
band is the block-depth range, which the stop test reads and §4.6 step 1 states once. The depth cap is S8's declared
recursion-depth work limit (`StageDecl.workLimits`, §5.1 (5)'s `log2` law); reaching it is F-WORK. Every rejection is logged
because every rung taken writes a report line (§5.1 (3)). The contact rules and the slit are §3.6's `splitFace` contact
semantics. The verifier's required text is kept with three precisions: "step 1" (the block-depth range's one home), "S8's"
(the stage whose limit it is) and the contact-rule clause the rewrite dropped. Nothing else changes: the REPLACE body is the
live §3.5, byte for byte, apart from that one cell. Words: 377 → 418 (+41, all restored content).

=== REPLACE ### 3.5 Why this kernel closes the creators' failure classes ===
### 3.5 Why this kernel closes the creators' failure classes

A traceability table: each answer is stated once, at the home it points to, where its edges are too (§3.11).

| creator-admitted failure (via `docs/IMPROVEMENTS.md` O3 and the critics) | closed by |
|---|---|
| collapsed / intersecting edges on concave shapes (MFCG 87882877) | snap rounding, attraction, the clearance invariant and `splitFace`'s contact semantics (§3.6, §3.10) |
| silent no-op of the 2017 cut routine whenever a cut did not make exactly two crossings, and its unbounded recursion (`os-model.md` §13.4) | `E_NOT_TWO_CROSSINGS` under `splitFace`'s exact contact semantics, a slit being `connectHole` (§3.6); the face recursion bounded by the block-depth range, at which each face stops as a block (§4.6 step 1), and by S8's declared recursion-depth work limit (§5.1 (5), F-WORK), every rejection logged (§5.1 (3)); the bent cut's ladder (§4.6 step 8, §5.2 F-CUT) |
| null OBB / `rect` crash (61026228) | the OBB contract (§3.4); `snap` and `ratio()` (§3.2 (7)–(8)) |
| "two intersections with the same world position" (FTG 153121107) | one vertex per lattice point, attraction and shared stretches (§3.6, §3.10) |
| stale graph state after edits breaking district re-roll (FTG 153121107) | no record outside the kernel stores an arena slot (§2.2 rule 5) |
| hourglass / sliver footprints (FTG 133016301) | the invariant suite (§3.10); frontage-first construction (§4.7); sliver absorption (§3.6) |
| self-intersecting user strokes breaking the server (FTG 2026-03) | `insertChain`'s decimation, simple runs and validation at the authoring boundary (§3.6) |
| the NG 1.2.2 build's silent rotated-frame retries and its hole-aware bisector's two logged loops (a balance retry, up to 20 in random frames, then accepted; a restart when no far edge exists) (NG RA-3; P7) | the bent cut's declared ladder under operation-count work limits (§4.6 step 8, §3.3) |
| boolean "thorns" (VG 50688261) | booleans and buffers on the kernel's own arrangement (§3.7) |
| "weird steps" of per-edge buffers and "not so much concave ones" for shrinking (2017 author, `os-geometry.md` §2.1.4) | one kerb function; the half-plane inset only for uniform convex insets (§3.7) |
| skeleton "glitches in special cases" (MFCG 101173551) | §3.8's numeric contract, exact convex near-rectangle roofs, validator and typed downgrades |
| identity-keyed topology, un-serialisable state (OS §1.1) | indexed arenas, each serialised once (§3.9) |
| the NG 1.2.2 build's allocation hot spot in creating points and intersecting lines (its profile, G-R7) | struct-of-arrays, allocation-free intersection and orientation routines (§3.1), measured in M0 |
=== END ===
