/**
 * PM2 process file for Hostinger VPS (or any Linux host).
 * Usage (from this directory, after creating .env):
 *   npm ci --omit=dev && pm2 start ecosystem.config.cjs && pm2 save && pm2 startup
 */
module.exports = {
  apps: [
    {
      name: "drnisargparmar-api",
      script: "server.js",
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "400M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
