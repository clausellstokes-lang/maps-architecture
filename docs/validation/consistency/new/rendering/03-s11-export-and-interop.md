## §11 Export and interop

*In plain words.* One saved file holds everything (the recipe, the edits, the town); every other format — SVG with
layers, PNG at print size, GeoJSON for GIS tools, virtual-tabletop scenes with walls and doors, 3-D models — is a view of
that file. The generator runs without a screen (for tests and batch work) and can be embedded in another web page: the
page keeps the town in a background worker and receives finished pictures, so it never stalls. When several people share
one town — a game master and players — the host program keeps the one true copy and each generator only proposes changes
to it, so everyone sees the same town. Nothing depends on a server of ours.

### 11.1 Formats

| target | mapping | notes |
|---|---|---|
| **native `.plat`** | §2.9's format and canonical form; its byte-identical round trip is tested in §13.2 | import of our own export (MFCG cannot re-import its export; FTG's export ≠ its edit format) |
| **JSON schema** | published, versioned (generated from the `zod` types); entities by id with containment | the API's response type |
| **compact twin** | CBOR with typed-array tags; varint zig-zag int32 cm in **world** coordinates, the settlement centre stored in the header, so it is an encoding of the same schema (FTG-21) | embeds and sharing; a decoder is part of the library |
| **GeoJSON** (RFC 7946) | two declared variants (N-14, below): the default **strict RFC 7946** file in WGS84 longitude / latitude through the geo anchor, and the **metric** file by prior arrangement; neither has a `crs` member. One FeatureCollection per layer; one feature per entity with `id` (its address, §6.3), `kind`, `layer`, `epoch` and public attributes; **districts included** (FTG omits them); ways as LineStrings with class and model width; faces as Polygons with holes, emitted without antennae (§3.6 (6)); MultiPolygons for face unions; walls, towers, gates and built bridges as typed features (a crossing `site` is not exported, §2.7); boundary treatments as LineStrings with `treatment` (VIS-8); **trees** per green entity as one MultiPoint of its instance positions (§8.10's function at the finest band, overrides applied: integer-centimetre positions under §6.5's lint, so the file is byte-identical on every host) with `species[]` (each instance's species kind), `crownM[]` and `leafType[]` in the same order, or one Feature per tree on request with `species`, `crownM` and `leafType`, or none (VN-158, XB32); model widths only, never symbol widths | the default file validated by an open RFC 7946 validator in CI and loaded by the scripted QGIS test (O11 d); the metric file checked for geometry validity and its sidecar against its schema |
| **SVG** | written from a transient display list the generation worker builds for the export (below) at a declared band — the city band by default; the district band on request, after a size estimate is shown; the neighbourhood band only for a district-sized or smaller scope; `<g id="layer.ground"><g id="sem.building.footprint">` groups per layer and semantic; inside a group one compound `<path>` per (semantic, district), and a `<metadata>` JSON map from subpath index ranges to entity ids, so every entity stays addressable without an element each; trees as one compound path per green entity (crowns at the district band, the wood outline at the city band); text (N-13; the export dialog's `text` option) by default as **outlines** — each glyph used written once in `<defs>` as a path from the bundled face's own `glyf` outlines (the face the labels were measured with, §9.2; quadratic segments as SVG `Q`), each placed glyph a `<use>` at the per-glyph position S13b computed, the label's text carried in an `aria-label` and a `<title>` so it stays searchable — or, with `text: 'embedded'`, as editable `<text>` (curved labels per glyph, straight labels as one `<text>` with explicit per-glyph x positions) in the bundled face embedded unmodified as an `@font-face` data URI (OFL permits embedding; no subsetting, §17.2) (J-R32); halos by paint-order in both; hatching as compound paths; symbol widths; the colour-matrix post operations as filters (§8.2) | size and element budgets: §12.7; CI opens the METROPOLIS file in Inkscape headless (export to PNG within 120 s) and checks every layer id (O11 h) (SCL-14, VIS-18); the outline file's Inkscape PNG and the embedded file's Chromium PNG each match PLAT's own PNG of the same frame within the visual-regression threshold (§13.4) |
| **PNG / tiles** | §8.8's band-streamed tile assembly at any DPI, rastered in the tile worker from the export's transient list (below); transparent background; per-layer transparent PNGs (the largest MFCG ask); print presets A4…A2 at 300 dpi | O12 (e): A2 at 300 dpi with no canvas larger than one tile band |
| **VTT** | Foundry-class scene JSON and **Universal VTT (`.dd2vtt`)** by the profile below, one scene set per model layer (underground / ground / sky) with its elevation; model widths only | grid alignment error 0 px per cell (O11 g); no manual steps on import |
| **3-D** | glTF 2.0 binary (D-8): **ground as one planar partition** — the plat's leaf faces at the finest committed level, each boundary read once from the arena (§3.9) and each face exported once (no coplanar overlap), clipped to the terrain cells and draped (vertex z by bilinear terrain sample), material by role; **rivers as sloped surfaces** — the water level at each vertex is that of the nearest course station, falling monotonically downstream along S1's carved course; lakes, ponds and sea as level planes (GEO-40); buildings extruded from `baseCm` (FTG-13) to eave height with roof meshes to ridge height, per wing — each wing's `ring` (§2.6), its roof by the wing's kind as in §8.6 — each wing's foundation skirt extruded down to the terrain (§2.6); walls, towers and gatehouses as prisms on their bases; bridge and pier decks at `deckCm`; trees as instanced crown meshes (`EXT_mesh_gpu_instancing`, positions from §8.10), one instancing node per (green entity, crown class) whose `extras` carry the entity's address and, per instance in instance order, `species`, `crownM` and `leafType` (XB32). OBJ as a flat secondary (one mesh per entity, unlike MFCG's merged OBJ) | shadows, glTF and CityJSON agree by construction (heights are model data, §2.6) |
| **CityJSON 2.0** | `transform { scale: [0.01, 0.01, 0.01], translate }` so every vertex is our integer centimetre (lossless); `Building` (LoD1.2 solid from base to eave; LoD2.2 roof surfaces), `WaterBody`, `Road` (lines with class and width, sampled from the way's width profile, §2.2 rule 5), `PlantCover` (greenery faces), `SolitaryVegetationObject` (trees from §8.10, one per instance: a `GeometryInstance` of the crown class's template, with `species`, `crownDiameter` and `height`; XB32), `LandUse`, `OtherConstruction` (walls, towers, gatehouses), `Bridge`, `TINRelief` (terrain); no `referenceSystem` (a local metric CRS); a geo anchor, when the export has one, is recorded in the root property `+platGeoAnchor { latDeg, lonDeg, bearingDeg }`, defined by PLAT's own CityJSON Extension and listed in the file's `extensions` member (below; DEF-5) | validated against the CityJSON 2.0 schema in CI — the anchor-less file as it is, the anchored file with PLAT's extension schema given to the validator from the repository |
| **CSV / statistics** | the statistics record per generation with provenance (O6 d); people, buildings, plots | the corpus-calibration input |
| **permalinks** | §6.4's format and refusal rule; `&doc=` references resolve through §11.5's `DocResolver` | — |

**Rotation.** Picture exports (SVG, PNG, VTT) use the view's rotation (§9.5); GeoJSON keeps model coordinates and records
the rotation.

**The two GeoJSON variants (N-14).** RFC 7946 fixes WGS84 longitude and latitude and removed the `crs` member, so the
default export writes exactly that. A **geo anchor** `{ latDeg, lonDeg, bearingDeg }` places the settlement centre and
turns model north by the bearing; it is an export option, remembered per document in the view key `exportAnchor`
(§11.3), and defaults to (0°, 0°, 0°) — the conventional "no real location" point, so a default export is never mistaken
for a real place. Each model vertex (x, y) in metres, rotated by the bearing, is taken as a transverse Mercator easting
and northing — scale 1 on the central meridian through the anchor, false origin at the anchor — and inverted to WGS84
latitude and longitude with Krüger's published series to fourth order in the third flattening, evaluated with `dmath`
so the file is byte-identical on every host; coordinates are written with 7 decimals (≈ 1 cm), exterior rings
counter-clockwise and holes clockwise (RFC 7946 §3.1.6). Distances a GIS measures on the ellipsoid then match model
distances within a factor 1 + (d ÷ R)² ÷ 2 — at most 3.1 × 10⁻⁶, ≤ 5 cm, at the farthest corner of the largest frame
(≈ 15.7 km from the centre at aspect 2, §12.2). A foreign member `plat` records the anchor, whether it is the default,
the document id and the output version. The **metric** variant — offered "by prior arrangement" (RFC 7946 §4) for tools
that want the model's own metres — writes x east and y north in metres from the settlement centre with 2 decimals (the
centimetre lattice exactly), no `crs` member, in `<name>.metric.geojson`, beside a sidecar `<name>.metric.json` giving
the origin, the unit, the axes, the document id and the anchor if one is set (J-R31).

**Where exports run.** Every `export(h, fmt)` runs in the generation worker, which holds the document (§8.9). *Model
formats* — `.plat`, the JSON schema, the compact twin, GeoJSON, glTF / OBJ, CityJSON, CSV and permalinks — read the model
and §8.10's instance function (`Exporter.write(doc, null, opts)`). *SVG* needs a display list and label placement at the
export's own stop (§8.7), while the generation worker keeps only a 24-B index of the tile worker's list (§8.1 item 6):
the SVG exporter builds a **transient list** for the export's band and frame with `DisplayListBuilder.build(model, band)`
(≈ 4 µs per building at the city band), runs S13b there at the export stop through `@plat/labels` with `@plat/render`'s
`ObstacleSource` and `RoleIndex` over that list — the code the tile worker runs, with the export frame as the visible
region of §9.2's scope, so the placement is the one the tile worker would compute at that stop and §13.3's placement
digests test the code both run — writes the file and releases the list (time: §12.7; the list is §12.8's export-time
peak). A district-band SVG's list is counted in the size estimate shown before writing (J-R41). *Raster formats* — PNG,
print and the `.dd2vtt` scene image — use a transient list too: the generation worker builds it the same way for the
export's band and frame (including the live layers the export's layer set names, as their providers stand at the
request) and transfers it with the raster-export request (§8.9), which also carries the look and view state as they
stood at the request — the sheet, §8.8's view-state switches, the shadow sun and the light step. In its queue's export
class (§8.9) the tile worker runs S13b at the export stop over the list, with the export frame as the visible region; in
`lit` with a `path` sun it bakes the request's crown set when it is not cached and holds it until the export completes;
it rasters every tile with the request's look and view state by §8.8's band-streamed assembly, streams the encoded bytes
and a progress message per band back, and releases the list; the generation worker wraps the VTT scene around the image.
The export therefore shows the model, its look and its view state as they stood when it was requested, whatever is
edited, restyled or animated while its bands are rastered; the export dialog shows the bands done out of the bands total
(J-R47).

**The CityJSON extension.** By the CityJSON 2.0 convention a root property outside the core schema is named with a
leading `+` and defined by an Extension listed in the file's `extensions` member; whether a validator rejects an
undeclared one was not executed (PLAUSIBLE), so PLAT declares its one. `@plat/export` ships
`schemas/cityjson/plat.ext.json`, a CityJSON Extension (`type: "CityJSONExtension"`, name `Plat`, its own version,
`versionCityJSON: "2.0"`) whose `extraRootProperties` define `+platGeoAnchor` as an object of exactly three numbers —
`latDeg` in [−90, 90], `lonDeg` in [−180, 180) and `bearingDeg` in [0, 360) — and whose `extraAttributes`,
`extraCityObjects` and `extraSemanticSurfaces` are empty. A file with an anchor lists
`"extensions": { "Plat": { "url": …, "version": … } }`, the url being the address at which each release publishes the
schema beside the package; a file without an anchor — the default — has neither the property nor the member and is
plain CityJSON. CI validates both kinds with the extension schema supplied from the repository, so no check fetches
anything. A change to the property bumps the extension's version with the exporter's output version (§6.4).
**Measurement** at the CityJSON exporter's milestone (M3b, D-8): the anchored file passes the CityJSON validator with the
extension. **Pre-decided fallback:** the anchor moves to a sidecar `<name>.geoanchor.json` beside `<name>.city.json` —
the three numbers, the document id and the output version, checked against its own JSON schema like the metric
GeoJSON's sidecar — the CityJSON file carries neither the property nor the member, and the report says so (J-R43).
CityJSON is built for its lossless integer-vertex encoding (J-R14).

**Identity in every export (LC-1, LC-28).** Every export carries entity addresses (§6.3) and the document's supersedes
table (tombstone → successor), so an outside tool that keyed data to an entity can follow it across re-derivations; ids
cross the API and bridge boundary as `<docId>/<id>`.

**The `.dd2vtt` profile (DEF-4).**
* **Scope:** a rectangle or a district chosen by the user — by default the current view snapped to whole grid squares.
  One scene image is ≤ 8 192 px on a side at the declared grid (default 1 square = 5 ft = 1.5 m at 100 px, so ≈ 123 m);
  a larger scope is split into a grid of scenes aligned to grid lines, or the user lowers the pixels per square (≥ 50) —
  the export dialog shows the choice before writing. Output is exact pixels per cell (grid alignment error 0 px per
  cell, O11 g).
* **Fields:** `format` 0.3; `resolution { map_origin: {x: 0, y: 0}, map_size: {x, y} in squares, pixels_per_grid }`;
  `line_of_sight` — polylines in grid units from building footprint edges (minus door openings), enceinte faces, yard
  walls and hedges from boundary treatments (fences and railings do not block sight), and cliffs; `objects_line_of_sight`
  empty; `portals` — doors at building entrances (1.2 m openings) and gates (their opening), each
  `{ position, bounds: [two points], rotation, closed: true, freestanding: false }`; `lights` — the module's light sources
  in the scope, none otherwise, `{ position, range in squares, intensity: 1, color, shadows: true }`;
  `environment { baked_lighting: true, ambient_light }`; `image` — the scene PNG (base64) rendered by §8.8 at
  `pixels_per_grid` without the grid drawn in.
* **Per layer:** one file per model layer, its elevation in the file name and in a `plat` extension object; coordinates
  exact to the grid (O11 g).
* **Foundry scene JSON:** the same geometry as walls (`c: [x0, y0, x1, y1]` with movement and sight types; doors flagged),
  the same lights, a background image file, grid size and distance units, and journal entries from the gazetteer.

### 11.2 The embedding API and the worker boundary (SCL-6)

```ts
type DocHandle = { readonly id: string };            // the document lives in the generation worker
interface PlatApi {
  generate(bp: Blueprint, opts?: { onProgress?: (p: Progress) => void }): Promise<DocHandle>;
  open(bytes: ArrayBuffer, opts?: { readOnly?: boolean; session?: string /* a host-assigned session (§11.3); otherwise the document's stored session, minted on first edit (§7.4) */ }): Promise<DocHandle>;             // .plat or CBOR twin; bytes transferred in
  edit(h: DocHandle, e: EditEvent | EditEvent[]): Promise<ApplyResult>;                    // an event may arrive with its `fates` filled (below)
  regenerate(h: DocHandle, scope: Scope, mode: 'keep'|'newRandom', opts?: { discardEdits?: boolean }): Promise<ApplyResult>;   // §7.1's Regenerate (keep settings) and New random
  adjust(h: DocHandle, param: string, value: unknown): Promise<ApplyResult>;                          // §7.1's Adjust, or Re-derive from Sk for a parameter consumed early
  confirm(h: DocHandle, token: string, fates: EditFate[], renames?: Rename[]): Promise<ApplyResult>;                     // completes an action that returned `confirm` (NF-D14)
  cancel(h: DocHandle, token: string): void;                                                         // drops it; nothing was committed
  undo(h: DocHandle, of?: number): Promise<ApplyResult>;   // appends an `undo` event for the handle's session (§7.4); `of` only for the `owner` role; a conflict lists the dependent events
  redo(h: DocHandle): Promise<ApplyResult>;                  // appends a `redo` event for the handle's session (§7.4)
  query(h: DocHandle, q: Query): Promise<QueryResult>;                                     // gazetteer, hit-test, whereIs, fates; ≤ 64 KB per page, paginated (kinds below)
  view(h: DocHandle, target: HTMLCanvasElement | OffscreenCanvas, opts?: ViewOpts): Promise<ViewHandle>;   // tiles flow from the tile worker
  setView(v: ViewHandle, patch: Partial<ViewState>): void;
  export(h: DocHandle, fmt: Format, opts?: ExportOpts): Promise<ArrayBuffer>;              // transferred out
  report(h: DocHandle): Promise<GenerationReport>;
  subscribe(h: DocHandle, handler: (e: ApiEvent) => void): Unsubscribe;
  close(h: DocHandle): void;
}
type ApplyResult =
  | { status: 'ok'; logHead: string /* §11.3 */; changed: number /* addresses whose records changed */ }
  | { status: 'conflict'; actions: ConflictAction[] }                // §7.1's dry run: the nearest valid position, the blocking lock, a stale base …
  | { status: 'confirm'; token: string; fates: EditFate[] /* the first 1 000; the rest by query 'fates' */; renames: Rename[] /* the case-(4) renames the dry run listed (§6.3, §7.3 item 4); the rest by query 'fates' */;
      counts: Record<EditFate['fate'], number>; scope: EditScope /* resolved */ };   // §7.3 item 4: nothing is committed until confirmed
type ConflictAction = { kind: 'moveTo'|'unlock'|'unassign'|'reroute'|'stale'|'invalid'; target?: Id; at?: PointCm; message: string };
type Query =
  | { kind: 'gazetteer'; text?: string; kinds?: string[]; page?: number }
  | { kind: 'people'; type?: string; race?: string; gender?: string; profession?: string; workplace?: Id; ageRange?: [number, number]; household?: Id; district?: Id; page?: number }   // COV-FTG-C13
  | { kind: 'hit'; view: ViewHandle; x: number; y: number } | { kind: 'whereIs'; person: Id; day: string; hour: number }
  | { kind: 'relations'; person: Id; up: number; down: number }   // the family-tree view (COV-FTG-C11), from the relation store
  | { kind: 'inView'; view: ViewHandle }                          // the "features in view" list (COV-FTG-A24; the non-visual route, J-S19)
  | { kind: 'fates'; token: string; page: number };               // the full fate list of a pending confirmation, then its renames
// @plat/api/node — the same API over worker_threads, plus by-value helpers for scripts and tests
declare function generateDocument(bp: Blueprint): Document;
declare function exportDocument(doc: Document, fmt: Format, opts?: ExportOpts): Uint8Array;
```

**Confirming fates (NF-D14).** An action whose dry run (§7.1) must be confirmed under §7.3 item 4 — protected entities in
its effective scope (Re-derive from Sk, Adjust of an early parameter, a regeneration over locked, pinned, edited or
assigned entities, "discard edits in scope"), or case-(4) renames (§6.3), including an `unlock`, `unassign`, `undo`,
`redo` or `revert` that frees a name — returns `confirm` with the fate of every protected entity, every listed rename
and a **token** = H128(the document's `logHead` ‖ the canonical bytes of the event without its fates and renames).
Nothing is committed. `confirm(h, token, fates, renames)` commits the event with those fates and renames when the token
is still current (the `logHead` has not moved) and the fates and the renames equal the dry run's lists; if the state
moved it re-runs the dry run and returns a fresh `confirm`, and a changed list is never committed silently. Resubmitting
the event through `edit` with its `fates` and `renames` filled is the same operation — the engine commits when a fresh dry
run computes the same fates and renames and otherwise returns `confirm` — which is how a host bridge carries a confirmed
action (§11.3). "Discard edits in scope" is a new request (`regenerate` with `discardEdits: true`) with its own
confirmation. `cancel` drops the token (J-R33).

| call | crosses | copy or transfer | bound |
|---|---|---|---|
| `generate` | in: the blueprint; out: the handle, progress events | copy | < 64 KB; < 1 KB per event |
| `open` | in: the document bytes | transfer | the document's size |
| `edit`, `regenerate`, `adjust`, `confirm`, `undo`, `redo` | in: events or a token with fates and renames; out: `ApplyResult` — `ok` (the new `logHead`, count of changed addresses), `conflict` (actions) or `confirm` (token, the first 1 000 fates, the renames, counts per fate, the resolved scope) | copy | < 64 KB per batch; longer fate lists by `query({ kind: 'fates' })` pages |
| `query` | out: one result page | copy | ≤ 64 KB |
| `view` | out: composed tile bitmaps and hit-test slices (§8.9) | transfer | ≤ 1 MB + 64 KB per tile |
| `export` | out: the file bytes | transfer | the format's size |
| `subscribe` | out: `ApiEvent`s (`doc.changed`, `view.changed`, report updates) | copy | < 64 KB |

The headless path runs the same worker code, and its model hash equals the browser's (text is not in the model, §9.1);
ids cross this boundary as `<docId>/<id>` (§6.3). The derivation pool uses transferred copies, never `SharedArrayBuffer`
(§3.3), so no embedding host needs cross-origin isolation for generation; the tile worker's optional shared columns
(§8.9) remain the only use of shared memory. **Engine (§3.7, SCL-22):** the product bundle has no WebAssembly dependency;
if M0 triggers the kernel's pre-decided fallback (Clipper2-WASM as the single engine), WebAssembly becomes an embed
requirement and a host without it receives the API error `E_ENGINE_UNAVAILABLE` from `generate` and `open` (not a kernel
result, §3.1).

### 11.3 The host bridge — the host is the store (FTG-12)

* **Transport.** `interface BridgeTransport { send(msg: BridgeMessage): void; onMessage(h: (msg: BridgeMessage) => void): void }`.
  Shipped: `WindowPostMessageTransport` (iframe hosts; a fixed target origin; incoming origins checked against the
  embed's allowlist) and `MessagePortTransport` (any relay — a browser-extension content script, a SharedWorker, a
  chat-bus relay; COV-FTG-N06). Envelope: `{ plat: 1, type, session, seq, logHead?, body }`.
* **Vocabulary (our own terms, FTG-22).** Host → PLAT: `doc.load { bytes | ref, role, session }`,
  `doc.apply { baseLogHead, events }`, `view.set { patch }`, `export.request { fmt, opts }`, `query { q }`. PLAT → host:
  `ready { outputVersions, schemaVersion }`, `doc.changed { baseLogHead, events }` (a local user's proposed events),
  `doc.applied { logHead }`, `doc.rejected { reason: 'stale'|'invalid'|'role'|'version', currentLogHead, conflicts? }`,
  `view.changed { patch }`, `entity.selected { id, kind }`, `export.ready { bytes }`, `query.result`.
* **logHead** = a 128-bit hash of (document id, edit-log length, hash of the last event), in hex (our own term, FTG-22).
* **Convergence.** The host holds the canonical document and log. A client sends its user's edit as `doc.changed` against
  its `baseLogHead`; the host accepts only when that base is the current `logHead` — it appends the events, advances the
  `logHead` and fans `doc.apply` out to every client, the sender included — and otherwise answers
  `doc.rejected { stale }`; the client then applies the host's pending `doc.apply` messages, re-runs its own events
  through the dry run (§7.1) on the new state and sends them again, or shows its user the conflicts. An action that needs
  its fates confirmed (§7.3 item 4, §11.2) is sent only after the local user confirmed them, as an event carrying its
  `fates` and `renames`; if the state moved underneath it, the client's re-run returns a fresh confirmation for its user
  instead of resending, and every other client replays the event with those fates, reporting a mismatch if it computes
  different ones. Every client applies the same events in the host's order on the same output version, so every client's
  model hash is the same (§6.2) — after a load mismatch, once the owner has chosen (§2.9 step 4). **Test (M3a):** a host
  and three headless clients applying 1 000 interleaved random events — undo and redo from every client and one owner
  undo through a chain among them — converge to one model hash with 0 lost accepted events; and one forced load mismatch
  settled by an owner's keep while two editors edit on the replayed town: all four converge to one model hash, the
  editors' events re-applied on the saved town.
* **Version handshake.** On `doc.load` the client compares the document's **`outputVersion`** (§6.4) — not the generator
  version — with the output versions it can replay (announced in `ready`); when it cannot, it opens the snapshot
  read-only (its role drops to viewer, and it says so) as §2.9 step 2's frozen view does — checked by its chunks' content
  hashes only and labelled "made with o<k>; not verified by this version", never reported as a mismatch — and it never
  replays under another version silently.
* **View state.** The document's view keys (§2.9's view section, outside the model hash; each last-writer-wins by
  (Lamport counter, session id)) travel as `view.set` / `view.changed`. The view key `time` is set by `view.set { time }`
  and advanced by the module-tier message `sim.advance { hours }` (§10.3).
* **Style is canonical; the preset a viewer looks through is not (N-15).** The document's style (§2.9 `style`: the sheet
  and version, its row operations, the ground-cover regions) changes only through logged `setStyle` events, which the
  bridge carries in `doc.changed` / `doc.apply` like any edit and which only the `owner` and `editor` roles may send. The
  view key `stylePreset` is a per-viewer choice of preset (for example a player looking at the `lit` family while the
  document is drawn in `ink`): it never writes `setStyle`; the chosen preset replaces the document's sheet for that viewer
  only, and the document's own rows (thematic overrides, ground-cover regions) apply on top where the preset has the roles
  they name, the rest listed in that viewer's style dialog (J-R34).
* **Roles.** `owner` | `editor` | `viewer`, given by `doc.load`. A viewer's client never emits `doc.changed` (model edits
  are disabled in the UI and dropped by the bridge) and emits only the view changes the host allows; the host enforces
  the roles as well. The host assigns one session per user and document and passes it on every load; a bridged client
  never mints a session or writes the `session` view key (§7.4). **Bridged load verification.** Load verification
  (§2.9 step 3) runs while the client's user edits; on a mismatch only an `owner` client may keep the saved town (a
  `rebase` sent like any event); every other client takes the replayed town for its own working state and reports the
  mismatch. It keeps the `doc.load` bytes until the mismatch is settled; when the owner's `keptSnapshot` rebase arrives it
  installs the saved town from them and re-applies the events after `h₀` (§2.9 step 4); under §6.2 (iii) its comparison
  of its own root with the owner's `stateDigest` waits for its load's recomputation, a client still verifying stops, and
  a client that loads after the owner's choice takes the saved town as its base without asking — so every client
  converges on the owner's choice.
* **Logging (LC-31).** Every model change over the bridge is a `doc.apply` of `EditEvent`s, logged one to one; no bridge
  command changes the model any other way. Undo and redo are `EditEvent`s (§7.4): they travel as `doc.changed` and
  `doc.apply` like any other event, the envelope's `session` is their `EditBase.session`, and a client never truncates a
  bridged log. A provider output refused at §2.9's cap returns the requesting edit as
  `doc.rejected { reason: 'invalid', conflicts }`.

### 11.4 Host inputs (DEF-11)

A host may supply input only through these doors: (1) blueprint fields — seed, rung, population, intent, character,
circumstances, assignments — to `generate`; (2) edit events through the API or `doc.apply`, which are logged; (3) tables,
presets and styles as `editTable`, `editPreset` or `setStyle` events, whose content is copied into the document with
provenance `host` (source, date, version), so the document replays without the host; (4) a registered `ContentProvider`
(§14), accepted only after a **double-run check** (at registration it runs twice on the same input and stream; the two
outputs must be byte-identical, else it is refused), with every output it produces for a document recorded in the
document's `hostContent` block, keyed by (provider id, version, input hash), and read from there on replay; an output
that would pass §2.9's cap on pack data and host content is refused at the call as §2.9 states. So a document never needs
its host to replay, and host code — which the model packages' lint (§6.5) cannot reach — is made deterministic by the
check and the record. The mapping of SettlementForge's own data onto these doors is staged (*Staged by the owner's roadmap*);
this contract is its hook.

### 11.5 Sharing and multi-client use without a hosted service (DEF-12, COV-FTG-N07)

* **Decision:** the product contains no hosted service. For multi-client use a host — a VTT module, a web page, or
  SettlementForge in its owner-staged phase — is the store (§11.3) and owns accounts and access (J-R15, J-R16).
* `interface DocResolver { resolve(ref: string): Promise<ArrayBuffer>; publish?(bytes: ArrayBuffer, access: 'private'|'link'|'public'): Promise<string> }`
  is configured by the embedding app. `&doc=<ref>` links are produced only when a resolver with `publish` is configured;
  otherwise the app offers the `.plat` file and, for a small edit log, the inline compressed log of §6.4. Access levels
  are the resolver's; the reference app ships a file resolver (local files and inline logs) and no network resolver.
