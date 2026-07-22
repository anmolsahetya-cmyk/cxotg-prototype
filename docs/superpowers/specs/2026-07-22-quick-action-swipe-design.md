# Quick Action Swipe & Settings Updates — Design

## Summary

Add swipe gestures to Quick Action ticket cards on the dashboard (swipe left = snooze,
swipe right = open ticket), and rename/extend the Account & Settings screen to support
configuring the snooze duration.

## Data model

Two new `localStorage` keys, following the existing `qaCount` pattern:

- `snoozeDays` — integer 1–7, default `1`. The number of days a snoozed ticket stays
  hidden from Quick Action.
- `ticketSnoozes` — JSON-encoded object `{ [ticketId: string]: snoozedUntilMs: number }`.
  Written whenever a ticket is snoozed; read on every Quick Action render to filter out
  tickets still within their snooze window.

Helper functions (dashboard.html):

```js
function getSnoozeDays() {
  const v = parseInt(localStorage.getItem('snoozeDays'), 10);
  return (v >= 1 && v <= 7) ? v : 1;
}

function _getSnoozeMap() {
  try { return JSON.parse(localStorage.getItem('ticketSnoozes')) || {}; }
  catch (e) { return {}; }
}

function _snoozeTicket(id) {
  const map = _getSnoozeMap();
  map[id] = Date.now() + getSnoozeDays() * 24 * 60 * 60 * 1000;
  localStorage.setItem('ticketSnoozes', JSON.stringify(map));
}

function _isSnoozed(id) {
  const map = _getSnoozeMap();
  return !!map[id] && map[id] > Date.now();
}
```

## Quick Action filtering

`_quickActionTickets()` gains a second exclusion alongside the existing Resolved filter:

```js
DATA.tickets
  .filter(t => t.statusId !== 3 && !_isSnoozed(t.id))
  .sort(...) // unchanged priority/status sort
  .slice(0, count);
```

Expired snoozes need no active cleanup — `_isSnoozed` simply treats a past timestamp as
not-snoozed, so the ticket reappears on its own once the window elapses. Stale entries
in `ticketSnoozes` are harmless (just a few bytes) and are left in place; no GC needed
for this prototype scope.

## Swipe interaction

Each Quick Action card is wrapped in a `.qa-swipe-wrap` container:

```html
<div class="qa-swipe-wrap" data-ticket-id="${t.id}">
  <div class="qa-swipe-bg qa-swipe-bg-left">  <!-- snooze reveal, shown when dragging right-to-left -->
    ${snoozeIcon} Snooze
  </div>
  <div class="qa-swipe-bg qa-swipe-bg-right"> <!-- open reveal, shown when dragging left-to-right -->
    Open ${chevronIcon}
  </div>
  <div class="qa-swipe-fg">${renderTicketCard(t, ...)}</div>
</div>
```

- `qa-swipe-bg-left`/`-right` are absolutely positioned behind `.qa-swipe-fg`, each only
  visible on its respective drag direction (controlled via opacity tied to drag distance).
- Pointer events (`pointerdown` / `pointermove` / `pointerup` / `pointercancel`) on
  `.qa-swipe-fg` translate it via `transform: translateX()` during the drag.
- **Tap vs. drag disambiguation:** if total pointer movement stays under 6px, treat as a
  tap — let the existing card `onclick` (navigate to ticket) fire normally, do not
  intercept.
- **Threshold:** 90px horizontal drag distance.
  - Released past threshold, dragged **left** → call `_snoozeTicket(id)`, animate the
    card the rest of the way off-screen (translateX to -100%), show a toast
    ("Snoozed for N day(s)"), then remove the card's wrapper from the DOM.
  - Released past threshold, dragged **right** → call `openTicket(id)` (same navigation
    as a tap).
  - Released before threshold (either direction) → animate `translateX` back to 0
    (snap back), no action taken.
- Only one card can be mid-drag at a time; vertical scroll of the Quick Action list is
  not hijacked — if the initial pointer movement is more vertical than horizontal, the
  gesture is treated as a scroll and the swipe is aborted (fg does not translate).

## Account & Settings screen changes (account.html)

1. AppBar/header title: `"Account"` → `"Account & Settings"`.
2. Section label: `"Settings"` → `"Quick action"`.
3. New row under "Quick action", above or below the existing tickets-count row:
   **"Ticket snooze time"** with a −/+ stepper, range 1–7, backed by `snoozeDays`,
   mirroring the existing `changeQaCount` stepper's markup/behavior
   (`changeSnoozeDays(delta)` / `getSnoozeDays()`).
4. Row label: `'Number of "Quick Action" tickets'` → `"Number of tickets to show"`
   (label text only, no behavior change).

## Out of scope

- No "undo snooze" affordance — snoozed tickets simply reappear after the configured
  window elapses.
- No cross-device/server persistence — this prototype is localStorage-only, matching
  all other settings in the app.
- No changes to ticket-list.html or other ticket views — swipe is Quick Action-only per
  the request.
