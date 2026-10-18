# retrovalidation/apply-design — the design corrections applied (amendments file s)

Lane retrovalidation/apply-design (Opus 5.5, high; J390: Fable judges and validates, Opus verifies and applies).
Started 2026-10-18 05:23 UTC. Written as the lane goes.

## Sources read

- Every `*.verdict.json` in `docs/validation/retrovalidation-2026-10-18/` (13: rulings, the eleven families alignment,
  faith, fp, lenses, plague, population, prosperity, realm, scripts, small, trade, and amendments): each one's verdict,
  summary, notice replacement, every ruling's id, verdict and consequence (371 rulings), and every correction's kind and
  target (417 corrections); every correction of kind `design` read whole (old, new, reason).
- `docs/AMENDMENTS-2026-10-17q.md` read whole (920 lines) for the form; `docs/AMENDMENTS-2026-10-18r.md` for the
  numbering (it ends at item 926) and its V13 revision note and INDEX state line.
- Each target passage read in context (V13 §2.2 :812, §2.3 :953, §3.11.6 :2454, §5.8 (7) :3184, §5.9 :3339, :3367,
  :3392-3394, the revision notes :1-103, H6 :3731, H25 :3750, J-V13.73 :3837, the plate horizon :1119, :3198-3199;
  V14 :1-69, §2.4 :772-797; INDEX :10-14).

## The design corrections collected

Eight corrections of kind `design`, all PASS-WITH-CORRECTIONS verdicts; the other 409 are `research` (357) or
`record` (52) and belong to the sibling apply lanes. Every target is V13 (7) or V14 (1); none targets the base, the
proposals, the brief, INDEX or SUMMARY.

| # | lane (verdict file, index) | target | line before file s | old occurs |
|---|---|---|---|---|
| 1 | rulings (C1, idx 0; J382(b) AMENDED) | V13 §2.2 `waterLanes` | 812 | once |
| 2 | amendments (AV-1, idx 0) | V13 §2.3 `RouteCostLaw` | 953 | once |
| 3 | amendments (D-2, idx 1; J-RR.42 AMENDED) | V13 §3.11.6 *Retention* | 2454 | once |
| 4 | lenses (L1 / V-9, D1, idx 38) | V13 §5.8 (7) | 3184 | once |
| 5 | population (D-1 / V-1, idx 44; R-12 OVERTURNED) | V13 §5.9 (5) trend row | 3339 | once |
| 6 | faith (V1, C45, idx 57; R7 AMENDED) | V13 §5.9 (6) pressure row | 3367 | once |
| 7 | prosperity (V-2 / D-1, idx 41) | V13 §5.9 (7) drift note | 3392-3394 | once |
| 8 | small (F-2, idx 9; R-3 AMENDED) | V14 §2.4 `EncounterCrop.scenes` | 795 | once |

Not this lane's: small.verdict.json idx 10 targets `docs/ARCHITECTURE.md` (the base's revision note, l. 5, item 652
added) but is of kind `record` ("applied in place with the notice replacement on the same line"), so it is the record
lane's; it is not applied here. Realm (J-RR.49) and amendments (AM-R6, AM-R13, AM-R14) each name a V13 fragment that is
another lane's correction above and say "not duplicated": each is applied once, here, as listed.

## Application

Written: `docs/AMENDMENTS-2026-10-18s.md` (273 lines, md5 `76fb99dc3b4fbcec1171c6e56db8aaf5`), "Amendments s — the
Fable retrovalidation's corrections to the design texts (2026-10-18)", items 927–938 in file q's form (each item: its
section, title, *From:* the validator lane and its ids, the target line, the current text quoted exactly, the new text
in full, the validator's reason verbatim, evidence tagged), status line **APPLIED**.

Items (12, one fragment each; old asserted once at its turn, new once after, every new re-read on disk once):

| item | target | line before | from | applied |
|---|---|---|---|---|
| 927 | V13 revision notes (after file r's note) | 103 | this file's form (q 897, r 926 (a)) | yes, exact |
| 928 | V13 §2.2 `waterLanes` | 812 | rulings C1 (J382(b) AMENDED) | yes, exact |
| 929 | V13 §2.3 `RouteCostLaw` | 953 | amendments AV-1 | yes, exact |
| 930 | V13 §2.3 `reach.kProsperity` row | 1100 | this lane's carriage of prosperity D-1 (see below) | yes, exact |
| 931 | V13 §3.11.6 *Retention* | 2454 | amendments D-2 (J-RR.42) | yes, exact |
| 932 | V13 §5.8 (7) | 3184 | lenses D1 (L1/V-9) | yes, exact |
| 933 | V13 §5.9 (5) trend row | 3339 | population D-1 (V-1; R-12) | yes, exact |
| 934 | V13 §5.9 (6) pressure row | 3367 | faith C45 (V1; R7) | yes, exact |
| 935 | V13 §5.9 (7) drift note | 3392–3394 | prosperity D-1 (V-2) | yes, exact |
| 936 | V14 revision notes (after *Coherence l*) | 69 | this file's form | yes, exact |
| 937 | V14 §2.4 `EncounterCrop.scenes` | 795 | small F-2 (C-10) | yes, exact |
| 938 | INDEX preamble state line | 14 | this file's form (q 918, r 926 (i)) | yes, exact |

Did not match: none. One pre-flight refusal, not a mismatch: the first application run (05:30) stopped before writing
anything because V14's md5 had moved from `a1c6d7c2…` (read 05:24) to `8f2265ea…` — retrovalidation/apply-small
(LANDED 05:29) had replaced the small family's notice inline at V14 l. 65; read: l. 65 only, l. 69 (item 936's quote)
and l. 795 (item 937's) unchanged, both quotes still once; the run was repeated against the new md5 and applied all 12.

Before → after (md5, lines):
- `docs/volumes/V13-world.md` `c8759307398388249547f71e1912feca` (4,452) → `a896c8dbdb41dd38516becc970b4db81` (4,465): 9 fragments
- `docs/volumes/V14-sites.md` `8f2265eafc8c387dc1e88b804e512745` (3,208) → `70d8aa1b3c14e7cab6a135adbd3caa00` (3,213): 2 fragments
- `docs/volumes/INDEX.md` `39b0c51960df130cb068744dd2eb3ee6` (259) → `b19971d37d98710d9a195fb09021dd11` (259): 1 fragment
- `docs/AMENDMENTS-2026-10-18s.md` new (273 lines)

Bundle: `cd /home/user/maps-architecture && python3 tools/bundle_architecture.py` wrote 81,080 lines from 16 sources
(it includes the base as apply-small left it at 05:29, md5 `1f871a01961de8a4994125d7bb1993be`); `--check` exit 0
("UP TO DATE"), re-run after file s was finalised: exit 0. Bundle md5 `0e58a72fb14caa61f473987f583b1a57`. Every new
text occurs once in the bundle. A later edit to the base, INDEX or a volume by another lane makes the bundle stale
again; that lane regenerates.

### Choices recorded for the Fable check (each vetoable)

1. **Bookkeeping items 927, 936, 938** — no validator asked for them; they follow the series' form (every amendment
   file since m adds a V13 revision note; V14's *Coherence l* note; INDEX's state line names files j–r). Without them
   the volumes and the index would not say file s happened (the stale-state class the lens-p critic raised as gap 3).
2. **Item 930** — a second V13 text carries the drift law prosperity's D-1 corrected: §2.3's `reach.kProsperity` row,
   "relative, so the host's realm-wide upward drift inflates no reach". The prosperity record lists the V13 passages it
   read (`prosperity.md:11`) and §2.3 is not among them; no validator's correction reaches the row. Its claim (a
   relative rung is not inflated by a common drift) holds; its "realm-wide" is exactly the word D-1 removed from §5.9
   (7). Applied as the carriage of D-1 (new: "relative, so the host's upward drift in aggregate — where its festival or
   boom writer is lit, its band polarising (V13 §5.9 (7)'s note) — inflates no reach |"), so the finding ends FIXED,
   not deferred; named here and in file s for the Fable check. Checked and left: V13 :3147 (§5.8 (3), "upward in
   aggregate, a struggling seat sinking" — both halves of the corrected law; the validator read it).
3. **"Moderate"** — prosperity's new text (item 935) brings the host's middle rung word into V13 for the first time; a
   displayed band word, not a source identifier, taken unchanged; this lane's own texts say "the middle rung".

### Sweeps

- The corrected phrases searched over V13, V14, INDEX, SUMMARY, the base, `docs/design/*.md` and the brief ("believed
  trend", "public chips", "hostility carries hardest", "strongest carrier", "drifts upward", "upward drift", "fleet
  switch", "elevation knee", "file suffix: 0", "horizons cover user events"; and "upward" and "drift" over V13): every hit is a target
  of this file or is listed in file s's *Not items* with its reason (V13 :785 and H28 :3753 "a conversion's strongest
  carrier" — one conversion's carrier, not a ranking; :3147 above); SUMMARY has no hit on any affected claim.
- Clean-room: every code span a new text adds already occurs in its target; no camel-case, snake-case or source-file
  word in a new text is absent from its target.

Scratch: `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/apply-design/`
(`items.py` the item data drawn from the verdict JSONs, `apply.py` the asserting applier, `applied.json` its log,
`render.py` the file-s renderer).

**LANDED** 2026-10-18 (see the lane line).
