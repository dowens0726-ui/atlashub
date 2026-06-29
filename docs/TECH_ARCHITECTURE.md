# Atlas Technical Architecture

## Philosophy

Atlas is built around reusable systems.

We never build one-off pages.

Every feature should be reusable across multiple games.

---

# Architecture

Data
↓

Types
↓

Components
↓

Pages

---

# Project Structure

app/
components/
data/
types/
lib/
public/
docs/

---

# Data Flow

Data File

↓

Component

↓

Page

↓

Search Index

---

# Rules

No duplicated data.

No duplicated UI.

No duplicated business logic.

If something is reused twice,
it probably deserves its own component.

---

# Goal

Every new game should plug into Atlas
without changing the underlying architecture.