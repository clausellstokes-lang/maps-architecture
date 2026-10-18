#!/usr/bin/env node
// W-02 helper (research-side; checklist sections A4 and H). Two uses:
//
//   node drive.mjs text | node ftg_text_summary.mjs [lines]
//       summarise a drive.mjs `text` reading: href, title, viewport, canvases, the first visible text lines, and the
//       items with their centres. It PRINTS ONLY and writes no file. Signed in (J163), it replaces the account's display
//       name ("Signed in as ..." and the line above "Your Settlements"), email addresses and long id-like tokens, so
//       that no account identifier reaches a file or a record.
//
//   node drive.mjs eval "$(node ftg_text_summary.mjs --hit '<regex>')"
//       prints the inspection expression that counts the elements matching <regex> (case-insensitive, on the trimmed
//       text) and lists the hit-testable ones (the same hit test drive.mjs clicktext uses: the element's centre must
//       hit the element itself) with their centres and whether they sit inside the open create dialog.
if (process.argv[2] === '--hit') {
  const re = JSON.stringify(process.argv[3] || '');
  console.log(`(() => { const re = new RegExp(${re}, 'i'); const hit = (e) => { const r = e.getBoundingClientRect(); if (r.width <= 2) return false; const t = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return !!t && (e === t || e.contains(t)); }; const dlg = (e) => { let a = e; while (a && !/^Create (New|Temporary) Settlement/.test((a.innerText || '').trim())) a = a.parentElement; if (!a) return false; const r = a.getBoundingClientRect(), q = e.getBoundingClientRect(); return q.left >= r.left && q.right <= r.right && q.top >= r.top && q.bottom <= r.bottom; }; const all = [...document.querySelectorAll('button,a,[role=button],[role=tab],label,input[type=submit]')].filter((e) => re.test((e.innerText || e.value || '').trim())); return JSON.stringify({ matches: all.length, hittable: all.filter(hit).map((e) => { const r = e.getBoundingClientRect(); return [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2), e.tagName, dlg(e)]; }) }); })()`);
  process.exit(0);
}
let buf = '';
process.stdin.on('data', (d) => { buf += d; });
process.stdin.on('end', () => {
  const red = (s) => String(s ?? '')
    .replace(/(Signed in as )[^\n"]+/g, '$1[name]')
    .replace(/^[^\n]*\n(Your Settlements)/m, '[name]\n$1')
    .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, '[email]')
    .replace(/\b[A-Za-z0-9_-]{24,}\b/g, (m) => '[id:' + m.length + ']');
  let o;
  try { o = JSON.parse(buf); } catch (e) { console.log('unparsed:', red(buf).slice(0, 2000)); return; }
  const maxLines = Number(process.argv[2] || 60);
  console.log('href:', red(o.href), '| title:', red(o.title), '| viewport:', JSON.stringify(o.viewport), '| canvases:', JSON.stringify(o.canvases));
  console.log('--- text (first ' + maxLines + ' lines) ---');
  console.log(red(o.text).split('\n').filter((l) => l.trim()).slice(0, maxLines).join('\n'));
  console.log('--- items ---');
  for (const it of o.items || []) console.log([it.tag, it.role || '', it.type || '', JSON.stringify(red(it.text)), it.checked === undefined ? '' : 'checked=' + it.checked, it.x + ',' + it.y, it.href ? red(it.href).replace(/^https:\/\/www\.fantasytowngenerator\.com/, '') : ''].filter(Boolean).join(' '));
});
