# TEXT.md — Manim Typography, LaTeX & Positioning Rules

Skill file for text and math rendering in **ManimCE >= 0.18**.

## Choosing the right class (decision table)

| Content | Class | Example |
|---|---|---|
| Plain prose, titles, labels | `Text` | `Text("Hello", font_size=48)` |
| Math only | `MathTex` | `MathTex(r"\int_0^1 x^2\,dx")` |
| Mixed prose + math (LaTeX text mode) | `Tex` | `Tex(r"Area $= \pi r^2$")` |
| Colored/styled inline spans | `MarkupText` | `MarkupText('normal <span fgcolor="yellow">bold</span>')` |
| Multiline plain text | `Paragraph` or `Text` with `\n` | |

Rules:
1. **ALWAYS raw strings for LaTeX**: `MathTex(r"\frac{a}{b}")`. Without `r`, `\f` and `\t` become escape chars and the render crashes.
2. `MathTex` is already math mode — no `$...$` inside it. `Tex` is text mode — math must be wrapped in `$...$`.
3. Escape LaTeX specials in `Tex`: `% $ & # _ { }` → `\% \$ \& \# \_ \{ \}`. Plain prose containing `%` or `&` is safer as `Text`.
4. `Text` uses Pango (system fonts), needs no LaTeX — prefer it for anything non-mathematical; it cannot fail LaTeX compilation.

## Font sizes (consistent hierarchy for Pintaru)

- Title: `font_size=48`
- Section/subtitle: `font_size=36`
- Body/labels: `font_size=28`
- Annotations/footnotes: `font_size=20`

Scaling after creation: `mob.scale(0.8)` or `mob.scale_to_fit_width(10)` (frame is 14.2 wide — keep text width ≤ 12).

## MathTex substrings, coloring, and matching

Split into substrings when you need per-part coloring or `TransformMatchingTex`:

```python
eq = MathTex("a^2", "+", "b^2", "=", "c^2")
eq.set_color_by_tex("a^2", BLUE)
eq.set_color_by_tex("b^2", GREEN)
eq.set_color_by_tex("c^2", RED)
```

`Text` coloring: `Text("Hello World", t2c={"World": YELLOW})`.

## Positioning — the only 6 methods you need

```python
title.to_edge(UP)                        # flush to a screen edge (buff=0.5 default)
label.next_to(circle, RIGHT, buff=0.3)   # relative to another mobject
eq.move_to(ORIGIN)                       # absolute center placement
eq.shift(2 * RIGHT + UP)                 # relative offset
eq.align_to(other, LEFT)                 # align edges
group.to_corner(UR)                      # corner placement
```

Multiple items — ALWAYS `VGroup` + `arrange`, never manual pixel-nudging:

```python
steps = VGroup(
    MathTex(r"x^2 - 4 = 0"),
    MathTex(r"x^2 = 4"),
    MathTex(r"x = \pm 2"),
).arrange(DOWN, aligned_edge=LEFT, buff=0.5)
steps.next_to(title, DOWN, buff=0.8)
```

Constants: `UP DOWN LEFT RIGHT UL UR DL DR ORIGIN`, combined like `UP + RIGHT`.

## Layout discipline (prevents overlapping text — the #1 visual bug)

1. Reserve the top edge for the title: `title.to_edge(UP)`, all content below it.
2. Before writing new text in an occupied region, remove/transform the old:
   `self.play(FadeOut(old_eq), FadeIn(new_eq))` or `ReplacementTransform(old_eq, new_eq)`.
3. Never stack more than ~6 body lines on screen; fade out earlier lines.
4. Label graphs with `axes.get_graph_label(...)` (GRAPH.md), not free-floating `MathTex` at guessed positions.

## Writing/animating text

```python
self.play(Write(title))               # stroke-by-stroke, good for titles/equations
self.play(FadeIn(body, shift=UP*0.3)) # fast, good for body text
self.play(AddTextLetterByLetter(t))   # typewriter effect (Text only)
self.play(Transform(eq1, eq2))                    # morph in place (eq1 keeps name)
self.play(TransformMatchingTex(eq1, eq2))         # smart match on identical tex substrings
```

`TransformMatchingTex` only matches substrings that are **identical strings** in both MathTex constructors — split both equations at the same tokens.

## Common pitfalls

- ❌ `MathTex("\frac{1}{2}")` without `r` prefix → LaTeX compile error.
- ❌ `MathTex(r"$x^2$")` → double math mode error. No `$` in MathTex.
- ❌ `Tex("50% of students")` → crashes on `%` (LaTeX comment char). Use `Text` or escape `\%`.
- ❌ Two `Write` calls on texts occupying the same position → overlap. Remove the first.
- ❌ `font_size=72` with a long sentence → clipped at frame edges. Check width, `scale_to_fit_width(12)` if needed.
- ❌ `TransformMatchingTex` between differently-tokenized equations → everything fades instead of morphing.
- ❌ Unicode math symbols in `MathTex` (e.g. `π`) → use LaTeX (`\pi`). Unicode is fine in `Text`.
