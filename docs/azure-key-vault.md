# Azure Key Vault Access

## Create Key Vault and secrets (CLI)
- az login
- az account set --subscription "<SUBSCRIPTION_ID>"
- az group create -n "<RG_NAME>" -l "<LOCATION>"
- az keyvault create -n "<KEYVAULT_NAME>" -g "<RG_NAME>" -l "<LOCATION>"
- az keyvault secret set --vault-name "<KEYVAULT_NAME>" --name "VITE-API-URL" --value "https://your-api.azurewebsites.net"

## Grant access to GitHub Actions
- Create a Service Principal (or use OIDC with workload identity).
- Service Principal:
  - az ad sp create-for-rbac --name "github-kickstartr-frontend" --role contributor --scopes /subscriptions/<SUBSCRIPTION_ID>
  - Save the JSON output; add to GitHub repo secrets as AZURE_CREDENTIALS.
- Allow the identity to read secrets:
  - az keyvault set-policy --name "<KEYVAULT_NAME>" --spn "<APP_ID_FROM_SP>" --secret-permissions get list

## GitHub repo secrets
- AZURE_CREDENTIALS = JSON from az ad sp create-for-rbac
- KEYVAULT_NAME = your vault name
- AZURE_STATIC_WEB_APPS_API_TOKEN = token from Azure Static Web Apps

## Verify access (CLI)
- az keyvault secret show --vault-name "<KEYVAULT_NAME>" --name "VITE-API-URL" --query value -o tsv

## How it works in CI
- Workflow logs in with azure/login using AZURE_CREDENTIALS.
- It queries Key Vault and exports env:
  - VITE_API_URL
  - VITE_ENABLE_MOCKS=false
- Vite build consumes these env vars at build time.
