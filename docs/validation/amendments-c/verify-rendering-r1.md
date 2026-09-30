# verify-rendering-r1 — lane amendments-c/verify-rendering-r1 (the RENDERING part after repair round 1)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-rendering-r1).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 inputs read (verify-rendering-r0, repair-rendering-r1 report and blocks, assemble-r1, route items, cross-part notes of the six r1 repair reports, sibling r1 verifiers): done
> STEP 1 repaired subsections read whole (§8.2, §8.3, §8.4, §8.5, §8.8, §8.9, §9.2, §9.4, §11.1, §11.2, §11.4, §12.2–§12.5, §12.7, §12.8) plus §8.1, §9.1, §9.3, §9.5, §9.6, §11.3, §12.6: done
> STEP 2 r0 issues re-checked (24 + VKC-18, VPR0-21, VD0-09, VSC-09): done — all 28 FIXED
> STEP 3 per-item verdicts: done (58, 67, 101 PARTIAL -> PRESENT; rest carried)
> STEP 4 checks and new issues: done (18 issues: 2 major, 16 minor; rendering 17, scope 1)
> STEP 5 doc_checks, refs, receipts: done (doc_checks 8,9,11,12 exit 0; refs 2 external; receipts re-run identical; new receipt amendc_verify_rendering_r1_ring)
> STEP 6 queue row + LANDED: done (queue row B-amendments-c/verify-rendering-r1 appended once; LANDED line written)

Design under review: docs/ARCHITECTURE.md sha256 024c57dabc6b93c8e0ddfb03fdc1892572648f9fc04eea8905116f60789d80b9;
rationale sha256 33b21ca8cdc157895434f794ed9f8019295edbb3c0da0ff7b3bd10ccdce4f7de; research/findings/code-impact.md
sha256 cf6f665f… (assemble-r1's installed files).

## Outcome

Repair round 1 fixed every one of the 28 issues routed to the rendering part — verify-rendering-r0's 24 (VRC-01 –
VRC-24, the four owned by other parts included) and the other seats' VKC-18, VPR0-21, VD0-09 and VSC-09 — each checked
against the live text below. The three items r0 found PARTIAL (58, 67, 101) are now PRESENT; every other routed item keeps
r0's PRESENT verdict. No held part is written. The part's document checks exit 0, every J id it cites resolves, the
resolver finds only the two pre-existing external references, and the repair's and the palette's receipts re-run
byte-identical.

**18 issues remain or are new: 2 major and 16 minor.** Owners: rendering 17, scope 1 (plus a cross-part note to pipeline).
Both majors are new problems in the repaired §8.4 lighting model:

* **VRC1-01 — shadows cut on tile lines.** The global light's march now stops at "that ring's far edge" (the pixel's tile
  and its one-tile ring), so any shadow longer than one tile side ends on a tile-grid line. CONFIRMED by an executed
  receipt: at the 1:500 stop a 45 m tower under the default fixed sun loses 7.5 m of its shadow, cut exactly at the
  33.9 m tile line. This contradicts §8.4 (f)'s "a shadow crosses tile edges seamlessly".
* **VRC1-03 — lights reveal hidden things.** Lights and light shafts are not filtered by the knowledge key. A secret
  access's shaft, a light at a secret access point, or a concealed room's light still lights the map (and the VTT,
  glTF and GeoJSON exports) for a viewer whose key hides that part. That is a visible trace of what §9.2 says "draws
  nothing" (item 63 (c), item 64).

The minor issues are: a banded shadow from the fixed march count (VRC1-02); the post operations' cell rule and the SVG
filter placement (VRC1-04, VRC1-05); no census bars for the round's new sun, default-light, post-operation and
light-map-key mechanisms (VRC1-06); no test for the `preview` refusal and an inconsistent `PreviewResult` type (VRC1-07,
VRC1-08); the 120 000-cap dossier refusal missing from §12.2 and §11.4 (VRC1-09); "§2.8's marker" (VRC1-10 = V-MC1-09
= VD1-11); door (4)'s unsupported reason (VRC1-11); the lit export's surface margin (VRC1-12); a count restated in
§12.7 (VRC1-13); an ambiguous "§4.11 (4)" (VRC1-14); a repair Works drawn without its scaffold (VRC1-15); J-A68.86's
stale Part A clause (VRC1-16); the hand lantern, which nothing evaluates per frame (VRC1-17); and no bridge message for a
host clerk's `preview` (VRC1-18).

CONFIRMED: every FIXED verdict and every issue is quoted from the live text; VRC1-01 and VRC1-02 rest on the executed
receipt `docs/validation/bench/amendc_verify_rendering_r1_ring.out`, and VRC1-12 on recomputation from the text's own
terms. PLAUSIBLE: the mechanisms the required changes choose (VRC1-01's world-distance window, VRC1-02's max-height
pyramid, VRC1-12's per-tile window, VRC1-11's registration call) — the repairers' to confirm.

## 1 Inputs read

* `verify-rendering-r0.md` (this lane's earlier report: its 24 issues and item verdicts), `repair-rendering-r1-report.md`
  and its block file `repair-r1-rendering.md` (19 blocks), `assemble-r1.md` (the 78 changed headings, the hand-offs:
  §5.2 F-LIGHT, §13.4, §16's 53 ms, J-A68.86's clause, P22–P24).
* The route's items for this part (home 53, 54, 55, 68, 69; referencing 58, 63, 64, 65, 67, 70, 72, 20 (h), 73, 74, 75,
  77, 81, 82, 85, 86, 87, 88, 101) and their rulings in `docs/AMENDMENTS-2026-09-27c.md`, `-27d.md` and `-27e.md` as r0
  read them; item 63 (c), item 64 and item 68 re-read for the new findings.
* The cross-part notes addressed to rendering in the six r1 repair reports: scope notes 3 (§11.4, the 120 000 cap) and 4
  (J-A20.82's "marker"); determinism's note on §11.1's "§2.8's marker"; none from kernel, model or pipeline. The sibling
  r1 verifiers' rendering-owned rows (V-MC1-09 = VD1-11; VKC-18 and VD0-09 as FIXED).
* The part, from the live design, read whole: §8 (l. 9496–10910), §9 (l. 10911–11298), §11 (l. 11753–12163), §12
  (l. 12164–12729). The subsections that cite the repaired ones or that they cite: §1.2 (l. 350–362), §2.7's `LightSource`
  (l. 1859–1860), §2.9's view keys (l. 2425–2445), §4.7's `LightRule` and *Light sources* (l. 5555–5610), §4.11's *Works*
  (1)–(10) and `WorksStage` (l. 6643–6735), §5.2's F-LIGHT (l. 6911), §7.8's light controls (l. 9489), §13.2's T30-5,
  T68 and T101 groups, §13.4's light-pass bar (l. 13559–13566), §14's `ContentProvider` and `PortResult`, II.7.4's
  shafts (l. 15549–15556), the index rows and Part A entries of J-A68.83 – J-A68.87, J-A101.84, J-A101.85, J-A72.82,
  J-A81.01, J-R27.
* A word-level diff of the part against `docs/archive/ARCHITECTURE-pre-amendments-c-repair-r1-2026-09-28.md` (scratch
  `vr1/wdiff.txt`), so every changed sentence was read in place.

## 2 The round-0 issues, re-checked on the live text (sha256 `024c57da…`)

| r0 id | owner | verdict | evidence (quoted from the live design) |
|---|---|---|---|
| VRC-01 (major) | rendering | FIXED (VRC1-07, VRC1-08 minor residue) | §11.2 *Knowledge* lists "`inView`, `why`"; *The oracle under the key* (l. 11960–11974) gives rules (1)–(4) — "a concealed use the key does not admit is left out of every answer … a `why` on one of its parts answers empty … a front's `why` … is the front's own"; "**`preview` is an editing role's call** … a viewer's `preview` is refused (`status: 'refused'`, `reason: 'role'`) with nothing computed"; §9.2's clerk sentence points there (l. 11049–11052); T30-5 carries the `why` clauses (l. 13189–13195). |
| VRC-02 | rendering | FIXED | §8.3: "≥ 0.5 of the unoccluded sum — the lights the caster does not block carry at least half of every such pixel's light (… (A): worst 0.60)"; the receipt re-runs byte-identical. |
| VRC-03 | rendering | FIXED | §8.3: "d · h ÷ (H − h) beyond the caster — d · H ÷ (H − h) from the sun's ground point G … wherever \|G − V\| > D, the largest angle … ≤ 2 · asin(D ÷ \|G − V\|) + 0.1°". |
| VRC-04 | rendering | FIXED | §8.4 (c): "`Spill` = max(0, B(D) − D) … nothing on uniformly lit ground … E_g · (a + sin 45°), exactly". |
| VRC-05 | rendering | FIXED (VRC1-04, VRC1-05 new) | §8.4 (f): "**§8.2's post operations run after the light** wherever it runs (J-A68.87)"; §8.2, §8.8's print paragraph and §8.9 point to it. |
| VRC-06 | rendering | FIXED (margin residue folded into VRC1-03) | §8.4 (f) and §8.8: the **light-map key** — "its tile's surface key … its content version taken over the tile dilated by the largest radius … — and a dirty box invalidates every light map whose dilated tile it meets". |
| VRC-07 | rendering | FIXED (VRC1-01, VRC1-02, VRC1-13 new) | §8.4 (c): "**The march** — one law … N = 32 for the global light and N = 24 for a point light"; §12.5 "the global light's march of §8.4 (c)", §12.7 "§8.4 (c)'s point-light march"; the bake fallback "on every host and in the CPU reference alike … a declared view shift". |
| VRC-08 | rendering | FIXED | §8.4 (g): "13 B per pixel (3.25 MB per position …; §8.8 counts it) — the march unchanged"; §8.8 "**6.5P + 7 MB**" with worked cases 163 / 85 MB (recomputed: P = 24 and 12); §13.4 (hand-off 5): "takes §8.4 (g)'s full-precision surface — the march unchanged". |
| VRC-09 | rendering | FIXED (VRC1-06: no bar) | §8.4 (d) "**Which sun draws** (one rule; J-A68.84)", `SunSpec.admits`; (e) `LightingSpec.defaultLight`; §8.2's `night` row points to it; §2.9's defaults stand. |
| VRC-10 | rendering | FIXED | §8.4 K06: "swept by an offset read from a class row (§8.2's symbolisation row; item 54)". |
| VRC-11 | rendering | FIXED (VRC1-14, VRC1-15 new) | §8.2 row "Works `roofless` / `collapsed` / `overgrown` … as the `decayed` row / as the `ruined` row / replace: … a grassy mound"; the stage-named-like-a-state sentence; §8.3 "other than `before` and `finished`". Every `WorksStage` of §4.11 (l. 6728–6729) now resolves a row. |
| VRC-12 | rendering | FIXED | §11.1 JSON "at the export's drawn week (§4.11's *Which week is drawn*…)", 3-D likewise, CityJSON "a building under a Works at its stage heights (`heightsAt`) at the export's drawn week". |
| VRC-13 | rendering | FIXED | §12.4's S12c row (2 ms) and the pooled row's light placement (≈ 126 ms of work, 53 ms p50); critical path re-summed to 262 ms (recomputed: the 18 rows sum to 262; 126 ÷ 3 × 1.25 = 52.5); §12.3's p50 column 78 / 262 / 624; §16's trigger "53 ms" (hand-off 7). J-A72.82. |
| VRC-14 | rendering | FIXED | §12.8: "the high tier's lit reference view (DPR 2, 156 + 15 = 171 ≤ 192 MB) … the low-end 1 366 × 768 view, lit at DPR 1 (58 + 15 = 73 > 72 MB), drops its coarser-stop set … (46 + 15 = 61 MB)" (recomputed). |
| VRC-15 | rendering | FIXED (VRC1-16 residue) | §8.4 (h) cites "P22", "P23", "P24"; `research/findings/code-impact.md` §(d) holds P22–P24 (l. 190–192); J-A68.86's Part A carries "their P-ids P22–P24". |
| VRC-16 | rendering | FIXED | §9.4: "Decided after it, the city cut's labels inside it avoid it like any lower candidate, taking their next alternate or rung"; rung (5)'s J-R27 sentence corrected the same way. |
| VRC-17 | rendering | FIXED | §8.4 (g) "rung 3 — the **vector pass**: the projected-shadow pass (§8.2's `shadowPass` program …)"; (f) "(J-R21)"; §8.5 "(K06, §8.4)"; §8.9 "is the **pre-decided fallback compositor**"; §5.2 F-LIGHT (hand-off 4) "(§8.2's `shadowPass` program)". No `ShadowPass` left in the design. |
| VRC-18 | rendering | FIXED | §8.2: "NG 1.2.2's (greens → roads → …)". |
| VRC-19 | rendering | FIXED, with a deviation (VRC1-11) | §11.4: "SettlementForge's map comes through doors (1) and (2), which the port produces; door (3) stays open to it as to any host … and door (4) serves in-page embedders, since a provider must be registered from the module's own page …". |
| VRC-20 | rendering | FIXED (VRC1-09 residue) | §12.2: "… and a dossier below the ladder's floor (1 500 people) is refused by the port instead (§7.7 item 15; item 81)". |
| VRC-21 | pipeline | FIXED | §4.7 `LightRule`: "`sizeCm: Cm` … `colour: string` … `flicker: boolean`" (l. 5576–5577). |
| VRC-22 | pipeline, model | FIXED | §4.7 (4): "one thing only is drawn — a door lantern's side of its door"; §2.7 `flicker?: true` (l. 1860). |
| VRC-23 | scope | FIXED | summary: "so the shadows and the 3-D export read real heights, and the shadows are on by default (§8.4)" (l. 46). |
| VRC-24 | model | FIXED | §2.7 `colour`: "its row's, written at placement (§4.7), and the colour the light pass lights with (§8.4 (c))"; §4.7: "§8.2's light roles tint only the vector rung's glyph and glow". |
| VKC-18 | rendering | FIXED | §8.4: "catacombs, caverns, quarries and mine voids, vaults, a buried old town, dug passages — in its own part, the undercity in the part of its void (II.7.5)"; "`z` ordering the bands across the underground layer's parts (§2.1's `PlatKey`, one arena each in §3.4)". |
| VPR0-21 | rendering | FIXED | §8.2 `hatched`: "large-tree pins under the buildings and block trees above them (item 58 (d))". |
| VD0-09 | rendering | FIXED | §11.4 door (1): "intent, the district intents (`districtIntent`, §7.7 layer 2)" — `Blueprint.districtIntent` exists (l. 2179). |
| VSC-09 | rendering | FIXED | §11.2's clerk paragraph: "its `why` answers and its `preview`s by *Knowledge* above (§9.2)". |

The repair's three corrections of r0's proposed texts are accepted: VRC-02's "two lights" reason was false (the receipt
finds pixels reached by one light); VRC-08's 3 MB omitted the coverage byte (13 B per pixel is right); VRC-19's door (4)
is accepted in principle but its stated reason needs a mechanism (VRC1-11).

## 3 Per-item verdicts (this round re-checks the items the repair touched; the rest carry r0's verdict, `verify-rendering-r0.md` §2)

| item | where | r0 | r1 | evidence / what remains |
|---|---|---|---|---|
| 53 (home) | §8.10 | PRESENT | PRESENT (carried) | §8.10 unchanged by the round. |
| 54 (home) | §8.2 symbolisation row; §8.4 K06 | PRESENT (VRC-10) | PRESENT | K06 now points to §8.2's row; the ratios and P15 are stated once, in §8.2. |
| 55 (home) | §9.3; §9.2's memo | PRESENT | PRESENT (carried) | §9.3 unchanged; §9.2's memo line unchanged. |
| 68 (home) | §8.4 (a)–(h) with §8.1, §8.2, §8.3, §8.5, §8.8, §8.9, §9.4, §11.1–§11.3, §12.5, §12.7, §12.8 | PRESENT (VRC-02 – 09, 14, 15, 17) | PRESENT, with new defects VRC1-01 – VRC1-06, VRC1-12, VRC1-13, VRC1-16, VRC1-17 | The r0 defects are fixed (§2). The march law, the full-precision step, the sun precedence, `defaultLight`, the post-operation order and the light-map key are now mechanisms in §8.4, each cited from §8.8, §8.9, §12.5, §12.7, §12.8 and §13.4. The new defects are in the march's window (VRC1-01), its sampling (VRC1-02) and the knowledge filter over lights (VRC1-03). |
| 69 (home) | §8.2 palette targets | PRESENT | PRESENT | The receipt re-runs byte-identical. The spill fix makes "open level ground shows exactly its albedo" true (receipt (C): 1.0000), so the paper target holds on the lit map as §8.2 claims. |
| 59 (timing, released) | §12.7 | PRESENT | PRESENT (carried) | Labelled as the gate requires; §12.7's stage-3 bullet is unchanged. |
| 58 (d), (e) | §8.2, §8.3 | PARTIAL (VRC-18) | PRESENT | "NG 1.2.2's (…)"; the `hatched` row names 58 (d)'s pins (VPR0-21). |
| 63 | §8.1 item 7, §8.5, §9.2, §11.1, §11.2 | PRESENT (VRC-01) | PRESENT, with VRC1-03 | §11.2's oracle rule leaves a concealed use out of every answer; the drawing, files and reader agree. The lights are the one path left (VRC1-03). |
| 64 | §8.2 `access` row, §9.2 | PRESENT | PRESENT, with VRC1-03 | A secret access "draws nothing and labels nothing", yet its shaft and a light at its foot still light the map (VRC1-03). |
| 65 | §8.4 layers, §8.2, §9.1, §11.1 | PRESENT | PRESENT | VKC-18 fixed. |
| 67 | §8.1 item 7, §8.2, §8.3, §8.4, §8.5, §11.1, §11.3 | PARTIAL (VRC-11, VRC-12) | PRESENT, with VRC1-14, VRC1-15 | Every `WorksStage` resolves a row, the census exempts `before` and `finished`, and every export reads the drawn week. |
| 70, 72 | §8.2, §8.5 (2), §9.1, §9.4, §9.6, §11.1 | PRESENT | PRESENT (carried); 72's cost now costed (VRC-13) | §12.4's S12c row. |
| 20 (h) | §9.1, §9.2, §11.1, §11.2, §11.4 | PRESENT | PRESENT, with VRC1-10 | The tier is shown in every answer and file; the wording "§2.8's marker" is stale against `factTier` (J-A20.23). |
| 73, 74, 75, 86, 87 | §11.4, §11.3, §11.2 | PRESENT (VRC-19) | PRESENT, with VRC1-11 | Doors (1) and (2) are the port's; door (3) is open to SettlementForge. |
| 77, 82, 85, 88 | §11.1, §9.1, §9.6, §11.1 – §11.3, §8.2 | PRESENT | PRESENT (carried) | Unchanged by the round. |
| 81 | §9.5, §11.4, §12.2 | PRESENT (VRC-20) | PRESENT, with VRC1-09 | The floor refusal is stated; the 120 000-cap refusal (J-A81.01) is missing here. |
| 101 | §8.2 `live.ghost`, §9.1, §9.3–§9.5, §11.1, §11.2, §12.6 | PARTIAL (VRC-01, VRC-16) | PRESENT, with VRC1-07, VRC1-08 | The oracle and the preview are under the key and the roles; regions are decided first. |

J rows: the new J-A101.85 and J-A72.82 and the restated J-A68.83, J-A68.84, J-A68.85 and J-A68.87 each have exactly one
index row and one Part A entry. Each Part A entry states the round's choice with its reason; the entries were read whole
(rationale l. 683–687, 766–767). All 138 J ids cited in the part resolve to index rows (723).

## 4 Checks

**SINGLE-SOURCE.** The round moved each repaired mechanism to its home and pointed the other places at it:
* the march is stated once, in §8.4 (c), and §12.5 and §12.7 cite it;
* the post-operation order is stated in §8.4 (f), with §8.2, §8.8 and §8.9 pointing to it;
* the light-map key is stated in §8.4 (f) and §8.8; §8.8's is the cache statement that §8.4 names ("(§8.8)");
* the full-precision surface is stated in §8.4 (g), with §8.8, §8.9, §12.8 and §13.4 citing it;
* item 54's ratios are only in §8.2 (VRC-10).

One count is still restated: §12.7 gives "(24 → 12 samples)" although §8.4 (c) holds the counts and says §12.7
"restate[s] no count" (VRC1-13).

**STALE.** None of the route's old rules is back: no lots as buildings, no binary wealth, no single market, no map writing
the dossier, no proprietary default, no `ShadowPass` (0 hits in the design and the rationale file), no "as before" or
"has always" narration. Stale wording remains in two places:
* "§2.8's marker" in §9.2, §11.1 and §11.2 and in J-A20.82, against `factTier` "derived at read, never stored"
  (VRC1-10, already raised by V-MC1-09 and VD1-11);
* J-A68.86's Part A entry, which still says the cells "carry … their readings' sections" (VRC1-16).

**CROSS-PART.**
* The round's hand-offs landed as the assembler reports: §5.2 F-LIGHT, §13.4's fallback, §16's 53 ms, J-A68.86's clause
  and P22–P24.
* §2.9's `light` default `'day'` and `sunMode` default `'cursor'` agree with §8.4 (d) and (e) as written. §7.8 says "its
  default is §8.4's".
* §4.7's `LightRule` now carries `sizeCm`, `colour` and `flicker`, and §2.7's `LightSource` reads them.
* Two cross-part notes addressed to rendering are not reflected:
  * scope note 3 (the 120 000 cap), which leaves §12.2 in conflict with §1.1 and J-A81.01 (VRC1-09);
  * scope note 4 / determinism's note ("marker"; VRC1-10).
* §11.2 names SettlementForge's clerk as a caller of "this API", but §11.3's bridge has no `preview` message (VRC1-18).

**DEFERRAL-WORDING.** None. "later" in §11.4 is the owner's Q2 ruling. "PLAUSIBLE until M2b" is an evidence grade with
its measuring milestone.

**BROKEN-REFERENCE.**
* The resolver finds 2 broken references, the pre-existing externals (`os-geometry.md` §2.1.4 and RFC 7946 §3.1.6).
* Every J id in the part resolves.
* §8.2's new row cites "§4.11 (4)", which is ambiguous: §4.11 holds three numbered lists, and the clock's (4) is "The
  cadence" (VRC1-14).

**NEW-PROBLEM.** VRC1-01 – VRC1-05, VRC1-08, VRC1-11 – VRC1-13 and VRC1-17 (§5). VRC1-03, VRC1-15, VRC1-17 and
VRC1-18 predate this round: they were already in the design at round 0 and verify-rendering-r0 missed them. They are
raised now because the round rewrote the subsections that hold them.

## 5 Issues (each with its owning part and the exact required change)

| id | sev. | kind | owner | item | claim | required change |
|---|---|---|---|---|---|---|
| VRC1-01 | major | new-problem | rendering | 68 | §8.4 (c) sets the global light's march length T as "the ground distance at which the ray passes the highest surface of the pixel's tile and its one-tile ring …, capped at that ring's far edge". A caster outside a pixel's ring is never sampled, so any shadow longer than one tile side ends on a tile-grid line. This contradicts (f)'s "so a shadow crosses tile edges seamlessly" and §8.3's similar-triangles tip rows. At the 1:500 stop a tile is 33.9 m at tile DPR 2 and 67.7 m at DPR 1. CONFIRMED by `docs/validation/bench/amendc_verify_rendering_r1_ring.out`: a 45 m tower under the default fixed sun (45°) casts a shadow that starts at the 33.9 m tile line instead of 26.4 m (the tip is at 25.0 m); a 30 m tower under a 15° path sun is cut at the 67.7 m line instead of 31.5 m; a 20 m control is not cut. | §8.4 (c): measure the global light's march over a world-distance window independent of the tile grid. "For the global light T is the ground distance at which the ray passes the highest surface within R of the pixel. For the fixed and path suns, R = min(8, cot altitude) × the tallest surface the document holds above the pixel's datum; for the cursor sun, R is the pixel's distance to G." §8.8's GPU paragraph: "the GPU pass reads the surface layers of the visible tiles and of every tile within R of them (k = ⌈R ÷ tile side⌉ rings)". §8.8's canvas budget counts those rings, and where they do not fit, the tier takes rung 2, then the vector rung (§8.4 (g)). §8.3 gains a bar: "a 45 m tower at the 1:500 stop under the fixed sun and under a 15° path sun: the shadow's start within 1 px of the similar-triangles tip on both sides of every tile line". Alternative, if the budget forbids it: keep the ring, fade a shadow over the ring's last quarter, state the exact-tip bar only for shadows no longer than one tile side, and record the fade as a judgment. |
| VRC1-02 | minor | new-problem | rendering | 68 | (c)'s march takes N fixed samples at t_k = T((k + ½) ÷ N)², so the spacing near distance t is 2√(T·t) ÷ N. A caster narrower than that spacing is hit at some pixels and missed at others, and its shadow comes out striped. CONFIRMED by the receipt's (2a): a 30 m × 6 m tower under a 15° path sun, with 6.3 m spacing at t = 90 m, gives 8 alternating runs and 130 of 1 118 samples lit inside its shadow. The controls (12 m wide; the same tower at 45°) give 2 runs. | (c): "each sample reads the greatest surface height over its interval [t_k − Δ_k ÷ 2, t_k + Δ_k ÷ 2], Δ_k the spacing there, from a max-height pyramid of the surface layer built with it by the same writer (one byte per texel, ⅓ more), in the CPU reference and the GPU pass alike", so no caster wider than a surface texel is skipped. §8.8 counts the pyramid. §8.3's bar: "the receipt's 6 m tower under a 15° path sun: one shadow run". |
| VRC1-03 | major | owner-fidelity | rendering (pipeline note) | 63 (c), 64, 68 | Lights are not filtered by the knowledge key. §8.4 (b) makes a light shaft of "every access, grate, well or opening that breaks the surface". II.7.4 says "every access that breaks the surface — is a light shaft" (l. 15552–15553). §4.7's `LightRule.host` includes `'accessPoint'`, and II.7.4's light rows put "a light at … the tunnels' junctions and access points". A concealed room's `Room.lit` light is a derived light. But §8.1's `LightTable` carries no knowledge column, and no rule in §8.4 or §8.8 keeps a light from the pass for a key that does not admit its host. The light-map key takes the knowledge key only while "the tile holds a concealed mark", not while the concealed host sits in the dilated margin. The exports list the lights unfiltered: dd2vtt "every `LightSource` lit … and on the underground layer its shafts", glTF "a point light per lit `LightSource`", GeoJSON "each lit `LightSource` as a Point". A secret access that §9.2 says "draws nothing" therefore shows as a column of daylight underground, and a concealed room as a glow inside its front: a trace of the concealed parts, against item 63 (c) and item 64. | §8.1 item 7: "a `light` mark whose host is a concealed part or a secret access or link — a concealed room's light, a `LightSource` hosted there, the shaft of such an access — carries its host's `concealed` and `knownTo` columns; the light pass, the light-map bake, the vector rung's `glow` and every export's lights (§11.1's dd2vtt, glTF and GeoJSON rows) take it only for a key that admits its host at the band". §8.4 (f) and §8.8's light-map key: "the knowledge key joins it while a concealed mark or such a light lies in the dilated tile". §8.3 row: "concealed parts at night and underground (items 63, 64, 68): a golden CITY with one front of each mode and one secret access, at `public` and `secret` — at `public` 0 lit pixels from a concealed or secret host's light or shaft, at `secret` the lights drawn". Cross-part (pipeline, II.7.4): the shaft sentence gains "a secret one lit only for a key that admits it (§8.4)". |
| VRC1-04 | minor | new-problem | rendering | 68 | §8.4 (f) says the post operations act "on the base picture alone … and a view agrees with a CPU-reference export of the same frame". On rungs 1–2 the GPU applies them to the composed bitmap, where the labels are already in (J-R21) and the base under a glyph is gone. An export applies them "before its labels are composed". The cell operations (`pixelate`, `dotScreen`) average over cells, so wherever a cell meets a glyph the view and the export differ, and nothing fixes the cells to one grid on the GPU and in the tile worker. | (f): "a cell operation (`pixelate`, `dotScreen`) averages only its cell's base, each pixel weighted by 1 − its unlit coverage — the CPU reference taking the coverage of the labels it will compose — over cells aligned to §8.8's world-aligned tiles on every path". Alternatively, narrow the claim: "a view agrees with a CPU-reference export of the same frame outside label and overlay pixels and the cells of a cell operation that meet them". |
| VRC1-05 | minor | conflict | rendering | 68 | §8.2 says "SVG carries greyscale, sepia and tint as colour-matrix filters on its base groups, over its lighting layer (§11.1)". §11.1's SVG row states no such placement: "the colour-matrix post operations as filters (§8.2); the light … `<g id="layer.light">`, multiplied over the base groups". A filter set on each base group, with `layer.light` or the glow sprites multiplied over it, re-colours a greyscale base: the defect VRC-05 fixed for rasters. | §11.1's SVG row: "the colour-matrix post operations as one filter on a wrapper group holding every base layer group, `layer.shadow`, the glow sprites and `layer.light`, under the label groups (§8.2, §8.4 (f))". §8.2's clause then points to it. |
| VRC1-06 | minor | partial | rendering | 68 | The round added four mechanisms and no bar proves any of them: `SunSpec.admits` precedence ((d)), `LightingSpec.defaultLight` ((e)), the post operations after the light ((f)), and the light-map key's re-bake on a view switch ((f), §8.8). T68-1 – T68-9 and §8.3's lighting rows do not cover them. | §8.3 gains four rows. (1) The `FTG` preset with a viewer's `sunMode` `cursor`, and `ink` under each of the three modes: `FTG` draws its fixed or path sun, `ink` the viewer's mode, and with no pointer or on rung 3 `fixed`. (2) The `night` preset chosen as `stylePreset` by a viewer with no `light` value, then set back to `day`: it opens at night and the viewer's change holds. (3) `greyscale`, `sepia` and `tint` under coloured night lights, a rungs 1–2 view against the CPU-reference export of the same frame: base pixels grey or sepia after the light, within §13.4's tolerance, labels unchanged. (4) `plotsOnly`, `depthBand`, a model-layer toggle and a knowledge-key change over a concealed mark, each toggled on a lit view: the lit tiles equal a fresh render after each toggle. |
| VRC1-07 | minor | partial | scope | 101, 63 (c) | §11.2 makes "`preview` … an editing role's call … a viewer's `preview` is refused (`status: 'refused'`, `reason: 'role'`) with nothing computed". §13.2 tests the `why` clauses (T30-5) but no bar tests the refusal. | §13.2 T30-5 appends: "a viewer's `preview` of any event returns `status: 'refused'`, `reason: 'role'`, with no fates, renames, counts or shape; an `editor`'s `preview` of the same event returns its dry run". |
| VRC1-08 | minor | new-problem | rendering | 101 | `PreviewResult` now admits `status: 'refused'`, but `fates: EditFate[]`, `renames: Rename[]` and `counts: {…}` remain required fields, while the rule says "nothing computed". | §11.2: `type PreviewResult = { status: 'refused'; reason: 'role' } \| { status: 'ok'\|'conflict'; actions?: …; fates: …; renames: …; counts: …; shape?: …; bent?: … }`. |
| VRC1-09 | minor | conflict | rendering | 81 | §12.2: "Requests outside the ladder are routed or clamped by §1.1's `LadderRouter`, and a dossier below the ladder's floor (1 500 people) is refused by the port instead". Read this way, a dossier above the cap is clamped. §1.1 (l. 344–345), §14's `PortResult` (l. 14141) and J-A81.01 refuse it: "a dossier above the 120 000 cap refused by the port". §11.4 names only the floor, so scope's r1 cross-part note 3 is not reflected. Pairs with VD1-01 (§7.7 item 15). | §12.2: "…, and a dossier outside the ladder — below 1 500 people, or above the 120 000 cap — is refused by the port instead (§7.7 item 15; §1.1; item 81; J-A81.01)". §11.4, after "…while none is registered (§7.7 item 15; item 81)": ", and one above the 120 000 cap the same way, naming the cap (§1.1; J-A81.01)". |
| VRC1-10 = V-MC1-09 = VD1-11 | minor | stale | rendering | 20 (h) | "§2.8's marker" appears in §9.2 (l. 11047), in §11.1's JSON row, skeleton row ("whose entities §2.8's marker labels `declared`") and *Authorship and tiers* (l. 11767, 11777, 11798), in §11.2's *Tiers* (l. 11981), and in J-A20.82's index row (l. 16921) and Part A entry. §2.8 derives the tier "at read by `factTier` … never a stored marker" (J-A20.23). | Replace each "by §2.8's marker" with "by §2.8's `factTier`". The skeleton row reads "whose entities §2.8's `factTier` reads `declared`". J-A20.82's row and entry say "by §2.8's `factTier`". Apply once, with the sibling ids. |
| VRC1-11 | minor | new-problem | rendering | 73, 85 | The round's reason for door (4), "since a provider must be registered from the module's own page", rests on no stated mechanism. No `PlatApi` call registers a `ContentProvider` (§11.2, §14). §6.5 (8) runs the double-run check "in two fresh workers", so a provider is code loaded into workers, not a function held by a page. Nothing in the design says an iframe-hosted module cannot load one. | §11.2's `PlatApi` gains `registerProvider(p: { id: string; version: string; moduleUrl: string }): Promise<{ status: 'ok' } \| { status: 'refused'; reason: 'nondeterministic' \| 'origin' }>`: the provider module is loaded into the generation worker and the check's two fresh workers, and its URL must be admitted by the embed's origin allowlist (§11.3). §11.4's door (4) sentence then states who may use it by that call. If the call admits a bridged host, replace "door (4) serves in-page embedders, since a provider must be registered from the module's own page …" with "door (4) stays open to it as to any host (`registerProvider`, §11.2)". |
| VRC1-12 | minor | new-problem | rendering | 68 | §8.8 and §12.8 put a lit export's float32 surface at "≈ 43 MB at A2 300 dpi, plus the margin's rows". Under (c)'s march the margin reaches one export tile (512 device px) above and below the band and beside it. The buffer can then reach 1 536 rows × 8 040 columns × 12 B ≈ 148 MB, 3.4× the stated figure (recomputed from the text's own terms). §12.8's pass bar "within the stated figure + 25 %" cannot be applied to an unquantified margin. | §8.8's print paragraph: "the CPU reference computes each export tile over its own window — the tile and its march window (§8.4 (c)), (3 × 512)² × 12 B ≈ 28 MB under a one-tile window — never a whole band's surface". §12.8 restates the figure as that window. Alternatively, state the margin's bound in rows (⌈R ÷ px⌉ each side, R per VRC1-01) and the resulting peak. |
| VRC1-13 | minor | duplicate | rendering | 68 | §12.7: "a bake that misses halves §8.4 (c)'s point-light march (24 → 12 samples)". §8.4 (c) holds the counts ("N = 24 for a point light (12 on every host once §12.7's pre-decided bake fallback is taken)") and says "§12.5 and §12.7 cost this march and restate no count". | §12.7: "a bake that misses halves §8.4 (c)'s point-light march on every host and in the CPU reference alike, …" (drop "(24 → 12 samples)"). |
| VRC1-14 | minor | broken-reference | rendering | 67 | §8.2's new row cites "(item 67 (f); §4.11 (4))". §4.11 holds three numbered lists (the carve's batches 1–4, the clock's 1–5 and *Works* 1–10), and the clock's (4) is "The cadence". | "(item 67 (f); §4.11's *Works* (4))", the form §2.9 and §8.5 use. |
| VRC1-15 | minor | partial | rendering | 67 | §4.11's *Works* (4) table: "repair — the decay stages backwards under a scaffold". §8.2's `states` rows are keyed by stage only, so a repair Works at `decaying`, `roofless` or `collapsed` draws the decay row with no scaffold. The owner's "things being roofless or other visuals" in repair has no drawing of its own. | §8.2's `states` gains: "building \| a `repair` Works at a decay stage (§4.11's *Works* (4)) \| all \| that stage's row with `scaffold` round the walls (override)". `StateRow` gains `worksKind?: WorksRow['kind']`, the row matching only that kind, or §8.2 states the overlay as a sentence. §8.3's Works census row adds a repair Works. |
| VRC1-16 | minor | stale | rendering | 68 | J-A68.86's Part A entry says "the FTG, NG and Fantasy Manor cells carry their builds and their readings' sections, their P-ids P22–P24". Since VRC-15 the cells in §8.4 (h) carry their builds and P-ids only. | "… carry their builds and their P-ids P22–P24 (the readings' sections are `research/findings/code-impact.md` §(d)'s) …". |
| VRC1-17 | minor | partial | rendering | 68 | The hand lantern (§8.4 (b): "a 20 cd source 1.5 m above the pointer's floor point, radius 6 m") moves with the pointer. It cannot be baked, because a moving pointer "invalidates nothing cached" (§8.8). Yet (f) says "per frame only the global light's term is evaluated". No path evaluates the lantern. | (f): "per frame the global light's term and the hand lantern's — a point light by (c)'s law and point-light march over the pixels within its radius — are evaluated on the GPU; an export or still, which has no pointer, draws no lantern". §12.5's frame budget adds the lantern (PLAUSIBLE until M2b). |
| VRC1-18 | minor | partial | rendering | 101 (b) | §11.2: "The tool API a clerk — the host's own, as SettlementForge's will be, or the staged built-in one — drives is this API, with nothing added for it". SettlementForge's configuration is "the module in an iframe on its own origin" speaking through §11.3's bridge. That vocabulary has `query` (so `why` reaches it) but no message for `preview`, so a host's clerk cannot put a proposal's ghost on the map. | §11.3's vocabulary. Host → PLAT: `preview { events, view? }`. PLAT → host: `preview.result { re, result: PreviewResult }` (an editing role's; a viewer's answered `refused`, §11.2). §11.2's clerk paragraph names the bridge message beside `preview`. The message is a hook with the port's host wiring (staged). |

## 6 Held parts (gate (a)) — none written in the part

Grep over §8, §9, §11 and §12 of the live design found none of the held parts:
* item 68 (g)'s "MFCG draws no cast shadows" is absent — "draws no cast shadow" appears only as our `MFCG` preset's
  behaviour (§8.2, §8.4 (h), J-A68.86);
* VG 1.6.9's shadow and night-light layers and Dwellings' shading and occlusion gradients are absent — VG 1.6.9 and
  Dwellings appear only in §8.10's sampler provenance, P14;
* item 52's "visibly differ", item 35's "160 of 162" and item 60's "16-cell" support are not in this part.

Released parts stand as round 0 applied them: item 59's timing in §12.7, labelled. Item 58 (f) belongs to II.2, and item
49's rejected deletion and item 37's release are not in this part.

## 7 Document checks and receipts

* `python3 docs/validation/bench/doc_checks.py --sections "8,9,11,12"` (allow file `docs/validation/doc-checks-allow.tsv`)
  ran on the live design `024c57da…`, with a corpus of 9 626 JSON files, 916 788 C3 3-grams and 478 C4 lists, and
  **exited 0**. Hits / unreviewed:

  | C1 | C2 | C3 | C4 | S1 | S2 |
  |---|---|---|---|---|---|
  | 5 / 0 | 0 / 0 | 155 / 0 | 1 / 0 | 0 / 0 | 0 / 0 |

  This lane edits no design text, so no allow row was added.
* `docs/validation/amendments-b/refs.py docs/ARCHITECTURE.md` counts 141 headings, 35 D ids, 720 J ids and **2 broken**
  references. The 2 are the pre-existing externals (`os-geometry.md` §2.1.4 and RFC 7946 §3.1.6).
* A wide scan of the part's J ids finds 138 cited, all among the 723 index rows. The P ids P22–P24 are rows of
  `research/findings/code-impact.md` §(d).
* Re-runs, byte-identical to the stored `.out` files: `amendc_repair_rendering_r1_light.py` (the repair's receipt: (A)
  worst 0.598, (B) 0 of 600 over the bound, (C) 1.0000 × albedo) and `amendc_rendering_palette.py`.
* New receipt, our own code and stdlib only: `docs/validation/bench/amendc_verify_rendering_r1_ring.{py,out}`.
  * Case (1): the tile-line cut of VRC1-01. With the 45 m tower, the ring-capped shadow starts at 33.9 m, on the tile line;
    the uncapped march starts it at 26.4 m, and the similar-triangles tip is 25.0 m. The 15° case is cut at 67.7 m against
    31.5 m. The 20 m control is not cut.
  * Case (2): the striping of VRC1-02 — 8 alternating runs against 2 in both controls.

## 8 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (quoted from the live text, executed, or recomputed from the text's own terms):
* all 28 FIXED verdicts;
* every item verdict;
* every quoted conflict and gap: VRC1-03 – VRC1-11 and VRC1-13 – VRC1-18;
* the arithmetic of VRC1-01 and VRC1-02 (executed receipt) and of VRC1-12 (1 536 × 8 040 × 12 B);
* the repair's worked cases re-computed: P = 35 / 24 / 12, the 163 / 85 / 171 / 124 / 73 / 61 MB figures, and the 262 ms
  critical path;
* the J-row and Part A counts, the resolver, the doc checks and both receipt re-runs.

**PLAUSIBLE** (the repairers' to confirm):
* the mechanisms the required changes choose — VRC1-01's world-distance window and its canvas cost, VRC1-02's max-height
  pyramid, VRC1-04's coverage-weighted cells, VRC1-11's `registerProvider` shape, VRC1-12's per-tile window and VRC1-18's
  bridge messages;
* the severity of VRC1-01 and VRC1-03 as major. VRC1-01 is visible on the default day view at the building band. VRC1-03
  is a trace of a concealed part, which item 63 (c) and item 64 rule out.
