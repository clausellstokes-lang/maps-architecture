# E16 — the hashed content deny-list (M-1 work item W-16)

Lane `m1/W-16`, 2026-10-03, on the owner's Mac. This is a research-side record, and implementer seats do not read it
(`plat/CLEAN-ROOM.md` rule 2). It holds counts, digests' sizes, file paths, line numbers and our own words. No reference
word, list, grammar, palette value or map name is written here, and the hits found in the design are cited by line. Nothing
was written into `plat/`, no third-party site was contacted, no captured program bundle was opened, and no git command was
run.

**Outcome: partial. The list is built, and every check of the row passes except the design-set scan.** That scan finds 4 hit
texts (5 counted by class, 17 occurrences) that this seat cannot allow, because each needs a design change or a ruling:

* **One Building field name repeats a field name of FTG's Foundry module.** It appears at base l. 1369, 1488 and 16013,
  V03 l. 310 and V11 l. 1433. Its source is `research/findings/ftg-payload-visual.md` §7.3. §17.1 (9) says the module's
  field names are "not reused … and occur nowhere in this document". The old check (i) never looked at §7.3, so the
  red-team row FTG-11 (`docs/validation/redteam-ftg.md` l. 451) brought the name in unseen.
* **Names from the first study map appear in the design's examples.** These are the map's three region names (base
  l. 15533 and V01 l. 3163); one region name, together with two more of that map's place words, in the clerk's examples
  (V10 l. 37, 2347 and 3200); and one landmark name in the known-city structure list (V09 l. 4475). The map's README
  bars its names from the design. V12 l. 1534 is a coincidence across a table-cell boundary. Allow rows are keyed by
  text, so it stays with the V10 hits until they are settled.

A design seat renames these, or Fable rules them ordinary words, then reruns `make_denylist.py selftest`. Everything else
was **CONFIRMED by execution** (section 4):

* all 36 C1 identifiers hit;
* all 7 248 corpus colour values hit;
* all 210 check-(vi) lists that can hit (five or more indexed words) hit;
* every other kept list, token, identifier and file hits, and 2 004 sampled 3-grams hit;
* each of the 20 planted leaks per class is caught;
* all 91 transcribed map names are covered;
* rebuilding with the same salt gives the same bytes (section 4, row 10).

## 1 What was built

| file | what it is |
|---|---|
| `research/baselines/make_denylist.py` | The builder, the scanner's research-side twin and the self-test, as three sub-commands: `build`, `scan` and `selftest`. Python 3.9, standard library only, 681 lines. It reads the corpus exactly as `docs/validation/bench/doc_checks.py` reads it, with doc_checks' constants repeated. It holds tokens in memory only and writes nothing but digests and counts. |
| `research/baselines/denylist/denylist.v1.json.gz` | **The digest file for `@plat/testkit`'s scanner.** Gzipped JSON, format `plat.denylist/1`, 8 719 621 bytes, sha256 `60e6cc70c224…`. It holds a header (format, date, corpus cut, salt, hash construction, normalisation, the per-class hit rules and thresholds) and the sorted digest arrays of seven classes. It is not JSON on disk, so `doc_checks.py` does not read it. |
| `research/baselines/denylist/salt.hex` | The salt: 32 random bytes from `secrets.token_hex`, generated once at 13:06 and kept with the list. The builder reuses it, and refuses to run if a list exists without it. The same salt is in the list's header, because the scanner needs it. |
| `research/baselines/denylist/refmap-names.digests` | The reference maps' names as salted digests only (classes tok, phr, tri and word), plus two counts. The research seat's transcription itself stays outside the project, in the session scratchpad. Later builds merge this file. |
| `research/baselines/denylist/spell-supplement.txt` | Our own supplement to the spell list (179 words). It holds modern, technical and generic words that the 1934 dictionary lacks, and the references' and platforms' own names, which provenance cites by design. |
| `research/baselines/denylist/design-allow.tsv` | 292 reviewed allow rows for the design-set scan (16 TOK, 3 PHR, 17 SET, 256 TRI), each with a written reason. The texts are our documents' own. `doc-checks-allow.tsv`'s 6 203 rows are carried by the script (C1 → ID, C2 → COL, C3 → TRI, C4 → SET). A TRI hit is also covered when it is a sub-run of a reviewed run, and a SET hit when its words are a subset of a reviewed word set. |
| `docs/calibration/E16-denylist.md`, `.json` | This record and its numbers. |

The baseline seat places the list beside the baselines in `plat/packages/testkit/baselines/` at the crossing (W-20). The
generation record of section 2 is then entered in `plat/CLEAN-ROOM.md` §4.

## 2 The generation record (§17.1 (7): date, sources, counts — never the tokens)

**Date and cut.** Built 2026-10-03 at 14:14 EDT (build 5). The corpus cut is `2026-10-03T07:25:59-04:00`, the time the
clean-room record was written after its round 8. So the corpus is exactly the authoritative one that lane
`catchup/cleanroom` read. Two folders were written after the cut, today's M-1 captures: 111 files in
`captures/ftg/2026-10-03T17-19-06` and 280 in `captures/mfcg/exports-sweep-m1-2026-10-03`. They wait for the rebuild at
M-1's exit (section 7). No other file under `research/` or `captures/` changed after the cut (`find -newer`).

**Sources.**

* All of doc_checks' C1–C4 sources:
  * C1: the 36 identifiers of ftg-payload-visual §7.2.
  * C2: 10 197 colour files.
  * C3: the 39 findings and 9 626 JSON files under `research/` and `captures/`.
  * C4: their lists.
* The clean-room record's two blind spots:
  * the 994 capture bodies with unquoted keys, parsed leniently: 2 distinct bodies, 0 left unparsed;
  * the reference prose, 355 files of devlogs, FTG docs, Patreon posts and external pages. Our two reference-map READMEs
    were left out as our own wording.
* The Foundry module's field names of §7.3: 41 identifiers and 6 entity lists.
* The class citations in code-impact §(d)'s provenance table: 71 identifiers, which J-A62.01 keeps out of the design,
  the digest and `plat/`.
* Image, texture and body bytes: 9 561 files of `research/` and `captures/`, which are 2 076 distinct digests. Captured
  bodies count, except code (`.js`, `.mjs`, `.wasm` and wasm by magic, never opened) and fonts (383 skipped by magic).
  Fonts are OFL and shipped by the product (§17.2).
* The names on the two study maps, transcribed by this seat from the three images: 84 on map A and 7 on map B. Map B's
  landmarks carry no text.
* Left out by rule: `research/sf/`, SettlementForge, which is the owner's own program and not a reference (§17.1 (3),
  (6)); and `research/baselines/`, M-1's own numbers-only outputs, which cross by §17.1 (4). That is 8 JSON files.

**Counts (digests).**

| class | digests | what |
|---|---|---|
| tok | 1 369 | single tokens not in the spell list, from list members, identifier-shaped strings, the C1, §7.3 and §(d) names, and the map names |
| id | 130 | case-kept identifiers: all 36 of C1, 41 Foundry names, and §(d)'s class and method citations with their dotted forms |
| tri | 971 690 | token 3-grams in list order: C3's corpus, the lenient bodies, the prose, and the names |
| col | 7 248 | six-digit values written as colours (`#`, `0x`, or a quoted string with a letter), black and white left out |
| file | 2 076 | file-byte digests |
| phr | 75 | multi-token map names, 2–5 tokens |
| sets | 235 lists, 3 072 word digests | per list, its one-word members of four or more letters (check (vi)'s index); 284 lists with fewer than five such words are dropped, since they can never hit |

There were 518 lists read in all: 478 from the JSON corpus, the same 478 that check (vi) reads without the excluded trees,
34 from the lenient bodies, and 6 Foundry lists. The spell list is `/usr/share/dict/words` (web2, 234 456 words, sha256
`be41ad97…`), with English inflections and British spellings reduced to it, plus the 179-word supplement (sha256
`58d150e1…`).

## 3 How the scanner hits (the list's header carries this for the implementer)

The digest is the first 16 hex digits of SHA-256(salt ‖ tag ‖ 0x1F ‖ payload). Text is normalised by NFKD, combining marks
dropped, then lower-cased. A token is a maximal run of `[a-z0-9_]`.

* **tok** — an equal token is a hit.
* **id** — case is kept. Every run `[A-Za-z0-9_]+(.[A-Za-z0-9_]+)*` is split at its dots, and each dotted sub-sequence is
  checked: C1's whole-word, case-sensitive rule.
* **tri** — three or more consecutive listed 3-grams make a hit: C3's rule.
* **col** — a `#rrggbb` or `0xrrggbb` literal.
* **file** — an identical file.
* **phr** — 2 to 5 consecutive tokens.
* **word** — five or more distinct words of one set on a line, or among the one-word cells of one table column: C4's
  rule and J-S36.

The research twin, `make_denylist.py scan`, is the reference behaviour. `@plat/testkit` must digest the same way.

## 4 Self-test — the row's checker, executed (CONFIRMED)

`python3 research/baselines/make_denylist.py selftest --refmap-names <transcription>` rebuilds the corpus at the list's own
cut and checks:

| # | check | result |
|---|---|---|
| 1 | every `doc_checks.py` C1 identifier hits (as `x IDENT y`) | 36 / 36 |
| 2 | every corpus colour hits | 7 248 / 7 248. The 297 234 bare six-hex runs that C2 also matched — decimals, coordinates and trace numbers, the class of the clean-room's `#716250` hit — are not listed |
| 3 | every check-(vi) list hits (a line of its indexed words) | 210 / 210 lists with five or more indexed words. The other 268 of the 478 have fewer than five such words and can never be a C4 hit either |
| 4 | every list the build kept hits | 234 / 234 |
| 5 | every token and identifier candidate hits | tokens 1 329 / 1 329, identifiers 130 / 130 |
| 6 | every source file's bytes hit | 9 561 / 9 561 |
| 7 | 3-grams, every 485th of the sorted set | 2 004 / 2 004 |
| 8 | planted leaks in a scratch copy of `volumes/INDEX.md`, 20 seeded trials each | a six-token findings run (TRI) 20/20; an alphabetised list (SET) 20/20; a corpus colour in upper case (COL) 20/20 |
| 9 | the reference maps' names | all 91 covered: 90 hit directly (tok or phr); one single dictionary word is held only by map A's word set, and that set hits |
| 10 | salt and determinism | the header's salt equals `salt.hex`; build 6, run without the transcription and merging the digests file, gives the same bytes as build 5 (`cmp`) |
| 11 | **the design set scanned → 0 unreviewed hits with `doc-checks-allow.tsv`'s rows carried** | **FAIL: 4 texts unreviewed (5 by class, 17 occurrences), routed for a ruling — see the outcome** |

**The design set** — the fifteen documents of the clean-room check — gives these hits / unreviewed counts after carrying
and the 292 rows of `design-allow.tsv`:

| document | TOK | ID | TRI | COL | SET | PHR | FILE |
|---|---|---|---|---|---|---|---|
| `ARCHITECTURE.md` | 33/3 | 8/3 | 1956/0 | 0/0 | 26/0 | 4/1 | 0/0 |
| `volumes/V01-neighbourhoods.md` | 0/0 | 0/0 | 430/0 | 0/0 | 6/0 | 1/1 | 0/0 |
| `volumes/V02-buildings.md` | 4/0 | 0/0 | 640/0 | 0/0 | 1/0 | 0/0 | 0/0 |
| `volumes/V03-interiors.md` | 17/1 | 1/1 | 415/0 | 0/0 | 11/0 | 0/0 | 0/0 |
| `volumes/V04-underground.md` | 0/0 | 0/0 | 254/0 | 0/0 | 4/0 | 0/0 | 0/0 |
| `volumes/V05-sky.md` | 1/0 | 0/0 | 260/0 | 0/0 | 0/0 | 0/0 | 0/0 |
| `volumes/V06-evolution.md` | 0/0 | 0/0 | 346/0 | 0/0 | 7/0 | 1/0 | 0/0 |
| `volumes/V07-village.md` | 18/0 | 0/0 | 402/0 | 0/0 | 11/0 | 0/0 | 0/0 |
| `volumes/V08-settlementforge.md` | 0/0 | 0/0 | 226/0 | 0/0 | 4/0 | 0/0 | 0/0 |
| `volumes/V09-application.md` | 0/0 | 1/0 | 375/0 | 0/0 | 8/0 | 2/1 | 0/0 |
| `volumes/V10-clerk.md` | 0/0 | 0/0 | 212/0 | 0/0 | 2/0 | 3/3 | 0/0 |
| `volumes/V11-content.md` | 43/1 | 1/1 | 336/0 | 0/0 | 22/0 | 3/0 | 0/0 |
| `volumes/V12-calibration.md` | 5/0 | 9/0 | 174/0 | 0/0 | 2/0 | 1/1 | 0/0 |
| `volumes/INDEX.md` | 0/0 | 0/0 | 24/0 | 0/0 | 0/0 | 0/0 | 0/0 |
| `volumes/SUMMARY.md` | 0/0 | 0/0 | 10/0 | 0/0 | 0/0 | 0/0 | 0/0 |
| **all fifteen** | 121/5 | 20/5 | 6060/0 | 0/0 | 104/0 | 15/7 | 0/0 |

**How the 292 new rows were reviewed** (each read against its corpus source, with a scratch attribution tool):

* **TRI, 256.** 244 are stitched: no single corpus file holds five consecutive tokens of them. They are ordinary
  phrasing, numbers or pointers, many of them made by the NFKD split of ½, ¼ and subscripts. The other 12 each have a
  named source:
  * our own design page (dwellings-synthesis);
  * the shoelace formula;
  * Chaikin's published quarter points;
  * our (code) re-derivations of NG and VG rules (§17.1 (1));
  * section pointers;
  * a creator's sentence already allowed, which a reference post now extends by one word;
  * two five-word ordinary phrases that are shared with a post and a devlog comment.
* **TOK, 16.**
  * FTG's two size names, cited as calibration anchors.
  * Two reference field names cited in calibration rows.
  * Seven obvious compounds naming our own fields, which coincide with reference keys. One of them is the door-cap name
    that the clean-room record already judged independent.
  * Four SettlementForge catalogue kind ids quoted in V11 §3.11 (the owner's program).
  * Ordinary snake-case kind names.
* **SET, 17.** These are roster, goods, room and role columns of V03, V11 and §8.2.
  * V11's class column holds 108 one-word classes. 39 of them are shared with FTG's 105-word roster; 25 of those 39 are
    also SettlementForge's own words, and FTG's distinctive coinages are absent.
  * The goods column shares 17 of 51 with FTG's 48 goods, again without FTG's distinctive entries.
  * These are the J-S36 review the design anticipates: ordinary vocabulary in our own selection, not a copy.
* **PHR, 3.** Ordinary words in another sense.

## 5 Judgment calls (delegated authority; each vetoable)

1. **Two trees are left out of the corpus.** `research/sf/` is left out because SettlementForge is not a reference. If
   it stayed in, the product's V08 port would trip on its required field names. `research/baselines/` is left out
   because M-1's own outputs, and this list, must cross clean (T-V12-28). The same drift already shows in doc_checks: it
   now reports 14 C3 and 2 C4 unreviewed hits on the base (CONFIRMED, run at 13:46). The ones read come from JSON that
   M-1 lanes wrote today: the unit list of `metrics.m-1.json`, and the plan and capture records (PLAUSIBLE for the
   rest). E01 and E02 ask doc_checks to make the same exclusion.
2. **The colour class lists only values written as colours.** Bare six-digit runs are not listed: that removes 297 234
   numbers that C2 matched by accident, and loses no palette. Black and white are dropped as non-creative.
3. **The spell list is web2 plus inflection and British-spelling rules, plus our supplement.** §9.6's list does not exist
   yet. Web2 alone lacks plurals and British forms, which would have put this program's own words into the token class.
4. **The word sets use check (vi)'s index: one-word members only.** Splitting multi-word members into words, as the
   §17.1 (5) wording might suggest, turned 960 ordinary design lines into hits (measured, build 1). A copied name list
   is still caught by its invented words (tok) and its order (tri).
5. **Table columns are read as lists of their one-word cells.** Read word by word, long prose columns hit about 300
   times (measured).
6. **The design's five classes gain two: `id` and `phr`.** `id` is case-kept so that C1's upper-case message names
   still hit, which the lower-cased token class cannot do. `phr` exists so that a carried multi-word map name hits
   (V12 §3.14.2's `namesClean`).
7. **Token sources are limited.** They are list members, identifier-shaped strings and the named identifier sources.
   Words merely mentioned in our findings' prose and backticks are not a source: 2 780 candidates, 261 of them in the
   design, mostly our own names.
8. **The corpus cut is the clean-room record's time.** A build and its self-test therefore read one snapshot while
   capture lanes write. The cut is stated in the list.
9. **The map transcription is held outside the project; only its digests are kept.** A change to the normalisation
   would need a fresh transcription.

## 6 What the routed hits need

* **The Foundry field name.** A design seat renames it to our own word in the base (§2.6, l. 1369 and 1488; §10.2,
  l. 16013) and in V03 l. 310 and V11 l. 1433, with `doc_checks.py --sections`. Fable may instead rule it an ordinary
  compound and allow it. The concept is admissible (FTG-11); the name is the module's.
* **The study-map names in examples.** A design seat rewords base l. 15533, V01 l. 3163, V09 l. 4475 and V10 l. 37,
  2347 and 3200 with our own words, or Fable rules them generic. Then V12 l. 1534's coincidence can take an allow row.
* Then: `python3 research/baselines/make_denylist.py selftest --refmap-names <transcription>` (about 6 minutes). Without
  the transcription, check 9 is skipped and the rest runs.

## 7 Hazards and the next run

* **Rebuild at M-1's exit.** After W-02's last day, W-03 and W-04, rebuild the list:
  `make_denylist.py build --as-of now`, same salt. Before that rebuild, exclude the capture lanes' own record files,
  because they carry our identifiers. The capture facts, probe acknowledgements and stats files made 6 token and 5 set
  hits on the design in build 4. Then rerun the self-test and review only the new hits.
* **Web-platform names.** Three of C1's identifiers are also web-platform names. The product's interface code will hit
  them and needs allow entries, exactly as check (i) did.
* **Allow rows match on text alone.** An allowed text clears every place it occurs, as in doc_checks.

## 8 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed or read): every count in sections 2 and 4; the self-test results; the determinism `cmp`; the
design-set hits and their line contexts; the reuse of the field name (§7.3 and the base's text both read); the cut's
folder list; doc_checks' new drift hits.

**PLAUSIBLE** (reasoning):

* that the study-map phrases came from the known-city experiment rather than independent use;
* that V11's roster overlap is independent selection (supported by the measured overlap and by the absence of FTG's
  coinages);
* that the 244 stitched runs are not copies (no single source holds five tokens of any of them, the class rule the
  clean-room record used);
* that the 16-hex truncation (64 bits) makes accidental digest collisions negligible at about a million entries.

## 9 The exit list in M0's format (W-16b; lane `m1/W-16b`, 2026-10-04)

The same rules as this record's header hold here: counts, paths, line numbers and our own words only; no reference word,
list, map name or value is written. Nothing was written into `plat/`, no site was contacted, no git command was run, and
the seat read no captured program bundle.

**Outcome: landed. The deny-list is rebuilt at M-1's exit in two forms from one read of the corpus, and every check of
the W-16b row passes on both (CONFIRMED by execution, 9.4–9.6).** The crossing candidate in M0's format is
`research/baselines/denylist/denylist.json`. The research list `denylist.v1.json.gz` was rebuilt beside it. Both were built
from the corpus after FTG programme 2 closed (slot 27 was bound at 05:45), with `doc_checks.py`'s two corpus rules. The
self-test's eleven checks pass on both lists, and the design set has 0 unreviewed hits on each. A planted leak in each of
M0's five classes is caught by the research twin of M0's rules in 20 of 20 trials. The two lists' shared classes hold the
same items, and the candidate reproduces attachment C's known-answer digests. Two rebuilds at the same cut are
byte-identical. Three things go to the session as hand-offs, with no design change (9.7):

* version 1's format cannot hold 29 of the 36 C1 identifiers or 44 of the 92 study-map names (R-17's id and phr gap);
* M0-k-06's 3-gram hit must be the run rule;
* the colour hit is the literal rule.

### 9.1 What was built

| file | what it is |
|---|---|
| `research/baselines/make_denylist.py` | Extended from W-16's builder (994 non-empty lines; stdlib only). `build --format m0` writes both lists and the G-row cells from one corpus read. Normalisation 1 applies to both lists. The corpus rule is compiled from `doc_checks.py`'s own statements at run time. The scanner twin reads either format, refusing a list without `normalisationVersion` 1 or with a `digestHexDigits` other than 16. The self-test runs the eleven checks on each list, plus the known answers, the format check and a Node parity check. |
| `research/baselines/denylist/denylist.json` | **The crossing candidate** (attachment C; plan §7c). It is 24 227 888 bytes of ASCII JSON, sha256 `7b3d79936f32dccd0770bf37cf7381a747555a1a0a543b185749842f18c223c6`. The keys appear in attachment C's order. `date` and `corpusCut` are both `2026-10-04T05:56:16-04:00`. Counts: tokens 894, trigrams 1 026 020, colours 7 358, files 2 523, lists 260 (3 461 words), spell 234 593. |
| `research/baselines/denylist/denylist.v1.json.gz` | The research list rebuilt beside it: 9 190 376 bytes, sha256 `00bb0d659148e17d3ea397906ae31384f536cc58812a1c3a82cf13366371a0a8`. It keeps its seven classes and gains `normalisationVersion: 1`, which the twin now requires, so W-16's list (`60e6cc70…`) is refused rather than misread. |
| `research/baselines/denylist/generation-record.json` | The cells of the `plat/CLEAN-ROOM.md` §4 G-row: date, file sha256, `normalisationVersion` 1, `digestHexDigits` 16, the cut, nine opaque source labels (S01–S09, mapped below) and the class counts. The deny-list seat enters the row at W-20. |
| `research/baselines/denylist/refmap-names.digests` | Re-digested under normalisation 1 from a research-seat transcription held outside the project: the clean-room fix verifier's, 92 names. That transcription reproduces all 167 of W-16's name digests and adds one word to map A's set (CONFIRMED, scratch comparison). |
| `research/baselines/denylist/spell-supplement.txt` | Eleven ordinary words and standard abbreviations added in a dated section (179 → 190 tokens), 9.6. |
| `research/baselines/denylist/design-allow.tsv` | 24 TRI rows added (now 317 rows: 280 TRI, 17 SET, 16 TOK, 4 PHR), each with its written reason, 9.6. |
| `research/baselines/denylist/salt.hex` | Unchanged (sha256 `3f342aee…`). Both lists carry this salt, and the M0 file carries it as attachment C requires. The salt file stays research-side and is never regenerated. |

The G-row's source labels map, research-side only, to this record's §2 sources:

* S01: the findings.
* S02: the JSON corpus of `research/` and `captures/`.
* S03: the leniently parsed bodies.
* S04: the reference prose.
* S05: the Foundry module's field names.
* S06: the §(d) citations.
* S07: the image, texture and body bytes.
* S08: the study maps' names.
* S09: web2 and our supplement.

### 9.2 The corpus at the exit

**Cut.** The cut is `2026-10-04T05:56:16-04:00` (build 2), after lane `m1/W-02-slot27c` bound slot 27 at 05:45 and
landed at 05:51. FTG programme 1 (slots 0–5) and programme 2 (slots 6–27, 22 of 22) are both in, with W-03b's sweep
folder, W-04's 44 NG folders and W-08's renders. Build 1 (cut 05:09:38) predated slot 27 and is superseded. Its self-test
is the first pass of 9.6. No corpus file changed after the cut (`find -newer`, 0 files outside the two excluded trees).

**The rule.** `doc_checks.py`'s `OWN_TREES`, `M1_FIRST_CAPTURE_DAY`, `OWN_RECORD`, `VALUES_ONLY`, `RECORDING`,
`PROFILER`, `member` and `m1_capture_record` are compiled from that file's own statements. The two checkers therefore
read one corpus by construction:

* R-30: the two own trees and the M-1 capture lanes' record files leave the corpus.
* R-38: an M-1 folder's `stats.json` is read for its string values only. Its keys form no 3-gram, no list and no token
  candidate.

**Counts.**

* JSON files: 10 498 under `research/` and `captures/`. Of these, 10 441 are in the corpus and 57 are own outputs; 1 is
  read for its values only; 994 bodies have unquoted keys, 2 distinct ones parsed leniently.
* Findings: 39. Prose files: 355.
* Colour files: 11 048.
* Files digested: 12 005 (606 fonts or code skipped by magic).
* Own outputs over `doc_checks.py`'s three corpus globs: 105.

**Parity with `doc_checks.py`** (its run on this record, 9.8, with the corpus unchanged since the cut): `json_files`
10 441, `own_outputs_left_out` 105 and `own_values_only` 1. These equal the builder's 10 441, 105 and 1 (CONFIRMED).

### 9.3 What normalisation 1 changed

R-17 changed the research twin's tokens from `[a-z0-9_]` runs to runs of Unicode letters and digits. The underscore now
splits, Greek and other letters are tokens, and marks are removed by general category. Both lists follow it, so their
shared classes digest identical items.

| class | W-16 (build 5, cut 2026-10-03 07:25) | the exit lists | why it moved |
|---|---|---|---|
| tok / tokens | 1 369 | 894 | An identifier joined by underscores was one token and is now its parts, most of them dictionary words. The new generated names of programme 2 add tokens, and the supplement's eleven words leave. 703 of build 1's 866 corpus tokens were already in W-16's list. |
| id (research) | 130 | 130 | Unchanged. The class is case-kept. |
| tri / trigrams | 971 690 | 1 026 020 | The new captures, and the extra tokens of the split. |
| col / colours | 7 248 | 7 358 | The new captures. |
| file / files | 2 076 | 2 523 | The new captures and renders. |
| phr (research) | 75 | 75 | The same names. |
| sets / lists | 235 (3 072 words) | 260 (3 461 words) | 546 JSON lists read (478 before). |
| spell (M0) | — | 234 593 | web2's words as normalised tokens, plus the supplement. |

### 9.4 The self-test on both lists (the row's checker; CONFIRMED, executed on build 2 in 9 minutes)

`python3 research/baselines/make_denylist.py selftest --lists research,m0 --refmap-names <transcription>` re-reads the
corpus at the lists' cut, then runs each check through the research twin of that list's rules. For M0's list, the twin
uses five classes and the spell exclusion. A 3-gram hit is a run of three listed 3-grams, as §17.1 (2) (iii) states. A
candidate that version 1 cannot carry is counted as R-17's gap, not as a miss: one with no non-dictionary token and fewer
than five tokens.

| # | check | research list | M0 list |
|---|---|---|---|
| 1 | every C1 identifier hits | 36 / 36 (ID) | 7 / 7 carriable hit (TOK); 29 are dictionary-word compounds of 1–4 tokens, R-17's id gap |
| 2 | every corpus colour hits | 7 358 / 7 358 | 7 358 / 7 358 |
| 3 | every check-(vi) list with five indexable words hits | 237 / 237 | 237 / 237 |
| 4 | every list the build kept hits | 261 / 261 | 261 / 261 |
| 5 | every token and identifier candidate hits | tokens 855 / 855; identifiers 130 / 130 | tokens 855 / 855; identifiers 90 / 90 carriable, 40 in the gap |
| 6 | every source file's bytes hit | 12 005 / 12 005 | 12 005 / 12 005 |
| 7 | 3-grams, every 512th of the sorted set | 2 004 / 2 004 | 2 004 / 2 004 |
| 8 | planted leaks in a scratch copy of `volumes/INDEX.md`, 20 seeded trials per class | TOK, TRI, SET, COL, FILE, ID, PHR each 20 / 20 | **tokens, trigrams, lists, colours, files each 20 / 20** (M0's five classes); 20 planted spell words 0 hits; 0 token digests in `spell` |
| 9 | the reference maps' names | 92 covered: 91 direct, 1 by map A's set | 92 covered: 47 direct, 1 by the set; 44 multi-word dictionary names are R-17's phr gap |
| 10 | salt and header | salt = `salt.hex`; `normalisationVersion` 1 | salt = `salt.hex`; attachment C's fields, order and patterns hold; every digest array is sorted with no repeat; ASCII only; 0 of 1 275 393 strings hold a bounded six-hex run (N-22's reading) |
| 11 | **the design set, 0 unreviewed** | **0 unreviewed** (TOK 27, ID 14, TRI 6 065, SET 104, PHR 9, COL 0, FILE 0 hits, all reviewed) | **0 unreviewed** (TOK 27, TRI 6 065, SET 104, COL 0, FILE 0, all reviewed) |

The per-document counts of both lists are in `E16-denylist.json` (key `w16b.designSet`). On the M0 list every shared
class equals the research list, document by document.

### 9.5 Shared classes, construction and determinism (CONFIRMED)

* **The two lists digest the same items.** Each shared class has equal counts in both lists: tokens 894, trigrams
  1 026 020, colours 7 358, files 2 523, lists 260 with 3 461 words. Both lists carry the same salt and the same cut, and
  checks 2–7 find every corpus item in each list.
* **Attachment C's construction.** With the test salt 00…1f, the known-answer digests are reproduced: `abc`
  `42fd4a8c529fdb40`, the 3-gram `997eba001a17c8d3`, the invented token `3ed08da5d2df31e8`, and a file of bytes `abc` gives
  the first digest again. The salt fed as text gives `c053f380bd02c003`, never the first digest. All five normalisation
  cases give the stated tokens.
* **The twin tokenises as a Node scanner would.** The corpus holds 227 distinct non-ASCII characters. For each one, this
  Python twin (Unicode 13.0) and Node (`normalize('NFKD')`, `\p{M}` removed, `toLowerCase`, `[\p{L}\p{N}]+`, Unicode 16.0)
  give the same tokens: 0 differ.
* **Determinism.** Build 3 was run with build 2's `--as-of` and `--date`. It gives byte-identical `denylist.json`,
  `denylist.v1.json.gz`, `generation-record.json` and `refmap-names.digests` (`cmp`).

### 9.6 The design set: what the first pass found and how each hit was settled

The first self-test (build 1, the same rules) passed checks 1–10 on both lists, and on check 11 found 32 distinct
unreviewed texts (550 occurrences) on each list. Each was attributed with a scratch tool to the corpus files that hold its
5-token windows, with the longest run in each file:

* **8 TOK, all ordinary words or standard abbreviations that the underscore split made token candidates.** Their sources
  are creator posts, capture keys and one key of our own pre-M-1 record (kept by CF-6). None is a reference coinage. These
  8 and three further ordinary words were added to `spell-supplement.txt` with the reason in its dated section. Those 11 words
  remove 12 of the 163 tokens that were new since W-16 (one plural goes with its singular). The other 151 are generated
  names and site or platform keys, and they stay tokens. They
  were not given allow rows, because an allow row clears the design set only, while M0-k-07 would meet the same words
  throughout `plat/`'s sources.
* **24 TRI rows added to `design-allow.tsv`, each with its reason:**
  * 14 are stitched: no corpus file holds five of their tokens in a row. They are ordinary phrasing joined to our own
    notation: variables, warning ids and pin kinds split at the underscore, the VTT format's public wall term, or the
    micro and sigma signs, which are now tokens.
  * 9 trace to our own findings (the dwellings synthesis page, the code, profile and visual-spec findings). Six are
    formula or variable notation, four of them with Greek letters (σ, π, λ) that are now tokens. Three are the synthesis
    page's prose of house patterns. Five of the nine extend runs already reviewed under the old tokenisation, and the
    row names the old one.
  * 1 is an ordinary phrase that a creator post shares, already reviewed in its shorter form.

The second self-test (build 2) shows 0 unreviewed on both lists.

### 9.7 What the session carries to M0 (hand-offs by C-0071's channel; no design change, J156)

1. **The 3-gram hit is a run (before wave 13, M0-k-06).** §17.1 (2) says the hashed scan replaces checks (i)–(iii) and
   (vi), and (iii)'s hit is a run of three or more consecutive shared 3-grams. M0-k-06's item text says it "flags a … 3-gram
   … hit", which a reader can take for one 3-gram. Measured on the design set with this list: 132 734 positions on 46 239 lines
   hold a single listed 3-gram, against 6 065 reviewed runs. The single-3-gram reading would flood M0-k-07 with ordinary
   phrasing. The twin and both lists assume the run (CONFIRMED by count; PLAUSIBLE that M0-k-06 would otherwise take the
   single reading).
2. **Version 1 cannot hold dictionary-word identifiers or names (M0-k-07; R-17's request).** Without an `id` or `phr`
   class, version 1 cannot hold 29 of the 36 C1 identifiers, 40 of the 130 identifier candidates or 44 of the 92 study-map
   names. Each of these is a compound of dictionary words of fewer than five tokens. In `plat/`'s sources these pass M0's
   scan. They are caught research-side only: in the design set by the research list, and in the digest by W-18's twin.
   R-17 makes `normalisationVersion: 2` "requested, not required"; the session carries these measured counts with that
   request.
3. **The colour hit is the literal rule.** The list holds only values written as colours (§5 (2)). The twin hits a
   `#rrggbb` or `0xrrggbb` literal. A scanner that digested every bare six-hex run would also stay correct, because a
   bare run that is not a listed colour never hits, but its cost would rise.
4. **List words.** A list word is a maximal run of category-L letters, four or more long. A token holding a digit is never
   a list word.
5. **Size.** The file is 24.2 MB with about 1.27 million digests. Every digest is a 16-hex string, which N-22's C3 reading
   passes (9.4 check 10).

### 9.8 Judgment calls (delegated authority, J122; each vetoable)

1. **Both lists use normalisation 1, as R-17 ordered for the twin.** The cost is that a reference identifier joined by
   underscores is no longer a single token in either list. Its non-dictionary parts and its in-order 3-grams still are.
   The alternative was to keep the research list on the old tokens. It was not taken, since the two lists' shared
   classes would then digest different items, against the row's checker.
2. **The corpus rule is read from `doc_checks.py`'s own source** rather than repeated, so the two checkers cannot drift.
   The builder refuses to run if those names disappear.
3. **The supplement grows from 179 to 190 tokens** rather than taking 8 TOK allow rows. R-17 quotes 179 as the supplement
   then stood; the class rule (web2 plus our supplement) is unchanged.
4. **The transcription.** The clean-room fix verifier's independent transcription was used, because W-16's was not kept
   (held outside the project). It reproduces all of W-16's name digests.
5. **R-17's gap is counted, not failed.** On the M0 list, checks 1, 5 and 9 count candidates that version 1 cannot carry
   as R-17's gap rather than failing the check. R-17 rules that their absence from version 1 is never a block, and every
   carriable candidate hits.
6. **Build 1 is superseded by build 2**, because slot 27 was bound 36 minutes after build 1's cut. The row requires the
   corpus after the programme's close.

**The record's self-check.** `doc_checks.py --doc docs/calibration/E16-denylist.md --sections 9 --heads docs/ARCHITECTURE.md`
exits 0. It reports one colour hit and three 3-gram hits, all reviewed, and no other hit (C1, C4, S1 and S2 at zero).

### 9.9 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed): every count in 9.1–9.6; both self-tests; the known answers; the format check; the Node
parity; the determinism `cmp`; the first pass's attribution; the parity of the corpus rule with
`doc_checks.py`.

**PLAUSIBLE** (reasoning):

* that the 14 stitched runs and the 11 supplement words are ordinary (by the class rule and by reading each in its
  sources);
* that M0-k-06 will take the single-3-gram reading unless told (9.7 (1));
* that Unicode 14–16 code points absent from today's corpus would tokenise alike (the parity covers only the 227
  characters present);
* that 64-bit digests stay collision-free at 1.27 million entries.
