# Fix Table of Contents Sticky Scroll

- [x] Read components/TableOfContents.tsx and understand the current structure
- [x] Check git diff against main~5 or earlier commits to see what changed in TableOfContents.tsx recently — confirmed commit b64561f added `<nav>` wrapper around TOC content
- [x] Identify why `sticky top-28` is no longer working — the `<nav>` wrapper had no height constraint, so the sticky `<div>` filled its parent entirely with no room to stick
- [x] Fix the issue so the TOC scrolls with the user (sticky behavior restored) — moved `sticky top-28` from inner `<div>` to `<nav>`, removed unnecessary wrapper div
- [x] Write summary of the fix to .dispatch/tasks/fix-toc-scroll/output.md
