# Agent Guidelines for Layers Project

## Build/Lint/Test Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production bundle
- `npm run lint` - Run ESLint checks
- No test command configured

## Code Style Guidelines

### Formatting & Linting

- Use Biome for linting and formatting (configured in `biome.json`)
- Single quotes for strings and JSX (`'` not `"`)
- Semicolons only when needed (`asNeeded`)
- Space indentation (not tabs)
- Prettier with Tailwind CSS plugin for sorting classes

### TypeScript & Imports

- Strict TypeScript mode enabled
- Use `@/` path alias for imports (e.g., `@/components/ui/button`)
- Organize imports automatically (Biome config)
- Import types with `type` keyword when needed

### React & Next.js Patterns

- Use function declarations for components (not arrow functions)
- Export components and utilities at bottom of file
- Prefer `type` over `interface` for props
- Use `className` prop with `cn()` utility for conditional classes

### Naming Conventions

- camelCase for variables and functions
- PascalCase for components and types
- kebab-case for file names
- Use descriptive names (e.g., `buttonVariants` not `variants`)

No Cursor or Copilot rules found in this repository.
