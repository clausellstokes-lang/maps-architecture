# verify-determinism-r0 — lane amendments-c/verify-determinism-r0 (the DETERMINISM part after assemble-r0)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-determinism-r0).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> READING: route.json (14 home + 27 referencing items), amendments c (items 34–52, 56, 62–72, 20 (h), both Fable review sections), d (73–88, owner rulings), e (101 (a)–(i), (f′)); seat reports E1, E2; every cross-part note to E1/E2 in the other ten amend-*.md files; §5, §6, §7 of the design read whole (l. 6759–9421, sha256 7f4c0e25…) | done
> CROSS-PART GREPS (the homes my part points to: §2.6, §2.7, §2.8, §2.9, §3.1, §3.2, §3.4, §4.6, §4.7, §4.11, §8.4, §9.1, §9.5, §11.4, §13.2, §13.3, II.2, II.3, II.7.4–II.7.6, Staged) | done
> REGRESSION DIFF (archive §5–§7 sentences absent after assembly: 100 of 2 663, each read) | done
> ITEM VERDICTS | done (§2)
> ISSUES | done (§3: 27 — 5 major, 22 minor)
> DOC CHECKS "5,6,7" | done (exit 0)
> QUEUE ROW + LANDED | done

Lane `amendments-c/verify-determinism-r0`, 2026-09-28. Status: COMPLETE. Design files untouched (read-only lane).
Design read: `docs/ARCHITECTURE.md` sha256 `7f4c0e253438b41b…` (16 872 lines; §5 l. 6759, §6 l. 6996, §7 l. 7742–9421),
rationale `22f01184eac296c1…`, archive `docs/archive/ARCHITECTURE-pre-amendments-c-2026-09-27.md` for the before.
Scratch: `/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/vd0/`.

## 1 Outcome

All 14 home items and all 27 referencing items routed to §5–§7 have their mechanism in the assembled text, stated once
at its home. Every J id cited in §5–§7 (142 ids) has its index row and its Part A entry (the one miss, `J-K`, is
IMPROVEMENTS' own id, pre-existing). The held part routed here (item 52's "the references' maps visibly differ") is not
written; nothing held for items 68 (g) reaches §5–§7. Gate (b) holds for every new sentence (a script found no new
"the reference does X" sentence without its build); gate (c) holds (doc checks C1 0 unreviewed). No deferral wording.

The verification found **27 issues — 5 major, 22 minor**; 19 are the determinism part's own, 8 belong to other parts.
The majors are:
* **VD0-01** — the `works` stream is keyed by a Works' start week, while §4.11 (10) draws that start week's offset from
  the same stream, so the key is circular (seat T asked for the fix in its note 4 (a); it was not applied);
* **VD0-02** — §7.5 has no schema transform for `Recipe.character` → `Recipe.districtIntent` (J-A72.21), so an older
  document's per-district input has no migrate path;
* **VD0-03** — §7.1's `startWorks` carries no change, so a hand-scheduled build cannot name its class, although §4.11 (1)
  says it schedules a hand edit;
* **VD0-04** — item 66's staging is stated three ways: §7.3 item 9 (the home) says nothing; §2.7 lets an access edit make
  a `dug` system in the base; II.7.4 says the underground pieces run only once the layer's stages exist (the route's
  ruling);
* **VD0-05** — `LightSource.flicker.phase` is drawn on `pin.light` and stored, per §2.7 and §4.7, while §6.1, §6.5 (9)
  and §8.4 (f) say a flicker is never a stream (J-A68.61).

Every issue has an exact required change (§3). **Nothing needs an owner ruling.** Each change restores a rule that is
already recorded: a route ruling, a J row or another seat's cross-part note.

## 2 Items routed here — verdicts

PRESENT = the mechanism is there in the route's terms (quoted in brief); PARTIAL = present with an issue of §3.

| item | role | verdict | where, in brief |
|---|---|---|---|
| 51 | home §5.1 (1) | PRESENT | "MFCG 12710731's retry of all nine of its stages … VG 1.6.9's retry … on the failed seed's next generator state … NG 1.2.2's rebuild … from seed + 1"; `City.hx` citation gone (J-A51.51) |
| 52 | home §6.5 (9) | PRESENT | "*session-history independence* (item 52; J-A52.61) — for 20 seeds …"; mechanisms only, held claim absent; §13.3 points to it (duplicate wording, VD0-26) |
| 66 | home §7.3 item 9 | PARTIAL | closure rule (a)–(e), `ClosureRecord`, operator-table row; §7.1 event, §7.4 row, §5.2 F-EDIT, §5.3 row, §6.1, §6.3 minting present — VD0-04, VD0-11, VD0-16 |
| 20 (h) | home §7.7 items 9–11 | PRESENT | two tiers (item 9), derivation table DR1–DR25 (item 10), coherence (item 11), "the map never asks" (item 1); §5.2 F-EDIT `dossier-owned`, §5.3 coherence row, §6.1 "every chance entry … names a concern", §7.1 refusal |
| 74 | home §7.7 item 12 | PRESENT | key-law table, class apart from identity, receipts; §7.1 `DossierRef` comment, §6.3 "Dossier bindings never re-key", §5.3 binding-rebuild row, §6.2 `dossier` outside the digest |
| 75 | home §7.7 items 1, 13 | PRESENT | diff against `Document.dossier.carried`; `DossierChange`, `ReceiptRow`, rows F1–F5, F8, F14, F15, F18, F20, F22; §7.1 `EditBase.dossierChange`; §5.4 `change: { changeId, reason }` |
| 77 | home §7.7 layer 2 | PRESENT | `TradePartner`, fill rule, north first (J-A77.71/72); §6.1 `gate.pick` keyed by partner key (the §6.2 sentence it contradicts: VD0-14) |
| 78 | home §7.7 layer 2 | PRESENT | `EconomyShares` over §10.2's sectors, even-mix default |
| 80 | home §7.7 item 14 | PRESENT | `Assignment.state`, `memberState`, status table; §5.3 "present as its ruin"; §6.1 `siting` member draw; §7.1 state dossier-owned |
| 81 | home §7.7 item 15 | PRESENT | sub-1 500 refusal `E_RUNG_UNAVAILABLE`; §5.4 "never a report entry" |
| 82 | home §7.7 item 16 | PRESENT | naming claims, 0.5 floor, Q5 placeholder, Q6; `Assignment` `'feature'` granularity and `claim` |
| 86 | home §7.7 item 1 | PRESENT | "What the port never reads" list; `ignored_key` |
| 87 | home §7.7 item 5 | PRESENT | "A host's undo (item 87)" forward convergence; §7.4 not edited (as routed) |
| 101 | home §7.1 toolkit | PARTIAL | twelve tools / five layers table, sugar events, points forms, three surfaces, `proposedBy`; §7.2 declared means held; §7.3 item 10; §7.4 rows; §7.5 sugar migration; §7.8 `intend` = basic panel — VD0-17 |
| 34, 36, 37, 41 | §6.1 | PARTIAL | `cut.stop` appended, `cut.side` / `cut.farSideAlt` retired (J-A41.61); `bell4()`, `mean3()`, `dmath.pow` — VD0-15 (`cut.arc` wording) |
| 37, 43, 44 | §7.6 | PRESENT | per-preset values (J-A37.71): `straightFirst` and 8 m (matches §4.6 and J-A37.42); 4.8 m / 2 m and FTG 0 (J-A43.71); `over: 'both'` (J-A44.71) |
| 39 | §5.2 F-CUT | PRESENT | "re-plan in the working frame turned by 36° ×2" (consistent with §4.6 and J-A39.41); `W_CUT_SLID` unhomed (VD0-21, VD0-22) |
| 42 | §5.2 F-PLOT | PRESENT | "NG 1.2.2 baseline: ≈ 42 % of lot leaves frontage-less — its courts" |
| 45 | §5.2 F-CASTLE; §7.1 Equalize | PRESENT | bloat then `regularFit` equalisation; Equalize row via `regularFit` (§3.4 has it) |
| 47 | §6.1; §7.3 S6 row | PRESENT | `district.seed` turn skips and absorbed neighbour keyed per grower |
| 56 | §6.1 | PRESENT | "`deck(table)` … MFCG 12710731's deck selection idea" |
| 62 | §7.6 | PRESENT | "(or its `(code)` form … with its P-id, §17.1 (6); item 62)" |
| 63 | §5.3; §6.1; §7.1; §7.4; §7.7 | PRESENT | concealed row; `siting` mode and cover; uses and institutions rows; setAttr row's front mutation; item 7 |
| 64 | §5.3; §6.1; §7.1; §7.4 | PARTIAL | basement-access row; `sewer` lottery; `AccessPoint.state` / `knownTo`; underground lifecycle row — VD0-25 (stale "tunnel") |
| 65 | §5.2; §5.3; §6.1; §6.3; §7.1; §7.4; §7.7 | PRESENT | F-VOID; systems row; `sewer` per system part; lineage and anchors; `drawChamber`, `addLink`; the `undercity` / `disorder` slice fields |
| 67 | §5.3; §5.4; §6.1; §6.2; §6.5; §7.1; §7.4; §7.6 | PARTIAL | Works row; `works` entries; `works` concern; stage outside digests; works-stages test; `startWorks` / `cancelWorks` — VD0-01, VD0-03 |
| 68 | §5.2; §5.3; §6.1; §6.2; §6.5; §7.1; §7.4; §7.6; §7.8 | PARTIAL | F-LIGHT; light row; `pin.light`; lighting outside digests; lint closure and lighting test; `placeLight`; light controls — VD0-05, VD0-06, VD0-10 |
| 69 | §7.6 | PRESENT | "No corpus content enters … except the palette bands the owner released on 2026-09-27 (item 69 …)" |
| 70 | §5.2; §5.3; §6.1; §7.1; §7.4 | PARTIAL | F-PLOT cluster rung; cluster row; `siteplan` packing; `tenure` override — VD0-20 |
| 71 | §6.1; §7.6; §7.7 | PRESENT | `siting` class draw; class-mix table; whole-neighbourhood override; `wealthLevel` read directly (J-A71.42) |
| 72 | §5.3; §5.4; §6.1; §6.2; §6.3; §7.1; §7.4; §7.6; §7.7 | PARTIAL | character row; rename entry; case (5); `identity` override; digest status (J-A72.61/62) — VD0-02, VD0-08 |
| 73 | §7.7 item 8; §6.5 (3) | PRESENT | creation half M1 / absorb M3a / wiring staged; adapter-boundary lint |
| 76 | §7.7 items 1, 2, 3, 6; §7.5 | PARTIAL | dating rungs, weeks, lapse tolerance (J-A76.71), cadence; weekless epoch (J-A76.72) — VD0-23 |
| 79 | §7.7 layer 2 | PRESENT | `PowerStanding` with `appliedStanding` |
| 83 | §6.5 (9) | PRESENT | "*dossier fixtures* (item 83, T73-8)" |
| 85 | §6.2 | PRESENT | "no host seed — … the port's one-way derivation …" |
| 88 | §7.7 item 8 | PRESENT | the five staged records and the five rows |

## 3 Issues

Each issue names its owning part and an exact required change. A cross-part issue names the section that my part
points to.

| id | sev | kind | owner | where | the defect | required change |
|---|---|---|---|---|---|---|
| VD0-01 | major | new-problem | determinism | §6.1 `works` (appended concerns) | keyed "by the Works' target's lineage with its start week as the creation index", but §4.11 *Works* (10) draws an epoch Works' start offset from `works` "before the duration's": the key needs the week the draw produces | replace the `works` parenthesis with: "non-rerollable, attempt cap 0: for a Works an epoch starts, keyed by its target's lineage with the epoch's week as the creation index and the epoch component — the start offset within the epoch's span (§4.11 *Works* (10)) drawn first, the duration inside its `WorksTable` row's range second; for a Works a dated change or a scheduled edit starts, keyed by its target's lineage with its given start week as the creation index — the duration alone; J-A67.61"; align §7.7 DR21's chance cell and J-A67.61's index row and Part A entry to the same two keys |
| VD0-02 | major | missing | determinism | §7.5 "The schema transforms the amendments of 2026-09-27 and 2026-09-28 add" | the recipe field `character: CharacterVector[]` became `districtIntent: DistrictIntent[]` (§2.9; J-A72.21, J-A72.41) and `District.character` became a derived profile, but no transform migrates an older document | add: "An older recipe's `character` entries become its `districtIntent` entries field for field (wealth, density, age, function mix, planned / organic, greenery, fortification, building scale; the entry without a district the town-wide default); an older district record's stored `character` is dropped, the derived `CharacterVector` recomputed at first load (§4.5; J-A72.21)" |
| VD0-03 | major | missing | determinism | §7.1 `startWorks` | `startWorks { target; kind; startWeek? }` holds no change, yet §4.11 (1) says it schedules "a hand edit" decided at once; a build cannot name its class, a convert its designation | `{ t: 'startWorks'; target: Id; kind: Works['kind']; startWeek?: number /* default: the document's week */; change?: EditEvent /* the hand change the Works shows — a build, convert, join, split or delete — folded at once at this event's position (§4.11 (1)); absent only for a repair, decay or clear of the target */ }`; §7.4's startWorks row: persist "log: the event with the change it wraps"; undo "the wrapped change's inverse and the Works record" |
| VD0-04 | major | conflict | determinism | §7.3 item 9 (d) (home of item 66) | silent on staging, while §2.7 (l. 1908: "except a `dug` system, which an access edit may make in the base") and II.7.4 (l. 15508: "whose underground pieces run once the layer's stages exist") disagree; the route rules BASE HOOK (rule and edit kind) + STAGED (underground pieces) | add to item 9 (d): "The closure rule and the edit kind are the base's; `addUndergroundAccess`'s underground pieces (II.7.6) run once the underground layer's stages exist (II.7.4; *Staged by the owner's roadmap*), and until then its dry run returns F-EDIT naming the staged layer"; model aligns §2.7 (VD0-07) |
| VD0-05 | major | conflict | model | §2.7 `LightSource.flicker` (l. 1854); J-A68.21 | "`flicker?: { phase: number /* 0–1, drawn on pin.light at placement (§6.1) */ }`" contradicts §6.1, §6.5 (9) and §8.4 (f): a flicker is "a pure function of its render key and the view's time", never a stream (J-A68.61); a stored drawn phase would also enter the model digest | replace with `flicker?: true /* a fire light flickers: phase and rate a pure function of its render key and the view's time (§8.4 (f), §6.1; J-A68.61), never drawn or stored; absent: steady */`; J-A68.21's row and Part A entry: "an optional flicker phase" → "an optional flicker flag" |
| VD0-06 | minor | conflict | pipeline | §4.7 *Light sources* (4) | "two things only are drawn — a door lantern's side of its door and a flicker phase — both on the concern `pin.light`" (same conflict as VD0-05) | "one thing only is drawn — a door lantern's side of its door — on the concern `pin.light` keyed by the host's lineage and the rule row (§6.1); a fire light's flicker is its row's flag, its phase a pure function of its render key and the view's time (§8.4 (f); J-A68.61)" |
| VD0-07 | minor | conflict | model | §2.7 staged-records paragraph (l. 1905–1909) | "except a `dug` system, which an access edit may make in the base (§7.3 item 9)" contradicts II.7.4 and the route's staging of item 66's underground pieces | "… until the owner-staged stages run (II.7.5, II.7.6); a `dug` system is made by an access edit once those stages exist (§7.3 item 9 (d))" |
| VD0-08 | minor | stale | determinism | §6.1 *Enter* (l. 7178); §6.4 *Permalinks* (l. 7589) | both list the recipe field "character", renamed `districtIntent` (J-A72.21); "character" now means the derived profile (J-A72.41) | §6.1: "params, intent, character, entry mode" → "params, intent, the district intents (`districtIntent`), entry mode"; §6.4: "intent, character, entry mode" → "intent, the district intents, entry mode" |
| VD0-09 | minor | stale | rendering | §11.4 door 1 (l. 11983) | "blueprint fields — seed, rung, population, intent, character" (as VD0-08) | "… intent, the district intents (`districtIntent`, §7.7 layer 2) …" |
| VD0-10 | minor | new-problem | determinism | §6.3 lineage-key bullet | "the host for a light source (the light rule row as the creation index, item 68)": every street light of one row on one way shares a lineage key (the `dup` collision path), against §4.7 (1) ("a street light from its way strip and ordinal") and §6.3's own anchor row | "the host for a light source (its light rule row and its ordinal along the host — a door light's entrance ordinal, a street light's ordinal along its way strip — as the creation index, item 68; §4.7 *Light sources* (1))" |
| VD0-11 | minor | new-problem | determinism | §6.1 `sewer` readers bullet; §7.3 item 9 (d) | §6.1 puts "a closure's generators" on `sewer` and item 9 (d) says the other instances are "built by those generators", but §7.3 item 9 (b) draws "under the calling stage's concerns" and §4.7 (4) (b) derives a concealed door by `deriveEntrances` on `siteplan.entrance` | §6.1: "and a closure's generators" → "and an underground closure's generators (II.7.6)"; add "a closure's other generators draw on the concerns of the stage they call, keyed the same way (§7.3 item 9 (b))"; item 9 (d): "built by those generators" → "each built by the generators its edit kind declares (§2.8) — a concealed door by §2.6's entrance rules (§4.7's *Concealed institutions* (4)), a lifeline by II.7.6's target, connector, access and link pieces" |
| VD0-12 | minor | conflict | pipeline | II.7.6 last paragraph (l. 15783) | "The same generators serve the closure's other instances … a concealed front's missing concealed door" (as VD0-11) | "The closure's other instances (§7.3 item 9 (d)) declare their own generators: a concealed front's missing door by §2.6's entrance rules (§4.7's *Concealed institutions* (4)), an undercity entrance's missing lifeline by steps 2, 3, 5 and 7 above (II.7.5)" |
| VD0-13 | minor | missing | determinism | §6.1 "Readers the amendments … add" list | four keyed readers stated elsewhere as "no new concern (§6.1)" are absent: §4.11's churn-cap extra on `epoch.transform` (J-A76.44); II.2's ring courses on `cut.arc` (l. 14903); II.3's pin decay on `pin.decor` (l. 14941); DR19's deposit bearing on `hinterland.outside` | add bullets: "`epoch.transform` also draws a churn cap's extra — the fractional part of a cap scaled by a fractional `years` (§4.11; J-A76.44) — keyed by the district's lineage with the cap's kind as the creation index and the epoch component"; "`cut.arc` also draws II.2's ring courses, keyed by the district with the ring's ordinal (item 58, staged); `pin.decor` II.3's decay picks, keyed by the block with the pick's ordinal"; "`hinterland.outside` also draws a listed deposit's bearing where the dossier gives none (§7.7 DR19; item 88, staged), keyed by its binding key hashed as the derivation unit, as a partner's bearing on `gate.pick`" |
| VD0-14 | minor | new-problem | determinism | §6.2 *Histories, not states* | "A dossier event's draws are keyed by the plots it touches and its own `seq` …, never by the dossier's contents" — the new partner-bearing draw (§6.1, item 77) and DR19's deposit bearing are keyed by a dossier binding key | "… and its own `seq` (§6.1, §6.3) — or, for a trade partner's or a deposit's bearing, by that element's binding key (§6.1) — never by the values the dossier holds, …" |
| VD0-15 | minor | partial | determinism | §6.1 bent-cut readers bullet | "`cut.arc` one uniform per corner the fillet predictor keeps" misstates the draw count: §4.6 step 6 draws once per corner step 5 kept, the draw deciding sharp or arc | "`cut.arc` one uniform per corner step 5 keeps on a lane or street cut — the fillet predictor's one test (§4.6 step 6)" |
| VD0-16 | minor | new-problem | determinism | §7.3 item 9 (a); J-A66.71 | "the edit's ONE event and ONE transaction — its batches one arena … each" uses *transaction* for the chain, while §4.1 and §3.3 define a transaction as one batch ("Transactions: one level per batch") | "The closure is the edit's ONE event: its batches — each one level of one arena, and on the underground layer of one part (§3.3, §3.4, §4.1) — run in dependency order on the dry run's overlay and commit together from it, so it commits whole or not at all"; J-A66.71 row and Part A: "one event and one transaction" → "one event whose batches commit together" |
| VD0-17 | minor | new-problem | determinism | §7.3 item 10 | "derives the scope at the scope's next three rerolls …, §5.1 (6)'s content check applying to each": an unchanged variation advancing by §5.1 (6) lands on the next variation's reroll, so two variations can coincide | "… at its next three distinct rerolls on three overlays — §5.1 (6)'s check advancing a variation whose content equals the current scope's or an earlier variation's to the next unused reroll, within `reroll.maxAdvance` — …" |
| VD0-18 | minor | broken-reference | determinism | §7.1 code comment (l. 7847) | "ConversionOp and Works §4.11's … UndergroundLink II.7.6's": `Works` (l. 1845) and `UndergroundLink` (l. 1841) are declared in §2.7 | "ConversionOp §4.11's; Works, LightSource and UndergroundLink §2.7's (their rules §4.11's, §4.7's and II.7.6's); DossierChange §7.7's; ClosureRecord §7.3 item 9's" |
| VD0-19 | minor | missing | determinism | §7.1 edit-target table | attribute paths §2.8's registry gives an edit kind or derivation are absent: `Use.concealmentSource`, `Gallery.walkway`, `LabelEntity.displayText` (§9.1), `RegionGroup` rename and delete (§2.8 l. 2111) — §13.2's path-completeness test reads this table | uses row: after "`knownTo`, item 63" add "(`concealmentSource` written with `concealment` — `edit` for a map value — no edit kind of its own)"; underground row: add "`walkway` derived by II.7.5, no edit kind of its own"; names row: add "`setAttr` of a label's `displayText` (§9.1), a region group (`RegionGroup`, §9.1) renamed by `setAttr` and removed by `delete`" |
| VD0-20 | minor | partial | determinism | §5.2 F-PLOT | §4.7 S11's cluster fallback "A plot too narrow for a trunk and one structure depth takes the `hovel` arrangement instead (reported)" is no rung (seat T note 4 (g)); test cell has a lower-case glitch "re-cut. every cluster structure" | ladder cell: after the cluster sentence add "a plot too narrow for a trunk and one structure depth takes the `hovel` arrangement, reported (§4.7 S11)"; test cell: "the same after every plot re-cut. every cluster structure" → "the same after every plot re-cut; every cluster structure" |
| VD0-21 | minor | broken-reference | kernel | §3.1 `Warning` union (l. 2488) | §5.2 F-CUT and §4.6 step 8 (c) raise `W_CUT_SLID` (J-Fredteam-1); the union lacks it (assembler finding 1, still open) | add `'W_CUT_SLID'` to `Warning.code`, commented "§4.6 step 8 (c)'s foot slide; its step count in the warning's detail (J-Fredteam-1)" |
| VD0-22 | minor | partial | determinism | §5.4 `kernel.warnings` comment | lists §3.1's codes without `W_CUT_SLID`, which F-CUT reports | add `W_CUT_SLID` to the comment's list |
| VD0-23 | minor | partial | determinism | §7.5 weekless `epoch`; J-A76.72 | "takes the week its predecessor's week and its own `years` give (52 weeks a year …)" omits the rounding that §4.11's `EpochInputs.week` states; weeks are integers (seat T note 4 (h)) | "takes its predecessor's week + round(52 × `years`), §4.11's `EpochInputs.week` rule (the first epoch's predecessor week 0; …)"; J-A76.72 row and Part A: "plus its own `years` × 52" → "plus round(52 × `years`)" |
| VD0-24 | minor | stale | determinism | §7.4 row `drawPassage / … / setAttr(knownTo)` | "a dossier-backed institution's later dossier value re-imposes over a map override, reported (§7.7)" is the override clause J-A20.77 supersedes; §7.7 item 7 no longer states it | "a `knownTo` the dossier set is dossier-owned and a map `setAttr` of it is refused (§7.1, §7.7 item 7; J-A20.77); a dossier event that sets one writes it as any dossier fact" |
| VD0-25 | minor | stale | determinism | §7.4 row `drawTunnel / drawChamber / addLink / placeAccess`, migrate cell | "an access point whose tunnel is unmapped is orphaned and reported"; the access now names its `element` (§7.1; §7.5 maps old `tunnel` to `element`) | "an access point whose element is unmapped is orphaned and reported" |
| VD0-26 | minor | duplicate | scope | §13.3 *Amendments c in the goldens* | restates item 52's test ("for 20 golden seeds, … after 50 other maps and after every view toggle and zoom stop"), which §6.5 (9) states; the route gave §13.3 one pointer sentence | "… also holds §6.5 (9)'s *session-history independence* test (item 52) and B-DOSSIER-lite's fixture digests (T73-8, §13.2)" |
| VD0-27 | minor | conflict | kernel | §3.2 (9); §2.2 `Plat.frame` | §4.11 *The rung at an epoch* grows the frame at an upward crossing and says "the kernel's statement is §3.2 (9)'s", which sizes the frame once; `Plat.frame` is `readonly` (§2.2 l. 523); §7.7 DR23 cites "§3.2 (9)'s frame rule" for the epoch rung | append to §3.2 (9): "At an epoch whose target crosses a band upward past what the frame holds, the frame grows to the area this rule gives the new target and never shrinks; one L0 batch replaces the `margin` and `border` chains, every face inside the old margin byte-identical (§4.11)"; §2.2: `frame`'s comment "changed only by that batch" |

## 4 Checks run (receipts in scratch `vd0/`)

* **Held parts and gates.** The held phrases searched in §5–§7 were "visibly", "differ from a fresh", "no cast shadow",
  "160", "VG 1.6.9's cast", "night-light layer" and "ambient-occlusion gradient"; each returned 0 hits. The gate (b)
  script (`gateb.py`) checked every sentence new since the archive. Its only hits are pre-existing text inside changed
  sentences ("FTG V1", "NG roof jitter", the "MFCG tool" table header) or preset and type names.
* **J ids.** 142 ids are cited in §5–§7. Against the 704 index rows and the 704 Part A rows, every one resolves except
  `J-K` (IMPROVEMENTS). The 48 J rows E1 and E2 added were read: their § columns match their texts.
* **Single source.** Each of these is declared once: `CircumstanceSlice`, `DistrictIntent`, `TradePartner`,
  `PowerStanding`, `EconomyShares`, `DossierBinding`, `CarriedFacts`, `DossierChange`, `ClosureRecord`, `PointsForm`,
  `Works`, `LightSource` and `TradeFlow`.
* **Regression diff.** 100 archive sentences are absent from the assembled §5–§7, and each was read. Every one was
  replaced as its route intended. The diff also exposed two old clauses that survive unchanged in §7.4 although their
  siblings were rewritten: VD0-24's knownTo re-imposition (dropped from §7.1 and §7.7) and VD0-25's "tunnel".
* **Seat notes.** E2's cross-note 4 (c) (the kernel's "part 0" against II.7.6's `dug` part) is closed: §3.4 as installed
  does not say part 0, and §2.2, §2.9 and §8.4 put a dug system in its own part. The other seats' notes to E1 and E2 were
  checked, and those still open are VD0-01 (T 4 (a)), VD0-02 (M 2 (c)), VD0-03 (T 4 (d)), VD0-19 (M 2 (d), R 1),
  VD0-20 (T 4 (g)) and VD0-23 (T 4 (h)).
* **Document checks.** The command was `python3 docs/validation/bench/doc_checks.py --sections "5,6,7" --allow
  docs/validation/doc-checks-allow.tsv`, run on the installed design `7f4c0e25…` against a corpus of 9 626 JSON files,
  916 623 3-grams and 478 lists. The results were C1 5 / 0, C2 0 / 0, C3 249 / 0, C4 3 / 0, S1 0 / 0 and S2 0 / 0
  (hits / unreviewed), with exit 0.

## 5 CONFIRMED versus PLAUSIBLE

CONFIRMED, by executed grep, script or check on the installed files:
* every quoted text and line number;
* the J-id resolution;
* the single declarations;
* the absence of the held phrases;
* the doc-check counts;
* each issue's two conflicting texts.

PLAUSIBLE, as a reading:
* that the required changes are the smallest fixes coherent with the rulings they cite;
* the severity grading;
* VD0-04's reading of the route's staging over §2.7's exception.
