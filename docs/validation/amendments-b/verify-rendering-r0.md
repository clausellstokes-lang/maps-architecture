# verify-rendering-r0 — lane amendments-b/verify-rendering-r0 (verifier of the RENDERING part: §8, §9, §11, §12)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-rendering-r0)

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 1 inputs read (route items 8–31 for rendering, owner words, amend-rendering.md, the nine other seats' notes to rendering, assemble-r0.md): done
> STEP 2 sections read whole (§8, §9, §11, §12; §2.5–§2.9, II.6, II.7.1, II.7.3 excerpts cited; every line outside the part citing a changed rendering subsection — 112 new + 260 unchanged lines): done
> STEP 3 per-item verdicts: done (§2)
> STEP 4 checks (single-source, stale, cross-part, deferral wording, broken refs, new problems): done (§3)
> STEP 5 issue list (§4: VR-01…VR-33) + LANDED line: done

Document verified: `docs/ARCHITECTURE.md` as assembled by amendments-b/assemble-r0 (sha256 `87d8969209c7deb5…`, 12 417
lines, unchanged since assembly — checked at the start of this lane). Rationale file `3f39b2de…`. Archive used for the
before-text: `docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md`.

## 1 Outcome

Every item routed to the rendering part landed as a mechanism in the design's own terms, and nothing in the part is
deferred. Thirteen of the sixteen items are PRESENT, two are PARTIAL (28 and 30), and one (26) is correctly recorded as
not applicable. The verification found **33 issues: 3 major and 30 minor**. Of these, 28 are owned by rendering, 2 by
model, 1 by determinism and 2 by scope.

The **one major issue the rendering part owns** is **VR-01**. §8.5 and §8.6 say that a click on a stale rung
"re-derives it by mutating the cached state/result". §2.6, §6.2, §7.3 and J-A28.71 (as amended) say the opposite: the
rung is re-derived from its **canonical prior**, never from the cache. The part's own §12.8 agrees with them ("evicting
a rung to `absent` … loses nothing"). The determinism, pipeline and kernel verifiers found the same thing (VD-14b, VP-04,
VK-26); this report states it once.

The other two majors are owned by other parts but surface inside this one:
* **VR-02:** §2.9's `knowledge` key contradicts §9.2 and §11.3 (V-MAB-08).
* **VR-03:** §5.4 declares none of the report entries that §11.2's `report.changed` carries (VD-13).

The minors fall into six groups:
* the plan block's fields against §2.6's records;
* the re-cut chain bound ("five rows");
* the passage's covered extent, which the mass, the shadows and the 3-D export never read;
* the knowledge filter's reach — band-less readers, the other query kinds, the document formats, and `use`-keyed themes;
* §8.8's tile key, which is missing three new view keys that change pixels;
* seven pointer and wording fixes.

No ruling is needed from the owner to repair the part. One standing ruling goes against the owner's literal words and is
recorded for veto: J-A28.42 (J33), eager footprints at city zoom rather than "plots without buildings". It is surfaced in
§5, not raised as an issue.

## 2 Per item — is the mechanism there, in the terms the route asked?

| item | route's ask of rendering | verdict | where it stands (quoted) | issues |
|---|---|---|---|---|
| 30 (home: the label policy, §9.2) | knownTo filters a stop's candidates (local and secret hidden at the city band, local from the neighbourhood band, secret at the building band or with the key); digests per (stop, key), goldens at the empty set; legend; arch glyph; hidden court legible; reader and exports withhold; the key is a per-viewer view key; a dossier may designate secret | **PARTIAL** | §9.2: "a hidden or clandestine place is always on the map … what the map withholds is its name and its purpose", the admission table by `knownTo` × tier, "a stop's placement digest (§13.3) is therefore per (stop, knowledge key)"; §9.5 "a place the viewer's key does not admit at the stop gets no number, no letter and no row"; §8.2 passage-arch row; §8.5 (1) "never as a paper void"; §11.1/§11.2 Knowledge paragraphs; §11.3 "`knowledge` … defaults from its role"; §11.4 `Assignment.knownTo`. Gaps: band-less readers and three query kinds, the document formats, `use` themes, "own building view", the sealed default, the key's shape against §2.9, and the table's editability | VR-02, VR-08–VR-11, VR-18, VR-19, VR-30, VR-31 |
| 8 | style classes for vacant, derelict, ruined, cleared (trace), reused; neglected, breached and superseded walls with the old line | PRESENT | §8.2 `states` table rows `abandoned`, `decayed`, `ruined`, `cleared` (`trace('footprint')`), `reused`; walls "`abandoned` (neglected) … `decayed` (breached …) … superseded … `trace('ring')` — the old line as a hairline lighter than a wall" | VR-14, VR-15 |
| 11 | silted, caved-in and sealed tunnels and underground ruins through the cut-away | PRESENT | §8.2 tunnel row: "the band dashed / the band broken at the caved stretch with rubble stipple / the band as `trace('centreline')` with a closure glyph at each sealed end", "the underground layer" | VR-14 |
| 12 | each underground building on its own level; VTT per level; GeoJSON and CityJSON depth and ceiling | PRESENT | §8.4 "a tunnel, cell or vault is drawn — and exported, §11.1 — on its own level, the band that holds its floor, `z` ordering the bands inside the one underground arena"; §11.1 VTT "the underground one scene per depth band", GeoJSON "`baseCm` as its depth below the datum and `eaveCm` as its ceiling", CityJSON "an underground cell as a `Building` whose base lies below the datum", `Tunnel` | VR-20 |
| 14 | the sewer toggle is `LayerSpec.visible`; existence is model | PRESENT | §8.4 "The sewer control at CITY and METROPOLIS and the island view toggle set `LayerSpec.visible` … whether a network or an island exists is the model's — `Features.sewers` (II.7.1)" | — |
| 15 | the island toggle is the sky `LayerSpec.visible` | PRESENT | same bullet; "a toggle never creates what the settlement lacks" | — |
| 16 | S10b's budget row re-declared for relation and supply scoring | PRESENT | §12.4 S10b row "one more distance transform per producing class present … absorbed in this row's p50 … until M2b measures it"; "Re-declared rows (items 16, 26; J-A16.81)"; §12.6 "a post-build placement … ≤ 30 ms" | — |
| 17 | relocations reported to the host | PRESENT (its entry shapes are §5.4's, missing there) | §11.2 `report.changed` "use openings, closings and relocations"; §11.3 `report.changed { entries }` | VR-03 |
| 19 | materials map to colour and texture roles only (pointer to §2.6) | PRESENT | §8.2 "A material is a rendering attribute only (§2.6; item 19): its rows change colour and texture roles and never a mark's geometry" | VR-17 (cross-part: §2.6's roof colour by band) |
| 20 | the dossier door; the module never writes the dossier; `doc.changed` carries map events only; the host keeps the document opaque | PRESENT | §11.3 "**One way** … No PLAT → host message writes, patches or proposes a change to the host's dossier … the host stores the returned document as an opaque artifact of the map"; §11.4 (2) | VR-03 |
| 21 | (under the 2026-09-27 ruling) the bridge as the data-only boundary, no licence wording | PRESENT (satisfied) | §11.3 transport bullet "its messages carry data only … the module stays a separate program in its own bundle … (item 21 (d): a design choice …; J-A21.81)"; no licence wording in §8–§12. Ruled to keep the sentence (§5) | VR-32 (scope pointer) |
| 22 | dossier events through the host door, in the host's order | PRESENT | §11.3 "in the host's order — the ordered dossier history of item 22 (c)"; §11.4 (2) | — |
| 26 | only if the hinterland unit's order changes | N/A, recorded | §12.4 "The hinterland unit's row is unchanged … (J-A26.41)" | — |
| 28 (with (f)) | building band draws the plan; plots-only option; stale markers at every zoom; persisted cache replaces the in-memory memo; room graph in our JSON, VTT walls and doors per storey; one plan per click; the cache's memory; (f) rooms carry unit, household and entry door; the budget covers a re-cut chain | **PARTIAL** | §8.5 building band "the floor plan one storey at a time"; "`plotsOnly` … never the default"; change markers "at the building, neighbourhood and district bands … one marker at the city band"; §8.6 "the only cache of derived rungs — no per-session (entity key, revision, lod) memo"; §11.1 `plan` block and "one scene for each storey"; §12.7 plan row; §12.8 cache line. Gaps: the cached prior (major), the plan block's fields, the chain bound, room labels, lights and chimneys, the compose trigger, the tile key, the cache fallback | VR-01, VR-04, VR-05, VR-07, VR-12, VR-13, VR-23, VR-28, VR-29, VR-33 |
| 29 | entrance glyphs per role; VTT doors at every entrance; GeoJSON entrance points; glTF and CityJSON basements below `baseCm` | PRESENT | §8.2 entrance-tick row; §11.1 "`portals` — doors at every entrance of a building's entrance set"; GeoJSON "a building's `entrances` as points with their roles"; glTF "a basement … extruded down from `baseCm`"; CityJSON "a basement as a `BuildingPart` below `baseCm`" | VR-16, VR-26 |
| 31 | neglect classes (wear, patched roofs, a roof lost late); materials rendering-only; nothing in rendering reads `builtBand` | PRESENT | §8.2 row "`condition` `worn` / `neglected` … texture and colour only … no change at the city band"; "`builtBand` and the geometry floor (§4.11) are read by no render rule" | — |

## 3 The checks

**SINGLE-SOURCE.** Three facts are stated twice inside the part:
* the `knownTo` fill rule (sealed → `secret`; ways, districts, quarters, water, woods and gates `public`), in §8.1's
  `LabelTable` comment and again in §9.2 — VR-18;
* the knowledge key's record shape, in §9.2 and §11.3, although its home by R1 is §2.9's view-state list — VR-19;
* the "own building view" admission, in §9.2's table and again in §11.2 — folded into VR-08.

Everything else is stated once. The toggle-as-visibility rule is homed at II.6 (1) and II.7.1; §8.4 carries only the
rendering half, `LayerSpec.visible` and the depth-band cut, and points to both homes. The material rule is homed at
§2.6; §8.2 states only its rendering consequence.

**STALE.** Every stale-rule probe returns 0 in §8, §9, §11 and §12:
* lots drawn as buildings;
* binary wealth;
* size fixed by tier (§12 budgets are laws of the building count, and §12.2 scales the frame with population);
* one central market ("plaza-rooted" in §12.4 is §4.2 S3's own term — the centre's plaza stays the root, J-A24.41);
* the map editing the dossier;
* a licence default ("licensing" appears once, in §11.3's design-choice sentence);
* terrain and water that never change.

Five stale statements remain, all minor:
* "the ladder has five rows" — VR-04;
* `compose()` "on the tile's band request" under the click default — VR-23;
* "entrances" in the lazy list — VR-26;
* "≤ 96 B per label row" — VR-27;
* `silt` for the water conversion — VR-24.

**CROSS-PART.** Every cross-part note addressed to rendering was read against the text:
* reflected in full: determinism §4 and §8.7, kernel §4, the assignments seat (a)–(c), the evolution-islands seat, the
  prosperity seat, the sewers seat and scope (a)–(c);
* not reflected: the model seat asked §11.1 for `Room.scope`, `Room.unit` and `Plan.units`, and for `Passage` faces and
  `Wing.spans` — VR-05 and VR-06;
* half reflected: the emulation-hidden seat's "a `sealed` plot's label follows `secret`" — VR-18.

Pointers from the part into other homes that the home does not support:
* §2.9 lacks `storey`, `depthBand` and `plotsOnly` — VR-33;
* §2.9's `knowledge` contradicts the part — VR-02;
* §5.4 lacks the `report.changed` entries — VR-03;
* §13.3 keeps no digest per knowledge tier — VR-31.

Homes elsewhere that point into the part for a mechanism the part lacks:
* §2.6's roof colour by band — VR-17;
* `Room.lit`, §3.8's light point and `Chimney` — VR-07;
* `Wing.spans`, read by "the shadow pass and the 3-D export" — VR-06.

Two reverse pointers go wrong: the summary's "(§17.3, D-22)" for the separate program — VR-32 — and §8.5's "J33 of
`docs/PROGRESS.md`" — VR-21.

**DEFERRAL-WORDING.** None. The only staging in the part is roadmap staging stated as hooks: §12.4's staged sewer row,
the stage-3 hook rows, and §11.4's staged SettlementForge mapping.

**BROKEN-REFERENCE.** `refs.py` (the widened resolver) on the live document finds 2 broken references in the whole
document. The one inside the part is the pre-existing external citation "RFC 7946 §3.1.6" (l. 8726), so there are no
new syntactic breaks. The part has five semantic breaks, each a pointer to a place that does not hold the fact:
* §8.4's "(§2.7)" — VR-20;
* §9.2's "§4.6" for the sealed default — VR-18;
* §8.5's J33 — VR-21;
* §11.1's "a building's `exposure`" — VR-22;
* §12.7's "B-PLAN's spike (§16)", folded into VR-04.

**NEW-PROBLEM.** The amendments created ten contradictions with existing rules of the part:
* the tile key — VR-12;
* the live-layer trigger — VR-13;
* the `states` table against `StateRow` — VR-14;
* the census fixture — VR-15;
* the entrance census against §2.6 rule 3 — VR-16;
* "every export" against the document formats — VR-10;
* band-less readers — VR-09;
* `use` themes — VR-11;
* the JSON plan block reading the cache — VR-28;
* the cache fallback storing `edited` plans — VR-29.

## 4 Issues (most severe first; each with its owning part and the exact change)

### VR-01 — major · conflict · rendering · item 28 (b)–(c) — §8.5 (l. 7744–7745), §8.6 (l. 7765–7766)

**Claim.** Two sentences give a click on a stale rung the cache as its prior:
* §8.5: "it vanishes when the click re-derives the rung by mutating the cached state (§7.3)";
* §8.6: "a rung whose record (§2.8) reads `stale` is served from the cache until the click re-derives it by mutating
  the cached result (§7.3; item 28 (c))".

These contradict four texts:
* §2.6's `plan()` signature: "prior = the canonical prior a re-cut mutates … never the cache";
* §2.6's elaboration paragraph: "the next click re-derives it as a mutation from its **canonical prior** — the stored
  plan where one exists, else the as-built plan carried along the interior ladder — never from the cache";
* §7.3's stale-click row: "committed state, never the cache (§6.2) … the cache holds any step already derived and is
  only a memo";
* J-A28.71 as amended.

They also contradict the part's own §12.8, "evicting a rung to `absent`, which loses nothing because each rung is
derived purely from its building's committed state". Read as written, a plan would depend on when the user clicked,
which §6.5 (9)'s click-order identity forbids. The same finding is VD-14b, VP-04 and VK-26; this entry replaces all
three for the rendering part.

**Required change.**
* §8.5: replace "it vanishes when the click re-derives the rung by mutating the cached state (§7.3)." with "it vanishes
  when the click re-derives the rung from its canonical prior — the stored plan, else the as-built plan carried along
  §2.6's interior ladder — never from the cache (§2.6, §7.3; J-A28.71)."
* §8.6: replace "is served from the cache until the click re-derives it by mutating the cached result (§7.3; item 28
  (c))" with "is served from the cache until the click re-derives it from its canonical prior, never from the cache,
  which only memoises the chain's steps (§2.6, §7.3; J-A28.71; item 28 (c))".

### VR-02 — major · conflict · model · item 30 (d) — §2.9 "View state" against §9.2 and §11.3

**Claim.** The two homes describe a different key:
* §2.9: "`knowledge` (item 30: the knowledge sets the viewer holds — which `local` and `secret` places … name to this
  viewer; the empty set by default and in every golden)";
* §11.3 (J-A30.82) and §9.2: a tier `public` / `local` / `secret` plus `places`, defaulting by role — `owner` and
  `editor` `secret`, `viewer` `public` — set by the host, never raised by a client.

The shape differs and so does the default. This is the model verifier's V-MAB-08, confirmed here from the rendering side.

**Required change (§2.9).** Replace that parenthesis with: "`knowledge` (item 30: `{ tier: 'public'|'local'|'secret';
places: Id[] }` — the viewer's tier and the addresses of the places it has learned, which §9.2's label policy, the reader
(§11.2) and every export (§11.1) admit by §9.2's table; its default by role and who may set it are §11.3's, J-A30.82;
every golden is taken at tier `public` with no places)". Rendering then points to it instead of restating the shape
(VR-19).

### VR-03 — major · missing · determinism · items 17 (d), 20, 22 (b) — §5.4 against §11.2 and §11.3 `report.changed`

**Claim.** Two rendering sections promise report entries that §5.4 never declares:
* §11.2's `subscribe` row makes `report.changed` carry "the report's new entries, §5.4: placement rejections and
  positive placements with their lapses, use openings, closings and relocations, mutation records and disruption
  reports";
* §11.3's vocabulary sends `report.changed { entries }`.

§5.4's `GenerationReport` declares none of these entry shapes, so the host (SettlementForge) has no schema to read the
one-way flow's reports by. This is VD-13, confirmed here from the rendering side.

**Required change.**
* In §5.4, VD-13's `changes: ReportEntry[]` field is added, together with its union (`reject` | `lapse` | `place` with
  element and site; `open` | `close` | `relocate` with use, from and to; `mutate` with plot and record index;
  `disruption`, each with seq and epoch).
* Then, in rendering, §11.2's `subscribe` row reads "`report.changed` — the `changes` entries of §5.4's
  `GenerationReport` appended since the last delivery (items 17–22)" in place of its current list.

### VR-04 — minor · stale · rendering · item 28 (f) — §12.7 "Plan rung" bullet (l. 9371–9374)

**Claim.** The bullet reads: "A re-cut of a `stale` plan … runs as a chain of such steps — one per interior row or
household changed, its length known before the first open, since the ladder has five rows and `relet` moves one household
at a time (§4.11) … PLAUSIBLE until B-PLAN's spike (§13.2, §16) times it". Four things in it are wrong:
* (a) §2.6's interior ladder has one row per band of the set — six by default, `rich` to `squalid` (VK-25, V-MAB-34).
* (b) The canonical chain starts from the **as-built** plan: rows first from the built row, then households from
  `households.built` (§2.6, §7.3). It does not start from the last plan, and the cache may hold memoised steps (§2.9).
* (c) A **stored** plan is re-cut inside the event that changes its inputs, not on a click (§7.3's second row;
  J-A28.72).
* (d) §16 defines no "B-PLAN spike"; §13.2's T28-8 on the B-PLAN fixtures is the measurement.

**Required change.** Replace from "A re-cut of a `stale` plan" to "confirms it;" with: "A re-cut — of a `stale` plan
at its click, or of a stored plan inside the event that changes its inputs (§7.3; J-A28.72) — runs as §2.6's
canonical chain of such steps: one per band row crossed from the as-built row and one per household added or removed
from the template's `households.built`, fewer where the cache holds a memoised step (§2.9); its length — at most the
band set's rows less one (five by default) plus the building's capacity (§2.6) — is known before the first open;
budgeted at ≤ 5 ms × steps median and ≤ 20 ms × steps p95. PLAUSIBLE until §13.2's T28-8 times it on the B-PLAN
fixtures and the stage-3 intake confirms it;".

### VR-05 — minor · conflict · rendering · item 28 (f) — §11.1 "JSON schema" row, and J-A28.84

**Claim.** §11.1 exports a room's "`unit` — the address of the household whose dwelling unit the room belongs to, or
`shared`, `service` or `circulation` — and the unit's entry opening". That merges two fields and moves a third off the
record that holds it. §2.6 holds:
* `Room.scope` — `'unit'|'shared'|'service'|'circulation'`;
* `Room.unit?: Id` — present exactly when the scope is `unit`;
* each unit's `form` and `entry` on `Plan.units` (`{ household; form; entry }`).

The schema is "generated from the `zod` types", so the block must be those fields. The model seat's note asked for
`Room.scope`, `Room.unit` and `Plan.units`. The unit form — the owner's "all apartments …" ladder outcome — is not
exported at all.

**Required change.**
* §11.1: replace "rooms (address, ring in integer cm, role, `unit` — the address of the household whose dwelling unit
  the room belongs to, or `shared`, `service` or `circulation` — and the unit's entry opening)" with "rooms (address,
  ring in integer cm, role, `scope` — `unit`, `shared`, `service` or `circulation` — and, for a `unit` room, `unit`, the
  address of the household whose dwelling unit it belongs to), the plan's `units` (each household's address, its unit
  form and its entry opening)".
* J-A28.84's index row and Part A entry: "rooms with their household unit and entry opening" / "rooms carrying their
  address, integer-centimetre ring, role, household unit and entry opening" → "rooms with their scope and household unit,
  and each unit's form and entry opening".

### VR-06 — minor · missing · rendering · items 30 (c), 28 — the passage's covered extent: §8.5 (2), §8.4 "Shadow casters", §11.1 "3-D" and "CityJSON 2.0"

**Claim.** Three places either claim or need a covered extent that nothing supplies:
* §8.2's passage-arch row says "none at the city band, where the spanning wing's mass covers it (§8.5; J-A30.84)". But
  §8.5 (2) builds masses from footprint marks, and a spanning building's footprint ends at the passage's edge (§2.6
  stage-3 contract, §4.6). So the passage is a ground-tone gap in the streetwall wherever it is wider than the 1.5-px
  closing — nothing states the covering.
* §2.6's `Wing.spans` is "read by the plan rung, the shadow pass and the 3-D export", but §8.4's casters and §11.1's
  glTF and CityJSON extrusion never mention it.
* In the base the span is known through `Passage.frontBuilding`, `face` and `headroomCm` (§2.5), not through the composed
  `Wing`. A spanned passage would therefore be open to the sky in 3-D and cast no shadow above.

**Required change.**
* §8.5 (2): after "filled with `building`" insert "; a building over a passage (`Passage.frontBuilding`, §2.5; a composed
  wing's `Wing.spans`, §2.6) adds the passage face to its block's mass, so the spanned storeys cover it at the city band
  (J-A30.84)".
* §8.4 "Shadow casters": after "a wing's foundation skirt, §2.6, included)" insert "— a building over a passage casting
  from its upper extent, footprint ∪ the passage face, above the passage's `headroomCm`".
* §11.1 3-D row: after "per wing," insert "a building over a passage extruded across the passage face from its
  `headroomCm` to the eave, the passage left open beneath (`Passage`, §2.5; `Wing.spans`, §2.6),".
* §11.1 CityJSON row: after "LoD2.2 roof surfaces)" insert "(over a passage the solid spans it above `headroomCm`)".

### VR-07 — minor · broken-reference · rendering (one model pointer) · item 28 — room labels, lights, chimneys: §8.5 building band, §8.6, §11.1 "Per storey"

**Claim.** Three rendering mechanisms that other parts point to are missing:
* **Lights.** §2.6's `Room.lit` reads "a light at the room's spine summit (§8.5; J-A28.32)", and §3.8's `spine` reader
  names "each room's label spine and light point when the plan rung draws a storey on the building band (§2.6, §8.5)".
  But §8.5 draws "room labels" with no word on the spine and no light, and §11.1's per-storey scene exports no `lights`
  (VK-24).
* **Room labels.** They are not `LabelEntity` rows (§9.1's kinds; §8.1 "one row per LabelEntity"), and how they are
  placed is unstated.
* **Chimneys.** §2.6's `Chimney` ("the roof construction draws it (§8.6)") and plan step 6 ("drawn by §8.6") point to
  §8.6, whose roof construction draws no chimney.

**Required change.**
* §8.5 building band: replace "and room labels (§8.2's presets)" with "room labels, each set along its room's label spine
  (§3.8's `spine` reader; J-A28.32) inside the room by the plan draw — never an S13b candidate, a room being its own box —
  and a lit room's light point at its spine summit, drawn by the `lights` role in the `night` variants (§8.2's
  presets)".
* §11.1 "Per storey (item 28)": append "; `lights` — one per lit room (`Room.lit`, §2.6) at its spine summit, `{
  position, range in squares, intensity: 1, color, shadows: true }` as the scene-level `lights` above".
* §8.6 roof-construction paragraph: append "A derived plan's chimneys (`Chimney`, §2.6) rise through the roof at their
  columns, drawn as small stacks in the roof tone with an ink rim at the neighbourhood and building bands."
* Model: `Room.lit`'s pointer "(§8.5; J-A28.32)" → "(§8.5, §11.1; J-A28.32)".

### VR-08 — minor · conflict · rendering · item 30 (d) — "on that building's own view": §9.2 table, §11.2, J-A30.83

**Claim.** The `secret` × tier-`public` cell reads "the building band only, on that building's own view", and §11.2
repeats "a secret place is admitted on its own building view". The filter, however, is a function of (row, stop, key):
the memo and the placement digest are "per (stop, knowledge key)". A condition on which building the view is "on" cannot
be expressed in those terms, and it would break the per-stop digests if it were. J-A30.83's Part A entry reads it as
the band ("the building band is the building's own view"), the tier-`local` cell says only "the building band only",
and §8.3's census tests "above the building band".

**Required change.**
* §9.2's cell → "the building band only (the building's own view, J-A30.83)".
* §11.2: "a secret place is admitted on its own building view" → "a secret place is admitted at the building band
  (§9.2's table)".
* J-A30.83's index row: "a secret place shows on its own building view" → "a secret place shows at the building band,
  its own view".

### VR-09 — minor · new-problem · rendering · item 30 (d) — band-less readers and three query kinds: §11.2 "Knowledge", §11.1

**Claim.** §9.2's table admits a row "at a stop; the band is the stop's". Two gaps follow from that:
* **Band-less readers.** Several readers have no band: the gazetteer (a list), GeoJSON, CityJSON, glTF extras and CSV.
  Which column applies to them is unstated.
* **Uncovered query kinds.** §11.2 withholds only in "`gazetteer`, `hit`, `inView`" and hover. The `people`, `whereIs`
  and `relations` kinds answer with workplaces and households, so a secret institution's staff and trade reach a viewer
  whose key does not admit it. That goes against the owner's "the future clerk answers about secret places only to a
  viewer who does" (item 30 (d)).

**Required change (§11.2 "Knowledge").**
* Replace "`query` answers — `gazetteer`, `hit`, `inView` — and hover content" with "`query` answers of every kind —
  `gazetteer`, `people`, `whereIs`, `relations`, `hit`, `inView` — and hover content".
* After "marking the row `withheld: true`" insert "; a person's workplace or household that is a withheld place is given
  by its address only. A view-bound reader (`hit`, `inView`, hover) admits by its view's band; a band-less one — the
  gazetteer, `people`, `whereIs`, `relations`, and every export without a band (GeoJSON, CityJSON, glTF extras, CSV,
  §11.1) — admits by the city band's column, so a list or a file never names what the town view withholds".

### VR-10 — minor · new-problem · rendering · item 30 (d) — "every export" against the document formats: §9.2, §11.1 "Knowledge"

**Claim.** §9.2 says "every export (§11.1) — withholds the same names by the same table", and §11.1 says "Every export
takes the requesting viewer's knowledge key". The document formats cannot comply:
* `.plat`, the compact twin and the JSON schema are the model, round-tripping byte-identically (§11.1 row 1; §2.9).
  They cannot withhold a name without breaking that, and no rule says who may export them.
* A bridged client receives the whole document in `doc.load` (§11.3), so the key is a filter on what the module shows
  and writes, not a secrecy boundary.
* J-A30.82's "a viewer who could grant itself knowledge would make the filter decorative" then fails through
  `export(h, 'plat')`.

**Required change.**
* §11.1 "Knowledge": after its first sentence insert "The document formats — `.plat`, the compact twin and the JSON
  schema — are the model and carry every name; `export` offers them only to a key of tier `secret` (the `owner` and
  `editor` roles by default, §11.3) and refuses them to any other key with a conflict naming it. The key governs what the
  module shows and writes; it does not hide what a client that loads the document holds, so a host that keeps a place
  secret from a client sends that client pictures and interchange exports, not the document."
* §9.2: "and every export (§11.1)" → "and every picture and interchange export (§11.1)".

### VR-11 — minor · new-problem · rendering · item 30 (d) — `use`-keyed themes paint a withheld purpose: §8.2 "Thematic layers"

**Claim.** Thematic layers are "override rows keyed by entity attributes (`prosperity`, `use`, `epoch`, `owner`,
`material`)", drawn in `base` tiles and in picture exports. A `use`- or `owner`-keyed row colours a withheld place by its
purpose, and the legend's key names that purpose. This contradicts §11.1: "a shared SVG, PNG, VTT scene or GeoJSON
carries no name and no purpose of a local or secret place the key does not admit". It also contradicts §9.2's "what the
map withholds is its name and its purpose".

**Required change.** Append to §8.2's "Thematic layers." paragraph: "A row keyed by `use` or `owner` skips an entity
whose place the view's knowledge key does not admit at the band (§9.2), drawing it unthemed, so no theme or legend key
names a withheld purpose; while such a row is active the knowledge key joins the tile key (§8.8)."

### VR-12 — minor · new-problem · rendering · items 28, 12 — §8.8's tile key misses the new pixel-changing view keys (§8.8 "Cache and invalidation", §8.9 raster-export row)

**Claim.** Three new view keys change what `base` tiles draw:
* `plotsOnly` removes every building mark at the city and district bands (§8.5);
* `storey` chooses which storey's plan marks the building band draws (§8.5);
* `depthBand` chooses the underground band the cut-away draws (§8.4).

§8.8's tile key names only "season, weather, shadows on or off and their mode, model-layer toggles, `base` live layers",
and §8.9's raster-export request carries "§8.8's view-state switches". A cached tile therefore survives a toggle, and
§8.3's plots-only census row ("the default view's base tiles pixel-identical once the key is off") would pass only by
eviction.

**Required change.**
* §8.8: replace "season, weather, shadows on or off and their mode, model-layer toggles, `base` live layers" with
  "season, weather, shadows on or off and their mode, model-layer toggles, `base` live layers, `plotsOnly` (city and
  district bands), `storey` (building band) and `depthBand` (the underground layer)".
* §8.9's raster-export row: extend "(season, weather, shadow mode, model-layer toggles, `base` live layers)" with the
  same three keys.

### VR-13 — minor · new-problem · rendering · item 28 (c) — `live.stale` never re-runs on a click: §8.2 "Live layers"

**Claim.** The rule, the signature and the data do not line up:
* a provider re-runs "when the view state it reads, the model or the visible region (dilated by one tile) changes";
* its signature is `marks(view, model, region)`;
* `live.stale` reads the elaboration records, which live outside the model (§2.8; `Document.derived.elaborations`, §2.9)
  and change on a click with no model change ("a click writes only the cache", §7.3).

By the stated trigger the marker would not vanish after the click, as §8.5 and §8.3's census ("none after the click")
require.

**Required change.**
* §8.2: replace "which calls one when the view state it reads, the model or the visible region (dilated by one tile)
  changes" with "which calls one when the view state it reads, the model, the visible region (dilated by one tile) or —
  for a provider that reads them, such as `live.stale` — the elaboration records (§2.8, §2.9) change".
* `live.stale`'s gloss "read from §2.8's records outside every digest" gains "(the provider reads
  `Document.derived.elaborations` beside the model view)".

### VR-14 — minor · new-problem · rendering · items 8, 11, 12, 30, 31 — the `states` table against `StateRow` (§8.2) and its census (§8.3)

**Claim.** The type says `StateRow.kind` is `'building'|'wall'|'gate'|'tunnel'|'island'|'plot'` and `state` is "an
Existence value (§2.8), Building.condition (§2.6), SkyIsland.state (§2.7) or a plot's sealed exposure (§4.6)". The
shipped table does not fit it, in five ways:
* **Rows outside the type.** One row keys `superseded` (`Enceinte.supersededBy`, which §2.8 calls "a link, not a
  state"). One keys "in use, by `Tunnel.kind`". One has kind "underground cell, vault" with state "any". None of the three
  is a (kind, state) pair of the type.
* **No row for `kept`.** `condition` `kept` has no row, but §8.3's census demands a row for every producible pair.
* **Census sources.** The census's list of sources omits the superseded and sealed states.
* **Arch keyed on the wrong entity.** The closed arch is keyed on a plot's exposure, but it belongs to the `Passage`. A
  passage can be sealed while the plots behind it keep another reach (exposure not `sealed`, §2.5), and its arch would
  then draw open.

**Required change.**
1. `StateRow.kind: 'building'|'wall'|'gate'|'tunnel'|'island'|'passage'`; `state` comment → "an Existence value (§2.8),
   `Building.condition` (§2.6), `SkyIsland.state` (§2.7), `superseded` for an enceinte whose `supersededBy` is set
   (§2.7), or `sealed` for a passage whose `Passage.sealed` is set (§2.5)".
2. The plot row becomes: "passage | `sealed` (`Passage.sealed`, §2.5; item 30) | district, neighbourhood | override:
   the arch glyph at each end drawn closed (a bar across the arch)".
3. Delete the "tunnel … in use, by `Tunnel.kind`" and "underground cell, vault … any" rows. Add to the `vault`
   program's sentence: "A tunnel draws by its `Tunnel.kind` — a cased band for a `main`, a hairline pair for a `drain`
   or `culvert`, a `passage` as a `main` with arch glyphs at its ends — and a building on the underground arena draws its
   footprint in `building`, a vault class with the `vault` hatch, both through the underground layer's cut-away (§8.4)".
4. §8.3's census: "every (kind, state) pair that §2.8's ladders, `Building.condition`, `SkyIsland.state`,
   `Enceinte.supersededBy` and `Passage.sealed` can produce — other than the undeclined defaults (`kept`, and the
   Existence values `generated`, `built`, `altered` and `converted`), which draw the entity's own programs — resolves
   one `states` row".

### VR-15 — minor · new-problem · rendering · items 8, 10, 11 — the states census fixture (§8.3 "states" row)

**Claim.** The row's pass column reads "a golden TOWN converted by hand through every `DeclineOp` kind once (§4.11)
draws every state's row". A TOWN cannot carry the tunnel or island kinds, so the fixture cannot draw their rows:
* `DeclineOp` includes the tunnel kinds (`silt`, `caveIn`, `seal`, `reopen`) and the island kinds (`resizeIsland` …
  `raiseIsland`);
* a TOWN has no island (`RungProfile.layers.islands` = `none`, II.6 (2));
* the base has no tunnel (the network stage is staged, II.7.1).

**Required change.** Replace that clause with: "a golden TOWN converted by hand once through every building, wall, gate
and passage conversion of §4.11 draws those kinds' rows, and a hand-built CITY fixture holding one tunnel and one island
record (§2.7's schema) draws the tunnel and island rows until their stages register".

### VR-16 — minor · new-problem · rendering · item 29 — the entrance census against §2.6's rule 3 (§8.3 "entrances" row)

**Claim.** The census asks for "every other tick on an access edge of its plot (§2.6's rules)". That is right only for
two roles:
* rule 2 requires an access edge beyond the frontage only for `side` and `rear` doors;
* rule 3's `yard` door opens "onto the yard or court", a part inside the plot, and `service` doors open to a court side.

A correct plan would therefore fail the census.

**Required change.** Replace "every other tick on an access edge of its plot (§2.6's rules)" with "every `side` or
`rear` tick on an access edge of its plot beyond the frontage, every `yard` or `service` tick facing a yard or court part
of its plot (§2.6's rules 2–3)".

### VR-17 — minor · conflict · rendering (cross-part with model) · items 19, 23 — roof colour by band (§8.2 "Materials, season, weather"; §2.6 "Materials")

**Claim.** §2.6 says FTG's default shows wealth "through the lifestyle-banded building pools (§10.2) and the roof-colour
role by band in the style sheet (§8.2)". That is item 19's emulation baseline: FTG expresses wealth through lifestyle
pools and roof colour. §8.2 keys roof colour only by material, season and weather, plus the optional thematic layers.
No default row keys it by band, so the FTG family's default look lacks FTG's wealth expression, and §2.6's pointer
resolves to nothing.

**Required change.** In §8.2, after "…so a `setAttr` of a material re-keys the same marks' look and moves nothing.",
insert: "Wealth shows in colour as FTG shows it: the `lit` family's default sheet keys the `roof` role's colour by the
building's prosperity band — one override row per band of the set (§4.5), read at the field band like condition (J-P1;
never `builtBand`) — while `ink` keeps MFCG's one roof role with per-building variation and district tints."

### VR-18 — minor · conflict (with a duplicate and a broken pointer) · rendering (after a model change) · item 30 (d) — the sealed default (§8.1 `LabelTable.knownTo`, §9.2)

**Claim.** One fill rule is stated twice, and its sealed clause has no home:
* §8.1's comment reads "a sealed plot's reads secret; a way, district, quarter, water, wood or gate label is public";
* §9.2 reads "a `sealed` plot's reads `secret`, §4.6; ways, districts, quarters, water bodies, woods and gates are
  `public`";
* §4.6 states no sealed default, and §2.5's `Plot.knownTo` "defaults from exposure (hidden → local, else public)", which
  makes a sealed plot `public`;
* phrased as "reads", rendering would also override a user's `setAttr(knownTo)` on a sealed plot.

This is V-MAB-06 (model) with V-MAB-41 (rendering); the emulation-hidden seat's note asked for `secret`.

**Required change.**
* Model (V-MAB-06): §2.5's default becomes "(hidden → local, sealed → secret, else public)".
* Rendering: §8.1's comment → "the target's `knownTo` as §9.2's knowledge filter fills and reads it".
* Rendering: §9.2's "a `sealed` plot's reads `secret`, §4.6;" → "a plot's default from its exposure being §2.5's;".
  §9.2 keeps "ways, districts, quarters, water bodies, woods and gates are `public`" as the fill rule's one statement.

### VR-19 — minor · duplicate · rendering · item 30 (d) — the knowledge key's shape stated in §9.2 and §11.3

**Claim.** Both sections restate the key's record shape:
* §9.2: "a tier `public`, `local` or `secret`, and `places`, the addresses of the places the viewer has learned";
* §11.3: "(§9.2: a tier `public`, `local` or `secret`, and `places`, the known places by address)".

By R1 the shape's home is §2.9's view-state list (VR-02).

**Required change (after VR-02).**
* §9.2: "— the per-viewer view key `knowledge` (§2.9, §11.3): a tier `public`, `local` or `secret`, and `places`, the
  addresses of the places the viewer has learned" → "— the per-viewer view key `knowledge` (its tier and `places`, §2.9;
  its default and authority, §11.3)".
* §11.3: "`knowledge` (§9.2: a tier `public`, `local` or `secret`, and `places`, the known places by address)" →
  "`knowledge` (§2.9; admitted by §9.2's table)".

### VR-20 — minor · broken-reference · rendering · item 12 — §8.4 "(§2.7)"

**Claim.** §8.4 says "every underground entity's `elevationCm` is its depth below the datum (§2.7)". §2.7 states no
such rule. The fact lives in two other places:
* `elevationCm` is §2.1's field ("a sewer's negative depth";
  "their depth is `elevationCm` (negative below the ground datum, II.7.3)");
* II.7.3 sets it ("`elevationCm` (§2.1) = `baseCm`, the entity's depth below the ground datum").

**Required change.** "(§2.7)" → "(§2.1, II.7.3)".

### VR-21 — minor · broken-reference · rendering · item 28 (b) — §8.5 "J33 of `docs/PROGRESS.md`"

**Claim.** §8.5's paragraph "**Views that are not the default (items 28, 30; J33 of `docs/PROGRESS.md`).**" and its
"as J33 rules (§4.1)" cite a program ledger outside the design. The design's own record of that ruling is J-A28.42
("eager footprints kept at city zoom (J33)"). The paragraph also serves item 28 only.

**Required change.**
* The lead → "**Views that are not the default (item 28; J-A28.42).**".
* "as J33 rules (§4.1)" → "as J-A28.42 rules (§4.1)".

### VR-22 — minor · broken-reference · rendering · item 30 — §11.1 "a building's `exposure`"

**Claim.** The GeoJSON row exports "a plot's and a building's `exposure` and `knownTo` (item 30)". `Building` has no
`exposure` — §2.6 gives it `knownTo` only — and an institution's `knownTo` (§2.7) is not exported.

**Required change.** Replace with "a plot's `exposure` and `knownTo`, and a building's and an institution's `knownTo`
(item 30)".

### VR-23 — minor · stale · rendering · item 28 (b) — §12.7 "Stage-3 hook": `compose()` "on the tile's band request"

**Claim.** The row budgets `compose()` "in the derivation pool on the tile's band request (§8.6, §8.9), one tile's
compositions within 16 ms of pool time". Under the owner's default `elaborate: 'click'`, however:
* `compose()` runs when a neighbourhood is clicked (§4.1);
* a band request is served only from the cache (§8.9's table: "under `'click'` served only from the elaboration cache").

No bound covers a click's compositions.

**Required change.** Replace "in the derivation pool on the tile's band request (§8.6, §8.9), one tile's compositions
within 16 ms of pool time, amortised" with "in the derivation pool — for a neighbourhood's buildings on its click under
`elaborate: 'click'`, streamed to the tiles centre-out, or on the tile's band request under `'view'` (§4.1, §8.6, §8.9)
— one tile's compositions within 16 ms of pool time, amortised".

### VR-24 — minor · conflict · rendering · item 25 — §12.6 `silt` for the water conversion (with VP-07, VP-37)

**Claim.** §12.6 lists "(`reclaim`, `silt`, `shiftCourse`, `digCanal`)". §7.1's edit-target row names the water kind
`siltReach` (l. 6275), and `silt` is the tunnel ladder's op (§4.11 `DeclineOp`, II.6). VP-07 renames §4.11's water kind
to `siltReach`.

**Required change.** In that list, `silt` → `siltReach`.

### VR-25 — minor · partial · rendering · items 10, 15, 28 (f) — §12.6 hook list: island conversions and `relet`

**Claim.** Two entries of the hook list are incomplete:
* §12.6 budgets "`resizeIsland`, `settleIsland` and `fallIsland` their footprint like a carve", but II.6 (7) and §7.1
  make `refloatIsland` and `raiseIsland` hand `convert` events too, and neither is budgeted;
* "a `relet` one plan re-cut (§12.7)" ignores that only a stored plan is re-cut in the event, while an unstored one is
  only marked stale (§7.3; J-A28.72).

**Required change.**
* "`resizeIsland`, `settleIsland` and `fallIsland` their footprint like a carve" → "`resizeIsland`, `settleIsland`,
  `fallIsland` and `refloatIsland` their footprint like a carve, and `raiseIsland` its new island's districts at the
  scoped-regeneration law on its own arena".
* "a `relet` one plan re-cut (§12.7)" → "a `relet` one re-cut step of a stored plan inside the event, an unstored plan
  only marked stale (§12.7; J-A28.72)".

### VR-26 — minor · stale · rendering · item 29 — §8.5 "First paint": "entrances" listed as lazy work

**Claim.** "Lazy work is only what the city band does not draw: yard sub-parts, entrances, roof ridges and hatching…"
The entrance set is S11's eager model record: `Building.entrances`, derived by `deriveEntrances` at S11 (§2.6) and
checked by §5.3 at generation. §4.1's laziness contract names only "entrance glyphs".

**Required change.** "sub-parts, entrances, roof ridges and hatching" → "sub-parts, entrance ticks (the entrance set
itself is S11's, §2.6), roof ridges and hatching".

### VR-27 — minor · stale · rendering · item 30 — §8.9 label-row bound after `knownTo`

**Claim.** §8.1 raised `LabelTable` to "≤ 97 B per row" with the `knownTo` byte. §8.9's generation → tile worker row
still reads "≤ 96 B per label row" and lists the label columns without `knownTo`.

**Required change.** In §8.9's row:
* "(candidates, priority, parent node, pinned placement and `hidden` per label; …)" → "(candidates, priority, parent
  node, pinned placement, `hidden` and `knownTo` per label; …)";
* "≤ 96 B per label row" → "≤ 97 B per label row".

### VR-28 — minor · new-problem · rendering · item 28 — the JSON `plan` block reads the non-canonical cache (§11.1 "Where exports run")

**Claim.** "Model formats — `.plat`, the JSON schema, … — read the model and §8.10's instance function". The JSON
schema's `plan` block, however, is exported "per building whose plan rung is not `absent`". For a derived plan that is
the elaboration cache (§2.9, non-canonical), so two hosts' JSON exports of one document differ by which buildings were
clicked. The paragraph does not say so.

**Required change.** In "Where exports run", after "(`Exporter.write(doc, null, opts)`)" insert "— except the JSON
schema's `plan` blocks, which carry every stored plan and the derived plans the exporting session's elaboration cache
holds, each with its rung state (§2.8), so which derived plans a JSON export carries depends on what was clicked (§2.9's
cache is non-canonical)".

### VR-29 — minor · conflict · rendering · item 28 — §12.8's cache fallback keeps `edited` plans in cache chunks

**Claim.** The fallback reads "the persisted chunks keep only the `edited` plans and the `current` plans of the
buildings the view state names". It has two faults:
* an `edited` plan is a stored composition — model data (`Building.composition`, §2.6; §2.8's `edited`) — never a cache
  chunk;
* "the buildings the view state names" names no view key.

**Required change.** → "the persisted chunks keep only the `current` plans of the buildings the view state's
`favourites` and view pins name (an `edited` plan is stored in the model, §2.6, and needs no chunk)".

### VR-30 — minor · missing · rendering · items 23, 30 — the knowledge admission table is not a table (§9.2)

**Claim.** §9.2's admission table is stated as a fixed rule. Rule (3) and item 23 make every rule's default a table
value that a setting may change — for example, a village where every name is local. It must not, however, be a
per-viewer style row: a viewer's `stylePreset` replaces the document's sheet (§11.3), so a viewer could loosen its own
admission. That is the decorative filter J-A30.82 rejects.

**Required change.** After §9.2's table insert: "The table is data — `knowledge.admit`, a §7.6 rule table (`knownTo`
× tier → the coarsest band admitted), edited by `editTable` (`owner` and `editor` roles) and never by a viewer's
`stylePreset`; the shipped rows are the table above (item 23)." §7.6's enumeration names `knowledge.admit` (a
determinism follow-up of one word).

### VR-31 — minor · broken-reference · scope · item 30 — §13.3 keeps no digest per knowledge tier

**Claim.** Two rendering sections rely on §13.3 for per-key placement digests that §13.3 does not keep:
* §9.2: "a stop's placement digest (§13.3) is therefore per (stop, knowledge key), the goldens taken at the `public` tier
  with no `places`";
* §8.3's knowledge row: "each tier's per-stop placement digests equal §13.3's".

§13.3's placement-digest paragraph names no knowledge key and stores nothing at `secret`. The rendering seat's note to
scope asked for both.

**Required change (§13.3 "Placement digests").** After "S13b places the band's area and way labels" insert "at the
`public` knowledge tier with no places (§9.2) — and, for one golden CITY, also at `secret` —".

### VR-32 — minor · broken-reference · scope · item 21 — the one-page summary's pointer for the separate program

**Claim.** The summary (l. 101) reads "The module stays private for now, a separate program talking to its host
through data alone (§17.3, D-22)". §17.3 states only the licence. The separate-program, data-only boundary is §11.3's
(J-A21.81), and §0.2's row 21 already cites §11.3.

**Required change.** "(§17.3, D-22)" → "(§11.3, §17.3, D-22)".

### VR-33 — minor · missing · model · items 28, 12 — §2.9 lacks the view keys the part cites there

**Claim.** The part cites §2.9 for three per-viewer view keys that §2.9's "View state" list does not declare:
* §8.5: "the per-viewer view key `storey` (§2.9)" and "`plotsOnly`, a per-viewer view key (§2.9)";
* §8.4: "the per-viewer view key `depthBand` (§2.9)";
* §11.3: "`storey`, `depthBand` and `plotsOnly` (§8.4, §8.5) travel the same way".

§2.9's list declares only `elaborate` beside them. This is V-MAB-09.

**Required change (§2.9 View state, beside `elaborate`).** Add "`storey` (the storey the building band draws, the
ground by default; §8.5, J-A28.82), `depthBand` (the underground depth band the cut-away draws, by default the
shallowest holding a tunnel with frontage plots; §8.4, J-A12.81), `plotsOnly` (the cadastral plots-only view, off by
default; §8.5, item 28)".

## 5 Rulings made here, and what the owner may want to know

* **Item 21's §11.3 sentence stays (ruled; vetoable).** The rendering seat asked whether a strict reading of item 21's
  "Editors: apply nothing beyond …" strikes its one sentence at §11.3 and J-A21.81. It does not.
  * The sentence states item 21 (d) — the separate program, data only, kept as a design choice — at the bridge's own
    home (canon R7).
  * It carries no licence wording.
  * §0.2's row 21 and the one-page summary rely on it (VR-32 points the summary there).
* **A standing ruling against the owner's literal words, surfaced for veto, not an issue.** The owner said: "the first
  thing that gets built is the city level view with a general view of different neighborhoods as plots without
  buildings". The design keeps MFCG's eager footprints at city zoom instead, and offers "plots without buildings" as the
  `plotsOnly` view (§8.5). The ruling is J-A28.42 (J33), made on emulation-first grounds (item 23). The owner's stated
  aim, "this cuts back on loading everything all at once", is met by the lazy wings and plans (§4.1).
* **Plain-language consequence of VR-10.** Secret places stay secret on screen, in pictures and in shared files. They do
  not stay secret from anyone who is handed the town's own save file. So a game master who wants a player not to know a
  place should share pictures or exports with that player, not the document itself.

## 6 Reading record

Read whole:
* `docs/AMENDMENTS-2026-09-25b.md`, items 8–32;
* `route.json`, every item that routes to rendering: home 30, and 8, 11, 12, 14–17, 19–22, 26, 28 (with (f)), 29 and 31
  as referencing items;
* `amend-rendering.md`, whole;
* the notes to rendering in `amend-determinism.md` (§4, §8.7), `amend-kernel.md` (§4), `amend-model.md` (§4),
  `amend-pipeline-assignments.md`, `amend-pipeline-emulation-hidden.md`, `amend-pipeline-evolution-islands.md`,
  `amend-pipeline-prosperity-change-dossier-plan.md`, `amend-pipeline-sewers.md` and `amend-scope.md`;
* `assemble-r0.md`, whole;
* `docs/ARCHITECTURE.md` §8, §9, §11 and §12, whole (l. 7128–8398 and 8686–9482), and their diff against the archive;
* §2.1, §2.5, §2.6, §2.7, §2.8 and §2.9, whole;
* §4.1's laziness contract and click policy;
* §4.2 S3 (1);
* §4.5's band set;
* §4.6's reach;
* §7.3's stale-click and stored-plan rows;
* II.6's island rule and the underground fade;
* II.7.1, and II.7.3's depth paragraph;
* §13.2's T29 and T30 bars, and §13.3's placement digests;
* §17.3;
* the rendering J-A index rows and Part A entries (J-A30.81–.84, J-A8.81, J-A12.81, J-A28.81–.84, J-A29.81, J-A16.81,
  J-A20.81, J-A21.81), and J-A28.32, .42, .62, .71, .72 and J-A26.41;
* the canon's home rules R1–R13;
* the rendering-owned entries of `verify-determinism-r0.md` (VD-13, VD-14), `verify-model-r0.md` (V-MAB-06, 08, 09, 34,
  41), `verify-pipeline-r0.md` (VP-03, 04, 07, 37) and `verify-kernel-r0.md` (VK-24–VK-27).

The citation sweep read every line outside the part that cites a changed rendering subsection: 112 lines new in this
pass and 260 unchanged. Lists and receipts are in the session scratchpad `…/scratchpad/vrend/`: `cite-new.txt`,
`cite-old.txt`, `route-rendering.txt`, `diff-8-9.txt`, `diff-11-12.txt` and `refs-out.json`.

## 7 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed or read on the live document, sha256 `87d89692…`):
* every quotation in §2 and §4;
* the diff of §8–§9 and §11–§12 against the archived `1dbfd9d4…`;
* the resolver (`refs.py`): 2 broken references in the document, both pre-existing external citations, one of them in
  the part;
* the J-A id check: each of the 14 rendering ids has exactly one index row and one Part A entry;
* the label-row arithmetic: the columns sum to 89 B, so both "≤ 97" and "≤ 96" hold as bounds but disagree (VR-27);
* the stale-rule probes;
* the citation sweep.

**PLAUSIBLE** (reasoning only):
* the severity grades;
* the replacement wordings that choose a mechanism — VR-06, VR-07, VR-09, VR-10, VR-11, VR-17, VR-23, VR-30 — each a
  vetoable design choice for the repair seat;
* reading §8.8's key list as exhaustive (VR-12), which its "the view-state switches that change the layer's pixels"
  could be read to cover generically.
