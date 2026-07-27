# Sprint 123 — AtlasHub Feature Audit

**Version:** 1.0  
**Sprint:** 123.1  
**Project:** AtlasHub  
**Audit Type:** Blueprint Alignment  
**Status:** Initial Structural Audit  
**Target:** GTA VI Launch Version 1.0

---

# Purpose

This audit compares the current AtlasHub feature surface against the requirements defined by the GTA VI launch blueprints.

This document answers:

- Which required launch features already exist?
- Which features have supporting architecture but require integration?
- Which features remain incomplete or missing?
- Which existing systems require GTA VI-first alignment?
- Which capabilities should be consolidated before additional features are added?

This initial audit is based on the current route, component, intelligence, service, hook, data, and type inventory.

Structural existence does not automatically mean a feature is complete.

Behavioral verification will occur during the architecture, intelligence, and UI audits.

---

# Status Definitions

## Complete

The feature exists, is integrated with Atlas Intelligence, supports the expected player journey, and appears aligned with the launch blueprint.

## Partially Complete

The feature exists and provides meaningful functionality but is missing one or more launch requirements.

## Structural Foundation

Routes, components, services, or engines exist, but the full player experience has not yet been verified.

## Needs Refactor

The feature exists but appears fragmented, duplicated, legacy-oriented, or inconsistent with the current product direction.

## Missing

The required launch capability does not currently have a sufficient implementation.

## Deferred

The feature is intentionally outside GTA VI Version 1.0.

---

# Executive Assessment

AtlasHub has a substantial existing platform foundation.

The codebase includes:

- A premium command-center dashboard
- Atlas Copilot
- Search infrastructure
- Planner infrastructure
- Player profile and onboarding
- Vehicle, mission, property, weapon, business, and map routes
- Recommendation, memory, reasoning, forecasting, progression, and strategy engines
- Explorer and map systems
- Reusable services and hooks
- Multiple UI and design-system layers

The primary launch risk is not a lack of features.

The primary risks are:

1. Fragmented implementations
2. Overlapping component generations
3. GTA V-oriented launch content
4. Inconsistent intelligence integration
5. Incomplete entity relationships
6. Unverified cross-platform consistency
7. Missing or incomplete GTA VI characters and location models

The next phase should emphasize consolidation, alignment, and integration rather than unrestricted feature expansion.

---

# Launch Feature Summary

| Launch Feature | Structural Status | Preliminary Assessment | Required Action |
|---|---|---|---|
| Dashboard | Extensive foundation | Partially Complete | Unify around the four command-center questions |
| Atlas Copilot | Extensive foundation | Partially Complete | Verify shared context and recommendation consistency |
| Leonida Map | Map and explorer foundation | Structural Foundation | Convert into GTA VI world intelligence |
| Vehicles | Extensive implementation | Partially Complete | Separate legacy data and prepare GTA VI schema |
| Businesses | Existing routes and services | Partially Complete | Add canonical intelligence and GTA VI alignment |
| Missions | Existing routes, data, and engines | Partially Complete | Connect progression, loadouts, characters, and world |
| Properties | Existing routes, data, and engines | Partially Complete | Align taxonomy and relationships with GTA VI |
| Weapons | Existing routes and data | Structural Foundation | Add intelligence, comparisons, and mission context |
| Characters | No dedicated launch route identified | Missing | Build canonical character system |
| Search | Multiple search systems exist | Needs Refactor | Consolidate into intent-driven Atlas Search |
| Planner | Existing route, hooks, and engines | Partially Complete | Verify shared recommendations and multi-step planning |
| Player Profile | Existing profile and onboarding | Partially Complete | Expand GTA VI progression and ownership context |
| World Intelligence | Multiple visual world systems exist | Structural Foundation | Build canonical Leonida intelligence layer |
| Recommendation System | Extensive engine foundation | Partially Complete | Standardize output and reasoning contract |
| Knowledge Graph | Relationship engine exists | Structural Foundation | Implement canonical cross-entity relationships |

---

# 1. Dashboard

## Blueprint Requirement

The Dashboard must answer:

- How is my empire progressing?
- What changed?
- What should I do next?
- Why is Atlas recommending it?

It should function as a focused command center rather than a collection of unrelated cards.

## Existing Foundation

The current codebase includes:

- Dashboard route
- Dashboard client
- Command-center layout
- Executive command deck
- Mission focus panel
- Empire score
- Live empire status
- Executive metrics
- Mission Control
- Atlas OS ribbon
- Operations section
- Recent events
- Quick actions
- Dashboard intelligence engines
- Dashboard composition and presentation engines

## Preliminary Status

**Partially Complete**

The Dashboard has one of the strongest implementations in the application.

However, the number of dashboard components suggests multiple generations and potentially overlapping presentations.

## Gaps to Verify

- One canonical dashboard composition
- Clear primary recommendation
- Visible recommendation reasoning
- Confidence communication
- Session change detection
- Consistency with Planner and Copilot
- Removal or retirement of legacy dashboard components
- GTA VI-first visual and content alignment

## Required Action

Conduct a dedicated dashboard consolidation sprint after the intelligence and UI audits.

---

# 2. Atlas Copilot

## Blueprint Requirement

Copilot must represent the complete Atlas intelligence system.

It must share:

- Player context
- Knowledge graph
- Planner state
- Recommendation logic
- Memory
- Confidence standards
- World intelligence

## Existing Foundation

The current codebase includes:

- Copilot route
- Copilot controller
- Message presentation
- Prompt system
- Quick actions
- Timeline
- Reasoning cards
- Confidence meter
- Recommendation weighting
- Intent engine
- Intent matcher
- Intent router
- Session engine
- Response lifecycle hook
- Copilot action engine
- Brain Copilot engine

## Preliminary Status

**Partially Complete**

Atlas Copilot has substantial conversational and intelligence infrastructure.

## Gaps to Verify

- Shared recommendation output with Dashboard and Planner
- Canonical player-state access
- Reliable entity references
- World and route context
- Memory persistence
- Transparent handling of unknown information
- Consistent response structure
- Search-to-Copilot handoff
- Copilot-to-Planner actions

## Required Action

Verify the complete Copilot decision pipeline during the Intelligence Audit.

---

# 3. Leonida Map

## Blueprint Requirement

The Leonida Map must help players understand:

- Where something is
- Why the location matters
- Nearby opportunities
- Connected missions
- Connected businesses
- Travel considerations
- Regional progression
- Atlas recommendations

## Existing Foundation

The current codebase includes:

- Map route
- Map canvas
- Map viewport
- Map markers
- Map sidebar
- Map layers
- Map toolbar
- Filters
- Legend
- Map service
- Explorer route
- Explorer canvas
- Explorer marker system
- Explorer filters
- Explorer search
- Explorer intelligence
- Camera and viewport hooks

## Preliminary Status

**Structural Foundation**

AtlasHub already has significant map and explorer architecture.

The current inventory does not confirm a canonical Leonida geographic model or interconnected GTA VI world data.

## Gaps to Verify

- Region model
- District model
- Location entities
- Geographic relationships
- GTA VI map content
- Mission and business overlays
- Opportunity detection
- Player progression overlays
- Map recommendations
- Shared Map and Explorer architecture

## Required Action

Define the Leonida world model before expanding visual map features.

---

# 4. Vehicles

## Blueprint Requirement

Vehicle Intelligence should help players evaluate:

- Cost
- Performance
- Utility
- Availability
- Progression fit
- Mission fit
- Business fit
- Ownership value
- Alternatives
- Recommended timing

## Existing Foundation

The codebase includes:

- Vehicle listing route
- Vehicle detail route
- Vehicle cards
- Vehicle hero and statistics
- Related vehicles
- Vehicle comparison
- Vehicle recommendations
- Vehicle scoring
- Vehicle advisor
- Garage intelligence
- Garage Builder
- Manufacturer routes
- Manufacturer services
- Vehicle factories
- Manufacturer-specific data files
- Vehicle types
- Availability and display services

## Preliminary Status

**Partially Complete**

Vehicles appear to be the most mature content domain.

Much of the current dataset is based on GTA V and GTA Online vehicles.

## Gaps to Verify

- GTA VI content boundary
- Legacy content classification
- Canonical GTA VI vehicle schema
- Verification status
- Source confidence
- Mission relationships
- Character relationships
- Location relationships
- Acquisition requirements
- Player ownership integration

## Required Action

Preserve the reusable vehicle platform while separating legacy content from the GTA VI launch experience.

---

# 5. Businesses

## Blueprint Requirement

Business Intelligence should explain:

- Purchase cost
- Requirements
- Revenue potential
- Operating effort
- Risk
- Progression fit
- Related missions
- Related properties
- Recommended timing
- Return on investment

## Existing Foundation

The codebase includes:

- Business listing route
- Business detail route
- Business cards
- Business hero
- Business statistics
- Business tips
- Business service
- Business ranking service
- Business ranking adapter
- ROI engine
- Economy engine
- Empire engine

## Preliminary Status

**Partially Complete**

The content and service foundation exists.

## Gaps to Verify

- Canonical business model
- GTA VI business content
- Ownership integration
- Revenue and effort modeling
- Mission relationships
- Property relationships
- Regional relationships
- Reliable ROI reasoning
- Recommendation timing
- Search and Copilot support

## Required Action

Align the business model with the canonical GTA VI data blueprint and knowledge graph.

---

# 6. Missions

## Blueprint Requirement

Mission Intelligence should provide:

- Requirements
- Objectives
- Rewards
- Difficulty
- Recommended equipment
- Recommended vehicles
- Recommended strategy
- Character relationships
- Location relationships
- Unlocks
- Progression impact
- Suggested next mission

## Existing Foundation

The codebase includes:

- Mission listing route
- Mission detail route
- Mission data
- Mission cards
- Mission statistics
- Mission unlocks
- Related missions
- Recommended vehicles
- Recommended weapons
- Atlas tips
- Mission execution engine
- Mission strategy engine
- Mission ranking engine
- Mission loadout engine
- Mission impact engine
- Mission learning engine
- Mission outcome engine
- Mission feedback engine
- Mission brain pipeline

## Preliminary Status

**Partially Complete**

Mission intelligence has a deep engine foundation.

## Gaps to Verify

- Canonical mission schema
- GTA VI mission content
- Story and side-mission distinction
- Spoiler controls
- Character relationships
- Geographic relationships
- Prerequisite graph
- Unlock graph
- Planner integration
- Post-mission learning
- Consistency between mission engines

## Required Action

Consolidate mission intelligence around one canonical pipeline and data contract.

---

# 7. Properties

## Blueprint Requirement

Property Intelligence should help players understand:

- Cost
- Type
- Region
- Capacity
- Benefits
- Unlock requirements
- Business relationships
- Vehicle storage
- Progression value
- Recommended timing

## Existing Foundation

The codebase includes:

- Property listing route
- Property detail route
- Property recommendation engine
- Property intelligence engine
- Property type definitions
- Existing datasets for apartments, agencies, bunkers, garages, hangars, nightclubs, offices, salvage yards, and warehouses

## Preliminary Status

**Partially Complete**

The implementation is structurally mature but strongly reflects GTA Online property categories.

## Gaps to Verify

- GTA VI property taxonomy
- Legacy property separation
- Canonical property model
- Regional relationships
- Business relationships
- Ownership state
- Storage and utility modeling
- Recommendation timing

## Required Action

Retain reusable property architecture while replacing launch assumptions with verified GTA VI categories.

---

# 8. Weapons

## Blueprint Requirement

Weapon Intelligence should explain:

- Cost
- Availability
- Weapon class
- Performance
- Mission suitability
- Playstyle fit
- Alternatives
- Recommended purchase timing

## Existing Foundation

The codebase includes:

- Weapon listing route
- Weapon detail route
- Weapon cards
- Weapon data
- Weapon types
- Mission weapon recommendation components

## Preliminary Status

**Structural Foundation**

Weapons have route and data support, but the inventory shows less dedicated intelligence infrastructure than vehicles, missions, or properties.

## Gaps to Verify

- Weapon scoring
- Weapon comparison
- Mission suitability
- Player ownership
- Playstyle matching
- Availability requirements
- GTA VI verification
- Copilot and Planner integration
- Related entity graph

## Required Action

Create a reusable weapon intelligence pipeline after the canonical entity model is established.

---

# 9. Characters

## Blueprint Requirement

Character pages should connect:

- Biography
- Role
- Affiliations
- Missions
- Locations
- Businesses
- Properties
- Vehicles
- Story progression
- Related characters

## Existing Foundation

No dedicated character route, character component family, character data directory, character service, or character type was identified in the current inventory.

Character relationships may exist indirectly inside mission or content data, but that has not been verified.

## Preliminary Status

**Missing**

## Required Action

Build the canonical Character entity after the knowledge graph foundation is defined.

This should not begin as isolated biography pages.

Characters should launch as connected knowledge-graph entities.

---

# 10. Search

## Blueprint Requirement

Search should return answers rather than only pages.

The expected flow is:

Direct Answer

↓

Recommended Page

↓

Related Content

↓

Atlas Recommendation

↓

Suggested Next Search

## Existing Foundation

The codebase includes:

- Atlas Search
- Search bars
- Search dialog
- Search input
- Search panel
- Search result components
- Search results components
- Command palette
- Command provider
- Command input
- Command results
- Search service
- Atlas Search hook
- Explorer search
- Intent engine
- Intent matcher
- Intent router

## Preliminary Status

**Needs Refactor**

AtlasHub appears to contain multiple search and command experiences.

This is a strong foundation, but it may create inconsistent behavior and duplicated UI.

## Gaps to Verify

- One canonical search service
- One canonical result contract
- Intent recognition
- Direct answers
- Recommendation generation
- Entity relationship results
- Player-context ranking
- Search history
- Suggested follow-up queries
- Copilot handoff
- Command palette role

## Required Action

Consolidate search into an intent-driven Atlas Search system.

---

# 11. Planner

## Blueprint Requirement

The Planner should build actionable, multi-step strategies based on:

- Player goals
- Current resources
- Progression
- Owned assets
- Recommended purchases
- Mission sequence
- Time
- Cost
- Expected impact

## Existing Foundation

The codebase includes:

- Planner route
- Planner header
- Planner steps
- Planner summary
- Planner timeline
- Atlas Planner Strategy
- Planner hook
- Planning engine
- Strategic roadmap engine
- Strategic command engine
- Daily objectives
- Session planning
- Forecasting
- Progression engine

## Preliminary Status

**Partially Complete**

The Planner has both presentation and intelligence foundations.

## Gaps to Verify

- Shared recommendation source
- Persistent plan state
- Multi-step dependency handling
- Cost and time calculation
- World and location awareness
- Mission prerequisites
- Business and property prerequisites
- Copilot modification
- Dashboard plan preview consistency

## Required Action

Verify Planner orchestration and eliminate any recommendation logic duplicated outside the main decision pipeline.

---

# 12. Player Profile and Onboarding

## Blueprint Requirement

Atlas should understand:

- Player identity
- Goals
- Playstyle
- Cash
- Progression
- Businesses owned
- Vehicles owned
- Properties owned
- Weapons owned
- Recent decisions
- Long-term plans

## Existing Foundation

The codebase includes:

- Onboarding routes
- Playstyle selection
- Goal selection
- Identity generation
- Profile route
- Profile editor
- Cash editor
- Business selector
- Vehicle selector
- Owned business display
- Player profile hook
- Player identity engine
- Behavior profile engine
- Persistent memory engine
- Session persistence engine

## Preliminary Status

**Partially Complete**

The profile and identity architecture is substantial.

## Gaps to Verify

- Mission progression
- Property ownership
- Weapon ownership
- Location discovery
- Story progression
- GTA VI-specific goals
- Data migration strategy
- Explicit memory controls
- Cross-device persistence strategy
- Privacy behavior

## Required Action

Expand the canonical player-state model after the entity models are finalized.

---

# 13. World Intelligence

## Blueprint Requirement

Atlas should understand Leonida as a living, connected world.

World Intelligence should combine:

- Geography
- Regions
- Opportunities
- Businesses
- Missions
- Characters
- Economy
- Travel
- Player progression
- Dynamic state

## Existing Foundation

The codebase includes multiple world-rendering systems:

- Atlas World
- Atlas World Renderer
- Atlas Shell World
- Skyline layers
- Traffic layers
- Lighting layers
- Atmosphere layers
- Waterfront and ocean layers
- Mission Control world renderer
- Command-center hero world renderer
- Explorer Intelligence
- Map services
- Economy engine
- Opportunity engine
- Situation analysis

## Preliminary Status

**Structural Foundation**

AtlasHub has sophisticated visual-world presentation.

The inventory does not confirm a single canonical world-state engine connecting visual presentation to gameplay intelligence.

## Gaps to Verify

- Canonical World entity
- Region and district models
- Location entities
- Dynamic world state
- Opportunity state
- Economic state
- Player-relative world recommendations
- Shared world renderer architecture
- Clear separation between visual atmosphere and world intelligence

## Required Action

Define the world data and intelligence contracts before adding further environmental rendering layers.

---

# 14. Recommendation and Reasoning System

## Blueprint Requirement

Every Atlas recommendation should include:

- Recommendation
- Reasoning
- Benefits
- Tradeoffs
- Confidence
- Estimated cost
- Estimated time
- Next action

## Existing Foundation

The codebase includes:

- Recommendation engine
- Recommendation weighting engine
- Recommendation candidate engine
- Adaptive recommendation engine
- Recommendation service
- Decision engine
- Decision context engine
- Decision orchestrator
- Decision pipelines
- Reasoning engine
- Session reasoning
- Impact engine
- ROI engine
- Scoring engine
- Match engine
- Confidence presentation
- Recommendation cards
- Recommendation analysis cards

## Preliminary Status

**Partially Complete**

This is one of AtlasHub’s deepest architectural areas.

The number of engines and pipelines also creates a consolidation risk.

## Gaps to Verify

- One canonical recommendation contract
- One canonical decision entry point
- Shared reasoning output
- Shared confidence scale
- Cost and time estimates
- Alternative recommendations
- Unknown-data handling
- Consistent next actions
- Removal of competing pipelines
- Deterministic behavior where required

## Required Action

The Intelligence Audit must map the full recommendation lifecycle and designate the long-term canonical pipeline.

---

# 15. Knowledge Graph

## Blueprint Requirement

Every major entity should connect through stable identifiers and explicit relationships.

Required entity classes include:

- Vehicle
- Business
- Mission
- Property
- Weapon
- Character
- Location
- World
- Player
- Recommendation

## Existing Foundation

The codebase includes:

- Relationship engine
- Relationship service
- Relationship panel
- Related vehicle components
- Related mission components
- Recommended vehicle components
- Recommended weapon components
- Content registry
- Content tags
- Shared entity statistics
- Multiple canonical type files

## Preliminary Status

**Structural Foundation**

Relationship capabilities exist, but the inventory does not establish whether there is one canonical graph model or consistent relationship schema.

## Gaps to Verify

- Stable global identifiers
- Canonical relationship types
- Bidirectional relationships
- Character entities
- Location entities
- World entities
- Relationship validation
- Search indexing
- Copilot retrieval
- Planner traversal

## Required Action

Create one canonical knowledge-graph contract before large-scale GTA VI content ingestion.

---

# 16. Supporting Platform Capabilities

## Existing Capabilities

AtlasHub also contains meaningful supporting systems:

- Favorites
- Recently viewed content
- Achievements
- Activity feed
- Rankings
- Collections
- Comparison tools
- Admin import
- Vehicle generator
- Engineering health interface
- Capability gates
- Pro previews
- Legal pages
- Design-system preview
- Garage Builder

## Preliminary Status

**Mixed**

Some of these capabilities support the GTA VI launch experience.

Others may be internal, secondary, legacy, or post-launch features.

## Required Action

Classify each supporting feature as:

- Launch critical
- Launch supporting
- Internal tooling
- Legacy compatibility
- Post-launch
- Candidate for removal

This classification should occur during the Architecture Audit.

---

# Duplication and Consolidation Risks

The structural inventory suggests overlapping generations in several areas.

## Dashboard

Potential overlap exists between:

- Legacy dashboard components
- Command-center components
- Executive command deck
- Mission Control
- Operations components
- Home dashboard components

## Search

Potential overlap exists between:

- Atlas Search
- Search components
- Layout SearchBar
- Root SearchBar
- Command palette
- Explorer search

## UI Systems

Potential overlap exists between:

- `app/components/design`
- `app/components/design-system`
- `app/components/ui`
- Root-level shared components

## Layout Systems

Potential overlap exists between:

- AppShell
- AtlasAppShell
- Sidebar
- AtlasSidebar
- Navbar
- AtlasNavigation
- Topbar
- AtlasTopBar

## World Rendering

Potential overlap exists between:

- Shared world components
- Dashboard Mission Control world
- Command-center hero world
- Map world
- Explorer canvas

## Intelligence Presentation

Potential overlap exists between:

- Intelligence components under `app/components/intelligence`
- Intelligence components directly under `app/intelligence`
- Multiple recommendation card versions
- Multiple memory and next-action components

These are not automatically defects.

They are audit targets requiring consumer and behavior review.

---

# GTA VI Alignment Risks

The following domains appear to contain strong GTA V or GTA Online assumptions:

- Vehicle datasets
- Property datasets
- Business datasets
- Mission data
- Manufacturer data
- Garage Builder
- Empire terminology and calculations
- Existing recommendation candidates

Reusable architecture should be preserved.

Legacy data should be isolated from the GTA VI launch product rather than deleted without review.

---

# Preliminary Feature Priorities

## Priority 1 — Canonical Architecture

1. Canonical recommendation pipeline
2. Canonical entity model
3. Canonical relationship model
4. Canonical player-state model
5. Canonical search contract

## Priority 2 — GTA VI Launch Alignment

1. Separate legacy content
2. Add verification metadata
3. Define GTA VI content ingestion
4. Define unknown and unverified states
5. Establish spoiler policy

## Priority 3 — Core Player Experiences

1. Dashboard
2. Copilot
3. Search
4. Planner
5. Leonida Map

## Priority 4 — Knowledge Domains

1. Missions
2. Vehicles
3. Businesses
4. Properties
5. Weapons
6. Characters
7. Locations

## Priority 5 — Launch Polish

1. Unified visual language
2. Performance
3. Accessibility
4. Responsive behavior
5. Empty and error states
6. Content validation

---

# Feature Audit Conclusions

AtlasHub already possesses the majority of the structural systems required by the launch blueprints.

The most important next actions are not broad feature creation.

They are:

1. Identify the canonical implementation of each major system.
2. Consolidate duplicated or competing architecture.
3. Separate reusable platform code from legacy GTA data.
4. Implement a canonical GTA VI knowledge graph.
5. Ensure Dashboard, Copilot, Search, and Planner use shared intelligence.
6. Add missing Character and Location entity systems.
7. Align every player experience with the GTA VI-first launch standard.

The platform is architecturally advanced.

The next phase must transform that architecture into one coherent, trustworthy, and launch-focused product.

---

# Next Audit

The next document is:

`02 - Architecture Audit.md`

The Architecture Audit will determine:

- Which systems are canonical
- Which systems overlap
- Which layers own business logic
- Which data models require consolidation
- Which modules should be preserved, merged, deprecated, or removed
- How the current codebase maps to the blueprint architecture
