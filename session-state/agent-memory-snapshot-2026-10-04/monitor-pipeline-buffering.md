---
name: monitor-pipeline-buffering
description: Monitor/tail pipelines silently swallow events if any stage block-buffers (cut does); use grep --line-buffered then awk with fflush()
metadata:
  type: feedback
---

On 2026-10-04 the session's Monitor watches (`tail -F docs/lane-events.log | grep --line-buffered … | cut -c1-200`) delivered no events for hours: `cut` block-buffers when its output is a pipe, so matched lines never left the buffer. An FTG slot stop (04:31) and a wave close went unreported, and the session told the owner the FTG programme was complete when its last slot had stopped.

**Why:** a silent watcher looks exactly like "nothing happened".

**How to apply:** in every Monitor pipeline, every stage must flush per line — `grep --line-buffered`, then `awk '{print substr($0,1,200); fflush()}'` for truncation; never `cut`, `head` or `sed` without `-u` mid-pipeline. Before reporting "all done", read the lane log directly rather than trusting a quiet monitor. Related: [[record-state-at-spawn-time]], [[maps-project-state]].
