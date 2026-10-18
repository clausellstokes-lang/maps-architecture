# verify-kernel-r0 — lane amendments-c/verify-kernel-r0 (verifier of the KERNEL part, §3, after assemble-r0)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-kernel-r0).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> ITEM 39: planned §3.5 NG row | done — PRESENT
> ITEM 45: planned §3.4 regularFit, §3.1 row | done — PRESENT
> ITEM 53: planned §3.1 Poisson / marching squares / path search rows | done — PRESENT
> ITEM 65: planned §3.4 / §3.10 arenas; §3.7 corridorUnion | done — PARTIAL (VKC-01, VKC-03, VKC-05, VKC-06, VKC-07)
> CHECKS: single-source, stale, cross-part, deferral, broken-reference, new-problem | done — 20 issues (§4)
> QUEUE ROW + LANDED: done

Lane `amendments-c/verify-kernel-r0`, 2026-09-28. Status: COMPLETE. Verified on the assembled design
`docs/ARCHITECTURE.md` sha256 `7f4c0e253438b41b…` (16 872 lines) and rationale `22f01184eac296c1…`; the before-text is
`docs/archive/ARCHITECTURE-pre-amendments-c-2026-09-27.md`. This lane edited no design file.

## 1 Outcome

All four items routed to the kernel have their mechanism in §3. Items 39, 45 and 53 are PRESENT. Item 65 is PARTIAL:
its arena-per-system rule is present, but it contradicts the link records the model and II.7.6 built on it (VKC-01), it
overclaims byte-identity when a system has links (VKC-03), and it reads a gallery's width from the wrong source (VKC-05).
The part has no deferral wording, no broken § or J pointer, and no reference identifier; `doc_checks --sections "3"`
exits 0 (C1 5/0, C2 0/0, C3 96/0, C4 0/0, S1 0/0, S2 0/0).

Twenty issues are open, four of them **major**:
* **VKC-01** (kernel) — an `UndergroundLink` holds a `link_end` vertex in each of two parts. §3.4 says no entity has
  geometry in two arenas, and §3.10's reference check would fail every link.
* **VKC-02** (kernel) — §4.11 and J-A81.41 point to "the kernel's statement" of frame growth in §3.2 (9), and that
  statement does not exist. The seat-T and seat-A notes to seat K were not folded.
* **VKC-03** (kernel) — "re-deriving one system leaves … every other part byte-identical" is false whenever that
  system has links.
* **VKC-08** (pipeline) — §4.11's "one L0 batch replaces the `margin` and `border` chains" breaks §3.3's rule of one
  level per transaction, because the border is an L1 chain.

The other sixteen are minor alignments; each has an exact change in §4.

## 2 Per item

| item | ruling routed here | verdict | where, quoted |
|---|---|---|---|
| 39 | §3.5 row: Fable's corrected wording, no console messages, build named | **PRESENT** | §3.5 retry row: "the NG 1.2.2 build's silent rotated-frame retries and its hole-aware bisector's two logged loops (a balance retry, up to 20 in random frames, then accepted; a restart when no far edge exists) (NG RA-3; P7)", answered by "its first rung re-plans in a turned frame a bounded number of times, and no rung restarts anything above the face". P7 is code-impact §(d)'s "retry in a frame turned 36°". The rung is stated once, at §4.6 step 8 (a); §5.2 F-CUT and §1.3 agree. |
| 45 | §3.4 read-only `regularFit` beside `obb` / `lir`, trigonometry by `dmath` (J-A45.31) | **PRESENT** | §3.4 service `regularFit(ring): KernelResult<RegularFit>` `{ n, centre, radiusCm, phaseCdeg, targets[], compactness }`, a superset of the route's `{ centre, radiusCm, phase, n }`. The paragraph "The regular fit": area centroid, a = (1 ÷ n) Σ (pₖ − c) e^(−2πik/n), tₖ = c + a e^(2πik/n). The least-squares derivation and the start-vertex independence (a′ = ω a, so t′ₖ = tₖ₊₁) were re-derived here and are correct. §3.1 has the build row and `E_DEGENERATE` detail `fit`. Readers: §4.8 (2), §5.2 F-CASTLE and §7.1 Equalize all name `regularFit` (§3.4). Fixture: §13.1. J-A45.31 has its index row and Part A entry. |
| 53 | §3.1 Poisson row points to §8.10's annulus; contour and path-search notes corrected; `createDeflection` removed | **PRESENT** | Poisson row: "each drawn in §8.10's candidate annulus (`poisson.annulus`) about its active point, on a torus — … MFCG build 12710731, VG build 1.6.9, NG build 1.2.2, Dwellings itch 17195045 (P14; … its "warp" is the tile's wrap-around)". The home §8.10 states [r₀, (1 + a) r₀] with a = 0.1 and Bridson's value as the alternative. The contour row carries the road-steering water field and the staircase coastlines, and says our penalty lives in §4.3 (checked: `waterCrossingPenalty`); d3-contour is adopted and the distance transform built, matching §17's licence table. Path search: "the 2017 "A\*" and MFCG 12710731's street search are both first-in-first-out searches with no heuristic — not reproduced; J-A53.31". The item's optional "§4.4 may use a distance field" was dropped, and J-A53.31 records why (no-defer). |
| 65 | §3.4 / §3.10: one arena part per system, J-A12.32 across parts, links as cross-arena records; §3.7 `corridorUnion` over galleries; no new operation | **PARTIAL** | §3.4's "The underground layer's several arenas" (J-A65.31), §3.7's "One cut for every underground part" (J-A65.32) and §3.10's arena-isolation row with its per-part twin (§13.2 T65-6) are present. Defects: VKC-01 (the link exception is missing, so the rule contradicts `UndergroundLink`), VKC-03 (byte-identity overclaimed where links exist), VKC-05 (the gallery kerb is read from the system row instead of the `Gallery` record the route names, and the `chamber_wall` role is unnamed), VKC-06 (§3.7 still says "the underground arena") and VKC-07 (the quarry example contradicts J-A65.47). |

**Checked and sound (no issue).**
* **Items 20 (h), 73–80, 82–88 and 101.** None of them needs kernel text. Item 101 (i)'s "escapable" snap is the surface's feature snap; §7.1 and §9.5 say the kernel's attraction is never escaped, as the kernel seat's note 10 asked.
* **Item 66's `dug` part.** The kernel seat's report note 7 (a closure's passage written in part 0) was never design text. §3.4 leaves part assignment to II.7.6, so E2's reconcile finding needs no kernel change.
* **Gate (c).** §3 holds none of the 32 reference identifiers of code-impact §(d) or the route's §C.5 list.
* **Gate (b).** Every new reference sentence in §3 names its build.
* **Route §C.6.** The §3.1 skeleton row's GPL clause is gone (J-A21.31).
* **Every other §3 subsection.** None is stale against the pass. §3.9 has one block per `PlatKey`; §6.2 has a per-arena `plats` node; §2.1 and §6.3 carry the `under<n>/` prefixes; §2.9 carries `nextUndergroundPart`.

## 3 The checks

* **SINGLE-SOURCE.** `regularFit`, the arena-part rule and the kerb are each stated once in §3; §4.8, §5.2, §7.1, §2.1,
  §2.2, §2.8, §6.3, §8.4 and II.7.6 reference them. §4.8's gloss "centred on the centroid" is a pointer with a looser
  word (VKC-15). The frame's growth has no kernel home, and §4.11 states a flawed version (VKC-02, VKC-08).
* **STALE.**
  * In the kernel part: §3.7's "the underground arena", twice (VKC-06).
  * Beside the part: §8.4's "inside the one underground arena" (VKC-18), and J-A12.45's row and entry "one underground
    arena", which J-A65.31 amends but which is unmarked (VKC-13).
  * None of the task's stale-rule list appears in §3.
* **CROSS-PART.** Notes addressed to the kernel:
  * Seat A note 6 (`W_CUT_SLID`): NOT folded (VKC-04).
  * Seat T note 7 and the kernel's own finding 9 (frame growth, J-A81.31): NOT folded (VKC-02).
  * Seat M note 5 and seat D note 2: reflected, but together they expose VKC-01.
  * Seat C note 2: nothing needed.
  * Seat E2 finding 4 (c): no design conflict (above).
* **DEFERRAL-WORDING.** None in §3. The word "later" appears only in the temporal sense.
* **BROKEN-REFERENCE.** None in §3: S2 is 0; all 45 J ids cited in §3 have an index row and a Part A entry; P7 and P14
  exist. Outside §3, "the kernel's statement is §3.2 (9)'s" (§4.11) and J-A81.41's "§3.2" cite text that does not exist
  (VKC-02). `W_CUT_SLID` is used at §4.6 and §5.2 but is not declared (VKC-04).
* **NEW-PROBLEM.**
  * VKC-01: the link's two-part geometry against the one-part rule.
  * VKC-03: the link-locality overclaim.
  * VKC-08: an L0 batch writing an L1 chain.
  * VKC-10: II.7.6's buried-town "succession" against §6.3 and one part per batch.
  * VKC-11: same-kind crossings inside one part.

## 4 Issues (owner part; exact required change)

Every quoted anchor was grepped on the assembled files and occurs once in the section named. Three anchors wrap across
a line break in the design, and a repairer matches them across the newline:
* VKC-01: "… so a / `FaceRef` …";
* VKC-05: "from the / half-width its system's row declares";
* VKC-07: "a quarry's lower working / under its upper one".

VKC-15's "of its centroid" also occurs in §5.2 and §13.2; only §4.8 (1)'s occurrence changes.

| id | owner | sev | kind | issue | required change |
|---|---|---|---|---|---|
| VKC-01 | kernel | major | conflict | §3.4 (J-A65.31) says "Every entity's faces, chains and vertices lie in the one part its `Identity.key` names … never one entity with geometry in two arenas". The design gives one link entity a vertex in each of two parts: §2.7's `UndergroundLink` (`a.at` = `('link_end', link id, 0)`, `b.at` = `('link_end', link id, 1)`), §2.2 rule 7's `link_end` ("one vertex per part in both of the parts it joins"), II.7.6 and §7.1 `addLink`. §3.10's "every stored reference resolves" row reads one arena's reverse index per entity, so every link fails it. | §3.4: replace "Every entity's faces, chains and vertices lie in the one part its `Identity.key` names (§2.8), so a `FaceRef`, `ChainRef` or `VertexRef` resolves in one arena;" with "Every entity's faces, chains and vertices lie in the one part its `Identity.key` names (§2.8), so a `FaceRef`, `ChainRef` or `VertexRef` resolves in one arena — with one exception, a link between two parts (II.7.6's `UndergroundLink`, §2.7), whose two `link_end` vertices lie one in each part it joins, each end naming its part (`{ part; at }`) so that `resolve` reads it with that part's key, and each placed or stripped by a transaction on that part alone;". §3.10, "every stored reference resolves" row: after "finds exactly one vertex or edge set per ordinal" insert "(a link's two `link_end` ordinals each in the part its end names, §3.4)". J-A65.31 index row: after "every entity's geometry in one part" add "(a link's two ends excepted, one vertex in each part)". Add the same clause to its Part A entry after "every entity's geometry lies in the one part its `Identity.key` names". |
| VKC-02 | kernel | major | conflict | §4.11 "The rung at an epoch" says "(§2.2 rule 1; the kernel's statement is §3.2 (9)'s)", and J-A81.41's row cites "§4.11, §3.2". §3.2 (9) sizes the frame once and says nothing on growth. The kernel's own finding 9 and seat T's note 7 asked for J-A81.31 here. | Append to §3.2 (9): "**Frame growth at an epoch (item 81 (b); J-A81.31).** A frame only grows, and only when an epoch's population target needs a larger one (§4.11): the new frame is the one this rule gives that target at the blueprint's `aspect`, centred on (0, 0), and `Plat.frame` takes it in the same edit. The range bound of (1) is taken at the population cap and the extreme aspect, so no grown coordinate leaves the lattice. The growth is two single-level transactions (§3.3): an L0 batch inserts the new outer ring as the `margin` chain, with S1's terrain and water faces on the ring between the two (§4.11), and strips the old ring's `margin` rows by `removeEdges` — an edge left with no role is deleted, joining the faces either side, and a stretch that also carries `shore` or `bank` keeps it; then an L1 batch inserts the new frame rectangle as the `border` chain and strips the old one's `border` rows alike. A vertex of an old chain that keeps another role — a through-road's end at the old margin — stays, an antenna end until §4.11 continues its way. Only faces whose rings ran along a deleted edge change, at each level that sees it; every face nested in them is kept and re-parented (§3.3), and every other face, edge and vertex is byte-identical." Add J-ROWS `\| J-A81.31 \| the frame grows at an epoch by an L0 margin batch and an L1 border batch and never shrinks; only faces along the old chains change \| §3.2 \|` and a Part A entry: chose two single-level batches over one batch writing both chains, because §3.3 allows one level per transaction and the border is an L1 chain (§2.2 rule 1). |
| VKC-03 | kernel | major | new-problem | §3.4 ends "a system's derivation opens transactions on its own part alone, so re-deriving one system leaves the ground and every other part byte-identical". A re-derived system's links (II.7.6's connection stage) have their far `link_end` vertices in other parts. A link whose element has no successor (§6.3's link anchor is "its two ends' element addresses") must have its far end stripped, which is a write to another part. The claim, §3.10's row and T65-6 are false for any system with a link. | §3.4: replace "so re-deriving one system leaves the ground and every other part byte-identical (§3.10's arena-isolation row)" with "so re-deriving one system leaves the ground and every other part byte-identical but for the `link_end` vertices of the links that end on it: the connection stage (II.7.6) re-derives those links, placing or stripping each far end by one transaction on that end's part — a link whose element has no successor is removed, its far `link_end` row stripped by `removeEdges` on its `VertexRef`, which dissolves the vertex and restores the edge it split exactly (§2.2 rule 3) (§3.10's arena-isolation row)". In J-A65.31's Part A entry, change "keeps a re-derivation of one system from touching another" to "keeps a re-derivation of one system from touching another beyond its links' far ends". Dependents: VKC-17, VKC-16 and VKC-19. |
| VKC-04 | kernel | minor | broken-reference | §4.6 step 8 (c) ("reported as `W_CUT_SLID` with its step count (J-Fredteam-1)") and §5.2's F-CUT row use a warning code that §3.1's `Warning` union lacks. Seat A's note 6 was not folded; assemble-r0 §9 confirmed it open. | §3.1: in `type Warning`, add `'W_CUT_SLID'` after `'W_DOWNGRADE'`. In the comment line under it, append "; W_CUT_SLID: §4.6 step 8 (c)'s slid always-succeeding cut, count = the slide's steps (J-Fredteam-1)". |
| VKC-05 | kernel | minor | conflict | Two problems in §3.7. (a) The kerb definition and "One cut for every underground part" read a gallery's half-width "from that system's row (II.7.6)" / "the half-width its system's row declares". The route (item 65, kernel) said "with the half-width from the gallery record"; §3.7's own rule is "the width the spine's linear entity declares"; II.7.6 makes a gallery's width a `setAttr` target; and §2.7's `Gallery` carries `widthCm` and `wallCm`. An edited gallery's kerb would therefore ignore its edit. (b) A chamber is said to carry "its system's structural outline role", but §2.2 rule 7 declares one role, `chamber_wall`. | §3.7 kerb definition: replace "and another system's gallery's, the same two terms from that system's row (II.7.6)" with "and another system's gallery's, `Gallery.widthCm ÷ 2 + Gallery.wallCm` (§2.7; their defaults from its system's row, II.7.6)". In "One cut for every underground part": replace "from the half-width its system's row declares" with "from the half-width its `Gallery` record declares (the kerb above)", and "carrying its system's structural outline role" with "carrying the structural `chamber_wall` role (§2.2 rule 7)". J-A65.32 index row: "from their system's row" → "from their `Gallery` records". Part A entry: "with the half-width their system's row declares" → "with the half-width their `Gallery` record declares". |
| VKC-06 | kernel | minor | stale | §3.7's J-A12.31 paragraph still speaks of one underground arena: "so they run on the underground arena on `tunnel` chains" and "(the underground arena's level mapping is §2.2 rule 1's;". The layer now has several arenas (§3.4, J-A65.31). | Replace "so they run on the underground arena on `tunnel` chains" with "so they run on the sewer network's part of the underground layer (part 0, §3.4) on `tunnel` chains". Replace "(the underground arena's level mapping is §2.2 rule 1's;" with "(that part's level mapping is §2.2 rule 1's;". |
| VKC-07 | kernel | minor | conflict | §3.4's example "a quarry's lower working under its upper one" of systems in separate parts contradicts II.7.6 / J-A65.47, "One system per kind". A quarry's two workings are one system and one part, so they meet wherever they cross in plan. | §3.4: replace "a quarry's lower working under its upper one" with "a quarry's workings beneath a catacomb's galleries". |
| VKC-08 | pipeline | major | new-problem | §4.11 "The rung at an epoch" has three problems. (a) "one L0 batch replaces the `margin` and `border` chains" breaks §3.3's one level per transaction: the border is an L1 chain (§2.2 rule 1; §4.1's S3 row). (b) "every face inside the old margin byte-identical" is false for the faces along the deleted old chains. (c) Nothing continues the through-roads that end at the old margin (§4.4 "Through-roads continue to the context margin"), and nothing grows the rasters. J-A81.41's row and Part A entry repeat "one L0 batch". | §4.11: replace "and one L0 batch replaces the `margin` and `border` chains (§2.2 rule 1; the kernel's statement is §3.2 (9)'s), every face inside the old margin byte-identical" with "and the kernel replaces the `margin` chain by an L0 batch and the `border` chain by an L1 batch (§3.2 (9); §3.3's one level per transaction), S4 continuing every through-road from its old end to the new margin and S12a siting the hinterland on the ring; each raster of §2.3 grows by whole cells about its old grid, every old cell unchanged; every face whose ring ran along neither old chain is byte-identical". J-A81.41 index row: "one L0 batch, the old arena byte-identical" → "an L0 margin batch and an L1 border batch (§3.2 (9)), every face off the two old chains byte-identical". Make the same change in its Part A entry. |
| VKC-09 | model | minor | conflict | §2.2 `Plat` declares `readonly frame: Frame /* §3.2 (9) */`, but §4.11 / §3.2 (9) now grow the frame at an epoch. | Replace `readonly frame: Frame /* §3.2 (9) */` with `frame: Frame /* §3.2 (9): set at creation; replaced only by §3.2 (9)'s frame growth at an epoch, which only grows it */`. |
| VKC-10 | pipeline | minor | new-problem | II.7.6's buried old town says "the region's ways, plots and buildings at the old grade end on the ground (their existence `cleared`) … their successors are the `buried` system's elements … each new record succeeding its predecessor by §6.3's succession". J-A65.46 says the same. §6.3's successor takes the old address, and its batch re-owns the successor's faces under it (§3.4 `setOwner`), but an address names its part (§6.3 `under<n>/`) and a batch writes one part (§3.4). A `cleared` record also survives with its address (§6.3). So the old records would both keep and hand over their addresses. | II.7.6: replace "each new record succeeding its predecessor by §6.3's succession" with "each new record a fresh entity of the `buried` part, minted from the conversion event's `seq` and ordinal as a mutation's added parts are (§6.3), the cleared records keeping their addresses on the ground — an address names its part and no batch writes two (§3.4)". J-A65.46 index row: "their successors become" → "fresh records of the `buried` part become". Make the same change in Part A, and replace its "by §6.3's succession … because succession keeps each old place's history addressable" with "… because the cleared records keep each old place's history addressable". |
| VKC-11 | pipeline | minor | new-problem | II.7.6 says "One system per kind: … what passes over or under without meeting belongs to another kind and so to another part". Inside a part every plan crossing is a junction (§3.4). Nothing stops same-kind elements crossing at different depths: dug connectors of different buildings all lie in the one `dug` part, and a drawn gallery can go into a system at another depth band. They would be joined where they only pass. | II.7.6: after "and so to another part." add "Inside one part every plan crossing is a junction (§3.4), so no rule lays an element across another of its part without meeting it: a catacomb or quarry laid beside a complex of its kind joins it at a common depth band; a dug connector's path search gives every other building's dug passage the infinite cost it gives a foundation (within `foundationClearM`); and a drawn gallery or chamber that would cross one of its system's at another depth band is refused by its dry run, naming the crossing (F-EDIT, §5.2)." Add the same clause to J-A65.47's Part A entry. |
| VKC-12 | model | minor | conflict | §2.8 `Identity.key`'s comment ("one per entity: every entity's geometry lies in one part …") lacks the link exception that VKC-01 states, and does not say which part keys a link's address. | Replace "one per entity: every entity's geometry lies in one part, and a record that joins parts names the other part's records by id (§3.4; J-A65.31)" with "one per entity: every entity's geometry lies in one part — save an `UndergroundLink`, whose two `link_end` vertices lie one in each part its ends name (§3.4), its own key the part of its end `a` — and a record that joins parts names the other part's records by id (§3.4; J-A65.31)". |
| VKC-13 | pipeline | minor | stale | J-A12.45's index row reads "one underground arena; depth per entity …". Its Part A entry reads "Chose one underground arena … §2.2's arena-per-layer rule already gives the underground exactly one `PlatKey`". J-A65.31 amends both, but neither says so. | Append " (amended for systems by J-A65.31: one part per system, depth per entity inside a part)" to J-A12.45's index-row choice cell and to the end of its Part A entry. |
| VKC-14 | pipeline | minor | conflict | The rekey sentence in §4.11 "A cut way's far part" (J-Fpipe-2) misstates §3.4: "the rekey moves the edges' role rows and knot rows and nothing else (§3.4)". §3.4's `rekey` also moves vertex roles. | Replace "the rekey moves the edges' role rows and knot rows and nothing else (§3.4)" with "the rekey moves the far part's role rows, knot rows and vertex role rows and no record (§3.4)". |
| VKC-15 | pipeline | minor | conflict | §4.8 Compactness measures and centres on "its centroid" / "centred on the centroid". §3.4's `regularFit` centre is the ring's **area** centroid, and J-A45.31's Part A says "§4.8's thinness test measures from that same point". | §4.8 (1): replace "within `castle.minInnerM` of its centroid" with "within `castle.minInnerM` of its area centroid (`regularFit`'s `centre`, §3.4)", and "moves radially away from the centroid" with "moves radially away from that centre". §4.8 (2): replace "centred on the centroid" with "centred on the area centroid". |
| VKC-16 | pipeline | minor | new-problem | II.7.5 "Order, seed and locality" ends "it writes only its void's part, so a New random of an undercity neighbourhood leaves the ground and every other part byte-identical". The undercity's lifelines are links with far ends in other parts, so this is VKC-03's overclaim. | Append to that sentence: "but for the far `link_end` vertices of its links, which the connection stage re-derives by one transaction on each such part (§3.4)". |
| VKC-17 | determinism | minor | new-problem | §7.3's locality row for the staged layers says "each underground system's edit and reroll writes only its own part (§3.4, item 65)", and its out-of-scope column says "every other arena and part". This is VKC-03's overclaim. | After "writes only its own part (§3.4, item 65)" insert "and the far `link_end` vertices of the links that end on it (§3.4)". |
| VKC-18 | rendering | minor | conflict | §8.4 has two errors. (a) Its item-65 paragraph lists "the undercity" among the systems "in its own part", but II.7.5 says an undercity lives "never in a part of its own" (in its void's part), and the list omits the buried old town. (b) The toggle paragraph keeps "`z` ordering the bands inside the one underground arena (§2.1)". | (a) Replace "each other system — catacombs, caverns, quarries, vaults, the undercity, dug passages — in its own part" with "each other system — catacombs, caverns, quarries and mine voids, vaults, a buried old town, dug passages — in its own part, the undercity in the part of its void (II.7.5)". (b) Replace "inside the one underground arena (§2.1)" with "across the underground layer's parts (§2.1, §3.4)". |
| VKC-19 | scope | minor | new-problem | §13.2 T65-6 reads "re-deriving one underground system leaves the ground and every other part byte-identical". It fails on any seed where the system has a link (VKC-03). | After "every other part byte-identical" insert "but for the far `link_end` vertices of its links, each either unchanged or stripped with its edge restored exactly (§3.4)". |
| VKC-20 | scope | minor | conflict | §13.2 T81-1 reads "every entity inside the old frame keeping its address and geometry". Faces whose rings ran along the deleted old margin or border change when the frame grows (VKC-02). | Replace "every entity inside the old frame keeping its address and geometry" with "every entity keeping its address, and every face whose ring ran along neither the old margin nor the old border keeping its geometry (§3.2 (9))". |

## 5 Held parts (gate (a)) — so nothing is lost

No item routed to the kernel has a HOLD — PLAUSIBLE part. Items 39, 45 and 53 are CONFIRMED by Fable's evidence gate, and
item 65 is an owner rule.

Fable's evidence gate ruled three of the file's held parts, and they are applied as released:
* 37's metre reading: released with its label (§4.6).
* 58 (f): released with its label (II.2).
* 59's timing: released as a restatement measurement (§12.7).

It rejected 49's deletion: the 49 % stays, cited to F4.

These remain held and unwritten (route §C.4; assemble-r0 §9), and none touches §3:
* **52**: the references' visibly different session-reached maps;
* **35 (support)**: the position check on 160 of 162 faces;
* **68 (g)**: "MFCG draws no cast shadows", which appears only as our preset's behaviour;
* **68 (support)**: VG 1.6.9's shadow and night layers, and Dwellings' shading gradients.

## 6 Receipts

* §3 re-read whole: doc lines 2436–3613. Word diff against the archive: `scratchpad/vk/s3.wdiff`. Every changed run is one of K's seven blocks.
* §3 citations of the pass's new text: all 60 runs in the whole-document word diff were read and checked against their targets (`scratchpad/vk/added-s3.txt`).
* Every changed section the issues rest on was read whole: II.7.5, II.7.6, §4.8 Compactness, §4.11's epoch paragraph, §8.4's underground paragraphs, §2.2 rule 1, §2.7's underground records, §2.8 `Identity`, §6.3 carry-over, §7.3 item 9 and its locality row, and §13.1–§13.2's T65 and T81 bars.
* `python3 docs/validation/bench/doc_checks.py --sections "3" --allow docs/validation/doc-checks-allow.tsv`: exit 0, with C1 5/0, C2 0/0, C3 96/0, C4 0/0, S1 0/0 and S2 0/0 (on the corpus of 9 626 JSON files).

CONFIRMED versus PLAUSIBLE. Every quoted text, every PRESENT, PARTIAL and MISSING verdict, and every claim that a
statement contradicts another are CONFIRMED by reading the assembled document. The `regularFit` mathematics is CONFIRMED
by derivation. The exact wording of each required change, and the design choices it implies, are this verifier's
proposals: PLAUSIBLE and vetoable. That covers VKC-02's two-batch growth, VKC-03's link-locality rule, VKC-11's
same-kind rule and VKC-12's link key.
