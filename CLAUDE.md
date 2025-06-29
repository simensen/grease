# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Environment

This repository uses Nix flakes for development environment management. The development environment includes:
- Node.js 20
- pnpm package manager

### Setup Commands

```bash
# Enter the development environment (if using direnv)
# Environment will be automatically loaded when entering the directory

# Or manually enter the nix shell
nix develop

# Check environment versions
node --version
pnpm --version
```

## Repository Status

This is a fresh Node.js project repository with only the Nix development environment configured. No application code, build scripts, or project structure has been established yet.

## Code Quality

Always respect .editorconfig settings when they exist in the project for consistent formatting across editors and contributors.

## Package Management

- Use `pnpm` for all package management operations instead of `npm`
- Use `pnpx` instead of `npx` for running packages
- Use `pnpm nx` instead of `pnpx nx` for workspace management and monorepo operations (do not install nx globally)
- When initializing an Nx workspace, use non-interactive mode and specify pnpm as the package manager: `pnpx create-nx-workspace@latest --packageManager=pnpm --preset=<preset> --interactive=false --ci=skip`
- When generating a @nx/js:library libraries, use vite for the bundler (`--bundler=vite`) and eslint for the linter (`--linter=eslint`)

## Userscript Naming Convention

When configuring userscripts with vite-userscript-plugin, always specify a `fileName` option using kebab-case:
- Convert userscript names to lowercase
- Replace spaces and non-alphanumeric characters with hyphens (`-`)
- Keep the original userscript name in the header for display purposes

Example:
```typescript
userscript({
  entry: "src/main.ts",
  fileName: "example-plain-userscript", // <- kebab-case filename
  header: {
    name: "Example Plain Userscript", // <- Original name for display
    // ... other header fields
  },
})
```

This ensures generated files follow the pattern: `example-plain-userscript.user.js`

## Userscript Package Generation

When creating new userscript packages, follow these guidelines:

### Directory Structure
- Generate userscript packages under the `userscripts/` directory (not `libs/`)
- Use the same `@nx/js:library` generator used for shared libraries
- Configure with vite bundler and eslint linter

### Generation Command
```bash
pnpm nx generate @nx/js:library <userscript-name> --bundler=vite --linter=eslint --unitTestRunner=vitest --directory=userscripts/<userscript-name>
```

### Example
```bash
pnpm nx generate @nx/js:library example-vue-userscript --bundler=vite --linter=eslint --unitTestRunner=vitest --directory=userscripts/example-vue-userscript
```

### Post-Generation Configuration
After generating a userscript package:
1. Update `vite.config.ts` to use `vite-userscript-plugin` instead of library mode
2. Add `fileName` property with kebab-case naming
3. Configure userscript headers (name, namespace, version, description, etc.)
4. Remove dts plugin (not needed for userscripts)
5. Update `package.json` to add required dependencies
6. Create `src/main.ts` as the userscript entry point

## Development Workflow

This is a TypeScript/JavaScript monorepo for userscript development using Nx workspace management. The typical development workflow includes:

### Common Tasks
- `pnpm nx build <package-name>` - Build a specific package (library or userscript)
- `pnpm nx test <package-name>` - Run tests for a specific package
- `pnpm nx build` - Build all packages in the workspace
- `pnpm nx test` - Run all tests in the workspace

### Shared Libraries (`libs/`)
- **common**: Core utilities for DOM manipulation, storage, and general helpers
- **tailwind-config**: Shared Tailwind CSS configuration and utilities
- **vue-shared**: Vue components, composables, and utilities for userscripts

### Userscript Applications (`userscripts/`)
- Each userscript is a standalone application that can use any combination of shared libraries
- Built with vite-userscript-plugin to generate `.user.js` files for browser userscript managers
- Use `pnpm nx build <userscript-name>` to generate the userscript files in `dist/userscripts/<userscript-name>/`

### Environment
- The Nix flake ensures consistent Node.js 20 environment across different systems
- direnv integration automatically loads the development environment
- Use `pnpm` as the package manager for all operations

