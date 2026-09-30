# Seam check, round 6: content (V11) and calibration (V12), with V02 and V06 as readers

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-content-calibration-r6; covered by the whole-design retrovalidation (J84).

PROGRESS (kill-safe; one line per section: planned | done)
- §0 Inputs and method | done
- §1 Re-check of round 5 (SCC-98 – SCC-107) | done
- §2 New findings (SCC-108 onward) | done
- §3 Table and calibration census, round 6 | done
- §4 Disposition by owning volume | done
- §5 CONFIRMED versus PLAUSIBLE | done

## 0 Inputs and method

**Why this lane ran now.** Round 5 (`seam-content-calibration-r5.md`, landed 13:40) raised SCC-98 – SCC-107. Every
round-6 reconcile lane has since landed: V04 13:52, V01 13:53, V05 13:56, V06 13:59, V03 13:59, BASE-F 14:03, V07 14:05,
V08 14:12, V10 14:21, V12 14:23, V11 14:25 and V09 14:27 (the shared-file edits of V07 and V05 in V06 at 13:47 and 13:48,
and of V09 in V10 at 14:24, among them). No V02 lane ran: V02 is byte-identical to round 5's input. No lane that edits
these files was open when this lane started.

**Inputs** (md5, lines; snapshots in `scratchpad/volumes/sccr6/now/`, short-name copies in `sccr6/cur/`): V11
08477df8… (5 406), V12 95778f4d… (3 559), V02 65e5ea63… (4 828, unchanged), V06 412a7418… (4 622), `_integrate`
965ab696… (468, unchanged), file f 839ccce5… (1 806), file g b20945ba… (787; changed since round 5, below), base
01fea21f… (unchanged). Read where the seam reaches them: V01 85b488b3… (4 454), V03 eb01b7dc… (3 852), V04 9cae4284…
(4 160), V05 663afd43… (3 808), V07 215e9cae… (4 530), V08 e41d8fb7… (3 856), V09 9cdc1965… (4 913), V10 c78aac11…
(4 038).

**What was read, and how.** Round 5's snapshots (`sccr5/now/`) match round 5's recorded inputs by md5, so every line
changed since round 5 is in `sccr6/diff/` and `sccr6/udiff/`.
* **Read whole:** the diffs of V12 (401 lines), V11 (565) and file f (127, with its round-6 note), and file g's (77).
* **Read at source, whole sections:** V12 §2.6, §2.8's *Milestone ids*, §3.11 entire (the default line, *The due's corpus
  run*, *A value moved by its owning seat before its due* (1) – (3) with (2′), the three line tables, the panel rule, the
  lint, *Milestone exits*, *Staged entries*), §4.2, T-V12-20, J-V12.77 – J-V12.81, X-V12-17's round-6 clause and
  X-V12-18; V11 §2.1's settings form, §2.3's display cells, §2.8c (`RaisedWayStructure` with `span`, `RetainingSettings`),
  §3.1 rows 17 – 19, 33, 38, 52, 61, 66, 79, 80, 87 and *Display cells*, §3.5.1's `commonness`, §3.5.15, §3.24.1's
  `retaining.settings`, §3.24.2's name map, §8 (the C-steps and their *where in §16*, the non-g lines, the display and
  span cells paragraph), T-V11-1, T-V11-3, T-V11-4, J-V11.93 – J-V11.96, X-V11-17; V02 §3.10.10 (both tables, every line
  read against V12's *Staged entries* order); V06 §8 whole (the E-step table, *Exits and the calibration register*, the
  bars' registrations, both line tables, *Order and dependencies*), T-V6-12, T-V6-62, J-V6.111, J-V6.117; V04 §8's *The
  register at each exit*, *The due steps* and the J-V4.118 table, BCR-45, T-V4-45, T-V4-62, T-V4-68, J-V4.93; V03 §2.4's
  register lines and §8's PE, P1 and P6 rows; V05 §8's P1 row and T-V5-19; V01 T-V1-50; file f items 238, 244, 245, 313,
  317, 516, 578, 585 and J-RF2.4.
* **Read by seam-term grep of the round-6 diffs** (register, calibrat-, `--defaults`, preset, registry, `BenchBarDef`,
  M-CAL, `ColumnSpec`, row pointers, calibrate-later, `own`), then at source wherever a hit touched a table, a preset or
  the register: V01 (154 diff lines), V03 (343), V04 (157), V05 (113), V07 (554), V08 (210), V09 (605), V10 (392).

**Scripts** (`scratchpad/volumes/sccr6/scripts/`, round 5's, re-pointed; outputs beside them):
* `tcensus.py`: 63 table names used in a table phrase; the 9 without a registry row are V12's harness files and V02's
  `plat.ext`, as at round 5.
* `cites.py` over the round-6 added lines: 1 137 cross-volume section citations, 0 missing; 985 cross-cited T-, J-, X- and
  BCR- ids, 0 suspect.
* `readers.py`: 55 distinct reader StageIds in V11 §3.1's `readers` cells, 0 unknown; every `EVO_*` id V06 names is some
  row's reader.
* `rowrefs.py` (its registry range moved to V11's new line numbers): 56 "(row N)" pointers; every flag is a column named
  beside its own table's row, or V06's "(row 12)", which is V6 §3.2's phase-table row 12, not a registry row.
* A census of V06's table mentions against the registry rows that list no epoch reader: rows 13, 58, 62, 63, 66, 68, 69,
  73 and 84 surface; each is read at an epoch under a base stage's or a participant's id, or by a module the row lists
  (V11 §3.1's *Readers*; V6 §3.16), and T-V11-1 (b) holds the pairs at integration. No finding.

**File g changed since round 5.** Item 113 (history-first generation; owner, 2026-09-29 ~14:05 – 14:22; J124, J125) was
appended. Like items 111 and 112, it is "applied by the coherence pass to base and volumes", and no volume or file-f item
cites it yet (grep: 0 hits for "item 111", "item 112" or "item 113" in the volumes and file f). Its V11 rows
(event-to-epoch rows, burial thresholds) and V12 parts (the bars, the replay's budget) will reach this seam when they
are applied; this round raises nothing against it.

**Method.** Each of round 5's ten findings was re-checked in its owner's live text and at every text its required change
names (§1). The round-6 repair surface was then swept (the diffs), and the whole seam by the scripts, and by reading
every staged register line of V02, V04, V06, V11 and V12 against V12's new *Staged entries* order and due test (§2,
§3). New findings start at **SCC-108**. Severity as before: **blocker** — the seam cannot be built; **major** — a
contradiction or an unwired piece a builder would hit; **minor** — wording, a stale pointer, or a restatement whose values
agree.

**Decisions of this lane (vetoable).**
* **JC6-1:** Read by diffs against round 5's verified snapshots plus whole sections at source, as rounds 4 and 5 did,
  over re-reading ~2.4 MB of the four named volumes whole: every line changed since round 5 is in the diffs, and every
  section a round-6 repair or a new V12 rule reaches was read whole.
* **JC6-2:** Raised SCC-108 against V06, not V12. V06 §8 states its own lines' due ("due **M6-E**", measured on E7's
  bench), while V12 §2.8's round-6 sentence (from round 5's SCC-99 required change, this lane's predecessor's wording)
  reads V06's exit column as the due. The line's owner states its due; V12's dating of V06's stages follows it
  (SCC-109). The required change picks one due per line, the one V06's own E7 row and bench already describe.
* **JC6-3:** Raised SCC-112 as a residue of round 5's SCC-98: extending the cells check to every entry holding a cells row
  reaches owner-set picks, whose release moves cells with no cells row.
* **JC6-4:** Raised V09's application constants (SCC-115) here although V09 is the surfaces seam's, because the rule they
  miss is SCC-107's. Registry row 87's type for the non-`en` locale files (V09's open XV-V9-31) is a content-registry
  disagreement too, but seam-surfaces-r6 raises it as SR6-08 with the same required change (its file, read at 14:48), so
  it is not raised again here; the V11 lane that takes SR6-08 closes it.
* **JC6-5:** For `stateSnapCm`'s measurement (SCC-110 (c), SCC-111), chose the default line at M3a restated in place by
  a V06 line at E2 over X-V11-17 (f)'s V12 line on `bar.T-V6-62` written at M3a, because an entry naming a bar that is
  not yet registered fails the lint (T-V12-20) and V06 registers its bars at their exit (J-V6.117); the restatement is V12
  §3.11's existing *A later line* mechanism, and J-RF2.4's measurement and fallback are kept unchanged.

## 1 Re-check of round 5's issues

| id | owner | status now | evidence (current text) |
|---|---|---|---|
| SCC-98 | V12 | FIXED; **residue:** SCC-112 (owner-set picks under the widened check) | V12 §3.11 (1)'s last sentence l. 2031 – 2036 (a named `measure` line whose bars no run may name: V03 §2.4's lines, tuned at `V3-P6`, and the hand fallback in the exit's change); (2) l. 2038 – 2048 (the named-entry condition: current stage `measure`, every metric a `bar.` member whose `BenchBarDef.stages` is `[]`); (3) l. 2056 – 2061; *Milestone exits* l. 2174 – 2177 (`fallback-applied` on the hand fallback); §2.6's cells comment l. 667 – 670 (a named entry's first row is a cells row, a preset entry's excepted); §4.2's `--defaults` row; T-V12-20's `stages: []` clause; J-V12.77 amended; X-V12-18 (V03). V03 §2.4 l. 966 – 982 still reads as V12 now admits (T-V3-35 `stages` `[]`; the hand fallback) |
| SCC-99 | V12 | FIXED in V12's text; **residue:** SCC-108, SCC-109 (V06's own lines state due `M6-E`) | V12 §2.8 l. 837 – 848 (the volumes' own lines' ids; C0 `M0` … C8 `M6-U`, no `V11-` id; M3a for raised ways); the lint's due test l. 2150 – 2153; the `raisedWays` line's measure at M3a (l. 2119); the evolution lines at `V6-E7` (l. 2129 – 2130); T-V12-11, -35, -39, -40, W5, §6's row, BCR-V12-9 read M3a; T-V12-20's "`due: 'E2'` fails"; X-V12-17's round-6 clause l. 3090 – 3096; J-V12.78 amended. V11 §8's *where in §16* (l. 4193 – 4202) matches the C-step mapping cell by cell |
| SCC-100 | V12 | FIXED in V12; **residue:** SCC-113 (V04 §8's row not yet re-ordered) | V12's span-rule line l. 2131: `panel` (M4-110) at M4, then T-V4-62's conformance at `V4-U3`, then the V4-U5 panel at `V4-U5`, staged; X-V12-18 tells V04. V04 §8 l. 2840 still reads "T-V4-62 at U3 … confirmed when it passes), then the M4-110 and V4-U5 panels" (V04's round-6 lane was briefed on SLR5-01 alone) |
| SCC-101 | BASE-F | FIXED | file f item 585 l. 851: the second note, "(reconciliation round 6, seam SCC-101, SCC-91's file-f half)", in the required words; the round-4 provenance sentence kept; J-RF6.2 |
| SCC-102 | V12 | FIXED | V12 §3.11 (1) l. 2016 – 2021 (the golden test per digest; `terrace.siteShare` named); **Held** l. 2025 – 2029 with `plat calibrate register --hold`; §2.6's `held` row; §4.2's `--hold` row; §5.2's "held: a committed golden reads it"; J-V12.77's premise restated; §12's round-5 paragraph moves `terrace.siteShare` to PLAUSIBLE; T-V12-20's `--hold` clause |
| SCC-103 | V12 | FIXED | V12 §3.11 (2′) *Rows added* l. 2048 – 2056 (whatever status or due, whichever seat; "rows added after close"); (1) and (2) read only held row keys; (3) fails an unrecorded row key naming the command (l. 2061); §4.2's `--defaults` row; §5.2's report; §2.11; §1b; T-V12-20's post-M-CAL `V3-P1` clause; J-V12.80 |
| SCC-104 | V11 | FIXED in V11; **residues:** SCC-110 (V12's lines), SCC-113 (V04's names), SCC-114 (file f's names) — X-V11-17 (d) – (f)'s companions | V11 §2.1's settings form l. 373 – 381 (`ColumnSpec.row`); §2.8c `RetainingSettings` l. 699 – 700 and `RaisedWayStructure.span`, `.slideMaxFactor` l. 719 – 726 (six-rung `vaultCap`, matching BCR-45's "10 at each village rung, 40 at TOWN, 120 at CITY, 240 at METROPOLIS"); rows 79 – 80 l. 941 – 942 (rows home adds BCR-45 and items 244 – 245; row 80's readers add U-CITY, U-ACCESS and U-LINK beside U-SYS); §3.24.1 l. 3758 – 3769; §3.24.2's name map l. 3818 – 3831; T-V11-1 (a)'s prose keys; T-V11-3's settings-row check; W78; J-V11.96 |
| SCC-105 | V12 | FIXED; **residue:** SCC-113 (V04's restated rows confirm at the first stage) | V12 §2.6 `stages` l. 655 – 662 and the history `stage` row l. 664; *Staged entries* with *The order* l. 2191 – 2221; *Milestone exits* l. 2170 – 2172; the status sentence l. 2166 – 2168; §2.11's migration; T-V12-20's staged fixture; J-V12.79. Every staged line of V02 §3.10.10 (geometry, stepped, arena, `@deck`, small tables, `sunBias`, crypt, `terrace.wallBandCm`), V11 §8 (the measure-then-corpus lines) and V12 §3.11 was read against *The order*: all in order |
| SCC-106 | V03 | FIXED | V03 §2.4 l. 982 (the first line) and §8's P1 row: "should M6-P land after M-CAL's record, the restatement ships with a new major version of `roomProgram` (V12 §4.2), the entry `provisional` again"; J-V3.123 noted; RC6.4 |
| SCC-107 | V12 | FIXED in V12; **residue:** SCC-115 (V09's notes name no test for two of the constants V12 lists) | V12 §3.11's *Entries* l. 1953 – 1954 and the lint l. 2155 – 2160 (model constants only; application constants a volume confirms by its own test outside the register, the note naming the test); T-V12-20's clause; J-V12.81; X-V12-18 (V09, V10). V09 l. 2560 (`raised.previewOnReleaseKm`, T-V9-3) and l. 1211 (autosave, V9 §6's measurement) and V10 l. 3889 (T-V10-8) name theirs; V09 l. 2564 and l. 3286 do not |

**All ten are fixed in their owners' text.** Round 5 in all: 0 blocker, 5 major, 5 minor, all fixed. Six repairs left a
residue in a sibling text or opened a case their words did not cover, raised in §2: SCC-98 → SCC-112; SCC-99 → SCC-108,
SCC-109; SCC-100 and SCC-105 → SCC-113; SCC-104 → SCC-110, SCC-113, SCC-114 (with SCC-111); SCC-107 → SCC-115.

## 2 New findings (SCC-108 onward)

| id | sev. | owner | kind | claim (with evidence) | required change |
|---|---|---|---|---|---|
| SCC-108 | major | V06 | contradiction (one entry, several dues) — a residue of round 5's SCC-99 | V06 §8's register paragraph (l. 3431 – 3432): "Every line's measurement runs at E7 on the statistics bench (200 seeds) or the V6-E7 panel, due **M6-E**" — every line of its two tables due M6-E. V12 §2.8's round-6 sentence (l. 838 – 840) tells the writing seat to put a line's step into `due`: "V06 §8's E1 – E8 as `V6-E1` – `V6-E8` (its E7 panel `V6-E7`)", X-V12-17's round-6 clause (l. 3090 – 3096) the same; V12's own lines date V06 stages by step — the item-102 line's drift stage "`measure` at `V6-E5` (V06's drift, T-V6-12)" (l. 2082), after V06's shade line's exit E5 (l. 3476), and the two `decline` lines "at `V6-E7`, inside M6-E" (l. 2129 – 2130), one of which binds the base persistence cells `raised`, `retaining` that V06's own row binds too (l. 3473: exit E2, `panel (V6-E7…)`, under "due M6-E"). So the base cells' one entry has two dues (M6-E, `V6-E7`), and a V06 line's entry three candidates (M6-E; its exit step, `V6-E2` …; `V6-E7`, where the bench runs). All pass the lint's due test (l. 2150 – 2153) but fall at different exits: a failing T-V6-8 opens its `fallback` run at E2's exit, E7's or M6-E's. V06 is not self-consistent either: E7's tests (l. 3416: T-V6-5–9, 13, 16, 18, 24, 25, 29, 34, 36) lack bars its E1 – E6 lines name (T-V6-10, 12, 28, 31, 32, 43, 54) and hold E8's T-V6-34, while E8 "may slip without blocking E1–E7" (l. 3485 – 3486), so E8's lines (`excavate.*`, `catacomb.primaryHysteresis`; bars T-V6-34, 37, 40) cannot be measured at E7 | V6 §8's register paragraph replaces "Every line's measurement runs at E7 on the statistics bench (200 seeds) or the V6-E7 panel, due **M6-E**" with: "Each line's entry is written, and each bar it names registered, by the seat landing its exit step (`--milestone V6-E<n>`, V12 §2.8's form). Its `due` is `V6-E7` for a line whose exit is E1 – E6 — E7's exit runs the statistics bench (200 seeds) over every bar those lines name and sits the V6-E7 panel — and `V6-E8` for E8's lines, whose bars run at E8's exit (E8 may land after E7)." E7's tests cell reads "T-V6-5–10, 12, 13, 16, 18, 24, 25, 28, 29, 31, 32, 36, 43, 54" (T-V6-34 stays with E8, which lists it). The base-persistence row (l. 3473) keeps its exit (E2) and its second value ("each rate × 0.5") and cites "V12 §3.11's base `decline` line (method, metric, due `V6-E7`)" in place of restating them. A J-V6 row (amending J-V6.111); an X row to V12 (SCC-109) |
| SCC-109 | minor | V12 | V12's statements about other volumes' lines (follows SCC-108; and SCC-113's X-V12-18 claim) | V12 dates V06's stages by V06's exit column (SCC-108's evidence: l. 838 – 840, 2082, 3090 – 3096; T-V12-20's "two stages at unordered rows (`V5-P1`, `V6-E5`)"). *The order* (l. 2213 – 2216) orders "two stages at one row following their step numbers (`V4-U3` before `V4-U3b` before `V4-U4`)", but V6 §8's *Order and dependencies* (l. 3482 – 3486) runs E2, E3, E5 and E6 "in any order", E7 after them and E8 unordered against E7. X-V12-18 (l. 3097 – 3100) says V4 §8's rows "read so as they stand" under *Staged entries*, while V04's rows confirm at the first stage (SCC-113) | The item-102 line's drift stage reads "`measure` at `V6-E7` (V06's drift fixture's `shade.gap` on E7's bench, T-V6-12)"; §2.8's round-6 sentence and X-V12-17's round-6 clause read "V06 §8's steps E1 – E8 as `V6-E1` – `V6-E8`: a line's exit step in `--milestone`; its `due` as V6 §8 states it (`V6-E7`, or `V6-E8` for E8's lines)"; T-V12-20's pair reads "(`V5-P1`, `V6-E7`)"; *The order* adds after "following their step numbers": "— volume 6's steps by V6 §8's *Order and dependencies* instead (E2, E3, E5 and E6 in any order after E1, E4 after E1, E7 after E1 – E6, E8 unordered against E7)"; X-V12-18's V04 sentence reads "V4 §8's rows take the staged reading (seam SCC-113)". J-V12.79 noted |
| SCC-110 | major | V12 | unwired cells and a disagreement on a confirming measurement (X-V11-17 (f) unapplied; SCC-104's V12 half) | V11 §3.24.2 (l. 3818 – 3831) makes V04 BCR-45's span-rule constants cells of row 80's `structure` row — `span.vaultShare[kind]`, `span.maxHeightCm`, `span.minHeadroomCm`, `span.maxFallCm`, `span.vaultCap[rung]`, `span.deckDepthCm`, `span.supportFoundationCm` — and item 244's slide bound `slideMaxFactor`, "its register entry V12's span-rule line (the `span` block, owner V04) or the `raisedWays.structure` line"; and `retaining.settings.stateSnapCm` (l. 3758 – 3769) takes "V12's `retaining` line until V12 gives it the line X-V11-17 (f) proposes". V12 landed two minutes before V11 and still reads: the span-rule line names V04's prose keys (`raised.vaultShare`, "the headroom and fall bounds, the cap, the deck depth", `raised.supportFoundationCm`; l. 2131), not row 80's cells; the `raisedWays.structure` line (l. 2120) ends "and every other calibratable column", which by the catch-all rule (l. 2070 – 2075) binds every calibratable column of the row "that no other register line names" — the `span.*` cells, which the span-rule line names only by prose keys the lint cannot match, so the M3a seat writes two entries for one knob (the lint fails, l. 2075) or must choose the line; and the `retaining` line's catch-all holds `stateSnapCm` (l. 2118: `panel` M4-110 at M4 on `retaining.lengthM`, the panel rule), while file f's J-RF2.4 (l. 1173 – 1177) names its confirming measurement "T-V6-62's H-TERRACE century, run with this carry, keeping every decayed run within 100 cm of its old place across each re-derivation" and its pre-decided fallback "the wall's own `stepProfile` sample spacing as the tolerance" — an M4 panel sees no wall an epoch has re-levelled, so it cannot see the snap | (a) The span-rule line's first cell reads "V04's span-rule constants, the cells `raisedWays.structure.span` (row 80; V11 §3.24.2's name map; values stated in V04 BCR-45): `vaultShare` by kind (V04's `raised.vaultShare`, scaled by the era and culture `raisedVaultM`), `maxHeightCm`, `minHeadroomCm`, `maxFallCm`, `vaultCap` by rung, `deckDepthCm`, `supportFoundationCm` (J-V4.93)"; owner V04. (b) The `raisedWays.structure` line's cell adds "`slideMaxFactor` (file f item 244)" and ends "and every other calibratable column but the `span` block (the span-rule line's)". (c) The `retaining` line ends "and every other calibratable column but `settings.stateSnapCm`", and the *Items 109 and 110 by column* paragraph adds: "`retaining.settings.stateSnapCm` (row 79; file f item 245, J-RF2.4; owner `base`, whose value it holds, as the `span` cells' is V04): the default line's entry at M3a, restated in place at `V6-E2` by V6 §8's line on `bar.T-V6-62`, J-RF2.4's measurement (*A later line*; SCC-111), due `V6-E7` — a bar V06 registers at E2 cannot be named by an entry written at M3a (T-V12-20: an entry naming an unregistered bar fails)". (d) A J-V12 row; X-V12 notes to V04 (SCC-113), V06 (SCC-111) and file f (SCC-114); X-V11-17 (f) is then met by this route (JC6-5) |
| SCC-111 | minor | V06 | a confirming measurement named elsewhere that its owner's test does not state (SCC-110's V06 half) | V11 §3.24.1 (l. 3761 – 3763) and file f J-RF2.4 name T-V6-62's H-TERRACE century, run with the knot carry, as `stateSnapCm`'s measurement. T-V6-62 (l. 3374) checks the walls' making, slumps, restoration and tombstones but states no knot-carry clause, and V6 §8's bars table (l. 3448 – 3465) registers no `bar.T-V6-62`, so no register entry can name it | T-V6-62 gains: "(J-RF2.4; file f item 245) across each re-derivation of a generated wall on H-TERRACE — after an edit that re-levels a unit and at every epoch op that levels — every decayed run's state knots lie within `retaining.settings.stateSnapCm` of their old place, and no knot whose vertex survives is dropped". V6 §8's bars table adds `bar.T-V6-62`: statistic "knots moved beyond the cell; knots dropped whose vertex survives (count, count)", towns `H-TERRACE` (TOWN, CITY), stages `S10`, `S11` (the knot carry runs under their ids, V11 §3.24.1), exit E2, listed in E7's tests (SCC-108). V6 §8's line table adds: "`retaining.settings.stateSnapCm` (V11 row 79; file f item 245; owner `base`) \| E2 \| `measure` \| `bar.T-V6-62` \| J-RF2.4's: the tolerance becomes the wall's own `stepProfile` sample spacing and the bar re-runs; a second miss `not-achieved`" — the E2 seat registering the bar and restating in place the default entry the M3a seat wrote (V12 §3.11's *A later line*; after M-CAL's record only under a new major version of `retaining`, V12 §4.2), due `V6-E7` (SCC-108) |
| SCC-112 | major | V12 | an unwired case of the widened check (a residue of round 5's SCC-98) | Round 6 widened (3) (l. 2056 – 2061) from default entries to "every entry whose target is a cell or a column without `preset` and whose history holds a cells row", and made every named entry's first row a cells row (§2.6 l. 667 – 670). An owner strip pick "becomes an `owner-set` register entry …, released in the next table version as a declared shift" (§3.9 l. 1796 – 1797; §4.3 l. 2394 – 2395), and §2.6 keeps "a pick's" row among the rows that are not cells rows (l. 672). After the release the entry's target cells differ from its last cells row (its first row, or a run's), so (3) fails it naming `plat calibrate run` — yet "no run and no seat moves an owner-set value afterwards" (V12 §3.7.2 rule 2), and a pick is no run. The change that releases a pick can never pass `--check` (T-V12-20, PR tier), so its milestone cannot exit green | §2.6's cells comment lists among the cells rows "a pick's row whose release moves the target's cells in place (V12 §3.9: the next table version, a declared shift) — its value the released cells by row key", and the non-cells list reads "a pick's row that moves no cell"; §3.9's sentence adds "the change that releases it runs `plat calibrate register`, which appends that cells row"; §4.2's `plat calibrate register [--check]` row reads "entry statuses from runs, picks and M-1 records, and a released pick's cells row". T-V12-20 gains: "a fixture named entry confirmed at M4 whose strip pick is released moving one cell passes `--check` once `plat calibrate register` has appended the pick's cells row, and fails before it". A J-V12 row |
| SCC-113 | minor | V04 | restated rows that disagree with V12's staged form and V11's cell names (the V04 halves of SCC-100, SCC-104 and SCC-105) | V4 §8's J-V4.118 table (l. 2835 – 2840) confirms at the first stage — the `distinct` row "T-V4-45 at U3 …; confirmed when the share ≤ 5 %", the other-cells row "T-V4-43's presence rates and T-V4-44's structure at U3 (confirmed when both pass), then the V4-U5 panel", the span row "T-V4-62 at U3 (conformance, 0 violations; confirmed when it passes), then the M4-110 and V4-U5 panels" — while V12's *Staged entries* (l. 2198 – 2203) confirms only at the last non-`corpus` stage and V12's span-rule line (l. 2131) orders M4 → `V4-U3` → `V4-U5`, writing "V4 §8's row takes this order"; a V04 seat writing the span entry in V04's order is refused by the lint (l. 2219 – 2221). The span row, BCR-45 (l. 3395 – 3404) and J-V4.93 (l. 2963) name the constants `raised.vaultShare`, `raised.vault.maxHeightCm`, … , not V11's `raisedWays.structure.span.*` (V11 §3.24.2; X-V11-17 (d)) | The table's head reads "the history row at each stage, and what passes it (V12 §3.11's *Staged entries*: the last non-`corpus` stage's pass confirms)"; the `distinct` row "… the U3 stage passes when the share ≤ 5 %; the V4-U5 panel's rated pass confirms"; the other-cells row "(the U3 stage passes when both pass)"; the span row "the cells `raisedWays.structure.span.*` (row 80, V11 §3.24.2; their values in BCR-45) — the M4-110 panel at M4, then T-V4-62 at `V4-U3` (conformance, 0 violations; the stage passes), then the V4-U5 panel's `realism`, which confirms (V12 §3.11's span-rule line, the line's home)". BCR-45 and J-V4.93 name the cells `raisedWays.structure.span.*` beside the prose keys, the values unchanged and stated once in BCR-45 |
| SCC-114 | minor | BASE-F | base text lagging V11's cell names (SCC-104's file-f half; X-V11-17 (e)) | File f item 244's support step (3) (l. 167): "≤ 1.5 × the band's upper bound (own, calibrate-later, `extension`)", unnamed; item 245 (l. 169) and J-RF2.4 (l. 1174): "`retaining.stateSnapCm` (100 cm; our own, calibrate-later)". V11 holds them as `raisedWays.structure.slideMaxFactor` (row 80) and `retaining.settings.stateSnapCm` (row 79's named `settings` row); reconcile-V11-r6's 14:18 lane note proposed the words for this file's next round | Item 244's step (3) reads "≤ `raisedWays.structure.slideMaxFactor` × the band's upper bound (1.5; volume 11's cell, row 80; own, calibrate-later, `extension`)"; item 245 and J-RF2.4 read "`retaining.settings.stateSnapCm` (volume 11's `retaining` table, its named `settings` row; 100 cm; our own, calibrate-later)"; J-RF2.4's confirming measurement adds "(volume 6 §8's `stateSnapCm` line on `bar.T-V6-62`, restating the default entry; seam SCC-110, SCC-111)". Values unchanged; a J-RF row |
| SCC-115 | minor | V09 | provenance notes that do not name the test SCC-107's rule requires | V12 §3.11 (l. 2155 – 2160) keeps "V09's autosave limits, `raised.previewOnReleaseKm`, the deck scenes' export cap and its times" outside the register only as constants "its volume confirms by its own test or performance row … its provenance note names that test". V09 l. 2564: "the deck scenes' cap per export \| 8 \| BCR-V9-31 (c) \| our own, calibrate-later" — no test; l. 3286: "These size caps and load times are our own and calibrate-later at M1 (V9 §8)" — a build-plan section, and no T-V9 row measures the load times (grep of V9 §7). By V12's rule each of them needs a `thr.` entry, which V12 meant to exclude | V09's provenance notes name each constant's confirming test: l. 2564 "our own, calibrate-later by T-V9-61 (each deck scene's export at the cap within V9 §6's export budget; an application constant, V12 §3.11: no register entry)", with that clause added to T-V9-61; l. 3286 "… calibrate-later at M1 by T-V9-<n>", a new T-V9 row (or a clause of T-V9-3) measuring the warm and cold loads and the shell's size caps on the reference machine and link. XV-V9 note to V12 (no edit) |
| (not raised) | — | V11 | registry row 87's row type | V11 §3.1 row 87 (l. 949) types every `messages/<locale>.json` as `MsgRow`; V09 §2.9's *Locales* (l. 778 – 782) and XV-V9-31 (l. 4251) type a non-`en` file `{ key; text }` | carried by seam-surfaces-r6's SR6-08 with the same required change (JC6-4); not a finding of this round |

## 3 Table and calibration census, round 6

**Tables read across the seam.** Every table V12, V02, V06 and the other volumes read has a row in V11 §3.1's registry
(`tcensus.py`: 0 content tables unregistered), every "(row N)" pointer is right (`rowrefs.py`), and every reader StageId is
registered (`readers.py`). Changes since round 5:

| reader | table / cells | V11 home (registry row) | status |
|---|---|---|---|
| the base's support step and span rule (S4, S5b, S6, EVO_RAISED; a declared way's operator); V04's `foundationObstacles` (U-SYS, U-CITY, U-FADE, U-ACCESS, U-LINK) and arch vaults | `raisedWays.structure.span.*`, `.slideMaxFactor` | row 80 (V11 §2.8c, §3.24.2) | present (SCC-104); the register lines do not yet name them (SCC-110); V04 and file f still use the prose keys (SCC-113, SCC-114) |
| S10 and S11's knot carry (at generation after an edit that re-levels a unit, and inside the levelling epoch ops) | `retaining.settings.stateSnapCm` | row 79's named `settings` row (V11 §2.1's settings form, §3.24.1) | present; its register binding disagrees with file f's J-RF2.4 (SCC-110, SCC-111) |
| V09's roster reader, palette and cards; V10's message slots; V08's notes; `@plat/docs` | the display cells `label`, `icon?`, `synonyms`, `commonness` | rows 17, 18, 19, 33, 52 (V11 §2.3, §3.1's *Display cells*, §3.5.15) | present, `own`, `calibratable: false`, read by no model stage — no register entry, no golden. The town rows' `commonness` is compiled from the count cells (J-V11.94), so a table version that moves a count moves it in the same compile; the `v.` rows' is written by V07's script and re-checked by T-V7-56 (J-V7.133) |
| V06's participants `village.plan`, `village.density`, `village.pins`, `village.records` and the siting step (m) at a village epoch | `village` | row 61 | present; row 61's gloss names them (SR5-09 (b)) |
| the application and V10 | `messages/<locale>.json` | row 87 | present; its row type for the non-`en` files is seam-surfaces-r6's SR6-08 (JC6-4) |

**Preset vocabulary.** Unchanged: the same five (`MFCG`, `FTG`, `VG`, `FM`, `NG`) in V11's `PresetId`, V12's `PresetArm`
and target unions and file f items 376, 497, 581 and 584. No round-6 text adds a preset entry. No finding.

**The register's writers and checks.** Every calibratable column in the seam has a line that writes its entry:

| volume | its entries |
|---|---|
| V01 | the default line at M1, M2b, M3a and M5, with the moved-value rows of V12 §3.11 at M5 and, where the golden check refuses one, the held row (V1-8.1; V12 §3.11 (1), SCC-102) |
| V02 | V2 §3.10.10's lines with eleven `BenchBarDef`s — eight of them staged, every one in V12's order |
| V03 | V03 §2.4's lines (the `room` role's area on the first; the P6 tuning and the hand fallback by V12's cells row, SCC-98; the post-M-CAL restatement by a major version, SCC-106); PE's cells on the default line, the band rows at `V3-P1` as rows added (SCC-103) |
| V04 | V12's named lines for its cells, the rest on the default line; V4 §8's J-V4.118 table restates the confirmations (SCC-113) |
| V05 | the default line (due `M-CAL/sky` when late); the item-102 line's island stage at `V5-P1` (T-V5-19) |
| V06 | V6 §8's lines with sixteen `BenchBarDef`s; their due (SCC-108), with T-V6-62 still to register (SCC-111) |
| V07 | the one `@VG` entry, the rest on the default line |
| V09, V10 | none: every column of rows 86 – 89 is `calibratable: false`; their calibrate-later application constants stay outside the register when their notes name a test (SCC-107; SCC-115) |
| V11 | V11 §8's non-g lines with two `BenchBarDef`s (its C-steps dated by the §16 ids they are built inside); file g's lines are V12's |
| the base's cells | V12's `base` lines |

Four joints remain, each holding §2's findings:
1. **Dues.** V06's lines are due M6-E by V06 and at their steps by V12 (SCC-108, SCC-109).
2. **Names across the seam.** The span-rule and snap cells are V11's, but V12's lines, V04's rows and file f still name
   them by V04's prose keys, and the snap's line contradicts file f's decision (SCC-110, SCC-111, SCC-113, SCC-114).
3. **Rows the widened check does not type.** An owner-set pick's release (SCC-112).
4. **Pointers and notes.** V04's rows confirm at the first stage (SCC-113). V09's notes name no test for two
   constants (SCC-115).

**V02 and V06 as readers.**
* **V02.** Unchanged since round 5. Its eight staged lines — geometry (M6a → M6 → M-CAL), stepped (M3a-V2 → M4 → M6),
  arena (M3a-V2 → M6), `@deck` (M3a-V2 → M4), the small tables (M6a, M6b → M6), `sunBias` (M6 → M-CAL), the crypt
  (`V4-U3b` → `V4-U5`), `terrace.wallBandCm` (M3a-V2 → M4) — each satisfy V12's *The order* and due test, and V12 §2.8
  maps the crypt line's steps. No finding.
* **V06.** Its round-6 diff (TW-05, TW-08, SR5-04, SR5-09 and V07's and V05's shared edits) touches no register line and
  adds no table read the registry lacks. Its §8 lines meet SCC-108 (the due) and SCC-111 (T-V6-62).
* **`_integrate`.** Unchanged. Its product-order questions leave M4b, M5 and the staged rows unordered, which V12's
  *The order* reads (V12 §3.11).

## 4 Disposition by owning volume (round 6)

| owner | blocker | major | minor | ids |
|---|---|---|---|---|
| V12 | 0 | 2 | 1 | SCC-110, SCC-112 (major); SCC-109 (minor) |
| V06 | 0 | 1 | 1 | SCC-108 (major); SCC-111 (minor) |
| V04 | 0 | 0 | 1 | SCC-113 |
| BASE-F | 0 | 0 | 1 | SCC-114 (file f items 244, 245, J-RF2.4) |
| V09 | 0 | 0 | 1 | SCC-115 |
| **total** | **0** | **3** | **5** | 8 findings (SCC-108 – SCC-115); round 5's ten all fixed (§1) |

No finding is a blocker: each closes inside one volume's text or one file-f item, and none stops a milestone from
starting. Each major stops an exit or makes a seat choose:
* **SCC-108:** every V06 entry's due, and the base persistence cells' one entry, which two texts date differently.
* **SCC-110:** the M3a seat landing BCR-45, whose span cells two V12 lines bind, and the snap's confirming measurement.
* **SCC-112:** the first release of an owner strip pick, which `--check` fails.

**Grouped for the lanes:**
* **V06:** SCC-108 first (the dues and E7's tests), then SCC-111 (T-V6-62's clause and its bar).
* **V12:** SCC-110, then SCC-109 (which follows SCC-108's dues), then SCC-112. SCC-110 (c) leaves `stateSnapCm` on the
  default line until SCC-111's V06 line restates it at E2; either may land first, each citing the other's text.
* **Single items:** SCC-113 (V04), SCC-114 (BASE-F), SCC-115 (V09).

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED by reading** (the lines cited in each row, in the files at §0's md5s):
* §1's ten re-checks, at every text their required changes name.
* SCC-108: V06 l. 3416, 3420 – 3434, 3473, 3476, 3482 – 3486; V12 l. 838 – 840, 2082, 2129 – 2130, 2150 – 2153, 3090 –
  3096.
* SCC-109: V12 l. 2213 – 2216, 3097 – 3100 and T-V12-20; V06 l. 3482 – 3486.
* SCC-110: V11 l. 3758 – 3769, 3818 – 3831; V12 l. 2070 – 2075, 2118, 2120, 2131; file f l. 1173 – 1177.
* SCC-111: V06 l. 3374, 3411, 3448 – 3465; V11 l. 3758 – 3769.
* SCC-112: V12 l. 667 – 672, 1796 – 1797, 2056 – 2061, 2394 – 2395 and §4.2's `plat calibrate register [--check]` row.
* SCC-113: V04 l. 2835 – 2840, 2963 and BCR-45's span rule; V12 l. 2131, 2198 – 2203, 2219 – 2221.
* SCC-114: file f l. 167, 169, 1174; V11 l. 719 – 726, 699 – 700; the 14:18 lane note.
* SCC-115: V12 l. 2155 – 2160; V09 l. 1211, 2560, 2564, 3286 and §7's rows (no load-time test).
* Row 87 (not raised, JC6-4): V11 l. 949; V09 l. 778 – 782, 4251; seam-surfaces-r6 l. 260 – 263.

**CONFIRMED by execution:**
* The diffs against round 5's verified snapshots (14 changed files).
* `tcensus.py` (63 names; the 9 without a row are harness files and an export extension).
* `cites.py` (1 137 citations and 985 ids in added lines, 0 missing, 0 suspect).
* `readers.py` (55 reader StageIds, 0 unknown).
* `rowrefs.py` (56 row pointers, 0 wrong).
* The census of V06's table mentions against rows without an epoch reader, and the greps of §0.

**PLAUSIBLE (reasoning only):**
* **That the required changes are the owners' best mappings.** SCC-108 might instead date each V06 line at its exit
  step, E7 then running only the fallback re-runs and the panel; V06 owns the choice, and SCC-109 follows whichever it
  states. SCC-112 might instead exempt `owner-set` entries from (3); the cells row keeps the check able to catch a later
  in-place move.
* **That the span-rule line's `V4-U3` stage is confirmable as written.** Its metric is `raised.count`, while the stage
  passes on T-V4-62's conformance, which V04 registers as no bar (J-V4.117, J-V4.118). V12's *Milestone exits* reads
  such a line's stated condition; this lane did not reopen that pre-existing pattern.
* **That the `v.` rows' stored `commonness` never drifts.** No run moves a `v.` count in place (their default-line and
  catch-all entries close into historical packs, and rows added after close keep their values); a later major table
  version would re-run V07's script, which T-V7-56 holds.
* **That no other volume dates a V06 stage.** The grep finds V12's lines only.
* **That items 111 – 113 reach this seam unchanged in kind.** They are applied by the coherence pass; their rows are
  checked when they land.

**Not re-read this round:** the parts of the volumes that no round-6 repair touched and that lie outside §0's sections
read at source. Earlier rounds swept them; this round checked them by the scripts and by reading every staged register
line against V12's new rules.
