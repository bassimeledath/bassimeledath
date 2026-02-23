# Image Prompt Style Guide

Reference for generating blog thumbnails and hero images that match the site's visual identity.

## Site Design DNA

- **Light mode:** Warm cream/stone background `#FAFAF8`, dark text `#1A1A1A`
- **Dark mode (primary):** Warm near-black `#1C1A17`, off-white text `#E8E4DE`
- **Accent:** Amber/burnt orange `#B4530A` (light) / `#D97706` (dark)
- **Muted:** Warm gray `#6B6B6B` (light) / `#9A9489` (dark)
- **Fonts:** Instrument Sans (body), Newsreader (headings), JetBrains Mono (code)
- **Vibe:** Editorial, warm, craftsman — not corporate, not startup, not neon

## Image Constraints

| Property | Value |
|----------|-------|
| Aspect ratio | 16:9 |
| Min resolution | 1600x900 |
| Format | JPG (photos/illustrations), PNG (diagrams) |
| Location | `/public/images/blog/<slug>-hero.jpg` |
| Frontmatter | `thumbnail: /images/blog/<slug>-hero.jpg` |

## Prompt Principles

### Do

- **Use the site's color palette.** Dark warm background `#1C1A17`, amber `#D97706` as the only accent, warm grays for secondary elements.
- **Keep it abstract and simple.** The image should communicate the concept at thumbnail size (200px wide). If it needs to be read up close, it's too detailed.
- **Use geometric shapes** — rectangles, lines, dots, arcs. Let shape and color do the storytelling, not text.
- **Include slight grain texture** for analog warmth. Not smooth/plasticky.
- **Match the terminal/developer aesthetic** — dark mode, monospace hints, but stylized, not screenshot-literal.

### Don't

- No blues, greens, or cool tones. Warm palette only.
- No neon glow or cyberpunk vibes. Amber glow should feel like firelight, not LED.
- No human faces, mascots, logos, or watermarks.
- No gibberish text blocks. If text appears, it should be minimal and intentional (a command, a checkmark).
- No photorealism. Illustration/vector/3D render is fine.
- No busy gradients or complex backgrounds. The dark background IS the design.

## Prompt Template

```
[Aspect ratio] [style] illustration. [Background description].

[Main visual element(s) — describe shapes, positions, colors.]

[Secondary elements — describe supporting shapes, accents.]

Style: [2-3 style keywords]. Warm palette only — dark background (#1C1A17),
amber accent (#D97706), warm gray (#9A9489) for secondary elements,
off-white (#E8E4DE) for highlights. Slight grain texture.
No text, no logos, no human faces.
```

## Example: Dispatch Blog Post

The hero image for the dispatch blog post uses a split-screen concept:

- **Left:** ~12 overlapping terminal window shapes at messy angles with amber text/borders — visual chaos
- **Right:** One clean terminal with amber glow, three small worker status boxes below — visual calm
- **Divider:** Thin vertical amber line
- **Background:** Deep warm black
- **Style:** 3D-rendered with soft lighting, amber as the only color accent

This image works because at thumbnail size you instantly see "mess vs clean" without needing to read anything.
