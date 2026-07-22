# CX On The Go — Domain Glossary

This file defines the terms used across the CXOTG prototype so conversations and specs stay
precise. It is a glossary, not a spec — implementation details belong in code or plan files.

## Ticket Details flow

The set of screens reached after opening a single ticket from the ticket list. Comprises:

- **Ticket Detail shell** (`ticket-detail.html`) — header + 4 tabs: Overview, Comments,
  Activity log, Root cause.
- **Overview tab overlays** — Status sheet, Priority sheet, Description sheet, Delete
  confirmation (all rendered as inline bottom-sheet overlays within `ticket-detail.html`).
- **CRC screen** (Centralized Root Cause) — a full-screen picker reached from the Root cause
  tab's "Edit" action, for selecting a ticket's root cause from a nested category tree.

Explicitly **out of scope**: `send-email.html` (the "Respond via email" action is a handoff
point out of this flow, not part of it).

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
standardized root causes, distinct from the free-text/legacy `rootCauses` field. Currently
implemented as its own full-screen picker (`renderCRCScreen()`) reached from the Root cause
tab's "Edit" action — conceptually it's a field on the ticket, not a separate object.

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
