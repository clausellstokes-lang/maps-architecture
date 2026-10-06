// The scan's salted digest (M0-k-06; §17.1 (5), (8) — SHA-256, FIPS 180-4; C-0101; N-23; attachment C): SHA-256 over
// the salt's 32 bytes (the decoded hex, never its 64-character text) followed by the item's bytes (UTF-8 for a text
// item, the raw bytes for a file), cut to the list's `digestHexDigits` lower-case hex digits. Text digests are cached:
// one scan meets the same token many times.
import { createHash } from 'node:crypto';

/** The salt's 32 bytes from its 64 lower-case hex digits; null when the text is not that. */
export function saltBytes(hex: string): Uint8Array | null {
  if (!/^[0-9a-f]{64}$/.test(hex)) return null;
  return Uint8Array.from(Buffer.from(hex, 'hex'));
}

/** SHA-256(salt ‖ item), the first `hexDigits` lower-case hex digits. */
export function saltedDigest(salt: Uint8Array, item: string | Uint8Array, hexDigits: number): string {
  const h = createHash('sha256');
  h.update(salt);
  h.update(typeof item === 'string' ? Buffer.from(item, 'utf8') : item);
  return h.digest('hex').slice(0, hexDigits);
}

/** The largest number of text digests a digester keeps cached before it starts afresh (bounded memory). */
export const DIGEST_CACHE_CAP = 1_000_000;

/** A digester bound to one list's salt and digest length, caching text items. */
export class Digester {
  private readonly cache = new Map<string, string>();
  constructor(
    readonly salt: Uint8Array,
    readonly hexDigits: number,
  ) {}

  /** The digest of a text item (UTF-8). */
  text(item: string): string {
    const hit = this.cache.get(item);
    if (hit !== undefined) return hit;
    const d = saltedDigest(this.salt, item, this.hexDigits);
    if (this.cache.size >= DIGEST_CACHE_CAP) this.cache.clear();
    this.cache.set(item, d);
    return d;
  }

  /** The digest of a file's bytes as stored. */
  bytes(item: Uint8Array): string {
    return saltedDigest(this.salt, item, this.hexDigits);
  }
}
