---
title: "Krishi Sakhi: A Malayalam-Voice AI Farming Assistant"
description: "Building an AI assistant that farmers can talk to in Malayalam, and why speech recognition accuracy mattered more than model size."
date: "2026-07-28"
category: "Projects"
tags: ["AI & ML", "NLP", "Speech Recognition", "Python"]
author: "Vishnu Kashyap D"
featured: false
coverImage: "/projects/krishi-sakhi-homepage.png"
published: true
technologies: ["Python", "Speech Recognition", "NLP"]
githubUrl: "https://github.com/Vishnu-kashyap-D/sih25074"
stats:
  - value: ">95%"
    label: "ASR Accuracy"
---

> **Sample post.** This documents Krishi Sakhi, a real project from this portfolio, written as a case study for the blog. Extend it with implementation detail whenever you're ready.

## Overview

Krishi Sakhi is an AI farming assistant that supports both voice and text input in Malayalam, aimed at helping farmers get agricultural guidance without needing to read or type in English.

## Problem

Most agricultural tech assumes English literacy and a keyboard. For a large share of farmers, especially older ones, that's exactly the wrong interface — voice, and voice in their own language, is the natural way to ask a question.

## Goals

- Accept spoken Malayalam as a first-class input, not an afterthought
- Keep automatic speech recognition (ASR) accuracy high enough to be trustworthy
- Support text input as a fallback for users who prefer it

## Technologies

`Python` · `Speech Recognition` · `NLP`

## Architecture

Voice input is captured and passed through a Malayalam-tuned ASR pipeline before being handed to the assistant's language understanding layer, which extracts intent and routes it to the relevant agricultural guidance logic. Text input skips the ASR step and enters the same understanding layer directly, so both modes share the same downstream logic.

## Development

The bulk of the engineering effort went into the ASR layer — general-purpose speech recognition models tend to degrade badly on regional languages with less training data available, so getting Malayalam recognition accuracy to a usable level required deliberate tuning rather than using an off-the-shelf model as-is.

## Challenges

Malayalam has rich morphology and regional accent variation, both of which are hard on ASR systems trained primarily on more resource-rich languages. Background noise from an outdoor farm environment made this harder still.

## Solutions

Focusing tuning effort specifically on the ASR stage, rather than spreading effort evenly across the whole pipeline, is what got accuracy to a usable level for real conversational use.

## Results

**>95% ASR accuracy** in Malayalam, with both voice and text input paths supported end-to-end.

## Lessons Learned

For a project like this, the "AI" part that matters most isn't the flashiest model — it's the unglamorous accuracy of the input layer. If users can't be understood, nothing downstream matters.

## GitHub

The project repository is available on [GitHub](https://github.com/Vishnu-kashyap-D/sih25074).
