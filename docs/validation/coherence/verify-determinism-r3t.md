# Coherence verify — the determinism part (§5, §6, §7), round 3 (seat coherence/verify-determinism-r3t)

Written by Opus (verifier seat). Scope: base `## §5 `, `## §6 `, `## §7 ` after repair round 3 (coherence/assemble-r3, base
sha256 `593c657d…`). Checked against the pre-round text (assemble-r2's `4ed292e9…`), the archive, the inventory, the canon
with its dated rulings, the binding rulings `adjudication-r3.md` (R3-01 – R3-27, Part H) and `adjudication-r2.md` where not
superseded, the eighteen `repair-r3-*.md` files and `assemble-r3.md`. Nothing in the design files was edited.

PROGRESS (lane `coherence/verify-determinism-r3t`, 2026-10-01)
- P1 inputs extracted (pre-round and live base; the blocks routed into §5–§7 identified; word diff): done
- P2 the 17 round-2 findings re-checked against the live text and adjudication-r3 (Part H, R3-nn), END lines' second ends: done
- P3 the 5 replaced subsections' 11 hunks read with their targets; the round's other insertions that meet §5–§7: done
- P4 R3-02 review-id sites, terms, deferral, narration, phone, references, ids, size, document checks: done
- P5 issues, result file, LANDED: done

## 1. Inputs

| input | what |
|---|---|
| live text | `docs/ARCHITECTURE.md` l.8897–12220 (§5 8897–9224, §6 9225–10102, §7 10103–12220), sha256 `593c657d34849302…` (= assemble-r3's output) |
| pre-round text | `git show 920d280:docs/ARCHITECTURE.md`, sha256 `4ed292e94f2442e5…` (assemble-r2's output, the text round 2 verified) |
| blocks into §5–§7 | `work/assemble-r3/blocks.json`: determinism's 5 REPLACE blocks only — §6.1, §6.3, §6.5, §7.1, §7.7. No other unit's block lands in §5–§7. §5.1–§5.4, §6.2, §6.4, §7.2–§7.6, §7.8 and the three section heads are byte-identical to the pre-round text (compared subsection by subsection) |
| the change | a word diff of §5–§7, pre-round against live: 11 hunks, exactly the 11 the repair file's header lists (≈ 810 added words) |
| round-2 findings | `verify-determinism-r2t.md`, `results/coherence_verify-determinism-r2t.json` (17: VDC2-01 – VDC2-17) |
| rulings | `adjudication-r3.md`: R3-01 – R3-03, R3-04, R3-05, R3-09, R3-11 – R3-13, R3-20 – R3-23, R3-25 whole; Part H (determinism, and every other unit's rows that dispose a VDC2 id or carry an END line meeting §5–§7) |
| repairs | `repair-r3-determinism.md` (16 routed: 11 FIXED, 5 MERGED; 3 END lines; 8 judgment calls; 1 hand-off), and the HAND-OFFS of the other 17 repair files (three address determinism: V08's, model's, pipeline's) |
| others | `docs/AMENDMENTS-2026-09-28g.md` item 124; live V03, V04 §5.6, V06, V07, V08 §2.4 and §3.16 (7), V09 §4.9, §4.21.14, row 93, T-V9-87, V11 §3.25.10 – §3.25.11, V12 §3.15.14; `work/assemble-r3/ambiguous-refs.tsv`, `reviewids-final.tsv` |

## 2. Method

- **Round-2 findings:** each of the 17 re-read at its site and at every home it names, against its Part H disposition
  (FIX matching the ruling's text where Part H says "per R3-nn" or "amended"; a MERGED id checked closed by its target's
  fix in the target's own unit).
- **Replaced subsections:** each of the 11 hunks read whole with its paragraph, and every claim in it checked at its target
  (V11 §3.25.10 – §3.25.11's columns, kinds, sites and commonest-kind rule; §2.9's `time` and `light` keys; §8.2's
  *Weather effects* keying; §8.4 (i)'s fades; V04 §5.6 (2)'s and V03 §2.2's element ids; II.7.6 step 3; V09 §4.9's three
  `*.under.*` rows; §2.7 *At the frame* and `RaisedFoot`; DR1, DR3, DR19, DR29, DR42's input cells; V08 §3.16 (7) (a)–(f);
  §10.2 (b); §11.3; §13.2's T122-4 and T124-9).
- **Seams the round created:** the round's insertions elsewhere that meet §5–§7 — model's §2.6 step 7 (R3-05's roofless
  case, R3-06's level sentence) and §2.7's support step (3) and (6) (R3-25 (c)–(d)); V08 §2.4's `id` fallback (R3-20 (2));
  scope's T122-4 — each read against the §5–§7 text that states the same subject; the three hand-offs addressed to
  determinism read at both ends.
- **Scans:** the canon's 35 retired-term patterns over the live §5–§7 and the added text (2 hits, both the round-2 non-survivors:
  "standalone neighbourhood document", "V06's hand-over"); deferral, narration, review-id and phone scans of the added text
  (0) and of §5–§7 (0 phone clause; 6 review-id sites, assemble-r3 §8); assemble-r3's reference check (0 broken) and its
  one ambiguous-form entry in §5–§7 (l. 11981 `§8.2`, DR44's "drawn by §8.2's look rows": the base's, confirmed); no
  new id defined in §5–§7.

## 3. Results

**Round-2 findings (17): all closed.**

| verdict | ids |
|---|---|
| FIXED as ruled (10) | VDC2-01 (§6.1 *The weather stream*, R3-23 (a): the gap E = −ln(1 − u) through `dmath.log` spent at the live rate R(t), none while R = 0; a kind live by `yearWeek` and, under `light: 'time'`, its `hours`; the kind drawn when the spell starts; the pure-function inputs widened; §6.5 (9)'s test adds the year-position change and the hour crossing — V11 §3.25.11 reads its columns in the same terms), VDC2-02 (§6.1's `view.weather` row and the stream both key the marks on the spell's entity key folded with the world-aligned cell; §8.2 l.13091–13093 agrees), VDC2-03 (§6.5 (3)'s scope and CI's closure roots name the timeline function), VDC2-04 (amended per R3-23 (b): "at a moment with no live kind (R = 0)"), VDC2-06 (§6.3: the range V11 §3.25.10's `damage.elements` row by kind alone; the material through V06's rate), VDC2-11 (§7.7 item 1 in R3-22 (a)'s text), VDC2-13 (pipeline §4.7 l.6950), VDC2-14 (V06 l.400), VDC2-16 (E-07's `addUndergroundAccess` row: cause, action and the three keys; VKr2-04 and VPC-R2-18 closed with it, `refuse.access.route` absent from the set), VDC2-17 (V09 l.2042–2044 and the flow at l.2778–2781, each `refuse.*` row ending with `button.showWhy`) |
| closed by its MERGED target's fix (7) | VDC2-05 by VV910-r2-01 (V09 §4.21.14 (4), row 93, T-V9-87: the commonest live kind, heat shimmer in an arid row's dry weeks, the button disabled with `settings.weather.noneNow`), VDC2-07 by VM-R2T-02 (§2.6 step 7 l.2084–2088: "while above 0 (§6.3 *Plan damage*'s one comparison: a level of 0 damages nothing)"), VDC2-08 by VRC2T-13 (§8.6 l.13950–13951), VDC2-09 by VPC-R2-02 (DR44's regional clause), VDC2-10 by VPC-R2-01 (§10.2 (b) l.15495–15500), VDC2-12 by VRC2T-11 (§11.1 l.15875–15876: no input gives a true bearing), VDC2-15 by VV78-r2-02 (V07 l.1232–1234: every village river course-first) |

**Determinism's other round-3 work in §5–§7 holds where checked:** VAH-r2-01 (DR44 states the tier — `public` where the
map row gives a look, `secret` where it is `none`, a key form listing the address admitting it; V08 §3.16 (7) (e) cites
DR44), VV34-r2-16 (§6.3's keys: the choir flight and `cellarVault` by their room's address, a `cryptVault` cell by its room
and grid node, the one vault of a crypt with no cell centre by its room — V04 §5.6 (2)'s table and V03 l.436, l.2665
agree; VAL-R2-03 closed), VKr2-06 (§7.1's `drawWay` comment cites §2.7's `RaisedWayRecord.feet`; the prose's beyond-frame
clause agrees with §2.7 *At the frame* and `RaisedFoot`; VM-R2T-05 closed), VPC-R2-02 (DR44's source word agrees with
V08 §3.16 (7) (b) and §10.2 (b)). **The three END lines** are written and their second ends agree: VAH-r2-02 (DR44's
pairing clause; V08 (b), J-V8.135), VPC-R2-03 (DR44's source word; V08 (b), (d), J-V8.136), VAT-r2-04 (§7.7 item 1's host
commands; §11.3 l.16514–16515).

**New problems (11 issues, §4).** In the replaced text: a press of **Start a shower now** while a spell is in force has
no outcome (VDC3-01); the timeline's pure-function list omits the `light` mode (VDC3-09); DR44's totality sentence omits the
crisis events its own `event` rows, V08 §3.16 (7) (a) and T122-4 name (VDC3-04). At the round's seams: §6.3's "exactly while"
denies the roofless-wing case §2.6 step 7 now states (VDC3-02); §7.7 item 12's settlement key law contradicts V08 §2.4's
id-less creation key (VDC3-03; V08's hand-off); the two dry-run bends §2.7's support step gained this round have no E-07
row or catalogue key (VDC3-05, VDC3-06; model's hand-off) and §7.3's S7 operator does not name the crossed raised way's
re-run (VDC3-07). Bookkeeping: six review-process ids in §5–§7 design text (VDC3-08; assemble-r3 §8, R3-02), §13.2's T124-9
head (VDC3-10) and V09 §4.21.14 (4)'s restatement (VDC3-11; determinism's hand-off).

**g items.** 120, 121: no determinism part. 122: DR44 present with R3-09 (d)'s source word, R3-11's regional clause, R3-12's
pairing and R3-13's tier (VDC3-04). 123: §6.3 *Plan damage* present with its complete key forms (VDC3-02). 124: §6.1 *The
weather stream* present with R3-23's live rate (VDC3-01, VDC3-09). 125: §7.7 item 1 and DR1, DR3, DR19, DR29, DR42 agree
with item 125 (a)–(c) and R3-21, R3-22 (VDC3-03 is R3-20's end). 126 (a2): no phone clause in §5–§7.

**Size (principle (9)).** §5–§7 words (`wc -w`, as rounds 0–2 counted): archive 61 955 → round 0 72 855 → round 1 76 465 →
round 2 78 488 → round 3 **79 150** (+662, +0.8 % this round; the repair's +673 counts by Unicode whitespace). §5 11 402 →
11 402, §6 15 180 → 15 628, §7 51 906 → 52 120. The growth is the round's defined edges and wiring (the live-rate timeline
and its test, the marks' keys, the lint scope, E-07's no-route refusal, the element-id forms, DR44's source word, regional
clause, pairing and tier); the words removed are the retired bearing clause. The unit stands 27.8 % above the archive,
outside the shrink band; the repair file names the content that holds it (owner items 122–125 at build depth). It did not
shrink by more than half, so no nuance audit was owed.

**Document checks.** `doc_checks.py --sections 5,6,7` on the live base: exit 0 — C1 5/0, C2 1/0, C3 269/0, C4 0/0, S1 0/0,
S2 251/0 (hits/unreviewed; the pre-round copy gives the same but S2 208/0 — S2 counts the whole document's pointers, as
assemble-r3's whole-document 208 → 251 shows) — with the warning "reference corpus INCOMPLETE (missing: captures,
research/patreon, research/devlogs, research/ftg-docs, research/external) … NOT authoritative": provisional.

## 4. Issues

11 issues: 0 blocker, 3 major, 8 minor. Owners: determinism 8, V09 2, scope 1. New ids carry the r3 marker (VDC3-nn); no
round-2 id persists.

| id | severity | kind | owner |
|---|---|---|---|
| VDC3-01 | major | EDGE-UNDEFINED | determinism |
| VDC3-02 | major | CONFLICT | determinism |
| VDC3-03 | major | CONFLICT | determinism |
| VDC3-04 | minor | CONFLICT | determinism |
| VDC3-05 | minor | WIRING | determinism |
| VDC3-06 | minor | WIRING | V09 |
| VDC3-07 | minor | WIRING | determinism |
| VDC3-08 | minor | NARRATION | determinism |
| VDC3-09 | minor | WIRING | determinism |
| VDC3-10 | minor | CONFLICT | scope |
| VDC3-11 | minor | CONFLICT | V09 |

### VDC3-01 — major — EDGE-UNDEFINED — owner: determinism

**Claim.** §6.1 *The weather stream* (l.9458–9461, rewritten this round) says **Start a shower now** "starts a spell of the
commonest live kind at once as the next spell index, its length drawn there". It defines the press only at a moment with no
live kind. Nothing in the set defines a press while a spell is in force — rain falling or fog standing when the user presses,
an ordinary path, since V09 §4.21.14 (1) enables the button whenever the effects are on and a kind is live. §2.9 holds one
**spell in force** (its kind, start and phase). V09 §4.21.14 (4), V11 §3.25.11 and item 124 (g) say nothing more. Read
literally, the running spell is replaced at once. Its light terms then vanish in one frame (fog's direct-term factor
1 − 0.6s back to 1), against §8.4 (i)'s rule that no term changes the light faster than its fade allows (T124-7). Other
builders would let both spells run, or queue the press. A normal path with no defined outcome.

**Required change.** §6.1 *The weather stream*: after "…V09 disables the button there with its reason (§7.8: never a
silent no-op)." add "A press while a spell is in force ends that spell first: its strength falls from its present value to
0 at its kind's fade rate (§8.4 (i)), and the pressed spell starts the moment it reaches 0, so one spell is in force at a
time and no light term steps faster than §8.4 (i) allows (T124-7); a further press before then changes nothing." §6.5 (9)'s
*weather timeline* test adds "a press while a spell is in force, the running spell fading out before the pressed one
starts (T124-9)". (Second end for the adjudicator: V09 §4.21.14 (4) cites §6.1 for it, and row 93 adds the case.)

### VDC3-02 — major — CONFLICT — owner: determinism

**Claim.** §6.3 *Plan damage* (l.9871–9874), the threshold's home, says every plan element "shows damaged exactly while the
level is above 0 and at least t". This round model's §2.6 step 7 (l.2088–2095, R3-05) added "One case has no threshold".
While a building is `decayed` or `ruined`, every roof bay over a room of a wing whose `RoofSpec.kind` is `none` is damaged
whatever its t, however V06 §3.23 reads its level. §8.6 (l.13951–13952), V03 l.2707, V02 §5.7 (2) and X34 cite that case. So
the units state two outcomes for one case: a roof bay of a roofless decayed wing at a level below its t. §6.3's "exactly"
leaves it intact; §2.6 step 7 damages it. A builder of §6.3's comparison, or of a test written from it, builds the first.
R3-05 calls the roofless bays "a case, not a second comparison", but R3-05 routed no text to §6.3. Graded major by R3-03 (b).

**Required change.** §6.3 *Plan damage*: "the element shows damaged exactly while the level is above 0 and at least t" →
"the element shows damaged exactly while the level is above 0 and at least t — but for §2.6 step 7's one case without a
threshold: a roof bay over a room of a roofless wing (`RoofSpec.kind` `none`) of a `decayed` or `ruined` building is
damaged whatever its t and level".

### VDC3-03 — major — CONFLICT — owner: determinism

**Claim.** §7.7 item 12's key law (l.12014), the home of the settlement's binding key, reads "`settlement:<id>` — the
dossier's own id, stable across reloads, same-seed regeneration and section rerolls; a new id is a new dossier and a new
map". This round V08 §2.4's `id` row (V08 l.631; R3-20 (2), item 125 (b): a missing field never refuses; J-V8.134) gives
two fallbacks:
- a creation from a dossier whose `id` is empty or malformed mints `settlement:map:<mapId>` from the creating map's id,
  "kept for the document's life — a later readable `id` neither replaces it nor is checked against it";
- an absorb with such an `id` keeps the bound document's key, `E_OTHER_SETTLEMENT` not checked for that offer.

Take a map created from an id-less dossier that later absorbs the same dossier with a readable id. §7.7 item 12 (and §14's
`E_OTHER_SETTLEMENT`, "an absorb whose digest's settlement key differs from the binding's") make that a new dossier and
refuse it. V08 absorbs it. Two outcomes for one case; V08's hand-off names this end.

**Required change.** §7.7 item 12's settlement row, its key cell → "`settlement:<id>` — the dossier's own id; where the
dossier's `id` is empty or not of its line's form, at a creation `settlement:map:<mapId>`, the creating map's id, kept for
the document's life (a later readable `id` neither replaces it nor is checked against it), and at an absorb the bound
document's key (V08 §2.4's `id` row; item 125 (b)) — stable across reloads, same-seed regeneration and section rerolls;
between readable ids, a new id is a new dossier and a new map". (Second end for the adjudicator: §14's `E_OTHER_SETTLEMENT`
comment, scope, adds "never for an offer whose `id` fell back (V08 §2.4)".)

### VDC3-04 — minor — CONFLICT — owner: determinism

**Claim.** DR44's rule cell (l.11981) says "every SettlementForge stressor type and condition archetype at the pinned
baseline has exactly one, a look kind or `none`". Its test cell says "every SettlementForge stressor type and condition
archetype at the baseline has its `map` row (T122-4)". Several statements name a third class:
- the same cell names the `map` rows' `event` rows;
- V08 §3.16 (7) (a)'s census lists the simulator's crisis events (`PLAGUE`, `REFUGEE_WAVE`, `RAID_OR_MONSTER_ATTACK`);
- §10.2 (b) maps them;
- §13.2's T122-4, as scope wrote it this round (l.18402–18403), requires "every SettlementForge stressor type, condition
  archetype and crisis event".

The rule's own list omits the crisis events that its rows and its bar name.

**Required change.** DR44's rule cell: "every SettlementForge stressor type and condition archetype at the pinned baseline
has exactly one" → "every SettlementForge stressor type, condition archetype and crisis event at the pinned baseline has
exactly one". DR44's test cell: "every SettlementForge stressor type and condition archetype at the baseline has its `map`
row (T122-4)" → "every SettlementForge stressor type, condition archetype and crisis event at the baseline has its `map`
row (T122-4)".

### VDC3-05 — minor — WIRING — owner: determinism

**Claim.** This round model's §2.7 support step gave a dry run two new bends.
- (3), l.2547–2551: while a deck stands, a hand op on the band's held stretch under a crossing station "bends its stretch
  round it (item 101 R2)". The op is a `DeclineOp` `breach` or `dismantle` sent by hand as a `convert` event, whose `op`
  is any `ConversionOp`, `DeclineOp` among them (§7.1 l.10213; §4.11 l.8093).
- (6), l.2559–2567: where a hand `drawWall` across a standing raised way would leave a clear span past `maxClearSpanM` or a
  pier past `maxPierM`, "its dry run bends the trace to the nearest one whose crossing fits".

E-07 (§7.1's outcome table, "the one home of every refusal, conflict and bend cause of a dry run") names neither cause. Its
catch-all row lists a wall's ridge, reach, waterfront, open ground and aqueduct arch, but no held stretch and no crossing
of a standing raised way. It keys every bend generically, "V09 §4.9's `bend.*` rows", and V09 holds no row for either
bend. T-V9-15's walker therefore cannot reach these bends, and the dry run has no line to show. Model's hand-off names this
end.

**Required change.** §7.1's outcome table, before the catch-all row, add:
- "| a hand `convert` `breach` or `dismantle` of an enceinte stretch meeting the stretch held under a raised way's crossing
  station while its deck stands (§2.7's support step (3)) | bent | the op on its stretch less the held stretch, named in one
  line; an op wholly on the held stretch changes nothing, with its line | `bend.wall.held` |"
- "| a hand `drawWall` across a standing raised way whose crossing would leave a clear span past `maxClearSpanM` or a pier
  past `maxPierM` (§2.7's support step (6)) | bent | the trace bent to the nearest one whose crossing fits, the raised way
  kept and its stations re-run in the same commit | `bend.wall.raisedCrossing` |"

### VDC3-06 — minor — WIRING — owner: V09

**Claim.** The receiving end of VDC3-05. V09 §4.9's catalogue has no row for either bend §2.7's support step now gives a
hand wall op: a decline op meeting a held stretch under a crossing station, or a hand `drawWall` whose crossing of a
standing raised way does not fit. T-V9-15 requires a row for every key E-07 names.

**Required change.** V09 §4.9: add `bend.wall.held` (the op's stretch shortened round the stretch held under the raised
way, naming the way, e.g. "{way} still rests on this stretch, so it stays standing.") and `bend.wall.raisedCrossing` (the
trace moved to where its crossing of {way} fits) in V09's own words, each ending with `button.showWhy`, and cite them from
V09's wall tool flow (T3 `wall`).

### VDC3-07 — minor — WIRING — owner: determinism

**Claim.** §2.7's support step (6), new this round (l.2559–2567), makes a hand `drawWall` laid across a standing raised way
re-run (1)–(5) and the span rule on that raised way "in the same commit (the trace's undo restoring them)". The crossing
station moves onto the new trace; the stations in the new strips' setbacks, glacis, berm or channel slide or are omitted.
§7.3's S7 local-operator row is the locality home of what a `drawWall` re-derives and of the effective scope shown before
commit (§7.3 item 1). It says "re-trace only the run between the nearest unaffected towers …; re-cut the strips' setback and
glacis lines …; re-derive the strip blocks' S10 step (0)" and names no raised way. So the dry run's scope and fate sheet omit
the piers the commit moves or drops.

**Required change.** §7.3 item 3's table, the S7 row's re-derivation cell: after "re-derive the strip blocks' S10 step (0)"
add "; on each standing raised way the new trace or its moat crosses, re-run §2.7's support step (1)–(5) and the span rule
in the same commit (its crossing station onto the new trace, the stations in the new strips slid or omitted), that raised
way's part held in the effective scope and its moved or omitted piers listed in the fate sheet (§7.3 item 4)".

### VDC3-08 — minor — NARRATION — owner: determinism

**Claim.** R3-02 (principle (5)) bars review-process ids from design text. Assemble-r3's census (§8, `reviewids-final.tsv`)
leaves six such sites in §5–§7 for the verifiers. They are canon conflict and wiring ids cited as sources, all from before
this round:
- §5.1 (8) l.8972: "(DWG-01)";
- §6.1 l.9299: "(DIC-02: …)";
- §7.5's `UpgradeDiff` comment l.11348: "(DWG-02)";
- §7.6's `TableId` comment l.11419: "(MC-11)";
- §7.6 l.11460: "(V12-XCONF-2; …)";
- §7.7's `Assignment.drift` comment l.11644: "(MC-11)".

**Required change.**
- l.8972: "8. **A bug abort ends in a defined state** (DWG-01)." → "8. **A bug abort ends in a defined state.**"
- l.9299: "(DIC-02: no concern's number of draws changes)" → "(no concern's number of draws changes)".
- l.11348: "never stored (DWG-02); §14's migrate returns it" → "never stored; §14's migrate returns it".
- l.11419: "'era' … (MC-11);" → "'era' …;".
- l.11460: "(V12-XCONF-2; V11 §3.2.1 step 7 computes it so)" → "(V11 §3.2.1 step 7 computes it so)".
- l.11644: "typed in §2.6 (MC-11)" → "typed in §2.6".

### VDC3-09 — minor — WIRING — owner: determinism

**Claim.** §6.1 *The weather stream* (l.9462–9464) calls the timeline "a pure function of (the session seed, the view's
time since the map opened, the climate row, year position, sites and view hour in force at each moment, the presses)". The
same paragraph makes a kind's `hours` count only "under `light: 'time'`". The view hour is §2.9's `time` key, which exists
whatever the `light` mode. So a switch of `light` between `'day'` and `'time'` with every listed input fixed changes R(t)
and the spells. The list omits an input the rule reads, and a replay test that fixes the listed inputs alone does not pin
the timeline.

**Required change.** §6.1 *The weather stream*: "the climate row, year position, sites and view hour in force at each
moment" → "the climate row, year position, sites, `light` mode and view hour in force at each moment".

### VDC3-10 — minor — CONFLICT — owner: scope

**Claim.** §13.2's T124-9 (l.18443–18444) reads "the timeline replays from its session seed and clock". §6.1 *The weather
stream* now makes the timeline a function of the session seed, view time, the climate row, year position, sites and view
hour in force at each moment, and the presses. §6.5 (9) runs under T124-9 the scripted year-position change, a press at a
moment with no live kind and a view hour crossing a kind's `hours`. The bar's head names none of them. This is
bookkeeping (R3-03 (a)).

**Required change.** §13.2's T124-9: "the timeline replays from its session seed and clock" → "the timeline replays from
its session seed, clock and presses with the climate row, year position, sites, `light` mode and view hour in force at
each moment (§6.1 *The weather stream*) — a year-position change from a week with no live kind into a live one and back,
a press at a moment with no live kind and a view hour crossing a kind's `hours` among its fixtures".

### VDC3-11 — minor — CONFLICT — owner: V09

**Claim.** V09 §4.21.14 (4) (l.3700–3701) ends "The press is recorded in session state, so the timeline replays from its
seed, its clock and the presses (T124-9)". §6.1 *The weather stream*, the home, names the climate row, year position,
sites and view hour in force at each moment as inputs too. The restatement is narrower than its home. Determinism's
repair hands this end to the verifiers.

**Required change.** V09 §4.21.14 (4): "so the timeline replays from its seed, its clock and the presses (T124-9)" → "so
the timeline replays from its seed, its clock and the presses with the climate row, year position, sites, light mode and
view hour in force (§6.1 *The weather stream*; T124-9)".

## 5. Result

Saved as `docs/validation/coherence/results/coherence_verify-determinism-r3t.json` (key
`coherence/verify-determinism-r3t`, this file, the 11 issues above). Every round-2 id is closed: 10 FIXED as ruled, 7 by
their MERGED targets' fixes. The new findings carry the r3 marker (VDC3-nn).

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed and read):**
- the live and pre-round sha256 values, and the 5 blocks landing in §5–§7 (`blocks.json`);
- the 12 unchanged subsections, compared byte for byte, and the 11 diff hunks, each read with its targets;
- the 17 round-2 verdicts at their sites and at their MERGED targets' homes;
- Part H's dispositions, and R3-04, R3-05, R3-09, R3-11 – R3-13 and R3-20 – R3-23, R3-25 as applied;
- the three hand-offs addressed to determinism (V08, model, pipeline) at both ends;
- the retired-term, deferral, narration, phone and review-id scans;
- `doc_checks.py --sections 5,6,7` (exit 0, provisional);
- each cited line of §4 re-read in the live files.

**PLAUSIBLE:**
- VDC3-01's and VDC3-02's grades. VDC3-01 is a view-only layer, but the press during a spell is an ordinary path whose
  literal reading breaks T124-7. VDC3-02 follows R3-03 (b)'s grade for two units stating two outcomes for one case.
- The exact forms of the required changes are the verifier's proposals; the repair seats word them. These are VDC3-01's
  fade-out-then-start rule (a disabled button while a spell shows would also define the edge, if stated with its reason
  row), and VDC3-05's and VDC3-06's two key names.
