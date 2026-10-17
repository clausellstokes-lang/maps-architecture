# The lens closing-pass critic — gap list (workflows/41, critic seat)

> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat check/lens-o-critic; to be retrovalidated overall at the next opportunity (owner, 2026-10-17, J375)

The completeness critic of amendments o as applied (docs/validation/coherence/lens-o.md), recorded verbatim. Its six gaps are carried by amendments p (workflows/42-lens-final.js); J387 rules gap 1.

Six gaps remain. One is medium: gap 6 is not closed the way J386 ruled it. The other five are low or low-medium. The rest of what I was asked to check holds.

**What holds**
- **Gaps 1–5 and 7–14:** each is closed in the applied texts as its fix or J386 says. Every one of file o's new texts sits in the target at the line `docs/validation/coherence/lens-o.md` records (V13 md5 `3320f3ca…`, the base `96598bab…`), and the bundle check reports up to date [OBSERVED].
- **J380's trade words:**
  - production, exports, imports and services: the "production and need" row reads `LensFacts.economy[].produces/.exports/.imports/.services`, keyed by `LensGood` (V13:3233, :838-839).
  - consumption: carried by `needs`, the host's necessity imports and trade dependencies, plus the food coverage ring (`foodCoverage`, :3234).
  - the caravan flows: the supply arrival row with its good, and the channels (:3235-3237).
  - Each is asked of the host in H23 (:3669), tested by T-V13-56 (:3529) and decided by J-V13.102 (:3787) [OBSERVED].
- **J380's faith words:**
  - local ranking: `shares[].standing` in the mixture row (:830, :3291).
  - global ranking: `realmRank` in the global rank row (:832, :3290).
  - global piety: `realmPiety` (:831, :3311), with local piety drawn as "piety and contest" (:3292).
  - Each is in H23, T-V13-54 and J-V13.103 [OBSERVED].
- **Agreement across documents:** V14's SE3 and T-V14-33, the brief, the base's §1.1, §2.9 keys and §16 totals, and the proposal's §6 agree with V13, except where noted below.

**Material gaps**

1. **MEDIUM: gap 6 is not closed as J386 rules it.** J386 answers the critic's question "the premium entitlement, or every new campaign?" with "EVERY new campaign … canonized at birth", because J384 (6)'s purpose "fails if only premium campaigns get it" (docs/PROGRESS.md:445) [STATED].
   - The applied texts hand that choice back to the host: H22 says "whether to lift that entitlement for the birth canon remains the host's choice" (V13:3668); likewise J-V13.100 (:3785), the §11 ruling (:4215-4218) and the brief, "(its choice)" (brief :110, :193) [OBSERVED].
   - A host builder following H22 may gate the birth canon on the premium entitlement, which is the outcome J386 ruled out [INFERRED].
   - H22's "the banner saying why" has nothing to carry the reason: `HostRegime` (V13:819-820) has no entitlement or reason field [OBSERVED].
   - The brief's Part C states the birth canon as ruled but never says it waits on Q4 (V13:4205-4207 says it does) [OBSERVED].
   - Fix:
     - Strike "whether to lift that entitlement … remains the host's choice … the banner saying why" from H22.
     - Strike "(the host deciding whether its premium canonize entitlement gates it; where it does, …)" from J-V13.100.
     - Strike "— the host deciding whether its premium canonize entitlement gates it —" from the §11 ruling.
     - Strike "(its choice)" from brief :110 and :193, and add to the brief's Q4 line "(H22's birth canon also waits on it)".
     - If the session keeps the hedge instead, record it as a vetoable J-row that departs from J386, add `HostRegime.canonWithheld?: string` (the host's reason word) to H23's regime list, and add a T-V13-47 clause that the banner shows it.

2. **LOW-MEDIUM: the base names the plate cache but never declares it.**
   - The base's `Document` (ARCHITECTURE.md:3852-3880) has no `lensPlates`, while §7.7 (:12896), the replay paragraph (:17681) and the new §2.9 keys (:4198) all rely on the world document's plate cache [OBSERVED].
   - BCR-V13-38 (V13:4131) and BCR-V13-39 (:4138) have no amendment item, and file o itself says "no BCR ledger exists" (AMENDMENTS-o:119). So nothing routes them to admission [OBSERVED].
   - Fix: add a base item, as item 875 did for the keys, appending BCR-V13-38's `lensPlates?: LensPlate[]` line beside `derived` in §2.9's `Document`. Record BCR-V13-30 – -36, -38 and -39 as pending in one ledger row (PROGRESS or HANDOFF) that the coherence pass reads.

3. **LOW-MEDIUM: the player-picture verdict rule has no test.**
   - §5.1 says a debatable cell stays debatable "unless a fight verdict the audience is shown decides it" (V13:2954). This is new in file o (item 845 (a)).
   - Neither T-V13-41 (s) (:3514) nor T-V13-50 (:3523) checks it. A DM-only verdict deciding a player's cell would reveal that verdict to the players [OBSERVED; INFERRED].
   - Fix: add to T-V13-41 (s): "in a player picture with M dark, a cell held by a verdict the audience is not shown (DM-only, or unknown under `audienceKnowledge`) stays debatable; one it is shown holds it as in the DM's picture."

4. **LOW: the conditional legend notes cannot be written as rows, and §5.8 (3) is now stale.**
   - `LensLayer.legend.notes` is a plain `string[]` (V13:814), and `GateExpr` (:807) has no `born` or `intensity` field. So the small-seat note's gate on the conservative intensity (§5.9 (5) :3259; T-V13-47 :3520), and the born-campaign and authorship notes, cannot be expressed as `world.lens` rows [OBSERVED].
   - §5.8 (3) (:3081) still ties "its small seats that cannot grow" to "a born campaign", which contradicts the intensity gate file o adopted (review issue 12) [OBSERVED].
   - Fix:
     - `legend.notes: { text: string; when: GateExpr }[]`.
     - `GateExpr` gains `born?: boolean; intensity?: string`.
     - §5.8 (3): "…its small seats that cannot grow — where the regime runs the host's conservative intensity, V13 §5.9 (5) —".

5. **LOW: the index's milestone text is stale, and file o's list of stale lines misses some of it.**
   - INDEX.md :109 (the diagram), :133 (the dependency row) and :147 still say "M-W0 … M-W4", and the index has no M-W5 entry. INDEX.md is one of the bundle's sources, so the bundle carries this text [OBSERVED].
   - File o's "Not items" lists only :39 and :248 (AMENDMENTS-o:128), so a refresh working from that list would miss these three lines [OBSERVED].
   - Fix: add INDEX.md:109, :133 and :147 to the refresh list. :133 should read "M-W0 – M-W5 (V13) … M-W5 the lenses after M-W2"; :109 and :147 likewise.

6. **LOW: the proposal's §3.8 contradicts the lens design.**
   - It says that for religions and the economy cycle, "it sends the facts and the sway projects them" (proposal-world-native.md:143).
   - V13 §5.8 and §5.9 draw those systems as lenses and refuse "a god's region or a border of faith" (V13:3318-3320). The sway projects politics only [OBSERVED].
   - Fix: "…are not generated here; their spatial footprint is drawn by V13 §5.8's lenses over the facts the host sends — never projected by the sway, never generated (J379, J380, J384)."

I wrote no files.