# Fix Review Findings — Summary

## Changes made to `components/mdx/Mermaid.tsx`

### Fix #1: Security level hardened
- Changed `securityLevel: "loose"` to `"strict"` in the mermaid config (line 22).
- This prevents mermaid from injecting raw HTML/scripts into the rendered SVG.

### Fix #3: Error handling improved
- Removed `console.error("Mermaid rendering failed:", e)` from the catch block.
- Added `const [error, setError] = useState(false)` state (line 13).
- Catch block now calls `setError(true)` (line 38).
- Added an early return that renders a styled fallback div with the message "Unable to render diagram." when `error` is `true` (lines 45-51).
