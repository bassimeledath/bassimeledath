# Diff Review: `main...blog/dispatch-skill`

## Verdict
REQUEST CHANGES

## Findings (by severity)

1. High: Mermaid rendering is configured in a less-safe mode while injecting raw SVG HTML.
- `components/mdx/Mermaid.tsx:21` sets `securityLevel: "loose"`.
- `components/mdx/Mermaid.tsx:48` uses `dangerouslySetInnerHTML` with rendered SVG.
- Risk: if diagram source ever becomes user-controlled (or copied from untrusted input), this weakens XSS defenses.
- Recommendation: use Mermaid's stricter security level (`strict`), and keep a clear trust boundary for diagram sources.

2. Medium: Existing blog post was removed and replaced, which may be accidental content regression.
- `content/blog/mise-en-place.mdx` is deleted.
- `content/blog/dispatch.mdx` is added.
- Risk: previous `/blog/mise-en-place` URL will no longer exist (SEO/backlink breakage) unless this was intentional and redirected.
- Recommendation: confirm deletion intent; if intentional, add a redirect or migration note.

3. Low: Client-side debug/error logging remains in production path.
- `components/mdx/Mermaid.tsx:37` logs `console.error("Mermaid rendering failed:", e)`.
- Risk: noisy client logs; can expose internal rendering details.
- Recommendation: gate logging to development or render a user-facing fallback without console noise.

## Additional checks performed
- Reviewed all changed files in `main...HEAD`.
- Verified dependency consistency for Mermaid: `package.json` and `package-lock.json` both include `mermaid@^11.12.3`.
- No secrets or hardcoded credentials found in the diff.
- `npm ls mermaid --depth=1` resolved cleanly.

## Validation limits in this environment
- `npm run lint` could not run to completion because Next.js prompted for first-time ESLint setup (interactive).
- `npm run build` failed due network-restricted font fetches from `fonts.googleapis.com` (not caused by this branch's diff).
- `npx tsc --noEmit` fails on an unchanged pre-existing issue at `lib/mdx-options.ts:10`.
