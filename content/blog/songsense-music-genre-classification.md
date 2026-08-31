---
title: "SongSense: A Music Genre Classifier from Audio Signals"
description: "How SongSense uses audio signal processing and spectral analysis to classify music genre, and where it landed on accuracy."
date: "2026-08-15"
category: "Projects"
tags: ["Machine Learning", "Python", "Audio Processing"]
author: "Vishnu Kashyap D"
featured: false
coverImage: "/projects/songsense-homepage.png"
published: true
technologies: ["Python", "Audio Signal Processing", "Spectral Analysis"]
githubUrl: "https://github.com/Vishnu-kashyap-D/Music_Genre_Classification"
reportUrl: "/reports/SongSense_Technical_Report.pdf"
stats:
  - value: "88.4%"
    label: "Classification Accuracy"
---

> **Sample post.** This documents SongSense, a real project on this portfolio, written as a case study for the blog. Replace or expand it with more detail whenever you're ready — the full technical write-up is linked below as a PDF report.

## Overview

SongSense is a music genre classifier that takes an audio clip — uploaded or recorded live — and predicts its genre using audio signal processing and spectral analysis.

## Problem

Genre labels are useful metadata, but they're usually attached manually or inferred from surrounding text rather than the audio itself. A model that classifies genre directly from the signal doesn't depend on that metadata being present or accurate.

## Goals

- Classify genre directly from raw audio, not from external metadata
- Support both uploaded audio files and live recording as input
- Reach a reasonable classification accuracy across multiple genres

## Technologies

`Python` · Audio Signal Processing · Spectral Analysis

## Architecture

Incoming audio — whether uploaded or recorded live — is run through a spectral analysis stage that extracts frequency-domain features from the signal, which are then fed into a classification model trained to map those features to a genre label.

## Development

Most of the work here sits in the feature extraction stage rather than the classifier itself: getting the spectral representation of the audio right has a much bigger effect on classification quality than swapping in a fancier model on top of it.

## Results

**88.4% classification accuracy** across the target genre set.

## Lessons Learned

For audio classification specifically, the signal processing pipeline upstream of the model is where most of the leverage is — a clean spectral representation makes the classification step almost straightforward by comparison.

## Report

The full technical write-up is available as a [PDF report](/reports/SongSense_Technical_Report.pdf).

## GitHub

The project repository is available on [GitHub](https://github.com/Vishnu-kashyap-D/Music_Genre_Classification).
