# coupld — website

Static marketing site, rebuilt from the Figma redesign
(`figma.com/design/hvp8udrv5sS3qkQIoStEmN/coupld`), with art direction borrowed
from `alexkabiru.framer.website`: off-white ground, full-bleed square nav,
oversized tight-tracked display type, generous whitespace, numbered rows.

## Run

No build step. Serve the folder with:

```
python3 serve.py          # http://localhost:8899
```

Use `serve.py` rather than `python3 -m http.server`. It sends `Cache-Control:
no-store`, so edits to the stylesheet or script show up on a normal reload.
With the plain module the browser caches `index.html` itself and you end up
debugging a stale page — which is easy to mistake for a fix not working.

## Deployment

Pushing to `main` publishes the site to GitHub Pages via
`.github/workflows/deploy.yml`. There is no build step: the repository root is
uploaded as-is, so `index.html` must stay at the root alongside `assets/`.

`CNAME` pins the custom domain and `.nojekyll` stops GitHub running the files
through Jekyll. Both need to remain at the root or the deployment breaks.

## Files

The stylesheet and script are loaded with a `?v=` cache-buster. Bump it when
you edit them, or browsers will keep serving the old file.

```
serve.py      dev server, no-store headers
index.html    all sections and copy
styles.css    tokens, layout, motion
main.js       nav state, rotator, parallax, reveal, tabs, lanes
assets/       photography and app screens
```

## Palette

Sampled from the Figma frames.

| Token            | Hex       | Used for                                   |
| ---------------- | --------- | ------------------------------------------ |
| `--ink`          | `#0a0a0a` | Type, footer, dark panels                  |
| `--paper`        | `#f4f4f4` | Page ground                                |
| `--paper-2`      | `#ececeb` | Inbetweens cards, five-matches note        |
| `--panel`        | `#2f2f2f` | Matchmaker panels, Relationship card 1     |
| `--nest`         | `#f5ece3` | Cove tiles, sampled from the Nest screens  |
| `--purple`       | `#6c42e1` | Nav CTA, active section, accents           |
| `--purple-lift`  | `#8b6bf0` | Safety headings, list marks                |
| `--lilac`        | `#948ac2` | Relationship card 2                        |
| `--plum`         | `#453848` | Relationship card 3                        |
| `--mauve`        | `#7d6c80` | Relationship card 4                        |
| `--berry`        | `#5a3c77` | Berry lane                                 |
| `--chilli`       | `#821c22` | Chilli lane                                |
| `--peach`        | `#f8d884` | Peach lane                                 |

Type: **Lato** for headings and body, **Poppins** for the `coupld` wordmark.

## Nav

Full bleed, square, edge to edge, with a hairline rule beneath. No pill, no
curve, no blur. Four items only: Dating, Relationships, Cove, Inbetweens.

| State | Height | Logo | Join Waitlist |
| --- | --- | --- | --- |
| At rest | 74px | black | black |
| Scrolled past 40px | 56px | purple | purple |

The section you are in is tracked by an IntersectionObserver and its nav item
turns purple with a purple underline.

## Sections

1. **Hero** — wordmark, tagline, then "FOR THOSE WHO WANT" as a small tracked
   label with the want itself set large and purple beneath it, rolling through
   *to meet the right person*, *to be seen*, *to be loved*, *to flirt* every
   1.7s. A purple rule under the phrase animates its width to whichever phrase
   is showing.
2. **Manifesto** — "online dating isn't dead / we're fixing it", the third line
   drawn as an outline.
3. **Five** — "five is larger than five hundred", phone, and the magic-number note.
4. **Matchmaker** — a pinned scene (see Effects). The band holds, "meet your
   Matchmaker" collapses, and the four panels swap as you scroll. The tabs stay
   visible as a progress indicator and clicking one scrolls to that card.
5. **Safety** — four flat translucent tints over the diner photograph. At rest
   each shows its category; on hover or focus the category fades out and that
   category's measures fade in. Both states share one grid cell so the card
   never changes size. Each measure is its own row, separated by a hairline
   and marked with a ticked chip rather than a dash: these are things the app
   already does for you, so a check reads truer, and a tinted chip holds up
   over the photograph where a thin rule was getting lost.
6. **Lanes** — Berry, Chilli, Peach. Hovering a card reveals its copy, darkens
   the veil and turns the corner cue into a purple cross. Touch has no hover,
   so there a tap toggles the same state; Enter and Space work everywhere.
7. **Relationship mode** — a pinned scene: band holds, heading collapses, the
   four cards replace one another. A segmented bar marks progress.
8. **Cove** — alternating copy and real Nest app screens (avatar naming, a
   date inside your Cove, two avatars in the garden), each on a tile in the
   app's own cream so the phone sits on its native ground. Parallaxed.
9. **Everything Inbetween** — a pinned scene: group band holds, heading
   collapses, the three cards slide up over one another. Each card carries a
   purple step number on the left, the title on the right, a hairline rule,
   then the copy directly beneath it and a full-height greyscale image on the
   right. The copy sits at the top, not the bottom: in a fixed-height stage a
   bottom-aligned paragraph left a void above it and read as an afterthought.
   A short purple rule gives the eye a starting point.
10. **Waitlist** — "Are you Berry?" and the email capture.

## Effects

- **No glass anywhere.** Every surface is solid or a flat tint; nothing uses
  `backdrop-filter`. The safety cards read as transparent because their fill is
  a low-alpha tint over the photograph, not a frosted panel.
- **Pinned scroll scenes.** Matchmaker, Relationship mode and Everything
  Inbetween are each a tall `.scene` containing one `position: sticky` stage
  that holds for the length of the scene. Scroll progress through the scene
  drives three zones at once:

  | Zone | Element | Behaviour |
  | --- | --- | --- |
  | 1 | `.scene-band` | The photograph and its white stair plinth. Never moves. |
  | 2 | `.scene-head` | The heading. Collapses to nothing over the first 16% of the scene. |
  | 3 | `.scene-deck` | The cards, as a stack. Each one slides up from the bottom edge over the card before it. |

  Clicking a tab scrolls to the **start** of that card's slice, not the middle.
  A card's offset is `max(0, index - progress)`, so at the middle of slice `i`
  the next card is already half risen and covers half of the card you asked
  for. At the start of the slice card `i` sits at 0 and card `i+1` is still
  fully parked below.

  The deck has **no transform transition** — the scroll position *is* the
  animation. Each card's offset is `max(0, index - progress) * 100%`, so the
  incoming card travels continuously from the bottom edge to 0 while the one
  behind stays put and gets covered. Cards are stacked by `z-index` and the
  deck clips with `overflow: hidden`.

  Scene length scales with card count via an inline `--steps`:
  `height: calc(100vh + var(--steps) * 44vh)`. That works out at roughly 430px
  of scroll per card: four-card scenes get 2036px of travel, the three-card
  scene 1541px.

  The heading's padding is animated alongside its `max-height`. Padding sits
  outside `max-height`, so collapsing height alone leaves a permanent 28px gap
  above the deck.

  **This depends on `body { overflow-x: clip }`, not `hidden`.** `overflow-x:
  hidden` forces `overflow-y` to compute to `auto`, which makes body a scroll
  container and stops `position: sticky` resolving against the viewport. It
  happens to survive in Chrome and fails in Safari. Do not change it back.

  Below 820px the scenes unpin entirely and the three zones stack and scroll
  normally, because a viewport-height stage with a two-column card is
  unreadable on a phone.

- **Parallax** runs on the same rAF-throttled scroll pass via
  `data-parallax="<speed>"`. Positive lags (background), negative leads
  (foreground): safety photo `0.09` against its cards at `-0.05`,
  phone `-0.06`, Cove panels `-0.05`,
  Inbetweens cards `-0.03 / -0.055 / -0.08`.
- Line-wipe reveals, tab underline that slides to the active tab.
- **The scroll handler reads before it writes.** `update()` gathers every
  `getBoundingClientRect` it needs first, then applies all mutations. Interleaving
  them forces a synchronous layout per element and is what makes a handler like
  this stutter. Document and scene heights are cached and recomputed on resize
  rather than read per frame, the heading's `max-height` is only rewritten when
  the rounded value actually changes, and each stage is a `contain: layout paint`
  island. Measured over a full scene traverse: 8.3ms average frame, 9.1ms worst,
  zero frames over 20ms.
- **Card media is bounded on both axes.** Deck cards give their image column a
  fixed track and the image `max-width:100%; max-height:100%; object-fit:contain`.
  `height:100%` alone resolves against an auto-height parent and the screenshot
  blows out of the card.
- Full `prefers-reduced-motion` fallback: the rotator holds on the first phrase,
  the stack unsticks, reveals resolve immediately.

## Notes on the copy

Text is verbatim from the Figma, including its own wording ("your stay
protected", "don't change you app", "chose your lane", "t's a relaxed"). Three
deliberate departures:

- The Figma numbers the third Inbetweens card **02**, repeating the second. Set
  to **03** here.
- "your shared spacegrows alongside it" set as "your shared space grows".
- Safety and Support were removed from the nav, as requested.

## Known gaps

- **The Inbetweens photography is stand-in.** The group band reference in the
  Figma was only 650px wide with the plinth baked in, so it was replaced with a
  licensed Pexels studio shot, desaturated and toned to sit with the other
  bands. The three process-row images (`gather-out`, `gather-loud`,
  `gather-together`) are also Pexels, cropped to 3:4 and desaturated. Swap all
  four for the real shoot when it exists.
- The waitlist form is front end only. It validates and confirms locally; wire
  it to a real endpoint, and point "TAKE OUR 2-MINUTE QUIZ" at the real quiz.
