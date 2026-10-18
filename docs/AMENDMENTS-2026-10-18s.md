# Amendments s — the Fable retrovalidation's corrections to the design texts (2026-10-18)

Numbered from **927** (file r ended at 926).

**APPLIED** by retrovalidation/apply-design on 2026-10-18 (record: docs/validation/retrovalidation-2026-10-18/apply-design.md) — all 12 change items 927–938 applied, all 12 fragments matched exactly once at their turn, no adjustment needed; no item not applied; `docs/ARCHITECTURE-FULL.md` regenerated, `--check` exit 0.

Items 927–938: 12 change items, one fragment each, to `docs/volumes/V13-world.md` (9, items 927–935),
`docs/volumes/V14-sites.md` (2, items 936–937) and `docs/volumes/INDEX.md` (1, item 938). Source: the session's Fable
retrovalidation of 2026-10-18, called by the owner's ruling J375 (2026-10-17: "please use opus 5.5 for the rest,
marking anything from this future point onwards that does not use fable to manage or validate as something to be
retrovalidated overall at the next oppurtunity.", `docs/PROGRESS.md:434`) and the owner's "now" (2026-10-18, J391,
`:450`), staffed under J390 (`:449`: Fable judges and validates, Opus verifies and applies). Its validators' verdicts are
the thirteen `*.verdict.json` under `docs/validation/retrovalidation-2026-10-18/` — the rulings record, the eleven
families (alignment, faith, fp, lenses, plague, population, prosperity, realm, scripts, small, trade) and the
amendments family — each with its record (`<family>.md`, `rulings.md`). All thirteen are **PASS-WITH-CORRECTIONS**;
between them they judge 371 rulings and readings and carry 417 corrections: 357 of kind `research` (the research
notes), 52 of kind `record` (amendment files l–q, the records, the scripts, HANDOFF, the kernel's API note, the build
choices, the host-requirements document, the base's revision note) and **8 of kind `design`**, the eight this file carries. The other kinds are the sibling apply lanes'.

| verdict file | verdict | design corrections | item |
|---|---|---|---|
| `rulings.verdict.json` | PASS-WITH-CORRECTIONS (42 rulings: 37 UPHELD, 5 AMENDED) | 1 (V13 §2.2 `waterLanes`) | 928 |
| `amendments.verdict.json` | PASS-WITH-CORRECTIONS (22 rulings: 14 UPHELD, 5 AMENDED, 3 NOT-A-RULING) | 2 (V13 §2.3 `RouteCostLaw`; §3.11.6 *Retention*) | 929, 931 |
| `lenses.verdict.json` | PASS-WITH-CORRECTIONS (36: 29 UPHELD, 6 AMENDED, 1 NOT-A-RULING) | 1 (V13 §5.8 (7)) | 932 |
| `population.verdict.json` | PASS-WITH-CORRECTIONS (16: 11 UPHELD, 3 AMENDED, 1 OVERTURNED, 1 NOT-A-RULING) | 1 (V13 §5.9 (5)) | 933 |
| `faith.verdict.json` | PASS-WITH-CORRECTIONS (22: 17 UPHELD, 5 AMENDED) | 1 (V13 §5.9 (6)) | 934 |
| `prosperity.verdict.json` | PASS-WITH-CORRECTIONS (52: 41 UPHELD, 10 AMENDED, 1 NOT-A-RULING) | 1 (V13 §5.9 (7)) | 935 (and 930) |
| `small.verdict.json` | PASS-WITH-CORRECTIONS (16: 9 UPHELD, 6 AMENDED, 1 NOT-A-RULING) | 1 (V14 §2.4) | 937 |
| `alignment.verdict.json` | PASS-WITH-CORRECTIONS (24: 17 UPHELD, 6 AMENDED, 1 OVERTURNED) | 0 | — |
| `fp.verdict.json` | PASS-WITH-CORRECTIONS (21: 14 UPHELD, 5 AMENDED, 1 OVERTURNED, 1 NOT-A-RULING) | 0 | — |
| `plague.verdict.json` | PASS-WITH-CORRECTIONS (23: 20 UPHELD, 2 AMENDED, 1 NOT-A-RULING) | 0 | — |
| `realm.verdict.json` | PASS-WITH-CORRECTIONS (61: 50 UPHELD, 8 AMENDED, 3 NOT-A-RULING) | 0 (rulings' C1 not duplicated) | — |
| `scripts.verdict.json` | PASS-WITH-CORRECTIONS (17: 14 UPHELD, 2 AMENDED, 1 OVERTURNED) | 0 | — |
| `trade.verdict.json` | PASS-WITH-CORRECTIONS (19: 10 UPHELD, 7 AMENDED, 2 NOT-A-RULING) | 0 | — |

(The ruling tallies are counted from each verdict JSON's `rulings` array, as it stands; a family record's own prose
tally may group its readings differently.)

**How to read an item.** As file q's: each item names its target's section (the heading above it), its title in bold,
where it comes from (*From:* the validator lane, its correction's index in its verdict JSON and its own finding and
ruling ids), the line the current text stood at before this file, the current text quoted **once** (exact; a quote that
wraps across lines is written with each line break marked ⏎, the continuation's indentation kept), the new text **in
full** as a blockquote whose lines are the new lines (the `> ` prefix removed; a bare `>` an empty line), the reason —
for a validator's correction, its own reason verbatim from its verdict JSON — and the evidence, tagged **[STATED]** (a
record or ruling says it), **[OBSERVED]** (this file's seat read it in the target at the line given) or
**[INFERRED]** (this file's reasoning). Order: volume 13 in section order, then volume 14, then the index.

**The clean-room rule for the new texts.** The eight validators' new texts are taken unchanged, the validators having
written them for the volumes; checked again here: no new text bound for V13, V14 or the index names a host source
file, function, internal identifier or product name — every code span in them (`classFactor`, `biomeFactor`,
`elevationKneeM`, `elevationKneeFactor`, `plates.fullWeeks`, `plates.compactWeeks`, `waterLanes`, `EncounterCrop`,
`.trend`, `LensFacts.links`) is already the target volume's own, and the host is "the host"; one plain band word, "Moderate", is new to V13 (the verification record, below).

**Where the sources were not taken verbatim** (each a choice of this file, recorded so it can be vetoed): (a) items
927, 936 and 938 are this series' bookkeeping, asked for by no validator: V13's and V14's revision notes under the
title (the form of file q item 897 and file r item 926 (a); V14's *Coherence l* note) and the index's state line (file
q item 918, file r item 926 (i)), so the two volumes and the index say file s happened; (b) item 930 carries
prosperity's D-1 to the one other V13 text that states the host's drift as realm-wide — §2.3's `reach.kProsperity`
row, a passage the prosperity validator's record does not list among those it read (`prosperity.md:11`) — keeping the
row's claim (a relative rung is not inflated by a common drift) and saying the drift as the corrected note says it;
this is the applying seat's carriage of a Fable correction, not a Fable judgment, named for the Fable check; (c)
nothing else: every validator's new text is applied as its verdict JSON gives it.

*Not items* (listed so nothing is re-found; line numbers as they stood before this file): `small.verdict.json` correction 10, which targets `docs/ARCHITECTURE.md`
(the base's revision note, item 652 added) — of kind `record`, the record lane's, applied there with that line's notice
replacement; the V13 fragments the realm (J-RR.49), trade (RL-7) and amendments (AM-R6, AM-R13, AM-R14) lanes name and
say they do not duplicate — each applied once, here (items 928, 932–934); V13 :3147 (§5.8 (3): "upward in aggregate, a
struggling seat sinking"), read by the prosperity validator and left, already both halves of the corrected law; V13
:785 and H28 :3753 ("a conversion's strongest carrier"), the carrier the host names for one conversion, not a ranking
of carrier kinds, so faith's V1 does not reach them; V14 :2062 ("the file suffix of the multi-floor convention"),
which the small validator read (SV-4) and corrected only at §2.4; the size row of §5.9 (5) ("the label public;
numbers DM"), which the population validator leaves as a design choice stricter than the host (R-12); the dated
brackets on files l–q, the research notes' corrections and every notice replacement — the sibling lanes'; SUMMARY,
the brief, the proposals and the base — no design correction targets them, and none changes an owner decision or a
plain-language claim SUMMARY makes; the bundle `docs/ARCHITECTURE-FULL.md` — regenerated by the application seat.

---

## The change items

### Volume 13 — the revision notes under the title

**927.** **The retrovalidation's corrections recorded under the title.**
*From:* this file's own (the form of files q and r: q item 897, r item 926 (a)); not a validator's correction.
*Target:* `docs/volumes/V13-world.md`, line 103 (the last line of file r's note) as it stood before this file.
*Current text:*
> > longer wait on it (§8.5's preamble, H5's and H22's rows, §10's BCR-V13-40, §11 Q4 and its ruling).
*New text:*
> > longer wait on it (§8.5's preamble, H5's and H22's rows, §10's BCR-V13-40, §11 Q4 and its ruling).
>
> > **Retrovalidation s — 2026-10-18** (`docs/AMENDMENTS-2026-10-18s.md`, items 927–935; the Fable retrovalidation of
> > the work J375 marked pending, its records under `docs/validation/retrovalidation-2026-10-18/`). Changed, each text
> > a validator's correction taken whole save §2.3's prosperity row: §2.2's `waterLanes` comment says what "lit" means —
> > the frozen record's versioned lane slot with at least one lane, never the host's fleet switch (H25; J382 (b) as the
> > retrovalidation amended it); §2.3's `RouteCostLaw` comments give `classFactor` and the elevation knee as the shape of
> > the host's law 2 (H6), its first law pricing by biome with a ramp for a knee and not ported (J-V13.73); §2.3's
> > `reach.kProsperity` row and §5.9 (7)'s drift note say the host's band polarises — a seat at the middle rung or
> > better climbing, a struggling seat sinking — and drifts upward in aggregate only where most seats start there, the
> > relative rung resting on the polarisation, not the direction; §3.11.6's *Retention* names the lens plates' horizon
> > (§5.8 (8)) beside user events and the supersession chain; §5.8 (7) says the host's own chips are shown to the DM, no player surface
> > traced; §5.9 (5)'s trend row gives the party the direction the host's own dossier already tells it, never a believed
> > trend; §5.9 (6)'s pressure row puts an overlord's authority over its vassal above a war front.
*Reason:* the form of this series (see *Where the sources were not taken verbatim*); no validator asked for it.
*Evidence:* [OBSERVED] `docs/volumes/V13-world.md:5-103` (the revision notes, one per amendment file since revision 1: m :36, n :47, o :58, p :73, q :86, r :100-103); items 928–935 (the V13 changes it lists); [INFERRED] a reader of the volume learns what changed from its own notes, as every file since m has recorded.

### Volume 13 — §2.2 New records (`PolityWindow.waterLanes`)

**928.** **`waterLanes.lit` is the frozen record's versioned lane slot, never the fleet switch.**
*From:* retrovalidation/rulings (Fable; `rulings.verdict.json` correction 0, C1; ruling J382(b) AMENDED).
*Target:* `docs/volumes/V13-world.md`, line 812 as it stood before this file.
*Current text:*
>   waterLanes: { lit: boolean; lanes: { a: string; b: string }[] } /* the host's adopted water lanes and whether its lane system is lit; J382 */;
*New text:*
>   waterLanes: { lit: boolean; lanes: { a: string; b: string }[] } /* the host's adopted water lanes and whether its lane system is lit — lit as its caravans read it: its frozen record carries a versioned lane slot with at least one lane, never its fleet switch (V13 §8.5's H25); J382 */;
*Reason* (the validator's, verbatim from its verdict JSON): J382(b) AMENDED: V13 §3.9 (6) and §5.9 (2)'s banner read `waterLanes.lit` and H13 asks the host to send it, but nothing defines it; the host's "Sea lanes" toggle (`navalEnabled`) governs fleets and blockades while its caravans, refugee pricing and plague latency read the record's lane slot in every preset (`sp/distanceRead.js:286-292`; TRADE §9 #7) — without the definition a host builder may wire the toggle and the sway would cross water where no caravan does (or be barred where every caravan sails). V13 §2.2 line 812 as the volume stands on 2026-10-18; one line, no other text changes.
*Evidence:* [STATED] `docs/validation/retrovalidation-2026-10-18/rulings.md` (J382(b) AMENDED); `realm.verdict.json` J-RR.49 and `trade.verdict.json` RL-7 (the same fragment, "not duplicated"); [OBSERVED] `docs/volumes/V13-world.md:812`; `:3750` (H25: the host's sea-lanes switch "governs fleets and blockades, while its caravans, its refugee pricing and its plague latency use the frozen record's lanes").

### Volume 13 — §2.3 New rule tables (`RouteCostLaw`)

**929.** **`classFactor` and the elevation knee are the shape of a host law — its law 2 — not of the host's first law.**
*From:* retrovalidation/amendments (Fable; `amendments.verdict.json` correction 0; verifier finding AV-1 ACCEPTED, its text taken whole).
*Target:* `docs/volumes/V13-world.md`, line 953 as it stood before this file.
*Current text:*
> classFactor?: Record<string, number> /* the host's per-terrain-class factor through the adapter folder's class table; when present it replaces biomeFactor */; elevationKneeM?: number; elevationKneeFactor?: number /* the host's elevation knee: a step above it costs × the factor */;
*New text:*
> classFactor?: Record<string, number> /* a host law's per-terrain-class factor through the adapter folder's class table — the shape of the host's law 2 in this schema (H6); its first law prices by biome, its terrain classes keying only its receipts and seasonal factors — when present it replaces biomeFactor */; elevationKneeM?: number; elevationKneeFactor?: number /* a host law's elevation knee: a step above it costs × the factor — law 2's shape (H6); the host's first law's knee is a ramp one factor does not carry, and that law is not ported (J-V13.73) */;
*Reason* (the validator's, verbatim from its verdict JSON): AV-1 ACCEPTED, the verifier's text taken whole: at 81f1cd96 the host's first cost law prices by biome (`spatialCost.js:35-49`, 13 rows), its terrain classes key receipts and the seasonal overlay only (:62-67, :96-101, :241-254) and its knee is the ramp `elevMult = 1 + (h − 60)/15` (:385); the two comments described a law the host does not run as the host's. The schema fields stay (they are law 2's shape, H6; J-V13.73 rejects porting law 1). File m item 695, which wrote the comments, gets a dated bracket; the bundle `docs/ARCHITECTURE-FULL.md` regenerates from the volume.
*Evidence:* [STATED] `docs/validation/retrovalidation-2026-10-18/amendments.md`, `amendments-verify.md` (AV-1); [OBSERVED] `docs/volumes/V13-world.md:953`; `:3731` (H6: "its cost law 2 in this volume's schema"); `:3837` (J-V13.73: "over … porting the host's first law verbatim").

### Volume 13 — §2.3 New rule tables (`PolityRule`: `reach.kProsperity`)

**930.** **The relative prosperity rung neutralises an upward drift in aggregate, not a realm-wide one.**
*From:* this lane's carriage of retrovalidation/prosperity's D-1 (Fable; `prosperity.verdict.json` correction 41, finding V-2) to the one other V13 text that states the drift realm-wide; not in the validator's list (its record names the V13 passages it read, `prosperity.md:11`, and §2.3 is not among them) — recorded for the Fable check, vetoable.
*Target:* `docs/volumes/V13-world.md`, line 1100 as it stood before this file.
*Current text:*
> relative, so the host's realm-wide upward drift inflates no reach |
*New text:*
> relative, so the host's upward drift in aggregate — where its festival or boom writer is lit, its band polarising (V13 §5.9 (7)'s note) — inflates no reach |
*Reason:* the prosperity validator's reason for the passage it corrected (item 935), verbatim: "V-2 carried into the design: V13 §5.9 (7)'s bias note inherited 'drifts upward realm-wide in aggregate' as a law; the evidence establishes polarisation, and J384 (1)'s relative rung does not rest on the direction." This lane's: the same sentence's law stands at §2.3's `reach.kProsperity` row ("the host's realm-wide upward drift inflates no reach"): the row's claim — a relative rung is not inflated by a common drift — holds, its "realm-wide" is the word D-1 removed. The new text keeps the claim and says the drift as item 935's note does.
*Evidence:* [STATED] `docs/validation/retrovalidation-2026-10-18/prosperity.md:50` (V-2: "what it establishes is polarisation … 'upward in aggregate' is the usual case, not a law. J384 (1) chose the relative rung for this reason and the choice does not rest on the direction"), `:11` (the V13 passages it read); [OBSERVED] `docs/volumes/V13-world.md:1100`; `:3147` (§5.8 (3): "upward in aggregate, a struggling seat sinking", already both halves of the corrected law; read by the validator, unchanged); `:3392-3394` (item 935); [INFERRED] two texts of one volume stating one host law two ways leave the implementer to choose; the row's own claim is untouched.

### Volume 13 — §3.11 P1–P5 Placement, 3.11.6 The port (*Retention*)

**931.** **The map's own horizons cover the lens plates too.**
*From:* retrovalidation/amendments (Fable; `amendments.verdict.json` correction 1; own finding D-2; ruling J-RR.42 AMENDED, AM-R22).
*Target:* `docs/volumes/V13-world.md`, line 2454 as it stood before this file.
*Current text:*
> horizon governs host facts; the map's own horizons cover user events and the polity supersession chain only (V13 §2.6).
*New text:*
> horizon governs host facts; the map's own horizons cover user events, the polity supersession chain and the lens plates (V13 §2.6; the plates' own horizon is §5.8 (8)'s: `plates.fullWeeks` at full resolution, then one plate per `plates.compactWeeks`, outside every digest).
*Reason* (the validator's, verbatim from its verdict JSON): Own finding D-2: §3.11.6's *Retention* sentence (file m item 721) still says the map's horizons cover user events and the polity chain "only", while §5.8 (8) (file n item 810; J384 (9)) gives the lens plates a third map-side horizon — the contradiction J-RR.42 AMENDED in `realm.md` names, whose design consequence that record left at "none". One sentence; the bundle regenerates from the volume.
*Evidence:* [STATED] `docs/validation/retrovalidation-2026-10-18/amendments.md` (D-2; AM-R22: "design fragment on V13 :2454"); [OBSERVED] `docs/volumes/V13-world.md:2454`; `:1119` (`plates.fullWeeks` / `compactWeeks`: 520 / 13); `:3198-3199` (§5.8 (8): full resolution for `plates.fullWeeks` behind the present, then one per `plates.compactWeeks`).

### Volume 13 — §5.8 The lens mechanism, (7) (the alignment lens's audience)

**932.** **The host's own chips are shown to the DM; no player surface traced.**
*From:* retrovalidation/lenses (Fable; `lenses.verdict.json` correction 38, D1; verifier finding L1, own finding V-9; ruling RL-29 AMENDED).
*Target:* `docs/volumes/V13-world.md`, line 3184 as it stood before this file.
*Current text:*
> the host's public chips stay where
*New text:*
> the host's own chips (shown to the DM on its cards and PDF today; no player surface traced) stay where
*Reason* (the validator's, verbatim from its verdict JSON): L1 / V-9: V13 §5.8 (7) inherited the note's unsupported "public" — the host's aggression chip reaches the DM's cards and the premium PDF only (`livingWorldSignals.js:236-262`, `liveWorld.js:318`; the dossier's posture block DS-WAR-4 is dark). One phrase; the bundle regenerates from the volume.
*Evidence:* [STATED] `docs/validation/retrovalidation-2026-10-18/lenses.md` (L1, V-9, RL-29); `amendments.verdict.json` AM-R13 ("V13 §5.8 (7) corrected by the lenses lane (not duplicated)"); [OBSERVED] `docs/volumes/V13-world.md:3183-3184`.

### Volume 13 — §5.9 The lenses, (5) the population lens (the trend row)

**933.** **The party sees the direction the host's own dossier already tells it, never a believed trend.**
*From:* retrovalidation/population (Fable; `population.verdict.json` correction 44, D-1; own finding V-1; ruling R-12 OVERTURNED).
*Target:* `docs/volumes/V13-world.md`, line 3339 as it stood before this file.
*Current text:*
> | trend | `.trend` | an arrow by the sign of the host's recent deltas, labelled "by the host's law" | D | every | DM; the party's believed trend where beliefs | plate |
*New text:*
> | trend | `.trend` | an arrow by the sign of the host's recent deltas, labelled "by the host's law" | D | every | DM; the party, as the direction the host's own dossier already tells it (its retrospective sentence over the same ring and thresholds) — never a believed trend, which the host records for its courts and shows to no one | plate |
*Reason* (the validator's, verbatim from its verdict JSON): D-1 (V-1). The row inherited POP §8.5/§9.3 #5's audience reading: the host keeps belief records for its courts (per-observer, `wp/beliefAxes.js`), reads the believed `populationTrendBand` on no surface, and keeps no belief record for the party, so "the party's believed trend" would be a fact the lens invents (V13 §5.8 (4)); what the host does show the party is its dossier's own head count and DS-POP-3 direction sentence over the same ring and thresholds (`trendLens.js:1-60`; `OverviewTab.jsx:287`, `:294`).
*Evidence:* [STATED] `docs/validation/retrovalidation-2026-10-18/population.md` (V-1, R-12: "the size row's 'numbers DM' is left as a design choice stricter than the host's dossier"); `amendments.verdict.json` AM-R14 (not duplicated); [OBSERVED] `docs/volumes/V13-world.md:3338-3339`.

### Volume 13 — §5.9 The lenses, (6) the religion lens (the pressure row)

**934.** **An overlord's authority over its vassal carries harder than a war front, and one way.**
*From:* retrovalidation/faith (Fable; `faith.verdict.json` correction 57, C45; own finding V1; ruling R7 AMENDED).
*Target:* `docs/volumes/V13-world.md`, line 3367 as it stood before this file.
*Current text:*
> a war front — hostility carries hardest — a garrison, an authority
*New text:*
> a war front — hostility carries harder than any alliance or trade tie; only an overlord's authority over its vassal carries harder, and one way — a garrison, an authority
*Reason* (the validator's, verbatim from its verdict JSON): Own finding V1 reached V13 §5.9 (6)'s pressure row through lens-implications §1.3 and J379.1; the host's vassal authority channel (0.82, overlord → vassal) is a faith carrier stronger than a war front (0.72). The bundle docs/ARCHITECTURE-FULL.md:76766 regenerates from the volume.
*Evidence:* [STATED] `docs/validation/retrovalidation-2026-10-18/faith.md` (V1, R7: "V13 §5.9 (6) pressure row (C45, design)"); `amendments.verdict.json` AM-R14 (not duplicated); [OBSERVED] `docs/volumes/V13-world.md:3367`; `:785`, `:3753` ("a conversion's strongest carrier": the carrier of one conversion the host names, not a ranking of kinds — unchanged).

### Volume 13 — §5.9 The lenses, (7) the prosperity lens (*Note (the upward drift)*)

**935.** **The host's band polarises; it drifts upward in aggregate where most seats start at Moderate or better.**
*From:* retrovalidation/prosperity (Fable; `prosperity.verdict.json` correction 41, D-1; own finding V-2; the §4 reading AMENDED).
*Target:* `docs/volumes/V13-world.md`, line 3392–3394 as it stood before this file.
*Current text:*
> *Note (the upward drift):* where its festival or boom writer is lit the host's band drifts upward realm-wide in⏎aggregate, a struggling seat sinking (its purchase writer lit alone ratchets nothing) — the host's ratchet, not⏎the realm's history; the sway reads it relative to the realm's median (V13 §3.9 (7)).
*New text:*
> *Note (the upward drift):* where its festival or boom writer is lit the host's band polarises — a seat at Moderate or better climbs, a struggling seat sinks — and drifts upward in
> aggregate where generation seeded most seats at Moderate or better, the usual case for connected seats (its purchase writer lit alone ratchets nothing) — the host's ratchet, not
> the realm's history; the sway reads it relative to the realm's median (V13 §3.9 (7)), which rests on the polarisation, not on the direction.
*Reason* (the validator's, verbatim from its verdict JSON): V-2 carried into the design: V13 §5.9 (7)'s bias note inherited 'drifts upward realm-wide in aggregate' as a law; the evidence establishes polarisation, and J384 (1)'s relative rung does not rest on the direction.
*Evidence:* [STATED] `docs/validation/retrovalidation-2026-10-18/prosperity.md:50` (V-2), `:109` (§4 AMENDED: "V13 §5.9 (7) note amended (D-1); J384 (1)'s choice of relative is unaffected and stands"); [OBSERVED] `docs/volumes/V13-world.md:3392-3394`; item 930.

### Volume 14 — the revision notes under the title

**936.** **The retrovalidation's correction recorded under the title.**
*From:* this file's own (the form of V14's *Coherence l* note); not a validator's correction.
*Target:* `docs/volumes/V14-sites.md`, line 69 (the last line of the *Coherence l* note) as it stood before this file.
*Current text:*
> > T-V14-11's clauses (657); §12's Scene Levels claim settled (658).
*New text:*
> > T-V14-11's clauses (657); §12's Scene Levels claim settled (658).
>
> > **Retrovalidation s — 2026-10-18** (`docs/AMENDMENTS-2026-10-18s.md`, items 936–937; the Fable retrovalidation of
> > file l and its application, `docs/validation/retrovalidation-2026-10-18/small.md`). Changed: §2.4's
> > `EncounterCrop.scenes` comment says the file suffix is written as two zero-padded digits (§5.3), the ordinal staying
> > the number.
*Reason:* the form of this series (see *Where the sources were not taken verbatim*); no validator asked for it.
*Evidence:* [OBSERVED] `docs/volumes/V14-sites.md:5-69` (Revision 1 and *Coherence l*, the notes of the changes since the architect seat); item 937.

### Volume 14 — §2.4 Derived transients (never persisted) (`EncounterCrop.scenes`)

**937.** **The ordinal's file suffix is written as two zero-padded digits.**
*From:* retrovalidation/small (Fable; `small.verdict.json` correction 9, F-2; rulings R-3 and R-12).
*Target:* `docs/volumes/V14-sites.md`, line 795 as it stood before this file.
*Current text:*
> scenes: { ordinal: number /* the file suffix: 0 the ground, then each storey or level in elevation order (the multi-floor convention, V14 §5.3; C14-06) */;
*New text:*
> scenes: { ordinal: number /* the file suffix, written as two zero-padded digits (V14 §5.3): 0 the ground, then each storey or level in elevation order (the multi-floor convention, V14 §5.3; C14-06) */;
*Reason* (the validator's, verbatim from its verdict JSON): F-2 (SV-4's consequence the verifier did not see): §2.4's comment says 'the file suffix: 0 the ground' while the file name now carries 00 (items 649, 656, 657); the ordinal stays the number, and the comment says so where a reader of EncounterCrop looks, as vtt-l §3 already reads it. An amendments file s item.
*Evidence:* [STATED] `docs/validation/retrovalidation-2026-10-18/small.md` (F-2; R-3: "correction 10 (V14 §2.4's comment gains the two-digit spelling)" — C-10 in the record's own numbering, index 9 in the verdict JSON); [OBSERVED] `docs/volumes/V14-sites.md:795`; `docs/AMENDMENTS-2026-10-17l.md` items 649, 656, 657 (the file name's `00`).

### The index — the preamble (*What this file is*: the amendment files' state)

**938.** **File s named beside file r.**
*From:* this file's own (the form of file q item 918 and file r item 926 (i)); not a validator's correction.
*Target:* `docs/volumes/INDEX.md`, line 14 as it stood before this file.
*Current text:*
> item 926: the owner's answer to V13 §11 Q4, 2026-10-18), applied by the lane its status line names.
*New text:*
> item 926: the owner's answer to V13 §11 Q4, 2026-10-18), applied by the lane its status line names, and file s (`docs/AMENDMENTS-2026-10-18s.md`, items 927–938: the Fable retrovalidation's corrections to volumes 13 and 14, 2026-10-18), applied by the lane its status line names.
*Reason:* the form of this series (see *Where the sources were not taken verbatim*); no validator asked for it.
*Evidence:* [OBSERVED] `docs/volumes/INDEX.md:14` (files j–r and the lanes or records that applied them); file q item 918, file r item 926 (i); `docs/validation/retrovalidation-2026-10-18/STATUS.md`; [INFERRED] an index that names every amendment file but this one would be stale the day file s lands, the gap class the lens-p critic raised (file q gap 3).

---

## Verification record

The application seat (retrovalidation/apply-design, Opus 5.5 high, 2026-10-18 05:30 UTC). Targets as they stood before
this file: V13 `c8759307398388249547f71e1912feca` (4,452 lines; unchanged since this seat first took it at 05:24 and the same md5 the sites-roads reader recorded),
V14 `8f2265eafc8c387dc1e88b804e512745` (3,208 lines — the small family's notice already replaced at l. 65 by
retrovalidation/apply-small, 05:29; its l. 69, item 936's quote, unchanged), INDEX `39b0c51960df130cb068744dd2eb3ee6`
(259 lines). Every *Current text* searched exactly in its target — each once —, then all 12 fragments applied in order
by exact-match replacement in one read-modify-write per target, each quote asserted once at its turn and each new text
asserted once after (items 927 and 936 keep their quote as their first line, so it stays once), and every new text
re-read on disk once. After: V13 `a896c8dbdb41dd38516becc970b4db81` (4,465 lines), V14
`70d8aa1b3c14e7cab6a135adbd3caa00` (3,213 lines), INDEX `b19971d37d98710d9a195fb09021dd11` (259 lines). No quote
failed to match, so no item needed an adjusted quote. The bundle regenerated (`python3 tools/bundle_architecture.py`:
81,080 lines from 16 sources, the base's 05:29 record and notice edit by apply-small included) and `--check` exited 0
("UP TO DATE"); every new text occurs once in the bundle.

The clean-room check: every code span a new text adds is already its target volume's own (`RouteCostLaw` ×5,
`classFactor` ×3, `reach.kProsperity`, `waterLanes`, `plates.fullWeeks` ×3, `plates.compactWeeks` ×2,
`EncounterCrop.scenes` ×5 before this file; the repository paths of the revision notes and the index line are this
program's own); no camel-case, snake-case or source-file word in a new text is absent from its target. One plain word
is new to V13: "Moderate", the host's middle prosperity rung, in prosperity's own new text (item 935) — a band word the
host displays, not a source identifier, taken unchanged as the validator wrote it and named here for the Fable check;
this file's own texts (items 927, 930) say "the middle rung" instead.

**The final item list and targets** (12 items, 12 fragments): V13 — 927 (the revision notes), 928 (§2.2 `waterLanes`),
929 (§2.3 `RouteCostLaw`), 930 (§2.3 `reach.kProsperity`), 931 (§3.11.6 *Retention*), 932 (§5.8 (7)), 933 (§5.9 (5)
trend), 934 (§5.9 (6) pressure), 935 (§5.9 (7) drift note); V14 — 936 (the revision notes), 937 (§2.4
`EncounterCrop.scenes`); the index — 938 (the preamble's state line).
