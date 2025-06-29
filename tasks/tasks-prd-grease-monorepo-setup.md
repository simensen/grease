# Task List: Grease Monorepo Setup

Generated from: `tasks/prd-grease-monorepo-setup.md`

## Relevant Files

- `nx.json` - Main Nx workspace configuration file
- `package.json` - Root package.json with workspace dependencies and scripts
- `tsconfig.base.json` - Base TypeScript configuration for the workspace
- `.eslintrc.json` - Root ESLint configuration
- `.prettierrc` - Prettier formatting configuration
- `libs/common/src/index.ts` - Common utilities shared library entry point
- `libs/common/package.json` - Common library package configuration
- `libs/tailwind-config/src/index.ts` - Tailwind CSS shared configuration
- `libs/vue-shared/src/index.ts` - Vue components and composables library
- `apps/example-plain-userscript/src/main.ts` - Plain userscript example
- `apps/example-vue-userscript/src/main.ts` - Vue userscript example
- `apps/example-tailwind-userscript/src/main.ts` - Tailwind userscript example
- `apps/example-vue-tailwind-userscript/src/main.ts` - Vue + Tailwind userscript example
- `tools/generators/userscript/index.ts` - Nx generator for creating userscript packages
- `tools/generators/library/index.ts` - Nx generator for creating shared library packages
- `.vscode/settings.json` - VS Code workspace settings
- `.vscode/extensions.json` - VS Code recommended extensions
- `.idea/` - JetBrains IDE configuration directory

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `pnpm test [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- Use `pnpm nx` or `pnpx nx` commands for workspace operations (e.g., `pnpm nx build`, `pnpm nx test`) - do not install nx globally

## Tasks

- [x] 1.0 Initialize Nx Workspace and Core Configuration
  - [x] 1.1 Initialize Nx workspace with TypeScript preset using pnpx (do not install nx globally)
  - [x] 1.2 Configure root package.json with workspace scripts and dependencies
  - [x] 1.3 Set up base TypeScript configuration (tsconfig.base.json)
  - [x] 1.4 Configure Nx workspace settings (nx.json) with caching and task runners
  - [x] 1.5 Set up shared ESLint configuration with TypeScript rules
  - [x] 1.6 Configure Prettier with workspace-wide formatting rules
  - [x] 1.7 Update .gitignore for Nx workspace patterns

- [ ] 2.0 Set Up Shared Libraries (Common, Tailwind, Vue)
  - [x] 2.1 Generate common utilities library with Nx generator
  - [ ] 2.2 Implement sample utility functions in common library
  - [ ] 2.3 Add unit tests for common library utilities
  - [ ] 2.4 Generate Tailwind CSS configuration library
  - [ ] 2.5 Set up shared Tailwind config with common styles and utilities
  - [ ] 2.6 Generate Vue shared library with components and composables
  - [ ] 2.7 Create sample Vue components and composables
  - [ ] 2.8 Add unit tests for Vue shared library components

- [ ] 3.0 Create Sample Userscript Applications
  - [ ] 3.1 Generate example-plain-userscript app using Nx generator
  - [ ] 3.2 Configure Vite and vite-userscript-plugin for plain userscript
  - [ ] 3.3 Implement plain userscript using common library
  - [ ] 3.4 Generate example-vue-userscript app
  - [ ] 3.5 Configure Vue userscript with common and Vue shared libraries
  - [ ] 3.6 Generate example-tailwind-userscript app
  - [ ] 3.7 Configure Tailwind userscript with common and Tailwind libraries
  - [ ] 3.8 Generate example-vue-tailwind-userscript app
  - [ ] 3.9 Configure full-featured userscript using all shared libraries

- [ ] 4.0 Configure Build System and Development Tools
  - [ ] 4.1 Set up Vite configuration templates for userscript builds
  - [ ] 4.2 Configure build targets in Nx for all packages
  - [ ] 4.3 Set up testing framework (Jest/Vitest) with workspace configuration
  - [ ] 4.4 Configure test coverage reporting
  - [ ] 4.5 Create Nx generators for new userscript packages
  - [ ] 4.6 Create Nx generators for new shared library packages
  - [ ] 4.7 Set up documentation generation with TypeDoc or similar
  - [ ] 4.8 Configure workspace scripts for common development tasks

- [ ] 5.0 Set Up IDE Integration and Documentation
  - [ ] 5.1 Create VS Code workspace settings and recommended extensions
  - [ ] 5.2 Configure JetBrains IDE settings for PHPStorm and WebStorm
  - [ ] 5.3 Set up consistent formatting and linting integration for both IDE families
  - [ ] 5.4 Generate package dependency graphs
  - [ ] 5.5 Create development setup and usage guides
  - [ ] 5.6 Document generator usage and package creation workflows
  - [ ] 5.7 Verify all packages build and test successfully
  - [ ] 5.8 Create README with quick start instructions