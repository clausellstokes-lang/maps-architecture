from helper import build
R = []
def r(a, b, c=1): R.append((a, b, c))
r("""1. Read `REGISTRY` (V11 §2.1) and the source manifest (`src/manifest.json`: every source file's path, author seat,
   last-change date — the only dates the compiled provenance carries — and, from V07's V-M0, `productStages.village`: the
   stage ids `ProductDecl('village').stages` registers, conditional registrations included — V07 §3.0's set with any stage a
   V07 fallback registers, as S8's bent cut under V07 §8's risk (1) — committed by the seat landing V-M0 and held equal to
   the declaration by T-V11-9, so `@plat/tables` never imports the village package; SCC-77) — and, from C0, `stageIds`:
   every StageId the stage registry holds with every package the build ships loaded (§4.1's stages, the volumes'
   registered stages and V6 §3.16's epoch-phase ids, each package's ids entering the list in the change that registers
   them), committed by the seat landing that change and held equal to the registry by T-V11-1 (b), so `@plat/tables`
   imports no stage package either (SCC-R1C-1).""",
"""1. Read `REGISTRY` (V11 §2.1) and the source manifest (`src/manifest.json`: every source file's path, author seat,
   last-change date — the only dates the compiled provenance carries — and, from V07's V-M0, `productStages.village`: the
   stage ids `ProductDecl('village').stages` registers, conditional registrations included — V07 §3.0's set with any stage a
   V07 fallback registers, as S8's bent cut under V07 §8's risk (1) — committed by the seat landing V-M0 and held equal to
   the declaration by T-V11-9, so `@plat/tables` never imports the village package — and, from C0, `stageIds`: every
   StageId the stage registry holds with every package the build ships loaded (§4.1's stages, the volumes' registered
   stages and V06 §3.16's epoch-phase ids, each package's ids entering the list in the change that registers them),
   committed by the seat landing that change and held equal to the registry by T-V11-1 (b), so `@plat/tables` imports no
   stage package either).""")
r("""4. Expand cells: bare values take the file's or row's provenance; the provenance string is parsed by §17.1 (6)'s grammar
   as BCR-V11-21 extends it (the compiler's `provenance.ts`, one regular grammar; a `ref:` without a behaviour, a `(code)`
   without its P-id, a `general` without its practice, or a `corpus` source other than the item-69 palette targets and
   X-V12-1's `historical:<frame>` preset rows stops the build); `evidence` is carried into the compiled cell (BCR-V12-5);
   unit and `calibratable` come from the `ColumnSpec`; `ext` becomes §7.6's `extension`. The preset entries are checked
   (V11 §2.2; file f items 376–377; V01's BCR-46; SCC-51): a `presets` key outside `PresetId`, or an `ext.over` value
   outside its union (`PresetId` but `NG`, with `both` and `none`; V11 §2.2), stops the build naming the cell; for every
   zeroing preset whose file ships in registry row 73 (`MFCG` and `FTG` from C0, `VG` from V07's V-M0, the milestone whose
   content ships the `VG` preset file, V07 §8; SR3-07; `NG` from V01's M5, the milestone whose content ships its entries,
   V1-8.1), a `presetsRequired` column's cell without the entry that preset requires stops it — `MFCG` and `FTG` on every
   table, `VG` on the village-read tables (below), `NG` on none, every cell resolving under `NG` through its `MFCG`
   resolution (V11 §2.2; SCC-R3C-2) — and every named off form — V11 §3.7.4's `web.off` and V11 §3.24.0's switch table —
   must resolve under that preset, by its order (§7.6's; `NG`'s its own entry, else `MFCG`'s resolution), to its off
   values cell for cell, else the build stops naming the preset, the cell and the form (under `VG` over every table, since
   the loader resolves every table, V11 §3.2.2: a switch cell that fails it on a table that is not village-read is a table
   defect fixed by its `extension` marker, a `VG` entry being refused there). **The `VG` entries cover the village-read
   tables only** — a table whose `readers` StageIds (its `stageReaders`, step 6; a module id never counts, SCC-R1C-1) meet
   step 1's `productStages.village` (compiled `villageRead: true`): `VG` is read at village rungs only (BCR-V7-13;
   BCR-V11-31), and what a village stage reads is what a `VG` entry states; a missing `VG` entry stops the build naming
   every village-read `presetsRequired` cell that lacks one at once (so the seat landing V-M0 reads the whole list from one
   compile, V07 §3.15's rule filling it); a `presets.VG` entry on a cell of any other table stops the build instead — such a
   table resolves under `VG` by §7.6's order, a categorical cell to its `MFCG` entry (V11 §3.2.2; SCC-77, SCC-R3C-15;
   J-V11.77, J-V11.91); a `presets.FM` entry on any cell but `composition`'s (row 39) and V11 §3.24.0's chance and offer
   cells (rows 82–84) stops it (item 376's scope); a `presets.NG` entry on any cell but `hood.constants`' (row 62; V1-3.15's
   list) stops it (V01's BCR-46; SCC-R3C-2; J-V11.88).""",
"""4. Expand cells: bare values take the file's or row's provenance; the provenance string is parsed by §17.1 (6)'s grammar
   (item 534; the compiler's `provenance.ts`, one regular grammar; a `ref:` without a behaviour, a `(code)` without its
   P-id, a `general` without its practice, or a `corpus` source other than the item-69 palette targets and the
   `historical:<frame>` preset rows of V11 §2.2 stops the build); `evidence` is carried into the compiled cell (V12 §2.10);
   unit and `calibratable` come from the `ColumnSpec`; `ext` becomes §7.6's `extension`. **Reference cells** (§7.6; E-30)
   resolve here, for every table: a `ref` to a missing table, row or cell, or one whose target's unit differs from the
   referencing column's, stops the build naming both cells; a resolved reference is compiled as §7.6's reference cell,
   read as its target's current value. **The owner-rule stamp** (V12 §2.10): every cell of an owner-rule row carries
   `provenance.ownerRule` naming the item and part it encodes — the `raisedWays` rung gate and the CITY and METROPOLIS
   calibration minima (`'110 (b)'`, V11 §3.24.2), the catacomb TOWN gate and the cemetery-only catacomb sources (`'109 (k)
   (1)'`, V11 §3.23.8), the cathedral's and the great temple's `always` crypt (`'109 (k) (2)'`, V11 §3.5.8), the
   underground's any-tier existence (`'109 (j) (1)'`, V11 §3.23.2) — stamped from the source manifest's owner-rule row list,
   and the compiler writes the stamped-clause list V12's register check reads; a stamped cell outside the list, or a listed
   cell without its stamp, stops the build. The preset entries are checked (V11 §2.2; items 376–377, 584): a `presets` key
   outside `PresetId`, or an `ext.over` value outside its union (`PresetId` but `NG`, with `both` and `none`), stops the
   build naming the cell; for every zeroing preset whose file ships in registry row 73 (`MFCG` and `FTG` from C0, `VG` from
   V07's V-M0, the milestone whose content ships the `VG` preset file, V07 §8; `NG` from V01's M5, the milestone whose
   content ships its entries, V01 §8.1), a `presetsRequired` column's cell without the entry that preset requires stops it
   — `MFCG` and `FTG` on every table, `VG` on the village-read tables (below), `NG` on none, every cell resolving under
   `NG` through its `MFCG` resolution — and every named off form — V11 §3.7.4's `web.off`, V11 §3.24.0's switch table and
   the off forms of items 111 and 113 (V11 §3.17.3, §3.25.1) — must resolve under that preset, by §7.6's order, to its off
   values cell for cell, else the build stops naming the preset, the cell and the form (under `VG` over every table, since
   the loader resolves every table, V11 §3.2.2: a switch cell that fails it on a table that is not village-read is a table
   defect fixed by its `extension` marker, a `VG` entry being refused there). **The `VG` entries cover the village-read
   tables only** — a table whose `readers` StageIds (its `stageReaders`, step 6; a module id never counts) meet step 1's
   `productStages.village` (compiled `villageRead: true`): `VG` is read at village rungs only (items 377, 581), and what a
   village stage reads is what a `VG` entry states; a missing `VG` entry stops the build naming every village-read
   `presetsRequired` cell that lacks one at once (so the seat landing V-M0 reads the whole list from one compile, V07
   §3.15's rule filling it); a `presets.VG` entry on a cell of any other table stops the build instead — such a table
   resolves under `VG` by §7.6's order, a categorical cell to its `MFCG` entry (V11 §3.2.2; J-V11.77, J-V11.91); a
   `presets.FM` entry on any cell but `composition`'s (row 39) and V11 §3.24.0's chance and offer cells (rows 82–84) stops it
   (item 376's scope); a `presets.NG` entry on any cell but `hood.constants`' (row 62; V01 §3.15's list) stops it
   (J-V11.88).""")
r("""5a. Apply the reading rules of V11 §3.5.2 and the derived columns of V11 §3.5.1 — default weights and distances, supply
   edge defaults, `tags`, `noxious`, `cluster`, `max`, the compiled orientation (V11 §3.7.3), the `competition.mode` of
   `singular` and `district-defining` classes, and the display cells `icon` and `commonness` (reconciliation round 6,
   SR5-03) — and list every default applied and every override in the manifest.""",
"""5a. Apply the reading rules of V11 §3.5.2 and the derived columns of V11 §3.5.1 — default weights and distances, supply
   edge defaults, `tags`, `noxious`, `cluster`, `max`, the compiled orientation (V11 §3.7.3), the `competition.mode` of
   `singular` and `district-defining` classes (V11 §2.3's rule), the compiled `deckOk` (V11 §3.24.4), and the display
   cells `icon` and `commonness` — a town-and-city row's by V11 §3.5.1's rule, a `v.` row's by V07 §2.4's (the roster share
   at VILLAGE) — and list every default applied and every override in the manifest.""")
r("""   `readers` entry either an id of step 1's `stageIds` or a module id (`@plat/<package>`,
   `port.digest`, `tables.compiler`, `derivePerson`, `rung.wings`, `rung.plan`, `testkit.bench`; V11 §2.1), an entry that
   is neither stopping the build naming the table and the entry, and the stage entries compiled per table as the
   manifest's `stageReaders` (step 7), which step 4's village-read test and V12's run scope read (SCC-R1C-1) —
   and the content invariants of V11 §7.1 (T-V11-4 … T-V11-9) — T-V11-3, T-V11-4, T-V11-5, T-V11-7 and T-V11-25 run over every
   class row, V07 §2.4's `v.` rows included, whose `presence?` column (BCR-V7-36) is carried as written (SR1-08; V07's
   T-V7-56 runs the same over its rows).""",
"""   `readers` entry either an id of step 1's `stageIds` or a module id (`@plat/<package>`,
   `port.digest`, `tables.compiler`, `derivePerson`, `rung.wings`, `rung.plan`, `testkit.bench`; V11 §3.1's *Readers*), an
   entry that is neither stopping the build naming the table and the entry, and the stage entries compiled per table as the
   manifest's `stageReaders` (step 7), which step 4's village-read test and V12's run scope read — and the content
   invariants of V11 §7.1 (T-V11-3 … T-V11-9, T-V11-23 … T-V11-26, T-V11-28, T-V11-32, T-V11-37, T-V11-38 (a)–(c), T-V11-39
   (a)–(c)) — T-V11-3, T-V11-4, T-V11-5, T-V11-7 and T-V11-25 run over every class row, V07 §2.4's `v.` rows included,
   whose `presence?` column is carried as written (V07's T-V7-56 runs the same over its rows).""")
r("""7. Write canonical JSON per table, compute each row's H128 and the table's hash, and write `dist/manifest.json`:
   `{ table, version, hash, rows, provenanceCensus: {own, ref, owner, corpus, host, general, sf}, extensionCells, shadowedDerived, defaultsApplied, competitionOverrides, stageReaders, villageRead }`
   (`stageReaders` the table's `readers` that are StageIds, step 6 — read by V12's run scope and cost shortcut, V12 §3.7.2 (4),
   §3.7.7; `villageRead` from V07's V-M0, false before), with, from V-M0, the top-level `villagePresetCells` — every
   `presetsRequired` cell of a village-read table as `<table>/<row key>/<column>` with its `VG` entry's value and provenance,
   the list V07 §3.15's `VG` cell list is checked complete against (SCC-77, SCC-79) — and `dist/evidence.json` (one line
   per cited evidence id, V12 §2.10).""",
"""7. Write canonical JSON per table, compute each row's H128 and the table's **pinning hash** — §7.6's: over each cell's
   value, unit, `calibratable`, `extension` and `presets`, the whole provenance block (source, date, note, evidence,
   owner rule) excluded, so a provenance note or an evidence line moves no output version (V12-XCONF-2) — and write
   `dist/manifest.json`:
   `{ table, version, hash, rows, provenanceCensus: {own, ref, owner, corpus, host, general, sf}, extensionCells, shadowedDerived, defaultsApplied, competitionOverrides, ownerRuleCells, stageReaders, villageRead }`
   (`stageReaders` the table's `readers` that are StageIds, step 6 — read by V12's run scope and cost shortcut, V12 §3.7.2 (4),
   §3.7.7; `ownerRuleCells` the stamped-clause list, step 4; `villageRead` from V07's V-M0, false before), with, from V-M0,
   the top-level `villagePresetCells` — every `presetsRequired` cell of a village-read table as `<table>/<row key>/<column>`
   with its `VG` entry's value and provenance, the list V07 §3.15's `VG` cell list is checked complete against — and
   `dist/evidence.json` in V12 §2.10's shape (`{ "<cell ref>": { status, lines } }`: the register's plain status word for
   the cell, `owner` for a stamped cell, and one plain line per cited evidence id from its run's summary).""")
r("""per §7.6 — the preset step resolves every table by the preset's order (§7.6; V11 §2.2): under `VG` a cell's `presets.VG`
entry, which only the village-read tables carry (the manifest's `villageRead`; V11 §3.2.1 step 4), else 0 or off for an
`extension` cell, else its default, a categorical `option` cell of a table no village stage reads resolving to its `MFCG`
entry — so an epoch at a village rung (V07 §3.12; V6 §3.2) reads the epoch tables at their parity values (V06's "0 in the
parity presets"), as a town's epochs do under `MFCG` (reconciliation round 4's continuation, SCC-R3C-15; J-V11.91); under
`NG` a cell's `presets.NG` entry, else its `MFCG` resolution (V1-3.15; SCC-R3C-2); apply the web's two switches (V11 §3.7.4: with `orientEnabled` false every class's `profile.orientation`
reads `balanced` in the view, with `splitEnabled` false no class's `profile.split` is in the view — a use's declared
split, V11 §4.2, stands; SCC-34); run `resolveSiting` (V11 §3.3.4); freeze.""",
"""per §7.6 — the preset step resolves every table by the preset's order (§7.6), `VG`'s entries standing only on the
village-read tables (the manifest's `villageRead`), so an epoch at a village rung (V07 §3.12; V06 §3.2) reads the epoch
tables at their parity values (V06's "0 in the parity presets"), as a town's epochs do under `MFCG` (J-V11.91); resolve
the reference cells (§7.6); refuse a non-`en` `messages` file carrying `buttons`, `tone` or `codes` (registry row 87);
apply the web's two switches (V11 §3.7.4: with `orientEnabled` false every class's `profile.orientation` reads
`balanced` in the view, with `splitEnabled` false no class's `profile.split` is in the view — a use's declared split, V11
§4.2, stands); run `resolveSiting` (V11 §3.3.4); freeze.""")
r("""At run time: (a) an override or pack row with a numeric cell outside its declared range is clamped to the nearer bound
and reported in one line; one that fails the schema otherwise (a type error, a dangling `ref`) is **refused** as F-EDIT
(§5.2) with the rule it broke — never partially applied;""",
"""At run time: (a) an override or pack row is checked as an edit is (V11 §4.1): a numeric cell outside its declared range
clamped and reported in one line, a schema failure (a type error, a dangling `ref`) **refused** as F-EDIT (§5.2) with the
rule it broke — never partially applied;""")
r("""frozen view with its CLI command — this volume adds no third behaviour (V11C-24).""", """frozen view with its CLI command — this volume adds no third behaviour.""")
r("""P-id — never a reference's value set: a reference NUMBER that describes a behaviour (a measured spacing, a share, a
threshold) is a fact and may stand with its baseline id; a reference LIST, grammar, word, palette or table is never
typed in (§17.1 (6)). Every source file's header names its author seat; every PR runs the hashed scan of §17.1 (5) over
the dist tree, and a list hit (five or more words of one reference list on one line or in one column) fails the PR
unless an allow row with a written reason is reviewed. Rows citing "general historical knowledge, not
corpus-witnessed" (g item 104 (f)) name the historical practice in their note; the corpus stage re-signs them (§13.9).""",
"""P-id — never a reference's value set: a reference NUMBER that describes a behaviour (a measured spacing, a share, a
threshold) is a fact and may stand with its baseline id; a reference LIST, grammar, word, palette or table is never
typed in (§17.1 (6)). Every source file's header names its author seat; every PR runs §17.1 (5)'s hashed scan over the
dist tree, its list-hit rule failing the PR unless an allow row with a written reason is reviewed. Rows citing "general
historical knowledge, not corpus-witnessed" (item 104 (f)) name the historical practice in their note; the corpus stage
re-signs them (§13.9).""")
build('08-s3-2', [(991, 1104)], R)
