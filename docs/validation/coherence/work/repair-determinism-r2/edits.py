# edits.py — lane coherence/repair-determinism-r2. Each E(head, old, new, *ids): `old` occurs exactly once in the live
# subsection `head` (asserted by gen.py); the block is the subsection with every substitution applied.

# ───────────────────────────── §5.2 ─────────────────────────────
E(H52,
  "only for faces within §4.6 step 8 (a)'s area bound | §4.6 step 8 (a)'s bars on 10⁵ random concave and holed faces "
  "(the kernel-call bound; the face count never decreasing; the residue band per district);",
  "only for faces within §4.6 step 8 (d)'s area bound | §4.6 step 8's *Bars* on 10⁵ random concave and holed faces "
  "(the kernel-call bound; the face count never decreasing; the residue band per district);",
  'VDC1-09', 'VPC-R1-19')
E(H52,
  "descent stalls in a sink (`E_NO_PATH`, with the closest reached point, §3.1);",
  "descent stalls in a sink (§4.2 S1 (3));",
  'VDC0-27', 'VKr1-01')
E(H52,
  "[II.7.5, II.7.6; V04 §3.5–§3.6]",
  "[II.7.5, II.7.6; V04 §3.5–V04 §3.6]",
  'VDC1-08')
E(H52,
  "| the action that table gives the cause, as a `MsgRef` (a catalogue key with arguments whose address slots render per "
  "caller, V09 §4.9, §11.2) so a filtered result never carries a withheld name; decided by §7.7's precedence order; never "
  "silently resolved |",
  "| the outcome's catalogue key with its arguments (`ApplyResult.outcome`, a `MsgRef` whose address slots render per "
  "caller, V09 §4.9, §11.2) and the actions that table gives the cause (`ConflictAction`s, each with its own `MsgRef`; "
  "§7.1's *The returned kinds*), so a filtered result never carries a withheld name; decided by §7.7's precedence order; "
  "never silently resolved |",
  'VDC1-05')

# ───────────────────────────── §5.3 ─────────────────────────────
E(H53,
  "(`Household.transit`, V06 §2.1)",
  "(`Household.transit`, §2.7)",
  'VM-R1T-11')
E(H53,
  "| capacity: `Building.households ≤ capacity(b)` (§2.6's one capacity function) after every committed change "
  "(J-A28.23, J-A28.46) |",
  "| capacity: `Building.households` within §2.6's bounds — 1 ≤ households ≤ capacity(b) for a residential building, 0 "
  "only for a `vacant` one and for a locked or pinned dwelling a dossier population fall emptied (§7.7's precedence), 0 "
  "for a non-residential one — (§2.6's one capacity function and its clamp) after every committed change (J-A28.23, "
  "J-A28.46) |",
  'R2-18 (a) (VEL1-01, its §5.3 end)')
E(H53,
  "| the capacity function recomputed on the touched buildings against `Building.households` |",
  "| the capacity function recomputed on the touched buildings against `Building.households`; a residential building "
  "at 0 is `vacant`, or locked or pinned (§7.7's precedence) |",
  'R2-18 (a) (VEL1-01, its §5.3 end)')

# ───────────────────────────── §5.4 ─────────────────────────────
E(H54,
  "warnings?: Record<string, number> /* a stage's own non-kernel warning codes — the underground's, V04 §1b.1 (item 338) */;",
  "warnings?: Record<string, number> /* a stage's own non-kernel warning codes — S3's `W_WALLED_BY_BARRIERS` and "
  "`W_MOAT_DRY` (§4.2 S3), S10b's `W_DOSSIER_EDGE` (§4.7 S10b) and the underground's (V04 §1b.1; item 338) */;",
  'VDC1-07')

# ───────────────────────────── §6.1 ─────────────────────────────
E(H61,
  "its gate draws are the base's raised-way stream's, keyed by\n  the reason key, V06 §3.16)",
  "its gate draws are `raised.reason`'s, keyed by the reason\n  key, V06 §3.16)",
  'VDC1-06 (b)')
E(H61,
  "  - **epoch** — `e` for draws made by epoch e (epoch 0 is the original town; live epochs run 1 … 2³¹ − 1, a bound no\n"
  "    log reaches: an `epoch` that would pass it is refused at its dry run, naming the cap); the history replay at\n"
  "    generation keys its coarse epochs r = 1 … R with `0x8000_0000 + r`, the upper half of the u32 range reserved to it,\n"
  "    so no replay draw can equal a live epoch's (g item 113; below);",
  "  - **epoch** — `e` for draws made by epoch e (epoch 0 is the original town; live epochs run 1 … 2³¹ − 1, a bound no\n"
  "    log reaches: an `epoch` that would pass it is refused at its dry run, naming the cap — `refuse.epoch.cap`, §7.1);\n"
  "    the history replay at generation keys its coarse epochs r = 1 … R with `0x8000_0000 + r`, the upper half of the\n"
  "    u32 range reserved to it, so no replay draw can equal a live epoch's (g item 113; below). On a document generated\n"
  "    from its history the live epochs are numbered 1, 2, … after the creation prefix, whatever its length R, so a\n"
  "    Re-derive that replays a corrected history keeps every live epoch's keys; a replay epoch r records\n"
  "    `0x8000_0000 + r` as its epoch number wherever the model records one — §6.3's creation epoch in the lineage key,\n"
  "    `LifecycleEvent.epoch` and `Lifecycle.since.epoch` (§2.8), `EpochRecord.epoch` (§2.9), §2.7's `conditionEpoch` and\n"
  "    V06 §2.11's index. A rule that orders by epoch compares the epochs' weeks (an `EpochRecord`'s week, its\n"
  "    `inputs.week`, §4.11), never their numbers, so every replay epoch precedes every live epoch;",
  'VAT0-07 (R2-20)', 'VDC1-03')
E(H61,
  "| `gate.pick` | default | S3's gate picks (§4.2 S3 (7)); a trade partner's bearing where the dossier gives none "
  "(§7.7 layer 2, item 77),",
  "| `gate.pick` | default | S3's gate picks (§4.2 S3 (7)); a trade partner's bearing where the blueprint gives none "
  "(§7.7 layer 2, item 77; no host input gives one, item 125 (b)),",
  'G125-determinism (R2-40 (3))')
E(H61,
  "a listed deposit's bearing where the dossier gives none (DR19; item 88, staged), its binding key hashed as the "
  "derivation unit",
  "a listed deposit's bearing, which no input gives (DR19; item 88, staged; item 125 (b)), its binding key hashed as the "
  "derivation unit",
  'G125-determinism (R2-40 (3))')
E(H61,
  "one uniform per `RaisedReasonKey` (V06 §2.13) with epoch component 0, in the kind order aqueduct, viaduct, elevated — "
  "the gate `u < p` at every generation and epoch, the same draw each time, never re-drawn; a raised part's pier pitch "
  "where no `spanSpacingCm` is edited, keyed by the way's lineage; V06's `EVO_RAISED` phase draws its gates here |",
  "one uniform per `RaisedReasonKey` (§2.7) with epoch component 0, in the kind order aqueduct, viaduct, elevated — the "
  "gate `u < p` at every generation and epoch, the same draw each time, never re-drawn; a raised part's pier pitch where "
  "no `spanSpacingCm` is edited, keyed by (the way's lineage, `pitch`) (§2.7's support step (1)); a span's open-or-vault "
  "draw, keyed by (the way's lineage, the span's stations `a`, `b`) (§2.7's span rule (3)); V06's `EVO_RAISED` phase "
  "draws its gates here |",
  'VDC1-06 (a), (c)', 'VM-R1T-11')
E(H61,
  "whose replay gives the condition (V06 §3.7.7 (5)) |\n",
  "whose replay gives the condition (V06 §3.7.7 (5)) |\n"
  "| `plan.damage` | 0 | geometry-free; non-rerollable by salt; epoch component 0. Item 123's damage thresholds (§6.3 "
  "*Plan damage*): one uniform per plan element, keyed by (the building's lineage, the element's id) at the stage id of "
  "the building's `plan.*` concerns, no rung counter, reroll or salt entering — fixed for the element's life, never "
  "re-drawn; read wherever a plan is drawn at a decay level: §2.6 step 7's damage layer, V03 (the plan's drawing per "
  "state, its exports, the panel lines), V02 (the exterior), V04 (cellars, crypts and underground buildings), §8.6 and "
  "§11.1 |\n"
  "| `view.weather` | 0 | view only; non-rerollable. The weather timeline (item 124; *The weather stream*, below): keyed "
  "from the session seed by the spell index, never from the seed key; read by §8.4's per-frame weather layer and §8.2's "
  "effect marks, which §8.8 places above the tiles — never by a stage, a digest, a tile key or an export |\n",
  'G123-determinism (R2-38 (2))', 'G124-determinism (R2-39 (d))')
E(H61,
  "which a warp or a vertex move carries with\n  the ground (§7.4).\n",
  "which a warp or a vertex move carries with\n  the ground (§7.4).\n"
  "* **The weather stream** (g item 124; J137). The weather effects' timeline (item 124 (b)) is the one stream not keyed\n"
  "  from the document: it draws on `view.weather` (the registry) from a **session seed** — a u32 the app takes from the\n"
  "  platform's random source, outside the model packages (§6.5 (3)), once when a map is opened, holds in session state\n"
  "  and never saves: never in the document, a link, the log or an export; a test fixes it. Spell i's entity key is the\n"
  "  four 32-bit-lane finalisers (as for the seed key) over (the session seed, i), its stream key the one mixer's round\n"
  "  with `STAGE_VIEW`, `view.weather` and reroll, attempt, epoch and salt 0; its uniforms draw, in order, the clear gap\n"
  "  before it, its kind by the climate row's weather columns for the week band of §2.9's `yearWeek` (V11) and its length\n"
  "  inside that column's range. A spell's kind and length are fixed when it starts, so a change of the year position or\n"
  "  of the climate row takes effect from the next spell. **Start a shower now** (V09) starts a spell of the season's\n"
  "  commonest kind at once as the next spell index, its length drawn there, the press held in session state; switching\n"
  "  the effects off draws nothing and stops no clock. The timeline is therefore a pure function of (the session seed,\n"
  "  the view's time since the map opened, the climate row and year position in force, the presses), and a test that\n"
  "  fixes them replays it exactly (T124-9; §6.5 (9)). No stage, model stream, digest, tile key or export reads it, and\n"
  "  it reads none; the `weather` view key — the seasonal cover (§2.9) — draws nothing from it; item 124 (c)'s two hard\n"
  "  rules (no snow, falling or lying, where winter does not freeze; rain rare in arid country) are the climate columns'\n"
  "  (V11) and §8.2's, never a draw's.\n",
  'G124-determinism (R2-39 (d), R2-35 T124-9)')

# ───────────────────────────── §6.3 ─────────────────────────────
E(H63,
  "* **Dossier bindings never re-key (item 74).**",
  "* **Plan damage — one threshold per plan element, no new id (g item 123; J136).** Each element of a building's plan\n"
  "  — each wall run (an outer wall or a partition), floor area, door, window, stair, roof bay over a room and furniture\n"
  "  piece, and below ground the cellar's and the crypt's kinds (V04) — draws ONE uniform u on `plan.damage` (§6.1),\n"
  "  keyed by (the building's lineage — an underground building's own; a cellar's or crypt's element the building\n"
  "  above's —, the element's id): the id's parts — its element kind and V03 §2.2's plan-part id (`wall:`, `op:`,\n"
  "  `win:`, `core:`, `furn:`), a floor area and the roof bay over a room by their room's address — folded into the key\n"
  "  through the one mixer as structured components, never a string, with creation epoch and epoch component 0 and no\n"
  "  rung counter, reroll or salt, at the stage id of the building's `plan.*` concerns (§6.1). Its **threshold** is\n"
  "  t = lo + u · (hi − lo), [lo, hi] its element kind's range by material (V11's rows: outer walls and ground floors\n"
  "  late, partitions and upper floors early; item 123 (c)). It is a fixed-key draw (§6.1) in all but persistence: fixed\n"
  "  for the element's life, never re-drawn, minting no id and moving nothing, and compared, wherever a reader draws the\n"
  "  plan, with the building's **decay level** (V06's `decayLevel`, derived and never stored; §2.6 step 7): the element\n"
  "  shows damaged exactly while the level is above 0 and at least t — a level of 0 damages nothing, so a building never\n"
  "  decayed draws its plan unchanged (`item123.damage`) whatever its kinds' ranges. Damage is therefore monotone in the\n"
  "  level (a higher level's damaged set contains a lower's), never relocated, and leaves in reverse threshold order as a\n"
  "  restoration lowers the level. Every room, wall, opening and id is the intact plan's (T123-1), and the same element\n"
  "  breaks at the same level for a seed on every engine (T123-3; §6.5 (9)). An element a stored plan's re-cut mints\n"
  "  (V03 §3.11) draws by its own new id; a kept element keeps its id and so its threshold.\n"
  "* **Dossier bindings never re-key (item 74).**",
  'G123-determinism (R2-38 (2), R2-35 T123-3)')

# ───────────────────────────── §6.5 ─────────────────────────────
E(H65,
  "key draws none of which equals a replay epoch's (`0x8000_0000 + r`): §6.1's distinct-key test over both\n"
  "     ranges;",
  "key draws none of which equals a replay epoch's (`0x8000_0000 + r`): §6.1's distinct-key test over both\n"
  "     ranges, the live epochs numbered from 1 after the prefix whatever R, and no lineage key a replay epoch mints\n"
  "     equal to one a live epoch mints (§6.1's epoch component);",
  'VAT0-07 (R2-20)')
E(H65,
  "     its render key and the view's time (§8.4);\n",
  "     its render key and the view's time (§8.4);\n"
  "   * *plan damage* (g item 123) — for every building of a B-CITY-lite fixture, its decay level stepped from 0 to 1,\n"
  "     the damaged elements at each level are byte-identical on the five engines and a superset of the previous\n"
  "     level's, each element breaking at the same level for a seed (T123-3); every element id equals the intact plan's\n"
  "     (T123-1), and a level of 0 draws the plan byte-identically (`item123.damage`; §6.3 *Plan damage*);\n"
  "   * *weather timeline* (g item 124) — a fixed session seed, view time and set of **Start a shower now** presses\n"
  "     replay the same spells — kind, start and length — on the five engines (T124-9); two session seeds give\n"
  "     byte-identical model digests and tiles, with the effects on and off (§6.1 *The weather stream*);\n",
  'G123-determinism (R2-35 T123-3)', 'G124-determinism (R2-35 T124-9)')

# ───────────────────────────── §7.1 ─────────────────────────────
E(H71,
  "**The dry run's outcomes** (E-07; the one home of every refusal, conflict and bend cause; §5.2's F-EDIT row cites it).\n"
  "A declaration is **refused** only where it contradicts a dossier fact or a lock (item 101 R2), or where an availability\n"
  "gate stops it — an assignment's bounds, a dependent later change, the role, a staged layer, the rung (J-VI.4, J-VI.30);\n"
  "every other infeasible declaration is **bent** to the nearest lawful one, which the dry run names in one line, the former\n"
  "offer becoming the bend or its first alternative; the other rows are **conflicts** returned with their actions, or\n"
  "**confirmations**. Each outcome carries its catalogue key (V09 §4.9) as a `MsgRef` (§5.2 F-EDIT).",
  "**The dry run's outcomes** (E-07; the one home of every refusal, conflict and bend cause of a dry run; §5.2's F-EDIT\n"
  "row cites it. The gates outside a dry run — §11.1's export tier, §11.2's `advance` on a dossier-bound document (V06\n"
  "§2.3), the shell's layer gate (V09 §4.2), V09 §3.9's restore and V10 §3.16's harness and model refusals — are their own\n"
  "sections, V09 §4.9's lead naming each.) A declaration is **refused** only where it contradicts a dossier fact or a lock\n"
  "(item 101 R2), or where an availability gate stops it — an assignment's bounds, a dependent later change, the role, a\n"
  "staged layer, the rung (J-VI.4, J-VI.30) —, or where the input has no lawful form to bend to — a table edit's dangling\n"
  "reference, type error or required row (V11 §4.1), a host provider's output past §2.9's cap, an edit of a device-only\n"
  "table (V10 §2.10), an `epoch` past §6.1's epoch cap; every other infeasible declaration is **bent** to the nearest\n"
  "lawful one, which the dry run names in one line, the former offer becoming the bend or its first alternative; the\n"
  "other rows are **conflicts** returned with their actions, or **confirmations**. Each outcome carries its catalogue key\n"
  "(V09 §4.9) as a `MsgRef` (§5.2 F-EDIT).",
  'VAH-r1-06 (R2-21 (a))', 'VDC1-02 (R2-21 (b))')
E(H71,
  "| new water reaching a reservation (§7.3 (b) 3) | conflict | Re-derive from S3 | `refuse.water` |",
  "| new water reaching a reservation (§7.3 (b) 3) | conflict | Re-derive from S3 | `refuse.water.reservation` |",
  'VDC1-04 (R2-21 (c))')
E(H71,
  "| an `editTable` setting a `raisedWays` row below CITY (item 110 (b)'s rung gate), changing a stamped owner-rule cell "
  "(V11 §3.2.1 step 4), or carrying a dangling `ref` or a type error (V11 §4.1) | refused F-EDIT, naming the rule | for "
  "the rung gate, declaring the raised way (T4 `road`'s Raised mode); none for the others | `refuse.table.rung`, "
  "`refuse.table.ownerRule`, `refuse.table.invalid` |",
  "| an `editTable` setting a `raisedWays` row below CITY (item 110 (b)'s rung gate), or carrying a dangling `ref` or a "
  "type error (V11 §4.1) | refused F-EDIT, naming the rule | for the rung gate, declaring the raised way (T4 `road`'s "
  "Raised mode); none for the others | `refuse.table.rung`, `refuse.table.invalid` |\n"
  "| an `editTable` row `delete`, or a pack's patch, removing a row readers fall back to — the schema's `defaultRow`, a "
  "`TotalityRule.allowFallback` target, the only row covering a value a totality rule requires, or the last row of a "
  "table not `mayEmpty` (V11 §4.1; J-V11.113); a pack's such op is refused at load, the row standing (V11 §3.2.3) | "
  "refused F-EDIT, naming the readers | editing the row's cells | `refuse.table.required` |",
  'VDC1-01 (R2-21 (c))', 'VEL1-03 (R2-21 (c))')
E(H71,
  "| \"keep the old model\", the one resolution | `refuse.upgrade.packCap` |\n",
  "| \"keep the old model\", the one resolution | `refuse.upgrade.packCap` |\n"
  "| an `epoch` whose number would pass 2³¹ − 1 (§6.1's epoch component) | refused | naming the cap; nothing commits | "
  "`refuse.epoch.cap` |\n",
  'VDC1-03 (R2-21 (c))')
E(H71,
  "`unlock` — the lock rows (`refuse.locked`,\n`refuse.water`, `refuse.warp`), its `target` the blocking entity;",
  "`unlock` — the rows whose action is the\nblocking lock: the first row (a map event meeting a lock or pin; its keys `refuse.locked`, `refuse.water`,\n"
  "`refuse.warp`), a declaration meeting a lock and a capacity re-homing held by locked or pinned households (both\n"
  "`refuse.locked`) — its `target` the blocking entity;",
  'VDC1-04 (R2-21 (c))')

# ───────────────────────────── §7.4 ─────────────────────────────
E(H74,
  "a rung change is a Re-derive from S0 and a population `adjust` one from S2, each under the lock cell's rule",
  "a rung change is a Re-derive from S0 and a population `adjust` one from the population control's consuming stage "
  "(§7.8: the earliest stage that reads it — at the latest S1, which lays the frame from the frame law, §4.1's S1 row), "
  "each under the lock cell's rule",
  'VKr1-06 (R2-24)')

# ───────────────────────────── §7.7 ─────────────────────────────
# layer 2: the week and the trade partners' bearings (item 125)
E(H77,
  "week, which for a dossier-bound map is the host's campaign week (item 76) — that *schedules* epoch events",
  "week (*The clock*; item 76) — on a dossier-bound map the dossier's own weeks, its present week the dossier's latest\n"
  "   stamped tick (item 125) — that *schedules* epoch events",
  'G125-determinism (R2-40 (1))')
E(H77,
  "**Bearing**: the realm block's true\n"
  "     bearing when the host sends one (`source: 'realm'`); else a draw on `gate.pick` (§6.1), uniform over the arc the site\n"
  "     admits for its mode — open water for `sea`, the river's upstream and downstream reaches for `river`, the land arc for\n"
  "     `road` — so a partner's bearing never moves when unrelated facts change.",
  "**Bearing**: the user's setting\n"
  "     where the blueprint gives the partner one (a standalone partner's requested bearing); else a draw on `gate.pick`\n"
  "     (§6.1), uniform over the arc the site admits for its mode — open water for `sea`, the river's upstream and\n"
  "     downstream reaches for `river`, the land arc for `road` — so a partner's bearing never moves when unrelated facts\n"
  "     change; no host input gives one (item 125 (b)).",
  'G125-determinism (R2-40 (3): DR3)')
E(H77,
  " **North first**: when true bearings arrive for a map drawn on derived ones, the port first turns\n"
  "     the geo anchor's `bearingDeg` (§11.1) to fit the derived gates to them — no geometry moves — and moves gates or\n"
  "     roads only for the residual, as a dossier event under §7.7 item 5's least-disruption budget (J-A77.72).",
  " No input sends a true bearing after creation (item 125 (a)):\n"
  "     a partner's bearing changes only by the user's edit, and the geo anchor's `bearingDeg` (§11.1) is the user's to set.",
  'G125-determinism (R2-40 (2)–(3): the realm block retired)')
E(H77,
  "relationship?: string /* the dossier's word for the neighbour relation */; source: 'dossier'|'derived'|'realm' }",
  "relationship?: string /* the dossier's word for the neighbour relation */;\n"
  "  source: 'dossier'|'derived' /* an older schema's stored 'realm' reads 'dossier', its bearing kept (§7.5's schema chain; item 125) */ }",
  'G125-determinism (R2-40 (2))')
# precedence: a fall the unlocked households cannot meet; the fixture line (R2-18 (b), (d))
E(H77,
  "and every locked path — counted `uses.heldByProtection` in the epoch's report; the population is the dossier's (item 8 (f)).\n"
  "*Fixtures (B-DOSSIER-lite, §13.2's T20 group):* a dossier rename on a locked name path, and a `ruined` and a `removed`\n"
  "state on an institution whose building is locked — each lands, the lock reported orphaned, every other locked entity\n"
  "byte-identical; a dossier population fall over a town whose remaining households all live in locked dwellings — the\n"
  "population met within the roster tolerance, every locked building's state and shell byte-identical.",
  "and every locked path — counted `uses.heldByProtection` in the epoch's report. Where the unlocked households cannot\n"
  "meet the fall, the leaving households are taken from locked and pinned households too, in the roster's suffix order\n"
  "(§4.11), each lock or pin reported orphaned in the epoch's disruption report (`why`: the dossier's population) and kept\n"
  "in the log as history: the population is the dossier's (item 8 (f)).\n"
  "*Fixtures (B-DOSSIER-lite, §13.2's T20-14 – T20-16):* a dossier rename on a locked name path, and a `ruined` and a\n"
  "`removed` state on an institution whose building is locked — each lands, the lock reported orphaned, every other locked\n"
  "entity byte-identical (T20-14); a dossier population fall over a town whose remaining households all live in locked\n"
  "dwellings — the population met within the roster tolerance, every locked building's state and shell byte-identical,\n"
  "the emptied ones counted in `uses.heldByProtection`, no `vacate` emitted on a locked or pinned building (T20-15); a\n"
  "fall over a town whose remaining households are all locked — met within the roster tolerance, every superseded\n"
  "household lock reported orphaned (T20-16).",
  'VDC1-12 (R2-18 (b), (d))')
# item 1: no host data input; the custom library through the dossier only; VDC1-10; the realm block
E(H77,
  "   and the doors (§11.4) and the port declare OPTIONAL inputs they use when present (`HostContext`, §14), never a\n"
  "   required one beyond what the dossier holds today (J-A20.79). The port reads a custom institution's dossier record —\n"
  "   `source: 'custom'`, its `localUid`, category, tags, description, `required` and scene tokens — and, when the host\n"
  "   supplies them, the library's definition fields as such optional inputs (`HostContext.customLibrary`; item 104 (a)\n"
  "   (5)). **What the port never reads** (item 86; J-A86.71), by reason — the paths are V08 §2.4's field table, the",
  "   and neither the doors (§11.4) nor the port takes a data input beyond the dossier (item 125 (a); J-A20.79):\n"
  "   `HostContext` (§14) carries no fact — its `audience`, `displayNames` and `line` change no document a dossier makes —\n"
  "   and the host's view commands (a week, the layers shown, a selection; §11.2, §11.3) are commands, never inputs, which\n"
  "   the map never needs (item 125 (c)). The port reads a custom institution's dossier record — `source: 'custom'`, its\n"
  "   `localUid`, category, tags, description, `required` and scene tokens — and the library's definition fields only\n"
  "   where the dossier itself carries them, in its `customContentRoster` and `customContentProvenance` entries (item 104\n"
  "   (a) (5)'s \"when the port receives them\", received only through the dossier); without them item 104's generic\n"
  "   siting supplies what they would, the absence reported — `HostContext.customLibrary` is no input (item 125 (a),\n"
  "   (e)). **What the port never reads** (item 86; J-A86.71), by reason — the paths are V08 §2.4's field table, the",
  'G125-determinism (R2-40 (2))')
E(H77,
  "(3)). The owner's rules made two formerly ignored parts inputs: the defence readiness (`defenseProfile.readiness`\n"
  "   alone; item 114, V08 §3.16 (2)) and the traditions with the custom-content traditions bucket (item 118, V08 §3.16\n"
  "   (5)). **The closed-digest rule** (W-DOS-01a): inside a record the port reads, a field no `DossierDigest` field names is\n"
  "   not read. The optional realm block (§14) is\n"
  "   computed by the host glue from the campaign's placements of the settlement and its partners, the realm map's scale and\n"
  "   latitude scale and the frozen `spatialDigest`; the module receives only its bearings, distances, cell words and\n"
  "   latitude (item 396). The adapter reports every key it dropped (`ignored_key`, §14). The reasons: a host's own map\n",
  "(3)). Two parts are read by the owner's rules: the defence readiness (`defenseProfile.readiness` alone; item 114,\n"
  "   V08 §3.16 (2)) and the traditions with the custom-content traditions bucket (item 118, V08 §3.16 (5)). **The\n"
  "   closed-digest rule** (W-DOS-01a): inside a record the port reads, a field no `DossierDigest` field names is not\n"
  "   read. Nothing of the campaign beyond the dossier is read — its placements of the settlement and its partners, the\n"
  "   realm map, its scale and latitude scale, the frozen `spatialDigest` (item 125 (a); item 396's realm block is no\n"
  "   input): the bearings, latitude and cell words they would give are the dossier's where it carries them, else the\n"
  "   generator's defaults or the user's settings (DR1, DR3, DR19, DR29, DR42). The adapter reports every key it dropped\n"
  "   (`ignored_key`, §14). The reasons: a host's own map\n",
  'VDC1-10', 'G125-determinism (R2-40 (2))')
# item 10: the input order and the DR-range sentence
E(H77,
  "A row's inputs are read in the order written — a host's optional input when\n"
  "   present (`HostContext`, §14), then the dossier's, then the blueprint's own — and when none is present the rule's\n"
  "   default applies; a missing input never becomes a request (§7.7 item 1). Standalone, the blueprint and our own roster\n"
  "   are the inputs of every row — the same rows, so connecting a dossier changes inputs, not rules; the tests run the rows\n",
  "A row's inputs are read in the order written — the dossier's, then the\n"
  "   blueprint's own; no host input is a data input (item 125 (a)) — and when none is present the rule's default applies,\n"
  "   the generator's own choice exactly as on a map made without a dossier, reported with the fallback taken (item 125\n"
  "   (b); T125-1); a missing input never refuses, stalls or becomes a request (§7.7 item 1). Standalone, the blueprint\n"
  "   and our own roster are the inputs of every row — the same rows, so connecting a dossier changes inputs, not rules;\n"
  "   the tests run the rows\n",
  'G125-determinism (R2-40 (3))')
E(H77,
  "and DR41–DR43 the item-114, item-117 and item-118\n"
  "   rows: the walls' generation-time condition, the default view season and the festival decorations — the last two a look\n"
  "   only, never in the model or its hash.",
  "and DR41–DR44 the item-114, item-117, item-118 and\n"
  "   item-122 rows: the walls' generation-time condition, the default view season, the festival decorations and the crisis\n"
  "   looks — the last three a look only, never in the model or its hash.",
  'G122-determinism (R2-11)')
# the rows
E(H77,
  "| the realm cell's terrain, river and coast (optional); `site.terrain`, `site.access`, the water deposits, `site.culture`;",
  "| `site.terrain`, `site.access`, the water deposits, `site.culture`;",
  'G125-determinism (R2-40 (3): DR1)')
E(H77,
  "on a site whose terrain, access and realm cell give no river or canal",
  "on a site whose terrain, access and water deposits give no river or canal",
  'G125-determinism (R2-40 (3): DR1)')
E(H77,
  "| the realm gates (optional); `walls.records`,",
  "| `walls.records`,",
  'G125-determinism (item 125 (a): DR2)')
E(H77,
  "| the realm partners (optional); `economy.partners`,",
  "| `economy.partners`,",
  'G125-determinism (R2-40 (3): DR3)')
E(H77,
  "| the realm cell's resources (optional); `site.deposits`,",
  "| `site.deposits`,",
  'G125-determinism (R2-40 (3): DR19)')
E(H77,
  "V05 §3.2–§3.10",
  "V05 §3.2–V05 §3.10",
  'VDC1-08')
E(H77,
  "| the realm block's `cell.latDeg` (optional); `site.culture` through `tables/dossier/cultures`; else 50° N | the port "
  "writes it into `Intent.latitudeDeg` at creation; a latitude that arrives or changes later is a `port-values` change "
  "carried into the next epoch's slice (`PortValues.latitudeDeg`); V05's model sampler",
  "| `site.culture` through `tables/dossier/cultures`; else 50° N, the generator's default (item 125 (b)) | the port "
  "writes it into `Intent.latitudeDeg` at creation, a map fact the user may edit (§7.7 item 9); a later `site.culture` "
  "change is reported (`frozen_fact_changed`, V08 §3.5), never re-derived; V05's model sampler",
  'G125-determinism (R2-40 (3): DR29)')
E(H77,
  "the realm cell's river (DR1);",
  "the river DR1 gives;",
  'G125-determinism (item 125 (a): DR34)')
E(H77,
  "| `HostContext.week` (the campaign's `calendar.elapsedWeeks`, §14); the `calendar` row (`sf445`); the climate: "
  "`site.climate` (SettlementForge's climate word through the `climates` row), else the `climates` row's terrain column "
  "for `site.terrain`, else the blueprint's choice; S0's relief class | §2.9's view state: under its \"follow "
  "SettlementForge\" flag the year position is `week mod 52` on the `sf445` year (52 weeks, 13-week seasons from "
  "spring); with no week the view keeps its own position, midsummer by default;",
  "| the present week — the dossier's own latest stamped tick, the greatest of its conditions' `triggeredAt`, its "
  "calamities' and its history's ticks (§2.9's *The week's source*; §4.11 *The clock* (1); item 125); the `calendar` row "
  "(`sf445`); the climate: the `climates` row's terrain column for `site.terrain` (item 125 (b)), else the blueprint's "
  "choice; S0's relief class | §2.9's view state: under its \"follow SettlementForge\" flag the year position is the "
  "present week mod 52 on the `sf445` year (52 weeks, 13-week seasons from spring); with no stamped tick, and standalone, "
  "the view keeps the user's season control, midsummer (week 19) by default (item 125 (b));",
  'G125-determinism (R2-40 (1), (3): DR42)')
E(H77,
  "a later climate word is reported (`frozen_fact_changed`, V08 §3.5), never re-drawn |",
  "a later `site.terrain` word is reported (`frozen_fact_changed`, V08 §3.5), never re-drawn |",
  'G125-determinism (R2-40 (3): DR42)')
E(H77,
  "| a dossier map opens on its campaign's week;",
  "| a dossier map opens on its dossier's latest stamped week, one with no stamped tick on the user's season (midsummer by "
  "default);",
  'G125-determinism (R2-40 (3): DR42)')
E(H77,
  "| no festival changes a digest; a festival shows exactly in its weeks |\n",
  "| no festival changes a digest; a festival shows exactly in its weeks |\n"
  "| DR44 | the crisis looks (item 122, with (h)–(i): a look only, never in the model or its hash; the item-122 row) | the "
  "`ConditionOverlay`s standing in the view (§2.7: archetype, severity, `sinceWeek`, `untilWeek`; a stressor, a "
  "condition or a simulator event as V08 carries it) — §2.9's `week` in [`sinceWeek`, `untilWeek`), or from `sinceWeek` "
  "on while the overlay stands where it has no `untilWeek`, never the year position; a calamity's `targets` "
  "(`calamityHistory[]`); the forces', coalitions' and travelling groups' headcounts where the dossier gives them, else "
  "the condition's or calamity's own counts (`exodus`, arrivals) (item 122 (h); V08); the map's rung | each standing "
  "overlay → its `map` row (§10.2's `RosterTables.crisis`: the `stressor`, `archetype` or `event` row of its source — "
  "every SettlementForge stressor type and condition archetype at the pinned baseline has exactly one, a look kind or "
  "`none`, the regional_* pressures `none`; a source with no row reads `none`, reported `unmapped_word`, V08) → its look "
  "row → its scale at the rung by severity, or by headcount at `areaPerHeadM2` where the dossier gives one, placed by "
  "§10.2's *Crisis looks* (c)–(f) and drawn by §8.2's look rows under §2.9's `crises` key (`off` none; `preview` one look "
  "at `previewSeverity` with no condition); knowledge admission at the viewer's effective key (§9.2's admission "
  "function, §11.2): a withheld condition is never drawn, listed, counted or named; what a crisis leaves reaches the "
  "model only through the epoch path (DR28's calamity in `EpochInputs.events`, the population target; V06's "
  "hand-over); standalone no condition exists and none is invented — only a preview draws | `render.instances` (view "
  "draws only: §8.10's render keys from the seed, the condition's id and the place, a preview keyed on its look kind; "
  "never a model stream) | the same document hashes identically with crises on and off and in every week (T122-1); each "
  "look shows exactly in its condition's weeks (T122-2); every SettlementForge stressor type and condition archetype at "
  "the baseline has its `map` row (T122-4) |\n",
  'G122-determinism (R2-37 (3), R2-11)')

# ───────────────────────────── §6.2 ─────────────────────────────
E(H62,
  "  never stored, logged or hashed (item 68), and an underlay image (§9.5, item 101) is view state the model never reads.\n",
  "  never stored, logged or hashed (item 68), and an underlay image (§9.5, item 101) is view state the model never reads;\n"
  "* no session seed — the weather timeline's (§6.1 *The weather stream*) feeds only the view's effects layer, never the\n"
  "  model, a tile or an export (item 124).\n",
  'G124-determinism (R2-39 (d))')
E(H62,
  "two renders of one model are pixel-identical at a given\nbackend, DPR and style version.",
  "two renders of one model are pixel-identical at a given\nbackend, DPR and style version — every tile and export; the "
  "weather effects drawn over the tiles follow the session's own\nstream (§6.1) and a light's flicker the view's time (§8.4).",
  'G124-determinism (R2-39 (d))')
