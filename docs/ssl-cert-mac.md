# SSL Certificates on macOS

## Local trusted cert (mkcert)
- Install mkcert:
  - brew install mkcert
  - brew install nss # if using Firefox
- Create a local CA and cert:
  - mkcert -install
  - mkcert localhost 127.0.0.1 ::1
- Outputs:
  - localhost+2.pem (cert)
  - localhost+2-key.pem (key)
- Use in local servers (e.g., Vite, Nginx).
- Trust: mkcert installs a local CA into Keychain.

## Self-signed cert (OpenSSL)
- Generate key and cert:
  - openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout localhost.key -out localhost.crt -subj "/CN=localhost"
- Trust in macOS (optional for dev):
  - Open Keychain Access -> System -> Certificates -> import localhost.crt
  - Set Trust: Always Trust
- Browsers may still warn unless trusted.

## Nginx local usage
- Add to nginx.conf:
  - ssl_certificate /path/to/localhost.crt;
  - ssl_certificate_key /path/to/localhost.key;
  - listen 443 ssl;
- Ensure your server serves HTTPS on 443.

## Azure production certificates
- Prefer managed certs:
  - Azure Static Web Apps: custom domains + free managed certs via portal.
  - Azure App Service: upload PFX from a CA and bind to TLS/SSL settings.
- To create PFX from cert + key:
  - openssl pkcs12 -export -out cert.pfx -inkey your.key -in your.crt -certfile chain.crt
- Avoid self-signed certs in production.

## Notes
- Local certs are for development only.
- For API calls, ensure CORS and HTTPS are configured on the API host.
