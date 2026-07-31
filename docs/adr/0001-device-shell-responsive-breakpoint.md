# Restore the phone-bezel mockup on desktop via a pure CSS width breakpoint

The "full-bleed app shell" commit removed the phone-bezel mockup (frame, navy backdrop, fake
status bar, home indicator) so the installed PWA fills a real phone's viewport edge-to-edge.
That's correct for mobile browsers, but leaves the prototype looking wrong when opened in a
regular desktop browser — no mockup, just the raw screen stretched across the window.

We reintroduce the mockup, but only above a `max-width: 480px` CSS breakpoint, so mobile stays
full-bleed and desktop gets the frame back. Considered alternatives:

- **User-agent/device detection** instead of viewport width — rejected as more complex and less
  reliable (spoofable/inconsistent UA strings) for no real benefit here.
- **Width + orientation** (so a landscape phone stays full-bleed) — rejected in favor of a
  width-only rule. A phone rotated to landscape (viewport width > 480px, since `orientation:
  portrait` in `manifest.json` only locks orientation once installed standalone, not in a
  regular browser tab) is treated the same as a resized desktop window and gets the framed
  mockup. This is a deliberate trade-off for staying pure-CSS with a single threshold, accepted
  because the app's screens are designed portrait-only anyway.

See CONTEXT.md ("Device shell (responsive breakpoint)") for the exact threshold and scope — this
ADR records *why* the rule is width-only, not what the rule is, since that's expected to stay
accurate in the glossary as the single source of truth.
