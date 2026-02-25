# Fix Review Findings from Codex

- [x] Fix #1: Change `securityLevel: "loose"` to `"strict"` in `components/mdx/Mermaid.tsx`
- [x] Fix #3: Remove `console.error` in Mermaid.tsx catch block, add a user-facing error state fallback instead — added `error` state, renders "Unable to render diagram." fallback
- [x] Write summary of changes to .dispatch/tasks/fix-review-findings/output.md
