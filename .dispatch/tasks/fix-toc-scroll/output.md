# Fix: TOC Sticky Scroll Restored

## Problem
The Table of Contents sidebar on blog posts stopped sticking to the viewport when scrolling. Commit `b64561f` (dispatch worker) added a `<nav aria-label="Table of contents">` wrapper for accessibility, but this broke sticky positioning.

## Root Cause
CSS `position: sticky` requires the sticky element's parent to be taller than the element itself — otherwise there's no room to "stick." The new `<nav>` wrapper had no explicit height and wrapped tightly around the `<div className="sticky top-28">`, making the sticky div fill its parent completely.

## Fix
Moved `sticky top-28` from the inner `<div>` onto the `<nav>` element itself, and removed the now-unnecessary inner `<div>` wrapper. The `<aside>` (flex child of the page layout) stretches to full content height via flexbox defaults, giving the sticky `<nav>` the scroll room it needs.

**Before:**
```jsx
<aside>
  <nav>                           ← no height, wraps content tightly
    <div className="sticky top-28"> ← stuck, nowhere to scroll
```

**After:**
```jsx
<aside>
  <nav className="sticky top-28">  ← sticky on the nav itself, aside provides height
```

## Verified
- `next build` passes cleanly
- Accessibility landmark (`<nav aria-label="Table of contents">`) preserved
