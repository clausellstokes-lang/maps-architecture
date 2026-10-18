# Amendments received after the review's architects were queued (2026-09-25)

These owner rules reached the program after workflow 03 (run `wf_e306f20c-a9f`) had passed the point where its
prompts are fixed. They are already in `workflows/03-assess-design-validate.js` for any future run. When the review
completes, an AMENDMENT PASS (one Fable architect folding them into `docs/ARCHITECTURE.md` coherently, then a Fable
validator and an Opus verifier) applies them; until then the architecture may not mention them.

1. **Greenery by prosperity (base).** Trees and greens here and there, parks, and artificial landscapes (formal gardens,
   orchards, avenues, ornamental grounds) placed by rules reading prosperity and district type: rich quarters get
   gardens, parks and tree-lined ways; modest ones a green or an orchard at the edge; poor ones little. Yard planting
   follows the plot class. Same rule family as coverage and plot granularity.
2. **Floating islands, refined (toggle, after the neighbourhood stage).** No relation to the sewer/underground layer.
   An island may carry its own terrain, somewhat independent of but related to the ground (e.g. a magically conjured
   river echoing the ground river). An island exists for one of two reasons, by rule or assignment: a very prosperous
   neighbourhood (or set), or a unique institution — a palace overlooking the land, a cathedral, a prison isolating
   criminals.

3. **Height for shadows (base data model; stage-3 builder).** Every building, wing, tower and roof carries height values
   (floors, eave height, ridge height, tower height) even though the top-down view never shows them — "effectively
   imaginary" for now. A later SHADOW pass projects shadows from those heights and a sun vector; the display list keeps a
   shadow-layer hook from the start (Fantasy Manor spends ≈90 % of its render on its drop shadow — budget accordingly).

4. **Size ladders.** The town/city generator scales TOWN → CITY → METROPOLIS; the village generator (separate product)
   scales THORP → HAMLET → VILLAGE. Size classes, budgets, plot granularity and greenery rules are defined per rung.

5. **Everything is editable (base principle).** Every generated element (terrain, water, roads, districts, plots,
   buildings, walls, greenery, labels, layers) and every rule table and preset can be changed — by a user to fit their
   preference, and by us to change the system. Edits are first-class objects: they persist, undo, survive regeneration
   and migrate between versions; the generator repairs around them locally; a user preference/override layer sits above
   the defaults.

6. **Prosperity is a gradient and a band, not binary.** Wealth is a continuous field over the town: smooth gradients with
   predictable drivers (centre, market, main streets, gates, water/harbour, high vs low/damp/downwind ground, noxious
   trades, walls, prisons, institutions) plus a controlled random component; banded into classes only where a rule table
   needs one, while continuous rules (coverage, plot size, greenery, building scale) interpolate along it so quarters
   blend at their edges; dynamic over time (evolution moves the field) yet predictable in its drivers; editable.

7. **Adopted defaults (owner deferred, 2026-09-25; judgment table J10–J16).** Default look = clean ink (MFCG family),
   second preset FTG-like textured/lit, house style later. Era/region = high-to-late medieval Western Europe, corpus
   refines later. Fantasy only as named toggles; realism in the base. Browser-first embeddable library, permissive
   dependencies only. "Mastered" = owner's eye on side-by-sides at town/city/metropolis plus parity numbers. Original
   English-fantasy naming, setting packs later. Improvement weighting: realism, editability, plot texture > speed,
   export > novelty. The architecture's "Delegated decisions" section adopts these as decided.

(Add further owner rules below with their date; the amendment pass takes this file as its input.)
