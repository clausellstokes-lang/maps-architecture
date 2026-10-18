#!/bin/sh
# M-1 W-03: the MFCG sweep by V12 §3.2.1's formula, 35 plan seeds (research/baselines/plan.json), ONE navigation each.
# Modelled on captures/mfcg/exports-sweep-2026-09-25/sweep.sh; the per-seed work is research/baselines/mfcg_sweep_m1.mjs
# (JSON by the URL export key, SVG by the app's Town window in the same load, screenshot before the window opens).
#   B=<live build index.html, from profiler/lib/common.mjs resolveTargetUrl('mfcg')> OUT=<capture folder> \
#   PROFILE=<scratch Chrome user-data-dir outside OUT> sh research/baselines/sweep_m1.sh
# Re-running resumes: seeds with an ok line in export-log.jsonl are skipped; loads.jsonl caps navigations at 35.
set -e
M=/Users/cstokes/Desktop/Maps
: "${B:?set B to the resolved build url}" "${OUT:?set OUT}" "${PROFILE:?set PROFILE}"
mkdir -p "$OUT"
echo "$(date '+%Y-%m-%d %H:%M:%S') df before: $(df -h /Users/cstokes | tail -1)" >> "$OUT/disk.log"
node "$M/research/baselines/mfcg_sweep_m1.mjs" --plan "$M/research/baselines/plan.json" --build "$B" --out "$OUT" \
  --profile "$PROFILE" --cap "${CAP:-35}" ${ONLY:+--only "$ONLY"}
echo "$(date '+%Y-%m-%d %H:%M:%S') df after: $(df -h /Users/cstokes | tail -1)" >> "$OUT/disk.log"
# stats.py: the 2026-09-25 lane's script, copied unchanged (it writes stats.json only into its own folder)
[ -f "$OUT/stats.py" ] || cp "$M/captures/mfcg/exports-sweep-2026-09-25/stats.py" "$OUT/stats.py"
cd "$M" && python3 "$OUT/stats.py" > "$OUT/stats.md"
