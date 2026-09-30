#!/bin/sh
# Strict parse of a Workflow-tool script. node --check does NOT fail on backticks inside template literals, so parse
# the script the way the runtime does: as an async function body (top-level return allowed) with `export` stripped.
node --experimental-vm-modules --no-warnings --input-type=module -e "
import fs from 'node:fs'; import vm from 'node:vm';
let src = fs.readFileSync(process.argv[1],'utf8').replace(/^export const meta/m, 'const meta');
const wrapped = '(async () => {\n' + src + '\n})';
try { new vm.Script(wrapped, { filename: process.argv[1] }); console.log('STRICT PARSE OK'); }
catch (e) { console.log('PARSE ERROR:', e.message); console.log((e.stack||'').split('\n').slice(0,4).join('\n')); process.exit(1); }
" "$1"
