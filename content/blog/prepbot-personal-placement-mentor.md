---
title: "How I Built PrepBot — My Flinders AI Hackathon Journey"
description: "An AI-powered placement prep chatbot built with plain HTML, CSS, and JavaScript — and the story of how it won 1st place at the Flinders University AI Hackathon."
date: "2026-09-05"
category: "Projects"
tags: ["AI & ML", "JavaScript", "Hackathon"]
author: "Vishnu Kashyap D"
featured: false
coverImage: "/projects/prepbot-homepage.png"
published: true
technologies: ["HTML5", "CSS3", "JavaScript", "AI"]
githubUrl: "https://github.com/Vishnu-kashyap-D/PrepBot-Flinders"
liveUrl: "https://prep-bot-flinders.vercel.app/"
stats:
  - value: "1st"
    label: "Bengaluru Round"
  - value: "$400"
    label: "National Showcase Prize"
  - value: "7+"
    label: "Topics Covered"
---

## Overview

PrepBot is a topic-locked AI chatbot that acts as a personal placement mentor for engineering undergraduates. It covers HR interview prep, resume building, aptitude and reasoning, technical/DSA rounds, company-specific preparation, soft skills and body language, and offer/email etiquette — all in one chat interface. It's built entirely with plain HTML5, CSS3, and vanilla JavaScript, with no frontend framework.

## Problem

Placement preparation is scattered across a dozen different resources — one site for aptitude questions, another for DSA, a YouTube video for HR interview tips, a random template for resume bullet points. Most students juggle all of it manually, and general-purpose chatbots aren't focused enough to walk them through a placement cycle end to end.

## Why I Built PrepBot

I wanted a single, focused assistant that stays on-topic for placement prep specifically, rather than a general chatbot that happens to answer placement questions when asked. That meant building something topic-locked by design — it politely declines anything unrelated to placements — so every conversation stays useful for the one thing a student opened it for.

## How PrepBot Works

The interface has two pages: a landing page (`index.html`) and the chat interface (`chat.html`). On the chat page, seven quick-action buttons let a student jump straight into a topic — HR interviews, resume building, aptitude, technical rounds, company prep, soft skills, or offer etiquette. Each message (plus the full conversation history) is sent to an LLM, and the response is rendered back through a small hand-written markdown renderer, so formatted answers (lists, bold text, code) display properly without pulling in a markdown library.

## Key Features

![PrepBot's feature grid showing the seven placement-prep topics it covers: HR interview prep, resume building, aptitude and reasoning, technical rounds, company preparation, offer and email etiquette, and soft skills](/projects/prepbot-features.png)

- **Topic-locked scope** — refuses off-topic requests and steers the conversation back to placement prep
- **7 quick-action buttons** for instant topic selection
- **Multi-turn context** — the full conversation history is sent with each request, so follow-up questions stay coherent
- **Custom markdown rendering** written in plain JavaScript, no external library
- **Dark/light theme toggle**, persisted in `localStorage`
- **Single-request guard** to prevent accidental rate-limit exhaustion from rapid repeated sends
- **Fully responsive** across mobile and desktop

## Technology Stack

`HTML5` · `CSS3` · `JavaScript` — zero frontend dependencies. The one piece of server-side code in the project is a small Vercel serverless function (`api/chat.js`) that proxies chat requests to Groq's `llama-3.3-70b-versatile` model using a server-side environment variable, so the hosted demo works out of the box without asking a visitor for their own API key.

## Development Process

I started from the constraint that mattered most: no framework, no build step, so the whole thing runs by opening `index.html` directly in a browser. That pushed the actual engineering into `src/script.js` (chat logic and API calls), `src/style.css` (the dark/light theme), and `src/theme.js` (persisting the theme choice) — three plain files doing what a framework would normally abstract away.

![The team heads-down building PrepBot at the Flinders AI Hackathon, laptops open during the build sprint](/blog/prepbot-team-working-1.jpg)

![The team continuing development during the hackathon, working alongside other teams in the competition hall](/blog/prepbot-team-working-2.jpg)

## Challenges

The two hardest problems were both about API keys. First, for anyone running the project locally, there's no server to hide a key behind — the README is explicit that a key should never be hardcoded into source files. Second, the hosted demo needed to work instantly for a hackathon judge or a visitor, without making them go find and paste in their own key first.

## Solutions

I built two supported paths side by side: locally, a user enters their own API key (Groq, Gemini, or OpenAI) through the sidebar at runtime, and it's kept only in `localStorage` — never written into a file. For the live deployment, `api/chat.js` runs server-side on Vercel and reads the API key from a Vercel environment variable, so the key never reaches the browser at all. Same chat experience, two different key-handling strategies depending on where it's running.

## What Makes It Useful

Because it's topic-locked and quick-action driven, a student doesn't need to write a good prompt to get a good answer — clicking "Technical Rounds" or "HR Interview Prep" gets them straight into a focused, structured conversation. And because it's zero-dependency HTML/CSS/JS, anyone can read the entire codebase in one sitting, fork it, and run it without a build pipeline.

## Hackathon Achievement

> 🏆 **1st Place** — Flinders University AI Hackathon, Bengaluru Round
>
> ↓
>
> **National Showcase**
>
> ↓
>
> 🏆 **$400 Prize**

PrepBot won 1st place in the Flinders University AI Hackathon's Bengaluru round, which earned it a place at the National Showcase — where it went on to win a $400 prize.

![The winning team holding their 1st place trophies at the Flinders University AI Hackathon, Bengaluru round](/blog/prepbot-team-awards.jpg)

![Receiving the certificate of achievement from a Flinders University representative](/blog/prepbot-certificate-presentation.jpg)

## What I Learned

Building something genuinely dependency-free forces a different kind of discipline: every feature — theming, markdown rendering, conversation state — has to be reasoned about directly instead of leaning on a library's defaults. It also reinforced a pattern I keep coming back to across projects: API keys belong on the server, never in client code, and it's worth designing for that from the start rather than retrofitting it later.

## Final Outcome

PrepBot went from a hackathon submission to a working, publicly deployed product that placed 1st in its regional round and won a prize at the national stage — while staying true to its original constraint of running as a plain static site with no framework overhead.

## GitHub & Live Demo

The source is available on [GitHub](https://github.com/Vishnu-kashyap-D/PrepBot-Flinders), and the live version is deployed at [prep-bot-flinders.vercel.app](https://prep-bot-flinders.vercel.app/).
