# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (http://localhost:5173)
pnpm build        # Type-check (vue-tsc) then build to dist/
pnpm preview      # Preview production build locally
```

No test runner is configured. No linter is configured.

## Architecture

This is a Vue 3 + TypeScript + Vite admin dashboard shell. Its purpose is to validate static UI components within a standard admin layout.

### Layout System

The app uses a CSS Grid-based admin layout defined in `src/layouts/AdminLayout.vue`:
- `AppHeader` spans the full top row (60px)
- `AppSidebar` occupies the left column (220px, fixed — no collapse)
- `<RouterView>` fills the remaining content area

`App.vue` is a thin root that just renders `<RouterView />`. All layout is handled by `AdminLayout.vue`, which wraps child routes.

### Routing

Hash-mode router (`createWebHashHistory`). All routes are children of the `/` route which renders `AdminLayout`. To add a new page:
1. Create a view in `src/views/`
2. Add a child route in `src/router/index.ts`
3. Add a menu entry in `AppSidebar.vue` (menu data is hardcoded directly in the component)

### SCSS Architecture

All SCSS variables are defined in `src/styles/_variables.scss` and automatically injected into **every** component's `<style lang="scss">` block via `vite.config.ts` `css.preprocessorOptions.scss.additionalData`. This means all `$variables` are available in component styles without manual imports.

`src/styles/main.scss` (imported once in `main.ts`) handles global styles: reset + variable forwarding for the global scope. `_reset.scss` must explicitly `@use 'variables' as *` since `additionalData` only applies to component scoped styles.

Components use `<style lang="scss" scoped>` with BEM naming.

### `@` Alias

`@` resolves to `src/`. Configured in both `vite.config.ts` (runtime) and `tsconfig.app.json` `paths` (type-checking).
