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
