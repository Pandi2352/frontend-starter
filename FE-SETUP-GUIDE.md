# 🚀 Frontend Setup Guide (Production-Ready)

> Reusable, step-by-step guide to bootstrap a **production-ready React frontend** for any project.
> Stack: **React + TypeScript + Vite + Tailwind CSS v4 + React Router + React Hook Form + Zod + Axios + Day.js + Lucide React**.
> Package manager: **npm only**. Always install the **latest stable versions**.

---

## Step 0 — Prerequisites

- Node.js **>= 20** (`node -v`)
- npm **>= 10** (`npm -v`)

---

## Step 1 — Create the Project

```bash
# In a new empty folder (or pass a project name instead of ".")
npm create vite@latest . -- --template react-ts
npm install
```

---

## Step 2 — Install Dependencies (latest stable)

```bash
# Runtime
npm install tailwindcss @tailwindcss/vite react-router-dom react-hook-form zod @hookform/resolvers axios dayjs lucide-react recharts @fontsource-variable/inter

# Dev tooling
npm install -D prettier eslint-config-prettier eslint-plugin-simple-import-sort

# Bring everything to the latest stable versions
npx npm-check-updates -u && npm install
```

> Commit `package-lock.json`. Never delete it to "fix" issues.

**⚠️ TypeScript version:** keep `typescript` on `~6.0.x` for now. TypeScript 7 (the Go-based compiler) builds fine, but `typescript-eslint` refuses to run with TS 7.0 (`>=4.8.4 <6.1.0` peer range; TS ≥7.1 support is tracked in [typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940)). Upgrade to TS 7 only once typescript-eslint supports it — verify with `npm run lint` after any TS bump.

---

## Step 3 — package.json

Add the Node engine and the standard scripts:

```json
"engines": { "node": ">=20" },
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier --write .",
  "typecheck": "tsc --noEmit"
}
```

---

## Step 4 — Vite Configuration

`vite.config.ts`:

```ts
import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: { sourcemap: true },
  server: { port: 3000, open: false },
});
```

> Use `fileURLToPath` (not `__dirname`) — the config is loaded as an ES module.

---

## Step 5 — TypeScript Configuration

In `tsconfig.app.json` (`compilerOptions`) enable strictness and the `@/*` alias:

```jsonc
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noImplicitOverride": true,
  "exactOptionalPropertyTypes": true,
  "noFallthroughCasesInSwitch": true,
  "paths": { "@/*": ["./src/*"] },
}
```

> Do **not** set `baseUrl` — it is deprecated since TypeScript 6; `paths` resolves relative to the tsconfig on its own.

---

## Step 6 — ESLint + Prettier

- Use ESLint flat config (`eslint.config.js`) with `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`. (If the Vite template ships oxlint, replace it with ESLint.)
- Use the **flat** configs: `reactHooks.configs.flat['recommended-latest']` and `reactRefresh.configs.vite`.
- Add `eslint-config-prettier` (last) and `simple-import-sort`.
- Rules: **no `any`**, no unused imports/variables, prefer `const`, consistent import ordering.

```bash
npm install -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals
```

`.prettierrc.json`:

```json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "all"
}
```

Add `.prettierignore` for `dist`, `node_modules`, `package-lock.json`.

---

## Step 7 — Environment Variables

Create (and git-ignore all except examples):

```
.env.development     # VITE_API_URL=http://localhost:8000/api
.env.production      # VITE_API_URL=https://api.example.com/api
.env.example         # committed template
```

- Access env **only** through the typed helper `src/config/env.ts` — never `import.meta.env` scattered in code.
- Never hardcode API URLs, tokens, keys, or secrets.
- Add `.env*` (except `.env.example`) to `.gitignore`.

---

## Step 8 — index.html

Configure: title, description, theme color, favicon, apple-touch-icon, viewport, charset, Open Graph tags. No inline JS/CSS.

**Every referenced asset must actually exist in `public/`** — `favicon.svg`, `apple-touch-icon.png` (180×180), `og-image.png` (1200×630). Missing files mean 404s and broken link previews in production.

**Font:** self-host Inter via `@fontsource-variable/inter` — `import '@fontsource-variable/inter';` first in `main.tsx`, and `'Inter Variable'` first in the body `font-family` stack. Never load fonts from external CDNs.

---

## Step 9 — Folder Structure

Create this **exact** structure under `src/`. Folders that start empty keep a `.gitkeep` so the structure survives in git.

```text
src/
├── app/                        # Application bootstrap
│   ├── App.tsx
│   ├── providers.tsx
│   ├── router.tsx
│   ├── routes.ts
│   └── index.ts
│
├── assets/                     # Static assets
│   ├── fonts/
│   ├── icons/
│   ├── images/
│   ├── illustrations/
│   ├── logos/
│   └── index.ts
│
├── components/                 # Shared reusable components
│   │
│   ├── ui/                     # Generic UI components
│   │   ├── accordion/
│   │   ├── alert/
│   │   ├── avatar/
│   │   ├── badge/
│   │   ├── breadcrumb/
│   │   ├── button/
│   │   ├── calendar/
│   │   ├── card/
│   │   ├── carousel/
│   │   ├── checkbox/
│   │   ├── chip/
│   │   ├── command/
│   │   ├── date-picker/
│   │   ├── dialog/
│   │   ├── divider/
│   │   ├── drawer/
│   │   ├── dropdown/
│   │   ├── empty-state/
│   │   ├── form/
│   │   ├── icon/
│   │   ├── input/
│   │   ├── loader/
│   │   ├── modal/
│   │   ├── pagination/
│   │   ├── popover/
│   │   ├── progress/
│   │   ├── radio/
│   │   ├── search/
│   │   ├── select/
│   │   ├── separator/
│   │   ├── sheet/
│   │   ├── skeleton/
│   │   ├── slider/
│   │   ├── spinner/
│   │   ├── stepper/
│   │   ├── switch/
│   │   ├── table/
│   │   ├── tabs/
│   │   ├── tag/
│   │   ├── textarea/
│   │   ├── toast/
│   │   ├── tooltip/
│   │   ├── tree/
│   │   ├── upload/
│   │   └── index.ts
│   │
│   ├── layout/                 # Layout components
│   │   │
│   │   ├── sidebar/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── SidebarItem.tsx
│   │   │   ├── SidebarGroup.tsx
│   │   │   ├── SidebarMenu.tsx
│   │   │   ├── SidebarHeader.tsx
│   │   │   ├── SidebarFooter.tsx
│   │   │   ├── SidebarToggle.tsx
│   │   │   ├── sidebar.config.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── navbar/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── Notification.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   ├── UserMenu.tsx
│   │   │   ├── ProfileMenu.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── header/
│   │   │   ├── Header.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── footer/
│   │   │   ├── Footer.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── page/
│   │   │   ├── Page.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   ├── PageActions.tsx
│   │   │   ├── PageContent.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── MainLayout.tsx
│   │   ├── DashboardLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   ├── BlankLayout.tsx
│   │   ├── ErrorLayout.tsx
│   │   └── index.ts
│   │
│   ├── charts/                 # Chart components
│   │   ├── AreaChart.tsx
│   │   ├── BarChart.tsx
│   │   ├── DonutChart.tsx
│   │   ├── LineChart.tsx
│   │   ├── PieChart.tsx
│   │   ├── RadarChart.tsx
│   │   └── index.ts
│   │
│   ├── feedback/               # Feedback components
│   │   ├── EmptyState.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── Loading.tsx
│   │   ├── NotFound.tsx
│   │   └── index.ts
│   │
│   └── index.ts
│
├── features/                   # Feature modules
│   └── feature-name/
│       ├── api/
│       ├── components/
│       ├── constants/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       ├── store/
│       ├── schemas/
│       ├── types/
│       ├── utils/
│       ├── routes.ts
│       └── index.ts
│
├── hooks/                      # Global hooks
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   ├── useMediaQuery.ts
│   ├── usePagination.ts
│   ├── useTheme.ts
│   └── index.ts
│
├── services/                   # Shared services
│   ├── api/
│   │   ├── axios.ts            # Single Axios instance
│   │   ├── client.ts
│   │   └── interceptors.ts
│   ├── auth/
│   ├── storage/
│   ├── websocket/
│   └── index.ts
│
├── providers/                  # App providers
│   ├── AuthProvider.tsx
│   ├── ThemeProvider.tsx
│   ├── ToastProvider.tsx
│   └── index.ts
│
├── routes/                     # Route guards & definitions
│   ├── AppRoutes.tsx
│   ├── ProtectedRoute.tsx
│   ├── PublicRoute.tsx
│   └── index.ts
│
├── store/                      # Global state
│   ├── auth/
│   ├── app/
│   ├── ui/
│   └── index.ts
│
├── lib/                        # Third-party configs
│   ├── dayjs.ts
│   └── index.ts
│
├── styles/                     # Global styles
│   ├── globals.css
│   ├── theme.css
│   ├── variables.css
│   ├── animations.css
│   └── utilities.css
│
├── constants/                  # App constants
│   ├── api.ts
│   ├── colors.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── index.ts
│
├── config/                     # App configuration
│   ├── env.ts
│   ├── app.ts
│   ├── navigation.ts
│   ├── permissions.ts
│   └── index.ts
│
├── schemas/                    # Global validation schemas
│   ├── auth.schema.ts
│   ├── common.schema.ts
│   └── index.ts
│
├── types/                      # Global types
│   ├── api.ts
│   ├── auth.ts
│   ├── common.ts
│   ├── global.ts
│   └── index.ts
│
├── utils/                      # Utility functions
│   ├── cn.ts
│   ├── date.ts
│   ├── format.ts
│   ├── helpers.ts
│   ├── storage.ts
│   ├── validation.ts
│   └── index.ts
│
├── mocks/                      # Mock data
├── permissions/                # Permission logic
├── i18n/                       # Internationalization
│
├── main.tsx
└── vite-env.d.ts
```

Rules:

- Every folder exports through an `index.ts` barrel.
- UI component folders start empty (`.gitkeep`) and are filled as the project needs them — implement at least: `alert, badge, button, card, empty-state, input, skeleton, spinner, toast`.
- `features/feature-name/` is a **copy-me template** for new feature modules; feature routes are registered in `app/routes.ts`.
- Chart components wrap **Recharts** behind a stable typed API (`series`, `data`, `valueFormatter`) so pages never import Recharts directly.
- **Chart colors come from tokens only**: `--chart-1` … `--chart-6` in `theme.css` (light + dark steps, CVD-validated slot order — assign in order, never cycle or re-sort; past 6 series fold into "Other"). Charts read them via `CHART_PALETTE` in `constants/colors.ts` — never hardcode hexes in chart files.
- Charts animate **only on first mount** (`useChartAnimation` hook) — Recharts otherwise replays its entry animation on every container resize.
- Sidebar UI state (mobile drawer + collapsed) lives in `SidebarProvider` (`providers/`), consumed via `useSidebar()`. Layouts stay stateless so toggling the sidebar never re-renders the routed page. Desktop collapse snaps instantly (no width transition — it reflows the whole content pane); only the mobile drawer animates (`transform`).

---

## Step 10 — Styling, Theme & Design Tokens

1. `src/styles/theme.css` — **all design tokens as CSS variables** (colors, radius, spacing, font sizes/weights, z-index, opacity, durations) with `:root` (light) and `.dark` (dark) blocks.
2. `src/styles/globals.css` — `@import 'tailwindcss';` + `@theme inline` mapping tokens to Tailwind color utilities + base styles.
3. Semantic color tokens: `primary, secondary, success, warning, danger, background, surface, border, text, muted` — **never hardcode colors**.
4. Theme system: **light / dark / system** via `ThemeProvider` + `useTheme()`; persist choice in storage; respond to OS changes.

**UI rules:** `rounded-md` everywhere, **no shadows**, 1px borders, border-based hierarchy, smooth transitions, mobile-first.

---

## Step 11 — Core Services

1. **Storage** (`services/storage/`): single typed wrapper around `localStorage`; keys live in `constants/storage.ts`. Never call `localStorage` directly in components.
2. **API** (`services/api/`): **one** Axios instance (`axios.ts`) + typed helpers (`client.ts`) + `interceptors.ts` for centralized error handling. Components never call Axios directly — always go through service functions.
3. **Auth service** (`services/auth/`) — _only if the project needs authentication_: `login`, `logout`, `refresh`, `me` functions (see Step 12).

---

## Step 12 — Auth Pattern (optional)

> Skip this step entirely for projects without login. The starter ships **without** authentication — routes are open and the app lands on the dashboard. When a project needs auth, add: `features/auth/` (login page + routes), `providers/AuthProvider.tsx` (Context + useReducer), `hooks/useAuth.ts`, `routes/ProtectedRoute.tsx` + `PublicRoute.tsx`, `services/auth/`, token handling in `services/api/interceptors.ts` (attach `Authorization: Bearer <token>`, refresh **once** on 401, retry, clear session on failure), and an `ACCESS_TOKEN` key in `constants/storage.ts`.

| Token         | Storage                            |
| ------------- | ---------------------------------- |
| Access token  | `localStorage` (short expiry)      |
| Refresh token | `httpOnly` cookie (set by backend) |
| User info     | React Context (memory)             |

- Auth state lives only in `AuthProvider`; read via `useAuth()`.
- `ProtectedRoute` blocks unauthenticated users; `PublicRoute` blocks authenticated users from guest pages.
- Never decode tokens for permissions — get the role from the API.
- Clear **all** auth data on logout and on refresh failure.

---

## Step 13 — Routing

- Routes organized **by feature**: each feature owns a `routes.ts`, composed centrally in `app/routes.ts`.
- All pages **lazy-loaded** (route `lazy:` option) for code-splitting.
- Nested routes, 404 page, error boundary at the router root. Add protected/guest route groups only when auth exists (Step 12).

---

## Step 14 — Forms

- React Hook Form + Zod resolver (`@hookform/resolvers/zod`).
- Zod schemas live in `schemas/` (global) or `features/<name>/schemas/`.
- Show clear field errors; disable submit while loading.

---

## Step 15 — UI Components

Every shared component supports: **variants, sizes, disabled, loading, dark mode, accessibility (ARIA + focus states + keyboard)**.

Starter set: `Button, Input, Label, Card, Badge, Spinner, Skeleton, Alert, Select, Checkbox, Textarea` + layout (`Sidebar, Navbar, MainLayout, AuthLayout`) + feedback (`ErrorBoundary, Loading, EmptyState, NotFound`).

Icons: **Lucide React** only, consistent sizes.

---

## Step 16 — Verify (must all pass)

```bash
npm run typecheck   # zero TypeScript errors
npm run lint        # zero ESLint errors
npm run format      # formatted
npm run build       # production build succeeds
npm run dev         # zero console errors/warnings
npm audit           # no critical issues
```

---

## Final Checklist

- [ ] Latest package versions, no deprecated dependencies
- [ ] Zero TS / ESLint / console errors
- [ ] Folder structure + barrels maintained
- [ ] API layer separated (no Axios in components)
- [ ] Auth flow (only if auth exists): login → refresh once on 401 → logout cleanup
- [ ] Light/dark/system theme via design tokens only
- [ ] Responsive (mobile-first), accessible, lazy-loaded routes
- [ ] Loading / empty / error states everywhere
- [ ] `.env*` git-ignored; no secrets in the bundle
- [ ] `rounded-md`, 1px borders, no shadows
