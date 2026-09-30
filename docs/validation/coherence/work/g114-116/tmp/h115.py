# The program's correction (work/g114-115/program-correction.md) and the harmonizing edits applied to item 115.
import sys
src, dst = sys.argv[1], sys.argv[2]
t = open(src, encoding='utf-8').read()
i115 = t.index('\n115. **OWNER RULE')
a, b = t[:i115], t[i115:]
R = []
def r(label, old, new):
    R.append((label, old, new))

# ---- header and times
r('115 title and times',
  "115. **OWNER RULE — Floating islands at the first generation need both high magic and a high economy (owner, 2026-09-30\n     ~00:54–00:56; J127).** Owner: \"and only high magic on the slider allows for floating islands in the initial\n     generation.\", then, replacing it: \"actually floating islands has to have both high magic and high economy\" — and \"bundle\n     these into the rewrite phase\".",
  "115. **OWNER RULE — Floating islands at the first generation need both high magic and a high economy (owner, 2026-09-30\n     ~00:55, replaced ~00:58; J127).** Owner (~00:55): \"and only high magic on the slider allows for floating islands in the\n     initial generation.\", then (~00:58), replacing it: \"actually floating islands has to have both high magic and high\n     economy\" — and (~01:00) \"bundle these into the rewrite phase\"; (~01:12, with item 116) \"bundle all this with g114-115\".\n     High magic is read on the magic slider, as the owner said it (the program's correction of 2026-09-30,\n     docs/validation/coherence/work/g114-115/program-correction.md).")

r('115 what SF gives: the sliders at the census',
  "SettlementForge's own map profile\n     reads `magicLevel`, `priorityMagic` and `magicExists` (CONFIRMED); the economy slider of item 114; no banding of either\n     slider (NOT ESTABLISHED).",
  "SettlementForge's own map profile\n     reads `config.magicLevel`, `config.priorityMagic` and `config.magicExists` (CONFIRMED), so that the resolved `config`\n     carries `magicExists` is PLAUSIBLE (its census city lists 23 keys without it); the 152 census dossiers generated without\n     setting a slider sit at `priorityMagic` 50, the three sample cards' values are not recorded (NOT ESTABLISHED); the\n     economy slider of item 114; no banding of either slider (NOT ESTABLISHED).")

# ---- (a) intro and (1) hosted
r('115 (a) intro: the magic in force and the magic priority',
  "**(a) THE MAGIC THE GATE READS — the map's one magic.** The gate reads the **magic in force**: the creation slice's\n     `CircumstanceSlice.magic` at the first generation and, at a later rising, the slice in force at that epoch — the value\n     the lights, the magic-gated classes and the access kinds read.",
  "**(a) THE MAGIC THE GATE READS — the magic slider beside the map's one magic.** The gate reads two things. The **magic\n     in force**: the creation slice's `CircumstanceSlice.magic` at the first generation and, at a later rising, the slice in\n     force at that epoch — the one magic the lights, the magic-gated classes and the access kinds read. And the **magic\n     priority**, `Intent.magicPriority?: number` — a real in [0, 100], SettlementForge's magic slider's range, stored as given,\n     absent 50 — declared in §7.7's `Intent` and recorded in `Recipe.intent`, read once per creation and carried after it as\n     item 114 (e) carries the economy priority; only the gate reads it. **High magic** is (b)'s reading of the two.")

r('115 (a) 1 hosted: the slider read, the word beside it, never without magic',
  "(1) *Hosted:* \"high magic\" is SettlementForge's own top\n     word, `config.magicLevel: 'high'`, read through V08 §2.6's `magic` row into `site.magic` and the creation slice (none →\n     none; low → low; moderate → low; medium → low; high → high). *Why:* the word is SettlementForge's own statement of its\n     world's magic, folding its toggle in; the gate then reads the one magic every other system reads; and no banding of ours\n     is invented (J121). `priorityMagic` stays on the never-read list: reading it as well would give the map two magics, and\n     its banding would be ours. *The risk, stated:* if SettlementForge resolves `magicLevel` from something other than its\n     slider, an author who sets the magic slider to its top may still get no island; the report names the source (\"magic\n     moderate — SettlementForge\"). *Vetoable alternative:* the magic clause also holds where `config.priorityMagic` ≥ 75 and\n     `magicLevel` is not `none`. A dossier whose `magicLevel` is absent",
  "(1) *Hosted:* \"high magic\" reads SettlementForge's magic\n     slider, as the owner said it, with SettlementForge's own word beside it. The port reads the resolved\n     `config.priorityMagic` into `DossierDigest.settlement.magicPriority?: number`, clamped to [0, 100] (noted\n     `value_clamped`), absent where the dossier carries none or a non-number (noted `value_absent`, read 50), and the port's\n     creation half writes it into `Recipe.intent.magicPriority` as item 114 (a) 1 writes the economy priority — one of the\n     settlement's own facts, carried in `Document.dossier` on no entity, dossier-owned exactly when the creation's absorb\n     carried a value. It reads SettlementForge's resolved word, `config.magicLevel`, through V08 §2.6's `magic` row into\n     `site.magic` and the creation slice (none → none; low → low; moderate → low; medium → low; high → high), and where\n     `config.magicExists` is false the row gives `none` whatever the word; `_config` (raw sentinels, SettlementForge's secret)\n     stays unread. *Why:* the owner named the slider (\"high magic on the slider\"); SettlementForge's own `high` states that\n     its world's magic is high whatever its slider; a world SettlementForge states without magic has none, and nothing floats\n     there (item 20 (h)); and the one threshold on the slider is (b)'s. `priorityMagic` leaves §7.7 item 1's never-read list,\n     read once at creation (item 114 (g)). The report names both values and their source (\"magic moderate, slider 50 —\n     SettlementForge\"). A dossier whose `magicLevel` is absent")

r('115 (a) 1: refusals and later values for the priority too',
  "and an `adjust` of\n     it is refused `dossier-owned` (§7.7 item 11's \"a slice value the dossier supplied\"). The site is creation's (V08 §2.7;\n     W-DOS-08): a later `magicLevel` is compared by V08 §3.5's `site` row, which writes one `frozen_fact_changed` note and\n     moves nothing — so V05 §4.4's wane at a later dossier `none` is withdrawn.",
  "and an `adjust` of\n     it, or of a dossier-supplied magic priority, is refused `dossier-owned` (§7.7 item 11's \"a slice value the dossier\n     supplied\", and item 114's refusal for a priority). The site is creation's (V08 §2.7; W-DOS-08): a later `magicLevel` or\n     `magicExists` is compared by V08 §3.5's `site` row and a later `priorityMagic` by its settlement row, each writing one\n     `frozen_fact_changed` note and moving nothing — so V05 §4.4's wane at a later dossier `none` is withdrawn.")

# ---- (a) 2 standalone
r('115 (a) 2 standalone: the Magic slider with its switch',
  "(2) *Standalone:* a new advanced-panel\n     control **Magic** — None · Low · High, the model's words, default None (D-3) — registry id `circumstances.magic` (the\n     timeline's first entry), consuming stage S2 (V11 §3.5's magic-gated classes), locality *re-derive from S2*, discrete,\n     anchor II.6; it sits in the advanced panel's \"Programme\" group (V09 §4.14 groups by consuming stage) and the Islands\n     control links to it by `button.magicHigh`; it emits `adjust('circumstances.magic', v)`, which §7.1's T1 row binds; where\n     the dossier supplied the word it is shown locked. *This departs from SettlementForge's magic slider (0–100, default 50)\n     and its toggle:* D-3 keeps magic `none` by default (SettlementForge's default reads low), and banding a slider into\n     none, low and high would invent cuts SettlementForge never recorded; the control offers SettlementForge's resolved words\n     instead, and the owner's \"on the slider\" is SettlementForge's slider on a hosted map. The clerk's `IntendInput.magic`\n     already encodes it; V12's `Level.magic?: 'none'|'low'|'high'` sets it for a level.",
  "(2) *Standalone:* a new advanced-panel\n     control **Magic**, mirroring SettlementForge's magic slider and its `magicExists`: a 0–100 slider, the magic priority\n     (label \"Magic\", step 1, default 50, high at 75 or more), with a switch **No magic in this world**, on by default (D-3).\n     The switch is the creation slice's magic: on, `none`; off, the word the slider reads — `high` at a magic priority of 75\n     or more, else `low` (a §7.7 layer 1 derivation row) — so the lights, the magic-gated classes, the access kinds and the\n     gate read one magic. Its registry rows (§7.8): `intent.magicPriority` (consuming stage S2, V11 §3.5's magic-gated\n     classes; locality *re-derive from S2*; stepped — its one step at 75 a declared owner step, reported, outside the sweep;\n     anchor II.6) and `circumstances.magic`, the switch (the timeline's first entry; S2; *re-derive from S2*; discrete). It\n     sits in the advanced panel's \"Programme\" group (V09 §4.14 groups by consuming stage) and the Islands control links to it\n     by `button.magicHigh`. The slider emits `adjust('intent.magicPriority', v)` and, where the world has magic and the word\n     it reads changes, `adjust('circumstances.magic', w)` in the same `group` (one undo step); the switch emits\n     `adjust('circumstances.magic', 'none')`, or, turned off, the slider's word; §7.1's T1 row binds both. A word set\n     otherwise — a level's, the clerk's, an older document's, a later timeline entry's — stands until the control next moves.\n     Where the dossier supplied them both parts are shown locked. *This follows SettlementForge's magic slider and toggle,\n     with one departure:* D-3 keeps a standalone world without magic by default (SettlementForge's default reads low), so\n     the switch starts on and the one-click town is unchanged; the slider's high at 75 is (b)'s pick. Surprise me leaves\n     the magic priority absent and the world's magic untouched: magic is a circumstance, and Surprise me draws intent only\n     (item 116 (c)'s reason). The clerk's `IntendInput.magic` and `IntendInput.magicPriority` encode it (V10); V12's\n     `Level.intent.magicPriority?` and `Level.magic?: 'none'|'low'|'high'` set a level's.")

# ---- (b) HIGH
r('115 (b): high magic defined',
  "**(b) \"HIGH\".** *Magic:* the word `high`, exactly. *Economy:* item 114's economy priority ≥ **75**, inclusive, on\n     SettlementForge's 0–100 scale, comparing the stored value (absent 50). *Why 75 (the program's pick, vetoable):*\n     SettlementForge records no banding of its sliders; \"high\" must lie above the default 50, since a default settlement is\n     not high; it must lie where item 114's prosperity ceiling is already the top band (≥ 50), so an island town is never\n     capped; and 75 is the upper half of the range above the default, a round, neutral cut.",
  "**(b) \"HIGH\".** *Magic:* **high magic** holds where magic exists — the magic in force is not `none` — and either the\n     magic priority is at or above **75**, inclusive, on SettlementForge's 0–100 scale (the stored value, absent 50), or the\n     magic in force is the word `high`; never where magic does not exist. *Economy:* item 114's economy priority ≥ **75**,\n     inclusive, on the same scale, comparing the stored value (absent 50). *Why 75 (the program's pick, vetoable), on both\n     sliders:* SettlementForge records no banding of its sliders; \"high\" must lie above the default 50, since a default\n     settlement is not high, and 75 is the upper half of the range above the default, a round, neutral cut, the same on both;\n     for the economy it also lies where item 114's prosperity ceiling is already the top band (≥ 50), so an island town is\n     never capped.")

r('115 (b): the cells',
  "*The cells:* `IslandRule.gate: {\n     magic: ('none'|'low'|'high')[] /* the words that let an island rise: ['high'] */; economyMin: number /* 75, inclusive */\n     }` on both rung rows of `islands.json` (V05 §2.4, `IslandRule`'s declaring home). `gate.magic` carries `ownerRule:\n     '115'` — the owner's \"high magic\"; `economyMin` carries provenance `own` and `calibratable: false` (\"no corpus measures\n     a slider\"): the owner fixed the two conjunctive clauses and the word high, not 75, and V12 §1 lists the rule. The\n     economy clause reads the slider's value — never the field, `S_town` or item 114's prosperity ceiling; the magic clause\n     reads the magic in force — never the deposits (the node term stays the supply law's).",
  "*The cells:* `IslandRule.gate: {\n     magic: ('low'|'high')[] /* the words that make magic high: ['high'] */; magicMin: number /* 75, inclusive: the magic\n     slider's high */; economyMin: number /* 75, inclusive */ }` on both rung rows of `islands.json` (V05 §2.4, `IslandRule`'s\n     declaring home). `gate.magic` carries `ownerRule: '115 (b)'` — the owner's \"high magic\"; `magicMin` and `economyMin`\n     carry provenance `own` and `calibratable: false` (\"no corpus measures a slider\"): the owner fixed the two conjunctive\n     clauses, the magic slider and the word high, not 75, and V12 §1 lists the rule. The economy clause reads the slider's\n     value — never the field, `S_town` or item 114's prosperity ceiling; the magic clause reads the magic priority and the\n     magic in force — never the deposits (the node term stays the supply law's).")

r('115 (b): limits',
  "*The cells at their limits* (V11's compiler, T-V11-2): an empty `gate.magic` raises no island by rule,\n     reported; a word outside none, low and high is refused at compile (tier 1, the table's reason row); an `economyMin`\n     outside [0, 100] is clamped;",
  "*The cells at their limits* (V11's compiler, T-V11-2): an empty `gate.magic` leaves the slider's reading\n     alone, reported; a word outside low and high — `none` included, since magic that does not exist is never high — is\n     refused at compile (tier 1, the table's reason row); a `magicMin` or `economyMin` outside [0, 100] is clamped;")

# ---- (c) the gate
r('115 (c) 3: the magic clause',
  "(3) *magic* — the magic in force is among `gate.magic`;\n     (4) *economy* — `Intent.economyPriority ≥ gate.economyMin`.",
  "(3) *magic* — high magic ((b)): the magic in force is not `none`,\n     and `Intent.magicPriority ≥ gate.magicMin` or the magic in force is among `gate.magic`; (4) *economy* —\n     `Intent.economyPriority ≥ gate.economyMin`.")

r('115 (c): the record and the function',
  "*The record:*\n     `SkyGate { open: boolean; failed: { clause: 'setting'|'rung'|'magic'|'economy'; value?: string | number; source:\n     'map'|'dossier' }[] /* every failing clause, in the order above */ }`, computed by one pure function `skyGate(recipe:\n     Recipe, rung: Rung, magic: CircumstanceSlice['magic'], dossierOwned: { rung: boolean; magic: boolean; economy: boolean\n     }): SkyGate` (V05 §3.2 (1); exported by `@plat/sky`),",
  "*The record:*\n     `SkyGate { open: boolean; failed: { clause: 'setting'|'rung'|'magic'|'economy'; value?: string | number /* the magic\n     clause: the magic in force */; magicPriority?: number /* the magic clause only */; source: 'map'|'dossier' }[] /* every\n     failing clause, in the order above */ }`, computed by one pure function `skyGate(recipe: Recipe, rung: Rung, magic:\n     CircumstanceSlice['magic'], dossierOwned: { rung: boolean; magic: boolean; magicPriority: boolean; economy: boolean }):\n     SkyGate` (V05 §3.2 (1); exported by `@plat/sky`; the two priorities from `recipe.intent`) — a clause's source is\n     `'dossier'` where no map-side change can open it: for the magic clause, a world the dossier states without magic, or a\n     word and a magic priority both the dossier's —")

r('115 (c): report clause words',
  "naming each value and\n     its source (\"magic moderate — SettlementForge\"; \"economy 50 — this town\").",
  "naming each value and\n     its source (\"magic moderate, slider 50 — SettlementForge\"; \"economy 50 — this town\").")

r('115 (c): the census consequence',
  "With SettlementForge's census values no dossier city has islands at its first\n     generation, since none of the 155 is `high` (CONFIRMED) whatever its economy — the consequence of the owner's condition\n     at SettlementForge's present values; a SettlementForge city gets islands only when its magic resolves `high` and its\n     economy slider is at 75 or more.",
  "With SettlementForge's census values no dossier city generated without setting a\n     slider — 152 of the 155 — has islands at its first generation: its magic slider sits at 50 and its economy at 50, and\n     none of the 155 is `high` (CONFIRMED); the three sample cards' sliders are not recorded (NOT ESTABLISHED), so they meet\n     the gate at whatever values they carry — the consequence of the owner's condition at SettlementForge's present values. A\n     SettlementForge city gets islands only where its world has magic, its magic slider is at 75 or more or its word\n     resolves `high`, and its economy slider is at 75 or more.")

# ---- (d)
r('115 (d) 1: the two priorities recorded, the magic in force by time',
  "each\n     read the gate — the magic in force at that time and the recorded economy priority, constant after creation (item 114\n     (e)). The two differ in time because they differ in kind: magic is a circumstance of the timeline (item 68's slice,\n     which a standalone history's `trajectory.slice.magic` may change), the economy priority a creation input (item 114); on\n     a dossier map both are the creation's ((a) 1).",
  "each\n     read the gate — the magic in force at that time and the recorded magic and economy priorities, constant after creation\n     (item 114 (e)). They differ in time because they differ in kind: the magic in force is a circumstance of the timeline\n     (item 68's slice, which a standalone history's `trajectory.slice.magic` may change), the two priorities creation inputs;\n     on a dossier map all three are the creation's ((a) 1).")

r('115 (d) 3: a later change of either magic input',
  "(3) *A later change:* the economy is creation-only (item 114 (e)); a\n     dossier's later `magicLevel` is a `frozen_fact_changed` note ((a) 1); standalone, the Magic is an adjust that re-runs\n     the first generation (Re-derive from S2),",
  "(3) *A later change:* the economy is creation-only (item 114 (e)); a\n     dossier's later `priorityMagic`, `magicLevel` or `magicExists` is a `frozen_fact_changed` note ((a) 1); standalone, the\n     Magic — either part — is an adjust that re-runs the first generation (Re-derive from S2),")

r('115 (d) 5: info.islandsGated and button.magicHigh',
  "turning it on applies the\n     setting and shows `info.islandsGated` — \"Floating islands need high magic and an economy of 75 or more.\" — with\n     `button.magicHigh` (commit `event:magicHigh` = `adjust('circumstances.magic', 'high')`) and `button.economyHigh` (commit\n     `event:economyHigh` = `adjust('intent.economyPriority', 75)`), each shown only for its own failing clause;",
  "turning it on applies the\n     setting and shows `info.islandsGated` — \"Floating islands need high magic — 75 or more on the Magic — and an economy of\n     75 or more.\" — with `button.magicHigh` (commit `event:magicHigh`: the Magic control set to high magic in one `group` —\n     `adjust('circumstances.magic', 'high')` where the world has no magic, and `adjust('intent.magicPriority', 75)` where the\n     magic priority is below 75) and `button.economyHigh` (commit `event:economyHigh` = `adjust('intent.economyPriority',\n     75)`), each shown only for its own failing clause;")

r('115 (d) 5: dossier refusal words',
  "`refuse.islandsDossier.magic` \"SettlementForge sets this world's magic to {magic}; floating islands need high magic.\",\n     `refuse.islandsDossier.economy` \"SettlementForge sets this town's economy to {economy}; floating islands need an economy\n     of 75 or more.\", or `refuse.islandsDossier.both` \"SettlementForge sets this world's magic to {magic} and its economy to\n     {economy}; floating islands need high magic and an economy of 75 or more.\"",
  "`refuse.islandsDossier.magic` \"SettlementForge sets this world's magic to {magic}, its slider at {magicPriority};\n     floating islands need high magic.\", `refuse.islandsDossier.economy` \"SettlementForge sets this town's economy to\n     {economy}; floating islands need an economy of 75 or more.\", or `refuse.islandsDossier.both` \"SettlementForge sets this\n     world's magic to {magic}, its slider at {magicPriority}, and its economy to {economy}; floating islands need high magic\n     and an economy of 75 or more.\"")

r('115 (d) 9: migration reads both priorities absent',
  "(9) *Migrate:* the schema\n     chain reads the economy absent (50) and the magic as stored,",
  "(9) *Migrate:* the schema\n     chain reads the economy and magic priorities absent (50) and the magic word as stored,")

# ---- (f) edges
r('115 (f) 1: the truth table edge',
  "(1) Magic none, low and high against economy 0, 50, 74, 75 and 100 — the minimum, the default and\n     either side of the threshold: open only at high and ≥ 75 (T115-1).",
  "(1) The magic priority 0, 50, 74, 75 and 100 against the magic in force none, low and high, and the\n     economy 0, 50, 74, 75 and 100 — the minimum, the default and either side of each threshold: open only where magic exists,\n     the magic priority is ≥ 75 or the word is high, and the economy is ≥ 75 (T115-1).")

r('115 (f) 10-11: dossier values and slider changes',
  "(10) A dossier missing either value: magic `none`, editable (`value_absent`); `moderate`: low; an unknown\n     word: `none`, editable (`unmapped_word`); the economy 50, editable (T115-2). (11) A slider change after creation: (d) 3\n     (T115-3).",
  "(10) A dossier missing a value: the magic word `none`, editable (`value_absent`); `moderate`: low; an\n     unknown word: `none`, editable (`unmapped_word`); `magicExists` false: `none` whatever the word; the magic priority and\n     the economy 50, editable (`value_absent`); a priority out of range clamped (`value_clamped`) (T115-2). (11) A slider or\n     word change after creation: (d) 3 (T115-3).")

# ---- (g) bars
r('115 (g): fixture rule',
  "Every island bar runs with magic high, an economy ≥ 75 and `wealthLevel` set explicitly at its old\n     level:",
  "Every island bar runs with high magic by the slider — magic in the world and the magic priority 100,\n     whose word is `high` — an economy ≥ 75 and `wealthLevel` set explicitly at its old level:")

r('115 (g) T115-1: truth table',
  "(T115-1) The truth table: 200 CITY and 100 METROPOLIS seeds per cell of magic {none, low, high} ×\n     economy {0, 50, 74, 75, 100} with the setting on: islands only where the magic is high and the economy ≥ 75; every other\n     cell 0 islands",
  "(T115-1) The truth table: 200 CITY and 100 METROPOLIS seeds per cell, the setting on, of the magic\n     priority {0, 50, 74, 75, 100} × the magic in force {none, low, high} at economy 100, and of the economy {0, 50, 74, 75,\n     100} × the magic priority {50, 100} with the magic in force `low`: islands only where the magic in force is not `none`,\n     the magic priority is ≥ 75 or the word is `high`, and the economy is ≥ 75; every other cell 0 islands")

r('115 (g) T115-2: the dossier with the slider',
  "(T115-2) The dossier: a `medium` city at economy 90 has 0 islands, its Islands control disabled with\n     `refuse.islandsDossier.magic` and nothing requested in its report — with the setting on through a user's preset,\n     `islands_gated` naming the magic; `high` at 50 is disabled with `refuse.islandsDossier.economy`; `high` at 90 follows\n     the supply law; a dossier without `magicLevel` reads `none`, editable, noted `value_absent`; `moderate` reads low; the\n     35 births at their census values carry no island.",
  "(T115-2) The dossier (V12's derived fixtures): a `medium` city at `priorityMagic` 50 and economy 90\n     has 0 islands, its Islands control disabled with `refuse.islandsDossier.magic` and nothing requested in its report —\n     with the setting on through a user's preset, `islands_gated` naming the magic; a `medium` city at `priorityMagic` 80 and\n     economy 90 follows the supply law (the slider alone opens the magic clause); `high` at `priorityMagic` 50 and economy 90\n     follows the supply law (the word alone opens it); `high` at economy 50 is disabled with `refuse.islandsDossier.economy`;\n     a city whose `magicExists` is false at `priorityMagic` 100 and economy 90 has none, and a declared island there is\n     refused with `refuse.islandsNoMagic`; a dossier without `magicLevel` reads `none`, editable, noted `value_absent`;\n     without `priorityMagic` reads 50, noted `value_absent`; `priorityMagic` 140 reads 100, noted `value_clamped`;\n     `moderate` reads low; the 32 births at the default sliders carry no island, and each of the three sample cards meets the\n     gate at its recorded values.")

r('115 (g) T115-3: re-offer of the slider',
  "a same-id re-offer that changes `magicLevel` moves no island and reports `frozen_fact_changed`.",
  "a same-id re-offer that changes `magicLevel`, `magicExists` or `priorityMagic` moves no island and reports\n     `frozen_fact_changed`.")

r('115 (g) T115-5: derived fixture',
  "V12's derived fixture\n     `'<dossier>@magichigh@economy90'`)",
  "V12's derived fixture\n     `'<dossier>@magic100@economy90'`)")

r('115 (g) T115-6: magicHigh from a world without magic',
  "one click on each of\n     `button.magicHigh` and `button.economyHigh` opens the gate, and the ghost shows the supply law's islands.",
  "one click on each of\n     `button.magicHigh` and `button.economyHigh` opens the gate — from a world without magic, `button.magicHigh` turns magic on\n     at 75 in one undo step — and the ghost shows the supply law's islands.")

r('115 (g) T115-7: migrated priority',
  "an older\n     dossier document whose dossier lacked `magicLevel` has, after the upgrade, an editable `none`.",
  "an older\n     dossier document whose dossier lacked `magicLevel` has, after the upgrade, an editable `none` and a magic priority 50.")

r('115 (g) T115-9: the clerk sets the slider',
  "\"an opulent\n     city of high magic with floating islands\" sets the economy 90, the magic high and the setting on, and islands are\n     possible.",
  "\"an opulent\n     city of high magic with floating islands\" sets the economy 90, the magic priority 90 with magic in the world (its word\n     `high`) and the setting on, and islands are possible.")

r('115 (g) T115-10: empty gate.magic',
  "(T115-10) Each `gate` cell at its limits of (b) is refused or clamped with its reason row, and an empty\n     `gate.magic` raises no island, reported.",
  "(T115-10) Each `gate` cell at its limits of (b) is refused or clamped with its reason row; an empty\n     `gate.magic` leaves the slider's reading alone, reported, and `gate.magic` naming `none` is refused.")

# ---- (h) units
r('115 (h) header',
  "**(h) THE UNITS — applied IN the coherence pass's Rewrite phase (owner, 2026-09-30: \"bundle these into the rewrite\n     phase\"): the units whose rewrite had landed when this item was filed — the base parts model, kernel, pipeline,\n     determinism and rendering, and the volumes V03 and V04 — in a late rewrite seat where they have a part; every other unit\n     in its main rewrite. One canonical home per shared decision (STATES); every other unit cites it (REFERENCES).**",
  "**(h) THE UNITS — applied IN the coherence pass's Rewrite phase with items 114 and 116 (owner, 2026-09-30 ~01:00:\n     \"bundle these into the rewrite phase\"; ~01:12: \"bundle all this with g114-115\"): the units whose rewrite had landed\n     when this item was filed — the base parts model, kernel, pipeline, determinism and rendering, and the volumes V03 and\n     V04 — in a late rewrite seat where they have a part; every other unit in its main rewrite. One canonical home per shared\n     decision (STATES); every other unit cites it (REFERENCES); the three items' one routing is\n     docs/validation/coherence/work/g114-116/routing.json with the canon's ruling of 2026-09-30.**")

r('115 (h) model',
  "STATES §2.8's dossier-paths list gaining \"the creation slice's magic word where the dossier\n     supplied it\" beside the typed slices,",
  "STATES §2.8's dossier-paths list gaining the settlement's magic priority at creation (beside item\n     114's economy priority) and \"the creation slice's magic word where the dossier supplied it\" beside the typed slices,")

r('115 (h) determinism',
  "STATES DR27 (inputs\n     gaining `settlement.economyPriority` beside `site.magic`; bar: the gate's clauses resolved and traced to those fields or\n     to their map defaults), §7.7 item 9's list gaining the creation slice's magic word, item 11 (the setting's refusal\n     withdrawn; a declared island in a dossier-stated magic-less world refused `dossier-owned`),",
  "STATES §7.7 layer 1's\n     `Intent.magicPriority?` and the standalone magic word's derivation row ((a) 2), DR27 (inputs gaining\n     `settlement.magicPriority` and `settlement.economyPriority` beside `site.magic`; bar: the gate's clauses resolved and\n     traced to those fields or to their map defaults), §7.7 item 1's list (with item 114 (g)), item 9's list gaining the\n     magic priority and the creation slice's magic word, item 11 (the setting's refusal withdrawn; an adjust of a\n     dossier-supplied magic priority or word refused; a declared island in a dossier-stated magic-less world refused\n     `dossier-owned`),")

r('115 (h) determinism: T1 row, adjust row, 7.5, 7.8',
  "§7.1's T1 binding row gaining \"the\n     creation slice's magic (the Magic control)\", §7.4's `regenerate / adjust / re-derive from Sk` row naming the Magic (from\n     S2) and the `quarter` row's held fates, §7.5's upgrade rule (d) 9 and the optional `site.magic`, §7.8's Magic row and\n     the Islands control's states,",
  "§7.1's T1 binding row gaining \"the\n     magic priority and the creation slice's magic (the Magic control)\", §7.4's `regenerate / adjust / re-derive from Sk` row\n     naming the Magic (from S2) and the `quarter` row's held fates, §7.5's upgrade rule (d) 9, the magic priority absent 50\n     and the optional `site.magic`, §7.8's two Magic rows and the Islands control's states,")

r('115 (h) scope',
  "STATES §13.2's T115-1 – T115-10 and\n     the island bars' fixture rule (g); §14's `site.magic?`; D-3's sentence (\"floating islands … only at CITY and METROPOLIS;\n     at the first generation — and, by the program's reading of item 115, at every later rising — only with high magic and an\n     economy of 75 or more; and only where prosperity supplies them\"); §1.2's default (the Magic None); §0.2's row 115\n     (principal home II.6); the judgment index's J-A115.41 – J-A115.51; §16's placement (the gate at M6-sky, the port's\n     reading at M-SF).",
  "STATES §13.2's T115-1 – T115-10 and\n     the island bars' fixture rule (g); §14's `settlement.magicPriority?` and `site.magic?`; D-3's sentence (\"floating\n     islands … only at CITY and METROPOLIS; at the first generation — and, by the program's reading of item 115, at every\n     later rising — only with high magic (the magic slider at 75 or more, or the world's magic `high`, never in a world\n     without magic) and an economy of 75 or more; and only where prosperity supplies them\"); §1.2's default (the Magic at 50,\n     no magic in the world); §0.2's row 115 (principal home II.6); the judgment index's J-A115.41 – J-A115.46 and J-A115.71 –\n     J-A115.75 (titles in the canon's ruling of 2026-09-30); §16's placement (the gate and the Magic control at M6-sky, the\n     port's reading at M-SF).")

r('115 (h) V05 cells',
  "`IslandRule.gate` and its defaults in\n     §2.4 with §2.6's lifecycle row,",
  "`IslandRule.gate` and its defaults (`['high']`,\n     `magicMin` 75, `economyMin` 75) in §2.4 with §2.6's lifecycle row,")

r('115 (h) V05 references, material supply',
  "§8's P0 run with the gate held; REFERENCES II.6 and item 114 (e).",
  "§8's P0 run with the gate held; REFERENCES II.6 and item 114 (e); item 116's island parts (the landfall credit, the\n     island buildings on the material supply) sit beside these in V05 and leave the gate unchanged.")

r('115 (h) V08',
  "*V08:* STATES the `magic` row (moderate → low; an absent or unmapped word carries\n     no `site.magic`), the carried site fact's `magic?` under W-DOS-08's `site` row, the census effect ((c)'s last sentence),\n     DR27's input, the host frame's locked Magic; REFERENCES T115-2.",
  "*V08:* STATES the adapter row `config.priorityMagic` →\n     `settlement.magicPriority` (range, clamp, absent) beside item 114's, the `magic` row (moderate → low; `magicExists` false\n     → none; an absent or unmapped word carries no `site.magic`), the carried settlement fact's `magicPriority?` under the\n     settlement diff row and the carried site fact's `magic?` under W-DOS-08's `site` row (a later value: one\n     `frozen_fact_changed` note), T-V8-20's ignore clause reading `priorityMagic` and `magicExists`, the census effect ((c)'s\n     last sentence), DR27's inputs, the host frame's locked Magic; REFERENCES T115-2.")

r('115 (h) V09',
  "*V09:* STATES the Magic control (the \"Programme\" group),",
  "*V09:* STATES the Magic control — the slider and its switch \"No magic in this world\", in the\n     \"Programme\" group —")

r('115 (h) V10',
  "the lexicon row \"floating islands, sky islands, flying islands → `islands: on`\" (the words set the switch alone; the\n     gate's message says what is missing), and the island's why naming the clauses.",
  "the lexicon row \"floating islands, sky islands, flying islands → `islands: on`\" (the words set the switch alone; the\n     gate's message says what is missing), `IntendInput.magicPriority?: number` (0–100) with the magic row \"magic, wizards,\n     fantasy · high magic\" taking `magic` `low` · `high` and `magicPriority` 50 · 90, §4.1's T1 encoder writing both to the\n     Magic control (creation mode the new document's `intent.magicPriority` and creation slice; edit mode the control's two\n     adjusts in one `group`), and the island's why naming the clauses.")

r('115 (h) V11',
  "*V11:* STATES row 56's `gate` cells in\n     `islands.json` (`gate.magic` stamped `ownerRule: '115'`, `economyMin` own and not calibratable)",
  "*V11:* STATES row 56's `gate` cells in\n     `islands.json` (`gate.magic` stamped `ownerRule: '115 (b)'`, `magicMin` and `economyMin` own and not calibratable)")

r('115 (h) V12',
  "*V12:* STATES §1's\n     owner-rule list entry, `Level.magic`, the derived fixture form `'<dossier>@magic<word>'`, the register's entries, and\n     M6-sky's panel seeds generated with the gate held.",
  "*V12:* STATES §1's\n     owner-rule list entry, `Level.intent.magicPriority?` and `Level.magic`, the derived fixture forms `'<dossier>@magic<m>'`\n     (the magic slider, 0–100) and `'<dossier>@magicLevel<word>'` (the word) — the fixture for high magic sets\n     `priorityMagic` 100, and, separately, the word `high` —, the register's entries, and M6-sky's panel seeds generated\n     with the gate held.")

for label, old, new in R:
    n = b.count(old)
    if n != 1:
        sys.exit(f'FAIL {label}: {n} matches')
    b = b.replace(old, new)
    print('ok', label)
open(dst, 'w', encoding='utf-8').write(a + b)
