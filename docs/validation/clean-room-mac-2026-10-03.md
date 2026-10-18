# Clean-room re-check on the owner's Mac — 2026-10-03

> PENDING FABLE REVIEW — written by opus for lane `catchup/cleanroom` (the catch-up run of J157). The authoritative re-run of
> `docs/validation/bench/doc_checks.py` with the full reference corpus, replacing the provisional cloud runs of 2026-09-30 to
> 2026-10-02, whose output carried the "reference corpus INCOMPLETE" warning. Result file: `clean-room-mac-2026-10-03.json`.

## Outcome

**No real copy was found in any document.** Every unreviewed hit was read against the corpus file that holds it, and every one
is a coincidence: ordinary English; our own wording that our own research files repeat; section pointers and table numbers; a
reference mechanism already restated in our own words under §17.1 (1)'s `(code)` provenance; SettlementForge's own field
names and vocabularies (the owner's product, not a reference); a creator's stated idea cited for traceability; and one palette
value whose only corpus occurrence is a number in a browser trace. **No document was edited**, so nothing was backed up and the
single-file bundle needed no regeneration (`python3 tools/bundle_architecture.py --check`: UP TO DATE).
**Every run now exits 0** (round 8): the base three ways, the twelve volumes, INDEX and SUMMARY. Rounds: round 0: 0 of 17 runs exit 0, 3295 distinct unreviewed pairs; round 1: 5 of 17 runs exit 0, 430 distinct unreviewed pairs; round 2: 10 of 17 runs exit 0, 43 distinct unreviewed pairs; round 3: 10 of 17 runs exit 0, 14 distinct unreviewed pairs; round 4: 17 of 17 runs exit 0, 0 distinct unreviewed pairs; round 5: 12 of 17 runs exit 0, 6 distinct unreviewed pairs; round 6: 17 of 17 runs exit 0, 0 distinct unreviewed pairs; round 7: 2 of 17 runs exit 0, 71 distinct unreviewed pairs; round 8: 17 of 17 runs exit 0, 0 distinct unreviewed pairs.

**Sections the M0 build reads (§1–§3, §6, §12–§14, §16, §17): no real copy sat in them, or anywhere else**, so the build's
implementer seats have read no copied text.

The content checks were also carried where the checker is blind (*Where the checker does not look*, below): the capture
bodies it cannot parse and the reference prose it never reads. Neither scan found a copy.

## Method

* **Machine and corpus.** The owner's MacBook Air (M1, macOS 14.7.8, Python 3.9), with `captures/` and `research/patreon`,
  `devlogs`, `ftg-docs` and `external` present (symbolic links into `/Users/cstokes/Desktop/research/`); no run printed the
  corpus-incomplete warning. Across the rounds the checker read 10 100–10 110 colour files, 9 626–9 632 JSON files,
  916 788–935 862 corpus 3-grams and 478–706 C4 lists; the spread is corpus growth by sibling lanes (below).
* **What was run** — the coherence pass's own invocations (workflows/18-coherence.js; `work/assemble-r7y/checks.py` and
  `volchecks.sh`): the base three ways — whole, `--sections` with its 34 `#` and `##` heading keys, and with its eight `#`
  keys — and each of the twelve volumes, `docs/volumes/INDEX.md` and `docs/volumes/SUMMARY.md`, whole, with
  `--heads docs/ARCHITECTURE.md`. Seventeen runs a round, four at a time (scratchpad `catchup/cleanroom/tools/runall.sh`).
* **Reading every hit.** A script that rebuilds the corpus exactly as the checker does (`tools/attrib.py`) found, for every C3
  run, the files holding its 3-grams and the longest sub-run any single file holds contiguously, with the corpus context; for
  every C4 line, every list holding its words. Every hit was then read, our sentence beside the corpus text, in review packs:
  round 0's `r0pack-sub.txt` (515 runs with a single-file sub-run of five or more tokens, 218 of them held whole),
  `r0pack-stitched.txt` (2 702 runs no single file holds five tokens of) and `r0pack-c4.txt` (59 lines), and the same for each
  later round. The decisions are in scratchpad `decisions-sub.tsv` and `decisions-sub-b.tsv` and in each allow row's reason.
* **Allow rows.** Each reviewed hit has a row in `docs/validation/doc-checks-allow.tsv` in the established form — check id,
  exact text, a written reason naming the document line and the corpus source — in blocks headed `catchup/cleanroom`. A row is
  keyed by check and text, so one row can serve several documents.

## Counts per document and check, before and after

Each cell is *hits / unreviewed*, round 0 (before) → the final round (after).

| run | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|
| `ARCHITECTURE.md` (whole) | 5/0 → 5/0 | 2/1 → 2/0 | 1890/62 → 2040/0 | 24/15 → 26/0 | 0/0 → 0/0 | 318/0 → 318/0 | 1 → 0 |
| `ARCHITECTURE.md` (34 `#`/`##` keys) | 5/0 → 5/0 | 2/1 → 2/0 | 3663/122 → 3954/0 | 48/30 → 52/0 | 0/0 → 0/0 | 318/0 → 318/0 | 1 → 0 |
| `ARCHITECTURE.md` (eight `#` keys) | 5/0 → 5/0 | 2/1 → 2/0 | 1890/62 → 2040/0 | 24/15 → 26/0 | 0/0 → 0/0 | 318/0 → 318/0 | 1 → 0 |
| `volumes/V01-neighbourhoods.md` | 0/0 → 0/0 | 0/0 → 0/0 | 421/366 → 436/0 | 6/4 → 6/0 | 0/0 → 0/0 | 286/3 → 286/0 | 1 → 0 |
| `volumes/V02-buildings.md` | 0/0 → 0/0 | 0/0 → 0/0 | 628/562 → 643/0 | 1/0 → 1/0 | 0/0 → 0/0 | 214/10 → 214/0 | 1 → 0 |
| `volumes/V03-interiors.md` | 0/0 → 0/0 | 0/0 → 0/0 | 404/318 → 418/0 | 6/6 → 6/0 | 0/0 → 0/0 | 200/0 → 200/0 | 1 → 0 |
| `volumes/V04-underground.md` | 0/0 → 0/0 | 0/0 → 0/0 | 242/216 → 251/0 | 4/4 → 4/0 | 0/0 → 0/0 | 155/2 → 155/0 | 1 → 0 |
| `volumes/V05-sky.md` | 0/0 → 0/0 | 0/0 → 0/0 | 253/241 → 272/0 | 0/0 → 0/0 | 0/0 → 0/0 | 269/1 → 269/0 | 1 → 0 |
| `volumes/V06-evolution.md` | 0/0 → 0/0 | 0/0 → 0/0 | 325/297 → 345/0 | 7/7 → 8/0 | 0/0 → 0/0 | 433/16 → 433/0 | 1 → 0 |
| `volumes/V07-village.md` | 0/0 → 0/0 | 0/0 → 0/0 | 386/340 → 412/0 | 11/10 → 13/0 | 0/0 → 0/0 | 419/0 → 419/0 | 1 → 0 |
| `volumes/V08-settlementforge.md` | 0/0 → 0/0 | 0/0 → 0/0 | 211/183 → 576/0 | 4/2 → 25/0 | 0/0 → 0/0 | 284/2 → 284/0 | 1 → 0 |
| `volumes/V09-application.md` | 1/0 → 1/0 | 1/0 → 1/0 | 363/335 → 383/0 | 8/8 → 9/0 | 0/0 → 0/0 | 457/89 → 457/0 | 1 → 0 |
| `volumes/V10-clerk.md` | 0/0 → 0/0 | 0/0 → 0/0 | 213/190 → 217/0 | 2/2 → 4/0 | 0/0 → 0/0 | 334/12 → 334/0 | 1 → 0 |
| `volumes/V11-content.md` | 0/0 → 0/0 | 0/0 → 0/0 | 347/321 → 350/0 | 8/3 → 11/0 | 0/0 → 0/0 | 334/33 → 334/0 | 1 → 0 |
| `volumes/V12-calibration.md` | 8/0 → 8/0 | 0/0 → 0/0 | 169/155 → 174/0 | 2/0 → 2/0 | 0/0 → 0/0 | 119/11 → 119/0 | 1 → 0 |
| `volumes/INDEX.md` | 0/0 → 0/0 | 0/0 → 0/0 | 22/18 → 22/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 1 → 0 |
| `volumes/SUMMARY.md` | 0/0 → 0/0 | 0/0 → 0/0 | 10/10 → 10/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 1 → 0 |

The base's round-0 numbers are the session's (C1 5/0, C2 2/1, C3 1 890/62, C4 24/15, S2 318/0, exit 1). The volumes' backlog is
not new: the coherence pass ran them for information only and reviewed only the hits each round added
(`work/assemble-r7y/volchecks-final.txt`: "not held to exit 0"), and in the cloud their reference hits were invisible. This is
the first record in which every volume, INDEX and SUMMARY exits 0. Hit totals rise between rounds only by corpus growth;
no document changed.

## Real copies and their fixes

None. The hits that came closest, and why each is not a copy:

| hit | where | why it is not a copy |
|---|---|---|
| NG 1.2.2 and VG 1.6.9 mechanisms with their constants — the hood outline family, the `0.7 / 0.3 / 0.1 / 0.1` template odds, VG's palisade lattice, meander and network rules (68 C3 runs) | V01's NG rows (template odds, the hood outline family, the pin, court and manor rules, roof hatching), V02's Fantasy Manor court and roof rows, V07's VG rows (network, palisade, open space, rivers, piers) | the corpus side is our own English paraphrase in `research/findings/code-*.md`; §17.1 (1) (items 33–61, J-A32.01) makes "our own re-derivation, carrying (6)'s `(code)` provenance" the sanctioned route, and each restatement carries its `ref:` tag. Re-deciding that route is the owner's, not this check's |
| "junction, park, river bank, bridge, port" | V01 l. 1181 | NG's creator's announced, never-shipped template kinds (NG-VC-3), cited as a stated idea: five ordinary nouns, realised by our own context rows |
| "This action cannot be undone" | V09 l. 4625 | FTG's regenerate warning, quoted and attributed in a comparison row that says we never need it (under 15 words) |
| C4: landing, pier, port, quay, wharf | V07 l. 235 | all five words of VG's wharf-naming list, but our row names our model's waterfront features (the wharf, landings, piers, `quay` and `pier` ways, SettlementForge's `port` access), not names |
| C4: buildings, districts, trees, walls, water | base l. 15504 (§8.11) and l. 16733 (§11.1), V09 l. 2210, V10 l. 2540 | MFCG's GeoJSON feature ids are the ordinary nouns of a town map's layers; our layers and our GeoJSON section are our own |
| C4: civic-hall, domestic-house, exotic-tower, … | base l. 16171 (§10.2) | SettlementForge's own seventeen scene archetypes (§7.7's `dossier.archetypes`) that happen to share words with NG's naming nouns |
| C2 `#716250` | base l. 13445 (§8.2, `wall.worn`) | our own value (`wall` lerped 40 % toward ink); its only corpus occurrence is `"tts":716250`, a thread-time number in a Dwellings profiler trace |
| culture, tier, quarter, closure-fate and dossier-key lists | V08, V11, V12, the base's §7.7 and §14 | SettlementForge's own vocabularies, matched in `research/sf/compat/` files that sibling catch-up lanes wrote today from V08 and from SettlementForge's code |
| S2 `§6.7`, `§6.9` | V06, V12 | V06's bold run-in sub-headings under its ## 6 (*The history replay at generation*, V06 l. 3967; *The crisis hand-over and the decay level*, l. 4066), which no heading scan sees; they resolve |
| S2 `§2.0` | V01 l. 859, 2214, 3710 | a pointer into `research/findings/code-neighbourhood.md` §2.0, cited as provenance |
| S2, 15 other pointers | V02, V04–V06, V08–V12 | volume-prefixed pointers (`V09 §4.20`, `V11 §3.24`, …) that S2 cannot resolve against the base's headings; each resolves in its volume (`tools/s2.py`) |

## Allow rows added

Distinct (check, text) rows each document reported, over every round that added rows (a row serving several documents is
counted under each):

| document (run) | C2 | C3 | C4 | S2 |
|---|---|---|---|---|
| `ARCHITECTURE.md` (whole) | 1 | 193 | 16 | 0 |
| `ARCHITECTURE.md` (34 `#`/`##` keys) | 1 | 193 | 16 | 0 |
| `ARCHITECTURE.md` (eight `#` keys) | 1 | 193 | 16 | 0 |
| `volumes/V01-neighbourhoods.md` | 0 | 362 | 4 | 1 |
| `volumes/V02-buildings.md` | 0 | 544 | 0 | 1 |
| `volumes/V03-interiors.md` | 0 | 313 | 6 | 0 |
| `volumes/V04-underground.md` | 0 | 204 | 4 | 1 |
| `volumes/V05-sky.md` | 0 | 238 | 0 | 1 |
| `volumes/V06-evolution.md` | 0 | 288 | 8 | 4 |
| `volumes/V07-village.md` | 0 | 342 | 11 | 0 |
| `volumes/V08-settlementforge.md` | 0 | 474 | 26 | 2 |
| `volumes/V09-application.md` | 0 | 329 | 9 | 12 |
| `volumes/V10-clerk.md` | 0 | 178 | 4 | 4 |
| `volumes/V11-content.md` | 0 | 298 | 6 | 5 |
| `volumes/V12-calibration.md` | 0 | 154 | 1 | 4 |
| `volumes/INDEX.md` | 0 | 17 | 0 | 0 |
| `volumes/SUMMARY.md` | 0 | 10 | 0 | 0 |
| **distinct rows** | 1 | 3749 | 91 | 18 |

By class: ordinary English 2328, pointers and numbers 954, SettlementForge lanes' files 271, (code) re-derivations 68, our design page dwellings-synthesis.md 60, file and section citations 43, our banners and conventions 9, stated reference facts 5, our manor proposal 4, our findings cited 2, creators' ideas cited 2, our measurements 2, the owner's words 1. C4: 59 lines of ordinary words that are also members of a reference's naming list or feature-id list, and 32 lines of SettlementForge field names held by the catch-up lanes' files. S2 18 (pointers), C2 1 (our palette value).

## Corpus growth during this check

Sibling catch-up lanes wrote into `research/` while the rounds ran, and `doc_checks.py` reads every JSON file there:
`research/sf/compat/port-fields.json` (catchup/sf-port, 03:45, after round 0's first runs had built their corpus),
`research/sf/compat/sf-dossier.json` with its result file (catchup/sf-dossier, 06:09, during round 2), `research/sf/compat/table.result.json` (catchup/sf-match, 06:37, during round 4; its `table.md` is Markdown outside `research/findings/`, which C3 does not read) and `research/sf/compat/rule.result.json` (catchup/sf-rule, 07:00, during round 6; round 7 re-ran the sixteen runs that had not read it, SUMMARY's round-6 run having read it; `research/sf/COMPAT-CHECK.md` is likewise unread). These files restate V08, the base's §7.7 and SettlementForge's code, so each raised new hits in the documents that port
SettlementForge; rounds 1–7 read and reviewed them (memory *doc-checks corpus drift*). The six lanes of
`workflows/21-mac-catchup.js` have all landed, and round 8 ran all seventeen runs on one unchanged corpus (17 210 files). Any later write under
`research/` or `captures/` can raise new phantom hits; a seat that runs the checker after such a write reviews only the hits
that write adds.

## Where the checker does not look

Measured while reading, beyond the brief's checker, so the owner knows what "exit 0" covers:

1. **Unparsed capture bodies.** 994 JSON files under `captures/dwellings/` are object literals with unquoted keys; the checker
   skips them for C3 and C4 ("WARN unreadable JSON"). They hold two distinct bodies, Dwellings' room tables (a mansion's 29 room
   kinds and an inn's 7, with sizes, door caps and storey rules). `tools/supp.py` parsed them leniently and ran C3 and C4 as
   the checker does over all fifteen documents: **0 runs, 0 lines.** One single word coincides: our `RoomRoleRow.maxDoors`
   (V03 §2.4; the base's §10.2 room override) and the room tables' `maxDoors`, both a room's door cap. It entered the design
   through the program's own item-28 synthesis (`research/findings/dwellings-synthesis.md`), and no finding quotes the room
   tables, so it reads as an independent, obvious name (PLAUSIBLE). A single token is below every check's threshold; it was
   not renamed.
2. **Reference prose.** C3 reads `research/findings/*.md` and JSON only, never the reference text kept as Markdown, text or
   HTML: 357 files in `research/devlogs`, `ftg-docs`, `patreon` (`post.md`), `external` and `reference-maps`.
   `tools/supp2.py` ran the C3 rule over them: 86 distinct runs that some single file holds five or more tokens of — generic
   English, creators' sentences already allowed as quotations ("mountains aren't properly supported yet"), and our own
   `research/reference-maps/*/README.md` wording reused by the known-city fixtures (V09 l. 4471–4533, V10 l. 3197), whose
   structural features are ours to state and whose README forbids names and tracing. **No copy.** These runs are not checker
   hits, so they have no allow rows.

Both gaps are the checker's design (§17.1 (2)'s corpus definition). Closing them is a change to `doc_checks.py` for the seat
that owns it, or falls to M-1's hashed deny-list scan (§17.1 (5)), which replaces C1–C4 over the base.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed or read by this seat):** every run's counts and exit status (152 runs over nine
rounds; round 7 re-ran sixteen and kept SUMMARY's round-6 run, which had read the new file); every unreviewed hit read against its corpus source; the absence of any real copy; the C2 trace context; the S2
resolutions (each volume-prefixed pointer a heading of its volume, §6.7 and §6.9 V06's run-in sub-headings, §2.0 in
`code-neighbourhood.md`); both supplementary scans; the bundle's UP TO DATE check. **PLAUSIBLE:** that `maxDoors` was coined
independently (inferred from where it first appears); that no sibling lane writes into `research/` between this record and the
next run of the checker.
