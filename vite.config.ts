import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs';
import path from 'node:path';

// Load env from .env files
const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

// Default to certs/ directory if env not provided
const CERT_PATH = env.VITE_DEV_SSL_CERT ?? path.resolve(process.cwd(), 'certs/localhost+2.pem');
const KEY_PATH = env.VITE_DEV_SSL_KEY ?? path.resolve(process.cwd(), 'certs/localhost+2-key.pem');
const FORCE_HTTPS = env.FORCE_HTTPS === 'true';

function readIfExists(filePath: string) {
  try {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath);
    }
  } catch {
    // ignore
  }
  return undefined;
}

const hasCert = !!(readIfExists(CERT_PATH) && readIfExists(KEY_PATH));
const httpsOptions = hasCert
  ? { cert: readIfExists(CERT_PATH), key: readIfExists(KEY_PATH) }
  : FORCE_HTTPS
    ? true
    : false;

// Debug info
console.info(
  `[vite] HTTPS: ${httpsOptions ? 'enabled' : 'disabled'} | FORCE_HTTPS=${FORCE_HTTPS} | CERT=${CERT_PATH} | KEY=${KEY_PATH}`
);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    https: httpsOptions,
    host: true,
    port: 5173
  }
})