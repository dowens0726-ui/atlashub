# AtlasHub Architecture

## Mission
Spend Less Time Searching. More Time Playing.

## Product Direction
AtlasHub is a gaming companion platform starting with GTA VI and expanding into multiple major games.

## Current App Structure
- app/ — Next.js app routes and application code
- app/components/ — React components
- app/components/ui/ — shared design system components
- app/data/ — temporary TypeScript content source
- app/types/ — shared TypeScript models
- app/lib/ — utilities and design helpers
- docs/ — project documentation
- public/ — static assets

## Current Content Strategy
Atlas currently uses TypeScript data files for missions, vehicles, and weapons.

This is intentional for now because it provides:
- type safety
- autocomplete
- simple editing
- fast development

## Future Content Strategy
As content volume grows, Atlas should move toward:
1. validated TypeScript data
2. JSON content files
3. content loader
4. admin dashboard
5. CMS or database if needed

## Design System
Shared UI components live in:

app/components/ui/

Current components:
- Card
- StatCard
- Badge
- Section

Utilities:
- cn()
- design tokens

## Development Rules
- Data first
- UI second
- Never rewrite good code
- Prefer reusable components
- Keep mobile equal to desktop
- Build for scale
- Do not replace working files unless intentional
- Run npm run build before committing

## Launch Strategy
Atlas should be feature-complete before GTA VI launches.

Before launch:
- build the platform
- use placeholder/demo data
- optimize UI and search
- prepare content workflows

At launch:
- replace placeholder data with confirmed GTA VI information
- update missions, vehicles, weapons, map markers, guides, and collectibles quickly