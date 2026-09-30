# Seam check, round 5 — stage 2 · stage 3 · the plan rung (V01 neighbourhoods · V02 buildings · V03 interiors)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-stage2-3-r5; covered by the whole-design retrovalidation (J84).

Lane `volumes/seam-stage2-3-r5`, 2026-09-29. Reconciliation round 5 of this seam. Output: this file only — no volume, no
amendment file and no base text is edited by this lane. Every issue names **one** owning volume (or BASE-F, an item of
`docs/AMENDMENTS-2026-09-28f.md` that must change) and the exact change it needs (J-S23R1.1 kept).

PROGRESS
- §1 Method, inputs and coverage | done
- §2 Re-check of round 4 (S23R4-01..06) | done
- §3 Sweep (every line changed since round 4's inputs; mechanisms re-traced) | done
- §4 Issue register (S23R5-nn) | done
- §5 Summary by owner, decisions (J-S23R5), CONFIRMED versus PLAUSIBLE | done

## 1 Method, inputs and coverage

**Inputs as read** (md5 at this lane's start, 13:15, and unchanged at its end; snapshots in the session scratchpad's
`volumes/seam23r5/now/`): `docs/volumes/V01-neighbourhoods.md` 15a69be1… (4 373 lines), `docs/volumes/V02-buildings.md`
65e5ea63… (4 828), `docs/volumes/V03-interiors.md` e60491e3… (3 721), `docs/AMENDMENTS-2026-09-28f.md` e4c1756e… (1 709),
`docs/volumes/_integrate.md` 965ab696… (468, unchanged since round 2's continuation), `docs/ARCHITECTURE.md` 01fea21f…
(unchanged since round 0). Each volume's hash is the one its round-5 reconcile lane logged at landing (V02 12:33, BASE-F
12:39, V01 12:40 with its correction note, V03 12:50); no other lane has written these files since. Round 4:
`docs/volumes/critique/seam-stage2-3-r4.md` (412 lines) read whole.

**Coverage (J-S23R5.1).** Round 4's inputs (V01 cbbfe6e8…, V02 34f5b1f5…, V03 735035b5…, file f 0da3c86c…, `_integrate.md`
965ab696…) survive exactly as its snapshots (`seam23r4/live/`) and as the round-5 reconcile lanes' backups
(`rcV1r5/V01-pre.md`, `rcV2r5/V02-pre-r5.md`, `rcV3r5/V03-pre-r5.md`, `rcBFr5/f-pre-r5.md`; hashes checked). This round read
the **full diff** of each file from those inputs to the live text — 900 diff lines (V01 302: reconcile-V01-r5, S23R4-04 with
the layers seam's SLR4-01, -02, -05, -07, -08 and the content seam's SCC-92, SCC-97; V02 92: reconcile-V02-r5, S23R4-02;
V03 379: reconcile-V03-r5, S23R4-01, -03, -06 and SCC-91; file f 127: reconcile-BASE-F-r5, S23R4-05 with SCC-88, SCC-89,
SLR4-10, TV-05, SR4-03, SR4-05; `_integrate.md` 0) — and followed each mechanism a changed passage touches into the
untouched text of all three volumes and the base, reading every hit in place: the entrance storeys and the basement
decision (V03 2.1, §1b, 2.5, 3.6, O1 (e), O2, T-V3-30, BCR-V3-26; the base's *Entrances* rules 1 – 5, *Basements*, the
`siteplan.entrance` concern and J-A29.61; V01's entrance reserve V1-3.8.2 step 5, its digest V1-3.8.3 and T-V1-26; V02's
BCR-V2-33 and T-V2-45); the crypt's entry and the outside basement door (V03 3.1 step 2, S6, 3.7.1, 3.7.2 (6), 3.7.4 –
3.7.6, 3.9, O2, O3, 2.4's `crypt` role row, T-V3-23, PE, BCR-V3-20, BCR-V3-32; V02 §3.14.5, §3.15's *Crypts and basements*,
`cryptSeedWings`, BCR-V2-33, T-V2-45; V01 §0 and its crypt sentences; file f items 238, 241, 242, 578; V04 §8's U4 line);
the stack's entrance and the approach strip (V02 §1b, §4.6, §8.5, BCR-V2-41; V03 S6, 2.1, 3.7.1 rule 2, 3.7.2 (1)); the
ground access symbols where they meet a building-hosted head (V01 V1-3.8.8, V1-3.14; V03 3.7.2); file f items 444 and 505
against V01 V1-8.1 and BCR-1. Three scripts over the live volumes: round 4's census (`seam23r4/live/census.py`) resolves
every `J-V`, `T-V`, `BCR-V`, `X` id and every `V1-x`, `V2 §x`, `V03 x` section one of the three volumes cites in another —
**0 dangling**; the widened census (`xcensus.py`) resolves the 582 section-pointer and 174 id occurrences the three volumes
cite in volumes 4 – 12 — **0 dangling**; a new reverse census (`seam23r5/rcensus.py`) resolves the 602 section-pointer and
183 id occurrences volumes 4 – 12 cite in these three, which this round's repairs elsewhere could have broken — **0
dangling** (its 8 hits are all `T-V2-31`, defined at V02 l. 3252 as a bold paragraph the script's row pattern misses).
Working notes and diffs: `seam23r5/d1.txt` … `di.txt`, `g1.txt`, `census*.txt`, `rcensus.txt`.

## 2 Re-check of round 4

S23R4-01 … 06 were applied between 12:33 and 12:50 by the round-5 reconcile lanes. Each is re-checked here at its anchor in
the live text.

| id | r4 sev. | owner | status | evidence (live file, line) |
|---|---|---|---|---|
| S23R4-01 | major | V03 | **fixed** | `Entrance.storey` comment "for the main entrance only where Basement.access is not 'external', whose core stops at the ground storey" (2.1, V03 l. 492 – 498; BCR-V3-26's copy, l. 2958 – 2960); 3.6's *Entrance storeys* — the main entrance of an `external` basement on levels ≥ 0, the downhill-fronted walk-out with its stoop, S11 deriving storeys after the basement decision (l. 1583 – 1590); O1 (e) (l. 1499 – 1503); §1b and 2.5 rows (l. 329, 1005); T-V3-30's (S23R4-01) clause and fixture (l. 2473); J-V3.124 (l. 2678); §0 (l. 146 – 150). Round 4's text applied, with one refinement (a re-derivation on an access change), which §3.2 item 3 follows further |
| S23R4-02 | minor | V02 | **fixed** | the stack-helpers row names `stackAccessDoor(b, a)` (V02 l. 321); the approach strip's own row (l. 322) and `landingM`'s consumer (l. 330); §8.5's M3a-V2 cell and *Dependencies* (l. 3490, 3502 – 3503); §12's two items CONFIRMED (l. 4329 – 4331, 4338 – 4342); J-V2.107 |
| S23R4-03 | major | V03 | **fixed** (two residues on paths the fix opened: S23R5-01, S23R5-02; its milestone wiring: S23R5-04) | 3.7.1's door point off the crypt's vault from M6-U (V03 l. 1649 – 1687); BCR-V3-32's New text (l. 3040 – 3041) and its round-5 note (l. 3051 – 3055); O2's forbidden clause and **the crypt join** (l. 1520 – 1531); 3.7.6 (l. 1849 – 1852, 1873 – 1875); 3.9's rows (l. 1928 – 1929); §1b (l. 342, 346, 359, 372), 2.5 (l. 1010), §6 (l. 2402), PE (l. 2507); T-V3-23 (e), (h), (j) (l. 2466); J-V3.125, J-V3.126 (l. 2679 – 2680). Recorded variations of round 4's text (the sliding door point, the vault, the two-module span, the join as an `arch`, the capped arch as a forced edge) each read against 2.4's `crypt` row (`arch`, `maxDoors` 2) and O3 — consistent |
| S23R4-04 | minor | V01 | **fixed** | note (32) "as volume 3 declares it (V03 3.7.2 (1)) — reading only the outline side and `at`, and only for the buildings on which it is not `null` … nothing open" (V01 l. 3818 – 3822); §12's clause settled in round 5's entry (l. 4046 – 4047, 4053 – 4055) |
| S23R4-05 | minor | BASE-F | **fixed** | item 505's *Build* note: `WayNamingContext` at M1; `hood.constants` one `settings` row shipped whole, every column at its default, every calibratable column's entry at M1; `hood.templates`' `stepped` row whole at M3a with `terraceSpacingM` read beside M1's `terrace.siteShare` (file f l. 869); item 444 names the type's home (l. 696); J-RF5.1 (the stepped row whole, SCC-89's words) matches V1-8.1's live M3a cell |
| S23R4-06 | minor | V03 | **fixed** | S6 "where volume 2's BCR-V2-41 puts it — at the foot of the stair chain, or on tier 0's front side on a sealed stack … (a sealed stack has no chain: its storeyed wing falls to (e))" (V03 l. 1309 – 1312); 2.1 "a storey-less stack's main entrance, where volume 2's BCR-V2-41 puts it" (l. 496 – 498); BCR-V3-26 "is volume 2's BCR-V2-41, cited whole" (l. 2966); T-V3-28 names the stair-chain form (l. 2471); V02's BCR-V2-41 unchanged, so the citations resolve |

**Totals.** 6 of 6 fixed; every one of round 4's issues is closed in its owner's text. S23R4-03's repair is sound where
round 4 aimed it — a walk-out church's door never opens into its crypt, a solid temple's crypt beside a cellar is reached
from its tomb door — but its two refinements reach two paths the round did not trace, registered in §4 with their cause.

## 3 Sweep

### 3.1 What holds

**The main entrance and the basement.** The rule reads the same at every end: the storey comment (2.1 and BCR-V3-26),
3.6, O1 (e), O2's root and T-V3-30 keep an `external` basement's main entrance at level 0 with its stoop, the base's step 3
and J-A29.25 unamended (the core stops at the ground storey); the base derives the doors and the basement in one function
on one concern (`siteplan.entrance`, base l. 7145 – 7146, J-A29.61), and the storey step draws nothing, so deriving it after
the basement decision moves no draw (3.6: the dropped entrance "after its draws"). Volume 1's reserve reads the `Entrance`
records and `Basement.access` in its digest (V1-3.8.3, V01 l. 1726), so an entrance set re-derived on a basement edit
re-stales the close-up; T-V1-26's doubled-depth fallback already covers a long stoop (V01 l. 2993, 1704 – 1707), as
J-V3.124 says; no V01 or V02 text reads a main entrance's storey. **The door off the crypt.** 3.7.1's door point, the vault
(the step-2 ring with its capped bays, stable under the rank), the two-module span (equal to `door.entranceCm` 100 at
`moduleCm` 50, 2.4 l. 621) and rules 1 and 3 read alike in 3.7.1, BCR-V3-32, §1b, 2.5, §6, 3.9 and 4.6; volume 1's reserve
follows the value through its digest and needs no text (the one-time move declared at M6-U); `Basement.crypt.edited`
exists (2.1 l. 505; BCR-V3-20). **The stack's entrance and the strip** are cited once, at their owners (V02 BCR-V2-41 and
§4.6; V03 S6 and 3.7.2 (1)), with rows at both ends. **Volume 1's access symbols** (`accessSymbolKind`, twelve kinds, `door`
excluded) never reach a building-hosted head, which volume 3 draws (V1-3.8.8's selection; V03 3.7.2); the well on a
storey-less building stays volume 4's pin in both volumes (V01 l. 1701; V03 l. 1728 – 1729). **File f** now carries
volume 1's M1 and M3a shipping as volume 1 states it (items 444, 505). The rim walk, the re-searched claim and the register
rows reach no V02 or V03 text but through S11's ordinary building of a claimed use.

### 3.2 What breaks (each registered in §4)

1. **A crypt no crypt stair reaches, on a building that has a storeyed ground wing.** Round 5 keyed two rules on the
   building rather than on the crypt: the door point keeps a door off the vault wherever `Basement.crypt` and `ground(b)`
   exist (3.7.1), and O2's crypt join exists only "on a building with no storeyed ground wing" (l. 1522 – 1523). 3.9's row
   for the crypt's entry (l. 1928), which covers "no nave on level 0, or no `ground(b)`", now ends "else the outside door at
   `basementDoor(b)`, directly or through O2's one crypt join" — on a building **with** `ground(b)` neither route exists. The
   case is volume 3's own fixture "the same with a storeyed ground annex" (l. 2433) and volume 2's T-V2-45 annex temple: a
   great temple (`always` crypt) seeds its crypt under its **solid** tier 0 (V02 l. 2379 – 2380; `cryptSeedWings`), where no
   level-0 room stands over it, so 3.7.6 lays no crypt stair; the annex's core or the trapdoor fallback enters the basement
   beside the crypt, O2 forbids every crypt edge, and the crypt is unreached (T28-2, T-V3-23 (e)). With no cellar draw
   the basement is crypt-only, its access `core` "its cores being the crypt stairs" (3.7.4, l. 1791), which cannot be laid,
   and the core's bay has no part of `Basement.ring` under a storeyed wing (3.7.1, l. 1624 – 1626): the basement is
   unreached, the base's flagged fallback, where 3.7.4 promises "so T28-3 holds" (S23R5-01).
2. **The capped arch opens the vault to the cellar.** O2 now makes 3.7.5's arch between the crypt and its capped bays'
   undercroft a forced tree edge on every building (l. 1520 – 1521; J-V3.126 (b)), while 3.7.5 still joins the undercroft
   "to the rest of storey −1 as any room is" (l. 1837 – 1838), and O2 forbids only crypt edges. On a `basement`-class church
   whose crypt the rank has capped and whose basement holds a cellar, the tree now runs crypt ↔ undercroft ↔ cellar: the
   main tree reaches the cellar through the crypt, and a walk-out's street door (kept off the vault by 3.7.1) reaches the
   crypt through the cellar and the undercroft — against 3.7.6's "Where `ground(b)` exists the crypt stairs are the crypt's
   entry" (l. 1873) and volume 1's §0. Before round 5 the arch was an opening outside the tree and no such path existed.
   3.7.1 also cites "2.1's derived reading" for the capped bays (l. 1643), which 2.1 does not state (S23R5-02).
3. **The entrance storeys' trigger and the draw order.** 3.6 says the storeys read the basement's "levels and access" but
   re-derives them only on "a change of `Basement.access`" (l. 1588 – 1589); 2.5's row (l. 1005), BCR-V3-26's rule-4 text
   (l. 2963 – 2964) and T-V3-30 name the access alone. A `setAttr(basement)` that adds a basement storey (`floors`) moves
   the floor a side, rear or yard door may meet and leaves its storey stale. BCR-V3-26's closing "S11 runs it after the
   basement decision" (l. 2968) reads, in the text the base receives, as moving S11's entrance derivation — its door draws
   on `siteplan.entrance` included — after the basement's, where 3.6 moves only the storey step (S23R5-03).
4. **The crypt clause has no milestone in the base.** Volume 3's PE row builds `basementDoor(b)`'s crypt clause "at M6-U
   with the crypt derivation (file f item 238), inside its 0.25 pw", declaring the one-time move of a walk-out church's door,
   and volume 1's reserve with it, in M6-U's shift record (l. 2507). File f item 238's note lists M6-U's content as "the
   crypt derivation — volume 3 §3.7.4's seed, growth and rank; volume 2 §3.14.5's crypt ladder and lift" (file f l. 149),
   item 578 labels `basementDoor(b)` "BASE (M3a, with item 242)" with no crypt clause (l. 159), and volume 4's U4 line lists
   the derivation without it (V04 l. 2773). An M6-U builder, holding the base and volume 4, is never told to build the
   clause or to declare the move (S23R5-04).
5. **Volume 1's §0 restates the temple's door.** "only a great temple built solid in tiers is entered at its foot by its
   own door into the crypt" (V01 l. 223); volume 3's rule and §0 now take that door into a cellar where the platform also
   holds one, and on into the crypt (V03 l. 143 – 144, 1850 – 1851) (S23R5-05).

### 3.3 Wiring across the seam — the pieces changed since round 4

| piece | produced by | consumed by | status |
|---|---|---|---|
| `Entrance.storey` of an `external` basement's main entrance | V03 BCR-V3-26 (S11, M3a), after the basement decision | O2's root, E1, A2 (8), A6, W2, T-V3-30; through the entrance set, V01's reserve (V1-3.8.2 step 5) | wired; its re-derivation trigger names the access alone (S23R5-03) |
| `basementDoor(b)`'s crypt clause (door point off the vault) | V03 3.7.1, `@plat/plots`, from M6-U | step 3 (BCR-V3-32), V01's reserve and digest, T-V3-23 (j), 4.6's `walkOut` | wired in the volumes; no milestone in the base (S23R5-04) |
| O2's crypt join; the capped arch as a forced edge | V03 O2 (plan rung, P2) | T28-2, T-V3-23 (e), (h), (j), 3.7.6, 3.9 | the join withheld where a storeyed wing stands but no crypt stair reaches (S23R5-01); the arch opens the vault to the cellar (S23R5-02) |
| stair 0's approach strip (row) | V02 §4.6 (one statement), §1b row | V02 §4.6's placement; V03 `basementDoor(b)` rule 2, `stackAccessDoor(b, a)` | wired both ways |
| `stackAccessDoor(b, a)` among the stack helpers' readers | V02 §1b, §8.5 | — | wired both ways |
| `hood.constants` (M1, whole), `hood.templates`' stepped row (M3a, whole), `WayNamingContext` (M1) | V01 V1-8.1, BCR-1 | file f items 444, 505 | wired; the texts agree |
| `accessSymbolKind(a)` | V01 V1-3.8.8 | V1-5.1.2, V1-3.14's columns, T-V1-4 | reaches no V02 or V03 text (building-hosted heads are V03's) |

**Checked and not registered.** (a) The door point is still read on `ground(b)` alone in S23R5-01's required change: a
walk-out on a building whose crypt no stair reaches keeps its door off the vault too, which is harmless (the door opens
into a cellar and the crypt join enters the crypt), and keeping the condition unchanged keeps the door stable under the
rank. (b) A crypt-only basement is never `external` while `ground(b)` exists: the always-crypt ladder has no walk-out rung
(3.7.4: full, half, raised), so the door point never faces a basement that is all vault. (c) Volume 2's parenthesis "(V03
§3.7.1: the tomb door, or the wall's side …; the crypt inside a platform entered by the same door at its own floor)" (V02
l. 2386 – 2387) glosses volume 3's rules in their order and stays true under round 5. (d) T-V1-26's "0 basement-door
rectangles on the main entrance's side … whose `basementDoor(b)` lies on another side" is untouched by a downhill-fronted
walk-out, whose door commonly lies on the main entrance's side. (e) Volume 1's gloss of the `door` kind as "an arch vault's
infill" (V01 l. 1797) differs from the base's "ladder, hatch and door: item 64's basement accesses" (base l. 15876);
every `door` volume 3 heads is building-hosted and never reaches the symbol key, so the difference lies between volume 1
and volume 4 (the layers seam's; see *Outside this seam*).

## 4 Issue register (round 5)

Counts: **5 issues — 0 blockers, 1 major, 4 minors.** Owners: V03 1 major, 2 minors; BASE-F 1 minor; V01 1 minor. Line
numbers are the live files' (§1's hashes).

| id | sev. | owner | kind | the claim in one line |
|---|---|---|---|---|
| S23R5-01 | major | V03 | contradiction (3.9 v. O2 and 3.7.1; base T28-2) | a crypt no crypt stair reaches on a building with a storeyed ground wing (a great temple's crypt under its solid tier beside a storeyed annex) has no entry: 3.9 names O2's crypt join, which O2 withholds there |
| S23R5-02 | minor | V03 | contradiction (3.7.6, V01 §0) | the capped arch, now a forced tree edge, joins the crypt through its undercroft to the cellar on a stair-entered church; 3.7.1 cites 2.1 for the capped bays |
| S23R5-03 | minor | V03 | lifecycle gap; ambiguous request text | the entrance storeys read the basement's levels but re-derive on an access change only; BCR-V3-26's "S11 runs it after the basement decision" reads as moving the door draws |
| S23R5-04 | minor | BASE-F | unwired (milestone) | item 238's M6-U content and item 578 do not carry `basementDoor(b)`'s crypt clause or the declared move of a walk-out church's door |
| S23R5-05 | minor | V01 | stale restatement | §0 takes a solid temple's own door "into the crypt"; volume 3 takes it through a cellar where the platform holds one |

### S23R5-01 — major — owner V03 — a crypt no crypt stair reaches

**Claim.** Round 5 keyed the crypt's entry on the building, not on the crypt. 3.7.6 lays crypt stairs only from a room of
level 0 over the crypt (a nave piece, else the largest room meeting its nave-side edge; 3.9, the largest room over its
edge; V03 l. 1847 – 1849, 1928), O2 forbids every other crypt edge (l. 1520 – 1521), and O2's new crypt join exists only
"on a building with no storeyed ground wing" (l. 1522 – 1523). 3.9's row for the crypt's entry (l. 1928), whose condition
"no nave on level 0, or no `ground(b)`" covers buildings **with** `ground(b)`, now ends "else the outside door at
`basementDoor(b)`, directly or through O2's one crypt join": with `ground(b)` the door is kept off the vault (3.7.1,
l. 1651 – 1655) and O2 withholds the join, so neither route exists. The building is on both sides of the seam: volume 3's
fixture "the same with a storeyed ground annex" (l. 2433 – 2434; critique/V02.md V2C-47 (5)) and volume 2's T-V2-45 annex
temple (V02 l. 3341 – 3343) — a great temple, an `always` crypt class, whose crypt is seeded under its **solid** tier 0
(V02 l. 2379 – 2380, `cryptSeedWings`: "a stack's tier 0") where no room of level 0 stands. With a cellar (T-V2-45's
requested basement, access ≠ `external`: the annex's core or the trapdoor fallback), the core lands beside the crypt and
the crypt is unreached (T28-2; T-V3-23 (e)). Without one, the basement is crypt-only with access `core`, "its cores being
the crypt stairs (3.7.6), so T28-3 holds" (l. 1791 – 1792), but no crypt stair can be laid and the core's bay finds no part
of `Basement.ring` under a storeyed wing (l. 1624 – 1626): the whole basement is the base's flagged fallback.
**Required change (V03).** (a) 3.7.4, after the rank's paragraph, add: "**A stair-entered crypt** (seam S23R5-01;
J-V3.127). A crypt is *stair-entered* where `ground(b)` exists and the ring of a storeyed ground-standing wing (3.3's level
reading) overlaps its **vault** (3.7.1: the step-2 ring with its capped bays, or the author's ring where `edited` is set) —
a reading of eager records that no rank event moves. A stair-entered crypt is entered by its crypt stairs (3.7.6); any
other — `ground(b)` absent (a great temple built solid), or no storeyed wing over its vault (a great temple's crypt under
its solid tier 0 beside a storeyed annex) — is entered from the basement: by the outside door at `basementDoor(b)`, or
through O2's one crypt join." (b) 3.7.4's `always` bullet, after "… where `ground(b)` is absent (3.7.1; a great temple
built as a solid stack, whose seed wing is its tier 0, V2 §3.15.3)", add: "Where `ground(b)` exists but the crypt would not
be stair-entered, the basement is never crypt-only: it takes the region whole (§2.6's inset of the ground wings,
BCR-V2-33), the crypt inside it, `floors` 1, its access the programme row's (§2.6; `external` only by a walk-out's fall,
volume 2's BCR-V2-33), so the core the storeyed wing brings, or the trapdoor fallback, lands in the part under that wing
(3.7.1's *Where a core joins it*) and O2's crypt join enters the crypt." In BCR-V3-20's New text, "a crypt-only basement
where its ordinary draw gives none;" → "a crypt-only basement where its ordinary draw gives none — the ground wings' whole
inset instead where a storeyed ground wing stands but over none of the crypt (volume V03 §3.7.4);" (file f item 238
carries it by reference; its label unchanged). (c) O2's crypt join, "On a building with no storeyed ground wing — whose
crypt is entered by the basement's outside door (3.7.6) — the basement root's tree joins the crypt to the rest of the
basement by exactly one join" → "On a building whose crypt is not stair-entered (3.7.4) — entered from the basement, never
from the church above (3.7.6) — the tree that spans the basement (the basement root's; else the main tree, which enters
storey −1 by the core's bay or the trapdoor, §2.6 step 3) joins the crypt to the rest of the basement by exactly one join",
and in (i) "where the tree starts outside the crypt" → "where the tree enters the basement outside the crypt". (d) 3.7.6,
*Where they start*: "where `ground(b)` is absent (a stepped temple's sanctuary stands on its solid stack), the crypt's
entry is the basement's outside door at `basementDoor(b)` (3.7.1: the tomb door, or a wall walk-out's door) — directly, or
through O2's one crypt join from the room it opens into (seam S23R4-03) —" → "where the crypt is not stair-entered (3.7.4:
`ground(b)` absent — a stepped temple's sanctuary on its solid stack — or no storeyed wing over its vault), the crypt's
entry is from the basement — the outside door at `basementDoor(b)` (3.7.1: the tomb door, or a wall walk-out's door)
directly, or O2's one crypt join from the room of storey −1 the basement's tree enters first (seams S23R4-03, S23R5-01)
—"; the last bullet's "Where `ground(b)` exists the crypt stairs are the crypt's entry" → "Where the crypt is stair-entered
(3.7.4) the crypt stairs are its entry". (e) 3.9: the row "no nave on level 0, or no `ground(b)`, for the crypt's entry |
3.7.6 | the largest room over the crypt's edge; else the outside door at `basementDoor(b)`, directly or through O2's one
crypt join (seam S23R4-03), `cryptStair` noted" → "no nave on level 0 over a stair-entered crypt (3.7.4) | 3.7.6 | the
largest room of level 0 over the vault's edge, its flight landing in the crypt, else in the capped bays' undercroft that
3.7.5's arch joins to it, `cryptStair` noted", and a new row "a crypt that is not stair-entered (3.7.4) | 3.7.6, O2 | the
outside door at `basementDoor(b)` directly, or O2's one crypt join from the basement's tree (seam S23R5-01), `cryptStair`
noted `tomb door` or `crypt join`; the basement itself unreached, the base's fallback, tier 1, flagged". (f) The texts
that restate the condition read "a crypt that is not stair-entered (3.7.4)" where they speak of the crypt's entry: 3.1
step 2 (l. 1030 – 1031), S6 (l. 1320 – 1321), §1b's door-graph row (l. 359), J-V3.126's condition. (g) T-V3-23 (j) adds:
"on the stepped great temple with a storeyed ground annex (§7's fixture), its crypt seeded under the solid tier 0 — with a
requested basement (`Basement.access` ≠ `external`, volume 2's T-V2-45) and with none (the basement then taking the region
whole, never crypt-only) — the crypt is reached (T28-2) through exactly one crypt join from the room the annex's core or
the trapdoor fallback enters; and no stair-entered crypt takes a crypt join" — the basement's extent from M6-U on the eager
records, the reach from P2. (h) A J-V3 row (J-V3.127): "chose to key the crypt's entry on whether a storeyed ground wing
stands over its vault — stair-entered, by its crypt stairs; else from the basement, by the outside door or one crypt join —
and to give a crypt that no stair reaches on a building with `ground(b)` a whole basement rather than a crypt-only one,
over keying on `ground(b)`, which strands the crypt of a great temple with a storeyed annex (no crypt stair, no join); over
a tomb door for that crypt, which volume 2's BCR-V2-33 bars (a storeyed annex's basement 'never outside'); and over
seeding the crypt under the annex, which moves volume 2's `cryptSeedWings` and puts the temple's crypt off its sanctuary,
read by volumes 4, 6 and 10; the vault, not the trimmed ring, so the reading never flips on a rank event elsewhere."
3.7.1's door-point condition stays on `ground(b)` (§3.3 (a)). Volume 2 needs no change: T-V2-45's `≠ external` holds, and
its half raise's "a basement that is only a crypt" reads the basement as derived.

### S23R5-02 — minor — owner V03 — the vault closed to the cellar

**Claim.** O2 makes 3.7.5's arch between the crypt and its capped bays' undercroft a forced tree edge on every building
(V03 l. 1520 – 1521; J-V3.126 (b), l. 2680), and forbids only edges of the crypt itself; 3.7.5 joins the undercroft "to the
rest of storey −1 as any room is (O2)" (l. 1837 – 1838). On a `basement`-class church whose crypt the rank has capped and
whose basement holds a cellar, the tree now runs crypt ↔ undercroft ↔ cellar: the main tree can reach the cellar through
the crypt, and a walk-out's street door — kept off the vault by 3.7.1 — reaches the crypt through the cellar and the
undercroft, against 3.7.6's "Where `ground(b)` exists the crypt stairs are the crypt's entry" (l. 1873) and volume 1's §0
("no entrance of their own on the street — you go down from inside the church", V01 l. 221 – 222). Before round 5 the arch
was an opening outside the tree, and no such path existed. 3.7.1 also reads the capped bays as "2.1's derived reading"
(l. 1643) and 3.7.4 (3) as "(2.1, derived)" (l. 1815 – 1816); 2.1 states no such reading (l. 500 – 505); §1b's capped-bays
row (l. 346) and 3.7.4 (3) define it.
**Required change (V03).** (a) O2's forbidden clause, "between the crypt and any other basement room but its capped bays'
undercroft, which 3.7.5's arch joins as a forced edge (the crypt is entered from the church above; seam S23R4-03)" →
"between the crypt and any other basement room but its capped bays' undercroft, which 3.7.5's arch joins as a forced edge;
and, where the crypt is entered by its crypt stairs (3.7.6), between that undercroft and any other basement room, so the
vault — the crypt and its capped bays — is closed to the rest of the basement (the crypt is entered from the church above;
seams S23R4-03, S23R5-02)". (b) 3.7.5: "joined to the crypt by one `arch` of `door.archCm` on their shared wall and to the
rest of storey −1 as any room is (O2)" → "joined to the crypt by one `arch` of `door.archCm` on their shared wall, and —
only where the crypt is not entered by crypt stairs (O2's crypt join) — to the rest of storey −1 as any room is (O2)".
(c) 3.7.1's "(below: `Basement.crypt` with its capped bays, 2.1's derived reading)" → "(`Basement.crypt` with its capped
bays, 3.7.4 (3)'s derived reading)"; 3.7.4 (3)'s "(2.1, derived)" → "(derived, never stored; §1b's capped-bays row)".
(d) T-V3-23 (j) adds "on a capped walk-out church with a cellar, no tree path joins the crypt or its undercroft to a cellar
room; the undercroft is reached from the crypt through 3.7.5's arch". (e) J-V3.126 amended: "(c) where crypt stairs enter
the crypt the forced arch closes the vault — the undercroft joins no other basement room — so the forced edge reaches a
capped crypt-only church's undercroft without opening the crypt to a cellar (seam S23R5-02)". With S23R5-01 applied,
"entered by its crypt stairs" reads "stair-entered (3.7.4)".

### S23R5-03 — minor — owner V03 — the entrance storeys' trigger and the draw order

**Claim.** 3.6 says the storeys read the basement's "levels and access" and re-derives them on "a change of
`Basement.access` — the basement's re-derivation or `setAttr(basement)`" (V03 l. 1588 – 1589); 2.5's row (l. 1005),
BCR-V3-26's rule-4 text ("or the building's `Basement.access` changes", l. 2963 – 2964) and T-V3-30's clause (l. 2473)
name the access alone. A `setAttr(basement)` that adds a basement storey (`floors`) or changes its `kind` (a `raised`
crypt's floor; a full cellar's against a half one's where the ground wings keep their datum) moves the floor a side, rear
or yard door may meet, and the storey stays stale. BCR-V3-26's closing "S11 runs it after the basement decision, whose
access the main entrance's storey reads" (l. 2968) is the text the base receives; "it" reads as S11's entrance derivation,
whose door draws share the `siteplan.entrance` concern with the basement decision (base l. 7145 – 7146; J-A29.61), where
3.6 moves only the storey step, which draws nothing.
**Required change (V03).** (a) 3.6: "and a change of `Basement.access` — the basement's re-derivation or
`setAttr(basement)` — re-derives them" → "and a change of the basement's `access`, `kind` or `floors` — by the basement's
re-derivation or `setAttr(basement)` — re-derives them; the storey step draws nothing, so the door and basement draws keep
their order on `siteplan.entrance` (J-A29.61)". (b) 2.5's `Entrance.storey` row, "or the building's `Basement.access`
(the main entrance's rule; seam S23R4-01)" → "or the building's basement — its `access`, `kind` or `floors` (the levels
the storeys read, and the main entrance's rule; seams S23R4-01, S23R5-03)"; §1b's row (l. 329), "and, for the main
entrance, `Basement.access`" → "the basement's levels and, for the main entrance, `Basement.access`". (c) BCR-V3-26's New
rule-4 text, "or the building's `Basement.access` changes" → "or the building's basement (its `access`, `kind` or
`floors`) changes"; its closing, "S11 runs it after the basement decision, whose access the main entrance's storey reads"
→ "S11 derives the storeys — a step with no draw — after the basement decision, whose levels and access they read; the
door and basement draws keep their order on the `siteplan.entrance` concern (§6.1, J-A29.61)". (d) T-V3-30's "after
`setAttr(basement)` changes that basement's access" → "after `setAttr(basement)` changes that basement's access, kind or
floors". (e) J-V3.124's refinement sentence names the three fields. File f item 241 carries the text by reference; its
label is unchanged.

### S23R5-04 — minor — owner BASE-F — the crypt clause's milestone

**Claim.** Volume 3's PE row builds `basementDoor(b)`'s crypt clause "at M6-U with the crypt derivation (file f item 238),
inside its 0.25 pw", its first reading moving a walk-out church's door, and volume 1's entrance reserve with it, "declared
in M6-U's shift record with the crypt's first derivation" (V03 l. 2507; BCR-V3-32's note, l. 3051 – 3055). File f item
238's note gives M6-U's content as "the crypt derivation — volume 3 §3.7.4's seed, growth and rank; volume 2 §3.14.5's
crypt ladder and lift" (file f l. 149); item 578 labels "`basementDoor(b)` itself BASE (M3a, with item 242)" with no crypt
clause (l. 159); volume 4's U4 line lists the derivation without it (V04 l. 2773). An M6-U builder, holding the base and
volume 4 (§17.1), is never told to build the clause or to declare the move. Volume 3's own hand-off calls item 578's note
optional (V03 l. 3418 – 3421).
**Required change (BASE-F).** Item 238's note: "whose content gains "the crypt derivation — volume 3 §3.7.4's seed, growth
and rank; volume 2 §3.14.5's crypt ladder and lift" in volume 4 §8's U4 line (+0.25 pw)" → "whose content gains "the crypt
derivation — volume 3 §3.7.4's seed, growth and rank; volume 2 §3.14.5's crypt ladder and lift; volume 3 §3.7.1's crypt
clause of `basementDoor(b)` (the door point off the crypt's vault; item 578), whose first reading — a walk-out church's
outside door moved off its crypt, volume 1's entrance reserve with it — M6-U's shift record declares with the crypt's first
derivation" in volume 4 §8's U4 line (+0.25 pw, unchanged; volume 3 §8's PE; seam S23R5-04)". Item 578's note adds: "The
step-3 text's crypt clause and `basementDoor(b)`'s door point off the crypt's vault read `Basement.crypt` (item 238) and
are built with it at M6-U, inert before (volume 3 §8's PE; seams S23R4-03, S23R5-04)"; its label "`basementDoor(b)` itself
BASE (M3a, with item 242)" → "`basementDoor(b)` itself BASE (M3a, with item 242), its crypt clause with item 238 (M6-U)".
Where S23R5-01 has landed, item 238's list also names "the stair-entered test and the whole basement of a crypt no stair
reaches (volume 3 §3.7.4)". (Volume 4's U4 line takes the same words — its lane's or the layers seam's hand-off.)

### S23R5-05 — minor — owner V01 — the solid temple's door in §0

**Claim.** V01's §0 tells the owner "only a great temple built solid in tiers is entered at its foot by its own door into
the crypt, drawn with the building" (V01 l. 222 – 223). Volume 3 now takes that door into a cellar where the platform also
holds one, and on into the crypt through O2's crypt join (V03 §0, l. 143 – 144; 3.7.6, l. 1850 – 1851; J-V3.126).
**Required change (V01).** §0: "only a great temple built solid in tiers is entered at its foot by its own door into the
crypt, drawn with the building" → "only a great temple built solid in tiers is entered at its foot by its own door —
straight into the crypt, or into a cellar beside it and on into the crypt — drawn with the building" (seam S23R5-05). No
other volume 1 text restates the door.

## 5 Summary by owner, decisions, CONFIRMED versus PLAUSIBLE

**By owner.** V03: S23R5-01 (major), S23R5-02 (minor), S23R5-03 (minor). BASE-F: S23R5-04 (minor). V01: S23R5-05
(minor). V02: none — every V02 text this round touched reads as volume 3 and file f now do, and S23R5-01's required change
leaves T-V2-45 and BCR-V2-33 as they stand. **Order for the lanes:** S23R5-01 and S23R5-02 both edit O2's crypt clauses and
3.7.6 and are best applied together (S23R5-02's "entered by its crypt stairs" is S23R5-01's "stair-entered"); S23R5-01 (b)
edits BCR-V3-20's New text, which file f item 238 carries by reference, and S23R5-04's last sentence follows it; S23R5-03
and S23R5-05 stand alone. Where these land after this round, the next round of this seam re-checks them.

**Decisions (vetoable).**

| id | decision |
|---|---|
| J-S23R5.1 | Chose to sweep by **full diff since round 4's inputs** (900 lines, snapshots hash-checked), tracing every changed mechanism into untouched text at both ends of the seam and the base, with round 4's two censuses and a **new reverse census** (volumes 4 – 12 into these three) — over re-reading 1.7 MB whole, because every earlier text has been read whole (rounds 0 – 1) or by full diff (rounds 2 – 4), and repairs elsewhere could move this seam only through citations (the censuses) and shared mechanisms (the trace). The trace found all five issues: each sits where a round-5 repair meets text it did not name (3.9's crypt row, 3.7.5's undercroft join, 3.6's trigger, file f's M6-U content, V01's §0). |
| J-S23R5.2 | Chose, for S23R5-01, **a stair-entered test on the crypt's vault** and **a whole basement for a crypt no stair reaches on a building with `ground(b)`**, over (i) keying the entry on `ground(b)` as round 5 does, which strands the annex temple's crypt; (ii) a tomb door for that crypt, which volume 2's BCR-V2-33 bars for a storeyed annex ("never outside"), so it would need a second base amendment; (iii) seeding the crypt under the storeyed annex, which moves volume 2's `cryptSeedWings` and the temple's crypt off its sanctuary, read by volumes 4, 6 and 10. The realism tiebreaker favours the chosen form: a temple platform's substructure opening into its tomb chamber is a historical arrangement, and the crypt stays under the sanctuary. The vault (rank-stable) keeps the test from flipping on a rank event elsewhere. |
| J-S23R5.3 | Chose, for S23R5-02, **to close the vault** on a stair-entered crypt over reverting the capped arch to an opening outside the tree, because the reversion re-strands a capped crypt-only church's undercroft, the residue J-V3.126 (b) fixed. |
| J-S23R5.4 | Registered **S23R5-04 on BASE-F** with volume 4's U4 line as a hand-off, over a V04 issue, because the base's M6-U row is what item 238's note writes (it quotes the U4 line's words), and volume 4's text belongs to the layers seam; one registration here names both texts. |
| J-S23R5.5 | Graded **S23R5-01 major**: a text a builder implements (3.9's rung) names a route the governing rule (O2) withholds, and a fixture on both sides of the seam (V03's annex temple, V02's T-V2-45) fails the hard bar T28-2. Graded **S23R5-02 – 05 minor**: a path that breaks no bar (every room stays reached) but contradicts 3.7.6 and what volume 1 tells the owner; a lifecycle trigger on a rare edit and an ambiguous clause; a milestone note whose mechanism the volume already states; a plain-words sentence. |

**CONFIRMED versus PLAUSIBLE.** CONFIRMED by reading the live text at the lines cited, with the input hashes unchanged from
start to end (V01 15a69be1…, V02 65e5ea63…, V03 e60491e3…, file f e4c1756e…, `_integrate.md` 965ab696…, base 01fea21f…):
every status of §2; every line of §1's four diffs; every claim of S23R5-01 – 05 at both ends (V03's §0, 2.1, 2.4's `crypt`
row and `door` cells, 2.5, §1b, 3.1 step 2, S6, 3.6, O1 – O3, 3.7.1 – 3.7.7, 3.9, §6, T-V3-23, -28, -30, PE, J-V3.124 –
126, BCR-V3-20, -26, -32; V02's §1b, §3.14.5, §3.15's crypts paragraph, BCR-V2-33, T-V2-45, BCR-V2-41; V01's §0, V1-3.8.2
step 5, V1-3.8.3, V1-3.8.8, T-V1-26, notes (32) and (36) – (38), §12; file f items 238, 241, 242, 444, 505, 578; V04's U4
line; the base's *Entrances*, *Basements*, the `siteplan.entrance` concern, J-A29.61 and `AccessPoint.kind`). CONFIRMED by
executed script: the three censuses (0 dangling; 582 + 174 occurrences out of the seam, 602 + 183 into it) and the md5
checks. PLAUSIBLE: that the annex temple's crypt, in the fixture as built, lies under no room of level 0 (it depends on the
fixture's geometry and `cryptM2`; the rule text has no route either way); that capped crypts beside cellars occur (the
rank caps at generation only as a backstop, 3.7.4 (3), and across epochs through volume 6's see moves); the required texts
themselves, until their owners apply them and the next round re-checks. Nothing was executed beyond `diff`, `grep`, `md5`,
`sed` and the three census scripts: this lane writes a critique.

**Outside this seam.** Volume 1's gloss of the `door` kind as "an arch vault's infill" (V01 l. 1797) against the base's
"ladder, hatch and door: item 64's basement accesses" and volume 4's arch-vault door "on the ground" (V04 l. 490, 2497) is
the layers seam's (V01 against V04). Volume 4's U4 line's crypt-derivation parenthesis follows S23R5-04 (layers seam or
volume 4's next lane). Volume 3's SCC-91 register change (2.4's first line taking the `room` role's area under V12
§3.11's later-line rule) reaches no V01 or V02 text and is the content-calibration seam's.
