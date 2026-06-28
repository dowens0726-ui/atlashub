# AtlasHub Architecture

## Tech Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Vercel
- GitHub

---

## Current Folder Structure

app/
├── components/
├── missions/
├── types/
├── globals.css
├── layout.tsx
└── page.tsx

---

## Shared Components

- Header
- Footer
- MissionCard
- Badge
- SearchBar

---

## Mission System

Mission data is stored in:

app/missions/data.ts

Mission type is stored in:

app/types/mission.ts

Mission pages use dynamic routes:

app/missions/[slug]/page.tsx

---

## Development Workflow

1. One feature at a time
2. Save
3. Test
4. Commit
5. Push

---

## Coding Principles

- Reusable components
- Shared types
- Small commits
- Keep routes thin
- Move reusable logic into components
- Keep code readable