# Repair round 5 — V08 (the SettlementForge stage) — lane coherence/repair-V08-r5

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V08-r5; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored; the FILE line routes every block to docs/volumes/V08-settlementforge.md. Live unit: V08 as assemble-r4 left it
# (sha256 4675c05ecf19eb56…, 572 529 bytes, 3 698 lines — round 4's target, unchanged). Each REPLACE body is the live
# subsection with count-asserted substitutions (scratch rV08r5/edits.py: 33 edits, each applied exactly its asserted
# count); every untouched line is verbatim. Blocks: 14, all REPLACE — ## 1b, §2.2, §2.3, §2.4, §2.7, §3.5 (with §3.5.1,
# verbatim), §3.6, §3.16, §3.17, §4.6, §5.5, ## 6, §7.1, ## 9. No heading retitled, no whole-volume REPLACE, the title
# block untouched. Ruling requests: 0.
# Binding rulings applied (adjudication-r5, Part H · V08): R5-01, R5-03, R5-07, R5-10; R3-01 – R3-03 and R4-01 stand;
# R4-08's last clause as amended by R5-03, R4-15 (a) as amended by R5-07, R4-16 kept.
#
# PROGRESS
# - P0 brief read whole (9 issues routed; 2 END lines); adjudication-r5's TOC, R5-01, R5-03, R5-07, R5-10 and Part H · V08
#   read whole; R3-01 – R3-03, R4-01, R4-08, R4-15, R4-16 read: done
# - P1 verifier evidence (verify-edges-life, -rendering, -agree-host, -agree-tools, -agree-time, -agree-proof, -vol-V07-V08,
#   -vol-V11-V12, -pipeline r4t) and the live V08 subsections concerned read whole; base §4.11, §11.3, II.1, §4.2 S3 (1);
#   V01 §3.16 `disasterSource`; V07 §5.6 (3); V11's `disaster` row; V06 §6.8 (6) and T-V6-24: done
# - P2 edits written (scratch rV08r5/edits.py, 33 count-asserted substitutions); 14 REPLACE blocks built: done
# - P3 dry run of apply-blocks.py on copies: 14 found, 14 applied, audit not-OK 0, equal to the independent application;
#   tables, ids, resolver and doc checks (below): done
# - P4 result saved; LANDED: done
#
# ISSUES → WHERE FIXED (9 routed ids: 8 FIXED in text, 1 MERGED and closed by its sibling's fix; none INVALID)
#  VEL4-r4-01 (major; FIX per R5-07 (b); its three texts as written)  (1) §3.6 (3): after "else linear between the target
#        at `W₀` and the new population at `W₁`, rounded to a person" — "where this absorb's `population` took its
#        field-table fallback (V08 §3.5's diff), the new population is the carried one wherever this step reads it (this
#        linear target, and the crossing tested at `W₁` with no `populationHistory`), the digest's fallback value never
#        entering an epoch's target or a crossing test; `populationHistory`'s readable entries date and size the crossings
#        and targets as usual". (2) §3.17's digest-and-diff row: "; and where such an absorb's span crosses a year end, the
#        epoch there targets the carried population, no epoch folding toward the fallback (V08 §3.6 (3))". (3) T-V8-61 (a):
#        the `city-1` absorb with `population` emptied past the next year end — one year-end epoch at the carried
#        population, no epoch at `W₁`, the households unchanged by the fallback.
#  VRC4T-08 (minor; FIX)  §2.2's `setView` comment: "a layer's visibility goes as a logged setLayer by doc.apply (§8.4)";
#        §3.16 (4) and (6) (g): "§11.3's commands — `view.set { week }` and `view.set { select }`, and a layer's visibility
#        by a logged `setLayer` sent by `doc.apply` (the document's style, §8.4; `MapSession.setLayer`, V08 §2.2)". The
#        three sites; no other "layers shown" in V08 (grep).
#  VV78-r4-03 (major; FIX per R5-07 (a); its three texts as written)  §3.5's diff: after "makes no change: the carried fact
#        stands." the definition — a field is a row's own path (a top-level key, or a whole list); a record's absent or
#        unreadable sub-field takes its row's reading (an institution field's `else`; the `activeConditions[]` row's missing
#        `label`, `duration`, `sourceEventType`) at an absorb as at a creation and is compared as read, so an institution
#        SettlementForge reopens reopens (F6) (note 7). §2.4's table lead: "— a row's own path; a record's absent or
#        unreadable sub-field is read by its row and compared (V08 §3.5) —,". T-V8-61 (a): the `town-1` reopen and the
#        dropped `duration` clearing `untilWeek`.
#  VV78-r4-04 (major; FIX per R5-03, amended)  §3.6 (6): R5-03's sentence — a late change folds after the last epoch at
#        `W₀` + 1 where `W₁` is after `W₀`, else at `W₀`, finished, its tick kept, noted `late`, never before `W₀`, so §4.11
#        *The clock* (1)'s current week never falls back (a late calamity: (3)). §3.6 (3)'s calamities' parenthesis: R5-03's
#        text joined with VV78-r4-04's pointer (note 3). §4.6's `unreceipted_change` row: "for a change carried at or before
#        the last epoch's week (V08 §3.6 (3), (6); V08 §3.17)" (note 5). §3.17's events-and-epochs row: VV78-r4-04's
#        `W₁`-after-`W₀` row added beside R5-03's degenerate inputs (note 4). T-V8-49 (g): the current week after the absorb
#        not before `W₀`.
#  VV78-r4-05 (minor; FIX)  ## 6's absorb-with-epochs row: (a) the span `(the previous epoch's week, its week)`, "one dated
#        at the epoch's own week riding its `EpochInputs.dossier` (V08 §3.6 (6))" (note 8); (b) "≤ 3 ms at TOWN and CITY and
#        ≤ 3.5 ms at the METROPOLIS cap"; (c) the release clause reads the three catch-up fixtures and names the over-budget
#        fixture's one-epoch fold by design (note 8).
#  VV78-r4-06 (minor; FIX)  ## 1b: W101 (free; the next id after W100) — the host's view commands, `MapSession.setView` and
#        `MapSession.setLayer`, both ends as required (note 9); the lead's subject list adds "the host's view commands (W101)".
#  VV78-r4-07 (minor; FIX per R5-07 (c))  §5.5 and §3.17's labels row: the generator's own name at a creation, the carried
#        name kept at an absorb (V08 §3.5).
#  VV78-r4-08 (minor; MERGED into VV1112-r4-01)  closed by VV1112-r4-01's fix (the same fixture sentence of §7.1).
#  VV1112-r4-01 (minor, regraded from major; FIX per R5-10; closes VV78-r4-08)  §7.1's crisis fixtures: "with one week on
#        `city-1`, and one on a copy of `metropolis-3` mutated test-side to the population cap's 120 000 people (as T-V8-36
#        mutates `city-1`), in which the siege, the plague's quarantine and the refugee wave stand at once"; the rest stands.
#
# END LINES WRITTEN (Part H · V08; other units' fixes)
#  - VAT4-r4-01 (pipeline; VPC-R4-02 merged; R5-03): §3.6 (3)'s late-calamity sentence, verbatim ("is late and folds no
#    epoch at its own week (§4.11 *The clock* (4)): with `W₁` after `W₀` it rides … with `W₁` not after `W₀` its F5 targets'
#    dossier events apply now at `W₀`, finished, and it is held in `DossierBinding.lateCalamities` (§7.7; (4)) for the first
#    epoch a later absorb folds, which it rides at that epoch's first week; its tick kept in its receipt either way"); the
#    crossing clause's "— none when `W₁` is not after `W₀`, the crossing then read at the next absorb whose week passes
#    `W₀`"; the calamities' parenthesis (note 3); §3.6 (4)'s ledger event lists `lateCalamities` beside `quarantined`,
#    folding it setting `DossierBinding.lateCalamities` to the held list (note 2); §3.17's degenerate inputs verbatim
#    ("an absorb whose week is the last epoch's own (`W₁` = `W₀`) or before it (a clock turned back): no epoch; late changes
#    at `W₀`, finished, noted `late`; a late calamity's targets applied and the calamity held for the next folded epoch; a
#    population move read at the next absorb past `W₀`"); the `lateCalamities` lifecycle row (note 1); T-V8-49 (g)'s
#    second-absorb fixture verbatim (no epoch, the targets applied; the next absorb past `W₀` folding the crossing and the
#    strike at its first epoch's first week, the deaths in that epoch's burial need).
#  - VAP-r4-05 (V12; R5-10): §7.1's crisis fixtures, after "the calamities' `targets` resolved (V08 §3.16 (7))": "; on
#    `city-1` a second fire naming more target districts than its severity's share of the place's units, and a fire at
#    severity 1 on a fixture holding a district the adjacency from its seed does not reach (a fire never jumps a gap, V01
#    §3.16 (4))", the fixture named with what parts its districts (note 10), "(X-V12-5)".
#
# SWEEP (R5-01 (2): every restatement in V08 of a term, field or rule a ruling changes, conformed in the same blocks)
#  - R5-03 (`lateCalamities`, late changes): W20's port fields and consumers; §2.3's port-field list ("`lateCalamities` (the
#    held late calamities, V08 §3.6 (3))" — the record is §7.7's, Part H's note); T-V8-49 (g)'s superseded "under an absorb
#    whose week is not after the last epoch's, applied finished" rewritten (note 6); J-V8.55's amended mark ("— or, with the
#    absorb's week not after the last epoch's, the first epoch a later absorb folds — and no late change folds before the
#    last epoch's week"). Nothing else in V08 restates the late rule (grep: "late", "not after", "`W₀` + 1", "with no
#    event", "burial need").
#  - R5-07 (a field is a row's own path): §3.16 (9) (b)'s and §3.17's one-input row's general restatements of the absorb
#    rule add the path definition; W98 and J-V8.134 name only top-level fields and agree as written; §3.17's village row
#    already keeps the carried population at an absorb.
#  - R5-07 (b): §3.17's village row and the field table's `population` row read "at an absorb, the carried value" and agree.
#  - R5-10 / VV78-r4-05 (c): T-V8-63 ("on T-V6-24's three catch-up fixtures"; "one of the three past its budget fails the
#    release …; T-V6-24's over-budget fixture takes its one-epoch fold, reported F-BUDGET-TIME, by design") and ## 6's
#    "**Its target:** T-V6-24's three catch-up fixtures".
#
# NOTES FOR THE ADJUDICATOR (judgment calls, each vetoable)
#  1. R5-03's END names "§2.6's binding lifecycle"; V08's lifecycle table is §2.7 (§2.6 is the dossier row sets), and the
#     binding's port fields' rows (`adapter`, `quarantined`) stand there, so the `lateCalamities` row is placed in §2.7 after
#     `quarantined`'s, its cells as R5-03 lists them; its migrate cell adds "an older ledger event without the field folds
#     as `[]`" (the event field §7.1 gains under determinism's END).
#  2. Wiring the held list: §3.6 (4) states the list the event carries — "the binding's list less each calamity the first
#     epoch this absorb folds carries, plus each late calamity this absorb holds" — so its producer is defined; and since
#     §7.7's field holds binding keys (`string[]`, determinism's END), §3.6 (3) fills a held calamity's `CalamityRef` "from
#     its carried `calamity` fact under the held key". Both state at build depth what R5-03 implies; no new behaviour.
#  3. The (3) calamities' parenthesis has two required texts (R5-03's and VV78-r4-04's); Part H says VV78-r4-04's "as
#     written, joined by R5-03's V08 texts". Joined: "(one carried late: of the first epoch this absorb folds, or for one
#     held a later absorb's, at that epoch's first week — its F5 targets' dossier events riding that epoch's
#     `EpochInputs.dossier` with it at `W₀` + 1 where `W₁` is after `W₀`, above and (6))".
#  4. §3.17's degenerate inputs: R5-03's text replaces the old degenerate clauses; the old row's `W₁`-after-`W₀` late
#     calamity clause (no epoch at its own week, riding the first epoch at `W₀` + 1) is kept beside VV78-r4-04's new row, so
#     no case the row stated is lost (principle (9)'s guard).
#  5. §4.6's `unreceipted_change` variant now serves any late change (VV78-r4-04's text); its name and keys cells, written
#     for a calamity only, read "the element's (the variant for a late calamity: the calamity's name)" and "the element (the
#     variant for a late calamity: its resolved targets)". A late calamity stays noted (the row cites (3)), as T-V8-49 (g)
#     ran it in round 4.
#  6. T-V8-49 (g) as rewritten: "epochs none, one, backwards (late changes at the last epoch's week, finished) and across a
#     band; a calamity carried late — … at that epoch's first week; a second absorb in the last epoch's own week … — no
#     epoch, the calamity's targets applied, noted by `unreceipted_change`'s `late` variant, the calamity held in
#     `DossierBinding.lateCalamities`; the next absorb past `W₀` folding the crossing and the calamity's strike …, its deaths
#     in that epoch's burial need; and a newly carried non-calamity change … — folded at `W₀` + 1, applied finished, noted
#     `late`, the document's current week after the absorb not before `W₀`".
#  7. VV78-r4-03's example parenthesis adds "a record failing its own required fields is quarantined, step 4", so "a
#     sub-field absent or unreadable takes its row's reading" cannot be read as overriding step 4's quarantine of a record
#     whose own required field (a name; an institution's category) fails — a precision, no new behaviour.
#  8. VV78-r4-05 (a): the epoch-week clause stands after "then the epoch" ("…, then the epoch, one dated at the epoch's own
#     week riding its `EpochInputs.dossier` (V08 §3.6 (6))") rather than inside the span's dash pair, so the sentence parses;
#     (c) reads "on any of T-V6-24's three catch-up fixtures that fails the release (its over-budget fixture, 100 years
#     carrying 5 000 at the cap, taking that one-epoch fold reported F-BUDGET-TIME by design)" — the required content,
#     worded to avoid a C3 corpus run ("… one of those three").
#  9. W101's § cell reads "(item 125 (c); 3.16 (4), (6) (g); the client, 2.2)" — the required citations, reordered to avoid
#     a C3 corpus run ("c 2 2 3 16"); the other cells as required.
# 10. VAP-r4-05's fixture: `town-1` — its `riverside` terrain and `river` access force a river (V08 §2.6's water words),
#     placed through the core (§4.2 S3 (1), G-P14), and a water run is a one-sided seam (II.1: `Seam.sides` null for
#     water), so the two banks' districts share no seam and V01 §3.16 (4)'s fire order never crosses. A gap alone does not
#     make the shortfall: the count at severity 1 is half the units (the `disaster` row's 0.05–0.5, V11 §3.25.9), so the
#     fire's `targets` name one use on the bank holding fewer districts than that count, and the harness asserts that
#     bank's count before the bar reads it — a frozen fixture whose banks fail it fails loudly, never passes. Considered
#     and not taken: an end-less thorp's toft groups (no two neighbour by construction, V07 §5.6 (3)) — no fixture
#     guarantees an end-less thorp, and V12's case is the district order.
# 11. Six C3 corpus runs our new wording made (citation numerals such as "§3.6 (3), (4) and") were reworded before landing
#     (W20, §2.3, §2.7's row, §3.17's degenerate inputs, ## 6 (c), W101): each keeps its content and citations.
#
# HAND-OFFS for round 6's verifiers (R5-01 (2): ends no END line names; each receiving seat's own text)
#  - scope §13.2's frozen manifest: V08 §7.1 states that each of V12's item-122 fixtures made there is in §13.2's frozen
#    manifest; the new ones are the `metropolis-3` copy at the 120 000 cap (R5-10's sweep names it), `city-1`'s second
#    fire, and `town-1`'s severity-1 fire with its target on the smaller bank.
#  - V12 §3.15.12 and X-V12-5: the place "whose district adjacency from its seed ends before that count" is V08 §7.1's
#    `town-1` with its river; V12 may cite it.
#  - determinism §7.7 / §7.1 (R5-03's END there): V08 §3.6 (4) states the held list's content after an absorb (note 2);
#    §7.7's comment "set by folding each dossierFacts event's list, as quarantined is" agrees.
#
# CHECKS (scratch rV08r5/)
#  - apply-blocks.py dry run on copies of the live V08 and the rationale (the FILE line dropped, as Assemble routes it):
#    14 found, 14 applied, 0 skipped, audit not-OK 0; headings 63 → 63; fences 18 → 18, balanced; title block unchanged;
#    PENDING FABLE REVIEW lines 1 → 1; rationale unchanged; the output equal to the independent whole-file application of
#    the 33 edits (sha256 8b5b52439f96a352…, 579 431 bytes, 3 730 lines).
#  - Tables: every row of every table has its header's cell count (pipes inside code spans not split; 0 bad rows; live 0).
#  - Ids: J-V8.1 – J-V8.137 (137, no duplicate, none new), T-V8-1 – T-V8-63 (63, none new); W1 – W101 (100 rows, W42
#    retired; W101 new, used nowhere else in the set); B1 – B21 unchanged; review ids (`R2-nn` … `R5-nn`, verifier ids) in
#    V08: 0 → 0 (R12-31 is §12.10's register row).
#  - The assembler's resolver (work/assemble-r4/refs.py on mirror trees of the set, live and with the target V08): V08
#    resolved 2 792 → 2 823, external 12 → 12, ambiguous 0 → 0, BROKEN 0 → 0; ids defined 3 467 → 3 467; every other
#    unit unchanged.
#  - doc_checks.py over the volume, --heads docs/ARCHITECTURE.md — WARNING: reference corpus INCOMPLETE (captures,
#    research/patreon, research/devlogs, research/ftg-docs, research/external missing): NOT authoritative, provisional.
#    Live: C1 0, C2 0, C3 183 / 155 unreviewed, C4 2 / 0, S1 0, S2 283 / 2. Target: C1 0, C2 0, C3 183 / 155, C4 2 / 0,
#    S1 0, S2 284 / 2 — no new unreviewed hit (note 11).
#
# WORDS (principle (9)) — the volume 90 869 → 92 002 words (+1 133, +1.2 %; whitespace-split count, as round 4's; per
#  edit in rV08r5/). Added: the late changes and the held calamity ≈ 485 (§3.6 (3), (4), (6), §2.7's row, §3.17's
#  degenerate inputs, T-V8-49 (g), W20, §2.3, J-V8.55); the fixtures R5-10 rules ≈ 150 (the cap copy, the two fires and
#  town-1's river); a field as a row's own path ≈ 190 (§3.5, §2.4, §3.16 (9) (b), §3.17, T-V8-61 (a)); the cadence's
#  carried population ≈ 135 (§3.6 (3), §3.17, T-V8-61 (a)); W101 ≈ 80; the batch row's three points ≈ 55; the name at an
#  absorb ≈ 25; the view commands' wording ≈ 10. Removed: none beyond the superseded clauses each edit replaces. A repair
#  round's growth: findings at build depth (the guard), no source of the shrink goal applies.
#

=== FILE docs/volumes/V08-settlementforge.md ===

=== REPLACE ## 1b Wiring table ===
## 1b Wiring table

Every piece this volume adds, what feeds it, what it feeds and the base hook it plugs into; base records are cited. The
rows are ordered by subject: the embed and the bridge (W1–W19), the binding, digest and adapters (W20–W33), the staged
records and values (W34–W47; W42, the realm block's helper, retired by item 125), the owner items 108–118 at the port
(W48–W67), custom content and the staged-record event (W68–W74), the clerk, drawing and exports (W75–W79), the host's
surfaces and the players' view (W80–W88), the plan and testing (W89–W94), Find's dossier entries (W95), items 122,
125 and 126 at the port (W96–W100), and the host's view commands (W101).

| row | piece (V08 §) | producer (fed by) | consumers (feeds) | base hook |
|---|---|---|---|---|
| W1 | embed entry `embed.html` of `@plat/app` (3.1) | the host's frame `src`; the module's static host | boots `@plat/api`'s workers; sends `ready`, `module.status` | §11.2 worker boundary, §11.3 transport; item 507 |
| W2 | `@plat/bridge-client` (2.2, 3.1) | SettlementForge's lazy Map-tab chunk | the frame's `WindowPostMessageTransport`; the host's map-record store | §11.3; item 507 |
| W3 | `MapHostConfig`'s SettlementForge inputs — `moduleOrigin`, `backupDepth`, `quotaBytes`, `locale`, `line` (2.2) | SettlementForge's existing product decisions (J121); its running line (§14 item 1) | the frame's `src` and CSP (3.1); `MapStore.replaceSnapshot`'s backup depth (3.7); the storage row's quota check (6); the frame's message catalogue (5.5); every offer's `host.line`, the selection's check (2.4) | §11.3 *SettlementForge's configuration*; §11.5 |
| W4 | `MapRecord` (2.1) | the host, through the client's store calls (3.7) | `doc.load` + `doc.apply` at open (3.1); the refresh queue (3.4); the offer decision (3.2) | §2.9 (the document it stores), §11.3 "the host is the store" |
| W5 | `dossier.offer` / `dossier.result` (2.2) | the client (offer); the port leader (result) | `DossierPort.digest`, `creation`, `absorb` (3.3); the host's append and fan-out | §11.3's port vocabulary, §11.4 doors 1 and 2; item 472 |
| W6 | `module.status` with its `detail` key (2.2) | the embed's glue at each phase (3.1); the module at B10's rebuild and B20's mismatch (3.9) | the tab's banner beside its phase's row (5.1) | §11.3; item 472 |
| W7 | `doc.snapshot` / `doc.snapshot.ready` (2.2) | the client at creation, compaction, upgrade and rebase | `MapStore.create`, `MapStore.replaceSnapshot` | §11.3; item 472 |
| W8 | `encoded`, `seqAfter`, `logHeadAfter` on `doc.changed` and `dossier.result`; the snapshot metadata on `created` (2.2) | the module (canonical CBOR, §11.3's `logHead`) | `MapStore.commitEvents`, `MapStore.create`: the host stores them and never computes a head | §11.3; item 472 |
| W9 | `doc.load.audience` (2.2) | the client, from the audience word | the module's role and key, the lower of the two (J-V8.29) | §11.3 *Roles*; §14's audience table |
| W10 | host-minted `docId` (2.1) | the host at first creation (`MapRecord.mapId`) | `generate`'s document id, so every client's creation is identical (3.3) | §2.9 `docId`, §11.2 `generate`; item 459 |
| W11 | export `displayNames` and the lowered `knowledge?: Admission` (2.2) | the client's `exportPicture` (3.7's thumbnails, 3.11, 5.3) | §11.1's exporters, admitting what both the requester's key and it admit | §11.1 *Knowledge*, *Display names*; items 453, 572 |
| W12 | the export bundle call `MapSession.exportScenes` (2.2, 5.4 (2)) | the host page, from M-SF (J122) | the module's scene exporters (§11.1's `.dd2vtt` and Foundry scenes) under the calling key; opaque blobs packaged unread into SettlementForge's export bundle | §11.4 *The export bundle*; §11.1 VTT |
| W13 | port leader (3.3) | the role from `doc.load` (with its `audience`) and the audience table | commit: `dossier.result` events; an editing client that folds them re-runs `absorb` and reports a mismatch | §11.3 roles, convergence; §14 audience table |
| W14 | refresh queue (3.4) | the host after an advance (`refreshPending`) | a hidden frame running offer → absorb → snapshot → pictures per map | §12.8 memory; §2.9 load |
| W15 | `MapRecord.refreshing` lease (2.1) | the refresh queue | another device's page (free when expired) | — |
| W16 | upgrade offer in the host (3.8) | `ready`'s output versions vs `MapRecord.snapshot.outputVersion` | the owner's upgrade dialog → `upgrade` event (§7.5) | §6.4 retention, §11.3 handshake |
| W17 | the embed's bridge handler — the bridge to the shell (3.1 step 7) | the host's `clerk.config`, `preview { proposal }` and `host.state`; the harness's `ClerkMount.host` calls; the header's controls; the shell's selection forwarded in `entity.selected`; the loaded document's `doc.changed` `ApiEvent`s through the handler's one `subscribe` (§11.2) | `ClerkMount.host` (V09 §2.10); `HostSlots` — `header`, `banner`, `lockedControls`, `exportFormats`, `fileMenu`, `clerkMode`, `hostName`, `historyLines`, `newDocuments` (V09 §2.2); the frame's `ViewOpts.viewAs`; the posted `clerk.needsToken`, `clerk.config.refused`, `clerk.proposal` and `host.action` | §11.2 (`subscribe`), §11.3; items 472, 473, 507 |
| W18 | `host.action` and `MapSession.on('action')` (2.2, 4.2) | the frame's header controls, an owner's or editor's frame only | the host page, which runs the V08 §4.2 row's operation with `offer`, `setParty`, `MapStore.replaceSnapshot`, `MapStore.create` or its own assistant settings and `setClerk` | §11.3; item 472; T-V8-47 |
| W19 | `host.state` (2.2) | the client, after each `doc.load` and each change of `MapRecord.party`, `backups` or `partyPictures.at`; `MapSession.seePlayersView` | the header's controls, the restore dialog's list of lost edits, the history panel's party lines through `HostSlots.historyLines` (4.6), the players' view — `ViewOpts.viewAs` (V08 §3.14 (5)) | §11.3; items 464, 472 |
| W20 | the binding's port fields — `DossierBinding.adapter`, `.quarantined`, `.lateCalamities`, `.notes`, `absorbed` retention (2.3) | `creation` and `absorb` through the ledger event's fold (3.5, 3.6 (4)) | the next absorb's diff and remaps (3.5, 3.8); §5.3's binding check; the report; each held late calamity's ride on the first epoch a later absorb folds (3.6 (3)) | §7.7 `DossierBinding`, §2.9 dossier block; item 390 |
| W21 | `CarriedFact` shapes and the diff rules (2.3, 3.5) | `digest` | `absorb`'s change list; `factHash`; F22's convergence | §7.7 items 1, 12, 13; §7.7 `CarriedFacts` |
| W22 | THE ADAPTER'S FIELD TABLE (2.4) | the pinned line's dossier shape (the 41 required keys and the optional keys read — the dossier the only data input, item 125 (a)) | every `DossierDigest` field and the derivation row it feeds; its fallback column → the generator's own choice and a `field_fallback` note (item 125 (b)); `AdapterManifest.keyList`; T-V8-20's ignore clause; §6.5 (3)'s key-list lint | §7.7 item 1's closed-digest rule and never-read reasons |
| W23 | `AdapterManifest`, `AdapterRegistry` (2.4) | each `adapters/sf/<line>/` folder | `digest`'s adapter choice (3.8); `recognise`; the lint's key list | §14 port, lint; item 508 |
| W24 | the catalogue manifest `catalogue.<line>.json` with `ladderPairs` and the crisis census `crisis` (2.4) | the adapter's build step, from the pinned line's catalogue, ladder file and crisis vocabularies | V11's `coversManifest` totality and its ladder cross-check (V11 registry row 77, T-V11-2); V11's compile check of the `crisis.map` rows (T122-4); T-V8-59 | §14's lint |
| W25 | `PortNote.msg` and `.keys`, each kind's class (2.4, 4.6) | the port — `digest`, `creation`, `absorb`; `custom_resolved` and `unmapped_kind` after the fold, their `class` the class built at the document's rung, in V11's class `label` cell or a pin kind's `host.pinKind.<kind>` row | an `event` or new `standing` note → the ledger event's `notes` → V09 §4.10's absorb group; a `standing` note → `DossierBinding.notes` → `GenerationReport.dossierNotes` → the report panel (V09 §5.7); every note → `dossier.result.report` → `MapSession.on('report')` and `statusText` | §14 `PortNote`; item 508 |
| W26 | `dossierFacts.notes`, `.notesCleared` and `DossierBinding.notes` (2.3, 3.6 (4)) | the port run's notes, by class and identity | the fold (the binding's standing list); the history panel's group (4.6); every derivation's report build (`GenerationReport.dossierNotes`); replay, verification (3.3) | §7.1, §7.7 item 12, §2.9's dossier block, §5.4; item 390 |
| W27 | `GenerationReport.dossierNotes` (4.6) | every derivation's report build and the verification replay on load, copying `DossierBinding.notes` at the report's seq (`[]` unbound) | `report(h)` → V09 §5.7's report panel under `host.group.standing`; T-V8-14 | §5.4 `GenerationReport`; item 390 |
| W28 | the refusal's `reason` on `dossier.result.held` and `MapRecord.held` (2.1, 2.2, 3.9) | the port's `held` note on a refused offer (a `host.held.*` row) | the tab's banner and the frame's held notice (5.1, 3.1 step 7 (b)); the thumbnail slot at a refused creation | §11.3; item 472 |
| W29 | digest additions of V08 §2.5 — `role`, `security`, `government.legitimacy`, the ladder fields, `site.ruinEvidence`, `site.threats`, `site.latitudeDeg`, the extended economy, `calamities`, the history, the readiness, the traditions, the conditions' crisis fields, `forces`, `presentWeek` | the adapter, by W22's table | DR12, `PortValues`, DR29, DR30–DR33, DR36–DR44 (§7.7); §4.11's clock | §14 `DossierDigest`; item 509 |
| W30 | dossier row sets written out (2.6) | this volume's defaults, `@plat/tables` | `digest` and `creation` through the derivation rows | §14 item 7 `tables/dossier/*`; item 510 |
| W31 | the `kinds` shape with its pseudo-classes and `implies` column (2.6) | V11's rows per catalogue kind | DR24's first rung; DR7, DR2, DR17, DR19, S2's absent classes, §2.7's pins; DR1 at creation (a bridge-implying record) | §7.7 DR24; items 399, 510 |
| W32 | `tables/dossier/tags`, `categories`, `crime`, `cultures` (2.6) | this volume | the siting-profile lookup (item 103, V11's rows), DR24's fallback, `PortValues.crime`, DR29 | items 391, 510 |
| W33 | key-law rows for the port's own singletons and pairs — `trade`, `port-values`, `deity`, `evidence`, `history`, `site`, `relation:`, `cond:stress:`, `chain:cat:`, `dep:`, `calamity:`, `trad:` (2.3) | `digest` | binding rows, `DossierRef.element`, the carried map | §7.7 item 12 (the key law; the custom keys item 256) |
| W34 | the staged records' fill — `ConditionOverlay`, `DepositSite`, `PowerRelation`, the dossier-backed `Person` (3.11) | `creation`'s prefix and `absorb`, by `dossierRecord` puts and retires | §4.11's Works share and land-use conversions, §4.5's typing, item 72's political component, the renderer (5.2), the clerk | §2.7 (the records, their building volume V08), §7.1 `dossierRecord`; items 358, 395 |
| W35 | `PortValues` on `CircumstanceSlice.port` (2.5) | `creation` (the creation slice) and the cadence's epochs (3.6) | the readers of `PortRows.crime`, `.hinterland`, `.legitimacy` (§4.6, §4.9, II.7.3, II.7.5, §4.5 (6)); DR2's waterfront (`threats`); the slice's threat V06's walls read (`readiness`, item 114) | §7.7 layer 2, §10.2; item 389 |
| W36 | the `threats` row → `PortValues.threats` (2.5, 2.6) | the adapter over stressors, conditions, trade partners, access, terrain and population | DR2's waterfront through V11's `WaterfrontThreatRow` (item 106 (d)); V07's watchtower row | §7.7 DR2 |
| W37 | the `wealth` diff row → `EpochInputs.wealthLevel` (3.5) | the carried `port-values.wealth` word against the new digest's `wealth.label` (receipt F9) | DR6 at the next epoch through `tables/dossier/wealth`; V06's MEANS for item 114 (V06 W27, W89) | §7.7 DR6, receipt F9 |
| W38 | the frozen-fact rows `site` and `history` (3.5) | the carried `site` and `history` facts against the new digest | one `frozen_fact_changed` note (class report, `host.note.frozen_fact_changed`); nothing else | §7.7 item 10 (the site and the history are creation's); DR1's creation bar |
| W39 | `HistoryHint` fill (3.11) | `creation` from `history` | `Recipe.history` → S2's stage count, II.7.6 | §2.9 `Recipe.history`; §2.7 `HistoryHint` |
| W40 | DR29 latitude (3.5) | `site.culture` through `tables/dossier/cultures`, else 50° N (item 125 (b)) | `Intent.latitudeDeg` at creation → item 102's model-side sampler (V05), V06's drift, V07's village sweeps | §7.7 DR29; item 391 |
| W41 | coverage inside a collective range (3.5) | item 103 (f)'s coverage row | DR9's count draw | §7.7 DR9; item 392 |
| W43 | calamities → `EpochInputs.events` (3.6) | `calamityHistory[]` through the digest; the carried `calamity` keys | V06's hazard phase (DR28); V04's burial growth (the deaths) | §4.11 `EpochInputs`; items 388, 393, 573 |
| W44 | stressors → `cond:stress:<type>` overlays (3.11) | the digest's normalised `stressors` | the `conditions` row's readers; DR44's crisis looks through the `stressor` row of §10.2's `crisis.map` | §2.7; item 358 |
| W45 | the port's reserved session `host:port` (3.6) | the port | §7.4's stacks (never a user's), V09's undo tooltip | §7.1; item 359 |
| W46 | the notables' `importance` (2.5, 3.11) | the adapter from `npcs[].importance` | V10's people answer and V09's person card, which order a settlement's notables by it; no model rule reads it | §2.7 dossier-backed `Person` |
| W47 | a derived land use — a `DepositSite` under `res:derived:<landuse>` (2.6 `deposits`, 3.11) | the port's creation prefix and `absorb`, from a record whose class carries a hard `near` → `landuse:<k>` row within 0 on a dossier that lists no deposit opening `<k>` | S12a's site and land use (DR19); V07 §3.9's village claim; the class's hard row, met | §7.7 DR19; §2.7 `DepositSite`; item 508 (`derived_landuse`) |
| W48 | `DossierInstitution.step`, `.lesser`, `.popQualifier`; the ladder merge (2.5, 3.5.1) | the adapter; V11's `dossier.ladders` and its `identity` cells | DR9's member counts; V01's quarter records; V06's ladder steps (V06 §3.9.11); V10's members answer; the count parity (7.3); at village rungs V07 §2.4's range rows, DR9's members, V07 §3.10's QUARTER end claim and a pin lesser's churchyard `cross`; for a REPLACEMENT greater of a new thing, DR9's `assign` (at a village rung V07's records placement), the fortification path for a `@wall` greater | §7.7 T9, DR9; item 509 |
| W49 | `economy.chains` extended; carried `chain`, `dependency`; the goods lists (2.3, 2.5) | the adapter, V11's `goodWords`, the `chainStatus` row | DR33 → the supply web (item 105 (i)); V01's district supply term; V06's link re-binding at epochs; V07's village links and entry store | §14 `DossierDigest`; items 509, 390 |
| W50 | row sets `relations`, `historyScars`, `magic`, `era`, `materials`, `customWeights`, `isolation`, `chainStatus`, `dependencySeverity`, `calamitySeverity`, `qualifiers`, `threats`, `ruinEvidence`, `readiness`, `climates`, `historyEvents`, `festivals` (2.6) | this volume | `PowerRelation` (§4.5, item 72), `HistoryHint`, `CircumstanceSlice.magic` and `.era`, V11's material rows, `PortRows.customKinds`' numbers, S12a, the supply web, T9 and DR9, DR2, V04's ruin rule, the need and the generation-time condition (item 114), the biome's climate row (item 117), DR37's event mapping (item 113), the festival kind (item 118) | item 510 |
| W51 | `site.ruinEvidence` (2.5, 2.6a) | the adapter | V04 §3.5.0a's ruin existence and centre; V05's node term through V04's `ruinCentre()` | DR30; item 509 |
| W52 | DR30–DR32, the burial and crypt trace (2.6a) | the adapter; V11's `kinds` and `ladders` rows | V04's ruin, cavern and catacomb rules; V03's crypts; V06's epochs | §7.7 DR30–DR32; item 398 |
| W53 | DR34, the water system's inputs (2.6b) | the adapter (the records bound to `conduit_house` through V11's `kinds` and `ladders`, the demand records, the `site` row's words, the river DR1 gives, the `hot_springs` deposits, the culture); DR23's rung | item 110 (b)'s aqueduct reason (the base); V11's chance, need, cap and terminal rows; V06's epoch builds (V06 §3.19.6); V10's `why` | §7.7 DR34; item 398 |
| W54 | DR35, the high-ground landmarks (2.6b) | the dossier-bound institutions of class significance at least V11 §3.24.2's `elevated.landmarkMinSignificance` and the custom `landmark` records, at their S3 reservations | item 110 (b)'s elevated-road reason; V06's epoch builds (V06 §3.19.6); V10's `why` | §7.7 DR35; §10.2 significance; item 398 |
| W55 | the toll bridge's watercourse rule with its rung column (2.6b (3)) | a record whose `kinds` row implies a bridge; DR1's site; item 111's arid row; the access word; at village rungs S0's own water draw | DR1's forced course at creation (base rungs); V07 §3.1 (1), V07 §3.11 DR1 at village rungs; V11's toll-house `near` bridge row and `deckOk`; the report's `toll_bridge_dry` | §7.7 DR1; item 399; J-VI.17 |
| W56 | the aqueduct's link to its conduit house (2.6b (1) (e)) | item 110 (b)'s aqueduct, when the dossier's conduit house takes its terminal | the arches' fate and condition (the `impairments` row; V06's decay) | §2.7's raised way (`waterUse`); item 244; J-VI.9 |
| W57 | the culture's item-110 readers (2.6b (4)) | `site.culture` | V11's aqueduct culture modifier; DR15's template family → V11's stepped specialisations (item 110 (c); V11 §3.24.3) | §7.7 DR15 |
| W58 | generated item-110 content unbound; the removal hold (4.1, 4.3) | the base's item-110 generators; the DM's delete; an accepted clerk proposal | every absorb, epoch, rung change, re-key, upgrade, rebase and host undo (the slot stays closed); the history panel's lines (4.6) | §7.7 item 3; item 260; J-VI.14 |
| W59 | the port's consultation of `LadderRouter` (3.10) | the village product's `ProductDecl` in `StrategyRegistry.products` (V07 §2.1) | `creation` (the product and rung) and every `absorb` (whether the population lies in a registered range; the product at an epoch by V07 §2.1's fold; 0 routed to V07's desertion) | §1.1 `LadderRouter`, §4.11, PART III; items 202, 322 |
| W60 | the desert's water — the `site` row's `desert` with the arid chances, the `oasis_water` deposit (item 111; 2.6, 3.16 (1)) | `site.terrain`, `site.access`, the water deposits | S0's blueprint `oasis` (`on` with the deposit, `off` without), DR1's site, DR40's oasis; the toll bridge's failure condition (W55); V06's spring rules (a removed `oasis_water`, V06 W82) | §4.2 S0 *Water in dry country*; §7.7 DR1, DR40 |
| W61 | SettlementForge's history read (item 113; 3.15) | `history` (the founding, the events with their templates), `tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle stamps, the ancient-ruin marker, `peakTier` | `Recipe.history` (`HistoryHint`); DR36–DR39's inputs → §4.11's history-first generation (V06's replay), II.7.6's buried former settlement (V04); the `HistoryRecord`'s evidence (§2.7) | §7.7 DR36–DR39; §2.7 `HistoryRecord` |
| W62 | the defence readiness (item 114; 2.6 `readiness`, 3.16 (2)) | `defenseProfile.readiness.label` and `.score` (the one part of `defenseProfile` read) | the slice's threat V06's NEED reads (V06 §3.7.7); §7.7's DR41, the generation-time condition (item 114 (d)), with the wealth word (DR6) | §7.7 DR41; §2.7 `Enceinte.condition` |
| W63 | "specified" under the grandeur ceiling (item 115; 3.16 (3)) | the dossier-backed assignments whose class the ceiling table's `settings.grandClasses` lists (V11 §3.25.4); a dossier government whose `villageSeat` names the manor house, seigneurial or crown (V11 §3.21.1) | §4.7 S10b's rung ceiling and S2's manor count (§4.2 S2), which leave a specified building its full design (item 115 (c)); V07's manor rule (V07 §3.8); V10's note that it exceeds the tier's usual | §4.7 S10b (item 115); §10.2's ceiling table |
| W64 | SettlementForge's calendar and climate (items 117, 125; 3.16 (4)) | the digest's `presentWeek` — the dossier's latest stamped tick (V08 §3.16 (4)); `site.terrain` with the relief | §4.11's clock — the present at creation (§4.11 *The clock* (1)) and V08 §3.6 (3)'s `W₁`; §2.9's `week` default and, under the follow flag, DR42's year position; the biome's climate row by the `climates` row's terrain column (§4.2 S0) | §2.9 view state; §7.7 DR42; §4.11 *The clock* (1) |
| W65 | `traditions` and the custom-content traditions (item 118; 3.16 (5)) | the dossier's `traditions[]` and `customContentRoster`'s traditions bucket | the carried `trad:` facts → §7.7's DR43 (window and staging, item 118) → §8.2's decoration rows through §2.9's festival display; V09's festival list; V10's explanations | §7.7 DR43; §2.9 view state |
| W66 | the ledger's carried `history`, `readiness` and `trad:` facts (2.3) | `creation`, `absorb` | the frozen-fact row (W38), the slice's threat (W62), the festival schedule (W65) | §7.7 item 12 |
| W67 | the edge suite (3.17) | this volume's mechanisms at their limits and their combinations with every physical feature | T-V8-49 | §5's ladder |
| W68 | `dossierRecord` event (2.5) | `creation` prefix and `absorb` (3.11) | `ConditionOverlay`, `DepositSite`, `PowerRelation`, dossier-backed `Person`, `CustomChainRecord`, `CustomServiceRecord` records | §7.1, §7.4's row; item 358 |
| W69 | `DossierInstitution.custom` with `keywords` (2.8) | the adapter, from the dossier's custom instance and `customContentProvenance` | item 104 (a)'s resolution at fold (V11 §3.13.1's rungs; V08 §3.5 (5) (f)); DR10 | §14 `DossierInstitution`; item 511 |
| W70 | `DossierDigest.customChains`, `.customResources`, `.customServices` (2.8) | the adapter, from `economicState.customChains`, `config.nearbyResourceDefinitions`, `availableServices.*` | `creation` and `absorb` → `dossierRecord` puts (3.13) | §14 `DossierDigest`; item 511 |
| W71 | `CustomChainRecord`, `CustomServiceRecord` fields' rules (2.8) | `dossierRecord` events (3.13) | S10b's chain pulls and flow order (item 104 (b), (h); V11's rules); §10.3's sub-locations; the renderer and labels (5.2); the clerk's `why` (4.4) | §2.7 (the records); item 256 |
| W72 | the definition fields the dossier carries (2.8, 3.13 (8)) | the adapter, from the dossier's own `customContentRoster` and `customContentProvenance` entries at the revision it materialised (item 125 (a)) | `digest` → `customDefs` → the `custom-def` carried facts → item 104 (a) (5); absent, item 104's generic siting, noted `field_fallback` | §14 `DossierDigest`; item 511 |
| W73 | carried kinds `custom-def`, `custom-chain`, `custom-service` (2.8) | `creation`, `absorb` (the ledger event) | the diff (3.5): re-resolution on a new revision (item 104 (e)), a chain's activation change (item 104 (h) (7)) | §7.7 item 12; items 256, 390 |
| W74 | `Assignment.custom` (2.8) | the creation prefix; a `custom_revision` `setAttr` | item 104 (a)'s re-resolution at fold; the custom weights read from the `custom-def` fact; the clerk's `why` | §7.7 `Assignment`; item 394 |
| W75 | the host clerk (4.4) | SettlementForge's assistant, its map tools resolved in the DM's page (the relay) | `query`, `preview`, accepted `doc.changed` with `proposedBy: 'clerk'`; a player's assistant: the stored party gazetteer | §11.2 clerk tool API |
| W76 | `MapSession.setClerk`, `preview`'s `proposal`, `on('clerkNeedsToken')`, `on('clerkProposal')`, `on('clerkConfigRefused')` (2.2) | the host page (V10's `clerk.config`; SettlementForge's assistant's proposals, V08 §4.4 (3)) | the embed's bridge handler → `ClerkMount.host` (V09 §2.10): `clerk.config` to `config`/`onConfig` and `HostSlots.clerkMode`, `preview { proposal }` to `proposals`; the harness's `needsToken`, `refused` and `answer` posted back (V08 §3.1 step 7 (a); V10 §3.17) | §11.3; item 473 |
| W77 | drawing rows `condition.*`, `worked-out`, the `supplyChains` view, the `occupation` symbol, the export attributes, the gazetteer's `customChain` rows (5.2) | the staged and custom records | the renderer, the legend, GeoJSON; V09 §5.4's Show-menu entry **SettlementForge's chains** — a chain in each only when the key admits every joined node (V08 §5.2) | §8.2, §8.3, §9.2's admission table, §11.1, §11.2; item 410 |
| W78 | the host projection of V08 §5.4 (3) (the base's kinds; V10 §3.17's rows for the reader kinds) and `E_HOST_FORMAT`, `E_HOST_KIND` (5.4) | the module in host mode, applying it to every `query.result` and `preview` reply before it is posted out of the frame | SettlementForge's assistant through the host client, which carries no projection code; the stored party gazetteer; V10's configuration B prompts; the host's `export.request` (`doc.snapshot` exempt) | §11.2, §11.3; items 472, 473; T-V8-27 |
| W79 | the status banner and `statusText` (5.1) | `module.status` from the embed's glue | SettlementForge's tab container, the host's translation | item 472 |
| W80 | host mode of `embed.html` — chrome, locked dossier values, the header's actions, the players'-view strip (5.1; `HostSlots` by V08 §3.1 step 7 (b)) | `@plat/app` | the DM's and co-DM's frames | §14 `@plat/app`; item 507 |
| W81 | the party picture set and party gazetteer (3.14) | the module in an editing session's frame or the refresh frame, on the client's `party.render`: the party key resolved by V08 §3.14 (1), passed as `ExportOpts.knowledge` and as `admitAs` to every `gazetteer` and `people` query; returned in `party.rendered`, stored by `putPartyPictures` | the player's Map tab (`MapHost.mountParty`); the player's assistant | §11.1 *Knowledge*; §11.2 `query`'s `admitAs`; §14 audience table; items 472, 513, 572 |
| W82 | `party.render` / `party.rendered` (2.2, 3.14 (3)) | the client: at creation, after each absorb it commits, 30 s after a map edit batch it committed, after each `setParty`, at open when row B18 finds the stored set stale, and in the refresh queue | the module's party render (V08 §3.14 (1)–(2)); the reply's set → `MapStore.putPartyPictures`, then `host.state { partyPicturesAt }` | §11.3; item 472; T-V8-2, T-V8-41 |
| W83 | `MapRecord.party` and `setParty` (2.1, 4.2) | an owner's or editor's "Reveal to the party" and "Hide again" | the party picture set, the party gazetteer, the DM's "See what the players see" (through `host.state`) | §9.2's key; §14 audience table |
| W84 | `HostSlots.historyLines` (3.1 step 7 (b)) | the embed's bridge handler, from successive `host.state` values — the `party` differences and `partyPicturesAt` — named and targeted at the key the shell passes to `list` by `query`'s `entity` reads (`dossierKey` or `id`, `admitAs` that key), through the handler's per-key cache, dropped at each head move its one `subscribe` reports | V09 §4.10's "The party" group of the history panel, listed with `effectiveKey()` | V09 §2.2; items 572, 583 |
| W85 | `HostSlots.newDocuments: 'download'` (3.1 step 7 (b)) | the embed's bridge handler, a constant of host mode | V09 §3.9's host-mode rule for every action that makes a new document; a copy of a dossier-bound document is detached (V06 §4.4) | V09 §2.2 |
| W86 | the catalogue families `host.note.*`, `host.held.*`, `host.status.*`, `host.party.*`, `host.group.*`, `host.recovered.*`, `host.verify.mismatch`, `host.control.*`, `host.dialog.*`, `host.undo.*`, `host.playersView`, `host.mirror.dropped`, `host.frame.title`, `host.pinKind.*` (3.7, 3.9, 4.2, 4.6, 5.1) | this volume's words | `messages/en.json` (V09 §2.9, V09 §4.9) and the client's `statusText` defaults; T-V8-14's walker and V09's T-V9-15 | V09 §2.9's catalogue; item 516 |
| W87 | the chains' knowledge rule (5.2) | each joined node's `knownTo` and concealment (item 63), read against the view's effective key (V09 §2.10) or the export's knowledge key (§11.1) by §9.2's admission table as a band-less reader | the `supplyChains` drawing and its legend; the gazetteer's `customChain` rows, V09 §5.4's entry and the party gazetteer; the GeoJSON `supplyChain` feature and every picture export; T-V8-25 | §9.2 `knowledge.admit`; §11.1, §11.2 *Knowledge*; item 410 |
| W88 | the locale of the frame (5.5) | `MapHostConfig.locale` (SettlementForge's interface language, J121), carried in the frame's `src` | the shell's `messages/<locale>.json` when shipped, else the catalogue's source language; the client's `statusText` defaults | §14 *the interface languages* |
| W89 | budgets (6) and bars (7) | this volume | §12.6's stage row; §13.2's suite, §13.8's tiers; V06 §6.8's catch-up estimate and §12.10's R12-31 (the absorb-with-epochs row's catch-up batch, its costs and T-V8-63) | items 480, 486 |
| W90 | M-SF and its steps (8) | this volume | §16's staged pricing | item 529 |
| W91 | host harness `plat/tools/hostharness/` (7.2) | the fixture pairs, a mock host store that never decodes a byte | the T-V8 bars end to end | §13.2 B-DOSSIER-lite, §13.8 |
| W92 | release checklist (8.3) | the bars and the manifests | a release of the SettlementForge configuration | §13.3 milestone records |
| W93 | the fixtures' levels for V12 (7.1) | the surveyed-dossier pairs, the custom-chain variants, the catacomb fixtures, a high-ground landmark fixture | item 108 (f)'s `exactMonotone` levels (their `@pop×k` derivatives registered in the frozen manifest, a level outside [1 500, 120 000] `notApplicable`), item 104 (h) (8)'s levels, the step script's catacomb levels, the elevated road's `higherWith`; none a calibration seed family (V12 §1b, V12 §3.7.5) | §13.2 B-DOSSIER-lite |
| W94 | the dossier row sets as non-calibratable data (2.6) | this volume's defaults | V11 §3.1 rows 63–66 and 77 (`calibratable: false`), T-V11-37; no V12 register line (V12's R4) | §13.9 (7) |
| W95 | Find's dossier entries (item 120; 3.16 (6)) | the carried `institution` facts (2.3) with the binding rows (§7.7 item 12), read at each commit through §11.2's `gazetteer` query at the viewer's effective key | V09's Find panel — its list, type-ahead and chips, and the glow and pins of their matches (item 120 (b)–(f)); a dossier chip's key and anchor in §2.9's `find` key; T-V8-58 | §11.2 (`gazetteer`, *Knowledge*); §2.9's view key `find` (item 120 (a)) |
| W96 | the crisis census — every stressor type, condition archetype and simulator crisis event of the pinned line (item 122; 2.4) | the adapter's build step, from the pinned line's code at its commit, read-only, names only | V11's `crisis.map` rows and their compile check (T122-4); `digest`'s reading of each overlay's source (3.16 (7)); release row R9; T-V8-59 | §10.2 `RosterTables.crisis.map`; §7.7 DR44 |
| W97 | the carried condition's crisis fields — `name`, `event`, `calamity`, `arrivals`, `forces` (item 122, with (h); 2.3, 3.16 (7), (8)) | `digest`, from `activeConditions[]` (`label`, `triggeredAt.sourceEventType`), the calamities by week — `event` `calamity` for the one `none`-row condition a calamity's link gives the disaster look (3.16 (7) (b)) —, `populationHistory`, and the forces' records where the line carries them | DR44 — the `map` row of the overlay's source, the calamity's `targets` and type for V01's `disasterDistricts` and V02's ruined look, the headcounts for §10.2's camp scale; V09's crisis card, why lines and forces' numbers; V10's explanations; T-V8-59, T-V8-60 | §7.7 DR44; §2.7 `ConditionOverlay` |
| W98 | the field table's fallback column and the `field_fallback` note (item 125 (b); 2.4, 4.6) | `digest`, for every read row whose path is absent, empty or unreadable — the identity, population, seed, institution list and version stamps included (J-V8.134) | the generator's own choice for the field (each row's cell) at a creation, the carried fact kept at an absorb (V08 §3.5's diff); the host's report (`dossier.result.report`); T-V8-61 | §7.7 item 10 (the rows' fallbacks); §14 `PortNote` |
| W99 | the final local check's brief (item 125 (d); 3.16 (9)) | this volume | the program's final step — its table of matches, mismatches and fixes; SF0's census; release row R9 at a new line | — |
| W100 | the frame's minimum size; no map on a phone (item 126; 3.1, 3.16 (10)) | `@plat/bridge-client`'s `mount` and `mountParty`; SettlementForge's own device rule | the frame and the party viewer at no less than 600 × 480 CSS px, the tab scrolling; V09's medium layout inside the frame; T-V8-62 | V09 §4.12; item 126 (a2) |
| W101 | the host's view commands — `MapSession.setView` (`view.set { week }`, `view.set { select }`) and `MapSession.setLayer` (a logged `setLayer` by `doc.apply`, author `host`) (item 125 (c); 3.16 (4), (6) (g); the client, 2.2) | the host page, in an owner's or editor's frame | the frame's view — §2.9's `week` and the selection — and the document's style state, `LayerSpec.visible` through §7.1's `setLayer` (§8.4); T-V8-61 (b) | §11.3's view commands; §7.1 `setLayer` |

**The dossier trace.** Every SettlementForge path the port reads, the `DossierDigest` field it fills, the derivation
row it feeds and the fallback it takes where the dossier lacks it — or `ignored` with §7.7 item 1's reason — is V08 §2.4's
adapter field table, the one list; the dossier is the port's only data input (item 125 (a)), no fact is read from
outside the digest, and nothing an `ignored` row names is read (T-V8-20's ignore clause; T-V8-61's static check).
=== END ===

=== REPLACE ### 2.2 The bridge additions and the host client ===
### 2.2 The bridge additions and the host client

The envelope, transport, `re` correlation, source-window check, before-`ready` queue and the port's and the clerk's
vocabulary — which messages exist, who may send each and what each does — are §11.3's (items 472, 473). The message
TYPES are this volume's, and the host client's API:

```ts
// host → PLAT (owner or editor sessions only for dossier.offer, doc.snapshot, host.state and party.render: §11.3)
type DossierOffer = { type: 'dossier.offer'; body: {
  dossier: unknown;              // the whole dossier object, structured-cloned; never a change list (§7.7 item 1)
  dossierHash: string;           // the client's hashDossier(dossier) (V08 §3.2)
  host?: { line?: string /* MapHostConfig.line: SettlementForge's running line, which V08 §2.4's selection checks, never chooses from */ };   // the one HostContext field an offer carries (§14): no data input — the dossier is the only one (item 125 (a))
  create?: { mapId: string } } };   // only when the host has no map record for this settlement
type DocSnapshotRequest = { type: 'doc.snapshot'; body: {} };   // creation, compaction, upgrade, rebase (V08 §3.7)
type HostState = { type: 'host.state'; body: {         // session memory only (§11.3; V08 §3.1 step 7 (c))
  party?: { tier: 'public' | 'local'; places: string[]; rev: number };   // MapRecord.party as stored: after each doc.load and whenever the host's copy changes
  backups?: { logHead: string; at: string }[];         // MapRecord.backups' heads, newest first: the restore dialog lists the map edits after backups[0].logHead (V08 §4.2)
  partyPicturesAt?: string;                            // partyPictures.at: the history panel's "pictures last drawn" (V08 §4.6)
  playersView?: boolean } };                           // MapSession.seePlayersView(on) (V08 §3.14 (5))
type PartyRender = { type: 'party.render'; body: {
  party: { tier: 'public' | 'local'; places: string[]; rev: number };   // MapRecord.party as stored: resolved by the module (V08 §3.14 (1))
  since?: { seqAt: number; partyRev: number; outputVersion: string; drawDigest: string } } };   // the stored set's stamp: the unchanged test (V08 §3.14 (3))
// base messages extended (§11.3): doc.load gains audience?: AudienceWord; doc.changed gains encoded: ArrayBuffer[] (each event's canonical CBOR, in order),
//   seqAfter: number, logHeadAfter: string; export.request's opts carries displayNames and knowledge (§11.2's ExportOpts), and export.request gains
//   bundle?: true (the export bundle's scene route from M-SF, V08 §5.4 (2)); ready gains protocol and adapters (§11.3)
// PLAT → host
type DossierResult = { type: 'dossier.result'; re: number; body: {
  status: OfferStatus;
  dossierHash: string;           // echoes the offer's
  baseLogHead?: string;          // 'absorbed': the head the events were computed on — the host appends only if it is current
  events?: EditEvent[];          // 'absorbed': the dossier events and epochs, author 'host', session 'host:port', in log order (§7.7 items 1, 6)
  encoded?: ArrayBuffer[]; seqAfter?: number; logHeadAfter?: string;   // 'absorbed': what the store appends and the head it moves to
  created?: SnapshotBlock;       // 'created': the new document and its metadata
  factHash?: string; week?: number | null;   // the carried facts after this result (§7.7 item 12)
  report: PortReport;            // §14's, with V08 §2.4's notes
  held?: { code: PortRefusalCode; message: string; reason: { key: string; args?: Record<string, string | number> } /* the `held` note's msg (V08 §3.9) */ } } };
type DocSnapshotReady = { type: 'doc.snapshot.ready'; re: number; body: SnapshotBlock };
type ModuleStatus = { type: 'module.status'; body: {
  phase: 'booting' | 'loading' | 'verifying' | 'ready' | 'absorbing' | 'held' | 'upgrade-available' | 'error';
  detail?: string /* a host.* catalogue key drawn beside its phase's row: B10's host.recovered.*, B20's host.verify.mismatch (V08 §3.9); else absent */;
  progress?: number /* 0–1 */; outputVersion?: string } };
type HostAction = { type: 'host.action'; body: {       // a header control's click, from an owner's or editor's frame only (V08 §4.2)
  action: 'refresh' | 'restore' | 'newMap' | 'reveal' | 'hide' | 'partyTier' | 'assistantSettings';
  args?: { places?: string[] /* reveal, hide: the selected places, PartyKnowledge.places' form */;
    undo?: true /* restore party.prev: "Hide again" (hide), "Reveal again" (reveal), the tier's undo (partyTier) */; tier?: 'public' | 'local' /* partyTier */ } } };
  // surfaced as MapSession.on('action'); the host runs the V08 §4.2 row's operation with its existing calls; the client drops, and reports, an action whose row the role does not hold
type PartyRendered = { type: 'party.rendered'; re: number; body:   // its set's partyRev is the request's party.rev (V08 §3.14 (3))
  { status: 'rendered'; set: PartyPictureSet /* stored as handed with MapStore.putPartyPictures */ } | { status: 'unchanged' /* nothing stored */ } };
type AudienceWord = 'dm' | 'co-dm' | 'player' | 'anonymous' | 'gallery' | 'dm-share';   // §14's audience table's left column; only 'dm' and 'co-dm' ever load a document
```

`Admission` is item 572's type (`'public' | 'local' | 'secret' | { tier: 'public' | 'local'; places: Id[] }`), generated
from `@plat/api`'s bridge schema like every message type: it lowers the requester's key for one export and never raises
it — a tier alone is read with the requester key's places, a key form is a key in its own right (§11.1 *Knowledge*).

The **host client** is the one piece of our code in SettlementForge's bundle — dependency-free, its message types
generated from `@plat/api`'s bridge schema at build time and copied, never imported (item 507):

```ts
// @plat/bridge-client
interface MapHostConfig {
  moduleOrigin: string;          // the origin serving embed.html: SettlementForge's hosting decision, read as an input (J121; V08 §11 Q1)
  embedPath: string /* '/embed.html' */; protocol: 2;
  bootTimeoutMs: number /* 20 000 */; replyTimeoutMs: number /* 60 000 for dossier.result and doc.snapshot.ready, 15 000 otherwise */;
  backupDepth: number;           // integer ≥ 0: how many previous snapshots a record keeps — SettlementForge's backup decision (J121; V08 §11 Q2); read by replaceSnapshot (V08 §3.7)
  quotaBytes?: number;           // the storage a map record may use under the account's plan — SettlementForge's save-limit decision (J121); absent: none checked (V08 §3.7)
  locale?: string;               // BCP 47: SettlementForge's interface language for this user (J121); the frame's message catalogue (V08 §5.5); absent: the catalogue's source language
  line?: string;                 // the SettlementForge line the host runs (§14 item 1), sent as every offer's host.line, which V08 §2.4's selection checks, never chooses from; absent: nothing is checked
  store: MapStore;               // the host's implementation of the record's reads and compare-and-set writes
  statusText?: Record<string, string> }   // the host's own strings for host.* keys; the defaults are generated from V09's host.* catalogue in the frame's locale
interface MapStore { read(settlementKey: string): Promise<MapRecord | null>;
  commitEvents(mapId: string, expectedHead: string, encoded: Uint8Array[], seqAfter: number, logHeadAfter: string, absorbed?: MapRecord['absorbed']): Promise<'ok' | 'stale'>;
  replaceSnapshot(mapId: string, snapshot: SnapshotBlock, backupDepth: number): Promise<'ok' | 'stale'>;
    // precondition: snapshot.logHead is the record's head or the logHeadAfter of an event in its tail; keeps the tail's suffix after it; with backupDepth ≥ 1 moves
    // the old snapshot to backups[0] with the removed segment as tailAfter and drops the oldest beyond backupDepth; with 0 keeps none (V08 §3.7)
  create(record: MapRecord): Promise<'ok' | 'exists'>; putThumbnails(mapId: string, t: MapRecord['thumbnails']): Promise<void>;
  setParty(mapId: string, expectedRev: number, party: PartyKnowledge): Promise<'ok' | 'stale'>;
  putPartyPictures(mapId: string, pics: PartyPictureSet): Promise<'ok' | 'older'>;   // 'older' (nothing written) when the stored set's (seqAt, partyRev) pair is not lower than this one's
  setStatus(mapId: string, patch: Partial<Pick<MapRecord, 'status'|'held'|'lastOffer'|'refreshPending'|'refreshing'>>): Promise<void> }
interface MapHost { mount(el: HTMLElement, s: MountSpec): Promise<MapSession>;   // audience 'dm' or 'co-dm' only; any other word is refused before a frame exists
  mountParty(el: HTMLElement, s: { settlementKey: string }): Promise<PartyView>;   // a player's tab: stored pictures only, no frame, no module (V08 §3.14)
  refresh(queue: { settlementKey: string; dossier: unknown }[], o?: { signal?: AbortSignal; onEach?: (k: string, s: OfferStatus) => void }): Promise<void>;   // V08 §3.4
  hashDossier(dossier: unknown): Promise<string>;   // V08 §3.2
  audience(word: AudienceWord): { role: 'owner'|'editor'|'viewer'|null; knowledge: 'public'|'secret' } }   // §14's table
interface MountSpec { settlementKey: string; dossier: unknown; audience: 'dm' | 'co-dm'; session: string }   // the dossier is the only data the map takes from the host (item 125 (a))
interface MapSession { offer(dossier: unknown): Promise<OfferStatus>;
  exportPicture(fmt: 'png'|'svg'|'print', o: { knowledge?: Admission; displayNames?: Record<string, string>; opts?: unknown }): Promise<ArrayBuffer>;
  exportScenes(o: { formats: ('dd2vtt' | 'foundry')[]; knowledge?: Admission; displayNames?: Record<string, string>; opts?: unknown }): Promise<{ file: string; blob: Blob }[]>;
    // from M-SF (J122; V08 §11 Q3): the chosen scene exports as opaque blobs for SettlementForge's export bundle, packaged unread (V08 §5.4 (2))
  query(q: unknown): Promise<unknown>;   // the host clerk (V08 §4.4): the answer arrives ALREADY projected by the module (V08 §5.4 (3)); the client holds no projection code
  preview(events: unknown[], o?: { view?: boolean; proposal?: HostProposal /* item 473's proposal body, generated from the bridge schema */ }): Promise<unknown>;   // the reply projected as query's
  setParty(p: { tier?: 'public'|'local'; reveal?: string[]; hide?: string[]; prev?: true /* restore party.prev */ }): Promise<'ok'|'stale'>;
    // owner or editor: writes MapRecord.party, then re-renders the party pictures (party.render, V08 §3.14 (3)) and re-sends host.state { party }
  seePlayersView(on: boolean): void;   // posts host.state { playersView: on }: a display filter (V08 §3.14 (5)); no view-state write, no store write, no event
  setClerk(config: ClerkConfig /* item 473's clerk.config body, generated from the bridge schema */): void;   // sends clerk.config
  setView(patch: Record<string, unknown>): void;   // view.set: a view command over the keys that travel — a week ({ week }) and a selection ({ select }) (§11.3; item 125 (c)); a layer's visibility goes as a logged setLayer by doc.apply (§8.4) — setLayer below; never an input, and the map never needs one
  setLayer(layer: Layer, visible: boolean): void;   // an owner's or editor's layer command (item 125 (c); §11.3): posts doc.apply { baseLogHead, events: [{ t: 'setLayer', layer, spec: { visible } }] } with author 'host', which the frame folds and commits by V08 §3.7's path as a user's toggle; a viewer audience sends none (style events are the owner's and editor's, §11.3)
  on(ev: 'status'|'report'|'selected'|'action'|'clerkNeedsToken'|'clerkProposal'|'clerkConfigRefused', h: (x: unknown) => void): () => void;
    // action: a host.action body (V08 §4.2); clerkProposal: clerk.proposal { id, status, seqs? }; clerkConfigRefused: clerk.config.refused { reason } (item 473)
  switchTo(s: MountSpec): Promise<void>;   // reuses the frame (V08 §3.1); the same fields as mount
  close(): void }
interface PartyView { refreshFromStore(): Promise<void>; close(): void }   // pan and zoom over the stored levels; the caption host.party.asOf (V08 §5.1)
```
=== END ===

=== REPLACE ### 2.3 The binding in practice — the carried facts and their hash ===
### 2.3 The binding in practice — the carried facts and their hash

`DossierBinding` — with the port's fields `adapter`, `quarantined`, `lateCalamities` (the held late calamities, V08
§3.6 (3)) and `notes` and the `absorbed` retention (item 390) — `CarriedFacts` and the key law are §7.7 item 12's.
This volume owns the carried shape, the port's own keys, the fact hash and the binding row's life.

```ts
// the carried value per element kind: exactly the digest subset the diff compares (V08 §3.5), canonical field order
type CarriedFact =
  | { k: 'settlement'; name: string; tierWord: string; population: number; wealth: string /* wealth.label (receipt F9; V08 §3.5's `wealth` row) */ }
  | { k: 'institution'; name: string; kindLabel: string; kind?: string; category: string; role?: string; tags: string[]; count?: [number, number]; openTop?: boolean;
      step?: LadderStep /* V11 §2.6 */; lesserOf?: string /* the greater's key when this record was merged as its member (item 108 (c)) */; popQualifier?: number;
      districtScale: boolean; facets: DossierInstitution['facets']; forbidden: string[]; state: DossierInstitution['state']; fate?: string; inactive: boolean;
      impairments: { type: string; severity: number; covert: boolean }[]; knownTo?: 'public'|'local'|'secret'; renamedFrom?: string; members?: number /* a collective record's placed count, a map fact kept for the member keys */ }
  | { k: 'power'; name: string; category: string; standing: number; governing: boolean; controlled: string[] }
  | { k: 'relation'; kind: string /* the line's type word */; trend: string /* stable, declining, escalating */; sign: -1 | 0 | 1; strength: number; hidden: boolean }
  | { k: 'notable'; name: string; role: string; category: string; power?: string; institution?: string; importance?: string; status?: string; replaced?: string }
  | { k: 'condition'; archetype: string; source: 'condition' | 'stressor'; severity: number; severityBand?: string; status: string; sinceWeek?: number; untilWeek?: number;
      name?: string /* the condition's label */; event?: string /* the simulator crisis event that raised it (V08 §3.16 (7)) */; calamity?: string /* the carried calamity it follows */;
      arrivals?: number; forces?: { kind: 'army' | 'group'; heads: number; coalition?: string; allegiance?: string; groupKind?: string; name?: string }[] /* the headcounts the dossier gives (V08 §3.16 (8)) */ }   // the crisis fields: read by DR44 through the overlay's key, a look only (item 122)
  | { k: 'resource'; state: 'available'|'depleted'|'removed'|'discovered'; custom: boolean }
  | { k: 'quarter'; name: string; phrase: string; landmarks: string[] }
  | { k: 'government'; name: string; governingPower?: string; legitimacy?: number }
  | { k: 'trade'; partners: { key: string; relationship: string }[]; links: { good: string; flow: 'import'|'export'; partner: string }[]; entrepot: boolean;
      goods: { exports: string[]; imports: string[]; transit: string[] } /* goods keys after goodWords (V08 §3.5 (6)) */; incomeShares: Record<string, number> }
  | { k: 'port-values'; crime: number | null; importPct: number | null; foodChain: Record<string, boolean> | null; legitimacy: number | null;
      threats: string[] /* the `threats` row's neutral keys, sorted */;
      readiness: string | null /* the `readiness` row's neutral band (item 114; V08 §3.16 (2)) */ }
  | { k: 'deity'; key?: string; name?: string }
  | { k: 'chain'; needKey: string; resource?: string /* a res: key, else 'name:'+name */; processors: string[] /* binding keys, else 'name:'+name, flow order */;
      outputs: string[] /* goods keys, sorted */; upstream: string[] /* chain:cat: keys */; status: string /* the neutral key (V08 §2.6 `chainStatus`) */; entrepot: boolean }
  | { k: 'dependency'; severity: number /* by `dependencySeverity` */; affected: string[] /* the services it names, sorted */ }
  | { k: 'calamity'; type: string; week: number; deaths: number; severity: 'minor'|'moderate'|'major'|'catastrophic'; targets: string[] /* binding keys */ }
  | { k: 'evidence'; kinds: string[] /* the ruin-evidence kinds present, sorted (V08 §2.6 `ruinEvidence`) */ }
  | { k: 'site'; terrain: string; access: string; threat: string; magic: string; culture: string; isolation?: string /* frozen after creation (§7.7 item 10; V08 §3.5) */ }
  | { k: 'history'; ageYears: number | null; atWeek: number | null /* the dossier's present week when ageYears was read (V08 §3.16 (4)) */;
      events: string[] /* `<type>:<slug(name)>` of history.events, sorted */; ancientRuin: boolean /* frozen after creation (V08 §3.15) */ }
  | { k: 'tradition'; name: string; kind: string; weeks: [number, number]; staging: string[]; deity?: string };   // item 118 (V08 §3.16 (5))
```

**Keys of the carried map.** §7.7 item 12's binding keys for settlement, institution (a collective record once, its
members `#k` in the binding rows only), power, notable, condition, resource, quarter and government, and the custom keys
(item 256); the port's own singletons — `trade`, `port-values`, `deity`, `evidence`, `site`, `history` — and pairs:
`relation:<a>|<b>` for a power relation (its two power keys in code-point order, §2.7's `PowerRelation.key`; unordered,
because the line's pair order is not a direction — J-V8.52); `cond:stress:<type>` for a stressor (it has no id);
`chain:cat:<chainId>` for one of SettlementForge's own chains (disjoint from the custom `chain:<chainId>`, V08 §2.8);
`dep:<institution key>|<slug(resource)>` for a dependency; `calamity:<week>:<slug(name)>` for a calamity;
`trad:<id>` for a tradition (its record id, else `trad:name:<slug(name)>`). A power's `rename-faction` re-keys its relation
keys by the same `rebind` that re-keys the power (V08 §3.6 (5)), never a removal and an addition.

**`factHash`** = H128 over the canonical CBOR of the carried map, keys sorted by code point, numbers as the digest holds
them (a severity rounded to 1/1 000, a standing to 1/10 000 — the digest's own rounding, V08 §3.5 (2)), so a dossier whose
only change is below that resolution hashes equal. **Retention of `absorbed`:** every entry keeps `{ seq, week,
factHash }` forever (16 B of hash each: a century of weekly absorbs is under 100 KB, and a host's undo can match any of
them, F22); `changeIds` stay on the newest 64 entries only, and the trim is **part of the fold** — folding a
`dossierFacts` event appends its entry and then removes `changeIds` from every entry older than the newest 64 — so the
stored block and the block the fold rebuilds from the log are equal at every seq (§2.9's load check; T-V8-5). The report
reads older change ids from the log's `dossierChange` envelopes.

**A binding row's life.** *Create*: `creation` writes one row per dossier element it placed or carried (collective
members `#1…#n`, n the placed count; a ladder lesser merged into its greater, item 108 (c), becomes a row of the greater's
members — or, where the greater is a new thing, an alias row on it, or the row on the churchyard `cross` a pin lesser binds
at a village rung, V08 §3.5.1 (c)); `absorb` writes a row for each addition. *Read*: `factTier` (§2.8), the diff, the
oracle's answers (V08 §4.4). *Persist*: the dossier block (§2.9), outside the model digest. *Regenerate*: a scoped
regeneration re-places members under their addresses (§6.3), so rows follow the addresses and never change. *Undo*: a
dossier event is no undo target (§7.4); a map `undo` that would un-place a dossier element is refused (§7.7 item 2), so a
row never dangles. *Migrate*: rebuilt from the log's dossier events at first load (§7.5); an adapter-version remap or a
line migration re-keys rows by V08 §3.8 and writes a `line_migrated` note. A row whose element is removed keeps its key
and its entity (the retired assignment), so a re-opening re-binds to its own former building (F6).
=== END ===

=== REPLACE ### 2.4 The adapter manifest, the registry, the field table and the port's notes ===
### 2.4 The adapter manifest, the registry, the field table and the port's notes

Each `adapters/sf/<line>/` folder (§14) exports one manifest beside its pure digest function (item 508):

```ts
// @plat/port
interface AdapterManifest { id: 'sf'; line: string /* the canonical id, the folder name: 'fp-integration-2026-09-23' (item 512) */; version: string /* the adapter's semver */;
  commit: string /* the SF commit it was cut against: '5d699cc68' */;
  requiredKeys: string[] /* the top-level keys every dossier of the line carries (below) */;
  optionalKeys: { key: string; read: boolean }[] /* keys a lived or custom dossier may add; read: false → dropped and noted ignored_key */;
  keyList: string[] /* every host path the adapter reads, receipt paths included: the field table's read rows (below), §14's lint list */;
  recognise(raw: unknown): { accept: boolean; evidence: string[] } /* pure; reads only keyList paths: every requiredKeys key present, schemaVersion 1 and
     simulationVersion 1 where readable — an empty or unreadable stamp is no evidence either way, its field-table fallback taken (below) —, the institution
     record shape where `institutions` holds records; the `id`'s form is no evidence (an unreadable `id` takes its row's fallback); an EXTRA top-level key is
     accepted — never a refusal */;
  limits: { maxBytes: number /* 8 MiB of JSON */; maxDepth: number /* 32 */; maxRecords: number /* 2 000 institutions, 500 notables, 200 of any other list */; maxString: number /* 16 KiB */ };
  vocabulary: Record<string /* a tables/dossier/* table */, string /* the table version this adapter's words were written against */>;   // release row R2 checks it against the fixtures' tablePins
  remaps: { fromVersion: string; fields: { kind: CarriedFact['k']; path: string /* a CarriedFact field */ }[] }[];   // digest changes between adapter versions (V08 §3.8)
  fromLines: { line: string; keys: { rule: 'identity' } | { rule: 'table'; rows: { from: string; to: string }[] } }[] }   // binding-key migration from an earlier line (V08 §3.8)
interface AdapterRegistry { register(m: AdapterManifest, digest: (raw: unknown, host?: HostContext) => PortResult<DossierDigest>): void;
  select(raw: unknown, o: { line?: string /* HostContext.line: SettlementForge's running line, checked, never chosen from (below) */; bound?: string /* the document's DossierBinding.adapter.line; absent at creation */ }):
    { status: 'ok'; manifest: AdapterManifest; defaulted?: boolean /* line_defaulted */; differs?: string /* the named line, registered and accepting, that the selection did not take: line_differs */ }
    | { status: 'refused'; code: 'E_UNKNOWN_SHAPE' | 'E_LINE_UNSUPPORTED'; candidates: string[] } }
```

`E_OTHER_SETTLEMENT`, the port's note kinds and `PortNote`'s `msg` and `keys` are §14's (item 508). A note's IDENTITY is
the first 16 hex digits of H128 over the canonical CBOR of (kind, msg, keys sorted); its CLASS — event, standing or
report — and its words are V08 §4.6's table's, and the class decides where it is kept (V08 §3.6 (4)). This volume adds
four kinds for its new readings, each with its class and row in V08 §4.6: `frozen_fact_changed` (report; a later dossier
changes a creation-only fact, V08 §3.5), `history_gap` (report; a history the replay needs is missing — a demoted dossier
without `peakTier`, or no age — V08 §3.15), `field_fallback` (report; a field the port reads that the dossier lacks,
leaves empty or gives unreadable, the field table's fallback taken — item 125 (b); its `detail` names the fallback) and
`line_differs` (report; `HostContext.line` names a registered, accepting line the selection did not take — below).

**The first line's key sets** (CONFIRMED on the 35 births and 12 after-tick dossiers generated on the pinned line;
`research/sf/dossier-outputs.md` §3). `requiredKeys` — the 41 keys every birth carries: `_config`, `_seed`,
`activeConditions`, `aiOverlays`, `arrivalScene`, `availableServices`, `coherenceNotes`, `config`, `conflicts`,
`culturalIdentity`, `culturalNotes`, `defenseProfile`, `economicState`, `economicViability`, `factions`,
`generationCoherenceReceipt`, `generatorVersion`, `history`, `id`, `institutions`, `isolationSupport`, `name`,
`neighborRelationship`, `npcs`, `population`, `powerStructure`, `pressureSentence`, `prominentRelationship`,
`relationships`, `resourceAnalysis`, `schemaVersion`, `settlementReason`, `simulationTrace`, `simulationVersion`,
`spatialLayout`, `stress`, `stressors`, `structuralSuggestions`, `structuralViolations`, `tier`, `userCanon`.
`optionalKeys`, read: `customContentProvenance`, `customContentRoster`, `populationHistory`, `resourceHistory`,
`tierHistory`, `institutionHistory`, `calamityHistory`, `traditions` (item 118); not read: `urbanFabric` and `npcLadder`,
with a saved dossier's `mapEdits` and an older save's `fogSessions` (the field table's `ignored` rows). A lived dossier
carries 41 to 47 keys (one week: `populationHistory`; a year:
`resourceHistory` too; the lit year: `calamityHistory`, `npcLadder`, `traditions`, `urbanFabric`), and every one is
recognised (T-V8-31). An unknown top-level key — one neither list names, a later line's addition — is accepted, dropped
by `digest` into `ignored` and noted `ignored_key`; the release checklist (R9) adds it to a list when the fixtures show it.

**THE ADAPTER'S FIELD TABLE** (fp-integration-2026-09-23). Every SettlementForge path the port reads, the
`DossierDigest` field it fills, the derivation row or reader it feeds and its **fallback** — what the map takes where the
dossier lacks the path or leaves it empty or unreadable: the generator's own choice, exactly as on a map made without a dossier, never
a refusal or a stall, reported by one `field_fallback` note per field (item 125 (b); J-V8.130); every path the port does
not read — and every SettlementForge source it never reads that lies outside the dossier, written with no dossier path —
in an `ignored` row with §7.7 item 1's reason. The dossier is the port's only data input (item 125 (a)): no row reads a
host field — the week, the realm and a custom library are no inputs (item 125 (a); J-V8.130). A required key's own absence is no absent
field but a shape the line never writes (refused by `select` at V08 §3.5 step 1, B3); its fallback serves an empty or unreadable value.
A fallback's value serves a creation; at an absorb a field that takes its fallback changes nothing, the carried fact
standing — a row's own path; a record's absent or unreadable sub-field is read by its row and compared (V08 §3.5) —,
and an empty list is read as listing nothing (V08 §3.5's diff). A
fallback is noted only where a mechanism reads the field in that run. It is the one list: `AdapterManifest.keyList` is its read rows, §14's key-list lint and
T-V8-20's ignore clause read it, and the CLOSED-DIGEST RULE holds — inside a record the port reads, a field no row names is
not read (§7.7 item 1).

| SettlementForge path | digest field | feeds | fallback (absent, empty or unreadable) |
|---|---|---|---|
| `id` | `settlement.key` (`settlement:<id>`) | §7.7 item 12's key law; `E_OTHER_SETTLEMENT` | empty, or not of the line's form (`s_` + 16 hex): at an absorb the bound document's settlement key (its `settlement:` binding row, §7.7 item 12), the offer naming its map, `E_OTHER_SETTLEMENT` not checked for that offer; at a creation a key minted from the creating map's id, `settlement:map:<mapId>` (the offer's `create.mapId`, V08 §3.3), kept for the document's life — a later readable `id` neither replaces it nor is checked against it; noted (J-V8.134) |
| `name` | `settlement.name` | the title plate (§9.5); DR14's protected names | the generator's own name for the settlement (§10.4 by `site.culture`, DR14), noted — at an absorb, the carried value (V08 §3.5) |
| `tier` | `settlement.tierWord` | §9.5's title word (§7.7 item 15); receipt F8 | the rung's own word for the population (DR23; §9.5), noted — at an absorb, the carried value (V08 §3.5) |
| `population` | `settlement.population` | DR23; DR2, DR5, DR7, DR9, DR17, DR27; `LadderRouter` (V08 §3.10) | DR23's one input, read as a whole number ≥ 0 (0 is V08 §3.6 (7)'s; one above the 120 000 cap — 10⁷ and beyond included — is refused `E_RUNG_UNAVAILABLE` naming the cap, B7, §1.1, a readable value never taking the fallback): empty, negative, fractional or no number → the default request of the tier word's rung (its `populationTarget`, §1.1's ladder: the generator's own choice at that rung), else the one-click default's 5 000 (§1.2), noted (J-V8.134) — at an absorb, the carried value (V08 §3.5) |
| `_seed` | `settlement.seed` (H32, §14's port item 2) | the recipe's seed; the host's seed itself never stored | empty, or neither a string nor a finite number: H32 of the settlement key (`H32("plat:sf-seed" ‖ settlement.key)`, V08 §3.5 step 9), noted (J-V8.134) |
| `schemaVersion`, `generatorVersion`, `simulationVersion` | `settlement.versions` | `recognise`; V08 §3.8's version checks | an empty stamp, or one not of the line's form: no evidence for `recognise` — the adapter by the selection without it (the bound line's, else the single adapter whose `recognise` accepts the dossier's shape, else the newest registered line; below) — noted `field_fallback` and `line_defaulted` (J-V8.134) |
| `config.terrainType` | `site.terrain` | DR1 (the `site` row), DR17 (`mountain`), DR19, DR31, DR34, DR39's bare rock, DR40; item 117's climate by the `climates` row's terrain column (DR42; V08 §3.16 (4)) | plains, the `site` row's `else` (DR1), its climate `temperate` by the `climates` row's terrain column |
| `config.tradeRouteAccess` | `site.access` | DR1, DR2, DR3 (the `access` row); the toll bridge's access word (V08 §2.6b (3)) | `road`, the `access` row's `else` |
| `isolationSupport.status`, `.paths[].type` | `site.isolation` | DR19 (the `isolation` row) | no isolation: §4.9's defaults |
| `config.monsterThreat` | `site.threat` | DR2 (the `threat` row); item 114's need | 0.3, the `threat` row's `else` |
| `config.magicLevel` | `site.magic` | `CircumstanceSlice.magic` (the `magic` row); DR27 | `none`, the `magic` row's `else` |
| `config.cultureProfileKey` | `site.culture` | DR1, DR5, DR14, DR15, DR29 (the `cultures` row); DR41 (the patch rows), DR43 (the decorations' colours and motifs); the `era` row (V08 §2.6); DR34's culture modifier | the blueprint's own culture, as on a map made without a dossier (§4.2 S0); DR29's 50° N; the `era` row's `c14` |
| `config.nearbyResources`, `.nearbyResourcesNative`, `.nearbyResourcesDepleted`, `.nearbyResourcesState`, `config.nearbyResourceDefinitions` | `site.deposits`; `customResources` (V08 §2.8) | DR1 (the water deposits), DR17 (the mining deposits), DR19, DR27 (`magical_node`), DR30, DR31, DR32 (`stone_quarry`), DR34 (`hot_springs`), DR40 (`oasis_water`); `DepositSite` | none: no deposit and no land use beyond §4.9's rings; no oasis (DR40) |
| `config.peakTier` | `history.peakTier` | DR36 (V08 §3.15) | the evidence order of V08 §3.15 (3) (the documented gap) |
| `config.primaryDeitySnapshot` (`_deityRef`, `name`) | `religion.deityKey`, `.deityName` | DR14 (the temple's dedication); the `deity` fact; receipt F16 | no dedication: the principal temple named by §10.4 (DR14) |
| `institutions[]` — `id`, `name`, `catalogId`, `category`, `priorityCategory`, `tags`, `status`, `inactive`, `worldPulseFate`, `remnantReason`, `impairments[]` (`type`, `severity`, `causeEventId`, `covert`), `knownTo`, `facets`, `forbiddenResources`, `foundedAt`, `demotedFrom`, `promotedFrom`, `createdByEventId`, `removedByEventId`, the `…ByWorldPulseOutcomeId` stamps, and the custom fields of V08 §2.8 | `institutions[]` (every `DossierInstitution` field, V08 §2.5); `walls` (the `@wall` kinds' records); `receipts` | DR1 (a record whose `kinds` row implies a bridge), DR5 (the district-scale records), DR7 (the housing record's range), DR9, DR10, DR12, DR15–DR18, DR20, DR24, DR25, DR27, DR30–DR36; item 108's ladders; DR2 (`walls`); receipts F1–F5, F15 | none, or a value that is no list (read as absent, noted; J-V8.134 — at an absorb, the carried value, V08 §3.5): no dossier-bound use — S2's roster programmes the town from its population, as standalone (§4.2 S2); a record's own absent field takes its row's `else` (V08 §2.6) |
| `economicState.prosperity` | `wealth.label` | DR6, DR7 (the `wealth` row), DR9, DR27; V08 §3.5's `wealth` row; DR41's MEANS (V08 §3.16 (2)) | `Moderate` (0.5), the `wealth` row's `else` |
| `economicState.incomeSources[]` (`source`, `percentage`) | `economy.incomeSources` | layer 2's economy slice (the `sectors` row; item 78) → DR7, DR13; DR3's toll and duty rows | layer 2's standalone economy (§7.7: the blueprint and our rows) |
| `economicState.primaryExports`, `.primaryImports`, `.necessityImports`, `.transit`, `.isEntrepot`, `.tradeLinks[]` | `economy.exports`, `.imports`, `.transit`, `.entrepot`, `.tradeLinks`, `.goods` | DR3, DR4; the supply web's trade ends (DR33); the `trade` fact; receipt F14 | none: layer 2's derived partners, one per through route of the access row (DR3) |
| `economicState.compound.inst.hasWalls` | `walls.flagged` | DR2 | unflagged: DR2 by the access row, the population and `threat` |
| `economicState.foodSecurity.importPct`, `.chains` | `economy.foodImportPct`, `.foodChains` | DR19; `PortValues.importPct`, `.foodChain` (§4.9) | null: the table's neutral (`PortRows.hinterland`) |
| `economicState.activeChains[]`, `.tradeDependencies[]`, `.customChains[]` | `economy.chains`, `.dependencies`; `customChains` | DR33 → the supply web (item 105 (i)); DR10 (an element's chains and dependencies); DR27 (the custom and active chains a sky fill carries); `CustomChainRecord` (V08 §2.8) | none: no SettlementForge link; the supply web's own rules (item 105 (a)–(h)) |
| `economicState.safetyProfile.blackMarketCapture`, `powerStructure.criminalCaptureState` | `security` | `PortValues.crime` (the `crime` row) → the crime scalar DR16 and DR17 read (item 88) | null, the `crime` row's neutral |
| `neighborRelationship`, `neighbourNetwork[]` | `economy.partners` | DR3 (`TradePartner.relationship`); the `threats` row | none: layer 2's derived partners (DR3) |
| `powerStructure.government`, `.publicLegitimacy.score` | `government.name`, `.governingPower`, `.legitimacy` | DR11 (the `government` row), DR27; `PortValues.legitimacy`; item 115's lord (V08 §3.16 (3)); receipt F11 | chartered commune, the `government` row's `else`; no governing power; legitimacy null |
| `powerStructure.previousGovernments[].tick` | `receipts`, under the government's binding key | §4.11's first dating rung for a change of government (receipt F11); the rest of each entry is ignored (below) | no rung: the next of §4.11's dating rungs |
| `powerStructure.factions[]` (`faction`, `category`, `power`, `isGoverning`, `controlledInstitutions`), `powerStructure.factionRelationships[]` (`pair`, `type`, `direction`) | `powers[]` with `relations` | DR10 (the power association), DR11, DR12, layer 2's `PowerStanding` (item 79); `PowerRelation` (the `relations` row); receipt F10 | layer 2's standalone powers (item 79; our rows) |
| `npcs[]` — `id`, `name`, `role`, `category`, `factionAffiliation`, `institution`, `importance`, `status`, `replacedBy` | `notables[]` | the dossier-backed `Person` (V08 §3.11), DR22's exception (a notable is the dossier's, never derived from the households); `importance` → the order of V10's people answer and V09's person card; receipt F17 | none: every person derived (DR22) |
| `spatialLayout.quarters[]` (`name`, `location`, `landmarks`) | `quarters[]` | DR5's quarter claims (§7.7 item 16; the `quarters` row), DR6's quarter hints, DR10's landmarks (the `landmarks` row), DR14 | none: districts named by DR14 |
| `activeConditions[]` (`id`, `archetype`, `label`, `severity`, `severityBand`, `status`, `triggeredAt.tick`, `triggeredAt.sourceEventType`, `duration`) | `conditions[]` with their crisis fields (V08 §3.16 (7)) | `ConditionOverlay` (the `conditions` row); DR21; DR44's crisis looks (the `archetype` or `event` row of §10.2's `crisis.map`); receipt F12; the present week | none: no overlay and no crisis look; a missing `label` no name, a missing `duration` no `untilWeek`, a missing `sourceEventType` the `archetype` row (V08 §3.16 (7)) |
| `stressors` (null, one object or an array) | `stressors`, normalised into `conditions[]` (`source: 'stressor'`) | `ConditionOverlay` (`cond:stress:`); DR44 (the `stressor` row of `crisis.map`); the `threats` row | none (null): no overlay |
| `history.age`, `.founding.age`, `.historicalEvents[]` (`type`, `templateType`, `yearsAgo`, `severity`, `name`, `anchored`, `tick`) | `history` | `HistoryHint` (the `historyScars` row); DR30, DR32; DR36–DR39 (the `historyEvents` row; V08 §3.15) | the `tiers` row's midpoint age, noted `history_gap` (V08 §3.15 (5)); no events: no scar, no replay |
| `tierHistory[]` (`fromTier`, `toTier`, `direction`, `outcomeId`) | `history.tiers` | DR36's evidence; DR37; receipt F8 | none: no evidence (V08 §3.15 (3)) |
| `populationHistory[]` (`tick`, `population`) | `history.population` | DR36's evidence; DR37; DR7's week; a condition's `arrivals` (V08 §3.16 (8)); the present week | none: no evidence; DR7's week from the next rung; no `arrivals` |
| `calamityHistory[]` (`name`, `type`, `tick`, `deaths`, `exodus`, `targets`) | `calamities` | DR28 (`EpochInputs.events`); DR36's evidence; DR37 (V08 §3.15 (2)); DR44's disaster look — a linked condition's calamity, its `targets` and type (V08 §3.16 (7)); receipt F5; the present week | none: no epoch event (DR28) and no calamity behind a disaster look |
| `institutionHistory[]` (`tick`, `year`, `fate`), `resourceHistory[]` (`tick`, `state`) | `receipts` | the receipts' weeks (F1–F3, F13) | no rung: the next dating rung |
| the root's `destroyedByEventId`, `lifecyclePatch` | `history.lifecycle` | DR38 (V08 §3.15); receipt F20 | none: no destruction or refounding (DR38) |
| `defenseProfile.readiness.label`, `.score` | `defence.readiness` | DR41 (item 114's generation-time condition) and V06's need (V08 §3.16 (2)) — the one part of `defenseProfile` read | null: the threat alone decides need (the `readiness` row) |
| `traditions[]` (`id`, `name`, `type`, `window`, `staging`, `deity`) and `customContentRoster.traditions` | `traditions` | DR43 (V08 §3.16 (5)) | none: no festival (DR43) |
| `customContentProvenance`, `customContentRoster` (institutions, services, resources, supply chains) | `custom`, `customDefs`, `customServices`, `customResources` | item 104 (V08 §2.8, V08 §3.13); DR24 (a custom record's admitted definition fields) | none: no custom content; a definition whose fields the dossier does not carry has no `custom-def` fact — item 104's generic siting supplies them (V08 §3.13 (8)) |
| `availableServices` (its `custom` entries) | `customServices` | `CustomServiceRecord` (V08 §2.8) | none: no custom service |
| the present week (item 125 (b)): the greatest of `activeConditions[].triggeredAt.tick`, `calamityHistory[].tick` and the history's ticks — `history.historicalEvents[].tick`, `populationHistory[].tick`, `institutionHistory[].tick`, `resourceHistory[].tick`, `powerStructure.previousGovernments[].tick` | `presentWeek` | §4.11's clock — the present at creation (§4.11 *The clock* (1)) and V08 §3.6 (3)'s `W₁`; V08 §3.11's condition weeks; V08 §3.15's tick reading; §2.9's `week` default and DR42's year position (V08 §3.16 (4)) | none stamped: §4.11's clock starts at week 0 and the year position is the user's season control (midsummer, week 19) |
| the armies — each force's headcount and allegiance (item 122 (h)) — IN DEVELOPMENT in SettlementForge, no path at `5d699cc68`; the adapter version that reads them writes its paths in this row, confirmed by the final local check (V08 §3.16 (9)) | `conditions[].forces` entries of kind `army` (`heads`, `allegiance`; V08 §2.5) | DR44's camp scale by headcount, each army its own camp in its own colours (§10.2 *Crisis looks* (c), (f)); V09's forces' numbers | the condition's or calamity's own counts — its `arrivals`, its calamity's `exodus` — else item 122 (b)'s scale by severity and tier; noted only where a look that scales by headcount stands |
| the coalitions — the armies each alliance joins (item 122 (h)) — IN DEVELOPMENT, as the armies' row | the `coalition` key of each `army` entry (V08 §2.5) | §10.2 *Crisis looks* (f): a coalition's armies each pitch their own camp, spread round the town | none: each army stands alone |
| the travelling groups — each group's people and kind (migrants, pilgrims, a caravan; item 122 (h)) — IN DEVELOPMENT, as the armies' row | `conditions[].forces` entries of kind `group` (`heads`, `groupKind`; V08 §2.5) | DR44's camp scale by headcount at the same rate (§10.2 *Crisis looks* (c)); V09's forces' numbers | as the armies' row |
| `urbanFabric`; `mapEdits` (the legacy map's container — on every saved dossier at least its `{ layoutLawVersion: 2 }` stamp); `fogSessions` (an older save's reveal sets, kept inert) | `ignored` | none — a host's own map-side layers (§7.7 item 1) | — |
| `worldState.spatialLedgers.*` — every sub-ledger, the spatial substrate included | — (no dossier path: SettlementForge's campaign state, its frozen `spatialDigest` included — no input, item 125 (a)) | none — a host's own map-side layers (§7.7 item 1) | — |
| SettlementForge's derived reads — the district profile, the map profile, the causal state, the system state, capacities, daily life, threat profiles, the spine | — (no dossier path: SettlementForge computes them on read or keeps them outside the dossier) | none — a host's derived reads (§7.7 item 1) | — |
| `simulationTrace`, `aiOverlays`, `generationCoherenceReceipt`, `config.priority*` | `ignored` | none — the host's generation log, internals and sliders (§7.7 item 1) | — |
| `relationships`, `prominentRelationship`, `conflicts`, the top-level `factions` (the NPC social groups), `npcLadder` | `ignored` | none — the host's NPC social groups and the NPC layer beside them (§7.7 item 1) | — |
| `_config` | `ignored` | none — raw inputs: the resolved `config` is read (§7.7 item 1) | — |
| `resourceAnalysis`, `defenseProfile` (all but `readiness`), `stress` (the alias of `stressors`, read once as `stressors`) | `ignored` | none — copies of institution records and generation scores (§7.7 item 1): the deposits come from `config.nearbyResources*`, the walls from the `@wall` kinds rows, the defence from `monsterThreat` | — |
| `coherenceNotes`, `structuralViolations`, `structuralSuggestions`, `economicViability` | `ignored` | none — the host's own verdicts (§7.7 item 1) | — |
| `userCanon`; the lived `campaignState.eventLog`, `_userEdits`, `dmLayer`, `locks` | `ignored` | none — the lived keys (§7.7 item 1) | — |
| `arrivalScene`, `culturalIdentity`, `culturalNotes`, `pressureSentence`, `settlementReason`, `spatialLayout.layout`, `spatialLayout.tradeAccess` (the access word's prose; the word itself is `config.tradeRouteAccess`) | `ignored` | none — prose beyond a description seed (§7.7 item 1) | — |
| `powerStructure.previousGovernments[]`, every field but each entry's `tick` | `ignored` | none — no mechanism of the set reads a past government (J-A73.06) | — |

**Selection** (J-V8.9, J-V8.133). The dossier's own shape and version stamps select the adapter in every case, in order:
(1) the document's bound line (`bound`), when its adapter accepts — a map stays on its line until a `fromLines` migration
moves it (V08 §3.8); (2) else the single registered adapter that accepts; (3) else, with several accepting — at a creation, or at an
absorb whose bound line's adapter refuses — the NEWEST registered line, recorded in the binding and noted
`line_defaulted` (at an absorb, a move by its `fromLines` row, V08 §3.8) — a declared default the report shows, never a
silent guess; when none accepts, `E_UNKNOWN_SHAPE` listing up to 20 violations (B3) where the dossier lacks a required
key of every registered adapter — no dossier of any registered line: a required key absent, §14's hand-made teaching
file, an offer without a dossier — else `E_LINE_UNSUPPORTED` naming the candidates (B5). An empty or unreadable version stamp is
no evidence either way: the selection runs without it, noted `field_fallback` and `line_defaulted` (the stamps' row
above). `HostContext.line` — SettlementForge's running line (`MapHostConfig.line`), the one host field the port reads, no
data input (item 125 (a)) — is checked, never chosen from: a named line no registered adapter supports, or one whose
adapter refuses the dossier (the dossier's own stamps contradict it), refuses `E_LINE_UNSUPPORTED` (B5); a named line that
is registered and accepts but differs from the selection leaves the selection standing, the report naming both lines
(`line_differs`, class `report`, so the document never holds it). With several registered lines accepting one dossier —
whose version stamps a line's dossiers may share with another's (V08 §3.8) — the dossier's own selection still decides,
so one dossier makes the same document and hash with and without a host context (item 125 (e); T125-2; T-V8-61). The
first registered adapter is `fp-integration-2026-09-23` pinned at `5d699cc68` (J86 Q1; §14).

**The catalogue manifest.** The adapter's build step writes
`plat/packages/tables/src/dossier/catalogue.fp-integration-2026-09-23.json` — each catalogue kind's `catalogId`, name,
tiers and category, read from the pinned line's catalogue, and `ladderPairs: { greater: string; lesser: string[] }[]`,
the ladder file's pairs as data (V08 §3.5.1 (f)) — which V11's `coversManifest` check (every kind has a `kinds` row) and
its ladder cross-check (every committed pair has a `dossier.ladders` row; V11 registry row 77, T-V11-2) read. It also
carries **the crisis census** (item 122; J-V8.128): `crisis: { stressors: string[]; archetypes: string[]; events: string[]
}` — every stressor type of the line (fifteen, fourteen of them seen in the fixtures), every condition archetype it defines
(`war_pressure`, `famine`, `plague`, `regional_migration_pressure`, `rebellion`, `occupation`, `reconstruction`, `boom`,
`bust`, `resource_strike`, `vein_exhausted`, the `regional_*` archetypes, and the rest the `conditions` row names, V08
§2.6) and the simulator's crisis events that raise a condition (`PLAGUE`, `REFUGEE_WAVE`, `RAID_OR_MONSTER_ATTACK`), read
from the pinned line's code at its commit as names — which V11's compile check of §10.2's `crisis.map` rows reads, so
every census word has exactly one row, a look kind or `none` (T122-4's compile clause, V11's; its census clause, T-V8-59). It
carries names, tiers, categories, pairs of names and vocabulary words only; no SettlementForge code is copied.
=== END ===

=== REPLACE ### 2.7 Lifecycle of every new state field ===
### 2.7 Lifecycle of every new state field

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `MapRecord` (2.1) | the host at first commit of a `created` result, every field from the message | the client at mount, offer, refresh | the host's store, compare-and-set on `logHead` | n/a (host data) | a DM's "restore previous map" swaps in `backups[0]` (V08 §4.2), then every open session gets a fresh `doc.load` | the client's record schema version; the host migrates by the client's release notes |
| `MapRecord.backups` (2.1) | `replaceSnapshot`, up to `MapHostConfig.backupDepth` | the restore dialog (through `host.state`), B10's second rung | the host's store | n/a | the restore row (V08 §4.2) | a record holding more than a lowered `backupDepth` is trimmed, oldest first, at its next compaction; a raised depth fills as compactions occur; depth 0 keeps none (B10 falls to its third rung; the restore control hidden) |
| `MapHostConfig`'s SettlementForge inputs — `moduleOrigin`, `backupDepth`, `quotaBytes`, `locale`, `line` (2.2) | SettlementForge's page, from its own product decisions (J121) and its running line | the frame's `src` and CSP (3.1), `replaceSnapshot` (3.7), the size check (3.7, 6), the catalogue (5.5), every offer's `host.line`, the selection's check (2.4) | never stored by us: the host's configuration | n/a | n/a | a changed value applies from the next mount; a document never records it |
| the `dossier.*`, `module.status`, `host.state`, `host.action`, `party.render` and `party.rendered` messages (2.2) | client or module per V08 §3 | the other side | never stored | n/a | n/a | the bridge's `protocol` number in `ready`; an unknown type is ignored and reported (§11.3) |
| `exportScenes` blobs (2.2, 5.4 (2)) | the module's scene exporters on `export.request { bundle: true }`, from M-SF | SettlementForge's export-bundle writer, unread | never by us: SettlementForge's bundle | re-requested per bundle | n/a | the exporters' own format versions (§11.1) |
| host-minted `docId` (2.1) | the host at creation | `generate`, `logHead` | the document (§2.9) | kept | n/a | none |
| `DossierBinding.adapter` (2.3) | `creation` | `absorb` (V08 §3.8) | the dossier block | rebuilt from the log's last dossier event's `DossierRef.version` and the port's report | n/a (no undo of dossier events) | rebuilt at first load (§7.5) |
| `DossierBinding.quarantined` (2.3) | `digest`, `absorb` (V08 §3.9) | the next absorb's diff (skips these keys), the report, T-V8-9 | the dossier block | kept | n/a | rebuilt by folding the `dossierFacts` events, each carrying the whole list after its absorb (V08 §3.6 (4)) |
| `DossierBinding.lateCalamities` (§7.7; 2.3) | written by folding `dossierFacts`, which carries the whole held list after its absorb: a late calamity carried by an absorb whose week is not after the last epoch's joins it, and the first epoch a later absorb folds carries and drops it (V08 §3.6 (3), with the ledger event of (4)) | the port's next absorb, whose first folded epoch carries each held calamity at that epoch's first week (V08 §3.6 (3)) | the dossier block, with the binding | rebuilt by the fold | n/a (no undo of dossier events: a dossier event is no undo target, §7.4) | absent in an older document: `[]`; an older ledger event without the field folds as `[]` |
| `absorbed` retention (2.3) | each committed absorb | F22's match, the report | the dossier block | kept | n/a | the fold trims `changeIds` older than the newest 64 entries, so the stored block equals the rebuild |
| `CarriedFact` (2.3) | `creation`, `absorb` | the diff | the dossier block | kept | n/a | remapped by V08 §3.8 |
| carried `chain`, `dependency`, `calamity`, `evidence`, a relation's `trend` and `sign`, a condition's `source` and crisis fields (`name`, `event`, `calamity`, `arrivals`, `forces`), `port-values.threats` and `.readiness`, the settlement's `wealth`, and the `site`, `history` and `tradition` kinds (2.3) | `creation`, `absorb` | the diff (V08 §3.5); DR44 reads a condition's crisis fields through its overlay's key | the dossier block | kept | n/a | absent in an older document: filled at its next absorb as a declared remap with no map event (V08 §3.8); a calamity dated at or before the last absorbed week is carried with no event (the map never saw it happen); a `site` or `history` fact filled so writes no `frozen_fact_changed` note; a `port-values.latitudeDeg` or `site.climate` an older document carries is dropped at its next absorb by the same declared remap (item 125 retired their producers) |
| `AdapterManifest` and the adapter's field table (2.4) | each adapter folder | `select`, `digest`, remaps; §14's key-list lint; T-V8-20 | the package | n/a | n/a | a new version declares `remaps`, a new line `fromLines`; the field table is re-cut with the adapter |
| digest additions (2.5): `role`, the ladder fields, `security`, `legitimacy`, `site.ruinEvidence`, `.threats`, `.latitudeDeg`, the extended economy, `calamities`, the history fields, `defence.readiness`, `traditions`, the conditions' crisis fields with their `forces`, `presentWeek` | the adapter | the rows of V08 §3.5; DR2, DR9, DR28–DR44; §4.11's clock | carried by the kinds above | n/a | n/a | as the carried kinds |
| `dossierRecord` records (2.5) | `creation` prefix, `absorb` | §2.7's readers, the renderer, the clerk | the model (records in the digest, §2.7) | kept (records, not derived) | never an undo target (§7.4) | none (new) |
| `CircumstanceSlice.port` (2.5) | `creation` (first slice), the cadence's epochs | the staged rows' readers by the value-in-force rule; V06's need (item 114) | the recipe and `EpochInputs` | read at the epoch that carries it | no event of the port's session `host:port` — a port epoch with or without dossier events among them — is an undo, redo or revert target (§7.4 *Replay semantics*) | absent in older slices, and `readiness` absent in a slice written before it: reads null (the table; the threat alone); a slice written under an output version before item 125 replays under its own version (§6.4), and an `upgrade` drops its `latitudeDeg` (§7.5's diff shows any move) |
| row sets of 2.6 | this volume's defaults | `digest`, `creation`, `absorb` | `@plat/tables`, pinned in the recipe | a table edit re-derives by §7.6 | an `editTable` undo (§7.4) | table versions (§6.4) |
| the `kinds` row's `implies` column (2.6, 2.6b) | V11's rows | DR1 at creation only | `@plat/tables`, pinned in the recipe | a table edit re-derives by §7.6 at an `upgrade`, never at an absorb (the site is creation's) | an `editTable` undo | table versions; absent → no implied feature |
| a derived `DepositSite` (`res:derived:<landuse>`; 2.6, 3.11) | the creation prefix or an absorb's `dossierRecord` put, when a record needing the land use is present and no deposit opens it | S12a (DR19), V07 §3.9, the renderer and labels as any `DepositSite` (5.2) | the model (a record, §2.7) | kept (a record); S12a's derived fields recomputed | never an undo target (§7.4) | none (new): a document made before it gains the site at its next absorb, placed by least disruption |
| DR34 and DR35's inputs (2.6b) | the adapter and the pinned rows, from facts already carried | item 110 (b)'s reasons at creation and at every epoch | nothing new: read from carried facts and bound uses | re-read at each regeneration and epoch | n/a | none |
| the aqueduct's link to its conduit house (2.6b (1) (e)) | item 110 (b)'s laying of the aqueduct | the fate and condition rules of 2.6b (1) (e) | the model (the raised way's `waterUse`, item 244) | kept while both stand; a re-laid aqueduct re-links | the log's | a document without it has none |
| a removal of generated item-110 content (4.1, 4.3) | the base's delete of generated content (a DM's, or an accepted clerk proposal's) | every regeneration, absorb and epoch: the slot stays closed | the log (the delete event) | held; a new slot opened by a later cap increase is new and announced (4.6) | the log's undo re-opens the slot | §7.5's mapping hands the tombstone to its successor |
| `DossierInstitution.custom` with `keywords` (2.8) | the adapter | item 104 (a)'s resolution at fold (V08 §3.5 (5) (f)) | carried (the institution fact's `custom` part) | n/a | n/a | absent in an older document: filled at its next absorb as a declared remap, no event (V08 §3.8) |
| `customChains`, `customResources`, `customServices` (2.8) | the adapter | `creation`, `absorb` | carried facts, and the records they put | kept | n/a | a document made before them carries none: every present one is an `add` at the next absorb, placed by least disruption, upstream first |
| `CustomChainRecord`, `CustomServiceRecord` (2.8) | `dossierRecord` put | S10b's chain pulls (item 104, V11), §10.3's sub-locations, the renderer, labels, the clerk | the model (records in the digest, §2.7) | kept (records, not derived) | never an undo target (§7.4) | none (new) |
| the definition fields the dossier carries (`customContentRoster`, `customContentProvenance`; 2.8) | the adapter, at the revision the dossier materialised (item 125 (a)) | `digest` → `customDefs` | never stored as read: they become `custom-def` facts | n/a | n/a | the entry shape is versioned with the adapter (`AdapterManifest.version`) |
| `custom-def` facts (2.8) | the ledger event (`dossierFacts`) | the resolution at fold, replay and re-derivation; the custom weights (V08 §3.11) | the dossier block | kept | n/a | remapped by the adapter's declared `remaps` (V08 §3.8) |
| `Assignment.custom` (2.8) | the creation prefix's `assign` of a custom record; a `custom_revision` `setAttr` | the fold's re-resolution (V08 §3.13 (10)); the clerk's `why` | the model (the assignment) | kept | never (a dossier event) | absent on an older document: written by the next absorb's `setAttr`, a declared remap |
| `MapRecord.party` (2.1) | `create` (`{ public, [], 0 }`); `setParty` by an owner or editor | the party picture render and gazetteer (V08 §3.14); the frame's copy through `host.state` | the host's store, compare-and-set on `party.rev` | n/a | "Hide again" restores `party.prev` (one step; older reveals are undone by hiding them) | an older record without it reads `{ public, [], 0 }` |
| `MapRecord.partyPictures` (2.1) | `putPartyPictures` with a `party.rendered` reply's set (V08 §3.14 (3)) | `mountParty`'s viewer; the player's assistant (the gazetteer) | the host's store | re-requested (`party.render`) whenever its `logHead`, `partyRev` or `outputVersion` differs from the record's, and replaced unless the module answers `unchanged` (its `drawDigest`) | n/a (derived pictures) | absent: the viewer shows the public thumbnail and "The DM has not opened this map yet" |
| `MapRecord.refreshing` lease and `backups[0].tailAfter` (2.1) | the refresh queue; `replaceSnapshot` | another device's queue; B10's second rung | the host's store | n/a | n/a | absent in an older record: the lease is free; B10 falls to its third rung |
| `MapRecord.held.reason`, `dossier.result.held.reason` (2.1, 2.2) | the port's `held` note on a refused offer (V08 §3.9) | the banner and the frame's held notice (V08 §5.1); the thumbnail slot at a refused creation | the host's store, beside `held`, as handed | replaced by the next refusal; cleared with `held` | n/a | an older `held` without it shows `host.status.held` with the row of its `code` (E_RUNG_UNAVAILABLE: `.village`) |
| the frame's `host.state` copy, its `HostSlots.historyLines` and the players' view (`ViewOpts.viewAs` set to the party key) (2.2, 3.1 step 7, 3.14 (5)) | the client's `host.state` after each `doc.load` and each change of `party`, `backups` or `partyPictures.at`; the lines from the differences of successive values, their names and targets read per key into the handler's cache (dropped at each new line and at each head move its one `subscribe` on the loaded document reports, §11.2; J-V8.109, J-V8.110); `playersView` from `seePlayersView` or the header's toggle | the header's controls, the restore dialog, the history panel's party lines (V09 §4.10's group), §9.2's filter for the frame's drawing, labels and reads | never: the session's memory and the view's options, no view-state key, no store write, no event | re-sent after every load, restore, new map and `switchTo`; the players' view re-resolved on a new `party` and on an absorb that changes the binding rows; the handler's `subscribe` registered at each `doc.load` and released at `close` and `switchTo` | the same toggle | none (new with protocol 2; a client of another protocol is refused at `ready`, V08 §8.3 R4) |
| `host.action` (2.2, 4.2) | the frame's header controls (owner, editor) | the client → `MapSession.on('action')` → the host's operation (V08 §4.2) | never stored | n/a | each row's own undo (V08 §4.2) | the bridge's `protocol` |
| `PortNote.msg`, `.keys` (2.4) | the port, with each note it writes (`custom_resolved` and `unmapped_kind` after the fold, V08 §3.6 (4); their `class` words V11's `label` cell or a pin kind's `host.pinKind.<kind>` row) | the history panel, the report panel (through `GenerationReport.dossierNotes`) and the host's report (V08 §4.6); T-V8-14 | with the note: the ledger event (`event` and new `standing` notes), `DossierBinding.notes` (`standing`), `dossier.result` only (`report`) | a re-derivation re-renders the stored `msg`; the port recomputes notes only when it runs | n/a (no undo of dossier events) | a note stored before these fields reads `msg` `{ key: 'host.note.<kind>' }` with no args and `keys: []` |
| `dossierFacts.notes`, `.notesCleared` (3.6 (4)) | each port run, in its ledger event | the fold; V09 §4.10's absorb group | the log (the event) | replayed by fold | n/a | an older ledger event without them folds as `notes: []`, `notesCleared: []` |
| `DossierBinding.notes` (2.3) | the fold of each ledger event: the old list less `notesCleared`, plus the `standing` notes of `notes`, in identity order | every derivation's report build (into `GenerationReport.dossierNotes`), the report panel's read by `report(h)` (V08 §4.6); the next absorb's new-or-cleared test (V08 §3.6 (4)) | the dossier block | rebuilt by fold | n/a | absent in an older block: `[]`, so the next absorb carries every standing note as new |
| `GenerationReport.dossierNotes` (4.6) | every derivation's report build and the verification replay on load: `DossierBinding.notes` at the report's seq, in identity order; `[]` for a document with no binding | the report panel's dossier section through `report(h)` (V09 §5.7; V08 §4.6); T-V8-14 | the document's `derived` section with the rest of the report, outside the canonical form and every digest (§5.4) | rebuilt with the report by every derivation | none of its own: an undo's re-derivation rebuilds the report, and the binding it copies is no undo target | a report saved without it shows `[]` until the verification replay on load rebuilds it |
| the view's season and festival defaults read from the dossier (3.16 (4), (5)) | the carried `tradition` facts and the dossier's present week (`presentWeek`, its latest stamped tick; V08 §3.16 (4)), through §7.7's DR42 and DR43 | §2.9's view state under its "follow SettlementForge" flag; the festival list (V09) | the view state (outside the model hash); the traditions carried | re-read at every load and absorb (DR42 at open and at each absorb, §2.9); a host's `view.set { week }` is a view command, never an input | the view state's own (§2.9) | none (new): an older document's view follows SettlementForge by default |
| a dossier entry's chip in Find — its record's binding key and its anchor address (3.16 (6)) | the viewer's pick of a dossier entry in Find (item 120 (d)) | Find's re-evaluation at each commit, absorb, epoch, undo and load (item 120 (f)) | §2.9's view key `find` — the per-viewer view state, saved with the other view keys (`Document.view`) and in view pins, outside the model, its hash and the log (item 120 (a)) | re-evaluated: a key no binding row holds is replaced by the key its anchor's entity carries | none: a view, never an edit (item 120 (a)) | a line migration's re-key followed through the anchor at the next re-evaluation; an older view state has no chip |
| the crisis census (`catalogue.<line>.json`'s `crisis`; 2.4) | the adapter's build step, from the pinned line's code | V11's compile check of `crisis.map`; `digest`'s reading of each overlay's source (3.16 (7)); T-V8-59 | `@plat/tables`, with the adapter | n/a | n/a | re-cut with the adapter at a new line or commit; a word a new line adds reads `none`, noted, until its row exists |
| the field table's fallback column and its `field_fallback` notes (2.4) | the adapter (the column); `digest` (the notes) | the generator's rules each cell names; the host's report | the column with the adapter; the notes never (class `report`) | n/a | n/a | re-cut with the adapter |
| the frame's and the party viewer's minimum size (3.1, 3.16 (10)) | `@plat/bridge-client`'s `mount`, `switchTo` and `mountParty` | the browser's layout; V09's medium layout inside the frame | never stored | a resize keeps the document, view and selection byte-identical | n/a | none (new) |
=== END ===

=== REPLACE ### 3.5 `digest` and the diff — from a whole dossier to a list of changes ===
### 3.5 `digest` and the diff — from a whole dossier to a list of changes

**`digest(raw, host)`** (§14's port item 2 states its duties; these are its steps, in order, all pure):
1. **Adapter.** `AdapterRegistry.select(raw, { line: host.line, bound })` (V08 §2.4) — `bound` the document's
   `DossierBinding.adapter.line` at an absorb, `host.line` checked, never chosen from; a refusal ends the call
   (`E_UNKNOWN_SHAPE` or `E_LINE_UNSUPPORTED`, V08 §2.4); `defaulted` writes a `line_defaulted` note and `differs` a `line_differs` note.
2. **Limits.** A bounded walk measures the structure before anything else reads it: bytes of keys and strings, depth,
   list lengths, against the manifest's `limits`; over any limit → `E_UNKNOWN_SHAPE` with a `size_limit` note naming the
   first limit passed (T-V8-20). No string longer than `maxString` is ever copied.
3. **Shape.** Every `requiredKeys` key present — a key's absence is refused at step 1, `E_UNKNOWN_SHAPE` (B3).
   A present value the port cannot read is never a failure (item 125 (b); J-V8.134): an `id` empty or not of the form
   `s_` + 16 hex, a `name` or `tier` empty or no string, a `population` empty, negative or no whole number (0 is a deserted
   settlement, routed by V08 §3.6 (7); a whole number above the cap, however large, is B7's refusal, V08 §3.10), an `_seed` empty or neither a string nor a finite number, an `institutions` that
   is no list, and an empty or unreadable version stamp each take their field-table row's fallback, noted
   `field_fallback` (V08 §2.4). An extra
   top-level key is never a failure: an `optionalKeys` key with `read: false`, or a key neither list names, is dropped into
   `ignored` with an `ignored_key` note. The hand-made teaching file, which lacks the line's required keys, is refused at
   step 1 (§14).
4. **Records.** Each institution, power, notable, condition, calamity and tradition record is checked for its own required
   fields (a name; for an institution a category string; numbers finite); a failing record is QUARANTINED — kept out of
   the digest, its key (when one can be formed) listed in `DossierBinding.quarantined` with the reason, a
   `quarantined_record` note — and the rest proceeds (J-V8.8; V08 §3.9 row B4). The diff never removes a quarantined key
   (below), and a quarantine whose key cannot be formed holds every absent institution key.
5. **Keys, grammar and class.** The name grammar and the ladder step of V08 §3.5.1; §7.7 item 12's key law, with the
   housing-stock records set aside for DR7 by their `@housing` row; then the CLASS LOOKUP CHAIN (DR24): (a) a record with
   `renamedFrom` → the `kinds` row of the slug of its CURRENT name; (b) else its `kind` (catalogue key) → its `kinds` row;
   (c) else the slug of its name as a catalogue key → its `kinds` row; (d) else **the tags rung**: when the record's tags
   map through `tags` to exactly one family whose generic class exists, that class, noted `unmapped_kind` with rung `tags`;
   (e) else its category's generic class (`categories`), noted `unmapped_kind` — for (d) and (e) the note is written after
   the fold, its `class` the class that builds the record at the document's rung (V08 §4.6's row, V08 §3.6 (4); at a
   village rung V07 §3.11 step 4's tag fallback); (f) a CUSTOM record's (`custom` present, V08 §2.8) class and profile are
   NOT decided at digest (J-VI.20): steps (b)–(e) do not run for it; the digest carries their inputs — `custom` (its scene
   tokens, `group` and keyword keys), `tags`, `category` and, when the dossier carries the definition's fields, its `custom-def` fact — and item 104 (a)'s
   resolution with V11 §3.13.1's rungs (the author's map declaration for its `localUid`, the archetype, the category, the
   tags, the definition fields, the keywords with their `class` cell, then `generic-other`) decides both at fold, where the
   declaration is visible; the `custom_resolved` note is written after that fold (creation's `generate`, absorb's dry run,
   V08 §3.3) and names the deciding rung from the fold's report. A `kinds` row whose class is a pseudo-class routes the
   record to its reader (V08 §2.6's `kinds` shape) and gives it no roster class — `@absent:<class>[+<class>]` to S2, each
   named class's `min` and per-capita demand 0 at the settlement unless another record binds that class. A catalogue
   record's siting-profile family is the `kinds` row's `family` when set, else the `tags` families of its tags (item 103
   (a); how several families combine is item 103's rule in §10.2), else its generic class's own. Its political `role` is
   carried as given (DR12, J-V8.45).
6. **Powers, notables, circumstances, economy, history, look.** Standings = power ÷ Σ power, rounded to 1/10 000; a
   controlled list resolved through the line's stable part (§7.7 item 12); relations from
   `powerStructure.factionRelationships`, one per unordered pair, with the type word and the `direction` trend word (the
   `relations` row gives kind, sign and strength at the put, V08 §3.11); notables' workplace and power resolved by name to
   binding keys (absent when the name joins nothing, noted `name_unjoined`), their `importance` carried for V10's people
   answer and V09's person card; deposits; every listed condition whatever its status, and the stressors normalised into
   it (`stressors` — one object or a list — each `{ type }` a condition `cond:stress:<type>` of archetype `<type>`,
   `source: 'stressor'`, severity 0.5, no weeks), each condition's crisis fields by V08 §3.16 (7)–(8); quarters; the government and `security` (V08 §2.5); **the economy** —
   each `activeChains[]` entry into `economy.chains`: its resource joined to a listed deposit by `resourceKey`, its
   processors resolved by the rule below, its outputs through V11's `goodWords`, its `upstreamChains` as `chain:cat:`
   keys, its status word through `chainStatus`; `tradeDependencies` into `economy.dependencies` (the institution resolved
   by name, the severity through `dependencySeverity`); `primaryExports`, `primaryImports` with `necessityImports`, and
   `transit` into `economy.goods` through `goodWords`; **the calamities** — each `calamityHistory` entry keyed
   `calamity:<tick>:<slug(name)>`, its severity by `calamitySeverity` over its deaths and the population at its week (the
   latest `populationHistory` entry at or before it, else the current population), its targets resolved to binding keys by
   name; **the sea threats** by the `threats` row; **the ruin evidence** by the `ruinEvidence` row; **the latitude** by
   DR29; **the history** by V08 §3.15 (1); **the readiness**, **the present week**, **the traditions** and
   **the crises** by V08 §3.16 (2), (4), (5), (7) and (8); every key an `ignored` row names dropped into `ignored`, and
   every read field the dossier lacks or leaves empty given its fallback, noted `field_fallback` (V08 §2.4; item 125
   (b)). Severities round to 1/1 000 and percentages to
   1/100 — the digest's resolution (J-V8.17), so floating noise in a host's arithmetic never reads as a change.
   **Resolving a name to a record** (chain processors, dependency institutions, calamity targets): the exact name → that
   record's key; else the KIND FAMILY — the name and every record's name with their count range and qualifiers removed,
   case-folded, the last word's plural folded to its singular (`-ies` → `-y`, `-es` after s, x, z, ch or sh, else a final
   `-s`) — the one record of that family (several: the first in dossier order, noted `name_ambiguous`); else unjoined, kept
   by name and noted `chain_node_unjoined` (research mapping row 46: 2 585 of 3 381 processor names join exactly; the kind
   family is measured by T-V8-34 on the rest). **Goods words** (V11's `goodWords`): each label is resolved by V11 §3.13.5's
   matching rule; a label matching none is noted `unmapped_good`.
7. **Custom content** — V08 §3.13's steps.
8. **Ladder merges** — V08 §3.5.1 (c).
9. **Seed.** `settlement.seed = H32("plat:sf-seed" ‖ _seed)` (§14's port item 2) — an empty or unreadable `_seed` read as
   `settlement.key`, its field-table fallback; `_seed` and `_config` go no further.

**The diff (`absorb`'s first step).** Carried facts (V08 §2.3) against the new digest's facts under the same keys, key by
key in code-point order, **skipping every key listed in `DossierBinding.quarantined`**: a quarantined record keeps its
last carried state, and when a quarantined record's key could not be formed, every carried institution key absent from
the new digest is held — no `remove` — with one `quarantine_hold` note, until a readable dossier arrives. **At an absorb,
a field that takes its field-table fallback** (V08 §2.4) — its path absent, or its value of no form its row reads: an
empty string, a `null` (save where its row reads `null` as a value, as `stressors`' row does), a wrong type, a
`population` that is no whole number or negative; among the required keys, `population`, `name` or `tier` empty or
unreadable and an `institutions` that is no list — makes no change: the carried fact stands. A field here is a row's own
path — a top-level key, or a whole list; inside a record the digest reads (an institution, power, notable, condition,
calamity or tradition), a sub-field absent or unreadable takes its row's reading (an institution field's `else`, V08
§2.6; the `activeConditions[]` row's missing `label`, `duration` and `sourceEventType`; a record failing its own required
fields is quarantined, step 4) at an absorb as at a creation and is compared as read, so a record follows what the
dossier now says of it (an institution SettlementForge reopens, `status` `active` and its `worldPulseFate` gone, reopens,
F6). The settlement row compares
nothing for that field, every carried institution key is held when `institutions` is no list (no `remove`, as a
quarantined record's are), and any other carried fact the field gives keeps its last value. One `field_fallback` note
names the field, its `detail` "the map kept its record's last value", until a readable value arrives; the next readable
dossier absorbs as usual. An empty list is a value — the dossier lists none — and is compared as read. The field
table's fallback values serve a creation. For each element
kind, the fields compared and the change they make (the `op` of §7.7's `DossierChange`; the receipt table decides cause,
fate and week, V08 §3.6):

| kind | key only in the new digest | key only in carried | fields compared when in both → op |
|---|---|---|---|
| settlement | — (a different settlement key refuses the absorb, `E_OTHER_SETTLEMENT` — never against a key the `id` row's fallback gives, V08 §2.4) | — | `population` → `population`; `tierWord` → `tier` (F8); `name` → `rename` (the title only); `wealth` → `prosperity`, response `epoch`: `EpochInputs.wealthLevel` through the `wealth` row (DR6; receipt F9), read by V06's wealth level and item 114's means |
| institution | `add` (F1); under a key carried as removed or ruined → `reopen` (F6); a greater of a ladder whose lesser is carried → `add`, the lesser's members re-bound as the greater's where the greater's thing is the lesser's, else the greater placed new and the lesser's key bound as at a first reading (V08 §3.5.1 (c), (d)) | `remove` with fate `vanished` (a regenerated or rerolled record: SF never deletes, research V48), unless a ladder promotion re-binds it (V08 §3.5.1 (d)) or a quarantine holds it | `state`, `fate`, `inactive` → `state` (F2, F3, F5 by §7.7 item 14's rows, fates first); `impairments` → `state` (F4); `name` with a demotion or upgrade receipt → `rename` + the class re-read (F15, F3) — an upgrade to a REPLACEMENT greater of a new thing places it new under the key and re-points the key's row to it (V08 §3.5.1 (d)); `kind`, `category`, `tags`, `role`, `step`, `lesserOf`, `popQualifier`, `openTop` → `attr` (a re-designation, item 18); `count` → `attr` (members added or removed, V08 §3.6); `knownTo`, `facets` → `attr` (§7.7 item 7) |
| power | `add` | `remove` | `standing`, `governing`, `controlled` → `power` (epoch data); `name` with `rename-faction` → `rename` (its relation keys re-keyed with it); `category` → `attr` |
| relation | `add` → a `PowerRelation` put | `remove` → retire | `kind`, `trend`, `sign`, `strength`, `hidden` → `attr` (a put) |
| notable | `add` → a `Person` put; a reroll's new key whose name and role equal a vanished key's → `rename` (re-bound, V08 §3.11) | `remove` → retire | `role`, `institution`, `power`, `status`, `importance` → `attr`; `replaced` naming a carried notable → `rename` (the successor re-bound, F17) |
| condition | `add` → a `ConditionOverlay` put | `remove` → retire at its week | `severity`, `severityBand`, `status`, `untilWeek` → `state` (a put); the crisis fields `name`, `event`, `calamity`, `arrivals`, `forces` → `attr`, response `none`: a look only (item 122) — the ledger event carries them and DR44 reads them through the overlay's key; no map event |
| resource | `add` → a `DepositSite` put | `remove` → the deposit's state `removed` | `state` → `state` (F13) |
| quarter | `add` → a naming claim (§7.7 item 16) | `remove` → the claim's `unassign` (the name leaves the district) | `phrase`, `landmarks` → `attr` |
| government | — | — | `name` → `attr` (its kind by the `government` table; F11), `governingPower` → `power` |
| trade | — | — | partners, links, relationships, `goods` → `attr` (F14); income shares → `attr` (the economy slice) |
| port-values | — | — | any field — `crime`, `importPct`, `foodChain`, `legitimacy` (from the government's legitimacy), `threats`, `readiness` → `attr` on the `port-values` key, riding the next epoch's slice |
| deity | — | — | `key`, `name` → `attr` (F16: a temple's dedication at the next epoch) |
| chain (SettlementForge's) | `add` | `remove` | any field → `attr`; response `epoch`: no map event — the supply web re-derives the chain's links from the carried facts at the next epoch (DR33; V06's dossier phase) |
| dependency | `add` | `remove` | `severity`, `affected` → `attr`; response `epoch`, as a chain |
| calamity | `add` → its event in the epoch covering its week (DR28, V08 §3.6 (3)) | nothing: a calamity that leaves the line's capped history list is never undone (J-V8.54) | none (a calamity is immutable) |
| evidence | — | — | `kinds` → `attr`; response `epoch`: V04 re-evaluates the ruin at the next epoch (V08 §2.6a (4)) |
| site | — | — | any field (`terrain`, `access`, `threat`, `magic`, `culture`, `isolation`) → `attr`, response `none`: the site is creation's (§7.7 item 10; DR1's bars are creation bars) — the ledger event carries the new value, so the change is reported once, by one `frozen_fact_changed` note (class report) naming the field; no map event |
| history | — | — | `events`, `ancientRuin`, and `ageYears` beyond the whole years elapsed since the carried `atWeek` (±1) → `attr`, response `none`: the history shapes creation only (DR36–DR39; V08 §3.15) — reported by one `frozen_fact_changed` note, no map event; the live lists (`tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle) reach the map through the settlement, calamity and F20 rows instead |
| tradition | `add` | `remove` | `name`, `kind`, `weeks`, `staging`, `deity` → `attr`; response `none`: a look only (item 118 (a)) — the ledger event carries the new schedule, which the view's festival display reads (V08 §3.16 (5)); no map event, no model change |
| institution, custom part | (as institution) | (as institution) | `custom.contentHash` → `attr` with cause `custom_revision` (item 104 (e): the profile re-resolved and the use re-sited by least disruption); `custom.scene`, `.group`, `.keywords`, `.required` → `attr` |
| custom-chain | `add` → a `CustomChainRecord` put (active or not) | `remove` → the record retired | `active` → `state` (item 104 (h) (7)); `nodes`, `exports`, `imports` → `attr` |
| custom-service | `add` → a `CustomServiceRecord` put | `remove` → retire | `provider`, `serviceCategory` → `attr` |
| custom-def | `add` (the definition's fields first carried by the dossier) | `remove` (response `none`, noted `custom_library_dropped`) when the dossier no longer carries fields for the definition at the revision it materialises — a new revision without them included (V08 §3.13 (8)) | any field → `attr` with cause `custom_library`, only when the entry's revision equals the definition the dossier materialised |

A field whose carried and new values are equal after the digest's rounding makes no change. A change whose only effect is
on facts no model rule reads (a notable's importance, which orders V10's people answer and V09's person card; a
tradition; a frozen fact) is still a change: it updates `carried` through the ledger event (V08 §3.6 (4)) and the report,
and emits no map event.

**The chains' links** (item 105 (i); DR33). SettlementForge's chains become links of item 105's supply web between the
bound members; the links are DERIVED at every placement and epoch by the base's web (item 105 (a): never stored), read
from the carried `chain` and `dependency` facts; the port stores only the facts. DR33 is §7.7's (item 398): its inputs
are `economy.chains` (processors resolved, outputs through `goodWords`, upstream, the neutral status),
`economy.dependencies`, `economy.goods` and `entrepot`; each link is weighted by V11's `siting.web.chainStatus` of its
chain's status; an `entrepot` chain's ends are item 104 (b)'s import and export pulls through the store at the gate or quay
facing the partner; its bar is T-V8-35. A processor that joins nothing binds nothing and never invents a building (the
dossier is the truth of what exists; DR9 places what it lists), reported `chain_node_unjoined`.

**The coverage pull inside a collective range** (item 103 (f); item 392). DR9 draws a collective record's placed count
inside the dossier's range from S2's per-capita rows; where the record's class carries a coverage row, the draw also takes
the coverage target — clamped into the range — as a weighted option beside the per-capita value, exactly as item 103 (f)
states for a standalone roster, and coverage then decides where the members go. The range stays the dossier fact; the
count inside it stays a map fact (J-V8.20).

**The latitude** (item 102; DR29, §7.7's; item 391). Item 102's daylight share reads the path sun at the settlement's
latitude; a dossier gives none, so the port derives it by DR29 — `site.culture` through the `cultures` row, else 50° N,
the generator's default (item 125 (b)) — written into `Intent.latitudeDeg` at creation, a map fact the user may edit;
V05's model sampler reads the latitude in force (V08 §2.5's value-in-force rule), and §8.4's path mode reads it for the
document's views; its bar is T-V8-22. No later latitude arrives: the realm map's placement is no input (item 125 (a)), so
the culture's latitude stands, and a later `site.culture` change is a frozen fact, reported (`frozen_fact_changed`), never
re-derived (J-V8.130). A DM who wants another latitude sets it by T1 `intend`'s `adjust` (§7.1), a map edit with its own fate
report. A document made before `Intent.latitudeDeg` existed reads 50°, the latitude it was built with (§7.5's migration
default).

#### 3.5.1 The institution ladders (item 108)

**(a) The name grammar** (applied to the record's name, in this order; the base's T9 extended, item 509):
1. `(lo-hi+)` → `count [lo, hi]`, `openTop: true` — members may exceed `hi` up to V11's per-kind-and-rung cap, reported
   (`Parish churches (50-100+)`);
2. `(lo-hi)` → `count [lo, hi]` (`Taverns (5-20)`);
3. `(n+ only)` → `popQualifier: n`, a population floor kept in the label, never a count (`Cathedral (10,000+ only)`);
4. every other parenthesised group → its case-folded words appended to `qualifiers` (`(guild)`, `(red light district)`,
   `(divine, 1st level)`).
Digits may carry thousands separators. `kindLabel` is the name with groups 1 and 2 removed and trimmed. A housing-stock
record is told by its `@housing` kinds row, not by the grammar.

**(b) The step type.** V11's `dossier.ladders` row for the record's kind (its `catalogId`, else its name's slug) gives
`step` and `lesser`; with no row, the `qualifiers` row over the record's qualifiers in order (the first with a step); with
none and a count range, COUNT; else no step. An unnumbered COUNT, QUARTER or GUILD record takes V11's range column — the
range at the kind's lowest tier — × its `rungScale` only at rungs above that tier (V11 §3.12). At a village rung (THORP,
HAMLET, VILLAGE) an unnumbered record takes V07 §2.4's range row for its step type and member class (`village.json`
`rules.ladders.ranges`, keyed by step type with the qualifier as the row's label; J-V7.105), else V11's range unscaled. A
kind whose qualifier names a step but which V11's table lacks is noted `ladder_unknown`; a record whose kind is a greater
of the committed `ladderPairs` (V08 §2.4) that the catalogue does not list is read as a plain record, noted
`uncatalogued_step` (V11 §3.12).

**(c) No double counting (item 108 (c)).** Where a greater and a lesser of one ladder row are both in the dossier, the
lesser gets `mergedInto` = the greater's key: it is not placed on its own, its range is not added to the greater's, the
roster's per-capita members of that class ARE the greater's members, and its binding key becomes an alias row on the
greater's member #1 — for SIZE and REPLACEMENT, the greater's building, save a lesser that is a pin record, which V11
§3.12's row keeps as a pin of the greater's plot: `parish_church` over `wayside_shrine` binds the shrine's key to the
churchyard `cross` pin, laid by V07 §3.10's pin-record rule at a village rung (VS8 at generation, `village.records` at an
epoch or an absorb; V07 §2.4, V07 §3.10, V07 §3.12 *Records at a village epoch* item 4), while at a base rung, where no churchyard
cross is laid, it aliases the church building. The target is chosen where the merge is first read — the creation, or the
absorb or epoch that brings the pair, the greater arriving beside its standing lesser or by promotion ((d)) — and kept
across a later rung change, the standing fabric surviving it (V08 §3.10; J-V8.111); the merge is noted `ladder_merged`.
**A pair that meets over time** (J-V8.113). At an absorb where the lesser was already placed and the greater arrives beside
it, the lesser's key follows what the greater's thing is:
* **The greater's thing is the lesser's** — every COUNT, QUARTER, GUILD and SIZE step, and the REPLACEMENT rows whose V11
  §3.12 reading keeps the lesser's thing: `graveyard` over `burial_ground` (the face re-bound), `wizard_s_tower` over
  `hedge_wizard` (the house becomes the tower), `mages_guild` over `wizard_s_tower` (the tower binds the guild's hall),
  `professional_city_watch` over `town_watch` (the posts carry on) and `cathedral_10_000_only` over `parish_church` (the
  lesser absorbed: the church converted in place with its crypt, V06 §3.9.11). The lesser's placed members are re-bound
  as the greater's members `#1…#n` (the one nearest its demand first; a `rebind` each, no address change) and DR9 adds
  members up to the greater's count by least disruption; nothing standing closes.
* **A lesser with no thing of its own** — a `@none` or `@office` lesser (`citizen_militia`, `traveling_performers`,
  `traveling_hedge_wizard`, `gates_if_walled`, `priest_resident`) — has no member to re-bind: the greater is placed as any
  added record is, and the lesser's key becomes an alias row on the greater's member `#1`, as at a first reading.
* **Every other REPLACEMENT greater is a new thing**, placed new in the absorb or the epoch that brings it — a building by
  DR9, an `assign` of its member (V08 §3.6 (5)), at a village rung through V07's records placement (V07 §3.12 *Records at a
  village epoch* item 4); a `@wall` greater by the fortification's dossier path (DR2's walls list; V06 §3.7.6 (4); at a
  village rung V07 §3.11's palisade REPLACEMENT: the palisade rebuilt on its trace, else a new ring) — and the lesser's key
  binds as at a first reading, its binding row re-pointed by one `rebind` (the fold re-points the row, V08 §3.6 (5)) noted
  `ladder_merged` (`ladder_promoted` under (d)): (i) a building lesser (`fish_market` over `fishmonger`) — an alias row on
  the greater's building (at a village rung the fish market's hall on the market's rim, V07 §3.12 (b)), the fishmonger's
  shop keeping its use, unbound, left to the use step; (ii) a pin-record lesser — the pin-lesser branch above: at a village
  rung the churchyard `cross`, laid in that batch by V07 §3.10's pin-record rule after the church, at a base rung an alias
  row on the church, and the lesser's former pin left standing, unbound (a pin lesser whose row keeps no pin —
  `wayside_shrine` under `cathedral_10_000_only` — takes an alias row on the greater's building); (iii) a `@wall` lesser
  (`town_walls` over `palisade` or `palisade_or_earthworks`, and the wall rows above it) — an alias row on the enceinte the
  fortification's path yields for the greater, the superseded ring keeping no binding.

**The guild halls.** By V11 §3.12, a GUILD record's hall binds as one member `#k` of a `craft_guilds_*` COUNT record (a
guild whose `categories` family is `craft`) or a `merchant_guilds_*` COUNT record (family `trade`) in the same dossier,
noted `ladder_merged`: the GUILD records of that family take the members `#1…#m` in dossier order, the COUNT record's
placed count is max(DR9's draw, m) — above its range's top only when the GUILD records alone exceed it, noted
`count_over_range` — and no further hall is placed (J-V8.83). At an absorb the binding follows the first case of *A pair
that meets over time*: a hall already placed is re-bound as `#k` (a `rebind`, no address change), never duplicated, and a
COUNT record that leaves the list releases its bound halls back to their GUILD records (a `rebind` each), so no hall
closes by a change of wording. A GUILD record of another family, or with no such COUNT record in the dossier, keeps its
own hall. The three metropolises' two church ranges and `metropolis-3`'s two cathedral records are the fixtures' cases
(V08 §2.6a (3)).

**(d) Steps over time (item 108 (d)).** A `promotedFrom` receipt (`upgraded_by_reconstruction`) keeps the record's one key
(§7.7 item 12's F15 re-binding: the line keeps the old kind's `catalogId`). Where the greater's thing is the lesser's ((c)'s
first case), it re-keys the singular record's binding row to the greater's `#1` (`rebind`) and DR9 adds the rest inside
the new range by least disruption. Where the greater is a new thing ((c)'s third case; J-V8.114), the greater is placed
new as that case places it, under the record's key (at a village rung through V07 §3.12 *Records at a village epoch* item
4), and the record's binding row is re-pointed from the lesser's former thing to it (a `rebind`); one key binds one thing
(J-V8.111), so the former thing is left standing, unbound — the fishmonger's shop keeping its use, the roadside shrine
standing, a palisade the new ring superseded decaying by its persistence rows — and a pin the row keeps (the churchyard
`cross` of `parish_church` over `wayside_shrine`, at a village rung) is laid in that batch by V07 §3.10's pin-record rule
for the record, keyed by its binding key and its provenance the record, with no binding row of its own. A lesser that
leaves the list in the same absorb that adds the greater of its ladder, with no receipt, is read the same way — a
promotion, noted `ladder_promoted`, never a removal and an addition: its key re-bound as the greater's `#1` in (c)'s first
case, else bound as (c)'s second or third case states, the greater placed under its own key. A `demotedFrom` receipt
(`demoted_by_disaster`) keeps the member nearest its demand as the singular record (re-bound) and closes the rest by the
receipt's fate (F2's rows; the calamity's ruins stand as ruins). A demotion or promotion of a burial record follows the
same rules, so no burial face closes by a change of wording (V08 §2.6a (4)).

**(e) Custom content (item 108 (e)).** A custom record whose carried definition fields list `subsumes` is typed SIZE when the
subsumed kinds belong to another V11 family than its own, GUILD when they are a craft of its own family, SIZE when
unknown; its `lesser` are the subsumed kinds, merged by (c).

**(f) The ladder file.** V11 §3.12's rows agree with SettlementForge's ladder data at the pinned commit
(`src/data/institutionLadders.js` at `5d699cc68`, its upgrade pairs and subsumption rules read as data, nothing copied);
rows V11 marks `inferred` that the file lacks — `parish_churches_50_100`, `multiple_monasteries`,
`major_monasteries_5_10`, `great_cathedral`, `burial_grounds_and_charnel_house` and the rest — stay inferred, because the
dossiers list both forms (all three metropolises carry both church ranges; `metropolis-3` both cathedrals), so item 108
(c) must merge them whatever the file says. The check is release row R2's (V08 §8.3) against the committed `ladderPairs`,
and a disagreement it finds is a V11 table fix.
=== END ===

=== REPLACE ### 3.6 From changes to events and epochs ===
### 3.6 From changes to events and epochs

1. **Dating.** Each change reads its receipt row (§7.7 item 13): the first receipt present gives cause, fate and week by
   §4.11's rungs (*The clock* (2)) — no host input is a rung (item 125 (a)); no rung → `week: null` and an
   `unreceipted_change` note. The kinds
   this volume adds are dated by §7.7's data rows F-V8-1 – F-V8-8 (item 393) — a relation by its powers' pulse week when the
   line stamps one, else arrival; `port-values` by arrival, riding the next epoch; a custom definition by arrival; a chain
   (custom or SettlementForge's) by arrival; a dependency by arrival; a calamity by its own `tick`; the `evidence` singleton
   by arrival, riding the next epoch; the `site`, `history` and `tradition` kinds (F-V8-8) by arrival, response `none` (the
   ledger only; V08 §3.5).
2. **Order.** Changes are ordered by week (null last), then decrees before other sources, then the dossier's own record
   order (`order`), then binding key — SettlementForge's order where it has one, ours where it does not.
3. **Epochs by the cadence — §4.11 (4)** (J-V8.55). From the last epoch's week `W₀` (its `EpochRecord`, else the creation
   week) to the absorb's week `W₁` (the later of the latest dated week and the dossier's present week, V08 §3.16 (4); with
   neither, `W₀`): an epoch at every calendar
   year end `W` with `W mod 52 = 0` in `(W₀, W₁]` (the `sf445` calendar's year); an epoch at the first week the population
   leaves the last epoch's `populationTarget` ± 5 % (read from `populationHistory`; with none, at `W₁` when the new
   population is outside it), the reference then moving to that epoch's target, so every crossing inside the span adds its
   own epoch — none when `W₁` is not after `W₀`, the crossing then read at the next absorb whose week passes `W₀`; and an
   epoch at the week of each newly carried calamity dated after `W₀` that no other epoch falls on (a destructive event is
   epoch content, §4.11's rung at an epoch). A newly carried calamity dated at or before `W₀` is late and folds no epoch at
   its own week (§4.11 *The clock* (4)): with `W₁` after `W₀` it rides the first epoch this absorb folds — with none, one
   the port folds at `W₁` for it — at that epoch's first week `W₀` + 1; with `W₁` not after `W₀` its F5 targets' dossier
   events apply now at `W₀`, finished, and it is held in `DossierBinding.lateCalamities` (§7.7; (4)) for the first epoch a
   later absorb folds, which it rides at that epoch's first week; its tick kept in its receipt either way; a calamity a
   declared remap fills into an older document is carried with no event (V08 §2.7).
   Each epoch's `populationTarget` is the population at its week — the latest
   `populationHistory` entry at or before it, else linear between the target at `W₀` and the new population at `W₁`,
   rounded to a person — where this absorb's `population` took its field-table fallback (V08 §3.5's diff), the new
   population is the carried one wherever this step reads it (this linear target, and the crossing tested at `W₁` with no
   `populationHistory`), the digest's fallback value never entering an epoch's target or a crossing test;
   `populationHistory`'s readable entries date and size the crossings and targets as usual — and its `circumstances` are
   the new digest's slices (trade, economy, powers, government, `port`):
   SettlementForge keeps no interior history of them (research V52, V56), so every epoch of a catch-up reads the end state,
   declared (J-V8.25). A span with no year end, no crossing and no calamity makes no epoch: the absorb's element events
   fold standalone (6). A catch-up whose epochs at this cadence would pass item 119's comfort level is coarsened by
   V06 §6.8 (6) — every dossier event still at its own week, the events each epoch's span holds absorbed as one batch (V08
   §6's absorb-with-epochs row), one epoch over the span the floor (where even it, with the events' absorb term, passes the
   catch-up's budget, the wait completes past the comfort level, reported F-BUDGET-TIME, V06 §6.8 (6)), nothing refused or
   shortened (§4.11 *The clock* (4); item 119 (a2), J132). **The calamities** (DR28, the one row V06 and this volume share: V06 writes the reader, this volume
   the inputs). Each newly carried calamity is one entry `{ week, kind: 'calamity', calamity: CalamityRef }` in
   `EpochInputs.events` of the epoch at its week (one carried late: of the first epoch this absorb folds, or for one held a
   later absorb's, at that epoch's first week — its F5 targets' dossier events riding that epoch's `EpochInputs.dossier`
   with it at `W₀` + 1 where `W₁` is after `W₀`, above and (6)), V06's `CalamityRef` filled as `{ id: its key, name, type, severity,
   targets: the use ids of its resolved, bound targets, deaths }` (`deaths` for V04's burial growth, V08 §2.6a (4); a held
   one's from its carried `calamity` fact under the held key); its F5
   targets' dossier events at the same week ride the same epoch's `EpochInputs.dossier`, so V06's hazard phase strikes them
   in place; a target that joins nothing is dropped from the list, noted `calamity_unplaced`. The calamity-to-hazard
   mapping is V06's table; the port maps nothing (J-V6.70). The port also carries into `EpochInputs` the SettlementForge
   chain changes (the carried `chain` facts, DR33), the ladder receipts (V08 §3.5.1 (d)), the church, cemetery, wall and
   ruin or mining records' changes (V08 §2.6a (4)), the water-system record and the high-ground landmarks (DR34, DR35,
   read by V06's raised-way step from the carried facts and bound uses), and the owner's upgrade request for a document
   whose epochs carried dossier events (V08 §3.8).
4. **The ledger event** (J-V8.14). The absorb's first event is one `dossierFacts { changes, quarantined, lateCalamities,
   notes, notesCleared }` (§7.1; item 358): every `DossierChange` of this absorb with its full `before` and `after` carried
   facts, the WHOLE quarantine list after this absorb and the whole held list of late calamities after it
   (`lateCalamities`: the binding's list less each calamity the first epoch this absorb folds carries, plus each late
   calamity this absorb holds, (3)), author `host`, no model effect. Folding it sets `carried[key] = after` for each change,
   sets `DossierBinding.quarantined` to the list and `DossierBinding.lateCalamities` to the held list, appends
   `{ seq, week: W₁, factHash, changeIds }` to
   `absorbed` and removes `changeIds` from every entry older than the newest 64 — so the dossier block is rebuilt from the
   log by folding these events alone, equal to the stored block at every seq (§2.9's "the fold rebuilds it"). Creation's
   prefix opens with the same event, every fact an `add`. **The port's notes** (J-V8.98). `notes` holds, in the order
   written, this run's notes of class `event` and those of class `standing` whose identity (V08 §2.4)
   `DossierBinding.notes` does not hold; `notesCleared` holds the identities of the binding's standing notes this run no
   longer writes; notes of class `report` never enter the log (V08 §4.6's class column). Folding the event sets
   `DossierBinding.notes` to the old list less `notesCleared` plus the standing notes of `notes`, in identity order — no
   model rule reads either field. The `custom_resolved` and `low_confidence` notes of the custom records this run adds or
   revises (`add`, `custom_revision`) are written after the dry run's fold (V08 §3.5 (5) (f)) and appended to `notes`
   before the events are encoded; since no model rule reads `notes`, the dry run's result stands, and every editor's re-run
   (V08 §3.3) computes the same bytes. They are `event` notes: the live resolution — which a DM's declaration may change at
   any time — is the why card's (§11.2's `WhyAnswer.profile`, V09 §2.7's `chips`), never a stored note. Every `unmapped_kind`
   note (a `standing` note, V08 §3.5 (5) (d)–(e)) is likewise written after the fold — the dry run's at an absorb,
   `generate`'s at creation, the loaded document's state for an offer answered `unchanged` — its `class` the class that
   builds the record there (V08 §4.6's row; J-V8.112), before `notes` and `notesCleared` are computed, so a note whose built
   class changed at a rung change is cleared and written anew at the next port run; the same bytes follow on every editor's
   re-run for the same reason. A digest whose dossier changes nothing (`unchanged`) writes no event, so its notes reach the
   host's report only.
5. **Emission, by the receipt row's response.** `assign` → an `assign` of a dossier-backed assignment (§7.7 One path:
   placed by S10b's `dossier` request, the least-disruption order — at a rung of a product that declares a records
   placement, that placement first, V06 §2.1's `ProductDeclEpoch.records`, V07 §3.12 *Records at a village epoch*);
   `unassign` → `unassign`; `status` → a `setAttr` of the assignment's `state` (and `memberState` for a collective, by
   DR25's distribution); `setAttr` → a `setAttr` of the named path (a re-designation mutates by §4.7 S11); `rebind` → a
   `setAttr` of the bound entity's `dossier` ref to the new key (the fold re-points the binding row; no address changes,
   §6.3; item 390) — also for a ladder promotion (V08 §3.5.1 (d)), a relation re-keyed with its power and a notable
   re-bound after a reroll (V08 §3.11); a staged record → `dossierRecord` (V08 §3.11), the stressors' overlays among them;
   a count change → `assign` of the added members as `dispersed` additions or `setAttr` of `memberState` `removed` on the
   members DR25's rule picks (`siting` keyed by the assignment and the event's `seq`); `epoch` and every slice-level
   change — `port-values`, the settlement's `wealth`, a chain, a dependency, the `evidence` singleton — → the epoch of (3),
   where the slice, the carried facts and V04 and V06's phases read them; a calamity → (3)'s event; `none` → nothing
   beyond the ledger. Each emitted event carries its own `DossierChange` in `EditBase.dossierChange` and the binding key in
   `EditBase.dossier` (§7.1).
6. **Placement in the log; the session.** Element events fold as standalone events at their week, between the epochs of
   (3); one dated exactly at an epoch's week rides that epoch's `EpochInputs.dossier` (§7.7 item 6); undated ones follow
   the last epoch, applied finished (no Works). A newly carried change dated at or before the last epoch's week `W₀` folds
   after the last epoch at `W₀` + 1 where `W₁` is after `W₀`, else at `W₀`, applied finished (no Works), its own tick kept in
   its receipt and noted by `unreceipted_change`'s `late` variant — never at a week before `W₀`, so §4.11 *The clock* (1)'s
   current week never falls back (a late calamity: (3)). In an absorb that folds an epoch, the events each epoch's span
   holds, and those after the last epoch, fold as one batch, each still its own event at its own week (V08 §6's
   absorb-with-epochs row). All take `seq` from `nextSeq` in this order, `author: 'host'` and the
   reserved session `host:port` — never a user's session, no `group` (item 359); the envelope's `session` is the same
   (§11.3's *Logging*).
7. **Refusals at absorb.** A digest whose population routes outside the base ladder with no registered product (V08 §3.10)
   refuses the whole absorb (§7.7 item 15), as does `E_OTHER_SETTLEMENT`; nothing is emitted and the map is held (V08
   §3.9). **A deserted settlement:** with the village product registered, a population of 0 at an ABSORB routes to THORP
   and V07's desertion (V07 §2.1, V07 §3.12; an outcome, never a refusal) — a document whose product is the village runs it at
   the epoch directly, and a base-product document reaches it through V07 §2.1's fold, 0 lying below the band's lower edge
   (J-V8.85); at a CREATION a population of 0 is refused `E_RUNG_UNAVAILABLE` naming the floor (V07 §2.1). With no village
   product registered, 0 is held like any population below 1 500 (B7).
=== END ===

=== REPLACE ### 3.16 The port side of items 111, 114, 115, 117, 118, 120, 122, 125 and 126 ===
### 3.16 The port side of items 111, 114, 115, 117, 118, 120, 122, 125 and 126

Each item's mechanism is the base's with V11's rows and its volumes' parts; the port supplies what SettlementForge says.

**(1) Water in dry country (item 111).** A `desert` terrain is the arid climate row: S0 draws a river, a lake and a coast
at the arid row's chances (§4.2 S0 *Water in dry country*), and every water word of the `site` row (V08 §2.6) makes its
water exist whatever the chance — access `river` a river, access `port` a coast and harbour, a river deposit a river,
`fishing_grounds` a coast, river or lake — so a desert on a river, a lake or a coast keeps it. `oasis_water` makes the
oasis exist (DR40): a spring-fed pond or small lake with its grove and irrigated gardens, water for every rule that reads
water. A dossier desert WITHOUT `oasis_water` has no oasis: the deposit list is SettlementForge's statement of what lies
near the settlement, and the arid row's oasis chance is a standalone draw only (J-V8.116); its water is then the rivers,
lakes and coasts the arid row drew and item 111 (b)'s wells on the best-yield ground. `oasis_water` on a non-arid site
gives an oasis too (supplied by the dossier; a dossier's fact wins). A later `oasis_water` removed is V06's failing spring
(V06 W82); one listed later arrives as `discovered` and opens at the next epoch by least disruption — the site stays
creation's, so a later oasis is the spring S1's relief can place in a hollow within the frame, else it is reported and
not drawn (V08 §3.17). The toll bridge's dry-site failure reads this reading (V08 §2.6b (3)). T-V8-50 holds this part.

**(2) Walls — the defence readiness and the wealth (item 114).** The dossier's `defenseProfile.readiness` — the one part of
`defenseProfile` the port reads — becomes `defence.readiness` (the `readiness` row: a band and a need weight in [0, 1]); the
wealth word is `wealth.label` (DR6). **At generation** (item 114 (d)), §7.7's DR41 reads the band and the wealth
level and gives each enceinte run its condition at V11's table shares — a `vulnerable`, poor town shows patched and breached
runs, a `fortress` in a rich city stands whole; with item 113's replay the condition comes from the replay instead.
**Over epochs**, NEED reads the slice's threat with the readiness folded in — the need threat is max(`threat`,
`port.readiness`), so a well-kept fortress in a safe heartland keeps its walls in use and a frontier town's threat is never
lowered by a weak readiness — and MEANS reads the wealth level in force (the `wealth` diff row); V06 §3.7.7 holds
the classes and the transitions. DR2's creation defence reads the threat alone, unchanged. A readiness change is a
`port-values` change riding the next epoch's slice; no readiness (standalone, or a dossier without the field) leaves the
threat alone (the `readiness` row's null). T-V8-52 holds this part.

**(3) "Specified" under the grandeur ceiling (item 115).** The ceiling by rung is §4.7 S10b's rung ceiling, with S2's manor
count at the territory rungs (§4.2 S2), over V11's table; a dossier SPECIFIES a grand building, which then keeps its full
design at any rung (item 115 (c); the ceiling is a default, never a refusal), in exactly these cases: (a) a dossier-bound
record whose class — by its `kinds` row, or item 104 (a)'s resolution for a custom record — is one the ceiling table's
`settings.grandClasses` lists (V11 §3.25.4: the lord's and the ruler's houses), every placed member of a collective record
of such a class included (its count is the dossier's, DR9); (b) a dossier government whose `villageSeat` names the manor
house — seigneurial or crown (V11 §3.21.1) — V07's manor forced as the seat at every village rung (DR11; J-V7.104), at
VILLAGE the one manor the ceiling admits. These are NOT specifications: the wealth word and any prosperity change, a
`Wealthy Residential` quarter or any other quarter name, a notable's role or title alone, a power's standing, a count
range's open top (`openTop` members above `hi` take the ceiling like any building), and a custom record's keywords that
name a grand word without its resolution landing on a grand class. At TOWN and above the ceiling is off and the question
does not arise. A hand edit beyond the ceiling is the user's (item 101 R2; V09, V10). T-V8-53 holds this part.

**(4) Seasons — SettlementForge's calendar and the climate (items 117, 125).** A season is a look only: it never changes
the model or its hash (item 117 (a)). The port writes nothing into the model for it. **The week** (item 125 (b); J139):
a dossier-bound map's present week is the dossier's own latest stamped tick — the greatest of its conditions'
`triggeredAt`, its calamities' and its history's ticks (V08 §2.4's `presentWeek` row); with none, §4.11's clock starts at
week 0 and the year position is the user's season control (midsummer, week 19, by default). It is the present at creation
(§4.11 *The clock* (1)) and §2.9's `week` default, and under the view's "follow SettlementForge" flag (§2.9, the default
for a dossier map) §7.7's DR42 sets the year position to the present week mod 52 on the `calendar` row's `sf445` year
(52 weeks, 13-week seasons from spring) at open and at each absorb, so a campaign map opens on its own week. No host input
sets it: `HostContext.week` is retired (item 125 (a)), and the client sends no week of its own. A host sets the frame's
view only by §11.3's commands — `view.set { week }` and `view.set { select }`, and a layer's visibility by a logged
`setLayer` sent by `doc.apply` (the document's style, §8.4; `MapSession.setLayer`, V08 §2.2); the per-viewer keys, `find`, `crises` and `depthBand` among them, never cross the bridge (§11.3;
J-V8.127). The user may pick another week or season in the view (V09's control) and set it to follow again. **The
climate:** the biome's climate row, set at creation, is the `climates` row's terrain column for `site.terrain` (the
dossier's terrain with our biome rules, item 125 (b); DR42), else the user's choice in the blueprint (standalone); §7.7's
DR42 applies the height correction on the map's relief. The climate is part of the frozen `site` fact: a later terrain
word is reported (`frozen_fact_changed`), never re-drawn. T-V8-54 holds this part.

**(5) Festival decorations — the traditions (item 118).** A look only: never a model change (item 118 (a)). `traditions[]`
and the custom-content traditions bucket (`customContentRoster.traditions`) are read at the pinned baseline — the field
table's paths (V08 §2.4), `traditions` read by the owner's rule and on no `ignored` row — into `DossierDigest.traditions`
(V08 §2.5): the key `trad:<id>` (`trad:uid:<localUid>` for a custom one, `trad:name:<slug(name)>` without an id), the name;
the kind by the `festivals` row; the window as weeks of the `sf445` year — a window stated in campaign weeks reduced mod 52,
a window whose end precedes its start wrapping past week 51, a window of 52 weeks or more the whole year, a window with no
readable week not scheduled (carried, listed with no weeks, and shown only by the user's preview), noted `unmapped_word`;
the staging prose reduced inside the adapter to the keys of V11's staging-keyword table by V08 §3.13 (3)'s tokeniser (the
prose goes no further — no dossier prose enters the document, J-V8.32's rule); and the deity when the tradition names one.
The carried `tradition` facts (V08 §2.3) are the schedule §7.7's DR43 reads: a festival's decorations show while the
view's week (item 117's year position) falls inside its weeks, placed by §8.2's decoration rows at the named or keyed place,
else the festival kind's fallback (item 118 (c)), their colours and motifs from `site.culture` (the culture's key, never the
`culturalIdentity` prose) and the deity. A tradition added, changed or removed is a ledger-only change (V08 §3.5's
`tradition` row). Two festivals in one week both show, each by its own keyed draws. T-V8-55 holds this part.

**(6) Find — the dossier's institution records as list entries (item 120).** Find is a view only (item 120 (a)): the port
writes nothing for it — no digest field, carried fact, event or view key — and its dossier entries are read, at each commit
with Find's index (item 120 (j)), from what the port has carried and bound: the carried `institution` facts (V08 §2.3) with
the binding rows (§7.7 item 12), as §11.2's `gazetteer` lists them — its `dossier`-tier rows, grouped by binding key (a
key resolved to its addresses by `entity { dossierKey }`, item 583) — at the viewer's effective key (V09 §2.10).
(a) **The entries.** Every dossier institution record that is not `removed` (§7.7 item 14) and whose binding key holds at
least one row — placed, present as its ruin, or bound as an alias — is one entry, first among Find's named institutions
(item 120 (b): "the dossier's names first, as SettlementForge gives them"), in the dossier's own order
(`DossierInstitution.order`). Its words are the record's name with only its numeric count range dropped (`kindLabel`, V08
§3.5.1 (a)) — `Blacksmiths (3-10)` reads "Blacksmiths"; `Brothel (red light district)` and `Cathedral (10,000+ only)` read
whole — beside its count and its kind: the count is how many addresses its key's rows hold (a collective record's
placed members `#1…#n`, one for a singular record), the kind the `label` cell (V11) of the class those rows bind — for a
custom record the class item 104 (a)'s resolution gives at fold. Selecting the entry selects exactly those addresses — its
members, its ruins and every alias row on its key — and never another building of its class: the record "Blacksmiths · 5"
and the class entry "Blacksmith · 7" (item 120 (b): every building of the class, dossier-bound or not) are two entries.
(b) **Merged, pseudo-class and quarantined records.** A lesser merged into its greater (V08 §3.5.1 (c)) is its own entry
under its own words, selecting what its key binds — the greater's member, a churchyard `cross`, an enceinte — so "Parish
church" still finds where the dossier's parish church went; a pseudo-class record (V08 §2.6 `kinds`) is an entry exactly
when its key binds an element (an `@pin:*` record's pin, an `@seat` record's seat) and none when it binds nothing (`@none`,
`@absent:*`, a `(0-0)` range noted `not_placed`); a quarantined record (V08 §3.9) keeps its carried words and its rows, and
so its entry. Two records whose words coincide are two entries, each followed by the district of the address its first
row holds.
(c) **Typing.** The entries' words are matched as names by item 120 (c)'s rules — prefix and whole-word, one typo forgiven
in a word of five letters or more, case-folded — over every word, the qualifier words included ("red light" offers
`Brothel (red light district)`), in whatever language SettlementForge wrote them (V08 §5.5). They are never lexicon words:
V11's synonyms do not match them, and no dossier word becomes a synonym of a class (V11 W87).
(d) **Knowledge.** An entry, its count, its suggestions, its glow and its pins pass §11.2's admission at the viewer's
effective key like every Find entry (item 120 (h)): a record none of whose addresses the key admits — a `secret` Thieves'
Guild under "See what the players see" (V08 §3.14 (5)) — is never suggested, listed, counted, drawn or hinted at; an
admitted record counts and glows only the addresses the key admits; an `unexcavated` element is absent and a concealed use
(item 63) never named.
(e) **Over time.** A chip holds through every commit, absorb, epoch, undo, load and migration until Clear or close (item
120 (a), (f)). A dossier entry's chip names its record by its binding key and, as its anchor, the address its key's first
row held when the chip was set (the chip's dossier form in §2.9's `find` key). At each re-evaluation the chip selects its
key's rows; a key that no row holds any more — re-keyed by a `rebind`: a receipted rename (F15), a ladder promotion (V08
§3.5.1 (d)), a line migration (V08 §3.8) — is replaced by the key its anchor's entity now carries (`Identity.dossier`), so
the chip stays on its record and shows its new words; a chip whose key and anchor both bind nothing (the record removed,
its building gone) selects nothing and shows 0 until cleared (item 120 (f): "a closed one goes dark"). A record an absorb
adds is an entry from the commit that folds it.
(f) **The dossier's other names.** Its notables reach Find as people, through "Where is" (the dossier-backed `Person`, V08
§3.11); its quarter names as the districts they named (§7.7 item 16), Find's area entries (V01's, item 120); its deposits'
labels as hinterland places (V08 §5.2's `DepositSite` row). A SettlementForge or custom chain is no entry: it is a
relation, offered by the Show menu's **SettlementForge's chains** under its knowledge rule (V08 §5.2).
(g) **The host's surfaces.** Find lives in an owner's or editor's frame (V09's panel). The party picture set is drawn
without it — a chip is the viewer's view, never a party render's option (V08 §3.14 (2)) — and a player's tab has no Find
(pictures and the party gazetteer; a live player map after M-SF, V08 §11 Q5); a DM's handout "where the smiths are" is a
picture the frame's export menu draws with Find shown, at the export's knowledge key (item 120 (i); §11.1).
SettlementForge's assistant (V08 §4.4) answers "where are the smiths" in words from the `gazetteer` query and sets no chip:
a host sets the frame's view only by §11.3's commands — `view.set { week }` and `view.set { select }`, and a layer's
visibility by a logged `setLayer` sent by `doc.apply` (the document's style, §8.4; `MapSession.setLayer`, V08 §2.2); the per-viewer keys, `find`, `crises` and `depthBand` among them, never cross
the bridge (§11.3; J-V8.127). The in-frame clerk's
"show me …" is V10's (item 120 (i)). T-V8-58 holds this part.

**(7) Crisis looks — the port's reading (item 122; J135; J-V8.128).** A crisis look is a look only: it never moves,
adds or removes anything and never changes the model or its hash (item 122 (a)); the design is §7.7's DR44 over §10.2's
crisis tables, drawn by §8.2's look rows under §2.9's `crises` key. The port supplies what SettlementForge says.
(a) **The census.** The adapter's build step reads, from the pinned line's code at its commit, read-only, every stressor
type, every condition archetype and the simulator's crisis events that raise a condition (`PLAGUE`, `REFUGEE_WAVE`,
`RAID_OR_MONSTER_ATTACK`) into the catalogue manifest's `crisis` lists (V08 §2.4) — the words §10.2's `crisis.map` rows
(V11's values) must each map to a look kind or `none`. V11's compile check fails the build on a census word with no row
(T122-4's compile clause), T-V8-59 checks the census against the pinned line, and SF0's census re-reads it at M-SF.
(b) **Each overlay's source.** A `cond:stress:<type>` overlay reads the `stressor` row of its type; a condition whose
`triggeredAt.sourceEventType` is a census event — one the simulator's `PLAGUE`, `REFUGEE_WAVE` or
`RAID_OR_MONSTER_ATTACK` raised — carries that word as `event` and reads its `event` row; every other condition reads the
`archetype` row of its archetype, except that a condition linked to a carried calamity by (d) whose row by this rule is
`none` — the `reconstruction` condition SettlementForge raises after a calamity among them — carries `event` `calamity`
and reads that row, so the disaster look stands for that condition's weeks, on the look's units (§10.2 (d): districts, at
THORP, HAMLET and VILLAGE V07 §5.6 (3)'s units — its ends, or an end-less thorp's toft groups), the calamity's `targets`
first (V01's `disasterDistricts`), each building leaving the look in the week V06 §3.22
(3)'s `crisisLookYields` turns true on it. One look per calamity: where several such conditions link to one calamity,
the earliest-triggered (ties by condition id) carries `event` `calamity` and the others read `none`; a calamity no such
condition links to draws no look, its aftermath DR28's epoch event (J-V8.136). A word the census or the rows lack reads
`none`, no look, noted `unmapped_word`, and release row R9 lists it for a table fix: nothing falls through. **A stressor
and a condition of one look** (J-V8.135): a `cond:stress:<type>` overlay draws no look while a condition's overlay whose
map row gives the same look kind stands in the view's week; the condition's look — its name, weeks, severity and forces
— is the one drawn, a force joined to the stressor's overlay ((8) (a)) drawn with it, and the stressor's look resumes in
a week the condition does not stand while the stressor is still listed. Two conditions of one look kind still draw two
looks (two crises). The look changes none of the `conditions` row's tints and Works factors (V08 §2.6).
(c) **The name and the weeks.** A condition's `label` is carried as `name`, the words V09's why lines and V10's
explanations give it ("Refugee camp: the Northmarch migration, weeks 12–20"); a stressor, or a condition with no label,
carries none, and V09's line reads unnamed. Its weeks are its overlay's `sinceWeek` and `untilWeek` (V08 §3.11), counted
from the dossier's present week ((4)); a stressor has the week it was first read and no `untilWeek`, so its look stands
while it is listed.
(d) **The calamity behind a disaster look.** A condition carries as `calamity` the key of the carried calamity whose week
equals its `triggeredAt.tick`, else of the latest carried calamity in the 52 weeks up to its `sinceWeek`; with none it
carries no calamity. Through it DR44 reads the calamity's `targets` (resolved to binding keys, V08 §3.5 (6)) — which V01's
`disasterDistricts` takes first — and its `type`, the disaster's pattern (fire, flood, earthquake) and V02's ruined look's
flavour; a target the map lacks is skipped and the pattern used (V01). The aftermath is DR28's calamity in the epoch at
its week, never the look (V06 §3.22).
(e) **Knowledge.** DR44 admits a condition at the viewer's effective key at the tier DR44 states — `public` where its map
row gives a look, `secret` where it is `none`, a key form listing the overlay's address admitting it whatever its tier
(J-V8.128).
(f) **Over time.** A crisis field's change — a new name, event, calamity link, arrivals or force size — is a ledger-only
change (V08 §3.5's `condition` row: `attr`, response `none`); the overlay's put and retire stay V08 §3.11's. A look
standing across an absorb redraws from the new carried facts; a save, load, undo, redo, regeneration or migration changes
no input (V08 §3.12). With no condition and no preview the map is byte-identical to the base (`item122.crises`, V12's
pin). T-V8-59 holds this part.

**(8) The forces' and groups' sizes (item 122 (h); J138; J-V8.129).** Armies, coalitions of armies and travelling groups
with their sizes are IN DEVELOPMENT in SettlementForge (owner, 2026-10-01): the pinned line carries no such field, so the
adapter of `5d699cc68` reads none and every look takes its fallback. The port's side is fixed now, so the adapter version
that reads them adds only its paths — a new adapter version (V08 §3.8), its rows written in V08 §2.4's field table and
confirmed by the final local check ((9)).
(a) **The digest.** Each force or group record becomes one entry of its condition's `forces`: `kind` `army` (a force) or
`group`, `heads` its headcount, for an army its `allegiance` (the power it serves, as the dossier names it, whose colours
its camp shows, §8.2) and `coalition` (the key its record names for an alliance of armies: armies sharing one key are one
coalition, each keeping its own camp), for a group its `groupKind` (migrants, pilgrims, a caravan, as the dossier words
it), and its `name`. A record naming a
condition (its id) or a stressor type joins that overlay; one naming none joins the overlay standing at the present
week whose `crisis.map` look is a camp of its kind, the most severe first, ties by key — an army `siege`, `blockade` or
`occupation`, a group `refugeeCamp`; one joining none is carried nowhere, noted `name_unjoined`.
(b) **The counts the dossier already gives.** A condition's `arrivals` is the rise of `populationHistory` across its
trigger week — the first entry at or after `triggeredAt.tick` less the last before it, when positive; its calamity's
`exodus` is the calamity's own ((7) (d)). §10.2 *Crisis looks* (c) reads them where no `forces` are given.
(c) **The fallbacks**, in order (item 122 (h)): the forces' headcounts; else the condition's `arrivals` or its
calamity's `exodus`; else item 122 (b)'s scale by severity and tier. A headcount of 0 or less, or one that is no finite
number, reads as none given, noted `field_fallback` with the field named. What the camps cannot hold inside the frame and
its margin is §8.8's massed marks on the ring at the city band, the panel giving the full number (V09): the port carries
the numbers whole.
(d) **The rates are V11's** — 45 m² a head, one engine per 1 500 besiegers, the coalition's spread (§10.2's settings); the
port carries headcounts only. T-V8-60 holds this part.

**(9) The dossier the only input, and the final local check's brief (item 125; J139; J-V8.130, J-V8.131).**
(a) **One source.** At run time the port reads SettlementForge only through the dossier: never its campaign state,
simulator, derived reads, realm map or code (the field table's `ignored` rows). `HostContext.week`, `.realm` and
`.customLibrary` are retired as inputs (item 125 (a); J-V8.130): the week is (4)'s, the climate the terrain's ((4)), the latitude DR29's
from the culture (V08 §3.5), the realm placement and the neighbours' bearings the generator's defaults or the user's
settings (layer 2's derived partners and `gate.pick`; DR1, DR3, DR19), and a custom definition's fields the dossier's own
(V08 §3.13 (8)). `HostContext` keeps `audience` (the role and knowledge key per viewer, view state that travels, §11.3),
`displayNames` (inside one export request, never stored, item 85) and `line`, which the selection checks (V08 §2.4) — none
a data input. A host's view commands stay commands ((4)).
(b) **What the map supplies.** Every read row of V08 §2.4's field table has its fallback — the generator's own choice,
exactly as on a map made without a dossier — so a missing, empty or unreadable field never refuses, never stalls, and is
reported by one `field_fallback` note per field whose fallback a mechanism took in that run (class `report`; its `detail`
names the fallback), the identity, population, seed, institution list and version stamps included (J-V8.134); the
fallback's value serves a creation, and at an absorb a field that takes its fallback — a row's own path; a record's
absent or unreadable sub-field is read by its row and compared — keeps its carried value, nothing moving, as on a map
made without a dossier (V08 §3.5's diff). A readable population above the cap is no missing field
but B7's refusal. A required
key's own absence stays a shape the line never writes (B3, refused by `select`, V08 §2.4).
(c) **The final local check's brief** (item 125 (d): the program's last step, after the coherence pass's verdict; the
owner: "read it from local"). Against SettlementForge's local checkout on the owner's computer, read-only, at the commit
the owner names, field by field:
1. every path a read row of V08 §2.4's field table names — present or absent, its shape and type as the row expects
   (scalar, list or object; the words of the row set it feeds), its values sampled against the row set's words;
2. every read row's fallback — the field absent or empty in the dossiers the checkout generates (a birth at each tier, a
   lived dossier after a week, a season and a year) takes the row's fallback;
3. the required keys and the optional keys read — each still written as V08 §2.4 lists them;
4. the crisis census ((7) (a)) — the stressor types, condition archetypes and crisis events the code defines, against
   the manifest's `crisis` lists and V11's `crisis.map` rows — and the condition the calamity kernel raises after a
   calamity, its archetype and `triggeredAt`, which (7) (b) and (d) read for the disaster look;
5. the in-development fields — the forces', coalitions' and travelling groups' records and their sizes ((8)), a
   current-week stamp, and any definition field of custom content (`customContentRoster`'s inner fields, V08 §2.8) —
   each present or absent, with its path and shape where present;
6. the result — one table of matches, mismatches and fixes, one row per path: `match`; `mismatch` with its fix (an
   adapter version with its `remaps`, a field-table row, a row-set word as a table fix, or a fallback); `new` for a path
   the dossier carries that no row names (an `ignored` row with its reason, or a read row with its fallback). Each fix
   lands before SF3 cuts its fixtures, and release row R9 re-runs the check at a new line.

(d) **The bars** (item 125 (e)): T125-1 – T125-3, taken by T-V8-61.

**(10) No map on a phone (item 126 (a2); J140; J-V8.132).** SettlementForge presents no map entry on a phone (item 126
(a2)): the Map tab — the DM's frame and a player's party viewer alike — and every map command are absent there, and the
frame carries no phone handling: no phone layout, screen, notice, catalogue row or default. A frame given a viewport below
the medium class keeps V09's medium layout at its 600 × 480 CSS px minimum and the tab scrolls (V09 §4.12); the client
sizes the frame, and the party viewer likewise, to the tab but never below that minimum (V08 §3.1 step 1). A resize
across the threshold re-lays nothing the document holds: the document, the view and the selection stay byte-identical.
T-V8-62 holds this part (T126-2's host-frame clause and T126-3's embed clause).

**What the port never does for these items.** It writes no event for a season, a festival, a crisis look or Find, sets
no view key — a host's view commands are §11.3's — and feeds no look or view back into the model; the readiness and the
history are read at creation and through the slice, the crisis fields through the ledger, never recomputed by the port at
render time.
=== END ===

=== REPLACE ### 3.17 Edges — every mechanism at its limits (principle (11)) ===
### 3.17 Edges — every mechanism at its limits (principle (11))

Every mechanism of this volume has a defined outcome at the extremes of its inputs, a rung of its failure ladder (§5:
check, repair locally, retry that piece, simpler shape, substitute, leave out and report — never a whole-map retry) and a
test (J-V8.117). T-V8-49 runs every row on the host harness (V08 §7.2) with the fixture pairs and test-side mutations, at
THORP (P = 40), HAMLET, VILLAGE, TOWN, CITY and METROPOLIS (the cap's 120 000 and one above it), with the village product
registered and without it, and through save, load, undo, redo, regenerate and migrate. The edge classes: **none** (no
input), **one** (exactly one item), **cap** (the maximum and its caps), **degenerate** (for the port, which carries no
geometry: empty, zero-sized, self-referring or coincident inputs; the geometry the map builds from them is the base's, whose
kernel refuses a degenerate result to its stage's failure class, E-GEN-1), **data** (missing, empty or contradictory, the
dossier included), **rungs** (every rung and toggle), **lifecycle** (save, load, undo, redo, regenerate, migrate). A dossier
event is never an undo target (§7.4), so a row's undo and redo clause is always the map edits' around it.

**(a) The mechanisms.**

| mechanism | the extremes and their defined outcome | rung | test |
|---|---|---|---|
| the map record (V08 §2.1) | data: a record read with a field its client version predates takes the default of V08 §2.7's migrate column; a tail whose `seq` has a gap, or whose last `logHeadAfter` differs from `logHead`, is a damaged store — the client reloads once, then the module's §2.9 step 3 verification runs B10's ladder; a `backups` entry whose `docId` is not the `mapId` is never restored (B10 and the restore skip it) | repair locally → B10 | T-V8-49 (a), T-V8-5 |
| the messages (V08 §2.2) | data: a message missing a required field or of an unknown type is ignored and reported (§11.3); a `dossier.offer` without `dossier` is `E_UNKNOWN_SHAPE` (B3); a `party.render` with empty `places` renders the base tier only; `exportScenes` with no format makes no request and returns `[]`; one: a `host.state` with only `party` updates only the party copy | check | T-V8-49 (a), T-V8-2 |
| the carried facts and the binding (V08 §2.3) | data: an offer to a document with no dossier block (a standalone document) is refused `E_OTHER_SETTLEMENT` — only a document created by the port is bound; a stored block unequal to the fold's rebuild is §2.9's load mismatch (the fold's wins, reported); two records of one key are `duplicate_key` (§14) | check | T-V8-49 (a), T-V8-5 |
| the digest's additions (V08 §2.5) | data: every addition is optional — no history → no replay, no readiness → null, no traditions → `[]`, no stamped tick → week 0 and the season control's midsummer (V08 §3.16 (4)), no forces → the counts' fallbacks (V08 §3.16 (8)); a readiness score outside 0–100 is clamped; a tradition window with no readable week is carried unscheduled (V08 §3.16 (5)) | check | T-V8-49 (a), T-V8-51 – T-V8-55 |
| the row sets (V08 §2.6) | data: a word no row lists takes the row's `else`, noted `unmapped_word`; a count range written with its bounds reversed (`(8-3)`) is read `[3, 8]`, noted; a range `(0-0)` places no member and carries the record, noted `not_placed`; rungs: the `site` row's water words force their water at every rung (village rungs through V07 §3.1) | substitute | T-V8-49 (b), T-V8-23 |
| custom content's records (V08 §2.8, V08 §3.13) | none: no custom content gives empty lists and no custom event; one: one keyword, one chain node, one service each digest as specified; data: a chain whose resource and processors join nothing is carried, drawn nowhere and noted; a definition entry for a definition or revision the dossier did not materialise is ignored (`library_mismatch`), and a definition whose fields the dossier does not carry takes item 104's generic siting (`field_fallback`); degenerate: a cross-link from a node to itself makes no row; lifecycle: the definition fields read are carried in the document, so a save, load, undo, redo or migration never needs the host, and a regeneration re-resolves from the carried facts | check; leave out and report | T-V8-49 (c), T-V8-25 |
| the embed (V08 §3.1) | degenerate: a tab of zero width or height creates no frame until it has a size; a frame shrunk to zero keeps its document and draws nothing; one: a campaign with one settlement mounts and switches as with many | check | T-V8-49 (d), T-V8-1 |
| offering and coalescing (V08 §3.2) | lifecycle: an offer while a load verifies waits for it; while an owner's upgrade is available it runs under the document's own output version; after a restore or a new map it follows the fresh `doc.load`; after the DM's own undo, redo or Re-derive moved the head it is stale and re-runs (B8); after a host undo of the dossier it converges forward (F22); one: a single version offered is absorbed once; none: an identical dossier is never offered | retry that piece | T-V8-49 (d), T-V8-6, T-V8-7 |
| the refresh queue (V08 §3.4) | none: an empty queue creates no frame; one: one map runs every step and closes the frame; cap: no count limit — the queue is serial, each map bounded by V08 §6's row, and a queue longer than the page's life resumes from `refreshPending`; data: a queued dossier that is unreadable holds its map (B3) and the queue continues, a record deleted meanwhile (B15) is skipped, another settlement's dossier is B6; rungs: village-rung maps refresh through the village product, a CITY or METROPOLIS map only beside a visible TOWN or smaller (page memory), a population above the cap is B7; lifecycle: a map opened visibly is absorbed there and dropped from the queue, a lease lost to a restore or a new map (`stale`) re-reads the record, a page reload resumes | retry that piece | T-V8-49 (e), T-V8-12 |
| the digest and the diff (V08 §3.5) | none: a dossier with no institution creates a map of its population and site with no dossier-bound use; one: one changed field makes one change; cap: more dossier-backed records than the map has seats — a THORP or HAMLET dossier with a few dozen custom institutions absorbed at once — seats every one past the last plot by §4.7 S10b's last rung (a new outside plot on the hinterland face nearest its affinity district, reported `W_DOSSIER_EDGE`), none omitted (§7.7 item 2); degenerate: a record listed twice under one key is `duplicate_key`, the later kept by `order`; data: a population of 0 is V08 §3.6 (7)'s; a population that is no whole number, or negative, takes its field-table fallback (V08 §2.4), noted `field_fallback`; one above the 120 000 cap, 10⁷ and beyond included, is B7's `E_RUNG_UNAVAILABLE` naming the cap (§1.1); an absorb whose `population`, `name` or `tier` is empty or unreadable, or whose `institutions` is no list: the carried value kept, no change, noted `field_fallback` (V08 §3.5); and where such an absorb's span crosses a year end, the epoch there targets the carried population, no epoch folding toward the fallback (V08 §3.6 (3)); a frozen fact changed is reported only | check; substitute (S10b's last rung) | T-V8-49 (f), T-V8-20 |
| the ladders (V08 §3.5.1) | degenerate: a record that is both a greater and a lesser of present records merges into its highest present greater only, once — the port walks each ladder row once, greatest first, so no merge loops whatever the rows hold; a `(lo-hi+)` with `hi` below `lo` reads as reversed bounds (above); cap: an open top stops at V11's per-kind-and-rung cap, reported; rungs: an unnumbered record at a village rung takes V07 §2.4's range row | check | T-V8-49 (f), T-V8-44 |
| changes to events and epochs (V08 §3.6) | none: no change writes no event (`unchanged`); a span with no year end, no crossing and no calamity makes no epoch, and an epoch's span holding no dossier event folds the epoch alone; one: one change is one event or one epoch entry, and a batch of one event is that event's own fold; cap: a catch-up's events fold one batch per epoch's span (V08 §6's absorb-with-epochs row), and where even one epoch over the span with them passes the catch-up's budget the wait completes past the comfort level, reported F-BUDGET-TIME (V06 §6.8 (6)); degenerate: an absorb whose week is the last epoch's own (`W₁` = `W₀`) or before it (a clock turned back): no epoch; late changes at `W₀`, finished, noted `late`; a late calamity's targets applied and the calamity held for the next folded epoch; a population move read at the next absorb past `W₀` (V08 §3.6 (3), (6), under §4.11 *The clock* (4)); a newly carried calamity dated at or before `W₀`, `W₁` after it: no epoch at its own week, riding the first epoch the absorb folds at `W₀` + 1 (V08 §3.6 (3)); a newly carried non-calamity change dated at or before `W₀`, `W₁` after it: folded at `W₀` + 1, applied finished, noted `late` (`unreceipted_change`'s `late` variant, V08 §4.6; V08 §3.6 (6)); data: an undated change is `unreceipted_change`; rungs: an epoch that crosses a product's band is V07 §2.1's fold; lifecycle: epochs replay from the log under their version, a batch's events one by one at their own `seq`, and an absorb's epoch is no undo target | check | T-V8-49 (g), T-V8-42, T-V8-63 |
| persistence (V08 §3.7) | degenerate: a compaction with no event since the last snapshot is skipped; `backupDepth` 0 keeps no backup, B10's second and third rungs are skipped and the restore control hidden; data: a quota below the snapshot's own size shows `host.status.overQuota` and never refuses a commit (B21); lifecycle: a snapshot, a restore and a new map each send a fresh `doc.load` | simpler shape (the trim order) | T-V8-49 (h), T-V8-5, T-V8-57 |
| versions and migrations (V08 §3.8) | degenerate: a remap list with no field re-baselines nothing and notes nothing; a `fromLines` identity that changes no key writes no `rebind`; data: a malformed version string is an unknown version — a schema read-only (§2.9 step 1), a line `E_LINE_UNSUPPORTED` — while a dossier's empty or unreadable version stamp is no evidence: the selection runs without it, noted `field_fallback` and `line_defaulted` (V08 §2.4) | check | T-V8-49 (h), T-V8-10, T-V8-11 |
| failure handling (V08 §3.9) | degenerate: two failures at once take their rows in the order of detection — load (B10) before offer (B3) — and a failure during a rung's recovery restarts that rung once (B2 during B10's rebuild re-creates the frame and rebuilds), then leaves the thumbnail; no row loops and none re-rolls | retry that piece, once | T-V8-49 (h), T-V8-14 |
| the village hand-off (V08 §3.10) | data: a `population` key absent is B3, an empty or unreadable one takes the default request of the tier word's rung at a creation and keeps the carried population at an absorb (V08 §2.4, V08 §3.5), noted, and a whole number above the cap is B7; a tier word disagreeing with the population is ruled by the population (DR23), the title keeping the dossier's word; a population exactly at the band's edge is V07 §2.1's; lifecycle: one document across both products survives save, load, a regeneration (the product at the document's rung) and a migration (each product's version axis) | check | T-V8-49 (i), T-V8-19 |
| determinism (V08 §3.12) | lifecycle: save, load, undo, redo, regeneration and migration leave the port's inputs — the log and the pinned tables — unchanged, so two editors' re-runs match after each | check | T-V8-3, T-V8-49 (i) |
| the players' view (V08 §3.14) | rungs: at a village rung the set covers V07 §5.2's township view; at METROPOLIS the z3 level stops at 64 tiles (the fallback 32); lifecycle: the set is stored outside the document, re-rendered when the head, the party revision or the output version moves (B18), a reveal of a place a restored map lacks is skipped and kept, an upgrade re-renders after the DM upgrades | leave out and report | T-V8-49 (j), T-V8-41 |
| the history's reading (V08 §3.15) | as V08 §3.15 (5) states each case | substitute | T-V8-51 |
| items 111, 114, 115, 117, 118 at the port (V08 §3.16) | data: a desert with no water word and no `oasis_water` has no oasis; a readiness absent leaves the threat alone; a record naming a grand word with no grand class is not "specified"; no stamped tick opens week 0 on the season control's midsummer; a tradition with no week is unscheduled; rungs: a government's `villageSeat` manor, seigneurial or crown, is specified at THORP, HAMLET and VILLAGE alike, and at TOWN and above no ceiling applies | substitute | T-V8-50, T-V8-52 – T-V8-55 |
| Find's dossier entries (V08 §3.16 (6)) | none: a dossier with no institution record offers no dossier entry, the class, area, place and people entries standing; one: a singular record is one entry of count 1; cap: every record of a METROPOLIS dossier, up to the adapter's 2 000 (V08 §2.4's `limits`), is an entry of Find's per-commit index, matched within item 120 (j)'s budget; degenerate: two records of one wording are two entries told apart by district, and a merged lesser selects its alias target; data: a `removed` record and one whose key binds nothing (`@none`, `@absent:*`, `(0-0)`) are no entry, a quarantined record keeps its carried words, and a record the key does not admit is never suggested or counted; rungs: at a village rung the records V07's resolution binds, pins included; lifecycle: a chip on a re-keyed record follows its anchor, a chip on a record the map lost shows 0 until cleared, and save, load, undo, redo, regenerate and migrate change an entry only through the binding rows they change | check | T-V8-58 |
| the crisis reading (V08 §3.16 (7); item 122) | none: no condition and no stressor → no overlay and no look, byte-identical to the base (`item122.crises`); one: one condition reads one row; data: an archetype, stressor type or event word the census or the rows lack reads `none`, noted `unmapped_word`; a condition with no `duration` has no `untilWeek` and stands while listed; one whose `untilWeek` is not after its `sinceWeek` never stands (§10.2 *Crisis looks* (h)); overlapping conditions each read their own row, §10.2's priority and density cap sharing the outskirts; a calamity target the map lacks is skipped, V01's pattern deciding; a calamity no `none`-row condition links to draws no look (its aftermath DR28's), and of several `none`-row conditions linked to one calamity only the earliest-triggered draws its disaster look (V08 §3.16 (7) (b)); a condition with no label carries no name; degenerate: a stressor listed twice is one overlay (one key); a stressor standing with a condition whose row gives the same look kind draws no look of its own — one look, the condition's, a force joined to the stressor drawn with it, the stressor's resuming in a week the condition does not stand (V08 §3.16 (7) (b)); rungs: THORP to the cap read alike, the scale §10.2's; lifecycle: a crisis field's change is ledger-only, and the look redraws from the carried facts after every save, load, undo, redo, regeneration and migration | substitute (`none`) | T-V8-59 |
| the forces' sizes (V08 §3.16 (8); item 122 (h)) | none: no force field (the pinned line) → the counts' fallbacks; one: one army; a coalition of one army is one camp; cap: a force larger than the frame and its margin can hold is carried whole and its excess drawn as §8.8's ring marks; data: a headcount of 0, negative or no number reads as none, noted `field_fallback`; a force naming no condition joins the most severe standing camp look of its kind, else none (`name_unjoined`); lifecycle: a size's change is ledger-only | substitute | T-V8-60 |
| the one input and its fallbacks (V08 §2.4, V08 §3.16 (9); item 125) | none: a dossier holding only the required keys, every optional key and every empty-able value absent, generates a full map, each absent read field one `field_fallback` note, no refusal; data: a dossier with no stamped tick opens at week 0 on the season control's midsummer; a host context present and absent give the identical document and hash; a `line` no adapter supports, or one the dossier's stamps contradict, refuses `E_LINE_UNSUPPORTED` (B5), and a registered, accepting `line` the selection did not take changes nothing, noted `line_differs`; two registered adapters accepting one dossier make the same document and hash under `line` naming either and with none; an empty or unreadable value of a read row — `id`, `name`, `tier`, `population`, `_seed`, `institutions` and the version stamps among them — takes its row's fallback, noted, never a refusal; an absorb whose `population`, `name` or `tier` is empty or unreadable, or whose `institutions` is no list: the carried value kept, no change, noted `field_fallback` (V08 §3.5) — every field that takes its fallback at an absorb alike, a field being a row's own path (a record's absent or unreadable sub-field read by its row and compared, V08 §3.5), an empty list read as listing nothing; a readable population above the cap is B7's refusal, never a fallback; a document created under a minted key keeps it at every later absorb; lifecycle: every fallback is re-taken at each port run from the same dossier, so a replay, reload or migration meets it unchanged | substitute | T-V8-61 |
| the frame below the medium class (V08 §3.16 (10); item 126) | degenerate: a tab below 600 × 480 CSS px keeps the frame and the party viewer at 600 × 480, the tab scrolling; a resize across the threshold leaves the document, view and selection byte-identical; a phone shows no Map tab (SettlementForge's rule) | check | T-V8-62 |
| editing (V08 §4.1, V08 §4.3, V08 §4.5) | none: a map with no edit absorbs as a map with edits (nothing to keep), and a map with no custom content has no custom declaration to keep; one: one element's change touches its disruption set only, and one declaration on a custom record names it by `inst:uid:<localUid>`, so it survives every rename and revision; data: an edit naming a dossier element the dossier removed is orphaned and reported (the pin yields, §7.4 — the dossier removing what an edit pinned), a declaration on a custom record the dossier no longer lists included (§7.7 item 3), and an edit of a custom chain's or service's fields is refused `dossier-owned` with the map-side alternatives (V08 §4.5); lifecycle: a removal of generated item-110 content is undone and redone by the log (the slot re-opens and closes), and a custom record's revision landing between an undo and a redo re-sites around the declaration in force at its seq | check | T-V8-49 (k), T-V8-37 |
| the host actions (V08 §4.2) | rungs: every control is offered at every rung by role alone; "Restore previous map" only while a backup exists | check | T-V8-47 |
| the host clerk (V08 §4.4) | none: with no map open a headless session answers and closes; one: one tool call is one `query` or `preview`; data: an answer field outside the projection's kept list never leaves the frame (the list is a whitelist); lifecycle: a proposal waiting across a load, an upgrade or an undo that moved its base is answered `stale` and dropped | check | T-V8-49 (k), T-V8-27 |
| the DM's view (V08 §4.6) | degenerate: an absorb group always holds at least one change (a run changing nothing writes no event); a note whose `keys` bind nothing admitted is not drawn | check | T-V8-14 |
| the Map tab and the frame (V08 §5.1) | none: with no thumbnail stored the tab shows its container and banner only; degenerate: V08 §3.1 step 3's zero size | check | T-V8-49 (d) |
| drawing the records (V08 §5.2) | degenerate: a chain whose consecutive nodes share one building draws no zero-length segment and one arrowhead; a condition with no target is named in the legend only; rungs: every row draws at every rung, village rungs through V07's product | simpler shape | T-V8-49 (l), T-V8-25 |
| pictures (V08 §5.3) | none: a map with no building still draws its ground, water and ruins; one: a `knowledge` option holds for its one export only — it lowers the requester's key and never raises it, a bare tier read with the requester key's places (item 572); data: a `displayNames` entry for an unknown key is ignored, an empty veiled text withholds the name as unnamed; lifecycle: thumbnails re-render at the next commit after a restore, a new map or an upgrade | check | T-V8-49 (l), T-V8-16 |
| what leaves the frame (V08 §5.4) | data: a bundle request for a format the calling key's rules refuse answers `export.refused` for that format and returns the others | check | T-V8-48 |
| labels (V08 §5.5) | none: an empty dossier name takes the generator's own at a creation (§10.4) and keeps the carried name at an absorb (V08 §3.5), noted `field_fallback`, so a title always exists; one: a single named place is named by the key rules like any; data: a name in a script the fonts lack falls to §9's glyph fallback, and a locale the module does not ship shows the source language | substitute | T-V8-49 (l) |

**(b) Where this volume's features meet the others'** — each with its outcome and its clause of T-V8-49 (m); its rung is the feature's own at its home, the port adding none: a dossier or custom record the feature's rule cannot seat takes F-SITING's rungs (§5.2: its closest option by §7.7's precedence, the hard rows it fails reported, never omitted), and the party column's rung is `check` (§9.2's admission under the party key decides what is named). The port
places nothing itself: a dossier record is sited by S10b's rules with its class's rows, a custom record by the class item
104 (a)'s resolution gives it, and the party set draws what the base draws under the party key. So every combination
below holds the base's or the named volume's rule for the feature, with the port's part stated.

| feature (its home) | × the dossier | × custom content | × the players' view |
|---|---|---|---|
| cliff, steep ground (§4.2 S1, item 106) | a dossier record whose class cannot stand on the slope is sited on the nearest admissible plot by S10b's relaxation, reported like any siting miss; a dossier element never forces a building onto a cliff face | as the dossier's, once its class is resolved; a custom chain's route follows the way graph, and a pair of nodes the cliff disconnects draws no segment between them (reported by the view's legend) | drawn as the base draws it; a revealed place on the edge named like any |
| river, coast, harbour (§4.2 S1, §4.3) | the water words force their water (V08 §2.6); a harbour record on a site with a river or a lake but no coast stands by §4.2 S1 (6)'s river or lake harbour; on a site with neither, it takes F-SITING's dossier rung — its first closest option by §4.7 S10b's order, the harbour hard row it fails reported — and is never omitted (§7.7 item 2; §5.2 F-SITING), while no harbour basin is drawn on dry land (§4.2 S1 (6): the basin left out and reported) | a custom `water` resource on a site with neither is its lake (V08 §3.13 step 4); a chain's endpoint at the quay or the gate facing its partner | drawn; ice and boats by the season (item 117), a look only |
| moat (§2.7, item 106) | a wall record's moat follows DR2 and the `era` row; the conduit house never takes a moat's water as an aqueduct source | a custom record needing water may take the moat by its class's row | drawn |
| raised ways, retaining walls, deck plots (item 110) | never dossier-bound (V08 §4.1); a dossier record may stand on a deck only by V11's `deckOk` | as the dossier's; a custom `landmark` feeds DR35 | drawn as generated content; their removal holds (V08 §4.3) |
| squares and markets (§4.4) | a market record claims the square by DR10; with no open space, the flanking square (the base's fallback) | as the dossier's | drawn; a festival's stalls by item 118's rows, a look only |
| the oasis (item 111) | exists exactly with `oasis_water` (J-V8.116) | a custom water resource is not an oasis unless its record is `oasis_water` | drawn with its grove and gardens |
| the frame and the zoom-out limit (§3.2 (9), item 116) | the frame is the dossier map's `bounds`, which the port does not set | — | the party set covers the frame of the city-band view (V08 §3.14 (2)); the viewer's zoom-out stops at the set's z0 |
| wards and terraced wards (V01) | quarter claims (§7.7 item 16) land on wards by V01's claim rule; a district-scale record becomes a neighbourhood (V08 §2.6 `distribution`) | as the dossier's | drawn; a ward name the party key does not admit is not named |
| building tiers, plans, crypts (V02, V03) | a crypted class by V03's rows; the grandeur ceiling's "specified" (V08 §3.16 (3)) | a custom record's `material` reaches only its material row (V02's use) | a crypt is drawn only at the building band and only for an admitted place (z3) |
| the underground: sewers, caverns, ruins, catacombs, vaults, accesses (V04) | DR30–DR32 inputs only (V08 §2.6a); a closure stagnates, never shrinks | a custom record resolved to a subterranean class takes V04's access rules; a custom `subterranean` resource is a mine or quarry at the hinterland edge | the party set draws the surface band only (no underground layer in the set); a revealed underground place is named in the gazetteer |
| sky islands, shade, sky access, landfall (V05) | the port reads nothing of the sky; `magical_node` feeds V05's node term (V08 §2.6 `deposits`) | a custom record never places an island (V05's own supply) | islands and their shade drawn by the base's rows under the party key |
| the history (V06, item 113) | read at creation only (V08 §3.15) | a custom record takes no part in the replay beyond the present's facts | the replay's remains drawn like any fabric; the history's story is the clerk's, the party gazetteer lists no replay record |
| crisis looks (§8.2, §10.2, item 122) | the looks stand on V01's outskirts land and never on water, a gate's passage or a label's keep-out (§10.2 *Crisis looks* (d)); a refugee camp at V06's growth frontier hands over to its suburb; a disaster's districts are V01's at TOWN and above and V07 §5.6 (3)'s units at the village rungs (its ends, or an end-less thorp's toft groups) | a custom record's building a disaster look stands over (§10.2 (f)) draws the ruined look like any (V02) | the party set draws the standing looks its key admits (V08 §3.16 (7) (e)) |
| light and the season (§8.2, items 102, 117) | the latitude (DR29) and the dossier's present week (V08 §3.16 (4)) are read; the model-side sun never moves with the season | a custom record's building lit like any | the party set drawn with the fixed sun, the season the view follows |
| editing, undo and save or load (§7, §7.4) | a dossier event is never undone; a map edit around it is | a DM's declaration on a custom record keys by `localUid` and survives every revision, undo and reload (V08 §4.5) | a reveal's undo is "Hide again"; the set is stored outside the document and survives every save and load |
=== END ===

=== REPLACE ### 4.6 The DM's view of what the dossier did ===
### 4.6 The DM's view of what the dossier did

Every line below is a catalogue key with its args (V09 §2.9's `MsgRef`); the words are written once, in this section's
tables, in V10 §3.9, in V06's chronicle templates or in V09 §4.9's rows (`history.dossierFacts.creation`,
`report.moved.<kind>`, `report.dossier.<state>`; J-V9.109), and the panels render them — no sentence is composed by the
panel (J-V8.99).

**The absorb group** (V09 §4.10). The history panel draws each committed absorb — its `dossierFacts` ledger event and the
port's `host:port` events after it, up to the next ledger event or another session's event (V08 §3.6 step 6; V09 §4.10's
dossier groups, J-V9.107) — as one group headed `host.group.absorb` ("{n} changes from SettlementForge, week {week}"), or
`host.group.absorbUndated` ("{n} changes from SettlementForge") when the ledger entry's week is null; `{n}` is the absorb's
`DossierChange` count. Inside the group, in this order:

1. **The changes.** Each dossier event is V09 §4.10's dossier-event row; under it stand the report entries it caused — the
   base report's `changes` (§5.4), each naming its `changeId` and reason — each by V09 §4.9's `report.moved.<kind>` row.
2. **The port's notes.** One line per note of the ledger event's `notes` (V08 §3.6 (4)): its `msg` rendered by the table
   below, with **Show** when its `keys` bind elements (each resolved to its address by V09 §4.10's `entity` read by
   `dossierKey`, item 583). A line whose `keys` bind an element the view's effective key (V09 §2.10; V09 §4.8) does not admit
   is not drawn (§11.2 *Knowledge*).
3. **What the absorb's epochs built by item 110.** Each epoch the absorb carried is V09 §4.10's `epoch` row — V06's chronicle
   for it (V06 W19; V06 §3.15.1): a raised way founded, finished, repaired or run dry is that chronicle's `raisedWay` entry,
   and its **Why here?** opens the way's `raised` section, whose row for a built way is `info.raised.built` with the DR34 or
   DR35 inputs it read as the answer's `facts` rows of tier `dossier` (V10 §3.9). A reason that fired at a slot the DM
   closed is one line `info.raised.suppressed` (`{w}` the removal's week; V10 §3.9, one key with V10's `raised` section),
   the history panel's "kept removed" line, drawn as V09 §4.10's `epoch` row's line, from V06's
   `EpochReport.raised.suppressedFired` (V06 §2.10, filled by the `raisedWays` pass, V06 §3.19.3 (2); J-V9.113), with
   **Show** on the removal's former outline. A way founded in a slot a cap increase opened is an ordinary founding entry —
   never the removed way's return (the slot rule, J-VI.14). The panel reads these from the epochs' records and reports (item
   110 (f) records each raised way's reason); it recomputes nothing.

The creation's prefix is listed the same way under V09 §4.10's creation row: its ledger event's notes as item 2, and, for
a settlement generated from its history, the replay's epochs as V09 §4.10's `epoch` rows (V06's `HistoryRecord` chronicle).

**The standing notes.** The report panel reads `report(h)` (§5.4's `GenerationReport`), and its dossier section (V09 §5.7's
"for a dossier-bound town") lists `GenerationReport.dossier` (the placement state — V09 §5.7's "V08's dossier state list"),
then `GenerationReport.dossierNotes` under `host.group.standing` ("How the map reads SettlementForge's record"), one line
per note as the absorb group's item 2 — its `msg` rendered by the table below, **Show** on its `keys`, and a line whose
`keys` bind an element the view's effective key does not admit not drawn. `dossierNotes` is the document's
`DossierBinding.notes` at the report's seq, copied by every derivation's report build (item 390), so every frame and every
reload shows the same list with no read of its own. The notes of class `standing` stay there while each port run writes
them, and appear in an absorb group only in the absorb that first wrote them. Notes of class `report` — and every note of an
offer answered `unchanged` or refused — reach only the host's report (`dossier.result.report`, `MapSession.on('report')`),
where the page renders them with the same keys through `statusText`.

**The held state** is no history row, since a held absorb commits nothing: the tab's banner (V08 §5.1) and the frame's
held notice (`HostSlots.banner`, V08 §3.1 step 7 (b)) show `host.status.held` and the reason row `MapRecord.held.reason`
(V08 §3.9).

**The party group.** Reveals, hides and a change of the party's base knowledge are listed as the DM's own actions
(`host.revealed`, `host.hidden`, `host.partyTier`), with the time the party pictures were last drawn
(`host.picturesDrawn`), in the panel's group "The party" through `HostSlots.historyLines` (V09 §4.10's group), which the
handler makes from successive `host.state` values (V08 §3.1 step 7 (b), (c)), since the record keeps no reveal history
beyond `party.prev` (J-V8.58). Each line is drawn by V09 §4.10's rule for the host's lines; its undo is V08 §4.2's "Hide
again" or "Reveal again".

**The port's notes in words** (J-V8.97 – J-V8.99). One row per `PortNote` kind — §14's union (item 508) and this volume's
three — key `host.note.<kind>` (the `held` kind: V08 §3.9's `host.held.*` rows). Each text is one sentence of at most 25
words in V09 §4.9's style; its args are the note's `msg.args`, filled by the port as the args column says — names as the
dossier writes them, never an id. **Show** lists what the note's `keys` hold. **Class** decides where the note is kept (V08
§3.6 (4)): `event` — the ledger event of the run that wrote it, drawn in that absorb's group; `standing` — the ledger event
only when new, then `DossierBinding.notes` while every run writes it, drawn in the report panel's dossier section from
`GenerationReport.dossierNotes`; `report` — the host's report only, never the document.

| kind | words (`en`) | args (filled from) | Show (`keys`) | class |
|---|---|---|---|---|
| `unmapped_kind` | "{name} is a kind the map does not know, so it is built like any {class}." | `name` the record's name; `class` the `label` cell (V11 §2.3; item 516) of the class that builds the record at the document's rung — at a village rung the class V07 §3.11 steps 2–4 give (the `villageForm`, the archetype's `village` cell, or the tag fallback, whose `market` entry names V11's `market` class, the open space's market) — or, for a pin kind a cell names, its `host.pinKind.<kind>` row (below this table); read after the fold (V08 §3.6 (4); J-V8.115) | the record | standing |
| `unmapped_word` | "SettlementForge's word "{word}" is new to the map, so it used its usual choice for it." | `word` as the dossier writes it (every "else …, noted" of V08 §2.6's rows) | the record carrying it, if any | standing |
| `ignored_key` | "One part of the settlement's record is not read by the map." | — | — | report |
| `unreceipted_change` | "{name} changed with no week recorded, so the map shows the change as already finished."; for a change carried at or before the last epoch's week (V08 §3.6 (3), (6); V08 §3.17), the row's variant `host.note.unreceipted_change.late` "{name} is dated before the map's last update, so the map shows it as already finished." | `name` the element's (the variant for a late calamity: the calamity's name) | the element (the variant for a late calamity: its resolved targets) | event |
| `rename_without_receipt` | "{old} became {new} with no record of a renaming, so the map closed {old} and opened {new}." | `old`, `new` the two names | the new element | event |
| `duplicate_key` | "Two records are both called {name}; the map keeps them apart by their order in the record." | `name` | both records | standing |
| `state_matches_absorbed` | "The record matches an earlier state again, so the map carries on from there instead of undoing what happened since." | — | — | event |
| `quarantined_record` | "One record, {name}, could not be read; it keeps its last state here and is tried again next time." | `name` the record's name, else its list's singular ("an institution", "a notable") | the element, when bound | standing |
| `quarantine_hold` | "One record could not be read, so nothing was removed with this update." | — | — | event |
| `adapter_remap` | "The map now reads {n} of the record's entries in a newer way; nothing on the map moved." | `n` the re-baselined keys | — | event |
| `line_migrated` | "The record now comes from a newer SettlementForge; the map follows it without moving anything." | — | — | event |
| `line_defaulted` | "More than one SettlementForge version could read this record, so the map used the newest."; for a version stamp read by its fallback, the row's variant `host.note.line_defaulted.stamp` "The record gives no readable SettlementForge version, so the map read it as {line}." | — (the variant: `line` the line taken, V08 §2.4) | — | event |
| `line_differs` | "SettlementForge names {named}, but the map reads this record as {line}, the version the record itself selects." | `named` the line `HostContext.line` names; `line` the line the selection took (V08 §2.4) | — | report |
| `held` | V08 §3.9's `host.held.*` row of the refusal's code and case | `cap` for `.cap` | — | report |
| `size_limit` | "The settlement's record is larger than the map can read." | — (the limit passed is `detail`'s) | — | report |
| `ladder_merged` | "{lesser} is counted as part of {greater}, so it is not built twice." | `lesser`, `greater` the two records' names (a GUILD hall: the guild and the COUNT record) | both records | standing |
| `ladder_promoted` | "{lesser} grew into {greater}, and the map now follows the two as one record." | `lesser`, `greater` (a promotion by receipt: the record's former name and its new one) | the greater | event |
| `ladder_unknown` | "{name} names a kind of growth the map does not know, so it is built as listed." | `name` | the record | standing |
| `chain_node_unjoined` | "{owner} names {node}, which is not in the settlement's record, so the map adds nothing for it." | `owner` the chain's label, or the dependency's resource word; `node` the unjoined name | — | standing |
| `unmapped_good` | "The map does not know the good "{label}", so it trades it as a general import." | `label` as the dossier writes it | — | standing |
| `npc_rebound` | "{name} came back when the record was remade and keeps the same house and work." | `name` the notable's | the person | event |
| `calamity_unplaced` | "{calamity} struck {target}, which is not on this map, so nothing there was marked." | `calamity`, `target` the two names | — | event |
| `custom_resolved` | "{name} is built like any {class} ({rung})." | `name`; `class` as `unmapped_kind`'s row reads it — V11's `label` cell of the class built, or a pin kind's `host.pinKind.<kind>` row (at a village rung the archetype's `village` cell decides: a `mercantile-market` record names the market cross by its `host.pinKind.market_cross` row, not the `market_hall`'s label); `rung` V09 §2.7's `chips` words for the deciding rung ("from its tags", "guessed from its name" …) | the record | event |
| `custom_unversioned` | "{name} carries no revision from SettlementForge, so the map watches its name, category, tags and scene for changes." | `name` | the record | standing |
| `custom_node_unjoined` | "{owner} names {node}, which is not in the settlement's record, so the map adds nothing for it." | `owner` the custom chain's label or the custom service's name; `node` | — | standing |
| `library_mismatch` | "{n} custom definition entries do not match the record's own versions, so the map left them out." | `n` the ignored entries | — | event |
| `custom_library_dropped` | "{name} was revised in SettlementForge; its old library details no longer apply until the record carries the new ones." | `name` | the record | event |
| `low_confidence` | "{name}'s kind was guessed from its name and description; you can set it yourself if it is wrong." | `name` | the record | event |
| `uncatalogued_step` | "{name} is a larger form SettlementForge's list does not name, so the map builds it as listed." | `name` | the record | standing |
| `derived_landuse` | "{name} needs {landuse}, which the record lists no source for, so the map opened some nearby." | `name` the first record needing it, in dossier order; `landuse` the land use's label (§4.9) | the derived site and that record | standing |
| `name_unjoined` | "{owner} names {name}, which is not in the settlement's record, so that link is left out." | `owner` the notable's or chain node's name; `name` the unjoined one | the owner, when bound | standing |
| `name_ambiguous` | "{name} could mean several records; the map took the first one listed, {chosen}." | `name` as written; `chosen` the record's name | the chosen record | standing |
| `custom_unkeyed` | "{name} has no id from SettlementForge, so the map follows it by name; a renamed copy starts afresh." | `name` | the record | standing |
| `count_over_range` | "{name} has {count} halls, above its listed {lo} to {hi}, because that many guilds are named on their own." | `name` the COUNT record's; `count`; `lo`, `hi` its range | the record | standing |
| `not_placed` | "{name} has no place of its own on the map." | `name` | — | standing |
| `frozen_fact_changed` | "SettlementForge now says {field} is {value}; the map keeps the ground and history it was first drawn with." | `field` the frozen fact's word (terrain, access, threat, magic, culture, isolation, history); `value` the new word as the dossier writes it | — | report |
| `history_gap` | "{name}'s greatest size is not recorded; the map shows it as {a tier} from the evidence." | `name` the settlement's; `tier` the effective peak's tier word (V08 §3.15 (3)); for a missing age, `tier` absent and the row's variant `host.note.history_gap.age` "{name}'s age is not recorded, so the map uses a usual age for its size." | — | report |
| `field_fallback` | "SettlementForge's record gives no {field}, so the map chose it as it would for a map made without a record." | `field` the field table's path as SettlementForge names it (`config.monsterThreat`, `traditions` …), the fallback taken in the note's `detail` (V08 §2.4; item 125 (b)) | — | report |

**The pin kinds' words.** Three message rows of V08's own `host.*` family, loaded by V11's registry row 87 with V08's other
`host.*` rows, give the words a note's `class` argument shows for the three pin kinds a record can name (V11 §3.11):
`host.pinKind.shrine` "wayside shrine", `host.pinKind.well` "well" and `host.pinKind.market_cross` "market cross". The
legend's own symbol-key words for every glyph are the base's and the application's (§9.5; V09), not this table's.

The group heads: `host.group.absorb`, `host.group.absorbUndated` and `host.group.standing` (words above). T-V8-14's walker
fails the build on a `PortNote` kind or a `PortRefusalCode` case without its row, on a row over 25 words, and on an arg a
row names that its note does not fill (a compile check over the union and the table).
=== END ===

=== REPLACE ### 5.5 Labels ===
### 5.5 Labels

The settlement's title is the dossier's name with its tier word (§9.5; §7.7 item 15); quarter names come from the dossier's
naming claims (§7.7 item 16); every other name the dossier does not give is generated from `site.culture` (DR14). A dossier
name is rendered as text — never as markup — and a name longer than §9.4's ladder allows overflows by §9.4's rules; an
empty dossier name takes the generator's own at a creation (§10.4; V08 §2.4's fallback, noted `field_fallback`) and keeps
the carried name at an absorb (V08 §3.5), so a title always has one. A place the dossier marks
`local` or `secret` is drawn but not named for a key that does not admit it (§9.2); the DM raises the party's knowledge
place by place with "Reveal to the party" (V08 §4.2), recorded on the map record for every player and every later picture
(V08 §3.14). The history panel speaks in SettlementForge's own reason words (`DossierChange.reason`) beside the map's rule;
the frame's interface language is SettlementForge's for its user (`MapHostConfig.locale`, carried in the frame's `src`;
J121): the shell loads `messages/<locale>.json` when the module ships that locale, else the catalogue's source
language, English (V09 §2.9), and the client's `statusText` defaults are generated from the same catalogue, which the host
may override with its own translation. A dossier's words — names, SettlementForge's reasons — are shown as SettlementForge
wrote them, in whatever language that is.
=== END ===

=== REPLACE ## 6 Performance budgets ===
## 6 Performance budgets

On §12.1's reference machine, p95 (item 480), measured by the host harness (V08 §7.2) with the frame on the module's own
origin and the host page on another; every row PLAUSIBLE until SF1's measurement (V08 §8), each with its pre-decided
fallback. B is the document's building count (§12.2); T(B) is §12.5's first-map law, M(B) §12.3's model law, V §12.6's
replay law.

| budget | TOWN | CITY | METROPOLIS | basis and fallback |
|---|---|---|---|---|
| host client in SettlementForge's lazy chunk | ≤ 12 KB gzipped with the party viewer (≤ 8 KB without it), 0 dependencies | same | same | a build check (T-V8-2); over it, the generated message types move to a lazily fetched JSON schema, then the viewer to its own lazy chunk |
| thumbnail on screen after the tab is clicked | ≤ 50 ms | ≤ 50 ms | ≤ 50 ms | one PNG ≤ 150 KB decoded by the browser |
| the player's tab: first party tiles on screen | ≤ 150 ms | ≤ 150 ms | ≤ 150 ms | the z0 tiles (1–4 PNGs) read from the record and decoded; over it, the public thumbnail first, then the tiles |
| the party picture set: render (an editing session's tile worker or the refresh frame) | ≤ 0.8 s | ≤ 1.5 s | ≤ 3 s | three levels of 256-px tiles plus ≤ 64 z3 tiles, the SVG and the gazetteer; §12.7's tile law; over it, z2 is rendered for the built-up area only (its empty tiles null) and z3 capped at 32 tiles |
| the party picture set: stored | ≤ 2 MB | ≤ 6 MB | ≤ 12 MB | PNG tiles at the §12.7 compression; the same fallback |
| frame boot to `ready` (chunks cached) | ≤ 400 ms | ≤ 400 ms | ≤ 400 ms | three worker starts and the model packages from cache; over it, the derivation pool starts after `ready` (§4.1 runs single-worker until it joins) |
| frame boot to `ready` (first visit, 50 Mbit/s, 40 ms RTT) | ≤ 1.2 s | ≤ 1.2 s | ≤ 1.2 s | ≈ 1.5 MB of chunks; over it, the chunk split moves the renderer's backends out of the boot set |
| load: `doc.load` + tail to the first live frame | ≤ T(B) + 5 ms per tail event | same | same | §2.9 step 3 (open-to-editable ≤ T(B)); the tail folds by §12.6's c(e); compaction keeps the tail ≤ 256 events |
| `hashDossier` in SettlementForge's page | ≤ 10 ms at 260 KB | same | ≤ 25 ms at 600 KB | canonical JSON and Web Crypto SHA-256; over it, the hash runs in a small worker the client starts |
| `dossier.offer` clone into the frame | ≤ 5 ms at 260 KB | same | same | structured clone |
| `digest` (limits, shape, records, keys, custom, the history, readiness, traditions, the crisis fields and the fallbacks) | ≤ 15 ms | ≤ 25 ms | ≤ 40 ms | a walk over ≤ 260 KB; linear in bytes |
| creation of a new map | ≤ 20 ms + T(B) | same | same | `creation` is table look-ups; `generate` reads the prefix ahead (§7.7 One path); a history replay adds V06's generation budget (V06 §3.20.4; §12's one-time total time, item 119) |
| an absorb without an epoch (a week: 1–5 changes) | ≤ 40 ms + 30 ms per element event | ≤ 40 ms + 30 ms per event | ≤ 60 ms + 45 ms per event | §12.6's post-build placement bound per event; the dry run's cost is the fold's |
| an absorb with epochs (a year) | ≤ 40 ms + Σ events + Σ epochs by the evolution engine's epoch budget (V06 §6) | same | same | a CITY year of ≈ 10 events and one whole-town epoch ≈ 0.7 s; a catch-up past item 119's comfort level coarsened by V06 §6.8 (6) (V08 §3.6 (3)). **The catch-up batch** (§12.10's R12-31: this path's own pre-decided change; J-V8.137). In an absorb that folds at least one epoch, the dossier events one epoch's span holds — dated in (the previous epoch's week, its week), those after the last epoch one more span — are folded as ONE BATCH, never one fold per event: one fold pass over them in V08 §3.6 (2)'s order, then the epoch, one dated at the epoch's own week riding its `EpochInputs.dossier` (V08 §3.6 (6)). Each event keeps its own `seq` and week in the log (V08 §3.6 (6)) and its ops run in order on the model the event before it left, so the log and the model at every `seq` are the per-event fold's; the pass shares what the per-event fold repeats — the provider distances §12.6 counts in each post-build placement (one multi-source Dijkstra per provider class over the L1 way graph) and S10a's class rasters, computed once for the classes the batch places and kept current inside it (an event that opens, closes or moves a provider, or changes a way, updates its class's distances and raster in place, equal to a fresh computation, ties broken in the same order), and the view stages (S13a's names delta, S14's display list), run once with the epoch's (§12.6's replay rule) — so the events' term grows with the epochs folded, not with the events. The absorb's dry run and every editor's re-run (V08 §3.3) fold by the same batches. **Its cost** (PLAUSIBLE until SF7 times it): per epoch folded ≤ 150 ms at TOWN and CITY (a village rung reading TOWN's) and ≤ 500 ms at the METROPOLIS cap, plus per event ≤ 3 ms at TOWN and CITY and ≤ 3.5 ms at the METROPOLIS cap, averaged over the catch-up's events (a light event — a state, attribute, rename, power or record put — at §12.6's replay cost; a placement its choice from the kept distances and rasters and its one designation mutation, §4.7 S11); a catch-up's estimate counts both (V06 §6.8 (1)'s events' term). **Its target:** T-V6-24's three catch-up fixtures — 20 years carrying 200 dossier events, 100 years carrying 1 000 and 100 years carrying 20 — each within the catch-up's budget at CITY and at the METROPOLIS cap, the sky layer off and on (the worst, 1 000 events at the cap inside an open with three islands, in one epoch: 1 310 + 3 × 260 + 500 + 1 000 × 3.5 = 6 090 ≤ 6 310 ms). **Its bar:** T-V8-63. Where even the batch's one epoch over the span passes the catch-up's budget, the wait completes past the comfort level, every dossier event at its own week, reported F-BUDGET-TIME (V06 §6.8 (6)); on any of T-V6-24's three catch-up fixtures that fails the release (its over-budget fixture, 100 years carrying 5 000 at the cap, taking that one-epoch fold reported F-BUDGET-TIME by design) until this path is changed again — never a declared miss (§12.10's R12-31) |
| `dossier.result` size, excluding `created`'s bytes | ≤ 2 MB | ≤ 2 MB | ≤ 2 MB | the ledger event carries before and after facts; over it, the result is split into ordered parts of ≤ 1 MB under one `re`. The `.plat` bytes of `created` and of `doc.snapshot.ready` are `ArrayBuffer` transfers (no clone), bounded by §2.9's document budget (≤ 0.6, 3 and 8 MB) |
| the refresh queue, per map (boot paid once) | ≤ 1.3 s after a year | ≤ 3.5 s after a year | ≤ 8 s after a year | load + absorb + two thumbnails (≈ 5 µs × B + 10 ms each) + a compaction (`.plat` encode ≤ 60 ms at CITY) + the party set (the render row above); a campaign of 20 CITY maps ≤ 70 s of background work |
| memory, one live map per frame | §12.8's rung line + 30 MB | same | same | the app's fixed heap; the refresh frame has no tile worker except while it draws thumbnails and the party set |
| memory, the DM's page, all frames | ≤ 161 MB (a visible TOWN frame whose built-in clerk holds an authoring turn, and a refresh frame at TOWN); ≤ 141 MB with no turn | ≤ 231 MB (a visible TOWN frame holding a turn beside the refresh frame at CITY, which runs only beside a visible TOWN or with the Map tab closed; a visible CITY alone with a turn ≤ 196 MB); ≤ 211 MB with no turn | ≤ 421 MB (a visible METROPOLIS frame alone holding a turn; a METROPOLIS refresh beside a visible TOWN holding one ≤ 381 MB); ≤ 361 MB with no turn, ≤ 291 MB with one frame | ≤ 1 MB for the client + Σ over live frames of (§12.8's line for its document + 30 MB): 40, 110 and 260 MB; at most one CITY or METROPOLIS document live on the page (V08 §3.4) + V10's scratch line (20, 55 or 130 MB at the frame's rung) in the one frame whose built-in clerk holds an authoring turn or a waiting proposal — configurations A and B, where that clerk runs in the frame; C opens no scratch, and the refresh frame runs no built-in clerk (J-V8.97); over the bar, V10 §3.19's overlay mode for that turn (V10's device fallback) |
| memory in SettlementForge's page, outside the frames | ≤ 1 MB + the thumbnails on screen; a player's page ≤ 1 MB + the party tiles in view (≤ 20 MB) | same | same | the client, its queue and the viewer's decoded tiles (released off screen) |
| storage per map record | ≤ 3.4 MB + 0.6 MB per backup (snapshot 0.6, tail and one kept segment 0.5, thumbnails 0.3, party set 2); with two backups ≤ 4.6 MB | ≤ 9.9 MB + 3 MB per backup; with two backups ≤ 15.9 MB worst, ≈ 8 MB typical | ≤ 20.8 MB + 8 MB per backup; with two backups ≤ 36.8 MB worst | §2.9's size budget plus the party set's row; the number of backups is SettlementForge's `backupDepth` and the allowance its `quotaBytes` (J121; V08 §3.7's trim order and B21) |
| an export-bundle scene file (from M-SF) | the scene export's own cost and §12's export-time peak, one export at a time; the client's copy into a `Blob` ≤ 5 ms per MB | same | same | the module's scene exporters, one request per format, between edit batches |

**Why these numbers.** The map tab must never feel slower than opening the standalone map: the load row is §12.5's own law,
and everything the stage adds on top — the hash, the clone, the digest, the diff — is under 100 ms at every rung. The
refresh queue trades time for memory (V08 §3.4): it is background work the DM never waits on, and a map opened before its
turn is absorbed at once in its own frame. The history reading, the readiness, the traditions, the crisis fields and the fallbacks
are part of the digest's row; a season, a festival or a crisis look costs the port nothing (a view's look, §12.5).
=== END ===

=== REPLACE ### 7.1 The bars (T-V8-n) ===
### 7.1 The bars (T-V8-n)

Each bar names its CI tier (§13.8: PR, nightly, milestone) and the step of V08 §8 from which it runs (item 486). Fixtures
are §13.2's frozen dossier set (items 83, 84) — never a live SettlementForge — plus test-side mutations of a fixture's digest
or JSON made by the harness at run time, never written back into a fixture file. V12's item-122 and item-125 fixtures are
test-side mutations made here (X-V12-5), each in §13.2's frozen manifest: the **crisis fixtures** — on `town-1`, `city-1`
and `metropolis-3`, a siege by a two-army coalition (under T-V8-60's test adapter version), a refugee wave, a plague with
its affected quarter, a famine, a fire, a flood and an earthquake — each of the three a carried calamity with its linked
`reconstruction` condition (V08 §3.16 (7) (b), (d)) — and an occupation, each standing through part of the year at its
severity, with one week on `city-1`, and one on a copy of `metropolis-3` mutated test-side to the population cap's
120 000 people (as T-V8-36 mutates `city-1`), in which the siege, the plague's quarantine and the refugee
wave stand at once at severities whose camped ground together passes `densityCap` of the outskirts' free land (V12
§3.15.12's `crisis.share`, T122-6; X-V12-5), the calamities' `targets` resolved (V08 §3.16 (7)); on `city-1` a second
fire naming more target districts than its severity's share of the place's units, and a fire at severity 1 on a fixture
holding a district the adjacency from its seed does not reach (a fire never jumps a gap, V01 §3.16 (4)) — `town-1`,
whose river runs through its core (§4.2 S3 (1); its `riverside` terrain and `river` access, V08 §2.6's water words)
and parts its districts into two banks no seam joins (a water run is a one-sided seam, II.1), the fire's `targets` naming
one use on the bank holding fewer districts than the fire's count, so its order ends at that bank before the count, the
shortfall reported (V01 §3.16 (5)), the harness asserting that bank's count below the fire's before the bar reads it
(X-V12-5); the **force fixtures** — under T-V8-60's test adapter
version, single armies of 1 000, 4 000 and 12 000 heads, a coalition of two armies of 4 000 beside one army of 4 000 and a
migrant group of 3 000, each at TOWN, CITY and the METROPOLIS cap, and a 60 000-head siege of a THORP; the **required-keys
dossier** — T-V8-61 (a)'s reduction made of a dossier at every rung (V12 §3.15.15).

| bar | what it proves | tier, from |
|---|---|---|
| T-V8-1 | the embed boots on Chromium, Firefox and WebKit (Playwright) with the frame on its own origin under V08 §3.1's sandbox flags and both CSPs; `ready` within V08 §6's rows; a message from a wrong origin or from another window of the right origin is dropped and logged (§11.3) | PR, SF0 |
| T-V8-2 | `@plat/bridge-client` is ≤ 12 KB gzipped with its viewer (≤ 8 KB without), imports nothing (a bundle scan), and its message types equal `@plat/api`'s bridge schema field for field (a generated-types diff); a type-level check that every `MapStore` write parameter (`encoded`, `seqAfter`, `logHeadAfter`, `SnapshotBlock`'s fields, `PartyPictureSet`) is a field of a message the client receives, so the host computes nothing it stores | PR, SF1 |
| T-V8-3 | two editing clients offering `create` for the same settlement at once: the host stores exactly one record, and the loser's document is byte-identical to the stored one (canonical bytes and model digest); two editors' absorbs of the same dossier on the same head are byte-identical, every event with session `host:port`; on the nine at-rung births × 5 seeds | PR, SF2 |
| T-V8-4 | `hashDossier` gives one value for every key order and whitespace of the same dossier, a different value for any changed scalar, and equals a Node reference implementation on every fixture | PR, SF1 |
| T-V8-5 | against a `MapStore` that stores bytes only and never decodes, hashes or computes a head: snapshot + tail replays to the session's model digest at every compaction point of a 1 000-event scripted session (edits, undo, redo, 12 absorbs); compaction at 256 events and 256 KB, including an edit committed between `doc.snapshot` and `replaceSnapshot` (the suffix kept); the backups rotate to `backupDepth` with `tailAfter` on `backups[0]`, run at depths 0, 1 and 2; after a 100-absorb script and a save–load round trip, the dossier block the fold rebuilds equals the stored one at every seq | PR, SF5 |
| T-V8-6 | a dossier differing from the carried state only in never-read keys, prose or below the digest's rounding returns `unchanged`: nothing appended, `lastOffer` updated, the document's bytes untouched | PR, SF2 |
| T-V8-7 | five dossier versions offered within one in-flight absorb: one further absorb against the newest; the carried facts after it equal the newest digest's; no change lost (each element's final state equals the newest dossier's) | PR, SF2 |
| T-V8-8 | convergence through the bridge: a host with a DM, a co-DM and two players' party viewers; 500 interleaved map edits (undo and redo from both editors), 12 weekly offers and one yearly: both editors' model digests equal at the end, 0 lost accepted events (§11.3's M3a test, extended to dossier offers); each editor re-runs every applied absorb it holds the dossier for with 0 mismatches, and a result with one event altered in transit is reported as a port mismatch by the other editor while the log stands; the players' pages receive no document message at any point | nightly, SF2 |
| T-V8-9 | quarantine: a fixture with one institution record mutated to fail its own checks absorbs every other change, lists the record in `quarantined` with a `quarantined_record` note, leaves its element's building and use unchanged; with the record's key unformable, every carried institution key absent from the digest is held (no `remove`, one `quarantine_hold` note); the next offer with the record repaired absorbs it; a save–load round trip shows no dossier-block mismatch | PR, SF3 |
| T-V8-10 | adapter remaps are declared: a test adapter version that changes a field's meaning without listing it fails the bar on the re-cut pairs; listed, the re-baseline emits no map event and notes `adapter_remap` | nightly, SF3 |
| T-V8-11 | a line change: a test "line B" adapter with `fromLines` identity re-keys by `rebind` only, changes no address, notes `line_migrated`; without a `fromLines` row the map is held with `E_LINE_UNSUPPORTED` and a later line-A dossier absorbs normally. Two registered adapters both accepting: the same document and hash with `HostContext.line` naming either line and with none — a bound document on its line, a new settlement on the newest, noted `line_defaulted`, a named line the selection did not take noted `line_differs` (class `report`); `E_LINE_UNSUPPORTED` only when none accepts, or when the named line is unregistered or its adapter refuses the dossier | nightly, SF3 |
| T-V8-12 | campaign scale: 20 maps (the nine births × seeds, grown to CITY where the fixture allows) after one year: every record `current`; the frame's memory peak ≤ one map's line + 30 MB; the queue pauses on input and resumes 5 s after; a page closed mid-queue resumes from `refreshPending`; the total within V08 §6's row | milestone, SF7 |
| T-V8-13 | `doc.snapshot`: creation, compaction, upgrade and rebase store the reply's `SnapshotBlock` as handed; its `documentDigest` equals the module's own; a restore and a new map send every open session a fresh `doc.load` and leave none on a lost head; a restore of a backup with another `docId` is refused | PR, SF2 |
| T-V8-14 | the failure ladder: each of rows B1–B21 of V08 §3.9 forced in the harness takes its stated rung and shows its column's catalogue keys with their args (never compared as words); no row changes a stored snapshot except B10's rebuild and a DM's restore; B10's second rung is exact with `tailAfter`, and B11 creates a new map under a new `mapId`; B3 is forced by a limit and by a dossier missing one required key (refused by `select`), and B5 by a dossier holding every required key whose readable `schemaVersion` no registered adapter serves. **The words' walker:** every `PortNote` kind of §14's union and of V08 §2.4 and every `PortRefusalCode` with `E_RUNG_UNAVAILABLE`'s three cases has its row (V08 §4.6, V08 §3.9), every `host.status.*`, `host.party.*`, `host.group.*`, `host.recovered.*`, `host.verify.*`, `host.control.*`, `host.dialog.*`, `host.playersView`, `host.mirror.dropped` and `host.frame.title` key named here has its row (V08 §5.1, V08 §4.6, V08 §3.9), each row ≤ 25 words, and every arg a row names is filled by the port for its note (a compile check over the union and the tables); on `town-1`'s pairs an absorb's `event` and new `standing` notes are drawn in its history group from the ledger event in a second editor's frame and after a reload, the standing set in the report panel from `report(h)`'s `GenerationReport.dossierNotes` (equal to `DossierBinding.notes` at the report's seq in each of those frames, `[]` on an unbound document, listed after `GenerationReport.dossier` under `host.group.standing`), a standing note is not carried again by the next absorb that still writes it and is cleared by one that does not, and no `report` note enters the log; on a test-side variant of `town-1` whose one standing note's record and one event note's element are `secret` places, both lines are drawn at `secret` and neither is drawn — in the absorb group or the report panel — under View as "What anyone knows" or under "See what the players see" with a party key that omits them | nightly, SF6 |
| T-V8-15 | held and recovered: an unreadable dossier holds the map; a later readable one absorbs every change since the held state in one pass; in a build without the village package a population falling below 1 500 holds and returning above absorbs; with a test `ProductDecl` registered, a population of 0 at an absorb routes to THORP and V07's desertion — the map deserted, never held, for a village-product document and, through V07 §2.1's fold, for a base-product one — and a creation at 0 is refused `E_RUNG_UNAVAILABLE` naming the floor | PR, SF3 |
| T-V8-16 | display names through the bridge (T85-3 over the real transport): the public picture draws the veiled texts, title included; the document and the next export are unchanged; a `knowledge` option never raises the requester's key — a bare tier is read with the requester key's places and a key form as a key in its own right (item 572), and the thumbnails' and gallery pictures' `knowledge` is `{ tier: 'public', places: [] }` whatever places the requester's key holds | PR, SF4 |
| T-V8-17 | the players: a bridge trace of a player's page shows no `doc.load`, no `dossier.offer`, no `query` and no frame; `mount` refuses the word `player` before a frame exists; the party set's SVG and gazetteer contain none of the names the party key withholds (a byte search for every withheld name on every fixture) and the tiles are drawn from a display list that holds none (an instrumented render); every `gazetteer` and `people` query of a party render carries `admitAs` = the party key resolved by V08 §3.14 (1), in item 572's key form with `places` present, and every picture of the set the same form as its `knowledge` (an instrumented facade); each audience word gets exactly §14's role and key through `doc.load.audience`, the module taking the lower of it and `role`; anonymous, gallery and DM-full shares get pictures only | PR, SF4 |
| T-V8-18 | the staged records and the real vocabularies: conditions put whatever their status (`stable`, `worsening`, `easing`) with weeks from their ticks — `untilWeek` within ±1 week across town-1's and city-1's one-week, one-season and one-year ticks, else the pre-decided absolute-tick reading — and retired when unlisted; stressors put as overlays with no epoch event; deposits put, `bearingCdeg` and `landUse` written by S12a and recomputed on regeneration; relations put by the `relations` row; a successor notable inherits the house and posting; a reroll re-binds a notable by name and role (`npc_rebound`); a replay from the log rebuilds every record; a user's or clerk's edit of their fields is refused `dossier-owned`; TOTALITY: every relation type and trend, history event type and template word (the `historyScars` and `historyEvents` rows), condition status and archetype, stressor type, `magicLevel`, `materialFamily`, custom definition `economicWeight` and `criticality` word (the `customWeights` row, J-V8.108), isolation path, chain status, dependency severity, qualifier word, readiness label and tradition type in the fixtures has a row or the declared else, with 0 `unmapped_word` notes on the fixtures; the derived land use: a test-side mutation of `town-1` adding a `Salt works` record, with no salt deposit, has one `saltpan` face from `res:derived:saltpan`, noted `derived_landuse`, and its salt works within 0 of it (the hard row met, no closest-option report); a second salt-working record adds no second face; adding `salt_flats` later opens the deposit's own face and leaves the derived one standing; removing every salt-working record puts the derived site `depleted`, its face drawn worked out; and every class a `kinds` row binds whose hard `near` → `landuse:<k>` row within 0 names a land use outside §4.9's rings has its land use in the `deposits` row's derived list (a compile check); every row set V08 §2.6 writes compiles with `calibratable: false` on every column, T-V11-37's clause run on V08's sources (J-V8.107); **at VH**, a hamlet fixture with a `Peat cutter` record and no `marshlands` has its `marsh` face read by V07 §3.9's claim | nightly, SF4; the hamlet clause nightly, VH |
| T-V8-19 | the village hand-off with a TEST `ProductDecl` registered in `StrategyRegistry.products` (the port registers nothing): a sub-1 500 dossier is created on its rows; a town shrinking out of the band below 1 500 and a village growing out of it above keep one document, one seed and every standing address outside the epoch's disruption set; a target alternating 1 480 / 1 520 changes the product 0 times, one alternating 1 400 / 1 600 at every epoch (V07 §2.1's band) | milestone, SF4 (VH with V07) |
| T-V8-20 | limits, the ignore clause and the closed digest: dossiers over each limit refuse `E_UNKNOWN_SHAPE` with `size_limit` naming it and copy no over-long string; on every fixture the port reads no path outside the adapter's field table (V08 §2.4) — a proxy-wrapped dossier records every property access, and every access is a `keyList` path; no path an `ignored` row of the field table names is read — `defenseProfile` only at `readiness`, `powerStructure.previousGovernments[]` only at each entry's `tick` | PR, SF3 |
| T-V8-21 | `PortValues`: with values present the staged readers read the slice's; with nulls, the table's; T88-1 unchanged on the golden suite | PR, SF4 |
| T-V8-22 | the latitude: the culture row, else 50; `Intent.latitudeDeg` holds it from creation; a later `cultureProfileKey` writes `frozen_fact_changed` and moves nothing; no input after creation changes the latitude, and T1 `intend`'s `adjust` sets it as a map edit; a document without the field reads 50; with item 102's `w_sun` at its default, T73-7 holds on every at-rung birth (a dossier map stays within one band of its wealth row) | PR, SF4 |
| T-V8-23 | the tag and category vocabularies: every tag of the fixtures and of the line's tag vocabulary has a `tags` row or the declared no-family fallback; every category and content group has a `categories` row; `unmapped_word` notes 0 on the fixtures | PR, SF3 |
| T-V8-24 | coverage inside a collective range: every collective count inside its range on every seed; with coverage rows filled, the share of districts served rises above the random-placement baseline (item 103 (f)'s bar) while the counts stay inside the ranges; with the coverage weight 0 the digest equals the no-coverage build | nightly, SF4 |
| T-V8-25 | custom content's arrival (item 104 (g)'s port side): on `town-cc-1` and its test-side variants — a custom record with only a category; category and tags; a scene archetype; definition fields the dossier carries (a test-side `customContentRoster` entry at the materialised revision); an active chain — each digests to the specified `custom` part, chain, resource and service; a definition entry at another revision is ignored with one `library_mismatch` note; a definition whose fields the dossier does not carry takes item 104's generic siting, noted `field_fallback`; the client carries no library (a type scan of `@plat/bridge-client`); a new content hash emits one `setAttr` of `custom.revision`; a chain toggled inactive, then dropped, then listed again puts, retires and re-puts one record and moves no node; `archetypes` has exactly the line's 17 ids; zero refusals from custom input; the class is decided at fold, not at digest — a custom record with no archetype and a keyword whose `class` cell names a class resolves to that class, a map declaration for its `localUid` outranks every rung, and the `custom_resolved` note names the deciding rung; on the active-chain variant with one joined processor made a `secret` place (a test-side mutation), read at `public` and at a party key form without that place: no line, arrowhead, legend row, gazetteer `customChain` row, GeoJSON `supplyChain` feature or `supplyChains` path in an SVG export, and all of them at `secret` | PR, SF4 |
| T-V8-26 | the release checklist (V08 §8.3) runs as one script and fails on any unticked row | milestone, SF7 |
| T-V8-27 | door 1, structurally for every structured format: a type scan of `@plat/bridge-client` finds no geometry-bearing field in any value it returns except the opaque document bytes, the pictures and the export bundle's `Blob`s; `exportPicture` accepts only `png`, `svg`, `print`; a host `export.request` for any other format is refused `E_HOST_FORMAT`, save `dd2vtt` and `foundry` with `bundle` (T-V8-48); `doc.snapshot` from a viewer is refused `role` and from an editor answered; the host projection is asserted on the BYTES THE MODULE POSTS (a transport tap in the harness records every `query.result` and `preview` reply leaving the frame): on the fixture answer of every offered kind — `gazetteer`, `people`, `whereIs`, `relations`, `fates`, a `preview` reply, `brief`, `entity`, `sites`, `why` with sections, `frame` without radius, `rule`, `profile` — no coordinate, ring, bearing, distance, extent or viewport field; `measure`, `hit` and `inView` are refused `E_HOST_KIND`; the stored party gazetteer's bytes likewise; a source scan finds no projection code in `@plat/bridge-client`; under V10's configuration B every tool result leaving the frame passes it | PR, SF6 |
| T-V8-28 | inert custom text: T85-1's hostile strings as custom names, categories, tags and descriptions — and as tradition names and staging prose — reach every exporter inert; the description and the staging prose occur nowhere in the document, the digest or the carried facts (a byte search) | PR, SF4 |
| T-V8-29 | the upgrade flow: an owner's client alone gets `upgrade-available`; the party pictures keep the stored version's drawing until the DM upgrades, then re-render; the dialog names what the new version adds, item 110's content among it; the `upgrade` event is compacted at once and its undo works while `from` is in the retention window | nightly, SF5 |
| T-V8-30 | the budgets: every row of V08 §6 measured on the reference machine by the host harness, the page-level memory row with a METROPOLIS refresh beside a visible TOWN, and once more under V10's configuration B with a proposal waiting — in a visible TOWN frame beside a METROPOLIS refresh, and in a visible METROPOLIS frame alone — against the row's with-turn bars; a miss takes its row's fallback and is reported for the owner's veto (§12's rule) | milestone, SF7 |
| T-V8-31 | recognition: every pair fixture — the 35 births and the 12 after-tick dossiers, 41 to 47 top-level keys — is recognised and absorbs; an unknown extra key is accepted, dropped and noted `ignored_key`; a dossier missing one required key is refused `E_UNKNOWN_SHAPE` | PR, SF3 |
| T-V8-32 | item 109's sources (DR30, DR31): a dossier with `ancient_ruins` or a `ruined-landmark` record has a ruin system, else V04's stated reason; `magical_node`'s site stands at the ruin's centre when the ruin has another source; a `mountain` dossier's relief is `mountainous` and a `hills` one `hilly`; a mining deposit sets V04's mining test; ley lines, a magical history event and a delving record reach `site.ruinEvidence`; the ancient founding reaches only `HistoryHint`, and an ancient "Fall of" event reaches DR38, never `site.ruinEvidence` | PR, SF4 |
| T-V8-33 | the burial and crypt trace (DR32): on every birth, 0 catacombs sourced on a church, the cathedral or a monastery's church; the cathedral's crypt is the largest; `metropolis-3`'s two cathedral records give one building (`ladder_merged`); the church count counts each church once (the metropolises' two ranges merged); below TOWN no catacomb; a cemetery closed by a dossier event leaves its catacomb's extent unchanged across the next three epochs; a TOWN-to-CITY promotion pair (a test-side mutation of `town-1` grown past 10 000 with the city burial record added and the town one kept, then dropped) closes no burial face — `rebind` only, `ladder_promoted` | nightly, SF4 |
| T-V8-34 | name resolution (V08 §3.5 (6)): on the pairs, every chain processor, dependency institution and calamity target resolves exactly, by kind family, or is noted unjoined; the exact share at least the survey's (2 585 of 3 381) and the kind family's gain measured and reported; an unjoined processor never creates a building | nightly, SF4 |
| T-V8-35 | the supply links (DR33) on `town-1` and `city-1`: every chain with two joined members yields a link; an impaired chain's pull equals V11's status factor × a running one's; an entrepot chain's ends pull toward the gate or quay facing its partner; the links are never stored (a byte search of the document for a link record finds none) | PR, SF4 |
| T-V8-36 | the water system (DR34) through the bridge: on `sample-blackcrag` (CITY, mountain, a bath-house) and `city-2` (riverside), every generated aqueduct's reason is recorded and its terminal is the dossier's conduit house; `city-1` mutated to 8 000 people (rung TOWN, the city record kept) has 0 raised ways; `metropolis-2`'s aqueduct cap is one above `metropolis-3`'s under the same sources (a test-side mutation giving both the same site); a record closed by a test-side mutation leaves the arches `disused` and in place; no aqueduct draws on a hot spring; with item 110's rows off the T73 runs are byte-identical through the bridge | nightly, SF4 |
| T-V8-37 | the removal hold: on `sample-blackcrag` and `city-2` the DM removes every generated raised way; after 12 weekly offers, a yearly offer moving the population past the roster tolerance, a rung-TOWN mutation grown past 10 000, a line re-key and an `upgrade`, 0 removed raised ways stand again at their slots and the conduit house stands; a clerk's removal proposal is accepted, never refused `dossier-owned` | nightly, SF4 |
| T-V8-38 | the high-ground landmarks (DR35): on the CITY and METROPOLIS births, every elevated road's recorded reason cites only institutions of significance at least `elevated.landmarkMinSignificance` (V11 §3.24.2), custom `landmark` records or high wards, and 0 landmark strings | nightly, SF4 |
| T-V8-39 | the culture's reach: `city-3` with its culture mutated to `mesoamerican`, test-side, with V11's stepped rows on, makes the stepped specialisation eligible, its chance row read and cited in the temple's provenance; the aqueduct chance reads the culture's modifier row; with item 110's rows off, byte-identical | nightly, SF4 |
| T-V8-40 | the dry-site toll bridge (item 399): each of the six base-rung dry births (`culture-arabic`, `-celtic`, `-east_asian`, `-mediterranean`, `-slavic`, `town-3`) has a brook, a bridge where the longest approach crosses it and the toll house within 30 m of that bridge, with 0 raised ways; a `desert` mutation without `oasis_water` whose arid row drew no water gives the gate toll house and a `toll_bridge_dry` note, and with `oasis_water` the brook; an `isolated` or `none` access mutation gives `toll_bridge_dry` at a base rung as at a village rung; a toll bridge record arriving by a later absorb re-draws no terrain; **at VH** a hamlet with the record has its brook between the two frame arcs (an estuary on a coastal mutation) | PR, SF4; the hamlet clause PR, VH |
| T-V8-41 | the party picture set: re-rendered after a committed absorb, 30 s after the last committed edit batch that changed a drawn mark, and at once after `setParty`; two renders of one head and one party key are byte-identical; a reveal made by the DM is seen by a player who opens the tab afterwards and by a second player; "Hide again" restores the previous party; public notes and view pins are drawn, private ones never; B18 detects a stale set by head, party revision or output version; `putPartyPictures` keeps the newer of two concurrent sets; the render and storage rows of V08 §6 hold; with "See what the players see" on, the frame's city band equals the party set's z0 picture at the same head (a pixel diff, both drawn with the fixed sun), the frame's knowledge key stays `secret`, the document's view section is byte-identical before and after the toggle, `doc.snapshot` is answered and the export menu still offers the document formats; a `host.state` carrying a new `party` re-resolves the filter; the crossing (J-V8.91): each render is one `party.render` answered by one `party.rendered` whose set's `partyRev` is the request's `party.rev` and whose `seqAt` is the head drawn; a map edit batch that changes no drawn mark and no listed word (a lock) is answered `unchanged` and writes nothing to the store; an edit that renames a revealed place is answered `rendered`; a viewer's `party.render` is refused `role` | PR, SF5 |
| T-V8-42 | the calamities (DR28): the lit `city-1` pair yields its week-52 calamity as one `EpochInputs.events` entry with severity `major` (≈ 0.09 of the population) and V06's `topple` in its resolved targets' district; a target that joins nothing is dropped and noted `calamity_unplaced`; a calamity leaving the line's capped list is never undone | nightly, SF4 |
| T-V8-43 | the sea threats: a coastal test-side mutation of `city-2` with a `wartime` stressor carries `naval` and DR2 reads it through V11's waterfront row; the same site at peace carries none (or `exposedPort` at 20 000 or more with a port); an inland site carries none; a change of the keys reaches DR2 at the next epoch, never mid-epoch | PR, SF4 |
| T-V8-44 | the ladders (item 108 (f); takes T108-1 – T108-3's dossier clauses): the fourteen qualifier words parse to their steps; `(50-100+)` sets `openTop`; `(10,000+ only)` is a population floor, never a count; no double counting — each metropolis's two church ranges and `metropolis-3`'s two cathedral records merge; a `promotedFrom` receipt re-keys to `#1` and adds members where the greater's thing is the lesser's, and places a REPLACEMENT greater of a new thing new under the record's key, its row re-pointed and the lesser's former thing standing unbound (V08 §3.5.1 (d)); a `demotedFrom` keeps the member nearest its demand; the institution count parity of V08 §7.3 holds by step type on every fixture; a GUILD record beside a guild COUNT record of its family places no second hall — its hall is a COUNT member `#k`, noted `ladder_merged`; an unnumbered record at a village rung takes V07 §2.4's range row, else V11's range unscaled | nightly, SF4 |
| T-V8-45 | the DM's history lines (a harness check): a raised way built at an absorb's epoch is listed as V09 §4.10's `epoch` row whose chronicle entry is V06's `raisedWay`, and its **Why here?** opens the `raised` section with `info.raised.built` and the DR34 or DR35 inputs as `facts` rows of tier `dossier`; a reason firing at a slot the DM closed is one line `info.raised.suppressed` with the removal's week as `{w}`, from one `EpochReport.raised.suppressedFired` entry (V06 §2.10; its producer held by T-V6-58); a way founded in a slot a cap increase opened is an ordinary founding entry, never the removed way's return; the check reads the lines' keys and args, never their words; the upgrade dialog names item 110's additions | nightly, SF6 |
| T-V8-46 | the pseudo-class routes: every `kinds` row's class is a roster class or one of the pseudo-classes of V08 §2.6's `kinds` shape (a compile check over the rows); at a base rung, a test-side mutation of `town-1` with both `Access to external mill` (`@absent:watermill+windmill`) and `Access to parish church` (`@absent:church`) added and every record binding `watermill`, `windmill` or `church` removed places no watermill, windmill or church of its own; adding back one binding record restores that class; `@absent` records are counted by no building in the parity of V08 §7.3. **At VH** (with V07's rows): a hamlet fixture with `Access to external mill` places no `v.watermill` or `v.windmill` of its own, and one with `Access to parish church` no `v.parish_church`, `v.parsonage` or `v.tithe_barn` (V07 §3.11 step 1's `villageForm` reading); a hamlet fixture with `Wayside shrine` and `Parish church` binds the shrine record's key to one `cross` pin inside the church's `churchyard` part and aliases it on no building, while a test-side mutation of `town-1` holding both records (added where absent) aliases the shrine's key on the parish church's building (V08 §3.5.1 (c)); **over time:** a hamlet fixture with `Wayside shrine` whose record a `promotedFrom` receipt promotes to `Parish church` at an absorb that takes it to VILLAGE stands one `v.parish_church` bound to the record's key, one churchyard `cross` laid for it (keyed by the record's binding key, its provenance the record, no binding row of its own; J-V8.114) and the old roadside `shrine` standing, bound to nothing, with one `ladder_promoted` note; the same hamlet whose next offer drops `Wayside shrine` and adds `Parish church` with no receipt stands one `v.parish_church` bound to the church's key, binds the shrine's key to one churchyard `cross` and leaves the roadside shrine unbound; a village fixture with `Fishmonger` that gains `Fish market` binds the market's key to one hall on the market's rim, with the fishmonger's key as its alias and the fishmonger's shop keeping its use, unbound; a village fixture with `Palisade or earthworks` that gains `Town walls` binds the town walls' key to the one enceinte the fortification path yields — the palisade retyped when at least 80 % of the dwellings lie inside, else the new ring — with the palisade's key as its alias and no binding on a superseded palisade; and a test-side mutation of `town-1` whose `Hedge wizard` record a `promotedFrom` receipt promotes to `Wizard's tower` re-binds the standing house as the tower's member and places no second building (the first case of V08 §3.5.1 (c)); a hamlet fixture off any through road with an unmapped `lodging` kind writes one `unmapped_kind` note whose `class` is `v.alehouse`'s `label` cell — the class V07 §3.11 step 4 built — never the generic class, and T-V7-21's `mercantile-market` custom record at VILLAGE writes `custom_resolved` naming the market cross by its `host.pinKind.market_cross` words, the rendered sentence reading "… built like any market cross (…)", and an unmapped `lodging` kind at a hamlet off any through road renders "… so it is built like any alehouse." | PR, SF3; the hamlet and village clauses PR, VH |
| T-V8-47 | the header's controls and the bridge to the shell (a host-harness check with the transport tap): in an owner's frame and an editor's, each control is offered exactly to the roles its V08 §4.2 row names, and a click on Refresh now, Restore previous map (after its dialog), Make a new map from the record (after its dialog), Reveal to the party and Hide from the party (with a selection of one dossier-bound and one map place), Hide again, Reveal again, the party's base knowledge and Assistant settings posts exactly one `host.action` with that row's `action` and `args` — binding keys for dossier-bound places, addresses otherwise — and nothing else, and the host's handler on `on('action')` runs the row's operation; a cancelled dialog posts nothing; with `backupDepth` 0 no Restore control is offered; Update the map engine posts its `doc.changed` (an `upgrade`) and no `host.action`, then the client sends `doc.snapshot`; the header carries no Keep-the-saved-town control, and V09 §3.14's load-mismatch keep commits a `rebase` through `doc.changed`, after which the client sends `doc.snapshot`; a frozen view's **Edit it with this version** (V09 §3.14 (b)) likewise commits its `frozenImport` `rebase` through `doc.changed`, after which the client sends `doc.snapshot`, and the frame's `banner` slot carries no frozen-view notice; the `upgrade-available` banner has no button; "See what the players see" posts nothing; a `host.action` whose row the role does not hold, injected by the tap, is dropped and reported; a `clerk.config` sets `ClerkMount.host.config()` and `HostSlots.clerkMode`, a host `preview { proposal }` arrives on `proposals`, and the harness's `needsToken`, `refused` and `answer` post `clerk.needsToken`, `clerk.config.refused` and `clerk.proposal`; `HostSlots.hostName` is `SettlementForge`, the population and tier word are locked with `host.locked`, and `fileMenu` is false; `HostSlots.historyLines` lists a reveal, a hide and a tier change made in this session as one `host.revealed`, `host.hidden` and `host.partyTier` line each with its targets, makes no line for the first `party` after a load, keeps one `host.picturesDrawn` line replaced at each `partyPicturesAt`, and is empty after `switchTo`; `HostSlots.newDocuments` is `'download'`, and Open a copy from here saves a `.plat` to the device and leaves the frame's document unchanged; with "See what the players see" on after a hide, `historyLines.list` called with the party key form returns the `host.hidden` line neither naming nor targeting a place that key omits, and not at all when it named only such places, and `list` called with the frame's key once the view is switched off returns it whole; a place whose binding row is gone is named by its key with no target; a `list` with a key the handler has not read yet returns only the lines that name no place, and `onChange` fires once the reads answer; a commit renaming a place a line names, and an applied tail that raises a named place's knowledge tier above the listed key, each fire `onChange`, and the next `list` names that place by its new name, or not at all; the handler registers no `onEffectiveKey` handler and exactly one `subscribe` on the loaded document — released at `switchTo`, a fresh one registered at the next `doc.load` — and every place read goes through `query`'s `entity` form with `admitAs` the listed key (the transport tap and a facade spy; J-V8.106, J-V8.109, J-V8.110) | PR, SF6 |
| T-V8-48 | the export bundle (J122, V08 §11 Q3): `exportScenes({ formats: ['dd2vtt', 'foundry'] })` from an editor's session returns one `Blob` per format whose bytes equal the frame's own export of that format at the same key (a byte compare); the transport tap shows one `export.request { bundle: true }` per format and no other message; a `knowledge` key form lowers both files (a withheld place's name absent from both, a byte search); the client's code path from `export.ready` to the `Blob` holds no JSON parse and no text decode (a source scan, §14's lint); a request with `bundle` for `geojson`, and one for `dd2vtt` without `bundle`, are refused `E_HOST_FORMAT`; an empty `formats` list sends nothing and returns `[]`; a format the key rules refuse is `export.refused` while the other is returned | PR, SF6 |
| T-V8-49 | the edge suite (V08 §3.17): one fixture per clause — (a) the record, messages, binding and digest additions at their data limits; (b) the row sets' `else`, reversed and zero ranges, the water words at every rung; (c) custom content none, one, degenerate and through save, load, undo, redo and migration; (d) the zero-size tab, a one-settlement campaign and an offer through every lifecycle step; (e) the refresh queue empty, one, long, with bad data, at every rung and across a visible edit, a restore and a reload; (f) the digest and the ladders degenerate, a population of 2 × 10⁷ refused `E_RUNG_UNAVAILABLE` naming the cap at a creation and at an absorb, and the no-seat case — a THORP dossier with 40 custom institutions absorbed at once places every one, none omitted, the report naming each edge plot (`W_DOSSIER_EDGE`); (g) epochs none, one, backwards (late changes at the last epoch's week, finished) and across a band; a calamity carried late — dated at or before the last epoch's week, its event in the absorb's first epoch at that epoch's first week; a second absorb in the last epoch's own week carrying a calamity dated that week and a population move past the tolerance — no epoch, the calamity's targets applied, noted by `unreceipted_change`'s `late` variant, the calamity held in `DossierBinding.lateCalamities`; the next absorb past `W₀` folding the crossing and the calamity's strike at its first epoch's first week, its deaths in that epoch's burial need; and a newly carried non-calamity change dated at or before the last epoch's week `W₀` in an absorb whose week is after it — folded at `W₀` + 1, applied finished, noted `late`, the document's current week after the absorb not before `W₀`; (h) persistence with depth 0, a quota below the snapshot, two failures at once; (i) the hand-off's data and lifecycle; (j) the players' view at a village rung and at the METROPOLIS tile cap; (k) edits and the clerk at their limits; (l) drawings, pictures and labels at their limits; (m) V08 §3.17 (b)'s feature rows at THORP, TOWN and METROPOLIS, among them a harbour record on a site with neither coast nor river, placed at its first closest option with no basin drawn and never omitted; each clause asserts its row's outcome, its rung and no whole-map retry | nightly, SF7 |
| T-V8-50 | item 111 at the port (takes T111-1 – T111-5's port clauses): a `desert` dossier with `oasis_water` has an oasis and its grove; without it and without a water word, none on any seed; a `desert` with access `river` has its river, with `port` its coast and harbour, with `fishing_grounds` a coast, river or lake; `oasis_water` on a `plains` dossier gives an oasis; a river forced on a relief that cannot carry it is reported, never dropped silently; `oasis_water` removed at an absorb leaves V06's failing spring; with V11 §3.24.0's climate dry cells off and no oasis deposit, byte-identical — the `item111.water` registration of the port fixtures on V12 §3.7.8's engine (V12 §2.13), written by the SF4 seat | PR, SF4 |
| T-V8-51 | item 113's reading (takes T113-1 and T113-6's dossier clauses): on a test-side "city to village" mutation of a village fixture (a `tierHistory` demotion from city, no `peakTier`), `HistoryHint.peak` is `{ tier: 'city', symbolic: true, evidence: ['tierHistory', …] }` and a `history_gap` note is written; with `peakTier: 'city'` added the peak is recorded, not symbolic; with no evidence there is no peak; each evidence kind alone (a `populationHistory` maximum, calamity losses, a ruined city-tier record, a resettlement) gives its stated tier; the events map by `historyEvents` with their years ago (a ticked event from its tick); a missing age takes the `tiers` row's midpoint with `history_gap`; an ancient "Fall of" event fills `ancientFall` and never `site.ruinEvidence`; a later dossier changing the history writes one `frozen_fact_changed` note and no event; with history replay off the map is byte-identical (item 113 (g)'s pin); a dossier whose latest stamped tick is a calamity's carries that calamity in `HistoryHint.calamities` (up to and including the present at creation) and in the last replay epoch, at the present (V06 §3.20.2) | nightly, SF4 |
| T-V8-52 | item 114 at the port (takes T114-7): the `readiness` row maps each fixture's label and score to its band and weight; at generation a `vulnerable` poor mutation and a `fortress` rich one read §7.7's DR41 with those inputs (their runs' conditions as the row's shares give them); over epochs the need threat is max(threat, readiness) — a `fortress` heartland mutation stays `high` need, a `vulnerable` frontier one keeps the frontier's need; DR2's creation defence is unchanged by the readiness (byte-identical walls and gates with and without it); a readiness change reaches the next epoch's slice only | nightly, SF4 |
| T-V8-53 | item 115's "specified" (takes T115-2 and T115-3's dossier clauses): at HAMLET a dossier manor record keeps its full design above the ceiling; a dossier government whose `villageSeat` names the manor — a seigneurial one and a crown one alike — forces it at THORP, HAMLET and VILLAGE, at VILLAGE as the one manor; a `Wealthy` hamlet with a `Wealthy Residential` quarter and no grand record builds no grand dwelling; a custom record whose keywords say "palace" but whose resolution lands on a house class is capped; at TOWN every case is byte-identical to the build without the ceiling — the `item115.ceiling` registration of the port fixtures on V12 §3.7.8's engine (V12 §2.13), written by the SF4 seat | PR, SF4; the village clauses PR, VH |
| T-V8-54 | item 117 at the port (takes T117-1 and T117-6's port clauses): a campaign dossier opens on its present week — its latest stamped tick, mod 52 — under the follow flag, and the same document re-skins with the model hash unchanged across all 52 weeks through the bridge; a dossier with no stamped tick opens at week 0 on the season control's midsummer (week 19); a host's `view.set { week }` changes the drawn week, never the document; the terrain sets the biome's climate row at creation by the `climates` row's terrain column, and a later terrain word writes `frozen_fact_changed` | PR, SF4 |
| T-V8-55 | item 118 at the port (takes T118-1, T118-2 and T118-5's port clauses): the lit-year fixture's `traditions` digest with their weeks, kinds and staging keys (the prose absent from the document, a byte search); a window across the year's end wraps; a window with no readable week is carried unscheduled; a custom tradition keys by `localUid`; adding, changing and removing a tradition changes only the ledger (the model hash equal); the festival shows exactly in its weeks under the follow flag; with no traditions the build is byte-identical (item 118 (h)'s pin) | PR, SF4 |
| T-V8-56 | the frozen facts and the wealth over time (V08 §3.5): a later dossier changing `terrainType`, `tradeRouteAccess`, `monsterThreat`, `magicLevel` or `cultureProfileKey` writes one `frozen_fact_changed` note each, no map event, and the next identical dossier writes none; a prosperity change from `Poor` to `Prosperous` is one `prosperity` change whose epoch carries `EpochInputs.wealthLevel` 0.8, read by V06's wealth level | PR, SF3 |
| T-V8-57 | SettlementForge's decisions as inputs (J121): `moduleOrigin` sets the frame's `src` and the CSP check; `locale` loads a shipped catalogue and falls to English for an unshipped one; `backupDepth` 0, 1 and 3 keep that many backups; a `quotaBytes` below the record drops backups beyond `backups[0]`, then the party set's z3, never refuses a commit, and shows `host.status.overQuota` | PR, SF1 |
| T-V8-58 | item 120 at the port (takes T120-2's dossier clause) — Find's dossier entries (V08 §3.16 (6); the dossier clauses of item 120 (k)): on `town-1`, `metropolis-3` and the lit `city-1` pair through the bridge, with V09's Find, every dossier institution record that is not `removed` and whose key binds an element is one entry, first among the named institutions, in dossier order, its words its `kindLabel` and its count the addresses its key's rows hold, and its chip selects exactly those addresses (a set compare with `DossierBinding.rows`), apart from its class's entry; `metropolis-3`'s merged cathedral record is its own entry selecting its alias target; an `@absent:*` record, a `(0-0)` record and a `removed` record are no entry; "red light" offers the `red light district` record, and no V11 synonym matches a dossier entry; on a test-side variant of `town-1` with one record made `secret`, under "See what the players see" with a party key that omits it, the record is never suggested, listed, counted, glowing or pinned (a byte search of Find's answers and of the drawn display list for its name); a chip on a record re-keyed by a receipted rename, by T-V8-44's `promotedFrom` pair and by a `fromLines` table on T-V8-11's test line keeps its selection and shows the new words, and a chip on a record an absorb removes shows 0 until cleared; the document's bytes, the model digest and the party set are byte-identical with Find on and off, and the transport tap finds no chip in any bridge message | PR, SF6 — at the later of M-SF and M5, Find's milestone (with V09's Find) |
| T-V8-59 | item 122 at the port (takes T122-4's census clause and T122-1 and T122-7's `item122.crises` registration; V08 §3.16 (7)): the manifest's `crisis` lists equal the pinned line's stressor types (fifteen), condition archetypes and crisis events, read from its commit by the build step; every stressor type, archetype and `triggeredAt.sourceEventType` the fixtures carry is in the census, and V11's compile check of `crisis.map` passes over it; a `cond:stress:<type>` overlay reads its `stressor` row, a condition a `PLAGUE` event raised (the probe town's PLAGUE pair) its `event` row and every other condition its `archetype` row; a test-side unknown archetype, stressor type and event each read `none`, noted `unmapped_word`; on the lit `city-1` pair a condition triggered at the storm's week carries that calamity's key, its resolved `targets` and type reaching DR44; a condition's `label` is carried as `name`; its overlay's weeks are its ticks' (V08 §3.11), so its look stands exactly in them; a condition whose row gives a look is admitted at `public` and one whose row is `none` only at `secret` — under View as "What anyone knows" and a party key that omits it, never drawn, listed or named; a test-side `reconstruction` condition added to the lit `city-1` pair at the storm's week, the one `none`-row condition linked to the storm, carries `event` `calamity` and draws `disaster` for its weeks, its districts the storm's `targets` first, while a second `none`-row condition linked to the storm, triggered later, reads `none`, and the storm with no such condition draws no look; a siege stressor (`under_siege`) and a `war_pressure` condition standing together draw one siege — the condition's, with its name and weeks — the stressor's siege resuming in a week after the condition ends while the stressor is still listed, and two `war_pressure` conditions draw two sieges; a changed name, event or calamity link is one ledger change with the model digest equal; with no condition and no preview the tiles are byte-identical to the base — the `item122.crises` registration of the frozen dossier set's crisis conditions on V12 §3.7.8's engine (V12 §2.13), written by the SF4 seat | PR, SF4 |
| T-V8-60 | item 122 (h) at the port (V08 §3.16 (8)): on the pinned line no force is read and every look takes its count fallback, a `field_fallback` note only where a look scaling by headcount stands; under a test adapter version declaring test paths on a test-side mutation of `city-1` — two armies of one coalition and a travelling group — each army is one `forces` entry with its heads and the coalition's key and the group one entry, each joined to its condition; a force naming no condition joins the most severe standing `siege` overlay; headcounts of 0, −5 and "many" read as none, noted `field_fallback`; with no forces a migration condition's `arrivals` is the `populationHistory` rise across its trigger week, and a disaster's calamity carries its `exodus`; a size change is one ledger change, the model digest equal | PR, SF4 |
| T-V8-61 | item 125 at the port (takes T125-1 – T125-3; V08 §2.4, V08 §3.16 (9)): (a) T125-1 — a test-side reduction of `town-1` to its 41 required keys, every optional key absent and every empty-able value emptied, generates a full map with no refusal, each read field it lacks one `field_fallback` note naming the field, its `detail` the row's fallback; a variant with `population`, `_seed`, `id` and `schemaVersion` emptied generates a full map, each noted `field_fallback` — the population the default request of the tier word's rung, the seed H32 of the key minted from the map's id (`settlement:map:<mapId>`), the adapter the one the selection takes without the stamp, also noted `line_defaulted` — and a later absorb of the same dossier keeps the minted key, no `E_OTHER_SETTLEMENT`; on `city-1` after its creation, an absorb whose `population` is emptied and whose `institutions` is an object keeps the carried population and every institution — no epoch, no `remove`, no `rename`, the model digest unchanged — each noted `field_fallback`, and the next readable dossier absorbs as usual; on `city-1` an absorb whose `population` is emptied and whose present week lies past the next year end, with no `populationHistory` entry after the last epoch, folds the one year-end epoch with the carried population as its `populationTarget` and no epoch at `W₁`, the households unchanged by the fallback; an absorb whose optional `traditions` key is dropped keeps the carried traditions, noted `field_fallback`, while one whose `activeConditions` is `[]` and `stressors` `null` retires every carried condition and stressor overlay (an empty list and the row's `null` read as none); an absorb on `town-1` whose ruined or remnant institution record returns with `status` `active` and no `worldPulseFate` reopens it (F6), and one whose condition drops `duration` clears its `untilWeek`; (b) T125-2's port clause — every fixture offered with and without a host context (`line` the pinned line, an `audience`, `displayNames` for one export), and a fixture under two registered adapters both accepting with `line` naming either and with none, yields the identical document and model digest — the `item125.host` registration of the frozen dossier set on V12 §3.7.8's engine (V12 §2.13), written by the SF3 seat; a `line` no adapter supports, and one whose adapter refuses the dossier, refuse `E_LINE_UNSUPPORTED`; a registered, accepting `line` the selection did not take writes one `line_differs` note and nothing in the document; a host's `setLayer` logs one `setLayer` event and leaves the document a dossier makes, its model digest and hash otherwise unchanged; (c) T125-3 — a static check: the adapter's sources import only `@plat/port`'s types and `@plat/tables` and read the host context only at `line` (an import scan, and T-V8-20's proxy wrapping `host` as well as the dossier); (d) the week: a dossier whose conditions', calamities' and history's ticks differ opens on the greatest, one with none at week 0 on the season control's midsummer | PR, SF3 |
| T-V8-62 | item 126 at the host (takes T126-2's host-frame clause and T126-3's embed clause; V08 §3.16 (10)): the host harness's frame in a 599 × 479 CSS px tab shows V09's medium layout at 600 × 480 with the tab scrolling, and the party viewer keeps the same minimum; a resize across 600 × 480 in both directions leaves the document, the view and the selection byte-identical (canonical bytes, view section, selection ids); the embed's bundle holds no phone layout, screen, notice or catalogue row (V09's T126-3 scan run over `embed.html`) | PR, SF6 |
| T-V8-63 | the catch-up batch (V08 §6's absorb-with-epochs row; §12.10's R12-31): on T-V6-24's three catch-up fixtures — 20 years carrying 200 dossier events, 100 years carrying 1 000 and 100 years carrying 20, at CITY and at the METROPOLIS cap, the sky layer off and on — the batched absorb gives the log's bytes and, at every `seq`, the model digest of the per-event fold (the same log folded one event at a time — every event paying its placement work and view stages alone — compared digest by digest), its dry run and a second editor's re-run (V08 §3.3) encoding the same bytes; a batch of one event equals that event's own fold; each catch-up completes within the catch-up's budget on an open map and inside an open from SettlementForge (V06 §6.8 (6)), its per-epoch and per-event costs reported against the row's; one of the three past its budget fails the release (§12.10's R12-31; T-V6-24's over-budget fixture takes its one-epoch fold, reported F-BUDGET-TIME, by design) | nightly, SF7 |
=== END ===

=== REPLACE ## 9 Decisions (each vetoable) ===
## 9 Decisions (each vetoable)

A decision a later ruling changed carries one mark on its row: "amended by X" (the governing row keeps the reason).

| id | decision |
|---|---|
| J-V8.1 | chose to run the port inside the module's generation worker, beside the document, over running it in SettlementForge's bundle, because the port reads the document's carried facts and emits events the module must dry-run, and SettlementForge's bundle then holds only a 12 KB client (8 KB plus the party viewer) with no knowledge of our model |
| J-V8.2 | chose "only an editing role — the DM or a co-DM — runs the port and commits; the log's single head arbitrates" over electing a port leader, because `digest`, `creation` and `absorb` are pure, so two editors compute the same events and the host's compare-and-set drops the second as `stale` with nothing lost; a player never holds the document or the dossier (J-V8.57) |
| J-V8.3 | chose one map record in its own row beside the settlement, keyed by settlement and map id, over storing the map inside the dossier's data, because the document is about ten times the dossier's size and would ride every save, sync and public projection (`research/sf/dossier-seam.md` C-6) |
| J-V8.4 | chose the host's SHA-256 over the dossier's canonical JSON to decide WHETHER to offer, and the port's fact-level diff to decide WHAT changed, over a host-side fact hash, because the host holds no port and must stay dependency-free, while the port alone knows which keys it reads |
| J-V8.5 | chose snapshot plus event tail with compaction at 256 events or 256 KB and rotating backups over storing only the log or only snapshots, because loads stay at §12.5's law, every event is durable at once, and a damaged snapshot has a known predecessor (V08 §3.9 B10) — amended by J121: the number of backups is SettlementForge's `backupDepth`, read as an input (J-V8.118) |
| J-V8.6 | chose the background refresh after an advance to run in ONE hidden frame on the DM's page, serially, pausing on input, over a server-side renderer or parallel frames, because the product has no hosted service (§11.5), one document at a time keeps memory at one rung's line on any campaign size, and `refreshPending` makes it resumable |
| J-V8.7 | chose an `<iframe>` on the module's own origin with `allow-scripts allow-same-origin allow-downloads` over a worker or script on SettlementForge's origin, because it is SettlementForge's own pattern for its realm map (`research/sf/dossier-seam.md` C-1) and no module code then runs beside accounts or payments |
| J-V8.8 | chose to quarantine a malformed record and absorb the rest over refusing the whole dossier, because one bad record must not freeze a campaign's map, and the record keeps its last carried state and is retried at every offer |
| J-V8.9 | chose the selection order `HostContext.line` → the document's bound line → the single accepting adapter → at a creation, the newest accepting line, recorded and noted `line_defaulted` — with `E_LINE_UNSUPPORTED` only when none accepts — over refusing whenever two adapters accept, because a bound map must stay on its line until a declared migration moves it, a declared, reported default is no silent guess, and a refusal would hold every map the moment a second line was registered — amended by item 125 (J-V8.130): `line` is the one host field read, no data input; amended by J-V8.133: `line` is checked, never chosen from, the order starting at the bound line; amended by J-V8.134: with none accepting, a dossier lacking a required key of every registered adapter is `E_UNKNOWN_SHAPE` (B3) |
| J-V8.10 | chose a declared re-baseline (`remaps`, no map event) for an adapter's own version change over treating every re-read field as a dossier change, because a change in our reading is not a change in the settlement, and T-V8-10 enforces the declaration |
| J-V8.11 | chose declared `fromLines` key migrations with a hold when absent over re-creating the map on a line change, because the players' map must survive SettlementForge's own upgrades, and an undeclared migration would re-bind by guess |
| J-V8.12 | chose one document, one seed and one history across the village and town products over a new map at the 1 500 boundary, because the owner's continuity rule (item 22) makes a settlement's map follow its history, and §4.11's rung change already carries a crossing; the product at each epoch is V07 §2.1's fold with its hand-off band (`handoff.band`), so a population hovering at 1 500 never flips the product (item 322), and the port registers nothing — it consults `LadderRouter` over V07's `ProductDecl` (item 202) |
| J-V8.13 | chose a host-minted document id (`MapRecord.mapId`) over the module minting one per creation, because two clients creating one map at once then produce byte-identical documents (T-V8-3) |
| J-V8.14 | chose one `dossierFacts` ledger event per absorb, carrying every change's before and after, over storing the dossier block only in snapshots, because the block must rebuild from the log alone (§2.9) and the report reads it |
| J-V8.15 | chose one `dossierRecord` event kind for every staged record (conditions, deposits, relations, persons, custom chains and services) over one kind per record, because they share authorship, addressing, fold and lifecycle rules, and one kind keeps §7.4's dossier rule in one place |
| J-V8.16 | chose to carry crime, food import, food chains, legitimacy — and the readiness (item 114) — on the circumstance slice (`PortValues`) over `editTable` events on `PortRows`, because a table edit re-derives from its first reader stage — the reshuffle item 22 forbids — while an epoch's slice moves them at the cadence |
| J-V8.17 | chose to round severities to 1/1 000, standings to 1/10 000 and percentages to 1/100 in the digest over carrying raw floats, because floating noise in a host's arithmetic must never read as a change (T-V8-6) |
| J-V8.18 | chose that this volume owns the SHAPES and lookup chains of `kinds`, `archetypes`, `categorySynonyms` and `keywords` while V11 writes their rows beside each class's siting profile, over writing the kind rows here (280 at the pinned line, read from `dossier.catalogue`), because the rows are siting content that must agree with V11's profiles row by row |
| J-V8.19 | chose a SettlementForge-tag → family table in `tables/dossier/tags` over reading tags directly in the solver, because the host's words stay inside the port's tables (§14's lint), and item 103 (a)'s default-profile-by-tag needs a stable family vocabulary |
| J-V8.20 | chose to let coverage (item 103 (f)) weigh the count INSIDE a collective record's range and decide where its members go, over letting it change the range, because the range is a dossier fact and the count inside it a map fact |
| J-V8.21 | chose that SettlementForge's assistant acts only inside a user's session with that user's role and key over a role of its own, because a player's assistant must never read what the party does not know, and §11.2 already gives every clerk its viewer's key: an editor's assistant acts inside that user's frame session; a player's assistant has no session, frame or document (J-V8.57) and reads only the stored party gazetteer, made under the party key (V08 §3.14, V08 §4.4 (1)) |
| J-V8.22 | chose that the players' pictures keep the stored output version's drawing until the DM upgrades over re-rendering them under each release, because an upgrade can move things (§7.5's diff) and the DM decides when the table sees it |
| J-V8.23 | chose at most one offer in flight per session, a newer dossier replacing a queued one, over queueing every version, because the port diffs carried facts against the newest dossier and dates changes from its receipts, so skipped versions lose nothing SettlementForge's own end state keeps |
| J-V8.24 | chose to show the stored thumbnail at once and swap in the live map over a spinner, because the tab then shows the town within 50 ms whatever the frame's boot costs |
| J-V8.25 | chose that every epoch of a catch-up reads the NEW digest's slices over interpolating them, because SettlementForge keeps no interior history of trade, economy or powers (research V52, V56); interpolating would invent facts |
| J-V8.26 | chose each culture's centre of gravity, rounded, as its latitude (`cultures`) over one latitude for all, because item 102's daylight share should differ between a northern and a southern setting when the host gives no realm latitude; the values are a dossier row set, not calibratable (J-V8.107) — amended by item 125 (J-V8.130): no realm latitude is read, so the culture's is the one latitude |
| J-V8.27 | chose to compute the realm block host-side in a pure client helper (`realmBlockFrom`) from the campaign's placements, the realm map's scale and latitude scale and the campaign's spatial digest over sending raw placements to the module, because the realm map is the host's and §7.7 item 1 lets the module carry only the spatial digest's words: the module receives bearings, distances, cell words (the climate word among them, item 117) and a latitude, nothing else of campaign state — amended by item 125 (J-V8.130): the realm block is no input, its helper retired |
| J-V8.28 | chose that the host computes display names with its own public filter over the module re-implementing that filter, because the filter is SettlementForge's product rule and the module must never hold it (item 85 (b)) |
| J-V8.29 | chose that the module takes the LOWER of the role it is told and the role of the audience word over trusting either alone, because a client bug in one of the two must never raise a player's rights |
| J-V8.30 | chose to reuse one frame across a campaign's settlements (`switchTo`) over a frame per settlement, because boot is then paid once per page and only one document is live |
| J-V8.31 | chose the author's library fields as an OPTIONAL `HostContext.customLibrary` admitted only when its definition, revision and content hash equal the dossier's, and carried in the document, over asking SettlementForge to add them to the dossier, because the map never asks (item 20 (h) (iv)), the dossier stays the truth, and replay must never need the host — amended by item 125 (J-V8.130): the definition fields are read only where the dossier carries them |
| J-V8.32 | chose to reduce a custom description — and a tradition's staging prose (item 118) — to keyword keys inside the adapter over carrying the prose, because §7.7 item 1 admits no prose beyond the description seed, and the keywords are what the map reads anyway |
| J-V8.33 | chose the dossier's own activation verdict for custom chains over recomputing "all nodes present" in the port, because the verdict is SettlementForge's rule on SettlementForge's facts — recomputing it could disagree with the dossier |
| J-V8.34 | chose that a realm latitude arriving after creation enters at the next epoch as a `port-values` change, moving the town only by item 102 (e)'s drift, over freezing the creation latitude, because SettlementForge usually places a settlement on its realm after generating it (`research/sf/dossier-seam.md` §4, C-9), so a frozen culture latitude would stay wrong, while re-deriving at once would shift every plot's daylight share together — the reshuffle item 22 forbids; the DM may still set it with T7 `adjust` — amended by item 125 (J-V8.130): no later latitude arrives |
| J-V8.35 | chose that SettlementForge draws only the container, the thumbnail and a status banner over drawing map chrome of its own, because the map's UI then ships and versions with the module, and a dead frame still shows a readable state |
| J-V8.36 | chose pictures only (`png`, `svg`, `print`) through `exportPicture` over every export format, because anything else as data carries geometry into SettlementForge's code (door 1, J86); files are the user's, from the frame's export menu — amended by J122 (V08 §11 Q3): from M-SF the export bundle's scene files cross as opaque blobs (J-V8.119) |
| J-V8.37 | chose to close door 1 structurally for every STRUCTURED format — no decoder in the client, pictures only through the client, every clerk answer and the party gazetteer projected to words — and to state that the host stores the document as an opaque artifact and holds pictures, over a claim that nothing geometric reaches the host, because the `.plat` bytes and the SVG paths do rest with the host and the ruling J86 plus the owner's audience table accept pictures — amended by J122: no call returns a structured format as data, and the bundle call returns opaque blobs only (J-V8.119) |
| J-V8.38 | chose dossier fidelity through the bridge (T73, T75, the institution count parity) as the stage's parity measure over a reference-parity metric, because no reference generator embeds a map in a host with a settlement record |
| J-V8.39 | chose milestone M-SF directly after V12's M-CAL, which follows M4, M5, M6 and V-M4, over running it beside M5 and M6, because the owner's definition orders the connection after the calibration and V12 places M-CAL after the standalone generators — confirmed under J122 (V08 §11 Q4) |
| J-V8.40 | chose to name a condition in the legend for every key only when its archetype draws a tint over naming every condition, because a drawn tint is visible anyway while a political condition (infiltrated, indebted) is the DM's secret |
| J-V8.41 | chose to order the creation prefix with each active custom chain's nodes upstream first over the dossier's order alone, because item 104 (h) (4) needs a downstream node to see its suppliers' sites, and a fixed order keeps creation deterministic |
| J-V8.42 | chose the dossier's `chainId` as a chain's identity — a changed node set being a new chain — over our own identity from the nodes, because it is SettlementForge's identity and needs no guess |
| J-V8.43 | chose to make a NEW map from the current dossier under a new `mapId` when the host has lost the record (B11) over refusing, because the dossier is the truth and a creation of the current state is one pass of §7.7's One path; the lost layout is not recoverable — item 22 (c) lets the new map differ — and the report says so |
| J-V8.44 | chose "restore previous map" as a swap to the newest backup followed by a forward absorb over rewinding dossier events, because dossier events are never undo targets (§7.4) and the map must end at the current dossier |
| J-V8.45 | chose to read SettlementForge's per-institution `priorityCategory` as the institution's political role, DR12's first input (item 397), over ignoring it, because it is a per-record fact naming the domain the institution serves (government, military, religion…), which is what DR12's power association needs; it is not the never-read generation sliders (`config.priority*`, §7.7 item 1), which are settlement-wide weights whose effect already sits in the institution list — so nothing is counted twice |
| J-V8.46 | chose "the host stores, the module computes" — every encoded event, sequence number, head and snapshot field arriving in a message, the host comparing only `baseLogHead` with its head — over a host that encodes or hashes, because the host client imports nothing (item 507) and a store that must compute would need our model code on SettlementForge's side |
| J-V8.47 | chose to read `magicLevel` `medium` as `low` over a fourth level, because 32 of the 35 births carry `medium` and D-3's realism floor keeps magic present but not shaping the town unless the dossier says `high` |
| J-V8.48 | chose to place a `teleport_circle` for a `magical_transit` isolation path only when no dossier record already binds that class over always placing one, because the dossier is the truth of what exists and a derived use would double a listed record |
| J-V8.49 | chose that the chain-status weights are V11's (`siting.web.chainStatus`) and the port carries only the neutral status key, over weights held in the port, because one weight table must serve the supply web on standalone and dossier maps alike; the values are V11's and calibratable |
| J-V8.50 | chose never to produce the `raider` sea-threat key from a dossier over mapping a nearby word to it, because the line has no raid or piracy word (CONFIRMED over its fifteen stressor types and the archetypes its fixtures carry); `raider` is a standalone and pack key, and a raid word a later census shows gains its row as a table fix (V08 §2.6 `threats`) |
| J-V8.51 | chose not to make an ancient founding a ruin-evidence row over reading great age as evidence, because V04 already compares `history.ageYears` with its own `ancientYears` through `HistoryHint`; one reader, one constant |
| J-V8.52 | chose to keep power-relation keys unordered and to read no relation as directed over a directed key `relation:<from>><to>`, because the line's pair order is not a direction (CONFIRMED: of `city-1`'s four `subordinate` pairs, three name the superior first and one last), so a directed reading would invert a quarter of them; a later line that stamps a direction adds it through a declared `remaps` entry |
| J-V8.53 | chose that a churchyard stays a burial face while its church plot keeps the churchyard part, the church ruined or not, closing only when the plot is cleared and re-used, over closing it with the church, because the burial ground outlives its church in historical practice and item 109 (k) never lets a catacomb shrink |
| J-V8.54 | chose never to undo a calamity that leaves SettlementForge's capped history list over reading its absence as a removal, because a calamity happened and cannot un-happen; the list is capped for size, not revised |
| J-V8.55 | chose to cite §4.11's cadence — an epoch at each calendar year end (week mod 52 = 0) and one at each ± 5 % population crossing inside the span, dated from `populationHistory`, plus one at each new calamity's week — over a cadence of this volume's own, because the cadence is the base's and a restatement with a variation is a second truth — amended by §4.11 *The clock* (4): a calamity carried at or before the last epoch's week rides the absorb's first epoch — or, with the absorb's week not after the last epoch's, the first epoch a later absorb folds — and no late change folds before the last epoch's week (V08 §3.6 (3), (6)) |
| J-V8.56 | chose to give stressors one path, a `cond:stress:<type>` condition overlay read by the epoch's readers, over also adding an `EpochInputs.events` entry, because two paths would count one stressor twice |
| J-V8.57 | chose to give players a stored party picture set (a PNG pyramid, a building-band level only over the places they know, the city-band SVG) and a stored party gazetteer, never the document, a dossier or a session, over a live frame filtered by their key, because §11.1 *Knowledge* forbids sending the document to a client a place is secret from, item 85 (a) forbids the seed leaving the host, and SettlementForge's player view is player-safe by construction — amended by J122 (V08 §11 Q5): pictures and player views now; a live shared map after M-SF, as its own item |
| J-V8.58 | chose to record what the party knows on the map record (`MapRecord.party`, written by `setParty`, one-step "Hide again") over per-session view state, and to replace SettlementForge's retired area fog consciously by place-by-place knowledge, because a reveal must reach every player, every later picture and the gazetteer, and the base's knowledge model is by place (§9.2); area fog over a live map belongs to the live shared map J122 places after M-SF |
| J-V8.59 | chose one reserved session, `host:port`, constant and group-less, for every event the port emits over the committing editor's session, because byte identity across editors (T-V8-3) and every user's undo stack (V09) depend on the port's events belonging to no user (item 359) |
| J-V8.60 | chose recognition by a REQUIRED key set plus a declared optional list, any other top-level key accepted and dropped with a note, over an exact key count, because lived dossiers carry 41 to 47 keys and a later line may add more; refusing an extra key would hold every advanced campaign map |
| J-V8.61 | chose a dedicated editing-role message `doc.snapshot` for creation, compaction, upgrade and rebase, exempt from `E_HOST_FORMAT`, over asking for a `.plat` export, because storage is not an export and the export refusal must stay absolute for hosts |
| J-V8.62 | chose to leave the calamity-to-hazard mapping in V06's calamity table (DR28) and to carry only the `CalamityRef` — with its deaths for V04's burial growth — over a second mapping table in this volume, because two tables would disagree; V06 owns the reader, this volume the inputs |
| J-V8.63 | chose to date a condition from its ticks — `sinceWeek = W − elapsedTicks`, `untilWeek = W + expiresAtTicks − elapsedTicks` — with a measurement and a pre-decided absolute-tick fallback, over leaving conditions undated, because the line's statuses carry no weeks and a condition must end at its week on the map — amended by item 125 (J-V8.130): `W` is the dossier's present week |
| J-V8.64 | chose that every editing client holding the dossier re-runs an applied absorb and REPORTS a mismatch, never blocking the fold, over trusting any editor's result or requiring a second signature, because the log's order is the truth, §11.3 already reports a fates mismatch this way, and a block would let one faulty client freeze the map |
| J-V8.65 | chose, for a toll bridge on a site with no watercourse, a watercourse forced at CREATION where the record's bridge spans it (at base rungs a brook across the longest approach's through route; at village rungs V07's brook or estuary between the frame arcs — one rule with its rung column), over dropping the bridge, raising an undeclared way at a TOWN or inventing water later, because a brook is the realistic reason for a toll bridge, needs no raised way (item 110 (b) forbids one undeclared at TOWN) and touches §5.3's deck invariant not at all; a record arriving by a later absorb never re-draws the terrain (item 22), so its toll house takes an existing crossing or the gate, noted |
| J-V8.66 | chose that nothing item 110 generates is dossier-bound — its provenance naming the records that fed its reason — so the DM's removal is the base's delete of generated content and never lapses, over binding a raised way to its water record, because binding it would turn the DM's delete into a `rejectSite`, which lapses at the next epoch or scoped dossier event, and the arches would return within a year against the owner's "a user can decide to add or remove" (item 260) |
| J-V8.67 | chose that a dossier-bound conduit house makes item 110 (b)'s water need count as met at CITY and METROPOLIS, the chance, cap and source-in-reach rules unchanged, and that the RUNG, never the tier word, gates the reason, over scaling the aqueduct chance by the city water record, because that record is required at chance 1 on every SettlementForge city (7 of 7) and would be one constant, and SettlementForge's lower cities are our TOWNs, where item 110 allows arches only by declaration |
| J-V8.68 | chose that a custom record resolved to the `water-supply` family counts as a water system at CITY and METROPOLIS but never declares arches at TOWN, over treating a custom water record as a declaration, because a declaration is the DM's act on the map, not an author's library entry |
| J-V8.69 | chose never to make a hot spring an aqueduct source over allowing it, because a hot or mineral spring gives a bath-house and mineral water, not a drinking supply |
| J-V8.70 | chose to define item 110 (b)'s "dossier landmarks on high ground" as the dossier-bound institutions of class significance at least V11 §3.24.2's `elevated.landmarkMinSignificance` (the castle's, V11's calibratable setting beside the `landmarkFactor` it gates) and the custom `landmark` records, read at their S3 reservations, over SettlementForge's `quarters[].landmarks[]` strings, because the strings are street, yard, pin and institution names (none a high-ground landmark) and reading them would count an institution twice, and a map rule's constant belongs in V11's settings, not in a dossier row set |
| J-V8.71 | chose to keep the era `c14` for every culture and to carry the CULTURE to item 110's aqueduct chance and stepped specialisations, over inventing an era from the culture, because the line has no era field and the culture is its only preset input; which cultures build in tiers is V11's content |
| J-V8.72 | chose not to read SettlementForge's world-state works ledger over deriving a raised way from its infrastructure count, because the ledger names no structure, lives outside the dossier, and the port reads only the dossier and `HostContext` — amended by item 125 (J-V8.130): the dossier alone, `line` the one host field |
| J-V8.73 | chose to resolve SettlementForge's assistant's map tools in the DM's page — the page executing `query` and `preview` and returning the answer the module already projected (V08 §5.4 (3)), a headless session when no map is open — over a server-side map session, because the product has no hosted map service (§11.5) and the page already holds the session and the key; wherever SettlementForge runs the assistant's loop — its decision (J121) — the relay holds |
| J-V8.74 | chose that the refresh frame never starts beside a visible CITY or METROPOLIS document over letting two large documents share the DM's page, because two METROPOLIS documents would exceed any reasonable page budget (§12.8: 260 MB each); the queue waits for the tab to close or a TOWN or smaller to be visible |
| J-V8.75 | chose the compaction precondition "the snapshot's head is the record's head or lies in its tail", keeping the tail's suffix, and keeping the removed segment on `backups[0]` as `tailAfter` until the next compaction, over a compare-and-set on the head alone, because an actively edited map must still compact and B10's second rung must be exact |
| J-V8.76 | chose to re-bind a notable after a reroll by equal name and role over only through `replacedNpc`, because a reroll renumbers the ids and the research plan's J-M11 re-binds by name and role; any other vanished notable is retired |
| J-V8.77 | chose to re-render the party set after each committed absorb, 30 s after the last committed edit batch that changed a drawn mark, and at once after a reveal, keeping the newer of two concurrent sets by the integer pair (last seq, party revision), over rendering on every commit or only on demand, because rendering costs up to 3 s at METROPOLIS and players must see reveals at once |
| J-V8.78 | chose one source for the tab's banner and caption texts — V09's `host.*` catalogue rows, generated into the client's `statusText` defaults at build time — over a second copy in the client, because two copies drift |
| J-V8.79 | chose, when a quarantined record's key cannot be formed, to hold every carried institution key absent from the new digest (no `remove`, one `quarantine_hold` note) until a readable dossier arrives, over removing the absent keys, because an unreadable record might be any of them and a wrong removal would close a standing building |
| J-V8.80 | chose to make the `changeIds` trim part of the fold of each `dossierFacts` event over trimming at save, because the dossier block must rebuild from the log equal to the stored block at every seq (§2.9's load check) |
| J-V8.81 | chose to keep V11's ladder rows marked `inferred` where SettlementForge's ladder file lacks the pair but the dossiers list both forms (two church ranges, two cathedral records), over dropping them to match the file, because item 108 (c) must merge whatever the dossier lists; a disagreement with the file is a V11 table fix, found by release row R2 |
| J-V8.82 | chose to resolve a chain processor, dependency institution or calamity target by exact name, then by kind family (count range and qualifiers removed, plural folded), else to keep it by name and note it unjoined, over fuzzy matching or creating a building, because the dossier is the truth of what exists and a fuzzy join would bind the wrong record |
| J-V8.83 | chose to bind a GUILD record's hall into a guild COUNT record by the GUILD record's `categories` family — `craft` to `craft_guilds_*`, `trade` to `merchant_guilds_*`, members `#1…#m` in dossier order, the COUNT's placed count at least m — over binding every guild into whichever guild COUNT record is present, because a carriers' or cartographers' guild is no craft guild's member unless the dossier's own category says so, and the dossier's category is the one fact that sorts them (V11 §3.12) |
| J-V8.84 | chose to project every `preview` reply a host receives (dropping `shape` and `actions[].at`) as well as every `query.result`, and to refuse `hit` and `inView` with `E_HOST_KIND` as `measure` is, over projecting query results only and leaving the view-bound kinds unanswered, because a preview reply carries a polygon that would cross door 1 (J86), and a named refusal is the only answer a host can act on |
| J-V8.85 | chose that a population of 0 at an absorb of a BASE-product document reaches V07's desertion through V07 §2.1's fold (0 lies below the band's lower edge), over holding a town whose record reports no inhabitants, because SettlementForge's end of a settlement (§7.7 row F20) is an outcome the map must show, and the fold is the one path from a town to the village product |
| J-V8.86 | chose one host → PLAT push, `host.state` (the party key, the backups' heads, the pictures' time, the players'-view switch), kept in the session's memory, over `view.set` — which writes view state and would re-create a knowledge-key mechanism beside the filter — and over routing the frame's toggle through `host.action` and back, because the frame's controls need facts only the host's record holds, the host computes nothing it stores, and a view filter needs no round trip |
| J-V8.87 | chose "See what the players see" as a display filter — the frame's `ViewOpts.viewAs` set to the party key in item 464's key form — over setting the view's knowledge key, because V09 decided a lowered view is a filter (J-V9.46), so the document formats, `doc.snapshot`, compaction and saves stay the role's, and one capability must have one mechanism |
| J-V8.88 | chose to carry every page-side header action as one enumerated PLAT → host push, `host.action`, with the host running V08 §4.2's row through its existing calls, over giving the frame calls into the host's store or settings or drawing the controls on SettlementForge's side, because the frame holds no account or store access (§11.3), SettlementForge draws three things only (J-V8.35), and one enumerated push is testable (T-V8-47); "Update the map engine" stays in the frame because its event is the document's, and "Assistant settings" opens SettlementForge's own settings because the host holds its AI setup (J121) — amended by J-V8.94 (the load-mismatch keep is no header control) |
| J-V8.89 | chose one banner for the players' view — this volume's strip "Showing what the players see" in `HostSlots.banner`, V09 §4.8's View-as banner not drawn while the host's party key is set — over drawing both, because two lines saying the same thing crowd a narrow frame and the strip names the DM's own check; V09's half is V09 §4.8's "A host's players' view" (J-V9.85) |
| J-V8.90 | chose the embed's bridge handler as the one filler of `ClerkMount.host` and `HostSlots` (V08 §3.1 step 7), with `hostName` a deployment constant of the SettlementForge build and `historyFilter` left unset, over a bridge field for the host's name and a history filter for the co-DM, because V09 gives the harness and the shell one channel (J-V9.81), the host's name is fixed per deployment, and both frames that exist hold `secret` |
| J-V8.91 | chose to make the party picture set cross the bridge as one request and one reply — the client's `party.render { party, since? }` and the module's `party.rendered { set }` or `unchanged` — with the module resolving the party key, drawing the pictures under it as `knowledge` and listing the gazetteer under it as `admitAs`, over the client assembling the set from `exportPicture` and `query` calls, because only the module can resolve binding keys to the addresses a key form holds (item 572's places are ids), only the facade lowers a query (`admitAs`; the bridge's `query { q }` carries none), the set is one value the store takes whole (T-V8-2 requires it to arrive in a message), and the client already holds every trigger; the `drawDigest` test keeps an edit that changes nothing drawn from costing a store write |
| J-V8.92 | chose key forms with empty places — `{ tier: 'public', places: [] }`, `{ tier: 'local', places: [] }` — for the host's own public and local pictures over a bare tier, because item 572 reads a bare tier with the requester key's places, and a DM's session key may carry places a gallery picture must never admit; a key form is a key in its own right |
| J-V8.93 | chose to fill `HostSlots.historyLines` from the differences of successive `host.state` values in the handler's memory — reveals, hides and a tier change, and one replaced "pictures last drawn" line — over a stored reveal history or new `host.state` fields, because the record keeps only `party.prev` (J-V8.58), a line is no log event and the handler already holds the values; and `newDocuments: 'download'`, over `'off'`, because the owner's "everything editable" keeps a past state reachable, `.plat` is already the user's format in host mode (V08 §5.4 (2)) and a copy is detached (V06 §4.4) |
| J-V8.94 | chose one control for the load-mismatch keep — V09 §3.14's choice at load — and no button in the tab's `upgrade-available` banner, over a header control for the keep and a banner button focusing a frame dialog, because one event has one control, and no host → PLAT message or `MapSession` call reaches a dialog inside the frame while SettlementForge draws no map control (J-V8.35) |
| J-V8.95 | chose to derive, at the port, a land use that a record's hard `near` row requires and no listed deposit opens — a `DepositSite` under `res:derived:<landuse>`, one per land use, kept `depleted` when no record needs it, never removed, and left standing beside a deposit listed later — over letting the class take the base's closest option (a salt works with no pans) or asking the DM, because the dossier's record is a fact the map must honour and every gap is derived by our rules (item 20 (h)); a custom record opens none, since its class is decided at fold after the port's events are written (V08 §3.5 (5) (f)), and the DM may paint the land use |
| J-V8.96 | chose to name, in V08 §5.1's host-mode differences, Settings without its Storage section beside the four file operations, over listing the file operations alone, because the list says "exactly these points" and T-V9-28's allowlist reads it, and `fileMenu: false` has both effects (no local store in host mode, V09 §3.8 (6)); and to cite V09 §3.9's new-document rule and V09 §4.10's drawing of the host's lines instead of restating them, because a copy with a shorter action list drifts from its source |
| J-V8.97 | chose to count V10's scratch line in the one frame whose built-in clerk holds an authoring turn or a waiting proposal, under configurations A and B, with page bars of 161, 231 and 421 MB derived from V08 §3.4's page rule (the refresh frame never runs beside a visible CITY or METROPOLIS), over a 266 MB CITY figure and "configuration B only", because a visible CITY beside a refresh cannot occur under V08 §3.4, and host mode's `builtin` without a transport is configuration A (V10 §3.17's selection), whose clerk opens the same scratch in the frame; configuration C and the refresh frame open none |
| J-V8.98 | chose to keep the port's notes by class — `event` notes in the ledger event of the run that wrote them, `standing` notes in it only when new (with the identities a run clears) and as a list in `DossierBinding.notes`, `report` notes never in the document — over storing every run's whole note list in each ledger event or keeping notes only in the transient `dossier.result`, because the history panel of every editing frame and of every later load must draw an absorb's notes from the log (only the port leader's frame sees the result), while a lived dossier's standing notes would otherwise repeat in every weekly event and grow the log |
| J-V8.99 | chose to give every note, held reason and host line a catalogue key with args — `PortNote.msg` as item 463's `MsgRef`, `MapRecord.held.reason`, `module.status.detail` as a key — and to write their words once, in V08 §3.9, V08 §4.6 and V08 §5.1, with a raised way's history lines left to V06's chronicle and V10's `info.raised.*` rows, over quoting sentences in the text for a panel to compose, because V09 §4.9 renders only catalogue rows, T-V9-15 fails on a code without one, and three wordings of one line is the drift a single source prevents |
| J-V8.100 | chose to name the note kinds `name_unjoined`, `name_ambiguous`, `custom_unkeyed`, `count_over_range` and `not_placed`, and to route every row set's "else …, noted" to `unmapped_word`, over unkinded notes, because a note without a kind has no row, no class and no test |
| J-V8.101 | chose to make `custom_resolved` and `low_confidence` `event` notes written only for the custom records a run adds or revises, over standing notes re-written at every absorb, because the live resolution changes with the DM's declarations between absorbs and is the why card's (V10's `WhyAnswer.profile`, V09 §2.7's `chips`); a stored standing copy would go stale |
| J-V8.102 | chose to keep `ignored_key` and `realm_block_used` — and `frozen_fact_changed` and `history_gap` — in the host's report only, over drawing them in the history panel, because they recur at offers or report a fact read once, and name nothing that changed on the map — amended by item 125 (J-V8.130): `realm_block_used` retired, `field_fallback` added |
| J-V8.103 | chose to hide a custom chain whole — its line, arrowheads, legend row, gazetteer row and every export feature — when the key withholds any joined node, over listing it as a `withheld: true` row or drawing it with the withheld node's end cut off, because a chain is a relation whose drawn route shows where each node stands and what it makes (the purpose §11.2 withholds), a withheld row would still let V09 §5.4 offer the view, and V09's T-V9-68 expects the entry absent |
| J-V8.104 | chose to carry the standing notes to the report panel on `GenerationReport.dossierNotes` — a copy of `DossierBinding.notes` made by every derivation's report build (item 390) — over a new `query` kind, because the panel already reads `report(h)`, the report is a derived cache every frame rebuilds (so a second editor's frame and a reload show the list without a read of their own), and the notes change only with the log |
| J-V8.105 | chose to admit a chain's nodes as a band-less reader does — each by §9.2's admission function as at the city band — for the drawing as well as for the gazetteer and the exports, and to read the export's whole knowledge key, over admitting at the band drawn and by tier alone, because a chain spans the town and would appear and vanish with zoom if admitted at the band drawn, a place a key form lists is admitted by its places (§9.2's last column), and §11.1 takes the requester's key, of which the tier is one part |
| J-V8.106 | chose to make the party lines' `{places}` and `targets` under the key the shell passes to `HostSlots.historyLines.list` (its `effectiveKey()`), each place read by `query`'s `entity` form with `admitAs` that key (items 583, 572), a `withheld` place neither named nor targeted, a `null` one named by its key with no target and a line left with no admitted place not listed, over the frame's key, because V09 §4.8 has every panel read as the players would while "See what the players see" or View as is on, and a `host.hidden` line names places the party no longer knows; the handler keeps no key subscription (V09 §2.2), since `effectiveKey` and `onEffectiveKey` are `ClerkMount`'s members, never handed to it, and the shell re-lists on `onEffectiveKey`; its one `subscribe` on the document reads head moves for its answer cache only (J-V8.110) |
| J-V8.107 | chose `calibratable: false` on every cell of the dossier row sets V08 §2.6 writes (`cultures`, `crime`, `relations`, `calamitySeverity`, `threats`' population, `customWeights`, `readiness`, `climates`, `historyEvents` and `festivals` among them), a value changing only as a table fix reviewed with V11, over calibratable cells, because a row set maps SettlementForge's vocabulary — the port's derivation rules (item 20 (h)) — not a measured quantity: §13.9 (7) never re-signs them, V11 §3.1 carries rows 63–66 and 77 `calibratable: false` (J-V11.65; T-V11-37), and V12's R4 never calibrates them; the item-110 threshold of DR35, a map rule's constant, is V11's calibratable `elevated.landmarkMinSignificance` (J-V8.70) |
| J-V8.108 | chose a dossier row set `customWeights` for the custom definition's `economicWeight` and `criticality` words, read by V08 §3.11's custom kinds, over keeping the two mappings as numbers in V08 §3.11's prose, because a constant with no table is a hard-coded universal (item 23) that no loader holds and no totality test reaches, and the words are the host's vocabulary like `dependencySeverity`'s, so they take the same row-set home and the same non-calibratable flag |
| J-V8.109 | chose a per-key answer cache in the embed's bridge handler for the party lines — a `list` with an unread key returning only the lines that name no place, the reads started and `onChange` fired when they answer — over an asynchronous `list` or a second, synchronous read path into the document, because V09 §2.2's slot returns its lines at once, §11.2's `query` answers by promise and is the one admitted read, and holding back a line until its reads answer never names, even for one frame, a place the new key withholds |
| J-V8.110 | chose to read the head move that empties the party lines' answer cache from the handler's one `subscribe(h, …)` on the frame's document (§11.2's `doc.changed` `ApiEvent`), registered at each `doc.load` and released at `close` and `switchTo`, over a head-move callback added to V09 §2.2's slot or a fresh `subscribe` per `list` call, because `subscribe` is the facade's change feed that V10's staleness watch already reads for a moved `logHead` (V10 §3.11), V09 §2.2 forbids the provider only a key subscription, a slot callback would widen V09's interface for one reader, and with no head read a renamed or newly withheld place keeps its old answer |
| J-V8.111 | chose to bind a REPLACEMENT lesser that is a pin record — `parish_church` over `wayside_shrine` — to the pin V11 §3.12's row keeps (the churchyard `cross`, laid by V07 §3.10's pin-record rule at a village rung — VS8 at generation, `village.records` at an epoch or an absorb) and to alias it on the church building only at a base rung where no such cross is laid, the target chosen where the merge is first read — the creation, or the absorb or epoch that brings the pair, the church arriving beside the standing shrine or by promotion (V08 §3.5.1 (c), (d)) — and kept across a later rung change, over one alias rule for every REPLACEMENT lesser or a re-binding at each rung change, because V11 §3.12 and V07 §2.4 keep the shrine as a thing on the map at village rungs, a key with two targets is a contradiction a builder meets, and a binding that moved at every hand-off would emit `rebind` events no dossier change caused |
| J-V8.112 | chose to write every `unmapped_kind` note after the fold, its `class` the class that builds the record at the document's rung — at a village rung V07 §3.11's village class or the pin kind a cell names — over filling it at digest from DR24's generic class, because a note that names a class the map did not build tells the DM something false, the note is read by no model rule so the later write changes no event, and `custom_resolved` already follows this order (J-V8.101) |
| J-V8.113 | chose to re-bind a placed lesser as the greater's members only where the greater's thing is the lesser's — every COUNT, QUARTER, GUILD and SIZE step and the REPLACEMENT rows whose V11 §3.12 reading keeps it (`graveyard` over `burial_ground`, `wizard_s_tower` over `hedge_wizard`, `mages_guild` over `wizard_s_tower`, `professional_city_watch` over `town_watch`, and `cathedral_10_000_only` over `parish_church`, whose church V06 §3.9.11 converts in place with its crypt) — and to place every other REPLACEMENT greater new, the lesser's key bound as at a first reading (an alias on the fish market's hall, the churchyard `cross` or the church, the enceinte the fortification path yields), over one re-key for every pair that arrives over time, because a roadside pin cannot become a parish church, V07 places an added fish market's hall on the market's rim so a re-keyed shop would give one key two things, and a key left on a palisade the new ring superseded binds the ring left to decay; QUARTER is named with COUNT, GUILD and SIZE because a quarter's members are the lesser's buildings |
| J-V8.114 | chose, for a promotion by receipt to a REPLACEMENT greater of a new thing — one record whose key the line keeps (F15) — to re-point the record's one binding row to the greater placed new and to lay a pin the row keeps (the churchyard `cross`, at a village rung) for the record with no binding row of its own, the lesser's former thing left standing unbound, over binding the key to the cross or to both the cross and the church, because one key binds one thing (J-V8.111) and a parish church record bound to a cross would send the church's later state — a ruin, a closure, a **Show** — to the cross; where two keys meet (the church added beside a kept shrine, or the shrine leaving the list as the church arrives) the shrine's key binds the cross as at a first reading (V08 §3.5.1 (d), T-V8-46) |
| J-V8.115 | chose V11's class `label` cell (item 516) for the words a note's `class` argument shows, and a pin kind's `host.pinKind.<kind>` row (V08 §4.6), over "the display label (§9.5)", because §9.5 holds the title and the legend but no class words, a pin kind has no class row, and V07's `market` fallback builds the reservation of V11's `market` class, whose label is the word to show (V08 §4.6, V08 §1b, T-V8-46) |
| J-V8.116 | chose, for a dossier `desert`, the arid climate row with a river, a lake and a coast at its chances, every water word forcing its water, and the oasis exactly when `oasis_water` is listed — the arid row's oasis chance a standalone draw only — over drawing an oasis at the arid chance on dossier maps too, because SettlementForge's deposit list is its statement of what lies near the settlement (item 20: the dossier's facts win), a desert on a river or coast must keep it (item 111 (a)), and DR1's "water deposits" input needed its one list, which the `site` row's water words now are at every terrain (V08 §2.6, V08 §3.16 (1)) |
| J-V8.117 | chose one edge table for the volume (V08 §3.17), each mechanism's extremes with their outcome, rung and test, and one table of the combinations where this volume's features meet the others' by feature, with one edge suite (T-V8-49), over edge clauses scattered through the sections, because the port places nothing itself — every combination holds the base's or the named volume's rule for the feature — and one table lets a verifier find every edge (principle (11)) |
| J-V8.118 | chose to read SettlementForge's hosting, save-limit, backup and language decisions as `MapHostConfig` inputs — `moduleOrigin`, `quotaBytes`, `backupDepth`, `locale` (J121) — with the client's trim order under the allowance (backups beyond the newest first, then the party set's building level) and never a refused commit, over fixing two backups, a per-map quota and English in the design, because J121 makes those decisions SettlementForge's, and a storage limit must never lose an edit (§5) |
| J-V8.119 | chose, for SettlementForge's export bundle (J122 V08 Q3), one host-client call `exportScenes` over the bridge's `export.request { fmt: 'dd2vtt' \| 'foundry', bundle: true }`, returning opaque `Blob`s the client never decodes and SettlementForge packages unread, over a new message or a structured return, because the base's export path already renders scenes at a key, one flag keeps the `E_HOST_FORMAT` rule otherwise absolute, and blobs keep door 1 closed (J86): the files are the user's export, never an input to SettlementForge's simulator |
| J-V8.120 | chose to read SettlementForge's history into `Recipe.history` at creation only — the founding, the events by the `historyEvents` row, `tierHistory`, `populationHistory`, the calamities before creation, the lifecycle, the ancient fall and the peak — with the effective peak's tier the one the STRONGEST present evidence shows (a `tierHistory` demotion, the `populationHistory` maximum, calamity losses, a ruined or remnant higher-tier record, a resettlement), every present kind listed for the clerk and `history_gap` noted, over the highest tier any evidence shows, because item 113 (f) orders the evidence strongest first and the least-reliable kind must never outrank a stronger one; later history reaches the map through the live rows, never a second replay (V08 §3.15) |
| J-V8.121 | chose to fold the dossier's defence readiness into NEED as max(threat, readiness weight), with DR2's creation defence reading the threat alone, over averaging the two or letting readiness lower a threat, because a well-kept fortress keeps its walls in use in a safe heartland while a weak readiness never makes a frontier safe, and the creation's walls and gates must not change with a maintenance word (item 114 (a), (d); V08 §3.16 (2)) |
| J-V8.122 | chose "specified" (item 115 (c)) to mean a dossier-bound record of a class the ceiling table's `grandClasses` lists (V11 §3.25.4) — every placed member of such a collective record included — or a dossier government's forced manor (its `villageSeat` the manor house, seigneurial or crown; V11 §3.21.1), and nothing else (no wealth word, quarter name, title or keyword alone), over reading grandeur from the dossier's wealth or words, because item 115 (a) says prosperity in small places shows as quality, not grandeur, and only a record names a building (V08 §3.16 (3)) |
| J-V8.123 | chose to follow SettlementForge's calendar by the client's `view.set { week }` under the view's follow flag and to set the biome's climate row at creation from the realm's climate word, else the terrain, frozen after creation, over a model input for the week or a climate re-read at every absorb, because a season is a look that must never change the model or its hash (item 117 (a)) while the biome is a model input fixed with the site (V08 §3.16 (4)) — amended by item 125 (J-V8.130): the week is the dossier's latest stamped tick and the climate the terrain's |
| J-V8.124 | chose to read `traditions` at the pinned baseline into carried `tradition` facts — the window reduced to weeks of the `sf445` year, the staging prose reduced to V11's staging keyword keys inside the adapter, the kind by the `festivals` row — and to make every tradition change a ledger-only change, over a model record or an epoch event, because a festival is a look only (item 118 (a)), the owner's rule makes `traditions` an input, on no `ignored` row, and no dossier prose may enter the document (V08 §3.16 (5)) |
| J-V8.125 | chose to carry the site and the history as frozen facts whose later change writes one `frozen_fact_changed` report note and no map event, and to carry the settlement's wealth word as a `prosperity` change riding the next epoch's `EpochInputs.wealthLevel`, over skipping those changes silently, because the site and the history are creation's (§7.7 item 10) yet a DM must see that SettlementForge changed them, and a campaign's prosperity must reach DR6 and item 114's means (V08 §3.5) |
| J-V8.126 | chose the adapter's field table (V08 §2.4) as the one list of every SettlementForge path the port reads, the digest field it fills and the row it feeds, or `ignored` with §7.7 item 1's reason — one `ignored` row per reason, a source SettlementForge keeps outside the dossier written with no dossier path — with `defenseProfile.readiness` the one part of `defenseProfile` read (item 114), `traditions` read (item 118) and `powerStructure.previousGovernments[]` read only at each entry's `tick` (J-A73.06), over paths implied across the sections, because a closed digest needs one list that the manifest's `keyList`, §14's lint and T-V8-20 read |
| J-V8.127 | chose to list each dossier institution record whose key binds an element as one Find entry under its own words (`kindLabel`), selecting exactly the addresses its binding rows hold, first among the named institutions and apart from its class's entry, its chip holding the binding key with an anchor address so that it follows a re-key and goes dark at 0 when the record leaves the map, and to let SettlementForge's assistant answer in words without setting chips, over listing the dossier's names as synonyms of their classes, selecting a record by its words, or a host message that drives the frame's Find, because the owner's Find "references what's in the dossier" (item 120 (b)), a record's members are the dossier's statement while its class also holds the map's own buildings, words change with a rename while an address does not (§6.3), and Find is the viewer's view, never the host's (item 120 (a)) |
| J-V8.128 | chose, for item 122 at the port, a crisis census of the pinned line's stressor types, condition archetypes and simulator crisis events carried in the catalogue manifest; each overlay's source read as its stressor type, the census event that raised it (`triggeredAt.sourceEventType`) or else its archetype; the condition's name, calamity link and counts carried as ledger-only crisis fields; and a condition's tier `public` where its look is drawn and `secret` where its row is `none` — over writing the closed mapping's values here or reading the looks from the `conditions` row, because the map rows' values are V11's (§10.2 *Crisis looks*; V11 §3.25.9) and the census is what their totality is checked against, the `event` row needs the event that raised a condition, which only `triggeredAt` records, and a look is a sight every viewer sees while a pressure with nothing to see stays the DM's (J-V8.40) — amended by J-V8.135 (a stressor and a condition of one look kind draw one look) and J-V8.136 (a calamity's disaster look through its linked `none`-row condition) |
| J-V8.129 | chose to fix the port's side of item 122 (h) now — a condition's `forces` (kind, heads, an army's allegiance and coalition, a group's kind, name), joined to the condition its record names or else to the most severe standing camp look of its kind, the counts the dossier already gives (`arrivals` from `populationHistory`, the calamity's `exodus`) and the fallbacks in item 122 (h)'s order — with no path read at the pinned line, over waiting for SettlementForge's fields or guessing their paths, because the fields are in development (the owner), an adapter version adds paths without a change of design (V08 §3.8), and the final local check confirms them (item 125 (d)) |
| J-V8.130 | chose, for item 125, the dossier as the port's one data input — `HostContext.week`, `.realm` and `.customLibrary` retired with the realm block's helper, `RealmPlacements`, `PortValues.latitudeDeg`, the carried `port-values.latitudeDeg`, `site.climate`, the `climates` row's climate words and `realm_block_used` (item 125 (a)) — the week the dossier's latest stamped tick (`presentWeek`), the latitude DR29's from the culture at creation, the climate the terrain's, the custom definition fields the dossier's own, and a fallback on every read row of the field table with a `field_fallback` report note, an empty name or tier word included, over keeping host inputs as optional sources, because the owner's rule makes the dossier the only input (item 125 (a)), a host input must never change a map a dossier makes (T125-2), and the generator already has a standalone choice for every field (§7.7 item 10); `line` stays the one host field, which the selection checks (V08 §2.4; J-V8.133) |
| J-V8.131 | chose a field-by-field brief for the final local check — every read path's presence, shape and values, every fallback, the key sets, the crisis census and the in-development fields, in one table of matches, mismatches and fixes, each fix landing before SF3 cuts its fixtures and R9 re-running it at a new line — over a free-form review, because item 125 (d) asks for exactly that table and a fix must reach the adapter and the fixtures before they are cut |
| J-V8.132 | chose, for item 126 at the host, no Map tab on a phone (SettlementForge's own rule) and a frame and party viewer sized to the tab but never below 600 × 480 CSS px, the tab scrolling, over a phone screen or a frame that shrinks, because the owner's revision (a2) offers no map on a phone at all and V09 keeps the medium layout at that minimum (V09 §4.12), so a resize re-lays nothing the document holds |
| J-V8.133 | chose, for item 125 (e), an adapter selected by the dossier's own shape and version stamps in every case — the bound line when its adapter accepts, else the single accepting adapter, else, with several accepting, the newest registered line, noted `line_defaulted` — with `HostContext.line` checked, never chosen from (a named line unregistered or refused by its adapter refuses `E_LINE_UNSUPPORTED`; a registered, accepting line that differs leaves the selection standing, reported by a `line_differs` note of class `report`), over letting `line` decide between two accepting lines, because the owner's bar is that one dossier makes the identical document and hash with and without a host context (item 125 (e); T125-2), a bound map stays on its line until a declared `fromLines` migration moves it either way (V08 §3.8), and a report-class note never enters the document (V08 §2.4) |
| J-V8.134 | chose, for item 125 (b), a fallback for every read value the port cannot read, the identity, population, seed, institution list and version stamps included — an empty or unreadable `id` the bound document's key at an absorb (`E_OTHER_SETTLEMENT` not checked for that offer) and at a creation a key minted from the map's id, `settlement:map:<mapId>`, kept for the document's life; a `population` empty, negative, fractional or no number the default request of the tier word's rung, else the one-click default's 5 000 (a readable whole number above the cap refused, B7); an `_seed` H32 of the settlement key; an `institutions` that is no list read as absent; an empty or unreadable version stamp no evidence for `recognise`, the selection run without it — each noted `field_fallback`, the stamp also `line_defaulted`; at an absorb the carried value stands for every such field, as the `id` row's bound key does (V08 §3.5) — with only a missing required key (`select`'s `E_UNKNOWN_SHAPE`, B3), a dossier over a limit (B3), one holding a line's required keys that no registered adapter accepts (B5) and a population above the cap (B7) refused, over refusing an empty or unreadable required value, because the owner's rule is that a missing or empty field never refuses, never stalls and is reported (item 125 (b)), each has the generator's standalone choice (§1.1's default request, §1.2's one-click default), on a map made without a dossier nothing moves the population, the name, the tier or the institutions after its creation, and a dossier lacking a key every dossier of the line carries is no dossier of that line (T-V8-31; V08 §2.4, V08 §3.5 step 1) |
| J-V8.135 | chose, for item 122 (c), one look for a stressor and a condition whose `crisis.map` rows give one look kind while both stand — the condition's, with its name, weeks, severity and forces, a force joined to the stressor drawn with it, the stressor's look resuming in a week the condition does not stand — over a promotion link (the condition whose archetype is the stressor's type, or whose `triggeredAt` names it), because the pinned line is not confirmed to carry such a link, a rule on the look kind needs none, and two looks of one crisis would double the camped ground the owner's scale by severity and tier sets; two conditions of one kind stay two crises (V08 §3.16 (7) (b)) |
| J-V8.136 | chose, for item 122 (b)'s disaster look, a source through the condition a calamity raises — a condition linked to a carried calamity by V08 §3.16 (7) (d) whose own row is `none` (a `reconstruction` among them) carries `event` `calamity` and reads that row, one look per calamity (the earliest-triggered such condition, ties by condition id), a calamity no such condition links to drawing no look — over an overlay made from `calamityHistory` itself, because item 122 (a) draws every look from the `ConditionOverlay`s standing in the view's week, a calamity is no overlay and stands in no weeks, while the condition SettlementForge raises after it gives the weeks the ruin stands (V08 §3.16 (7) (b)) |
| J-V8.137 | chose, as the catch-up's own pre-decided change under §12.10's R12-31 (J122, vetoable), to fold the dossier events each epoch's span holds as one batch — one fold pass, each event still its own log event at its own week and `seq`, the provider distances and class rasters kept current through the pass, the view stages run once with the epoch's (V08 §6's absorb-with-epochs row) — over coarsening the events' weeks or merging their changes, because item 119 forbids a coarser or shortened result and every dossier event keeps its own week (item 22 (c); V06 §6.8 (6)), while the per-event fold repeats work one pass can keep current or run once; the batch's log and every model digest equal the per-event fold's (T-V8-63) |
=== END ===
