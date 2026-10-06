// @plat/testkit's clean-room content scanner (M0-k-06; §17.1 (5), §13.8; C-0101, C-0113, C-0247): normalisation 1,
// the salted digests, the token, 3-gram-run, colour, file and list checks, the reviewed allow entries and the report.
// Built now and tested on synthetic deny-lists; its run over M-1's denylist.json is M0-k-07's (AFTER-M-1). The folder
// was created empty by the scaffold's fix round (M0-s-01, C-0064) and belongs to M0-k-06.
export {
  coloursOf,
  LIST_WORD_MIN,
  listWordsOf,
  listWordsOfNormalised,
  normalise,
  NORMALISATION_VERSION,
  tokensOf,
  tokensOfNormalised,
  trigramItem,
} from './normalise.js';
export { DIGEST_CACHE_CAP, Digester, saltBytes, saltedDigest } from './digest.js';
export { denyListFrom, DIGEST_HEX_DIGITS, loadDenyList, type DenyList } from './denylist.js';
export { allowsFrom, loadAllows, type Allow, type AllowEntry } from './allow.js';
export { readSource, type SourceLine, type SourceText } from './lexer.js';
export { COLUMN_MIN_CELLS, readJson, type JsonString, type JsonText } from './json.js';
export { ALLOW_FILE, DENYLIST_FILE, readModeOf, scanFiles, SKIP_DIRS } from './scope.js';
export { allows, checkTexts, COLUMN_CELLS, fileTexts, LIST_HIT_WORDS, markdownColumns, scanTree, splitLines, TRIGRAM_RUN, type FileTexts, type ScanOptions } from './scan.js';
export { hitLine, PRINTED_HITS, runScan, scanArgs, SCAN_USAGE, type ScanRun } from './cli.js';
export { SCAN_CHECKS, ScanStop, type ReadMode, type ScanCheck, type ScanHit, type ScanReport } from './types.js';
