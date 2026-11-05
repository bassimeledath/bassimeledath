# Betterloop project media

`public/images/projects/betterloop-letter.gif` uses an unchanged browser screenshot of an actual Betterloop letter. A viewport moves down that screenshot. This replaces the earlier illustrated product mockup.

The letter was created through the real Betterloop API, with three submitted contributions and the production reader component. All member names, email addresses, and updates in the fixture are fictional. Email is captured locally. No production group data or private photos appear in the media.

The still image, `betterloop-letter-poster.png`, is used when the visitor requests reduced motion. The GIF is 640 × 400 pixels and lasts about fifteen seconds.

## Compact profile game

The About page uses `components/WhackABassim.tsx`. The cabinet says **Whac-A-Bassim**, uses a 320 × 280 SVG view box, and has no surrounding panel or drop shadow. At the desktop width of 337.5 px, it is about 295.3 px tall. On mobile it is up to 325 px wide and about 284.4 px tall. It scales down to fit narrower screens. Its palette follows the site's light and dark themes.

The original face image is rendered directly as an SVG image, without pixelation. Pixel lettering and the cabinet are SVG shapes. The hammer has a perpendicular head and handle, with its swing pivot at the grip. Its head moves down and left into the hit point, then lifts back to its ready pose. Pointer conversion uses the current SVG transform, and keyboard input uses the same hole coordinates. Sound and Play controls have enlarged transparent hit areas and keyboard handlers. Best score and sound preference retain the existing storage keys.

Validation: production build, pointer scoring, keyboard start/scoring, light/dark appearance, and a 390 px mobile layout without horizontal overflow.
