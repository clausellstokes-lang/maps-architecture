// M0-k-06: the clean-room content scanner (§17.1 (5), (8); C-0101, C-0247; N-23, N-26, N-32 – N-36; attachment C of
// docs/build/checks/M0-handoff-M1.md), tested on synthetic deny-lists the test builds with its own salt. The item's
// tests: a planted token, 3-gram run, colour, file and list are each found and named by file and line; a reviewed allow
// entry silences exactly its hit and an unreviewed hit fails the run; no matched token is ever printed; a missing list
// stops naming it and a normalisationVersion that is not 1 stops naming both; normalisation 1 on fixtures. Plus
// attachment C's known-answer digests and normalisation cases, and the hand-over rows' tests.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import {
  allowsFrom,
  coloursOf,
  denyListFrom,
  listWordsOf,
  markdownColumns,
  normalise,
  NORMALISATION_VERSION,
  readJson,
  readModeOf,
  readSource,
  runScan,
  saltBytes,
  saltedDigest,
  ScanStop,
  tokensOf,
  type ScanHit,
  type ScanRun,
} from '../../src/index.js';
import { cleanTemps, dig, syntheticList, tree, type ListSpec } from './support.js';

afterAll(cleanTemps);

const KAT_SALT = Uint8Array.from({ length: 32 }, (_, i) => i);

/** Runs the scan over a fixture tree. */
const scan = (root: string): ScanRun => runScan({ platRoot: root });
/** The hits as [file, line, check] (plus the list id and where for a list hit). */
const at = (r: ScanRun): (string | number)[][] =>
  (r.report?.hits ?? []).map((h: ScanHit) => (h.check === 'list' ? [h.file, h.line, h.check, h.list as number, h.where as string] : [h.file, h.line, h.check]));
const open = (r: ScanRun): ScanHit[] => (r.report?.hits ?? []).filter((h) => h.allowedBy === undefined);

// the planted items (invented)
const TOKEN = 'zebrum';
const RUN = ['orbel', 'qendra', 'tumvik', 'vaxholt', 'pidrel'];
const RUN_WINDOWS = [0, 1, 2].map((k) => RUN.slice(k, k + 3).join(' '));
const COLOUR = 'c0ffe3';
const FILE_BYTES = 'glimber trassle file body\n';
const WORDS = ['mubwick', 'snorvel', 'frindle', 'blurtak', 'quandle', 'yorvish'];
const SPEC: ListSpec = { tokens: [TOKEN], trigrams: RUN_WINDOWS, colours: [COLOUR], files: [FILE_BYTES], lists: [{ id: 41, words: WORDS }] };

describe('attachment C: the salted digest and normalisation 1 (§17.1 (5), (8); N-23)', () => {
  it("known-answer digests with the test salt 00..1f: 'abc' (and a file of those bytes), 'alpha beta gamma', 'zebrum'", () => {
    expect(saltedDigest(KAT_SALT, 'abc', 16)).toBe('42fd4a8c529fdb40');
    expect(saltedDigest(KAT_SALT, Buffer.from('abc'), 16)).toBe('42fd4a8c529fdb40');
    expect(saltedDigest(KAT_SALT, 'alpha beta gamma', 16)).toBe('997eba001a17c8d3');
    expect(saltedDigest(KAT_SALT, 'zebrum', 16)).toBe('3ed08da5d2df31e8');
  });

  it('the salt enters as its 32 bytes: the salt fed as its 64-character text is the wrong construction and never equals row one', () => {
    const hex = Buffer.from(KAT_SALT).toString('hex');
    const wrong = saltedDigest(Buffer.from(hex, 'utf8'), 'abc', 16);
    expect(wrong).toBe('c053f380bd02c003');
    expect(wrong).not.toBe('42fd4a8c529fdb40');
    expect(saltBytes(hex)).toEqual(KAT_SALT);
    expect(saltBytes(hex.toUpperCase())).toBeNull();
    expect(saltBytes(hex.slice(2))).toBeNull();
  });

  it("attachment C's normalisation cases", () => {
    expect(tokensOf('Zébrum_Plox')).toEqual(['zebrum', 'plox']);
    expect(tokensOf('ABC123def')).toEqual(['abc123def']);
    expect(tokensOf('x-ray 2x')).toEqual(['x', 'ray', '2x']);
    expect(tokensOf('ﬁle')).toEqual(['file']);
    expect(tokensOf('ALPHA  Beta\tgamma')).toEqual(['alpha', 'beta', 'gamma']);
    expect(NORMALISATION_VERSION).toBe(1);
  });

  it('NFKD first, marks removed, then lower-cased; a token is a maximal run of letters and digits', () => {
    expect(normalise('ÉCOLE')).toBe('ecole');
    expect(normalise('İstanbul')).toBe('istanbul'); // İ: NFKD gives I + combining dot, the mark removed, then lower
    expect(tokensOf('Ⅻ ①²')).toEqual(['xii', '12']); // compatibility forms
    expect(tokensOf('a_b-c.d')).toEqual(['a', 'b', 'c', 'd']);
    expect(tokensOf('')).toEqual([]);
  });

  it('list words (N-35): category-L runs of four or more letters, a digit bounding one inside a token', () => {
    expect(listWordsOf('Mubwick9 snorvel abc frindle2blurtak')).toEqual(['mubwick', 'snorvel', 'frindle', 'blurtak']);
    expect(listWordsOf('abc defg')).toEqual(['defg']);
  });

  it('colour candidates (N-34): # or lower-case 0x, exactly six hex digits, then a non-hex or the end; the digits lower-cased', () => {
    expect(coloursOf('#C0FFE3 0xc0ffe3; #c0ffe3')).toEqual(['c0ffe3', 'c0ffe3', 'c0ffe3']);
    expect(coloursOf('c0ffe3 #c0ffe3a 0Xc0ffe3 #c0ffe 0xc0ffe39')).toEqual([]);
    expect(coloursOf('#c0ffe3g')).toEqual(['c0ffe3']);
  });
});

describe('the five checks, each found and named by file and line (the item test; C-0101)', () => {
  it('a planted token, a planted in-order 3-gram run, a planted colour, a planted file and a planted list of five words', () => {
    const root = tree(
      {
        'packages/kernel/src/a.ts': `export const x = 1;\nconst s = 'the ${TOKEN} here';\n`,
        'packages/layout/src/b.ts': `// one comment\n// ${RUN.join(' ')}\n`,
        'packages/tables/data/c.json': `{\n  "fill": "#${COLOUR}"\n}\n`,
        'docs/digest/d.bin': FILE_BYTES,
        'docs/digest/e.md': `# heading\n\nprose\n${WORDS.slice(0, 5).join(', ')}\n`,
        'tools/clean.mjs': '// nothing listed here\n',
      },
      syntheticList(SPEC),
    );
    const r = scan(root);
    expect(r.code).toBe(1);
    expect(at(r)).toEqual([
      ['docs/digest/d.bin', 0, 'file'],
      ['docs/digest/e.md', 4, 'list', 41, 'line'],
      ['packages/kernel/src/a.ts', 2, 'token'],
      ['packages/layout/src/b.ts', 2, 'trigram'],
      ['packages/tables/data/c.json', 2, 'colour'],
    ]);
    expect(r.report?.counts).toEqual({ token: 1, trigram: 1, colour: 1, file: 1, list: 1, hits: 5, allowed: 0, unreviewed: 5 });
    expect(r.lines).toContain('scan: unreviewed token hit at packages/kernel/src/a.ts:2');
    expect(r.lines).toContain('scan: unreviewed list hit at docs/digest/e.md:4 (list 41, this line)');
    expect(r.lines).toContain('scan: unreviewed file hit at docs/digest/d.bin');
  });

  it('a clean tree exits 0 with every file counted, the deny-list and the allow file never scanned', () => {
    const root = tree({ 'packages/kernel/src/a.ts': "const s = 'ordinary words only';\n", 'docs/digest/README.md': 'plain\n' }, syntheticList(SPEC));
    const r = scan(root);
    expect(r.code).toBe(0);
    expect(r.report?.files.scanned).toBe(2);
    expect(r.report?.counts.hits).toBe(0);
  });

  it('the spell-check exclusion: a listed token that is also in the spell set is no token hit', () => {
    const root = tree({ 'packages/kernel/src/a.ts': `const s = '${TOKEN}';\n` }, syntheticList({ ...SPEC, spell: [TOKEN] }));
    expect(scan(root).code).toBe(0);
  });

  it('the same token twice on one line is one hit; on two lines two hits', () => {
    const root = tree({ 'packages/kernel/src/a.ts': `const s = '${TOKEN} ${TOKEN}';\nconst t = '${TOKEN}';\n` }, syntheticList(SPEC));
    expect(at(scan(root))).toEqual([
      ['packages/kernel/src/a.ts', 1, 'token'],
      ['packages/kernel/src/a.ts', 2, 'token'],
    ]);
  });

  it('two runs of one report are identical (the walk is ordered, nothing random)', () => {
    const root = tree({ 'b/x.ts': "'zebrum'\n", 'packages/a.ts': `'${TOKEN}'\n`, 'packages/b.ts': `'${RUN.join(' ')}'\n` }, syntheticList(SPEC));
    expect(scan(root).text).toBe(scan(root).text);
  });
});

describe('allow entries (§17.1 (5): a hit fails unless a reviewed allow entry with a written reason exists)', () => {
  const files = {
    'packages/kernel/src/a.ts': `const s = '${TOKEN}';\nconst t = '${RUN.join(' ')}';\nconst c = '#${COLOUR}';\n`,
    'docs/digest/d.bin': FILE_BYTES,
    'docs/digest/e.md': `${WORDS.slice(0, 5).join(' ')}\n`,
    'packages/model/src/b.ts': `const s = 'plox';\n`,
  };
  const spec = { ...SPEC, tokens: [TOKEN, 'plox'] };

  it('an entry silences exactly its hit: the other token hit stays and fails the run', () => {
    const root = tree(files, syntheticList(spec), [{ check: 'token', text: 'ZÉBRUM', reason: 'an invented word of our own' }]);
    const r = scan(root);
    expect(r.code).toBe(1);
    expect(r.report?.counts.allowed).toBe(1);
    expect(open(r).map((h) => [h.file, h.line, h.check])).toEqual([
      ['docs/digest/d.bin', 0, 'file'],
      ['docs/digest/e.md', 1, 'list'],
      ['packages/kernel/src/a.ts', 2, 'trigram'],
      ['packages/kernel/src/a.ts', 3, 'colour'],
      ['packages/model/src/b.ts', 1, 'token'],
    ]);
    expect(r.report?.hits.find((h) => h.check === 'token' && h.allowedBy === 0)?.file).toBe('packages/kernel/src/a.ts');
  });

  it('an entry for every hit, each by its exact text, passes the run (exit 0) and every entry is used', () => {
    const entries = [
      { check: 'token', text: TOKEN, reason: 'r1' },
      { check: 'token', text: 'plox', reason: 'r2', file: 'packages/model/src/b.ts' },
      { check: 'trigram', text: RUN.join(' '), reason: 'r3' },
      { check: 'colour', text: `#${COLOUR.toUpperCase()}`, reason: 'r4' },
      { check: 'file', text: 'docs/digest/d.bin', reason: 'r5' },
      { check: 'list', text: WORDS.slice(0, 5).join(', '), reason: 'r6' },
    ];
    const r = scan(tree(files, syntheticList(spec), entries));
    expect(r.code).toBe(0);
    expect(r.report?.counts).toMatchObject({ hits: 6, allowed: 6, unreviewed: 0 });
    expect(r.report?.unusedAllow).toEqual([]);
  });

  it('an entry of another check, another file, an altered run or four of the five words silences nothing', () => {
    const entries = [
      { check: 'trigram', text: `${TOKEN} a b c d`, reason: 'wrong check' },
      { check: 'token', text: 'plox', reason: 'wrong file', file: 'packages/kernel/src/a.ts' },
      { check: 'trigram', text: RUN.slice(0, 4).concat(['zzz']).join(' '), reason: 'not the run' },
      { check: 'list', text: WORDS.slice(0, 4).concat(['other']).join(' '), reason: 'not the words' },
      { check: 'colour', text: 'c0ffe4', reason: 'another colour' },
      { check: 'file', text: 'docs/digest/e.md', reason: 'another file' },
    ];
    const r = scan(tree(files, syntheticList(spec), entries));
    expect(r.code).toBe(1);
    expect(r.report?.counts.allowed).toBe(0);
    expect(r.report?.unusedAllow).toEqual([0, 1, 2, 3, 4, 5]);
  });

  // N-33: "an allow entry's exact text is the run" — a true part of a run, a run holding it, or a part of a token is
  // not its text (check B-1 of M0-k-06: mutants matching a sub-run, a super-run or a sub-token survived the case above).
  it('near misses stay unreviewed: a five-token entry inside a six-token run, a six-token entry holding a five-token run, a token entry inside or around a listed token', () => {
    const RUN6 = [...RUN, 'lomvar'];
    const windows6 = [0, 1, 2, 3].map((k) => RUN6.slice(k, k + 3).join(' '));
    const cases: { name: string; files: Record<string, string>; spec: ListSpec; miss: object; exact: object; check: 'trigram' | 'token' }[] = [
      {
        name: 'sub-run',
        files: { 'packages/kernel/src/a.ts': `// ${RUN6.join(' ')}\n` },
        spec: { trigrams: windows6 },
        miss: { check: 'trigram', text: RUN6.slice(0, 5).join(' '), reason: 'the first five of six' },
        exact: { check: 'trigram', text: RUN6.join(' '), reason: 'the run' },
        check: 'trigram',
      },
      {
        name: 'super-run',
        files: { 'packages/kernel/src/a.ts': `// ${RUN.join(' ')}\n` },
        spec: { trigrams: RUN_WINDOWS },
        miss: { check: 'trigram', text: RUN6.join(' '), reason: 'six tokens holding the five' },
        exact: { check: 'trigram', text: RUN.join(' '), reason: 'the run' },
        check: 'trigram',
      },
      {
        name: 'sub-token',
        files: { 'packages/kernel/src/a.ts': `const s = '${TOKEN}x';\n` },
        spec: { tokens: [`${TOKEN}x`] },
        miss: { check: 'token', text: TOKEN, reason: 'a part of the token' },
        exact: { check: 'token', text: `${TOKEN}x`, reason: 'the token' },
        check: 'token',
      },
      {
        name: 'super-token',
        files: { 'packages/kernel/src/a.ts': `const s = '${TOKEN}';\n` },
        spec: { tokens: [TOKEN] },
        miss: { check: 'token', text: `${TOKEN}x`, reason: 'a token holding the listed one' },
        exact: { check: 'token', text: TOKEN, reason: 'the token' },
        check: 'token',
      },
    ];
    for (const c of cases) {
      const miss = scan(tree(c.files, syntheticList(c.spec), [c.miss]));
      expect([c.name, miss.code]).toEqual([c.name, 1]);
      expect([c.name, miss.report?.counts[c.check], miss.report?.counts.hits]).toEqual([c.name, 1, 1]);
      expect([c.name, miss.report?.counts.allowed, miss.report?.counts.unreviewed]).toEqual([c.name, 0, 1]);
      expect([c.name, miss.report?.unusedAllow]).toEqual([c.name, [0]]);
      // the control: the exact text silences the same hit, so the miss above is not vacuous
      const exact = scan(tree(c.files, syntheticList(c.spec), [c.exact]));
      expect([c.name, exact.code, exact.report?.counts.allowed, exact.report?.unusedAllow]).toEqual([c.name, 0, 1, []]);
    }
  });

  it('a malformed entry stops the scan naming the allow file and the entry; so does a missing allow file', () => {
    const noReason = scan(tree(files, syntheticList(spec), [{ check: 'token', text: TOKEN, reason: ' ' }]));
    expect(noReason.code).toBe(2);
    expect(noReason.lines.join('\n')).toContain('packages/testkit/baselines/denylist-allow.json: entry 0: a written reason is required');
    expect(noReason.report).toBeUndefined();
    const missing = scan(tree(files, syntheticList(spec), null));
    expect(missing.code).toBe(2);
    expect(missing.lines.join('\n')).toContain('denylist-allow.json: missing file');
    expect(() => allowsFrom({}, 'f')).toThrow(ScanStop);
    expect(() => allowsFrom([{ check: 'tokens', text: 'a', reason: 'b' }], 'f')).toThrow(/entry 0: check is not one of/);
    expect(() => allowsFrom([{ check: 'token', text: 'two words', reason: 'b' }], 'f')).toThrow(/one token/);
    expect(() => allowsFrom([{ check: 'trigram', text: 'a b c d', reason: 'b' }], 'f')).toThrow(/five or more tokens/);
    expect(() => allowsFrom([{ check: 'list', text: 'alpha beta gamma delta', reason: 'b' }], 'f')).toThrow(/five or more words/);
    expect(() => allowsFrom([{ check: 'colour', text: '#12345', reason: 'b' }], 'f')).toThrow(/six hex digits/);
    expect(() => allowsFrom([{ check: 'token', text: 'a', reason: 'b', extra: 1 }], 'f')).toThrow(/unknown member extra/);
  });

  it("the committed denylist-allow.json is a valid allow file, each entry with a written reason (M0-k-06 creates it [] for M0-k-07's review)", () => {
    const text = readFileSync(join(import.meta.dirname, '../../baselines/denylist-allow.json'), 'utf8');
    expect(() => allowsFrom(JSON.parse(text), 'denylist-allow.json')).not.toThrow();
  });
});

describe('the scanner never prints a matched token, only its location and check', () => {
  it('neither the printed lines nor the report hold any planted token, word, 3-gram, colour or file content', () => {
    const root = tree(
      {
        'packages/kernel/src/a.ts': `const s = '${TOKEN}'; // ${RUN.join(' ')}\nconst c = '#${COLOUR}';\n`,
        'packages/tables/data/t.json': `["${WORDS.join('", "')}"]\n`,
        'docs/digest/f.txt': FILE_BYTES,
      },
      syntheticList(SPEC),
    );
    const r = scan(root);
    expect(r.code).toBe(1);
    expect(r.report?.counts).toMatchObject({ token: 1, trigram: 1, colour: 1, file: 1 });
    expect(r.report?.counts.list).toBeGreaterThanOrEqual(1);
    const out = `${r.lines.join('\n')}\n${r.text ?? ''}`.toLowerCase();
    for (const s of [TOKEN, ...RUN, COLOUR, ...WORDS, 'glimber', 'trassle']) expect(out).not.toContain(s);
    // nor any digest of them under the test salt
    for (const s of [TOKEN, COLOUR, ...WORDS, ...RUN_WINDOWS]) expect(out).not.toContain(dig(s));
  });
});

describe('the deny-list is read or the scan stops naming it (never a vacuous pass; C-0101, N-23)', () => {
  it('a missing deny-list file stops the scan naming the file', () => {
    const r = scan(tree({ 'packages/kernel/src/a.ts': `'${TOKEN}'\n` }));
    expect(r.code).toBe(2);
    expect(r.lines).toEqual([expect.stringContaining('packages/testkit/baselines/denylist.json: missing file')]);
    expect(r.report).toBeUndefined();
  });

  it('a normalisationVersion that is not 1 stops the scan naming both versions', () => {
    const r = scan(tree({ 'packages/kernel/src/a.ts': `'${TOKEN}'\n` }, syntheticList(SPEC, { normalisationVersion: 2 })));
    expect(r.code).toBe(2);
    expect(r.lines[0]).toContain('denylist.json');
    expect(r.lines[0]).toContain('normalisationVersion 2');
    expect(r.lines[0]).toContain("the scanner's normalisationVersion 1");
    const absent = syntheticList(SPEC);
    delete absent['normalisationVersion'];
    expect(scan(tree({ 'a.ts': '1\n' }, absent)).lines[0]).toContain('normalisationVersion absent');
  });

  it('digestHexDigits absent or other than 16 stops the scan naming the field and its value (N-23)', () => {
    for (const [v, shown] of [[undefined, 'absent'], [15, '15'], [64, '64'], ['16', '"16"']] as const) {
      const l = syntheticList(SPEC);
      if (v === undefined) delete l['digestHexDigits'];
      else l['digestHexDigits'] = v;
      const r = scan(tree({ 'a.ts': '1\n' }, l));
      expect(r.code).toBe(2);
      expect(r.lines[0]).toContain(`digestHexDigits ${shown} is not 16`);
    }
  });

  it('a list failing attachment C\'s form (an unsorted array, a 15-digit digest, a missing class) or unreadable JSON stops naming it', () => {
    const unsorted = syntheticList({ tokens: ['a', 'b', 'c'] });
    unsorted['tokens'] = [...(unsorted['tokens'] as string[])].reverse();
    expect(scan(tree({ 'a.ts': '1\n' }, unsorted)).lines[0]).toMatch(/denylist\.json: not a plat\.denylist\/1 file: tokens\[1\]: out of ascending order/);
    const short = syntheticList({ tokens: ['a'] });
    short['tokens'] = ['0123456789abcde'];
    expect(scan(tree({ 'a.ts': '1\n' }, short)).lines[0]).toContain('tokens[0]: not a digest of 16 lower-case hex digits');
    const missing = syntheticList(SPEC);
    delete missing['spell'];
    expect(scan(tree({ 'a.ts': '1\n' }, missing)).lines[0]).toContain('top: spell missing');
    const bad = scan(tree({ 'a.ts': '1\n' }, '{"schema": '));
    expect(bad.code).toBe(2);
    expect(bad.lines[0]).toContain('denylist.json: not readable JSON');
    expect(() => denyListFrom([], 'x')).toThrow(ScanStop);
  });

  it('a tree with no file to scan stops (never a vacuous pass, §13.8 Edges)', () => {
    const r = scan(tree({}, syntheticList(SPEC)));
    expect(r.code).toBe(2);
    expect(r.lines[0]).toContain('no file to scan');
  });
});

describe('normalisation 1 on fixtures (the item test)', () => {
  it('an upper-case, accented token digests like its lower-case plain form', () => {
    const r = scan(tree({ 'packages/kernel/src/a.ts': "const s = 'ZÉBRUM';\nconst t = 'Zébrüm';\n" }, syntheticList(SPEC)));
    expect(at(r)).toEqual([
      ['packages/kernel/src/a.ts', 1, 'token'],
      ['packages/kernel/src/a.ts', 2, 'token'],
    ]);
  });

  it('a 3-gram across a line break is not formed (a comment, a template, a string escape, a whole-text file)', () => {
    const split = `${RUN.slice(0, 3).join(' ')}\n${RUN.slice(3).join(' ')}`;
    const r = scan(
      tree(
        {
          'packages/kernel/src/a.ts': `/* ${split} */\nconst t = \`${split}\`;\nconst u = '${RUN.slice(0, 3).join(' ')}\\n${RUN.slice(3).join(' ')}';\n`,
          'docs/digest/b.md': `${split}\n`,
        },
        syntheticList(SPEC),
      ),
    );
    expect(r.code).toBe(0);
    // the same run on one line of each is found
    const one = RUN.join(' ');
    const r2 = scan(tree({ 'packages/kernel/src/a.ts': `/* ${one} */\nconst t = \`${one}\`;\n`, 'docs/digest/b.md': `${one}\n` }, syntheticList(SPEC)));
    expect(at(r2)).toEqual([
      ['docs/digest/b.md', 1, 'trigram'],
      ['packages/kernel/src/a.ts', 1, 'trigram'],
      ['packages/kernel/src/a.ts', 2, 'trigram'],
    ]);
  });

  it('a colour value in upper case digests like the lower-case form', () => {
    const r = scan(tree({ 'packages/tables/data/c.json': `{"a": "#${COLOUR.toUpperCase()}"}\n` }, syntheticList(SPEC)));
    expect(at(r)).toEqual([['packages/tables/data/c.json', 1, 'colour']]);
  });
});

describe('the 3-gram run (N-33: a hit is three or more adjacent listed 3-grams)', () => {
  const t = (line: string): ScanRun => scan(tree({ 'docs/digest/r.md': `${line}\n` }, syntheticList(SPEC)));
  it('five tokens in a row with all three windows listed: one hit', () => {
    expect(at(t(`before ${RUN.join(' ')} after`))).toEqual([['docs/digest/r.md', 1, 'trigram']]);
  });
  it('a lone listed 3-gram and two adjacent ones give 0 hits', () => {
    expect(t(RUN.slice(0, 3).join(' ')).code).toBe(0);
    expect(t(RUN.slice(0, 4).join(' ')).code).toBe(0);
    expect(t(`${RUN.slice(0, 4).join(' ')} x ${RUN.slice(1).join(' ')}`).code).toBe(0);
  });
  it('a six-token run is reported once, not as two runs; two separate runs on one line are two hits', () => {
    const six = scan(tree({ 'docs/digest/r.md': `a b c d e f\n` }, syntheticList({ trigrams: ['a b c', 'b c d', 'c d e', 'd e f'] })));
    expect(six.report?.counts.trigram).toBe(1);
    const two = t(`${RUN.join(' ')} gap ${RUN.join(' ')}`);
    expect(two.report?.counts.trigram).toBe(1); // the same run twice on one line is one hit (one exact text)
    const other = scan(tree({ 'docs/digest/r.md': `${RUN.join(' ')} gap a b c d e\n` }, syntheticList({ trigrams: [...RUN_WINDOWS, 'a b c', 'b c d', 'c d e'] })));
    expect(other.report?.counts.trigram).toBe(2);
  });
  it('the windows must be in list order: the run reversed gives 0 hits', () => {
    expect(t([...RUN].reverse().join(' ')).code).toBe(0);
  });
});

describe('the colour hit (N-34)', () => {
  const c = (text: string): ScanRun => scan(tree({ 'packages/tables/data/c.json': `{"a": "${text}"}\n` }, syntheticList(SPEC)));
  it('the # form and the 0x form of one listed value are each found; upper-case digits too', () => {
    expect(c(`#${COLOUR}`).report?.counts.colour).toBe(1);
    expect(c(`0x${COLOUR}`).report?.counts.colour).toBe(1);
    expect(c(`#${COLOUR.toUpperCase()}`).report?.counts.colour).toBe(1);
  });
  it('the six digits with no prefix, with a seventh hex digit, or after 0X give 0 hits', () => {
    expect(c(COLOUR).code).toBe(0);
    expect(c(`#${COLOUR}a`).code).toBe(0);
    expect(c(`0X${COLOUR}`).code).toBe(0);
  });
  it('in a source, a colour in code (a hex number) is found as well as one in a string (C-0247)', () => {
    const r = scan(tree({ 'packages/kernel/src/k.ts': `export const K = 0x${COLOUR};\nconst s = '#${COLOUR}';\nconst n = 0x${COLOUR}ff;\n` }, syntheticList(SPEC)));
    expect(at(r)).toEqual([
      ['packages/kernel/src/k.ts', 1, 'colour'],
      ['packages/kernel/src/k.ts', 2, 'colour'],
    ]);
  });
});

describe('the list hit (N-35; §17.1 (5): five or more distinct words of one list on a line or a column of a table)', () => {
  const l = (line: string, spec: ListSpec = SPEC): ScanRun => scan(tree({ 'docs/digest/l.md': `${line}\n` }, syntheticList(spec)));
  it('a line of five listed words is found; with a digit appended to its first word still found', () => {
    expect(at(l(WORDS.slice(0, 5).join(' ')))).toEqual([['docs/digest/l.md', 1, 'list', 41, 'line']]);
    expect(l(`${WORDS[0] as string}9 ${WORDS.slice(1, 5).join(' ')}`).report?.counts.list).toBe(1);
  });
  it('four listed words, or five where one repeats, give 0 hits; the order of the words does not matter', () => {
    expect(l(WORDS.slice(0, 4).join(' ')).code).toBe(0);
    expect(l(`${WORDS.slice(0, 4).join(' ')} ${WORDS[0] as string}`).code).toBe(0);
    expect(l([...WORDS.slice(0, 5)].reverse().join(' ')).report?.counts.list).toBe(1);
  });
  it('a planted word of three letters never counts', () => {
    const spec = { lists: [{ id: 3, words: ['abc', ...WORDS.slice(0, 4)] }] };
    expect(l(`abc ${WORDS.slice(0, 4).join(' ')}`, spec).code).toBe(0);
  });
  it('a list member holding a digit contributes no word: four listed words plus that member give 0 hits', () => {
    const spec = { lists: [{ id: 5, words: [...WORDS.slice(0, 4), 'tango9'] }] };
    expect(l(`${WORDS.slice(0, 4).join(' ')} tango9`, spec).code).toBe(0);
  });
  it('words of two lists: a hit only for the list holding five of them', () => {
    const spec = { lists: [{ id: 1, words: WORDS.slice(0, 3) }, { id: 2, words: WORDS.slice(0, 5) }, { id: 3, words: WORDS.slice(3) }] };
    expect(at(l(WORDS.join(' '), spec))).toEqual([['docs/digest/l.md', 1, 'list', 2, 'line']]);
  });
  it('a column of a Markdown table holding five listed words over its rows is a column hit at its first line', () => {
    const md = ['intro', '| name | n |', '|---|---:|', ...WORDS.slice(0, 5).map((w, k) => `| ${w} | ${k} |`), 'after'].join('\n');
    const r = scan(tree({ 'docs/digest/t.md': `${md}\n` }, syntheticList(SPEC)));
    expect(at(r)).toEqual([['docs/digest/t.md', 2, 'list', 41, 'column']]);
    expect(markdownColumns(['| a | b |', '|---|---|', '| c \\| d | e |'])).toEqual([
      { line: 1, cells: [' a ', ' c \\| d '] },
      { line: 1, cells: [' b ', ' e '] },
    ]);
  });
  it('a column needs three cells: five listed words over two cells give 0 hits, over three cells one column hit', () => {
    const two = `[\n  { "n": "${WORDS.slice(0, 3).join(' ')}" },\n  { "n": "${WORDS.slice(3, 5).join(' ')}" }\n]\n`;
    expect(scan(tree({ 'packages/tables/data/two.json': two }, syntheticList(SPEC))).code).toBe(0);
    const three = `[\n  { "n": "${WORDS.slice(0, 2).join(' ')}" },\n  { "n": "${WORDS.slice(2, 4).join(' ')}" },\n  { "n": "${WORDS[4] as string}" }\n]\n`;
    expect(at(scan(tree({ 'packages/tables/data/three.json': three }, syntheticList(SPEC))))).toEqual([['packages/tables/data/three.json', 2, 'list', 41, 'column']]);
    // a Markdown column's header is one of its cells: a header and one row are two cells (0 hits), with a second row three
    const md = [`| ${WORDS.slice(0, 3).join(' ')} |`, '|---|', `| ${WORDS.slice(3, 5).join(' ')} |`];
    expect(scan(tree({ 'docs/digest/t.md': `${md.join('\n')}\n` }, syntheticList(SPEC))).code).toBe(0);
    expect(at(scan(tree({ 'docs/digest/t.md': `${[...md, '| x |'].join('\n')}\n` }, syntheticList(SPEC))))).toEqual([['docs/digest/t.md', 1, 'list', 41, 'column']]);
  });

  it('a JSON table (one field across records) and a JSON list of strings, one item per line, are columns', () => {
    const recs = `[\n${WORDS.slice(0, 5).map((w, k) => `  { "name": "${w}", "n": ${k} }`).join(',\n')}\n]\n`;
    const arr = `{\n  "names": [\n${WORDS.slice(0, 5).map((w) => `    "${w}"`).join(',\n')}\n  ]\n}\n`;
    const r = scan(tree({ 'packages/tables/data/a.json': recs, 'packages/tables/data/b.json': arr }, syntheticList(SPEC)));
    expect(at(r)).toEqual([
      ['packages/tables/data/a.json', 2, 'list', 41, 'column'],
      ['packages/tables/data/b.json', 3, 'list', 41, 'column'],
    ]);
  });
  it('a source list written one string per line is a column; the same words as identifiers are code and never scanned', () => {
    const lit = `export const N = [\n${WORDS.slice(0, 5).map((w) => `  '${w}',`).join('\n')}\n];\n`;
    const ids = `export const N = {\n${WORDS.slice(0, 5).map((w) => `  ${w}: 1,`).join('\n')}\n};\nconst ${WORDS.slice(0, 5).join(' = 1, ')} = 1;\n`;
    const r = scan(tree({ 'packages/layout/src/a.ts': lit, 'packages/layout/src/b.ts': ids }, syntheticList(SPEC)));
    expect(at(r)).toEqual([['packages/layout/src/a.ts', 2, 'list', 41, 'column']]);
  });
});

describe('what is read, and how (C-0247; N-26)', () => {
  it('the read modes by place', () => {
    expect(readModeOf('packages/tables/data/x.json')).toBe('whole');
    expect(readModeOf('docs/digest/README.md')).toBe('whole');
    expect(readModeOf('assets/a.svg')).toBe('whole');
    expect(readModeOf('packages/testkit/baselines/baselines.json')).toBe('strings');
    expect(readModeOf('packages/testkit/baselines/README.md')).toBe('bytes');
    expect(readModeOf('packages/kernel/src/a.ts')).toBe('source');
    expect(readModeOf('bench/test/scan/x.test.ts')).toBe('source');
    expect(readModeOf('tools/lint/index.mjs')).toBe('source');
    expect(readModeOf('scripts/bench.mjs')).toBe('source');
    expect(readModeOf('vitest.config.ts')).toBe('source');
    expect(readModeOf('package.json')).toBe('strings');
    expect(readModeOf('packages/layout/src/districts/s6.json')).toBe('strings');
    expect(readModeOf('vendor/flatbush/index.js')).toBe('bytes');
    expect(readModeOf('docs/build/M0.md')).toBe('bytes');
    expect(readModeOf('README.md')).toBe('bytes');
  });

  it('node_modules, dist and coverage are never entered, a symbolic link never followed; vendor/ and docs/build/ are digested whole only', async () => {
    const { symlinkSync } = await import('node:fs');
    const root = tree(
      {
        'packages/kernel/node_modules/x/a.js': `'${TOKEN}'\n`,
        'packages/kernel/dist/a.js': `'${TOKEN}'\n`,
        'coverage/a.js': `'${TOKEN}'\n`,
        'packages/kernel/a.tsbuildinfo': `${TOKEN}\n`,
        'vendor/lib/a.js': `'${TOKEN}'\n`,
        'docs/build/M0.md': `${TOKEN}\n`,
        'vendor/lib/copied.bin': FILE_BYTES,
      },
      syntheticList(SPEC),
    );
    const outside = tree({ 'secret.ts': `'${TOKEN}'\n` });
    symlinkSync(join(outside, 'secret.ts'), join(root, 'packages', 'link.ts'));
    symlinkSync(outside, join(root, 'packages', 'linked-dir'));
    const r = scan(root);
    expect(at(r)).toEqual([['vendor/lib/copied.bin', 0, 'file']]);
    expect(r.report?.files.scanned).toBe(3); // vendor/lib/a.js, vendor/lib/copied.bin, docs/build/M0.md
  });

  it('a crossing file (N-26): numbers alone forming a listed run give 0 hits; the same tokens in one string value, a listed token in a key or a note, are hits', () => {
    const spec: ListSpec = { tokens: [TOKEN], trigrams: ['10 20 30', '20 30 40', '30 40 50'] };
    const nums = '{\n  "rows": [\n    { "bins": [10, 20, 30, 40, 50] }\n  ]\n}\n';
    expect(scan(tree({ 'packages/testkit/baselines/baselines.json': nums }, syntheticList(spec))).code).toBe(0);
    const inString = '{\n  "rows": [\n    { "note": "10 20 30 40 50" }\n  ]\n}\n';
    expect(at(scan(tree({ 'packages/testkit/baselines/baselines.json': inString }, syntheticList(spec))))).toEqual([['packages/testkit/baselines/baselines.json', 3, 'trigram']]);
    // the same numbers-only file placed outside the folder (read whole) is the hit
    expect(at(scan(tree({ 'packages/tables/data/bins.json': nums }, syntheticList(spec))))).toEqual([['packages/tables/data/bins.json', 3, 'trigram']]);
    const key = `{\n  "ok": 1,\n  "${TOKEN}": 2\n}\n`;
    expect(at(scan(tree({ 'packages/testkit/baselines/ng-faces.json': key }, syntheticList(spec))))).toEqual([['packages/testkit/baselines/ng-faces.json', 3, 'token']]);
    // N-32 / C-0180: a baselines.json note holding a listed token is a hit (named by file and line, never the token)
    const note = `{\n  "rows": [\n    { "id": "x.y", "note": "organic presets ${TOKEN} only" }\n  ]\n}\n`;
    const r = scan(tree({ 'packages/testkit/baselines/baselines.json': note }, syntheticList(spec)));
    expect(at(r)).toEqual([['packages/testkit/baselines/baselines.json', 3, 'token']]);
    expect(r.text).not.toContain(TOKEN);
  });

  it('in a crossing file no 3-gram spans two strings, in either order on a line', () => {
    const head = RUN.slice(0, 3).join(' ');
    const tail = RUN.slice(3).join(' ');
    const two = `{\n  "a": [\n    "${head}", "${tail}",\n    "${tail}", "${head}"\n  ],\n  "${head}": "${tail}"\n}\n`;
    expect(scan(tree({ 'packages/testkit/baselines/baselines.json': two }, syntheticList(SPEC))).code).toBe(0);
    // the control: the same file read whole (outside the folder) forms the run on the key line
    expect(scan(tree({ 'packages/tables/data/two.json': `{\n  "${head} ${tail}": 1\n}\n` }, syntheticList(SPEC))).report?.counts.trigram).toBe(1);
  });

  it('a file that is not UTF-8 text is digested whole only; a file hit is found anywhere in plat/', () => {
    const bin = Uint8Array.from([0xff, 0xfe, 0x00, 0x41, ...Buffer.from(TOKEN)]);
    const root = tree({ 'docs/digest/img.bin': bin, 'packages/layout/src/x/copied.dat': FILE_BYTES }, syntheticList({ ...SPEC, files: [FILE_BYTES, bin] }));
    expect(at(scan(root))).toEqual([
      ['docs/digest/img.bin', 0, 'file'],
      ['packages/layout/src/x/copied.dat', 0, 'file'],
    ]);
  });
});

describe('the source reader: string literals and comments, never code (§17.1 (5); C-0247)', () => {
  it('strings, templates (outside their substitutions), comments and regular expressions are read by line; code is not', () => {
    const src = [
      "import { a } from './x.js'; // line one",
      'const s = "double" + \'single\';',
      'const t = `head ${a + `inner`} tail`;',
      '/* block',
      '   second */ const r = /re[/]gex/g; const d = 4 / 2 / 1;',
      'identifier words here;',
      "const e = 'caf\\u00e9 \\x41b\\tc';",
    ].join('\n');
    expect(readSource(src).lines).toEqual([
      { line: 1, text: './x.js  line one' },
      { line: 2, text: 'double single' },
      { line: 3, text: 'head  inner  tail' },
      { line: 4, text: ' block' },
      { line: 5, text: '   second  re[/]gex' },
      { line: 7, text: 'café Ab c' },
    ]);
  });

  it('a listed token as an identifier is never a hit; in a string, a comment or a template it is', () => {
    const r = scan(
      tree({ 'packages/kernel/src/a.ts': `const ${TOKEN} = 1;\nconst s = '${TOKEN}';\n// ${TOKEN}\nconst t = \`x \${${TOKEN}} ${TOKEN}\`;\n` }, syntheticList(SPEC)),
    );
    expect(at(r)).toEqual([
      ['packages/kernel/src/a.ts', 2, 'token'],
      ['packages/kernel/src/a.ts', 3, 'token'],
      ['packages/kernel/src/a.ts', 4, 'token'],
    ]);
  });

  it('a token split by an escape is decoded first: \\u0065 inside a word joins it', () => {
    const r = scan(tree({ 'packages/kernel/src/a.ts': "const s = 'z\\u0065brum';\n" }, syntheticList(SPEC)));
    expect(r.report?.counts.token).toBe(1);
  });

  it('an unterminated string ends at its line; a multi-line template keeps each line its own', () => {
    expect(readSource("const s = 'open\nconst t = 'x';\n").lines).toEqual([
      { line: 1, text: 'open' },
      { line: 2, text: 'x' },
    ]);
    expect(readSource('const t = `a\nb`;\n').lines).toEqual([
      { line: 1, text: 'a' },
      { line: 2, text: 'b' },
    ]);
  });
});

describe('the JSON reader', () => {
  it('strings and keys with their lines, decoded; numbers form no text; not JSON → null', () => {
    const j = readJson('{\n  "a\\u00e9": [1, "x\\ny", true],\n  "b": null\n}\n');
    expect(j?.strings).toEqual([
      { line: 2, text: 'aé' },
      { line: 2, text: 'x\ny' },
      { line: 3, text: 'b' },
    ]);
    expect(readJson('{"a": }')).toBeNull();
    expect(readJson('[1, 2')).toBeNull();
    expect(readJson('{"a": 1} x')).toBeNull();
  });
});

describe('a deny-list at the committed size (N-36: one load per run, every class a digest-keyed set)', () => {
  it('a synthetic list at the committed counts loads and the planted hits are found on it', () => {
    // the committed counts (N-36): tokens 894, 3-grams 1 026 020, colours 7 358, files 2 523, list words 3 461 across
    // 260 lists, spell 234 593; random digests (a counter's SHA-256 under another salt), the planted ones among them
    let k = 0;
    const filler = (n: number): string[] => Array.from({ length: n }, () => dig(`filler ${(k += 1)}`, 16, Uint8Array.from({ length: 32 }, () => 7)));
    const base = syntheticList(SPEC);
    const merge = (planted: unknown, n: number): string[] => [...new Set([...(planted as string[]), ...filler(n - (planted as string[]).length)])].sort();
    const words = filler(3461 - WORDS.length);
    const lists = [{ id: 41, words: [...(base['lists'] as { words: string[] }[])[0]!.words] }];
    for (let id = 1; id < 260; id += 1) lists.push({ id: 1000 + id, words: [] });
    words.forEach((w, i) => (lists[1 + (i % 259)] as { words: string[] }).words.push(w));
    for (const l of lists) l.words.sort();
    const big = {
      ...base,
      tokens: merge(base['tokens'], 894),
      trigrams: merge(base['trigrams'], 1_026_020),
      colours: merge(base['colours'], 7358),
      files: merge(base['files'], 2523),
      spell: merge([], 234_593),
      lists,
    };
    const digests = ['tokens', 'trigrams', 'colours', 'files', 'spell'].reduce((s, f) => s + (big[f as keyof typeof big] as string[]).length, 0) + lists.reduce((s, l) => s + l.words.length, 0);
    expect(digests).toBe(894 + 1_026_020 + 7358 + 2523 + 234_593 + 3461);
    const root = tree(
      {
        'packages/kernel/src/a.ts': `const s = '${TOKEN}';\nconst t = '${RUN.join(' ')}';\nconst c = '#${COLOUR}';\n`,
        'docs/digest/d.bin': FILE_BYTES,
        'docs/digest/e.md': `${WORDS.slice(0, 5).join(' ')}\n`,
      },
      big,
    );
    const r = scan(root);
    expect(r.code).toBe(1);
    expect(r.report?.counts).toEqual({ token: 1, trigram: 1, colour: 1, file: 1, list: 1, hits: 5, allowed: 0, unreviewed: 5 });
  }, 120_000);
});
