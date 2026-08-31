---
title: "Lessons from Building a Crop Disease Classifier with CNNs"
description: "What actually moved accuracy on a leaf-image CNN classifier, and what turned out to be a waste of time."
date: "2026-06-30"
category: "AI & ML"
tags: ["AI & ML", "Deep Learning", "Computer Vision", "Python"]
author: "Vishnu Kashyap D"
featured: false
coverImage: "/projects/crop-disease-leaf.jpg"
published: true
technologies: ["Python", "TensorFlow", "OpenCV"]
---

> **Sample post.** This documents a real project on this portfolio — a CNN-based crop disease classifier — written as a lessons-learned post. Expand it with more detail whenever you like.

## Overview

A deep learning classifier that takes a photo of a plant leaf and predicts whether — and with what disease — the plant is affected, trained on a labeled leaf-image dataset.

## Problem

Crop disease is often identified too late, after visible damage has already spread, because manual inspection doesn't scale across a large field. An image classifier that a farmer can point a phone camera at closes that gap.

## Goals

- Reasonable classification accuracy across multiple disease classes
- A model light enough to plausibly run on modest hardware
- Robustness to real-world photo variation — lighting, angle, background

## Technologies

`Python` · `TensorFlow` · `OpenCV`

## Architecture

A convolutional neural network trained on labeled leaf images, with OpenCV handling image preprocessing (resizing, normalization) before frames reach the model.

## What Actually Moved Accuracy

Data augmentation — random rotations, flips, and brightness shifts — mattered more than architecture tweaks. The dataset had less real-world lighting and angle variation than photos taken in an actual field would have, and augmentation was the cheapest way to close that gap.

## What Turned Out to Be a Waste of Time

Chasing a deeper network past a certain point stopped helping and started overfitting faster than it improved validation accuracy. The lesson wasn't new, but it's the kind of thing that's easy to forget mid-project when "just add more layers" feels like progress.

## Results

**85–90% classification accuracy** across the target disease classes on the held-out validation set.

## Lessons Learned

For a dataset this size, augmentation and preprocessing quality had a bigger effect on final accuracy than model depth. If I revisit this project, that's where I'd spend the next round of effort — not on the architecture.
