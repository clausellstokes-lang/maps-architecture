# Coherence verify — the determinism part (§5, §6, §7), round 2 (seat coherence/verify-determinism-r2t)

Written by Opus (verifier seat). Scope: base `## §5 `, `## §6 `, `## §7 ` after repair round 2 (coherence/assemble-r2, base
sha256 `4ed292e9…`), checked against the pre-round text (assemble-r1's `137ecc0e…`), the archive, the inventory, the canon
(with its dated rulings), the adjudicator's binding rulings `adjudication-r2.md` (R2-01 – R2-42), the eighteen
`repair-r2-*.md` files and `assemble-r2.md`. Nothing in the design files was edited.

PROGRESS (lane `coherence/verify-determinism-r2t`, 2026-10-01)
- P1 inputs extracted (pre-round and live base; the blocks routed into §5–§7 identified): done
- P2 the 27 round-1 findings re-checked against the live text and the rulings: done
- P3 the 10 replaced subsections diffed whole against the pre-round text; every changed hunk read with its targets: done
- P4 g items 120–126 parts (determinism's: 122 DR44, 123 §6.3, 124 §6.1, 125 §7.7; 126's phone clauses): done
- P5 cross-unit seams the round touched (the 18 repair preambles' hand-offs to or from §5–§7): done
- P6 terms, deferral, narration, references, ids, size, document checks over §5–§7: done
- P7 issues, result file, LANDED: done

## 1. Inputs

| input | what |
|---|---|
| live text | `docs/ARCHITECTURE.md` l.8836–12135 (§5 8836–9163, §6 9164–10021, §7 10022–12135), sha256 `4ed292e94f2442e5…` (= assemble-r2's output, HEAD 91f0792) |
| pre-round text | `git show 682e8e9:docs/ARCHITECTURE.md`, sha256 `137ecc0e4fe12c44…` (assemble-r1's output, the text round 1 verified) |
| blocks into §5–§7 | `work/assemble-r2/blocks.json`: determinism's 10 REPLACE blocks only — §5.2, §5.3, §5.4, §6.1, §6.2, §6.3, §6.5, §7.1, §7.4, §7.7. No other unit's block lands in §5–§7. §5.1, §6.4, §7.2, §7.3, §7.5, §7.6, §7.8 and the three section heads are identical to the pre-round text (compared subsection by subsection) |
| round-1 findings | `verify-determinism-r1t.md`, `results/coherence_verify-determinism-r1t.json` (27: VDC0-27, VDC0-33, G122- – G125-determinism, VDC1-01 – VDC1-21) |
| rulings | `adjudication-r2.md`: R2-01, R2-05, R2-11, R2-18 – R2-21, R2-24, R2-27, R2-35 – R2-41 whole; Part H (determinism, and every other unit's rows that dispose a VDC id); canon.md's dated rulings for g items 120–126 and adjudication round 2 |
| repairs | `repair-r2-determinism.md` (24 routed: 23 FIXED, VDC0-33 INVALID; 10 judgment calls; hand-offs), and the hand-off notes of the other 17 repair files |
| others | `docs/AMENDMENTS-2026-09-28g.md` items 120–126 (122 (h)–(i) included); live V03, V04, V06, V07, V08, V09, V10, V11; `work/assemble-r2/ambiguous-refs.tsv` |

## 2. Method

- **Round-1 findings:** each of the 27 re-read at its site in the live text and at every home it names, whoever owned it,
  against its Part H disposition (FIX must match the ruling's text, not the round-1 wording).
- **Replaced subsections:** a word-level diff of each of the 10 replaced subsections against the pre-round text (41
  hunks, ≈ 2 380 added words); each hunk read, and every claim in it checked at its target (another base section, a
  volume section, a table row, a type, a test id). §6.1 and §7.7's precedence, layer 2, items 1 and 10 and DR42–DR44
  read whole as they now stand.
- **g items (as new design):** determinism's parts of 122 (DR44), 123 (§6.3 *Plan damage*, §6.1's row, §6.5 (9)), 124
  (§6.1 *The weather stream*, the row, §6.2, §6.5 (9)) and 125 (DR1, DR2, DR3, DR19, DR29, DR34, DR42, layer 2, items 1
  and 10, `TradePartner.source`) checked against the item's text, the canon's routing and R2-37 – R2-40: producer and
  every reader, lifecycle, edges at their limits, agreement with the other units' parts (model §2.6 step 7, §2.7, §2.9;
  pipeline §4.11 *The clock*, §10.2 *Crisis looks*; rendering §8.2, §8.6, §11.1; scope §14 `HostContext`; V03 §5.6; V04
  §5.6; V06; V07; V08 §3.16 (9); V09 §4.9, §4.21.14; V11 §3.25.9 – §3.25.11). Items 120, 121 and 126 name no
  determinism part; 126 (a2): no phone clause in §5–§7 (scan: 0).
- **Seams:** every hand-off the 17 other repair preambles address to determinism (V11: three; rendering: one; pipeline:
  three; V08: one restated) and every one determinism addressed to others, checked at its destination.
- **Terms, deferral, narration, ids, references:** the canon's 35 retired-term patterns over the live §5–§7 (3 hits, none
  a survivor: twice the correct "standalone neighbourhood document", once "V06's hand-over", the owner's and the canon's
  own word for item 122's aftermath, a different concept from G-unitinput's retired unit-run view); a deferral and a
  narration scan of the added text (0); DR44, `plan.damage`, `view.weather`, `refuse.epoch.cap`,
  `refuse.water.reservation` and `refuse.table.required` unique and cited consistently; every bar id §5–§7 cite
  (T20-14 – T20-16, T114-9, T122-1/-2/-4, T123-1/-3, T124-9, T125-1/-2) defined once in §13.2; assemble-r2's reference
  check (0 broken) and its ambiguous-form list (0 entries in l.8836–12135); the added text's section pointers spot-checked.

## 3. Results

**Round-1 findings (27): all closed.**

| verdict | ids |
|---|---|
| FIXED as ruled (25) | VDC1-01 (§7.1's table-edit row without the stamped-cell clause; `refuse.table.required` in VEL1-03's wording, with V11 §4.1 and §3.2.3 agreeing), VDC1-02 (E-07's lead), VDC1-03 (`refuse.epoch.cap`; §6.1 names it back), VDC1-04 (`refuse.water.reservation`; *The returned kinds*' `unlock`, every row named exists with `refuse.locked`), VDC1-05 (F-EDIT's action cell), VDC1-06 (with VM-R1T-11's §6.1 half; "§2.7's span rule (3)" and "support step (1)" resolve, l.2513–2557), VDC1-07, VDC1-08, VDC1-09 (§4.6 step 8 (d)'s bound and the *Bars* sentence, l.6478–6482), VDC1-10, VDC1-11 (V11 l.864), VDC1-12 (§7.7's precedence, R2-18 (b)), VDC1-13 (V09 l.197, l.332, l.2164–2165, l.3864), VDC1-14 (V09 §4.9: `refuse.table.ownerRule` gone, the three keys added, the `reroute` clause dropped), VDC1-15 (§11.2 l.15890), VDC1-16 (J-A113.61, base l.22367, rationale l.805), VDC1-17 (T20-2, T20-6, T20-14 – T20-16, l.17516–17535), VDC1-18 (T114-9, l.18044; V07 T-V7-59), VDC1-19 (J-DET-11, J-A20.71, R25), VDC1-20 (§2.7 l.2356), VDC1-21 (§10.3 l.15439), and G122- – G125-determinism (their parts present: DR44; §6.3 *Plan damage* with its row and test; §6.1 *The weather stream* with its row and test; DR1, DR3, DR19, DR29, DR42 re-sourced, item 10's order, item 1) |
| FIXED as ONE FIX (1) | VDC0-27 with VKr1-01: F-RIVER's detection reads "descent stalls in a sink (§4.2 S1 (3));" — §4.2 S1 (3) traces the course by steepest descent |
| INVALID, closed for good (1) | VDC0-33 (R2-01) |

The repair's other fixes in §5–§7 hold where checked: VAH-r1-06 (E-07's head names the gates outside a dry run; V09 §4.9's
lead names the same producers, no screen gate), VAT0-07 (§6.1's epoch numbering, R2-20's text), VEL1-03, VKr1-06 (§7.4's
frame row, R2-24; §7.8 defines the consuming stage), VM-R1T-11's §5.3 half (`Household.transit` at §2.7 l.2357), R2-18 (a)'s
§5.3 capacity row (agrees with §2.6's clamp, l.2161–2165). Judgment (7) (DR29's later-latitude path dropped) is no lost
fact: the pre-round V08 gave `PortValues.latitudeDeg` the realm block as its only producer.

**New problems in the replaced subsections and their seams (17 issues, §4).** The weather stream leaves an edge undefined
(a gap drawn where no kind is live, and a season change during a gap) and omits inputs, a mark keying and a lint scope
(VDC2-01 – VDC2-04). The damage design is stated two ways across units: the threshold's range "by material" (VDC2-06), and
the one comparison as "level ≥ t" in model and rendering against "above 0 and at least t" in determinism, V03 and V11
(VDC2-07, VDC2-08). DR44 and §10.2 give `regional_migration_pressure` no look, against item 122 (b) and V11 (VDC2-09,
VDC2-10). Item 125's retirement of the realm block left one ambiguous sentence in §7.7 item 1 (VDC2-11) and four residues
elsewhere (§11.1's geo anchor, §4.7's chain store, V06 §1b, V07 §3.2) that contradict §7.7's re-sourced rows (VDC2-12 –
VDC2-15). Pipeline's new no-route refusal in II.7.6 has no cause in E-07 (VDC2-16, VDC2-17). V09 and V11 disagree on a press
of Start a shower now in a week with no live kind (VDC2-04, VDC2-05).

**g items.** 120, 121, 126: no determinism part named; no phone clause in §5–§7. 122: DR44 present at build depth (inputs,
the closed mapping, scale by severity, tier or headcount, placement, knowledge admission, the epoch-path aftermath, the
preview, `render.instances`, T122-1/-2/-4; item 10's range sentence names it), one wording defect (VDC2-09). 123: present
(one uniform per element on `plan.damage`, structured key, no id minted, fixed-key pattern, monotone, reversed by
restoration, the cellar and crypt keys, registry row, §6.5 (9)'s test), with VDC2-06 – VDC2-08. 124: present (session
seed outside the model, spell key, registry row, §6.2's two lines, §6.5 (9)'s test), with VDC2-01 – VDC2-05. 125: present
(DR1, DR2, DR3, DR19, DR29, DR34, DR42 without a host input; item 10's order "the dossier's, then the blueprint's own"
with the reported fallback; item 1's `HostContext` and custom definitions agreeing with §14 l.19158 and V08 §3.16 (9); the
week agreeing with §2.9 *The week's source* and §4.11 *The clock* (1)), with VDC2-11 – VDC2-15.

**Size (principle (9)).** §5–§7 words: archive 61 955 → round 0 72 855 → round 1 76 465 → round 2 78 488 (+2 023, +2.6 %
this round). §5 11 333 → 11 402, §6 14 039 → 15 180, §7 51 093 → 51 906. The growth is the owner items' new design
(DR44, *Plan damage*, *The weather stream*, item 125's rows) and the round-1 fixes' rows and edges; the words removed are
narration (VDC1-10) and the retired realm inputs. The unit stands 26.7 % above the archive, outside the shrink band; the
repair file states the content that holds it (owner items at build depth). It did not shrink by more than half, so no
nuance audit was owed.

**Document checks.** `doc_checks.py --sections 5,6,7` on the live base: exit 0 — C1 5/0, C2 1/0, C3 269/0, C4 0/0, S1 0/0,
S2 208/0 (hits/unreviewed) — with the warning "reference corpus INCOMPLETE (missing: captures, research/patreon,
research/devlogs, research/ftg-docs, research/external) … NOT authoritative": provisional.

## 4. Issues

17 issues: 0 blocker, 1 major, 16 minor. Owners: determinism 8, V09 2, rendering 2, pipeline 2, model 1, V06 1, V07 1.
New ids carry the r2 marker (VDC2-nn); no round-1 id persists.

| id | severity | kind | owner |
|---|---|---|---|
| VDC2-01 | major | EDGE-UNDEFINED | determinism |
| VDC2-02 | minor | WIRING | determinism |
| VDC2-03 | minor | WIRING | determinism |
| VDC2-04 | minor | CONFLICT | determinism |
| VDC2-05 | minor | CONFLICT | V09 |
| VDC2-06 | minor | CONFLICT | determinism |
| VDC2-07 | minor | CONFLICT | model |
| VDC2-08 | minor | CONFLICT | rendering |
| VDC2-09 | minor | CONFLICT | determinism |
| VDC2-10 | minor | CONFLICT | pipeline |
| VDC2-11 | minor | CONFLICT | determinism |
| VDC2-12 | minor | CONFLICT | rendering |
| VDC2-13 | minor | CONFLICT | pipeline |
| VDC2-14 | minor | CONFLICT | V06 |
| VDC2-15 | minor | CONFLICT | V07 |
| VDC2-16 | minor | WIRING | determinism |
| VDC2-17 | minor | WIRING | V09 |

### VDC2-01 — major — EDGE-UNDEFINED — owner: determinism

**Claim.** §6.1 *The weather stream* (new, item 124) draws spell i's clear gap, kind and length in that order and says "A
spell's kind and length are fixed when it starts, so a change of the year position or of the climate row takes effect
from the next spell". V11 §3.25.11 makes the gap exponential with mean 3 600 ÷ R s, R the live kinds' summed rate, and "a
week with no live kind brings no spell". Two edges have no defined outcome. (a) A gap drawn while R = 0 — a map opened, or
a spell ending, in a week with no live kind (the `arid` row's weeks 0–9 and 50–51) — has an infinite mean, so read as
written the timeline brings no spell for the rest of the session, even after the year position moves into live weeks (a
scrub, or a dossier whose latest tick moves the present week). (b) A gap drawn at one week's rate runs on unchanged after
the year position, the climate row or the sites change: a scrub from the arid wet weeks (R ≈ 0.8 an hour) into a
temperate winter waits about 75 minutes for its first spell. Item 124 (b)–(c) ties the spells to season and region. The
text also calls the timeline a pure function of (session seed, view time, climate row and year position, presses), but
V11 §3.25.11's rates also depend on the sites read from the model at the view's head (coast, riverside, hills, forest)
and, under `light: 'time'`, on the view's hour (`hours`). §6.5 (9)'s weather-timeline test fixes no change of year
position. (V11's repair also asks §6.1 to cite V11 §3.25.11 for the gap's, kind's and length's reading.)

**Required change.** In §6.1 *The weather stream*, replace "its uniforms draw, in order, the clear gap before it, its kind
by the climate row's weather columns for the week band of §2.9's `yearWeek` (V11) and its length inside that column's
range. A spell's kind and length are fixed when it starts, so a change of the year position or of the climate row takes
effect from the next spell." with "its uniforms draw, in order, the clear gap before it as a unit exponential
E = −ln(1 − u) (`dmath.log`), its kind and its length (V11 §3.25.11's reading of the columns). The gap is spent at the
live rate: from the end of spell i − 1, or the map's opening, the clear time runs until the integral over view time of
R(t) ÷ 3 600 reaches E, where R(t) is the summed `perHour` of the kinds live at view time t. The live kinds are read from
the climate row's weather cells for the week band of §2.9's `yearWeek`, with V11's site factors read from the model at the
view's head and, under `light: 'time'`, the kinds' `hours`. So a time with no live kind (R = 0) spends none of the gap and
brings no spell, and a change of the year position, the climate row, the sites or the hour changes the rate from that
moment, the drawn E kept. The kind is drawn when the spell starts, kind k with chance perHour_k ÷ R at that moment, and
the length uniform in that kind's `lengthS`. A spell's kind and length are fixed once it starts; a change acts on a
running spell only through §8.2's hard rules (a `snow` spell on a row where snow cannot fall draws nothing)." Replace "a
pure function of (the session seed, the view's time since the map opened, the climate row and year position in force, the
presses)" with "a pure function of (the session seed, the view's time since the map opened, the climate row, year
position, sites and view hour in force at each moment, the presses)". In §6.5 (9)'s *weather timeline* test add: "a
scripted year-position change from a week with no live kind into a live week, and back, replays identically on the five
engines, a spell starting in the live week (T124-9)".

### VDC2-02 — minor — WIRING — owner: determinism

**Claim.** §8.2's *Weather effects* (rendering, this round) draws each spell's marks — positions, lengths and sways —
on `view.weather` "keyed by the spell index and the frame's world-aligned cell"; rendering's repair hands this to
determinism. §6.1's `view.weather` row ("keyed from the session seed by the spell index") and *The weather stream* state
only the spell's three draws, and §6.1's stream key has no cell component. The registry row is "the one statement of how
its draws are keyed; a reader's section cites it", so §8.2's keying has no home.

**Required change.** §6.1's `view.weather` row: after "keyed from the session seed by the spell index" add "; the spell's
marks (§8.2's *Weather effects*: positions, lengths and sways) on further keys of the same concern — the spell's entity
key folded through the one mixer with the frame's world-aligned cell as structured components — so a mark stays put while
its spell lasts". In *The weather stream*, after the stream-key sentence, add "Its marks draw per world-aligned cell on
the spell's entity key folded with the cell (the registry row)."

### VDC2-03 — minor — WIRING — owner: determinism

**Claim.** §6.5 (9)'s new *weather timeline* test compares spells (kind, start and length) on the five engines, and the
gap is an exponential, which needs a logarithm. §6.5 (2) routes every real function but `sqrt` through `dmath`, and §6.1's
draw helpers send "every power of a draw" through `dmath` by §6.5 (3). But (3)'s lint scope does not name the weather
timeline. That scope covers the model packages, the view code reaching a bit-compared digest, §8.10's instance function
and the CPU reference light pass. The timeline lives in the compositor's layer (§8.8), part of "the rest of `@plat/render`
— paint programs, backends, compositing — [which] stays outside". A `Math.log` there passes the lint and can break T124-9
across engines.

**Required change.** §6.5 (3): after "…stays outside (J-A68.62)" (the CPU reference light pass clause) add "; and the
weather stream's timeline function (§6.1 *The weather stream*: the spell draws, the gap's exponential through `dmath.log`,
the rate integral, the kind's pick and the length) with every function it calls, whose spells (9)'s weather-timeline test
compares across engines (T124-9)".

### VDC2-04 — minor — CONFLICT — owner: determinism

**Claim.** §6.1 says "**Start a shower now** (V09) starts a spell of the season's commonest kind at once as the next spell
index" and gives no outcome for a week with no live kind. The volumes disagree on that edge. V11 §3.25.11, the home of
"the commonest kind", says "a week with no live kind starts none". V09 §4.21.14 (4), its edge row 93 and T-V9-87 say
"where they give none — an arid row's dry weeks — it starts dust haze"; `dust` is not live on the `arid` row in weeks
0–9 and 50–51. The base mechanism states no outcome, and the two volumes state two.

**Required change.** §6.1 *The weather stream*: after "starts a spell of the season's commonest kind at once as the next
spell index, its length drawn there," add "the commonest kind V11 §3.25.11's (the live kind of greatest rate after the
sites' factors); in a week with no live kind a press starts none, and V09 disables the button there with its reason
(§7.8: never a silent no-op),".

### VDC2-05 — minor — CONFLICT — owner: V09

**Claim.** V09 §4.21.14 (4) has Start a shower now start "dust haze" "where they give none — an arid row's dry weeks". Row 93
of V09 §3.16 and T-V9-87 say the same. V11 §3.25.11 says "a week with no live kind starts none", and a kind absent from a
band "stays absent through it (the arid dry months)". §6.1 takes V11's reading (VDC2-04). The volume restates the press
with a value its home does not give, and a press that starts nothing must not be a silent no-op (§7.8).

**Required change.** V09 §4.21.14 (4): "where they give none — an arid row's dry weeks — it starts dust haze" → "where they
give none — an arid row's dry weeks — it starts none: the button is disabled there with its reason row in V09's words
(§7.8: never a silent no-op; V11 §3.25.11)". Row 93's outcome "dust haze" → "the button disabled, its reason shown".
T-V9-87's "dust haze in an arid row's dry weeks" → "the button disabled with its reason in an arid row's dry weeks".

### VDC2-06 — minor — CONFLICT — owner: determinism

**Claim.** §6.3 *Plan damage* says "[lo, hi] its element kind's range by material (V11's rows: …)". V11 §3.25.10's
`damage.elements` keys a range by `DamageElementKind` alone (`DamageElementRow { kind; range; states }`). The walls
material acts only through V06's decay rate (`damage.materials`, `ratePerYear`). R2-38 (2) and the canon's dated ruling
read "t = lo + u·(hi − lo) by element kind (V11's ranges)". V11's repair hands this to determinism.

**Required change.** §6.3 *Plan damage*: "[lo, hi] its element kind's range by material (V11's rows: outer walls and
ground floors late, partitions and upper floors early; item 123 (c))" → "[lo, hi] its element kind's range (V11
§3.25.10's `damage.elements` row: outer walls and ground floors late, partitions and upper floors early; item 123 (c));
the walls material acts only through the decay level's rate (V06's `decayLevel`, V11's `damage.materials`)".

### VDC2-07 — minor — CONFLICT — owner: model

**Claim.** §2.6 step 7 says each element is shown damaged "whose t it has reached (level ≥ t), the one comparison every
reader makes", with t in [0, 1). Three other units word it differently: §6.3 *Plan damage* (the threshold's home), V03
§5.6 (2) (a) and V11 §3.25.10 all say "the level above 0 and at least t". V11 admits lo = 0: `0 ≤ lo < hi ≤ 1`, and a
range moves freely inside its states' shares, with `abandoned` at [0, 1/3]. A draw u = 0 is lawful. So under "level ≥ t" a
never-decayed building (level 0) can show an element damaged. That breaks item 123 (f)'s no-op bar (`item123.damage`),
which the same paragraph states. The set states "the one comparison" in two forms.

**Required change.** §2.6 step 7: "shows damaged every element whose t it has reached (level ≥ t), the one comparison every
reader makes" → "shows damaged every element whose t it has reached (the level above 0 and at least t, §6.3 — so a level
of 0 damages nothing), the one comparison every reader makes".

### VDC2-08 — minor — CONFLICT — owner: rendering

**Claim.** §8.6 *The damaged plan* reads "(V06's `decayLevel`; level ≥ t, the one comparison every reader makes)". As
VDC2-07: §6.3, V03 §5.6 (2) (a) and V11 §3.25.10 state "the level above 0 and at least t", and "level ≥ t" damages an
element of a never-decayed building when its threshold is 0, against `item123.damage`.

**Required change.** §8.6: "(V06's `decayLevel`; level ≥ t, the one comparison every reader makes)" → "(V06's
`decayLevel`; the level above 0 and at least t, the one comparison every reader makes, §6.3)".

### VDC2-09 — minor — CONFLICT — owner: determinism

**Claim.** DR44's rule cell says every SettlementForge stressor type and condition archetype "has exactly one, a look kind
or `none`, the regional_* pressures `none`". Item 122 (b) names `regional_migration_pressure` under mass immigration:
"**mass immigration** (regional_migration_pressure, REFUGEE_WAVE)". V11 §3.25.9's `map` rows give
`regional_migration_pressure` → `refugeeCamp`, and only "the other `regional_*` pressures" its "no look". DR44 denies the
refugee camp its main source. V11's repair hands this to determinism.

**Required change.** DR44: "the regional_* pressures `none`" → "`regional_migration_pressure` the refugee camp (item 122
(b)'s mass immigration), the other regional_* pressures `none`".

### VDC2-10 — minor — CONFLICT — owner: pipeline

**Claim.** §10.2 *Crisis looks* (b) ends "the regional_* pressures are `none`". As VDC2-09, this contradicts item 122 (b)
and V11 §3.25.9's `regional_migration_pressure` → `refugeeCamp` row. V11's repair hands it to pipeline.

**Required change.** §10.2 *Crisis looks* (b): "the regional_* pressures are `none`" → "`regional_migration_pressure`
reads its `refugeeCamp` row (item 122 (b)'s mass immigration) and the other regional_* pressures are `none`".

### VDC2-11 — minor — CONFLICT — owner: determinism

**Claim.** §7.7 item 1, rewritten for item 125, says "the bearings, latitude and cell words they would give are the
dossier's where it carries them, else the generator's defaults or the user's settings (DR1, DR3, DR19, DR29, DR42)". No
rule gives a bearing a dossier source:
- layer 2's *Bearing* takes a partner's bearing from the user's setting, else `gate.pick`, and says "no host input gives
  one";
- DR3 reads no bearing field;
- `hinterland.outside` calls a deposit's bearing one "which no input gives";
- item 125 (b) and V08 §3.16 (9) make "the neighbours' bearings … our generator's defaults or the user's settings".

The sentence implies a dossier-carried bearing that no row reads, and rendering's §11.1 reads it that way (VDC2-12).

**Required change.** §7.7 item 1: "the bearings, latitude and cell words they would give are the dossier's where it
carries them, else the generator's defaults or the user's settings (DR1, DR3, DR19, DR29, DR42)" → "the latitude and the
site's words they would give are the dossier's where it carries them — its culture (DR29), its terrain type, access and
deposits (DR1, DR19, DR42) — else the generator's defaults; the partners' and the deposits' bearings are the generator's
draws or the user's settings, never an input (layer 2's *Bearing*, DR3, DR19; item 125 (b))".

### VDC2-12 — minor — CONFLICT — owner: rendering

**Claim.** §11.1 (rendering, this round) says "For a dossier-bound map whose dossier carries its partners' true bearings
(§7.7 layer 2's *Bearing*; item 125 (b)), the port sets the anchor's `bearingDeg` to the turn of model north that fits the
derived gates to those bearings, as the key's documented default". Every other statement says no such input exists:
- §7.7 layer 2: "No input sends a true bearing after creation (item 125 (a)): … the geo anchor's `bearingDeg` (§11.1) stays
  a user setting".
- Item 125 (b) and V08 §3.16 (9) make the neighbours' bearings the generator's or the user's.
- The dossier carries no partner bearing (V08 §2.4's field table).
- J-A125.01 retires "the realm fit's north-first turn".

The clause names a producer that does not exist and contradicts §7.7. The hand-offs of determinism's and V08's repairs
name it.

**Required change.** §11.1: replace "For a dossier-bound map whose dossier carries its partners' true bearings (§7.7 layer
2's *Bearing*; item 125 (b)), the port sets the anchor's `bearingDeg` to the turn of model north that fits the derived
gates to those bearings, as the key's documented default; with none the default stands; no geometry moves for it." with
"No input sets it — a dossier carries no true bearing and a host sends none (item 125 (a), (b); §7.7 layer 2's
*Bearing*) — so the anchor stays (0°, 0°, 0°) until the user sets it; no geometry moves for it."

### VDC2-13 — minor — CONFLICT — owner: pipeline

**Claim.** §4.7's *Custom chains* bullet (l.6901) feeds an import's first consumer "through a store (a warehouse, a yard)
at the gate or quay facing its partner's bearing (the realm block's, items 77, 85), else the main gate or the harbour".
Item 125 (a) retires the realm block as an input (§7.7 item 1; J-A125.01), and a partner's bearing is now §7.7 layer 2's
(the user's setting, else `gate.pick`). The parenthesis names a source that no longer exists, so read literally the
store always falls back to the main gate.

**Required change.** §4.7 *Custom chains*: "facing its partner's bearing (the realm block's, items 77, 85)" → "facing its
partner's bearing (§7.7 layer 2's *Bearing*; items 77, 85)".

### VDC2-14 — minor — CONFLICT — owner: V06

**Claim.** V06 §1b's dossier-input table (l.399) still has the row "| the realm latitude | the realm block's latitude |
DR29 | item 102's sampler, …". DR29 now reads `site.culture` through `tables/dossier/cultures`, else 50° N, the generator's
default (item 125 (b)). The realm block is no input (item 125 (a); V08 J-V8.130). The row names a retired input as DR29's
source.

**Required change.** V06 l.399: "| the realm latitude | the realm block's latitude | DR29 |" → "| the site latitude |
`site.culture` through `tables/dossier/cultures`, else 50° N — `Intent.latitudeDeg`, a map fact the user may edit (item
125 (b)) | DR29 |", the reader cell unchanged.

### VDC2-15 — minor — CONFLICT — owner: V07

**Claim.** V07 §3.2 (l.1232) says "The option `river: 'descent'` (the base's descent trace) is taken when a dossier's realm
block gives a river course (V07 §3.11)". DR1 no longer reads the realm cell's river, item 125 (a) retires the realm block,
and V07 §3.11 states no such trigger. The option's only trigger has no producer.

**Required change.** V07 §3.2: "is taken when a dossier's realm block gives a river course (V07 §3.11)" → "is taken only
when the blueprint or the user sets it; no input gives a river course (item 125 (a); §7.7's DR1)".

### VDC2-16 — minor — WIRING — owner: determinism

**Claim.** Pipeline's round-2 II.7.6 step 3 adds a refusal for `addUndergroundAccess`. A connector route "the search does not
find (`E_NO_PATH`, §3.1: the basement ring enclosed … or the water table above every floor …)" makes "the dry run
[refuse] with its reason, naming the blocking building or the water table (F-EDIT, §5.2)". Pipeline's repair hands this to
determinism. E-07 calls itself "the one home of every refusal, conflict and bend cause of a dry run". Its
`addUndergroundAccess` row lists only the terrain gate and the route's bound. Its key cell, "V09 §4.17's rows", names no
catalogue key: V09 §4.17 and §4.9 hold no row for these outcomes. So T-V9-15's walker ("every key §7.1's dry-run outcome
table names has its row") cannot reach them.

**Required change.** §7.1's outcome table, the `addUndergroundAccess` row:
- cause cell → "an `addUndergroundAccess` whose terrain rules out every basement form (§2.6's requested-mode ladder), or
  whose connector passes its route's bound or finds no route (II.7.6 step 3: `E_NO_PATH`, the basement ring enclosed by
  other footprints, basement rings or dug passages, or the water table above every floor between it and the target)";
- action cell → "the nearest lawful basement form (half cellar, walk-out, a hatch to a crawl space); else the refusal
  naming the terrain, the route's bound, or the blocking building or the water table; the basement not laid";
- key cell → "`bend.under.basement`, `refuse.under.basement`, `refuse.under.route`" (V09 §4.9's rows, VDC2-17).

### VDC2-17 — minor — WIRING — owner: V09

**Claim.** The receiving end of VDC2-16. V09's catalogue has no row for the `addUndergroundAccess` outcomes of §7.1's row
(the basement form bent, the terrain refusal, the route's bound or no route). §7.1 points at "V09 §4.17's rows", which do
not exist. T-V9-15 requires a row for every key the outcome table names, and every `refuse.*` row ending with
`button.showWhy`.

**Required change.** V09 §4.9: add `bend.under.basement` (the nearest lawful basement form, named, e.g. "No full cellar
fits here, so {building} gets {form}."), `refuse.under.basement` (no basement form the terrain admits, naming the gate) and
`refuse.under.route` (the route's bound, or no route, naming the blocking building or the water table), each in V09's own
words. The `refuse.*` rows end with `button.showWhy`. Cite them from V09 §4.17's `addUndergroundAccess` flow.

## 5. Result

Saved as `docs/validation/coherence/results/coherence_verify-determinism-r2t.json` (key
`coherence/verify-determinism-r2t`, this file, the 17 issues above). Every round-1 id is closed (25 FIXED, VDC0-27 by
ONE FIX with VKr1-01, VDC0-33 INVALID by R2-01); the new findings carry the r2 marker (VDC2-nn).

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed and read):**
- the live and pre-round sha256 values, and the blocks landing in §5–§7 (`blocks.json`);
- the 10 changed and 7 unchanged subsections (compared subsection by subsection), and each of the 41 diff hunks read with
  its targets;
- the 27 round-1 verdicts at their sites;
- the canon's routings for items 120–126 and Part H's dispositions;
- every hand-off line of the 17 other repair preambles that touches §5–§7;
- the retired-term, deferral, narration and phone scans, and the bar ids;
- `doc_checks.py --sections 5,6,7` (exit 0, provisional);
- each cited line of §4 re-read in the live files.

**PLAUSIBLE:**
- VDC2-01's severity: a cosmetic layer, but the literal outcome is a timeline that never brings a spell after a season
  change, an undefined edge of a mechanism.
- The exact forms proposed in the required changes are the verifier's proposals; the repair seats word them. These are
  VDC2-01's rate integral (one exact way to define the edge; a re-draw of the pending gap at each change would serve if
  stated with its replay rule), and VDC2-16's and VDC2-17's three key names.
