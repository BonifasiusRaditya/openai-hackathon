# ANIMATION.md — Manim Transitions, Transforms & Camera Rules

Skill file for animation flow in **ManimCE >= 0.18**.

## Hard rules

1. `Create`, not `ShowCreation` (ManimGL name — does not exist in ManimCE).
2. Everything animated must go through `self.play(...)`; `self.add(...)` places instantly with no animation.
3. Default `run_time=1`. Set explicitly when syncing with narration (see VOICE.md).
4. End every scene with `self.wait(2)`.
5. `.animate` for property changes: `self.play(circle.animate.shift(RIGHT).scale(2))`. Never mutate then re-add.

## Core animations by purpose

| Purpose | Animation |
|---|---|
| Draw shape/graph | `Create(mob)` |
| Write text/equation | `Write(mob)` |
| Appear / disappear | `FadeIn(mob, shift=UP*0.3)` / `FadeOut(mob)` |
| Emphasize | `Indicate(mob)`, `Circumscribe(mob)`, `Flash(point)`, `Wiggle(mob)` |
| Morph A into B | `ReplacementTransform(a, b)` (preferred) or `Transform(a, b)` |
| Morph equations | `TransformMatchingTex(eq1, eq2)` |
| Morph shape groups | `TransformMatchingShapes(g1, g2)` |
| Move along path | `MoveAlongPath(dot, curve)` |
| Grow | `GrowFromCenter(mob)`, `GrowArrow(arrow)` |
| Un-draw | `Uncreate(mob)`, `Unwrite(text)` |

### Transform vs ReplacementTransform (critical distinction)

- `Transform(a, b)`: `a` morphs to look like `b`; **`a` stays in the scene under its original name, `b` was never added**. Later refer to `a`.
- `ReplacementTransform(a, b)`: `b` replaces `a` in the scene. Later refer to `b`. **Default to this** — it keeps object references intuitive and avoids ghost mobjects.

```python
eq1 = MathTex("x^2 - 4", "= 0")
eq2 = MathTex("x^2", "= 4")
self.play(Write(eq1))
self.play(ReplacementTransform(eq1, eq2))
self.play(eq2.animate.set_color(YELLOW))   # eq2 is the live object
```

## Composition & timing

```python
self.play(Create(sq), Write(label))                       # simultaneous
self.play(AnimationGroup(a1, a2, lag_ratio=0.5))          # staggered overlap
self.play(LaggedStart(*[FadeIn(d) for d in dots], lag_ratio=0.1))  # cascade
self.play(Succession(a1, a2, a3))                         # strict sequence in one play
self.play(Create(graph), run_time=3, rate_func=smooth)    # pacing
```

Rate functions: `smooth` (default), `linear` (for MoveAlongPath / tracing), `there_and_back`, `rush_into`, `rush_from`, `ease_in_out_sine`.

## Scene transitions (between topic sections)

```python
# Clear everything currently on screen:
self.play(FadeOut(*self.mobjects))
self.wait(0.3)
# ...next section
```

Or transform a section title: `self.play(ReplacementTransform(title1, title2))`.
Never start a new topic on top of leftover mobjects.

## Updaters & ValueTracker (dynamic/continuous animation)

```python
t = ValueTracker(0)
dot = always_redraw(lambda: Dot(axes.c2p(t.get_value(), func(t.get_value())), color=YELLOW))
tangent = always_redraw(lambda: axes.get_secant_slope_group(
    x=t.get_value(), graph=graph, dx=0.01, secant_line_length=4))
self.add(dot, tangent)
self.play(t.animate.set_value(3), run_time=4, rate_func=linear)
```

Rules:
- `always_redraw` lambdas must build the mobject **from scratch** each call.
- `self.add(...)` updater-driven mobjects (they don't need Create).
- Remove updaters when done: `mob.clear_updaters()` — leftover updaters break later transforms.

## Camera

### 2D zoom/pan → requires `MovingCameraScene`

```python
class Zoom(MovingCameraScene):
    def construct(self):
        self.camera.frame.save_state()
        self.play(self.camera.frame.animate.scale(0.5).move_to(dot))   # zoom in
        self.wait()
        self.play(Restore(self.camera.frame))                          # zoom back out
```

`self.camera.frame` does NOT exist in a plain `Scene` — attempting it is a crash.

### 3D camera → requires `ThreeDScene`

```python
self.set_camera_orientation(phi=70 * DEGREES, theta=-45 * DEGREES)
self.move_camera(phi=45 * DEGREES, theta=30 * DEGREES, run_time=2)
self.begin_ambient_camera_rotation(rate=0.15)
self.wait(4)
self.stop_ambient_camera_rotation()
```

Combining narration + camera: class order `class X(VoiceoverScene, MovingCameraScene)` / `(VoiceoverScene, ThreeDScene)`.

## Pacing checklist for educational videos

- 0.5 s `self.wait` between distinct ideas; 2 s on final frame.
- One `self.play` should carry one visual idea. Avoid 5-mobject simultaneous plays except for cascades (`LaggedStart`).
- `run_time` 1–2 s for simple reveals, 2–4 s for graph drawing, ≤ 5 s for anything (longer feels stalled).
- Emphasize before explaining: `Indicate` the term the narration is about to discuss.

## Common pitfalls

- ❌ `ShowCreation` → NameError in ManimCE. Use `Create`.
- ❌ Referring to `b` after `Transform(a, b)` → invisible/detached mobject. Use `ReplacementTransform` and refer to `b`, or keep using `a`.
- ❌ `FadeOut(mob)` then `FadeIn(mob)` re-using a transformed mobject whose geometry changed — rebuild it instead.
- ❌ `self.camera.frame` in plain `Scene` → AttributeError. Use `MovingCameraScene`.
- ❌ Forgetting `clear_updaters()` → updaters fight subsequent `self.play` transforms.
- ❌ `self.play()` with zero animations or `run_time=0` → error/blank frame.
- ❌ Animating a mobject never added and never created (e.g. `.animate` on something not on screen) → it pops in abruptly. `FadeIn`/`Create` first.
- ❌ Clearing the scene with `self.clear()` mid-play — use `FadeOut(*self.mobjects)` inside `self.play` for a smooth transition.
