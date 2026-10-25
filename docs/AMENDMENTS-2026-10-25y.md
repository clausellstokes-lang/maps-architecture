# Amendments y — the engine's scope: one engine for all of SettlementForge's levels (the owner's word of 2026-10-25)

> Written and applied by the managing session (Fable 5.1, session_01UZr7HWSaSZAuvVxtBo6UtD) on the owner's word of 2026-10-25 ~23:30Z, recorded in `docs/PROGRESS.md` as J501. The owner, verbatim: "Also, can you correct the rhetoric where appropriate claiming that this was made solely for the settlement map in its comments as we are now tuning it for all the levels?"

Numbered from **983** (file x ended at 982); item 983.

**APPLIED** by the managing session on 2026-10-25 (J501): the five fragments of item 983 applied to five files — `README.md` (the title and the first paragraph), `docs/DEFINITION.md` (a dated scope note under the title; the 2026-09-25 text kept as written), `docs/ARCHITECTURE.md` (a scope revision note in the existing style, before the 2026-10-17 revision note), `plat/README.md` (the first sentence) and `plat/package.json` (the workspace description). The two `plat/` files are M0-s-01's owns: its landed record was re-landed under lane `session/scope-2026-10-25` (`corepack pnpm landed -- M0-s-01 --touched …`), and `landed:verify -- flow-7` is red only on the three N-24 paths afterwards (Q91). The survey behind the item: the code under `plat/packages`, `plat/bench` and `plat/tools` carries NO comment or string that frames the engine as made solely for the settlement map (0 hits for "settlement map", "SettlementForge", "settlement layer", "for the settlement"); the claim lived only in the five documents above.

## The items

**983.** **The engine is one engine for all of SettlementForge's levels — the world level (volume 13), the settlement level (the base design) and the site level (volume 14) — and no document frames it as made solely for the settlement map.** The original framing of 2026-09-25 ("the settlement map layer") stays on the record as the framing of its day; current-state descriptions say the engine's scope as it is now tuned. Code comments are untouched: none makes the claim.

**983 (a).** The repository README — the title (edit). Target: `README.md`, line 1. Before: "Maps — PLAT, the settlement map generator for SettlementForge (design program)". After: "Maps — PLAT, the map engine for SettlementForge's levels: world, settlement and site (design program)".

**983 (b).** The repository README — the first paragraph (edit). Target: `README.md`, lines 3–5. The paragraph now names the three levels, says the code under `plat/` is being built (the earlier text said nothing here was built code yet — stale since M0's first wave), and cites this item for the widened framing.

**983 (c).** The definition — a scope note under the title (insertion, no rewrite). Target: `docs/DEFINITION.md`, after line 1. A dated blockquote: the 2026-09-25 definition framed the engine as the settlement map layer; the engine is now tuned for all levels; read "settlement map layer" as "the map engine at the settlement level"; the text below is kept as written.

**983 (d).** The architecture — a scope revision note (insertion, the existing revision-note style). Target: `docs/ARCHITECTURE.md`, before the "Revision — 2026-10-17" note. The base design is the settlement level; the world and site levels build on the same kernel and stages; no clause is narrowed to the settlement level by its wording alone.

**983 (e).** The workspace — its README's first sentence and its package description (edits). Targets: `plat/README.md`, lines 3–4 ("an original generator of settlement maps — villages, towns and cities …" → "an original map engine for SettlementForge — the world, its settlements (villages, towns and cities) and their sites … one engine tuned for all the levels"); `plat/package.json`, the `description` field ("the settlement map generator" → "the map engine for SettlementForge's levels (world, settlement, site)"). Owner M0-s-01; its record re-landed (above).

## Not items

- The `@plat/model` package's description ("the town model: records, identity, the Merkle digest, stage types") is a name for what the package holds today, not a claim of exclusivity; it changes when the world and site levels' records join it (volumes 13 and 14's requests, `docs/AMENDMENTS-2026-10-16k.md`).
- The town vocabulary inside `@plat/kernel`'s registries (KI-8, KI-9) is an extraction-hygiene matter, not rhetoric; it stays on the KI rows.
- The design volumes' own wording of the levels is the reconciliation pass's (PASS R over `claude/focused-cray-qhz855`, J491): the world-growth, experience and campaigns passes carry the levels' framing into the volumes, and this item's reading governs their reconciliation.
