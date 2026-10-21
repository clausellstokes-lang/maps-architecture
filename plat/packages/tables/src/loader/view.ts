// The TableView (§7.6): the frozen, resolved tables every reader takes. M0's view has no override chain — packs,
// presets, user and document overrides and log events arrive with the document at M1 (§4b; C-0012) — so it resolves
// every row to the shipped table's own, and its hash is H128 of the pinned table hashes alone (C-0157). A slice is a
// row (`key`) or one field of a row (`'<row>/<cell>'`, §7.6), its hash the H128 of the row's pinning content or of the
// field's key and the cell's pinning content (table.ts, C-0157 (1)), cut to the model's Hash64. A package that keeps a
// table of its own beside its code (layout's `s6`, which @plat/tables cannot import: the dependency runs
// tables ← layout) registers it in a view by handing the checked Table to `tableView`, after the shipped ids, so the
// view carries it and its hash covers it like any table of the view (C-0416).
import { H128, utf8Bytes, type Hash128 } from '@plat/kernel';
import type { SliceRef, TableId } from '@plat/model';
import { issueAt } from '../cell/cell.js';
import { isTableId, TABLE_IDS } from './registry.js';
import { cellSliceHash, loadTable, Table, TableError, type Row } from './table.js';

/** §7.6's TableView, with M0's `table(id)` beside it for the typed readers. */
export interface TableView {
  /** The view's memo key: H128 of the pinned table hashes in the view's id order (no override chain at M0). */
  readonly hash: Hash128;
  /** The pinned version a SliceRef records. */
  version(table: TableId): string;
  /** A resolved row; undefined for a key the table lacks. */
  get(table: TableId, key: string): unknown;
  /** Every resolved row, by key. */
  rows(table: TableId): ReadonlyMap<string, unknown>;
  /** The slice a reader cites, its version and hash filled (§2.8). */
  slice(table: TableId, kind: SliceRef['kind'], key: string): SliceRef;
  /** The loaded table itself (M0). */
  table(table: TableId): Table;
}

class View implements TableView {
  readonly hash: Hash128;
  private readonly tables: ReadonlyMap<string, Table>;

  constructor(tables: ReadonlyMap<string, Table>) {
    this.tables = tables;
    const parts: string[] = [];
    for (const [id, t] of tables) parts.push(`${id}@${t.version}:${t.hash.join(',')}`);
    this.hash = H128(utf8Bytes(parts.join('\n')));
    Object.freeze(this);
  }

  table(id: TableId): Table {
    const t = this.tables.get(id);
    if (t === undefined) throw new TableError([issueAt({ table: id, reason: 'not in this view' })]);
    return t;
  }

  version(id: TableId): string {
    return String(this.table(id).version);
  }

  get(id: TableId, key: string): Row | undefined {
    return this.table(id).rows.get(key);
  }

  rows(id: TableId): ReadonlyMap<string, Row> {
    return this.table(id).rows;
  }

  slice(id: TableId, kind: SliceRef['kind'], key: string): SliceRef {
    const t = this.table(id);
    // A row key holds no '/' (ROW_KEY), so the first one parts the row from the cell.
    const cut = key.indexOf('/');
    const h = cut < 0 ? t.rowHash(key) : cellSliceHash(key, t.cell(key.slice(0, cut), key.slice(cut + 1)));
    return { table: id, version: String(t.version), kind, key, hash: [h[0], h[1]] };
  }
}

/**
 * A view over M0's tables (all of them by default), each checked on load, and the `registered` tables after them in
 * their order: tables a package keeps of its own (layout's `s6`), each a `Table` that `parseTable` checked. The view's
 * hash covers every table it carries. A registered table is refused, naming it, when it is not a checked `Table`, when
 * its id is one of M0's shipped tables (those are loaded by id, never handed in: a variant of one is §7.6's override
 * chain, M1's), or when the view already carries its id.
 */
export function tableView(ids: readonly string[] = TABLE_IDS, registered: readonly Table[] = []): TableView {
  const tables = new Map<string, Table>();
  for (const id of ids) tables.set(id, loadTable(id));
  registered.forEach((t, i) => {
    const refuse = (table: string, reason: string): never => {
      throw new TableError([issueAt({ table, reason })]);
    };
    if (!(t instanceof Table)) refuse(`registered[${i}]`, 'a registered table must be a Table that parseTable checked');
    if (isTableId(t.id)) refuse(t.id, 'a shipped table is loaded by id, never registered');
    if (tables.has(t.id)) refuse(t.id, 'registered twice in this view');
    tables.set(t.id, t);
  });
  return new View(tables);
}
