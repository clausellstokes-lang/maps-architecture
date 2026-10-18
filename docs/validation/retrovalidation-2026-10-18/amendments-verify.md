# Retrovalidation 2026-10-18 — family "amendments" (files m–q, items 659–925; file r placement only): the verifier's record

Lane `retrovalidation/amendments-verify` (Opus 5.5, the verifier; J390, Fable-checked). Written as it goes.

Scope: `docs/AMENDMENTS-2026-10-17m.md`, `-n.md`, `-o.md`, `-p.md`, `-q.md` read whole; their coherence records
`docs/validation/coherence/realm-m.md`, `lens-n.md`, `lens-o.md`, `lens-p.md`, `lens-q.md` and critics
`realm-m-critic.md`, `lens-n-critic.md`, `lens-o-critic.md`, `lens-p-critic.md`, `lens-q-critic.md` read whole; the
applied targets as they stand on 2026-10-18 (after file r): `docs/volumes/V13-world.md`, `docs/volumes/V14-sites.md`,
`docs/design/proposal-world-native.md`, `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md`,
`docs/ARCHITECTURE.md`, `docs/volumes/INDEX.md`, `docs/volumes/SUMMARY.md`. File r (item 926) checked for placement only
(the owner's word). Host: `clausellstokes-lang/settlement-engine` at `81f1cd96`, read only.

## Method (in progress)

1. **Parse.** Every item of files m–q parsed from its file by its markers (`**n.** **title**`, a wrapped title read
   whole; `*Current text:*` / `*Current text* (x):` and `*New text…*`; a current text's `⏎` a line break; a new text's
   blockquote with `> ` removed and a bare `>` an empty line), the target from the `###` heading (Volume 13 → V13,
   Volume 14 → V14, The proposal, The brief, BASE → `docs/ARCHITECTURE.md`, The index → INDEX, The summary → SUMMARY);
   file r's twenty sub-items (a)–(t) by their *Target:* line. Parsed: m 117 items / 170 fragments; n 58 / 131; o 40 / 80;
   p 19 / 32; q 29 / 43 (items 663–925 without a gap; 659–662 are the owner's rules and carry no fragment); r 1 / 20.
   Each count equals the one its application record states (realm-m.md :18–20, lens-n.md :22–24, lens-o.md :23–27,
   lens-p.md :23–26, lens-q.md :24–28, file r's status line).
2. **Reverse replay (check (b)).** Starting from the seven targets and `README.md` as they stand on 2026-10-18, every
   fragment of r, q, p, o, n, m undone in reverse order (its new text, which must occur exactly once at its turn,
   replaced by its current text), the md5 and line count of each target taken at each file boundary.
3. **Forward replay (check (a)).** From the reconstructed pre-m state, every fragment applied in order (its current text
   must occur exactly once at its turn, its new text exactly once after), the span of each applied new text tracked
   through every later edit, so a new text absent today is traced to the later fragment(s) that rewrote part of it.
4. **Evidence (check (c))** and **critic gaps (check (d))**: below, by reading.

## (a) and (b): placement and the md5 chain — HOLD

- **Reverse replay:** all 476 fragments (m–q 456, r 20) undone, each new text found exactly once at its turn; no miss.
- **The md5 chain, every value reproduced** (reconstructed state → the record's value):

  | state | V13 | V14 | proposal | brief | base | INDEX | SUMMARY | README |
  |---|---|---|---|---|---|---|---|---|
  | before m (realm-m.md :28–32) | `16e23add` 2 988 | `3323294d` 3 183 | `d100ecbb` 270 | `e6aad12b` 182 | `3552f3ca` 24 439 | `72f97005` 251 | `f70c63d4` 197 | `bc1f950f` |
  | after m = before n (lens-n.md :42–46) | `aec3207d` 3 679 | `9d59d45d` 3 198 | `7374c286` 275 | `a01b8471` 189 | `c6b03643` 24 456 | = | = | = |
  | after n = before o (lens-o.md :52–55) | `c6956b05` 4 216 | `56bef233` 3 208 | `efc7ce31` 277 | `9d60fdd0` 194 | `81efb0c6` 24 457 | = | = | = |
  | after o = before p (lens-p.md :54–59) | `3320f3ca` 4 348 | `a1c6d7c2` 3 208 | `efc7ce31` | `234f3895` 199 | `96598bab` 24 457 | `72f97005` | `f70c63d4` | = |
  | after p = before q (lens-q.md :58–63) | `32b526d5` 4 377 | = | `f509e32a` 281 | `645dc230` 203 | `d0f1b84b` 24 459 | `157f091c` 251 | `163f7a0b` 199 | = |
  | after q = before r (file r :17–21) | `9e4e8b9b` 4 438 | = | `b2e18a92` 281 | `b1e0e364` 208 | `a440f7a4` 24 461 | `8972b3d9` 257 | `c6264602` 211 | `bc1f950f` |
  | after r = now (file r :17–21) | `c8759307` 4 452 | `a1c6d7c2` | `b2e18a92` | `fc252070` 212 | `b03ba26e` 24 462 | `39b0c519` 259 | `9d142283` 214 | `2a4b54c8` |

  Every before/after md5 and line count in the five records and in file r equals the reconstructed one; each record's
  "before" is the previous record's "after"; no target changed between applications or since file r (the targets'
  md5s today are file r's after-values). Files m–q never touched INDEX or SUMMARY before p, nor V14 after o, nor the
  proposal in o — as the records' target lists say.
- **Forward replay:** from the reconstructed pre-m state, all 476 fragments re-applied in order: every current text
  found exactly once at its turn, every new text exactly once after, and the result **byte-identical** to the seven
  targets and README today. So every claim "current text found exactly once at its turn; new text found once after"
  in realm-m.md §1, lens-n.md §1, lens-o.md §1, lens-p.md §1 and lens-q.md §1 holds.
- **Present now:** 367 of the 456 m–q fragments' new texts occur exactly once in their target today; file r's 20 occur
  once. The other 89 are absent because a later fragment rewrote part of them — each traced (none untraced; no new text
  occurs twice; no fragment present today was later touched):
- `m:665` → q:898
- `m:667` → n:783(a), n:783(b)
- `m:668` → n:784(a)
- `m:671` → n:785(a), n:785(e), o:840(a), o:840(b)
- `m:672(a)` → n:785(b)
- `m:672(b)` → n:785(c)
- `m:673(a)` → n:785(d)
- `m:675` → n:786(a)
- `m:678` → q:899
- `m:692` → n:792(a), o:842(f)
- `m:693` → n:789, n:790(a), n:790(b), n:790(c), n:790(d), n:790(e), n:790(f), n:791, q:900(a), q:900(b)
- `m:695` → n:793(a), n:793(b), n:793(c), n:793(d)
- `m:699` → n:793(e), n:793(f), n:793(g), n:793(h)
- `m:705` → n:795(a), q:901
- `m:713(a)` → n:797
- `m:714(a)` → n:798(a), n:798(b), n:799, n:800(a), n:800(b), n:801, n:802, n:803(a), n:803(b), n:803(c), n:804, o:843, o:844(a), o:844(b), o:844(c)
- `m:721` → n:806(a), n:806(b), n:806(c), n:806(d), n:807(a), n:807(b), n:807(c), q:902(a), q:902(b), q:902(c), q:902(d)
- `m:732` → q:903
- `m:734` → o:844(d)
- `m:737(a)` → n:808(a), n:808(b), n:808(c), n:808(d), n:808(e)
- `m:737(b)` → n:808(f), n:808(g), o:845(a), o:845(b)
- `m:740(a)` → n:809(a)
- `m:740(b)` → n:809(b)
- `m:741(b)` → n:812
- `m:743` → n:813(c), n:813(d), n:813(e), n:813(f), n:813(g), n:814, o:858, o:859, o:860, o:861(a), o:861(b), p:882, p:883
- `m:744(a)` → n:815(a), o:862, q:905(a), q:905(b)
- `m:746(b)` → n:816(e)
- `m:749` → n:817(a), n:817(b), n:817(c), n:817(d), n:817(e), n:817(f), n:817(g), n:818(a), n:818(b), n:818(c), n:818(d), n:818(e), o:864(a), o:864(b), o:865(a), o:865(b), o:865(c), o:865(d), o:866, p:884(a), p:884(b), p:884(c), p:884(d), q:906, q:907, q:908, q:909(a), q:909(b), r:926
- `m:751` → n:819(a), o:867, q:910
- `m:753` → n:821, n:822
- `m:754` → n:824(a), n:824(b), n:824(c)
- `m:755` → o:870(a), p:886(a), q:913(a), r:926
- `m:769` → q:914
- `m:770(b)` → p:887
- `m:771` → n:832(a), n:832(b)
- `m:774(a)` → q:915(a)
- `m:774(b)` → p:888(b), r:926
- `m:776` → n:834(a), n:834(b), o:873, p:889, r:926
- `m:778` → n:837(a), n:837(b), o:876, q:916
- `m:779(a)` → n:837(c)
- `m:779(b)` → q:917, r:926
- `m:779(f)` → n:835
- `n:781` → r:926
- `n:783(c)` → o:839(a)
- `n:785(a)` → o:840(a), o:840(b)
- `n:786(b)` → o:841
- `n:792(a)` → o:842(f)
- `n:792(b)` → o:842(a), o:842(b), o:842(c), o:842(d), o:842(e), o:842(g), p:879(a), p:879(b)
- `n:794(a)` → p:880
- `n:808(f)` → o:845(a)
- `n:810` → o:846(a), o:846(b), o:846(c), p:881(a), p:881(b)
- `n:811` → o:847, o:848, o:849(a), o:849(b), o:850, o:851(a), o:851(b), o:851(c), o:851(d), o:851(e), o:852(a), o:852(b), o:853(a), o:853(b), o:853(c), o:853(d), o:853(e), o:853(f), o:854, o:855(a), o:855(b), p:881(c), p:881(d)
- `n:813(a)` → o:856
- `n:813(f)` → o:858, p:882
- `n:814` → o:859, o:860, o:861(a), o:861(b), p:883
- `n:815(a)` → o:862
- `n:816(c)` → o:863
- `n:817(a)` → p:884(a), p:884(b), p:884(d), q:906, r:926
- `n:818(e)` → o:864(a), o:864(b), o:865(a), o:865(b), o:865(c), o:865(d), o:866, p:884(c), q:909(a), q:909(b), r:926
- `n:824(d)` → r:926
- `n:833` → o:872, p:888(a), q:915(b), r:926
- `n:834(b)` → o:873, p:889, r:926
- `n:837(b)` → o:876
- `o:852(a)` → p:881(c)
- `o:859` → p:883
- `o:864(b)` → p:884(c), q:909(a), r:926
- `o:868(a)` → p:885, q:911(a)
- `o:870(a)` → r:926
- `o:870(b)` → p:886(b), q:913(b), r:926
- `o:872` → p:888(a), q:915(b)
- `o:873` → p:889, r:926
- `p:884(b)` → q:906, r:926
- `p:884(c)` → q:909(a)
- `p:885` → q:911(a)
- `p:886(a)` → q:913(a)
- `p:886(b)` → q:913(b), r:926
- `p:888(a)` → q:915(b)
- `p:888(b)` → r:926
- `p:889` → r:926
- `q:906` → r:926
- `q:909(b)` → r:926
- `q:912` → r:926
- `q:913(b)` → r:926
- `q:918` → r:926
- `q:920(a)` → r:926
- `q:920(d)` → r:926
- `q:922` → r:926
- `q:924(b)` → r:926
- `q:925(a)` → r:926

- **The amendment files themselves.** Restoring each file's line 7 to `**PENDING APPLICATION**` reproduces the md5 every
  record gives for the source as applied: m `28d01677…` (realm-m.md :12), n `2ae0751b…` (lens-n.md :13), o
  `d1969bac…` (lens-o.md :14), p `ce8e356d…` (lens-p.md :14), q `46fa12e9…` (lens-q.md :15); today's files equal the
  records' after-md5s for n `6f6097d5…`, o `28cd49db…`, p `87d9705c…`, q `510edf79…` (realm-m.md gives none for m). So
  no amendment file changed after its application but by its status line; line counts 2 441, 2 007, 1 231, 677, 920
  as recorded.
- **Landing lines.** The 286 "×1 at L…" claims of lens-n.md, lens-o.md, lens-p.md and lens-q.md §1 were recomputed in
  the reconstructed after-state of each file: all 286 hold (realm-m.md records none). lens-n.md's §5.8 / §5.9 /
  §6 heading lines (:47-48) hold in the after-n state.
- **The bundle.** `python3 tools/bundle_architecture.py --check` today: "UP TO DATE", exit 0 (read-only; the records'
  own bundle runs are not re-checkable after the fact).
- **File r** (the owner's word, placement only): its twenty fragments (a)–(t) each occur exactly once in their targets
  (V13 8, INDEX 4, SUMMARY 3, the brief 3, the base 1, README 1); its recorded before/after md5s are the reconstructed
  ones (table above); q4-r.md's 20/20 holds. Not re-judged.

## (c) Host citations at 81f1cd96 — 10 findings

All five files read whole (m 2 441, n 2 007, o 1 231, p 677, q 920 lines; r 262). Every host path an *Evidence* line
cites — 225 path citations, 258 line ranges, in the 263 *Evidence* lines of items 663–925 — and the host lines the four
review records and file q's preamble add (e.g. `pulseKernel.js:2634-2643`, `campaignPulseHelpers.js:106-170`,
`relationshipRulesAdversarial.js:264`, `LivingWorldGates.jsx:146-149`, `:200`) were opened at the host
(`.git/HEAD` → master → `81f1cd963553…`, read with `sed`, never written) and read against what the item says. Every
path exists (`map-corpus/docs/GENERATION-SPEC.md` is cited only as a document the critic found unread, not as a
host fact). File m's head readings of the owner's rules (items 659–662: the culture distance's five terms, the
governance identity, the multiplicative trade and tradition pulls, `cultureDistance.js:1-60`, `:157-200`) hold. Map-side
line citations were read against the reconstructed pre-file state for file m (V13, the base, V14, the proposal, the
brief) and spot-read for n–q; none was found wrong. What does not hold (the owner's words quoted in any row are not
judged; only the files' readings and evidence):

| id | where | claim | verdict | evidence (host at 81f1cd96) | fix |
|---|---|---|---|---|---|
| AV-1 | V13 :953 (`RouteCostLaw`, file m item 695 as n:793 left it) | `classFactor` "the host's per-terrain-class factor … when present it replaces biomeFactor"; `elevationKneeFactor` "the host's elevation knee: a step above it costs × the factor" | IMPRECISE | the host's law prices per reference-generator biome (`spatialCost.js:35-49`, 13 rows), its eight terrain classes keying only receipts and the seasonal factor (`:62-67`, `:96-101`; `terrainClassOf` `:241-254` puts biomes costing 1.6, 1.9, 2.6, 2.2, 2.2 in one `forest` class); its knee is a ramp, `elevMult = 1 + (h − 60) / 15` (`:385`), not one factor. Neither field can carry the host's present law; they are the shape of its law 2 (H6; J-V13.73 rejects porting the first law). realm.md :101 (J-RR.12) reads "the v1 law's inputs (knee, river add) are expressible" — for the Fable validator to weigh. | in V13 replace `classFactor?: Record<string, number> /* the host's per-terrain-class factor through the adapter folder's class table; when present it replaces biomeFactor */; elevationKneeM?: number; elevationKneeFactor?: number /* the host's elevation knee: a step above it costs × the factor */;` with `classFactor?: Record<string, number> /* a host law's per-terrain-class factor through the adapter folder's class table — the shape of the host's law 2 in this schema (H6); its first law prices by biome, its terrain classes keying only its receipts and seasonal factors — when present it replaces biomeFactor */; elevationKneeM?: number; elevationKneeFactor?: number /* a host law's elevation knee: a step above it costs × the factor — law 2's shape (H6); the host's first law's knee is a ramp one factor does not carry, and that law is not ported (J-V13.73) */;` |
| AV-2 | file m item 727 *Evidence* (:1474) | "the host's frozen gates carry pack cell indices and the digest stores no coordinates, host `spatialDigest.js:771-775`" | WRONG (citation) | `:771-775` is step 4b, the neighbour tiers; the gates `{ between, cellA, cellB, cost }` are built at `:813-817` from the crossings chosen at `:700-727`. `TerritoryLayer.jsx:12-17` holds. | replace "host `spatialDigest.js:771-775`" with "host `spatialDigest.js:700-727,813-817`" |
| AV-3 | file m item 713 *Evidence* (:963) | the ledger's facets and five events, "patrolled is not a change" — `routeNetworkLedger.js:64-181` | IMPRECISE (citation) | `:64-181` holds the grades, charter flavours, flow accrual and bypass; the five event words and "a road being walked, patrolled or garrisoned is not a CHANGE" are `src/domain/certification/subsystemRowsWaves.js:356-366`, which the research note's RR-15 cited and file m dropped | replace "\"patrolled is not a change\", hidden never absence, `routeNetworkLedger.js:64-181`" with "\"patrolled is not a change\", hidden never absence, `routeNetworkLedger.js:64-181`, `src/domain/certification/subsystemRowsWaves.js:356-366`" |
| AV-4 | file q item 909 *Evidence* (:497-498) and review issue 3 (:899) | a cost-law change "a DISCRETE re-canonize event", behind the entitlement — `PHASE55…:1372-1375`, `:1534-1535` | IMPRECISE | `:1372-1375` holds (a discrete re-canonize); `:1534-1535` is §VI.4 owner decision 3, still open: "re-derive on next open behind the entitlement, or freeze old canons on their old law forever". The entitlement holds only because every canonize is premium-gated (`src/store/campaignWorldPulseSlice.js:389-391`). | (:497-498) replace "host `docs/PHASE55_SPATIAL_ENGINE_DESIGN.md:1372-1375`, `:1534-1535`⏎(a cost-law change \"a DISCRETE re-canonize event\", behind the entitlement)" with "host `docs/PHASE55_SPATIAL_ENGINE_DESIGN.md:1372-1375`⏎(a cost-law change \"a DISCRETE re-canonize event\"; behind the entitlement as every canonize is, `src/store/campaignWorldPulseSlice.js:389-391`; the installed base's re-derivation an open owner decision, `:1534-1535`)"; (:899) replace "a cost-law change is a discrete, entitled re-canonize (`PHASE55…:1372-1375`, `:1534-1535`)" with "a cost-law change is a discrete re-canonize (`PHASE55…:1372-1375`), entitled as every canonize is (`campaignWorldPulseSlice.js:389-391`; the installed base's policy an open owner decision, `PHASE55…:1534-1535`)" |
| AV-5 | file m item 698 *Evidence* (:719) | "army time is ceil(1.5 × weeks ÷ readiness)" | IMPRECISE | `armyTransit.js:298-300`: the divisor is `speedMult = 1 + 0.4·(readiness − 0.5)·2`, the weeks clamped to [1, 52] (realm-verify RV-2, accepted in realm.md) | replace with "army time is ceil(1.5 × weeks ÷ (1 + 0.4·(2·readiness − 1))), clamped to [1, 52]" |
| AV-6 | file m item 701 *Evidence* (:774) | "the host's edge id is the pair and the mode, host `DESIGN_ROUTE_LIFECYCLE.md:71-80`" | IMPRECISE (citation) | `:71-80` is the `RouteEdge` shape; the id rule `route.<a>.<b>.<mode>` is `:86`, built at `routeNetworkLedger.js:239-241` (RV-3) | replace "host `DESIGN_ROUTE_LIFECYCLE.md:71-80`" in that clause with "host `DESIGN_ROUTE_LIFECYCLE.md:71-86`, `routeNetworkLedger.js:239-241`" (item 688's use of `:71-80` for the settlement-id keying holds) |
| AV-7 | file m item 706 *Evidence* (:834) | "at least thirteen self-describing host axes … host `spatialDigest.js:116-179`" | IMPRECISE | `:117-179` declares six; twelve canon axes exist across `src/domain/spatial/` (`spatialCost.js:82`, `seaLanes.js:85`, `waterBodies.js:60`, `spatialSubstrate.js:65`, `teleportEdges.js:64`, `captureSidecar.js:41` beside the six); the thirteenth `*_VERSION`, `armyTransit.js:120`, is a decision-record schema (RV-1) | replace "at least thirteen self-describing host axes, each bumped only by a discrete re-canonize, host `spatialDigest.js:116-179`" with "at least twelve self-describing canon axes, each bumped only by a discrete re-canonize — six in host `spatialDigest.js:117-179`, with `spatialCost.js:82`, `seaLanes.js:85`, `waterBodies.js:60`, `spatialSubstrate.js:65`, `teleportEdges.js:64`, `captureSidecar.js:41`" |
| AV-8 | file m item 666 *Evidence* (:216) | the frozen record "read through one gate by 31 modules" | IMPRECISE | 32 `src` modules import `activeSpatialDigest` at 81f1cd96 (a multi-line-import-aware scan; list in the scratchpad) | replace "read through one gate by 31 modules" with "read through one gate by 32 modules" |
| AV-9 | file q :360 (item 902), :498 (909), :637 (915), :897 (review issue 1) | `src/domain/spatial/canonMembership.js:116-127` | IMPRECISE (citation) | the file has 125 lines; the "Re-map to bring it into the canon" note is `:116-124` | in file q replace each of the four `116-127` with `116-124` |
| AV-10 | file m item 699 *Evidence* (:745) | "the reinforcement band was measured on a 2–8 army-week spectrum" | IMPRECISE | `sovereigntyReach.js:60-79` gives the measured 2w–8w spectrum as `hopWeeks` values of every ordered pair; the band (5) is a march-week ceiling run through `armyMarchWeeks` (`:23-28`, `:189-190`) — the item's own next clause ("5 army weeks admit hop weeks ≤ 3") reads it right | replace with "the reinforcement band (5 march weeks) was chosen inside a measured spectrum of 2–8 hop weeks" |

Every other host citation holds as the item says, among them: the culture distance's composite and its multiplicative
pulls; the two relationship planes and their aliases; occupation rungs and the treaty-held ceded garrison; hegemony a
pattern; the cheapest-crossing gates and their class receipts; the port rule GEOGRAPHY ∧ INSTITUTIONS and `port:
navigable && waterAccess`; the scale datum no caller supplies (no `src` caller passes `options.kmScale`); the decree law
and the resume that supersedes the minors-only commit; the reinforcement band 5 and its measurement note; the genesis
with no caller; the field battle's place persisted as a settlement id; the lineage claim dark (its flag false in the one
preset naming it); the settlement-strength comparator and its 0.04 raid tie; the plague record with no carrier; the nine
pressure kinds with no band; the demographics lane declared false; the shippable rule, the loose goods reading and the
custom good; food coverage over the raw deficit and the 0.4 blockade gate; the entrepôt record; the escort frozen at
dispatch; the rites dated by year; the pilgrim pool computed and dropped; the conservative ×0.65 and the conservative
preset with its population lane dark; generation seating no deity; the canonize premium-gated, refused mid-advance,
rebuilding the whole record and carrying only its scale; campaigns created and listed only for premium or staff; a
graduation minted inside an advance.

## (d) The critic gaps the next file claims to close — 38 of 38 closed

Each gap read in its critic and its closing fragments found in the targets today (or the later fragment that carries the
closing content, traced):

| critic | gaps | closed by (present today) |
|---|---|---|
| `realm-m-critic.md` (15, closed by file n's table :47-63) | 1 H14's terrain word and the proposal's mapping; 2 the sites slot's class and step cost, H5's satellite-ground reader; 3 one host-change list (H12's three clauses, H16's limits and flood exposure, `claims` with a reader, the review's §5 bracket); 4 log-linear `kSize`/`kProsperity`, (7)'s ln-reach sentence, T-V13-41 (r), J-V13.83; 5 the gate ruling (§11, H16, brief :103, J-V13.96); 6 BCR-V13-32's fifteen rows; 7 `bypass` (§2.2, §3.8 (9), J-V13.99); 8 `forceShift`, J-V13.86, J-V13.97; 9 the dossier re-blend in §3.11.5; 10 §8.5's preamble clauses and the planting line; 11 the citation rule, T-V13-44 at M-W1 and -45 at M-W3, V14 request (5), base §11.3's indent and windows; 12 `claims: { by; target }`, `outranked` in law (9) and J-V13.78; 13 H21's unread documents; 14 the dated bracket under `fp-physical-integration.md` §8 (:459-465); 15 V13 §12's bounded deferral | all 15 present; H5's row now ends with file r's answer (r ← n:817(b)'s content kept) |
| `lens-n-critic.md` (14, closed by file o's table :35-50) | 1 `LensGood`, `economy`, the production-and-need and food-coverage rows, H23, T-V13-56, J-V13.102; 2 `realmRank`, `suppressed`, `standing`, `WorldEvent.cause`, the rank, suppressed and fall rows, J-V13.103; 3 D-V13.8 and §5.9's intro; 4 six *Not drawn in this pass* lines, the catchment row, J-V13.105; 5 §3.9 (6) and J-V13.64 plain form; 6 H22, J-V13.100, §11's ruling; 7 the verdict's hold band in §3.9 (10)/(11)/(13), §4.3, the civil regime, T-V13-41 (s), J-V13.101; 8 base §2.9 keys, §7.7 tail, §1.1 and §16 at 37–45 and 481.35–660.6; 9 V14 SE3 and the base's M-SITE-A row; 10 BCR-V13-39 and §5.8 (1); 11 §5.1's omniscient-regime words; 12 T-V13-47 (a)–(c), T-V13-50 (d), T-V13-7 (e), J-V13.104; 13 the research bracket's flood-exposure phrase (`fp-realm-review.md` :628-631); 14 the satellite warning once per window | all 14 present; gap 6's Q4 sentence (o:870(a)) later answered by file r (the owner's word) |
| `lens-o-critic.md` (6, closed by file p's table :42-49) | 1 the entitlement hedge struck (H22, J-V13.100, §11's ruling, the brief), the brief's Q4 line; 2 base `Document.lensPlates`; 3 T-V13-41 (s)'s player-picture clause; 4 `GateExpr.born`/`.intensity`, gated `legend.notes`, `world.lens` notes, §5.8 (3); 5 INDEX :39, :109, :133, :147, :248 and SUMMARY :113, :117, :184; 6 the proposal's §3.8 | all 6 present; J-V13.100 later extended by q:911(a) (the closing words kept), the brief's Q4 line removed by file r (Q4 answered) |
| `lens-p-critic.md` (3, closed by file q's table :44-48) | 1 the canonize wording in base §7.7 and §11.4, V13's W-PORT row, H8, the proposal :20, the brief :100, BCR-V13-40; 2 the additive re-canonize in H22, J-V13.100, §11's ruling, the brief's Part C, J-V13.106, T-V13-37 (c); 3 INDEX §6's paragraph and Q1/Q2/Q4 rows, its state line, census and §7; SUMMARY's thirty-three, eight decisions, restated Q1/Q2 | all 3 present; the §11.4 sentence, INDEX §6's paragraph and Q4 row and SUMMARY's Q4 lines later rewritten by file r with the owner's answer |
| `lens-q-critic.md` | no material gap; five bookkeeping notes (answered by J389) | nothing claimed closed by a next file; not checked further |

## Counts

Checked 1 183: 476 fragment placements (456 of m–q, 20 of r; 89 traced through later fragments), 64 recorded md5s and
52 recorded line counts of the targets, 9 recorded md5s of the amendment files, 286 recorded landing lines, 258 host
line ranges (225 path citations), 38 claimed critic-gap closures. Findings: 10 — 1 WRONG (a citation), 0 UNSUPPORTED, 9
IMPRECISE (one a V13 design comment, AV-1; the rest *Evidence* citations in files m and q). The md5 chain, the
application records' placement and landing claims, the critics' closures and file r's placement all hold.

Not checkable here: the records' bundle runs and `git` observations at the time of application (no git command is run
in this lane); the reviser seats' clean-room lints (re-running them needs the seats' identifier lists).
