# coherence/canon: id-hygiene rulings, elegance rulings (UNIFY with equivalence lists / KEEP APART with the separating
# nuance), glossary rulings (one term per concept; retired synonyms), and the canon's own decisions under J122.
IDH = []   # id hygiene
def idh(rid, subject, ruling, units, renumber=None):
    IDH.append({'id': rid, 'subject': subject, 'ruling': ruling, 'units': units, 'renumber': renumber or []})

idh('ID-BCR', "V01 and V04 number their base change requests bare 'BCR-n' (both 1–46): the same id names two requests (V03 cites 'BCR-29, BCR-30' for V04 and 'its BCR-43' for V01).",
    "Rename into the set's one request family: V01's BCR-n → BCR-V1-n, V04's BCR-n → BCR-V4-n (the number kept). File f's citations 'V01 BCR-n' / 'V04 BCR-n' resolve by this rule and need no edit; every other citation in the set is rewritten.",
    ['V01', 'V04', 'V03', 'V05', 'V06', 'V07', 'V08', 'V09', 'V10', 'V11', 'V12'], [{'from': 'V01 BCR-n (bare BCR-n in V01)', 'to': 'BCR-V1-n'}, {'from': 'V04 BCR-n (bare BCR-n in V04)', 'to': 'BCR-V4-n'}])
idh('ID-TOOL', "Tool ids T1–T12 (item 101) and the base's bar family T⟨item⟩-⟨n⟩ share the T prefix; bare 'T8', 'T10', 'T11' in §13.8 mean items' bar groups.",
    "Keep both families (the tools are the owner's item 101 names; the 203 bar ids are cited everywhere). A bar group is always written with its number form ('the T8-n bars', 'T8-1 – T8-3'), never bare; a bare T1–T12 means the tool, written with its word at first use in a paragraph (T8 `fill`). §13.8's list is rewritten so. Volume bars keep T-Vn-m. research/sf/mapping.md's tables T1–T16 are cited by their row-set names (V08 §2.6), never bare (V07-TERM-4).",
    ['scope', 'determinism', 'V07', 'V09', 'V10'])
idh('ID-R', "R1–R19 (§14's interaction contract) vs IMPROVEMENTS requirement ids R3, R6, R8, R9, R13 and 'R11' (a repair round).",
    "Bare R1–R19 mean §14's interaction rules; an IMPROVEMENTS requirement is cited 'IMPROVEMENTS R3'; 'R11' (a repair round, J-A28.02) is narration and is removed. The f file's rule labels (R-a … R-d) and the canon's home rules (R1–R13 of the earlier canon) live only in validation records.",
    ['scope'])
idh('ID-TRACE', "§17.1 (6)'s provenance trace keys P⟨n⟩ and D⟨n⟩ share letters with the parity class P and the decisions D-n; §15.1's capability ids repeat per reference table.",
    "Trace keys keep P1…/D1… inside §17.1 (6)'s table only (no hyphen); decisions are always D-n (hyphen); §15.1's capability ids are always cited with their reference ('FTG C9', 'MFCG D1').",
    ['scope'])
idh('ID-JT', "'J-T' (§13.7, BCR-V12-12) names the Jonckheere–Terpstra trend test inside the J- decision namespace.",
    "Renamed 'JT (the Jonckheere–Terpstra trend test)'; the J- namespace holds decisions only.", ['scope', 'V12'], [{'from': 'J-T', 'to': 'JT'}])
idh('ID-APPX', "Appendix A holds only 'A.3' (A.1 and A.2 moved to the rationale file).",
    "Appendix A's one section is unnumbered; citations of 'A.3' read 'Appendix A'.", ['scope'], [{'from': 'A.3', 'to': 'Appendix A'}])
idh('ID-ITEM', "'item N' means an owner or amendment item and also a numbered paragraph of a section ('§7.7 item 15').",
    "Bare 'item N' means an owner or amendment item only (owner items 1–101, file g 102–113, file f 200–585 — disjoint by design). A section's own numbered paragraph is always cited with its section ('§7.7 item 15', '§7.7 clause…' not used). Inside §7.7 the contract's items are written '§7.7 item n' (DIC-05).",
    ['determinism', 'scope', 'pipeline'])
idh('ID-LAYER', "The toolkit's layers L0 INTENT … and the plat refinement levels L0–L4.",
    "A toolkit layer is always written with its word (L0 INTENT, 'the INTENT layer'); bare L0–L4 means a refinement level (DIC-07).", ['determinism', 'V09', 'V10'])
idh('ID-WX', "Volume-local row ids W1…, X1…, H1…, FL-n, IN-Vnn-n, S-Vn-x are reused across volumes (V01 W15 and V04 W15; X1 in V02, V06, V08).",
    "They stay volume-local and are never cited bare outside their volume: another unit writes 'V06 W75', 'V02 X20', '_integrate H12'. Inside its own volume a bare id means that volume's row. V08 numbers its §1b wiring rows W1… (V08-TERM-1) and drops the history dividers. The IN-Vnn-n integration notes are folded into the body by the rewrite (their content at its home), their ids kept only in the validation records.",
    ['V01', 'V02', 'V04', 'V06', 'V07', 'V08', 'V09', 'V10', 'V11', 'V12'])
idh('ID-DR', "Derivation rows proposed under working names (DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1–DR-V8.8) and numbered by J-VI.13 / file f item 383.",
    "The numbers DR26–DR35 are the only ids everywhere in the set (DR26 = DR-V1.1; DR27 = DR-SKY; DR28 = DR-V6.1 = DR-V8.6, one row; DR29–DR33 = DR-V8.1–DR-V8.5; DR34 = DR-V8.7; DR35 = DR-V8.8); the aliases are retired (glossary G-DR). g item 113's history rows take DR36 onward, numbered by the determinism editor in §7.7's order and cited by V04, V06, V08.",
    ['determinism', 'V01', 'V04', 'V05', 'V06', 'V07', 'V08', 'V11'], [{'from': 'DR-V1.1', 'to': 'DR26'}, {'from': 'DR-SKY', 'to': 'DR27'}, {'from': 'DR-V6.1 / DR-V8.6', 'to': 'DR28'}, {'from': 'DR-V8.1', 'to': 'DR29'}, {'from': 'DR-V8.2', 'to': 'DR30'}, {'from': 'DR-V8.3', 'to': 'DR31'}, {'from': 'DR-V8.4', 'to': 'DR32'}, {'from': 'DR-V8.5', 'to': 'DR33'}, {'from': 'DR-V8.7', 'to': 'DR34'}, {'from': 'DR-V8.8', 'to': 'DR35'}])
idh('ID-JC', "The canon's own decisions under J122 need ids that collide with nothing.",
    "The canon's decisions are J-C1 … J-C4 (J-C1–J-C3: SCOPE-C06's three base questions; J-C4: the span rule's `country` reason, V07-XCONF-2); the determinism editor or scope editor enters each as a Judgment-calls index row with a Part A entry.", ['scope'])
idh('ID-DUPDEF', "The id census (work/canon/ids.py over the base, rationale, INDEX, f, g, _integrate and the twelve volumes) found no test or decision id defined twice with two meanings: every apparent duplicate is an index row and its Part A entry (J-A…, D-n), a bench-registration row and its bar's body (T-V2-22 …), an amendment note to the same request (BCR-V11-1 …), or a continuation line of a range. The rewrite keeps one definition per id: a volume's amendment notes to its own request fold into the request's one entry.",
    "No renumbering beyond the rulings above.", ['V11', 'V02', 'V03', 'V09', 'V10', 'V04', 'V07', 'V08'])

EL = []  # elegance
def el(eid, verdict, subject, form, home, units, equivalence, nuance=None):
    EL.append({'id': eid, 'verdict': verdict, 'subject': subject, 'unified_form': form, 'home': home, 'units': units,
               'equivalence': equivalence, 'separating_nuance': nuance})

el('E-01', 'UNIFY', "Stretch-state profiles on chains: RetainingWall.state (file f item 245) and Enceinte.condition (file f item 575) — the same knot-profile mechanism written twice ('exactly as item 245's').",
   "One 'stretch-state profile' rule stated once at §2.2 rule 5 (the knot-profile rule): a ChainProfile<S> of a state enum on a chain, its canonical form, writers over a StretchRef, carry through re-derivation, cut and join, undo and migration; each record states only its value set, knot role, absent default, writers and readers.",
   "§2.2 rule 5 (model)", ['model', 'V06', 'V05', 'V07'],
   ["canonical form: an open chain keeps a knot on its first vertex; a closed chain needs none; drop a knot equal to the one before it (never an open chain's first-vertex knot); all-equal profile stored as the scalar; scalar default (`standing`) stored as absent",
    "write: near knot carries the new state, far knot the state held before; an end that is no vertex placed first by splitThrough (§3.4); a writer naming no stretch writes the whole chain",
    "read: sampleProfile by arc length (§3.4), cyclic on a closed chain",
    "regenerate: a knot stays on its vertex while the vertex survives (carry-over by lattice point, §3.10, §6.3); a knot whose vertex is gone is re-placed by splitThrough at the new chain's nearest point within retaining.settings.stateSnapCm (V11, 100 cm; both records read this one cell, as item 575 states 'exactly as'), else dropped and its run merged into the run before it; an open chain's first-vertex knot always re-placed on the new first vertex",
    "cut or join: carried by J-K23's rekey pairing",
    "undo: the writing op's undo record restores the former profile, knot rows included",
    "migrate: absent reads the default; a pre-round-2 scalar reads as the constant profile",
    "RetainingWall keeps: values standing|decayed|ruined; knot role retaining_state_knot; writers BCR-V6-26's retaining member (breach → decayed, dismantle → ruined), repairRetaining, V05's landfall (decayed), V07's house-platform walls through V06's pool; restoration writes standing over the re-levelled length; readers V06 §3.19.4, V04 footings, the renderer, item 447's export, the clerk",
    "Enceinte keeps: values standing|breached|dismantled; knot role wall_state_knot; writers DeclineOp breach/dismantle, V05's landfall (breached), V06's repairWall; the record's lifecycle rules (abandoned on neglect; decayed while any run is not standing; lifted by the no-stretch repairWall per V6 §2.8); §8.2's decayed row draws gap glyphs on breached runs and dismantled towers as trace discs; §11.1's wall LineStrings split per run with id and run"])
el('E-02', 'KEEP APART', "Removals that hold: LifecycleEvent.detail.suppress (raised ways, harbour chains, quay walls, retaining walls, deck plots) vs V05's live SkyIsland record in state removed with removedAccesses (V06-ELEG-1).",
   None, "file f item 260 (§2.8) states the one lift rule for both", ['V05', 'V06', 'model'], [],
   "An island's removal holds a count-law slot counted as filled and keeps an archived arena part and its households for undo (J-V5.62): a live record with state is needed; a suppression key on a delete event cannot hold an arena. The lift rule (undo, or the user's own re-add serving the same key; a cap increase opens only new keys) is already one (f item 260) and is stated once there.")
el('E-03', 'UNIFY', "The fixed-key existence draw of the underground (V04-ELEG-1): the catacomb source, the overlap shaft, the crypt join, the dig and the public opening each restate 'one uniform on the sewer stream keyed by the thing's own lineages with no epoch component, fixed by its key, never re-drawn, re-compared against a rising chance'.",
   "One 'fixed-key draw' pattern stated once in §6.1 (streams): a draw keyed by (stream, the subject's lineage key parts, concern) with no epoch component, fixed for the subject's life, compared at each named moment against a chance that may rise; the subject exists from the first moment the chance exceeds the draw. Each site cites it and states only its stream, key parts, chance source, comparison moments and persistence.",
   "§6.1 (determinism); V04 §3.12 keeps its exception list", ['determinism', 'V04'],
   ["catacomb source: re-compared against CITY's chance when the rung rises",
    "overlap shaft: its own key and chance row",
    "crypt join: the own/other chance split kept",
    "dig: a made access persists; 'appears when the chance later rises' kept",
    "public opening: its candidate order (V04 §3.5.7 (e)) kept",
    "§3.12's exception list kept verbatim as the pattern's exceptions"],
   None)
el('E-04', 'UNIFY', "The event → tool binding: §7.1's partial twelve-tools table, §7.4's create-column tool names and V09 §4.3's table (DEL-06, DXC-04).",
   "One binding table at §7.1 keyed by (event kind, target class or path) → home tool; §7.4 cites tools by id; V09 §4.3 keeps screen and gesture columns only.", "§7.1 (determinism)", ['determinism', 'V09', 'V10'],
   ["every EditEvent kind (70 base + the volumes' added kinds) has a row", "history kinds (undo, redo, rebase, upgrade, epoch, closeup) marked with their producer", "V09's per-target homes kept (split/merge at T5 for districts, T9 for ways and plots; delete at T10 and T9 for access points and galleries; instance at T6, T8, T9)", "T-V9-12 checks completeness over the pairs"])
el('E-05', 'UNIFY', "The table registry: §7.6's prose enumeration (about 60 tables) vs V11 §3.1's registry rows (DEL-09, DXC-05; file f item 379).",
   "V11 §3.1 is the registry (one row per table: readers, slice kind, extension and presets); §7.6 cites it.", "V11 §3.1", ['determinism', 'V11'],
   ["every table §7.6 names has a registry row (T-V11-1 fails the build otherwise)", "readers per table as V11 §3.1 states them, unioned with §7.6's and V11 §1b's (V11-ELEG-1)", "base table values the base calls table values get a row (W-SET-01)"])
el('E-06', 'UNIFY', "The concern registry of §6.1: about 70 concerns across six prose paragraphs (DEL-01).",
   "One table: id, kind (geometry or not), rerollable, attempt cap (as an index, DIC-02), keyed by (the keying sentence as its cell), readers, retired (ids reserved).", "§6.1 (determinism)", ['determinism'],
   ["each concern's keying sentence kept as its cell", "retired ids reserved and listed", "every attempt cap restated as an index without changing the number of draws (DIC-02)", "the amendment narration removed (DIC-12)"])
el('E-07', 'UNIFY', "Refusal and bend causes of the dry run: F-EDIT's detection and action columns restate about 25 causes from §7.1, §7.3, §7.4, §7.5, §7.7 (DEL-02), while item 101 R2 / J-VI.4 / J-VI.30 made most of them bends.",
   "One dry-run outcome table at §7.1: cause, detection, outcome (refused — only a dossier fact or a lock; else bent), the bend's target or the refusal's offered action, the message key (V09 §4.9), home. §5.2's F-EDIT row cites it.", "§7.1 (determinism)", ['determinism', 'V09', 'V10'],
   ["each case's offered alternative stays its own row", "the dossier-owned refusal (§7.7 item 11) and lock refusals are the only refusals", "file f item 582's three bends (no site, over budget, occupied join or split) as rows", "V09's bend.* and refuse.* keys map one to one"])
el('E-08', 'UNIFY', "Rename {id, from, to} (§7.1) and ReportEntry's rename variant {id, from, to} (§5.4) (DEL-03, first half).",
   "One type `Rename` declared in §7.1, used by §5.4's ReportEntry.", "§7.1 (determinism)", ['determinism'], ["same fields and meaning"])
el('E-09', 'KEEP APART', "DisruptionReport.moved {use, from, to | null} vs ReportEntry relocate {use, from?, to?} (DEL-03, second half).",
   None, "§7.3 and §5.4 as they stand", ['determinism'], [],
   "Optionality differs: a disruption report always knows the origin and marks a vacate by to = null; a report entry may lack either end. One type would blur absent and null.")
el('E-10', 'UNIFY', "Tables in disguise inside §7.4 and §7.5: the world-point records under a warp (seven kinds in one sentence) and the schema transforms (two paragraphs) (DEL-07, DEL-08).",
   "Two tables: (record, host face, clearance, re-seat, orphan rule) in §7.4; (record or field, older-document default, first-load derivation, source item) in §7.5.", "§7.4, §7.5 (determinism)", ['determinism'],
   ["the door light's ring-edge fraction rule a row", "Works' rings never re-seated a row", "'none is invented' cases stay rows"])
el('E-11', 'UNIFY', "Restated rules inside the determinism part: the dossier-owned refusal (six places, DEL-04), 'no undo target' for creation events, dossier events and epochs (seven places, DEL-05), §5.3 rows restating their rules' homes (DEL-10).",
   "One home each (§7.7 item 11; §7.4 Replay semantics; each §5.3 row states only its check and scope and cites the rule's home).", "§7.7, §7.4, §5.3", ['determinism'],
   ["§5.3's scope and check columns stay §5.3's"])
el('E-12', 'KEEP APART', "Three shapes for 'the op met locked or pinned content': E_LOCKED, clearFiner's Conflict[], the warp's held set (KEL-01).",
   None, "§3.1, §3.4, §3.6 as they stand", ['kernel'], [],
   "Outcomes differ: E_LOCKED fails the op; clearFiner reports and clears the rest; a warp holds the vertex (field zero) and succeeds. One record would blur fail, report and hold.")
el('E-13', 'UNIFY', "E_DEGENERATE's detail vocabulary scattered over §3.1's comment, the OBB row and §3.7 (KEL-02); the degenerate contracts of OBB/hull and regularFit stated two or three times (KEL-03).",
   "One detail table under KernelError (§3.1): detail value (stretch, seed, fixed, overlap, fit, collinear, empty, collapsed) → op → meaning; each contract stated once at its op.", "§3.1 (kernel)", ['kernel'], ["every detail value with its op kept", "each op's contract text kept once"])
el('E-14', 'UNIFY', "Restated kernel rules (KEL-04, KEL-05): the rebuild threshold max(256, ¼ of static size), the placement bound, 'moves keep nothing'; §3.5's failure table restating mechanisms.",
   "One home each in §3.3/§3.6/§3.10; §3.5 becomes a traceability table of pointers.", "§3 (kernel)", ['kernel'], ["every value kept once"])
el('E-15', 'UNIFY', "Two angle quanta: centidegrees and a 16-bit binary angle with no consumer (KEL-06, KWG-09).",
   "The 16-bit binary angle is removed (no producer's output is read, no consumer anywhere in the set: an orphan, principle (7)); centidegrees (Cdeg, §2.1) is the one angle unit.", "§2.1 / §3.2", ['kernel', 'model'], ["every angle that is read is in Cdeg already"])
el('E-16', 'UNIFY', "`tint` and `vignette` each name a paint program and a post operation (REL-01); the role `lights` vs `light` (REL-05).",
   "One name per mechanism: paint programs keep `tint` and `vignette`; the post operations are renamed `wash` (a whole-tile tint after the light, including the condition overlay's settlement-wide tint) and `edgeFade` (the view's vignette); the role `lights` is renamed `glow` (the program it feeds).", "§8.2 (rendering)", ['rendering', 'V04', 'V05', 'V09'],
   ["a program runs per mark in its slot; a post operation once per tile base after the light", "the painterly family's spotlight vignette is the `vignette` program", "the two roles' distinct uses kept (glyph tone vs glow sprite)"])
el('E-17', 'UNIFY', "The knowledge admission re-stated at each reader: labels §9.2, legend §9.5, thematic rows §8.2, exports §11.1, the API §11.2 (REL-02).",
   "One admission function at §9.2 with its readers listed; each reader cites it.", "§9.2 (rendering)", ['rendering', 'V08', 'V09', 'V10'],
   ["the band each reader admits at kept: its view's band, the export's band, or the city band when band-less", "V09's admitAs (J-V9.86) and V10's filtered dry runs cite it"])
el('E-18', 'UNIFY', "§12's ≈ 25 measurement-and-fallback clauses share one shape (REL-03).",
   "One budget table: budget, measuring milestone and suite, pass bar, pre-decided fallback, report, owner veto.", "§12 (rendering)", ['rendering'],
   ["every bar, milestone and fallback value", "D-18's owner-veto declarations", "the per-rung laws"])
el('E-19', 'UNIFY', "Restated rendering facts (REL-04, REL-06): §11.3's per-viewer key list re-enumerating §2.9; surfaceTopCm, every caster, rungs 1–2 albedo, never-lit overlays, light host, band-less admission, fixed sun, canvas formulae, the 24-B index, sizes, copies, port refusal, one-way rule, transient list each stated 3–6 times.",
   "One home each; §11.3 reads 'every view key of §2.9 travels as view.set / view.changed except the pointer and `underlay`'.", "§8–§12", ['rendering'], ["`time`'s sim.advance and the host's `week` exceptions kept"])
el('E-20', 'UNIFY', "Three copies of the owner-item bar convention in §13.2 (EL-01) and every 'no-op pin' bar of the owner items (102 (g), 103 (f), 105, 106, 110 (f), 111 (d), 113 (g)).",
   "One convention paragraph in §13.2 ('hard unless banded; tier from §13.8; from the milestone §16 names; a staged engine's bars on hook fixtures until the engine lands; every no-op pin a NoOpPin registration on V12 §3.7.8's engine reading V11 §3.24.0's off form') cited by every group.", "§13.2 (scope)", ['scope', 'V11', 'V12'],
   ["the owner-rules copy's registry path-test list for amendments c", "the declared-shift clause for goldens", "each item's off-form cell values (V11 §3.24.0) and its bar id"])
el('E-21', 'UNIFY', "§13.8's two tier-schedule paragraphs and §16's per-milestone T-lists (EL-02).",
   "One schedule table (test id or range → CI tier → first milestone) in §13.8, cited by §16's exits.", "§13.8 (scope)", ['scope'],
   ["every range's tier and first milestone exactly (T28-12's wings clause from M3a, its plan clause from stage 3's intake)"])
el('E-22', 'UNIFY', "§0.2's three landing tables (items 1–7; 8–31; 32–72 and 101) (EL-03), which must also land files g and f (CO-05).",
   "One landing table (item, home, clause map), with rows for g items 102–113 and a pointer row for file f's items 200–585 by section.", "§0.2 (scope)", ['scope'], ["every clause-map cell kept"])
el('E-23', 'UNIFY', "§13.9's re-signing lists (4), (5), (7) split by amendment round (EL-04).",
   "One list of calibratable table families.", "§13.9 (scope)", ['scope'], ["'dossier row sets are not re-signed' kept"])
el('E-24', 'UNIFY', "Superseded or amended decisions marked inline in many forms across the set (EL-07, SCOPE-C02, V01-ICONF-3, V04-ICONF-2, V09-ICONF-5).",
   "One mark on the decision row: 'superseded by X' or 'amended by X', in the Judgment-calls index and in every volume's §9.", "the index (scope) and each volume's §9", ['scope', 'V01', 'V02', 'V03', 'V04', 'V05', 'V06', 'V07', 'V08', 'V09', 'V10', 'V11', 'V12'],
   ["no row dropped", "the governing row keeps the reason"])
el('E-25', 'UNIFY', "FtgSize enumerations (EL-08, SCOPE-C10).", "One type FtgSize in §13.5.", "§13.5 (scope)", ['scope'], ["'CITY' (FTG's timed CITY preset) stays expressible"])
el('E-26', 'KEEP APART', "D5Pair's FTG arm vs FtgCapture (EL-09).", None, "§13.6, §13.5", ['scope'], [], "D5Pair carries platSeed and suburbFrame, which FtgCapture lacks; a reference would lose them.")
el('E-27', 'UNIFY', "The valley's plan reach defined twice: facadeBays' integer e and roofscape's float e (V02-ELEG-1).",
   "One definition valleyReach(X, Y) with two arithmetic modes: integer (bays; byte-identical on every host, T-V2-13) and float64 (drawing; view data).", "V02 §3.7", ['V02'], ["the integer form's byte-identity", "the float form's view-only status"])
el('E-28', 'UNIFY', "PlanReport.warnings.code mixes W_ codes with lowerCamel names shrineOneRoom, solidMonument, stackCarried (V03-ELEG-1).",
   "Split notes from warnings: PlanReport.notes carries the three camelCase ids (the same ids V10's why causes read, CVR-V10-9); warnings.code holds W_ codes only.", "V03 §2.3", ['V03', 'V10'], ["same producer and readers", "the three conditions reported as notes, not lost"])
el('E-29', 'UNIFY', "basementDoor(b) and stackAccessDoor(b, a) share a geometric core (V03-ELEG-2).",
   "One helper stated once in V03 §3.7.1: candidate door runs at least two moduleCm long, a two-module span, the nearest-point slide, ties toward the first vertex; both functions call it and keep their own rules.", "V03 §3.7.1", ['V03', 'V01'],
   ["basementDoor's three ordered rules (wall walk-out, tomb door, fall walk-out), its crypt-vault clause from M6-U, null unless access is external", "stackAccessDoor's approach-strip clearance, the non-stair wing preference and its reported fallback", "both pure, draw-free, of eager records, in @plat/plots at M3a, read by V01's entrance reserve"])
el('E-30', 'UNIFY', "Cross-table reference cells {ref: {table, row, cell}} defined for village.json only (V07-ELEG-1).",
   "Lifted into §7.6 as one reference-cell form for every table, with its compile check (V11's compiler resolves it) and editTable inverse and undo row; V07 §2.2a cites it.", "§7.6 (determinism); V11 compiler", ['determinism', 'V11', 'V07'],
   ["the compile check (a reference to a missing row fails the build)", "editTable's inverse and undo row", "V07's existing references to V11 §3.6.1, §3.24.1, §3.24.4 expressed in the one form"])
el('E-31', 'UNIFY', "The toll-bridge watercourse rule written twice with different shapes (V08-ELEG-1): V08 §2.6b (3) at base rungs and V07 §3.1 (1), §3.11 DR1 at village rungs.",
   "One rule at V08 §2.6b (3) (the DR row's home) with a rung column; V07 cites it.", "V08 §2.6b (3)", ['V08', 'V07'],
   ["geometry by rung: base — the brook crosses the through route of the longest approach inside the frame; village — the course between the two frame arcs the through road's entries divide, the topology raised to through", "coastal dry site by rung: base — a brook; village — an estuary", "failure → toll_bridge_dry at every rung on any of: a desert with no oasis_water and no river the arid row draws (g item 111); relief that cannot carry the brook; a fixed isolated or none access word — the union of both volumes' failure conditions, each now defined at both rung ranges (principle (11))"])
el('E-32', 'UNIFY', "Two catalogue sentences for the clerk being unreachable (V10-ELEG-1).",
   "One row, refuse.clerk.offline; error.clerkOffline is retired (V9 §3.14 routes an unreachable clerk to refuse.clerk.offline; no producer emits the other).", "V10 §3.16 / V09 §4.9", ['V09', 'V10'], ["same condition, same user outcome"])
el('E-33', 'UNIFY', "ClerkHarness, a type alias of ClerkHandle with no member of its own (V10-ELEG-2).",
   "ClerkHandle everywhere; the alias is dropped.", "V10 §2.6", ['V10', 'V09'], ["createClerk(mount) returns ClerkHandle"])
el('E-34', 'UNIFY', "Each table's readers stated three times in V11 (W rows, §2.10's read cells, §3.1's registry) and item 110's lifecycle rows repeating one pattern (V11-ELEG-1).",
   "§3.1's readers are the single source; §1b and §2.10 cite the row number; item 110's tables share one lifecycle pattern row with per-table exceptions.", "V11 §3.1, §2.10", ['V11'],
   ["the union of every reader listed today (W19's V07 pump date added to row 50, V11-WGAP-1)", "each table's exceptions to the pattern"])
el('E-35', 'UNIFY', "V12's producers and consumers of each record stated in §1b and §2.11 (V12-ELEG-1).",
   "§2.11's lifecycle table with a consumers column is the one table; §1b cites it.", "V12 §2.11", ['V12'], ["every producer and consumer listed today"])
el('E-36', 'UNIFY', "Soft terms of the owner items (102 sunlight, 103 families and coverage, 105 supply links, 107 balance, 111 water pull) each restate the same contract clauses.",
   "One 'soft terms' contract at §4.5 (cited by §4.7 S10b): a soft term declares its weight cell (a §7.6 table value), its kernel, its no-op pin (weight 0 → byte-identical), its bar, and yields to dossier facts, assignments, pins and locks; the field's controlled chance applies. Each item states only its own kernel, weight and specific limits.", "§4.5 (pipeline)", ['pipeline'],
   ["item 102: at full all-day shade about a tenth of a band; never alone moves a plot across two bands; order (terrain and wall shade in pass 1, island shade in pass 2)", "item 103 (c): true physical needs (a watermill on water, a quay on the shore) stay hard", "item 103 (f): coverage decides where, never how many; the dossier's count is the truth", "item 105: every link pulls both ends", "item 107: spread and pull in balance with the distribution column", "item 111 (b): the water pull's weight rises with aridity; (c) the sunlight cell per climate row"])
el('E-37', 'UNIFY', "Unit vocabularies: the base §2.1 units, V11's ColumnSpec.unit and V12's metric Unit (V12-TERM-2, V11-RESTATE-1).",
   "One unit vocabulary in §2.1, the union of all three (m, m2, ha, cm, cdeg, deg, share, weight, people, count, yr, wk, m3, lvl, perHa, perKm, ratio, bits, ms, s, luma, rb, chroma, z, none); V11 and V12 type their fields by named subsets.", "§2.1 (model)", ['model', 'V11', 'V12'],
   ["deg (measured metric angles) and cdeg (model angles) both kept", "count and people both kept", "each volume's subset exactly its current list"])
el('E-38', 'UNIFY', "territory.haPerHead (2.3) stored beside the FarmTable village rows whose sum it restates (2.275) (V07-ELEG-2) — ruled as a conflict of two homes with two values.",
   "haPerHead is derived as the sum of the FarmTable village rows (2.275 ha per head); the stored 2.3 is retired; an editTable of a farm row moves A_T with it. A declared change of value (−1.1 % territory area), recorded here: a conflict resolution (principle (3) (b)), not an elegance-only change.", "V07 §3.9 (1)", ['V07', 'V11', 'V12'],
   ["the farm rows' values unchanged", "A_T = households × the per-head sum", "V12's register: the farm rows are the calibratable cells; haPerHead leaves the register"])
el('E-39', 'KEEP APART', "Closure and decline states across the set (access states, way decline ladder, wall stretch condition, building lifecycle).",
   None, "their homes as they stand; g item 113 (e)'s LOST state joins the access-state set (V04)", ['V04', 'V06', 'model'], [],
   "They share an 'existence ladder' idea but differ in scope (per link, per way, per stretch, per record), values and transitions and writers; only the stretch-state profiles are one mechanism (E-01).")
