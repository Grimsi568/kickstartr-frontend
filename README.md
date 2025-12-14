# Kickstartr Frontend

A modern React + TypeScript frontend application for the Kickstartr platform.

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Redux Toolkit** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## 📁 Project Structure

```
kickstartr-frontend/
├── src/
│   ├── api/          # OpenAPI generated types
│   ├── components/   # Reusable UI components
│   ├── context/      # React Context providers
│   ├── lib/          # Utility functions and API client
│   ├── pages/        # Page components
│   │   └── admin/    # Admin-specific pages
│   ├── store/        # Redux store and slices
│   ├── App.tsx       # Main app component with routing
│   ├── main.tsx      # Application entry point
│   └── index.css     # Global styles
├── public/           # Static assets
└── dist/             # Build output (generated)
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or pnpm

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your configuration:
   ```env
   VITE_API_URL=http://localhost:5055
   # Set to "true" to use mock data, "false" to use real API
   VITE_USE_MOCK_DATA=false
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `https://localhost:5173` (HTTPS enabled for local development).

### Mock Data Mode

For development without a running backend, you can enable mock data mode:

1. Set `VITE_USE_MOCK_DATA=true` in your `.env` file
2. Restart the dev server

Mock data includes:
- 6 sample templates (React, Next.js, Vue, Node.js, FastAPI, Flutter)
- 3 sample bundles with multiple templates
- Sample comments and versions
- Simulated API delays for realistic testing

The mock data is fully typed and matches the OpenAPI schema, making it perfect for:
- Frontend development without backend
- UI/UX testing and prototyping
- Demo presentations
- Offline development

Toggle back to real API by setting `VITE_USE_MOCK_DATA=false`.

### Available Scripts

- `npm run dev` - Start development server with HTTPS
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run generate:api` - Generate TypeScript types from OpenAPI spec

## 🔐 HTTPS Setup

The project uses `mkcert` for local HTTPS certificates. The certificates are already generated and stored as:
- `localhost+2.pem`
- `localhost+2-key.pem`

These are trusted by your system and allow secure local development.

### Generate local certs (macOS)
- Ensure mkcert is installed (see docs/ssl-cert-mac.md).
- Make the script executable and run it:
  ```bash
  chmod +x scripts/gen-local-cert.sh
  ./scripts/gen-local-cert.sh
  ```
  Or:
  ```bash
  bash scripts/gen-local-cert.sh
  ```
- Copy env example and start dev:
  ```bash
  cp .env.local.example .env.local
  npm run dev
  ```

### Troubleshooting HTTPS
- Generate certs:
  ```bash
  chmod +x scripts/gen-local-cert.sh
  ./scripts/gen-local-cert.sh
  ```
- Create .env.local (optional if using defaults):
  ```env
  VITE_DEV_SSL_CERT=./certs/localhost+2.pem
  VITE_DEV_SSL_KEY=./certs/localhost+2-key.pem
  # FORCE_HTTPS=true  # optional fallback
  ```
- Restart dev server:
  ```bash
  npm run dev
  ```
- On startup, check the log:
  `[vite] HTTPS: enabled | CERT=.../certs/localhost+2.pem | KEY=.../certs/localhost+2-key.pem`
  If disabled, verify the files exist and paths are correct.

## 📦 Building

```bash
npm run build
```

Build output will be in the `dist/` directory.

## 🚢 Azure Production Deployment
- Create an Azure Static Web App and link this GitHub repo.
- In GitHub repo secrets, add:
  - AZURE_STATIC_WEB_APPS_API_TOKEN (from the Static Web App)
  - AZURE_CREDENTIALS (Service Principal JSON with Key Vault access)
  - KEYVAULT_NAME (your vault name)
- In Key Vault, set secret:
  - VITE-API-URL = https://kickstartr-api.azurewebsites.net
- Push to main; the workflow builds with NODE_ENV=production and deploys dist/.
- SPA routing and security headers are defined in staticwebapp.config.json.

## 🎨 Styling

This project uses Tailwind CSS for styling. Configuration is in `tailwind.config.ts`.

Custom theme colors and utilities are defined in the Tailwind config and can be extended as needed.

## 🔧 API Integration

API types are auto-generated from the backend OpenAPI specification:

```bash
npm run generate:api
```

This creates `src/api/schema.ts` with type-safe API definitions.

## 📝 Code Style

- TypeScript strict mode enabled
- ES Modules (`.mjs` for config files)
- Functional React components with hooks
- Redux Toolkit for state management

## 🗂️ Admin Pages

Admin functionality is organized under `src/pages/admin/`:
- Template creation and management
- Tag management
- Package management
- Bundle creation

Access admin pages at `/admin/*` routes.
