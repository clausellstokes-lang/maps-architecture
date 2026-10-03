# Design volume 12 — Calibration, reconciliation and parity measurement: how the built generator is tuned against the references and later the corpus

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/V12-calibration; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/revise-V12; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V12-r1; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V12-r2; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V12-r3; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V12-r4; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V12-r5; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V12-r6; covered by the whole-design retrovalidation (J84).

REVISION PROGRESS (volumes/revise-V12, against `docs/volumes/critique/V12.md`, V12C-01 – V12C-50; one line per round: planned | done)
- R0 header, conventions, receipts (docs/validation/bench/v12_rev_confirm.py, v12_rev_h32.out): done
- R1 §0, §1, §1b: done
- R2 §2 (data model; V12 §2.12 known-city fixtures, V12 §2.13 no-op pins): done
- R3 §3.1 – §3.6b (measurement, crossing, metrics, bands, correlation and tendency harness, bar map): done
- R4 V12 §3.7 – V12 §3.14 (tuning, feature switch-on, no-op pins, sittings, corpus, register, failures, determinism, known-city fixtures): done
- R5 §4 – §6: done
- R6 §7 – §8: done
- R7 §9 – §13: done
- R8 disposition table appended to the critique: done

RECONCILIATION PROGRESS (volumes/reconcile-V12-r1, against `docs/volumes/critique/seam-content-calibration-r0.md`: SCC-03,
-04, -05, -07, -26 major; SCC-15, -24, -27 minor; one line per step: planned | done)
- K1 SCC-03 measurement profile against file f item 447 (V12 §2.2, §3.4.2, T-V12-4, T-V12-38): done
- K2 SCC-04 `servedShare` by the class's coverage unit (V12 §2.7, §3.6, the bar map, §3.12): done
- K3 SCC-05 the `sf:` provenance source (V12 §3.7.2, §3.11, T-V12-9, J-V12.36): done
- K4 SCC-07 and SCC-15 the item-102/109/110 register rows as column entries with V11's owners (V12 §3.11): done
- K5 SCC-26 the FM and VG preset runs (V12 §3.7.2 (3), T-V12-9, T-V12-24, J-V12.11): done
- K6 SCC-24 and SCC-27 wording (V12 §3.6b `cavernChance`, X-V12-3): done
- K7 decisions (J-V12.59 – J-V12.64), §12, the dated note, the lane log: done

RECONCILIATION PROGRESS (volumes/reconcile-V12-r2, against `docs/volumes/critique/seam-content-calibration-r1.md`: SCC-35,
-41, -48, all minor; one line per step: planned | done)
- L1 SCC-35 the stepped off form in V12 §3.7.8 (1) cites V11 §3.24.0: done
- L2 SCC-41 the `fm.*` row in V12 §3.4.2 follows V02 T-V2-31's nine rows and its plan-extent clause: done
- L3 SCC-48 the era's and the culture's item-110 factors at C3b in V12 §3.11: done
- L4 §12, the dated note, the lane log: done
- continuation on the re-issued brief (seam-content-calibration-r1.md §7): L1 – L4 verified present in the live text, not
  redone; new SCC-R1C-2 (major), SCC-R1C-5 (minor):
- L5 SCC-R1C-2 the default register line for every volume's unnamed calibratable cell (V12 §3.11, its V04 row, T-V12-20, §8): done
- L6 SCC-R1C-5 `BenchBarDef.towns.settings[].preset`'s vocabulary, `'default'` or a `PresetId` (V12 §2.1, §6): done
- L7 decisions (J-V12.71, J-V12.72), X-V12-15/-16, §12, the dated note, the lane log: done

RECONCILIATION PROGRESS (volumes/reconcile-V12-r3, against `docs/volumes/critique/seam-content-calibration-r2.md`: SCC-54,
-56, -60, -61 major; SCC-68 minor; one line per step: planned | done)
- M1 SCC-56 the `bar.<barId>` and `frame.<table>.<column>` metric families, `BenchBarDef`, `metric` as a list (V12 §2.1, §2.6, §3.4.2, §3.11, T-V12-20): done
- M2 SCC-54 the `decline` line split; a base cell's entry by the seat landing its request (V12 §3.11, §1b): done
- M3 SCC-60 a preset entry's own fallback run; preset entries in the register (V12 §2.5, §2.6, §3.7.2 (3), T-V12-9): done
- M4 SCC-61 per-run wall and retaining features merged on read (V12 §2.2, §3.4.2, T-V12-4): done
- M5 SCC-68 the `terrace` `enabled` line dropped; §1b's producers (V12 §3.11, §1b): done
- M6 decisions (J-V12.65 – J-V12.68, J-V12.11 and J-V12.63 amended), X-V12-15, §12, the dated note, the lane log: done
- continuation on the re-issued brief (seam-content-calibration-r2.md §7): M1 – M6 verified present in the live text, not
  redone; new SCC-R2C-4, -5, -6 (minors):
- M7 SCC-R2C-4 the default line's list and X-V12-16 without V08 and V10, with V03 (V12 §3.11, §10): done
- M8 SCC-R2C-5 `--defaults` writes only columns holding a compiled cell; `owner` from the source file's author seat (V12 §3.11, §2.11, §4.2, T-V12-20): done
- M9 SCC-R2C-6 BCR-V12-2's row `preset` spelled as V12 §2.1's `PresetArm`; file f item 497's note (V12 §10): done
- M10 decisions (J-V12.73, J-V12.74, J-V12.71 amended), §12, §13, the dated note, the lane log: done

RECONCILIATION PROGRESS (volumes/reconcile-V12-r4, against `docs/volumes/critique/seam-content-calibration-r3.md`: SCC-76
major; SCC-80, -81, -82, -83 minor; one line per step: planned | done)
- N1 SCC-76 the catch-all rule for every register line; the items 103–107 and item-106 lines end with it (V12 §3.11, T-V12-20): done
- N2 SCC-80 V07's one measured-rate `VG` entry, `rules.race.densityPower@VG` (V12 §3.7.1 (c), §3.7.2 (3), J-V12.11, J-V12.63): done
- N3 SCC-81 the stepped line binds V11's `stepped-shrine` row alone; V02's cells take V2 §3.10.10's line (V12 §3.11): done
- N4 SCC-82 `method: 'tune'` defined; the column sentence maps a line's method (V12 §2.6, §3.11): done
- N5 SCC-83 a `frame.*` metric read only at M-CAL (V12 §3.11's milestone exits, T-V12-20): done
- N6 decisions (J-V12.69, J-V12.70), §12, the dated note, the lane log: done
- continuation on the re-issued brief (seam-content-calibration-r3.md §6.2): N1 – N6 verified present in the live text, not
  redone; new SCC-R3C-1 (major), SCC-R3C-6, -12 (minors):
- N7 SCC-R3C-1 the default line's due for a column landing after M-CAL: the later corpus run `M-CAL/<layer>` (V12 §2.6, §2.8, §2.9, §3.10.1, §3.11, §4.2, T-V12-20, §8): done
- N8 SCC-R3C-6 `NG` in the register's preset target, the parity arms, the M5 panel, BCR-V12-2 and T-V12-24 (V12 §2.1, §2.5, §2.6, §3.5, §3.7.2, §3.9.1, §10): done
- N9 SCC-R3C-12 X-V12-15 and X-V12-16 brought to the volumes' landed text (V12 §10): done
- N10 decisions (J-V12.75, J-V12.76; J-V12.21, J-V12.72, J-V12.74 amended), X-V12-17, §12, the dated note, the lane log: done

RECONCILIATION PROGRESS (volumes/reconcile-V12-r5, against `docs/volumes/critique/seam-content-calibration-r4.md`: SCC-90
major; SCC-93 minor; one line per step: planned | done)
- P1 SCC-90 a value moved by its owning seat before its due: the paragraph, the moved-value row, the `cells` marker, the check (V12 §2.6, §2.11, §3.7.6, §3.11, §4.2, §5.2, §1b, T-V12-20): done
- P2 SCC-93 `--milestone` required; volume-qualified milestone ids; the due table's rows with M6-P's (V12 §2.8, §2.9, §3.10.1, §3.11, §8.2, T-V12-20, X-V12-17): done
- P3 decisions (J-V12.77, J-V12.78; J-V12.10 noted), §12, the dated note, the lane log: done

RECONCILIATION PROGRESS (volumes/reconcile-V12-r6, against `docs/volumes/critique/seam-content-calibration-r5.md`: SCC-98,
-99, -103, -105 major; SCC-100, -102, -107 minor; one line per step: planned | done)
- Q1 SCC-105 staged register entries: `stages`, the stage rows, *Staged entries* with the order, the lint (V12 §2.6, §2.11, §3.11, T-V12-20): done
- Q2 SCC-99 and SCC-100 the volumes' own step ids, C-steps under §16 ids, M3a for raised ways, the lint's due test, the span-rule line's order (V12 §2.8, §3.11, §6, §7, §8, §10): done
- Q3 SCC-98, SCC-102, SCC-103 *A value moved by its owning seat before its due*: named entries no run may name, the held outcome, rows added (V12 §1b, §2.6, §2.11, §3.11, §4.2, §5.2, T-V12-20): done
- Q4 SCC-107 model constants only in the register (V12 §3.11, T-V12-20): done
- Q5 decisions (J-V12.79 – J-V12.81; J-V12.77, J-V12.78 amended), X-V12-17, X-V12-18, §12, the dated note, the lane log: done

PROGRESS (one line per section: planned | done)
- 0 In plain words: done
- 1 Scope and base hooks: done
- 1b Wiring table: done
- 2 Data model: done
- 3 Generation (the harness pipeline): done
- 4 Editing: done
- 5 Rendering, labels, exports: done
- 6 Performance budgets: done
- 7 Tests and acceptance bars: done
- 8 Build plan: done
- 9 Decisions: done
- 10 Base change requests: done
- 11 Owner questions: done
- 12 CONFIRMED versus PLAUSIBLE: done
- 13 Fix list: done (revise-V12: nothing left; four variations recorded)
- continuation (file g items 105–109 with J110's refinements; the V03–V06 sittings; own pointers; the C4 hit): done

Conventions. "The base" is `docs/ARCHITECTURE.md` with amendments c, d and e folded in (their closing pass has landed:
`amendments-c/closing LANDED` in `docs/lane-events.log`) and file g's items 102–110 — with the refinements the owner approved at
J110, the crypt and catacomb switch of ~20:05 (J111), item 110 (J115) and its raised-ways revision of ~23:40 (J116) — as the
coherence pass applies them; a
section sign (§) points into the base, "V12 §" into this volume, "V0n §" into another volume. Base change requests are
BCR-V12-n (V12 §10), decisions J-V12.n (V12 §9), bars T-V12-n (V12 §7), owner questions Q-V12-n (V12 §11). This volume is
an implementer input under §17.1 (1): it names no reference class, method, grammar, palette or asset; reference evidence is
cited by file and section only, and every number it quotes from a capture is a measured behaviour (§17.1 (6)). The corpus
was not read: this volume designs its machinery and process from `partitioned/README.md`'s rules alone.

## 0 In plain words

**What this part of the program is.** Once the generator is built, its rule tables are full of numbers — how far a lane
may bend, how wide a rich plot is, how often a market sits off the main square. This volume is how those numbers are
set right and how we prove it, first against the other generators (MFCG, FTG, Neighbourhood, Village Generator and
Fantasy Manor) and later against the owner's historical map collection — without ever changing how the generator works.
It runs as four loops.

1. **Measuring the references.** We already recorded the other generators. A research helper measures those recordings
   — how much streets turn, how big buildings are, how many gates a town has — on towns whose seeds were fixed by a
   formula before anything was captured, so nobody can pick flattering examples. Only numbers cross into the product's
   folder: never a picture, a name, a colour or a line of anyone's code.
2. **Measuring ours the same way.** The product measures its own towns with the very same measuring code, so like is
   compared with like. Every number has a band worked out by one written rule; each night a report says, for every
   comparison, "in band", "out of band" or "for information".
3. **Tuning.** When one of our numbers is out of band, a table value is changed — never the code — by a small, recorded
   search run on practice towns kept apart from the test towns, then checked on a second set it never saw. Each change is
   a new version of that table, declared in the release notes in plain words ("lanes now bend a little more, matching
   FTG's streets"), and saved towns keep opening exactly as they were made.
4. **The owner's eye.** At each big milestone the owner gets a sitting page: pairs of maps, ours beside a reference, the
   sides hidden, three questions per pair — which is easier to read, which looks more like a real town, which would you
   rather use. About 35–45 minutes, and it can be split. Only the owner's answers let a milestone say "at parity" or
   "mastered"; a machine never says it for them.

**Tendencies, not guarantees.** Many of the owner's rules are leanings — "the tannery is usually downstream", "a town that
grows over a cavern usually breaks into it", "caverns are likelier in the mountains". The harness proves each one by
counting over many practice towns: it ranks each town against the same town shuffled at random (breaking exact ties by
a fair coin, so a count that can only take a few values is judged fairly), counts members exactly where the question is
"how many landed on the right plots", or watches a rate climb as the towns grow — with rules worked out beforehand so that
chance alone almost never passes and a real leaning almost always does. A bar that fails is re-run once on fresh towns
before anything is changed, so bad luck never moves a number. Where the owner's own volume states how a bar passes, that
statement wins; this volume supplies the machinery.

**Rules that are the owner's stay the owner's.** Some numbers are not leanings but the owner's word — a catacomb only under
a cemetery, the cathedral always with a crypt, raised ways generated only in cities. No tuning run, no fallback and no
historical map may move them; if the historical maps ever show something an owner's rule excludes (a catacomb under a
cathedral, say), it goes to the owner as a question with the recommendation "keep the rule", never into the numbers.
Catacombs are checked to never shrink on every kind of rebuild — a new epoch, a regeneration, a re-derive, "New random",
an upgrade — and, when they cannot grow, to fill their ossuaries instead.

**Later: the historical maps.** After the town, neighbourhood, building and village generators are built, the owner's
historical map collection adjusts the default numbers and the bands — never the machinery ("what we built stays the
base"). Its rules of evidence are strict: one historical example proves that something is *possible* (so the generator
must be able to make it), never that it is *common*; only a fair sample of measured town plans, chosen before anyone
looks at the answer, can say how common something is. The collection teaches drawing, never naming, and its 53 held-back
plates are never used. MFCG's and FTG's own behaviour stays exactly reachable through the two parity presets; the
historical values arrive as a "historical" layer, and the owner decides at a before-and-after sitting whether it becomes
the default.

**Terraces, raised ways, decks and stepped temples (item 110).** Towns can now have terraces held by retaining walls.
Cities can raise viaducts, raised roads and aqueducts where the ground or the water calls for them, and you can add or
remove any of them — a removal holds through every rebuild and every new table release. Buildings can stand on moles,
jetties and bridges, and temples can be built in steps. None of the other generators does these things, so we measure
them against our own rules, not against a reference, and the two "look like MFCG / look like FTG" settings never show
them. A second test city made from an original sketch — a port with a sea-anchored wall, a walled harbour, terraces, a
raised road and a stepped temple — must come out as sketched, every time, and so must the first. Turning the new rules
off must give back exactly yesterday's towns. Six short items at the M4 sitting ask whether they look right.

**How it feels to the owner.** A one-page dashboard in plain words after each nightly run; a sitting page at M1, M2b,
M4 (with six short items on the new raised ways, terraces, decks and stepped temples), M5, M6 (buildings), the village
milestone and after the historical reconciliation, and shorter ones for the floor plans, the underground, the floating
islands and the town histories — never more than one older, unrated sitting carried into a new one; and release notes
that name every number that moved, what it was matched against and by how much, with one plain line for each new
behaviour switched on.

## 1 Scope, the base hooks consumed, and what is out of scope

**Built to depth here.** The calibration harness end to end: the metric suite as a registry with one implementation run
on every source (V12 §2.1–§2.2, §3.4); the numbers-only crossing of the firewall (V12 §3.3); the capture-and-measure loop
with pre-registered seeds (V12 §3.2); the exact band arithmetic and the parity run (V12 §3.5); the correlation harness
every "above a random baseline" bar uses (V12 §3.6) and the share, sweep, paired and two-sample harness of every other
tendency bar (V12 §3.6b); tuning runs as table-version bumps with declared shifts and goldens
(V12 §3.7); reference drift (V12 §3.8); the owner's sittings as a general panel engine with its page (V12 §3.9); the
corpus reconciliation as a process — what it may change, what it may not, its evidence and acceptance rules (V12 §3.10);
the calibration register that keeps every provisional number wired to its measurement (V12 §3.11); the known-city
fixtures' engine, the second fixture's structure list, seed and golden (V12 §3.14, item 110 (e)); the no-op pin engine
every volume's item-110 pin registers on (V12 §3.7.8) and the four feature switch-on bumps (V12 §3.7.6).

**The base hooks consumed** (each cited, never restated):

| base hook | what this volume uses it for |
|---|---|
| §13.5 — `Baseline`, `ParityReport`, the band rule, the ⟨M-1⟩ rule, matched sizes, the metric table and the rows amendments b and c add | the metric catalogue's rows (V12 §3.4), the band arithmetic (V12 §3.5), the report (BCR-V12-1, BCR-V12-2) |
| §13.6 — the D-5 protocol, `H32`, `D5Pair`, `FtgCapture`, `D5Record`, the rule for an unrated panel | the panel engine and the sitting page (V12 §3.9; BCR-V12-6) |
| §13.7 — J-T, the thresholds, "not achieved" | the register (V12 §3.11), tuning's scope (V12 §3.7), the correlation margin row (BCR-V12-12) |
| §13.9 — `CorpusAdapter`, `CorpusMap`, `CalibrationRun`, items (1)–(7) | generalised to every calibration run (BCR-V12-3) and the reconciliation process (V12 §3.10; BCR-V12-4) |
| §13.3 — `ShiftRecord` (cause kinds `calibration`, `baselineShift`), `CascadeRecord`, `MilestoneRecord.parity`, the golden store | every accepted run's declared shift (V12 §3.7) |
| §13.2 — the core statistics record and the bench metrics (`stats(doc, { level: 'bench' })`); the faithfulness campaign's rank method | the per-town inputs of the metrics; the model for the correlation harness's calibration |
| §13.8 — the CI tiers and budgets | where each run lives (V12 §6) |
| §16 M-1 and the milestone rows; §12.1 (the reference machine, `bench/calibrate`) | the build plan (V12 §8); timing metrics normalised by the calibration score |
| §17.1 (1)–(7) — seats, the digest, the repository boundary, numbers-only files, the scanner, provenance, the record | the firewall crossing (V12 §3.3) and every record's provenance |
| item 69 — the palette targets, §8.2's measurement render and definitions, §13.4's palette bar | the `palette.*` metrics and their re-sign rule at reconciliation (V12 §3.10.7) |
| §7.6 — cells `{value, unit, provenance, calibratable, extension?, presets?}`, the parity presets, overrides, the reading rule for absolutes | what a run may write and where (V12 §3.7.2, §3.10.3; BCR-V12-5) |
| §6.4 — table versions, output versions, retention | a run ships as a table-version bump inside an output-version bump |
| §11.1 — the metric GeoJSON variant | the neutral measurement profile `MeasureInput` (V12 §2.2) |
| §14 — `@plat/testkit`, `@plat/tables`, `@plat/docs`; `CorpusAdapter` as an extension point | where the code lives (BCR-V12-10) |
| D-2 (era and region presets), D-5, D-30, D-31 | the reconciled preset layer (V12 §3.10.3); the gates; FTG's METROPOLIS |
| §2.7 `Enceinte.closure` with item 106's `barrier` closure; §11.1's GeoJSON walls | the enclosure every wall metric reads (V12 §2.2, §3.4.2; BCR-V12-15) |
| II.7.3, II.7.5, II.7.6 with item 109's `ruin` system, its access records and the catacomb rules (V04's `CatacombComplex`, `CatacombRule`; V11's crypt column); §4.11's epochs | the underground profile, the crypt and catacomb metrics and the sweep bars' units (V12 §2.2, §3.4.2, §3.6b) |
| §2.7 with item 110's `RetainingWall`, the raised ways' arena parts (§3.4) and deck plots; §5.3's revised deck invariant | the profile's new kinds (V12 §2.2; BCR-V12-17 as file f item 447), the `raised.*`, `retaining.*`, `deck.*` and `tier.*` metrics (V12 §3.4.2) |
| §13.2's T101-6 (the known-city fixture) and §13.8's milestone tier for it | the known-city fixtures' engine (V12 §3.14; BCR-V12-16) |
| §7.5 (upgrade) and §7.1's fate report; §7's persistence of edits to generated content | a release or a layer never re-opens a removed raised way (V12 §4.1) |
| §17.1 (5) (the deny-list) and (8) (the published algorithms) | the fixtures' name scan (BCR-V12-18); the statistical methods (BCR-V12-21) |

**Rules from other volumes this volume hosts.** V01's NG template rows (T-V1-31) and panel (T-V1-32), V02's Fantasy
Manor harness and panel (T-V2-31, V02 §7.5; BCR-V2-19, BCR-V2-25), V07's VG rows and panel (T-V7-23, T-V7-29;
BCR-V7-23), V03's Dwellings notes (descriptive, research-side, never a `baselines.json` row) and its plan panel (V03 §8,
P6), V04's underground panel (V04 §7), V05's island set (V05 §7, descriptive), V06's history panel (V06 §12, on H-100),
and file g's statistical bars (items 103 (e)–(f), 104 (g), 104 (h) (8), 105 (k), 106 (h)'s enclosures, 107 (g), 108 (f),
109 (a), (c), (i), (j) (5) and (k) (6), and 110 (b)'s two "likelier" clauses and its viaduct and aqueduct presence) all run
on this volume's machinery; item 102 (g) is a fixture bar of V05 and V06, not a random-baseline bar (V12 §3.6). Each volume
keeps its rows' content, this one supplies the registry entries, the bands, the harnesses and the sittings. **Precedence
(J-V12.48):** where the owning volume states a bar's pass rule, seeds or tolerance (V11's T-V11-12 – T-V11-18, V04's
T-V4-6, -19, -20, -43, -49 – -58, V06's T-V6-34 – T-V6-40), that statement wins and the harness takes it as parameters
(V12 §2.7, §2.7b); V12's rules are the defaults for a bar that states none. The unit a g item names (a *void*, a
*placement*, a *district*) is g's and binds the owning volume too. Every volume's "calibrate-later constant, with its
default, its measurement and its fallback" (V01 §1, V05 §1, and the same rule in every volume) becomes one row of the
calibration register (V12 §3.11). The second known-city fixture's structure list, seed and golden are this volume's
(item 110's HOMES: "V12 (the fixture's bars)"; V02's X25, V09 §7.2); its canvas script is V09's, its transcript V10's.

**Out of scope.** The stages that produce what is measured (§4, the volumes); the content of any rule table (V11, and
V04's `CatacombRule`); the g items' bars as base text (the coherence pass writes them into §13.2 from file g — this volume
gives them their harness and default pass rule, BCR-V12-13); the bars of the other volumes (their own §7), among them
every fixture bar of items 105–110 that is a plain conformance check — a quay reachable, a catacomb count within its bound,
at most one catacomb at TOWN, every catacomb under a cemetery or a CITY or METROPOLIS quarry ossuary and none under a
church, the cathedral always crypted with the largest crypt (V04's T-V4-50, V06's T-V6-40, V11's T-V11-25), and item 110
(f)'s:
* generated retaining walls exactly where S10 or S11 levels ground steeper than `terrace.slopeMin` with a step above
  `terrace.stepMinCm`, and never elsewhere (the base's §13.2 invariant, written by the coherence pass; V06's T-V6-62 over
  epochs; V01's terraced districts), reported by the model metric `retaining.onFlatM` (V12 §3.4.2), never a harness row;
* every way crossing a retaining wall a stair or a ramp (the base's way-class rule; V01; V07's village crossing rule);
* a raised part's zero junctions with part 0 and no shared planar arrangement (§3.4 and §5.3's revised deck invariant;
  V04's T-V4-62 – T-V4-70 below it; V01's T-V1-51);
* generated raised ways only at CITY and METROPOLIS, each with its reason, within the cap, and a removal holding (§13.2;
  V06's T-V6-60; V01's T-V1-52; V07's carried ways; V09's tool) — V12's reach there is the guards (V12 §3.7.4), the
  owner-stamped cells (V12 §3.7.2) and V12 §4.1's rule for releases and layers;
* tiers nesting with one shadow each (V02's T-V2-44);
* deck plots within the deck's width and budget, falling with the deck (V02's T-V2-47; V06's T-V6-63; V01's T-V1-53).

Also out of scope: an editor sitting on the application itself (V09 §7.4 reuses only the protocol's shape); SettlementForge's
inputs (V08) — calibration never *targets* a dossier fact, reads dossier fields only as fixture inputs of its bars and
guards (V12 §1b), and never re-signs the dossier row sets (§13.9 (7)); FTG's paid METROPOLIS (D-31; Q-V12-1).

## 1b Wiring table

Every piece this volume adds, what feeds it, what it feeds and the base hook it plugs into. No piece is an orphan: each
has a producer and at least one consumer, and each record is rendered, exported and persisted (V12 §5, §2.11).

| piece (V12 §) | producer (fed by) | consumers (feeds) | base hook |
|---|---|---|---|
| metric registry `METRICS` and its generated `metrics.json` (2.1, 3.4) | `@plat/testkit/metrics`, authored from this volume's catalogue | `plat measure`, `plat parity`, the crossing check (C6), `plat calibrate`, the research side's row writer, the docs pages, release-note sentences | §13.5 metric table; §13.2 bench metrics |
| `MeasureInput`, the neutral profile (2.2) | `measureInputOf(doc)` for our towns; research adapters for each reference; the corpus adapter at M-CAL | `plat measure` (every `geo` metric) | §11.1 metric GeoJSON |
| `plat measure` (3.4) | a `MeasureInput`, a `.plat` document, a render, a trace or a count file | per-seed metric rows → `plat baselines aggregate` (research side) and `plat parity` (product side) | §13.2 `stats(doc, { level: 'bench' })` |
| `plat baselines aggregate` and the estimators (3.5) | per-seed rows | `Baseline.values`, `spreadKS` (research side); ours in `ParityReport` | §13.5 band rule |
| `BaselinesFile` header — pins, crossing records (2.3) | the baseline seat through the crossing (3.3) | `plat parity` (gating build), drift handling (3.8), the checker's audit | §13.5 build rule, §17.1 (4) |
| `Baseline` additions — `metricVersion`, `sample`, `estimator`, `spreadKS`, `scale`, `evidence`, `frameN`, `supersedes` (2.3; BCR-V12-1) | `rows.py` over `plat baselines aggregate` | the band arithmetic (3.5); the crossing check C6–C9; tuning targets (3.7); corpus runs (3.10) | §13.5 `Baseline` |
| crossing check `plat baselines check` and its M-1 twin (3.3) | a candidate `baselines.json`, `ftg-captures.json`, `ng-counts.json` or panel file | the commit into `plat/`; `CrossingRecord` | §17.1 (3)–(5) |
| seed families `seedOf` (2.4) | `@plat/testkit/seeds` | the capture plan (3.2), B-REF (3.5), B-CITY and the goldens (BCR-V12-7), tuning train and holdout (3.7), the correlation harness (3.6), panels (3.9) | §13.3, §13.6 (2) `H32` |
| capture plan `research/baselines/plan.json` (3.2) | `plan.py` over the seed families | the capture sessions; crossing check C7 | §16 M-1 |
| `ParityReport` additions (3.5; BCR-V12-2) | `plat parity` | `MilestoneRecord.parity`; `CalibrationRun.before` / `after` / holdout; the dashboard; release notes | §13.3, §13.5 |
| parity dashboard and plain-words summary (5.1) | `plat parity --html` | the owner; the seats; the milestone exit review | §14 `@plat/docs` |
| `NullModelSpec`, the correlation harness `plat nullmodel` (2.7, 3.6) | specs registered by each bar's owner (the base's §13.2 rows, V11's T-V11-12 – T-V11-14, the volumes' bars); the towns of B-CITY's nightly (pooled settings) or the spec's own `null/…` family (fixture settings) | `ParityReport` rows of class C / O with verdicts `pass`, `suspect`, `fail`; the confirmation re-run on `null/…/c1/…`; corpus correlation rows; the register | §13.2; file g items' bars; T71-3 |
| `CalibrationRun`, generalised (2.5, 3.7, 3.10; BCR-V12-3) | `plat calibrate run <spec>` | table source edits (V11's compiler), `ShiftRecord`s with cause `calibration`, the register's history, release notes, `ReconciliationRecord.runs` | §13.9, §13.3, §6.4, §7.6 |
| calibration register `register.json` (2.6, 3.11) | the seat landing each volume's constants — its named lines' entries, and the default line's by `plat calibrate register --defaults --milestone <id>`, its due by the landing milestone (reconciliation round 2's continuation, SCC-R1C-2; round 4's continuation, SCC-R3C-1), and by the same command a moved value's cells row on its default entry, or on a named entry whose cells no run may name, and a rows-added row on any entry (V12 §3.11's *A value moved by its owning seat before its due*; round 5, SCC-90; round 6, SCC-98, SCC-103), a held row by `plat calibrate register --hold` (SCC-102); status changes and staged advances by runs, panels, exits and M-1 (SCC-105) | `MilestoneRecord.exitCriteria`; release notes; the tables editor's cell inspector (V09); the clerk's provenance answer (V10) | §13.7 J-T |
| provenance `evidence` ids and `dist/evidence.json` with each cell's register status (2.10; BCR-V12-5) | accepted runs, panel picks, M-1 re-measurements; the register's statuses | V11's compiler (carries the ids into every compiled cell, writes the file); V09's cell inspector and preset dialog (X-V12-6); V10's clerk, plain line first (X-V12-7); the M4 provenance audit | §7.6 cells, §17.1 (6) |
| `PanelSpec` engine, `plat d5 seeds / render / verdict` (2.8, 3.9; BCR-V12-6) | registrations: the base's M1, M2b, M4, M5; V02's M6; V07's V-M4; V03's V3-P6; V04's V4-U5; V05's M6-sky; V06's V6-E7; this volume's M-CAL and each later corpus run's `M-CAL/<layer>` (3.10.1) | `seeds.json`, the renders, `D5Record` verdicts, `MilestoneRecord.d5` | §13.6 |
| the sitting page `research/d5/<panel>/sitting.html` (3.9, 5.4) | `build_sitting.py` over the product's renders and the reference images | the owner; `answers.json` → `D5Record` | §13.6 (4)–(9) |
| reference pins and the drift watch (3.8) | `research/baselines/watch.py` | `BaselinesFile.pins`; a `baselineShift` shift record at a pin change | §13.5 "a new reference build never overwrites a row" |
| the corpus adapter implementation (3.10) | the M-CAL adapter seat, research side, reading the corpus under its own rules | `CorpusMapMeta` index; `MeasureInput` files | §13.9 `CorpusAdapter` |
| `SampleFrame` (2.9, 3.10.2) | the adapter seat, declared before measurement | frame rows' `evidence` and `frameN`; the evidence gate of corpus runs | §13.9 (1) |
| `ReconciliationRecord` (2.9, 3.10) | the M-CAL calibration seat, for M-CAL and each later run `M-CAL/<layer>` (3.10.1; reconciliation round 4's continuation, SCC-R3C-1) | `MilestoneRecord` M-CAL (and `M-CAL/<layer>`); the register's corpus dues (3.11); release notes; the owner's reconciliation report (5.5) | §13.9 |
| the historical pack `historical:<frame>` (3.10.3; BCR-V12-22) | accepted corpus runs of its frame | §7.6's packs slot for documents whose D-2 era and region match the frame; the preset dialog's "historical (<era>, <region>)" entries (V09, X-V12-6); the recipe's pinned pack version | D-2, §7.6 |
| `StatBarSpec` and `plat statbar` — share, sweep, paired, two-sample and no-regression bars (2.7b, 3.6b) | specs registered by each bar's owner: file g items 104 (h) (8), 105 (k), 107 (g), 108 (f), 109 (c), (i), (j) (5), (k) (6) as the coherence pass writes them into §13.2, and the volumes' own tendency bars | `ParityReport` rows of class C / O; register entries of method `measure`; `known-defects.json` | §13.2; §13.7 (BCR-V12-12) |
| the `sweep/…` seed family (2.4) | `@plat/testkit/seeds` | the sweep bars' towns and histories (3.6b) | §13.3, §4.11 |
| the enclosure profile: `closure` and `enclosure` features (2.2) | the GeoJSON export's closing edges (BCR-V12-15); the MFCG adapter's shore split (3.2.2); a corpus plan's drawn circuit | `walled.share`, `wall.*`, `gate.count`, `wall.barrierShare` (3.4.2); the corpus frames' wall rows (3.10.5) | §2.7 `Enceinte.closure`; §11.1 |
| the underground profile `undergroundInputOf` (2.2) | the model's underground systems (II.7.6; item 109's `ruin` record, its access records) | `grid.*`, `ruin.blockArea`, `plan.*`, `void.*` (3.4.2) → the paired, two-sample and sweep bars (3.6b) | II.7.6 |
| column-level register entries (2.6, 3.11) | the seat landing each V11 content milestone (V11 §8's register at every exit; C6 at M4 audits them — V11's round 1, SCC-08) and V04's mechanisms; V02's M3a-V2, M6a, M6b and M6c seats (V2 §8.3, §8.5) and V06's E1 – E8 seats (V6 §8); the seat landing a volume's base change request for the base cells it adds (V06's E2, BCR-V6-26; reconciliation round 3, SCC-54, SCC-68) | milestone exits; the corpus runs' target lists (3.10.5); the V4-U5 panel's confirmations | §13.7 J-T; §7.6 |
| owner-rule stamps `provenance.ownerRule` (2.10; BCR-V12-5) | V11's compiler from the owner-rule rows (and V04's tables for `CatacombRule`'s gates) | spec refusal rule (2) (3.7.2); R6 and E1/E4 (3.10.3–3.10.4); the register check (3.11) | §7.6 cells |
| `ReconciliationRecord.ownerExcluded` (2.9) | E1 and E4 under R6 | the owner's reconciliation report as owner questions (5.5); T-V12-25 | §13.9 |
| `frames.json` (2.9, 3.10.2) | the adapter seat, crossed before any row of its frame | check C8 (3.3); `ReconciliationRecord.frames` | §13.9 (1) |
| crypt and catacomb metrics `crypt.*`, `catacomb.*` (3.4.2) | V04's `CatacombComplex` records (keyed by id, its source lineage), V03's `Basement.crypt`, V11's crypt column | the record-keyed `exactMonotone` and `exactBound` bars (3.6b); the crypt and `under.catacomb` register lines (3.11); the V4-U5 framing (3.9.2) | II.7.6 |
| the step-script runner of `exactMonotone` (2.7b, 3.6b) | the bar's fixture documents | T-V4-51, T-V4-52, T-V6-38, T-V6-39 (their owners' bars, run here) | §7.1's events (Regenerate, Re-derive, New random), §7.5's upgrade |
| `GuardSet.fixtureSuites` and the TOWN guard setting (2.5, 3.7.4) | B-DOSSIER-lite (§13.2, item 84), the owner-rule hook fixtures, K1 and K2 (3.14), `tune/<id>/guard/TOWN/…` | a run's acceptance (3.7.5); `guardFlips` | §13.2, §13.8 |
| `KnownCityFixture`, `StructureCheck` and the structure engine (2.12, 3.14) | the fixture seats (brief, skeleton; implementer tier), V09 §7.2's canvas script, V10's recorded transcript, the `known/<id>` seed | T-V12-36; the guards; the M4-110 group; `MilestoneRecord.exitCriteria` rows `T-V12-36:<id>`; V03's B-PLAN click set (from P1); V01's T-V1-54 re-run at M5; V04's T-V4-62 – T-V4-70 on K2; V10's evaluation group A | §13.2 T101-6 (BCR-V12-16); §13.8 |
| `NoOpPin` and its off-state golden sets (2.13, 3.7.8) | registrations: V02 (T-V2-50), V04 (T-V4-69), V05 (T-V5-15), V06 (T-V6-65), V07's pin, V11 (T-V11-31), V12 (K1, K2); V11 §3.24.0's switch table | CI (nightly; PR on the two PR golden seeds); the four switch-on bumps (3.7.6); re-recording by other causes' shifts | §13.3; §6.4 |
| V11 §3.24.0's switch table — `terrace.enabled`, every `raisedWays` chance, every `deck.offer` with the `deck.landmarks` chances, `roster.specialisations` (V11's rows; X-V12-9) | V11 | the pins' overlay (3.7.8); the parity presets, where they resolve off (3.4.4); the switch-on bumps | §7.6 `extension`; J-V11.12's parity-neutral default |
| the four switch-on bumps, `ShiftRecord.cause` of the base's kind `feature` (3.7.6) | the release that switches a family on | shift and cascade records; the release notes' plain line (5.5); K1's and K2's goldens | §13.3 |
| the profile's item-110 kinds and properties (2.2) with file f item 447's export (BCR-V12-17, IN-V12-4) | `measureInputOf`; §11.1's GeoJSON variants | the per-part way graphs; `wall.*`, `bldg.*` reading only their kinds; the `raised.*`, `retaining.*`, `deck.*`, `tier.*` metrics; T-V12-4, T-V12-38 | §11.1 |
| `raised.*`, `retaining.*`, `deck.buildings`, `tier.count` (3.4.2) | the route solver's raised-way records (reason; `source` derived at read; the founding rung from the founding epoch's record — file f item 244, ST-06; base §4.3), S10 and S11's levelling, V02's tiers and deck buildings | the TOWN guard (3.7.4); the four raised-way bars; the no-op pins; the switch-on shift records; the nightly statistics | §13.2 |
| `crossing.kinds`, `water.needRatio`, `ruin.survival` (3.4.2; reconciliation round 1, SCC-07) | the way segments' `stair` and `ramp` flags and the `W_STEEP_RAMP` reports (S4, S5, S9); S6's water-balance function over the town's recorded inputs; the ruin's element records and their states (V04) | the `ways.crossing`, `water`, `climate` and `under.ruin` `survival` register lines (3.11); the M4-110 and V4-U5 panels' reports; T-V11-33's bench | §13.2 bench metrics |
| the metric families `bar.<barId>` and `frame.<table>.<column>` (2.1, 3.4.2; reconciliation round 3, SCC-56) | `plat build`, from the registered `NullModelSpec`s, `StatBarSpec`s and `BenchBarDef`s and from the registry's calibratable columns; values by `plat parity` (each bar's row) and at M-CAL and each later run `M-CAL/<layer>` by the corpus runs' frame rows | the register entries' `metric` lists (V12 §3.11's lines; V02 §3.10.10, V06 §8, V11 §8); the lint (T-V12-20); the milestone exits' history rows; the fallback runs' targets (3.7.1 (b)) | §13.2 bench metrics; §13.5; §13.9 |
| `BenchBarDef` (2.1) | each bar's owner, once a register entry names it (X-V12-15: the base's T16-4, V02's, V03's T-V3-35, V06's and V11's statistics-bench bars) | `plat parity`'s bar rows → `bar.<barId>`; the register | §13.2 |
| the four raised-way bars `T110b.*` (3.6b) | forcing fixture sites (frozen S1), `Level.intent.wealthLevel`, the dossier landmark fixture (DR-V8.8) | the `raisedWays` register line (3.11); fallback runs bounded by the owner floor (3.7.2) | §13.2 (the coherence pass writes them from item 110 (b)) |
| the M4-110 SOLO group (3.9.1) | the panel engine; K2 and five forcing-site towns | the `panel` confirmation of the item-110 register lines (3.11) | §13.6 |
| `plat/goldens/parity/history.jsonl` (5.1) | `plat parity`, one line per row per run | the dashboard's sparkline | §13.5 |
| `known-defects.json` entries opened here (3.12) | failing bars, unreachable witnessed values, withdrawn M-1 rows | closed by the run or report that clears them, listed in `MilestoneRecord.knownDefects.closed`; release notes | §13.3, §13.7 |

**The dossier.** Calibration never *targets* a dossier fact: the dossier row sets `tables/dossier/*` are never a
calibration target (§13.9 (7)), B-DOSSIER-lite's fixtures are not a seed family of any calibration run, so a SettlementForge
fixture never moves a default, and FTG pairs take their populations from the captures (§13.6 (2)), never from a dossier.
Calibration always *guards* the dossier fixtures (V12 §3.7.4: B-DOSSIER-lite runs on every accepted candidate), and its bars
*read* these dossier fields as fixture inputs, each through its derivation row (V08's traces; the derived fixtures are
registered in the frozen fixture manifest of §13.2 and item 84, which §17.1 (3) makes the one door for a dossier into
`plat/`):

| dossier field (V08) | derivation row | where this volume reads it | how |
|---|---|---|---|
| the population | DR23 (the rung and the frame), DR7 | item 108 (f)'s population sweep levels (× 0.5 … × 2) | a derived fixture `<dossier>@pop×k` in the manifest; a level whose population leaves [1 500, 120 000] is skipped and reported `notApplicable`, never a failure (V12 §3.6b) |
| `site.ruinEvidence` (ancient ruins, a ruined landmark, a magical node, ley lines, magical history) | DR-V8.2 | a level's forced ruin source (item 109 (b)) | a fixture record, never a test-only branch (J-V12.35) |
| the terrain and the mining deposits | DR-V8.3, DR1 | the mining boost's `higherWith` strata (item 109 (a)) | a fixture record; the site-stage factor is `SiteResources.ore` or the deposits (V12 §3.6b) |
| `economy.chains` (SettlementForge's `activeChains`) | DR-V8.5 | item 104 (h) (8)'s and item 105's custom-chain levels | V08's custom-chain fixtures |
| the burial, church, cathedral and monastery records, the Cemetery network | DR-V8.4, DR9 | the catacomb count and crypt levels (item 109 (k)); the crypt checks | the surveyed-dossier fixtures |
| `wealth.label` | DR6 (to `intent.wealthLevel`) | the elevated-road prosperity trend's dossier arm (item 110 (b)) | the fixture's wealth word; the standalone arm sets `Level.intent.wealthLevel` |
| the institutions of significance ≥ 20 and the custom `landmark` records on high ground | DR-V8.8 | the elevated-road landmark `higherWith` (item 110 (b)) | the same fixture with and without the landmark |
| the water-system record `aqueduct_or_water_system` | DR-V8.7 (V11's mapping to `conduit_house`) | the raised bump's shift records name the B-DOSSIER-lite towns carrying it (V12 §3.7.6) | read, never targeted: at CITY and METROPOLIS it makes the aqueduct's need count as met (V11 §3.24.7 (3); V11's round 1 withdrew the chance factor, SS-13), never a declaration — the dossier declares no arches, so no raised way has a dossier source (V06, C6-47) |

## 2 Data model

Everything below is test-side or repository data — code and JSON in `@plat/testkit` and `plat/calibration/`, plus
research-side files that never enter `plat/` — except the two optional provenance fields of V12 §2.10 (`evidence` ids and
the `ownerRule` stamp), which ride in the shipped tables, and `dist/evidence.json` beside them. None of it is document state: a `.plat` document never holds a metric, a baseline or a run; it holds the
table versions they produced (§6.4). Units: `m`, `m2`, `ha`, `deg` (degrees), `share` ([0, 1]), `count`, `perHa`,
`perKm`, `ratio` (dimensionless), `bits`, `ms`, `s`, `luma` (8-bit Rec. 601), `rb` (8-bit R − B), `chroma` (CIELAB C*ab),
`z` (standard scores), `none`.

### 2.1 The metric registry

```ts
// @plat/testkit/metrics — code; `plat build` also writes dist/metrics.json (ids, versions, inputs, units, rows) for the docs and the research side
type MetricId = string   // dotted, stable, never reused: 'street.turn100', 'lots.r4.60', 'fg.coverWalled', 'fm.towers' — V12 §3.4's catalogue
type MetricInput =
  | 'geo'     // computed on a MeasureInput (V12 §2.2): the same code on a reference, a corpus map and ours
  | 'model'   // only on our model: plots, prosperity, the generation report, the core statistics record (§13.2)
  | 'render'  // on a PNG: §8.2's measurement render (palette), the city band at the matched scale (recoverability, §8.5)
  | 'timing'  // §12.1's timing phase, normalised by the calibration score
  | 'trace'   // a stage's recorded trace at the bench level: S8's cut log (the bent-cut signature, §4.6), S10b's placement log
  | 'counts'  // integer counts a harness writes: Fantasy Manor's family and element counts (V02 §7.4), NG hood and VG village counts
type Unit = 'm'|'m2'|'ha'|'deg'|'share'|'count'|'perHa'|'perKm'|'ratio'|'bits'|'ms'|'s'|'luma'|'rb'|'chroma'|'z'|'none'
interface MetricDef {
  id: MetricId;
  version: string            // semver: major = the definition changed (values move; every baseline of it is re-measured, V12 §3.4.3), minor = a new field, patch = no value change
  input: MetricInput;
  scale: 'metric' | 'free';  // free: angles, shares, counts, ratios, rank statistics — valid on a relative-scale input; metric needs metres
  sign: 'positive' | 'any';  // how a band widens (V12 §3.5.2): multiplicatively for positive quantities, additively otherwise
  absFloor: number;          // the smallest band half-width, in the metric's unit (a zero-width reference spread never gives a zero-width band)
  requires: FeatureKind[];   // MeasureInput kinds read; a source lacking one yields 'notApplicable' for this metric, never 0
  stages: string[];          // the StageIds whose output it measures ('S8', 'S10', …): a tuning run may only move cells those stages read (V12 §3.7.2)
  output: { kind: 'scalar'; unit: Unit } | { kind: 'distribution'; unit: Unit; edges: number[] /* fixed bin edges */ } | { kind: 'vector'; unit: Unit; fields: string[] };
  perSeed: 'median' | 'mean' | 'share' | 'value' | 'sample';   // how one town's many values reduce; 'sample' keeps the distribution (KS rows)
  row: string;               // the §13.5 / §13.7 / volume row it serves, by its first cell ("street turning", "T-V2-31 family shares")
  tolerance: { abs?: number; rel?: number };   // two implementations of it agree within this (T-V12-3)
  costMs: number;            // budget per CITY town, single thread (V12 §6)
  sampling?: { label: string; n: number };     // a sampling metric's testkit stream label and sample count (R4's 1 500 buildings)
  plain: string }            // the release-note and dashboard sentence, with {ours}, {band}, {dir} slots — our own words
```

Metric code is pure: no clock, no global state; transcendental functions come from `dmath` (§17.4) and every sampling
metric draws from its testkit stream (V12 §3.13), so one `MeasureInput` gives bit-identical values on every host
(J-V12.9). Every field that decides a verdict — `sign`, `absFloor`, `output.edges`, `tolerance`, `costMs`, `stages` — is
filled for every catalogue row, explicitly where the row states it and otherwise by V12 §3.4.2's default rules; a row
whose field neither states nor defaults fails `plat build` (V12C-09).

**Two generated families** (reconciliation round 3, SCC-56; J-V12.65). Most register entries are confirmed by an owning
volume's bar, and a bar is no catalogue row; so the registry holds two families whose members `plat build` generates from
registrations, each member a full `MetricDef` filled as stated here:
* **`bar.<barId>`** — the verdict statistic of one registered owner bar, `<barId>` the owner's bar id verbatim
  (`bar.T-V6-8`, `bar.T-V2-32`, `bar.T16-4`, `bar.T110b.viaduct`; a sibling volume's "`bar.<id>`" is this family). It
  resolves to the registrations whose `id` or `ownerBar` equals `<barId>` — with several, its value is the vector of
  their statistics and its verdict passes only when each passes: a `StatBarSpec` (the value `StatBarResult.statistic`); a
  `NullModelSpec` (the statistic its pass rule tests — the share of towns with u > 0.5 on the rank route, the pooled p on
  the pooled route, the median margin on the `margin` route, the spec's own p in a `holm` family — while `siting.<spec>`
  stays the placement statistic itself, which a corpus row compares, so the two never name one quantity); or a
  `BenchBarDef` (below), which an owner registers for every bar its register lines name that no spec carries as its `id`
  or `ownerBar` (a second owner's epoch form of a bar-map row among them: V06's T-V6-37 beside V04's T-V4-45). `unit`,
  `stages` and `row` are the registration's; `input: 'model'`, `scale: 'free'`, `sign: 'any'`, `perSeed: 'value'`, a
  scalar output (a vector for a bar of several clauses); no band — the verdict is the bar's own pass rule, never V12 §3.5's; `costMs` 0, the value being read from the bar's own run. `plat parity` writes one row per registered bar
  of its tier (`metric` `bar.<barId>`, the statistic as ours, the bar's verdict, `baselineIds` empty), as it writes the
  `NullModelSpec` and `StatBarSpec` rows (V12 §1b). A `<barId>` with no registration does not exist, so the lint fails an
  entry naming it (V12 §3.11).
* **`frame.<table>.<column>`** — a declared sample frame's value for one calibratable column (`frame.roster.classes.perCapita`;
  the table id matched as the longest registered `TableId` prefix): the target rows (V12 §3.10.2) of the `geo` metrics
  that the corpus run touching that column's cells targets (V12 §3.10.5), each read in the frame's corpus variant, its
  report row the frame's A2 verdict for them under its pack (V12 §3.10.6). It is `notApplicable` before M-CAL (it is read at M-CAL and at each later corpus run `M-CAL/<layer>`, V12 §3.10.1; reconciliation round 4's continuation, SCC-R3C-1), on every
  source but a frame, and for a column no frame's run targets — whose `corpus` entry then closes `fixed` with "no
  admissible frame" (V12 §3.11). It exists for every calibratable column; a register line's `frame.*` names the members for
  that line's own columns.

```ts
type PresetArm = 'default' | PresetId   // the recipe a harness run generates its towns under (reconciliation round 2's continuation, SCC-R1C-5;
                                        // J-V12.72): 'default' — the recipe with no parity preset applied (V12 §3.5's O and C rows; an owner bar's
                                        // own towns); else a registered preset, PresetId (V11 §2.2: 'MFCG' | 'FTG' | 'VG' | 'FM' | 'NG'). Every `preset`
                                        // field of V12 §2's records is a PresetArm, except `CalibrationRun`'s `layer` and `CalibrationEntry.target`,
                                        // which name a preset ENTRY of a cell ('FM' | 'VG' | 'NG'; SCC-R3C-6), never an arm
interface BenchBarDef {   // @plat/testkit/bars — an owner's bar that is neither a NullModelSpec nor a StatBarSpec, registered in code by its owner
                          // once a register entry names it as `bar.<id>` (X-V12-15): the base's, V02's, V03's, V06's and V11's statistics-bench bars
  id: string;             // the owner's bar id verbatim: 'T-V6-8', 'T-V2-32', 'T16-4', 'T-V11-30'
  owner: 'base' | 'V01' | 'V02' | 'V03' | 'V04' | 'V05' | 'V06' | 'V07' | 'V08' | 'V09' | 'V10' | 'V11' | 'V12';
  statistic: { what: string /* the owner's plain words: 'the share of growth stages at which crowding precedes regrowth' */; unit: Unit };
  stages: string[];       // the StageIds (V06's phase ids for a history bar) whose output the statistic reads; V12 §3.7.2 (4) reads them
  towns: { family: string /* 'bcity', 'golden' or the owner's fixture family (V06's H-100) */; perSetting: number;
           settings: { rung: Rung; water: WaterSetting; preset: PresetArm /* 'default' for a bar's own towns (V6 §8, V2 §3.10.10, V11 §8) */ }[] };
  tier: 'pr' | 'nightly' | 'milestone';
  run(towns: { seed: string; doc: Document; bench: ReturnType<typeof stats> /* stats(doc, { level: 'bench' }), §13.2 */ }[]):
    { statistic: number | number[] /* one value per clause, in the owner's clause order, for a bar of several clauses */;
      verdict: 'pass' | 'fail' | 'notApplicable' } }   // pure: the owner's one implementation of its bar — no clock, no global state
```

### 2.2 `MeasureInput` — the neutral measurement profile

```ts
type ReferenceId = 'MFCG' | 'FTG' | 'NG' | 'VG' | 'FM'   // Dwellings stays a research-side note (V03 §7), never a source here
type FeatureKind = 'way'|'block'|'plot'|'building'|'wall'|'tower'|'gate'|'castle'|'square'|'district'|'water'|'river'|'pier'|'green'|'field'|'tree'
  | 'closure'|'enclosure'   // item 106: a natural edge closing a circuit (LineString); the enclosed area (Polygon)
  | 'gallery'|'chamber'     // the underground profile only (layer 'underground'): a system's passages (LineString with widthM) and rooms (Polygon)
  | 'retaining'             // item 110 (a): a retaining wall (LineString), never a `wall`
  | 'raisedSupport'         // item 110 (b): a raised way's pier or abutment footprint (Polygon), never a `building`
  | 'span'                  // item 110 (b): a raised way's span between two supports (Polygon; file f item 447); read by no metric
                            // an aqueduct has no kind of its own: it is a `way` of class 'aqueduct', raisedKind 'aqueduct' where raised (file f item 447)
interface MeasureInput {   // one per town or map: §11.1's metric GeoJSON variant with this header in its sidecar
  header: {
    source: 'PLAT' | ReferenceId | 'corpus';
    build: string;                    // our output version; a reference build (§13.5's `referenceBuild`); the corpus adapter's version
    scale: 'metric' | 'relative';     // relative: no metric scale known (NG's vertex captures; a corpus plate without a scale bar)
    unitM?: number;                   // metres per input unit when metric and ≠ 1
    centre: [number, number];         // the settlement centre in input units (the plaza, else the wall ring's centroid, else the building centroid)
    rung?: Rung; population?: number; water?: WaterSetting;
    seedLabel?: string;               // the seed family path that made it (V12 §2.4) — never a place name
    layer?: 'surface' | 'underground'; // absent = surface; underground inputs exist only for our towns (below)
    frame?: string;                   // corpus: the sample frame (V12 §2.9)
    options?: Record<string, number | boolean> };   // a reference's generation options, numbers and flags only
  features: MeasureFeature[] }
interface MeasureFeature {
  kind: FeatureKind; id: string /* opaque, file-local */; geometry: Geometry /* GeoJSON geometry in input units; rings are closed on read */;
  props: {
    class?: string;       // closed vocabularies: way 'arterial'|'street'|'lane'|'alley'|'track'|'aqueduct'|'unknown' ('aqueduct': file f item 447's
                          // channel, read by no way graph, V12 §3.4.2); wall 'curtain'|'castle';
                          // water 'sea'|'river'|'lake'; square 'plaza'|'market'|'other'; building: a class family key of V11 §3.4 or 'unknown';
                          // gate 'land'|'water'; closure J-VI.3's six barrier kinds 'shore'|'cliff'|'gorge'|'marsh'|'sheer'|'enceinte'
                          // (file f item 447); gallery and chamber: the system's
                          // `UndergroundSystem.kind` (§2.7, with item 109's 'ruin'), a cavern's fissure variant as 'cavern'
    state?: string;       // gallery and chamber: the part's closure state (§2.7's states) or 'unexcavated' (item 109 (j) (2)); a decayed ruin part keeps its state
    widthM?: number; storeys?: number; heightM?: number;
    district?: string;    // the id of the district feature it lies in
    use?: string;         // a class family key, for the siting statistics (V12 §3.6); a corpus map's trades mapped research-side
    prosperity?: number;  // PLAT only: the field's value at the feature (§4.5), 3 decimals
    part?: number;        // ways (item 110 (b)): 0 the ground, ≥ 1 a raised arena part (§3.4); absent reads 0
    raisedKind?: 'viaduct' | 'elevated' | 'aqueduct';     // a raised way's LineString only (file f item 447; its supports and spans carry none)
    source?: 'generated' | 'declared';                    // raised ways: derived at read (file f item 244, ST-06) — declared by T4 or a
                                                          // skeleton file, else generated; the dossier declares no arches (V06, C6-47)
    reason?: 'drop' | 'link' | 'water';                   // a generated raised way's recorded reason (item 110 (b))
    onDeck?: 'mole' | 'pier' | 'quay' | 'bridge';         // plots and buildings standing on a deck face (item 110 (d))
    stair?: boolean; ramp?: boolean;                      // way segments that cross a retaining wall, and a raised way's ends
    stepMinCm?: number; stepMaxCm?: number } }            // retaining walls: the least and the greatest step along the whole wall, over its
                                                          // exported runs (file f item 447; merged on read, below)
```

**Our way classes in the profile.** `measureInputOf` maps §2's `WayClass` once: `through` and `primary` → `arterial`;
`secondary` → `street`; `lane` and `cul_de_sac` → `lane`; `alley` → `alley`; `track` and `path` → `track`; `bridge` and `ford`
take the class of the way they carry; `quay` and `pier` are not ways for these metrics (`pier` features stay); `aqueduct`
stays `aqueduct`, mapped into no traffic class, so an aqueduct's channel enters no way graph and no way-distance statistic
(V12 §3.4.2's reading rules; file f item 447 exports it as its way's LineString). A reference
adapter maps its own classes (V12 §3.2.2); a class it cannot map is `unknown`, which no class-specific metric reads.

`MeasureInput` carries no name, no label text, no colour and no style: a reference's district names, a corpus map's place
names and every drawn word stay research-side (J-V12.2). For our towns `measureInputOf(doc, opts)` builds it from the
model in memory; T-V12-4 holds it equal to the metric GeoJSON export read back — `use`, `district` and `prosperity` included,
which the metric variant carries (BCR-V12-15), and item 110's kinds and properties (BCR-V12-17, applied as file f item
447's one text, IN-V12-4). **One reading rule** keeps that equality exact: the profile declares a subset of item 447's
properties, and the reader drops every exported property the profile does not declare — `deckMinCm`, `deckMaxCm` and
`underuseSince` on a raised way; `way`, `key` and `state` on a support; `use` and `state` on a span (item 244's span use is
no class family key); `wall`, `run`, `highSide`, `material` and `state` on a retaining wall; `condition` on a wall (file f
item 575); `deck` and `tiers` on a plot or building —
so the model-side builder never writes them and no `geo` metric reads them (the `raised.*`, `retaining.*` and `tier.*`
metrics that need them are `model` metrics and read the records).

**Runs merged on read** (reconciliation round 3, SCC-61; J-V12.68). File f item 447 exports a retaining wall as one
LineString per run of equal state, and item 575 splits §11.1's wall LineStrings per run of equal condition. The reader
merges them back before any metric runs: the `retaining` features carrying one `wall` id become one feature, their runs
joined in `run` order (a closed wall's ring closed), with `stepMinCm` and `stepMaxCm` the least and the greatest over its
runs; the `wall` features carrying one enceinte's `id` (§11.1's `id`, the entity's address — a run has none of its own, a
`StretchRef` being never stored, item 575) that join end to end become one feature per **built stretch**, a maximal part of
the trace between closure edges, in trace order; each merged feature keeps its entity's `id`. `wall`, `run`, `state` and
`condition` are then dropped by the rule
above: a condition or a state is no measurement input, so a breached, dismantled or landfall-buried stretch measures as the
built stretch it is part of, and a run boundary is never a stretch end. `measureInputOf` writes the same — one `retaining`
feature per retaining wall, one `wall` feature per built stretch, whatever their states and conditions — so T-V12-4's
equality holds on a town whose walls a decline, a landfall or a hand edit has struck.

**Item 110's entities (V12C-40; file f item 447; J-V12.62).** A raised way's ways carry `part` ≥ 1 with `raisedKind`, `source` and
`reason`; an aqueduct is its way — a `way` LineString of class `aqueduct` with `raisedKind: 'aqueduct'`, never a kind of its
own; a raised way's supports are `raisedSupport` polygons and its spans `span` polygons; a retaining wall is one `retaining`
line (its exported runs merged on read, below) with `stepMinCm` and `stepMaxCm`; the way segments crossing one carry `stair` or `ramp`; deck buildings are `building`
features with `onDeck`; a stepped building's `heightM` is the top of its stack (V02's heights envelope). No founding rung
rides in the profile: `raised.generatedBelowCity` is a `model` metric and reads the founding epoch's record (V12 §3.4.2;
file f item 244 stores none, ST-06). The reading rules that keep every existing metric exact are V12 §3.4.2's preamble.

**The enclosure (item 106).** A wall metric reads the outermost *enclosure*: the `enclosure` polygon where the source gives
one — ours from the export of an enceinte closed by `ring`, `shore` or `barrier` (BCR-V12-15), a corpus plan's drawn
circuit — else the outermost `wall` ring of class `curtain`. `wall` features are the built stretches only, one feature per
built stretch after the merge of item 575's condition runs (above); `closure`
features are the natural edges that close the circuit (item 106 (a)) and are never counted as wall length, as tower
stretches or as gates. The MFCG adapter splits its exported city ring the same way (V12 §3.2.2), so a shore-closed
MFCG city and a cliff-closed town of ours are measured by one rule.

**The underground profile (item 109).** `undergroundInputOf(doc, systemId)` writes one underground system of our model —
its galleries as `gallery` LineStrings with their widths, its chambers as `chamber` Polygons, each with its system kind
and state, every part in every state (a ruin's collapsed and filled parts included, so its plan is measured as laid) —
in `MeasureInput` form with `header.layer: 'underground'`, the flag `options.sharedAxis` when a ruin took item 109 (c)'s
shared-axis chance, and `header.centre` at the system's centroid. The same geometry code that measures a town then
measures a ruin's plan or a cavern. It exists only for our towns — no reference and no corpus plate has an underground —
and never crosses the firewall. **A chamber's monument is not a chamber** (V04's `Chamber.monument`, item 110 (c)): its
tiers are written as `building` features of the underground layer with `props.class` the monument's row, and no plan
metric (`plan.*`, `ruin.blockArea`, `grid.*`) reads a `building` of that layer (T-V12-33).

### 2.3 The baselines file

```ts
interface BaselinesFile {   // plat/packages/testkit/baselines/baselines.json — the one file the parity CLI reads (§13.5)
  schema: 'plat.baselines/2';
  metricsVersion: string;     // the metrics.json version its rows were computed with
  pins: ReferencePin[];       // the gating build per reference (V12 §3.8)
  rows: Baseline[];           // §13.5's rows with BCR-V12-1's fields; append-only: a row is superseded, never deleted
  crossings: CrossingRecord[] }
interface ReferencePin { reference: ReferenceId; build: string; since: string /* milestone */ }
interface CrossingRecord {  // one per commit that changes the file (V12 §3.3)
  date: string; seat: string; checker: string; added: string[]; superseded: string[];
  checks: { id: 'C1'|'C2'|'C3'|'C4'|'C5'|'C6'|'C7'|'C8'|'C9'|'C10'; pass: true }[]; scanVersion: string; fileHash: Hash128 }
// §13.5's Baseline gains (BCR-V12-1):
//   reference: ReferenceId | `corpus:frame:${string}` | `corpus:map:${string}` /* 'FM' added; corpus ids salted, V12 §3.10.2 */
//   metricVersion: string; supersedes?: string
//   sample: { family: string /* 'capture/MFCG/40/plain' */; indices?: [0, number] /* always from 0: no cherry-picking */; captures?: string[] /* unseeded references, capture order */;
//             failed?: { index: number; reason: string }[] /* plan indices that could not be captured after V12 §3.12's retries — listed, never silently skipped */ }
//   estimator: 'single' | 'minmax' | 'type7'      /* how p10 and p90 were formed, V12 §3.5.1 */
//   spreadKS?: { p90: number; pairs: number }     /* distribution rows: the reference's own seed-to-seed KS */
//   scale: 'metric' | 'free'; evidence?: EvidenceClass; frameN?: number   /* corpus rows only */
```

`ftg-captures.json`, `ng-counts.json` and every panel file of §13.6 (9) cross by the same check (V12 §3.3); a
volume's reference counts (V02's Fantasy Manor counts, V07's VG counts) are ordinary `Baseline` rows of input `counts`.

### 2.4 Seed families

```ts
interface SeedFamily { label: string; reduce: 'u32' | 'parkMiller' /* 1 + (H32 mod 2 147 483 646): the MINSTD state range, §13.6 (2) */;
  priority: 0|1|2|3|4|5 /* gate 0 · golden 1 · bench 2 · capture 3 · tune 4 · null and sweep 5 */ }
// seedOf(family, path) = reduce(H32(label + '/' + path.join('/'))); if the seed equals a seed in the COLLISION DOMAIN, the path
// gains '/r1', '/r2', … until it does not (J-V12.4). The domain of a family is every higher-priority family's FULL declared
// count — bref 100, golden 12, known 1 per fixture, bcity 1 000 per setting — compared per (rung, water) where the path
// carries them and globally where it does not (sweep, known); capture families are excluded (they seed a reference, not
// us). It never depends on what a tier has drawn (V12C-25). §13.6's own formulas are unchanged.
```

| family label (+ path) | reduce | priority | count per setting | consumer | check vector (V12 §12) |
|---|---|---|---|---|---|
| `bref/<ref>/<rung>/<water>/<i>` | u32 | 0 | nightly 20 · milestone 100 | our side of every parity row (V12 §3.5) | `bref/MFCG/TOWN/none/0` → 1738244370 |
| `golden/<rung>/<water>/<i>` | u32 | 1 | 12 | the golden suite (§13.3; BCR-V12-7) | `golden/CITY/river/11` → 639553850 |
| `known/<id>` | u32 | 1 | 1 per fixture | the known-city fixtures (V12 §3.14) | `known/K1` → 3403473561; `known/K2` → 3205843448 |
| `bcity/<rung>/<water>/<i>` | u32 | 2 | 1 000 (B-CITY-lite: i < 50) | B-CITY (§13.2; BCR-V12-7) | `bcity/TOWN/none/0` → 104466889 |
| `capture/<ref>/<size or template>/<options>/<i>` | parkMiller (MFCG, NG, VG); u32 otherwise | 3 | MFCG 10 per matched size; NG 5 per template; VG per V07 | the capture plan (V12 §3.2) | `capture/MFCG/40/plain/0` → 2003595629 |
| `tune/<run>/train/<rung>/<water>/<i>` and `…/holdout/…`; `…/guard/TOWN/<water>/<i>` (the TOWN guard of a run touching raised-way rows, V12 §3.7.4) | u32 | 4 | 30 each | tuning and corpus runs (V12 §3.7) | `tune/2026-09-28-example/train/CITY/none/0` → 1236353098; `tune/2026-09-28-example/guard/TOWN/none/0` → 2478365614 |
| `null/<spec>/<rung>/<water>/<i>`; the confirmation family `null/<spec>/<rung>/<water>/c1/<i>` (V12 §3.6) | u32 | 5 | 50; c1: 100 | the correlation harness (V12 §3.6) and the pooled bars of V12 §3.6b on settings B-CITY lacks (fixture sites, custom-chain fixtures) | `null/T71-3/CITY/none/0` → 1233256533; `null/T71-3/CITY/none/c1/0` → 338389334; `null/T110b.viaduct/CITY/none/0` → 4261915227 |
| `sweep/<spec>/<level>/<i>`; for an `exactMonotone` bar `sweep/<spec>/any/<i>` (one seed shared by every level and step) | u32 | 5 | per rule (V12 §3.6b) | the sweep bars (V12 §3.6b) | `sweep/T109-a.relief/mountainous/0` → 4027728537; `sweep/T109-j5.access/TOWN/0` → 649597841; `sweep/T109k6.extent/any/0` → 1148414874; `sweep/T110b.elevated.prosperity/w0.1/0` → 4196945930 |
| `d5…` (§13.6 (2)), `d5-fm/<panel>/<i>`, `d5-vg/<panel>/<rung>/<tags>/<i>`, `d5/M-CAL/<rung>/<water>/<i>` (a later run's `d5/M-CAL/<layer>/<rung>/<water>/<i>`, V12 §3.10.1) | as §13.6 | — | per panel | panels (V12 §3.9) | `d5/M-CAL/TOWN/none/0` → 1899492655 |

A family is prefix-stable (the first n seeds never change when a tier draws more), so B-CITY-lite is B-CITY's prefix
and the nightly's `bref` seeds are the milestone's first twenty. The pooled siting bars that V11 states on "≥ 200 B-CITY
seeds per rung" read B-CITY's nightly towns — generated each night anyway (§13.8) — and pay only for their permutations
(J-V12.40); `null/…` families remain for the settings B-CITY lacks. The new check vectors are
`docs/validation/bench/v12_rev_h32.out` (the script `v12_h32_vectors.py`, whose SMHasher value and the base's `d5` vectors
reproduce).

### 2.5 Calibration runs (tuning against a reference, a threshold fallback, or the corpus)

```ts
type CellRef = { table: TableId; rowKey: string; column: string; band?: string /* the band row of a band-keyed cell (§4.5) */ }
interface CalibrationRun {   // §13.9's record generalised (BCR-V12-3); plat/calibration/runs/<id>.json
  id: string;                          // 'cal/<milestone>/<slug>/<n>', fixed before the run (it salts the train and holdout families)
  kind: 'reference' | 'fallback' | 'corpus';
  source: { reference: ReferenceId; build: string } | { fallback: string /* register entry id */ }
        | { corpus: { adapter: string; version: string; frames: string[]; maps: number } };
  cells: { ref: CellRef; lo: number; hi: number; step: number; from: number;   // lo, hi inside the column's range and at or above an owner-stamped calibration minimum (V12 §3.7.2 (5))
    layer: 'inPlace' | { pack: string } /* 'historical:<frame>': every corpus change, V12 §3.10.3 R1; BCR-V12-22 */
         | { preset: 'FM' | 'VG' | 'NG' } /* the cell's presets.FM, presets.VG or presets.NG entry, one a register entry names: a 'reference' run against that preset's own
                                      reference, or a 'fallback' run applying that entry's own pre-decided fallback — V12 §3.7.2 (3); J-V12.63, J-V12.67 */ }[];
  objective: { targets: { metric: MetricId; rung: Rung | 'building' | 'hood' | 'village'; preset: PresetArm; baselineIds: string[]; weight: number }[];
               guards: GuardSet };
  search: SearchSpec;
  seeds: { perSetting: 30; settings: { rung: Rung; water: WaterSetting; population: number; preset: PresetArm }[] };   // families tune/<id>/train and tune/<id>/holdout
  budgetCpuH: number;                  // default 2; hard stop
  evaluations: { values: number[]; score: number; guardFlips: string[]; report: Hash128 }[];   // every candidate, in evaluation order
  chosen: number[] | null;
  holdout: ParityReport | null;
  status: 'accepted' | 'rejected' | 'fallback-applied' | 'aborted-budget' | 'refused';
  refusal?: { cell: CellRef; rule: string };   // V12 §3.7.2, §3.10.3
  changes: { ref: CellRef; from: unknown; to: unknown; evidence: string[] }[];   // §13.9's field; evidence = baseline ids + this run's id
  before: ParityReport; after: ParityReport | null /* the gate seeds, from the nightly after the release */;
  shifts: string[];                    // ShiftRecord ids with cause { kind: 'calibration', ref: id }
  date: string; seat: string }
type SearchSpec =
  | { kind: 'grid'; values: number[][] /* ≤ 16 candidates */ }
  | { kind: 'golden'; maxIter: number /* one cell; ≤ 12 */ }
  | { kind: 'coordinate'; rounds: number /* ≤ 3 */; maxIterPerCell: number /* ≤ 8 */ /* ≤ 4 cells */ }
interface GuardSet { parityRows: 'allPassing'; cBars: true; ownerRuleBars: true; frozen: string[] /* register entries that must not move */;
  fixtureSuites: ('B-DOSSIER-lite' | 'ownerRuleHooks' | 'K1' | 'K2')[];   // run once on the chosen candidate before the holdout decision (V12 §3.7.5)
  townGuard: boolean }   // true when any cell is a raised-way row: 30 TOWN towns on tune/<id>/guard/TOWN/… join the guard evaluation (V12 §3.7.4)
```

### 2.6 The calibration register

```ts
interface CalibrationEntry {   // plat/calibration/register.json — one per provisional number of the design
  id: string;                  // 'cal.<table>.<rowKey>.<column>' | 'thr.<letter>' | 'band.<metric>.<rung>'; a preset entry's entry adds '@FM', '@VG' or '@NG'
  target: { cell: CellRef; preset?: 'FM' | 'VG' | 'NG' } | { threshold: string /* a §13.7 letter */ } | { band: { metric: MetricId; rung: string } }
        | { column: { table: TableId; column: string; rows?: string /* a row-key glob; absent = every row */; preset?: 'FM' | 'VG' | 'NG' } };
                               // column: one entry for a column family (V12 §3.11); preset: the entry is that preset's entry of the cell or column (a measured-rate
                               // cell awaiting its reference run), never its default — V12 §3.7.2 (3); reconciliation round 3, SCC-60; 'NG' follows
                               // V11's PresetId (round 4's continuation, SCC-R3C-6): volume 1 holds no provisional NG entry (V1-3.15, J-V1.98), so no
                               // '…@NG' id exists until a volume states one
  owner: 'base' | 'V01' | 'V02' | 'V03' | 'V04' | 'V05' | 'V06' | 'V07' | 'V08' | 'V09' | 'V10' | 'V11' | 'V12';
  metric: MetricId[];          // what measures it — one or more (a line naming several writes them all): catalogue ids (V12 §3.4.2) or members of
                               // the families `siting.<spec>`, `bar.<barId>` and `frame.<table>.<column>` (V12 §2.1; reconciliation round 3, SCC-56)
  method: 'measure' | 'tune' | 'panel' | 'corpus';
                               // 'measure' — confirmed by the metrics it names at its due milestone's exit (V12 §3.11's milestone exits);
                               // 'tune' — set by a `reference` run against the entry's own reference when it falls due (V12 §3.7.1 (c): item 34's
                               // cells at M0, V02 §3.10.8's `FM` entries at M6c, V07's `rules.race.densityPower@VG` at V-M4), the accepted run's
                               // value its confirmation and a rejected run applying the entry's fallback (V12 §3.7.5); where the owning volume
                               // states it (V07 §3.15), the run opens only when the entry's metric misses its band at the due milestone, the entry
                               // otherwise confirmed at its value with a history row and no run; 'panel' — a rated pass of its panel (below);
                               // 'corpus' — the corpus stage at M-CAL (V12 §3.10), or at the later corpus run `M-CAL/<layer>` that takes a column
                               // first landed after M-CAL's record (V12 §3.10.1); reconciliation round 4, SCC-82; its continuation, SCC-R3C-1
  due: string;                 // the milestone that confirms it; a corpus due is a `CorpusRunId` (V12 §2.9): 'M-CAL', or 'M-CAL/<layer>' by V12 §3.11's
                               // *The due's corpus run* (reconciliation round 4's continuation, SCC-R3C-1)
  fallback: { mechanism: string /* one sentence: what moves, from the owning section */; notAchieved: boolean /* moving the threshold itself = not achieved, §13.7 */ };
  status: 'provisional' | 'confirmed' | 'fallback-applied' | 'not-achieved' | 'owner-set' | 'fixed';
  line?: 'default';            // present only on an entry V12 §3.11's default line wrote (`plat calibrate register --defaults`): the lint holds its
                               // method, due, metric and fallback to that line's, and a later named line for its column restates it in place,
                               // dropping the field (reconciliation round 2's continuation, SCC-R1C-2); absent = a named line's entry
  panel?: { id: string; group?: string /* a SOLO group inside the sitting: 'M4-110' */; question: 'legibility' | 'realism' | 'charm' | 'reads' };   // method 'panel' only (a staged entry's: its current stage's)
  stages?: { method: 'measure' | 'tune' | 'panel' | 'corpus'; due: string;   // a line of several stages, in the line's order (V12 §3.11's *Staged entries*)
             panel?: { id: string; group?: string; question: 'legibility' | 'realism' | 'charm' | 'reads' };   // a `panel` stage's panel
             metric?: MetricId[];   // the members of `metric` this stage reads; absent: every member but the `frame.*` ones at a non-`corpus` stage,
                                    // the `frame.*` members at a `corpus` stage
             possibility?: true     // a `corpus` stage read as E1's reachability rows and E4's checks only (V12 §3.10.4), never a frame run's value target
           }[];                     // written only when the line names more than one stage; absent: one stage, the entry's own method, due and panel. On a
                                    // staged entry `method`, `due` and `panel` above hold the current stage's — the first with no passing row, the first at
                                    // writing, and once the entry leaves `provisional` the stage it confirmed or closed at; reconciliation round 6, SCC-105
  history: { date: string; value: unknown; run?: string; panel?: string; milestone?: string; cells?: true;
             stage?: { index: number /* into `stages` */; outcome: 'pass' | 'fail' | 'unrated' };   // a staged entry's exit or sitting row (round 6, SCC-105)
             held?: true }[] }      // a held row, value null: the owning seat's tuning its change's golden check refused (V12 §3.11's *A value moved by its
                                    // owning seat before its due* (1), `plat calibrate register --hold`; round 6, SCC-102)
                               // cells: true marks a cells row, whose value is the target's compiled cells by row key: `--defaults`' first row, a named
                               // entry's first row (its writing seat writes it with the target's compiled cells — a preset entry's excepted; round 6,
                               // SCC-98), the moved-value and rows-added rows (V12 §3.11's *A value moved by its owning seat before its due* (2), (2′);
                               // round 6, SCC-103), a later line's restating row, a pick's row whose release moves the target's cells in place (V12 §3.9: the next table version, a declared shift) — its value the released cells by row key (seam SCC-112),
                               // and a run's row where the run changed the target in place (V12 §3.7.6 step 5: the cells after the run); absent on
                               // a metrics row (a milestone exit's readings, a corpus run's `frame.*` reading), a panel's row, a pick's row that moves no cell, a held or a status
                               // row, and on a pack or preset run's row (its cells are not the column's compiled cells); reconciliation round 5, SCC-90
```

One knob has one entry and one column: the register check fails when two entries, or two compiled columns, name one
mechanism under different names (a cell's default and its `FM`, `VG` or `NG` entry are two knobs, told apart by `preset`) (the J111 fold found two names each for the crypt join and the growth cap; the columns
kept are V04's `CatacombRule.cryptJoin` and `CatacombRule.growthCapShare`, read per year over the span, V06's J-V6.53).

A `panel` entry is confirmed by a rated pass of its panel on the question it names. While that panel is unrated the entry
stays `provisional` and its exit row reads *provisional — not rated*: it never fails an exit and never lets its gate be
claimed (§13.6 (7)'s rule, carried into the register).

### 2.7 The correlation harness

```ts
type ClassSelector = { classes?: string[]; families?: string[]; tags?: string[] }   // V11 §2.3's keys
type StatSpec =
  | { kind: 'meanDistTo'; to: ClassSelector | 'market' | 'gate' | 'quay' | 'water' | 'wall'; agg?: 'mean' | 'median' }   // metres along the way graph; 'median' where the owner states it (T-V11-12)
  | { kind: 'shareWithin'; to: ClassSelector | 'market' | 'gate' | 'quay'; radiusM: number }     // member-on-indicator share: the pooled route
  | { kind: 'servedShare'; unit?: 'coverage' | 'district' }   // the share of the subject class's coverage units holding ≥ 1 member, each unit as
                                                       // V11 §2.3 defines it at a plot (V12 §3.6); 'coverage' (the default) reads the class's
                                                       // compiled profile.coverage, 'district' forces districts of ≥ 30 households (item 105 (k)'s
                                                       // dispersal row); one class per spec; null scope 'town' only
  | { kind: 'nnSameKind' }                             // median nearest same-class distance; null scope 'town' only
  | { kind: 'downstreamShare' } | { kind: 'downwindShare' }   // share of members downstream / downwind of the median household: the pooled route
  | { kind: 'prestigeShare' }                          // share on prime frontages (item 71's definition, T71-3): the pooled route
  | { kind: 'flowOrder'; chain: string }               // share of chains whose resource lies farther from the market than the seller (item 104 (h) (8))
  | { kind: 'chainSpread'; chain?: string }            // item 104 (g): the mean way distance between a chain instance's in-town nodes
  | { kind: 'meanDistToPartners'; role: 'dominantOutputConsumers' | 'providers' | 'inputs' | 'demand' }   // item 105 (k)
type NullPass =
  | { kind: 'rank'; townShare: number /* 0.70 */; medianU: number /* 0.60 */ }                // the default for every statistic but the pooled ones
  | { kind: 'pooledExact'; alpha: number /* 0.01 */; minShift?: number /* a share the pooled observed must also exceed the null mean by */ }   // shareWithin, downstreamShare, downwindShare, prestigeShare
  | { kind: 'margin'; value: number /* median over towns of S_obs − mean S_k, in the statistic's unit: T71-3's 0.15 */ }
  | { kind: 'holm'; family: string; alpha: number /* 0.01 */ }   // an owning volume's clauses Holm-corrected together (V11's T-V11-12): each spec's p is its rank or pooled p
interface NullModelSpec {
  id: string;                                          // the bar id: 'T71-3', 'T103-e.tannery-downstream', 'T105-k.shared-provider' …
  owner: 'base' | 'V01' | 'V02' | 'V03' | 'V04' | 'V05' | 'V06' | 'V07' | 'V08' | 'V09' | 'V10' | 'V11' | 'V12';
  ownerBar?: string;                                   // the owning volume's bar id when it states the rule ('T-V11-12'); its statement wins (J-V12.48)
  subject: ClassSelector; statistic: StatSpec;
  null: { scope: 'block' | 'district' | 'town'; eligible: 'hardNeeds' | 'sameSizeClass' | 'anyPlot'; permutations: number /* K = 20 */ };
  expect: 'lower' | 'higher';
  pass: NullPass;                                      // default: 'pooledExact' for the member-on-plot shares, 'rank' otherwise (J-V12.12)
  towns: { source: 'bcity'; perRung: number /* 200 when the owner says so, else 50 */ } | { source: 'null'; perSetting: number /* 50 */ };
  seeds: { settings: { rung: Rung; water: WaterSetting; preset: PresetArm }[] };
  applies: { requires?: ('river' | 'coast' | 'walls' | 'customChain' | 'islands')[]; minMembers: number /* default 1 on the pooled route, 3 on the rank route */ };
  variant?: { distance: 'way' | 'euclid'; eligible: 'hardNeeds' | 'anyPlot'; subjects: 'plots' | 'buildingsWithUse' } }   // corpus comparisons only (V12 §3.10.5)
interface NullModelResult { spec: string; setting: string; towns: number; skipped: number;
  share: number /* towns with u > 0.5 */; medianU: number; pooled?: { observed: number; nullMean: number; p: number };
  verdict: 'pass' | 'suspect' | 'fail' | 'insufficient';   // 'suspect': run 1 failed and the confirmation is pending or passed (V12 §3.6)
  confirmation?: { family: string; towns: number; pass: boolean };
  perSeed: { seed: string; obs: number; nullMean: number; lt: number; eq: number; u: number }[] }
```

Registration refuses: a `servedShare` or `nnSameKind` spec at a scope other than `town` (a district or block permutation
conserves them exactly); a `servedShare` spec whose subject is not exactly one class (a "per coverage class" bar registers
one spec per class, id `<bar>.<class>`), whose class has no coverage row under `unit: 'coverage'`, or whose class's unit is
`settlement` (the town holds a member or not, and a permutation conserves it: that class's coverage is T-V11-13's roster
clause, reported `notApplicable` in the bar); a pooled-route spec whose pooled null share over its first 50 towns exceeds 0.85 (below 0.02 for
`expect: 'lower'`) — the headroom lint: at that base share no rule can see a pull (executed: power ≤ 0.09 at a 0.3 pull,
`critique_v12_pooled_exact.out`), so the owner restates the indicator (a tighter radius) or states its complement.

### 2.7b Share, sweep, paired and two-sample bars

The other shapes a tendency bar takes in file g — "in most placements", "at or above the floor", "at the ranked share",
"at every rung", "rises with", "higher with than without", "rising monotonically", "differ from", "beat the baseline",
"within tolerance of the base's" — each get one typed rule, run by `plat statbar` (V12 §3.6b).

```ts
type Indicator =                                          // one yes / no per instance, read from the bench statistics and the explain query's link list
  | { kind: 'flowOrder' }                                 // item 104 (h) (8): a chain instance's resource node farther from the principal market than its final seller
  | { kind: 'withinComfort' }                             // items 104 (h) (8), 107 (g): a consumer–provider link's way distance ≤ its good's comfortM
  | { kind: 'voidAccessible' }                            // item 109 (j) (3), (3b): a cavern or ruin system with an access point, direct or through linked systems
  | { kind: 'voidSealedDeep' }                            // item 109 (j) (5): per DEEP VOID — a connected component of a cavern or ruin system's parts whose
                                                          // tops lie deeper than DigRule.reachM below every footprint over them — sealed when no access reaches it
  | { kind: 'ruinChosen' }                                // item 109 (i): an undercity whose first void source is a ruin, among undercities where a ruin and a cavern both qualify
  | { kind: 'present'; system: 'cavern' | 'ruin' }        // item 109 (a), (j) (1): the settlement's site holds at least one such system
  | { kind: 'raised'; raisedKind: 'viaduct' | 'elevated' | 'aqueduct'; source: 'generated' }   // item 110 (b): the town holds ≥ 1 such generated way
type Quantity = 'ladder.members' | 'catacomb.extentM2' | 'catacomb.fill' | 'catacomb.growthM2'   // V12 §3.4.2's model metrics, per record
type Step = 'epoch' | 'regenerate' | { rederive: StageId } | { newRandom: 'system' } | 'upgradeReplay' | { dossierEvent: string } | 'extendGrowth'
interface Level { id: string /* 'mountainous', 'TOWN', 'x1.5', 'w0.9' */; rung: Rung; water: WaterSetting; preset: PresetArm;
  site?: Record<string, string | number | boolean>;       // a fixture site override: relief class, geology, mining, a ravine across the frame, a forced ruin or cavern source
  dossier?: string;                                       // a fixture id of the frozen manifest (V12 §1b's dossier table), a derived one '<dossier>@pop×k' included
  intent?: { wealthLevel?: number };                      // a T1 `intend` input (§7.7): the settlement-level prosperity of item 110 (b)'s trend
  populationScale?: number; epochs?: number;              // a population sweep's factor; a growth history's epochs (V06's engine, once it lands)
  requires?: string }                                     // the volume whose generator the level needs ('V07'): notApplicable until it has landed
type Rule =
  | { kind: 'most'; indicator: Indicator; share: number /* 2/3; an owner's 0.70, 0.75, 0.80 */; minEffective: number /* 100 effective instances */; minTowns: number /* 20 */;
      townClause: { minInstances: number /* 3 */; share: number /* 0.70 of those towns at ≥ 1/2 */ } }
  | { kind: 'floor'; indicator: Indicator; floor: number | CellRef; alpha: number /* 0.01, one-sided */; minEffective: number /* 100 */; minTowns: number /* 20 */; perTownCap: number /* 3 */ }
  | { kind: 'rate'; indicator: Indicator; value: number | CellRef | { derived: 'ruinShare' | 'cavernChance' };
      tolerance: { kind: 'exact'; alpha: number /* 0.01, two-sided */ } | { kind: 'se'; k: number /* V04's 3 */ }; minInstances: number /* 200 */ }
  | { kind: 'presence'; indicator: Indicator; chance: number | CellRef | { derived: 'cavernChance' } /* the design chance per town at each level */ }
  | { kind: 'trend'; indicator: Indicator; perLevel: number; bins?: { by: 'buildingsOver'; edges: number[] /* [0, 1, 3, 6, 11, 21] */; minPerBin: number /* 20 */ } }
  | { kind: 'higherWith'; indicator: Indicator; factor: { key: string; with: string | number | boolean; without: string | number | boolean }; perCell: number /* 200 */ }
  | { kind: 'exactMonotone'; quantity: Quantity; where?: 'stagnant' /* fill: only across steps where the record's blockedBy is non-empty and its extent held */;
      identity: 'record' /* compared per record key: a CatacombComplex's id (its source lineage), a ladder record's id; a record present at a step is present at the next */;
      sequence: { kind: 'levels' } | { kind: 'steps'; script: Step[] /* author edits never appear in a script */ }; fixtures: string[] }
  | { kind: 'exactBound'; quantity: 'catacomb.growthM2'; bound: 'cap' /* per record and step: ≤ max(extent × ((1 + growthCapShare)^years − 1), growthFloorM2) */; fixtures: string[] }
  | { kind: 'paired'; measures: PairedMeasure[]; eachShare: number /* 0.70 */; minDiffering: number /* 2 */; minSeeds: number /* 50 */ }
  | { kind: 'twoSample'; a: 'ruin'; b: 'cavern'; metrics: MetricId[]; expect: 'higher'; minEach: number /* 30 systems */ }
  | { kind: 'noRegression'; statistic: StatSpec; subject: ClassSelector; off: { ref: CellRef; value: unknown }[] /* the reference arm's overlay: the owning volume's named off form, each cell at its in-range off value (105 (k): V11 §3.7.4's web off form; V11's round 2, SCC-34) */; tolerance: number | CellRef }
interface PairedMeasure {   // a ruin's laid plan (a) against the town above within its outline (b), per seed
  metric: 'ruin.blockArea' | 'grid.r4' | 'grid.axis';
  differs: { kind: 'logRatio'; atLeast: number /* ln 1.5 */ } | { kind: 'absDiff'; atLeast: number /* 0.15 */ } | { kind: 'axisDeg'; atLeast: number /* 10 */; skipWhen: 'sharedAxis' } }
interface StatBarSpec {
  id: string;                    // the bar id as §13.2 or the owning volume names it: 'T104h8.flow', 'T109i.relief', 'T109j5.deep', 'T110b.viaduct' …
  owner: 'base' | 'V01' | 'V02' | 'V03' | 'V04' | 'V05' | 'V06' | 'V07' | 'V08' | 'V09' | 'V10' | 'V11' | 'V12';
  ownerBar?: string;             // the owning volume's bar id ('T-V4-54'); its stated parameters win (J-V12.48)
  rule: Rule;
  levels: Level[];               // ordered for 'trend' and 'exactMonotone' levels; strata for 'higherWith'; the pooled settings otherwise
  seeds: { perLevel: number; max: number /* drawn in steps of 50 up to max until the rule's minimum is met */ };
  stopAfter?: StageId;           // regenerate only up to the stage that settles the indicator, by the golden tooling's stage isolation (V12 §3.7.7)
  applies: { requires?: ('river' | 'coast' | 'walls' | 'customChain' | 'islands' | 'underground')[] };
  fallback: string }             // one sentence from the owning volume: what moves when the bar fails (V12 §3.6b's default otherwise)
interface StatBarResult { spec: string; verdict: 'pass' | 'suspect' | 'fail' | 'insufficient' | 'notApplicable'; towns: number; skipped: number;
  instances: number; effective?: number /* instances ÷ the design effect (V12 §3.6b) */;
  statistic: number;             // the rule's test value: the pooled share, the z, the exact p, the separation
  perLevel?: { level: string; n: number; y: number; notApplicable?: string }[]; perSeed?: { seed: string; values: number[] }[];
  violations?: { record: string; step: string; before: number; after: number }[] }   // exactMonotone and exactBound
```

### 2.8 Panels and sittings

```ts
interface PanelSpec {   // @plat/testkit/panels — one per sitting, registered by the owner of its gate
  id: string;           // the milestone id: 'M1', 'M2b', 'M4', 'M5', 'M6', 'V-M4', 'M-CAL' and a later corpus run's 'M-CAL/<layer>' (V12 §2.9's CorpusRunId); a volume's phase: 'V3-P6', 'V4-U5', 'M6-sky', 'V6-E7'
  gate: string;         // what a rated pass lets the milestone claim ("the base at parity", "mastered", …), or 'diagnostic'
  groups: PanelGroup[]; questions: ('legibility' | 'realism' | 'charm' | 'reads')[];
  subject?: string;     // the plain words 'reads' asks about ("a floating patch"); required when 'reads' is asked
  strips: string[];     // §13.7 letters shown as threshold strips (§13.6 (8))
  extras: ('house' | 'labels' | 'ladderStreet' | 'palette')[];
  passRule: { perGroup: 'all' | 'rung' | 'template' | 'frame' | 'class' | 'none' /* 'none': a descriptive set, never a gate */ }
             // a SOLO group passes a question with ⌈2n / 3⌉ Yes and no subgroup answered No on every item   // ⌈2n / 3⌉ better-or-same per group and question; never worse on every pair of a subgroup (§13.6 (6))
  render: PanelRender }
interface PanelGroup { reference: 'MFCG' | 'FTG' | 'NG' | 'FM' | 'VG' | 'DW' | 'AB' | 'SOLO'; formula: string /* the seed label pattern */; count: number; preset: PresetArm;
  id?: string /* a named group inside a sitting: 'M4-110' */; items?: string[] /* a SOLO group's fixed items: a fixture id or a forcing-site level id */ }
// 'DW': Dwellings plan images, research-side, one side of a plan pair (V03's panel; never a baselines.json source); 'AB': two recipes of ours,
// blind; 'SOLO': one render of ours per item, rated Yes / No per question where no reference and no second recipe exists (V04's panel)
interface PanelRender { widthPx: 1600; heightPx: 1200; framing: 'walledPlus10' | 'overview' | 'hood' | 'building' | 'village' | 'plan' | 'underground' | 'island';
  mPerPx: 'matched'; labels: false; furniture: false; light: 'fixedSun'; stripMetadata: true }
// §13.6's D5Pair gains five variants (BCR-V12-6):
//   { reference: 'FM'; i: number; refCapture: string; platSeed: string; cls: string }                                   (V02 §7.5)
//   { reference: 'VG'; rung: 'THORP'|'HAMLET'|'VILLAGE'; tags: string; i: number; refSeed: string; platSeed: string }      (V07 §3, §8)
//   { reference: 'DW'; i: number; refCapture: string; platSeed: string; cls: string; band: string }                       (V03 §8 P6)
//   { reference: 'AB'; purpose: 'reconcile' | 'history'; rung: Rung; water: WaterSetting; i: number; platSeed: string;
//     a: string; b: string /* each a recipe: output version, preset, and the layer or epoch it differs by */ }            (V12 §3.10.6; V06 §12)
//   { reference: 'SOLO'; rung: Rung; i: number; platSeed: string; recipe: string /* output version, preset, mode */ }   (V04 §7)
interface AnswersFile {   // exported by the sitting page; after the reveal it crosses with key.json into plat/goldens/d5/<panel>/ by V12 §3.3 (BCR-V12-8), where `plat d5 verdict` reads it
  panel: string; commitment: Hash128; sessions: { started: string; ended: string }[];
  answers: { pair: number; question: 'legibility' | 'realism' | 'charm' | 'reads'; answer: 'left' | 'right' | 'same' | 'yes' | 'no' /* yes / no: a SOLO item */; note?: string }[];
  strips: { letter: string; picked: 'A' | 'B' | 'C' | 'same' }[]; house?: 'A' | 'B' | 'C'; ladder?: { seed: string; reads: boolean }[] }
// §13.6 (9)'s D5Record widens to hold these answers and verdicts (BCR-V12-6 (c)); §13.3's MilestoneRecord holds a list of
// panels per milestone and the register's statuses in its exit rows (BCR-V12-20).
```

The owner's free-text `note`s stay research-side: `answers.json` crosses with each note replaced by its H128 hash, so the
record keeps that a note was written without carrying a word the scanner would have to judge (C3).

**Milestone ids** (reconciliation round 5, SCC-93; J-V12.78). Every milestone id this volume's records and commands carry
— a `PanelSpec.id`, a register entry's `due` and a history row's `milestone`, `--defaults --milestone <id>`, a
`MilestoneRecord`'s id — is volume-qualified, so no two volumes' steps share one: a base milestone by its §16 id with the
volumes' base change requests applied (M-1, M0, M1, M2a, M2b, M3a, M3b, M4, M4b, M5, M6; the staged rows M6-U, M6-sky,
M6-E, M6-P); volume 2's and volume 7's milestones by the ids their build plans give (`M3a-V2`, `M6a` – `M6c`; `V-M0` –
`V-M4`, `V-M2u`); a volume's step that its build plan names by a bare letter and number by its volume's prefix `V<n>-`:
`V3-P0` – `V3-P6` (volume 3's PE is built inside M2b and M3a and takes their ids), `V4-U0` – `V4-U5` with `V4-U3b`,
`V5-P0` – `V5-P6`, `V6-E0` – `V6-E8`; and a corpus run by V12 §2.9's `CorpusRunId`. **A volume's own register lines**
(reconciliation round 6, SCC-99) name their steps by that volume's id, which the seat writing an entry puts into its `due`,
its stages' dues (V12 §2.6) and `--milestone` in this form: V06 §8's steps E1 – E8 as `V6-E1` – `V6-E8`: a line's exit step in `--milestone`, its `due` as V6 §8 states it (`V6-E7`, or `V6-E8` for E8's lines; seams SCC-108, SCC-109); V04 §8's U-steps as `V4-U0` – `V4-U5` and `V4-U3b`; "at U5" in V02 §3.10.10 and V11 §8 as `V4-U5`, and V02
§3.10.10's crypt line's "from the landing of volume 4's access draw" as `V4-U3b` (the access draw's step, V4 §8's U3b).
Volume 11's content steps C0 – C8 (C3b among them) are built inside §16's milestones and take their ids, as volume 3's
PE does (V11 §8's *where in §16*): C0 `M0`, C1 `M1`, C2 `M2b`, C3 and C3b `M3a`, C4's wall rows `M2b` (its SettlementForge
rows are not calibratable, V11 §3.1), C5 `M2b` for its O13-core part and `M3b` for the rest, C6 `M4`, C7 `M4b`, C8 `M6-U`
— so no `V11-` id exists, and a C8 column landing after M-CAL's record dates to `M-CAL/under`, never `M-CAL/V11-C8`.
Item 110's raised ways are built at `M3a` (file f items 244 and 290: the record, the support step, the span rule and
generation, BASE (M3a)), so what this volume once dated "at the raised-way milestone" is due at `M3a`, and no separate
raised-way milestone exists. The lint refuses any other form of due (V12 §3.11's *The provisional-number lint*).

### 2.9 Corpus records (M-CAL)

```ts
type EvidenceClass = 'record' | 'surveyed' | 'drawn'   // a historical record · a measured plan with a metric scale · a drawn or painted plate
interface CorpusMapMeta {   // research-side index row; never crosses
  id: string /* the corpus's own id */; salted: string /* 'corpus:map:<16 hex>' — the only form that crosses */;
  evidence: EvidenceClass; scale: 'metric' | 'relative'; era: string; region: string /* our D-2 preset keys, mapped research-side */;
  frames: string[]; features: FeatureKind[]; excluded?: 'holdout' | 'mapDesign' | 'unreadable' }
interface SampleFrame {     // declared research-side before any of its maps is measured
  id: string /* 'frame:<era>/<region>/<n>' */; rule: string /* one sentence, independent of every measured feature */;
  era: string; region: string; n: number; evidence: 'surveyed'; declared: string /* date */; digest: string /* salted digest of its member list */ }
interface FramesFile {      // plat/calibration/reconciliation/frames.json — each frame's declaration crosses by V12 §3.3 BEFORE any row of it (C8)
  frames: { id: string; rule: string; n: number; era: string; region: string; declared: string; digest: string }[] }
type CorpusRunId = 'M-CAL' | 'M-CAL/under' | 'M-CAL/sky' | 'M-CAL/evolution' | `M-CAL/${string}`
                   // 'M-CAL' — the first run (V12 §3.10.1); 'M-CAL/<layer>' — the later run of the same process for the columns whose first
                   // compiled cell landed after M-CAL's record was committed: the layer of the landing milestone by V12 §3.11's *The due's
                   // corpus run* — 'M-CAL/M6-P' for the plan rung's M6-P and V3-P0 – V3-P6 by its own row (reconciliation round 5, SCC-93) — or that
                   // milestone's own id for any other; reconciliation round 4's continuation, SCC-R3C-1; J-V12.75
interface ReconciliationRecord {   // plat/calibration/reconciliation/<id>.json, the id's '/' written '-' ('M-CAL-under.json')
  id: CorpusRunId; opened: { by: 'owner'; date: string; words: string };
  adapter: { id: string; version: string; maps: number; excludedHoldout: number; excludedDigest: string };
  frames: { id: string; n: number; rule: string; declared: string; digest: string; crossing: string /* the CrossingRecord that carried it */ }[];
  runs: string[];                                       // CalibrationRun ids, kind 'corpus'
  refused: { target: string; rule: 'R1'|'R2'|'R3'|'R4'|'R5'|'R6'|'E1'|'E2'|'E3'|'E4'|'E5'; reason: string }[];
  ownerExcluded: { target: string; rule: string /* the owner-rule item and part, '109 (k) (2)' */; evidence: string /* a salted id */ }[];   // R6: an owner question, never a layer cell or a known defect
  reachability: { metric: MetricId; value: number; reachable: boolean; setting?: string; by?: 'declaration' }[];   // possibility evidence (V12 §3.10.4)
  floorsHeld: { cell: string; corpusValue: number; held: number; rule: string }[];   // an owner-stamped calibration minimum a corpus run met (V12 §3.10.3 R6)
  panel: CorpusRunId | null /* its sitting, the run's own id; null for a later run that moved no cell (V12 §3.10.1) */; decisions: { frame: string; decision: 'default' | 'selectable' | 'pending-owner' }[];   // adoption is per frame (V12 §3.10.6)
  palette: { mismatch: boolean; ours?: Record<string, [number, number]>; ownerPick?: 'released' | 'remeasured' } }
```

### 2.10 Provenance evidence (BCR-V12-5)

§7.6's cell provenance `{source, date, note}` gains two optional fields (BCR-V12-5):
* `evidence?: string[]` — the **ids** of the baseline rows, the `CalibrationRun`, the panel (`d5:<panel>`) or the M-1 record
  that set the value; ids only, never sentences. V11's compiler carries them into every compiled cell. They are
  view-only: the table content hash that pins an output version (§6.4) excludes `provenance.evidence`, so rewording or
  adding evidence never moves an output version (V12C-29).
* `ownerRule?: string` — the owner-rule item and part a cell encodes (`'109 (k) (1)'`, `'110 (b)'`): the catacomb TOWN gate,
  the cemetery-only source list, the cathedral's `always` crypt, the underground's any-tier existence, the dossier's
  primacy rows, the `raisedWays` rung gate (V11's schema admits no row below CITY), and the owner-stamped **calibration
  minima** of the CITY and METROPOLIS raised-way chances and caps. V11's compiler stamps it from the owner-rule rows
  (X-V12-9); a stamped cell is never a run's cell (V12 §3.7.2 (2)) nor an E1 or E4 target (V12 §3.10.3 R6); a stamped
  calibration minimum binds every run, fallback and corpus pack — never the parity presets' extension zeros (item 23), a
  no-op pin's overlay or a user's own override (everything is editable).

The compiler writes `dist/evidence.json` beside the tables: `{ "<cell ref>": { status, lines } }` — `status` the register's
plain word for the cell's entry (provisional, confirmed, fallback applied, not achieved, owner-set, fixed; `owner` for a
stamped cell), `lines` one plain sentence per cited id taken from each run's `plain` summary ("tuned so organic lanes turn
as much as FTG's streets per 100 m"). It ships with the tables (≤ 200 kB, V12 §6), so the tables editor (V09) and the
clerk (V10) explain a value and its status without reading `plat/calibration/`.

### 2.11 Lifecycle of every record

| record | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `MetricDef` | authored in code with its catalogue row | measure, parity, check, docs | `metrics.json` in `dist/` | rebuilt by `plat build` | a code revert; a major bump re-measures its baselines (V12 §3.4.3) | a definition change is a major version, never an edit in place |
| `MeasureInput` | adapters (research) or `measureInputOf` (ours) | `plat measure` | research side: `research/baselines/inputs/<ref>/<build>/`; ours: in memory, or a golden fixture | re-derived from its capture or document at will | — (derived) | re-written when the profile's version bumps |
| `Baseline` row | `rows.py` + the crossing | parity, calibrate, the check | `baselines.json` | never re-computed in place: a new metric version or build adds a row that `supersedes` it | supersession (append-only) | `schema` bump with a converter in `plat baselines check --migrate` |
| `ReferencePin` | the baseline seat at M-1 | parity | `baselines.json` | — | a pin change back is a new declared baseline shift | — |
| `ParityReport` | `plat parity` | milestone exits, runs, dashboard, release notes | `plat/goldens/parity/` (milestone), CI artifacts (nightly) | re-run gives the same bytes on the same inputs (V12 §3.13) | — (a report is a fact) | read by schema version |
| `CalibrationRun` | `plat calibrate run` | register, compiler (evidence), release notes | `plat/calibration/runs/` | re-running its spec reproduces every evaluation (T-V12-8) | a revert run restoring `from` values, itself declared | read by schema version |
| `CalibrationEntry` | the seat landing a volume's constant, or §13.7's letter; the default line's by `plat calibrate register --defaults --milestone <id>` | milestone exits, docs, editor, clerk | `register.json` | statuses recomputed from `history` by `plat calibrate register --check`; `--defaults` writes only columns that hold a compiled cell and have no entry (idempotent; SCC-R2C-5), each with a first history row naming the landing milestone and its `due` from it (V12 §3.11's *The due's corpus run*; SCC-R3C-1); a value moved by its owning seat before its due appends one cells row by the same command to its `provisional`, not-yet-due default entry, or named entry whose cells no run may name (SCC-98), rows a later landing adds append one cells row to any entry whatever its status (SCC-103), a tuning the golden check refused appends a held row by `--hold` (SCC-102), and `--check` fails an entry whose last cells row differs from its target's compiled cells or lacks a compiled row key (V12 §3.11's *A value moved by its owning seat before its due*; SCC-90); a staged entry's exit and sitting rows advance its current stage (*Staged entries*; SCC-105) | a history row is appended, never removed; a later named line restates a default entry in place (`line` dropped) | an entry without `line` reads as a named line's; a history row without `cells` reads as a metrics, panel or status row; an entry without `stages` reads as single-stage, its `method`, `due` and `panel` its one stage, and a row without `stage` or `held` reads as before (round 6, SCC-105, SCC-102) |
| `NullModelSpec`, `StatBarSpec`, `BenchBarDef` / results | the bar's owner registers the spec; results by `plat nullmodel`, `plat statbar` and the bench bar's `run` | parity, register (the `bar.<barId>` rows, V12 §2.1) | spec in code; results in the report | re-run gives the same bytes | — | spec change = a new spec id version |
| `PanelSpec`, `seeds.json`, `D5Record` | registered in code; `plat d5 seeds`; `plat d5 verdict` | the sitting, milestone record, release notes | `plat/goldens/d5/<panel>/` | seeds from formulas; renders re-rendered under the current output version when re-offered (§13.6 (7)) | a new sitting is a new record; answers are never edited | — |
| `AnswersFile`, `CorpusMapMeta`, `SampleFrame` | the sitting page; the adapter seat | `plat d5 verdict`; the corpus runs (through rows only) | research side only | — | — | — |
| `ReconciliationRecord` | the M-CAL calibration seat, for M-CAL and for each later run `M-CAL/<layer>` (V12 §3.10.1; SCC-R3C-1) | release notes, milestone record, owner's report | `plat/calibration/reconciliation/` | — | a revert release restores the previous tables (a declared shift) | — |
| `evidence` ids, `ownerRule` stamp, `dist/evidence.json` | accepted runs, panel picks; V11's compiler from the owner-rule rows; the compiler from the register | compiler, editor, clerk, audit; run refusal and R6 | ids and stamps in the shipped tables (outside the pinning hash); sentences and statuses in `dist/evidence.json` | recompiled with the tables | with the value it explains | optional fields: absent reads as none |
| the historical pack `historical:<frame>` | accepted corpus runs of its frame | §7.6's expansion, packs slot, for documents whose era and region match | a versioned pack table in `@plat/tables`, pinned in each recipe by id, version and hash (§2.9) | the recipe replays its pinned pack version | §7.6's apply is one undo step | a document pinning a retired version replays it under §6.4's retention; a revert release ships a new pack version, never an edit |
| `FramesFile` | the adapter seat, before measurement | C8; the reconciliation record | `plat/calibration/reconciliation/frames.json` | — (a declaration is a fact) | a superseding frame is a new id | — |
| `KnownCityFixture` | its seats at M3a (K1's inputs from T101-6's fixture) | T-V12-36; the guards; M4-110; V03's B-PLAN; V01's T-V1-54 | inputs `plat/tests/fixtures/known-city/<id>/`; golden `plat/goldens/known/<id>/` | from its skeleton and seed | a revert commit | its digest re-recorded only by a declared shift that names it (BCR-V12-19) |
| `NoOpPin` and its off-state sets | at registration; the sets at a family's switch-on bump | CI; the bumps | `plat/goldens/noop/<id>/o<k>/` | the suites under the overlay | — | re-recorded only by another cause's declared shift with matching stage lists (V12 §3.7.8) |
| `history.jsonl` | `plat parity` | the dashboard | `plat/goldens/parity/history.jsonl`, pruned to 60 nights | appended per run | — | read by schema version |
| `known-defects.json` entries opened here | failing bars, unreachable values, withdrawn M-1 rows | release notes, exits | §13.3's file | — | closed, never deleted, by the run or report that clears it (`MilestoneRecord.knownDefects.closed`) | — |

### 2.12 The known-city fixtures (V12 §3.14)

```ts
interface KnownCityFixture {              // plat/goldens/known/<id>/fixture.json; test-side, never document state
  id: 'K1' | 'K2';                        // K1 = J78's fixture (T101-6); K2 = item 110 (e)'s
  inputs: string;                         // plat/tests/fixtures/known-city/<id>/ — brief.md (our words and names), skeleton.plat, canvas.json, transcript.json
  seed: string;                           // seedOf('known', [id]) as a decimal string (V12 §2.4)
  rung: Rung; population: number; water: WaterSetting;   // K2: CITY, 20 000, 'coast'; K1: as T101-6's brief declares (CITY, coast)
  structure: StructureCheck[];            // evaluated on the model after generation, on every authoring path
  emulationSubset: string[];              // the check ids whose entities are all declared at L1 or L2 (§7.1's level table), computed at registration
  digests: Record<string /* output version */, Hash128> }   // the model digest the skeleton and the canvas paths share
type StructureCheck = { id: string; what: string /* plain words: the report line and the dedicated-user checklist */ } & (
  | { kind: 'quarter'; name: string; quarterKind?: string }          // a declared quarter by name and kind (T101-6)
  | { kind: 'namedPlaceInQuarter' }                                   // every named place in its declared quarter (T101-6)
  | { kind: 'enceinte'; closure: 'ring' | 'shore' | 'barrier'; chainEndsOnShoreM?: number; towersMin: number; landGatesMin: number; gatePlaza?: true }
  | { kind: 'harbour'; enclosedBy: 'mole'; headLandmark: string /* class */; midLandmark: string; midTolerance: number /* share of the mole's length */ }
  | { kind: 'causeway'; toIsletMaxHa: number; isletLandmark: string }
  | { kind: 'anchorage'; jettiesMin: number; outsideBasin: true; deckBuildingJettiesMin: number }
  | { kind: 'terracedWards'; wardsMin: number; innerWall: true; retainingMin: number }
  | { kind: 'stairOrRamp' }                                           // every way crossing a retaining wall is a stair or a ramp there
  | { kind: 'ringStreet'; aroundPlace: string }                       // a cycle of ways whose interior holds that place and no other declared place
  | { kind: 'raisedWay'; ref: string; straightMax: number /* largest chord deviation ÷ length */; part0CrossingsMin: number; endsRampOrStair: true }
  | { kind: 'ravineQuarter'; quarter: string; retainingMin: number; informal: true }
  | { kind: 'landmark'; cls: string; name?: string; inQuarter?: string }
  | { kind: 'stepped'; place: string; tiersMin: number }
  | { kind: 'deckPlots'; bridge: string; buildingsMin: number }
  | { kind: 'regionLabels'; count: number }                           // K1's three region labels
  | { kind: 'across'; place: string; water: 'river' }                 // K1's satellite across the river
  | { kind: 'namesClean' } )                                          // the fixture's files pass §17.1 (5)'s scan with BCR-V12-18's names
interface StructureResult { fixture: string; path: 'skeleton' | 'canvas' | 'transcript' | 'emulation'; outputVersion: string;
  digest: Hash128; failed: { id: string; what: string; found: string }[]; extras: string[] /* generated extras reported, never failed */ }
```

### 2.13 The no-op pins (V12 §3.7.8)

```ts
interface NoOpPin {                       // @plat/testkit/noop; test-side
  id: 'item110.raised' | 'item110.terrace' | 'item110.deck' | 'item110.stepped';
  overlay: { ref: CellRef; value: unknown }[]; // the family's off values from V11 §3.24.0's switch table: raised — every raisedWays chance 0; terrace — terrace.enabled
                                               // false; deck — every deck.offer 0 and every deck.landmarks chance 0; stepped — every roster.specialisations
                                               // chance 0 (a cell value, V11 §3.24.0; V11's round 1, SCC-25)
  suites: { suite: string; owner: string }[];  // registered by their owners: the golden suite and hook fixtures (base), B-DOSSIER-lite, B-MASS (V02), the sky
                                               // goldens (V05), H-100, H-AQUA, H-TERRACE and H-DECK (V06), the underground goldens (V04), V07's village goldens,
                                               // B-CITY's 200 seeds per rung (V11's T-V11-31), K1 and K2 (V12)
  switchedOn?: string;                         // the output version whose bump switched the family on; absent before it
  store: string }                              // plat/goldens/noop/<id>/o<k>/ — the off-state digests per output version
```

## 3 Generation — the harness pipeline

### 3.1 The loop at a glance

```
 research side (reads captures; never ships)                 │ product side, plat/ (reads only what crossed)
 ──────────────────────────────────────────────────────────── │ ─────────────────────────────────────────────────────────────
 capture plan (seed families, V12 §2.4)                       │
   → captures (profiler tools; FTG one per day)               │
   → adapters → MeasureInput files (numbers, geometry)         │
   → plat measure (the product's metric code, run here)  ─────┼─ the same code: plat measure on our towns
   → per-seed rows → plat baselines aggregate                  │
   → rows.py → candidate baselines.json                        │
   → plat baselines check (C1–C10) + checker seat  ═══ numbers only ══> baselines.json ─→ plat parity ─→ ParityReport
                                                              │                                  ↓ out of band?
 panel assembly: renders from plat (read) + reference images  │  plat calibrate run (train / holdout) ─→ table versions,
   → sitting page → owner → answers.json  ═══ answers, hashes ══> plat d5 verdict ─→ D5Record          shift records, goldens
 corpus (M-CAL only): adapter → MeasureInput → plat measure   │  corpus runs (same engine) ─→ reconciled preset layer
   → frame rows  ═══ numbers only ════════════════════════════> baselines.json (corpus rows)  → sitting M-CAL → release
```

The product never reads the research side; the research side may run the product's released CLI (§13.3's "research may
read the product; the product never reads research"). Every arrow that crosses is a numbers-only file passing V12 §3.3.

### 3.2 The capture-and-measure loop (research side)

**3.2.1 The capture plan.** Before a capture session, `research/baselines/plan.py` writes `research/baselines/plan.json`:
for each reference, each matched setting and each index i, the seed `seedOf('capture/<ref>/<size or template>/<options>',
[i])` (V12 §2.4) and the options string. A row may only be built from a plan's indices [0, n) (crossing check C7), so the
seeds are fixed by formula before anything is seen and a disappointing seed cannot be dropped. MFCG, NG and VG seeds are
reduced into their MINSTD state range (§13.6 (2)); FTG cannot be seeded, so its plan lists capture slots in capture order
(§13.6 (2)'s rule); Fantasy Manor's 41 captured buildings are its sample as recorded (V02 §7.4). The plan at M-1:

| reference | settings | per setting | cost | note |
|---|---|---|---|---|
| MFCG (build 12710731) | sizes 40 / 80 / 130 with the plain options of §13.5; size 80 with river and coast (stress, descriptive) | 10 plain (J-V12.3); 5 stress | ≈ 35 exports × ≈ 7 s wall | one URL load per export (`captures/mfcg/exports-2026-09-25/README.md`, *How export was triggered*); JSON, SVG and screenshot per seed |
| FTG (server of the capture date) | BIG_TOWN and BIG_CITY; one capture with water options nearest `none`, two nearest `coast+river` (§13.6 (2)) | 3 | six days on the free daily allowance | each capture's resident count recorded for §13.6 (2) |
| NG 1.2.2 | `medium`, templates area / street / square / ring | 5 | the vertex-capture sessions of `docs/CONFIDENCE.md` §6 #2 | relative scale |
| VG 1.6.9 | V07 §7's tag sets | V07's counts | V07's recordings | BCR-V7-23 |
| Fantasy Manor 1.0.0 (build 890) | the free frame | 41 buildings (as captured) | none new | counts only (V02 §7.4) |

The MFCG stress settings exist at size 80 only, so B-REF runs no MFCG `coast+river` town at TOWN or METROPOLIS (no baseline
row exists there); the M1 panel's MFCG `coast+river` pairs take their own exports per rung (V12 §3.9.1), which feed no row.
The panels' reference identifiers — Fantasy Manor capture ids (`fm-captures.json`), Dwellings capture ids
(`dw-captures.json`) and VG seeds with their tags (`vg-seeds.json`), numbers and ids only — are written research-side by
`plan.py` and cross by V12 §3.3 into `plat/goldens/d5/<panel>/`, where `plat d5 seeds` reads them (BCR-V12-8).

**3.2.2 Adapters to `MeasureInput`.** One research-side script per reference, `research/baselines/adapters/<ref>.py`,
writes `research/baselines/inputs/<ref>/<build>/<capture>.metric.geojson` with its header (V12 §2.2). What each maps:

* **MFCG** — the JSON export is already in metres (the sweep README's *Units*; `unitM` absent). Each exported road
  becomes a way of class `arterial`; each footprint and prism a building of class `unknown`; the first wall polygon the
  city's enclosure and curtain, the second the castle curtain and a `castle` feature from its ring; gates are the city
  ring's vertices touching a road vertex, less those shared with the castle ring (class `land`); the district, square,
  green and field polygons, the river centrelines (with the file's river width), the pier segments and the sea polygon
  map to our kinds of the same meaning. **The shore split (item 106).** A coastal city's exported ring follows the
  shoreline where the drawn wall is an open chain (the exports README's review note 2): ring edges whose two vertices lie
  on the sea polygon's boundary within 0.5 m become `closure` features of class `shore`, the rest stays the curtain, and
  the ring stays the enclosure, so `walled.share` reads exactly what it read before; the ring vertex on a river
  centreline is a gate of class `water`. Towers are the castle ring's non-gate vertices plus the city ring's vertices that
  are neither a gate (land or water), nor castle-shared, nor inside a shore closure (a vertex both of whose ring edges are
  closure edges), so the shore-end posts keep theirs — on the four dry cities the README's counts, on the recorded
  coastal city its derivation's 20 (the arithmetic CONFIRMED there, the end posts PLAUSIBLE). Lanes are not exported, so the lane-level metrics read the derived street graph (V12 §3.4.1).
* **FTG** — the decoded payload's road graph with its classes mapped main → `arterial`, district → `street`, suburb →
  `lane`; footprints; wall chains and tower points; fields; water outlines; centimetres to metres. No plots (the client
  receives none, item 49).
* **NG** — blocks, lots and building polygons from the vertex captures, `scale: 'relative'`; the bent-cut traces are not
  re-derived here: the signature's reference values are the recorded measurements of §13.5's bent-cut row, entered as
  `trace` rows.
* **VG** — V07 §7's features from its recordings; **Fantasy Manor** — no geometry, a `counts` file.

**3.2.3 Measuring, with one implementation.** At M-1 no product exists, so the M-1 seats measure with research-side
scripts written from V12 §3.4's definitions (the red-team scripts of `docs/validation/bench/README.md` are their
starting point). From M1 the product's `plat measure` is the one implementation: the research side re-runs every
baseline through the released CLI on the same `MeasureInput` files, and T-V12-3 holds the two within each metric's
`tolerance`; where they differ beyond it, the seat finds which definition is wrong, and the product's value replaces the
M-1 row as a superseding row with a declared `baselineShift` (§13.3) whose note names the metric (J-V12.1). A render metric
(recoverability) keeps §16 M-1's cross-check within 0.01 on M1's golden renders. T-V12-3 and T-V12-6 read captures, so
they are **research-side checks** (`research/baselines/check_t3.py`, `check_t6.py`, running the released CLI): their
verdicts reach `MilestoneRecord.exitCriteria` as evidence strings naming the check's output hash, and nothing under
`plat/` reads a capture (§17.1 (3); T-V12-28).

**3.2.4 Writing rows.** `plat measure` writes per-seed values; `plat baselines aggregate` (product code, run research-side)
forms each row's `values` by V12 §3.5.1's estimator and, for distribution rows, `spreadKS`; `rows.py` adds the provenance
of §13.5 (`referenceBuild`, `capture`, `script`, `date`), the `sample` block, the role from the metric's row in §13.5 or
the owning volume, and writes the candidate file. `script` and `capture` are written as `research:`-prefixed labels
(`research:baselines/adapters/mfcg.py`), opaque strings the product never resolves (V12 §3.3 C2).

### 3.3 The crossing — how numbers, and only numbers, enter `plat/`

`plat baselines check <file> [--previous <committed file>]` runs on every candidate numbers-only file before it is committed
— `baselines.json`, `ftg-captures.json`, `ng-counts.json`, `fm-captures.json`, `dw-captures.json`, `vg-seeds.json`, a panel's
`answers.json` and `key.json` after the reveal, and the corpus's `frames.json` (BCR-V12-8 adds the new ones to §17.1 (4)'s
list); until M1 its research-side twin `research/baselines/cross_check.py` applies the same rules, and M1's first run of the
product check re-validates the M-1 file (T-V12-1).

| check | rule | on failure |
|---|---|---|
| C1 schema | the file parses under its zod schema (`plat.baselines/2`, §13.6 (9)'s types) | refused, naming the path |
| C2 strings | every string matches its field's pattern, the fields listed by name: `id`, `metric`, `supersedes` `^[a-z0-9.:/@+_-]{1,120}$`; `sample.family`, `sample.captures[]`, a panel file's seed labels and reference ids `^[A-Za-z0-9.:/@+_-]{1,120}$` (the seed families are upper-case: `capture/MFCG/40/plain`); builds `^[A-Za-z0-9._:+-]{1,64}$`; dates ISO 8601; `capture` a capture folder name (`^\d{4}-\d{2}-\d{2}T[\d-]{8}$`) or a `research:` label; `script` a `research:` label `^research:[a-z0-9_./-]{1,160}$`; any other string field refused | refused, naming the field |
| C3 notes | a `note` is ≤ 200 characters of letters, digits, spaces and `.,;:()-/%±≤≥×` and passes the clean-room scanner | refused |
| C4 colours | no six-hex-digit sequence anywhere in the file | refused |
| C5 numbers | every number finite; every unit in V12 §2's closed list | refused |
| C6 metrics | every `metric` exists in `metrics.json` at the row's `metricVersion` | refused |
| C7 samples | `sample.family` is a registered `capture/…` family and `indices` start at 0; an FTG row's `captures` equal the capture plan's slots in order; a panel file's FM, DW and VG references are the plan's, in its order | refused |
| C8 corpus | a corpus row's reference is `corpus:frame:<id>` or `corpus:map:<16 hex>`; `evidence` present; a *target* row is a frame row with `frameN` ≥ 20 and `evidence: 'surveyed'`; a frame row's frame is in `frames.json` by a `CrossingRecord` EARLIER than the row's, with equal `n` and digest; no other string of corpus origin | refused |
| C9 append-only | against the previous committed file, no row is removed or changed; a replaced row is kept and named by the new row's `supersedes` | refused |
| C10 scan | the clean-room scanner (§17.1 (5)) over the whole file: 0 hits | refused |

A passing file is committed by the **baseline seat** (research tier) and countersigned by a **checker seat** that reads
only the candidate file, the check's output and `metrics.json` — never the captures — appending a `CrossingRecord`
(V12 §2.3). What never crosses, whatever the check says: images, geometry, names, colours, a reference's option names
beyond numbers and flags, any corpus string other than our D-2 preset keys (J-V12.2).

### 3.4 The metric suite

**3.4.1 Two derived features for sources that lack them.** MFCG exports no blocks and no lanes; a corpus plate may show
buildings only. So that one definition runs on every source, `plat measure` derives, from footprints alone:
* **cluster blocks** — footprints whose rings lie within `g` of each other join one cluster (`g` = 1.0 m on a metric
  input, 2 % of the median footprint's short side on a relative one); a cluster block's outline is the union of its
  footprints closed by a dilation then erosion of 3 m (metric) or 10 % of that short side (relative);
* **the derived street graph** — inside the outermost curtain (or the built area's outline where there is none), the
  complement of the cluster blocks, reduced to its straight skeleton (§3.8's kernel skeleton), spurs shorter than 8 m
  (metric) or 40 % of the median short side (relative) pruned, nodes within 2 m merged.

A metric that reads blocks or lanes on MFCG reads these, and the same metric on our side reads the same derivation from
our footprints — never our true blocks — so the comparison is like with like (`blockc.*`, `sgd.*` below); our true
blocks and ways feed the rows whose reference has them (J-V12.5).

**3.4.2 The catalogue.** Ids, inputs and definitions. Where the base defines a measure, the row cites it; otherwise the
definition here is the one implementation's. `m` = metric scale needed, `f` = scale-free. Every wall row reads the
enclosure of V12 §2.2 (item 106): "inside the outermost curtain" means inside the outermost enclosure, "the curtain ring's
area" is the enclosure's area, along-curtain distances run along built stretches only and never across a closure edge
(a condition run's end is no stretch end: V12 §2.2 merges the runs),
and a "main gate" is a gate of class `land` (a water gate, a harbour-mouth chain included, never counts).

**Default rules** (V12C-09; a row states its own value only where it differs, and the registry holds the result):
* `absFloor` — shares, ratios and rank statistics 0.02; angles 1°; lengths 2 % and areas 5 % of the reference's median;
  densities (`perHa`, `perKm`) 5 % of it; counts 0.5; Moran's I and Spearman 0.05; entropies 0.05 bits; timings 5 %.
* `sign` — `any` for Moran's I, Spearman, `z` and signed angles; `positive` for everything else (a folded angle is positive).
* Distribution bins (`output.edges`; the KS distance of V12 §3.5.3 runs on the binned CDFs at these fixed edges) — areas
  log-spaced, 24 bins over the metric's range (blocks 50 – 50 000 m²; buildings 10 – 2 000 m²; plots 20 – 5 000 m²) with an
  underflow and an overflow bin; run lengths 5 m bins to 400 m with overflow; nearest-neighbour distances 0.25 m bins to
  30 m with overflow; widths 0.25 m bins to 30 m with overflow.
* `tolerance` — `geo`, `model`, `trace` and `counts`: 1e-9 relative (the same code on the same input); `render`: 0.01
  absolute; the M-1 twin comparison of T-V12-3: 0.5 % relative or one unit of the last printed digit, whichever is larger.
* `stages` — the stages that produce the kinds the metric reads: ways S3, S4, S5 and S8; walls, towers, gates, the castle,
  closures and enclosures S3 – S5; districts and squares S3, S6 – S7b; blocks S8 – S9; plots S8 – S10; buildings S10 – S11;
  the `water`, `river` and `pier` kinds S1 and S3; the `green`, `field` and `tree` kinds S12 – S12a; galleries and chambers the underground stages
  (II.7); retaining walls S10 – S11; raised parts, their supports and spans S4 – S6 (viaducts at S4, elevated roads and
  aqueducts at the end of S6, V11 §3.24). `model` metrics name their stages in the
  row where the row's input differs.
* `costMs` — measured, not designed: `plat build` writes each row's M1-measured cost per CITY town into the registry, and
  V12 §6 budgets the sum; before M1 it is the §6 row's share.
* **Centroids** are area centroids for polygons and the point itself for points, in every metric; the red-team's R4 script
  used vertex means, which T-V12-6's R4 clause absorbs within its 0.02.

**Reading rules for item 110's entities** (V12C-40; file f item 447): every way graph (`junction.*`, `street.*`, `sgd.*`,
V12 §3.6's way-distance statistics) is built per part — nodes merge only within a part and parts join only at shared
ramp-foot vertices — so a viaduct passing 2 m over a ground node makes no junction; **a way of class `aqueduct` enters no
way graph** and no way-distance statistic (it carries water, not traffic; a raised aqueduct's arches are its supports and
spans), and no class-specific metric reads it; `wall.*`, `gate.count` and `wall.ungated` read `wall` features only, never
`retaining`; `bldg.*`, the cluster blocks, the derived street graph and `fg.*` read `building` features only, never
`raisedSupport`, `span` or `retaining`; no metric reads a `span`; deck buildings are buildings, and the siting statistics
read their `onDeck`; a stepped building's `heightM` is the top of its stack.

| metric id | input | scale | definition | reference(s) | row served |
|---|---|---|---|---|---|
| `street.turn100` | geo | m | ways other than alleys resampled at 10 m arc steps; turning = Σ \|Δheading\| between steps × 100 ÷ length; per seed the length-weighted median over ways ≥ 50 m | FTG; PLAT organic presets | §13.5 street turning |
| `street.stepHist` | geo | m | histogram of \|Δheading\| per 10 m step, 1° bins over 0–45° plus overflow; the cliff clause reads it | FTG (weakness) | street turning |
| `street.entropy50` | geo | m | Shannon entropy in bits of the heading change per 50 m window, 5° bins over 0–90° | FTG (weakness) | street turning |
| `street.drift600` | model | m | §4.4's net turn over 600 m of grown streets, organic regimes | — | growth drift |
| `junction.angles` | geo | f | nodes of degree ≥ 3 after merging nodes within 2 m; each arm's direction 10 m along it; angles between angularly consecutive arms; per seed median and p5 | NG; FTG | junction arm angles |
| `junction.share4` | geo | f | degree-4 nodes ÷ nodes of degree ≥ 3 | NG; FTG | junction arm angles |
| `street.runs` | geo | m | lengths of maximal paths between nodes of degree ≠ 2, per way class; per seed median per class | FTG | street runs by class |
| `lots.r4.60`, `.120`, `.250` | geo | m | each building's axis = its longest ring edge's direction; z = e^{4iθ}; for 1 500 buildings sampled by the metric's stream (all if fewer), R4 = \|mean z\| over buildings whose centroids lie within r of the sample's centroid, samples with ≥ 5 such buildings; per seed median | MFCG | MFCG street signature |
| `lots.wallAlign` | geo | m | buildings inside the outermost curtain, in bands 0–40, 40–100, 100–200 m from it: the angle between the building axis and the nearest curtain segment folded into [0°, 45°]; per band the median and the share ≤ 15° | MFCG | MFCG street signature |
| `sgd.tShare` | geo | f | on the derived street graph, degree-3 nodes with two arms within 20° of straight ÷ degree-3 nodes | MFCG | MFCG street signature |
| `sgd.deadEnds` | geo | m | degree-1 nodes of the derived street graph per km of its length | MFCG | MFCG street signature |
| `blockc.perHa` | geo | m | cluster blocks inside the outermost curtain per walled hectare | MFCG | MFCG street signature |
| `blockc.lotsPer` | geo | f | footprints per cluster block; per seed median | MFCG | MFCG street signature |
| `block.area` | geo | m (f as `block.areaRel`, ÷ median footprint area) | built blocks' areas per district; distribution | NG | blocks |
| `block.countTemplate` | counts | f | built blocks per hood per template at `medium` | NG (V01 T-V1-31) | blocks |
| `block.courtShare` | geo | f | deep blocks — largest inscribed circle's radius > 1.5 × the median footprint's short side — holding an unbuilt interior component (the block less its footprints dilated by 5 % of that short side) of area ≥ 0.5 × the median footprint area that touches no block edge ÷ deep blocks | NG; MFCG | deep block interiors |
| `cut.sigma`, `cut.cornerMid`, `cut.arrival85`, `cut.fillet` | trace | f | §4.6's recorded-frame measures on S8's cut log | NG | bent-cut signature |
| `fg.recoverability` | render | f | §8.5's metric on the city band at the matched scale | MFCG | figure-ground and streetwall |
| `fg.coverWalled` | geo | f | Σ area of footprints whose centroid is inside the outermost curtain ÷ the curtain ring's area | MFCG (descriptive) | figure-ground and streetwall |
| `fg.streetwall` | geo | f | on dense frontages, the share of cluster-block outline length within 0.5 m (metric) or 2 % of the median short side (relative) of a footprint edge | MFCG | figure-ground and streetwall |
| `bldg.area` | geo | m | footprint areas (ours: residential families; references: all buildings); per seed median and p95 | FTG; MFCG (descriptive) | plots and footprints |
| `bldg.quadSide`, `bldg.worstCorner` | geo | m / f | four-vertex footprints' median side; per footprint the largest \|corner − 90°\|, per seed p95 | FTG | plots and footprints |
| `plot.area` | model | m | L3 plot areas per class and band | — | plots and footprints |
| `bldg.partyShare`, `bldg.attached` | geo | f | per footprint the share of its perimeter within 0.3 m (relative: 1 % of its short side) of another footprint's edge, per class median; the share of footprints with any | NG; FTG (descriptive) | party walls and attachment |
| `plot.spearman`, `plot.moran`, `plot.cvDistrict` | model (NG `plot.moran` on lots: geo) | f | Spearman(prosperity, plot area); Moran's I of plot area on the shared-edge adjacency graph with unit weights; within-district CV, districts ≥ 30 plots | NG (weakness) | plot-area gradient |
| `alley.gradient` | model | f | Spearman of alley length per hectare against prosperity decile | FTG (weakness) | alleys |
| `walled.share`, `ribbon.share` | geo | f / m | buildings whose centroid is inside the outermost curtain ÷ all; extramural buildings within 100 m of an arterial ÷ extramural buildings | MFCG | walled share and ribbons |
| `district.area`, `plaza.area`, `castle.area`, `castle.compact` | geo | m / f | per district hectares (per seed median); the principal square's hectares; the castle's hectares; 4πA ÷ P² | MFCG | MFCG anchors |
| `wall.nodeSpacing` | geo | m | along-curtain distance between consecutive wall nodes — towers, gates and vertices where the curtain turns ≥ 10° — p50 | MFCG | MFCG anchors |
| `quarter.count` | geo (references: district features) / model (ours: quarter labels at the city band) | f | the count | MFCG | MFCG anchors; labels |
| `outline.r90cv`, `outline.roadRatio` | geo | f | 36 sectors of 10° about the centre; r90 = the 90th percentile of building-centroid distances in a sector (sectors ≥ 5 buildings); CV of r90 over sectors; mean r90 of sectors whose middle bearing lies within 5° of an arterial's outward bearing where it leaves the built area ÷ the other sectors' mean | FTG | outline anisotropy |
| `usemix.resOnly`, `usemix.entropy`, `usemix.liveIn` | model | f | §13.7's block-level use-mix definitions | — | block-level use mix |
| `wall.towerSpacing`, `wall.ungated`, `gate.count` | geo | m / f / f | along-curtain spacing of consecutive towers, p50; arterial ways crossing a curtain at no gate; main gates of the outermost curtain | FTG; MFCG | towers and gates |
| `water.step`, `water.riverWidth` | geo | m | median vertex spacing of water outlines after dropping vertices turning < 1°; the median river width | FTG; MFCG (descriptive) | water |
| `tree.nnP1`, `tree.nnMedian`, `tree.pcf` | geo | m | nearest-neighbour distances of tree points; the pair-correlation function at 1 … 20 m (Stoyan and Stoyan's estimator, §17.1 (8)) | FTG (weakness); the sampler | tree scatter |
| `pop.perBuilding` | geo / model | f | population ÷ buildings | MFCG (weakness); FTG | population and buildings |
| `time.model`, `time.firstMap`, `time.worst` | timing | — | §12's measures in the timing phase, ÷ the calibration score ratio (§12.1) | MFCG; FTG; NG | generation time; MFCG-worst configurations |
| `delivery.tier`, `ladder.use`, `vacancy.share`, `quay.reach`, `residue.share`, `entrance.frontage`, `hidden.share`, `wealth.*` | model | — | from the core statistics record and the report (§13.2, §5.4) | — / FTG descriptive | the C rows of §13.5 |
| `draw.*`, `label.*` | render / model | — | §8.3's census; §9.4's checks | MFCG; NG | draw style; labels |
| `variety.dispersion` | geo | f | §7.7's signature vector per town, computed from the input where the source has the kinds; standardised by the rung's pooled deviations; mean pairwise Euclidean distance over the seeds | MFCG; FTG (floors) | between-seed variety |
| `market.secondary`, `market.adjacent` | geo | f | market squares beyond the first per town; market-square pairs sharing an edge | MFCG | markets |
| `palette.paperLuma`, `.paperWarmth`, `.inkLuma`, `.inkWarmth`, `.plateChroma` | render | — | §8.2's definitions on §8.2's measurement render | item 69 (owner-set targets) | §13.4 palette bar |
| `fm.*` | counts | f | one metric per row of V02 T-V2-31's table and its plan-extent clause, as V02 states them (reconciliation round 2, SCC-41: nine rows — family shares, path segments, blocks, towers, square towers, dormers per segment, porches, half-round porches, entrances — and the plan extent in wing widths, SP-V2-4) | FM | V02 §7.4 |
| `vg.*` | geo / counts / timing | per V07 | V07 §7's parity metrics | VG | V07 §7 |
| `siting.<spec>` | model (corpus: geo with `use`) | m / f | the correlation harness's placement statistic for one `NullModelSpec` (V12 §3.6) — its bar's verdict statistic is `bar.<spec id>` (reconciliation round 3, SCC-56) | the corpus at M-CAL | T71-3; file g's bars |
| `bar.<barId>` | model | f | the verdict statistic of one registered owner bar — a `StatBarSpec`, a `NullModelSpec` or a `BenchBarDef` — generated per registration, no band: its verdict is the bar's own (V12 §2.1; reconciliation round 3, SCC-56) | — (ours) | the register's `measure` entries (V12 §3.11; V02 §3.10.10, V06 §8, V11 §8) |
| `frame.<table>.<column>` | geo | per its target metrics | a declared frame's value for one calibratable column: the frame target rows of the metrics its corpus run targets; `notApplicable` until M-CAL (V12 §2.1; SCC-56) | the corpus at M-CAL | the register's `corpus` entries (V12 §3.11; V11 §8) |
| `wall.barrierShare` | geo | f | closure edge length ÷ the enclosure's perimeter; a town without a curtain is `notApplicable` | MFCG (descriptive: its shore closures); the corpus at M-CAL | item 106's use of natural barriers |
| `grid.r4`, `grid.axis` | geo | f / deg | inside a region (for a paired bar the ruin's outline, V12 §3.6b; otherwise the enclosure), ways or galleries resampled at 10 m steps; z = e^{4iθ} per step weighted by its length ℓ; R = \|Σ ℓ z\| ÷ Σ ℓ; axis = arg(Σ ℓ z) ÷ 4 folded into [0°, 90°); fewer than 20 steps → `notApplicable` | — (ours: a ruin against the town above) | item 109 (c)'s distinctness bar |
| `ruin.blockArea` | geo (underground profile) | m | the faces of the gallery graph — every gallery in every state, nodes within 2 m merged — inside the system's outline, median area; the town side: `block.area`'s built blocks inside the same outline dilated by 25 m steps (at most 100 m) until it holds ≥ 5 blocks, else `notApplicable` | — | item 109 (c)'s distinctness bar |
| `plan.rightAngle`, `plan.straight` | geo (underground profile) | f | on every chamber outline and every gallery's two wall lines (its centreline offset by half its width), vertices turning < 1° dropped: the share of the remaining vertices whose turn lies within 5° of ±90°; the share of wall length in straight runs ≥ 4 m (a run keeps within 2° of its first segment's direction) | — (a ruin against a cavern) | item 109 (i)'s structure test |
| `void.*`, `link.*`, `ladder.members` | model | — | per cavern or ruin system: present by kind, accessible (directly or through linked systems, item 109 (j) (3), (3b)), buildings over it (footprints whose base lies within `DigRule.reachM` above one of its chambers or galleries); per deep void (a connected component of a system's parts whose tops lie deeper than `DigRule.reachM` below every footprint over them): whether an access reaches it; per undercity: its first void source; per derived supply link (item 105 (a)): way distance, the good's `comfortM`, within comfort; per chain instance: flow order and spread; a collective record's member count | — | V12 §2.7b's indicators: items 104 (h) (8), 105 (k), 107 (g), 108 (f), 109 (i)–(j) |
| `crypt.present`, `crypt.areaM2`, `crypt.rank`, `crypt.joined` | model | f / m / f / f | per building of a church class (V11's crypt column `always` or `basement`): whether it holds `Basement.crypt` (V03), per class the share; each crypt's floor area; the crypts ranked by area, and the rank of the cathedral's (or great temple's) crypt, 1 wherever one stands; whether a (3b) link joins the crypt to a catacomb complex (V04's `cryptJoin`) | — | item 109 (k) (2): V11's T-V11-25, V04's T-V4-50 |
| `catacomb.count`, `catacomb.source`, `catacomb.rank` | model | f | complexes per settlement; each complex's source kind (V04's `CatacombComplex.source.kind`); whether the largest by `extentFloorM2` lies under the cemetery that serves the most burials | — | item 109 (k) (3): V04's T-V4-50, V06's T-V6-40 |
| `catacomb.extentM2`, `catacomb.fill`, `catacomb.blockedBy`, `catacomb.growthM2` | model | m / f / — / m | per complex keyed by its id (its source lineage, V04 §3.5.1): `extentFloorM2`, the high-water extent over every gallery and chamber in every closure state — silted, caved-in and sealed parts included, the author-deleted area excluded (J-V4.56); its ossuary `fill` in [0, 1]; its `blockedBy` reasons, reported; the area added at a step, with its cap `max(extent × ((1 + growthCapShare)^years − 1), growthFloorM2)` (V04 §2.3's `CatacombRule`, read per year, V06's J-V6.53) | — | item 109 (k) (4)–(6): V04's T-V4-51, T-V4-52; V06's T-V6-38, T-V6-39 |
| `raised.count`, `raised.generatedBelowCity`, `raised.reasonMissing`, `raised.overCap` | model | f | raised ways by kind × source; generated ways whose founding epoch's rung was below CITY — the rung of the `EpochRecord` of the epoch whose event created the way, read on the model side (file f item 244 stores none, ST-06; the profile carries none) — `source` `generated` only, so a declared way never counts and a way carried down from a city epoch counts by that city epoch's rung, never (V12C-50); generated ways without a recorded reason and its why rows; generated foundings made while the kind's generated, suppressed and declared ways already reach its cap (V06 §3.19.1 (1)–(2)) — the last three 0 by rule | — (ours only, descriptive and C) | item 110 (b), (f): the guards (V12 §3.7.4) |
| `raised.junctions` | geo | f | nodes of degree ≥ 3 joining a part ≥ 1 to part 0 anywhere but a ramp foot; 0 by rule | — | item 110 (f) |
| `retaining.lengthM`, `retaining.onFlatM` | model | m | retaining-wall length by source; generated wall length whose both sides lie below `terrace.slopeMin` — 0 by the §13.2 invariant, reported in the nightly statistics, never a harness row (V12C-36) | — | item 110 (a), (f) |
| `deck.buildings`, `tier.count` | geo / model | f | buildings with `onDeck` by deck kind; per stepped building its tier count | — | item 110 (c), (d) |
| `crossing.kinds` | model | f | (J-V12.64) per way class, the crossings of a retaining wall by kind — ramp or stair (the way segments' `stair` and `ramp` flags) — and the count of `W_STEEP_RAMP` reports (V11 §3.24.5); stages S4, S5, S9 and the levelling | — (ours only, descriptive) | the `ways.crossing` register line (V12 §3.11); the M4-110 group's report |
| `water.needRatio` | model | f | per town at the aqueduct reason's test: the demand D, the supply S and `needRatio` (V11 §3.24.6), and whether an aqueduct is a candidate — computed by the base's own water-balance function over the town's recorded inputs, never a second implementation; stage S6 | — (ours only, descriptive) | the `water` and `climate` register lines; V11 T-V11-33's bench |
| `ruin.survival` | model | f | per ruin system and persistence class (V04's `PersistenceClass`): the share of its laid elements standing — in no collapsed or filled closure state (§2.7's states) — read from the ruin's element records, beside V11 §3.23.5's share aged by V04's law at the ruin's age and cover; the underground stages (II.7) | — (ours only, descriptive) | the `under.ruin` `survival` register line; the V4-U5 panel's report |
| `shade.gap` | model | — | item 102 (g): the mean prosperity of sunlit minus shaded plots within districts holding both; descriptive — V05's island fixture and V06's drift fixture read it as their fixture bars | — | item 102 (g) |
| `street.detour` | geo | m | over 200 node pairs per town drawn by the metric's stream among degree-≥ 3 nodes at least 100 m apart, the way-graph distance ÷ the straight distance; per seed median | NG (§16 M-1's IMPROVEMENTS §7.2 rows) | detour index ⟨M-1⟩ |
| `street.cyclesPerKm2` | geo | m | independent cycles of the way graph (edges − nodes + components) per km² of the built outline | NG | cycles per km² ⟨M-1⟩ |
| `plot.minWidth` | geo (NG lots) / model (ours) | m | per plot the width of its minimum-width enclosing rectangle (rotating calipers, §17.1 (8)); distribution | NG | plot minimum width ⟨M-1⟩ |
| `fg.streetwallGap100` | geo | m | along dense frontages (as `fg.streetwall`), gaps longer than 2 m per 100 m of frontage | NG | streetwall gap ⟨M-1⟩ |
| `bldg.pairing` | geo | f | the share of footprints sharing ≥ 50 % of one edge with exactly one neighbour whose area lies within ± 25 % of theirs | NG (CONFIDENCE §6 #10) | adjacent-footprint pairing ⟨M-1⟩ |
| `draw.contrast`, `draw.hairline` | render | — | §8.2's contrast matrix and §8.3's hairline fidelity on §8.2's measurement render | — (our floors) | the M1 exit's contrast matrix and hairline fidelity |
| `ftg.ringBlock` | geo | m | areas of the faces FTG's ways close inside a ring, from ways alone; distribution | FTG (descriptive) | FTG face recovery (descriptive); plot depth, frontage and plot share withdrawn by item 49 ("the client receives none"), each a `known-defects.json` note |

**3.4.3 Metric versions.** A definition change is a major version: every baseline of that metric is re-measured through
`plat measure` at the new version and re-crossed as superseding rows, and the version change enters the next shift record
as a `baselineShift` (a gate that flips is declared, §13.5). Two versions of one metric never gate in one report: the
report reads the rows whose `metricVersion` equals the running registry's.

**3.4.4 The matrix — which reference gates which rung.**

| reference and pinned build | our setting | rungs | what gates (role as §13.5 or the volume states) | tier |
|---|---|---|---|---|
| MFCG 12710731 | the matched population (V12 §3.5.5), water `none`, parity preset `MFCG` for P rows; stress rows at `coast+river` | TOWN (size 40), CITY (80), METROPOLIS (130) | street signature, walled and ribbon shares, anchors, gates, recoverability and streetwall ⟨M-1⟩, markets ⟨M-1⟩, draw style (`ink`), labels (weakness), variety (floor); cover, footprints and time descriptive | nightly; milestone |
| FTG (server of each capture, request hash) | each capture's recorded population and water setting (§13.6 (2)), parity preset `FTG` | TOWN (BIG_TOWN), CITY (BIG_CITY); METROPOLIS per D-31 (none) | turning, junctions, runs, footprints, outline, towers and gates, water, trees (weakness), time (weakness), variety (floor); population and wealth descriptive | nightly; milestone |
| NG 1.2.2 (itch 11441280) | the base's bent cut on the same face shapes (M0, M1); a district opened at neighbourhood LOD (M5, §13.6 (2)'s search) | the neighbourhood band | bent-cut signature, junction angles (organic), blocks and template counts, court share, party walls, Moran (weakness), hood time | M0 spike; nightly from M1; M5 |
| VG 1.6.9 (19365073) | V07's settings under the `VG` preset | THORP, HAMLET, VILLAGE | V07 §7's rows | V07's tiers from V-M4 |
| Fantasy Manor (build 890) | the free frame, `FM` preset | the building band | V02 T-V2-31 | V02's tiers from M6c |
| Dwellings (itch 17195045) | the plan rung | — | nothing: research-side notes (V03 §7) | — |
| the corpus (M-CAL) | per sample frame, the historical pack | the rungs its frames cover | corpus *target* rows gate the historical pack only; under the default they are descriptive until the owner adopts the pack for that frame (V12 §3.10.3 R2) | M-CAL; nightly after |

**Item 110 is invisible to every parity row** (item 23; J-V12.54). No measured reference builds retaining walls, raises a
way or builds on a mole, pier or deck: 0 of 48 research inputs mention retaining walls, viaducts, aqueducts, elevated or
raised roads, deck plots or houses on a bridge (`docs/validation/bench/v12_rev_item110_grep.out`); "terrace" there means
row-house frontages, and FTG's moles and piers are stored as edges with no recorded buildings (the FTG coverage audit's
H17, H18). The four families are
extensions: V11 §3.24.0's switch table resolves them off in `presets.MFCG`, `presets.FTG` and `VG` (T-V11-21), `NG` resolving them as `MFCG` does (V1-3.15;
SCC-R3C-6), and
`presets.FM` resolves the stepped and deck families off too (X-V12-9), so every P row measures towns and buildings
without them. In the default preset they are on, and their metrics (`raised.*`, `retaining.*`,
`deck.*`, `tier.*`) are ours only — descriptive or C, never a §13.5 row. V06's growth parity (a history's raised-way
prevalence within ± 15 % of the one-click city's) compares ours with ours and stays V06's.

### 3.5 The band arithmetic and the parity run

**3.5.1 Estimators.** A reference's per-seed statistics s₁ … sₙ give its spread [a, b] and centre c (the median):
n = 1 → a = b = c (`single`); 2 ≤ n < 10 → [min, max] (`minmax`); n ≥ 10 → the 10th and 90th percentiles by linear
interpolation between order statistics (Hyndman and Fan's type 7; `type7`). With n i.i.d. draws [min, max] covers on
average (n − 1) ÷ (n + 1) of the population — 0.82 at n = 10 — so at ten seeds the two estimators aim at the same
interval as §13.5's [p10, p90] (V12 §12; J-V12.3).

**3.5.2 Scalar target bands.** For a `positive` metric: lo = min(a × 0.9, c × 0.85), hi = max(b × 1.1, c × 1.15) — the
union of §13.5's rule and its single-value ± 15 %, so the band is never narrower than a single value's and n = 1 reduces
exactly to §13.5's single-value rule; then lo ≤ c − `absFloor` and hi ≥ c + `absFloor` are enforced. For a metric of sign
`any` (signed angles, Moran's I): w = max(b − a, `absFloor`), lo = a − 0.1 w, hi = b + 0.1 w. Ours is the median of our
per-seed statistics t₁ … tₘ; a target row passes when lo ≤ ours ≤ hi (J-V12.6).

**3.5.3 Distribution target bands.** The reference's own seed-to-seed spread is the 90th percentile (type 7) of the
two-sample KS distances over its n(n − 1) ÷ 2 seed pairs (n = 2: the one value). Ours is the median, over every pair (our
seed j, reference seed i), of KS(tⱼ, sᵢ) — single seed against single seed, as the reference's spread is measured — and the
row passes when ours ≤ 1.25 × that spread (J-V12.7). At n = 1 there is no spread: the ceiling is the two-sample KS critical
value c(0.01) × √((n₁ + n₂) ÷ (n₁ n₂)), c(0.01) = 1.628, with n₁ the element count of the one reference seed and n₂ that of
our median-sized seed (by element count), and the row compares our median single-seed distance with it, as for n ≥ 2.

**3.5.4 Weakness, descriptive and declared exceptions.** A weakness row compares ours (the median) with its one-sided
bound and margin as §13.5 states it; a descriptive row is reported and gates nothing; a row whose band §13.5 or a
volume declares as an exception (the organic turning's 0.5–1.5 × FTG; V02's χ² and KS clauses for Fantasy Manor's small
sample) carries that band in its registry entry as `band.override`, and the report prints "declared exception" beside it.

**3.5.5 The parity run, step by step** (`plat parity --tier nightly|milestone [--html] [--csv]`):
1. Load `baselines.json`; re-run checks C1, C5, C6 and C9 against the last committed hash; select rows whose build equals
   their reference's pin and whose `metricVersion` equals the registry's.
2. Resolve each row's setting: for MFCG rows the **matched population** — the population whose expected non-hinterland
   building count equals the reference's median building count at that size, round(3.4 × count ÷ (1 − h)), with §12.2's
   3.4 persons per building (core plus hinterland) and h the hinterland share of buildings measured on B-CITY-lite at that
   rung, solved once per rung at each milestone and recorded in the report's `setting` (MFCG exports no farmsteads, so
   matching the whole count would give our core fewer buildings than MFCG's; J-V12.8); for FTG rows the capture's recorded
   population; for NG rows the districts `ng-counts.json` records from §13.6 (2)'s search (k and the address), so the
   nightly never repeats the search; for VG and Fantasy Manor rows V07's and V02's settings.
3. Generate our towns on `bref/<ref>/<rung>/<water>/<i>` (20 per setting nightly, 100 at a milestone) once per preset arm
   (`PresetArm`, V12 §2.1) the setting's rows need — the reference's own preset for P rows, `MFCG` or `FTG` (T23-1), `NG` (V01's T-V1-31), `VG` (V07's T-V7-23) or `FM`
   (V02's `fm.*` rows, T-V2-31), and `'default'` for O and C rows (reconciliation round 4's continuation, SCC-R3C-6) — so a setting with both
   kinds of rows generates two arms (V12 §6 counts them).
4. Per town: `measureInputOf` and the `geo` metrics; the `model` and `trace` metrics from the bench statistics; the
   `render` metrics on the nightly and milestone tiers only; the `timing` metrics only inside §12.1's timing phase.
5. Per row: per-seed statistics → ours → the band of V12 §3.5.2–§3.5.4 → a verdict.
6. Write the `ParityReport` (V12 §3.13's canonical form), its dashboard and its CSV; at a milestone, store it at
   `plat/goldens/parity/<milestone>.json` and name it in the `MilestoneRecord` (§13.3).

**3.5.6 Verdicts.** `pass`, `fail`, `reported` (§13.5) and two more (BCR-V12-2): `notApplicable` — the setting lacks what
the metric requires (a coastal row on a dry seed; a scale-needing metric on a relative input), which gates nothing and is
counted; and `missingBaseline` — an ⟨M-1⟩ row with no baseline, which counts as `fail` by §13.5's ⟨M-1⟩ rule until M-1
records it descriptive in `known-defects.json`. A corpus *target* row is evaluated under its historical pack (gating it,
V12 §3.10.6 A2) and, under the default, reported as `reported` beside that verdict until the owner adopts the pack for its
frame (V12 §3.10.3 R2); a failing corpus row therefore never fails a milestone's parity exit under the default.

### 3.6 The correlation harness — every "above a random baseline" bar

T71-3 and file g's random-baseline bars (items 103 (e)–(f), 104 (g), 104 (h) (8)'s closeness, 105 (k)'s distances, 107 (g)'s
coverage and spacing) all say the same thing: a soft rule shows as a measured shift against a random placement, never as a
guarantee. Item 102 (g) is not one of them: its bar is a fixture — an island over a uniform district, the shade strip
poorer by the declared weight within tolerance — owned by V05 (its island fixture) and V06 (the drift fixture); prosperity
is a field, and permuting plots does not permute shade, so no null exists for it and `shade.gap` is a descriptive metric
(V12 §3.4.2). File g's other tendency shapes run on V12 §3.6b. `plat nullmodel <spec | all>` is their one implementation;
each bar's owner registers a `NullModelSpec` (V12 §2.7) and the coherence pass's §13.2 text cites it (BCR-V12-13). Where
the owner states the pass rule (V11's T-V11-12 – T-V11-14), the spec carries it as `pass` and `ownerBar` (J-V12.48).

**Towns.** A spec whose settings B-CITY covers reads B-CITY's nightly towns — the owner's count per rung (V11's 200), else
the first 50 — which the nightly generates anyway, so the bar pays only for its permutations (J-V12.40). A setting B-CITY
lacks (a custom-chain fixture, a forced site, a METROPOLIS web setting beyond B-CITY's) draws
`null/<spec>/<rung>/<water>/<i>` under the spec's preset.

**Per town:**
1. The members M: the placed uses of the subject's classes. With fewer than `minMembers` (default 1 on the pooled route,
   3 on the rank route), or without a feature the spec `requires` (a river for `downstreamShare`), the town is skipped and
   counted.
2. The eligible sites of each scope unit (a block, a district, or the town): `hardNeeds` — plots meeting every hard need
   of the subject's siting profile (V11 §2.3; a watermill's water, a quay's shore), so the null tests the soft pulls and
   never the physical ones; `sameSizeClass` — plots within the class's template area range; `anyPlot` — every built plot.
   The members' own plots are eligible. `servedShare` and `nnSameKind` run at scope `town` only (a district or block
   permutation conserves them; registration refuses otherwise).
3. S_obs, the statistic on the members' plots.
4. For k = 1 … K (20): per scope unit, draw as many eligible plots as the unit holds members, without replacement, from
   the testkit stream `null/<spec>/<rung>/<water>/<i>/perm` (V12 §3.13); S_k on them.
5. **The rank** u = (#{S_k < S_obs} + U × (#{S_k = S_obs} + 1)) ÷ (K + 1), with U uniform from the testkit stream
   `null/<spec>/<rung>/<water>/<i>/tie` and S negated when the spec expects `lower`. With no pull, u is exactly uniform on
   (0, 1) however discrete the statistic — the randomised tie-break of §13.2's faithfulness campaign, which records that
   without it a perfect regenerator fails on discrete statistics (J-V12.12).

**The pooled route** (`shareWithin`, `downstreamShare`, `downwindShare`, `prestigeShare`: members counted on indicator
plots). Per scope unit the null count is hypergeometric — m members drawn from its E eligible plots, G of which satisfy the
indicator — and a town's null is the convolution of its units'; the pooled null distribution is the convolution over the
counted towns, computed in integer-indexed doubles in town order with a fixed summation order (V12 §3.13). The bar passes
when P(pooled count ≥ observed) ≤ `alpha` (0.01; for `expect: 'lower'`, P(pooled count ≤ observed)) and, where the spec
states `minShift`, the pooled observed share exceeds the pooled null mean share by at least it. The headroom lint of
V12 §2.7 refuses a spec whose indicator is nearly always true under the null.

**Across towns (the rank route).** The **rank rule** passes when the share of counted towns with u > 0.5 is at least
`townShare` (0.70) and the median u is at least `medianU` (0.60). Its exact p-value, for a `holm` family, is
P(Binomial(n, ½) ≥ the count of towns with u > 0.5), since u is uniform under the null; the pooled route's p is its tail. A
bar that states its own margin (T71-3's 0.15 of the prime-frontage share, §13.7) uses the `margin` rule — the median over
towns of S_obs − mean S_k at least that value; a `holm` family (V11's T-V11-12: each shift significant at p < 0.01,
Holm-corrected) runs Holm's step-down over its specs' p-values.

**Calibration (executed; seeded; our own code).** The rank rule passes chance 0.000 – 0.005 on normal statistics and on
six discrete fixtures (members m ∈ {1, 2, 3, 10}, base shares q ∈ {0.3, 0.5, 0.85}), and passes 0.412 / 0.927 / 0.993 at
planted shifts of 0.5 / 0.8 / 1.0 standard deviations (`docs/validation/bench/critique_v12_nullrule_rank_power.out`); the
first rule of this volume (z > 0 in 70 % of towns, median z ≥ 0.2) passed chance 0.58 – 0.98 on few-member shares and is
kept only as history (`critique_v12_nullrule_discrete.out`; `v12_nullrule.py`). The pooled exact test holds its size at
0.002 – 0.015 and reaches a pull of 0.3 with power 0.705 (q 0.3, m 1), 0.384 (q 0.5, m 1), 0.905 (q 0.5, m 3) and 1.000
(q 0.3, m 10), where the rank rule gives 0.302, 0.170, 0.535 and 1.000 (`critique_v12_pooled_exact.out`); at q 0.85 no
rule sees a 0.3 pull (≤ 0.09), hence the headroom lint. A tendency a reader can see ("in most river towns") passes, chance
does not.

**Verdict and confirmation (V12C-07; J-V12.47).** A bar that fails on its towns is reported `suspect`, never yet a
failure: it re-runs once on a fresh family at twice the towns — `null/<spec>/<rung>/<water>/c1/<i>`, or the next B-CITY
towns of its settings — and passes if the re-run passes ("pass on confirmation"). Only when both fail is the verdict
`fail`. The seeds are fixed, so a verdict holds for the table version, and the confirmation runs at most once per (spec,
table version). Executed (`docs/validation/bench/v12_rev_confirm.out`): at a real 0.8-standard-deviation shift the first
run passes 0.934 and both fail 0.0015 of the time — 0.06 false fallbacks expected over 40 such bars per table version —
while under no pull the final pass rate stays 0.0025.

**Pre-decided fallback** (the spec's default; a bar's owner may state its own): the family or pair weight behind the pull
doubles once — clamped to its column's declared range top, and a value already at the top goes straight to *not produced*
— a mechanism change, recorded as a `fallback` run (V12 §3.7); the bar re-runs; still failing, the bar is reported "not
produced" and enters `known-defects.json` (§13.7's not-achieved rule). A fallback never moves an owner-stamped cell and
never crosses an owner-stamped minimum (V12 §3.7.2).

**The statistics** (`StatSpec`, V12 §2.7): distances are along the way graph from a plot's access point, metres, built per
part (V12 §3.4.2); `meanDistTo` the members' mean distance to the nearest target (the target class's access points, a
market square's edge, a gate, a quay face; `water` and `wall` Euclidean to the nearest face); `shareWithin` the share
within `radiusM`; **`servedShare`** (item 103 (f); SCC-04) the share of the subject class's coverage units holding ≥ 1
member, the unit read from the class's compiled `profile.coverage` (V11 §2.3: `unit`, `per`) and each unit taken as V11
§2.3 defines it at a plot: `district` — the town's districts of ≥ 30 households (a smaller district is no unit), served
when a member's plot lies in it; `parish` — the cells of the parish partition derived as V11 §2.3 states (the Voronoi
cells of the placed members of the classes counted as churches, V11 §3.23.8's list, over residential land; one cell per
district before any church stands), derived from the town's churches as they stand and held fixed while the subject's
members are permuted, served when a member's plot lies in the cell; `walk` — the residential plots (those holding ≥ 1
household at S10a, §4.7), each served when a member's plot lies within the disc of radius `per` m about it; `households`
— the residential plots, each served when a member lies within the disc of radius √(`per` × a_res ÷ π) about it, a_res its
district's residential plot area per household (S10a's derived value); each disc counted as V11 §2.3 counts it (the 16 m
raster). Shares are unweighted counts of units. A class that itself makes the parish partition (a church class whose unit
is `parish`) would be served in every cell by construction, observed and permuted alike, so for it the unit is read in
its `households` form with the same `per` (J-V12.59). A spec with `unit: 'district'` reads the district unit whatever the
class's row says — item 105 (k)'s dispersal row (V11 T-V11-18), which speaks of districts (J-V12.60);
`nnSameKind` the median distance to the nearest other member; `downstreamShare` the share of members whose
`ContextVector.upstream` (§2.5: 0 upstream … 1 downstream) exceeds the household-weighted median of the residential
plots'; `downwindShare` the share whose `ContextVector.upwind` lies below that median (§2.5); `prestigeShare` item 71's
prime-frontage share (T71-3's definition); `flowOrder` the share of a chain's instances whose resource node lies farther
from the principal market than its final seller (item 104 (h) (8)); `chainSpread` the mean way distance between the in-town
nodes of a chain instance, the chain's other nodes held where they stand while one node's plot is permuted (item 104 (g):
"a chain's nodes sit closer than a random baseline"); `meanDistToPartners` a member's mean way distance to its bound link
partners of the named role — the consumers of its dominant output, its providers, its inputs' providers or its demand's
consumers — read from item 105 (a)'s derived links through the explain query at the bench level, the partners held where
they stand while the member's plot is permuted.

**On a corpus map** the statistic runs in the spec's corpus `variant` — buildings carrying a `use` (V12 §2.2), the null
drawing among the map's buildings (`anyPlot`), Euclidean distances where the map has no way graph — and a corpus target
row is compared with OUR statistic computed in the same variant as a `geo` metric on our `MeasureInput` (buildings with
`use`, Euclidean, `anyPlot`), never with the model statistic, so like is compared with like (J-V12.5; V12C-17);
`downstreamShare` and `downwindShare` need a context vector and are `notApplicable` on a corpus map.

### 3.6b Share, sweep, paired and two-sample bars

`plat statbar <spec | all>` runs every `StatBarSpec` (V12 §2.7b) on towns of its levels under their presets, seeds from
`null/<spec>/…` for pooled rules and `sweep/<spec>/…` for ordered ones (V12 §2.4); instances come from the bench
statistics and the `void.*`, `link.*`, `ladder.members`, `crypt.*`, `catacomb.*` and `raised.*` metrics (V12 §3.4.2).
Towns are drawn in steps of 50 per level up to `seeds.max` until the rule's minimum is met; a bar still short is
`insufficient`, which gates as a fail naming the shortfall, so its owner adds a fixture level instead of the bar passing
on too little. A spec with `stopAfter` regenerates each town only up to that stage, on the golden tooling's stage
isolation (§6.4; V12 §3.7.7), so a site-stage bar or a raised-way bar never pays for a whole town. A level's `site`
override enters as a frozen S1 output through the same tooling — the relief class, the geology, the ore share, a ravine
across the frame — and a forced ruin or cavern source, a population sweep or a landmark enters as a fixture record of the
frozen manifest (V12 §1b's dossier table) or a recipe declaration, so no test-only branch enters the shipped generator
(J-V12.35). **Levels that cannot run:** a level whose generator has not landed (`requires: 'V07'` for THORP, HAMLET and
VILLAGE until V-M4 opens caverns and ruins at every rung, item 109 (j) (1)) and a population level outside the port's
range [1 500, 120 000] (§12.2; item 108 (f)'s × 0.5 of a small TOWN or × 2 of a large METROPOLIS) are `notApplicable`,
reported and skipped — never `insufficient`, never a failure.

**Precedence (J-V12.48).** Where the owning volume states a bar's pass rule, seeds or tolerance, that statement wins and
the spec carries it as parameters (`most.share`, `rate.tolerance`, the `margin` and `holm` routes of V12 §2.7, the seed
counts); the rules below are the defaults for a bar that states none. The unit a g item names binds the owner too: item
109 (j) (5) speaks of *voids*, so V04's T-V4-54 is read per deep void (X-V12-13).

The pass rules (calibration executed: `docs/validation/bench/v12_sweeprule.py` → `.out`, with instances independent;
`v12_rev_clustered.py` and `v12_rev_confirm.py` → `.out`, with instances of one town sharing a town effect; seeded, our own
code):

* **most** — the indicator pooled over the levels' instances; pass when the pooled share is at least `share` (default
  2/3; an owner's 0.70, 0.75 or 0.80) over at least `minEffective` (100) **effective** instances from at least 20 towns,
  **and** at least 70 % of the towns holding ≥ 3 instances have a share of at least 1/2 (the town clause; skipped when fewer
  than ten towns hold three). Effective instances are n ÷ (1 + (m̄ − 1) ρ̂): m̄ the mean instances per town and ρ̂ the
  one-way analysis-of-variance estimate of the intraclass correlation, clamped to [0, 1]; towns are drawn until the
  effective count reaches the minimum. Executed with independent instances: at 100 a true share of 0.75 passes 97 % of the
  time and 0.80 99.9 %, 0.60 9 % and 0.55 1 %. With a town effect of ρ = 0.3 and 1 – 8 instances per town the raw 100-instance
  rule passed 0.55 in 5 % of runs; with effective instances it passes 0.55 in 0.9 %, 0.60 in 8 %, 0.75 in 97 % and 0.80 in
  99.8 % — the independent rule's behaviour restored (`v12_rev_confirm.out` (B)). "Most" therefore means clearly most — the
  two thirds the owner's sittings use (§13.6 (6)) — a coin-flip placement fails, and a handful of towns with many instances
  cannot carry the bar (J-V12.28, J-V12.50).
* **floor** — over deep voids (V12 §2.7b: connected components, so one access that opens a whole system counts once), at
  most the first three per town in id order, at least `minEffective` (100) effective units from at least 20 towns: pass
  unless the deflated count (y ÷ deff of n ÷ deff, deff the design effect above) would have a one-sided exact binomial
  probability below 0.01 were the true share exactly the floor. Executed at a floor of 0.50 with 50 towns, 1 – 3 deep
  voids each and ρ = 0.3: a true share at the floor fails 0.9 % of the time with the deflation (2.2 % without), 0.45 fails
  6.8 %, 0.40 26 %, 0.35 57 %, 0.30 87 %; with 70 towns 0.9 %, 8.9 %, 37 %, 76 %, 96 % (`v12_rev_clustered.out`). The floor
  is a bound the owner's rule sets (item 109 (j) (5)); a design whose expected share sits on it is the designer's error, so
  the rule is lenient at the floor and strict below it.
* **rate** — pass when the two-sided exact binomial p against the expected value is at least 0.01, over at least 200
  instances (`tolerance.kind 'exact'`), or when the observed rate lies within k standard errors of it (`'se'`, V04's
  ± 3 s.e.). Executed for the exact form: a right rate fails 0.7 – 0.8 %; a rate off by half fails 84 % at 100 units and
  99.5 % at 200, off by a third 35 % and 75 %. The expected value is a cell or a **derived value** from a named pure function
  of `@plat/testkit/expected` over the tables at the running version (V12C-31): `ruinShare(tables)` = w_ruin ÷ (w_ruin +
  w_cavern) of V11's void-source rank weights, exact on the fixture that forces one qualifying ruin and one qualifying cavern
  per undercity (V04's T-V4-58: "`w_ruin ÷ Σ w`"); `cavernChance(tables, level)` = min(cap, chance(relief, geology) ×
  (mining ? boost : 1)) from the S1 relief and geology rows (registry row 9, g item 109 (a)) and `under.systems`' cavern row
  (row 59: the mining boost and its cap), with V11's `miningCellShare` deciding whether the site holds mining (V11 §3.23.1;
  reconciliation round 1, SCC-24), the level's site fixing relief, geology
  and mining.
* **presence** — at each level N = min(500, ⌈5 ÷ p⌉) towns, p the design chance there (a cell or `cavernChance`); pass when
  every level holds at least one instance. P(none at a level) ≤ 0.0066 for p ≥ 0.01 (executed); a level whose chance is
  below 0.01 runs on its fixture site with the source forced, so p is the forced chance. At p = 0.02, N = 250.
* **trend** — levels in order; the Cochran–Armitage trend z (scores 0 … L − 1) at least 2.326 (one-sided α 0.01), and no
  reversal: no adjacent pair whose adjusted rates (y + 0.5) ÷ (n + 1) fall by more than two standard errors. With `bins`,
  the units are pooled across the levels and binned (buildings over a void: 0, 1–2, 3–5, 6–10, 11–20, 21 and more); a bin
  under 20 units merges into the next lower bin. Executed: item 109 (a)'s relief rows (cavern rates 0.07, 0.148, 0.23,
  0.375 under an independence approximation) pass 95 % at 50 towns per level and 100 % at 100; no effect passes 1.05 %
  to 1.25 %; a real trend with one flat step 85 % at 100 per level; access against buildings over, at two sets of dig
  and opening rows, at least 99 % at 20 voids per bin, and no effect 0.85 %. Defaults: 50 towns per level, 20 units per bin.
* **higherWith** — per stratum `perCell` towns with the factor on and off; the Cochran–Mantel–Haenszel z at least 2.326
  and no stratum where the with-rate falls below the without-rate by more than two standard errors. Executed: the mining
  boost (1.4, capped 0.9) passes 96 % at 200 towns per cell, 70 % at 100, 38 % at 50; no boost 1.2 %. Default 200 per
  cell — cheap, because a cavern's existence is settled at the site stage (S1 and II.7.6's existence draw; `stopAfter`), so
  the bar generates nothing past it. The mining factor at the site stage is `SiteResources.ore` or the dossier's mining
  deposits (DR-V8.3); the roster's mining class, drawn later, is V04's conformance bar, not this one.
* **exactMonotone** — a property, no statistics: per fixture and per record (`identity: 'record'` — a `CatacombComplex` by
  its id, which keeps its source lineage across derivations, V04 §3.5.1; a collective record by its id), the quantity at
  each step at least its value at the step before, and every record present at a step present at the next; 0 violations.
  The sequence is either `levels` (a population sweep on one seed, `sweep/<spec>/any/<i>`) or a **step script** run by
  the harness's step runner on the fixture document — `epoch` (V06's engine), `regenerate`, `{ rederive: S1 }` and
  `{ rederive: <the underground stage> }`, `{ newRandom: 'system' }` on the catacomb system, `upgradeReplay` across an
  output version (§7.5), `{ dossierEvent: 'burial' }` (a dossier event adding burials), `extendGrowth` — the base's own
  events and commands, never a test-only path. Author edits never appear in a script: the ratchet binds derivations, not
  the author (J-V4.56). With `where: 'stagnant'` (the `fill` form) a step counts only where the record's `blockedBy` is
  non-empty and its extent held. The runner also runs each fixture's **author-delete probe**: deleting n grid nodes lowers
  `extentFloorM2` by exactly their area, and no later step re-digs a tombstoned node.
* **exactBound** — per record and step, `catacomb.growthM2` ≤ its cap `max(extent × ((1 + growthCapShare)^years − 1),
  growthFloorM2)` (V04's `CatacombRule`, read per year over the span, V06's J-V6.53); 0 violations.
* **paired** — per seed holding a ruin, the ruin's laid plan against the town above inside its outline on three
  measures: `ruin.blockArea` against `block.area` (differs when the ratio is at least 1.5 either way), `grid.r4` (differs
  when |ΔR| ≥ 0.15) and `grid.axis` (differs when the folded axes lie ≥ 10° apart; skipped for a ruin that took the
  shared-axis chance). Pass when each measure differs in at least 70 % of the seeds where it applies and every seed
  differs on at least min(2, applicable) measures — item 109 (c)'s "never a copy of the streets overhead". The thresholds
  are §13.7 rows (BCR-V12-12); the ancient-culture rows that must clear them are V11's, the plan V04's. A ruin's stepped
  monument is never read by these measures (V12 §2.2).
* **twoSample** — ruin systems against cavern systems on `plan.rightAngle` and `plan.straight`: pass when, on each
  metric, the median over ruins exceeds the 90th percentile (type 7) over caverns, each side at least 30 systems. A built
  plan clears it by construction; a ruin laid with the cavern's organic outline does not.
* **noRegression** — the same seeds in two arms, the reference arm with the `off` overlay applied, each cell at its named
  off value (common random numbers; V11's round 2, SCC-34);
  pass when |median over towns of (default − reference)| is within the tolerance (a share: 0.05, a §13.7 row).

**The confirmation stage** applies to every statistical rule here (`most`, `floor`, `rate`, `presence`, `trend`,
`higherWith`, `paired`, `twoSample`, `noRegression`) as to V12 §3.6: a failing bar is `suspect` and re-runs once on a fresh
family (`…/c1/…`) at twice the towns; only a second failure is `fail`. The properties (`exactMonotone`, `exactBound`) are
exact and need none.

**The bar map** — file g's tendency bars as the coherence pass writes them into §13.2 (their owners register the specs
with these rules and their stated parameters; the conformance clauses of the same items stay their owners' checks, V12 §1):

| g bar | rule | indicator or statistic | levels and counts | owner's bar (its parameters win) |
|---|---|---|---|---|
| 103 (e): a nuisance's sensitive members farther from its emitters than random | null, `holm` family T-V11-12 | `meanDistTo` (median) from sensitive-≥ 2 members to the nearest emitter of level ≥ 3, `higher` | B-CITY, 200 towns per rung | V11 T-V11-12 |
| 103 (e): tanneries downstream | null, `holm` family T-V11-12 (pooled exact); and most | `downstreamShare` of tanneries; per river town the tanneries' downstream share | B-CITY river towns, 200 per rung; most at 0.80 of towns (the owner's) | V11 T-V11-12 |
| 103 (e): the thieves' den farther from the law than random | null, `holm` family T-V11-12 | `meanDistTo` the nearest law member, `higher` | B-CITY, 200 per rung | V11 T-V11-12 |
| 103 (e): shops nearer the market than random | null, `holm` family T-V11-12 | `meanDistTo` the nearest market edge, `lower` | B-CITY, 200 per rung | V11 T-V11-12 |
| 103 (f): a coverage class's served share above random | null, `margin` 0.1 (the owner's) | `servedShare` per coverage class, each on its own compiled coverage unit (V12 §3.6; a `settlement`-unit class `notApplicable`), scope `town` | B-CITY, 200 per rung | V11 T-V11-13 |
| 104 (g), 104 (h) (8): a chain's nodes closer than random | null, rank | `chainSpread`, `lower` | CITY and TOWN custom-chain fixtures (V08's), 50 towns each | V11 T-V11-16 |
| 104 (h) (8): the flow order holds in most placements | most at 0.75 (the owner's) | `flowOrder` | as above, ≥ 100 effective chain instances | V11 T-V11-16 |
| 104 (h) (8): a compatible chain's in-town nodes within their links' comfortable distances in most placements | most | `withinComfort` over those links | as above | — |
| 105 (k): a multi-output producer nearer its dominant output's consumers; a shared provider's consumers nearer it; source-oriented nearer inputs, market-oriented nearer demand — each than random | null, rank | `meanDistToPartners` by role | B-CITY CITY, 200 towns | V11 T-V11-14 |
| 105 (k): the share of districts holding a dispersed class within tolerance of the base's | noRegression, tolerance 0.05 | `servedShare` with `unit: 'district'` per dispersed class (V12 §3.6); `off` = V11 §3.7.4's web off form (V11's round 2, SCC-34) | CITY and METROPOLIS, 50 towns each | V11 T-V11-18 |
| 106 (h) | none: fixtures; the enclosure (V12 §2.2) makes their measurements well defined, `wall.barrierShare` reported | — | — | V11 T-V11-19 |
| 107 (g): a coverage class's served share above random with the web on; a spaced class's nearest-member distance above random | null, rank (scope `town`) | `servedShare` per coverage class on its own coverage unit (V12 §3.6); `nnSameKind` | B-CITY CITY and METROPOLIS, 50 each | — |
| 107 (g): consumer-to-provider distance within `comfortM` in most placements | most at 0.70 (the owner's) | `withinComfort` over every link | B-CITY CITY, ≥ 100 effective links from ≥ 20 towns | V11 T-V11-14 |
| 108 (f): members rising monotonically across a population sweep | exactMonotone, `levels` | `ladder.members` per COUNT, QUARTER and GUILD record | the surveyed-dossier fixtures at population × 0.5, 0.75, 1, 1.5, 2 (outside [1 500, 120 000]: `notApplicable`) | V11 T-V11-17 |
| 109 (c), (i): a ruin differs from the town above | paired | V12 §3.6b's three measures | CITY on a fixture site with a forced ruin source, 50 seeds | V04 T-V4-45; V06 T-V6-37 |
| 109 (i): ruin plans beat the cavern baseline on structure | twoSample | `plan.rightAngle`, `plan.straight` | the ruins above; caverns at CITY on a soluble mountainous fixture site; ≥ 30 systems each | V04 T-V4-44 |
| 109 (a), (i): cavern frequency rises with relief | trend, `stopAfter` S1 | `present` cavern | plain, rolling, hilly, mountainous; 50 towns per level | V04 T-V4-55 |
| 109 (a): higher with mining than without, per relief class | higherWith, `stopAfter` S1 | `present` cavern | four relief strata × mining on and off; 200 per cell | V04 T-V4-55 |
| 109 (i): an undercity takes a ruin over a cavern at the ranked share | rate, `se` 3 (the owner's) | `ruinChosen` against `ruinShare` | CITY and METROPOLIS with one ruin and one cavern forced, ≥ 200 undercities | V04 T-V4-58 |
| 109 (j) (1): caverns and ruins at every rung | rate, `se` 3, 500 per rung (the owner's) | `present` cavern against `cavernChance`; `present` ruin against the forced source's chance | THORP … METROPOLIS on forced-geology and forced-source sites; the village rungs `notApplicable` until V-M4 | V04 T-V4-43; V06 T-V6-37 |
| 109 (j) (5): the access share rises with buildings over the void | trend with bins | `voidAccessible` | a forced-void fixture site, 40 towns per rung TOWN … METROPOLIS (the village rungs join at V-M4); once V06 lands, H-VOID's growth epochs join as units | V04 T-V4-49; V06 T-V6-34 |
| 109 (j) (5): depth keeps secrets | floor | `voidSealedDeep` per deep void against `DigRule.sealedFloor` | METROPOLIS on a forced deep-void fixture site, ≥ 100 effective deep voids from ≥ 20 towns, ≤ 3 per town | V04 T-V4-54 (read per void, X-V12-13); V06 T-V6-36 |
| 109 (k) (6): a catacomb's extent never shrinks, on every derivation | exactMonotone, `identity: 'record'` | `catacomb.extentM2` per complex | every epoch of H-100, of V06's 50 random trajectories and of H-METRO; the step script (Regenerate, Re-derive from S1 and from the underground stage, New random on the catacomb system, an upgrade replay, a dossier burial event, extend growth) on the surveyed-dossier catacomb fixtures; the author-delete probe | V04 T-V4-51; V06 T-V6-38 |
| 109 (k) (5), (6): a stagnant catacomb's fill rises while its extent holds | exactMonotone, `where: 'stagnant'` | `catacomb.fill` per complex | V06's stagnant and rank-held fixtures; H-100 | V04 T-V4-52; V06 T-V6-39 |
| 109 (k) (6): growth per epoch within the cap | exactBound | `catacomb.growthM2` per complex and step | as the extent row | V04 T-V4-52; V06 T-V6-39 |
| 109 (k) (6): at most one catacomb at TOWN; the CITY and METROPOLIS count within the bound; the largest under the largest cemetery; every catacomb under a cemetery or a CITY or METROPOLIS quarry ossuary, none under a church; the cathedral always crypted, with the largest crypt | none: conformance (V12 §1); `catacomb.count`, `catacomb.source`, `catacomb.rank`, `crypt.*` reported | — | — | V04 T-V4-50; V06 T-V6-40 (a), (c) as the epoch forms; V11 T-V11-25 |
| 110 (f) | none: conformance (V12 §1); `retaining.onFlatM`, `raised.junctions`, `raised.generatedBelowCity`, `raised.reasonMissing`, `raised.overCap` reported | — | — | base §13.2; V01, V02, V04, V06, V07 |
| 110 (b): a viaduct where a route's best course crosses a deep ravine | presence, `stopAfter` the raised-way stage | `raised` viaduct, `generated` | CITY and METROPOLIS on the ravine fixture site; N by the rule | base (`T110b.viaduct`) |
| 110 (b): an aqueduct where the water need exceeds the walled supply and a higher source lies in reach | presence, `stopAfter` the raised-way stage | `raised` aqueduct, `generated` | CITY and METROPOLIS on the spring fixture site | base (`T110b.aqueduct`) |
| 110 (b): an elevated road likelier with prosperity | trend, `stopAfter` the elevated-road stage | `raised` elevated, `generated` | CITY on the two-high-wards site at `intent.wealthLevel` 0.1, 0.3, 0.5, 0.7, 0.9; 100 towns per level | base (`T110b.elevated.prosperity`) |
| 110 (b): an elevated road likelier with dossier landmarks on high ground | higherWith, `stopAfter` the elevated-road stage | `raised` elevated, `generated` | CITY on the same site; the fixture dossier with and without a high-ground landmark (DR-V8.8); 200 per cell | base (`T110b.elevated.landmarks`) |

**The raised-way bars (V12C-41; J-V12.44).** Only two clauses of item 110 (b) are leanings — the elevated road's
"likelier with prosperity and with dossier landmarks on high ground"; "no reason, no raised way", the rung gate and the cap
are conformance (V12 §1) and guards (V12 §3.7.4), and an "off" arm of a viaduct or aqueduct would measure that
conformance, never a tendency. So:
* **`T110b.viaduct`** runs `presence` on a forcing site: a frozen S1 output whose ravine runs across the whole frame, so
  every primary's best course crosses it deeper than `viaduct.minDropM` and the detour costs more than the span for every
  value of the span cost row's range — p is then the table chance at the rung, and a cheap detour cannot make the rate
  fall below it. Registration checks this on the frozen site (the route solver's costs at the row's range ends) and
  refuses a site where a detour could win.
* **`T110b.aqueduct`** runs `presence` on a site whose frozen S1 output and roster give a water need above the walled
  supply and one higher spring in reach, the era and culture rows neutral.
* **`T110b.elevated.prosperity`** runs `trend` over the settlement's prosperity input `intent.wealthLevel` (§7.7; DR6 is
  the dossier's route to it) on a site with exactly two high wards and one lower district between them, so there is one
  candidate and the cap never binds.
* **`T110b.elevated.landmarks`** runs `higherWith` on the same site, the factor the fixture dossier's landmark on high
  ground at one end of the candidate link (V11 §3.24.2's `elevated.landmarkFactor`, read by §3.24.7 (4)'s high-ground
  test) against the same dossier without it, traced through DR-V8.8. The `raisedWays` chances and factors it and the
  prosperity trend read are V11 §3.24.2's (`elevated.bandFactor` by band, poor 0).

Their fallback is V12 §3.6b's default bounded by the owner's floor (V12 §3.7.2): a presence bar still failing with its
chance at the floor is *not produced*, and generation is never switched off.

**Pre-decided fallback** (the default; a bar's owner may state its own): as V12 §3.6's — after a confirmed failure, the
row that drives the tendency moves once (a weight doubles; a chance's odds double within its column's range; a mechanism
threshold takes its volume's stated second value), clamped to the column's range and never across an owner-stamped cell
or minimum, as a declared `fallback` run (V12 §3.7), and the bar re-runs; still failing, it is reported *not produced* in
`known-defects.json` (§13.7). A bar never passes by relaxing its rule (J-V12.26).

### 3.7 Tuning runs — table-version bumps with declared shifts

**3.7.1 When a run opens.** (a) A P row fails its band at a milestone's parity run and its row names a tuning route
(§13.5's street-turning fallback sets `headingSigma` so the organic median equals FTG's); (b) a register entry's
confirming measurement fails and its fallback moves a table value (a `fallback` run: §1.1's doubled rung modifiers,
§13.7's O18 (j) frontage CV, item 24's market-siting weights, item 30's reach weights, item 71's prestige weight); (c) a
volume's calibrate-later constant falls due — an entry of `method: 'tune'` (V12 §2.6): V02 §3.10.8's measured-rate `FM`
entries at M6c, and V07's one measured-rate `VG` entry, `rules.race.densityPower@VG` (V07 §2.2a, §3.15), at V-M4, opened
there only when T-V7-23's accepted-share row misses its band — every other `VG` entry is code-read or `fixed:` and never a
run's cell (reconciliation round 4, SCC-80) — each a `reference` run on the preset's own entry, V12 §3.7.2 (3); item 34's
depth rows and `cut.flattenM` at M0 as `reference` runs on the bent-cut spike's S8 harness, the first product code that
reads them — at M-1 no product exists, so there the NG and MFCG distributions only cross as `Baseline` rows); (d) the
corpus stage (V12 §3.10). The calibration seat (implementer tier: it reads
only `plat/`) writes the run's spec to `plat/calibration/specs/<id>.json` — id, cells with bounds and step, targets,
guards, search, settings — and commits it before the first evaluation, so the objective is fixed before any result is
seen (J-V12.10).

**3.7.2 What a run may touch.** A spec is refused before any evaluation (`status: 'refused'`, naming the rule) unless
every cell: (1) is `calibratable: true` in the registry (V11 §2.1); (2) has a provenance source other than `owner`,
`owner-eye` (an owner pick moves only by the owner, V12 §3.9), `corpus` (the palette targets, V12 §3.10.7), `host` and
the provenance source `sf:⟨file⟩@⟨baseline⟩` (V11 §2.2, BCR-V11-21 — file f item 534: the owner's own program's rows pinned
to the port's baseline, the ladder table among them, item 108 (a); they move only when that baseline moves, V08), and
carries no `ownerRule` stamp (V12 §2.10). Item 110 (b)'s rung gate ("A TOWN gets them only
by declaration") is no cell at all: V11's `raisedWays` key admits only CITY and METROPOLIS rows (provenance `owner`, V11
§3.24.2), so no run can open a TOWN chance, and an `editTable` or a pack adding one is refused by V11's schema;
(3) is a default value, never a `presets.MFCG` or `presets.FTG` entry; a `presets.FM`, `presets.VG` or `presets.NG` entry only when a
register entry names it (V12 §2.6's `preset` target — a measured-rate entry awaiting its reference), and then only by a
`reference` run against that preset's own reference (`layer: { preset }`, V12 §2.5: V02 §3.10.8's free-frame run against
Fantasy Manor at M6c; V07's one run against VG at V-M4, on `rules.race.densityPower@VG` alone, V07 §3.15) or by a
`fallback` run applying that entry's own pre-decided fallback (V12 §3.7.1 (b): V02 §3.10.8's `hipInset` 0.5; for the `VG`
entry none — its fallback is `not-achieved` (V07 §3.15), so a rejected `VG` run leaves the entry at its value, reported to
the owner, and no `VG` fallback run exists; reconciliation round 4, SCC-80), either run touching no default
value and no other preset's entry; a preset entry no register entry names — one read from its reference's code
(`ref:… (code)`, V02 §3.10.8's layout families) or an off value with a `fixed:` note (V11 §2.2) — is never a run's cell; every `presets.NG` entry is a code-read value or a
switch's on value (V1-3.15; J-V1.98), so no `NG` run exists (reconciliation round 4's continuation, SCC-R3C-6). The
MFCG and FTG presets' reference values are never tuned, and the FM and VG presets' measured-rate cells are set only
against their own references or by their entries' own fallbacks (J-V12.11; reconciliation round 3, SCC-60); (4) lies in a table whose registry `readers` StageIds (V11 §2.1; the dist manifest's `stageReaders`, V11 §3.2.1 step 7 — a module id never counts; V11's round 2 (continuation), SCC-R1C-1) include a stage in the target metrics' `stages` (V12 §2.1), so no run reaches for an
unrelated knob; (5) keeps `lo`, `hi` inside its column's declared `range` and at or above any owner-stamped calibration
minimum — the CITY and METROPOLIS raised-way chances' minimum 0.02 (E1's possibility floor, reused so that one small-chance
constant exists) and the per-rung caps' minimum 1, each stamped `ownerRule: '110 (b)'`, so the owner's "raised ways for
cities is fair for the generator to generate" can never be tuned, fallen back or reconciled to zero (J-V12.42); a
calibration minimum binds runs, fallbacks and corpus packs, never the parity presets' extension zeros (item 23), a no-op
pin's overlay (V12 §3.7.8) or a user's own override; and (6) no other open run holds it. At most four cells per run. A
fallback's doubled or halved value is clamped the same way: to its column's range and never across an owner-stamped
minimum.

**3.7.3 The search.** `grid` evaluates every listed candidate (≤ 16). `golden` searches one cell on [lo, hi] by
golden-section, every probe snapped to `step`, the endpoints evaluated first, stopping after `maxIter` (≤ 12) probes or
when the bracket is under two steps. `coordinate` runs `golden` on each cell in the spec's order holding the others, for
≤ 3 rounds, stopping after a round in which no cell moved by a step. No gradient method: the objective is a statistic of
generated towns, noisy and stepwise.

**3.7.4 The objective and its guards.** Each candidate generates the train family `tune/<id>/train/<rung>/<water>/<i>`,
30 towns per setting — the same seeds for every candidate (common random numbers), so candidates differ by their values
and not by their towns. Score = Σ wₜ dₜ² + 10 × (guard flips), where for a target scalar row dₜ = (ours − (lo + hi) ÷ 2)
÷ ((hi − lo) ÷ 2) with V12 §3.5.2's band, for a weakness row dₜ = max(0, (bound − ours) ÷ margin) on the failing side,
and for a distribution row dₜ = ours ÷ (1.25 × the reference spread). A **guard flip** is any row passing in `before` on
the train seeds that fails with the candidate: every §13.5 row on those settings under its preset, the C bars of §13.2
that run on those towns, and every owner-rule bar (the owner's rules outrank parity: a run can never buy a parity number
with an owner rule). **The TOWN guard:** a run any of whose cells is a raised-way row (a chance, a cap, `viaduct.minDropM`,
the span cost) adds one TOWN setting to every candidate's evaluation, whatever its targets — 30 towns on
`tune/<id>/guard/TOWN/<water>/<i>` — where `raised.generatedBelowCity`, `raised.reasonMissing` and `raised.overCap` are C
bars that must stay 0 and a moved TOWN S4 or S5 isolated digest is a guard flip (J-V12.42). Ties go to the candidate
nearest `from` in steps, then to the lower value.

**3.7.5 Holdout and acceptance.** The chosen values run on the holdout family `tune/<id>/holdout/…` (30 per setting,
never seen by the search), and once on the guard's **fixture suites** (`GuardSet.fixtureSuites`): B-DOSSIER-lite's
generations with their dossier-primacy bars (T73-1 – T73-10, T85-1 – T85-2, T20-13, T88 on B-DOSSIER-lite, §13.8), the
owner-rule hook fixtures (T20-7 – T20-13, T63 – T72, T76-1 and the g items' fixture bars) and the two known-city fixtures'
structure lists (V12 §3.14) — about 2 – 3 CPU-min. Calibration never *targets* a dossier fixture but always *guards* it
(V12 §1b). The run is **accepted** when every target row passes its band on the holdout, no guard flips there and no
fixture-suite bar that passed before fails; otherwise **rejected** (`guardFlips` naming the bar), the cells stay at
`from`, and the register entry's pre-decided fallback applies —
if that fallback moves the threshold instead of a mechanism, the entry becomes `not-achieved` (§13.7). A run whose best
candidate is `from` itself closes rejected ("already at its best"). A run that exceeds `budgetCpuH` stops,
`aborted-budget`, applying nothing; it may be re-specified once with a narrower bracket.

**3.7.6 Emission.** An accepted run is released as one declared shift:
1. The seat writes the chosen values into the table's source (V11 §2.2) — into the cell's `presets.FM` or `presets.VG`
   entry for a `layer: { preset }` cell, the default untouched — with provenance `ref:<reference> <behaviour>`
   (a reference run — the behaviour matched is the anchor, §17.1 (6)), `own` (a fallback run) or `corpus` (V12 §3.10), and
   `evidence` = the target rows' baseline ids and the run id (V12 §2.10).
2. `plat tables compile` bumps the table's minor version (V11 §2.1: minor = a declared output shift).
3. The golden tooling computes the stage-isolated digests (§6.4); every stage whose digest moved gets a `ShiftRecord`
   with cause `{ kind: 'calibration', ref: <run id> }`, its statistics being the targets with the direction ours moved
   on the train seeds, its `d5SeedsChanged` listed; downstream stages get cascade records (§13.3).
4. The release carries the output-version bump (§6.4); existing documents replay under their own versions.
5. The register entry gains the run in its history (a cells row, V12 §2.6's `cells`, where the run changed the entry's target in place) and its new status; the release notes gain the metric's `plain`
   sentence ("lanes now bend {dir}: {ours} per 100 m, FTG's band {band}").
6. The first nightly after the release re-runs B-REF on the `bref` seeds and writes `after` into the run record; a
   target that passes on the holdout and fails on `bref` enters `known-defects.json` and opens one follow-up run.

**Feature switch-on (item 110; V12C-38; J-V12.54).** Item 110's four families ship switched off and are switched on by four
separate releases, upstream first. Each release registers its family's row sets in the default pinned table set for the
first time — before it, every document reads V11 §3.24.0's parity-neutral default, which is off (J-V11.12) — and ships
with its own `ShiftRecord`s and cascades of cause `{ kind: 'feature', ref: 'item 110 (b)' | 'item 110 (a)' | 'item 110 (d)' | 'item
110 (c)' }` (the base's `feature` kind, §13.3), so every shift names the one rule that moved it:
1. the `raisedWays` row set — S4, S5 and the stage that commits elevated roads. The isolated S4 and S5 digests of every
   THORP – TOWN golden stay unchanged: a moved one fails CI and is not a declared shift. Its records name every CITY and
   METROPOLIS golden where a reason arises (`raised.count` by kind, expected `up` there and `none` at TOWN), and, where they
   move, V05's two sky goldens, V06's H-100, K1 and K2, and the B-DOSSIER-lite towns carrying the water-system record (its
   factor on the aqueduct's chance, DR-V8.7).
2. the `terrace` and `retaining` row sets — S10 and S11's levelling and the district-edge source.
3. the `deck` and `deck.landmarks` row sets — S10's deck faces and deck plots; K1's golden moves here (its bridge's deck
   plots, V12 §3.14).
4. `roster.specialisations` — reachable only through the stepped class rows, so it moves only goldens that hold such a
   class.
Every bump leaves the `MFCG`, `FTG` and `FM` presets' goldens byte-identical (V12 §3.4.4). The release notes (V12 §5.5)
carry one plain line of new behaviour per bump beside the calibration section — for the first: "cities may now build
viaducts, raised roads and aqueducts where the ground or the water calls for them; you can remove any".

**3.7.7 The cost shortcut.** A candidate's towns are regenerated from the first reader stage of the cells' tables only
(the registry's `readers` StageIds, V11 §2.1: the manifest's `stageReaders`; a cell only an epoch phase reads re-runs the history from that phase; V11's round 2 (continuation), SCC-R1C-1), on frozen upstream outputs per seed — the golden tooling's stage isolation (§6.4) — which is
exact because no upstream stage reads the cell. A cell read at S0–S2 regenerates the whole town.

**3.7.8 No-op pins — one engine for every volume's item-110 pin (V12C-37; J-V12.43).** Item 110 (f): "with the terrace,
raised-way and deck-plot rows off, byte-identical to the base". Six volumes pin it (V02's T-V2-50, V04's T-V4-69, V05's
T-V5-15, V06's T-V6-65, V11's T-V11-31 and V07's village pin); each registers its suites on this engine (`NoOpPin`, V12
§2.13) and cites it, and the pin extends to item 110 (c)'s stepped rows, which the owner's list does not name but which a
pin that left them on would not isolate.
1. **"Off" is V11 §3.24.0's switch table** — one named off form per row set (its five rows: `terrace`, `raisedWays`,
   `deck`, `roster.specialisations`, `deck.landmarks`), each value stated there only and written per family by V12 §2.13's
   overlay; the same form is the table's parity-neutral default and the value the parity presets resolve (reconciliation
   round 2, SCC-35). Every off value lies inside its
   column's range, never an out-of-range sentinel; the owner-stamped calibration minimum of V12 §3.7.2 (5) binds
   calibration, not a pin's overlay or a preset (J-V12.43, J-V12.56). A pin's overlay sets its family's off values; the
   cells stay editable like any cell (everything is editable).
2. **The landing gate.** Every commit that lands item-110 code before its family's switch-on bump produces zero
   `ShiftRecord`s on the pin's suites: the code is present and inert.
3. **After switch-on.** At the family's bump the off-state digests are recorded as a parallel golden set under the overlay
   (`plat/goldens/noop/<id>/o<k>/`). CI runs the suites under the overlay nightly, and in the PR tier on the two PR golden
   seeds, and requires byte-identity with the set. A change whose cause is item 110 may never move the off-state set; a
   declared shift of any other cause re-records it, and its record must list, per stage, the same moved stages as the main
   set shows for the towns that hold no item-110 entity — so a leak of item-110 behaviour into the off state is caught
   even across unrelated shifts, and the set never goes stale at the first unrelated change.
4. **The code properties, asserted by name.** Item 110's draws come only from their own stream labels (§6.1); an entity
   kind with no instance is absent from the document and from its digest, never serialised as an empty array; no arena part
   is allocated for an absent raised way; an older record gains no written default — the reader supplies it.
5. **Tested** by T-V12-37: a planted draw on a shared stream fails the pin, a planted empty array fails it, and an
   unrelated planted table shift re-records both sets with matching stage lists.

### 3.8 Reference drift

`research/baselines/watch.py` runs at each milestone's start and weekly: it resolves each web reference's live build
(the itch build of MFCG, NG, VG and Fantasy Manor through the profiler's target resolver; FTG's server version as the
capture date and create-request hash) and appends a line to `research/baselines/drift.md`. On a change, the pin stays;
the capture plan runs its same formulas on the new build and the rows are added under the new build, reported beside
the pinned rows and gating nothing. **At the next milestone boundary the pin moves to the newer build** — we compare with
the product the owner can see — by the baseline seat, as a `ShiftRecord` with cause `baselineShift` that lists every row
whose verdict flips; the old rows stay as history (J-V12.13). FTG cannot be seeded and changes on its server silently:
its pin is a capture-date range, and when two of a size's three new captures fall outside the pinned rows' spread on
the same metric, the next boundary opens a new pin. VG's change of geometry for one seed between builds 19251041 and
19365073 (§13.5) is the precedent this rule answers.

### 3.9 The owner's sittings — one panel engine

**3.9.1 The registered panels.**

| panel | gate a rated pass claims | groups (pairs) | extras | spec owner |
|---|---|---|---|---|
| M1 | diagnostic (§13.6 (1)) | MFCG 30 (per rung five `none`, five `coast+river`), FTG 6 (three per rung, TOWN and CITY) | threshold strips due at M1; labels | base |
| M2b | "the base at parity" | as M1 (`lit` against FTG) | strips due at M2b; labels | base |
| M4 | "mastered" | as M2b; plus the **M4-110** SOLO group of six items (below), which confirms item 110's register lines and gates nothing of M4's claim | strips; the `house` pick (§13.6 (8)); labels | base; the M4-110 group V12 |
| M5 | the stage-2 gate | NG 20 (five per template), `preset: 'NG'` (V01's T-V1-32; SCC-R3C-6) | strips (S4 (d)) | base (V01's BCR-21) |
| M6 | "stage 3 at parity" | Fantasy Manor 20 | the ladder street (V02 §7.5 (2)) | V02 (BCR-V2-25) |
| V-M4 | the village at parity | VG pairs per V07 §8 | per V07 | V07 |
| V3-P6 | diagnostic: the plan rung's soft bands (V03 §8, P6) | DW 20: plans of six classes in three bands beside Dwellings houses of like size | — | V03 |
| V4-U5 | diagnostic: the underground reads (V04 §7); rated, it confirms the underground's `panel` register entries, the crypt and catacomb rows among them | SOLO 30: ten CITY and five METROPOLIS underground bands, each seed in the historical and the navigable mode, shuffled, each framed to hold the cathedral's crypt (or the largest church's) and the largest catacomb complex; questions `legibility` and `realism` (V04's "plausibility") | — | V04 |
| M6-sky | none: a descriptive set, never a gate (V05 §7) | NG 5: island close-ups in `hatched` beside Neighbourhood patches; question `reads`, subject "a floating patch" | — | V05 |
| V6-E7 | diagnostic: the histories read as historically faithful (V06 §12) | AB (`history`) 10: ten CITY seeds, each run through H-100's script and shown at its last epoch, against the same seed generated fresh at that epoch's population; questions `realism` and `legibility` | — | V06 |
| M-CAL (and each later run's `M-CAL/<layer>`, the same form, sat only when that run moved a cell; V12 §3.10.1) | the reconciliation decision (V12 §3.10.6) | AB (`reconcile`): per frame, five seeds per rung the frame covers, `none` water, before against after | re-offered owner-eye strips; the palette pick if V12 §3.10.7 finds a mismatch | this volume |

**The M4-110 group** (V12C-43; J-V12.45): six SOLO items inside the M4 sitting, about five minutes — K2 rendered once (its
authoring paths share a digest), and five CITY or METROPOLIS towns on V12 §3.6b's forcing sites showing between them a
viaduct over a ravine, an aqueduct on arches, an elevated road between high wards, a terraced hill ward with its retaining
walls, and a mole with deck buildings beside a stepped temple; framing `walledPlus10` centred on the feature; questions
`legibility` and `realism`; SOLO's ⌈2n ÷ 3⌉ Yes. A random D-5 pair seldom shows these things, so only a group made of them
can confirm their rows.

**Re-offers (V12C-27).** A sitting holds its own panel plus at most ONE earlier panel still *provisional — not rated*
(§13.6 (7)), the oldest first; the rest wait for the next sitting. A diagnostic panel (M1) superseded by a rated panel of
the same reference is no longer re-offered. A re-offered panel is re-rendered under the current output version and freshly
sealed (a new salt and commitment); earlier partial answers are kept as notes and never resumed against new images.
M-CAL shows at most two frames per sitting.

**3.9.2 Assembly.** `plat d5 seeds <panel>` writes `seeds.json` from the formulas (§13.6 (2); V12 §2.4), reading only
the committed numbers-only inputs. `plat d5 render <panel>` renders our side under `PanelRender` (V12 §2.8): 1 600 ×
1 200 px PNG; `walledPlus10` frames the larger side's outermost curtain (or built outline) with a 10 % margin and puts
both sides at that metres-per-pixel; `overview` is FTG's first capture per rung (§13.6 (3)); `hood`, `building` and
`village` fill the frame with the hood, the building or the village, sizes matched by count; `plan` fills the frame with
the building's footprint plus 10 %, both sides at matched metres per pixel by the footprint's long side; `underground`
frames the walled area plus 10 % at the city band, placed so that the cathedral's (or the largest church's) crypt and the
largest catacomb complex lie inside it (V4-U5); `island` frames the island's rim plus 25 %; labels and furniture off,
the fixed sun, and every PNG text chunk stripped so no file names a generator. The research-side panel seat prepares the
reference side the same way (an MFCG export at the pair's seed; an FTG capture screenshot at the matched framing; an NG
re-render at the pair's seed; the Fantasy Manor and VG images of V02 and V07), resampled to the same metres per pixel,
furniture cropped, and `research/d5/build_sitting.py` assembles the page.

**3.9.3 Sealing.** The panel seat draws a 128-bit salt from the operating system's random source; each pair's side
(a coin) and the pair order (a shuffle) come from a testkit stream keyed by that salt; the key — salt, order, sides — is
written research-side, and only its commitment H128(canonical key) is committed to `plat/goldens/d5/<panel>/key.commit`
before the owner sees anything. A public formula would let anyone predict the sides; the secret salt is the one
non-reproducible value in this volume, on purpose (J-V12.14).

**3.9.4 The sitting.** The page is a single local file the panel seat hands the owner — never published, because the
reference images are other creators' work. One screen of plain-words introduction; then one pair per screen, the two
maps side by side, click to view either full screen, three questions with Left / Same / Right and an optional one-line
note; a progress bar; answers saved as they are given in the browser's storage under the panel and its commitment, so a
closed page resumes where it stopped; up to three sessions within §13.6 (7)'s seven days. After the blind pairs: the
threshold strips (three renders labelled A, B and C in a shuffled order, pick one or "same"), the `house` sheets at M4
and later, the ladder street at M6, and the non-blind label pass. A SOLO item shows one map with Yes / No per question.
**The question texts** for the new forms (§13.6 (5)'s rubric is comparative): SOLO `legibility` — "Can you read this — its
ways, rooms and ways in — at this size?"; SOLO `realism` — "Could this lie in (or under) a real medieval town?"; `reads` —
"Does this read as {subject}?". **Storage.** The page tests its browser storage on load; where there is none (a private
window, a browser that gives a local file no storage) it says so on the first screen and offers "Export answers" after
every screen instead. **Returning the answers.** The first screen says in plain words that "Export answers" saves one file
to the Downloads folder and that the panel seat collects it from there; nothing else is asked of the owner.
"Export answers" writes `answers.json` (V12 §2.8). Keys: ← left, ↓ same, → right (Y and N on a SOLO item), 1–3 choose the
question, O a note, P pause.

**3.9.5 Verdict and record.** The seat reveals the key and crosses `answers.json` (notes hashed) and `key.json` into
`plat/goldens/d5/<panel>/` by V12 §3.3; `plat d5 verdict <panel>` reads only those files under `plat/`, checks the key
against its commitment, the answers against the pair list (every pair, every question — a rated verdict needs them all;
a file still incomplete after seven days records the panel *provisional — not rated* with the answers kept), computes the
verdicts by §13.6 (6) and the spec's `passRule`, and writes `record.json` (`D5Record`, widened by BCR-V12-6 (c) for the
`reads` question, SOLO Yes / No answers, the FM, VG, DW, AB and SOLO groups and the `descriptive` status) and the
research-side mirror (§13.3); the milestone record lists every panel sat or re-offered at it (`MilestoneRecord.d5` as a
list, BCR-V12-20). Each strip pick becomes an `owner-set` register entry with provenance `owner-eye <panel>` (V12 §3.11),
released in the next table version as a declared shift; the change that releases it runs `plat calibrate register`, which appends that cells row (V12 §2.6; seam SCC-112; J-V12.83).

### 3.10 The corpus reconciliation — a process, milestone M-CAL

**3.10.1 When it opens.** On the owner's word, recorded in `ReconciliationRecord.opened`, once the standalone generators
it calibrates have exited: the base (M4), neighbourhoods (M5), buildings (M6) and the village (V-M4) — the order of
docs/DEFINITION.md §1 and §13.9 ("after the standalone generators"). The sky and underground layers and the evolution
engine join by later runs of the same process as they land (their tables' calibratable cells already hold register
entries — the default line's `corpus` entries, due at their layer's run, and the named lines' at their own steps; V06's
lines carry no corpus stage, V6 §8; reconciliation round 4's continuation, SCC-R3C-1). **A later run** (J-V12.75) is
`M-CAL/<layer>` (V12 §2.9's `CorpusRunId`): `M-CAL/under`, `M-CAL/sky`, `M-CAL/evolution`, or `M-CAL/<milestone>` for a
column any other milestone lands after M-CAL. It exists only for the columns whose first compiled cell landed after
M-CAL's `ReconciliationRecord` was committed (V12 §3.11's *The due's corpus run*) — a layer landing before M-CAL (V04's
BCR-13 lets M6-U land beside M5) is M-CAL's — and it opens, as M-CAL does, on the owner's word recorded in its own
`opened`, once its layer's last milestone has exited (M6-U, M6-sky, M6-E, M6-P; the named milestone for any other). It reads
M-CAL's declared frames (`frames.json`; a frame declared since follows V12 §3.10.2 step 3 unchanged), measures only the
metrics of the entries due at it, and applies V12 §3.10.3 – §3.10.6 unchanged: its accepted changes ship as new versions
of the frames' historical packs, and its sitting, panel id its own run id, is held only when it moved a cell; otherwise
its entries close by its record (E1's reachability rows, E4's checks, `fixed` with "no admissible frame") and
`panel` is `null`. Its exit is a `MilestoneRecord` of its id, where an entry due there and still `provisional` fails as at
any exit (V12 §3.11). The underground's rows (item 109's relief, mining, fissure, ruin, access, crypt and
catacomb rows) are possibility-only by nature — no town plan frames an underground — so their run is E1's reachability and
E4's historical checks (a catacomb under a cemetery outside the walls, a worked-out quarry turned ossuary, a cathedral
crypt, a parish church crypt), never prevalence, and their values are confirmed by the V4-U5 panel (V12 §3.11). Item 110's
rows take E1's reachability and E4's checks the same way — houses on a bridge, buildings on a mole or pier, a town's
aqueduct on arches, a viaduct across a valley, terrace retaining walls in a hill town, a stepped temple (region-bound) —
and a witnessed TOWN raised way is reachable by declaration (item 101's T4), so it lifts nothing (V12 §3.10.4). Until it opens nothing reads the corpus; the two owner-opened exceptions stand as they
are: the palette bands of item 69 (§8.2) and the historical checks as evidence for rules (`partitioned/README.md`, J103).

**3.10.2 Intake (research side, the adapter seat).** The corpus lives outside this folder (§13.9); the adapter seat is a
research seat that reads it under the corpus's own laws (`partitioned/README.md`):
1. It reads the corpus's own manifest and lists its maps. It **never opens** the 53-plate blind holdout (it takes the
   holdout's ids from the corpus's own list and records only their count and a salted digest of the list), nor
   SettlementForge's own map-design documents; each exclusion is written to `CorpusMapMeta.excluded`.
2. It classes each map by evidence: a historical record → `record`; a measured plan whose metadata or scale gives metres
   → `surveyed`; a drawn or painted plate → `drawn`, even when it shows a scale bar, unless the corpus's metadata calls it
   a survey (the stricter class wins; J-V12.16).
3. **Before measuring anything** it declares its sample frames (`SampleFrame`, V12 §2.9): era × region groups of
   `surveyed` maps chosen by a rule that names no measured feature ("every surveyed plan of a town of region R dated
   1200–1500 in the corpus"), with the member list's salted digest; a frame of fewer than 20 maps may be declared and is
   possibility evidence only. The declarations cross into `plat/calibration/reconciliation/frames.json` (`FramesFile`)
   by V12 §3.3 before any row of their frames, so check C8 can refuse a frame row whose declaration's `CrossingRecord` is
   not earlier — pre-registration made checkable (V12C-17).
4. It maps each map's era and region onto our D-2 preset keys and each corpus trade label onto our class-family keys
   (for `use`), in a research-side table; no corpus word crosses.
5. It writes each map's `MeasureInput` (scale `metric` or `relative`) and the index of `CorpusMapMeta` rows.
6. It salts ids: `corpus:map:` + the first 16 hex digits of SHA-256(salt ‖ id), the salt kept in the adapter's folder
   (§17.1 (5)'s convention), so no place name enters `plat/`.
Measurement then runs `plat measure` per map and `plat baselines aggregate` per frame: a frame row is role *target*, a
per-map row role *descriptive*; both cross by V12 §3.3 with check C8.

**3.10.3 What the stage may change, and what it may not.** "What you have built is always the BASE" (owner, 2026-09-25),
read with item 23 (defaults emulate; extensions ride on top):
* **R1 — every change is a layer, never an overwrite.** A corpus value lands in the historical pack
  `historical:<frame>` — a sparse, versioned delta over the defaults, one per frame — and never in a table's shipped
  default. The pack sits in §7.6's **packs** slot, bound to its frame's D-2 era and region keys: it applies to a document
  whose era and region presets match the frame and to no other, so a document keeps its one preset slot for the D-2 era
  and region preset or a parity preset and still takes the matching layer (BCR-V12-22; J-V12.49). The emulated defaults
  (`ref:` cells), our own defaults and the extension values all stay as built; the default town changes only if the owner
  adopts the pack for its frame (V12 §3.10.6, Q-V12-3). The pack's cells carry provenance `corpus` and evidence ids (V12
  §2.10) (J-V12.15).
* **R2 — thresholds and bands.** A §13.7 threshold with provenance `architecture` may be re-signed where a frame measures
  it (§13.9 (4)); one with provenance `owner-eye` only by the owner's re-pick at the M-CAL sitting, the corpus value shown
  as one option of its strip; a re-sign that moves a threshold onto its own measured value to make it pass is *not
  achieved* (§13.7). Corpus target rows join §13.5 and **gate the historical pack of their frame** (A2). Under the default
  preset they are role `descriptive`, reported beside the pack's verdict, until the owner adopts that pack; from then on
  they gate the new default for matching documents (V12C-04). No permitted run could fix a corpus row failing under the
  default, so it never fails a parity exit there.
* **R3 — owner-set values.** `owner` cells (the owner's rules) never move; item 69's palette targets move only by
  V12 §3.10.7.
* **R4 — never.** Code, mechanisms, stage order and table schemas; a cell that is not `calibratable`; the parity presets
  (the layer is not part of them, so `MFCG` and `FTG` stay byte-identical, T-V12-24); the dossier row sets (§13.9 (7));
  naming tables, grammars, word lists and packs (the corpus teaches drawing, never naming); engineering invariants and
  budgets (§7.6's reading rule).
* **R5 — scale and scope.** A metric that needs metres runs only on `metric` inputs; a frame calibrates only its own
  era and region layer.
* **R6 — owner rules (V12C-03; J-V12.39).** A cell or mechanism that implements a clause of an OWNER RULE item (the
  amendment items marked OWNER RULE, the owner's dated words in `docs/OWNER-INSTRUCTIONS-2026-09-25.md`, DEFINITION) is
  never an E1 or E4 target: every such cell carries its `ownerRule` stamp (V12 §2.10), and a mechanism's clause is named in
  the register. A witnessed form such a clause excludes — a catacomb under a cathedral against 109 (k) (2), a village
  catacomb against 109 (k) (1) — is written to `ReconciliationRecord.ownerExcluded`; it never enters `known-defects.json`
  and never a layer, and the owner's reconciliation report (V12 §5.5) lists it as an owner question with the
  recommendation "keep the rule". An owner-stamped calibration minimum binds a corpus run too: E2 may lower the CITY and
  METROPOLIS raised-way chances and caps only to their minima (0.02 and 1), recorded in `floorsHeld`, and the report says in
  plain words: "the historical maps show few raised ways; the owner's rule keeps cities able to build them, at the lowest
  chance".

**3.10.4 The evidence rules.**
* **E1 — possibility, not prevalence.** A `record`, a `drawn` plate, a single surveyed map or any map outside a declared
  frame proves only that what it shows is possible. It creates a **reachability requirement**: under some admissible
  setting the generator can produce the witnessed value. **The search** (V12C-17; J-V12.52): the settings are the grid of
  §7.8's controls whose parameters are read by the metric's `stages`, each at its range ends and middle, capped at 64
  settings in the controls' registry order, crossed with the D-2 presets of the frame's era and region, and item 101's
  declarations where the witnessed thing is one an author can declare (a TOWN raised way by T4; a quarter by T5); the
  value is **reachable** when any of 50 seeds at any setting gives the metric within max(`absFloor`, 10 %) of the witnessed
  value, or a declaration produces it (`by: 'declaration'`). An unreachable one is recorded in
  `ReconciliationRecord.reachability` and in `known-defects.json` ("the generator cannot make …", with the salted id) —
  unless R6 excludes it. Where the gap is a chance of 0 or an option off, the one value change E1 permits is raising the
  chance to the **possibility floor** 0.02, or lowering a certainty to 0.98, in the layer, with evidence "possibility",
  and only in a cell that a register entry maps to that metric and that carries no `ownerRule` stamp. E1 never sets a
  weight, a share, a frequency, a count or a band's centre (J-V12.17).
* **E2 — prevalence needs a frame.** Only frame rows — `surveyed`, n ≥ 20, declared before measurement, selected by a rule
  that names no measured feature — may set shares, weights, frequencies and band centres, and only in their frame's layer.
* **E3 — drawing, never naming.** `drawn` plates may set a render family's look targets (the `render` metrics: palette,
  line-weight ratios, hatch density), each confirmed by the owner at the sitting; never a structural metric, never a
  name.
* **E4 — the historical checks.** Their verdicts (J103) enter as possibility: SUPPORTED → the rule's note reads
  "corpus-witnessed (possibility)", the rule stays soft; CONTRADICTED for a program universal (no `ownerRule` stamp) →
  E1's floor in the layer, the note saying so; CONTRADICTED for an owner rule → R6 (an `ownerExcluded` row and an owner
  question); ABSENT → nothing changes and the row keeps "general historical knowledge, not corpus-witnessed" (g item
  104 (f)).
* **E5 — never used.** The holdout and SettlementForge's map design, recorded by count and digest only.

**3.10.5 The runs.** Per frame, corpus `CalibrationRun`s (V12 §3.7's engine, `kind: 'corpus'`, every cell's layer
`{ pack: 'historical:<frame>' }`, V12 §2.5) in upstream-first order, so a later run fits on an earlier one's result: (1) the rung
profile's frame area, walled shares and stage rows (§1.1); (2) S3–S5 — gates, the enceinte with item 106's barrier rows
(the defensibility thresholds and `wall.barrierReachM`, from the frames' `wall.barrierShare` and walled shares on walled
plans; the historical checks' wall rows as E4 possibility), the street heading and separation rows; (3) S6–S7b — the district rows; (4) S8–S10 — the bent cut's rows, granularity, hidden shares; (5)
S10b–S11 — the siting families' and signature pairs' weights from the frame's `siting.*` rows (each compared with our
statistic in the same corpus variant, V12 §3.6), item 105's web weights and `comfortM` and item 107's spacing radii
where the frame's `use` labels measure them, the class mix; (6) S12 —
greenery and hinterland; (7) the render looks (E3). Each run's guards add every earlier run's targets, so a later run
cannot undo an earlier fit. A proposed change that breaks R1–R5 or E1–E5 is not run: it is written to
`ReconciliationRecord.refused` with its rule.

**3.10.6 Acceptance and the before-and-after sitting.** The layer of a frame is accepted when: **A1** every change's
evidence is admissible (E1–E5); **A2** every frame target row passes on the holdout seeds under the layer; **A3** the
parity presets' goldens are byte-identical before and after, and every §13.5 row passes as before; **A4** the C bars and
every owner-rule bar pass under the layer; **A5** no threshold was moved onto its own measured value without *not
achieved*. Then the **M-CAL sitting** (V12 §3.9.1) shows, blind, the same seeds before (the default) and after (the
default with the layer), with the three questions, the re-offered owner-eye strips and, if needed, the palette pick.
**The decision** (Q-V12-3, default until ruled) is taken **per frame**: a frame's pack becomes on-by-default for new
documents whose era and region match it when its after side is judged better or the same on *realism* in ⌈2n ÷ 3⌉ of its
pairs and is not judged worse on *legibility* on every pair of any rung; otherwise it ships selectable, listed in the
preset dialog as "historical (<era>, <region>)" (V09, X-V12-6), and the default stays as built. A document of another era
or region never receives it. Adopting a pack is a recipe default change: an output-version bump with its shift records
(§13.3), documents made before replaying unchanged.

**3.10.7 The palette targets (item 69).** The owner released bands measured by the corpus's own instrument, whose
definitions this program cannot see (§8.2). At M-CAL the same axes are measured by **our** definitions (§8.2's code)
on the non-holdout `drawn` plates, and only the **corpus-sourced ends** are re-checked: paper luma 226 – 244, paper warmth
20 – 50 and plate chroma 18 – 70 (two-ended: our p10 and p90 against the ends) and darkest ink ≤ 45 (one-ended: our p90
against 45); our own tolerances (ink warmth 15 – 25, `ink`'s chroma 20 – 30) are never re-signed by this step. If every
re-checked end lies within 3 units (luma, R − B) or 3 C* (chroma) of ours, nothing changes; otherwise the owner sees both
bands at the sitting and picks. The pick is
recorded (`ReconciliationRecord.palette`); a change re-signs §8.2's targets with provenance `corpus` and evidence
"remeasured by our definitions at M-CAL", and §13.4's palette bar with its chroma sweeps re-runs for every family
(J-V12.18).

**3.10.8 Release.** Each accepted layer ships as a versioned preset table; the `ReconciliationRecord` is committed;
the release notes and the owner's reconciliation report (V12 §5.5) say in plain words what the historical maps changed,
what they could not change and why, and which witnessed things the generator cannot yet make.

### 3.11 The calibration register — no provisional number dangles

**Entries.** One per provisional number: every §13.7 letter (owner `base`); every §13.5 row whose fallback moves a
mechanism; §1.1's rung modifiers; every volume's calibrate-later model constant (never an application or engineering
constant, *The provisional-number lint* below; round 6, SCC-107) — written, with its default, its measurement
(its metric ids, V12 §2.6), its due milestone and its fallback, by the seat that lands that volume's milestone, `owner` naming the
volume — from a named register line, else from the default line below; the siting weights file g items 103–108 mark "general historical knowledge, not corpus-witnessed" (`method:
'corpus'`, due M-CAL); the thresholds of V12 §3.6b's rules (owner `V12`, §13.7 rows by BCR-V12-12); and each owner strip
pick (`owner-set`).

**The default line** (reconciliation round 2's continuation, SCC-R1C-2; J-V12.71). A calibratable column (V11's
`ColumnSpec`) of a registry table (V11 §3.1) that no register line names — this section's lines with their catch-all, V11
§8's non-g lines, V2 §3.10.10's, V6 §8's, V07's one `rules.race.densityPower@VG` entry (V07 §3.15), or a line a volume
writes in V2 §3.10.10's form (in its own §8, or beside its table as V03 §2.4 does for `roomProgram.json`, J-V3.118) — takes
its one entry from this line, so no landing seat invents a method, a metric or a fallback: id `cal.<table>.*.<column>`;
`target.column` with `rows` absent; `owner` the document whose source file holds the column's cells when the entry is
written — the source manifest's author seat for that file (V11 §3.2.1 step 1), as its volume, or `base` for a base
section's seat — and, where two documents' files hold them, the first the table's `rowsHome` names (V11 §2.1); a document
that writes the column's cells later never moves it (reconciliation round 3's continuation, SCC-R2C-5 (b)); `method: 'corpus'`; `due` M-CAL — or, for a column whose first compiled cell lands after M-CAL's `ReconciliationRecord` is committed, the later run of the corpus process that takes its layer (V12 §3.10.1), `M-CAL/<layer>` by *The due's corpus run* below, which `--defaults` writes from the landing change's milestone (reconciliation round 4's continuation, SCC-R3C-1; J-V12.75); `metric` [`frame.<table>.<column>`]; `fallback`
{ mechanism: "at its due corpus run (M-CAL or `M-CAL/<layer>`) the run that targets the column moves it under V12 §3.10's rules; a column no frame's run
targets closes `fixed` with 'no admissible frame'", `notAchieved: false` }; `line: 'default'` (V12 §2.6). The seat that
lands the column's first compiled cell writes it in the same change with `plat calibrate register --defaults --milestone <id>` (the landing change's milestone, V12 §2.8's volume-qualified id; the flag required, *The due's corpus run*), after its
named lines' entries: the command writes this entry for every calibratable column that holds at least one compiled cell and
has no entry — a column of an empty table (V11 §2.1: every registry row ships as its schema's empty table until its
rows-home milestone) takes none until the change that ships its first row, so no entry names a column no seat has landed
(reconciliation round 3's continuation, SCC-R2C-5 (a)) — in table-id then column order, never touches an existing entry except to append the moved-value or rows-added row of *A value moved
by its owning seat before its due* below (reconciliation round 5, SCC-90; round 6, SCC-98, SCC-103), is idempotent, and lists the ids it wrote or
appended to in the register report (V12 §5.2). This floor is no measurement plan: its corpus run moves no owner-stamped cell or
gate and no value below an owner-stamped calibration minimum (V12 §3.10's R6), and it binds no key, law,
enumeration, switch, word list or dossier row set (V11 marks those non-calibratable). As the volumes stand it binds,
among others, volume 1's `hood.*` default rows, volume 3's `roomProgram.json` columns its §2.4 lines leave (PE's cells
among them; J-V3.118), volume 4's §2.3 rule-table columns that no line below names, volume 5's §2.4 values (IN-V12-1's
`IslandRule` cells among them) and volume 7's §2.2 and §2.2a numeric cells other than its one `VG` entry (X-V12-16);
volume 8's dossier row sets and volume 9's and volume 10's tables take none — every column of V11 §3.1 rows 63–66 and
86–89 is `calibratable: false` (J-V11.65, J-V11.81; reconciliation round 3's continuation, SCC-R2C-4). **A later line** for a column the
default line bound — a volume whose bars confirm the column before M-CAL writes it in V2 §3.10.10's form and registers the
bars it names (X-V12-15) — restates that one entry in place while it is `provisional` (after its corpus run, M-CAL or `M-CAL/<layer>`, only under a
new major table version, V12 §4.2): the same id, the line's `owner`, method, metric, due and fallback, `line` dropped, a history row
appended with the column's value and the restating milestone (a cells row, V12 §2.6); never a second entry.

**The due's corpus run** (reconciliation round 4's continuation, SCC-R3C-1; J-V12.75). `--milestone <id>` is required
(reconciliation round 5, SCC-93; J-V12.78): `--defaults` without it refuses, writing nothing and naming the flag, and a
volume's short citation of the command (`plat calibrate register --defaults`, as V1-8.1, V03 §2.4, V4 §8, V5 §8 and V07
§8 cite it) runs with it. `<id>` is the landing change's milestone in V12 §2.8's volume-qualified form (`M1`, `M2b`,
`M3a`, `M3a-V2`, `M5`, `V-M0`, `V-M2u`, `V3-P1`, `V4-U3b`, `V5-P2`, `V6-E2` …); an id that is neither one of §16's
ids nor volume-qualified by V12 §2.8's rule — a bare `P1` — is refused, naming the form. `--defaults --milestone <id>`
writes each entry's first history row `{ date, value: the column's compiled cells by row key, milestone: <id>, cells: true }` and its
`due` from that milestone: `M-CAL` while no M-CAL `ReconciliationRecord` is committed; once one is, the later run (V12
§3.10.1) that takes the landing milestone's layer:

| the landing milestone | `due` once M-CAL's record is committed |
|---|---|
| M6-U and `V4-U0` – `V4-U5` (`V4-U3b` among them; V4 §8); `V-M2u` | `M-CAL/under` |
| M6-sky and `V5-P0` – `V5-P6` (V5 §8) | `M-CAL/sky` |
| M6-E and `V6-E0` – `V6-E8` (V6 §8) | `M-CAL/evolution` |
| M6-P and `V3-P0` – `V3-P6` (V3 §8; PE is built inside M2b and M3a and lands under their ids) | `M-CAL/M6-P` |
| any other milestone (a later amendment's milestone; reconciliation round 5, SCC-93) | `M-CAL/<that milestone's id>` |

The same substitution holds on every named line: a line's `corpus` stage or due at M-CAL, on a column whose first
compiled cell lands after M-CAL's record is committed, falls at that column's run by this table — the `under.ruin`
`chance` line's E1 stage and the `under.catacomb` and crypt lines' E4 checks among them when M6-U lands after M-CAL — and
the seat landing the column writes that due. A column landing before M-CAL's record stays due at M-CAL.

**A value moved by its owning seat before its due** (reconciliation round 5, SCC-90; J-V12.77; round 6, SCC-98, SCC-102,
SCC-103). (1) *When.* The seat that owns a calibratable column (its entry's `owner`) whose entry carries `line:
'default'`, is `provisional` and is not yet due — no `ReconciliationRecord` of its `due` is committed — may change the
column's compiled cells in its table's source outside any run (V12 §3.7), only when the change's golden check (§6.4's
stage-isolated digests at PR tier, over the main set, the no-op pins' sets and the known-city fixtures') finds no digest
of a golden committed before the change moved by the new value — a column a committed stage already reads may so move
where no golden's digest depends on the moved cells (`terrace.siteShare`, read from M3a by `terraceState` for the base's
district-edge source, V1-8.1, BCR-42, matters only where an authored `terrace` site primitive covers a district, V1-3.17.1
(1); round 6, SCC-102); a reader stage that the same change lands records its first golden, or its feature's declared
shift, with the moved value. Volume 1's M5 tunings are the case (V1-8.1): `land.spineFactor`, `land.ringSlack`,
`land.smallShare`, `terrace.askGain`, `terrace.siteShare` and `ng.plazaM2` of `hood.constants` (entries written at M1) and
S7c's `select.*` weights of `hood.templates` (entries written at M3a), each tuned to that volume's own acceptance bars
inside the work item that lands its reader, before M5's exit. **Held** (round 6, SCC-102): should the golden check find a
committed digest moved by such a tuning, the tuning is not landed — the cell keeps its landed value, the change that keeps
it records the hold with `plat calibrate register --hold <entry id> --milestone <id>` (one row `{ date, value: null,
milestone, held: true }`, V12 §2.6 — its only change), the register report lists the entry "held: a committed golden
reads it" until a later cells row (V12 §5.2), and the owning volume's bar reads the shipped value (V01's T-V1-50). A move
that would shift a committed golden is a run — a `fallback` or `reference` run with its declared shift (V12 §3.7.6) —
never this row; the command below does not read goldens, the golden check does. A named line's entry moves its cells by
its line's method — a run, the panel rule's stated second value — and, on a `measure` line whose owning volume states a
tuning before its exit and whose bars no run may name (every `BenchBarDef.stages` `[]`, V12 §3.7.2 (4): V03 §2.4's
lines, tuned at `V3-P6`), by its owning seat inside the exit's milestone under this clause's golden test, and by the
line's stated fallback applied in the exit's change (*Milestone exits*); each such move appends (2)'s cells row by the
same command while the entry is `provisional`, and (3)'s check covers the entry (round 6, SCC-98). (2) *The row.* The
change that moves the value runs `plat calibrate register --defaults --milestone <id>`, `<id>` its own milestone (V1-8.1's
`--milestone M5`; V03's `V3-P6`). For an existing default entry, or a named entry (1)'s last sentence admits — one whose
current stage (V12 §2.6's `stages`) is `measure` and every metric of which that stage reads is a `bar.` member whose bar's
`stages` is `[]` (the command reads the registered `BenchBarDef`s; that the owning volume states the tuning is the
landing review's check) —, whose target's compiled cells differ, on the row keys its last cells row holds, from that
row's `value` (V12 §2.6's `cells` marker), the command appends `{ date, value: the column's compiled cells by row key,
milestone: <id>, cells: true }` — its only change to an existing entry: `status`, `due`, the first row, `owner`, method,
metric and fallback stay as written, the due still dating from the first row's milestone (*The due's corpus run*). For
such an entry that is not `provisional`, or whose due's record was committed before the change (a default entry's
`ReconciliationRecord`; a named entry's current stage's `MilestoneRecord` — the exit's own change, which applies a hand
fallback, precedes it), it appends nothing and lists the entry in its report as a move owed to a run (`plat calibrate
run`, V12 §3.7). A second run of the command appends nothing. (2′) *Rows added* (round 6, SCC-103; J-V12.80). A change
whose compiled cells hold row keys an entry's last cells row lacks, with every row key that row holds unchanged, adds
rows: the command appends the cells row to that entry — default or named, whatever its status or due, and whichever seat
lands the rows (V03's `V3-P1` band rows of `roomProgram.circulation`, whose poorest-band class rows landed at M2b under
owner `base`, V03 §2.4; V11's C3 rows of a column its C1 rows opened) — and changes nothing else. Rows added after the
entry left `provisional` keep their authored values and are reported as "rows added after close", a later major table
version restating the entry for them (V12 §4.2). A change that also changes the cell of a row key that row holds is a move, which (1)
and (2) decide, one cells row recording both; (1)'s owner condition and (2)'s "owed to a run" read only the changed cells
of row keys the last cells row holds, never an added row key. (3) *The check.* `plat calibrate register --check`
compares, for every entry whose target is a cell or a column without `preset` and whose history holds a cells row, its
target's compiled cells with its last cells row: a changed or removed cell of a row key that row holds fails — naming the
command (`plat calibrate register --defaults --milestone <id>`) for a default entry, or a named entry (1)'s last sentence
admits, while it is `provisional` and not yet due, and `plat calibrate run` otherwise, the move owed to a run (round 6,
SCC-98); a compiled row key the row lacks fails naming the command, which appends it by (2′) (round 6, SCC-103). It
compares the last cells row, not the last row of any kind: after its corpus run a default entry's later rows record metric
readings and its status, while that run's changes ship as historical packs (V12 §3.10.3 R1) and leave the column's cells
as its last cells row holds them — so a closed entry passes until someone moves its cells in place outside a run.

**File g's rows by column family.** A table column whose cells share one measurement is one entry (`target.column`),
written by the seat that lands the table; V11's column entries land with each content milestone and C6 at M4 audits them
(V11 §8's register at every exit; V11's round 1, SCC-08). A line's method cell writes `CalibrationEntry.method` by name —
`measure`, `panel`, `corpus` — and a line whose method is a `reference` run writes `method: 'tune'` (V12 §2.6;
reconciliation round 4, SCC-82). **The catch-all rule** (reconciliation round 4, SCC-76; J-V12.69): a line ending "and every
other calibratable column" (of the tables or columns it names) binds every calibratable column (V11's `ColumnSpec`) of those
tables or columns that no other register line names — this section's, V11 §8's non-g lines, V2 §3.10.10's, V6 §8's — each
as its own entry, id `cal.<table>.*.<column>`, with that line's method, metric and fallback, so the register check finds
none without an entry; keys, laws, enumerations, switches and the dossier row sets, which V11 marks non-calibratable, take
none, and a column two lines bind fails the lint as two entries for one knob (V12 §2.6):

| rows (their content is the owning volume's) | method, due | the confirming measurement | when it cannot confirm |
|---|---|---|---|
| items 103–107: siting-family and signature-pair weights, coverage targets, item 105's web weights, `comfortM` and orientation factors, item 107's spacing radii, and every other calibratable column of the tables and columns items 103–107 add — registry rows 33–37 (`siting.profiles`, `.families`, `.pairs`, `.web`, `.custom`: `siting.web`'s `relaxPasses`, `relaxGain`, `splitThreshold`, `reverseShare`, `valuableSecurity` and every `siting.custom` rule cell among them), row 19 (`roster.resources`, the goods table: `maxDistanceM` and every other goods column), row 17's `profile` columns (coverage, balance, orientation and split with the rest of V11 §2.3's `SitingProfile`) and row 24's `coverage.rosterWeight` (V11 §2.3–§2.5, §3.3–§3.8, §3.13; reconciliation round 4, SCC-76) (V11) | `measure` at M2b for the direction (the bar map's null and share bars, V12 §3.6b), then `corpus` at M-CAL for the value (the frames' `siting.*` and `link.*` rows) | `siting.<spec>` and `bar.<barId>` of the bar map's rows (V12 §3.6b); `frame.*` (reconciliation round 3, SCC-56); a column the catch-all binds names the bar map's rows of the item whose table or column it is, and its own `frame.<table>.<column>` | a failing bar's fallback; a column no frame measures closes `fixed` at M-CAL with "no admissible frame" |
| item 106: the defensibility thresholds, `wall.barrierReachM`, the waterfront size threshold, and every other calibratable column of `walls.barriers` and `walls.waterfront` (registry rows 14–15, the thickness · height and tower-spacing factors among them; V11 §2.7, §3.16; reconciliation round 4, SCC-76) (V11) | `corpus` at M-CAL | `wall.barrierShare` and `walled.share` on walled frames; `frame.*` (each column its own `frame.<table>.<column>`; reconciliation round 4) | as above |
| item 108: the ladder pairs and subsumption rules (provenance source `sf:`, V11 §2.2, BCR-V11-21); the port's ranges for unnumbered qualifiers | never entries: the first move only with the port's baseline (V12 §3.7.2 rule 2), the second are derivation rules of the port (item 20 (h)); not calibratable (V11 §3.1: `calibratable: false` on every `dossier.*` column; V11's round 1, SCC-06) | — | — |
| item 102: `w_sun` (`prosperity.drivers`' row `sun`, V11 §3.3.5; owner V11), `sun.samples` and the `roster.classMix` prestige key `sun` (V11); V05's and V06's own shade cells by their volume's own lines where one names them (V6 §8), else by the default line above (reconciliation round 1, SCC-15; round 2's continuation, SCC-R1C-2) | `measure` at M2b with V11's C2: T-V11-30 (`w_sun` 0.02 against 0 under common random numbers on B-CITY — the term alone moves no plot across two bands); then item 102 (g)'s fixtures, `measure` at `V5-P1` (V05's island, T-V5-19) and `measure` at `V6-E7` (V06's drift fixture's `shade.gap` on E7's bench, T-V6-12; seam SCC-109) — two stages at unordered rows, each read at its own exit (*Staged entries* below; reconciliation round 6, SCC-99, SCC-105) | `bar.T-V11-30` at M2b; the fixtures' `shade.gap` (V12 §3.4.2) at their stages | V11 §3.3.5's: halve `w_sun` once (0.01), then set it to 0.005 and re-run |

**Items 109 and 110 by column** (X-V11-12; reconciliation round 1, SCC-07, SCC-15). Every calibratable column of the
underground's tables and of item 110's is one `target.column` entry, id `cal.<table>.*.<column>` (`rows` absent: every
row), written by the seat landing the owning content milestone — V11's C8 for item 109 (M6-U), C3b for item 110 (M3a)
with the era's and the culture's item-110 factors (`aqueductM`, `raisedVaultM`, the culture `building` block), C1 for
`climate` (V11 §8's register at every exit; reconciliation round 2, SCC-48); V04's and V02's seats for their own cells; and
a base cell that a volume's base change request adds, owner `base`, by the seat landing that request, once the cell exists
(V06's E2 at M6-E for BCR-V6-26's persistence cells, V6 §8; reconciliation round 3, SCC-54) — with the method,
metric and fallback of its line. A line ending "and every other calibratable column" binds by the catch-all rule above (reconciliation round 4, SCC-76). `retaining.settings.stateSnapCm` (row 79; file f item 245, J-RF2.4; owner `base`, whose value it holds, as the `span` cells' is V04): the default line's entry at M3a, restated in place at `V6-E2` by V6 §8's line on `bar.T-V6-62`, J-RF2.4's measurement (*A later line*; SCC-111), due `V6-E7` — a bar V06 registers at E2 cannot be named by an entry written at M3a (T-V12-20: an entry naming an unregistered bar fails) (seam SCC-110; J-V12.82). `owner` is the volume whose values the cells hold, the schema's
volume named in brackets. No entry of these lines names a preset entry (V11's preset entries are `fixed:` off values, V11
§2.2; V12 §3.7.2 (3)) or moves an owner-stamped cell or gate or a value below an owner-stamped calibration minimum.
A line's step is written into its entries' `due` (and a staged line's into each stage's, *Staged entries* below; round 6, SCC-105) in V12 §2.8's volume-qualified form — "at U3" as `V4-U3`, "at U3b" as
`V4-U3b`, "at U4" as `V4-U4`, "at U5" as `V4-U5`, V06's E2 and E7 as `V6-E2` and `V6-E7` — while the corpus evidence rules E1 – E5
(V12 §3.10.4) are rules, not milestones, and keep their names (reconciliation round 5, SCC-93).

| table (registry row) · columns — one entry each | owner (schema) | method, due | metric | fallback |
|---|---|---|---|---|
| `s0.features`' relief and geology rows' item-109 (a) values — P(soluble), P(volcanic) by relief (row 9); `under.systems`' cavern row `mineBoost`, `mineCap`, `fissureChance`, `breachM` (row 59) | `base` (file g item 109 (a)'s values, applied by the coherence pass; V04's `params` names) | `measure` at U3 (the bar map's 109 (a) `trend` and `higherWith` rows; V04 T-V4-55), then `panel` (V4-U5, `realism`) at U5 | `void.*` (cavern present) | V12 §3.6b's default, then *not produced*; unrated: the panel rule |
| `under.systems`' cavern `miningCellShare` (row 59) | V11 (§3.23.1) | `measure` at U3 (the `higherWith` row's mining factor) | `void.*` (cavern present) | V12 §3.6b's default |
| `under.ruin` (row 58a) `chance`: `magic`, `history`, `delvingFactor`, every `blueprint` rung × relief cell | V11 (§3.23.2; V04 §2.3) | `measure` at U3 (the 109 (j) (1) `rate` rows on forced-source sites confirm each draw reads its chance), then `panel` (V4-U5, `realism`) at U5, then `corpus` possibility (E1) at M-CAL | `void.*` (ruin present) | the panel rule; a reachability gap enters `known-defects.json` |
| `under.ruin` `cultures` (`CultureRow`): `blockPitchM`, `streetCm`, `aspect`, `roomM`, `columnPitchM`, `hallShare`, `terraceRiseM`, `weight`, `monument`, and every other calibratable column of the row | V11 (§3.23.4; V04 §2.3) | `measure` at U3 — T-V11-24's distinctness against the town's fabric above the ruin (V12 §3.6b `paired`; V04 T-V4-45) — then `panel` (V4-U5) at U5 | `ruin.blockArea`, `grid.r4`, `grid.axis` | V11 §3.23.4's: the failing row's `blockPitchM` moves 25 % away from the town's median block pitch once and the bench re-runs; a second failure drops the row's weight to 0, reported to the owner as a table defect |
| `under.ruin` `survival` (the eight persistence classes) | V11 (§3.23.5; V04 §2.3) | `panel` (V4-U5, `realism`) at U5; the order is T-V11-23's compile bar | `ruin.survival` (V12 §3.4.2) | the panel rule, every move keeping V11 §3.23.5's order |
| `under.ruin` `sourceWeight` | V11 (§3.23.6; V04 §2.3) | `measure` at U4, the step whose exit runs that bar (the 109 (i) `rate` row, `ruinChosen` against `ruinShare`: V04's T-V4-58; V4 §8's due steps), then `panel` (V4-U5) at U5 | `void.*` (an undercity's first void source) | the panel rule |
| `under.ruin` V04's cells: `ancientYears`, `significance`, `maxFrameShare`, `maxChambers`, `forecastFloorShare`, `depthM`, `burialByAge`, `smoothM`, `sharedAxisChance`, `ageRefYears`, `coverKeep`, `distinct`, `fadeFactor`, `magicLightChance`, `monument` (`clearM`, `tierDecay`, `ceilingClearCm`, `moundShare`), and every other calibratable column | V04 (V4 §2.3) | `measure` at U3 (V04's T-V4-45, T-V4-68; T-V4-62 reads the span-rule line's cells, not these), then `panel` (V4-U5) at U5 | `ruin.blockArea`, `grid.axis`, `void.*` | V04 §8's pre-decided fallbacks, else the panel rule |
| `under.openings` (row 58a) each kind's `chance` | V11 (§3.23.7; V04 §2.3) | `measure` at U3b, the step whose exit runs those bars (the bar map's 109 (j) (5) `trend` of access against buildings over and `floor` of sealed deep voids: V04's T-V4-49, T-V4-54; V4 §8's due steps), then `panel` (V4-U5) at U5 | `void.*` (accessible; deep voids sealed) | V12 §3.6b's default |
| `under.openings` `coverM` | V04 (V4 §2.3) | as the line above | `void.*` | as the line above |
| `under.dig` (row 58a): `cap`, `reachM`, `decayM`, `maxM`, `basementFactor`, every resolved `classRow` | V11 (§3.23.7; V04 §2.3) | as the `under.openings` line | `void.*` (accessible; deep voids sealed) | V12 §3.6b's default, every move keeping T-V11-23's non-increasing depth factor |
| `under.dig` `sealedFloor` — the floor the `voidSealedDeep` bar reads (item 109 (j) (5)) | V11 (§3.23.7) | `panel` (V4-U5) at U5 | `void.*` (deep voids sealed) | none: moving it moves the bar's threshold, so a miss is `not-achieved` (`notAchieved: true`, §13.7) |
| `under.dig` `planReachM` | V04 (V4 §2.3) | as the `under.openings` line | `void.*` | V12 §3.6b's default |
| `under.catacomb` (row 58a): `count` (`churchesPer`, `cap`), the `chance` cells, `rankCap`, `growthCapShare` (per year), `growthFloorM2`, `plagueNeedFactor`, `cryptJoin` (`own`, `other`), `charnelMaxM2`, and every other calibratable column — never the owner-stamped gates (the TOWN rung, the cemetery-only sources, the cathedral's `always`) | V11 (§3.23.8, J-VI.6; V04 §2.3) | `panel` (V4-U5, `realism`; its framing holds the cathedral's crypt and the largest complex) at U5, then `corpus` possibility (E4's crypt and catacomb checks) at M-CAL (a stage, round 6, SCC-105) | `catacomb.count`, `catacomb.extentM2`, `catacomb.growthM2`, `crypt.joined` | the panel rule; the bar map's catacomb properties are exact conformance and move no cell |
| `under.catacomb` `ossuaryReachM` | V04 (V4 §3.5.1) | as the line above | `catacomb.fill` | as the line above |
| the crypt columns of item 109 (k) (2): the crypt chance per church class (the `basement` classes' cellar rows), `cryptM2` by class and band (`roster.classes`), `crypt.rankShare` (`roster.settings`) | V11 (§3.5.8, §3.5.1) | as the `under.catacomb` line | `crypt.present`, `crypt.areaM2`, `crypt.rank` | as the `under.catacomb` line |
| V04's other item-109 cells (`voidDwellings`, `accessForecastMin`, `under.layout`'s `overlapShaftM` and `overlapShaftChance`, the fade rows) | V04 | the default line above — `corpus` at M-CAL, or at `M-CAL/under` for a step landing after M-CAL's record (*The due's corpus run*; SCC-R3C-1) — unless V04 §8 writes its own line for the column in V2 §3.10.10's form, which then restates the entry in place (reconciliation round 2's continuation, SCC-R1C-2) | `frame.<table>.<column>` (the default line), else that line's | closes `fixed` at its corpus run with "no admissible frame" (the default line), else that line's |
| `terrace`: `slopeMin`, `stepMinCm`, `stepMaxCm`, `minTerraceDepthM` (`enabled` is a switch, not calibratable, and takes no entry — V11 §3.24.1; reconciliation round 3, SCC-68); `retainingReachM`, `flatDepthM`, `coverShare` (IN-V11-2; V09 §4.20.1 (3)'s flat-ground bends); `s0.features`' relief column `terracedEdges` (row 9); and every other calibratable column | V11 (§3.24.1) | `panel` (M4-110; K2 its item) at M4, then `corpus` possibility (E1) at M-CAL | `retaining.lengthM` (and `retaining.onFlatM`, 0 by the invariant) | the panel rule, every move clamped by T-V11-32 (a)'s inequalities |
| `retaining` (row 79) by band: material weights, `batter`, `thicknessShare`, buttress `fromCm` and `spacingM`, `parapetCm`, towers per 100 m and their least step, and every other calibratable column but `settings.stateSnapCm` (seam SCC-110) | V11 (§3.24.1) | `panel` (M4-110) at M4 | `retaining.lengthM` | the panel rule |
| `raisedWays` (row 80) rows, CITY and METROPOLIS × kind: `chance`, `cap`, `pMax`; `raisedWays.settings`: `totalCap`, `viaduct.minDropM`, `viaduct.spanCostFactor`, `viaduct.maxSpanM`, `elevated.minRiseM`, `elevated.maxSpanM`, `elevated.bandFactor`, `elevated.landmarkFactor`, `elevated.landmarkMinSignificance` (V08's DR-V8.8 threshold, V11 §3.24.2; SCC-R2C-10), `landmarkMax`, `elevated.highGroundM`, `aqueduct.sourceReachKm`, `aqueduct.needRatioMin`, `aqueduct.minFallPerKm`, `aqueduct.gradient`, `aqueduct.capPerSizeMember`, `aqueduct.terminal`, and every other calibratable settings column — the chances and caps above their owner-stamped calibration minima (0.02, 1; J-V12.42); the rung gate is V11's schema, never a cell; `aqueduct.dossierFactor` withdrawn (V11's round 1, SS-13) | V11 (§3.24.2) | `measure` at M3a, where raised-way generation lands (V12 §3.6b's four raised-way bars; V06's growth parity reads the ways over the epochs by the `decline` lines below, never a stage of this line; round 6, SCC-99), then `panel` (M4-110) at M4, then `corpus` possibility (E1, E4) at M-CAL | `raised.count` | V12 §3.6b's default bounded by the owner's minima — a presence bar still failing at the floor is *not produced*; unrated: *provisional — not rated*; a reachability gap enters `known-defects.json` |
| `raisedWays.structure`: `clearanceCm` (cart, foot), `parapetCm`, `channelWallCm`, `channelCm`, `deckExtraCm`, `maxPierM` by kind, `pierSpacingM` by material, `pierWidthShare`, `pierMinCm`, `material` by band, `slideMaxFactor` (file f item 244), and every other calibratable column but the `span` block (the span-rule line's; seam SCC-110) | V11 (§3.24.2) | `panel` (M4-110) at M4 | `raised.count` (a course needing a taller pier than `maxPierM` drops, reported `raised_too_tall`) | the panel rule |
| `era` (row 50) `aqueductM`, `raisedVaultM`; the culture rows' `building` block (row 71) `aqueductM`, `elevatedM`, `raisedVaultM` | V11 (§3.19.1, §3.20.3) | `panel` (M4-110) at M4, then `corpus` possibility (E1: a frame's era and region reach its raised-way rates) at M-CAL | `raised.count` | the panel rule |
| `ways.crossing` (row 81) by way class: `rampMaxGrade`, the stair's riser, tread, landing interval and landing length, and every other calibratable column | V11 (§3.24.5) | `panel` (M4-110; K2's stairs and ramps) at M4 | `crossing.kinds` (V12 §3.4.2) | the panel rule; a cart class never takes a stair (V11 §3.24.5's failure rule, the owner's words) |
| `deck` (row 82) by kind: `offer` per rung, footprint and floors by band, `frontageM`, `minPlotDepthM`, `fill`, `endClearM`, and every other calibratable column | V11 (§3.24.4) | `panel` (M4-110) at M4, then `corpus` possibility (E1) at M-CAL | `deck.buildings` | the panel rule; V02's stand-ins `deck.fallbackM2` and `deck.fallbackFloors` close `fixed: superseded by V11's deck row` when that row lands |
| `deck.landmarks` (row 83): each slot's claimant chances, `minSpanM`, and every other calibratable column | V11 (§3.24.4) | `panel` (M4-110; K2's mole head, mid-mole and islet slots) at M4 | `deck.buildings` | the panel rule |
| `roster.specialisations` (row 84): each row's `chance`, `capShare`, `capMin` | V11 (§3.24.3) | `panel` (M4-110; its stepped-temple item) at M4 | `tier.count` | the panel rule |
| the stepped tiers: V11's `stepped-shrine` heights row (V11 §3.6.4); V02's stepped compositions (V02 §3.15) take V2 §3.10.10's stepped line, never this one (reconciliation round 4, SCC-81) | V11 | `panel` (M4-110; the stepped-temple item) at M4 | `tier.count` | the panel rule |
| `water` (row 85) `perHeadL` | V11 (§3.24.6) | `measure` at M3a — T-V11-33's bench at the start of V11's C3b (arid METROPOLIS seeds with an aqueduct candidate ≥ 0.5; temperate alluvial CITY seeds ≤ 0.2) | `water.needRatio` (V12 §3.4.2) | V11 §3.24.6's: `perHeadL` moves by 5 litres once toward the missed side and the bench re-runs; a second miss is reported to the owner with both measurements |
| `water`: `wellsPerHa` by geology, `wellYieldM3`, `roofShare`, `captureShare` by biome; `climate` (row 43) `rainMmPerYear` by biome | V11 (§3.24.6, §3.17.1) | as the line above, then `corpus` possibility (E1) at M-CAL | `water.needRatio` | V11 §3.24.6's fallback moves `perHeadL` only; these columns close with its result |
| `decline` (row 46) structures block: `retaining.holdM`, `retaining.neglectAfterYears`, `retaining.stretchM`, `aqueduct.disuseAfterYears` — written at V11's C3b (M3a) | V11 (§3.18; read by V06 §3.19.2, §3.19.4) | `panel` (V6-E7, AB `history` on H-100) at `V6-E7`, inside M6-E (round 6, SCC-99) | `retaining.lengthM`, `raised.count` over the epochs | the panel rule |
| the base decline table's persistence cells `raised`, `retaining` (registry row 46; §4.11 by BCR-V6-26, file f item 291, STAGED M6-E; V11 §3.18 holds no rate, V11's round 2, SCC-30) — written by the seat landing V06's E2 at M6-E, where the request lands (reconciliation round 3, SCC-54) | `base` | `panel` (V6-E7, AB `history` on H-100) at `V6-E7`, inside M6-E (round 6, SCC-99) | `retaining.lengthM`, `raised.count` over the epochs | the panel rule, with V06 §8's stated second value |
| V04's span-rule constants, the cells `raisedWays.structure.span` (row 80; V11 §3.24.2's name map; values stated in V04 BCR-45): `vaultShare` by kind (V04's `raised.vaultShare`, scaled by the era and culture `raisedVaultM`), `maxHeightCm`, `minHeadroomCm`, `maxFallCm`, `vaultCap` by rung, `deckDepthCm`, `supportFoundationCm` (J-V4.93; seam SCC-110) | V04 | `panel` (M4-110) at M4, then `measure` — T-V4-62's conformance, 0 violations — at `V4-U3`, then `panel` (V4-U5, `realism`) at `V4-U5`: three stages in milestone order, the cells landing at M3a (*Staged entries* below; V4 §8's row takes this order; reconciliation round 6, SCC-100, SCC-99) | `raised.count` | V04 §8's pre-decided fallback, else the panel rule |

**The panel rule** (J-V12.61). Where a line reads "the panel rule": a group rated No on its question moves the line's
cells once to the owning volume's stated second value where it states one — a declared `fallback` run (V12 §3.7) — and the
group re-sits at the next sitting; where no second value is stated, the entry becomes `not-achieved` and the group's
finding reaches the owner as a table defect in the reconciliation report (V12 §5.5); an unrated group leaves the entry
*provisional — not rated*, which never fails an exit (V12 §2.6).

**The provisional-number lint** (`plat calibrate register --check`, PR tier; V12C-14): **every** compiled cell whose
column is `calibratable` passes only when its provenance source is `ref:…`, `owner`, `owner-eye`, `host`, `corpus` (item
69's palette exception, or a historical pack's cell) or `sf:⟨file⟩@⟨baseline⟩` (V11 §2.2, BCR-V11-21), or an entry names it directly or by its
column, or its provenance note begins `fixed:` with its reason; everything else fails — so an `own` calibrate-later cell
(most volumes' constants: `growthFloorM2`, the terrace thresholds, the raised-way chances) never dangles. A cell no entry
covers fails naming its column and the command that writes the default line's entry (`plat calibrate register
--defaults --milestone <id>`); an entry carrying `line: 'default'` whose method, due, metric or fallback differs from the default
line's (its due `M-CAL`, or — only once M-CAL's record is committed — the `M-CAL/<layer>` its first history row's
`milestone` gives by *The due's corpus run*; a default entry due `M-CAL` still `provisional` once that record is committed
fails as written after M-CAL, owing its layer's run; reconciliation round 4's continuation, SCC-R3C-1), or whose `owner` is no document whose source file holds the column's cells (SCC-R2C-5), fails (a hand-edited
default is a named line without its section), and a default entry beside a named entry for
one column fails as two entries for one knob (reconciliation round 2's continuation, SCC-R1C-2); an entry, or a stage of
one, whose `due` is none of §16's ids, V12 §2.8's volume-qualified ids or a `CorpusRunId` fails, naming V12 §2.8's form —
the test `--milestone` applies — so no entry waits on an id no `MilestoneRecord` carries (`E2`, `U5`, "the raised-way
milestone"; reconciliation round 6, SCC-99); an entry whose last
cells row disagrees with its target's compiled cells, or lacks a compiled row key, fails by *A value moved by its owning seat before its due* (3)
(reconciliation round 5, SCC-90; round 6, SCC-98, SCC-103). Model constants the
volumes keep outside tables, in code, move into a table or take a `thr.` entry. An application or engineering
constant — a UI threshold, an autosave or export limit, a time budget — that its volume confirms by its own test or
performance row under D-18 (volume 9's and volume 10's calibrate-later constants: V09's autosave limits,
`raised.previewOnReleaseKm`, the deck scenes' export cap and its times; V10's budget row measured by T-V10-8) is outside
the register: its provenance note names that test, and no entry is written (reconciliation round 6, SCC-107; J-V12.81). Every §13.7 letter has an entry; every
entry's cell or column exists and is calibratable and every metric it names exists — a catalogue id, or a family member
that resolves (`siting.<spec>` and `bar.<barId>` to a registered bar, `frame.<table>.<column>` to a calibratable column; V12
§2.1; reconciliation round 3, SCC-56); one mechanism has one entry and one column (two
names for one knob fail); every cell that encodes an OWNER RULE item's hard clause carries its `ownerRule` stamp (V12
§2.10) — the check reads the stamped-clause list V11's compiler writes from the owner-rule rows; status moves only
provisional → confirmed | fallback-applied | not-achieved | owner-set | fixed (a `corpus` entry closed at its corpus run, M-CAL or `M-CAL/<layer>`, with its
reason), and confirmed → owner-set (a later pick) — a staged entry's advance from stage to stage is no status move (*Staged
entries* below; reconciliation round 6, SCC-105); a history row is appended, never removed.

**Milestone exits.** At the exit the landing seat appends to each `measure` entry due there — on a staged entry, to each
of its stages due there, by *Staged entries* below (reconciliation round 6, SCC-105) — one history row holding each
metric it names as the milestone's `ParityReport` gives it (a `bar.` metric: its bar's statistic and verdict); the entry
moves to `confirmed` when every `bar.` metric it names passes and every other metric meets the condition its line states,
and otherwise its fallback opens (V12 §3.7.1 (b); SCC-56) — or, for an entry whose cells no run may name (V12 §3.7.2 (4):
every metric its stage reads a `bar.` member whose bar's `BenchBarDef.stages` is `[]`), its line's stated fallback
applied by the exit's seat in the exit's change, recorded by the cells row of *A value moved by its owning seat before its
due* (2), the entry closing `fallback-applied` (reconciliation round 6, SCC-98). A `frame.*` metric is read only at a `corpus` stage (M-CAL, or
the later run `M-CAL/<layer>` that takes its column, V12 §3.10.1, §3.10.5): at an earlier exit it is not read and does
not hold the entry back, and its history row is appended at that run; an entry whose every metric is a `frame.*` member is
due at M-CAL — or, for a column whose first compiled cell landed after M-CAL's record was committed, at that column's
`M-CAL/<layer>` (*The due's corpus run*) — and the lint refuses any other due for it (reconciliation round 4, SCC-83; its
continuation, SCC-R3C-1). `MilestoneRecord.exitCriteria` (§13.3) gains one row per entry due at that milestone, with its
status and evidence (`result` widened to carry `not-achieved`, `owner-set`, `fixed` and `provisional-not-rated`,
BCR-V12-20); an entry still `provisional` past its due milestone fails the exit — §13.7's J-T ("no acceptance run treats
an unset value as passed") made mechanical — except a `panel` entry whose panel is unrated, which reads *provisional —
not rated* and never fails an exit (V12 §2.6). **Every volume's landing exits green:** a milestone of any volume that
lands a registry table, or a calibratable column of one, exits with `plat calibrate register --check` green over the cells
it lands — T-V12-20 runs at PR tier from M1, so the landing change carries its named lines' entries and the default
line's (reconciliation round 2's continuation, SCC-R1C-2; X-V12-16, met: each owner's §8 exit cells carry it, reconciliation round 4's continuation, SCC-R3C-12).

**Staged entries** (reconciliation round 6, SCC-105; J-V12.79). A line that names more than one stage — "`measure` at U3
…, then `panel` (V4-U5) at U5, then `corpus` possibility at M-CAL" — writes each of its entries with `stages` (V12 §2.6),
one per stage in the line's order: its method, its due in V12 §2.8's form (a `corpus` stage's a `CorpusRunId` by *The
due's corpus run*), its panel on a `panel` stage, `possibility: true` where the line says "possibility", and `metric`
where the line gives the stage metrics of its own; a line of one stage writes none, and every rule above reads its entry
unchanged. The entry's `method`, `due` and `panel` hold its current stage's: the first stage with no passing row, the
first at writing. A stage is read at its milestone's exit, or at its sitting for a `panel` stage, as *Milestone exits*
reads an entry, and appends its row with `stage: { index, outcome }`: (1) a pass that leaves a non-`corpus` stage unpassed
appends outcome `pass` and advances `method`, `due` and `panel` to the first unpassed stage, the entry staying
`provisional` — a stage advance is no status move; (2) the pass that leaves no non-`corpus` stage unpassed confirms the
entry; (3) a failing stage applies the line's "when it cannot confirm" there — its fallback (a `fallback` run, V12 §3.7.1
(b), or the hand fallback of *Milestone exits* where no run may name the cells), the panel rule's stated second value, or
`not-achieved` — and so closes the entry (`fallback-applied` or `not-achieved`), its later stages still read at their
exits as metrics or panel rows (outcome recorded) that move no cell and no status; (4) an unrated `panel` stage appends
outcome `unrated` and holds the entry *provisional — not rated* (V12 §2.6), never failing an exit, its later stages still
read at their own exits, and a later sitting's rated pass (V12 §3.9.1's re-offers) passing it; (5) a `corpus` stage is
read at its corpus run (M-CAL, or `M-CAL/<layer>` by *The due's corpus run*) whatever the entry's status then is — a
`frame.*` metrics row, and for a `possibility` stage that run's reachability rows (E1) and checks (E4) — and moves cells
only as V12 §3.10 lets a corpus run, into historical packs (R1), never re-opening, closing or advancing the entry (V12
§3.10.1's closing by the run's record binds entries whose only stage is `corpus`). A staged entry holding a non-`corpus`
stage due at a milestone whose `MilestoneRecord` is committed, with no row of that stage, fails that exit as an entry past
its due. **The order**, which the lint holds: a stage sits at the §16 row it is built inside — a §16 id at itself;
`M3a-V2` at M3a; volume 2's `M6a` – `M6c` at M6, before M6's own exit; `V3-P*` at M6-P, `V4-U*` at M6-U, `V5-P*` at
M6-sky, `V6-E*` at M6-E; `V-M0` – `V-M4` and `V-M2u` in their own order; volume 11's steps at their §16 ids (V12 §2.8) —
two stages at one row following their step numbers (`V4-U3` before `V4-U3b` before `V4-U4`) — volume 6's steps by V6 §8's *Order and dependencies* instead (E2, E3, E5 and E6 in any order after E1, E4 after E1, E7 after E1 – E6, E8 unordered against E7; seam SCC-109); M-1 – M4 follow §16's order
and precede every other row; M4b, M5 and the staged rows (M6, M6-U, M6-sky, M6-E, M6-P, the village's) are unordered
among themselves until the owner's product order fixes them (`_integrate`'s product-order questions), and two stages at
unordered rows are each read at their own exit, whichever comes first (the item-102 line's island and drift stages); a
`corpus` stage follows every other. The lint refuses a `stages` list the order places the wrong way round, naming the pair
(a `V4-U3` stage before an `M4` stage), a `corpus` stage before a stage of another method, a stage whose `due` fails the
lint's due test (V12 §2.8's form), and a staged entry whose `method`, `due` or `panel` is not its current stage's.

### 3.12 Failure handling — every failure, its rung, its report

No step discards and retries everything: each failure has a bounded ladder (§5's principle, applied to the harness).

| failure | detection | ladder | reported as |
|---|---|---|---|
| a capture fails (session crash, export error) | the capture script | same seed, up to 3 attempts; FTG: the next day, up to 6 days | a plan index in `sample.failed` with its reason — never silently skipped (C7) |
| a reference re-seeds itself inside a capture (MFCG's size-200 retry, sweep README item 6) | its console trace | kept: it is the reference's output for that seed | a row note |
| FTG payload without a resident count | the adapter | the size's nominal target (§13.6 (2)) | `populationSource: 'nominal'` |
| a metric not computable on a source | `requires`, `scale` | none | `notApplicable`, counted |
| an ⟨M-1⟩ number not measurable or not reproducible | M-1 | none | descriptive and in `known-defects.json` (§13.5) |
| two implementations disagree beyond tolerance | T-V12-3 | find the wrong definition; the product's value supersedes | `baselineShift`, note naming the metric |
| a parity row fails at a milestone | `plat parity` | the register's fallback or a tuning run; then the row's own fallback | the exit criterion; *not achieved* where the threshold moved |
| a tuning run finds nothing better, fails on holdout, or exceeds its budget | the run | one re-specified run; then the entry's fallback | `rejected` / `aborted-budget` with every evaluation kept |
| two runs claim one cell | the spec check | the second waits for the first to close | `refused` (rule 6) |
| a corpus map unreadable | the adapter | excluded | `excluded: 'unreadable'`; a frame dropping below 20 turns possibility-only |
| a sitting incomplete after seven days | `plat d5 verdict` | re-offered at the next milestone (§13.6 (7)) | *provisional — not rated* |
| a key that does not match its commitment | `plat d5 verdict` | the panel is void; a fresh sealing and sitting | the owner's answers kept as notes |
| a statistical bar short of its minimum instances | `plat statbar` | towns in steps of 50 per level up to `seeds.max` | `insufficient`, gating as a fail naming the shortfall; the owner adds a fixture level |
| an `exactMonotone` violation | `plat statbar` | none: a property | fail naming the fixture, the two levels and both values |
| a level's site override cannot be frozen (a stage before S1 reads it) | `plat statbar` at spec registration | none | the spec is refused; its owner states the level through a recipe or dossier input instead |
| a statistical bar fails on its towns | `plat nullmodel`, `plat statbar` | one re-run on the fresh `c1` family at twice the towns (V12 §3.6) | `suspect`; `pass` on confirmation; `fail` only when both fail, then the fallback |
| a level whose generator has not landed, or a population level outside [1 500, 120 000] | `plat statbar` | none | `notApplicable`, reported, never a failure (V12 §3.6b) |
| a spec whose pooled null share exceeds 0.85 (below 0.02 for `lower`), or a `servedShare` / `nnSameKind` spec off town scope, or a `servedShare` spec of more than one class, of a class without a coverage row (`unit: 'coverage'`) or of a `settlement`-unit class | registration | none | refused naming the lint; the owner restates the indicator (a `settlement`-unit class is reported `notApplicable` in its bar) |
| a run spec naming an owner-stamped cell, or a bound below an owner-stamped minimum | the spec check | none | `refused` (rules 2, 5) |
| a known-city StructureCheck fails | T-V12-36 | none: the capability or the fixture is wrong | the exit row `T-V12-36:<id>` fails with the check's id and plain `what`; a guard flip when inside a run |
| an item-110 change moves an off-state golden, or an unrelated shift's stage list differs between the sets | the no-op pin (V12 §3.7.8) | none | CI fails naming the pin, the suite and the stage |
| a raised bump moves a THORP – TOWN S4 or S5 isolated digest | the golden tooling at the bump | none | CI fails: not a declared shift (V12 §3.7.6) |
| a witnessed form an owner rule excludes | E1, E4 under R6 | none | an `ownerExcluded` row and an owner question; never a known defect or a layer cell |
| a `known-defects.json` entry this volume opened is cleared (a bar passes, a reachability is met, a fallback lands) | the run or report that clears it | — | closed, never deleted, listed in `MilestoneRecord.knownDefects.closed` with the clearing run's or report's id |

### 3.13 Determinism

All randomness in the harness comes from `TestStream(label)` — xoshiro128\*\* seeded by H128 of the label (the published
generator and hash of §17.1 (8)) — with structured labels (`null/<spec>/…/perm`, `null/<spec>/…/tie`, `lots.r4/<seed>`),
never a clock; the pooled exact test's convolution runs in integer-indexed doubles in town order with a fixed summation
order, and verdicts are computed on unrounded values; the known-city fixtures seed from `known/<id>`; only
the panel's sealing salt comes from the operating system, by design (V12 §3.9.3). Metric code uses `dmath`; per-town work
runs in workers and merges in seed order. A `ParityReport` has one canonical form: rows sorted by (reference, metric,
rung, preset); numbers written with six significant digits by our own formatter (round half to even on the decimal
string, never the host's float printing); keys sorted — so the same inputs give the same bytes on every host, and a
report's hash in a run record is a check (J-V12.9). A calibration run's spec, seeds and evaluation order are fixed before
it starts, so re-running a spec reproduces every evaluation (T-V12-8).

### 3.14 The known-city fixtures — one engine for both (item 110 (e), (f); J78; T101-6)

**3.14.1 What they are.** Two acceptance fixtures of the authoring toolkit, each an original skeleton with a city's
structure and our own names: **K1**, J78's (T101-6), and **K2**, item 110 (e)'s second fixture ("both known-city fixtures
pass", item 110 (f)). This section is their one statement of setting, seed, structure list and golden (single source:
V09 §7.2 cites it for its dedicated-user checklist and thresholds, V10's evaluation group A reads the fixture record,
X-V12-8); the types are V12 §2.12. Their canvas scripts are V09's content, their transcripts V10's, the building bars on
K2 V02's (T-V2-44 – T-V2-47), the vault bars V04's (T-V4-62 – T-V4-70), and V01's T-V1-54 re-runs K2's skeleton with stage 2
on at M5.

**3.14.2 Inputs, authors and the clean room (V12C-42).**
* **K2's brief** is written from item 110 (e)'s list alone, in our words, with our own names — drawn from our naming
  tables at the fixture's seed or invented by the seat. This volume names no reference city, ward or landmark and cites
  only "item 110 (e); J114". V09 §7.2 holds the brief's current draft (its six ward names are our own); the file is
  `brief.md` in the fixture's input folder.
* **Who writes them.** The brief, the skeleton, the canvas script and the transcript are authored by implementer-tier
  seats that hold only the base and the volumes (§17.1 (1)); none of them opens `research/reference-maps/` or
  `docs/experiments/`. BCR-V12-16 removes the experiment note's path from T101-6's text, so the base points an implementer
  at nothing research-side.
* **The name scan.** BCR-V12-18 adds the place, ward and landmark names legible on the study-only reference maps
  (transcribed research-side by the research seat, digests only) to §17.1 (5)'s deny-list, so the check `namesClean` (0
  scanner hits on `plat/tests/fixtures/known-city/**` and `plat/goldens/known/**`) catches a carried name.
* **No outline traced.** At M3a's exit the checker seat compares each fixture's `ink` render with its study image,
  research-side, and records the verdict "no outline traced" as evidence in the `MilestoneRecord`'s exit row; only the
  verdict crosses into `plat/`.
* **Files.** Inputs in `plat/tests/fixtures/known-city/<id>/` — `brief.md`, `skeleton.plat`, `canvas.json` (V09),
  `transcript.json` (V10: at M3a a scripted transcript of tool-API calls, from M3c V10's cassette); the fixture record and
  its golden in `plat/goldens/known/<id>/` (`fixture.json`, per output version the model digest and the StructureResults).
  V09 §7.2's draft path `plat/test/fixtures/known-city-2/` becomes `plat/tests/fixtures/known-city/K2/` (X-V12-8).

**3.14.3 Three authoring paths (J-V12.41).** Each fixture is authored T101-6's three ways: the skeleton file, V09's canvas
script, and the tool API from the recorded transcript. The skeleton file and the canvas script share one model digest
under the fixture's seed; the structure list holds on all three; and its **emulation subset** — the checks whose entities
are all declared at L1 or L2 by §7.1's level table, computed at registration, never hand-listed — holds on V09's variant
declared only to L2. Item 110 (e)'s "authored both ways" names the two paths that share a digest; its "the same acceptance
bars as the first fixture" brings the third.

**3.14.4 Settings and seeds.** K2: CITY, 20 000 people (the rung's default, §1.1), water `coast`, seed `known/K2` →
3205843448. K1: CITY on its declared coast and river, as T101-6's brief declares, seed `known/K1` → 3403473561. The seeds
are family `known` at priority 1 (V12 §2.4), in the collision domain of every lower-priority family.

**3.14.5 K2's structure list.** Written from item 110 (e) alone; no check adds a feature item 110 (e) does not name. Every
threshold follows from the brief's declarations, never from a count the rules may or may not fill: generated extras — a
viaduct the site calls for at CITY, more retaining walls, more towers — are reported in `extras`, never failed.

| id | check (the `what` line is the plain sentence the report and the dedicated-user checklist print) |
|---|---|
| K2-1 | `enceinte`: the outer enceinte closed by `shore` (item 106's barrier closure); its built stretches one open chain with both ends on the shoreline within 1 m; ≥ 2 towers; ≥ 1 land gate with a square touching its inner side (the gate plaza) |
| K2-2 | `harbour`: a basin whose mouth a mole bounds; a fort at the mole's head; a tower within 20 % of the mole's length from its midpoint |
| K2-3 | `causeway`: from the mole or the shore to an islet of ≤ 1 ha that holds a lighthouse |
| K2-4 | `anchorage`: ≥ 8 declared jetties outside the mole's basin, with deck-plot buildings standing on ≥ 4 of them (the deck rows fill piers by chance — item 110 (d): a deck "may carry plots" — so "every jetty" would not follow from the declarations) |
| K2-5 | `terracedWards`: ≥ 3 terraced wards, each bounded at least in part by an enceinte of kind `inner`, together holding ≥ 10 retaining walls (drawn by T3 `retaining` or the edges of T2 terrace strokes, item 110 (a)) |
| K2-6 | `stairOrRamp`: every way crossing a retaining wall is a stair or a ramp there |
| K2-7 | `ringStreet` × 2: ring streets round the two declared precincts |
| K2-8 | `raisedWay`: the one declared raised straight road (T4 with `raised` on) — its largest chord deviation ≤ 2 % of its length; it crosses ≥ 2 part-0 ways with 0 junctions; both ends ramps or stairs on part-0 vertices |
| K2-9 | `ravineQuarter`: a ravine (a T2 stroke) under a declared quarter with ≥ 5 retaining walls and item 70's informal clusters — the stepped housing |
| K2-10 | `stepped`: a stepped temple of ≥ 4 tiers (V02's `stepped-temple` row; T-V2-44 checks the tiers themselves) |
| K2-11 | `landmark`: an arena (V11's `arena` class) |
| K2-12 | `quarter` per declared ward, present by name and kind, and `namedPlaceInQuarter`: every named place in its declared ward (T101-6's clauses) |
| K2-13 | `namesClean` |

**3.14.6 K1's structure list** runs on the same engine: T101-6's three clauses (every declared quarter by kind and name,
both enceintes with their gates, every named place in its declared quarter) and V09 §7.2's checklist — two enceintes, nine
gates, three region labels, every named place present and in its region, the bridge fortress, the cemetery on the cliff,
the satellite across the river — each cited, plus, since item 110 (d) un-stages them, **the bridge fortress's bridge
carries deck plots with ≥ 1 building** (V12C-49). K1's golden moves with the deck switch-on bump, declared (V12 §3.7.6).

**3.14.7 The bar T-V12-36, tiers and exits.** The milestone tier runs all three paths of both fixtures from M3a, as
T101-6 (§13.8); the PR tier runs K2's skeleton path only (one CITY generation, ≤ 5 s, V12 §6). A failing check names its
id and its plain `what`. The `MilestoneRecord.exitCriteria` carry one row per fixture, `T-V12-36:<id>`, listing the
failing checks' ids.

**3.14.8 The golden and its shifts.** Each fixture's golden — per output version its model digest and StructureResults —
is recorded at M3a and moves only by declared shifts that name it (`ShiftRecord.seeds[].fixture`, BCR-V12-19): item 110's
switch-on bumps (V12 §3.7.6), stage 2's landing at M5 (T-V1-54), and any other table bump that moves it. The generation of
raised ways may land after M3a; K2's golden then moves at that bump, declared. A capability absent at M3a fails its
StructureCheck at M3a's exit — there is no deferral (the owner's no-defer rule); the fixture's milestone assumes §16's M3a
row carries item 110 (a) – (d)'s base parts (V02's BCR-V2-39; X-V12-12).

**3.14.9 Guards and consumers.** Both fixtures are in every calibration run's `fixtureSuites` (V12 §3.7.5): a chosen
candidate that fails any StructureCheck is rejected (two CITY generations and a few seconds). Both are no-op pin suites
(V12 §3.7.8). K2 is the first item of the M4-110 group (V12 §3.9.1). V03's B-PLAN click set includes both from P1.

## 4 Editing

### 4.1 No new map event: calibration reaches a town as tables and presets

Calibration adds no event to §7.1's vocabulary and no declaration to item 101's tools. Its outputs reach documents in
three ways the base already edits: **table versions** (a release's re-signed cells, pinned in each recipe, §6.4), the
**historical pack** `historical:<frame>` (§7.6's packs slot, for documents of its era and region), and **thresholds**
(test-side, never in a document).
* A user overrides any calibrated value like any cell — the tables editor, the override layer, orphaned and shown side by
  side when a newer table version changes the row (§7.6); "reset to the shipped value" removes the override.
* A new town of a matching era and region takes an adopted historical pack by default and a selectable one from the
  preset dialog at creation (T1 `intend`'s advanced panel, V09); an existing town applies or removes it through §7.6's
  pack `adjust` (`param: 'packs'`) — a Re-derive from the pack's first reader stage with the fate report, the whole apply
  one undo step.
* A calibration release never changes a saved town silently: the town keeps replaying under its own output version, and
  moving it to the new tables is §7.5's upgrade, with its diff and its undo.
* **A removed raised way stays removed (V12C-44; the owner's "then a user can decide to add or remove").** A table release
  or a historical pack never re-opens a raised way the user removed. The removal is keyed to its **reason** — the drop,
  link or water need that raised it — not to the way's course (the key's owner is the base's §7 with V06's suppression,
  §3.19.1), so an apply or an upgrade that moves the course (a lower `viaduct.minDropM`, a doubled chance) keeps that
  reason suppressed, and the fate report lists the suppression as held. T-V12-40 tests it; X-V12-10 asks V06 and V09 to
  keep the key's identity independent of the course.

### 4.2 The records' verbs

The harness's records are repository data, changed only by these commands, each append-only with its undo:

| verb | changes | undo |
|---|---|---|
| `plat baselines check --previous <file>` then the baseline seat's commit | adds `Baseline` rows, a pin, a `CrossingRecord` | a superseding row (C9: nothing is deleted) |
| `plat calibrate run <spec>` | a `CalibrationRun`; if accepted, table sources, a minor version, shift records | a revert run whose spec restores the `from` values — itself declared |
| `plat calibrate register [--check]` | entry statuses from runs, picks and M-1 records, and a released pick's cells row (seam SCC-112) | a history row appended; a status never returns to `provisional` except under a new major table version |
| `plat calibrate register --defaults --milestone <id>` | the default line's entries for calibratable columns that hold a compiled cell and have no entry, each with a first history row naming the landing milestone and its `due` from it (V12 §3.11, *The due's corpus run*); on an existing default entry, or a named entry whose cells no run may name (round 6, SCC-98), `provisional` and not yet due, whose target's compiled cells differ from its last cells row on the row keys that row holds, one appended row `{ date, value, milestone, cells: true }` — its only change to an existing entry (V12 §3.11's *A value moved by its owning seat before its due*; reconciliation round 5, SCC-90); on any entry whose target's compiled cells add row keys its last cells row lacks, the held keys unchanged, one appended cells row whatever its status or due (*Rows added*, (2′); round 6, SCC-103); without `--milestone` it refuses, writing nothing and naming the flag (SCC-93) | the change that wrote them is reverted with the table change that landed the columns, and a moved-value or rows-added row with the table change that moved the value or added the rows; a later named line restates an entry in place, never deletes it |
| `plat calibrate register --hold <entry> --milestone <id>` | one held row `{ date, value: null, milestone, held: true }` on a `provisional` default entry, or a named entry whose cells no run may name, whose owning seat's tuning the change's golden check refused — its only change (V12 §3.11's *A value moved by its owning seat before its due* (1); round 6, SCC-102); refused on any other entry, naming why | reverted with the change that recorded it; a later cells row supersedes it in the report |
| `plat nullmodel <spec>`, `plat statbar <spec>` | results inside a report | — (a result is a fact) |
| `plat d5 seeds / render / verdict <panel>` | `seeds.json`, renders, `record.json` | a new sitting writes a new record; answers are never edited |
| `research/baselines/*`, `research/d5/*`, the corpus adapter (research side) | capture plans, `MeasureInput` files, candidate files, sitting pages, the corpus index | re-run from their inputs |

### 4.3 The owner's inputs

The owner acts at six points, each recorded with its date: the sittings' answers, strip picks and `house` pick
(`D5Record`), the M4-110 group's among them; a written acceptance of a failed or unrated panel (`D5Record.acceptance`,
§13.6 (6)–(7)); the opening of M-CAL and of each later corpus run `M-CAL/<layer>` (`ReconciliationRecord.opened`, V12 §3.10.1); the palette pick if one is needed (V12 §3.10.7); the
ruling on Q-V12-3, per frame; and the answer to each `ownerExcluded` question of the reconciliation report ("keep the
rule" by default; a change of an owner rule is an owner amendment, never a run). A pick becomes an `owner-set` register
entry; no run and no seat moves an owner-set value afterwards (V12 §3.7.2 rule 2).

### 4.4 The clerk's view and the cell inspector

Every calibrated cell carries its `evidence` ids (V12 §2.10), and `dist/evidence.json` ships each cell's register status
and one plain line per cited id. The tables editor's cell inspector (V09; X-V12-6) shows the cell's provenance source,
its evidence lines and its status in plain words (provisional, confirmed, fallback applied, not achieved, owner-set,
fixed; "the owner's rule" for a stamped cell), and the preset dialog lists the adopted and selectable historical packs.
The clerk's "why" (§14, V10; X-V12-7) answers a question about a value — "why are lanes this curvy?" — with the plain line
first ("tuned so organic lanes turn as much as FTG's streets per 100 m") and the run id only behind "details" (item 101's
plain-words rule). No clerk and no API call can start a calibration run: calibration is a repository process run by
seats, never a document action.

## 5 Rendering, labels, exports

### 5.1 The parity dashboard

`plat parity --html` writes one self-contained page (inline SVG, no external script or font request, our own UI colours —
no reference palette): a header (output version, tier, date, the baselines file's hash, counts of pass, fail, reported,
not applicable); a **plain-words summary** — "37 of 41 comparisons in band; out of band: …", each out-of-band row as its
metric's `plain` sentence; then one table per reference and rung: metric (plain name and id), ours, band, verdict (a
word and an icon, never colour alone), and a sparkline of ours over the last 14 nights. `plat parity` appends one line
per row per run — date, row id, ours, verdict — to `plat/goldens/parity/history.jsonl`, pruned to 60 nights, and the
sparkline reads it (the nightly reports themselves are CI artifacts the CLI cannot read). Each distribution row opens a
small chart of our per-seed CDFs against the reference seeds'. A tendency bar's verdict prints as a word — pass, pass on
confirmation, suspect (re-run pending), fail, not applicable — with its test value. Milestone dashboards are stored beside
their reports in `plat/goldens/parity/`; nightly ones are CI artifacts kept 30 days.

### 5.2 Run, register and correlation reports

`plat calibrate report <run> --html`: the spec, a chart of score against candidate value in evaluation order, the train
and holdout tables, the changes with their evidence, the shift records, the plain sentence. `plat calibrate register
--html`: counts by status and owner, entries due at the next milestone, overdue entries first, and the default line's
entries by owner and table with those a change's `--defaults` run wrote marked new; every entry a change's `--defaults` run appended a
moved-value row to marked moved and a rows-added row to marked rows added ("rows added after close" where the entry had
left `provisional`); every entry whose last row after its last cells row is a held row marked "held: a committed golden
reads it"; the entries it owes to a run listed (V12 §3.11; reconciliation round 5, SCC-90; round 6, SCC-102, SCC-103);
and each staged entry with its current stage, the stages passed and any stage read after its close (round 6, SCC-105). `plat nullmodel --html`:
per spec the share and median z against the rule, a per-seed strip of z values, the settings skipped and why. `plat
statbar --html`: per bar its test value against its pass line in words ("pooled share 0.78 over 131 effective instances,
needs 0.67: pass"); for an ordered rule each level's rate with a two-standard-error whisker; for a paired rule the
per-seed table of the three measures; for a property its violations (record, step, before, after); the confirmation
re-run beside a suspect first run; verdicts as words and icons, never colour alone. `plat known --html` prints each
fixture's StructureResults per path — every check's `what` line with pass or its finding, and the generated extras — and
`plat noop --html` each pin's suites with byte-identity per stage.

### 5.3 The panel renders

§3.9.2's `PanelRender`: 1 600 × 1 200 px PNG per side, matched metres per pixel, no labels, no furniture, the fixed sun,
PNG text chunks stripped, file names the images' content hashes. The label pass renders the same frames with labels on.
Our side is drawn by §8's pipeline under the pair's preset and family (§13.6 (3)); nothing in this volume adds a paint
program or a style.

### 5.4 The sitting page

Research-side, one local HTML file per panel (V12 §3.9.4): a plain-words first screen; pairs full width, each side
enlargeable; buttons with visible keyboard shortcuts; a progress bar and a "pause" that keeps the answers; no text that
names a generator, a reference or a side. It meets the app's accessibility contract where it applies (§14's WCAG 2.2 AA
chrome rules: keyboard-only operation, visible focus, 4.5 : 1 text contrast); the images are the thing judged, so they
carry no alternative text that could reveal a side.

### 5.5 Release notes and the owner's reconciliation report

`@plat/docs`'s release-notes generator (§14) gains a **calibration** section built from the release's `CalibrationRun`s
and their shift records: per run, the metric's plain sentence, the cells moved (`from → to`), the reference or frame, and
the run id; and a **new behaviour** line for each feature switch-on bump (V12 §3.7.6) — "cities may now build viaducts,
raised roads and aqueducts where the ground or the water calls for them; you can remove any". At M-CAL, the owner's
reconciliation report is one page per frame in plain words: what the historical maps changed, what they were not allowed
to change and why (the refused list, by rule), which witnessed things the generator cannot make yet, each `ownerExcluded`
row as a question with the recommendation "keep the rule", each owner-stamped minimum a run met ("the historical maps show
few raised ways; the owner's rule keeps cities able to build them, at the lowest chance"), the default line's columns that
closed `fixed` with "no admissible frame", counted by volume (V12 §3.11), and three before-and-after thumbnails. A later
run `M-CAL/<layer>` (V12 §3.10.1) adds its own page in the same form, its thumbnails only where it moved a cell.

### 5.6 Exports and labels

Every record is JSON under its schema; `plat parity --csv` and `plat calibrate register --csv` write flat tables for a
spreadsheet; the research-side markdown mirrors of the shift and panel records are §13.3's. This volume draws no map label
and exports no map feature: the panel renders are §11's PNG export at a fixed frame, and `MeasureInput` for our towns is
§11.1's metric GeoJSON.

## 6 Performance budgets

Single-thread figures on the reference machine (§12.1), normalised by the calibration score; PLAUSIBLE until measured at
the milestone named.

| work | budget | measured at | pre-decided change if missed |
|---|---|---|---|
| `measureInputOf(doc)`, item 110's kinds and properties included | ≤ 15 ms at CITY, ≤ 45 ms at METROPOLIS | M1; again at M3a with item 110's kinds | build it from the columnar display list's model columns instead of entity walks; the new kinds likewise |
| all `geo` metrics of one town (the sum of `costMs`, derived blocks and street graph included) | ≤ 300 ms at CITY, ≤ 900 ms at METROPOLIS | M1 | the R4 sample drops from 1 500 to 750 (a major metric version: its reference rows are re-measured through `plat measure`, V12 §3.4.3) |
| `render` metrics of one town (the matched-scale city band and recoverability) | ≤ 1.5 s at CITY, ≤ 4 s at METROPOLIS | M1 | render metrics run every third night, rotating the settings |
| one `NullModelSpec` on one town (K = 20 permutations and the statistic; the town itself read from B-CITY) | ≤ 40 ms at CITY, ≤ 120 ms at METROPOLIS | M2b | K drops to 12 and the rule is re-calibrated by the rank receipt's code before use |
| B-REF nightly, counted per preset arm: MFCG TOWN, CITY and METROPOLIS at `none` × 2 arms (the `MFCG` preset for P rows, `'default'` — no parity preset, V12 §2.1's `PresetArm` — for O and C rows) × 20 = 120 towns; MFCG `coast+river` at CITY × 1 arm × 20 = 20 (no stress baseline at TOWN or METROPOLIS, V12 §3.2.1); FTG 6 settings × 2 arms × 20 = 240; NG from `ng-counts.json`'s recorded districts (no search), ≈ 20 districts opened at LOD — ≈ 400 towns, ≈ 3 s each on average with the render metrics (METROPOLIS 40 of them) | ≤ 20 CPU-min, ≈ 2 min wall on 16 cores | M1 | render metrics every third night; then the O and C arms at 10 seeds nightly (20 at milestones) |
| all pooled statistics nightly — every `NullModelSpec` and pooled `StatBarSpec` on B-CITY's towns: the marginal cost only, K × the statistic (≈ 60 specs × 200 towns × 40 ms at CITY ≈ 8 CPU-min) | ≤ 10 CPU-min | M2b | specs rotate over nights by spec id; each spec still runs at least every third night |
| specs on their own `null/…` families (custom-chain fixtures, forced sites) and the web, comfort and chain bars of V12 §3.6b | ≤ 15 CPU-min together, nightly | M2b | they rotate over two nights |
| the confirmation re-runs (`c1`, twice the towns), when a bar is suspect | ≤ 10 CPU-min per night, outside the tier budget as a runner job | M2b | queued to the next night |
| a site-stage sweep bar (item 109's relief trend: 200 site draws; the mining comparison: 1 600), `stopAfter` S1 | ≤ 2 CPU-min | U3 (V04) | — |
| a full-town underground bar (the access trend: 40 towns per rung, 120 at TOWN … METROPOLIS until V-M4, 240 from THORP after; the paired, two-sample, rate and floor bars) | ≤ 60 CPU-min each, milestone tier and weekly | U3–U5 (V04) | the bars alternate weeks |
| the catacomb properties (the step script on the surveyed-dossier fixtures; H-100's epochs are V06's run) | ≤ 5 CPU-min nightly | U5 (V04), E-milestones (V06) | the script runs on half the fixtures per night, alternating |
| a known-city fixture's skeleton path (PR): one CITY generation plus the structure checks (≤ 0.5 s) | ≤ 5 s per fixture | M3a | the PR run takes K2 only; K1 runs nightly |
| both fixtures' three paths (milestone tier) | ≤ 10 min wall, the canvas scripts' 10 minutes being V09's (b) | M3a | the transcript path runs nightly instead |
| the no-op pins, nightly (the registered suites once more under the overlay) | ≤ the golden job's own time once more | M3a | the pins rotate by family over two nights; the landing gate stays per commit on the two PR golden seeds |
| the four raised-way bars (≈ 1 700 – 1 900 towns per full run), weekly and at milestones | ≤ 20 CPU-min together, with `stopAfter` the raised-way stage | M3a, where raised-way generation lands (file f items 244, 290) | the METROPOLIS levels run at milestones only |
| a TOWN guard setting inside a run (30 towns) | ≤ 1 CPU-min per candidate | the same | the guard runs on the chosen candidate and the bracket's endpoints only |
| `dist/evidence.json` | ≤ 200 kB shipped | M2b | lines longer than 160 characters truncate at a word, the full text staying in the run record |
| milestone parity (100 seeds per setting) | ≤ 60 CPU-min | M2b | 60 seeds per setting |
| one tuning run | the spec's `budgetCpuH`, default 2 CPU-h (a one-cell golden search ≈ 12 probes × 90 towns ≈ 18 CPU-min before the shortcut) | M2b | V12 §3.7.5's `aborted-budget` |
| the crossing check on a 5 000-row file | ≤ 30 s | M-1 (twin), M1 | — |
| the register check | ≤ 10 s (PR tier) | M1 | — |
| panel assembly (36 pairs, strips) | ≤ 10 min | M1 | — |
| the owner's sitting | ≤ 45 min, splittable into three sessions, at most one re-offered panel inside it | M1 | fewer strips per sitting; strips carried to the next |
| the four short sittings and the M4-110 group | the floor plans ≈ 20 min, the underground ≈ 15, the islands ≈ 5, the town histories ≈ 10; the M4-110 group ≈ 5 inside M4 | V3-P6, U5, M6-sky, E7, M4 | a short sitting may join the next main sitting within its 45 minutes |
| a corpus map's measurement / a frame's runs | ≤ 3 s per map / ≤ 4 CPU-h per frame | M-CAL | frames run on successive nights |

Calibration runs and M-CAL's runs are jobs on the CI runner outside the three tiers, never during a tier's timing phase
(§12.1), so they cannot disturb a timing that gates a budget; the tiers' own budgets (§13.8) do not change.

## 7 Tests and acceptance bars

### 7.1 The bars

Classes as §15.2: C conformance, P parity with a measured reference number, O an outcome beyond the references.

| bar | statement | class | tier / from |
|---|---|---|---|
| T-V12-1 | **The crossing refuses what must not cross.** Fixture files — a place-name string in `capture`; a 201-character note; a six-hex-digit sequence; a row without `referenceBuild`; `sample.indices` starting at 3; a removed row; an unsalted corpus id; a corpus *target* row with `frameN` 12; a corpus string other than a preset key; a frame row whose frame's `frames.json` crossing is not earlier; an `answers.json` note carried as text — are each refused naming their check (C1–C10); an upper-case `sample.family` (`capture/MFCG/40/plain`) passes C2; the M-1 file passes the product check with 0 refusals at M1 | C | PR fixtures; M1 |
| T-V12-2 | **The band arithmetic.** On synthetic samples: n = 1 gives exactly c × 0.85 … c × 1.15; n = 5 gives the union of V12 §3.5.2; n = 10 gives the type-7 quantiles computed by hand; a sign-`any` metric widens additively; `absFloor` holds; the KS rule pairs single seeds and takes the reference's pairwise p90 | C | PR from M1 |
| T-V12-3 | **One implementation.** For every M-1 baseline, the released CLI's `plat measure` on the same `MeasureInput` agrees with the M-1 script within the metric's `tolerance` (default: 0.5 % relative or one unit of the last printed digit); recoverability within 0.01 on M1's golden renders (§16 M-1). Research-side (`research/baselines/check_t3.py`); its verdict reaches the exit record as the output hash | C | M1, research-side |
| T-V12-4 | **Our input equals our export.** On the golden suite `measureInputOf(doc)` equals the metric GeoJSON export read back — ids, kinds, classes (the `WayClass` mapping of V12 §2.2), `use`, `district`, `prosperity`, item 110's kinds and properties as file f item 447 exports them and V12 §2.2 declares them (the kinds `retaining`, `raisedSupport` and `span`; an aqueduct as a `way` of class `aqueduct`; `part`, `raisedKind`, `source`, `reason`, `onDeck`, `stair`, `ramp`, `stepMinCm`, `stepMaxCm`; 447's other properties dropped on read by V12 §2.2's one rule), the closures' six barrier kinds (J-VI.3), coordinates to the centimetre, each retaining wall and each built stretch one feature after V12 §2.2's merge of file f items 447's and 575's runs (`wall`, `run`, `state` and `condition` dropped) — and every `geo` metric gives equal values on the two; on a fixture document whose curtain holds one breached and one dismantled run and whose retaining wall holds one decayed run (their profiles written in the fixture), the read-back holds one feature per built stretch and per retaining wall, `stepMinCm` and `stepMaxCm` the least and greatest over the runs, and `wall.nodeSpacing` and `wall.towerSpacing` equal the fixture's all-standing twin's (reconciliation round 3, SCC-61) | C | PR (two golden seeds); nightly (the suite) from M1; item 110's clause from M3a; the runs clause from M4 (item 575) |
| T-V12-5 | **Like with like.** On B-CITY-lite towns the cluster-block and derived-street-graph metrics computed on our full input equal those on the same town's input with plots, blocks and lanes removed | C | nightly from M1 |
| T-V12-6 | **Measurement parity with our recorded measurements of MFCG.** The released CLI's `plat measure` on the five exports of `captures/mfcg/exports-2026-09-25/` reproduces gross cover 0.657 / 0.582 / 0.621 / 0.583 / 0.569 to three decimals, walled shares 0.98 / 0.97 / 0.92 / 0.82 / 0.30 to two, city gates 0 / 1 / 4 / 9 / 7 exactly and towers 33 / 32 / 29 / 24 on the dry cities, R4 medians within 0.02 of `docs/validation/bench/mfcg_orient.out`'s per-city values (the red-team used vertex-mean centroids and its own sampling; ours area centroids and our stream — the 0.02 absorbs both), the wall-alignment shares within one point of `mfcg_wallalign.out`'s; and on the sweep (`captures/mfcg/exports-sweep-2026-09-25/`) the buildings, walled share, cover, median footprint, gates, districts, plaza and castle areas of every size exactly as its `stats.md`. Research-side (`research/baselines/check_t6.py`); its verdict reaches the exit record as the output hash | P | M-1 (twin); M1 (the released CLI), research-side |
| T-V12-7 | **Reports are facts.** Two `plat parity` runs on the same inputs, on Node x86 and arm64, give byte-identical reports | C | nightly from M1 |
| T-V12-8 | **Runs reproduce.** A calibration spec run twice gives the same evaluations, the same chosen values and the same holdout report hash | C | M2b |
| T-V12-9 | **Runs keep to their scope.** Specs naming an `owner`, `owner-eye`, palette-target, `host` or `sf:` cell (provenance source `sf:`, V11 §2.2, BCR-V11-21), an `ownerRule`-stamped cell, a `raisedWays` row below CITY (refused by V11's schema before the spec check), a non-calibratable cell, a `presets.MFCG` or `presets.FTG` entry, a `presets.FM`, `presets.VG` or `presets.NG` entry in any run but a `reference` run against that preset's own reference or a `fallback` run applying that entry's own register fallback (or such a run that also names a default or another preset's entry, or a fallback run moving it to any value but its entry's stated fallback), a preset entry that no register entry names (a code-read `ref:… (code)` entry or a `fixed:` off value; reconciliation round 3, SCC-60), a bound outside the column's range, `lo` 0 on a CITY raised-way chance or a cap (below the owner-stamped minimum, rule 5), a table no target stage reads, a fifth cell, or a cell another open run holds are each refused before any evaluation; a fallback whose doubled value would pass its range top is clamped, and one already at the top goes to *not produced* | C | PR fixtures from M2b |
| T-V12-10 | **The holdout holds.** A planted over-fit fixture (a target whose train seeds are biased by construction) is rejected on the holdout; train, holdout, `bref`, `golden` and `bcity` seeds are disjoint for every setting (the collision rule) | C | M2b |
| T-V12-11 | **Guards win.** A candidate that improves its target but flips a passing C bar or owner-rule bar on the train seeds is never chosen; a chosen candidate that passes its targets but breaks a B-DOSSIER-lite bar, an owner-rule hook fixture or a known-city StructureCheck is rejected with `guardFlips` naming it; a run touching a raised-way row evaluates its TOWN guard setting, and a candidate that raises a way at a TOWN guard town, or moves a TOWN S4 or S5 isolated digest, is never chosen | C | M2b; the TOWN clause from M3a, where raised-way generation lands (file f items 244, 290) |
| T-V12-12 | **Emission is declared.** An accepted run yields a minor table version, provenance `ref:…` with evidence ids that resolve to baseline rows and the run, a `ShiftRecord` with cause `calibration` for exactly the stages whose isolated digests moved, the register's history row and the release-note sentence; a digest that moves without a record fails CI | C | M2b |
| T-V12-13 | **Reverts are exact.** A revert run restores byte-identical tables and stage digests of the version before the run, as a declared shift | C | M2b |
| T-V12-14 | **The correlation rule is calibrated.** On fixture towns with the subject placed uniformly among its eligible sites, ≤ 1 % of 200 bars pass under the rank rule for a normal statistic and for each discrete fixture (members m ∈ {1, 2, 3, 10} × base share q ∈ {0.3, 0.5, 0.85}), and ≤ 1.5 % under the pooled exact test; with a planted pull of 1.0 standard deviation ≥ 95 % pass the rank rule; a pooled spec whose null share exceeds 0.85 is refused at registration (the headroom lint); a `servedShare` spec at district scope is refused; T71-3 written as a `NullModelSpec` (block scope, 20 permutations, the `margin` rule) gives the base's shuffled-placement result; the rules' code reproduces `critique_v12_nullrule_rank_power.out` and `critique_v12_pooled_exact.out` within two points | C | M2b |
| T-V12-15 | **The null never tests a hard need.** A spec whose statistic is fixed by a hard need (a watermill's distance to water) gives z = 0 on every town | C | M2b |
| T-V12-16 | **Seeds by formula.** V12 §2.4's check vectors reproduce; a planted collision is rehashed to `/r1`; the first 50 `bcity` seeds of a setting are B-CITY-lite's | C | PR from M1 |
| T-V12-17 | **Panels.** `plat d5 seeds` reproduces `seeds.json`; a key differing by one side fails its commitment; a missing answer leaves the panel *provisional — not rated*; verdicts on fixture answers equal the hand-computed §13.6 (6) results for MFCG (20 of 30), FTG (2 of 3 per rung), NG (14 of 20), Fantasy Manor, DW, AB (`reconcile`, `history`) and SOLO (⌈2n ÷ 3⌉ Yes), the M4-110 group included; a `none` panel records answers, no verdict and status `descriptive`; the widened `D5Record` holds a `reads` answer, a SOLO Yes / No, and verdicts grouped by template, frame and class; a milestone with two panels lists both in `MilestoneRecord.d5`; a sitting never holds more than one re-offered panel, and a re-offered panel carries a fresh commitment | C | M1 (MFCG, FTG), M4 (M4-110), M5, M6, V3-P6, V4-U5, M6-sky, V6-E7, M-CAL |
| T-V12-18 | **Blind renders.** Both sides of every pair have the same pixel size and metres per pixel, no PNG text chunk, and our side's label layer is empty | C | M1 |
| T-V12-19 | **The sitting page works for the owner.** A three-pair fixture completes keyboard-only; a reload resumes with the answers kept; with browser storage blocked the page says so on its first screen and offers the export after every screen; the first screen says where the export lands; the export matches `AnswersFile`; axe-core finds 0 serious or critical violations (research-side harness) | C | M1 |
| T-V12-20 | **No provisional number dangles.** `plat calibrate register --check` is green: every calibratable cell is covered by an admissible source, an entry or a `fixed:` note; an `own` calibrate-later fixture cell without an entry fails; two entries or two columns for one knob fail; a cell of an owner-rule hard clause without its `ownerRule` stamp fails; every §13.7 letter has an entry; statuses move legally; a fixture milestone with an overdue provisional entry fails its exit, and one with an unrated `panel` entry reads *provisional — not rated*; an entry naming `bar.<barId>` with no registered bar, or `frame.<table>.<column>` of a non-calibratable column, fails, and one naming `bar.T-V6-8` with its `BenchBarDef` registered passes (reconciliation round 3, SCC-56); an entry for a base cell whose base change request has not landed fails ("cell exists"; SCC-54); a fixture `siting.web` cell named by no line passes through the items 103–107 line's catch-all, and a fixture column two lines bind fails (reconciliation round 4, SCC-76); an entry naming `frame.*` beside a passing M2b metric is confirmed at M2b with no `frame.*` history row until M-CAL, and an entry of `frame.*` metrics alone with a due before M-CAL fails (SCC-83); a fixture column whose first compiled cell lands after a committed fixture M-CAL record takes, from `--defaults --milestone M6-U`, due `M-CAL/under` and a first history row naming M6-U, and its landing exit passes, while the same entry due `M-CAL` fails, a default entry due `M-CAL/under` while no M-CAL record is committed fails, and a `frame.*`-only named entry due `M-CAL/under` for such a column passes (reconciliation round 4's continuation, SCC-R3C-1); a fixture registry column no named line binds fails without an entry, the failure naming `plat calibrate register --defaults`, and passes once that command has written its default entry (`cal.<table>.*.<column>`, `corpus`, due M-CAL, [`frame.<table>.<column>`], `line: 'default'`), a second run of the command writing nothing; a column of an empty table takes no default entry until the change that ships its first row, and the entry then written names as `owner` the volume of that source file's author seat, which a second document's later cells do not move (reconciliation round 3's continuation, SCC-R2C-5); a named line's entry restating a default entry in place passes, a named entry beside a default entry for one column fails, and a `line: 'default'` entry with another method, due, metric or fallback fails (reconciliation round 2's continuation, SCC-R1C-2); a fixture default entry written at M1 whose column's compiled cells a fixture M5 change moves with no history row fails `--check`, the failure naming `plat calibrate register --defaults --milestone <id>`, and after `--defaults --milestone M5` carries a second row `{ date, value: the moved cells by row key, milestone: 'M5', cells: true }` with its `status`, `due`, first row and other fields unchanged and passes, a second run appending nothing; the command appends nothing to a fixture default entry that is `confirmed`, or whose due's fixture record is committed, and lists it as owed to a run, and `--check` then fails that entry naming `plat calibrate run` as well; a closed fixture default entry whose later rows are metrics rows and whose column's cells equal its last cells row passes (reconciliation round 5, SCC-90); `--defaults` without `--milestone` refuses, writing nothing and naming the flag, and `--milestone P1` refuses naming V12 §2.8's form, while a fixture column first landed after a committed fixture M-CAL record takes due `M-CAL/M6-P` from `--milestone V3-P1`, `M-CAL/sky` from `--milestone V5-P1` and `M-CAL/under` from `--milestone V4-U3b` (reconciliation round 5, SCC-93); a fixture staged entry — `measure` at M2b, then `panel` at M4, then `corpus` at M-CAL — is `provisional` with `method` `panel` and due M4 after M2b's passing row (`stage: { index: 0, outcome: 'pass' }`), `confirmed` at M4's rated pass, and takes a `frame.*` metrics row at M-CAL with its status kept; the same entry with a panel No after the passing measure (no second value stated) closes `not-achieved`, its M-CAL row a metrics row; with the M4 panel unrated it reads *provisional — not rated* and passes M4's exit; stages written against the order (a `V4-U3` stage before an `M4` stage, a `corpus` stage first) are refused naming the pair; two stages at unordered rows (`V5-P1`, `V6-E7`) are each read at whichever exit comes first; an entry without `stages` reads as single-stage; a staged entry whose `due` is not its current stage's fails (reconciliation round 6, SCC-105); an entry with `due: 'E2'`, or a stage due `U5`, fails naming V12 §2.8's form, the same entry due `V6-E2` passes, and a V11 C8 column landing after a committed fixture M-CAL record takes `M-CAL/under` from `--milestone M6-U` (reconciliation round 6, SCC-99); a fixture named `measure` entry whose one metric is `bar.<id>` of a `BenchBarDef` with `stages` `[]`, its cells tuned before its exit, fails `--check` naming `plat calibrate register --defaults --milestone <id>` until `--defaults --milestone V3-P6` appends the cells row, then passes; its line's hand fallback applied in a fixture exit's change appends a cells row and closes the entry `fallback-applied`; the same move on a named entry whose bar has stages fails as owed to a run, naming `plat calibrate run`, and the command appends nothing to it (reconciliation round 6, SCC-98); a fixture default-line column whose M2b rows' entry is closed at a committed fixture M-CAL record, with rows added at `V3-P1` by a seat other than its owner, fails `--check` naming the command until `--defaults --milestone V3-P1` appends the cells row, then passes, the register report listing the rows as added after close, while a changed M2b cell of the same column still fails as owed to a run (reconciliation round 6, SCC-103); `--hold` on a fixture `provisional` default entry appends one held row and changes nothing else, the register report lists the entry "held: a committed golden reads it", and `--check` passes it with its cells unchanged (reconciliation round 6, SCC-102); a fixture application constant whose provenance note names its test (V09's `raised.previewOnReleaseKm`, T-V9-3) takes no entry and passes (reconciliation round 6, SCC-107); a fixture named entry confirmed at M4 whose strip pick is released moving one cell passes `--check` once `plat calibrate register` has appended the pick's cells row, and fails before it (finalization, SCC-112) | C | PR from M1 |
| T-V12-21 | **Evidence resolves.** Every compiled cell's `evidence` ids resolve to a baseline row, a run or a panel; `dist/evidence.json` has a status and a line for each cell and stays ≤ 200 kB; rewording an evidence line leaves every table content hash and output version unchanged; the cell inspector (V09) and the clerk's "why" (V10) show the plain line and the status on a fixture | C | M2b |
| T-V12-22 | **Drift is declared.** A fixture new build's rows are reported beside the pinned ones and gate nothing; a pin change without a `baselineShift` record fails CI; the record lists every flipped verdict | C | M1 |
| T-V12-23 | **Corpus intake.** On a synthetic corpus we author (60 maps, 5 flagged holdout, 2 flagged map-design, 3 frames): 0 holdout or map-design maps measured, their counts recorded; every id salted; no corpus string but preset keys crosses; `frames.json` crosses before any row of its frames, and a frame whose declaration postdates its rows is refused by C8 | C | M-CAL (the synthetic corpus from M4) |
| T-V12-24 | **The base stays the base.** Every corpus run's cells target `historical:<frame>`; the shipped default tables and the `MFCG`, `FTG`, `NG`, `FM` and `VG` presets' goldens are byte-identical before and after M-CAL and each later corpus run `M-CAL/<layer>` (SCC-R3C-6, SCC-R3C-1; a `presets.FM`, `presets.VG` or `presets.NG` entry moves only by its own reference run or its entry's own fallback run, V12 §3.7.2 (3), never by a corpus run); proposals aimed at a naming table, a dossier row set, a `presets` entry, an `owner` cell or an `ownerRule`-stamped cell are refused with their rule | C | M-CAL; each `M-CAL/<layer>` |
| T-V12-25 | **Evidence gates.** On the synthetic corpus, a possibility-only row proposing a weight is refused E1; a 12-map frame setting a share is refused E2; a drawn plate aimed at a structural metric is refused E3; the possibility floor only lifts 0 to 0.02 or lowers 1 to 0.98, and only in a cell a register entry maps to the metric; the reachability search (V12 §3.10.4) records a planted unreachable value; a planted record of a catacomb under a cathedral yields one `ownerExcluded` row, no layer cell and no known defect (109 (k) (2)), and a planted village catacomb the same (109 (k) (1)); a frame with zero raised ways yields the CITY raised-way chance at 0.02 in the layer, a `floorsHeld` row and the report line; a witnessed TOWN aqueduct is recorded reachable by declaration and yields no layer cell | C | M-CAL |
| T-V12-26 | **Acceptance.** A1–A5 evaluated on the synthetic corpus; the M-CAL panel's decision computed per frame by V12 §3.10.6's rule; an adopted pack applies to a new document of its era and region and never to another; a fixture frame row failing under the default passes the parity exit as `reported`; a document pinning a retired pack version replays it | C | M-CAL |
| T-V12-27 | **Palette re-check.** A synthetic plate set within 3 units of the released corpus-sourced ends changes nothing; one outside requires the owner's pick; a one-ended fixture (darkest ink) is compared on our p90 only; ink warmth and `ink`'s chroma (our own tolerances) are never re-signed; a re-sign without the pick is refused | C | M-CAL |
| T-V12-28 | **Clean room.** `baselines.json`, `metrics.json`, the register, run and panel records, `answers.json`, `key.json`, the capture-id files and `frames.json` pass the scanner with 0 hits; no `MeasureInput` of a reference or the corpus exists under `plat/`, and no `plat/` test reads `captures/` (a path and header scan; T-V12-3 and T-V12-6 live research-side) | C | PR from M-1 |
| T-V12-29 | **Budgets.** V12 §6's rows, measured at their milestones (timings in the timing phase; CPU budgets by accounting) | C | as V12 §6 |
| T-V12-30 | **No silent gaps.** A row with a failed plan index listed in `sample.failed` passes C7; an unlisted gap is refused; an FTG capture without residents takes the nominal population, marked | C | PR fixtures from M-1 |
| T-V12-31 | **The tendency rules are calibrated.** `plat statbar --calibrate` re-runs V12 §3.6b's simulations with the product's rule code and matches `v12_sweeprule.out`, `v12_rev_clustered.out` and `v12_rev_confirm.out` within two points on every rate; on fixtures a planted 0.55 share fails `most` and 0.80 passes, and with a town effect of ρ = 0.3 a planted 0.55 passes ≤ 2 % of the time on effective instances; a flat rate fails `trend`, a planted reversal fails the no-reversal clause, a rate off by half fails `rate` at 200 units; **family-wise:** 40 fixture bars all at a planted 0.8-standard-deviation effect fire ≤ 0.1 fallbacks per table version with the confirmation stage; a suspect bar that passes its confirmation reads "pass on confirmation" | C | M2b |
| T-V12-32 | **Enclosures and way classes are measured by one rule.** On a cliff-closed fixture town (item 106) `walled.share` counts the buildings inside the enclosure, no tower spacing spans the closure, `gate.count` excludes a water gate and the harbour-mouth chain, `wall.barrierShare` equals the fixture's closure length share; the way mapping sends `through` and `primary` to `arterial`, `secondary` to `street`, `cul_de_sac` to `lane`, `path` to `track`, a bridge to its carried class and no `quay` or `pier` into the way graph; the five MFCG exports measured through the shore split keep T-V12-6's values, and the coastal city gives the 24 shore vertices and the 20 towers of its README's derivation | C | M1 (MFCG); M2b (ours, with item 106) |
| T-V12-33 | **The underground profile measures plans.** `undergroundInputOf` on a fixture ruin returns every gallery and chamber in every state; `plan.rightAngle` is 1.0 on a drawn rectangular grid and 0 on a drawn circle; `grid.r4` is 1.0 on an orthogonal grid and below 0.05 on 360 rays at 1° steps; `ruin.blockArea` on a 30 m centreline grid is 900 m²; `plan.*` and `ruin.blockArea` on a ruin with its stepped monument equal the same ruin's values without it | C | U3 (V04) |
| T-V12-34 | **Distinctness and structure rules bite.** A ruin laid from the town's own culture row fails `paired`; a ruin flagged `sharedAxis` is judged on its two other measures; ruins drawn with the cavern's outline fail `twoSample`; a dispersed class whose share drops by 0.10 with the web on fails `noRegression` | C | U3 (V04); M2b (the web) |
| T-V12-35 | **The bar map is wired.** Every row of V12 §3.6b's bar map has a registered spec whose owner, owner's bar, rule, parameters and levels match; `plat statbar all` runs each on its tier; a registered spec absent from the map fails; a g tendency bar in §13.2 without a spec fails, except a clause on the registry's `conformance` list (the coherence pass's §13.2 clause ids of items 105 – 110's conformance bars, V12 §1); item 102 (g) has no spec | C | M2b (web, siting, chains); U3 (underground); M3a (item 110's raised ways) |
| T-V12-36 | **Both known-city fixtures pass (item 110 (e), (f)).** For K1 and K2: the skeleton file and V09's canvas script give one model digest under `known/<id>`; the structure list of V12 §3.14 holds on all three paths and its emulation subset on V09's L2 variant; a failing check names its id and `what`; `namesClean` finds 0 scanner hits on the fixtures' files; the exit carries `T-V12-36:<id>` and the research-side "no outline traced" verdict at M3a | C | milestone tier from M3a; PR: K2's skeleton path |
| T-V12-37 | **The no-op pins and the switch-on bumps.** Before a family's bump, a commit landing its code produces zero ShiftRecords on the pin's suites; after it, the suites under the overlay are byte-identical to the off-state set; a planted item-110 draw on a shared stream fails the pin, a planted empty array fails it, and an unrelated planted table shift re-records both sets with matching stage lists; the four bumps produce records with exactly their own `feature` cause; the raised bump moves no THORP – TOWN S4 or S5 isolated digest; across the four bumps the `MFCG`, `FTG` and `FM` presets' goldens stay byte-identical and no P row's input holds a `retaining` or `raisedSupport` feature or a way with `part` ≠ 0 | C | PR (the landing gate, two golden seeds); nightly from M3a; at each bump |
| T-V12-38 | **Item 110 measured without disturbing the old metrics.** On a fixture CITY with a viaduct over two streets, an arched aqueduct over two other streets, a terrace crossed by a stair, a mole with deck buildings and a stepped temple: the viaduct adds no node of degree ≥ 3 away from its ramp feet (`raised.junctions` 0); the aqueduct adds no node, edge or length to any way graph (`junction.*`, `street.*`, `sgd.*`, `street.detour` and `street.cyclesPerKm2` equal those of the same town with the aqueduct's way deleted); `wall.*`, `gate.count` and `wall.ungated` equal those of the same town with its retaining walls deleted; `bldg.*` and the cluster blocks equal those with the supports and spans deleted; T-V12-4's equality holds with every kind and property file f item 447 exports (the undeclared ones dropped on read, V12 §2.2) | C | M3a |
| T-V12-39 | **The raised-way bars.** The four `T110b.*` specs are registered as mapped; on planted fixtures a viaduct chance of 0.02 at CITY passes `presence` with N = min(500, ⌈5 ÷ 0.02⌉) = 250 towns on the ravine site, an elevated-road chance flat across `wealthLevel` fails the trend, and a landmark factor of 1 fails `higherWith`; a spec whose ravine site lets a cheap detour win is refused at registration | C | M3a (raised-way generation, file f items 244, 290) |
| T-V12-40 | **A removed raised way stays removed.** On a CITY fixture document with one generated viaduct removed: an upgrade across a release that lowers `viaduct.minDropM` leaves no raised way at that reason; applying a historical pack that doubles the viaduct chance leaves none either; in both the fates list names the held suppression; undoing the apply restores the prior document byte for byte | C | M3a (raised-way generation, file f items 244, 290) |
| T-V12-41 | **The monotone engine.** On the catacomb fixtures the step runner performs Regenerate, a Re-derive from S1 and from the underground stage, New random on the system, an upgrade replay, a dossier burial event and extend-growth through the base's own events; a planted shrink at any step, a complex vanishing between steps, or a growth above its cap fails with the record, the step and both values; a stagnant fixture's fill rising while its extent holds passes and a planted fill drop fails; the author-delete probe lowers the extent by exactly the deleted area and no later step re-digs a tombstone; an author edit in a script is refused | C | U3 (V04); E-milestones (V06) |

### 7.2 Parity metrics for this volume's own subject

The subject here is measurement itself, and the reference that owns it is our own recorded measurement of the
references: T-V12-6 holds the one implementation to the red-team's and the sweep's executed numbers on the same files,
and T-V12-3 holds it to every M-1 row. The generator's parity against MFCG, FTG, NG, VG and Fantasy Manor is §13.5's
rows and the volumes' rows, which this harness runs (V12 §3.4.4). Item 110's subjects have no reference at all (V12
§3.4.4): their bars are ours only — the conformance clauses, the four raised-way tendency bars, the known-city fixtures and
the M4-110 group — and the parity presets never show them (T-V12-37).

## 8 Build plan

### 8.1 Where it slots into §16

Most of this volume is the base's own verification rig made exact, so it is built inside the base's milestones, from
M-1 to M4, and priced as an itemised widening of §16's rig line (BCR-V12-9, stated as deltas). The known-city fixture
engine, K2, the no-op pin engine and item 110's measurement profile land at **M3a** with item 110 (a) – (d)'s base parts;
the four raised-way bars and the TOWN guard inside M3a too, where raised-way generation lands (file f items 244 and 290;
X-V12-12, met; reconciliation round 6, SCC-99); the M4-110 group at M4. The panels of M5, M6 and V-M4 register on the engine M1 builds; their content is their
volumes'. The corpus reconciliation is its own staged milestone,
**M-CAL**, after the standalone generators (M4, M5, M6, V-M4) and before the SettlementForge stage M-SF, which V08 already
places after "the corpus calibration of §13.9" (J-V8.39; BCR-V8-18); its later runs `M-CAL/<layer>` follow the layers that land after it (V12 §3.10.1; SCC-R3C-1). The owner's roadmap stages it, so its price sits
outside the base's total, as V08's M-SF does.

### 8.2 Steps, estimates and exits (person-weeks, expert; PLAUSIBLE)

| step | milestone | content | exit (executed) | pw |
|---|---|---|---|---|
| W1 — the capture plan and the crossing | M-1 | the seed families' research-side twin (`docs/validation/bench/v12_h32_vectors.py` is its check); the capture plan; MFCG at ten seeds per matched size plus five stress seeds; the adapters to `MeasureInput`; the M-1 metric scripts for every ⟨M-1⟩ and baseline row of the catalogue; `cross_check.py`; the pins and the first `CrossingRecord`; spikes S-V12-1 and S-V12-2 | every §13.5 baseline row present by the ⟨M-1⟩ rule (§16 M-1); T-V12-1's fixtures on the twin; T-V12-6 (twin); T-V12-28; T-V12-30 | 0.5–1 |
| W2 — measure, parity, panels | M1 | `@plat/testkit/metrics` with `METRICS`, `measureInputOf` with the enclosure profile, the MFCG shore split, the derived features, `plat measure`, `plat baselines check / aggregate`, `plat parity` to V12 §3.5 with the dashboard and CSV; `@plat/testkit/seeds` with B-CITY's and the goldens' formulas (BCR-V12-7); the panel engine (`PanelSpec`, `plat d5 verdict` reading only crossed files, the variants' types, the widened `D5Record` and the milestone's panel list) and `build_sitting.py` with its storage fallback; the research-side checks `check_t3.py` and `check_t6.py`; `history.jsonl`; the M-1 metric rows' product side (`street.detour` … `draw.hairline`); the register with §13.7's letters and the M1–M2b constants, and `plat calibrate register --defaults --milestone <id>` (V12 §3.11's default line with *The due's corpus run*'s table, the flag required and its ids volume-qualified, V12 §2.8, and the moved-value row of *A value moved by its owning seat before its due*; reconciliation round 5, SCC-90, SCC-93; the staged entries, the rows-added and held rows with `--hold`, and the due test, reconciliation round 6, SCC-105, SCC-103, SCC-102, SCC-99) | T-V12-1 – T-V12-7, T-V12-16 – T-V12-20, T-V12-22, T-V12-32's MFCG clauses; the M1 panel sat or *provisional — not rated* | 1.75–2.25 |
| W3 — tuning and correlations | M2b | `plat calibrate run` (the search, guards with the fixture suites, holdout, the stage-isolated shortcut, emission and revert, the owner-stamp and range-minimum refusals); `plat nullmodel` with the rank rule, the pooled exact route, the headroom lint, the confirmation stage and B-CITY's towns; `plat statbar` with its rules (effective instances, the town clause, derived values, `stopAfter`), `--calibrate` and the bar map's siting, web, comfort and chain specs; the `evidence` ids with V11's compiler, `dist/evidence.json` with statuses, the `ownerRule` stamps; the register's lint over every calibratable cell; the first runs (`headingSigma`, the rung modifiers, O18 (j), items 24, 30 and 71's weights as they fall due); spikes S-V12-3 and S-V12-4 | T-V12-8 – T-V12-15, T-V12-20, T-V12-21, T-V12-31, T-V12-34's web clause, T-V12-35; every entry due at M2b confirmed, fallen back or not achieved | 2–2.75 |
| W5 — item 110's harness | M3a; M4 | the known-city fixture engine (`KnownCityFixture`, `StructureCheck`, the three paths' runner, the emulation subset), K2's structure list and golden, K1 on the engine; the no-op pin engine and the landing gate; the profile's item-110 kinds with BCR-V12-17; then the four raised-way bars and the TOWN guard; then the M4-110 group and the item-110 register lines (3.11) | T-V12-36 – T-V12-38 at M3a; T-V12-39, T-V12-40 and T-V12-11's TOWN clause at M3a once raised-way generation lands inside it (file f items 244, 290; reconciliation round 6, SCC-99); T-V12-17's M4-110 clause at M4 | 1.25–2 (M3a 1–1.75: the fixtures, pins and profile 0.75–1.25, then the raised-way bars and the TOWN guard 0.25–0.5; M4 0.25) |
| W4 — notes, audit, drift | M3b–M4 | the release notes' calibration section and new-behaviour lines; the register report; M4's provenance audit reading `evidence`; a rehearsed pin change | the M4 audit green; T-V12-22 on a rehearsal | 0.25–0.5 |
| W6 — the underground's harness | U3 – U5 | `undergroundInputOf` with the monument rule; the crypt and catacomb metrics; the step-script runner for `exactMonotone` with record identity, `exactBound` and the author-delete probe | T-V12-33, T-V12-41 | 0.25–0.5 |
| — panels and bars of later stages | M5, M6, V-M4, V3-P6, U3–U5, M6-sky, E7 | the NG, Fantasy Manor, VG, Dwellings, SOLO, island and history panel specs on the engine; item 109's bar specs | T-V12-17's clauses for each; T-V12-34, T-V12-35's underground clause | within V01, V02, V07, V03, V04, V05, V06 |
| **base-side total** | | | | **6–9** |
| M-CAL — the corpus reconciliation (staged) | after M4, M5, M6, V-M4 | the owner opens it; the adapter, its frames and `frames.json` (research side, 1.5–2.5); measurement and crossing (0.5–1); the corpus runs per frame, upstream first, with the defined reachability search, R6 and the owner-excluded report (2–3.25); the historical pack in §7.6's packs slot with per-frame adoption (0.25); the before-and-after sitting, the palette re-check, the report and the release (0.5–1); the synthetic corpus for T-V12-23 – T-V12-27 is authored at M4 | T-V12-23 – T-V12-27; the M-CAL panel rated or *provisional*; the `ReconciliationRecord` committed | 4.75–8 |
| M-CAL/<layer> — the later corpus runs (staged; V12 §3.10.1; reconciliation round 4's continuation, SCC-R3C-1) | after M-CAL and the layer's last milestone (M6-U, M6-sky, M6-E, M6-P), each on the owner's word | one run over the entries due there on M-CAL's frames — the underground's E1 and E4 only, the sky's and the evolution engine's as their frames admit; the pack versions, the sitting only when a cell moved, the report and the release | the run's entries closed; its `ReconciliationRecord` committed; its sitting rated or *provisional* when held | 0.25–0.75 each |

### 8.3 Risks, spikes and their pre-decided outcomes

1. **Small reference samples make noisy bands** (FTG has three captures per size). *Spike S-V12-1 (M-1, 1–2 days):*
   bootstrap the ten MFCG seeds per size — draw ten with replacement 1 000 times, recompute each target band, and count how
   often a fixed candidate value's verdict flips. *Pre-decided:* above 10 % of target rows flipping in over 5 % of draws,
   MFCG goes to 20 seeds per size (minutes of exports); FTG's rows stay as §13.5 classes them (weakness and descriptive,
   the one declared target exception).
2. **The derived street graph may be unstable** (skeleton spurs on lot outlines). *Spike S-V12-2 (M-1, 1 day):* its
   metrics on the ten seeds per size; *pre-decided:* a metric whose seed-to-seed CV exceeds 0.3 becomes descriptive by
   the ⟨M-1⟩ rule and enters `known-defects.json`.
3. **Targets fight each other** (a gain on one row costs another). The guards stop a trade; a run that cannot satisfy
   both is rejected and the register's fallback decides.
4. **Tuning over-fits the train seeds.** The per-run holdout and the gate seeds after release (V12 §3.7.5–§3.7.6).
   *Spike S-V12-3 (M2b week 1, 2 days):* `headingSigma` end to end — spec, search, holdout, emission, revert — before any
   other run.
5. **The correlation rule mis-calibrated on real placements** (effects smaller than the planted ones). *Spike S-V12-4
   (M2b, 1 day):* T71-3 and three g bars on B-CITY-lite; *pre-decided:* a bar that fails takes its spec's fallback (V12
   §3.6), never a lower threshold.
6. **The owner's time** — seven sittings of up to 45 minutes. §13.6 (7)'s rule answers it: an unrated panel never stops
   the build and never lets a gate be claimed.
7. **The corpus may hold few surveyed frames.** Then reconciliation is mostly possibility (reachability) and drawing
   (look targets); the process runs unchanged and says so in the owner's report — no prevalence is invented.
8. **A reference build disappears** from its host. The captures on disk remain the evidence; the pin freezes on the
   last captured build, recorded in `drift.md`.
9. **Real tendencies may be weaker than the simulated ones** (instances of one town correlate; the design's rows may
   produce smaller shifts). The bars carry their owners' fallbacks (V12 §3.6b); a bar that fails twice is *not
   produced*, never relaxed, and T-V12-31 keeps the rules' own calibration honest.
10. **A fixture level may be unreachable by a frozen S1 output** (a source a later stage decides). The spec is refused at
   registration (V12 §3.12) and its owner states the level through a dossier fixture or a declaration instead.
11. **An item-110 capability may be missing at M3a.** K2's StructureCheck then fails M3a's exit (no deferral); the
   pre-decided outcome is that the capability's base part lands before M3a closes, or K2's golden is recorded without it
   only if the owner moves that capability's milestone in writing — an owner decision on product order, never a seat's.
12. **Small pulls may escape the rank rule** (its power at a 0.3 pull on single members is 0.30 – 0.54). *Pre-decided:* a
   member-on-plot statistic always takes the pooled route (power 0.38 – 1.00 on the same fixtures); a bar still failing
   takes its fallback — never a looser rule.
13. **The pins double the golden job's time.** *Pre-decided:* V12 §6's rotation by family; the landing gate never rotates.

## 9 Decisions (each vetoable)

| id | decision |
|---|---|
| J-V12.1 | chose one implementation of every metric — the product's `plat measure`, run research-side on reference and corpus inputs from M1, the M-1 scripts kept only as cross-checked twins — over separate research-side and product-side implementations, because a definition that drifts between the two sides is the silent way a parity number lies |
| J-V12.2 | chose a `MeasureInput` of numbers, geometry and closed vocabularies only — no names, label text, colours or styles — over carrying names for traceability, because names are creative content the firewall and the corpus's "drawing, never naming" rule both keep out, and the salted ids trace a row well enough |
| J-V12.3 | chose ten reference seeds per matched MFCG size with the min–max estimator below ten seeds and type-7 quantiles from ten, over §13.5's five seeds, because [min, max] of ten draws covers 0.82 of the spread on average — the intent of [p10, p90] — while five cover only 0.67, and the extra exports cost minutes |
| J-V12.4 | chose seed families derived by `H32` from structured labels, with a priority-ordered rehash on collision and B-CITY and the goldens formula-derived too, over stored seed lists, because a formula is a pre-registration anyone can recompute from text, and disjoint families keep tuning off the test seeds |
| J-V12.5 | chose to derive cluster blocks and a street graph from footprints alone, identically on ours, for rows whose reference lacks blocks or lanes, over comparing our true blocks with MFCG's reconstructions, because only the same derivation on both sides compares like with like |
| J-V12.6 | chose the scalar band as the union of §13.5's multiplicative band and the ± 15 % single-value band, additive for sign-indefinite metrics and floored by `absFloor`, over the multiplicative band alone, because a narrow reference spread would otherwise give a band narrower than a single value's, and a zero-centred metric has no multiplicative band |
| J-V12.7 | chose the KS rule as the median of single-seed-against-single-seed distances compared with the reference's pairwise p90, over pooled-against-pooled distances, because the reference's spread is measured seed against seed, and pooling shrinks a distance and flatters ours |
| J-V12.8 | chose the MFCG settings' population as the one whose expected non-hinterland building count equals the reference's median building count — 3.4 persons per building ÷ (1 − the hinterland share measured on B-CITY-lite), solved per rung at each milestone — over the rungs' target populations or 3.4 × the whole count, because §13.6 (3) matches building counts, MFCG exports no farmsteads, and a population off by a third, or by the hinterland's share, would compare towns of different sizes |
| J-V12.9 | chose a canonical `ParityReport` — sorted rows, six significant digits by our own formatter, `dmath` in the metrics — over host float printing, because a report is then a fact with a hash, identical on every host, and a changed report always means a changed measurement |
| J-V12.10 | chose calibration runs whose spec is committed before the first evaluation, with common random numbers, per-run train and holdout families, at most four cells and no gradient method, over hand tuning, because a pre-registered objective cannot be chosen after seeing results, and the holdout catches a value fitted to its seeds. *Note at reconciliation round 5 (SCC-90; J-V12.77):* "over hand tuning" binds a value a stage already reads in a committed golden; a value set before any reader's golden holds it — volume 1's M5 tunings inside the work items that land their readers — is authoring, not a run, recorded by the moved-value row of V12 §3.11's *A value moved by its owning seat before its due* |
| J-V12.11 | chose that no run may move an `owner`, `owner-eye`, palette-target, `host` or `MFCG` or `FTG` preset value, that a `presets.FM` or `presets.VG` value moves only by a `reference` run against that preset's own reference or by a `fallback` run applying its register entry's own pre-decided fallback, touching no default, and only where a register entry names it (V02 §3.10.8 at M6c; V07's one measured-rate entry, `rules.race.densityPower@VG`, at V-M4, every other `VG` entry code-read or `fixed:`; amended by reconciliation rounds 1, 3 and 4, SCC-26, SCC-60, SCC-80), and that every owner-rule bar is a guard, over letting parity numbers win or freezing every preset, because the owner's rules outrank parity, and the FM and VG presets' measured-rate cells exist to be set against their own references while no default moves with them |
| J-V12.12 | chose, for every random-baseline bar, the randomised-tie rank u per town and the rank rule (u > 0.5 in at least 70 % of the towns and median u at least 0.60), over the first rule's z-sign clause, because u is exactly uniform under no pull however discrete the statistic — the base's own faithfulness-campaign tie-break — so the rule passes chance at most 0.5 % on normal and on few-member discrete statistics (executed), where the z-sign rule passed 58 – 98 % on skewed shares, while keeping the z rule's power on smooth statistics (0.927 at a 0.8-standard-deviation shift) — the owner's "correlating general rule" made honest |
| J-V12.13 | chose to move each reference's pin to its newest build at the next milestone boundary, as a declared baseline shift, over freezing the M-1 build, because parity is judged against the product the owner can open today, while the old rows stay as history |
| J-V12.14 | chose to seal each panel with an operating-system random salt and commit only the key's hash, over a formula-seeded coin, because a public formula would let anyone predict which side is ours |
| J-V12.15 | chose that every corpus change lands in a reconciled preset `historical:<frame>`, never overwriting a shipped default, over re-signing cells in place, because the owner's "what you have built is always the BASE" and item 23's emulation-first default both hold only if the built values survive intact, and adopting the layer is the owner's decision (Q-V12-3) |
| J-V12.16 | chose that a drawn plate stays `drawn` even with a scale bar unless the corpus's own metadata calls it a survey, over classing by the scale bar, because a painted plate's geometry is an artist's, whatever its scale bar says |
| J-V12.17 | chose that possibility evidence creates reachability requirements and at most lifts a chance from 0 to 0.02 (or lowers 1 to 0.98), over letting witnessed examples set weights, because a record proves possibility, not prevalence |
| J-V12.18 | chose to re-measure the palette axes by our own definitions at M-CAL and to ask the owner only when a band end moves by more than 3 units (3 C* for chroma), over silently re-signing, because the bands are the owner's numbers and our instrument differs from the corpus's |
| J-V12.19 | chose a sample frame of at least 20 surveyed maps, declared before measurement by a rule naming no measured feature, as the only prevalence evidence, over any large set of maps, because a set chosen by what it shows measures the chooser, and below 20 maps a p10 – p90 band, though computable, is too variable to set a band centre |
| J-V12.20 | chose a local sitting page, never published, over a hosted page, because the reference images are other creators' work |
| J-V12.21 | chose to open M-CAL after M4, M5, M6 and V-M4, with the layers and evolution joining by later runs of the same process, over one reconciliation after everything, because the owner's order is "built standalone first, then calibrated", and the staged layers may land much later. *Amended at reconciliation round 4's continuation (SCC-R3C-1; J-V12.75):* each later run is a milestone of its own, `M-CAL/<layer>`, and the corpus due of every column first landed after M-CAL's record |
| J-V12.22 | chose to run calibration and corpus jobs on the runner outside the three CI tiers and never during a timing phase, over fitting them into a tier, because a two-hour search would break a tier's budget and disturb gating timings |
| J-V12.23 | chose one panel engine keyed by milestone id, with `D5Pair` variants for Fantasy Manor, VG and the before-and-after pairs, over a protocol per stage, because §13.6's blind rules, sealing and pass rule are the same whatever is compared |
| J-V12.24 | chose to write research-side paths in committed files as opaque `research:` labels, over plain relative paths, because §17.1 (3)'s path rule must never meet a research path inside `plat/` |
| J-V12.25 | chose FTG's pin as a capture-date range, moved when two of a size's three new captures fall outside the pinned spread on one metric, over a pin per capture, because FTG's server cannot be seeded or versioned from outside |
| J-V12.26 | chose a failing correlation bar's default fallback as "after a confirmed failure, double the pulling weight once, clamped to its column's range and never across an owner-stamped cell or minimum, then report not produced", over lowering the bar, because §13.7 forbids a fallback that passes by construction, and a doubled value outside its range or across the owner's floor would break the compiler or the owner's rule |
| J-V12.27 | chose that a rated verdict needs every answer, an incomplete sitting staying *provisional — not rated* with its answers kept, over rating a partial sitting, because a partial panel could be steered by which pairs were skipped |
| J-V12.28 | chose "most" as a pooled share of at least 2/3 over at least 100 effective instances from at least 20 towns, with a town clause, over a raw instance count, a per-town majority alone or a test against one half, because a clear leaning (0.75) then passes 97 % of the time and a coin flip (0.55) at most 1 % even when a town's instances share a town effect (executed, ρ = 0.3), and two thirds is the owner's own bar at the sittings |
| J-V12.29 | chose exact binomial tests at 0.01 for a floor (one-sided) and a rate (two-sided, 200 units), over comparing a point estimate with the value, because a random mechanism set exactly to its promise would fail a point comparison half the time |
| J-V12.30 | chose one Cochran–Armitage trend test at one-sided 0.01 with a two-standard-error no-reversal clause, and a stratified Cochran–Mantel–Haenszel test for "higher with than without", over pairwise tests between levels, because one test over all levels holds chance near 1 % (executed) and the clause keeps "rises monotonically" honest without demanding strict steps that noise would break |
| J-V12.31 | chose the enclosure — built stretches plus natural closure edges — as what every wall metric reads, with MFCG's ring split at the shore, over measuring curtains alone, because item 106 makes barriers part of the circuit and MFCG's exported ring already follows the shore where its wall is open, so one rule measures both and T-V12-6's recorded values stand |
| J-V12.32 | chose ruin distinctness as a per-seed paired rule on block size (ratio 1.5), grid order (0.15) and axis (10°), each in 70 % of seeds and every seed on two, over comparing the culture rows' parameters, because the owner's refinement is about what a reader sees under the town, and skipping the axis for a shared-axis ruin honours item 109 (c)'s surviving old axis |
| J-V12.33 | chose the structure test as a separation — the ruins' median above the caverns' 90th percentile — over a significance test, because the difference is large by construction and a test small effects pass would not catch a ruin drawn as a cave |
| J-V12.34 | chose SOLO and AB groups on the one panel engine for sittings without a reference, over separate protocols in V04 and V06, because sealing, the resumable page and the two-thirds rule are the same, and SOLO's Yes / No fits two modes of ours that have no better side |
| J-V12.35 | chose to apply a bar level's site as a frozen S1 output through the golden tooling's stage isolation, over a test-only branch in the generator, because a bar must test the shipped code path |
| J-V12.36 | chose that the ladder rows (provenance source `sf:`, V11 §2.2, BCR-V11-21; reconciliation round 1, SCC-05) and the port's unnumbered ranges are never calibration targets, over tuning them, because the first are the owner's program's facts pinned to the port's baseline (item 108 (a)) and the second derivation rules of the port (item 20 (h)) |
| J-V12.37 | chose to confirm the underground's rows by the owner's V4-U5 panel and E1's reachability, never by prevalence, over leaving them provisional or inventing a source, because no town plan frames an underground |
| J-V12.38 | chose record-keyed monotone checks — each catacomb complex by its id, which keeps its source lineage — over step scripts of the base's own events (Regenerate, Re-derive, New random, upgrade replay, a dossier event, extend growth) that exclude author edits, with an `exactBound` for the growth cap and a stagnant-fill form, over the first volume's epoch-only levels, because the owner's ratchet binds every derivation ("they do grow and never shrink", item 109 (k) (4)), a cave-in or a second complex would otherwise read as a shrink or a jump, and J-V4.56 exempts the author |
| J-V12.39 | chose to route every witnessed contradiction of an owner rule to the owner (R6: an `ownerExcluded` row and an owner question with the recommendation "keep the rule"), with owner-rule cells stamped at compile time, over E1's possibility floor in the layer or a known-defect line, because the owner's rules outrank the corpus, and the layer may become the default by a sitting that judges looks, not rules |
| J-V12.40 | chose to read B-CITY's nightly towns for the pooled siting bars, paying only for permutations, with `null/…` families only for settings B-CITY lacks, over per-spec town families, because V11 already states its bars on "≥ 200 B-CITY seeds per rung", those towns are generated every night anyway, and dozens of per-spec families would cost thousands of generations |
| J-V12.41 | chose three authoring paths for the second known-city fixture (skeleton file, canvas script, transcript), over the two item 110 (e) names, because the item gives it "the same acceptance bars as the first fixture" and T101-6's bars are three paths; "both ways" names the two that share a digest |
| J-V12.42 | chose owner-stamped calibration minima for the CITY and METROPOLIS raised-way chances (0.02) and caps (1), binding every run, fallback and corpus pack, with V11's schema holding the rung gate (no `raisedWays` row below CITY) and a TOWN guard setting in every run that touches a raised-way row, over leaving the chances to tuning and the corpus, because the owner ruled that cities generate raised ways and towns only declare them, and a layer adopted as the default must never undo that; the minima bind calibration only, so the parity presets' extension zeros, a pin's overlay and a user's own edit stay free |
| J-V12.43 | chose V11 §3.24.0's switch table (one named, in-range off form per row set, which is also the parity-neutral default) as the no-op pins' overlay, and one off-state golden set per family recorded at switch-on and re-recorded only by other causes' declared shifts with matching stage lists, over digests of "the code before the fold" or a fresh boolean per family, because stored "before" digests go stale at the first unrelated shift and then fail forever or stop guarding, and V11 has landed one definition of "off" that every lane's pin can share |
| J-V12.44 | chose tendency bars only for the owner-rule text's two "likelier" clauses (prosperity, dossier landmarks) and presence bars on forcing sites for the viaduct and the aqueduct, over on / off rows for every kind, because without its reason no raised way may exist, so an "off" arm measures conformance, not a leaning, and a site where the detour always loses keeps the presence chance honest |
| J-V12.45 | chose a six-item SOLO group inside the M4 sitting (K2 and five forcing-site towns) to confirm item 110's rows, over the realism item of the ordinary D-5 pairs, because a random pair seldom shows a raised way, a terrace or a deck building and a confirmation must be attributable to the rows it confirms |
| J-V12.46 | chose a pooled exact hypergeometric test for statistics that count members on indicator plots, with a headroom lint refusing a nearly-always-true indicator, over the rank rule for those too, because the exact pooled count is more powerful on few members (0.705 against 0.302 at a 0.3 pull on single members, executed) and no rule can see a pull when the indicator is already true for 85 % of plots |
| J-V12.47 | chose a confirmation re-run on a fresh family at twice the towns before any fallback fires, over a stricter single-run rule, because with dozens of nightly bars at 93 % power a few would otherwise fail by bad luck and double real weights; with the re-run 40 bars at a real 0.8-standard-deviation effect fire 0.06 false fallbacks per table version (executed), and the null pass rate stays 0.25 % |
| J-V12.48 | chose that an owning volume's stated pass rule, seeds and tolerance win and V12's rules are defaults taken as parameters, while the unit a g item names binds everyone, over V12 overriding the volumes, because each volume keeps its rows' content (single source), and the g item is the owner's text |
| J-V12.49 | chose the historical layer as a setting pack in §7.6's packs slot bound to its frame's era and region, adopted per frame, over a preset in the one preset slot, because a document must be able to hold its D-2 era and region preset (or a parity preset) and the matching layer at once, and one frame's layer must never reach a town of another era or region |
| J-V12.50 | chose effective instances by the one-way analysis-of-variance design effect, deep voids as connected components counted at most three per town, and a town clause on towns of three or more instances, over raw instance counts, because one access opens a whole connected system and instances of one town share a town effect; the correction restores the independent rule's size (0.9 % at a 0.55 share, ρ = 0.3, executed) |
| J-V12.51 | chose to compare a corpus siting row with our statistic in the same corpus variant (buildings with a use, Euclidean distances, any building eligible), computed as a `geo` metric on our measurement profile, over comparing it with the model statistic, because the model statistic uses way distances among hard-need-eligible plots — a different quantity — and like must be compared with like where the corpus sets weights |
| J-V12.52 | chose E1's reachability search as the grid of the controls the metric's stages read, at their range ends and middle, capped at 64 settings, crossed with the frame's era and region presets and the author's declarations, reachable within max(`absFloor`, 10 %) on any of 50 seeds, over an unspecified "bounded search", because an implementer must not invent the controls, the bounds or the criterion, and a declaration an author can make is already reachability |
| J-V12.53 | chose to hash each panel note into `answers.json` when it crosses, keeping the words research-side, over crossing the notes under C3's character rule, because the owner's free text is the one string the scanner could not judge, and the record needs only that a note exists |
| J-V12.54 | chose item 110's four families as extensions off in the `MFCG`, `FTG` and `FM` presets, switched on by four upstream-first bumps each with its own `feature` cause, over one bump for all rows, because no measured reference builds them (0 of 48 research inputs), item 23 keeps extensions out of parity, and one bump cannot attribute a stage moved by two families to either |
| J-V12.55 | chose `source` values `generated`, `declared` and `carried` for raised ways, with no `dossier` source, over the critique's `dossier` value, because the dossier declares no arches (V06 §3.19.1, C6-47): its water-system record makes the aqueduct's need count as met at CITY and METROPOLIS (V11 §3.24.7 (3); the chance factor withdrawn by V11's round 1, SS-13), so a dossier-bound aqueduct is generated, never below CITY, and the guard counts it as generated; amended by reconciliation round 1 (ST-06, file f item 244): `source` is derived at read with the values `generated` and `declared` only, a way carried down from a city epoch reads `generated`, and `foundedRung` is read on the model side from the founding epoch's record |
| J-V12.56 | chose to leave the switch cells ordinary table cells — editable by the tables editor like any cell, their off form V11's — over the critique's "never a user control" and a separate boolean per family, because the owner's rule is that everything is editable, a user who turns a family off simply gets the pre-110 behaviour, and the owner-stamped minima bind calibration, not the user |
| J-V12.57 | chose K2's thresholds as consequences of its declarations (≥ 8 jetties with deck buildings on ≥ 4; ≥ 3 terraced wards with ≥ 10 retaining walls; a raised road within 2 % of straight crossing ≥ 2 ways) at CITY, 20 000 people, on the coast, over counts the rules may or may not fill ("every jetty with deck buildings"), because deck plots are offered by chance (item 110 (d)) and a fixture bar must fail only when the capability or the fixture is wrong |
| J-V12.58 | chose the fixtures' inputs under `plat/tests/fixtures/known-city/<id>/` (the base's fixture tree, §17.1 (3)) and their goldens under `plat/goldens/known/<id>/`, over V09's draft path `plat/test/fixtures/known-city-2/`, because the base names one fixture tree and one golden store, and K1 and K2 share one engine |
| J-V12.59 | *Reconciliation round 1 (SCC-04).* Chose to read a church class whose coverage unit is `parish` — a class that itself makes the parish partition — in the unit's `households` form with the same `per` (a disc of radius √(per × a_res ÷ π) about each residential plot), over the parish cells, because the cells are the churches' own Voronoi cells: every cell holds exactly one member, observed and permuted alike, so the statistic could never move and T-V11-13 could never pass for the principal coverage class |
| J-V12.60 | *Reconciliation round 1 (SCC-04).* Chose one `servedShare` whose unit is read from the subject class's compiled `profile.coverage` — districts of ≥ 30 households, parish cells, or residential plots for the walk and households discs, counted unweighted — with a `unit: 'district'` override for item 105 (k)'s dispersal row, one class per spec and a `settlement` unit refused, over the former single district statistic, because T-V11-13 measures "the share of units served" per class unit and T-V11-18 speaks of districts, the owning volume's statement wins (J-V12.48), and a permutation conserves a town-level unit |
| J-V12.61 | *Reconciliation round 1 (SCC-07).* Chose one **panel rule** for the register lines a panel confirms — a group rated No moves the line's cells once to the owning volume's stated second value as a declared `fallback` run and re-sits, else the entry is `not-achieved` and reaches the owner as a table defect; unrated, *provisional — not rated* — over a fallback per line, because V11 states second values for only a few cells (`blockPitchM`, `perHeadL`, `w_sun`) and every other line needs a pre-decided outcome |
| J-V12.62 | *Reconciliation round 1 (SCC-03).* Chose file f item 447's shapes for the measurement profile — an aqueduct a `way` of class `aqueduct` that enters no way graph, a `span` kind no metric reads, `stepMinCm` and `stepMaxCm`, J-VI.3's six closure kinds, no founding rung — with one drop-on-read rule for the exported properties the profile does not declare, over a separate aqueduct kind and reading every exported property, because 447 is the base's one export text for both variants (J-VI.18) and T-V12-4's equality must hold on it, while the metrics that need the dropped properties are `model` metrics reading the records |
| J-V12.63 | *Reconciliation round 1 (SCC-26).* Chose a `layer: { preset: 'FM' \| 'VG' }` cell in a `reference` run against that preset's own reference, written into the cell's preset entry with the default untouched, over freezing every preset entry, because V02 §3.10.8 and V07's V-M4 set those presets' measured-rate entries by exactly such runs (V07's one entry, `rules.race.densityPower@VG`, V07 §3.15; reconciliation round 4, SCC-80), while the MFCG and FTG presets hold values read from their references' behaviour and stay untuned (amended by reconciliation round 3, SCC-60: the same layer in a `fallback` run applying that entry's own pre-decided fallback, J-V12.67) |
| J-V12.64 | *Reconciliation round 1 (SCC-07).* Chose three descriptive `model` metrics — `crossing.kinds`, `water.needRatio` (computed by the base's own water-balance function), `ruin.survival` — for register lines whose cells no metric read, over pointing those entries at unrelated metrics, because `CalibrationEntry.metric` must name what measures the cell and the register check verifies that the metric exists |
| J-V12.65 | *Reconciliation round 3 (SCC-56).* Chose two generated metric families — `bar.<barId>`, the verdict statistic of one registered owner bar (a `StatBarSpec`, a `NullModelSpec` or the new `BenchBarDef`), and `frame.<table>.<column>`, a declared frame's value for one calibratable column, `notApplicable` until M-CAL — with `CalibrationEntry.metric` a list, over J-V12.64's pattern of one descriptive `model` metric per owning volume's column family, because the owning volumes confirm their cells by bars whose verdicts are the measurement, a descriptive metric per family would restate each bar's statistic under a second name, and the landed lines of V02 §3.10.10, V06 §8 and V11 §8 already name these families and several measurements per line; the value is read from the bar's own run, so the family costs nothing |
| J-V12.66 | *Reconciliation round 3 (SCC-54).* Chose to split V12 §3.11's `decline` line — V11 §3.18's four structure cells, owner V11, written at C3b; the base decline table's persistence cells `raised` and `retaining`, owner `base`, written by the seat landing V06's E2 at M6-E where BCR-V6-26 (file f item 291, STAGED M6-E) lands — with the rule that a base cell a volume's base change request adds is registered by the seat landing that request, over one line owned by V11, because `CalibrationEntry.owner` is single-valued, the lint fails an entry whose cell does not yet exist, and only the seat that lands a cell can write its entry with it |
| J-V12.67 | *Reconciliation round 3 (SCC-60).* Chose to admit a `presets.FM` or `presets.VG` entry in a `fallback` run applying that entry's own pre-decided fallback, with a `preset` field on the register target (ids `…@FM`, `…@VG`) so a preset entry has its own entry, and to keep out of every run a preset entry no register entry names (a code-read `ref:… (code)` entry, a `fixed:` off value), over admitting preset entries only in `reference` runs, because V02 §3.10.8 pre-decides `hipInset` 0.5 for a rejected FM run and V12 §3.7.5 applies an entry's fallback on rejection — refusing that run would leave a pre-decided fallback unappliable — and the entry test makes "measured-rate" mechanical: V02's code-read layout families and V11's off values take no entry |
| J-V12.68 | *Reconciliation round 3 (SCC-61).* Chose to merge per-run exports on read — a retaining wall's runs by `wall` in `run` order, an enceinte's condition runs by its `id` into built stretches — with `measureInputOf` writing one feature per retaining wall and per built stretch and states and conditions no measurement input, over having `measureInputOf` write per-run features, because every wall and retaining metric measures geometry a condition does not change, per-run features would make along-curtain statistics read a run end as a stretch end and let a decline move a parity number without moving a stone, and the merge keeps T-V12-4's equality exact |
| J-V12.69 | *Reconciliation round 4 (SCC-76, SCC-81).* Chose one catch-all rule for every register line of V12 §3.11 — a line ending "and every other calibratable column" binds each calibratable column of the tables or columns it names that no other register line names, each its own entry with that line's method, metric and fallback — and to end the items 103–107 and item-106 lines with it (registry rows 33–37, row 19, row 17's `profile` columns, row 24's `coverage.rosterWeight`; rows 14–15), over enumerating every column of those rows by name, because V11's `ColumnSpec` is not compiled yet (V12 §12, round 1) and a named list goes stale at every V11 round, while the rule leaves no calibratable cell without a line and the lint's one-knob-one-entry check catches a column two lines bind; V11 may still mark a cost bound or a word map non-calibratable, which then takes no entry. For the same reason chose to leave V02's stepped compositions to V2 §3.10.10's stepped line alone, the M4-110 line binding only V11's `stepped-shrine` heights row, over two lines for one set of knobs |
| J-V12.70 | *Reconciliation round 4 (SCC-82, SCC-83).* Chose to define `method: 'tune'` as a `reference` run against the entry's own reference when it falls due — the accepted value its confirmation, a rejected run applying its fallback, and, where the owning volume states it (V07 §3.15), no run when the entry's metric already holds its band — and to read a `frame.*` metric only at M-CAL, not read at an earlier exit and never holding an entry back, an entry of `frame.*` metrics alone being due at M-CAL, over a new method value per reference and over moving every entry that names `frame.*` to M-CAL, because the typed union already holds `tune` and item 34's, V02's and V07's cells use exactly that route, and an entry's earlier measurement (the direction at M2b) must confirm on its own while the corpus value arrives only with the frames |
| J-V12.71 | *Reconciliation round 2's continuation (SCC-R1C-2).* Chose one default register line — every calibratable column of a registry table that no named line binds takes one entry `cal.<table>.*.<column>`, `corpus` at M-CAL on its own `frame.<table>.<column>`, closing `fixed` with "no admissible frame" when no frame's run targets it, owner the volume its table's `rowsHome` names, marked `line: 'default'` and written by `plat calibrate register --defaults` in the change that lands the column — with any later line in V2 §3.10.10's form restating that entry in place, over asking each of V01, V04, V05, V07, V08 and V10 to write per-family lines now or exempting their `own` cells from the lint, because those volumes state no metric, due or fallback for cells they call calibratable, a per-family line needs bars most of them do not have before M-CAL, and an exemption would let a provisional number dangle, while the corpus stage is the one measurement every calibratable column already has (V12 §2.1's `frame.*` family); the marker lets the lint hold a default entry to the line and lets a volume's own line replace it without two entries for one knob *Amended at reconciliation round 3's continuation (SCC-R2C-4, SCC-R2C-5):* V08 and V10 left the list of volumes the line binds — their tables are not calibratable (V11 §3.1 rows 63–66 and 86–89; J-V11.65, J-V11.81), so the rationale's "cells they call calibratable" held for V01, V04, V05 and V07 only, and V03's `roomProgram.json` joined (SCC-R2C-17); the command writes only columns holding a compiled cell, and `owner` is read from the source file's author seat (J-V12.73). |
| J-V12.72 | *Reconciliation round 2's continuation (SCC-R1C-5).* Chose a named type `PresetArm = 'default' \| PresetId` for `BenchBarDef.towns.settings[].preset` and for every other `preset` field of V12 §2's records (a tuning run's targets and seeds, a correlation spec's seeds, a sweep level, a panel group), `'default'` being the recipe with no parity preset, over a comment on the one bare string the finding names, because the same bare string sat in five more records a harness reads and a typed union makes a third spelling a compile error; `CalibrationRun`'s `layer` and `CalibrationEntry.target` keep `'FM' \| 'VG'`, since they name a cell's preset entry, not the recipe a town is generated under. *Amended at reconciliation round 4's continuation (SCC-R3C-6; J-V12.76):* both read `'FM' \| 'VG' \| 'NG'`, V11's `PresetId` now holding `'NG'` |
| J-V12.73 | *Reconciliation round 3's continuation (SCC-R2C-5).* Chose (a) to have `plat calibrate register --defaults` write a default entry only for a calibratable column that holds at least one compiled cell, over writing one for every calibratable column of the compiled registry, because V11 §2.1 ships every registry row from C0 as its schema's empty table, so the wider rule would write entries at W2 (M1) for columns of V04's, V06's and V07's tables milestones before their seats land, against the line's own "the seat that lands the column's first compiled cell writes it", and would fill the register report's due list with unbuilt columns; the narrower rule keeps the lint's reach unchanged, since a column with no cell has no cell to fail; and (b) to read a default entry's `owner` from the source manifest's author seat of the file holding the column's cells (V11 §3.2.1 step 1), with the first document the table's `rowsHome` names deciding between two writers and a later writer never moving it, over the table's `rowsHome` alone, because several rows name more than one home (row 56 `islands` "II.6, V05", row 38 `roomProgram` "V03; §2.6"), and the author seat is known exactly when (a) lets the entry be written; the lint accordingly holds a default entry's `owner` to a document whose source file holds the column's cells rather than to a recomputed value, so a second writer's later change fails no entry |
| J-V12.74 | *Reconciliation round 3's continuation (SCC-R2C-6).* Chose to make BCR-V12-2's parity-report row carry a required `preset` spelled as V12 §2.1's `PresetArm` (`'default'` \| `'MFCG'` \| `'FTG'` \| `'VG'` \| `'FM'`), written out in the base's text, over keeping the base's optional `preset?: string`, because V12 §3.5 step 3 now names every row's arm — `'default'` for the O and C rows, the preset otherwise — and an optional string admits a third spelling (the field absent) that J-V12.72 closed in V12's own records; the union is spelled out rather than imported so the base text names no volume type it does not define; file f item 497's note records the change. *Amended at reconciliation round 4's continuation (SCC-R3C-6; J-V12.76):* the union adds `'NG'` (volume 1's BCR-46, file f item 584) |
| J-V12.75 | *Reconciliation round 4's continuation (SCC-R3C-1).* Chose to date a column whose first compiled cell lands after M-CAL's `ReconciliationRecord` is committed to the later run of the corpus process that takes its layer — `M-CAL/under`, `M-CAL/sky`, `M-CAL/evolution`, or `M-CAL/<milestone>` for any other late milestone — written by `plat calibrate register --defaults --milestone <id>` from the landing change's milestone through one table, with the same substitution on a named line's M-CAL stage, over keeping M-CAL the only corpus due (a late column's landing exit would fail on an entry already past due, with no admissible due — volume 5's §13 item 29), over a due of "the next corpus run" without an id (the exit and the lint need a milestone they can name and a record they can read), and over re-opening M-CAL itself (a committed milestone record is a fact, and its per-frame adoption decisions are taken); the later run opens on the owner's word as M-CAL does, because the corpus stays walled until the owner opens it (`partitioned/README.md`; J103), reuses M-CAL's declared frames, and holds a sitting only when it moved a cell; the lint reads the landing milestone from the entry's first history row, which `--defaults` writes, so no new register field is needed |
| J-V12.76 | *Reconciliation round 4's continuation (SCC-R3C-6).* Chose to write `NG` wherever this volume spells the presets out — the register's `…@NG` id and `target.preset`, a run's `layer: { preset }`, the report row's `preset` union (BCR-V12-2), V12 §3.5 step 3's arms (each P row under its reference's own preset: `MFCG`, `FTG`, `NG`, `VG`, `FM`), the M5 panel's groups, T-V12-9's and T-V12-24's preset clauses — over leaving `NG` to `PresetArm` alone, because V11 now types `PresetId` with `NG` (volume 1's BCR-46; SCC-R3C-2) and every spelled-out union that omits it is a third spelling; volume 1 holds no provisional `NG` entry (V1-3.15, J-V1.98), so the register's `NG` arm is admitted, not used, and V12 §3.7.2 (3) keeps every `NG` entry out of runs; J-V12.63's, J-V12.67's and J-V12.72's `'FM' \| 'VG'` read with `'NG'` |
| J-V12.77 | *Reconciliation round 5 (SCC-90).* Chose to admit a value moved by the column's owning seat before its due — only on a `provisional` default entry whose due's record is not committed, and only while no committed golden holds a stage that reads the column (the change's golden check finds no earlier golden's digest moved by it) — recorded by one cells row that `plat calibrate register --defaults --milestone <id>` appends when the column's compiled cells differ from the entry's last cells row, with `--check` failing a default entry whose last cells row disagrees with its column's cells, over (a) requiring a `fallback` or `reference` run for every such move, because volume 1's M5 tunings aim at that volume's own acceptance bars, which are not register metrics (V1-8.1), so a run would have no target to name, and no committed golden's digest depends on them, which the golden check proves per change (round 6, SCC-102: `terrace.siteShare` is read from M3a by `terraceState`), so no shift exists to declare; over (b) a new verb, because the command that writes the default entry already reads the column's compiled cells and takes the milestone, and one writer per row kind keeps the register's writers countable; and over (c) comparing the entry's last row of any kind, because after its corpus run a default entry's later rows record metric readings and its status while the run's changes ship as historical packs (V12 §3.10.3 R1), so every closed entry would fail — the typed `cells` marker (V12 §2.6) tells a cells row from the rest, which also lets the check catch an in-place move after the close; a closed or past-due entry takes no appended row, so every later move is a run. Status, due, owner, method, metric and fallback never move by the row, so the due still dates from the first row (J-V12.75). *Amended at reconciliation round 6 (SCC-98, SCC-102):* a tuning whose change's golden check finds a committed digest moved is held, not landed — the cell keeps its landed value, `plat calibrate register --hold` records the hold and the register report lists it "held: a committed golden reads it", the owning volume's bar reading the shipped value — over re-routing it to a run, because volume 1's bars are no register metrics and a run would have nothing to target; and a named `measure` entry whose cells no run may name (every bar's `BenchBarDef.stages` `[]`: V03 §2.4's lines, V12 §3.7.2 (4)) takes the same cells row for its owning seat's stated tuning before its exit and for its line's hand fallback in the exit's change, the entry closing `fallback-applied`, over forbidding V03's P6 tuning or routing its fallback through a run §3.7.2 (4) refuses, because either leaves the seat no legal move and the entry's last cells row disagreeing with the shipped cells; `--check` now compares every entry that holds a cells row (a named entry's first row is one), naming `plat calibrate run` where the command may not append, so a named line's in-place move outside its method fails rather than passing unseen |
| J-V12.78 | *Reconciliation round 5 (SCC-93).* Chose to make `--milestone <id>` required — the command refusing without it, naming the flag, and refusing an id that is neither one of §16's ids nor volume-qualified — with every milestone id this volume's records carry in V12 §2.8's volume-qualified form, and to key *The due's corpus run*'s table by those ids with a row of its own for the plan rung (M6-P and `V3-P0` – `V3-P6` → `M-CAL/M6-P`), over defaulting the flag (no command can tell which milestone a change belongs to, and a wrong default dates a late column's due wrongly and silently) and over bare step ids (volume 3's and volume 5's steps are both P0 – P6, so a bare `P1` names two milestones, and each of volume 3's steps would have opened a later run of its own); the volumes' short citations need no edit, since the refusal names the flag (X-V12-17). *Amended at reconciliation round 6 (SCC-99):* the volumes' own register lines write their steps in the same form (`V6-E1` – `V6-E8`, `V4-U*`, V02's crypt line's access draw as `V4-U3b`), and volume 11's content steps take the §16 ids of the milestones they are built inside (C0 `M0` … C8 `M6-U`) over a `V11-C*` prefix, because a C-step is a work package inside a §16 milestone with no record of its own, and `V11-C8` would date a late underground column to `M-CAL/V11-C8` instead of `M-CAL/under`; "the raised-way milestone" is M3a (file f items 244, 290); the lint's due test refuses any other due, so no entry waits on an id no `MilestoneRecord` carries |
| J-V12.79 | *Reconciliation round 6 (SCC-105, SCC-100).* Chose to type a register line of several stages as one entry carrying `stages` — `method`, `due` and `panel` its current stage's, each exit or sitting appending a stage row with its outcome, the last non-`corpus` stage's pass confirming, a failing stage closing the entry by its line's "when it cannot confirm", an unrated panel stage holding it *provisional — not rated*, a trailing `corpus` stage read at its corpus run whatever the status and never moving it, and a stage-level `metric` where the line gives one — over one entry per stage (two entries for one knob fail the one-knob check, and a later stage's fallback would move cells an earlier entry had confirmed) and over confirming at the first stage (the panel rule's later No would be an illegal move from `confirmed`, and the corpus possibility would never fall due); stages at rows the owner's product order leaves unordered (M4b, M5 and the staged rows) are each read at their own exit, whichever comes first, because no order among them is ruled and the item-102 line's island and drift fixtures sit on two of them; the span-rule line takes the staged order M4, `V4-U3`, `V4-U5`, since its cells land at M3a and M6-U follows M4 |
| J-V12.80 | *Reconciliation round 6 (SCC-103).* Chose to record rows a later landing adds to an entry's target by one cells row from `plat calibrate register --defaults --milestone <id>`, whatever the entry's status or due and whichever seat lands them, with (1)'s owner condition and (2)'s "owed to a run" reading only the changed cells of the row keys the last cells row holds, and `--check` failing a compiled row key that row lacks until the command appends it, over treating added rows as moves (no run adds a row, V12 §3.7.2, so a landing after an entry's close — the plan rung after M-CAL, `M-CAL/M6-P` — could never exit green) and over ignoring added rows (the register would stop holding the cells it confirmed, and the check could not tell an added row from an in-place move); rows added after the entry left `provisional` keep their authored values and are reported "rows added after close", a later major table version restating the entry for them, because the closed entry's measurement never saw them |
| J-V12.81 | *Reconciliation round 6 (SCC-107).* Chose to keep application and engineering constants — UI thresholds, autosave and export limits, time budgets — outside the register when their volume confirms them by its own test or performance row under D-18 (volume 9's and volume 10's), their provenance note naming that test, and to scope the in-code rule and *Entries* to model constants, over a `thr.` entry for each (the register's methods, metrics and corpus stages describe model behaviour a parity bar or a frame measures, which a UI timing is not) and over a scan of code constants (the lint reads compiled cells, and each such constant already has its test) |
| J-V12.82 | *Finalization (seam SCC-110; X-V11-17 (f)).* Chose to name V04's span-rule constants by volume 11's cells `raisedWays.structure.span.*` (row 80) in the span-rule line, to exclude the `span` block from the `raisedWays.structure` line's catch-all and add `slideMaxFactor` to it, and to take `retaining.settings.stateSnapCm` out of the `retaining` line's catch-all into its own default entry at M3a restated in place at `V6-E2` on `bar.T-V6-62` (file f J-RF2.4's measurement), over leaving the prose keys (which the lint cannot match, so the M3a seat would write two entries for one knob) and over an M4 panel for the snap (which sees no wall an epoch has re-levelled). Values unchanged. |
| J-V12.83 | *Finalization (seam SCC-112).* Chose to make a released strip pick's row a cells row — the change that releases it runs `plat calibrate register`, which appends the released cells by row key — over exempting owner-set entries from §3.11 (3)'s widened cells check, because the check is what proves a released value matches its table version, and a pick is no run, so without the row the releasing change could never pass `--check`. |

## 10 Base change requests

Each request names the base section by its exact heading, quotes the current text once (verbatim up to whitespace) and
gives the new text or the mechanism to add; this volume is designed as if every request were applied. None restates a
file-g rule: where a request touches a g item's bars it adds only their harness and default pass rule.

**BCR-V12-1 — the baseline row and the band rule.** `### 13.5 Reference-parity metrics (B-REF), read from one
numbers-only baseline file`.
(a) Current: "reference: 'MFCG' | 'FTG' | 'NG' | 'VG' | `corpus:${string}`;". New: "reference: 'MFCG' | 'FTG' | 'NG' |
'VG' | 'FM' | `corpus:frame:${string}` | `corpus:map:${string}`;" and, after the `values` line, the fields "metricVersion:
string; supersedes?: string; sample: { family: string; indices?: [0, number]; captures?: string[]; failed?: { index:
number; reason: string }[] }; estimator: 'single' | 'minmax' | 'type7'; spreadKS?: { p90: number; pairs: number }; scale:
'metric' | 'free'; evidence?: 'record' | 'surveyed' | 'drawn'; frameN?: number; // volume 12 §2.3".
(b) Current: "*Target* rows pass when ours lies in [p10 × 0.9, p90 × 1.1] of the reference's seed spread (a single-value
baseline: ± 15 %), and distributions when our KS distance to the reference is ≤ 1.25 × the reference's own seed-to-seed
KS distance at p90." New: "*Target* rows pass when ours — the median of our per-seed statistics — lies in the band that
volume 12 §3.5.2 forms from the reference's seed spread: the union of [p10 × 0.9, p90 × 1.1] and the single-value ± 15 %,
p10 and p90 by volume 12 §3.5.1's estimators, additive for a sign-indefinite metric, never narrower than the metric's
floor; distributions pass when the median single-seed KS distance of ours to the reference's seeds is ≤ 1.25 × the
reference's own seed-to-seed KS distance at p90 (volume 12 §3.5.3)."
(c) Current: "(five seeds per matched MFCG size, FTG's new captures)". New: "(ten seeds per matched MFCG size by the capture
plan's formula, FTG's new captures; volume 12 §3.2.1)".

**BCR-V12-2 — the parity report.** Same heading. Current: "rows: { metric: string; baselineIds: string[]; role:
Baseline['role']; rung: Rung; preset?: string;". New: "rows: { metric: string; metricVersion: string; baselineIds:
string[]; role: Baseline['role']; rung: Rung; preset: 'default' | 'MFCG' | 'FTG' | 'VG' | 'FM' | 'NG' /* volume 12 §2.1's
PresetArm: 'default' — no parity preset (the O and C rows); else the preset the row was measured under, volume 12
§3.5 step 3 */; setting: { population: number;
water: WaterSetting; seedFamily: string; seeds: number };" (the row's arm is required and spelled as V12 §2.1's
`PresetArm`, the base's optional string retired, so a row never admits a third spelling; reconciliation round 3's
continuation, SCC-R2C-6; J-V12.74; `'NG'` with volume 1's BCR-46, file f item 584, whose item 497 note already names it —
reconciliation round 4's continuation, SCC-R3C-6). Current: "verdict: 'pass'|'fail'|'reported' /* descriptive rows are always
'reported' */;". New: "verdict: 'pass'|'fail'|'reported'|'notApplicable'|'missingBaseline' /* descriptive rows are always
'reported'; volume 12 §3.5.6 */; override?: string /* a declared exception's band */;". Add to the header "metricsVersion:
string;" after `baselines`, and after the interface: "The report is written in volume 12 §3.13's canonical form, so the
same inputs give the same bytes on every host."

**BCR-V12-3 — the calibration run, generalised.** `### 13.9 The corpus-calibration interface (staged by the owner;
DEF-9)`. Current: "id: string; corpus: { adapter: string; version: string; maps: string[] };". Mechanism: the interface
becomes volume 12 §2.5's `CalibrationRun` — kinds `reference`, `fallback` and `corpus`; cells with bounds, step and
layer; an objective with targets and guards; a search; train and holdout seed families; every evaluation; a status —
keeping this interface's `changes`, `before` and `after`, with `shifts` as `ShiftRecord` ids. Current: "features:
FeatureCollection /* GeoJSON in metres: ways, blocks, plots, buildings, walls, water, greens, with their kinds */ }".
New: "features: MeasureInput /* volume 12 §2.2: metric or relative scale */; evidence: 'record' | 'surveyed' | 'drawn';
frames: string[] }", and after the block: "A `CorpusAdapter` is implemented research-side — the corpus is never read
inside `plat/` — and its maps reach `plat/` only as `baselines.json` rows (volume 12 §3.10.2)."

**BCR-V12-4 — the reconciliation's rules.** Same heading. (a) Current: "3. The run ships as a table-version bump inside
an output-version bump with a shift record for every moved stage". New: "3. A corpus run's changes land in the
historical setting pack `historical:<frame>`, bound to its frame's era and region (§7.6's packs), never in a shipped
default (volume 12 §3.10.3 R1); the pack ships versioned like a table, and adopting it, per frame, as on-by-default for
new documents of that era and region is an output-version bump with a shift record for every moved stage" (the rest of
the item unchanged). (b) Current: "the §13.7 thresholds whose provenance is "architecture" or
"owner-eye" are re-signed where the corpus measures them." New: "the §13.7 thresholds whose provenance is
"architecture" are re-signed where a frame measures them, and an "owner-eye" value only by the owner's re-pick at the
M-CAL sitting (volume 12 §3.10.3 R2)." (c) Add after item 7: "8. **Evidence.** Possibility is not prevalence: a record, a
drawn plate or a map outside a declared sample frame creates only a reachability requirement and may at most lift a chance
from 0 to 0.02; shares, weights, frequencies and band centres come only from frames of at least 20 surveyed maps declared
before measurement; drawn plates set look targets only, never names; the holdout and SettlementForge's map design are
never used (volume 12 §3.10.4). 9. **Never changed:** code, mechanisms, stage order, schemas, non-calibratable cells, the
parity presets, the dossier row sets, naming tables and packs, engineering invariants and budgets (volume 12 §3.10.3 R4).
10. **Acceptance and milestone.** The stage is milestone M-CAL, opened by the owner after M4, M5, M6 and V-M4; a frame's
layer is accepted by volume 12 §3.10.6's A1–A5 and the before-and-after sitting, whose decision rule is the owner's
(volume 12 Q-V12-3). Corpus target rows gate the frame's historical pack; under the default preset they are descriptive,
reported beside the pack's verdict, until the owner adopts that pack, and from then on they gate the new default for
matching documents (volume 12 §3.10.3 R2). 11. **Owner rules.** A cell or mechanism that encodes a clause of an OWNER RULE
item is never an evidence target: every such cell carries its `ownerRule` stamp (§7.6), and a witnessed form the clause
excludes is recorded as an owner question, never a layer cell or a known defect; an owner-stamped calibration minimum
binds a corpus run (volume 12 §3.10.3 R6)."

**BCR-V12-5 — provenance evidence and owner-rule stamps.** `### 7.6 The override layer and editable tables (G-P12; owner
amendment 5)`. Current: "calibratable, extension?: {over, mode}}`.". New: "calibratable, extension?: {over, mode}}`, and
`provenance` may carry `evidence?: string[]` — the ids of the baseline rows, calibration run and panel that set the value
(volume 12 §2.10), which the tables compiler carries and ships, beside the tables, with each cell's calibration status and
one plain line per id (`dist/evidence.json`) — and `ownerRule?: string`, the OWNER RULE item and part a cell encodes (an
owner-rule cell, or an owner-stamped calibration minimum, that no calibration run, fallback or corpus layer may cross; volume
12 §3.7.2, §3.10.3 R6). The table content hash that pins an output version (§6.4) excludes `evidence`, a view-only field."

**BCR-V12-6 — the panel engine.** `### 13.6 The owner's side-by-side protocol (D-5)`. (a) Current: "type D5Pair = // one per
pair, in seeds.json and the record, in the order (2) lists them". Mechanism: the union gains volume 12 §2.8's five
variants — `'FM'` (volume 2 §7.5), `'VG'` (volume 7 §8), `'DW'` (volume 3's plan panel), `'AB'` (volume 12 §3.10.6's
before-and-after and volume 6's histories) and `'SOLO'` (volume 4's underground, one map per item, Yes or No). (b) Add after item 9:
"10. **One engine for every sitting.** Each sitting is a `PanelSpec` keyed by its milestone id on one engine (volume 12
§3.9): M1, M2b, M4 and M5 here, M6 against Fantasy Manor (volume 2), the village against VG (volume 7), the plan rung
against Dwellings (volume 3), the underground rated alone (volume 4), the islands beside Neighbourhood's patches as a
descriptive set (volume 5), the histories against fresh towns (volume 6) and M-CAL's before-and-after (volume 12). The pair order and sides come from a stream keyed by a secret salt, only the key's hash is
committed before the sitting, the page is a local file never published, and a rated verdict needs every answer (volume 12
§3.9.3–§3.9.5)."
(c) The record widens for the new panels (V12C-11). Current: "type D5Status = 'diagnostic' /* M1 */ | 'passed' | 'failed' |
'accepted' /* a failure or an unrated panel accepted by the owner in writing */ | 'provisional-not-rated';". New: the same
with `| 'descriptive' /* a panel whose passRule is 'none', volume 12 §2.8 */` before the semicolon. Current: "answers: {
pair: number /* index into pairs */; question: 'legibility'|'realism'|'charm'; answer: 'left'|'right'|'same'; note?: string
}[];". New: "answers: { pair: number /* index into pairs */; question: 'legibility'|'realism'|'charm'|'reads'; answer:
'left'|'right'|'same'|'yes'|'no' /* yes / no: a SOLO item, volume 12 §2.8 */; noteHash?: Hash128 /* the owner's note stays
research-side */ }[];". Current: "verdicts: { reference: 'MFCG'|'FTG'|'NG'; question: 'legibility'|'realism'|'charm'; group:
'all' | Rung /* FTG: per rung, (6) */;". New: "verdicts: { reference: 'MFCG'|'FTG'|'NG'|'FM'|'VG'|'DW'|'AB'|'SOLO'; question:
'legibility'|'realism'|'charm'|'reads'; group: 'all' | Rung | { template: string } | { frame: string } | { class: string } |
{ id: string } /* FTG: per rung, (6); a named group such as M4-110, volume 12 §3.9.1 */;".

**BCR-V12-7 — seeds by formula for the benches and the goldens.** (a) `### 13.3 Seed goldens with the declared-shift
protocol (G-P11, G-R9), from M1`. Current: "A golden suite of 12 seeds × {TOWN, CITY, METROPOLIS} × the four
`WaterSetting`s". Mechanism: add after the paragraph's first sentence "Seed i of a (rung, water) setting is
`H32("golden/<rung>/<water>/<i>")`, i = 0 … 11, rehashed by volume 12 §2.4's collision rule (volume 12 §2.4)." (b) `### 13.2 Per-stage invariants, statistics,
cost-model tests, contract tests, B-EDIT`. Current: "on B-CITY: 1 000 seeds × the 4 `WaterSetting`s of §13.3 × 3 rungs
in the nightly". Mechanism: add after "3 rungs" the clause "— seed i of a setting `H32("bcity/<rung>/<water>/<i>")`,
B-CITY-lite its first 50, rehashed by volume 12 §2.4's collision rule, and every measurement family disjoint from them by
that rule —".

**BCR-V12-8 — the crossing.** `### 17.1 The clean-room chain (IMP-1; D-29)`. Current: "4. **Reference numbers only
through committed numbers-only files.**". Mechanism: add at the item's end: "Every such file passes `plat baselines
check` (volume 12 §3.3, checks C1–C10) before it is committed — strings by pattern, notes scanned, no colour value,
append-only rows, research-side paths as opaque `research:` labels, corpus ids salted and no corpus string but our preset
keys — and each commit appends a `CrossingRecord` countersigned by a checker seat that reads only the file. The later
panels and the corpus stage add files that cross the same way, numbers, ids and hashes only: `fm-captures.json`,
`dw-captures.json` and `vg-seeds.json` (capture ids, seeds, tags and counts) into `plat/goldens/d5/⟨panel⟩/`, which `plat d5
seeds` reads; each sitting's `answers.json` (the owner's notes as hashes) and `key.json` after the reveal, which `plat d5
verdict` reads, never a file outside `plat/`; and the corpus's `frames.json` into `plat/calibration/reconciliation/`,
before any row of its frames (volume 12 §3.3, §3.10.2)."

**BCR-V12-9 — the build plan and its price.** `## §16 Build plan — calibration and spikes first, then a viewable town,
then editing, then parity, then stage 2`. (a) Current: "**the MFCG sweep at five seeds per matched size**". New: "**the
MFCG sweep at ten seeds per matched size by the capture plan's formula (volume 12 §3.2.1)**". (b) Current: "| the
verification rig (five benches in three CI tiers, stage-isolated goldens with shift and cascade records, the five-engine
nightly run, visual regression, the option matrix, control and cost-model sweeps, `baselines.json`, the clean-room
scanner, the D-5 tooling) | 9.5–13 |". Mechanism, **as deltas only** (the coherence pass sums every volume's deltas;
V12C-30): its basis gains "volume 12: the metric registry with one implementation and the derived features, the
calibration-run engine with its guards and fixture suites, the correlation, share and sweep harness with the rank rule,
the pooled exact test and the confirmation stage, the register with its lint, evidence and owner stamps, drift, the panel
engine and the sitting page, the known-city fixture engine and the no-op pin engine (volume 12 §8.2)"; the line and the
base subtotal each grow by **+6 / +9 pw**, carried by the milestone rows as M-1 +0.5 / +1, M1 +1.75 / +2.25, M2b +2 / +2.75,
M3a +1 / +1.75 (the raised-way bars' +0.25 / +0.5 among them: raised-way generation lands at M3a, file f items 244 and
290), M4 +0.5 / +0.75 and U3 – U5 +0.25 / +0.5. (c) Add to the staged
paragraph: "the corpus reconciliation is milestone M-CAL, after M4, M5, M6 and V-M4 and before M-SF, priced by volume 12 at
4.75–8 pw outside the total."

**BCR-V12-10 — the package.** `## §14 Package and module layout, key interfaces, dependency rules, extension points`.
Current: "@plat/testkit  B-FUZZ generators (random and constructive), invariant runners, cost-model tests, the bench
statistics and the `parity` CLI". Mechanism: the entry gains "the metric registry `METRICS`, `measureInputOf` and `plat
measure`; `plat baselines check / aggregate`; the seed families; `plat calibrate` (runs and the register); `plat
nullmodel` and `plat statbar` with the expected-value functions of `@plat/testkit/expected` and the step runner;
`undergroundInputOf`; the panel engine with `plat d5 verdict`; `plat known` (the known-city fixtures' engine) and `plat noop`
with `@plat/testkit/noop` (the no-op pins) (volume 12 §2–§3)"; the types comment gains "MetricDef, MeasureInput, SeedFamily,
CalibrationEntry, NullModelSpec, StatBarSpec, PanelSpec, ReconciliationRecord, KnownCityFixture, StructureCheck, NoOpPin:
volume 12 §2"; and the
dependency rules gain "`testkit` may import `api` and `export` and is imported by nothing shipped".

**BCR-V12-11 — the staged row.** `# Staged by the owner's roadmap (this document defers nothing)`. Current: "| calibration
against the historical corpus (after the standalone generators) |". Mechanism: the row's hooks cell gains "— built at
depth by volume V12 as milestone M-CAL (after M4, M5, M6 and V-M4), its changes a reconciled preset layer that never
overwrites the base".

**BCR-V12-12 — J-T and the correlation row.** `### 13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30)`.
(a) Current: "an M-1 re-measurement, an owner pick on the panel of §13.6 (8), a calibration run". New: "an M-1
re-measurement, an owner pick on the panel of §13.6 (8), a calibration run — a reference tuning run, a fallback run or a
corpus run, each pre-registered, held out and declared (volume 12 §3.7, §3.10) —". (b) Mechanism: after the rows added by
amendments c, "**Rows added by volume 12.** Two thresholds no reference can set join the tables under J-T:" with the row
"correlation bars (T71-3's shape; file g items 103 (e)–(f), 104 (g), 104 (h) (8), 105 (k), 107 (g)) | per town the
randomised-tie rank u of the observed statistic among 20 permutations; pass when u > 0.5 in ≥ 70 % of the towns and the
median u ≥ 0.60; statistics that count members on indicator plots pass instead by a pooled exact hypergeometric test at
0.01, a spec whose pooled null share exceeds 0.85 refused; a bar that states its own margin, its own Holm family or its
owning volume's rule uses it; a failing bar is re-run once on a fresh family at twice the towns before it fails
(provenance "architecture 2026-09-28"; volume 12 §3.6) | M2b | the pulling weight doubles once, clamped to its range and
never across an owner-stamped cell, and the bar re-runs; still failing, it is reported not produced — **not achieved**",
and the row "tendency bars of other shapes (file g items 104 (h) (8), 105 (k), 107 (g), 108 (f), 109 (a), (c), (i), (j) (1),
(j) (5), (k) (4)–(6), 110 (b)) | most: a pooled share ≥ 2/3 over ≥ 100 effective instances (the analysis-of-variance design
effect) from ≥ 20 towns, with 70 % of the towns of ≥ 3 instances at ≥ 1/2; floor: over deep voids (connected components, ≤ 3
per town), one-sided exact binomial at 0.01 on the deflated count; rate: two-sided exact binomial at 0.01 over ≥ 200, or
within k standard errors where the owner states it; presence: min(500, ⌈5 ÷ p⌉) towns per level; trend: Cochran–Armitage
z ≥ 2.326 with no two-standard-error reversal; higher-with: stratified Cochran–Mantel–Haenszel z ≥ 2.326 with no stratum
reversal; distinctness: block-area ratio 1.5, grid order 0.15, axis 10°, each in 70 % of seeds and every seed on two;
structure: the ruins' median above the caverns' p90; no-regression: 0.05 of a share; the record-keyed monotone and bound
properties exact; each statistical rule re-run once on a fresh family before it fails (provenance "architecture
2026-09-28"; volume 12 §3.6b) | M2b (the web and chain bars); the underground's U3 (item 109's); M3a
(item 110's, where raised-way generation lands) | the bar's driving row moves once, clamped and never across an owner-stamped cell or minimum, and the bar
re-runs; still failing, not produced — **not achieved**". Item 102 (g) is a fixture bar (volumes 5 and 6), not a row here.

**BCR-V12-13 — one harness for every random baseline.** `### 13.2 Per-stage invariants, statistics, cost-model tests,
contract tests, B-EDIT`. Current: "frontages at a share above a shuffled-placement baseline by §13.7's margin". New:
"frontages at a share above a shuffled-placement baseline by §13.7's margin (volume 12 §3.6's harness, the spec `T71-3`:
block scope, 20 permutations, the margin rule)". Mechanism for the coherence pass: every bar file g adds that compares with
a random or shuffled baseline is a `NullModelSpec` run by volume 12 §3.6's harness, with §13.7's correlation row as its
pass rule unless the bar states its own; and every bar of the shapes "in most placements", "at or above the floor", "at
the ranked share", "at every rung", "rises with", "higher with than without", "rising monotonically", "differs from",
"beats the baseline" and "within tolerance of the base's" is a `StatBarSpec` run by volume 12 §3.6b under §13.7's
tendency row. The coherence pass lists the §13.2 clause ids of items 105 – 110's conformance bars (a fixture property,
not a tendency) in the harness registry's `conformance` list, so volume 12's T-V12-35 asks a spec only of the tendencies.

**BCR-V12-14 — the tiers.** `### 13.8 CI tiers and compute budgets (SCL-18; D-34)`. Mechanism: add at the section's end:
"**Volume 12 in the tiers.** PR: the crossing check on any changed numbers-only file, the register check and T-V12-1, -2,
-9, -16, -20, -28 and -30's fixtures; nightly: B-REF on the `bref` seeds (≤ 20 CPU-min), the correlation specs (≤ 10
CPU-min), the web, comfort and chain bars of volume 12 §3.6b (≤ 15 CPU-min), T-V12-4, -5 and -7; milestone and weekly:
the underground's sweep and pooled bars (≤ 60 CPU-min each) and the four raised-way bars (≤ 20 CPU-min); milestone: the parity report at 100 seeds per setting (≤ 60 CPU-min) and
both known-city fixtures' three paths (≤ 10 min wall, from M3a); PR: K2's skeleton path (≤ 5 s) and the no-op pins'
landing gate on the two PR golden seeds; nightly: the no-op pins' off-state suites (≤ the golden job's time once more,
rotating by family) and the pooled statistics on B-CITY's towns (≤ 10 CPU-min). Calibration and corpus runs and the
tendency bars' confirmation re-runs are runner jobs outside the tiers, never during a timing phase (volume 12 §6). The
tier budgets do not change."
Current (the milestone row's cell, replaced): "the parity report at five seeds per matched size". New: "the parity report
at 100 of our seeds per setting against the ten-seed references (volume 12 §3.5.5)".

**BCR-V12-15 — closures in the export (item 106).** `### 11.1 Formats`. Current: "walls, towers, gates and built bridges
as typed features (a crossing `site` is not exported, §2.7);". New: "walls, towers, gates and built bridges as typed
features (a crossing `site` is not exported, §2.7) — an enceinte closed by `shore` or `barrier` adding its closing edges
as LineStrings of kind `closure` carrying the barrier kind (`shore`, `cliff`, `gorge`, `marsh`, `sheer`, `enceinte`; J-VI.3) and every enceinte its
enclosure as one Polygon of kind `enclosure` (item 106; volume 12 §2.2), each gate carrying its kind (`land` or `water`,
§2.7);".
Item 106 homes the closure in the model (§2.7) but names no export for it; without this the metric export — and so every
wall row of volume 12 — could not tell a cliff-closed town's enclosure from an unclosed chain, and T-V12-4's equality of
the measured input and the export would fail on every item-106 town.
(b) **The metric variant's measurement properties (V12C-10).** Same heading. Current: "the origin, the unit, the axes,
the document id and the anchor if one is set (J-R31).". New: "the origin, the unit, the axes, the document id and the
anchor if one is set (J-R31). The metric variant's features also carry, beside their public attributes, `use` (the class
family key), `district` (the id of the district the feature lies in) and, on plots and buildings, `prosperity` (the
field's value, 3 decimals) — volume 12 §2.2's measurement profile — and its schema version bumps once for them; the
strict variant is unchanged."

**BCR-V12-16 — the second known-city fixture (item 110 (e)).** `### 13.2 Per-stage invariants, statistics, cost-model
tests, contract tests, B-EDIT`. Current: "(T101-6) J78's acceptance fixture (M3a) — an original skeleton with a known city's
structure and our own names (`docs/experiments/known-city-authoring.md`; J78) —". New: "(T101-6) J78's acceptance fixture
and item 110 (e)'s second fixture (M3a) — each an original skeleton with a known city's structure and our own names, its
brief, structure list, seed and golden in volume 12 §3.14 —". The rest of the clause is unchanged, and "the fixture's
structure list" then reads per fixture; the research path leaves the base text (§17.1 (1): an implementer follows no
pointer research-side).

**BCR-V12-17 — item 110's entities in the export.** `### 11.1 Formats`. Current: "walls, towers, gates and built bridges
as typed features (a crossing `site` is not exported, §2.7);", as BCR-V12-15 amends it — the coherence pass applies this
request after BCR-V12-15. Mechanism: add in both GeoJSON variants, after BCR-V12-15's text, "— retaining walls as
LineStrings of kind `retaining` with their step and material; every way its `part` (0 the ground; a raised part's ways
their raised kind, source and reason, their supports as Polygons of kind `raisedSupport`, an aqueduct's channel a
LineString of kind `aqueduct`); stairs and ramps as flags on the way segments they occupy; plots and buildings on a mole,
pier, quay platform or bridge deck their deck kind (item 110; volume 12 §2.2)". Item 110's HOMES name no §11 export; without
this T-V12-4 fails on every town holding an item-110 entity, and a GIS user's export silently drops the viaducts and
terraces. **Applied as file f item 447** (IN-V12-4; J-VI.18), whose one text for both variants supersedes the wording
above where they differ: an aqueduct's channel is its way's LineString of class `aqueduct` (no kind of its own), each span
is a Polygon of kind `span`, a retaining wall carries `stepMinCm` and `stepMaxCm`, and no founding rung is exported
(reconciliation round 1, SCC-03); volume 12 §2.2 reads 447's properties.

**BCR-V12-18 — the reference maps' names in the deny-list.** `### 17.1 The clean-room chain (IMP-1; D-29)`, item 5.
Current: "texture and image file hashes.". Mechanism: add after it "; and the place, ward and landmark names legible on the
study-only reference maps under `research/reference-maps/`, transcribed research-side by the research seat (digests
only)", so the scanner covers every known-city fixture file (volume 12 §3.14.2).

**BCR-V12-19 — a fixture in a shift record.** `### 13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), from
M1`. Current: "seeds: { seed: string; rung: Rung; water: WaterSetting; before: Hash128; after: Hash128 /* isolated stage
digest, or the placement digest for S13b */ }[];". New: "seeds: { seed: string; rung: Rung; water: WaterSetting; fixture?:
string /* a skeleton fixture's id, volume 12 §3.14; absent for a golden seed */; before: Hash128; after: Hash128 /* isolated
stage digest, or the placement digest for S13b */ }[];".

**BCR-V12-20 — several panels per milestone and the register's statuses in exits.** Same heading. Current: "d5: { status:
D5Status; record: string /* plat/goldens/d5/<milestone>/record.json, §13.6 */ } | null;". New: "d5: { panel: string;
status: D5Status; record: string /* plat/goldens/d5/<panel>/record.json, §13.6; every panel sat or re-offered at the
milestone, volume 12 §3.9 */ }[];". Current: "exitCriteria: { id: string; result: 'pass'|'fail'|'fallback-applied';
evidence: string }[] }". New: "exitCriteria: { id: string; result:
'pass'|'fail'|'fallback-applied'|'not-achieved'|'owner-set'|'fixed'|'provisional-not-rated' /* volume 12 §3.11's register
statuses and a known-city fixture's row T-V12-36:<id> */; evidence: string }[] }".

**BCR-V12-21 — the statistical methods.** `### 17.1 The clean-room chain (IMP-1; D-29)`, item 8. Current: "and the
Hausdorff distance (§3.7, §13.2, II.5).". New: "and the Hausdorff distance (§3.7, §13.2, II.5); and, for volume 12's
calibration harness, Hyndman and Fan's type-7 sample quantiles (1996), exact binomial tails, the hypergeometric
distribution and its convolution, the Cochran–Armitage trend test (Cochran 1954; Armitage 1955), the stratified
Cochran–Mantel–Haenszel test (Mantel and Haenszel 1959), the one-way analysis-of-variance estimator of the intraclass
correlation and Kish's design effect (Kish 1965), golden-section search (Kiefer 1953) and the bootstrap (Efron 1979)." The
method-name scan's list gains these nine.

**BCR-V12-22 — the historical pack's slot.** `### 7.6 The override layer and editable tables (G-P12; owner amendment
5)`. Current: "* **Packs.** A pack's content is §10.4's; its place in the document's pack set, its retention in `packs` and a
user-uploaded corpus as a pack are §2.9's.". Mechanism: add after that sentence "A **historical pack** `historical:<frame>`
(volume 12 §3.10.3) is a setting pack of parameter deltas bound to its frame's D-2 era and region keys: expansion applies
it only to a document whose era and region presets match the frame, it takes no preset slot, a new matching document takes
it by default only when the owner has adopted it for that frame, and it is added or removed like any pack."


**Cross-volume notes** (for the coherence pass; volumes are not base text):
* **X-V12-1 — V11's compiler.** V11 §3.2.1 step 4 stops the build on a `corpus` provenance other than the item-69
  palette targets. From M-CAL a `corpus` source is also valid in a `historical:<frame>` pack table when its `evidence`
  names a corpus `CalibrationRun` listed in a committed `ReconciliationRecord`; step 7's manifest gains the
  `evidence.json` of V12 §2.10 with each cell's register status; cells carry evidence **ids** only, outside the pinning
  hash; and the compiler stamps `ownerRule` on every cell of an owner-rule row and writes the stamped-clause list the
  register check reads (V12 §2.10, §3.11).
* **X-V12-2 — V02 and V07.** Their panels are `PanelSpec`s on V12 §3.9's engine; their `D5Pair` variants are BCR-V12-6's;
  their reference rows are `Baseline` rows of input `counts` or `geo` under BCR-V12-1's `'FM'` and `'VG'` references.
* **X-V12-3 — V11.** Its column entries — V12 §3.11's column-family register entries — land with each content milestone
  and C6 at M4 audits them (V11 §8; V11's round 1, SCC-08); the ancient-culture rows must
  clear V12 §3.6b's distinctness thresholds (block-area ratio 1.5, grid order 0.15, axis 10°) against the town's fabric
  above the ruin (V11 J-V11.30; V12 §3.6b `paired`; reconciliation round 1, SCC-27), which is item 109 (c)'s "differ in at
  least block size, grid regularity and orientation law" made measurable.
* **X-V12-4 — V03, V04, V05, V06.** Their sittings are the `PanelSpec`s of V12 §3.9.1 (V3-P6 against Dwellings, V4-U5 as
  SOLO, M6-sky as a descriptive NG set, V6-E7 as AB `history` on H-100), each owner confirming or changing its spec in its
  revision; V04's item-109 bars are the `StatBarSpec`s of V12 §3.6b's bar map with its levels (forced-source fixture
  sites), `undergroundInputOf` reading its system records; V06 lends H-100 and its random trajectories to the V6-E7
  panel, to the access trend's growth units and to item 109 (k) (6)'s never-shrink property.
* **X-V12-5 — V08.** Its surveyed-dossier fixtures are item 108 (f)'s `exactMonotone` levels (their `@pop×k` derivatives
  registered in the frozen manifest, a level outside [1 500, 120 000] `notApplicable`), its custom-chain fixtures item 104
  (h) (8)'s levels, its catacomb fixtures (DR-V8.4) the step script's, and a fixture carrying a high-ground landmark (DR-V8.8)
  the elevated-road `higherWith`'s; none is a calibration seed family, and B-DOSSIER-lite guards every accepted run
  (V12 §1b, §3.7.5).
* **X-V12-6 — V09 (the tables editor and the preset dialog).** The cell inspector reads `dist/evidence.json`: the status
  in plain words ("the owner's rule" for a stamped cell) and the evidence lines; the preset dialog lists the adopted and
  selectable historical packs as "historical (<era>, <region>)", offered only to documents of that era and region.
* **X-V12-7 — V10 (the clerk).** "Why is this value so?" answers with the plain line first ("tuned so organic lanes turn as
  much as FTG's streets per 100 m") and the run id only behind "details"; a stamped cell answers "the owner's rule, item
  …"; the clerk never starts a run.
* **X-V12-8 — V09 and V10 (the known-city fixtures).** V09 §7.2's second part cites V12 §3.14's K2 structure list for its
  dedicated-user checklist and thresholds (K2-4 reads "≥ 8 jetties outside the basin, deck buildings on ≥ 4", not "eight
  jetties with deck buildings"); the fixture's inputs live in `plat/tests/fixtures/known-city/K2/` (J-V12.58); K1's brief
  keeps its bridge's deck plots (already un-staged in V09); V10's evaluation group A reads the fixture record
  `plat/goldens/known/<id>/fixture.json`.
* **X-V12-9 — V11 (item 110's rows and the owner's stamps; V11 landed 01:43 with V11 §3.24).** V11's switch table
  (§3.24.0) is the pins' "off", adopted as is; V11's schema holds the raised-way rung gate (no row below CITY), adopted as
  is. V11 adds: the `ownerRule: '110 (b)'` stamp and the calibration minima 0.02 (chance) and 1 (cap) on the CITY and
  METROPOLIS `raisedWays` columns, binding runs, fallbacks and corpus packs only; the `ownerRule` stamp on every cell of an
  owner-rule row (the catacomb TOWN gate, the cemetery-only sources, the cathedral's `always` crypt, the underground's
  any-tier existence) and the stamped-clause list the register check reads (BCR-V12-5); `presets.FM` resolving the stepped
  and deck families off beside T-V11-21's three presets; the item-110 rows under the names V12 §3.11's register lines cite
  (as V11 §3.24 writes them). V11's T-V11-12 – T-V11-18 register their specs with V12 §3.6b's bar map (their stated rules as
  parameters; T-V11-12 as a Holm family).
* **X-V12-10 — V06 and V09 (removal holds).** Key a generated raised way's removal to its reason, never its course, so it
  survives a change of course under a table release, an upgrade or a historical pack (V12 §4.1; T-V12-40).
* **X-V12-11 — V02, V04, V05, V06, V07 and V11 (the pins).** T-V2-50, T-V4-69, T-V5-15, T-V6-65, V07's village pin and
  T-V11-31 register their suites on V12 §3.7.8's engine and read "off" as V11 §3.24.0's switch table (V06's T-V6-65 wording
  "the `deck` budget 0, the terrace thresholds off" becomes "every `deck.offer` 0, `terrace.enabled` false"); their
  switch-on shifts follow V12 §3.7.6's four bumps; "byte-identical to before item 110" is read as V12 §3.7.8's off-state set.
* **X-V12-12 — the coherence pass.** Apply BCR-V12-16 – BCR-V12-22, BCR-V12-17 after BCR-V12-15 (both rewrite one §11.1
  clause); §16's M3a row carries item 110 (a) – (d)'s base parts (V02's BCR-V2-39) and K2, and a row names the milestone that
  lands raised-way generation (met: file f items 244 and 290 land it at M3a; reconciliation round 6, SCC-99); §13.2's item 105 – 110 conformance clauses go on the harness registry's `conformance` list
  (BCR-V12-13); sum BCR-V12-9's deltas with the other volumes'.
* **X-V12-13 — V04.** T-V4-54 reads g's *voids* — V12's deep void is a connected component counted at most three per town —
  not chambers; T-V4-43's and T-V4-58's "± 3 s.e." and 500 seeds are taken as the specs' parameters; T-V4-51's step script
  is V12 §3.6b's (with the dossier burial event and extend growth); `CatacombComplex.id` keeps its source lineage across
  every derivation, as the record-keyed monotone check needs; T-V4-44's structure test never reads a monument's tiers.
* **X-V12-14 — V07.** The village rungs' levels of item 109's presence and access bars join at V-M4 (`notApplicable`
  before, never `insufficient`); V07's village pin registers on V12 §3.7.8 with its `terrace.enabled` switch.
* **X-V12-15 — the base, V02, V03, V06 and V11 (the bars their register lines name; reconciliation round 3, SCC-56).** Every bar a
  register line names as `bar.<id>` that no `NullModelSpec` or `StatBarSpec` carries as its `id` or `ownerBar` registers a
  `BenchBarDef` (V12 §2.1) with the milestone whose exit writes the entry — as the lines stand at this round: the base's
  T16-4 (V11 §8's `detourFactor` line); V02's T-V2-22, -28, -29, -30, -32, -36, -37, -42, -46, -47, -51 (V2 §3.10.10);
  V06's T-V6-6 – -10, -13, -16, -18, -28, -31, -32, -40, -43, -54, and T-V6-34 and -37 in their epoch forms (V6 §8); V11's
  T-V11-30 (V12 §3.11's item-102 line); V03's T-V3-35 (V03 §2.4's `roomProgram.json` lines, J-V3.118; reconciliation
  round 3's continuation). Until a bar is registered, the lint fails the entry that names it (V12 §3.11).
  Each registration's `towns.settings[].preset` is a `PresetArm` (V12 §2.1): `'default'` for towns generated under no parity
  preset — V6 §8 writes it so, V2 §3.10.10 writes `preset: 'default'` (its registration paragraph; SCC-R2C-7, J-V2.105
  (c)), and V11 §8's T16-4 and T-V11-30 registrations write `preset: 'default'` (reconciliation round 2's continuation,
  SCC-R1C-5; J-V12.72) — this clause met for all three (reconciliation round 4's continuation, SCC-R3C-12).
* **X-V12-16 — V01, V03, V04, V05 and V07 (the register at their exits; reconciliation round 2's continuation,
  SCC-R1C-2; reconciliation round 3's continuation, SCC-R2C-4) — met** (reconciliation round 4's continuation,
  SCC-R3C-12). Each exits every milestone that lands a registry table, or a calibratable column of one, with
  "`plat calibrate register --check` green over the cells it lands", as V12 §3.11 asks: volume 1 in V1-8.1's *The
  register at every exit* (J-V1.97); volume 3 in §8's PE, P1, P2 and P6 exits, with its own lines for `roomProgram.json`
  in V03 §2.4's *The register lines of `roomProgram.json`* and T-V3-35 registered as a `BenchBarDef` (J-V3.118;
  X-V12-15); volume 4 in V4 §8's *The register at each exit* (J-V4.117); volume 5 in V5 §8's *The register at the exits*
  (J-V5.80); volume 7 in V07 §8's *The register at the exits* (J-V7.124). Volume 3 writes its §2.4 lines; volumes 1, 4, 5
  and 7 write no line of their own — their columns take V12 §3.11's named lines where one names the column (V04's cells,
  J-V4.117; V07's one `rules.race.densityPower@VG` entry, V07 §3.15) and the default line otherwise. Volume 8's dossier
  row sets and volumes 9's and 10's tables are not calibratable (V11 §3.1 rows 63–66 and 86–89).
* **X-V12-17 — V04, V05 and V06 (the later corpus runs; reconciliation round 4's continuation, SCC-R3C-1; J-V12.75); V01,
  V03, V04, V05 and V07 (the flag; reconciliation round 5, SCC-93; J-V12.78).**
  V12 §3.11's default line now dates a column whose first compiled cell lands after M-CAL's record is committed to its
  layer's later run (*The due's corpus run*): V4 §8's due steps, which read "the underground's later corpus run" in words
  (SCC-R3C-13), may name it `M-CAL/under`; V5 §13 item 29 is met by the same line (`M-CAL/sky` for P1's and P2's columns
  should M6-sky land after M-CAL); V6 §8's lines carry no corpus stage, so only a V06 column no V6 §8 line names and that
  lands after M-CAL takes a default entry due `M-CAL/evolution`. Nothing in the three volumes must change for the rule to
  hold; the next round of each may cite the ids. *Round 5 (SCC-93):* `--milestone <id>` is required (V12 §3.11's *The
  due's corpus run*): volumes 1, 3, 4, 5 and 7 cite `plat calibrate register --defaults` without it (V1-8.1's register
  paragraph, whose value-move sentence already names `--milestone M5`; V03 §2.4; V4 §8; V5 §8; V07 §8), and each such
  citation runs with the landing change's id in V12 §2.8's volume-qualified form — volume 1's M1, M2b, M3a and M5; volume
  3's M2b and M3a for PE, `V3-P0` – `V3-P6`; volume 4's `V4-U0` – `V4-U5` with `V4-U3b`; volume 5's `V5-P0` – `V5-P6`;
  volume 7's `V-M0` – `V-M4` and `V-M2u`. No edit is needed for the rule to hold, the refusal naming the flag; the next
  round of each may add it. Volume 1 already points at the moved-value row (V1-8.1; SCC-90, SCC-92). *Round 6 (SCC-99;
V02, V06 and V11):* the volumes' own register lines write their steps in V12 §2.8's form, and the lint now refuses a due
in any other form — V6 §8's steps E1 – E8 as `V6-E1` – `V6-E8`: a line's exit step in `--milestone`, its `due` as V6 §8 states it (`V6-E7`, or `V6-E8` for E8's lines; seams SCC-108, SCC-109); V11 §8's "at U5" as `V4-U5`, and its
content steps C0 – C8 by the §16 ids of the milestones they are built inside (C0 `M0`, C1 `M1`, C2 `M2b`, C3 and C3b
`M3a`, C4's wall rows `M2b`, C5 `M2b` or `M3b` by its part, C6 `M4`, C7 `M4b`, C8 `M6-U`); V2 §3.10.10's crypt line's
measure as `V4-U3b` and its "at U5" as `V4-U5`. No edit is needed for the rule to hold — the seat writing each entry
writes the id, and the lint names the form; each volume's next round may write the ids in its lines.
* **X-V12-18 — V02, V03, V04, V09, V10 and V11 (reconciliation round 6; no edit needed in any).** (SCC-105; V02, V04 and
  V11) A line naming several stages ("`measure` at M6a …, then `panel` at M6 …, then `corpus` possibility at M-CAL") is
  written as one entry with `stages` in the line's order (V12 §2.6; V12 §3.11's *Staged entries*): V2 §3.10.10's lines,
  V4 §8's rows and V11 §8's measure-then-corpus lines read so as they stand. (SCC-100; V04) V12 §3.11's span-rule line now
  reads `panel` (M4-110) at M4, then T-V4-62's conformance at `V4-U3`, then the V4-U5 panel at `V4-U5`; V4 §8's row may take
  that order and cite V12's line at its next round (no mechanism changes). (SCC-98; V03) V03 §2.4's hand tuning at `V3-P6`
  and its hand fallback are admitted by V12 §3.11's *A value moved by its owning seat before its due*, each recorded by
  `plat calibrate register --defaults --milestone V3-P6`; V03 §2.4 may cite the paragraph. (SCC-103; V03, V11) Rows a later
  step adds to a column (V03's `V3-P1` band rows, V11's C3 rows) take a rows-added cells row by the same command.
  (SCC-107; V09, V10) Their calibrate-later application constants (V09's autosave limits, `raised.previewOnReleaseKm`,
  the deck scenes' export cap and times; V10's T-V10-8 budget row) take no register entry: each provenance note names its
  confirming test.
* **X-V12-19 — V04, V06 and file f (the finalization; seam SCC-110 (d)).** V06: its §8 lines `retaining.settings.stateSnapCm` at E2 on `bar.T-V6-62` and dates every line by its exit step (SCC-108, SCC-111; applied in V6 §8 by the finalization, V06 X49). V04: J-V4.118's span row and BCR-45 may name the cells `raisedWays.structure.span.*` beside the prose keys, the values staying in BCR-45 (SCC-113, left for V04's next lane — the span-rule line here is the entry's home). File f: item 244's slide bound and item 245's snap by their V11 cell names (SCC-114; applied in file f's *Finalization* section).

## 11 Owner questions

Only decisions that are the owner's by rule — money, a new capability across the SettlementForge boundary, product order,
the product's default behaviour. Every other choice is decided above (V12 §9). Until the owner answers, the design runs on
the recommendation marked "default".

| # | question | why it is the owner's | recommendation (the default until ruled) |
|---|---|---|---|
| Q-V12-1 | Buy one month of FTG's premium tier to capture one METROPOLIS for the side-by-sides? | money (D-31 left it as the owner's option) | **No** (default): METROPOLIS stays compared with MFCG size 130, FTG's published metropolis pictures shown as an unscored card; one capture would give one sample, too few for a band |
| Q-V12-2 | Will you sit the seven main sittings — M1, M2b, M4, M5, M6, the village and M-CAL, each up to about 45 minutes — and four short ones (the floor plans about 20 minutes, the underground about 15, the islands about 5, the town histories about 10), and six short items inside the M4 sitting on the new raised ways, terraces, deck buildings and stepped temples (about five minutes), each splittable into three sessions within a week, with never more than one older unrated sitting carried into a new one? | the owner's time decides when "at parity" and "mastered" can be claimed, and when item 110's numbers count as confirmed | **Yes** (default), with §13.6 (7)'s rule unchanged: an unrated sitting never stops the build and never lets a gate be claimed |
| Q-V12-3 | After the historical reconciliation, should each era and region's historical layer become the default look of new towns of that era and region, or ship as a selectable "historical (<era>, <region>)" choice beside today's default? | the product's default behaviour | **The default only where its before-and-after sitting passes, frame by frame** (default): the after side better or the same on realism in two thirds of its pairs and not worse on legibility on every pair of any rung; otherwise selectable, the default unchanged; a town of another era or region never receives it |

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed evidence).** Every base section this volume cites was read at its current text (§1, §6.4,
§7.6, §8.2's palette targets, §11.1's GeoJSON variants, §12.1–§12.2, §12.9, §13.2–§13.9, §14, §16, §17.1, the staged table,
D-2, D-5, D-30, D-31, Appendix A); the quotations and headings of V12 §10 were checked against `docs/ARCHITECTURE.md` by
script (verbatim up to whitespace, each found exactly once; BCR-V12-15's added at this continuation). `H32` as written from the published
algorithm reproduces §13.6's check vectors (1221236157, 3998735106, 1965791931 after reduction, 1819777585, 951122398,
3881605733) and SMHasher's verification value 0xB3ECE62A, and gives V12 §2.4's new check vectors
(`docs/validation/bench/v12_h32_vectors.py` → `.out`). The correlation rule's rates — 0.2 % with no effect, 49 % / 94 % /
99.6 % at planted shifts of 0.5 / 0.8 / 1.0 standard deviations, the sign clause alone 0.33 % exact — and the [min, max]
coverage (n − 1) ÷ (n + 1) = 0.82 at n = 10 were executed (`docs/validation/bench/v12_nullrule.py` → `.out`). The
MFCG facts T-V12-6 holds the product to (cover, walled shares, gates, towers, R4, wall alignment, the sweep's columns) are
the recorded, re-run measurements of `captures/mfcg/exports-2026-09-25/README.md`,
`captures/mfcg/exports-sweep-2026-09-25/README.md` and `docs/validation/bench/README.md` (their Fable reviews B05, B20 and
B21). The corpus's laws are `partitioned/README.md`'s, read whole; no corpus file was opened. The tendency rules' rates
of V12 §3.6b — `most`, `floor`, `rate`, `presence`, `trend`, `higherWith` — were executed
(`docs/validation/bench/v12_sweeprule.py` → `.out`, seeded; a re-run reproduced the first run's numbers). The MFCG
coastal ring facts (24 of the ring's non-gate, non-castle vertices on the coastline; 20 towers by the chain rule) are
the exports README's review note 2, whose arithmetic is CONFIRMED there. File g items 102–109 and the owner's words of
2026-09-28 (`docs/OWNER-INSTRUCTIONS-2026-09-25.md`, J98–J110) were read whole; the sittings the volumes name were read at
V03 §8 (P6), V04 §7, V05 §7 and V06 §12.

**PLAUSIBLE (reasoning, to be measured).** Every budget of V12 §6 until the milestone named beside it; every estimate of
V12 §8; the ten-seed choice's adequacy (spike S-V12-1); the derived street graph's stability on MFCG's lot outlines
(spike S-V12-2); the thresholds of the metric definitions (the 2 m node merge, the 8 m spur prune, the 1.0 m cluster gap,
the 3 m closing, the 1.5 × deep-block rule, the 10° wall-node turn) — our own measurement parameters, fixed in each
metric's definition, where a change is a major metric version (V12 §3.4.3); that FTG's server build can be pinned by capture date; that the
corpus holds enough surveyed maps for frames of 20 (risk 7); and every value of the correlation rule's defaults beyond
its executed simulation (real placements may differ from the planted normal shifts; spike S-V12-4). Also PLAUSIBLE: the
tendency rules' behaviour on real towns, since the simulations treat instances as independent and towns of one level as
alike (risk 9); the distinctness thresholds (1.5, 0.15, 10°), the structure separation and the no-regression tolerance —
our own §13.7 values; the two MFCG shore-end towers (not pixel-checked in the README); that every fixture level item
109's bars need can be set as a frozen S1 output or a dossier or declaration input (risk 10); the durations of the four
short sittings; and the budgets of the new bars (V12 §6).

**Added by the revision (volumes/revise-V12, 2026-09-29).** *CONFIRMED:* the critique's receipts re-run byte-identical in
this lane — `critique_v12_nullrule_discrete`, `critique_v12_nullrule_rank_power`, `critique_v12_pooled_exact` and
`v12_rev_clustered` (`.py` → `.out`); the rank rule's null rates (0.000 – 0.005) and powers, the pooled exact test's size
(0.002 – 0.015) and powers, and the effective-instance and deep-void rates of V12 §3.6b are theirs. New receipts, seeded, our
own code: `docs/validation/bench/v12_rev_confirm.py` → `.out` (the confirmation stage: 0.0015 fallbacks per bar at a real
0.8-standard-deviation effect, 0.06 over 40 bars; `most` on effective instances: 0.55 → 0.9 %, 0.60 → 8 %, 0.75 → 97 % at
ρ = 0.3); `v12_rev_h32.out` (the check vectors of `known/K1`, `known/K2`, the TOWN guard, the `c1` family, `T110b.*` and the
catacomb sweep, with SMHasher's 0xB3ECE62A and the base's `d5` vectors 1221236157 and 1965791931 reproducing);
`v12_rev_item110_grep.out` (0 of 48 research inputs mention retaining walls, viaducts, aqueducts, elevated or raised roads,
deck plots or houses on a bridge). V12 §10's 12 section headings and 34 quotations were each found exactly once in
`docs/ARCHITECTURE.md` (md5 01fea21f…) by script, BCR-V12-16 – BCR-V12-22 included. Read at source: V04 §2.2's
`CatacombComplex` and §2.3's `CatacombRule` (the column names the register keeps), V06's J-V6.53 (the per-year growth cap)
and §3.19.1 (the dossier declares no arches; the guards' definitions), V11 §3.5.8's crypt column and `crypt.rankShare`,
V11's T-V11-12 – T-V11-22, V04's T-V4-43 – T-V4-70, V06's T-V6-34 – T-V6-65, V09 §7.2's fixture drafts, §8.2's palette
bands (paper luma 226 – 244, warmth 20 – 50, darkest ink ≤ 45, plate chroma 18 – 70; ink warmth and `ink`'s chroma `own`),
§1.1's CITY default of 20 000, §13.3's `ShiftRecord.cause` (the `feature` kind exists), §13.6 (9)'s `D5Record` and §13.3's
`MilestoneRecord` as quoted, §17.1 (4)'s three d5 files and (8)'s method list, file g item 110 whole.
*PLAUSIBLE:* every item-110 threshold and count of this volume (K2's ≥ 8 jetties and ≥ 4 with deck buildings, the 2 %
straightness, the 1 m anchoring, the 20 % mid-mole tolerance, the 1 ha islet, the 30 TOWN guard towns, 100 and 200 towns per
raised-way level) — ours, to be kept or replaced with a stated reason; the item-110 budgets and the +2.25 – 3.5 pw the
revision adds; that real towns' clustering resembles the simulated beta-binomial town effect (the design-effect correction
estimates ρ per bar, so a different structure changes the effective count, not the rule); that the confirmation stage's
family-wise rate holds when bars are correlated (the simulation treats them as independent); that a ravine forcing site
always exists on which the detour loses (registration refuses a site where it does not); the default rules of V12 §3.4.2
(our own measurement parameters, a change being a major metric version); and the M4-110 group's five minutes.

*Reconciliation round 1 (volumes/reconcile-V12-r1).* CONFIRMED by reading: file f item 447's export text and J-VI.3's six
barrier kinds (the profile of V12 §2.2 follows them); V11 §2.3's `CoverageSpec` and its units at a plot, and T-V11-13's
and T-V11-18's wording (`servedShare`); V11 §2.2's `sf:⟨file⟩@⟨baseline⟩` grammar and file f item 534; V11 §3.3.5, §3.17.1,
§3.18, §3.19.1, §3.20.3, §3.23 and §3.24's cells and stated fallbacks, V04 §2.3's four `under.*` schemas and V11 §8's
register at every exit (the register lines of V12 §3.11); V02 §3.10.8's FM calibration run at M6c and V07's V-M4 tuning
(rule (3); since round 4 read as V07's one measured-rate entry, `rules.race.densityPower@VG`, SCC-80). *PLAUSIBLE:* the column lists follow V11's and V04's text, not a compiled `ColumnSpec` (none exists yet), hence
each line's catch-all "every other calibratable column"; that V04's ruin element records carry their persistence class
and that the levelling stage reports `W_STEEP_RAMP` per crossing, as `ruin.survival` and `crossing.kinds` read them; that
the households-form reading of a church's parish coverage (J-V12.59) lets T-V11-13 see a real pull.

*Reconciliation round 2 (volumes/reconcile-V12-r2).* CONFIRMED by reading: V11 §3.24.0's switch table (five rows, the
stepped family's off form every `chance` 0) against V12 §3.7.8 (1) and V12 §2.13; V02 T-V2-31's table (nine rows) and its
plan-extent clause (SP-V2-4) against the `fm.*` row; V11 §8's C1 and C3b rows (the era and culture factors at C3b, the
climate rows at C1) and its register at every exit against V12 §3.11. No mechanism moved; the three edits are citations.

*Reconciliation round 3 (volumes/reconcile-V12-r3).* CONFIRMED by reading: file f items 291 (BCR-V6-26, STAGED M6-E), 447
(a retaining wall exported as one LineString per run of equal state, with `wall`, `run` and the run's `stepMinCm` and
`stepMaxCm`) and 575 (§11.1's wall LineStrings split per run of equal condition; a `StretchRef` is never stored); §11.1's
GeoJSON row (a feature's `id` is its entity's address); V11 §3.18's structures block (four cells, no rate) and V11 §8's C3b
row; V06 §8's register lines (`bar.T-V6-<n>`, E2 writing the base persistence cells, their second value) and X38; V02
§3.10.8 and §3.10.10 (the FM measured-rate list, `hipInset` 0.5, `bar.T-V2-<n>`), SP-V2-3 and X33; V11 §2.2's preset
entries (`fixed:` off values, no register entry), §3.24.1's `enabled` `calibratable: false` and §8's non-g lines
(`bar.<id>`, `frame.<table>.<column>`; V11's round 3, re-read at its landed md5 3679161b…); V07 §3.15 (no VG-entry
fallback stated). *PLAUSIBLE:* that item 575's per-run wall features keep their enceinte's address as `id` — item 575 names
no per-run id, and the reading follows §11.1 and the unstored `StretchRef`; T-V12-4's runs clause catches the other reading
at M4, and the pre-decided fallback is a base change request giving each run `wall` (its enceinte's id) and `run`, as item
447's retaining runs carry; that every bar the register lines name has a scalar or per-clause verdict statistic its owner
can register.

*Reconciliation round 4 (volumes/reconcile-V12-r4).* CONFIRMED by reading: V11's registry rows 14–15, 17, 19, 24 and
33–37 and V11 §2.3–§2.5, §3.7.4 (the `siting.web` cells `relaxPasses`, `relaxGain`, `splitThreshold`, `reverseShare`,
`valuableSecurity`, the two switches non-calibratable) and §3.16 (the thickness · height and tower-spacing factors), and
V11 §8's non-g lines (none binds a row-19, row-33–37 or row-14–15 column, and their "every other calibratable class
column" leaves out the row-17 `profile` columns the items 103–107 line names), all at V11's landed md5 4e445f05…; V07 §2.2a,
§3.15 and §8's V-M4 row (`rules.race.densityPower`, its one measured-rate `VG` entry, method `tune`, fallback
`not-achieved`); V2 §3.10.10's stepped line (`measure` at M3a-V2, `panel` at M4 and M6, `tier.count`, `bar.T-V2-46`) and
its "exactly one line" rule; V11 §3.6.4's `stepped-shrine` row. *PLAUSIBLE:* that no other register line (V6 §8, V2
§3.10.10) names a column of rows 14–15, 17's `profile`, 19 or 33–37 — the lint's one-knob-one-entry check finds any at C2's
and C4's exits; that the "no run when the metric holds" clause of `tune` is wanted only where an owner states it (V07).

*Reconciliation round 2's continuation (volumes/reconcile-V12-r2, re-issued brief).* CONFIRMED by reading, in the live
text at this lane's start: V01, V04, V05, V07, V08 and V10 cite V12 §3.11 nowhere and run no register check at any exit
(0 hits each for "V12 §3.11" and for "register --check"; V01 7ba65e0b…, V04 7d89f86a…, V05 5bc1289c…, V07 91b15f53…, V08
87563a6d…, V10 39402af9…); V11 §2.1's `TableSchema.rowsHome` ("the document section that writes the rows") and
`ColumnSpec.calibratable`, which the default line reads (V11 79d485df…); the three spellings of the no-preset arm — V6 §8
`'default'` (V06 22519528…), V2 §3.10.10 "no parity preset" with no value (V02 bd45a3b4…), V11 §8's T16-4 and T-V11-30
registrations naming none. SCC-35, SCC-41 and SCC-48 were re-verified present (V12 §3.7.8 (1), the `fm.*` row, §3.11's
C3b sentence). *PLAUSIBLE:* that the corpus stage can target the default line's columns — a column no frame's run
targets closes `fixed` by the line's own fallback, so an unmeasurable column still closes; that `rowsHome` names the
volume whose values a default-line column holds for every table (a later named line corrects `owner` in its restatement).

*Reconciliation round 3's continuation (volumes/reconcile-V12-r3, re-issued brief).* CONFIRMED by reading, in the live
text at this lane's start and again before writing: V11 §2.1 ships every registry row from C0 as its schema's empty table
until its rows-home milestone (J-V11.84) and V11 §3.2.1 step 1's source manifest lists every source file's path and author
seat; registry rows 38 (`roomProgram`, "V03; §2.6") and 56 (`islands`, "II.6, V05") name two homes; every column of rows
63–66 and 77 (J-V11.65) and of rows 86–89 (J-V11.81) is `calibratable: false` (V11 114e8a52… at the start, 3e69492e… at
the check, its round-3 lane live); V08 §2.6's header now gives every dossier row-set cell `calibratable: false` (J-V8.107;
V08 594909a3…); V03 §2.4 writes `roomProgram.json`'s register lines and registers T-V3-35 as a `BenchBarDef` (J-V3.118;
V03 e83ffac3…); V01, V03, V04, V05 and V07 now carry the register check in their §8 exits (four, five, eleven, five and seven hits
for "register --check"; V01 925e51b5…, V04 fed9e0c2…, V05 a60dbcc9…, V07 fc27986f…); the base's parity row reads
`preset?: string` (§13.5); V4 §8's due steps put the `under.openings` and `under.dig` measures at U3b (T-V4-49, T-V4-54)
and `sourceWeight` at U4 (T-V4-58), and T-V4-62 is the arch-vault bar of the span-rule line; the five issues of this
lane's 06:35 landing (SCC-54, SCC-56, SCC-60, SCC-61, SCC-68) are present by their anchors. *PLAUSIBLE:* that each
author seat the source manifest names belongs to exactly one design document (a volume's or the base's milestone seat),
so the owner rule of J-V12.73 always yields one value; that the empty-table rule leaves no column holding cells without a
default or named entry at any exit — the lint's per-cell check at PR tier finds any.

*Reconciliation round 4's continuation (volumes/reconcile-V12-r4, re-issued brief).* CONFIRMED by reading, in the live
text at this lane's start: M-CAL opens after M4, M5, M6 and V-M4 and the layers and evolution join by later runs (V12
§3.10.1, J-V12.21); V4 §8's due steps and J-V4.117 read "the underground's later corpus run" in words, awaiting this
volume's id (V04 87f5ce61…); V5 §13 item 29 asks exactly this half (V05 a60dbcc9…); V06 names M-CAL nowhere (0 hits;
V06 ba61b240…); V11 §2.2 types `PresetId` with `'NG'` (V11 ddcee9c6…, its round-4 continuation live); V01 states `NG` as
a zeroing parity preset with no provisional entry, so no `…@NG` id is needed on its account (V1-3.15, J-V1.98, its
cross-volume note (34); V01 cbbfe6e8…); file f item 497's note already names `'NG'` and item 584 carries BCR-46 (file f
0da3c86c…); V1-8.1, V03 §2.4 and §8, V4 §8, V5 §8 and V07 §8 carry the register clause, and J-V1.97, J-V4.117, J-V5.80
and J-V7.124 choose no line of their own; V2 §3.10.10 writes `preset 'default'` (J-V2.105 (c)); V11 §8's two
registrations write it. The five issues of this lane's 07:41 landing were re-verified present by their anchors.
*PLAUSIBLE:* that the later runs' opening on the owner's word is wanted as M-CAL's is (should the owner prefer them to
open without a word once M-CAL is open, V12 §3.10.1 changes in one sentence); that a staged layer's last milestone (M6-U,
M6-sky, M6-E) is where its run belongs, rather than each step; that volume 7's V-M2u lands only underground cells, so its
columns belong to `M-CAL/under`.

*Reconciliation round 5 (volumes/reconcile-V12-r5).* CONFIRMED by reading, in the live text at this lane's start: V1-8.1's
register paragraph tunes `land.spineFactor`, `land.ringSlack`, `land.smallShare`, `terrace.askGain`, `terrace.siteShare`,
`ng.plazaM2` and S7c's `select.*` weights "inside the work items that land them, before M5's exit" (W3, W16, S-V1-b,
W18, W17 — the items that build their readers; the seam finding: no reader before M5 — withdrawn at round 6 for
`terrace.siteShare`, which `terraceState` reads from M3a, SCC-102; PLAUSIBLE below), keeps those
bars "this volume's acceptance bars (V1-7), never register metrics", and already cites this volume's *A value moved by
its owning seat before its due* with `--milestone M5` (V01 15a69be1…, its round 5 landed 12:40); V03 §2.4, V4 §8, V5 §8
and V07 §8 cite `plat calibrate register --defaults` without the flag (V03 e60491e3…, V04 27bdbbd7…, V05 5d0a101c…,
V07 5936d05e…); V03's and V05's build plans both name their steps P0 – P6 (V03's PE besides), V04's U0 – U5 with U3b,
V06's E0 – E8, V07's V-M0 – V-M4 with V-M2u; `docs/ARCHITECTURE.md` names M6, M6-U, M6-sky, M6-E and M6-P (48, 82, 46,
33 and 47 hits) and file f M6a – M6c; V12 §3.10.3 R1 ships every corpus change as a historical pack, so a closed default entry's
compiled cells stay as its last cells row holds them. *PLAUSIBLE:* that the PR-tier golden check tells a digest moved by
a value alone from one a same-change reader landing shifts under its feature's declared shift (volume 1's case lands the
value with its reader, so the question does not arise there); that no volume other than volume 1 moves a default-line
value before its due (the check fails any that does without the row).

*Reconciliation round 6 (volumes/reconcile-V12-r6).* CONFIRMED by reading, in the live text at this lane's start: V03
§2.4's register lines are `measure` at `V3-P6` after P6's tuning with a hand fallback, and T-V3-35's `BenchBarDef` has
`stages` `[]` so V12 §3.7.2 (4) admits no run through it (V03 eb01b7dc…); V11 §8's *where in §16* column builds C0 in M0,
C1 M1, C2 M2b, C3 and C3b M3a, C4's wall rows M2b, C5 M2b and M3b, C6 M4, C7 M4b, C8 M6-U (V11 82411ec1…); file f items
244 and 290 are BASE (M3a) for the raised-way record, the span rule and generation (file f 839ccce5…); V4 §8's span row
reads T-V4-62 at U3 then the M4-110 and V4-U5 panels, and U3b is its access step (V04 9cae4284…); V2 §3.10.10's crypt line
reads "from the landing of volume 4's access draw" and "at U5" (V02 65e5ea63…); V06's E5 line holds T-V6-12 and E1 – E8
are its steps (V06 412a7418…); V05's P1 exit runs T-V5-19 (V05 663afd43…); V01's `terraceState` reads
`terrace.siteShare` and lands at M3a for the base's district-edge source (V1-8.1, BCR-42; V01 85b488b3…); §16 orders M-1
… M5, and `_integrate`'s product-order questions leave M4b, M5 and the staged rows unruled among themselves (`_integrate`
965ab696…); V09's `raised.previewOnReleaseKm` is calibrate-later by T-V9-3 and V10's budget row by T-V10-8. *PLAUSIBLE:*
that `terrace.siteShare`'s M5 tuning moves no committed digest — where it does, the tuning is held (pre-decided, V12
§3.11 (1)); that the staged-entry rules, the rows-added row and the extended check behave as written — no fixture has run
(T-V12-20 runs from M1); that no line other than item 102's spans two unordered rows; that every legitimate move of a
named entry's cells already writes a cells row (a run by V12 §3.7.6 step 5, a restating line, the command), so the check's
extension to named entries catches only moves outside a line's method.

## 13 Fix list

Nothing is deliberately left for later. Every finding of `docs/volumes/critique/V12.md` (V12C-01 – V12C-50) is fixed in this
volume; four were fixed with a stated variation that follows the sibling volumes as they landed, each a vetoable
decision: V12C-50 (3) and V12C-40 (1)'s `source: 'dossier'` were not adopted, because the landed V06 design has the dossier
declare no arches (its water-system record is a factor on the aqueduct's chance, so a dossier-bound aqueduct is generated;
J-V12.55); V12C-37 (1)'s new boolean per family and "never a user control" became V11's landed switch table (one in-range
off form per row set, which is also the parity-neutral default) with the cells editable like any cell (J-V12.43,
J-V12.56); V12C-35 (1)'s THORP – TOWN owner cells became V11's schema-level rung gate (no `raisedWays` row below CITY), and
its range minima became owner-stamped **calibration** minima binding runs, fallbacks and corpus packs but not the parity
presets' extension zeros, a pin's overlay or a user's edit (J-V12.42) — V11 landed the raised family's off form as chances
of 0. The cross-lane work this volume needs from others is listed as X-V12-1 – X-V12-14 (V12 §10) for their revisions or
volumes/_integrate.

**Reconciliation round 1 — the base-change lane's edits in this volume** (volumes/reconcile-BASE-F-r1, 2026-09-29). ST-06:
`MeasureInput.source` takes the derived values `generated` and `declared` (file f items 244, 447); `foundedRung` is read on the
model side only and leaves T-V12-4's export list; J-V12.55 notes the amendment.

**Reconciliation round 1 — this volume's seam issues** (volumes/reconcile-V12-r1, 2026-09-29; against
`docs/volumes/critique/seam-content-calibration-r0.md`; all eight fixed, nothing left for later). **SCC-03:** V12 §2.2's
profile follows file f item 447 — `FeatureKind 'aqueduct'` dropped (an aqueduct is a `way` of class `aqueduct`, mapped
into no traffic class and read by no way graph, V12 §3.4.2's reading rules), `span` added (read by no metric), `stepCm`
replaced by `stepMinCm` and `stepMaxCm`, `foundedRung` dropped (`raised.generatedBelowCity` reads the founding epoch's
record), the closure class J-VI.3's six kinds, `raisedKind` on the way only, one drop-on-read rule for 447's undeclared
properties; the stage defaults, the wiring rows, T-V12-4 and T-V12-38 (an arched aqueduct over two streets, spans deleted)
cite 447; BCR-V12-17 points to 447 (J-V12.62). **SCC-04:** `servedShare` reads the subject class's compiled coverage unit
(V11 §2.3) with a `unit: 'district'` override for item 105 (k)'s dispersal row; registration refuses a multi-class,
row-less or `settlement`-unit spec; the bar map's 103 (f), 105 (k) and 107 (g) rows and V12 §3.12's refusal row cite it
(J-V12.59, J-V12.60). **SCC-05:** every `ref:SettlementForge` became the provenance source `sf:` (V11 §2.2, BCR-V11-21) in
V12 §3.7.2 (2), V12 §3.11's item-108 row and lint, T-V12-9 and J-V12.36. **SCC-07, SCC-15:** V12 §3.11's item-109,
item-109 (k) and item-110 rows became a column table — one `target.column` entry per calibratable column of
`under.ruin`, `under.openings`, `under.dig`, `under.catacomb`, the cavern rows, `terrace` (with IN-V11-2's three cells and
`terracedEdges`), `retaining`, `raisedWays` (rows, `settings`, `structure`), `ways.crossing`, `deck`, `deck.landmarks`,
`roster.specialisations`, `water`, `climate.rainMmPerYear`, `era` and the culture `building` block, `decline`'s structures
block, the stepped tiers and V04's span-rule constants — each with owner, method, due, metric and fallback (V11's where it
states one), the panel rule (J-V12.61) and three new descriptive metrics (`crossing.kinds`, `water.needRatio`,
`ruin.survival`; J-V12.64); the `CatacombRule` values, the decline rows and `w_sun` owned by V11, `w_sun`'s fallback V11
§3.3.5's, its metric `shade.gap`. **SCC-26:** rule (3) admits a `presets.FM` or `presets.VG` entry only in a `reference` run
against that preset's own reference (`layer: { preset }`, V12 §2.5; emission step 1), and T-V12-9, T-V12-24 and J-V12.11
follow (J-V12.63). **SCC-24:** `cavernChance` reads the S1 relief and geology rows (row 9) and `under.systems`' cavern row
(row 59) with V11's `miningCellShare`. **SCC-27:** X-V12-3 reads "the town's fabric above the ruin". The V12 halves of
V11's SCC-06, SCC-08, SCC-09, SCC-25 and SS-13 were applied by volumes/reconcile-V11-r1 (its round 1 notes in the lines
they touch) and are kept.

**Reconciliation round 2 — this volume's seam issues** (volumes/reconcile-V12-r2, 2026-09-29; against
`docs/volumes/critique/seam-content-calibration-r1.md`; all three fixed, nothing left for later). **SCC-35:** V12 §3.7.8 (1)
no longer lists the off values; it names V11 §3.24.0's five row sets and cites that table as the one statement of each off
form (the stepped family's is every `roster.specialisations` `chance` 0, as V12 §2.13's overlay already wrote), so the
residue of round 0's SCC-25 is gone. **SCC-41:** V12 §3.4.2's `fm.*` row reads one metric per row of V02 T-V2-31 and its
plan-extent clause, as V02 states them — path segments in place of "ranges", and the square-tower and half-round-porch
shares that the `FM` cells `towerShape` and `halfRound` are tuned to (V2 §3.10.8) now included. **SCC-48:** V12 §3.11's
entry-writing sentence gives the era's and the culture's item-110 factors (`aqueductM`, `raisedVaultM`, the culture
`building` block) to V11's C3b at M3a and `climate` to C1, as V11 §8 lands them. The V12 halves of V11's round-2 SCC-30
(V12 §3.11's `decline` line) and SCC-34 (`NoRegressionSpec.off`, the noRegression prose, the bar map's 105 (k) row), applied by
volumes/reconcile-V11-r2 and marked "V11's round 2", are kept.

**Reconciliation round 3 — this volume's seam issues** (volumes/reconcile-V12-r3, 2026-09-29; against
`docs/volumes/critique/seam-content-calibration-r2.md`; all five fixed, nothing left for later). **SCC-56:** V12 §2.1 gains
the generated metric families `bar.<barId>` (the verdict statistic of one registered owner bar — a `StatBarSpec`, a
`NullModelSpec`, or the new `BenchBarDef` an owner registers for any other bar its lines name) and `frame.<table>.<column>`
(a declared frame's value for one calibratable column, `notApplicable` until M-CAL), each with a V12 §3.4.2 row, a §1b
row and a lifecycle row; `CalibrationEntry.metric` is a list; the items 103–107 line reads "`siting.<spec>` and
`bar.<barId>` of the bar map's rows; `frame.*`", the item-102 line `bar.T-V11-30`; the lint resolves family members; the
milestone exit's history row and status move from the bars' verdicts; T-V12-20's clauses; X-V12-15 asks the owners to
register their bench bars (J-V12.65). **SCC-54:** V12 §3.11's `decline` line is split — V11 §3.18's four structure cells,
owner V11, at C3b; the base decline table's persistence cells `raised` and `retaining`, owner `base`, written by the seat
landing V06's E2 at M6-E where BCR-V6-26 lands, with V06 §8's second value — and the entry-writing sentence adds "a base
cell a volume's base change request adds: by the seat landing that request" (J-V12.66). **SCC-60:** V12 §2.5's `layer`
comment and V12 §3.7.2 (3) admit a preset entry that a register entry names in a `reference` run against its preset's
reference or a `fallback` run applying that entry's own pre-decided fallback (V02 §3.10.8's `hipInset` 0.5); a preset entry
no entry names (code-read, `fixed:`) is never a run's cell; the register target gains `preset` (ids `…@FM`, `…@VG`); §3.11's
column sentence, T-V12-9, T-V12-24, J-V12.11 and J-V12.63 follow (J-V12.67). **SCC-61:** V12 §2.2 merges per-run exports on
read — a retaining wall's runs by `wall` in `run` order with the step bounds over its runs, an enceinte's condition runs by
its `id` into built stretches — `wall`, `run`, `state` and `condition` dropped, `measureInputOf` writing one feature per
retaining wall and per built stretch; V12 §3.4.2's preamble and T-V12-4 (a runs clause from M4) cite it (J-V12.68).
**SCC-68:** the `terrace` `enabled` register line is dropped (the switch is not calibratable, V11 §3.24.1; the terrace
line notes it); §1b's column-entry row names V02's M3a-V2, M6a – M6c seats, V06's E1 – E8 seats and the seat landing a
base change request as producers. **Also, in passing:** V12 §3.10.5's corpus layer reads `{ pack: 'historical:<frame>' }`,
as V12 §2.5 and R1 type it (it read `preset`). The halves of this round's sibling findings were already landed by their
owners and are read, not re-applied: V06's SCC-55 and SCC-57 (V6 §8), V02's SCC-58 and SCC-59 (V2 §3.10.10), V11's SCC-67
and SCC-72 (V11 §3.24.1, §8).

**Reconciliation round 4 — this volume's seam issues** (volumes/reconcile-V12-r4, 2026-09-29; against
`docs/volumes/critique/seam-content-calibration-r3.md`; all five fixed, nothing left for later). **SCC-76:** V12 §3.11's
*File g's rows by column family* paragraph states the catch-all rule once — a line ending "and every other calibratable
column" binds every calibratable column of the tables or columns it names that no other register line names, each its own
entry with that line's method, metric and fallback — and the items 109–110 paragraph cites it; the items 103–107 line ends
"…, and every other calibratable column of the tables and columns items 103–107 add" (registry rows 33–37, row 19's goods
columns, row 17's `profile` columns, row 24's `coverage.rosterWeight`), its metric cell naming the item's bar rows and the
column's own `frame.<table>.<column>`; the item-106 line ends "…, and every other calibratable column of `walls.barriers` and
`walls.waterfront`" (rows 14–15), its metric cell `wall.barrierShare`, `walled.share` and `frame.*`; T-V12-20 gains the
clause (J-V12.69). **SCC-80:** V12 §3.7.1 (c), §3.7.2 (3), J-V12.11 and J-V12.63 and §12's round-1 paragraph name V07's one
measured-rate `VG` entry, `rules.race.densityPower@VG` (V07 §2.2a, §3.15), opened at V-M4 only when T-V7-23's
accepted-share row misses its band; every other `VG` entry is code-read or `fixed:`; the `VG` fallback clause reads "none —
that entry falls to `not-achieved`". **SCC-81:** the stepped line binds V11's `stepped-shrine` heights row alone, owner
V11; V02's stepped compositions take V2 §3.10.10's stepped line. **SCC-82:** V12 §2.6's `method` comment defines each value,
`'tune'` as a `reference` run against the entry's own reference when it falls due (V07's no-run confirmation where its
owner states it); the column sentence maps a line's method cell onto `method`, a `reference` run writing `'tune'`
(J-V12.70). **SCC-83:** the milestone-exit rule reads a `frame.*` metric only at M-CAL — not read at an earlier exit, never
holding the entry back, its history row appended at M-CAL — and an entry of `frame.*` metrics alone is due at M-CAL
(J-V12.70). No mechanism outside the register moved; no base change request, owner question or cross-lane request was
added.

**Reconciliation round 2, continuation — the re-issued brief** (volumes/reconcile-V12-r2, 2026-09-29 ~09:30; against
`docs/volumes/critique/seam-content-calibration-r1.md` §7; both new findings fixed, nothing left for later). The three
issues of this lane's 05:09 landing (SCC-35, SCC-41, SCC-48) were re-verified in the live text and not redone.
**SCC-R1C-2 (major):** V12 §3.11 gains *the default line* — every calibratable column of a registry table that no
register line names (this section's with the catch-all, V11 §8's non-g lines, V2 §3.10.10's, V6 §8's, V07's `VG` entry,
or a volume's own line in V2 §3.10.10's form) takes one entry `cal.<table>.*.<column>`, `corpus` at M-CAL, metric
[`frame.<table>.<column>`], fallback "closes `fixed` with 'no admissible frame'", owner the volume its table's `rowsHome`
names, marked `line: 'default'`, written by the new `plat calibrate register --defaults` in the change that lands the
column; a later line in V2 §3.10.10's form restates the entry in place (never a second entry). `CalibrationEntry` gains
`line?: 'default'` (V12 §2.6); the item-102 line's shade cells and the V04 row read the default line; the lint names
`--defaults` for an uncovered cell and holds a default entry to the line; the milestone exits add "every volume's landing
exits green"; T-V12-20 gains the clause; §1b's register row, §2.11's lifecycle row, §4.2's verbs, §5.2's register report,
§5.5's reconciliation report (columns closed "no admissible frame" by volume) and §8's W2 carry the command; X-V12-16 asks
V01, V04, V05, V07, V08 and V10 to write the exit clause in their §8 (J-V12.71). **SCC-R1C-5 (minor):** V12 §2.1 types the
recipe arm once, `PresetArm = 'default' | PresetId` (V11 §2.2), `'default'` the recipe with no parity preset;
`BenchBarDef.towns.settings[].preset` and, as a same-shape sweep, the five other bare `preset: string` fields of V12 §2
(a tuning run's targets and seeds, `NullModelSpec.seeds`, a sweep `Level`, `PanelGroup`) take it; V12 §3.5 step 3 and §6's
B-REF row name the arm `'default'`; X-V12-15 asks V02 and V11 to write `preset: 'default'` in their registrations (V06
already does) (J-V12.72). The halves in other volumes are theirs to write (X-V12-15, X-V12-16); V12's text is complete
without them — the default line binds their columns and T-V12-20 holds each landing change to it.


**Reconciliation round 3, continuation — the re-issued brief** (volumes/reconcile-V12-r3, 2026-09-29 ~10:45; against
`docs/volumes/critique/seam-content-calibration-r2.md` §7; all three new findings fixed, nothing left for later). The five
issues of this lane's 06:35 landing (SCC-54, SCC-56, SCC-60, SCC-61, SCC-68) were re-verified in the live text by their
anchors and not redone. **SCC-R2C-4 (minor):** V12 §3.11's default line no longer lists volume 8's §2.6 values or volume
10's §2.10 rows among the cells it binds — volume 8's dossier row sets and volume 9's and volume 10's tables take none,
every column of V11 §3.1 rows 63–66 and 86–89 being `calibratable: false` — and lists volume 3's `roomProgram.json`
columns its §2.4 lines leave; the line's list of named lines admits a line written beside its table (V03 §2.4);
X-V12-16 addresses V01, V03, V04, V05 and V07, its V08 and V10 clauses replaced by "(volume 8's dossier row sets and
volume 10's tables are not calibratable: V11 §3.1 rows 63–66 and 88–89)"; X-V12-15, §1b's `BenchBarDef` row and
V12 §2.1's comment add V03's T-V3-35; J-V12.71 amended. **SCC-R2C-5 (minor):** (a) `plat calibrate register --defaults`
writes an entry only for a calibratable column that holds at least one compiled cell, so a column of an empty table (V11
§2.1) takes none until the change that ships its first row — T-V12-20's clause, §2.11's lifecycle row and §4.2's verb
follow; (b) a default entry's `owner` is the document whose source file holds the column's cells (the source manifest's
author seat, V11 §3.2.1 step 1), the first the table's `rowsHome` names where two documents write them, never moved by a
later writer, and the lint holds `owner` to a document writing the column's cells (J-V12.73). **SCC-R2C-6 (minor):**
BCR-V12-2's new text gives the report row a required `preset: 'default' | 'MFCG' | 'FTG' | 'VG' | 'FM'` (V12 §2.1's
`PresetArm`), the base's `preset?: string` retired; file f item 497 gains the note naming the change, a shared-file edit
logged in `docs/lane-events.log` (J-V12.74). **Also, in passing** (volumes/reconcile-V04-r3's 10:27 note and
volumes/reconcile-V08-r3's 10:42 note, each checked against the live text): the `under.openings` chance line is due at
U3b and the `sourceWeight` line at U4, the steps whose exits run their bars (V4 §8's due steps); the `under.ruin` V04-cells
line no longer cites T-V4-62, the span-rule line's bar; the `raisedWays` settings line names
`elevated.landmarkMinSignificance` (V11 §3.24.2, SCC-R2C-10), which its catch-all already bound. No mechanism outside the
register and the parity row's type moved; no owner question was added.

**Reconciliation round 4, continuation — the re-issued brief** (volumes/reconcile-V12-r4, 2026-09-29 ~11:50; against
`docs/volumes/critique/seam-content-calibration-r3.md` §6.2; all three new findings fixed, nothing left for later). The
five issues of this lane's 07:41 landing (SCC-76, SCC-80, SCC-81, SCC-82, SCC-83) were re-verified in the live text by
their anchors and not redone. **SCC-R3C-1 (major):** V12 §3.11's default line reads "`due` M-CAL — or, for a column whose
first compiled cell lands after M-CAL's `ReconciliationRecord` is committed, the later run of the corpus process that
takes its layer (V12 §3.10.1), `M-CAL/<layer>`", written by `plat calibrate register --defaults --milestone <id>` from
the landing change's milestone through the new paragraph *The due's corpus run* and its table (the underground's
milestones → `M-CAL/under`, the sky's → `M-CAL/sky`, the evolution engine's → `M-CAL/evolution`, any other →
`M-CAL/<its id>`), each entry's first history row naming that milestone; the same substitution holds on a named line's M-CAL
stage; V12 §2.9 types `CorpusRunId`, the record's id and `panel` (null for a later run that moved no cell) and its file
name; V12 §2.6's `due` and `method` comments, §2.8's panel ids, §2.1's `frame.*` family and the seed-label row admit the
form; V12 §3.10.1's parenthetical reads as the finding requires ("V06's lines carry no corpus stage, V6 §8") and a new
paragraph defines the later run (the owner's word as for M-CAL, M-CAL's frames, V12 §3.10.3 – §3.10.6 unchanged, a sitting
only when a cell moved, its own `MilestoneRecord`); the lint's default-entry due clause and its `frame.*`-only clause accept
`M-CAL/<layer>` for such a column and fail a default entry due `M-CAL` still provisional after M-CAL's record; the V04 row,
the status rule, §1b, §2.11, §4.2, §4.3, §5.5, §8.1 and §8.2 (a new row, 0.25–0.75 pw per later run, staged) follow;
T-V12-20 gains the clause; X-V12-17 tells V04, V05 and V06 (V5 §13 item 29 met; V04's words may cite `M-CAL/under`);
J-V12.75, J-V12.21 amended. **SCC-R3C-6 (minor):** `NG` wherever this volume spells the presets out — §2.1's
`PresetArm` comment, §2.5's `layer`, §2.6's `…@NG` suffix, both `target.preset` unions and the one-knob rule, V12 §3.5
step 3 (each P row under its reference's own preset: `MFCG`, `FTG`, `NG` for T-V1-31, `VG` for T-V7-23, `FM` for V02's
`fm.*` rows), V12 §3.7.2 (3) (no `NG` run exists: every `NG` entry is code-read or a switch's on value), §3.4's item-110
paragraph (`NG` resolves the families off as `MFCG`), §3.9.1's M5 row (`preset: 'NG'`), T-V12-9, T-V12-24 and BCR-V12-2's
union; file f item 497's note already reads `'NG'` (the base-change lane's edit, not repeated); J-V12.76, J-V12.72 and
J-V12.74 amended. **SCC-R3C-12 (minor):** X-V12-16 is marked met, naming each volume's paragraph (V1-8.1's *The register
at every exit*; V03 §2.4's lines and §8's PE, P1, P2 and P6 exits; V4 §8's *The register at each exit*; V5 §8's and V07
§8's *The register at the exits*), stating that volume 3 writes its §2.4 lines and volumes 1, 4, 5 and 7 none, with
T-V4-62 and the offer of lines dropped; X-V12-15's V02 clause reads "V2 §3.10.10 writes `preset: 'default'`", met for
V02, V06 and V11; §3.11's exit sentence points at X-V12-16 as met. No mechanism outside the register, the corpus runs'
dating and the preset spellings moved; no base change request and no owner question was added.

**Reconciliation round 5** (volumes/reconcile-V12-r5, 2026-09-29; against `docs/volumes/critique/seam-content-calibration-r4.md`:
SCC-90 major, SCC-93 minor; both fixed, nothing left for later). **SCC-90 (major):** V12 §3.11 gains *A value moved by its
owning seat before its due* after *The due's corpus run*: (1) the owning seat may change a calibratable column's compiled
cells outside any run only on a `line: 'default'` entry that is `provisional` and not yet due, and only while no committed
golden holds a stage that reads the column (the change's golden check finds no earlier golden's digest moved by the value;
a move that would shift one is a run) — volume 1's M5 tunings of the `hood.constants` columns shipped at M1 and of
`hood.templates`' columns entered at M3a are the case; a named line's entry moves only by its line's method; (2) the change
runs `plat calibrate register --defaults --milestone <id>`, which appends `{ date, value: the column's compiled cells by row
key, milestone, cells: true }` to an existing default entry whose column's cells differ from its last cells row — its only
change to an existing entry, status, due, first row, owner, method, metric and fallback unchanged — and appends nothing to
a closed or past-due entry, listing it as owed to a run; (3) `--check` fails a default entry whose last cells row differs
from its column's compiled cells, naming the command (and `plat calibrate run` where the command cannot append). V12 §2.6's
history row gains the typed `cells` marker (a cells row: `--defaults`' rows, a later line's restating row, an in-place
run's row, V12 §3.7.6 step 5; absent on metrics, panel, pick and status rows), so a closed entry, whose corpus changes ship
as historical packs, is compared with its last cells row rather than its last row; the default line's "never touches an
existing entry" admits the one row; the lint paragraph points at clause (3); §4.2's command row, §2.11's `CalibrationEntry`
row (migrate: a row without `cells` reads as a metrics, panel or status row), §1b's register row, §5.2's register report
(entries marked moved, entries owed to a run) and §8.2's W2 follow; T-V12-20 gains the fixture clauses; J-V12.10 is noted
(a value set before any reader's golden holds it is authoring, recorded by the row); J-V12.77. **SCC-93 (minor):** *The
due's corpus run* makes `--milestone` required (the command refuses without it, naming the flag; each volume's short
citation runs with it) and refuses an id neither of §16 nor volume-qualified (a bare `P1`); V12 §2.8 gains *Milestone ids*
— §16's ids, volume 2's and volume 7's own, and `V<n>-` on a volume's bare step (`V3-P0` – `V3-P6`, `V4-U0` – `V4-U5` with
`V4-U3b`, `V5-P0` – `V5-P6`, `V6-E0` – `V6-E8`; volume 3's PE under M2b's and M3a's ids); the due table's rows read by
those ids, with a new row M6-P and `V3-P0` – `V3-P6` → `M-CAL/M6-P`; §2.9's `CorpusRunId` comment, §3.10.1's and §8.2's
later-run openings add M6-P; the items 109 and 110 paragraph writes a line's step into `due` in that form (`V4-U3`,
`V6-E7`), the corpus evidence rules E1 – E5 keeping their names; X-V12-17 adds the clause for V01, V03, V04, V05 and V07
(no edit needed: the refusal names the flag); T-V12-20 adds the refusals and three dated fixture columns; J-V12.78. No
mechanism outside the register's writers, its check and the milestone ids moved; no base change request, owner question
or fix-list item was added.

**Reconciliation round 6** (volumes/reconcile-V12-r6, 2026-09-29; against
`docs/volumes/critique/seam-content-calibration-r5.md`; all seven fixed, nothing left for later). **SCC-105 (major):**
V12 §2.6's `CalibrationEntry` gains `stages` (method, due, panel, a stage-level `metric`, `possibility`), written for a
line of several stages, `method`, `due` and `panel` its current stage's; history rows gain `stage: { index, outcome }`;
V12 §3.11 gains *Staged entries* — a pass advances, the last non-`corpus` pass confirms, a failing stage closes by the
line's "when it cannot confirm", an unrated panel holds, a trailing `corpus` stage is read at its corpus run whatever the
status and never moves it, a stage past its due fails the exit — with the order the lint holds (a stage at its §16 row,
step numbers within a row, M-1 – M4 first, M4b, M5 and the staged rows unordered and each read at its own exit, `corpus`
last); *Milestone exits* points at it; the `under.catacomb` line's "plus" reads as a `corpus` possibility stage; the
item-102 line's fixtures become stages at `V5-P1` (T-V5-19) and `V6-E5` (T-V6-12) with per-stage metrics; §2.11 migrates
an entry without `stages` as single-stage; T-V12-20 gains the fixture; J-V12.79. **SCC-99 (major):** V12 §2.8 adds the
volumes' own lines' ids (`V6-E*`, `V4-U*`, V02's crypt measure `V4-U3b`), volume 11's C-steps under the §16 ids they are
built inside (C0 M0 … C8 M6-U; no `V11-` id), and M3a for item 110's raised ways (file f items 244, 290); the
`raisedWays` line's measure is at M3a, the evolution lines at `V6-E7`; the lint fails a due, or a stage's, outside §16's
ids, §2.8's and `CorpusRunId`; T-V12-11's TOWN clause, T-V12-35, T-V12-39, T-V12-40, W5 (its split kept inside M3a), §6's
row, §8.1, X-V12-12 (met), BCR-V12-9's deltas (M3a +1 / +1.75, the total unchanged) and the bar-map BCR row read M3a;
T-V12-20 gains "`due: 'E2'` fails"; X-V12-17 adds V02, V06 and V11; J-V12.78 amended. **SCC-100 (minor):** the span-rule
line reads `panel` (M4-110) at M4, then T-V4-62's conformance at `V4-U3`, then the V4-U5 panel at `V4-U5`, in the staged
form; X-V12-18 tells V04. **SCC-98 (major):** *A value moved by its owning seat before its due* admits, on a `measure`
line whose bars no run may name (every `BenchBarDef.stages` `[]`: V03 §2.4's lines at `V3-P6`), the owning seat's stated
tuning before the exit under (1)'s golden test and the line's hand fallback in the exit's change, each recorded by (2)'s
cells row; *Milestone exits* closes such an entry `fallback-applied` on the hand fallback; V12 §2.6's cells comment names
a named entry's first row a cells row; (3) compares every entry holding a cells row (without `preset`), naming the
command where it may append and `plat calibrate run` otherwise; T-V12-20 gains the `stages: []` fixture; J-V12.77
amended; X-V12-18 tells V03. **SCC-103 (major):** clause (2′) *Rows added* — the command appends a cells row for rows a
later landing adds, whatever the entry's status or due and whichever seat lands them, rows added after close reported as
such; (1)'s owner condition and (2)'s "owed to a run" read only changed cells of the row keys the last cells row holds; (3) fails an unrecorded
added row key naming the command; the default line's pointer, the lint's pointer, §4.2's command row, §5.2's report, §2.11
and §1b follow; T-V12-20 gains the post-M-CAL `V3-P1` fixture; J-V12.80. **SCC-102 (minor):** (1)'s golden condition reads
per digest (a column a committed stage reads may move where no digest depends on the moved cells; `terrace.siteShare`
named); the held outcome is pre-decided and wired — `plat calibrate register --hold` (a new §4.2 verb) appends a held row
(V12 §2.6 `held`), the report lists "held: a committed golden reads it", the owning volume's bar reads the shipped value;
J-V12.77's premise is restated; §12 moves `terrace.siteShare` to PLAUSIBLE; T-V12-20 gains the `--hold` clause.
**SCC-107 (minor):** *Entries* and the lint scope the register to model constants; application and engineering
constants a volume confirms by its own test under D-18 (volumes 9 and 10) take no entry, their provenance note naming the
test; T-V12-20 gains the clause; J-V12.81; X-V12-18 tells V09 and V10. No base change request or owner question was
added; the fix list stays empty.

## Integration notes (volumes/_integrate, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_integrate; covered by the whole-design retrovalidation (J84).

The integration lane (`docs/volumes/_integrate.md`) decided the following for this volume. Each note supersedes any
sentence of this volume that reads otherwise; sentences edited in place are listed. Decisions are vetoable (J-VI.n).

* **IN-V12-1 (J-VI.17 H29; volume 5's §13 item 13).** The register lists `accessSiting.deckGapM` and `lineClearM` as
  volume 5's `IslandRule` cells (own, calibrate-later), never as volume 11 rows.
* **IN-V12-2 (J-VI.10).** X-V12-9 is met by volume 11's IN-V11-1 (the `ownerRule` stamps and the raised-way calibration
  minima) and V11 §3.24.0's FM line (`presets.FM` resolving the stepped and deck families off; V11's round 1, SCC-09).
* **IN-V12-3 (J-VI.4).** A bar that counted refusals of item 110 or of the sky layer counts bends (each with its line).
* **IN-V12-4 (J-VI.18, J-VI.3).** BCR-V12-15 and BCR-V12-17 are applied with BCR-V9-31 as file f item 447's one text;
  BCR-V12-15's closure barrier kinds are J-VI.3's six (edited in place); the metric variant also carries the span
  polygons (kind `span`) that text adds, which no bar of this volume needs to read.

## Finalization (volumes/_finalize, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_finalize; covered by the whole-design retrovalidation (J84).

The finalization fixed, in place, this volume's round-6 majors of seam-content-calibration-r6: **SCC-110** — the span-rule line names volume 11's cells `raisedWays.structure.span.*` (row 80), the `raisedWays.structure` line adds `slideMaxFactor` and excludes the `span` block from its catch-all, the `retaining` line excludes `settings.stateSnapCm`, and *Items 109 and 110 by column* gives `retaining.settings.stateSnapCm` its own default entry at M3a restated in place at `V6-E2` on `bar.T-V6-62` (file f J-RF2.4), due `V6-E7` — new **J-V12.82** and **X-V12-19** (X-V11-17 (f) is met by this route); **SCC-112** — a released strip pick's row is a cells row, the releasing change runs `plat calibrate register`, §4.2's command row and T-V12-20's new fixture follow — new **J-V12.83**. With them the V06-dating part of the minor **SCC-109**: the item-102 line's drift stage at `V6-E7`, §2.8's and X-V12-17's sentences on V06's steps, T-V12-20's unordered pair and *The order*'s volume-6 clause. Left on the fix list: SCC-109's X-V12-18 clause about V04 (it waits on SCC-113 in V04). **CONFIRMED** by execution: every edit an exact-match replacement with its count asserted; volume 6's side (the `stateSnapCm` line and `bar.T-V6-62`, SCC-111) was applied in the same pass, so the entry the line names is registered by V06's E2 seat.
