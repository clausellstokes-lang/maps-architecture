### 3.18 Edges — every mechanism at its limits (principle (11))

Every mechanism of V01 §2–§5 has a defined outcome at the limits of its inputs, a rung on §5's failure ladder (check,
repair locally, retry that piece, simpler shape, substitute, leave out and report — never a whole-map retry) and a test.
Four rules cover whole edge classes; the tables give every other case, each row naming its home section.

**(a) Degenerate geometry.** Every step of this volume that commits geometry — S8's seeds and plazas, the unit run's
outline and partition, an island's spans — commits through kernel transactions: a degenerate result (zero-length,
zero-area, self-touching, collinear, coincident) is refused by the kernel (§3.1's `E_DEGENERATE` family; §5.1's general
rule) and taken by the step's failure class on its ladder (F-TEMPLATE, F-UNIT; V01 §3.13). Steps that write attributes
only (S7c, S9b, the local-place step, the surface rule) meet degenerate geometry only as input: a zero-area face or block
is no template face (V01 §3.3.2), no candidate (V01 §3.5.1), no pin site (V01 §3.8.2) and no place host (V01 §3.7.1).
The view's derivations (hood pins, symbols, programs, labels, the frame, exports) skip a degenerate mark — a zero-area
facet, site, hull or label box draws nothing — and never fail a tile. Tests: T-V1-9, T-V1-56.

**(b) Rungs.** Stage 2 is the base product's:

| rung | stage 2 |
|---|---|
| THORP, HAMLET, VILLAGE (the village product) | no S7c, no S9b, no refine or outline close-up, no hood pins or places: the village product registers neither hook and has no stage-2 close-up (V07 J-V7.24); the `hatched` family draws the village's own records at its four bands by V01 §5.1.1's rows with no stage-2 marks; a village that grows into the town ladder takes its fabrics and block contents from the first S7b and S10a the base product runs on it |
| TOWN | stage 2 whole, except: no raised way generated (item 290's rung gate; a way an epoch carried down from CITY is read as any committed raised part), no quarry-ossuary catacomb entrance (CITY and METROPOLIS only, V01 §3.7.1), no islands (volume 5's gate) and so no sky unit run |
| CITY | stage 2 whole: generated raised ways, quarry-ossuary entrances, islands |
| METROPOLIS, to its population cap | stage 2 whole; the Cemetery network's extramural grounds first among the outline close-up's named sites (V01 §3.8.9); the METROPOLIS budget lines (V01 §6); at the cap the district count is S6's, and no stage-2 quota binds beyond its own rows |
| a standalone neighbourhood document | its `contextRung` (TOWN, CITY or METROPOLIS) selects the rung-scaled rows it reads; its layers are V01 §3.10.1 (7)'s |

Test: T-V1-57.

**(c) Toggles and presets.**

| toggle or preset | stage 2 |
|---|---|
| `MFCG`, `FTG` | `fabric.extensionWeight` 0: every district `bent-cut`, every block `ordinary`, no place, no hood pin, `λ_b` 0; the M4 goldens byte-identical (T-V1-4); a declared fabric, content or place is held and laid (the switch gates what stage 2 derives, never what the author declared, V01 §3.15) |
| `NG` | V01 §3.15's rules (T-V1-4, T-V1-31, T-V1-32) |
| `VG` | the village product's; stage 2 is not registered at its rungs ((b)) |
| `FM` | stage 3's building-scope preset; stage 2 reads it as the default preset |
| the stage-2 switch set to 0 by an edit | V01 §3.15's switch edit |
| the islands off | no sky unit run, no strip or `shadeSky` read, `shade.islandShare` absent |
| the underground off | no opening pass, place, access symbol or `under[]` entry; no void part in a standalone neighbourhood document |
| item 110's rows off | nothing of V01 §3.17 acts; byte-identical to the build without them (T-V1-4's no-op pin) |
| the `pins` and `trees` layers; the style's `details` and `shadows` | view only (V01 §5.1.2, V01 §5.1.3) |
| GeoJSON `closeup: true` | hood pins exported as presentation features (V01 §5.3) |

Tests: T-V1-4, T-V1-56 (c).

**(d) Save, load, undo, redo, regenerate, migrate.** Every stored field's six cells are V01 §2.7's and every event's
V01 §4.4's; every derived view (the list after V01 §2.7's table) is recomputed on load, undo, redo and regenerate and
never stored, so none goes stale in a save; the close-up chunk is non-canonical and dropped on mismatch (V01 §3.8.3).
Tests: T-V1-19, T-V1-34, T-V1-55.

**(e) Per mechanism** — no input (E1), one item (E2), the maximum and its caps (E3), missing, empty or contradictory data
(E5), and the degenerate cases with an outcome of their own (E4):

| mechanism (home) | edge | outcome | rung | test |
|---|---|---|---|---|
| identifiers and tables (V01 §2.1, V01 §2.2) | a `fabric` row id no table holds (a later version's, or a row an `editTable` removed); a `fallback` naming an absent row; a band with no row | the district reads `bent-cut`, reported (§7.5's table-row migration); V11's compiler refuses such a table (its reference check), so none loads; the band interpolates (item 27) | substitute; check | T-V1-55, T-V1-56 |
| `DistrictContext` (V01 §2.3) | no portal, water, wall, chain, record or landmark; no island shade basis; `under` before the tail | each list empty or each value 0; `islandShare` absent; `under` is read only after the tail | check | T-V1-35, T-V1-56 |
| request, result, report (V01 §2.4) | a regenerate or undo after a run | the report is recomputed with every run and written to the generation report, never stored | — | T-V1-55 |
| stage graph (V01 §3.1) | a town of one district; a town with no district S7c lays | S7c and S9b run once; nothing written | — | T-V1-56 |
| χ̃ (V01 §3.2) | an allocation with no instance; more rows than §6's 100; a town with no arterial frontage; a row whose class the roster no longer holds | zero plot mix, no anchors, identity `plain`; computed over every row, §6's fallback taken; trade 0 in every district (a largest sum of 0 gives 0, never a division); resolved by §7.5's table-row migration before S7b allocates it | check | T-V1-2, T-V1-56 |
| S7c (V01 §3.3.1–§3.3.3) | no district to lay; one eligible row; every non-`bent-cut` weight 0; `slope.meanPct` 0; an absent kind factor | nothing written; that row or `bent-cut` by the draw; `bent-cut`; the `stepped` factor 0; κ = 1 | substitute | T-V1-4, T-V1-6, T-V1-56 |
| the standalone `auto` (V01 §3.3.5) | a degenerate outline | F-UNIT repairs it before S7c; `bent-cut` is always eligible | repair locally | T-V1-20 |
| the epoch participant (V01 §3.3.6) | no new face, due block or scope; one new district; a zero-area new face; an absent `scope.recut` or `scope.raised` | nothing written; S7c once; volume 6's growth decision types no zero-area face, so S7c never sees one; read as empty | check | T-V1-39, T-V1-56 |
| template land and the reconcile (V01 §3.3.7) | a face too small for any seed; a capacity the subtraction takes below 0; households no district can hold | `templateLandM2` 0; capacity 0, the households moved; S7b's unplaced tail, reported by F-SITING (§5.2) and counted by T-V1-12 | leave out and report | T-V1-12 |
| the template face (V01 §3.4.1) | one qualifying face; every face a hole, strip or zero-area piece; a face in no district | it is the template face; no template face, F-TEMPLATE's chain ends at `bent-cut`; never a template face | substitute | T-V1-9 |
| portals and anchors (V01 §3.4.2) | no usable portal; one usable portal; an unreachable landing attach or deck end | the spine's anchors are the `axis` ends; a spine needing two anchors takes the `axis` ends; F-TEMPLATE's last rung lays a lane to it | simpler shape | T-V1-8, T-V1-21 |
| spine, series, ring, plaza, fan (V01 §3.4.3–§3.4.6) | a chord below `2 × eHi`; flat ground under a series; `R ≤ eLo`; `landmark.maxRings` reached; 0 inhabitants; no void junction; fewer portals than a fan's minimum | no spine, the row bends; level 0 alone; no ring, the row bends; the precinct series ends, reported; the plaza at `minM2`; no void square, reported; every portal there is, or none | substitute; leave out and report | T-V1-7, T-V1-8, T-V1-9, T-V1-38, T-V1-56 |
| the rows (V01 §3.4.7) | a table holding only `bent-cut`; a seeded row whose seeds all lay nothing | every district `bent-cut`; the bent cut on the whole face, reported as rung 4 | substitute | T-V1-56 |
| unit runs (V01 §3.4.8, V01 §3.10) | a unit of one district; a degenerate outline | the partition makes one district; F-UNIT (V01 §3.13) | repair locally; substitute | T-V1-20, T-V1-21 |
| S9b and its quotas (V01 §3.5.1–§3.5.2) | no candidate block; 0 inhabitants; one candidate; quotas above what the candidates hold; a band or kind factor missing | none typed; every quota 0, phase 2 only; it alone is weighed; the unmet remainder rolls and is reported (F-DISPATCH); interpolated (item 27), a missing kind factor 1 | leave out and report | T-V1-11, T-V1-56 |
| squares, greens, manors, phase 2 (V01 §3.5.3–§3.5.6) | no candidate for a type; one; an empty fit band or no compound class; every remaining manor weight 0; no small block | its quota rolls to the next type, the last remainder reported; it is taken if it fits; M 0; the draw stops, the unmet manors reported; phase 2 types none | leave out and report | T-V1-10, T-V1-11 |
| the seam guard (V01 §3.5.8) | no soft seam; no district across | the guard does not apply | — | T-V1-13 |
| downstream (V01 §3.5.10) | a district with no typed block; a typed block whose residue face is zero-area | every block takes the base path; the block stays `ordinary`, reported | leave out and report | T-V1-56 |
| fixed inputs (V01 §3.5.12) | none; one; a dossier change removing the record behind one | nothing held; it is held; released at the next re-derivation of its block, a user's lock or pin on it reported orphaned | — | T-V1-18, T-V1-47 |
| context features (V01 §3.6) | no context run; a run shorter than `feature.runM`; a closure-only arc | none, nothing reported; the feature not applied there; typed by II.1's seam typing | — | T-V1-22 |
| places (V01 §3.7.1) | no square, green, yard or large court; the underground off; a court below `court.nameMinM2`; a host removed; a dossier-owned name | no place; no opening pass; no place; tombstoned, its name archived; the dossier's name kept | — | T-V1-24, T-V1-46 |
| the naming context (V01 §3.7.2) | a way with no feature | a proper name | — | T-V1-24 |
| surfaces (V01 §3.7.3) | a way with no fronting block; an era with no row | the row at the pass-2 value at its midpoint; the rows without `era` | — | T-V1-25 |
| the trigger and frame (V01 §3.8.1, V01 §3.8.7) | a click on no district (water, off the map); a district with no footprint | nothing opened; the frame is its boundary | — | T-V1-15, T-V1-23 |
| hood pins and the cache (V01 §3.8.2, V01 §3.8.3) | no site; `pin.cap` reached; one pin; a digest mismatch | no pin and an empty chunk; each site's probability capped; one; the chunk dropped and re-derived | — | T-V1-15, T-V1-26, T-V1-31 |
| staleness, overrides, persistence (V01 §3.8.4–§3.8.6) | a document with no `closeups` block; an undo, redo or load | default params; the chunk stale by its digest | — | T-V1-19, T-V1-55 |
| access symbols (V01 §3.8.8) | an access with no stored state | the derived reading, else `open` | — | T-V1-46 |
| the outline close-up (V01 §3.8.9) | an outline over nothing; over one district; a degenerate outline | nothing, one line; that district's close-up; nothing, one line | — | T-V1-15, T-V1-56 |
| the replace close-up (V01 §3.9) | the district's own card; a card not eligible on the committed face | the refine close-up, no edit; its fallback chain, named | substitute | T-V1-18 |
| the standalone neighbourhood document (V01 §3.10.1–§3.10.2) | an edge whose bearing no run faces; a hillside outside the range; a drawn outline F-OUTLINE cannot repair | the nearest run, named; clamped, named; the kind row's `auto` outline, named | repair locally; substitute | T-V1-20 |
| the sky unit run (V01 §3.10.3) | an island without a district's worth of land; a rim strip of zero length | no district, the allocation to F-SKY-UNIT, reported; no rim-walk pair | leave out and report | T-V1-21 |
| seams (V01 §3.11) | a district with no way | every portal `unconnected`, reported | check | T-V1-14 |
| services (V01 §3.16) | an element under no district; a region with no built block or part-0 way; `plotLandM2` 0; a plot with nothing within `per` | the empty list; `null` measures; 1; every plot it reaches, and itself | — | T-V1-42, T-V1-46 |
| terraces and walls (V01 §3.17.1–§3.17.2) | no wall; a declared wall degenerate after its snap; a wall with no step | nothing held; bent by §7.1's dry run before it commits (item 245), never reaching stage 2; step 0, no shadow, no VTT line (§11.1's threshold), the why "no step" | repair locally | T-V1-50, T-V1-56 |
| raised ways (V01 §3.17.3–§3.17.5) | no raised part; a strip over a whole template face; a part wholly on hinterland faces | nothing read; D has no template face; nothing read (its spans open by J-C4) | — | T-V1-51, T-V1-52 |
| deck plots (V01 §3.17.6) | a deck whose owner rule meets no district (`Bridge.deck[0]` in the hinterland) | the hinterland pseudo-district's allocation | — | T-V1-53 |
| editing (V01 §4.1–§4.4) | an edit on a target a dossier change removed; an edit under a parity preset | orphaned, reported (§7.4); a declared value held and laid ((c)) | — | T-V1-34, T-V1-40 |
| why providers (V01 §4.5) | a subject no provider covers | volume 10's provider for its kind | — | T-V1-37 |
| rendering and labels (V01 §5.1, V01 §5.2) | an empty tile; a single wing; a sheet lacking a stage-2 program; a district with no name yet; a label fitting no candidate | the base marks only; its facets hatched; the base program (V01 §5.1.6); the identity label alone; dropped by §9.4's floors | — | T-V1-26, T-V1-28 |
| exports (V01 §5.3) | a scope with no stage-2 content; a close-up never opened | the base's content only; derived for the export, never stored | — | T-V1-33 |

**(f) Where this volume's features meet another unit's at their limits** (at TOWN, CITY and METROPOLIS unless a row says
otherwise):

| combination | outcome | test |
|---|---|---|
| a cliff and a district (a hard `cliff` run, item 106) | the run is portal-free; the district's plots back onto its setback line (the rear-plot rule), no wall street, no template face across it (V01 §3.6 (7)) | T-V1-45 |
| a cliff and a terraced ward | no ward-edge wall on the cliff run (item 302: none on a hard run); the levelled plots back onto its setback line | T-V1-50 (a) |
| steep ground and a terraced ward | levels closer than `terrace.minGapShare × s` clipped, the series stopped at `terrace.maxLevels` (reported), level 0 unlaid → F-TEMPLATE to `bent-cut`; the walls the base's | T-V1-50 |
| a coast and a district | the shore run is `water`: the bank path, the rear-plot water rule or a quay (V01 §3.6 (1)); the water face never a template face | T-V1-22 |
| a coast and a terraced ward | no ward-edge wall on the shore run (hard); the contour streets end at the shore setback; the waterfront feature as above | T-V1-22, T-V1-50 |
| a moat and a district | the moat is the enceinte's reservation, outside every district: the district reads its `wall` run (wall-side, V01 §3.6 (2)), never a `water` run; a gate's moat bridge ends outside the wall strip, so the district reads the gate portal, and a bridge portal only where a landward end lies on its template face | T-V1-22 |
| a moat and a terraced ward | no ward-edge wall on the `wall` run (hard) | T-V1-50 (a) |
| a bridge and a terraced ward | the bridge's end is a part-0 junction ranked as a bridge portal; a lane crossing the ward-edge wall there takes a stair or ramp interval, never a gap; its deck plots belong to the intramural end (V01 §3.17.6) | T-V1-50 (e), T-V1-53 |
| a raised way and a district's close-up | V01 §3.17.3: the strip a hole, crossings only through qualifying `open` spans, no pin under a deck, no junction with a part-0 way | T-V1-51 |
| an oasis and a district (item 111) | its spring pool is water for every rule that reads water (item 111): a `lake` body for the waterfront feature and the rows' `waterShare`; its grove and irrigated gardens are land-use and greenery faces, never built land — no template face, no S9b candidate; item 111's well weighting is S10b's model pins, which the close-up counts as prior picks (V01 §3.8.2 step 2) | T-V1-58 |
| an oasis and a terraced ward | no ward-edge wall on the pool's shore run (hard); the contour streets end at its setback | T-V1-58 |
| the map frame and a district (a `frame` run) | hard and portal-free; the margin band lies along it, so no plot fronts the frame (in a standalone neighbourhood document the outline itself, V01 §3.10.1 step 6) | T-V1-20 |
| the map frame and a terraced ward | no ward-edge wall on a `frame` run (item 302); the levelling stops at the margin band | T-V1-58 |
| a terraced ward and a lock | a locked or pinned plot is a fixed input: its face a hole the series avoids (V01 §3.4.1, V01 §3.4.3), its plot and site kept by every re-derivation (§7.2); the walls round it are the base's levelling's | T-V1-18 |
| a terraced ward and save and load | `District.terrace` and the walls persist in their leaves; `terraceState` and `stepProfile` are recomputed on load; a load re-derives nothing (byte-identical) | T-V1-55 |

