# Pokédex

> Interactive Pokédex powered by PokéAPI. Browse the entire Pokémon roster, hear each one's cry, and toggle their shiny form with full audiovisual feedback.

![Status](https://img.shields.io/badge/status-stable-success?style=flat-square)
![Stack](https://img.shields.io/badge/stack-vanilla%20JS-yellow?style=flat-square)
![API](https://img.shields.io/badge/api-PokeAPI-red?style=flat-square)

---

## Overview

A polished Pokédex built with vanilla HTML/CSS/JS that goes beyond the typical tutorial version: it includes Pokémon cries, a shiny toggle with coordinated VFX and SFX, full type effectiveness calculations, and pagination across the 1000+ available Pokémon. The goal was to push how much UX you can squeeze out of a no-framework project.

## Features

- Browse all available Pokémon with pagination (50 per page)
- Search by name (partial matches supported)
- Side panel with sprite, types, abilities, and base stats
- Audio cry playback for every Pokémon (with `fallbackCry.mp3` for missing entries)
- **Shiny toggle:** click the shiny button to swap to the shiny sprite, triggering sparkle VFX + shiny SFX. Click again for a "squish" animation back to default with a de-shiny sound
- Type effectiveness matrix calculated dynamically (weaknesses, resistances, immunities — including dual-type math up to x4 / x0)
- Pokémon list cached in `localStorage` to avoid re-fetching the 1025-Pokémon roster

## Stack

- HTML5 · CSS3 · JavaScript ES6+
- [PokéAPI](https://pokeapi.co/) (REST)
- No frameworks, no build tools

## Project structure

```
pokedex/
├── index.html
├── css.css
├── js.js
└── /assets         Audio cries, shiny/de-shiny SFX, sparkle VFX
```

## Run locally

```bash
git clone https://github.com/zappytw/Pokedex.git
cd Pokedex
```

Open `index.html`. No build, no dependencies.

## What I learned building this

- Coordinating three feedback channels (visual, audio, motion) into a single user interaction
- Cache-busting a GIF so its animation replays on each toggle (`?` + `Date.now()`)
- Calculating dual-type damage relations from PokéAPI's `damage_relations` data
- Using `localStorage` to avoid re-fetching large remote datasets

---

Built by **Joel Fayad** — Frontend Developer based in Colombia.
