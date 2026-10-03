from lib import *
t = extract(3360, 3446)
t = strip_narr_ids(t); t = strip_narr_more(t); t = strip_narr_tail(t); t = norm_items(t); t = norm_d5(t)
R = [
("""The village product is built on the finished base: it needs S1, the plot model and the one solver (M2b), the relief tier
(M2b), item 101's tools and the port's absorb half (M3a) and the epoch path (M4), and, for V-M3's clauses that run volume 6's steps, M6-E's E2–E4 (V07 §1's dependency (14)). Its milestones:""",
 """The village product is built on the finished base: its spike V-M0 on M0's kernel, M0 (b)'s tables and its own fixtures;
V-M1 onward on S1, the plot model and the one solver and the relief tier (M2b), item 101's tools and the port's absorb half
(M3a) and the epoch path (M4); V-M3's clauses that run V06's steps on M6-E's E2–E4 (V07 §1's facts (5)). Its milestones:"""),
("| **V-M0 — the tracker spike** | VS2 + VS3 + VS4 + the slot race on flat, river and coast sites at the VILLAGE target, headless;",
 "| **V-M0 — the tracker spike** | VS2 + VS3 + VS4 + the slot race on flat, river and coast sites at the VILLAGE target, headless — the sites the spike's own fixture terrains and water bodies, so no M2b stage is an input;"),
("the `VG` preset file (item 377): V07 §3.15's `VG` column and switches, V11's five `presets.VG` entries written by V11 §2.2's rule (V11 W68),",
 "the `VG` preset file (item 377): V07 §3.15's `VG` column and switches, V11's five `presets.VG` entries written by V11 §2.2's rule,"),
("`plat calibrate register --check` green over the cells it lands (*The register at the exits*, below) | 1.25–1.75 |",
 "`plat calibrate register --check` green over the cells it lands (*The register at the exits*, below), run once M1's lint (T-V12-20) is in, V-M0 running beside M1 | 1.25–1.75 |"),
("outlying farms (`D_o`)", "outlying farms (`N_o`)"),
("the market and harbour readings with the market halls' claims, the fair field and `rules.claimArea` (reconciliation round 3; priced inside this row's range),",
 "the market and harbour readings with the market halls' claims, the fair field and `rules.claimArea`; item 111's oasis village and water pull (V07 §3.2 (4a)) (each priced inside this row's range),"),
("T-V7-42, T-V7-45, T-V7-56;", "T-V7-42, T-V7-45, T-V7-56, T-V7-58, T-V7-64;"),
("`painterly` at the neighbourhood band with the crown bands and group shade;", "`painterly` at the neighbourhood band with the crown bands and group shade; the village `WhyProvider` (V07 §4.5); item 113 at village rungs (V07 §3.12a; with M6-E's replay engine, priced inside this row's range);"),
("T-V7-48 – T-V7-51, T-V7-53 – T-V7-55 —", "T-V7-48 – T-V7-51, T-V7-53 – T-V7-55, T-V7-59 (with M6-E), T-V7-60, T-V7-63 —"),
("T-V7-41, T-V7-44, T-V7-46, T-V7-47, T-V7-52, T-V7-57 (its fair-field clause at V-M2);", "T-V7-41, T-V7-44, T-V7-46, T-V7-47, T-V7-52, T-V7-57 (its fair-field clause at V-M2), T-V7-61, T-V7-62, T-V7-65;"),
("--check` green over the cells it lands — their entries from V12 §3.11's default line (`plat calibrate register\n--defaults`) unless",
 "--check` green over the cells it lands — their entries from V12 §3.11's default line (`plat calibrate register\n--defaults --milestone <V-M0 … V-M4 or V-M2u>`, the landing milestone's id in V12 §2.8's form) unless"),
]
t = apply(t, R, strict=False)
# 'Where it slots into §16' — J122 (V07-XCONF-1, CANON-C01)
i = t.index('**Where it slots into §16.**'); j = t.index('**Risks and spikes, in order.**')
slot = """**Where it slots into §16** (J122; Q1 decided (a), V07 §11). V-M0, the tracker spike, starts right after M0, on M0's
kernel, M0 (b)'s tables and its own fixtures, beside M1; V-M1 starts after M4, beside M5 (stage 2), M6-E (V06) and the plan
rung's first steps (V03); V-M2 and V-M3 follow it, V-M2 needing no M6-E step — the records placement on the absorb path and
its hooks land with item 202, `retypeLand` with the village product by item 209 — and V-M3's grow-path parts (the two
overrides, the dossier step's call of `village.records`, `village.pins`, the hand-offs by item 322's fold) running at item
202's call points on M4's grow path (J-V7.132) until V06's engine carries them into its phase interface (item 317); V-M3's
clauses that run V06's steps exit with M6-E — the desertion's street candidate and hollow ways (V06 §3.5.2 through
`ProductDeclEpoch.rows`, E2: T-V7-16, T-V7-30, T-V7-50's desertion clause), a claim-sized roster member's opening and the
counts (V06 §3.9.6, §3.9.1, E4), a ladder step carried by an epoch (V06 §3.9.11, E4: T-V7-35's promotion clause over
epochs), a carried raised way's decline (V06 §3.19.2, E3: T-V7-51, risk (8)) and item 113's replay (T-V7-59) — before E4 a
village epoch takes risk (10)'s rule; V-M2u follows V04's tail (M6-U). §16 and INDEX §4 carry the same slot. The estimate,
26.5–36.5 pw with V-M0 and V-M2u (items 110, 111 and 113 at village rungs priced inside V-M1–V-M3's ranges), is outside the
base's first total; item 568 computes the program's totals once and item 527 records this price beside §16's staged rows.
Staffing per the owner: the architecture and rulings on Fable seats, the build, verification and measurement on Opus
seats (§16).

"""
t = t[:i] + slot + t[j:]
R2 = [
("(V07 §1, dependencies (5) and (6)), reported,", "(V07 §1's facts (1) and (5)), reported,"),
("are item 202's (landed in file f's text, V07 §1, dependency\n(13));", "are item 202's;"),
("are item 202's (landed in file f's text, V07 §1, dependency (13));", "are item 202's;"),
("(10) **A village epoch on the grow path before M6-E** — the grow path", "(10) **A village epoch on the grow path before M6-E** — the grow path"),
]
t = apply(t, R2, strict=False)
t = t.replace("(item 202) (reconciliation rounds 5 and 6, SR4-01, J-V7.128, TW-01 – TW-03, SR5-02, J-V7.129 – J-V7.132; priced inside this row's range)", "(item 202; J-V7.128 – J-V7.132; priced inside this row's range)")
t = t.replace("(*Where it slots*, risk (10)) (reconciliation rounds 5 and 6, TV-02, TV-03, TW-03, TW-06, SR5-12; priced inside this row's range,", "(*Where it slots*, risk (10); priced inside this row's range,")
t = t.replace("**The register at the exits** (reconciliation round 3's continuation, SCC-R2C-16; X-V12-16; J-V7.124).", "**The register at the exits** (V12 §3.11; J-V7.124).")
save('19-s8.md', t)
print('ok', len(t.split()))
