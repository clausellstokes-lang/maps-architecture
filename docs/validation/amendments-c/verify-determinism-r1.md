# verify-determinism-r1 — lane amendments-c/verify-determinism-r1 (the DETERMINISM part after repair round 1)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-determinism-r1).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 inputs read (verify-determinism-r0, repair-determinism-r1 report, assemble-r1, the other repair-r1 reports' cross-part notes, verify-model-r1's determinism rows; §5–§7 live whole, word diff pre-r1 → live): done
> STEP 1 re-check of the 27 VD0 rows and the 13 other-verifier rows routed to determinism: done
> STEP 2 new-problem / single-source / stale / deferral / reference / held-part sweep of the repaired subsections: done
> STEP 3 cross-part notes addressed to this part: done
> STEP 4 doc checks "5,6,7": done (exit 0)
> STEP 5 report body: done | queue row: done | LANDED line: done

Lane `amendments-c/verify-determinism-r1`, 2026-09-28. Read-only lane: the design files were not touched.
Design read: `docs/ARCHITECTURE.md` sha256 `024c57dabc6b93c8…` (17 050 lines; §5 l. 6793, §6 l. 7030, §7 l. 7791–9495),
rationale `33b21ca8cdc15789…`; the before is `docs/archive/ARCHITECTURE-pre-amendments-c-repair-r1-2026-09-28.md`
(`7f4c0e25…`). Scratch: `/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/vd1/`
(`live57.md`, `pre57.md`, the word diff `wd57.diff`, `dc-567.out`).

## 1 Outcome

Repair round 1 fixed **all 40 issues routed to the determinism part** — my 19 own VD0 rows and the 13 rows the other
verifiers gave it (V-MC0-04, -05, -12, -19, -20, -21, -22, -23, -24; VKC-17; VPR0-11 = VD0-01, VPR0-25, VPR0-30) — and
the other owners fixed all 8 VD0 rows I had given them (VD0-05, -06, -07, -09, -12, -21, -26, -27). Every fix reads as its
required change asked, quoted in §2. §5–§7 changed only in the twelve subsections the repair named (176 diff lines, all
traced to a VD0 / V-MC0 / VKC / VPR0 row or to the rendering hand-off's §5.2 F-LIGHT substitution). The held parts stay
out (item 52's visible difference; item 68 (g); items 35, 60 support), gate (b) holds for every added sentence (no
reference name in the added text), no deferral wording (0 hits before and after), 147 J ids cited in §5–§7 all resolve
in the index and Part A (only IMPROVEMENTS' `J-K`, pre-existing), and the document checks exit 0.

This round finds **14 new issues, all minor**: determinism 7, model 3, pipeline 3, rendering 1. Six duplicate rows of
`verify-model-r1` (V-MC1-01, -02, -03, -04, -07, -09 — marked "=" below), and two fold scope's unfolded cross-part
notes (VSC-21). None needs an owner ruling; each restores a recorded ruling (J-A81.01, J-A88.41, J-A68.73, J-A67.72,
J-A20.77, J-A66.71, J-A20.23, J-A50.21 / J-A70.44) or completes a cited reference. The ones that matter most:
* **VD1-01** — §7.7 item 15, the home of item 81's refusal, still refuses only a dossier below 1 500, while §1.1, §14,
  D-33 and J-A81.01 now cite it for the refusal above the 120 000 cap as well;
* **VD1-03** — the dossier's crime counts twice in II.7.5's undercity demand once the port fills §10.2's crime row: §7.7
  says the port fills `disorder` from the crime row, and round 1's §4.6 crime term (J-A88.41) multiplies the same demand
  by the crime factor directly;
* **VD1-04** — §7.4's warp rule carries a door light by its entrance vertex, then re-seats it at its `sizeCm` clearance,
  which pushes it indoors — the case J-A68.73 says the entrance rule exists to avoid.

## 2 Re-check of the round-0 issues

FIXED = the live text carries the required change (quoted in brief, live line). All 40 are FIXED; none is partial.

| id | owner | verdict | live text (line) |
|---|---|---|---|
| VD0-01 = VPR0-11 | determinism | FIXED | §6.1 `works`: "for a Works an epoch starts, keyed by its target's lineage with the epoch's week as the creation index and the epoch component — the start offset … drawn first, the duration … second; for a Works a dated change or a scheduled edit starts, … its given start week … — the duration alone; J-A67.61" (7161–7165); DR21 aligned (9290); J-A67.61 row and Part A restated |
| VD0-02 = V-MC0-19 (a) | determinism | FIXED | §7.5: "An older recipe's `character` entries become its `districtIntent` entries field for field … an older district record's stored `character` is dropped" (8834–8838) |
| V-MC0-19 (b), (c) | determinism | FIXED | "A document without `nextUndergroundPart` takes 1 …; a `Terrain` without `geology` reads `ordinary`" (8838–8839) |
| VD0-03 | determinism | FIXED | `startWorks` gains `change?: EditEvent /* … a build, convert, join, split or delete — folded at once …*/` (7884); §7.4 row persist "log: the event with the change it wraps", undo "the wrapped change's inverse and the Works record" (8554); J-A67.72 (see VD1-07 for its type) |
| VD0-04 | determinism | FIXED | §7.3 item 9 (d): "The closure rule and the edit kind are the base's; `addUndergroundAccess`'s underground pieces (II.7.6) run once the underground layer's stages exist … and until then its dry run returns F-EDIT naming the staged layer" (8507–8509); §5.2 F-EDIT's matching refusal (6914) |
| VD0-05 = V-MC0-07 | model | FIXED | §2.7 `flicker?: true /* … never drawn or stored */` (1860); J-A68.21 "an optional flicker flag" |
| VD0-06 | pipeline | FIXED | §4.7 (4): "one thing only is drawn — a door lantern's side of its door" (5606) |
| VD0-07 = V-MC0-02 | model | FIXED | §2.1 / §2.7: the `dug` system made "when an access edit makes one once those stages exist" (512, 1915–1916) |
| VD0-08 | determinism | FIXED | §6.1 Enter "the district intents (`districtIntent`)" (7224); §6.4 link (7638–7639) |
| VD0-09 | rendering | FIXED | §11.4 door (1) "intent, the district intents (`districtIntent`, §7.7 layer 2)" (12118) |
| VD0-10 | determinism | FIXED | §6.3 lineage: "its light rule row and its ordinal along the host — a door light's entrance ordinal, a street light's ordinal along its way strip — as the creation index" (7419–7421) |
| VD0-11 | determinism | FIXED | §6.1 "an underground closure's generators (II.7.6; …) — a closure's other generators draw on the concerns of the stage they call" (7191–7193); item 9 (d) "each built by the generators its edit kind declares (§2.8)" (8504–8506) |
| VD0-12 | pipeline | FIXED | II.7.6: "The closure's other instances (§7.3 item 9 (d)) declare their own generators" (15939) |
| VD0-13 + VPR0-30 | determinism | FIXED | §6.1 readers: `cut.arc` ring courses and `pin.decor` picks (7175–7177), `plot.join` `wholeBlock` (7187), `hinterland.outside` deposit bearing (7198–7199), `epoch.transform` churn extra (7202–7204); each key matches its home (II.2 15073, II.3 15111, §4.7 5629, J-A76.44) |
| VD0-14 | determinism | FIXED | §6.2 "— or, for a trade partner's or a deposit's bearing, by that element's binding key (§6.1) — never by the values the dossier holds" (7371–7372) |
| VD0-15 | determinism | FIXED | §6.1 "`cut.arc` one uniform per corner step 5 keeps on a lane or street cut — the fillet predictor's one test (§4.6 step 6)" (7173) |
| VD0-16 | determinism | FIXED | item 9 (a) "The closure is the edit's ONE event: its batches … commit together from it" (8481–8483); operator row (8260); J-A66.71 restated (II.7.6's sibling: VD1-10) |
| VD0-17 | determinism | FIXED | item 10 "its next three distinct rerolls … §5.1 (6)'s check advancing a variation whose content equals the current scope's or an earlier variation's to the next unused reroll, within `reroll.maxAdvance`" (8521–8523); §6.1 bullet (7205–7206) |
| VD0-18 | determinism | FIXED | §7.1 comment "Works, LightSource and UndergroundLink §2.7's …; AccessPoint II.7.4's; DossierChange §7.7's; ClosureRecord §7.3 item 9's" (7896) |
| VD0-19 | determinism | FIXED | uses row `concealmentSource` (8020, agrees with §2.8 l. 2117); `walkway` (8022); `displayText` and `RegionGroup` (8029, agree with §2.8 l. 2123) |
| VD0-20 | determinism | FIXED | F-PLOT "a plot too narrow for a trunk and one structure depth takes the `hovel` arrangement instead, reported (§4.7 S11)"; "re-cut;" (6903) |
| VD0-21 | kernel | FIXED | §3.1 `Warning.code` ends `'W_CUT_SLID'` (2501) |
| VD0-22 | determinism | FIXED | §5.4 "W_HEIGHT_CLAMPED, W_CUT_SLID (§3.1; F-CUT's foot slide, J-Fredteam-1)" (7004) |
| VD0-23 | determinism | FIXED | §7.5 "its predecessor's week + round(52 × `years`), §4.11's `EpochInputs.week` rule" (8841); J-A76.72 restated |
| VD0-24 | determinism | FIXED | §7.4 knownTo row "a `knownTo` the dossier set is dossier-owned and a map `setAttr` of it is refused (§7.1, §7.7 item 7; J-A20.77)" (8562) |
| VD0-25 | determinism | FIXED | §7.4 underground row "an access point whose element is unmapped" (8551) |
| VD0-26 | scope | FIXED | §13.3 "also holds §6.5 (9)'s *session-history independence* …" pointer only (13526) |
| VD0-27 | kernel (model §2.2) | FIXED | §3.2 (9) *Frame growth at an epoch* (2573 ff.; J-A81.31); §2.2 `frame` comment (527); DR23's "§3.2 (9)'s frame rule" resolves |
| V-MC0-04 | determinism | FIXED | §7.4 *Warp*: "Seven kinds of record", `LightSource.point`, `AccessPoint.ground.at`, `Works.before` with hosts; a Works' rings "never re-seated, re-placed or orphaned" (8678–8700); J-A68.73 (but VD1-04, VD1-05) |
| V-MC0-05 | determinism | FIXED | §5.3 entrance row "on the footprint side that faces its plot's frontage access edge — … (§2.6 rule 1; items 29, 50, 70) —, and a side or rear entrance only where its plot has an access edge beyond the frontage (§2.6 rule 2)" (6951) |
| V-MC0-12 | determinism | FIXED | §5.3 basement row "a basement other than a crawl space never under the flood band …, and a crawl space (`kind: 'crawl'`) only where the lowest terrain sample … lies above the water table" (6935) |
| V-MC0-20 | determinism | FIXED | §6.2 "written by generation, by epochs, by dossier events and — `identity` only — by a `setAttr` override (§2.5; its registry row in §2.8)" (7383); §7.1 districts row (8015); J-A72.61 restated |
| V-MC0-21 | determinism | FIXED | §6.2 content node "the staged ConditionOverlay, DepositSite and PowerRelation records — empty in the base" (7278–7279); §6.3 anchor row (7538) and matching routine (7559) |
| V-MC0-22 | determinism | FIXED | §7.7 item 9 "For every field, §2.8's `factTier` derives which tier holds it (never stored; J-A20.23)" (9248–9249); toolkit (8064) |
| V-MC0-23 | determinism | FIXED | `interface Intent { … water: WaterSetting … }` declared once (9033–9035), `Recipe.intent: Intent` resolves (2179) |
| V-MC0-24 | determinism | FIXED | terrain row "`setAttr` on `geology` — an override of S1's value (§2.3), re-deriving … II.7.6's caverns" (8012) |
| VKC-17 | determinism | FIXED | §7.3 staged-layers row "and the far `link_end` vertices of the links ending on it (§3.4)" (8261); §5.3 sibling "which the connection stage places, keeps or strips by one transaction on each part it touches" (6947) — the kernel's "placed, kept or stripped" |
| VPR0-25 | determinism | FIXED | DR11 (9280), DR16 (9285), DR18 (9287), DR19 (9288) name only inputs their rules read; §4.6's crime term (5111) and §4.9's import share (5848) exist |

## 3 Item verdicts (updated from round 0; `verify-determinism-r0.md` §2 for the full quotes)

Every home and referencing item routed here stays PRESENT, except five now PARTIAL on a round-1 issue: **68** (VD1-04,
VD1-05 — §7.4's light carry), **81** (VD1-01 — item 15 lacks the cap refusal), **65** (VD1-02 — §7.5 lacks the older
decline-op transform II.6 cites), **88** (VD1-03 — `disorder` and the crime term), **67** (VD1-07 — `startWorks.change`'s
type). Round 0's PARTIAL items **66, 101, 34/36/37/41, 64, 70, 72, 76** are now PRESENT (their VD0 rows FIXED, §2).
Items **20 (h), 51, 52, 74, 75, 77, 78, 80, 82, 86, 87, 39, 42, 43, 44, 45, 47, 56, 62, 63, 69, 71, 73, 79, 83, 85**
keep round 0's PRESENT (63's two stale override clauses sit in §2.7 and §4.7, VD1-08 and VD1-09, not in this part).

## 4 Issues (round 1)

| id | sev | kind | owner | where | the defect | required change |
|---|---|---|---|---|---|---|
| VD1-01 | minor | conflict | determinism | §7.7 item 15 (9387–9393); DR23's bar (9292); §5.4's last sentence (7028) | §1.1 (344–348: "a dossier above it is refused by the port the same way … (§7.7 item 15, §14; J-A81.01)"), §14 (14141, 14242), D-33 (16238) and J-A81.01 cite item 15 for the refusal above the 120 000 cap; item 15 states only "A dossier whose population lies below 1 500 is refused", DR23's bar "a dossier below the floor is refused (item 15)", and §5.4 "one below the 1 500-person floor" (scope's cross-part note 1, VSC-21, unfolded) | item 15, after its first sentence: "A dossier whose population lies above the 120 000 cap is refused the same way — `E_RUNG_UNAVAILABLE` naming the cap, at creation and at every absorb, nothing absorbed — because its population is a dossier fact a clamped town would contradict (§1.1; J-A81.01)."; DR23's bar: "the rung is the population's; a dossier below the floor or above the cap is refused (item 15)"; §5.4: "— one below the 1 500-person floor or above the 120 000 cap, `E_RUNG_UNAVAILABLE` (§7.7 item 15, item 81) —" |
| VD1-02 | minor | broken-reference | determinism | §7.5 (8830–8833) | II.6 (15293) says "an older `convert` event's `tunnel` field reads as `element`, §7.5" for `DeclineOp`'s underground ops (VPR0-10); §7.5 states that rule only for `placeAccess` (pipeline repair's cross-part note 2, unfolded) | after "a `placeAccess` event's `tunnel` reads as its `element`" add "; so does the `tunnel` of an older `convert` event's underground decline op (`silt`, `caveIn`, `seal`, `reopen`; `DeclineOp`, §4.11 — `flood` is new and has no older form)" |
| VD1-03 | minor | conflict | determinism | §7.7 layer 2 (9024–9028); DR17 (9286) | "`disorder` … which the port will fill from the dossier's crime facts through §10.2's crime row, staged" — while round 1's §4.6 crime term multiplies II.7.5's undercity demand by `1 + crime.undercityScale × crime` (5111–5114; J-A88.41) and II.7.5's size law multiplies by both `(1 + g × disorder)` and that `c` (15713–15716): once the port fills the row, the dossier's crime counts twice | replace that clause with "the blueprint's setting (a timeline entry's over epochs); the dossier's crime scalar never fills it — it reaches the undercity through §4.6's staged crime term alone (item 88; J-A88.41), so crime is counted once"; DR17 inputs: "`disorder`" → "the crime scalar (§10.2's staged crime row, item 88); the blueprint's `disorder`", its rule cell "II.7's feature law; II.7.5 with §4.6's staged crime term" |
| VD1-04 | minor | new-problem | determinism | §7.4 *Warp and what stands on the ground* (8694–8695); J-A68.73 row (16973) | "a door light … instead takes the displacement of its entrance vertex", then "A record whose new point lies … nearer its boundary than its clearance (… a light's `sizeCm` …) is **re-seated** at the nearest lattice point of the host face inset by that clearance": a door light stands on the footprint's edge, so every warp re-seats it indoors — what J-A68.73's Part A says the entrance rule avoids | the clearance parenthesis: "a light's `sizeCm` — a door light, which keeps its entrance vertex's displaced point, excepted —; none for an access point's opening"; J-A68.73's index row: "a light (a door light excepted) or an access point re-seated at its clearance" |
| VD1-05 = V-MC1-04 | minor | partial | determinism | §7.4 *Warp* host list (8683–8686) | `LightSource.point`'s host faces cover a building, a way or bridge, a square, a gate, a pin, a gallery and a chamber; §4.7's `LightRule.host` (5573; J-A68.42) also places lights on a tunnel run's junction and an access point's foot (and a castle, a shrine), and `placeLight` on any entity (7885), for which the carry and the re-seat test have no host face | after "a chamber's floor" add V-MC1-04's text: "a tunnel's half-corridor strip at its junction, the face of the underground element an access point's `access_point` vertex lies on (a tunnel's strip, a gallery's band, a chamber's floor), a castle's ward or bailey face, a decoration's face (or the L3 face containing its point), and for a hand-placed light on any other entity the face that entity is or stands on (§7.1's `placeLight`)" |
| VD1-06 = V-MC1-07 | minor | stale | determinism | §7.1 `setEntrance` comment (7857); *Entrances, basements, passages and plans* (7973) | "the main entrance may be moved along its street-facing side" / "which may only move along its street-facing side": §2.6 rule 1 (1485–1491; J-A50.21, J-A70.44) puts it on the footprint side facing the frontage access edge — a hidden plot's passage or court, a cluster structure's footpath | 7857: "… may be moved along the footprint side §2.6 rule 1 puts it on, never removed"; 7973: "… which may only move along the footprint side §2.6 rule 1 puts it on" |
| VD1-07 | minor | new-problem | determinism | §7.1 `startWorks` (7884); J-A67.72 | `change?: EditEvent` requires `EditBase`'s `seq`, `author` and `session` (EditEvent = EditBase & …) while the comment says "its own EditBase fields unset", and admits every event kind — an `epoch`, an `undo`, another `startWorks` — where the comment and J-A67.72 admit five | `change?: WorksChange /* … as now */`, and after the `WarpStroke` line: `type WithoutBase<E> = E extends unknown ? Omit<E, keyof EditBase> : never; type WorksChange = WithoutBase<Extract<EditEvent, { t: 'build' \| 'convert' \| 'join' \| 'split' \| 'delete' }>>;   // J-A67.72: the change a startWorks wraps; its EditBase fields are the wrapping event's` |
| VD1-08 = V-MC1-01 | minor | stale | model | §2.7 `Use.concealmentSource` (1814) | "and a dossier value outranks a map override (§7.7 item 7; J-A63.22)" — the override clause J-A20.77 superseded; §7.7 item 7 (9218–9219), §7.1's uses and institutions rows refuse a map `setAttr` of a dossier-set value (determinism repair's cross-part note, unfolded) | V-MC1-01's text, at minimum: "…, and a mode the dossier set is dossier-owned, so a map `setAttr` of it is refused (§7.7 items 7, 11; J-A20.77, J-A63.22)" |
| VD1-09 = V-MC1-02 | minor | stale | pipeline | §4.7 *Concealed institutions* (1) (5496–5498) | "The resolved mode and its source are stored on the concealed use; a map edit sets it by `setAttr` (§7.1) and a dossier value outranks a map override as it does for `knownTo` (§7.7 item 7)" — the same superseded clause, pointing at this part's home | "The resolved mode is stored on the concealed use, with its map-side source (`Use.concealmentSource`, §2.7) when the dossier gave none; a map edit sets a mode the dossier did not set by `setAttr` (§7.1), and one the dossier set is dossier-owned, a map `setAttr` of it refused (§7.7 items 7, 11; J-A20.77, J-A63.22)" |
| VD1-10 | minor | conflict | pipeline | II.7.6 *The pieces an access edit generates* (15911) | "the closure rule — one event, one transaction, …" against §7.3 item 9 (a) (8481–8483) and J-A66.71 ("'transaction' keeps its §3.3 meaning, one batch"); determinism repair's cross-part note, unfolded | "one event, one transaction" → "one event whose batches commit together" |
| VD1-11 = V-MC1-09 | minor | stale | rendering | §9.2 (11047), §11.1 (11777, 11798), §11.2 (11981); J-A20.82 row (16921) and Part A (rationale 700) | "§2.8's marker" / "whose entities §2.8's marker labels `declared`" reads as the stored marker J-A20.23 rules out; §7.7 item 9 (this part's home of the tiers) and §2.8 give the tier as `factTier`, derived at read | each "§2.8's marker" → "§2.8's `factTier`"; 11777: "every event whose entities §2.8's `factTier` reads `declared`"; J-A20.82's row and Part A the same |
| VD1-12 = V-MC1-03 | minor | partial | model | §2.7 `LightSource.host` (1858) | "the building, way, square, gate, bridge, pin, gallery or chamber it belongs to" — narrower than §4.7's `LightRule.host` (5573), which §7.4's carry (VD1-05) reads through this comment | V-MC1-03's text: "the building, way, square, gate, bridge, castle, pin, decoration (a wayside shrine), tunnel, gallery, chamber or access point it belongs to — for a hand-placed light, the entity `placeLight` names or finds under its point (§7.1); its arena is its Identity.key's" |
| VD1-13 | minor | broken-reference | model | §2.8 registry, `Works` (2109–2110) | "lineage unit its target's lineage with its start week, §6.1": lineage is §6.3's (7421), and §6.1's `works` key for an epoch's Works is the epoch's week, not the start week (J-A67.61) | "lineage unit its target's lineage with its start week, §6.3; its `works` draws keyed as §6.1 states" |
| VD1-14 | minor | partial | pipeline | §4.11 *The rung at an epoch* (6413–6414) | "A dossier below 1 500 is refused by the port (§7.7, item 81) and never reaches an epoch" — omits the cap refusal §1.1 and J-A81.01 now make at every absorb (scope's cross-part note 2, unfolded) | "A dossier outside the ladder — below 1 500, or above the 120 000 cap — is refused by the port (§7.7 item 15, item 81; §1.1; J-A81.01) and never reaches an epoch" |

Checked and not raised: §6.1's `pin.light` key (host lineage + rule row) differs from a light's §6.3 lineage (+ ordinal)
by design — a stream key is not a lineage key, and only a door lantern draws; DR21's chance cell restates §6.1's two
`works` keys, as round 0's VD0-01 asked, in the table's pattern of short key notes (DR3, DR19, DR25).

## 5 Checks run (receipts in scratch `vd1/`)

* **Scope of the change.** `diff` of §5–§7 (archive `7f4c0e25…` → live `024c57da…`): 176 changed lines in §5.2, §5.3,
  §5.4, §6.1, §6.2, §6.3, §6.4, §7.1, §7.3, §7.4, §7.5 and §7.7 only; the word diff (`wd57.diff`) was read whole and every
  hunk traced to a row of §2 or to the §5.2 F-LIGHT hand-off. §5.1, §6.5, §7.2, §7.6 and §7.8 are byte-identical and were
  re-read only where the new text cites them.
* **Sections read whole:** §5–§7 of the live design (l. 6793–9495), plus every subsection the new text cites: §1.1
  (340–348), §2.2 `frame`, §2.6 rules 1–2 and `Basement`, §2.7 `Works` / `LightSource` / `HistoryHint` / `concealmentSource`,
  §2.8's registry paragraph (2106–2127), §3.1 `Warning`, §3.2 (9)'s frame growth, §4.6's crime term, §4.7 *Concealed
  institutions* and *Light sources* (5484–5610), §4.9's import share, §4.11 *Works* (1), (2), (10), `DeclineOp` and
  *The rung at an epoch*, §14's `PortResult`, `creation`, `HostContext`, II.6's condition paragraph, II.7.5's size law,
  II.7.6's access pieces, D-33, and the J rows and Part A entries of J-A67.61, J-A66.71, J-A76.72, J-A72.61, J-A67.72,
  J-A68.73, J-A68.21, J-A67.22, J-A68.61, J-A81.71, J-A81.01, J-A88.41.
* **Held parts (gate (a)).** In §5–§7: "visibly", "differ from a fresh", "no cast shadow", "160", "VG 1.6.9's cast",
  "night-light layer", "ambient-occlusion gradient", "16-cell" — 0 hits each.
* **Gate (b) / (c).** The added text (155 inserted runs, `added.txt`) names no reference build or generator at all; C1
  (reference identifiers) 5 hits, 0 unreviewed.
* **J ids.** 147 distinct ids cited in §5–§7; against 723 index rows and 723 Part A entries, all resolve but `J-K`
  (IMPROVEMENTS' own id, pre-existing). The six determinism rows restated or added in round 1 each occur once in the
  index and once in Part A, their § columns true.
* **Single source.** `Intent`, `ClosureRecord`, `DistrictIntent`, `CircumstanceSlice`, `TradePartner`, `PowerStanding`,
  `DossierChange`, `ReceiptRow` each declared once; the `works` key stated at §6.1 (DR21 and J-A67.61 agreeing); the warp
  rule for the three new point records stated at §7.4 (§2.2 rule 5 and §2.7's `Works.before` comment point to it).
* **Deferral wording.** "TBD / TODO / to be decided / open question / deferred / for now / eventually / will be" over
  §5–§7 before and after: 0 and 0. New staging phrases ("once the underground layer's stages exist", "once the port fills
  it") are the roadmap's staged hooks.
* **References.** Every § and item pointer in the added text was followed to its target; the three that fail are VD1-01
  (item 15 lacks what §1.1 cites it for), VD1-02 (§7.5 lacks what II.6 cites it for) and VD1-13 (§2.8 cites §6.1 for a
  lineage). assemble-r1's resolver: 2 broken, both the baseline's external citations.
* **Document checks.** `python3 docs/validation/bench/doc_checks.py --sections "5,6,7" --allow
  docs/validation/doc-checks-allow.tsv` on the installed design `024c57da…` (9 626 JSON files, 916 788 corpus 3-grams,
  478 lists): C1 5 / 0, C2 0 / 0, C3 250 / 0, C4 3 / 0, S1 0 / 0, S2 0 / 0 (hits / unreviewed), exit 0 (round 0: C3
  249 / 0).
* **Cross-part notes addressed to this part** (repair-r1 reports): kernel 5 (DR23 resolves) — done; model on V-MC0-04,
  V-MC0-12, VD0-04, VD0-19 — done (V-MC0-04's carry with VD1-04, VD1-05); pipeline 2 (§7.5 decline op) — not done, VD1-02;
  pipeline 3 (no new concern for geology) — nothing needed, §6.1's `blueprint.features` covers it (J-A65.49); pipeline 4
  (DR19) — done; scope 1 (item 15's cap) — not done, VD1-01; rendering hand-off 4 (§5.2 F-LIGHT) — done. This part's
  own repair notes to others: II.7.6's "one transaction" (VD1-10), §4.7 and §2.7's override clause (VD1-08, VD1-09) and
  "§2.8's marker" (VD1-11) — unfolded.

## 6 CONFIRMED versus PLAUSIBLE

CONFIRMED, by executed grep, diff, script or check on the installed files: every quoted text and line number; the 40
FIXED verdicts; each new issue's conflicting texts (both sides quoted from the live files); the J-id resolution; the
held-phrase absence; the deferral and gate-(b) scans; the doc-check counts. PLAUSIBLE, as a reading: that each required
change is the smallest fix coherent with the ruling it cites; the severity grading (all minor: the conflicts sit in staged
paths — the port's crime row, the underground's decline ops — or in a rule's edge case); and VD1-03's choice to keep
J-A88.41's single crime statement and drop the `disorder` route rather than the reverse.
