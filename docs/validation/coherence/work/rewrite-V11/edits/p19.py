from helper import build
R = []
def r(a, b, c=1): R.append((a, b, c))

# 4.1
r("""nearer bound and the editor says so in one line ("set to 3, the most this column allows"; item 101 R2; V11C-23), as is a""",
  """nearer bound and the editor says so in one line ("set to 3, the most this column allows"; item 101 R2), as is a""")
# 4.2 (V09-XAGREE-1)
r("""is an ordinary cell. Two **document-only tables** (BCR-V11-10; registry row 76; shipped empty, `documentOnly: true`,""",
  """is an ordinary cell. Two **document-only tables** (item 380; registry row 76; shipped empty, `documentOnly: true`,""")
r("""* **`siting.declared`** — item 104 (a) (1)'s author declaration, with three KEY FORMS and typed cells per form (V11C-15):
  - `uid:<localUid>` (a custom kind): `{ profile?: Partial<SitingProfile>; familyWeights?: Record<string, number>;
    quarter?: Id /* a district, or a named quarter record */ }`;
  - `cat:<catalogId>` (a catalogue kind): `{ profile?: Partial<SitingProfile>; familyWeights?: Record<string, number> }`;
  - `use:<use address>` (ONE institution): `{ place?: Id /* a plot or a district */; pin?: Id; split?: false /* merge
    this split: the use stays one site (item 105 (h)) */; specialisation?: 'stepped_temple'|'terraced_palace'|
    'tiered_tower'|'none' /* item 110 (c): held, exempt from the chance and the cap (V11 §3.24.3); 'none' refuses a
    generated one */ }`.
  A kind-level row (`uid:`, `cat:`) shapes every member of the kind; a `use:` row one member. §7.7's assignment remains the
  route for a dossier institution's place when the port writes it; a `use:` row is the user's.
* **`siting.linkEdits`** — item 105 (j)'s link pins and cuts, keyed `<consumer use address>/<good>`, cells `{ bindTo?: Id
  /* a provider use */; cut?: boolean }`. `{ cut: true }` with no `bindTo` means "this consumer takes no provider for this
  good": its supply term scores 1 (neutral) and no link binds (V11C-15 (2)); `bindTo` pins the link to that provider
  whatever the nearest-provider rule says.""",
  """* **`siting.declared`** — item 104 (a) (1)'s author declaration, with four KEY FORMS and typed cells per form:
  - the kind keys `uid:<localUid>` (a custom kind), `cat:<catalogId>` (a catalogue kind) and `cls:<class>` (a roster
    class no dossier record binds): `{ profile?: Partial<SitingProfile>; familyWeights?: Record<string, number> /* per
    family one of 0, 0.5, 1, 2 or 3, multiplying the family's soft terms for the kind; hard needs unscaled */; quarter?:
    Id /* a district, or a named quarter record */; place?: Id /* a plot or a district the kind's members prefer */;
    split?: false /* the kind's members each stay one site (item 105 (h)) */ }`;
  - `use:<use address>` (ONE institution): `{ place?: Id /* a plot or a district */; pin?: Id; split?: false /* merge
    this split: the use stays one site */; specialisation?: 'stepped_temple'|'terraced_palace'|'tiered_tower'|'none' /*
    item 110 (c): held, exempt from the chance and the cap (V11 §3.24.3); 'none' refuses a generated one */ }`.
  A kind-level row shapes every member of the kind; a `use:` row one member, and is orphaned when the use goes, as
  `siting.linkEdits`' keys are. §7.7's assignment remains the route for a dossier institution's place when the port
  writes it; a `use:` row is the user's.
* **`siting.linkEdits`** — item 105 (j)'s link pins and cuts, keyed `<consumer use address>/<good>`, cells `{ bindTo?: Id
  /* a provider use */; avoid?: Id[] /* providers never bound */; cut?: boolean }`, with three meanings: `bindTo` keeps a
  supplier — the link binds that provider whatever the nearest-provider rule says; `avoid` cuts one — the listed
  providers are never bound and the next nearest serves; `cut: true` alone stops the good at that use — no link binds and
  its supply term scores 1 (neutral).""")
r("""tools write these two tables (V11 §10b X-V11-13; V9C-03); its family ids and sentences are V11 §3.3.1's. The clerk's tool API
(V10) writes the same rows.""", """tools write these two tables (V11 §10b X-V11-13; V9C-03); its family ids and sentences are V11 §3.3.1's. The clerk's tool API
(V10) writes the same rows.""", 0)
r("""tiers*). The tool mapping and the screens are V09's, and V09 keeps NO store of its own for these declarations: its gestures
write these two tables (V11 §10b X-V11-13; V9C-03); its family ids and sentences are V11 §3.3.1's. The clerk's tool API
(V10) writes the same rows.""", """tiers*). The tool mapping and the screens are V09's, and V09 keeps NO store of its own for these declarations: its gestures
write these two tables, each screen mapped to a declared cell (V09 §2.6); its family ids and sentences are V11 §3.3.1's.
The clerk's tool API writes the same rows and only declared cells (V10 §4.1).""")
# 4.3
r("""through §7.6's first-reader fallback (V11C-15 (3)).""", """through §7.6's first-reader fallback.""")
# 4.4
r("""| a `siting.declared` row (`uid:`, `cat:`) | `editTable` on the document-only table |""",
  """| a `siting.declared` row (`uid:`, `cat:`, `cls:`) | `editTable` on the document-only table |""")
# 4.5
r("""(`PlacementSolver.explain`, BCR-V10-2)""", """(`PlacementSolver.explain`, item 311)""")
r("""implements the last two as its queries `query row` and `query profile` (V11 §10b X-V11-3; V11C-18).""",
  """answers the last two by its queries `query row` and `query profile`.""")

# 5
r("""views) with this volume's materials (V11 §3.19.3's structure keys) through §8.2's roles (the three new wall roles by
   BCR-V11-30).""", """views) with this volume's materials (V11 §3.19.3's structure keys) through §8.2's roles (item 412's three wall
   roles).""")
r("""walls, stairs and ramps, deck plots and deck buildings, stepped buildings — are file f item 447's one text for both
   variants (J-VI.18), cited and never restated here: this volume adds no second name for any of them (SCC-02). With the
   option `exportWhy` (BCR-V11-23; default off)""", """walls, stairs and ramps, deck plots and deck buildings, stepped buildings — are item 447's one text for both
   variants (J-VI.18), cited; this volume adds no second name for any of them. With the option `exportWhy` (item 456;
   default off)""")

# 6 (V11-ICONF-4; NARR-16)
r("""| `plat tables compile` (every `REGISTRY` entry — 92 catalogue rows at this revision (90 before reconciliation round 4's continuation, SCC-R3C-4; 86 before round 2's continuation, SCC-R1C-3); the count is read from the registry, never written into a bar) |""",
  """| `plat tables compile` (every `REGISTRY` entry; the count is read from the registry, never written into a bar) |""")
r("""it sits in §12.5's first-map row; tables are parsed once per session and shared by view hash (V11C-17 (5)) |""",
  """it sits in §12.5's first-map row; tables are parsed once per session and shared by view hash |""")
r("""| `resolveSiting` (≈ 230 classes, ≤ 48 derived rows each) |""",
  """| `resolveSiting` (every class `REGISTRY` compiles — the authored, generic and sky classes and V07's `v.` classes — read from the registry, ≤ 48 derived rows each) |""")
r("""inside §12.4's S10a/S10b rows as BCR-V11-22 restates them;""", """inside §12.4's S10a/S10b rows as item 477 restates them;""")
r("""≤ 150 KB gzipped each — §6.4's bar (V11C-17 (4)) |""", """≤ 150 KB gzipped each — §6.4's bar |""")
r("""all of S10's distance rasters only by BCR-V11-22's restatement,""", """all of S10's distance rasters only by item 477's restatement,""")

build('19-s4-6', [(3999, 4125)], R)
