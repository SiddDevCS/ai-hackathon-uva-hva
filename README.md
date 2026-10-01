# Lode

A small Minecraft-style study mine for the UvA / HvA AI Chat hackathon. Students bring their own material, the chat teaches it in the Noordhoff order, and ores mark the layers they finish.

Art is original. This is not a Mojang product.

## Run

From this folder:

```bash
python3 -m http.server 8765
```

Open [http://localhost:8765](http://localhost:8765) for the demo and [http://localhost:8765/slides.html](http://localhost:8765/slides.html) for the deck.

## Record into a slide

1. Walk the live demo: UvA, Bachelor, Calculus 1, then **Get the course**.
2. Screen-record that walk.
3. Open the deck, go to **The walkthrough**, and use **Add a recording**.

Arrow keys move the slides. `N` toggles speaker notes.

## What is real

You pick a university, bachelor or master, then a course and its number. The chat welcomes you into that course. You choose lecture slides or the textbook, a chapter, and a way to learn. The vein is still the Noordhoff order: objective, blue-box worked example, then three questions.

Diamond, gold, and silver are earned only on the quiz. The study steps before it do not pay. A held ore can be spent later for a hint. The counts sit above the bar. Steve moves when a question pays. They are not a grade and they do not pay for speed. A social tab on the right shows friends who are online and your group. The first screen asks if you want a guide.

There is no live model yet. Any course opens the same first vein so the recording always has a full path.
