# verify-rendering-r1 — lane amendments-b/verify-rendering-r1 (VERIFY the RENDERING part, §8, §9, §11, §12, after repair round 1)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-rendering-r1).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
BASE: docs/ARCHITECTURE.md sha256 365e19f2… (assemble-r1 installed); rationale 50a94f2d…
READ: r0 report, assemble-r1, repair-r1-rendering report, §8/§9/§11/§12 diff r0→r1 (53 hunks), the 16 replaced subsections whole, §5.4, §2.5/§2.6/§2.8/§2.9 excerpts, verify-model/pipeline/determinism-r1 — done
ITEMS (8, 11, 12, 14, 15, 16, 17, 19, 20, 21, 22, 26, 28, 29, 30, 31): done (§2)
RE-CHECK VR-01..VR-33 and the other seats' rendering-owned issues: done (§3)
CHECKS (single-source, stale, cross-part, deferral, broken-reference, new-problem): done (§4); citing-lines sweep 81 changed + 469 unchanged lines outside the part
ISSUES: VR1-01 … VR1-08 written (§5)
RECEIPTS: roofband_check.out, refs-out.json, dc-part.txt, cite-new.txt (scratchpad vr1/) — done
STATUS: COMPLETE

Document verified: `docs/ARCHITECTURE.md` as installed by amendments-b/assemble-r1 (sha256 `365e19f24743c88a…`, 12 793
lines; unchanged during this lane). Rationale `50a94f2d…`. Before-text: `docs/archive/ARCHITECTURE-pre-amendments-b-repair-r1-2026-09-27.md`
(sha256 `87d89692…`, the document my r0 report verified). My earlier report: `verify-rendering-r0.md`.

## 1 Outcome

Repair round 1 fixed every issue my r0 report raised, and the rendering-owned issues of the other verifiers too. All 33 r0
issues (VR-01 … VR-33) are FIXED at the text level. So are V-MAB-34, V-MAB-41, VK-24, VK-25, VK-26, VP-04, VP-37 and
VD-14b. The one leftover is VR-03's rendering half: §11.2 still restates §5.4's list (VR1-01). Items 28 and 30, PARTIAL in
r0, are now PRESENT. The other fourteen routed items stay as r0 judged them: 13 PRESENT, and item 26 N/A as recorded.

The round found **8 new issues, all minor**. Six are owned by rendering, one by scope, and one (VR1-02) by rendering but
gated on a model fix:
* **VR1-01** — the leftover duplicate described above.
* **VR1-02** — the span mark rests on a footprint-ring cut that §2.6 does not define. This is the rendering side of the
  model verifier's major V-MAB1-01.
* **VR1-03** — permalinks rebuild every name but fall outside the new "document formats only at tier `secret`" rule.
* **VR1-04** — §11.2's reason for leaving `fates` unfiltered cites §11.1 wrongly.
* **VR1-05** — the bridge has no reply for a refused `export.request`.
* **VR1-06** — the room-label size names a style field no type declares.
* **VR1-07** (scope) — T30-5 tests three of the six filtered query kinds and not the document-format refusal.
* **VR1-08** — §8.9's pool bullet omits `plan()`.

No issue needs an owner ruling. Two recorded rulings are worth the owner's plain-language attention (§6): J-A30.85 now
refuses the save file to a viewer whose key is not `secret`, and J-A19.81 colours `lit` roofs by the current prosperity
band.

## 2 Per item — is the mechanism there, in the terms the route asked?

r0 verdicts are in `verify-rendering-r0.md` §2. This round re-read every item whose rendering home was replaced.

| item | r0 | r1 | where it stands now (quoted, live text) | open issues |
|---|---|---|---|---|
| 30 (rendering: the label policy §9.2/§9.5; §8.2/§8.3/§8.5; §11.1–§11.4) | PARTIAL | **PRESENT** | §9.2 admission table plus "It is `knowledge.admit`, a §7.6 rule table keyed by (`knownTo`, tier) whose one cell is `coarsest: LodBand`"; "the per-viewer view key `knowledge` (its tier and `places`, §2.9; its default and authority, §11.3)"; §11.2 "`query` answers of every kind — `gazetteer`, `people`, `whereIs`, `relations`, `hit`, `inView` … a band-less one … admits as at the city band"; §11.1 "`export` offers them only to a key of tier `secret` … `E_KNOWLEDGE_TIER`"; §8.2 "A row keyed by `use` or `owner` skips a mark whose `knownTo` column (§8.1) the view's knowledge key does not admit"; §8.8 "the knowledge key while a `use`- or `owner`-keyed thematic row is active"; §9.2 "a plot's default from its exposure being §2.5's" (§2.5: "sealed → secret") | VR1-03, VR1-04, VR1-05, VR1-07 |
| 28 with (f) | PARTIAL | **PRESENT** | §8.5 "the click re-derives the rung from its canonical prior … never from the cache (§2.6, §7.3; J-A28.71)"; §8.6 the same; §11.1 "`scope` — `unit`, `shared`, `service` or `circulation` — and, for a `unit` room, `unit` … the plan's `units` (each household's address, its unit form and its entry opening)"; §12.7 "at most the band set's rows less one (five: the default set has six rows, §2.6) plus the building's capacity less one"; §8.5 room labels and lights; §8.6 "A derived plan's chimneys (`Chimney`, §2.6) rise through the roof"; §11.1 per-storey `lights`; §8.8 `storey`, `plotsOnly` in the tile key; §8.2 `readsElaborations`; §12.7 "`compose()` … on its click under `elaborate: 'click'`"; §11.1 J-A28.86 plan blocks; §12.8 "`favourites` and view pins" | VR1-02, VR1-06, VR1-08 |
| 8 | PRESENT | PRESENT | §8.2 `states` rows; `reused` now "a trace worked as the kind `Building.reusedAs` names" (J-A8.22); `wall` `superseded` keyed as `StateRow` declares | — |
| 11 | PRESENT | PRESENT | §8.2 tunnel decline row; the undeclined tunnel look is now stated in the programs paragraph ("a tunnel draws by its `Tunnel.kind`") | — |
| 12 | PRESENT | PRESENT | §8.4 "(§2.1, II.7.3)"; §11.1 VTT per depth band, GeoJSON depth and ceiling, CityJSON underground `Building` | — |
| 14, 15 | PRESENT | PRESENT | §8.4 "Toggles are visibility; existence is model" (unchanged) | — |
| 16 | PRESENT | PRESENT | §12.4 S10b row (unchanged); §12.6 post-build placement ≤ 30 ms | — |
| 17 | PRESENT (entries missing in §5.4) | PRESENT | §5.4 now declares `changes: ReportEntry[]` "§11.2's `report.changed` sends the entries appended since its last delivery"; §11.2 still restates the list | VR1-01 |
| 19 | PRESENT | PRESENT | §8.2 "A material is a rendering attribute only"; the roof colour by band (J-A19.81), contrast re-derived (§7) | — |
| 20, 22 | PRESENT | PRESENT | §11.3 "**One way** …" and §11.4 (2) (unchanged) | — |
| 21 | PRESENT | PRESENT | §11.3 transport bullet (unchanged); summary now "(§11.3, §17.3, D-22)" | — |
| 26 | N/A | N/A | §12.4 hinterland row unchanged (J-A26.41) | — |
| 29 | PRESENT | PRESENT | §8.3 entrance census now by §2.6's rules 1–3; §8.5 "entrance ticks (the entrance set itself is S11's, §2.6)" | — |
| 31 | PRESENT | PRESENT | §8.2 `condition` row (unchanged); "`builtBand` … read by no render rule" | — |

## 3 Re-check of the r0 issues and the other seats' rendering-owned issues

Each verdict was read on the live text. Line numbers are the live document's.

| issue | verdict | evidence |
|---|---|---|
| VR-01 (= VD-14b, VP-04, VK-26) | FIXED | §8.5 l. 7996–7998; §8.6 l. 8020–8021 "re-derives it from its canonical prior, never from the cache, which only memoises the chain's steps" |
| VR-02 (model) | FIXED | §2.9 l. 2022–2025 `{ tier; places }`, default and authority → §11.3 |
| VR-03 (determinism) | FIXED at §5.4 (l. 5593–5599); **rendering half not applied** | §11.2 l. 9165 still lists the entry kinds → VR1-01 |
| VR-04 (= VK-25, V-MAB-34) | FIXED | §12.7 l. 9672–9678; the bound agrees with §2.6's canonical chain (rows first, then households, count clamped per row) |
| VR-05 | FIXED | §11.1 JSON row; J-A28.84 restated (index l. 12700, Part A) |
| VR-06 | FIXED, with a model dependency | §8.5 (2) span mark, §8.4 caster, §8.2 arch row, §11.1 glTF and CityJSON; the footprint-ring cut is not in §2.6 → VR1-02 (= V-MAB1-01's rendering side) |
| VR-07 (= VK-24) | FIXED | §8.5 "Room labels and lights"; §8.1 item 2; §9.2 obstacles; §8.6 chimneys; §11.1 per-storey `lights`; §2.6 `Room.lit` "(§8.5, §11.1; J-A28.32)"; §3.8 `spine` "(§2.6, §8.5, §11.1; item 28)"; the size pointer → VR1-06 |
| VR-08 | FIXED | §9.2 "the building band only (its own view, J-A30.83)"; §11.2 "a secret place at the building band (§9.2's table)" |
| VR-09 | FIXED | §11.2 "`query` answers of every kind" and the band-less rule; the new `fates` sentence → VR1-04 |
| VR-10 | FIXED | §11.1 document formats only at tier `secret`; §9.2 and §2.9 "every picture and interchange export"; permalinks unclassified → VR1-03 |
| VR-11 | FIXED | §8.2 "Thematic layers" skip rule and legend clause; §8.8 key |
| VR-12 | FIXED | §8.8 key l. 8071–8073; §8.9 raster-export row |
| VR-13 | FIXED | §8.2 `readsElaborations`; §8.9 live-layer row |
| VR-14 | FIXED | `StateRow.kind` includes `passage`, `state` comment names `superseded` and `sealed`; the out-of-type rows moved to the programs paragraph |
| VR-15 | FIXED | §8.3 `states` row: a TOWN for building, wall, gate and passage conversions, a hand-built CITY fixture for tunnel and island |
| VR-16 | FIXED | §8.3 entrances row by §2.6's rules 1–3 |
| VR-17 | FIXED | §8.2 roof by band; the six values pass (receipt §7) |
| VR-18 (with V-MAB-06, V-MAB-41) | FIXED | §2.5 "sealed → secret"; §8.1 comment; §9.2 fill rule stated once |
| VR-19 | FIXED | §9.2 and §11.3 point to §2.9 |
| VR-20 | FIXED | §8.4 "(§2.1, II.7.3)" |
| VR-21 | FIXED | 0 "J33" in the part |
| VR-22 | FIXED | §11.1 "a plot's `exposure` and `knownTo`, a building's `knownTo`, and an institution's `knownTo` on the features of its buildings" |
| VR-23 | FIXED | §12.7 stage-3 hook row |
| VR-24 (= VP-37, V-MAB-34) | FIXED | §12.6 `siltReach` |
| VR-25 | FIXED | §12.6 `refloatIsland`, `raiseIsland`, `relet` of a stored plan |
| VR-26 | FIXED | §8.5 "entrance ticks (the entrance set itself is S11's, §2.6)" |
| VR-27 | FIXED | §8.9 "≤ 97 B per label row", `knownTo` listed |
| VR-28 | FIXED | §11.1 "Where exports run" plan-block clause (J-A28.86) |
| VR-29 | FIXED | §12.8 fallback; "view pins" is a §2.9 view key |
| VR-30 | FIXED | §9.2 `knowledge.admit`; §7.6 l. 7092 names it |
| VR-31 (scope) | FIXED | §13.3 l. 10298–10299 "at the `public` knowledge tier with no places (§9.2) — and, for one golden CITY, also at `secret`" |
| VR-32 (scope) | FIXED | summary l. 101 "(§11.3, §17.3, D-22)" |
| VR-33 (model) | FIXED | §2.9 declares `storey`, `depthBand`, `plotsOnly`. My r0 wording also copied their defaults into §2.9; that is the model verifier's V-MAB1-14 duplicate, and its fix (the defaults stay in §8.4 and §8.5) is right |

## 4 The checks

**SINGLE-SOURCE.**
* r0's three duplicates are gone: the `knownTo` fill rule (VR-18), the key's shape (VR-19) and the "own building view"
  (VR-08).
* One restatement remains: §11.2's `subscribe` row lists the kinds that §5.4's `ReportEntry` declares (VR1-01).
* The new mechanisms are each stated once:
  * `knowledge.admit` in §9.2, with §7.6 enumerating it;
  * the span mark in §8.5 (2), which §8.4, §8.2 and §11.1 point to;
  * room labels, lights and chimneys in §8.5 and §8.6, with §8.1, §9.2 and §11.1 pointing to them;
  * the roof-by-band rows in §8.2.
* §8.2 says twice, in one paragraph, that access points are `symbol`s on the ground layer. It is harmless and not raised.

**STALE.** Every probe returns 0 in §8, §9, §11 and §12:
* the old rules: lots as buildings, binary wealth, size by tier, one central market, the map editing the dossier, a
  licence default, and terrain or water that never changes;
* the old wording r0 listed: "J33", "five rows", "mutating the cached", `` `silt` ``, "96 B", "B-PLAN's spike", "own
  building view", "a sealed plot's reads", "a building's `exposure`", "every export (§11.1)", "Every export takes",
  "entrances, roof ridges", "in use, by `Tunnel.kind`", the `'plot'` state kind and "spanning wing's mass".

**CROSS-PART.**
* **Lines outside the part that cite it.** 81 of them changed this round; each was read for whether it still points
  right. All do, except two:
  * §13.2 T30-5 (VR1-07);
  * the `Wing.spans` base case (VR1-02).
* **Cross-part notes addressed to rendering:**
  * model's note (`Room.lit`, §2.9 "every export") — reflected, by the assembler's substitutions;
  * pipeline's note (VP-04, VP-37) — reflected;
  * scope's note (VS-35 hooks; the summary pointer) — reflected;
  * kernel's note (§12.7 "O(seed vertices)" kept) — reflected;
  * determinism's note (VR-03's second half) — **not reflected** (VR1-01).
* **Rendering's own notes to other parts:**
  * to model, "stating the footprint case beside `Passage.frontBuilding`" — not applied. The model verifier raised it as
    V-MAB1-01, with a different fix (`BaseWing.spans`), which VR1-02 follows.
  * to scope (VR-31) — applied.
* **Homes the part now points to.** Each supports the pointer: §2.5 `Passage.sealed`, `frontBuilding`, `headroomCm`;
  §2.6 `Room.scope`, `Room.unit`, `Plan.units`, `Chimney`, `reusedAs`, the canonical chain and `capacity`; §2.8
  `Existence` (every value is either in the census or excepted from it); §2.9 view keys; §3.8 `spine`; §3.10 seed
  tiling; §4.5 the band names and the interpolation of band-keyed tables; §5.4 `changes`; §7.6 `knowledge.admit`.
* **Other verifiers' issues that touch rendering text.** VD1-03, VD1-16 and VP1-05 (rung 1's roof loss) need no
  rendering change: §8.2's `condition` row already draws wear and patches only, and the roofless look is the `decayed`
  row.

**DEFERRAL-WORDING.** None. The five "later" hits are ordinary prose ("no later casing", "the later pin", "a later
entity", "every later licensing choice"), and the part holds no "TBD", "open" or "deferred".

**BROKEN-REFERENCE.**
* **Syntactic.** `refs.py` on the live document: 139 headings, 35 D ids, 459 J ids, 2 broken. Both are the pre-existing
  external citations (`os-geometry.md` §2.1.4 and RFC 7946 §3.1.6, the latter at l. 9012 in §11.1).
* **Semantic.** One: §8.5's room-label size names a style field that does not exist (VR1-06).

**NEW-PROBLEM.** The repair's own new text created:
* the permalink gap (VR1-03);
* the bridge's missing export refusal (VR1-05);
* the `fates` reason (VR1-04);
* the pool bullet that lacks `plan()` (VR1-08). This one is older: amendments-b r0 added `plan()` to thread (1), not
  (2), and I missed it in r0.

**DOCUMENT CHECKS.** `doc_checks.py --sections "8,9,11,12"`: C1 5/0, C2 0/0, C3 154/0, C4 1/0, S1 0/0, S2 0/0, exit 0.

## 5 Issues (all minor; each with its owning part and the exact change)

### VR1-01 — minor · duplicate · rendering · items 17, 20, 22 — §11.2 `subscribe` row restates §5.4's report entries

**Claim.** §5.4 now declares the entries and names the consumer: "`changes: ReportEntry[]; // … §11.2's `report.changed`
sends the entries appended since its last delivery`". But §11.2's call table (l. 9165) still lists them itself: "`report.changed` — the report's new entries, §5.4: placement
rejections and positive placements with their lapses, use openings, closings and relocations, mutation records and
disruption reports; items 17–22". This is the second half of VR-03's required change. The determinism repair's
cross-part note asked for it too, and no seat applied it.

**Required change (§11.2, `subscribe` row).** Replace the quoted text with "`report.changed` — the `changes` entries of
§5.4's `GenerationReport` appended since the last delivery; items 17–22".

### VR1-02 — minor · conflict · rendering (after model's V-MAB1-01) · items 30 × 28 — the span mark's base case, §8.5 (2), §11.1 "3-D", J-A30.87

**Claim.** §8.5 (2) defines the span ring as "§2.6's cut of the `Passage` face under the spanning wing (`Wing.spans`);
before any composition exists, the same cut made by the footprint ring". §2.6 declares `spans` on the composed `Wing`
only and defines the cut on a wing ring. The "footprint ring" case therefore has no home.

The model verifier's major V-MAB1-01 fixes this at the source: `BaseWing.spans`, written by S11 and inherited by a
composition. Once that lands, three rendering texts still describe the old workaround:
* §8.5 (2)'s "before any composition exists, the same cut made by the footprint ring";
* §11.1's 3-D row, "`Wing.spans`, §2.6";
* J-A30.87's "cut with the footprint until the building is composed".

**Required change (with V-MAB1-01).**
* §8.5 (2): replace "§2.6's cut of the `Passage` face under the spanning wing (`Wing.spans`); before any composition
  exists, the same cut made by the footprint ring —" with "§2.6's cut of the `Passage` face under the base wing that
  spans it (`BaseWing.spans`, which a composed wing inherits as `Wing.spans`) —".
* §11.1, 3-D row: replace "(§8.5 (2); `Passage`, §2.5; `Wing.spans`, §2.6)" with "(§8.5 (2); `Passage`, §2.5;
  `BaseWing.spans`, §2.6)".
* J-A30.87's index row: replace "the passage's span ring, cut with the footprint until the building is composed" with
  "the passage's span ring under the base wing that spans it".
* J-A30.87's Part A entry: replace "(§2.6's cut of the `Passage` face under the spanning wing, made with the building's
  footprint ring until the building is composed)" with "(§2.6's cut of the `Passage` face under the base wing that spans
  it, `BaseWing.spans`, which a composition inherits)".

### VR1-03 — minor · new-problem · rendering · item 30 (d) — permalinks fall outside §11.1's document-format rule

**Claim.** §11.1's Knowledge paragraph offers "the document formats — `.plat`, the compact twin and the JSON schema" only
to a key of tier `secret`, because they "are the model and carry every name". A permalink is also an `export` format:
"*Model formats* — … CSV and permalinks". It carries "the canonical recipe" plus "`&l=` … the deflated CBOR log" (§6.4),
which rebuilds every name and every `knownTo` edit. Yet it is neither refused nor classified as a picture or interchange
export. A `public`-tier viewer can therefore export a permalink and hand anyone the whole town, which defeats the rule
J-A30.85 records.

**Required change.**
* §11.1 Knowledge: "The document formats — `.plat`, the compact twin and the JSON schema — are the model" → "The document
  formats — `.plat`, the compact twin, the JSON schema and a permalink (its recipe and log rebuild every name, §6.4) —
  are the model".
* J-A30.85's index row: "the document formats go only to a key of tier `secret`" → "the document formats and
  permalinks go only to a key of tier `secret`".
* J-A30.85's Part A entry: "(`.plat`, the compact twin, the JSON schema)" → "(`.plat`, the compact twin, the JSON schema,
  a permalink)".

### VR1-04 — minor · conflict · rendering · item 30 (d) — §11.2's reason for unfiltered `fates` cites §11.1 wrongly

**Claim.** §11.2 says "`fates` pages and a `confirm` result go only to an editing role, which holds the whole document
(§11.1's document formats), and are not filtered". But §11.1 gives the document formats by key tier ("only to a key of
tier `secret`"), not by role. And §11.3 lets the host set any client's key below its role's default ("the host may set
any viewer's key by `view.set`"). So an editor whose key the host lowered is refused `.plat` by §11.1, yet by the cited
reason it "holds" it.

The real reasons the lists stay unfiltered are two. `confirm` commits only when "the fates and the renames equal the dry
run's lists". And an editing client holds the document it loaded, for which §11.1 says the key is no secrecy boundary.

**Required change (§11.2).** Replace "go only to an editing role, which holds the whole document (§11.1's document
formats), and are not filtered" with "go only to an editing role and are not filtered: `confirm` needs the lists back
unchanged (*Confirming fates*, below), and an editing client holds the document it loaded (§11.3's `doc.load`), for
which the key is no secrecy boundary (§11.1)".

### VR1-05 — minor · new-problem · rendering · item 30 (d) — the bridge has no reply for a refused `export.request`

**Claim.** J-A30.85 made `export` refusable ("refuses any other key with the API error `E_KNOWLEDGE_TIER`"). The bridge
vocabulary answers the host's `export.request { fmt, opts }` only with `export.ready { bytes }` (§11.3). `doc.rejected`
covers document events only. A bridged client asked for a document format under a `public` key (or failing any export)
therefore has no message to answer with.

**Required change (§11.3, Vocabulary).** Replace "`export.ready { bytes }`" with "`export.ready { bytes }` or
`export.refused { error, message }` (an API error of `export`, §11.1's `E_KNOWLEDGE_TIER` among them)".

### VR1-06 — minor · broken-reference · rendering · item 28 — the room-label size names an undeclared style field (§8.5)

**Claim.** §8.5 sets a room label "at the largest size up to the one the sheet's label style gives rooms (§8.2 `labels`)
… and not at all below the smallest size §9.4 allows a label". But `StyleSheet.labels: LabelStyle` is only glossed
"faces, floors, halo rule (§9.4)". `LabelStyle` is declared nowhere, and §9.4's legibility floors have no room row. So the
upper bound resolves to nothing, and §8.3's plan-draw census cannot check a size.

**Required change.**
* §8.5: replace "at the largest size up to the one the sheet's label style gives rooms (§8.2 `labels`) whose glyph boxes
  fit within the room's ring, and not at all below the smallest size §9.4 allows a label" with "at the largest cap
  height in §9.4's room-label range whose glyph boxes fit within the room's ring, and not at all below that range".
* §9.4 *Legibility floors*: append "; room labels (the building band's plan draw, §8.5) cap 5–9 px — the address floor
  up to 1.5 × the point-label floor — the largest that fits its room".

The 5–9 px range is PLAUSIBLE, a vetoable calibration.

### VR1-07 — minor · partial · scope · item 30 (d) — §13.2 T30-5 does not test the repaired knowledge reach

**Claim.** The repair added three mechanisms to §11.1 and §11.2:
* the filter over every `query` kind (`people`, `whereIs`, `relations` included);
* the band-less city-band column;
* the document-format refusal (`E_KNOWLEDGE_TIER`, J-A30.85).

T30-5 (l. 10220–10222) still reads "`query` (`gazetteer`, `hit`, `inView`) and hover … list its row with `withheld:
true` at the `public` tier and its name at `secret`". So the new mechanisms have no bar. Rule (2) requires the test
that proves each one. (§8.3's knowledge census covers the theme and placement halves.)

**Required change (§13.2 T30-5).** Replace T30-5 with "(T30-5) by §11.2's knowledge rule, `query` of every kind
(`gazetteer`, `people`, `whereIs`, `relations`, `hit`, `inView`) and hover on a document holding a `secret` institution
list its row with `withheld: true` at the `public` tier — a person working there naming it by its address only, and
the band-less kinds and a GeoJSON export withholding it as at the city band — and its name at `secret`; `export` of
`.plat` and of a permalink under a `public` key fails with `E_KNOWLEDGE_TIER` and succeeds under `secret`; and by §9.5
a withheld place gets no number, letter or row in the legend."

### VR1-08 — minor · partial · rendering · item 28 — §8.9 thread (2) omits `plan()`

**Claim.** Thread (1) says the generation worker "hands stage-3 `compose()`, `plan()` and close-up derivation (§8.6) to
the derivation pool". §12.7 has `plan()` "run by the derivation pool". But thread (2), the pool's own list, reads "on
request, `compose()` and close-up derivation from the committed state of the district it is handed". This dates from
amendments-b r0, which added `plan()` to (1) only.

**Required change (§8.9, Threads (2)).** "on request, `compose()` and close-up derivation" → "on request, `compose()`,
`plan()` and close-up derivation".

## 6 Rulings in force and what the owner may want to know (no ruling needed from this lane)

* **J-A30.85 in plain words.** Secret places stay secret on screen, in pictures and in shared files. They are not
  secret from anyone who is handed the town's own save file. The module now refuses to write that save file, and (with
  VR1-03) a permalink, for a viewer whose knowledge key is not `secret`. This is a behaviour change of the API, recorded
  and vetoable.
* **J-A19.81: roofs coloured by the current band.** The `lit` roof tone follows the prosperity field as it stands now,
  never `builtBand`. After an epoch that moves a block's band, every roof of the block changes tint at once, while the
  fabric's wear (`condition`) changes slowly by item 31's ladder. It is consistent with §8.2's rule that no render rule
  reads `builtBand`, and FTG (static) is silent on it. Whether a roof tint should instead follow the stock is a question
  for Fable, not a defect.
* **Carried from r0, still standing.** Item 21's §11.3 sentence is kept. J-A28.42 (eager footprints at city zoom;
  "plots without buildings" as the `plotsOnly` view) is a ruling against the owner's literal words, surfaced for veto.

## 7 Reading record, CONFIRMED versus PLAUSIBLE, receipts

**Read whole:**
* `assemble-r1.md`, `repair-rendering-r1-report.md`, and my `verify-rendering-r0.md`;
* the diff of §8, §9, §11 and §12 against the pre-repair archive (40 + 13 hunks);
* the 16 replaced subsections of the part in full: §8.1–§8.6, §8.8, §8.9, §9.2, §11.1–§11.3 and §12.6–§12.8, with §8.10
  and §9.1 as neighbours;
* §5.4 in full.

**Read in part:**
* §2.5 `Plot`, `Passage`;
* §2.6: `Wing`, `Room`, `Plan`, `Chimney`, the re-cut and the canonical chain;
* §2.8 `Existence` and the ladders; §2.9's view state;
* §3.8 `spine`; §3.10's seed-tiling row;
* §4.1's click policy; §4.5's band set; §6.4's permalinks; §7.6's enumeration;
* §13.2 T30; §13.3's placement digests;
* II.4;
* the rendering J-A index rows and Part A entries;
* owner words for items 19, 27, 30 and 31;
* `route.json`'s rendering routes;
* the cross-part sections of the five other repair reports;
* the issue lists of `verify-model-r1.md`, `verify-pipeline-r1.md` and `verify-determinism-r1.md` wherever they touch
  rendering.

**CONFIRMED** (executed or read on the live document `365e19f2…`):
* every quotation above;
* the r0 → r1 diff;
* the stale and deferral probes;
* `refs.py`: 2 broken, both external;
* `doc_checks.py` on §8, §9, §11 and §12: exit 0;
* the contrast of the six `lit` roof rows, recomputed with the bench's colour helpers. Every row passes: ground ≥ 12.4 /
  14.5, road ≥ 17.6 / 22.3, garden and green ≥ 23.9, ink ≥ 36.3 / 41.0 (ΔE2000 / ΔL*). This matches the repair's
  figures.
* the citation sweep: 81 changed and 469 unchanged lines outside the part.

**PLAUSIBLE** (reasoning only):
* the severity grades;
* VR1-03's reading that a permalink is a document format;
* VR1-06's 5–9 px range;
* VR1-05's message name;
* the observation on J-A19.81.

**Receipts** (session scratchpad `…/scratchpad/vr1/`): `diff-8-9.txt`, `diff-11-12.txt`, `part.md`,
`roofband_check.py`, `roofband_check.out`, `refs-out.json`, `refs-run.txt`, `dc-part.txt`, `cite.py`, `cite-new.txt`.
