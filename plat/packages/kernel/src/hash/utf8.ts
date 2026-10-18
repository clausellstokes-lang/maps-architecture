// UTF-8 for the hash path (§6.2 "strings as UTF-8"; §13.6 (2) "the UTF-8 bytes of s"). Model code has no TextEncoder
// (lib ES2022 only, no DOM, no Node globals — §14), so the encoder is our own: code units read with charCodeAt, surrogate
// pairs joined into one four-byte sequence. A lone surrogate has no UTF-8 form and is refused (C-0133), never replaced
// by U+FFFD, so two different strings never hash alike through a replacement.

function loneSurrogate(s: string, i: number): RangeError {
  return new RangeError(`UTF-8: lone surrogate 0x${s.charCodeAt(i).toString(16)} at index ${String(i)}`);
}

/** The number of UTF-8 bytes of `s`; throws a RangeError on a lone surrogate. */
export function utf8Length(s: string): number {
  let n = 0;
  const len = s.length;
  for (let i = 0; i < len; i += 1) {
    const c = s.charCodeAt(i);
    if (c < 0x80) n += 1;
    else if (c < 0x800) n += 2;
    else if (c >= 0xd800 && c <= 0xdbff) {
      const d = i + 1 < len ? s.charCodeAt(i + 1) : 0;
      if (!(d >= 0xdc00 && d <= 0xdfff)) throw loneSurrogate(s, i);
      n += 4;
      i += 1;
    } else if (c >= 0xdc00 && c <= 0xdfff) throw loneSurrogate(s, i);
    else n += 3;
  }
  return n;
}

/**
 * Writes the UTF-8 bytes of `s` into `out` from `at` and returns the index after the last byte written. `out` must hold
 * `utf8Length(s)` bytes from `at`; throws a RangeError on a lone surrogate.
 */
export function encodeUtf8Into(s: string, out: Uint8Array, at: number): number {
  let j = at;
  const len = s.length;
  for (let i = 0; i < len; i += 1) {
    const c = s.charCodeAt(i);
    if (c < 0x80) {
      out[j] = c;
      j += 1;
    } else if (c < 0x800) {
      out[j] = 0xc0 | (c >> 6);
      out[j + 1] = 0x80 | (c & 0x3f);
      j += 2;
    } else if (c >= 0xd800 && c <= 0xdbff) {
      const d = i + 1 < len ? s.charCodeAt(i + 1) : 0;
      if (!(d >= 0xdc00 && d <= 0xdfff)) throw loneSurrogate(s, i);
      const cp = (((c - 0xd800) << 10) | (d - 0xdc00)) + 0x10000;
      out[j] = 0xf0 | (cp >> 18);
      out[j + 1] = 0x80 | ((cp >> 12) & 0x3f);
      out[j + 2] = 0x80 | ((cp >> 6) & 0x3f);
      out[j + 3] = 0x80 | (cp & 0x3f);
      j += 4;
      i += 1;
    } else if (c >= 0xdc00 && c <= 0xdfff) {
      throw loneSurrogate(s, i);
    } else {
      out[j] = 0xe0 | (c >> 12);
      out[j + 1] = 0x80 | ((c >> 6) & 0x3f);
      out[j + 2] = 0x80 | (c & 0x3f);
      j += 3;
    }
  }
  return j;
}

/** The UTF-8 bytes of `s`; throws a RangeError on a lone surrogate. */
export function utf8Bytes(s: string): Uint8Array {
  const out = new Uint8Array(utf8Length(s));
  encodeUtf8Into(s, out, 0);
  return out;
}
