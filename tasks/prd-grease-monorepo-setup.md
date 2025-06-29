# PRD: Grease Monorepo Setup

## Introduction/Overview

This PRD outlines the setup of a monorepo named "grease" that will house shared library packages and individual userscript packages. The monorepo will use Nx for comprehensive tooling with caching and code generation capabilities, providing a scalable foundation for JavaScript/TypeScript development with standardized workflows across all packages.

## Goals

1. Establish a well-structured monorepo using Nx that can efficiently manage shared libraries and userscript packages
2. Implement comprehensive development workflows including build, test, linting, formatting, type checking, code generation, and documentation generation
3. Create a sample application and shared library to demonstrate monorepo patterns and best practices
4. Ensure consistent development experience across all packages in the workspace
5. Provide a foundation that can scale to accommodate future packages and complex interdependencies

## User Stories

1. **As a developer**, I want to create new userscript packages quickly using standardized templates so that I can focus on functionality rather than setup.

2. **As a developer**, I want to share common utilities across multiple userscripts through shared library packages so that I can maintain DRY principles and consistency.

3. **As a developer**, I want automated code quality checks (linting, formatting, type checking) so that all code in the monorepo maintains consistent standards.

4. **As a developer**, I want to run tests across all packages or specific packages so that I can ensure changes don't break existing functionality.

5. **As a maintainer**, I want automatic documentation generation so that all packages have up-to-date documentation without manual maintenance overhead.

6. **As a team member**, I want to understand the relationships between packages so that I can make informed decisions about code changes and dependencies.

## Functional Requirements

1. **Nx Workspace Setup**: The system must initialize an Nx workspace with proper configuration for TypeScript/JavaScript development.

2. **Package Structure**: The system must create a standardized directory structure with separate areas for shared libraries (`libs/`) and userscript applications (`apps/`).

3. **Sample Packages**: The system must generate:
   - One sample shared library package with common utilities
   - One shared library package providing a Tailwind CSS configuration that can be used by one or all userscript apps
   - One shared library package providing common Vue code (components, composables, utilities)
   - One sample userscript package named "example-plain-userscript" that demonstrates usage of the shared common library
   - One sample userscript package named "example-vue-userscript" that demonstrates usage of the monorepo's shared common library and its Vue shared library
   - One sample userscript package named "example-tailwind-userscript" that demonstrates usage of the monorepo's shared common library and its Tailwind library
   - One sample userscript package named "example-vue-tailwind-userscript" that demonstrates usage of the monorepo's shared common library, its Vue library, and its Tailwind library

4. **Build System**: The system must provide build capabilities for all packages with:
   - TypeScript compilation
   - Bundle generation for userscripts using Vite and vite-userscript-plugin
   - Dependency resolution and optimization

5. **Testing Framework**: The system must include a testing setup that supports:
   - Unit testing with a modern testing framework (Jest/Vitest)
   - Test coverage reporting
   - Ability to run tests for individual packages or the entire workspace

6. **Code Quality Tools**: The system must integrate:
   - ESLint for code linting with shared configuration
   - Prettier for code formatting with workspace-wide rules
   - TypeScript for type checking across all packages

7. **Code Generation**: The system must provide Nx generators for:
   - Creating new shared library packages
   - Creating new userscript packages
   - Scaffolding common components and utilities

8. **Documentation Generation**: The system must automatically generate:
   - API documentation from TypeScript interfaces and JSDoc comments
   - Package dependency graphs
   - Development setup and usage guides

9. **Development Scripts**: The system must provide npm/pnpm scripts for:
   - Building all packages or specific packages
   - Running tests with various scopes
   - Linting and formatting code
   - Generating documentation
   - Type checking

10. **Workspace Configuration**: The system must configure:
    - Shared TypeScript configuration with appropriate compiler options
    - Shared ESLint and Prettier configurations
    - Package.json workspaces integration (handled by Nx)

11. **IDE Integration**: The system must provide IDE configuration for:
    - JetBrains IDEs (PHPStorm and WebStorm) with appropriate project structure recognition
    - VS Code with recommended extensions and workspace settings
    - Shared code formatting and linting settings that work consistently across both IDE families

## Non-Goals (Out of Scope)

1. **CI/CD Pipeline Configuration**: Continuous integration and deployment setup will be addressed in a future phase.

2. **Package Publishing**: Automated publishing to npm or other registries is not included in this initial setup.

3. **Advanced Nx Features**: Cloud caching, distributed task execution, and other enterprise Nx features are not required for the initial setup.

4. **Additional Userscript Frameworks**: Beyond Vite and vite-userscript-plugin for build tooling, the setup won't include other specific userscript libraries or frameworks.

5. **Database Integration**: No database setup or ORM configuration is required.

6. **Authentication/Authorization**: No user management or security features are needed.

## Design Considerations

1. **Directory Structure**: Follow Nx conventions with `apps/` for userscript packages and `libs/` for shared libraries.

2. **Naming Conventions**: Use kebab-case for package names and follow consistent naming patterns across the workspace.

3. **Configuration Sharing**: Leverage Nx's configuration inheritance to minimize duplication across packages.

4. **Development Experience**: Ensure that common development tasks can be performed with simple, memorable commands.

## Technical Considerations

1. **Node.js Environment**: Must integrate with the existing Nix flake setup that provides Node.js 20 and pnpm.

2. **Package Manager**: Use Nx's built-in package management rather than pnpm workspaces to leverage Nx's dependency graph and caching capabilities.

3. **TypeScript Configuration**: Implement a base tsconfig that can be extended by individual packages with package-specific needs.

4. **Build Targets**: Configure appropriate build targets for userscripts (bundled for browser execution using Vite and vite-userscript-plugin) vs. shared libraries (for consumption by other packages).

5. **Tool Integration**: Ensure all tools (ESLint, Prettier, TypeScript) work seamlessly with popular editors and IDEs.

## Success Metrics

1. **Setup Time**: A new developer should be able to clone the repository and have a working development environment within 5 minutes.

2. **Package Creation**: Creating a new userscript or shared library package should take less than 2 minutes using provided generators.

3. **Build Performance**: Full workspace builds should complete in under 2 minutes for the initial setup with sample packages.

4. **Code Quality**: All generated code should pass linting, formatting, and type checking without manual intervention.

5. **Documentation Coverage**: 100% of public APIs in shared libraries should have generated documentation.

## Open Questions

1. **Userscript Build Targets**: What specific browser environments and userscript managers should be supported in the build configuration? Userscript apps should aim to be cross-browser compatible but must work best for Chrome first and Safari second.

2. **Shared Library Scope**: What types of utilities are most commonly needed across userscripts to inform the sample shared library content?

3. **Testing Strategy**: Should the setup include integration testing capabilities for testing userscripts in browser-like environments?

4. **Version Management**: How should version management work across packages - independent versioning or unified versioning?

5. **Editor Integration**: IDE/editor configurations should include JetBrains IDEs (PHPStorm and WebStorm) and VS Code with appropriate extensions, workspace settings, and consistent formatting/linting integration.