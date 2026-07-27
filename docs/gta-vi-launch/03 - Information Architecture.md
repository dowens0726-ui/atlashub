# AtlasHub Information Architecture

**Version:** 1.0  
**Project:** AtlasHub  
**Product:** GTA VI AI Companion  
**Status:** Architecture Blueprint  
**Target:** Version 1.0

---

# Purpose

This document defines how every feature, page, intelligence engine, and player interaction connects throughout AtlasHub.

AtlasHub is not designed as a collection of isolated pages.

It is designed as a connected intelligence platform where every system contributes to a single goal:

> Help the player make better decisions while playing Grand Theft Auto VI.

---

# Architecture Philosophy

Traditional companion websites organize information into categories.

AtlasHub organizes information into relationships.

Every page should lead naturally to the next decision.

Every recommendation should reference other systems.

Every object should exist within a connected knowledge graph.

---

# System Overview

AtlasHub consists of five major layers.

```
Presentation Layer
        │
        ▼
Atlas Intelligence Layer
        │
        ▼
GTA VI Knowledge Layer
        │
        ▼
Player Intelligence Layer
        │
        ▼
Recommendation Layer
```

Each layer has a distinct responsibility.

---

# Layer 1 — Presentation

Responsible for the user experience.

Examples:

- Dashboard
- Atlas Copilot
- Leonida Map
- Vehicle Pages
- Mission Pages
- Business Pages
- Search
- Planner

Responsibilities:

- Display information
- Collect player input
- Present recommendations
- Visualize progression
- Deliver premium user experience

Presentation never owns game logic.

---

# Layer 2 — Atlas Intelligence

The intelligence layer transforms raw game data into recommendations.

Responsibilities:

- Recommendation Engine
- Planner
- Memory Engine
- Session Intelligence
- World Intelligence
- Player Identity
- Opportunity Detection
- Progress Evaluation

Every recommendation originates here.

---

# Layer 3 — GTA VI Knowledge

This layer stores structured knowledge about GTA VI.

Categories include:

## Leonida

- Regions
- Cities
- Districts
- Landmarks

---

## Vehicles

- Manufacturers
- Vehicle Classes
- Individual Vehicles
- Performance
- Acquisition

---

## Businesses

- Categories
- Requirements
- Income
- ROI
- Upgrades

---

## Properties

- Safehouses
- Commercial
- Storage
- Utility

---

## Missions

- Story
- Side
- Activities
- Unlock Chains

---

## Weapons

- Classes
- Statistics
- Availability
- Attachments

---

## Characters

- Protagonists
- NPCs
- Organizations
- Factions

---

## Collectibles

- Hidden Items
- Rewards
- Progress Tracking

---

# Layer 4 — Player Intelligence

Atlas continuously builds an understanding of the player.

Player Intelligence includes:

- Playstyle
- Goals
- Current Money
- Story Progress
- Owned Businesses
- Owned Vehicles
- Owned Properties
- Favorite Activities
- Historical Decisions

Atlas recommendations become more accurate as player knowledge improves.

---

# Layer 5 — Recommendation Layer

This layer combines:

Game Knowledge

+

Player Intelligence

+

Atlas Reasoning

to produce actionable recommendations.

Examples:

"Buy this business."

"Skip this vehicle."

"Complete this mission first."

"Save your money."

"Upgrade before expanding."

Recommendations should always include reasoning.

---

# Navigation Structure

AtlasHub is organized around player intent rather than content categories.

```
Dashboard
│
├── Atlas Copilot
│
├── Leonida
│   ├── Regions
│   ├── Cities
│   ├── Districts
│   └── Locations
│
├── Missions
│
├── Businesses
│
├── Properties
│
├── Vehicles
│   ├── Manufacturers
│   ├── Classes
│   └── Individual Vehicles
│
├── Weapons
│
├── Characters
│
├── Planner
│
├── Search
│
└── Player Profile
```

Navigation should reflect player goals rather than database organization.

---

# Connected Knowledge

Nothing exists independently.

Every object references related objects.

Example:

Vehicle

↓

Related Businesses

↓

Recommended Missions

↓

Nearby Locations

↓

Suggested Upgrades

↓

Recommended Purchases

↓

Atlas Recommendation

Likewise:

Business

↓

Required Money

↓

Recommended Property

↓

Recommended Vehicle

↓

Recommended Mission

↓

ROI Forecast

↓

Atlas Strategy

Every page should encourage intelligent exploration.

---

# Dashboard Relationships

The Dashboard is not another page.

It is the entry point into every Atlas system.

Dashboard modules may include:

- Executive Briefing
- Mission Control
- Empire Overview
- Session Plan
- World Intelligence
- Recommendations
- Progress
- Goals
- Alerts
- Opportunities

Every module links to deeper systems.

---

# Search Architecture

Search should understand intent.

Examples:

Player searches:

"Best first business"

Atlas understands:

Business

+

Money

+

Early Progression

+

ROI

+

Recommendation Engine

instead of matching keywords alone.

Search should surface:

- Direct Answers
- Related Pages
- Recommendations
- Similar Content
- Atlas Advice

---

# Atlas Copilot

Copilot is not another feature.

Copilot is the conversational interface to every Atlas system.

It should access:

- World Intelligence
- Player Memory
- Recommendation Engine
- Knowledge Graph
- Planner
- Dashboard Data

Copilot should never be limited to a single content category.

---

# Leonida World Intelligence

Leonida is a living world.

Atlas should organize it into:

Regions

↓

Cities

↓

Districts

↓

Landmarks

↓

Businesses

↓

Properties

↓

Activities

↓

Missions

↓

Opportunities

Everything in the world should be geographically connected.

---

# Cross-System Relationships

Examples of relationships include:

Vehicle ↔ Business

Business ↔ Property

Mission ↔ Character

Mission ↔ Vehicle

Weapon ↔ Mission

Location ↔ Business

Location ↔ Property

Character ↔ Organization

Organization ↔ Missions

Planner ↔ Everything

These relationships power Atlas Intelligence.

---

# Design Rules

Every new feature must answer:

Where does it live?

What does it connect to?

What player question does it answer?

What recommendation does Atlas generate?

If those answers are unclear, the feature is incomplete.

---

# Long-Term Scalability

The architecture is intentionally designed to expand.

Future additions may include:

- Legacy GTA Archive
- GTA Online Archive
- Additional Rockstar titles
- Community Intelligence
- Live Events
- Multiplayer Support

Expansion should extend the architecture—not replace it.

---

# Architecture Principle

AtlasHub should never feel like a website with many pages.

It should feel like one intelligent system where every page, every recommendation, every search result, and every dashboard module contributes to helping the player make the next best decision in GTA VI.