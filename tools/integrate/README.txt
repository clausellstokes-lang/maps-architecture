Scripts of the volumes/_integrate lane (2026-09-29). They regenerate docs/AMENDMENTS-2026-09-28f.md and re-run the
censuses of docs/volumes/_integrate.md. Order: python3 sec.py is a helper; run from the repo root with
INTEGRATE_SCRATCH=<a scratch dir>: (1) for each volume, sec.py <V*.md> 10 n > $INTEGRATE_SCRATCH/s10-<Vnn>.txt;
(2) bcrindex.py (needs arch order: gen_f.py reads arch-order.json, built by the inline step in the lane's log);
(3) bcrtext.py; (4) gen_f.py. cleanroom2.py needs ref-idents.json (the backticked code-shaped tokens of
research/findings/code-*.md, os-*.md, profile-*.md, ftg-payload-visual.md). hand.py <patterns> runs the hand-off census.
wsedit.py is the exact-match editor (asserts match counts). v01titles.json holds V01's request titles.
Continuation (2026-09-29): seccite.py (cross-volume "V0n §x" citations to sections the target lacks) and identcite.py
(backticked names on a line citing one other volume, absent from it, the base, f and g; a filtered list at the end) —
run from the repo root, output to stdout. The dossier-path, request, event-kind and substring clean-room censuses are
recorded in docs/volumes/_integrate.md §8.2–§8.3.
