# Correction to the final item 115 before filing (program manager, 2026-09-30 ~03:15 EDT)

Binding on the bundle's consistency check (items 114-116) and on the filed text.

**What the final chose.** "High magic" = SettlementForge's resolved word `magicLevel` 'high' (moderate and medium read low);
the magic slider `priorityMagic` unread; reading the slider at 75 or more named as the vetoable alternative.

**Why it is corrected.** The owner's words are the authority and they name the slider: "only high magic ON THE SLIDER allows
for floating islands in the initial generation", then "both high magic and high economy". Reviewer R8 (review-rules.md)
required the slider reading or an explicit risk statement; the final kept the word alone.

**The corrected clause (115).** HIGH MAGIC holds when the magic slider is high — SettlementForge's resolved
`config.priorityMagic` ≥ 75 (inclusive; the same threshold as item 115's economy clause, the program's pick, vetoable) — OR
SettlementForge's own resolved word `config.magicLevel` is 'high'; and NEVER when magic does not exist in the world
(`magicLevel` 'none' or `magicExists` false). Absent or out-of-range values: as the final rules for the economy (filled 50,
clamped, noted with value_absent / value_clamped). Standalone: the Magic control becomes a 0-100 slider (default 50, high at
75 or more) with a "no magic in this world" switch, mirroring SettlementForge's slider and its magicExists; its home and
labels as the final placed the None · Low · High control. Every place the final reads `magicLevel` 'high' alone (the gate
record, IslandRule.gate cells, V08's adapter row, V09's control, V10's lexicon, V11's cells, V12's fixtures '<dossier>@magic…',
tests T115-*) follows this clause; the fixture for high magic sets priorityMagic 100 (and, separately, the word 'high').
