# Fix-all round 5 — VERIFY, scope area (§1, §13–§17, decisions, judgment calls, staged list, one-page summary)
> PENDING FABLE REVIEW — Opus-produced (fixall/verify-scope-r5), not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md.

Status: COMPLETE (2026-09-26).

## 0. In plain words

This seat re-checked the parts of the design that say what is built and in what order, how it is tested, how it stays
legally clean and which decisions were taken, after the fifth fix-all round was merged into `docs/ARCHITECTURE.md`.
**All five items assigned to this area are fixed by a concrete mechanism in the text.** A table row can no longer lose
its reasoning to a stray `|` character: the row is repaired and the document check now counts every row's cells (re-tested
here — putting the bare character back makes the check fail on exactly that row). Keeping a saved town at a history
point the program does not hold now returns the ordinary "conflict" answer with a named error. The first milestone now
builds the saved-file format it measures. The side-by-side panels against FTG now use each recorded FTG town's actual
population, carried into the product by a committed numbers-only file, and the "square" template is compared in
Neighbourhood's own form. The effort estimate prices the other areas' additions and rises from 150–200 to 153–204
expert person-weeks (every sum re-computed here and correct).

The earlier fixes in this area all still hold. The check found **three new small problems, none serious and none a
deferral**: (1) files saved by the first milestones can be opened by a later development build of a different version,
and the build plan's first file reader would then report them as damaged ("does not match its own fingerprint"), which
is exactly the false alarm the round fixed elsewhere — the plan has no rule for another version's file until the
milestone that builds the old-version viewer (M3a); (2) Neighbourhood's `area` template, one of the four the owner will
rate at the stage-2 panel, is named in the panel's instructions by a fabric name the program does not have (the base's
own fabric is called `bent-cut`), so five of the twenty panel pairs have no defined way to be opened; (3) the clean-room
rule now says the D-5 panel sends only two files into the product, but the panel's answer record is a third file the
product stores and reads. Seven problems other checkers found touch this area's sections; they are listed in §3 and
not counted twice.

## 1. Verdict table (5 assigned items)

Method: each item's claim, failure scenario and required change were taken from its source (`r4-verify-scope.md` §3,
VS4-1 – VS4-4 and VS4-6; VS4-5 is the determinism area's and its verifier's), its round-5 landing from
`docs/ARCHITECTURE-VALIDATION.md` §R5.1, `r5-scope.md` §1–§3 and `r5-integration-log.md` §3–§5, and then judged against
the integrated `docs/ARCHITECTURE.md` (11 477 lines, md5 `bac60dd7ecb828b0f7926a06efa36c74` — the integration log's
value, re-computed in `fixall_verify_scope_r5_checks.out`). ACCEPTED means the quoted text is a concrete mechanism that
defeats the item's failure scenario. "l." = line of `docs/ARCHITECTURE.md`. VS5-*n* = a new finding in §3.

| id | sev | round-5 claim | verdict | quoted evidence | required change |
|---|---|---|---|---|---|
| VS4-1 | minor | FIXED (J-I15 escaped; §17.1 (2) (iv); J-S39; `doc_checks.py` S1) | **ACCEPTED** | J-I15 (l. 11411) now reads "`('gate_end', gate, 0 \| 1)`" with the pipe escaped; §17.1 (2) (iv) (l. 10594–10598): "outside fenced code (a fence may be indented, as inside a list item) … and every row has its header's number of cells, counting only unescaped pipes (VS4-1: GitHub-flavoured Markdown splits a cell at every unescaped `\|`, inside a code span too, and drops the cells beyond the header's count …)"; `doc_checks.py` l. 161–172 implements exactly that (`re.split(r'(?<!\\)\|', s)`, header count per table, fence toggled on indented fences); J-S39 (l. 11392). **Executed:** the script over this area's 18 changed section keys: S1 0, 0 unreviewed, exit 0; own cell count over the whole document (`fixall_verify_scope_r5_checks.out` part B): 1 113 table lines, 0 rows off their header's count; **paste test** — a scratch copy with J-I15's pipe put back bare: S1 1 hit, "3 cells against 2: \| J-I15 \|", exit 1 (the copy deleted). The scenario (a bare pipe cutting a row short while the check passes) is defeated | — |
| VS4-2 | minor | FIXED (§14 `EditEngine.rebase`, J-S38; §7.1 via the determinism block) | **ACCEPTED** | §14 (l. 10139–10142): "`rebase(doc: Document, reason: RebaseReason, at?: number /* … */): ApplyResult /* as apply, undo and redo report: 'ok' when the rebase event is appended at the head; any other `at` returns { status: 'conflict', actions: [{ kind: 'invalid', message: 'E_REBASE_AT: at must be the log head or h₀' }] }, appends nothing and rebases nothing, on every host alike (§7.1, §11.2; VS4-2) */`"; §7.1 (l. 5873): "any other value is refused with E_REBASE_AT and nothing is appended (§14; VS4-2)"; §11.2 (l. 8553–8558): `ApplyResult` has `{ status: 'conflict'; actions: ConflictAction[] }` and `ConflictAction.kind` includes `'invalid'` with a `message` — the shape §14 names exists; J-S38 (l. 11391) records "over a thrown error or the document returned unchanged". The scenario (one implementation throws, another returns the input; a bridge has no status to relay) is defeated: one typed result, the error named where the event is defined | — |
| VS4-3 | minor | FIXED (§16 M1 and M2a, J-S37, J-S40, J-I14; §12.8 via RS5-1; §2.9 step 5 via C-2, J-I19) | **ACCEPTED** | §16 M1 content (l. 10464): "**the `.plat` writer and reader for generated towns** (§2.9, §3.9; VS4-3) — the manifest, the content-addressed chunks with §3.9's geometry layout, gzip compression and an empty log, since a generated town has no events — which the document-size test and the *preview* documents need and M2a's log builds on"; M1 exit: "the document-size test (≤ 320 B per building at CITY) and the generated-town round trip — save → load → save byte-identical over the canonical form on B-CITY-lite's towns (§2.9; VS4-3)"; M2a (l. 10465): "the log and the one replay fold over M1's document format … load verification over M1's reader"; §12.8 (l. 9168–9170): "the milestone that builds the log and load verification over the document format M1 builds (§16; VS4-3)"; §2.9 step 5 (l. 2042–2045): "So does a document written by M1's generated-town format, before the records digest existed … the schema transform that adds `recordsDigest` (§7.5) drops its `model`, and the load regenerates the town from its recipe and its empty log, never reporting it verified"; J-S37, J-S40, J-I14, J-I19 agree; grep: 0 hits for "builds the document, the log". The scenario (M1 measuring a document it never builds) is defeated: M1's content now builds the writer and reader its size test and *preview* documents need. The reader has no rule for a file of another output version — VS5-1 | — (the residue is VS5-1) |
| VS4-4 | minor | FIXED (§13.6 (2), (3), (9); §14; §16 M-1; §17.1 (4); D-29; J-S41, J-S42; II.2 via PS5-1) | **ACCEPTED** | (a) §13.6 (2) (l. 9800–9807): M-1 records each capture's "**recorded population**, the number of residents its decoded payload holds … The pair's PLAT side is generated at the capture's recorded population and its `WaterSetting`, both read from that file"; *Measurement (M-1)* and **Pre-decided fallback** (l. 9807–9811): "a capture whose payload yields no resident count takes its size's nominal target (BIG_TOWN 5 600, BIG_CITY 24 500), marked `populationSource: 'nominal'` … a population outside the rung's band (§1.1) is clamped into the band and the clamp reported"; `D5Pair` FTG (l. 9882–9884) gains `population` and `populationSource`; `FtgCapture` (l. 9887–9888). (b) (l. 9785–9787): the CLI "reads only the two numbers-only files the research-side panel script commits beside it — `ftg-captures.json` (M1, M2b, M4) and `ng-counts.json` (M5) — and never `captures/`"; l. 9802–9805 "writes `plat/goldens/d5/⟨milestone⟩/ftg-captures.json` … and commits it like `baselines.json` (§17.1 (4)) before `plat d5 seeds` runs"; §14 testkit line (l. 10052–10053), §17.1 (4) (l. 10639–10642), D-29 (l. 11113). (c) (l. 9821–9822): "in the template's default form — for `square`, `SquareFabric`'s `void` mode, NG's own square (II.2; VS4-4)"; II.2 (l. 10896–10902): "The `square` template row's default is `mode: 'void'` … A district records a non-default mode as `fabricParams.squareMode = 1`" — and §2.5 (l. 1142) declares `fabricParams: Record<string, number>`, so the numeric encoding is well-typed. All three unstated inputs are now stated. Two new, smaller defects sit beside this fix: the `area` template's fabric name (VS5-2, pre-existing) and §17.1 (4)'s "only inputs" (VS5-3) | — (VS5-2, VS5-3 are new findings, not residues of the three inputs) |
| VS4-6 | minor | FIXED (§16 plain words, effort table, the components paragraph, cuts; D-20; J-15, J-S6, J-S43; §0.11) | **ACCEPTED** | §16 (l. 10506–10514): "Six mechanisms are **new components**, priced by the fix-all line's widening (≈ 14–22 working days, 3–4 pw; PLAUSIBLE)", each named with its section, milestone and item ids; l. 10514–10522: "The rest are **refinements of a mechanism a line already prices**, absorbed by that line", each named with the line (O9, parity floors, fix-all, O12 / O11); effort row (l. 10489) "rounds 4–5 (2026-09-26): 3–4, ≈ 14–22 working days itemised below (VS4-6)"; l. 10524–10526 the standing rule "A later pass that adds build work prices it here"; D-20 (l. 11104), J-15, J-S6, J-S43, §0.11 (l. 287–289) and the plain words (l. 10447, 10450) agree. **Recomputed** (`fixall_verify_scope_r5_checks.out` part A, parsing the tables): milestone rows 153–204 (M-1 2–3, M0 9–12, M1 35–46, M2a 9–12, M2b 33–42, M3a 16–20, M3b 16–21, M4 11–16, M4b 8–14, M5 14–18); the 13 effort lines 139–186 = the stated subtotal; + stage 2 14–18 = 153–204 = the stated total; cuts 17–28 → 122–158 / 136–176 as stated; ÷ 2 = 76.5–102 weeks ("about 77–102"); the six components 14–22 days. Every round-4 mechanism VS4-6 named is now either a component (naming records, `carryWings`, crossing sites, raster jobs and queue, stamp tiles) or a named refinement (digest path, demotion, `StretchRef`, harbour pick, pin pass). *Observation, no change required:* 14–22 working days is 2.8–4.4 pw, stated as 3–4 (whole-pw rounding inside a PLAUSIBLE estimate) | — |

**Counts:** 5 items — **5 ACCEPTED**, **0 UNRESOLVED**; none claimed INVALID or STAGED-BY-OWNER.

## 2. Earlier FIXED items whose sections changed this round

Round 5 changed, in this area, the title, the one-page summary, §0.11 (new; §0.10 only lost its trailing separator),
§13.1, §13.2, §13.3, §13.5, §13.6, §13.8, §14, §15.1, §16, §17.1, the delegated decisions (D-20, D-29), the judgment calls
(preamble, J-15, J-S6, J-S37, J-S38, J-S39 – J-S43, J-I14, J-I15, J-I18, J-I19 and the other areas' rows) and the staged
list — found by a section-by-section comparison with the integration seat's pre-round-5 copy (md5
`2661eb6826ea537ddcd524941c003e14`; `r5vs/secdiff.out`, `r5vs/scopediff.out` in the session scratchpad; 169 changed spans,
every one read). Every item this area accepted in rounds 1–4 whose landing lies in those sections was re-checked by its
landing phrases (`r5vs/landings.py`: 53 item groups, 94 phrases, **0 missing**; residual-phrase scan: "river + coast",
"27 runs of five", "can be added later.", "M1's memory measurement below includes", "builds the document, the log" — 0
each; the two "150–200 pw" hits are J-15's and J-S6's history clauses) and each changed span was read for a regression.
**None regressed.**

| id | still holds | where it now lives (round-5 text) |
|---|---|---|
| GEO-12, IMP-16, VS2-9, IMP-7 | yes | §13.1 (2) constructive set, extended by the kernel's round-5 fixtures (X-S1); §13.2 B-EDIT (the thirteen asks) and the campaign unchanged |
| LC-19, NF-S1, N-24, VS2-5 | yes | §13.3 "From M1 (LC-19)"; round 5 added only the M3a GeoJSON-with-trees clause (NR4-3), which strengthens the reproducibility proof |
| SCL-18, SCL-19, SCL-21 | yes | §13.8 tiers unchanged in structure (the seam check and sliced-placement row added, NR4-1 / NR4-2); §13.2 sweeps unchanged |
| FTG-16, MN-2, VS3-6 | yes | §16 M-1 FTG captures (now with the recorded population, VS4-4); §13.5 matched sizes; §13.6 (2) pairing rules and the six check vectors unchanged (text identical to round 4's apart from VS4-4's additions) |
| IMP-1, FTG-22, NR-10, VS2-1, VS2-8, VS3-3, VS3-4, VS3-5, S4-1 | yes | §17.1 (1)–(9): (2) (iv) gains the cell count (VS4-1); (4) gains the two D-5 files (VS4-4 — see VS5-3); (5), (8), (9) unchanged; the three workflows still carry the document-check line (grep: 1 each in `04-amendments.js`, `05-fable-review.js`, `06-fix-all.js`). **Executed:** `doc_checks.py` over this area's 18 changed keys — C1 5, C2 0, C3 159, C4 3, S1 0, S2 2, all reviewed, exit 0 (42 s); the integration seat's 50 new allow entries read: ordinary phrasing, measured numbers and pointers, none a list, table, grammar or palette |
| IMP-2, VS4-6 | yes | §16 effort table re-derived (§1 above) |
| IMP-3, VS2-2, NF-S6 | yes | §16 order and D-35 unchanged; §1.1 "All three rungs generate from M1" |
| IMP-11, NF-S2 | yes | §13.6 (1), (7); §16's one rule and every gating exit's clause unchanged |
| IMP-12, IMP-13, NF-S5, NR-9 | yes | §16 M-1 and M1 exit unchanged in these clauses |
| VS3-1, VD3-5, S4-2 | yes | §16 M1 exit "(the load-verification case is M2a's; VS3-1)", M2a exit memory and rebased-size tests; §13.2's memory test now says "from M2a on the reference 300-edit CITY document"; §12.8 (RS5-1) |
| VS3-2, NR-1, VS2-3 | yes | summary (now "19 runs in 20", NR4-6 — the p95 wording the knees were computed for), §1.1, §15.1 H2, D-18 — figures unchanged |
| VD3-7, NP3-9 | yes | §14 `rebase` keeps `at` (now typed, VS4-2); summary's heights sentence unchanged |
| COV-MFCG-L08, COV-FTG-A24 / A25 / C11, NF-D12, N-22, VS2-4 | yes | §14's app text, `ConcernId`, `StreamOpts`, `TOWN_ROOT`, `labels ← render` and the lint closure unchanged; round 5 added `LabelPlacer.begin` / `PlacementJob` (NR4-2 — see NR5-2 in §3) and the testkit's two-file sentence |
| COV-FTG-OBS1, NF-P11, NF-S12, B19 | yes | §15.1: only B19's wording (the shared seam band, NR4-1); row counts MFCG 40, FTG 46 + 9, NG 31 unchanged |
| VS2-7 | yes | the judgment-call preamble names round 5's rows and `r5-integration-log.md` §4; **scripted** (`r4vs/ids.py`, re-run): 269 J-rows, 0 duplicates, every family contiguous (J- 18, J-DET- 51, J-I 19, J-K 35, J-P 49, J-R 54, J-S 43), every cited J-id and range member defined; 35 D-rows, every cited D-id defined; every `§` pointer resolves except the known external `proposal-product.md` §16.2 |

Consistency checks over the whole text (executed): every `docs/validation/bench/` receipt the document cites exists
(the only unresolved names are future product or research-side files — `THIRD-PARTY-NOTICES.txt`,
`research/baselines/make_denylist.py`, `mirror_records.py`); `E_REBASE_AT` now occurs in §14 and §7.1 (VS4-2's residue
gone); `fabricParams` is numeric (§2.5), as II.2's encoding needs.

## 3. New findings

Three new problems in this area's sections, all minor; none is a deferral. VS5-1 and VS5-3 were introduced by round 5
(VS4-3's M1 reader; VS4-4's §17.1 (4) sentence); VS5-2 predates it (round 4's VS3-6 fix; round 4's check read II.2's
"`area` the base's default" as consistent and missed the fabric id).

| id | sev | owner | finding (claim and failure scenario) | required change |
|---|---|---|---|---|
| VS5-1 | minor | scope (§16 M1 and M2a content and M1 exit; J-S40); companion determinism (§2.9 step 5's C-2 sentence) | **The M1 reader has no rule for a file of another output version, so from M1 to M3a it reports version change as damage.** §16 M1 (l. 10464): "a saved town opens by decoding its snapshot and comparing its recomputed root with `model.digest` (M0's full recomputation), a differing root loading as a corrupt cache by regeneration from the recipe"; M2a builds load verification "over M1's reader". Neither row mentions `outputVersion` or the frozen view (`fixall_verify_scope_r5_checks.out` part D: 0 mentions each); the frozen view and retention arrive at M3a (M3a: "retention of output versions N−1 and N−2", "the version-pinned checks … of a frozen view (VD4-1)"). §2.9 (l. 1889–1896) sends a document outside the retention window to step 2's frozen view precisely because "a recomputation with the current packages would report a mismatch for almost every old document". Scenario: the owner saves a *preview* town at M1 under o3; a declared shift creates o4 (every declared stage shift creates an output version, §13.3); reopened, the M1-built reader recomputes the root with o4's packages, it differs, and the app says "the saved copy of this town does not match its own fingerprint; it is being rebuilt" and shows o4's town — the false damage report VD4-1 removed, contradicting §13.3's preview promise ("a later release may draw this seed differently and will say so") and the summary ("a town made by a program version the browser no longer keeps opens for viewing, labelled as made with an older version") for every milestone before M3a | Add to M1's content, after the reader clause: "a document whose `outputVersion` is not the running one is never root-checked: it opens as §2.9 step 2's frozen view — each chunk checked by its content hash, the state decoded for view and export only, labelled 'made with oK; not verified by this version' — with the offer to open its recipe under the running version and §13.3's notice; the `frozenImport` rebase arrives with M3a's rebases". Add to M1's exit: "a document saved by a test build labelled with an earlier output version opens as a frozen view with no mismatch message". In §2.9 step 5 and M1's M2a clause, say the regeneration applies to an M1 document **of the running output version** (one of another version is step 2's, as above); amend J-S40's parenthesis to match |
| VS5-2 | minor | scope (§13.6 (2), (3); `D5Pair`; J-S34); companion pipeline (II.2's last sentence) | **NG's `area` template names no fabric, so five of M5's twenty panel pairs cannot be opened as written.** §13.6 (2) (l. 9820–9822): "PLAT's side of pair (template, i) is one district of a PLAT town, opened with the same template at neighbourhood LOD (`setAttr(district.fabric, template)`, II.4)", with `template: 'area'\|'street'\|'square'\|'ring'` (l. 9885). But `district.fabric` is a `FabricStrategyId` — "'bent-cut' in the base; ring / square / street at stage 2" (§2.5, l. 1142) — and II.1's request lists "'bent-cut' (refine) \| 'ring' \| 'square' \| 'street' (replace)" (l. 10803); `area` is none of them (part C: the one template that is no `FabricStrategyId` is `area`). II.2 only says "the `area` template is the base's default". Scenario: at M5 `plat d5 seeds` runs the committed search for the `area` pairs; one implementation refuses `setAttr(district.fabric, 'area')` as an unknown id (five pairs missing, so M5's "14 of 20" cannot be met), another aliases it to `bent-cut` and runs it as a `replace` close-up — a model edit with scoped regeneration — although II.4 opens the base's own fabric as a `refine` close-up, derived and unedited. Two faithful builds produce different panels | §13.6 (2): "For `area`, PLAT's side is the district's own `bent-cut` fabric, opened as a `refine` close-up (no `setAttr`; II.1, II.4), its building count the city-LOD count; for `street`, `square` and `ring`, `setAttr(district.fabric, template)`, a `replace` close-up"; `D5Pair` NG keeps NG's four names with that mapping in its comment; J-S34 gains "(`area` = the base's `bent-cut`)". Pipeline: II.2's "the `area` template is the base's default" → "the `area` template is the base's `bent-cut` fabric (`FabricStrategyId` 'bent-cut'), the default" |
| VS5-3 | minor | scope (§17.1 (4)) | **§17.1 (4) says the D-5 panel sends only two files into the product; (9) commits a third that the product reads.** §17.1 (4) (l. 10638–10642, new this round): "its only inputs to the product are two numbers-only files committed the same way into `plat/goldens/d5/⟨milestone⟩/` — `ftg-captures.json` … and `ng-counts.json` …". §13.6 (9) (l. 9873–9876, 9889): the sitting's machine-readable record `plat/goldens/d5/<milestone>/record.json` "lives in the product, committed by the seat that ran the sitting"; `MilestoneRecord.d5.record` names it (§13.3) and `@plat/docs` reads "the D-5 statuses (§13.6)" for the release notes (§14). Scenario: a CI path rule or a clean-room audit written from (4) flags the record's commit as an unauthorised research-side input, or a reader of (4) concludes the answers never reach the product; the two clauses of one section disagree about what crosses the boundary | Rewrite the sentence: "its inputs to the product are three files committed the same way into `plat/goldens/d5/⟨milestone⟩/`: `ftg-captures.json` (capture ids, rungs, water settings, resident counts) and `ng-counts.json` (NG hoods' building counts), which `plat d5 seeds` reads and nothing else, and the sitting's `record.json` — numbers, hashes and the owner's answers, no reference image or reference data ((9)) — which the milestone record and the release notes read" |

**Confirmed here, found by other verifiers (not counted again).** Each touches this area's sections; the quoted text was
checked in place and the premise holds.
* **VD5-7** (determinism verifier; owner scope, §16 M2a / M3a): M2a builds the keep (a `keptSnapshot` rebase, §2.9 step
  4) while "the link refusal rules (§2.9, §6.4)" and "the link refusal for a kept town" are placed at M3a (§16 M3a
  content, l. 10467; the components paragraph, l. 10517), and M1 already ships permalinks — so between M2a and M3a a
  kept town can emit a link that replays the rejected town.
* **NR5-1, NR5-2** (rendering verifier; §14 companions): §14 (l. 10124) declares `LabelPlacer.begin(stop, labels:
  LabelEntity[], …)` — the model record — and `TileRasterOpts` (l. 10130) carries `sun?` only, as their findings say.
* **VD5-5** (determinism; companion §13.2), **NP5-2** (pipeline; companion J-I18's L0-writer list), **VK5-3** (kernel;
  companion `ARCHITECTURE-VALIDATION.md` §R5.1 VK4-3 row) — companion edits in this area's text, owned by those areas.

## 4. Deferral scan

This area's sections (the title and summary, §0, §1, §13–§17, PART III, the decisions, the judgment calls, the staged
list, Appendix A — 2 477 lines) were scanned for TBD, TBA, "to be decided / determined", later, defer…, postpon…,
future, "not yet", "at M0", placeholder, pending, eventually, "when / if needed", revisit, "left for", "out of scope",
open and until (`r5vs/defscan.py`): 167 hits, 31 on lines new or changed in round 5, **each read: none is a deferral**
— sequence ("a later water edit", "until the recomputed roots match", "whose water is not yet inserted"), negation
("none deferred", "nothing be deferred"), ordinary words ("open-to-editable", "an open trace", "the items still open
after round 4" as a round's title), the pending-review banners, the owner-staged subjects ("a registered stage later",
the staged list), and §16's standing rule "A later pass that adds build work prices it here", which binds future passes
and postpones nothing. No subject is staged this round beyond the owner's list; the stage-3 row's new hook (NP4-2) is
concrete (the union test on stored compositions at the stage-3 intake). The three new findings each carry a concrete
required change; none needs a measurement to decide.

## 5. Receipts and method notes

* **Read in full, line by line:** the scope sections of the integrated `docs/ARCHITECTURE.md` — the title and summary
  (l. 1–105), §0 (l. 106–294), §1 (l. 296–511), §13 (l. 9252–10000), §14 (l. 10001–10196), §15 (l. 10197–10436), §16
  (l. 10437–10546), §17 (l. 10547–10769), PART III, the delegated decisions, the judgment calls' preamble and every
  changed or new row (J-15, J-S6, J-S32 – J-S43, J-I14 – J-I19), the staged list and Appendix A (l. 11029–11477); for the
  items' cross-references §2.9 in full (l. 1795–2121), §7.5's opening, §7.1's `rebase` comment, §11.2's `PlatApi` and
  `ApplyResult`, §12.8's M2a sentence, §6.4's retention paragraph, II.1's request, II.2 and II.4; the sources
  `r4-verify-scope.md` (§0–§3, §5), `r5-scope.md` §0–§1 and §3–§5, `r5-integration-log.md` (all),
  `ARCHITECTURE-VALIDATION.md` §R5 (intro and the disposition table), `doc_checks.py` (header and S1 / S2), and the
  other round-5 verifications' new-finding tables (to avoid double counting). The rest of the 1.46 MB document (PART I
  §2–§12 bodies, PART II beyond II.1–II.4) was read where a cross-reference led; its areas' verifiers cover it. The
  full-document scripted checks below ran over every line. Nothing outside the project; no reference source; no
  reference content copied (every script prints counts, sums and ids).
* **Executed (CONFIRMED):**
  1. Section and word diff against the pre-round-5 copy (`r4vs/secdiff.py` → `r5vs/secdiff.out`; `r5vs/scopediff.py` →
     `.out`): 63 changed or new sections, 17 of them this area's; all 169 changed spans in this area read.
  2. `python3 docs/validation/bench/doc_checks.py --sections "ARCHITECTURE,The whole design in one page,0.10,0.11,1.1,
     13.1,13.2,13.3,13.5,13.6,13.8,14,15.1,16,17.1,Delegated decisions,Judgment calls,Staged by the owner"` (42 s): C1 5,
     C2 0, C3 159, C4 3, S1 0, S2 2 — 0 unreviewed, exit 0. The same script on a scratch copy with J-I15's pipe put back
     bare (`--sections "Judgment calls"`): S1 1 unreviewed ("3 cells against 2", l. 11411), exit 1; the copy deleted.
  3. `docs/validation/bench/fixall_verify_scope_r5_checks.py` → `.out` (committed): part A the §16 arithmetic (milestones
     153–204 = lines 139–186 + 14–18 = total; cuts 122–158 / 136–176; 76.5–102 weeks; six components 14–22 days; seven
     restatements found once each); part B the whole-document cell count (1 113 table lines, 0 off); part C the
     FabricStrategyId / template comparison (VS5-2); part D the M1 / M2a / M3a rows' version and frozen-view mentions
     (VS5-1).
  4. Scripts over the text (session scratchpad `r5vs/`): J- and D-id integrity, pointer resolution and cell counts
     (`r4vs/ids.py`), 94 landing phrases of 53 item groups and the residual phrases (`landings.py`), the deferral scan
     (`defscan.py`), bench-file existence, the workflow grep for the document-check line, the round-5 allow entries.
* **PLAUSIBLE (reasoning only):** that a GFM renderer drops J-I15's excess cell (the renderer's published table rule; no
  renderer run here); VS5-1's premise that output versions change between M1 and M3a (every declared shift creates one,
  §13.3; no build exists); VS4-6's allocation of the components to milestones (M1 + 2 / + 3, M3a + 1 / + 1, M2a
  unchanged) — an estimate about an estimate, whose sums are CONFIRMED.
* **Output shifts, stated.** None: this seat changed no design text, golden, digest or model output. It added one
  receipt script and its output (`docs/validation/bench/fixall_verify_scope_r5_checks.py`, `.out`), this file, one row
  of `docs/FABLE-REVIEW-QUEUE.md` and one line of `docs/lane-events.log`.
* **Cosmetic, no finding:** §17.1 (2)'s *Calibration* has one source line longer than the document's 120-column wrap
  (l. 10622, where a round-5 clause was joined to the round-4 sentence); it renders identically.
