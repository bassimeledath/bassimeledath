# React Best Practices Review

**Codebase**: bassimeledath — Next.js 14 personal website with blog
**Reviewed against**: [Vercel React Best Practices](https://vercel.com/blog/introducing-react-best-practices) (57 rules, 8 categories)
**Date**: 2026-02-23

---

## Overall Assessment

This is a well-structured, small Next.js site. The architecture is fundamentally sound — proper use of the App Router, clean Server/Client Component boundaries, SSG for all pages, and minimal client-side JavaScript. The findings below are ordered by impact, from most impactful to least.

---

## CRITICAL — Eliminating Waterfalls

### 1. Redundant file reads in `getAllPosts()` — `lib/blog.ts:65-73`

**Rule**: `async-parallel` (CRITICAL)
**Impact**: Every call to `getPostBySlug()` independently calls `loadDates()`, which reads and parses `content/blog-dates.json` from disk. When `getAllPosts()` iterates N slugs, the dates file is read and parsed N times.

**Current**:
```ts
// lib/blog.ts
export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => getPostBySlug(slug))  // loadDates() called N times
    .sort(/* ... */);
}
```

**Recommended**:
```ts
export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  const dates = loadDates(); // Read once
  return slugs
    .map((slug) => getPostBySlugWithDates(slug, dates))
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
}
```

Or add simple memoization to `loadDates()`. With a single blog post this is negligible, but as content grows this becomes an N+1 file read problem.

---

## HIGH — Bundle Size Optimization

### 2. Project images missing `sizes` prop — `app/page.tsx:81-88`

**Rule**: `bundle-conditional` (HIGH)
**Impact**: Project grid images use `fill` without `sizes`, causing Next.js to serve the full-width image at every breakpoint. The grid is 1-col on mobile, 2-col on `sm`, 3-col on `lg`.

**Current**:
```tsx
<Image src={project.image} alt={project.title} fill
  className="object-cover transition-opacity group-hover:opacity-90"
  unoptimized={project.image.endsWith(".gif")} />
```

**Recommended**:
```tsx
<Image src={project.image} alt={project.title} fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover transition-opacity group-hover:opacity-90"
  unoptimized={project.image.endsWith(".gif")} />
```

This lets Next.js serve appropriately sized images, reducing bandwidth significantly on mobile.

### 3. Mermaid `securityLevel: "loose"` + re-initialization on every theme change — `components/mdx/Mermaid.tsx:18-29`

**Rule**: `bundle-dynamic-imports` (CRITICAL), re-render optimization
**Impact**: Mermaid is correctly dynamically imported (good), but `mermaid.initialize()` is called on every render triggered by theme changes. The `securityLevel: "loose"` is also broader than needed.

**Recommended**:
- Call `mermaid.initialize()` once and only re-render the chart on theme change
- Use `securityLevel: "strict"` unless you specifically need `"loose"` features (click events in diagrams, etc.)

### 4. Empty `next.config.mjs` — missing image optimization config

**Rule**: Server-side optimization
**Impact**: No `images.remotePatterns` configured. The MDX `<img>` component falls back to a raw `<img>` tag for external URLs (`components/mdx/MDXComponents.tsx:11-13`). If you ever serve external images, they won't be optimized.

**Recommended**:
```js
const nextConfig = {
  images: {
    remotePatterns: [
      // Add domains you reference in blog posts
    ],
  },
};
```

---

## HIGH — Server-Side Performance

### 5. `generateMetadata` reads post file independently — `app/blog/[slug]/page.tsx:19-28`

**Rule**: `server-cache-react` (HIGH)
**Impact**: Both `generateMetadata()` and the page component `BlogPostPage()` call `getPostBySlug(params.slug)`, reading the same file from disk twice per request. In Next.js 14, `React.cache()` is available to deduplicate this.

**Recommended**:
```ts
import { cache } from "react";

const getCachedPost = cache((slug: string) => getPostBySlug(slug));

// Then use getCachedPost(params.slug) in both generateMetadata and BlogPostPage
```

This deduplicates the file read within a single request.

---

## MEDIUM — Re-render Optimization

### 6. Global `*` transition rule — `app/globals.css:47-49`

**Rule**: Rendering performance
**Impact**: `* { transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease; }` applies transitions to every single DOM element. On pages with many elements (blog posts with code blocks), this forces the browser to track transitions on all of them during theme switches.

**Recommended**: Scope this to specific elements that actually need smooth theme transitions:
```css
body,
.prose,
header,
footer,
nav,
a,
button {
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
```

### 7. Mermaid re-renders with random IDs — `components/mdx/Mermaid.tsx:31`

**Rule**: `rerender-dependencies` (MEDIUM)
**Impact**: `Math.random().toString(36).slice(2, 9)` generates a new ID every render. While this doesn't cause extra re-renders (it's inside useEffect), it prevents mermaid from caching previous renders.

**Recommended**: Use a stable ID based on chart content:
```ts
const id = `mermaid-${chart.slice(0, 20).replace(/\W/g, '')}`;
```

---

## MEDIUM — Accessibility

### 8. Icon-only links missing `aria-label` — `app/page.tsx:32-55`, `components/Footer.tsx:9-32`

**Impact**: Social media links in the hero section and footer use icons only (FaGithub, FaLinkedin, FaXTwitter) with no text or aria-label. Screen readers will announce these as empty links.

**Files affected**:
- `app/page.tsx` lines 32-55 (3 links)
- `components/Footer.tsx` lines 9-32 (3 links)
- `app/page.tsx` lines 94-113 (project github/external links)

**Recommended**: Add `aria-label` to each:
```tsx
<a href="..." aria-label="GitHub profile" ...>
  <FaGithub size={20} />
</a>
```

### 9. No `<h1>` on home page — `app/page.tsx`

**Impact**: The home page has no `<h1>`. The first heading is `<h2>Projects</h2>`. The user's name "Bassim Eledath" is only in the Header nav link. Every page should have an `<h1>` for accessibility and SEO.

**Recommended**: Add a visually hidden `<h1>` or style the name as the page heading:
```tsx
<h1 className="sr-only">Bassim Eledath — AI Engineer</h1>
```

### 10. TableOfContents missing `<nav>` landmark — `components/TableOfContents.tsx:31`

**Impact**: The TOC uses `<aside>` but not `<nav>`. Since it's a navigation aid with links, it should be wrapped in `<nav aria-label="Table of contents">`.

**Recommended**:
```tsx
<aside className="hidden toc:block w-[260px] flex-shrink-0">
  <nav aria-label="Table of contents">
    <div className="sticky top-28">
      {/* ... */}
    </div>
  </nav>
</aside>
```

### 11. No skip-to-content link

**Impact**: Users navigating with a keyboard must tab through the header and nav on every page before reaching content.

**Recommended**: Add to `app/layout.tsx`:
```tsx
<body className="font-sans">
  <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">
    Skip to content
  </a>
  {/* ... */}
  <main id="main-content" className="min-h-[calc(100vh-200px)]">{children}</main>
```

### 12. No visible focus styles — `app/globals.css`

**Impact**: No custom focus indicators are defined. Browser defaults may be invisible against the custom color scheme, especially in dark mode.

**Recommended**: Add focus-visible styles:
```css
:focus-visible {
  outline: 2px solid rgb(var(--accent));
  outline-offset: 2px;
}
```

### 13. No `aria-current="page"` on active nav links — `components/Header.tsx`

**Impact**: Screen readers can't tell which nav link corresponds to the current page.

**Recommended**: Make Header a client component or accept a `pathname` prop to conditionally set `aria-current="page"` on the active link. Alternatively, use `usePathname()` from `next/navigation`.

---

## LOW — Anti-patterns & Code Quality

### 14. Duplicate `formatDate` function — `app/blog/page.tsx:5-11` and `app/blog/[slug]/page.tsx:30-36`

**Impact**: Identical function defined in two files. As the site grows, this leads to drift.

**Recommended**: Extract to `lib/utils.ts`:
```ts
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}
```

### 15. Duplicate social links markup — `app/page.tsx:32-55` and `components/Footer.tsx:8-33`

**Impact**: Same GitHub/LinkedIn/X links with nearly identical markup in two places. If you change a URL or add a platform, you must update both.

**Recommended**: Extract a shared `SocialLinks` component or a `socialLinks` data array in `data/`.

### 16. Mermaid shows nothing on render failure — `components/mdx/Mermaid.tsx:36-38`

**Impact**: If a Mermaid diagram fails to render, the component silently shows an empty div. Users see a blank box with no indication something went wrong.

**Recommended**: Set an error state and display a fallback:
```tsx
const [error, setError] = useState<string | null>(null);
// ... in catch:
setError("Failed to render diagram");
// ... in JSX:
if (error) return <div className="text-red-500 text-sm p-4">{error}</div>;
```

### 17. No error boundary around MDX rendering — `app/blog/[slug]/page.tsx:82-91`

**Impact**: If MDX content has a rendering error (malformed JSX, broken component), the entire page crashes with no graceful fallback.

**Recommended**: Wrap MDX rendering in a React Error Boundary component.

### 18. `dangerouslySetInnerHTML` with `securityLevel: "loose"` — `components/mdx/Mermaid.tsx:47-48`

**Impact**: LOW for this codebase (content is author-controlled), but `securityLevel: "loose"` + `dangerouslySetInnerHTML` is a security concern if MDX content could ever come from untrusted sources.

**Recommended**: Use `securityLevel: "strict"` (default) unless you need interactive diagrams.

---

## What's Already Done Well

These patterns align with Vercel best practices and should be maintained:

- **Server/Client Component split**: `"use client"` only where needed (ThemeProvider, ThemeToggle, TableOfContents, Mermaid). All pages and layouts are server components.
- **Thin client boundaries**: ThemeProvider is a minimal wrapper that passes children through, allowing server components to render inside it.
- **Static generation**: All pages use SSG with `generateStaticParams` for dynamic routes.
- **Dynamic import for Mermaid**: Heavy library is lazy-loaded with `await import("mermaid")`.
- **Proper `suppressHydrationWarning`** on `<html>` for next-themes compatibility.
- **Icon imports are tree-shakeable**: `react-icons/fa6` imports specific icons, not a barrel.
- **MDX runs on server**: Using `next-mdx-remote/rsc` keeps Shiki/rehype processing server-side.
- **Minimal client-side state**: Only theme and scroll-tracking state live on the client.
- **Clean component composition**: Small, focused components with clear responsibilities.
- **No prop drilling**: Data flows naturally from pages to components.

---

## Priority Summary

| # | Finding | Impact | Effort | Files |
|---|---------|--------|--------|-------|
| 1 | Redundant `loadDates()` in blog.ts | CRITICAL | Low | `lib/blog.ts` |
| 2 | Missing `sizes` on project images | HIGH | Low | `app/page.tsx` |
| 3 | Mermaid re-init + loose security | HIGH | Low | `components/mdx/Mermaid.tsx` |
| 4 | Missing image remote patterns config | HIGH | Low | `next.config.mjs` |
| 5 | Duplicate `getPostBySlug` in metadata | HIGH | Low | `app/blog/[slug]/page.tsx` |
| 6 | Global `*` transition rule | MEDIUM | Low | `app/globals.css` |
| 7 | Mermaid random IDs | MEDIUM | Low | `components/mdx/Mermaid.tsx` |
| 8 | Icon-only links missing aria-label | MEDIUM | Low | `app/page.tsx`, `Footer.tsx` |
| 9 | No `<h1>` on home page | MEDIUM | Low | `app/page.tsx` |
| 10 | TOC missing `<nav>` landmark | MEDIUM | Low | `TableOfContents.tsx` |
| 11 | No skip-to-content link | MEDIUM | Low | `app/layout.tsx` |
| 12 | No visible focus styles | MEDIUM | Low | `app/globals.css` |
| 13 | No `aria-current` on active nav | LOW | Medium | `components/Header.tsx` |
| 14 | Duplicate `formatDate` | LOW | Low | `blog/page.tsx`, `[slug]/page.tsx` |
| 15 | Duplicate social links | LOW | Low | `page.tsx`, `Footer.tsx` |
| 16 | Mermaid silent failure | LOW | Low | `Mermaid.tsx` |
| 17 | No error boundary for MDX | LOW | Medium | `[slug]/page.tsx` |
| 18 | `dangerouslySetInnerHTML` + loose security | LOW | Low | `Mermaid.tsx` |

All 18 findings are low-effort fixes. Items 1-5 should be addressed first for the best performance ROI.
