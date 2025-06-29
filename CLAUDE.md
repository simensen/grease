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
- Use `pnpm nx` or `pnpx nx` for workspace management and monorepo operations (do not install nx globally)
- When initializing an Nx workspace, use non-interactive mode and specify pnpm as the package manager: `pnpx create-nx-workspace@latest --packageManager=pnpm --preset=<preset> --interactive=false --ci=skip`

## Development Workflow

Since this is an empty project, the typical development workflow will depend on what type of Node.js project gets created:
- Use `pnpm` as the package manager for dependency installation
- The Nix flake ensures consistent Node.js 20 environment across different systems
- direnv integration automatically loads the development environment

## Nx Library Generation

When generating new libraries with Nx generators, if you encounter import path conflicts (e.g., "You already have a library using the import path"), it means the TypeScript paths are already configured in `tsconfig.base.json` but the actual library files don't exist. In this case:

1. Create the directory structure manually: `mkdir -p libs/{library-name}/src`
2. Create the library files manually instead of using the generator:
   - `project.json` - Nx project configuration with build/test/lint targets
   - `package.json` - Package metadata with @grease/{library-name}
   - `tsconfig.json` - Main TypeScript config extending base
   - `tsconfig.lib.json` - Library-specific TypeScript config  
   - `tsconfig.spec.json` - Test-specific TypeScript config
   - `vite.config.ts` - Vite configuration for testing with Vitest
   - `src/index.ts` - Main library entry point
   - `src/lib/{library-name}.ts` - Library implementation

3. Verify the library is recognized: `pnpx nx show projects`

This approach is needed when the workspace has pre-configured TypeScript paths but the physical library structure doesn't exist yet.