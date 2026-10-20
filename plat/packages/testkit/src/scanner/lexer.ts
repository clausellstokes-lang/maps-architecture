// The source reader of the content scan (M0-k-06; §17.1 (5): "source string literals and comments"; C-0247): a small
// lexer for TypeScript and JavaScript that yields, per line, the text of every string literal, template literal's text
// part, regular-expression literal and comment on that line — code (identifiers, keywords, numbers, punctuation) is
// never scanned for tokens. Escapes in strings are decoded (`é` is the letter, `\x41` likewise; `\n` and `\r`
// end a text, so no 3-gram spans them; `\t` and the other one-letter escapes separate tokens). Pieces on one line are
// joined by a space, so a copied row written as several literals on one line is still one text. A line holding exactly
// one string literal and otherwise only brackets, commas, colons and semicolons (a comment beside it ignored) is a cell
// of a source list: a maximal block of such lines is a column (a list written one item per line). An array literal is a
// column too, whatever its layout (hardening round S1, K6-1): its own strings (not those nested in a call, an object or
// another array), and one key's string values across the object literals that are its elements (a table of records);
// a line block whose every cell is a string of one array column is that column already and is not reported twice. A `/`
// after the `)` that closes an `if`, `while`, `for` or `with` head starts a regular expression, not a division (K6-2).

/** One line's scanned text: `\n` inside it marks a decoded line break (no 3-gram spans it). */
export interface SourceLine {
  line: number;
  text: string;
}

/** A source file's scanned texts and its source-list columns (each column: its cells' texts and its first line). */
export interface SourceText {
  lines: SourceLine[];
  columns: { line: number; cells: string[] }[];
}

const REGEX_AFTER_WORD = new Set(['return', 'typeof', 'case', 'do', 'else', 'in', 'of', 'new', 'delete', 'void', 'throw', 'yield', 'await', 'instanceof']);
/** A `(` after one of these words opens a statement head: the `/` after its closing `)` starts a regular expression (K6-2). */
const CONTROL_HEAD = new Set(['if', 'while', 'for', 'with']);
const PUNCT_ONLY = /^[\s[\](){},;:]*$/;

interface LineInfo {
  text: string;
  strings: number;
  code: string;
  cell: string;
  /** The ids of the strings on this line (a line-block cell holds exactly one). */
  ids: number[];
}

/** One string literal or template text part: its id, its first line and its decoded text (a real line break as `\n`). */
interface Cell {
  id: number;
  line: number;
  parts: string[];
}

/** An open bracket of the code (K6-1, K6-2). */
interface Frame {
  kind: '[' | '(' | '{' | '${';
  /** `(`: it opens an `if`, `while`, `for` or `with` head. */
  control: boolean;
  /** `[`: its own strings. */
  strings: Cell[];
  /** `[`: one key's string values across its object elements. */
  byKey: Map<string, Cell[]>;
  /** `{`: its properties' string values with their keys. */
  pairs: [string, Cell][];
  /** `{`: the current property's key (null before its `:`). */
  key: string | null;
  /** `{`: the last identifier or string, the key when a `:` follows. */
  pending: string | null;
}

const cellText = (c: Cell): string => c.parts.join('\n');

/** Reads a source text into its per-line literal and comment texts and its source-list columns. */
export function readSource(src: string): SourceText {
  const info = new Map<number, LineInfo>();
  const at = (line: number): LineInfo => {
    let x = info.get(line);
    if (x === undefined) {
      x = { text: '', strings: 0, code: '', cell: '', ids: [] };
      info.set(line, x);
    }
    return x;
  };
  let line = 1;
  let i = 0;
  const n = src.length;
  // the current piece: its text and whether it is a string (a cell candidate)
  let piece = '';
  let pieceIsString = false;
  let cur: Cell | null = null;
  let nextId = 0;
  const open = (isString: boolean): void => {
    piece = '';
    pieceIsString = isString;
    const x = at(line);
    if (isString) {
      cur = { id: nextId, line, parts: [] };
      nextId += 1;
      x.strings += 1;
      x.ids.push(cur.id);
    }
  };
  const flush = (): void => {
    const x = at(line);
    x.text = x.text === '' ? piece : `${x.text} ${piece}`;
    if (pieceIsString) {
      x.cell = x.cell === '' ? piece : `${x.cell} ${piece}`;
      if (cur !== null) cur.parts.push(piece);
    }
    piece = '';
  };
  /** A real line break inside a piece: the piece goes to this line and goes on at the next. */
  const breakLine = (): void => {
    flush();
    line += 1;
    const x = at(line);
    if (pieceIsString) {
      x.strings += 1;
      if (cur !== null) x.ids.push(cur.id);
    }
  };
  const code = (ch: string): void => {
    at(line).code += ch;
  };

  // the open brackets, and the columns the closed array literals make (K6-1)
  const frames: Frame[] = [];
  const arrayColumns: { line: number; cells: string[]; ids?: Set<number> }[] = [];
  const top = (): Frame | undefined => frames[frames.length - 1];
  const push = (kind: Frame['kind'], control = false): void => {
    frames.push({ kind, control, strings: [], byKey: new Map(), pairs: [], key: null, pending: null });
  };
  /** A finished string or template text part goes to the bracket it stands in. */
  const settle = (): void => {
    const c = cur;
    cur = null;
    if (c === null) return;
    const f = top();
    if (f === undefined) return;
    if (f.kind === '[') f.strings.push(c);
    else if (f.kind === '{') {
      if (f.key !== null) f.pairs.push([f.key, c]);
      else f.pending = cellText(c);
    }
  };
  const finish = (f: Frame): void => {
    if (f.kind === '[') {
      if (f.strings.length > 1) arrayColumns.push({ line: (f.strings[0] as Cell).line, cells: f.strings.map(cellText), ids: new Set(f.strings.map((c) => c.id)) });
      for (const cells of f.byKey.values()) if (cells.length > 1) arrayColumns.push({ line: (cells[0] as Cell).line, cells: cells.map(cellText) });
    } else if (f.kind === '{') {
      const p = top();
      if (p?.kind === '[') {
        for (const [k, c] of f.pairs) {
          const cells = p.byKey.get(k);
          if (cells === undefined) p.byKey.set(k, [c]);
          else cells.push(c);
        }
      }
    }
  };
  /** Closes the nearest open bracket of one of `kinds` (and every bracket opened inside it); a stray closer closes nothing. */
  const close = (kinds: readonly Frame['kind'][]): Frame | null => {
    let k = frames.length - 1;
    while (k >= 0 && !kinds.includes((frames[k] as Frame).kind)) k -= 1;
    if (k < 0) return null;
    let f: Frame | undefined;
    while (frames.length > k) {
      f = frames.pop() as Frame;
      finish(f);
    }
    return f as Frame;
  };

  // the previous significant code token, for telling a regular expression from a division
  let prevChar = '';
  let prevWord = '';
  let afterHead = false; // the previous token is the `)` closing an if / while / for / with head (K6-2)
  const after = (ch: string, word = ''): void => {
    prevChar = ch;
    prevWord = word;
    afterHead = false;
  };

  const readEscape = (): void => {
    // src[i] is the backslash
    const c = src[i + 1];
    if (c === undefined) {
      i += 1;
      return;
    }
    if (c === '\n') {
      i += 2;
      breakLine();
      return;
    }
    if (c === '\r') {
      i += src[i + 2] === '\n' ? 3 : 2;
      breakLine();
      return;
    }
    if (c === 'n' || c === 'r') {
      piece += '\n';
      i += 2;
      return;
    }
    if (c === 'u') {
      const braced = /^\{([0-9A-Fa-f]{1,6})\}/.exec(src.slice(i + 2, i + 10));
      if (braced !== null) {
        const cp = parseInt(braced[1] as string, 16);
        piece += cp <= 0x10ffff ? String.fromCodePoint(cp) : ' ';
        i += 2 + braced[0].length;
        return;
      }
      const four = /^[0-9A-Fa-f]{4}/.exec(src.slice(i + 2, i + 6));
      if (four !== null) {
        piece += String.fromCharCode(parseInt(four[0], 16));
        i += 6;
        return;
      }
    }
    if (c === 'x') {
      const two = /^[0-9A-Fa-f]{2}/.exec(src.slice(i + 2, i + 4));
      if (two !== null) {
        piece += String.fromCharCode(parseInt(two[0], 16));
        i += 4;
        return;
      }
    }
    piece += /[tvfb0]/.test(c) ? ' ' : c;
    i += 2;
  };

  /** Reads a quoted string from src[i] (the quote) to its closing quote or the line's end. */
  const readString = (q: string): void => {
    open(true);
    i += 1;
    while (i < n) {
      const c = src[i] as string;
      if (c === '\\') readEscape();
      else if (c === q) {
        i += 1;
        break;
      } else if (c === '\n' || c === '\r') break; // unterminated: ends at the line's end
      else {
        piece += c;
        i += 1;
      }
    }
    flush();
    settle();
  };

  /** Reads a template's text from src[i] (after the backquote or a closing `}`) to the backquote or a `${`. */
  const readTemplate = (): void => {
    open(true);
    while (i < n) {
      const c = src[i] as string;
      if (c === '\\') readEscape();
      else if (c === '`') {
        i += 1;
        flush();
        settle();
        return;
      } else if (c === '$' && src[i + 1] === '{') {
        i += 2;
        flush();
        settle();
        push('${');
        return;
      } else if (c === '\n') {
        i += 1;
        breakLine();
      } else if (c === '\r') {
        i += src[i + 1] === '\n' ? 2 : 1;
        breakLine();
      } else {
        piece += c;
        i += 1;
      }
    }
    flush();
    settle();
  };

  const regexAllowed = (): boolean => prevChar === '' || /[(,=:[!&|?{};+\-*%<>~^]/.test(prevChar) || REGEX_AFTER_WORD.has(prevWord) || (prevChar === ')' && afterHead);

  while (i < n) {
    const c = src[i] as string;
    const d = src[i + 1];
    if (c === '\n') {
      line += 1;
      i += 1;
      continue;
    }
    if (c === '\r') {
      if (d !== '\n') line += 1;
      i += 1;
      continue;
    }
    if (c === ' ' || c === '\t' || c === '\f' || c === '\v') {
      i += 1;
      continue;
    }
    if (c === '/' && d === '/') {
      open(false);
      i += 2;
      while (i < n && src[i] !== '\n' && src[i] !== '\r') {
        piece += src[i] as string;
        i += 1;
      }
      flush();
      continue;
    }
    if (c === '/' && d === '*') {
      open(false);
      i += 2;
      while (i < n && !(src[i] === '*' && src[i + 1] === '/')) {
        const e = src[i] as string;
        if (e === '\n') breakLine();
        else if (e === '\r') {
          if (src[i + 1] !== '\n') breakLine();
        } else piece += e;
        i += 1;
      }
      i += 2;
      flush();
      continue;
    }
    if (c === "'" || c === '"') {
      readString(c);
      after('a');
      continue;
    }
    if (c === '`') {
      i += 1;
      readTemplate();
      after('a');
      continue;
    }
    if (c === '/' && regexAllowed()) {
      // a regular-expression literal: its body is scanned as text, escapes as separators
      open(false);
      i += 1;
      let inClass = false;
      while (i < n && src[i] !== '\n' && src[i] !== '\r') {
        const e = src[i] as string;
        if (e === '\\') {
          piece += ' ';
          i += 2;
          continue;
        }
        if (e === '[') inClass = true;
        else if (e === ']') inClass = false;
        else if (e === '/' && !inClass) {
          i += 1;
          break;
        }
        piece += e;
        i += 1;
      }
      while (i < n && /[a-z]/i.test(src[i] as string)) i += 1;
      flush();
      after('a');
      continue;
    }
    if (c === '}') {
      const f = close(['{', '${']);
      if (f?.kind === '${') {
        i += 1;
        readTemplate();
        after('a');
        continue;
      }
    }
    if (/[A-Za-z0-9_$]/.test(c)) {
      let j = i;
      while (j < n && /[A-Za-z0-9_$]/.test(src[j] as string)) j += 1;
      const w = src.slice(i, j);
      code(w);
      const f = top();
      if (f?.kind === '{' && f.key === null) f.pending = w;
      after('a', w === 'await' && prevWord === 'for' ? 'for' : w); // `for await (` opens a head too
      i = j;
      continue;
    }
    code(c);
    let head = false;
    if (c === '(') push('(', CONTROL_HEAD.has(prevWord));
    else if (c === '[') push('[');
    else if (c === '{') push('{');
    else if (c === ')') head = close(['('])?.control ?? false;
    else if (c === ']') close(['[']);
    else {
      const f = top();
      if (f?.kind === '{') {
        if (c === ',' || c === ';') {
          f.key = null;
          f.pending = null;
        } else if (c === ':' && f.key === null && f.pending !== null) {
          f.key = f.pending;
          f.pending = null;
        }
      }
    }
    after(c);
    afterHead = head;
    i += 1;
  }
  while (frames.length > 0) finish(frames.pop() as Frame); // an unclosed array still gives its column

  const nums = [...info.keys()].sort((a, b) => a - b);
  const lines: SourceLine[] = [];
  const blocks: { line: number; cells: string[]; ids: number[] }[] = [];
  let block: { line: number; cells: string[]; ids: number[] } | null = null;
  let last = -1;
  for (const k of nums) {
    const x = info.get(k) as LineInfo;
    if (x.text.trim() !== '') lines.push({ line: k, text: x.text });
    const isCell = x.strings === 1 && PUNCT_ONLY.test(x.code);
    if (isCell && block !== null && last === k - 1) {
      block.cells.push(x.cell);
      block.ids.push(...x.ids);
    } else {
      if (block !== null && block.cells.length > 1) blocks.push(block);
      block = isCell ? { line: k, cells: [x.cell], ids: [...x.ids] } : null;
    }
    last = isCell ? k : -1;
  }
  if (block !== null && block.cells.length > 1) blocks.push(block);
  // a line block inside one array column is that column already (one list, one hit)
  const inArray = (b: { ids: number[] }): boolean => arrayColumns.some((a) => a.ids !== undefined && b.ids.every((id) => (a.ids as Set<number>).has(id)));
  const columns = [...blocks.filter((b) => !inArray(b)).map((b) => ({ line: b.line, cells: b.cells })), ...arrayColumns.map((a) => ({ line: a.line, cells: a.cells }))];
  columns.sort((a, b) => a.line - b.line);
  return { lines, columns };
}
