from common import *
it('KERNEL-0024','type','3.1','type KernelError: the closed enumeration of 18 failure codes (E_OUT_OF_RANGE, E_DEGENERATE, E_LEVEL, E_LOCKED, E_KEPT, E_SCOPE, E_STRUCTURAL, E_NOT_TWO_CROSSINGS, E_HOLE_CONTACT, E_SELF_INTERSECT, E_BELOW_MIN_EDGE, E_BELOW_MIN_ANGLE, E_BELOW_MIN_AREA, E_BELOW_MIN_WIDTH, E_NON_CONVEX, E_NO_PATH, E_WORK_LIMIT, E_INVARIANT).',['§3.1 code block'],'kernel',[],['@KernelResult','§5.1 failure ladder','§5.4 generation report'],['KernelError'])
E=[('E_OUT_OF_RANGE','snap() given a non-finite value or |coordinate| >= 2^23 cm - a caller bug, reported with its stream key, never stored (§3.2 (7)).',['@snap'],['§5.4 report (caller bug)']),
('E_DEGENERATE','ratio() with a vanishing denominator; OBB/hull of collinear or <3 distinct points; an empty or collapsed boolean, buffer or inset; a StretchRef whose ends are not two distinct vertices of one part of its chain (detail stretch); a transient arena seed or fixed ring breaking minEdge, clearance or simplicity, overlapping input rings, or a seed clip piece left with a hole (detail seed, fixed or overlap); a regular fit of <3 vertices, zero-area ring or vanishing first component (detail fit).',['@ratio','KERNEL-0009','@oneEngine','@StretchRef','@transientArena','@regularFit'],['every caller branch','§5.1 ladder']),
('E_LEVEL','a batch wrote a level other than its own, added a row coarser than the edge or vertex it lands on, or - in a clear-region batch - met finer geometry inside its region away from its prepared contacts (§3.3).',['@batch','@clearRegion'],['§5.1 (stage-domain bug)']),
('E_LOCKED','the op would cut, move or delete geometry owned by a locked or pinned entity - returned to the dry run as a conflict (§7.1).',['@batch'],['§7.1 edit dry run conflict','F-EDIT §5.2']),
('E_KEPT','an insertion or clear would cross, clear or come within attractCm of kept content (§3.3) - a stage-domain bug in generation, a conflict in an edit dry run.',['@keptContent'],['§7.1 dry run','§5.1']),
('E_SCOPE','a pool district overlay wrote outside its district scope, or two overlays touched one record (§3.3).',['@overlay'],['§4 district pool / §6 parallel pool']),
('E_STRUCTURAL','a merge or removal would delete an edge carrying a structural role (§2.2 rule 7) or a transient arena fixed edge (§3.4).',['@removeEdges','@transientArena'],['callers of merge/remove','§7.1']),
('E_NOT_TWO_CROSSINGS','splitFace contact semantics violated (§3.6).',['@splitFace'],['§4.6 carving / plot split callers']),
('E_HOLE_CONTACT','connectHole post-condition violated (§3.6).',['@connectHole'],['callers of connectHole']),
('E_SELF_INTERSECT','a ring whose role requires a simple polygon (a claim, a drawn boundary) crosses itself.',['@insertChain','claims'],['§7 drawn-boundary edits','§4 claims']),
('E_BELOW_MIN_EDGE','optional chains only; its two triggers are those of §3.6.',['@insertChain'],['optional-chain callers']),
('E_BELOW_MIN_ANGLE','optional chains only: a face corner below minFaceAngle (§3.6).',['@insertChain'],['optional-chain callers']),
('E_BELOW_MIN_AREA','a class floor (minimum area) declared by the caller was violated.',['class floors (stage tables)'],['§4.7 plots and parcels']),
('E_BELOW_MIN_WIDTH','a class floor (minimum width) declared by the caller was violated.',['class floors (stage tables)'],['§4.7 plots and parcels']),
('E_NON_CONVEX','the half-plane inset path was asked for a non-convex face (§3.7).',['@insetConvex'],['inset callers']),
('E_NO_PATH','path search found no path; returned with the closest reached point (§3.1 path search row).',['KERNEL-0018'],['§4.3 S4 routing']),
('E_WORK_LIMIT','an operation-count budget was exhausted - counted in operations, never measured by a clock (§3.3).',['@workLimit'],['§5.1 ladder','§12 budgets']),
('E_INVARIANT','a declared hard invariant failed at commit (§3.10).',['@invariants'],['§5.1 ladder','§13 tests'])]
n=25
for code,desc,prod,cons in E:
    it(f'KERNEL-{n:04d}','error-code','3.1',f'{code}: {desc}',['§3.1 KernelError comment'],'kernel',prod,cons,[code]); n+=1
# n now 43
it('KERNEL-0043','type','3.1','type Warning = { code: W_ATTRACTED | W_STRETCH_SHARED | W_WEDGE_ROUTED | W_PLACED | W_PROMOTED | W_SNAP_PASSES | W_ACUTE_CORNER | W_SLIVER_RETYPED | W_STEINER | W_HEIGHT_CLAMPED | W_DOWNGRADE | W_CUT_SLID; count: number; at?: LatticePoint } - 12 warning codes, each with a count and an optional lattice point.',['§3.1 code block'],'kernel',[],['@KernelResult','§5.4 generation report'],['Warning'])
W=[('W_ATTRACTED','a new vertex was attracted onto existing geometry (§3.6).',['@attraction']),
('W_STRETCH_SHARED','a stretch was shared between rows (§3.4/§3.6).',['@StretchRef']),
('W_WEDGE_ROUTED','an acute wedge was routed (§3.6).',['@insertChain']),
('W_PLACED','§3.6 placement rule placed a point on an existing edge.',['@placement']),
('W_PROMOTED','a finer vertex was promoted (§2.2 rule 3) - prepared vertices and stretch ends included.',['@batch','§2.2 rule 3']),
('W_SNAP_PASSES','snap-rounding needed extra passes (§3.6).',['@snapRounding']),
('W_ACUTE_CORNER','a soft minFaceAngle corner kept (§3.6/§3.10).',['@insertChain']),
('W_SLIVER_RETYPED','a sliver face was retyped (§3.6).',['@sliver']),
('W_STEINER','Steiner points were added (§3.7 overlay or §3.6).',['@oneEngine']),
('W_HEIGHT_CLAMPED','a height was clamped (§3.4/§3.9).',['@heights']),
('W_DOWNGRADE','an operation downgraded to a simpler shape (skeleton downgrades §3.8).',['@skeleton']),
('W_CUT_SLID','§4.6 step 8 (c) slid always-succeeding cut; count = the slide steps (J-Fredteam-1).',['§4.6 step 8 (c)'])]
n=44
for code,desc,prod in W:
    it(f'KERNEL-{n:04d}','warning-code','3.1',f'{code}: {desc}',['§3.1 Warning comment'],'kernel',prod,['§5.4 generation report','@KernelResult'],[code],provisional_producer=True); n+=1
add(I)
