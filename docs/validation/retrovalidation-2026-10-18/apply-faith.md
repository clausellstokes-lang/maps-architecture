# Retrovalidation apply — faith family (lane retrovalidation/apply-faith)

Lane `retrovalidation/apply-faith` (Opus 5.5, high; J390, Fable-checked), landed 2026-10-18 05:25 UTC. Source of corrections:
`docs/validation/retrovalidation-2026-10-18/faith.verdict.json` (verdict PASS-WITH-CORRECTIONS; 67 corrections: 64
research on `research/sf/faith-system.md`, 1 research on `research/sf/lens-implications.md`, 1 record on
`docs/validation/retrovalidation-2026-10-18/rulings.md`, 1 design on `docs/volumes/V13-world.md`), read whole with its
22 rulings and summary. The family's file `research/sf/faith-system.md` (1,516 lines) was read whole before any change.
No git command was run; the host repository was not touched; no file was edited except the two named below.

## 1. Result

| File | Fragments | md5 before → after | Lines |
|---|---|---|---|
| `research/sf/faith-system.md` | 65 (64 research corrections + 1 notice line) | `3c73ffe80590f957e8958dda3a20b18b` → `65f01f67af355cc2418521a5b2a21497` | 1,516 → 1,516 |
| `docs/validation/retrovalidation-2026-10-18/apply-faith.md` | this record | — | — |

- Every one of the 64 faith-family corrections matched: each `old` occurred exactly once in the file as it stood before
  this lane and exactly once at the moment it was applied (applied in the verdict's order, C0…C66, by exact-match
  replacement); after the apply each `new` occurs exactly once. No adjustment was needed; nothing failed to match.
- The `old` of C50 and C63–C66 still occurs once after the apply by design: those corrections append a dated bracket
  (or sentence) after the unchanged old text, so the new text contains the old.
- Dated brackets: the corrections that the verdict wrote with a "[Fable-reviewed 2026-10-18: …]" record (C9, C54, C60,
  C61, C63, C64, C65, C66) carry it exactly as written in the verdict; none was added or dropped.
- Notice: the one line beginning "> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat" (line 3,
  "… seat research/sf-faith; …") was replaced by the verdict's `notice_replacement`, verbatim:
  "> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — conclusions hold; citations, quotes and the "strongest carrier"
  overstatement corrected in place (lane retrovalidation/faith; J392)". No other line in the file carries the notice
  now (grep: 0), and no other file outside `docs/validation/` carries the research/sf-faith seat notice (grep).
- Diff: 65 changed lines in 57 hunks, line count unchanged; the rest of the file is byte-identical to the pre-lane copy.
- Bundle: `python3 tools/bundle_architecture.py --check` → "UP TO DATE", exit 0. The bundle's sources are
  `docs/ARCHITECTURE.md`, `docs/volumes/INDEX.md` and the volumes; a research note is not among them, so this lane
  cannot stale it (the check is reported because it was run, not because it applies).

## 2. Not applied by this lane (not the faith family's file), with where each goes

| C# | Kind | File | Why not here | Owner |
|---|---|---|---|---|
| C57 | design | `docs/volumes/V13-world.md` (§5.9 (6) pressure row: "hostility carries hardest" → only an overlord's authority over its vassal carries harder, one way) | a design correction is the design lane's; the bundle `docs/ARCHITECTURE-FULL.md` regenerates from V13 after it | design apply lane |
| C58 | research | `research/sf/lens-implications.md` (faith row "war_front 0.72 (hostility carries hardest)" → "… hardest of the two-way carriers; an overlord's authority channel reaches its vassal at 0.82, one way)") | the file belongs to the lenses family, not the faith family; this lane edits only the faith family's file. The correction exists only in `faith.verdict.json` (grep: `lenses.verdict.json` carries no "hostility carries hardest" fragment), so the lenses apply lane must take it from here or it is lost | lenses apply lane (or the orchestrator) |
| C59 | record | `docs/validation/retrovalidation-2026-10-18/rulings.md` (J379.1 AMENDED text "(never flows on routes; hostility carries hardest)" → "… hardest of the two-way carriers, an overlord's authority over its vassal harder still, one way)") | the rulings record is not a faith-family file; likewise present only in `faith.verdict.json` (`rulings.verdict.json` carries no such fragment) | rulings apply lane (or the orchestrator) |

At the time of this record each of the three old texts was still present exactly once in its file (grep counts: V13 1,
lens-implications 1, rulings.md 1), so each remains applicable as written.

## 3. For J392 (journal rows are append-only; never applied)

- R22 / own finding V6: J380 (`docs/PROGRESS.md:439`), the session's summary of this note, uses two phrases that are the
  later lens design's, not the note's — "reuses the territory hinterlands instead of a second projection" and "draws the
  host's unconsumed religious hierarchy first" (lens-implications :202; V13 §5.9 (6)); the note never says "hinterland"
  (its §9.5 item 6 proposes the territory dots coloured by patron "clearly a projection", and §9.5 item 8 lists the
  hierarchy with no order). The verdict names it for J392 and makes no edit; no correction in the verdict targets
  `docs/PROGRESS.md`, and none was applied.
- R17 consequence (not a correction): the host-requirements document (J391 (6)) should carry §3.11's three defects among
  the six reads' §10 defects — a note for the journal, not a fragment.

## 4. Every applied correction (verdict order; line numbers in the file before → after)

| C# | Kind | Line before → after | Old once before / once at apply | New present once after | Reason (from the verdict) |
|---|---|---|---|---|---|
| C0 | research | 24 → 24 | 1 / 1 | 1 | F1 accepted: :52 is the years-scale founding comment; the week statement is :55. |
| C1 | research | 113 → 113 | 1 / 1 | 1 | F2 accepted (WRONG cross-reference): the stale 'stored verbatim' comments are §10.1 item 4; item 9 is the PHASE55/COUPLINGS distance row. |
| C2 | research | 118 → 118 | 1 / 1 | 1 | F3 accepted (UNSUPPORTED): deityAuthoring.js:24-49 is the base form; the file names no characterAxes, boon, bane or authoredTemper (grep) — the note's own §6.13 grep already said so. |
| C3 | research | 121 → 121 | 1 / 1 | 1 | F4 accepted: deityEffects.js:150-175 reads 'With disposition channels active'; the flag is false in FS and absent elsewhere (simulationRules.js:1041). |
| C4 | research | 841 → 841 | 1 / 1 | 1 | F5 accepted: the key is at :1041; :1037 is a comment line. |
| C5 | research | 1301 → 1301 | 1 / 1 | 1 | F6 accepted in the words: simulationRules.js:92-93 reads 'This is the ONLY'. |
| C6 | research | 1302 → 1302 | 1 / 1 | 1 | F6 amended in the range: the note's :90-100 is the comment block and stays; the verifier's :89-100 is off by one (:89 is settlementStrategyEnabled). |
| C7 | research | 1103 → 1103 | 1 / 1 | 1 | F7 accepted: FOLD:351 reads 'which is VACUOUS'. |
| C8 | research | 1462 → 1462 | 1 / 1 | 1 | F8 accepted: the file does not exist in the host; only code headers and docs cite it. |
| C9 | research | 131 → 131 | 1 / 1 | 1 | F9 amended: the mint is customRegistry.js:133-141, not deitySnapshot.js or deityCommitEmbed.js (grep); 'account-scoped' is kept because it is the code header's own word (:112), with the scope defined. |
| C10 | research | 1469 → 1469 | 1 / 1 | 1 | F9 consequence: §11.4 no longer lists the mint as unread. |
| C11 | research | 171 → 171 | 1 / 1 | 1 | F10 accepted: resolveConfig.js:74 is rng.randInt(5, 95); the default 50 is :192 and configSlice.js:29. |
| C12 | research | 172 → 172 | 1 / 1 | 1 | F10 accepted: the 55/68 thresholds test the derived religionInfluence, not the slider. |
| C13 | research | 174 → 174 | 1 / 1 | 1 | F11 amended: the marker's cites added; computeActiveChains.js:935-938 kept only with the words it supports (the export chain), which the sentence did not name. |
| C14 | research | 266 → 266 | 1 / 1 | 1 | F12 accepted: religionState.js:224-225 resets only patronChallengeTicks. |
| C15 | research | 303 → 303 | 1 / 1 | 1 | F13 accepted: traditionsKernel.js:791-795 keys on rec.deityRef, applied :471-482. |
| C16 | research | 348 → 348 | 1 / 1 | 1 | F14 accepted: the flip re-embeds the NEW patron. |
| C17 | research | 1510 → 1510 | 1 / 1 | 1 | F14 carried into the §12 M11 row. |
| C18 | research | 342 → 342 | 1 / 1 | 1 | F15 accepted: the gate is memoryState.causeLifecycle !== undefined \|\| anyCompromise. |
| C19 | research | 1078 → 1078 | 1 / 1 | 1 | F15 carried into the §8 row. |
| C20 | research | 496 → 496 | 1 / 1 | 1 | F16 accepted: the bare :1016 inherited religionState.js (794 lines). |
| C21 | research | 497 → 497 | 1 / 1 | 1 | F16 accepted: religionState.js:610 is a doc comment; the mint is religiousContest.js:610. |
| C22 | research | 475 → 475 | 1 / 1 | 1 | F17 accepted: the sink cause is pushed at religiousContest.js:958. |
| C23 | research | 708 → 708 | 1 / 1 | 1 | F18 accepted: severityFor is rg/propagation.js:269-275; :246-256 is impactId. |
| C24 | research | 1516 → 1516 | 1 / 1 | 1 | F18 carried into the §12 M17 row. |
| C25 | research | 291 → 291 | 1 / 1 | 1 | F19 accepted; constants verified at :131-133 (0.16, 0.6, 0.5). |
| C26 | research | 820 → 820 | 1 / 1 | 1 | F20 accepted: fitFactor = base >= 0 ? fit : 1. |
| C27 | research | 854 → 854 | 1 / 1 | 1 | F21 accepted: couplingRegistryGrammar.js:148 names it in a comment. |
| C28 | research | 855 → 855 | 1 / 1 | 1 | F21 accepted. |
| C29 | research | 454 → 454 | 1 / 1 | 1 | F22 accepted: the local-rank sense is code, not FOLD:427. |
| C30 | research | 455 → 455 | 1 / 1 | 1 | F22 accepted with the collision named: FOLD:427 and INFORMATION:342 give the belief axis different nouns; the note follows INFORMATION and the code. |
| C31 | research | 921 → 921 | 1 / 1 | 1 | F22 carried into §7.8. |
| C32 | research | 1292 → 1292 | 1 / 1 | 1 | F23 accepted: the niche statements are REWORK:30 and :38. |
| C33 | research | 743 → 743 | 1 / 1 | 1 | F24 accepted: no return/migration statement in the cited ranges (grep); COUPLINGS:856 and :1816 carry it. |
| C34 | research | 501 → 501 | 1 / 1 | 1 | F25 accepted: flip margins, cooldowns and caps are PHASE4:382-383. |
| C35 | research | 893 → 893 | 1 / 1 | 1 | F26 accepted: the bait is under ADDS at COUPLINGS:880-882; the status is FOLD §2. |
| C36 | research | 1308 → 1308 | 1 / 1 | 1 | F27 accepted: the phrase is not in COUPLINGS; :344 reads 'Spread moves at carrier reach;'. |
| C37 | research | 1309 → 1309 | 1 / 1 | 1 | F27 accepted; the citation added on the sentence's second line. |
| C38 | research | 904 → 904 | 1 / 1 | 1 | F28 accepted: ARCH_WC:697-705 is the deity-doctrine compliance paragraph. |
| C39 | research | 942 → 942 | 1 / 1 | 1 | F29 accepted: the mover asks only for settlements in food need; its six instruments carry no war relief. |
| C40 | research | 977 → 977 | 1 / 1 | 1 | F30 accepted: the sentence is mapProfile.js:228. |
| C41 | research | 1119 → 1119 | 1 / 1 | 1 | F31 accepted: RelationshipEdges.jsx:185-200 draws a plain line and a midpoint circle. |
| C42 | research | 88 → 88 | 1 / 1 | 1 | F32 accepted: PROGRESS.md:438 reads 'from dated host receipts'. |
| C43 | research | 1080 → 1080 | 1 / 1 | 1 | F33 accepted: aiGrounding.js:441 puts deriveRegionalGraph(settlement) into the grounding payload; regionalAuthority has no production consumer. |
| C44 | research | 1203 → 1203 | 1 / 1 | 1 | F33 carried into the §9.4 row. |
| C45 | research | 1172 → 1172 | 1 / 1 | 1 | F33 carried into the §9.3 row (the verifier did not name this third site). |
| C46 | research | 1296 → 1296 | 1 / 1 | 1 | F34 accepted (WRONG list member): faithPanelModel.js:11-14 says only that the model never reads config.latentPantheon. |
| C47 | research | 933 → 933 | 1 / 1 | 1 | F35 accepted with the preset membership verified (WAVES spread at simulationRules.js:900, :961, :1007, :1220; momentumEnabled :721). |
| C48 | research | 1350 → 1350 | 1 / 1 | 1 | F36 accepted: §2.5 names only the generic {deity} slot; the orders are historyGenerator.js:215. |
| C49 | research | 954 → 954 | 1 / 1 | 1 | F37 accepted: W_FAITH is :45. |
| C50 | research | 1314 → 1314 | 1 / 1 | 1 | F38 accepted: three of the five cited lines are already corrected in place. |
| C51 | research | 319 → 319 | 1 / 1 | 1 | F39 accepted: the 0.12 lives in deityStance.js. |
| C52 | research | 659 → 659 | 1 / 1 | 1 | F40 accepted: the bare range followed a heraldRouting.js cite (768 lines). |
| C53 | research | 1450 → 1450 | 1 / 1 | 1 | F41 accepted: the file has 1,049 lines. |
| C54 | research | 1248 → 1248 | 1 / 1 | 1 | Own finding V1 (WRONG as an absolute): the vassal bundle mints political_authority 0.82 and military_protection 0.70 overlord → vassal (rg/graph.js:679-680), both faith carriers (religiousContest.js:94-97, :336-342); the note's §6.2 table says so and §9.6 item 4 contradicts it. |
| C55 | research | 1365 → 1365 | 1 / 1 | 1 | Own finding V1 carried into §10.3. |
| C56 | research | 579 → 579 | 1 / 1 | 1 | Own finding V1 carried into §6.2's bullet, whose comparison names only the alliance and trade strengths. |
| C60 | research | 1215 → 1215 | 1 / 1 | 1 | Own finding V2: a map re-implementation of the internal reach would be a map-invented derivation under the four-class rule (lens-implications §1.5; V13 §5.8 (4)); the note's item implied both reaches were exported. |
| C61 | research | 582 → 582 | 1 / 1 | 1 | Own finding V3 (overstated inference): the sync at rg/graph.js:452-500 writes liveType = canonicalRelationshipLabel(...) onto every edge it builds or refreshes. |
| C62 | research | 583 → 583 | 1 / 1 | 1 | Own finding V3, the sentence's second half. |
| C63 | research | 1258 → 1258 | 1 / 1 | 1 | Own finding V5: the question the note left open was answered after it was written; the bracket keeps the note from reading as still open. |
| C64 | research | 1270 → 1270 | 1 / 1 | 1 | Own finding V5: answered by the owner's J382. |
| C65 | research | 1366 → 1366 | 1 / 1 | 1 | Own finding V5 carried into §10.3. |
| C66 | research | 1374 → 1374 | 1 / 1 | 1 | Own finding V5 carried into §10.3. |

## 5. Method (checkable)

A script read `faith.verdict.json`, took every correction whose `file` is `research/sf/faith-system.md` and whose
`kind` is `research` or `record`, asserted `text.count(old) == 1` on the current text before each replacement (and
recorded the count on the pre-lane text), replaced once, then replaced every line starting with the PENDING notice
prefix by `notice_replacement`, and finally checked `text.count(new) == 1` for every applied correction. The pre-lane
copy and the diff are in the session scratchpad (`retro/faith-system.before.md`, `retro/apply-faith.diff`).

Status: LANDED.
