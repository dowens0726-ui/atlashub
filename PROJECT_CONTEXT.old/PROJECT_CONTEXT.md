# AtlasHub

> Spend less time searching. More time playing.

Version: 1.0.0

Status: Active Development

Current Sprint: 0.3

---

# Vision

AtlasHub is being built as the definitive companion application for Grand Theft Auto VI.

Our goal is simple:

Help players spend less time searching and more time playing.

Everything we build should support that mission.

---

# Core Principle

> Help players spend less time searching and more time playing.

Every feature should accomplish at least one of these goals:

- Reduce friction
- Improve clarity
- Help players make better decisions
- Make information easier to discover

If a feature does not improve the player experience, we should question whether it belongs.

---

# Engineering Principles

## 1. Data drives the UI

Generate user interfaces from data whenever possible.

Avoid hardcoding values that should come from the application's data.

## 2. Leave the codebase better than you found it

Every sprint should improve AtlasHub, even if only by a small amount.

## 3. Readability beats cleverness

Future maintainability is more valuable than saving a few lines of code.

## 4. Build for scale, not complexity

Choose patterns that support future growth without adding unnecessary complexity today.

## 5. Small commits, tested often

Every meaningful change should be built, tested, committed, and pushed before starting the next feature.

## 6. Documentation is part of the product

Code explains how.

Documentation explains why.

## 7. User experience comes first

Performance, accessibility, clarity, and ease of use are features, not afterthoughts.

---

# Development Workflow

AtlasHub uses a simple development cycle:

1. Discover
2. Design
3. Build
4. Verify
5. Document
6. Ship

Every feature should be planned, built, tested in the browser, documented if needed, committed, and pushed before starting the next major change.

---

# Git Workflow

For each meaningful change:

1. Save the files
2. Test locally
3. Run `git add .`
4. Commit with a clear message
5. Push to GitHub

Example:

```bash
git add .
git commit -m "Add active navigation"
git push

