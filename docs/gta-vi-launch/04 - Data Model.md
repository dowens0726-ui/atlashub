# AtlasHub Data Model

**Version:** 1.0  
**Project:** AtlasHub  
**Product:** GTA VI AI Companion  
**Status:** Canonical Data Model  
**Target:** Version 1.0

---

# Purpose

This document defines the canonical structure for every entity within AtlasHub.

Every intelligence engine, page, search result, recommendation, planner, and dashboard component should reference these models.

The goal is consistency.

Every object should share common behaviors while allowing each content type to expose its own specialized intelligence.

---

# Design Principles

The AtlasHub data model follows five principles.

## Consistency

Every entity follows a predictable structure.

---

## Relationships

Objects reference other objects rather than existing independently.

---

## Intelligence

Every entity supports Atlas recommendations.

---

## Scalability

New GTA VI content can be added without redesigning the architecture.

---

## Reusability

The same data powers:

- Dashboard
- Copilot
- Search
- Planner
- Recommendations
- World Intelligence
- Future APIs

---

# Universal Entity

Every Atlas entity contains the following fields.

## Identity

- ID
- Name
- Slug
- Category
- Subcategory

---

## Presentation

- Display Name
- Short Description
- Long Description
- Hero Image
- Gallery

---

## Classification

- Region
- District
- Tags
- Rarity (if applicable)

---

## Progression

- Unlock Requirements
- Recommended Progression Stage
- Difficulty
- Estimated Value

---

## Relationships

- Related Missions
- Related Businesses
- Related Vehicles
- Related Weapons
- Related Properties
- Related Characters
- Related Locations

---

## Atlas Intelligence

- Atlas Score
- Recommendation Level
- Confidence
- Recommendation Reasoning
- Advantages
- Tradeoffs
- Best Use Cases

---

# Vehicle Model

Every vehicle contains:

## Basic Information

- Manufacturer
- Vehicle Class
- Drive Type
- Seats

---

## Performance

- Top Speed
- Acceleration
- Braking
- Handling
- Off-road Rating

---

## Acquisition

- Purchase Price
- Purchase Location
- Unlock Requirements
- Special Conditions

---

## Atlas Intelligence

- Best Stage
- Best Businesses
- Best Missions
- Recommended Upgrades
- Similar Vehicles
- ROI Score
- Performance Score

---

# Business Model

Every business contains:

## Overview

- Category
- Purchase Cost
- Location
- Required Progress

---

## Financial

- Startup Cost
- Upgrade Costs
- Operating Cost
- Revenue
- ROI
- Break-even Estimate

---

## Atlas Intelligence

- Purchase Order
- Synergies
- Expansion Strategy
- Risk Rating
- Long-term Value

---

# Mission Model

Every mission contains:

## Overview

- Story Arc
- Mission Number
- Chapter
- Type

---

## Gameplay

- Requirements
- Rewards
- Difficulty
- Estimated Time

---

## Unlocks

- Characters
- Vehicles
- Businesses
- Properties
- Equipment

---

## Atlas Intelligence

- Recommended Preparation
- Recommended Loadout
- Suggested Vehicle
- Strategic Importance
- Follow-up Recommendations

---

# Property Model

Every property contains:

## Overview

- Purchase Cost
- Region
- Services
- Capacity

---

## Benefits

- Unlocks
- Storage
- Income
- Utility

---

## Atlas Intelligence

- Purchase Timing
- ROI
- Expansion Value
- Recommended Ownership Stage

---

# Weapon Model

Every weapon contains:

## Statistics

- Damage
- Accuracy
- Fire Rate
- Range
- Capacity

---

## Acquisition

- Cost
- Availability
- Unlock Requirements

---

## Atlas Intelligence

- Best Missions
- Best Situations
- Similar Weapons
- Atlas Rating

---

# Character Model

Every character contains:

## Identity

- Name
- Role
- Affiliation
- Organization

---

## Story

- Biography
- Relationships
- Timeline Position

---

## Atlas Intelligence

- Related Missions
- Related Businesses
- Related Locations
- Importance Rating

---

# Location Model

Every location contains:

## Geography

- Region
- City
- District

---

## Features

- Businesses
- Properties
- Activities
- Missions

---

## Atlas Intelligence

- Opportunity Rating
- Safety
- Economic Activity
- Recommended Visits

---

# World Intelligence Model

The world itself is treated as an entity.

Tracks:

- Economy
- Activity
- Opportunity
- Traffic
- Environment
- Regional Conditions
- Dynamic Events

---

# Player Profile Model

Stores:

- Identity
- Playstyle
- Goals
- Progress
- Money
- Businesses
- Vehicles
- Properties
- Achievements
- Session History

---

# Atlas Recommendation Model

Every recommendation contains:

- Title
- Summary
- Confidence
- Priority
- Reasoning
- Benefits
- Risks
- Estimated Time
- Estimated Cost
- Related Entities
- Next Recommended Action

---

# Knowledge Graph

AtlasHub connects entities through relationships.

Example:

Vehicle

↓

Business

↓

Mission

↓

Character

↓

Location

↓

Property

↓

Planner

↓

Recommendation

The value of AtlasHub comes from these connections rather than isolated data.

---

# Required Launch Entities

Version 1.0 includes:

- Vehicles
- Businesses
- Missions
- Properties
- Weapons
- Characters
- Locations
- World
- Player
- Recommendations

These entities form the complete GTA VI launch knowledge graph.

---

# Architecture Principle

Every new data type introduced into AtlasHub must integrate with the existing knowledge graph.

No entity should exist in isolation.

Every object should contribute to Atlas Intelligence, enabling richer recommendations, better search results, and smarter planning as the platform grows.