// The source reader of the content scan (M0-k-06; §17.1 (5): "source string literals and comments"; C-0247): a small
// lexer for TypeScript and JavaScript that yields, per line, the text of every string literal, template literal's text
// part, regular-expression literal and comment on that line — code (identifiers, keywords, numbers, punctuation) is
// never scanned for tokens. Escapes in strings are decoded (`é` is the letter, `\x41` likewise; `\n` and `\r`
// end a text, so no 3-gram spans them; `\t` and the other one-letter escapes separate tokens). Pieces on one line are
// joined by a space, so a copied row written as several literals on one line is still one text. A line holding exactly
// one string literal and otherwise only brackets, commas, colons and semicolons (a comment beside it ignored) is a cell
// of a source list: a maximal block of such lines is a column (a list written one item per line).

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
const PUNCT_ONLY = /^[\s[\](){},;:]*$/;

interface LineInfo {
  text: string;
  strings: number;
  code: string;
  cell: string;
}

/** Reads a source text into its per-line literal and comment texts and its source-list columns. */
export function readSource(src: string): SourceText {
  const info = new Map<number, LineInfo>();
  const at = (line: number): LineInfo => {
    let x = info.get(line);
    if (x === undefined) {
      x = { text: '', strings: 0, code: '', cell: '' };
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
  const open = (isString: boolean): void => {
    piece = '';
    pieceIsString = isString;
    const x = at(line);
    if (isString) x.strings += 1;
  };
  const flush = (): void => {
    const x = at(line);
    x.text = x.text === '' ? piece : `${x.text} ${piece}`;
    if (pieceIsString) x.cell = x.cell === '' ? piece : `${x.cell} ${piece}`;
    piece = '';
  };
  /** A real line break inside a piece: the piece goes to this line and goes on at the next. */
  const breakLine = (): void => {
    flush();
    line += 1;
    const x = at(line);
    if (pieceIsString) x.strings += 1;
  };
  const code = (ch: string): void => {
    at(line).code += ch;
  };
  // the previous significant code token, for telling a regular expression from a division
  let prevChar = '';
  let prevWord = '';
  const templateDepth: number[] = []; // brace depth at each open `${`
  let braces = 0;

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
        return;
      } else if (c === '$' && src[i + 1] === '{') {
        i += 2;
        flush();
        templateDepth.push(braces);
        braces += 1;
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
  };

  const regexAllowed = (): boolean => prevChar === '' || /[(,=:[!&|?{};+\-*%<>~^]/.test(prevChar) || REGEX_AFTER_WORD.has(prevWord);

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
      prevChar = 'a';
      prevWord = '';
      continue;
    }
    if (c === '`') {
      i += 1;
      readTemplate();
      prevChar = 'a';
      prevWord = '';
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
      prevChar = 'a';
      prevWord = '';
      continue;
    }
    if (c === '{') braces += 1;
    if (c === '}') {
      braces -= 1;
      if (templateDepth.length > 0 && templateDepth[templateDepth.length - 1] === braces) {
        templateDepth.pop();
        i += 1;
        readTemplate();
        prevChar = 'a';
        prevWord = '';
        continue;
      }
    }
    if (/[A-Za-z0-9_$]/.test(c)) {
      let j = i;
      while (j < n && /[A-Za-z0-9_$]/.test(src[j] as string)) j += 1;
      const w = src.slice(i, j);
      code(w);
      prevWord = w;
      prevChar = 'a';
      i = j;
      continue;
    }
    code(c);
    prevChar = c;
    prevWord = '';
    i += 1;
  }

  const nums = [...info.keys()].sort((a, b) => a - b);
  const lines: SourceLine[] = [];
  const columns: { line: number; cells: string[] }[] = [];
  let block: { line: number; cells: string[] } | null = null;
  let last = -1;
  for (const k of nums) {
    const x = info.get(k) as LineInfo;
    if (x.text.trim() !== '') lines.push({ line: k, text: x.text });
    const isCell = x.strings === 1 && PUNCT_ONLY.test(x.code);
    if (isCell && block !== null && last === k - 1) block.cells.push(x.cell);
    else {
      if (block !== null && block.cells.length > 1) columns.push(block);
      block = isCell ? { line: k, cells: [x.cell] } : null;
    }
    last = isCell ? k : -1;
  }
  if (block !== null && block.cells.length > 1) columns.push(block);
  return { lines, columns };
}
