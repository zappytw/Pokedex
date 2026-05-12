# Pokédex

> Interactive Pokédex powered by PokéAPI. Search any Pokémon, hear their cries, and discover their shiny forms with animated VFX.

![Status](https://img.shields.io/badge/status-stable-success?style=flat-square)
![Stack](https://img.shields.io/badge/stack-vanilla%20JS-yellow?style=flat-square)
![API](https://img.shields.io/badge/api-PokeAPI-red?style=flat-square)

---

## Overview

A polished Pokédex built with vanilla HTML/CSS/JS that goes beyond the typical tutorial version: it includes Pokémon cries, a random shiny encounter mechanic, and animated visual effects. The goal was to push how much UX you can squeeze out of a no-framework project.

## Features

- Browse and search Pokémon by name or ID via the PokéAPI
- Display official artwork, types, stats, and basic information
- Play each Pokémon's cry (with fallback audio for missing sounds)
- Random shiny encounter mechanic with sparkle VFX and unique SFX
- Smooth CSS animations and hover interactions

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
└── /assets         Audio cries, SFX, and sparkle VFX
```

## Run locally

```bash
git clone https://github.com/zappytw/Pokedex.git
cd Pokedex
```

Open `index.html`. No build, no dependencies.

## What I learned building this

- Working with multiple async resources (data + audio + images) in parallel
- Adding sensory feedback (sound + motion) without overwhelming the user
- Handling edge cases in third-party APIs (missing cries, missing sprites)
- Building a cohesive visual identity with pure CSS

---

Built by **Joel Fayad** — Frontend Developer based in Colombia.
