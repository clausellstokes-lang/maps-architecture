# Retrovalidation 2026-10-18 — scripts family, validator record

Lane: retrovalidation/scripts (fable; J392). Fable 5.1, the validator seat under J390 (Fable judges and validates; Opus verifies and applies). Started 2026-10-18 01:00 UTC. Written as the work goes; the verdict is at the end.

## What I read, whole

- workflows/36-realm-review.js (211 lines), 36b-realm-review-continue.js (186), 37-faith-read.js (83), 38-systems-read.js (126), 38b-systems-read-continue.js (130), 39-plague-read.js (94), 40-lens-design.js (76), 41-lens-close.js (68), 42-lens-final.js (68), 43-lens-q.js (68): 1,110 lines, every line.
- The verifier's record docs/validation/retrovalidation-2026-10-18/scripts-verify.md, whole.
- docs/PROGRESS.md rows J375–J391; docs/HANDOFF.md's two top RESUME sections; docs/AMENDMENTS-2026-10-16j.md item headings 131–141 and item 140's text; docs/AMENDMENTS-2026-10-14i.md item 130's head; docs/lane-events.log's "(opus; J375)" LANDED lines.
- Host at 81f1cd96 (.git/refs/heads/master read as a file; no git command): the DESIGN_FMG_WEAVE* search, the src/domain vs src/domain/worldPulse paths, the document line counts the scripts state.
- Map side: research/sf/fp-physical-integration.md:489, research/sf/fp-realm-review.md:796-799, docs/validation/coherence/realm-m-critic.md gap 4, V13's kProsperity line, the four critic files' gap counts.

(continued below as the work goes)

## The rule I applied to corrections in scripts that already ran

A script's prompt text is the record of what each seat was fed; rewriting it would falsify that record. So: a finding in prompt text is FIXED by a dated header comment at the top of the script (outside every template literal, so a re-run feeds nothing new), naming the line and the correction; a finding in `meta` (name, description, phases — never fed to a seat, only shown by the harness) is fixed in place. Nothing a seat was fed changes. The `NOTICE` constants in the scripts stay: they are the record of what the outputs were told to carry, not a notice on the script.

## Rulings on the verifier's findings S1–S10

| id | verdict | reason |
|---|---|---|
| S1 | ACCEPTED (WRONG) | Confirmed: `find` over the host at 81f1cd96 returns no DESIGN_FMG_WEAVE*; fp-physical-integration.md:489 says "not in the clone"; fp-realm-review.md:798-799 records it absent. The brief told a seat to read a file that does not exist; the run's output was not misled. Fixed by header comment (36:109; 36b:108). |
| S2 | ACCEPTED (IMPRECISE) | ${OWNER_TR} carries (T1)–(T3); J378 relaunched 36 "carrying (T1)–(T3)". Header comment (36:110; 36b:109). |
| S3 | ACCEPTED (IMPRECISE) | Critic item 7 asks about (T1) and (T2) and then lists (T3)'s terms; the set is (T1)–(T3). Header comment (36:209; 36b:184). |
| S4 | REJECTED (shown INVALID) | The sentence says "the way items 131–141 quote the owner", i.e. verbatim with typos kept. Every one of 131–141 quotes the owner verbatim; item 140 does too ('The owner: "we are liable to finish M0 in the next few days, before we commit that, I wanted it to know what it needs to have"', file j:206-208), inside a SESSION RULING heading. The claim is about the form of quotation, not the heading kind, and it holds as written. No correction. |
| S5 | ACCEPTED (IMPRECISE) | J380 (PROGRESS.md:439) records "diety" twice; 37:15 writes "deity" twice. The owner's words are not re-judged; the session's transcription altered them. Header comment (37:15). Whether research/sf/faith-system.md carried the altered spelling is the faith lane's. |
| S6 | ACCEPTED (IMPRECISE) | 38 has four SUBJECTS and its implications prompt says five systems; 38b's says six; the meta says three. Fixed in place in `meta` (38:8; 38b:8). |
| S7 | ACCEPTED (IMPRECISE) | 38b runs one live reader (38b:86-91) and replays eight from ${A.dir}/<key>-reads.json (38b:100); its own description (38b:3) says so. Fixed in place in `meta` (38b:5). |
| S8 | ACCEPTED (IMPRECISE) | Confirmed by `ls`: src/domain/{supplyKernel,migrationKernel,peaceReasons,warSeatBooks}.js do not exist; all four are in src/domain/worldPulse/. A reader greps and finds them, so the outcome is unharmed. Header comment (38:47; 38b:61 [Fable-reviewed 2026-10-18 (confirm-scripts): 38b:48, not :61 — line 61 is the population subject line; applied with 48]). |
| S9 | ACCEPTED (IMPRECISE) | ${NFILE} is file o/p/q; the reviser prompt says "file n" (copied from 40:60). Harmless: Review records sit in o:1175, p:653, q:882. Header comment (41:52; 42:52; 43:52). |
| S10 | ACCEPTED (IMPRECISE) | CONTEXT's INPUTS line is 40's, stale for 41–43; each design prompt corrects it but the reviewer, apply and critic seats get only CONTEXT. Header comment (41:20; 42:20; 43:20). |

## What the verifier could not see — my own findings

| id | where | finding | verdict | fix |
|---|---|---|---|---|
| F11 | workflows/40-lens-design.js:3 (meta description) | "the seven lenses (plague first)". J384 (8)'s build order names eight (plague; territory, patrols; trade, populations; religion; prosperity, alignment); the script's own item (D) lists eight; file n item 811 is "The eight lenses"; V13:53, :356 say eight. | IMPRECISE | in place: "the seven lenses" → "the eight lenses" |
| F12 | docs/HANDOFF.md:30-31 | The script column reads "—" for wf_a7c82671-f52 and wf_868a6476-905; J383 names "the continuation workflows/38b" and J381 names workflows/39-plague-read.js. (The verifier recorded this as an aside; under the no-deferral rule it is a finding with a fix.) | IMPRECISE (record) | in place: the two "—" cells → the script names |
| F13 | workflows/36-realm-review.js:40 (CONTEXT) | The owner's review ask is quoted ("comprehensively read and review [SettlementForge's] simulator … to better refine your approach to the FMG / the realm integration") and is recorded NOWHERE else: not in J377, not in HANDOFF, not in fp-realm-review.md. The owner's words are the owner's; the gap is in the record. | record gap | no edit to the script; J392 should carry the quotation so the record does not depend on a workflow file. |
| F14 | workflows/36:27 / 36b:26 (OWNER_TR reading) | "scaled by its prosperity band" — the session's reading of T2's "exponential to … prosperity" was only half honoured; the run's own critic (realm-m-critic gap 4) caught it and J385 ruled log-linear on J384 (1)'s relative rung. The script text is the historical input; V13:959 and :1100 already carry the ruling. | reading superseded (not a script error) | one line in the header comment |

Checked and found holding (beyond the verifier's 490): 40 (B) against J384 (1)–(5), (11); 40 (C) against J384 (7), (9), (13) and lens-implications §4 (one-word-one-meaning :457, polarity :461); 40 (D) against J384 (8), (10), (12) and lens-implications §2 (footprint :207, :284, :289; hop by hop :110); 40 (G) against J385 (gaps 3, 4, 5, 14, 15) and realm-m-critic.md:63-67 (1.1^(rung−3) over 0..6 gives the same seven values as 1.1^(relative rung) over −3..+3); 41:101 against J386 (gaps 6, 7) and J380's words ("the flow of trade/caravans based on individual imports, exports, production, consumption, of goods and services"; "local and global diety rankings and a global piety system", both verbatim in 41); 42:25 against J387; 43:93 against J388 and J389 (43's paraphrase does not carry J388's wrong parenthesis, which J389 corrected); 36b:112 against fp-realm-review.md:89-90 (127 kept, none refuted, 36 missed); file m items 659–661 carry (T1)–(T3) verbatim (m:85, :108, :128); the seven preset names and LivingWorldGates.jsx exist in the host; the 15 document line counts in 37/38/38b/39 are exact (wc); fp-simulator.md 1,098; 36's eight DIMS, 37's six SLICES, 39's two slices match their meta. No script sets a model; "Opus" rests on J375 and the notices, as the verifier said. No script carries a design statement of its own that the texts lack: the manager's reading is labelled the session's and "test it, do not assume it", was tested by eight analysts and verifiers, and what survived is ruled in fp-realm-review.md §4 and V13 (judged in the realm lane); 40's elaborations trace to J384/J385, lens-implications and the critic files.

## Rulings table (every session reading or ruling the scripts make)

| id | where | ruling | verdict | reason | consequence |
|---|---|---|---|---|---|
| R1 | 36:25-37; 36b:24-36 | "THE MANAGER'S REFINED READING" of (T1)–(T3) | UPHELD as the tested input; AMENDED in one clause | Matches J377 (b) and J378's readings; its extensions (anchors as PLAUSIBLE, reinforcement bound, gates from the weighted partition, hinterland/realm split, W8 as the projection) were handed to analysts to test and are ruled in J-RR rows. The clause "scaled by its prosperity band" is superseded by J385: log-linear on the relative rung (J384 (1)). | None for the design texts (V13:959, :1100 carry J385). Header comment on the script. The J-RR rulings themselves are the realm lane's. |
| R2 | 36b:23 | The J382 paraphrase | UPHELD | Matches J382 (a)–(c) term for term. | none |
| R3 | 36:21; 36b:19 | File m's owner-rule items quote the owner "the way file j items 131–141 quote the owner" | UPHELD | See S4: true as written. | none |
| R4 | 37:15 | Transcription of J380's words | AMENDED: "deity" → "diety" (twice), as J380 records | The owner's words are never re-judged; the session's transcription changed them. | Header comment; the faith lane checks the note. |
| R5 | 40:27-33 | (A)–(G) carrying J382, J384 (1)–(13), J385, incl. "kProsperity = 1.1^(relative rung)" and "the settlement-strength order (a PolityFacts field the host sends)" | UPHELD | Each traced (above); 1.1 is realm-m-critic gap 4's fix adopted by J385; the PolityFacts carriage entered V13 (:342, :961, :1859) through file n's reviewed application. | none |
| R6 | 41:101 [Fable-reviewed 2026-10-18 (confirm-scripts): 41:25 as run]; 42:25; 43:93 [Fable-reviewed 2026-10-18 (confirm-scripts): 43:25 as run] | "no new owner question — the owner delegated it and J386 rules it"; "do NOT take the critic's alternative" (J387); "Q4 … the owner's own word NOT delegated" (J388) | UPHELD as faithful carriage | Each matches its J-row. The rulings J386–J388 are judged in the rulings lane, not here. | none |
| R7 | 36b:112 | "replayed from the journal of wf_e54a90fb-43c: … 0 refuted; 36 missed" | UPHELD | fp-realm-review.md:89-90. The journal itself is outside the repository (not checked, as the verifier said). | none |

## Corrections (file | old | new | reason)

See the structured output; summary:
- 36, 36b, 37, 38, 38b, 41, 42, 43: a dated header comment before `export const meta` carrying S1/S2/S3/F14 (36, 36b), S5 (37), S8 (38, 38b), S9/S10 (41–43).
- 38:8, 38b:5, 38b:8, 40:3: `meta` text fixed in place (S6, S7, F11).
- docs/HANDOFF.md:30-31: the script names (F12).
- J392: carry the owner's review ask quoted at 36:40 (F13); name nothing as a wrong J-row (none found in this family).

## Verdict

PASS-WITH-CORRECTIONS. Every script did what its J-row and HANDOFF row record (seats, stages, items, numbering, gap counts, rulings carried, LANDED lines); the ten verifier findings reduce to nine accepted (one WRONG, eight IMPRECISE; S4 rejected) plus two of mine (F11 meta, F12 record) and one record gap (F13); no script carries a design statement of its own that the texts lack; nothing in the family misleads the design.

Notice replacement (the family carries no notice of its own; this line is the family's verdict, recorded here):
> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — ten scripts ran as their J-rows record; one wrong host path (a file absent at 81f1cd96), ten imprecise meta/prompt statements, no design statement of their own (lane retrovalidation/scripts; J392)

LANDED 2026-10-18 (see docs/lane-events.log).
