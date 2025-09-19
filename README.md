# Curriculum Browser - VUWPlanIt

VUWPlanIt is a web app that makes exploring and planning university courses a whole lot easier. Instead of wrestling with static spreadsheets or digging through scattered course pages, you can search, check prerequisites, and plan your degree in one place.

## Features

- **Browse Offered Courses** – Find courses by name, code, or keyword.
- **Course details** – Quickly check course coordinators, lecture days, and timings without hunting through multiple sites.
- **Prereqs and unlocks** – See what you need before you can take a course, and what doors it opens for the future.
- **Year Planner** – Drag and drop courses into a tri-by-tri view to map out your degree.
- **Timetable Builder** - Plan and build your trimester timetable ahead of time
- **Forward Planner** – Select the courses you've taken, and view the courses you've unlocked
- **Explore Course Tree** - Explore the whole ECS course tree

## Tech stack

- React with Vite
- TailwindCSS for styling
- React Router for navigation
- React Flow and DnD Kit for visualizations and drag-and-drop interactions

## Getting started

To run this project locally, clone the repo and install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Project structure

```bash
src/
│   App.jsx        # Main app wrapper
│   main.jsx       # Entry point
│   index.css      # Global styles
│
├── features/      # Search, year planner, timetable, forward planner
├── hooks/         # Custom hooks
├── pages/         # Reusable UI components
├── assets/        # Static assets
```

For a detailed explanation of the code structure and design decisions, see ARCHITECTURE.md

## Contributing

Contributions are welcome. Open an issue or submit a pull request if you’d like to improve the project.

## License

MIT License
