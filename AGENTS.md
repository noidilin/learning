# AGENTS.md - Development Guidelines

This is a repo that contains all kind of projects that I've done along my learning journey. I use this repo to experiment git command, and also try to mimic the real production pipeline earlier. Currently, projects are separated by their language/framework, and simple projects will be group into 'basic' directory. Each project will their key learning point summarized in the README.md file.

The project will be developed in other directory. When the project has done, I will use git to bring the commit history and files to this repo.

```nu
git checkout -b project/topic refs/heads/main --no-track
git subtree add --prefix=destination/ /path/to/repo main
```

Then I will open a PR for that repo. The description of that PR will be the content of the README file.

All the feature branch should be rebase on the latest main branch, before they open a PR.

## Build/Test/Lint Commands

It won't be build to an actual application for now. I will try to maintain the folder structure in a way that I might be able to deploy all the project with docker compose, which is a topic I am looking forward to dig into.

## Code Style Guidelines

### For React, Next

- **Imports**: Sorted by linter.
- **Formatting**: Handled by formatter
- **Components**: PascalCase for React components, camelCase for functions/variables
- **Files**: kebab-case for directories and files
- **Types**: Use TypeScript interfaces/types, prefer `type` for unions and primitives
- **Error handling**: Always throw descriptive Error objects, log errors before throwing
- **Functions**: Prefer named exports, use async/await over Promises
- **State**: Use functional updates for setState, prefer custom hooks for complex logic

## Prefer Tech Stack

- React + Vite or Next.js (App Router)
- Type Safety: TypeScript (with strict type checking), zod
- linter + formatter: biome
- styling: tailwind
- UI components: shadcn/ui

