# Dispatch Blog Hero Image — 3 Prompt Directions

## Design Context

- **Site palette (dark mode primary):** Background `rgb(28, 26, 23)` (warm near-black), foreground `rgb(232, 228, 222)` (warm off-white), accent `#D97706` (amber/orange)
- **Fonts:** JetBrains Mono for code, Instrument Sans for UI
- **Vibe:** Terminal-native, warm not cold, craftsman not corporate

---

## Prompt 1: "Mission Control"

**Concept:** Cinematic top-down desk shot. The left half is a developer drowning in terminals — a laptop screen fractured into 8+ overlapping Claude Code windows, each with different file contexts, sticky notes, half-read diffs. The right half is the same desk but transformed: one clean terminal in focus with a markdown checklist glowing amber, and ghostly worker processes fanning out like satellite feeds on secondary monitors. The dividing line between halves is a sharp amber vertical stripe.

**Rationale:** This is the most literal, immediately legible interpretation. Anyone who's had 10 tabs open gets it in under a second. The top-down desk perspective is inherently scroll-stopping because it feels voyeuristic — you're looking at someone's actual workspace.

### Prompt

```
Wide cinematic 16:9 split-screen image, viewed from directly above a developer's desk. Dark warm-brown background (#1C1A17).

LEFT HALF — CHAOS: A laptop screen showing 8+ overlapping terminal windows on a dark background. Each terminal has JetBrains Mono-style monospace text in off-white, showing different file paths and code contexts. Terminal title bars show names like "feature-auth", "bug-fix-342", "review-pr-17", "research-caching". Some windows are partially obscured. Scattered sticky notes with hasty handwriting. A notification badge showing "12 unread". The overall feel is cluttered, overwhelming, slightly tilted/askew. Subtle red-orange stress indicators — maybe a terminal with an error, a tab bar overflowing.

RIGHT HALF — CONTROL: The same desk, but now a single clean terminal window dominates. The terminal shows a markdown checklist with amber (#D97706) checkbox marks: "✓ Scan for hardcoded secrets", "✓ Review auth logic", "→ Check dependencies" (with a blinking cursor). Below the main terminal, 3-4 small, perfectly aligned status indicators glow softly — each representing a background worker, showing model name and progress (e.g., "opus: reviewing PR ██████░░ 75%", "sonnet: researching patterns ████░░░░ 50%"). Clean, minimal, spacious.

DIVIDING LINE: A razor-thin vertical amber (#D97706) line separates the two halves, with a subtle glow/bloom effect.

Style: Digital illustration with a slight grain texture. Not photorealistic — more like a high-quality technical illustration you'd see in a developer tool's landing page. Warm color temperature throughout. No humans visible, just their workspace. The image should feel like it belongs on a premium developer blog with a dark theme.
```

---

## Prompt 2: "Spaghetti to Topology"

**Concept:** Abstract and architectural. The left half is a tangle — terminal windows connected by chaotic, crossing lines representing context-switching, copy-pasting, and mental overhead. It looks like a bad network diagram or tangled yarn. The right half shows those same nodes reorganized into an elegant hub-and-spoke topology with one central dispatch node and clean radiating connections. The transformation from chaos to order is visual and immediate. This is more "diagram as art" than literal screenshot.

**Rationale:** This direction leans into the architectural beauty of dispatch's design. It appeals to the systems-thinking developer who appreciates clean topology. The abstract nature makes it more unique — you won't confuse this with any other blog post thumbnail. The tangle-to-topology visual metaphor is universally understood.

### Prompt

```
Wide 16:9 abstract technical illustration on a deep warm-black background (#1C1A17). Split composition.

LEFT HALF — TANGLE: 7-8 rounded rectangles representing terminal windows, each containing 2-3 lines of monospace text (barely readable, more texture than content). The rectangles overlap and crowd each other at odd angles. Between them, dozens of thin lines (representing context switches, copy-paste flows, mental threads) cross and tangle into a dense knot at the center. The lines are in muted warm gray (#9A9489) and feel like tangled string or a messy circuit board trace. Some nodes pulse with small warning indicators. The overall shape is a compressed, anxious cluster. Small labels float near some lines: "copy context →", "which tab was this?", "re-explain", "lost thread".

RIGHT HALF — TOPOLOGY: One larger central node, glowing with an amber (#D97706) border and containing the text "> /dispatch" in clean monospace. From it, 5 perfectly spaced lines radiate outward to smaller worker nodes arranged in a gentle arc. Each worker node has a subtle label ("opus", "sonnet", "codex") and a tiny progress bar. The lines are clean, evenly spaced, and glow with a soft amber gradient that fades toward the worker nodes. Between some workers and the hub, small file icons float (representing the filesystem IPC — .question, .answer, .done files). The overall shape is open, breathing, organized.

TRANSITION: The center of the image (where left meets right) shows the tangled lines gradually straightening and finding order — a smooth morphing from chaos to structure. No hard dividing line; instead, the transformation is the focal point.

Style: Clean vector-like illustration with subtle depth. Think information-design meets data visualization art. Thin lines, precise geometry on the right, deliberate mess on the left. Warm color palette only — no blues or greens. Background has a very faint grid pattern like graph paper. Slight grain texture for analog warmth.
```

---

## Prompt 3: "The Last Tab You'll Ever Open"

**Concept:** This one goes for emotional impact over technical accuracy. A single terminal window, centered, glowing amber against the void. Inside it, a simple command: `/dispatch`. Around the terminal, fading into the dark background, are the ghosts of dozens of dead terminal tabs — translucent, scattered, falling away like leaves. It's not a split-screen; it's an arrival. The "before" is the debris field surrounding the "after." This is the one terminal to rule them all.

**Rationale:** This breaks the split-screen convention the other two follow, which makes it stand out. It's more poster/album-cover than diagram. The ghostly falling tabs create movement and drama. The single glowing terminal is iconic and memorable — it could become a recognizable visual identity for Dispatch. It's the kind of image that works as a tiny thumbnail AND a full hero.

### Prompt

```
Wide 16:9 dramatic illustration. Deep warm-black void background (#1C1A17) with extremely subtle radial gradient (slightly lighter at center).

CENTER: One terminal window, perfectly centered, sharp and vivid. Dark background inside the terminal (#25231F), with warm off-white monospace text. The terminal shows:

  $ /dispatch "refactor the auth module"

  ✓ Planning complete — 5 tasks
  ⟳ Spawning worker (opus)...
  ⟳ Worker active — tracking progress

  Your session is free. What's next?

The terminal has a subtle amber (#D97706) glow emanating from its edges — not neon-bright, but warm, like firelight. The terminal's title bar reads "dispatch" with a small amber dot indicator.

SURROUNDING: Scattered around the central terminal, receding into the darkness in all directions, are 15-20 ghost terminals. They are translucent (10-30% opacity), slightly blurred, and drifting away from center as if caught in a gentle explosion or gravity well. Each ghost terminal shows fragments of different work: a git diff, an error log, a code review, a test output. Some are tilted, some are shrinking, some overlap. They represent the old way — all the tabs you used to juggle. The closest ghosts are more visible; the farthest are barely distinguishable from the dark background.

The ghost terminals have no amber glow — they're cool gray, lifeless. The contrast between the one warm, alive terminal and the field of cold dead ones is the entire visual story.

BOTTOM: Very subtle, almost subliminal text at the bottom in muted gray (#6B6B6B), monospace: "one dispatcher. many workers. you decide."

Style: Cinematic, atmospheric. Think movie poster meets terminal art. Strong depth of field effect — the center terminal is razor sharp, everything else softly falls off. Warm amber is the ONLY color besides the grayscale ghosts. Slight film grain. No borders, no UI chrome around the image — it should bleed to the edges. The mood is quiet confidence, not flashy tech-bro energy.
```

---

## Summary

| # | Name | Approach | Strength |
|---|------|----------|----------|
| 1 | Mission Control | Literal split-screen desk shot | Instantly relatable, clear before/after |
| 2 | Spaghetti to Topology | Abstract architecture diagram | Appeals to systems thinkers, visually unique |
| 3 | The Last Tab You'll Ever Open | Cinematic single-hero with ghost tabs | Most emotionally striking, works at any size |
