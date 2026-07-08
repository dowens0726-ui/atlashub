# AtlasHub Master Roadmap

## Current Status

Current milestone: Milestone 5.5 — Architecture Cleanup  
Last completed milestone: Milestone 5 — Empire Simulator Phase 1  
Build status: Passing  
Alpha progress: 97%

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

---

## Current Milestone

### Milestone 5.5 — Architecture Cleanup

Goal:
Clean up the project architecture before adding more AI systems.

Focus areas:
- AI engine organization
- Component organization
- Shared type consistency
- Barrel exports
- Duplicate logic
- Naming consistency
- Documentation
- Technical debt review

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

Review during Milestone 5.5:
- Ensure intelligence exports are not duplicated
- Confirm recommendation types are centralized
- Confirm simulator logic does not assume missing business objects
- Confirm dashboard orchestration remains readable
- Consider moving dashboard AI assembly into a single hook or service later
- Review component naming consistency
- Confirm no circular imports in intelligence engines

---

## Build Commands

Development:

```bash
npm run dev