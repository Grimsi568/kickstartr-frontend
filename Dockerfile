# Build stage
FROM node:20-alpine AS build
WORKDIR /app
# Install deps using lockfiles if present
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* .npmrc* ./
RUN npm ci
# Copy source
COPY . .
# Build with production env
ENV NODE_ENV=production
RUN npm run build

# Runtime stage
FROM nginx:alpine
# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Basic SPA nginx config with history fallback and headers
COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;

  location / {
    try_files $uri /index.html;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    access_log off;
  }

  add_header X-Content-Type-Options "nosniff" always;
  add_header Referrer-Policy "no-referrer" always;
  add_header X-Frame-Options "DENY" always;
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
}
EOF

# Optional HTTPS config. Set SSL_CERT_PATH and SSL_KEY_PATH at runtime and mount your certs.
ENV SSL_CERT_PATH=""
ENV SSL_KEY_PATH=""

RUN mkdir -p /etc/nginx/ssl
COPY <<'EOF' /docker-entrypoint.d/20-ssl.sh
#!/bin/sh
set -e
if [ -n "$SSL_CERT_PATH" ] && [ -n "$SSL_KEY_PATH" ] && [ -f "$SSL_CERT_PATH" ] && [ -f "$SSL_KEY_PATH" ]; then
  cat > /etc/nginx/conf.d/ssl.conf <<CONF
server {
  listen 443 ssl;
  server_name _;
  root /usr/share/nginx/html;

  ssl_certificate $SSL_CERT_PATH;
  ssl_certificate_key $SSL_KEY_PATH;

  location / {
    try_files \$uri /index.html;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    access_log off;
  }

  add_header X-Content-Type-Options "nosniff" always;
  add_header Referrer-Policy "no-referrer" always;
  add_header X-Frame-Options "DENY" always;
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
}
CONF
  echo "SSL enabled: using cert at $SSL_CERT_PATH"
else
  echo "SSL not enabled: provide SSL_CERT_PATH and SSL_KEY_PATH and mount certs to enable HTTPS on 443."
fi
EOF
RUN chmod +x /docker-entrypoint.d/20-ssl.sh