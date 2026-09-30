## Reconciliation round 2 — continuation (volumes/reconcile-V08-r2, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r2; covered by the whole-design retrovalidation (J84).

The lane was re-issued with a wider brief than its 05:12 landing covered: the three `seam-settlements-r1` minors of the
first run and three findings of `docs/volumes/critique/seam-surfaces-r1.md` §7, its continuation
of 09:15 (SR-25 majors; SR-24 minor). **The first three** were verified in the live text (V08 §3.5 step 6 cites
V11 §3.13.5's matching rule with `unmapped_good`; T-V8-46's hamlet clauses sit at VH with a base-rung `town-1` mutation
at SF3; V08 §12 lists the V11 and V07 companions as CONFIRMED and §13 X14 is CLOSED) and not redone. **The three new
findings** are **all FIXED**, 0 ruled invalid, 0 left on the fix list. Every sentence that read otherwise was edited in
place; this note lists the changes.

| issue | what changed (where) |
|---|---|
| SR-23 (major) | item 390 gains a second target: §5.4's `GenerationReport` adds `dossierNotes: PortNote[]` — the document's `DossierBinding.notes` at the report's seq, in identity order, `[]` for an unbound document, rebuilt with the report by every derivation and the verification replay (a derived cache, in no digest) — with a sentence in §5.4's prose. V08 §4.6's *The standing notes* reads: the report panel reads `report(h)`; its dossier section lists `GenerationReport.dossier` (the placement state, V09 §5.7's "V08's dossier state list"), then `GenerationReport.dossierNotes` under `host.group.standing`, one line per note as the absorb group's item 2; the class column's `standing` cell names the field. §1b: the `PortNote` and ledger rows route standing notes through `GenerationReport.dossierNotes` and `report(h)`, and a new row for the field; §2.7: the `DossierBinding.notes` row's read column and a new lifecycle row for the field. T-V8-14's report-panel clause reads the field (equal to the binding at the report's seq in every frame and after a reload, `[]` unbound, listed after the placement state). SF3 names it. §13 X12's V09 §5.7 clause follows. J-V8.104. |
| SR-24 (minor) | V08 §4.6 item 2 and *The standing notes* drop a note line whose `keys` bind an element the view's effective key (V09 §2.10; V09 §4.8) does not admit, in place of "the frame's key". T-V8-14 gains the clause: on a `town-1` variant with a `secret` standing-note record and a `secret` event-note element, both lines at `secret`, neither under View as "What anyone knows" nor under "See what the players see" with a party key omitting them. |
| SR-25 (major) | V08 §5.2's `CustomChainRecord` row gains its **Knowledge** rule: a chain is drawn, labelled, listed in the gazetteer and exported only when the key admits every joined node — the view's effective key for the drawing, the legend and the gazetteer, the export's knowledge key for GeoJSON and pictures (§11.1) — each node by its `knownTo` in §9.2's table as a band-less reader admits it, a concealed use never; otherwise not drawn, not listed (a relation, never an "unnamed" row) and not exported. item 410's §8.2, §11.1 and §11.2 clauses say the same ("listed only when the key admits every joined node"). T-V8-25 gains the active-chain variant with one `secret` processor, read at `public` and at a party key form without it: no line, arrowhead, legend row, gazetteer row, GeoJSON feature or SVG path, all present at `secret`. §1b: the drawing-rows row and a new row for the rule. SF4 names it. J-V8.103, J-V8.105 (the export's whole key, not its tier alone, as §11.1 reads it; nodes admitted as at the city band, so a chain does not flicker with zoom). |

**Found in passing and fixed (the intake rule).** V08 §3.1 step 7 (b) resolved the party lines' `{places}` "under the
frame's key", the sibling of SR-24: a `host.hidden` line would name, under "See what the players see", places the party no
longer knows. The lines' `{places}` and `targets` now follow the view's effective key — a withheld place neither named nor
targeted, a line left with no place not listed, the list re-made on `onEffectiveKey` (V09 §2.10) — with a T-V8-47 clause
and J-V8.106.

**New rows.** J-V8.103 – J-V8.106; no new bar (T-V8-14, T-V8-25 and T-V8-47 widened); §12's continuation paragraph; §13's
intro, X12 and X18 (V09's companions, open until reconcile-V09-r2's continuation lands: SR-22's `HistoryRow.lines` and
`dossierFacts` rows, V09 §5.7's sentence, SR-34's XV-V9-26 status and SR-35's citation of V08 §5.2). Effort unchanged: a
copied list in the report build and one admission test per chain fit SF3's and SF4's ranges (PLAUSIBLE). Counts now: 106
J-V8, 32 BCR-V8 (item 202 withdrawn), 47 T-V8, 5 owner questions (unchanged).

**For the coherence pass.** File f item 390 cites item 390 by id and now also touches §5.4 (its "Also touches" line does
not yet say so); item 410 cites item 410, whose §11.2 gazetteer clause is not in its "Also touches" line either. Both
are applied by reference; no edit was made in file f. **For V09** (no edit made there): V08 §4.6 and §5.2 now read as
SR-22's V09 §5.7 sentence and SR-34's "listed rule as SR-25 leaves it" expect.

**Checks.** `docs/validation/bench/doc_checks.py` (headings from the base) on this file before and after: C1, C2, C4 and S1
0 hits both; C3 213 → 225, the new hits generic phrases ("as well as for the", "in place of the frame"), number runs and
the PENDING line; S2 192 → 211, the new hits volume-qualified pointers (V09 §2.10, V09 §5.7, V08 §3.14). The diff against
the backup (`scratchpad/volumes/rcV8r2c/V08-pre-r2c.md`) holds this lane's hunks only.

