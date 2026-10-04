// Staged types (J156 (2); M0-m-01). A record a later milestone builds is declared here only where an M0 record's
// field needs its name (M0-work.json's defers), as a `NotBuilt<milestone>` brand: a type no value carries, so an M0
// writer cannot fill the field without a cast and the field stays absent until its milestone declares the record.
// The record fields M0 stages are listed with their milestones in schema/staged.ts (STAGED). Types only.

/** A type staged to `Milestone`: carried by no value (§4b; J156 (2)). */
export type NotBuilt<Milestone extends string> = { readonly __notBuilt: Milestone };

/** `Way.raised`'s record (§2.7, g item 110 (b)): the raised ways and their arena parts are M3a's (§4b). */
export type RaisedWayRecord = NotBuilt<'M3a'>;
