from manim import *
import tempfile, os

# ── Creative Chaos Dark (from story.json shared_style) ──
BG        = "#2a2a3a"
SURFACE   = "#3a3a4a"
BORDER    = "#4a4a5a"
PRIMARY   = "#ff3366"
ACCENT    = "#33ccff"
HIGHLIGHT = "#ffcc00"
SUCCESS   = "#66ff66"
NEGATIVE  = "#ff4444"
TEXT_CLR  = "#ffffff"
TEXT_DIM  = "#8a8aaa"

# ── Country-specific colors (consistent across all scenes) ──
US_COLOR    = ACCENT     # Blue
CHINA_COLOR = NEGATIVE   # Red
INDIA_COLOR = SUCCESS    # Green

# ── Asset directory ──
ASSET_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets")


def svg_icon(svg_string, scale=1.0):
    """Write inline SVG to temp file and load as SVGMobject.
    Use for rare one-off SVGs (under 5 lines). Prefer load_asset() for validated assets."""
    tmpdir = tempfile.mkdtemp()
    path = os.path.join(tmpdir, "icon.svg")
    with open(path, "w") as f:
        f.write(svg_string)
    return SVGMobject(path).scale(scale)


def load_asset(asset_id, scale=1.0):
    """Load a validated SVG asset from .manimate/assets/."""
    path = os.path.join(ASSET_DIR, f"{asset_id}.svg")
    if not os.path.exists(path):
        raise FileNotFoundError(f"Asset not found: {path}")
    return SVGMobject(path).scale(scale)


def tw(text_str):
    """Calculate reading time wait duration: max(2, word_count / 3)."""
    return max(2, len(text_str.split()) / 3)


def dot_grid():
    """Create the signature Creative Chaos dot grid background."""
    return VGroup(*[
        Dot([x, y, 0], radius=0.02, fill_opacity=0.08, color=TEXT_CLR)
        for x in range(-7, 8) for y in range(-4, 5)
    ])


def setup_scene(scene):
    """Set background color and add dot grid. Call at the start of construct()."""
    scene.camera.background_color = BG
    scene.add(dot_grid())


def title_card(scene, text, wait=1.5):
    """Show title with signature underline, then move to corner.

    Args:
        scene: the Scene instance (pass `self` from construct)
        text: the title string
        wait: seconds to display before moving to corner (default 1.5)
    Returns:
        title Mobject (now in the UL corner at scale 0.55)
    """
    title = Text(text, font="Galvji", font_size=44, color=TEXT_CLR, weight=BOLD)
    underline = Line(
        title.get_left() + DOWN * 0.35,
        title.get_right() + DOWN * 0.35,
        color=PRIMARY, stroke_width=2.5,
    )
    scene.play(
        FadeIn(title, shift=UP * 0.4),
        GrowFromCenter(underline),
        run_time=0.7,
    )
    scene.wait(wait)
    scene.play(
        title.animate.scale(0.55).to_corner(UL, buff=0.5),
        FadeOut(underline, run_time=0.3),
        run_time=0.5,
    )
    return title


def make_node(label, color=None, w=2.5, h=0.8):
    """Create a labeled rounded rectangle node. Box auto-sizes to fit text."""
    if color is None:
        color = PRIMARY
    text = Text(label, font="Avenir Next", font_size=22, color=TEXT_CLR)
    box_w = max(w, text.width + 0.6)
    box_h = max(h, text.height + 0.4)
    box = RoundedRectangle(
        corner_radius=0.15, width=box_w, height=box_h,
        fill_color=SURFACE, fill_opacity=1,
        stroke_color=color, stroke_width=1.5,
    )
    text.move_to(box)
    return VGroup(box, text)


def progress_bar(width=8, height=0.4, fill_color=None):
    """Create a progress bar. Returns VGroup(track, fill) with fill at 0%.
    Animate with: self.play(set_progress(bar, 0.75), run_time=1.0)"""
    if fill_color is None:
        fill_color = PRIMARY
    pad = height * 0.12
    track = RoundedRectangle(
        corner_radius=height / 2, width=width, height=height,
        fill_color=SURFACE, fill_opacity=1,
        stroke_color=BORDER, stroke_width=1.5,
    )
    fill = RoundedRectangle(
        corner_radius=max(0.05, (height - 2 * pad) / 2),
        width=pad, height=height - 2 * pad,
        fill_color=fill_color, fill_opacity=1, stroke_width=0,
    )
    fill.align_to(track, LEFT).shift(RIGHT * pad)
    return VGroup(track, fill)


def set_progress(bar, pct):
    """Return .animate for bar fill to reach pct (0.0-1.0). Fill stays inside track."""
    track, fill = bar[0], bar[1]
    pad = track.height * 0.12
    target_w = max(pad, (track.width - 2 * pad) * max(0.0, min(1.0, pct)))
    target_x = track.get_left()[0] + pad + target_w / 2
    return fill.animate.set_width(target_w).move_to(
        [target_x, track.get_center()[1], 0]
    )
