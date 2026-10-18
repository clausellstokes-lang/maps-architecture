# Seam check: the underground (V04) and the sky (V05) against the neighbourhoods they carry or shadow (V01) — round 0

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-layers-r0; covered by the whole-design retrovalidation (J84).

PROGRESS
- §0 Method and inputs (files, md5, lines) | done
- §1 Seam census: every piece crossing V04/V05 <-> V01 (and the base sections they share), producer and consumer | done
- §2 Findings (SL-01 onward), severity, owner, required change | done
- §3 Disposition summary by owning volume | done

## 0 Method and inputs

Lane `volumes/seam-layers-r0`, 2026-09-29. Read whole, in order, nothing sampled: `docs/volumes/_integrate.md` (365
lines, md5 e6808ba9…), `docs/AMENDMENTS-2026-09-28f.md` (989 lines, md5 7e76cc92…), `docs/volumes/V04-underground.md`
(3 120 lines, md5 694763ba…), `docs/volumes/V05-sky.md` (3 135 lines, md5 13aebe89…), `docs/volumes/V01-neighbourhoods.md`
(3 276 lines, md5 9723667f…), each with its Integration notes. Base sections read where a seam cites them:
`docs/ARCHITECTURE.md` (md5 01fea21f…) II.7.3's *Basement accesses* (l. 15792 ff.), II.7.5 (2) (the undercity's parent,
l. 15968 ff.), §8.4's layer-visibility bullet (l. 10216 ff.) and D-3 (l. 16292 ff.). File g (md5 7b3ab8ad…) was cited
through the volumes; its item 110 (b) record is file f's item 244.

**What a seam piece is here.** Every record, field, function, stage slot, event, table row, label, symbol, export key or
test clause that one of the three volumes produces and another reads, or that two of them describe from two sides. Each
was traced both ways (the producer's consumer column against the consumer's producer column, and the text of each rule
against the other's), then against the base change requests file f carries for it. Integration decisions J-VI.1–22 and
the volumes' Integration notes (IN-V01-*, IN-V04-*, IN-V05-*) were applied as superseding before a finding was written:
a sentence an Integration note already overrules is not reported.

**Severity.** *Blocker*: the design cannot be scheduled or built as written (a cycle, a contradiction with no reading
that satisfies both). *Major*: a contradiction or an unwired piece a builder would hit. *Minor*: wording, a citation, a
single-source slip, or a gap the base's fallback already covers.

## 1 Seam census

| # | seam piece | producer (as stated) | consumer (as stated) | state |
|---|---|---|---|---|
| 1 | SKY's slot in the stage graph | V05 §3.1 (before S7c) | V01 §3.1 (S7c inside S7b, SKY after) | **SL-01** |
| 2 | island shade strips onto the ground | V05 §2.3a, §3.19 (field pass 2) | V01 S9b, pins, `DistrictContext.shade.islandShare` | **SL-02** |
| 3 | `SkyHandover` and the `sky` request | V05 §2.3 | V01 §3.10.3 (the seven reconciliation items: all adopted) | request fields **SL-13**; result **SL-11** |
| 4 | the rim walk | V05 §3.12, J-V5.26 (V01's S12b) | V01 unit run | **SL-12** |
| 5 | `SeamReport.portalsTotal` on a sky unit | V01 §3.11 (6) | V05 §3.12, T-V5-9 | **SL-10** |
| 6 | island district kinds, fabric prior, `districtHa` | V05 §2.4, §3.12 | V01 §3.10.3 (2), (4) | adopted; S7c kind factors **SL-29**; `0.62` **SL-27** |
| 7 | island retaining walls, levelling | V01 unit run (V1-3.17.7 (2)) | V05 §3.22 (4) | consistent (IN-V01-7 covers V1-3.17.7 (1)'s "refuses") |
| 8 | levelled ground as a reader | base S10–S11 (BCR-V5-30: datums only) | V04 N6–N7, foundations, arch floors; BCR-45's span rule; V01 `stepProfile` | **SL-26** |
| 9 | `ruinCentre()` and the magical node | V04 §3.5.0a (9) | V05's node term (per V04) | **SL-03** |
| 10 | catacomb count and island churches | V04 §3.5.1 (3) | V05 §1.3, §3.5, T-V5-26 | **SL-04** |
| 11 | sky layer exclusion (crypt join, basements, service region) | V04 §1.2, §3.5.7 (c), L3, N1 | V05 §1.3, T-V5-26 | **SL-05** |
| 12 | burial faces on islands skipped | V04 §3.5.1 (1) | V05 §3.5 (3) | consistent |
| 13 | arch vaults under a span a landfall ruins | V05 §3.16 (4) | V04 §3.5.4 (d) (2), IN-V04-5 | vocabulary **SL-31** |
| 14 | ground AccessPoints under a landfall | V05 §3.16 | V04 §3.10 access closures | **SL-30** |
| 15 | light at shafts under an island | V05 §5.3 (slab list) | V04 §5.3, BCR-38 | **SL-16** |
| 16 | the opening pass (`HoodPlace` kind `opening`) | V01 §3.7.1 ("run by the underground tail") | V04's tail (no stage) | **SL-06**; selection **SL-07** |
| 17 | ground access symbols and their visibility | V01 §3.8.8, §5.1.2 | V04 §5.2 (7) | **SL-08**; missing kinds **SL-24** |
| 18 | the undercity's `parent` | base II.7.5 (2); V01 §3.16 restates it | V04 §3.6 C5 | **SL-09** |
| 19 | `districtsAbove`, `fabricSignature` | V01 §3.16 | V04 §3.5.0a (7), §4.5 | wired; field names **SL-23** |
| 20 | `blockLifted` | V01 §3.9 (fate line) | V04 §3.5.1 (7) | consistent |
| 21 | catacomb source protection | V04 `UndergroundSystem.sources` | V01 §3.5.12 (4) | consistent |
| 22 | the catacomb entrance sentence of II.7.6 | V01 BCR-36 | V04 BCR-36 | **SL-17** (file f 560/564) |
| 23 | public opening kinds on `AccessPoint.kind` | V04 BCR-29 = V01 BCR-37 | file f item 554 | merged; comment **SL-07** |
| 24 | `hood.pins` rows for the underground arena | V01 (says V04 fills) | V04 (says stage 2 needs nothing) | **SL-22** |
| 25 | public ground / "square" | base L1 `square` faces | V04 N11, F3, L1, forced vaults, BCR-20; V01 square/green/yard blocks | **SL-15** |
| 26 | locality of a ground edit | V04 §4.3, V05 §4.3 (cross-arena rows) | V01 §3.9, §4.3, T-V1-17 | **SL-14** |
| 27 | the lone neighbourhood's layers | V01 §3.10.1 (7) | V04 (no reader of `Recipe.product`) | **SL-19** |
| 28 | the `Way` line (`slopeP95`, `flowToward`) | V01 BCR-6, V04 BCR-2 | file f 207/208 | **SL-18** |
| 29 | `DistrictContext.under`, `.shade.islandShare` | V01 §2.3 | "V11's identity rows" (none exist) | **SL-21** |
| 30 | `catchmentOf` on underground and sky plots | V01 §3.16 | V04 §3.6a (5), V05 §3.5 (3) | **SL-25** |
| 31 | GeoJSON of retaining walls and raised ways | V01 §5.3, V05 §5.5 | file f item 447 (J-VI.18) | **SL-20**, **SL-33** |
| 32 | barrier kinds on seams | V01 BCR-30 | J-VI.3; V05 §3.21 (`sheer`, IN-V05-4) | **SL-28** |
| 33 | the ground landing's attach as an S8 destination | V05 §3.10 (4), BCR-V5-20 | V01 §3.4 (template faces) | **SL-32** |
| 34 | the sky unit run's generation budget | V05 §6 ("volume 1's rate") | V01 §6 (no number) | **SL-34** |
| 35 | the aqueduct's terminal | V01 §3.17.8 | V04 §3.5.4 (e); J-VI.9, IN-V04-9, IN-V01-5 | consistent |
| 36 | spans' `use` and lanes under arches | base BCR-45 (V04) | V01 §3.17.3 (3) | consistent (J-V4.79) |
| 37 | the raised-way slot before S7b (1) | V01 BCR-39 | V05 §3.1, BCR-V5-29 (a); file f 290 | consistent |
| 38 | `hood.fabric` and `sky.clearance` epoch orders | V01 §3.3.6 (40), V05 §3.15 (50) | V06 §3.2 | consistent |
| 39 | DR numbers | V01 DR-V1.1, V05 DR-SKY | file f 383 (DR26, DR27) | consistent (IN-V01-6, IN-V05-3) |
| 40 | raised-way reason words | V06 key → J-VI.2 words | V01 `DistrictContext.raised` (IN-V01-4) | consistent |

## 2 Findings

### SL-01 — blocker — owner V05 — SKY's place in the stage graph, and a declared-I/O cycle

**Claim.** V05 §3.1's stage table (l. 739) puts SKY "after S7b, before S7c, S12a and S8 — its declared outputs are
`reservations` … and `allocations` …, so §4.1's topological sort puts it before S7c, which reads both (V01 §3.1)". V01 §3.1
makes S7c S7b's `S7b.afterGreedy` hook, run inside S7b (1), so SKY — after S7b — runs after S7c; V01's cross-volume note (1)
(V01 §10) asks V05 to read "after S7b, S7c included". V05 landed (00:57) before V01 (01:28) and was not updated; the
integration census has no row for it. Worse than wording: V01's S7c declares reads of `reservations` and S7b's allocation
rows (V01 §3.1's hook table), and SKY declares writes of `reservations` (the ground landing claims) and `allocations` (the
landing rows) while it follows S7b. With §4.12's hooks united into their host's declared I/O (V01 BCR-26), §4.1's sort by
declared I/O sees S7b read what a later stage writes: a cycle, or an order that contradicts one of the two volumes.

**Required change.** V05 §3.1's SKY row reads "after S7b (its S7c hook included) and before S12a, S8 and S10a; S7c reads
none of SKY's outputs — a landing claim is a hole S8 cuts around (V01 V1-3.4.1)", and the sentence "so §4.1's topological
sort puts it before S7c, which reads both (V01 §3.1)" is deleted. To remove the cycle, SKY's ground writes take their own
data keys — `reservations.landing` for the landing yards and `allocations.landing` for the `sky_landing` rows (BCR-V5-3,
BCR-V5-6 carry the keys; file f items 282, 213) — which V01's S7c does not declare; V01's S7c read-set (V01 §3.1) names
`reservations` as S3's and S7b (3)'s keys only (one clause added by V01, cited here, no V01 finding of its own).

### SL-02 — major — owner V05 — the island strips are read by volume 1 before field pass 2

**Claim.** V05 computes the strips onto the ground at field pass 2 (S10a (ii); V5 §3.1, §3.19 (6)), and at a
re-derivation starting after SKY "field pass 2 … writes the bases, then the strips" (V5 §3.19 (6)); its §2.3a (l. 511)
closes the readers: "Nothing reads a strip's bits except the field's composition, the sky receivers' context values, the
clerk's reader and the shade map view", and its §1b row for `IslandShadeStrip` lists no V01 consumer. V01 reads them
earlier and elsewhere: S9b's manor `sun` factor at S10a's hook between (i) and (ii) — "the strips are evaluated once per
generation, at S9b's first read, by the same pure call field pass 2 makes, and held for it" (V1-3.5.5, J-V1.58) — the close-up
hood pins' shade gate (V1-3.8.2 (3)) and `DistrictContext.shade.islandShare` (V1-2.3). At a re-derivation from S10a the
order breaks: S9b reads strips from the old bases, then pass 2 writes new bases and recomputes, so the manor pick and the
field read two different shades, and V01's "computed once, shared" is false. V01's cross-volume note (2) asked V05 to add
the readers; V05 did not.

**Required change.** V05 §2.3a's reader list gains "volume 1's S9b sun factor, its close-up hood pins' shade gate and
`DistrictContext.shade.islandShare` (V01 §3.5.5, §3.8.2, §2.3)"; the §1b `IslandShadeStrip` row's consumer column gains
them. V5 §3.19 (6) and §3.1's S10a row read: "the strips onto the ground are computed once per shade evaluation, at their
first read — volume 1's S9b at S10a's `afterDrivers` hook where it is registered, else field pass 2 — and held for pass 2's
fold"; and "at a re-derivation starting after SKY and at or before S10a, the bases of every live island are written at
S10a's start, before step (i) and every hook" (not by pass 2). T-V5-21 (h) gains the clause "S9b's strips and pass 2's are
the same held strips, bit for bit, at generation and at a re-derivation from S10a".

### SL-03 — major — owner V04 — `ruinCentre()` has no V05 reader, and the node's ruin name has no producer

**Claim.** V04 names V05 as a consumer of the ruin's centre in five places: §1b.1's `RuinRecord` row ("V05's node term …
through `ruinCentre()`", l. 289) and `ruinCentre(doc)` row ("V05 (the node term's position)", l. 290), §1b.2 (l. 331),
§1b.5's magical-node row (l. 415), §3.5.0a (9) ("the position V05's node term … read", l. 1351) and §13's hand-off
(l. 3060). V05 reads no position: "the term stays positionless: it reads the deposit's state alone, never the underground
arena" (V5 §3.3; J-V5.41; T-V5-25 "no island rule reads the underground arena"). In the other direction V05's clerk names
"the node beneath the old ruins" "from the deposit's report entry, which carries the ruin's name when volume 4 placed it
there" (V5 §3.3, §4.5) — and neither V04 nor V08 writes such an entry (grep: no "report entry" in either).

**Required change.** V04 drops V05 from the consumers of `ruinCentre()` in §1b.1, §1b.2, §1b.5, §3.5.0a (9) and §13
(its consumers stay V08's `magical_node` site and the ruin light rows), and adds the producer V05 reads: §3.5.0a (9) "where
a `magical_node` deposit stands at `ruinCentre()` (V08 DR-V8.2), the ruin stage writes the generation report's line
`ruin.node: { deposit: Id; ruin: Id; name: NameRef }`" — read by V05 §4.5's why and by V10; V05 §3.3's sentence cites that
line ("the report's `ruin.node` line, V04 §3.5.0a (9)") instead of "the deposit's report entry".

### SL-04 — major — owner V04 — island churches in the catacomb count

**Claim.** V04 §3.5.1 (3) (l. 1374): "`churches` counts the ground buildings of classes `cathedral`, `great_temple`,
`church` and `parish_church` … and each monastery's church". V05 rules the opposite for islands: "each church on an island
still counts once toward the catacomb count (`catacomb.churchesPer`), since the dossier's church records and the roster set
that count wherever the churches stand" (V5 §1.3, §3.5 (3); J-V5.43; T-V5-26 "island churches are counted once in the
catacomb count"), and V05 §13 item 3 routed it to V04's revision, which kept "ground". An island cathedral therefore
changes the count by V05's bar and not by V04's.

**Required change.** V04 §3.5.1 (3) reads "counts the buildings of those classes on the ground and on every live sky
island (each once; V05 §3.5), and each monastery's church"; T-V4-50's count clause and §1b.5's "how many catacombs" row
say the same. No island face is ever a candidate (§3.5.1 (1) stands).

### SL-05 — major — owner V04 — the sky layer is not excluded from the underground's sources

**Claim.** The owner's item 2 keeps islands out of the underground and V05 bars any link (T-V5-26: "0 underground parts,
links or catacomb sources on any island"). V05 gives an island cathedral a real `Basement.crypt` in the rim slab (V5
§3.10 (5)). V04's exclusion is only implicit: §1.2 defines "the ground" against raised parts (part 0 versus parts ≥ 1),
not against the sky layer; §3.5.7 (d) says "every ground building (on ground part 0)", but (c)'s crypt join ("a
church-class building … with `Basement.crypt` whose crypt ring lies over a catacomb element in plan, or within
`accessReachM` of one") and L3's basement accesses (II.7.3's "a surface building") carry no layer test. An island often
floats over the outskirts (V05's placement weights) where the rank-1 extramural cemetery's complex lies, so a builder
following (c) joins a sky crypt to a catacomb by a plan test. U-NET's service region `R` (N1) takes "the districts whose
kind is neither `hinterland`, `underground` nor `undercity`", which admits the `sky-*` kinds.

**Required change.** V04 §1.2's ground paragraph gains: "**The sky layer is never read** (owner item 2; V05 §1.3): every
building, basement, crypt, plot, district, reservation and face the underground reads is on the ground layer — an
island's buildings, its cathedral's rim-slab crypt included, are never a dig host, a basement-access host, a crypt-join host
or a burial face — save the catacomb count's island churches (SL-04)." §3.5.7 (c) and §3.7 L3 say "on ground part 0" as (d)
does; N1's `R` reads "the ground districts (layer `ground`) whose kind is neither …".

### SL-06 — major — owner V04 — the opening pass runs in the tail, but the tail has no slot for it and forbids its writes

**Claim.** V01 makes the underground tail the producer of every `HoodPlace` of kind `opening`: "The underground tail
(volume 4), after its systems and their `AccessPoint`s are laid, runs this step's opening pass" (V1-3.7.1; V1-2.7's
lifecycle row; V1-3.1's graph; V1-8.3 "an S13a registration with its opening pass for the underground tail"; cross-volume
note (3)). V04 never mentions the pass or `HoodPlace` (grep: 0 hits); its tail table (§3.1) has no such step, and its rule
is that "no tail stage writes the ground arena" and only T8 writes ground records — "uses and household counts only"
(§3.1, J-V4.59, §3.7a, BCR-5's tail bullet = file f item 325). A `HoodPlace` and its `place` label are ground-registry
records. So the pass is unwired on V04's side and forbidden by V04's text. The census of `_integrate.md` §2.3 has no row
for it.

**Required change.** V04 §3.1's T6 row (the tail's S12c and S13a) gains in its writes "volume 1's opening pass
(V1-3.7.1): one `HoodPlace` of kind `opening` per public opening and per catacomb entrance, with its `place` label — records
only, never geometry — after the tail's naming of systems and complexes, so a catacomb opening reads its complex's name";
§3.1's paragraph, J-V4.59, §3.7a and BCR-5's tail bullet (file f item 325) read "only its reconcile stage writes ground uses
and household counts, and its S13a step volume 1's opening places; no tail stage writes ground geometry"; §1b.2 lists
the call (implementer V01's local-place step, caller the tail's T6); the ground model digest is finalised after T8 as now.

### SL-07 — major — owner V01 — which access points become opening places

**Claim.** V1-3.7.1 makes a place of "every ground `AccessPoint` of an opening kind — `sinkhole`, `mouth` (a cave mouth),
`collapsed_shaft`, `ruin_entrance` … — and per catacomb entrance". In V04 `mouth` is also the kind of every sewer
outfall and culvert inlet (N11, source `system`), of a quarry's adit end (§3.5.3) and of a skylight ("a `skylight` is a
`mouth` of role `light`", §3.5.7 (e)), so a kind test names every outfall "the Old Mouth". "A catacomb entrance" has no
test at all: in V04 it is a `stair` of source `system` whose `cause.system` is the catacomb system (§3.5.1 (9)), and a
quarry ossuary's entrance is its working's shaft and a stair at the working's surface head. V1-3.7.1 also cites the new
kinds as "V04's revision adds to II.7.4, BCR-37", which is V01's own request number; the merged request is file f item
554 (V04 BCR-29 = V01 BCR-37), whose comment "each a `HoodPlace` of kind `opening`" is equally over-broad.

**Required change.** V1-3.7.1 selects on V04's record fields: an access with `source: 'opening'` and `role: 'access'`
(subtype its kind; a skylight, role `light`, makes no place), and a catacomb entrance — `kind: 'stair'`, `source:
'system'`, `cause.system` a `catacomb` system, including a quarry ossuary's stair at its working's surface head (subtype
`catacomb`); a sewer `mouth` (source `system`, the sewer) is no place and keeps V1-5.1.2's symbol. The citation reads
"file f item 554 (V04 BCR-29, V01 BCR-37)", and item 554's comment reads "each public opening of role `access` a
`HoodPlace` of kind `opening` on the surface (volume 1)".

### SL-08 — major — owner V04 — two visibility rules for the same ground symbols

**Claim.** V04 §5.2 (7) (l. 2158): an outfall's mouth "also draws on the ground layer at the bank …, and like every
underground opening only while the underground layer is visible (a hidden layer draws nothing, D-3)". V01 draws every
ground `AccessPoint` of the underground layer — gratings, cellar stairs, broken wells, sinkholes, cave mouths, collapsed
shafts, ruin entrances, catacomb stairs — as symbols in the ground's `pins` slot of any opened close-up, filtered by the
viewer's key and the `pins` toggle, with no underground-visibility gate (V1-3.8.8, V1-5.1.1, V1-5.1.3), and labels the
opening places at the neighbourhood (and district) band (V1-5.2.2). The same mark has two visibility rules.

**Required change.** One rule, V01's (the surface head of an opening stands on the ground; knowledge, not layer
visibility, hides what the viewer does not know): V04 §5.2 (7)'s outfall sentence reads "its surface head, like every
ground `AccessPoint`'s, is volume 1's ground symbol (V1-3.8.8, V1-5.1.2) — drawn in an opened close-up by the knowledge
filter and the `pins` toggle whatever the underground layer's visibility; the underground layer draws only the
underground end", and §5.1's last sentence ("The ground view draws nothing of this volume") gains "save volume 1's
ground symbols and opening places".

### SL-09 — major — owner V01 — the undercity's parent: a second rule beside the base's

**Claim.** The base states the rule once: a neighbourhood's `parent` is "the surface district above the largest share of
its main chamber in plan (ties by address)" (II.7.5 (2), l. 15973). V01 §3.16 states another: "the district containing its
main plaza's projection (the largest overlap when the projection falls on no district)", and says "V04's undercity stage
writes `parent` by this rule" (and cross-volume note (3)). V04 §3.6 C5 cites II.7.5's rule "read from the core's plan
position" and never calls `districtsAbove`. A plaza point and a chamber's largest share give different parents for a core
straddling two districts; no BCR changes II.7.5 (2). The rule is stated twice and the two disagree.

**Required change.** V01 §3.16 deletes its parent rule and reads "An undercity neighbourhood's `parent` is II.7.5 (2)'s —
the first entry of `districtsAbove(part, District.core)`, ties by address"; T-V1-46 unchanged. V04 §3.6 C5 reads "with
II.7.5 (2)'s parent rule, computed as the first entry of volume 1's `districtsAbove(part, core)`" (V04 becomes the caller
V01 §3.16 lists), and §1b.2 lists the call.

### SL-10 — major — owner V01 — `portalsTotal` of a sky unit run

**Claim.** V1-3.11 (6): "a sky unit run counts its landings' attach vertices as its portals". V05 §3.12 requires the unit
run to "leave `SeamReport.portalsTotal` 0" and T-V5-9 bars "`SeamReport.portalsTotal` = 0" — the rim is a hard `sky` seam
with no portal (II.1 (5)). One field, two values; T-V5-9 fails against V01's rule.

**Required change.** V1-3.11 (6)'s last sentence reads "a sky unit run reports `portalsTotal` 0 — its seams are `sky`,
hard, portal-free (II.1 (5)); its landing attaches are template portals of kind `landing` (V1-2.3), reported as
`landingsReached` beside `portalsConnected`"; T-V1-21 adds "`portalsTotal` 0".

### SL-11 — major — owner V01 — the unit run returns no district ids

**Claim.** V05 §3.12: the unit run must "return its district ids, which SKY-F writes to `SkyIsland.districts`" (and the
island record's `districts` row, V5 §2.6, is created by "the unit run"). V01's `NeighbourhoodResult` (V1-2.4) carries `mode,
blocks, ways, plots, buildings, greens, pins, hoodPins, places, labels, seams, report` — no districts.

**Required change.** V1-2.4's `NeighbourhoodResult` gains `districts: Id[] /* mode 'unit': the districts the run made, in
partition order; SKY-F writes them to SkyIsland.districts (V05 §3.12) */`, carried by BCR-2 (file f item 539).

### SL-12 — major — owner V01 — the rim walk is nobody's

**Claim.** V05 §3.12 lists among the unit run's duties: "never cut or plot the rim strip, which its S12b plants as a rim
walk (`esplanade` with a path and a row of trees along it — a `street_trees` `Greenery` whose `along` names the rim walk's
path and the rim strip …; J-V5.26)". V01's unit run (V1-3.10.3) says only that the rim strip "is never cut and never
plotted"; "rim walk" and "esplanade" never occur in V01, no §4.9 row plants a `rim_strip` interior (V01's BCR-10 adds two
other rows), and "the rim walk's path" names no record (the strip is never cut, so it holds no `Way`).

**Required change.** V1-3.10.3 (4) adds: "S12b plants the rim strip (its block interior `rim_strip`, BCR-V5-6) as V05's rim
walk: one `esplanade` `Greenery` on the strip's face and one `street_trees` `Greenery` along the strip's inner `setback`
line, spaced by §4.9's street-tree row (J-V5.26); no way is laid on it"; BCR-10 gains that row ("| rim walk (V05,
volume 1) | a sky island | the `rim_strip` face | an `esplanade` and a `street_trees` line along its `setback` line |");
V05 §3.12 replaces "the rim walk's path" with "the rim strip's `setback` line" (a V05 wording edit, cited here).

### SL-13 — major — owner V01 — the request V05 builds does not type-check against V01's request

**Claim.** V1-2.4's `NeighbourhoodRequest` requires `seam: SeamContract`, `context: DistrictContext`, `params`,
`closeup: CloseupParams` and `lod`. V05 §2.3 builds the `sky` request from `district`, `key`, `layer`, `boundary`, `laid`
(empty) and `strategy` (absent), "the unit runner reads `skyHandover` … for everything the request does not carry". For a
unit run the districts do not exist when the request is made, so no `DistrictContext` or `SeamContract` can be passed;
the standalone document has the same gap.

**Required change.** V1-2.4 marks `seam`, `context`, `params` and `closeup` absent when `laid` is empty (mode `unit`): "the
unit runner builds each unit district's `DistrictContext` and `SeamContract` after its partition, from `skyHandover` (sky)
or `HoodRecipe` (standalone)"; `lod` stays `'neighbourhood'`. V05 §2.3's field list then matches as written.

### SL-14 — major — owner V01 — locality claims that the other arenas' rows contradict

**Claim.** V01 states a replace close-up's effective scope as D from S8 plus BCR-33's seam exception, and its bar T-V1-17
holds "every entity outside the district's seam exception … byte-identical (the oracle, §7.3)" (V1-3.9, V1-4.3). V04's
locality table makes the same ground edit re-derive outside D: "the part-0 blocks, and the undercity blocks under a
ceiling within `surfaceClearCm`, whose recorded ground cells its clear region covers …; N8 for the plots it re-cut; a
building created or given a basement over a cavern or ruin element draws U-ACCESS (d) …; the excavation reading" (V4
§4.3). V05's does too: "a ground edit whose effective scope meets an island's projected footprint … plus that island's
`groundRefCm` and … its `altitudeCm`" (V5 §4.3). With M6-U or M6-sky present T-V1-17 fails by its own words.

**Required change.** V1-3.9's scope, V1-4.3's replace and fabric bullets and T-V1-17 add "plus the cross-arena consequences
volumes 4 and 5 declare for a ground edit (V04 §4.3's ground-edit row; V05 §4.3's island re-read), which the oracle
predicts from those rows"; T-V1-17 runs on B-EDIT cities with the underground and the sky both on and off.

### SL-15 — major — owner V04 — "square" and "public ground" miss volume 1's square, green and yard blocks

**Claim.** V04 reads squares as L1 `square` faces: N11 places a grating "on a corridor, square or gate-plaza face"; the
forced vaults stand "under that district's public ground (corridors and squares …, by `pointLocate`)" and grow "from the
district's largest square face"; BCR-20 lays "each square face of class `square`" of a buried region as a `square`
chamber; the `collapsed_shaft` candidate needs "a square or field face"; L1's lifeline stair needs "public ground, a yard
or outside ground". V01 adds squares that are not L1 `square` faces: a dispatched `square` block is "one L3 residue face of
kind `square` (paved, commons)", a `green` block a residue of kind `green`, a `yard` block a `yard_common` residue
(V1-3.5.10), and BCR-15 draws a square block as a square in the figure-ground. So every dispatched square is "off public
ground" for V04: no grating, no forced vault, no buried square, no lifeline stair there.

**Required change.** V04 §1.2 defines once: "**public ground** is a way corridor, an L1 `square` or gate-plaza face, or a
block whose `Block.content` is `square` or `green` (volume 1, BCR-5, BCR-15); **a yard** includes a `yard` block's
residue", and N11 (sites and slides), F3's surface constraint where it names public ground, L1 (access and air), the
forced vaults (the largest square of either kind), BCR-20's buried squares (every square face and square block of the
region) and `OpeningRow`'s `collapsed_shaft` row ("a square, a square or green block, or a field face") cite it.

### SL-16 — major — owner V04 — the model's daylight share inside a render-time light

**Claim.** V04 §5.3 (l. 2198) and BCR-38 (l. 2854; file f item 414) multiply a shaft's light by "its direct-light
visibility — the ground pass's shadow term at `ground.at`, V05's island shadow and item 102's shade included". Item 102's
shade is the model-side daylight share over a fixed model day (V05 §3.19, BCR-V5-15), never a render input: "the PNG and
tile layers … carry the island's physical shadow through the light pass and its solid, never the strip" (J-V5.35). At a
render, the ground pass's shadow term under the current sun already contains the island's slabs (V05 §5.3 (1)), so the
clause either double-counts the island or injects a model statistic into the picture.

**Required change.** V04 §5.3 and BCR-38 read "its direct-light visibility — the ground pass's shadow term at its
`ground.at` under the current sun (every caster included, a sky island's slabs among them, V05 §5.3 (1))"; "and item 102's
shade" is deleted there and in file f item 414. J-V4.51's first half (the underground samples the ground prosperity with
its daylight term) stands.

### SL-17 — major — owner BASE-F — two requests rewrite one II.7.6 sentence differently

**Claim.** File f item 560 (V01 BCR-36) and item 564 (V04 BCR-36) both replace II.7.6's "an entrance stair from the
source's building (an `AccessPoint` of source `system`)". V01's new text: "on the source's ground — in the churchyard
part, the burial ground, or a charnel house or cemetery chapel standing on it, never inside a church-class building; for
a quarry ossuary at the working's mouth"; V04's: "an entrance stair on the source's burial face, its head in the face's
chapel where one stands (the underground volume §3.5.1)", whose rule body (§3.5.1 (9)) enters a quarry ossuary "by its
working's shaft and a stair at the working's surface head". Each says "whichever lands first satisfies this request", but
the texts differ and the second will not find its quoted text. File f carries both, unmerged and without an order note.

**Required change.** File f merges items 560 and 564 into one consolidated item: V04 BCR-36's sentence plus V01's "never
inside a church-class building", and the quarry ossuary's entrance as V04 §3.5.1 (9) states it ("its working's shaft and a
stair at the working's surface head"), applied once. V01's "a quarry ossuary's mouth" (§0, V1-3.5.12 (4), V1-3.7.1,
T-V1-47) reads "a quarry ossuary's surface head".

### SL-18 — major — owner BASE-F — the `Way` line is edited by two requests without an order

**Claim.** File f item 207 (V01 BCR-6) quotes "`slopeP95?: number;`" and makes it required, with the comment "the sewer
hook and volume 1's stepped rule read it"; item 208 (V04 BCR-2) quotes the same line ("slopeP95?: number; flowToward?: …")
and deletes `flowToward`, the sewer now reading `wayFall(way)` over the terrain sampler — not `slopeP95`. Item 208 has an
order note only against BCR-V6-5; V01's 18-character quote was below the integration's 40-character overlap census.
Applied as numbered, 207 changes the line and 208's quote no longer matches; and 207's comment names a reader that 208
removes.

**Required change.** File f: item 208 applied before item 207 (a note on both), item 207's new text written on the line as
208 leaves it; V01 BCR-6 (a)'s comment reads "volume 1's stepped rule reads it (the sewer reads `wayFall`, V04 BCR-2)".

### SL-19 — major — owner V01 — the lone neighbourhood's layer rules have no reader

**Claim.** V1-3.10.1 (7): "`Recipe.product = 'hood'` fixes: islands off; sewers off; undercity never; caverns and ruins
… by relief; catacombs … at the `contextRung`, … at most one per hood document". V04 never reads `Recipe.product` (grep: 0
hits); its gates are `Features.sewers` (S0's draw at the rung), the rung rows and `CircumstanceSlice.undercity`. A hood at
its default `contextRung` CITY would get a sewer network (CITY always sewers), an undercity by P6's CITY row, and — at
TOWN or above — quarries, vaults and a buried town by V04's rules, which V1-3.10.1 (7) neither admits nor excludes.

**Required change.** V1-3.10.1 (7) states the mechanism through V04's inputs: the hood's S0 writes `Features.sewers =
false` (U-NET, P1–P4 and U-FRONT then commit nothing) and the undercity circumstance `forbid` (P6 none, U-CITY never runs);
the catacomb count is 1 (a hood's churches never reach `churchesPer`; stated, not assumed); quarries, vaults and the buried
town follow V04 §3.5.0's TOWN-and-above rows at `contextRung` (or are named off, one or the other, decided here). V04 §3.1
adds one line: "a standalone neighbourhood document (V01 §3.10.1 (7)) runs the tail with the inputs its S0 writes".

### SL-20 — major — owner V01 — GeoJSON names of retaining walls and raised ways

**Claim.** J-VI.18 fixed one text for both GeoJSON variants (file f item 447): a retaining wall is a LineString of kind
`retaining` (`highSide`, `stepMinCm`, `stepMaxCm`, `material`, `state`); a raised way carries `part`, `raisedKind`, `source`,
`reason`, `deckMinCm`, `deckMaxCm`; each support a Polygon of kind `raisedSupport`, each span of kind `span`. V01 §5.3's
GeoJSON row, not touched by the integration (IN-V01-1…7), still writes `{ kind: 'retainingWall', source, material, stepCm:
[the derived profile] }`, "raised parts as LineStrings with `part` and `raised: true`" and "piers as Polygons".

**Required change.** V01 §5.3's GeoJSON row reads file f item 447's names and properties for walls, raised ways, supports
and spans (the derived profile array dropped, or kept as an extra property only if item 447 admits one; decided in item
447, cited here).

### SL-21 — minor — owner V01 — two context fields with a consumer that does not exist

**Claim.** V01's wiring row for `DistrictContext` (l. 280) names "V11's identity rows (`shade.islandShare`, `under`)" as
consumers; V11 reads neither (grep: 0 hits). `under` is filled only after the underground tail, so any stage before it —
S7c, S9b, S12c's identity — would read it empty at generation and full at a later re-derivation.

**Required change.** V01's row lists the real consumers of `under` and `shade.islandShare` — the close-up panel's reader
query, the clerk's why and volume 9's voids and shade views (post-generation reads) — and V1-2.3 states "`under` is read
by no stage before the underground tail".

### SL-22 — minor — owner V04 — the underground arena's hood-pin rows belong to nobody

**Claim.** V01 ships `hood.pins` rows arena-keyed "so volume 4 can fill `underground`" and opens an underground district
"with the `underground` hood-pin rows (volume 4's)" (V1-2.2, V1-3.8.2, V1-3.8.8, §1.3). V04 says the underground close-up
"needs nothing from this volume beyond the records" (§1.3) and never mentions hood pins.

**Required change.** V04 §1.3's close-up bullet reads "the `underground` rows of volume 1's `hood.pins` are this volume's:
it ships none (a vetoable decision: the underground's furniture is its light rows and access marks), so an underground
close-up draws no hood pins", with a J-V4 row.

### SL-23 — minor — owner V01 — `fabricSignature` against the measures V04 tests

**Claim.** V01's `FabricSignature` returns `medianBlockM2`, `gridRegularity`, `bearingEntropy` and says V04 rejects a
culture row "within item 109 (c)'s distinctness threshold" (V1-3.16); V04 tests V12's paired measures `ruin.blockArea`,
`grid.r4`, `grid.axis` against V12's `paired` margins (V4 §3.5.0a (7)). The mapping and the threshold's home are unstated.

**Required change.** V1-3.16 names the mapping (`medianBlockM2` ↔ `ruin.blockArea`, `gridRegularity` ↔ `grid.r4`,
`bearingEntropy` ↔ `grid.axis`) or returns V12's measure names, and cites V04 §3.5.0a (7) and V12's margins for the test
instead of restating it.

### SL-24 — minor — owner V01 — ground access symbols for every access kind

**Claim.** V1-5.1.2's symbols cover `cellar_stair`, `shaft`, `well`, `grating`, `sinkhole`, `mouth`, `collapsed_shaft`,
`ruin_entrance` and `catacomb`. V04 also makes ground heads of kind `stair` (II.7.3's neighbourhood stair, L1's lifeline
stair), `door` (an arch vault's door at grade, the `archDoor` row) and, inside basements, `ladder` and `hatch`.

**Required change.** V1-5.1.2 adds `stair` (step ticks in a rim, on public ground), states that an arch vault's `door` is
the base's infill drawing (no symbol), and that `ladder` and `hatch` draw on their plot like `cellar_stair` under an
admitting key.

### SL-25 — minor — owner V01 — `catchmentOf` on the other arenas

**Claim.** `catchmentOf(plot, 'walk' | 'households')` measures "along the way graph (… part 0 …)" (V1-3.16). An underground
member's metric is V04's `underDistance` (V4 §3.6a), and V04 makes each undercity neighbourhood and the sewer-front
pseudo-district a catchment of its own (§3.6a (5)); an island counts as one walking-radius unit (V5 §3.5 (3)).

**Required change.** V1-3.16 adds: "for a plot on an underground arena `walk` and `households` read V04's `underDistance`;
on a sky arena the island is one `walk` unit (V05 §3.5 (3))".

### SL-26 — minor — owner V05 — the levelled-ground reader is unnamed

**Claim.** BCR-V5-30 (file f item 309) makes levelling "a platform datum … never a write to the `Terrain` raster", read by
volume 2's datum step, the ways' stair-or-ramp rule and the retaining walls' step profile. Other readers of levelled
heights are not listed and no function names the reading: V04 reads "the levelled ground (the terrain sampler with
S10–S11's levelling)" for N6–N7's wall-face knots, the arch vault's floor and the foundation obstacles (V4 §1.2, §3.2,
§3.5.0, §3.5.4); BCR-45's span rule reads "the levelled ground" under the strip; V01's `stepProfile` reads "the levelled
plot ground".

**Required change.** BCR-V5-30's mechanism names the reader — `levelledGroundCm(p)`: the datum of the levelled plot, block
or ward holding `p`, else the unlevelled raster — and lists its readers: volume 2's datum step, the ways' crossing rule,
volume 1's `stepProfile`, volume 4's wall knots, arch floors and foundations, and BCR-45's span rule; the field readers
keep the unlevelled raster.

### SL-27 — minor — owner V05 — the island district count's constant

**Claim.** V05 §2.3 and J-V5.45 write the count with a literal "0.62 × districtHa"; V01 homes that share as
`hood.constants · sky.plotShare` (V1-3.14). V05 also computes the island's coverage units from "V01 §3.10.3 (2)'s formula"
(V5 §3.5 (3)); if an author edits `sky.plotShare`, the two copies drift.

**Required change.** V05 §2.3, §3.5 (3) and J-V5.45 cite `hood.constants.sky.plotShare` (V01) instead of 0.62.

### SL-28 — minor — owner V01 — barrier kinds on seams

**Claim.** J-VI.3 fixes six closure-arc barrier kinds (`shore`, `cliff`, `gorge`, `marsh`, `sheer`, `enceinte`). V01
BCR-30 (b) types "a cliff, escarpment or gorge `cliff`, a shore or deep water `water`, deep marsh `marsh`": it adds
"escarpment", and says nothing of `enceinte` or `sheer`.

**Required change.** BCR-30 (b) maps the six: `shore` → `water`; `cliff`, `gorge` → `cliff`; `marsh` → `marsh`;
`enceinte` → `wall`; `sheer` never types a ground seam (an island's rim is a `sky` seam, V05 §3.21); "escarpment" dropped.

### SL-29 — minor — owner V01 — the sky kinds' S7c kind factors

**Claim.** V05 §2.4 (l. 667): each `sky-*` district-kind row "carries the affinities of its ground counterpart for S7b's
split and S7c". V01's S7c kind factor is `select.kind[D.kind]`, 1 when absent (V1-3.3.3), and no `hood.templates` row keys a
`sky-*` kind, so a `sky-temple` gets 1, not `landmark`'s temple factor 2.

**Required change.** V1-3.3.3 reads "`select.kind[D.kind]` — for a `sky-*` kind, its ground counterpart's (V05 §2.4:
`sky-temple` → `temple`, `sky-palace` → `castle`, `sky-island` → the town's richest ground kind), 1 when absent".

### SL-30 — minor — owner V04 — ground accesses under a landfall

**Claim.** A landfall buries every covered way as `rubble` and leaves covered plots and faces vacant under the rubble (V5
§3.16 (4)); V04's access closures (§3.10) handle a demolished building and a re-hosted ground host, not a street grating,
stair, public opening or catacomb stair whose host lies under the fallen rock.

**Required change.** V04 §3.10's access closures add: "an access whose ground host a landfall covers (a `fallen_island`
decoration's member, V05 §3.16) becomes `bricked`, cause `convert:fallIsland`, until an epoch's clearance restores the
host".

### SL-31 — minor — owner V04 — the arch vault's condition vocabulary

**Claim.** V04 §3.5.4 (d) (2) collapses an arch vault when its span is "breached, dismantled, or a bounding raised-way pier
toppled". The raised-way record's stored states are a span's and a support's `state?: 'ruined'|'cleared'` (file f item
244; BCR-V6-26), which a landfall writes (`ruined`, V5 §3.16 (4)); "toppled" is no state anywhere. IN-V04-5 states the
landfall case's intent only.

**Required change.** §3.5.4 (d) (2) reads "collapsed where the span's `state` is `ruined` or `cleared`, where its V06
condition reads breached or dismantled, or where a bounding support's `state` is `ruined` or `cleared` (file f item 244) —
a landfall's ruin included".

### SL-32 — minor — owner V01 — a ground landing's attach in a template face

**Claim.** BCR-V5-20 makes a ground landing's attach that no way meets "a destination the district's infill must reach:
S8's first cut in that face … before the face's own recursion". V01 lays template seeds in the template face before §4.6
runs (V1-3.4) and lists the landing claim as a hole (V1-3.4.1) but ranks only a *sky* landing's attach as a portal
(V1-3.4.2 (a)); the order of the destination lane and the seeds in a ground template face is unstated, so a seed can pass
the yard's attach side and leave the destination to a lane that no longer fits.

**Required change.** V1-3.4.2 (a) reads "a landing's attach vertex — a sky island's (V1-3.10.3) or a ground landing's S8
destination (BCR-V5-20) — ranks as a gate portal and must be reached by a seed or a lane; on the ground its destination
lane is laid before the seeds".

### SL-33 — minor — owner V05 — the island retaining walls' GeoJSON

**Claim.** V05 §5.5 exports an island's retaining walls "as LineStrings in world coordinates with `elevationM` and their
step profile"; file f item 447 (J-VI.18) gives a retaining wall `highSide`, `stepMinCm`, `stepMaxCm`, `material`, `state`
in both GeoJSON variants.

**Required change.** V05 §5.5's GeoJSON row reads "as item 447's `retaining` LineStrings, plus `elevationM`".

### SL-34 — minor — owner V01 — the sky unit run's generation cost

**Claim.** V05 §6 prices "the unit run, per island (volume 1's rate)" at ≈ 8–12 ms (CITY) and 12–18 ms (METROPOLIS) inside
its critical path; V01 §6's sky row gives only "the scoped-regeneration law on the island's arena per island (II.6's
`raiseIsland` line)" and no generation figure.

**Required change.** V01 §6's sky-island row gains the generation line (≈ 8–12 ms per island at CITY, 12–18 ms at
METROPOLIS, on the generation worker concurrent with the pool), which V05 §6 then cites.

### SL-35 — minor — owner V05 — "three" reconciliations where there are seven

**Claim.** V05 §3.12 lists seven reconciliation items for volume 1 (all adopted by V01 §3.10.3); J-V5.28 says "the three
places where this volume's inputs govern" and §8's risks "V5 §3.12's three reconciliations".

**Required change.** J-V5.28 and §8 read "seven".

## 3 Disposition summary by owning volume

| owner | blocker | major | minor | findings |
|---|---|---|---|---|
| V05 | 1 | 1 | 4 | SL-01, SL-02; SL-26, SL-27, SL-33, SL-35 |
| V04 | 0 | 7 | 3 | SL-03, SL-04, SL-05, SL-06, SL-08, SL-15, SL-16; SL-22, SL-30, SL-31 |
| V01 | 0 | 9 | 8 | SL-07, SL-09, SL-10, SL-11, SL-12, SL-13, SL-14, SL-19, SL-20; SL-21, SL-23, SL-24, SL-25, SL-28, SL-29, SL-32, SL-34 |
| BASE-F | 0 | 2 | 0 | SL-17, SL-18 |
| **total** | **1** | **19** | **15** | 35 |

**What held.** The seven reconciliation items V05 §3.12 asked of V01's unit run are all adopted (V1-3.10.3); the raised
ways' slot before S7b (1), the spans' `use` as an eager base fact and the lanes under open spans agree across V01, V04 and
V05 (BCR-39, BCR-45, BCR-V5-29; J-V4.79); burial faces on islands are skipped by both V04 and V05; the aqueduct terminal
reads one rule (J-VI.9); the epoch orders (`hood.fabric` 40, `sky.clearance` 50) match V06; the catacomb source protection
and `blockLifted` are wired both ways; the DR numbers and the raised-way reason words are single-sourced by J-VI.2 and
J-VI.13.

**CONFIRMED versus PLAUSIBLE.** CONFIRMED by reading and grep: every claim above quotes the volumes' current text at the
md5s of §0, and the absences (no `HoodPlace` or opening pass in V04, no reader of `Recipe.product` in V04, no V11 reader of
`under` or `islandShare`, no rim-walk text in V01, no ruin-name report entry in V04 or V08) are grep results over the whole
files. PLAUSIBLE: the SL-01 cycle follows from §4.12's hook rule as V01 BCR-26 states it (the host's declared I/O united
with its hooks'); whether the scheduler reports it as a cycle or silently orders the stages depends on the data-key
granularity the coherence pass gives `reservations` and `allocations`.
