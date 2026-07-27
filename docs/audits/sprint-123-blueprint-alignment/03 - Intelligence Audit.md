# Sprint 123 — AtlasHub Intelligence Audit

**Version:** 1.0  
**Sprint:** 123.3  
**Project:** AtlasHub  
**Audit Type:** Intelligence Architecture Review  
**Status:** Initial Structural Audit  
**Target:** GTA VI Launch Version 1.0

---

# Purpose

This audit defines the intended long-term intelligence architecture for AtlasHub.

It evaluates the current structural foundation for:

- player identity
- player state
- memory
- behavior
- world context
- intent
- recommendation generation
- scoring
- reasoning
- confidence
- planning
- forecasting
- execution
- outcomes
- learning
- persistence

This is an architectural assessment based on the current intelligence, service, hook, component, data, and type inventory.

The existence of an engine does not prove that it is fully integrated, actively consumed, or behaviorally correct.

Detailed call-chain verification should occur during implementation sprints before competing modules are removed.

---

# Intelligence Principles

Atlas Intelligence should follow these principles:

1. One canonical decision lifecycle.
2. One canonical recommendation contract.
3. One shared player-state source.
4. One shared confidence model.
5. Reasoning must accompany recommendations.
6. Unknown data must remain explicitly unknown.
7. Memory must be purposeful and transparent.
8. Intelligence engines must remain independent of presentation.
9. Dashboard, Copilot, Search, and Planner must consume shared intelligence.
10. Player actions and outcomes should improve future recommendations.
11. Deterministic rules should be preferred where explainability matters.
12. Unverified GTA VI information must never be presented as confirmed fact.

---

# Executive Assessment

AtlasHub contains a substantial intelligence foundation.

The current codebase includes systems for:

- player identity
- behavioral intelligence
- persistent memory
- route and situation context
- intent detection and routing
- recommendation candidates
- recommendation weighting
- decision orchestration
- reasoning
- impact
- ROI
- forecasting
- planning
- progression
- mission strategy
- mission outcomes
- strategy evolution
- session persistence
- event-driven updates
- Atlas Brain composition

The primary intelligence risk is not missing capability.

The primary risk is that multiple engines and pipelines may perform overlapping responsibilities without one clearly enforced canonical entry point.

The next implementation phase should emphasize convergence, contracts, and traceability rather than creating additional independent engines.

---

# Canonical Intelligence Lifecycle

The long-term Atlas lifecycle should follow this sequence:

Player Input

↓

Player State

↓

Identity and Behavioral Context

↓

Persistent Memory

↓

Route, Session, and World Context

↓

Intent Resolution

↓

Situation Analysis

↓

Recommendation Candidate Generation

↓

Candidate Scoring and Weighting

↓

Decision Selection

↓

Reasoning and Tradeoff Generation

↓

Confidence Assessment

↓

Recommendation Contract

↓

Dashboard / Copilot / Search / Planner Presentation

↓

Player Action

↓

Outcome Capture

↓

Memory Update

↓

Learning and Strategy Evolution

This flow should become the standard path for all significant Atlas recommendations.

---

# 1. Player State

## Responsibility

Player State should represent the current known condition of the player.

It should include:

- identity
- goals
- playstyle
- risk profile
- cash
- progression
- owned businesses
- owned vehicles
- owned properties
- owned weapons
- mission progression
- recent actions
- active plan
- session context
- long-term objectives

## Existing Foundation

The inventory identifies:

- profile types
- onboarding types
- empire types
- progression types
- player profile hook
- profile service
- player intelligence service
- empire service
- progression service
- onboarding persistence
- session persistence

## Preliminary Status

**Partially Complete**

The current player-state foundation is substantial, but the inventory does not confirm one canonical aggregate state contract shared by every intelligence consumer.

## Risks

- Different engines may receive different subsets of player state.
- Ownership may be modeled inconsistently between domains.
- Session state may be separate from persistent profile state.
- Dashboard and Copilot may compose context differently.
- GTA V assumptions may be embedded in current profile fields.

## Required Direction

Create one canonical `AtlasPlayerState` contract.

Every decision pipeline should accept this shared state or a documented projection derived from it.

---

# 2. Identity Intelligence

## Responsibility

Identity Intelligence should translate onboarding and player behavior into a stable but evolving strategic profile.

It should describe:

- archetype
- strategy
- risk profile
- strengths
- priorities
- decision preferences
- progression style
- confidence in the identity assessment

## Existing Foundation

The inventory identifies:

- player identity engine
- identity advisor engine
- behavior profile engine
- behavioral intelligence engine
- onboarding identity flow
- playstyle and goal selection

## Preliminary Status

**Partially Complete**

Identity generation and persistence exist.

## Risks

- Identity and behavioral profile responsibilities may overlap.
- Static onboarding identity may conflict with learned behavior.
- Multiple systems may use different identity representations.
- Confidence and evolution rules may not be unified.

## Required Direction

Use a two-layer identity model:

### Declared Identity

What the player explicitly selects during onboarding.

### Observed Identity

What Atlas infers from behavior and outcomes.

Atlas should preserve both rather than silently replacing one with the other.

---

# 3. Memory

## Responsibility

Memory should retain information that improves future decisions.

Memory categories should include:

- player facts
- preferences
- decisions
- outcomes
- repeated behavior
- active goals
- unresolved recommendations
- session summaries
- strategic changes

## Existing Foundation

The inventory identifies:

- memory engine
- memory history engine
- memory insight engine
- persistent memory engine
- memory storage adapter
- Atlas Brain memory pipeline
- session persistence engine
- memory presentation components

## Preliminary Status

**Partially Complete**

AtlasHub has several memory-related systems.

## Risks

- Multiple memory stores may exist.
- Storage and interpretation responsibilities may be mixed.
- Old memory may influence recommendations indefinitely.
- Memory importance, expiration, and replacement rules may be unclear.
- The player may lack visibility into what Atlas remembers.

## Required Direction

Define one canonical memory record contract with:

- identifier
- memory type
- subject
- value
- source
- confidence
- importance
- created date
- last reinforced date
- expiration policy
- visibility
- related entities

Memory storage should remain separate from memory interpretation.

---

# 4. Context

## Responsibility

Context determines what matters right now.

Context should combine:

- current route
- current session
- recent actions
- active objective
- player state
- world state
- relevant entities
- available time
- current resources
- known constraints

## Existing Foundation

The inventory identifies:

- route context engine
- route context types
- decision context engine
- situation analysis engine
- situation briefing engine
- session engine
- session reasoning engine
- session persistence engine
- brain snapshot engine
- brain change detection engine

## Preliminary Status

**Partially Complete**

Several context-producing systems exist.

## Risks

- Context assembly may be duplicated.
- Route context may influence logic differently across features.
- Snapshot, session, and decision context may use competing contracts.
- Context may be assembled inside hooks or UI orchestration.

## Required Direction

Create one canonical `AtlasDecisionContext`.

It should be assembled before recommendation generation and reused by every downstream stage.

---

# 5. Intent

## Responsibility

Intent Intelligence should determine what the player is trying to accomplish.

Intent examples include:

- find an entity
- compare options
- choose the next mission
- increase income
- improve a loadout
- buy a vehicle
- plan a session
- understand a recommendation
- locate an opportunity
- review recent progress

## Existing Foundation

The inventory identifies:

- intent engine
- intent matcher
- intent router
- intent types
- Copilot actions engine
- route context engine
- search infrastructure

## Preliminary Status

**Structural Foundation**

Intent has a dedicated module family.

## Risks

- Search, Copilot, and command interfaces may classify intent separately.
- Intent matching may rely on presentation-specific input.
- Intent names and result contracts may not be shared.
- Entity resolution may occur after different stages in different features.

## Required Direction

Use one canonical intent contract across:

- Atlas Search
- Copilot
- Command Palette
- Quick Actions
- Planner entry points

Intent resolution should produce:

- intent type
- extracted entities
- constraints
- requested output
- confidence
- unresolved terms

---

# 6. Situation Analysis

## Responsibility

Situation Analysis should convert context into a clear assessment of the player’s current strategic condition.

It should identify:

- opportunities
- blockers
- risks
- resource gaps
- progression gaps
- recent changes
- urgent decisions
- active strategic themes

## Existing Foundation

The inventory identifies:

- situation analysis engine
- situation briefing engine
- dashboard priority engine
- opportunity engine
- economy engine
- empire engine
- brain snapshot engine
- brain change detection engine

## Preliminary Status

**Partially Complete**

The project contains several systems capable of situation assessment.

## Risks

- Dashboard priorities may be calculated separately from recommendations.
- Opportunity detection may not use the canonical player context.
- Briefing and snapshot systems may duplicate summarization.
- Change detection may not consistently affect decision priority.

## Required Direction

Situation Analysis should produce a reusable assessment consumed by:

- Dashboard briefing
- Copilot context
- Planner strategy
- recommendation generation
- session objectives

---

# 7. Recommendation Candidate Generation

## Responsibility

Candidate generation should identify all reasonable actions before one action is selected.

Candidates may include:

- missions
- purchases
- businesses
- properties
- vehicles
- weapons
- exploration opportunities
- profile updates
- strategic delays
- resource-building actions

## Existing Foundation

The inventory identifies:

- recommendation candidate engine
- recommendation engine
- adaptive recommendation engine
- advisor service
- domain recommendation engines
- opportunity engine
- mission ranking engine
- property recommendation engine
- vehicle recommendation engine
- personal picks engine

## Preliminary Status

**Partially Complete**

AtlasHub has both general and domain-specific recommendation sources.

## Risks

- Domain engines may return incompatible result shapes.
- Candidate generation and final recommendation selection may be mixed.
- Some recommendations may bypass the Atlas Brain.
- Candidate duplication may occur across engines.
- Candidate provenance may be lost before reasoning.

## Required Direction

All domain engines should return a shared candidate contract.

Suggested candidate fields:

- candidate ID
- action type
- target entity
- source engine
- expected benefit
- expected cost
- expected time
- eligibility
- blockers
- risk
- supporting evidence
- source confidence

---

# 8. Scoring and Weighting

## Responsibility

Scoring determines how well each candidate fits the player’s situation.

Potential factors include:

- goal alignment
- progression impact
- affordability
- return on investment
- time efficiency
- mission readiness
- playstyle fit
- risk fit
- urgency
- prerequisite readiness
- information confidence

## Existing Foundation

The inventory identifies:

- scoring engine
- recommendation weighting engine
- match engine
- ranking engine
- ROI engine
- impact engine
- prediction engine
- progression engine
- domain score engines

## Preliminary Status

**Partially Complete**

AtlasHub contains a deep scoring foundation.

## Risks

- Multiple scoring scales may exist.
- Ranking and recommendation scoring may diverge.
- ROI may dominate recommendations without strategic context.
- Confidence in source data may not affect scores.
- Weighting rules may be difficult to explain.

## Required Direction

Define a shared scoring envelope.

Each candidate should carry:

- raw factor scores
- factor weights
- weighted score
- eligibility result
- confidence adjustment
- final rank
- explanation-ready score summary

Scoring should remain inspectable and deterministic where practical.

---

# 9. Decision Selection

## Responsibility

The Decision layer chooses what Atlas recommends from the ranked candidate set.

It should decide:

- primary recommendation
- alternative recommendations
- deferred actions
- rejected actions
- next action
- escalation or clarification needs

## Existing Foundation

The inventory identifies:

- Atlas decision engine
- Atlas decision context engine
- Atlas decision service
- Atlas decision orchestrator
- Atlas decision pipeline service
- Atlas Brain decision pipeline service
- recommendation pipeline
- strategic command engine
- next-action engine

## Preliminary Status

**Needs Consolidation**

This is the most significant intelligence consolidation target identified by the structural inventory.

## Risks

- More than one canonical decision entry point may exist.
- The Brain pipeline and general decision pipeline may overlap.
- Next-action logic may run independently of decision selection.
- Services and engines may both orchestrate the same lifecycle.
- Feature-specific callers may bypass the intended pipeline.

## Required Direction

Designate one public decision entry point.

Recommended ownership:

`Atlas Brain Decision Pipeline`

All Dashboard, Copilot, Search, Planner, and Advisor recommendations should eventually enter through this pipeline.

Other decision modules may remain internal stages, adapters, or migration targets.

No module should be removed until imports and runtime consumers are verified.

---

# 10. Reasoning

## Responsibility

Reasoning should explain why Atlas selected a recommendation.

A complete reasoning response should communicate:

- objective
- relevant player context
- supporting factors
- benefits
- tradeoffs
- blockers
- assumptions
- alternatives
- expected impact
- why this option ranked above others

## Existing Foundation

The inventory identifies:

- reasoning engine
- session reasoning engine
- Atlas reasoning components
- recommendation analysis components
- strategy report engine
- strategy feedback engine
- impact engine
- ROI engine

## Preliminary Status

**Partially Complete**

Reasoning exists at both engine and presentation levels.

## Risks

- Reasoning may be generated separately from scoring.
- Presentation components may reconstruct explanations.
- Tradeoffs may be missing from positive recommendations.
- Unknown data may be converted into confident prose.
- Different features may use different explanation depth.

## Required Direction

Reasoning should be generated from decision evidence, not recreated by UI components.

The reasoning contract should include:

- summary
- supporting reasons
- benefits
- tradeoffs
- assumptions
- blockers
- alternatives considered
- evidence references

---

# 11. Confidence

## Responsibility

Confidence communicates how strongly Atlas supports its conclusion.

Confidence should reflect:

- source reliability
- data completeness
- player-state completeness
- candidate separation
- prediction uncertainty
- unresolved assumptions
- verification status

## Existing Foundation

The inventory identifies:

- confidence presentation
- recommendation weighting
- identity confidence
- likely confidence fields in intelligence outputs

## Preliminary Status

**Structural Foundation**

The inventory confirms confidence presentation but does not establish one universal confidence calculation.

## Risks

- Confidence may be hardcoded or presentation-derived.
- Different engines may use different scales.
- Confidence may describe recommendation fit rather than factual certainty.
- Unverified GTA VI content may appear more certain than warranted.

## Required Direction

Separate:

### Data Confidence

How reliable the underlying information is.

### Recommendation Confidence

How strongly the recommendation fits the current player context.

Both should use one documented scale and should never be silently combined.

---

# 12. Recommendation Contract

## Responsibility

Every significant Atlas recommendation should use one shared output contract.

## Required Contract

A canonical recommendation should include:

- recommendation ID
- title
- summary
- action type
- target entity
- reasoning
- benefits
- tradeoffs
- confidence
- data confidence
- estimated cost
- estimated time
- expected impact
- prerequisites
- blockers
- alternatives
- next action
- source engines
- related entities
- created date
- expiration or refresh rule

## Existing Foundation

The inventory identifies:

- recommendation types across multiple modules
- recommendation cards
- recommendation analysis cards
- next-action components
- reasoning components
- confidence components

## Preliminary Status

**Needs Consolidation**

## Required Direction

Introduce one canonical recommendation type before broad intelligence expansion.

Feature-specific view models may adapt that contract, but they should not redefine the meaning of a recommendation.

---

# 13. Planning and Forecasting

## Responsibility

Planning converts recommendations into an ordered strategy.

Forecasting estimates likely future outcomes.

Planning should include:

- ordered steps
- prerequisites
- costs
- time estimates
- expected impact
- optional paths
- blockers
- checkpoints
- plan status

Forecasting should include:

- expected trajectory
- assumptions
- uncertainty
- best-case outcome
- likely outcome
- downside outcome
- time horizon

## Existing Foundation

The inventory identifies:

- planning engine
- strategic roadmap engine
- strategic command engine
- forecast engine
- timeline engine
- reactive timeline engine
- empire simulator
- prediction engine
- daily objectives engine
- session planning components

## Preliminary Status

**Partially Complete**

## Risks

- Planner recommendations may be generated separately from Dashboard recommendations.
- Forecasts may not expose assumptions.
- Timeline and reactive timeline responsibilities may overlap.
- Simulator outputs may not use the canonical recommendation contract.
- Daily objectives may bypass long-term strategy.

## Required Direction

The Planner should consume canonical recommendations and transform them into a plan.

It should not independently recreate recommendation logic.

---

# 14. Execution and Outcomes

## Responsibility

Execution tracks whether the player followed a recommendation.

Outcome Intelligence evaluates what happened afterward.

It should record:

- recommendation accepted or ignored
- action started
- action completed
- result
- cost
- time spent
- reward
- unexpected consequence
- player feedback
- strategic impact

## Existing Foundation

The inventory identifies:

- action tracker engine
- mission execution engine
- mission outcome engine
- outcome engine
- outcome validation engine
- mission feedback engine
- impact engine
- session event bus
- outcome report components

## Preliminary Status

**Partially Complete**

## Risks

- Mission outcomes may use a separate lifecycle from general recommendations.
- Outcome validation may not update the original recommendation.
- Action tracking may not persist across sessions.
- Player feedback may not influence future weights.

## Required Direction

Every recommendation should have a traceable lifecycle:

Recommended

↓

Viewed

↓

Accepted or Dismissed

↓

Started

↓

Completed or Abandoned

↓

Outcome Recorded

↓

Learning Applied

---

# 15. Learning and Strategy Evolution

## Responsibility

Learning should improve Atlas over time without making behavior unpredictable or opaque.

It should learn from:

- accepted recommendations
- ignored recommendations
- completed actions
- outcomes
- repeated preferences
- strategy success
- strategy failure
- explicit player feedback

## Existing Foundation

The inventory identifies:

- learning engine
- adaptive strategy engine
- strategy evolution engine
- mission learning engine
- mission learning update engine
- behavioral intelligence engine
- strategy feedback engine
- decision history engine

## Preliminary Status

**Partially Complete**

## Risks

- Learning responsibilities may be spread across domain and general engines.
- Changes may not be explainable.
- Learned behavior may override explicit preferences.
- Feedback may update multiple systems inconsistently.
- Historic decisions may be retained without relevance decay.

## Required Direction

Learning should propose bounded updates to:

- preference weights
- strategy weights
- behavior observations
- confidence
- candidate priorities

Explicit player settings should remain authoritative.

Learned changes should be inspectable and reversible.

---

# 16. Persistence

## Responsibility

Persistence should retain only the state needed across sessions.

Persistent categories may include:

- player profile
- onboarding identity
- ownership
- progression
- goals
- active plans
- selected preferences
- memory
- decision history
- tracked recommendations
- learning state

## Existing Foundation

The inventory identifies:

- persistent memory engine
- memory storage adapter
- session persistence engine
- profile persistence
- onboarding persistence
- Zustand state management

## Preliminary Status

**Partially Complete**

## Risks

- Browser-local persistence may be distributed across modules.
- State keys and versions may not be centrally managed.
- Schema changes may invalidate previous player data.
- Session state and durable state may be mixed.
- Cross-device persistence is not established by the inventory.

## Required Direction

Create a versioned persistence contract with:

- centralized storage keys
- schema version
- migration functions
- validation
- safe defaults
- corruption recovery
- reset controls
- explicit temporary versus durable state

---

# 17. Presentation Consumers

## Canonical Consumers

The following experiences should consume the same intelligence outputs:

- Dashboard
- Atlas Copilot
- Atlas Search
- Planner
- Advisor
- Entity detail pages
- Map and Explorer
- Mission Control

## Existing Foundation

Each of these experiences has dedicated routes, components, hooks, or services.

## Preliminary Status

**Needs Verification**

## Risks

- Consumers may call different recommendation services.
- View-specific hooks may calculate logic independently.
- Recommendations may disagree between pages.
- Confidence and reasoning may be presented inconsistently.
- Entity pages may use domain-only intelligence without Atlas Brain context.

## Required Direction

Each consumer should request intelligence through a shared public service.

Presentation-specific adaptation should occur after the canonical recommendation is created.

---

# Canonical Ownership Proposal

The following ownership model should guide future verification.

| Capability | Proposed Canonical Owner |
|---|---|
| Player state | Shared Atlas player-state contract |
| Declared identity | Player identity engine |
| Observed behavior | Behavioral intelligence engine |
| Persistent memory | Persistent memory engine |
| Context assembly | Decision context engine |
| Intent | Atlas intent system |
| Situation analysis | Situation analysis engine |
| Candidate generation | Recommendation candidate engine plus domain adapters |
| Scoring | Recommendation weighting engine |
| Decision orchestration | Atlas Brain decision pipeline |
| Reasoning | Reasoning engine |
| Next action | Next-action engine as a decision-pipeline stage |
| Planning | Planning engine |
| Forecasting | Forecast engine |
| Execution tracking | Action tracker engine |
| Outcomes | Outcome engine |
| Learning | Learning engine with domain adapters |
| Persistence | Versioned persistence layer |
| Presentation | Feature components and view models |

This is a proposed target based on structural evidence.

Actual imports and runtime consumers must be verified before final canonical designation.

---

# Primary Consolidation Targets

## Decision Pipelines

Potential overlap exists among:

- Atlas decision engine
- Atlas decision service
- Atlas decision orchestrator service
- Atlas decision pipeline service
- Atlas Brain decision pipeline service
- Brain recommendation pipeline
- recommendation engine
- next-action engine

## Memory

Potential overlap exists among:

- memory engine
- memory history engine
- memory insight engine
- persistent memory engine
- Brain memory pipeline
- session persistence

## Strategy

Potential overlap exists among:

- adaptive strategy engine
- strategy evolution engine
- strategy feedback engine
- strategy report engine
- strategic command engine
- strategic roadmap engine

## Mission Intelligence

Potential overlap exists among:

- mission strategy
- mission ranking
- mission loadout
- mission impact
- mission learning
- mission outcome
- mission feedback
- Brain mission pipeline

## Timeline and Forecasting

Potential overlap exists among:

- timeline engine
- reactive timeline engine
- intelligence timeline engine
- forecast engine
- prediction engine
- empire simulator
- Brain projection pipeline

## Dashboard Intelligence

Potential overlap exists among:

- dashboard intelligence engine
- dashboard composer
- dashboard presenter
- dashboard priority engine
- Atlas Brain snapshot
- Atlas Brain Copilot
- situation briefing
- general briefing engine

These are audit targets, not automatic deletion candidates.

---

# GTA VI Intelligence Requirements

Atlas Intelligence must distinguish among:

- confirmed official GTA VI information
- strongly supported information
- inferred information
- speculative information
- placeholder or internal development data
- GTA V legacy data

Every GTA VI entity should support verification metadata.

Suggested verification fields:

- verification status
- source category
- source reference
- date verified
- confidence
- spoiler level
- legacy status

Recommendation confidence must never exceed the confidence supported by its underlying data.

---

# Intelligence Implementation Priorities

## Priority 1 — Shared Contracts

1. Canonical player state
2. Canonical decision context
3. Canonical candidate contract
4. Canonical recommendation contract
5. Canonical confidence model
6. Canonical outcome contract

## Priority 2 — Pipeline Convergence

1. Verify all decision entry points
2. Select the canonical Atlas Brain service
3. Route Dashboard through it
4. Route Copilot through it
5. Route Planner through it
6. Route Search through it
7. Route Advisor through it

## Priority 3 — Memory and Learning

1. Consolidate memory responsibilities
2. Version persistence
3. Define decision history
4. Define outcome updates
5. Define bounded learning rules
6. Add player visibility and reset controls

## Priority 4 — Knowledge Integration

1. Stable entity IDs
2. Canonical relationships
3. Character entities
4. Location and region entities
5. Search retrieval
6. Planner graph traversal
7. Copilot entity grounding

## Priority 5 — GTA VI Trust Layer

1. Verification metadata
2. Unknown-state handling
3. Source confidence
4. Spoiler controls
5. Legacy data isolation

---

# Success Criteria

Atlas Intelligence reaches architectural maturity when:

- all recommendation consumers use one public pipeline
- one player-state contract is shared across the product
- one recommendation contract is used across domains
- every recommendation includes reasoning and tradeoffs
- data confidence and recommendation confidence are distinct
- unknown information remains visibly unknown
- candidate scores are explainable
- player actions connect to outcomes
- outcomes connect to learning
- memory is versioned and transparent
- GTA VI verification status affects intelligence output
- presentation components contain no hidden decision logic

---

# Intelligence Audit Conclusions

AtlasHub already has the structural components of a sophisticated decision system.

The project does not need additional independent intelligence engines until existing responsibilities are verified and consolidated.

The most important intelligence actions are:

1. Establish a canonical player-state contract.
2. Establish a canonical recommendation contract.
3. Select one public Atlas Brain decision pipeline.
4. Convert domain engines into candidate providers or pipeline stages.
5. Generate reasoning from scoring evidence.
6. Separate data confidence from recommendation confidence.
7. Connect recommendations to execution, outcomes, memory, and learning.
8. Ensure Dashboard, Copilot, Search, Planner, and Advisor share the same intelligence.
9. Add verification-aware handling for GTA VI content.
10. Preserve legacy engines until runtime consumers and migration paths are known.

AtlasHub should feel like one intelligence system expressed through multiple experiences.

It should not behave like multiple independent recommendation tools sharing the same visual brand.

---

# Next Audit

The next document is:

`04 - UI Audit.md`

The UI Audit will determine:

- which design system is canonical
- which layout system is canonical
- which component generations overlap
- whether the Dashboard matches the GTA VI command-center vision
- whether hierarchy, responsiveness, accessibility, and states meet launch expectations
- which visual systems should be preserved, merged, migrated, or retired
