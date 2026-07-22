# Quick Action Swipe & Settings Updates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add swipe-left-to-snooze / swipe-right-to-open gestures to Quick Action ticket cards on the dashboard, and update the Account & Settings screen to configure snooze duration and relabel copy.

**Architecture:** Static vanilla-JS prototype (no build step, no framework, no test runner — served via `npx serve`). All state lives in `localStorage`. Swipe is implemented with raw Pointer Events and CSS transforms directly in `dashboard.html`; settings changes are markup/label edits in `account.html`. There is no automated test suite in this repo (confirmed via `package.json` — only `start`/`serve` scripts), so every task's verification step is a manual browser check via `npx serve` + DevTools, not an automated test.

**Tech Stack:** Vanilla JS, inline `<script>`/`<style>` per HTML file, `localStorage` for persistence, `shared/data.js` (ticket data + maps), `shared/components.js` (`renderIcon`, `showToast`, `renderPhoneShell`).

## Global Constraints

- Snooze duration setting: integer range **1–7 days**, default **1**, stored in `localStorage['snoozeDays']`.
- Snoozed tickets: hidden from Quick Action until `Date.now() >= snoozedUntil`; no manual "unsnooze" UI.
- Resolved tickets (`statusId === 3`) remain excluded from Quick Action (existing behavior — do not regress).
- Swipe drag threshold: **90px** to commit an action; movement under **6px** is treated as a tap (falls through to existing `onclick` navigation), matching the approved spec.
- Account screen copy changes are text-only except for the new stepper row — do not alter unrelated rows/sections.
- No new files, no new dependencies, no build step introduced.

---

### Task 1: Snooze settings row on Account & Settings screen

**Files:**
- Modify: `account.html:105-118` (JS helpers, near `getQaCount`/`changeQaCount`)
- Modify: `account.html:125` (header title)
- Modify: `account.html:153-163` (section label + new stepper row + renamed row label)

**Interfaces:**
- Produces: `getSnoozeDays(): number` (reads `localStorage['snoozeDays']`, clamped 1–7, default 1) and `window.changeSnoozeDays(delta: number): void` (writes clamped value back, updates `#snooze-days-value` text). Task 2 (dashboard.html) independently re-implements `getSnoozeDays()` reading the same `localStorage['snoozeDays']` key — both files are static HTML with no shared JS module, so duplication here matches the existing `getQaCount` duplication pattern already present in both files.

- [ ] **Step 1: Add `getSnoozeDays`/`changeSnoozeDays` helpers**

In `account.html`, right after the existing `getQaCount`/`changeQaCount` block (after line 118), add:

```js
function getSnoozeDays() {
  const v = parseInt(localStorage.getItem('snoozeDays'), 10);
  return (v >= 1 && v <= 7) ? v : 1;
}
let snoozeDays = getSnoozeDays();

window.changeSnoozeDays = function(delta) {
  snoozeDays = Math.min(7, Math.max(1, snoozeDays + delta));
  localStorage.setItem('snoozeDays', snoozeDays);
  const el = document.getElementById('snooze-days-value');
  if (el) el.textContent = snoozeDays;
};
```

- [ ] **Step 2: Rename the header title**

In `account.html:125`, change:

```html
        <div class="acct-header-title">Account</div>
```

to:

```html
        <div class="acct-header-title">Account & Settings</div>
```

- [ ] **Step 3: Rename section label, rename tickets-count row, add snooze row**

In `account.html`, replace the block at lines 153-163:

```html
        <div class="acct-section-label">Settings</div>
        <div class="acct-card">
          <div class="acct-row">
            <span class="acct-row-label">Number of "Quick Action" tickets</span>
            <span style="display:flex;align-items:center;gap:10px;">
              <button onclick="changeQaCount(-1)" style="width:28px;height:28px;border-radius:14px;border:1px solid #D0D3D8;background:#fff;color:#1B3380;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;">−</button>
              <span id="qa-count-value" class="acct-row-value" style="min-width:16px;text-align:center;">${qaCount}</span>
              <button onclick="changeQaCount(1)" style="width:28px;height:28px;border-radius:14px;border:1px solid #D0D3D8;background:#fff;color:#1B3380;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;">+</button>
            </span>
          </div>
        </div>
```

with:

```html
        <div class="acct-section-label">Quick action</div>
        <div class="acct-card">
          <div class="acct-row">
            <span class="acct-row-label">Number of tickets to show</span>
            <span style="display:flex;align-items:center;gap:10px;">
              <button onclick="changeQaCount(-1)" style="width:28px;height:28px;border-radius:14px;border:1px solid #D0D3D8;background:#fff;color:#1B3380;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;">−</button>
              <span id="qa-count-value" class="acct-row-value" style="min-width:16px;text-align:center;">${qaCount}</span>
              <button onclick="changeQaCount(1)" style="width:28px;height:28px;border-radius:14px;border:1px solid #D0D3D8;background:#fff;color:#1B3380;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;">+</button>
            </span>
          </div>
          <div class="acct-row">
            <span class="acct-row-label">Ticket snooze time</span>
            <span style="display:flex;align-items:center;gap:10px;">
              <button onclick="changeSnoozeDays(-1)" style="width:28px;height:28px;border-radius:14px;border:1px solid #D0D3D8;background:#fff;color:#1B3380;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;">−</button>
              <span id="snooze-days-value" class="acct-row-value" style="min-width:16px;text-align:center;">${snoozeDays}</span>
              <button onclick="changeSnoozeDays(1)" style="width:28px;height:28px;border-radius:14px;border:1px solid #D0D3D8;background:#fff;color:#1B3380;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;">+</button>
            </span>
          </div>
        </div>
```

- [ ] **Step 4: Manual verification**

Run: `npx serve . -l 3030` from the repo root, then open `http://localhost:3030/account.html`.

Expected:
- Header reads "Account & Settings".
- Section above the tickets-count row reads "Quick action".
- First row reads "Number of tickets to show" with working −/+ (already-existing behavior, unchanged).
- Second row reads "Ticket snooze time", starts at `1`, − is disabled-in-effect at 1 (button stays but value won't go below 1), + increments up to 7 and stops.
- In DevTools console: `localStorage.getItem('snoozeDays')` reflects the last value set after clicking +/−.

- [ ] **Step 5: Commit**

```bash
git add account.html
git commit -m "Add ticket snooze time setting and rename Account & Settings copy"
```

---

### Task 2: Snooze data helpers + Quick Action filtering (dashboard.html)

**Files:**
- Modify: `dashboard.html:523-535` (`_quickActionTickets`, `getQaCount`)

**Interfaces:**
- Consumes: `DATA.tickets` (array of `{id, statusId, priorityId, ...}`, from `shared/data.js`).
- Produces: `getSnoozeDays(): number`, `_getSnoozeMap(): Record<string, number>`, `_snoozeTicket(id: string): void`, `_isSnoozed(id: string): boolean` — all used by Task 3's swipe handler and by `_quickActionTickets()`.

- [ ] **Step 1: Add snooze helpers and wire the filter into `_quickActionTickets`**

In `dashboard.html`, replace the block at lines 523-535:

```js
function _quickActionTickets() {
  const ordered = DATA.tickets
    .filter(t => t.statusId !== 3) // exclude Resolved
    .slice()
    .sort((a, b) => {
      if (b.priorityId !== a.priorityId) return b.priorityId - a.priorityId; // Critical > High > Medium > Low
      return _QA_STATUS_RANK[a.statusId] - _QA_STATUS_RANK[b.statusId]; // Escalated > Open > New
    });
  const count = getQaCount();
  return ordered.slice(0, count);
}

function getQaCount() {
  const v = parseInt(localStorage.getItem('qaCount'), 10);
  return (v >= 1 && v <= 10) ? v : 5;
}
```

with:

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

function _quickActionTickets() {
  const ordered = DATA.tickets
    .filter(t => t.statusId !== 3 && !_isSnoozed(t.id)) // exclude Resolved and currently-snoozed
    .slice()
    .sort((a, b) => {
      if (b.priorityId !== a.priorityId) return b.priorityId - a.priorityId; // Critical > High > Medium > Low
      return _QA_STATUS_RANK[a.statusId] - _QA_STATUS_RANK[b.statusId]; // Escalated > Open > New
    });
  const count = getQaCount();
  return ordered.slice(0, count);
}

function getQaCount() {
  const v = parseInt(localStorage.getItem('qaCount'), 10);
  return (v >= 1 && v <= 10) ? v : 5;
}
```

- [ ] **Step 2: Manual verification**

Run: `npx serve . -l 3030`, open `http://localhost:3030/dashboard.html`, open DevTools console.

Expected:
- `localStorage.setItem('ticketSnoozes', JSON.stringify({[DATA.tickets[0].id]: Date.now() + 86400000}))` then reload the page → that ticket no longer appears in the Quick Action list.
- `localStorage.removeItem('ticketSnoozes')` then reload → the ticket is back (assuming it still ranks within `qaCount`).
- Setting a past timestamp (`Date.now() - 1000`) for a ticket and reloading → ticket is **not** hidden (snooze expired).

- [ ] **Step 3: Commit**

```bash
git add dashboard.html
git commit -m "Add snooze data helpers and exclude snoozed tickets from Quick Action"
```

---

### Task 3: Swipe gesture markup, styles, and interaction logic

**Files:**
- Modify: `dashboard.html` (add CSS near the existing `.qa-title`/`.qa-list` rules — find with `grep -n "qa-list\|qa-title" dashboard.html`)
- Modify: `dashboard.html:702-706` (Quick Action render block)
- Modify: `dashboard.html` (add swipe controller JS after `_quickActionTickets`/`getQaCount`, i.e. after the block edited in Task 2)

**Interfaces:**
- Consumes: `_snoozeTicket(id)`, `_isSnoozed(id)` from Task 2; `openTicket(id)` (existing, `dashboard.html:537`); `showToast(message, type, duration)` and `renderIcon(name, size)` from `shared/components.js`.
- Produces: `_initQaSwipe(): void` — called once after the Quick Action list is rendered into the DOM, attaches Pointer Event listeners to every `.qa-swipe-wrap` currently in `#screen`.

- [ ] **Step 1: Add swipe CSS**

In `dashboard.html`, find the existing `.qa-title`/`.qa-list` CSS rules:

```bash
grep -n "\.qa-title\|\.qa-list" dashboard.html
```

Immediately after that block, add:

```css
.qa-swipe-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 10px;
}
.qa-swipe-bg {
  position: absolute;
  top: 0; bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  box-sizing: border-box;
}
.qa-swipe-bg-left {
  left: 0;
  background: #F6C140;
  justify-content: flex-end;
}
.qa-swipe-bg-right {
  left: 0;
  background: #1b87e6;
  justify-content: flex-start;
}
.qa-swipe-fg {
  position: relative;
  background: #fff;
  touch-action: pan-y;
}
```

- [ ] **Step 2: Wrap each rendered card in the swipe markup**

In `dashboard.html:702-706`, replace:

```html
        <!-- Quick Action -->
        <div class="qa-title">Quick Action</div>
        <div class="qa-list">
          ${_quickActionTickets().map(t => renderTicketCard(t, `openTicket('${t.id}')`)).join('')}
        </div>
```

with:

```html
        <!-- Quick Action -->
        <div class="qa-title">Quick Action</div>
        <div class="qa-list">
          ${_quickActionTickets().map(t => `
            <div class="qa-swipe-wrap" data-ticket-id="${t.id}">
              <div class="qa-swipe-bg qa-swipe-bg-left">Snooze ${renderIcon('history', 16)}</div>
              <div class="qa-swipe-bg qa-swipe-bg-right">${renderIcon('chevron_right', 16)} Open</div>
              <div class="qa-swipe-fg">${renderTicketCard(t, `openTicket('${t.id}')`)}</div>
            </div>
          `).join('')}
        </div>
```

- [ ] **Step 3: Add the swipe controller and call it after render**

In `dashboard.html`, immediately after the block edited in Task 2 Step 1 (after the `getQaCount` function), add:

```js
function _initQaSwipe() {
  const THRESHOLD = 90;
  const TAP_SLOP = 6;

  document.querySelectorAll('.qa-swipe-wrap').forEach(wrap => {
    const fg = wrap.querySelector('.qa-swipe-fg');
    const bgLeft = wrap.querySelector('.qa-swipe-bg-left');
    const bgRight = wrap.querySelector('.qa-swipe-bg-right');
    const ticketId = wrap.dataset.ticketId;

    let startX = 0, startY = 0, dx = 0, dragging = false, aborted = false;

    fg.addEventListener('pointerdown', (e) => {
      startX = e.clientX;
      startY = e.clientY;
      dx = 0;
      dragging = true;
      aborted = false;
      fg.style.transition = 'none';
      fg.setPointerCapture(e.pointerId);
    });

    fg.addEventListener('pointermove', (e) => {
      if (!dragging || aborted) return;
      const dy = e.clientY - startY;
      dx = e.clientX - startX;
      if (!aborted && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > TAP_SLOP) {
        aborted = true;
        fg.style.transform = 'translateX(0)';
        bgLeft.style.opacity = '0';
        bgRight.style.opacity = '0';
        return;
      }
      fg.style.transform = `translateX(${dx}px)`;
      bgLeft.style.opacity = dx < 0 ? String(Math.min(1, -dx / THRESHOLD)) : '0';
      bgRight.style.opacity = dx > 0 ? String(Math.min(1, dx / THRESHOLD)) : '0';
    });

    function finishDrag(e) {
      if (!dragging) return;
      dragging = false;
      fg.style.transition = 'transform 0.2s ease';

      if (aborted || Math.abs(dx) < TAP_SLOP) {
        fg.style.transform = 'translateX(0)';
        bgLeft.style.opacity = '0';
        bgRight.style.opacity = '0';
        return;
      }

      if (dx <= -THRESHOLD) {
        fg.style.transform = 'translateX(-100%)';
        _snoozeTicket(ticketId);
        const days = getSnoozeDays();
        showToast(`Snoozed for ${days} day${days === 1 ? '' : 's'}`, 'success');
        setTimeout(() => wrap.remove(), 200);
      } else if (dx >= THRESHOLD) {
        openTicket(ticketId);
      } else {
        fg.style.transform = 'translateX(0)';
        bgLeft.style.opacity = '0';
        bgRight.style.opacity = '0';
      }
    }

    fg.addEventListener('pointerup', finishDrag);
    fg.addEventListener('pointercancel', finishDrag);
  });
}
```

- [ ] **Step 4: Call `_initQaSwipe()` after the dashboard renders**

Find where the dashboard's render function assigns to `document.body.innerHTML` (mirrors `account.html`'s `document.body.innerHTML = renderPhoneShell(renderAccount(), 'account');`):

```bash
grep -n "document.body.innerHTML" dashboard.html
```

Immediately after that line, add:

```js
_initQaSwipe();
```

- [ ] **Step 5: Manual verification**

Run: `npx serve . -l 3030`, open `http://localhost:3030/dashboard.html` in a touch-emulation-enabled DevTools view (Chrome DevTools → toggle device toolbar for touch events) or use mouse drag (Pointer Events fire for mouse too).

Expected:
- Dragging a card left reveals the yellow "Snooze" background; releasing past 90px snoozes it — the card animates away, a toast reading "Snoozed for 1 day" (or current setting) appears, and the ticket disappears from the list. `localStorage.getItem('ticketSnoozes')` now contains that ticket's id with a future timestamp.
- Dragging a card right reveals the blue "Open" background; releasing past 90px navigates to `ticket-detail.html` for that ticket (same as tapping it).
- Dragging less than 90px and releasing snaps the card back to its original position with no action taken.
- A plain click/tap (no drag) still opens the ticket normally.
- Dragging mostly vertically (simulating a list scroll) does not trigger snooze/open and does not visibly shift the card horizontally.

- [ ] **Step 6: Commit**

```bash
git add dashboard.html
git commit -m "Add swipe-to-snooze and swipe-to-open gestures on Quick Action cards"
```

---

### Task 4: End-to-end manual walkthrough

**Files:** None (verification only, no code changes).

- [ ] **Step 1: Full flow check**

Run: `npx serve . -l 3030`.

1. Open `http://localhost:3030/account.html`. Set "Ticket snooze time" to `3`. Confirm header/section/labels match Task 1's expectations.
2. Open `http://localhost:3030/dashboard.html`. Swipe left on the top Quick Action card past threshold.
3. Confirm the toast reads "Snoozed for 3 days" (reflecting the setting from step 1).
4. Reload the page — confirm the snoozed ticket stays hidden from Quick Action.
5. In DevTools console, run:
   ```js
   const map = JSON.parse(localStorage.getItem('ticketSnoozes'));
   const id = Object.keys(map)[0];
   map[id] = Date.now() - 1000; // force-expire
   localStorage.setItem('ticketSnoozes', JSON.stringify(map));
   ```
   Reload — confirm the ticket reappears in Quick Action (subject to `qaCount`/priority ranking).
6. Confirm a Resolved ticket (check `DATA.tickets` in `shared/data.js` for one with `statusId: 3`) still never appears in Quick Action, snoozed or not.

- [ ] **Step 2: Commit (if any fixups were needed)**

```bash
git add -A
git commit -m "Fix issues found during Quick Action swipe end-to-end walkthrough"
```

(Skip this commit if step 1 required no changes.)
