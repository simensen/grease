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
- Use `nx` for workspace management and monorepo operations

## Development Workflow

Since this is an empty project, the typical development workflow will depend on what type of Node.js project gets created:
- Use `pnpm` as the package manager for dependency installation
- The Nix flake ensures consistent Node.js 20 environment across different systems
- direnv integration automatically loads the development environment