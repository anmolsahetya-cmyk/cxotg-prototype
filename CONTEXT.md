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

## Date filter sheet

A shared bottom-sheet component (`openDateFilterSheet(currentLabel, onApply)` in
`shared/components.js`) offering Month presets and a Custom start/end tab. Used by both
`dashboard.html` (date range bar) and `ticket-list.html` (Closedloop top bar) — each screen
owns its own `dateRange` state and passes a callback that receives the applied label string.
Do not reimplement this sheet per-screen; extend the shared version if a screen needs a new
capability (e.g. an actual date picker instead of placeholder text).

`--ai-bg`/`--ai-border`/`--ai-text` (a purple treatment) are defined for AI-assisted surfaces
but deliberately left unused — AI-assisted surfaces (e.g. the Send Email flow's AI Draft/Refine
sheets) use the standard `--accent` blue like the rest of the app, to keep one accent language
app-wide rather than introduce a second one for AI content.

## Priority filter hand-off (Dashboard → Closedloop)

Dashboard's Closedloop donut and its legend rows are tap targets — clicking a priority
(Critical/High/Medium/Low) navigates to Closedloop (`ticket-list.html`) pre-filtered to that
priority. Implemented via the same `localStorage` hand-off pattern as Ticket Detail's AI-tag
chips (`pendingTagFilter`): a `pendingPriorityFilter` key is set before navigating, then read
and cleared by Closedloop on load.

Closedloop's segmented status tab (Escalated/New/Open/Resolved) and its `filters.priority` are
otherwise independent — filtering by tab happens first, then priority narrows further. Any
active priority filter bypasses the tab entirely (same rule as search and tag filters), so it
always shows every ticket of that priority across all statuses, not just the ones in the
currently active tab. This applies whether the priority filter came from the dashboard
hand-off or from picking a Priority chip in Closedloop's own Filter sheet.

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

## Implementation constraint — React Native portability

Every mockup/prototype screen built in this project must be replicable in **React Native
0.77.0+**. This is a hard constraint on the HTML/CSS/JS used here, not just a future porting
note:

- Layouts must map to Flexbox (RN's only layout system) — no CSS Grid, no `position: absolute`
  for structural layout (overlays/sheets are fine, RN supports absolute positioning for those
  too), no float.
- No CSS features RN can't do: no `:hover`/`:focus` states as the only affordance (touch has no
  hover), no `box-shadow` spread/inset tricks beyond what `elevation`/shadow props support, no
  CSS animations/transitions that don't have a straightforward Reanimated/Animated equivalent
  (simple transforms, opacity, and timing-based transitions are fine).
- Icons as inline SVG (as already done) — these map to `react-native-svg`.
- Prefer simple, composable primitives (row/column flex containers, pressable rows, bottom
  sheets, chips) over anything relying on native `<input>`/`<select>` behavior beyond basic
  text entry — RN needs `TextInput`, custom pickers, etc.
- When a design idea would require a DOM-only API (e.g. `contenteditable`, `<dialog>`,
  CSS `:has()`), find the RN-portable equivalent before adopting it, or flag the gap explicitly
  rather than let it silently ship as web-only.

## New Ticket flow — email-first identity resolution

The ticket-creation form (`create-ticket.html`) leads with **Email**, ahead of Name and Phone,
because email is the key used to resolve whether the reporter is an existing customer. The
resolution check ("customer lookup") runs on blur of the Email field (not live/debounced while
typing), and only after the value passes email-format validation — an invalid format shows an
inline error immediately rather than waiting for submit.

Outcomes of the lookup:

- **Match found** — Name is always disabled (falls back to the email's local-part when the
  matched record has no name on file). Phone is disabled and pre-filled if the matched record
  has one; if the matched record's phone is blank, Phone unlocks so the agent can capture it.
- **No match / lookup fails** — treated the same way: Name unlocks for manual entry, Phone stays
  empty and editable. A failed lookup (network/server error) fails open to this state rather
  than blocking ticket creation, with a non-blocking inline warning near Email.
- **Email edited again after a lookup already ran** — Name/Phone and their lock state reset
  immediately; the next blur re-runs the lookup. Prevents submitting a ticket where contact
  details belong to a different email than the one currently in the field.

While a lookup is in-flight, Name/Phone are dimmed and the Create Ticket button is disabled, to
avoid submitting before resolution completes. Required fields to enable submission are Email and
Description only — Segment (from originating context), Priority (Low), Status (New), and Date
(today) are pre-filled defaults the agent can still change.

The Date field is a tap-to-trigger picker (a row that opens a sheet), not a raw
`<input type="date">` — that element is DOM-only and has no React Native equivalent per the
portability constraint below. The RN build uses `@react-native-community/datetimepicker`
instead, which is triggered the same way but renders natively differently per platform: Android
opens its own system dialog, iOS renders an inline wheel that has to be hosted in a sheet/modal
the app controls (there's no "tap and iOS just handles it" the way Android's dialog does).

## Ticket data model — extensibility

`shared/data.js`'s ticket schema (status, priority, assignee, segment, NPS fields, comments,
activity, root causes, tags) is treated as **flexible**, not fixed — new fields (e.g. an SLA
deadline, attachments) may be added when a specific redesign idea or new feature genuinely
needs one. Only add fields in service of a concrete feature/enhancement being built, not
speculatively.

## Notifications

The notifications feed (`notifications.html`) surfaces exactly four event types generated by
ticket activity: **status change**, **priority change**, **ticket assign**, and **comment**.
Escalation is not a separate notification type — it is simply a status change where the new
value happens to be Escalated, rendered like any other status-change notification (with the
Escalated status color). NPS-detractor alerts and survey-response-count notifications (the
prototype's earlier `alert`/`response` seed types) are not part of this taxonomy — they aren't
notification-worthy events in this product's domain.

A notification is a **historical record, not a live view**: status/priority notifications
snapshot the value they announced at the time (stored directly on the notification, e.g.
`statusId`/`priorityId`), the same way `ticket.activity[]` entries are fixed text. They do not
re-read the ticket's current live state, which may have changed again since — a "changed to
Critical" notification from earlier still shows Critical even if the ticket's priority has since
moved on.

Note: `DATA.user` (the logged-in agent) has no `id` field linking it to `DATA.managers` — the
two are only implicitly the same person (matched by name/email/initials, both "Sarah Chen").
Anything needing "is this the logged-in user" must match on `email`.
