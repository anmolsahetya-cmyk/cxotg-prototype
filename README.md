# Pearl CX — Interactive Prototype

Browser-based interactive prototype of the Pearl CX React Native app. Built for UX research — CX managers navigate real flows inside a 390×844px phone frame.

## Running locally

```bash
npm start
# or
npx serve . -l 3030
```

Open [http://localhost:3030](http://localhost:3030) — the hub page links to all flows.

## Structure

```
index.html              ← Hub: links to all flows
marketing.html          ← Onboarding carousel + Login + Forgot Password
dashboard.html          ← Dashboard (NPS/CSAT charts, segment selector, date filter)
ticket-list.html        ← Ticket list + search + filter sheet + AI tags
ticket-detail.html      ← Ticket detail (Overview, Comments, Activity log, Root cause tabs)
send-email.html         ← Email composer + AI draft + template selector
create-ticket.html      ← Create Ticket form + picker sheets
notifications.html      ← Notification list

shared/
  styles.css            ← Design tokens, phone shell, component patterns
  components.js         ← renderPhoneShell(), drawer, bottom sheet system
  data.js               ← All dummy data (tickets, segments, NPS metrics, templates)

assets/
  fonts/                ← FiraSans OTF font files (self-contained)
  *.svg / *.png         ← Image assets (self-contained)
```

## Notes

- No build step, no dependencies — pure HTML/CSS/JS
- All assets are self-contained inside this directory
- Dummy data lives entirely in `shared/data.js`
