# Fable review — lane fable-review/main/determinism (2026-09-27)

Reviewer: Fable 5.1 — the Fable touch the ten determinism fix-all rows waited for. Rows (grep of docs/FABLE-REVIEW-QUEUE.md
at the start, ten matches, all PENDING): A-fixall/draft-determinism-r1 … r5 and B-fixall/verify-determinism-r1 … r5. The
drafts are the stand-in fix-architect's dispositions of the DETERMINISM area's items round by round (docs/validation/fix-all/
r<n>-determinism.md, Parts 0, 1, 3, 4 read whole; Part 2's replacement text is superseded by the consolidation and is not
judged); the verifications are the Opus verifier's verdict rows (docs/validation/fix-all/r<n>-verify-determinism.md, read
whole). What is judged is the CURRENT design — docs/ARCHITECTURE.md at sha256 1c23190f… (13 026 lines, after the hand-fix
close of 2026-09-27 21:45) with docs/ARCHITECTURE-RATIONALE.md at 0be40dfd… (2 053 lines) — in this lane's sections §2.8,
§2.9, §5, §6 and §7, read completely before any row was judged. For every disposition the question is the Fable architect's:
does the mechanism chosen stand in the current text, and was it the right call against the original finding, the evidence
cited (re-derived where cheap), the critics' rulings and the owner's rules. Corrections to the design are blocks in
docs/fable-review/main/blocks-determinism.md (BLOCK PROTOCOL; a J-ROWS line and a RATIONALE-A entry per ruling); corrections
to a row's own file are appended review sections; queue statuses and `> PENDING FABLE REVIEW` markers are the reconciler's.

Standalone and clean-room rules kept: nothing outside /Users/cstokes/Desktop/Maps was opened; no captured bundle was opened
(this seat is not the code-readings seat). Scratch: /private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/fable-review/
(det-*.txt extracts and re-derivation scripts named in each row's section).

## PROGRESS ledger (one line per row)

| row | state |
|---|---|
| A-fixall/draft-determinism-r1 | done |
| B-fixall/verify-determinism-r1 | done |
| A-fixall/draft-determinism-r2 | done |
| B-fixall/verify-determinism-r2 | done |
| A-fixall/draft-determinism-r3 | done |
| B-fixall/verify-determinism-r3 | done |
| A-fixall/draft-determinism-r4 | done |
| B-fixall/verify-determinism-r4 | done |
| A-fixall/draft-determinism-r5 | done |
| B-fixall/verify-determinism-r5 | done |

## Verdict table

| row | verdict | one-line reason | corrections made |
|---|---|---|---|
| A-fixall/draft-determinism-r1 | CONFIRMED | All 47 dispositions stand in the live text (45 FIX, 2 STAGED-BY-OWNER with the decline hooks item 8 later made concrete; 0 INVALID, rightly); the three queue questions answer yes — the address / lineage split with survival versus succession is the right identity model (carrying lineage to a successor would undo every New random on its matched entities, while Regenerate (keep settings) re-mints identical lineage keys anyway), the one ordered fold with rebase and upgrade as events and O(scope) undo records is the right replay contract, and the Merkle digest over the eager model with kernel-maintained level digests keeps verification, goldens and the oracle sound at O(touched × depth). Two r1 mechanisms were superseded by round 3 as the process intended (the "append-only" lifecycle block → J-DET-33's seq-ordered block; "edits wait for verification" → J-DET-38); the bench figures the row reused (1 163 ms canonical hash, 0.73 µs string keys) are the ones the evidence-review lane re-ran. | none |
| B-fixall/verify-determinism-r1 | CONFIRMED | LC-7 was rightly UNRESOLVED (the r1 water row only re-traced; its five-part required change is now §7.3 (b), §5.2 F-REDERIVE, §5.3's deck row, §7.3 (a) 4 and item 7 (v)); NF-D1 and NF-D2 were rightly major; LC-1 and LC-5 rightly ACCEPTED (the token's derivation was the architect's choice under J-DET-1, and the "always changes" promise was correctly split off as NF-D6); all sixteen new findings were real and every one is closed in the live text, the nine outside this lane's sections re-checked by grep (rosterPatch as RowOps l. 9129, no stored StreamKey, "merged in lineage order", Confirm(token, fates, renames) l. 11037, dmath **build** l. 2107, no "document's hash", the render key l. 5883, §14's stream(concern, entity: Handle, opts) l. 11001). Deferral scan re-run on the live sections: 0 hits. | none |
| A-fixall/draft-determinism-r2 | CORRECTED | All 16 dispositions stand (LC-7's chain, NF-D1's events, NF-D2's pack copying and link refusal, NF-D4's undo by replay, NF-S10's work-limit laws, the rest); the queue's three questions: the `locked` default, the S6 vacated-land rule and cutting lesser ways at the bank are the right calls; link refusal and undo-by-replay are right. One gap no round caught: §7.4's independence check reads only touched sets and effective-scope faces, so an `editTable`, `editPreset`, `adjust` or town-wide `rerollLayer` can be undone after a later event derived content that read the changed input — the head-applied undo then differs from the log without its target and leaves derivation records citing slices the effective tables no longer hold, against the check's own promise ("keeps undo exact") and §7.6's invalidation promise. J-DET-26's figures re-derived (0.596 / 0.370 / 0.590 µs, within noise). | block B-1 (APPEND TO §7.4: dependence through the input layer; J-Fdet-1) |
| B-fixall/verify-determinism-r2 | CONFIRMED | VD2-1 was right and rightly major (§3.3's prepared-vertex contact rule refuses a channel dug before its decks are prepared); the §4.11-order rewrite it asked for is the live §7.3 (b), shore-authored edits not re-traced; VD2-6's seed-independence of the lineage hash re-derived from §6.3's key composition (no seed component; the render key now carries the seed); VD2-10's "names follow the address" was the right decision and stands with case (4); VD2-2, VD2-3 (seq arithmetic re-worked), VD2-4, VD2-5, VD2-7, VD2-8, VD2-9 all real and closed. The input-layer undo gap was missed here too; judged once under A-fixall/draft-determinism-r2. | none |
| A-fixall/draft-determinism-r3 | CORRECTED | All 17 dispositions stand: VD2-1's operator in §4.11's order with decks at `siteCrossings` sites (right against the carve's existing-crossing decks: a river moves, a canal is dug under standing streets) and its L1 batch preparing every vertex the L0 batch meets (§3.3 rules 1–2 checked at l. 2211–2274); NR-8's fold and undo semantics check sound (keep = a rebase at h₀ with the meanwhile edits folded after it; take = re-application through the fold; undoing the keep yields the take); VD2-10's carried names with ids-scoped rerolls consistent with §9.6's later-address rule and O9 byte identity; VK2-13's mean-value carry is computable under the allowlist (tan(α/2) from lengths and products). One precision slip in (b) 3 ("every other L1 edge … a setback or glacis line", which are L3) corrected. | block B-2 (APPEND TO §7.3: the crossed-edge list is of any level) |
| B-fixall/verify-determinism-r3 | CONFIRMED | VD3-1 was right and rightly major — no load-side root check existed (searched the r3 text's §2.9, §3.9, §6.2, §12.6 through the verifier's own greps and the live text's history) and a tampered chunk with `model.digest` untouched passed as verified; the live §2.9 step 3 recomputes the decoded state's tree before the first edit. VD3-2 was right and rightly major (carry-over made corpus selection a silent no-op; case (4) is the fix). VD3-3–VD3-8 real and closed (§14's `rebase(doc, reason, at?)` checked). Its deferral scan agrees with mine. | none |
| A-fixall/draft-determinism-r4 | CONFIRMED | All 8 dispositions stand: VK3-1's footprint declared by both batches ((b) 2–4), VD3-1's load recomputation before the first edit (J-DET-40 — the reasoning that the digest tree follows layers and containment while chunks follow partitions is sound for the network and content layers, so per-chunk stored nodes would restructure the tree; T(B) is a defensible open-to-editable bar; the measured ≈ 31–34 ms re-derived at 29.9 ms), VD3-2's persisted naming record with the pack-carried binding (J-DET-41: the least machinery that works in a rebased document, where provenance cannot be rebuilt; the r4 verifier's per-field slice refinement completed it), VD3-3's pack set, VD3-4's install rule, VD3-5's pool-size-0 path, VD3-6's declaration-based NF-P5, VD3-8's typed salts. J-DET-40–43 and the five restatements are in the index. | none |
| B-fixall/verify-determinism-r4 | CONFIRMED | VD4-1 was rightly major: no r4 text pinned the version that decodes and hashes a rebased base or a frozen view, so an ordinary kept town would open read-only after an ordinary upgrade (a persist → migrate lifecycle break); the live roots of record (J-DET-44) close it. VD4-2 (the fallback's gating), VD4-3 (the dormant naming record), VD4-5 (per-field slices), VD4-4, VD4-6 (the records digest), VD4-7, VD4-8, VD4-9 and VD4-10 all real and closed in the live text; 58 quotations and 94 anchors by script; the deferral scan agrees with mine. | none |
| A-fixall/draft-determinism-r5 | CONFIRMED | All 11 dispositions stand (VD4-1 – VD4-9, VS4-5, D5-1): the roots of record (J-DET-44) are found on every path that decodes a rebased base — load under the document's version, the verification replay, an upgrade (checked under `from`, re-rooted under `to`), the undo of an upgrade, a chain of upgrades, the undo of a rebase onto an earlier base, a `frozenImport` — because the document's version is always its latest rebase's `version` or its latest upgrade's `to`; the schema-encoded records digest (J-DET-49) is right because records are stored inputs, not a version's output; adopting the replay's state and re-applying the meanwhile edits on a records-only mismatch (J-DET-52) is the right cost, since an edit made meanwhile may have read a wrong record; the dormant record's confirmation on a freeing undo (J-DET-46) and `renames` on `EditBase` (J-DET-47) are right against silent renames. The records-digest figure re-derived (3.98 / 11.25 ms). The r5 draft's `§7.5` offer to "remove the pack" was the defect VD5-2 found; the consistency pass closed it with keep-only. | none |
| B-fixall/verify-determinism-r5 | CONFIRMED | 11 ACCEPTED rightly; 202 quotations, 91 anchors and 87 pointers by script; all seven new findings were real and — no round 6 having run — every one is closed in the live text by the consistency pass: VD5-1 (§7.3 item 4's confirmation-version rule with §7.5's `changedConfirmations`; right: pre-upgrade confirmations are compared only under the version that confirmed them), VD5-2 (keep-only; the removal offer gone), VD5-3 (the `frozenImport` runs case (4) and returns `confirm`), VD5-4 (partition and town nodes; the move rule), VD5-5 (a re-derivation that reproduces the leaf digest keeps the old record — sound, as invalidation by slice matches by key and both routes then write the same records; the tests compare both digests), VD5-6 (§10.4, pipeline's, confirmed by verify-pipeline-r3), VD5-7 (§16, scope's, confirmed by verify-scope-r3). | none |

---
## Judged once — the deferral scan and the bench re-derivations (cited from every verify row)

The five verifiers each scanned the determinism sections for deferral wording and found none. Re-run on the live text
of §2.8, §2.9, §5, §6 and §7 (2 427 lines, `det-arch-all.txt`): TBD 0, "to be decided" 0, "open question" 0, defer 0,
TODO 0, future 0; "postpone" 2 (both F-BUDGET-TIME's "postpone or resume a lazy tier", scheduling only), "not yet" 1
(F-ROUTE's "an operator whose water is not yet inserted", a batch order), "later" 33 and "staged" 15 (sequence words and
the owner's roadmap staging with its concrete hooks). No deferral in the lane's sections. CONFIRMED.

The three bench scripts the live text cites were re-run on the reference machine (Apple M1, Node 24.12.0): succession
matching 0.596 / 0.370 / 0.590 µs per entity (recorded 0.591 / 0.376 / 0.586; §6.3 quotes 0.60 / 0.59 / 0.38 / 0.59);
the load's model-tree recomputation 29.9 ms CITY / 89.7 ms METROPOLIS (recorded 33.5 / 101.0; §6.2 quotes ≈ 31–34 and
≈ 95–101 — the live figures sit at the recorded run's range, mine below it, both under the 150 ms bar); the records
digest 3.98 / 11.25 ms (recorded 3.99 / 11.44; §6.2 quotes ≈ 4 / ≈ 11). Every figure reproduces within noise. The red
team's figures the r1 draft reused (1 163 ms per canonical CITY hash, 0.73 µs per string stream key, ≈ 80 MB per
snapshot, 1.36–5.72 MB per gzipped raster) were re-run by the evidence-review lane (B21: 1 163 → 1 177 ms; 73 → 73 ms
= 0.73 µs) and are accepted on that lane's executed re-derivation, not re-run here.

---

## A-fixall/draft-determinism-r1 — the round-1 fix architect (docs/validation/fix-all/r1-determinism.md; Parts 0, 1, 3, 4, 5 read whole)

**Scope as found.** 47 items owned (16 ids-streams-hashes-ladder, 16 document-replay-undo-migration, 15 edit actions):
45 FIX, 2 STAGED-BY-OWNER (COV-NG-XA36 and its duplicate COV-VG-VN-090, the ruined state), 0 INVALID; 22 replacement
blocks (superseded by the consolidation, not judged); cross-area requests K-1–K-3, P-1–P-8, R-1–R-5, S-1–S-11 and the
requests received; J-DET-1 … J-DET-15; a CONFIRMED-versus-PLAUSIBLE part naming every budget it reasoned rather than
measured.

**(a) Do the mechanisms stand in the live text?** Every disposition was checked against §2.8, §2.9, §5, §6 and §7 as
read whole. GEO-2 (§5.1 (5), F-WORK, F-BUDGET-TIME), GEO-31 (§6.5 (3)–(4)), GEO-33 (§7.1's authoring boundary), GEO-34
(§6.3's distance matching and the left-child rule), GEO-41 (§7.7's continuous rows, §7.8's ε), LC-1 (§6.3), LC-3 (§6.4's
stage-isolated goldens), LC-4 (§7.1's consuming stage, §7.8), LC-5 (§6.1 reroll and attempt, §5.1 (6)), LC-8 (§7.2, §7.3
item 4), LC-9 (§7.7's precedence, One path), LC-10 (§7.4's ordered fold), LC-11 (`epoch` events), LC-13 (`rebase`),
LC-14 (§7.5's mapping and §6.4's retention), LC-15 (§2.9's `Recipe`, §6.4's link rule), LC-21 (§2.8's slices), LC-22
(`RowOp`), LC-24 (one source of truth), LC-25 (provenance outside the digest), LC-26 (existence plus flags), LC-27
(strokes composited once; warp as operation), LC-28 (Enter, `docId`, read-only on a newer schema), LC-29 (layer prefixes;
the sky-island distinctness fixture), LC-30 (proxies as the town's own S0–S4 runs; `entryMode`; `intent.surprise`), LC-31
(host tables as events; `hostContent`), SCL-1 (§5.3 scopes; §6.2 maintenance), SCL-5 (O(scope) undo records; checkpoints),
SCL-11 (fields recomputed; geometry once), SCL-12 (structured keys), SCL-16 (§7.8 proxy budgets), SCL-20 (history outside
the entity; the archive), VIS-11 (the plain roof), MFP-12 (the features strip), FTG-21 (≤ 320 B per building), the coverage
rows and AM-5 (the edit-target table and registry test) all stand. Two of r1's mechanisms were **superseded by round 3**,
which is the fix process working, not a defect of the row: SCL-20's "append-only lifecycle event block" became J-DET-33's
`seq`-ordered block from which an undo removes its target's entries (the append-only form could not satisfy §6.5 (9)'s
truncation identity, as VD2-3 showed), and LC-13's "edits wait until verification finishes or the user chooses" became
J-DET-38's edits-at-once with the verification replay beside them (NR-8). LC-7's r1 mechanism (a local operator per coarse
stage plus F-REDERIVE) was the right frame and was rightly found incomplete by the r1 verifier; round 2 completed it.

**(b) Were the calls right?** The queue's three questions.
1. *LC-1's identity model.* Right. The finding demanded an address that survives re-parenting, is never reused, and is
   not the stream key. The address / lineage split with **survival** (address and lineage kept for what is not
   re-derived) and **succession** (only the address, the name and its record handed to the anchor-matched successor) is
   the only split under which New random really re-rolls a scope: under the alternative, a successor that took the old
   lineage would draw the old numbers and undo the reroll for every matched entity, while Regenerate (keep settings) needs
   no lineage carry because it re-mints identical lineage keys (same unit, reroll and creation index) and matches them by
   anchor. J-DET-1's reason for lineage-hash tokens over a per-kind counter (order-independence under lazy and parallel
   minting) is sound; the `~k` and `dup` collision rules keep "never reused" and "no two live entities share draws". The
   hysteresis radii (building 0.5 m by centroid, plot 0.5 m along its frontage, block 2 m, cell 5 m, junction 1 m, gate
   and tower 2 m, bridge the 120 m search band) with class families and the greedy (distance, old id, fresh id) order are
   safe as a first table: the M1 measurement (≥ 99.9 % of addresses under 1 cm perturbation) has its doubled-radii-plus-IoU
   fallback, and item 31's later amendment (J-A31.73: a JOIN continues its largest member's lineage) is the one deliberate
   exception to J-DET-2 and is consistent with it. One consequence worth stating for readers: the lineage key holds no seed
   component, so a generated entity's address token is the same string in every town at the same derivation position; the
   design relies on this nowhere and renders `<docId>/<id>` at the boundary (§6.3), so it is harmless — and it is what let
   VD2-6 find the render-key defect (below).
2. *The replay contract.* Right. One ordered fold with drawn constraints at their log position (J-DET-6), epochs, rebases,
   upgrades, undo and redo as events, and O(scope) undo records with cost-driven checkpoints instead of the eight-deep
   snapshot ring (J-DET-8) — the live §7.4 carries it in depth; the one read-ahead (the creation prefix, J-A22.74) was
   added by amendments b and is declared. The r1 form of LC-13 (queued edits) was too conservative and round 3 corrected it.
3. *SCL-1's Merkle digest.* Right. The kernel hashes geometry once per level along each commit record's dirty set, entity
   leaves take the digests of the faces and chains they own, nodes sort children by address (stable across succession), so
   maintenance is O(touched × depth) and the CI oracle, the verification replay, goldens (model digest alone) and the
   locality oracle (leaf digests outside the scope) all read one maintained tree. The bars (5 % / 5 ms / 150 ms) each
   carry a fallback that never moves a golden because the root is a pure function of the leaves. J-DET-4's 1.2 s per
   canonical CITY hash is the red team's measured figure, re-run by the evidence lane.

**(c) The remaining twelve judgments** J-DET-3, 5, 7, 9–15 stand on the reasons recorded (all 54 J-DET rows are in the
index and Part A). J-DET-11 (lock > assignment) is consistent with the later dossier precedence (lock > dossier existence
> assignment, J-A20.71): the owner's item 20 placed dossier existence below the lock, which J-DET-11 anticipated.

**(d) Cross-area requests and what to re-check.** The requests were right and, where they touch this lane's text, landed
(`<docId>/<id>` at the boundary; the person key by household address; `Confirm(…)` in §14; the J-DET rows). S-9's D-26 –
D-28 rows are the scope area's; their presence is the integration lane's row, not judged here. Part 5's PLAUSIBLE list
was honest: of its budgets, three were later measured (matching, the load digest, the records digest — re-run above) and
the rest keep M0 / M1 measurements with pre-decided fallbacks, which the no-deferral rule admits.

**Verdict: CONFIRMED.** No correction.

## B-fixall/verify-determinism-r1 — the round-1 verification (docs/validation/fix-all/r1-verify-determinism.md, 124 lines, read whole)

**Scope as found.** 47 verdict rows (46 ACCEPTED, 1 UNRESOLVED: LC-7), 16 new findings (NF-D1, NF-D2 major; NF-D3–D16
minor), a deferral scan, CONFIRMED versus PLAUSIBLE.

**Re-derived verdicts (those that decided a design question).**
* *LC-7 UNRESOLVED* — right. The r1 water row re-traced the reach and carved; nothing re-sited decks, re-routed or cut
  ways, or re-based buildings after a terrain stroke. The five-part required change is the live text: (1) §7.3 (b) 2's
  `siteCrossings` on the changed reach with S4 and S5 chained; (2) §5.2 F-REDERIVE's way rungs (kept ways re-routed through
  a deck within the 1.4 × detour bound, others cut at the bank setback, stubs pruned, a deck over land demoted to an ordinary
  segment); (3) §5.3's "a way crosses water only on a deck, and a deck only over water"; (4) §7.3 (a) 4's exact re-basing;
  (5) item 7 (v)'s 0 decks over land, 0 off-deck crossings, 0 wings off the datum rule. The verifier's shape of the fix was
  adopted almost verbatim, then re-ordered by round 3 (VD2-1).
* *NF-D1 major* — right: the r1 text's "undo removes the last event" contradicted §11.3's grow-only log and AM-5's "edits
  undo"; §7.4 now makes undo and redo events (J-DET-16). *NF-D2 major* — right: packs by id and version and `hostContent`
  outside the link reopened LC-15's class; §2.9's `packs` block and §6.4's refusal rule close it (J-DET-17).
* *LC-1 and LC-5 ACCEPTED* — right. The red team asked for an address separate from the stream key, opaque and never
  reused; which token the architect derives it from is a design choice, and J-DET-1's reason is recorded. LC-5's stated
  failure (New random reproducing the committed attempt, rerolls consuming the ladder) is defeated by the reroll / attempt
  split; the verifier correctly refused to let the unmet "always changes" promise block acceptance and filed it as NF-D6,
  now §5.1 (6)'s content check (J-DET-20).
* *The fourteen minor findings.* Each is real and each is closed in the live text: NF-D3 (§7.6 reads persisted records
  first), NF-D4 (§7.5's undo by replay under `from`; the rebase record under the cap), NF-D5 (content-addressed chunks;
  saving always writes `model`), NF-D6, NF-D7 (§6.3's matching budget and fallback; §7.8's smoothstep-then-discrete),
  NF-D8 (`rosterPatch … ops: RowOp[]`, l. 9129), NF-D9 (`StreamKey` survives only as `BuildingInput`'s call parameter,
  l. 1021, never stored), NF-D10 (the render key, §6.1 and §8.1 l. 7542), NF-D11 (§7.4's `instance` row by lineage),
  NF-D12 (§14 l. 11001 keys by entity key with `StreamOpts`), NF-D13 ("merged in lineage order", l. 3229, 9543), NF-D14
  (`Confirm(token, fates, renames)`, l. 11037), NF-D15 (`dmath` **build**, l. 2107), NF-D16 (no "document's hash" remains).
* *Deferral scan* — agrees with the live re-run above.

**Verdict: CONFIRMED.** No correction. (The one thing this verifier, like every later one, did not see is the
input-layer undo dependence ruled under A-fixall/draft-determinism-r2; it was not in the r1 text, whose undo removed the
last event, so it is not this row's miss.)

## A-fixall/draft-determinism-r2 — the round-2 fix architect (docs/validation/fix-all/r2-determinism.md; Parts 0, 1, 3, 4, 5 read whole)

**Scope as found.** 16 items, 16 FIX (VK-13, LC-7, NF-D1–NF-D7, LC-17, N-1, N-17, N-18, N-29, NF-S9, NF-S10), 0 INVALID,
0 STAGED; 23 cross-area requests; J-DET-16 – J-DET-28; one measurement executed (the matching bench).

**(a) The mechanisms stand** in the live text: LC-7's chain (re-ordered by r3 but every element present), NF-D1's events
with sessions, independence and unshared truncation (§7.4), NF-D2's `packs` block and link refusal (§2.9, §6.4), NF-D3's
persisted-record-first invalidation (§7.6), NF-D4's undo by replay (§7.5) and rebase record under the cap (§7.4), NF-D5's
chunks (§2.9), NF-D6's content check (§5.1 (6)), NF-D7's matching routine (§6.3) and sweep fallback (§7.8), LC-17's
label row, N-1's S13a per event in replay mode (§7.3 item 2), N-17's F-LABEL rungs, N-18's registry-derived rerollable
set with a reader test (§6.1), N-29 (§2.1 → §8.4), NF-S9 (Measure → §9.5), NF-S10's `WorkLimitLaw` (§5.1 (5)), VK-13
(§6.5 (10)). The bench figure (0.4–0.6 µs per entity) re-derived: 0.596 / 0.370 / 0.590 µs.

**(b) The queue's questions.**
1. *NF-D1's independence rule.* Refusing dependent undos with the dependants listed is acceptable UX for a shared town — it
   is the only rule under which every client folds to one state and no one's work is silently reverted, and the session
   can undo its own dependants first while an owner undoes through a chain. But the rule as written is **not sound for
   exactness**: dependence is read from touched sets and effective-scope faces (dilated one ring), which see geometry and
   records but not the **input layer**. A later event that derived content reading a table row, a parameter, a pack or a
   town salt the target changed — `build` on an untouched plot after an `editTable` of the heights table; a `drawWay` after
   an `adjust`; a scoped regeneration that draws a name after a town-wide `rerollLayer(naming)` — has a touched set disjoint
   from the target's, so the check passes, the target's undo restores its own scope from its record (the `editTable` row
   says "never re-drawn"), and the later content stands as derived under the withdrawn input: the head-applied undo differs
   from the log without its target (the check's stated purpose, "keeps undo exact"), and the later entity's derivation
   record cites a slice hash the effective tables no longer hold, which §7.6's invalidation-by-slice promise ("exactly the
   entities whose recorded slices cite a changed slice re-derive") never repairs because an undo is not a table edit. The
   r2 draft itself listed this as PLAUSIBLE ("that the independence check makes a head-applied undo equal to the log
   without its target for every event kind"); the verifiers of rounds 2–5 did not test it. **Ruling (J-Fdet-1):** dependence
   is extended through the input layer — exactly, by recorded slices, for `editTable` and `editPreset`; conservatively for
   `adjust`, a pack-list `adjust` and a town-wide `rerollLayer`, which every later derivation reads. Block B-1. The
   alternative — accept a non-exact undo and say so — was rejected because it would leave a silently stale derivation
   record with no path that ever repairs it, against "nothing is lost silently".
2. *LC-7's chain.* The `locked` default (J-DET-24) is right: the terrain brush shapes ground, and a river move that
   re-routes roads is an edit the user should choose (`follow`). The S6 rule for vacated land (join the district across the
   longest boundary unless a wall or arterial separates them, then the next; ties by id; else the hinterland) is
   deterministic and reasonable. Cutting lesser ways at the bank rather than bridging each is right under the realism
   tiebreaker and MFCG / FTG behaviour (a bridge per crossing site, not per lane); the "sole connection to a gate or the
   plaza" clause keeps neighbourhoods reachable.
3. *NF-D2's refusal and NF-D4's undo by replay.* Right (J-DET-17, J-DET-18); round 5 refined the version under which a
   rebased base is checked (J-DET-44), not the rule.

**(c) Judgments** J-DET-16 – J-DET-28 stand (J-DET-23 rightly amended in r3). **(d) Cross-area requests** were right;
those that touch this lane's text landed (§14's `undo(doc, session, of?)`, `workLimits: WorkLimits`, §13.2's fixtures,
§16's M2a / M3a rows).

**Verdict: CORRECTED** — block B-1 (J-Fdet-1) in docs/fable-review/main/blocks-determinism.md.

## B-fixall/verify-determinism-r2 — the round-2 verification (docs/validation/fix-all/r2-verify-determinism.md, 131 lines, read whole)

**Scope as found.** 16 ACCEPTED, a re-check of every round-1 item in the rewritten sections, 10 new findings (VD2-1
major; VD2-2–VD2-10 minor), a deferral scan.

**Re-derived verdicts.**
* *VD2-1* — right, and rightly major. §3.3's `KernelTx.prepared` (l. 2212: "the vertices earlier batches of the same
  edit or stage placed for this batch's contacts with finer geometry … the only finer vertices it may meet") refuses a
  channel dug before its decks and cuts exist; the r2 order carved first. The verifier's two further gaps (new water faces
  inheriting district ownership; re-tracing a user-authored shore) were also real; the live (b) 1 makes the user's shore
  authoritative and (b) 6 moves water faces out of the district sets.
* *VD2-6* — right. Re-derived from §6.3: the lineage key is (arena key, unit lineage hash, stage, creation epoch, creation
  index, reroll[, dup]) rooted at the fixed town lineage — no seed — so lineage hashes repeat across seeds and a render hash
  keyed by them repeats tree and roof patterns from seed to seed. The live text keys decoration by the **render key** (the
  low 64 bits of the entity key, which mixes the seed key; §6.1, §8.1 item 5).
* *VD2-10* — right, and the recommended decision (names follow the address; S13a draws for entities without a
  predecessor or on a reroll) was the right one for the user and for O9 faithfulness; round 3's case (4) completed it.
* *VD2-3's arithmetic* re-worked: kept log T(s), U(s+1), R(s+2) → next s+3; truncated T(s) with `nextSeq` = s+2 and the
  redo's +1 → next s+3; user-created tokens hash the `seq`, so addresses agree. Right.
* *VD2-2, VD2-4, VD2-5, VD2-7, VD2-8, VD2-9* real and closed (harbour works by topology, J-DET-32; sessions, J-DET-34;
  registry-typed salts; §6.2 pointing at §2.9's `Recipe`; user corpora as packs and the provider-output refusal, J-DET-35;
  lattice-point chunk references and the three fallbacks, J-DET-36).
* *The re-check table* of round-1 items is thorough and its anchors are in the live text.

**Verdict: CONFIRMED.** No correction. The input-layer dependence (B-1) was outside every verifier's view; it is ruled
once above and not charged to this row.

## A-fixall/draft-determinism-r3 — the round-3 fix architect (docs/validation/fix-all/r3-determinism.md; Parts 0, 1, 3, 4, 5 read whole)

**Scope as found.** 17 items, 17 FIX (VD2-1–VD2-5, VD2-7–VD2-10, VK2-2, VK2-12–VK2-16, VP2-4, NR-8), 0 INVALID, 0
STAGED; 29 cross-area requests; J-DET-23 amended, J-DET-29 – J-DET-39.

**(a) The mechanisms stand**, each re-read in the live text: the water operator in §4.11's order ((b) 1–9), one-sided
step (0) with the S6 margin-band row (§7.3 item 2; J-DET-29), `WaterBody.controls` and `moveCourseKnot` with its
three-step binding (§7.1, §7.4; J-DET-30), point-anchored records carried by mean-value coordinates (§7.4; J-DET-31),
the wall's `base` knots and the whole-grid drainage fallback ((a) 2, 4), the Clipper2 shift list, harbour works (§5.3;
J-DET-32), the `seq`-ordered lifecycle block (J-DET-33), sessions (J-DET-34), user corpora as packs (J-DET-35), lattice-point
chunks (J-DET-36), names following the address (J-DET-37, later completed by case (4)), the declaration-based NF-P5 row
(J-DET-39, completed by VD3-6), edits at once during verification (J-DET-38, completed by VD3-1, VD3-4, VD3-5).

**(b) The queue's questions.**
1. *Decks at `siteCrossings` sites.* Right against the carve's existing-crossing decks, and realistic: a river that moves
   is bridged where its banks admit a crossing (S1's site rules — perpendicular to flow, ends on the banks), while a canal
   is dug under standing streets, which keep their crossings. §3.3's rules were checked (l. 2211–2274): the L1 batch places
   the `deck_end`, `gate_end` and `anchor` vertices, the L0 batch declares them `prepared` and meets no other finer vertex;
   structural finer edges inside the clear region are kept unless the L1 batch re-laid or cut them. F-ROUTE's extra-bridge
   rung sites a deck when no site lies within the detour bound, so a kept way is never left unrouted.
2. *NR-8's fold and undo.* Sound. Keep: the base becomes the snapshot at h₀ and the rebase event (`at = h₀`) is appended
   at the head, so a fresh client folds base.state → the meanwhile edits → the no-op rebase, exactly the session's state.
   Take: the replay's state at h₀ replaces `model` and the meanwhile events are re-applied through the fold with fates
   recomputed and undo records rebuilt. Undoing the keep (the latest live whole-town event) restores the recipe base and
   replays the kept log, which is the take state. An edit made meanwhile keeps a valid undo record in both branches.
3. *VD2-10's carried names.* Consistent with §9.6's uniqueness (the later address re-draws, listed) and with O9's byte
   identity (Regenerate (keep settings) carries every name; New random draws only for entities with no predecessor).
   VK2-13's claim that mean-value coordinates need only `+ − × ÷` and `sqrt` was checked: tan(α/2) = (|a||b| − a·b) / (a × b).

**(c) One precision slip** in the live (b) 3: "It splits every other **L1 edge** the new banks will cross that is no way —
a settlement-perimeter or district-boundary stretch, a setback or glacis line outside a re-traced run" — setback and glacis
lines are L3 (§5.3's NF-P5 row names them so). The operative rule is "every other structural edge, of any level". Block
B-2 states it; pass c's editors may fold it inline.

**Verdict: CORRECTED** — block B-2 (wording; no ruling, so no J row).

## B-fixall/verify-determinism-r3 — the round-3 verification (docs/validation/fix-all/r3-verify-determinism.md, 154 lines, read whole)

**Scope as found.** 17 ACCEPTED, 62 anchors of earlier items re-found, 8 new findings (VD3-1, VD3-2 major; VD3-3–VD3-8
minor), a deferral scan, and a "re-check first" list.

**Re-derived verdicts.**
* *VD3-1* — right, and the most important finding of the five rounds: the r3 load compared only the replay's root at h₀
  with the recorded `model.digest`, never the decoded state's own root, so a snapshot chunk altered with its content hash
  updated and `model.digest` left alone verified as sound, and the meanwhile edits stood on it. The live §2.9 step 3
  recomputes the decoded state's model tree and records tree before the first edit (J-DET-40) with §6.2 (iii)'s off-edit-path
  fallback; the load-digest bench re-run above (29.9 ms CITY) shows the cost the verifier feared is small.
* *VD3-2* — right and rightly major: with names carried through every re-derivation, selecting a user corpus or editing a
  naming table changed no name — a headline feature of amendment 5 and item 32's corpora did nothing. Case (4) with the
  persisted naming record (J-DET-41) is the fix and stands.
* *VD3-3* (the pack set) closed by §2.9's pack-set rule (J-DET-50); *VD3-4* by §2.9 step 4's install rule for clients
  (J-DET-42); *VD3-5* by the pool-size-0 path; *VD3-6* by the declaration-based NF-P5 check; *VD3-7* — §14 now reads
  `rebase(doc, reason, at?)` (checked); *VD3-8* by `Recipe.salts: Record<RerollableConcern, number>`.
* Its deferral scan agrees with the live re-run; its "re-check first" items were the right ones and are answered above.

**Verdict: CONFIRMED.** No correction.

## A-fixall/draft-determinism-r4 — the round-4 fix architect (docs/validation/fix-all/r4-determinism.md; Parts 0, 1, 3, 4, 5 read whole)

**Scope as found.** 8 items, 8 FIX (VK3-1, VD3-1, VD3-2, VD3-3, VD3-4, VD3-5, VD3-6, VD3-8), 0 INVALID, 0 STAGED; 18
cross-area requests; J-DET-40 – J-DET-43 with J-DET-23, 35, 37, 38, 39 and J-I14 restated; one measurement executed
(the load-digest bench).

**(a) The mechanisms stand** in the live text: (b) 2 computes the footprint last and (b) 3–4 both declare it, (b) 3
clearing by §3.3 rule 1 (VK3-1); §2.9 step 3 recomputes the decoded state's tree before the first edit and §6.2 (iii)
holds the off-edit-path fallback (VD3-1); `NamingRecord` in §2.8, case (4) in §6.3, the `tablePatch` binding in §10.4
(VD3-2); the pack set (VD3-3); the install rule for non-owner clients (VD3-4); the pool-size-0 path (VD3-5); the
declaration-based NF-P5 row with its registry test (VD3-6); `Recipe.salts: Record<RerollableConcern, number>` (VD3-8).

**(b) The queue's questions.**
1. *VD3-1's design.* Right. J-DET-40's reason — the digest tree is organised by layer and containment (root → site,
   network, districts → district → block → plot → building, content, identity, plats) while chunks follow static-index
   partitions — holds: a district's entity chunk does align with its subtree, but the network and content layers span
   every partition (ways, walls and water bodies belong to no partition), so per-chunk stored nodes would need a second
   tree keyed by chunk, and would change again under §2.9's block-group chunking fallback. A synchronous recomputation
   measured at ≈ 30 ms at CITY (re-run: 29.9 ms; 89.7 ms at METROPOLIS) against a 150 ms bar, with the checkpoint form
   as the fallback, is the simpler and sufficient choice. T(B) — "opening a saved town is never slower than generating
   it" — is a bar a user understands and the design can measure; its two-step fallback (lazy L2–L4 index partitions,
   output-neutral because every query result is sorted by its canonical key, then a declared amendment for the owner's
   veto) is pre-decided as the rule requires.
2. *VD3-2's naming record.* Right, and the least machinery that works everywhere: the alternatives — reading a name's
   slices from provenance (never persisted; unrebuildable in a document rebased from a kept snapshot or a frozen import),
   or recording only the corpus hash a name drew from (blind to grammar-row edits) — each fail one path. A record of the
   slices and the salt of the last draw, ≈ 20–40 B per name inside the per-building budget, plus a pack whose content
   carries the row binding so the recipe and link rule see it, closes fresh and rebased documents alike. The r4 verifier's
   VD4-5 (one slice per (row, field)) and VD4-3 (the dormant record) completed the granularity and the lifecycle; both are
   in the live text.
3. *Companion text.* The folded round-3 companions (NP3-1–NP3-4, VK3-2, VK3-3, VK3-9) were an integration matter; the
   live §7.3 (b) 3–4 and §7.4's warp paragraph read as one text with §2.2 rule 7's anchor ordinals and §2.6's
   wing-carrying rule, so the alignment happened.

**(c) Judgments and requests.** J-DET-40 – J-DET-43 stand on their reasons; the restatements are in the index and Part
A. The requests were right; those that touch this lane's text landed (§3.3's "(b) 2 … both declare it" pointer; §14's
`rebase(doc, reason, at?)`; §13.2's corrupt-cache and naming-input fixtures; §16's M2a and M3a rows).

**Verdict: CONFIRMED.** No correction.

## B-fixall/verify-determinism-r4 — the round-4 verification (docs/validation/fix-all/r4-verify-determinism.md, 169 lines, read whole)

**Scope as found.** 8 ACCEPTED, 94 anchors re-found, 87 § pointers resolved, 10 new findings (VD4-1 major; VD4-2 –
VD4-10 minor), a deferral scan.

**Re-derived verdicts.**
* *VD4-1* — right, and rightly major. The r4 draft's Part 1 for VD3-1 names no output version for the check, its step 2
  recomputed a frozen view's root "as in step 3" under the current version, and its step 3 checked `base.state` "the same
  way": a `keptSnapshot` town upgraded across a release that changed a field driver would open read-only — a break of the
  persist → migrate path for an ordinary document, not an edge case. The queue's question ("if pinned to the recording
  version, VD4-1 drops to minor") is answered: nothing pinned it in round 4. The live text pins every check to the version
  that recorded the root (J-DET-44: `rebase.version`, `upgrade.baseDigest`, the frozen view checked by chunk hashes only).
* *VD4-2* — right: under (iii) the r4 text offered "trust the saved town" before the checkpoint recomputation matched; the
  live §6.2 (iii) disables trust, keep, save, export, digest reads and bridged comparisons until the roots match (J-DET-45).
* *VD4-3* — right: a `setAttr(name)` dropped the record, so the kept and truncated logs diverged under a later corpus
  selection, against §6.5 (9); the live §2.8 keeps the record dormant and the freeing event runs case (4) (J-DET-46).
* *VD4-5* — right: hashing a corpus choice per row would re-draw a culture's district names when its street list changed;
  the live §7.6 hashes one slice per (row, field) (J-DET-48).
* *VD4-4* (`EditBase.renames`; `fates` on `editTable` / `editPreset`), *VD4-6* (the records digest, checked at load and by
  the replay; J-DET-49, J-DET-52), *VD4-7* (`UndoRecord.redo` keeps its packs), *VD4-8* ("the base is the recipe" in §6.4),
  *VD4-9* (§7.5 (2) copies packs `to` stops shipping), *VD4-10* (F-ROUTE's rung only sites the deck inside an operator
  whose water is not yet inserted) — all real, all closed in the live text.
* Its deferral scan agrees with the live re-run.

**Verdict: CONFIRMED.** No correction.

## A-fixall/draft-determinism-r5 — the round-5 fix architect (docs/validation/fix-all/r5-determinism.md; Parts 0, 1, 3, 4, 5 read whole)

**Scope as found.** 10 items FIXED (VD4-1 – VD4-9, VS4-5) plus D5-1 found by the seat (the unused rebase reason
`keptOldModel` removed), 0 INVALID, 0 STAGED; 14 cross-area requests; J-DET-44 – J-DET-51 new, J-DET-35 restated; one
measurement executed (the records-digest bench); 7 reviewed C3 allow rows.

**(a) The mechanisms stand** in the live text: `rebase.version` and `upgrade.baseDigest` with §2.9 step 3's root-of-record
rule and the frozen view checked by content hashes only (VD4-1); §6.2 (iii)'s gating (VD4-2); the dormant naming record
(VD4-3); `EditBase.renames` and `fates` on `editTable` / `editPreset` (VD4-4); per-field naming slices (VD4-5); the
records digest with the records-mismatch rule (VD4-6); `UndoRecord.redo` keeping its packs (VD4-7); "the base is the
recipe" in §6.4 (VD4-8); §7.5 (2)'s pack copy and `MigrationMap.packsSaved` (VD4-9); F-RIVER's `coast+river` (VS4-5);
`RebaseReason` with three values (D5-1).

**(b) The queue's questions.**
1. *Roots of record.* Every path that decodes a rebased base finds a root for its version, because the design keeps the
   invariant "the document's output version is always the `version` of its latest rebase or the `to` of its latest
   upgrade" and every upgrade of a rebased document records a `baseDigest`. Traced: an ordinary load (the latest rebase's
   `stateDigest` or the latest upgrade's `baseDigest`); the verification replay (the same); an upgrade (checked under
   `from` against the root of record for `from`, decoded under `to`, `baseDigest` recorded); the undo of an upgrade
   (replaying under `from`, it finds the root recorded before the upgrade); two upgrades in a row; a rebase onto an
   earlier rebased base and its undo (the earlier base's roots were recorded while it was current); a `frozenImport`
   (records the current version's root); the CLI (installs the document's own version). The split — model roots per
   output version, the records root per file schema — is right: a model root is the output of a version's packages, while
   derivation and naming records are stored inputs whose encoding belongs to the file, so any version can check them and
   a schema transform re-roots them (§6.2). J-I19's rule for an M1 file (no records root ever recorded → `model` dropped,
   the town regenerated from its recipe and empty log) loses nothing for a preview file.
2. *The records-only mismatch.* Adopting the replay's state at h₀ and re-applying the edits made meanwhile is stronger
   than the verifier asked and is the right cost: an edit made meanwhile may have read a wrong record (Regenerate (keep
   settings) reads derivation records; case (4) reads naming records and their salts), so replacing only the records of
   entities not re-derived would leave those edits' results computed from wrong inputs and replay ≠ session; the
   re-application runs at §12.6's edit costs in a writer-bug case that should never occur, and it is reported.
3. *A confirmation on a freeing event, and `renames` on `EditBase`.* Right. The alternative — re-draw silently at the
   `unlock`, `unassign`, `undo`, `redo` or `revert` and only report it — would make a name change without the user's
   confirmation, against §6.3's rule that case-(4) renames are confirmed like fates; the confirmation appears only when the
   freed name's list changed meanwhile, which is rare and is exactly when the user should see the consequence. One
   optional field on `EditBase` is the simplest superset for the events that can re-draw a name.

**(c) Judgments and requests.** J-DET-44 – J-DET-51 stand on their reasons; the 54 J-DET rows are in the index and Part A.
The requests were right; those that touch this lane's text landed (§14's `Confirm(token, fates, renames)`, §13.2's
fixtures, §16's rows). The r5 text's own cap-conflict wording ("removing the pack (an `adjust`) or keeping the old
model offered") was the defect the r5 verifier filed as VD5-2; the live §7.5 offers keep-only and says why removal cannot
help — the right resolution, because the pack set keeps every pack the log ever named, the case (a shipped pack whose
gzipped content passes 2 MB) is far outside what setting packs are, and the CLI still replays such a town exactly.

**Verdict: CONFIRMED.** No correction.

## B-fixall/verify-determinism-r5 — the round-5 verification (docs/validation/fix-all/r5-verify-determinism.md, 191 lines, read whole)

**Scope as found.** 11 ACCEPTED, 91 anchors and 202 quotations by script, 87 pointers resolved, 7 new minor findings
(VD5-1 – VD5-7), a deferral scan (52 ordinary hits), and a "re-check first" list. No round 6 ran, so each finding was
checked for closure in the live text.

**Re-derived verdicts and the closure of the seven findings.**
* *VD5-5 (the queue's first question).* Can session and replay records differ while the model digest is equal? In the r5
  text, yes: tree scoping rewrote the records of entities it reproduced unchanged (the `epoch` of the derivation moved),
  the graph route did not, and the tests compared model digests only. The live §2.8 makes records route-independent — "a
  re-derivation that reproduces the leaf digest exactly keeps the old record, as the dependency-graph route, which never
  touches it, does" — and §7.3 item 6, §6.5 (9) (replay = session and truncation identity on both digests) and item 7 (i)
  carry it. Checked sound: a kept record may then hold a slice hash older than the effective table's, but §7.6's
  invalidation matches a changed slice by its identity (table, kind, key), case (4) compares a naming record against the
  current effective slices and every draw rewrites its record, so nothing reads the kept hash wrongly, and both routes
  now write records only for entities whose content changed.
* *VD5-1 (the second question).* Should pre-upgrade confirmations be compared under the new version at all? No — the live
  §7.3 item 4 compares stored fates and renames only under the version that confirmed them (the `from` of the first live
  upgrade after the event, else the document's own), lists the differences once in the upgrade's diff
  (`MigrationMap.changedConfirmations`, §7.5) and compares them again on the upgrade's undo. Right, and it also covers
  fates, which had been stored since round 1 with the same latent re-report.
* *VD4-1 with C-2 / J-I19 (the third).* Sound; ruled above under A-fixall/draft-determinism-r5.
* *VD5-2* closed by §7.5's keep-only conflict (the removal offer is gone); *VD5-3* by §2.9 step 2 and §7.4's rebase row
  (the `frozenImport` runs case (4) over every unedited generated name and returns `confirm`); *VD5-4* by §6.2's records
  tree (one node per partition plus a town node for ways, walls, water bodies and districts; a batch that moves an entity
  between nodes re-hashes both) and §5.3's CI-only row; *VD5-6* (§10.4's restatement) is the pipeline part's, confirmed
  FIXED by docs/validation/consistency/verify-pipeline-r3.md; *VD5-7* (§16's M2a / M3a placement) is the scope part's,
  RESOLVED in docs/validation/consistency/verify-scope-r3.md §4.
* The 11 ACCEPTED verdicts each quote the live mechanism; VD4-1's acceptance traced the same paths I traced.

**Verdict: CONFIRMED.** No correction.

---

## Design impacts (what another part must change, as {part, impact})

* {scope, §13.2's B-EDIT list gains block B-1's independence fixtures: an `editTable` on a heights row followed by a
  `build` on an untouched plot, an `adjust` followed by a `drawWay`, a town-wide `rerollLayer(naming)` followed by a scoped
  regeneration that draws a name (each reported dependent; undone in order, the digests of the log without the pair), and
  an `editTable` followed by a `build` citing none of the changed slices (independent; the digests of the log without the
  target). §16's M2a row ("the independence check") needs no new words.}
* {scope, pass c (docs/AMENDMENTS-2026-09-27c.md) will plainly change current text in this lane's sections and should be
  applied as written, not re-decided here: item 41 removes `cut.side` and `cut.farSideAlt` from §6.1's concern registry
  and adds `cut.stop` after `cut.t`; item 51 corrects §5.1 (1)'s "VG's silent seed swap (4 of 27 attempts)" citation;
  item 52 adds the history-independence test to §6.5 (9); item 45 re-orders §5.2's F-CASTLE ladder cell and touches
  §7.1's `equalize` row. Block B-1 and B-2 touch none of those sentences.}
* {pipeline, none: §10.4's pack-retention sentence (VD5-6) is confirmed FIXED by verify-pipeline-r3, and §4.11's carve
  order agrees with §7.3 (b).}
* {kernel, none: §3.3's clear-region rules 1–2 and §3.9's lattice-point chunk references, read for VD2-1, VK3-1 and
  VD2-9, agree with §7.3 (b) and §2.9.}
* {rendering, none: the render key (§8.1 item 5) and §11.2's `confirm(h, token, fates, renames)` agree with §6.1 and §7.3
  item 4.}
* {model, none: §2.8 and §2.9 were judged here as this lane's sections; the kernel lane shares §2.9's storage
  subsections and its blocks, if any, should be assembled after B-1 and B-2, which touch §7.3 and §7.4 only.}
* {determinism, block B-1 is written as an APPEND so pass c's editors can fold it into §7.4's Independence bullet; block
  B-2 likewise into (b) 3.}

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed in this lane).** The live text of §2.8, §2.9, §5, §6 and §7 (2 427 lines) read whole before any
row was judged; every row file read whole in the parts its method names (the drafts' Parts 0, 1, 3, 4 and 5; the
verifications entire); the deferral scan re-run on the live sections (0 deferrals; the counts above); the three bench
scripts re-run on the reference machine with every figure within noise of its recorded output and of the live text's
quotation; the closure of every new finding of the five verifications checked in the live text — the nine outside this
lane's sections by grep at the lines cited above, the rest by the whole-section reading; the J-DET index (54 rows) and
Part A (54 rows) complete; §14's `rebase(doc, reason, at?)` and `Confirm(token, fates, renames)`, §3.3's `clearRegion`
and `prepared` rules and §3.9's lattice-point references present at the lines cited; VD2-3's `seq` arithmetic and VD2-6's
seed-independence re-worked from the live definitions; the D-26 – D-28 rows present in the Delegated decisions.

**PLAUSIBLE (this seat's reasoning).** Every judgment that a quoted mechanism defeats its finding's failure scenario —
no engine exists to run one; the ruling J-Fdet-1 (that the extended independence check is exact for tables and presets
rests on §7.6's oracle auditing that every consulted slice is recorded, which is itself a design claim measured at M2a);
the tan(α/2) form of mean-value coordinates as an allowlist computation (arithmetic, not run); the paths traced for the
roots of record (a reading of the text, which the §6.5 (9) fixture "checks under the recording version" will execute).

## Two records of this lane's own checks

* **The r5 draft's allow rows.** The seven C3 rows it appended to docs/validation/doc-checks-allow.tsv (l. 539–546:
  "as a side effect of", "has nothing to do with", "version is the current one", "it is not a model", "and a district
  name corpus", "matched to the new one", "size does not grow with") were reviewed: each is ordinary English phrasing of
  the design's own text shared by chance with a findings or capture file, none a list, table, grammar, palette or
  identifier — rightly allowed. CONFIRMED.
* **This lane's blocks under the document checks.** `doc_checks.py --doc blocks-determinism.md --heads ARCHITECTURE.md`:
  C1 0, C2 0, C4 0, S1 0, S2 0; C3 hits are the shared 5-gram "fable review 2026 09 27" (the phrase every review lane's
  blocks carry in their attribution, one reviewed allow row for the assembler) and, before rewording, two ordinary
  phrases inside B-1 and two in the ignored preamble, reworded so the assembler meets only the date phrase. The full
  three-copy run over the changed sections (§7.3, §7.4) is the assembler's, per §17.1 (2).
