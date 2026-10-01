# Coherence verify — the determinism part (§5, §6, §7), round 1 (seat coherence/verify-determinism-r1t)

Written by Opus (verifier seat). Scope: base `## §5 `, `## §6 `, `## §7 ` after repair round 1 (coherence/assemble-r1, base
sha256 `137ecc0e…`), checked against the pre-round text (assemble-r0's `484af066…`), the archive, the inventory, the canon
(with its dated rulings for g items 114–125), the eighteen `repair-r1-*.md` files and `assemble-r1.md`. Nothing in the design
files was edited.

PROGRESS (lane `coherence/verify-determinism-r1t`, 2026-10-01)
- P1 inputs extracted (pre-round and live base; the blocks routed into §5–§7 identified): done
- P2 the 36 round-0 findings re-checked against the live text: done
- P3 the 13 replaced subsections diffed whole against the pre-round text; every changed hunk read with its targets: done
- P4 g items 114/117/118 parts (re-check), 120–125 routing for determinism: done
- P5 cross-unit seams the round touched (the 18 repair preambles' hand-offs to or from §5–§7): done
- P6 terms, deferral, narration, references, ids over §5–§7: done
- P7 issues, result file, LANDED: done

## 1. Inputs

| input | what |
|---|---|
| live text | `docs/ARCHITECTURE.md` l.8644–11865 (§5 8644–8971, §6 8972–9776, §7 9777–11865), sha256 `137ecc0e4fe12c44…` (= assemble-r1's output) |
| pre-round text | `git show 942d90c:docs/ARCHITECTURE.md`, sha256 `484af066f0115b1d…` (assemble-r0's output, the text round 0 verified) |
| blocks into §5–§7 | `work/assemble-r1/blocks.json`: determinism's 13 REPLACE blocks only — §5.1, §5.2, §5.3, §5.4, §6.1, §6.2, §6.3, §6.5, §7.1, §7.4, §7.5, §7.6, §7.7; its RULING REQUEST VDC0-33 skipped. No other unit's block lands in §5–§7. §6.4, §7.2, §7.3, §7.8 and the three section heads are byte-identical to the pre-round text (checked by `cmp`) |
| round-0 findings | `verify-determinism-r0s.md`, `results/coherence_verify-determinism-r0s.json` (36: VDC0-01 – VDC0-36) |
| repairs | `repair-r1-determinism.md` (62 issues routed: 27 VDC0, 9 VAH, 1 VAT0, 6 VAT, 6 VEL0, 1 VEW, 3 VK0, 2 VM-R0S, 1 VPC, 5 VV), and the hand-off notes of the other 17 repair files |
| canon | `canon.md` dated rulings: items 114–116, 117, 118, 119 (with (a2)), 120 (J133), 121–123 (J134–J136), 124 (J137), 122 (h)–(i) and 125 (J138, J139; filed after this seat's brief, applied by the brief's general rule for g items from 111) |
| others | `docs/AMENDMENTS-2026-09-28g.md` items 114–125; the live volumes (V01, V03, V04, V05, V06, V07, V08, V09, V10, V11); `edges.json`; `work/assemble-r1/ambiguous-refs.tsv` |

## 2. Method

- **Round-0 findings:** each of the 36 re-read against the live text at its site and at every home it names, whoever owned it.
- **Replaced subsections:** a word-level diff (`git diff --no-index --word-diff`) of each of the 13 replaced subsections against
  the pre-round text — 86 hunks, ≈ 4 500 added words. Each hunk was read, and every claim in it checked at its target
  (another base section, a volume section, a table row, a key, a test id). The layer table's 67 former event tokens were
  checked present in the binding, since E-04/VAT-07 removed that column. The 33 never-read paths §7.7 item 1 gave up
  (VAH-02) were each checked against V08 §2.4: the 32 still unread are on its `ignored` rows, and `traditions` is read (item 118).
- **Seams:** every hand-off the 18 repair preambles address to determinism, and every one determinism addressed to others,
  checked at its destination in the live text.
- **g items:** the canon's dated rulings read whole. Determinism's parts of items 114 (§7.1, §7.4, §7.7), 117 (§7.7) and
  118 (§7.7) checked at build depth. Items 120, 121 and 122 (h)–(i) name no determinism part. Items 122 (§7.7), 123 (§6.3),
  124 (§6.1) and 125 (§7.7) name parts that are absent.
- **Terms, deferral, narration, ids, references:** the canon's 35 retired-term patterns over the live §5–§7 (0 survivors:
  both hits are the correct "standalone neighbourhood document"); a deferral scan of the added text (0); a narration scan
  (1, VDC1-10); DR41–DR43 unique and cited consistently by V05 and V08; all 43 `refuse.*` and `bend.*` keys of §7.1
  present in V09 §4.9; the assembler's ambiguous-form list for §5–§7 (3 entries, 2 raised as VDC1-08; l.9189 is external,
  `docs/CONFIDENCE.md`).

## 3. Results

**Round-0 findings (36).**

| verdict | ids |
|---|---|
| FIXED (34) | VDC0-01 (pipeline: §4.6 step 8's *Bars*, l.6314), VDC0-02, VDC0-03, VDC0-04 (§7.1, binding T3, §7.4 row, DR41, item 1), VDC0-05 (DR42), VDC0-06 (DR43, item 1), VDC0-07 (model: §2.7's five states, material, epoch), VDC0-08 and VDC0-09 (pipeline: §4.11 l.8294-8299, `EpochInputs` l.8003-8004), VDC0-10, VDC0-11 (with V03 §4.2 and V09 §4.9's rows), VDC0-12, VDC0-13, VDC0-14, VDC0-15 (V07 l.1914, l.2773, l.2973, l.3145), VDC0-16, VDC0-17, VDC0-18, VDC0-19, VDC0-20, VDC0-21, VDC0-22, VDC0-23 (pipeline l.5439), VDC0-24 (model l.2443, l.2474), VDC0-25 (V06), VDC0-26, VDC0-28 (with `TableView`), VDC0-29, VDC0-30, VDC0-31, VDC0-32, VDC0-34 (V08 l.629, l.657), VDC0-35, VDC0-36 (§7.1's rows; the residue at §11.2 is VDC1-15) |
| FIXED IN PART, ONE CLAUSE WRONGLY (1) | VDC0-27: F-RIVER's added `E_NO_PATH` contradicts §3.1 as repaired (VK0-11) and §4.2 S1's descent |
| OPEN, RULING REQUESTED (1) | VDC0-33 (determinism's RULING REQUEST; never applied by assemble-r1) |

**New problems in the replaced subsections and their seams (25 new issues).** The repair's own changes hold everywhere
they were checked except where listed in §4. Each was checked: the `Invariant` type, the onFail tiers, the `EntityKind`,
`EditId`, `TableId` and `TableView` types; the epoch component's widening (104 bits; `StreamOpts` untyped, no other u16
statement but J-A113.61); the salt cap (`no_alternative`); `walls.condition`'s registry row against V06 §3.7.2 (2),
§3.7.7 (5), V07 §3.4 (8) and V11 §3.25.3; the per-level digest; the F-TEMPLATE / F-DISPATCH / F-UNIT pointer rows against
V01 §3.13, which holds every removed detail; the sky clearance exemption against V05 §3.9 (5); the wall-crossing row and
NF-P5 against V07 §3.12a (4) (d); the recipe line; §7.1's empty-edit and points-form rules; the E-07 rows and *The
returned kinds*; the binding's new pairs; §7.4's replay semantics against V06 §3.20.3 and §3.20.7; the host:port rule; the
wear and repair row against §2.7 and V06 §3.7.7; the undo-cap measurement; the frame row against §3.2 (9) as repaired; the
five §7.5 rows; §7.7's precedence, the never-read reasons, DR41–DR43 against V08 §3.16 (2), (4), (5), V11 and §2.9; the
KEY LAW row; and F-V8-8. The defects found are VDC1-01 – VDC1-21 below, with G122/G123/G124/G125-determinism.

**g items.** 114: determinism's parts present (§7.1 walls row and binding T3 with `wearWall` and `repairWall`'s material;
§7.4's wear and repair row; DR41; item 1's readiness). 117: DR42 present. 118: DR43 present, and item 1 no longer lists
`traditions`. 120, 121, 122 (h)–(i): no determinism part named. **122, 123, 124, 125: absent** (F-MISSING, ids
G122-determinism – G125-determinism).

**Size (principle (9)).** §5–§7 words: archive 61 955 → round 0 72 855 → round 1 76 465 (+3 610, +5.0 % this round). §5
10 979 → 11 333, §6 13 676 → 14 039, §7 48 200 → 51 093. The growth is new design: g items 114/117/118, the E-07 rows
and the declared types. The unit stands 23.4 % above the archive, so it does not meet the shrink band; the repair file
states the content that holds it. It did not shrink by more than half, so no nuance audit was owed.

**Document checks.** Not re-run by this seat. assemble-r1 ran them on the installed base, exit 0 and PROVISIONAL: the
reference corpus is incomplete in this checkout (captures, research/patreon, research/devlogs, research/ftg-docs and
research/external are missing).

## 4. Issues

27 issues: 0 blocker, 9 major, 18 minor. Owners: determinism 17, scope 4, V09 2, V11 1, rendering 1, model 1, pipeline 1.

| id | severity | kind | owner |
|---|---|---|---|
| VDC0-27 | minor | CONFLICT | determinism |
| VDC0-33 | minor | CONFLICT | determinism |
| G122-determinism | major | F-MISSING | determinism |
| G123-determinism | major | F-MISSING | determinism |
| G124-determinism | major | F-MISSING | determinism |
| G125-determinism | major | F-MISSING | determinism |
| VDC1-01 | major | CONFLICT | determinism |
| VDC1-02 | minor | CONFLICT | determinism |
| VDC1-03 | minor | WIRING | determinism |
| VDC1-04 | minor | CONFLICT | determinism |
| VDC1-05 | minor | WIRING | determinism |
| VDC1-06 | minor | WIRING | determinism |
| VDC1-07 | minor | WIRING | determinism |
| VDC1-08 | minor | BROKEN-REFERENCE | determinism |
| VDC1-09 | minor | BROKEN-REFERENCE | determinism |
| VDC1-10 | minor | NEW-PROBLEM | determinism |
| VDC1-11 | major | CONFLICT | V11 |
| VDC1-12 | major | EDGE-UNDEFINED | determinism |
| VDC1-13 | minor | WIRING | V09 |
| VDC1-14 | minor | WIRING | V09 |
| VDC1-15 | minor | WIRING | rendering |
| VDC1-16 | minor | CONFLICT | scope |
| VDC1-17 | major | CONFLICT | scope |
| VDC1-18 | major | EDGE-UNTESTED | scope |
| VDC1-19 | minor | CONFLICT | scope |
| VDC1-20 | minor | WIRING | model |
| VDC1-21 | minor | WIRING | pipeline |

### VDC0-27 — minor — CONFLICT — owner: determinism

**Claim.** Fixed in part, and in one clause wrongly. F-CUT, F-CORRIDOR, F-PLOT, F-OUTLINE, F-SKELETON and F-REDERIVE now name the codes and causes the kernel routes to them (base l.8768-8770, l.8778, l.8787, l.8793). But F-RIVER's detection cell (l.8771) now reads 'descent stalls in a sink (`E_NO_PATH`, with the closest reached point, §3.1)', while §3.1 (kernel; VK0-11 landed the same round) routes `E_NO_PATH` to F-ROUTE alone (l.3309: `'E_NO_PATH' // with the closest reached point [F-ROUTE]`), and §4.2 S1 traces a river's course by steepest descent, never by the path search. The cell names a code the stage never receives, and contradicts §3.1. The kernel's repair file records this as its cross-unit note 1.

**Required change.** In §5.2 F-RIVER's detection cell, delete the parenthesis after 'descent stalls in a sink' so the cell reads 'descent stalls in a sink; the carve would exceed `carveMaxCm`; …'. VDC0-27's other clauses stand as written.

### VDC0-33 — minor — CONFLICT — owner: determinism

**Claim.** Not fixed. The owner, determinism, wrote '=== RULING REQUEST VDC0-33 ===' (requested INVALID; repair-r1-determinism.md l.2693-2711), and assemble-r1 skipped it. The live facts it cites, for the adjudicator: §7.7 item 1 now enumerates no paths (VAH-02); scope's restated J-A73.06 (base l.21342; rationale Part A l.791) no longer says §7.7 item 1 lists the field; V08 §2.4 now maps `previousGovernments[].tick` to `receipts` (l.629) and ignores every other field of each entry (l.657). The finding stays OPEN for the adjudicator's ruling.

**Required change.** As round 0: add to §7.7 item 1's never-read list '`powerStructure.previousGovernments` (beyond its entries' `tick`, which §4.11's dating rungs read; J-A73.06)' (ruling requested by determinism: see repair-r1-determinism.md).

### G122-determinism — major — F-MISSING — owner: determinism

**Claim.** g item 122 (crisis looks; J135) routes to determinism '§7.7 (the derivation row: every stressor type and condition archetype → its look kind or "no look"; knowledge admission of a condition)' (canon.md, dated ruling 'File g items 121, 122 and 123 routed'). §5-§7 hold no crisis or stressor text and no such row: §7.7's derivation table ends at DR43, and `ConditionOverlay` appears only as a staged record (l.11536). No round-1 repair carried item 122.

**Required change.** Add to §7.7's derivation table a row numbered by ID-DR after DR43: 'crisis looks (item 122: a look only, never in the model or its hash)'. Inputs: the `ConditionOverlay`s standing in the view's week (§2.7: archetype, severity, `sinceWeek`, `untilWeek`), the carried stressor and condition facts through V08's closed mapping, a calamity's `targets`, the view's year position (DR42), the tier, and the dossier's force and group headcounts where given (item 122 (h)). Rule: every SettlementForge stressor type and condition archetype maps to exactly one look kind, or 'no look', by §10.2's crisis look table (siege, mass immigration, disease, famine, beast attack, raiders, disaster, occupation, rebellion, boom, bust; the regional_* pressures no look). A look is drawn while the view's week lies inside its condition's weeks, scaled by severity and tier, or by headcount where the dossier gives it. A condition the viewer's key withholds is not drawn (§11.2's knowledge admission). The aftermath reaches the model only through the epoch path (V06's hazard phase and growth). Chance: `render.instances` (view draws keyed by the condition's id and the place, §8.10). Bar: the same document hashes identically with crises on and off and in every week; each look shows exactly in its condition's weeks; every type and archetype has its row. List the row in item 10's DR-range sentence.

### G123-determinism — major — F-MISSING — owner: determinism

**Claim.** g item 123 (a ruined building's plans damaged, never redrawn; J136) routes to determinism '§6.3 (one keyed threshold per plan element by lineage and element id; no new ids; monotone in the decay level)'. §6.3 (l.9359-9593) and §6.1's registry hold no damage threshold, decay level or plan-element key. No round-1 repair carried item 123.

**Required change.** In §6.3, add the plan-damage rule. Each plan element of a building — a wall run, floor area, door, window, stair, roof bay over a room, or furniture piece — draws ONE threshold in [0, 1], keyed by the building's lineage with the element's id as the creation index (epoch component 0, never re-drawn). The element shows damaged when the building's decay level (0–1, V06, from its existence state and years since abandonment) passes its threshold. Damage is therefore monotone in the level (a higher level's damage ⊇ a lower's), never relocated, and leaves in reverse order when restoration lowers the level. No room, wall, opening or element gains or loses an id (V03 §2.2's identity). Register its concern in §6.1's table (e.g. `plan.damage`, cap 0, geometry-free, non-rerollable by salt) with its readers (§2.6 step 7's damage layer, V03, §8.6).

### G124-determinism — major — F-MISSING — owner: determinism

**Claim.** g item 124 (intermittent light weather; J137) routes to determinism '§6.1 (the view-only, session-seeded weather stream, replayable from seed and clock, never touching the model's streams)'. §6.1 (l.8984-9190) has no weather stream: its registry lists no weather concern, and its view draws (`STAGE_VIEW`) are all keyed from the document. No round-1 repair carried item 124.

**Required change.** In §6.1, add the weather stream: a view-only concern (e.g. `view.weather`, on `STAGE_VIEW`), seeded per session from a session seed and keyed by the clock (the spell index since the session's start). It is never mixed with the document's seed key or any model stream, never read by a stage, and never in a digest, a tile key or an export. It is replayable from (session seed, clock), so tests replay a timeline (item 124 (b), (i)). Register its row in the concern table with its reader (§8.2 and §8.4's effects layer), and state that the existing `weather` view key (the seasonal cover) draws nothing from it.

### G125-determinism — major — F-MISSING — owner: determinism

**Claim.** g item 125 (the dossier is the port's only data input; J139; routed by canon.md's last dated ruling 'File g item 122 (h)–(i) and item 125 routed', filed after this seat's brief) routes to determinism '§7.7 (DR1, DR3, DR19, DR29 and DR42 re-sourced to the dossier or the generator's fallback)'. These rows still read host inputs. DR1 reads the realm cell's terrain, river and coast (l.11584). DR3 reads the realm partners (l.11586). DR19 reads the realm cell's resources (l.11602). DR29 reads the realm block's `cell.latDeg` (l.11612). DR42 reads `HostContext.week` (l.11625). §7.7 item 10's input order still puts 'a host's optional input when present (`HostContext`, §14)' first (l.11569-11570), and item 1 still describes the optional realm block as an input (l.11438-11441).

**Required change.** Re-source per item 125 (a)-(b). DR1, DR3, DR19 and DR29 drop the realm block. Each reads the dossier's field where the dossier carries it, else the generator's own default or the user's setting (the latitude, the realm placement, the neighbours' bearings and the deposits' bearings), the fallback reported. DR42's week is the dossier's latest stamped tick (its conditions' `triggeredAt`, its calamities' and history's ticks), else the user's season control (standalone midsummer); its climate is the dossier's terrain type through the biome rules. §7.7 item 10's input order becomes 'the dossier's, then the blueprint's own'. In item 1, the realm-block sentence and the `HostContext` optional inputs are restated as view commands, not inputs (item 125 (c)), save where the canon keeps one.

### VDC1-01 — major — CONFLICT — owner: determinism

**Claim.** E-07's table-edit row, new this round (VAH-11), refuses 'an `editTable` … changing a stamped owner-rule cell (V11 §3.2.1 step 4)' with `refuse.table.ownerRule` (base l.10151). The live V11 §4.1, repaired in parallel (VV1112-04), states the opposite (l.4540-4543): 'the one owner rule a table edit can meet is item 110 (b)'s rung gate …; a stamped cell is edited like any cell — its stamp binds calibration runs, fallbacks and corpus packs, never a user's edit'. V11 §4.1 also adds a refusal E-07 lacks (l.4543-4549; J-V11.113): a row delete of a schema's `defaultRow`, of an `allowFallback` target, or of the only row a `TotalityRule` requires, or a delete that empties a non-`mayEmpty` table, is refused as a dangling reference (`refuse.table.required`). E-07 claims to be 'the one home of every refusal, conflict and bend cause'. V11's repair file hands both changes to determinism (repair-r1-V11.md l.107-109).

**Required change.** In §7.1's outcome table, rewrite the table-edit row as: '| an `editTable` setting a `raisedWays` row below CITY (item 110 (b)'s rung gate), or carrying a dangling `ref` or a type error (V11 §4.1) | refused F-EDIT, naming the rule | for the rung gate, declaring the raised way (T4 `road`'s Raised mode); none for the others | `refuse.table.rung`, `refuse.table.invalid` |'. This drops the stamped-cell clause and `refuse.table.ownerRule`, since a stamped cell is a user's to edit (V11 §4.1). Then add: '| a row `delete` (an `editTable` or a pack's patch) of a row readers fall back to — a schema's `defaultRow`, an `allowFallback` target, the only row a `TotalityRule` requires — or one leaving empty a table not `mayEmpty` (V11 §4.1; J-V11.113) | refused F-EDIT as a dangling reference, naming the readers | edit its cells | `refuse.table.required` |'.

### VDC1-02 — minor — CONFLICT — owner: determinism

**Claim.** E-07's lead, widened this round (l.10108-10110), reads 'A declaration is **refused** only where it contradicts a dossier fact or a lock (item 101 R2), or where an availability gate stops it — an assignment's bounds, a dependent later change, the role, a staged layer, the rung (J-VI.4, J-VI.30); every other infeasible declaration is **bent**'. But the table's own rows refuse on grounds outside that list. A host provider past §2.9's cap is refused (`refuse.host.cap`). A table edit carrying a dangling `ref` or a type error is refused (`refuse.table.invalid`, and V11 §4.1's required-row delete, VDC1-01). An `editTable` on `clerk.ops` from a document layer is refused (`refuse.clerk.opsDevice`). §6.1 now refuses an `epoch` past the epoch cap (l.9047-9048). Read literally, the lead makes each of these a bend.

**Required change.** Extend the lead: '… or where an availability gate stops it — an assignment's bounds, a dependent later change, the role, a staged layer, the rung (J-VI.4, J-VI.30) —, or where the input has no lawful form to bend to — a table edit's dangling reference, type error or required row (V11 §4.1), a host provider's output past §2.9's cap, an edit of a device-only table (V10 §2.10), an `epoch` past §6.1's epoch cap; every other infeasible declaration is **bent** …'.

### VDC1-03 — minor — WIRING — owner: determinism

**Claim.** §6.1's new epoch bound (l.9047-9048: 'live epochs run 1 … 2³¹ − 1, a bound no log reaches: an `epoch` that would pass it is refused at its dry run, naming the cap') introduces a dry-run refusal with no row in E-07 (the one home of every refusal; l.10106) and no catalogue key (V09 §4.9). The F-EDIT row (§5.2) reaches only E-07's causes.

**Required change.** Add to §7.1's outcome table: '| an `epoch` whose number would pass 2³¹ − 1 (§6.1's epoch component) | refused | naming the cap; nothing commits | `refuse.epoch.cap` |'. V09 §4.9 adds the key's row (see VDC1-14).

### VDC1-04 — minor — CONFLICT — owner: determinism

**Claim.** *The returned kinds* (new; l.10159-10161) assigns the `unlock` action by key: '`unlock` — the lock rows (`refuse.locked`, `refuse.water`, `refuse.warp`)'. But `refuse.water` also keys a second, non-lock row, 'new water reaching a reservation (§7.3 (b) 3) | conflict | Re-derive from S3 | `refuse.water`' (l.10117), so the sentence gives the reservation conflict an `unlock` action. V09's `refuse.water` words (V09 l.1926: 'The new water would reach {thing}, which is kept. Unlock it …') fit only the lock case. One key carries two causes with different actions.

**Required change.** Give the reservation row its own key — '| new water reaching a reservation (§7.3 (b) 3) | conflict | Re-derive from S3 | `refuse.water.reservation` |' — and write in *The returned kinds* '`unlock` — the first row (a map event meeting a lock or pin; its keys `refuse.locked`, `refuse.water`, `refuse.warp`), its `target` the blocking entity'. V09 §4.9 adds the new key's row (see VDC1-14).

### VDC1-05 — minor — WIRING — owner: determinism

**Claim.** §11.2's conflict member is now `{ status: 'conflict'; outcome: MsgRef /* the row of §7.1's dry-run outcome table: its key … */; actions: ConflictAction[] }` (rendering's VAT-06, l.15129-15130), and *The returned kinds* separates the outcome's key from the `ConflictAction`s, each with its own `msg`. §5.2's F-EDIT action cell (l.8792) still reads 'the action that table gives the cause, as a `MsgRef` …', merging the outcome key and the actions into one MsgRef. Rendering's repair hands this cell to determinism (repair-r1-rendering.md §3).

**Required change.** F-EDIT's action cell: 'the outcome's catalogue key with its arguments (`ApplyResult.outcome`, a `MsgRef` whose address slots render per caller, V09 §4.9, §11.2) and the actions that table gives the cause (`ConflictAction`s, each with its own `MsgRef`; §7.1's *The returned kinds*), so a filtered result never carries a withheld name; decided by §7.7's precedence order; never silently resolved'.

### VDC1-06 — minor — WIRING — owner: determinism

**Claim.** Three gaps remain around the `raised.reason` concern in §6.1, of VDC0-23–VDC0-25's class. (a) The registry row (l.9144) says 'one uniform per `RaisedReasonKey` (V06 §2.13)', but the type is declared at §2.7 since this round (l.2228: 'declared here, V06 §2.13 cites it'). The model's and V06's repair files both hand this pointer to determinism. (b) The stage list (l.9009) still calls EVO_RAISED's gate draws 'the base's raised-way stream's' without the concern id. (c) The row's 'keyed by — and read by' cell omits a reader §2.7 names: the support step's open-or-vault draw per span, 'one uniform on `raised.reason` (§6.1) keyed by (the way's lineage, `a`, `b`)' (l.2474-2475).

**Required change.** §6.1: (a) in the `raised.reason` row write 'one uniform per `RaisedReasonKey` (§2.7)'; (b) in the stage list write '`EVO_RAISED` (the `raisedWays` phase's stage; its gate draws are `raised.reason`'s, keyed by the reason key, V06 §3.16)'; (c) add to the row '; a span's open-or-vault draw, keyed by (the way's lineage, the span's stations `a`, `b`) (§2.7's support step (3))'.

### VDC1-07 — minor — WIRING — owner: determinism

**Claim.** §5.4's `stages[].warnings` comment (l.8905) names as the stage warning codes only 'the underground's, V04 §1b.1 (item 338)'. Pipeline's repair this round added three base stage warnings that cite §5.4 as their report home: S3's `W_WALLED_BY_BARRIERS` (l.5241) and `W_MOAT_DRY` (l.5278), and S10b's `W_DOSSIER_EDGE` (l.6783). Its repair file asks determinism to list them (repair-r1-pipeline.md, hand-offs). The comment's enumeration of whose codes the record holds is now incomplete.

**Required change.** §5.4's comment: '/* a stage's own non-kernel warning codes — S3's `W_WALLED_BY_BARRIERS` and `W_MOAT_DRY` (§4.2 S3), S10b's `W_DOSSIER_EDGE` (§4.7 S10b) and the underground's (V04 §1b.1; item 338) */'.

### VDC1-08 — minor — BROKEN-REFERENCE — owner: determinism

**Claim.** Two volume ranges in the replaced subsections end on a bare section number. Under G-cite a bare `§x` reads as the base's, and the base has §3.6 and §3.10 (kernel sections): F-VOID's class cell '[II.7.5, II.7.6; V04 §3.5–§3.6]' (l.8786) and DR27's rule cell 'V05 §3.2–§3.10' (l.11610). assemble-r1 lists both among the ambiguous-form references for the verifier to confirm or prefix (ambiguous-refs.tsv). VDC0-18's fix applied the prefixed form to the same pattern ('V05 §3.7–V05 §3.10').

**Required change.** Write 'V04 §3.5–V04 §3.6' in F-VOID's class cell and 'V05 §3.2–V05 §3.10' in DR27's rule cell.

### VDC1-09 — minor — BROKEN-REFERENCE — owner: determinism

**Claim.** F-CUT (l.8768) cites '§4.6 step 8 (a)'s area bound' and '§4.6 step 8 (a)'s bars on 10⁵ random concave and holed faces'. In §4.6, step 8 (a) is the turned-frame rung (l.6291-6293). The area bound ('only for faces ≤ 2 × the band's upper block area') is rung (d)'s (l.6310-6311). The bars VDC0-01's fix restored sit in step 8's closing sentence '**Bars (F-CUT, M0 (b); §5.2 cites them):** …' (l.6314-6315). The archive's F-CUT row stated the bound inline, so the misdirection was introduced by the rewrite.

**Required change.** In F-CUT write 'only for faces within §4.6 step 8 (d)'s area bound' and '§4.6 step 8's *Bars* on 10⁵ random concave and holed faces (the kernel-call bound; the face count never decreasing; the residue band per district)'.

### VDC1-10 — minor — NEW-PROBLEM — owner: determinism

**Claim.** §7.7 item 1 (l.11435-11437), new this round, narrates how the text evolved, against principle (5): 'The owner's rules made two formerly ignored parts inputs: the defence readiness … and the traditions …'.

**Required change.** Write: 'Two parts are read by the owner's rules: the defence readiness (`defenseProfile.readiness` alone; item 114, V08 §3.16 (2)) and the traditions with the custom-content traditions bucket (item 118, V08 §3.16 (5)).'

### VDC1-11 — major — CONFLICT — owner: V11

**Claim.** Lifecycle disagreement on regenerate for item 114's condition. §7.4's new wearWall / repairWall row (l.10744) says the condition is 'held by the run's knot profile (§2.2 rule 5): … a re-derivation never re-derives a condition'. §2.2 rule 5's *Regenerate* carries a stretch-state profile's knots over a re-derivation by lattice point. §6.1's `walls.condition` and DR41 lay the condition at generation only ('S3's and S7's generation-time condition'). V11 §2.10's lifecycle row for the `walls.condition` cells (V11 l.827) instead says 'the generation-time condition re-derives with its enceinte (§7.7's row)', so the two homes disagree on what a re-derivation, or a table edit followed by one, does to an unedited run's condition. Precedence (principle (3)): the base's homes (§2.2 rule 5, §7.4, DR41) over a volume's restatement.

**Required change.** V11 §2.10's row for item 114's `walls.condition` cells and `walls.patchMaterials` rows: replace 'the generation-time condition re-derives with its enceinte (§7.7's row)' by 'the generation-time condition is laid with its enceinte at generation (§7.7's DR41) and carried through every re-derivation by its knot profile (§2.2 rule 5; §7.4's wearWall / repairWall row), so a cell edit reaches a new generation and the epochs that read the cells in force'.

### VDC1-12 — major — EDGE-UNDEFINED — owner: determinism

**Claim.** §7.7's new precedence text (l.11366-11382; VEL0-01) meets a dossier population fall by letting the leaving households leave 'locked and pinned dwellings too' (buildings). It also says 'A lock on anything else the event touches is honoured, the event applied around it'. Households can themselves be locked or pinned (§7.1's people-and-households row: `lock` with paths, `pin`), and V06 §3.1's protection keeps a locked or pinned entity from being 'struck, converted or moved'. A fall that the unlocked households cannot meet — every remaining household locked or pinned — has no defined outcome: either the dossier's population (item 8 (f), 'the population is the dossier's') is not met, or a lock is broken without a rule. The fixture covers locked dwellings only. Combination: a dossier population fall × household locks (an edit pinned against a dossier change, principle (11)).

**Required change.** In §7.7's precedence, after the dwelling sentence, add: 'Where the unlocked households cannot meet the fall, the leaving households are taken from locked and pinned households too, in the roster's suffix order (§4.11), each lock or pin reported orphaned in the epoch's disruption report (`why`: the dossier's population; item 8 (f)) and kept in the log as history — the population is the dossier's.' Add to the fixtures: 'a dossier population fall over a town whose remaining households are all locked — the population met within the roster tolerance, every superseded lock reported'.

### VDC1-13 — minor — WIRING — owner: V09

**Claim.** §5.4's new `GenerationReport.recipe` (l.8902, VM-R0S-24) names its reader: '/* the recipe line, read by V09's Report panel */' (with l.8949-8951). V09 §5.7's Report panel (V09 l.3525-3535) shows 'What you asked for', 'Couldn't place', the dossier sections, 'What moved', 'What its past left' and 'Details' (ladder uses, kernel warnings, timings). It has no recipe line. V09 shows the preset only in the advanced panel's head, read from `Recipe.presetId` directly (`info.recipe.preset`, V09 l.2105, l.2498). The report's recipe line has a producer and no consumer.

**Required change.** V09 §5.7's Report: show the recipe line — 'Made from seed {seed} at {rung}' and, when present, the preset (`info.recipe.preset`) — from `GenerationReport.recipe` (§5.4), in Details or under the head, and name it in V09 §1b's wiring row for §5.4.

### VDC1-14 — minor — WIRING — owner: V09

**Claim.** V09 §4.9's catalogue disagrees with the outcomes now stated in V11 §4.1 and with §7.1 once VDC1-01 lands. It keeps `refuse.table.ownerRule` (V09 l.1945: 'a stamped owner-rule cell'), although V11 §4.1 now says a stamped cell is edited like any cell (VV1112-04). It has no row for V11 §4.1's `refuse.table.required` (the required-row delete, J-V11.113). V11's repair file hands both to V09 (repair-r1-V11.md l.110-111). V09 l.746 still turns a `reroute` `ConflictAction` into 'the draft through its `at`', a kind §7.1's *The returned kinds* says no row returns (see VDC1-15).

**Required change.** V09 §4.9: withdraw the `refuse.table.ownerRule` row. Add `refuse.table.required` with V09's words (for instance '{row} is what {readers} fall back to; edit its cells instead.'), button `button.showWhy`. Add the rows for the keys §7.1 adds under VDC1-03 (`refuse.epoch.cap`) and VDC1-04 (`refuse.water.reservation`, its action the Re-derive from S3). Drop l.746's '`reroute` the draft through its `at`' clause, and §8's PLAUSIBLE note on `reroute`, with §11.2's kind (VDC1-15).

### VDC1-15 — minor — WIRING — owner: rendering

**Claim.** §11.2's `ConflictAction.kind` (l.15133) still includes 'reroute'. §7.1's *The returned kinds*, new this round (l.10159-10167; 'the one statement'), ends 'No row returns `reroute`: a route is bent, never refused'. The enumeration member has no producer. Determinism's repair file hands this to rendering ('retire it or name its row'), and V09 lists 'that no engine path emits a `reroute` `ConflictAction`' as PLAUSIBLE.

**Required change.** §11.2: `type ConflictAction = { kind: 'moveTo'|'unlock'|'unassign'|'stale'|'invalid'; … }` — `reroute` retired (no row of §7.1's outcome table returns it; a route is bent).

### VDC1-16 — minor — CONFLICT — owner: scope

**Claim.** §6.1 now widens the epoch component to u32 and keys replay epochs `0x8000_0000 + r`, 'the upper half of the u32 range' (l.8996, l.9049; VEL0-06). The judgment index row J-A113.61 (base l.21356) and its Part A entry (rationale l.805) still say '`0x8000 + r`, the u16 range's upper half'. Determinism's repair file hands this to scope, and scope's repair did not apply it.

**Required change.** J-A113.61, index row: 'the history replay keys its coarse epochs with the epoch component `0x8000_0000 + r`, the u32 range's upper half (live epochs 1 … 2³¹ − 1), so no replay draw equals a live epoch's | §6.1'. Part A: 'Chose the replay's coarse-epoch component `0x8000_0000 + r` over a separate stage-id family, because the replay runs the same stages and concerns as a live epoch and the u32 range's upper half keeps its draws apart.'

### VDC1-17 — major — CONFLICT — owner: scope

**Claim.** §7.4's *Replay semantics* now makes every event of the port's session `host:port` — dossier events, `dossierFacts`, `dossierRecord` and the port's epochs, whether or not an epoch carried a dossier change — no undo, redo or revert target (VEL0-05; l.10714-10724). §7.7 item 3's lapse text reads 'an undo of a lapsing epoch outside the port's session `host:port` restores the hold'. §13.2 still asserts the old rule in three places. T20-2 (l.16667-16670): 'an undo of a lapsing epoch that carried no dossier event restores the hold', false for a port year-end epoch with no dossier change. T20-6 (l.16675): 'a `revert` of it skips every later dossier event (`EditBase.dossier` set)' and 'an `undo` naming an epoch that carried a dossier event in `EpochInputs.dossier` returns F-EDIT'. §7.7's new fixtures cite '§13.2's T20 group' (a dossier rename on a locked name path; `ruined` and `removed` on an institution whose building is locked; a population fall over locked dwellings), and §7.4's '*Fixture (B-EDIT, §13.2)*' names a port year-end epoch's undo, but neither group lists them. Determinism's repair file hands these to scope.

**Required change.** §13.2: T20-2's undo clause reads '… and an undo of a lapsing epoch outside the port's session `host:port` restores the hold, while an `undo` naming a lapsing event of session `host:port` (a dossier event, or a port epoch whether or not it carried a dossier change) returns F-EDIT (§7.4)'. T20-6 reads '… a `revert` of it skips every later event of session `host:port` that placed or re-designated it …' and '… an `undo` naming an epoch of session `host:port` — one that carried a dossier event in `EpochInputs.dossier`, and a year-end epoch that carried none — returns F-EDIT and changes nothing (§7.4)'. The T20 group gains §7.7's precedence fixtures: a dossier rename on a locked name path, and a `ruined` and a `removed` state on an institution whose building is locked, each landing with the lock reported orphaned and every other locked entity byte-identical; and a dossier population fall over a town whose remaining households all live in locked dwellings, the population met within the roster tolerance and every locked building's state and shell byte-identical.

### VDC1-18 — major — EDGE-UNTESTED — owner: scope

**Claim.** §5.3's wall-crossing row, rewritten this round (VEW-17; l.8860), names its tests as '§13.2's fixtures: a refounded village's tracker crossing a breach with 0 violations, and a TOWN epoch beside a breached run growing no way through it'. §13.2 holds neither (its item-114 group T114-1 – T114-8, l.17161-17176, and the rest of §13.2 name no tracker, refounding or breach-crossing fixture). V07's T-V7-59 checks only that the village 'crosses the ruined wall only at gate gaps and breaches', not §5.3's invariant at the base rungs. The edge (a way × a breached or dismantled run, at the base rungs and the village rungs) is defined but has no test at the cited home.

**Required change.** §13.2's item-114 group gains: '(T114-9) a way crosses an enceinte only at a gate or an opening of item 114: a refounded village's tracker crossing a ruined former enceinte at a `breached` run and at a gate gap commits with 0 violations of §5.3's wall-crossing row (V07's T-V7-59 runs it on the village path); a TOWN epoch beside a `breached` run grows no way through the breach (§5.3; §4.4 S5c's legality)', and the head names §5.3.

### VDC1-19 — minor — CONFLICT — owner: scope

**Claim.** §7.7's precedence now states 'A dossier event is never refused by a lock or a pin …; a dossier event that changes it supersedes it', and limits J-DET-11's 'sends an unlock first' to 'A host's map event (no `EditBase.dossier`)' (l.11364-11366; VEL0-01). Part A still records the unlimited form. J-DET-11 (rationale l.111): '… a host that must override a lock sends an unlock first, which the log records'. J-A20.71 (rationale l.327) argues dossier existence's place 'while J-DET-11 already makes a host unlock before it overrides a lock'. Determinism's repair file asked scope to limit J-DET-11 to map events, and scope's repair did not.

**Required change.** Rationale Part A J-DET-11: '…; a host's map event that must override a lock sends an unlock first, which the log records, while a dossier event is never refused by a lock — it supersedes a lock on what it changes, the lock reported orphaned (§7.7's precedence; items 20, 22).' J-A20.71: '… while J-DET-11 makes a host's map event unlock before it overrides a lock (a dossier event supersedes the locks on what it changes, §7.7) …'.

### VDC1-20 — minor — WIRING — owner: model

**Claim.** §7.4's regenerate row (new this round, VDC0-14) gives `Household.tableVersion` a writer: 'a `people` scope re-derives the chosen households' people under the current person tables (`Household.tableVersion` advanced)' (l.10745). The field's home still reads 'tableVersion: string /* person tables at creation */' (§2.7, l.2296). The writer is unnamed at the home, and the comment contradicts it.

**Required change.** §2.7 `Household.tableVersion`: '/* the person tables its people derive under: those current at the household's creation, advanced by a `regenerate` of scope `people` (§10.3's re-derive people; §7.4) */'.

### VDC1-21 — minor — WIRING — owner: pipeline

**Claim.** §10.3 (l.14701-14705) defines a person as a function 'of the person tables current when its household was created (`Household.tableVersion`)'. §7.4 now advances `Household.tableVersion` by the re-derive people action (the scope `people`; l.10745), which §10.3 itself names as the way existing people change. Read literally, §10.3 forbids that write.

**Required change.** §10.3: '… and of the person tables its household's `tableVersion` names (those current at its creation, advanced only by the re-derive people action below, §7.4)'.

## 5. Result

Saved as `docs/validation/coherence/results/coherence_verify-determinism-r1t.json` (key `coherence/verify-determinism-r1t`,
this file, the 27 issues above). The round-0 ids that persist keep their ids (VDC0-27, VDC0-33). New findings carry the r1
marker (VDC1-nn) or the brief's g-item form (G122-determinism – G125-determinism).

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed and read):** the pre-round and live sha256 values; the 13 replaced subsections and the 4 untouched
ones (`cmp`); each of the 86 diff hunks read with its targets; the 36 round-0 verdicts; the 33 former never-read paths found in
V08 §2.4; the 67 layer-table tokens found in the binding; the 43 E-07 keys found in V09; the retired-term, deferral and
narration scans; the canon's dated rulings for items 114–125; every hand-off line of the 18 repair preambles that touches
§5–§7; each cited line of §4 re-read in the live files.
**PLAUSIBLE:** the severity of VDC1-11 (a lifecycle disagreement whose observable effect needs a re-derivation that
re-runs S3 or S7, or a table edit followed by one), and the exact concern names proposed for G123 and G124
(`plan.damage`, `view.weather`). Those names are proposals; the repair seat names the concerns.
