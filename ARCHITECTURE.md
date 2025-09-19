# Architecture

This curriculum browser is a student-built project. It’s not official university software, and it’s not funded by anyone. The goal is simple: make exploring and planning courses less painful, and in the process, build something useful and fun to work on.

Since this is a project with limited time and resources, the design choices lean toward being lightweight, maintainable, and easy to extend.

## Stack

### Frontend

- **React** – UI library
- **React Router Dom** – client-side navigation
- **TailwindCSS** – styling and components
- **ReactFlow** – visualizing prerequisite and unlock graphs
- **Dnd Kit** – drag-and-drop interactions in the planner
- **React Big Calendar** – timetable visualization
- **Zustand** – state management
- **React Hot Toast & React Icons** – notifications and icons

### Backend

- **Node.js** – Server runtime

### Dev Tools

- **Vite** – fast bundling and development server
- **ESLint + Prettier** – code quality and formatting
- **Vitest + Testing Library** – testing components and hooks

## Project Structure

```text
scripts/                 # scrapers and data transformation scripts
src/
├── assets/              # Static assets like images, icons, etc.
├── data/                # JSON course data used by the app
├── features/            # Core features
│   ├── courseTree/      # Course prerequisite/unlock graphs
│   ├── forwardplanner/  # Planner showing future course unlocks
│   ├── futureFeatures/  # Experimental features
│   ├── search/          # Course search functionality
│   └── timetable/       # Timetable and calendar view
├── hooks/               # Custom hooks for state and logic
└── pages/               # App pages and routes
```

Each feature (e.g., search, planner) is modular, with its own state and UI components where possible. Hooks are used heavily to separate logic from presentation, which makes components simpler and easier to test.

### Frontend

Everything runs client-side, this means the site can be served as static files with no dedicated server, which keeps hosting simple and cheap.

The planner uses React Flow and Dnd Kit for interactivity, while course browsing relies on hooks for search and filtering. Styling is kept consistent with Tailwind, ensuring a modern, responsive layout without much custom CSS.

### Backend / Server Runtime

While our app is mostly client-side, Node.js is used as the server runtime. This allows us to:

- Run scraping cron jobs on the university website
- Transform and update the course data
- Run custom scripts for timetable exports or other utilities

Using Node.js keeps these tasks lightweight and avoids the need for a full backend server.

### Data

Right now, course data is stored as JSON files bundled with the app. This data is scraped from the university’s official course listings and processed using custom scripts. This keeps the architecture simple and avoids the overhead of running a backend, which is unnecessary for the scope of this project.
