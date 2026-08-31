---
title: "Safe Vision: Real-Time Assault Detection with Blockchain Evidence"
description: "How Safe Vision combines a real-time computer vision model with blockchain-backed evidence storage to flag suspicious activity from live video."
date: "2026-08-10"
category: "Projects"
tags: ["Computer Vision", "Python", "Blockchain", "OpenCV"]
author: "Vishnu Kashyap D"
featured: false
coverImage: "/projects/safe-vision-demo.png"
published: true
technologies: ["Python", "OpenCV", "YOLO", "Blockchain"]
githubUrl: "https://github.com/UmashankarGouda/SafeVision"
---

> **Sample post.** This write-up documents Safe Vision, a real project listed on this portfolio, formatted as a case study. Swap in more detail from the actual build whenever you want to expand it.

## Overview

Safe Vision is a real-time surveillance system that watches a live video feed, flags suspicious or violent behavior as it happens, and writes tamper-evident records of what it detected to a blockchain-backed log.

## Problem

Traditional CCTV is reactive — footage gets reviewed after something has already gone wrong, and evidence chains of custody are easy to dispute. The goal was a system that could flag an incident the moment it happens and produce a record nobody could quietly alter afterward.

## Goals

- Detect assault-type behavior from live video with high accuracy
- Keep detection latency low enough to be genuinely "real-time"
- Store flagged evidence in a way that's provably tamper-proof

## Technologies

`Python` · `OpenCV` · `YOLO` · `Blockchain`

## Architecture

A video ingestion pipeline feeds frames into a detection model trained to recognize assault-like motion patterns. When the model's confidence crosses a threshold, the system captures the relevant frames and pushes a hash of that evidence to a blockchain ledger, so the existence and content of the flagged event can be verified independently of the system that generated it.

## Development

The detection side is built around a YOLO-based model tuned for the target behavior classes, running over frames pulled from the live feed with OpenCV. The evidence side is a lightweight blockchain integration that anchors a hash of each flagged clip rather than storing full video on-chain, keeping the chain itself lightweight while still making tampering detectable.

## Challenges

Real-time video inference is unforgiving of anything slow — every extra millisecond per frame compounds. Getting detection accuracy high while keeping inference fast enough for a live feed meant iterating on both model size and the surrounding pipeline.

## Solutions

The model currently reaches 92% detection accuracy while staying within a live-feed latency budget, by keeping the inference model appropriately sized for the task rather than reaching for the largest available architecture.

## Results

**92% detection accuracy** on the target behavior classes, with evidence write-through to the blockchain layer for verifiable incident logging.

## Lessons Learned

Pairing a real-time model with a trust layer (the blockchain evidence trail) turned out to be as much a systems problem as a machine learning one — the interesting engineering was in getting the two halves to hand off cleanly under real-time constraints.

## GitHub

The project repository is available on [GitHub](https://github.com/UmashankarGouda/SafeVision).
