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

`--ai-bg`/`--ai-border`/`--ai-text` (a purple treatment) are defined for AI-assisted surfaces
but deliberately left unused — AI-assisted surfaces (e.g. the Send Email flow's AI Draft/Refine
sheets) use the standard `--accent` blue like the rest of the app, to keep one accent language
app-wide rather than introduce a second one for AI content.

## Send Email flow

The "Respond via email" compose experience (`send-email.html`), reached as a handoff action
from the Ticket Details flow (see above — it is explicitly out of scope of that flow, a
one-way jump-out, not a screen within it). A full standalone screen (`.nav-header` with a
back arrow, like `create-ticket.html`), not a bottom sheet — an earlier revision presented it
as a sheet sliding up over a darkened backdrop, but that was reverted in favor of a proper
screen. Built on the shared design-token/component system (`shared/styles.css` tokens,
`openSheet()`/`closeSheet()` from `shared/components.js`) rather than the local hardcoded-hex
`.se-*` styles and hand-rolled overlays it originally shipped with. Its own sub-sheets
(template picker, AI Draft, Refine, action history) are `openSheet()` instances layered over
the full screen.

Each ticket may carry an `emailHistory` array (newest first) — action emails actually sent
from this flow, each with its own back-and-forth `messages` (agent/customer exchange), shown
as the Action History disclosure's thread list. This is distinct from `ticket.activity`'s
single-line "Action email sent to..." log entries, which record that a send happened but not
the thread content.

The Refine sheet ("Response Assist") applies **one style adjustment at a time**: Tone and
Length chips are presented as two separate sections but intentionally share a single selection
slot — picking a Length chip clears any selected Tone chip and vice versa. This is a deliberate
constraint (not a bug to fix), so the UI carries a "Choose one" hint under those two sections
to set that expectation. Intent is a separate, independent slot and can be combined with
whichever Tone/Length choice is active.

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
