# Fix-all round 3 — VERIFY, scope area (§1, §13–§17, decisions, judgment calls, staged list, one-page summary)
> PENDING FABLE REVIEW — Opus-produced (fixall/verify-scope-r3), not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md.

Status: COMPLETE (2026-09-26).

## 0. In plain words

This seat re-checked the parts of the design that say what is built and in what order, how it is tested, how it stays
legally clean and which decisions were taken, after the third fix-all round was merged into `docs/ARCHITECTURE.md`.
**Ten of the eleven problems assigned to this area are now fixed by a concrete mechanism in the text.** The metropolis
size is made from the first milestone and tuned at the second; the speed promises match the numbers; the nightly re-roll
test uses 800 areas and its figures match the script that measured them; the seeds of the owner's side-by-side panels
come from a published hash — re-built here independently, it reproduces the hash's two published check values and all
three worked examples in the text; the broken build-plan row is whole again and no other table in the document is broken;
the label-placement check now covers the drawing code that feeds it; the record formats agree; the pointers are right.

**The eleventh is only half done.** The new script that stops copied reference material (palettes, word lists, message
names) from entering the design runs at every fix-all merge, but the rule is worded for "the integration seat", and the
owner-amendment pass that runs next has no such seat — its lanes write the document directly and are not told to run
the script. One sentence widens the rule to every seat that writes the document.

The 51 items this area fixed in rounds 1 and 2 all still hold. The check found **six new small problems**, none serious
and none a deferral: (1) the first milestone is asked to measure memory while re-checking a saved town with 300 edits,
but editing only arrives at the next milestone; (2) the one-page summary and the parity checklist say the speed bars
hold for towns up to about 4 500 people (cities 17 700, metropolises 59 000) — true for a typical run, but the bar for
the slowest single run holds only up to about 3 400 / 13 600 / 46 000; (3) the list of published algorithms still misses
seven the design uses (river-flow directions, a fast distance map, a fast blur, the hash tree behind the town
fingerprint, the name grammar and letter chains, a tree-spacing statistic); (4) the copied-material check does not look
inside FTG's content database or the raw capture files — measured here, 343 of 620 FTG names there appear in no
findings file, so a pasted FTG list would pass; adding those files costs 44 seconds and adds one harmless hit; (5) one
"executed" number in the clean-room section (27 runs of shared words) does not reproduce — the committed script gives 47
on the same text; (6) the owner's side-by-side panel is fully specified only against MFCG: against FTG there are three
captures per size for ten PLAT seeds, with no rule for pairing them, and the stage-2 panel against Neighbourhood has no
seed formula. Two problems other checkers found in this area are confirmed (the summary still says shadows and 3-D "can
be added later"; the editing interface cannot express the new "keep the saved town" point).

## 1. Verdict table (11 items)

Method: each item's claim, failure scenario and required change were taken from its source (`r2-verify-scope.md` §3 for
VS2-1–VS2-9, `r2-verify-rendering.md` §3 for NR-9 and NR-10), its round-3 landing from `docs/ARCHITECTURE-VALIDATION.md`
§R3.1 and `r3-scope.md` §1, and then judged against the integrated `docs/ARCHITECTURE.md` (9 546 lines, md5
`a8c2de844218f98444f1479ffb2b292a`, unchanged since the integration seat's 23:20 write). ACCEPTED means the quoted text is
a concrete mechanism that defeats the item's failure scenario. "l." = line of `docs/ARCHITECTURE.md`. VS3-*n* = a new
finding in §3.

| id | sev | round-3 claim | verdict | quoted evidence | required change |
|---|---|---|---|---|---|
| NR-9 | minor | FIXED (§16 M1 exit) | **ACCEPTED** | §16 M1 exit (l. 8687): "the label-composition measurement (§8.9)"; §8.9 (l. 6322) defines it — "a tile's label composition ≤ 3 ms at ≤ 150 glyph runs". Grep: no "label-tile measurement" remains; the one "label tiles" left (l. 6282) is §8.8's round-1 reasoning about the old low tier, not a measurement | — |
| NR-10 | minor | FIXED (§17.1 (8)) | **ACCEPTED** | §17.1 (8) (l. 8831–8841): "With the round-2 and round-3 text (NR-10): the xoshiro128\*\* generator (Blackman–Vigna, public domain; §6.1) with Irwin–Hall sums …; MurmurHash3's x86 128-bit hash and its 32-bit finaliser (Appleby, public domain; H128 in §6.2, `RH32` in §8.1, `H32` in §13.6), checked against the SMHasher verification values; Krüger's transverse Mercator series in Karney's formulation … (Krüger 1912; Karney 2011; §11.1); the van der Corput radical inverse and Morton (Z-order) bit interleaving for §8.10's progressive grid ranks; Ulichney's void-and-cluster ranking (1993; §8.10)" — all four sources NR-10 required, each with its section, plus eleven more. The disposition's wider claim ("every other published method the text now uses") is not complete: VS3-3 | — (the residue is VS3-3) |
| VS2-1 | minor | FIXED (§16 M3a row; §17.1 (2) (iv); `doc_checks.py` S1) | **ACCEPTED** | M3a is one line again (l. 8690 starts `\| **M3a` and ends `\| 15–19 pw \|`); §17.1 (2) (iv) (l. 8787–8788): "outside fenced code every line that starts with `\|` ends with `\|`, and no other line sits between two table lines (VS2-1 …)". **Executed:** `doc_checks.py` S1 = 0 over the whole document; this seat's own column-count check over every table (indented ones included) finds 0 rows whose cell count differs from the header's | — |
| VS2-2 | minor | FIXED (§1.1, §13.2, §13.6 (1), §16, D-35, J-S28; §5.3) | **ACCEPTED** | §1.1 (l. 256–257): "All three rungs generate from M1 — a rung is a `ladder.json` row on the one pipeline, not a separate build — so M1's goldens, B-CITY runs, determinism tests and diagnostic side-by-side include METROPOLIS; M2b measures and tunes it"; §13.2 (l. 7720–7721, 7734–7735): "all three rungs from M1, because METROPOLIS generates from M1" and "the METROPOLIS sizes are reported from M1 and gate from M2b, which measures and tunes METROPOLIS"; §13.6 (1) (l. 8062–8063) "the panel covers all three rungs"; §16 M1 content (l. 8687) "at all three rungs — METROPOLIS is a `ladder.json` row on the one pipeline"; M2a exit (l. 8688) "METROPOLIS joins at M2b, which measures it"; M2b content (l. 8689) "METROPOLIS measured and tuned"; §5.3 cost rule (l. 4242) "at M2b, which measures METROPOLIS — it generates from M1"; D-35, J-S28. Grep: 0 hits for "builds METROPOLIS", "METROPOLIS generation exists", "which builds it" | — |
| VS2-3 | minor | FIXED (§15.1 FTG H2; §1.1; with NR-1: D-18, §15.2 O3 (d)) | **ACCEPTED** | FTG H2 (l. 8543): "§12 (beyond: client-side, no server round trip; the first map under 1 s for every TOWN and CITY and for METROPOLIS up to ≈ 14 200 buildings (≈ 48 000 people), ≈ 2.3 s at the 120 000 cap; model time within O3 (d)'s bars up to ≈ 4 500 / 17 700 / 58 800 people; both misses above declared for the owner's veto — D-18, §12.3, §12.5; VS2-3)"; §1.1 column head (l. 277) "model p95 at the target (§12.3's law inside the band; O3 (d) read over the band)" with cells "≈ 100 ms (92–110 ms)", "≈ 300 ms (265–340 ms)", "≈ 800 ms (724–880 ms)" and the paragraph *Budgets inside a rung* (l. 283–290); D-18 (l. 9236) and §15.2 O3 (d) (l. 8628) carry both knees. **Recomputed:** (100 − 20) ÷ 0.060 = 1 333, (300 − 40) ÷ 0.050 = 5 200, (1 000 − 100) ÷ 0.052 = 17 308 buildings; first map (1 000 − 120) ÷ 0.062 = 14 194; × 3.4 persons per building (§12.2) = 4 533 / 17 680 / 58 850 / 48 260 people — every figure matches. The H2 row and the summary state only the p95 knee: VS3-2 | — (the precision residue is VS3-2) |
| VS2-4 | minor | FIXED (§13.3, §14, J-S31; §6.5 (3), §9.2) | **ACCEPTED** | §13.3 (l. 7903–7908): "So are the inputs S13b reads from the renderer (VS2-4): every implementation of `ObstacleSource` and `RoleIndex`, every function they call and the S14 code that writes the display-list columns they read — `bbox`, the geometry ranges and `GeomTable`, `layer` and `z`, and the symbol extents …"; §14 dependency rules (l. 8306–8311): "CI finds that code as the import closure of those implementations and of the column writers, from the TypeScript program, so a module that joins it is linted without being listed"; §14 comment (l. 8353) "every implementation is under §6.5's allowlist lint (VS2-4)"; §6.5 (3) (l. 4677–4684) states the same rule and "a rotated symbol's extent uses `dmath`"; §9.2 (l. 6557–6560) "never `Math.cos` or `Math.hypot`". The scenario (a rotated symbol extent sized with `Math.cos` flipping a knife-edge collision) is now a lint failure | — |
| VS2-5 | minor | FIXED (§13.3, §13.6 (2), (9), §14) | **ACCEPTED** | §13.3 (l. 7865): "`type WaterSetting = 'none'\|'coast'\|'river'\|'coast+river';` // the one spelling of a water setting: B-CITY, the golden store, every record (VS2-5)"; `ShiftRecord.seeds[].water: WaterSetting` (l. 7871); `MilestoneRecord.parity: string /* plat/goldens/parity/<milestone>.json — the ParityReport the exit is judged on … */` (l. 7881); `D5Record.seeds[].water: Extract<WaterSetting, 'none'\|'coast+river'>` (l. 8124); §13.6 (2) "(`none`; `coast+river`)" (l. 8066). Grep: 0 hits for `river+coast`, "river + coast", "coast + river" | — |
| VS2-6 | minor | FIXED (§13.6 (2), §14, J-S29; §2.9 `Seed`, §6.1 Enter, §6.2 H128) | **ACCEPTED** | §13.6 (2) (l. 8069–8079): "**`H32(s)`** is defined exactly (VS2-6): the first 32-bit output word (h1) of MurmurHash3's x86 128-bit variant … run over the UTF-8 bytes of `s` with seed 0 … `H32("d5/M1/TOWN/none/0")` = 1221236157 and `H32("d5/M1/TOWN/coast+river/4")` = 3998735106 … MFCG seeds … reduced as 1 + (H32 mod 2 147 483 646) into 1 … 2³¹ − 2 … (check vector: `d5-mfcg/M1/TOWN/none/0` → 1965791931)"; §2.9 (l. 1344) "`type Seed = number;` // a u32 … records write it as its decimal string"; §6.1 Enter (l. 4368) "seed (seed + 1) mod 2³²"; §6.2 (l. 4437–4439) H128 "with seed 0"; D-15; J-S29. **Executed independently** (`docs/validation/bench/fixall_verify_scope_r3_h32_indep.py` → `.out`, this seat's own MurmurHash3, not the draft's): SMHasher verification 0xB0F57EE3 (x86_32) and 0xB3ECE62A (x86_128) reproduced; all three check vectors reproduced. The 1 … 2³¹ − 2 range is MFCG's Lehmer 48271 mod 2³¹ − 1 stream, recorded in `research/findings/profile-mfcg.md` (l. 797, 1180) | — |
| VS2-7 | minor | FIXED (judgment calls, preamble) | **ACCEPTED** | Preamble (l. 9263–9268): "(the record is `docs/validation/fix-all/r2-integration-log.md` §4, its conflict table)" and "(the record is `docs/validation/fix-all/r3-integration-log.md` §4, its conflict table)"; both logs' §4 is "Conflicts resolved" (r2 l. 85, r3 l. 87); round 1's "§3" is right (r1 l. 62). Scripted: 213 J-rows, 0 duplicates, every cited J-id and D-id defined, every J-range in the preamble complete (J-, J-K, J-DET-, J-P, J-R, J-S, J-I contiguous: 18, 27, 39, 40, 43, 32, 14) | — |
| VS2-8 | minor | FIXED (§17.1 (2), (9); `doc_checks.py`, `doc-checks-allow.tsv`; J-S32) | **UNRESOLVED** | The mechanism is concrete and runs: §17.1 (2) (l. 8772–8800) names the five checks, the allow file with written reasons and "The script exits non-zero while any hit is unreviewed, the pass does not land until it exits zero"; executed here: C1 5 (the `README.md` file name only, reviewed), C2 0, S1 0, S2 2 (external, reviewed), C3 80 over this area's changed sections with 0 unreviewed among them. **But the scenario is only half defeated.** VS2-8's scenario is "a round-3 **or amendment-pass** draft that pastes a reference palette passes the scan … while the rule reads as satisfied"; the rule binds only "the integration seat … at every integration pass that changes this document" (l. 8772–8773), and the amendment pass that runs next (`docs/HANDOFF.md` 6c: `workflows/04-amendments.js` over `docs/AMENDMENTS-2026-09-25b.md`) has no integration seat — its `amendments/apply` and `amendments/repair` lanes write `docs/ARCHITECTURE.md` directly, and neither prompt names the check (grep of the script: the clean-room ruling only). The round-2 required change (this seat's) said "integration scan" and was itself narrower than its scenario | In §17.1 (2) and J-S32 replace "the integration seat runs, at every integration pass that changes this document," with "every seat that writes this document — a fix-all integration seat, an amendment pass's apply and repair lanes, any finishing or repair seat — runs, before its change lands,"; and (for the program, not an area) add the command line to the prompts of `workflows/04-amendments.js` (apply, repair) and `06-fix-all.js` (integrate), each lane recording the counts in its output file |
| VS2-9 | minor | FIXED (§13.2, §13.8, §15.2 O9 (c), J-S4, J-S30; §7.3 item 7 (iv)) | **ACCEPTED** | §13.2 (l. 7801–7814): "Each nightly run draws **n = 800 regenerated scopes** … 400 block scopes and 400 district scopes … Cost ≈ 40 800 scope generations (800 × 51), ≈ 12.5 CPU-min"; *Why 800 scopes* (l. 7815–7832) with the executed numbers; §13.8 nightly row "(n = 800 scopes — 400 block, 400 district — × K = 50 references, ≈ 12.5 CPU-min …)"; §7.3 item 7 (iv) (l. 5208–5212), §15.2 O9 (c) (l. 8639), J-S4, J-S30 agree. **Checked:** the text's figures equal `fixall_scope_r3_o9c_n800.out` line for line (31 / 3 000, 15 / 1 500, 14 / 1 000; 2 000 / 2 000 ×4; 1 985 and 1 994 / 2 000 at ρ = 1; 500 / 500 ×2; 922 and 952 / 1 000 at n = 400); the model draws the four statistics of each generation from one shared component at ρ (the scenario's correlation, not a between-scope one); this seat's round-2 independent script at n = 800 gave 299 / 300 and 300 / 300 detection at ρ = 0.8 and 4 / 1 000 false failures — at or below the text's 1.0–1.4 %, so the calibration claim errs on the safe side; cost recomputed 20 400 × 6.6 ms + 20 400 × 30 ms = 12.4 CPU-min at §12.6's block (3 ms + 60 µs × 60) and district (≤ 30 ms) costs | — |

**Counts:** 11 items — **10 ACCEPTED**, **1 UNRESOLVED** (VS2-8, its amendment-pass half); none claimed INVALID or
STAGED-BY-OWNER.

## 2. Earlier FIXED items whose sections changed this round

Round 3 replaced §1.1, §13.1, §13.2, §13.3, §13.6, §13.8, §14, §15.1, §15.2, §16 and §17.1, rows D-15, D-18 and D-35,
the judgment-call preamble and rows, the staged list and the one-page summary, and added §0.9 (§0.8 lost only its
closing rule line) — diffed section by section against the integration seat's pre-round-3 copy (md5
`ca2e20669f557e6e6de113c069811fe0`). Every item this area accepted in rounds 1 and 2 whose landing lies in those
sections was re-checked against the new text; each landing phrase was also confirmed present by script. **None
regressed.**

| id | still holds | where it now lives (round-3 text) |
|---|---|---|
| GEO-12 | yes | §13.1 (2) constructive degeneracies, extended with round 3's carve, course-knot, neighbour-step and freeze fixtures; §13.8 PR "plus the whole constructive-degeneracy set"; fallback "the constructive set is never cut" |
| LC-19 | yes | §13.3 "**From M1 (LC-19).**"; §16 M1 content (records and stage-isolated tooling); *preview* until M4; N−1 / N−2 at M3a |
| SCL-18, SCL-19, SCL-21 | yes | §13.8 tiers and "never to raise the cap", D-34; §13.2 "once per sequence", the nine-size cost-model sweep with the 1.15 / 1.25 slope caps and ± 20 % fixed-scope rule, the split statistics record (core ≤ 4 ms at CITY) |
| FTG-16, MN-2 | yes | §16 M-1 FTG captures at BIG_TOWN and BIG_CITY; §13.6 (3) matched pairs (MFCG by building count, FTG at its population); D-31 (but see VS3-6 on the FTG pair count) |
| IMP-1, FTG-22 | yes | §17.1 (1)–(9) — (2) now scripted (VS2-8), (8) extended (NR-10), (9) unchanged; executed C1: none of the 36 identifiers occurs in the document |
| IMP-2 | yes | §16 effort table; recomputed: lines 136–182 + stage 2 14–18 = 150–200; milestone rows sum to 150–200 (script) |
| IMP-3 | yes | §16 order (M2a before M2b; M3a / M3b; M4b); D-35 reworded for VS2-2 only; J-S7 |
| IMP-4, IMP-5, IMP-10, NF-S4 | yes | §15.2 class tags on every letter; the first-weighted list; O1 (a), O3 (g); letters stated in full, stage-2 included — only the O3 (d) and O9 (c) cells changed |
| IMP-7 | yes | §13.2 campaign now n = 800 (VS2-9) with the same rank, tie-break, χ² and Holm rule; M3a exit; J-S4 |
| IMP-11 | yes | §13.4 scripted tasks (unchanged); §13.6 (1) M5 against NG with the owner as rater |
| IMP-12, IMP-13 | yes | §16 M-1 dispersions and M1 exit "(IMP-12)"; M1 exit's fusion gate re-run "with the reordered stages (IMP-13)" and both pre-decided fallbacks |
| IMP-16 | yes | §13.2 B-EDIT "the thirteen MFCG asks of §7.4 as scripted scenarios (IMP-16)" |
| COV-MFCG-L08, COV-FTG-A24, COV-FTG-A25, COV-FTG-B10, COV-FTG-C03, COV-FTG-C11 | yes | §14 app text unchanged (input scheme, accessibility, context help and guide, family-tree view); D-32; §13.2 documentation coverage |
| COV-VG-VN-010 | yes | §13.5 `referenceBuild` required (unchanged); §13.3 `ShiftRecord.cause.kind` still includes `'baselineShift'` |
| COV-VG-VN-088, AM-4 | yes | §1.1 bands, `LadderRouter`, the rung profile, per-rung modifiers with confirmation and fallback — kept verbatim around the VS2-2 / VS2-3 edits; D-33 |
| COV-FTG-OBS1, NF-P11, NF-S12 | yes | §15.1: only the H2 row changed; the nine `a:` rows, NG B8 and B1 as before; recount by script MFCG 40, FTG 46 + 9, NG 31 |
| AM-7 | yes | D-1–D-7 unchanged this round |
| NF-D12, N-22 | yes | §14 `ConcernId`, `StreamOpts`, `TOWN_ROOT`; the `labels ← render` rule, now extended by VS2-4 without changing its direction |
| N-23 | yes | §16 M2b (`lit` and `ink`'s close-up and building bands), M3b (ink-family variants), M5 (`hatched`), all four bands |
| N-24 | yes | §13.3 placement digests, PR on Node x86, nightly on five engines, "A digest that differs between engines is a determinism defect" |
| NF-S1 | yes | §13.3 records in `plat/goldens/`, `MilestoneRecord` now with `parity` (VS2-5); research-side copies |
| NF-S2 | yes | §13.6 (7) and §16's one rule; M2b, M4 and M5 exits each end on the unrated clause |
| NF-S5 | yes | §16 M-1 "every ⟨M-1⟩ number of §13.5 (NF-S5)"; §13.5's ⟨M-1⟩ rule unchanged |
| NF-S6 | yes | §13.2 and §16 M2a / M2b ("METROPOLIS joins at M2b, which measures it; NF-S6") |

Scripted consistency checks over the integrated text (executed): 35 delegated decisions, each defined once, every cited
`D-n` defined; 213 judgment-call rows, 0 duplicates, every cited `J-…` defined, every family contiguous; every `§n` /
`§n.m` / `II.n` pointer resolves (the external `proposal-product.md` §16.2 excepted, as before); every numbered sub-item
cited from the scope sections exists (§2.9 steps 3–4, §3.2 (1) and (8), §3.3 clear regions and pool step 1, §4.2 S1 (5)
and S3 (11), §5.1 (5)–(7), §6.5 (3) and (9), §7.3 (b), items 2 and 7 (iv)–(vi), II.1 (3)); every identifier §14's
stage-registration paragraph names exists in its section (`within: FaceRef | FaceId[]` §3.4, `townSide` §4.8, `reserve`
II.1, `fixedWings` / `corners` §2.6, `rosterPatch` §10.4); every `docs/validation/bench/` file the document cites exists.

## 3. New findings

Six new problems in the scope sections, all minor; none is a deferral. VS3-1 was introduced by round 3 (integration
C-3); VS3-2 and VS3-3 are residues of round-3 fixes; VS3-4 and VS3-5 concern round 3's new clean-room checks; VS3-6
predates round 3 and sits in a section round 3 rewrote. Each required change is a text change with its choice made.

| id | sev | owner | finding (with evidence) | required change |
|---|---|---|---|---|
| VS3-1 | minor | scope (J-I14, §16 M1 / M2a exits); companion rendering (§12.8's sentence) | **M1 is asked to measure what only M2a builds.** §12.8 (l. 7564): "M1's memory measurement below includes the load verification of the reference 300-edit CITY document"; J-I14 (l. 9484): "include the reference CITY document's load verification in M1's memory measurement"; integration C-3 says the same. But editing arrives at M2a — §16 M2a's content is "the document and log with the one replay fold … edits applied at once during load verification … (§2.9)" and §2.9 step 3 itself times the edit-during-verification bar at "*Measurement (M2a):* on the reference 300-edit CITY document". At M1 no edit exists, so no 300-edit document can be made and the measurement C-3 relies on cannot run; §16 lists it at neither milestone. (The determinism verifier's VD3-5 asks to add "one such edit during the reference document's verification" to "M1's memory measurement", repeating the timing.) | §12.8 and J-I14: "M1's memory measurement" → "M2a's memory measurement (the milestone that builds the document, the log and load verification)"; add to §16 M2a's exit criteria "memory at CITY while the reference 300-edit document is load-verified, with one edit applied during it, within §12.8's line at pool sizes 0 and 3 — or §12.8's fallbacks applied; an edit 100 ms after opening applies within its §12.6 cost + 10 ms (§2.9 step 3)"; M1 keeps §12.8's per-rung memory test of generated towns. VD3-5's fix takes the same milestone |
| VS3-2 | minor | scope (the one-page summary, §15.1 FTG H2, §1.1 *Budgets inside a rung*); companion rendering (§12 plain words) | **The owner-facing speed promise states the p95 knee as if it were the whole bar.** O3 (d) asks for "p50 / p95 / max per size class within budget" (§12.3, l. 7305–7306), and §12.3's table puts the max knee lower: "B ≤ 1 000 (≈ 3 400 people)", "B ≤ 4 000 (≈ 13 600 people)", "B ≤ 13 460 (≈ 45 800 people)" (l. 7314–7316; also D-18, §15.2 O3 (d), J-R38). But the summary (l. 64–65) says "Building the town itself meets the improvement plan's speed bars for towns up to about 4 500 people, cities up to about 17 700 and metropolises up to about 59 000", and H2 (l. 8543) "model time within O3 (d)'s bars up to ≈ 4 500 / 17 700 / 58 800 people". Scenario: the owner reads that a 4 000-person town meets the bars; by §12.3's own max clause (1.25 × (20 ms + 60 µs × 1 176) = 113 ms > 100 ms) its slowest allowed run does not. §1.1 says "for p95" but omits the max knee | Summary: "… meets the improvement plan's speed bars for a typical run in towns up to about 4 500 people, cities up to about 17 700 and metropolises up to about 59 000, and for every single run up to about 3 400, 13 600 and 46 000; …"; H2: "model p95 within O3 (d)'s bars up to ≈ 4 500 / 17 700 / 58 800 people and the max up to ≈ 3 400 / 13 600 / 45 800"; §1.1: add "and for the max up to ≈ 1 000 / 4 000 / 13 460 buildings (≈ 3 400 / 13 600 / 45 800 people)"; rendering makes the same edit in §12's plain words ("are met up to about 4 500, 17 700 and 59 000 people") |
| VS3-3 | minor | scope (§17.1 (8)) | **The list of published sources still misses seven methods the text uses** (NR-10's disposition says "every other published method the text now uses"). Used but not listed: D8 flow directions and flow accumulation (§2.3 `flowDir` "D8", l. 765; §4.2 S1; the hydrology receipt l. 791); a linear-time distance transform (§4.5 l. 3316 "one distance transform per driver class", §12.4 l. 7357 and 7364 "one linear distance transform"); the Gaussian as "an O(N) three-box blur" (l. 3316, 7357); the Merkle hash tree of the model digest (§6.2, D-28); a Tracery-class grammar engine and "syllable and Markov generators" (§10.4, l. 6881–6882, 6894); the pair-correlation function of the tree statistics (§13.2 l. 7730, §13.5 tree-scatter row). §17.1 (1) lets implementers read only "published algorithm papers"; without a named source the seat ledger of (7) cannot show where these came from — NR-10's scenario for these seven | Add to §17.1 (8), each with its section: D8 steepest-descent flow directions and flow accumulation (O'Callaghan and Mark 1984; §2.3, §4.2 S1); the exact Euclidean distance transform in linear time (Felzenszwalb and Huttenlocher 2012; §4.5, §12.4); the three-pass box-filter approximation of a Gaussian (Wells 1986; §4.5); the Merkle hash tree (Merkle 1987; §6.2); context-free grammar expansion in the style of Tracery (Compton, Kybartas and Mateas 2015) and character n-gram Markov chains (Shannon 1948) for §10.4's engine — ideas only, our own grammar and corpora; the pair-correlation function (Stoyan and Stoyan 1994; §13.2, §13.5) |
| VS3-4 | minor | scope (§17.1 (2) (ii)–(iii); `docs/validation/bench/doc_checks.py`) | **The pre-M-1 content checks do not look where most of the copied-content hazard lives.** (iii) compares 3-grams only with `research/findings/*.md`, and (ii) looks up colours in `research/`, `captures/**/README*.md` and `docs/` only; FTG's content database (`research/ftg-capture/presets.json`, also `captures/ftg/presets.json`) and the 1 600+ capture JSON bodies — grammars, palettes, building, profession and item tables, the hazard the clean-room memo names — are outside both. **Executed** (`docs/validation/bench/fixall_verify_scope_r3_cleanroom_checks.py` → `.out`, counts only): of `presets.json`'s 19 659 token 3-grams only 16.1 % occur in any findings file, and 343 of its 620 distinct name-like strings occur in none, so a draft that pastes an FTG building-type or profession list passes (i)–(iii) while §17.1 (2) reads as satisfied; the M-1 hashed scan would catch it only at M-1 | Extend (iii)'s corpus to the string keys and values, in document order and with purely numeric tokens dropped, of every JSON file under `research/` and `captures/`, and (ii)'s sources to `captures/**/*.json`; `doc_checks.py` updated to match. Measured cost and yield: 2 052 files, 44 s; over the whole current document the added corpus yields 3 runs, only 1 not already a findings run (ordinary phrasing), and 0 of the document's 36 colours occur in the capture JSON — so the extension adds no review burden today |
| VS3-5 | minor | scope (§17.1 (2) *Calibration*, J-S32) | **The executed calibration figure does not reproduce.** §17.1 (2) (l. 8795–8797): "1 196 of 26 236 token 3-grams are shared with the findings and they form 27 runs of five or more tokens"; J-S32 "(27 runs over §13–§17, executed)". **Executed** on the same text (the integration seat's pre-round-3 copy, md5 `ca2e2066…`) with the committed `doc_checks.py` rule: 26 236 and 1 196 reproduce exactly, but the runs of ≥ 3 shared 3-grams number **47** (45 distinct; per section 24 / 4 / 11 / 6 / 2); no threshold from 1 to 7 gives 27, and no receipt file for the calibration is committed. On today's §13–§17: 53 runs | Restate as "they form 47 runs of five or more tokens (45 distinct)" in §17.1 (2) and J-S32, and commit the run's output as a receipt (`docs/validation/bench/fixall_verify_scope_r3_cleanroom_checks.out` part C serves) |
| VS3-6 | minor | scope (§13.6 (2)–(3), §16 M-1) | **The side-by-side panel is fully specified only against MFCG** (pre-existing; §13.6 was rewritten this round). (a) FTG: PLAT draws "Five seeds per rung and per water setting (`none`; `coast+river`)" — ten per rung — while FTG's side "is taken from the captures in capture order", and M-1 takes "three of each" size; nothing says how many FTG pairs a milestone has, whether a capture is reused, or which water setting a capture's PLAT side uses — yet M2b's "the base at parity" gates on this panel against FTG at TOWN and CITY, and (3) says "one pair per seed shows the extramural suburb". (b) NG at M5: no seed formula and no matching rule for NG's side, although (2) promises "every list is reproducible from its formula" | (2)–(3): "Against FTG, a milestone has one pair per FTG capture at the rung's matched size, each capture used once, in capture order; M-1 takes each size's three captures with FTG's water options nearest to `none` (one) and `coast+river` (two), recorded in the capture README; each FTG pair's PLAT side is generated at FTG's population and the capture's water setting with seed `H32("d5-ftg/⟨milestone⟩/⟨rung⟩/⟨capture id⟩")`, and one of the three shows the extramural suburb; the pass rule's two thirds is counted per reference (FTG: 2 of 3 per rung and question). Against NG at M5: seeds `H32("d5-ng/M5/⟨template⟩/⟨i⟩")`, i = 0 … 4, reduced as 1 + (H32 mod 2 147 483 646) (NG's MINSTD state range, `docs/CONFIDENCE.md` NG A2), per template (area, street, square) at NG's `medium` size; each paired with a PLAT district of the same template opened at neighbourhood LOD whose building count is within ± 20 % of the NG hood's" |

**Scope-owned findings raised by other round-3 verifiers, confirmed here and not renumbered:** NP3-9
(`r3-verify-pipeline.md`) — the summary (l. 56–57) still says heights exist "so shadows and 3-D can be added later",
while §8.4 builds the shadow pass and §11.1 the glTF / CityJSON exports (the only deferral-sounding wording left in the
scope sections, §4); VD3-7 (`r3-verify-determinism.md`) — §14 declares `rebase(doc: Document, reason: RebaseReason):
Document` (l. 8365) with no `at`, while §7.1's `rebase.at` may be `h₀` behind the log head. **Scope mirrors of rendering
findings** (to be edited when rendering's fixes land, not counted here): NR3-1 (§16 M1's pool rule), NR3-2 (§14's
`TileBackend`), NR3-4 (§13.2 and §13.8's max-clause wording), NR3-5 (J-R17's per-building figure).

## 4. Deferral-language scan of the scope sections

Scanned: the title and summary, §0, §1, §13–§17, the delegated decisions, the judgment calls, the staged list and
Appendix A (2 079 lines), for *TBD, TBA, to be decided / determined, later, defer…, postpone…, open, until, future, not
yet, post-base, at M0, placeholder, verify at, pending, eventually, when needed, if needed, revisit, out of scope, left
for* — 132 hits, 13 of them on lines new in round 3. Every hit but one is: a subject on the owner's roadmap with its hooks
named (stage 2, stage 3, the village, sewers and islands, the evolution engine, corpus calibration, SettlementForge
inputs — the staged list names exactly these seven); a milestone-bound mechanism with its gate ("M3a does not exit until
it is fixed", "the pass does not land until it exits zero", "until M4's exit fixes output version 1"); the unrated-panel
rule; an owner-gated default flagged for veto (§17.3 / D-22 "Until the owner chooses"); history inside a decision or
judgment call ("CityJSON left for later", "over leaving it for later", "the seventeen deferrals"); the pre-M-1 check
("until then" — replaced at M-1 by a named scan); or ordinary words ("open waterfront", "later ring of wall", "later
cuts", "open a district"). **The one exception is NP3-9** (summary, l. 57, "can be added later"), already raised by the
pipeline verifier and confirmed in §3.

**A note outside this pass (not a finding), carried from round 2.** The owner ruled on 2026-09-25 that this module is
GPL-3 (`docs/AMENDMENTS-2026-09-25b.md` item 21); §17.3, D-22, J-S10 and §17.1 (1) still state the proprietary default
and the never-read rule for TownGeneratorOS. `docs/HANDOFF.md` 6c applies that file with `workflows/04-amendments.js`
after the fix-all pass — which is why VS2-8's trigger must bind that pass's lanes before it runs.

## 5. Receipts and method notes

* **Read in full:** every scope section of the integrated `docs/ARCHITECTURE.md` line by line — title and summary
  (l. 1–92), §0 (l. 94–226), §1 (l. 230–441), §13 (l. 7620–8232), §14 (l. 8233–8419), §15 (l. 8420–8659), §16
  (l. 8660–8743), §17 (l. 8744–8917), PART III (l. 9163–9207), the delegated decisions, the judgment calls, the staged
  list and Appendix A (l. 9208–9546); for the items' cross-references §2.9 `Seed` and load steps 3–4, §5.3's cost rule,
  §6.1 Enter, §6.2's H128 bullet, §6.5 (3), §7.3 item 7 (iv), §9.2's zoom-stop paragraph, §12 (l. 7206–7345) and §12.8
  (l. 7536–7590); the sources `r2-verify-scope.md` (§1–§5), `r2-verify-rendering.md` NR-9 / NR-10, `r3-scope.md` §0–§1
  and §3–§4, `r3-integration-log.md` (all), `ARCHITECTURE-VALIDATION.md` §R3; the other four round-3 verifications'
  new-finding tables (to avoid double counting). The rest of the 1.16 MB document (PART I §2–§12, PART II) was read only
  where a cross-reference led, as the round-2 verifier did; its areas' own verifiers cover it. Nothing outside the
  project; no reference source; no reference content copied (the measurements print counts only).
* **Executed (CONFIRMED):**
  1. Section-by-section diff of the scope sections against the pre-round-3 copy (`secdiff.py`, session scratchpad):
     changed / new / unchanged sections as listed in §2.
  2. `docs/validation/bench/doc_checks.py --sections "<this area's 17 changed section keys>"`: C1 5 (reviewed), C2 0,
     C3 80 with 2 unreviewed — both in §0.8, whose only round-3 change is a removed rule line (a date and a pointer,
     benign) — S1 0, S2 2 (reviewed). Own column-count check over every table: 0 bad rows.
  3. `docs/validation/bench/fixall_verify_scope_r3_h32_indep.py` → `.out`: an independent MurmurHash3 reproduces both
     SMHasher verification values and all three §13.6 (2) check vectors.
  4. `docs/validation/bench/fixall_verify_scope_r3_cleanroom_checks.py` → `.out`: parts A–C behind VS3-4 and VS3-5.
  5. Scripts over the text: D- and J-id integrity, pointer and sub-item resolution, §15.1 row counts, §16 effort sums,
     presence of every earlier item's landing phrase, deferral scan (132 hits classified), bench-file existence.
  6. Arithmetic recomputed: §1.1 / D-18 / §15.2 knees; the O9 (c) campaign cost.
* **PLAUSIBLE (reasoning only):** VS3-6's claim that three FTG pairs per rung is the workable count (it follows M-1's
  capture plan; more captures would cost days on the free allowance); VS3-3's choice of sources (each is the standard
  published form of the named method); the reading that VS2-8's "integration pass" does not cover workflow 04's lanes
  (from the lane names and prompts; the owner could rule otherwise).
* **Output shifts, stated.** None: this seat changed no design text, golden, digest or model output; it added three
  receipt scripts with their outputs under `docs/validation/bench/`.
