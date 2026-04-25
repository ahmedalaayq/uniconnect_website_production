/**
 * GradConnect — Generate browser env.js from .env
 *
 * Usage:  node scripts/generate-env.js
 *
 * Reads .env from project root and writes
 * scripts/config/env.js for browser consumption.
 */

const fs   = require('fs');
const path = require('path');

const envPath    = path.resolve(__dirname, '../.env');
const outputPath = path.resolve(__dirname, 'config/env.js');

if (!fs.existsSync(envPath)) {
  console.error('✗ .env file not found at project root');
  process.exit(1);
}

const lines = fs.readFileSync(envPath, 'utf8').split('\n');
const vars  = {};

lines.forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const [key, ...rest] = trimmed.split('=');
  if (key && rest.length) {
    vars[key.trim()] = rest.join('=').trim();
  }
});

// Only expose Firebase keys — never expose server secrets
const allowed = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID'
];

const filtered = {};
allowed.forEach(k => {
  if (vars[k]) filtered[k] = vars[k];
});

const output = `// AUTO-GENERATED — do not edit manually
// Run: node scripts/generate-env.js
// This file is gitignored.

window.__ENV__ = ${JSON.stringify(filtered, null, 2)};
`;

fs.writeFileSync(outputPath, output, 'utf8');
console.log('✓ scripts/config/env.js generated from .env');
