# GRAPH.md — Manim Graphing, Axes & Geometry Rules

Skill file for plotting 2D/3D graphs and drawing geometry in **ManimCE >= 0.18**.

## Hard rules

1. `from manim import *` only. Never ManimGL (`get_graph`, `get_axes` and `ShowCreation` are ManimGL — do not use them). ManimCE uses `axes.plot(...)` and `Create(...)`.
2. **Always convert math coordinates to scene coordinates with `axes.c2p(x, y)`** (coords-to-point). Never place dots/labels at raw `(x, y)` — scene units ≠ axis units.
3. Keep axes inside the frame: default frame is 14.2 wide × 8 tall units. Use `x_length` / `y_length` ≤ 12 × 6 when a title is present.
4. Functions with discontinuities/asymptotes MUST declare them, or the plot draws a vertical spike:
   ```python
   graph = axes.plot(lambda x: 1 / x, x_range=[-4, 4], discontinuities=[0], dt=0.1)
   ```
5. Never plot outside `x_range` of the axes; clip the lambda's range to the axes range.

## 2D axes — canonical pattern

```python
axes = Axes(
    x_range=[-4, 4, 1],          # [min, max, step]
    y_range=[-2, 8, 2],
    x_length=10,
    y_length=6,
    axis_config={"include_tip": True, "include_numbers": True},
)
labels = axes.get_axis_labels(x_label="x", y_label="f(x)")

graph = axes.plot(lambda x: x**2, x_range=[-2.5, 2.5], color=BLUE)
graph_label = axes.get_graph_label(graph, label=MathTex("x^2"), x_val=2, direction=UR)

self.play(Create(axes), Write(labels))
self.play(Create(graph), Write(graph_label))
```

Useful helpers (all on `Axes`):
- `axes.plot(func, x_range=[a, b], color=...)` — function graph
- `axes.plot_parametric_curve(lambda t: np.array([...]), t_range=[a, b])`
- `axes.get_area(graph, x_range=[a, b], color=BLUE, opacity=0.4)` — area under curve
- `axes.get_vertical_line(axes.c2p(x, f(x)))` — dropline
- `axes.get_riemann_rectangles(graph, x_range=[a, b], dx=0.25)`
- `axes.c2p(x, y)` / `axes.p2c(point)` — coordinate conversion
- `NumberPlane(x_range=..., y_range=...)` — grid background (same API as Axes)

Point on curve: `dot = Dot(axes.c2p(2, 4), color=YELLOW)`

## 3D — canonical pattern

3D REQUIRES `ThreeDScene` (or `VoiceoverScene, ThreeDScene` for narrated):

```python
class Plot3D(ThreeDScene):
    def construct(self):
        axes = ThreeDAxes(x_range=[-4, 4], y_range=[-4, 4], z_range=[-2, 2])
        self.set_camera_orientation(phi=70 * DEGREES, theta=-45 * DEGREES)

        surface = Surface(
            lambda u, v: axes.c2p(u, v, np.sin(u) * np.cos(v)),
            u_range=[-3, 3],
            v_range=[-3, 3],
            resolution=(24, 24),
            fill_opacity=0.7,
        )
        surface.set_fill_by_value(axes=axes, colorscale=[(BLUE, -1), (RED, 1)], axis=2)

        self.play(Create(axes))
        self.play(Create(surface))
        self.begin_ambient_camera_rotation(rate=0.15)
        self.wait(4)
        self.stop_ambient_camera_rotation()
```

Rules:
- `set_camera_orientation` before adding 3D objects, or everything renders top-down.
- Keep `resolution` ≤ (32, 32); higher explodes render time.
- 2D text in a 3D scene: `self.add_fixed_in_frame_mobjects(title)` so it doesn't rotate with the camera.

## Geometry — building blocks

```python
c   = Circle(radius=1.5, color=BLUE, fill_opacity=0.3)
sq  = Square(side_length=2, color=GREEN)
tri = Polygon([-1, 0, 0], [1, 0, 0], [0, 1.5, 0], color=YELLOW)   # 3D points, z=0
ln  = Line(start=LEFT * 2, end=RIGHT * 2)
ar  = Arrow(start=ORIGIN, end=UP + RIGHT, buff=0)
dot = Dot(point=ORIGIN, color=RED)
ang = Angle(ln1, ln2, radius=0.5)
brace = Brace(sq, direction=DOWN); brace_label = brace.get_tex("s")
```

- All raw points are 3-element (`np.array([x, y, z])` or `[x, y, z]`), even in 2D — z=0.
- Group related shapes: `VGroup(c, sq, tri).arrange(RIGHT, buff=0.8)`.
- Right angle marker: `RightAngle(line1, line2, length=0.3)`.

## Common pitfalls

- ❌ `Dot(point=(2, 4))` on a graph → wrong position. Use `Dot(axes.c2p(2, 4))`.
- ❌ `axes.get_graph(...)` → ManimGL API, does not exist in ManimCE. Use `axes.plot(...)`.
- ❌ Plotting `tan(x)`, `1/x`, `log(x)` across their singularities without `discontinuities=[...]` or a restricted `x_range`.
- ❌ 3D objects in a plain `Scene` → flat, unlit render. Use `ThreeDScene`.
- ❌ `x_length=14` with numbered axes → numbers clip off-screen. Stay ≤ 12.
- ❌ 2-element points (`[x, y]`) → ValueError. Always 3 elements.
- ❌ `Surface` with lambda returning raw `[u, v, f]` instead of `axes.c2p(u, v, f)` → surface detached from axes scale.
