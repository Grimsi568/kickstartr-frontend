# Azure App Service (Node) Deployment

## Prereqs
- App Service (Linux) with Node runtime.
- Set App Settings:
  - SCM_DO_BUILD_DURING_DEPLOYMENT=true
  - NODE_ENV=production
  - VITE_ENABLE_MOCKS=false
  - VITE_API_URL=https://kickstartr-api.azurewebsites.net

## package.json requirements
- "postinstall": "npm run build"
- "start": "vite preview --host 0.0.0.0 --port 8080 --strictPort"
- "engines": { "node": ">=20" }

Oryx will run postinstall to build and then start the app via "start".

## Startup command (optional)
If needed in App Service Configuration:
- Startup Command: `npm start`

## Notes
- Prefer Azure Static Web Apps (CI workflow already added) for SPA hosting.
- If using Docker on App Service, Oryx is bypassed; use the provided Dockerfile.
