# VOICE.md — Manim Voiceover & Audio-Visual Synchronization Rules

Skill file for generating narrated Manim videos with `manim-voiceover`.
Target stack: **Manim Community Edition (ManimCE) >= 0.18** + `manim-voiceover`.

## Hard rules

1. **NEVER use ManimGL** (`from manimlib import *`). Always `from manim import *`. `manim-voiceover` only works with ManimCE.
2. Every narrated scene MUST inherit from `VoiceoverScene`, not `Scene`:
   ```python
   from manim import *
   from manim_voiceover import VoiceoverScene
   from manim_voiceover.services.gtts import GTTSService

   class Lesson(VoiceoverScene):
       def construct(self):
           self.set_speech_service(GTTSService(lang="en"))
   ```
3. `self.set_speech_service(...)` MUST be the first statement in `construct()`, before any `voiceover` block.
4. All narration goes through the context manager:
   ```python
   with self.voiceover(text="The circle is the set of points equidistant from a center.") as tracker:
       self.play(Create(circle), run_time=tracker.duration)
   ```
5. To sync an animation to the length of the spoken sentence, set `run_time=tracker.duration`. If several animations share one voiceover, split the duration:
   ```python
   with self.voiceover(text="First we draw the axes, then the curve.") as tracker:
       self.play(Create(axes), run_time=tracker.duration * 0.4)
       self.play(Create(curve), run_time=tracker.duration * 0.6)
   ```
6. If animations inside a voiceover block finish before the audio, Manim automatically waits for the audio to end before leaving the block. Do NOT add manual `self.wait(tracker.duration)` — that doubles the pause.
7. Never let a single `self.play` exceed the tracker duration by design; long animations spill into the next sentence and desynchronize the whole video.
8. 3D narrated scenes need both bases: `class Lesson(VoiceoverScene, ThreeDScene):` (VoiceoverScene first).

## Speech services

| Service | Import | Notes |
|---|---|---|
| gTTS (default for hackathon) | `from manim_voiceover.services.gtts import GTTSService` | Free, no key, needs internet |
| OpenAI TTS | `from manim_voiceover.services.openai import OpenAIService` | Needs `OPENAI_API_KEY`; `OpenAIService(voice="alloy", model="tts-1-hd")` |
| ElevenLabs | `from manim_voiceover.services.elevenlabs import ElevenLabsService` | Best quality, needs key |
| Recorder (human voice) | `from manim_voiceover.services.recorder import RecorderService` | Interactive, do not use for automated rendering |

Default choice unless told otherwise: `GTTSService(lang="en")` — zero-config, safe for CI/automated rendering.

## Bookmarks (mid-sentence sync)

Trigger an animation at an exact word using SSML-style `<bookmark/>`:

```python
with self.voiceover(text="This is a circle <bookmark mark='A'/> and this is a square.") as tracker:
    self.play(Create(circle))
    self.wait_until_bookmark("A")
    self.play(Create(square))
```

Rules:
- Bookmark marks must be unique within one voiceover text.
- `wait_until_bookmark` only works inside the owning `with` block.

## Pacing rules

- One voiceover block = one idea = one visual change. Do not cram 5 animations into one sentence.
- Insert `self.wait(0.5)` **between** voiceover blocks (not inside) to give breathing room.
- End every scene with `self.wait(2)` so the final frame lingers.
- Keep narration sentences under ~25 words; TTS pacing degrades on long sentences.

## Common pitfalls (cause of most render failures)

- ❌ `class X(Scene)` with `self.voiceover(...)` → AttributeError. Must be `VoiceoverScene`.
- ❌ Forgetting `set_speech_service` → crash at first voiceover call.
- ❌ `run_time=tracker.duration` on multiple sequential `self.play` calls in one block → total time = N × audio length. Split with fractions that sum to ≤ 1.0.
- ❌ Using f-strings with `<bookmark mark='A'/>` and accidentally breaking quotes — keep bookmark text in plain strings.
- ❌ `RecorderService` in automated pipelines — it blocks waiting for microphone input.
- ❌ Emojis or LaTeX in `text=` — the TTS engine reads them literally. Keep narration plain prose; visuals carry the math.

## Canonical template (use this shape for every Pintaru scene)

```python
from manim import *
from manim_voiceover import VoiceoverScene
from manim_voiceover.services.gtts import GTTSService


class PintaruScene(VoiceoverScene):
    def construct(self):
        self.set_speech_service(GTTSService(lang="en"))

        title = Text("Pythagorean Theorem", font_size=48)
        with self.voiceover(text="Today we explore the Pythagorean theorem.") as tracker:
            self.play(Write(title), run_time=tracker.duration)

        self.play(title.animate.to_edge(UP))
        self.wait(0.5)

        eq = MathTex("a^2 + b^2 = c^2")
        with self.voiceover(text="It states that a squared plus b squared equals c squared.") as tracker:
            self.play(Write(eq), run_time=tracker.duration)

        self.wait(2)
```

Render command: `manim -pql scene.py PintaruScene` (use `-qh` for final output).
