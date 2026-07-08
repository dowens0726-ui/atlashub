# AtlasHub Master Roadmap

## Current Status

Current milestone: Milestone 5.6 — Architecture Review  
Last completed milestone: Milestone 5.5 — Dashboard Intelligence Orchestrator  
Build status: Passing  
Alpha progress: 98%

---

## Product Vision

AtlasHub is an AI-powered GTA VI companion platform that helps players decide what to do next, why it matters, and what the expected outcome will be.

Long-term, AtlasHub should become a reusable Game Intelligence Platform that can support multiple games using the same architecture.

---

## Completed Milestones

### Atlas Alpha v1.0

Completed:
- Dashboard
- Player Profile
- Empire Score
- Planner
- Search
- Businesses
- Missions
- Vehicles
- Weapons
- Explorer
- Rankings

### Atlas Copilot

Completed:
- Greeting Engine
- Briefing Engine
- Recommendation Engine
- Reasoning Engine
- Session Engine
- Session Reasoning Engine
- Impact Engine
- Forecast Engine
- Timeline Engine
- Daily Objectives Engine
- Memory Engine

### Milestone 4 — Atlas Memory

Completed:
- memory.engine.ts
- memory-history.engine.ts
- AtlasMemoryCard.tsx
- AtlasAIPanel integration
- DashboardClient wiring
- Build verification

### Milestone 5 — Empire Simulator Phase 1

Completed:
- empire-simulator.engine.ts
- EmpireSimulatorCard.tsx
- Intelligence exports
- AtlasAIPanel integration
- DashboardClient wiring
- Build verification
- Git checkpoint

### Milestone 5.5 — Dashboard Intelligence Orchestrator

Completed:
- dashboard-intelligence.engine.ts
- Intelligence exports updated
- DashboardClient simplified
- Dashboard AI orchestration centralized
- Build verification
- Git checkpoint

---

## Current Milestone

### Milestone 5.6 — Architecture Review

Goal:
Review AtlasHub architecture before Milestone 6.

Focus areas:
- Dashboard orchestration
- Intelligence engine boundaries
- Shared type consistency
- Service organization
- Component organization
- AI pipeline scalability
- Naming consistency
- Future technical debt risks

Expected output:
- Architecture score
- What should stay
- What should improve
- What can wait until beta
- Recommendations before Milestone 6

Rules:
- Full file replacements only for modified files
- Inspect before coding
- One file at a time
- Build after each change
- Commit after each completed milestone

---

## Next Milestone

### Milestone 6 — Atlas Decision Engine

Goal:
Move Atlas from recommendations into strategic decision support.

Atlas should explain:
- What to do
- Why it matters
- ROI
- Risk
- Opportunity cost
- Alternatives
- Empire score impact
- Timeline impact
- Confidence

Example:
“Buy Downtown Cab Co. because it improves recurring income, unlocks taxi progression, has low risk based on current cash, and increases Empire Score by +12.”

---

## Future Milestones

### Milestone 7 — Atlas Intelligence Graph

Goal:
Connect businesses, vehicles, weapons, missions, collectibles, properties, and progression into one relationship graph.

### Milestone 8 — Empire AI

Goal:
Create long-term planning intelligence.

Examples:
- Fastest path to $1M
- Best solo progression path
- Best investment with current cash
- Best weekly plan
- Best vehicle/business combo

### Milestone 9 — Save Profiles

Goal:
Allow persistent player profiles and saved progression.

### Milestone 10 — Public Beta Readiness

Goal:
Prepare AtlasHub for public launch.

Focus:
- Auth
- Cloud sync
- Mobile polish
- Accessibility
- Performance
- Feedback system
- Analytics
- Legal pages
- Vercel production hardening

---

## Development Workflow

Every milestone follows this process:

1. Architecture review
2. Inspect existing files
3. Plan integration
4. Full file replacement
5. Build verification
6. Visual review
7. Git checkpoint
8. Roadmap update

---

## Current Architecture Flow

Player Profile  
↓  
Dashboard Intelligence Orchestrator  
↓  
Recommendation Engine  
↓  
Reasoning Engine  
↓  
Session Engine  
↓  
Session Reasoning  
↓  
Next Action  
↓  
Impact Engine  
↓  
Forecast Engine  
↓  
Timeline Engine  
↓  
Daily Objectives  
↓  
Atlas Memory  
↓  
Empire Simulator  
↓  
Atlas AI Panel  

---

## Technical Debt Watchlist

Review during Milestone 5.6:
- Ensure intelligence exports are not duplicated
- Confirm recommendation types are centralized
- Confirm simulator logic does not assume missing business objects
- Confirm dashboard orchestration remains readable
- Review component naming consistency
- Confirm no circular imports in intelligence engines
- Consider whether dashboard intelligence should eventually return grouped objects instead of many flat fields
- Consider whether AtlasAIPanel props should be grouped by domain

---

## Build Commands

Development:

```bash
npm run dev