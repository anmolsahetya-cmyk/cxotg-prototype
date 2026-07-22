# CX On The Go — Domain Glossary

This file defines the terms used across the CXOTG prototype so conversations and specs stay
precise. It is a glossary, not a spec — implementation details belong in code or plan files.

## Ticket Details flow

The set of screens reached after opening a single ticket from the ticket list. As of the
"Unified Scroll" revamp (branch `ticket_details_revamp`), comprises:

- **Ticket Detail shell** (`ticket-detail.html`) — single scrolling page (no tabs), navigated
  via a sticky jump-nav chip row (Overview / Comments / Activity / Root cause) with
  scroll-linked active-chip highlighting. Status, Priority, and Assigned To are tappable cards
  that open bottom sheets. Root cause is an inline card whose "Edit" action opens the CRC tree
  as a bottom sheet (not a separate screen).
- **`ticket-detail-legacy.html`** — the pre-revamp version (4-tab structure: Overview, Comments,
  Activity log, Root cause; CRC as its own full-screen picker). Kept for reference, linked from
  the hub page (`index.html`) under "Reference," not part of the live flow.

Explicitly **out of scope**: `send-email.html` (the "Respond via email" / Email quick action is
a handoff point out of this flow, not part of it).

## Design tokens

The CSS custom properties and utility classes defined in `shared/styles.css` (`--text`,
`--accent`, `--sp-*`, `--radius-*`, `.card`, `.input-field`, `.status-pill`, etc.). This is the
single source of truth for styling across the prototype going forward — screens that predate
the token system (e.g. the current Ticket Detail shell, which hardcodes hex colors and
one-off classes like `.ov-card`/`.dd-box`) are considered legacy drift to be migrated onto
tokens, not a competing standard to preserve. New tokens are added here when a redesign needs
a value the system doesn't yet have.

## CRC (Centralized Root Cause)

A nested category tree (section → item → sub-item) used to tag a ticket with one or more
standardized root causes, distinct from the free-text/legacy `rootCauses` field. In the live
`ticket-detail.html`, it's a bottom sheet opened from the inline Root Cause card's "Edit"
action — conceptually a field on the ticket, not a separate screen. `ticket-detail-legacy.html`
still implements it as its own full-screen picker (`renderCRCScreen()`).

## Detractor ticket

A ticket created automatically from a customer's NPS survey response scored as a detractor
(`npsScore`/`npsLabel` on the ticket record, `typeId` "Detractor alert"). The originating
survey context (score, verbatim) is present in the data model but not currently surfaced
anywhere in the Ticket Details flow.

## Ticket data model — extensibility

`shared/data.js`'s ticket schema (status, priority, assignee, segment, NPS fields, comments,
activity, root causes, tags) is treated as **flexible**, not fixed — new fields (e.g. an SLA
deadline, attachments) may be added when a specific redesign idea or new feature genuinely
needs one. Only add fields in service of a concrete feature/enhancement being built, not
speculatively.
