#!/usr/bin/env bash
set -euo pipefail

CERT_DIR="$(git rev-parse --show-toplevel)/certs"
mkdir -p "$CERT_DIR"

if ! command -v mkcert >/dev/null 2>&1; then
  echo "mkcert not found. Install with: brew install mkcert"
  exit 1
fi

echo "Creating local CA (if not already installed)..."
mkcert -install

echo "Generating certs for localhost, 127.0.0.1, ::1..."
pushd "$CERT_DIR" >/dev/null
mkcert localhost 127.0.0.1 ::1
popd >/dev/null

echo "Done. Set the following env vars for Vite:"
echo "  VITE_DEV_SSL_CERT=$CERT_DIR/localhost+2.pem"
echo "  VITE_DEV_SSL_KEY=$CERT_DIR/localhost+2-key.pem"
